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
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {AsStringPipe} from './as-string.pipe';
import {LangsComponent} from './langs';
import {LangsAddDialog} from './langs-add-dialog';
import {LangsConfirmDialog} from './langs-confirm-dialog';
import {LangsExportDialog} from './langs-export-dialog';
import {LangsFileUploader} from './langs-file-uploader';
import {LangsFilterPipe} from './langs-filter.pipe';
import {LangsLoadingComponent} from './langs-loading';
import {LangsSettingsDialog} from './langs-settings-dialog';
import {LangsUpdateDialog} from './langs-update-dialog';
import {ObjectLengthPipe} from './object-length.pipe';

@NgModule({
  imports: [
    AjfTranslocoModule,
    AjfReportsModule,
    CommonModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AsStringPipe,
    LangsAddDialog,
    LangsComponent,
    LangsConfirmDialog,
    LangsExportDialog,
    LangsFileUploader,
    LangsFilterPipe,
    LangsLoadingComponent,
    LangsSettingsDialog,
    LangsUpdateDialog,
    ObjectLengthPipe,
  ],
  exports: [LangsComponent],
})
export class LangsModule {}
