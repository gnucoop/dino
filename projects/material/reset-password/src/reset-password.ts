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

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MatLegacySnackBar as MatSnackBar} from '@angular/material/legacy-snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthError, AuthService, PasswordMatch, showValidationErrors} from '@dino/core/auth';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map, startWith, switchMap, take, tap} from 'rxjs/operators';
import {TranslocoService} from '@ngneat/transloco';

/**
 * Component that allows the user to reset their password
 */
@Component({
  selector: 'dino-reset-password',
  styleUrls: ['reset-password.scss'],
  templateUrl: 'reset-password.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ResetPassword {
  readonly invalidTicket: Observable<boolean>;
  /**
   * The Login page logo image path/url.
   */
  private _logoImagePath: string = '';
  get logoImagePath(): string {
    return this._logoImagePath;
  }
  @Input()
  set logoImagePath(url: string) {
    this._logoImagePath = url;
  }
  /**
   * The Change Password FormGroup.
   */
  readonly changePassForm: UntypedFormGroup;
  /**
   * True if the Change Password or Email forms are currently processing a request.
   */
  processing = false;
  /**
   * Error is True if authentication was not successful.
   */
  private _changePassError: AuthError = {error: false, message: null};
  get changePassError(): AuthError {
    return this._changePassError;
  }
  /**
   * Displays the login/signup validation errors
   */
  readonly showValErrors = showValidationErrors;
  /**
   * True if the submit button for changing the password is disabled.
   */
  readonly changePassDisabled: Observable<boolean>;
  /**
   * If true, the password has successfully been changed
   */
  readonly passChanged: BehaviorSubject<boolean>;

  constructor(
    private _fb: UntypedFormBuilder,
    private _authService: AuthService,
    private _cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private _router: Router,
    private _ts: TranslocoService,
  ) {
    this.passChanged = new BehaviorSubject<boolean>(false);

    this.invalidTicket = this._route.queryParams.pipe(
      map(params => (params['error'] ? true : false)),
    );

    this.changePassForm = this._fb.group({
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirm_password: [null, [Validators.required, Validators.minLength(8), PasswordMatch]],
    });

    this.changePassDisabled = this.changePassForm.valueChanges.pipe(
      map(_ => !this.changePassForm.valid),
      startWith(!this.changePassForm.valid),
    );
  }

  /**
   * User Change Password method.
   */
  changePassword(): void {
    if (!this.changePassForm.valid || this.processing) {
      return;
    }

    const newPassword = this.changePassForm.get('password')?.value;
    this._route.queryParams
      .pipe(
        switchMap(params => {
          if (params['refreshToken'] == null) {
            return of(null);
          }
          return this._authService
            .changePasswordWithResetTicket(params['refreshToken'], newPassword)
            .pipe(take(1));
        }),
        take(1),
      )
      .subscribe({
        next: res => {
          if (res) {
            this._setChangePassError({error: false, message: null});
            this.passwordChanged();
          } else {
            this._setChangePassError({error: true, message: null});
          }
          this.processing = false;
        },
        error: err => {
          if (err.status && err.status === 200) {
            this._setChangePassError({error: false, message: null});
            this.passwordChanged();
          } else {
            this._setChangePassError({
              error: true,
              message: err.error.message ?? 'Incorrect password',
            });
          }
          this.processing = false;
        },
      });
  }

  /**
   * Signals the successful Password change and closes the User Area dialog
   */
  passwordChanged(): void {
    this.passChanged.next(true);
    this._snackBar
      .open(
        this._ts.translate(
          'Password successfully changed. You will now be redirected to the login area.',
        ),
        this._ts.translate('PASSWORD CHANGED'),
        {duration: 8000},
      )
      .afterDismissed()
      .pipe(
        tap(() => {
          this._router.navigate(['login']);
        }),
        take(1),
      )
      .subscribe();
  }

  private _setChangePassError(changePassErr: AuthError): void {
    this._changePassError = changePassErr;
    this._cdr.markForCheck();
  }
}
