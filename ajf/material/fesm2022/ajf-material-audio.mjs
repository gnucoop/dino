import { AjfAudio } from '@ajf/core/audio';
import * as i0 from '@angular/core';
import { ViewEncapsulation, ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import * as i1 from '@angular/platform-browser';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i4 from '@angular/material/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as i5 from '@ngneat/transloco';
import { AjfTranslocoModule } from '@ajf/core/transloco';
import { MatButtonModule } from '@angular/material/button';

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
class AjfAudioComponent extends AjfAudio {
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
class AjfAudioModule {
    static { this.ɵfac = function AjfAudioModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfAudioModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfAudioModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [AjfTranslocoModule,
            CommonModule,
            FormsModule,
            MatButtonModule,
            MatIconModule,
            MatTooltipModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfAudioModule, [{
        type: NgModule,
        args: [{
                imports: [
                    AjfTranslocoModule,
                    CommonModule,
                    FormsModule,
                    MatButtonModule,
                    MatIconModule,
                    MatTooltipModule,
                ],
                declarations: [AjfAudioComponent],
                exports: [AjfAudioComponent],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AjfAudioModule, { declarations: [AjfAudioComponent], imports: [AjfTranslocoModule,
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule], exports: [AjfAudioComponent] }); })();

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

/**
 * Generated bundle index. Do not edit.
 */

export { AjfAudioComponent, AjfAudioModule };
//# sourceMappingURL=ajf-material-audio.mjs.map
