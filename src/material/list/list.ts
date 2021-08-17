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

import {animate, state, style, transition, trigger} from '@angular/animations';
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
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {Model} from '@dewco/core/data';
import {
  ActionType,
  FilterGroup,
  FiltersService,
  List,
  ListAction,
  ListHeader,
  SearchFiltersComponent,
} from '@dewco/core/list';
import {BreakpointObserverService} from '@dewco/material/breakpoint-observer';
import {BehaviorSubject, Observable, Subscription, throwError} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {ColumnsSelector} from './columns-selector';
import {ListCell} from './list-cell';
import {ListContext} from './list-context';
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
  animations: [trigger(
      'detailExpand',
      [
        state('collapsed, void', style({height: '0px'})), state('expanded', style({height: '*'})),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
      ])],
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
   * Determines the expanded state all rows, if the list is expandable
   */
  readonly expandAllRows: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * The currently expanded rows.
   */
  readonly expandedRows: T[] = [];

  /**
   * The currently expanded rows data.
   */
  expandedRowsData: {[key: string]: MatTableDataSource<T>} = {};

  /**
   * The Main list template context
   */
  mainListContext: ListContext<T>;

  /**
   * The Details list template context
   */
  @Input() detailsListContext: ListContext<any>;

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
  @ViewChild(MatPaginator, {static: false})
  set paginator(mp: MatPaginator) {
    if (mp == null) {
      return;
    }
    this._dataSource.setPaginator = mp;
  }

  /**
   * A material Sort associated to the List
   */
  @ViewChild(MatSort, {static: false})
  set sorting(ms: MatSort) {
    if (ms == null) {
      return;
    }
    this._dataSource.setSort = ms;
  }

  @ViewChildren(MatSort) private _matSortsList: QueryList<MatSort>;

  /**
   * The filtersComponent associated with the SelectionList and its ListDataSource
   */
  @ContentChild(SearchFiltersComponent, {static: true}) filtersComponent: SearchFiltersComponent;

  /**
   * Querylist of all non default template cells
   */
  @ContentChildren(ListCell, {descendants: false}) cellTemplates: QueryList<ListCell>;

  /**
   * Determines if the list has expandable rows.
   * Defaults to false.
   * NB: rows will always be expandable on small screens (mobile)
   * to show row action icons.
   */
  private _expandable: boolean = false;
  get expandable(): boolean {
    return this._expandable;
  }
  @Input()
  set expandable(exp: boolean) {
    this._expandable = exp;
  }

  /**
   * Subcribes to the exanded state of all rows, and unfolds / folds them accordingly.
   */
  private _expandAllRowsSub: Subscription = Subscription.EMPTY;

  /**
   * Determines if the list has a paginator.
   * Defaults to true.
   */
  private _showPaginator: boolean = true;
  get showPaginator(): boolean {
    return this._showPaginator;
  }
  @Input()
  set showPaginator(exp: boolean) {
    this._showPaginator = exp;
  }

  /**
   * Determines if the columns selector should be.
   * Defaults to true.
   */
  private _showColumnsSelector: boolean = true;
  get showColumnsSelector(): boolean {
    return this._showColumnsSelector;
  }
  @Input()
  set showColumnsSelector(exp: boolean) {
    this._showColumnsSelector = exp;
  }

  /**
   * Non default table cell templates
   */
  private _cellTemplatesMap: {[column: string]: TemplateRef<any>} = {};
  get cellTemplatesMap(): {[column: string]: TemplateRef<any>} {
    return this._cellTemplatesMap;
  }

  /**
   * The available user-called actions that can be performed on
   * the list items.
   */
  private _listRowActions: ListAction[] = [];
  get listRowActions(): ListAction[] {
    return this._listRowActions;
  }
  @Input()
  set listRowActions(actions: ListAction[]) {
    if (actions != null) {
      this._listRowActions = actions;
    }
  }

  /**
   * The default list actions performed when a list item is clicked.
   * Defaults to 'select and expand'.
   */
  private _onClickRowActions: ActionType[] = ['select', 'expand'];
  get onClickRowActions(): ActionType[] {
    return this._onClickRowActions;
  }
  @Input()
  set onClickRowActions(actionType: ActionType[]) {
    if (actionType != null) {
      this._onClickRowActions = actionType;
    }
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

  /**
   * Subscribes to an optional data schema, used to automatically generate
   * additional list filters in the filters dialog.
   */
  private _additionalDataSchemaSub: Subscription = Subscription.EMPTY;

  /**
   * Main subscription, to which every other subscription is added.
   * Used for unsubscribing all subscriptions.
   */
  private _mainSubscription: Subscription = Subscription.EMPTY;

  constructor(
      cdr: ChangeDetectorRef,
      aui: AdminUserInteractionsService,
      private _dialog: MatDialog,
      private _fts: FiltersService,
      readonly breakpointObserver: BreakpointObserverService,
      private _router: Router,
  ) {
    super(cdr, aui);

    this._mainSubscription.add(this._expandAllRowsSub)
        .add(this._columnsDialogSub)
        .add(this._actionsSub)
        .add(this._additionalDataSchemaSub);

    this._fts.clearAdditionalBasicFilters();
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
    this._expandAllRowsSub = this.expandAllRows.subscribe(res => {
      const forceExpand = res;
      forceExpand ? this.selectAll() : this.clearSelection();
      const allRows = this.getItems();

      for (let row of allRows) {
        this.expansionRowsUpdate(row, forceExpand);
      }
    });
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
   * @param row The selected row or rows
   * @param action The action to be performed
   */
  actionOnItems(row: T|T[], action: ListAction, isDetails: boolean = false): void {
    if (this.dataSource == null) {
      return;
    }
    if (action.customAction != null) {
      action.customAction(row);
      return;
    }
    this._actionEvent.emit({action: action, items: row, isDetails: isDetails});
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
   * Returns the current row expansion state
   */
  isRowExpanded(row: T): boolean {
    return this.expandedRows.indexOf(row) > -1 && this.expandable ? true : false;
  }

  /**
   * Adds or removes a row to the expanded rows, based on its current state.
   * @param row The row to be added or removes
   */
  expansionRowsUpdate(row: T, forceExpand?: boolean): void {
    if (this.isRowExpanded(row) || forceExpand === false) {
      const idx = this.expandedRows.indexOf(row);
      if (idx > -1) {
        this.expandedRows.splice(idx, 1);
      }
      delete this.expandedRowsData[row.id];
    } else if (!this.isRowExpanded(row) || forceExpand === true) {
      const detailSourceSub = this.getDetails(row).subscribe(data => {
        const dds = new MatTableDataSource(data);
        this.expandedRowsData[row.id] = dds;
        this.expandedRows.push(row);
        this._cdr.detectChanges();
        const sortsList = this._matSortsList.toArray();
        this.expandedRowsData[row.id].sort = sortsList[sortsList.length - 1];
        if (detailSourceSub != null) {
          detailSourceSub.unsubscribe();
        }
      });
    }
  }

  /**
   * Retrieves the expanded row details, a list of document
   * to be displayed in the details subtable.
   * @param row The parent row
   * @returns A list of child documents
   */
  getDetails(row: T): Observable<T[]> {
    return this._dataSource.getDetailsData(row);
  }

  detailsKeywordsFilter(event: Event, dataSource: MatTableDataSource<T>): void {
    if (dataSource == null) {
      return;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Toggles the selection and expanded state of the passed row.
   * @param row The selected row
   */
  rowToggle(row: T): void {
    if (this._onClickRowActions.some(act => act === 'select')) {
      this.selection.toggle(row);
    }
    if (this._onClickRowActions.some(act => act === 'expand')) {
      this.expansionRowsUpdate(row);
    }
    if (this._onClickRowActions.some(act => act === 'view')) {
      this.actionOnItems(row, {actionType: 'view'});
    }
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
    dialogConfig.panelClass = 'columns-selector-dialog';
    dialogConfig.data = {
      columns: this.headers,
    };
    this._columnsDialogRef = this._dialog.open(ColumnsSelector, dialogConfig);
    this._columnsDialogSub =
        this._columnsDialogRef.afterClosed()
            .pipe(catchError(err => throwError(err) as Observable<ListHeader<T>>))
            .subscribe(columns => {
              if (!columns) {
                return;
              }
              this.headers = columns;
              this.mainListContext.headers.next(this.headers);
              this.mainListContext.displayedColumns?.next(this.displayedColumns);
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
    if (this.filtersComponent) {
      this.dataSource.setFiltersComponent = this.filtersComponent;
      if (this._additionalDataSchema != null) {
        this._additionalDataSchemaSub = this._additionalDataSchema.subscribe(schema => {
          if (schema != null) {
            this.dataSource.additionalDataSchema = schema;
          }
        });
      }


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

    this.mainListContext = {
      dataSource: this._dataSource,
      headers: new BehaviorSubject<ListHeader<T>[]>(this._headers),
      displayedColumns: new BehaviorSubject<string[]>(this.displayedColumns),
      listRowActions: this._listRowActions,
      showPaginator: this.showPaginator,
      showCheckBox: this.showCheckBox,
    };

    this._initList();
  }

  /**
   * Initializes the list Actions subscription (delete, download, print, edit)
   */
  private _initList(): void {
    this._actionsSub =
        this._actionEvent
            .pipe(
                switchMap(
                    ({action, items, isDetails}) => this._aui.askConfirm(action).pipe(
                        map(confirmation => ({confirmation, action, items, isDetails})),
                        ),
                    ),
                map(({confirmation, action, items, isDetails}) => {
                  if (confirmation) {
                    this.processAction(action, items, isDetails);
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
  deleteAction(items: T|T[], isDetails: boolean = false): T[] {
    if (!Array.isArray(items)) {
      items = [items];
    }
    this.selection.deselect(...items);
    this.expandedRowsData = {};
    return this._dataSource.deleteAction(items, isDetails);
  }

  /**
   * Loads the Edit Form component for the the item.
   * @param item The item to be edited
   */
  editAction(item: T, isDetails: boolean = false): void {
    if (item == null) {
      return;
    }
    const path = [`${this.baseEditUrl}`];
    if (isDetails) {
      path.push('details');
    }
    path.push(`${item.id}`);
    this._router.navigate(path);
  }

  /**
   * Loads the Edit Form component for the the item in readOnly mode.
   * @param item The item to be viewed
   */
  viewAction(item: T, isDetails: boolean = false): void {
    if (item == null) {
      return;
    }
    const path = [`${this.baseViewUrl}`];
    if (isDetails) {
      path.push('details');
    }
    path.push(`${item.id}`);
    this._router.navigate(path);
  }

  ngOnDestroy() {
    this._mainSubscription.unsubscribe();
    this._dataSource.disconnect();
    this._fts.clearModelFilters();
  }
}
