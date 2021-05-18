export declare class Collect implements OnInit {
    readonly breakpointObserver: BreakpointObserverService;
    get columnsLarge(): number;
    set columnsLarge(num: number);
    get columnsSmall(): number;
    set columnsSmall(num: number);
    get isFormsCollect(): boolean;
    set isFormsCollect(res: boolean);
    get items(): BehaviorSubject<CollectItem[]>;
    set setCustomItems(customItems: CollectItem[]);
    constructor(breakpointObserver: BreakpointObserverService, _fs: FormSchemaManager);
    ngOnInit(): void;
    static ɵcmp: i0.ɵɵComponentDeclaration<Collect, "dewco-collect", never, { "setCustomItems": "setCustomItems"; "columnsSmall": "columnsSmall"; "columnsLarge": "columnsLarge"; "isFormsCollect": "isFormsCollect"; }, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<Collect, never>;
}

export interface CollectItem {
    icon: string;
    label: string;
    name: string;
    schemaId?: string;
    url?: string;
}

export declare class CollectModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<CollectModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CollectModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CollectModule, [typeof i1.Collect], [typeof i2.BreakpointObserverModule, typeof i3.CommonModule, typeof i4.FormsModule, typeof i5.RouterModule, typeof i6.MatGridListModule], [typeof i1.Collect]>;
}
