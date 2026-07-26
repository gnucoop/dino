import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReportsModule} from '@dino/core/reports';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';
import {NEVER, BehaviorSubject, of} from 'rxjs';

import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {
  DATA_SERVICE_CONFIG,
  DataServiceConfig,
  PANDINO_SERVICE_CONFIG,
  PandinoConfig,
} from '@dino/core/data';
import {FormSchemaManager, FormsModule} from '@dino/core/forms';

import {EditReport, EditReportModule} from './public_api';
import {EventEmitter} from '@angular/core';
import {STRIPE_PAYMENT_CONFIG, StripePaymentConfig} from '@dino/material/stripe-payment';
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

const stripePaymentConfig: StripePaymentConfig = {
  stripeKey: '',
  gnuPayUrl: '',
  pandinoTokenID: '',
};

const pandinoConfig: PandinoConfig = {
  pandinoUrl: '',
  pandinoGptNamespaces: [],
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

describe('Edit Report', () => {
  let fixtureEditReport: ComponentFixture<EditReport>;
  let editReport: EditReport;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReportsModule, EditReportModule],
      providers: [
        FormSchemaManager,
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {provide: STRIPE_PAYMENT_CONFIG, useValue: stripePaymentConfig},
        {provide: PANDINO_SERVICE_CONFIG, useValue: pandinoConfig},
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([]),
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
