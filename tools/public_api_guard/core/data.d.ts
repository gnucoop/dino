export declare const DATA_SERVICE_CONFIG: InjectionToken<DataServiceConfig>;

export declare class DataModule {
    static ɵinj: i0.ɵɵInjectorDef<DataModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<DataModule, never, never, never>;
    static forRoot(config: DataServiceConfig): ModuleWithProviders<DataModule>;
}

export declare class DataService {
    constructor(config: DataServiceConfig);
    createCollection(collection: RxDb.RxCollectionCreator): Observable<boolean>;
    destroyCollection(collectionName: string): Observable<boolean>;
    get<T extends Model = Model>(collectionName: string, id: number | string): Observable<RxDb.RxDocument<T> | null>;
    insert<T extends Model = Model>(collectionName: string, object: Omit<T, 'id' | 'created_at' | 'updated_at'>): Observable<RxDb.RxDocument<T> | null>;
    plugin(plugin: any): void;
    upsert<T extends Model = Model>(collectionName: string, object: Omit<T, 'id' | 'created_at' | 'updated_at'> & Partial<Pick<T, 'id' | 'created_at' | 'updated_at'>>): Observable<RxDb.RxDocument<T> | null>;
    static ɵfac: i0.ɵɵFactoryDef<DataService>;
    static ɵprov: i0.ɵɵInjectableDef<DataService>;
}

export interface DataServiceConfig {
    databaseCreateOptions: RxDatabaseCreator;
}

export interface Model {
    created_at: string;
    id: string;
    updated_at: string | null;
}
