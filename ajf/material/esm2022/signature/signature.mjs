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
import { AjfSignature, canvasToIndexedPngDataUrl } from '@ajf/core/signature';
import { ChangeDetectionStrategy, Component, forwardRef, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "@angular/common";
import * as i3 from "@ngneat/transloco";
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
export const SIGNATURE_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AjfSignatureComponent),
    multi: true,
};
/**
 * Ajf signature component.
 */
export class AjfSignatureComponent extends AjfSignature {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmF0dXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvc2lnbmF0dXJlL3NyYy9zaWduYXR1cmUudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9zaWduYXR1cmUvc3JjL3NpZ25hdHVyZS5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQUUseUJBQXlCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUM1RSxPQUFPLEVBRUwsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxVQUFVLEVBR1YsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7SUN2QjdDLGdDQUFtRTtJQUFBLFlBRWpFOztJQUFBLGlCQUFPOztJQUYwRCxjQUVqRTtJQUZpRSxtRUFFakU7OztJQWtCSiwwQkFBc0Y7OztJQUE5QiwyREFBb0I7O0FETTlFLE1BQU0sQ0FBQyxNQUFNLGdDQUFnQyxHQUFRO0lBQ25ELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztJQUNwRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFFRjs7R0FFRztBQVNILE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxZQUFZO0lBQ3JELFlBQVksR0FBc0IsRUFBRSxRQUFtQixFQUFVLFVBQXdCO1FBQ3ZGLEtBQUssQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFEMEMsZUFBVSxHQUFWLFVBQVUsQ0FBYztJQUV6RixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUM7UUFDL0MsSUFBSSxDQUFDLE9BQU8sR0FB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bUIsS0FBQyx5SUFDckIsdUJBQW1CLEtBQUM7WUFDbEMsaUJBQVM7WUFDVix3RUFBbUU7WUFHckUsaUJBQU07WUFHSixBQURGLDhCQUFtQyxnQkFNaEM7WUFGQyx3SUFBUyxZQUFRLEtBQUM7WUFHbEIsWUFDQTs7WUFBQSwrQkFBbUQ7WUFBQSw2QkFBYztZQUNuRSxBQURtRSxpQkFBTyxFQUNqRTtZQUNULGtDQUFvRTtZQUFsQix5SUFBUyxXQUFPLEtBQUM7WUFDakUsYUFDRjs7WUFDRixBQURFLGlCQUFTLEVBQ0w7WUFFTix3RUFBc0Y7WUFDeEYsaUJBQU07O1lBckJnQyxlQUErQjtZQUEvQix3REFBK0I7WUFVL0QsZUFBcUI7WUFBckIsdUNBQXFCO1lBRXJCLGNBQ0E7WUFEQSwwRUFDQTtZQUdBLGVBQ0Y7WUFERSwrREFDRjtZQUdrQyxlQUFrQjtZQUFsQix1Q0FBa0I7OztpRkR1QjNDLHFCQUFxQjtjQVJqQyxTQUFTOzJCQUNFLGVBQWUsaUJBR1YsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTSxhQUNwQyxDQUFDLGdDQUFnQyxDQUFDOztrRkFFbEMscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZlNpZ25hdHVyZSwgY2FudmFzVG9JbmRleGVkUG5nRGF0YVVybH0gZnJvbSAnQGFqZi9jb3JlL3NpZ25hdHVyZSc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgZm9yd2FyZFJlZixcbiAgT25EZXN0cm95LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7RG9tU2FuaXRpemVyLCBTYWZlVXJsfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuZXhwb3J0IGNvbnN0IFNJR05BVFVSRV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBamZTaWduYXR1cmVDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbi8qKlxuICogQWpmIHNpZ25hdHVyZSBjb21wb25lbnQuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1zaWduYXR1cmUnLFxuICB0ZW1wbGF0ZVVybDogJ3NpZ25hdHVyZS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3NpZ25hdHVyZS5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtTSUdOQVRVUkVfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZlNpZ25hdHVyZUNvbXBvbmVudCBleHRlbmRzIEFqZlNpZ25hdHVyZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB7XG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgX3Nhbml0aXplcjogRG9tU2FuaXRpemVyKSB7XG4gICAgc3VwZXIoY2RyLCByZW5kZXJlcik7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zaWdQYWRFbGVtZW50ID0gdGhpcy5zaWdQYWQubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLnNpZ1BhZEVsZW1lbnQ/LmdldENvbnRleHQoJzJkJykgPz8gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIHNpZ25hdHVyZSB2YWx1ZSBhbmQgcHJldmlldyAoa2VlcHMgdGhlIG9sZCB1cmwgdG8gZGVsZXRlIG9sZCBzaWduYXR1cmUgZnJvbSBzdG9yYWdlKVxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgaWYgKHRoaXMuY29udGV4dCAhPSBudWxsICYmIHRoaXMuc2lnUGFkRWxlbWVudCAhPSBudWxsKSB7XG4gICAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuc2lnUGFkRWxlbWVudC53aWR0aCwgdGhpcy5zaWdQYWRFbGVtZW50LmhlaWdodCk7XG4gICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgfVxuICAgIHRoaXMuaXNEcmF3biA9IGZhbHNlO1xuICAgIHRoaXMudmFsdWUgPSB7XG4gICAgICBuYW1lOiAnc2lnbmF0dXJlLnBuZycsXG4gICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgIHNpZ25hdHVyZTogdHJ1ZSxcbiAgICAgIHNpemU6IHVuZGVmaW5lZCxcbiAgICAgIGNvbnRlbnQ6IHVuZGVmaW5lZCxcbiAgICAgIHVybDogdGhpcy52YWx1ZT8udXJsID8/IHVuZGVmaW5lZCxcbiAgICAgIGRlbGV0ZVVybDogdHJ1ZSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEFjY2VwdHMgdGhlIG5ldyBzaWduYXR1cmUgZnJvbSB0aGUgY2FudmFzIGFuZCBzZXRzIGl0IGFzIGZpZWxkIHZhbHVlIChrZWVwcyB0aGUgb2xkIHVybCB0byBkZWxldGUgb2xkIHNpZ25hdHVyZSBmcm9tIHN0b3JhZ2UpXG4gICAqL1xuICBhY2NlcHQoKSB7XG4gICAgaWYgKHRoaXMuc2lnUGFkRWxlbWVudCAhPSBudWxsKSB7XG4gICAgICAvLyBjb25zdCBzaWduYXR1cmVEYXRhVXJsID0gdGhpcy5zaWdQYWRFbGVtZW50LnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyk7XG4gICAgICBjb25zdCBzaWduYXR1cmVEYXRhVXJsID0gY2FudmFzVG9JbmRleGVkUG5nRGF0YVVybCh0aGlzLnNpZ1BhZEVsZW1lbnQpO1xuXG4gICAgICBjb25zdCBoZWFkID0gJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCwnO1xuICAgICAgY29uc3QgaW1nRmlsZVNpemUgPSBNYXRoLnJvdW5kKCgoc2lnbmF0dXJlRGF0YVVybC5sZW5ndGggLSBoZWFkLmxlbmd0aCkgKiAzKSAvIDQpO1xuXG4gICAgICB0aGlzLnZhbHVlID0ge1xuICAgICAgICBuYW1lOiAnc2lnbmF0dXJlLnBuZycsXG4gICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICBzaWduYXR1cmU6IHRydWUsXG4gICAgICAgIHNpemU6IGltZ0ZpbGVTaXplLFxuICAgICAgICBjb250ZW50OiBzaWduYXR1cmVEYXRhVXJsLFxuICAgICAgICB1cmw6IHRoaXMudmFsdWU/LnVybCA/PyB1bmRlZmluZWQsXG4gICAgICAgIGRlbGV0ZVVybDogZmFsc2UsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTYW5pdGl6ZXMgc2lnbmF0dXJlIGltYWdlIHVybFxuICAgKi9cbiAgZ2V0IHNhZmVJbWFnZVNyYygpOiBTYWZlVXJsIHwgc3RyaW5nIHwgbnVsbCB7XG4gICAgaWYgKCF0aGlzLnZhbHVlKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoIXRoaXMudmFsdWUuY29udGVudCAmJiB0aGlzLnZhbHVlLmRlbGV0ZVVybCkgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCByYXdVcmwgPVxuICAgICAgdGhpcy52YWx1ZS5jb250ZW50ICYmIHRoaXMudmFsdWUuY29udGVudC5sZW5ndGggPyB0aGlzLnZhbHVlLmNvbnRlbnQgOiB0aGlzLnZhbHVlLnVybDtcbiAgICBpZiAoIXJhd1VybCkgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBzYW5pdGl6ZWRVcmwgPSB0aGlzLl9zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFVybChyYXdVcmwpO1xuICAgIHJldHVybiBzYW5pdGl6ZWRVcmw7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICByZXR1cm47XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJhamYtc2lnbmF0dXJlLWNvbnRhaW5lclwiPlxuICA8ZGl2IGNsYXNzPVwiYWpmLXNpZ25hdHVyZS1wYWRcIj5cbiAgICA8Y2FudmFzXG4gICAgICBjbGFzcz1cImFqZi1zaWduYXR1cmUtY2FudmFzXCJcbiAgICAgICNzaWdQYWRcbiAgICAgIChtb3VzZWRvd24pPVwib25Nb3VzZURvd24oJGV2ZW50KVwiXG4gICAgICAobW91c2Vtb3ZlKT1cIm9uTW91c2VNb3ZlKCRldmVudClcIlxuICAgICAgKHRvdWNoc3RhcnQpPVwib25Nb3VzZURvd24oJGV2ZW50KVwiXG4gICAgICAodG91Y2htb3ZlKT1cIm9uTW91c2VNb3ZlKCRldmVudClcIlxuICAgID48L2NhbnZhcz5cbiAgICA8c3BhbiBjbGFzcz1cImFqZi1zaWduYXR1cmUtdGV4dFwiICpuZ0lmPVwiIWlzRHJhd24gJiYgIXNhZmVJbWFnZVNyY1wiPnt7XG4gICAgICAnU2lnbiBoZXJlIHRvIGNvbnRpbnVlJyB8IHRyYW5zbG9jb1xuICAgIH19PC9zcGFuPlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwiYWpmLXNpZ25hdHVyZS1hY3Rpb25zXCI+XG4gICAgPGJ1dHRvblxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICBjbGFzcz1cImFqZi1zaWduYXR1cmUtYWNjZXB0XCJcbiAgICAgIChjbGljayk9XCJhY2NlcHQoKVwiXG4gICAgICBbZGlzYWJsZWRdPVwiIWlzRHJhd25cIlxuICAgID5cbiAgICAgIHt7ICdBcHByb3ZlIHNpZ25hdHVyZScgfCB0cmFuc2xvY28gfX1cbiAgICAgIDxzcGFuIGNsYXNzPVwiYWpmLXNpZ25hdHVyZS1rYmRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj4mIzg5ODQ7JmNyYXJyOzwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImFqZi1zaWduYXR1cmUtY2xlYXJcIiAoY2xpY2spPVwiY2xlYXIoKVwiPlxuICAgICAge3sgJ0NsZWFyJyB8IHRyYW5zbG9jbyB9fVxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cblxuICA8aW1nIGNsYXNzPVwiYWpmLXNpZ25hdHVyZS1wcmV2aWV3XCIgKm5nSWY9XCJzYWZlSW1hZ2VTcmNcIiBbc3JjXT1cInNhZmVJbWFnZVNyY1wiIGFsdD1cIlwiIC8+XG48L2Rpdj5cbiJdfQ==