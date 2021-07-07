export declare class Collect implements AfterViewInit, OnDestroy {
    readonly breakpointObserver: BreakpointObserverService;
    get columnsLarge(): number;
    set columnsLarge(num: number);
    get columnsSmall(): number;
    set columnsSmall(num: number);
    set isFormsCollect(res: boolean);
    get items(): BehaviorSubject<CollectItem[]>;
    set menuItems(menuItems: CollectItem[]);
    constructor(breakpointObserver: BreakpointObserverService, _fs: FormSchemaManager);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵcmp: i0.ɵɵComponentDeclaration<Collect, "dewco-collect", never, { "menuItems": "menuItems"; "columnsSmall": "columnsSmall"; "columnsLarge": "columnsLarge"; "isFormsCollect": "isFormsCollect"; }, {}, never, never>;
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
    static ɵmod: i0.ɵɵNgModuleDeclaration<CollectModule, [typeof i1.Collect], [typeof i2.BreakpointObserverModule, typeof i3.CommonModule, typeof i4.FormsModule, typeof i5.RouterModule, typeof i6.MatGridListModule, typeof i7.MatIconModule], [typeof i1.Collect]>;
}
