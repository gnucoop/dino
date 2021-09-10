export declare class CreateForm<T extends Model = Model> implements OnInit, OnDestroy {
    set dataModelManager(dmm: DataModelManager<T>);
    get form(): Observable<AjfForm>;
    formCmp: AjfFormRenderer;
    get formSchema(): Observable<FormSchema>;
    readonly isValid: Observable<boolean>;
    readonly snackbar: MatSnackBar;
    constructor(_authService: AuthService, _router: Router, _route: ActivatedRoute, _fs: FormSchemaManager, _rendererService: AjfFormRendererService, snackbar: MatSnackBar, _location: Location);
    ngOnDestroy(): void;
    ngOnInit(): void;
    onFormAction(evt: AjfFormActionEvent): void;
    static ɵcmp: i0.ɵɵComponentDeclaration<CreateForm<any>, "dewco-create-form", never, { "dataModelManager": "dataModelManager"; }, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CreateForm<any>, never>;
}

export declare class CreateFormModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<CreateFormModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CreateFormModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CreateFormModule, [typeof i1.CreateForm], [typeof i2.AjfFormsModule, typeof i3.BrowserAnimationsModule, typeof i4.CommonModule, typeof i5.MatButtonModule, typeof i6.MatCheckboxModule, typeof i7.MatDialogModule, typeof i8.MatFormFieldModule, typeof i9.MatInputModule, typeof i10.MatSlideToggleModule, typeof i11.MatSnackBarModule, typeof i12.MatSortModule, typeof i13.MatTableModule, typeof i14.MatToolbarModule, typeof i15.RouterModule], [typeof i1.CreateForm]>;
}
