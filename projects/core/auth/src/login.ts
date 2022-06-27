/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dino (dino).
 *
 * Dino (dino) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dino (dino) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dino (dino).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {ChangeDetectorRef, Directive, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, of as obsOf} from 'rxjs';
import {map, startWith, switchMap, take} from 'rxjs/operators';
import {NHostSignupRequest} from './auth-response';
import {AuthService} from './auth-service';
import {PasswordMatch} from './user-password-validator';
import {showValidationErrors} from './validation-errors';

/**
 * Represents an Authentication Error
 */
export interface AuthError {
  error: boolean;
  message: string | null;
}

/**
 * The base Login Component extended by Material Login Components
 */
@Directive()
export abstract class LoginComponent {
  /**
   * True if the user is authenticated and logged in.
   */
  loggedIn: Observable<boolean>;

  /**
   * The signup FormGroup.
   */
  signupForm: FormGroup | undefined;

  /**
   * If true, the signup form is displayed in place of the login form
   */
  readonly showSignupForm: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * The login FormGroup.
   */
  readonly loginForm: FormGroup;

  /**
   * Displays the login/signup validation errors
   */
  readonly showValErrors = showValidationErrors;

  /**
   * True if the submit button is disabled.
   */
  readonly loginDisabled: Observable<boolean>;
  readonly signupDisabled: Observable<boolean> | undefined;

  /**
   * True if the Login or Signup forms are currently processing a Login/Signup request.
   */
  processing = false;

  /**
   * Error is True if login was not successful.
   */
  private _loginError: AuthError = {error: false, message: null};
  get loginError(): AuthError {
    return this._loginError;
  }

  /**
   * Error is True if signup was not successful.
   */
  private _signupError: AuthError = {error: false, message: null};
  get signupError(): AuthError {
    return this._signupError;
  }

  /**
   * An optional method to be executed after a successful login
   */
  private _postLogin?: Function;
  @Input()
  set postLogin(fn: Function) {
    this._postLogin = fn;
  }

  constructor(
    private _authService: AuthService,
    private _router: Router,
    fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
  ) {
    this._authService.resetAuth();

    if (this._authService.config.signUp) {
      this.signupForm = fb.group({
        full_name: [null, [Validators.required]],
        email: [null, [Validators.email, Validators.required]],
        password: [null, [Validators.required, Validators.minLength(8)]],
        confirm_password: [null, [Validators.required, Validators.minLength(8), PasswordMatch]],
      });

      this.signupDisabled = this.signupForm.valueChanges.pipe(
        map(_ => !this.signupForm?.valid),
        startWith(!this.signupForm.valid),
      );
    }

    this.loginForm = fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

    this.loginDisabled = this.loginForm.valueChanges.pipe(
      map(_ => !this.loginForm.valid),
      startWith(!this.loginForm.valid),
    );

    this.loggedIn = this._authService.authenticated;
  }

  /**
   * User login method. Executes an optional method or redirects to home after login is successful.
   */
  login(): void {
    if (!this.loginForm.valid || this.processing) {
      return;
    }
    this.processing = true;
    const credentials = this.loginForm.value;
    this._authService
      .login(credentials)
      .pipe(take(1))
      .subscribe({
        next: res => {
          if (res) {
            this._setLoginError({error: false, message: null});
            if (this._postLogin != undefined) {
              this._postLogin();
            } else {
              this._router.navigateByUrl('/', {replaceUrl: true});
            }
          } else {
            this._setLoginError({error: true, message: null});
          }
          this.processing = false;
        },
        error: err => {
          this._setLoginError({
            error: true,
            message: err.error.message ?? 'Incorrect email and/or password',
          });
          this.processing = false;
        },
      });
  }

  /**
   * User signup method. Executes an optional method or redirects to home after signup/login is successful.
   */
  signup(): void {
    if (!this.signupForm || !this.signupForm.valid || this.processing) {
      return;
    }
    const formValue = this.signupForm.value;
    this.processing = true;
    const credentials: NHostSignupRequest = {
      email: formValue.email,
      password: formValue.password,
      options: {
        displayName: formValue.full_name,
      },
    };
    this._authService
      .signupNHost(credentials)
      .pipe(
        switchMap(signupRes => {
          if (!signupRes) {
            return obsOf(null);
          }
          if (signupRes.error || !signupRes.session) {
            return obsOf(signupRes);
          } else {
            this._authService.setNewUser(signupRes.session.user);
            return this._authService
              .login({
                email: credentials.email,
                password: credentials.password,
              })
              .pipe(map(_loginRes => signupRes));
          }
        }),
        take(1),
      )
      .subscribe({
        next: res => {
          if (res && !res.error) {
            this._setSignupError({error: false, message: null});
            this.toggleSignupForm(false);
            this._router.navigateByUrl('/', {replaceUrl: true});
          } else if (res && res.error) {
            this._setSignupError({error: true, message: res.message ?? null});
          }
          this.processing = false;
        },
        error: _ => {
          this._setSignupError({error: true, message: null});
          this.processing = false;
        },
      });
  }

  /**
   * User logout method.
   */
  logout(): void {
    this._authService
      .logout()
      .pipe(take(1))
      .subscribe(res => {
        if (res) {
          this._router.navigate([this._router.url]);
        }
      });
  }

  /**
   * Toggles the signup form
   * @param toggle If true, the signup form is displayed if available
   */
  toggleSignupForm(toggle: boolean): void {
    this.showSignupForm.next(toggle);
  }

  private _setLoginError(loginError: AuthError): void {
    this._loginError = loginError;
    this._cdr.markForCheck();
  }

  private _setSignupError(signupError: AuthError): void {
    this._signupError = signupError;
    this._cdr.markForCheck();
  }
}
