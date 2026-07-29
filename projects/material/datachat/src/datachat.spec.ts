import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataChatModule} from './datachat.module';
import {DataChat} from './datachat';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {BehaviorSubject, of} from 'rxjs';
import {EventEmitter} from '@angular/core';
import {
  DATA_SERVICE_CONFIG,
  DataServiceConfig,
  Model,
  PANDINO_SERVICE_CONFIG,
  PandinoConfig,
} from '@dino/core/data';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';
import {RxJsonSchema} from 'rxdb';
import {STRIPE_PAYMENT_CONFIG, StripePaymentConfig} from '@dino/material/stripe-payment';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideRouter} from '@angular/router';

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
  getUserInfo: () => {
    return {id: '1', email: 'test@test.com'};
  },
  resetEvt: of(false),
  logout: () => of(false),
  logoutEvt: new EventEmitter<void>(),
  tokenRefreshedEvt: new EventEmitter<void>(),
  hasValidAuthToken: () => true,
  _authConfig: new BehaviorSubject<AuthServiceConfig>(authServiceConfig),
  authConfig: authServiceConfig,
} as unknown as AuthService;

describe('Data Chat', () => {
  let fixtureDataChat: ComponentFixture<DataChat>;
  let dataChat: DataChat;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, DataChatModule],
      providers: [
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

    fixtureDataChat = TestBed.createComponent(DataChat);
    dataChat = fixtureDataChat.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the component', async () => {
    await fixtureDataChat.whenStable();
    fixtureDataChat.detectChanges();

    expect(dataChat).toBeTruthy();
  });

  it('should send a post request to validate the API key', async () => {
    await fixtureDataChat.whenStable();
    fixtureDataChat.detectChanges();

    dataChat.baseDataChatAPIurl = 'http://127.0.0.1:5000';

    dataChat.sendAPIKey('key_code');

    const req = httpTestingController.expectOne('http://127.0.0.1:5000/validateapikey');
    const reqHeaders = req.request.headers;
    expect(req.request.method).toEqual('POST');
    expect(reqHeaders.keys()).toEqual(['X-API-KEY', 'X-USER-EMAIL']);
  });

  it('should add a chat question to the chat history', async () => {
    await fixtureDataChat.whenStable();
    fixtureDataChat.detectChanges();
    let addHistorySpy = spyOn<any>(dataChat, '_addToHistory').and.callThrough();

    dataChat.chat('test_question');
    await fixtureDataChat.whenStable();
    fixtureDataChat.detectChanges();

    expect(addHistorySpy).toHaveBeenCalledWith({question: 'test_question'});
    expect(dataChat.history.length).toEqual(1);
  });
});
