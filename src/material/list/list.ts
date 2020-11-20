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

import {SelectionModel} from '@angular/cdk/collections';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DataModelManager, Model} from '@dewco/core/data';
import {
  FilterGroup,
  FiltersService,
  List,
  SearchFiltersComponent,
} from '@dewco/core/list';
import {ListDataSource} from '@dewco/material/list-datasource';
import {Subscription, throwError} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {ListCellDirective} from './list-cell';
import {AdminUserInteractionsService} from './user-interactions';

/**
 * The base Material List component.
 * Provides a template, selection and bulk/individual action functionalities for all list/tables
 */
@Component({
  selector: 'dewco-list',
  styleUrls: ['list.css'],
  templateUrl: 'list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SelectionList<T extends Model = Model,
                                     DM extends DataModelManager<T> = DataModelManager<T>> extends
    List<T> implements AfterContentInit, AfterViewInit, OnInit, OnDestroy {
  /**
   * the List selection model
   */
  readonly selection = new SelectionModel<T>(true, []);

  /**
   * Non default table cell templates
   */
  private _cellTemplatesMap: {[column: string]: TemplateRef<any>} = {};
  get cellTemplatesMap(): {[column: string]: TemplateRef<any>} {
    return this._cellTemplatesMap;
  }

  /**
   * the List dataSource. Extends and augments MatTableDataSource
   */
  private _dataSource: ListDataSource<T, DM>;
  get dataSource(): ListDataSource<T, DM> {
    return this._dataSource;
  }
  @Input()
  set dataSource(dataSource: ListDataSource<T, DM>) {
    if (dataSource !== this.dataSource) {
      this._dataSource = dataSource;
    }
  }

  /**
   * A set of custom filters that overwrites the default generated filters
   */
  @Input()
  set customFilters(filters: FilterGroup[]) {
    if (filters) {
      this._fts.setCustomFilters = filters;
    }
  }

  private _actionsSub: Subscription = Subscription.EMPTY;

  /**
   * List Paginator
   */
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  /**
   * List Sort
   */
  @ViewChild(MatSort, {static: true}) sorting: MatSort;

  /**
   * The filtersComponent associated with the list
   */
  @ContentChild(SearchFiltersComponent, {static: true}) filtersComponent: SearchFiltersComponent;

  /**
   * Querylist of cell non default templates
   */
  @ContentChildren(ListCellDirective, {descendants: false})
  cellTemplates: QueryList<ListCellDirective>;

  constructor(
      cdr: ChangeDetectorRef,
      aui: AdminUserInteractionsService,
      private _fts: FiltersService,
  ) {
    super(cdr, aui);
  }

  ngAfterContentInit(): void {
    this._cellTemplatesMap = this.cellTemplates.reduce((prev, cur) => {
      prev[cur.column] = cur.templateRef;
      return prev;
    }, {} as {[column: string]: TemplateRef<any>});
  }

  ngAfterViewInit() {}

  ngOnInit() {
    if (this._dataSource) {
      this._fillDataSource();
    }
  }

  /**
   * Gets the currently selected items
   * @returns T[]
   */
  getSelection(): T[] {
    return this.selection ? this.selection.selected : [];
  }

  /**
   * Gets all the items in the dataSource
   * @returns T[]
   */
  getItems(): T[] {
    return this.dataSource ? this.dataSource.data : [];
  }

  /**
   * Gets all items in the dataSource currently displayed on the list page
   * @returns T[]
   */
  getDisplayedItems(): T[] {
    return this.dataSource ? this.dataSource.getDisplayedItems() : [];
  }

  /**
   * Queries the DataSource for the selected items deletion
   */
  deleteItems(row: T|T[]) {
    if (this.dataSource == null) {
      return;
    }
    if (!Array.isArray(row)) {
      row = [row];
    }
    this._actionEvent.emit({action: 'delete', items: row});
  }

  /**
   * Removes all items from the current selection
   */
  clearSelection(): void {
    if (this.selection == null) {
      return;
    }
    this.selection.clear();
  }

  /**
   * Selects all the items
   */
  selectAll(): void {
    if (this.dataSource == null) {
      return;
    }
    this.getDisplayedItems().forEach(row => this.selection.select(row));
  }

  /**
   * Checks if all the items in the list are currently selected
   * @returns boolean
   */
  isAllSelected(): boolean {
    if (this.dataSource == null) {
      return false;
    }
    const numSelected = this.getSelection().length;
    const numRows = this.getDisplayedItems().length;
    return numSelected === numRows;
  }

  /**
   * If not all items are currently selected, it selects all of them.
   * If all items are currently selected, it removes all of them from the selection.
   */
  masterToggle(): void {
    if (this.dataSource == null) {
      return;
    }
    this.isAllSelected() ? this.clearSelection() : this.selectAll();
  }

  /**
   * Checks the current selection state of the row and changes its aria-label accordingly
   * @param row T
   * @returns string
   */
  checkboxLabel(row?: T): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  /**
   * Adds pagination, sorting and a SearchFiltersComponent to the dataSource, if they are present
   */
  private _fillDataSource(): void {
    if (this.dataSource == null) {
      return;
    }
    if (this.paginator) {
      this.dataSource.setPaginator = this.paginator;
    }
    if (this.sorting) {
      this.dataSource.setSort = this.sorting;
    }
    if (this.filtersComponent) {
      this.dataSource.setFiltersComponent = this.filtersComponent;

      // @WARNING: comment to allow filtering text data from hidden columns

      this.dataSource.filterPredicate = (data: T, filter: string) => {
        return this.headers.map(key => key.column)
            .some(key => (key in data ? ('' + data[key]).toLowerCase().includes(filter) : false));
      };

      //
    } else {
      this._fts.loadPreset(null);
    }

    this._initList();
  }

  /**
   * Initializes the list Actions subscription (delete, download, print, edit)
   */
  private _initList(): void {
    this._actionsSub = this._actionEvent
                           .pipe(
                               switchMap(
                                   ({action, items}) => this._aui.askConfirm(action).pipe(
                                       map(confirmation => ({confirmation, action, items})),
                                       ),
                                   ),
                               map(({confirmation, action, items}) => {
                                 if (confirmation) {
                                   this.processAction(action, items);
                                 }
                               }),
                               catchError(err => throwError(err)),
                               )
                           .subscribe();
  }

  /**
   * Queries the DataSource for the deletion of Items
   * @param items The items to be deleted
   * @returns The deleted items
   */
  deleteAction(items: T[]): T[] {
    this.selection.deselect(...items);
    return this._dataSource.deleteAction(items);
  }


  ngOnDestroy() {
    this._actionsSub.unsubscribe();
  }
}
