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

import {EventEmitter, Inject, Injectable, isDevMode, Optional} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService, NetworkStatusService} from '@dino/core/auth';
import {ConfigService} from '@dino/core/config';
import * as pouchdbAdapterIdb from 'pouchdb-adapter-idb';
import * as pouchdbAdapterMemory from 'pouchdb-adapter-memory';
import {addRxPlugin, createRxDatabase, RxCollection, RxDatabase, RxDocument} from 'rxdb';
import {RxDBMigrationPlugin} from 'rxdb/plugins/migration';
import {addPouchPlugin} from 'rxdb/plugins/pouchdb';
import {RxDBReplicationGraphQLPlugin} from 'rxdb/plugins/replication-graphql';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  from,
  interval,
  Observable,
  of as obsOf,
  Subscription,
  throwError,
} from 'rxjs';
import {
  catchError,
  debounce,
  debounceTime,
  delay,
  map,
  mapTo,
  shareReplay,
  skipWhile,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import {v4 as uuidv4} from 'uuid';

import {ActiveSync} from './active-sync-interface';
import {DataBulkInsertRequest} from './data-bulk-insert-request';
import {PermissionContextService} from './data-context-service';
import {
  DataCreateCollectionRequest,
  PullQueryContextChecks,
} from './data-create-collection-request';
import {DataFindRequest} from './data-find-request';
import {DataGetRequest} from './data-get-request';
import {DataInsertRequest} from './data-insert-request';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from './data-service-config';
import {BulkInsertResult, CollectionChangedEvent, IDataService} from './data-service-interface';
import {DEFAULT_SYNC_OPTIONS, fillConfigDefaultValues} from './data-service-utils';
import {DataUpsertRequest} from './data-upsert-request';
import {InsertModel} from './insert-model';
import {Model} from './model';
import {PullQueryExtraParams} from './pull-query-extra-params';
import {PushQueryExtraParams} from './push-query-extra-params';
import {
  generateSyncPullChecks,
  pullQueryBuilder,
  pushQueryBuilder,
  subscriptionQueryBuilder,
} from './sync-utils';

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
export class DataService implements IDataService {
  /**
   * True when the Syncing process is currently operating
   * (A replication cycle is undergoing)
   */
  readonly isSyncing: Observable<boolean>;

  readonly config: DataServiceConfig;

  private _collectionChanged: EventEmitter<CollectionChangedEvent> =
    new EventEmitter<CollectionChangedEvent>();

  readonly collectionChanged: Observable<CollectionChangedEvent> = this
    ._collectionChanged as Observable<CollectionChangedEvent>;

  private _db: Observable<RxDatabase>;

  private _registeredCollections: BehaviorSubject<RegisteredCollection[]> = new BehaviorSubject<
    RegisteredCollection[]
  >([]);

  /**
   * The auth token currently stored, added to the request headers.
   */
  private _currentToken: string | null = null;

  /**
   * The currently synchronized Collections
   */
  private _activeSyncs: BehaviorSubject<{[key: string]: ActiveSync}> = new BehaviorSubject<{
    [key: string]: ActiveSync;
  }>({});

  /**
   * The Data service configuration settings stream.
   */
  private _dataConfig: BehaviorSubject<DataServiceConfig>;

  /**
   * The Data config currently stored in the local storage, if present.
   */
  private _currentlyStoredConfig: DataServiceConfig | null;

  /**
   * Emits when a websocket throws an error in its connection callback,
   * stating that the JWT token is expired, and asks the authService for its
   * refreshing.
   */
  private _refreshEvt: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Emits when a websocket throws an error in its connection callback,
   * and asks the authService to log out.
   */
  private _logoutEvt: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private _authService: AuthService,
    private _contextService: PermissionContextService,
    private _nss: NetworkStatusService,
    private _router: Router,
    @Inject(DATA_SERVICE_CONFIG) config: DataServiceConfig,
    @Optional() private _configService: ConfigService | null,
  ) {
    addPouchPlugin(pouchdbAdapterIdb);
    addPouchPlugin(pouchdbAdapterMemory);
    addRxPlugin(RxDBMigrationPlugin);
    addRxPlugin(RxDBReplicationGraphQLPlugin);
    this.config = fillConfigDefaultValues(config);
    this._dataConfig = new BehaviorSubject<DataServiceConfig>(this.config);
    this._currentlyStoredConfig = this._getDataConfig();
    if (this._currentlyStoredConfig != null) {
      this._dataConfig.next(this._currentlyStoredConfig);
    }

    this._db = this._dataConfig.pipe(
      switchMap(cfg => from(createRxDatabase(cfg.databaseCreateOptions))),
      shareReplay(1),
    );

    this.isSyncing = this._activeSyncs.pipe(
      switchMap(syncs => {
        const syncsStateActivity: Observable<Boolean>[] = [];
        for (let key in syncs) {
          if (syncs[key] != null) {
            syncsStateActivity.push(syncs[key].stateActivity);
          }
        }
        return combineLatest(syncsStateActivity).pipe(
          switchMap(states => {
            if (states.some(state => state === true)) {
              return obsOf(true);
            } else {
              return obsOf(false).pipe(delay(2000), debounceTime(100));
            }
          }),
        );
      }),
    );

    this._initSync();

    this._refreshEvt
      .pipe(
        debounceTime(this._authService.authConfig.retryRefreshTime),
        switchMap(() => this._authService.refreshToken()),
      )
      .subscribe();

    this._logoutEvt.pipe(switchMap(() => this._authService.logout())).subscribe(res => {
      if (res) {
        this._router.navigate([this._authService.authConfig.failedAuthRedirect]);
      }
    });

    if (this._configService != null) {
      this._setDynamicConfigSub();
    }

    this._authService.resetEvt.pipe(debounce(_ => interval(1000))).subscribe(reset => {
      if (reset) {
        this._resetDataConfig();
      }
    });

    this._authService.logoutEvt
      .pipe(
        switchMap(evt => {
          if (evt) {
            return this.destroyAllCollections();
          }
          return obsOf(false);
        }),
      )
      .subscribe(() => {
        if (isDevMode()) {
          console.log('Successfully logged out');
        }
      });
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
  get<T extends Model = Model, R extends T = RxDocument<T>>(
    params: DataGetRequest,
  ): Observable<R | null> {
    const {collectionName, id} = params;
    return this._db.pipe(
      switchMap(db => {
        const collection = db.collections[collectionName] as RxCollection<T>;
        if (collection == null) {
          return throwError(() => new Error('Invalid collection'));
        }
        if (id == null) {
          return throwError(() => new Error('Invalid ID'));
        }
        return from(collection.findOne().where('id').eq(id).exec());
      }),
    ) as Observable<R | null>;
  }

  /**
   * Insert a new object into the database.
   * Throws and error if the collection does not exist.
   * @param params The insert request parameters.
   */
  insert<T extends Model = Model, R extends T = RxDocument<T>>(
    params: DataInsertRequest<T>,
  ): Observable<R | null> {
    const {collectionName, object} = params;
    return this._db.pipe(
      switchMap(db => {
        const collection = db.collections[collectionName] as RxCollection<T>;
        if (collection == null) {
          throwError(() => new Error('Invalid collection'));
        }
        const insertObject = this._prepareInsertObject(object);
        return from(collection.insert(insertObject)).pipe(
          tap(doc => {
            if (doc != null) {
              this._collectionChangedEmit('Document created', collection);
            }
          }),
          catchError(e => {
            console.log(e);
            return obsOf(null);
          }),
        ) as Observable<R | null>;
      }),
    );
  }

  /**
   * Insert multiple objects into the database.
   * Throws and error if the collection does not exist.
   * @param params The bulk insert request parameters.
   */
  bulkInsert<T extends Model, R extends T = RxDocument<T>>(
    params: DataBulkInsertRequest<T>,
  ): Observable<BulkInsertResult<R>> {
    const {collectionName, objects} = params;
    return this._db.pipe(
      switchMap(db => {
        const collection = db.collections[collectionName] as RxCollection<T>;
        if (collection == null) {
          throwError(() => new Error('Invalid collection'));
        }
        const docsData = objects.map(object => this._prepareInsertObject(object));
        return from(collection.bulkInsert(docsData)).pipe(
          tap(doc => {
            if (doc.success != null) {
              this._collectionChangedEmit('Documents created', collection);
            }
          }),
          catchError(e => obsOf({success: [], error: [{'msg': e}]})),
        ) as Observable<BulkInsertResult<R>>;
      }),
    );
  }

  /**
   * Update multiple objects in the database.
   * Throws and error if the collection does not exist.
   * @param params The bulk update request parameters.
   * @param update The updated fields set.
   */
  bulkUpdate<T extends Model = Model, R extends T = RxDocument<T>>(
    params: DataFindRequest<T>,
    update: Partial<T>,
  ): Observable<R[]> {
    const {collectionName, query} = params;
    return this._db.pipe(
      switchMap(db => {
        const collection = db.collections[collectionName] as RxCollection<T>;
        if (collection == null) {
          throwError(() => new Error('Invalid collection'));
        }
        return from(collection.find(query).update({$set: update})).pipe(
          tap(doc => {
            if (doc != null && doc.length > 0) {
              this._collectionChangedEmit('Documents updated', collection);
            }
          }),
          catchError(() => obsOf([])),
        ) as Observable<R[]>;
      }),
    );
  }

  update<T extends Model = Model, R extends T = RxDocument<T>>(
    _collectionName: string,
    doc: R,
    updateData: Partial<T>,
  ): Observable<R | null> {
    if (doc == null || updateData == null || !isRxDocument(doc)) {
      return obsOf(null);
    }
    return from(doc.update({$set: updateData})).pipe(
      tap(dc => {
        if (dc != null) {
          this._collectionChangedEmit('Document updated', doc.collection);
        }
      }),
      map(_ => doc),
      catchError(err => throwError(() => new Error(err))),
    ) as Observable<R | null>;
  }

  /**
   * Insert a new object if it does not exist within the collection, otherwise it will overwrite it.
   * Throws and error if the collection does not exist.
   * @param params The upinsert request parameters.
   */
  upsert<T extends Model = Model, R extends T = RxDocument<T>>(
    params: DataUpsertRequest<T>,
  ): Observable<R | null> {
    const {collectionName, object} = params;
    return this._db.pipe(
      switchMap(db => {
        const collection = db.collections[collectionName] as RxCollection<T>;
        if (collection == null) {
          throwError(() => new Error('Invalid collection'));
        }
        const insertObject = {
          id: object.id || uuidv4(),
          ...object,
          created_at: object.created_at || new Date().toISOString(),
          updated_at: object.updated_at || null,
        } as T;
        return from(collection.upsert(insertObject)).pipe(
          tap(doc => {
            if (doc != null) {
              this._collectionChangedEmit('Document Updated', collection);
            }
          }),
          catchError(() => obsOf(null)),
        );
      }),
    ) as Observable<R | null>;
  }

  /**
   * Get multiple documents selected by a mango-style query.
   * Throws and error if the collection does not exist.
   * @param params The find request parameters.
   */
  find<T extends Model = Model, R extends T = RxDocument<T>>(
    params: DataFindRequest<T>,
  ): Observable<R[]> {
    const {collectionName, query} = params;
    return this._db.pipe(
      switchMap(db => {
        const collection = db.collections[collectionName] as RxCollection<T>;
        if (collection == null) {
          throwError(() => new Error('Invalid collection'));
        }
        return from(collection.find(query).exec());
      }),
    ) as Observable<T[]> as Observable<R[]>;
  }

  /**
   * Create a collection in the local database from a JSON schema
   * and sets up the GraphQL sync.
   * @param params The create collection request parameters.
   */
  createCollection(
    params: DataCreateCollectionRequest,
    pullQueryContextChecks?: PullQueryContextChecks,
  ): Observable<boolean> {
    return combineLatest([this._db, this._authService.authenticated]).pipe(
      withLatestFrom(this._contextService.fullContext.pipe(take(1))),
      skipWhile(([[db, authEvt], _ctx]) => !db || !authEvt.auth),
      switchMap(([[db, authEvt], ctx]) => {
        if (!authEvt.auth) {
          return obsOf(false);
        }
        if (pullQueryContextChecks && ctx != null) {
          if (!params.pullQueryExtraParams) {
            params.pullQueryExtraParams = {};
          }
          params.pullQueryExtraParams!.where = generateSyncPullChecks(ctx, pullQueryContextChecks);
        }
        const collection = db[params.name] as RxCollection;
        if (!collection) {
          if (isDevMode()) {
            console.log(`creating ${params.name}... with context: `, ctx);
          }
          return from(db.addCollections({[params.name]: params.collection})).pipe(
            tap(coll => {
              if (
                this._dataConfig.value.syncOptions.live &&
                this._dataConfig.value.syncOptions.wsUrl
              ) {
                if (isDevMode()) {
                  console.log(
                    `${params.name.toLocaleUpperCase()} created with Where: ${JSON.stringify(
                      params.pullQueryExtraParams?.where,
                    )}.`,
                  );
                }
                this._addRegisteredCollection(coll[params.name], params);
              }
            }),
            mapTo(true),
            catchError(err => {
              if (isDevMode()) {
                console.error(err);
              }
              return obsOf(false);
            }),
          );
        }
        return obsOf(false);
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
          throwError(() => new Error('Invalid collection'));
        }
        return from(collection.destroy()).pipe(
          tap(() => this._removeRegisteredCollection(collection)),
        );
      }),
    );
  }

  /**
   * Destroys all collections in the current local db.
   */
  destroyAllCollections(): Observable<boolean[]> {
    return this._db.pipe(
      switchMap(db => {
        const collectionsDestructions: Observable<boolean>[] = [];
        for (let coll of this._registeredCollections.value) {
          const collName = coll.collection.name;
          const rxCollection = db.collections[collName] as RxCollection;
          if (rxCollection) {
            collectionsDestructions.push(
              from(rxCollection.remove()).pipe(
                switchMap(() => from(db.removeCollection(collName)).pipe(mapTo(true))),
                tap(() => this._removeRegisteredCollection(rxCollection)),
              ),
            );
          }
        }
        return forkJoin(collectionsDestructions);
      }),
      take(1),
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
      created_at: object.created_at ? object.created_at : timestamp,
      updated_at: timestamp,
    } as T;
  }

  /**
   * Push a collection to the registered colletions stream.
   */
  private _addRegisteredCollection(
    collection: RxCollection,
    params: DataCreateCollectionRequest,
  ): void {
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
    this._registeredCollections.next([...collections.slice(0, idx), ...collections.slice(idx + 1)]);
  }

  /**
   * Initialize the GraphQL sync for all the registered collections.
   * As soon as the user logs in, the sync will start.
   * If a log out event occurs, all the active syncs will be stopped.
   * When a new collection is registered, the sync will automatically start depending on the
   * current authentication status.
   */
  private _initSync(): void {
    const collectionChange = this._registeredCollections.pipe(debounceTime(300));
    combineLatest([collectionChange, this._authService.authToken, this._nss.isOnline$])
      .pipe(withLatestFrom(this._authService.authenticated))
      .subscribe(([[registeredCollections, token, isOnline], authEvt]) => {
        const activeSyncsKeys = Object.keys(this._activeSyncs.getValue());
        if (authEvt.auth && token != null && isOnline) {
          const collectionNames: string[] = Object.values(this._activeSyncs.getValue()).map(
            coll => coll.collectionName,
          );
          registeredCollections.forEach(registeredCollection => {
            const {collection, ...params} = registeredCollection;
            if (token != this._currentToken || collectionNames.indexOf(collection.name) < 0) {
              this._setupCollectionSync(collection, params, token);
            }
          });
          activeSyncsKeys.forEach(collectionName => {
            if (collectionNames.indexOf(collectionName) === -1) {
              this._stopCollectionSync(collectionName);
            }
          });
          this._currentToken = token;
        } else {
          if (isDevMode()) {
            console.log('Stopping sync');
          }
          activeSyncsKeys.forEach(k => {
            this._stopCollectionSync(k);
          });
        }
      });
  }

  /**
   * Set up a collection sync.
   * @param collection The collection to sync.
   * @param parent The sync parameters.
   * @param token The current JWT authorization token.
   */
  private _setupCollectionSync(
    collection: RxCollection,
    params: CollectionSyncParams,
    token: string,
  ): void {
    this._stopCollectionSync(collection.name);
    const state = collection.syncGraphQL({
      ...this._dataConfig.value.syncOptions,
      url: this._dataConfig.value.syncOptions.url,
      headers: {'Authorization': `Bearer ${token}`},
      deletedFlag: '_deleted',
      pull: {
        queryBuilder: pullQueryBuilder(
          collection,
          this._dataConfig.value.syncOptions,
          params.pullQueryExtraParams,
        ),
      },
      push: {
        queryBuilder: pushQueryBuilder(collection, params.pushQueryExtraParams),
        batchSize: DEFAULT_SYNC_OPTIONS.batchSize,
      },
    });
    let stateActivity: Observable<boolean> = state.active$;
    let sub: {unsubscribe: () => void} = Subscription.EMPTY;
    if (
      this._dataConfig.value.syncOptions.live &&
      this._dataConfig.value.syncOptions.wsUrl != null
    ) {
      const client = new SubscriptionClient(
        this._dataConfig.value.syncOptions.wsUrl,
        {
          reconnect: true,
          reconnectionAttempts: 5,
          connectionCallback: (error: Error[]) => {
            if (error) {
              client.close(true);
              const errMessage = error.toString();
              if (
                this._dataConfig.value.syncOptions.authErrorMessage &&
                errMessage === this._dataConfig.value.syncOptions.authErrorMessage
              ) {
                this._refreshEvt.emit();
              } else {
                this._logoutEvt.emit();
              }
            }
          },
          connectionParams: {headers: {'Authorization': `Bearer ${token}`}},
        },
        this._dataConfig.value.syncOptions.webSocketImpl,
      );
      const query = subscriptionQueryBuilder(collection);
      const clientRequest = client.request({query});
      sub = clientRequest.subscribe({
        next: st => {
          if (st.data && st.data[collection.name]) {
            this._collectionChangedEmit(
              'websocket change received',
              collection,
              (st.data[collection.name] as unknown[]).length,
            );
          }
          state.run().then(() => {
            this._collectionChangedEmit('replication cycle complete', collection);
            state.received$.pipe(take(1), delay(1000)).subscribe(() => {
              this._collectionChangedEmit('changed data pulled', collection);
            });
          });
        },
      });
    }
    const actSyncs = this._activeSyncs.getValue();
    actSyncs[collection.name] = {state, sub, stateActivity, collectionName: collection.name};
    this._activeSyncs.next(actSyncs);
  }

  /**
   * Stop an active collection sync.
   * @param collection The collection for which the sync must be stopped.
   */
  private _stopCollectionSync(collectionName: string): void {
    if (this._activeSyncs.getValue()[collectionName] == null) {
      return;
    }
    const actSyncs = this._activeSyncs.getValue();
    const {state, sub} = actSyncs[collectionName];
    sub.unsubscribe();
    state.cancel().then(() => {});
    delete actSyncs[collectionName];
    this._activeSyncs.next(actSyncs);
  }

  /**
   * Emits the Collection Changed event, triggering the refresh of the
   * data.
   * @param msg The event message
   * @param collection The changed RxCollection
   * @param count? The changed RxCollection docs count
   */
  private _collectionChangedEmit(msg: string, collection: RxCollection, count?: number): void {
    if (collection == null) {
      return;
    }
    this._collectionChanged.emit({
      timestamp: new Date().getTime(),
      collection: collection.name,
      action: msg,
      ...(count != null && {count}),
    });
  }

  /**
   * Subscribes to the Config Service and listens for changes
   * in the Data configuration.
   */
  private _setDynamicConfigSub(): void {
    if (this._configService == null) {
      return;
    }
    this._configService.configurationSet.subscribe(config => {
      if (config == null) {
        return;
      }

      const dataDbOptions = {
        ...this._dataConfig.value.databaseCreateOptions,
        ...config.dataConfig['databaseCreateOptions'],
      };
      const dataSyncOptions = {
        ...this._dataConfig.value.syncOptions,
        ...config.dataConfig['syncOptions'],
      };
      const dataConfig = {
        databaseCreateOptions: dataDbOptions,
        syncOptions: dataSyncOptions,
      };

      this._setDataConfig(dataConfig);
    });
  }

  /**
   * Dynamically sets the configuration params for the Data Service.
   * @param config The configuration data
   */
  private _setDataConfig(config: DataServiceConfig): void {
    if (config == null) {
      return;
    }
    this._storeDataConfig(config);
    this._dataConfig.next(config);
  }

  /**
   * Resets the Data config, removing config from local storage.
   */
  private _resetDataConfig(): void {
    this._currentlyStoredConfig = null;
    this._removeDataConfig();
  }

  /**
   * Stores an Data service configuration object into the
   * local storage.
   * @param config The configuration data
   */
  private _storeDataConfig(config: DataServiceConfig): void {
    if (config == null) {
      return;
    }
    localStorage.setItem('data_config', btoa(JSON.stringify(config)));
  }

  /**
   * Retrieves the Data service configuration currently stored in the
   * local storage.
   */
  private _getDataConfig(): DataServiceConfig | null {
    const config = localStorage.getItem('data_config');
    if (config == null) {
      return null;
    }
    return JSON.parse(atob(config));
  }

  /**
   * Removes the Data service configuration currently stored in the
   * local storage.
   */
  private _removeDataConfig(): void {
    localStorage.removeItem('data_config');
  }
}

const isRxDocument = <T extends Model>(doc: T): doc is RxDocument<T> => {
  const d = doc as any;
  return d.update != null && d.collection != null;
};
