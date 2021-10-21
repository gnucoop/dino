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

import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {
  AdminUserInteractionsService as CoreAdminUserInteractionsService,
  ListAction,
} from '@dewco/core/list';
import {Observable, of as obsOf, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ConfirmationDialog} from './confirmation-dialog';

/**
 * This service asks the user for a confirmation to perform an action on a List item.
 * It does so by opening a Confirmation dialog, when requested by the action.
 */
@Injectable()
export class AdminUserInteractionsService extends CoreAdminUserInteractionsService {
  /**
   * A reference to the MatDialog that contains the Columns Selector
   */
  private _confirmationDialogRef: MatDialogRef<ConfirmationDialog>;

  constructor(private _dialog: MatDialog) {
    super();
  }

  /**
   * Opens a dialog to ask the user for confirmation of a requested action on elements of the table.
   * If no confirmation is required, it just returns true.
   */
  askConfirm(action: ListAction): Observable<boolean> {
    if (!action.askConfirm) {
      return obsOf(true);
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'confirmation-dialog';
    dialogConfig.data = {action: action};
    this._confirmationDialogRef = this._dialog.open(ConfirmationDialog, dialogConfig);
    return this._confirmationDialogRef
      .afterClosed()
      .pipe(catchError(err => throwError(err) as Observable<boolean>));
  }
}
