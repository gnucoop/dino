import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataChatModule} from './datachat.module';
import {DataChat} from './datachat';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {BehaviorSubject, of} from 'rxjs';
import {EventEmitter} from '@angular/core';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from '@dino/core/data';
import {getRxStorageMemory} from 'rxdb/plugins/memory';

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

describe('Data Chat', () => {
  let fixtureDataChat: ComponentFixture<DataChat>;
  let dataChat: DataChat;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        DataChatModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
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
    expect(reqHeaders.keys()).toEqual(['X-API-KEY']);
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
