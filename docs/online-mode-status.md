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

## Architecture: filtering — Mango selectors → Hasura, and the jsonb limit

The third architectural decision. It matters because filtering is the one place where the
offline and online engines are **not** equivalent in expressive power, so part of it had to be
implemented by hand.

### Where filters come from

`FiltersService` produces `FilterItem[]` (base64-encoded into the URL);
`ListDataSource.queryDM()` (`projects/material/list/src/list-datasource.ts`) is the single
place that turns them into a **Mango/RxDB-style selector**, which is then passed to
`manager.query()` → `IDataService.find()`. Offline that selector goes straight to RxDB. Online
it must be translated into a Hasura `<table>_bool_exp`. Nothing upstream was changed — the
translation lives entirely in the online adapter.

Real shapes the UI produces (all of these occur in practice):

```js
{ case_ref_id:  {$in: ['case-42', 'all']} }                       // metric filter
{ $or: [ {'data.name': {$regex: 'kw', $options: 'i'}},            // keyword search
         {user_data_ref_id: {$eq: 'kw'}} ] }
{ created_at:   {$gte: '2026-01-01', $lte: '2026-07-25'} }         // date range
{ 'data.age':   {$gte: 18, $lte: 65} }                            // advanced (form field)
{ 'data.notes': {$in: [null, '']} }                                // "Empty"
{ $and: [ {$or: [{'data.v__0': …}]}, {$or: [{'data.v__1': …}]} ] } // repeating slides
{ is_deleted:   {$ne: true} }                                      // always present
```

### The impedance mismatches (translator: `projects/core/data/src/gql.ts`, `buildWhere`)

| Mango produces | Naive translation | Why it fails on Postgres/Hasura | What we do |
|---|---|---|---|
| `$in: [uuid, 'all']` | `_in: [uuid,'all']` | `*_ref_id` are **uuid** columns; `'all'` is not a uuid → `data-exception`, the whole query is rejected | strip the `'all'` sentinel on scalar ref columns (kept for array columns, where a stored `'all'` is real) |
| `is_deleted: {$ne: true}` | `_neq: true` | `col <> true` is **NULL** (excluded) when the column is NULL; RxDB treats a missing value as "not equal" | `_or: [{_neq: v}, {_is_null: true}]` |
| `$regex` + `$options` | `_regex` + `_options` | `_options` **is not a Hasura operator** → validation error, whole query rejected | `_ilike '%value%'` with LIKE metacharacters escaped; `$options` consumed |
| `$elemMatch: {$eq: v}` | `_elemMatch` | not a Hasura operator | `_contains: v` (jsonb array) |
| `$in: [null, '']` | `_in: [null,'']` | Hasura `_in` never matches NULL | `_or: [{_is_null: true}, {_eq: ''}]` |
| `$in` on an array column | `_in` | wrong semantics (set membership vs overlap) | containment per value |
| `$and` / `$or` arrays | fell into the scalar branch → `{$or: {_eq: […]}}` | `$or` is not a field | recursive `_and`/`_or`/`_not`; **empty arrays dropped** (an empty `_or` means TRUE) |
| unknown operator | `_<op>` | invalid field → query rejected | dropped |
| `sort: [{a:'desc', b:'desc'}]`, `direction: ''` | passed through | undefined ordering; `''` is not a valid enum | split into separate `order_by` entries; empty directions and dotted paths dropped |

Two safety notes from the same work: `updateQueryGql` never falls back to `where: {}` (that
would match **every row** on an update — it emits a never-matching condition instead), and
query failures are always logged with the operation and selector, because a rejected query
was previously swallowed into `[]` and looked exactly like "no results".

### The part Hasura genuinely cannot do: advanced filters on form fields

"Advanced filters" filter by a **field of the form schema** — `age`, `district`, a repeating
slide's `visits__3`. Those values are **not columns**: they live inside a single **`jsonb`**
column called `data` (`form_data.data`, `report_data.data`; the selector keys are
`data.<field>`, or `data.data.<field>` for non-data lists, plus `__N` variants per repeating
slide).

What Hasura offers on a jsonb column: `_contains` / `_has_key*` (equality and key presence),
and `_cast` to text. What it does **not** offer: **comparisons on an individual key inside the
document**. There is no way to express `data->>'age' >= 18` through a generated `bool_exp`
without changing the backend (a database view or a Hasura computed field per field, which
would have to be maintained for every form schema — untenable here).

Since the requirement was **exact parity with offline** (no accepted feature gaps), we
implemented a **hybrid split** inside `OnlineDataService.find()`:

1. **Split the selector** (`splitSelector`, `mango-eval.ts`): conditions on real columns go to
   the server `where`; conditions on dotted `data.*` paths are held back. `$and` is separable
   so its elements are split individually; a `$or`/`$nor`/`$not` group that mixes both **cannot**
   be split (an OR is not distributive across the boundary), so the whole group is evaluated
   client-side — which is why the in-memory evaluator also handles plain columns.
2. **Evaluate in memory** (`matchesSelector`, `mango-eval.ts`): a small Mango-subset evaluator
   supporting `$eq $ne $gt $gte $lt $lte $in $nin $regex(+$options) $elemMatch $exists` and
   `$and $or $nor $not`, reading dotted paths out of the document. Semantics deliberately
   mirror RxDB/mingo (missing value ≠ equal, equality on an array means "contains", regex via
   a real `RegExp`) so a filter returns the **same rows** in both modes.
3. **Page after filtering**: when client-side conditions exist the server query keeps its
   `order_by` but drops `limit`/`offset`; filtering happens, then `skip`/`limit` are applied in
   memory. Otherwise a page would be computed from unfiltered rows and the counts would lie.
   (`ListDataSource` issues separate count/export/display queries; each goes through `find()`
   and gets the same treatment.)
4. **Bounded fetch**: `MAX_IN_MEMORY_FILTER_ROWS = 5000`, with a dev-mode warning when the cap
   is hit, so an advanced filter on a huge table cannot hang the browser.

### Known differences and limits (be aware before promising parity)

- **The 5000-row cap.** With an advanced `data.*` filter on a table larger than that, results
  are computed from the first 5000 rows (ordered by the query's `order_by`) and a warning is
  logged. Offline has no such limit — it queries the whole local database.
- **Regex vs LIKE on real columns.** Server-side `$regex` becomes `_ilike '%value%'`, i.e. a
  case-insensitive **substring** match. Offline it is a true regex. Identical for ordinary
  search text, different if a user types regex metacharacters (they are escaped, so treated
  literally). The in-memory evaluator still uses a real `RegExp`, so `data.*` filters keep
  regex semantics.
- **Cost.** An advanced filter means an unpaged (capped) fetch plus in-memory work. Column-level
  filters stay fully server-side and are unaffected.
- If per-key jsonb comparisons ever need to be pushed to the server, the backend-side options
  are a view or Hasura computed fields; nothing in the client would have to change beyond
  letting `splitSelector` keep those conditions on the server.

### Where the code and tests live

- `projects/core/data/src/gql.ts` — `buildWhere` / `buildFieldConditions` / `buildOrderBy`
  (Mango → Hasura), sentinel stripping, LIKE escaping.
- `projects/core/data/src/mango-eval.ts` — `splitSelector`, `matchesSelector`, `getPathValue`.
- `projects/core/data/src/online-data-service.ts` — `find()` orchestrates split → server query →
  in-memory filter → paging.
- Tests: `gql.spec.ts` and `mango-eval.spec.ts` (44 cases) cover each real selector shape above,
  including the `'all'` sentinel, `$in:[null,'']`, the repeating-slide `$and:[{$or:…}]` nesting,
  and sort normalization. Read-only reference for the shapes: `list-datasource.ts:484-754`.

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
| 37 | AI | `/ai` | GPT chat (Pandino API) | ✅ | 🟡 | ✅ |
| 38 | AI | `/rag` | RAG (Pandino API) | ✅ | 🟡 | ✅ |
| 39 | Payments | `/checkout` | Stripe checkout | ✅ | 🟡 | ☐ |
| 40 | System | — | Realtime list refresh after write | ✅ | 🟡 | ✅ |
| 41 | System | — | Backup / Restore DB | ✅ | ⛔ | ☐ |
| 42 | System | — | Offline queue / background sync | ✅ | ⛔ | ☐ |
| 43 | AI | — | Pandino bootstrap after login (`/checkpandinouser` → API key → `/getusertokens`) | ✅ | ✅ | ✅ |
| 44 | Notifications | — | Unread badge + dropdown populate after login | ✅ | ✅ | ✅ |
| 45 | System | — | Sync indicator shows a mode-appropriate state (cloud icon not "sync problem") | ✅ | 🟡 | ✅ |
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
- 2026-07-25 — **Offline regression check (`dataMode: 'offline'`): ✅ PASSED.** Built and ran the
  app offline: Pandino/AI, notifications, create form and edit form all behave as before. This
  covers the shared-code changes that carried the real regression risk:
  - `AuthService.storeAllAuthenticationInfo()` — an offline login exercises the whole method,
    including the `clearNhostTokens()` reordering, which was the top concern.
  - The `DATA_SERVICE` token resolving to the offline `DataService` for `main-nav`,
    `tokens.service` and `actions.service`.
  - The `create-form` / `edit-form` save paths (wait-instead-of-sample).
  - `main-nav` rendering the original sync markup and the notification streams offline.
  Not covered by this pass: the `e2e-app` project (separate module and mocks; it type-checks but
  its suite was not run).
- 2026-07-25 — #43 Pandino bootstrap: ✅ **fixed and confirmed** — the POST now fires at login
  without a reload. Root cause was NOT the readiness signal (that was already fine, as #44
  proved) but a synchronous ordering bug in `AuthService.storeAllAuthenticationInfo()`: the
  user info was stored *after* `authenticated`/`authToken` emitted, so subscribers reading
  `getUserInfo()` on login saw an empty user and had no later event to retry on. Storing the
  user info first fixed it. See the architecture note on login ordering.
- 2026-07-26 — **Session resilience after idle, stage 1 (shared auth).** Fixed the causes common
  to both modes: expiry was never actually detected (three places compared an *object* for
  truthiness), `checkToken()` evaluated `exp` once at boot, the refresh budget never reset (so
  recovery was one-shot per page load), and two more instances of the store-then-announce
  ordering bug — `refreshToken()` and `_storeAuthToken()` both announced before persisting,
  which is why a query could fail with `JWTExpired` immediately after a *successful* refresh.
  Added a pre-emptive refresh at 75% of token life, single-flight `refreshToken()`, and bounded
  three unlimited `retryWhen(delay(2000))` loops. Consequence is mode-aware via the new
  `AuthServiceConfig.enforceTokenExpiry` (set from `dataMode`): online blocks and redirects,
  offline refreshes in the background and never bounces to login.
- 2026-07-26 — **Stage 2 (transport + resume).** See the architecture note below. Desktop test of
  stage 1 alone was inconclusive: a ~5 minute minimised window is shorter than the token
  lifetime, so nothing was due to happen either way — which is itself the lesson that expiry
  tracks *issue time*, not idle time.
- 2026-07-26 — **Stage 3 (UI honesty).** `connectionState` on `IDataService` + the toolbar states,
  the 90s stall cap on the spinning sync icon, a working retry online, and a session-expired
  snackbar. Found while wiring it: the e2e/backendless `AuthService` stand-ins are provided via
  `useClass`, which TypeScript does **not** structurally check, so a new `AuthService` member is a
  silent runtime break there (`Cannot read properties of undefined`). Patched the two in `dinoapp`;
  `e2e-app` was deliberately left alone (out of scope) and **will need the same one-line addition
  if that project is revived**. Not yet validated against the live backend.

## Architecture: surviving an idle period (why a token fix was not enough)

Reported symptom: after ~5-10 minutes idle (especially on mobile) the app becomes
inconsistent — online, lists go empty or a spinner never finishes; in offline mode the toolbar
sync icon spins forever — and only a reload, logout or cache clear recovers it.

This is **not one bug**. There are three independent failures that stack, and fixing only the
token half leaves the other two intact.

### 1. The token dies and nothing notices (stage 1)
Covered in the change-log entry above. The key backend detail: **Hasura rejects an expired JWT
with HTTP 200 and a GraphQL `errors` array** (`{"code":"invalid-jwt"}`), never a 401 — so the
HTTP interceptor, which only triggers on 401/400, cannot see it at all.

### 2. The websocket dies silently, and cannot be detected by `on.closed`
`keepAlive: 30_000` only makes the client **send** pings; graphql-ws does nothing if the server
never pongs. When a phone suspends, or a carrier drops the flow without a close frame, the
socket goes **half-open**: `readyState` stays `OPEN`, so there is no `closed` event, no retry,
no error — the subscriptions just stop delivering, permanently. Three fixes, all needed:

- **A pong watchdog** (`graphql-ws-client.ts`): time our own pings and close a socket that does
  not answer within 5s. Closing converts an undetectable half-open state into a normal close,
  which is what makes graphql-ws reconnect. This is the *only* way to catch the zombie case.
- **`connectionParams` as a function.** It used to be a static object captured when the client
  was built, so every reconnect replayed the original — by then expired — token and could never
  succeed. It now reads the current token per connect.
- **Rebuild, not just reconnect.** graphql-ws gives up permanently once its retry budget is
  gone (default 5 attempts, spanning well under a minute — a backgrounded device burns all of
  them while asleep) and then errors every sink. The old error handler only *logged*, and left
  the dead `Subscription` in `_activeSubs`, so the `if (this._activeSubs[name] == null)`
  re-subscribe guard was false forever. Dead subscriptions are now deleted and a fresh client is
  built with bounded backoff.

### 3. Nothing handled app resume — and on mobile this is the only trigger that works
While an app is suspended its timers are throttled or stopped, so the pre-emptive refresh may
never fire; and a suspend/resume produces **no** browser online/offline event, so
`NetworkStatusService` cannot see it either. `AuthService.appResumed` (shared,
`visibilitychange` + `pageshow`) now drives recovery, and it reports **how long the app was
hidden** — because a connection that died while suspended leaves no other trace:

- **Auth**: refresh if the token is expired or within 60s of it; otherwise reschedule the
  pre-emptive timer, which may have been throttled while hidden.
- **Online**: rebuild the websocket if it is missing subscriptions *or* the app was hidden for
  longer than one keep-alive period. The blind time-based rebuild is deliberate — see above, a
  suspended socket cannot be probed after the fact.
- **Offline**: `runSync()`, which refreshes the token *and* resynchronizes every collection.
  This is the actual fix for the spinning icon: replication had no way back, since RxDB 15
  ignores `liveInterval`, so there is no periodic resync at all.

### 4. An expired token presented as an empty list, not an error
Two swallowing layers, both now fixed:
- `OnlineDataService` turned every failure into `[]`/`null`. It now detects an auth failure in
  the GraphQL `errors` array, refreshes once and **retries the operation** (`_retryOnAuthError`).
- The HTTP interceptor returned `obsOf(null)` on a 401. Callers expect an `HttpResponse`, so
  Apollo read `response.body` off the null, threw inside an RxJS `next` (routed to Angular's
  unhandled handler, not to Apollo), and resolved `undefined` — an auth failure surfacing as an
  empty result. It now propagates the error; the refresh still runs.

### 5. The spinner could latch forever (a regression from the list-spinner work)
The list pages gate on `filter(schema => schema != null)` over a `shareReplay(1)` stream. With a
stale token `formSchemaManager.get(id)` resolved **null**, so the stream never emitted and was
poisoned for the session; `list-datasource`'s `skipWhile` then never issued the row query, so
`isLoading` never cleared. Before the spinner existed this showed a blank table; afterwards it
spun forever. Fixed on both sides: a requested-but-null schema is now an **error** rather than
"not yet" (forms-list, aggregation-list, reports-list), and `ListDataSource` clears the loading
flag when a prerequisite fails or the query chain errors — previously that subscription had no
error handler at all and died silently.

### 6. The UI lied about all of it (stage 3)
Every failure above was silent, so the user's only signal was data that looked wrong. There is now
one honest signal, `IDataService.connectionState` (`connected` / `reconnecting` / `failed`),
implemented from real evidence on both sides:

- **Online**: driven by the transport and by auth failures on queries. It is **optimistic by
  default** and only downgraded on actual evidence, so a configuration without a websocket
  (`live: false`) never shows a false "reconnecting". It clears on the socket's `connected` event,
  not merely when data arrives — a quiet server sends nothing, so otherwise recovery would never be
  reported. The toolbar icon becomes `cloud_sync` (fading) while recovering and `cloud_off` when
  recovery failed, each with its own tooltip.
- **Offline**: derived from `problemSyncing`, which already means "resync attempts exhausted".
- **The spinning icon is capped.** `isSyncing` follows replication *activity*, so a replication
  retrying forever kept the icon spinning and never reached the branch that emits
  `replicationCycleComplete`. After 90s of apparent activity the icon now reports a problem and
  stays clickable, because a spinner that cannot stop is a lie. The threshold is deliberately
  generous: a first replication of a large instance legitimately takes a while.
- **`runSync()` online is no longer a no-op.** It was harmless while nothing invited the user to
  press it; now that the indicator offers a retry, it refreshes an expired token and rebuilds the
  transport.
- **An unrecoverable session says so**: a snackbar on `{auth: false, evt: 'refresh failed'}`,
  worded per mode — online the app is dead in the water and the existing `login/expired` redirect
  follows, offline it states that local data is still usable but will not sync.

### Terminology used above
- **offline *mode*** = `dataMode: 'offline'` (RxDB + replication) with the device **online**.
- **network offline** = `navigator.onLine === false`.

This matters because the auth safety-nets key off the *network* meaning: `refreshToken()` and
`checkToken()` short-circuit only when `isOnline$` is false. **In offline mode with the network up
there is no shielding at all** — the token genuinely expires and replication genuinely fails.
Offline simply *looks* healthier because reads are served locally while syncing is dead.
