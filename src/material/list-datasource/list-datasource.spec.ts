import {TestBed} from '@angular/core/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService, User} from '@dewco/core/auth';
import {
  DATA_SERVICE_CONFIG,
  DataCreateCollectionRequest,
  DataModelManager,
  DataQueryOptions,
  DataService,
  DataServiceConfig,
  Model,
  PermissionContextService
} from '@dewco/core/data';
import {
  FilterItem,
  FiltersService,
} from '@dewco/core/list';
import {ListDataSource} from '@dewco/material/list-datasource';
import {RxJsonSchema} from 'rxdb';
import {of as obsOf} from 'rxjs';

interface DummyModel extends Model {
  name: string;
  filter_a?: string;
  filter_b?: number;
  filter_c?: boolean;
}

const dummySchema = {
  'type': 'object',
  'properties': {
    'id': {'type': 'string', 'description': 'UUID v4 identifier.'},
    'name': {'type': 'string', 'description': 'Element name'},
    'filter_a': {'type': 'string', 'description': ''},
    'filter_b': {'type': 'number', 'description': ''},
    'filter_c': {'type': 'boolean', 'description': ''},
    'created_at': {'type': 'string', 'description': 'Creation timestamp.'},
    'updated_at': {'type': 'string', 'description': 'Update timestamp.'},
  },
  'additionalProperties': false,
  'title': 'dummymodel',
  'version': 0,
} as RxJsonSchema;

const createCollectionParams = {
  collection: {
    name: 'dummymodel',
    schema: dummySchema,
  }
};

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

const authServiceMock = {
  authenticated: obsOf(true),
  getUserInfo: () => {
    return dummyUser;
  },
} as AuthService;

const fakeFilters: FilterItem[] = [
  {name: 'filter_a', value: 'test', operator: {label: 'Like', value: '$regex'}},
  {name: 'filter_b', value: 15, operator: {label: '>=', value: '$gte'}},
  {name: 'filter_c', value: false, operator: {label: '==', value: '$eq'}},
];

const fakeFiltersPreset = btoa(encodeURI(JSON.stringify(fakeFilters)));

const fakeActivatedRoute = {
  queryParams: obsOf({'filters': fakeFiltersPreset})
} as unknown as ActivatedRoute;

let testDbIdx = 0;

function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dewco_datamanager_test_db_${testDbIdx++}`,
      adapter: 'memory',
    },
    syncOptions: {
      url: 'host',
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


describe('ListComponent', () => {
  let dummyManager: DummyManager;
  let dataService: DataService;
  let contextService: PermissionContextService;
  let fts: FiltersService;
  let route: ActivatedRoute;
  let router: Router;
  let dataSource: ListDataSource<DummyModel, DummyManager>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        {provide: DummyManager, useValue: dummyManager},
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
      ],
    });
    contextService = TestBed.inject(PermissionContextService);
    dataService = TestBed.inject(DataService);
    fts = TestBed.inject(FiltersService);
    dummyManager = new DummyManager(createCollectionParams, dataService, contextService);
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    dataSource = new ListDataSource<DummyModel, DummyManager>(dummyManager, fts);
  });

  describe('ListDataSource extending MatDataSource. Queries the indexedDb for data', () => {
    it('should create a Mango Query from an encoded queryString', () => {
      const spyAddNestedProp = spyOn<any>(dataSource, '_addNestedProps').and.callThrough();
      const spyQueryResults = spyOn(dataSource, 'getQueryResults').and.callThrough();

      const query = dataSource.queryDM(fakeFiltersPreset);
      const expectedMangoQuery: DataQueryOptions = {
        selector: {
          filter_a: {$regex: 'test'},
          filter_b: {$gte: 15},
          filter_c: {$eq: false},
        },
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
  });
});
