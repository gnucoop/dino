export interface FormData extends Model {
    data: {
        [key: string]: any;
    };
    schema_id: string;
    user_id: string;
}

export declare class FormDataManager extends DataModelManager<FormData> {
    constructor(dataService: DataService, permissionContextService: PermissionContextService);
    static ɵfac: i0.ɵɵFactoryDef<FormDataManager, never>;
    static ɵprov: i0.ɵɵInjectableDef<FormDataManager>;
}

export interface FormSchema extends Model {
    name: string;
    schema: AjfFormCreate;
}

export declare class FormSchemaManager extends DataModelManager<FormSchema> {
    constructor(dataService: DataService, permissionContextService: PermissionContextService);
    static ɵfac: i0.ɵɵFactoryDef<FormSchemaManager, never>;
    static ɵprov: i0.ɵɵInjectableDef<FormSchemaManager>;
}
