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

import {ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ListHeader} from '@dino/core/list';

/**
 * A dialog component that allows to choose which headers and columns to display in the
 * associated table.
 */
@Component({
  selector: 'dino-columns-selector',
  styleUrls: ['columns-selector.css'],
  templateUrl: 'columns-selector.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ColumnsSelector<T> implements OnInit {
  /**
   * The current columns
   */
  columns: ListHeader<T>[];
  constructor(
    public dialogRef: MatDialogRef<ColumnsSelector<T>>,
    @Inject(MAT_DIALOG_DATA) public data: {columns: ListHeader<T>[]},
  ) {}

  ngOnInit() {
    this.columns = this.data.columns.map(header => ({...header})).filter(h => !h.hidden);
  }

  /**
   * Toggles the 'displayed' state of a column/Listheader with the selected index.
   * An undefined 'displayed' state defaults to true.
   * @param index
   */
  toggleColumn(index: number): void {
    this.columns[index].displayed =
      this.columns[index].displayed === undefined ? false : !this.columns[index].displayed;
  }

  /**
   * Closes the dialog and updates the displayed headers and columns
   */
  apply() {
    this.dialogRef.close(this.columns);
  }
}
