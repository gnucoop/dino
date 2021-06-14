export declare type ActionType = 'delete' | 'print' | 'download' | 'edit';

export declare abstract class AdminUserInteractionsService {
    abstract askConfirm(action: ListAction): Observable<boolean>;
}

export declare const ALL_CONDITION_OPERATORS: Operator[];

export declare const CHOICES_CONDITION_OPERATORS: Operator[];

export declare const DEFAULT_MODEL_KEYS: string[];

export declare const DEFAULT_OPERATORS: {
    [key: number]: Operator;
};

export declare const FIELD_TYPES: {
    [key: string]: AjfFieldType;
};

export interface FilterGroup {
    filterGroupAdditionalFilters?: FilterItem[];
    filterGroupBasicFilters?: FilterItem[];
    filterGroupName: string;
}

export interface FilterItem extends Partial<AjfField> {
    choices?: AjfChoice<any>[];
    choicesOrigin?: AjfChoicesOrigin<any>;
    choicesOriginRef?: string;
    formControlName?: string;
    isAdditionalFilter?: boolean;
    isValid?: boolean;
    name: string;
    operator?: Operator;
    value?: any;
}

export declare type FilterListType = 'basic' | 'additional' | 'temporary' | 'all';

export declare class FiltersService {
    get additionalFilters(): BehaviorSubject<FilterItem[]>;
    get availableBasicFilterLabels(): string[];
    get basicFilters(): BehaviorSubject<FilterItem[]>;
    get currentBasicFilterLabels(): string[];
    get generatedFilters(): Observable<FilterGroup[]>;
    get generatedModelFilters(): BehaviorSubject<FilterGroup[]>;
    get loadPresetEvent(): EventEmitter<boolean>;
    get queryString(): Observable<string>;
    set setCustomFilters(filterGroups: FilterGroup[]);
    get temporaryFilters(): BehaviorSubject<FilterItem[]>;
    constructor(_route: ActivatedRoute, _router: Router);
    addAvailableFilterLabel(label: string): void;
    addBasicFilter(ftName: string): void;
    addFilter(filterItem: FilterItem, filterList: FilterListType): void;
    checkCondition(ajfCondition: AjfCondition, filterItem?: FilterItem): boolean;
    checkValidation(filterItem: FilterItem, ajfValidation?: AjfValidationGroup): boolean;
    findFilterByName(filterName: string, filterList?: FilterListType): Observable<FilterItem | undefined>;
    generateModelFilters(modelSchema: RxJsonSchema): void;
    initializeFilters(basicFormGroups: FormGroup[]): Observable<FormGroup[]>;
    loadPreset(encodedString?: string): void;
    loadPresetTrigger(): void;
    removeFilter(filterItem: FilterItem, filterList: FilterListType[] | FilterListType): Observable<boolean>;
    resetTemporaryFilters(): void;
    setAdditionalFilters(filters?: FilterGroup[]): void;
    updateAdditionalFilters(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FiltersService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FiltersService>;
}

export declare abstract class List<T extends Model = Model, AD extends Model = Model> {
    protected _actionEvent: EventEmitter<{
        action: ListAction;
        items: T[];
    }>;
    protected _aui: AdminUserInteractionsService;
    protected _cdr: ChangeDetectorRef;
    get additionalDataSchema(): AD;
    set additionalDataSchema(ds: AD);
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
    processAction(action: ListAction, items: T[]): void;
    abstract selectAll(): void;
    static ɵdir: i0.ɵɵDirectiveDeclaration<List<any, any>, never, never, { "additionalDataSchema": "additionalDataSchema"; "title": "title"; "headers": "headers"; "baseEditUrl": "baseEditUrl"; }, {}, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<List<any, any>, never>;
}

export interface ListAction {
    actionType: ActionType;
    askConfirm?: boolean;
}

export interface ListHeader<T> {
    column: keyof T;
    displayed?: boolean;
    hidden?: boolean;
    label: string;
    sortable?: boolean;
}

export declare class ListModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ListModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ListModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ListModule, never, never, never>;
}

export declare const NUMBER_CONDITION_OPERATORS: Operator[];

export interface Operator {
    label: '<' | '>' | '<=' | '>=' | '==' | '!=' | 'exists' | 'includes' | 'not includes' | 'is' | 'not' | 'Like' | 'Not like';
    options?: string;
    value: '$lt' | '$gt' | '$lte' | '$gte' | '$eq' | '$ne' | '$exist' | '$in' | '$nin' | '$in' | '$regex';
}

export declare abstract class SearchFiltersComponent {
    additionalBasicFilters: FormGroup[];
    additionalBasicFiltersLabels: string[];
    basicFilters: FormGroup[];
    readonly dateSearchFilters: FormGroup;
    readonly textSearchFilters: FormGroup;
    constructor();
}

export declare function unzip(base64ZippedString: any): string;

export interface WidgetData {
    active: boolean;
    form: AjfForm;
    operator: Operator;
    validationConditions?: AjfValidationGroup;
    visibilityConditions: AjfCondition;
}

export declare function zip(s: string): string;
