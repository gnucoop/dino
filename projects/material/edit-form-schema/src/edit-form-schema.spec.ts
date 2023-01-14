import {EventEmitter} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService, AuthServiceConfig} from '@dino/core/auth';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from '@dino/core/data';
import {FormSchemaManager, FormStatusManager} from '@dino/core/forms';
import {getRxStorageMemory} from 'rxdb/plugins/memory';
import {BehaviorSubject, of} from 'rxjs';

import {EditFormSchema, EditFormSchemaModule} from './public_api';

let testDbIdx = 0;

function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dino_datamanager_test_db_${testDbIdx++}`,
      storage: getRxStorageMemory(),
    },
    syncOptions: {
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

describe('Edit FormSchema', () => {
  let fixtureEditFormSchema: ComponentFixture<EditFormSchema>;
  let editFormSchema: EditFormSchema;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        EditFormSchemaModule,
        RouterTestingModule,
        MatDialogModule,
      ],
      providers: [
        FormSchemaManager,
        FormStatusManager,
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
      ],
    }).compileComponents();

    fixtureEditFormSchema = TestBed.createComponent(EditFormSchema);
    editFormSchema = fixtureEditFormSchema.componentInstance;
  });

  it('should create the component', async () => {
    await fixtureEditFormSchema.whenStable();
    fixtureEditFormSchema.detectChanges();

    expect(editFormSchema).toBeTruthy();
  });
});
