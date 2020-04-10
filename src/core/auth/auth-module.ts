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

import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ModuleWithProviders, NgModule} from '@angular/core';

import {AuthService} from './auth-service';
import {AUTH_SERVICE_CONFIG, AuthServiceConfig} from './auth-service-config';
import {JWTInterceptor} from './jwt-interceptor';

@NgModule({})
export class AuthModule {
  static forRoot(config: AuthServiceConfig): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        {provide: AUTH_SERVICE_CONFIG, useValue: config},
        {provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true},
      ],
    };
  }
}
