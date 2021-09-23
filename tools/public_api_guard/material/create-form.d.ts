export declare class CreateForm<T extends Model = Model> implements AfterViewInit, OnInit, OnDestroy {
    set dataModelManager(dmm: DataModelManager<T>);
    get form(): Observable<AjfForm>;
    formMetricsSelectorComponent: QueryList<FormMetricSelector>;
    get formSchema(): Observable<FormSchema>;
    isAjfFormValid: Observable<boolean>;
    isFormMetricsSelectorValid: Observable<boolean>;
    readonly metricsService: MetricsService;
    readonly snackbar: MatSnackBar;
    constructor(_authService: AuthService, _router: Router, _route: ActivatedRoute, _fs: FormSchemaManager, _rendererService: AjfFormRendererService, _location: Location, snackbar: MatSnackBar, metricsService: MetricsService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnInit(): void;
    onFormAction(evt: AjfFormActionEvent): void;
    static ɵcmp: i0.ɵɵComponentDeclaration<CreateForm<any>, "dewco-create-form", never, { "dataModelManager": "dataModelManager"; }, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CreateForm<any>, never>;
}

export declare class CreateFormModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<CreateFormModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CreateFormModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CreateFormModule, [typeof i1.CreateForm], [typeof i2.AjfFormsModule, typeof i3.BrowserAnimationsModule, typeof i4.CommonModule, typeof i5.FormMetricSelectorModule, typeof i6.MatButtonModule, typeof i7.MatCheckboxModule, typeof i8.MatDialogModule, typeof i9.MatFormFieldModule, typeof i10.MatIconModule, typeof i11.MatInputModule, typeof i12.MatSlideToggleModule, typeof i13.MatSnackBarModule, typeof i14.MatSortModule, typeof i15.MatStepperModule, typeof i16.MatTableModule, typeof i17.MatToolbarModule, typeof i18.RouterModule], [typeof i1.CreateForm]>;
}
