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
import {DataChatQA, Mimetype, RelevantParagraph} from './datachat.interfaces';

@Component({
  selector: 'dino-paragraph-dialog',
  styleUrls: ['paragraph-dialog.component.scss'],
  templateUrl: './paragraph-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ParagraphDialogComponent {
  /**
   * The paragraph displayed in the dialog
   */
  relevantParagraph: RelevantParagraph | null = null;
  /**
   * The base url for documentation files bucket
   */
  bucketUrl: string | null = null;
  /**
   * The source mimetype returned from Pandino
   */
  mimetype: Mimetype = null;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {qa: DataChatQA; paragraphIndex: number; bucketUrl: string},
    public dialogRef: MatDialogRef<ParagraphDialogComponent>,
  ) {
    if (!data || !data.qa || data.paragraphIndex == null) {
      return;
    }
    if (data.bucketUrl) {
      this.bucketUrl = `${data.bucketUrl}/files/`;
    }
    if (data.qa.mimetypes && data.qa.mimetypes[data.paragraphIndex]) {
      const qaMimetype: Mimetype | Mimetype[] = data.qa.mimetypes[data.paragraphIndex];
      const mimetype = Array.isArray(qaMimetype) ? qaMimetype[0] : qaMimetype;
      this.mimetype = mimetype;
    }
    this.relevantParagraph = {
      mimetype: this.mimetype ? this.mimetype : undefined,
      page: data.qa.pages ? data.qa.pages[data.paragraphIndex] : undefined,
      paragraph: data.qa.paragraphs ? data.qa.paragraphs[data.paragraphIndex] : undefined,
      similarity: data.qa.similarities ? data.qa.similarities[data.paragraphIndex] : undefined,
      source: data.qa.sources ? data.qa.sources[data.paragraphIndex] : undefined,
      url: data.qa.urls ? data.qa.urls[data.paragraphIndex] : undefined,
    };
  }

  /**
   * Closes the dialog
   */
  closeDialog() {
    this.dialogRef.close();
  }
}
