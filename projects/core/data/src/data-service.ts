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
import {AuthService, hasJwtAuthError, NetworkStatusService} from '@dino/core/auth';
import {ConfigService} from '@dino/core/config';
import {ErrorHandlerMessageService} from '@dino/core/error-handler';
import {
  addRxPlugin,
  createRxDatabase,
  removeRxDatabase,
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
  defer,
  firstValueFrom,
  from,
  interval,
  merge,
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
  exhaustMap,
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
import {boundedRetry} from './bounded-retry';
import {
  LocalDataOwner,
  localDataOwner,
  removeLocalDataOwner,
  storeLocalDataOwner,
} from './local-data-owner';
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
 * The order of this array is the dependency order used on restore: referenced
 * collections come first and the owned data collections ({@link OWNED_DATA_COLLECTIONS})
 * come last, so that on a live backend their sync push cannot precede — and thus violate
 * a foreign key against — the collections they reference. See {@link DataService.importDatabase}.
 */
export const BACKUP_DATA_COLLECTIONS: readonly string[] = [
  'area',
  'case',
  'project',
  'location',
  'organization',
  'form_schema',
  'report_schema',
  'form_schema_deps',
  'form_status',
  'lang',
  'report_data',
  'form_data',
];

/**
 * Collections whose documents carry a `user_data_ref_id` that must be reassigned to the
 * importing user on restore. These reference documents in the other backup collections,
 * so on a restore against a live backend they are written (and therefore pushed) last,
 * after the referenced collections are confirmed in sync — see {@link DataService.importDatabase}.
 */
const OWNED_DATA_COLLECTIONS: readonly string[] = ['form_data', 'report_data'];

/**
 * Safety cap for how long a restore waits for the referenced collections to be pushed to
 * the backend before writing the owned data collections. It is NOT the ordering mechanism
 * (that is {@link RxReplicationState.awaitInSync}); it only prevents the restore from hanging
 * indefinitely when a prerequisite never reaches in-sync. On expiry the owned data is written
 * anyway and any resulting sync error is left to the normal replication retry mechanism.
 */
const RESTORE_PRESYNC_MAX_WAIT_MS = 60000;

/**
 * Safety cap for how long the creation of a database waits for the teardown of the previous
 * one to complete. The wait is what makes a logout immediately followed by a login safe:
 * rxdb keeps a database name reserved until its instance is closed, so creating a new one
 * while the previous teardown is still running throws (rxdb error DB8) and would leave the
 * app with no database at all. The cap only prevents a teardown that never settles from
 * blocking the login forever; on expiry the creation is attempted anyway and, if the name is
 * still taken, retried - see {@link DB_CREATION_MAX_ATTEMPTS}.
 */
const DB_TEARDOWN_MAX_WAIT_MS = 30000;

/**
 * Safety cap for how long the teardown waits for the running replications to be cancelled
 * before removing the storage. Stopping them first is correct - rxdb waits for the database
 * to be idle while closing it - but it cannot be a condition: `RxReplicationState.cancel()`
 * awaits the checkpoint queue and the meta instance, so a pending write or request leaves it
 * unresolved and the removal, which is the only thing that clears the stored schema hashes,
 * would never run. On expiry the database is removed anyway.
 */
const SYNC_STOP_MAX_WAIT_MS = 5000;

/**
 * Number of attempts allowed when creating the database. More than one attempt is needed
 * because the name of a database being torn down is released asynchronously.
 */
const DB_CREATION_MAX_ATTEMPTS = 5;

/**
 * Delay between two database creation attempts, in milliseconds.
 */
const DB_CREATION_RETRY_DELAY_MS = 1000;

/**
 * Number of consecutive pre-sync token refresh failures past which the problem is
 * reported to Sentry as an error rather than a warning.
 *
 * It is a severity threshold and nothing else. It used to end the session, and
 * that was wrong twice over: a failed refresh is no proof of a dead session - the
 * auth service reports the same negative result for a revoked refresh token, a
 * 5xx, a timeout and a request failing while `navigator.onLine` is still true -
 * and `runSync()` is called by the replication error handlers too, so three
 * background retries with a dead token sent the user to the login page with no
 * gesture of theirs and no question asked. Ending a session is the user's
 * decision, taken in the dialog behind the badge.
 */
const MAX_CONSECUTIVE_SYNC_REFRESH_FAILURES = 3;

/**
 * Name reported in {@link DataService.problemSyncing} when the auth token cannot
 * be renewed. Not a collection: it is the one problem that stops all of them, and
 * it travels on the badge and the end of cycle message the collections use.
 */
const TOKEN_RENEWAL_SYNC_PROBLEM = 'authentication';

/**
 * Number of consecutive failed token renewals after which the replications are
 * stopped. They cannot succeed without a usable token, and rxdb retries every
 * `retryTime` - a loop that costs battery and data on a device in the field, for
 * nothing. The session is left alone: a sync request, or a renewal that goes
 * through, starts them again.
 */
const MAX_TOKEN_RENEWAL_FAILURES = 3;

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
   * The database instance currently open, or null when none is.
   * Held as a plain reference, and not read back from {@link _db}, because the
   * teardown must always act on the instance it was started for: {@link _db}
   * replays its latest value, so a teardown subscribing to it could be handed
   * the database created by a subsequent login and destroy that one instead.
   */
  private _currentDb: RxDatabase | null = null;

  /**
   * Resolves when the teardown of the previous database is complete.
   * Awaited before a new database is created, so that a logout and a login in
   * quick succession cannot overlap. Never rejects: a failed teardown must not
   * prevent the next login from getting a database.
   */
  private _dbTeardown: Promise<void> = Promise.resolve();

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
   * Emits when the current session is over, however it ended: an explicit logout,
   * or an `endSession()` from anywhere - the interceptor running out of attempts,
   * or the user answering the dialog behind the sync badge.
   *
   * Used to abort work that belongs to the session being left. It is not itself
   * destructive: the data teardown hangs off the auth service's `logoutEvt`,
   * which only an explicit logout emits, so a session that merely ended keeps the
   * data collected offline.
   */
  private get _sessionOverEvt(): Observable<unknown> {
    return merge(
      this._authService.logoutEvt,
      this._authService.authenticated.pipe(filter(authEvt => authEvt.evt === 'expired')),
    );
  }

  /**
   * Count of the consecutive pre-sync token refresh failures.
   * Reset by every successful refresh, so that an isolated failure in a later
   * cycle starts the budget over instead of inheriting the previous one.
   */
  private _failedSyncRefreshes: number = 0;

  /**
   * Count of the consecutive failed token renewals, from any source.
   * Drives the badge and, past {@link MAX_TOKEN_RENEWAL_FAILURES}, the stop of
   * the replications. Reset by a renewal that actually produced a usable token.
   */
  private _failedTokenRenewals: number = 0;

  /**
   * Collections given up on after a push the server kept refusing.
   * Kept here because the marker cannot live on the active sync: that entry is
   * deleted when the sync is stopped, and `_initSync()` sets the collection up
   * again on every token renewal.
   */
  private _abandonedCollections: Set<string> = new Set<string>();

  /**
   * Collections whose replication is being rebuilt right now.
   */
  private _rebuildingSyncs: Set<string> = new Set<string>();

  /**
   * The collections the sync gave up on because the server refused their
   * documents.
   *
   * Read by the ui to explain a badge that no amount of syncing clears:
   * {@link problemSyncing} names the collection but not the reason, and the
   * reason is what decides what to offer the user. Documents that are refused,
   * not delayed, need a person - an admin fixing the data, or an export of the
   * local database followed by a logout.
   */
  get abandonedCollections(): string[] {
    return [...this._abandonedCollections];
  }

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
      .pipe(
        filter(
          authEvt =>
            authEvt.evt === 'login' || authEvt.evt === 'logout' || authEvt.evt === 'expired',
        ),
      )
      .subscribe(authEvt => {
        const login = authEvt.evt === 'login';
        this._refreshDb.next(login ? 'ready' : 'notReady');
        if (!login) {
          // The database of the next session does not exist yet, so the token of
          // this one has to go: a registration starting before the new database
          // is open would otherwise find the old token still current, register
          // against the database this session is leaving and report itself done.
          // Nothing would then be registered on the database the next session
          // actually uses - a query for a collection that is not there.
          this.dbToken.next(null);
          // And the session state with it. The registered collections hold
          // `RxCollection` handles of the database being left, and a re-
          // registration is dropped as a duplicate by name, so leaving them
          // there means the next session replicates collections of a closed
          // database: they never reach in-sync and the sync spinner never stops.
          // `expired` is in here for the same reason as `logout`, minus the
          // teardown: a session the app gave up on keeps its data.
          this._resetSessionState();
        }
      });

    this._db = this._refreshDb.pipe(
      filter(rdy => rdy === 'ready'),
      switchMap(() => {
        return this._dataConfig.pipe(
          // `defer` (not `from` on a promise) so that a retry really runs the
          // creation again instead of re-reading an already rejected promise.
          switchMap(cfg =>
            defer(() => this._createDatabase(cfg)).pipe(
              boundedRetry<RxDatabase>({
                count: DB_CREATION_MAX_ATTEMPTS,
                delay: DB_CREATION_RETRY_DELAY_MS,
                label: 'createRxDatabase',
              }),
            ),
          ),
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

    this.isSyncing = combineLatest([this._activeSyncs, this.problemSyncing]).pipe(
      switchMap(([syncs, problems]) => {
        const syncsStateActivity: Observable<Boolean>[] = [];
        for (let key in syncs) {
          if (syncs[key] != null) {
            syncsStateActivity.push(syncs[key].stateActivity);
          }
        }
        // Two states in which the spinner has to be off, and used to keep
        // turning. Nothing replicating: `combineLatest([])` completes without
        // emitting, so whoever renders this kept the last value it ever saw -
        // true. And a sync blocked on renewing the token: it says "working on it"
        // while the truth is "cannot, and will not until you log in again",
        // contradicting the badge that says so.
        if (syncsStateActivity.length === 0 || problems.includes(TOKEN_RENEWAL_SYNC_PROBLEM)) {
          return obsOf(false);
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
        if (collections.length === 0) {
          // No collection registered means there is nothing to wait for - the
          // session has just been torn down. Reporting `false` here would be
          // read as "initialization in progress" and leave the initialization
          // spinner on the login page (see `isLoading` in the main nav).
          // The login path does not rely on this branch: it gets its `false`
          // from the `started` event above, emitted before the collections are
          // registered.
          // The explicit value matters because combineLatest of an empty array
          // never emits, so without it the stream goes silent on logout and
          // whoever is showing a spinner keeps showing it.
          return obsOf([true]);
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

    // No artificial delay before asking for a new token: the refresh is
    // single-flight in the auth service, so the collections reporting an
    // expired JWT at the same time share one http call. exhaustMap drops the
    // triggers arriving while a refresh is already running.
    this._refreshEvt
      .pipe(exhaustMap(() => this._authService.refreshToken()))
      // Offline the refresh reports success without even trying, so the result
      // alone would clear the badge while nothing was renewed. What counts is
      // whether the token is usable now.
      .subscribe(refreshed => this._reportTokenRenewal(refreshed && this._hasUsableToken()));

    // Any renewal that goes through clears the badge, whoever asked for it. Only
    // the two paths above used to report, while the guard, the interceptor and
    // the pre-emptive timer renew without passing through either - so the badge
    // stayed lit after the session had recovered, and the sync icon then sent the
    // user to log in again for nothing.
    this._authService.tokenRefreshedEvt?.subscribe(() => this._reportTokenRenewal(true));

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
      const alreadyAbandoned = this._abandonedCollections.has(collection);
      this._abandonedCollections.add(collection);
      this._stopCollectionSync(collection);
      if (collection === 'form_data' || collection === 'form_schema') {
        this._stopCollectionSync('log');
      }
      if (isDevMode()) console.log(`COULD NOT SYNC ${collection}`);
      this._toggleActiveSyncProblem(collection, 'add');
      if (!alreadyAbandoned) {
        // Reported once. The collection is set up again on every token renewal
        // and gives up again, so reporting each round would fill Sentry with one
        // event every eleven minutes for a problem already known.
        this._reportSyncError(collection, evt.error);
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
            // The error is swallowed here on purpose: letting it reach the
            // subscriber would terminate this subscription, and no later logout
            // would tear the database down at all.
            return this.destroyAllCollections().pipe(
              catchError(err => {
                console.error('Could not destroy the local database on logout', err);
                return obsOf([]);
              }),
            );
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
          return throwError(() => new Error('Invalid collection'));
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
          return throwError(() => new Error('Invalid collection'));
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
          return throwError(() => new Error('Invalid collection'));
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
          return throwError(() => new Error('Invalid collection'));
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
          return throwError(() => new Error('Invalid collection'));
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
          return throwError(() => new Error('Invalid collection'));
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
                  this._reportCollectionError(params.name, err);
                  return obsOf(false);
                }),
              );
            }
            return obsOf(true);
          }),
          // The db token may still be settling, so retry - but bounded, instead
          // of looping forever. This waits on the local database, so a
          // momentarily expired token must not abort the collection setup.
          boundedRetry<boolean>({
            count: 30,
            delay: 1000,
            label: `createCollection:${params.name}`,
          }),
          // Reached when the retries are exhausted, i.e. the database never
          // became the one this registration was started for. Reporting it is
          // the point: the collection is now permanently absent for this
          // session and nothing else would ever say so.
          catchError(err => {
            this._reportCollectionError(params.name, err);
            return obsOf(false);
          }),
          // A session that ends aborts the attempt in flight: retrying against a
          // database nobody is authenticated for only ends in a spurious "could
          // not create collection" report. The registration itself stays alive,
          // so the next login re-registers on the new database - this used to cut
          // the whole stream, and the collection was then absent for the rest of
          // the page session, however the session had ended.
          takeUntil(this._sessionOverEvt),
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
          return throwError(() => new Error('Invalid collection'));
        }
        return from(collection.destroy()).pipe(
          tap(() => this._removeRegisteredCollection(collection)),
        );
      }),
    );
  }

  /**
   * The id of the user the local database belongs to, or null when this device
   * holds no data.
   *
   * A session the app gave up on leaves the data in place, so this outlives it:
   * it is how the login page can warn that logging in with another account
   * deletes what is still here. An explicit logout clears it along with the data.
   */
  get localDataOwner(): LocalDataOwner | null {
    return localDataOwner(this._dataConfig.value.databaseCreateOptions.name);
  }

  /**
   * Destroys the current local db, with all its collections and their stored data.
   * Called on logout, so that the next user does not inherit the previous one's data.
   *
   * The returned observable emits the names of the removed collections. The teardown
   * itself starts immediately, and is registered as the pending one, so that a login
   * arriving before it completes waits for it instead of failing to create a database
   * whose name is still reserved.
   */
  destroyAllCollections(): Observable<string[]> {
    const teardown = this._teardownDatabase();
    this._dbTeardown = teardown.then(
      () => undefined,
      () => undefined,
    );
    return from(teardown);
  }

  /**
   * Stops every replication and removes the current database and its data.
   * The service state describing the previous session (registered collections,
   * websocket client, current token, sync problems) is reset synchronously,
   * before the first await, so that it cannot wipe the state of a session
   * started in the meantime.
   */
  private async _teardownDatabase(): Promise<string[]> {
    const db = this._currentDb;
    this._currentDb = null;
    const syncsStopped = this._stopAllCollectionSyncs();
    this._resetSessionState();
    // The data is about to go, so the ownership record goes with it: leaving it
    // behind would claim data that no longer exists.
    removeLocalDataOwner(this._dataConfig.value.databaseCreateOptions.name);
    // The replications have to be actually stopped before the storage goes away:
    // rxdb waits for the database to be idle while closing it, and a replication
    // still writing either keeps it busy or writes to a destroyed collection.
    // Bounded, though: this wait used to be unbounded, and a cancellation that
    // never settled silently skipped the removal below - the database survived
    // the logout with its stored schema hashes, so a collection whose schema
    // changed without a version bump kept failing to register (rxdb DB6) at
    // every following login, with a reload unable to fix it either.
    const syncsActuallyStopped = await this._awaitAtMost(syncsStopped, SYNC_STOP_MAX_WAIT_MS);
    if (db == null) {
      return [];
    }
    if (!syncsActuallyStopped) {
      this._reportDbTeardownDelay(
        `Replications did not stop within ${SYNC_STOP_MAX_WAIT_MS}ms; ` +
          `removing the local database anyway.`,
      );
    }
    // `remove()` closes every collection and deletes its storage, so iterating
    // over the registered collections adds nothing. It also removes collections
    // that were never registered here, and - unlike the previous forkJoin over
    // the registered ones - it runs even when that list is empty, which used to
    // leave the database open and its name reserved for good.
    return db.remove();
  }

  /**
   * Waits for the teardown of the previous database, then creates a new one.
   * @param config The data configuration holding the database creation options.
   */
  private async _createDatabase(config: DataServiceConfig): Promise<RxDatabase> {
    await this._awaitDbTeardown();
    await this._removeDataOfPreviousUser(config);
    if (this._currentDb != null) {
      // A database is still open although no teardown removed it: a login after
      // a session that only ended, or a configuration change. Close it - without
      // deleting its data - because rxdb refuses to create a second instance
      // for a name that is still in use.
      const previous = this._currentDb;
      this._currentDb = null;
      await previous.destroy().catch(() => undefined);
    }
    const db = await createRxDatabase(config.databaseCreateOptions);
    this._currentDb = db;
    return db;
  }

  /**
   * Removes the local database when it belongs to a different user than the one
   * now logged in, before that user gets a database to work with.
   *
   * A session the app gave up on no longer destroys the data - the whole point
   * being to keep what was collected offline until it can be pushed - so this is
   * what stops the next person on a shared device from inheriting it. The owner
   * is remembered next to the database and not inside it, so it can be read
   * without opening anything.
   *
   * @param config The data configuration holding the database creation options.
   */
  private async _removeDataOfPreviousUser(config: DataServiceConfig): Promise<void> {
    const user = this._authService.getUserInfo();
    if (user?.id == null) {
      // Nobody is logged in yet: nothing to compare, and nothing to inherit.
      return;
    }
    const databaseName = config.databaseCreateOptions.name;
    const previousOwner = localDataOwner(databaseName);
    // The label travels with the id because it is read where no session is left
    // to ask: the login page runs `resetAuth()` before it renders, which takes
    // the user info with it.
    const owner = {
      id: user.id,
      label: user.email ?? (user as {displayName?: string}).displayName ?? null,
    };
    if (previousOwner?.id === owner.id) {
      if (previousOwner.label !== owner.label) {
        storeLocalDataOwner(databaseName, owner);
      }
      return;
    }
    if (previousOwner != null) {
      const message =
        `The local database belongs to another user: removing it before ` +
        `starting the session of ${owner.id}.`;
      console.warn(message);
      this._ehms?.captureErrorMessage(message, 'warning');
      if (this._currentDb != null) {
        await this._teardownDatabase().catch(() => undefined);
      } else {
        // No instance is open - a fresh app start - so the storage is removed by
        // name instead of opening it just to throw it away.
        await removeRxDatabase(databaseName, config.databaseCreateOptions.storage).catch(
          () => undefined,
        );
      }
    }
    storeLocalDataOwner(databaseName, owner);
  }

  /**
   * Waits for the pending database teardown, giving up after
   * {@link DB_TEARDOWN_MAX_WAIT_MS} so that a teardown which never settles cannot
   * block the login indefinitely.
   */
  private async _awaitDbTeardown(): Promise<void> {
    const pending = this._dbTeardown;
    const completed = await this._awaitAtMost(pending, DB_TEARDOWN_MAX_WAIT_MS);
    if (completed) {
      return;
    }
    // Reported, and not only in dev mode: reaching this point means the previous
    // database was not removed, so this session starts on the previous session's
    // storage. It is the state in which a collection whose schema changed without
    // a version bump can never register again (rxdb DB6), and nothing else would
    // say that the logout failed to wipe anything.
    this._reportDbTeardownDelay(
      `Db teardown did not complete within ${DB_TEARDOWN_MAX_WAIT_MS}ms; ` +
        `creating the new database anyway, on a local database that was not removed.`,
    );
    // Give up on this teardown for good: the creation is retried, and each
    // retry waiting the full cap again would keep the app without a database
    // for minutes instead of seconds.
    if (this._dbTeardown === pending) {
      this._dbTeardown = Promise.resolve();
    }
  }

  /**
   * Awaits a promise, giving up after `maxWaitMs`.
   *
   * A rejection counts as settled: the caller waits for something to be over,
   * and something that failed is over too.
   *
   * @param promise The promise to wait for
   * @param maxWaitMs How long to wait, in milliseconds
   * @returns True when the promise settled within the cap, false on expiry
   */
  private _awaitAtMost(promise: Promise<unknown>, maxWaitMs: number): Promise<boolean> {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const cap = new Promise<boolean>(resolve => {
      timer = setTimeout(() => resolve(false), maxWaitMs);
    });
    return Promise.race([
      promise.then(
        () => true,
        () => true,
      ),
      cap,
    ]).finally(() => {
      if (timer != null) {
        clearTimeout(timer);
      }
    });
  }

  /**
   * Reports a database teardown that did not complete in time.
   *
   * Both cases are recoverable by design - the removal runs anyway, the creation
   * proceeds anyway - but they mean the local database outlived the session that
   * created it, which is exactly the state that makes a schema hash conflict
   * (rxdb DB6) permanent. Silent in production, it would be indistinguishable
   * from "the sync is stuck again".
   *
   * @param message What was waited for and what was done instead
   */
  private _reportDbTeardownDelay(message: string): void {
    console.warn(message);
    this._ehms?.captureErrorMessage(message, 'warning');
  }

  /**
   * Resets the state describing the session being closed. Without this, the next
   * session starts with the previous session's collections registered against a
   * database that no longer exists, and with a websocket still carrying the
   * revoked token.
   */
  private _resetSessionState(): void {
    this._registeredCollections.next([]);
    this.problemSyncing.next([]);
    this._abandonedCollections.clear();
    this._currentToken = null;
    if (this._wsClient != null) {
      this._wsClient.dispose();
      this._wsClient = null;
    }
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
        collections: (json.collections ?? []).filter(c => BACKUP_DATA_COLLECTIONS.includes(c.name)),
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
          switchMap(db => from(this._restoreCollections(db, dump.collections!, ownerUserDataId))),
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

    // Drive the restore by the dependency order declared in BACKUP_DATA_COLLECTIONS
    // rather than by the (arbitrary) order the collections happen to appear in the
    // dump file, so the owned data collections are always written last.
    const dumpByName = new Map(collections.map(coll => [coll.name, coll]));

    // Collections present in the dump but not whitelisted are skipped: this guards
    // backend-managed collections from being written and then pushed to the backend
    // through their active sync replication.
    for (const coll of collections) {
      if (!BACKUP_DATA_COLLECTIONS.includes(coll.name)) {
        skipped.push(coll.name);
      }
    }

    // Writes a single dump collection into its local RxCollection, applying owner
    // reassignment when required. Returns the RxCollection when at least one document
    // was written, null otherwise.
    const writeCollection = async (name: string): Promise<RxCollection | null> => {
      const coll = dumpByName.get(name);
      if (coll == null) {
        return null;
      }

      const collection = db.collections[name] as RxCollection | undefined;
      if (collection == null) {
        skipped.push(name);
        return null;
      }

      const reassignOwner =
        ownerUserDataId != null &&
        ownerUserDataId.length > 0 &&
        OWNED_DATA_COLLECTIONS.includes(name);

      const docs = (coll.docs || []).map(doc => {
        const clean: {[key: string]: any} = {...doc};
        managedFields.forEach(field => delete clean[field]);
        if (reassignOwner) {
          clean['user_data_ref_id'] = ownerUserDataId;
        }
        return clean;
      });
      if (docs.length === 0) {
        return null;
      }

      const {success, error} = await collection.bulkUpsert(docs);
      totalWritten += success.length;
      totalFailed += error.length;
      if (error.length > 0 && isDevMode()) {
        console.error(`Restore: ${error.length} document(s) failed in "${name}".`, error);
      }
      if (success.length > 0) {
        this._collectionChangedEmit('Documents restored', collection, success.length);
        return collection;
      }
      return null;
    };

    // 1. Restore, in dependency order, every whitelisted collection EXCEPT the owned
    //    data ones. With a live replication these get pushed to the backend as soon
    //    as they are written locally.
    const writtenPrereqCollections: RxCollection[] = [];
    for (const name of BACKUP_DATA_COLLECTIONS) {
      if (OWNED_DATA_COLLECTIONS.includes(name)) {
        continue;
      }
      const written = await writeCollection(name);
      if (written != null) {
        writtenPrereqCollections.push(written);
      }
    }

    // Which prerequisite collections were written, and with how many docs each.
    if (isDevMode()) {
      console.log(
        'Restore: prerequisites written:',
        writtenPrereqCollections.map(coll => ({
          name: coll.name,
          docsInDump: dumpByName.get(coll.name)?.docs?.length ?? 0,
        })),
      );
    }

    // 2. The owned data collections (form_data / report_data) reference documents in
    //    the collections above. When a live replication is actively pushing to a backend
    //    that enforces referential integrity (Hasura), writing the owned data now would
    //    let its push race the prerequisites' push and fail with a constraint violation
    //    that, once the retry budget is exhausted, is fatal. So — only in that case —
    //    wait for the prerequisites to be fully pushed before writing the owned data.
    //    When there is no active push (backendless deployment) or the app is offline,
    //    there is nothing to race, so we skip the wait and write immediately (the offline
    //    reconnection push is left to the normal replication retry mechanism).
    const syncOpts = this._dataConfig.value.syncOptions;
    const isLive = syncOpts.live != false && syncOpts.url.ws != null;
    const isOnline = await firstValueFrom(this._nss.isOnline$);
    const hasActivePrereqSync = writtenPrereqCollections.some(
      coll => this._activeSyncs.getValue()[coll.name] != null,
    );
    // Gating decision + which prerequisites actually have an active sync.
    if (isDevMode()) {
      console.log('Restore: gating decision:', {
        isLive,
        isOnline,
        hasActivePrereqSync,
        willWait: isLive && isOnline && hasActivePrereqSync,
        prereqsWithActiveSync: writtenPrereqCollections
          .map(coll => coll.name)
          .filter(name => this._activeSyncs.getValue()[name] != null),
      });
    }
    if (isLive && isOnline && hasActivePrereqSync) {
      if (isDevMode()) {
        console.log('Restore: waiting for prerequisites to be in sync…');
      }
      await this._awaitCollectionsInSync(
        writtenPrereqCollections.map(coll => coll.name),
        RESTORE_PRESYNC_MAX_WAIT_MS,
      );
      if (isDevMode()) {
        console.log('Restore: finished waiting; now writing owned data.');
      }
    }

    // 3. Restore the owned data collections, in the declared order.
    for (const name of BACKUP_DATA_COLLECTIONS) {
      if (OWNED_DATA_COLLECTIONS.includes(name)) {
        if (isDevMode()) {
          console.log(`Restore: writing owned data collection "${name}"`);
        }
        await writeCollection(name);
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
   * Waits until the active sync replications of the given collections report being in
   * sync (i.e. all pending local writes have been pushed to the backend), bounded by
   * `maxWaitMs`. Collections without an active sync are ignored. On timeout the method
   * resolves anyway, leaving any subsequent sync error to the replication retry mechanism.
   *
   * @param collectionNames The names of the collections to wait for
   * @param maxWaitMs Maximum time to wait before giving up
   */
  private async _awaitCollectionsInSync(
    collectionNames: string[],
    maxWaitMs: number,
  ): Promise<void> {
    const actSyncs = this._activeSyncs.getValue();
    const started = Date.now();
    // Track each collection's in-sync resolution individually.
    const waits = collectionNames
      .map(name => ({name, state: actSyncs[name]?.state}))
      .filter(entry => entry.state != null)
      .map(entry =>
        entry.state!.awaitInSync().then(() => {
          if (isDevMode()) {
            console.log(`Restore: "${entry.name}" reached in-sync after ${Date.now() - started}ms`);
          }
        }),
      );
    if (isDevMode()) {
      console.log(
        'Restore: awaiting in-sync for:',
        collectionNames.filter(name => actSyncs[name]?.state != null),
        '(collections without an active sync are ignored:',
        collectionNames.filter(name => actSyncs[name]?.state == null),
        ')',
      );
    }
    if (waits.length === 0) {
      return;
    }

    let timer: ReturnType<typeof setTimeout> | undefined;
    const cap = new Promise<void>(resolve => {
      timer = setTimeout(() => {
        if (isDevMode()) {
          console.warn(
            `Restore: prerequisites did not reach in-sync within ${maxWaitMs}ms; ` +
              `writing owned data anyway.`,
          );
        }
        resolve();
      }, maxWaitMs);
    });

    try {
      await Promise.race([Promise.all(waits).then(() => undefined), cap]);
    } finally {
      if (timer != null) {
        clearTimeout(timer);
      }
    }
  }

  /**
   * Forces the start of a graphql replication run cycle for each state of
   * each active sync.
   * If a collection name is provided, the replication cycle runs for
   * that collection only.
   * When the Sync runs for all collections, the auth token gets refreshed before the replication cycle.
   * A failed refresh only skips the cycle: the session is given up on after
   * {@link MAX_CONSECUTIVE_SYNC_REFRESH_FAILURES} consecutive failures, because a
   * transient failure is indistinguishable from a revoked refresh token.
   * @param collectionName? The name of the collection to be synced
   * @param retrySyncAttempt? Number of the retry attempt, if the previos sync failed
   */
  runSync(collectionName?: string, retrySyncAttempt?: number) {
    let refreshStream$: Observable<boolean> = obsOf(true);
    // Only the full sync refreshes the token, so only it can report on the
    // refresh outcome: the per collection cycles start from a constant `true`.
    const refreshesToken = !collectionName;
    // Whether this call owns the refresh or joins one already in flight. The
    // refresh is single-flight, so tapping the sync button three times while the
    // connection is slow shares one call - and its single failure must be
    // counted once, not once per caller, or three taps exhaust the budget and
    // wipe the local database.
    let ownsRefresh = false;

    if (refreshesToken) {
      ownsRefresh = !this._authService.isRefreshing;
      refreshStream$ = this._authService.refreshToken();
    }

    combineLatest([this.isSyncing, this._nss.isOnline$, refreshStream$])
      .pipe(take(1))
      .subscribe(([_isSyncing, isOnline, refresh]) => {
        if (!refresh) {
          if (ownsRefresh) {
            this._handleSyncRefreshFailure();
          }
          return;
        }
        if (refreshesToken) {
          // A refresh that went through proves the session is still alive: the
          // budget spent by the previous failures is given back, and the badge
          // stops reporting a token that could not be renewed.
          this._failedSyncRefreshes = 0;
          this._reportTokenRenewal(this._hasUsableToken());
        }
        if (isOnline) {
          const actSyncs = this._activeSyncs.value;
          if (collectionName) {
            const actSync: ActiveSync | undefined = actSyncs[collectionName];
            if (actSync && actSync.state) {
              if (retrySyncAttempt) {
                actSync.retrySyncAttempts = retrySyncAttempt;
              }
              if (isDevMode() && !actSync.state.isStopped()) {
                console.log(`Running the sync for ${collectionName}! `);
              }
              if (actSync.state.isStopped()) {
                // rxdb cancels a `live: false` replication after its first cycle,
                // and `reSync()` on a cancelled one does nothing: only rebuilding
                // it runs a cycle.
                this._rebuildCollectionSync(collectionName);
                return;
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
          } else {
            if (isDevMode()) {
              console.log('Running the sync for all! ');
            }
            // The cycle has to be asked for explicitly: it used to be an
            // implicit side effect of the token renewal, which tore down and
            // recreated every replication - restarting it from its checkpoint.
            // A renewed token is now handed to the running replication instead,
            // so nothing else would run a cycle here. Each collection goes
            // through the branch above, which reuses the replication state and
            // only triggers a run.
            Object.keys(actSyncs).forEach(name => this.runSync(name));
          }
        }
      });
  }

  /**
   * Accounts for a pre-sync token refresh that did not succeed.
   * The sync cycle has already been skipped by the caller: this only records the
   * failure, on the badge for the user and in Sentry for us. Nothing here ends
   * the session - see {@link MAX_CONSECUTIVE_SYNC_REFRESH_FAILURES}, which is now
   * only how loud the report is. The local data survives either way.
   */
  private _handleSyncRefreshFailure(): void {
    this._failedSyncRefreshes++;
    const persistent = this._failedSyncRefreshes >= MAX_CONSECUTIVE_SYNC_REFRESH_FAILURES;
    if (isDevMode()) {
      // No "n of 3" here: it read as a countdown to something, and the counter
      // only advances on another cycle that fails the same way.
      console.log(
        `COULD NOT REFRESH THE AUTH TOKEN BEFORE SYNCING: ${this._failedSyncRefreshes} consecutive failure(s)`,
      );
    }
    // Reported either way: a skipped cycle is silent for the user, and a sync
    // that "sometimes does nothing" is exactly what needs to be visible.
    // The badge is the only thing the user in the field can see: the report
    // above goes to Sentry.
    this._reportTokenRenewal(false);
    this._ehms?.captureErrorMessage(
      `Could not refresh the auth token before syncing: sync cycle skipped (${this._failedSyncRefreshes} consecutive failures)`,
      persistent ? 'error' : 'warning',
    );
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
    const current = this.problemSyncing.getValue();
    const index = current.indexOf(collection);
    // Only on a real change, and always a new array. This runs on every token
    // renewal now, and re-emitting the same list restarts everything watching it
    // - the sync spinner among them - while re-emitting the same mutated
    // reference defeats any check based on identity.
    if (operation === 'add' && index < 0) {
      this.problemSyncing.next([...current, collection]);
    } else if (operation === 'remove' && index > -1) {
      this.problemSyncing.next(current.filter(name => name !== collection));
    }
  }

  /**
   * Clears the sync problem of a collection whose replication has just started -
   * unless that collection had been given up on.
   *
   * `_initSync()` sets a stopped collection up again on every token renewal, so
   * clearing its badge here made the only signal the user has blink off for
   * minutes at a time. The session deliberately stays alive in that state, so
   * they can see the error, export the local database and choose when to log out
   * - the only way out, and the one that destroys it.
   *
   * The retry itself stays: a document the server refused may become acceptable,
   * and reaching in-sync is what proves the queue finally went through.
   *
   * @param collectionName The collection whose replication just started.
   * @param state The replication state, asked when it catches up.
   */
  private _reportCollectionSyncStarted(
    collectionName: string,
    state: {awaitInSync: () => Promise<unknown>},
  ): void {
    if (!this._abandonedCollections.has(collectionName)) {
      this._toggleActiveSyncProblem(collectionName, 'remove');
      return;
    }
    state.awaitInSync().then(
      () => {
        this._abandonedCollections.delete(collectionName);
        this._toggleActiveSyncProblem(collectionName, 'remove');
      },
      () => undefined,
    );
  }

  /**
   * Reports whether the auth token could be renewed, on the same badge that
   * reports a collection which cannot be synced.
   *
   * A token that cannot be renewed stops the sync as surely as a rejected push,
   * and nothing said so: the badge was fed only by an exhausted push retry and by
   * a collection that failed to register, while a failed refresh was reported to
   * Sentry, which nobody in the field reads.
   *
   * Marking is informative and reversible, so any failed refresh does it - the
   * one asked for by the replications as much as the one before a sync. Spending
   * the budget that ends the session stays with the explicit paths: a network
   * blip must be visible, not final.
   *
   * @param renewed True when the refresh went through.
   */
  private _reportTokenRenewal(renewed: boolean): void {
    if (renewed) {
      this._failedTokenRenewals = 0;
      this._toggleActiveSyncProblem(TOKEN_RENEWAL_SYNC_PROBLEM, 'remove');
      return;
    }
    this._failedTokenRenewals++;
    this._toggleActiveSyncProblem(TOKEN_RENEWAL_SYNC_PROBLEM, 'add');
    if (this._failedTokenRenewals >= MAX_TOKEN_RENEWAL_FAILURES) {
      // Nothing can be replicated without a token, and rxdb would keep retrying
      // every `retryTime` for as long as the app is open. The badge stays on, the
      // session and the data are untouched, and a sync request or a renewal that
      // goes through brings the replications back.
      this._stopAllCollectionSyncs();
    }
  }

  /**
   * @returns True when the stored auth token can still be used. Tells a refresh
   * that actually renewed the session from one that only reported success because
   * the app was offline and did not try.
   */
  private _hasUsableToken(): boolean {
    return this._authService.hasValidAuthToken?.() ?? true;
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
   * Reports a collection that could not be created.
   *
   * A collection that fails to register is never synced again for the whole
   * session, and used to fail in complete silence: the log was behind
   * `isDevMode()` and the retry exhaustion was swallowed by a bare
   * `catchError`, so in production there was no console output, no report and
   * no sign in the UI - only a sync that "sometimes gets stuck". The console
   * error is therefore deliberately unconditional, and the collection is added
   * to {@link problemSyncing} so that the existing badge and end-of-cycle
   * message name it, like any other collection that could not be synced.
   *
   * @param collectionName The collection that could not be created
   * @param error The error that prevented the creation
   */
  private _reportCollectionError(collectionName: string, error: unknown): void {
    const reason = error instanceof Error ? error.message : String(error);
    const message = `Could not create collection "${collectionName}": ${reason}`;
    console.error(message, error);
    this._toggleActiveSyncProblem(collectionName, 'add');
    this._ehms?.captureErrorMessage(message, 'error');
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
    // `authenticated` belongs in the combineLatest, not in a withLatestFrom: it
    // is sampled to decide whether to sync, so the sync has to be reconsidered
    // when it changes. Sampling it only made the outcome depend on the order in
    // which the auth service emits its two subjects, and a state turning
    // authenticated again would leave the replications stopped for good.
    combineLatest([
      collectionChange,
      this._authService.authToken,
      this._nss.isOnline$,
      this._authService.authenticated,
    ])
      .subscribe(([registeredCollections, token, isOnline, authEvt]) => {
        const activeSyncsKeys = Object.keys(this._activeSyncs.getValue());
        if (authEvt.auth && token != null && isOnline) {
          const collectionNames: string[] = Object.values(this._activeSyncs.getValue()).map(
            coll => coll.collectionName,
          );
          const tokenChanged = token != this._currentToken;
          // If the user is authenticated with a new token, a webSocket client is opened.
          // All collections graphql subscriptions will be sent through this client.
          let wsClientRenewed = false;
          if (
            this._dataConfig.value.syncOptions.live &&
            this._dataConfig.value.syncOptions.url.ws != null &&
            token &&
            tokenChanged
          ) {
            this._wsClient = newClient(
              this._dataConfig.value.syncOptions.url.ws,
              token,
              this._refreshEvt,
              this._dataConfig.value.syncOptions.socketJwtExpiredCode,
            );
            wsClientRenewed = true;
          }
          registeredCollections.forEach(registeredCollection => {
            const {collection, ...params} = registeredCollection;
            if (collectionNames.indexOf(collection.name) < 0) {
              this._setupCollectionSync(collection, params, token);
            } else if (tokenChanged) {
              // Only the auth token changed: hand the new one to the running
              // replication instead of tearing it down. Recreating it restarts
              // the replication from its checkpoint, which re-pulls whole
              // collections and can trigger a mass push - a heavy cycle to pay
              // on every token renewal, now that renewal is pre-emptive.
              this._updateCollectionSyncToken(collection, token, wsClientRenewed);
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
          requestCheckpoint: any,
        ) {
          // The requested checkpoint is forwarded so that an empty response keeps
          // it, instead of rewinding the replication to the epoch.
          return pullResponseModifier(plainResponse, requestCheckpoint);
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
      const errors = error?.parameters?.errors as any[] | undefined;
      if (errors == null || !errors.length) {
        return;
      }
      // Hasura flags every JWT rejection with `extensions.code: invalid-jwt`, while the
      // message varies (JWTExpired, JWSInvalidSignature, ...). Matching the code as well
      // as the configured message catches all of them, and looks at every error in the
      // array instead of the first one only.
      const configuredJwtError = this._dataConfig.value.syncOptions.authErrorMessage;
      const isJwtError =
        hasJwtAuthError({errors}) ||
        (configuredJwtError != null &&
          errors.some(
            err => typeof err?.message === 'string' && err.message.includes(configuredJwtError),
          ));
      if (isJwtError) {
        if (isDevMode()) {
          console.log(errors.map(err => err?.message).join(' | '));
        }
        this._refreshEvt.emit();
      } else if (
        error.code === 'RC_PUSH' &&
        errors[0]?.extensions?.code &&
        String(errors[0].extensions.code).indexOf('constraint-violation') >= 0
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

      stateReceivedSub = state.received$
        .pipe(throttleTime(500, undefined, {leading: true, trailing: true}))
        .subscribe(_data => {
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
    this._reportCollectionSyncStarted(collection.name, state);
    this._activeSyncs.next(actSyncs);

    if (!isLive) {
      this.runSync(collection.name);
    }
  }

  /**
   * Creates a collection's replication again, for one rxdb has stopped.
   * @param collectionName The collection whose replication must be rebuilt.
   */
  private _rebuildCollectionSync(collectionName: string): void {
    // A rebuilt non-live replication asks for a cycle of its own: the guard keeps
    // the two from calling each other.
    if (this._rebuildingSyncs.has(collectionName)) {
      return;
    }
    const registered = this._registeredCollections.value.find(
      reg => reg.collection.name === collectionName,
    );
    const token = this._authService.getAuthToken();
    if (registered == null || token == null) {
      return;
    }
    if (isDevMode()) {
      console.log(`Rebuilding the sync for ${collectionName}`);
    }
    const {collection, ...params} = registered;
    this._rebuildingSyncs.add(collectionName);
    try {
      this._setupCollectionSync(collection, params, token);
    } finally {
      this._rebuildingSyncs.delete(collectionName);
    }
  }

  /**
   * Hands a renewed auth token to an already running collection sync, without
   * restarting the replication.
   * In live mode the graphql subscription is recreated, because it is bound to
   * the websocket client that was opened with the previous token; the
   * replication state, and therefore its checkpoint, is left untouched.
   * @param collection The collection whose sync must use the new token.
   * @param token The current JWT authorization token.
   * @param wsClientRenewed True if the websocket client has just been replaced.
   */
  protected _updateCollectionSyncToken(
    collection: RxCollection,
    token: string,
    wsClientRenewed: boolean,
  ): void {
    const actSyncs = this._activeSyncs.getValue();
    const activeSync = actSyncs[collection.name];
    if (activeSync == null) {
      return;
    }
    activeSync.state.setHeaders({Authorization: `Bearer ${token}`});
    if (isDevMode() && !activeSync.state.isStopped()) {
      console.log(`${collection.name}: sync token renewed without restarting the replication`);
    }
    if (!wsClientRenewed) {
      // No live subscription: the sync runs only when asked, so a renewal ends
      // here. Kicking a run on every token change would mean a replication cycle
      // every eleven minutes, which is what `live: false` is configured not to do.
      return;
    }
    activeSync.clientRequestSub.unsubscribe();
    const query = subscriptionQueryBuilder(collection);
    activeSync.clientRequestSub = newClientSubscription(this._wsClient, {query}).subscribe({
      next: () => {
        this.runSync(collection.name);
      },
      error: err => console.log('clientRequestSub err: ', err),
    });
    this._activeSyncs.next(actSyncs);
  }

  /**
   * Stop an active collection sync.
   * @param collection The collection for which the sync must be stopped.
   * @returns A promise resolving when the replication is actually cancelled.
   * Callers that only need the sync to stop can ignore it; the database teardown
   * has to await it before removing the storage.
   */
  private _stopCollectionSync(collectionName: string): Promise<void> {
    if (this._activeSyncs.getValue()[collectionName] == null) {
      return Promise.resolve();
    }
    const actSyncs = this._activeSyncs.getValue();
    const {state, clientRequestSub, stateReceivedSub} = actSyncs[collectionName];
    clientRequestSub.unsubscribe();
    stateReceivedSub.unsubscribe();
    const cancelled = state.cancel().then(
      () => undefined,
      () => undefined,
    );
    delete actSyncs[collectionName];
    this._activeSyncs.next(actSyncs);
    return cancelled;
  }

  /**
   * Stops every active collection sync.
   * @returns A promise resolving when all the replications are cancelled.
   */
  private _stopAllCollectionSyncs(): Promise<void> {
    const stopped = Object.keys(this._activeSyncs.getValue()).map(collectionName =>
      this._stopCollectionSync(collectionName),
    );
    return Promise.all(stopped).then(() => undefined);
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
