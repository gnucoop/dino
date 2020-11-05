import {OverlayModule} from '@angular/cdk/overlay';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {MAT_SELECT_SCROLL_STRATEGY_PROVIDER} from '@angular/material/select';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

import {E2eApp} from './e2e-app';
import {E2eAppModule} from './e2e-app/e2e-app-module';
import {E2E_APP_ROUTES} from './e2e-app/routes';
import {MaterialLoginE2eModule} from './mat-login/login-e2e-module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    E2eAppModule,
    BrowserAnimationsModule,
    OverlayModule,
    RouterModule.forRoot(E2E_APP_ROUTES),

    // E2E demos
    MaterialLoginE2eModule,
  ],
  declarations: [
    E2eApp,
  ],
  bootstrap: [E2eApp],
  providers: [
    MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
  ]
})
export class MainModule {
}
