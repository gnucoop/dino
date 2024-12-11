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
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import {CompletionVector, DataChatQA} from './datachat.interfaces';
import {MatDialog} from '@angular/material/dialog';
import {ParagraphDialogComponent} from './paragraph-dialog.component';

/**
 * The ChatEntry component.
 * Displays a single chat question/response in the DataChat history
 */
@Component({
  selector: 'dino-datachat-entry',
  styleUrls: ['datachat-entry.scss'],
  templateUrl: 'datachat-entry.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DataChatEntry implements OnDestroy {
  /**
   * The question/answer history entry
   */
  @Input() qa?: DataChatQA;
  /**
   * The base url for documentation files bucket
   */
  @Input() bucketUrl?: string;

  constructor(private _dialog: MatDialog, private _cdr: ChangeDetectorRef) {}

  /**
   * Gets Paragraphs used as sources for the answer
   * @param qa The datachat QA entry
   * @returns The sources mat-chips
   */
  getRelevantVectors(qa: DataChatQA): CompletionVector[] {
    if (qa.vectors == null) {
      return [];
    }
    return qa.vectors.filter(vec => vec.metadata.source && vec.metadata.page);
  }

  /**
   * Opens a simple MatDialog with some text in it
   * @param text The text displayed in the dialog
   */
  openParagraphDialog(qa: DataChatQA, vector: CompletionVector) {
    this._dialog.open(ParagraphDialogComponent, {
      data: {
        qa,
        vector,
        bucketUrl: this.bucketUrl,
      },
      panelClass: 'dino-paragraph-dialog',
    });
  }

  ngOnDestroy(): void {
    return;
  }
}
