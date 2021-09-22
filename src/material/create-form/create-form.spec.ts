import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BehaviorSubject, of} from 'rxjs';

import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '../../core/auth';
import {DATA_SERVICE_CONFIG, DataModelManager, DataServiceConfig, Model} from '../../core/data';
import {FormSchemaManager} from '../../core/forms';

import {CreateForm, CreateFormModule} from './index';

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
  resetEvt: of(false),
  _authConfig: new BehaviorSubject<AuthServiceConfig>(authServiceConfig),
  authConfig: authServiceConfig,
} as unknown as AuthService;

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

describe('Create Form', () => {
  let fsm: FormSchemaManager;
  let fixtureCreateForm: ComponentFixture<CreateForm>;
  let createForm: CreateForm;

  beforeEach(() => {
    TestBed
        .configureTestingModule({
          imports: [
            CreateFormModule,
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
});
