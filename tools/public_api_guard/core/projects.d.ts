export interface Project extends Model {
    name: string;
}

export declare class ProjectManager extends DataModelManager<Project> {
    constructor(dataService: DataService, permissionContextService: PermissionContextService);
    static ɵfac: i0.ɵɵFactoryDef<ProjectManager, never>;
    static ɵprov: i0.ɵɵInjectableDef<ProjectManager>;
}

export declare class ProjectModule {
    static ɵinj: i0.ɵɵInjectorDef<ProjectModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<ProjectModule, never, never, never>;
    static forRoot(): ModuleWithProviders<ProjectModule>;
}
