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
import {ClipboardModule} from '@angular/cdk/clipboard';
import {LayoutModule} from '@angular/cdk/layout';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@dino/core/forms';
import {FormMetricSelectorModule} from '@dino/material/form-metric-selector';

import {Collect} from './collect';
import {CollectActionsSheet} from './collect-actions-sheet';
import {CollectAgePipe} from './collect-age.pipe';
import {CollectShareDialog} from './collect-share-dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {TourMatMenuModule} from 'ngx-ui-tour-md-menu';

@NgModule({
  imports: [
    AjfTranslocoModule,
    ClipboardModule,
    CommonModule,
    FormMetricSelectorModule,
    FormsModule,
    LayoutModule,
    RouterModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatTooltipModule,
    ReactiveFormsModule,
    TourMatMenuModule,
  ],
  declarations: [Collect, CollectActionsSheet, CollectAgePipe, CollectShareDialog],
  exports: [Collect],
})
export class CollectModule {}
