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
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Model} from '@dewco/core/data';
import {
  FilterGroup,
  FiltersService,
  List,
  ListAction,
  ListHeader,
  SearchFiltersComponent,
} from '@dewco/core/list';
import {Observable, Subscription, throwError} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {ColumnsSelector} from './columns-selector';

import {ListCell} from './list-cell';
import {ListDataSource} from './list-datasource';
import {AdminUserInteractionsService} from './user-interactions.service';

/**
 * The material List component with row selection, extending the core List.
 * It is populated with data by its associated ListDataSource.
 * Provides a template, a selection model and bulk/individual actions for all lists.
 */
@Component({
  selector: 'dewco-list',
  styleUrls: ['list.css'],
  templateUrl: 'list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SelectionList<T extends Model = Model> extends List<T> implements AfterContentInit,
                                                                               AfterViewInit,
                                                                               OnInit, OnDestroy {
  /**
   * The List selection model. Allows selection of individual or multiple elements
   * of the List, for the purpose of performing bulk actions.
   */
  readonly selection = new SelectionModel<T>(true, []);

  /**
   * A set of custom filters passed to the FiltersService,
   * that overwrites the default generated filters
   */
  @Input()
  set customFilters(filters: FilterGroup[]) {
    if (filters) {
      this._fts.setCustomFilters = filters;
    }
  }

  /**
   * Adds a list of basic additional filters to the main filters component (eg.
   * SearchFiltersBar).
   */

  @Input()
  set additionalBasicFilters(filterNames: string[]) {
    if (!filterNames.length) {
      return;
    }
    for (let ftName of filterNames) {
      if (this._fts.availableBasicFilterLabels.indexOf(ftName) > -1) {
        this._fts.addBasicFilter(ftName);
      }
    }
  }

  /**
   * An element reference to the button that opens the Columns Selector
   */
  @ViewChild('columns_btn', {read: ElementRef, static: false}) columnsButtonRef: ElementRef;

  /**
   * A material Paginator associated to the List
   */
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  /**
   * A material Sort associated to the List
   */
  @ViewChild(MatSort, {static: true}) sorting: MatSort;

  /**
   * The filtersComponent associated with the SelectionList and its ListDataSource
   */
  @ContentChild(SearchFiltersComponent, {static: true}) filtersComponent: SearchFiltersComponent;

  /**
   * Querylist of all non default template cells
   */
  @ContentChildren(ListCell, {descendants: false}) cellTemplates: QueryList<ListCell>;

  /**
   * Non default table cell templates
   */
  private _cellTemplatesMap: {[column: string]: TemplateRef<any>} = {};
  get cellTemplatesMap(): {[column: string]: TemplateRef<any>} {
    return this._cellTemplatesMap;
  }

  /**
   * the List dataSource. Extends and augments MatTableDataSource.
   * Populates the list with data retrieved from the db.
   */
  private _dataSource: ListDataSource<T>;
  get dataSource(): ListDataSource<T> {
    return this._dataSource;
  }
  @Input()
  set dataSource(dataSource: ListDataSource<T>) {
    if (dataSource !== this.dataSource) {
      this._dataSource = dataSource;
    }
  }

  /**
   * A reference to the MatDialog that contains the Columns Selector
   */
  private _columnsDialogRef: MatDialogRef<ColumnsSelector<T>>;

  /**
   * Subscribes to the value returned by the Columns Selector dialog on its closing event
   */
  private _columnsDialogSub: Subscription = Subscription.EMPTY;

  /**
   * Subscribes to the ActionEvent of the list, processing and executing
   * the requested action on the selected item/items.
   */
  private _actionsSub: Subscription = Subscription.EMPTY;


  constructor(
      cdr: ChangeDetectorRef,
      aui: AdminUserInteractionsService,
      public dialog: MatDialog,
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
   * @returns The selected items
   */
  getSelection(): T[] {
    return this.selection ? this.selection.selected : [];
  }

  /**
   * Gets all the items in the dataSource
   * @returns The datasource full data
   */
  getItems(): T[] {
    return this.dataSource ? this.dataSource.data : [];
  }

  /**
   * Gets all items in the dataSource currently displayed on the list page
   * @returns The displayed items
   */
  getDisplayedItems(): T[] {
    return this.dataSource ? this.dataSource.getDisplayedItems() : [];
  }

  /**
   * Performs the chosen for the selected row/rows of the table
   * @param row The selected row
   * @param action The action to be performed
   */
  actionOnItems(row: T|T[], action: ListAction): void {
    if (this.dataSource == null) {
      return;
    }
    if (!Array.isArray(row)) {
      row = [row];
    }
    this._actionEvent.emit({action: action, items: row});
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
   * Selects all the currently displayed items
   */
  selectAll(): void {
    if (this.dataSource == null) {
      return;
    }
    this.getDisplayedItems().forEach(row => this.selection.select(row));
  }

  /**
   * Checks if all the displayed items in the list are currently selected
   * @returns True if all items are selected
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
   * Opens a dialog with the Columns Selector.
   * Subscribes to Dialog closing event to update the displayed columns.
   */
  openColumnsSelectorDialog() {
    const dialogConfig = new MatDialogConfig();
    const columnsBtn = this.columnsButtonRef.nativeElement;
    const columnsBtnPosition: DOMRect = columnsBtn.getBoundingClientRect();
    dialogConfig.panelClass = 'columns-selector-dialog';
    dialogConfig.width = `${columnsBtn.offsetWidth * 4}px`;
    dialogConfig.position = {
      bottom: `${columnsBtnPosition.bottom}px`,
      top: `${columnsBtnPosition.top + columnsBtn.offsetHeight + 5}px`,
      right: `${columnsBtnPosition.right}px`,
      left: `${columnsBtnPosition.left - (columnsBtn.offsetWidth * 3)}px`,
    };
    dialogConfig.data = {
      columns: this.headers,
    };
    this._columnsDialogRef = this.dialog.open(ColumnsSelector, dialogConfig);
    this._columnsDialogSub =
        this._columnsDialogRef.afterClosed()
            .pipe(catchError(err => throwError(err) as Observable<ListHeader<T>>))
            .subscribe(columns => {
              if (!columns) {
                return;
              }
              this.headers = columns;
            });
  }

  /**
   * Adds a Paginator, a Sort and a SearchFiltersComponent to the ListDataSource, if
   * those are present in the List template.
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
      this.dataSource.additionalDataSchema = this.additionalDataSchema ?? null;

      // This next code block avoids searching in hidden colums when filtering data by kewyword,
      // by providing a custom filterPredicate for the dataSource.
      // To allow searching in hidden columns, just comment this code block.

      this.dataSource.filterPredicate = (data: T, filter: string) => {
        return this.headers.map(key => key.column)
            .some(key => (key in data ? ('' + data[key]).toLowerCase().includes(filter) : false));
      };

    } else {
      // If no filtersComponent is found in the template, the list is initalized without
      // any filters and/or filter presets.
      this._fts.loadPreset();
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
    this._columnsDialogSub.unsubscribe();
    this._dataSource.disconnect();
  }
}
