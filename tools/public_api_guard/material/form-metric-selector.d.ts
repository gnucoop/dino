export declare class FormMetricSelector {
    formMetrics: FormGroup;
    formMetricsFields: MetricFormField[];
    formMetricsOptions: {
        [key: string]: Observable<MetricBasicInfo[]>;
    };
    formMetricsValues: {
        [key: string]: Observable<MetricBasicInfo | string>;
    };
    isView: Subject<boolean>;
    get selectedMetrics(): {
        [key: string]: MetricBasicInfo;
    };
    constructor(_userGroupManager: UserGroupManager, _metricService: MetricsService, _areaManager: AreaManager | null, _projectManager: ProjectManager | null, _locationManager: LocationManager | null, _organizationManager: OrganizationManager | null);
    addFormData(formData: {
        [key: string]: any;
    }, isView?: boolean): void;
    displayMetricName(metric: MetricBasicInfo): string;
    isFormMetricsValid(): Observable<boolean>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormMetricSelector, "dewco-form-metric-selector", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormMetricSelector, [null, null, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }]>;
}

export declare class FormMetricSelectorModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<FormMetricSelectorModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<FormMetricSelectorModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<FormMetricSelectorModule, [typeof i1.FormMetricSelector], [typeof i2.BrowserAnimationsModule, typeof i3.CommonModule, typeof i4.MatAutocompleteModule, typeof i5.MatButtonModule, typeof i6.MatFormFieldModule, typeof i7.MatIconModule, typeof i8.MatInputModule, typeof i9.ReactiveFormsModule], [typeof i1.FormMetricSelector]>;
}

export declare function RequireMetricMatch(control: AbstractControl): ValidationErrors | null;
