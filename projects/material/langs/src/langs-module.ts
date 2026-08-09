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
import {AjfReportsModule} from '@ajf/material/reports';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';

import {DateValue} from './date-value.pipe';
import {LangsComponent} from './langs';
import {LangsAddDialog} from './langs-add-dialog';
import {LangsConfirmDialog} from './langs-confirm-dialog';
import {LangsDetailComponent} from './langs-detail';
import {LangsFileUploader} from './langs-file-uploader';
import {LangsKeyListComponent} from './langs-key-list';
import {LangsLoadingComponent} from './langs-loading';
import {LangsSettingsDialog} from './langs-settings-dialog';

@NgModule({
  imports: [
    AjfTranslocoModule,
    AjfReportsModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    ScrollingModule,
  ],
  declarations: [
    DateValue,
    LangsAddDialog,
    LangsComponent,
    LangsConfirmDialog,
    LangsDetailComponent,
    LangsFileUploader,
    LangsKeyListComponent,
    LangsLoadingComponent,
    LangsSettingsDialog,
  ],
  exports: [DateValue, LangsComponent],
})
export class LangsModule {}
