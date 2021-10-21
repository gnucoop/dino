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

import {AjfFormsModule} from '@ajf/core/forms';
import {AjfTranslocoModule} from '@ajf/core/transloco';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterModule} from '@angular/router';
import {ListModule as CoreModule} from '@dewco/core/list';
import {BreakpointObserverModule} from '@dewco/material/breakpoint-observer';
import {ExportFormModule} from '@dewco/material/export-form';

import {ColumnsSelector} from './columns-selector';
import {ConfirmationDialog} from './confirmation-dialog';
import {SelectionList} from './list';
import {ListCell} from './list-cell';
import {AdminUserInteractionsService} from './user-interactions.service';

@NgModule({
  imports: [
    AjfFormsModule,
    AjfTranslocoModule,
    BreakpointObserverModule,
    ExportFormModule,
    CommonModule,
    CoreModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    RouterModule,
  ],
  declarations: [ColumnsSelector, ConfirmationDialog, ListCell, SelectionList],
  exports: [MatIconModule, SelectionList],
  providers: [AdminUserInteractionsService],
})
export class ListModule {}
