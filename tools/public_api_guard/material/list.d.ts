export declare class AdminUserInteractionsService extends CoreAdminUserInteractionsService {
    constructor(_dialog?: MatDialog | undefined);
    askConfirm(action: string): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDef<AdminUserInteractionsService, never>;
    static ɵprov: i0.ɵɵInjectableDef<AdminUserInteractionsService>;
}

export declare class ListModule {
    static ɵinj: i0.ɵɵInjectorDef<ListModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<ListModule, [typeof i1.SelectionList], [typeof i2.BrowserAnimationsModule, typeof i3.CommonModule, typeof i4.MatButtonModule, typeof i5.MatCheckboxModule, typeof i6.MatDialogModule, typeof i7.MatFormFieldModule, typeof i8.MatIconModule, typeof i9.MatInputModule, typeof i10.MatListModule, typeof i11.MatPaginatorModule, typeof i12.MatSortModule, typeof i13.MatTableModule, typeof i14.MatToolbarModule, typeof i15.RouterModule], [typeof i8.MatIconModule, typeof i1.SelectionList]>;
}

export declare class SelectionList<T extends Model = Model, DM extends DataModelManager<T> = DataModelManager<T>> extends List<T> implements AfterContentInit, AfterViewInit, OnInit, OnDestroy {
    cellTemplates: QueryList<ListCellDirective>;
    get cellTemplatesMap(): {
        [column: string]: TemplateRef<any>;
    };
    set customFilters(filters: FilterGroup[]);
    get dataSource(): ListDataSource<T, DM>;
    set dataSource(dataSource: ListDataSource<T, DM>);
    filtersComponent: SearchFiltersComponent;
    paginator: MatPaginator;
    readonly selection: SelectionModel<T>;
    sorting: MatSort;
    constructor(cdr: ChangeDetectorRef, aui: AdminUserInteractionsService, _fts: FiltersService);
    checkboxLabel(row?: T): string;
    clearSelection(): void;
    deleteAction(items: T[]): T[];
    deleteItems(row: T | T[]): void;
    getDisplayedItems(): T[];
    getItems(): T[];
    getSelection(): T[];
    isAllSelected(): boolean;
    masterToggle(): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnInit(): void;
    selectAll(): void;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<SelectionList<any, any>, "dewco-mat-list", never, { "dataSource": "dataSource"; "customFilters": "customFilters"; }, {}, ["filtersComponent", "cellTemplates"], ["[filters]"]>;
    static ɵfac: i0.ɵɵFactoryDef<SelectionList<any, any>, never>;
}
