export declare const AUTH_SERVICE_CONFIG: InjectionToken<AuthServiceConfig>;

export declare class AuthGuard implements CanActivate {
    constructor(_router: Router, _authService: AuthService);
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthGuard, never>;
    static ɵprov: i0.ɵɵInjectableDef<AuthGuard>;
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
    readonly authenticated: Observable<boolean>;
    constructor(_httpClient: HttpClient, _config: AuthServiceConfig);
    checkToken(): boolean;
    getAuthToken(): string | null;
    getRefreshToken(): string | null;
    getUserInfo(): User | null;
    hasAuthToken(): boolean;
    login(credentials: Credentials): Observable<boolean>;
    logout(allDevices?: boolean): Observable<boolean>;
    refreshToken(): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthService, never>;
    static ɵprov: i0.ɵɵInjectableDef<AuthService>;
}

export interface AuthServiceConfig {
    apiKey: string;
    applicationId: string;
    authTokenLocalStorageKey?: string;
    host: string;
    loginEndpoint?: string;
    logoutEndpoint?: string;
    refreshEndpoint?: string;
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

export declare class JWTInterceptor implements HttpInterceptor {
    constructor(_authService: AuthService);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<JWTInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDef<JWTInterceptor>;
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

export interface LoginResponse extends AuthResponse {
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
