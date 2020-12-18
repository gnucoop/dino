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

import {
  ChangeDetectorRef,
  Directive,
  EventEmitter,
  Input,
} from '@angular/core';
import {Model} from '@dewco/core/data';

import {ListAction} from './list-actions-interface';
import {ListHeader} from './list-header';
import {AdminUserInteractionsService} from './user-interactions';

/**
 * The base List extended by SelectionList component.
 * Provides the core for a list with selection and bulk/individual actions capabilities.
 */
@Directive()
export abstract class List<T extends Model = Model, AD extends Model = Model> {
  /**
   * An event emitted when an action on a list item is performed.
   * Contains info about the action name and the list item/items involved.
   */
  protected _actionEvent: EventEmitter<{action: ListAction, items: T[]}> =
      new EventEmitter<{action: ListAction, items: T[]}>();

  /**
   * The model of the "data" property associated with the main model.
   */
  private _additionalDataSchema: AD;

  get additionalDataSchema(): AD {
    return this._additionalDataSchema;
  }
  @Input()
  set additionalDataSchema(ds: AD) {
    this._additionalDataSchema = ds;
  }

  /**
   * The list title
   */
  private _title: string;

  get title(): string {
    return this._title;
  }

  @Input()
  set title(title: string) {
    this._title = title;
    this._cdr.markForCheck();
  }

  /**
   * The columns to be displayed
   */
  private _displayedColumns: string[];

  get displayedColumns(): string[] {
    return this._displayedColumns;
  }

  /**
   * The list column headers
   */
  private _headers: ListHeader<T>[] = [];

  get headers(): ListHeader<T>[] {
    return this._headers;
  }

  /**
   * Sets the column headers and adds a 'Select' and 'Actions' headers.
   * Headers with 'displayed' set to false, will not be displayed, but will be
   * available for selection in the Column Selector.
   */
  @Input()
  set headers(headers: ListHeader<T>[]) {
    this._displayedColumns = [
      'select',
      ...headers.filter(header => header.displayed || header.displayed === undefined)
          .map(header => header.column.toString()),
      'actions'
    ];
    this._headers = headers;
    this._cdr.detectChanges();
  }

  /**
   * The base url to be used for the Edit action on a list item
   */
  private _baseEditUrl = '';

  get baseEditUrl(): string {
    return this._baseEditUrl;
  }

  @Input()
  set baseEditUrl(baseEditUrl: string) {
    this._baseEditUrl = baseEditUrl;
    this._cdr.markForCheck();
  }

  constructor(protected _cdr: ChangeDetectorRef, protected _aui: AdminUserInteractionsService) {}

  abstract getSelection(): T[];
  abstract getItems(): T[];
  abstract clearSelection(): void;
  abstract selectAll(): void;
  abstract deleteAction(items: T[]): T[];

  /**
   * Calls a handler function on the current selection based on the action name
   * @param action The name of the action to be performed
   */
  processAction(action: ListAction, items: T[]): void {
    if (items.length === 0) {
      return;
    }
    const handlerName = this._getActionHandler(action.actionType);
    const handler: (s: T[]) => void = (this as any)[handlerName];
    if (handler != null) {
      handler.call(this, items);
    }
  }

  /**
   * Retrieves the name of the handler functions based on the action name
   * @param action The name of the action
   * @returns The handler function name
   */
  private _getActionHandler(action: string): string {
    return `${action}Action`;
  }
}
