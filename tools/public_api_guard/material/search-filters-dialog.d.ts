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
    static ɵmod: i0.ɵɵNgModuleDeclaration<SearchFiltersDialogModule, [typeof i1.SearchFiltersDialog], [typeof i2.CommonModule, typeof i3.MatButtonModule, typeof i4.MatCheckboxModule, typeof i5.MatDialogModule, typeof i6.MatFormFieldModule, typeof i7.MatIconModule, typeof i8.MatInputModule, typeof i9.MatTabsModule, typeof i10.RouterModule, typeof i11.SearchFiltersChipsModule, typeof i12.SearchFiltersWidgetModule], [typeof i1.SearchFiltersDialog]>;
}
