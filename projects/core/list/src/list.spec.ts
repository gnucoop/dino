import {ChangeDetectorRef} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {Model} from '@dino/core/data';
import {BehaviorSubject, Observable, of as obsOf, of} from 'rxjs';

import {AdminUserInteractionsService, List, ListAction} from './public_api';

const authServiceConfig: AuthServiceConfig = {
  host: 'http://test-auth-backend',
  applicationId: 'applicationId',
  apiKey: 'apiKey',
  retryRefreshTime: 5000,
  retryAttemptsMax: 1,
  failedAuthRedirect: 'login',
};

const authServiceMock = {
  authenticated: of(true),
  authToken: of('test_auth_token'),
  getUserInfo: () => {
    return {};
  },
  _authConfig: new BehaviorSubject<AuthServiceConfig>(authServiceConfig),
  authConfig: authServiceConfig,
} as unknown as AuthService;

const changeDetectorRefMock = {
  markForCheck() {},
};

const fakeActivatedRoute = {
  params: obsOf(null),
  data: obsOf(null),
  snapshot: {},
} as unknown as ActivatedRoute;

class AdminUIService extends AdminUserInteractionsService {
  askConfirm(_action: ListAction): Observable<boolean> {
    return obsOf(true);
  }
}

interface DummyModel extends Model {
  name: string;
}

const dummySelection: DummyModel[] = [
  {id: '1', name: 'DummyA', created_at: '', updated_at: ''},
  {id: '2', name: 'DummyB', created_at: '', updated_at: ''},
];

const adminUIService = new AdminUIService();

class ListFeatComp extends List<DummyModel> {
  constructor(cdr: ChangeDetectorRef, aui: AdminUIService, actroute: ActivatedRoute) {
    super(cdr, aui, actroute);
  }

  createAction(_schemaId: string, _baseUrl: string) {}
  viewAction(_item: DummyModel, _isDetails: boolean): void {}
  getSelection() {
    return dummySelection;
  }
  getItems() {
    return [];
  }
  clearSelection() {}
  selectAll() {}
  refreshList() {}
  deleteAction(items: DummyModel[]) {
    return items;
  }
  editAction(_item: DummyModel, _isDetails: boolean = false) {}
}

describe('Core ListComponent', () => {
  let cdr: ChangeDetectorRef;
  let aui: AdminUIService;
  let actRoute: ActivatedRoute;
  let listFeatComp: ListFeatComp;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        {provide: ChangeDetectorRef, useValue: changeDetectorRefMock},
        {provide: AdminUIService, useValue: adminUIService},
        {provide: AuthService, useValue: authServiceMock},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
      ],
    });
    cdr = TestBed.inject(ChangeDetectorRef);
    aui = TestBed.inject(AdminUIService);
    actRoute = TestBed.inject(ActivatedRoute);
    listFeatComp = new ListFeatComp(cdr, aui, actRoute);
  });

  it('should retrieve and call the correct Action Handler method name', () => {
    const spyAction = spyOn(listFeatComp, 'deleteAction').and.callThrough();
    const action: ListAction = {actionType: 'delete', askConfirm: true};
    listFeatComp.processAction(action, dummySelection);

    expect(spyAction).toHaveBeenCalled();
  });
});
