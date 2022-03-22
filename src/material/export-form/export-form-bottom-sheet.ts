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

import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'dino-export-form-bottom-sheet',
  template: `
  <mat-nav-list>
  <a  mat-list-item (click)="export('XLSX')">
    <span mat-line>{{ 'XLSX'|transloco }}</span>
  </a>

  <a mat-list-item (click)="export('CSV')">
    <span mat-line>{{ 'CSV'|transloco }}</span>
  </a>
  <a mat-list-item (click)="export('dialog')">
    <span mat-line>{{ 'Select fields'|transloco }}</span>
  </a>
</mat-nav-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ExportBottomSheet {
  constructor(private _bottomSheetRef: MatBottomSheetRef<ExportBottomSheet>) {}

  export(ev: string): void {
    this._bottomSheetRef.dismiss(ev);
  }
}
