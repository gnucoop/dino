import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import * as pouchdbAdapterMemory from 'pouchdb-adapter-memory';
import {addPouchPlugin, getRxStoragePouch} from 'rxdb/plugins/pouchdb';
import {BehaviorSubject, of} from 'rxjs';

import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '../../core/auth';
import {DATA_SERVICE_CONFIG, DataModelManager, DataServiceConfig, Model} from '../../core/data';
import {FormSchemaManager} from '../../core/forms';

import {EditForm, EditFormModule} from './index';

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

describe('Edit Form', () => {
  let fsm: FormSchemaManager;
  let fixtureEditForm: ComponentFixture<EditForm>;
  let editForm: EditForm;

  beforeEach(() => {
    TestBed
        .configureTestingModule({
          imports: [
            EditFormModule,
            HttpClientTestingModule,
            RouterTestingModule,
          ],
          providers: [
            FormSchemaManager,
            {provide: AuthService, useValue: authServiceMock},
            {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
            {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
          ],
        })
        .compileComponents();

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
