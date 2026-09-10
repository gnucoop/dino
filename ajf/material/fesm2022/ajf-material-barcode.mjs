import { AjfBarcode } from '@ajf/core/barcode';
import * as i0 from '@angular/core';
import { forwardRef, ChangeDetectionStrategy, ViewEncapsulation, Component, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as i1 from '@ajf/core/common';
import { AjfCommonModule } from '@ajf/core/common';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i4 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i5 from '@angular/material/form-field';
import * as i6 from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import * as i7 from '@angular/material/core';
import * as i8 from '@angular/material/tabs';
import { MatTabsModule } from '@angular/material/tabs';
import * as i9 from '@ngneat/transloco';
import { AjfTranslocoModule } from '@ajf/core/transloco';

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
function AjfBarcodeComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 8)(2, "span", 9);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 10);
    i0.ɵɵlistener("click", function AjfBarcodeComponent_ng_container_0_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.reset()); });
    i0.ɵɵelementStart(5, "mat-icon");
    i0.ɵɵtext(6, "qr_code_scanner");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "transloco");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.value);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 2, "Scan"));
} }
function AjfBarcodeComponent_ng_template_1_mat_option_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 23);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const device_r5 = ctx.$implicit;
    i0.ɵɵproperty("value", device_r5.deviceId);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", device_r5.label, " ");
} }
function AjfBarcodeComponent_ng_template_1_ng_container_24_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.value);
} }
function AjfBarcodeComponent_ng_template_1_ng_container_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 24, 5);
    i0.ɵɵtemplate(3, AjfBarcodeComponent_ng_template_1_ng_container_24_div_3_Template, 2, 1, "div", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "video", 26, 6);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r1.value && ctx_r1.value.length > 0);
} }
function AjfBarcodeComponent_ng_template_1_ng_template_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtext(1, "NO VIDEO");
    i0.ɵɵelementEnd();
} }
function AjfBarcodeComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-tab-group", 11);
    i0.ɵɵlistener("selectedIndexChange", function AjfBarcodeComponent_ng_template_1_Template_mat_tab_group_selectedIndexChange_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onTabChange($event)); });
    i0.ɵɵelementStart(1, "mat-tab", 12);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementStart(3, "div", 13)(4, "div", 14);
    i0.ɵɵlistener("file", function AjfBarcodeComponent_ng_template_1_Template_div_file_4_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onSelectDrop($event)); });
    i0.ɵɵelementStart(5, "div", 15)(6, "div", 16)(7, "a", 17);
    i0.ɵɵlistener("click", function AjfBarcodeComponent_ng_template_1_Template_a_click_7_listener() { i0.ɵɵrestoreView(_r3); const fileInput_r4 = i0.ɵɵreference(13); return i0.ɵɵresetView(fileInput_r4.click()); });
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "transloco");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelement(10, "div", 18, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "input", 19, 2);
    i0.ɵɵlistener("change", function AjfBarcodeComponent_ng_template_1_Template_input_change_12_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onSelectFile($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "mat-tab", 12);
    i0.ɵɵpipe(15, "transloco");
    i0.ɵɵelementStart(16, "mat-form-field", 20)(17, "mat-label");
    i0.ɵɵtext(18, "Choose Video source");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "mat-select", null, 3);
    i0.ɵɵtemplate(21, AjfBarcodeComponent_ng_template_1_mat_option_21_Template, 2, 2, "mat-option", 21);
    i0.ɵɵpipe(22, "async");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "div", 22);
    i0.ɵɵtemplate(24, AjfBarcodeComponent_ng_template_1_ng_container_24_Template, 6, 1, "ng-container", 7)(25, AjfBarcodeComponent_ng_template_1_ng_template_25_Template, 2, 0, "ng-template", null, 4, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const noVideo_r6 = i0.ɵɵreference(26);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("label", i0.ɵɵpipeBind1(2, 6, "Image"));
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 8, "Drop your image here or click to select"));
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("label", i0.ɵɵpipeBind1(15, 10, "Camera"));
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(22, 12, ctx_r1.videoDevices));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r1.supportsVideoStream)("ngIfElse", noVideo_r6);
} }
const BARCODE_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AjfBarcodeComponent),
    multi: true,
};
/**
 * Ajf barcode component.
 */
class AjfBarcodeComponent extends AjfBarcode {
    constructor(cdr, renderer) {
        super(cdr, renderer);
        this.sourceSelectSub = Subscription.EMPTY;
        this.resetSub = Subscription.EMPTY;
        this.resetSub = this.resetEvt.subscribe(() => this.setupVideoSourceSub());
    }
    setupVideoSourceSub() {
        if (this.videoSourceSelect == undefined)
            return;
        this.sourceSelectSub.unsubscribe();
        this.sourceSelectSub = this.videoSourceSelect.valueChange
            .pipe(switchMap(() => this.getStream()))
            .subscribe(c => console.log(c));
    }
    ngAfterViewInit() {
        this.initVideoStreams();
        this.setupVideoSourceSub();
    }
    ngOnDestroy() {
        console.log('a');
        this.stopCurrentStream();
        this.sourceSelectSub.unsubscribe();
        this.resetSub.unsubscribe();
    }
    static { this.ɵfac = function AjfBarcodeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfBarcodeComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.Renderer2)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfBarcodeComponent, selectors: [["ajf-barcode"]], features: [i0.ɵɵProvidersFeature([BARCODE_CONTROL_VALUE_ACCESSOR]), i0.ɵɵInheritDefinitionFeature], decls: 3, vars: 2, consts: [["barcode", ""], ["barcodeImagePreview", ""], ["fileInput", ""], ["videoSourceSelect", ""], ["noVideo", ""], ["barcodeVideoPreview", ""], ["barcodeVideo", ""], [4, "ngIf", "ngIfElse"], [1, "ajf-code-container"], [1, "ajf-code-value"], ["type", "button", 1, "ajf-code-scan", 3, "click"], [3, "selectedIndexChange"], [3, "label"], [1, "ajf-drop-container"], ["ajfDnd", "", 1, "ajf-dropzone", 3, "file"], [1, "ajf-text-wrapper"], [1, "ajf-centered"], ["mat-button", "", 3, "click"], [1, "ajf-barcode-image-preview"], ["type", "file", "multiple", "", 2, "display", "none", 3, "change"], ["appearance", "fill", 1, "ajf-video-device-select"], [3, "value", 4, "ngFor", "ngForOf"], [1, "ajf-barcode-video"], [3, "value"], [1, "ajf-video-preview", "ajf-video-preview-hidden"], [4, "ngIf"], ["autoplay", "", "playsinline", "", "muted", ""]], template: function AjfBarcodeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfBarcodeComponent_ng_container_0_Template, 10, 4, "ng-container", 7)(1, AjfBarcodeComponent_ng_template_1_Template, 27, 14, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            const barcode_r7 = i0.ɵɵreference(2);
            i0.ɵɵproperty("ngIf", ctx.value)("ngIfElse", barcode_r7);
        } }, dependencies: [i1.AjfDndDirective, i2.NgForOf, i2.NgIf, i3.MatAnchor, i4.MatIcon, i5.MatFormField, i5.MatLabel, i6.MatSelect, i7.MatOption, i8.MatTab, i8.MatTabGroup, i9.TranslocoPipe, i2.AsyncPipe], styles: ["ajf-barcode{display:block;max-width:380px}ajf-barcode .mat-mdc-tab-header{--mat-tab-header-active-label-text-color: var(--ajf-accent, #0f4c5c);--mat-tab-header-active-focus-label-text-color: var(--ajf-accent, #0f4c5c);--mat-tab-header-active-hover-label-text-color: var(--ajf-accent, #0f4c5c);--mat-tab-header-active-focus-indicator-color: var(--ajf-accent, #0f4c5c);--mat-tab-header-active-hover-indicator-color: var(--ajf-accent, #0f4c5c);--mdc-tab-indicator-active-indicator-color: var(--ajf-accent, #0f4c5c);--mat-tab-header-inactive-label-text-color: var(--ajf-text-muted, #7a736a);--mat-tab-header-label-text-size: 13px;border-bottom:1px solid var(--ajf-border, #e6e2dc)}ajf-barcode .ajf-code-container{display:inline-flex;flex-wrap:wrap;align-items:center;gap:10px}ajf-barcode .ajf-code-value{box-sizing:border-box;min-width:180px;min-height:var(--ajf-control-h, 44px);padding:0 12px;border:1px solid var(--ajf-border-strong, #d5cfc6);border-radius:var(--ajf-radius, 4px);background:var(--ajf-surface, #fff);color:var(--ajf-text, #1c1a17);font-family:var(--ajf-font-mono, monospace);font-size:13px;line-height:calc(var(--ajf-control-h, 44px) - 2px)}ajf-barcode .ajf-code-scan{display:inline-flex;align-items:center;gap:8px;min-height:var(--ajf-control-h, 44px);padding:0 14px;border:1px solid var(--ajf-border-strong, #d5cfc6);border-radius:var(--ajf-radius, 4px);background:var(--ajf-surface, #fff);color:var(--ajf-text, #1c1a17);font-family:inherit;font-size:14px;cursor:pointer}ajf-barcode .ajf-code-scan:hover{border-color:var(--ajf-accent, #0f4c5c)}ajf-barcode .ajf-code-scan .mat-icon{width:18px;height:18px;font-size:18px}ajf-barcode .ajf-drop-container{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:flex-start;align-content:stretch;align-items:stretch;position:relative}ajf-barcode .ajf-drop-container .ajf-barcode-image-preview{position:absolute;inset:0;z-index:1;background-size:contain;background-repeat:no-repeat;background-position:center}ajf-barcode .ajf-drop-container .ajf-dropzone{z-index:2;order:0;flex:1 1 auto;align-self:auto;height:120px;display:table;background-color:var(--ajf-band, #faf8f5);border:dashed 1px var(--ajf-border-strong, #d5cfc6);border-radius:var(--ajf-radius, 4px);overflow:hidden}ajf-barcode .ajf-drop-container .ajf-dropzone .ajf-text-wrapper{display:table-cell;vertical-align:middle}ajf-barcode .ajf-drop-container .ajf-dropzone .ajf-centered{color:var(--ajf-text-muted, #7a736a);font-family:inherit;font-size:14px;text-align:center}ajf-barcode .ajf-video-device-select{width:100%}ajf-barcode .ajf-barcode-video{height:180px;position:relative}ajf-barcode .ajf-barcode-video>video{width:100%;height:100%}ajf-barcode .ajf-barcode-video>.ajf-video-preview{position:absolute;inset:0;width:100%;height:100%;z-index:5;border:3px solid #000000}ajf-barcode .ajf-barcode-video>.ajf-video-preview.ajf-video-preview-hidden{display:none;position:relative}ajf-barcode .ajf-barcode-video>.ajf-video-preview.ajf-video-preview-hidden>div{position:absolute;right:0;left:0;bottom:-1em;height:2em;box-sizing:border-box;padding:.5em;background-color:#fff;border-radius:.5em}ajf-barcode .ajf-barcode-video>.ajf-barcode-switch-camera{position:absolute;top:1em;right:1em;z-index:10;padding:.5em;border-radius:.5em;background-color:#fff}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfBarcodeComponent, [{
        type: Component,
        args: [{ selector: 'ajf-barcode', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, providers: [BARCODE_CONTROL_VALUE_ACCESSOR], template: "<ng-container *ngIf=\"value; else barcode\">\n  <div class=\"ajf-code-container\">\n    <span class=\"ajf-code-value\">{{ value }}</span>\n    <button type=\"button\" class=\"ajf-code-scan\" (click)=\"reset()\">\n      <mat-icon>qr_code_scanner</mat-icon>\n      <span>{{ 'Scan' | transloco }}</span>\n    </button>\n  </div>\n</ng-container>\n<ng-template #barcode>\n  <mat-tab-group (selectedIndexChange)=\"onTabChange($event)\">\n    <mat-tab [label]=\"'Image'| transloco\">\n      <div class=\"ajf-drop-container\">\n        <div class=\"ajf-dropzone\" ajfDnd (file)=\"onSelectDrop($event)\">\n          <div class=\"ajf-text-wrapper\">\n            <div class=\"ajf-centered\">\n              <a mat-button (click)=\"fileInput.click()\"\n                >{{'Drop your image here or click to select'|transloco}}</a\n              >\n            </div>\n          </div>\n        </div>\n        <div #barcodeImagePreview class=\"ajf-barcode-image-preview\"></div>\n      </div>\n      <input\n        #fileInput\n        type=\"file\"\n        (change)=\"onSelectFile($event)\"\n        multiple\n        style=\"display: none\"\n      />\n    </mat-tab>\n    <mat-tab [label]=\"'Camera'|transloco\">\n      <mat-form-field\n        appearance=\"fill\"\n        class=\"ajf-video-device-select\"\n      >\n        <mat-label>Choose Video source</mat-label>\n        <mat-select #videoSourceSelect\n          ><mat-option *ngFor=\"let device of videoDevices|async\" [value]=\"device.deviceId\">\n            {{device.label}}\n          </mat-option></mat-select\n        ></mat-form-field\n      >\n      <div class=\"ajf-barcode-video\">\n        <ng-container *ngIf=\"supportsVideoStream; else noVideo\">\n          <div #barcodeVideoPreview class=\"ajf-video-preview ajf-video-preview-hidden\">\n            <div *ngIf=\"value && value.length > 0\">{{ value }}</div>\n          </div>\n          <video #barcodeVideo autoplay playsinline muted></video>\n        </ng-container>\n        <ng-template #noVideo>\n          <div>NO VIDEO</div>\n        </ng-template>\n      </div>\n    </mat-tab>\n  </mat-tab-group>\n</ng-template>\n", styles: ["ajf-barcode{display:block;max-width:380px}ajf-barcode .mat-mdc-tab-header{--mat-tab-header-active-label-text-color: var(--ajf-accent, #0f4c5c);--mat-tab-header-active-focus-label-text-color: var(--ajf-accent, #0f4c5c);--mat-tab-header-active-hover-label-text-color: var(--ajf-accent, #0f4c5c);--mat-tab-header-active-focus-indicator-color: var(--ajf-accent, #0f4c5c);--mat-tab-header-active-hover-indicator-color: var(--ajf-accent, #0f4c5c);--mdc-tab-indicator-active-indicator-color: var(--ajf-accent, #0f4c5c);--mat-tab-header-inactive-label-text-color: var(--ajf-text-muted, #7a736a);--mat-tab-header-label-text-size: 13px;border-bottom:1px solid var(--ajf-border, #e6e2dc)}ajf-barcode .ajf-code-container{display:inline-flex;flex-wrap:wrap;align-items:center;gap:10px}ajf-barcode .ajf-code-value{box-sizing:border-box;min-width:180px;min-height:var(--ajf-control-h, 44px);padding:0 12px;border:1px solid var(--ajf-border-strong, #d5cfc6);border-radius:var(--ajf-radius, 4px);background:var(--ajf-surface, #fff);color:var(--ajf-text, #1c1a17);font-family:var(--ajf-font-mono, monospace);font-size:13px;line-height:calc(var(--ajf-control-h, 44px) - 2px)}ajf-barcode .ajf-code-scan{display:inline-flex;align-items:center;gap:8px;min-height:var(--ajf-control-h, 44px);padding:0 14px;border:1px solid var(--ajf-border-strong, #d5cfc6);border-radius:var(--ajf-radius, 4px);background:var(--ajf-surface, #fff);color:var(--ajf-text, #1c1a17);font-family:inherit;font-size:14px;cursor:pointer}ajf-barcode .ajf-code-scan:hover{border-color:var(--ajf-accent, #0f4c5c)}ajf-barcode .ajf-code-scan .mat-icon{width:18px;height:18px;font-size:18px}ajf-barcode .ajf-drop-container{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:flex-start;align-content:stretch;align-items:stretch;position:relative}ajf-barcode .ajf-drop-container .ajf-barcode-image-preview{position:absolute;inset:0;z-index:1;background-size:contain;background-repeat:no-repeat;background-position:center}ajf-barcode .ajf-drop-container .ajf-dropzone{z-index:2;order:0;flex:1 1 auto;align-self:auto;height:120px;display:table;background-color:var(--ajf-band, #faf8f5);border:dashed 1px var(--ajf-border-strong, #d5cfc6);border-radius:var(--ajf-radius, 4px);overflow:hidden}ajf-barcode .ajf-drop-container .ajf-dropzone .ajf-text-wrapper{display:table-cell;vertical-align:middle}ajf-barcode .ajf-drop-container .ajf-dropzone .ajf-centered{color:var(--ajf-text-muted, #7a736a);font-family:inherit;font-size:14px;text-align:center}ajf-barcode .ajf-video-device-select{width:100%}ajf-barcode .ajf-barcode-video{height:180px;position:relative}ajf-barcode .ajf-barcode-video>video{width:100%;height:100%}ajf-barcode .ajf-barcode-video>.ajf-video-preview{position:absolute;inset:0;width:100%;height:100%;z-index:5;border:3px solid #000000}ajf-barcode .ajf-barcode-video>.ajf-video-preview.ajf-video-preview-hidden{display:none;position:relative}ajf-barcode .ajf-barcode-video>.ajf-video-preview.ajf-video-preview-hidden>div{position:absolute;right:0;left:0;bottom:-1em;height:2em;box-sizing:border-box;padding:.5em;background-color:#fff;border-radius:.5em}ajf-barcode .ajf-barcode-video>.ajf-barcode-switch-camera{position:absolute;top:1em;right:1em;z-index:10;padding:.5em;border-radius:.5em;background-color:#fff}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfBarcodeComponent, { className: "AjfBarcodeComponent", filePath: "barcode.ts", lineNumber: 55 }); })();

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
class AjfBarcodeModule {
    static { this.ɵfac = function AjfBarcodeModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfBarcodeModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfBarcodeModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [AjfCommonModule,
            AjfTranslocoModule,
            CommonModule,
            FormsModule,
            MatButtonModule,
            MatIconModule,
            MatSelectModule,
            MatTabsModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfBarcodeModule, [{
        type: NgModule,
        args: [{
                imports: [
                    AjfCommonModule,
                    AjfTranslocoModule,
                    CommonModule,
                    FormsModule,
                    MatButtonModule,
                    MatIconModule,
                    MatSelectModule,
                    MatTabsModule,
                ],
                declarations: [AjfBarcodeComponent],
                exports: [AjfBarcodeComponent],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AjfBarcodeModule, { declarations: [AjfBarcodeComponent], imports: [AjfCommonModule,
        AjfTranslocoModule,
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatTabsModule], exports: [AjfBarcodeComponent] }); })();

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

export { AjfBarcodeComponent, AjfBarcodeModule, BARCODE_CONTROL_VALUE_ACCESSOR };
//# sourceMappingURL=ajf-material-barcode.mjs.map
