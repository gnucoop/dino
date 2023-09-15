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
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {MatSelect} from '@angular/material/select';
import {Observable, Subscription, from, throwError} from 'rxjs';
import {catchError, map, switchMap, take, tap} from 'rxjs/operators';

@Component({
  selector: 'dino-image-capture',
  templateUrl: 'image-capture.html',
  styleUrls: ['image-capture.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ImageCapture implements AfterViewInit, OnDestroy {
  @Input() videoWidth = 640;
  @Input() videoHeight = 480;

  @ViewChild('video')
  public video: ElementRef | undefined;

  @ViewChild('canvas')
  public canvas: ElementRef | undefined;
  /**
   * Event emitted whenever a pic snapshot is taken
   */
  @Output()
  capturedImageEvt: EventEmitter<any> = new EventEmitter<any>();
  /**
   * The Mat select component for choosing the preferred video source
   */
  @ViewChild('videoSourceSelect') videoSourceSelect!: MatSelect;
  /**
   * The mediastream currently being streamed
   */
  private _sourceSelectSub: Subscription = Subscription.EMPTY;
  /**
   * When emitted, the videosource is reset
   */
  private _resetEvt: EventEmitter<void> = new EventEmitter<void>();
  /**
   * Subscribes to the reset event.
   */
  private _resetSub: Subscription = Subscription.EMPTY;

  /**
   * An observable of all video mediaDevices
   */
  private _videoDevices: Observable<MediaDeviceInfo[]>;
  get videoDevices() {
    return this._videoDevices;
  }

  private _currentVideoStream: MediaStream | null = null;
  get currentVideoStream() {
    return this._currentVideoStream;
  }

  private _supportsVideoStream = false;
  get supportsVideoStream(): boolean {
    return this._supportsVideoStream;
  }

  constructor(private _cdr: ChangeDetectorRef) {
    this._supportsVideoStream =
      navigator.mediaDevices != null && navigator.mediaDevices.enumerateDevices != null;
    this._videoDevices = this._getVideoDevices();
    this._resetSub = this._resetEvt.subscribe(() => this._setupVideoSourceSub());
  }

  async ngAfterViewInit() {
    this._initVideoStreams();
    this._setupVideoSourceSub();
  }

  capture() {
    if (!this.video || !this.canvas) return;
    this.drawImageToCanvas(this.video.nativeElement);
    const newPic = this.canvas.nativeElement.toDataURL('image/png');
    this.capturedImageEvt.emit(newPic);
  }

  drawImageToCanvas(image: any) {
    if (!this.canvas) return;
    this.canvas.nativeElement
      .getContext('2d')
      .drawImage(image, 0, 0, this.videoWidth, this.videoHeight);
  }

  stopCurrentStream(): void {
    if (this.video == undefined) {
      return;
    }
    const video = this.video.nativeElement;
    const stream: MediaStream | null = video.srcObject as MediaStream | null;
    if (stream == null) return;
    const tracks = stream.getVideoTracks();
    tracks.forEach(track => track.stop());
  }

  /**
   * Resets the video element and the stream
   */
  reset(): void {
    const video = this.video?.nativeElement ?? null;
    this._resetEvt.emit();
    this._initVideoStreams();
    if (video) {
      video.play();
    }
  }

  /**
   * Updates the video element source with the current video stream
   * @param stream The video stream
   */
  private _gotStream(stream: MediaStream | null) {
    this._currentVideoStream = stream;
    if (this.video) {
      this.video.nativeElement.srcObject = stream;
    }
    this._cdr.markForCheck();
  }

  /**
   * Gets the current video stream and updates the video element source
   * @returns An observable of the current media stream
   */
  private _getStream(): Observable<MediaStream> {
    if (this._currentVideoStream) {
      this._currentVideoStream.getTracks().forEach(track => {
        track.stop();
      });
    }
    const videoSource: string | undefined = this.videoSourceSelect?.value as string | undefined;
    const constraints = {
      video: {deviceId: videoSource ? {exact: videoSource} : undefined},
    };
    return from(navigator.mediaDevices.getUserMedia(constraints)).pipe(
      tap(stream => {
        this._gotStream(stream);
      }),
      catchError(err => throwError(() => err)),
    );
  }

  private _setupVideoSourceSub() {
    if (this.videoSourceSelect == undefined) return;
    this._sourceSelectSub.unsubscribe();
    this._sourceSelectSub = this.videoSourceSelect.valueChange
      .pipe(switchMap(() => this._getStream()))
      .subscribe();
  }

  private _initVideoStreams(): void {
    this._getStream().pipe(take(1)).subscribe();
  }

  /**
   * Gets all video mediaDevices (cameras)
   * @returns An observable with all video mediaDevices
   */
  private _getVideoDevices(): Observable<MediaDeviceInfo[]> {
    return from(navigator.mediaDevices.enumerateDevices()).pipe(
      map(devices => devices.filter(device => device.kind === 'videoinput')),
    );
  }

  ngOnDestroy(): void {
    this.stopCurrentStream();
    this._sourceSelectSub.unsubscribe();
    this._resetSub.unsubscribe();
  }
}
