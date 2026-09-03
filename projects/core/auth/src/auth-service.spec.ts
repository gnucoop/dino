import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {BehaviorSubject, firstValueFrom, of as obsOf} from 'rxjs';
import {take} from 'rxjs/operators';

import {NetworkStatusService} from './network-status.service';

import {
  AUTH_SERVICE_CONFIG,
  AuthService,
  AuthServiceConfig,
  LoginResponse,
  User,
} from './public_api';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

const authServiceConfig: AuthServiceConfig = {
  host: 'http://test-auth-backend',
  applicationId: 'applicationId',
  apiKey: 'apiKey',
  retryRefreshTime: 5000,
  retryAttemptsMax: 1,
  failedAuthRedirect: 'login',
};

const jwtPayload = JSON.stringify({exp: Math.floor(new Date().getTime() / 1000) + 30});

const loginResponse: LoginResponse = {
  refreshToken: 'refreshToken',
  token: `header.${btoa(jwtPayload)}.signature`,
  user: {
    id: 'id',
    email: 'test@dino.io',
    firstName: 'Test',
    lastName: 'User',
    active: true,
    verified: true,
    tenantId: 'tenantId',
    insertInstant: 0,
    lastLoginInstant: 0,
    passwordChangeRequired: false,
    passwordLastUpdateInstant: 0,
    twoFactorEnabled: false,
    twoFactorDelivery: 'None',
    usernameStatus: 'ACTIVE',
    registrations: [],
  },
};

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthService,
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.removeItem('dino_auth_token');
    localStorage.removeItem('dino_refresh_token');
    localStorage.removeItem('dino_user_info');
  });

  it('should login successfully with correct credentials', async () => {
    const authStatus = () => firstValueFrom(authService.authenticated.pipe(take(1)));
    await expectAsync(authStatus()).toBeResolvedTo({auth: false, evt: 'no auth token'});
    authService.login({email: 'test@dino.io', password: 'test'}).subscribe(res => {
      expect(res).toBeDefined();
    });
    const req = httpMock.expectOne('http://test-auth-backend/api/login');
    expect(req.request.method).toBe('POST');
    req.flush(loginResponse);
    await expectAsync(authStatus()).toBeResolvedTo({auth: true, evt: 'login'});
  });

  it('should fail logging in with bad credentials', () => {
    authService.login({email: 'test@dino.io', password: 'test'}).subscribe(
      () => {},
      err => {
        expect(err).toBeDefined();
      },
    );
    const req = httpMock.expectOne('http://test-auth-backend/api/login');
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent(''));
  });

  it('should save the jwt token in local storage using the default key upon login', () => {
    expect(localStorage.getItem('dino_auth_token')).toBeNull();
    authService.login({email: 'test@dino.io', password: 'test'}).subscribe(res => {
      expect(res).toBeDefined();
    });
    const req = httpMock.expectOne('http://test-auth-backend/api/login');
    expect(req.request.method).toBe('POST');
    req.flush(loginResponse);

    expect(localStorage.getItem('dino_auth_token')).toEqual(loginResponse.token);
    expect(authService.getAuthToken()).toEqual(loginResponse.token);
  });

  it('should save the jwt refresh token in local storage using the default key upon login', () => {
    expect(localStorage.getItem('dino_refresh_token')).toBeNull();
    authService.login({email: 'test@dino.io', password: 'test'}).subscribe(res => {
      expect(res).toBeDefined();
    });
    const req = httpMock.expectOne('http://test-auth-backend/api/login');
    expect(req.request.method).toBe('POST');
    req.flush(loginResponse);

    expect(localStorage.getItem('dino_refresh_token')).toEqual(loginResponse.refreshToken);
    expect(authService.getRefreshToken()).toEqual(loginResponse.refreshToken);
  });

  it('should save the logged in user info in local storage using the default key upon login', () => {
    expect(localStorage.getItem('dino_user_info')).toBeNull();
    authService.login({email: 'test@dino.io', password: 'test'}).subscribe(res => {
      expect(res).toBeDefined();
    });
    const req = httpMock.expectOne('http://test-auth-backend/api/login');
    expect(req.request.method).toBe('POST');
    req.flush(loginResponse);

    expect(JSON.parse(localStorage.getItem('dino_user_info')!) as User).toEqual(loginResponse.user);
    expect(authService.getUserInfo()).toEqual(loginResponse.user);
  });
});

describe('refresh token', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthService,
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    localStorage.setItem('dino_auth_token', loginResponse.token);
    localStorage.setItem('dino_refresh_token', loginResponse.refreshToken);
  });

  afterEach(() => {
    localStorage.removeItem('dino_auth_token');
    localStorage.removeItem('dino_refresh_token');
  });

  it('should attempt to call the jwt refresh api, passing the refreshToken in the request', () => {
    authService.refreshToken().subscribe(res => {
      expect(res).toBeDefined();
    });
    const req = httpMock.match('http://test-auth-backend/api/jwt/refresh')[0];
    console.log(req.request);

    expect(req.request.method).toBe('POST');
    expect(req.request.body.refreshToken).toBe(loginResponse.refreshToken);
  });
});

describe('logged in', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthService,
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    localStorage.setItem('dino_auth_token', loginResponse.token);
    localStorage.setItem('dino_refresh_token', loginResponse.refreshToken);
    localStorage.setItem('dino_user_info', JSON.stringify(loginResponse.user));

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    localStorage.removeItem('dino_auth_token');
    localStorage.removeItem('dino_refresh_token');
    localStorage.removeItem('dino_user_info');
  });

  it('should logout successfully', async () => {
    const authStatus = () => firstValueFrom(authService.authenticated.pipe(take(1)));
    await expectAsync(authStatus()).toBeResolvedTo({auth: true, evt: 'init'});
    return authService.logout().subscribe(async res => {
      expect(res).toBeDefined();
      await expectAsync(authStatus()).toBeResolvedTo({auth: false, evt: 'logout'});
    });
  });

  it('should delete the jwt token saved in local storage using the default key upon logout', () => {
    expect(localStorage.getItem('dino_auth_token')).not.toBeNull();
    authService.logout().subscribe(res => {
      expect(res).toBeDefined();
    });

    const req = httpMock.expectOne(
      'http://test-auth-backend/api/logout?global=false&refreshToken=' + loginResponse.refreshToken,
    );
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(localStorage.getItem('dino_auth_token')).toBeNull();
    expect(authService.getAuthToken()).toBeNull();
  });

  it('should delete the jwt refresh token saved in local storage using the default key upon logout', () => {
    expect(localStorage.getItem('dino_refresh_token')).not.toBeNull();
    authService.logout().subscribe(res => {
      expect(res).toBeDefined();
    });

    const req = httpMock.expectOne(
      'http://test-auth-backend/api/logout?global=false&refreshToken=' + loginResponse.refreshToken,
    );
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(localStorage.getItem('dino_refresh_token')).toBeNull();
    expect(authService.getAuthToken()).toBeNull();
  });

  it('should delete the user info saved in local storage using the default key upon logout', () => {
    expect(localStorage.getItem('dino_user_info')).not.toBeNull();
    authService.logout().subscribe(res => {
      expect(res).toBeDefined();
    });

    const req = httpMock.expectOne(
      'http://test-auth-backend/api/logout?global=false&refreshToken=' + loginResponse.refreshToken,
    );
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(localStorage.getItem('dino_user_info')).toBeNull();
    expect(authService.getAuthToken()).toBeNull();
  });
});

describe('custom local storage keys', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthService,
        {
          provide: AUTH_SERVICE_CONFIG,
          useValue: {
            ...authServiceConfig,
            authTokenLocalStorageKey: 'auth_token_ls_key',
            refreshTokenLocalStorageKey: 'refresh_token_ls_key',
            userInfoLocalStorageKey: 'user_info_ls_key',
          },
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.removeItem('auth_token_ls_key');
    localStorage.removeItem('refresh_token_ls_key');
    localStorage.removeItem('user_info_ls_key');
  });

  it('should save the jwt auth token in local storage using the user defined key upon login', () => {
    expect(localStorage.getItem('auth_token_ls_key')).toBeNull();
    authService.login({email: 'test@dino.io', password: 'test'}).subscribe(res => {
      expect(res).toBeDefined();
    });
    const req = httpMock.expectOne('http://test-auth-backend/api/login');
    expect(req.request.method).toBe('POST');
    req.flush(loginResponse);

    expect(localStorage.getItem('auth_token_ls_key')).toEqual(loginResponse.token);
    expect(authService.getAuthToken()).toEqual(loginResponse.token);
  });

  it('should save the jwt refresh token in local storage using the user defined key upon login', () => {
    expect(localStorage.getItem('refresh_token_ls_key')).toBeNull();
    authService.login({email: 'test@dino.io', password: 'test'}).subscribe(res => {
      expect(res).toBeDefined();
    });
    const req = httpMock.expectOne('http://test-auth-backend/api/login');
    expect(req.request.method).toBe('POST');
    req.flush(loginResponse);

    expect(localStorage.getItem('refresh_token_ls_key')).toEqual(loginResponse.refreshToken);
  });

  it('should save the jwt refresh token in local storage using the user defined key upon login', () => {
    expect(localStorage.getItem('refresh_token_ls_key')).toBeNull();
    authService.login({email: 'test@dino.io', password: 'test'}).subscribe(res => {
      expect(res).toBeDefined();
    });
    const req = httpMock.expectOne('http://test-auth-backend/api/login');
    expect(req.request.method).toBe('POST');
    req.flush(loginResponse);

    expect(localStorage.getItem('refresh_token_ls_key')).toEqual(loginResponse.refreshToken);
    expect(authService.getRefreshToken()).toEqual(loginResponse.refreshToken);
  });

  it('should save the logged in user info in local storage using the user defined key upon login', () => {
    expect(localStorage.getItem('user_info_ls_key')).toBeNull();
    authService.login({email: 'test@dino.io', password: 'test'}).subscribe(res => {
      expect(res).toBeDefined();
    });
    const req = httpMock.expectOne('http://test-auth-backend/api/login');
    expect(req.request.method).toBe('POST');
    req.flush(loginResponse);

    expect(JSON.parse(localStorage.getItem('user_info_ls_key')!) as User).toEqual(
      loginResponse.user,
    );
    expect(authService.getUserInfo()).toEqual(loginResponse.user);
  });
});

describe('custom local storage keys - logged in', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthService,
        {
          provide: AUTH_SERVICE_CONFIG,
          useValue: {
            ...authServiceConfig,
            authTokenLocalStorageKey: 'auth_token_ls_key',
            refreshTokenLocalStorageKey: 'refresh_token_ls_key',
            userInfoLocalStorageKey: 'user_info_ls_key',
          },
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    localStorage.setItem('auth_token_ls_key', loginResponse.token);
    localStorage.setItem('refresh_token_ls_key', loginResponse.refreshToken);
    localStorage.setItem('user_info_ls_key', JSON.stringify(loginResponse.user));

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.removeItem('auth_token_ls_key');
    localStorage.removeItem('refresh_token_ls_key');
    localStorage.removeItem('user_info_ls_key');
  });

  it('should delete the jwt token saved in local storage using the user defined key upon logout', () => {
    expect(localStorage.getItem('auth_token_ls_key')).not.toBeNull();
    authService.logout().subscribe(res => {
      expect(res).toBeDefined();
    });

    const req = httpMock.expectOne(
      'http://test-auth-backend/api/logout?global=false&refreshToken=' + loginResponse.refreshToken,
    );
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(localStorage.getItem('auth_token_ls_key')).toBeNull();
    expect(authService.getAuthToken()).toBeNull();
  });

  it(
    'should delete the jwt refresh token saved in local storage using the user defined key' +
      ' upon logout',
    () => {
      expect(localStorage.getItem('refresh_token_ls_key')).not.toBeNull();
      authService.logout().subscribe(res => {
        expect(res).toBeDefined();
      });

      const req = httpMock.expectOne(
        'http://test-auth-backend/api/logout?global=false&refreshToken=' +
          loginResponse.refreshToken,
      );
      expect(req.request.method).toBe('POST');
      req.flush({});

      expect(localStorage.getItem('refresh_token_ls_key')).toBeNull();
      expect(authService.getAuthToken()).toBeNull();
    },
  );

  it('should delete the user info saved in local storage using the user defined key upon logout', () => {
    expect(localStorage.getItem('user_info_ls_key')).not.toBeNull();
    authService.logout().subscribe(res => {
      expect(res).toBeDefined();
    });

    const req = httpMock.expectOne(
      'http://test-auth-backend/api/logout?global=false&refreshToken=' + loginResponse.refreshToken,
    );
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(localStorage.getItem('user_info_ls_key')).toBeNull();
    expect(authService.getAuthToken()).toBeNull();
  });
});

describe('custom storage functions', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let storeAuthTokenSpy: jasmine.Spy<(_token: string) => {}>;
  let storeRefreshTokenSpy: jasmine.Spy<(_token: string) => {}>;
  let storeUserInfoSpy: jasmine.Spy<(_user: any) => {}>;
  let retrieveAuthTokenSpy: jasmine.Spy<() => {}>;
  let retrieveRefreshTokenSpy: jasmine.Spy<() => {}>;
  let retrieveUserInfoSpy: jasmine.Spy<() => {}>;

  beforeEach(() => {
    const userDefinedStore = {
      storeAuthToken: (_token: string) => {},
      storeRefreshToken: (_token: string) => {},
      storeUserInfo: (_user: any) => {},
      retrieveAuthToken: () => {},
      retrieveRefreshToken: () => {},
      retrieveUserInfo: () => {},
    };
    storeAuthTokenSpy = spyOn(userDefinedStore, 'storeAuthToken');
    storeRefreshTokenSpy = spyOn(userDefinedStore, 'storeRefreshToken');
    storeUserInfoSpy = spyOn(userDefinedStore, 'storeUserInfo');
    retrieveAuthTokenSpy = spyOn(userDefinedStore, 'retrieveAuthToken');
    retrieveRefreshTokenSpy = spyOn(userDefinedStore, 'retrieveRefreshToken');
    retrieveUserInfoSpy = spyOn(userDefinedStore, 'retrieveUserInfo');

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthService,
        {
          provide: AUTH_SERVICE_CONFIG,
          useValue: {
            ...authServiceConfig,
            storeAuthToken: userDefinedStore.storeAuthToken,
            storeRefreshToken: userDefinedStore.storeRefreshToken,
            storeUserInfo: userDefinedStore.storeUserInfo,
            retrieveAuthToken: userDefinedStore.retrieveAuthToken,
            retrieveRefreshToken: userDefinedStore.retrieveRefreshToken,
            retrieveUserInfo: userDefinedStore.retrieveUserInfo,
          },
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should save the jwt refresh token using the user defined function upon login', () => {
    authService.login({email: 'test@dino.io', password: 'test'}).subscribe(res => {
      expect(res).toBeDefined();
    });
    const req = httpMock.expectOne('http://test-auth-backend/api/login');
    expect(req.request.method).toBe('POST');
    req.flush(loginResponse);

    expect(storeAuthTokenSpy).toHaveBeenCalledTimes(1);
    authService.getAuthToken();
    expect(retrieveAuthTokenSpy).toHaveBeenCalled();
  });

  it('should save the jwt refresh token using the user defined function upon login', () => {
    authService.login({email: 'test@dino.io', password: 'test'}).subscribe(res => {
      expect(res).toBeDefined();
    });
    const req = httpMock.expectOne('http://test-auth-backend/api/login');
    expect(req.request.method).toBe('POST');
    req.flush(loginResponse);

    expect(storeRefreshTokenSpy).toHaveBeenCalledTimes(1);
    // Counted from here on: the service reads the refresh token on its own too,
    // to tell an expired access token apart from a session that is over.
    retrieveRefreshTokenSpy.calls.reset();
    authService.getRefreshToken();
    expect(retrieveRefreshTokenSpy).toHaveBeenCalledTimes(1);
  });

  it('should save the logged in user info using the user defined function upon login', () => {
    authService.login({email: 'test@dino.io', password: 'test'}).subscribe(res => {
      expect(res).toBeDefined();
    });
    const req = httpMock.expectOne('http://test-auth-backend/api/login');
    expect(req.request.method).toBe('POST');
    req.flush(loginResponse);

    expect(storeUserInfoSpy).toHaveBeenCalledTimes(1);
    authService.getUserInfo();
    expect(retrieveUserInfoSpy).toHaveBeenCalledTimes(1);
  });
});

describe('custom storage functions - logged in', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let storeAuthTokenSpy: jasmine.Spy<(_token: string) => {}>;
  let storeRefreshTokenSpy: jasmine.Spy<(_token: string) => {}>;
  let storeUserInfoSpy: jasmine.Spy<(_user: any) => {}>;

  beforeEach(() => {
    const userDefinedStore = {
      storeAuthToken: (_token: string) => {},
      storeRefreshToken: (_token: string) => {},
      storeUserInfo: (_user: any) => {},
    };
    storeAuthTokenSpy = spyOn(userDefinedStore, 'storeAuthToken');
    storeRefreshTokenSpy = spyOn(userDefinedStore, 'storeRefreshToken');
    storeUserInfoSpy = spyOn(userDefinedStore, 'storeUserInfo');

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthService,
        {
          provide: AUTH_SERVICE_CONFIG,
          useValue: {
            ...authServiceConfig,
            storeAuthToken: userDefinedStore.storeAuthToken,
            storeRefreshToken: userDefinedStore.storeRefreshToken,
            storeUserInfo: userDefinedStore.storeUserInfo,
          },
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should delete the jwt token saved using the user defined function upon logout', () => {
    authService.logout().subscribe(res => {
      expect(res).toBeDefined();
    });

    const req = httpMock.expectOne(
      'http://test-auth-backend/api/logout?global=false&refreshToken=null',
    );
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(storeAuthTokenSpy).toHaveBeenCalledTimes(1);
  });

  it('should delete the jwt refresh token saved using the user defined function upon logout', () => {
    authService.logout().subscribe(res => {
      expect(res).toBeDefined();
    });

    const req = httpMock.expectOne(
      'http://test-auth-backend/api/logout?global=false&refreshToken=null',
    );
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(storeRefreshTokenSpy).toHaveBeenCalledTimes(1);
  });

  it('should delete the user info saved using the user defined function upon logout', () => {
    authService.logout().subscribe(res => {
      expect(res).toBeDefined();
    });

    const req = httpMock.expectOne(
      'http://test-auth-backend/api/logout?global=false&refreshToken=null',
    );
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(storeUserInfoSpy).toHaveBeenCalledTimes(1);
  });
});

// Offline the refresh cannot run, and no new token gets stored: without an
// explicit re-arm the pre-emptive timer that led here is consumed and the
// session runs to expiry with no timer at all, leaving the refresh to the
// reactive paths only.
describe('pre-emptive refresh while offline', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  /**
   * A token past the 75% mark of its lifetime but not expired yet: exactly the
   * state in which the pre-emptive timer fires. The residual lifetime outlives
   * the offline retry delay, so the token is still valid when the retry runs.
   */
  const staleToken = (): string => {
    const nowSeconds = Math.floor(new Date().getTime() / 1000);
    const payload = JSON.stringify({iat: nowSeconds - 320, exp: nowSeconds + 80});
    return `header.${btoa(payload)}.signature`;
  };

  const pendingTimer = (): unknown => (authService as any)._preemptiveRefreshTimeout;

  /**
   * Discards the armed timer: `fakeAsync` fails a test that ends with a pending
   * one, and a pending timer is exactly what these tests assert.
   */
  const clearPendingTimer = (): void => (authService as any)._clearPreemptiveRefresh();

  beforeEach(() => {
    localStorage.setItem('dino_auth_token', staleToken());
    localStorage.setItem('dino_refresh_token', 'refreshToken');
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthService,
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {
          provide: NetworkStatusService,
          useValue: {isOnline$: obsOf(false), statusHistory$: new BehaviorSubject([false])},
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.removeItem('dino_auth_token');
    localStorage.removeItem('dino_refresh_token');
  });

  it('re-arms the pre-emptive refresh when the refresh could not run', fakeAsync(() => {
    // Injected inside the fake async zone, so that the timer armed by the
    // constructor is a fake one too.
    authService = TestBed.inject(AuthService);
    // The timer armed at construction is the one about to be consumed.
    expect(pendingTimer()).not.toBeNull();

    let refreshed: boolean | undefined;
    authService.refreshToken().subscribe(res => (refreshed = res));

    // Offline the refresh reports success, so that the callers keep working on
    // the cached data instead of logging out...
    expect(refreshed).toBe(true);
    // ...and the timer is armed again instead of being lost for the session.
    expect(pendingTimer()).not.toBeNull();
    clearPendingTimer();
  }));

  it('re-arms it with the longer offline floor, instead of retrying every few seconds', fakeAsync(() => {
    authService = TestBed.inject(AuthService);
    authService.refreshToken().subscribe();
    const refreshSpy = spyOn(authService, 'refreshToken').and.callThrough();

    // The regular floor is 10s: reusing it here would poll for as long as the
    // connection is missing.
    tick(59999);
    expect(refreshSpy).not.toHaveBeenCalled();

    tick(1);
    expect(refreshSpy).toHaveBeenCalledTimes(1);
    // Still offline: the retry re-arms in turn.
    expect(pendingTimer()).not.toBeNull();
    clearPendingTimer();
  }));
});

// A session the app gives up on must not go through a logout: the data service
// answers that by destroying the local database, and what was collected offline
// has not been pushed yet.
describe('endSession', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  const validToken = (): string => {
    const nowSeconds = Math.floor(new Date().getTime() / 1000);
    const payload = JSON.stringify({iat: nowSeconds - 10, exp: nowSeconds + 900});
    return `header.${btoa(payload)}.signature`;
  };

  beforeEach(() => {
    localStorage.setItem('dino_auth_token', validToken());
    localStorage.setItem('dino_refresh_token', 'stored_refresh_token');
    localStorage.setItem('dino_user_info', JSON.stringify(loginResponse.user));
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthService,
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Nothing is sent: a session end is local, which is also why it works
    // offline while a logout does not.
    httpMock.verify();
    localStorage.removeItem('dino_auth_token');
    localStorage.removeItem('dino_refresh_token');
    localStorage.removeItem('dino_user_info');
  });

  it('drops the tokens, reports the session as over and disarms the timer', () => {
    // The stored token is valid, so the constructor armed a pre-emptive refresh.
    expect((authService as any)._preemptiveRefreshTimeout).not.toBeNull();

    authService.endSession();

    expect(localStorage.getItem('dino_auth_token')).toBeNull();
    expect(localStorage.getItem('dino_refresh_token')).toBeNull();
    expect(authService.authToken.value).toBeNull();
    expect(authService.authenticated.value).toEqual({auth: false, evt: 'expired'});
    // A timer left armed would fire a refresh for a session that is over.
    expect((authService as any)._preemptiveRefreshTimeout).toBeNull();
  });

  it('keeps the user info, so the login page can say whose data is on the device', () => {
    authService.endSession();

    expect(authService.getUserInfo()).toEqual(loginResponse.user);
  });

  it('reports the given event when one is passed', () => {
    authService.endSession('refresh failed');

    expect(authService.authenticated.value).toEqual({auth: false, evt: 'refresh failed'});
  });
});
