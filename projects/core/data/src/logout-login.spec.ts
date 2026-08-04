import {EventEmitter} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {RxJsonSchema} from 'rxdb';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';
import {BehaviorSubject, Observable, firstValueFrom, of as obsOf} from 'rxjs';
import {take} from 'rxjs/operators';

import {DATA_SERVICE_CONFIG, DataService, DataServiceConfig} from './public_api';

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

  login(): void {
    this.authenticated.next({auth: true, evt: 'login'});
    this.authToken.next(`token_${this._tokenIdx++}`);
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
    const sub = dataService.firstReplicationComplete.subscribe(complete =>
      reported.push(complete),
    );
    dataService.collectionsInitialized.emit('completed');
    expect(reported).toEqual([false]);

    await firstValueFrom(authService.logout());
    sub.unsubscribe();

    // The main nav shows the full screen initialization spinner while this
    // reports false, so a logout must not leave it on false.
    expect(reported[reported.length - 1]).toBeTrue();
  });

  it(
    'removes the local database even when a replication cancellation never settles',
    async () => {
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
    },
    // Deliberately waits for the real cap on the cancellation wait.
    20000,
  );

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
