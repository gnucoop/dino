export declare const AUTH_SERVICE_CONFIG: InjectionToken<AuthServiceConfig<DinoUserInfo>>;

export declare class AuthGuard implements CanActivate {
    constructor(_router: Router, _authService: AuthService);
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthGuard>;
}

export declare class AuthModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AuthModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AuthModule, never, never, never>;
    static forRoot(config: AuthServiceConfig): ModuleWithProviders<AuthModule>;
}

export interface AuthResponse {
    refreshToken: string;
    token: string;
}

export declare class AuthService {
    readonly authToken: BehaviorSubject<string | null>;
    readonly authenticated: BehaviorSubject<boolean>;
    readonly config: AuthServiceConfig;
    constructor(_nss: NetworkStatusService, _httpClient: HttpClient, config: AuthServiceConfig);
    checkToken(): Observable<boolean>;
    getAuthToken(): string | null;
    getRefreshToken(): string | null;
    getUserInfo(): User | null;
    hasAuthToken(): boolean;
    login(credentials: Credentials): Observable<boolean>;
    logout(allDevices?: boolean): Observable<boolean>;
    refreshToken(): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthService>;
}

export interface AuthServiceConfig<T = DinoUserInfo> {
    apiKey?: string;
    applicationId: string;
    authTokenLocalStorageKey?: string;
    failedAuthRedirect: string;
    host: string;
    loginEndpoint?: string;
    logoutEndpoint?: string;
    passwordCredential?: string;
    refreshEndpoint?: string;
    refreshTokenLocalStorageKey?: string;
    retrieveAuthToken?: () => string | null;
    retrieveRefreshToken?: () => string | null;
    retrieveUserInfo?: () => User<T> | null;
    retryAttemptsMax: number;
    retryRefreshTime: number;
    storeAuthToken?: (token: string | null) => void;
    storeRefreshToken?: (token: string | null) => void;
    storeUserInfo?: (userInfo: User<T> | null) => void;
    userAuthInfo?: string;
    userCredential?: string;
    userInfoLocalStorageKey?: string;
}

export interface Credentials {
    email: string;
    password: string;
}

export declare const DEFAULT_AUTH_OPTIONS: {
    authTokenKey: string;
    refreshTokenKey: string;
    userInfoKey: string;
    userCredentialKey: string;
    passwordCredentialKey: string;
    userAuthInfo: string;
};

export interface DinoUserInfo {
    active: boolean;
    firstName: string;
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

export declare class JWTInterceptor implements HttpInterceptor {
    handleRefreshEvt: EventEmitter<[HttpRequest<any>, HttpHandler]>;
    constructor(_router: Router, _authService: AuthService, _nss: NetworkStatusService, _config: AuthServiceConfig);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<JWTInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<JWTInterceptor>;
}

export interface JwtToken {
    applicationId: string;
    aud: string;
    authenticationType: string;
    email: string;
    email_verified: boolean;
    exp: number;
    iat: number;
    iss: string;
    jti: string;
    preferred_username: string;
    roles: string[];
    sub: string;
}

export declare abstract class LoginComponent {
    loggedIn: Observable<boolean>;
    loggingIn: boolean;
    get loginError(): boolean;
    readonly loginForm: FormGroup;
    set postLogin(fn: Function);
    readonly submitDisabled: Observable<boolean>;
    constructor(_authService: AuthService, _router: Router, fb: FormBuilder, _cdr: ChangeDetectorRef);
    login(): void;
    logout(): void;
    static ɵdir: i0.ɵɵDirectiveDeclaration<LoginComponent, never, never, { "postLogin": "postLogin"; }, {}, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<LoginComponent, never>;
}

export declare type LoginResponse<T extends {
    [key: string]: any;
} = {
    [key: string]: any;
}> = {
    user: User;
    token: string;
    refreshToken: string;
} & T;

export declare class NetworkStatusService {
    readonly isOnline$: Observable<boolean>;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<NetworkStatusService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NetworkStatusService>;
}

export declare type TwoFactorDelivery = 'None' | 'TextMessage';

export declare type User<T = DinoUserInfo> = {
    id: string;
    email: string;
} & T;

export declare type UsernameStatus = 'ACTIVE' | 'PENDING' | 'REJECTED';
