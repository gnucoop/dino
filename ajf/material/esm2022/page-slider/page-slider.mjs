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
function AjfPageSlider_mat_toolbar_8_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 10);
    i0.ɵɵlistener("click", function AjfPageSlider_mat_toolbar_8_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.switchOrientation()); });
    i0.ɵɵelementStart(1, "mat-icon");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.orientation === "vertical" ? "swap_horiz" : "swap_vert");
} }
function AjfPageSlider_mat_toolbar_8_ng_container_5_mat_icon_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon");
    i0.ɵɵtext(1, "arrow_backward");
    i0.ɵɵelementEnd();
} }
function AjfPageSlider_mat_toolbar_8_ng_container_5_mat_icon_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon");
    i0.ɵɵtext(1, "arrow_upward");
    i0.ɵɵelementEnd();
} }
function AjfPageSlider_mat_toolbar_8_ng_container_5_mat_icon_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon");
    i0.ɵɵtext(1, "arrow_forward");
    i0.ɵɵelementEnd();
} }
function AjfPageSlider_mat_toolbar_8_ng_container_5_mat_icon_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon");
    i0.ɵɵtext(1, "arrow_downward");
    i0.ɵɵelementEnd();
} }
function AjfPageSlider_mat_toolbar_8_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "button", 11);
    i0.ɵɵlistener("click", function AjfPageSlider_mat_toolbar_8_ng_container_5_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.slide({ dir: "up" })); });
    i0.ɵɵtemplate(2, AjfPageSlider_mat_toolbar_8_ng_container_5_mat_icon_2_Template, 2, 0, "mat-icon", 9)(3, AjfPageSlider_mat_toolbar_8_ng_container_5_mat_icon_3_Template, 2, 0, "mat-icon", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 12);
    i0.ɵɵlistener("click", function AjfPageSlider_mat_toolbar_8_ng_container_5_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.slide({ dir: "down" })); });
    i0.ɵɵtemplate(5, AjfPageSlider_mat_toolbar_8_ng_container_5_mat_icon_5_Template, 2, 0, "mat-icon", 9)(6, AjfPageSlider_mat_toolbar_8_ng_container_5_mat_icon_6_Template, 2, 0, "mat-icon", 9);
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
function AjfPageSlider_mat_toolbar_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-toolbar", 6);
    i0.ɵɵprojection(1, 1);
    i0.ɵɵelement(2, "div", 7);
    i0.ɵɵelementStart(3, "div");
    i0.ɵɵtemplate(4, AjfPageSlider_mat_toolbar_8_button_4_Template, 3, 1, "button", 8)(5, AjfPageSlider_mat_toolbar_8_ng_container_5_Template, 7, 4, "ng-container", 9);
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
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfPageSlider, selectors: [["ajf-page-slider"]], features: [i0.ɵɵInheritDefinitionFeature], ngContentSelectors: _c1, decls: 9, vars: 4, consts: [["body", ""], [1, "ajf-page-slider-content"], [1, "ajf-page-slider-body", 3, "touchstart", "touchmove", "touchend", "wheel", "ngClass"], [1, "ajf-scroll-hint"], ["type", "button", "aria-label", "Scroll down", 3, "click"], ["class", "ajf-toolbar", 4, "ngIf"], [1, "ajf-toolbar"], [1, "ajf-spacer"], ["aria-label", "Switch orientation", "mat-button", "", 3, "click", 4, "ngIf"], [4, "ngIf"], ["aria-label", "Switch orientation", "mat-button", "", 3, "click"], ["aria-label", "Back", "mat-button", "", "secondary", "", 3, "click"], ["aria-label", "Forward", "mat-button", "", "secondary", "", 3, "click"]], template: function AjfPageSlider_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵprojectionDef(_c0);
            i0.ɵɵelementStart(0, "div", 1)(1, "div", 2, 0);
            i0.ɵɵlistener("touchstart", function AjfPageSlider_Template_div_touchstart_1_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onTouchStart($event)); })("touchmove", function AjfPageSlider_Template_div_touchmove_1_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onTouchMove($event)); })("touchend", function AjfPageSlider_Template_div_touchend_1_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onTouchEnd()); })("wheel", function AjfPageSlider_Template_div_wheel_1_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onMouseWheel($event)); });
            i0.ɵɵprojection(3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 3)(5, "button", 4);
            i0.ɵɵlistener("click", function AjfPageSlider_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.scrollHintDown()); });
            i0.ɵɵelementStart(6, "mat-icon");
            i0.ɵɵtext(7, "keyboard_arrow_down");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(8, AjfPageSlider_mat_toolbar_8_Template, 6, 2, "mat-toolbar", 5);
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngClass", "ajf-page-slider-" + ctx.orientation);
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("ajf-visible", ctx.showScrollHint);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", !ctx.hideNavigationButtons);
        } }, dependencies: [i2.NgClass, i2.NgIf, i3.MatButton, i4.MatIcon, i5.MatToolbar], styles: ["ajf-page-slider{display:flex;flex-direction:column;align-items:stretch}ajf-page-slider>.ajf-page-slider-content{flex:1;display:block;overflow:hidden;height:100%;position:relative}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body{display:flex;align-items:stretch}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body.ajf-page-slider-vertical{flex-direction:column;width:100%}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body.ajf-page-slider-horizontal{flex-direction:row;height:100%}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body>ajf-page-slider-item{flex:1 0 0}ajf-page-slider .ajf-spacer{flex:1 0 auto}ajf-page-slider .ajf-scroll-hint{position:absolute;right:0;bottom:0;left:0;display:flex;align-items:flex-end;justify-content:center;z-index:1;height:56px;padding-bottom:4px;background:linear-gradient(to top,var(--ajf-surface, #ffffff) 15%,color-mix(in srgb,var(--ajf-surface, #ffffff) 0%,transparent));pointer-events:none;visibility:hidden;opacity:0;transition:opacity .25s ease,visibility 0s linear .25s}ajf-page-slider .ajf-scroll-hint.ajf-visible{visibility:visible;opacity:1;transition:opacity .25s ease,visibility 0s}ajf-page-slider .ajf-scroll-hint button{display:inline-flex;align-items:center;justify-content:center;padding:0;border:0;background:none;color:var(--ajf-accent, #0f4c5c);cursor:pointer;pointer-events:auto}ajf-page-slider .ajf-scroll-hint button .mat-icon{width:32px;height:32px;font-size:32px;line-height:32px;animation:ajf-scroll-hint-bounce 1.6s ease-in-out infinite}@keyframes ajf-scroll-hint-bounce{0%,to{transform:translateY(0)}50%{transform:translateY(4px)}}@media (prefers-reduced-motion: reduce){ajf-page-slider .ajf-scroll-hint button .mat-icon{animation:none}}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfPageSlider, [{
        type: Component,
        args: [{ selector: 'ajf-page-slider', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ajf-page-slider-content\">\n  <div #body [ngClass]=\"'ajf-page-slider-' + orientation\" (touchstart)=\"onTouchStart($event)\"\n    (touchmove)=\"onTouchMove($event)\" (touchend)=\"onTouchEnd()\" (wheel)=\"onMouseWheel($event)\"\n    class=\"ajf-page-slider-body\">\n    <ng-content></ng-content>\n  </div>\n  <!-- Says that the page on screen carries more than fits, and pages down when\n       clicked. Sits outside the page, since the page is the element that\n       scrolls and a hint inside it would scroll away with the content it is\n       reporting on -- and after it, because the body carries the transform that\n       pages the slider, which makes it paint over anything declared earlier. -->\n  <div class=\"ajf-scroll-hint\" [class.ajf-visible]=\"showScrollHint\">\n    <button type=\"button\" aria-label=\"Scroll down\" (click)=\"scrollHintDown()\">\n      <mat-icon>keyboard_arrow_down</mat-icon>\n    </button>\n  </div>\n</div>\n<mat-toolbar *ngIf=\"!hideNavigationButtons\" class=\"ajf-toolbar\">\n  <ng-content select=[ajfPageSliderBar]></ng-content>\n  <div class=\"ajf-spacer\"></div>\n  <div>\n    <button aria-label=\"Switch orientation\" mat-button *ngIf=\"!fixedOrientation\" (click)=\"switchOrientation()\">\n      <mat-icon>{{ orientation === 'vertical' ? 'swap_horiz' : 'swap_vert' }}</mat-icon>\n    </button>\n    <!-- A single page has nowhere to page to, so it gets no paging buttons. -->\n    <ng-container *ngIf=\"pages && pages.length > 1\">\n      <button aria-label=\"Back\" mat-button (click)=\"slide({dir: 'up'})\" secondary>\n        <mat-icon *ngIf=\"orientation === 'horizontal'\">arrow_backward</mat-icon>\n        <mat-icon *ngIf=\"orientation === 'vertical'\">arrow_upward</mat-icon>\n      </button>\n      <button aria-label=\"Forward\" mat-button (click)=\"slide({dir: 'down'})\" secondary>\n        <mat-icon *ngIf=\"orientation === 'horizontal'\">arrow_forward</mat-icon>\n        <mat-icon *ngIf=\"orientation === 'vertical'\">arrow_downward</mat-icon>\n      </button>\n    </ng-container>\n  </div>\n</mat-toolbar>\n", styles: ["ajf-page-slider{display:flex;flex-direction:column;align-items:stretch}ajf-page-slider>.ajf-page-slider-content{flex:1;display:block;overflow:hidden;height:100%;position:relative}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body{display:flex;align-items:stretch}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body.ajf-page-slider-vertical{flex-direction:column;width:100%}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body.ajf-page-slider-horizontal{flex-direction:row;height:100%}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body>ajf-page-slider-item{flex:1 0 0}ajf-page-slider .ajf-spacer{flex:1 0 auto}ajf-page-slider .ajf-scroll-hint{position:absolute;right:0;bottom:0;left:0;display:flex;align-items:flex-end;justify-content:center;z-index:1;height:56px;padding-bottom:4px;background:linear-gradient(to top,var(--ajf-surface, #ffffff) 15%,color-mix(in srgb,var(--ajf-surface, #ffffff) 0%,transparent));pointer-events:none;visibility:hidden;opacity:0;transition:opacity .25s ease,visibility 0s linear .25s}ajf-page-slider .ajf-scroll-hint.ajf-visible{visibility:visible;opacity:1;transition:opacity .25s ease,visibility 0s}ajf-page-slider .ajf-scroll-hint button{display:inline-flex;align-items:center;justify-content:center;padding:0;border:0;background:none;color:var(--ajf-accent, #0f4c5c);cursor:pointer;pointer-events:auto}ajf-page-slider .ajf-scroll-hint button .mat-icon{width:32px;height:32px;font-size:32px;line-height:32px;animation:ajf-scroll-hint-bounce 1.6s ease-in-out infinite}@keyframes ajf-scroll-hint-bounce{0%,to{transform:translateY(0)}50%{transform:translateY(4px)}}@media (prefers-reduced-motion: reduce){ajf-page-slider .ajf-scroll-hint button .mat-icon{animation:none}}\n"] }]
    }], () => [{ type: i1.AnimationBuilder }, { type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfPageSlider, { className: "AjfPageSlider", filePath: "page-slider.ts", lineNumber: 41 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zbGlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9wYWdlLXNsaWRlci9zcmMvcGFnZS1zbGlkZXIudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9wYWdlLXNsaWRlci9zcmMvcGFnZS1zbGlkZXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsYUFBYSxJQUFJLGNBQWMsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBR3RFLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUVULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7SUNWbkIsa0NBQTJHO0lBQTlCLDJMQUFTLDBCQUFtQixLQUFDO0lBQ3hHLGdDQUFVO0lBQUEsWUFBNkQ7SUFDekUsQUFEeUUsaUJBQVcsRUFDM0U7OztJQURHLGVBQTZEO0lBQTdELG9GQUE2RDs7O0lBS3JFLGdDQUErQztJQUFBLDhCQUFjO0lBQUEsaUJBQVc7OztJQUN4RSxnQ0FBNkM7SUFBQSw0QkFBWTtJQUFBLGlCQUFXOzs7SUFHcEUsZ0NBQStDO0lBQUEsNkJBQWE7SUFBQSxpQkFBVzs7O0lBQ3ZFLGdDQUE2QztJQUFBLDhCQUFjO0lBQUEsaUJBQVc7Ozs7SUFQMUUsNkJBQWdEO0lBQzlDLGtDQUE0RTtJQUF2QyxpTUFBUyxhQUFNLE9BQU0sSUFBSSxFQUFDLENBQUMsS0FBQztJQUUvRCxBQURBLHFHQUErQyx3RkFDRjtJQUMvQyxpQkFBUztJQUNULGtDQUFpRjtJQUF6QyxpTUFBUyxhQUFNLE9BQU0sTUFBTSxFQUFDLENBQUMsS0FBQztJQUVwRSxBQURBLHFHQUErQyx3RkFDRjtJQUMvQyxpQkFBUzs7OztJQU5JLGVBQWtDO0lBQWxDLDBEQUFrQztJQUNsQyxjQUFnQztJQUFoQyx3REFBZ0M7SUFHaEMsZUFBa0M7SUFBbEMsMERBQWtDO0lBQ2xDLGNBQWdDO0lBQWhDLHdEQUFnQzs7O0lBZm5ELHNDQUFnRTtJQUM5RCxxQkFBbUQ7SUFDbkQseUJBQThCO0lBQzlCLDJCQUFLO0lBS0gsQUFKQSxrRkFBMkcsaUZBSTNEO0lBV3BELEFBREUsaUJBQU0sRUFDTTs7O0lBZjBDLGVBQXVCO0lBQXZCLCtDQUF1QjtJQUk1RCxjQUErQjtJQUEvQiw4REFBK0I7O0FEZWxELE1BQU0sT0FBTyxhQUFjLFNBQVEsY0FBYztJQUMvQyxZQUFZLGdCQUFrQyxFQUFFLEdBQXNCLEVBQUUsUUFBbUI7UUFDekYsS0FBSyxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN6QyxDQUFDOzhHQUhVLGFBQWE7b0VBQWIsYUFBYTs7O1lDdkN4QixBQURGLDhCQUFxQyxnQkFHSjtZQUQrQixBQUExQixBQUFsQyxBQURzRCw2SUFBYyx3QkFBb0IsS0FBQyw4SEFDNUUsdUJBQW1CLEtBQUMsc0hBQWEsZ0JBQVksS0FBQyxzSEFBVSx3QkFBb0IsS0FBQztZQUUxRixrQkFBeUI7WUFDM0IsaUJBQU07WUFPSixBQURGLDhCQUFrRSxnQkFDVTtZQUEzQixnSUFBUyxvQkFBZ0IsS0FBQztZQUN2RSxnQ0FBVTtZQUFBLG1DQUFtQjtZQUduQyxBQURFLEFBREUsQUFEK0IsaUJBQVcsRUFDakMsRUFDTCxFQUNGO1lBQ04sOEVBQWdFOztZQWhCbkQsY0FBNEM7WUFBNUMsOERBQTRDO1lBVTFCLGVBQW9DO1lBQXBDLGlEQUFvQztZQU1yRCxlQUE0QjtZQUE1QixpREFBNEI7OztpRkR1QjdCLGFBQWE7Y0FQekIsU0FBUzsyQkFDRSxpQkFBaUIsaUJBR1osaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTTs7a0ZBRXBDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmUGFnZVNsaWRlciBhcyBDb3JlUGFnZVNsaWRlcn0gZnJvbSAnQGFqZi9jb3JlL3BhZ2Utc2xpZGVyJztcbmltcG9ydCB7QW5pbWF0aW9uQnVpbGRlcn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge0Jvb2xlYW5JbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXBhZ2Utc2xpZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICdwYWdlLXNsaWRlci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3BhZ2Utc2xpZGVyLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFqZlBhZ2VTbGlkZXIgZXh0ZW5kcyBDb3JlUGFnZVNsaWRlciB7XG4gIGNvbnN0cnVjdG9yKGFuaW1hdGlvbkJ1aWxkZXI6IEFuaW1hdGlvbkJ1aWxkZXIsIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICBzdXBlcihhbmltYXRpb25CdWlsZGVyLCBjZHIsIHJlbmRlcmVyKTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9oaWRlTmF2aWdhdGlvbkJ1dHRvbnM6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2ZpeGVkT3JpZW50YXRpb246IEJvb2xlYW5JbnB1dDtcbn1cbiIsIjxkaXYgY2xhc3M9XCJhamYtcGFnZS1zbGlkZXItY29udGVudFwiPlxuICA8ZGl2ICNib2R5IFtuZ0NsYXNzXT1cIidhamYtcGFnZS1zbGlkZXItJyArIG9yaWVudGF0aW9uXCIgKHRvdWNoc3RhcnQpPVwib25Ub3VjaFN0YXJ0KCRldmVudClcIlxuICAgICh0b3VjaG1vdmUpPVwib25Ub3VjaE1vdmUoJGV2ZW50KVwiICh0b3VjaGVuZCk9XCJvblRvdWNoRW5kKClcIiAod2hlZWwpPVwib25Nb3VzZVdoZWVsKCRldmVudClcIlxuICAgIGNsYXNzPVwiYWpmLXBhZ2Utc2xpZGVyLWJvZHlcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuICA8IS0tIFNheXMgdGhhdCB0aGUgcGFnZSBvbiBzY3JlZW4gY2FycmllcyBtb3JlIHRoYW4gZml0cywgYW5kIHBhZ2VzIGRvd24gd2hlblxuICAgICAgIGNsaWNrZWQuIFNpdHMgb3V0c2lkZSB0aGUgcGFnZSwgc2luY2UgdGhlIHBhZ2UgaXMgdGhlIGVsZW1lbnQgdGhhdFxuICAgICAgIHNjcm9sbHMgYW5kIGEgaGludCBpbnNpZGUgaXQgd291bGQgc2Nyb2xsIGF3YXkgd2l0aCB0aGUgY29udGVudCBpdCBpc1xuICAgICAgIHJlcG9ydGluZyBvbiAtLSBhbmQgYWZ0ZXIgaXQsIGJlY2F1c2UgdGhlIGJvZHkgY2FycmllcyB0aGUgdHJhbnNmb3JtIHRoYXRcbiAgICAgICBwYWdlcyB0aGUgc2xpZGVyLCB3aGljaCBtYWtlcyBpdCBwYWludCBvdmVyIGFueXRoaW5nIGRlY2xhcmVkIGVhcmxpZXIuIC0tPlxuICA8ZGl2IGNsYXNzPVwiYWpmLXNjcm9sbC1oaW50XCIgW2NsYXNzLmFqZi12aXNpYmxlXT1cInNob3dTY3JvbGxIaW50XCI+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgYXJpYS1sYWJlbD1cIlNjcm9sbCBkb3duXCIgKGNsaWNrKT1cInNjcm9sbEhpbnREb3duKClcIj5cbiAgICAgIDxtYXQtaWNvbj5rZXlib2FyZF9hcnJvd19kb3duPC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG48L2Rpdj5cbjxtYXQtdG9vbGJhciAqbmdJZj1cIiFoaWRlTmF2aWdhdGlvbkJ1dHRvbnNcIiBjbGFzcz1cImFqZi10b29sYmFyXCI+XG4gIDxuZy1jb250ZW50IHNlbGVjdD1bYWpmUGFnZVNsaWRlckJhcl0+PC9uZy1jb250ZW50PlxuICA8ZGl2IGNsYXNzPVwiYWpmLXNwYWNlclwiPjwvZGl2PlxuICA8ZGl2PlxuICAgIDxidXR0b24gYXJpYS1sYWJlbD1cIlN3aXRjaCBvcmllbnRhdGlvblwiIG1hdC1idXR0b24gKm5nSWY9XCIhZml4ZWRPcmllbnRhdGlvblwiIChjbGljayk9XCJzd2l0Y2hPcmllbnRhdGlvbigpXCI+XG4gICAgICA8bWF0LWljb24+e3sgb3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcgPyAnc3dhcF9ob3JpeicgOiAnc3dhcF92ZXJ0JyB9fTwvbWF0LWljb24+XG4gICAgPC9idXR0b24+XG4gICAgPCEtLSBBIHNpbmdsZSBwYWdlIGhhcyBub3doZXJlIHRvIHBhZ2UgdG8sIHNvIGl0IGdldHMgbm8gcGFnaW5nIGJ1dHRvbnMuIC0tPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJwYWdlcyAmJiBwYWdlcy5sZW5ndGggPiAxXCI+XG4gICAgICA8YnV0dG9uIGFyaWEtbGFiZWw9XCJCYWNrXCIgbWF0LWJ1dHRvbiAoY2xpY2spPVwic2xpZGUoe2RpcjogJ3VwJ30pXCIgc2Vjb25kYXJ5PlxuICAgICAgICA8bWF0LWljb24gKm5nSWY9XCJvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnXCI+YXJyb3dfYmFja3dhcmQ8L21hdC1pY29uPlxuICAgICAgICA8bWF0LWljb24gKm5nSWY9XCJvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJ1wiPmFycm93X3Vwd2FyZDwvbWF0LWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gYXJpYS1sYWJlbD1cIkZvcndhcmRcIiBtYXQtYnV0dG9uIChjbGljayk9XCJzbGlkZSh7ZGlyOiAnZG93bid9KVwiIHNlY29uZGFyeT5cbiAgICAgICAgPG1hdC1pY29uICpuZ0lmPVwib3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJ1wiPmFycm93X2ZvcndhcmQ8L21hdC1pY29uPlxuICAgICAgICA8bWF0LWljb24gKm5nSWY9XCJvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJ1wiPmFycm93X2Rvd253YXJkPC9tYXQtaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L2Rpdj5cbjwvbWF0LXRvb2xiYXI+XG4iXX0=