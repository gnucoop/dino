import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ChangeDetectorRef} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable, of as obsOf} from 'rxjs';

import {AuthService, Credentials, LoginComponent} from './index';

const authServiceMock = {
  loginSuccess: true,
  login(_: Credentials): Observable<boolean> {
    return obsOf(authServiceMock.loginSuccess);
  },
  resetAuth: (): void => {},
};

const changeDetectorRefMock = {
  markForCheck() {},
};

class LoginFeatComp extends LoginComponent {
  loginResult = '';
  constructor(authService: AuthService, router: Router, fb: FormBuilder, cdr: ChangeDetectorRef) {
    super(authService, router, fb, cdr);
  }

  setLoginResult = function (this: LoginFeatComp, res: string) {
    this.loginResult = res;
  };
}

describe('LoginComponent', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let router: Router;
  let fb: FormBuilder;
  let cdr: ChangeDetectorRef;
  let loginFeatComp: LoginFeatComp;
  let spyLogin: jasmine.Spy;
  let spyPostLogin: jasmine.Spy;
  let routerSpy = {navigateByUrl: jasmine.createSpy('navigateByUrl')};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        FormBuilder,
        {provide: ChangeDetectorRef, useValue: changeDetectorRefMock},
        {provide: AuthService, useValue: authServiceMock},
        {provide: Router, useValue: routerSpy},
      ],
    });
    authService = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
    router = TestBed.get(Router);
    fb = TestBed.get(FormBuilder);
    cdr = TestBed.get(ChangeDetectorRef);
    loginFeatComp = new LoginFeatComp(authService, router, fb, cdr);
    spyLogin = spyOn(authService, 'login').and.callThrough();
    spyPostLogin = spyOn(loginFeatComp, 'setLoginResult').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should login successfully and navigate to home url with correct credentials', async () => {
    const formValue = {
      email: 'user@dewco.io',
      password: 'dewco',
    };
    loginFeatComp.loginForm.setValue(formValue);
    loginFeatComp.login();
    await Promise.resolve();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/', {replaceUrl: true});
    expect(spyLogin).toHaveBeenCalledWith(formValue);
  });

  it('should login successfully with correct credentials and call postLogin function', async () => {
    const formValue = {
      email: 'user@dewco.io',
      password: 'dewco',
    };
    loginFeatComp.postLogin = loginFeatComp.setLoginResult;
    loginFeatComp.loginForm.setValue(formValue);
    loginFeatComp.login();
    await Promise.resolve();
    expect(spyPostLogin).toHaveBeenCalled();
    expect(spyLogin).toHaveBeenCalledWith(formValue);
  });

  it('should not login without correct credentials', async () => {
    authServiceMock.loginSuccess = false;
    const formValue = {
      email: 'wrong@mail.io',
      password: 'psw',
    };
    loginFeatComp.loginForm.setValue(formValue);
    loginFeatComp.login();
    await Promise.resolve();
    expect(spyLogin).toHaveBeenCalledWith(formValue);
    expect(loginFeatComp.loginError).toBeTrue();
    authServiceMock.loginSuccess = true;
  });
});
