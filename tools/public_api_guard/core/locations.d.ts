export interface Location extends Model {
    name: string;
}

export declare class LocationManager extends DataModelManager<Location> {
    constructor(dataService: DataService, permissionContextService: PermissionContextService);
    static ɵfac: i0.ɵɵFactoryDeclaration<LocationManager, never>;
    static ɵprov: i0.ɵɵInjectableDef<LocationManager>;
}

export declare class LocationModule {
    constructor(_filtersService: FiltersService);
    static ɵfac: i0.ɵɵFactoryDeclaration<LocationModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<LocationModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<LocationModule, never, never, never>;
}
