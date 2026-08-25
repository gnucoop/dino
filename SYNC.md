# Sync mechanism — how it works on `sync-problems`, and how it differs from `dev`

Audience: developers merging `sync-problems` into `dev` and then `main`.

The deployment constraint this document is written against: **the app is used in places where
connectivity is unstable or absent for days, and data collected offline must never be lost.**
Everything below is evaluated against that single requirement.

## TL;DR

- Local data lives in IndexedDB (rxdb + Dexie). Nothing in the sync path deletes it. The **only**
  thing that destroys it is a database teardown, and the only trigger for a teardown is a
  **logout**.
- Therefore "no data loss" reduces to one question: **can the app log the user out on its own?**
  It can, from three places. This branch makes two of them much harder to reach than on `dev`, and
  makes one of them reachable where on `dev` it was dead code.
- Compared to `dev`, this branch is **substantially safer**: on `dev` an idle session was
  guaranteed to hit an automatic logout after the second authentication failure of its lifetime,
  because the retry budget was never reset. That is the single worst data-loss bug in the current
  production code, and it is fixed here.
- Two exposures remain, both introduced or widened by this branch, both listed in
  [Residual risks](#residual-risks) with proposed fixes. Neither is a regression in the "silent
  wipe" sense on its own, but both should be closed before this reaches `main`.

## 1. Where offline data lives, and what can destroy it

| Layer | Contents | Survives |
| --- | --- | --- |
| rxdb collections (Dexie/IndexedDB) | every document, including writes not yet pushed | app restart, PWA discard, days offline |
| rxdb replication meta instance (same database) | pull checkpoint and push state per `replicationIdentifier` | app restart, replication `cancel()` |
| `localStorage` | auth token, refresh token, user info, auth/data config | app restart |

A local write is "safe" as soon as it is in the collection. It becomes "delivered" when the push
replication has sent it and the server acknowledged it. The gap between the two is what days of
offline work consist of.

**Nothing shrinks that gap except a successful push.** In particular:

- `_stopCollectionSync()` cancels a replication. It does not touch documents, and the push state
  lives in the meta instance, so a later `_setupCollectionSync()` with the same
  `replicationIdentifier` resumes and pushes the backlog.
- Going offline stops every replication (see §4). No data implication.
- A failed push leaves the documents where they are and retries.

The one operation that deletes documents is `RxDatabase.remove()`, reached only through
`destroyAllCollections()`, which is called from exactly one place: the `logoutEvt` subscription in
the `DataService` constructor.

```
user logout button ─┐
JWT interceptor ────┼─► AuthService.logout() ─► logoutEvt ─► destroyAllCollections()
DataService.runSync ┘                                        └─► RxDatabase.remove()  ← data gone
```

So the audit reduces to: **who emits `_logoutEvt`, and how hard is it to get there.**

## 2. The three automatic-logout paths

### 2.1 `DataService.runSync()` — pre-sync refresh failure

`runSync()` without a collection name refreshes the token before the cycle. On this branch a
negative result no longer tears the session down on the spot: `_handleSyncRefreshFailure()`
increments `_failedSyncRefreshes` and only emits `_logoutEvt` at
`MAX_CONSECUTIVE_SYNC_REFRESH_FAILURES` (3). Any refresh that goes through resets the counter.
Every failure is reported through `ErrorHandlerMessageService` — `warning` for a skipped cycle,
`error` for the logout — so a sync that quietly does nothing is visible in the notifications and in
Sentry.

Crucially, `AuthService.refreshToken()` returns `true` while offline without issuing a request, so
**days offline consume none of that budget**.

`dev`: logout on the *first* negative result, no budget, no reporting.

### 2.2 `JWTInterceptor._handleAuthFailure()` — a request fails authentication

A 401/400, or a 200 carrying a Hasura `invalid-jwt`/`JWTExpired` error, triggers a refresh and a
replay of the request. Offline it refuses to refresh or log out and surfaces the error to the
caller, which falls back to local data. `_retryAttempts` is reset by `tokenRefreshedEvt`, so a
successful refresh restores the budget.

`dev`: same shape, except `_retryAttempts` was **never reset**, and `retryAttemptsMax` is `1` in
every environment. The first authentication failure of a session consumed the budget; the second
one — minutes or hours later — logged out and wiped the database. With no pre-emptive refresh on
`dev`, tokens expired every few minutes, so this was not a corner case but the normal end of a long
session. This branch fixes it.

### 2.3 `JWTInterceptor` reconnection handler — `online` event with an expired token

On reconnection the interceptor re-evaluates the token and refreshes if needed. If the refresh
fails it emits `_logoutEvt` **on the first negative result, with no budget at all**.

`dev`: this path was dead code. It read `withLatestFrom(this._authService.checkToken())` and
tested `if (!check)`, but `checkToken()` returns an object — always truthy — so the branch never
ran. Fixing that condition on this branch enabled both the useful behaviour (a refresh on
reconnection) and the destructive one (a logout on a single failed refresh). See
[Residual risks](#residual-risks) R1.

## 3. Normal lifecycle on this branch

1. **Database creation.** `_db` is built through `_createDatabase()`, which first awaits any pending
   teardown (`DB_TEARDOWN_MAX_WAIT_MS`, 30s cap) and retries creation up to `DB_CREATION_MAX_ATTEMPTS`
   (5) with `DB_CREATION_RETRY_DELAY_MS` (1s) — rxdb releases a database name asynchronously, so a
   logout immediately followed by a login used to throw DB8 and leave the app with no database.
2. **Collection registration.** `createCollection()` retries a bounded number of times
   (`boundedRetry`, 30 × 1s) and, on exhaustion, calls `_reportCollectionError()`: console error,
   `problemSyncing` badge, Sentry. A collection that fails to register is absent for the whole
   session; on `dev` that happened in complete silence.
3. **Replication setup.** `_initSync()` reacts to
   `combineLatest([registeredCollections, authToken, isOnline$, authenticated])`. When authenticated,
   online and holding a token, each registered collection without an active sync gets
   `_setupCollectionSync()`; each collection already syncing gets `_updateCollectionSyncToken()` if
   only the token changed.
4. **Live subscription.** In live mode a websocket subscription per collection calls
   `runSync(collection.name)` on every server-side change notification.
5. **Pull.** `pullQueryBuilder` asks for documents after the checkpoint; `pullResponseModifier`
   returns the last document as the new checkpoint, or — new on this branch — **returns the
   requested checkpoint unchanged when the response is empty**. Previously an empty response reset
   the checkpoint to the epoch, so the next cycle re-downloaded the whole collection, forever.
6. **Push.** `pushQueryBuilder` sends the documents rxdb considers unpushed. A push rejected with a
   `constraint-violation` retries up to `retrySyncMaxAttempts` (3) via `syncErrorEvt`, then gives up
   with `couldNotSyncEvt`.
7. **Token renewal.** The auth service refreshes pre-emptively at 75% of the token lifetime. The new
   token is handed to the running replications with `setHeaders()`; the replication state and its
   checkpoint are untouched.

## 4. Offline behaviour, day by day

**Going offline.** `isOnline$` emits `false`; `_initSync()` takes its `else` branch and stops every
replication. Documents and push state stay on disk. `checkToken()` reports `token: true` while
offline regardless of expiry, so `authenticated` stays true, `AuthGuard` never blocks or redirects,
and the app keeps working on local data.

**Staying offline for days.** `refreshToken()` short-circuits to `true` without a request, so no
failure is ever counted anywhere. The pre-emptive timer is re-armed with a 60s floor
(`OFFLINE_PREEMPTIVE_RETRY_DELAY`) until the token actually expires, after which
`_schedulePreemptiveRefresh()` stops re-arming — a handful of wake-ups, then silence for days. Local
writes accumulate. Nothing expires, nothing is deleted.

**Coming back online, app still alive.** The reconnection handler refreshes the token, `authToken`
emits, `_initSync()` recreates the replications (they were stopped, so they go through
`_setupCollectionSync()`), and the backlog is pushed from the stored push state. If the refresh
fails, see R1.

**Coming back online after a PWA restart** (the likely case for a tablet left in background for
days): the reconnection handler fires here too, and refreshes the expired token without waiting for
the user to do anything. It used not to — see R3 — and recovery depended on the first guarded
navigation (`AuthGuard` → `refreshToken('init refresh')`) or on the Sync button
(`runSync()` → `refreshToken()`), so a device left on one screen could sit online with its data
unpushed.

**The credentials cannot die on their own here, which is what makes a bad link survivable.**
Measured by hand against the current instance (2026-08-25), because the client's exposure to a
flapping connection depends entirely on it:

| Fact | Measured | Consequence |
| --- | --- | --- |
| The refresh token does not rotate | `/v1/token` returned the same token value it was given; three parallel calls with one token all returned 200 | A refresh response lost in flight costs nothing: the stored token is still the right one, and the next attempt uses it |
| Its expiry is a sliding 30-day window | `auth.refresh_tokens.expiresAt` moved from `2026-09-24T12:51:39` to `2026-09-24T12:56:21` across one refresh — each time `now + 30 days` | No calendar wall from the login. The only way to lose the credential is 30 consecutive days without a single successful refresh |
| The refresh endpoint ignores the `Authorization` header | A call at 12:36:03 succeeded carrying a Bearer that had expired at 12:33:03 | Coming back after days offline works: the access token is long dead, only the body's refresh token matters |
| Access tokens live 900s | `accessTokenExpiresIn: 900` | The pre-emptive refresh fires at 11m15s, leaving 3m45s of margin for clock skew, a slow round trip and background timer throttling |

None of this is a contract: it is backend configuration. Enabling single-use rotation, or a fixed
expiry, would each reintroduce a way for the credential to die while the device holds unpushed data
— so no client code should depend on these four rows. They are recorded here because the risk
assessment below does.

**Replication-side token expiry is not a logout risk.** Replications use rxdb's own `fetch`, not
Angular's `HttpClient`, so they never reach the interceptor or its budget. A rejected JWT surfaces on
`state.error$`, is recognised by `hasJwtAuthError()` and emits `_refreshEvt`, which is
`exhaustMap`-ed into a single refresh. Twenty collections failing at once produce one refresh request
and zero logout risk.

## 5. Differences from `dev`, condensed

| Area | `dev` | `sync-problems` |
| --- | --- | --- |
| Interceptor retry budget | never reset; 2nd auth failure of the session → logout + wipe | reset on every successful refresh |
| Pre-emptive refresh | none; recovery only via 401 | at 75% of lifetime, re-armed offline with a 60s floor |
| Token expiry check | `exp > now`, throws on a malformed token | `isTokenExpired()` with 10s skew, never throws |
| Concurrent refreshes | one HTTP call per requester, each emitting `authToken` and reconfiguring every replication | single-flight `_refreshInFlight` |
| Reconnection refresh | dead code (`if (!check)` on an object) | live — and can log out on one failure (R1) |
| Interceptor on 401 | returned `obsOf(null)` to the caller, replayed the request into the void | refreshes, replays with the current token, returns the real response |
| Refresh endpoint | a failing refresh could trigger another refresh | excluded via `_isAllowedRequest()` |
| `runSync()` refresh failure | logout + wipe immediately | skip the cycle; logout after 3 consecutive failures |
| `runSync()` full cycle | implicit: a token change tore down and recreated every replication | explicit: `reSync()` per active sync, checkpoints preserved |
| Token renewal cost | full replication restart → whole-collection re-pull and mass push | `setHeaders()` on the running replication |
| Empty pull response | checkpoint reset to epoch → endless re-pull of whole collections | requested checkpoint preserved |
| `destroyAllCollections()` | `forkJoin` over registered collections; with none registered it never emitted, so the database was **not** removed | always `db.remove()`, bounded waits, state reset |
| Logout → login race | DB8, app left with no database | teardown awaited, creation retried |
| Infinite `retryWhen` loops | permissions/user-data retried forever | `boundedRetry` + `catchError` fallbacks |
| Failed collection registration | silent | console error + badge + Sentry |
| `NetworkStatusService` | one subscription per subscriber, bogus status history | `shareReplay`, real transition history |

One consequence deserves to be called out: **a logout on this branch reliably destroys the local
database, where on `dev` it sometimes did not.** `dev`'s `forkJoin` over an empty registered-collection
list never emitted, and an unbounded wait on a replication cancellation could skip the removal
entirely. Those accidents occasionally preserved offline data across an unwanted logout. They are
gone — by design, because they were also what made schema-hash conflicts (rxdb DB6) permanent. The
automatic-logout paths therefore have to be right on their own merits, which is what R1 and R2 are
about.

## 6. Residual risks

### R1 — Reconnection logout on a single failed refresh — **fixed**

`JWTInterceptor`, reconnection handler: a negative `refreshToken()` emits `_logoutEvt` with no
budget. The browser `online` event fires on link-up, not on working connectivity (captive portals,
DNS not ready, weak signal), so the first request after days offline is a prime candidate for a
transient failure — and `refreshToken()` returns the same `false` for a 500, a timeout and a revoked
refresh token.

Narrowing factor: `AuthService.logout()` emits `logoutEvt` inside the `tap` of its HTTP call, so if
the logout request also fails the database is **not** removed. The dangerous combination is
"refresh fails but the network works" — a 5xx on the auth endpoint, or a first request that drops
and a second that succeeds.

Fixed: `_logoutEvt` is gone from that handler. `authenticated.next({auth: false})` stays, which is
correct, and the retry is left to `AuthGuard` on the next navigation or to the next sync cycle.
Regression test: *does not log out when the refresh on reconnection fails*.

### R2 — Concurrent authentication failures exhaust a budget of 1 — **fixed**

`_handleAuthFailure()` runs per request. With `retryAttemptsMax: 1` (all environments), request A
fails and sets `_retryAttempts = 1` while its refresh is in flight; request B fails a moment later,
reads `1 >= 1` and logs out. Two `HttpClient` requests failing inside one refresh round trip are
enough — several parallel file uploads with an expired token, for example, which is exactly what
happens when a user finally gets connectivity after collecting data offline.

`dev` was accidentally protected here: `debounceTime(retryRefreshTime)` collapsed concurrent
failures into a single handler run.

Fixed: the budget now counts refresh *attempts*, not failing requests. `AuthService.isRefreshing`
exposes the single-flight state, and a request that joins a refresh already in flight spends
nothing — that refresh has already been counted. Sequential failures still count one each, so
"attempts exhausted" now means two failed refresh round trips rather than two requests failing
together. Regression test: *does not log out when a second request fails inside one refresh round
trip*.

The same flaw was present in `runSync()`, and there it was worse. Tapping the sync button three
times while the connection is slow produced three `runSync` calls sharing **one** refresh — the auth
service is single-flight — so a single failure was counted three times and reached the budget of
three on its own. The button is not disabled while syncing (`main-nav.html`), and with unsynced data
the app explicitly invites the tap ("You have unsynced data. Please click the Sync icon."), so a
user trying to save a week of offline work could destroy it in three taps. `runSync()` now records
whether it owns the refresh or joined one, and only the owner spends an attempt. Regression test:
*spends one attempt when several sync requests share the same failed refresh*.

### R3 — Reconnection refresh skipped when the app starts offline — **fixed**

`filter(res => res === true)` before `skip(1)` swallowed the first reconnection of a session that
started offline: the filter ran first, so what `skip(1)` dropped was the first *online* status
rather than the status the interceptor was built on. The sync then stayed silent until a guarded
navigation or the Sync button — which on a device left on one screen may never come, and a
connectivity window missed for that reason is another day of data kept only on the device.

Fixed by ordering the operators the other way round, which is correct for every sequence: session
started online (`[true, false, true]` → one reconnection), started offline (`[false, true]` → one
reconnection), repeated transitions, no transition at all, and an interceptor built late on the
replayed status. Regression tests: *refreshes the expired token on the first reconnection* and
*does not refresh while the session stays offline*.

Note that a reconnection with a token that is **still valid** needs none of this: `_initSync()`
reacts to `isOnline$` and recreates the replications that were stopped while offline. The gap only
existed for an expired token — that is, always, after days offline.

### R4 — A collection can stop syncing for the whole session (medium, pre-existing)

Three push failures with `constraint-violation` lead to `couldNotSyncEvt`, which sets
`retrySyncAttempts = -1` and calls `_stopCollectionSync()`. The collection is not synced again until
the app is reloaded, while the user keeps writing to it. Data is safe on disk, but it never reaches
the server, and a later logout takes it with it. On this branch the collection is at least named in
`problemSyncing` and reported to Sentry (`_reportSyncError`).

### R5 — Automatic logout wipes unpushed data by policy (medium, design)

Whatever the trigger, an automatic logout deletes the local database, including documents that were
never pushed. Nothing distinguishes "the user asked to log out" from "the session could not be
renewed". A safer policy: destroy the database only on an explicit user logout, or when logging in as
a different user; on an automatic session teardown stop the replications and clear the tokens, and
leave the data for the next successful login.

This is the last defence that still matters, because the budgets above only bound *transient*
failures. Against a refresh the server legitimately rejects they are useless by construction: the
`false` keeps coming, so the threshold is reached with certainty. Given the four measured facts in
§4 that now takes 30 consecutive days without a single successful refresh — a device in the field
for a month — but that is exactly the device carrying a month of collected data, and the wipe would
be the app's response to a correct 401.

### R6 — Degraded permissions after bounded retries (low)

`boundedRetry` replaced infinite `retryWhen` in `PermissionContextService.getAllowedActions()`,
`FormDataManager.hasAllowedFormStatus()`, `UserDataManager.getActiveUserData()` and
`UserGroupManager`. On exhaustion (10 × 2s by default) the fallbacks yield `[]`, `false` and `null`
— "not allowed" rather than a hanging spinner. Correct for the UI, but a long offline session whose
referenced documents never arrive can end up read-only after ~20s instead of retrying forever. Worth
watching in the field; not a data-loss path.

## 7. Test coverage

`projects/core` is green (137 specs). Directly relevant:

- `logout-login.spec.ts` — logout immediately followed by login; teardown/creation race.
- `data-service.spec.ts` — restore ordering with an active sync; pre-sync refresh failure budget
  (skip, logout on the third, budget reset, per-collection calls untouched); full sync cycle
  running `reSync()` on every active sync.
- `auth-service.spec.ts` — offline re-arm of the pre-emptive refresh and its 60s floor.
- `auth-utils.spec.ts` — expiry with skew, malformed tokens, Hasura JWT error detection.
- `bounded-retry.spec.ts` — attempt bounds, delays, reset on success.
- `jwt-interceptor.spec.ts` — 401 handling, a 200 carrying a GraphQL `invalid-jwt` error, and a
  successful response leaving the refresh path alone.

Both R1 and R2 have a regression test in `jwt-interceptor.spec.ts`, each verified to fail against the
code as it was before the fix.

## 8. Merge recommendation

Merging this branch **reduces** the risk of losing offline data compared to what is running on
`dev` today: the interceptor budget reset, the pre-emptive refresh, the `runSync` budget and the two
fixes above all remove paths that ended in an automatic logout, and an automatic logout is the only
way offline data disappears.

Still open, in decreasing order of relevance for the offline deployments: R5 (an automatic logout
wipes unpushed data by policy — worth deciding explicitly), R4 (a collection can stay unsynced for a
whole session) and R6. Neither destroys data on its own.
