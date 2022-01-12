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
  ViewEncapsulation,
} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserGroup, UserGroupManager, UserData, UserDataManager} from '@dino/core/users';
import {Observable, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';

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
}

/**
 * Dino User Editor component.
 * Allows the management of Users.
 */
@Component({
  selector: 'dino-user-editor',
  templateUrl: 'user-editor.html',
  styleUrls: ['user-editor.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UserEditor implements OnDestroy, OnInit {
  /**
   * The form group for the User Editor form.
   */
  userForm: FormGroup;

  /**
   * The editor form fields
   */
  userFormFields: UserFormField[];

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
    private _UserDataManager: UserDataManager,
    private _userGroupManager: UserGroupManager,
    readonly snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: UserDialogData,
    public dialogRef: MatDialogRef<UserEditor>,
  ) {
    this._populateForm();
    this.userGroups = this._userGroupManager.list();
  }

  ngOnInit(): void {
    this._saveSub = this._saveEvt
      .pipe(
        switchMap(item => {
          if (this.data.userAction === 'edit') {
            return this._UserDataManager.update(item);
          } else {
            return this._UserDataManager.create(item);
          }
        }),
      )
      .subscribe(res => {
        if (res == null) {
          this.snackbar.open(`Oops! Something went wrong while saving the User.`, 'SAVE ERROR', {
            duration: 10000,
          });
        } else {
          this.snackbar.open(`${res.full_name} saved`, 'USER SAVED', {duration: 10000});
        }
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
      {
        fieldName: 'email',
        hint: `The User Email address`,
        placeholder: 'Email',
        value: currentUser?.email ?? '',
      },
    ];

    group['full_name'] = new FormControl(currentUser?.full_name ?? '', Validators.required);
    group['email'] = new FormControl(currentUser?.email ?? '', Validators.required);

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
    return this.userForm.valid;
  }

  /**
   * Saves the User and closes the editor
   */
  saveUser(): void {
    const formValue = this.userForm.value;
    if (formValue != null && this.isFormValid()) {
      let obj = {...formValue};
      if (this.data.userItem != null && this.data.userAction === 'edit') {
        const editedItem: UserData = this.data.userItem;
        obj = {...editedItem, ...formValue};
      }

      this._saveEvt.emit(obj);
    }
  }

  ngOnDestroy(): void {
    this._saveSub.unsubscribe();
  }
}
