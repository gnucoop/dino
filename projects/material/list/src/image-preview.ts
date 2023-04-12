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
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {listCellFile} from './list-cell-file';

/**
 * A dialog component shows the preview of an Image uploaded in the storage for a Form
 */
@Component({
  selector: 'dino-image-preview',
  styleUrls: ['image-preview.scss'],
  templateUrl: 'image-preview.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ImagePreview {
  constructor(
    public dialogRef: MatDialogRef<ImagePreview>,
    @Inject(MAT_DIALOG_DATA) public data: listCellFile,
  ) {}

  /**
   * Gets the source of the img element, from its url or its base64 content
   * @returns The image source
   */
  getImageSource() {
    if (!this.data.content || !this.data.content.length) {
      return this.data.url;
    }
    return this.data.content;
  }

  /**
   * Closes the dialog
   */
  closeDialog(): void {
    this.dialogRef.close();
  }
}
