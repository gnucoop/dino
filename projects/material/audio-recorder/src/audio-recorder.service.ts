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

import {Inject, Injectable, isDevMode} from '@angular/core';
import {Subject, Observable, of as obsOf, BehaviorSubject} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';
import {TranscriptionFile, TranscribeResponse} from './audio-interfaces';
import {intervalToDuration} from 'date-fns';
import {UserDataManager} from '@dino/core/users';
import {TranslocoService} from '@ajf/core/transloco';
import {HttpClient} from '@angular/common/http';
import {FormSchema} from '@dino/core/forms';
import {PANDINO_SERVICE_CONFIG, PandinoConfig} from '@dino/core/data';
/**
 * How many microphone levels the recorder keeps and shows.
 */
const LEVELS_COUNT = 14;

/**
 * Service that provides methods to record, reproduce and save audio from user mic input.
 * Audio can also be sent to Pandino API to be transcribed or to compile a Form.
 */
@Injectable({providedIn: 'root'})
export class AudioRecorderService {
  /**
   * The MediaStream
   */
  private stream: MediaStream | null = null;
  /**
   * MediaRecorder instance
   */
  private recorder: MediaRecorder | null = null;
  /**
   * Interval used to tick recording time
   */
  private interval: any;
  /**
   * Audio graph used to read the microphone input level while recording
   */
  private _audioContext: AudioContext | null = null;
  private _analyser: AnalyserNode | null = null;
  private _levelsInterval: any;
  /**
   * The instant the recording was paused, used to keep the elapsed time honest
   */
  private _pausedTime: Date | null = null;
  /**
   * Recorded audio starting time
   */
  private _startTime: Date | null = null;
  /**
   * The recorded Audio Blob
   */
  private _recorded: BehaviorSubject<TranscriptionFile | null> =
    new BehaviorSubject<TranscriptionFile | null>(null);
  /**
   * The recorded Audio time length
   */
  private _recordingTime = new Subject<string>();
  /**
   * Emits when recording fails
   */
  private _recordingFailed = new Subject<string>();
  /**
   * The most recent microphone input levels, from 0 to 1, oldest first
   */
  private _audioLevels = new BehaviorSubject<number[]>(new Array(LEVELS_COUNT).fill(0));

  constructor(
    @Inject(PANDINO_SERVICE_CONFIG) private _pandinoConfig: PandinoConfig,
    private _http: HttpClient,
    private _ts: TranslocoService,
    private _udm: UserDataManager,
  ) {}

  getRecordedBlob(): Observable<TranscriptionFile | null> {
    return this._recorded;
  }

  getRecordedTime(): Observable<string> {
    return this._recordingTime.asObservable();
  }

  /**
   * The microphone input levels of the last seconds, from 0 to 1, oldest first.
   * Emits a flat line when nothing is being recorded.
   */
  getAudioLevels(): Observable<number[]> {
    return this._audioLevels;
  }

  recordingFailed(): Observable<string> {
    return this._recordingFailed.asObservable();
  }

  /**
   * Starts the Audio recording after checking user mediaDevices.
   */
  startRecording(): void {
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

  /**
   * Aborts the Audio recording and clear the already recorded blob
   */
  abortRecording(): void {
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
    if (!this._pandinoConfig || !this._pandinoConfig.pandinoUrl) return obsOf(null);
    return this._udm.getActiveUserData().pipe(
      switchMap(activeUserData => {
        const storedApiKey = localStorage.getItem('pandas_dino_api_key');
        if (!activeUserData || !recordedAudio || !storedApiKey) return obsOf(null);
        const headers = {
          'X-API-KEY': storedApiKey,
          'X-USER-NAME': activeUserData.full_name,
          'X-USER-EMAIL': activeUserData.email,
        };
        const url = `${this._pandinoConfig.pandinoUrl}/transcribe`;
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
        const url = `${this._pandinoConfig.pandinoUrl}/audioformcompilation`;
        const body = {
          name: audioFormData.formSchema.name,
          exampledata: audioFormData.exampleData,
          choices: audioFormData.formSchema.schema.choicesOrigins ?? {},
          transcribedAudio,
        };
        return this._http.post<any>(url, body, {headers});
      }),
      take(1),
    );
  }

  /**
   * Sets the recorder uo and starts it, keeping track of the recording time
   */
  private _record(): void {
    if (!this.stream) return;
    this._setupRecorder();
    if (!this.recorder) return;
    this.recorder.start();
    this._startTime = new Date();
    this._tickRecordingTime();
    this._readAudioLevels();
  }

  /**
   * Publishes the elapsed recording time every second.
   */
  private _tickRecordingTime(): void {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      const currentTime = new Date();
      const diffTime = intervalToDuration({start: this._startTime!, end: currentTime});
      const minutes = (diffTime.minutes ?? 0).toString().padStart(2, '0');
      const recordingTime = `${minutes}:${diffTime.seconds!.toString().padStart(2, '0')}`;
      this._recordingTime.next(recordingTime);
    }, 1000);
  }

  /**
   * Reads the microphone input level off the stream and publishes a rolling
   * window of it, so that the recorder can show what it is picking up.
   */
  private _readAudioLevels(): void {
    if (this.stream == null) {
      return;
    }
    clearInterval(this._levelsInterval);
    if (this._audioContext == null) {
      const audioContext: AudioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      this._audioContext = audioContext;
      this._analyser = audioContext.createAnalyser();
      this._analyser.fftSize = 512;
      audioContext.createMediaStreamSource(this.stream).connect(this._analyser);
    }
    const analyser = this._analyser!;
    const samples = new Uint8Array(analyser.fftSize);
    this._levelsInterval = setInterval(() => {
      analyser.getByteTimeDomainData(samples);
      let sum = 0;
      for (const sample of samples) {
        const deviation = (sample - 128) / 128;
        sum += deviation * deviation;
      }
      // The root mean square of the waveform is a decent stand-in for loudness;
      // the factor spreads the quiet end of speech over the whole bar height.
      const level = Math.min(1, Math.sqrt(sum / samples.length) * 3);
      this._audioLevels.next([...this._audioLevels.value.slice(1), level]);
    }, 120);
  }

  /**
   * Sets the recorder up and adds event listeners
   */
  private _setupRecorder(): void {
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
      if (this._startTime) {
        const mp3Name = encodeURIComponent('audio_' + new Date().getTime() + '.mp3');
        this.stopMedia();
        this._recorded.next(new File(data, mp3Name, {type: 'audio/mp3'}));
      }
    });
  }

  /**
   * Pauses the recording, freezing the elapsed time with it.
   */
  pauseRecording(): void {
    if (this.recorder == null || this.recorder.state !== 'recording') {
      return;
    }
    this.recorder.pause();
    this._pausedTime = new Date();
    clearInterval(this.interval);
    clearInterval(this._levelsInterval);
    this._audioLevels.next(new Array(LEVELS_COUNT).fill(0));
  }

  /**
   * Resumes a paused recording. The time spent in pause does not count towards
   * the elapsed time, so the start is moved forward by as much.
   */
  resumeRecording(): void {
    if (this.recorder == null || this.recorder.state !== 'paused') {
      return;
    }
    if (this._startTime != null && this._pausedTime != null) {
      this._startTime = new Date(
        this._startTime.getTime() + (new Date().getTime() - this._pausedTime.getTime()),
      );
    }
    this._pausedTime = null;
    this.recorder.resume();
    this._tickRecordingTime();
    this._readAudioLevels();
  }

  /**
   * Stops the recorder
   */
  stopRecording(): void {
    if (this.recorder) {
      this.recorder.stop();
    }
  }

  /**
   * De-allocates the recorder, resets recording time and startTime, stops the stream audio tracks
   */
  private stopMedia(): void {
    if (this.recorder) {
      this.recorder = null;
      clearInterval(this.interval);
      clearInterval(this._levelsInterval);
      this._analyser = null;
      if (this._audioContext != null) {
        this._audioContext.close();
        this._audioContext = null;
      }
      this._audioLevels.next(new Array(LEVELS_COUNT).fill(0));
      this._startTime = null;
      this._pausedTime = null;
      if (this.stream) {
        this.stream.getAudioTracks().forEach(track => track.stop());
        this.stream = null;
      }
    }
  }
}
