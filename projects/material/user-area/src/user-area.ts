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
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef} from '@angular/material/legacy-dialog';
import {MatLegacySnackBar as MatSnackBar} from '@angular/material/legacy-snack-bar';
import {AuthError, AuthService, PasswordMatch, showValidationErrors} from '@dino/core/auth';
import {UserData, UserDataManager} from '@dino/core/users';
import {map, Observable, of as obsOf, startWith, switchMap, take} from 'rxjs';
import {TranslocoService} from '@ngneat/transloco';
import {DinoTheme, ThemeService} from '@dino/material/core';
import {BreakpointObserverService} from '@dino/material/breakpoint-observer';

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
  readonly changePassForm: UntypedFormGroup;
  /**
   * The Dino Theme customization FormGroup.
   */
  readonly dinoSaveThemeForm: UntypedFormGroup;
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
   * The primary color of Dino Theme.
   */
  primaryColor: string;

  /**
   * The accent color of Dino Theme.
   */
  accentColor: string;

  /**
   * The warning color of Dino Theme.
   */
  warningColor: string;

  /**
   * An observable of all names of loadable theme presets
   */
  themePresetOptions: Observable<string[]>;

  constructor(
    private _udm: UserDataManager,
    private _fb: UntypedFormBuilder,
    private _authService: AuthService,
    private _cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private _ts: TranslocoService,
    public themeService: ThemeService,
    public dialogRef: MatDialogRef<UserArea>,
    readonly breakpointObserver: BreakpointObserverService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.userData = this._udm.getActiveUserData();
    const currentTheme = this.themeService.currentThemeVal;
    this.primaryColor = currentTheme?.primary ?? '#000000';
    this.accentColor = currentTheme?.accent ?? '#000000';
    this.warningColor = currentTheme?.warning ?? '#000000';

    this.changePassForm = this._fb.group({
      current_password: [null, [Validators.required, Validators.minLength(8)]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirm_password: [null, [Validators.required, Validators.minLength(8), PasswordMatch]],
    });

    this.dinoSaveThemeForm = this._fb.group({
      primary: [this.primaryColor, Validators.required],
      accent: [this.accentColor, Validators.required],
      warning: [this.warningColor, Validators.required],
      presetName: ['', Validators.required],
    });

    this.changePassDisabled = this.changePassForm.valueChanges.pipe(
      map(_ => !this.changePassForm.valid),
      startWith(!this.changePassForm.valid),
    );

    this.themePresetOptions = this.dinoSaveThemeForm.get('presetName')!.valueChanges.pipe(
      startWith(''),
      map(([value]) => {
        const options = Object.keys(localStorage).filter(
          key => key.includes('dino_theme_') && key !== 'dino_theme_default',
        );
        const presetNames = options.map(k => k.replace('dino_theme_', ''));
        if (!value) {
          return presetNames;
        }
        return this._filter(value, presetNames);
      }),
    );
  }

  /**
   * Sets the theme Primary Color
   */
  setPrimaryColor(col: string) {
    this.primaryColor = col;
    this.themeService.setPrimaryColor(col);
  }

  /**
   * Sets the theme Accent Color
   */
  setAccentColor(col: string) {
    this.accentColor = col;
    this.themeService.setAccentColor(col);
  }

  /**
   * Sets the theme Warning Color
   */
  setWarningColor(col: string) {
    this.warningColor = col;
    this.themeService.setWarnColor(col);
  }

  /**
   * Saves a Dino Theme preset
   */
  saveDinoTheme() {
    const dinoTheme: DinoTheme = {
      primary: this.primaryColor,
      accent: this.accentColor,
      warning: this.warningColor,
      presetName: this.dinoSaveThemeForm.get('presetName')?.value,
    };
    this.themeService.saveDinoTheme(dinoTheme);
    this.closeDialog();
    this._snackBar.open(
      this._ts.translate('Theme saved and set as default'),
      this._ts.translate('THEME SAVED'),
      {
        duration: 10000,
      },
    );
  }

  /**
   * Loads a Dino Theme preset
   */
  loadDinoTheme() {
    const presetName = this.dinoSaveThemeForm.get('presetName')?.value;
    const loadedTheme = this.themeService.loadDinoTheme(presetName);
    this.primaryColor = loadedTheme?.primary ?? '#000000';
    this.accentColor = loadedTheme?.accent ?? '#000000';
    this.warningColor = loadedTheme?.warning ?? '#000000';
    this.closeDialog();
    this._snackBar.open(
      this._ts.translate('Theme loaded and set as default'),
      this._ts.translate('THEME LOADED'),
      {
        duration: 10000,
      },
    );
  }
  /**
   * Sets the dark mode on/off
   * @param evt If true, dark theme is set
   */
  setDarkTheme(evt: boolean) {
    this.themeService.setDarkMode(evt);
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
              message: err.error.message ?? this._ts.translate('Incorrect password'),
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
    this._snackBar.open(
      this._ts.translate('Password changed'),
      this._ts.translate('PASSWORD CHANGED'),
      {duration: 10000},
    );
    this.closeDialog();
  }

  /**
   * Closes the dialog.
   */
  closeDialog() {
    this.dialogRef.close(false);
  }

  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _setChangePassError(changePassErr: AuthError): void {
    this._changePassError = changePassErr;
    this._cdr.markForCheck();
  }
}
