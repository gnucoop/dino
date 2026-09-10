import { AjfSignature, canvasToIndexedPngDataUrl } from '@ajf/core/signature';
import * as i0 from '@angular/core';
import { forwardRef, ChangeDetectionStrategy, ViewEncapsulation, Component, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import * as i1 from '@angular/platform-browser';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from '@ngneat/transloco';
import { AjfCommonModule } from '@ajf/core/common';
import { AjfTranslocoModule } from '@ajf/core/transloco';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
function AjfSignatureComponent_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 10);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "Sign here to continue"));
} }
function AjfSignatureComponent_img_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 11);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("src", ctx_r1.safeImageSrc, i0.ɵɵsanitizeUrl);
} }
const SIGNATURE_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AjfSignatureComponent),
    multi: true,
};
/**
 * Ajf signature component.
 */
class AjfSignatureComponent extends AjfSignature {
    constructor(cdr, renderer, _sanitizer) {
        super(cdr, renderer);
        this._sanitizer = _sanitizer;
    }
    ngAfterViewInit() {
        this.sigPadElement = this.sigPad.nativeElement;
        this.context = this.sigPadElement?.getContext('2d') ?? null;
    }
    /**
     * Clears the signature value and preview (keeps the old url to delete old signature from storage)
     */
    clear() {
        if (this.context != null && this.sigPadElement != null) {
            this.context.clearRect(0, 0, this.sigPadElement.width, this.sigPadElement.height);
            this.context.beginPath();
        }
        this.isDrawn = false;
        this.value = {
            name: 'signature.png',
            type: 'image/png',
            signature: true,
            size: undefined,
            content: undefined,
            url: this.value?.url ?? undefined,
            deleteUrl: true,
        };
    }
    /**
     * Accepts the new signature from the canvas and sets it as field value (keeps the old url to delete old signature from storage)
     */
    accept() {
        if (this.sigPadElement != null) {
            // const signatureDataUrl = this.sigPadElement.toDataURL('image/png');
            const signatureDataUrl = canvasToIndexedPngDataUrl(this.sigPadElement);
            const head = 'data:image/png;base64,';
            const imgFileSize = Math.round(((signatureDataUrl.length - head.length) * 3) / 4);
            this.value = {
                name: 'signature.png',
                type: 'image/png',
                signature: true,
                size: imgFileSize,
                content: signatureDataUrl,
                url: this.value?.url ?? undefined,
                deleteUrl: false,
            };
        }
    }
    /**
     * Sanitizes signature image url
     */
    get safeImageSrc() {
        if (!this.value)
            return null;
        if (!this.value.content && this.value.deleteUrl)
            return null;
        const rawUrl = this.value.content && this.value.content.length ? this.value.content : this.value.url;
        if (!rawUrl)
            return null;
        const sanitizedUrl = this._sanitizer.bypassSecurityTrustUrl(rawUrl);
        return sanitizedUrl;
    }
    ngOnDestroy() {
        return;
    }
    static { this.ɵfac = function AjfSignatureComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfSignatureComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i1.DomSanitizer)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfSignatureComponent, selectors: [["ajf-signature"]], features: [i0.ɵɵProvidersFeature([SIGNATURE_CONTROL_VALUE_ACCESSOR]), i0.ɵɵInheritDefinitionFeature], decls: 15, vars: 9, consts: [["sigPad", ""], [1, "ajf-signature-container"], [1, "ajf-signature-pad"], [1, "ajf-signature-canvas", 3, "mousedown", "mousemove", "touchstart", "touchmove"], ["class", "ajf-signature-text", 4, "ngIf"], [1, "ajf-signature-actions"], ["type", "button", 1, "ajf-signature-accept", 3, "click", "disabled"], ["aria-hidden", "true", 1, "ajf-signature-kbd"], ["type", "button", 1, "ajf-signature-clear", 3, "click"], ["class", "ajf-signature-preview", "alt", "", 3, "src", 4, "ngIf"], [1, "ajf-signature-text"], ["alt", "", 1, "ajf-signature-preview", 3, "src"]], template: function AjfSignatureComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "canvas", 3, 0);
            i0.ɵɵlistener("mousedown", function AjfSignatureComponent_Template_canvas_mousedown_2_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onMouseDown($event)); })("mousemove", function AjfSignatureComponent_Template_canvas_mousemove_2_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onMouseMove($event)); })("touchstart", function AjfSignatureComponent_Template_canvas_touchstart_2_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onMouseDown($event)); })("touchmove", function AjfSignatureComponent_Template_canvas_touchmove_2_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onMouseMove($event)); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(4, AjfSignatureComponent_span_4_Template, 3, 3, "span", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 5)(6, "button", 6);
            i0.ɵɵlistener("click", function AjfSignatureComponent_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.accept()); });
            i0.ɵɵtext(7);
            i0.ɵɵpipe(8, "transloco");
            i0.ɵɵelementStart(9, "span", 7);
            i0.ɵɵtext(10, "\u2318\u21B5");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "button", 8);
            i0.ɵɵlistener("click", function AjfSignatureComponent_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.clear()); });
            i0.ɵɵtext(12);
            i0.ɵɵpipe(13, "transloco");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(14, AjfSignatureComponent_img_14_Template, 1, 1, "img", 9);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", !ctx.isDrawn && !ctx.safeImageSrc);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !ctx.isDrawn);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(8, 5, "Approve signature"), " ");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(13, 7, "Clear"), " ");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.safeImageSrc);
        } }, dependencies: [i2.NgIf, i3.TranslocoPipe], styles: ["ajf-signature{display:block}ajf-signature .ajf-signature-container{display:flex;flex-wrap:wrap;align-items:center;gap:12px;width:100%}ajf-signature .ajf-signature-pad{position:relative;display:flex;align-items:center;justify-content:center;border:1px dashed var(--ajf-border-strong, #d5cfc6);border-radius:var(--ajf-radius, 4px);background:var(--ajf-surface, #fff)}ajf-signature .ajf-signature-canvas{display:block;touch-action:none}ajf-signature .ajf-signature-text{position:absolute;color:var(--ajf-text-faint, #a49c92);font-family:var(--ajf-font-mono, monospace);font-size:13px;pointer-events:none}ajf-signature .ajf-signature-actions{display:flex;align-items:center;gap:12px}ajf-signature .ajf-signature-accept{display:inline-flex;align-items:center;gap:8px;min-height:var(--ajf-control-h, 44px);padding:0 16px;border:1px solid var(--ajf-accent, #0f4c5c);border-radius:var(--ajf-radius, 4px);background:var(--ajf-accent, #0f4c5c);color:var(--ajf-accent-fg, #fff);font-family:inherit;font-size:14px;cursor:pointer}ajf-signature .ajf-signature-accept:disabled{border-color:var(--ajf-border-strong, #d5cfc6);background:var(--ajf-band, #faf8f5);color:var(--ajf-text-faint, #a49c92);cursor:default}ajf-signature .ajf-signature-kbd{padding:1px 5px;border-radius:3px;background:var(--ajf-kbd-bg, rgba(255, 255, 255, .22));font-family:var(--ajf-font-mono, monospace);font-size:10px}ajf-signature .ajf-signature-clear{padding:0 4px;border:0;background:none;color:var(--ajf-text-muted, #7a736a);font-family:inherit;font-size:14px;cursor:pointer}ajf-signature .ajf-signature-clear:hover{text-decoration:underline}ajf-signature .ajf-signature-preview{max-width:200px;max-height:100px}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfSignatureComponent, [{
        type: Component,
        args: [{ selector: 'ajf-signature', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, providers: [SIGNATURE_CONTROL_VALUE_ACCESSOR], template: "<div class=\"ajf-signature-container\">\n  <div class=\"ajf-signature-pad\">\n    <canvas\n      class=\"ajf-signature-canvas\"\n      #sigPad\n      (mousedown)=\"onMouseDown($event)\"\n      (mousemove)=\"onMouseMove($event)\"\n      (touchstart)=\"onMouseDown($event)\"\n      (touchmove)=\"onMouseMove($event)\"\n    ></canvas>\n    <span class=\"ajf-signature-text\" *ngIf=\"!isDrawn && !safeImageSrc\">{{\n      'Sign here to continue' | transloco\n    }}</span>\n  </div>\n\n  <div class=\"ajf-signature-actions\">\n    <button\n      type=\"button\"\n      class=\"ajf-signature-accept\"\n      (click)=\"accept()\"\n      [disabled]=\"!isDrawn\"\n    >\n      {{ 'Approve signature' | transloco }}\n      <span class=\"ajf-signature-kbd\" aria-hidden=\"true\">&#8984;&crarr;</span>\n    </button>\n    <button type=\"button\" class=\"ajf-signature-clear\" (click)=\"clear()\">\n      {{ 'Clear' | transloco }}\n    </button>\n  </div>\n\n  <img class=\"ajf-signature-preview\" *ngIf=\"safeImageSrc\" [src]=\"safeImageSrc\" alt=\"\" />\n</div>\n", styles: ["ajf-signature{display:block}ajf-signature .ajf-signature-container{display:flex;flex-wrap:wrap;align-items:center;gap:12px;width:100%}ajf-signature .ajf-signature-pad{position:relative;display:flex;align-items:center;justify-content:center;border:1px dashed var(--ajf-border-strong, #d5cfc6);border-radius:var(--ajf-radius, 4px);background:var(--ajf-surface, #fff)}ajf-signature .ajf-signature-canvas{display:block;touch-action:none}ajf-signature .ajf-signature-text{position:absolute;color:var(--ajf-text-faint, #a49c92);font-family:var(--ajf-font-mono, monospace);font-size:13px;pointer-events:none}ajf-signature .ajf-signature-actions{display:flex;align-items:center;gap:12px}ajf-signature .ajf-signature-accept{display:inline-flex;align-items:center;gap:8px;min-height:var(--ajf-control-h, 44px);padding:0 16px;border:1px solid var(--ajf-accent, #0f4c5c);border-radius:var(--ajf-radius, 4px);background:var(--ajf-accent, #0f4c5c);color:var(--ajf-accent-fg, #fff);font-family:inherit;font-size:14px;cursor:pointer}ajf-signature .ajf-signature-accept:disabled{border-color:var(--ajf-border-strong, #d5cfc6);background:var(--ajf-band, #faf8f5);color:var(--ajf-text-faint, #a49c92);cursor:default}ajf-signature .ajf-signature-kbd{padding:1px 5px;border-radius:3px;background:var(--ajf-kbd-bg, rgba(255, 255, 255, .22));font-family:var(--ajf-font-mono, monospace);font-size:10px}ajf-signature .ajf-signature-clear{padding:0 4px;border:0;background:none;color:var(--ajf-text-muted, #7a736a);font-family:inherit;font-size:14px;cursor:pointer}ajf-signature .ajf-signature-clear:hover{text-decoration:underline}ajf-signature .ajf-signature-preview{max-width:200px;max-height:100px}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: i1.DomSanitizer }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfSignatureComponent, { className: "AjfSignatureComponent", filePath: "signature.ts", lineNumber: 54 }); })();

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
class AjfSignatureModule {
    static { this.ɵfac = function AjfSignatureModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfSignatureModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfSignatureModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [AjfCommonModule,
            AjfTranslocoModule,
            CommonModule,
            FormsModule,
            MatButtonModule,
            MatIconModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfSignatureModule, [{
        type: NgModule,
        args: [{
                imports: [
                    AjfCommonModule,
                    AjfTranslocoModule,
                    CommonModule,
                    FormsModule,
                    MatButtonModule,
                    MatIconModule,
                ],
                declarations: [AjfSignatureComponent],
                exports: [AjfSignatureComponent],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AjfSignatureModule, { declarations: [AjfSignatureComponent], imports: [AjfCommonModule,
        AjfTranslocoModule,
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatIconModule], exports: [AjfSignatureComponent] }); })();

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

export { AjfSignatureComponent, AjfSignatureModule, SIGNATURE_CONTROL_VALUE_ACCESSOR };
//# sourceMappingURL=ajf-material-signature.mjs.map
