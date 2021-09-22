/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dewco (dewco).
 *
 * Dewco (dewco) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dewco (dewco) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dewco (dewco).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {Directionality} from '@angular/cdk/bidi';
import {FullscreenOverlayContainer, OverlayContainer} from '@angular/cdk/overlay';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {AuthModule} from '@dewco/core/auth';
import {DATA_SERVICE_CONFIG, DataModule} from '@dewco/core/data';
import {LangSelectorModule} from '@dewco/material/lang-selector';
import * as pouchdbAdapterMemory from 'pouchdb-adapter-memory';
import {addPouchPlugin, getRxStoragePouch} from 'rxdb/plugins/pouchdb';

import {DemoHttpInterceptor} from './demo-http-interceptor';
import {DevAppComponent} from './dev-app';
import {DevAppDirectionality} from './dev-app/dev-app-directionality';
import {DevAppModule} from './dev-app/dev-app-module';
import {DEV_APP_ROUTES} from './dev-app/routes';

export function provideDataServiceConfig() {
  addPouchPlugin(pouchdbAdapterMemory);
  return {
    databaseCreateOptions: {
      name: 'dewco_dev_app_db',
      storage: getRxStoragePouch('memory'),
    },
    syncOptions: {
      url: 'http://dewcoServer/v1/graphql',
      live: false,
      liveInterval: 60000,
    },
  };
}

@NgModule({
  imports: [
    AuthModule.forRoot({
      host: 'http://auth-backend',
      applicationId: 'applicationId',
      apiKey: 'apiKey',
      retryRefreshTime: 3000,
      retryAttemptsMax: 1,
      failedAuthRedirect: 'login',
    }),
    BrowserAnimationsModule,
    BrowserModule,
    DataModule,
    DevAppModule,
    HttpClientModule,
    LangSelectorModule,
    RouterModule.forRoot(DEV_APP_ROUTES),
  ],
  declarations: [
    DevAppComponent,
  ],
  providers: [
    {provide: OverlayContainer, useClass: FullscreenOverlayContainer},
    {provide: Directionality, useClass: DevAppDirectionality},
    {provide: HTTP_INTERCEPTORS, useClass: DemoHttpInterceptor, multi: true},
    {provide: DATA_SERVICE_CONFIG, useFactory: provideDataServiceConfig},
  ],
  bootstrap: [DevAppComponent],
})
export class MainModule {
}
