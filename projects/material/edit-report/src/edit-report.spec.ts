import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ReportsModule} from '@dino/core/reports';
import * as pouchdbAdapterMemory from 'pouchdb-adapter-memory';
import {addPouchPlugin, getRxStoragePouch} from 'rxdb/plugins/pouchdb';
import {BehaviorSubject, of} from 'rxjs';

import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from '@dino/core/data';
import {FormSchemaManager, FormsModule} from '@dino/core/forms';

import {EditReport, EditReportModule} from './public_api';
import {EventEmitter} from '@angular/core';

let testDbIdx = 0;

addPouchPlugin(pouchdbAdapterMemory);
function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dino_datamanager_test_db_${testDbIdx++}`,
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
  authenticated: of({auth: true, evt: 'init'}),
  authToken: of('test_auth_token'),
  getUserInfo: () => {
    return {};
  },
  resetEvt: of(false),
  logout: () => of(false),
  logoutEvt: new EventEmitter<void>(),
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
