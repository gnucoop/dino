export interface FormData extends Model {
  area_id?: string;
  data: {
    [key: string]: any;
  };
  location_id?: string;
  organization_id?: string;
  project_id?: string;
  schema_id: string;
  user_id: string;
}

export declare class FormDataManager extends DataModelManager<FormData> {
  constructor(dataService: DataService, permissionContextService: PermissionContextService);
  static ɵfac: i0.ɵɵFactoryDeclaration<FormDataManager, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<FormDataManager>;
}

export interface FormSchema extends Model {
  icon?: string;
  label?: string;
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

export declare const schema: RxJsonSchema<any>;
