export declare class DewcoMatSlideToggle implements AfterViewInit, OnDestroy {
    change: EventEmitter<MatSlideToggleChange>;
    checked: boolean;
    disabled: boolean;
    labelOff: string | null;
    labelOn: string | null;
    matSlideToggle: MatSlideToggle;
    name: string | null;
    required: boolean;
    constructor(_cdr: ChangeDetectorRef);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    toggle(): void;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<DewcoMatSlideToggle, "dewco-mat-slide-toggle", never, { "labelOff": "labelOff"; "labelOn": "labelOn"; "disabled": "disabled"; "name": "name"; "required": "required"; "checked": "checked"; }, { "change": "change"; }, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<DewcoMatSlideToggle, never>;
}

export declare class DewcoMatSlideToggleModule {
    static ɵinj: i0.ɵɵInjectorDef<DewcoMatSlideToggleModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<DewcoMatSlideToggleModule, [typeof i1.DewcoMatSlideToggle], [typeof i2.CommonModule, typeof i3.MatSlideToggleModule], [typeof i1.DewcoMatSlideToggle]>;
}
