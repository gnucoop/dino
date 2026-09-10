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
import { AjfAudio } from '@ajf/core/audio';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/icon";
import * as i4 from "@angular/material/tooltip";
import * as i5 from "@ngneat/transloco";
function AjfAudioComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4)(1, "span", 5);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "transloco");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 6)(5, "button", 7);
    i0.ɵɵpipe(6, "transloco");
    i0.ɵɵlistener("click", function AjfAudioComponent_div_2_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.startRecording()); });
    i0.ɵɵelementStart(7, "mat-icon");
    i0.ɵɵtext(8, "fiber_manual_record");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "transloco");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 4, "empty"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r1.readonly)("matTooltip", i0.ɵɵpipeBind1(6, 6, "Start Recording"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 8, "Record"));
} }
function AjfAudioComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8)(1, "span", 5);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "transloco");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 6)(5, "button", 9);
    i0.ɵɵpipe(6, "transloco");
    i0.ɵɵlistener("click", function AjfAudioComponent_div_3_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.stopRecording()); });
    i0.ɵɵelementStart(7, "mat-icon");
    i0.ɵɵtext(8, "stop");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "span", 10);
    i0.ɵɵelement(10, "i")(11, "i")(12, "i")(13, "i")(14, "i")(15, "i");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 2, "recording"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("matTooltip", i0.ɵɵpipeBind1(6, 4, "Stop Recording"));
} }
function AjfAudioComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4)(1, "span", 5);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "transloco");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 6);
    i0.ɵɵelement(5, "audio", 11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 12);
    i0.ɵɵpipe(7, "transloco");
    i0.ɵɵlistener("click", function AjfAudioComponent_div_4_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.clearRecording()); });
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "transloco");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 5, "recorded"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("src", ctx_r1.safeAudioSrc, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.readonly)("matTooltip", i0.ɵɵpipeBind1(7, 7, "Delete Audio"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(9, 9, "Delete"), " ");
} }
export class AjfAudioComponent extends AjfAudio {
    constructor(cdr, _sanitizer) {
        super(cdr);
        this._sanitizer = _sanitizer;
        this.readonly = false;
        this.isRecording = false;
        this.mediaRecorder = null;
        this.audioChunks = [];
    }
    ngOnDestroy() {
        this.stopRecording();
    }
    /**
     * Sanitizes the audio source for playback, either from the base64 content
     * or, as a fallback, from the stored url.
     */
    get safeAudioSrc() {
        if (!this.value)
            return null;
        if (!this.value.content && this.value.deleteUrl)
            return null;
        const rawUrl = this.value.content && this.value.content.length ? this.value.content : this.value.url;
        if (!rawUrl)
            return null;
        return this._sanitizer.bypassSecurityTrustUrl(rawUrl);
    }
    async startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
            this.audioChunks = [];
            this.mediaRecorder.ondataavailable = event => {
                this.audioChunks.push(event.data);
            };
            this.mediaRecorder.onstop = () => {
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
                const reader = new FileReader();
                reader.readAsDataURL(audioBlob);
                reader.onloadend = () => {
                    const base64data = reader.result;
                    const head = 'data:audio/webm;base64,';
                    const audioFileSize = Math.round(((base64data.length - head.length) * 3) / 4);
                    // Keeps the old url to delete old audio from storage
                    this.value = {
                        name: 'audio.webm',
                        type: 'audio/webm',
                        size: audioFileSize,
                        content: base64data,
                        url: this.value?.url ?? undefined,
                        deleteUrl: false,
                    };
                    this._cdr.markForCheck();
                };
            };
            this.mediaRecorder.start();
            this.isRecording = true;
            this._cdr.markForCheck();
        }
        catch (err) {
            console.error('Error accessing microphone:', err);
        }
    }
    stopRecording() {
        if (this.mediaRecorder && this.isRecording) {
            this.mediaRecorder.stop();
            this.isRecording = false;
            this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
            this._cdr.markForCheck();
        }
    }
    /**
     * Clears the recording value and preview (keeps the old url to delete old audio from storage)
     */
    clearRecording() {
        this.audioChunks = [];
        this.value = {
            name: 'audio.webm',
            type: 'audio/webm',
            size: undefined,
            content: undefined,
            url: this.value?.url ?? undefined,
            deleteUrl: true,
        };
        this._cdr.markForCheck();
    }
    static { this.ɵfac = function AjfAudioComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfAudioComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.DomSanitizer)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfAudioComponent, selectors: [["ajf-audio"]], inputs: { readonly: "readonly" }, features: [i0.ɵɵProvidersFeature([
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: AjfAudioComponent,
                    multi: true,
                },
            ]), i0.ɵɵInheritDefinitionFeature], decls: 5, vars: 3, consts: [[1, "ajf-field-wrapper"], [1, "ajf-audio"], ["class", "ajf-audio-row", 4, "ngIf"], ["class", "ajf-audio-row ajf-audio-recording", 4, "ngIf"], [1, "ajf-audio-row"], [1, "ajf-audio-state"], [1, "ajf-audio-box"], ["type", "button", 1, "ajf-audio-action", "ajf-audio-rec", 3, "click", "disabled", "matTooltip"], [1, "ajf-audio-row", "ajf-audio-recording"], ["type", "button", 1, "ajf-audio-action", "ajf-audio-stop", 3, "click", "matTooltip"], ["aria-hidden", "true", 1, "ajf-audio-wave"], ["controls", "", 3, "src"], ["type", "button", 1, "ajf-audio-delete", 3, "click", "disabled", "matTooltip"]], template: function AjfAudioComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵtemplate(2, AjfAudioComponent_div_2_Template, 12, 10, "div", 2)(3, AjfAudioComponent_div_3_Template, 16, 6, "div", 3)(4, AjfAudioComponent_div_4_Template, 10, 11, "div", 2);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !ctx.isRecording && !ctx.safeAudioSrc);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isRecording);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isRecording && ctx.safeAudioSrc);
        } }, dependencies: [i2.NgIf, i3.MatIcon, i4.MatTooltip, i5.TranslocoPipe], styles: ["ajf-audio{display:block;width:100%}ajf-audio .ajf-audio{display:flex;flex-direction:column;gap:8px}ajf-audio .ajf-audio-row{display:flex;align-items:center;gap:12px}ajf-audio .ajf-audio-state{flex:0 0 84px;color:var(--ajf-text-muted, #7a736a);font-family:var(--ajf-font-mono, monospace);font-size:11px;letter-spacing:.09em;text-align:right;text-transform:uppercase}ajf-audio .ajf-audio-box{display:flex;flex:1 1 auto;align-items:center;gap:12px;min-width:0;max-width:400px;box-sizing:border-box;min-height:var(--ajf-control-h, 44px);padding:0 12px;border:1px solid var(--ajf-border-strong, #d5cfc6);border-radius:var(--ajf-radius, 4px);background:var(--ajf-surface, #fff)}ajf-audio .ajf-audio-action{display:inline-flex;align-items:center;gap:8px;padding:0;border:0;background:none;color:var(--ajf-text, #1c1a17);font-family:inherit;font-size:14px;cursor:pointer}ajf-audio .ajf-audio-action:disabled{color:var(--ajf-text-faint, #a49c92);cursor:default}ajf-audio .ajf-audio-action .mat-icon{color:var(--ajf-danger, #b8362b)}ajf-audio .ajf-audio-recording .ajf-audio-box{border-color:var(--ajf-danger, #b8362b);background:var(--ajf-danger-bg, #fdf1ef)}ajf-audio .ajf-audio-recording .ajf-audio-state{color:var(--ajf-danger, #b8362b)}ajf-audio .ajf-audio-wave{display:inline-flex;align-items:flex-end;gap:2px;height:18px}ajf-audio .ajf-audio-wave i{width:3px;background:var(--ajf-danger, #b8362b);animation:ajf-audio-pulse 1s ease-in-out infinite}ajf-audio .ajf-audio-wave i:nth-child(1){height:40%;animation-delay:0s}ajf-audio .ajf-audio-wave i:nth-child(2){height:80%;animation-delay:.1s}ajf-audio .ajf-audio-wave i:nth-child(3){height:55%;animation-delay:.2s}ajf-audio .ajf-audio-wave i:nth-child(4){height:100%;animation-delay:.3s}ajf-audio .ajf-audio-wave i:nth-child(5){height:65%;animation-delay:.4s}ajf-audio .ajf-audio-wave i:nth-child(6){height:35%;animation-delay:.5s}ajf-audio .ajf-audio-delete{padding:0 4px;border:0;background:none;color:var(--ajf-danger, #b8362b);font-family:inherit;font-size:14px;cursor:pointer}ajf-audio .ajf-audio-delete:hover:not(:disabled){text-decoration:underline}ajf-audio .ajf-audio-delete:disabled{color:var(--ajf-text-faint, #a49c92);cursor:default}ajf-audio audio{width:100%;min-width:0;height:36px;outline:none}@keyframes ajf-audio-pulse{0%,to{transform:scaleY(.6)}50%{transform:scaleY(1)}}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfAudioComponent, [{
        type: Component,
        args: [{ selector: 'ajf-audio', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: AjfAudioComponent,
                        multi: true,
                    },
                ], template: "<div class=\"ajf-field-wrapper\">\n  <div class=\"ajf-audio\">\n    <!-- Nothing recorded yet -->\n    <div class=\"ajf-audio-row\" *ngIf=\"!isRecording && !safeAudioSrc\">\n      <span class=\"ajf-audio-state\">{{ 'empty' | transloco }}</span>\n      <div class=\"ajf-audio-box\">\n        <button\n          type=\"button\"\n          class=\"ajf-audio-action ajf-audio-rec\"\n          (click)=\"startRecording()\"\n          [disabled]=\"readonly\"\n          [matTooltip]=\"'Start Recording' | transloco\"\n        >\n          <mat-icon>fiber_manual_record</mat-icon>\n          <span>{{ 'Record' | transloco }}</span>\n        </button>\n      </div>\n    </div>\n\n    <!-- Recording in progress -->\n    <div class=\"ajf-audio-row ajf-audio-recording\" *ngIf=\"isRecording\">\n      <span class=\"ajf-audio-state\">{{ 'recording' | transloco }}</span>\n      <div class=\"ajf-audio-box\">\n        <button\n          type=\"button\"\n          class=\"ajf-audio-action ajf-audio-stop\"\n          (click)=\"stopRecording()\"\n          [matTooltip]=\"'Stop Recording' | transloco\"\n        >\n          <mat-icon>stop</mat-icon>\n        </button>\n        <span class=\"ajf-audio-wave\" aria-hidden=\"true\">\n          <i></i><i></i><i></i><i></i><i></i><i></i>\n        </span>\n      </div>\n    </div>\n\n    <!-- A recording is held -->\n    <div class=\"ajf-audio-row\" *ngIf=\"!isRecording && safeAudioSrc\">\n      <span class=\"ajf-audio-state\">{{ 'recorded' | transloco }}</span>\n      <div class=\"ajf-audio-box\">\n        <audio [src]=\"safeAudioSrc\" controls></audio>\n      </div>\n      <button\n        type=\"button\"\n        class=\"ajf-audio-delete\"\n        (click)=\"clearRecording()\"\n        [disabled]=\"readonly\"\n        [matTooltip]=\"'Delete Audio' | transloco\"\n      >\n        {{ 'Delete' | transloco }}\n      </button>\n    </div>\n  </div>\n</div>\n", styles: ["ajf-audio{display:block;width:100%}ajf-audio .ajf-audio{display:flex;flex-direction:column;gap:8px}ajf-audio .ajf-audio-row{display:flex;align-items:center;gap:12px}ajf-audio .ajf-audio-state{flex:0 0 84px;color:var(--ajf-text-muted, #7a736a);font-family:var(--ajf-font-mono, monospace);font-size:11px;letter-spacing:.09em;text-align:right;text-transform:uppercase}ajf-audio .ajf-audio-box{display:flex;flex:1 1 auto;align-items:center;gap:12px;min-width:0;max-width:400px;box-sizing:border-box;min-height:var(--ajf-control-h, 44px);padding:0 12px;border:1px solid var(--ajf-border-strong, #d5cfc6);border-radius:var(--ajf-radius, 4px);background:var(--ajf-surface, #fff)}ajf-audio .ajf-audio-action{display:inline-flex;align-items:center;gap:8px;padding:0;border:0;background:none;color:var(--ajf-text, #1c1a17);font-family:inherit;font-size:14px;cursor:pointer}ajf-audio .ajf-audio-action:disabled{color:var(--ajf-text-faint, #a49c92);cursor:default}ajf-audio .ajf-audio-action .mat-icon{color:var(--ajf-danger, #b8362b)}ajf-audio .ajf-audio-recording .ajf-audio-box{border-color:var(--ajf-danger, #b8362b);background:var(--ajf-danger-bg, #fdf1ef)}ajf-audio .ajf-audio-recording .ajf-audio-state{color:var(--ajf-danger, #b8362b)}ajf-audio .ajf-audio-wave{display:inline-flex;align-items:flex-end;gap:2px;height:18px}ajf-audio .ajf-audio-wave i{width:3px;background:var(--ajf-danger, #b8362b);animation:ajf-audio-pulse 1s ease-in-out infinite}ajf-audio .ajf-audio-wave i:nth-child(1){height:40%;animation-delay:0s}ajf-audio .ajf-audio-wave i:nth-child(2){height:80%;animation-delay:.1s}ajf-audio .ajf-audio-wave i:nth-child(3){height:55%;animation-delay:.2s}ajf-audio .ajf-audio-wave i:nth-child(4){height:100%;animation-delay:.3s}ajf-audio .ajf-audio-wave i:nth-child(5){height:65%;animation-delay:.4s}ajf-audio .ajf-audio-wave i:nth-child(6){height:35%;animation-delay:.5s}ajf-audio .ajf-audio-delete{padding:0 4px;border:0;background:none;color:var(--ajf-danger, #b8362b);font-family:inherit;font-size:14px;cursor:pointer}ajf-audio .ajf-audio-delete:hover:not(:disabled){text-decoration:underline}ajf-audio .ajf-audio-delete:disabled{color:var(--ajf-text-faint, #a49c92);cursor:default}ajf-audio audio{width:100%;min-width:0;height:36px;outline:none}@keyframes ajf-audio-pulse{0%,to{transform:scaleY(.6)}50%{transform:scaleY(1)}}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1.DomSanitizer }], { readonly: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfAudioComponent, { className: "AjfAudioComponent", filePath: "src/audio.ts", lineNumber: 49 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9hdWRpby9zcmMvYXVkaW8udHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9hdWRpby9zcmMvYXVkaW8uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsS0FBSyxFQUVMLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7O0lDM0IzQyxBQURGLDhCQUFpRSxjQUNqQztJQUFBLFlBQXlCOztJQUFBLGlCQUFPO0lBRTVELEFBREYsOEJBQTJCLGdCQU94Qjs7SUFIQyw2S0FBUyx1QkFBZ0IsS0FBQztJQUkxQixnQ0FBVTtJQUFBLG1DQUFtQjtJQUFBLGlCQUFXO0lBQ3hDLDRCQUFNO0lBQUEsYUFBMEI7O0lBR3RDLEFBREUsQUFERSxBQURrQyxpQkFBTyxFQUNoQyxFQUNMLEVBQ0Y7OztJQWIwQixlQUF5QjtJQUF6QixtREFBeUI7SUFNbkQsZUFBcUI7SUFDckIsQUFEQSwwQ0FBcUIsdURBQ3VCO0lBR3RDLGVBQTBCO0lBQTFCLHFEQUEwQjs7OztJQU9wQyxBQURGLDhCQUFtRSxjQUNuQztJQUFBLFlBQTZCOztJQUFBLGlCQUFPO0lBRWhFLEFBREYsOEJBQTJCLGdCQU14Qjs7SUFGQyw2S0FBUyxzQkFBZSxLQUFDO0lBR3pCLGdDQUFVO0lBQUEsb0JBQUk7SUFDaEIsQUFEZ0IsaUJBQVcsRUFDbEI7SUFDVCxnQ0FBZ0Q7SUFDWCxBQUFQLEFBQVAsQUFBUCxBQUFQLEFBQVAscUJBQU8sU0FBTyxTQUFPLFNBQU8sU0FBTyxTQUFPO0lBR2hELEFBREUsQUFERSxpQkFBTyxFQUNILEVBQ0Y7O0lBZDBCLGVBQTZCO0lBQTdCLHVEQUE2QjtJQU12RCxlQUEyQztJQUEzQyxtRUFBMkM7Ozs7SUFZL0MsQUFERiw4QkFBZ0UsY0FDaEM7SUFBQSxZQUE0Qjs7SUFBQSxpQkFBTztJQUNqRSw4QkFBMkI7SUFDekIsNEJBQTZDO0lBQy9DLGlCQUFNO0lBQ04sa0NBTUM7O0lBSEMsNktBQVMsdUJBQWdCLEtBQUM7SUFJMUIsWUFDRjs7SUFDRixBQURFLGlCQUFTLEVBQ0w7OztJQWIwQixlQUE0QjtJQUE1QixzREFBNEI7SUFFakQsZUFBb0I7SUFBcEIsMkRBQW9CO0lBTTNCLGNBQXFCO0lBQ3JCLEFBREEsMENBQXFCLG9EQUNvQjtJQUV6QyxlQUNGO0lBREUsK0RBQ0Y7O0FESE4sTUFBTSxPQUFPLGlCQUFrQixTQUFRLFFBQVE7SUFPN0MsWUFBWSxHQUFzQixFQUFVLFVBQXdCO1FBQ2xFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUQrQixlQUFVLEdBQVYsVUFBVSxDQUFjO1FBTjNELGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFMUIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDWixrQkFBYSxHQUF5QixJQUFJLENBQUM7UUFDM0MsZ0JBQVcsR0FBVSxFQUFFLENBQUM7SUFJaEMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7T0FHRztJQUNILElBQUksWUFBWTtRQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUU3RCxNQUFNLE1BQU0sR0FDVixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUN4RixJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRXpCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsS0FBSyxDQUFDLGNBQWM7UUFDbEIsSUFBSSxDQUFDO1lBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBTSxTQUFTLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1lBQ3hFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFFdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDLEVBQUU7Z0JBQzNDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUM7WUFFRixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7Z0JBQy9CLE1BQU0sU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBQyxJQUFJLEVBQUUsWUFBWSxFQUFDLENBQUMsQ0FBQztnQkFFbkUsTUFBTSxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztnQkFDaEMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDaEMsTUFBTSxDQUFDLFNBQVMsR0FBRyxHQUFHLEVBQUU7b0JBQ3RCLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFnQixDQUFDO29CQUMzQyxNQUFNLElBQUksR0FBRyx5QkFBeUIsQ0FBQztvQkFDdkMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQzlFLHFEQUFxRDtvQkFDckQsSUFBSSxDQUFDLEtBQUssR0FBRzt3QkFDWCxJQUFJLEVBQUUsWUFBWTt3QkFDbEIsSUFBSSxFQUFFLFlBQVk7d0JBQ2xCLElBQUksRUFBRSxhQUFhO3dCQUNuQixPQUFPLEVBQUUsVUFBVTt3QkFDbkIsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxJQUFJLFNBQVM7d0JBQ2pDLFNBQVMsRUFBRSxLQUFLO3FCQUNqQixDQUFDO29CQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQzNCLENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQztZQUVGLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMzQixDQUFDO1FBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEQsQ0FBQztJQUNILENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMzQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDM0IsQ0FBQztJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILGNBQWM7UUFDWixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1gsSUFBSSxFQUFFLFlBQVk7WUFDbEIsSUFBSSxFQUFFLFlBQVk7WUFDbEIsSUFBSSxFQUFFLFNBQVM7WUFDZixPQUFPLEVBQUUsU0FBUztZQUNsQixHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksU0FBUztZQUNqQyxTQUFTLEVBQUUsSUFBSTtTQUNoQixDQUFDO1FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQixDQUFDO2tIQTdGVSxpQkFBaUI7b0VBQWpCLGlCQUFpQixpR0FSakI7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjtvQkFDMUIsV0FBVyxFQUFFLGlCQUFpQjtvQkFDOUIsS0FBSyxFQUFFLElBQUk7aUJBQ1o7YUFDRjtZQzdDRCxBQURGLDhCQUErQixhQUNOO1lBcUNyQixBQWxCQSxBQWpCQSxvRUFBaUUsc0RBaUJFLHVEQWtCSDtZQWdCcEUsQUFERSxpQkFBTSxFQUNGOztZQW5EMEIsZUFBbUM7WUFBbkMsNERBQW1DO1lBaUJmLGNBQWlCO1lBQWpCLHNDQUFpQjtZQWtCckMsY0FBa0M7WUFBbEMsMkRBQWtDOzs7aUZEVXJELGlCQUFpQjtjQWQ3QixTQUFTOzJCQUNFLFdBQVcsbUJBR0osdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSSxhQUMxQjtvQkFDVDt3QkFDRSxPQUFPLEVBQUUsaUJBQWlCO3dCQUMxQixXQUFXLG1CQUFtQjt3QkFDOUIsS0FBSyxFQUFFLElBQUk7cUJBQ1o7aUJBQ0Y7NkVBR1EsUUFBUTtrQkFBaEIsS0FBSzs7a0ZBREssaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkF1ZGlvfSBmcm9tICdAYWpmL2NvcmUvYXVkaW8nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7RG9tU2FuaXRpemVyLCBTYWZlVXJsfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWF1ZGlvJyxcbiAgdGVtcGxhdGVVcmw6ICdhdWRpby5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2F1ZGlvLnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IEFqZkF1ZGlvQ29tcG9uZW50LFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmQXVkaW9Db21wb25lbnQgZXh0ZW5kcyBBamZBdWRpbyBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHJlYWRvbmx5ID0gZmFsc2U7XG5cbiAgaXNSZWNvcmRpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBtZWRpYVJlY29yZGVyOiBNZWRpYVJlY29yZGVyIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgYXVkaW9DaHVua3M6IGFueVtdID0gW107XG5cbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBfc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHtcbiAgICBzdXBlcihjZHIpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdG9wUmVjb3JkaW5nKCk7XG4gIH1cblxuICAvKipcbiAgICogU2FuaXRpemVzIHRoZSBhdWRpbyBzb3VyY2UgZm9yIHBsYXliYWNrLCBlaXRoZXIgZnJvbSB0aGUgYmFzZTY0IGNvbnRlbnRcbiAgICogb3IsIGFzIGEgZmFsbGJhY2ssIGZyb20gdGhlIHN0b3JlZCB1cmwuXG4gICAqL1xuICBnZXQgc2FmZUF1ZGlvU3JjKCk6IFNhZmVVcmwgfCBzdHJpbmcgfCBudWxsIHtcbiAgICBpZiAoIXRoaXMudmFsdWUpIHJldHVybiBudWxsO1xuICAgIGlmICghdGhpcy52YWx1ZS5jb250ZW50ICYmIHRoaXMudmFsdWUuZGVsZXRlVXJsKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IHJhd1VybCA9XG4gICAgICB0aGlzLnZhbHVlLmNvbnRlbnQgJiYgdGhpcy52YWx1ZS5jb250ZW50Lmxlbmd0aCA/IHRoaXMudmFsdWUuY29udGVudCA6IHRoaXMudmFsdWUudXJsO1xuICAgIGlmICghcmF3VXJsKSByZXR1cm4gbnVsbDtcblxuICAgIHJldHVybiB0aGlzLl9zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFVybChyYXdVcmwpO1xuICB9XG5cbiAgYXN5bmMgc3RhcnRSZWNvcmRpbmcoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHN0cmVhbSA9IGF3YWl0IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHthdWRpbzogdHJ1ZX0pO1xuICAgICAgdGhpcy5tZWRpYVJlY29yZGVyID0gbmV3IE1lZGlhUmVjb3JkZXIoc3RyZWFtKTtcbiAgICAgIHRoaXMuYXVkaW9DaHVua3MgPSBbXTtcblxuICAgICAgdGhpcy5tZWRpYVJlY29yZGVyLm9uZGF0YWF2YWlsYWJsZSA9IGV2ZW50ID0+IHtcbiAgICAgICAgdGhpcy5hdWRpb0NodW5rcy5wdXNoKGV2ZW50LmRhdGEpO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5tZWRpYVJlY29yZGVyLm9uc3RvcCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYXVkaW9CbG9iID0gbmV3IEJsb2IodGhpcy5hdWRpb0NodW5rcywge3R5cGU6ICdhdWRpby93ZWJtJ30pO1xuXG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGF1ZGlvQmxvYik7XG4gICAgICAgIHJlYWRlci5vbmxvYWRlbmQgPSAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgYmFzZTY0ZGF0YSA9IHJlYWRlci5yZXN1bHQgYXMgc3RyaW5nO1xuICAgICAgICAgIGNvbnN0IGhlYWQgPSAnZGF0YTphdWRpby93ZWJtO2Jhc2U2NCwnO1xuICAgICAgICAgIGNvbnN0IGF1ZGlvRmlsZVNpemUgPSBNYXRoLnJvdW5kKCgoYmFzZTY0ZGF0YS5sZW5ndGggLSBoZWFkLmxlbmd0aCkgKiAzKSAvIDQpO1xuICAgICAgICAgIC8vIEtlZXBzIHRoZSBvbGQgdXJsIHRvIGRlbGV0ZSBvbGQgYXVkaW8gZnJvbSBzdG9yYWdlXG4gICAgICAgICAgdGhpcy52YWx1ZSA9IHtcbiAgICAgICAgICAgIG5hbWU6ICdhdWRpby53ZWJtJyxcbiAgICAgICAgICAgIHR5cGU6ICdhdWRpby93ZWJtJyxcbiAgICAgICAgICAgIHNpemU6IGF1ZGlvRmlsZVNpemUsXG4gICAgICAgICAgICBjb250ZW50OiBiYXNlNjRkYXRhLFxuICAgICAgICAgICAgdXJsOiB0aGlzLnZhbHVlPy51cmwgPz8gdW5kZWZpbmVkLFxuICAgICAgICAgICAgZGVsZXRlVXJsOiBmYWxzZSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMubWVkaWFSZWNvcmRlci5zdGFydCgpO1xuICAgICAgdGhpcy5pc1JlY29yZGluZyA9IHRydWU7XG4gICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBhY2Nlc3NpbmcgbWljcm9waG9uZTonLCBlcnIpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BSZWNvcmRpbmcoKSB7XG4gICAgaWYgKHRoaXMubWVkaWFSZWNvcmRlciAmJiB0aGlzLmlzUmVjb3JkaW5nKSB7XG4gICAgICB0aGlzLm1lZGlhUmVjb3JkZXIuc3RvcCgpO1xuICAgICAgdGhpcy5pc1JlY29yZGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5tZWRpYVJlY29yZGVyLnN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKHRyYWNrID0+IHRyYWNrLnN0b3AoKSk7XG4gICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyB0aGUgcmVjb3JkaW5nIHZhbHVlIGFuZCBwcmV2aWV3IChrZWVwcyB0aGUgb2xkIHVybCB0byBkZWxldGUgb2xkIGF1ZGlvIGZyb20gc3RvcmFnZSlcbiAgICovXG4gIGNsZWFyUmVjb3JkaW5nKCk6IHZvaWQge1xuICAgIHRoaXMuYXVkaW9DaHVua3MgPSBbXTtcbiAgICB0aGlzLnZhbHVlID0ge1xuICAgICAgbmFtZTogJ2F1ZGlvLndlYm0nLFxuICAgICAgdHlwZTogJ2F1ZGlvL3dlYm0nLFxuICAgICAgc2l6ZTogdW5kZWZpbmVkLFxuICAgICAgY29udGVudDogdW5kZWZpbmVkLFxuICAgICAgdXJsOiB0aGlzLnZhbHVlPy51cmwgPz8gdW5kZWZpbmVkLFxuICAgICAgZGVsZXRlVXJsOiB0cnVlLFxuICAgIH07XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiYWpmLWZpZWxkLXdyYXBwZXJcIj5cbiAgPGRpdiBjbGFzcz1cImFqZi1hdWRpb1wiPlxuICAgIDwhLS0gTm90aGluZyByZWNvcmRlZCB5ZXQgLS0+XG4gICAgPGRpdiBjbGFzcz1cImFqZi1hdWRpby1yb3dcIiAqbmdJZj1cIiFpc1JlY29yZGluZyAmJiAhc2FmZUF1ZGlvU3JjXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImFqZi1hdWRpby1zdGF0ZVwiPnt7ICdlbXB0eScgfCB0cmFuc2xvY28gfX08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiYWpmLWF1ZGlvLWJveFwiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgY2xhc3M9XCJhamYtYXVkaW8tYWN0aW9uIGFqZi1hdWRpby1yZWNcIlxuICAgICAgICAgIChjbGljayk9XCJzdGFydFJlY29yZGluZygpXCJcbiAgICAgICAgICBbZGlzYWJsZWRdPVwicmVhZG9ubHlcIlxuICAgICAgICAgIFttYXRUb29sdGlwXT1cIidTdGFydCBSZWNvcmRpbmcnIHwgdHJhbnNsb2NvXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxtYXQtaWNvbj5maWJlcl9tYW51YWxfcmVjb3JkPC9tYXQtaWNvbj5cbiAgICAgICAgICA8c3Bhbj57eyAnUmVjb3JkJyB8IHRyYW5zbG9jbyB9fTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gUmVjb3JkaW5nIGluIHByb2dyZXNzIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJhamYtYXVkaW8tcm93IGFqZi1hdWRpby1yZWNvcmRpbmdcIiAqbmdJZj1cImlzUmVjb3JkaW5nXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImFqZi1hdWRpby1zdGF0ZVwiPnt7ICdyZWNvcmRpbmcnIHwgdHJhbnNsb2NvIH19PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImFqZi1hdWRpby1ib3hcIj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIGNsYXNzPVwiYWpmLWF1ZGlvLWFjdGlvbiBhamYtYXVkaW8tc3RvcFwiXG4gICAgICAgICAgKGNsaWNrKT1cInN0b3BSZWNvcmRpbmcoKVwiXG4gICAgICAgICAgW21hdFRvb2x0aXBdPVwiJ1N0b3AgUmVjb3JkaW5nJyB8IHRyYW5zbG9jb1wiXG4gICAgICAgID5cbiAgICAgICAgICA8bWF0LWljb24+c3RvcDwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImFqZi1hdWRpby13YXZlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgPGk+PC9pPjxpPjwvaT48aT48L2k+PGk+PC9pPjxpPjwvaT48aT48L2k+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPCEtLSBBIHJlY29yZGluZyBpcyBoZWxkIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJhamYtYXVkaW8tcm93XCIgKm5nSWY9XCIhaXNSZWNvcmRpbmcgJiYgc2FmZUF1ZGlvU3JjXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImFqZi1hdWRpby1zdGF0ZVwiPnt7ICdyZWNvcmRlZCcgfCB0cmFuc2xvY28gfX08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiYWpmLWF1ZGlvLWJveFwiPlxuICAgICAgICA8YXVkaW8gW3NyY109XCJzYWZlQXVkaW9TcmNcIiBjb250cm9scz48L2F1ZGlvPlxuICAgICAgPC9kaXY+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBjbGFzcz1cImFqZi1hdWRpby1kZWxldGVcIlxuICAgICAgICAoY2xpY2spPVwiY2xlYXJSZWNvcmRpbmcoKVwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJyZWFkb25seVwiXG4gICAgICAgIFttYXRUb29sdGlwXT1cIidEZWxldGUgQXVkaW8nIHwgdHJhbnNsb2NvXCJcbiAgICAgID5cbiAgICAgICAge3sgJ0RlbGV0ZScgfCB0cmFuc2xvY28gfX1cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19