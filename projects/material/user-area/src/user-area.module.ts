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
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {BreakpointObserverModule as DinoBreakpointObserverModule} from '@dino/material/breakpoint-observer';

import {LoadingSpinnerModule as DinoLoadingSpinnerModule} from '@dino/material/loading-spinner';
import {ThemeSwitchModule as DinoThemeSwitchModule} from '@dino/material/theme-switch';
import {RouterModule} from '@angular/router';
import {UsersModule} from '@dino/core/users';
import {UserInteractionsModule as DinoUserInteractionsModule} from '@dino/material/user-interactions';
import {TranslocoModule} from '@ngneat/transloco';
import {ColorPickerModule} from 'ngx-color-picker';

import {UserArea} from './user-area';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ClipboardModule} from '@angular/cdk/clipboard';

@NgModule({
  imports: [
    AjfTranslocoModule,
    ClipboardModule,
    ColorPickerModule,
    CommonModule,
    DinoBreakpointObserverModule,
    DinoLoadingSpinnerModule,
    DinoThemeSwitchModule,
    DinoUserInteractionsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTabsModule,
    ReactiveFormsModule,
    RouterModule,
    UsersModule,
    TranslocoModule,
  ],
  declarations: [UserArea],
  exports: [UserArea],
})
export class UserAreaModule {}
