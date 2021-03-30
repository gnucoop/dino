export declare class AdminUserInteractionsService extends CoreAdminUserInteractionsService {
    constructor(_dialog: MatDialog);
    askConfirm(action: ListAction): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AdminUserInteractionsService, never>;
    static ɵprov: i0.ɵɵInjectableDef<AdminUserInteractionsService>;
}

export declare class ListDataSource<T extends Model = Model, AD extends Model = Model> extends MatTableDataSource<T> {
    set additionalDataSchema(dataSchema: AD);
    get dataResults(): BehaviorSubject<T[]>;
    get getFiltersComponent(): SearchFiltersComponent | null;
    get getPaginator(): MatPaginator | null;
    get getSort(): MatSort | null;
    get modelSchema(): RxJsonSchema;
    refreshListData: BehaviorSubject<boolean>;
    set setFiltersComponent(component: SearchFiltersComponent | null);
    set setPaginator(paginator: MatPaginator | null);
    set setSort(sort: MatSort | null);
    constructor(_dataModelManager: DataModelManager<T>, _fs: FiltersService, _additionalDataManager?: DataModelManager<AD> | undefined);
    deleteAction(items: T[]): T[];
    disconnect(): void;
    getDisplayedItems(): T[];
    getQueryResults(query: DataQueryOptions): void;
    queryDM(queryString: string): DataQueryOptions;
}

export declare class ListModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ListModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ListModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ListModule, [typeof i1.ColumnsSelector, typeof i2.ConfirmationDialog, typeof i3.ListCell, typeof i4.SelectionList], [typeof i5.AjfFormsModule, typeof i6.BrowserAnimationsModule, typeof i7.CommonModule, typeof i8.ListModule, typeof i9.MatButtonModule, typeof i10.MatCheckboxModule, typeof i11.MatDialogModule, typeof i12.MatFormFieldModule, typeof i13.MatIconModule, typeof i14.MatInputModule, typeof i15.MatListModule, typeof i16.MatPaginatorModule, typeof i17.MatSlideToggleModule, typeof i18.MatSortModule, typeof i19.MatTableModule, typeof i20.MatToolbarModule, typeof i21.RouterModule], [typeof i13.MatIconModule, typeof i4.SelectionList]>;
}

export declare class SelectionList<T extends Model = Model> extends List<T> implements AfterContentInit, AfterViewInit, OnInit, OnDestroy {
    set additionalBasicFilters(filterNames: string[]);
    cellTemplates: QueryList<ListCell>;
    get cellTemplatesMap(): {
        [column: string]: TemplateRef<any>;
    };
    columnsButtonRef: ElementRef;
    set customFilters(filters: FilterGroup[]);
    get dataSource(): ListDataSource<T>;
    set dataSource(dataSource: ListDataSource<T>);
    dialog: MatDialog;
    filtersComponent: SearchFiltersComponent;
    paginator: MatPaginator;
    readonly selection: SelectionModel<T>;
    sorting: MatSort;
    constructor(cdr: ChangeDetectorRef, aui: AdminUserInteractionsService, dialog: MatDialog, _fts: FiltersService);
    actionOnItems(row: T | T[], action: ListAction): void;
    checkboxLabel(row?: T): string;
    clearSelection(): void;
    deleteAction(items: T[]): T[];
    getDisplayedItems(): T[];
    getItems(): T[];
    getSelection(): T[];
    isAllSelected(): boolean;
    masterToggle(): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnInit(): void;
    openColumnsSelectorDialog(): void;
    selectAll(): void;
    static ɵcmp: i0.ɵɵComponentDeclaration<SelectionList<any>, "dewco-list", never, { "customFilters": "customFilters"; "additionalBasicFilters": "additionalBasicFilters"; "dataSource": "dataSource"; }, {}, ["filtersComponent", "cellTemplates"], ["[filters]"]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectionList<any>, never>;
}
