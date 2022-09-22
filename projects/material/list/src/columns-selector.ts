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
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ListHeader} from '@dino/core/list';
import {TranslocoService} from '@ajf/core/transloco';
import {combineLatest, Observable, of as obsOf} from 'rxjs';
import {map, startWith, take} from 'rxjs/operators';

/**
 * A dialog component that allows to choose which headers and columns to display in the
 * associated table.
 */
@Component({
  selector: 'dino-columns-selector',
  styleUrls: ['columns-selector.scss'],
  templateUrl: 'columns-selector.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ColumnsSelector<T> implements OnInit {
  /**
   * The current columnss
   */
  columns: Observable<ListHeader<T>[]> = obsOf([]);
  /**
   * Column search filters.
   */
  readonly columnSearchFilter: FormGroup;
  /**
   * Event emitted when the user toggles a column in the selector.
   */
  private _columnToggleEvt: EventEmitter<void> = new EventEmitter<void>();
  /**
   * The name of the column currently being toggled.
   */
  private _togglingColumn: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<ColumnsSelector<T>>,
    @Inject(MAT_DIALOG_DATA) public data: {columns: ListHeader<T>[]},
    private _ts: TranslocoService,
  ) {
    this.columnSearchFilter = new FormGroup({column_search: new FormControl()});
  }

  ngOnInit() {
    this.columns = combineLatest([
      obsOf(this.data.columns.map(header => ({...header})).filter(h => !h.hidden)),
      this.columnSearchFilter.valueChanges.pipe(startWith('')),
      this._columnToggleEvt.pipe(startWith(null)),
    ]).pipe(
      map(([headers, filter, _]) => {
        let listHeaders = headers;
        if (this._togglingColumn != null) {
          const toggledColumn = listHeaders.find(col => col.column === this._togglingColumn);
          if (toggledColumn) {
            const idx = listHeaders.indexOf(toggledColumn);
            listHeaders[idx].displayed =
              listHeaders[idx].displayed === undefined ? false : !listHeaders[idx].displayed;
          }
          this._togglingColumn = null;
        }
        if (filter['column_search'] != null) {
          const filterString = (filter['column_search'] as string).toLowerCase();
          listHeaders = headers.filter(header =>
            this._ts.translate(header.label).toLowerCase().includes(filterString),
          );
        }
        return listHeaders;
      }),
    );
  }

  /**
   * Toggles the 'displayed' state of a column/Listheader with the selected index.
   * An undefined 'displayed' state defaults to true.
   * @param index
   */
  toggleColumn(columnName: any): void {
    this._togglingColumn = columnName;
    this._columnToggleEvt.emit();
  }

  /**
   * Closes the dialog and updates the displayed headers and columns
   */
  apply() {
    this.columns.pipe(take(1)).subscribe(columns => this.dialogRef.close(columns));
  }
}
