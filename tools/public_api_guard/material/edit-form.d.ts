export declare class EditForm<T extends Model = Model> implements AfterViewInit, OnInit, OnDestroy {
  set dataModelManager(dmm: DataModelManager<T>);
  get form(): Observable<AjfForm>;
  formCmp: AjfFormRenderer;
  get formData(): Observable<{
    data: FormData;
    schemaId: string;
  }>;
  readonly formId: Observable<string>;
  formMetricsSelectorComponent: QueryList<FormMetricSelector>;
  get formSchema(): Observable<FormSchema>;
  isAjfFormValid: Observable<boolean>;
  readonly isDetails: Observable<boolean>;
  isFormMetricsSelectorValid: Observable<boolean>;
  readonly isView: Observable<boolean>;
  readonly metricsService: MetricsService;
  readonly snackbar: MatSnackBar;
  constructor(
    _router: Router,
    _route: ActivatedRoute,
    _fs: FormSchemaManager,
    _rendererService: AjfFormRendererService,
    _location: Location,
    snackbar: MatSnackBar,
    metricsService: MetricsService,
  );
  ngAfterViewInit(): void;
  ngOnDestroy(): void;
  ngOnInit(): void;
  onFormAction(evt: AjfFormActionEvent): void;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    EditForm<any>,
    'dewco-edit-form',
    never,
    {'dataModelManager': 'dataModelManager'},
    {},
    never,
    never
  >;
  static ɵfac: i0.ɵɵFactoryDeclaration<EditForm<any>, never>;
}

export declare class EditFormModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<EditFormModule, never>;
  static ɵinj: i0.ɵɵInjectorDeclaration<EditFormModule>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    EditFormModule,
    [typeof i1.EditForm],
    [
      typeof i2.AjfFormsModule,
      typeof i3.CommonModule,
      typeof i4.FormMetricSelectorModule,
      typeof i5.MatButtonModule,
      typeof i6.MatCheckboxModule,
      typeof i7.MatDialogModule,
      typeof i8.MatFormFieldModule,
      typeof i9.MatIconModule,
      typeof i10.MatInputModule,
      typeof i11.MatSlideToggleModule,
      typeof i12.MatSnackBarModule,
      typeof i13.MatSortModule,
      typeof i14.MatStepperModule,
      typeof i15.MatTableModule,
      typeof i16.MatToolbarModule,
      typeof i17.RouterModule,
    ],
    [typeof i1.EditForm]
  >;
}
