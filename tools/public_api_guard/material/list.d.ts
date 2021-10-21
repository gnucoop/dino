export declare class AdminUserInteractionsService extends CoreAdminUserInteractionsService {
  constructor(_dialog: MatDialog);
  askConfirm(action: ListAction): Observable<boolean>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AdminUserInteractionsService, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<AdminUserInteractionsService>;
}

export interface ListContext<T extends Model = Model> {
  baseEditUrl?: string;
  dataSource?: ListDataSource<T>;
  displayedColumns?: BehaviorSubject<string[]>;
  expandable?: string;
  headers: BehaviorSubject<ListHeader<T>[]>;
  isDetails?: boolean;
  listRowActions?: ListAction[];
  showCheckBox?: boolean;
  showColumnsSelector?: boolean;
  showPaginator?: boolean;
}

export declare class ListDataSource<
  T extends Model = Model,
  AD extends Model = Model,
> extends MatTableDataSource<T> {
  set additionalDataSchema(dataSchema: AD);
  get dataResults(): BehaviorSubject<T[]>;
  get getFiltersComponent(): SearchFiltersComponent | null;
  get getPaginator(): MatPaginator | null;
  get getSort(): MatSort | null;
  get modelSchema(): RxJsonSchema;
  refreshListData: BehaviorSubject<CollectionChangedEvent>;
  set setFiltersComponent(component: SearchFiltersComponent | null);
  set setPaginator(paginator: MatPaginator | null);
  set setSort(sort: MatSort | null);
  constructor(
    _dataModelManager: DataModelManager<T>,
    _fs: FiltersService,
    _additionalDataManager?: DataModelManager<AD> | undefined,
    _isFormDataList?: boolean,
  );
  deleteAction(items: T[], isDetails?: boolean): T[];
  disconnect(): void;
  getDetailsData(row: T, querySelector?: {}): Observable<T[]>;
  getDisplayedItems(): T[];
  getQueryResults(query: DataQueryOptions, detailsQuery?: DataQueryOptions): void;
  queryDM(queryString: string, additionalDataSchema?: AD | null): DataQueryOptions;
}

export declare class ListModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<ListModule, never>;
  static ɵinj: i0.ɵɵInjectorDeclaration<ListModule>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    ListModule,
    [
      typeof i1.ColumnsSelector,
      typeof i2.ConfirmationDialog,
      typeof i3.ListCell,
      typeof i4.SelectionList,
    ],
    [
      typeof i5.AjfFormsModule,
      typeof i6.AjfTranslocoModule,
      typeof i7.BreakpointObserverModule,
      typeof i8.CommonModule,
      typeof i9.ListModule,
      typeof i10.MatButtonModule,
      typeof i11.MatCheckboxModule,
      typeof i12.MatDialogModule,
      typeof i13.MatFormFieldModule,
      typeof i14.MatIconModule,
      typeof i15.MatInputModule,
      typeof i16.MatListModule,
      typeof i17.MatPaginatorModule,
      typeof i18.MatSlideToggleModule,
      typeof i19.MatSortModule,
      typeof i20.MatTableModule,
      typeof i21.MatToolbarModule,
      typeof i22.RouterModule,
    ],
    [typeof i14.MatIconModule, typeof i4.SelectionList]
  >;
}

export declare class SelectionList<T extends Model = Model>
  extends List<T>
  implements AfterContentInit, AfterViewInit, OnInit, OnDestroy
{
  set additionalBasicFilters(filterNames: string[]);
  readonly breakpointObserver: BreakpointObserverService;
  cellTemplates: QueryList<ListCell>;
  get cellTemplatesMap(): {
    [column: string]: TemplateRef<any>;
  };
  columnsButtonRef: ElementRef;
  set customFilters(filters: FilterGroup[]);
  get dataSource(): ListDataSource<T>;
  set dataSource(dataSource: ListDataSource<T>);
  detailsListContext: ListContext<any>;
  readonly expandAllRows: BehaviorSubject<boolean>;
  get expandable(): boolean;
  set expandable(exp: boolean);
  readonly expandedRows: T[];
  expandedRowsData: {
    [key: string]: MatTableDataSource<T>;
  };
  filtersComponent: SearchFiltersComponent;
  get listRowActions(): ListAction[];
  set listRowActions(actions: ListAction[]);
  mainListContext: ListContext<T>;
  get onClickRowActions(): ActionType[];
  set onClickRowActions(actionType: ActionType[]);
  set paginator(mp: MatPaginator);
  readonly selection: SelectionModel<T>;
  get showColumnsSelector(): boolean;
  set showColumnsSelector(exp: boolean);
  get showPaginator(): boolean;
  set showPaginator(exp: boolean);
  set sorting(ms: MatSort);
  constructor(
    cdr: ChangeDetectorRef,
    aui: AdminUserInteractionsService,
    _dialog: MatDialog,
    _fts: FiltersService,
    breakpointObserver: BreakpointObserverService,
    _router: Router,
  );
  actionOnItems(row: T | T[], action: ListAction, isDetails?: boolean): void;
  checkboxLabel(row?: T): string;
  clearSelection(): void;
  createAction(schemaId: string, isFormData?: boolean): void;
  deleteAction(items: T | T[], isDetails?: boolean): T[];
  detailsKeywordsFilter(event: Event, dataSource: MatTableDataSource<T>): void;
  editAction(item: T, isDetails?: boolean): void;
  expansionRowsUpdate(row: T, forceExpand?: boolean): void;
  getDetails(row: T): Observable<T[]>;
  getDisplayedItems(): T[];
  getItems(): T[];
  getSelection(): T[];
  isAllSelected(): boolean;
  isRowExpanded(row: T): boolean;
  masterToggle(): void;
  ngAfterContentInit(): void;
  ngAfterViewInit(): void;
  ngOnDestroy(): void;
  ngOnInit(): void;
  openColumnsSelectorDialog(): void;
  rowToggle(row: T): void;
  selectAll(): void;
  viewAction(item: T, isDetails?: boolean): void;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    SelectionList<any>,
    'dewco-list',
    never,
    {
      'detailsListContext': 'detailsListContext';
      'customFilters': 'customFilters';
      'additionalBasicFilters': 'additionalBasicFilters';
      'expandable': 'expandable';
      'showPaginator': 'showPaginator';
      'showColumnsSelector': 'showColumnsSelector';
      'listRowActions': 'listRowActions';
      'onClickRowActions': 'onClickRowActions';
      'dataSource': 'dataSource';
    },
    {},
    ['filtersComponent', 'cellTemplates'],
    ['[filters]']
  >;
  static ɵfac: i0.ɵɵFactoryDeclaration<SelectionList<any>, never>;
}
