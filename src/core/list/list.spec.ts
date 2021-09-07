import {ChangeDetectorRef} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {Model} from '@dewco/core/data';
import {BehaviorSubject, Observable, of as obsOf, of} from 'rxjs';

import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '../auth';

import {List} from './list';
import {ListAction} from './list-actions-interface';
import {AdminUserInteractionsService} from './user-interactions';

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
  getUserInfo: () => {
    return {};
  },
  _authConfig: new BehaviorSubject<AuthServiceConfig>(authServiceConfig),
  authConfig: authServiceConfig,
} as unknown as AuthService;

const changeDetectorRefMock = {
  markForCheck() {}
};

class AdminUIService extends AdminUserInteractionsService {
  askConfirm(action: ListAction): Observable<boolean> {
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
  constructor(
      cdr: ChangeDetectorRef,
      aui: AdminUIService,
  ) {
    super(cdr, aui);
  }

  createAction(schemaId: string, isFormData: boolean) {}
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
  editAction(item: DummyModel, isDetails: boolean = false) {}
}

describe('Core ListComponent', () => {
  let cdr: ChangeDetectorRef;
  let aui: AdminUIService;
  let listFeatComp: ListFeatComp;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ChangeDetectorRef, useValue: changeDetectorRefMock},
        {provide: AdminUIService, useValue: adminUIService},
        {provide: AuthService, useValue: authServiceMock},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
      ],
    });
    cdr = TestBed.inject(ChangeDetectorRef);
    aui = TestBed.inject(AdminUIService);
    listFeatComp = new ListFeatComp(cdr, aui);
  });

  it('should retrieve and call the correct Action Handler method name', () => {
    const spyAction = spyOn(listFeatComp, 'deleteAction').and.callThrough();
    const action: ListAction = {actionType: 'delete', askConfirm: true};
    listFeatComp.processAction(action, dummySelection);

    expect(spyAction).toHaveBeenCalled();
  });
});
