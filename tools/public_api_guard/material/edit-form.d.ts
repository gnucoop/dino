export declare class EditForm<T extends Model = Model> implements OnInit, OnDestroy {
    set dataModelManager(dmm: DataModelManager<T>);
    get form(): Observable<AjfForm>;
    formCmp: AjfFormRenderer;
    get formData(): Observable<{
        data: FormData;
        schemaId: string;
    }>;
    readonly formId: Observable<string>;
    get formSchema(): Observable<FormSchema>;
    readonly isDetails: Observable<boolean>;
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
    static ɵmod: i0.ɵɵNgModuleDeclaration<EditFormModule, [typeof i1.EditForm], [typeof i2.AjfFormsModule, typeof i3.CommonModule, typeof i4.MatButtonModule, typeof i5.MatCheckboxModule, typeof i6.MatDialogModule, typeof i7.MatFormFieldModule, typeof i8.MatInputModule, typeof i9.MatSlideToggleModule, typeof i10.MatSnackBarModule, typeof i11.MatSortModule, typeof i12.MatTableModule, typeof i13.MatToolbarModule, typeof i14.RouterModule], [typeof i1.EditForm]>;
}
