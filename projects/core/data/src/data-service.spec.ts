import {EventEmitter} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {Server, WebSocket} from 'mock-socket';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';
import {RxJsonSchema} from 'rxdb';
import {firstValueFrom, of as obsOf} from 'rxjs';
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
