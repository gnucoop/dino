import {EventEmitter} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {RxJsonSchema} from 'rxdb';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';
import {BehaviorSubject, Observable, firstValueFrom, of as obsOf} from 'rxjs';
import {filter, take} from 'rxjs/operators';

import {DATA_SERVICE_CONFIG, DataService, DataServiceConfig, Model} from './public_api';

interface DummyModel extends Model {
  name: string;
}

const dummySchema: RxJsonSchema<any> = {
  title: 'dummy schema',
  version: 0,
  description: 'describe a dummy model',
  type: 'object',
  primaryKey: 'id',
  properties: {
    id: {type: 'string', maxLength: 200},
    name: {type: 'string'},
    created_at: {type: 'string'},
    updated_at: {type: ['string', 'null']},
  },
};

const collectionRequest = {name: 'dummy', collection: {schema: dummySchema}};

const authServiceConfig: AuthServiceConfig = {
  host: 'http://test-auth-backend',
  applicationId: 'applicationId',
  apiKey: 'apiKey',
  retryRefreshTime: 5000,
  retryAttemptsMax: 1,
  failedAuthRedirect: 'login',
};

/**
 * Reproduces the auth service emission sequence of a real login/logout, in the
 * same order as `storeAllAuthenticationInfo` and `logout`.
 */
class AuthServiceStub {
  readonly authenticated = new BehaviorSubject<any>({auth: false, evt: 'init'});
  readonly authToken = new BehaviorSubject<string | null>(null);
  readonly resetEvt = new EventEmitter<boolean>();
  readonly logoutEvt = new EventEmitter<boolean>();
  readonly tokenRefreshedEvt = new EventEmitter<void>();
  readonly authConfig = authServiceConfig;

  private _tokenIdx = 0;

  /** The logged in user. Changing it simulates a different person logging in. */
  userId = 'user_1';

  login(userId: string = this.userId): void {
    this.userId = userId;
    this.authenticated.next({auth: true, evt: 'login'});
    this.authToken.next(`token_${this._tokenIdx++}`);
  }

  /**
   * Ends the session the way the real service does: no `logoutEvt`, so nothing
   * destroys the local data.
   */
  endSession(): void {
    this.authenticated.next({auth: false, evt: 'expired'});
    this.authToken.next(null);
  }

  logout(): Observable<boolean> {
    this.authenticated.next({auth: false, evt: 'logout'});
    this.authToken.next(null);
    this.logoutEvt.emit(true);
    return obsOf(true);
  }

  refreshToken(): Observable<boolean> {
    return obsOf(true);
  }

  hasValidAuthToken(): boolean {
    return this.authToken.value != null;
  }

  /**
   * The data service reads the logged in user to tell whether the local database
   * belongs to somebody else.
   */
  getUserInfo(): {id: string; email: string} {
    return {id: this.userId, email: `${this.userId}@dino.test`};
  }

  getAuthToken(): string | null {
    return this.authToken.value;
  }
}

let testDbIdx = 0;

describe('Data service - logout followed by an immediate login', () => {
  let dataService: DataService;
  let authService: AuthServiceStub;

  beforeEach(() => {
    // No `ignoreDuplicate`: dinoapp does not set it either, so a second
    // createRxDatabase for a still-open name throws (rxdb DB8).
    const dataServiceConfig: DataServiceConfig = {
      databaseCreateOptions: {
        name: `dino_logout_login_test_db_${testDbIdx++}`,
        storage: getRxStorageMemory(),
      },
      syncOptions: {
        collection: collectionRequest,
        replicationIdentifier: 'test-replication',
        url: {http: 'http://dinoServer/v1/graphql'},
        backendless: true,
      },
    } as unknown as DataServiceConfig;
    authService = new AuthServiceStub();
    TestBed.configureTestingModule({
      providers: [
        DataService,
        {provide: AuthService, useValue: authService},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {provide: Router, useValue: {navigate: () => {}}},
      ],
    });
    dataService = TestBed.inject(DataService);
  });

  it('creates a working database again when the login happens while the teardown is still running', async () => {
    authService.login();
    await expectAsync(
      firstValueFrom(dataService.createCollection(collectionRequest).pipe(take(1))),
    ).toBeResolvedTo(true);

    // Logout, then log back in without waiting for destroyAllCollections().
    await firstValueFrom(authService.logout());
    authService.login();

    await expectAsync(
      firstValueFrom(dataService.createCollection(collectionRequest).pipe(take(1))),
    ).toBeResolvedTo(true);
    await expectAsync(
      firstValueFrom(dataService.find({collectionName: collectionRequest.name}).pipe(take(1))),
    ).toBeResolvedTo([]);
  });

  it('does not report a pending initialization once the session is torn down', async () => {
    authService.login();
    await firstValueFrom(dataService.createCollection(collectionRequest).pipe(take(1)));

    const reported: boolean[] = [];
    const sub = dataService.firstReplicationComplete.subscribe(complete => reported.push(complete));
    dataService.collectionsInitialized.emit('completed');
    expect(reported).toEqual([false]);

    await firstValueFrom(authService.logout());
    sub.unsubscribe();

    // The main nav shows the full screen initialization spinner while this
    // reports false, so a logout must not leave it on false.
    expect(reported[reported.length - 1]).toBeTrue();
  });

  it('removes the local database even when a replication cancellation never settles', async () => {
    authService.login();
    await firstValueFrom(dataService.createCollection(collectionRequest).pipe(take(1)));

    // A replication whose cancel() never settles: rxdb awaits the checkpoint
    // queue and the meta instance in there, so a pending write or request is
    // enough to leave it unresolved.
    const activeSyncs = (dataService as any)._activeSyncs as BehaviorSubject<any>;
    activeSyncs.next({
      [collectionRequest.name]: {
        state: {cancel: () => new Promise<void>(() => {})},
        clientRequestSub: {unsubscribe: () => {}},
        stateReceivedSub: {unsubscribe: () => {}},
      },
    });
    const consoleWarn = spyOn(console, 'warn');

    // The removal is the only thing that clears the schema hashes stored in the
    // internal store, so it must not depend on the cancellation: a database
    // surviving the logout makes a schema conflict (rxdb DB6) permanent, with
    // neither a new login nor a reload able to recover it.
    await expectAsync(firstValueFrom(dataService.destroyAllCollections())).toBeResolvedTo([
      collectionRequest.name,
    ]);
    expect(consoleWarn).toHaveBeenCalled();

    authService.login();
    await expectAsync(
      firstValueFrom(dataService.createCollection(collectionRequest).pipe(take(1))),
    ).toBeResolvedTo(true);
  }, 20000); // Deliberately waits for the real cap on the cancellation wait.

  it('tears the database down even when no collection was ever registered', async () => {
    authService.login();
    // Exporting is the cheapest way to have the database created without
    // registering any collection, as happens on a logout during the app
    // initialization.
    await firstValueFrom(dataService.exportDatabase());

    await expectAsync(firstValueFrom(dataService.destroyAllCollections())).toBeResolved();

    // The database name must be free again, otherwise no later login in this
    // page session can get a database at all.
    authService.login();
    await expectAsync(
      firstValueFrom(dataService.createCollection(collectionRequest).pipe(take(1))),
    ).toBeResolvedTo(true);
  });
});

// The data collected offline is only ever destroyed on purpose: by the user
// logging out, or by somebody else taking over the device. A session the app
// gave up on by itself keeps it, so that the next login can push it.
describe('Data service - session ended without a logout', () => {
  let dataService: DataService;
  let authService: AuthServiceStub;

  const dataServiceConfig = (): DataServiceConfig =>
    ({
      databaseCreateOptions: {
        name: `dino_end_session_test_db_${testDbIdx++}`,
        storage: getRxStorageMemory(),
      },
      syncOptions: {
        collection: collectionRequest,
        replicationIdentifier: 'test-replication',
        url: {http: 'http://dinoServer/v1/graphql'},
        backendless: true,
      },
    } as unknown as DataServiceConfig);

  /** The id is generated by the service, so the name is what identifies a doc. */
  const insertDoc = (name: string): Promise<any> =>
    firstValueFrom(
      dataService
        .insert<DummyModel>({
          collectionName: collectionRequest.name,
          object: {name, created_at: new Date().toISOString()},
        })
        .pipe(take(1)),
    );

  const storedNames = async (): Promise<string[]> => {
    const docs = await firstValueFrom(
      dataService.find({collectionName: collectionRequest.name}).pipe(take(1)),
    );
    return (docs ?? []).map((doc: any) => doc.name);
  };

  beforeEach(() => {
    authService = new AuthServiceStub();
    TestBed.configureTestingModule({
      providers: [
        DataService,
        {provide: AuthService, useValue: authService},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {provide: Router, useValue: {navigate: () => {}}},
      ],
    });
    dataService = TestBed.inject(DataService);
  });

  /**
   * Reproduces what the sync does when it gives up on renewing the token: the
   * data service asks the auth service to end the session, and nothing else.
   */
  const endSessionFromSync = (): void => (dataService as any)._endSessionEvt.emit();

  /** Resolves once the collection is registered against the database in use. */
  const awaitRegistered = (name: string): Promise<unknown> =>
    firstValueFrom(
      ((dataService as any)._registeredCollections as BehaviorSubject<any[]>).pipe(
        filter(colls => colls.some(coll => coll.collection.name === name)),
        take(1),
      ),
    );

  /**
   * Resolves once a database other than `previousToken` is open: a login creates
   * one asynchronously, and until it is there the collections still answer from
   * the previous one.
   */
  const awaitNewDatabase = (previousToken: string | null): Promise<string | null> =>
    firstValueFrom(
      dataService.dbToken.pipe(
        filter(token => token != null && token !== previousToken),
        take(1),
      ),
    );

  it('keeps the collected data, and pushes it after the next login', async () => {
    authService.login('user_1');
    await firstValueFrom(dataService.createCollection(collectionRequest).pipe(take(1)));
    await insertDoc('collected_offline');

    const previousDb = dataService.dbToken.value;
    endSessionFromSync();

    // Same user back in: the data is still there and the replications resume
    // from their stored checkpoint, which is what pushes the backlog.
    authService.login('user_1');
    await awaitNewDatabase(previousDb);
    await expectAsync(
      firstValueFrom(dataService.createCollection(collectionRequest).pipe(take(1))),
    ).toBeResolvedTo(true);
    await expectAsync(storedNames()).toBeResolvedTo(['collected_offline']);
  });

  it('re-registers the collections after a session end, with no new createCollection call', async () => {
    authService.login('user_1');
    // Subscribed once and kept, the way the data model managers do it.
    const registration = dataService.createCollection(collectionRequest).subscribe();
    await awaitRegistered(collectionRequest.name);
    const previousDb = dataService.dbToken.value;

    endSessionFromSync();
    authService.login('user_1');
    await awaitNewDatabase(previousDb);
    await awaitRegistered(collectionRequest.name);

    // Writing is the proof: it needs the collection registered on the database
    // this session is using. The registration stream used to be cut by the end
    // of the session, and the collection was then absent until a page reload.
    await expectAsync(insertDoc('after_relogin')).toBeResolved();
    registration.unsubscribe();
  });

  it('records the owner of the local data, and forgets it when the data goes', async () => {
    authService.login('user_1');
    await firstValueFrom(dataService.createCollection(collectionRequest).pipe(take(1)));

    // The login page reads this to warn that another account would wipe the
    // device, so it has to outlive a session the app gave up on.
    expect(dataService.localDataOwner?.id).toBe('user_1');
    // The label is what the login page shows, and it must be there without a
    // session to ask: `resetAuth()` runs before that page renders.
    expect(dataService.localDataOwner?.label).toBe('user_1@dino.test');
    endSessionFromSync();
    expect(dataService.localDataOwner?.id).toBe('user_1');

    await firstValueFrom(dataService.destroyAllCollections());
    expect(dataService.localDataOwner).toBeNull();
  });

  it('registers the collections on the database of the new session, not the old one', async () => {
    authService.login('user_1');
    await firstValueFrom(dataService.createCollection(collectionRequest).pipe(take(1)));
    await insertDoc('collected_offline');

    const previousDb = dataService.dbToken.value;
    endSessionFromSync();
    authService.login('user_1');

    // Asked right after the login, while the new database is still being created.
    // The app registers exactly like this - with a `take(1)`, see
    // SyncManager.initializeMainCollections - so the registration unsubscribes as
    // soon as it reports success. It used to find the previous token still
    // current, register against the database being left and report itself done:
    // nothing was then registered on the database in use, and the first query
    // threw `Cannot read properties of undefined`.
    const registration = firstValueFrom(
      dataService.createCollection(collectionRequest).pipe(take(1)),
    );

    await awaitNewDatabase(previousDb);
    await expectAsync(registration).toBeResolvedTo(true);
    await expectAsync(storedNames()).toBeResolvedTo(['collected_offline']);

    // And the registered collection is the one of the database in use. A
    // re-registration is dropped as a duplicate by name, so a stale entry
    // survives as the handle of a closed database - which is what the sync then
    // replicates, never reaching in-sync, spinner turning forever.
    const db: any = await firstValueFrom((dataService as any)._db.pipe(take(1)));
    const registered = ((dataService as any)._registeredCollections.value as any[]).find(
      coll => coll.collection.name === collectionRequest.name,
    );
    expect(registered?.collection).toBe(db.collections[collectionRequest.name]);
  });

  it('removes the data when a different user logs in', async () => {
    authService.login('user_1');
    await firstValueFrom(dataService.createCollection(collectionRequest).pipe(take(1)));
    await insertDoc('data_of_user_1');
    await expectAsync(storedNames()).toBeResolvedTo(['data_of_user_1']);

    const previousDb = dataService.dbToken.value;
    endSessionFromSync();
    // Somebody else takes over the device: inheriting the previous user's data
    // would be a privacy leak, so it goes.
    authService.login('user_2');
    await awaitNewDatabase(previousDb);

    await expectAsync(
      firstValueFrom(dataService.createCollection(collectionRequest).pipe(take(1))),
    ).toBeResolvedTo(true);
    await expectAsync(storedNames()).toBeResolvedTo([]);
  });
});
