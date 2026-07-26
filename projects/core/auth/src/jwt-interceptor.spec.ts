import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpErrorResponse,
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

  it('should ask the service to refresh the Jwt auth token and propagate the 401', inject(
    [HTTP_INTERCEPTORS, HttpClient],
    (interceptors: HttpInterceptor[], http: HttpClient) => {
      const jwtInterceptor = interceptors.find(i => i instanceof JWTInterceptor) as JWTInterceptor;
      expect(jwtInterceptor).toBeDefined();

      let isLoginSpy = spyOn<any>(jwtInterceptor, '_isAllowedRequest').and.callThrough();
      let refreshSpy = spyOn<any>(jwtInterceptor.handleRefreshEvt, 'emit').and.callThrough();

      const errors: HttpErrorResponse[] = [];
      http.post('http://test-auth-backend/data', {}).subscribe({
        next: () => fail('a 401 must not be reported to the caller as a successful response'),
        // The interceptor used to emit `null` here. Callers expect an
        // HttpResponse, so that corrupted them silently — Apollo read
        // `response.body` off the null and ended up resolving `undefined`,
        // surfacing an auth failure as an empty result. The refresh is still
        // requested; the failure is simply also reported.
        error: (err: HttpErrorResponse) => {
          errors.push(err);
        },
      });
      const req = httpMock.expectOne('http://test-auth-backend/data');
      expect(req.request.method).toBe('POST');
      req.flush(null, unauthorizedResponse);

      expect(errors.length).toBe(1);
      expect(errors[0].status).toBe(401);
      expect(isLoginSpy).toHaveBeenCalledTimes(1);
      expect(refreshSpy).toHaveBeenCalledTimes(1);
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
