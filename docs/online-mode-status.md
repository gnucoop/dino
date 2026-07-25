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
| 8 | Forms | `/forms/:id` | Create form data | ✅ | 🟡 | ❌ |
| 9 | Forms | `/forms/:id` | Edit form data (incl. change metric) | ✅ | ✅ | ✅ |
| 10 | Forms | `/forms/:id` | Delete form data | ✅ | 🟡 | ✅ |
| 11 | Forms | `/forms/:id` | Duplicate form data | ✅ | 🟡 | ✅ |
| 12 | Forms | `/forms/:id` | Change status | ✅ | 🟡 | ✅  |
| 13 | Forms | `/forms/:id` | Bulk actions | ✅ | ❓ | ✅ |
| 14 | Forms | `/forms/:id` | Export list (xlsx/csv) | ✅ | 🟡 | ✅ |
| 15 | Forms | `/forms/:id` | Import form data | ✅ | ❓ | ❌|
| 16 | Forms | `/forms/:id` | Print / docx | ✅ | ❓ | ✅ |
| 17 | Forms | `/forms/:id` | View change log | ✅ | ❓ | ✅ |
| 18 | Forms (authoring) | forms-collect | Create/edit form schema | ✅ | ❓ | ✅ |
| 19 | Public form | `/f/:id` | Fill & submit (anonymous) | ⛔ | ✅ | ☐ |
| 20 | Reports | `/reports` | List report schemas | ✅ | ✅ | ✅ |
| 21 | Reports | `/reports/:id` | View report (charts/widgets) | ✅ | 🟡 | ✅ |
| 22 | Reports | `/reports/:id` | Create/edit report data | ✅ | 🟡 | ☐ |
| 23 | Reports | `/reports/:id` | Delete report data | ✅ | 🟡 | ✅ |
| 24 | Reports (authoring) | reports-collect | Create/edit report schema | ✅ | ❓ | ☐ |
| 25 | Reports | — | Favorite report | ✅ | 🟡 | ✅ |
| 26 | Aggregation | `/aggregation` | List / view aggregations | ✅ | 🟡 | ✅ |
| 27 | Aggregation | `/forms/:id` | Aggregation form creator | ✅ | ❓ | ☐ |
| 28 | Metrics | `/metrics` | List metric domains | ✅ | 🟡 | ✅ |
| 29 | Metrics | `/metrics` | Create/edit metric (organizations) | ✅ | 🟡 | ✅ |
| 30 | Metrics | `/metrics` | Delete metric | ✅ | 🟡 | ✅ |
| 31 | Users | `/users` | List users | ✅ | 🟡 | ☐ |
| 32 | Users | `/users` | Create/edit user | ✅ | 🟡 | ☐ |
| 33 | Users | `/users` | Manage groups / roles | ✅ | 🟡 | ☐ |
| 34 | Languages | `/languages` | View translations | ✅ | ✅ | ✅ |
| 35 | Languages | `/languages` | Add/edit/remove translation | ✅ | 🟡 | ☐ |
| 36 | Notifications | `/notifications` | List notifications | ✅ | 🟡 | ☐ |
| 37 | AI | `/ai` | GPT chat (Pandino API) | ✅ | 🟡 | ☐ |
| 38 | AI | `/rag` | RAG (Pandino API) | ✅ | 🟡 | ☐ |
| 39 | Payments | `/checkout` | Stripe checkout | ✅ | 🟡 | ☐ |
| 40 | System | — | Realtime list refresh after write | ✅ | 🟡 | ✅ |
| 41 | System | — | Backup / Restore DB | ✅ | ⛔ | ☐ |
| 42 | System | — | Offline queue / background sync | ✅ | ⛔ | ☐ |

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
