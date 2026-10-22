import type {Mock} from 'vitest';
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

const themeServiceMock = {
  darkModeChange: new EventEmitter<boolean>(),
  isDark: () => false,
  setDarkMode: () => {},
} as unknown as ThemeService;

describe('Main', () => {
  let fixtureMain: ComponentFixture<MainNav>;
  let main: MainNav;
  let authService: AuthService;
  let dataService: DataService;
  let openSpy: Mock;

  /**
   * Answers the next session dialog with `choice`, without opening anything.
   * @param choice What the user is supposed to have decided
   * @returns The spy on the dialog, to assert what was asked
   */
  const answerDialog = (choice: SessionDialogResult): Mock => {
    openSpy = vi.spyOn(main.dialog, 'open').mockReturnValue({
      afterClosed: () => of(choice),
    } as MatDialogRef<unknown>);
    return openSpy;
  };

  /**
   * @returns The `kind` the dialog was opened with.
   */
  const askedAbout = (): string | undefined =>
    (vi.mocked(openSpy).mock.lastCall?.[1] as MatDialogConfig<SessionDialogData> | undefined)?.data
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
    let logoutSpy = vi.spyOn(authService, 'logout');
    let snackbarSpy = vi.spyOn(main.snackbar, 'open');

    fixtureMain.detectChanges();
    answerDialog('logout');

    main.logout(false);

    expect(logoutSpy).toHaveBeenCalled();
    expect(snackbarSpy).toHaveBeenCalled();
  });

  it('does not touch the session when the logout question is cancelled', () => {
    const logoutSpy = vi.spyOn(authService, 'logout');
    const endSessionSpy = vi.spyOn(authService, 'endSession').mockReturnValue(undefined as any);

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
    const logoutSpy = vi.spyOn(authService, 'logout');
    const endSessionSpy = vi.spyOn(authService, 'endSession').mockReturnValue(undefined as any);
    const navigateSpy = vi
      .spyOn(TestBed.inject(Router), 'navigate')
      .mockReturnValue(undefined as any);

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
    vi.spyOn(dataService, 'abandonedCollections', 'get').mockReturnValue(['form_data']);
    const runSyncSpy = vi.spyOn(dataService, 'runSync').mockReturnValue(undefined as any);
    const endSessionSpy = vi.spyOn(authService, 'endSession').mockReturnValue(undefined as any);
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
    vi.spyOn(authService, 'refreshToken').mockReturnValue(of(true));
    vi.spyOn(authService, 'hasValidAuthToken').mockReturnValue(true);
    const runSyncSpy = vi.spyOn(dataService, 'runSync').mockReturnValue(undefined as any);
    const dialogSpy = vi.spyOn(main.dialog, 'open').mockReturnValue(undefined as any);
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
    const endSessionSpy = vi.spyOn(authService, 'endSession').mockReturnValue(undefined as any);
    const navigateSpy = vi
      .spyOn(TestBed.inject(Router), 'navigate')
      .mockReturnValue(undefined as any);
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
    const endSessionSpy = vi.spyOn(authService, 'endSession').mockReturnValue(undefined as any);
    const navigateSpy = vi
      .spyOn(TestBed.inject(Router), 'navigate')
      .mockReturnValue(undefined as any);
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
    const runSyncSpy = vi.spyOn(dataService, 'runSync').mockReturnValue(undefined as any);
    const dialogSpy = vi.spyOn(main.dialog, 'open').mockReturnValue(undefined as any);

    fixtureMain.detectChanges();

    main.runSync();

    expect(runSyncSpy).toHaveBeenCalled();
    expect(dialogSpy).not.toHaveBeenCalled();
  });
});
