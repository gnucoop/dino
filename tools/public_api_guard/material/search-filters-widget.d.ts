export declare class NodeAsFilterItemPipe implements PipeTransform {
    transform(value: AjfNode): FilterItem;
    static ɵfac: i0.ɵɵFactoryDeclaration<NodeAsFilterItemPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<NodeAsFilterItemPipe, "asFilterItem">;
}

export declare class SearchFiltersWidget extends AjfCoreFormRenderer implements AfterViewInit, OnInit, OnDestroy {
    readonly excludeFilter: EventEmitter<FilterItem>;
    filterItemData: FilterItem;
    readonly includeFilter: EventEmitter<FilterItem>;
    get operatorValue(): BehaviorSubject<Operator>;
    rendererService: AjfFormRendererService;
    toggleButton: MatSlideToggle;
    get widgetData(): WidgetData;
    get widgetLabel(): string;
    get widgetName(): string;
    get widgetVisibility(): BehaviorSubject<boolean>;
    constructor(rendererService: AjfFormRendererService, changeDetectorRef: ChangeDetectorRef, _fs: FiltersService);
    changeOperator(operator: MatButtonToggleChange): void;
    checkToggleDisabled(): boolean;
    conditionOperatorByFieldType(type: AjfFieldType): Operator[];
    filterToggle(toggle: MatSlideToggleChange): void;
    getWidgetFormValue(): {
        [key: string]: unknown;
    };
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnInit(): void;
    static ɵcmp: i0.ɵɵComponentDeclaration<SearchFiltersWidget, "dewco-search-filters-widget", never, { "filterItemData": "filterItemData"; }, { "includeFilter": "includeFilter"; "excludeFilter": "excludeFilter"; }, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchFiltersWidget, never>;
}

export declare class SearchFiltersWidgetModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchFiltersWidgetModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<SearchFiltersWidgetModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<SearchFiltersWidgetModule, [typeof i1.NodeAsFilterItemPipe, typeof i2.SearchFiltersWidget], [typeof i3.AjfCommonModule, typeof i4.AjfFormsModule, typeof i5.AjfFormsModule, typeof i6.CommonModule, typeof i7.MatButtonModule, typeof i8.MatButtonToggleModule, typeof i9.MatCardModule, typeof i10.MatCheckboxModule, typeof i11.MatFormFieldModule, typeof i12.MatIconModule, typeof i13.MatInputModule, typeof i14.MatSlideToggleModule, typeof i15.ReactiveFormsModule, typeof i16.RouterModule], [typeof i1.NodeAsFilterItemPipe, typeof i2.SearchFiltersWidget]>;
}
