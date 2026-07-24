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

import {inject, InjectionToken} from '@angular/core';
import {DataService} from './data-service';
import {IDataService} from './data-service-interface';

/**
 * Injection token for the active data service implementation.
 *
 * Data managers inject this token instead of a concrete data service, so the
 * same manager class can operate over either the offline (RxDB) `DataService`
 * or the online (GraphQL/Apollo) `OnlineDataService`. The concrete
 * implementation is chosen once, where the token is provided (see the app
 * module), based on the configured data mode.
 *
 * The default factory resolves the offline `DataService`, so consumers that do
 * not override the token (other apps, test beds) keep the offline-first
 * behaviour without extra wiring. The app module overrides this token with
 * `OnlineDataService` when the configured data mode is 'online'.
 */
export const DATA_SERVICE = new InjectionToken<IDataService>('DATA_SERVICE', {
  providedIn: 'root',
  factory: () => inject(DataService),
});
