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
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthError, AuthService, PasswordMatch, showValidationErrors} from '@dino/core/auth';
import {UserData, UserDataManager} from '@dino/core/users';
import {map, Observable, of as obsOf, startWith, switchMap, take} from 'rxjs';

/**
 * Dialog component that shows Additional Filters, grouped and divided in Tabs.
 * It may contain dino-search-filters-chips and multiple dino-search-filters-widget.
 * It is usually associated with a main filters component that displays Basic Filters
 * (eg. dino-search-filters-bar).
 */
@Component({
  selector: 'dino-user-area',
  styleUrls: ['user-area.scss'],
  templateUrl: 'user-area.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UserArea {
  /**
   * The active User Data
   */
  readonly userData: Observable<UserData | null>;
  /**
   * The Change Password FormGroup.
   */
  readonly changePassForm: FormGroup;
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

  constructor(
    private _udm: UserDataManager,
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserArea>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.userData = this._udm.getActiveUserData();

    this.changePassForm = this._fb.group({
      current_password: [null, [Validators.required, Validators.minLength(8)]],
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
    this.userData
      .pipe(
        switchMap(ud => {
          if (!ud) {
            return obsOf(false);
          }
          const credentials = {
            email: ud.email,
            password: this.changePassForm.get('current_password')?.value,
          };
          const newPassword = this.changePassForm.get('password')?.value;
          return this._authService.changePassword(credentials, newPassword);
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
    this._snackBar.open('Password successfully changed', 'PASSWORD CHANGED', {duration: 10000});
    this.closeDialog();
  }

  /**
   * Closes the dialog.
   */
  closeDialog() {
    this.dialogRef.close(false);
  }

  private _setChangePassError(changePassErr: AuthError): void {
    this._changePassError = changePassErr;
    this._cdr.markForCheck();
  }
}
