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

import {AjfFormsModule} from '@ajf/core/forms';
import {AjfTranslocoModule} from '@ajf/core/transloco';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RouterModule} from '@angular/router';
import {ListModule as CoreModule} from '@dino/core/list';
import {BreakpointObserverModule} from '@dino/material/breakpoint-observer';
import {ExportFormModule} from '@dino/material/export-form';
import {FormStatusChangerModule} from '@dino/material/form-status-changer';
import {ImportFormModule} from '@dino/material/import-form';
import {UserInteractionsModule} from '@dino/material/user-interactions';

import {ColumnsSelector} from './columns-selector';
import {SelectionList} from './list';
import {ListCell} from './list-cell';
import {ListCellValue} from './list-cell-value';
import {
  ListCellIsFile,
  ListCellGetFile,
  ListCellGetFileIcon,
  ListCellIsDeletedFile,
} from './list-cell-file';
import {LogViewer} from './log-viewer';
import {ImagePreview} from './image-preview';

@NgModule({
  imports: [
    AjfFormsModule,
    AjfTranslocoModule,
    BreakpointObserverModule,
    ExportFormModule,
    CommonModule,
    CoreModule,
    FormStatusChangerModule,
    ImportFormModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTabsModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule,
    UserInteractionsModule,
  ],
  declarations: [
    ColumnsSelector,
    ImagePreview,
    ListCell,
    ListCellValue,
    ListCellIsFile,
    ListCellIsDeletedFile,
    ListCellGetFile,
    ListCellGetFileIcon,
    LogViewer,
    SelectionList,
  ],
  exports: [MatIconModule, SelectionList],
})
export class ListModule {}
