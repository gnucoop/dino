import {HttpClientTestingModule} from '@angular/common/http/testing';
import {EventEmitter} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from '@dino/core/data';
import {FormSchemaManager} from '@dino/core/forms';
import {getRxStorageMemory} from 'rxdb/plugins/memory';
import {BehaviorSubject, of} from 'rxjs';

import {DataChat, DataChatModule} from './public_api';

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

describe('Edit Form', () => {
  let fsm: FormSchemaManager;
  let fixtureDataChat: ComponentFixture<DataChat>;
  let dataChat: DataChat;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DataChatModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        FormSchemaManager,
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
      ],
    }).compileComponents();

    fsm = TestBed.inject(FormSchemaManager);
    fixtureDataChat = TestBed.createComponent(DataChat);
    dataChat = fixtureDataChat.componentInstance;
  });

  it('should create the component', async () => {
    await fixtureDataChat.whenStable();
    fixtureDataChat.detectChanges();

    expect(dataChat).toBeTruthy();
    expect(fsm).toBeTruthy();
  });
});
