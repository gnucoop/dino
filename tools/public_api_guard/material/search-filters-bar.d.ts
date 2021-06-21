export declare class IsFalseOrNullPipe implements PipeTransform {
    transform(value: boolean | null): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<IsFalseOrNullPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<IsFalseOrNullPipe, "isFalseOrNull">;
}

export declare class SearchFiltersBar extends SearchFiltersComponent implements OnInit, OnDestroy {
    protected _fts: FiltersService;
    readonly breakpointObserver: BreakpointObserverService;
    dialog: MatDialog;
    set filtersDialogWidth(w: number);
    get presetManager(): boolean;
    set presetManager(state: boolean);
    constructor(_fts: FiltersService, dialog: MatDialog, _cdr: ChangeDetectorRef, breakpointObserver: BreakpointObserverService);
    ngOnDestroy(): void;
    ngOnInit(): void;
    openDialog(): void;
    removeFilter(filterItem: FilterItem, listType: FilterListType[] | FilterListType): void;
    static ɵcmp: i0.ɵɵComponentDeclaration<SearchFiltersBar, "dewco-search-filters-bar", never, { "presetManager": "presetManager"; "filtersDialogWidth": "filtersDialogWidth"; }, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchFiltersBar, never>;
}

export declare class SearchFiltersBarModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchFiltersBarModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<SearchFiltersBarModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<SearchFiltersBarModule, [typeof i1.IsFalseOrNullPipe, typeof i2.SearchFiltersBar], [typeof i3.BreakpointObserverModule, typeof i4.CommonModule, typeof i5.MatButtonModule, typeof i6.MatCheckboxModule, typeof i7.MatDatepickerModule, typeof i8.MatDialogModule, typeof i9.MatExpansionModule, typeof i10.MatFormFieldModule, typeof i11.MatIconModule, typeof i12.MatInputModule, typeof i13.MatListModule, typeof i14.MatNativeDateModule, typeof i15.MatPaginatorModule, typeof i16.MatSortModule, typeof i17.MatTableModule, typeof i18.ReactiveFormsModule, typeof i19.RouterModule, typeof i20.SearchFiltersChipsModule, typeof i21.SearchFiltersDialogModule, typeof i22.SearchFiltersPresetManagerModule], [typeof i2.SearchFiltersBar]>;
}
