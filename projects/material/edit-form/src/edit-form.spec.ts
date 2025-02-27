import {provideHttpClientTesting} from '@angular/common/http/testing';
import {EventEmitter} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {DATA_SERVICE_CONFIG, DataModelManager, DataServiceConfig, Model} from '@dino/core/data';
import {FormSchemaManager} from '@dino/core/forms';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';
import {BehaviorSubject, of} from 'rxjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {EditForm, EditFormModule} from './public_api';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideRouter} from '@angular/router';

let testDbIdx = 0;

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

describe('Edit Form', () => {
  let fsm: FormSchemaManager;
  let fixtureEditForm: ComponentFixture<EditForm>;
  let editForm: EditForm;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, EditFormModule],
      providers: [
        FormSchemaManager,
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    fsm = TestBed.inject(FormSchemaManager);
    fixtureEditForm = TestBed.createComponent(EditForm);
    editForm = fixtureEditForm.componentInstance;
  });

  it('should create the component', async () => {
    await fixtureEditForm.whenStable();
    editForm.dataModelManager = fsm as unknown as DataModelManager<Model>;
    fixtureEditForm.detectChanges();

    expect(editForm).toBeTruthy();
    expect(fsm).toBeTruthy();
  });
});
