import {ChangeDetectorRef} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService, User} from '@dewco/core/auth';
import {
  DATA_SERVICE_CONFIG,
  DataCreateCollectionRequest,
  DataModelManager,
  DataService,
  DataServiceConfig,
  Model,
  PermissionContextService
} from '@dewco/core/data';
import {FilterItem, FiltersService} from '@dewco/core/list';
import {AdminUserInteractionsService, SelectionList} from '@dewco/material/list';
import {ListDataSource} from '@dewco/material/list-datasource';
import {RxJsonSchema} from 'rxdb';
import {Observable, of as obsOf} from 'rxjs';

const changeDetectorRefMock = {
  markForCheck() {}
};

class AdminUIService extends AdminUserInteractionsService {
  askConfirm(action: string): Observable<boolean> {
    return obsOf(true);
  }
}

interface DummyModel extends Model {
  name: string;
}

const dummyModels: DummyModel[] = [
  {id: '1', name: 'DummyA', created_at: '', updated_at: ''},
  {id: '2', name: 'DummyB', created_at: '', updated_at: ''},
  {id: '3', name: 'DummyC', created_at: '', updated_at: ''},
];

const dummySchema = {
  'type': 'object',
  'properties': {
    'id': {'type': 'string', 'description': 'UUID v4 identifier.'},
    'name': {'type': 'string', 'description': 'Element name'},
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

const adminUIService = new AdminUIService();

const fakeFilters: FilterItem[] = [
  {name: 'filter_a', value: 'test', operator: {label: 'Like', value: '$regex'}},
  {name: 'filter_b', value: 15, operator: {label: '>=', value: '$gte'}},
  {name: 'filter_c', value: false, operator: {label: '==', value: '$eq'}},
];

const fakeFiltersPreset = btoa(encodeURI(JSON.stringify(fakeFilters)));

const fakeActivatedRoute = {
  queryParams: obsOf({'filters': fakeFiltersPreset})
} as unknown as ActivatedRoute;

describe('ListComponent', () => {
  let dummyManager: DummyManager;
  let dataService: DataService;
  let contextService: PermissionContextService;
  let fts: FiltersService;
  let dataSource: ListDataSource<DummyModel, DummyManager>;
  let fixture: ComponentFixture<SelectionList<DummyModel, DummyManager>>;
  let selList: SelectionList<DummyModel, DummyManager>;

  beforeEach(() => {
    TestBed
        .configureTestingModule({
          declarations: [SelectionList],
          imports: [
            RouterTestingModule,
          ],
          providers: [
            {provide: ActivatedRoute, useValue: fakeActivatedRoute},
            {provide: ChangeDetectorRef, useValue: changeDetectorRefMock},
            {provide: AdminUserInteractionsService, useValue: adminUIService},
            {provide: DummyManager, useValue: dummyManager},
            {provide: AuthService, useValue: authServiceMock},
            {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
          ],
        })
        .compileComponents();
    contextService = TestBed.inject(PermissionContextService);
    dataService = TestBed.inject(DataService);
    dummyManager = new DummyManager(createCollectionParams, dataService, contextService);
    fts = TestBed.inject(FiltersService);
    dataSource = new ListDataSource<DummyModel, DummyManager>(dummyManager, fts);
    fixture = TestBed.createComponent<SelectionList<DummyModel, DummyManager>>(SelectionList);
    selList = fixture.componentInstance;
    selList.dataSource = dataSource;
  });

  it('should initialize the ListDataSource and the list actions subscription on init', () => {
    const spyFillDataSource = spyOn<any>(selList, '_fillDataSource').and.callThrough();
    const spyListInit = spyOn<any>(selList, '_initList').and.callThrough();
    fixture.detectChanges();

    expect(spyFillDataSource).toHaveBeenCalledTimes(1);
    expect(spyListInit).toHaveBeenCalledTimes(1);
  });


  it('should query the ListDataSource for the selected items deletion', () => {
    const spyProcessAction = spyOn(selList, 'processAction').and.callThrough();
    fixture.detectChanges();

    selList.deleteItems(dummyModels);

    expect(spyProcessAction).toHaveBeenCalledWith('delete', dummyModels);
  });
});
