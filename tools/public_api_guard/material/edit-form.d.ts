export declare class EditForm<T extends Model = Model> implements OnInit, OnDestroy {
    set dataModelManager(dmm: DataModelManager<T>);
    get form(): Observable<AjfForm>;
    formCmp: AjfFormRenderer;
    get formData(): Observable<FormData>;
    readonly formId: Observable<string>;
    get formSchema(): Observable<FormSchema>;
    readonly isValid: Observable<boolean>;
    readonly isView: Observable<boolean>;
    readonly snackbar: MatSnackBar;
    constructor(_router: Router, _route: ActivatedRoute, _fs: FormSchemaManager, _rendererService: AjfFormRendererService, snackbar: MatSnackBar, _location: Location);
    ngOnDestroy(): void;
    ngOnInit(): void;
    onFormAction(evt: AjfFormActionEvent): void;
    static ɵcmp: i0.ɵɵComponentDeclaration<EditForm<any>, "dewco-edit-form", never, { "dataModelManager": "dataModelManager"; }, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<EditForm<any>, never>;
}

export declare class EditFormModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<EditFormModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<EditFormModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<EditFormModule, [typeof i1.EditForm], [typeof i2.AjfFormsModule, typeof i3.BrowserAnimationsModule, typeof i4.CommonModule, typeof i5.MatButtonModule, typeof i6.MatCheckboxModule, typeof i7.MatDialogModule, typeof i8.MatFormFieldModule, typeof i9.MatInputModule, typeof i10.MatSlideToggleModule, typeof i11.MatSnackBarModule, typeof i12.MatSortModule, typeof i13.MatTableModule, typeof i14.MatToolbarModule, typeof i15.RouterModule], [typeof i1.EditForm]>;
}
