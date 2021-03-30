export declare class SearchFiltersDialog implements OnInit, OnDestroy, AfterViewInit {
    data: any;
    dialogRef: MatDialogRef<SearchFiltersDialog>;
    filterItemsData: Observable<FilterItem[]>;
    fts: FiltersService;
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
    static ɵcmp: i0.ɵɵComponentDeclaration<SearchFiltersDialog, "dewco-search-filters-dialog", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchFiltersDialog, never>;
}

export declare class SearchFiltersDialogModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchFiltersDialogModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<SearchFiltersDialogModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<SearchFiltersDialogModule, [typeof i1.SearchFiltersDialog], [typeof i2.BrowserAnimationsModule, typeof i3.CommonModule, typeof i4.MatButtonModule, typeof i5.MatCheckboxModule, typeof i6.MatDialogModule, typeof i7.MatFormFieldModule, typeof i8.MatIconModule, typeof i9.MatInputModule, typeof i10.MatTabsModule, typeof i11.RouterModule, typeof i12.SearchFiltersChipsModule, typeof i13.SearchFiltersWidgetModule], [typeof i1.SearchFiltersDialog]>;
}
