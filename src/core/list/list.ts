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

import {ListHeader} from './list-header';
import {AdminUserInteractionsService} from './user-interactions';

/**
 * The base ListComponent extended by Material List components.
 * Provides the core for a list/table with selection and bulk/individual actions capabilities.
 */
@Directive()
export abstract class List<T extends Model = Model> {
  private _title: string;
  private _displayedColumns: string[];
  private _headers: ListHeader<T>[] = [];
  private _baseEditUrl = '';

  protected _actionEvent: EventEmitter<{action: string, items: T[]}> =
      new EventEmitter<{action: string, items: T[]}>();

  /**
   * List/Table title
   */
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
  get displayedColumns(): string[] {
    return this._displayedColumns;
  }

  /**
   * The list/table headers
   */
  get headers(): ListHeader<T>[] {
    return this._headers;
  }

  @Input()
  set headers(headers: ListHeader<T>[]) {
    this._headers = headers;
    this._displayedColumns =
        ['select', ...headers.map(header => header.column.toString()), 'actions'];
    this._cdr.markForCheck();
  }

  /**
   * The base url to be used for the Edit action
   */
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
   * Retrieves the name of the handler functions based on the action name
   * @param action The name of the action
   * @returns The handler function name
   */
  private _getActionHandler(action: string): string {
    return `${action}Action`;
  }

  /**
   * Calls a handler function on the current selection based on the action name
   * @param action The name of the action
   */
  processAction(action: string, items: T[]): void {
    if (items.length === 0) {
      return;
    }
    const handlerName = this._getActionHandler(action);
    const handler: (s: T[]) => void = (this as any)[handlerName];
    if (handler != null) {
      handler.call(this, items);
    }
  }
}
