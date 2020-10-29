/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dewco Core (dewco).
 *
 * Dewco Core (dewco) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dewco Core (dewco) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dewco Core (dewco).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
import {ModuleWithProviders, NgModule} from '@angular/core';

import {LocationManager} from './location-manager';

/**
 * Optional module augmenting Forms that provides the LocationManager service
 */
@NgModule({})
export class LocationModule {
  static forRoot(): ModuleWithProviders<LocationModule> {
    return {
      ngModule: LocationModule,
      providers: [
        LocationManager,
      ],
    };
  }
}
