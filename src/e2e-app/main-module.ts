import {OverlayModule} from '@angular/cdk/overlay';
import {HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_PAGINATOR_DEFAULT_OPTIONS} from '@angular/material/paginator';
import {MAT_SELECT_SCROLL_STRATEGY_PROVIDER} from '@angular/material/select';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {AreasModule} from '@dewco/core/areas';
import {AuthModule, AuthService} from '@dewco/core/auth';
import {ConfigModule} from '@dewco/core/config';
import {DATA_SERVICE_CONFIG} from '@dewco/core/data';
import {
  FormData,
  FormDataManager,
  FormSchema,
  FormSchemaManager,
  FormsModule,
} from '@dewco/core/forms';
import {LocationModule} from '@dewco/core/locations';
import {OrganizationsModule} from '@dewco/core/organizations';
import {ProjectModule} from '@dewco/core/projects';
import {
  ReportData,
  ReportDataManager,
  ReportSchema,
  ReportSchemaManager,
  ReportsModule
} from '@dewco/core/reports';
import {DewcoTranslationsModule} from '@dewco/core/translations';
import {UsersModule} from '@dewco/core/users';
import * as pouchdbAdapterMemory from 'pouchdb-adapter-memory';
import {addPouchPlugin, getRxStoragePouch} from 'rxdb/plugins/pouchdb';
import {combineLatest, Observable, of as obsOf} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

import {E2eApp} from './e2e-app';
import {E2eAppModule} from './e2e-app/e2e-app-module';
import {FakeDataGenerator} from './fake-data-generator';
import {MaterialAreasE2eModule} from './mat-areas/areas-e2e.module';
import {MaterialCreateE2eModule} from './mat-create/create-e2e.module';
import {MaterialDashboardE2eModule} from './mat-dashboard/dashboard-e2e.module';
import {MaterialEditE2eModule} from './mat-edit/edit-e2e.module';
import {MaterialFormsListE2eModule} from './mat-forms-list/forms-list-e2e.module';
import {MaterialCollectE2eModule} from './mat-forms/collect-e2e.module';
import {MaterialGroupsE2eModule} from './mat-groups/groups-e2e.module';
import {MaterialLocationsE2eModule} from './mat-locations/locations-e2e.module';
import {MaterialLoginE2eModule} from './mat-login/login-e2e-module';
import {MaterialMainE2EModule} from './mat-main/main-e2e.module';
import {MaterialMetricsE2eModule} from './mat-metrics/metrics-e2e.module';
import {MaterialOrganizationsE2eModule} from './mat-organizations/organizations-e2e.module';
import {MaterialProjectsE2eModule} from './mat-projects/projects-e2e.module';
import {MaterialReportsListE2eModule} from './mat-reports-list/reports-list-e2e.module';
import {MaterialUsersE2eModule} from './mat-users/users-e2e.module';
import {
  additionalConfig,
  authConfig,
  configurationConfig,
  optionalModulesConfig,
  paginatorConfig,
} from './mockconfig';
import {authErrorMessage, AuthServiceMock, syncGraphQLUrl, wsUrl} from './mocks';
import {E2E_APP_ROUTES} from './routes';
import {formDatas} from './test-ajf-formdata';
import {formSchemas} from './test-ajf-formschema';
import {reportDatas} from './test-ajf-reportdata'
import {reportSchemas} from './test-ajf-reportschema';

/**
 * Used to generate fake data for the e2e app
 */
const fakeFormSchemaGenerator = new FakeDataGenerator<FormSchema>();
const fakeFormDataGenerator = new FakeDataGenerator<FormData>();
const fakeReportSchemaGenerator = new FakeDataGenerator<ReportSchema>();
const fakeReportDataGenerator = new FakeDataGenerator<ReportData>();

export function initializeApp(
    fsm: FormSchemaManager,
    fdm: FormDataManager,
    rsm: ReportSchemaManager,
    rdm: ReportDataManager,
    ): () => Observable<any> {
  return () => {
    if (additionalConfig.generateData) {
      return combineLatest([
               fakeFormSchemaGenerator.generateData(fsm, formSchemas),
               fakeReportSchemaGenerator.generateData(rsm, reportSchemas)
             ])
          .pipe(
              switchMap(([resForm, resReport]) => {
                if (resForm.success == null || resForm.success.length === 0 ||
                    resReport.success == null || resReport.success.length === 0) {
                  return obsOf(null);
                }
                const genFormSchemaId = resForm.success[0].id;
                const genReportSchemaId = resReport.success[0].id;
                for (let idx = 0; idx < formDatas.length; idx++) {
                  formDatas[idx].schema_id = genFormSchemaId;
                }
                for (let idx = 0; idx < reportDatas.length; idx++) {
                  reportDatas[idx].schema_id = genReportSchemaId;
                }
                return combineLatest([
                  fakeFormDataGenerator.generateData(fdm, formDatas),
                  fakeReportDataGenerator.generateData(rdm, reportDatas)
                ]);
              }),
              tap(items => console.log('DATA GENERATED:', items)),
          );
    }
    return obsOf(null);
  };
}

export function provideDataServiceConfig() {
  addPouchPlugin(pouchdbAdapterMemory);
  return {
    databaseCreateOptions: {
      name: `dewco_test_db`,
      storage: getRxStoragePouch('memory'),
      ignoreDuplicate: true,
    },
    syncOptions: {
      url: syncGraphQLUrl,
      wsUrl: wsUrl,
      webSocketImpl: WebSocket,
      authErrorMessage: authErrorMessage,
    },
  };
}

@NgModule({
  imports: [
    AuthModule.forRoot(authConfig),
    BrowserAnimationsModule,
    additionalConfig.dynamicConfiguration ? ConfigModule.forRoot(configurationConfig) : [],
    BrowserModule,
    DewcoTranslationsModule.forRoot(),
    E2eAppModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    OverlayModule,
    RouterModule.forRoot(E2E_APP_ROUTES),
    FormsModule,
    ReportsModule,
    UsersModule,

    // Optional Metrics
    optionalModulesConfig.areasModule ? AreasModule : [],
    optionalModulesConfig.locationsModule ? LocationModule : [],
    optionalModulesConfig.organizationsModule ? OrganizationsModule : [],
    optionalModulesConfig.projectsModule ? ProjectModule : [],

    // E2E demos
    MaterialAreasE2eModule,
    MaterialDashboardE2eModule,
    MaterialCollectE2eModule,
    MaterialCreateE2eModule,
    MaterialEditE2eModule,
    MaterialGroupsE2eModule,
    MaterialFormsListE2eModule,
    MaterialReportsListE2eModule,
    MaterialLocationsE2eModule,
    MaterialLoginE2eModule,
    MaterialMainE2EModule,
    MaterialMetricsE2eModule,
    MaterialOrganizationsE2eModule,
    MaterialProjectsE2eModule,
    MaterialUsersE2eModule,
  ],
  declarations: [
    E2eApp,
  ],
  providers: [
    {
      provide: AuthService,
      useClass: additionalConfig.externalAuthentication ? AuthService : AuthServiceMock,
    },
    {
      provide: DATA_SERVICE_CONFIG,
      useFactory: provideDataServiceConfig,
    },
    MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
    {provide: MAT_PAGINATOR_DEFAULT_OPTIONS, useValue: paginatorConfig},
    {
      provide: APP_INITIALIZER,
      useFactory: (
          fsm: FormSchemaManager,
          fdm: FormDataManager,
          rsm: ReportSchemaManager,
          rdm: ReportDataManager,
          ) => initializeApp(fsm, fdm, rsm, rdm),
      multi: true,
      deps: [
        FormSchemaManager,
        FormDataManager,
        ReportSchemaManager,
        ReportDataManager,
      ],
    },
  ],
  bootstrap: [E2eApp],
})
export class MainModule {
}
