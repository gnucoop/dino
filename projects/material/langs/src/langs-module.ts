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
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatLegacyChipsModule as MatChipsModule} from '@angular/material/legacy-chips';
import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import {MatLegacyPaginatorModule as MatPaginatorModule} from '@angular/material/legacy-paginator';
import {MatLegacyProgressSpinnerModule as MatProgressSpinnerModule} from '@angular/material/legacy-progress-spinner';
import {MatLegacySnackBarModule as MatSnackBarModule} from '@angular/material/legacy-snack-bar';

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
