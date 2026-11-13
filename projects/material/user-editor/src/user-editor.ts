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
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService, AuthServiceConfig, AUTH_SERVICE_CONFIG} from '@dino/core/auth';
import {
  UserAccountError,
  UserAccountService,
  UserGroup,
  UserGroupManager,
  UserData,
  UserDataManager,
} from '@dino/core/users';
import {EMPTY, Observable, of as obsOf, Subscription} from 'rxjs';
import {catchError, exhaustMap, map, switchMap, take, tap} from 'rxjs/operators';
import {translatedValidationErrors, PasswordMatch} from '@dino/core/auth';
import {ActionTrigger, ActionTriggerData} from '@dino/core/data';
import {LANG_LOCALES, langLabel} from '@dino/core/langs';
import {TranslationsConfig, TRANSLATIONS_CONFIG} from '@dino/core/translations';
import {TranslocoService} from '@ngneat/transloco';

/**
 * Characters used for generated passwords: letters and digits only, without the ones that are
 * easily confused when read aloud or copied by hand (0/O, 1/l/I).
 */
const PASSWORD_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
const GENERATED_PASSWORD_LENGTH = 16;

/**
 * Represents the data to be passed to a UserEditor dialog.
 */
export interface UserDialogData {
  /**
   * The selected User.
   */
  userItem?: UserData;

  /**
   * The dialog mode.
   */
  userAction?: 'view' | 'edit' | 'create';
}

/**
 * Represents a single User Form Field.
 */
export interface UserFormField {
  /**
   * The field name.
   */
  fieldName: string;
  /**
   * The field placeholder.
   */
  placeholder: string;
  /**
   * The field hint.
   */
  hint?: string;
  /**
   * The field starting value
   */
  value?: any;
  /**
   * The field input type
   */
  inputType?: string;
  /**
   * The input autocomplete attribute. The editor creates other users' accounts, so the browser
   * must never fill in the credentials of the admin who is logged in.
   */
  autocomplete?: string;
}

/**
 * Dino User Editor component.
 * Allows the management of Users.
 */
@Component({
  selector: 'dino-user-editor',
  templateUrl: 'user-editor.html',
  styleUrls: ['user-editor.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UserEditor implements OnDestroy, OnInit {
  /**
   * Event emitted as an Action hook
   */
  @Output() readonly emitActionTrigger: EventEmitter<ActionTrigger<UserData>> = new EventEmitter<
    ActionTrigger<UserData>
  >();
  /**
   * The form group for the User Editor form.
   */
  userForm?: UntypedFormGroup;

  /**
   * The editor form fields
   */
  userFormFields: UserFormField[] = [];

  /**
   * Displays the user editor form validation errors
   */
  readonly showValErrors = translatedValidationErrors(this._ts);

  /**
   * The available User Permission Groups.
   */
  readonly userGroups: Observable<UserGroup[]>;

  /**
   * The Dino languages the user's emails can be sent in.
   */
  readonly emailLangs: {code: string; label: string}[];

  /**
   * True when creating a user on nHost, the only case with a password to set.
   */
  readonly passwordEnabled: boolean;

  /**
   * True while the admin has asked to see the password in clear.
   */
  passwordVisible = false;

  /**
   * Set when the user was created but the email to set the password could not be sent.
   */
  private _passwordEmailFailed = false;

  /**
   * Emits when an User is created or edited.
   */
  private _saveEvt: EventEmitter<UserData> = new EventEmitter<UserData>();

  /**
   * Subscribes to the save event.
   */
  private _saveSub: Subscription = Subscription.EMPTY;

  constructor(
    private _userDataManager: UserDataManager,
    private _userGroupManager: UserGroupManager,
    private _userAccountService: UserAccountService,
    private _authService: AuthService,
    @Inject(AUTH_SERVICE_CONFIG) private _config: AuthServiceConfig,
    @Inject(MAT_DIALOG_DATA) public data: UserDialogData,
    public dialogRef: MatDialogRef<UserEditor>,
    readonly snackbar: MatSnackBar,
    private _ts: TranslocoService,
    @Inject(TRANSLATIONS_CONFIG) private _translationsConfig: TranslationsConfig,
  ) {
    this.emailLangs = this._ts
      .getAvailableLangs()
      .map(lang => (typeof lang === 'string' ? lang : lang.id))
      .filter(code => LANG_LOCALES[code] != null)
      .map(code => ({code, label: langLabel(code)}));
    this.passwordEnabled = !!this._config.nHostAuth && this.data.userAction === 'create';
    this._populateForm();
    this.userGroups = this._userGroupManager
      .query({selector: {is_deleted: {$ne: true}}})
      .pipe(map(groups => groups.sort((a, b) => this._sortGroupsAlphabetically(a, b))));
  }

  ngOnInit(): void {
    // exhaustMap ignores a second click while a save is running. A failed creation emits
    // nothing and leaves the editor open, so take(1) still waits for the next attempt.
    this._saveSub = this._saveEvt
      .pipe(
        exhaustMap(item => {
          if (this.data.userAction === 'edit') {
            if (this.data.userItem == null || this.data.userItem.id == null) {
              return obsOf(null);
            }
            return this._userDataManager.update({...item, id: this.data.userItem.id}).pipe(
              tap(ud => {
                if (ud) {
                  const trigData: ActionTriggerData<UserData> = {
                    previousValue: this.data.userItem,
                    newValue: ud,
                  };
                  const trigger: ActionTrigger<UserData> = {
                    name: 'User Data Updated',
                    triggerType: 'on_user_data_change',
                    triggerData: trigData,
                  };
                  this.emitActionTrigger.emit(trigger);
                }
              }),
            );
          } else {
            if (!this._config.nHostAuth) {
              return this._userDataManager
                .create({
                  full_name: item.full_name,
                  email: item.email,
                  user_group_ids: item.user_group_ids,
                  user_auth_ref_id: null,
                  created_at: new Date().toISOString(),
                })
                .pipe(
                  tap(ud => {
                    if (ud) {
                      const trigData: ActionTriggerData<UserData> = {
                        doc: ud,
                      };
                      const trigger: ActionTrigger<UserData> = {
                        name: 'User Data Created',
                        triggerType: 'on_user_data_creation',
                        triggerData: trigData,
                      };
                      this.emitActionTrigger.emit(trigger);
                    }
                  }),
                );
            }
            const nHostItem = item as UserData & {
              password: string;
              send_password_email: boolean;
              email_lang: string;
            };
            const locale =
              nHostItem.email_lang != null
                ? LANG_LOCALES[nHostItem.email_lang]?.slice(0, 2)
                : undefined;
            return this._userAccountService
              .createAccount({
                email: item.email,
                password: nHostItem.password,
                full_name: item.full_name,
                user_group_ids: item.user_group_ids ?? [],
                locale,
              })
              .pipe(
                tap(ud => {
                  const trigData: ActionTriggerData<UserData> = {
                    doc: ud,
                  };
                  const trigger: ActionTrigger<UserData> = {
                    name: 'User Data Created',
                    triggerType: 'on_user_data_creation',
                    triggerData: trigData,
                  };
                  this.emitActionTrigger.emit(trigger);
                }),
                switchMap(ud =>
                  nHostItem.send_password_email ? this._sendPasswordEmail(ud) : obsOf(ud),
                ),
                catchError(err => {
                  this._showCreateError(err);
                  return EMPTY;
                }),
              );
          }
        }),
        take(1),
      )
      .subscribe({
        next: res => {
          if (res == null) {
            this.snackbar.open(
              this._ts.translate('Oops! Something went wrong while saving the User.'),
              this._ts.translate('SAVE ERROR'),
              {duration: 10000},
            );
          } else if (this._passwordEmailFailed) {
            this.snackbar.open(
              this._ts.translate(
                '{{name}} saved, but the email to set the password could not be sent.',
                {name: res.full_name},
              ),
              this._ts.translate('EMAIL NOT SENT'),
              {duration: 10000},
            );
          } else {
            this.snackbar.open(
              this._ts.translate('{{name}} saved', {name: res.full_name}),
              this._ts.translate('USER SAVED'),
              {duration: 10000},
            );
          }
          this.closeEditor();
        },
        error: err => {
          this.snackbar.open(
            this._ts.translate('Oops! Something went wrong while performing the requested action.'),
            `${this._ts.translate('ERROR')}: ${err.message.toUpperCase()}`,
            {
              duration: 5000,
            },
          );
          this.closeEditor();
        },
      });
  }

  /**
   * The dialog title translation key, one per editor mode.
   */
  get dialogTitle(): string {
    switch (this.data.userAction) {
      case 'create':
        return 'Create user';
      case 'edit':
        return 'Edit user';
      default:
        return 'View user';
    }
  }

  /**
   * Reports why a user could not be created. The editor stays open, so the admin can correct
   * the data or retry once back online.
   * @param err The error of the creation
   */
  private _showCreateError(err: unknown): void {
    const reason = err instanceof UserAccountError ? err.reason : 'unknown';
    const messages: Record<string, string> = {
      'email-in-use': 'A user with this email already exists.',
      'not-admin': 'Only an administrator can create users.',
      offline: 'Users can only be created online. Check the connection and try again.',
      unknown: 'Oops! Something went wrong while saving the User.',
    };
    this.snackbar.open(this._ts.translate(messages[reason]), this._ts.translate('SAVE ERROR'), {
      duration: 10000,
    });
  }

  /**
   * Fills the password fields with a random password and ticks the email to set a new one.
   */
  generatePassword(): void {
    if (this.userForm == null) {
      return;
    }
    const password = this._randomPassword();
    this.userForm.patchValue({password, confirm_password: password});
    this.userForm.get('password')?.markAsTouched();
    this.userForm.get('confirm_password')?.markAsTouched();
    this.userForm.get('send_password_email')?.setValue(true);
  }

  /**
   * Sends the newly created user the nHost password reset email, which lets them set a password
   * of their own. The user already exists at this point, so a failure is only reported and
   * never turns the save into an error.
   * @param ud The created user
   * @returns The created user
   */
  private _sendPasswordEmail(ud: UserData): Observable<UserData> {
    return this._authService
      .resetPassword(ud.email, {redirectTo: `${window.location.origin}/reset-password`})
      .pipe(
        catchError(() => obsOf(false)),
        map(res => {
          this._passwordEmailFailed = res === false || res instanceof HttpErrorResponse;
          return ud;
        }),
      );
  }

  /**
   * @returns A random password drawn from `PASSWORD_CHARS` with a cryptographic generator.
   * Values that would bias the modulo are discarded.
   */
  private _randomPassword(): string {
    const limit = 256 - (256 % PASSWORD_CHARS.length);
    const bytes = new Uint8Array(1);
    let password = '';
    while (password.length < GENERATED_PASSWORD_LENGTH) {
      crypto.getRandomValues(bytes);
      if (bytes[0] < limit) {
        password += PASSWORD_CHARS[bytes[0] % PASSWORD_CHARS.length];
      }
    }
    return password;
  }

  /**
   * Sorts groups alphabetically by their groupName property.
   * @param a Prev group
   * @param b Next group
   * @returns Sort order
   */
  private _sortGroupsAlphabetically(a: UserGroup, b: UserGroup): number {
    let textA = a.groupName.toUpperCase();
    let textB = b.groupName.toUpperCase();
    const less = textA < textB;
    const more = textA > textB;
    if (less) {
      return -1;
    } else if (more) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * Generates and populates the editor.
   */
  private _populateForm(): void {
    const currentUser: UserData | undefined = this.data.userItem;
    const group: {[key: string]: UntypedFormControl} = {};
    const fields: UserFormField[] = [
      {
        fieldName: 'full_name',
        hint: `The full name of the User`,
        placeholder: 'Full Name',
        value: currentUser?.full_name ?? '',
      },
    ];
    if (this.data.userAction !== 'edit') {
      fields.push({
        fieldName: 'email',
        hint: `The User Email address`,
        placeholder: 'Email',
        value: currentUser?.email ?? '',
        autocomplete: 'off',
      });
    }
    if (this.passwordEnabled) {
      fields.push({
        fieldName: 'password',
        hint: `The User password`,
        placeholder: 'Password',
        inputType: 'password',
        autocomplete: 'new-password',
      });
      fields.push({
        fieldName: 'confirm_password',
        hint: `Confirm the User password`,
        placeholder: 'Confirm Password',
        inputType: 'password',
        autocomplete: 'new-password',
      });
      group['password'] = new UntypedFormControl(null, [
        Validators.minLength(9),
        Validators.required,
      ]);
      group['confirm_password'] = new UntypedFormControl(null, [
        Validators.minLength(9),
        PasswordMatch,
        Validators.required,
      ]);
      group['send_password_email'] = new UntypedFormControl(true);
      group['email_lang'] = new UntypedFormControl(this._translationsConfig.defaultLanguage);
    }

    group['full_name'] = new UntypedFormControl(currentUser?.full_name ?? '', Validators.required);
    group['email'] = new UntypedFormControl(currentUser?.email ?? '', [
      Validators.email,
      Validators.required,
    ]);

    group['user_group_ids'] = new UntypedFormControl(currentUser?.user_group_ids ?? []);
    const formGroup = new UntypedFormGroup(group);

    this.userForm = formGroup;
    this.userFormFields = fields;
  }

  /**
   * Closes the editor without saving
   *
   */
  closeEditor(): void {
    this.dialogRef.close();
  }

  /**
   * Checks the form validation
   */
  isFormValid(): boolean {
    return this.userForm != null && this.userForm.valid;
  }

  /**
   * Saves the User and closes the editor
   */
  saveUser(): void {
    if (this.userForm == null) {
      return;
    }
    const formValue = this.userForm.value;
    if (formValue != null && this.isFormValid()) {
      this._saveEvt.emit(formValue);
    }
  }

  ngOnDestroy(): void {
    this._saveSub.unsubscribe();
  }
}
