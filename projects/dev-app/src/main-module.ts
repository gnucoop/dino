/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dino (dino).
 *
 * Dino (dino) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dino (dino) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dino (dino).
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
import {AuthModule} from '@dino/core/auth';
import {DATA_SERVICE_CONFIG, DataModule} from '@dino/core/data';
import {CoreModule} from '@dino/material/core';
import {LangSelectorModule} from '@dino/material/lang-selector';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';

import {DemoHttpInterceptor} from './demo-http-interceptor';
import {DevAppComponent} from './dev-app';
import {DevAppDirectionality} from './dev-app/dev-app-directionality';
import {DevAppModule} from './dev-app/dev-app-module';
import {DEV_APP_ROUTES} from './routes';

export function provideDataServiceConfig() {
  return {
    databaseCreateOptions: {
      name: 'dino_dev_app_db',
      storage: getRxStorageMemory(),
    },
    syncOptions: {
      url: {http: 'http://dinoServer/v1/graphql'},
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
    CoreModule.forRoot(),
    DataModule,
    DevAppModule,
    HttpClientModule,
    LangSelectorModule,
    RouterModule.forRoot(DEV_APP_ROUTES),
  ],
  declarations: [DevAppComponent],
  providers: [
    {provide: OverlayContainer, useClass: FullscreenOverlayContainer},
    {provide: Directionality, useClass: DevAppDirectionality},
    {provide: HTTP_INTERCEPTORS, useClass: DemoHttpInterceptor, multi: true},
    {provide: DATA_SERVICE_CONFIG, useFactory: provideDataServiceConfig},
  ],
  bootstrap: [DevAppComponent],
})
export class MainModule {}
