export declare const CONFIG_SERVICE_CONFIG: InjectionToken<ConfigServiceConfig>;

export declare class ConfigModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfigModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ConfigModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ConfigModule, never, never, never>;
    static forRoot(config: ConfigServiceConfig): ModuleWithProviders<ConfigModule>;
}

export declare type ConfigResponse = {
    configSets: ConfigSet[];
};

export declare class ConfigService {
    readonly config: ConfigServiceConfig;
    readonly configurationSet: BehaviorSubject<ConfigSet | null>;
    constructor(_httpClient: HttpClient, config: ConfigServiceConfig);
    getConfigs(setupFn?: ConfigTransformFunction): Observable<ConfigResponse | null>;
    resetConfigurationset(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfigService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfigService>;
}

export interface ConfigServiceConfig {
    apiUrl: string;
    configName?: string;
}

export declare type ConfigSet = {
    name: string;
    authConfig: {
        [key: string]: any;
    };
    dataConfig: {
        [key: string]: any;
    };
    additionalConfig?: {
        [key: string]: any;
    };
};

export declare type ConfigTransformFunction = (configs: any) => ConfigResponse;
