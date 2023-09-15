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

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {RouterModule} from '@angular/router';
import {AuthModule} from '@dino/core/auth';
import {BreakpointObserverModule} from '@dino/material/breakpoint-observer';
import {ImageCaptureModule as DinoImageCaptureModule} from '@dino/material/image-capture';
import {TranslocoModule} from '@ngneat/transloco';

import {MetricEditor} from './metric-editor';
import {NameMatchValidator} from './metric-name-validator';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  imports: [
    AuthModule,
    BreakpointObserverModule,
    CommonModule,
    DinoImageCaptureModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatTabsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslocoModule,
  ],
  declarations: [MetricEditor],
  exports: [MetricEditor],
  providers: [NameMatchValidator],
})
export class MetricEditorModule {}
