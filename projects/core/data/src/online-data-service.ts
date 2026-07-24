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
  Observable,
  ObservableInput,
  of as obsOf,
  Subscription,
  throwError,
} from 'rxjs';
import {catchError, debounceTime, map, skip, switchMap} from 'rxjs/operators';

import {DataCreateCollectionRequest} from './data-create-collection-request';
import {DataBulkInsertRequest} from './data-bulk-insert-request';
import {DataFindRequest} from './data-find-request';
import {DataGetRequest} from './data-get-request';
import {DataInsertRequest} from './data-insert-request';
import {DataRequest} from './data-request';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from './data-service-config';
import {BulkInsertResult, CollectionChangedEvent, IDataService} from './data-service-interface';
import {fillConfigDefaultValues} from './data-service-utils';
import {DataUpsertRequest} from './data-upsert-request';
import {findQueryGql, getQueryGql, insertQueryGql, subscriptionQueryGql, updateQueryGql} from './gql';
import {newClient, newClientSubscription} from './graphql-ws-client';
import {Model} from './model';

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

  constructor(
    @Inject(DATA_SERVICE_CONFIG) config: DataServiceConfig,
    private _apollo: Apollo,
    private _authService: AuthService,
  ) {
    this.config = fillConfigDefaultValues(config);
    if (this.config.syncOptions.live !== false && this.config.syncOptions.url.ws != null) {
      this._initRealtime();
    }
  }

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
      catchError(this._queryErrorHandler(null)),
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
      catchError(this._queryErrorHandler(null)),
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
              if (data == null || data.affected_rows !== 1) {
                return {success: [], error: [...(res.errors || [])]};
              }
              return {
                success: (data.returning as R[]).map(r => this._decorate<R>(r, name)),
                error: [],
              };
            }),
          );
      }),
      catchError(this._queryErrorHandler({success: [], error: []})),
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
        const {mutation, mutationName, variables} = updateQueryGql<T>(name, fields, params);
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
      catchError(this._queryErrorHandler([])),
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
        const {mutation, mutationName, variables} = updateQueryGql<T>(name, fields, params);
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
      catchError(this._queryErrorHandler(null)),
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
        const {query, queryName, variables} = findQueryGql<T>(name, fields, params);
        const context = this._getQueryContext();
        return this._apollo
          .query({query, variables, context, errorPolicy: 'all', fetchPolicy: 'no-cache'})
          .pipe(
          map(res => {
            if (res.errors) {
              throw new Error(JSON.stringify(res.errors));
            }
            return ((res.data[queryName] || []) as R[]).map(r => this._decorate<R>(r, name));
          }),
        );
      }),
      catchError(this._queryErrorHandler([])),
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

    combineLatest([
      this._registeredCollections$.pipe(debounceTime(300)),
      this._authService.authToken,
    ]).subscribe(([collections, token]) => {
      if (token == null) {
        this._teardownRealtime();
        return;
      }
      // On a new/changed token, recreate the client and reopen every sub with it.
      if (token !== this._currentToken) {
        this._teardownRealtime();
        this._currentToken = token;
        this._wsClient = newClient(
          this.config.syncOptions.url.ws ?? null,
          token,
          this._refreshEvt,
          this.config.syncOptions.socketJwtExpiredCode,
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
   * Opens a single "table changed" subscription for a collection. The first
   * emission (Hasura's initial snapshot) is skipped, since the list issues its
   * own initial fetch; subsequent emissions signal a server-side change.
   * @param name The collection name.
   */
  private _openCollectionSubscription(name: string): Subscription {
    return newClientSubscription(this._wsClient, {query: subscriptionQueryGql(name)})
      .pipe(skip(1))
      .subscribe({
        next: () =>
          this._collectionChanged.emit({
            timestamp: Date.now(),
            collection: name,
            // Matches the action the offline live path emits, so main-nav's
            // notification filter fires and its "unsynced data" indicator stays off.
            action: 'replication cycle complete',
          }),
        error: err => {
          if (isDevMode()) {
            console.error(`Online realtime subscription error for ${name}:`, err);
          }
        },
      });
  }

  /** Tears down the graphql-ws client and all active subscriptions. */
  private _teardownRealtime(): void {
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
          self.update<R, R>(collectionName, obj as R, {
            is_deleted: true,
            _deleted: true,
          } as unknown as Partial<R>),
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

  private _queryErrorHandler<E, R>(
    errValue: R,
  ): (err: any, caught: Observable<E>) => ObservableInput<R> {
    return err => {
      if (isDevMode()) {
        console.error(err);
      }
      return obsOf(errValue);
    };
  }
}
