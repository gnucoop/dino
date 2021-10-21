export declare class Collect {
  readonly breakpointObserver: BreakpointObserverService;
  get columnsLarge(): number;
  set columnsLarge(num: number);
  get columnsSmall(): number;
  set columnsSmall(num: number);
  set isFormsCollect(res: boolean);
  readonly items: Observable<CollectItem[]>;
  set menuItems(menuItems: CollectItem[]);
  constructor(breakpointObserver: BreakpointObserverService, _fs: FormSchemaManager);
  static ɵcmp: i0.ɵɵComponentDeclaration<
    Collect,
    'dewco-collect',
    never,
    {
      'menuItems': 'menuItems';
      'columnsSmall': 'columnsSmall';
      'columnsLarge': 'columnsLarge';
      'isFormsCollect': 'isFormsCollect';
    },
    {},
    never,
    never
  >;
  static ɵfac: i0.ɵɵFactoryDeclaration<Collect, never>;
}

export interface CollectItem {
  icon?: string;
  label?: string;
  name: string;
  schemaId?: string;
  url?: string;
}

export declare class CollectModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<CollectModule, never>;
  static ɵinj: i0.ɵɵInjectorDeclaration<CollectModule>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    CollectModule,
    [typeof i1.Collect],
    [
      typeof i2.AjfTranslocoModule,
      typeof i3.BreakpointObserverModule,
      typeof i4.CommonModule,
      typeof i5.FormsModule,
      typeof i6.RouterModule,
      typeof i7.MatGridListModule,
      typeof i8.MatIconModule,
    ],
    [typeof i1.Collect]
  >;
}
