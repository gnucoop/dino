export declare class FloatingButton {
    readonly buttonIcon: string;
    readonly buttonUrl: string;
    readonly tooltipMessage: string;
    constructor();
    static ɵcmp: i0.ɵɵComponentDeclaration<FloatingButton, "dewco-floating-button", never, { "tooltipMessage": "tooltipMessage"; "buttonUrl": "buttonUrl"; "buttonIcon": "buttonIcon"; }, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FloatingButton, never>;
}

export declare class FloatingButtonModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<FloatingButtonModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<FloatingButtonModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<FloatingButtonModule, [typeof i1.FloatingButton], [typeof i2.CommonModule, typeof i3.MatButtonModule, typeof i4.MatIconModule, typeof i5.MatTooltipModule, typeof i6.RouterModule], [typeof i1.FloatingButton]>;
}
