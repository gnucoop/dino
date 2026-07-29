import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpInterceptor,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';

import {AUTH_SERVICE_CONFIG, AuthServiceConfig, JWTInterceptor} from './public_api';

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
});
