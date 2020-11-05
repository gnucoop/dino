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

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import {DewcoMatCardModule} from '@dewco/material/dewco-mat-card';
import {DewcoMatDirectivesModule} from '@dewco/material/dewco-mat-directives';
import {DewcoMatFormFieldModule} from '@dewco/material/dewco-mat-form-field';
import {DewcoMatSlideToggleModule} from '@dewco/material/dewco-mat-slide-toggle';
import {DewcoMatTabGroupModule} from '@dewco/material/dewco-mat-tab-group';

import {MatDewcoComponents} from './dewco-mat-components-examples';

@NgModule({
  imports: [
    CommonModule,
    DewcoMatCardModule,
    DewcoMatDirectivesModule,
    DewcoMatFormFieldModule,
    DewcoMatTabGroupModule,
    DewcoMatSlideToggleModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSelectModule,
  ],
  declarations: [
    MatDewcoComponents,
  ],
})
export class MatDewcoComponentsModule {
}
