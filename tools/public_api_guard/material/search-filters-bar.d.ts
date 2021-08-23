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
    static ɵmod: i0.ɵɵNgModuleDeclaration<SearchFiltersBarModule, [typeof i1.IsFalseOrNullPipe, typeof i2.SearchFiltersBar], [typeof i3.AjfTranslocoModule, typeof i4.BreakpointObserverModule, typeof i5.CommonModule, typeof i6.MatButtonModule, typeof i7.MatCheckboxModule, typeof i8.MatDatepickerModule, typeof i9.MatDialogModule, typeof i10.MatExpansionModule, typeof i11.MatFormFieldModule, typeof i12.MatIconModule, typeof i13.MatInputModule, typeof i14.MatListModule, typeof i15.MatNativeDateModule, typeof i16.MatPaginatorModule, typeof i17.MatSortModule, typeof i18.MatTableModule, typeof i19.ReactiveFormsModule, typeof i20.RouterModule, typeof i21.SearchFiltersChipsModule, typeof i22.SearchFiltersDialogModule, typeof i23.SearchFiltersPresetManagerModule], [typeof i2.SearchFiltersBar]>;
}
