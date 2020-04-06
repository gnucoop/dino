import { TestBed } from '@angular/core/testing';
import {
    DataModelManager,
    DATA_SERVICE_CONFIG,
    DataService,
    DataServiceConfig,
    Model
} from '@dewco/core/data';

import { RxJsonSchema } from 'rxdb';

interface DummyModel extends Model {
    name: string;
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
        id: { type: 'string', primary: true },
        name: { type: 'string' },
        created_at: { type: 'string' },
        updated_at: { type: ['string', 'null'] },
    },
};

describe('Data Model Manager - CRUD methods', () => {
    const collectionName = 'dummymodel';
    const collection = { name: collectionName, schema: dummySchema };
    let dataService: DataService;
    let dummyManager: DummyManager | null;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            providers: [
                DataService,
                { provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig() },
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
        const object = { name: 'exampleDummy' };
        const insertedDummy = await dummyManager!.create(object).toPromise();
        expect(insertedDummy).not.toBeNull();
        expect(insertedDummy!.name).toBe('exampleDummy');
    });

    it('should get an existing object from the database', async () => {
        const object = { name: 'exampleDummy' };
        const insertedDummy = await dummyManager!.create(object).toPromise();
        const getObject = await dummyManager!.get(insertedDummy!.id).toPromise();
        expect(getObject).not.toBeNull();
        expect(getObject!.name).toEqual(insertedDummy!.name);
        expect(getObject!).toEqual(jasmine.objectContaining(object));
    });

    it('should create a bulk of objects in the database', async () => {
        const objects = [
            { name: 'firstDummy' },
            { name: 'secondDummy' }
        ];
        const insertedDummies = await dummyManager!.bulkCreate(objects).toPromise();
        expect(insertedDummies).not.toBeNull();
        expect(insertedDummies.success).not.toBeNull();
        expect(insertedDummies.success.length).toEqual(objects.length);
        for (const idx in objects) {
            expect(objects[idx].name).toEqual(insertedDummies.success[idx].name);
        }
    });

    it('should retrieve all objects in the collection', async () => {
        const objects = [
            { name: 'firstDummy' },
            { name: 'secondDummy' },
        ];
        await dummyManager!.bulkCreate(objects).toPromise();
        const getObjects = await dummyManager!.list().toPromise();
        await getObjects.exec();
        expect(getObjects).not.toBeNull();
        expect(getObjects._resultsData.length).toEqual(objects.length);
        for (const idx in objects) {
            expect(objects[idx].name).toEqual(getObjects._resultsData[idx].name);
        }
    });

    it('should retrieve all objects in the collection matching the query', async () => {
        const objects = [
            { name: 'firstDummy'},
            { name: 'secondDummy' },
        ];
        await dummyManager!.bulkCreate(objects).toPromise();
        const getObjects = await dummyManager!.list({
            name: { $eq: 'secondDummy' }
        }).toPromise();
        await getObjects.exec();
        expect(getObjects).not.toBeNull();
        expect(getObjects._resultsData.length).toEqual(1);
    });
});
