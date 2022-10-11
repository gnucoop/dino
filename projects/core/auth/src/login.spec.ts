import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ChangeDetectorRef, EventEmitter} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable, of as obsOf} from 'rxjs';
import {TranslocoService} from '@ngneat/transloco';
import {AjfTranslocoModule} from '@ajf/core/transloco';

import {AuthService, Credentials, LoginComponent, NHostSignupRequest} from './public_api';

const authServiceMock = {
  authenticated: obsOf({auth: true, evt: 'init'}),
  loginSuccess: true,
  login(_: Credentials): Observable<boolean> {
    return obsOf(authServiceMock.loginSuccess);
  },
  config: {signUp: true},
  resetAuth: (): void => {},
  logout: () => obsOf(false),
  logoutEvt: new EventEmitter<void>(),
  signupNHost: (_requestData: NHostSignupRequest): Observable<boolean> => obsOf(true),
};

const changeDetectorRefMock = {
  markForCheck() {},
};

class LoginFeatComp extends LoginComponent {
  loginResult = '';
  constructor(
    authService: AuthService,
    router: Router,
    fb: FormBuilder,
    cdr: ChangeDetectorRef,
    snackBar: MatSnackBar,
    ts: TranslocoService,
  ) {
    super(authService, router, fb, cdr, snackBar, ts);
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
  let snackBar: MatSnackBar;
  let ts: TranslocoService;
  let cdr: ChangeDetectorRef;
  let loginFeatComp: LoginFeatComp;
  let spyLogin: jasmine.Spy;
  let spyPostLogin: jasmine.Spy;
  let routerSpy = {
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AjfTranslocoModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        MatSnackBarModule,
      ],
      providers: [
        FormBuilder,
        {provide: ChangeDetectorRef, useValue: changeDetectorRefMock},
        {provide: AuthService, useValue: authServiceMock},
        {provide: Router, useValue: routerSpy},
      ],
    });
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    fb = TestBed.inject(FormBuilder);
    cdr = TestBed.inject(ChangeDetectorRef);
    snackBar = TestBed.inject(MatSnackBar);
    ts = TestBed.inject(TranslocoService);
    loginFeatComp = new LoginFeatComp(authService, router, fb, cdr, snackBar, ts);
    spyLogin = spyOn(authService, 'login').and.callThrough();
    spyPostLogin = spyOn(loginFeatComp, 'setLoginResult').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should login successfully and navigate to home url with correct credentials', async () => {
    const formValue = {
      email: 'user@dino.io',
      password: 'dino',
    };
    loginFeatComp.loginForm.setValue(formValue);
    loginFeatComp.login();
    await Promise.resolve();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/', {replaceUrl: true});
    expect(spyLogin).toHaveBeenCalledWith(formValue);
  });

  it('should login successfully with correct credentials and call postLogin function', async () => {
    const formValue = {
      email: 'user@dino.io',
      password: 'dino',
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
    expect(loginFeatComp.loginError.error).toBeTrue();
    authServiceMock.loginSuccess = true;
  });

  it('should attempt to signup a new user', async () => {
    const spySignup = spyOn(authService, 'signupNHost').and.callThrough();
    const signupFormValue = {
      full_name: 'New User',
      email: 'new@mail.io',
      password: 'password',
      confirm_password: 'password',
    };
    const signupCredentials: NHostSignupRequest = {
      email: signupFormValue.email,
      password: signupFormValue.password,
      options: {
        displayName: signupFormValue.full_name,
      },
    };
    loginFeatComp.signupForm?.setValue(signupFormValue);
    loginFeatComp.signup();
    await Promise.resolve();
    expect(spySignup).toHaveBeenCalledWith(signupCredentials);
  });
});
