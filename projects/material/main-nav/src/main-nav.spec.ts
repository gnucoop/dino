import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from '@dino/core/data';
import * as pouchdbAdapterMemory from 'pouchdb-adapter-memory';
import {addPouchPlugin, getRxStoragePouch} from 'rxdb';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {UsersModule} from '@dino/core/users';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';

import {MainNav, MainNavModule} from './public_api';
import {TranslationsConfig, TRANSLATIONS_CONFIG} from '@dino/core/translations';

let testDbIdx = 0;

const serverUrl = 'http://dinoServer/v1/graphql';
const wsServerUrl = 'ws://dinoServer';
const wsUrl = `${wsServerUrl}/v1/graphql`;

addPouchPlugin(pouchdbAdapterMemory);
const dataServiceConfig: DataServiceConfig = {
  databaseCreateOptions: {
    name: `dino_data_test_db_${testDbIdx++}`,
    storage: getRxStoragePouch('memory'),
    ignoreDuplicate: true,
  },
  syncOptions: {
    url: serverUrl,
    wsUrl,
    webSocketImpl: WebSocket,
    authErrorMessage: 'Could not verify JWT: JWTExpired',
  },
};

const authServiceConfig: AuthServiceConfig = {
  host: 'http://test-auth-backend',
  applicationId: 'applicationId',
  apiKey: 'apiKey',
  retryRefreshTime: 5000,
  retryAttemptsMax: 1,
  failedAuthRedirect: 'login',
};

export const defaultLanguageConfig: TranslationsConfig = {
  defaultLanguage: 'ENG',
};

const authServiceMock = {
  authenticated: of(true),
  authToken: of('test_auth_token'),
  getUserInfo: () => {
    return {};
  },
  logout(): Observable<boolean> {
    return of(true);
  },
  resetEvt: of(false),
  _authConfig: new BehaviorSubject<AuthServiceConfig>(authServiceConfig),
  authConfig: authServiceConfig,
} as unknown as AuthService;

describe('Main', () => {
  let fixtureMain: ComponentFixture<MainNav>;
  let main: MainNav;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MainNavModule,
        HttpClientTestingModule,
        RouterTestingModule,
        UsersModule,
      ],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig},
        {provide: TRANSLATIONS_CONFIG, useValue: defaultLanguageConfig},
      ],
    }).compileComponents();
    authService = TestBed.inject(AuthService);
    fixtureMain = TestBed.createComponent(MainNav);
    main = fixtureMain.componentInstance;
  });

  it('should create the component', async () => {
    await fixtureMain.whenStable();
    fixtureMain.detectChanges();

    expect(main).toBeTruthy();
  });

  it('should ask the authservice to log the user out, then open a snackbar message', async () => {
    let logoutSpy = spyOn(authService, 'logout').and.callThrough();
    let snackbarSpy = spyOn(main.snackbar, 'open').and.callThrough();

    await fixtureMain.whenStable();
    fixtureMain.detectChanges();

    main.logout(false);

    expect(logoutSpy).toHaveBeenCalled();
    expect(snackbarSpy).toHaveBeenCalled();
  });
});
