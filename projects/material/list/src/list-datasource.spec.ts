import {EventEmitter} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig, User} from '@dino/core/auth';
import {
  DATA_SERVICE_CONFIG,
  DataCreateCollectionRequest,
  DataModelManager,
  DataQueryOptions,
  DataService,
  DataServiceConfig,
  Model,
  PermissionContextService,
} from '@dino/core/data';
import {FilterItem, FiltersService, ListModule} from '@dino/core/list';
import {getRxStorageMemory} from 'rxdb/plugins/memory';
import {RxJsonSchema} from 'rxdb';
import {BehaviorSubject, firstValueFrom, of as obsOf, of, take} from 'rxjs';
import {AjfTranslocoModule} from '@ajf/core/transloco';

import {ListDataSource} from './public_api';

interface DummyModel extends Model {
  name: string;
  filter_a?: string;
  filter_b?: number;
  filter_c?: boolean;
}

const dummySchema = {
  'type': 'object',
  'properties': {
    'id': {'type': 'string', 'description': 'UUID v4 identifier.', 'maxLength': 200},
    'name': {'type': 'string', 'description': 'Element name'},
    'filter_a': {'type': 'string', 'description': ''},
    'filter_b': {'type': 'number', 'description': ''},
    'filter_c': {'type': 'boolean', 'description': ''},
    'created_at': {'type': 'string', 'description': 'Creation timestamp.', 'maxLength': 200},
    'updated_at': {'type': 'string', 'description': 'Update timestamp.', 'maxLength': 200},
  },
  'additionalProperties': false,
  'title': 'dummymodel',
  'indexes': ['created_at', 'updated_at'],
  'primaryKey': 'id',
  'version': 0,
} as RxJsonSchema<any>;

const createCollectionParams = {
  name: 'dummymodel',
  collection: {
    schema: dummySchema,
  },
};

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

const authServiceConfig: AuthServiceConfig = {
  host: 'http://test-auth-backend',
  applicationId: 'applicationId',
  apiKey: 'apiKey',
  retryRefreshTime: 5000,
  retryAttemptsMax: 1,
  failedAuthRedirect: 'login',
};

const authServiceMock = {
  authenticated: of({auth: true, evt: 'init'}),
  authToken: of('test_auth_token'),
  getUserInfo: () => {
    return dummyUser;
  },
  resetEvt: of(false),
  logout: () => of(false),
  logoutEvt: new EventEmitter<void>(),
  _authConfig: new BehaviorSubject<AuthServiceConfig>(authServiceConfig),
  authConfig: authServiceConfig,
} as unknown as AuthService;

const fakeFilters: FilterItem[] = [
  {name: 'filter_a', value: 'test', operator: {label: 'Like', value: '$regex'}},
  {name: 'filter_b', value: 15, operator: {label: '>=', value: '$gte'}},
  {name: 'filter_c', value: false, operator: {label: '==', value: '$eq'}},
];

const fakeFiltersPreset = btoa(
  encodeURI(JSON.stringify({filters: fakeFilters, additionalFiltersLogic: 'and'})),
);

const fakeActivatedRoute = {
  queryParams: obsOf({'filters': fakeFiltersPreset}),
} as unknown as ActivatedRoute;

let testDbIdx = 0;

function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dino_datamanager_test_db_${testDbIdx++}`,
      storage: getRxStorageMemory(),
      ignoreDuplicate: true,
    },
    syncOptions: {
      url: {http: 'host'},
    },
  };
}

class DummyManager extends DataModelManager<DummyModel> {
  constructor(
    createParams: DataCreateCollectionRequest,
    dataService: DataService,
    permissionContextService: PermissionContextService,
  ) {
    super(createParams, dataService, permissionContextService);
  }
}

describe('ListDataSource', () => {
  let dummyManager: DummyManager;
  let dataService: DataService;
  let contextService: PermissionContextService;
  let fts: FiltersService;
  let dataSource: ListDataSource<DummyModel>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AjfTranslocoModule, ListModule, RouterTestingModule],
      providers: [
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        {provide: DummyManager, useValue: dummyManager},
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
      ],
    });
    contextService = TestBed.inject(PermissionContextService);
    dataService = TestBed.inject(DataService);
    fts = TestBed.inject(FiltersService);
    dummyManager = new DummyManager(createCollectionParams, dataService, contextService);
    dataSource = new ListDataSource<DummyModel>(dummyManager, fts);
    dummyManager.init().pipe(take(1)).subscribe();
  });

  it('should create a Mango Query from an encoded queryString', async () => {
    const spyAddNestedProp = spyOn<any>(dataSource, '_addNestedProps').and.callThrough();
    const spyQueryResults = spyOn(dataSource, 'getQueryResults').and.callThrough();

    const permissionContext = await firstValueFrom(dummyManager.permissionContext);
    const query = dataSource.queryDM(fakeFiltersPreset, permissionContext, true);
    const expectedMangoQuery: DataQueryOptions = {
      selector: {
        filter_a: {$regex: 'test'},
        filter_b: {$gte: 15},
        filter_c: {$eq: false},
        is_deleted: {$ne: true},
      },
      limit: 10,
      sort: [Object({created_at: 'desc'})],
    };

    expect(spyAddNestedProp).toHaveBeenCalled();
    expect(spyQueryResults).toHaveBeenCalled();
    expect(query).toEqual(expectedMangoQuery);
  });

  it('should query the dataModelManager', () => {
    const spyDmQuery = spyOn(dummyManager, 'query').and.callThrough();
    const mangoQuery: DataQueryOptions = {selector: {name: {$regex: 'it'}}};

    dataSource.getQueryResults(mangoQuery);

    expect(spyDmQuery).toHaveBeenCalledWith(mangoQuery);
  });

  it('should call the dataModelManager bulkDelete', () => {
    const spyDmDelete = spyOn(dummyManager, 'bulkDelete').and.callThrough();
    const items = [{name: 'item', id: '', created_at: '', updated_at: ''}];

    dataSource.deleteAction(items);

    expect(spyDmDelete).toHaveBeenCalledWith(items);
  });

  it('should call the dataModelManager create', () => {
    const spyDmCreate = spyOn(dummyManager, 'create').and.callThrough();
    const item = {
      name: 'item',
      filter_a: 'hey',
      filter_b: 3,
      filter_c: true,
      id: '',
      created_at: '',
      updated_at: '',
    };

    dataSource.createAction(item);

    expect(spyDmCreate).toHaveBeenCalledWith(item);
  });
});
