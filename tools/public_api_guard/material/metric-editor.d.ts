export interface MetricDialogData<T extends Metric = Metric> {
    metricAction?: 'view' | 'edit' | 'create';
    metricItem?: T;
    metricManager: DataModelManager<T>;
}

export declare class MetricEditor<T extends Metric = Metric> implements OnInit, OnDestroy {
    data: MetricDialogData<T>;
    dialogRef: MatDialogRef<MetricEditor>;
    metricForm: FormGroup;
    metricFormFields: MetricFormField[];
    metricName: string;
    metricParentValue: Observable<string | ParentMetric>;
    parentOptions: Observable<ParentMetric[]>;
    readonly snackbar: MatSnackBar;
    constructor(_router: Router, snackbar: MatSnackBar, dialogRef: MatDialogRef<MetricEditor>, data: MetricDialogData<T>, _nameMatchValidator: NameMatchValidator<T>, _cdr: ChangeDetectorRef);
    closeEditor(): void;
    displayParentName(parent: ParentMetric): string;
    isFormValid(): boolean;
    ngOnDestroy(): void;
    ngOnInit(): void;
    saveMetric(): void;
    static ɵcmp: i0.ɵɵComponentDeclaration<MetricEditor<any>, "dewco-metric-editor", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MetricEditor<any>, never>;
}

export declare class MetricEditorModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MetricEditorModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MetricEditorModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MetricEditorModule, [typeof i1.MetricEditor], [typeof i2.AuthModule, typeof i3.BreakpointObserverModule, typeof i4.CommonModule, typeof i5.MatAutocompleteModule, typeof i6.MatButtonModule, typeof i7.MatDatepickerModule, typeof i8.MatDialogModule, typeof i9.MatFormFieldModule, typeof i10.MatIconModule, typeof i11.MatInputModule, typeof i12.MatListModule, typeof i13.MatNativeDateModule, typeof i14.MatSnackBarModule, typeof i15.ReactiveFormsModule, typeof i16.RouterModule], [typeof i1.MetricEditor]>;
}

export interface MetricFormField {
    fieldName: string;
    hint?: string;
    icon?: string;
    placeholder?: string;
    value?: any;
}

export declare class NameMatchValidator<T extends Metric = Metric> {
    constructor();
    nameCheck(manager: DataModelManager<T>, cdr: ChangeDetectorRef, currentName: string, action?: 'view' | 'edit' | 'create'): AsyncValidatorFn;
    static ɵfac: i0.ɵɵFactoryDeclaration<NameMatchValidator<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NameMatchValidator<any>>;
}

export interface ParentMetric {
    parent_id: string | null;
    parent_name: string | null;
}

export declare function RequireMatch(control: AbstractControl): ValidationErrors | null;
