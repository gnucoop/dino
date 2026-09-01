import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {
  DATA_SERVICE_CONFIG,
  DataService,
  DataServiceConfig,
  PANDINO_SERVICE_CONFIG,
  PandinoConfig,
} from '@dino/core/data';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';
import {BehaviorSubject, of} from 'rxjs';
import {UsersModule} from '@dino/core/users';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {MainNav, MainNavModule, SessionDialogData, SessionDialogResult} from './public_api';
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
  endSession: () => {},
  refreshToken: () => of(false),
  hasValidAuthToken: () => false,
  resetEvt: of(false),
  logoutEvt: new EventEmitter<void>(),
  _authConfig: new BehaviorSubject<AuthServiceConfig>(authServiceConfig),
  authConfig: authServiceConfig,
} as unknown as AuthService;

const themeServiceMock = {} as unknown as ThemeService;

describe('Main', () => {
  let fixtureMain: ComponentFixture<MainNav>;
  let main: MainNav;
  let authService: AuthService;
  let dataService: DataService;
  let openSpy: jasmine.Spy;

  /**
   * Answers the next session dialog with `choice`, without opening anything.
   * @param choice What the user is supposed to have decided
   * @returns The spy on the dialog, to assert what was asked
   */
  const answerDialog = (choice: SessionDialogResult): jasmine.Spy => {
    openSpy = spyOn(main.dialog, 'open').and.returnValue({
      afterClosed: () => of(choice),
    } as MatDialogRef<unknown>);
    return openSpy;
  };

  /**
   * @returns The `kind` the dialog was opened with.
   */
  const askedAbout = (): string | undefined =>
    (openSpy.calls.mostRecent()?.args[1] as MatDialogConfig<SessionDialogData> | undefined)?.data
      ?.kind;

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
    dataService = TestBed.inject(DataService);
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
    answerDialog('logout');

    main.logout(false);

    expect(logoutSpy).toHaveBeenCalled();
    expect(snackbarSpy).toHaveBeenCalled();
  });

  it('does not touch the session when the logout question is cancelled', () => {
    const logoutSpy = spyOn(authService, 'logout').and.callThrough();
    const endSessionSpy = spyOn(authService, 'endSession');

    fixtureMain.detectChanges();
    answerDialog(undefined);

    main.logout(false);

    expect(askedAbout()).toBe('logout');
    // Nothing was deleted and nothing was ended: this used to be the only
    // outcome, taken without a question.
    expect(logoutSpy).not.toHaveBeenCalled();
    expect(endSessionSpy).not.toHaveBeenCalled();
  });

  it('ends the session and keeps the data when the user chooses so on logout', () => {
    const logoutSpy = spyOn(authService, 'logout').and.callThrough();
    const endSessionSpy = spyOn(authService, 'endSession');
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');

    fixtureMain.detectChanges();
    answerDialog('end-session');

    main.logout(false);

    // The local database is what holds the data collected offline, so the
    // destructive path must not be reachable by mistake.
    expect(logoutSpy).not.toHaveBeenCalled();
    expect(endSessionSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith([authServiceConfig.failedAuthRedirect]);
  });

  it('explains a refused push instead of syncing, and leaves the session alone', () => {
    spyOnProperty(dataService, 'abandonedCollections', 'get').and.returnValue(['form_data']);
    const runSyncSpy = spyOn(dataService, 'runSync');
    const endSessionSpy = spyOn(authService, 'endSession');
    // Both problems at once: the message about refused data still wins, because a
    // login cannot fix it and a logout would destroy the data to be exported.
    dataService.problemSyncing.next(['form_data', 'authentication']);

    fixtureMain.detectChanges();
    answerDialog(undefined);

    main.runSync();

    expect(askedAbout()).toBe('data-refused');
    expect(runSyncSpy).not.toHaveBeenCalled();
    expect(endSessionSpy).not.toHaveBeenCalled();
  });

  it('retries the token before asking anything, and syncs when it works', () => {
    spyOn(authService, 'refreshToken').and.returnValue(of(true));
    spyOn(authService, 'hasValidAuthToken').and.returnValue(true);
    const runSyncSpy = spyOn(dataService, 'runSync');
    const dialogSpy = spyOn(main.dialog, 'open');
    dataService.problemSyncing.next(['authentication']);

    fixtureMain.detectChanges();

    main.runSync();

    // A tap on the icon is what a user does when the connection is back. Offering
    // a login page instead of trying was the wrong answer: nothing else asks for a
    // token once the replications are stopped.
    expect(runSyncSpy).toHaveBeenCalled();
    expect(dialogSpy).not.toHaveBeenCalled();
  });

  it('asks before sending the user to the login page, and postpones on request', () => {
    const endSessionSpy = spyOn(authService, 'endSession');
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');
    dataService.problemSyncing.next(['authentication']);

    fixtureMain.detectChanges();
    answerDialog(undefined);

    main.runSync();

    expect(askedAbout()).toBe('session-expired');
    // "Later": the badge stays on, the session stays as it is.
    expect(endSessionSpy).not.toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('ends the session and goes to the login page when the user accepts', () => {
    const endSessionSpy = spyOn(authService, 'endSession');
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');
    dataService.problemSyncing.next(['authentication']);

    fixtureMain.detectChanges();
    answerDialog('end-session');

    main.runSync();

    expect(endSessionSpy).toHaveBeenCalled();
    // `LoginGuard` closes the login page while the app still reports itself
    // authenticated, so the session has to go first.
    expect(navigateSpy).toHaveBeenCalledWith([authServiceConfig.failedAuthRedirect]);
  });

  it('just syncs when there is no problem to explain', () => {
    const runSyncSpy = spyOn(dataService, 'runSync');
    const dialogSpy = spyOn(main.dialog, 'open');

    fixtureMain.detectChanges();

    main.runSync();

    expect(runSyncSpy).toHaveBeenCalled();
    expect(dialogSpy).not.toHaveBeenCalled();
  });
});
