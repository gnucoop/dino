export declare const DATA_SERVICE_CONFIG: InjectionToken<DataServiceConfig>;

export interface DataBulkInsertRequest<T extends Model> {
    collectionName: string;
    objects: InsertModel<T>[];
}

export interface DataGetRequest {
    collectionName: string;
    id: string;
}

export interface DataInsertRequest<T extends Model> {
    collectionName: string;
    object: InsertModel<T>;
}

export declare class DataModule {
    static ɵinj: i0.ɵɵInjectorDef<DataModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<DataModule, never, never, never>;
    static forRoot(config: DataServiceConfig): ModuleWithProviders<DataModule>;
}

export declare class DataService {
    constructor(config: DataServiceConfig);
    bulkInsert<T extends Model = Model>(params: DataBulkInsertRequest<T>): Observable<{
        success: RxDb.RxDocument<T>[];
        error: any[];
    }>;
    createCollection(collection: RxDb.RxCollectionCreator): Observable<boolean>;
    destroyCollection(collectionName: string): Observable<boolean>;
    get<T extends Model = Model>(params: DataGetRequest): Observable<RxDb.RxDocument<T> | null>;
    insert<T extends Model = Model>(params: DataInsertRequest<T>): Observable<RxDb.RxDocument<T> | null>;
    plugin(plugin: any): void;
    upsert<T extends Model = Model>(params: DataUpsertRequest<T>): Observable<RxDb.RxDocument<T> | null>;
    static ɵfac: i0.ɵɵFactoryDef<DataService>;
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
