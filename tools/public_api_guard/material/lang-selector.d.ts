export declare class LangSelector {
  currentLang: string;
  readonly langsShowed$: Observable<string[]>;
  constructor(_ts: TranslocoService);
  setLang(lang: string): void;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    LangSelector,
    'dewco-lang-selector',
    never,
    {},
    {},
    never,
    never
  >;
  static ɵfac: i0.ɵɵFactoryDeclaration<LangSelector, never>;
}

export declare class LangSelectorModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<LangSelectorModule, never>;
  static ɵinj: i0.ɵɵInjectorDeclaration<LangSelectorModule>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    LangSelectorModule,
    [typeof i1.LangSelector],
    [
      typeof i2.AjfTranslocoModule,
      typeof i3.CommonModule,
      typeof i4.MatFormFieldModule,
      typeof i5.MatSelectModule,
      typeof i6.ReactiveFormsModule,
    ],
    [typeof i1.LangSelector]
  >;
}
