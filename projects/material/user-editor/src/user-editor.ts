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
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService, AuthServiceConfig, AUTH_SERVICE_CONFIG} from '@dino/core/auth';
import {UserGroup, UserGroupManager, UserData, UserDataManager} from '@dino/core/users';
import {Observable, of as obsOf, Subscription} from 'rxjs';
import {switchMap, take, tap} from 'rxjs/operators';
import {showValidationErrors, PasswordMatch} from '@dino/core/auth';
import {ActionTrigger, ActionTriggerData} from '@dino/core/data';

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
  userForm?: FormGroup;

  /**
   * The editor form fields
   */
  userFormFields: UserFormField[] = [];

  /**
   * Displays the user editor form validation errors
   */
  readonly showValErrors = showValidationErrors;

  /**
   * The available User Permission Groups.
   */
  readonly userGroups: Observable<UserGroup[]>;

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
    private _authService: AuthService,
    @Inject(AUTH_SERVICE_CONFIG) private _config: AuthServiceConfig,
    @Inject(MAT_DIALOG_DATA) public data: UserDialogData,
    public dialogRef: MatDialogRef<UserEditor>,
    readonly snackbar: MatSnackBar,
  ) {
    this._populateForm();
    this.userGroups = this._userGroupManager.query({selector: {is_deleted: {$eq: false}}});
  }

  ngOnInit(): void {
    this._saveSub = this._saveEvt
      .pipe(
        switchMap(item => {
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
            const nHostItem = item as UserData & {password: string};
            return this._authService
              .signupNHost({
                email: nHostItem.email,
                password: nHostItem.password,
                options: {displayName: nHostItem.full_name},
              })
              .pipe(
                switchMap(nhostRes => {
                  if (
                    nhostRes == null ||
                    nhostRes.session == null ||
                    nhostRes.session.user == null
                  ) {
                    return obsOf(null);
                  }
                  return this._userDataManager
                    .create({
                      full_name: item.full_name,
                      email: item.email,
                      user_group_ids: item.user_group_ids,
                      user_auth_ref_id: nhostRes.session.user.id,
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
                }),
              );
          }
        }),
        take(1),
      )
      .subscribe({
        next: res => {
          if (res == null) {
            this.snackbar.open(`Oops! Something went wrong while saving the User.`, 'SAVE ERROR', {
              duration: 10000,
            });
          } else {
            this.snackbar.open(`${res.full_name} saved`, 'USER SAVED', {duration: 10000});
          }
          this.closeEditor();
        },
        error: err => {
          this.snackbar.open(
            `Oops! Something went wrong while performing the requested action.`,
            `ERROR: ${err.message.toUpperCase()}`,
            {
              duration: 5000,
            },
          );
          this.closeEditor();
        },
      });
  }

  /**
   * Generates and populates the editor.
   */
  private _populateForm(): void {
    const currentUser: UserData | undefined = this.data.userItem;
    const group: {[key: string]: FormControl} = {};
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
      });
    }
    if (this._config.nHostAuth && this.data.userAction === 'create') {
      fields.push({
        fieldName: 'password',
        hint: `The User password`,
        placeholder: 'Password',
        inputType: 'password',
      });
      fields.push({
        fieldName: 'confirm_password',
        hint: `Confirm the User password`,
        placeholder: 'Confirm Password',
        inputType: 'password',
      });
      group['password'] = new FormControl(null, [Validators.minLength(8), Validators.required]);
      group['confirm_password'] = new FormControl(null, [
        Validators.minLength(8),
        PasswordMatch,
        Validators.required,
      ]);
    }

    group['full_name'] = new FormControl(currentUser?.full_name ?? '', Validators.required);
    group['email'] = new FormControl(currentUser?.email ?? '', [
      Validators.email,
      Validators.required,
    ]);

    group['user_group_ids'] = new FormControl(currentUser?.user_group_ids ?? []);
    const formGroup = new FormGroup(group);

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
