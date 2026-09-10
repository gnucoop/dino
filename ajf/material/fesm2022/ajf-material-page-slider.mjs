import { AjfPageSlider as AjfPageSlider$1, AjfPageSliderModule as AjfPageSliderModule$1 } from '@ajf/core/page-slider';
import * as i0 from '@angular/core';
import { ChangeDetectionStrategy, ViewEncapsulation, Component, NgModule } from '@angular/core';
import * as i1 from '@angular/animations';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i4 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i5 from '@angular/material/toolbar';
import { MatToolbarModule } from '@angular/material/toolbar';

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
class AjfPageSlider extends AjfPageSlider$1 {
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
class AjfPageSliderModule {
    static { this.ɵfac = function AjfPageSliderModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfPageSliderModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfPageSliderModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule, AjfPageSliderModule$1, MatButtonModule, MatIconModule, MatToolbarModule, AjfPageSliderModule$1] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfPageSliderModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, AjfPageSliderModule$1, MatButtonModule, MatIconModule, MatToolbarModule],
                declarations: [AjfPageSlider],
                exports: [AjfPageSliderModule$1, AjfPageSlider],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AjfPageSliderModule, { declarations: [AjfPageSlider], imports: [CommonModule, AjfPageSliderModule$1, MatButtonModule, MatIconModule, MatToolbarModule], exports: [AjfPageSliderModule$1, AjfPageSlider] }); })();

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

export { AjfPageSlider, AjfPageSliderModule };
//# sourceMappingURL=ajf-material-page-slider.mjs.map
