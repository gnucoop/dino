import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StripePaymentModule} from './stripe-payment.module';
import {StripeCheckout} from './stripe-checkout';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {NEVER, BehaviorSubject, of} from 'rxjs';
import {EventEmitter} from '@angular/core';
import {DATA_SERVICE_CONFIG, DataServiceConfig, Model} from '@dino/core/data';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';
import {RxJsonSchema} from 'rxdb';
import {STRIPE_PAYMENT_CONFIG, StripePaymentConfig} from './stripe-payment-config';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {StripePaymentData} from './stripe-payment-data-interface';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

let testDbIdx = 0;

const collectionName = 'dummymodel';
interface DummyModel extends Model {
  name: string;
  age?: number;
  author?: string;
}
const dummySchema: RxJsonSchema<DummyModel> = {
  title: 'dummy schema',
  version: 0,
  description: 'describe a dummy model',
  type: 'object',
  primaryKey: 'id',
  properties: {
    id: {type: 'string', maxLength: 200},
    name: {type: 'string', maxLength: 200},
    age: {type: 'number'},
    author: {type: 'string'},
    created_at: {type: 'string'},
    updated_at: {type: ['string', 'null']},
    is_deleted: {type: 'boolean'},
    _deleted: {type: 'boolean'},
  },
  indexes: ['name'],
};
const collection = {name: collectionName, collection: {schema: dummySchema}};

function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dino_datamanager_test_db_${testDbIdx++}`,
      storage: getRxStorageMemory(),
    },
    syncOptions: {
      collection,
      url: {http: 'host'},
      replicationIdentifier: 'test-replication',
    },
  };
}

const stripePaymentConfig: StripePaymentConfig = {
  stripeKey: '',
  gnuPayUrl: '',
  pandinoTokenID: '',
};

const mockDialogRef = {
  close: (_: any) => of(null),
  open: () => of(null),
  backdropClick: () => of(null),
};

const mockDialogData: StripePaymentData = {
  mode: 'stripe-checkout',
  info: {},
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

describe('Stripe Checkout', () => {
  let fixtureStripeCheckout: ComponentFixture<StripeCheckout>;
  let stripeCheckout: StripeCheckout;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, StripePaymentModule],
      providers: [
        {provide: MatDialogRef, useValue: mockDialogRef},
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {provide: STRIPE_PAYMENT_CONFIG, useValue: stripePaymentConfig},
        {provide: MAT_DIALOG_DATA, useValue: mockDialogData},
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixtureStripeCheckout = TestBed.createComponent(StripeCheckout);
    stripeCheckout = fixtureStripeCheckout.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.expectOne('/create-checkout-session');
  });

  it('should create the component', async () => {
    await fixtureStripeCheckout.whenStable();
    fixtureStripeCheckout.detectChanges();

    expect(stripeCheckout).toBeTruthy();
  });
});
