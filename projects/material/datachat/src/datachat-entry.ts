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
 * How long the copy button confirms the copy, in milliseconds.
 */
const COPIED_FEEDBACK_TIME = 2000;

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
    logId: string | number;
    isPositive: boolean;
    question: string;
    answer: string;
  }> = new EventEmitter<{
    logId: string | number;
    isPositive: boolean;
    question: string;
    answer: string;
  }>();

  /**
   * Emitted, with the question of this entry, when its answer must be asked
   * again
   */
  @Output() regenerateClick: EventEmitter<string> = new EventEmitter<string>();

  /**
   * True right after the answer has been copied to the clipboard
   */
  copied = false;

  /**
   * Resets the copy confirmation
   */
  private _copiedTimeout: ReturnType<typeof setTimeout> | null = null;

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

  /**
   * True when the entry holds something the assistant answered: a text, an
   * image, a generated component, or the explanation of one of them.
   */
  get hasAnswer(): boolean {
    return (
      this.qa != null &&
      (this.qa.response != null ||
        this.qa.explanation != null ||
        this.qa.imageData != null ||
        this.qa.componentData != null)
    );
  }

  /**
   * True when the User can rate this entry: either the backend returned a log
   * id for it (completion mode) or the chat marked it as rateable (datachat
   * mode, where the answer may be an image or a table).
   */
  get feedbackAvailable(): boolean {
    return this.qa != null && (this.qa.log_id != null || this.qa.feedbackEnabled === true);
  }

  /**
   * True when the answer holds some text to put in the clipboard.
   */
  get canCopy(): boolean {
    return this.qa != null && (this.qa.response != null || this.qa.explanation != null);
  }

  /**
   * True when the question that produced this answer is known, and can
   * therefore be asked again.
   */
  get canRegenerate(): boolean {
    return this.qa?.question != null && this.qa.question.length > 0 && this.hasAnswer;
  }

  /**
   * True when the answer displays its actions row.
   */
  get showActions(): boolean {
    return this.feedbackAvailable || this.canCopy || this.canRegenerate;
  }

  /**
   * Copies the answer to the clipboard, confirming it on the button for a
   * couple of seconds.
   */
  copyAnswer(): void {
    const text = [this.qa?.explanation, this.qa?.response].filter(part => part).join('\n\n');
    if (!text || typeof navigator === 'undefined' || navigator.clipboard == null) {
      return;
    }
    navigator.clipboard.writeText(text).then(
      () => {
        this.copied = true;
        this._cdr.markForCheck();
        this._copiedTimeout = setTimeout(() => {
          this.copied = false;
          this._cdr.markForCheck();
        }, COPIED_FEEDBACK_TIME);
      },
      () => {
        // The clipboard is not available (insecure context, denied permission):
        // nothing to confirm.
      },
    );
  }

  /**
   * Asks the question of this entry again.
   */
  onRegenerateClick(): void {
    if (this.qa?.question) {
      this.regenerateClick.emit(this.qa.question);
    }
  }

  onFeedbackClick(isPositive: boolean) {
    if (this.qa && this.feedbackAvailable) {
      if (this.qa.userIsHappy === isPositive) {
        return;
      }
      this.qa.userIsHappy = isPositive;
      this.feedbackClick.emit({
        logId: this.qa.log_id ?? '',
        isPositive,
        question: this.qa.question ?? '',
        answer: this.qa.response ?? this.qa.explanation ?? '',
      });
    }
  }

  getFormattedResponse(qa: DataChatQA): string {
    if (!qa.response) return '';
    return mrkd.parse(qa.response) as string;
  }

  ngOnDestroy(): void {
    if (this._copiedTimeout != null) {
      clearTimeout(this._copiedTimeout);
    }
  }
}
