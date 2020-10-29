export declare abstract class AdminUserInteractionsService {
    abstract askConfirm(action: string): Observable<boolean>;
}

export declare const ALL_CONDITION_OPERATORS: Operator[];

export declare const CHOICES_CONDITION_OPERATORS: Operator[];

export declare const DEFAULT_MODEL_KEYS: string[];

export declare const DEFAULT_OPERATORS: {
    [key: number]: Operator;
};

export declare const FIELD_TYPES: {
    [key: string]: number;
};

export interface FilterGroup {
    filterGroupAdvancedFilters?: FilterItem[];
    filterGroupBasicFilters?: FilterItem[];
    filterGroupName: string;
}

export interface FilterItem extends Partial<AjfField> {
    choicesOrigin?: AjfChoicesOrigin<any>;
    choicesOriginRef?: string;
    formControlName?: string;
    isFormData?: boolean;
    isValid?: boolean;
    name: string;
    operator?: Operator;
    value?: any;
    [key: string]: any;
}

export declare type filterListType = 'basic' | 'advanced' | 'temporary' | 'all';

export declare class FiltersService implements OnDestroy {
    _queryString: BehaviorSubject<string>;
    get activeFilters(): Subject<FilterItem[]>;
    get advancedFilters(): BehaviorSubject<FilterItem[]>;
    get basicFilters(): BehaviorSubject<FilterItem[]>;
    set listReady(status: boolean);
    loadPresetEvent: EventEmitter<boolean>;
    get modelFilters(): BehaviorSubject<FilterGroup[]>;
    get queryString(): BehaviorSubject<string>;
    set setCustomFilters(filterGroups: FilterGroup[]);
    get temporaryFilters(): BehaviorSubject<FilterItem[]>;
    constructor(_route: ActivatedRoute, _router: Router, _locationManager?: LocationManager | undefined, _projectManager?: ProjectManager | undefined);
    LoadPresetTrigger(): void;
    _checkOptionalBasicFilters(): void;
    addFilter(filterItem: FilterItem, filterList: filterListType): void;
    checkCondition(ajfCondition: AjfCondition, filterItem?: FilterItem): boolean;
    checkValidation(filterItem: FilterItem, ajfValidation?: AjfValidationGroup): boolean;
    checkValues(val_a: string, val_b: string, operator: string): boolean;
    findFilterByName(filterName: string, filterList?: filterListType): Observable<FilterItem | undefined>;
    generateFilters(modelSchema: RxJsonSchema, formSchema?: FormSchema): void;
    generateFormSchemaFilters(formSchema?: FormSchema): void;
    generateModelSchemaFilters(modelSchema: RxJsonSchema): void;
    initializeFilters(basicFormGroups: FormGroup[]): Observable<FormGroup[]>;
    loadPreset(encodedString: string | null): void;
    ngOnDestroy(): void;
    removeFilter(filterItem: FilterItem, filterList: filterListType[] | filterListType): Observable<boolean>;
    resetTemporaryFilters(): void;
    updateAdvancedFilters(): void;
    static ɵfac: i0.ɵɵFactoryDef<FiltersService, [null, null, { optional: true; }, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDef<FiltersService>;
}

export declare abstract class List<T extends Model = Model> {
    protected _actionEvent: EventEmitter<{
        action: string;
        items: T[];
    }>;
    protected _aui: AdminUserInteractionsService;
    protected _cdr: ChangeDetectorRef;
    get baseEditUrl(): string;
    set baseEditUrl(baseEditUrl: string);
    get displayedColumns(): string[];
    get headers(): ListHeader<T>[];
    set headers(headers: ListHeader<T>[]);
    get title(): string;
    set title(title: string);
    constructor(_cdr: ChangeDetectorRef, _aui: AdminUserInteractionsService);
    abstract clearSelection(): void;
    abstract deleteAction(items: T[]): T[];
    abstract getItems(): T[];
    abstract getSelection(): T[];
    processAction(action: string, items: T[]): void;
    abstract selectAll(): void;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<List<any>, never, never, { "title": "title"; "headers": "headers"; "baseEditUrl": "baseEditUrl"; }, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<List<any>, never>;
}

export interface ListHeader<T> {
    column: keyof T;
    hidden?: boolean;
    label: string;
    sortable?: boolean;
}

export declare const NUMBER_CONDITION_OPERATORS: Operator[];

export interface Operator {
    label: '<' | '>' | '<=' | '>=' | '==' | '!=' | 'exists' | 'includes' | 'not includes' | 'is' | 'not' | 'Like' | 'Not like';
    options?: string;
    value: '$lt' | '$gt' | '$lte' | '$gte' | '$eq' | '$ne' | '$exist' | '$in' | '$nin' | '$in' | '$regex';
}

export declare abstract class SearchFiltersComponent {
    basicFilters: FormGroup[];
    readonly dateSearchFilters: FormGroup;
    optionalFilters: FormGroup[];
    optionalFiltersLabels: string[];
    readonly textSearchFilters: FormGroup;
    constructor();
}

export declare function unzip(base64ZippedString: any): string;

export interface WidgetData {
    active: boolean;
    form: AjfForm;
    isFormData?: boolean;
    operator: Operator;
    validation?: AjfValidationGroup;
}

export declare function zip(s: string): string;
