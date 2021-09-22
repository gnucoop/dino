import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {RxJsonSchema} from 'rxdb';
import {of as obsOf} from 'rxjs';
import {take} from 'rxjs/operators';

import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig, User} from '../auth';

import {
  CanCreateData,
  CanDeleteData,
  CanModifyData,
  DATA_SERVICE_CONFIG,
  DataCreateCollectionRequest,
  DataListOptions,
  DataModelManager,
  DataQueryOptions,
  DataService,
  DataServiceConfig,
  Model,
  Permission,
  PermissionContextService,
} from './index';

interface DummyModel extends Model {
  name: string;
  age?: number;
  author?: string;
}

const dummyUser: User = {
  id: 'userid',
  email: 'user@dewco.gnu',
  firstName: 'dummy',
  lastName: 'dewco',
  active: true,
  verified: true,
  tenantId: '1',
  insertInstant: 1,
  lastLoginInstant: 1,
  passwordChangeRequired: false,
  passwordLastUpdateInstant: 1,
  twoFactorEnabled: false,
  twoFactorDelivery: 'None',
  usernameStatus: 'ACTIVE',
  registrations: []
};

class DummyManager extends DataModelManager<DummyModel> {
  constructor(
      createParams: DataCreateCollectionRequest,
      dataService: DataService,
      contextService: PermissionContextService,
      permissions: Permission[],
  ) {
    super(createParams, dataService, contextService, permissions);
  }
}

class AgeAuthPermission implements Permission<DummyModel> {
  canCreate(data: CanCreateData<{}, DummyModel>): boolean {
    if (data.object.age && data.object.age < 18) {
      return false;
    }
    return true;
  }

  canDelete(data: CanDeleteData<{}, DummyModel>): boolean {
    if (data.context && data.object.author && data.context.user &&
        data.context.user.email === data.object.author) {
      return true;
    }
    return false;
  }

  canModify(data: CanModifyData<{}, DummyModel>): boolean {
    if (data.object.author !== data.data.author) {
      return false;
    }
    return true;
  }
}

const ageAuthPermission = new AgeAuthPermission();
let testDbIdx = 0;
const serverUrl = 'http://dewcoServer/v1/graphql';
const wsServerUrl = 'ws://dewcoServer';
const wsUrl = `${wsServerUrl}/v1/graphql`;

function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dewco_datamanager_test_db_${testDbIdx++}`,
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
}

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
  authToken: obsOf('test_auth_token'),
  authConfig: authServiceConfig,
  resetEvt: obsOf(true),
  getUserInfo: () => {
    return dummyUser;
  },
} as unknown as AuthService;

const dummySchema: RxJsonSchema = {
  title: 'dummy schema',
  version: 0,
  description: 'describe a dummy model',
  type: 'object',
  properties: {
    id: {type: 'string', primary: true},
    name: {type: 'string'},
    age: {type: 'number'},
    author: {type: 'string'},
    created_at: {type: 'string'},
    updated_at: {type: ['string', 'null']},
  },
  indexes: [
    'name',
  ],
};

describe('Data Model Manager - CRUD methods', () => {
  const collectionName = 'dummymodel';
  const collection = {name: collectionName, schema: dummySchema};
  let dataService: DataService;
  let contextService: PermissionContextService;
  let dummyManager: DummyManager|null;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        PermissionContextService,
        DataService,
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
      ],
    });
    contextService = TestBed.inject(PermissionContextService);
    dataService = TestBed.inject(DataService);
    dummyManager = new DummyManager({collection}, dataService, contextService, [ageAuthPermission]);
  });

  afterEach(async () => {
    await dataService.destroyCollection(collection.name).pipe(take(1)).toPromise();
    dummyManager = null;
  });

  it('should create a new object in the database', async () => {
    const object = {name: 'exampleDummy'};
    const createSpy = spyOn(ageAuthPermission, 'canCreate').and.callThrough();
    const insertedDummy = await dummyManager!.create(object).pipe(take(1)).toPromise();
    expect(insertedDummy).not.toBeNull();
    expect(insertedDummy!.name).toBe('exampleDummy');
    expect(createSpy).toHaveBeenCalled();
  });

  it('should get an existing object from the database', async () => {
    const object = {name: 'exampleDummy'};
    const insertedDummy = await dummyManager!.create(object).pipe(take(1)).toPromise();
    const getObject = await dummyManager!.get(insertedDummy!.id).pipe(take(1)).toPromise();
    expect(getObject).not.toBeNull();
    expect(getObject!.name).toEqual(insertedDummy!.name);
    expect(getObject!).toEqual(jasmine.objectContaining(object));
  });

  it('should create a bulk of objects in the database', async () => {
    const objects = [{name: 'firstDummy'}, {name: 'secondDummy'}];
    const insertedDummies = await dummyManager!.bulkCreate(objects).pipe(take(1)).toPromise();
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
    await dummyManager!.bulkCreate(objects).pipe(take(1)).toPromise();
    const getObjects = await dummyManager!.list().pipe(take(1)).toPromise();
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
    await dummyManager!.bulkCreate(objects).pipe(take(1)).toPromise();
    const listOptions: DataListOptions = {
      sort: [{name: 'desc'}],
      limit: 5,
      skip: 1,
    };
    const getObjects = await dummyManager!.list(listOptions).pipe(take(1)).toPromise();
    const results = await getObjects.exec();
    expect(results).not.toBeNull();
    expect(results.length).toEqual(3);
    expect(results[0].name).toEqual(objects[2].name);
  });

  it('should retrieve all objects in the collection matching the query options', async () => {
    const objects = [
      {name: 'A', age: 18},
      {name: 'B', age: 20},
      {name: 'C', age: 60},
      {name: 'D'},
      {name: 'E', age: 55},
    ];
    await dummyManager!.bulkCreate(objects).pipe(take(1)).toPromise();
    const queryOptions: DataQueryOptions = {
      selector: {
        age: {$gte: 20},
        name: {$ne: 'E'},
      },
      sort: [{name: 'asc'}],
    };
    const getObjects = await dummyManager!.query(queryOptions).pipe(take(1)).toPromise();
    const results = await getObjects.exec();
    expect(results).not.toBeNull();
    expect(results.length).toEqual(2);
    for (const obj of results) {
      expect(obj.age).toBeGreaterThanOrEqual(20);
      expect(obj.name).not.toEqual('E');
    }
  });

  it('should remove an existing object from the database', async () => {
    const object = {name: 'testDummy', author: 'user@dewco.gnu'};
    const deleteSpy = spyOn(ageAuthPermission, 'canDelete').and.callThrough();
    const insertedDummy = await dummyManager!.create(object).pipe(take(1)).toPromise();
    const deletedObject = await dummyManager!.delete(insertedDummy!.id).pipe(take(1)).toPromise();
    const getObject = await dummyManager!.get(deletedObject!.id).pipe(take(1)).toPromise();
    expect(deletedObject?.deleted).toBeTrue();
    expect(deletedObject!.name).toEqual(insertedDummy!.name);
    expect(getObject).toBeNull();
    expect(deleteSpy).toHaveBeenCalled();
  });

  it('should remove a bulk of existing objects from the database', async () => {
    const objects = [
      {name: 'firstDummy', author: 'user@dewco.gnu'},
      {name: 'secondDummy', author: 'user@dewco.gnu'},
    ];
    const insertedDummies = await dummyManager!.bulkCreate(objects).pipe(take(1)).toPromise();
    const deleteSpy = spyOn(ageAuthPermission, 'canDelete').and.callThrough();
    const deletedObjects =
        await dummyManager!.bulkDelete(insertedDummies.success).pipe(take(1)).toPromise();
    const getFirstObject = await dummyManager!.get(deletedObjects![0].id).pipe(take(1)).toPromise();
    const getSecondObject =
        await dummyManager!.get(deletedObjects![1].id).pipe(take(1)).toPromise();
    deletedObjects!.forEach(deletedObject => {
      expect(deletedObject?.deleted).toBeTrue();
    });
    expect(getFirstObject).toBeNull();
    expect(getSecondObject).toBeNull();
    expect(deleteSpy).toHaveBeenCalled();
  });

  it('should update an existing object from the database', async () => {
    const object = {name: 'newDummy'};
    const modifySpy = spyOn(ageAuthPermission, 'canModify').and.callThrough();
    const insertedDummy = await dummyManager!.create(object).pipe(take(1)).toPromise();
    const updObject = {
      id: insertedDummy!.id,
      name: 'upDummy',
      created_at: '',
      updated_at: '',
    };
    await dummyManager!.update(updObject).pipe(take(1)).toPromise();
    const getObject = await dummyManager!.get(updObject.id).pipe(take(1)).toPromise();
    expect(getObject).not.toBeNull();
    expect(getObject!.name).toEqual('upDummy');
    expect(getObject!).not.toEqual(jasmine.objectContaining(object));
    expect(modifySpy).toHaveBeenCalled();
  });

  it('should patch an existing object from the database', async () => {
    const object = {name: 'newDummy'};
    const modifySpy = spyOn(ageAuthPermission, 'canModify').and.callThrough();
    const insertedDummy = await dummyManager!.create(object).pipe(take(1)).toPromise();
    const objectToPatch = {
      id: insertedDummy!.id,
      name: 'patchedDummy',
    };
    await dummyManager!.patch(objectToPatch).pipe(take(1)).toPromise();
    const getObject = await dummyManager!.get(objectToPatch.id).pipe(take(1)).toPromise();
    expect(getObject).not.toBeNull();
    expect(getObject!.name).toEqual('patchedDummy');
    expect(getObject!).not.toEqual(jasmine.objectContaining(object));
    expect(modifySpy).toHaveBeenCalled();
  });
});
