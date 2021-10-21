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

import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of as obsOf} from 'rxjs';
import {map} from 'rxjs/operators';

import {ConfigModule} from './config.module';
import {ConfigResponse, ConfigSet, ConfigTransformFunction} from './config.response';
import {CONFIG_SERVICE_CONFIG, ConfigServiceConfig} from './config.token';

/**
 * Service that can dynamically set Dino configuration parameters for
 * Auth and Data.
 */
@Injectable({providedIn: ConfigModule})
export class ConfigService {
  /**
   * The url of the api from where to retrieve the config
   */
  private _configApiUrl: string;

  /**
   * The currently selected configuration set.
   */

  readonly configurationSet: BehaviorSubject<ConfigSet | null>;

  constructor(
    private _httpClient: HttpClient,
    @Inject(CONFIG_SERVICE_CONFIG) readonly config: ConfigServiceConfig,
  ) {
    this.configurationSet = new BehaviorSubject<ConfigSet | null>(null);
    this._configApiUrl = config.apiUrl.replace(/^\/+|\/+$/g, '');
  }

  /**
   * Gets the configurations from the API
   * @param setupFn? Optional transform function
   * @returns The configs from the config API, if present
   */
  getConfigs(setupFn?: ConfigTransformFunction): Observable<ConfigResponse | null> {
    if (this._configApiUrl != null) {
      return this._httpClient.post<ConfigResponse>(this._configApiUrl, null).pipe(
        map(configs => {
          if (configs != null) {
            let confResp: ConfigResponse;
            if (setupFn != null) {
              confResp = setupFn(configs);
            } else {
              confResp = configs;
            }
            return confResp;
          }
          return null;
        }),
      );
    } else {
      return obsOf(null);
    }
  }

  /**
   * Resets the Configuration set.
   */
  resetConfigurationset(): void {
    this.configurationSet.next(null);
  }
}
