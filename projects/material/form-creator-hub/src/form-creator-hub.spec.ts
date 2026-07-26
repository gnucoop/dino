import {EventEmitter} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AuthService, AuthServiceConfig} from '@dino/core/auth';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from '@dino/core/data';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';
import {NEVER, BehaviorSubject, of} from 'rxjs';

import {FormCreatorHub, FormCreatorHubModule} from './public_api';
import {MatDialogRef} from '@angular/material/dialog';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {MatButtonToggleChange} from '@angular/material/button-toggle';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

let testDbIdx = 0;

function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dino_datamanager_test_db_${testDbIdx++}`,
      storage: getRxStorageMemory(),
    },
    syncOptions: {
      collection:null,
      replicationIdentifier: 'test-replication',
      url: {http: 'host'},
    },
  };
}

const mockDialogRef = {
  close: (_: any) => of(null),
  open: () => of(null),
  backdropClick: () => of(null),
};

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

describe('Form Creator Hub', () => {
  let fixtureFormCreatorHub: ComponentFixture<FormCreatorHub>;
  let formCreatorHub: FormCreatorHub;
  let dialogRef: MatDialogRef<FormCreatorHub>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [FormCreatorHubModule],
    providers: [
        {provide: MatDialogRef, useValue: mockDialogRef},
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
}).compileComponents();
    dialogRef = TestBed.inject(MatDialogRef<FormCreatorHub>);
    fixtureFormCreatorHub = TestBed.createComponent(FormCreatorHub);
    formCreatorHub = fixtureFormCreatorHub.componentInstance;
  });

  it('should create the component', async () => {
    await fixtureFormCreatorHub.whenStable();
    fixtureFormCreatorHub.detectChanges();

    expect(formCreatorHub).toBeTruthy();
  });

  it('should select a schema id the component, then close the dialog returning the chosen schema id', async () => {
    await fixtureFormCreatorHub.whenStable();
    const dialogCloseSpy = spyOn(dialogRef, 'close').and.callThrough();
    fixtureFormCreatorHub.detectChanges();

    const toggleSchemaEvent = {value: 'schema_id'} as unknown as MatButtonToggleChange;
    formCreatorHub.selectSchema(toggleSchemaEvent);
    formCreatorHub.createForm();

    expect(dialogCloseSpy).toHaveBeenCalledWith('schema_id');
  });
});
