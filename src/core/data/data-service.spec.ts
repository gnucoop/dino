import {TestBed} from '@angular/core/testing';
import {Server, WebSocket} from 'mock-socket';
import {RxJsonSchema} from 'rxdb';
import {of as obsOf} from 'rxjs';
import {take} from 'rxjs/operators';

import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '../auth';
import {DATA_SERVICE_CONFIG, DataService, DataServiceConfig, Model} from './index';

interface DummyModel extends Model {
  name: string;
}

let testDbIdx = 0;

const serverUrl = 'http://dewcoServer/v1/graphql';
const wsServerUrl = 'ws://dewcoServer';
const wsUrl = `${wsServerUrl}/v1/graphql`;

const dataServiceConfig: DataServiceConfig = {
  databaseCreateOptions: {
    name: `dewco_data_test_db_${testDbIdx++}`,
    adapter: 'memory',
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
  authenticated: obsOf(true),
  authConfig: authServiceConfig,
  authToken: obsOf('test_auth_token'),
  resetEvt: obsOf(true),
} as unknown as AuthService;

const dummySchema: RxJsonSchema = {
  title: 'dummy schema',
  version: 0,
  description: 'describe a dummy model',
  type: 'object',
  properties: {
    id: {type: 'string', primary: true},
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
    const collection = {name: 'dummy', schema: dummySchema};
    const created = dataService.createCollection({collection}).pipe(take(1)).toPromise();
    await expectAsync(created).toBeResolvedTo(true);
    const deleted = dataService.destroyCollection(collection.name).pipe(take(1)).toPromise();
    await expectAsync(deleted).toBeResolvedTo(true);
  });

  it('should throw an exception when trying to destroy an unexisting collection', async () => {
    await expectAsync(dataService.destroyCollection('collection').pipe(take(1)).toPromise())
        .toBeRejectedWithError();
  });
});

describe('Data service - CRUD methods', () => {
  const collectionName = 'dummy';
  const collection = {name: collectionName, schema: dummySchema};
  let dataService: DataService;

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
    await dataService.createCollection({collection}).pipe(take(1)).toPromise();
  });

  afterEach(async () => {
    await dataService.destroyCollection(collection.name).pipe(take(1)).toPromise();
  });

  it('should insert a new object in the database', async () => {
    const object = {name: 'dummy'};
    const insParams = {collectionName, object};
    const inserted = await dataService.insert<DummyModel>(insParams).pipe(take(1)).toPromise();
    expect(inserted).not.toBeNull();
    expect(inserted!.name).toBe('dummy');
  });

  it('should get an existing object from the database', async () => {
    const object = {name: 'dummy'};
    const insParams = {collectionName, object};
    const inserted = await dataService.insert<DummyModel>(insParams).pipe(take(1)).toPromise();
    const getParams = {collectionName, id: inserted!.id};
    const getObject = await dataService.get<DummyModel>(getParams).pipe(take(1)).toPromise();
    expect(getObject).not.toBeNull();
    expect(getObject!._data).toEqual(inserted!._data);
    expect(getObject!._data).toEqual(jasmine.objectContaining(object));
  });

  it('should create a new object when upserting an unexisting object', async () => {
    const object = {name: 'foo'};
    const insParams = {collectionName, object};
    const inserted = await dataService.upsert<DummyModel>(insParams).pipe(take(1)).toPromise();
    const getParams = {collectionName, id: inserted!.id};
    const getObject = await dataService.get<DummyModel>(getParams).pipe(take(1)).toPromise();
    expect(getObject).not.toBeNull();
    expect(getObject!._data).toEqual(inserted!._data);
    expect(getObject!._data).toEqual(jasmine.objectContaining(object));
  });

  it('should overwrite the old object when upserting an existing object', async () => {
    const object1 = {name: 'dummy'};
    let insParams = {collectionName, object: object1};
    const inserted = await dataService.insert<DummyModel>(insParams).pipe(take(1)).toPromise();
    const object2 = {id: inserted!.id, name: 'foo'};
    insParams.object = object2;
    const updated = await dataService.upsert<DummyModel>(insParams).pipe(take(1)).toPromise();
    const getParams = {collectionName, id: inserted!.id};
    const getObject = await dataService.get<DummyModel>(getParams).pipe(take(1)).toPromise();
    expect(getObject).not.toBeNull();
    expect(getObject!._data).toEqual(updated!._data);
    expect(getObject!._data).toEqual(jasmine.objectContaining(object2));
  });

  it('should bulk insert new objects in the database', async () => {
    const objects = [{name: 'foo'}, {name: 'bar'}];
    const insParams = {collectionName, objects};
    const result = await dataService.bulkInsert<DummyModel>(insParams).pipe(take(1)).toPromise();
    expect(result).not.toBeNull();
    expect(result.success).not.toBeNull();
    expect(result.success.length).toEqual(objects.length);
    for (const idx in objects) {
      expect(objects[idx].name).toEqual(result.success[idx].name);
    }
  });

  it('should create a single doc query', async () => {
    const findParams = {collectionName};
    const result = await dataService.findOne<DummyModel>(findParams).pipe(take(1)).toPromise();
    expect(result).not.toBeNull();
  });

  it('should create a multiple docs query', async () => {
    const findParams = {collectionName};
    const result = await dataService.find<DummyModel>(findParams).pipe(take(1)).toPromise();
    expect(result).not.toBeNull();
  });
});
