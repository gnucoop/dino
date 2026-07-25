import {OverlayModule} from '@angular/cdk/overlay';
import {ServiceWorkerModule} from '@angular/service-worker';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {
  APP_INITIALIZER,
  ErrorHandler,
  Inject,
  inject,
  isDevMode,
  NgModule,
  Optional,
} from '@angular/core';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_PAGINATOR_DEFAULT_OPTIONS} from '@angular/material/paginator';
import {MAT_SELECT_SCROLL_STRATEGY_PROVIDER} from '@angular/material/select';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AreaManager, AreasModule as DinoAreasModule} from '@dino/core/areas';
import {CaseManager, CasesModule as DinoCasesModule} from '@dino/core/cases';
import {AuthModule as DinoAuthModule, AuthService, JWTInterceptor} from '@dino/core/auth';
import {ConfigModule as DinoConfigModule} from '@dino/core/config';
import {BrowserDetectorService} from '@dino/material/browser-detector';
import {
  DATA_SERVICE,
  DataModule,
  DataService,
  DataServiceConfig,
  IDataService,
  OnlineDataService,
  PANDINO_SERVICE_CONFIG,
  PandinoConfig,
  PermissionContextService,
} from '@dino/core/data';
import {
  FormDataManager,
  FormSchemaDepsManager,
  FormSchemaManager,
  FormsModule as DinoFormsModule,
} from '@dino/core/forms';
import {LangManager} from '@dino/core/langs';
import {FiltersService} from '@dino/core/list';
import {LocationManager, LocationModule as DinoLocationModule} from '@dino/core/locations';
import {LogModule as DinoLogModule} from '@dino/core/logs';
import {NotificationManager, NotificationModule as DinoNotificationModule} from '@dino/core/notifications';
import {OrganizationManager, OrganizationsModule as DinoOrganizationsModule} from '@dino/core/organizations';
import {ProjectManager, ProjectModule as DinoProjectModule} from '@dino/core/projects';
import {
  ReportDataManager,
  ReportSchemaManager,
  ReportsModule as DinoReportsModule,
} from '@dino/core/reports';
import {DinoTranslationsModule} from '@dino/core/translations';
import {CoreModule as DinoMaterialThemingModule} from '@dino/material/core';
import {StripePaymentModule as DinoStripePaymentModule} from '@dino/material/stripe-payment';
import {UserDataManager, UserGroupManager, UsersModule as DinoUsersModule} from '@dino/core/users';
import {UserInteractionsModule as DinoUserInteractionsModule} from '@dino/material/user-interactions';
import {getRxStorageDexie} from 'rxdb/plugins/storage-dexie';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';
import {
  AuthServiceMock,
  DataServiceMock,
  PermissionContextServiceMock,
  UserGroupManagerMock,
  UserDataManagerMock,
} from 'src/testing/mock-services';
import {initializeApp as initializeE2eApp} from 'src/testing/fake-data-initializer';

import {environment} from 'src/environments/environment';
import {SyncModule as DinoSyncModule, SyncManager} from '@dino/core/sync';
import {DinoRoutingModule} from './dino-routing.module';
import {provideApollo} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';
import {DinoComponent} from './dino.component';
import {MainNavModule} from './main-nav/main-nav.module';
import {
  distinctUntilKeyChanged,
  filter,
  skipWhile,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import {of as obsOf} from 'rxjs';
import {ColorPickerModule} from 'ngx-color-picker';
import {
  AuthServiceBackendless,
  PermissionContextServiceBackendless,
  UserDataManagerBackendless,
  UserGroupManagerBackendless,
} from './backendless-services';
import {AppInstallService} from './install-app/services/app-install.service';
import {InstallAppModule} from './install-app/install-app.module';
import {AjfFormsModule} from '@ajf/material/forms';
import {AjfTranslocoModule, TranslocoService} from '@ajf/core/transloco';
import {AjfEchartsModule} from '@ajf/core/echarts';
import {AjfValidationService} from '@ajf/core/forms';
import {NetworkStatusModule} from './network-status/network-status.module';
import {ActionsService} from './actions.service';
import {MatIconRegistry} from '@angular/material/icon';
import {AppUpdateService} from './install-app/services/app-update.service';
import {ErrorHandlerService} from './error-handler.service';
import {ajfCommonFunctions} from 'src/ajf-functions/ajf-functions.common';
import {ajfCustomFunctions} from 'src/ajf-functions/ajf-functions.custom';
import {TourMatMenuModule} from 'ngx-ui-tour-md-menu';
import {UI_TOUR_SERVICE_CONFIG, UITourConfig} from '@dino/material/ui-tour-service';

const initializer = (installService: AppInstallService, updateService: AppUpdateService) => () => {
  if (environment.installable) {
    installService.initPwaPrompt();
    updateService.checkForUpdates();
  }
};

const svgIconsList: string[] = [];

if (environment.customImagesConfig && environment.customSvgIcons) {
  svgIconsList.push(...Object.values(environment.customSvgIcons));
}

export function provideDataServiceConfig() {
  const liveSync = environment.dataConfig.live != null ? environment.dataConfig.live : true;
  return {
    databaseCreateOptions: {
      name: environment.dataConfig.instanceName,
      storage: environment.e2eConfig?.enabled ? getRxStorageMemory() : getRxStorageDexie(),
      multiInstance: false,
    },
    syncOptions: {
      url: {
        http: environment.dataConfig.syncGraphQLUrl,
        ws: environment.dataConfig.backendless ? null : environment.dataConfig.wsUrl,
      },
      wsUrl: environment.dataConfig.backendless ? null : environment.dataConfig.wsUrl,
      live: liveSync && !environment.dataConfig.backendless,
      webSocketImpl: WebSocket,
      authErrorMessage: environment.dataConfig.authErrorMessage,
      socketJwtExpiredCode: environment.dataConfig.socketJwtExpiredCode,
      backendless: environment.dataConfig.backendless ?? false,
      dataMode: environment.dataConfig.dataMode ?? 'offline',
    },
  } as unknown as DataServiceConfig;
}

export function providePandinoConfig(): PandinoConfig {
  return {
    pandinoUrl: environment.pandinoConfig.pandinoUrl,
    pandinoGptNamespaces: environment.pandinoConfig.pandinoGptNamespaces,
  };
}

export function provideUITourConfig(): UITourConfig | undefined {
  return environment.layoutConfig.uiTourConfig;
}

export function provideMatDateLocale(ts: TranslocoService) {
  if (ts) {
    const lang = ts.getActiveLang();
    switch (lang) {
      case 'ESP':
        return 'es-ES';
      case 'FRA':
        return 'fr-FR';
      case 'ITA':
        return 'it-IT';
      case 'PRT':
        return 'pt-PT';
      default:
        return 'en-US';
    }
  } else {
    return 'en-US';
  }
}

@NgModule({
  declarations: [DinoComponent],
  bootstrap: [DinoComponent],
  imports: [
    AjfFormsModule.forRoot(),
    AjfTranslocoModule.forRoot({
      reRenderOnLangChange: true,
      availableLangs: environment.languageConfig.availableLanguages ?? [
        'ITA',
        'ENG',
        'FRA',
        'PRT',
        'ESP',
      ],
    }),
    AjfEchartsModule.forRoot({echarts: () => import('echarts')}),
    ColorPickerModule,
    DinoAuthModule.forRoot(environment.authConfig),
    environment.dataConfig.dynamicBackend
      ? DinoConfigModule.forRoot({apiUrl: environment.dataConfig.dynamicBackendapiUrl})
      : [],
    DataModule.forRoot(provideDataServiceConfig()),
    DinoRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    InstallAppModule,
    MainNavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NetworkStatusModule.forRoot(),
    OverlayModule,
    DinoTranslationsModule.forRoot({
      defaultLanguage: environment.languageConfig.defaultLanguage ?? 'ENG',
    }),
    DinoFormsModule,
    DinoNotificationModule,
    DinoReportsModule,
    DinoSyncModule,
    DinoUsersModule,
    DinoUserInteractionsModule,
    DinoMaterialThemingModule.forRoot(
      environment.themeConfig
        ? {
            theme: {
              primary: environment.themeConfig.primary,
              accent: environment.themeConfig.accent,
              warn: environment.themeConfig.warning,
              isAutoContrast: environment.themeConfig.isAutoContrast,
              isDarkTheme: environment.themeConfig.isDarkTheme,
            },
          }
        : {
            theme: {isAutoContrast: true, isDarkTheme: false},
          },
    ),
    TourMatMenuModule,
    // Optional Metrics
    environment.optionalModulesConfig.areasModule ? DinoAreasModule : [],
    environment.optionalModulesConfig.caseModule ? DinoCasesModule : [],
    environment.optionalModulesConfig.locationsModule ? DinoLocationModule : [],
    environment.optionalModulesConfig.organizationsModule ? DinoOrganizationsModule : [],
    environment.optionalModulesConfig.projectsModule ? DinoProjectModule : [],
    // Optional Modules
    environment.optionalModulesConfig.logsModule ? DinoLogModule : [],
    environment.optionalModulesConfig.stripePaymentModule
      ? DinoStripePaymentModule.forRoot(environment.stripePaymentConfig)
      : [],
    // PWA Installability and service worker registration
    environment.installable
      ? ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: environment.installable,
          registrationStrategy: 'registerImmediately',
        })
      : [],
  ],
  providers: [
    AppInstallService,
    AppUpdateService,
    BrowserDetectorService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      deps: [AppInstallService, AppUpdateService],
      multi: true,
    },
    ...(environment.e2eConfig?.enabled
      ? [
          {
            provide: APP_INITIALIZER,
            useFactory: (
              ds: DataService,
              fsm: FormSchemaManager,
              fdm: FormDataManager,
              pm: ProjectManager,
              rsm: ReportSchemaManager,
              rdm: ReportDataManager,
              fsdm: FormSchemaDepsManager,
              ugm: UserGroupManager,
              udm: UserDataManager,
              nm: NotificationManager,
              am: AreaManager | null,
              cm: CaseManager | null,
              lm: LocationManager | null,
              om: OrganizationManager | null,
            ) => initializeE2eApp(ds, fsm, fdm, pm, rsm, rdm, fsdm, ugm, udm, nm, am, cm, lm, om),
            deps: [
              DataService,
              FormSchemaManager,
              FormDataManager,
              ProjectManager,
              ReportSchemaManager,
              ReportDataManager,
              FormSchemaDepsManager,
              UserGroupManager,
              UserDataManager,
              NotificationManager,
              // Managers of optional modules: null when the module is disabled
              [new Optional(), AreaManager],
              [new Optional(), CaseManager],
              [new Optional(), LocationManager],
              [new Optional(), OrganizationManager],
            ],
            multi: true,
          },
        ]
      : []),
    {
      provide: PANDINO_SERVICE_CONFIG,
      useFactory: providePandinoConfig,
    },
    {
      provide: UI_TOUR_SERVICE_CONFIG,
      useFactory: provideUITourConfig,
    },
    {
      provide: TourMatMenuModule,
      useValue: environment.layoutConfig.uiTourConfig ? TourMatMenuModule : null,
    },
    {
      provide: AuthService,
      useClass: environment.e2eConfig?.enabled
        ? AuthServiceMock
        : environment.dataConfig.backendless
        ? AuthServiceBackendless
        : AuthService,
    },
    {
      provide: DataService,
      useClass: environment.e2eConfig?.enabled ? DataServiceMock : DataService,
    },
    // The active data service, selected once for the whole app. Managers inject
    // DATA_SERVICE (not a concrete class), so the same manager class runs over
    // either the offline RxDB DataService or the online Apollo OnlineDataService.
    // 'offline' (default) aliases the DataService token, preserving the existing
    // e2e/backendless swaps above.
    {
      provide: DATA_SERVICE,
      useExisting:
        environment.dataConfig.dataMode === 'online' ? OnlineDataService : DataService,
    },
    {
      provide: UserGroupManager,
      useClass: environment.e2eConfig?.enabled
        ? UserGroupManagerMock
        : environment.dataConfig.backendless
        ? UserGroupManagerBackendless
        : UserGroupManager,
    },
    {
      provide: UserDataManager,
      useClass: environment.e2eConfig?.enabled
        ? UserDataManagerMock
        : environment.dataConfig.backendless
        ? UserDataManagerBackendless
        : UserDataManager,
    },
    {
      provide: PermissionContextService,
      useClass: environment.e2eConfig?.enabled
        ? PermissionContextServiceMock
        : environment.dataConfig.backendless
        ? PermissionContextServiceBackendless
        : PermissionContextService,
    },
    FiltersService,
    {provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true},
    MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
    {
      provide: MAT_PAGINATOR_DEFAULT_OPTIONS,
      useValue: {
        pageSize: environment.layoutConfig.pageSize,
        pageSizeOptions: environment.layoutConfig.pageSizeOptions,
      },
    },
    {provide: ErrorHandler, useClass: ErrorHandlerService},
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      return {
        cache: new InMemoryCache(),
        link: httpLink.create({uri: environment.dataConfig.syncGraphQLUrl}),
      };
    }),
    {
      provide: MAT_DATE_LOCALE,
      useFactory: (ts: TranslocoService) => provideMatDateLocale(ts),
      deps: [TranslocoService],
    },
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {
  constructor(
    private _sync: SyncManager,
    private _auth: AuthService,
    @Inject(DATA_SERVICE) private _ds: IDataService,
    private _pcs: PermissionContextService,
    private _lm: LangManager,
    private _as: ActionsService,
    private _validationService: AjfValidationService,
    private _iconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer,
  ) {
    this._iconRegistry.addSvgIconSet(
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/fonts/humanitarian-icons-set.svg',
      ),
    );

    svgIconsList.forEach(itm => {
      this._iconRegistry.addSvgIcon(
        itm,
        this._domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/svg/${itm}.svg`),
      );
    });

    this._as.initManagers(this._sync.managers);

    this._auth.authenticated
      .pipe(
        skipWhile(authEvt => !authEvt.auth),
        distinctUntilKeyChanged('evt'),
        filter(
          authEvt =>
            authEvt.auth === true &&
            authEvt.evt != 'back online' &&
            authEvt.evt != 'gone offline' &&
            authEvt.evt != 'refresh successful',
        ),
        tap(authEvt => {
          if (isDevMode()) {
            console.log(authEvt);
          }
        }),
        switchMap(authEvt =>
          this._sync.initializeMainCollections().pipe(withLatestFrom(obsOf(authEvt))),
        ),
      )
      .subscribe(([_, authEvent]) => {
        if (
          !environment.dataConfig.backendless &&
          (environment.dataConfig.live ||
            environment.dataConfig.live === undefined ||
            environment.dataConfig.initializationScreenMaxDuration) &&
          authEvent.evt === 'login'
        ) {
          this._ds.collectionsInitialized.emit('started');
        }
      });

    this._auth.authenticated
      .pipe(
        skipWhile(authEvt => !authEvt.auth),
        distinctUntilKeyChanged('evt'),
        filter(
          authEvt =>
            authEvt.auth === true &&
            authEvt.evt != 'back online' &&
            authEvt.evt != 'gone offline' &&
            authEvt.evt != 'refresh successful',
        ),
        tap(authEvt => {
          if (isDevMode()) {
            console.log(authEvt);
          }
        }),
        switchMap(authEvt =>
          this._pcs.fullContext.pipe(
            filter(ctx => ctx != null),
            switchMap(() =>
              this._sync.initializeContextualCollections().pipe(withLatestFrom(obsOf(authEvt))),
            ),
          ),
        ),
      )
      .subscribe(([_, authEvent]) => {
        if (
          !environment.dataConfig.backendless &&
          (environment.dataConfig.live ||
            environment.dataConfig.live === undefined ||
            environment.dataConfig.initializationScreenMaxDuration) &&
          authEvent.evt === 'login'
        ) {
          this._ds.collectionsInitialized.emit('completed');
        } else if (
          !environment.dataConfig.backendless &&
          environment.dataConfig.live == false &&
          !environment.dataConfig.initializationScreenMaxDuration
        ) {
          this._ds.collectionsInitialized.emit('completed');
        }
        this._lm.loadDinoLangs();
      });

    if (ajfCommonFunctions) {
      Object.keys(ajfCommonFunctions).forEach(fnName => {
        this._validationService.addFunctionHandler(fnName, ajfCommonFunctions[fnName]);
      });
    }
    if (ajfCustomFunctions) {
      Object.keys(ajfCustomFunctions).forEach(fnName => {
        this._validationService.addFunctionHandler(fnName, ajfCustomFunctions[fnName]);
      });
    }
  }
}
