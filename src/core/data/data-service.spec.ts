import {TestBed} from '@angular/core/testing';
import {AuthService, NetworkStatusService} from '@dewco/core/auth';
import {DATA_SERVICE_CONFIG, DataService, DataServiceConfig, Model} from '@dewco/core/data';
import {Server, WebSocket} from 'mock-socket';
import {RxJsonSchema} from 'rxdb';
import {of as obsOf} from 'rxjs';

interface DummyModel extends Model {
  name: string;
}

let testDbIdx = 0;

const authServiceMock = {
  authenticated: obsOf(true),
} as unknown as AuthService;

const networkStatusServiceMock = {
  isOnline$: obsOf(true),
} as unknown as NetworkStatusService;

const serverUrl = 'http://dewcoServer/v1/graphql';
const wsServerUrl = 'ws://dewcoServer';
const wsUrl = `${wsServerUrl}/v1/graphql`;

function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dewco_data_test_db_${testDbIdx++}`,
      adapter: 'memory',
    },
    syncOptions: {
      url: serverUrl,
      wsUrl,
      webSocketImpl: WebSocket,
    },
  };
}

const invalidDataServiceConfig: DataServiceConfig = {
  databaseCreateOptions: {
    name: 'dewco_data_test_db',
    adapter: 'dummy',
  },
  syncOptions: {
    url: 'http://dewcoServer/v1/graphql',
  },
};

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
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
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
    const created = dataService.createCollection({collection}).toPromise();
    await expectAsync(created).toBeResolvedTo(true);
    const deleted = dataService.destroyCollection(collection.name).toPromise();
    await expectAsync(deleted).toBeResolvedTo(true);
  });

  it('should throw an exception when trying to destroy an unexisting collection', async () => {
    await expectAsync(dataService.destroyCollection('collection').toPromise())
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
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
      ],
    });
    dataService = TestBed.get(DataService);
    await dataService.createCollection({collection}).toPromise();
  });

  afterEach(async () => {
    await dataService.destroyCollection(collection.name).toPromise();
  });

  it('should insert a new object in the database', async () => {
    const object = {name: 'dummy'};
    const insParams = {collectionName, object};
    const inserted = await dataService.insert<DummyModel>(insParams).toPromise();
    expect(inserted).not.toBeNull();
    expect(inserted!.name).toBe('dummy');
  });

  it('should get an existing object from the database', async () => {
    const object = {name: 'dummy'};
    const insParams = {collectionName, object};
    const inserted = await dataService.insert<DummyModel>(insParams).toPromise();
    const getParams = {collectionName, id: inserted!.id};
    const getObject = await dataService.get<DummyModel>(getParams).toPromise();
    expect(getObject).not.toBeNull();
    expect(getObject!._data).toEqual(inserted!._data);
    expect(getObject!._data).toEqual(jasmine.objectContaining(object));
  });

  it('should create a new object when upserting an unexisting object', async () => {
    const object = {name: 'foo'};
    const insParams = {collectionName, object};
    const inserted = await dataService.upsert<DummyModel>(insParams).toPromise();
    const getParams = {collectionName, id: inserted!.id};
    const getObject = await dataService.get<DummyModel>(getParams).toPromise();
    expect(getObject).not.toBeNull();
    expect(getObject!._data).toEqual(inserted!._data);
    expect(getObject!._data).toEqual(jasmine.objectContaining(object));
  });

  it('should overwrite the old object when upserting an existing object', async () => {
    const object1 = {name: 'dummy'};
    let insParams = {collectionName, object: object1};
    const inserted = await dataService.insert<DummyModel>(insParams).toPromise();
    const object2 = {id: inserted!.id, name: 'foo'};
    insParams.object = object2;
    const updated = await dataService.upsert<DummyModel>(insParams).toPromise();
    const getParams = {collectionName, id: inserted!.id};
    const getObject = await dataService.get<DummyModel>(getParams).toPromise();
    expect(getObject).not.toBeNull();
    expect(getObject!._data).toEqual(updated!._data);
    expect(getObject!._data).toEqual(jasmine.objectContaining(object2));
  });

  it('should bulk insert new objects in the database', async () => {
    const objects = [{name: 'foo'}, {name: 'bar'}];
    const insParams = {collectionName, objects};
    const result = await dataService.bulkInsert<DummyModel>(insParams).toPromise();
    expect(result).not.toBeNull();
    expect(result.success).not.toBeNull();
    expect(result.success.length).toEqual(objects.length);
    for (const idx in objects) {
      expect(objects[idx].name).toEqual(result.success[idx].name);
    }
  });

  it('should create a single doc query', async () => {
    const findParams = {collectionName};
    const result = await dataService.findOne<DummyModel>(findParams).toPromise();
    expect(result).not.toBeNull();
  });

  it('should create a multiple docs query', async () => {
    const findParams = {collectionName};
    const result = await dataService.find<DummyModel>(findParams).toPromise();
    expect(result).not.toBeNull();
  });
});

describe('Invalid data service config', () => {
  it('should fail creating the service instance when an invalid adapter is defined', () => {
    expect(
        () => new DataService(authServiceMock, networkStatusServiceMock, invalidDataServiceConfig))
        .toThrowError();
  });
});
