export declare class SearchFiltersDialog implements OnInit, OnDestroy, AfterViewInit {
    data: any;
    dialogRef: MatDialogRef<SearchFiltersDialog>;
    fts: FiltersService;
    widgetData: Observable<WidgetData[]>;
    widgets: QueryList<SearchFiltersWidget>;
    constructor(dialogRef: MatDialogRef<SearchFiltersDialog>, data: any, fts: FiltersService);
    addFilter(filterItem: FilterItem, listType: FilterListType): void;
    closeDialog(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnInit(): void;
    removeFilter(filterItem: FilterItem, listType: FilterListType[] | FilterListType): void;
    search(): void;
    setCurrentGroupId(id: number): void;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<SearchFiltersDialog, "dewco-search-filters-dialog", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<SearchFiltersDialog, never>;
}

export declare class SearchFiltersDialogModule {
    static ɵinj: i0.ɵɵInjectorDef<SearchFiltersDialogModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<SearchFiltersDialogModule, [typeof i1.SearchFiltersDialog], [typeof i2.BrowserAnimationsModule, typeof i3.CommonModule, typeof i4.FlexLayoutModule, typeof i5.MatButtonModule, typeof i6.MatCheckboxModule, typeof i7.MatDialogModule, typeof i8.MatFormFieldModule, typeof i9.MatIconModule, typeof i10.MatInputModule, typeof i11.MatTabsModule, typeof i12.RouterModule, typeof i13.SearchFiltersChipsModule, typeof i14.SearchFiltersWidgetModule], [typeof i1.SearchFiltersDialog]>;
}
