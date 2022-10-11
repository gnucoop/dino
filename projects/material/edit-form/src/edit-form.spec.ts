import {HttpClientTestingModule} from '@angular/common/http/testing';
import {EventEmitter} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {DATA_SERVICE_CONFIG, DataModelManager, DataServiceConfig, Model} from '@dino/core/data';
import {FormSchemaManager} from '@dino/core/forms';
import * as pouchdbAdapterMemory from 'pouchdb-adapter-memory';
import {addPouchPlugin, getRxStoragePouch} from 'rxdb/plugins/pouchdb';
import {BehaviorSubject, of} from 'rxjs';

import {EditForm, EditFormModule} from './public_api';

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

describe('Edit Form', () => {
  let fsm: FormSchemaManager;
  let fixtureEditForm: ComponentFixture<EditForm>;
  let editForm: EditForm;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditFormModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        FormSchemaManager,
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
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
