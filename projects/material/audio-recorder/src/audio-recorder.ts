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
  Component,
  Inject,
  isDevMode,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import {AudioRecorderService} from './audio-recorder.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {RecordedAudioOutput} from './audio-interfaces';
import {FormSchema} from '@dino/core/forms';

/**
 * Shows a list of active filters and allows their deletion.
 * Each single active filter is represented by a chip, with it's corrisponding name,
 * operator and value.
 */
@Component({
  selector: 'dino-audio-recorder',
  styleUrls: ['audio-recorder.scss'],
  templateUrl: 'audio-recorder.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AudioRecorder implements OnDestroy {
  isRecording = false;
  recordedTime: Observable<string | null>;
  blobUrl: BehaviorSubject<SafeUrl | null> = new BehaviorSubject<SafeUrl | null>(null);
  blob: BehaviorSubject<RecordedAudioOutput | null> =
    new BehaviorSubject<RecordedAudioOutput | null>(null);

  /**
   * The current Transcription of the recorded Audio
   */
  audioTranscription: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  /**
   * If true, the Audio Recorder is currently communicating with Pandino API
   */
  isCommunicating: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * List of form fields
   */
  formFields: string[] = [];

  /**
   * Subscribes to the AudioRecorderService recorded blob
   */
  private _blobSub: Subscription = Subscription.EMPTY;
  /**
   * Subscribes to the AudioRecorderService recording failed error
   */
  private _recordingFailedSub: Subscription = Subscription.EMPTY;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private _data: {formSchema: FormSchema; exampleData: {[key: string]: any} | null},
    private _dialogRef: MatDialogRef<AudioRecorder>,
    private _audioRecorderService: AudioRecorderService,
    private sanitizer: DomSanitizer,
  ) {
    this._recordingFailedSub = this._audioRecorderService
      .recordingFailed()
      .subscribe(() => (this.isRecording = false));
    this.recordedTime = this._audioRecorderService.getRecordedTime();

    this._blobSub = this._audioRecorderService
      .getRecordedBlob()
      .pipe(filter(blobdata => blobdata != null))
      .subscribe(data => {
        if (data == null) return;
        this.blob.next(data);
        this.blobUrl.next(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob)));
      });

    if (this._data.exampleData) {
      const exampleFields = Object.values(this._data.exampleData);
      this.formFields = exampleFields;
    }
  }

  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this._audioRecorderService.startRecording();
    }
  }

  abortRecording() {
    this.isRecording = false;
    this._audioRecorderService.abortRecording();
  }

  stopRecording() {
    if (this.isRecording) {
      this._audioRecorderService.stopRecording();
      this.isRecording = false;
    }
  }

  clearRecordedData() {
    this.blobUrl.next(null);
    this.audioTranscription.next(null);
  }

  download(): void {
    this.blob.pipe(take(1)).subscribe(blob => {
      if (blob == null) return;
      const url = window.URL.createObjectURL(blob.blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = blob.title;
      link.click();
    });
  }

  transcribe() {
    if (!this.blob.value) return;
    this.isCommunicating.next(true);
    this._audioRecorderService.sendToTrascribe(this.blob.value.blob).subscribe(res => {
      if (res && !res.error && res.text) {
        this.audioTranscription.next(res.text);
      }
      this.isCommunicating.next(false);
    });
  }

  audioFormCompile() {
    if (this.audioTranscription.value == null) return;
    this.isCommunicating.next(true);
    this._audioRecorderService
      .sendToAudioFormCompilation(this._data, this.audioTranscription.value)
      .subscribe(res => {
        const objectRes = this._audioFormResponseToJSON(res);
        this.isCommunicating.next(false);
        this.closeDialog(objectRes);
      });
  }

  private _audioFormResponseToJSON(audioData: string): {[key: string]: any} | null {
    if (!audioData) return null;
    let jsonData = {};
    try {
      const cleanData = audioData.replace('```json', '').replace('```', '');
      jsonData = JSON.parse(cleanData);
    } catch (err) {
      if (isDevMode()) console.log(err);
      return null;
    }
    return jsonData;
  }

  /**
   * Closes the dialog
   */
  closeDialog(dialogData: {[key: string]: any} | null = null) {
    this._dialogRef.close(dialogData);
  }

  ngOnDestroy(): void {
    this.abortRecording();
    this._blobSub.unsubscribe();
    this.blob.complete();
    this.blobUrl.complete();
    this._recordingFailedSub.unsubscribe();
    this.isCommunicating.complete();
  }
}
