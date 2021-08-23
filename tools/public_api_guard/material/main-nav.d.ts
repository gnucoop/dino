export declare class MainModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MainModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MainModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MainModule, [typeof i1.MainNav], [typeof i2.AjfTranslocoModule, typeof i3.LangSelectorModule, typeof i4.AuthModule, typeof i5.BreakpointObserverModule, typeof i6.CommonModule, typeof i7.MatButtonModule, typeof i8.MatIconModule, typeof i9.MatListModule, typeof i10.MatSidenavModule, typeof i11.MatSnackBarModule, typeof i12.MatToolbarModule, typeof i13.RouterModule], [typeof i1.MainNav]>;
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
    readonly showNav: Observable<boolean>;
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
