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
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {CompletionVector, DataChatQA} from './datachat.interfaces';
import {MatDialog} from '@angular/material/dialog';
import {ParagraphDialogComponent} from './paragraph-dialog.component';
import * as mrkd from 'marked';

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
  /**
   * Emitted when a follow up question is clicked
   */
  @Output() followUpClick: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Emitted when feedback is clicked
   */
  @Output() feedbackClick: EventEmitter<{
    logId: string;
    isPositive: boolean;
    question: string;
    answer: string;
  }> = new EventEmitter<{logId: string; isPositive: boolean; question: string; answer: string}>();

  /**
   * Emitted when the download of the complete result is requested
   */
  @Output() downloadClick: EventEmitter<{url: string; filename: string}> = new EventEmitter<{
    url: string;
    filename: string;
  }>();

  constructor(private _dialog: MatDialog, private _cdr: ChangeDetectorRef) {}

  /**
   * True when the displayed table holds fewer columns than the complete result
   * @param qa The datachat QA entry
   */
  hasDroppedColumns(qa: DataChatQA): boolean {
    return (
      qa.totalColumns != null && qa.previewColumns != null && qa.totalColumns > qa.previewColumns
    );
  }

  /**
   * True when the row counts of the preview banner are known
   * @param qa The datachat QA entry
   */
  hasRowCounts(qa: DataChatQA): boolean {
    return qa.previewRows != null && qa.totalRows != null;
  }

  onDownloadClick(): void {
    if (!this.qa || !this.qa.downloadUrl) return;
    this.downloadClick.emit({
      url: this.qa.downloadUrl,
      filename: this.qa.downloadFilename ?? 'export.csv',
    });
  }

  /**
   * Gets Paragraphs used as sources for the answer
   * @param qa The datachat QA entry
   * @returns The sources mat-chips
   */
  getRelevantVectors(qa: DataChatQA): CompletionVector[] {
    if (qa.vectors == null) {
      return [];
    }
    return qa.vectors;
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

  onFollowUpClick(question: string) {
    this.followUpClick.emit(question);
  }

  onFeedbackClick(isPositive: boolean) {
    if (this.qa && this.qa.log_id) {
      if (this.qa.userIsHappy === isPositive) {
        return;
      }
      this.qa.userIsHappy = isPositive;
      this.feedbackClick.emit({
        logId: this.qa.log_id,
        isPositive,
        question: this.qa.question ?? '',
        answer: this.qa.response ?? '',
      });
    }
  }

  getFormattedResponse(qa: DataChatQA): string {
    if (!qa.response) return '';
    return mrkd.parse(qa.response) as string;
  }

  ngOnDestroy(): void {
    return;
  }
}
