export declare class MetricSection<T extends Metric = Metric> implements OnInit {
    dataSource: ListDataSource<T>;
    dialog: MatDialog;
    readonly headers: ListHeader<T>[];
    readonly listRowActions: ListAction[];
    metricLabel: string;
    set metricManager(mm: DataModelManager<T>);
    readonly showEditor: boolean;
    readonly showList: boolean;
    constructor(_filtersService: FiltersService, dialog: MatDialog);
    ngOnInit(): void;
    openDialog(metric?: T, action?: 'view' | 'edit' | 'create'): void;
    static ɵcmp: i0.ɵɵComponentDeclaration<MetricSection<any>, "dewco-metric-section", never, { "showList": "showList"; "showEditor": "showEditor"; "headers": "headers"; "listRowActions": "listRowActions"; "metricManager": "metricManager"; }, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MetricSection<any>, never>;
}

export declare class MetricSectionModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MetricSectionModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MetricSectionModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MetricSectionModule, [typeof i1.MetricSection], [typeof i2.BreakpointObserverModule, typeof i3.CommonModule, typeof i4.ListModule, typeof i5.FloatingButtonModule, typeof i6.FormsModule, typeof i7.MatButtonModule, typeof i8.MatTooltipModule, typeof i9.MetricEditorModule, typeof i10.SearchFiltersBarModule], [typeof i1.MetricSection]>;
}
