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

import {E2eApp} from './e2e-app';
import {E2eAppModule} from './e2e-app/e2e-app-module';
import {E2E_APP_ROUTES} from './e2e-app/routes';
import {MaterialLoginE2eModule} from './mat-login/login-e2e-module';
import {ExampleFormCollectModule} from './example-form-collect/example-form-collect.module';
import {ExampleFormSelectModule} from './example-form-select/example-form-select.module';

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

    // E2E demos
    MaterialLoginE2eModule,
    ExampleFormCollectModule,
    ExampleFormSelectModule,
  ],
  declarations: [
    E2eApp,
  ],
  bootstrap: [E2eApp],
  providers: [
    MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
    {provide: MAT_TOOLTIP_SCROLL_STRATEGY, useValue: {}},
  ]
})
export class MainModule {
}
