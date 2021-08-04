export interface Organization extends Metric {
    logo_path?: string;
    website_url?: string;
}

export declare class OrganizationManager extends DataModelManager<Organization> {
    constructor(dataService: DataService, permissionContextService: PermissionContextService);
    static ɵfac: i0.ɵɵFactoryDeclaration<OrganizationManager, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrganizationManager>;
}

export declare class OrganizationsModule {
    constructor(_filtersService: FiltersService);
    static ɵfac: i0.ɵɵFactoryDeclaration<OrganizationsModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<OrganizationsModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<OrganizationsModule, never, never, never>;
}
