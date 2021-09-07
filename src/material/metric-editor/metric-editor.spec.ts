import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {AreaManager} from '@dewco/core/areas';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig, Credentials} from '@dewco/core/auth';
import {
  DATA_SERVICE_CONFIG,
  DataService,
  DataServiceConfig,
  Metric,
  PermissionContextService
} from '@dewco/core/data';
import {Observable, of} from 'rxjs';

import {MetricEditor} from './metric-editor';
import {MetricEditorModule} from './metric-editor.module';

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
} as AuthService;

const dataServiceMock = {
  createCollection: () => of(true)
} as unknown as DataService;

const permissionContextServiceMock = {

} as PermissionContextService;

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
};

describe('Metric Editor', () => {
  let fixtureEditor: ComponentFixture<MetricEditor>;
  let editor: MetricEditor;
  let dialogRef: MatDialogRef<Metric>;
  let areaManager: AreaManager;
  let authService: AuthService;
  let dataService: DataService;
  let permissionContextService: PermissionContextService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed
        .configureTestingModule({
          imports: [
            HttpClientTestingModule,
            MetricEditorModule,
            RouterTestingModule,
            MatDialogModule,
            BrowserAnimationsModule,
          ],
          providers: [
            AreaManager,
            {provide: MatDialogRef, useValue: mockDialogRef},
            {provide: AuthService, useValue: authServiceMock},
            {provide: DataService, useValue: dataServiceMock},
            {provide: PermissionContextService, useValue: permissionContextServiceMock},
            {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
            {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
            {
              provide: MAT_DIALOG_DATA,
              useValue: {
                metricManager: new AreaManager(dataServiceMock, permissionContextServiceMock),
                metricItem: mockMetric,
                metricAction: 'edit',
              }
            },
          ],
        })
        .compileComponents();
    authService = TestBed.inject(AuthService);
    dataService = TestBed.inject(DataService);
    permissionContextService = TestBed.inject(PermissionContextService);
    httpMock = TestBed.inject(HttpTestingController);
    dialogRef = TestBed.inject(MatDialogRef);
    areaManager = TestBed.inject(AreaManager);
    fixtureEditor = TestBed.createComponent<MetricEditor>(MetricEditor);
    editor = fixtureEditor.componentInstance;
  });

  it('should create the component', async () => {
    await fixtureEditor.whenStable();
    fixtureEditor.detectChanges();

    expect(editor).toBeTruthy();
  });
});
