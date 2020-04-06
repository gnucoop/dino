import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';
import {HTTP_INTERCEPTORS, HttpInterceptor, HttpClient} from '@angular/common/http';
import {
  AUTH_SERVICE_CONFIG,
  AuthService,
  AuthServiceConfig,
  JWTInterceptor
} from '@dewco/core/auth';

const authServiceConfig: AuthServiceConfig = {
  host: 'http://test-auth-backend',
  applicationId: 'applicationId',
  apiKey: 'apiKey'
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
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        JWTInterceptor,
        { provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JWTInterceptor,
          multi: true
        }
      ]
    });

    authService = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should handle the 401 response and ask the service to refresh the Jwt auth token', inject(
    [HTTP_INTERCEPTORS, HttpClient],
    (interceptors: HttpInterceptor[], http: HttpClient) => {
      const jwtInterceptor = interceptors.find(
        i => i instanceof JWTInterceptor
      ) as JWTInterceptor;
      expect(jwtInterceptor).toBeDefined();

      let handle401Spy = spyOn<any>(jwtInterceptor, '_handle401').and.callThrough();
      let refreshSpy = spyOn(authService, 'refreshToken').and.callThrough();

      http.post('http://test-auth-backend/data', {}).subscribe(
        res => {
          expect(res).toBeDefined();
        }
      );
      const req = httpMock.expectOne('http://test-auth-backend/data');
      expect(req.request.method).toBe('POST');
      req.flush(null, unauthorizedResponse);

      expect(handle401Spy).toHaveBeenCalledTimes(1);
      expect(refreshSpy).toHaveBeenCalledTimes(1);
    }
  ));

  it('should not call the 401 handler or ask the service to refresh the Jwt auth token', inject(
    [HTTP_INTERCEPTORS, HttpClient],
    (interceptors: HttpInterceptor[], http: HttpClient) => {
      const jwtInterceptor = interceptors.find(
        i => i instanceof JWTInterceptor
      ) as JWTInterceptor;
      expect(jwtInterceptor).toBeDefined();

      let handle401Spy = spyOn<any>(jwtInterceptor, '_handle401').and.callThrough();
      let refreshSpy = spyOn(authService, 'refreshToken').and.callThrough();

      http.post('http://test-auth-backend/data', {}).subscribe(
        res => {
          expect(res).toBeDefined();
        }
      );
      const req = httpMock.expectOne('http://test-auth-backend/data');
      expect(req.request.method).toBe('POST');
      req.flush(response);

      expect(handle401Spy).not.toHaveBeenCalled();
      expect(refreshSpy).not.toHaveBeenCalled();
    }
  ));

});
