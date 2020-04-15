export declare const DATA_SERVICE_CONFIG: InjectionToken<DataServiceConfig>;

export interface DataBulkInsertRequest<T extends Model> {
    collectionName: string;
    objects: InsertModel<T>[];
}

export interface DataFindRequest {
    collectionName: string;
    query?: any;
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
    sort?: string[] | {
        [propName: string]: 'asc' | 'desc';
    }[];
}

export declare abstract class DataModelManager<T extends Model = Model> {
    constructor(_modelName: string, _dataService: DataService);
    bulkCreate(data: InsertModel<T>[]): Observable<{
        success: RxDb.RxDocument<T>[];
        error: any[];
    }>;
    create(obj: InsertModel<T>): Observable<RxDb.RxDocument<T> | null>;
    delete(data: string | T): Observable<RxDb.RxDocument<T> | null>;
    get(id: string): Observable<RxDb.RxDocument<T> | null>;
    list(options?: DataListOptions): Observable<RxDb.RxQuery<T, RxDb.RxDocument<T>[]>>;
    patch(data: Partial<T> & {
        id: string;
    }): Observable<RxDb.RxDocument<T> | null>;
    query(options: DataQueryOptions): Observable<RxDb.RxQuery<T, RxDb.RxDocument<T>[]>>;
    update(obj: T): Observable<RxDb.RxDocument<T> | null>;
}

export declare class DataModule {
    static ɵinj: i0.ɵɵInjectorDef<DataModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<DataModule, never, never, never>;
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
    sort?: string[] | {
        [propName: string]: 'asc' | 'desc';
    }[];
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

export declare class DataService {
    constructor(config: DataServiceConfig);
    bulkInsert<T extends Model = Model>(params: DataBulkInsertRequest<T>): Observable<{
        success: RxDb.RxDocument<T>[];
        error: any[];
    }>;
    createCollection(collection: RxDb.RxCollectionCreator): Observable<boolean>;
    destroyCollection(collectionName: string): Observable<boolean>;
    find<T extends Model = Model>(params: DataFindRequest): Observable<RxDb.RxQuery<T, RxDb.RxDocument<T>[]>>;
    findOne<T extends Model = Model>(params: DataFindRequest): Observable<RxDb.RxQuery<T, RxDb.RxDocument<T> | null>>;
    get<T extends Model = Model>(params: DataGetRequest): Observable<RxDb.RxDocument<T> | null>;
    insert<T extends Model = Model>(params: DataInsertRequest<T>): Observable<RxDb.RxDocument<T> | null>;
    plugin(plugin: any): void;
    upsert<T extends Model = Model>(params: DataUpsertRequest<T>): Observable<RxDb.RxDocument<T> | null>;
    static ɵfac: i0.ɵɵFactoryDef<DataService, never>;
    static ɵprov: i0.ɵɵInjectableDef<DataService>;
}

export interface DataServiceConfig {
    databaseCreateOptions: RxDatabaseCreator;
}

export interface DataUpsertRequest<T extends Model> {
    collectionName: string;
    object: UpsertModel<T>;
}

export declare type InsertModel<T extends Model> = Omit<T, 'id' | 'created_at' | 'updated_at'>;

export interface Model {
    created_at: string;
    id: string;
    updated_at: string | null;
}
