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

import {ModuleWithProviders, NgModule} from '@angular/core';
import {MaterialCssVariablesConfig, MaterialCssVarsModule} from 'angular-material-css-vars';

export interface DinoConfig {
  theme?: Partial<MaterialCssVariablesConfig>;
}

@NgModule({})
export class CoreModule {
  static forRoot(config?: DinoConfig): ModuleWithProviders<CoreModule> {
    const {theme} = config || {};
    const {providers} = MaterialCssVarsModule.forRoot(theme);
    return {
      ngModule: CoreModule,
      providers,
    };
  }
}
