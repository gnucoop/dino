export declare class SearchFiltersBar extends SearchFiltersComponent implements OnInit, OnDestroy {
    protected _fts: FiltersService;
    dialog: MatDialog;
    constructor(_fts: FiltersService, dialog: MatDialog);
    ngOnDestroy(): void;
    ngOnInit(): void;
    openDialog(): void;
    removeFilter(filterItem: FilterItem, listType: filterListType[] | filterListType): void;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<SearchFiltersBar, "dewco-mat-searchfilters-bar", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<SearchFiltersBar, never>;
}

export declare class SearchFiltersBarModule {
    static ɵinj: i0.ɵɵInjectorDef<SearchFiltersBarModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<SearchFiltersBarModule, [typeof i1.SearchFiltersBar], [typeof i2.BrowserAnimationsModule, typeof i3.CommonModule, typeof i4.MatButtonModule, typeof i5.MatCheckboxModule, typeof i6.MatDatepickerModule, typeof i7.MatDialogModule, typeof i8.MatFormFieldModule, typeof i9.MatIconModule, typeof i10.MatInputModule, typeof i11.MatListModule, typeof i12.MatNativeDateModule, typeof i13.MatPaginatorModule, typeof i14.MatSortModule, typeof i15.MatTableModule, typeof i16.ReactiveFormsModule, typeof i17.RouterModule, typeof i18.SearchFiltersChipsModule, typeof i19.SearchFiltersPresetManagerModule], [typeof i1.SearchFiltersBar]>;
}
