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

import {ChangeDetectionStrategy, Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ListAction} from '@dino/core/list';

/**
 * A dialog component that allows to choose which headers and columns to display in the
 * associated table.
 */
@Component({
  selector: 'dino-actions-modal',
  styleUrls: ['actions-modal.scss'],
  templateUrl: 'actions-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ActionsModal<T> {
  /**
   * The current columnss
   */
  actions: ListAction[] = [];

  constructor(
    public dialogRef: MatDialogRef<ActionsModal<T>>,
    @Inject(MAT_DIALOG_DATA) public data: {actions: ListAction[]; doc: T; isDetails: boolean},
  ) {
    this.actions = this.data.actions;
  }

  performListAction(action: ListAction): void {
    this.dialogRef.close({action, doc: this.data.doc, isDetails: this.data.isDetails});
  }
}
