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

import {AjfTranslocoModule} from '@ajf/core/transloco';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {RouterModule} from '@angular/router';
import {SearchFiltersChipsModule} from '@dewco/material/search-filters-chips';
import {SearchFiltersWidgetModule} from '@dewco/material/search-filters-widget';

import {SearchFiltersDialog} from './search-filters-dialog';

@NgModule({
  imports: [
    AjfTranslocoModule,
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    RouterModule,
    SearchFiltersChipsModule,
    SearchFiltersWidgetModule,
  ],
  declarations: [SearchFiltersDialog],
  entryComponents: [SearchFiltersDialog],
  exports: [SearchFiltersDialog],
})
export class SearchFiltersDialogModule {}
