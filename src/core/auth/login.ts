/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dewco (dewco).
 *
 * Dewco (dewco) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dewco (dewco) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dewco (dewco).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {ChangeDetectorRef, Directive, Input} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {
  map,
  startWith,
} from 'rxjs/operators';

import {AuthService} from './auth-service';

/**
 * The base Login Component extended by Material and Ionic Login Components
 */
@Directive()
export abstract class LoginComponent {
  // An optional method to be executed after a successful login
  private _postLogin: Function;
  @Input()
  set postLogin(fn: Function) {
    this._postLogin = fn;
  }

  readonly loginForm: FormGroup;
  readonly submitDisabled: Observable<boolean>;
  loggingIn = false;

  private _loginError: boolean = false;
  get loginError(): boolean {
    return this._loginError;
  }

  constructor(
      private _authService: AuthService,
      private _router: Router,
      fb: FormBuilder,
      private _cdr: ChangeDetectorRef,
  ) {
    this.loginForm = fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

    this.submitDisabled = this.loginForm.valueChanges.pipe(
        map(_ => !this.loginForm.valid),
        startWith(!this.loginForm.valid),
    );
  }

  /**
   * User login method. Executes an optional method or redirects to home after login is successful.
   */
  login(): void {
    if (!this.loginForm.valid || this.loggingIn) {
      return;
    }
    this.loggingIn = true;
    const credentials = this.loginForm.value;
    const sub = this._authService.login(credentials)
                    .subscribe(
                        (res) => {
                          if (res) {
                            this._setLoginError(false);
                            if (this._postLogin != undefined) {
                              this._postLogin();
                            } else {
                              this._router.navigateByUrl('/', {replaceUrl: true});
                            }
                          } else {
                            this._setLoginError(true);
                          }
                          if (sub) {
                            sub.unsubscribe();
                          }
                          this.loggingIn = false;
                        },
                        _ => {
                          this._setLoginError(true);
                          if (sub) {
                            sub.unsubscribe();
                          }
                          this.loggingIn = false;
                        });
  }

  private _setLoginError(error: boolean): void {
    if (this._loginError !== error) {
      this._loginError = error;
    }
    this._cdr.markForCheck();
  }
}
