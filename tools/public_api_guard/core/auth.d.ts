export declare const AUTH_SERVICE_CONFIG: InjectionToken<AuthServiceConfig>;

export declare class AuthModule {
    static ɵinj: i0.ɵɵInjectorDef<AuthModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<AuthModule, never, never, never>;
    static forRoot(config: AuthServiceConfig): ModuleWithProviders<AuthModule>;
}

export declare class AuthService {
    constructor(_httpClient: HttpClient, _config: AuthServiceConfig);
    getAuthToken(): string | null;
    getRefreshToken(): string | null;
    getUserInfo(): User | null;
    login(credentials: Credentials): Observable<boolean>;
    logout(allDevices?: boolean): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDef<AuthService, never>;
    static ɵprov: i0.ɵɵInjectableDef<AuthService>;
}

export interface AuthServiceConfig {
    apiKey: string;
    applicationId: string;
    authTokenLocalStorageKey?: string;
    host: string;
    refreshTokenLocalStorageKey?: string;
    retrieveAuthToken?: () => string | null;
    retrieveRefreshToken?: () => string | null;
    retrieveUserInfo?: () => User | null;
    storeAuthToken?: (token: string | null) => void;
    storeRefreshToken?: (token: string | null) => void;
    storeUserInfo?: (userInfo: User | null) => void;
    userInfoLocalStorageKey?: string;
}

export interface Credentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    refreshToken: string;
    token: string;
    user: User;
}

export declare type TwoFactorDelivery = 'None' | 'TextMessage';

export interface User {
    active: boolean;
    email: string;
    firstName: string;
    id: string;
    insertInstant: number;
    lastLoginInstant: number;
    lastName: string;
    passwordChangeRequired: boolean;
    passwordLastUpdateInstant: number;
    registrations: Registration[];
    tenantId: string;
    twoFactorDelivery: TwoFactorDelivery;
    twoFactorEnabled: boolean;
    usernameStatus: UsernameStatus;
    verified: boolean;
}

export declare type UsernameStatus = 'ACTIVE' | 'PENDING' | 'REJECTED';
