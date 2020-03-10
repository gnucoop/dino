import {TestBed} from '@angular/core/testing';
import {DATA_SERVICE_CONFIG, DataService, DataServiceConfig} from '@dewco/core/data';
import {RxJsonSchema} from 'rxdb';

import {Model} from './model';

interface DummyModel extends Model {
  name: string;
}

let testDbIdx = 0;

function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dewco_data_test_db_${testDbIdx++}`,
      adapter: 'memory',
    },
  };
}

const invalidDataServiceConfig: DataServiceConfig = {
  databaseCreateOptions: {
    name: 'dewco_data_test_db',
    adapter: 'dummy',
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
      ],
    });
    dataService = TestBed.get(DataService);
  });

  it('should create and destroy a collection from a valid schema', () => {
    const collection = {name: 'dummy', schema: dummySchema};
    const created = dataService.createCollection(collection).toPromise();
    expectAsync(created).toBeResolvedTo(true);
    const deleted = dataService.destroyCollection(collection.name).toPromise();
    expectAsync(deleted).toBeResolvedTo(true);
  });

  it('should throw an exception when trying to destroy an unexisting collection', () => {
    expectAsync(dataService.destroyCollection('collection').toPromise()).toBeRejectedWithError();
  });
});

describe('Data service - CRUD methods', () => {
  const collection = {name: 'dummy', schema: dummySchema};
  let dataService: DataService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
      ],
    });
    dataService = TestBed.get(DataService);
    await dataService.createCollection(collection).toPromise();
  });

  afterEach(async () => {
    await dataService.destroyCollection(collection.name).toPromise();
  });

  it('should insert a new object in the database', async () => {
    const object = {name: 'dummy'};
    const inserted = await dataService.insert<DummyModel>('dummy', object).toPromise();
    expect(inserted).not.toBeNull();
    expect(inserted!.name).toBe('dummy');
  });

  it('should get an existing object from the database', async () => {
    const object = {name: 'dummy'};
    const inserted = await dataService.insert<DummyModel>('dummy', object).toPromise();
    const getObject = await dataService.get<DummyModel>('dummy', inserted!.id).toPromise();
    expect(getObject).not.toBeNull();
    expect(getObject!._data).toEqual(inserted!._data);
    expect(getObject!._data).toEqual(jasmine.objectContaining(object));
  });

  it('should create a new object when upserting an unexisting object', async () => {
    const object = {name: 'foo'};
    const inserted = await dataService.upsert<DummyModel>('dummy', object).toPromise();
    const getObject = await dataService.get<DummyModel>('dummy', inserted!.id).toPromise();
    expect(getObject).not.toBeNull();
    expect(getObject!._data).toEqual(inserted!._data);
    expect(getObject!._data).toEqual(jasmine.objectContaining(object));
  });

  it('should overwrite the old object when upserting an existing object', async () => {
    const object1 = {name: 'dummy'};
    const inserted = await dataService.insert<DummyModel>('dummy', object1).toPromise();
    const object2 = {id: inserted!.id, name: 'foo'};
    const updated = await dataService.upsert<DummyModel>('dummy', object2).toPromise();
    const getObject = await dataService.get<DummyModel>('dummy', inserted!.id).toPromise();
    expect(getObject).not.toBeNull();
    expect(getObject!._data).toEqual(updated!._data);
    expect(getObject!._data).toEqual(jasmine.objectContaining(object2));
  });
});

describe('Invalid data service config', () => {
  it('should fail creating the service instance when an invalid adapter is defined', () => {
    expect(() => new DataService(invalidDataServiceConfig)).toThrowError();
  });
});
