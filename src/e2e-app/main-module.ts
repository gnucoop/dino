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
import {AreasModule} from '@dino/core/areas';
import {AuthModule, AuthService} from '@dino/core/auth';
import {ConfigModule} from '@dino/core/config';
import {DATA_SERVICE_CONFIG} from '@dino/core/data';
import {
  FormData,
  FormDataManager,
  FormSchema,
  FormSchemaManager,
  FormsModule,
} from '@dino/core/forms';
import {LocationModule} from '@dino/core/locations';
import {OrganizationsModule} from '@dino/core/organizations';
import {ProjectModule} from '@dino/core/projects';
import {
  ReportData,
  ReportDataManager,
  ReportSchema,
  ReportSchemaManager,
  ReportsModule,
} from '@dino/core/reports';
import {DinoTranslationsModule} from '@dino/core/translations';
import {UserDataManager, UserGroupManager, UsersModule} from '@dino/core/users';
import * as pouchdbAdapterMemory from 'pouchdb-adapter-memory';

import {addPouchPlugin, getRxStoragePouch} from 'rxdb/plugins/pouchdb';
import {combineLatest, Observable, of as obsOf, zip} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

import {E2eApp} from './e2e-app';
import {E2eAppModule} from './e2e-app/e2e-app-module';
import {E2E_APP_ROUTES} from './routes';
import {FakeDataGenerator} from './fake-data-generator';
import {MaterialAreasE2eModule} from './mat-areas/areas-e2e.module';
import {MaterialCreateFormDataE2eModule} from './mat-create-form-data/create-form-data-e2e.module';
import {MaterialCreateReportDataE2eModule} from './mat-create-report-data/create-report-data-e2e.module';
import {MaterialDashboardE2eModule} from './mat-dashboard/dashboard-e2e.module';
import {MaterialEditFormSchemaE2eModule} from './mat-edit-form-schema/edit-form-schema-e2e.module';
import {MaterialEditFormE2eModule} from './mat-edit-form/edit-form-e2e.module';
import {MaterialFormsListE2eModule} from './mat-forms-list/forms-list-e2e.module';
import {MaterialFormsE2eModule} from './mat-forms/forms-e2e.module';
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
import {
  authErrorMessage,
  AuthServiceMock,
  syncGraphQLUrl,
  UserDataManagerMock,
  UserGroupManagerMock,
  wsUrl,
} from './mocks';
import {formDatas} from './test-ajf-formdata';
import {formSchemas} from './test-ajf-formschema';
import {reportDatas} from './test-ajf-reportdata';
import {reportSchemas} from './test-ajf-reportschema';
import {SyncModule} from '@dino/core/sync';

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
      return fakeFormSchemaGenerator.generateData(fsm, formSchemas).pipe(
        switchMap(resForm => {
          if (resForm.success[0] != null) {
            const genFormSchemaId = resForm.success[0].id;
            for (let idx = 0; idx < reportSchemas.length; idx++) {
              reportSchemas[idx].form_schema_ids.push(genFormSchemaId);
            }
            return zip(
              obsOf(resForm.success[0].id),
              fakeReportSchemaGenerator.generateData(rsm, reportSchemas),
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
            formDatas[idx].schema_id = formSchemaId;
          }
          for (let idx = 0; idx < reportDatas.length; idx++) {
            reportDatas[idx].schema_id = genReportSchemaId;
          }
          return combineLatest([
            fakeFormDataGenerator.generateData(fdm, formDatas),
            fakeReportDataGenerator.generateData(rdm, reportDatas),
          ]);
        }),
        tap(() => console.log('DATA GENERATED')),
      );
    }
    return obsOf(null);
  };
}

export function provideDataServiceConfig() {
  addPouchPlugin(pouchdbAdapterMemory);
  return {
    databaseCreateOptions: {
      name: `dino_test_db`,
      storage: getRxStoragePouch('memory'),
      ignoreDuplicate: true,
    },
    syncOptions: {
      url: syncGraphQLUrl,
      wsUrl: additionalConfig.externalAuthentication ? wsUrl : null,
      live: additionalConfig.externalAuthentication ? true : false,
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
    DinoTranslationsModule.forRoot(),
    E2eAppModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    OverlayModule,
    RouterModule.forRoot(E2E_APP_ROUTES),
    FormsModule,
    ReportsModule,
    SyncModule,
    UsersModule,

    // Optional Metrics
    optionalModulesConfig.areasModule ? AreasModule : [],
    optionalModulesConfig.locationsModule ? LocationModule : [],
    optionalModulesConfig.organizationsModule ? OrganizationsModule : [],
    optionalModulesConfig.projectsModule ? ProjectModule : [],

    // E2E demos
    MaterialAreasE2eModule,
    MaterialDashboardE2eModule,
    MaterialFormsE2eModule,
    MaterialCreateFormDataE2eModule,
    MaterialCreateReportDataE2eModule,
    MaterialEditFormE2eModule,
    MaterialEditFormSchemaE2eModule,
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
  declarations: [E2eApp],
  providers: [
    {
      provide: AuthService,
      useClass: additionalConfig.externalAuthentication ? AuthService : AuthServiceMock,
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
      deps: [FormSchemaManager, FormDataManager, ReportSchemaManager, ReportDataManager],
    },
  ],
  bootstrap: [E2eApp],
})
export class MainModule {}
