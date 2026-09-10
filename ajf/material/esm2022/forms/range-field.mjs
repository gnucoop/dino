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
import { AJF_WARNING_ALERT_SERVICE } from '@ajf/core/forms';
import { AjfRange } from '@ajf/core/range';
import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/core/forms";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/icon";
import * as i4 from "@angular/forms";
import * as i5 from "@angular/material/slider";
import * as i6 from "./warning-alert-service";
function AjfRangeFieldComponent_ng_container_0_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3)(1, "div", 4)(2, "mat-slider", 5);
    i0.ɵɵelement(3, "input", 6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 7)(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "span", 8);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctrl_r1 = i0.ɵɵnextContext().ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("ajf-range-no-value", ctx_r1.isEmpty(ctrl_r1.value));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("step", ctx_r1.step)("min", ctx_r1.start)("max", ctx_r1.end);
    i0.ɵɵattribute("aria-label", ctx_r1.name)("name", ctx_r1.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r1.value)("formControl", ctrl_r1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.start);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.end);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.isEmpty(ctrl_r1.value) ? "\u2014" : ctrl_r1.value);
} }
function AjfRangeFieldComponent_ng_container_0_ng_template_2_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 12);
    i0.ɵɵlistener("click", function AjfRangeFieldComponent_ng_container_0_ng_template_2_button_1_Template_button_click_0_listener() { const i_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctrl_r1 = i0.ɵɵnextContext(2).ngIf; return i0.ɵɵresetView(ctrl_r1.setValue(i_r4)); });
    i0.ɵɵelementStart(1, "mat-icon");
    i0.ɵɵtext(2, "star");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const i_r4 = ctx.$implicit;
    const ctrl_r1 = i0.ɵɵnextContext(2).ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("ajf-selected", i_r4 <= ctrl_r1.value);
    i0.ɵɵattribute("aria-label", "Rate " + i_r4 + " out of " + ctx_r1.end)("name", ctx_r1.name);
} }
function AjfRangeFieldComponent_ng_container_0_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵtemplate(1, AjfRangeFieldComponent_ng_container_0_ng_template_2_button_1_Template, 3, 4, "button", 10);
    i0.ɵɵelementStart(2, "span", 11);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctrl_r1 = i0.ɵɵnextContext().ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.enumerateStars());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctrl_r1.value || 0, " / ", ctx_r1.end, "");
} }
function AjfRangeFieldComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfRangeFieldComponent_ng_container_0_div_1_Template, 11, 12, "div", 2)(2, AjfRangeFieldComponent_ng_container_0_ng_template_2_Template, 4, 3, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ratingTemplate_r5 = i0.ɵɵreference(3);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.appearance !== "rating")("ngIfElse", ratingTemplate_r5);
} }
export class AjfRangeFieldComponent extends AjfRange {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
    /**
     * True when no value has been selected yet, so that the slider is not
     * rendered as if the minimum value had been picked.
     */
    isEmpty(value) {
        return value === null || value === undefined;
    }
    enumerateStars() {
        const nums = [];
        for (let i = 1; i <= (this.end || 5); i++) {
            nums.push(i);
        }
        return nums;
    }
    static { this.ɵfac = function AjfRangeFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfRangeFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfRangeFieldComponent, selectors: [["ajf-range"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 2, vars: 3, consts: [["ratingTemplate", ""], [4, "ngIf"], ["class", "ajf-range", 3, "ajf-range-no-value", 4, "ngIf", "ngIfElse"], [1, "ajf-range"], [1, "ajf-range-track"], ["discrete", "", "showTickMarks", "", 3, "step", "min", "max"], ["matSliderThumb", "", 3, "value", "formControl"], [1, "ajf-range-bounds"], [1, "ajf-range-value"], [1, "ajf-rating-container"], ["type", "button", "class", "ajf-rating-star", 3, "ajf-selected", "click", 4, "ngFor", "ngForOf"], [1, "ajf-rating-readout"], ["type", "button", 1, "ajf-rating-star", 3, "click"]], template: function AjfRangeFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfRangeFieldComponent_ng_container_0_Template, 4, 2, "ng-container", 1);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.control));
        } }, dependencies: [i2.NgForOf, i2.NgIf, i3.MatIcon, i4.DefaultValueAccessor, i4.NgControlStatus, i4.FormControlDirective, i5.MatSlider, i5.MatSliderThumb, i2.AsyncPipe], styles: ["ajf-range{display:block;width:100%}ajf-range .ajf-range{display:flex;align-items:center;gap:12px}ajf-range .ajf-range-track{flex:1 1 auto;min-width:180px;max-width:360px}ajf-range .ajf-range-track .mat-mdc-slider{width:100%;margin:0}ajf-range .ajf-range-bounds{display:flex;justify-content:space-between;margin-top:-6px;padding:0 8px;color:var(--ajf-text-muted);font-family:var(--ajf-font-mono);font-size:11px}ajf-range .ajf-range-value{box-sizing:border-box;min-height:var(--ajf-control-h);border:1px solid var(--ajf-border-strong);border-radius:var(--ajf-radius);background:var(--ajf-surface);color:var(--ajf-text);font-family:var(--ajf-font-sans);font-size:14px;line-height:calc(var(--ajf-control-h) - 2px);outline:none;min-width:44px;padding:0 8px;background:var(--ajf-band);font-family:var(--ajf-font-mono);text-align:center}ajf-range .ajf-range-value:focus,ajf-range .ajf-range-value:focus-within{border-color:var(--ajf-accent);box-shadow:0 0 0 2px var(--ajf-accent-soft)}ajf-range .ajf-range-value:disabled,ajf-range .ajf-range-value[readonly]{color:var(--ajf-text-muted);background:var(--ajf-band)}ajf-range .ajf-range-no-value .mat-mdc-slider{--mdc-slider-active-track-color: var(--ajf-border-strong);--mdc-slider-handle-color: var(--ajf-band)}ajf-range .ajf-range-no-value .ajf-range-value{color:var(--ajf-text-faint)}ajf-range .ajf-rating-container{display:flex;align-items:center;gap:4px}ajf-range .ajf-rating-star{padding:0;border:0;background:none;color:var(--ajf-border-strong);cursor:pointer}ajf-range .ajf-rating-star.ajf-selected{color:var(--ajf-accent)}ajf-range .ajf-rating-star .mat-icon{width:26px;height:26px;font-size:26px}ajf-range .ajf-rating-readout{margin-left:8px;color:var(--ajf-text-muted);font-family:var(--ajf-font-mono);font-size:13px}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfRangeFieldComponent, [{
        type: Component,
        args: [{ selector: 'ajf-range', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container *ngIf=\"control | async as ctrl\">\n  <div\n    *ngIf=\"appearance !== 'rating'; else ratingTemplate\"\n    class=\"ajf-range\"\n    [class.ajf-range-no-value]=\"isEmpty(ctrl.value)\"\n  >\n    <div class=\"ajf-range-track\">\n      <mat-slider\n        discrete\n        showTickMarks\n        [step]=\"step\"\n        [min]=\"start\"\n        [max]=\"end\"\n        [attr.aria-label]=\"name\"\n        [attr.name]=\"name\"\n      >\n        <input matSliderThumb [value]=\"value\" [formControl]=\"ctrl\" />\n      </mat-slider>\n      <div class=\"ajf-range-bounds\">\n        <span>{{ start }}</span>\n        <span>{{ end }}</span>\n      </div>\n    </div>\n    <span class=\"ajf-range-value\">{{ isEmpty(ctrl.value) ? '&mdash;' : ctrl.value }}</span>\n  </div>\n\n  <ng-template #ratingTemplate>\n    <div class=\"ajf-rating-container\">\n      <button\n        type=\"button\"\n        *ngFor=\"let i of enumerateStars()\"\n        class=\"ajf-rating-star\"\n        [class.ajf-selected]=\"i <= ctrl.value\"\n        (click)=\"ctrl.setValue(i)\"\n        [attr.aria-label]=\"'Rate ' + i + ' out of ' + end\"\n        [attr.name]=\"name\"\n      >\n        <mat-icon>star</mat-icon>\n      </button>\n      <span class=\"ajf-rating-readout\">{{ ctrl.value || 0 }} / {{ end }}</span>\n    </div>\n  </ng-template>\n</ng-container>\n", styles: ["ajf-range{display:block;width:100%}ajf-range .ajf-range{display:flex;align-items:center;gap:12px}ajf-range .ajf-range-track{flex:1 1 auto;min-width:180px;max-width:360px}ajf-range .ajf-range-track .mat-mdc-slider{width:100%;margin:0}ajf-range .ajf-range-bounds{display:flex;justify-content:space-between;margin-top:-6px;padding:0 8px;color:var(--ajf-text-muted);font-family:var(--ajf-font-mono);font-size:11px}ajf-range .ajf-range-value{box-sizing:border-box;min-height:var(--ajf-control-h);border:1px solid var(--ajf-border-strong);border-radius:var(--ajf-radius);background:var(--ajf-surface);color:var(--ajf-text);font-family:var(--ajf-font-sans);font-size:14px;line-height:calc(var(--ajf-control-h) - 2px);outline:none;min-width:44px;padding:0 8px;background:var(--ajf-band);font-family:var(--ajf-font-mono);text-align:center}ajf-range .ajf-range-value:focus,ajf-range .ajf-range-value:focus-within{border-color:var(--ajf-accent);box-shadow:0 0 0 2px var(--ajf-accent-soft)}ajf-range .ajf-range-value:disabled,ajf-range .ajf-range-value[readonly]{color:var(--ajf-text-muted);background:var(--ajf-band)}ajf-range .ajf-range-no-value .mat-mdc-slider{--mdc-slider-active-track-color: var(--ajf-border-strong);--mdc-slider-handle-color: var(--ajf-band)}ajf-range .ajf-range-no-value .ajf-range-value{color:var(--ajf-text-faint)}ajf-range .ajf-rating-container{display:flex;align-items:center;gap:4px}ajf-range .ajf-rating-star{padding:0;border:0;background:none;color:var(--ajf-border-strong);cursor:pointer}ajf-range .ajf-rating-star.ajf-selected{color:var(--ajf-accent)}ajf-range .ajf-rating-star .mat-icon{width:26px;height:26px;font-size:26px}ajf-range .ajf-rating-readout{margin-left:8px;color:var(--ajf-text-muted);font-family:var(--ajf-font-mono);font-size:13px}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: i6.AjfWarningAlertService, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfRangeFieldComponent, { className: "AjfRangeFieldComponent", filePath: "range-field.ts", lineNumber: 42 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2UtZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9mb3Jtcy9zcmMvcmFuZ2UtZmllbGQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9mb3Jtcy9zcmMvcmFuZ2UtZmllbGQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMseUJBQXlCLEVBQXlCLE1BQU0saUJBQWlCLENBQUM7QUFDbEYsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULE1BQU0sRUFDTixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7OztJQ3ZCakIsQUFERixBQUxGLDhCQUlDLGFBQzhCLG9CQVMxQjtJQUNDLDJCQUE2RDtJQUMvRCxpQkFBYTtJQUVYLEFBREYsOEJBQThCLFdBQ3RCO0lBQUEsWUFBVztJQUFBLGlCQUFPO0lBQ3hCLDRCQUFNO0lBQUEsWUFBUztJQUVuQixBQURFLEFBRGlCLGlCQUFPLEVBQ2xCLEVBQ0Y7SUFDTiwrQkFBOEI7SUFBQSxhQUFrRDtJQUNsRixBQURrRixpQkFBTyxFQUNuRjs7OztJQXBCSixtRUFBZ0Q7SUFNNUMsZUFBYTtJQUViLEFBREEsQUFEQSxrQ0FBYSxxQkFDQSxtQkFDRjs7SUFJVyxjQUFlO0lBQUMsQUFBaEIsb0NBQWUsd0JBQXFCO0lBR3BELGVBQVc7SUFBWCxrQ0FBVztJQUNYLGVBQVM7SUFBVCxnQ0FBUztJQUdXLGVBQWtEO0lBQWxELDhFQUFrRDs7OztJQUs5RSxrQ0FRQztJQUhDLGdQQUFTLHNCQUFnQixLQUFDO0lBSTFCLGdDQUFVO0lBQUEsb0JBQUk7SUFDaEIsQUFEZ0IsaUJBQVcsRUFDbEI7Ozs7O0lBTlAscURBQXNDOzs7O0lBTDFDLDhCQUFrQztJQUNoQywyR0FRQztJQUdELGdDQUFpQztJQUFBLFlBQWlDO0lBQ3BFLEFBRG9FLGlCQUFPLEVBQ3JFOzs7O0lBVlksY0FBbUI7SUFBbkIsaURBQW1CO0lBU0YsZUFBaUM7SUFBakMsb0VBQWlDOzs7SUF2Q3hFLDZCQUE4QztJQTBCNUMsQUF6QkEsd0ZBSUMsMEhBcUI0Qjs7Ozs7SUF4QjFCLGNBQStCO0lBQUEsQUFBL0IscURBQStCLCtCQUFtQjs7QUR1Q3ZELE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxRQUFRO0lBQ2xELFlBQ0UsR0FBc0IsRUFDdEIsT0FBK0IsRUFDSSxHQUEyQjtRQUU5RCxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsT0FBTyxDQUFDLEtBQWM7UUFDcEIsT0FBTyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLENBQUM7SUFDL0MsQ0FBQztJQUVELGNBQWM7UUFDWixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7UUFDMUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZixDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO3VIQXZCVSxzQkFBc0Isb0hBSXZCLHlCQUF5QjtvRUFKeEIsc0JBQXNCO1lDekNuQyx5RkFBOEM7OztZQUEvQix3REFBc0I7OztpRkR5Q3hCLHNCQUFzQjtjQVBsQyxTQUFTOzJCQUNFLFdBQVcsbUJBR0osdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTs7c0JBTWxDLE1BQU07dUJBQUMseUJBQXlCOztrRkFKeEIsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UsIEFqZkZvcm1SZW5kZXJlclNlcnZpY2V9IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0FqZlJhbmdlfSBmcm9tICdAYWpmL2NvcmUvcmFuZ2UnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEluamVjdCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZldhcm5pbmdBbGVydFNlcnZpY2V9IGZyb20gJy4vd2FybmluZy1hbGVydC1zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXJhbmdlJyxcbiAgdGVtcGxhdGVVcmw6ICdyYW5nZS1maWVsZC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3JhbmdlLWZpZWxkLnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZlJhbmdlRmllbGRDb21wb25lbnQgZXh0ZW5kcyBBamZSYW5nZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgc2VydmljZTogQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbiAgICBASW5qZWN0KEFKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UpIHdhczogQWpmV2FybmluZ0FsZXJ0U2VydmljZSxcbiAgKSB7XG4gICAgc3VwZXIoY2RyLCBzZXJ2aWNlLCB3YXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRydWUgd2hlbiBubyB2YWx1ZSBoYXMgYmVlbiBzZWxlY3RlZCB5ZXQsIHNvIHRoYXQgdGhlIHNsaWRlciBpcyBub3RcbiAgICogcmVuZGVyZWQgYXMgaWYgdGhlIG1pbmltdW0gdmFsdWUgaGFkIGJlZW4gcGlja2VkLlxuICAgKi9cbiAgaXNFbXB0eSh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgZW51bWVyYXRlU3RhcnMoKTogbnVtYmVyW10ge1xuICAgIGNvbnN0IG51bXM6IG51bWJlcltdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gKHRoaXMuZW5kIHx8IDUpOyBpKyspIHtcbiAgICAgIG51bXMucHVzaChpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bXM7XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJjb250cm9sIHwgYXN5bmMgYXMgY3RybFwiPlxuICA8ZGl2XG4gICAgKm5nSWY9XCJhcHBlYXJhbmNlICE9PSAncmF0aW5nJzsgZWxzZSByYXRpbmdUZW1wbGF0ZVwiXG4gICAgY2xhc3M9XCJhamYtcmFuZ2VcIlxuICAgIFtjbGFzcy5hamYtcmFuZ2Utbm8tdmFsdWVdPVwiaXNFbXB0eShjdHJsLnZhbHVlKVwiXG4gID5cbiAgICA8ZGl2IGNsYXNzPVwiYWpmLXJhbmdlLXRyYWNrXCI+XG4gICAgICA8bWF0LXNsaWRlclxuICAgICAgICBkaXNjcmV0ZVxuICAgICAgICBzaG93VGlja01hcmtzXG4gICAgICAgIFtzdGVwXT1cInN0ZXBcIlxuICAgICAgICBbbWluXT1cInN0YXJ0XCJcbiAgICAgICAgW21heF09XCJlbmRcIlxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm5hbWVcIlxuICAgICAgICBbYXR0ci5uYW1lXT1cIm5hbWVcIlxuICAgICAgPlxuICAgICAgICA8aW5wdXQgbWF0U2xpZGVyVGh1bWIgW3ZhbHVlXT1cInZhbHVlXCIgW2Zvcm1Db250cm9sXT1cImN0cmxcIiAvPlxuICAgICAgPC9tYXQtc2xpZGVyPlxuICAgICAgPGRpdiBjbGFzcz1cImFqZi1yYW5nZS1ib3VuZHNcIj5cbiAgICAgICAgPHNwYW4+e3sgc3RhcnQgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuPnt7IGVuZCB9fTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxzcGFuIGNsYXNzPVwiYWpmLXJhbmdlLXZhbHVlXCI+e3sgaXNFbXB0eShjdHJsLnZhbHVlKSA/ICcmbWRhc2g7JyA6IGN0cmwudmFsdWUgfX08L3NwYW4+XG4gIDwvZGl2PlxuXG4gIDxuZy10ZW1wbGF0ZSAjcmF0aW5nVGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cImFqZi1yYXRpbmctY29udGFpbmVyXCI+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAqbmdGb3I9XCJsZXQgaSBvZiBlbnVtZXJhdGVTdGFycygpXCJcbiAgICAgICAgY2xhc3M9XCJhamYtcmF0aW5nLXN0YXJcIlxuICAgICAgICBbY2xhc3MuYWpmLXNlbGVjdGVkXT1cImkgPD0gY3RybC52YWx1ZVwiXG4gICAgICAgIChjbGljayk9XCJjdHJsLnNldFZhbHVlKGkpXCJcbiAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCInUmF0ZSAnICsgaSArICcgb3V0IG9mICcgKyBlbmRcIlxuICAgICAgICBbYXR0ci5uYW1lXT1cIm5hbWVcIlxuICAgICAgPlxuICAgICAgICA8bWF0LWljb24+c3RhcjwvbWF0LWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiYWpmLXJhdGluZy1yZWFkb3V0XCI+e3sgY3RybC52YWx1ZSB8fCAwIH19IC8ge3sgZW5kIH19PC9zcGFuPlxuICAgIDwvZGl2PlxuICA8L25nLXRlbXBsYXRlPlxuPC9uZy1jb250YWluZXI+XG4iXX0=