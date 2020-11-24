import {OverlayModule} from '@angular/cdk/overlay';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_SELECT_SCROLL_STRATEGY_PROVIDER} from '@angular/material/select';
import {MAT_TOOLTIP_SCROLL_STRATEGY} from '@angular/material/tooltip';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {AuthService} from '@dewco/core/auth';
import {DATA_SERVICE_CONFIG} from '@dewco/core/data';
import {TranslateModule} from '@ngx-translate/core';

import {E2eApp} from './e2e-app';
import {E2eAppModule} from './e2e-app/e2e-app-module';
import {E2E_APP_ROUTES} from './e2e-app/routes';
import {ExampleFormCollectModule} from './example-form-collect/example-form-collect.module';
import {ExampleFormSelectModule} from './example-form-select/example-form-select.module';
import {MaterialListE2eModule} from './mat-list/list-e2e.module';
import {MaterialLoginE2eModule} from './mat-login/login-e2e-module';
import {authServiceMock} from './mocks';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    E2eAppModule,
    BrowserAnimationsModule,
    OverlayModule,
    RouterModule.forRoot(E2E_APP_ROUTES),
    MatDatepickerModule,
    MatNativeDateModule,
    TranslateModule.forRoot(),

    // E2E demos
    ExampleFormCollectModule,
    ExampleFormSelectModule,
    MaterialListE2eModule,
    MaterialLoginE2eModule,
  ],
  declarations: [
    E2eApp,
  ],
  providers: [
    {provide: AuthService, useValue: authServiceMock},
    {
      provide: DATA_SERVICE_CONFIG,
      useValue: {
        databaseCreateOptions: {
          name: `dewco_test_db`,
          adapter: 'idb',
        },
        syncOptions: {
          url: '',
        },
      },
    },
    MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
    {provide: MAT_TOOLTIP_SCROLL_STRATEGY, useValue: {}},
  ],
  bootstrap: [E2eApp],
})
export class MainModule {
}
