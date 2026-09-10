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
import { AjfPageSlider as CorePageSlider } from '@ajf/core/page-slider';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/animations";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/button";
import * as i4 from "@angular/material/icon";
import * as i5 from "@angular/material/toolbar";
const _c0 = ["*", [["", "ajfPageSliderBar", ""]]];
const _c1 = ["*", "[ajfPageSliderBar]"];
function AjfPageSlider_mat_toolbar_4_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 8);
    i0.ɵɵlistener("click", function AjfPageSlider_mat_toolbar_4_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.switchOrientation()); });
    i0.ɵɵelementStart(1, "mat-icon");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.orientation === "vertical" ? "swap_horiz" : "swap_vert");
} }
function AjfPageSlider_mat_toolbar_4_ng_container_5_mat_icon_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon");
    i0.ɵɵtext(1, "arrow_backward");
    i0.ɵɵelementEnd();
} }
function AjfPageSlider_mat_toolbar_4_ng_container_5_mat_icon_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon");
    i0.ɵɵtext(1, "arrow_upward");
    i0.ɵɵelementEnd();
} }
function AjfPageSlider_mat_toolbar_4_ng_container_5_mat_icon_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon");
    i0.ɵɵtext(1, "arrow_forward");
    i0.ɵɵelementEnd();
} }
function AjfPageSlider_mat_toolbar_4_ng_container_5_mat_icon_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon");
    i0.ɵɵtext(1, "arrow_downward");
    i0.ɵɵelementEnd();
} }
function AjfPageSlider_mat_toolbar_4_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "button", 9);
    i0.ɵɵlistener("click", function AjfPageSlider_mat_toolbar_4_ng_container_5_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.slide({ dir: "up" })); });
    i0.ɵɵtemplate(2, AjfPageSlider_mat_toolbar_4_ng_container_5_mat_icon_2_Template, 2, 0, "mat-icon", 7)(3, AjfPageSlider_mat_toolbar_4_ng_container_5_mat_icon_3_Template, 2, 0, "mat-icon", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 10);
    i0.ɵɵlistener("click", function AjfPageSlider_mat_toolbar_4_ng_container_5_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.slide({ dir: "down" })); });
    i0.ɵɵtemplate(5, AjfPageSlider_mat_toolbar_4_ng_container_5_mat_icon_5_Template, 2, 0, "mat-icon", 7)(6, AjfPageSlider_mat_toolbar_4_ng_container_5_mat_icon_6_Template, 2, 0, "mat-icon", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r2.orientation === "horizontal");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.orientation === "vertical");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r2.orientation === "horizontal");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.orientation === "vertical");
} }
function AjfPageSlider_mat_toolbar_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-toolbar", 4);
    i0.ɵɵprojection(1, 1);
    i0.ɵɵelement(2, "div", 5);
    i0.ɵɵelementStart(3, "div");
    i0.ɵɵtemplate(4, AjfPageSlider_mat_toolbar_4_button_4_Template, 3, 1, "button", 6)(5, AjfPageSlider_mat_toolbar_4_ng_container_5_Template, 7, 4, "ng-container", 7);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", !ctx_r2.fixedOrientation);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.pages && ctx_r2.pages.length > 1);
} }
export class AjfPageSlider extends CorePageSlider {
    constructor(animationBuilder, cdr, renderer) {
        super(animationBuilder, cdr, renderer);
    }
    static { this.ɵfac = function AjfPageSlider_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfPageSlider)(i0.ɵɵdirectiveInject(i1.AnimationBuilder), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.Renderer2)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfPageSlider, selectors: [["ajf-page-slider"]], features: [i0.ɵɵInheritDefinitionFeature], ngContentSelectors: _c1, decls: 5, vars: 2, consts: [["body", ""], [1, "ajf-page-slider-content"], [1, "ajf-page-slider-body", 3, "touchstart", "touchmove", "touchend", "wheel", "ngClass"], ["class", "ajf-toolbar", 4, "ngIf"], [1, "ajf-toolbar"], [1, "ajf-spacer"], ["aria-label", "Switch orientation", "mat-button", "", 3, "click", 4, "ngIf"], [4, "ngIf"], ["aria-label", "Switch orientation", "mat-button", "", 3, "click"], ["aria-label", "Back", "mat-button", "", "secondary", "", 3, "click"], ["aria-label", "Forward", "mat-button", "", "secondary", "", 3, "click"]], template: function AjfPageSlider_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵprojectionDef(_c0);
            i0.ɵɵelementStart(0, "div", 1)(1, "div", 2, 0);
            i0.ɵɵlistener("touchstart", function AjfPageSlider_Template_div_touchstart_1_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onTouchStart($event)); })("touchmove", function AjfPageSlider_Template_div_touchmove_1_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onTouchMove($event)); })("touchend", function AjfPageSlider_Template_div_touchend_1_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onTouchEnd()); })("wheel", function AjfPageSlider_Template_div_wheel_1_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onMouseWheel($event)); });
            i0.ɵɵprojection(3);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(4, AjfPageSlider_mat_toolbar_4_Template, 6, 2, "mat-toolbar", 3);
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngClass", "ajf-page-slider-" + ctx.orientation);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", !ctx.hideNavigationButtons);
        } }, dependencies: [i2.NgClass, i2.NgIf, i3.MatButton, i4.MatIcon, i5.MatToolbar], styles: ["ajf-page-slider{display:flex;flex-direction:column;align-items:stretch}ajf-page-slider>.ajf-page-slider-content{flex:1;display:block;overflow:hidden;height:100%}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body{display:flex;align-items:stretch}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body.ajf-page-slider-vertical{flex-direction:column;width:100%}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body.ajf-page-slider-horizontal{flex-direction:row;height:100%}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body>ajf-page-slider-item{flex:1 0 auto}ajf-page-slider .ajf-spacer{flex:1 0 auto}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfPageSlider, [{
        type: Component,
        args: [{ selector: 'ajf-page-slider', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ajf-page-slider-content\">\n  <div #body [ngClass]=\"'ajf-page-slider-' + orientation\" (touchstart)=\"onTouchStart($event)\"\n    (touchmove)=\"onTouchMove($event)\" (touchend)=\"onTouchEnd()\" (wheel)=\"onMouseWheel($event)\"\n    class=\"ajf-page-slider-body\">\n    <ng-content></ng-content>\n  </div>\n</div>\n<mat-toolbar *ngIf=\"!hideNavigationButtons\" class=\"ajf-toolbar\">\n  <ng-content select=[ajfPageSliderBar]></ng-content>\n  <div class=\"ajf-spacer\"></div>\n  <div>\n    <button aria-label=\"Switch orientation\" mat-button *ngIf=\"!fixedOrientation\" (click)=\"switchOrientation()\">\n      <mat-icon>{{ orientation === 'vertical' ? 'swap_horiz' : 'swap_vert' }}</mat-icon>\n    </button>\n    <!-- A single page has nowhere to page to, so it gets no paging buttons. -->\n    <ng-container *ngIf=\"pages && pages.length > 1\">\n      <button aria-label=\"Back\" mat-button (click)=\"slide({dir: 'up'})\" secondary>\n        <mat-icon *ngIf=\"orientation === 'horizontal'\">arrow_backward</mat-icon>\n        <mat-icon *ngIf=\"orientation === 'vertical'\">arrow_upward</mat-icon>\n      </button>\n      <button aria-label=\"Forward\" mat-button (click)=\"slide({dir: 'down'})\" secondary>\n        <mat-icon *ngIf=\"orientation === 'horizontal'\">arrow_forward</mat-icon>\n        <mat-icon *ngIf=\"orientation === 'vertical'\">arrow_downward</mat-icon>\n      </button>\n    </ng-container>\n  </div>\n</mat-toolbar>\n", styles: ["ajf-page-slider{display:flex;flex-direction:column;align-items:stretch}ajf-page-slider>.ajf-page-slider-content{flex:1;display:block;overflow:hidden;height:100%}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body{display:flex;align-items:stretch}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body.ajf-page-slider-vertical{flex-direction:column;width:100%}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body.ajf-page-slider-horizontal{flex-direction:row;height:100%}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body>ajf-page-slider-item{flex:1 0 auto}ajf-page-slider .ajf-spacer{flex:1 0 auto}\n"] }]
    }], () => [{ type: i1.AnimationBuilder }, { type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfPageSlider, { className: "AjfPageSlider", filePath: "page-slider.ts", lineNumber: 41 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zbGlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9wYWdlLXNsaWRlci9zcmMvcGFnZS1zbGlkZXIudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9wYWdlLXNsaWRlci9zcmMvcGFnZS1zbGlkZXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsYUFBYSxJQUFJLGNBQWMsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBR3RFLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUVULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7SUNwQm5CLGlDQUEyRztJQUE5QiwyTEFBUywwQkFBbUIsS0FBQztJQUN4RyxnQ0FBVTtJQUFBLFlBQTZEO0lBQ3pFLEFBRHlFLGlCQUFXLEVBQzNFOzs7SUFERyxlQUE2RDtJQUE3RCxvRkFBNkQ7OztJQUtyRSxnQ0FBK0M7SUFBQSw4QkFBYztJQUFBLGlCQUFXOzs7SUFDeEUsZ0NBQTZDO0lBQUEsNEJBQVk7SUFBQSxpQkFBVzs7O0lBR3BFLGdDQUErQztJQUFBLDZCQUFhO0lBQUEsaUJBQVc7OztJQUN2RSxnQ0FBNkM7SUFBQSw4QkFBYztJQUFBLGlCQUFXOzs7O0lBUDFFLDZCQUFnRDtJQUM5QyxpQ0FBNEU7SUFBdkMsaU1BQVMsYUFBTSxPQUFNLElBQUksRUFBQyxDQUFDLEtBQUM7SUFFL0QsQUFEQSxxR0FBK0Msd0ZBQ0Y7SUFDL0MsaUJBQVM7SUFDVCxrQ0FBaUY7SUFBekMsaU1BQVMsYUFBTSxPQUFNLE1BQU0sRUFBQyxDQUFDLEtBQUM7SUFFcEUsQUFEQSxxR0FBK0Msd0ZBQ0Y7SUFDL0MsaUJBQVM7Ozs7SUFOSSxlQUFrQztJQUFsQywwREFBa0M7SUFDbEMsY0FBZ0M7SUFBaEMsd0RBQWdDO0lBR2hDLGVBQWtDO0lBQWxDLDBEQUFrQztJQUNsQyxjQUFnQztJQUFoQyx3REFBZ0M7OztJQWZuRCxzQ0FBZ0U7SUFDOUQscUJBQW1EO0lBQ25ELHlCQUE4QjtJQUM5QiwyQkFBSztJQUtILEFBSkEsa0ZBQTJHLGlGQUkzRDtJQVdwRCxBQURFLGlCQUFNLEVBQ007OztJQWYwQyxlQUF1QjtJQUF2QiwrQ0FBdUI7SUFJNUQsY0FBK0I7SUFBL0IsOERBQStCOztBRHlCbEQsTUFBTSxPQUFPLGFBQWMsU0FBUSxjQUFjO0lBQy9DLFlBQVksZ0JBQWtDLEVBQUUsR0FBc0IsRUFBRSxRQUFtQjtRQUN6RixLQUFLLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7OEdBSFUsYUFBYTtvRUFBYixhQUFhOzs7WUN2Q3hCLEFBREYsOEJBQXFDLGdCQUdKO1lBRCtCLEFBQTFCLEFBQWxDLEFBRHNELDZJQUFjLHdCQUFvQixLQUFDLDhIQUM1RSx1QkFBbUIsS0FBQyxzSEFBYSxnQkFBWSxLQUFDLHNIQUFVLHdCQUFvQixLQUFDO1lBRTFGLGtCQUF5QjtZQUU3QixBQURFLGlCQUFNLEVBQ0Y7WUFDTiw4RUFBZ0U7O1lBTm5ELGNBQTRDO1lBQTVDLDhEQUE0QztZQU0zQyxlQUE0QjtZQUE1QixpREFBNEI7OztpRkRpQzdCLGFBQWE7Y0FQekIsU0FBUzsyQkFDRSxpQkFBaUIsaUJBR1osaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTTs7a0ZBRXBDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmUGFnZVNsaWRlciBhcyBDb3JlUGFnZVNsaWRlcn0gZnJvbSAnQGFqZi9jb3JlL3BhZ2Utc2xpZGVyJztcbmltcG9ydCB7QW5pbWF0aW9uQnVpbGRlcn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge0Jvb2xlYW5JbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXBhZ2Utc2xpZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICdwYWdlLXNsaWRlci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3BhZ2Utc2xpZGVyLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFqZlBhZ2VTbGlkZXIgZXh0ZW5kcyBDb3JlUGFnZVNsaWRlciB7XG4gIGNvbnN0cnVjdG9yKGFuaW1hdGlvbkJ1aWxkZXI6IEFuaW1hdGlvbkJ1aWxkZXIsIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICBzdXBlcihhbmltYXRpb25CdWlsZGVyLCBjZHIsIHJlbmRlcmVyKTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9oaWRlTmF2aWdhdGlvbkJ1dHRvbnM6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2ZpeGVkT3JpZW50YXRpb246IEJvb2xlYW5JbnB1dDtcbn1cbiIsIjxkaXYgY2xhc3M9XCJhamYtcGFnZS1zbGlkZXItY29udGVudFwiPlxuICA8ZGl2ICNib2R5IFtuZ0NsYXNzXT1cIidhamYtcGFnZS1zbGlkZXItJyArIG9yaWVudGF0aW9uXCIgKHRvdWNoc3RhcnQpPVwib25Ub3VjaFN0YXJ0KCRldmVudClcIlxuICAgICh0b3VjaG1vdmUpPVwib25Ub3VjaE1vdmUoJGV2ZW50KVwiICh0b3VjaGVuZCk9XCJvblRvdWNoRW5kKClcIiAod2hlZWwpPVwib25Nb3VzZVdoZWVsKCRldmVudClcIlxuICAgIGNsYXNzPVwiYWpmLXBhZ2Utc2xpZGVyLWJvZHlcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuPC9kaXY+XG48bWF0LXRvb2xiYXIgKm5nSWY9XCIhaGlkZU5hdmlnYXRpb25CdXR0b25zXCIgY2xhc3M9XCJhamYtdG9vbGJhclwiPlxuICA8bmctY29udGVudCBzZWxlY3Q9W2FqZlBhZ2VTbGlkZXJCYXJdPjwvbmctY29udGVudD5cbiAgPGRpdiBjbGFzcz1cImFqZi1zcGFjZXJcIj48L2Rpdj5cbiAgPGRpdj5cbiAgICA8YnV0dG9uIGFyaWEtbGFiZWw9XCJTd2l0Y2ggb3JpZW50YXRpb25cIiBtYXQtYnV0dG9uICpuZ0lmPVwiIWZpeGVkT3JpZW50YXRpb25cIiAoY2xpY2spPVwic3dpdGNoT3JpZW50YXRpb24oKVwiPlxuICAgICAgPG1hdC1pY29uPnt7IG9yaWVudGF0aW9uID09PSAndmVydGljYWwnID8gJ3N3YXBfaG9yaXonIDogJ3N3YXBfdmVydCcgfX08L21hdC1pY29uPlxuICAgIDwvYnV0dG9uPlxuICAgIDwhLS0gQSBzaW5nbGUgcGFnZSBoYXMgbm93aGVyZSB0byBwYWdlIHRvLCBzbyBpdCBnZXRzIG5vIHBhZ2luZyBidXR0b25zLiAtLT5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwicGFnZXMgJiYgcGFnZXMubGVuZ3RoID4gMVwiPlxuICAgICAgPGJ1dHRvbiBhcmlhLWxhYmVsPVwiQmFja1wiIG1hdC1idXR0b24gKGNsaWNrKT1cInNsaWRlKHtkaXI6ICd1cCd9KVwiIHNlY29uZGFyeT5cbiAgICAgICAgPG1hdC1pY29uICpuZ0lmPVwib3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJ1wiPmFycm93X2JhY2t3YXJkPC9tYXQtaWNvbj5cbiAgICAgICAgPG1hdC1pY29uICpuZ0lmPVwib3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCdcIj5hcnJvd191cHdhcmQ8L21hdC1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uIGFyaWEtbGFiZWw9XCJGb3J3YXJkXCIgbWF0LWJ1dHRvbiAoY2xpY2spPVwic2xpZGUoe2RpcjogJ2Rvd24nfSlcIiBzZWNvbmRhcnk+XG4gICAgICAgIDxtYXQtaWNvbiAqbmdJZj1cIm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCdcIj5hcnJvd19mb3J3YXJkPC9tYXQtaWNvbj5cbiAgICAgICAgPG1hdC1pY29uICpuZ0lmPVwib3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCdcIj5hcnJvd19kb3dud2FyZDwvbWF0LWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9kaXY+XG48L21hdC10b29sYmFyPlxuIl19