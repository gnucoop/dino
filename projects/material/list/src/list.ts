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

import {animate, state, style, transition, trigger} from '@angular/animations';
import {SelectionModel} from '@angular/cdk/collections';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  isDevMode,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatTabGroup} from '@angular/material/tabs';
import {ActivatedRoute, Router} from '@angular/router';
import {ActionTrigger, Model} from '@dino/core/data';
import {FormSchema, FormData} from '@dino/core/forms';
import {
  ActionType,
  FilterGroup,
  FiltersService,
  List,
  ListAction,
  ListHeader,
  SearchFiltersComponent,
} from '@dino/core/list';
import {BreakpointObserverService} from '@dino/material/breakpoint-observer';
import {ExportForm} from '@dino/material/export-form';
import {FormStatusChanger, FormStatusChangerData} from '@dino/material/form-status-changer';
import {ImportForm} from '@dino/material/import-form';
import {BehaviorSubject, Observable, of as obsOf, Subject, Subscription, throwError} from 'rxjs';
import {catchError, map, switchMap, take, takeUntil} from 'rxjs/operators';

import {ColumnsSelector} from './columns-selector';
import {ListCell} from './list-cell';
import {ListContext} from './list-context';
import {ChoicesDicitionary, ListDataSource} from './list-datasource';
import {PaginatorIntl} from './paginator-intl';
import {AdminUserInteractionsService} from '@dino/material/user-interactions';
import {RxDocument} from 'rxdb';
import {TranslocoService} from '@ngneat/transloco';

/**
 * The material List component with row selection, extending the core List.
 * It is populated with data by its associated ListDataSource.
 * Provides a template, a selection model and bulk/individual actions for all lists.
 */
@Component({
  selector: 'dino-list',
  styleUrls: ['list.scss'],
  templateUrl: 'list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [{provide: MatPaginatorIntl, useClass: PaginatorIntl}],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({height: '0px'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SelectionList<T extends Model = Model, U extends Model = Model>
  extends List<T, U>
  implements AfterContentInit, OnInit, OnDestroy
{
  /**
   * Event emitted as an Action hook
   */
  @Output() readonly emitActionTrigger: EventEmitter<ActionTrigger<T>> = new EventEmitter<
    ActionTrigger<T>
  >();

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
  mainListContext?: ListContext<T, U>;

  /**
   * The Details list template context
   */
  @Input() detailsListContext?: ListContext<any>;

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
  @ViewChild('columns_btn', {read: ElementRef, static: false}) columnsButtonRef!: ElementRef;

  /**
   * A material Paginator associated to the List
   */
  @ViewChild(MatPaginator, {static: false})
  set paginator(mp: MatPaginator) {
    if (
      mp == null ||
      this._dataSource == null ||
      this._dataSource.customPaginator.getValue() != null
    ) {
      return;
    }
    this._dataSource.setPaginator = mp;
  }

  /**
   * A material Sort associated to the List
   */
  @ViewChild(MatSort, {static: false})
  set sorting(ms: MatSort) {
    if (ms == null || this._dataSource == null || this._dataSource.customSort.getValue() != null) {
      return;
    }
    this._dataSource.setSort = ms;
  }

  @ViewChildren(MatSort) private _matSortsList!: QueryList<MatSort>;

  @ViewChildren(MatTabGroup) private _matTabGroups!: QueryList<MatTabGroup>;

  /**
   * The filtersComponent associated with the SelectionList and its ListDataSource
   */
  @ContentChild(SearchFiltersComponent, {static: true}) filtersComponent!: SearchFiltersComponent;

  /**
   * Querylist of all non default template cells
   */
  @ContentChildren(ListCell, {descendants: false}) cellTemplates!: QueryList<ListCell>;
  /**
   * Determines if the list has expandable rows.
   * Defaults to true.
   * NB: rows should always be expandable on small screens (mobile)
   * to show row action icons.
   */
  private _expandable: boolean = true;
  get expandable(): boolean {
    return this._expandable;
  }
  @Input()
  set expandable(exp: boolean) {
    this._expandable = exp;
  }

  private _displayExpandAllBtn: boolean = false;
  get displayExpandAllBtn(): boolean {
    return this._displayExpandAllBtn;
  }
  @Input()
  set displayExpandAllBtn(exp: boolean) {
    this._displayExpandAllBtn = exp;
  }

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
   * Determines if the columns selector should be displayed.
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
   * If true, the bulk action checkbox is available
   */
  @Input()
  bulkActions: boolean = true;

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
  private _listRowActions: BehaviorSubject<ListAction[]> = new BehaviorSubject<ListAction[]>([]);
  get listRowActions(): ListAction[] {
    return this._listRowActions.value;
  }
  @Input()
  set listRowActions(actions: ListAction[] | null) {
    if (actions != null) {
      this._listRowActions.next(actions);
    }
  }

  /**
   * If true, the Status Edit button is displayed
   */
  private _showStatusEditButton: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get showStatusEditButton(): boolean {
    return this._showStatusEditButton.value;
  }
  @Input()
  set showStatusEditButton(show: boolean | null) {
    if (show != null) {
      this._showStatusEditButton.next(show);
    }
  }

  /**
   * If True, the list will emit an event with row data when the user hovers or selects a row.
   * Defaults to false.
   */
  @Input() emitRowDataOnHover: boolean = true;
  /**
   * Event emitted when row is selected/hovered.
   */
  @Output() readonly emitRowDataEvt: EventEmitter<T> = new EventEmitter<T>();

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
  private _dataSource?: ListDataSource<T, U>;
  get dataSource(): ListDataSource<T, U> | undefined {
    return this._dataSource;
  }
  @Input()
  set dataSource(dataSource: ListDataSource<T, U> | undefined) {
    if (dataSource !== this.dataSource && dataSource != null) {
      this._dataSource = dataSource;
      this._dataSource.dataResults
        .pipe(takeUntil(this._mainUnsubscribe))
        .subscribe(() => this.clearSelection());
    }
  }

  /**
   * A reference to the MatDialog that contains the Columns Selector
   */
  private _columnsDialogRef?: MatDialogRef<ColumnsSelector<T>>;

  /**
   * Main unsub subject.
   * Used for unsubscribing all subscriptions.
   */
  private _mainUnsubscribe: Subject<void> = new Subject();

  /**
   * A reference to the MatDialog that contains the Import component
   */
  private _importDialogRef?: MatDialogRef<ImportForm>;

  /**
   * A reference to the MatDialog that contains the Form Status Changer component
   */
  private _statusDialogRef?: MatDialogRef<FormStatusChanger>;

  /**
   * Subscribes to the value returned by the MatDialog on its closing event
   */
  private _dialogSub: Subscription = Subscription.EMPTY;

  constructor(
    cdr: ChangeDetectorRef,
    aui: AdminUserInteractionsService,
    actroute: ActivatedRoute,
    private _dialog: MatDialog,
    private _fts: FiltersService,
    readonly breakpointObserver: BreakpointObserverService,
    private _router: Router,
    private _snackbar: MatSnackBar,
    private _renderer: Renderer2,
    private _ts: TranslocoService,
  ) {
    super(cdr, aui, actroute);

    this._fts.clearAdditionalBasicFilters();
  }

  export(ev: 'XLSX' | 'CSV' | 'dialog') {
    if (
      this.dataSource != null &&
      this.dataSource.additionalDataSchema != null &&
      (this.dataSource.additionalDataSchema as Model as FormSchema).schema != null &&
      this.dataSource.dataResults.value != null
    ) {
      const formSchema: FormSchema = this.dataSource.additionalDataSchema as Model as FormSchema;
      const dialogConfig = new MatDialogConfig();
      if (ev === 'XLSX') {
        dialogConfig.data = {
          exportFormat: 'xlsx',
          selectAll: true,
        };
      } else if (ev === 'CSV') {
        dialogConfig.data = {
          exportFormat: 'csv',
          selectAll: true,
        };
      }
      let dialogRef = this._dialog.open(ExportForm, dialogConfig);
      dialogRef.componentInstance.formSchema = formSchema;
      dialogRef.componentInstance.data = this.dataSource.data as any[];
      dialogRef.componentInstance.filteredQueryObs = this.dataSource.filteredQueryObs;
      dialogRef.componentInstance.allItemsQueryObs = this.dataSource.allItemsQueryObs;
      dialogRef.componentInstance.filtersCount = this.dataSource.filtersCount;
    }
  }

  ngAfterContentInit(): void {
    this._cellTemplatesMap = this.cellTemplates.reduce((prev, cur) => {
      prev[cur.column] = cur.templateRef;
      return prev;
    }, {} as {[column: string]: TemplateRef<any>});
  }

  ngOnInit() {
    if (this._dataSource) {
      this._fillDataSource();
    }

    this._fts.filterErrorEvt.pipe(takeUntil(this._mainUnsubscribe)).subscribe(evt =>
      this._snackbar.open(evt.text, evt.msg.toUpperCase(), {
        duration: 10000,
      }),
    );

    this.expandAllRows.pipe(takeUntil(this._mainUnsubscribe)).subscribe(res => {
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
  actionOnItems(row: T | T[], action: ListAction, isDetails: boolean = false): void {
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
      this.getDetails(row)
        .pipe(take(1))
        .subscribe(data => {
          const dds = new MatTableDataSource(data);
          this.expandedRowsData[row.id] = dds;
          this.expandedRows.push(row);
          this._cdr.detectChanges();
          const sortsList = this._matSortsList.toArray();
          this.expandedRowsData[row.id].sort = sortsList[sortsList.length - 1];
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
    if (this._dataSource == null) {
      return obsOf([]);
    }
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
    this.emitActionTrigger.emit({
      name: 'List Row Click',
      triggerType: 'on_list_item_selection',
      triggerData: {doc: row as RxDocument<T>},
    });
  }

  /**
   * Emits the row data on hover/selection
   * @param row The hovered or selected row
   */
  emitRowData(row: T): void {
    this.emitRowDataEvt.emit(row);
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
    this._columnsDialogRef
      .afterClosed()
      .pipe(
        catchError(err => throwError(() => err) as Observable<ListHeader<T>>),
        takeUntil(this._mainUnsubscribe),
      )
      .subscribe((columns: ListHeader<T>[]) => {
        if (!columns) {
          return;
        }
        this._saveColumnsSelectionPreset(columns);
        this.headers = columns;
        if (this.mainListContext != null) {
          this.mainListContext.headers.next(this.headers);
          this.mainListContext.displayedColumns?.next(this.displayedColumns);
        }
      });
  }

  openStatusEditor(element: FormData & {form_schema: Observable<FormSchema>}): void {
    const dialogConfig = new MatDialogConfig();
    const dialogData: FormStatusChangerData = {formData: element};
    dialogConfig.data = dialogData;
    this._statusDialogRef = this._dialog.open(FormStatusChanger, dialogConfig);
    this._statusDialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(statusChange => {
        if (statusChange != null) {
          this.emitActionTrigger.emit({
            name: 'Status Change',
            triggerType: 'on_status_change',
            triggerData: statusChange,
          });
        }
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
    const sortingDataAccessor = (item: T & {[key: string]: any}, property: string) => {
      if (item != null && property) {
        if (item[property] != null) {
          return item[property];
        } else if (item['data'] != null && item['data'][property] != null) {
          return item['data'][property];
        }
      }
      return null;
    };
    this.dataSource.sortingDataAccessor = sortingDataAccessor;

    if (this.filtersComponent) {
      this.dataSource.setFiltersComponent = this.filtersComponent;
      if (this._additionalDataSchema != null) {
        this._additionalDataSchema.pipe(take(1)).subscribe(schema => {
          if (schema != null && this.dataSource != null) {
            this.dataSource.additionalDataSchema = schema;
          }
        });
      }
    } else {
      // If no filtersComponent is found in the template, the list is initalized without
      // any filters and/or filter presets.
      this._fts.loadPreset();
    }

    this.mainListContext = {
      dataSource: this._dataSource,
      headers: new BehaviorSubject<ListHeader<T>[]>(this.headers),
      displayedColumns: new BehaviorSubject<string[]>(this.displayedColumns),
      listRowActions: this._listRowActions,
      showStatusEdit: this._showStatusEditButton,
      showPaginator: this.showPaginator,
      showCheckBox: this.showCheckBox,
    };

    this._initList();
  }

  /**
   * Initializes the list Actions subscription (delete, download, print, edit)
   */
  private _initList(): void {
    this._actionEvent
      .pipe(
        switchMap(({action, items, isDetails}) =>
          this._aui
            .askConfirm(action)
            .pipe(map(confirmation => ({confirmation, action, items, isDetails}))),
        ),
        map(({confirmation, action, items, isDetails}) => {
          if (confirmation) {
            this.processAction(action, items, isDetails);
          }
        }),
        catchError(err => throwError(() => new Error(err))),
        takeUntil(this._mainUnsubscribe),
      )
      .subscribe();

    if (this._dataSource != null) {
      this._dataSource.actionErrorEvt.pipe(takeUntil(this._mainUnsubscribe)).subscribe(errEvt => {
        this._snackbar.open(
          `Oops! Something went wrong while performing the requested action.`,
          errEvt.message.toUpperCase(),
          {
            duration: 5000,
          },
        );
      });
    }

    this._headers
      .pipe(
        catchError(err => throwError(() => new Error(err))),
        takeUntil(this._mainUnsubscribe),
      )
      .subscribe(headers => {
        if (this.mainListContext != null) {
          this.mainListContext.headers.next(headers);
          this.mainListContext.displayedColumns?.next(this.displayedColumns);
        }
        if (this.dataSource != null) {
          this.dataSource.dataHeaders = headers.filter(header => header.displayed);
        }
      });
  }

  /**
   * Returns the reference string to an external collection
   * @param header A list header
   * @returns The ref string
   */
  getRef(header: ListHeader<T>): string {
    if (header == null || header.external_ref == null) {
      return header.column.toString().replace('_ref_id', '');
    }
    return header.external_ref.toString().replace('_ref_id', '');
  }

  getPopulatedRef(
    refObj: {[key: string]: string} | any | null,
    populateWith: string,
  ): string | null {
    if (refObj == null || populateWith == null) {
      return null;
    }

    return refObj[populateWith];
  }

  /**
   * Retrieves the list cell content for a cell belonging to a Repeating Slide
   * @param elementData The row element data
   * @param header The list cell header
   * @returns The content of the cell
   */
  getRepeatingSlideCellContent(
    elementData: {[key: string]: any},
    header: ListHeader<T>,
    choices: ChoicesDicitionary | null | undefined,
  ): string[] {
    const aggregateData: string[] = [];
    for (let key in elementData) {
      const headerName = header.column.toString();
      if (key.includes(headerName)) {
        let item = elementData[key];
        if (choices && choices[headerName]) {
          let labelItem = choices[headerName].find(ch => ch.value == item);
          item = labelItem ? labelItem.label : item;
        }
        aggregateData.push(item);
      }
    }
    return aggregateData;
  }

  /**
   * Returns the total number of tabs in a repeating slide
   * tab group
   * @param tab The material tab group
   * @returns Total number of tabs contained in it
   */
  getRepeatingSlideTabCount(tab: MatTabGroup): number {
    if (tab._tabs) {
      return tab._tabs.length;
    }
    return 0;
  }

  /**
   * Changes the tab index of all tab groups belonging
   * to the same repeating slide
   * @param tab The material tab group
   * @param index The index to be set in all liked tab groups
   */
  moveRepeatingSlideTab(tab: MatTabGroup, index: number): void {
    const tabGroupElement = tab._elementRef.nativeElement as Element;
    const tabGroupId = tabGroupElement.getAttribute('tabgroupid');
    this._matTabGroups.forEach(tabGroup => {
      const tgId = (<Element>tabGroup._elementRef.nativeElement).getAttribute('tabgroupid');
      if (tgId === tabGroupId) {
        tabGroup.selectedIndex = index;
      }
    });
  }

  /**
   * Queries the DataSource for the deletion of Items
   * @param items The items to be deleted
   * @param isDetails If true, the items are in the details of a parent
   * @returns The deleted items
   */
  deleteAction(items: T | T[], isDetails: boolean = false): T[] {
    if (!Array.isArray(items)) {
      items = [items];
    }
    this.selection.deselect(...items);
    this.expandedRowsData = {};
    if (this._dataSource != null) {
      return this._dataSource.deleteAction(items, isDetails);
    }
    return [];
  }

  /**
   * Loads the Edit component for the the item.
   * @param item The item to be edited
   * @param isDetails If true, the form is a sub-form displayed in a sub list. Defaults to false
   */
  editAction(item: T, isDetails: boolean = false): void {
    const genItem = item as {[key: string]: any};
    if (
      item == null ||
      (genItem['form_schema_ref_id'] == null && genItem['report_schema_ref_id'] == null) ||
      this.baseUrl == null ||
      this.baseEditUrl == null
    ) {
      return;
    }
    const path = [
      this.baseUrl,
      genItem['form_schema_ref_id'] ?? genItem['report_schema_ref_id'],
      this.baseEditUrl,
    ];
    if (isDetails) {
      path.push('details');
    }
    path.push(item.id);
    this._router.navigate(path);
  }

  /**
   * Loads the component to create a new item.
   * @param schemaId The schema Id of the created Document
   * @param baseUrl The base url of the doc being created
   */
  createAction(schemaId: string): void {
    if (schemaId == null || this.baseUrl == null || this.baseCreateUrl == null) {
      return;
    }
    const path = [this.baseUrl, schemaId, this.baseCreateUrl];
    this._router.navigate(path);
  }

  /**
   * Loads the component to import new items.
   * @param schemaId The schema Id of the documents
   */
  openImportForms(schemaId: string): void {
    if (schemaId == null || this.baseUrl == null || this.baseCreateUrl == null) {
      return;
    }
    if (schemaId != null) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        formSchema: schemaId,
      };
      this._importDialogRef = this._dialog.open(ImportForm, dialogConfig);
      this._dialogSub = this._importDialogRef
        .afterClosed()
        .pipe(
          catchError(err => throwError(() => err) as Observable<boolean>),
          take(1),
        )
        .subscribe((formSchema: {[key: string]: any}) => {
          if (formSchema != null) {
            if (isDevMode()) {
              console.log('forms imported');
            }
            // this._updateImportedFormData(formSchema);
          }
        });
    }
  }

  /**
   * Loads the Edit component for the the item in readOnly mode.
   * @param item The item to be viewed
   * @param isDetails If true, the form is a sub-form displayed in a sub list. Defaults to false
   */
  viewAction(item: T, isDetails: boolean = false): void {
    const genItem = item as {[key: string]: any};
    if (
      item == null ||
      (genItem['form_schema_ref_id'] == null && genItem['report_schema_ref_id'] == null) ||
      this.baseUrl == null ||
      this.baseViewUrl == null
    ) {
      return;
    }
    const path = [
      this.baseUrl,
      genItem['form_schema_ref_id'] ?? genItem['report_schema_ref_id'],
      this.baseViewUrl,
    ];
    if (isDetails) {
      path.push('details');
    }
    path.push(item.id);
    this._router.navigate(path);
  }

  /**
   * Adds the row Item to the corresponding localStorage "favorites" slot.
   * @param item The item to be added to favorites
   * @param isDetails If true, the form is a sub-form displayed in a sub list. Defaults to false
   */
  addFavoriteAction(item: T, _isDetails: boolean = false): void {
    const genItem = item as {[key: string]: any};
    if (
      item == null ||
      (genItem['form_schema_ref_id'] == null && genItem['report_schema_ref_id'] == null) ||
      this.baseUrl == null
    ) {
      return;
    }
    const itemObj = item as {[key: string]: any};
    let favoriteKey = null;
    if (itemObj['report_schema_ref_id'] && this.baseInstanceName) {
      favoriteKey = `dino_favorite_report_${this.baseInstanceName}`;
    } else if (itemObj['form_schema_ref_id'] && this.baseInstanceName) {
      favoriteKey = `dino_favorite_form_${this.baseInstanceName}`;
    }

    if (favoriteKey) {
      localStorage.setItem(favoriteKey, item.id);
      this._snackbar.open(
        this._ts.translate(
          'Item successfully added to your favorites. Favorite Reports will be displayed in your Dashboard.',
        ),
        this._ts.translate('ADDED TO FAVORITES'),
        {
          duration: 10000,
        },
      );
    }
  }

  /**
   * Removes the row Item from the corresponding localStorage "favorites" slot.
   * @param item The item to be removed from favorites
   * @param isDetails If true, the form is a sub-form displayed in a sub list. Defaults to false
   */
  removeFavoriteAction(item: T, _isDetails: boolean = false): void {
    const genItem = item as {[key: string]: any};
    if (
      item == null ||
      (genItem['form_schema_ref_id'] == null && genItem['report_schema_ref_id'] == null) ||
      this.baseUrl == null
    ) {
      return;
    }
    const itemObj = item as {[key: string]: any};
    let favoriteKey = null;
    if (itemObj['report_schema_ref_id'] && this.baseInstanceName) {
      favoriteKey = `dino_favorite_report_${this.baseInstanceName}`;
    } else if (itemObj['form_schema_ref_id'] && this.baseInstanceName) {
      favoriteKey = `dino_favorite_form_${this.baseInstanceName}`;
    }

    if (favoriteKey) {
      localStorage.removeItem(favoriteKey);
      this._snackbar.open(
        this._ts.translate('Item successfully removed from your favorites.'),
        this._ts.translate('REMOVED FROM FAVORITES'),
        {
          duration: 10000,
        },
      );
    }
  }

  onRowMouseEnter(evt: MouseEvent, row: any): void {
    const {target} = evt;
    if (target != null) {
      this._renderer.addClass(target, 'dino-hover');
    }
    if (this.emitRowDataOnHover) {
      this.emitRowData(row);
    }
  }

  onRowMouseLeave(evt: MouseEvent): void {
    const {target} = evt;
    if (target != null) {
      this._renderer.removeClass(target, 'dino-hover');
    }
  }

  ngOnDestroy() {
    this._mainUnsubscribe.next();
    this._mainUnsubscribe.complete();
    this.emitRowDataEvt.complete();
    if (this._dataSource != null) {
      this._dataSource.disconnect();
    }
    this._fts.clearModelFilters();
    this._dialogSub.unsubscribe();
  }
}
