export declare class SearchFiltersChips implements OnInit {
    chipsFilters: Observable<FilterItem[]>;
    chipsType: FilterListType;
    excludeFilter: EventEmitter<FilterItem>;
    constructor(_fts: FiltersService);
    ngOnInit(): void;
    removeFilterItem(filterItem: FilterItem): void;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<SearchFiltersChips, "dewco-search-filters-chips", never, { "chipsType": "chipsType"; }, { "excludeFilter": "excludeFilter"; }, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<SearchFiltersChips, never>;
}

export declare class SearchFiltersChipsModule {
    static ɵinj: i0.ɵɵInjectorDef<SearchFiltersChipsModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<SearchFiltersChipsModule, [typeof i1.SearchFiltersChips], [typeof i2.BrowserAnimationsModule, typeof i3.CommonModule, typeof i4.MatButtonModule, typeof i5.MatChipsModule, typeof i6.MatInputModule, typeof i7.RouterModule], [typeof i1.SearchFiltersChips]>;
}
