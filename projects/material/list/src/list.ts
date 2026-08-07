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
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  inject,
  Inject,
  Input,
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
import {ActionTrigger, ActionTriggerData, Model, TriggerType} from '@dino/core/data';
import {
  FormData,
  FormDataManager,
  FormSchema,
  FormStatus,
  FormStatusManager,
} from '@dino/core/forms';
import {
  ActionType,
  FilterGroup,
  FiltersService,
  List,
  ListAction,
  ListHeader,
  mainActions,
  SearchFiltersComponent,
} from '@dino/core/list';
import {BreakpointObserverService} from '@dino/material/breakpoint-observer';
import {ExportList} from '@dino/material/export-list';
import {ExportListData, ExportListType} from '@dino/core/exporter';
import {FormStatusChanger, FormStatusChangerData} from '@dino/material/form-status-changer';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  Observable,
  of as obsOf,
  Subject,
  Subscription,
  throwError,
  zip,
} from 'rxjs';
import {
  catchError,
  map,
  shareReplay,
  switchMap,
  take,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';

import {ColumnResizeEvent} from './column-resize';
import {ColumnsSelector} from './columns-selector';
import {ListCell} from './list-cell';
import {ListContext} from './list-context';
import {ChoicesDicitionary, ListDataSource} from './list-datasource';
import {PaginatorIntl} from './paginator-intl';
import {AdminUserInteractionsService} from '@dino/material/user-interactions';
import {RxDocument} from 'rxdb';
import {TranslocoService} from '@ngneat/transloco';
import {deepCopy} from '@ajf/core/utils';
import {format} from 'date-fns';
import {FileUploadService, StorageUploadResponse} from '@dino/core/file-upload';
import {NetworkStatusService} from '@dino/core/auth';
import {UserDataManager, UserGroupManager} from '@dino/core/users';
import {LogViewer} from './log-viewer';
import {ImagePreview} from './image-preview';
import {FormMetricSelectorDialog} from '@dino/material/form-metric-selector';
import {ActionsModal} from './actions-modal';
import {BrowserDetectorService} from '@dino/material/browser-detector';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {UI_TOUR_SERVICE_CONFIG, UITourConfig} from '@dino/material/ui-tour-service';

/**
 * Counts the lists, so that each one sizes the columns of its own table.
 */
let listInstances = 0;

/**
 * The columns that are not part of the data and keep their place at the ends
 * of a row: they are neither dragged nor resized.
 */
const FIXED_COLUMNS: string[] = ['select', 'actions'];

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
  implements AfterContentInit, AfterViewInit, OnInit, OnDestroy
{
  /**
   * Event emitted as an Action hook
   */
  @Output() readonly emitActionTrigger: EventEmitter<ActionTrigger<T>> = new EventEmitter<
    ActionTrigger<T>
  >();

  /**
   * Event emitted as an Action hook for Form Data Exports
   */
  @Output() emitExportActionTrigger: EventEmitter<ActionTrigger> =
    new EventEmitter<ActionTrigger>();

  /**
   * The primary row actions
   */
  readonly mainActions: ActionType[] = mainActions;

  /**
   * If true, the secondary row actions icons are displayed
   */
  secondaryRowActionsDisplayed: boolean = false;


  /**
   * True if the Form can have one or more null Metrics.
   * Defaults to false.
   */
  @Input()
  hasOptionalMetrics: boolean = false;

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
   * If true, the status progress bar is displayed along the status label
   */
  @Input() showStatusProgressBar?: boolean;

  /**
   * The Details list template context
   */
  @Input() detailsListContext?: ListContext<any>;

  /**
   * True if this is an aggregation list
   */
  @Input() isAggregationList?: boolean;

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
  set additionalBasicFilters(filterNames: string[] | null) {
    if (!filterNames || !filterNames.length) {
      return;
    }
    for (let ftName of filterNames) {
      if (this._fts.availableBasicFilterLabels.indexOf(ftName) > -1) {
        this._fts.addBasicFilter(ftName);
      }
    }
    if (this.filtersComponent != null) {
      this.filtersComponent.initFilters();
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
    const currentPageSize = localStorage.getItem('dino_page_size');
    if (currentPageSize != null) {
      mp.pageSize = +currentPageSize;
    }
    if (
      mp == null ||
      this._dataSource == null ||
      this._dataSource.customPaginator.getValue() != null
    ) {
      return;
    }
    this._dataSource.setPaginator = mp;
    mp.page.pipe(takeUntil(this._mainUnsubscribe)).subscribe(pageEvt => {
      if (pageEvt.previousPageIndex === pageEvt.pageIndex) {
        localStorage.setItem('dino_page_size', pageEvt.pageSize.toString());
      }
    });
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
   * "shown/total" label for the Columns selector button (e.g. "10/12").
   */
  get columnsSelectedLabel(): string {
    const headers = this.headers;
    if (!headers || !headers.length) {
      return '';
    }
    const total = headers.length;
    const shown = headers.filter(
      h => (h.displayed || h.displayed === undefined) && !h.hidden,
    ).length;
    return `${shown}/${total}`;
  }

  /**
   * If true, the bulk action checkbox is available
   */
  @Input()
  bulkActions: boolean = true;

  /**
   * Indicates which bulk actions are available
   */
  @Input()
  bulkActionsAvailable: ('delete' | 'bulkFormEdit' | 'deleteWithCheck')[] | null = ['delete'];

  /**
   * A custom action to be performed on bulk delete
   */
  @Input()
  bulkDeleteAction?: (row: any) => void;

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
   * Secondary metric field to display in the Form Metric Selector and Filters
   */
  private _secondaryMetricFieldsDisplayed: {
    [metricName: string]: string | string[];
  } | null = null;
  get secondaryMetricFieldsDisplayed(): {
    [metricName: string]: string | string[];
  } | null {
    return this._secondaryMetricFieldsDisplayed;
  }
  @Input()
  set secondaryMetricFieldsDisplayed(
    fields: {
      [metricName: string]: string | string[];
    } | null,
  ) {
    this._secondaryMetricFieldsDisplayed = fields;
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
   * Event emitted when the List Selection changes
   */
  @Output() readonly emitSelectionChangedEvt: EventEmitter<T[]> = new EventEmitter<T[]>();

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
    }
  }

  /**
   * The optional isHighlighted method for rows.
   */
  @Input() isHighlightedRowMethod?: (row: T) => boolean;

  /**
   * The statuses related to the additional data schema (if present)
   */
  private _statuses: Observable<FormStatus[]> = obsOf([]);

  /**
   * A reference to the MatDialog that contains the Columns Selector
   */
  private _columnsDialogRef?: MatDialogRef<ColumnsSelector<T>>;

  /**
   * A reference to the MatDialog that contains the Columns Selector
   */
  private _actionsDialogRef?: MatDialogRef<ActionsModal<T>>;

  /**
   * Main unsub subject.
   * Used for unsubscribing all subscriptions.
   */
  private _mainUnsubscribe: Subject<void> = new Subject();


  /**
   * A reference to the MatDialog that contains the Form Status Changer component
   */
  private _statusDialogRef?: MatDialogRef<FormStatusChanger>;

  /**
   * A reference to the MatDialog that contains the Form Metrics Selector Dialog
   */
  private _fmDialogRef?: MatDialogRef<FormMetricSelectorDialog>;

  /**
   * Subscribes to the value returned by the MatDialog on its closing event
   */
  private _dialogSub: Subscription = Subscription.EMPTY;

  private _uploadingFilesRows = new Set<string>();

  isOnline = true;

  /**
   * Subscribes to List Selection change event
   */
  private _selectionChangedSub: Subscription = Subscription.EMPTY;

  /**
   * The column being resized and the width its grip is at, while it is dragged
   */
  private _resizingColumn: ColumnResizeEvent | null = null;

  /**
   * The stylesheet holding the widths of the resized columns of this list
   */
  private _widthsStyle: HTMLStyleElement | null = null;

  /**
   * The class identifying this list, so that its column widths are its own
   */
  private readonly _listClass = `dino-list-${++listInstances}`;

  /**
   * The host element, used to mark the list with its own class
   */
  private readonly _elementRef = inject(ElementRef) as ElementRef<HTMLElement>;

  constructor(
    @Inject(UI_TOUR_SERVICE_CONFIG) readonly uiServiceConfig: UITourConfig,
    cdr: ChangeDetectorRef,
    aui: AdminUserInteractionsService,
    actroute: ActivatedRoute,
    readonly dialog: MatDialog,
    readonly breakpointObserver: BreakpointObserverService,
    readonly bds: BrowserDetectorService,
    private _fts: FiltersService,
    private _router: Router,
    private _snackbar: MatSnackBar,
    private _renderer: Renderer2,
    private _ts: TranslocoService,
    private _fsm: FormStatusManager,
    private _fdm: FormDataManager,
    private _uploadService: FileUploadService,
    private _udm: UserDataManager,
    private _ugm: UserGroupManager,
    private _nss: NetworkStatusService,
  ) {
    super(cdr, aui, actroute);

    this._nss.isOnline$.pipe(takeUntil(this._mainUnsubscribe)).subscribe(online => {
      this.isOnline = online;
      this._cdr.markForCheck();
    });

    this._fts.clearAdditionalBasicFilters();
    this._selectionChangedSub = this.selection.changed.subscribe(() =>
      this.emitSelectionChangedEvt.emit(this.getSelection()),
    );
  }

  /**
   * Exports the list
   * @param ev Type of the event (export directly in csv/xlsx or open dialog)
   * @param listType The type of items in the List
   */
  export(ev: 'XLSX' | 'CSV' | 'dialog', listType: ExportListType = 'forms'): void {
    switch (listType) {
      case 'metrics':
        this._exportMetrics(ev);
        break;
      case 'forms':
      default:
        this._exportForms(ev);
        break;
    }
  }

  ngAfterContentInit(): void {
    this._cellTemplatesMap = this.cellTemplates.reduce((prev, cur) => {
      prev[cur.column] = cur.templateRef;
      return prev;
    }, {} as {[column: string]: TemplateRef<any>});
  }

  ngAfterViewInit(): void {
    // The widths of the columns are written in a stylesheet of this list only.
    this._renderer.addClass(this._elementRef.nativeElement, this._listClass);
    this._headers.pipe(takeUntil(this._mainUnsubscribe)).subscribe(() => {
      this._applyColumnWidths();
    });
    if (this._dataSource && this._dataSource.dataResults != null) {
      this._dataSource.dataResults.pipe(takeUntil(this._mainUnsubscribe)).subscribe(() => {
        this.clearSelection();
        this._cdr.detectChanges();
      });
    }
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
   * Performs the chosen action for the selected row/rows of the table
   * @param row The selected row or rows
   * @param action The action to be performed
   * @param isDetails If true, the items are in the details of a parent
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

  toggleSecondaryIcons(): void {
    this.secondaryRowActionsDisplayed = !this.secondaryRowActionsDisplayed;
  }

  /**
   * Returns the current row expansion state
   */
  isRowExpanded(row: T): boolean {
    return this.expandedRows.indexOf(row) > -1 && this.expandable ? true : false;
  }

  /**
   * Returns if the current row is to be highlighted
   */
  isHighlightedRow(row: T): boolean {
    return this.isHighlightedRowMethod ? this.isHighlightedRowMethod(row) : false;
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
          for (let key in this.expandedRowsData) {
            if (this.expandedRowsData.hasOwnProperty(key)) {
              delete this.expandedRowsData[key];
            }
          }
          this.expandedRows.length = 0;
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
   * Performs the delete with check (a check is performed before the delete operation)
   * on the selected row/rows of the table
   * @param row The selected row or rows
   * @param isDetails If true, the items are in the details of a parent
   */
  actionOnItemsDeleteWithCheck(row: T | T[], isDetails: boolean = false): void {
    if (this.bulkDeleteAction) {
      return this.actionOnItems(
        row,
        {
          actionType: 'delete',
          matIcon: 'delete',
          customAction: this.bulkDeleteAction,
        },
        isDetails,
      );
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
    this._columnsDialogRef = this.dialog.open(ColumnsSelector, dialogConfig);
    this._columnsDialogRef
      .afterClosed()
      .pipe(
        catchError(err => throwError(() => err) as Observable<ListHeader<T>>),
        takeUntil(this._mainUnsubscribe),
      )
      .subscribe((columns: ListHeader<T>[] | 'reset') => {
        if (!columns) {
          return;
        }
        if (columns === 'reset') {
          this.resetColumns();
          return;
        }
        this._saveColumnsSelectionPreset({columns, displayedColumns: this._displayedColumns});
        this._applyHeaders(columns);
        if (this.mainListContext != null) {
          this.mainListContext.headers.next(this.headers);
          this.mainListContext.displayedColumns?.next(this.displayedColumns);
        }
      });
  }

  /**
   * Opens a dialog with the list Actions Modal.
   */
  openActionsDialog(row: T, actions: ListAction[], isDetails: boolean) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'list-actions-dialog';
    dialogConfig.data = {
      doc: row,
      actions: actions,
      isDetails
    };
    this._actionsDialogRef = this.dialog.open(ActionsModal<T>, dialogConfig);
    this._actionsDialogRef
      .afterClosed()
      .pipe(
        catchError(err => throwError(() => err)),
        takeUntil(this._mainUnsubscribe),
      )
      .subscribe((res: {action: ListAction, doc: T, isDetails: boolean}) => {
        if(res != null){
          this.actionOnItems(row, res.action, res.isDetails);
        }
      });
  }

  /**
   * Opens a dialog with the Status Editor.
   * Subscribes to Dialog closing event to emit the Status Change trigger.
   */
  openStatusEditor(element: FormData & {form_schema: Observable<FormSchema>}): void {
    const dialogConfig = new MatDialogConfig();
    const dialogData: FormStatusChangerData = {formData: element};
    dialogConfig.data = dialogData;
    this._statusDialogRef = this.dialog.open(FormStatusChanger, dialogConfig);
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

  getStatusProgress(element: Observable<FormStatus>): Observable<number | null> {
    return combineLatest([element, this._statuses]).pipe(
      map(([status, allStatuses]) => {
        if (status == null || allStatuses == null || !allStatuses.length) {
          return 0;
        }
        const numOfStatuses = [...new Set([...allStatuses.map(status => status.status_level)])]
          .length;
        const singleStatusWeigth = 100 / numOfStatuses;
        return (status.status_level + 1) * singleStatusWeigth;
      }),
    );
  }

  hasAllowedStatus(row: T): Observable<boolean>{
    if(!('form_status_ref_id' in row) || !('form_schema_ref_id' in row)) return obsOf(false);
    return this._fdm.hasAllowedFormStatus(row as unknown as FormData);
  }

  /**
   * Returns all Main Actions that are actually available to the user
   * @param availableActions All list actions available to the current user
   * @returns All main actions available to the current user
   */
  getMainActions(availableActions: ListAction[]): ListAction[] {
    if (!availableActions || !availableActions.length) return [];
    const mainActions = availableActions.filter(action =>
      this.mainActions.includes(action.actionType),
    );
    return mainActions;
  }

  /**
   * Drops a draggable column (mat-header-cell)
   * @param event the Cdk DragDrop event
   */
  drop(event: CdkDragDrop<string[]>): void {
    // Only the columns of the data are dragged: the checkbox and the actions
    // are not, and they keep their place at the two ends of the row. The
    // indexes of the event count the dragged columns alone, so the move is
    // applied to those and the row is rebuilt around them.
    const draggable = this._displayedColumns.filter(column => !FIXED_COLUMNS.includes(column));
    moveItemInArray(draggable, event.previousIndex, event.currentIndex);
    const reordered = [
      ...this._displayedColumns.filter(column => column === 'select'),
      ...draggable,
      ...this._displayedColumns.filter(column => column === 'actions'),
    ];
    // The array is the one the table renders from: it is reordered in place.
    this._displayedColumns.splice(0, this._displayedColumns.length, ...reordered);
    this.mainListContext?.displayedColumns?.next(this._displayedColumns);
    this._saveColumnsSelectionPreset({columns: this._headers.value, displayedColumns: this._displayedColumns});
    this._cdr.markForCheck();
  }

  /**
   * Gives the table back the columns of its section: the ones displayed, their
   * order and their widths, dropping what the User has customized.
   */
  resetColumns(): void {
    this._clearColumnsSelectionPreset();
    // The preferences have just been dropped, so this displays the headers as
    // the section defines them.
    this._applyHeaders(this._defaultHeaders.map(header => ({...header})));
    if (this.mainListContext != null) {
      this.mainListContext.headers.next(this.headers);
      this.mainListContext.displayedColumns?.next(this.displayedColumns);
    }
    this._applyColumnWidths();
    this._cdr.markForCheck();
  }

  /**
   * Follows the grip of a column while it is dragged.
   * @param evt The column being resized and its current width
   */
  resizeColumn(evt: ColumnResizeEvent): void {
    this._resizingColumn = evt;
    this._applyColumnWidths();
  }

  /**
   * Stores the width a column has been resized to.
   * @param evt The resized column and its width
   */
  resizeColumnEnd(evt: ColumnResizeEvent): void {
    this._resizingColumn = null;
    const headers = this._headers.value;
    const header = headers.find(h => h.column.toString() === evt.column);
    if (header == null) {
      return;
    }
    // The header is replaced, not written into: with no preference stored the
    // headers are the ones the section holds, and a width is not one of theirs.
    const resized = headers.map(h =>
      h.column.toString() === evt.column ? {...h, width: evt.width} : h,
    );
    this._headers.next(resized);
    this.mainListContext?.headers.next(resized);
    this._applyColumnWidths();
    this._saveColumnsSelectionPreset({
      columns: resized,
      displayedColumns: this._displayedColumns,
    });
  }

  /**
   * Sizes the resized columns through a stylesheet of this list, rather than
   * through a binding on every cell: a cell is rendered by the table, in a view
   * of its own, and the widths must follow the pointer without waiting for a
   * change detection, and hold for the rows rendered later.
   */
  protected _applyColumnWidths(): void {
    const rules: string[] = [];
    for (const header of this._headers.value) {
      const width =
        this._resizingColumn != null && this._resizingColumn.column === header.column.toString()
          ? this._resizingColumn.width
          : header.width;
      if (width == null) {
        continue;
      }
      // The table builds its column classes replacing whatever is not allowed
      // in a css class name, as a column name is a field name.
      const column = header.column.toString().replace(/[^a-z0-9_-]/gi, '-');
      // The default width of a column is given by selectors with a higher
      // specificity than this one, i.e. the min-width of
      // 'mat-cell:not(.mat-column-actions):not(.mat-column-select)...', which
      // would keep a column from being made narrower than the default.
      rules.push(
        `.${this._listClass} .mat-column-${column}` +
          `{flex:0 0 ${width}px!important;` +
          `min-width:${width}px!important;` +
          `max-width:${width}px!important;}`,
      );
    }
    if (this._widthsStyle == null) {
      this._widthsStyle = this._renderer.createElement('style') as HTMLStyleElement;
      this._renderer.appendChild(document.head, this._widthsStyle);
    }
    this._widthsStyle.textContent = rules.join('\n');
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
        this._dataSourceSub = combineLatest([this._additionalDataSchema, this._nodesVisibility]).subscribe(([schema, nodesVisibility]) => {
          if(nodesVisibility != null && this.dataSource != null){
            this.dataSource.nodesVisibility = nodesVisibility;
          }
          if (schema != null && this.dataSource != null) {
            this.dataSource.additionalDataSchema = schema;
            const fschema = deepCopy(this._dataSource?.additionalDataSchema) as {
              [key: string]: any;
            };
            if (fschema['form_status_ref_id']?.length) {
              this._statuses = this._fsm
                .query({selector: {id: {$in: fschema['form_status_ref_id']}}})
                .pipe(shareReplay(1));
            }
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
      showPaginator: this.showPaginator,
      showCheckBox: this.showCheckBox,
    };

    this._initList();
  }

  /**
   * Initializes the list Actions subscription (delete, download, print, duplicate, edit)
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
   * Opens a dialog with the Image Preview component
   * @param $event The js event
   * @param elem The list cell element
   */
  previewImage($event: Event, elem: string | {[key: string]: any} | null) {
    $event.stopPropagation();
    $event.preventDefault();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'image-preview-dialog';
    if (typeof elem === 'string') {
      dialogConfig.data = {url: elem};
    } else {
      dialogConfig.data = elem;
    }

    this.dialog.open(ImagePreview, dialogConfig);
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
      return '';
    }
    if (refObj[populateWith] == null) {
      return '';
    }
    if (typeof refObj[populateWith] === 'object') {
      return `${JSON.stringify(refObj[populateWith], null, 2).replace('{', '').replace('}', '')}`;
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
  ): (string | {[key: string]: any})[] {
    const aggregateData: (string | {[key: string]: any})[] = [];
    const allTabKeys: string[] = this._getRepeatingSlideCellAllTabs(elementData, header);
    for (let key of allTabKeys) {
      const headerName = header.column.toString();
      let item = elementData[key] ?? null;
      if (choices && choices[headerName]) {
        let labelItem = choices[headerName].find(ch => ch.value == item);
        if (!labelItem && Array.isArray(item)) {
          const labelItems = item
            .map(v => {
              labelItem = choices[headerName].find(ch => ch.value == v);
              // TODO Slice the label to 30 chars? .slice(0, 30) ?
              return labelItem ? labelItem.label : v;
            })
            .filter(v => v != undefined);
          item = labelItems.length ? labelItems.join(', ') : item;
        } else {
          item = labelItem ? labelItem.label : item;
        }
      }
      aggregateData.push(item);
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
   * Opens the bulk edit dialog for the items. (Only available for Form Data lists)
   * @param items The items to be edited
   */
  bulkFormEditAction(items: T[]): void {
    const genItem = items as {[key: string]: any}[];
    if (
      genItem == null ||
      !genItem.length ||
      (genItem[0]['form_schema_ref_id'] == null && genItem[0]['report_schema_ref_id'] == null)
    ) {
      return;
    }
    const statusHeader = this._headers.value.find(header => header.column === 'form_status_ref_id');
    const isStatusEditable: boolean =
      statusHeader && statusHeader.isEditable !== undefined
        ? !genItem.some(item => !statusHeader.isEditable!(item))
        : false;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      routeParams: this._route.snapshot.params,
      formSchema: genItem[0]['form_schema'],
      formDatas: genItem as FormData[],
      statusEditable: isStatusEditable,
      secondaryMetricFieldsDisplayed: this._secondaryMetricFieldsDisplayed,
      context: 'bulkFormEdit',
    };
    this._fmDialogRef = this.dialog.open(FormMetricSelectorDialog, dialogConfig);
    this._fmDialogRef
      .afterClosed()
      .pipe(
        take(1),
        switchMap((changes: {[key: string]: any} | null) => {
          if (changes == null || Object.values(changes).every(v => v == null) || !items.length) {
            return obsOf(null);
          }
          changes['created_at'] =
            changes['created_at'] != null ? format(changes['created_at'], 'yyyy-MM-dd') : null;
          const formChanges: {[key: string]: any} = {};
          for (let key in changes) {
            if (changes[key] != null) {
              formChanges[key] = changes[key];
            }
          }
          const triggerChanges = items.map(item => {
            return {
              id: item.id,
              hasStatusChanged: formChanges['form_status_ref_id'] != null,
              previousValue: item,
            };
          });
          return forkJoin([obsOf(triggerChanges), this._fdm.bulkUpdate(genItem as FormData[], formChanges).pipe(take(1))])
        }),
        withLatestFrom(this._udm.getActiveUserData(), this._ugm.getActiveUserGroups()),
      )
      .subscribe(allRes => {
        const res = allRes[0];
        if (res == null) return;
        const triggers: {
          id: string;
          hasStatusChanged: boolean;
          previousValue: T;
        }[] = res.shift() as {
          id: string;
          hasStatusChanged: boolean;
          previousValue: T;
        }[];

        const patchedDocs: (RxDocument<T> | null)[] = res.flat() as unknown as (RxDocument<T> | null)[];
        triggers.forEach(trigger => {
          const patchedDoc = patchedDocs.find(doc => doc != null && doc.id === trigger.id);
          if (patchedDoc != null) {
            const activeUser = allRes[1] || null;
            const activeUserGroups = allRes[2] || [];

            const trigData: ActionTriggerData<T> = {
              doc: patchedDoc,
              previousValue: trigger.previousValue,
              newValue: patchedDoc,
              additional_info: {
                activeUser,
                activeUserGroups,
              },
            };
            this.emitActionTrigger.emit({
              name: 'Form Data Changed',
              triggerType: 'on_form_data_change',
              triggerData: trigData,
            });
            if (trigger.hasStatusChanged) {
              const statusChangeTrigData = {
                ...trigData,
                previousValue: (trigger.previousValue as any).form_status_ref_id,
                newValue: (patchedDoc as any).form_status_ref_id,
              };
              this.emitActionTrigger.emit({
                name: 'Status Change',
                triggerType: 'on_status_change',
                triggerData: statusChangeTrigData,
              });
            }
          }
        });

        if (res != null && res.length) {
          this._snackbar.open('Documents successfully modified', 'EDIT', {duration: 5000});
        }
      });
  }

  /**
   * Uploads any base64-encoded files still pending in a row and replaces them with storage URLs.
   */
  uploadFilesRow(row: T) {
    const manager = this._dataSource?.manager;
    if (!manager) return;
    const rowId: string = (row as {[key: string]: any})['id'];
    if (this._uploadingFilesRows.has(rowId)) return;
    const rowData = (row as {[key: string]: any})['data'] as {[key: string]: any};
    if (!rowData) return;
    const {filesToUpload, fileFieldKeys} = this._uploadService.getFilesInForm(rowData);
    if (!filesToUpload.length) return;
    this._uploadingFilesRows.add(rowId);
    this._snackbar.open(this._ts.translate('Uploading files...'), this._ts.translate('WAIT'), {
      duration: 5000,
    });
    zip(this._uploadService.uploadFiles(filesToUpload))
      .pipe(take(1))
      .subscribe(results => {
        let newData = {...rowData};
        let allUploaded = true;
        (results as (StorageUploadResponse | null)[]).forEach((result, index) => {
          if (result != null && result.isUploaded) {
            newData = this._uploadService.replaceUploadedFile(newData, result, fileFieldKeys[index]);
          } else {
            allUploaded = false;
          }
        });
        if (allUploaded) {
          delete newData['dino_filestoupload'];
        }
        const patchedDoc = {id: rowId, data: newData} as unknown as Partial<T> & {id: string};
        manager
          .patch(patchedDoc)
          .pipe(take(1))
          .subscribe(res => {
            this._uploadingFilesRows.delete(rowId);
            if (res != null) {
              if (allUploaded) {
                this._snackbar.open(
                  this._ts.translate('Files successfully uploaded'),
                  this._ts.translate('CLOSE'),
                  {duration: 5000},
                );
              } else {
                this._snackbar.open(
                  this._ts.translate('Some files could not be uploaded. Please retry.'),
                  this._ts.translate('CLOSE'),
                  {duration: 10000},
                );
              }
            }
          });
      });
  }

  isUploadingFilesRow(row: T): boolean {
    return this._uploadingFilesRows.has((row as {[key: string]: any})['id']);
  }

  /**
   * Called when a row is edited inline (eg. a boolean toggle)
   */
  editQuickAction(ev: {patchedDoc: Partial<T> & {id: string}; previousDoc: T}) {
    const manager = this._dataSource?.manager;
    if (!ev || !ev.patchedDoc || !ev.previousDoc || !manager) return;
    const collectionName =  manager.collectionName
    manager
      .patch(ev.patchedDoc)
      .pipe(take(1))
      .subscribe(res => {
        if (res != null) {
          this._snackbar.open('Document successfully modified', 'QUICK EDIT', {duration: 5000});
          const trigData: ActionTriggerData<T> = {
            doc: res as unknown as RxDocument<T> | undefined,
            previousValue: ev.previousDoc,
            newValue: res,
          };
          this.emitActionTrigger.emit({
            name: `${collectionName} Changed`,
            triggerType: `on_${collectionName}_change` as TriggerType,
            triggerData: trigData,
          });
        }
      });
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
   * Duplicates the item and loads the Edit component for the new item.
   * @param item The form to be duplicated
   */
  duplicateAction(item: T): void {
    const genItem = item as {[key: string]: any};
    if (
      item == null ||
      genItem['form_schema_ref_id'] == null ||
      this.baseUrl == null ||
      this.baseEditUrl == null ||
      this._udm == null
    ) {
      return;
    }

    this._udm
      .getActiveUserData()
      .pipe(withLatestFrom(this._statuses), take(1))
      .subscribe(data => {
        const userData = data[0];
        const formStatuses = data[1];
        let newItem: {[key: string]: any} = {};
        const defaultFormStatus: string | null =
          formStatuses && formStatuses.length
            ? formStatuses.reduce((prev, curr) =>
                prev.status_level < curr.status_level ? prev : curr,
              ).id
            : null;
        const srcData: {[key: string]: any} = genItem['data'] ?? {};
        const filteredData: {[key: string]: any} = {};
        for (const key of Object.keys(srcData)) {
          if (!this._uploadService.isAnyAjfFileField(srcData[key])) {
            filteredData[key] = srcData[key];
          }
        }
        newItem['data'] = filteredData;
        newItem['form_schema_ref_id'] = genItem['form_schema_ref_id'];
        newItem['user_data_ref_id'] = userData?.id;
        newItem['form_status_ref_id'] = defaultFormStatus;
        newItem['area_ref_id'] = genItem['area_ref_id'];
        newItem['case_ref_id'] = genItem['case_ref_id'];
        newItem['location_ref_id'] = genItem['location_ref_id'];
        newItem['organization_ref_id'] = genItem['organization_ref_id'];
        newItem['project_ref_id'] = genItem['project_ref_id'];
        newItem['created_at'] = format(new Date(), 'yyyy-MM-dd');

        if (this._dataSource != null) {
          this._dataSource.createAction(newItem as T).subscribe(fd => {
            if (fd) {
              const path = [this.baseUrl, genItem['form_schema_ref_id'], this.baseEditUrl];
              path.push(fd.id);
              this._router.navigate(path);
            }
          });
        } else {
          return;
        }
      });
  }

  /**
   * Navigates to the full-page Import Data wizard for the given schema.
   * @param schemaId The schema Id of the documents
   */
  openImportForms(schemaId: string): void {
    if (schemaId == null || this.baseUrl == null) {
      return;
    }
    this._router.navigate([this.baseUrl, schemaId, 'import']);
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
   * Loads the Edit component for the the item in readOnly mode.
   * @param item The item to be viewed
   * @param isDetails If true, the form is a sub-form displayed in a sub list. Defaults to false
   */
  viewlogAction(item: T): void {
    const genItem = item as {[key: string]: any};
    if (item == null || genItem['form_schema_ref_id'] == null) {
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'log-viewer-dialog';
    dialogConfig.data = {
      docId: item.id,
    };
    this.dialog.open(LogViewer, dialogConfig);
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
    if (target != null && !this.bds.isTouch()) {
      this._renderer.addClass(target, 'dino-hover');
    }
    if (this.emitRowDataOnHover) {
      this.emitRowData(row);
    }
  }

  onRowMouseLeave(evt: MouseEvent): void {
    const {target} = evt;
    if (target != null && !this.bds.isTouch()) {
      this._renderer.removeClass(target, 'dino-hover');
    }
  }

  /**
   * Gets all tab keys of a cell tab
   * @param elementData The row element data
   * @param header The column header
   * @returns All the tab keys
   */
  private _getRepeatingSlideCellAllTabs(
    elementData: {[key: string]: any},
    header: ListHeader<T>,
  ): string[] {
    const headerName = header.column.toString();
    const matchingKeys = Object.keys(elementData)
      .filter(key => key.startsWith(`${headerName}__`))
      .sort();
    if (matchingKeys.length) {
      const lastKeyIndex = this._getRepeatingSlideLastTabIndex(
        elementData,
        header.repeatingSlideName,
      );
      for (let idx = 0; idx <= lastKeyIndex; idx++) {
        if (matchingKeys.indexOf(`${headerName}__${idx}`) < 0) {
          const lastMatchingIndex = matchingKeys.reduce(
            (acc, curr) => this._getRepeatingSlideLastTabIndexReducer(acc, curr),
            0,
          );
          idx >= lastMatchingIndex
            ? matchingKeys.push(`${headerName}__${idx}`)
            : matchingKeys.unshift(`${headerName}__${idx}`);
        }
      }
    }

    return matchingKeys.sort();
  }

  /**
   * Reducer function to find the last tab index
   * @param acc
   * @param current
   */
  private _getRepeatingSlideLastTabIndexReducer(acc: number, current: string): number {
    const currentIndex = +(current.split('__')[1] ?? 0);
    return currentIndex > acc ? currentIndex : acc;
  }

  /**
   * Gets the last index of a repeating slide's cell tabs
   * @param elementData The row element data
   * @param repeatingSlideName The repeating slide name. Contains the number of repetitions.
   * @returns The last index
   */
  private _getRepeatingSlideLastTabIndex(
    elementData: {[key: string]: any},
    repeatingSlideName: string | undefined,
  ): number {
    let lastTabIndex = 0;
    if (repeatingSlideName && elementData[repeatingSlideName]) {
      lastTabIndex = elementData[repeatingSlideName] - 1;
    } else {
      lastTabIndex = Object.keys(elementData).reduce(
        (acc, current) => this._getRepeatingSlideLastTabIndexReducer(acc, current),
        0,
      );
    }
    return lastTabIndex;
  }

  /**
   * Exports a Forms List
   * @param ev Type of the event (export directly in csv/xlsx or open dialog)
   */
  private _exportForms(ev: 'XLSX' | 'CSV' | 'dialog'): void {
    if (
      this.dataSource != null &&
      this.dataSource.additionalDataSchema != null &&
      (this.dataSource.additionalDataSchema as Model as FormSchema).schema != null &&
      this.dataSource.dataResults.value != null
    ) {
      const formSchema: FormSchema = this.dataSource.additionalDataSchema as Model as FormSchema;
      const dialogConfig: MatDialogConfig<ExportListData> = new MatDialogConfig<ExportListData>();
      if (ev === 'XLSX') {
        dialogConfig.data = {
          exportFormat: 'xlsx',
          selectAll: true,
          listType: 'forms',
          nodesVisibility: this._nodesVisibility,
          formSchema,
          downloadFile: true,
        };
      } else if (ev === 'CSV') {
        dialogConfig.data = {
          exportFormat: 'csv',
          selectAll: true,
          listType: 'forms',
          nodesVisibility: this._nodesVisibility,
          formSchema,
          downloadFile: true,
        };
      }
      this._openExportDialog(dialogConfig);
    }
  }

  /**
   * Exports a Metrics List
   * @param ev Type of the event (export directly in csv/xlsx or open dialog)
   */
  private _exportMetrics(ev: 'XLSX' | 'CSV' | 'dialog') {
    if (this.dataSource != null && this.dataSource.dataResults.value != null) {
      const formSchema: FormSchema = this._generateExportSchema(
        this.dataSource.modelSchema.title ?? '',
      );
      const dialogConfig: MatDialogConfig<ExportListData> = new MatDialogConfig<ExportListData>();
      if (ev === 'XLSX') {
        dialogConfig.data = {
          exportFormat: 'xlsx',
          selectAll: true,
          listType: 'metrics',
          nodesVisibility: this._nodesVisibility,
          formSchema,
          downloadFile: true,
        };
      } else if (ev === 'CSV') {
        dialogConfig.data = {
          exportFormat: 'csv',
          selectAll: true,
          listType: 'metrics',
          nodesVisibility: this._nodesVisibility,
          formSchema,
          downloadFile: true
        };
      }
      this._openExportDialog(dialogConfig);
    }
  }

  /**
   * Opens an Export List dialog
   * @param schema The Schema of a list item
   * @param dialogConfig The dialog configuration
   */
  private _openExportDialog(dialogConfig: MatDialogConfig): void {
    let dialogRef = this.dialog.open(ExportList, dialogConfig);
    dialogRef.componentInstance.emitExportActionTrigger
      .pipe(take(1))
      .subscribe(evt => this.emitExportActionTrigger.emit(evt));
    dialogRef.componentInstance.data = this.dataSource!.data as any[];
    dialogRef.componentInstance.filteredQueryObs = this.dataSource!.filteredQueryObs;
    dialogRef.componentInstance.allItemsQueryObs = this.dataSource!.allItemsQueryObs;
    dialogRef.componentInstance.filtersCount = this.dataSource!.filtersCount;
  }

  /**
   * Generates an Export-ready schema
   * @param listName The Name of the List Item Model
   * @returns A generated schema for the export list component
   */
  private _generateExportSchema(listName: string): FormSchema {
    const exportSchema: FormSchema = {
      id: '',
      created_at: '',
      updated_at: '',
      name: listName,
      visibility: 0,
      schema: {},
    };
    return exportSchema;
  }

  ngOnDestroy() {
    this._mainUnsubscribe.next();
    this._mainUnsubscribe.complete();
    this.emitRowDataEvt.complete();
    if (this._dataSource != null) {
      this._dataSource.disconnect();
    }
    this._fts.clearModelFilters();
    this._fts.clearCustomFilters();
    this._dialogSub.unsubscribe();
    this._selectionChangedSub.unsubscribe();
    this._dataSourceSub.unsubscribe();
    if (this._widthsStyle != null) {
      this._renderer.removeChild(document.head, this._widthsStyle);
      this._widthsStyle = null;
    }
  }
}
