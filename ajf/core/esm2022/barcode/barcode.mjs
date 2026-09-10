/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
import { Directive, ElementRef, EventEmitter, ViewChild, } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { from, throwError } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
const _c0 = ["barcodeVideo"];
const _c1 = ["barcodeVideoPreview"];
const _c2 = ["barcodeImagePreview"];
const _c3 = ["videoSourceSelect"];
export class AjfBarcode {
    get videoSource() {
        return this._video;
    }
    get value() {
        return this._barcodeValue;
    }
    set value(value) {
        if (this._barcodeValue !== value) {
            this._barcodeValue = value;
            this._cdr.detectChanges();
            this._onChangeCallback(value);
        }
    }
    get supportsVideoStream() {
        return this._supportsVideoStream;
    }
    get toggle() {
        return this._toggle;
    }
    set toggle(val) {
        this._toggle = val;
        this._cdr.markForCheck();
    }
    get showSwitchButton() {
        return this._showSwitchButton;
    }
    get videoDevices() {
        return this._videoDevices;
    }
    get currentVideoStream() {
        return this._currentVideoStream;
    }
    constructor(_cdr, _renderer) {
        this._cdr = _cdr;
        this._renderer = _renderer;
        this.resetEvt = new EventEmitter();
        /**
         * implement the control form value.
         * rappresent the barcode value.
         *
         * @memberof AjfBarcode
         */
        this._barcodeValue = '';
        this._supportsVideoStream = false;
        this._toggle = 'drop';
        this._showSwitchButton = false;
        /**
         * The mediastream currently being streamed
         */
        this._currentVideoStream = null;
        this._codeReader = new BrowserMultiFormatReader();
        this._onChangeCallback = (_) => { };
        this._onTouchedCallback = () => { };
        this._supportsVideoStream =
            navigator.mediaDevices != null && navigator.mediaDevices.enumerateDevices != null;
        this._videoDevices = this._getVideoDevices();
    }
    reset() {
        this.value = '';
        const video = this.barcodeVideo?.nativeElement ?? null;
        this.resetEvt.emit();
        this.initVideoStreams();
        if (video) {
            video.play();
        }
        this._onTouchedCallback();
    }
    onSelectFile(evt) {
        if (evt == null || evt.target == null) {
            return;
        }
        const target = evt.target;
        const files = target.files;
        this._onSelect(files);
    }
    onSelectDrop(files) {
        if (files == null) {
            return;
        }
        this._onSelect(files);
    }
    onTabChange(idx) {
        if (this._scannerControls != null) {
            this._scannerControls.stop();
            this._scannerControls = undefined;
        }
        if (idx === 1) {
            this.initVideoStreams();
            if (this.barcodeVideo == null || this.barcodeVideoPreview == null) {
                return;
            }
            const video = this.barcodeVideo.nativeElement;
            const preview = this.barcodeVideoPreview.nativeElement;
            this._renderer.addClass(preview, 'ajf-video-preview-hidden');
            this._codeReader
                .decodeFromVideoElement(video, result => {
                if (result == null) {
                    return;
                }
                if (this._scannerControls != null) {
                    this._scannerControls.stop();
                }
                const points = result.getResultPoints();
                const nw = points[0];
                const se = points[1];
                const lx = Math.max((nw.getX() / video.videoWidth) * video.clientWidth, -10, 0);
                const ly = Math.max((nw.getY() / video.videoHeight) * video.clientHeight - 10, 0);
                const rx = Math.min((se.getX() / video.videoWidth) * video.clientWidth + 10, video.clientWidth);
                const ry = Math.min((se.getY() / video.videoHeight) * video.clientHeight + 10, video.clientHeight);
                this._renderer.setStyle(preview, 'top', `${ly}px`);
                this._renderer.setStyle(preview, 'left', `${lx}px`);
                this._renderer.setStyle(preview, 'width', `${rx - lx}px`);
                this._renderer.setStyle(preview, 'height', `${ry - ly}px`);
                this._renderer.removeClass(preview, 'ajf-video-preview-hidden');
                this.value = result.getText();
            })
                .then(controls => {
                this._scannerControls = controls;
                this.stopCurrentStream();
                video.pause();
            });
        }
    }
    switchCamera() {
        this.initVideoStreams();
    }
    /** ControlValueAccessor implements */
    writeValue(value) {
        this._barcodeValue = value;
    }
    registerOnChange(fn) {
        this._onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this._onTouchedCallback = fn;
    }
    _onSelect(files) {
        if (files != null && files.length > 0 && files[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = (ev) => {
                if (!ev.loaded) {
                    return;
                }
                const data = reader.result;
                this._setImagePreview(`url(${data})`);
                this._codeReader
                    .decodeFromImageUrl(data)
                    .then(res => {
                    this.value = res.getText();
                })
                    .catch(() => { });
            };
        }
    }
    _setImagePreview(img) {
        if (this.barcodeImagePreview != null) {
            this._renderer.setStyle(this.barcodeImagePreview.nativeElement, 'background-image', img);
        }
    }
    initVideoStreams() {
        this.getStream().pipe(take(1)).subscribe();
    }
    /**
     * Gets all video mediaDevices (cameras)
     * @returns An observable with all video mediaDevices
     */
    _getVideoDevices() {
        return from(navigator.mediaDevices.enumerateDevices()).pipe(map(devices => devices.filter(device => device.kind === 'videoinput')));
    }
    /**
     * Gets the current video stream and updates the video element source
     * @returns An observable of the current media stream
     */
    getStream() {
        if (this._currentVideoStream) {
            this._currentVideoStream.getTracks().forEach(track => {
                track.stop();
            });
        }
        const videoSource = this.videoSourceSelect?.value;
        const constraints = {
            video: { deviceId: videoSource ? { exact: videoSource } : undefined },
        };
        return from(navigator.mediaDevices.getUserMedia(constraints)).pipe(tap(stream => {
            this._gotStream(stream);
        }), catchError(err => throwError(() => err)));
    }
    /**
     * Updates the video element source with the current video stream
     * @param stream The video stream
     */
    _gotStream(stream) {
        this._currentVideoStream = stream;
        if (this.barcodeVideo) {
            this.barcodeVideo.nativeElement.srcObject = stream;
        }
        this._cdr.markForCheck();
    }
    stopCurrentStream() {
        if (this.barcodeVideo == undefined) {
            return;
        }
        const video = this.barcodeVideo.nativeElement;
        const stream = video.srcObject;
        if (stream == null)
            return;
        const tracks = stream.getVideoTracks();
        tracks.forEach(track => track.stop());
    }
    static { this.ɵfac = function AjfBarcode_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfBarcode)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.Renderer2)); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AjfBarcode, viewQuery: function AjfBarcode_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5, ElementRef);
            i0.ɵɵviewQuery(_c1, 5, ElementRef);
            i0.ɵɵviewQuery(_c2, 5, ElementRef);
            i0.ɵɵviewQuery(_c3, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.barcodeVideo = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.barcodeVideoPreview = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.barcodeImagePreview = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.videoSourceSelect = _t.first);
        } } }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfBarcode, [{
        type: Directive
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }], { barcodeVideo: [{
            type: ViewChild,
            args: ['barcodeVideo', { read: ElementRef }]
        }], barcodeVideoPreview: [{
            type: ViewChild,
            args: ['barcodeVideoPreview', { read: ElementRef }]
        }], barcodeImagePreview: [{
            type: ViewChild,
            args: ['barcodeImagePreview', { read: ElementRef }]
        }], videoSourceSelect: [{
            type: ViewChild,
            args: ['videoSourceSelect']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvYmFyY29kZS9zcmMvYmFyY29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBRVosU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBQyx3QkFBd0IsRUFBbUIsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxRSxPQUFPLEVBQWEsSUFBSSxFQUFFLFVBQVUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNsRCxPQUFPLEVBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQUcxRCxNQUFNLE9BQWdCLFVBQVU7SUFvQjlCLElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBU0QsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7SUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFhO1FBQ3JCLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxLQUFLLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxDQUFDO0lBQ0gsQ0FBQztJQUdELElBQUksbUJBQW1CO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDO0lBQ25DLENBQUM7SUFHRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUNELElBQUksTUFBTSxDQUFDLEdBQVc7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QUdILFVBQVU7bUNBRVYsVUFBVTs7Ozs7Ozs7OztpRkFQL0IsVUFBVTtjQUQvQixTQUFTOzBFQUd1QyxZQUFZO2tCQUExRCxTQUFTO21CQUFDLGNBQWMsRUFBRSxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUM7WUFJN0MsbUJBQW1CO2tCQURsQixTQUFTO21CQUFDLHFCQUFxQixFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBQztZQUdwRCxtQkFBbUI7a0JBRGxCLFNBQVM7bUJBQUMscUJBQXFCLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDO1lBS3BCLGlCQUFpQjtrQkFBaEQsU0FBUzttQkFBQyxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgUmVuZGVyZXIyLFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtNYXRTZWxlY3R9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NlbGVjdCc7XG5pbXBvcnQge0Jyb3dzZXJNdWx0aUZvcm1hdFJlYWRlciwgSVNjYW5uZXJDb250cm9sc30gZnJvbSAnQHp4aW5nL2Jyb3dzZXInO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBmcm9tLCB0aHJvd0Vycm9yfSBmcm9tICdyeGpzJztcbmltcG9ydCB7Y2F0Y2hFcnJvciwgbWFwLCB0YWtlLCB0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmQmFyY29kZSBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgcmVzZXRFdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQFZpZXdDaGlsZCgnYmFyY29kZVZpZGVvJywge3JlYWQ6IEVsZW1lbnRSZWZ9KSBiYXJjb2RlVmlkZW86XG4gICAgfCBFbGVtZW50UmVmPEhUTUxWaWRlb0VsZW1lbnQ+XG4gICAgfCB1bmRlZmluZWQ7XG4gIEBWaWV3Q2hpbGQoJ2JhcmNvZGVWaWRlb1ByZXZpZXcnLCB7cmVhZDogRWxlbWVudFJlZn0pXG4gIGJhcmNvZGVWaWRlb1ByZXZpZXchOiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50PjtcbiAgQFZpZXdDaGlsZCgnYmFyY29kZUltYWdlUHJldmlldycsIHtyZWFkOiBFbGVtZW50UmVmfSlcbiAgYmFyY29kZUltYWdlUHJldmlldyE6IEVsZW1lbnRSZWY8SFRNTEltYWdlRWxlbWVudD47XG4gIC8qKlxuICAgKiBUaGUgTWF0IHNlbGVjdCBjb21wb25lbnQgZm9yIGNob29zaW5nIHRoZSBwcmVmZXJyZWQgdmlkZW8gc291cmNlXG4gICAqL1xuICBAVmlld0NoaWxkKCd2aWRlb1NvdXJjZVNlbGVjdCcpIHZpZGVvU291cmNlU2VsZWN0ITogTWF0U2VsZWN0O1xuXG4gIC8qKlxuICAgKiBBIGh0bWwgdmlkZW8gZWxlbWVudCBjcmVhdGVkIGF0IHJ1bnRpbWVcbiAgICpcbiAgICogQG1lbWJlcm9mIEFqZkJhcmNvZGVcbiAgICovXG4gIHByaXZhdGUgX3ZpZGVvPzogSFRNTFZpZGVvRWxlbWVudDtcbiAgZ2V0IHZpZGVvU291cmNlKCk6IEhUTUxWaWRlb0VsZW1lbnQgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl92aWRlbztcbiAgfVxuXG4gIC8qKlxuICAgKiBpbXBsZW1lbnQgdGhlIGNvbnRyb2wgZm9ybSB2YWx1ZS5cbiAgICogcmFwcHJlc2VudCB0aGUgYmFyY29kZSB2YWx1ZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIEFqZkJhcmNvZGVcbiAgICovXG4gIHByaXZhdGUgX2JhcmNvZGVWYWx1ZSA9ICcnO1xuICBnZXQgdmFsdWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fYmFyY29kZVZhbHVlO1xuICB9XG4gIHNldCB2YWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX2JhcmNvZGVWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX2JhcmNvZGVWYWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5fY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3N1cHBvcnRzVmlkZW9TdHJlYW0gPSBmYWxzZTtcbiAgZ2V0IHN1cHBvcnRzVmlkZW9TdHJlYW0oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3N1cHBvcnRzVmlkZW9TdHJlYW07XG4gIH1cblxuICBwcml2YXRlIF90b2dnbGUgPSAnZHJvcCc7XG4gIGdldCB0b2dnbGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RvZ2dsZTtcbiAgfVxuICBzZXQgdG9nZ2xlKHZhbDogc3RyaW5nKSB7XG4gICAgdGhpcy5fdG9nZ2xlID0gdmFsO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Nob3dTd2l0Y2hCdXR0b24gPSBmYWxzZTtcbiAgZ2V0IHNob3dTd2l0Y2hCdXR0b24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3Nob3dTd2l0Y2hCdXR0b247XG4gIH1cblxuICAvKipcbiAgICogQW4gb2JzZXJ2YWJsZSBvZiBhbGwgdmlkZW8gbWVkaWFEZXZpY2VzXG4gICAqL1xuICBwcml2YXRlIF92aWRlb0RldmljZXM6IE9ic2VydmFibGU8TWVkaWFEZXZpY2VJbmZvW10+O1xuICBnZXQgdmlkZW9EZXZpY2VzKCkge1xuICAgIHJldHVybiB0aGlzLl92aWRlb0RldmljZXM7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG1lZGlhc3RyZWFtIGN1cnJlbnRseSBiZWluZyBzdHJlYW1lZFxuICAgKi9cbiAgcHJpdmF0ZSBfY3VycmVudFZpZGVvU3RyZWFtOiBNZWRpYVN0cmVhbSB8IG51bGwgPSBudWxsO1xuICBnZXQgY3VycmVudFZpZGVvU3RyZWFtKCkge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50VmlkZW9TdHJlYW07XG4gIH1cblxuICBwcml2YXRlIF9zY2FubmVyQ29udHJvbHM/OiBJU2Nhbm5lckNvbnRyb2xzO1xuICBwcml2YXRlIF9jb2RlUmVhZGVyID0gbmV3IEJyb3dzZXJNdWx0aUZvcm1hdFJlYWRlcigpO1xuXG4gIHByaXZhdGUgX29uQ2hhbmdlQ2FsbGJhY2sgPSAoXzogYW55KSA9PiB7fTtcbiAgcHJpdmF0ZSBfb25Ub3VjaGVkQ2FsbGJhY2sgPSAoKSA9PiB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICB0aGlzLl9zdXBwb3J0c1ZpZGVvU3RyZWFtID1cbiAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMgIT0gbnVsbCAmJiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMgIT0gbnVsbDtcbiAgICB0aGlzLl92aWRlb0RldmljZXMgPSB0aGlzLl9nZXRWaWRlb0RldmljZXMoKTtcbiAgfVxuXG4gIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSAnJztcbiAgICBjb25zdCB2aWRlbyA9IHRoaXMuYmFyY29kZVZpZGVvPy5uYXRpdmVFbGVtZW50ID8/IG51bGw7XG4gICAgdGhpcy5yZXNldEV2dC5lbWl0KCk7XG4gICAgdGhpcy5pbml0VmlkZW9TdHJlYW1zKCk7XG4gICAgaWYgKHZpZGVvKSB7XG4gICAgICB2aWRlby5wbGF5KCk7XG4gICAgfVxuICAgIHRoaXMuX29uVG91Y2hlZENhbGxiYWNrKCk7XG4gIH1cblxuICBvblNlbGVjdEZpbGUoZXZ0OiBFdmVudCk6IHZvaWQge1xuICAgIGlmIChldnQgPT0gbnVsbCB8fCBldnQudGFyZ2V0ID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdGFyZ2V0ID0gZXZ0LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGNvbnN0IGZpbGVzID0gdGFyZ2V0LmZpbGVzIGFzIEZpbGVMaXN0O1xuICAgIHRoaXMuX29uU2VsZWN0KGZpbGVzKTtcbiAgfVxuXG4gIG9uU2VsZWN0RHJvcChmaWxlczogRmlsZUxpc3QpOiB2b2lkIHtcbiAgICBpZiAoZmlsZXMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9vblNlbGVjdChmaWxlcyk7XG4gIH1cblxuICBvblRhYkNoYW5nZShpZHg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLl9zY2FubmVyQ29udHJvbHMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fc2Nhbm5lckNvbnRyb2xzLnN0b3AoKTtcbiAgICAgIHRoaXMuX3NjYW5uZXJDb250cm9scyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKGlkeCA9PT0gMSkge1xuICAgICAgdGhpcy5pbml0VmlkZW9TdHJlYW1zKCk7XG4gICAgICBpZiAodGhpcy5iYXJjb2RlVmlkZW8gPT0gbnVsbCB8fCB0aGlzLmJhcmNvZGVWaWRlb1ByZXZpZXcgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCB2aWRlbyA9IHRoaXMuYmFyY29kZVZpZGVvLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICBjb25zdCBwcmV2aWV3ID0gdGhpcy5iYXJjb2RlVmlkZW9QcmV2aWV3Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhwcmV2aWV3LCAnYWpmLXZpZGVvLXByZXZpZXctaGlkZGVuJyk7XG4gICAgICB0aGlzLl9jb2RlUmVhZGVyXG4gICAgICAgIC5kZWNvZGVGcm9tVmlkZW9FbGVtZW50KHZpZGVvLCByZXN1bHQgPT4ge1xuICAgICAgICAgIGlmIChyZXN1bHQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5fc2Nhbm5lckNvbnRyb2xzICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3NjYW5uZXJDb250cm9scy5zdG9wKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgcG9pbnRzID0gcmVzdWx0LmdldFJlc3VsdFBvaW50cygpO1xuICAgICAgICAgIGNvbnN0IG53ID0gcG9pbnRzWzBdO1xuICAgICAgICAgIGNvbnN0IHNlID0gcG9pbnRzWzFdO1xuICAgICAgICAgIGNvbnN0IGx4ID0gTWF0aC5tYXgoKG53LmdldFgoKSAvIHZpZGVvLnZpZGVvV2lkdGgpICogdmlkZW8uY2xpZW50V2lkdGgsIC0xMCwgMCk7XG4gICAgICAgICAgY29uc3QgbHkgPSBNYXRoLm1heCgobncuZ2V0WSgpIC8gdmlkZW8udmlkZW9IZWlnaHQpICogdmlkZW8uY2xpZW50SGVpZ2h0IC0gMTAsIDApO1xuICAgICAgICAgIGNvbnN0IHJ4ID0gTWF0aC5taW4oXG4gICAgICAgICAgICAoc2UuZ2V0WCgpIC8gdmlkZW8udmlkZW9XaWR0aCkgKiB2aWRlby5jbGllbnRXaWR0aCArIDEwLFxuICAgICAgICAgICAgdmlkZW8uY2xpZW50V2lkdGgsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCByeSA9IE1hdGgubWluKFxuICAgICAgICAgICAgKHNlLmdldFkoKSAvIHZpZGVvLnZpZGVvSGVpZ2h0KSAqIHZpZGVvLmNsaWVudEhlaWdodCArIDEwLFxuICAgICAgICAgICAgdmlkZW8uY2xpZW50SGVpZ2h0LFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUocHJldmlldywgJ3RvcCcsIGAke2x5fXB4YCk7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUocHJldmlldywgJ2xlZnQnLCBgJHtseH1weGApO1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHByZXZpZXcsICd3aWR0aCcsIGAke3J4IC0gbHh9cHhgKTtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShwcmV2aWV3LCAnaGVpZ2h0JywgYCR7cnkgLSBseX1weGApO1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHByZXZpZXcsICdhamYtdmlkZW8tcHJldmlldy1oaWRkZW4nKTtcbiAgICAgICAgICB0aGlzLnZhbHVlID0gcmVzdWx0LmdldFRleHQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oY29udHJvbHMgPT4ge1xuICAgICAgICAgIHRoaXMuX3NjYW5uZXJDb250cm9scyA9IGNvbnRyb2xzO1xuICAgICAgICAgIHRoaXMuc3RvcEN1cnJlbnRTdHJlYW0oKTtcbiAgICAgICAgICB2aWRlby5wYXVzZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzd2l0Y2hDYW1lcmEoKTogdm9pZCB7XG4gICAgdGhpcy5pbml0VmlkZW9TdHJlYW1zKCk7XG4gIH1cblxuICAvKiogQ29udHJvbFZhbHVlQWNjZXNzb3IgaW1wbGVtZW50cyAqL1xuICB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9iYXJjb2RlVmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcHJpdmF0ZSBfb25TZWxlY3QoZmlsZXM6IEZpbGVMaXN0KTogdm9pZCB7XG4gICAgaWYgKGZpbGVzICE9IG51bGwgJiYgZmlsZXMubGVuZ3RoID4gMCAmJiBmaWxlc1swXSkge1xuICAgICAgbGV0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGVzWzBdKTtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSAoZXY6IFByb2dyZXNzRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCFldi5sb2FkZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0YSA9IHJlYWRlci5yZXN1bHQgYXMgc3RyaW5nO1xuICAgICAgICB0aGlzLl9zZXRJbWFnZVByZXZpZXcoYHVybCgke2RhdGF9KWApO1xuICAgICAgICB0aGlzLl9jb2RlUmVhZGVyXG4gICAgICAgICAgLmRlY29kZUZyb21JbWFnZVVybChkYXRhKVxuICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gcmVzLmdldFRleHQoKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoKSA9PiB7fSk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NldEltYWdlUHJldmlldyhpbWc6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh0aGlzLmJhcmNvZGVJbWFnZVByZXZpZXcgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5iYXJjb2RlSW1hZ2VQcmV2aWV3Lm5hdGl2ZUVsZW1lbnQsICdiYWNrZ3JvdW5kLWltYWdlJywgaW1nKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgaW5pdFZpZGVvU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLmdldFN0cmVhbSgpLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdmlkZW8gbWVkaWFEZXZpY2VzIChjYW1lcmFzKVxuICAgKiBAcmV0dXJucyBBbiBvYnNlcnZhYmxlIHdpdGggYWxsIHZpZGVvIG1lZGlhRGV2aWNlc1xuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0VmlkZW9EZXZpY2VzKCk6IE9ic2VydmFibGU8TWVkaWFEZXZpY2VJbmZvW10+IHtcbiAgICByZXR1cm4gZnJvbShuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMoKSkucGlwZShcbiAgICAgIG1hcChkZXZpY2VzID0+IGRldmljZXMuZmlsdGVyKGRldmljZSA9PiBkZXZpY2Uua2luZCA9PT0gJ3ZpZGVvaW5wdXQnKSksXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBjdXJyZW50IHZpZGVvIHN0cmVhbSBhbmQgdXBkYXRlcyB0aGUgdmlkZW8gZWxlbWVudCBzb3VyY2VcbiAgICogQHJldHVybnMgQW4gb2JzZXJ2YWJsZSBvZiB0aGUgY3VycmVudCBtZWRpYSBzdHJlYW1cbiAgICovXG4gIHByb3RlY3RlZCBnZXRTdHJlYW0oKTogT2JzZXJ2YWJsZTxNZWRpYVN0cmVhbT4ge1xuICAgIGlmICh0aGlzLl9jdXJyZW50VmlkZW9TdHJlYW0pIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRWaWRlb1N0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKHRyYWNrID0+IHtcbiAgICAgICAgdHJhY2suc3RvcCgpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IHZpZGVvU291cmNlOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB0aGlzLnZpZGVvU291cmNlU2VsZWN0Py52YWx1ZSBhcyBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgY29uc3QgY29uc3RyYWludHMgPSB7XG4gICAgICB2aWRlbzoge2RldmljZUlkOiB2aWRlb1NvdXJjZSA/IHtleGFjdDogdmlkZW9Tb3VyY2V9IDogdW5kZWZpbmVkfSxcbiAgICB9O1xuICAgIHJldHVybiBmcm9tKG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzKSkucGlwZShcbiAgICAgIHRhcChzdHJlYW0gPT4ge1xuICAgICAgICB0aGlzLl9nb3RTdHJlYW0oc3RyZWFtKTtcbiAgICAgIH0pLFxuICAgICAgY2F0Y2hFcnJvcihlcnIgPT4gdGhyb3dFcnJvcigoKSA9PiBlcnIpKSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHZpZGVvIGVsZW1lbnQgc291cmNlIHdpdGggdGhlIGN1cnJlbnQgdmlkZW8gc3RyZWFtXG4gICAqIEBwYXJhbSBzdHJlYW0gVGhlIHZpZGVvIHN0cmVhbVxuICAgKi9cbiAgcHJpdmF0ZSBfZ290U3RyZWFtKHN0cmVhbTogTWVkaWFTdHJlYW0gfCBudWxsKSB7XG4gICAgdGhpcy5fY3VycmVudFZpZGVvU3RyZWFtID0gc3RyZWFtO1xuICAgIGlmICh0aGlzLmJhcmNvZGVWaWRlbykge1xuICAgICAgdGhpcy5iYXJjb2RlVmlkZW8ubmF0aXZlRWxlbWVudC5zcmNPYmplY3QgPSBzdHJlYW07XG4gICAgfVxuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHN0b3BDdXJyZW50U3RyZWFtKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmJhcmNvZGVWaWRlbyA9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdmlkZW8gPSB0aGlzLmJhcmNvZGVWaWRlby5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IHN0cmVhbTogTWVkaWFTdHJlYW0gfCBudWxsID0gdmlkZW8uc3JjT2JqZWN0IGFzIE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAgICBpZiAoc3RyZWFtID09IG51bGwpIHJldHVybjtcbiAgICBjb25zdCB0cmFja3MgPSBzdHJlYW0uZ2V0VmlkZW9UcmFja3MoKTtcbiAgICB0cmFja3MuZm9yRWFjaCh0cmFjayA9PiB0cmFjay5zdG9wKCkpO1xuICB9XG59XG4iXX0=