export interface FormData extends Model {
    data: {
        [key: string]: any;
    };
    schema_id: string;
    user_id: string;
}

export declare class FormDataManager extends DataModelManager<FormData> {
    constructor(dataService: DataService, permissionContextService: PermissionContextService);
    static ɵfac: i0.ɵɵFactoryDeclaration<FormDataManager, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FormDataManager>;
}

export interface FormSchema extends Model {
    name: string;
    schema: AjfFormCreate;
}

export declare class FormSchemaManager extends DataModelManager<FormSchema> {
    constructor(dataService: DataService, permissionContextService: PermissionContextService);
    generateAdditionalFilters(formSchema?: FormSchema): FilterGroup[];
    static ɵfac: i0.ɵɵFactoryDeclaration<FormSchemaManager, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FormSchemaManager>;
}

export declare class FormsModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<FormsModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<FormsModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<FormsModule, never, never, never>;
}
