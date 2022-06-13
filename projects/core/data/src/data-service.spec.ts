import {EventEmitter} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {Server, WebSocket} from 'mock-socket';
import * as pouchdbAdapterMemory from 'pouchdb-adapter-memory';
import {RxJsonSchema} from 'rxdb';
import {addPouchPlugin, getRxStoragePouch} from 'rxdb/plugins/pouchdb';
import {firstValueFrom, of as obsOf} from 'rxjs';
import {take} from 'rxjs/operators';

import {DATA_SERVICE_CONFIG, DataService, DataServiceConfig, Model} from './public_api';

interface DummyModel extends Model {
  name: string;
}

let testDbIdx = 0;

const serverUrl = 'http://dinoServer/v1/graphql';
const wsServerUrl = 'ws://dinoServer';
const wsUrl = `${wsServerUrl}/v1/graphql`;

addPouchPlugin(pouchdbAdapterMemory);
const dataServiceConfig: DataServiceConfig = {
  databaseCreateOptions: {
    name: `dino_data_test_db_${testDbIdx++}`,
    storage: getRxStoragePouch('memory'),
    ignoreDuplicate: true,
  },
  syncOptions: {
    url: serverUrl,
    wsUrl,
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
  logoutEvt: new EventEmitter<void>(),
} as unknown as AuthService;

const dummySchema: RxJsonSchema<any> = {
  title: 'dummy schema',
  version: 0,
  description: 'describe a dummy model',
  type: 'object',
  primaryKey: 'id',
  properties: {
    id: {type: 'string'},
    name: {type: 'string'},
    created_at: {type: 'string'},
    updated_at: {type: ['string', 'null']},
  },
};

describe('Data service', () => {
  let dataService: DataService;
  let wsServer: Server;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
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
  const collectionName = 'dummy';
  const collection = {name: collectionName, collection: {schema: dummySchema}};
  let dataService: DataService;
  let currentDate: string;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
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
