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
  static ɵcmp: i0.ɵɵComponentDeclaration<
    SearchFiltersPresetManager,
    'dewco-search-filters-preset-manager',
    never,
    {},
    {},
    never,
    never
  >;
  static ɵfac: i0.ɵɵFactoryDeclaration<SearchFiltersPresetManager, never>;
}

export declare class SearchFiltersPresetManagerModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<SearchFiltersPresetManagerModule, never>;
  static ɵinj: i0.ɵɵInjectorDeclaration<SearchFiltersPresetManagerModule>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    SearchFiltersPresetManagerModule,
    [typeof i1.SearchFiltersPresetManager],
    [
      typeof i2.AjfTranslocoModule,
      typeof i3.CommonModule,
      typeof i4.FormsModule,
      typeof i5.MatAutocompleteModule,
      typeof i6.MatButtonModule,
      typeof i7.MatFormFieldModule,
      typeof i8.MatIconModule,
      typeof i9.MatInputModule,
      typeof i10.MatSelectModule,
      typeof i4.ReactiveFormsModule,
      typeof i11.RouterModule,
    ],
    [typeof i1.SearchFiltersPresetManager]
  >;
}
