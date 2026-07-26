import {provideHttpClientTesting} from '@angular/common/http/testing';
import {EventEmitter} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {DATA_SERVICE_CONFIG, DataModelManager, DataServiceConfig, Model} from '@dino/core/data';
import {FormSchemaManager, FormStatusManager} from '@dino/core/forms';
import {UserData, UserDataManager} from '@dino/core/users';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';
import {RxDocument} from 'rxdb';
import {NEVER, BehaviorSubject, of} from 'rxjs';

import {CreateForm, CreateFormModule} from './public_api';
import {UI_TOUR_SERVICE_CONFIG} from '@dino/material/ui-tour-service';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideRouter} from '@angular/router';

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
  // Never resumes in tests: this is not a foregrounded browser tab.
  appResumed: NEVER,
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

describe('Create Form', () => {
  let fsm: FormSchemaManager;
  let fixtureCreateForm: ComponentFixture<CreateForm>;
  let createForm: CreateForm;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, CreateFormModule],
      providers: [
        FormSchemaManager,
        FormStatusManager,
        {provide: UserDataManager, useValue: userDataManagerMock},
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {provide: UI_TOUR_SERVICE_CONFIG, useValue: undefined},
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    fsm = TestBed.inject(FormSchemaManager);
    fixtureCreateForm = TestBed.createComponent(CreateForm);
    createForm = fixtureCreateForm.componentInstance;
  });

  it('should create the component', async () => {
    await fixtureCreateForm.whenStable();
    createForm.dataModelManager = fsm as unknown as DataModelManager<Model>;
    fixtureCreateForm.detectChanges();

    expect(createForm).toBeTruthy();
    expect(fsm).toBeTruthy();
  });

  it('should call the save event and then the "getFilesInForm" method of uploadService with action "draft"', async () => {
    await fixtureCreateForm.whenStable();
    createForm.dataModelManager = fsm as unknown as DataModelManager<Model>;
    const saveDraftUploadSpy = spyOn(createForm.uploadService, 'getFilesInForm').and.callThrough();
    fixtureCreateForm.detectChanges();

    createForm.saveDraft();

    expect(saveDraftUploadSpy).toHaveBeenCalledTimes(1);
  });
});
