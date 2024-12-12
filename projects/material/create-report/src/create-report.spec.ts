import {HttpClientTestingModule} from '@angular/common/http/testing';
import {EventEmitter} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {
  DATA_SERVICE_CONFIG,
  DataServiceConfig,
  PANDINO_SERVICE_CONFIG,
  PandinoConfig,
} from '@dino/core/data';
import {ReportsModule} from '@dino/core/reports';
import {UserData, UserDataManager} from '@dino/core/users';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';
import {RxDocument} from 'rxdb';
import {BehaviorSubject, of} from 'rxjs';

import {CreateReport, CreateReportModule} from './public_api';

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

let testDbIdx = 0;

const dummyUserData: RxDocument<UserData> = {
  id: 'dino_user_id',
  email: 'user@dino.gnu',
  full_name: 'dino_user',
  user_group_ids: ['1', '2', '3'],
  created_at: '',
  updated_at: '',
} as RxDocument<UserData>;

const userDataManagerMock = {
  getActiveUserData: () => of(dummyUserData),
} as unknown as UserDataManager;

function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dino_datamanager_test_db_${testDbIdx++}`,
      storage: getRxStorageMemory(),
    },
    syncOptions: {
      collection: null,
      replicationIdentifier: 'test-replication',
      url: {http: 'host'},
    },
  };
}

const pandinoConfig: PandinoConfig = {
  pandinoUrl: '',
  pandinoGptNamespaces: [],
};

describe('Create Report', () => {
  let fixtureCreateReport: ComponentFixture<CreateReport>;
  let createReport: CreateReport;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReportsModule, CreateReportModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: UserDataManager, useValue: userDataManagerMock},
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {provide: PANDINO_SERVICE_CONFIG, useValue: pandinoConfig},
      ],
    }).compileComponents();

    fixtureCreateReport = TestBed.createComponent(CreateReport);
    createReport = fixtureCreateReport.componentInstance;
  });

  it('should create the component', async () => {
    await fixtureCreateReport.whenStable();
    fixtureCreateReport.detectChanges();

    expect(createReport).toBeTruthy();
  });
});
