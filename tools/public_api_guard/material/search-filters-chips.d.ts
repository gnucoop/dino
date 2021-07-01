export declare class SearchFiltersChips implements OnInit {
    chipsFilters: Observable<FilterItem[]>;
    chipsType: FilterListType;
    readonly excludeFilter: EventEmitter<FilterItem>;
    constructor(_fts: FiltersService);
    ngOnInit(): void;
    removeFilterItem(filterItem: FilterItem): void;
    static ɵcmp: i0.ɵɵComponentDeclaration<SearchFiltersChips, "dewco-search-filters-chips", never, { "chipsType": "chipsType"; }, { "excludeFilter": "excludeFilter"; }, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchFiltersChips, never>;
}

export declare class SearchFiltersChipsModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchFiltersChipsModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<SearchFiltersChipsModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<SearchFiltersChipsModule, [typeof i1.SearchFiltersChips], [typeof i2.CommonModule, typeof i3.MatButtonModule, typeof i4.MatChipsModule, typeof i5.MatIconModule, typeof i6.MatInputModule, typeof i7.RouterModule], [typeof i1.SearchFiltersChips]>;
}
