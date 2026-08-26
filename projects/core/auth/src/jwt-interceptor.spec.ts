import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpInterceptor,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';
import {BehaviorSubject} from 'rxjs';
import {distinctUntilChanged, shareReplay, tap} from 'rxjs/operators';

import {Router} from '@angular/router';

import {NetworkStatusService} from './network-status.service';

import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig, JWTInterceptor} from './public_api';

const authServiceConfig: AuthServiceConfig = {
  host: 'http://test-auth-backend',
  applicationId: 'applicationId',
  apiKey: 'apiKey',
  retryRefreshTime: 3000,
  retryAttemptsMax: 1,
  failedAuthRedirect: 'login',
};

const unauthorizedResponse = {
  statusText: 'Unauthorized',
  status: 401,
};

const response = {
  statusText: 'Test response',
  status: 200,
};

// Hasura reports an expired JWT with a 200 status and an `errors` array.
const jwtErrorBody = {
  errors: [
    {
      message: 'Could not verify JWT: JWTExpired',
      extensions: {code: 'invalid-jwt', path: '$'},
    },
  ],
};
describe(`JWTInterceptor`, () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        JWTInterceptor,
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true},
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should handle the 401 response and ask the service to refresh the Jwt auth token', inject(
    [HTTP_INTERCEPTORS, HttpClient],
    (interceptors: HttpInterceptor[], http: HttpClient) => {
      const jwtInterceptor = interceptors.find(i => i instanceof JWTInterceptor) as JWTInterceptor;
      expect(jwtInterceptor).toBeDefined();

      let isLoginSpy = spyOn<any>(jwtInterceptor, '_isAllowedRequest').and.callThrough();
      let refreshSpy = spyOn<any>(jwtInterceptor.handleRefreshEvt, 'emit').and.callThrough();

      // No token is stored, so the refresh cannot succeed and the failure is
      // surfaced to the caller instead of being swallowed into a null response.
      let errored = false;
      http.post('http://test-auth-backend/data', {}).subscribe({
        next: () => fail('the request should not succeed'),
        error: () => (errored = true),
      });
      const req = httpMock.expectOne('http://test-auth-backend/data');
      expect(req.request.method).toBe('POST');
      req.flush(null, unauthorizedResponse);

      expect(isLoginSpy).toHaveBeenCalledTimes(1);
      expect(refreshSpy).toHaveBeenCalledTimes(1);
      expect(errored).toBe(true);
    },
  ));

  it('should handle a 200 response carrying a GraphQL invalid-jwt error', inject(
    [HTTP_INTERCEPTORS, HttpClient],
    (interceptors: HttpInterceptor[], http: HttpClient) => {
      const jwtInterceptor = interceptors.find(i => i instanceof JWTInterceptor) as JWTInterceptor;
      expect(jwtInterceptor).toBeDefined();

      let refreshSpy = spyOn<any>(jwtInterceptor.handleRefreshEvt, 'emit').and.callThrough();

      let errored = false;
      http.post('http://test-auth-backend/data', {}).subscribe({
        next: () => fail('the request should not succeed'),
        error: () => (errored = true),
      });
      const req = httpMock.expectOne('http://test-auth-backend/data');
      req.flush(jwtErrorBody, response);

      expect(refreshSpy).toHaveBeenCalledTimes(1);
      expect(errored).toBe(true);
    },
  ));

  it('should not call the 401 handler or ask the service to refresh the Jwt auth token', inject(
    [HTTP_INTERCEPTORS, HttpClient],
    (interceptors: HttpInterceptor[], http: HttpClient) => {
      const jwtInterceptor = interceptors.find(i => i instanceof JWTInterceptor) as JWTInterceptor;
      expect(jwtInterceptor).toBeDefined();

      let isLoginSpy = spyOn<any>(jwtInterceptor, '_isAllowedRequest').and.callThrough();
      let refreshSpy = spyOn<any>(jwtInterceptor.handleRefreshEvt, 'emit').and.callThrough();

      http.post('http://test-auth-backend/data', {}).subscribe(res => {
        expect(res).toBeDefined();
      });
      const req = httpMock.expectOne('http://test-auth-backend/data');
      expect(req.request.method).toBe('POST');
      req.flush(response);

      expect(isLoginSpy).not.toHaveBeenCalled();
      expect(refreshSpy).not.toHaveBeenCalled();
    },
  ));

  // A logout destroys the local database, with the data collected offline and
  // not pushed yet, so no path here may reach one: a failure proves nothing
  // about the session being dead, and giving up on the session is enough.
  describe('with a stored session', () => {
    const refreshUrl = 'http://test-auth-backend/api/jwt/refresh';

    beforeEach(() => {
      // Deliberately not a JWT: it counts as expired, and decoding it yields
      // null, so no pre-emptive timer is armed behind these tests.
      localStorage.setItem('dino_auth_token', 'stored_token');
      localStorage.setItem('dino_refresh_token', 'stored_refresh_token');
    });

    afterEach(() => {
      localStorage.removeItem('dino_auth_token');
      localStorage.removeItem('dino_refresh_token');
    });

    it('does not log out when a second request fails inside one refresh round trip', inject(
      [HTTP_INTERCEPTORS, HttpClient],
      (interceptors: HttpInterceptor[], http: HttpClient) => {
        const jwtInterceptor = interceptors.find(
          i => i instanceof JWTInterceptor,
        ) as JWTInterceptor;
        const endSessionSpy = spyOn<any>((jwtInterceptor as any)._endSessionEvt, 'emit');

        http.post('http://test-auth-backend/data', {}).subscribe({
          next: () => {},
          error: () => {},
        });
        httpMock.expectOne('http://test-auth-backend/data').flush(null, unauthorizedResponse);
        // The refresh is in flight, and it has spent the only allowed attempt.
        expect(httpMock.match(refreshUrl).length).toBe(1);

        http.post('http://test-auth-backend/other', {}).subscribe({
          next: () => {},
          error: () => {},
        });
        httpMock.expectOne('http://test-auth-backend/other').flush(null, unauthorizedResponse);

        // The second failure joins the pending refresh instead of spending an
        // attempt that is not there, which used to tear the session down.
        expect(endSessionSpy).not.toHaveBeenCalled();
      },
    ));

    it('does not log out when the refresh on reconnection fails', inject(
      [HTTP_INTERCEPTORS, AuthService],
      (interceptors: HttpInterceptor[], authService: AuthService) => {
        const jwtInterceptor = interceptors.find(
          i => i instanceof JWTInterceptor,
        ) as JWTInterceptor;
        const endSessionSpy = spyOn<any>((jwtInterceptor as any)._endSessionEvt, 'emit');

        window.dispatchEvent(new Event('offline'));
        window.dispatchEvent(new Event('online'));

        // The stored token is expired, so the reconnection asks for a refresh.
        const refreshRequests = httpMock.match(refreshUrl);
        expect(refreshRequests.length).toBe(1);
        refreshRequests[0].flush(null, {status: 500, statusText: 'Server Error'});

        expect(authService.authenticated.value).toEqual({auth: false, evt: 'refresh failed'});
        // A refresh that failed at the very moment the connection came back is
        // no reason to give up on the session, let alone to wipe the database.
        expect(endSessionSpy).not.toHaveBeenCalled();
      },
    ));

    it('ends the session without logging out when the attempts are exhausted', inject(
      [HTTP_INTERCEPTORS, HttpClient, AuthService, Router],
      (
        interceptors: HttpInterceptor[],
        http: HttpClient,
        authService: AuthService,
        router: Router,
      ) => {
        expect(interceptors.find(i => i instanceof JWTInterceptor)).toBeDefined();
        const endSessionSpy = spyOn(authService, 'endSession');
        const logoutSpy = spyOn(authService, 'logout');
        const navigateSpy = spyOn(router, 'navigate');

        // First round: the only allowed attempt is spent and its refresh fails.
        http.post('http://test-auth-backend/data', {}).subscribe({
          next: () => {},
          error: () => {},
        });
        httpMock.expectOne('http://test-auth-backend/data').flush(null, unauthorizedResponse);
        httpMock.match(refreshUrl)[0].flush(null, {status: 500, statusText: 'Server Error'});

        // Second round: no refresh is in flight and the budget is gone.
        http.post('http://test-auth-backend/other', {}).subscribe({
          next: () => {},
          error: () => {},
        });
        httpMock.expectOne('http://test-auth-backend/other').flush(null, unauthorizedResponse);

        expect(endSessionSpy).toHaveBeenCalled();
        // The data collected offline stays on the device: only an explicit
        // logout may destroy it.
        expect(logoutSpy).not.toHaveBeenCalled();
        expect(navigateSpy).toHaveBeenCalledWith([authServiceConfig.failedAuthRedirect, 'expired']);
      },
    ));
  });
});

/**
 * A network status starting offline and driven by hand: the real service reads
 * `navigator.onLine`, which always reports online in the test browser.
 */
class OfflineStartNetworkStatusService extends NetworkStatusService {
  private _status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    super();
    this._isOnline$ = this._status.pipe(
      distinctUntilChanged(),
      tap(isOnline => this.updateStatusHistory(isOnline, 2)),
      shareReplay({bufferSize: 1, refCount: false}),
    );
  }

  setOnline(isOnline: boolean): void {
    this._status.next(isOnline);
  }
}

// A tablet left in background for days comes back as a fresh app start, most
// likely still offline: the reconnection that follows is the only chance to
// refresh the token and push what was collected, and it used to be skipped.
describe('JWTInterceptor - session started offline', () => {
  let httpMock: HttpTestingController;
  let nss: OfflineStartNetworkStatusService;

  beforeEach(() => {
    localStorage.setItem('dino_auth_token', 'stored_token');
    localStorage.setItem('dino_refresh_token', 'stored_refresh_token');
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        JWTInterceptor,
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {provide: NetworkStatusService, useClass: OfflineStartNetworkStatusService},
        {provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true},
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    nss = TestBed.inject(NetworkStatusService) as OfflineStartNetworkStatusService;
  });

  afterEach(() => {
    localStorage.removeItem('dino_auth_token');
    localStorage.removeItem('dino_refresh_token');
  });

  it('refreshes the expired token on the first reconnection', inject(
    [HTTP_INTERCEPTORS],
    (interceptors: HttpInterceptor[]) => {
      // Injecting subscribes the reconnection handler while still offline.
      expect(interceptors.find(i => i instanceof JWTInterceptor)).toBeDefined();

      nss.setOnline(true);

      const refreshRequests = httpMock.match('http://test-auth-backend/api/jwt/refresh');
      expect(refreshRequests.length).toBe(1);
      expect(refreshRequests[0].request.body.refreshToken).toBe('stored_refresh_token');
    },
  ));

  it('does not refresh while the session stays offline', inject(
    [HTTP_INTERCEPTORS],
    (interceptors: HttpInterceptor[]) => {
      expect(interceptors.find(i => i instanceof JWTInterceptor)).toBeDefined();

      // A repeated offline status must not be read as a transition.
      nss.setOnline(false);

      httpMock.expectNone('http://test-auth-backend/api/jwt/refresh');
    },
  ));
});
