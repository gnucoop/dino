export declare type MetricBasicInfo = {
    metricType: string;
    metricName: string;
    metricId: string;
};

export interface UserGroup extends Model {
    groupFormSchemaIds: string[];
    groupMetrics: MetricBasicInfo[];
    groupName: string;
    groupReportSchemaIds: string[];
    userRoleId: string;
}

export declare class UserGroupManager extends DataModelManager<UserGroup> {
    constructor(_userModelManager: UserModelManager, dataService: DataService, permissionContextService: PermissionContextService);
    getActiveUserGroups(): Observable<UserGroup[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserGroupManager, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserGroupManager>;
}

export interface UserModel extends Omit<User<{}>, 'id'>, Model {
    full_name: string;
    user_group_ids: string[];
}

export declare class UserModelManager extends DataModelManager<UserModel> {
    constructor(_authService: AuthService, dataService: DataService, permissionContextService: PermissionContextService);
    getActiveUserModel(): Observable<UserModel | null>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserModelManager, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserModelManager>;
}

export interface UserRole extends Model {
    roleName: string;
    rolePermissions: ModelPermissions[];
}

export declare class UserRoleManager extends DataModelManager<UserRole> {
    constructor(dataService: DataService, permissionContextService: PermissionContextService);
    static ɵfac: i0.ɵɵFactoryDeclaration<UserRoleManager, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserRoleManager>;
}

export declare class UsersModule {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<UsersModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<UsersModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<UsersModule, never, never, never>;
}
