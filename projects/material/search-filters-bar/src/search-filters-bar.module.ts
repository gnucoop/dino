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
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {RouterModule} from '@angular/router';
import {BreakpointObserverModule} from '@dino/material/breakpoint-observer';
import {ExportFormModule} from '@dino/material/export-form';
import {SearchFiltersChipsModule} from '@dino/material/search-filters-chips';
import {SearchFiltersDialogModule} from '@dino/material/search-filters-dialog';
import {SearchFiltersPresetManagerModule} from '@dino/material/search-filters-preset-manager';

import {IsFalseOrNullPipe} from './is-false-or-null.pipe';
import {SearchFiltersBar} from './search-filters-bar';

@NgModule({
  imports: [
    AjfTranslocoModule,
    BreakpointObserverModule,
    CommonModule,
    ExportFormModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatBottomSheetModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
    RouterModule,
    SearchFiltersChipsModule,
    SearchFiltersDialogModule,
    SearchFiltersPresetManagerModule,
  ],
  declarations: [IsFalseOrNullPipe, SearchFiltersBar],
  exports: [SearchFiltersBar],
  providers: [MatDatepickerModule],
})
export class SearchFiltersBarModule {}
