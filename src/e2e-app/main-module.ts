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
import {AuthModule, AuthService} from '@dewco/core/auth';
import {DATA_SERVICE_CONFIG} from '@dewco/core/data';
import {FormsModule} from '@dewco/core/forms';
import {TranslateModule} from '@ngx-translate/core';
import {MaterialDashboardE2eModule} from './mat-dashboard/dashboard-e2e.module';

import {E2eApp} from './e2e-app';
import {E2eAppModule} from './e2e-app/e2e-app-module';
import {ExampleFormCollectModule} from './example-form-collect/example-form-collect.module';
import {ExampleFormSelectModule} from './example-form-select/example-form-select.module';
import {MaterialCollectE2eModule} from './mat-collect/collect-e2e.module';
import {MaterialListE2eModule} from './mat-list/list-e2e.module';
import {MaterialLoginE2eModule} from './mat-login/login-e2e-module';
import {MaterialMainE2EModule} from './mat-main/main-e2e.module';
import {fusionAuthConfig, paginatorConfig} from './mockconfig';
import {authErrorMessage, AuthServiceMock, syncGraphQLUrl, wsUrl} from './mocks';
import {E2E_APP_ROUTES} from './routes';

@NgModule({
  imports: [
    AuthModule.forRoot(fusionAuthConfig),
    BrowserModule,
    HttpClientModule,
    E2eAppModule,
    BrowserAnimationsModule,
    OverlayModule,
    RouterModule.forRoot(E2E_APP_ROUTES),
    MatDatepickerModule,
    MatNativeDateModule,
    TranslateModule.forRoot(),
    FormsModule,

    // E2E demos
    ExampleFormCollectModule,
    ExampleFormSelectModule,
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
    {provide: AuthService, useClass: AuthServiceMock},
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
}
