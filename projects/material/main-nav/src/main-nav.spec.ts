import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  DATA_SERVICE_CONFIG,
  DataServiceConfig,
  PANDINO_SERVICE_CONFIG,
  PandinoConfig,
} from '@dino/core/data';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';
import {BehaviorSubject, of} from 'rxjs';
import {UsersModule} from '@dino/core/users';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {MainNav, MainNavModule} from './public_api';
import {TranslationsConfig, TRANSLATIONS_CONFIG} from '@dino/core/translations';
import {EventEmitter} from '@angular/core';
import {ThemeService} from '@dino/material/core';
import {NotificationModule} from '@dino/core/notifications';
import {STRIPE_PAYMENT_CONFIG, StripePaymentConfig} from '@dino/material/stripe-payment';
import {UI_TOUR_SERVICE_CONFIG, UITourConfig} from '@dino/material/ui-tour-service';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

let testDbIdx = 0;

const serverUrl = 'http://dinoServer/v1/graphql';
const wsServerUrl = 'ws://dinoServer';
const wsUrl = `${wsServerUrl}/v1/graphql`;

const dataServiceConfig: DataServiceConfig = {
  databaseCreateOptions: {
    name: `dino_data_test_db_${testDbIdx++}`,
    storage: getRxStorageMemory(),
    ignoreDuplicate: true,
  },
  syncOptions: {
    collection: null,
    replicationIdentifier: 'test-replication',
    url: {http: serverUrl, ws: wsUrl},
    webSocketImpl: WebSocket,
    authErrorMessage: 'Could not verify JWT: JWTExpired',
  },
};

const stripePaymentConfig: StripePaymentConfig = {
  stripeKey: '',
  gnuPayUrl: '',
  pandinoTokenID: '',
};

const pandinoConfig: PandinoConfig = {
  pandinoUrl: '',
  pandinoGptNamespaces: [],
};

const uiTourConfig: UITourConfig = {
  tourActive: false,
  tourSteps: [],
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
  authenticated: of({auth: true, evt: 'init'}),
  authToken: of('test_auth_token'),
  getUserInfo: () => {
    return {};
  },
  logout: () => of(false),
  resetEvt: of(false),
  logoutEvt: new EventEmitter<void>(),
  _authConfig: new BehaviorSubject<AuthServiceConfig>(authServiceConfig),
  authConfig: authServiceConfig,
} as unknown as AuthService;

const themeServiceMock = {
  darkModeChange: new EventEmitter<boolean>(),
  isDark: () => false,
  setDarkMode: () => {},
} as unknown as ThemeService;

describe('Main', () => {
  let fixtureMain: ComponentFixture<MainNav>;
  let main: MainNav;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MainNavModule, NotificationModule, UsersModule],
      providers: [
        {provide: ThemeService, useValue: themeServiceMock},
        {provide: AuthService, useValue: authServiceMock},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig},
        {provide: TRANSLATIONS_CONFIG, useValue: defaultLanguageConfig},
        {provide: STRIPE_PAYMENT_CONFIG, useValue: stripePaymentConfig},
        {provide: PANDINO_SERVICE_CONFIG, useValue: pandinoConfig},
        {provide: UI_TOUR_SERVICE_CONFIG, useValue: uiTourConfig},
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
    authService = TestBed.inject(AuthService);
    fixtureMain = TestBed.createComponent(MainNav);
    main = fixtureMain.componentInstance;
  });

  it('should create the component', async () => {
    fixtureMain.detectChanges();

    expect(main).toBeTruthy();
  });

  it('should ask the authservice to log the user out, then open a snackbar message', async () => {
    let logoutSpy = spyOn(authService, 'logout').and.callThrough();
    let snackbarSpy = spyOn(main.snackbar, 'open').and.callThrough();

    fixtureMain.detectChanges();

    main.logout(false);

    expect(logoutSpy).toHaveBeenCalled();
    expect(snackbarSpy).toHaveBeenCalled();
  });
});
