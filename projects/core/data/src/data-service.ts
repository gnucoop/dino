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
import {ErrorHandlerMessageService} from '@dino/core/error-handler';
import {
  addRxPlugin,
  createRxDatabase,
  RxCollection,
  RxDatabase,
  RxDocument,
  RxDocumentData,
  RxError,
  RxGraphQLPullResponseModifier,
  RxTypeError,
} from 'rxdb';
import {RxDBMigrationSchemaPlugin} from 'rxdb/plugins/migration-schema';
import {replicateGraphQL} from 'rxdb/plugins/replication-graphql';

import {RxDBQueryBuilderPlugin} from 'rxdb/plugins/query-builder';
import {RxDBUpdatePlugin} from 'rxdb/plugins/update';
import {RxDBJsonDumpPlugin} from 'rxdb/plugins/json-dump';
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
  distinctUntilChanged,
  filter,
  map,
  mapTo,
  retryWhen,
  shareReplay,
  skipWhile,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
  throttleTime,
  withLatestFrom,
} from 'rxjs/operators';
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
import {
  BulkInsertResult,
  CollectionChangedEvent,
  IDataService,
  SyncErrorEvent,
} from './data-service-interface';
import {DEFAULT_SYNC_OPTIONS, fillConfigDefaultValues} from './data-service-utils';
import {DataUpsertRequest} from './data-upsert-request';
import {InsertModel} from './insert-model';
import {Model} from './model';
import {PullQueryExtraParams} from './pull-query-extra-params';
import {PushQueryExtraParams} from './push-query-extra-params';
import {
  generateSyncPullChecks,
  pullQueryBuilder,
  pullResponseModifier,
  pushResponseModifier,
  pushQueryBuilder,
  subscriptionQueryBuilder,
} from './sync-utils';
import {Client} from 'graphql-ws';
import {newClient, newClientSubscription} from './graphql-ws-client';

/**
 * Parameters needed to set up the collection sync.
 */
export interface CollectionSyncParams {
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

  /**
   * When true, the first replication cycle for the collection is complete.
   * Should be initialized as false.
   */
  firstSyncCompleted: BehaviorSubject<boolean>;
}

/**
 * Collections included in a data backup produced by {@link DataService.exportDatabase}.
 * Only "data" collections are exported; user/config collections managed by the backend
 * (`user_data`, `user_role`, `user_group`, `notification`, `log`) are intentionally
 * excluded so a backup can be safely restored on a backend deployment.
 */
export const BACKUP_DATA_COLLECTIONS: readonly string[] = [
  'form_schema',
  'form_data',
  'report_schema',
  'report_data',
  'form_schema_deps',
  'form_status',
  'lang',
  'area',
  'case',
  'project',
  'location',
  'organization',
];

/**
 * Collections whose documents carry a `user_data_ref_id` that must be reassigned to the
 * importing user on restore.
 */
const OWNED_DATA_COLLECTIONS: readonly string[] = ['form_data', 'report_data'];

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

  /**
   * When the Syncing process encounteres a problem even after
   * all the resyncAttempts, the name of the collection causing the sync error
   * is added here.
   */
  readonly problemSyncing: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  /**
   * When true, the first replication cycle for all collections is complete.
   * Resets to false on logout.
   */
  firstReplicationComplete: Observable<boolean>;

  /**
   * When emitted as 'started', collection initialization has started and is undergoing.
   * When emitted as 'completed', all collections have been initialized by the Sync manager.
   */
  collectionsInitialized: EventEmitter<'started' | 'completed'> = new EventEmitter<
    'started' | 'completed'
  >();

  /**
   * Emits when a single replication cycle has been completed
   */
  replicationCycleComplete: EventEmitter<void> = new EventEmitter<void>();

  readonly config: DataServiceConfig;

  readonly dbToken = new BehaviorSubject<string | null>('');

  /**
   * Emitted on a succesful or failed Db Import
   */
  readonly dbImportedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Emitted on a succesful or failed Db Export
   */
  readonly dbExportedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Emits when a replication state raises an exception, usually because of
   * a constraint violation or a inconsistent db state.
   * The event triggers a resync attempt for the collection.
   */
  readonly syncErrorEvt: EventEmitter<SyncErrorEvent> = new EventEmitter<SyncErrorEvent>();

  /**
   * Emits when a collection could not be synced even after the retry attemps.
   */
  readonly couldNotSyncEvt: EventEmitter<SyncErrorEvent> = new EventEmitter<SyncErrorEvent>();

  private _collectionChanged: EventEmitter<CollectionChangedEvent> =
    new EventEmitter<CollectionChangedEvent>();

  readonly collectionChanged: Observable<CollectionChangedEvent> = this
    ._collectionChanged as Observable<CollectionChangedEvent>;

  private _db: Observable<RxDatabase>;

  private _refreshDb = new BehaviorSubject<'ready' | 'notReady'>('ready');

  /**
   * The current Websocket client
   */
  private _wsClient: Client | null = null;

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
   * Emits when a websocket throws an error in its connection callback
   * or when there is an arror during syncing data
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
    @Optional() private _ehms: ErrorHandlerMessageService | null,
  ) {
    addRxPlugin(RxDBMigrationSchemaPlugin);
    addRxPlugin(RxDBQueryBuilderPlugin);
    addRxPlugin(RxDBUpdatePlugin);
    addRxPlugin(RxDBJsonDumpPlugin);
    this.config = fillConfigDefaultValues(config);
    this._dataConfig = new BehaviorSubject<DataServiceConfig>(this.config);
    this._currentlyStoredConfig = this._getDataConfig();
    if (this._currentlyStoredConfig != null) {
      this._dataConfig.next(this._currentlyStoredConfig);
    }

    this._authService.authenticated
      .pipe(filter(authEvt => authEvt.evt === 'login' || authEvt.evt === 'logout'))
      .subscribe(authEvt => {
        this._refreshDb.next(authEvt.evt === 'login' ? 'ready' : 'notReady');
        if (authEvt.evt === 'logout') {
          this.dbToken.next(null);
        }
      });

    this._db = this._refreshDb.pipe(
      filter(rdy => rdy === 'ready'),
      switchMap(() => {
        return this._dataConfig.pipe(
          switchMap(cfg => from(createRxDatabase(cfg.databaseCreateOptions))),
        );
      }),
      tap(db => {
        this.dbToken.next(db.token);
        if (isDevMode()) {
          console.log(`CREATING DB: ${db.token}`);
        }
      }),
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
              return obsOf(false).pipe(
                delay(2000),
                debounceTime(100),
                tap(() => this.replicationCycleComplete.emit()),
              );
            }
          }),
        );
      }),
    );

    this.firstReplicationComplete = combineLatest([
      this.collectionsInitialized,
      this._registeredCollections,
      this._nss.isOnline$,
    ]).pipe(
      switchMap(([evt, collections, isOnline]) => {
        if (!isOnline) {
          return obsOf([true]);
        }
        if (evt === 'started') {
          return obsOf([false]);
        }
        const syncs = collections.map(coll => coll.firstSyncCompleted);
        return combineLatest(syncs);
      }),
      map(syncsComplete => syncsComplete.every(syncComplete => syncComplete)),
      distinctUntilChanged(),
    );

    if (!this.config.syncOptions.backendless) {
      this._initSync();
    }

    this._refreshEvt
      .pipe(
        debounceTime(this._authService.authConfig.retryRefreshTime),
        switchMap(() => this._authService.refreshToken()),
      )
      .subscribe();

    this._logoutEvt.pipe(switchMap(() => this._authService.logout())).subscribe(res => {
      if (res) {
        this._router.navigate([this._authService.authConfig.failedAuthRedirect, 'sync_error']);
      }
    });

    this.syncErrorEvt.subscribe(evt => {
      const {collection, retrySyncAttempts} = evt;
      if (isDevMode()) {
        console.log(`RESYNCING AFTER FAILURE OF ${collection}: attempt ${retrySyncAttempts}`);
      }
      this.runSync(collection, retrySyncAttempts);
    });

    this.couldNotSyncEvt.subscribe(evt => {
      const collection = evt.collection;
      const actSyncs = this._activeSyncs.getValue();
      actSyncs[collection].retrySyncAttempts = -1;
      this._stopCollectionSync(collection);
      if (collection === 'form_data' || collection === 'form_schema') {
        this._stopCollectionSync('log');
      }
      if (isDevMode()) console.log(`COULD NOT SYNC ${collection}`);
      this._toggleActiveSyncProblem(collection, 'add');
      this._reportSyncError(collection, evt.error);
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
        return from(collection.findOne().where('id').eq(id).exec()).pipe(
          retryWhen(err => err.pipe(delay(2000), take(10))),
        );
      }),
      retryWhen(err => err.pipe(delay(2000), take(10))),
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
      retryWhen(err => err.pipe(delay(1000), take(10))),
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
    collectionName: string,
    doc: R,
    updateData: Partial<R>,
  ): Observable<R | null> {
    if (doc == null || updateData == null || !isRxDocument(doc)) {
      return obsOf(null);
    }
    return this._db.pipe(
      switchMap(db => {
        const collection = db.collections[collectionName] as RxCollection<T>;
        if (collection == null) {
          throwError(() => new Error('Invalid collection'));
        }
        return from(doc.update({$set: updateData})).pipe(
          tap(dc => {
            if (dc != null) {
              this._collectionChangedEmit('Document updated', collection);
            }
          }),
          catchError(err => {
            if (isDevMode()) {
              console.log(err);
            }
            return throwError(() => new Error(err));
          }),
        );
      }),
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
    return this.dbToken.pipe(
      filter(tkn => tkn != null),
      distinctUntilChanged(),
      takeUntil(this._logoutEvt),
      switchMap(tkn => {
        return combineLatest([this._db, this._authService.authenticated]).pipe(
          withLatestFrom(this._contextService.fullContext.pipe(take(1))),
          skipWhile(([[db, authEvt], _ctx]) => !db || !authEvt.auth),
          switchMap(([[db, authEvt], ctx]) => {
            if (!authEvt.auth || db.token != tkn) {
              throw new Error('Db already exists');
            }
            if (pullQueryContextChecks && ctx != null) {
              if (!params.pullQueryExtraParams) {
                params.pullQueryExtraParams = {};
              }
              params.pullQueryExtraParams!.where = generateSyncPullChecks(
                ctx,
                pullQueryContextChecks,
              );
            }
            const collection = db[params.name] as RxCollection;
            if (!collection) {
              if (isDevMode()) {
                console.log(`creating ${params.name} in db: ${db.token}...`);
              }
              return from(db.addCollections({[params.name]: params.collection})).pipe(
                tap(coll => {
                  if (isDevMode()) {
                    console.log(
                      `${params.name.toLocaleUpperCase()} created with Where: ${JSON.stringify(
                        params.pullQueryExtraParams?.where,
                      )}.`,
                    );
                  }
                  this._addRegisteredCollection(coll[params.name], params);
                }),
                mapTo(true),
                catchError(err => {
                  if (isDevMode()) {
                    console.error(params.collection.schema.title, err);
                  }
                  return obsOf(false);
                }),
              );
            }
            return obsOf(true);
          }),
          retryWhen(err => err.pipe(delay(1000))),
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
  destroyAllCollections(): Observable<string[]> {
    return this._db.pipe(
      switchMap(db => {
        const collectionsDestructions: Observable<boolean>[] = [];
        for (let coll of this._registeredCollections.value) {
          const collName = coll.collection.name;
          const rxCollection = db.collections[collName] as RxCollection;
          if (rxCollection) {
            collectionsDestructions.push(
              from(rxCollection.remove()).pipe(
                switchMap(() => from(rxCollection.destroy())),
                tap(() => this._removeRegisteredCollection(rxCollection)),
              ),
            );
          }
        }
        return forkJoin(collectionsDestructions).pipe(withLatestFrom(obsOf(db)));
      }),
      switchMap(([_cd, db]) => from(db.destroy()).pipe(switchMap(() => from(db.remove())))),
      take(1),
    );
  }

  /**
   * Exports the Db instance content to a json file.
   *
   * Only the "data" collections listed in {@link BACKUP_DATA_COLLECTIONS} are included;
   * user/config collections managed by the backend are stripped from the dump so the
   * resulting file can be safely restored on a backend deployment.
   */
  exportDatabase(): Observable<Blob> {
    return this._db.pipe(
      switchMap(db => from(db.exportJSON())),
      map(json => ({
        ...json,
        collections: (json.collections ?? []).filter(c =>
          BACKUP_DATA_COLLECTIONS.includes(c.name),
        ),
      })),
      map(json => new Blob([JSON.stringify(json, null, 2)], {type: 'application/json'})),
      tap(c => {
        if (c != null) {
          this.dbExportedEvent.emit(true);
        }
      }),
      catchError(err => {
        if (isDevMode()) {
          console.log(err);
        }
        this.dbExportedEvent.emit(false);
        return throwError(() => new Error(err));
      }),
      take(1),
    );
  }

  /**
   * Imports a DB dump to the local indexed db.
   *
   * Unlike RxDB's built-in `db.importJSON`, this performs a tolerant,
   * per-collection restore so that a backup taken from a different app
   * version can still be restored after schemas have evolved:
   * - it does NOT require the dump's per-collection `schemaHash` to match
   *   the current schema (RxDB `importJSON` throws JD2 otherwise);
   * - it does NOT abort the whole restore when a collection in the dump
   *   is missing locally (RxDB `importJSON` throws JD1 otherwise) — such
   *   collections are skipped and logged instead.
   *
   * When `ownerUserDataId` is provided, every restored `form_data` / `report_data`
   * document has its `user_data_ref_id` rewritten to that id, so restored records become
   * owned by the importing user instead of the (possibly foreign) collector referenced in
   * the dump.
   *
   * @param dumpfile The blob of the db dump file to import
   * @param ownerUserDataId The `user_data` id of the importing user, used to reassign
   *   ownership of restored data records. When omitted, existing values are kept.
   */
  importDatabase(dumpfile: Blob, ownerUserDataId?: string): void {
    const fr = new FileReader();
    fr.onload = evt => {
      const res = evt.target?.result;
      if (res == null || typeof res !== 'string') {
        this.dbImportedEvent.emit(false);
        return;
      }

      let dump: {collections?: {name: string; docs?: any[]}[]};
      try {
        dump = JSON.parse(res);
      } catch (err) {
        if (isDevMode()) {
          console.error('Restore: the selected file is not valid JSON.', err);
        }
        this.dbImportedEvent.emit(false);
        return;
      }

      if (dump == null || !Array.isArray(dump.collections)) {
        if (isDevMode()) {
          console.error('Restore: unrecognized backup format (no "collections" array).', dump);
        }
        this.dbImportedEvent.emit(false);
        return;
      }

      this._db
        .pipe(
          take(1),
          switchMap(db =>
            from(this._restoreCollections(db, dump.collections!, ownerUserDataId)),
          ),
          catchError(err => {
            if (isDevMode()) {
              console.error('Restore: a fatal error occurred.', err);
            }
            return obsOf(false);
          }),
          take(1),
        )
        .subscribe(ok => this.dbImportedEvent.emit(ok));
    };
    fr.readAsText(dumpfile);
  }

  /**
   * Restores the documents contained in a database dump into the local
   * database, one collection at a time, using `bulkUpsert`.
   *
   * Documents are upserted, so existing documents sharing the same id are
   * overwritten — matching the confirmation shown to the user before the
   * restore. Collections present in the dump but not registered locally, or
   * not listed in {@link BACKUP_DATA_COLLECTIONS}, are skipped — the latter
   * guards against dumps produced before this whitelist existed (or hand-edited
   * files) from writing into backend-managed collections, which would then be
   * pushed to the backend through their active sync replication. Schema hashes
   * are intentionally ignored, so documents produced by an older schema version
   * are still written (they are validated against the current schema on write).
   *
   * When `ownerUserDataId` is a non-empty string, the `user_data_ref_id` of every
   * document belonging to an owned data collection ({@link OWNED_DATA_COLLECTIONS}) is
   * overwritten with it, reassigning the record to the importing user. The non-empty
   * check guards a required schema field from being clobbered with `undefined` when no
   * active user can be resolved.
   *
   * @param db The current RxDatabase instance
   * @param collections The `collections` array from the parsed dump
   * @param ownerUserDataId The `user_data` id to reassign restored data records to
   * @returns True if at least one document was written and none failed
   */
  private async _restoreCollections(
    db: RxDatabase,
    collections: {name: string; docs?: any[]}[],
    ownerUserDataId?: string,
  ): Promise<boolean> {
    // Fields managed internally by RxDB that must not be written back
    // verbatim; RxDB re-generates them on insert.
    const managedFields = ['_meta', '_rev', '_attachments', '_deleted'];
    const skipped: string[] = [];
    let totalWritten = 0;
    let totalFailed = 0;

    for (const coll of collections) {
      if (!BACKUP_DATA_COLLECTIONS.includes(coll.name)) {
        skipped.push(coll.name);
        continue;
      }

      const collection = db.collections[coll.name] as RxCollection | undefined;
      if (collection == null) {
        skipped.push(coll.name);
        continue;
      }

      const reassignOwner =
        ownerUserDataId != null &&
        ownerUserDataId.length > 0 &&
        OWNED_DATA_COLLECTIONS.includes(coll.name);

      const docs = (coll.docs || []).map(doc => {
        const clean: {[key: string]: any} = {...doc};
        managedFields.forEach(field => delete clean[field]);
        if (reassignOwner) {
          clean['user_data_ref_id'] = ownerUserDataId;
        }
        return clean;
      });
      if (docs.length === 0) {
        continue;
      }

      const {success, error} = await collection.bulkUpsert(docs);
      totalWritten += success.length;
      totalFailed += error.length;
      if (error.length > 0 && isDevMode()) {
        console.error(`Restore: ${error.length} document(s) failed in "${coll.name}".`, error);
      }
      if (success.length > 0) {
        this._collectionChangedEmit('Documents restored', collection, success.length);
      }
    }

    if (isDevMode()) {
      console.log(
        `Restore complete: ${totalWritten} document(s) written, ${totalFailed} failed, ` +
          `skipped collection(s): ${skipped.length ? skipped.join(', ') : 'none'}.`,
      );
    }

    // The restore is considered successful when at least one document was
    // written and no document failed to import.
    return totalWritten > 0 && totalFailed === 0;
  }

  /**
   * Forces the start of a graphql replication run cycle for each state of
   * each active sync.
   * If a collection name is provided, the replication cycle runs for
   * that collection only.
   * When the Sync runs for all collections, the auth token gets refreshed before the replication cycle.
   * @param collectionName? The name of the collection to be synced
   * @param retrySyncAttempt? Number of the retry attempt, if the previos sync failed
   */
  runSync(collectionName?: string, retrySyncAttempt?: number) {
    let refreshStream$: Observable<boolean> = obsOf(true);

    if (!collectionName) {
      refreshStream$ = this._authService.refreshToken();
    }

    combineLatest([this.isSyncing, this._nss.isOnline$, refreshStream$])
      .pipe(take(1))
      .subscribe(([_isSyncing, isOnline, refresh]) => {
        if (!refresh) {
          this._logoutEvt.emit();
        }
        if (isOnline && refresh) {
          if (isDevMode()) {
            console.log(`Running the sync for ${collectionName ? collectionName : 'all'}! `);
          }
          const actSyncs = this._activeSyncs.value;
          if (collectionName) {
            const actSync: ActiveSync | undefined = actSyncs[collectionName];
            if (actSync && actSync.state) {
              if (retrySyncAttempt) {
                actSync.retrySyncAttempts = retrySyncAttempt;
              }
              actSync.state.reSync();
              actSync.state.awaitInSync().then(() => {
                actSync.retrySyncAttempts = 0;
                if (this.config.syncOptions.live) {
                  this._collectionChangedEmit(
                    'replication cycle complete',
                    actSync.state.collection,
                  );
                } else {
                  setTimeout(() => {
                    this._collectionChangedEmit(
                      'replication cycle complete',
                      actSync.state.collection,
                    );
                  }, 5000);
                }
              });
            }
          }
        }
      });
  }

  /**
   * Emits the "first replication cycle completed" state for a single collection.
   * Both the registered-collections list and the per-collection flag are
   * BehaviorSubjects, so late subscribers receive the current value instead of
   * missing a one-shot event (unlike `firstReplicationComplete`, which depends on
   * the non-replaying `collectionsInitialized` emitter).
   * @param name The collection name
   * @returns An observable emitting true once the collection's first sync completed
   */
  collectionFirstSyncCompleted(name: string): Observable<boolean> {
    return this._registeredCollections.pipe(
      map(colls => colls.find(coll => coll.collection.name === name)),
      filter((coll): coll is RegisteredCollection => coll != null),
      switchMap(coll => coll.firstSyncCompleted),
      distinctUntilChanged(),
    );
  }

  /**
   * Adds or removes a collection from the problemSyncing collections list.
   * @param collection The collection name to be added or removed
   * @param operation Add or remove
   */
  private _toggleActiveSyncProblem(collection: string, operation: 'add' | 'remove'): void {
    const currentSyncsWithProblems = this.problemSyncing.getValue();
    const index = currentSyncsWithProblems.indexOf(collection, 0);
    if (index > -1 && operation === 'remove') {
      currentSyncsWithProblems.splice(index, 1);
    } else if (index < 0 && operation === 'add') {
      currentSyncsWithProblems.push(collection);
    }
    this.problemSyncing.next(currentSyncsWithProblems);
  }

  /**
   * Reports a sync failure to Sentry so that sync errors are tracked
   * @param collection The collection that could not be synced
   * @param error The sync error that caused the failure
   */
  private _reportSyncError(collection: string, error?: RxError | RxTypeError): void {
    if (this._ehms == null) {
      return;
    }
    const gqlErrors = (
      (error?.parameters?.errors ?? []) as {
        message?: string;
        extensions?: {code?: string};
      }[]
    )
      .map(gqlError => [gqlError.extensions?.code, gqlError.message].filter(Boolean).join(': '))
      .filter(Boolean);
    const details = gqlErrors.length
      ? gqlErrors.join(' | ')
      : error?.message || 'Unknown sync error';
    const summary = error?.code ? `[${error.code}] ${details}` : details;
    this._ehms.captureErrorMessage(
      `Could not sync collection "${collection}": ${summary}`,
      'error',
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
      {
        collection,
        pullQueryExtraParams,
        pushQueryExtraParams,
        firstSyncCompleted: new BehaviorSubject<boolean>(false),
      },
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
  protected _initSync(): void {
    const collectionChange = this._registeredCollections.pipe(debounceTime(300));
    combineLatest([collectionChange, this._authService.authToken, this._nss.isOnline$])
      .pipe(withLatestFrom(this._authService.authenticated))
      .subscribe(([[registeredCollections, token, isOnline], authEvt]) => {
        const activeSyncsKeys = Object.keys(this._activeSyncs.getValue());
        if (authEvt.auth && token != null && isOnline) {
          const collectionNames: string[] = Object.values(this._activeSyncs.getValue()).map(
            coll => coll.collectionName,
          );
          // If the user is authenticated with a new token, a webSocket client is opened.
          // All collections graphql subscriptions will be sent through this client.
          if (
            this._dataConfig.value.syncOptions.live &&
            this._dataConfig.value.syncOptions.url.ws != null &&
            token &&
            token != this._currentToken
          ) {
            this._wsClient = newClient(
              this._dataConfig.value.syncOptions.url.ws,
              token,
              this._refreshEvt,
              this._dataConfig.value.syncOptions.socketJwtExpiredCode,
            );
          }
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
  protected _setupCollectionSync(
    collection: RxCollection,
    params: CollectionSyncParams,
    token: string,
  ): void {
    const isLive: boolean =
      this._dataConfig.value.syncOptions.live != false &&
      this._dataConfig.value.syncOptions.url.ws != null;

    const actSyncs = this._activeSyncs.getValue();
    this._stopCollectionSync(collection.name);
    const state = replicateGraphQL({
      ...this._dataConfig.value.syncOptions,
      collection,
      url: this._dataConfig.value.syncOptions.url,
      headers: {'Authorization': `Bearer ${token}`},
      deletedField: '_deleted',
      retryTime: 5000,
      pull: {
        queryBuilder: pullQueryBuilder(
          collection,
          this._dataConfig.value.syncOptions,
          params.pullQueryExtraParams,
        ),
        responseModifier: async function (
          plainResponse: RxDocumentData<any>[],
          _origin: any,
          _requestCheckpoint: any,
        ) {
          return pullResponseModifier(plainResponse);
        } as RxGraphQLPullResponseModifier<any, RxDocumentData<Model>>,
        batchSize: this.config.syncOptions.batchSizePull ?? DEFAULT_SYNC_OPTIONS.batchSizePull,
      },
      push: {
        queryBuilder: pushQueryBuilder(collection, params.pushQueryExtraParams),
        responseModifier: function (plainResponse: RxDocumentData<any>[]) {
          return pushResponseModifier(plainResponse);
        },
        batchSize: this.config.syncOptions.batchSizePush ?? DEFAULT_SYNC_OPTIONS.batchSizePush,
      },
    });

    /*
    ERROR_MESSAGES GraphQL replication
    https://github.com/pubkey/rxdb/blob/master/src/plugins/dev-mode/error-messages.ts
    */
    state.error$.subscribe((error: RxError | RxTypeError) => {
      if (isDevMode()) {
        console.dir(error);
      }
      const jwtError = this._dataConfig.value.syncOptions.authErrorMessage || 'JWTExpired';
      if (
        error &&
        error.parameters.errors &&
        error.parameters.errors.length &&
        error.parameters.errors[0].message
      ) {
        if (error.parameters.errors[0].message.indexOf(jwtError) >= 0) {
          console.log(error.parameters.errors[0].message);
          this._refreshEvt.emit();
        } else if (
          error.code === 'RC_PUSH' &&
          (error.parameters.errors[0] as any).extensions &&
          (error.parameters.errors[0] as any).extensions.code &&
          (error.parameters.errors[0] as any).extensions.code.indexOf('constraint-violation') >= 0
        ) {
          if (actSyncs[collection.name].retrySyncAttempts !== -1) {
            console.error(`Sync replication error: ${error}`);
            const retrySyncAttempts =
              actSyncs[collection.name].retrySyncAttempts !== undefined
                ? 1 + actSyncs[collection.name].retrySyncAttempts!
                : 1;
            const maxAttempts: number = this.config.syncOptions.retrySyncMaxAttempts ?? 3;
            if (retrySyncAttempts <= maxAttempts) {
              this.syncErrorEvt.emit({collection: collection.name, retrySyncAttempts, error});
            } else {
              this.couldNotSyncEvt.emit({
                collection: collection.name,
                retrySyncAttempts: -1,
                error,
              });
            }
          }
        }
      }
    });

    let stateActivity: Observable<boolean> = isLive
      ? combineLatest([
          from(state.awaitInSync()).pipe(
            startWith(false),
            map(act => !act),
          ),
          state.active$,
        ]).pipe(map(([notInSync, active]) => notInSync || active))
      : from(state.awaitInSync()).pipe(
          startWith(false),
          map(act => !act),
        );

    let clientRequestSub: {unsubscribe: () => void} = Subscription.EMPTY;
    let stateReceivedSub: {unsubscribe: () => void} = Subscription.EMPTY;
    if (isLive) {
      const query = subscriptionQueryBuilder(collection);
      const clientRequest = newClientSubscription(this._wsClient, {query});

      stateReceivedSub = state.received$.pipe(throttleTime(500)).subscribe(_data => {
        this._collectionChangedEmit('changed data pulled', collection);
      });

      clientRequestSub = clientRequest.subscribe({
        next: () => {
          this.runSync(collection.name);
        },
        error: err => console.log('clientRequestSub err: ', err),
      });
    }

    actSyncs[collection.name] = {
      state,
      clientRequestSub,
      stateReceivedSub,
      stateActivity,
      collectionName: collection.name,
    };
    this._toggleActiveSyncProblem(collection.name, 'remove');
    this._activeSyncs.next(actSyncs);

    if (!isLive) {
      this.runSync(collection.name);
    }
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
    const {state, clientRequestSub, stateReceivedSub} = actSyncs[collectionName];
    clientRequestSub.unsubscribe();
    stateReceivedSub.unsubscribe();
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
    if (isDevMode()) {
      console.log({
        collection: collection.name,
        action: msg,
        ...(count != null && {count}),
      });
    }

    this._collectionChanged.emit({
      timestamp: new Date().getTime(),
      collection: collection.name,
      action: msg,
      ...(count != null && {count}),
    });

    const firstSyncMsg = this.config.syncOptions.live
      ? 'replication cycle complete'
      : 'Document updated';
    if (msg === firstSyncMsg) {
      const coll = this._registeredCollections.value.find(
        coll => coll.collection.name === collection.name,
      );
      if (coll && coll.firstSyncCompleted.value === false) {
        coll.firstSyncCompleted.next(true);
      }
    }
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
  return d && d.update != null && d.collection != null;
};
