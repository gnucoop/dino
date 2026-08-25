import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpInterceptor,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';

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
  // not pushed yet: these are the two paths that used to reach it on a failure
  // that proves nothing about the session being dead.
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
        const logoutSpy = spyOn<any>((jwtInterceptor as any)._logoutEvt, 'emit');

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
        expect(logoutSpy).not.toHaveBeenCalled();
      },
    ));

    it('does not log out when the refresh on reconnection fails', inject(
      [HTTP_INTERCEPTORS, AuthService],
      (interceptors: HttpInterceptor[], authService: AuthService) => {
        const jwtInterceptor = interceptors.find(
          i => i instanceof JWTInterceptor,
        ) as JWTInterceptor;
        const logoutSpy = spyOn<any>((jwtInterceptor as any)._logoutEvt, 'emit');

        window.dispatchEvent(new Event('offline'));
        window.dispatchEvent(new Event('online'));

        // The stored token is expired, so the reconnection asks for a refresh.
        const refreshRequests = httpMock.match(refreshUrl);
        expect(refreshRequests.length).toBe(1);
        refreshRequests[0].flush(null, {status: 500, statusText: 'Server Error'});

        expect(authService.authenticated.value).toEqual({auth: false, evt: 'refresh failed'});
        // A refresh that failed at the very moment the connection came back is
        // no reason to wipe the local database.
        expect(logoutSpy).not.toHaveBeenCalled();
      },
    ));
  });
});
