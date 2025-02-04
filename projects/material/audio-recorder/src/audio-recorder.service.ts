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
 *startdatachat
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {Injectable, isDevMode} from '@angular/core';
import {Subject, Observable, of as obsOf, BehaviorSubject} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';
import {RecordedAudioOutput, TranscribeResponse} from './audio-interfaces';
import {intervalToDuration} from 'date-fns';
import {UserDataManager} from '@dino/core/users';
import {TranslocoService} from '@ajf/core/transloco';
import {HttpClient} from '@angular/common/http';
import {FormSchema} from '@dino/core/forms';
/**
 * Service that provides methods to record, reproduce and save audio from user mic input
 */
@Injectable({providedIn: 'root'})
export class AudioRecorderService {
  private stream: MediaStream | null = null;
  private recorder: MediaRecorder | null = null;
  private interval: any;
  private _startTime: Date | null = null;
  private _recorded: BehaviorSubject<RecordedAudioOutput | null> =
    new BehaviorSubject<RecordedAudioOutput | null>(null);
  private _recordingTime = new Subject<string>();
  private _recordingFailed = new Subject<string>();

  constructor(
    private _http: HttpClient,
    private _ts: TranslocoService,
    private _udm: UserDataManager,
  ) {}

  getRecordedBlob(): Observable<RecordedAudioOutput | null> {
    return this._recorded;
  }

  getRecordedTime(): Observable<string> {
    return this._recordingTime.asObservable();
  }

  recordingFailed(): Observable<string> {
    return this._recordingFailed.asObservable();
  }

  startRecording() {
    if (this.recorder) {
      return;
    }

    this._recordingTime.next('00:00');
    navigator.mediaDevices
      .getUserMedia({audio: true})
      .then(s => {
        this.stream = s;
        this._record();
      })
      .catch(error => {
        if (isDevMode()) console.log(error);
        this._recordingFailed.next(error);
      });
  }

  abortRecording() {
    this._recorded.next(null);
    this.stopMedia();
  }

  /**
   * Sends the audio blob to Pandino API "/transcribe" endpoint and returns
   * the transcribed audio response
   * @param recordedAudio The recorded audio blob
   * @returns The Pandino API Response
   */
  sendToTrascribe(recordedAudio: Blob | null): Observable<TranscribeResponse | null> {
    return this._udm.getActiveUserData().pipe(
      switchMap(activeUserData => {
        const storedApiKey = localStorage.getItem('pandas_dino_api_key');
        if (!activeUserData || !recordedAudio || !storedApiKey) return obsOf(null);
        const headers = {
          'X-API-KEY': storedApiKey,
          'X-USER-NAME': activeUserData.full_name,
          'X-USER-EMAIL': activeUserData.email,
        };
        const url = `http://127.0.0.1:5000/transcribe`;
        const formData = new FormData();
        formData.append('file', recordedAudio);
        const currentLang = this._ts.getActiveLang();
        formData.append('lang', currentLang);
        return this._http.post<TranscribeResponse | null>(url, formData, {headers});
      }),
      take(1),
    );
  }

  /**
   * Sends the FormSchema and the transcribed audio to Pandino API "/audioformcompilation" endpoint and returns
   * a formdata data compiled by the LLM using the transcribed audio.
   * @param schema The FormSchema
   * @param transcribedAudio The text of the transcribed audio
   * @returns The Pandino API Response
   */
  sendToAudioFormCompilation(
    audioFormData: {formSchema: FormSchema; exampleData: {[key: string]: any} | null},
    transcribedAudio: string,
  ): Observable<any> {
    return this._udm.getActiveUserData().pipe(
      switchMap(activeUserData => {
        const storedApiKey = localStorage.getItem('pandas_dino_api_key');
        if (
          !activeUserData ||
          !audioFormData.formSchema ||
          !audioFormData.exampleData ||
          !storedApiKey
        )
          return obsOf(null);
        const headers = {
          'X-API-KEY': storedApiKey,
          'X-USER-EMAIL': activeUserData.email,
        };
        const url = `http://127.0.0.1:5000/audioformcompilation`;
        const body = {
          name: audioFormData.formSchema.name,
          schema: audioFormData.formSchema.schema.nodes,
          exampledata: audioFormData.exampleData,
          choices: audioFormData.formSchema.schema.choicesOrigins ?? {},
          transcribedAudio,
        };
        return this._http.post<any>(url, body, {headers});
      }),
      take(1),
    );
  }

  private _record() {
    if (!this.stream) return;
    this._setupRecorder();
    if (!this.recorder) return;
    this.recorder.start();
    this._startTime = new Date();
    this.interval = setInterval(() => {
      const currentTime = new Date();
      const diffTime = intervalToDuration({start: this._startTime!, end: currentTime});
      const recordingTime = `${diffTime.minutes}:${diffTime.seconds!.toString().padStart(2, '0')}`;
      this._recordingTime.next(recordingTime);
    }, 1000);
  }

  private _setupRecorder() {
    if (!this.stream) return;
    let data: BlobPart[] = [];
    this.recorder = new MediaRecorder(this.stream);

    this.recorder.addEventListener('start', _e => {
      data.length = 0;
    });

    this.recorder.addEventListener('dataavailable', event => {
      data.push(event.data);
    });

    this.recorder.addEventListener('stop', () => {
      const blob = new Blob(data, {
        'type': 'audio/mp3',
      });
      if (this._startTime) {
        const mp3Name = encodeURIComponent('audio_' + new Date().getTime() + '.mp3');
        this.stopMedia();
        this._recorded.next({blob: blob, title: mp3Name});
      }
    });
  }

  stopRecording() {
    if (this.recorder) {
      this.recorder.stop();
    }
  }

  private stopMedia() {
    if (this.recorder) {
      this.recorder = null;
      clearInterval(this.interval);
      this._startTime = null;
      if (this.stream) {
        this.stream.getAudioTracks().forEach(track => track.stop());
        this.stream = null;
      }
    }
  }
}
