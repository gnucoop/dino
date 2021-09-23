export interface ActiveMetric {
    icon: string;
    label: string;
    metricName: string;
}

export interface ActiveSync {
    state: RxGraphQLReplicationState;
    sub: {
        unsubscribe: () => void;
    };
}

export interface CanCreateData<T extends {} = {}, M extends Model = Model> {
    context?: PermissionContext<T>;
    object: InsertModel<M>;
}

export interface CanDeleteData<T extends {} = {}, M extends Model = Model> {
    context?: PermissionContext<T>;
    object: M;
}

export interface CanModifyData<T extends {} = {}, M extends Model = Model> {
    context?: PermissionContext<T>;
    data: Partial<M> & {
        id: string;
    };
    object: M;
}

export interface CanViewData<T extends {} = {}, M extends Model = Model> {
    context?: PermissionContext<T>;
    object: M;
}

export interface CollectionChangedEvent {
    action?: string;
    collection: string;
    timestamp: number;
}

export declare const DATA_SERVICE_CONFIG: InjectionToken<DataServiceConfig>;

export interface DataBulkInsertRequest<T extends Model> {
    collectionName: string;
    objects: InsertModel<T>[];
}

export interface DataCreateCollectionRequest {
    collection: RxCollectionCreator;
    pullQueryExtraParams?: PullQueryExtraParams;
    pushQueryExtraParams?: PushQueryExtraParams;
}

export interface DataFindRequest<T extends Model = Model> {
    collectionName: string;
    query?: MangoQuery<T>;
}

export interface DataGetRequest {
    collectionName: string;
    id: string;
}

export interface DataIndex {
    endKey?: string;
    fields: (string | DataIndexField)[];
    name: string;
    startKey?: string;
}

export interface DataIndexField {
    [prop: string]: 'asc' | 'desc';
}

export interface DataInsertRequest<T extends Model> {
    collectionName: string;
    object: InsertModel<T>;
}

export interface DataJoinOptions {
    fields?: string[];
    model: string;
    property: string;
}

export interface DataListOptions {
    fields?: string[];
    index?: DataIndex;
    limit?: number;
    search?: string;
    skip?: number;
    sort?: DataQuerySort[];
}

export declare abstract class DataModelManager<T extends Model = Model> {
    get collectionChanged(): Observable<CollectionChangedEvent>;
    get collectionName(): string;
    get collectionSchema(): RxJsonSchema;
    detailsKey: keyof T;
    detailsManager: DataModelManager<any>;
    getSubData: (doc: T, querySelector?: any) => Observable<T[]>;
    get permissionContext(): Observable<PermissionContext>;
    get permissions(): Permission[];
    constructor(createParams: DataCreateCollectionRequest, _dataService: DataService, _contextService: PermissionContextService, _permissions?: Permission[]);
    addToContext(data: PermissionContextDataUpdate): void;
    bulkCreate(data: InsertModel<T>[]): Observable<{
        success: RxDocument<T>[];
        error: any[];
    }>;
    bulkDelete(data: T[]): Observable<RxDocument<T>[] | null>;
    canView(object: T, context?: PermissionContext<T>): boolean;
    create(obj: InsertModel<T>): Observable<RxDocument<T> | null>;
    delete(data: string | T): Observable<RxDocument<T> | null>;
    generateAdditionalFilters(dataSchema?: any): any[];
    get(id: string): Observable<RxDocument<T> | null>;
    init(): Observable<boolean>;
    list(options?: DataListOptions): Observable<RxQuery<T, RxDocument<T>[]>>;
    patch(data: Partial<T> & {
        id: string;
    }): Observable<RxDocument<T> | null>;
    query(options: DataQueryOptions): Observable<RxQuery<T, RxDocument<T>[]>>;
    update(obj: T): Observable<RxDocument<T> | null>;
}

export declare class DataModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<DataModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<DataModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<DataModule, never, never, never>;
    static forRoot(config: DataServiceConfig): ModuleWithProviders<DataModule>;
}

export interface DataQueryOptions {
    attributes?: {
        [attributeName: string]: any;
    };
    distinct?: string[];
    fields?: string[];
    group_by?: string[];
    index?: DataIndex;
    joins?: DataJoinOptions[];
    limit?: number;
    selector: DataQuerySelector;
    skip?: number;
    sort?: DataQuerySort[];
}

export declare type DataQuerySelector = {
    [propName: string]: any | {
        $lt?: any;
        $gt?: any;
        $lte?: any;
        $gte?: any;
        $eq?: any;
        $ne?: any;
        $exists?: any;
        $in?: any;
        $nin?: any;
        $or?: any;
        $nor?: any;
        $not?: any;
        $regex?: any;
    };
};

export declare type DataQuerySort = string | {
    [propName: string]: DataQuerySortDir;
};

export declare type DataQuerySortDir = 'asc' | 'desc';

export declare class DataService {
    readonly collectionChanged: Observable<CollectionChangedEvent>;
    readonly config: DataServiceConfig;
    constructor(_authService: AuthService, _nss: NetworkStatusService, _config: DataServiceConfig, _configService: ConfigService | null);
    bulkInsert<T extends Model = Model>(params: DataBulkInsertRequest<T>): Observable<{
        success: RxDocument<T>[];
        error: any[];
    }>;
    createCollection(params: DataCreateCollectionRequest): Observable<boolean>;
    destroyCollection(collectionName: string): Observable<boolean>;
    find<T extends Model = Model>(params: DataFindRequest<T>): Observable<RxQuery<T, RxDocument<T>[]>>;
    findOne<T extends Model = Model>(params: DataFindRequest<T>): Observable<RxQuery<T, RxDocument<T> | null>>;
    get<T extends Model = Model>(params: DataGetRequest): Observable<RxDocument<T> | null>;
    insert<T extends Model = Model>(params: DataInsertRequest<T>): Observable<RxDocument<T> | null>;
    plugin(plugin: any): void;
    upsert<T extends Model = Model>(params: DataUpsertRequest<T>): Observable<RxDocument<T> | null>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataService, [null, null, null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DataService>;
}

export interface DataServiceConfig {
    databaseCreateOptions: RxDatabaseCreator;
    syncOptions: DataServiceSyncOptions;
}

export interface DataServiceSyncOptions extends Omit<SyncOptionsGraphQL, 'headers' | 'pull' | 'push' | 'deletedFlag'> {
    authErrorMessage?: string;
    batchSize?: number;
    webSocketImpl?: any;
    wsUrl?: string;
}

export interface DataUpsertRequest<T extends Model> {
    collectionName: string;
    object: UpsertModel<T>;
}

export declare type InsertModel<T extends Model> = Omit<T, 'id' | 'created_at' | 'updated_at' | 'is_deleted'>;

export interface Metric extends Model {
    name: string;
    parent_id: string | null;
    parent_name: string | null;
}

export declare class MetricsService {
    readonly activeMetrics: BehaviorSubject<ActiveMetric[]>;
    readonly hasActiveMetrics: Observable<boolean>;
    activateMetric(metric: ActiveMetric): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MetricsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MetricsService>;
}

export interface Model {
    created_at: string;
    id: string;
    is_deleted?: boolean;
    updated_at: string;
}

export interface Permission<T extends Model = Model> {
    canCreate?(data: CanCreateData<T>): boolean;
    canDelete?(data: CanDeleteData<T>): boolean;
    canModify?(data: CanModifyData<T>): boolean;
    canView?(data: CanViewData<T>): boolean;
}

export interface PermissionContext<T extends {} = {}> {
    contextData?: any;
    user: User | null;
}

export interface PermissionContextDataUpdate {
    [prop: string]: any;
}

export declare class PermissionContextService {
    readonly permissionContext: Observable<PermissionContext>;
    constructor(authService: AuthService);
    addToContext(param: PermissionContextDataUpdate): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PermissionContextService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PermissionContextService>;
}

export interface PullQueryExtraParams {
    fields?: string[];
    where?: any;
}

export interface PushQueryExtraParams {
    docModifier?: <T extends Model = Model>(doc: T) => T;
}
