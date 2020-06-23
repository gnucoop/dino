/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dewco (dewco).
 *
 * Dewco (dewco) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dewco (dewco) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dewco (dewco).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {EventEmitter, Inject, Injectable} from '@angular/core';
import {AuthService} from '@dewco/core/auth';
import * as pouchdbAdapterIdb from 'pouchdb-adapter-idb';
import * as pouchdbAdapterMemory from 'pouchdb-adapter-memory';
import {addRxPlugin, createRxDatabase, RxCollection, RxDatabase, RxDocument, RxQuery} from 'rxdb';
import {RxDBMigrationPlugin} from 'rxdb/plugins/migration';
import {
  RxDBReplicationGraphQLPlugin,
  RxGraphQLReplicationState,
} from 'rxdb/plugins/replication-graphql';
import {
  BehaviorSubject,
  combineLatest,
  from,
  Observable,
  of as obsOf,
  Subscription,
  throwError,
} from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  mapTo,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import {v4 as uuidv4} from 'uuid';

import {DataBulkInsertRequest} from './data-bulk-insert-request';
import {DataCreateCollectionRequest} from './data-create-collection-request';
import {DataFindRequest} from './data-find-request';
import {DataGetRequest} from './data-get-request';
import {DataInsertRequest} from './data-insert-request';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from './data-service-config';
import {DataUpsertRequest} from './data-upsert-request';
import {InsertModel} from './insert-model';
import {Model} from './model';
import {PullQueryExtraParams} from './pull-query-extra-params';
import {PushQueryExtraParams} from './push-query-extra-params';
import {pullQueryBuilder, pushQueryBuilder, subscriptionQueryBuilder} from './sync-utils';

/**
 * Event fired when collection data changes.
 */
export interface CollectionChangedEvent {
  /**
   * Change event time.
   */
  timestamp: number;

  /**
   * Collection name.
   */
  collection: string;
}

/**
 * Parameters needed to set up the collection sync.
 */
interface CollectionSyncParams {
  /**
   * The collection's pull query extra parameters.
   */
  pullQueryExtraParams?: PullQueryExtraParams;

  /**
   * The collection's push query extra parameters.
   */
  pushQueryExtraParams?: PushQueryExtraParams;
}

/**
 * A collection registered in the data service.
 */
interface RegisteredCollection extends CollectionSyncParams {
  /**
   * The registered collection.
   */
  collection: RxCollection;
}

/**
 * Service that allows to interact with the local database.
 */
@Injectable({providedIn: 'root'})
export class DataService {
  private _collectionChanged: EventEmitter<CollectionChangedEvent> =
      new EventEmitter<CollectionChangedEvent>();
  /**
   * Event fired when
   */
  readonly collectionChanged: Observable<CollectionChangedEvent> =
      this._collectionChanged as Observable<CollectionChangedEvent>;

  private _db: Observable<RxDatabase>;
  private _registeredCollections: BehaviorSubject<RegisteredCollection[]> =
      new BehaviorSubject<RegisteredCollection[]>([]);
  private _activeSyncs:
      {[key: string]: {state: RxGraphQLReplicationState, sub: {unsubscribe: () => void}}} = {};
  private _config: DataServiceConfig;

  constructor(
      private _authService: AuthService, @Inject(DATA_SERVICE_CONFIG) config: DataServiceConfig) {
    addRxPlugin(pouchdbAdapterIdb);
    addRxPlugin(pouchdbAdapterMemory);
    addRxPlugin(RxDBMigrationPlugin);
    addRxPlugin(RxDBReplicationGraphQLPlugin);
    this._config = fillConfigDefaultValues(config);
    this._db = from(createRxDatabase(this._config.databaseCreateOptions)).pipe(shareReplay(1));

    this._initSync();
  }

  /**
   * Add an RxDb plugin
   * @param plugin The plugin to add
   */
  plugin(plugin: any): void {
    addRxPlugin(plugin);
  }

  /**
   * Get an object from the database.
   * Throws and error if the collection does not exist.
   * @param params The get request parameters.
   */
  get<T extends Model = Model>(params: DataGetRequest): Observable<RxDocument<T>|null> {
    const {collectionName, id} = params;
    return this._db.pipe(
        switchMap(db => {
          const collection = db.collections[collectionName] as RxCollection<T>;
          if (collection == null) {
            return throwError(new Error('Invalid collection'));
          }
          return from(collection.findOne().where('id').eq(id).exec());
        }),
    );
  }

  /**
   * Insert a new object into the database.
   * Throws and error if the collection does not exist.
   * @param params The insert request parameters.
   */
  insert<T extends Model = Model>(params: DataInsertRequest<T>): Observable<RxDocument<T>|null> {
    const {collectionName, object} = params;
    return this._db.pipe(
        switchMap(db => {
          const collection = db.collections[collectionName] as RxCollection<T>;
          if (collection == null) {
            throwError(new Error('Invalid collection'));
          }
          const insertObject = this._prepareInsertObject(object);
          return from(collection.insert(insertObject))
              .pipe(
                  catchError(e => {
                    console.log(e);
                    return obsOf(null);
                  }),
              );
        }),
    );
  }

  /**
   * Insert multiple objects into the database.
   * Throws and error if the collection does not exist.
   * @param params The bulk insert request parameters.
   */
  bulkInsert<T extends Model = Model>(params: DataBulkInsertRequest<T>):
      Observable<{success: RxDocument<T>[], error: any[]}> {
    const {collectionName, objects} = params;
    return this._db.pipe(
        switchMap(db => {
          const collection = db.collections[collectionName] as RxCollection<T>;
          if (collection == null) {
            throwError(new Error('Invalid collection'));
          }
          const docsData = objects.map(object => this._prepareInsertObject(object));
          return from(collection.bulkInsert(docsData))
              .pipe(
                  catchError(() => obsOf({success: [], error: []})),
              );
        }),
    );
  }

  /**
   * Insert a new object if it does not exist within the collection, otherwise it will overwrite it.
   * Throws and error if the collection does not exist.
   * @param params The upinsert request parameters.
   */
  upsert<T extends Model = Model>(params: DataUpsertRequest<T>): Observable<RxDocument<T>|null> {
    const {collectionName, object} = params;
    return this._db.pipe(
        switchMap(db => {
          const collection = db.collections[collectionName] as RxCollection<T>;
          if (collection == null) {
            throwError(new Error('Invalid collection'));
          }
          const insertObject = {
            id: object.id || uuidv4(),
            ...object,
            created_at: object.created_at || new Date().toISOString(),
            updated_at: object.updated_at || null,
          } as T;
          return from(collection.upsert(insertObject))
              .pipe(
                  catchError(() => obsOf(null)),
              );
        }),
    );
  }

  /**
   * Create a RxQuery query object for multiple documents selection.
   * Throws and error if the collection does not exist.
   * @param params The find request parameters.
   */
  find<T extends Model = Model>(params: DataFindRequest<T>):
      Observable<RxQuery<T, RxDocument<T>[]>> {
    const {collectionName, query} = params;
    return this._db.pipe(
        map(db => {
          const collection = db.collections[collectionName] as RxCollection<T>;
          if (collection == null) {
            throwError(new Error('Invalid collection'));
          }
          return collection.find(query);
        }),
    );
  }

  /**
   * Create a RxQuery query object for single document selection.
   * Throws and error if the collection does not exist.
   * @param params The find request parameters.
   */
  findOne<T extends Model = Model>(params: DataFindRequest<T>):
      Observable<RxQuery<T, RxDocument<T>|null>> {
    const {collectionName, query} = params;
    return this._db.pipe(
        map(db => {
          const collection = db.collections[collectionName] as RxCollection<T>;
          if (collection == null) {
            throwError(new Error('Invalid collection'));
          }
          return collection.findOne(query);
        }),
    );
  }

  /**
   * Create a collection in the local database from a JSON schema
   * and sets up the GraphQL sync.
   * Throws and error if the collection exist.
   * @param params The create collection request parameters.
   */
  createCollection(params: DataCreateCollectionRequest): Observable<boolean> {
    return this._db.pipe(
        switchMap(db => {
          return from(db.collection(params.collection))
              .pipe(
                  tap(collection => this._addRegisteredCollection(collection, params)),
                  mapTo(true),
                  catchError(() => obsOf(false)),
              );
        }),
    );
  }

  /**
   * Destroy an existing collection in the local database.
   * Throws and error if the collection does not exist.
   * @param collectionName The name of the collection to destroy.
   */
  destroyCollection(collectionName: string): Observable<boolean> {
    return this._db.pipe(
        switchMap(db => {
          const collection = db.collections[collectionName] as RxCollection;
          if (collection == null) {
            return throwError(new Error('Invalid collection'));
          }
          return from(collection.destroy())
              .pipe(
                  tap(() => this._removeRegisteredCollection(collection)),
              );
        }),
    );
  }

  /**
   * Prepare an object to be inserted into the database from a partial object.
   * @param object The partial object.
   */
  private _prepareInsertObject<T extends Model>(object: InsertModel<T>): T {
    const timestamp = new Date().toISOString();
    return {
      ...object,
      id: uuidv4(),
      created_at: timestamp,
      updated_at: timestamp,
    } as T;
  }

  /**
   * Push a collection to the registered colletions stream.
   */
  private _addRegisteredCollection(collection: RxCollection, params: DataCreateCollectionRequest):
      void {
    const collections = this._registeredCollections.getValue();
    const idx = collections.findIndex(c => c.collection.name === collection.name);
    if (idx !== -1) {
      // TODO(trik): Consider throwing an exception when trying to register a collection twice.
      return;
    }
    const {pullQueryExtraParams, pushQueryExtraParams} = params;
    this._registeredCollections.next([
      ...collections,
      {collection, pullQueryExtraParams, pushQueryExtraParams},
    ]);
  }

  /**
   * Remove a collection from the registered collections stream.
   */
  private _removeRegisteredCollection(collection: RxCollection): void {
    const collections = this._registeredCollections.getValue();
    const idx = collections.findIndex(c => c.collection.name === collection.name);
    if (idx === -1) {
      // TODO(trik): Consider throwing an exception when trying to remove an unregistered
      // collection.
      return;
    }
    this._registeredCollections.next([
      ...collections.slice(0, idx),
      ...collections.slice(idx + 1),
    ]);
  }

  /**
   * Initialize the GraphQL sync for all the registered collections.
   * As soon as the user logs in, the sync will start.
   * If a log out event occurs, all the active syncs will be stopped.
   * When a new collection is registered, the sync will automatically start depending on the
   * current authentication status.
   */
  private _initSync(): void {
    const collectionChange = this._registeredCollections.pipe(
        debounceTime(300),
    );

    combineLatest([this._authService.authenticated, collectionChange])
        .subscribe(
            ([auth, registeredCollections]) => {
              if (auth) {
                const collectionNames = [] as string[];
                registeredCollections.forEach(registeredCollection => {
                  const {collection, ...params} = registeredCollection;
                  collectionNames.push(collection.name);
                  if (this._activeSyncs[collection.name] == null) {
                    this._setupCollectionSync(collection, params);
                  }
                });
                Object.keys(this._activeSyncs).forEach(collectionName => {
                  if (collectionNames.indexOf(collectionName) === -1) {
                    this._stopCollectionSync(collectionName);
                  }
                });
              } else {
                Object.keys(this._activeSyncs).forEach(this._stopCollectionSync);
              }
            },
        );
  }

  /**
   * Set up a collection sync.
   * @param collection The collection to sync.
   * @param parent The sync parameters.
   */
  private _setupCollectionSync(collection: RxCollection, params: CollectionSyncParams): void {
    const state = collection.syncGraphQL({
      ...this._config.syncOptions,
      url: this._config.syncOptions.url,
      deletedFlag: 'deleted',
      pull: {
        queryBuilder:
            pullQueryBuilder(collection, this._config.syncOptions, params.pullQueryExtraParams),
      },
      push: {
        queryBuilder: pushQueryBuilder(collection, params.pushQueryExtraParams),
      },
    });
    let sub: {unsubscribe: () => void} = Subscription.EMPTY;
    if (this._config.syncOptions.live && this._config.syncOptions.wsUrl != null) {
      const client = new SubscriptionClient(
          this._config.syncOptions.wsUrl, {reconnect: true},
          this._config.syncOptions.webSocketImpl);
      const query = subscriptionQueryBuilder(collection);
      sub = client.request({query}).subscribe({
        next: () => {
          state.run().then(() => {
            state.recieved$
                .pipe(
                    take(1),
                    )
                .subscribe(() => {
                  this._collectionChanged.emit({
                    timestamp: new Date().getTime(),
                    collection: collection.name,
                  });
                });
          });
        },
      });
    }
    this._activeSyncs[collection.name] = {state, sub};
  }

  /**
   * Stop an active collection sync.
   * @param collection The collection for which the sync must be stopped.
   */
  private _stopCollectionSync(collectionName: string): void {
    if (this._activeSyncs[collectionName] == null) {
      return;
    }
    const {state, sub} = this._activeSyncs[collectionName];
    sub.unsubscribe();
    state.cancel().then(() => {});
    delete this._activeSyncs[collectionName];
  }
}

/**
 * Default data service sync options.
 */
const DEFAULT_SYNC_OPTIONS = {
  batchSize: 100,
  live: true,
  liveInterval: 60000,
};

/**
 * Fills the data service configuration with default values if missing.
 * @param config Data service configuration.
 */
function fillConfigDefaultValues(config: DataServiceConfig): DataServiceConfig {
  config.syncOptions = {...DEFAULT_SYNC_OPTIONS, ...config.syncOptions};
  return config;
}
