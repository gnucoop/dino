export interface Organization extends Metric {
    logo_path: string | null;
    website_url: string | null;
}

export declare class OrganizationManager extends DataModelManager<Organization> {
    constructor(dataService: DataService, permissionContextService: PermissionContextService);
    static ɵfac: i0.ɵɵFactoryDeclaration<OrganizationManager, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrganizationManager>;
}

export declare class OrganizationsModule {
    readonly organizationMetric: ActiveMetric;
    constructor(_filtersService: FiltersService, _metricsService: MetricsService);
    static ɵfac: i0.ɵɵFactoryDeclaration<OrganizationsModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<OrganizationsModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<OrganizationsModule, never, never, never>;
}
