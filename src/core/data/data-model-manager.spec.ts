import {TestBed} from '@angular/core/testing';
import {
  DATA_SERVICE_CONFIG,
  DataListOptions,
  DataModelManager,
  DataQueryOptions,
  DataService,
  DataServiceConfig,
  Model,
} from '@dewco/core/data';
import {RxJsonSchema} from 'rxdb';

interface DummyModel extends Model {
  name: string;
  age?: number;
}

class DummyManager extends DataModelManager<DummyModel> {
  constructor(dataservice: DataService) {
    super('dummymodel', dataservice);
  }
}

let testDbIdx = 0;

function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dewco_datamanager_test_db_${testDbIdx++}`,
      adapter: 'memory',
    },
  };
}

const dummySchema: RxJsonSchema = {
  title: 'dummy schema',
  version: 0,
  description: 'describe a dummy model',
  type: 'object',
  properties: {
    id: {type: 'string', primary: true},
    name: {type: 'string', index: true},
    age: {type: 'number'},
    created_at: {type: 'string'},
    updated_at: {type: ['string', 'null']},
  },
};

describe('Data Model Manager - CRUD methods', () => {
  const collectionName = 'dummymodel';
  const collection = {name: collectionName, schema: dummySchema};
  let dataService: DataService;
  let dummyManager: DummyManager|null;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
      ],
    });
    dataService = TestBed.get(DataService);
    dummyManager = new DummyManager(dataService);
    await dataService.createCollection(collection).toPromise();
  });

  afterEach(async () => {
    await dataService.destroyCollection(collection.name).toPromise();
    dummyManager = null;
  });

  it('should create a new object in the database', async () => {
    const object = {name: 'exampleDummy'};
    const insertedDummy = await dummyManager!.create(object).toPromise();
    expect(insertedDummy).not.toBeNull();
    expect(insertedDummy!.name).toBe('exampleDummy');
  });

  it('should get an existing object from the database', async () => {
    const object = {name: 'exampleDummy'};
    const insertedDummy = await dummyManager!.create(object).toPromise();
    const getObject = await dummyManager!.get(insertedDummy!.id).toPromise();
    expect(getObject).not.toBeNull();
    expect(getObject!.name).toEqual(insertedDummy!.name);
    expect(getObject!).toEqual(jasmine.objectContaining(object));
  });

  it('should create a bulk of objects in the database', async () => {
    const objects = [{name: 'firstDummy'}, {name: 'secondDummy'}];
    const insertedDummies = await dummyManager!.bulkCreate(objects).toPromise();
    expect(insertedDummies).not.toBeNull();
    expect(insertedDummies.success).not.toBeNull();
    expect(insertedDummies.success.length).toEqual(objects.length);
    for (const idx in objects) {
      expect(objects[idx].name).toEqual(insertedDummies.success[idx].name);
    }
  });

  it('should retrieve a list of all objects in the collection', async () => {
    const objects = [
      {name: 'dummyOne'},
      {name: 'dummyTwo'},
    ];
    await dummyManager!.bulkCreate(objects).toPromise();
    const getObjects = await dummyManager!.list().toPromise();
    await getObjects.exec();
    expect(getObjects).not.toBeNull();
    expect(getObjects._resultsData.length).toEqual(objects.length);
  });

  it('should retrieve a list of all objects in the collection matching the options', async () => {
    const objects = [
      {name: 'A'},
      {name: 'B'},
      {name: 'C'},
      {name: 'D'},
    ];
    await dummyManager!.bulkCreate(objects).toPromise();
    const listOptions: DataListOptions = {
      sort: [{name: 'desc'}],
      limit: 5,
      skip: 1,
    };
    const getObjects = await dummyManager!.list(listOptions).toPromise();
    const results = await getObjects.exec();
    expect(results).not.toBeNull();
    expect(results.length).toEqual(3);
    expect(results[0].name).toEqual(objects[2].name);
  });

  it('should retrieve all objects in the collection matching the query options', async () => {
    const objects = [
      {name: 'A', age: 15},
      {name: 'B', age: 20},
      {name: 'C', age: 60},
      {name: 'D'},
      {name: 'E', age: 55},
    ];
    await dummyManager!.bulkCreate(objects).toPromise();
    const queryOptions: DataQueryOptions = {
      selector: {
        age: {$gte: 20},
        name: {$ne: 'E'},
      },
      sort: [{name: 'asc'}],
    };
    const getObjects = await dummyManager!.query(queryOptions).toPromise();
    const results = await getObjects.exec();
    expect(results).not.toBeNull();
    expect(results.length).toEqual(2);
    for (const obj of results) {
      expect(obj.age).toBeGreaterThanOrEqual(20);
      expect(obj.name).not.toEqual('E');
    }
  });

  it('should remove an existing object from the database', async () => {
    const object = {name: 'testDummy'};
    const insertedDummy = await dummyManager!.create(object).toPromise();
    const deletedObject = await dummyManager!.delete(insertedDummy!.id).toPromise();
    const getObject = await dummyManager!.get(deletedObject!.id).toPromise();
        expect(deletedObject?.deleted).toBeTrue();
        expect(deletedObject!.name).toEqual(insertedDummy!.name);
        expect(getObject).toBeNull();
  });

  it('should update an existing object from the database', async () => {
    const object = {name: 'newDummy'};
    const insertedDummy = await dummyManager!.create(object).toPromise();
    const updObject = {
      id: insertedDummy!.id,
      name: 'upDummy',
      created_at: '',
      updated_at: null,
    };
    await dummyManager!.update(updObject).toPromise();
    const getObject = await dummyManager!.get(updObject.id).toPromise();
    expect(getObject).not.toBeNull();
    expect(getObject!.name).toEqual('upDummy');
    expect(getObject!).not.toEqual(jasmine.objectContaining(object));
  });

  it('should patch an existing object from the database', async () => {
    const object = {name: 'newDummy'};
    const insertedDummy = await dummyManager!.create(object).toPromise();
    const objectToPatch = {
      id: insertedDummy!.id,
      name: 'patchedDummy',
    };
    await dummyManager!.patch(objectToPatch).toPromise();
    const getObject = await dummyManager!.get(objectToPatch.id).toPromise();
    expect(getObject).not.toBeNull();
    expect(getObject!.name).toEqual('patchedDummy');
    expect(getObject!).not.toEqual(jasmine.objectContaining(object));
  });
});
