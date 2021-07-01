import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpInterceptor,
} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AUTH_SERVICE_CONFIG, AuthServiceConfig, JWTInterceptor} from '@dewco/core/auth';

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
  status: 401
};

const response = {
  statusText: 'Test response',
  status: 200
};
describe(`JWTInterceptor`, () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        JWTInterceptor,
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true},
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should handle the 401 response and ask the service to refresh the Jwt auth token',
     inject(
         [HTTP_INTERCEPTORS, HttpClient], (interceptors: HttpInterceptor[], http: HttpClient) => {
           const jwtInterceptor =
               interceptors.find(i => i instanceof JWTInterceptor) as JWTInterceptor;
           expect(jwtInterceptor).toBeDefined();

           let isLoginSpy = spyOn<any>(jwtInterceptor, '_isLoginRequest').and.callThrough();
           let refreshSpy = spyOn<any>(jwtInterceptor.handleRefreshEvt, 'emit').and.callThrough();

           http.post('http://test-auth-backend/data', {}).subscribe(res => {
             expect(res).toBeDefined();
           });
           const req = httpMock.expectOne('http://test-auth-backend/data');
           expect(req.request.method).toBe('POST');
           req.flush(null, unauthorizedResponse);

           expect(isLoginSpy).toHaveBeenCalledTimes(1);
           expect(refreshSpy).toHaveBeenCalledTimes(1);
         }));

  it('should not call the 401 handler or ask the service to refresh the Jwt auth token',
     inject(
         [HTTP_INTERCEPTORS, HttpClient], (interceptors: HttpInterceptor[], http: HttpClient) => {
           const jwtInterceptor =
               interceptors.find(i => i instanceof JWTInterceptor) as JWTInterceptor;
           expect(jwtInterceptor).toBeDefined();

           let isLoginSpy = spyOn<any>(jwtInterceptor, '_isLoginRequest').and.callThrough();
           let refreshSpy = spyOn<any>(jwtInterceptor.handleRefreshEvt, 'emit').and.callThrough();

           http.post('http://test-auth-backend/data', {}).subscribe(res => {
             expect(res).toBeDefined();
           });
           const req = httpMock.expectOne('http://test-auth-backend/data');
           expect(req.request.method).toBe('POST');
           req.flush(response);

           expect(isLoginSpy).not.toHaveBeenCalled();
           expect(refreshSpy).not.toHaveBeenCalled();
         }));
});
