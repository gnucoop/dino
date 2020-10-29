export interface Location extends Model {
    name: string;
}

export declare class LocationManager extends DataModelManager<Location> {
    constructor(dataService: DataService, permissionContextService: PermissionContextService);
    static ɵfac: i0.ɵɵFactoryDef<LocationManager, never>;
    static ɵprov: i0.ɵɵInjectableDef<LocationManager>;
}

export declare class LocationModule {
    static ɵinj: i0.ɵɵInjectorDef<LocationModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<LocationModule, never, never, never>;
    static forRoot(): ModuleWithProviders<LocationModule>;
}
