import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dewco/core/auth';
import {BehaviorSubject, Observable, of} from 'rxjs';

import {MainNav} from './main-nav';
import {MainModule} from './main-nav.module';

const authServiceConfig: AuthServiceConfig = {
  host: 'http://test-auth-backend',
  applicationId: 'applicationId',
  apiKey: 'apiKey',
  retryRefreshTime: 5000,
  retryAttemptsMax: 1,
  failedAuthRedirect: 'login',
};

const authServiceMock = {
  authenticated: of(true),
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
    TestBed
        .configureTestingModule({
          imports: [
            BrowserAnimationsModule,
            MainModule,
            HttpClientTestingModule,
            RouterTestingModule,
          ],
          providers: [
            {provide: AuthService, useValue: authServiceMock},
            {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
          ],
        })
        .compileComponents();
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

    main.logout();

    expect(logoutSpy).toHaveBeenCalled();
    expect(snackbarSpy).toHaveBeenCalled();
  });
});
