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

import {ChangeDetectionStrategy, Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';

import {CollectItem} from './collect-item-interface';

/**
 * An action picked from the actions sheet of an item.
 */
export type CollectAction = 'share' | 'edit' | 'delete';

/**
 * The actions of an item on narrow screens, where the list rows have no room for their
 * buttons. The sheet is dismissed with the chosen action.
 */
@Component({
  selector: 'dino-collect-actions-sheet',
  templateUrl: 'collect-actions-sheet.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CollectActionsSheet {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) readonly item: CollectItem,
    private _sheetRef: MatBottomSheetRef<CollectActionsSheet, CollectAction>,
  ) {}

  pick(action: CollectAction): void {
    this._sheetRef.dismiss(action);
  }
}
