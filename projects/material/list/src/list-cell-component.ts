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
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {Model} from '@dino/core/data';
import {ListHeader} from '@dino/core/list';

/**
 * List Default Cell component with its template
 */
@Component({
  selector: 'dino-list-cell',
  templateUrl: 'list-cell-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ListCellComponent<T extends Model = Model> {
  /**
   * The item displayed in the cell
   */
  @Input() item: any;

  /**
   * The Row Element
   */
  @Input() rowElement?: T & {[key: string]: any};

  /**
   * The Ajf Field Type associated with the Column this cell belongs to
   */
  @Input() header?: ListHeader<T>;

  /**
   * The MatDialog service passed by List
   */
  @Input() dialog?: MatDialog;

  /**
   * The file/image cell preview image method
   */
  @Input() previewMethod?: (ev: Event, el: string | {[key: string]: any} | null) => void;

  /**
   * Emitted when a boolean field Cell is edited
   */
  @Output() readonly booleanChangedEvt: EventEmitter<{
    patchedDoc: Partial<T> & {id: string};
    previousDoc: T;
  }> = new EventEmitter<{patchedDoc: Partial<T> & {id: string}; previousDoc: T}>();

  constructor() {}

  toggleBoolean(ev: MatSlideToggleChange) {
    if (!this.header || !this.rowElement) return;
    const fieldName: string = this.header.column as string;
    const patchedRow: {id: string; [key: string]: any} = {id: this.rowElement.id};
    if (this.header.dataColumn) {
      patchedRow['data'] = {
        ...this.rowElement['data'],
        [fieldName]: ev.checked,
      };
    } else {
      patchedRow[fieldName] = ev.checked;
    }
    this.booleanChangedEvt.emit({
      patchedDoc: patchedRow as Partial<T> & {id: string},
      previousDoc: this.rowElement,
    });
  }

  /**
   * Returns true if the string contains a single word longer than the set threshold
   * @param str the string to be checked
   * @param threshold the max char length
   * @returns true if both conditions are met
   */
  isSingleWordLongString(str: string, threshold: number): boolean {
    if (!str || !threshold || typeof str !== 'string') return false;
    const isSingleWord = str.trim().indexOf(' ') === -1;
    const isOverThreshold = str.trim().length > threshold;
    const isID = this.header && this.header.column === 'id';
    return isSingleWord && isOverThreshold && !isID;
  }

  /**
   * Returns true if the string is a valid url
   * @param str
   * @returns true if url
   */
  isUrl(str: string): boolean {
    if (!str || typeof str !== 'string') return false;
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(str);
  }
}
