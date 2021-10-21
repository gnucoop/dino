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

import {AjfTranslocoModule} from '@ajf/core/transloco';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@dino/core/forms';
import {BreakpointObserverModule} from '@dino/material/breakpoint-observer';
import {FloatingButtonModule} from '@dino/material/floating-button';

import {Collect} from './collect';

@NgModule({
  imports: [
    AjfTranslocoModule,
    BreakpointObserverModule,
    CommonModule,
    FloatingButtonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
  ],
  declarations: [Collect],
  exports: [Collect],
})
export class CollectModule {}
