import {OverlayModule} from '@angular/cdk/overlay';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_PAGINATOR_DEFAULT_OPTIONS} from '@angular/material/paginator';
import {MAT_SELECT_SCROLL_STRATEGY_PROVIDER} from '@angular/material/select';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {AreasModule} from '@dewco/core/areas';
import {AuthModule, AuthService} from '@dewco/core/auth';
import {DATA_SERVICE_CONFIG} from '@dewco/core/data';
import {
  FormData,
  FormDataManager,
  FormSchema,
  FormSchemaManager,
  FormsModule
} from '@dewco/core/forms';
// import {LocationModule} from '@dewco/core/locations';
// import {OrganizationsModule} from '@dewco/core/organizations';
// import {ProjectModule} from '@dewco/core/projects';
import {TranslateModule} from '@ngx-translate/core';
import {of as obsOf} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {E2eApp} from './e2e-app';
import {E2eAppModule} from './e2e-app/e2e-app-module';
import {FakeDataGenerator} from './fake-data-generator';
import {MaterialCollectE2eModule} from './mat-collect/collect-e2e.module';
import {MaterialDashboardE2eModule} from './mat-dashboard/dashboard-e2e.module';
import {MaterialListE2eModule} from './mat-list/list-e2e.module';
import {MaterialLoginE2eModule} from './mat-login/login-e2e-module';
import {MaterialMainE2EModule} from './mat-main/main-e2e.module';
import {additionalConfig, authConfig, paginatorConfig} from './mockconfig';
import {authErrorMessage, AuthServiceMock, syncGraphQLUrl, wsUrl} from './mocks';
import {E2E_APP_ROUTES} from './routes';
import {formDatas} from './test-ajf-formdata';
import {formSchemas} from './test-ajf-formschema';

/**
 * Only used to generate fake data for the e2e app
 */
const fakeSchemaGenerator = new FakeDataGenerator<FormSchema>();
const fakeDataGenerator = new FakeDataGenerator<FormData>();

@NgModule({
  imports: [
    AuthModule.forRoot(authConfig),
    BrowserModule,
    HttpClientModule,
    E2eAppModule,
    BrowserAnimationsModule,
    OverlayModule,
    RouterModule.forRoot(E2E_APP_ROUTES),
    MatDatepickerModule,
    MatNativeDateModule,
    TranslateModule.forRoot(),

    // Optional Metrics
    AreasModule,
    FormsModule,
    // LocationModule,
    // OrganizationsModule,
    // ProjectModule,

    // E2E demos
    MaterialDashboardE2eModule,
    MaterialCollectE2eModule,
    MaterialListE2eModule,
    MaterialLoginE2eModule,
    MaterialMainE2EModule,
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
      useValue: {
        databaseCreateOptions: {
          name: `dewco_test_db`,
          adapter: 'idb',
        },
        syncOptions: {
          url: syncGraphQLUrl,
          wsUrl: wsUrl,
          webSocketImpl: WebSocket,
          authErrorMessage: authErrorMessage,
        },
      },
    },
    MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
    {provide: MAT_PAGINATOR_DEFAULT_OPTIONS, useValue: paginatorConfig},
  ],
  bootstrap: [E2eApp],
})
export class MainModule {
  /**
   * If true, fake data is generated.
   */
  readonly generateData: boolean = additionalConfig.generateData;

  constructor(
      readonly fsm: FormSchemaManager,
      readonly fdm: FormDataManager,
  ) {
    if (this.generateData) {
      fakeSchemaGenerator.generateData(this.fsm, formSchemas)
          .pipe(
              switchMap(res => {
                if (res.success == null || res.success.length === 0) {
                  return obsOf(null);
                }
                const genSchemaId = res.success[0].id;
                for (let idx = 0; idx < formDatas.length; idx++) {
                  formDatas[idx].schema_id = genSchemaId;
                }
                return fakeDataGenerator.generateData(this.fdm, formDatas);
              }),
              )
          .subscribe(items => console.log('DATA GENERATED:', items));
    }
  }
}
