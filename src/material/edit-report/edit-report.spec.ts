import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ReportsModule} from '@dewco/core/reports';
import * as pouchdbAdapterMemory from 'pouchdb-adapter-memory';
import {addPouchPlugin, getRxStoragePouch} from 'rxdb/plugins/pouchdb';
import {BehaviorSubject, of} from 'rxjs';

import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dewco/core/auth';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from '@dewco/core/data';
import {FormSchemaManager, FormsModule} from '@dewco/core/forms';

import {EditReport, EditReportModule} from './index';

let testDbIdx = 0;

addPouchPlugin(pouchdbAdapterMemory);
function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dewco_datamanager_test_db_${testDbIdx++}`,
      storage: getRxStoragePouch('memory'),
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
  authToken: of('test_auth_token'),
  getUserInfo: () => {
    return {};
  },
  resetEvt: of(false),
  _authConfig: new BehaviorSubject<AuthServiceConfig>(authServiceConfig),
  authConfig: authServiceConfig,
} as unknown as AuthService;

describe('Edit Report', () => {
  let fixtureEditReport: ComponentFixture<EditReport>;
  let editReport: EditReport;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReportsModule,
        EditReportModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        FormSchemaManager,
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
      ],
    }).compileComponents();

    fixtureEditReport = TestBed.createComponent(EditReport);
    editReport = fixtureEditReport.componentInstance;
  });

  it('should create the component', async () => {
    await fixtureEditReport.whenStable();
    fixtureEditReport.detectChanges();

    expect(editReport).toBeTruthy();
  });
});
