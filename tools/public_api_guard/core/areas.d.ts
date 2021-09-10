export interface Area extends Metric {
}

export declare class AreaManager extends DataModelManager<Area> {
    constructor(dataService: DataService, permissionContextService: PermissionContextService);
    static ɵfac: i0.ɵɵFactoryDeclaration<AreaManager, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AreaManager>;
}

export declare class AreasModule {
    readonly areaMetric: ActiveMetric;
    constructor(_filtersService: FiltersService, _metricsService: MetricsService);
    static ɵfac: i0.ɵɵFactoryDeclaration<AreasModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AreasModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AreasModule, never, never, never>;
}
