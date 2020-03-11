import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {E2eApp} from './e2e-app';
import {E2eAppModule} from './e2e-app/e2e-app-module';
import {E2E_APP_ROUTES} from './e2e-app/routes';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    E2eAppModule,
    IonicModule.forRoot(),
    NoopAnimationsModule,
    RouterModule.forRoot(E2E_APP_ROUTES),

    // E2E demos
  ],
  declarations: [
    E2eApp,
  ],
  bootstrap: [E2eApp],
})
export class MainModule {
}
