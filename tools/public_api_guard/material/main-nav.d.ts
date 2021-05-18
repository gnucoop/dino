export declare class MainModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MainModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MainModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MainModule, [typeof i1.MainNav], [typeof i2.AuthModule, typeof i3.BreakpointObserverModule, typeof i4.CommonModule, typeof i5.MatButtonModule, typeof i6.MatIconModule, typeof i7.MatListModule, typeof i8.MatSidenavModule, typeof i9.MatSnackBarModule, typeof i10.MatToolbarModule, typeof i11.RouterModule], [typeof i1.MainNav]>;
}

export declare class MainNav implements AfterViewInit, OnDestroy {
    readonly authService: AuthService;
    readonly breakpointObserver: BreakpointObserverService;
    extendedSidenav: BehaviorSubject<boolean>;
    isLoading: BehaviorSubject<boolean>;
    get logoImagePath(): string;
    set logoImagePath(url: string);
    get sections(): Section[];
    set sections(sec: Section[]);
    set setShowNavLabels(opened: boolean);
    get showNavLabels(): BehaviorSubject<boolean>;
    sidenav: MatSidenav;
    readonly snackbar: MatSnackBar;
    constructor(breakpointObserver: BreakpointObserverService, authService: AuthService, snackbar: MatSnackBar, _router: Router);
    logout(): void;
    menuClick(): void;
    menuToggle(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onRouterOutletLoading(elementRef: any): void;
    static ɵcmp: i0.ɵɵComponentDeclaration<MainNav, "dewco-main-nav", never, { "sections": "sections"; "setShowNavLabels": "setShowNavLabels"; "logoImagePath": "logoImagePath"; }, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MainNav, never>;
}

export interface Section {
    icon: string;
    label: string;
    url: string;
}
