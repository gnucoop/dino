import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {
  AUTH_SERVICE_CONFIG,
  AuthService,
  AuthServiceConfig,
  LoginResponse,
} from '@dewco/core/auth';

const authServiceConfig: AuthServiceConfig = {
  host: 'http://test-auth-backend',
  applicationId: 'applicationId',
  apiKey: 'apiKey',
};

const loginResponse: LoginResponse = {
  refreshToken: 'refreshToken',
  token: 'token',
  user: {
    id: 'id',
    email: 'test@dewco.io',
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

const refreshResponse: {token: string} = {
  token: 'newToken'
};

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AuthService,
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
      ],
    });
    authService = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.removeItem('dewco_auth_token');
    localStorage.removeItem('dewco_refresh_token');
    localStorage.removeItem('dewco_user_info');
  });

  it('should login successfully with correct credentials', () => {
    authService.login({email: 'test@dewco.io', password: 'test'}).subscribe(res => {
      expect(res).toBeDefined();
    });
    const req = httpMock.expectOne('http://test-auth-backend/api/login');
    expect(req.request.method).toBe('POST');
    req.flush(loginResponse);
  });

  it('should fail logging in with bad credentials', () => {
    authService.login({email: 'test@dewco.io', password: 'test'}).subscribe(() => {}, err => {
      expect(err).toBeDefined();
    });
    const req = httpMock.expectOne('http://test-auth-backend/api/login');
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent(''));
  });

  it('should save the jwt token in local storage using the default key upon login', () => {
    expect(localStorage.getItem('dewco_auth_token')).toBeNull();
    authService.login({email: 'test@dewco.io', password: 'test'}).subscribe(res => {
      expect(res).toBeDefined();
    });
    const req = httpMock.expectOne('http://test-auth-backend/api/login');
    expect(req.request.method).toBe('POST');
    req.flush(loginResponse);

    expect(localStorage.getItem('dewco_auth_token')).toEqual(loginResponse.token);
    expect(authService.getAuthToken()).toEqual(loginResponse.token);
  });

  it('should save the jwt refresh token in local storage using the default key upon login', () => {
    expect(localStorage.getItem('dewco_refresh_token')).toBeNull();
    authService.login({email: 'test@dewco.io', password: 'test'}).subscribe(res => {
      expect(res).toBeDefined();
    });
    const req = httpMock.expectOne('http://test-auth-backend/api/login');
    expect(req.request.method).toBe('POST');
    req.flush(loginResponse);

    expect(localStorage.getItem('dewco_refresh_token')).toEqual(loginResponse.refreshToken);
    expect(authService.getRefreshToken()).toEqual(loginResponse.refreshToken);
  });

  it('should save the logged in user info in local storage using the default key upon login',
     () => {
       expect(localStorage.getItem('dewco_user_info')).toBeNull();
       authService.login({email: 'test@dewco.io', password: 'test'}).subscribe(res => {
         expect(res).toBeDefined();
       });
       const req = httpMock.expectOne('http://test-auth-backend/api/login');
       expect(req.request.method).toBe('POST');
       req.flush(loginResponse);

       expect(JSON.parse(localStorage.getItem('dewco_user_info')!)).toEqual(loginResponse.user);
       expect(authService.getUserInfo()).toEqual(loginResponse.user);
     });
});

describe('refresh token', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AuthService,
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
      ],
    });
    authService = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);

    localStorage.setItem('dewco_auth_token', loginResponse.token);
    localStorage.setItem('dewco_refresh_token', loginResponse.refreshToken);
  });

  afterEach(() => {
    localStorage.removeItem('dewco_auth_token');
    localStorage.removeItem('dewco_refresh_token');
  });

  it('should refresh and save the jwt token in local storage using the default key upon login',
     () => {
       authService.refreshToken().subscribe(res => {
         expect(res).toBeDefined();
       });
       const req = httpMock.expectOne('http://test-auth-backend/api/jwt/refresh');
       expect(req.request.method).toBe('POST');
       req.flush(refreshResponse);

       expect(localStorage.getItem('dewco_auth_token')).toEqual(refreshResponse.token);
       expect(authService.getAuthToken()).toEqual(refreshResponse.token);
     });

  it('should fail refreshing the jwt token if no/wrong refresh token is provided', () => {
    authService.refreshToken().subscribe(() => {}, err => {
      expect(err).toBeDefined();
    });
    const req = httpMock.expectOne('http://test-auth-backend/api/jwt/refresh');
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent(''));

    expect(localStorage.getItem('dewco_auth_token')).toEqual(loginResponse.token);
    expect(authService.getAuthToken()).toEqual(loginResponse.token);
  });
});

describe('logged in', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AuthService,
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
      ],
    });
    authService = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);

    localStorage.setItem('dewco_auth_token', loginResponse.token);
    localStorage.setItem('dewco_refresh_token', loginResponse.refreshToken);
    localStorage.setItem('dewco_user_info', JSON.stringify(loginResponse.user));
  });

  afterEach(() => {
    localStorage.removeItem('dewco_auth_token');
    localStorage.removeItem('dewco_refresh_token');
    localStorage.removeItem('dewco_user_info');
  });

  it('should logout successfully', () => {
    authService.logout().subscribe(res => {
      expect(res).toBeDefined();
    });
  });

  it('should delete the jwt token saved in local storage using the default key upon logout', () => {
    expect(localStorage.getItem('dewco_auth_token')).not.toBeNull();
    authService.logout().subscribe(res => {
      expect(res).toBeDefined();
    });

    const req = httpMock.expectOne(
        'http://test-auth-backend/api/logout?global=false&refreshToken=' +
        loginResponse.refreshToken);
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(localStorage.getItem('dewco_auth_token')).toBeNull();
    expect(authService.getAuthToken()).toBeNull();
  });

  it('should delete the jwt refresh token saved in local storage using the default key upon logout',
     () => {
       expect(localStorage.getItem('dewco_refresh_token')).not.toBeNull();
       authService.logout().subscribe(res => {
         expect(res).toBeDefined();
       });

       const req = httpMock.expectOne(
           'http://test-auth-backend/api/logout?global=false&refreshToken=' +
           loginResponse.refreshToken);
       expect(req.request.method).toBe('POST');
       req.flush({});

       expect(localStorage.getItem('dewco_refresh_token')).toBeNull();
       expect(authService.getAuthToken()).toBeNull();
     });

  it('should delete the user info saved in local storage using the default key upon logout', () => {
    expect(localStorage.getItem('dewco_user_info')).not.toBeNull();
    authService.logout().subscribe(res => {
      expect(res).toBeDefined();
    });

    const req = httpMock.expectOne(
        'http://test-auth-backend/api/logout?global=false&refreshToken=' +
        loginResponse.refreshToken);
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(localStorage.getItem('dewco_user_info')).toBeNull();
    expect(authService.getAuthToken()).toBeNull();
  });
});

describe('custom local storage keys', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
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
      ],
    });
    authService = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.removeItem('auth_token_ls_key');
    localStorage.removeItem('refresh_token_ls_key');
    localStorage.removeItem('user_info_ls_key');
  });

  it('should save the jwt auth token in local storage using the user defined key upon login',
     () => {
       expect(localStorage.getItem('auth_token_ls_key')).toBeNull();
       authService.login({email: 'test@dewco.io', password: 'test'}).subscribe(res => {
         expect(res).toBeDefined();
       });
       const req = httpMock.expectOne('http://test-auth-backend/api/login');
       expect(req.request.method).toBe('POST');
       req.flush(loginResponse);

       expect(localStorage.getItem('auth_token_ls_key')).toEqual(loginResponse.token);
       expect(authService.getAuthToken()).toEqual(loginResponse.token);
     });

  it('should save the jwt refresh token in local storage using the user defined key upon login',
     () => {
       expect(localStorage.getItem('refresh_token_ls_key')).toBeNull();
       authService.login({email: 'test@dewco.io', password: 'test'}).subscribe(res => {
         expect(res).toBeDefined();
       });
       const req = httpMock.expectOne('http://test-auth-backend/api/login');
       expect(req.request.method).toBe('POST');
       req.flush(loginResponse);

       expect(localStorage.getItem('refresh_token_ls_key')).toEqual(loginResponse.refreshToken);
     });

  it('should save the jwt refresh token in local storage using the user defined key upon login',
     () => {
       expect(localStorage.getItem('refresh_token_ls_key')).toBeNull();
       authService.login({email: 'test@dewco.io', password: 'test'}).subscribe(res => {
         expect(res).toBeDefined();
       });
       const req = httpMock.expectOne('http://test-auth-backend/api/login');
       expect(req.request.method).toBe('POST');
       req.flush(loginResponse);

       expect(localStorage.getItem('refresh_token_ls_key')).toEqual(loginResponse.refreshToken);
       expect(authService.getRefreshToken()).toEqual(loginResponse.refreshToken);
     });

  it('should save the logged in user info in local storage using the user defined key upon login',
     () => {
       expect(localStorage.getItem('user_info_ls_key')).toBeNull();
       authService.login({email: 'test@dewco.io', password: 'test'}).subscribe(res => {
         expect(res).toBeDefined();
       });
       const req = httpMock.expectOne('http://test-auth-backend/api/login');
       expect(req.request.method).toBe('POST');
       req.flush(loginResponse);

       expect(JSON.parse(localStorage.getItem('user_info_ls_key')!)).toEqual(loginResponse.user);
       expect(authService.getUserInfo()).toEqual(loginResponse.user);
     });
});

describe('custom local storage keys - logged in', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
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
      ],
    });
    authService = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);

    localStorage.setItem('auth_token_ls_key', loginResponse.token);
    localStorage.setItem('refresh_token_ls_key', loginResponse.refreshToken);
    localStorage.setItem('user_info_ls_key', JSON.stringify(loginResponse.user));
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.removeItem('auth_token_ls_key');
    localStorage.removeItem('refresh_token_ls_key');
    localStorage.removeItem('user_info_ls_key');
  });

  it('should delete the jwt token saved in local storage using the user defined key upon logout',
     () => {
       expect(localStorage.getItem('auth_token_ls_key')).not.toBeNull();
       authService.logout().subscribe(res => {
         expect(res).toBeDefined();
       });

       const req = httpMock.expectOne(
           'http://test-auth-backend/api/logout?global=false&refreshToken=' +
           loginResponse.refreshToken);
       expect(req.request.method).toBe('POST');
       req.flush({});

       expect(localStorage.getItem('auth_token_ls_key')).toBeNull();
       expect(authService.getAuthToken()).toBeNull();
     });

  it('should delete the jwt refresh token saved in local storage using the user defined key' +
         ' upon logout',
     () => {
       expect(localStorage.getItem('refresh_token_ls_key')).not.toBeNull();
       authService.logout().subscribe(res => {
         expect(res).toBeDefined();
       });

       const req = httpMock.expectOne(
           'http://test-auth-backend/api/logout?global=false&refreshToken=' +
           loginResponse.refreshToken);
       expect(req.request.method).toBe('POST');
       req.flush({});

       expect(localStorage.getItem('refresh_token_ls_key')).toBeNull();
       expect(authService.getAuthToken()).toBeNull();
     });

  it('should delete the user info saved in local storage using the user defined key upon logout',
     () => {
       expect(localStorage.getItem('user_info_ls_key')).not.toBeNull();
       authService.logout().subscribe(res => {
         expect(res).toBeDefined();
       });

       const req = httpMock.expectOne(
           'http://test-auth-backend/api/logout?global=false&refreshToken=' +
           loginResponse.refreshToken);
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
      imports: [
        HttpClientTestingModule,
      ],
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
      ],
    });
    authService = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should save the jwt refresh token using the user defined function upon login', () => {
    authService.login({email: 'test@dewco.io', password: 'test'}).subscribe(res => {
      expect(res).toBeDefined();
    });
    const req = httpMock.expectOne('http://test-auth-backend/api/login');
    expect(req.request.method).toBe('POST');
    req.flush(loginResponse);

    expect(storeAuthTokenSpy).toHaveBeenCalledTimes(1);
    authService.getAuthToken();
    expect(retrieveAuthTokenSpy).toHaveBeenCalledTimes(1);
  });

  it('should save the jwt refresh token using the user defined function upon login', () => {
    authService.login({email: 'test@dewco.io', password: 'test'}).subscribe(res => {
      expect(res).toBeDefined();
    });
    const req = httpMock.expectOne('http://test-auth-backend/api/login');
    expect(req.request.method).toBe('POST');
    req.flush(loginResponse);

    expect(storeRefreshTokenSpy).toHaveBeenCalledTimes(1);
    authService.getRefreshToken();
    expect(retrieveRefreshTokenSpy).toHaveBeenCalledTimes(1);
  });

  it('should save the logged in user info using the user defined function upon login', () => {
    authService.login({email: 'test@dewco.io', password: 'test'}).subscribe(res => {
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
      imports: [
        HttpClientTestingModule,
      ],
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
      ],
    });
    authService = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should delete the jwt token saved using the user defined function upon logout', () => {
    authService.logout().subscribe(res => {
      expect(res).toBeDefined();
    });

    const req =
        httpMock.expectOne('http://test-auth-backend/api/logout?global=false&refreshToken=null');
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(storeAuthTokenSpy).toHaveBeenCalledTimes(1);
  });

  it('should delete the jwt refresh token saved using the user defined function upon logout',
     () => {
       authService.logout().subscribe(res => {
         expect(res).toBeDefined();
       });

       const req =
           httpMock.expectOne('http://test-auth-backend/api/logout?global=false&refreshToken=null');
       expect(req.request.method).toBe('POST');
       req.flush({});

       expect(storeRefreshTokenSpy).toHaveBeenCalledTimes(1);
     });

  it('should delete the user info saved using the user defined function upon logout', () => {
    authService.logout().subscribe(res => {
      expect(res).toBeDefined();
    });

    const req =
        httpMock.expectOne('http://test-auth-backend/api/logout?global=false&refreshToken=null');
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(storeUserInfoSpy).toHaveBeenCalledTimes(1);
  });
});
