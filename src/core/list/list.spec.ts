import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ChangeDetectorRef} from '@angular/core';
import {TestBed} from '@angular/core/testing';
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
import {AdminUserInteractionsService, ListComponent} from '@dewco/core/list';
import {RxJsonSchema} from 'rxdb';
import {Observable, of as obsOf} from 'rxjs';

const changeDetectorRefMock = {
  markForCheck() {}
};

class AdminUIService extends AdminUserInteractionsService {
  askDeleteConfirm(): Observable<boolean> {
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

const dummySelection: DummyModel[] = [
  {id: '1', name: 'DummyA', created_at: '', updated_at: ''},
  {id: '2', name: 'DummyB', created_at: '', updated_at: ''},
];

const schema = {
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
    schema: schema,
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
} as unknown as AuthService;

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

class ListFeatComp extends ListComponent<DummyModel> {
  constructor(
      aui: AdminUIService,
      cdr: ChangeDetectorRef,
  ) {
    super(cdr, aui);
  }

  getSelection() {
    return dummySelection;
  }
  getItems() {
    return dummyModels;
  }
  clearSelection() {}
  selectAll() {}
  refreshList() {}
}

describe('ListComponent', () => {
  let httpMock: HttpTestingController;
  let cdr: ChangeDetectorRef;
  let aui: AdminUIService;
  let listFeatComp: ListFeatComp;
  let dummyManager: DummyManager;
  let dataService: DataService;
  let contextService: PermissionContextService;
  let spyAskDeleteConfirm: jasmine.Spy;
  let spyInitService: jasmine.Spy<any>;
  let spySelectAll: jasmine.Spy;
  let spyDelete: jasmine.Spy;
  let spyRefresh: jasmine.Spy;
  let spyServiceDelete: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        PermissionContextService,
        DataService,
        {provide: ChangeDetectorRef, useValue: changeDetectorRefMock},
        {provide: AdminUIService, useValue: adminUIService},
        {provide: DummyManager, useValue: dummyManager},
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
      ],
    });
    httpMock = TestBed.get(HttpTestingController);
    cdr = TestBed.get(ChangeDetectorRef);
    aui = TestBed.get(AdminUIService);
    contextService = TestBed.get(PermissionContextService);
    dataService = TestBed.get(DataService);
    dummyManager = new DummyManager(createCollectionParams, dataService, contextService);
    listFeatComp = new ListFeatComp(aui, cdr);
    spyAskDeleteConfirm = spyOn(aui, 'askDeleteConfirm').and.callThrough();
    spyInitService = spyOn<any>(listFeatComp, '_initService').and.callThrough();
    spySelectAll = spyOn(listFeatComp, 'selectAll').and.callThrough();
    spyDelete = spyOn(listFeatComp, 'processDeleteAction').and.callThrough();
    spyServiceDelete = spyOn(dummyManager, 'bulkDelete').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should successfully initalize the DataManager', async () => {
    listFeatComp.service = dummyManager;
    expect(spyInitService).toHaveBeenCalledTimes(1);
  });

  it('should select all the items when the Master Toggle is checked', async () => {
    listFeatComp.masterToggle();
    expect(spySelectAll).toHaveBeenCalledTimes(1);
  });

  it('should delete the selected items after asking for confirmation', async () => {
    listFeatComp.service = dummyManager;
    listFeatComp.processAction('delete');
    expect(spyDelete).toHaveBeenCalledTimes(1);
    expect(spyAskDeleteConfirm).toHaveBeenCalledTimes(1);
    expect(spyServiceDelete).toHaveBeenCalledTimes(1);
    expect(spyServiceDelete).toHaveBeenCalledWith(dummySelection);
  });
});
