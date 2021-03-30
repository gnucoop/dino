export interface Project extends Model {
    name: string;
}

export declare class ProjectManager extends DataModelManager<Project> {
    constructor(dataService: DataService, permissionContextService: PermissionContextService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ProjectManager, never>;
    static ɵprov: i0.ɵɵInjectableDef<ProjectManager>;
}

export declare class ProjectModule {
    constructor(_filtersService: FiltersService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ProjectModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ProjectModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ProjectModule, never, never, never>;
}
