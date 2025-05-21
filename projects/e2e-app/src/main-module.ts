import {AjfTranslocoModule, TranslocoService} from '@ajf/core/transloco';
import {AjfEchartsModule} from '@ajf/core/echarts';
import {OverlayModule} from '@angular/cdk/overlay';
import {HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_PAGINATOR_DEFAULT_OPTIONS} from '@angular/material/paginator';
import {MAT_SELECT_SCROLL_STRATEGY_PROVIDER} from '@angular/material/select';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AreasModule} from '@dino/core/areas';
import {AuthModule, AuthService} from '@dino/core/auth';
import {CasesModule} from '@dino/core/cases';
import {ConfigModule} from '@dino/core/config';
import {
  DATA_SERVICE_CONFIG,
  DataService,
  PANDINO_SERVICE_CONFIG,
  PandinoConfig,
  PermissionContextService,
} from '@dino/core/data';
import {
  FormData,
  FormDataManager,
  FormSchema,
  FormSchemaManager,
  FormsModule,
} from '@dino/core/forms';
import {LocationModule} from '@dino/core/locations';
import {NotificationModule} from '@dino/core/notifications';
import {OrganizationsModule} from '@dino/core/organizations';
import {Project, ProjectManager, ProjectModule} from '@dino/core/projects';
import {LogModule} from '@dino/core/logs';
import {
  ReportData,
  ReportDataManager,
  ReportSchema,
  ReportSchemaManager,
  ReportsModule,
} from '@dino/core/reports';
import {SyncModule} from '@dino/core/sync';
import {DinoTranslationsModule} from '@dino/core/translations';
import {UserDataManager, UserGroupManager, UsersModule} from '@dino/core/users';
import {CoreModule as DinoMaterialThemingModule} from '@dino/material/core';
import {EditReportSchemaModule} from '@dino/material/edit-report-schema';
import {BrowserDetectorService} from '@dino/material/browser-detector';

import {getRxStorageDexie} from 'rxdb/plugins/storage-dexie';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';
import {combineLatest, Observable, of as obsOf, throwError, zip} from 'rxjs';
import {catchError, switchMap, take, tap} from 'rxjs/operators';

import {ColorPickerModule} from 'ngx-color-picker';

import {E2eApp} from './e2e-app';
import {E2eAppModule} from './e2e-app/e2e-app-module';
import {FakeDataGenerator} from './fake-data-generator';
import {MaterialAggregationListE2eModule} from './mat-aggregation/aggregation-list-e2e.module';
import {MaterialAreasE2eModule} from './mat-areas/areas-e2e.module';
import {MaterialCasesE2eModule} from './mat-cases/cases-e2e.module';
import {MaterialCreateFormDataE2eModule} from './mat-create-form-data/create-form-data-e2e.module';
import {MaterialCreateReportDataE2eModule} from './mat-create-report-data/create-report-data-e2e.module';
import {MaterialDashboardE2eModule} from './mat-dashboard/dashboard-e2e.module';
import {MaterialEditFormSchemaE2eModule} from './mat-edit-form-schema/edit-form-schema-e2e.module';
import {MaterialEditFormE2eModule} from './mat-edit-form/edit-form-e2e.module';
import {MaterialEditReportE2eModule} from './mat-edit-report/edit-report-e2e.module';
import {MaterialEditReportSchemaE2eModule} from './mat-edit-report-schema/edit-report-schema-e2e.module';
import {MaterialFormsListE2eModule} from './mat-forms-list/forms-list-e2e.module';
import {MaterialFormsMapE2eModule} from './mat-forms-map/forms-map-e2e.module';
import {MaterialFormsE2eModule} from './mat-forms/forms-e2e.module';
import {MaterialGroupsE2eModule} from './mat-groups/groups-e2e.module';
import {MaterialLangsE2eModule} from './mat-langs/langs-e2e.module';
import {MaterialLocationsE2eModule} from './mat-locations/locations-e2e.module';
import {MaterialLoginE2eModule} from './mat-login/login-e2e.module';
import {MaterialMainE2EModule} from './mat-main/main-e2e.module';
import {MaterialUsersManageE2eModule} from './mat-manage-users/users-manage-e2e.module';
import {MaterialMetricsE2eModule} from './mat-metrics/metrics-e2e.module';
import {MaterialOrganizationsE2eModule} from './mat-organizations/organizations-e2e.module';
import {MaterialProjectsE2eModule} from './mat-projects/projects-e2e.module';
import {MaterialReportsE2eModule} from './mat-reports/reports-e2e.module';
import {MaterialReportsListE2eModule} from './mat-reports-list/reports-list-e2e.module';
import {MaterialUsersE2eModule} from './mat-users/users-e2e.module';
import {
  additionalConfig,
  authConfig,
  availableLanguagesConfig,
  configurationConfig,
  defaultLanguageConfig,
  optionalModulesConfig,
  paginatorConfig,
  pandinoConfig,
  stripePaymentConfig,
  uiTourConfig,
} from './mockconfig';
import {
  authErrorMessage,
  AuthServiceMock,
  live,
  socketJwtExpiredCode,
  syncGraphQLUrl,
  UserDataManagerMock,
  UserGroupManagerMock,
  wsUrl,
  instanceName,
  PermissionContextServiceMock,
  DataServiceMock,
} from './mocks';
import {formDatas} from './test-ajf-formdata';
import {formSchemas} from './test-ajf-formschema';
import {reportDatas} from './test-ajf-reportdata';
import {reportSchemas} from './test-ajf-reportschema';
import {projects} from './test-projects';
import {DinoRoutingModule} from './main.routing.module';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';

import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {MatIconRegistry} from '@angular/material/icon';
import {StripePaymentModule} from '@dino/material/stripe-payment';
import {TourMatMenuModule} from 'ngx-ui-tour-md-menu';
import {UI_TOUR_SERVICE_CONFIG, UITourConfig} from '@dino/material/ui-tour-service';

/**
 * Used to generate fake data for the e2e app
 */
const fakeFormSchemaGenerator = new FakeDataGenerator<FormSchema>();
const fakeFormDataGenerator = new FakeDataGenerator<FormData>();
const fakeProjectsGenerator = new FakeDataGenerator<Project>();
const fakeReportSchemaGenerator = new FakeDataGenerator<ReportSchema>();
const fakeReportDataGenerator = new FakeDataGenerator<ReportData>();

export function initializeApp(
  ds: DataService,
  fsm: FormSchemaManager,
  fdm: FormDataManager,
  pm: ProjectManager,
  rsm: ReportSchemaManager,
  rdm: ReportDataManager,
): () => Observable<any> {
  return () => {
    if (additionalConfig.generateData) {
      combineLatest([fsm.init(), fdm.init(), pm.init(), rsm.init(), rdm.init()])
        .pipe(take(1))
        .subscribe();

      return fakeProjectsGenerator.generateData(ds, pm, projects).pipe(
        switchMap(() => {
          return fakeFormSchemaGenerator.generateData(ds, fsm, formSchemas);
        }),
        switchMap(resForm => {
          if (resForm.success[0] != null) {
            const genFormSchemaId = resForm.success[0].id;
            for (let idx = 0; idx < reportSchemas.length; idx++) {
              reportSchemas[idx].form_schema_ids.push(genFormSchemaId);
            }
            return zip(
              obsOf(resForm.success[0].id),
              fakeReportSchemaGenerator.generateData(ds, rsm, reportSchemas),
            );
          }
          return obsOf([null, null]);
        }),
        switchMap(([formSchemaId, resReport]) => {
          if (
            formSchemaId == null ||
            resReport == null ||
            resReport.success == null ||
            resReport.success.length === 0
          ) {
            return obsOf(null);
          }
          const genReportSchemaId = resReport.success[0].id;

          for (let idx = 0; idx < formDatas.length; idx++) {
            formDatas[idx].form_schema_ref_id = formSchemaId;
          }
          for (let idx = 0; idx < reportDatas.length; idx++) {
            reportDatas[idx].report_schema_ref_id = genReportSchemaId;
          }
          return combineLatest([
            fakeFormDataGenerator.generateData(ds, fdm, formDatas),
            fakeReportDataGenerator.generateData(ds, rdm, reportDatas),
          ]);
        }),
        tap(() => console.log('DATA GENERATED')),
        catchError(err => {
          console.log(err);
          return throwError(() => new Error(err));
        }),
      );
    }
    return obsOf(null);
  };
}

export function provideDataServiceConfig() {
  return {
    databaseCreateOptions: {
      name: `${instanceName}_db`,
      storage: getRxStorageMemory(),
      // storage: getRxStorageDexie(),
      multiInstance: false,
    },
    syncOptions: {
      url: {
        http: syncGraphQLUrl,
        ws: additionalConfig.externalAuthentication ? wsUrl : null,
      },
      live: live,
      webSocketImpl: WebSocket,
      authErrorMessage: authErrorMessage,
      socketJwtExpiredCode: socketJwtExpiredCode,
      retrySyncMaxAttempts: 3,
    },
  };
}

export function providePandinoConfig(): PandinoConfig {
  return {
    pandinoUrl: pandinoConfig.pandinoUrl,
    pandinoGptNamespaces: pandinoConfig.pandinoGptNamespaces,
  };
}

export function provideUITourConfig(): UITourConfig {
  return uiTourConfig;
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
  imports: [
    AjfTranslocoModule.forRoot({
      reRenderOnLangChange: true,
      availableLangs: availableLanguagesConfig,
    }),
    AjfEchartsModule.forRoot({echarts: () => import('echarts')}),
    AuthModule.forRoot(authConfig),
    BrowserAnimationsModule,
    additionalConfig.dynamicConfiguration ? ConfigModule.forRoot(configurationConfig) : [],
    BrowserModule,
    ColorPickerModule,
    DinoTranslationsModule.forRoot(defaultLanguageConfig),
    E2eAppModule,
    EditReportSchemaModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    OverlayModule,
    DinoRoutingModule,
    FormsModule,
    NotificationModule,
    ReportsModule,
    SyncModule,
    TourMatMenuModule,
    UsersModule,
    DinoMaterialThemingModule.forRoot({
      theme: {
        isAutoContrast: true,
        isDarkTheme: false,
      },
    }),

    // Optional Metrics
    optionalModulesConfig.areasModule ? AreasModule : [],
    optionalModulesConfig.casesModule ? CasesModule : [],
    optionalModulesConfig.locationsModule ? LocationModule : [],
    optionalModulesConfig.organizationsModule ? OrganizationsModule : [],
    optionalModulesConfig.projectsModule ? ProjectModule : [],

    // Optional Modules
    optionalModulesConfig.logsModule ? LogModule : [],
    optionalModulesConfig.stripeModule ? StripePaymentModule.forRoot(stripePaymentConfig) : [],

    // E2E demos
    MaterialAggregationListE2eModule,
    MaterialAreasE2eModule,
    MaterialCasesE2eModule,
    MaterialCreateFormDataE2eModule,
    MaterialCreateReportDataE2eModule,
    MaterialDashboardE2eModule,
    MaterialFormsE2eModule,
    MaterialEditFormE2eModule,
    MaterialEditFormSchemaE2eModule,
    MaterialEditReportE2eModule,
    MaterialEditReportSchemaE2eModule,
    MaterialGroupsE2eModule,
    MaterialFormsListE2eModule,
    MaterialFormsMapE2eModule,
    MaterialLangsE2eModule,
    MaterialLocationsE2eModule,
    MaterialLoginE2eModule,
    MaterialMainE2EModule,
    MaterialMetricsE2eModule,
    MaterialOrganizationsE2eModule,
    MaterialProjectsE2eModule,
    MaterialReportsE2eModule,
    MaterialReportsListE2eModule,
    MaterialUsersE2eModule,
    MaterialUsersManageE2eModule,
  ],
  declarations: [E2eApp],
  providers: [
    BrowserDetectorService,
    {
      provide: AuthService,
      useClass: additionalConfig.externalAuthentication ? AuthService : AuthServiceMock,
    },
    {
      provide: DataService,
      useClass: additionalConfig.externalAuthentication ? DataService : DataServiceMock,
    },
    {
      provide: UserGroupManager,
      useClass: additionalConfig.externalAuthentication ? UserGroupManager : UserGroupManagerMock,
    },
    {
      provide: UserDataManager,
      useClass: additionalConfig.externalAuthentication ? UserDataManager : UserDataManagerMock,
    },
    {
      provide: PermissionContextService,
      useClass: additionalConfig.externalAuthentication
        ? PermissionContextService
        : PermissionContextServiceMock,
    },
    {
      provide: PANDINO_SERVICE_CONFIG,
      useFactory: providePandinoConfig,
    },
    {
      provide: UI_TOUR_SERVICE_CONFIG,
      useFactory: provideUITourConfig,
    },
    {
      provide: DATA_SERVICE_CONFIG,
      useFactory: provideDataServiceConfig,
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink): ApolloClientOptions<any> => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({uri: syncGraphQLUrl}),
        };
      },
      deps: [HttpLink],
    },
    {
      provide: MAT_DATE_LOCALE,
      useFactory: (ts: TranslocoService) => provideMatDateLocale(ts),
      deps: [TranslocoService],
    },
    MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
    {provide: MAT_PAGINATOR_DEFAULT_OPTIONS, useValue: paginatorConfig},
    {
      provide: APP_INITIALIZER,
      useFactory: (
        ds: DataService,
        fsm: FormSchemaManager,
        fdm: FormDataManager,
        pm: ProjectManager,
        rsm: ReportSchemaManager,
        rdm: ReportDataManager,
      ) => initializeApp(ds, fsm, fdm, pm, rsm, rdm),
      multi: true,
      deps: [
        DataService,
        FormSchemaManager,
        FormDataManager,
        ProjectManager,
        ReportSchemaManager,
        ReportDataManager,
      ],
    },
  ],
  bootstrap: [E2eApp],
})
export class MainModule {
  constructor(private _iconRegistry: MatIconRegistry, private _domSanitizer: DomSanitizer) {
    this._iconRegistry.addSvgIconSet(
      this._domSanitizer.bypassSecurityTrustResourceUrl('./assets/humanitarian-icons-set.svg'),
    );
  }
}
