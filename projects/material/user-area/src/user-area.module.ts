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
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BreakpointObserverModule as DinoBreakpointObserverModule} from '@dino/material/breakpoint-observer';

import {RouterModule} from '@angular/router';
import {UsersModule} from '@dino/core/users';
import {TranslocoModule} from '@ngneat/transloco';
import {ColorPickerModule} from 'ngx-color-picker';

import {UserArea} from './user-area';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    AjfTranslocoModule,
    ColorPickerModule,
    CommonModule,
    DinoBreakpointObserverModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    RouterModule,
    UsersModule,
    TranslocoModule,
  ],
  declarations: [UserArea],
  entryComponents: [UserArea],
  exports: [UserArea],
})
export class UserAreaModule {}
