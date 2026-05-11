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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
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
import {ExportListModule} from '@dino/material/export-list';
import {FormStatusChangerModule} from '@dino/material/form-status-changer';
import {ImportFormModule} from '@dino/material/import-form';
import {UserInteractionsModule} from '@dino/material/user-interactions';
import {CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';

import {ColumnsSelector} from './columns-selector';
import {SelectionList} from './list';
import {ListCell} from './list-cell';
import {ListCellValue} from './list-cell-value';
import {
  ListCellIsFile,
  ListCellIsStorageImageUrl,
  ListCellGetFile,
  ListCellGetFileIcon,
  ListCellIsDeletedFile,
  ListCellFileViewPipe,
} from './list-cell-file';
import {LogViewer} from './log-viewer';
import {ImagePreview} from './image-preview';
import {AsListCellActionsPipe} from './list-action-pipe';
import {LangsModule} from '@dino/material/langs';
import {ListCellComponent} from './list-cell-component';
import {ActionsModal} from './actions-modal';
import {TourMatMenuModule} from 'ngx-ui-tour-md-menu';

@NgModule({
  imports: [
    AjfFormsModule,
    AjfTranslocoModule,
    BreakpointObserverModule,
    ExportListModule,
    CdkDrag,
    CdkDropList,
    CommonModule,
    CoreModule,
    FormStatusChangerModule,
    ImportFormModule,
    LangsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTabsModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule,
    TourMatMenuModule,
    UserInteractionsModule,
  ],
  declarations: [
    AsListCellActionsPipe,
    ActionsModal,
    ColumnsSelector,
    ImagePreview,
    ListCell,
    ListCellComponent,
    ListCellValue,
    ListCellIsFile,
    ListCellIsDeletedFile,
    ListCellIsStorageImageUrl,
    ListCellGetFile,
    ListCellGetFileIcon,
    ListCellFileViewPipe,
    LogViewer,
    SelectionList,
  ],
  exports: [MatIconModule, SelectionList],
})
export class ListModule {}
