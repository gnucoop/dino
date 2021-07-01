export declare class SearchFiltersPresetManager implements OnDestroy, OnInit {
    canLoadPreset: Observable<boolean>;
    filteredOptions: Observable<string[]>;
    presetControl: FormControl;
    presetData: Observable<any>;
    presetName: Observable<string>;
    constructor(_route: ActivatedRoute, _fs: FiltersService);
    loadPreset(): void;
    ngOnDestroy(): void;
    ngOnInit(): void;
    savePreset(): void;
    static ɵcmp: i0.ɵɵComponentDeclaration<SearchFiltersPresetManager, "dewco-search-filters-preset-manager", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchFiltersPresetManager, never>;
}

export declare class SearchFiltersPresetManagerModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchFiltersPresetManagerModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<SearchFiltersPresetManagerModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<SearchFiltersPresetManagerModule, [typeof i1.SearchFiltersPresetManager], [typeof i2.CommonModule, typeof i3.FormsModule, typeof i4.MatAutocompleteModule, typeof i5.MatButtonModule, typeof i6.MatFormFieldModule, typeof i7.MatIconModule, typeof i8.MatInputModule, typeof i9.MatSelectModule, typeof i3.ReactiveFormsModule, typeof i10.RouterModule], [typeof i1.SearchFiltersPresetManager]>;
}
