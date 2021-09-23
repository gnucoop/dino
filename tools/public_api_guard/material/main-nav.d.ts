export declare class MainNav implements AfterViewInit, OnDestroy {
    get adminSections(): Section[];
    set adminSections(sec: Section[]);
    readonly authService: AuthService;
    readonly breakpointObserver: BreakpointObserverService;
    extendedSidenav: BehaviorSubject<boolean>;
    isLoading: BehaviorSubject<boolean>;
    get logoImagePath(): string;
    set logoImagePath(url: string);
    readonly metricsService: MetricsService;
    get sections(): Section[];
    set sections(sec: Section[]);
    set setShowNavLabels(opened: boolean);
    readonly showNav: Observable<boolean>;
    get showNavLabels(): BehaviorSubject<boolean>;
    sidenav: MatSidenav;
    readonly snackbar: MatSnackBar;
    constructor(breakpointObserver: BreakpointObserverService, metricsService: MetricsService, authService: AuthService, snackbar: MatSnackBar, _router: Router, _cdr: ChangeDetectorRef);
    logout(): void;
    menuClick(): void;
    menuToggle(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onRouterOutletLoading(elementRef: any): void;
    static ɵcmp: i0.ɵɵComponentDeclaration<MainNav, "dewco-main-nav", never, { "sections": "sections"; "adminSections": "adminSections"; "setShowNavLabels": "setShowNavLabels"; "logoImagePath": "logoImagePath"; }, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MainNav, never>;
}

export declare class MainNavModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MainNavModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MainNavModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MainNavModule, [typeof i1.MainNav], [typeof i2.AjfTranslocoModule, typeof i3.LangSelectorModule, typeof i4.AuthModule, typeof i5.BreakpointObserverModule, typeof i6.CommonModule, typeof i7.MatButtonModule, typeof i8.MatIconModule, typeof i9.MatListModule, typeof i10.MatSidenavModule, typeof i11.MatSnackBarModule, typeof i12.MatToolbarModule, typeof i13.RouterModule], [typeof i1.MainNav]>;
}

export interface Section {
    icon: string;
    label: string;
    url: string;
}
