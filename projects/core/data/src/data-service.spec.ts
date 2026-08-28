import {EventEmitter} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {Server, WebSocket} from 'mock-socket';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';
import {RxJsonSchema} from 'rxdb';
import {firstValueFrom, of as obsOf, Subject} from 'rxjs';
import {take} from 'rxjs/operators';

import {
  BACKUP_DATA_COLLECTIONS,
  DATA_SERVICE_CONFIG,
  DataService,
  DataServiceConfig,
  Model,
} from './public_api';

interface DummyModel extends Model {
  name: string;
}

let testDbIdx = 0;

const serverUrl = 'http://dinoServer/v1/graphql';
const wsServerUrl = 'ws://dinoServer';
const wsUrl = `${wsServerUrl}/v1/graphql`;

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

const collectionName = 'dummy';
const collection = {name: collectionName, collection: {schema: dummySchema}};

const dataServiceConfig: DataServiceConfig = {
  databaseCreateOptions: {
    name: `dino_data_test_db_${testDbIdx++}`,
    storage: getRxStorageMemory(),
    ignoreDuplicate: true,
  },
  syncOptions: {
    collection,
    replicationIdentifier: 'test-replication',
    url: {http: serverUrl, ws: wsUrl},
    webSocketImpl: WebSocket,
    authErrorMessage: 'Could not verify JWT: JWTExpired',
  },
};

const authServiceConfig: AuthServiceConfig = {
  host: 'http://test-auth-backend',
  applicationId: 'applicationId',
  apiKey: 'apiKey',
  retryRefreshTime: 5000,
  retryAttemptsMax: 1,
  failedAuthRedirect: 'login',
};

const authServiceMock = {
  authenticated: obsOf({auth: true, evt: 'init'}),
  authConfig: authServiceConfig,
  authToken: obsOf('test_auth_token'),
  resetEvt: obsOf(true),
  logout: () => obsOf(false),
  logoutEvt: new EventEmitter<void>(),
  // Read by the data service to tell whether the local database belongs to
  // somebody else; always the same user in these suites.
  getUserInfo: () => ({id: 'test_user'}),
} as unknown as AuthService;

describe('Data service', () => {
  let dataService: DataService;
  let wsServer: Server;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        RouterTestingModule,
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {provide: Router, useValue: {}},
      ],
    });
    dataService = TestBed.inject(DataService);
    wsServer = new Server(wsUrl);
  });

  afterEach(() => {
    wsServer.close();
  });

  it('should create and destroy a collection from a valid schema', async () => {
    const collection = {name: 'dummy', collection: {schema: dummySchema}};
    const created = dataService.createCollection(collection).pipe(take(1)).toPromise();
    await expectAsync(created).toBeResolvedTo(true);
    const deleted = dataService.destroyCollection(collection.name).pipe(take(1)).toPromise();
    await expectAsync(deleted).toBeResolvedTo(true);
  });

  it('should throw an exception when trying to destroy an unexisting collection', async () => {
    await expectAsync(
      firstValueFrom(dataService.destroyCollection('collection').pipe(take(1))),
    ).toBeRejectedWithError();
  });

  it('should report a collection that could not be created', async () => {
    const consoleError = spyOn(console, 'error');
    // A primary key that no property declares: rxdb rejects the collection.
    const broken = {
      name: 'broken',
      collection: {schema: {...dummySchema, primaryKey: 'not_a_property'}},
    };

    await expectAsync(
      firstValueFrom(dataService.createCollection(broken).pipe(take(1))),
    ).toBeResolvedTo(false);

    // The failure used to be silent outside dev mode, leaving a collection
    // that never syncs with nothing to diagnose it by.
    expect(consoleError).toHaveBeenCalled();
    expect(dataService.problemSyncing.getValue()).toContain('broken');
  });
});

describe('Data service - CRUD methods', () => {
  let dataService: DataService;
  let currentDate: string;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        RouterTestingModule,
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {provide: Router, useValue: {}},
      ],
    });
    dataService = TestBed.inject(DataService);
    currentDate = new Date().toISOString().split('T')[0];
    await firstValueFrom(dataService.createCollection(collection).pipe(take(1)));
  });

  afterEach(async () => {
    await firstValueFrom(dataService.destroyCollection(collection.name).pipe(take(1)));
  });

  it('should insert a new object in the database', async () => {
    const object = {name: 'dummy', created_at: currentDate};
    const insParams = {collectionName, object};
    const inserted = await firstValueFrom(dataService.insert<DummyModel>(insParams).pipe(take(1)));
    expect(inserted).not.toBeNull();
    expect(inserted!.name).toBe('dummy');
  });

  it('should get an existing object from the database', async () => {
    const object = {name: 'dummy', created_at: currentDate};
    const insParams = {collectionName, object};
    const inserted = await firstValueFrom(dataService.insert<DummyModel>(insParams).pipe(take(1)));
    const getParams = {collectionName, id: inserted!.id};
    const getObject = await firstValueFrom(dataService.get<DummyModel>(getParams).pipe(take(1)));
    expect(getObject).not.toBeNull();
    expect(getObject!._data.name).toEqual(inserted!._data.name);
    expect({name: getObject!._data.name}).toEqual(jasmine.objectContaining({name: object.name}));
  });

  it('should create a new object when upserting an unexisting object', async () => {
    const object = {name: 'foo', created_at: currentDate};
    const insParams = {collectionName, object};
    const inserted = await firstValueFrom(dataService.upsert<DummyModel>(insParams).pipe(take(1)));
    const getParams = {collectionName, id: inserted!.id};
    const getObject = await firstValueFrom(dataService.get<DummyModel>(getParams).pipe(take(1)));
    expect(getObject).not.toBeNull();
    expect(getObject!._data.name).toEqual(inserted!._data.name);
    expect(getObject!._data).toEqual(jasmine.objectContaining(object));
  });

  it('should overwrite the old object when upserting an existing object', async () => {
    const object1 = {name: 'dummy', created_at: currentDate};
    let insParams = {collectionName, object: object1};
    const inserted = await firstValueFrom(dataService.insert<DummyModel>(insParams).pipe(take(1)));
    const object2 = {id: inserted!.id, name: 'foo', created_at: currentDate};
    insParams.object = object2;
    const updated = await firstValueFrom(dataService.upsert<DummyModel>(insParams).pipe(take(1)));
    const getParams = {collectionName, id: inserted!.id};
    const getObject = await firstValueFrom(dataService.get<DummyModel>(getParams).pipe(take(1)));
    expect(getObject).not.toBeNull();
    expect(getObject!._data).toEqual(updated!._data);
    expect(getObject!._data).toEqual(jasmine.objectContaining(object2));
  });

  it('should bulk insert new objects in the database', async () => {
    const objects = [
      {name: 'foo', created_at: currentDate},
      {name: 'bar', created_at: currentDate},
    ];
    const insParams = {collectionName, objects};
    const result = await firstValueFrom(
      dataService.bulkInsert<DummyModel>(insParams).pipe(take(1)),
    );
    expect(result).not.toBeNull();
    expect(result.success).not.toBeNull();
    expect(result.success.length).toEqual(objects.length);
    for (const idx in objects) {
      expect(objects[idx].name).toEqual(result.success[idx].name);
    }
  });

  it('should create a multiple docs query', async () => {
    const findParams = {collectionName};
    const result = await firstValueFrom(dataService.find<DummyModel>(findParams).pipe(take(1)));
    expect(result).not.toBeNull();
  });
});

describe('Data service - backup/restore', () => {
  let dataService: DataService;
  let currentDate: string;

  // A whitelisted "data" collection that carries the owner field.
  const formDataTestSchema: RxJsonSchema<any> = {
    title: 'form data test schema',
    version: 0,
    description: 'minimal form_data schema for backup/restore tests',
    type: 'object',
    primaryKey: 'id',
    properties: {
      id: {type: 'string', maxLength: 200},
      user_data_ref_id: {type: 'string', maxLength: 200},
      created_at: {type: 'string'},
      updated_at: {type: ['string', 'null']},
    },
  };
  // A user/config collection that must be excluded from backups.
  const userDataTestSchema: RxJsonSchema<any> = {
    title: 'user data test schema',
    version: 0,
    description: 'minimal user_data schema for backup/restore tests',
    type: 'object',
    primaryKey: 'id',
    properties: {
      id: {type: 'string', maxLength: 200},
      name: {type: 'string'},
    },
  };

  const formDataColl = {name: 'form_data', collection: {schema: formDataTestSchema}};
  const userDataColl = {name: 'user_data', collection: {schema: userDataTestSchema}};

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        RouterTestingModule,
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {provide: Router, useValue: {}},
      ],
    });
    dataService = TestBed.inject(DataService);
    currentDate = new Date().toISOString().split('T')[0];
    await firstValueFrom(dataService.createCollection(formDataColl).pipe(take(1)));
    await firstValueFrom(dataService.createCollection(userDataColl).pipe(take(1)));
  });

  afterEach(async () => {
    await firstValueFrom(dataService.destroyCollection('form_data').pipe(take(1)));
    await firstValueFrom(dataService.destroyCollection('user_data').pipe(take(1)));
  });

  it('should export only whitelisted data collections', async () => {
    await firstValueFrom(
      dataService
        .insert<any>({
          collectionName: 'form_data',
          object: {user_data_ref_id: 'other-user', created_at: currentDate},
        })
        .pipe(take(1)),
    );
    await firstValueFrom(
      dataService
        .insert<any>({collectionName: 'user_data', object: {name: 'someone'}})
        .pipe(take(1)),
    );

    const blob = await firstValueFrom(dataService.exportDatabase().pipe(take(1)));
    const dump = JSON.parse(await blob.text());
    const names: string[] = dump.collections.map((c: {name: string}) => c.name);

    expect(names).toContain('form_data');
    expect(names).not.toContain('user_data');
    // Every exported collection must belong to the whitelist.
    names.forEach(name => expect(BACKUP_DATA_COLLECTIONS).toContain(name));
  });

  it('should reassign user_data_ref_id to the importing user on restore', async () => {
    const dump = {
      collections: [
        {
          name: 'form_data',
          schemaHash: 'ignored',
          docs: [
            {id: 'd1', user_data_ref_id: 'other-user', created_at: currentDate, updated_at: null},
            {id: 'd2', user_data_ref_id: '', created_at: currentDate, updated_at: null},
          ],
        },
      ],
    };
    const blob = new Blob([JSON.stringify(dump)], {type: 'application/json'});

    const imported = firstValueFrom(dataService.dbImportedEvent.pipe(take(1)));
    dataService.importDatabase(blob, 'importer-id');
    expect(await imported).toBe(true);

    const d1 = await firstValueFrom(
      dataService.get<any>({collectionName: 'form_data', id: 'd1'}).pipe(take(1)),
    );
    const d2 = await firstValueFrom(
      dataService.get<any>({collectionName: 'form_data', id: 'd2'}).pipe(take(1)),
    );
    expect(d1!._data.user_data_ref_id).toBe('importer-id');
    expect(d2!._data.user_data_ref_id).toBe('importer-id');
  });

  it('should keep the original user_data_ref_id when no owner id is given', async () => {
    const dump = {
      collections: [
        {
          name: 'form_data',
          schemaHash: 'ignored',
          docs: [
            {id: 'd3', user_data_ref_id: 'keep-me', created_at: currentDate, updated_at: null},
          ],
        },
      ],
    };
    const blob = new Blob([JSON.stringify(dump)], {type: 'application/json'});

    const imported = firstValueFrom(dataService.dbImportedEvent.pipe(take(1)));
    dataService.importDatabase(blob);
    expect(await imported).toBe(true);

    const d3 = await firstValueFrom(
      dataService.get<any>({collectionName: 'form_data', id: 'd3'}).pipe(take(1)),
    );
    expect(d3!._data.user_data_ref_id).toBe('keep-me');
  });

  it('should skip restoring collections not in the backup whitelist, even if registered locally', async () => {
    const dump = {
      collections: [
        {
          name: 'form_data',
          schemaHash: 'ignored',
          docs: [
            {id: 'd4', user_data_ref_id: 'someone', created_at: currentDate, updated_at: null},
          ],
        },
        {
          // "user_data" is registered locally (see beforeEach) but is not a
          // BACKUP_DATA_COLLECTIONS entry, and must never be restored: it is
          // managed by the backend and kept in sync via push replication.
          name: 'user_data',
          schemaHash: 'ignored',
          docs: [{id: 'foreign-user', name: 'attacker-controlled'}],
        },
      ],
    };
    const blob = new Blob([JSON.stringify(dump)], {type: 'application/json'});

    const imported = firstValueFrom(dataService.dbImportedEvent.pipe(take(1)));
    dataService.importDatabase(blob);
    expect(await imported).toBe(true);

    const d4 = await firstValueFrom(
      dataService.get<any>({collectionName: 'form_data', id: 'd4'}).pipe(take(1)),
    );
    const foreignUser = await firstValueFrom(
      dataService.get<any>({collectionName: 'user_data', id: 'foreign-user'}).pipe(take(1)),
    );
    expect(d4).not.toBeNull();
    expect(foreignUser).toBeNull();
  });
});

// A dedicated database name so this suite is fully isolated from the other
// describe blocks: they share the in-memory storage instance and some register a
// "form_data" collection with a different schema, which would otherwise collide.
const orderingDataServiceConfig: DataServiceConfig = {
  ...dataServiceConfig,
  databaseCreateOptions: {
    ...dataServiceConfig.databaseCreateOptions,
    name: 'dino_data_test_db_ordering',
  },
};

describe('Data service - restore ordering with active sync', () => {
  let dataService: DataService;
  let currentDate: string;

  // A referenced (prerequisite) collection: it is NOT an owned data collection,
  // so on restore it is written before form_data / report_data.
  const formSchemaTestSchema: RxJsonSchema<any> = {
    title: 'form schema test schema',
    version: 0,
    description: 'minimal form_schema schema for restore ordering tests',
    type: 'object',
    primaryKey: 'id',
    properties: {
      id: {type: 'string', maxLength: 200},
      created_at: {type: 'string'},
      updated_at: {type: ['string', 'null']},
    },
  };
  // An owned data collection: on restore it is written last.
  const formDataTestSchema: RxJsonSchema<any> = {
    title: 'form data test schema',
    version: 0,
    description: 'minimal form_data schema for restore ordering tests',
    type: 'object',
    primaryKey: 'id',
    properties: {
      id: {type: 'string', maxLength: 200},
      user_data_ref_id: {type: 'string', maxLength: 200},
      created_at: {type: 'string'},
      updated_at: {type: ['string', 'null']},
    },
  };

  const formSchemaColl = {name: 'form_schema', collection: {schema: formSchemaTestSchema}};
  const formDataColl = {name: 'form_data', collection: {schema: formDataTestSchema}};

  // A dump that deliberately lists the owned data collection (form_data) BEFORE its
  // referenced collection (form_schema), to prove the restore order does not depend
  // on the order the collections appear in the dump file.
  const outOfOrderDump = () => ({
    collections: [
      {
        name: 'form_data',
        schemaHash: 'ignored',
        docs: [{id: 'f1', user_data_ref_id: 'x', created_at: currentDate, updated_at: null}],
      },
      {
        name: 'form_schema',
        schemaHash: 'ignored',
        docs: [{id: 's1', created_at: currentDate, updated_at: null}],
      },
    ],
  });

  const dumpBlob = () => new Blob([JSON.stringify(outOfOrderDump())], {type: 'application/json'});

  // Spies each collection's bulkUpsert so that its call order (across collections)
  // can be observed, while still performing the real upsert.
  const recordBulkUpsertOrder = async (order: string[], prefix = ''): Promise<void> => {
    const db: any = await firstValueFrom((dataService as any)._db.pipe(take(1)));
    ['form_schema', 'form_data'].forEach(name => {
      const coll = db.collections[name];
      const original = coll.bulkUpsert.bind(coll);
      spyOn(coll, 'bulkUpsert').and.callFake((docs: any) => {
        order.push(`${prefix}${name}`);
        return original(docs);
      });
    });
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        RouterTestingModule,
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: orderingDataServiceConfig},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {provide: Router, useValue: {}},
      ],
    });
    dataService = TestBed.inject(DataService);
    currentDate = new Date().toISOString().split('T')[0];
    await firstValueFrom(dataService.createCollection(formSchemaColl).pipe(take(1)));
    await firstValueFrom(dataService.createCollection(formDataColl).pipe(take(1)));
  });

  afterEach(async () => {
    await firstValueFrom(dataService.destroyCollection('form_schema').pipe(take(1)));
    await firstValueFrom(dataService.destroyCollection('form_data').pipe(take(1)));
  });

  it('restores referenced collections before owned data ones, regardless of dump order', async () => {
    const order: string[] = [];
    await recordBulkUpsertOrder(order);
    // Neutralize the in-sync wait so this test focuses purely on write ordering.
    spyOn(dataService as any, '_awaitCollectionsInSync').and.returnValue(Promise.resolve());

    const imported = firstValueFrom(dataService.dbImportedEvent.pipe(take(1)));
    dataService.importDatabase(dumpBlob());
    expect(await imported).toBe(true);

    // Even though form_data comes first in the dump, form_schema is written first.
    expect(order).toEqual(['form_schema', 'form_data']);
  });

  it('waits for referenced collections to be in sync before writing owned data when a sync is active', async () => {
    const order: string[] = [];
    await recordBulkUpsertOrder(order, 'write:');

    // Force the "online" signal so the gating branch is deterministic.
    spyOnProperty((dataService as any)._nss, 'isOnline$', 'get').and.returnValue(obsOf(true));

    // Simulate an active sync for the prerequisite collection so the gating runs.
    const activeSyncs = (dataService as any)._activeSyncs;
    const current = activeSyncs.getValue();
    current['form_schema'] = {
      // `cancel` is needed as much as the rest: the debounced collection change
      // of `_initSync` can fire after the test and stop the leftover syncs.
      state: {cancel: () => Promise.resolve()},
      clientRequestSub: {unsubscribe: () => {}},
      stateReceivedSub: {unsubscribe: () => {}},
      stateActivity: obsOf(false),
      collectionName: 'form_schema',
    };
    activeSyncs.next(current);

    const awaitSpy = spyOn(dataService as any, '_awaitCollectionsInSync').and.callFake(
      (names: string[]) => {
        order.push(`await:${names.join(',')}`);
        return Promise.resolve();
      },
    );

    const imported = firstValueFrom(dataService.dbImportedEvent.pipe(take(1)));
    dataService.importDatabase(dumpBlob());
    expect(await imported).toBe(true);

    // The referenced collection is pushed, then we wait for it to be in sync, then
    // the owned data is written.
    expect(order).toEqual(['write:form_schema', 'await:form_schema', 'write:form_data']);
    expect(awaitSpy).toHaveBeenCalledWith(['form_schema'], jasmine.any(Number));
  });

  it('does not wait for in-sync when no sync is active (backendless/offline)', async () => {
    const order: string[] = [];
    await recordBulkUpsertOrder(order, 'write:');
    // No active sync is registered for the prerequisite.
    (dataService as any)._activeSyncs.next({});
    const awaitSpy = spyOn(dataService as any, '_awaitCollectionsInSync').and.returnValue(
      Promise.resolve(),
    );

    const imported = firstValueFrom(dataService.dbImportedEvent.pipe(take(1)));
    dataService.importDatabase(dumpBlob());
    expect(await imported).toBe(true);

    // Order is still enforced, but the in-sync wait is skipped entirely.
    expect(order).toEqual(['write:form_schema', 'write:form_data']);
    expect(awaitSpy).not.toHaveBeenCalled();
  });

  it('_awaitCollectionsInSync resolves after the safety cap when a prerequisite never reaches in-sync', async () => {
    // An active sync whose awaitInSync() never resolves.
    (dataService as any)._activeSyncs.next({
      form_schema: {
        state: {awaitInSync: () => new Promise<void>(() => {}), cancel: () => Promise.resolve()},
        clientRequestSub: {unsubscribe: () => {}},
        stateReceivedSub: {unsubscribe: () => {}},
        stateActivity: obsOf(false),
        collectionName: 'form_schema',
      },
    });

    const start = new Date().getTime();
    // A short cap keeps the test fast; it must resolve despite the never-resolving wait.
    await (dataService as any)._awaitCollectionsInSync(['form_schema'], 50);
    const elapsed = new Date().getTime() - start;

    expect(elapsed).toBeGreaterThanOrEqual(45);
    expect(elapsed).toBeLessThan(2000);
  });
});

// A refresh failure before a full sync is not proof of a dead session: the auth
// service reports the same negative result for a revoked refresh token and for
// any transient failure. Since the logout wipes the local database along with
// the data not yet pushed, the session must survive a few of them.
describe('Data service - pre-sync token refresh failures', () => {
  const refreshFailuresDataServiceConfig: DataServiceConfig = {
    ...dataServiceConfig,
    databaseCreateOptions: {
      ...dataServiceConfig.databaseCreateOptions,
      name: 'dino_data_test_db_refresh_failures',
    },
    // No replication is needed here: the active sync is faked below.
    syncOptions: {...dataServiceConfig.syncOptions, backendless: true},
  };

  let dataService: DataService;
  let refreshOutcome: boolean;
  let logoutSpy: jasmine.Spy;
  let endSessionSpy: jasmine.Spy;
  let navigateSpy: jasmine.Spy;

  beforeEach(() => {
    refreshOutcome = false;
    logoutSpy = jasmine.createSpy('logout').and.returnValue(obsOf(true));
    endSessionSpy = jasmine.createSpy('endSession');
    navigateSpy = jasmine.createSpy('navigate');
    const authMock = {
      authenticated: obsOf({auth: true, evt: 'init'}),
      authConfig: authServiceConfig,
      authToken: obsOf('test_auth_token'),
      resetEvt: obsOf(false),
      logoutEvt: new EventEmitter<void>(),
      logout: logoutSpy,
      endSession: endSessionSpy,
      getUserInfo: () => ({id: 'test_user'}),
      refreshToken: () => obsOf(refreshOutcome),
    } as unknown as AuthService;

    TestBed.configureTestingModule({
      providers: [
        DataService,
        {provide: AuthService, useValue: authMock},
        {provide: DATA_SERVICE_CONFIG, useValue: refreshFailuresDataServiceConfig},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {provide: Router, useValue: {navigate: navigateSpy}},
      ],
    });
    dataService = TestBed.inject(DataService);

    spyOnProperty((dataService as any)._nss, 'isOnline$', 'get').and.returnValue(obsOf(true));
    // An active sync whose state activity emits right away, so that `isSyncing`
    // - and therefore the runSync subscription - fires synchronously.
    (dataService as any)._activeSyncs.next({
      dummy: {
        // `awaitInSync` never resolves on purpose: the replication cycle
        // completion is irrelevant here and would only fire a timer after the
        // test has ended.
        state: {
          reSync: () => {},
          awaitInSync: () => new Promise<void>(() => {}),
          cancel: () => Promise.resolve(),
        },
        clientRequestSub: {unsubscribe: () => {}},
        stateReceivedSub: {unsubscribe: () => {}},
        stateActivity: obsOf(true),
        collectionName: 'dummy',
      },
    });
  });

  it('skips the sync cycle instead of ending the session on the first failures', () => {
    dataService.runSync();
    dataService.runSync();

    expect(endSessionSpy).not.toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('ends the session, without logging out, once the failures pile up', () => {
    dataService.runSync();
    dataService.runSync();
    dataService.runSync();

    expect(endSessionSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith([authServiceConfig.failedAuthRedirect, 'sync_error']);
    // A logout is what destroys the local database, and the data collected
    // offline has not been pushed yet.
    expect(logoutSpy).not.toHaveBeenCalled();
  });

  it('reports on the sync badge that the token could not be renewed', () => {
    dataService.runSync();

    // The badge is the only signal the user in the field gets: the report that
    // goes with it ends up in Sentry, which nobody out there reads.
    expect(dataService.problemSyncing.value).toContain('authentication');

    refreshOutcome = true;
    dataService.runSync();

    expect(dataService.problemSyncing.value).not.toContain('authentication');
  });

  it('stops the replications once the renewals keep failing, without touching the session', () => {
    // The sync cannot succeed without a token, and rxdb retries every 5s for as
    // long as the app is open: battery and data spent on a device in the field
    // for nothing.
    for (let round = 0; round < 3; round++) {
      (dataService as any)._reportTokenRenewal(false);
    }

    expect(Object.keys((dataService as any)._activeSyncs.value)).toEqual([]);
    expect(dataService.problemSyncing.value).toContain('authentication');
    // The session is the user's to end, and the data stays where it is.
    expect(endSessionSpy).not.toHaveBeenCalled();
    expect(logoutSpy).not.toHaveBeenCalled();
  });

  it('reports the spinner off while the sync is blocked on renewing the token', async () => {
    (dataService as any)._reportTokenRenewal(false);

    // It used to keep turning, saying "working on it" next to a badge saying the
    // opposite.
    await expectAsync(firstValueFrom(dataService.isSyncing.pipe(take(1)))).toBeResolvedTo(false);
  });

  it('reports the spinner off when nothing is replicating', async () => {
    (dataService as any)._activeSyncs.next({});

    // `combineLatest([])` completes without emitting, so whoever rendered this
    // kept the last value it had ever seen - true, forever.
    await expectAsync(firstValueFrom(dataService.isSyncing.pipe(take(1)))).toBeResolvedTo(false);
  });

  it('gives the budget back after a refresh that went through', () => {
    dataService.runSync();
    dataService.runSync();

    refreshOutcome = true;
    dataService.runSync();
    expect((dataService as any)._failedSyncRefreshes).toBe(0);

    // Without the reset these two would exhaust the budget and end the session.
    refreshOutcome = false;
    dataService.runSync();
    dataService.runSync();

    expect(endSessionSpy).not.toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('does not touch the budget when a single collection is synced', () => {
    dataService.runSync();
    dataService.runSync();
    // A per collection cycle does not refresh the token: it must neither
    // consume nor reset the budget.
    dataService.runSync('dummy');

    expect((dataService as any)._failedSyncRefreshes).toBe(2);
    expect(endSessionSpy).not.toHaveBeenCalled();
  });
});

// A renewed token is handed to the running replication instead of tearing it
// down, so the full sync has to trigger the replication cycles itself: it used
// to get them for free from the teardown and recreation.
describe('Data service - full sync cycle', () => {
  const fullSyncDataServiceConfig: DataServiceConfig = {
    ...dataServiceConfig,
    databaseCreateOptions: {
      ...dataServiceConfig.databaseCreateOptions,
      name: 'dino_data_test_db_full_sync',
    },
    // No replication is needed here: the active syncs are faked below.
    syncOptions: {...dataServiceConfig.syncOptions, backendless: true},
  };

  let dataService: DataService;
  let reSyncSpies: {[collection: string]: jasmine.Spy};

  beforeEach(() => {
    const authMock = {
      authenticated: obsOf({auth: true, evt: 'init'}),
      authConfig: authServiceConfig,
      authToken: obsOf('test_auth_token'),
      resetEvt: obsOf(false),
      logoutEvt: new EventEmitter<void>(),
      logout: () => obsOf(true),
      getUserInfo: () => ({id: 'test_user'}),
      refreshToken: () => obsOf(true),
    } as unknown as AuthService;

    TestBed.configureTestingModule({
      providers: [
        DataService,
        {provide: AuthService, useValue: authMock},
        {provide: DATA_SERVICE_CONFIG, useValue: fullSyncDataServiceConfig},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {provide: Router, useValue: {navigate: () => {}}},
      ],
    });
    dataService = TestBed.inject(DataService);

    spyOnProperty((dataService as any)._nss, 'isOnline$', 'get').and.returnValue(obsOf(true));
    reSyncSpies = {};
    const activeSyncs: {[collection: string]: unknown} = {};
    ['form_schema', 'form_data'].forEach(name => {
      reSyncSpies[name] = jasmine.createSpy(`reSync:${name}`);
      activeSyncs[name] = {
        // `awaitInSync` never resolves on purpose: the cycle completion is
        // irrelevant here and would only fire a timer after the test has ended.
        state: {
          reSync: reSyncSpies[name],
          awaitInSync: () => new Promise<void>(() => {}),
          cancel: () => Promise.resolve(),
        },
        clientRequestSub: {unsubscribe: () => {}},
        stateReceivedSub: {unsubscribe: () => {}},
        stateActivity: obsOf(true),
        collectionName: name,
      };
    });
    (dataService as any)._activeSyncs.next(activeSyncs);
  });

  it('runs a replication cycle for every active sync', () => {
    dataService.runSync();

    expect(reSyncSpies['form_schema']).toHaveBeenCalledTimes(1);
    expect(reSyncSpies['form_data']).toHaveBeenCalledTimes(1);
  });

  it('runs a replication cycle for the given collection only', () => {
    dataService.runSync('form_data');

    expect(reSyncSpies['form_data']).toHaveBeenCalledTimes(1);
    expect(reSyncSpies['form_schema']).not.toHaveBeenCalled();
  });
});

// The refresh is single-flight: several sync requests in a row share one call.
// Counting its failure once per caller turned three taps on the sync button -
// which the app itself invites when there is unsynced data - into a logout, and
// a logout destroys the local database.
describe('Data service - single-flight pre-sync refresh', () => {
  const singleFlightDataServiceConfig: DataServiceConfig = {
    ...dataServiceConfig,
    databaseCreateOptions: {
      ...dataServiceConfig.databaseCreateOptions,
      name: 'dino_data_test_db_single_flight',
    },
    syncOptions: {...dataServiceConfig.syncOptions, backendless: true},
  };

  let dataService: DataService;
  let endSessionSpy: jasmine.Spy;
  let pending: Subject<boolean> | null;
  let refreshCalls: number;

  /** Resolves the shared refresh, as the auth service does for every joiner. */
  const settleRefresh = (result: boolean): void => {
    const subject = pending!;
    subject.next(result);
    subject.complete();
    pending = null;
  };

  beforeEach(() => {
    pending = null;
    refreshCalls = 0;
    endSessionSpy = jasmine.createSpy('endSession');
    const authMock = {
      authenticated: obsOf({auth: true, evt: 'init'}),
      authConfig: authServiceConfig,
      authToken: obsOf('test_auth_token'),
      resetEvt: obsOf(false),
      logoutEvt: new EventEmitter<void>(),
      logout: () => obsOf(true),
      endSession: endSessionSpy,
      getUserInfo: () => ({id: 'test_user'}),
      get isRefreshing(): boolean {
        return pending != null;
      },
      // Single-flight, like the real one: the call in flight is shared.
      refreshToken: () => {
        if (pending == null) {
          refreshCalls++;
          pending = new Subject<boolean>();
        }
        return pending.asObservable();
      },
    } as unknown as AuthService;

    TestBed.configureTestingModule({
      providers: [
        DataService,
        {provide: AuthService, useValue: authMock},
        {provide: DATA_SERVICE_CONFIG, useValue: singleFlightDataServiceConfig},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {provide: Router, useValue: {navigate: () => {}}},
      ],
    });
    dataService = TestBed.inject(DataService);

    spyOnProperty((dataService as any)._nss, 'isOnline$', 'get').and.returnValue(obsOf(true));
    (dataService as any)._activeSyncs.next({
      dummy: {
        state: {
          reSync: () => {},
          awaitInSync: () => new Promise<void>(() => {}),
          cancel: () => Promise.resolve(),
        },
        clientRequestSub: {unsubscribe: () => {}},
        stateReceivedSub: {unsubscribe: () => {}},
        stateActivity: obsOf(true),
        collectionName: 'dummy',
      },
    });
  });

  it('spends one attempt when several sync requests share the same failed refresh', () => {
    dataService.runSync();
    dataService.runSync();
    dataService.runSync();
    // One refresh for the three requests, as the auth service shares it.
    expect(refreshCalls).toBe(1);

    settleRefresh(false);

    expect((dataService as any)._failedSyncRefreshes).toBe(1);
    expect(endSessionSpy).not.toHaveBeenCalled();
  });

  it('still ends the session after three refresh rounds that each failed', () => {
    for (let round = 0; round < 3; round++) {
      dataService.runSync();
      settleRefresh(false);
    }

    expect(refreshCalls).toBe(3);
    expect((dataService as any)._failedSyncRefreshes).toBe(3);
    expect(endSessionSpy).toHaveBeenCalled();
  });

  it('gives the budget back when a shared refresh goes through', () => {
    dataService.runSync();
    settleRefresh(false);
    expect((dataService as any)._failedSyncRefreshes).toBe(1);

    dataService.runSync();
    dataService.runSync();
    settleRefresh(true);

    expect((dataService as any)._failedSyncRefreshes).toBe(0);
    expect(endSessionSpy).not.toHaveBeenCalled();
  });
});
