/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dino (dino).
 *
 * Dino (dino) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dino (dino) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dino (dino).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {HttpHeaders} from '@angular/common/http';
import {EventEmitter, Inject, Injectable, isDevMode} from '@angular/core';
import {AuthService, buildAuthorizationHeader} from '@dino/core/auth';
import {Apollo} from 'apollo-angular';
import {Client} from 'graphql-ws';
import {
  BehaviorSubject,
  combineLatest,
  firstValueFrom,
  MonoTypeOperatorFunction,
  NEVER,
  Observable,
  ObservableInput,
  of as obsOf,
  Subscription,
  throwError,
  timer,
} from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  skip,
  switchMap,
} from 'rxjs/operators';

import {DataCreateCollectionRequest} from './data-create-collection-request';
import {DataBulkInsertRequest} from './data-bulk-insert-request';
import {DataFindRequest} from './data-find-request';
import {DataGetRequest} from './data-get-request';
import {DataInsertRequest} from './data-insert-request';
import {DataRequest} from './data-request';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from './data-service-config';
import {
  BulkInsertResult,
  CollectionChangedEvent,
  IDataService,
  SyncErrorEvent,
} from './data-service-interface';
import {fillConfigDefaultValues} from './data-service-utils';
import {DataUpsertRequest} from './data-upsert-request';
import {
  FieldTypeInfo,
  FieldTypeResolver,
  findQueryGql,
  getQueryGql,
  insertQueryGql,
  subscriptionQueryGql,
  updateQueryGql,
} from './gql';
import {newClient, newClientSubscription} from './graphql-ws-client';
import {matchesSelector, splitSelector} from './mango-eval';
import {Model} from './model';

/**
 * Upper bound on rows fetched when a query needs in-memory filtering (a filter
 * on a key inside a jsonb column). Prevents an unbounded fetch on large tables.
 */
const MAX_IN_MEMORY_FILTER_ROWS = 5000;

/**
 * Coalescing window for realtime rebuild requests. Every subscription errors at
 * once when graphql-ws gives up, and one rebuild must serve all of them.
 */
const REALTIME_REBUILD_DEBOUNCE_MS = 500;

/** First backoff step before rebuilding a dead realtime transport. */
const REALTIME_REBUILD_BASE_DELAY_MS = 1000;

/** Upper bound on the rebuild backoff, so recovery stays possible indefinitely. */
const REALTIME_REBUILD_MAX_DELAY_MS = 60 * 1000;

/**
 * How long the app may be hidden before its websocket is assumed stale.
 *
 * A socket that dies while the device is suspended leaves no trace whatsoever:
 * the subscriptions are still registered, `readyState` is still OPEN, and no
 * keep-alive ping went out while timers were frozen, so the liveness watchdog
 * cannot have noticed. Past one keep-alive period the only safe assumption on
 * resume is that the connection needs rebuilding.
 */
const REALTIME_STALE_AFTER_HIDDEN_MS = 30 * 1000;

/**
 * GraphQL/transport errors that mean "the token is no longer accepted". Hasura
 * answers an expired JWT with **HTTP 200** and an `errors` array, so this cannot
 * be detected by status code — see `docs/online-mode-status.md`.
 */
const AUTH_ERROR_PATTERN = /invalid-jwt|JWTExpired|Could not verify JWT/i;

/**
 * Online (Apollo → Hasura) implementation of `IDataService`, used when
 * `dataConfig.dataMode === 'online'`. It returns plain GraphQL objects wrapped
 * by an RxDocument-compatibility shim (`_decorate`) so managers/consumers written
 * against the offline RxDB stack run unchanged.
 *
 * Design rationale (token + shim, why we did NOT duplicate every manager, plus
 * the `__typename`/`no-cache`/populate details): see `docs/online-mode-status.md`
 * → "Architecture: the token + shim approach". Read it before changing `_decorate`.
 */
@Injectable({providedIn: 'root'})
export class OnlineDataService implements IDataService {
  /**
   * True when the Syncing process is currently operating
   * (A replication cycle is undergoing)
   */
  readonly isSyncing = obsOf(false);

  readonly config: DataServiceConfig;

  /**
   * Emits when a collection changes on the server (via a GraphQL subscription),
   * so lists and the notifications bell re-query. Mirrors the offline
   * `DataService.collectionChanged`.
   */
  private _collectionChanged = new EventEmitter<CollectionChangedEvent>();
  readonly collectionChanged = this._collectionChanged as Observable<CollectionChangedEvent>;

  /**
   * Online mode has no local sync lifecycle; the app module still drives this
   * emitter to gate the "Initializing data" screen.
   */
  readonly collectionsInitialized = new EventEmitter<'started' | 'completed'>();

  /**
   * There is no local replication online, so this is immediately true.
   * Prefer `dataReady` for gating feature startup.
   */
  readonly firstReplicationComplete = obsOf(true);

  /**
   * Emits true once collections are registered and the user is authenticated,
   * i.e. queries can actually be made.
   *
   * Deliberately NOT derived from `collectionsInitialized`: the app module only
   * emits that on a `'login'` auth event, so a reload with a stored token would
   * never become ready.
   */
  readonly dataReady: Observable<boolean>;

  /** Nothing is synchronized online, so no collection can be in trouble. */
  readonly problemSyncing = obsOf<string[]>([]);

  /** No replication online: these never emit. */
  readonly replicationCycleComplete = NEVER as Observable<void>;
  readonly syncErrorEvt = NEVER as Observable<SyncErrorEvent>;
  readonly couldNotSyncEvt = NEVER as Observable<SyncErrorEvent>;

  private _collections: {[name: string]: string[]} = {};

  /**
   * Per-collection JSON schema properties, kept so reference fields can be
   * resolved by the RxDocument-compatibility shim (see `_decorate`).
   */
  private _schemas: {[name: string]: {[prop: string]: any}} = {};

  /**
   * Names of the collections registered so far. Drives realtime subscription
   * setup as managers initialize.
   */
  private _registeredCollections$ = new BehaviorSubject<string[]>([]);

  /** The shared graphql-ws client for realtime subscriptions. */
  private _wsClient: Client | null = null;
  /** Active per-collection subscription streams. */
  private _activeSubs: {[name: string]: Subscription} = {};
  /** The auth token the current client/subscriptions were opened with. */
  private _currentToken: string | null = null;
  /** Emitted to trigger a token refresh when the socket reports JWT expiry. */
  private _refreshEvt = new EventEmitter<void>();
  /**
   * Emitted when the realtime transport must be rebuilt from scratch: the
   * liveness watchdog closed a half-open socket, or graphql-ws exhausted its
   * retries and errored every subscription.
   */
  private _rebuildRealtimeEvt = new EventEmitter<void>();
  /**
   * True while `_teardownRealtime()` was called deliberately (logout / token
   * cleared), so an incidental close is not mistaken for an intentional one.
   */
  private _realtimeTornDown = false;
  /** Consecutive rebuild attempts, used to back off. Reset on a live socket. */
  private _rebuildAttempts = 0;

  constructor(
    @Inject(DATA_SERVICE_CONFIG) config: DataServiceConfig,
    private _apollo: Apollo,
    private _authService: AuthService,
  ) {
    this.config = fillConfigDefaultValues(config);
    this.dataReady = combineLatest([
      this._registeredCollections$,
      this._authService.authToken,
    ]).pipe(
      filter(([collections, token]) => collections.length > 0 && token != null),
      map(() => true),
      distinctUntilChanged(),
      shareReplay(1),
    );
    if (this.config.syncOptions.live !== false && this.config.syncOptions.url.ws != null) {
      this._initRealtime();
    }
  }

  /**
   * No-op online: there is no local replication to run, and every read already
   * goes straight to the server.
   */
  runSync(): void {}

  /**
   * Get an object from the database.
   * Throws and error if the collection does not exist.
   * @param params The get request parameters.
   */
  get<T extends Model = Model>(params: DataGetRequest): Observable<T | null> {
    return this._getCollection(params).pipe(
      switchMap(({name, fields}) => {
        const {query, queryName, variables} = getQueryGql<T>(name, fields, params.id);
        const context = this._getQueryContext();
        return this._apollo
          .query({query, variables, context, errorPolicy: 'all', fetchPolicy: 'no-cache'})
          .pipe(
            map(res => {
              if (res.errors) {
                throw new Error(JSON.stringify(res.errors));
              }
              const results = res.data[queryName] || [];
              if (results.length === 1) {
                return this._decorate<T>(results[0], name);
              }
              return null;
            }),
          );
      }),
      this._retryOnAuthError(),
      catchError(this._queryErrorHandler(null, `get(${params.collectionName})`, {id: params.id})),
    );
  }

  /**
   * Insert a new object into the database.
   * Throws and error if the collection does not exist.
   * @param params The insert request parameters.
   */
  insert<T extends Model = Model, R extends T = T>(
    params: DataInsertRequest<T>,
  ): Observable<R | null> {
    return this._getCollection(params).pipe(
      switchMap(({name, fields}) => {
        const objects = [this._stripInternalFields(params.object)];
        const returningFields = params.returningFields ?? fields;
        const {mutation, mutationName} = insertQueryGql<T>(name, returningFields);
        const context = this._getQueryContext();
        return this._apollo
          .mutate({mutation, context, variables: {objects}, errorPolicy: 'all'})
          .pipe(
            map(res => {
              if (res.errors) {
                throw new Error(JSON.stringify(res.errors));
              }
              const data = (res.data || {})[mutationName];
              if (data == null || data.affected_rows !== 1) {
                return null;
              }
              return this._decorate<R>(data.returning[0], name);
            }),
          );
      }),
      this._retryOnAuthError(),
      catchError(this._queryErrorHandler(null, `insert(${params.collectionName})`)),
    );
  }

  /**
   * Insert multiple objects into the database.
   * Throws and error if the collection does not exist.
   * @param params The bulk insert request parameters.
   */
  bulkInsert<T extends Model = Model, R extends T = T>(
    params: DataBulkInsertRequest<T>,
  ): Observable<BulkInsertResult<R>> {
    return this._getCollection(params).pipe(
      switchMap(({name, fields}) => {
        const objects = params.objects.map(o => this._stripInternalFields(o));
        const {mutation, mutationName} = insertQueryGql<T>(name, fields);
        const context = this._getQueryContext();
        return this._apollo
          .mutate({mutation, context, variables: {objects}, errorPolicy: 'all'})
          .pipe(
            map(res => {
              if (res.errors) {
                throw new Error(JSON.stringify(res.errors));
              }
              const data = (res.data || {})[mutationName];
              // A bulk insert of N objects reports `affected_rows: N`, so only
              // treat zero (or a missing payload) as a failure. Comparing
              // against 1 made every multi-row import look like it failed even
              // though the rows had been written.
              if (data == null || data.affected_rows == null || data.affected_rows < 1) {
                return {success: [], error: [...(res.errors || [])]};
              }
              return {
                success: ((data.returning ?? []) as R[]).map(r => this._decorate<R>(r, name)),
                error: [],
              };
            }),
          );
      }),
      this._retryOnAuthError(),
      catchError(
        this._queryErrorHandler({success: [], error: []}, `bulkInsert(${params.collectionName})`),
      ),
    );
  }

  /**
   * Update multiple objects in the database.
   * Throws and error if the collection does not exist.
   * @param params The bulk update request parameters.
   * @param update The updated fields set.
   */
  bulkUpdate<T extends Model = Model, R extends T = T>(
    params: DataFindRequest<T>,
    update: Partial<T>,
  ): Observable<R[]> {
    return this._getCollection(params).pipe(
      switchMap(({name, fields}) => {
        const {mutation, mutationName, variables} = updateQueryGql<T>(
          name,
          fields,
          params,
          this._fieldTypeResolver(name),
        );
        const context = this._getQueryContext();
        return this._apollo
          .mutate({
            mutation,
            context,
            variables: {...variables, _set: this._stripInternalFields(update)},
            errorPolicy: 'all',
          })
          .pipe(
            map(res => {
              if (res.errors) {
                throw new Error(JSON.stringify(res.errors));
              }
              const data = (res.data || {})[mutationName] || {};
              return ((data.returning || []) as R[]).map(r => this._decorate<R>(r, name));
            }),
          );
      }),
      this._retryOnAuthError(),
      catchError(
        this._queryErrorHandler([], `bulkUpdate(${params.collectionName})`, {
          selector: params.query?.selector,
        }),
      ),
    );
  }

  update<T extends Model = Model, R extends T = T>(
    collectionName: string,
    doc: T,
    updateData: Partial<T>,
  ): Observable<R | null> {
    return this._getCollection({collectionName}).pipe(
      switchMap(({name, fields}) => {
        const params = {
          collectionName: name,
          query: {selector: {id: {$eq: doc.id}}},
        } as DataFindRequest<T>;
        const {mutation, mutationName, variables} = updateQueryGql<T>(
          name,
          fields,
          params,
          this._fieldTypeResolver(name),
        );
        const context = this._getQueryContext();
        return this._apollo
          .mutate({
            mutation,
            context,
            variables: {...variables, _set: this._stripInternalFields(updateData)},
            errorPolicy: 'all',
          })
          .pipe(
            map(res => {
              if (res.errors) {
                throw new Error(JSON.stringify(res.errors));
              }
              const data = (res.data || {})[mutationName] || {};
              const results = data.returning || [];
              if (results.length !== 1) {
                return null;
              }
              return this._decorate<R>(results[0], name);
            }),
          );
      }),
      this._retryOnAuthError(),
      catchError(this._queryErrorHandler(null, `update(${collectionName})`, {id: doc?.id})),
    );
  }

  /**
   * Insert a new object if it does not exist within the collection, otherwise it will overwrite it.
   * Throws and error if the collection does not exist.
   * @param params The upinsert request parameters.
   */
  upsert<T extends Model = Model, R extends T = T>(
    params: DataUpsertRequest<T>,
  ): Observable<R | null> {
    const {collectionName, object} = params;
    const {id} = object;
    const existing$ = id != null ? this.get({collectionName, id}) : obsOf(null);
    return existing$.pipe(
      switchMap(existing => {
        if (existing == null) {
          return this.insert<T, R>(params);
        }
        return this.update<T, R>(collectionName, object as T, object as Partial<T>);
      }),
    );
  }

  /**
   * Create a RxQuery query object for multiple documents selection.
   * Throws and error if the collection does not exist.
   * @param params The find request parameters.
   */
  find<T extends Model = Model, R extends T = T>(params: DataFindRequest<T>): Observable<R[]> {
    return this._getCollection(params).pipe(
      switchMap(({name, fields}) => {
        // Conditions on keys inside a jsonb column (e.g. `data.age`) are not
        // expressible in Hasura, so they are split off and applied in memory.
        const {server: serverSelector, client: clientSelector} = splitSelector(
          params.query?.selector as {[key: string]: any} | undefined,
        );
        const filterInMemory = clientSelector != null;
        const serverRequest: DataFindRequest<T> = {
          ...params,
          query: {
            ...(params.query ?? {}),
            selector: serverSelector as any,
            // Paging must happen after in-memory filtering, otherwise a page
            // would be computed from unfiltered rows. Fetch up to a bounded
            // number of rows instead and page below.
            ...(filterInMemory ? {limit: MAX_IN_MEMORY_FILTER_ROWS, skip: undefined} : {}),
          } as DataFindRequest<T>['query'],
        };
        const {query, queryName, variables} = findQueryGql<T>(
          name,
          fields,
          serverRequest,
          this._fieldTypeResolver(name),
        );
        const context = this._getQueryContext();
        return this._apollo
          .query({query, variables, context, errorPolicy: 'all', fetchPolicy: 'no-cache'})
          .pipe(
            map(res => {
              if (res.errors) {
                throw new Error(JSON.stringify(res.errors));
              }
              let rows = (res.data[queryName] || []) as R[];
              if (filterInMemory) {
                if (rows.length >= MAX_IN_MEMORY_FILTER_ROWS && isDevMode()) {
                  console.warn(
                    `[OnlineDataService] '${name}': in-memory filtering hit the ` +
                      `${MAX_IN_MEMORY_FILTER_ROWS}-row cap; results may be incomplete.`,
                  );
                }
                rows = rows.filter(row => matchesSelector(row, clientSelector));
                const skip = params.query?.skip ?? 0;
                const limit = params.query?.limit;
                rows = limit != null ? rows.slice(skip, skip + limit) : rows.slice(skip);
              }
              return rows.map(r => this._decorate<R>(r, name));
            }),
          );
      }),
      this._retryOnAuthError(),
      catchError(
        this._queryErrorHandler([], `find(${params.collectionName})`, {
          selector: params.query?.selector,
        }),
      ),
    );
  }

  /**
   * Create a collection in the local database from a JSON schema
   * and sets up the GraphQL sync.
   * @param params The create collection request parameters.
   */
  createCollection(params: DataCreateCollectionRequest): Observable<boolean> {
    const {name, collection} = params;
    if (this._collections[name] == null) {
      this._collections[name] = Object.keys(collection.schema.properties);
      this._schemas[name] = collection.schema.properties;
      this._registeredCollections$.next(Object.keys(this._collections));
    }
    return obsOf(true);
  }

  /**
   * Sets up realtime updates for online mode. Mirrors the offline
   * `DataService._initSync`: reacts to the set of registered collections and the
   * auth token; (re)creates a graphql-ws client on token change and opens one
   * "table changed" subscription per collection. Each server push emits a
   * `CollectionChangedEvent`, which the existing list/nav consumers use to
   * re-query. There is no local store, so nothing is pulled/persisted.
   */
  private _initRealtime(): void {
    // Refresh the token when the socket reports JWT expiry (same pattern as
    // the offline DataService).
    this._refreshEvt
      .pipe(
        debounceTime(this._authService.authConfig.retryRefreshTime),
        switchMap(() => this._authService.refreshToken()),
      )
      .subscribe();

    // Rebuild the transport when it dies. Backed off, and coalesced so a burst
    // of failing subscriptions produces one rebuild rather than one each.
    this._rebuildRealtimeEvt
      .pipe(
        debounceTime(REALTIME_REBUILD_DEBOUNCE_MS),
        switchMap(() => {
          this._rebuildAttempts++;
          const delayMs = Math.min(
            REALTIME_REBUILD_BASE_DELAY_MS * Math.pow(2, this._rebuildAttempts - 1),
            REALTIME_REBUILD_MAX_DELAY_MS,
          );
          return timer(delayMs);
        }),
      )
      .subscribe(() => this._rebuildRealtime());

    // Revive the transport when the app comes back to the foreground. A
    // suspended device stops sending keep-alive pings, so the watchdog cannot
    // have run while hidden — this is the check that catches a socket which died
    // during the suspension.
    this._authService.appResumed.subscribe(hiddenForMs => this._verifyRealtimeAlive(hiddenForMs));

    combineLatest([
      this._registeredCollections$.pipe(debounceTime(300)),
      this._authService.authToken,
    ]).subscribe(([collections, token]) => {
      if (token == null) {
        this._teardownRealtime();
        return;
      }
      // On a new/changed token, recreate the client and reopen every sub with it.
      if (token !== this._currentToken || this._wsClient == null) {
        this._teardownRealtime();
        this._currentToken = token;
        this._realtimeTornDown = false;
        this._wsClient = newClient(
          this.config.syncOptions.url.ws ?? null,
          token,
          this._refreshEvt,
          this.config.syncOptions.socketJwtExpiredCode,
          {
            // Read the token at connect time: a reconnect must not replay the
            // token captured when the client was built, which by then is the
            // expired one that killed the connection in the first place.
            getToken: () => this._authService.getAuthToken(),
            onDead: () => this._rebuildRealtimeEvt.emit(),
          },
        );
      }
      // Open subscriptions for newly registered collections.
      collections.forEach(name => {
        if (this._activeSubs[name] == null) {
          this._activeSubs[name] = this._openCollectionSubscription(name);
        }
      });
      // Drop subscriptions for collections that are no longer registered.
      Object.keys(this._activeSubs)
        .filter(name => !collections.includes(name))
        .forEach(name => {
          this._activeSubs[name].unsubscribe();
          delete this._activeSubs[name];
        });
    });
  }

  /**
   * Discards the current graphql-ws client and opens a fresh one, reopening a
   * subscription per registered collection.
   *
   * Needed because graphql-ws gives up permanently once its retry budget is
   * exhausted — which a backgrounded device does while asleep, since the whole
   * budget spans well under a minute — and a disposed client never reconnects.
   */
  private _rebuildRealtime(): void {
    // Deliberately torn down (logged out): nothing to rebuild.
    if (this._realtimeTornDown || this._authService.getAuthToken() == null) {
      return;
    }
    if (isDevMode()) {
      console.warn(`[OnlineDataService] rebuilding realtime (attempt ${this._rebuildAttempts})`);
    }
    this._teardownRealtime();
    this._realtimeTornDown = false;
    // Re-emitting the registered collections re-runs the setup above, which
    // creates a new client because `_currentToken` was cleared.
    this._registeredCollections$.next(Object.keys(this._collections));
  }

  /**
   * Checks whether realtime is still functional on resume and rebuilds it
   * otherwise, immediately — the user is waiting, so no backoff applies here and
   * the failure counter is reset, since a resume is not an escalating failure.
   * @param hiddenForMs How long the app was in the background.
   */
  private _verifyRealtimeAlive(hiddenForMs: number): void {
    if (this._realtimeTornDown || this._authService.getAuthToken() == null) {
      return;
    }
    const missingSubs =
      this._wsClient == null ||
      Object.keys(this._activeSubs).length < Object.keys(this._collections).length;
    if (missingSubs || hiddenForMs > REALTIME_STALE_AFTER_HIDDEN_MS) {
      this._rebuildAttempts = 0;
      this._rebuildRealtime();
    }
  }

  /**
   * Opens a single "table changed" subscription for a collection. The first
   * emission (Hasura's initial snapshot) is skipped, since the list issues its
   * own initial fetch; subsequent emissions signal a server-side change.
   * @param name The collection name.
   */
  private _openCollectionSubscription(name: string): Subscription {
    return newClientSubscription(this._wsClient, {query: subscriptionQueryGql(name)})
      .pipe(skip(1))
      .subscribe({
        next: () => {
          // Proof of life: the transport delivers, so the next failure starts
          // its backoff from scratch instead of inheriting an old escalation.
          this._rebuildAttempts = 0;
          this._collectionChanged.emit({
            timestamp: Date.now(),
            collection: name,
            // Matches the action the offline live path emits, so main-nav's
            // notification filter fires and its "unsynced data" indicator stays off.
            action: 'replication cycle complete',
          });
        },
        error: err => {
          if (isDevMode()) {
            console.error(`Online realtime subscription error for ${name}:`, err);
          }
          // Drop the dead subscription: the setup guard is
          // `if (this._activeSubs[name] == null)`, so leaving a terminated
          // Subscription in place made it impossible to ever re-subscribe.
          delete this._activeSubs[name];
          // graphql-ws errors every sink once its retry budget is gone, and the
          // client is then permanently dead — only a fresh one recovers.
          this._rebuildRealtimeEvt.emit();
        },
      });
  }

  /** Tears down the graphql-ws client and all active subscriptions. */
  private _teardownRealtime(): void {
    this._realtimeTornDown = true;
    Object.values(this._activeSubs).forEach(sub => sub.unsubscribe());
    this._activeSubs = {};
    if (this._wsClient != null) {
      this._wsClient.dispose();
      this._wsClient = null;
    }
    this._currentToken = null;
  }

  /**
   * Destroy an existing collection in the local database.
   * Throws and error if the collection does not exist.
   * @param _collectionName The name of the collection to destroy.
   */
  destroyCollection(_collectionName: string): Observable<boolean> {
    return obsOf(true);
  }

  /**
   * Online mode performs no local replication, so a collection's "first sync"
   * is considered complete immediately.
   * @param _name The collection name.
   */
  collectionFirstSyncCompleted(_name: string): Observable<boolean> {
    return obsOf(true);
  }

  /**
   * Wraps a plain online result in a minimal RxDocument-compatible object, so
   * consumer code written against the offline RxDB stack keeps working online.
   *
   * Apollo freezes query results in dev mode, so we decorate a shallow copy
   * (never the original). The added members are non-enumerable, so `{...doc}`,
   * `JSON.stringify` and `deepCopy` still yield clean data without them.
   * @param row The plain result object from a GraphQL response.
   * @param collectionName The collection the row belongs to.
   */
  private _decorate<R extends Model = Model>(row: any, collectionName: string): R {
    if (row == null || typeof row !== 'object') {
      return row as R;
    }
    const obj: any = {...row};
    const self = this;
    const def = (value: any) => ({value, configurable: true, enumerable: false, writable: true});
    Object.defineProperties(obj, {
      // RxDB detects documents with a plain property check:
      // `'isInstanceOfRxDocument' in obj` (rxdb/dist/esm/rx-document.js).
      // Setting it makes `isRxDocument()` true for online results, so consumer
      // code that branches on it (metric selection, metric sub-filter renaming,
      // status changer, exporter…) behaves the same as offline.
      isInstanceOfRxDocument: def(true),
      // RxDocument.toJSON(): plain data without the shim members.
      toJSON: def(() => ({...obj})),
      // RxDocument.collection.name is used for permission checks.
      collection: def({name: collectionName}),
      // RxDocument.populate(field): resolve a reference via GraphQL.
      populate: def((field: string) => self._populateField(obj, collectionName, field)),
      // RxDocument.patch()/incrementalPatch(): map to an update mutation.
      patch: def((changes: Partial<R>) =>
        firstValueFrom(self.update<R, R>(collectionName, obj as R, changes)),
      ),
      incrementalPatch: def((changes: Partial<R>) =>
        firstValueFrom(self.update<R, R>(collectionName, obj as R, changes)),
      ),
      // RxDocument.remove(): soft-delete, matching the app's delete convention.
      remove: def(() =>
        firstValueFrom(
          self.update<R, R>(
            collectionName,
            obj as R,
            {
              is_deleted: true,
              _deleted: true,
            } as unknown as Partial<R>,
          ),
        ),
      ),
    });
    return obj as R;
  }

  /**
   * Resolves a reference field to its target document(s) via GraphQL, mirroring
   * RxDocument.populate(). Single-id refs resolve to one document; array refs
   * resolve to an array.
   * @param row The document holding the reference field.
   * @param collectionName The collection the row belongs to.
   * @param field The reference field name (e.g. 'user_role_ref_id').
   */
  private _populateField(row: any, collectionName: string, field: string): Promise<any> {
    const props = this._schemas[collectionName];
    const propDef: any = props ? props[field] : null;
    const ref: string | undefined = propDef?.ref ?? propDef?.items?.ref;
    const value = row ? row[field] : null;
    // Skip when there is no ref, no value, or the referenced collection is not
    // registered (e.g. a disabled optional module) — resolve empty instead of
    // querying a collection that does not exist.
    if (ref == null || value == null || this._collections[ref] == null) {
      return Promise.resolve(Array.isArray(value) ? [] : null);
    }
    if (Array.isArray(value)) {
      return firstValueFrom(
        this.find({collectionName: ref, query: {selector: {id: {$in: value}}}}),
      );
    }
    return firstValueFrom(this.get({collectionName: ref, id: value}));
  }

  /**
   * Deeply removes Apollo-internal fields (e.g. `__typename`) that are added to
   * query results but are rejected by Hasura `*_set_input` / `*_insert_input`
   * types. Applied to every mutation input so fetched objects can be written
   * back unchanged.
   * @param value The value to sanitize.
   */
  private _stripInternalFields<X>(value: X): X {
    if (Array.isArray(value)) {
      return value.map(v => this._stripInternalFields(v)) as unknown as X;
    }
    if (value != null && typeof value === 'object') {
      const out: {[key: string]: any} = {};
      for (const key of Object.keys(value as {[key: string]: any})) {
        if (key === '__typename') {
          continue;
        }
        out[key] = this._stripInternalFields((value as {[key: string]: any})[key]);
      }
      return out as X;
    }
    return value;
  }

  /**
   * Builds a field type lookup for a collection from its JSON schema, so the
   * query translator can pick the right Hasura shape (containment for array
   * columns) and drop the `'all'` sentinel from scalar reference filters.
   * @param collectionName The collection name.
   */
  private _fieldTypeResolver(collectionName: string): FieldTypeResolver {
    const properties = this._schemas[collectionName];
    return (field: string): FieldTypeInfo | undefined => {
      const definition: any = properties ? properties[field] : null;
      if (definition == null) {
        return undefined;
      }
      const type = definition.type;
      const isArray = Array.isArray(type) ? type.includes('array') : type === 'array';
      return {isArray};
    };
  }

  private _getCollection(params: DataRequest): Observable<{name: string; fields: string[]}> {
    const {collectionName} = params;
    if (this._collections[collectionName] == null) {
      return throwError(() => new Error(`Invalid collection: ${collectionName}`));
    }
    return obsOf({name: collectionName, fields: this._collections[collectionName]});
  }

  private _getQueryContext(): {headers: HttpHeaders} {
    let headers = new HttpHeaders();
    const token = this._authService.getAuthToken();
    if (token != null) {
      headers = headers.set('Authorization', buildAuthorizationHeader(token));
    }
    return {
      headers,
    };
  }

  /**
   * True when a failure means "the token is no longer accepted", rather than a
   * genuine data or network error.
   * @param err The caught error.
   */
  private _isAuthError(err: unknown): boolean {
    if (err == null) {
      return false;
    }
    if ((err as {status?: number}).status === 401) {
      return true;
    }
    let message: string;
    if (err instanceof Error) {
      message = err.message;
    } else {
      try {
        // Not every error is an Error: Apollo surfaces the GraphQL `errors` array,
        // and an HttpErrorResponse can hold self-referencing headers, so this must
        // not be allowed to throw from inside an error handler.
        message = JSON.stringify(err) ?? '';
      } catch {
        return false;
      }
    }
    const configured = this.config.syncOptions.authErrorMessage;
    if (configured != null && message.includes(configured)) {
      return true;
    }
    return AUTH_ERROR_PATTERN.test(message);
  }

  /**
   * Refreshes the token and retries the operation **once** when it failed only
   * because the token had expired.
   *
   * Without this an expired token is indistinguishable from an empty table: the
   * server answers HTTP 200 with an `errors` array, which never reaches the HTTP
   * interceptor (it only triggers on 401/400), and the error handler below turns
   * it into `[]`/`null`. That is the reported "lists are empty after idle".
   *
   * Retrying re-subscribes the whole chain, so the request is rebuilt and picks
   * up the new token (the auth header is read per request). Exactly one retry:
   * the re-subscribed source does not carry this operator.
   */
  private _retryOnAuthError<T>(): MonoTypeOperatorFunction<T> {
    return source =>
      source.pipe(
        catchError(err => {
          if (!this._isAuthError(err)) {
            return throwError(() => err);
          }
          if (isDevMode()) {
            console.warn('[OnlineDataService] token rejected, refreshing and retrying once');
          }
          return this._authService
            .refreshToken()
            .pipe(switchMap(refreshed => (refreshed ? source : throwError(() => err))));
        }),
      );
  }

  /**
   * Recovers from a failed GraphQL operation by emitting a neutral value.
   *
   * The failure is always logged (not only in dev mode): swallowing it silently
   * makes a rejected query indistinguishable from "no results", which is very
   * hard to diagnose from the UI.
   * @param errValue The value to emit instead.
   * @param operation Optional operation description, included in the log.
   * @param details Optional context (e.g. the variables sent).
   */
  private _queryErrorHandler<E, R>(
    errValue: R,
    operation?: string,
    details?: Record<string, any>,
  ): (err: any, caught: Observable<E>) => ObservableInput<R> {
    return err => {
      const label =
        operation != null
          ? `[OnlineDataService] ${operation} failed`
          : '[OnlineDataService] query failed';
      if (details != null) {
        console.error(label, err, details);
      } else {
        console.error(label, err);
      }
      return obsOf(errValue);
    };
  }
}
