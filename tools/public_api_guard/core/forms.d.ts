export interface FormSchema extends Model {
    name: string;
    schema: AjfFormCreate;
}

export declare const migrationStrategies: KeyFunctionMap;

export declare const VERSION = 0;
