export declare class DewcoMatTabGroup implements AfterViewInit {
    matTabGroup: MatTabGroup;
    tabs: QueryList<MatTab>;
    tabsFromNgContent: QueryList<MatTab>;
    constructor(_cdr: ChangeDetectorRef);
    ngAfterViewInit(): void;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<DewcoMatTabGroup, "dewco-mat-tab-group", never, {}, {}, ["tabsFromNgContent"], ["*"]>;
    static ɵfac: i0.ɵɵFactoryDef<DewcoMatTabGroup, never>;
}

export declare class DewcoMatTabGroupModule {
    static ɵinj: i0.ɵɵInjectorDef<DewcoMatTabGroupModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<DewcoMatTabGroupModule, [typeof i1.DewcoMatTabGroup], [typeof i2.CommonModule, typeof i3.MatTabsModule], [typeof i1.DewcoMatTabGroup, typeof i3.MatTabsModule]>;
}
