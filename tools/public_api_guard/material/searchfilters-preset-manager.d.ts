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
    static ɵcmp: i0.ɵɵComponentDefWithMeta<SearchFiltersPresetManager, "dewco-searchfilters-preset-manager", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<SearchFiltersPresetManager, never>;
}

export declare class SearchFiltersPresetManagerModule {
    static ɵinj: i0.ɵɵInjectorDef<SearchFiltersPresetManagerModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<SearchFiltersPresetManagerModule, [typeof i1.SearchFiltersPresetManager], [typeof i2.BrowserAnimationsModule, typeof i3.CommonModule, typeof i4.FormsModule, typeof i5.MatAutocompleteModule, typeof i6.MatButtonModule, typeof i7.MatFormFieldModule, typeof i8.MatInputModule, typeof i9.MatSelectModule, typeof i4.ReactiveFormsModule, typeof i10.RouterModule], [typeof i1.SearchFiltersPresetManager]>;
}
