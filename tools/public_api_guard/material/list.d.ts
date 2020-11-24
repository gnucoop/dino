export declare class AdminUserInteractionsService extends CoreAdminUserInteractionsService {
    constructor();
    askConfirm(_action: string): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDef<AdminUserInteractionsService, never>;
    static ɵprov: i0.ɵɵInjectableDef<AdminUserInteractionsService>;
}

export declare class ListModule {
    static ɵinj: i0.ɵɵInjectorDef<ListModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<ListModule, [typeof i1.ListCell, typeof i2.SelectionList], [typeof i3.BrowserAnimationsModule, typeof i4.CommonModule, typeof i5.ListModule, typeof i6.MatButtonModule, typeof i7.MatCheckboxModule, typeof i8.MatDialogModule, typeof i9.MatFormFieldModule, typeof i10.MatIconModule, typeof i11.MatInputModule, typeof i12.MatListModule, typeof i13.MatPaginatorModule, typeof i14.MatSortModule, typeof i15.MatTableModule, typeof i16.MatToolbarModule, typeof i17.RouterModule], [typeof i10.MatIconModule, typeof i2.SelectionList]>;
}

export declare class SelectionList<T extends Model = Model, DM extends DataModelManager<T> = DataModelManager<T>> extends List<T> implements AfterContentInit, AfterViewInit, OnInit, OnDestroy {
    cellTemplates: QueryList<ListCell>;
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
    static ɵcmp: i0.ɵɵComponentDefWithMeta<SelectionList<any, any>, "dewco-list", never, { "dataSource": "dataSource"; "customFilters": "customFilters"; }, {}, ["filtersComponent", "cellTemplates"], ["[filters]"]>;
    static ɵfac: i0.ɵɵFactoryDef<SelectionList<any, any>, never>;
}
