# Dinoapp — Online / Offline functionality status

Living checklist for validating the **online-first** mode (`dataConfig.dataMode: 'online'`)
against a real backend, alongside the default **offline-first** mode (RxDB).

Architecture recap:
- Managers inject the `DATA_SERVICE` token. It resolves to the offline `DataService`
  (RxDB + GraphQL sync) or the online `OnlineDataService` (direct Apollo → Hasura),
  chosen once in `dino.module.ts` from `environment.dataConfig.dataMode`.
- Online results are wrapped by a compatibility shim in `OnlineDataService`
  (`_decorate`) exposing `toJSON()`, `collection`, `populate()`, `patch()`,
  `incrementalPatch()`, `remove()`, so offline-style consumer code works unchanged.
- Mutation inputs are sanitized (`__typename` stripped) before hitting Hasura.

## Architecture: the token + shim approach

This is the core design decision behind online mode. It's worth understanding before
touching this code, because it's why online support is a thin adapter layer instead of
a parallel copy of half the app.

### The layers

Every screen gets its data through a **manager** (`FormDataManager`, `ReportDataManager`,
`UserGroupManager`, …). A manager contains two kinds of code:

1. **Generic CRUD** — `list()`, `get()`, `create()`, `update()`, permission checks. This
   lives once in the shared base class `BaseDataModelManager`
   (`projects/core/data/src/base-data-model-manager.ts`).
2. **Domain logic** — feature-specific methods, often hundreds of lines
   (e.g. `FormDataManager.populateFormData()`, `UserGroupManager.getActiveUserPermissions()`).

A manager never touches the database directly. It delegates to a **data service** that
implements the `IDataService` interface (`projects/core/data/src/data-service-interface.ts`).
There are two implementations:

- `DataService` — **offline**: RxDB / IndexedDB + GraphQL replication/sync.
- `OnlineDataService` — **online**: Apollo → Hasura, no local database, no sync.

### The option we rejected: duplicate managers ("online twins")

The repo had *started* an alternative: one `Online*` twin per manager
(`OnlineFormDataManager`, `OnlineFormStatusManager`, …), each meant to be swapped in for
online mode.

Why it doesn't scale: those twins only reimplemented the **generic CRUD** (~37 lines each).
The domain logic (e.g. `FormDataManager` is ~280 lines) was **not** in them. Reaching real
parity would have meant **copying every domain method into every twin** — ~20 managers,
thousands of duplicated lines — and then maintaining each feature **twice** forever, with
guaranteed drift between the offline and online copies.

The key realization: **a manager's domain logic does not care whether it is offline or
online.** `getActiveUserPermissions()` just calls `this.query(...)`; the only thing that
differs between modes is *which data service answers the query*. Duplicating an entire
manager just to swap one dependency is waste.

### Piece 1 — the `DATA_SERVICE` injection token

An Angular **injection token** is a named "slot" in the dependency-injection system.
Instead of a manager welding itself to a concrete class:

```ts
// BEFORE — hard-wired to the offline implementation
constructor(dataService: DataService) { … }
```

it asks for the slot (`projects/core/data/src/data-service-token.ts`):

```ts
// AFTER — "give me whatever data service is configured"
constructor(@Inject(DATA_SERVICE) dataService: IDataService) { … }
```

The slot is filled in exactly **one place**, based on the config flag, in
`projects/dinoapp/src/app/dino.module.ts`:

```ts
{ provide: DATA_SERVICE,
  useExisting: environment.dataConfig.dataMode === 'online'
      ? OnlineDataService   // online
      : DataService }       // offline (default)
```

The token also has a default factory (`providedIn: 'root'`, `factory: () => inject(DataService)`)
so other apps/tests that don't override it keep offline behavior with no wiring.

Result: **the same `FormDataManager` class runs in both modes.** Online vs offline is
decided once, at startup, by which object lands in the `DATA_SERVICE` slot. No twins, no
duplicated domain logic. (This mirrors the pattern the app already used to swap
`AuthService`/`DataService` for backendless/e2e modes.) Mental model: managers plug into a
socket; at boot we wire that socket to RxDB or to Hasura.

Applied across the ~17 core managers (forms ×4, users ×3, reports ×2,
areas/cases/locations/organizations/projects, langs, logs, notifications).

### Piece 2 — the RxDocument compatibility shim

One catch. The offline `DataService` returns **RxDocuments** — rich objects with methods
like `.toJSON()`, `.populate()`, `.patch()`, `.remove()`, and a `.collection` property.
A lot of consumer code across the app calls those methods, assuming results are RxDocuments.

`OnlineDataService` returns **plain JSON objects** from GraphQL, which have none of those
methods — so any such call crashed online (the `l.toJSON is not a function` /
`gr.populate is not a function` errors seen during testing).

The **shim** (`_decorate` in `projects/core/data/src/online-data-service.ts`) fixes this
centrally: before returning a plain object, it attaches those methods so the object
*quacks like* an RxDocument:

```ts
Object.defineProperties(obj, {
  toJSON:          def(() => ({...obj})),        // plain data, without the shim members
  collection:      def({name: collectionName}),  // so `.collection.name` works
  populate:        def(field => resolveRef(…)),   // resolve a reference via GraphQL
  patch/incrementalPatch: def(changes => update(…)),
  remove:          def(() => softDelete(…)),
});
```

- Added **non-enumerable**, so `{...doc}`, `JSON.stringify`, and `deepCopy` still produce
  clean data without the shim methods leaking.
- Applied to a **shallow copy**, never the original — Apollo freezes results in dev mode,
  so mutating the original would throw.
- `populate()` resolves references over GraphQL (single-id → `get`, array → `find`), and
  skips references whose collection isn't registered (e.g. a disabled optional module).

So consumer code never needs to know it's online — it calls `.populate()` and the shim
quietly does a GraphQL lookup instead of an RxDB one.

### Supporting fixes that make this watertight

- **`__typename` stripping** — Apollo tags every fetched object with `__typename`. When a
  fetched object is written back (edit → `_set`), Hasura rejects `__typename`.
  `_stripInternalFields` removes it (and any Apollo-internal fields) from all mutation inputs.
- **`no-cache` reads** — `get`/`find` use `fetchPolicy: 'no-cache'` so re-queries always hit
  Hasura. Without this, Apollo's cache-first default returns stale results (this is why a
  row inserted by another client only appeared after a reload).
- **Backend-agnostic helpers** — `BaseDataModelManager._objectToJSON` and `_populateRef`, and
  the `rxDocsToJson` util, detect RxDocument vs plain object and behave correctly in both.

### Why the combination wins

- **Token** → choose the backend once; every manager is shared. No duplication, no drift.
- **Shim** → make online results *look like* offline results, so the existing UI/domain code
  (thousands of lines) runs unchanged.

Net effect: online mode is a thin adapter (`OnlineDataService` + shim) plus one config flag,
rather than a parallel implementation. Offline mode is completely untouched — same code
paths, still the default.

**The one maintenance rule:** if a screen calls an RxDocument method the shim doesn't yet
cover (e.g. `.$`, `.getLatest()`, `.incrementalModify()`, `.get(path)`), it surfaces as a
clear runtime error online → add that method to `_decorate`. It's a single central addition,
not a per-manager change.

## Architecture: the data-readiness signal (`dataReady`)

The second architectural decision, after token + shim. Read this before gating any feature
on "data is available".

### The problem

Many features must not act until data can be queried. The app expressed that as
**replication completion**, which only exists offline:

- `DataService.firstReplicationComplete` is `combineLatest([collectionsInitialized,
  registeredCollections, isOnline$])` and then `combineLatest(collections.map(c =>
  c.firstSyncCompleted))`. With **zero** registered collections the inner `combineLatest([])`
  **never emits at all**. In online mode nothing registers collections on the offline
  `DataService`, so the signal is permanently silent.
- The complementary fallback used in `main-nav`,
  `authenticated.pipe(filter(evt => evt === 'init'))`, only fires at `AuthService`
  construction **and only if a token is already in localStorage**. In a fresh login session
  `'init'` is never emitted, and it never fires again afterwards.

So offline worked by the luck of two complementary paths — **login** → replication complete;
**reload-with-token** → `'init'`. Online **both are dead**, which silently disabled: the
Pandino/AI bootstrap, the notifications bell and dropdown, `logoutOff` (so the logout
button's state was driven by `null`), and the custom-action `syncing` context.

### The fix

1. **`IDataService` is now a complete contract.** It also declares the members that used to
   exist only on the concrete `DataService`: `problemSyncing`, `replicationCycleComplete`,
   `syncErrorEvt`, `couldNotSyncEvt`, `runSync`. `OnlineDataService` implements them
   **inertly** (`of([])` / `NEVER` / no-op) — there is genuinely nothing to synchronize. Any
   consumer using the `DATA_SERVICE` token is therefore correct in both modes **by
   construction**; that is the point.
2. **`dataReady: Observable<boolean>`** — the signal features should gate on. It means
   "collections are initialised and data can be queried", deliberately separate from
   replication:
   - Offline: a **getter** delegating to `firstReplicationComplete` — behaviour unchanged.
     (A getter, not an assigned field, so test doubles that override
     `firstReplicationComplete` after `super()` are honoured.)
   - Online: derived from "collections registered **and** auth token present". It is
     deliberately **not** derived from `collectionsInitialized`, because the app module only
     emits that on a `'login'` auth event — a page reload would never become ready.
3. **Consumers repointed at the token**: `main-nav` (notifications + loading state),
   `tokens.service` (Pandino bootstrap), `actions.service` (`syncing` context).

### Rule of thumb

Gate on **`dataReady`**, injected via **`DATA_SERVICE`**. Never inject the concrete
`DataService` for a readiness or sync signal, and never gate on a specific `AuthEvt` string
(`'login'` in particular) — event ordering is not guaranteed, and reloads emit `'init'`.

### Login is announced before the stored auth state is complete — order matters

`AuthService.storeAllAuthenticationInfo()` emits on `authenticated` and on `authToken`, and
both wake their subscribers **synchronously**. Several subscribers read `getUserInfo()` in
response. The user info used to be written *last*, so those subscribers saw an empty user,
gave up, and had no later event to retry on — the work then only happened after a page
reload. (This is what made the Pandino/AI bootstrap look broken online: it silently logged
`No Active user found` — a `console.log`, not an error — and returned null.)

The user info is now stored **before** `authenticated` is emitted. Two constraints to respect
when touching that method:

- Anything a login subscriber may read (user info in particular) must be stored **before**
  `authenticated.next(...)`.
- The relative order `authenticated` → `authToken` must be **preserved**:
  `DataService._initSync()` reads the auth event with `withLatestFrom`, which does not
  re-trigger when the event changes. Emitting the token first would leave offline replication
  never starting. So do not "tidy" this by moving `authenticated.next` to the end.

Related resilience: long-lived subscriptions created once per session (the Pandino bootstrap,
`availableTokens`) now `catchError` around their HTTP calls. Previously a single failed
request errored the stream — and with `shareReplay` that error is replayed forever — so the
feature stayed dead until a page reload.

### Sync UI in online mode

`dataMode` is part of `DataServiceSyncOptions`, so presentation code can tell which mode it
is in (`main-nav.isOnlineMode`). Online, the toolbar shows a neutral **`cloud_done`** icon
instead of the sync icon: the sync icon's "unsynced data" state was permanently on, because
`isThereUnsyncedData` starts `true` and is only cleared by a replication cycle that never
happens online.

## Legend

**Offline** — ✅ works (shipping default).

**Online (now)** — best current assessment:
- ✅ verified working online this session
- 🟡 expected to work (covered by the token + compat shim), not yet clicked
- ❓ untested / unknown
- ⛔ not supported online / deferred (by design)

**Test** — fill in as you validate: ✅ pass · ❌ fail (note the console stack) · leave `☐` if not yet tested.

## Status table

| # | Area | Route | Functionality | Offline | Online (now) | Test |
|---|------|-------|---------------|:---:|:---:|:---:|
| 1 | Auth | `/login` | Log in (nHost) | ✅ | ✅ | ✅ |
| 2 | Auth | `/reset-password` | Reset password | ✅ | 🟡 | ☐ |
| 3 | Auth | — | Log out | ✅ | 🟡 | ✅  |
| 4 | Dashboard | `/` | View dashboard / menu | ✅ | ✅ | ✅ |
| 5 | Forms | `/forms` | List form schemas (collect menu) | ✅ | ✅ | ✅ |
| 6 | Forms | `/forms/:id` | List form data of a schema | ✅ | ✅ | ✅ |
| 7 | Forms | `/forms/:id` | View a form data (detail/expand) | ✅ | 🟡 | ✅ |
| 8 | Forms | `/forms/:id` | Create form data | ✅ | 🟡 | ✅ |
| 9 | Forms | `/forms/:id` | Edit form data (incl. change metric) | ✅ | ✅ | ✅ |
| 10 | Forms | `/forms/:id` | Delete form data | ✅ | 🟡 | ✅ |
| 11 | Forms | `/forms/:id` | Duplicate form data | ✅ | 🟡 | ✅ |
| 12 | Forms | `/forms/:id` | Change status | ✅ | 🟡 | ✅  |
| 13 | Forms | `/forms/:id` | Bulk actions | ✅ | ❓ | ✅ |
| 14 | Forms | `/forms/:id` | Export list (xlsx/csv) | ✅ | 🟡 | ✅ |
| 15 | Forms | `/forms/:id` | Import form data | ✅ | ❓ | ✅ |
| 16 | Forms | `/forms/:id` | Print / docx | ✅ | ❓ | ✅ |
| 17 | Forms | `/forms/:id` | View change log | ✅ | ❓ | ✅ |
| 18 | Forms (authoring) | forms-collect | Create/edit form schema | ✅ | ❓ | ✅ |
| 19 | Public form | `/f/:id` | Fill & submit (anonymous) | ⛔ | ✅ | ☐ |
| 20 | Reports | `/reports` | List report schemas | ✅ | ✅ | ✅ |
| 21 | Reports | `/reports/:id` | View report (charts/widgets) | ✅ | 🟡 | ✅ |
| 22 | Reports | `/reports/:id` | Create/edit report data | ✅ | 🟡 | ✅ |
| 23 | Reports | `/reports/:id` | Delete report data | ✅ | 🟡 | ✅ |
| 24 | Reports (authoring) | reports-collect | Create/edit report schema | ✅ | ❓ | ✅ |
| 25 | Reports | — | Favorite report | ✅ | 🟡 | ✅ |
| 26 | Aggregation | `/aggregation` | List / view aggregations | ✅ | 🟡 | ✅ |
| 27 | Aggregation | `/forms/:id` | Aggregation form creator | ✅ | ❓ | ✅ |
| 28 | Metrics | `/metrics` | List metric domains | ✅ | 🟡 | ✅ |
| 29 | Metrics | `/metrics` | Create/edit metric (organizations) | ✅ | 🟡 | ✅ |
| 30 | Metrics | `/metrics` | Delete metric | ✅ | 🟡 | ✅ |
| 31 | Users | `/users` | List users | ✅ | 🟡 | ✅ |
| 32 | Users | `/users` | Create/edit user | ✅ | 🟡 | ✅ |
| 33 | Users | `/users` | Manage groups / roles | ✅ | 🟡 | ☐ |
| 34 | Languages | `/languages` | View translations | ✅ | ✅ | ✅ |
| 35 | Languages | `/languages` | Add/edit/remove translation | ✅ | 🟡 | ✅ |
| 36 | Notifications | `/notifications` | List notifications | ✅ | 🟡 | ✅ |
| 37 | AI | `/ai` | GPT chat (Pandino API) | ✅ | 🟡 | ☐ |
| 38 | AI | `/rag` | RAG (Pandino API) | ✅ | 🟡 | ☐ |
| 39 | Payments | `/checkout` | Stripe checkout | ✅ | 🟡 | ☐ |
| 40 | System | — | Realtime list refresh after write | ✅ | 🟡 | ✅ |
| 41 | System | — | Backup / Restore DB | ✅ | ⛔ | ☐ |
| 42 | System | — | Offline queue / background sync | ✅ | ⛔ | ☐ |
| 43 | AI | — | Pandino bootstrap after login (`/checkpandinouser` → API key → `/getusertokens`) | ✅ | ✅ | ✅ |
| 44 | Notifications | — | Unread badge + dropdown populate after login | ✅ | ✅ | ✅ |
| 45 | System | — | Sync indicator shows a mode-appropriate state (not "sync problem") | ✅ | 🟡 | ☐ |
| 46 | System | — | Logout button enabled state (`logoutOff`) | ✅ | 🟡 | ☐ |
| 47 | System | — | Custom actions receive a `syncing` value | ✅ | 🟡 | ☐ |

## Notes on the ⛔ rows (by design, not bugs)

- **40 Realtime** — implemented (✅, pending live validation). `OnlineDataService`
  now opens a `graphql-ws` subscription per registered collection
  (`subscription on<Coll>Changed { <coll> { updated_at } }`) and emits
  `collectionChanged`, so lists and the notifications bell re-query on server
  changes — mirroring the offline live path. Needs a two-session test against the
  backend to confirm.
- **41 Backup/Restore** — that's RxDB export/import; inherently offline-only.
  (`backupRestore` is `false` in the current env anyway.)
- **42 Sync / offline queue** — N/A online; there is no local store to sync.

## Most likely ❌ candidates (offline-specific assumptions not yet exercised)

Rows 13 (bulk), 15 (import), 16 (print/docx), 17 (log), 18/24 (schema authoring).
When one fails, capture the console stack (the global error handler now logs the full
error object) and note it here so it can be fixed and the status flipped.

## Fixes applied this session (why online now works)

- GraphQL reads use variables; Mango→Hasura operator map (`$ne`→`_neq`, etc.).
- Removed hardcoded `X-Hasura-Form-Schema-Id` header; fixed a latent where-less update.
- `DATA_SERVICE` token + `dataMode` flag; managers inject the token; `AppModule` emits
  the init lifecycle on the resolved instance.
- Backend-agnostic `_objectToJSON`, `rxDocsToJson`, and a `_populateRef` base helper.
- `OnlineDataService` compat shim (`_decorate`) + `__typename` stripping on writes.
- Fixed `_getCollection` missing `return throwError(...)`; shim `populate()` skips
  unregistered (disabled-module) ref collections.
- Realtime: `OnlineDataService` opens a `graphql-ws` subscription per collection
  (reusing `newClient`/`newClientSubscription` + `subscriptionQueryGql`) and emits
  `collectionChanged`, so existing list/nav consumers auto-refresh online.
- **Filters & metric selection** (all filters returned 0 rows; case not selectable):
  - Shim now sets `isInstanceOfRxDocument`, so RxDB's `isRxDocument()` is true online.
    This restores metric selection (`search-filters-bar.ts:820`), metric sub-filter
    renaming (`filters.service.ts:885`, e.g. `case_notes` → `case`) and ~8 other sites.
  - `buildWhere` rewritten (recursive): `$and`/`$or`/`$nor`/`$not`; **drops the `'all'`
    sentinel** from scalar `*_ref_id` filters (it is an invalid uuid and made Postgres
    reject the whole query — the actual cause of the empty lists); `$regex` → `_ilike`
    with `$options` consumed (this unblocked the case/status/user/group option lists);
    `$ne` includes NULL rows; `$elemMatch` → `_contains`; `$in`/`$nin` with `null`/`''`
    expanded; array columns use containment; unknown operators dropped instead of
    emitting invalid Hasura fields; empty logical arrays dropped.
  - `sort` normalized: empty directions and dotted paths dropped, multi-key entries split.
  - Advanced form-field filters (`data.*`, inside the jsonb column) are split off and
    evaluated in memory by `mango-eval.ts`, with paging applied after filtering and a
    5000-row cap — Hasura cannot express per-key ranges inside jsonb, so this preserves
    offline parity.
  - `updateQueryGql` no longer falls back to `where: {}` (which would match every row).
  - `CheckMetricPermission` no longer assumes `doc.collection.name` (lost by `deepCopy`).
  - Query failures are always logged with operation + selector (they were silent before).
  - Covered by 44 unit tests in `gql.spec.ts` / `mango-eval.spec.ts`; suite 135/135 green.
- **Bulk insert result** (`bulkInsert`): treated `affected_rows !== 1` as failure, so any
  multi-row import reported "File not imported!" although every row had been written. Only
  zero/missing is a failure now.
- **Post-write `withLatestFrom` races** (`create-form.ts`, `edit-form.ts`): the save result was
  DROPPED when the active-user / user-group lookups had not emitted yet, so the spinner ran
  forever although the document was created. They now wait for those lookups instead of
  sampling them. Left unchanged on purpose: `form-status-changer.ts:134` and `list.ts:1247`
  place `withLatestFrom` in the OUTER pipeline (subscribed in `ngOnInit`), so their sources are
  already warm — verified correct as written.
- **Data-readiness** (see the architecture section above): `IDataService` completed with the
  sync members + `dataReady`; `main-nav`, `tokens.service` and `actions.service` repointed at
  the `DATA_SERVICE` token. This is what unblocked the notifications bell, and it also fixes
  `logoutOff` never emitting and the custom-action `syncing` context.
- **Pandino bootstrap trigger**: no longer requires the *latest* auth event to be exactly
  `'login'`. `combineLatest` reports latest values, and readiness arrives after login — by then
  the event has often moved on (`'refresh successful'`, `'init refresh'`), so the bootstrap was
  skipped; a page reload (`'init'`) never triggered it even offline. It now fires on
  "authenticated + token + ready", keyed by user so it runs once per user per session.
- **Sync UI in online mode**: `dataMode` exposed on `DataServiceSyncOptions`;
  `isThereUnsyncedData` starts `false` online (it starts `true` and is only cleared by a
  replication cycle, which never happens online — the icon was stuck on `sync_problem`), and a
  neutral `cloud_done` icon replaces the sync icon.

## Change log (test results)

_Record dated results here as you validate, e.g.:_

- 2026-07-24 — #1 Log in (nHost): ✅ observed online.
- 2026-07-24 — #4 View dashboard/menu: ✅ observed online.
- 2026-07-24 — #5 List form schemas: ✅ observed online.
- 2026-07-24 — #6 List form data: ✅ observed online (rows show data).
- 2026-07-24 — #20 List report schemas: ✅ observed online (rows show data).
- 2026-07-24 — #9 Edit form data / change metric: fix applied (`__typename` stripped from
  mutation `_set`); not yet re-confirmed by a click-through → Test still ☐.
- 2026-07-24 — #40 Realtime: websocket connects (101). Live cross-client update was NOT
  seen until reload; root cause was Apollo cache-first reads → fixed with `no-cache`
  on `get`/`find`. Pending re-test of the two-session insert.
- 2026-07-25 — #8 Create form data: ✅ after fixing the post-write `withLatestFrom` race
  (spinner hung forever while the row *was* created).
- 2026-07-25 — #15 Import form data: ✅ after fixing the `bulkInsert` `affected_rows` check
  ("File not imported!" was reported although the rows were written).
- 2026-07-25 — #9 Edit form data: ✅ re-confirmed; the same race was fixed pre-emptively in
  `edit-form.ts` (it had been passing on timing luck only).
- 2026-07-25 — #44 Notifications badge/dropdown after login: ✅ works once `main-nav` gates on
  `dataReady` via the token. Was silently dead online (both `merge` branches never fired).
- 2026-07-25 — #43 Pandino bootstrap: ❌ still no `POST /checkpandinouser` observed online
  after three attempts. Ruled out: the service IS constructed at bootstrap (main-nav injects
  it, even on `/login`); `firstReplicationComplete` never emitting (fixed); the readiness
  signal itself (proved good by #44 working). Latest fix removes the `evt === 'login'`
  requirement from the trigger — **pending re-test**. If it still does not fire, the next
  suspect is inside `checkPandinoUser()`: a `No Active user found` console log means
  `getUserInfo().email` or `authToken.value` is empty, which is an auth-info bug, not a
  readiness one.
- 2026-07-25 — #45 Sync indicator: was permanently showing `sync_problem` online
  (`isThereUnsyncedData` starts `true`, cleared only by a replication cycle). Now starts
  `false` online and a `cloud_done` icon is shown instead — **pending visual confirmation**.
- 2026-07-25 — Offline regression check (`dataMode: 'offline'`): **not yet run** — the most
  important remaining verification, since these changes touch shared main-nav/sync code.
- 2026-07-25 — #43 Pandino bootstrap: ✅ **fixed and confirmed** — the POST now fires at login
  without a reload. Root cause was NOT the readiness signal (that was already fine, as #44
  proved) but a synchronous ordering bug in `AuthService.storeAllAuthenticationInfo()`: the
  user info was stored *after* `authenticated`/`authToken` emitted, so subscribers reading
  `getUserInfo()` on login saw an empty user and had no later event to retry on. Storing the
  user info first fixed it. See the architecture note on login ordering.
