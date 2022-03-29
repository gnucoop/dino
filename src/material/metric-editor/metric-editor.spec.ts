import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthServiceConfig, AUTH_SERVICE_CONFIG} from '@dino/core/auth';
import {UserGroup, UserGroupManager} from '@dino/core/users';
import {RxDocument} from 'rxdb';
import {Observable, of} from 'rxjs';

import {AreaManager} from '../../core/areas';
import {DataService, Metric, PermissionContextService} from '../../core/data';

import {MetricEditor, MetricEditorModule} from './index';

const authServiceConfig: AuthServiceConfig = {
  host: 'http://test-auth-backend',
  applicationId: 'applicationId',
  apiKey: 'apiKey',
  retryRefreshTime: 5000,
  retryAttemptsMax: 1,
  failedAuthRedirect: 'login',
};

const dataServiceMock = {
  createCollection: () => of(true),
  find: () => of({exec: () => Promise.resolve({})}),
} as unknown as DataService;

const userGroupManagerMock = {
  getActiveUserGroups: () => of([]),
  addToContext: (_: {[key: string]: any}): void => {},
  update: (_: UserGroup): Observable<RxDocument<UserGroup, {}> | null> => of(null),
} as unknown as UserGroupManager;

const permissionContextServiceMock = {} as PermissionContextService;

const mockDialogRef = {
  close: () => of(null),
  open: () => of(null),
  backdropClick: () => of(null),
};

const mockMetric: Metric = {
  name: 'mockMetric',
  id: '',
  created_at: '',
  updated_at: '',
  parent_id: null,
  parent_name: null,
};

describe('Metric Editor', () => {
  let fixtureEditor: ComponentFixture<MetricEditor>;
  let editor: MetricEditor;
  let userGroupManager: UserGroupManager;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MetricEditorModule,
        RouterTestingModule,
        MatDialogModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {provide: UserGroupManager, useValue: userGroupManagerMock},
        {provide: MatDialogRef, useValue: mockDialogRef},
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            metricManager: new AreaManager(dataServiceMock, permissionContextServiceMock),
            metricItem: mockMetric,
            metricAction: 'edit',
          },
        },
      ],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    userGroupManager = TestBed.inject(UserGroupManager);
    fixtureEditor = TestBed.createComponent<MetricEditor>(MetricEditor);
    editor = fixtureEditor.componentInstance;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', async () => {
    await fixtureEditor.whenStable();
    fixtureEditor.detectChanges();

    expect(editor).toBeTruthy();
  });
});
