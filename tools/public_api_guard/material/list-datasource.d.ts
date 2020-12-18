export declare class ListDataSource<T extends Model = Model, DM extends DataModelManager<T> = DataModelManager<T>> extends MatTableDataSource<T> {
    get dataResults(): BehaviorSubject<T[]>;
    get getFiltersComponent(): SearchFiltersComponent | null;
    get getPaginator(): MatPaginator | null;
    get getSort(): MatSort | null;
    get modelSchema(): RxJsonSchema;
    refreshList: BehaviorSubject<boolean>;
    set setFiltersComponent(searchFilters: SearchFiltersComponent | null);
    set setPaginator(paginator: MatPaginator | null);
    set setSort(sort: MatSort | null);
    constructor(_dataModelManager: DM, _fs: FiltersService);
    deleteAction(items: T[]): T[];
    disconnect(): void;
    getDisplayedItems(): T[];
    getQueryResults(query: DataQueryOptions): void;
    queryDM(queryString: string): DataQueryOptions;
}
