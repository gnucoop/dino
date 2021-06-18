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
  protected _actionEvent: EventEmitter<{action: ListAction, items: T|T[], isDetails: boolean}> =
      new EventEmitter<{action: ListAction, items: T|T[], isDetails: boolean}>();
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
  protected _displayedColumns: string[];

  get displayedColumns(): string[] {
    return this._displayedColumns;
  }

  setDisplayedColumns(headers: ListHeader<T>[]) {
    this._displayedColumns = [
      ...headers
          .filter(
              header =>
                  (header.displayed || header.displayed === undefined && header.column !== 'data'))
          .map(header => header.column.toString()),
      'actions'
    ];
    if (this._showCheckbox) {
      this._displayedColumns.unshift('select');
    }
  }

  /**
   * The list column headers
   */
  protected _headers: ListHeader<T>[] = [];

  get headers(): ListHeader<T>[] {
    return this._headers;
  }

  /**
   * If true, selection checkboxes are shown.
   * Defaults to true.
   */
  private _showCheckbox: boolean = true;
  get showCheckBox(): boolean {
    return this._showCheckbox;
  }
  @Input()
  set showCheckBox(show: boolean) {
    this._showCheckbox = show;
  }

  /**
   * Sets the column headers and adds a 'Select' and 'Actions' headers.
   * Headers with 'displayed' set to false, will not be displayed, but will be
   * available for selection in the Column Selector.
   */
  @Input()
  set headers(headers: ListHeader<T>[]) {
    this.setDisplayedColumns(headers);
    this._headers = headers;
  }

  /**
   * The base url to be used for the Edit action on a list item
   */
  private _baseEditUrl = 'edit/';


  get baseEditUrl(): string {
    return this._baseEditUrl;
  }

  @Input()
  set baseEditUrl(baseEditUrl: string) {
    this._baseEditUrl = baseEditUrl;
    this._cdr.markForCheck();
  }

  /**
   * The base url to be used for the View action on a list item
   */
  private _baseViewUrl = 'view/';


  get baseViewUrl(): string {
    return this._baseViewUrl;
  }

  @Input()
  set baseViewUrl(baseViewUrl: string) {
    this._baseViewUrl = baseViewUrl;
    this._cdr.markForCheck();
  }

  constructor(protected _cdr: ChangeDetectorRef, protected _aui: AdminUserInteractionsService) {}

  abstract getSelection(): T[];
  abstract getItems(): T[];
  abstract clearSelection(): void;
  abstract selectAll(): void;
  abstract deleteAction(items: T[], isDetails: boolean): T[];
  abstract editAction(item: T, isDetails: boolean): void;

  /**
   * Calls a handler function on the current selection based on the action name
   * @param action The name of the action to be performed
   */
  processAction(action: ListAction, items: T|T[], isDetails: boolean = false): void {
    if ((Array.isArray(items) && items.length === 0) || items == null) {
      return;
    }
    const handlerName = this._getActionHandler(action.actionType);
    const handler: (s: T|T[], d: boolean) => void = (this as any)[handlerName];
    if (handler != null) {
      handler.call(this, items, isDetails);
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
