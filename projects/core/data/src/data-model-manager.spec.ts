import {HttpClientTestingModule} from '@angular/common/http/testing';
import {EventEmitter, Injectable} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig, User} from '@dino/core/auth';
import {getRxStorageMemory} from 'rxdb/plugins/memory';
import {RxJsonSchema} from 'rxdb';
import {firstValueFrom, Observable, of as obsOf} from 'rxjs';
import {take} from 'rxjs/operators';

import {PermissionContext} from './data-permission-interface';

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
} from './public_api';

interface DummyModel extends Model {
  name: string;
  age?: number;
  author?: string;
}

const dummyUser: User = {
  id: 'userid',
  email: 'user@dino.gnu',
  firstName: 'dummy',
  lastName: 'dino',
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
  registrations: [],
};

@Injectable()
class ContextServiceMock extends PermissionContextService {
  override checkPermission() {
    return true;
  }
  override getMatchingMetric() {
    return true;
  }
  override permissionContext: Observable<PermissionContext> = obsOf({
    user: dummyUser,
    user_data: {},
    user_form_schemas: new Set<string>(['all']),
    user_report_schemas: new Set<string>(['all']),
    user_form_statuses: new Set<string>(['all']),
    user_metrics: {},
    user_permissions: {},
  }) as Observable<PermissionContext>;
}

class DummyManager extends DataModelManager<DummyModel> {
  constructor(
    createParams: DataCreateCollectionRequest,
    dataService: DataService,
    contextService: ContextServiceMock,
    permissions: Permission[],
  ) {
    super(createParams, dataService, contextService, permissions);
  }
}

class AgeAuthPermission implements Permission<DummyModel> {
  canCreate(data: CanCreateData<DummyModel>): boolean {
    if (data.object.age && data.object.age < 18) {
      return false;
    }
    return true;
  }

  canDelete(data: CanDeleteData<DummyModel>): boolean {
    if (
      data.context &&
      data.object.author &&
      data.context.user &&
      data.context.user.email === data.object.author
    ) {
      return true;
    }
    return false;
  }

  canModify(data: CanModifyData<DummyModel>): boolean {
    if (data.object.author !== data.data.author) {
      return false;
    }
    return true;
  }
}

const ageAuthPermission = new AgeAuthPermission();
let testDbIdx = 0;
const serverUrl = 'http://dinoServer/v1/graphql';
const wsServerUrl = 'ws://dinoServer';
const wsUrl = `${wsServerUrl}/v1/graphql`;

function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dino_datamanager_test_db_${testDbIdx++}`,
      storage: getRxStorageMemory(),
      ignoreDuplicate: true,
    },
    syncOptions: {
      url: {http: serverUrl, ws: wsUrl},
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
  authenticated: obsOf({auth: true, evt: 'init'}),
  authToken: obsOf('test_auth_token'),
  authConfig: authServiceConfig,
  resetEvt: obsOf(true),
  logout: () => obsOf(false),
  logoutEvt: new EventEmitter<void>(),
  getUserInfo: () => {
    return dummyUser;
  },
} as unknown as AuthService;

const dummySchema: RxJsonSchema<DummyModel> = {
  title: 'dummy schema',
  version: 0,
  description: 'describe a dummy model',
  type: 'object',
  primaryKey: 'id',
  properties: {
    id: {type: 'string', maxLength: 200},
    name: {type: 'string', maxLength: 200},
    age: {type: 'number'},
    author: {type: 'string'},
    created_at: {type: 'string'},
    updated_at: {type: ['string', 'null']},
    is_deleted: {type: 'boolean'},
    _deleted: {type: 'boolean'},
  },
  indexes: ['name'],
};

describe('Data Model Manager - CRUD methods', () => {
  const collectionName = 'dummymodel';
  const collection = {name: collectionName, collection: {schema: dummySchema}};
  let currentDate: string;
  let dataService: DataService;
  let contextService: ContextServiceMock;
  let dummyManager: DummyManager | null;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ContextServiceMock,
        DataService,
        RouterTestingModule,
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {provide: Router, useValue: {}},
      ],
    });
    contextService = TestBed.inject(ContextServiceMock);
    dataService = TestBed.inject(DataService);
    dummyManager = new DummyManager(collection, dataService, contextService, [ageAuthPermission]);
    currentDate = new Date().toISOString().split('T')[0];
    dummyManager.init().pipe(take(1)).subscribe();
  });

  afterEach(async () => {
    await firstValueFrom(dataService.destroyCollection(collection.name).pipe(take(1)));
    dummyManager = null;
  });

  it('should create a new object in the database', async () => {
    const object = {name: 'exampleDummy', created_at: currentDate};
    const createSpy = spyOn(ageAuthPermission, 'canCreate').and.callThrough();
    const insertedDummy = await firstValueFrom(dummyManager!.create(object).pipe(take(1)));
    expect(insertedDummy).not.toBeNull();
    expect(insertedDummy!.name).toBe('exampleDummy');
    expect(createSpy).toHaveBeenCalled();
  });

  it('should get an existing object from the database', async () => {
    const object = {name: 'exampleDummy', created_at: currentDate};
    const insertedDummy = await firstValueFrom(dummyManager!.create(object).pipe(take(1)));
    const getObject = await firstValueFrom(dummyManager!.get(insertedDummy!.id).pipe(take(1)));
    expect(getObject).not.toBeNull();
    expect(getObject!.name).toEqual(insertedDummy!.name);
    expect({name: getObject!.name}).toEqual(jasmine.objectContaining({name: object.name}));
  });

  it('should create a bulk of objects in the database', async () => {
    const objects = [
      {name: 'firstDummy', created_at: currentDate},
      {name: 'secondDummy', created_at: currentDate},
    ];
    const insertedDummies = await firstValueFrom(dummyManager!.bulkCreate(objects).pipe(take(1)));
    expect(insertedDummies).not.toBeNull();
    expect(insertedDummies.success).not.toBeNull();
    expect(insertedDummies.success.length).toEqual(objects.length);
    for (const idx in objects) {
      expect(objects[idx].name).toEqual(insertedDummies.success[idx].name);
    }
  });

  it('should retrieve a list of all objects in the collection', async () => {
    const objects = [
      {name: 'dummyOne', created_at: currentDate},
      {name: 'dummyTwo', created_at: currentDate},
    ];
    await firstValueFrom(dummyManager!.bulkCreate(objects).pipe(take(1)));
    const getObjects = await firstValueFrom(dummyManager!.list().pipe(take(1)));

    expect(getObjects).not.toBeNull();
    expect(getObjects.length).toEqual(objects.length);
  });

  it('should retrieve a list of all objects in the collection matching the options', async () => {
    const objects = [
      {name: 'A', created_at: currentDate},
      {name: 'B', created_at: currentDate},
      {name: 'C', created_at: currentDate},
      {name: 'D', created_at: currentDate},
    ];
    await firstValueFrom(dummyManager!.bulkCreate(objects).pipe(take(1)));
    const listOptions: DataListOptions = {
      sort: [{name: 'desc'}],
      limit: 5,
      skip: 1,
    };
    const getObjects = await firstValueFrom(dummyManager!.list(listOptions).pipe(take(1)));
    expect(getObjects).not.toBeNull();
    expect(getObjects.length).toEqual(3);
    expect(getObjects[0].name).toEqual(objects[2].name);
  });

  it('should retrieve all objects in the collection matching the query options', async () => {
    const objects = [
      {name: 'A', age: 18, created_at: currentDate},
      {name: 'B', age: 20, created_at: currentDate},
      {name: 'C', age: 60, created_at: currentDate},
      {name: 'D', created_at: currentDate},
      {name: 'E', age: 55, created_at: currentDate},
    ];
    await firstValueFrom(dummyManager!.bulkCreate(objects).pipe(take(1)));
    const queryOptions: DataQueryOptions = {
      selector: {
        age: {$gte: 20},
        name: {$ne: 'E'},
      },
      sort: [{name: 'asc'}],
    };
    const getObjects = await firstValueFrom(dummyManager!.query(queryOptions).pipe(take(1)));
    expect(getObjects).not.toBeNull();
    expect(getObjects.length).toEqual(2);
    for (const obj of getObjects) {
      expect(obj.age).toBeGreaterThanOrEqual(20);
      expect(obj.name).not.toEqual('E');
    }
  });

  it('should remove an existing object from the database', async () => {
    const object = {name: 'testDummy', author: 'user@dino.gnu', created_at: currentDate};
    const deleteSpy = spyOn(ageAuthPermission, 'canDelete').and.callThrough();
    const insertedDummy = await firstValueFrom(dummyManager!.create(object).pipe(take(1)));
    const deletedObject = await firstValueFrom(
      dummyManager!.delete(insertedDummy!.id).pipe(take(1)),
    );
    const getObject = await firstValueFrom(dummyManager!.get(deletedObject!.id).pipe(take(1)));
    expect(deletedObject?.deleted).toBeTrue();
    expect(deletedObject!.name).toEqual(insertedDummy!.name);
    expect(getObject).toBeNull();
    expect(deleteSpy).toHaveBeenCalled();
    expect(true).toEqual(true);
  });

  it('should update an existing object from the database', async () => {
    const object = {name: 'newDummy', created_at: currentDate};
    const modifySpy = spyOn(ageAuthPermission, 'canModify').and.callThrough();
    const insertedDummy = await firstValueFrom(dummyManager!.create(object).pipe(take(1)));
    const updObject = {
      id: insertedDummy!.id,
      name: 'upDummy',
      created_at: '',
      updated_at: '',
    };
    await firstValueFrom(dummyManager!.update(updObject).pipe(take(1)));
    const getObject = await firstValueFrom(dummyManager!.get(updObject.id).pipe(take(1)));
    expect(getObject).not.toBeNull();
    expect(getObject!.name).toEqual('upDummy');
    expect(getObject!).not.toEqual(jasmine.objectContaining(object));
    expect(modifySpy).toHaveBeenCalled();
  });

  it('should patch an existing object from the database', async () => {
    const object = {name: 'newDummy', created_at: currentDate};
    const modifySpy = spyOn(ageAuthPermission, 'canModify').and.callThrough();
    const insertedDummy = await firstValueFrom(dummyManager!.create(object).pipe(take(1)));
    const objectToPatch = {
      id: insertedDummy!.id,
      name: 'patchedDummy',
    };
    await firstValueFrom(dummyManager!.patch(objectToPatch).pipe(take(1)));
    const getObject = await firstValueFrom(dummyManager!.get(objectToPatch.id).pipe(take(1)));
    expect(getObject).not.toBeNull();
    expect(getObject!.name).toEqual('patchedDummy');
    expect(getObject!).not.toEqual(jasmine.objectContaining(object));
    expect(modifySpy).toHaveBeenCalled();
  });
});
