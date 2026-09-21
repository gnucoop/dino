import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/material/icon";
import * as i3 from "@angular/material/menu";
import * as i4 from "@ngneat/transloco";
const _c0 = ["*"];
function AjfSlideHeader_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 10);
    i0.ɵɵpipe(1, "transloco");
} if (rf & 2) {
    const s_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("ajf-current", s_r1 === ctx_r1.slide);
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 3, s_r1.node.label), i0.ɵɵsanitizeHtml);
} }
function AjfSlideHeader_mat_icon_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 11);
    i0.ɵɵtext(1, "arrow_drop_down");
    i0.ɵɵelementEnd();
} }
function AjfSlideHeader_button_10_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 12);
    i0.ɵɵlistener("click", function AjfSlideHeader_button_10_Template_button_click_0_listener() { const s_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.jumpTo.emit(s_r4)); });
    i0.ɵɵelementStart(1, "mat-icon");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "span", 13);
    i0.ɵɵpipe(4, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r4 = ctx.$implicit;
    i0.ɵɵproperty("disabled", s_r4.visible === false);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("ajf-invalid", !s_r4.valid);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(s_r4.valid ? "check" : "warning");
    i0.ɵɵadvance();
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(4, 5, s_r4.node.label), i0.ɵɵsanitizeHtml);
} }
function AjfSlideHeader_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 14)(1, "button", 15);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵlistener("click", function AjfSlideHeader_div_11_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.prev.emit()); });
    i0.ɵɵelementStart(3, "mat-icon");
    i0.ɵɵtext(4, "chevron_left");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "button", 15);
    i0.ɵɵpipe(6, "transloco");
    i0.ɵɵlistener("click", function AjfSlideHeader_div_11_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.next.emit()); });
    i0.ɵɵelementStart(7, "mat-icon");
    i0.ɵɵtext(8, "chevron_right");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(2, 2, "Back"));
    i0.ɵɵadvance(4);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(6, 4, "Forward"));
} }
/**
 * The bar at the top of every slide: its number and title, a menu to jump to any
 * other slide, previous/next paging, and a slot for the form's own action
 * buttons.
 *
 * What the form still has failing is reported by the footer alone. Naming it
 * here too cost a phone's whole header width to repeat something already on
 * screen.
 *
 * Paging belongs to the renderer, which owns the page slider, so it is raised
 * as an event rather than handled here.
 */
export class AjfSlideHeader {
    constructor() {
        /** Absent while a start or end message page is on screen. */
        this.slide = null;
        /** The number shown in the badge, already offset by any start message. */
        this.displayNumber = 1;
        /** Every slide of the form, for the jump menu. */
        this.slides = [];
        /** How many pages the slider holds, repetitions and message pages included. */
        this.pages = 0;
        this.jumpTo = new EventEmitter();
        this.prev = new EventEmitter();
        this.next = new EventEmitter();
    }
    /**
     * Whether the form has anywhere to page to. A single page form gets no arrows
     * and no "slide 1 of 1": both are controls that cannot do anything.
     */
    get canNavigate() {
        return this.pages > 1;
    }
    /**
     * Whether the jump menu is worth opening. Counted over the visible slides, the
     * only ones the menu can actually reach.
     */
    get canJump() {
        return this.slides.filter(s => s.visible !== false).length > 1;
    }
    static { this.ɵfac = function AjfSlideHeader_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfSlideHeader)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfSlideHeader, selectors: [["ajf-slide-header"]], inputs: { slide: "slide", displayNumber: "displayNumber", slides: "slides", pages: "pages" }, outputs: { jumpTo: "jumpTo", prev: "prev", next: "next" }, ngContentSelectors: _c0, decls: 14, vars: 12, consts: [["slideMenu", "matMenu"], [1, "ajf-slide-header"], ["type", "button", 1, "ajf-slide-title", 3, "disabled", "matMenuTriggerFor"], [1, "ajf-slide-number"], [1, "ajf-slide-label-stack"], ["class", "ajf-slide-label", 3, "ajf-current", "innerHTML", 4, "ngFor", "ngForOf"], ["class", "ajf-slide-caret", 4, "ngIf"], ["mat-menu-item", "", 3, "disabled", "click", 4, "ngFor", "ngForOf"], ["class", "ajf-slide-nav", 4, "ngIf"], [1, "ajf-slide-header-spacer"], [1, "ajf-slide-label", 3, "innerHTML"], [1, "ajf-slide-caret"], ["mat-menu-item", "", 3, "click", "disabled"], [3, "innerHTML"], [1, "ajf-slide-nav"], ["type", "button", 1, "ajf-btn", 3, "click"]], template: function AjfSlideHeader_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef();
            i0.ɵɵelementStart(0, "div", 1)(1, "button", 2);
            i0.ɵɵpipe(2, "transloco");
            i0.ɵɵelementStart(3, "span", 3);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "span", 4);
            i0.ɵɵtemplate(6, AjfSlideHeader_span_6_Template, 2, 5, "span", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(7, AjfSlideHeader_mat_icon_7_Template, 2, 0, "mat-icon", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "mat-menu", null, 0);
            i0.ɵɵtemplate(10, AjfSlideHeader_button_10_Template, 5, 7, "button", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(11, AjfSlideHeader_div_11_Template, 9, 6, "div", 8);
            i0.ɵɵelement(12, "span", 9);
            i0.ɵɵprojection(13);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            const slideMenu_r6 = i0.ɵɵreference(9);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("ajf-slide-title-static", !ctx.slide || !ctx.canJump);
            i0.ɵɵproperty("disabled", !ctx.slide || !ctx.canJump)("matMenuTriggerFor", slideMenu_r6);
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(2, 10, "Go to slide"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.displayNumber);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.slides);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.slide && ctx.canJump);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", ctx.slides);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.canNavigate);
        } }, dependencies: [i1.NgForOf, i1.NgIf, i2.MatIcon, i3.MatMenu, i3.MatMenuItem, i3.MatMenuTrigger, i4.TranslocoPipe], styles: ["ajf-slide-header{display:block}ajf-slide-header .ajf-slide-header{display:flex;flex-wrap:wrap;align-items:center;gap:10px;padding:12px 20px;background:var(--ajf-surface);font-family:var(--ajf-font-sans)}ajf-slide-header .ajf-slide-header-spacer{flex:1 1 auto}ajf-slide-header .ajf-slide-title{display:inline-flex;align-items:center;justify-content:center;gap:8px;box-sizing:border-box;min-height:var(--ajf-control-h);border:1px solid var(--ajf-border-strong);border-radius:var(--ajf-radius);background:var(--ajf-surface);color:var(--ajf-text);font-family:var(--ajf-font-sans);font-size:14px;cursor:pointer;flex:0 1 auto;justify-content:flex-start;gap:10px;max-width:100%;padding:0 12px}ajf-slide-header .ajf-slide-title:hover:not(:disabled){border-color:var(--ajf-accent)}ajf-slide-header .ajf-slide-title:disabled{color:var(--ajf-text-faint);cursor:default}ajf-slide-header .ajf-slide-title .ajf-slide-number{display:inline-flex;flex:0 0 auto;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:var(--ajf-accent);color:var(--ajf-accent-fg);font-size:12px;font-weight:600}ajf-slide-header .ajf-slide-title .ajf-slide-label-stack{display:grid;min-width:0;max-width:340px;text-align:left}ajf-slide-header .ajf-slide-title .ajf-slide-label{grid-area:1/1;overflow:hidden;visibility:hidden;font-size:16px;font-weight:600;text-overflow:ellipsis;white-space:nowrap}ajf-slide-header .ajf-slide-title .ajf-slide-label.ajf-current{visibility:visible}ajf-slide-header .ajf-slide-title .ajf-slide-caret{width:20px;height:20px;margin-left:auto;color:var(--ajf-text-muted);font-size:20px}ajf-slide-header .ajf-slide-title-static{cursor:default}ajf-slide-header .ajf-slide-title-static:hover{border-color:var(--ajf-border-strong)}ajf-slide-header .ajf-slide-nav{display:flex;gap:8px}ajf-slide-header .ajf-slide-nav .ajf-btn{width:var(--ajf-control-h);padding:0}.mat-mdc-menu-panel .mat-mdc-menu-item .mat-icon.ajf-invalid{color:var(--ajf-danger)}\n"], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfSlideHeader, [{
        type: Component,
        args: [{ selector: 'ajf-slide-header', encapsulation: ViewEncapsulation.None, template: "<div class=\"ajf-slide-header\">\n  <button\n    type=\"button\"\n    class=\"ajf-slide-title\"\n    [class.ajf-slide-title-static]=\"!slide || !canJump\"\n    [disabled]=\"!slide || !canJump\"\n    [matMenuTriggerFor]=\"slideMenu\"\n    [attr.aria-label]=\"'Go to slide' | transloco\"\n  >\n    <span class=\"ajf-slide-number\">{{ displayNumber }}</span>\n\n    <!-- Every slide title is laid out in the same grid cell, so the trigger is as\n         wide as the longest of them and keeps that width while paging. Only the\n         current title is visible; the rest just hold the space open. -->\n    <span class=\"ajf-slide-label-stack\">\n      <span\n        class=\"ajf-slide-label\"\n        *ngFor=\"let s of slides\"\n        [class.ajf-current]=\"s === slide\"\n        [innerHTML]=\"s.node.label | transloco\"\n      ></span>\n    </span>\n    <mat-icon class=\"ajf-slide-caret\" *ngIf=\"slide && canJump\">arrow_drop_down</mat-icon>\n  </button>\n\n  <mat-menu #slideMenu=\"matMenu\">\n    <button\n      mat-menu-item\n      *ngFor=\"let s of slides\"\n      [disabled]=\"s.visible === false\"\n      (click)=\"jumpTo.emit(s)\"\n    >\n      <mat-icon [class.ajf-invalid]=\"!s.valid\">{{ s.valid ? 'check' : 'warning' }}</mat-icon>\n      <span [innerHTML]=\"s.node.label | transloco\"></span>\n    </button>\n  </mat-menu>\n\n  <!-- Nothing to page through in a single page form. -->\n  <div class=\"ajf-slide-nav\" *ngIf=\"canNavigate\">\n    <button\n      type=\"button\"\n      class=\"ajf-btn\"\n      (click)=\"prev.emit()\"\n      [attr.aria-label]=\"'Back' | transloco\"\n    >\n      <mat-icon>chevron_left</mat-icon>\n    </button>\n    <button\n      type=\"button\"\n      class=\"ajf-btn\"\n      (click)=\"next.emit()\"\n      [attr.aria-label]=\"'Forward' | transloco\"\n    >\n      <mat-icon>chevron_right</mat-icon>\n    </button>\n  </div>\n\n  <span class=\"ajf-slide-header-spacer\"></span>\n\n  <ng-content></ng-content>\n</div>\n", styles: ["ajf-slide-header{display:block}ajf-slide-header .ajf-slide-header{display:flex;flex-wrap:wrap;align-items:center;gap:10px;padding:12px 20px;background:var(--ajf-surface);font-family:var(--ajf-font-sans)}ajf-slide-header .ajf-slide-header-spacer{flex:1 1 auto}ajf-slide-header .ajf-slide-title{display:inline-flex;align-items:center;justify-content:center;gap:8px;box-sizing:border-box;min-height:var(--ajf-control-h);border:1px solid var(--ajf-border-strong);border-radius:var(--ajf-radius);background:var(--ajf-surface);color:var(--ajf-text);font-family:var(--ajf-font-sans);font-size:14px;cursor:pointer;flex:0 1 auto;justify-content:flex-start;gap:10px;max-width:100%;padding:0 12px}ajf-slide-header .ajf-slide-title:hover:not(:disabled){border-color:var(--ajf-accent)}ajf-slide-header .ajf-slide-title:disabled{color:var(--ajf-text-faint);cursor:default}ajf-slide-header .ajf-slide-title .ajf-slide-number{display:inline-flex;flex:0 0 auto;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:var(--ajf-accent);color:var(--ajf-accent-fg);font-size:12px;font-weight:600}ajf-slide-header .ajf-slide-title .ajf-slide-label-stack{display:grid;min-width:0;max-width:340px;text-align:left}ajf-slide-header .ajf-slide-title .ajf-slide-label{grid-area:1/1;overflow:hidden;visibility:hidden;font-size:16px;font-weight:600;text-overflow:ellipsis;white-space:nowrap}ajf-slide-header .ajf-slide-title .ajf-slide-label.ajf-current{visibility:visible}ajf-slide-header .ajf-slide-title .ajf-slide-caret{width:20px;height:20px;margin-left:auto;color:var(--ajf-text-muted);font-size:20px}ajf-slide-header .ajf-slide-title-static{cursor:default}ajf-slide-header .ajf-slide-title-static:hover{border-color:var(--ajf-border-strong)}ajf-slide-header .ajf-slide-nav{display:flex;gap:8px}ajf-slide-header .ajf-slide-nav .ajf-btn{width:var(--ajf-control-h);padding:0}.mat-mdc-menu-panel .mat-mdc-menu-item .mat-icon.ajf-invalid{color:var(--ajf-danger)}\n"] }]
    }], null, { slide: [{
            type: Input
        }], displayNumber: [{
            type: Input
        }], slides: [{
            type: Input
        }], pages: [{
            type: Input
        }], jumpTo: [{
            type: Output
        }], prev: [{
            type: Output
        }], next: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfSlideHeader, { className: "AjfSlideHeader", filePath: "slide-header.ts", lineNumber: 47 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUtaGVhZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvZm9ybXMvc3JjL3NsaWRlLWhlYWRlci50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm1zL3NyYy9zbGlkZS1oZWFkZXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF1QkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7SUNSbEYsMkJBS1E7Ozs7O0lBRk4sb0RBQWlDO0lBQ2pDLG9GQUFzQzs7O0lBRzFDLG9DQUEyRDtJQUFBLCtCQUFlO0lBQUEsaUJBQVc7Ozs7SUFJckYsa0NBS0M7SUFEQyxxTUFBUyx3QkFBYyxLQUFDO0lBRXhCLGdDQUF5QztJQUFBLFlBQW1DO0lBQUEsaUJBQVc7SUFDdkYsMkJBQW9EOztJQUN0RCxpQkFBUzs7O0lBTFAsaURBQWdDO0lBR3RCLGNBQThCO0lBQTlCLDBDQUE4QjtJQUFDLGNBQW1DO0lBQW5DLHNEQUFtQztJQUN0RSxjQUFzQztJQUF0QyxvRkFBc0M7Ozs7SUFNOUMsQUFERiwrQkFBK0MsaUJBTTVDOztJQUZDLDJLQUFTLGtCQUFXLEtBQUM7SUFHckIsZ0NBQVU7SUFBQSw0QkFBWTtJQUN4QixBQUR3QixpQkFBVyxFQUMxQjtJQUNULGtDQUtDOztJQUZDLDJLQUFTLGtCQUFXLEtBQUM7SUFHckIsZ0NBQVU7SUFBQSw2QkFBYTtJQUUzQixBQURFLEFBRHlCLGlCQUFXLEVBQzNCLEVBQ0w7O0lBWkYsY0FBc0M7O0lBUXRDLGVBQXlDOzs7QUQxQi9DOzs7Ozs7Ozs7OztHQVdHO0FBVUgsTUFBTSxPQUFPLGNBQWM7SUFUM0I7UUFVRSw2REFBNkQ7UUFDcEQsVUFBSyxHQUE0QixJQUFJLENBQUM7UUFFL0MsMEVBQTBFO1FBQ2pFLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBRTNCLGtEQUFrRDtRQUN6QyxXQUFNLEdBQXVCLEVBQUUsQ0FBQztRQUV6QywrRUFBK0U7UUFDdEUsVUFBSyxHQUFHLENBQUMsQ0FBQztRQWtCQSxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQW9CLENBQUM7UUFDOUMsU0FBSSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDaEMsU0FBSSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7S0FDcEQ7SUFuQkM7OztPQUdHO0lBQ0gsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNqRSxDQUFDOytHQTNCVSxjQUFjO29FQUFkLGNBQWM7O1lDN0N6QixBQURGLDhCQUE4QixnQkFRM0I7O1lBQ0MsK0JBQStCO1lBQUEsWUFBbUI7WUFBQSxpQkFBTztZQUt6RCwrQkFBb0M7WUFDbEMsaUVBS0M7WUFDSCxpQkFBTztZQUNQLHlFQUEyRDtZQUM3RCxpQkFBUztZQUVULHlDQUErQjtZQUM3Qix1RUFLQztZQUlILGlCQUFXO1lBR1gsaUVBQStDO1lBbUIvQywyQkFBNkM7WUFFN0MsbUJBQXlCO1lBQzNCLGlCQUFNOzs7WUF4REYsY0FBbUQ7WUFBbkQsb0VBQW1EO1lBRW5ELEFBREEscURBQStCLG1DQUNBOztZQUdBLGVBQW1CO1lBQW5CLHVDQUFtQjtZQVFoQyxlQUFTO1lBQVQsb0NBQVM7WUFLUSxjQUFzQjtZQUF0QiwrQ0FBc0I7WUFNekMsZUFBUztZQUFULG9DQUFTO1lBVUMsY0FBaUI7WUFBakIsc0NBQWlCOzs7aUZEUWxDLGNBQWM7Y0FUMUIsU0FBUzsyQkFDRSxrQkFBa0IsaUJBR2IsaUJBQWlCLENBQUMsSUFBSTtnQkFPNUIsS0FBSztrQkFBYixLQUFLO1lBR0csYUFBYTtrQkFBckIsS0FBSztZQUdHLE1BQU07a0JBQWQsS0FBSztZQUdHLEtBQUs7a0JBQWIsS0FBSztZQWtCYSxNQUFNO2tCQUF4QixNQUFNO1lBQ1ksSUFBSTtrQkFBdEIsTUFBTTtZQUNZLElBQUk7a0JBQXRCLE1BQU07O2tGQS9CSSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZlNsaWRlSW5zdGFuY2V9IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogVGhlIGJhciBhdCB0aGUgdG9wIG9mIGV2ZXJ5IHNsaWRlOiBpdHMgbnVtYmVyIGFuZCB0aXRsZSwgYSBtZW51IHRvIGp1bXAgdG8gYW55XG4gKiBvdGhlciBzbGlkZSwgcHJldmlvdXMvbmV4dCBwYWdpbmcsIGFuZCBhIHNsb3QgZm9yIHRoZSBmb3JtJ3Mgb3duIGFjdGlvblxuICogYnV0dG9ucy5cbiAqXG4gKiBXaGF0IHRoZSBmb3JtIHN0aWxsIGhhcyBmYWlsaW5nIGlzIHJlcG9ydGVkIGJ5IHRoZSBmb290ZXIgYWxvbmUuIE5hbWluZyBpdFxuICogaGVyZSB0b28gY29zdCBhIHBob25lJ3Mgd2hvbGUgaGVhZGVyIHdpZHRoIHRvIHJlcGVhdCBzb21ldGhpbmcgYWxyZWFkeSBvblxuICogc2NyZWVuLlxuICpcbiAqIFBhZ2luZyBiZWxvbmdzIHRvIHRoZSByZW5kZXJlciwgd2hpY2ggb3ducyB0aGUgcGFnZSBzbGlkZXIsIHNvIGl0IGlzIHJhaXNlZFxuICogYXMgYW4gZXZlbnQgcmF0aGVyIHRoYW4gaGFuZGxlZCBoZXJlLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtc2xpZGUtaGVhZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICdzbGlkZS1oZWFkZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydzbGlkZS1oZWFkZXIuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAvLyBEZWxpYmVyYXRlbHkgbm90IE9uUHVzaDogc2xpZGUgdmlzaWJpbGl0eSBhbmQgcmVwZXRpdGlvbiBjb3VudHMgYXJlIG11dGF0ZWRcbiAgLy8gaW4gcGxhY2UsIHNvIHRoZSBqdW1wIG1lbnUgYW5kIHRoZSByZXBldGl0aW9uIHBpbGwgd291bGQgZ28gc3RhbGUgdW5kZXIgYVxuICAvLyBzdHJhdGVneSB0aGF0IG9ubHkgcmUtY2hlY2tzIHdoZW4gYW4gaW5wdXQgaWRlbnRpdHkgY2hhbmdlcy5cbn0pXG5leHBvcnQgY2xhc3MgQWpmU2xpZGVIZWFkZXIge1xuICAvKiogQWJzZW50IHdoaWxlIGEgc3RhcnQgb3IgZW5kIG1lc3NhZ2UgcGFnZSBpcyBvbiBzY3JlZW4uICovXG4gIEBJbnB1dCgpIHNsaWRlOiBBamZTbGlkZUluc3RhbmNlIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqIFRoZSBudW1iZXIgc2hvd24gaW4gdGhlIGJhZGdlLCBhbHJlYWR5IG9mZnNldCBieSBhbnkgc3RhcnQgbWVzc2FnZS4gKi9cbiAgQElucHV0KCkgZGlzcGxheU51bWJlciA9IDE7XG5cbiAgLyoqIEV2ZXJ5IHNsaWRlIG9mIHRoZSBmb3JtLCBmb3IgdGhlIGp1bXAgbWVudS4gKi9cbiAgQElucHV0KCkgc2xpZGVzOiBBamZTbGlkZUluc3RhbmNlW10gPSBbXTtcblxuICAvKiogSG93IG1hbnkgcGFnZXMgdGhlIHNsaWRlciBob2xkcywgcmVwZXRpdGlvbnMgYW5kIG1lc3NhZ2UgcGFnZXMgaW5jbHVkZWQuICovXG4gIEBJbnB1dCgpIHBhZ2VzID0gMDtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgZm9ybSBoYXMgYW55d2hlcmUgdG8gcGFnZSB0by4gQSBzaW5nbGUgcGFnZSBmb3JtIGdldHMgbm8gYXJyb3dzXG4gICAqIGFuZCBubyBcInNsaWRlIDEgb2YgMVwiOiBib3RoIGFyZSBjb250cm9scyB0aGF0IGNhbm5vdCBkbyBhbnl0aGluZy5cbiAgICovXG4gIGdldCBjYW5OYXZpZ2F0ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlcyA+IDE7XG4gIH1cblxuICAvKipcbiAgICogV2hldGhlciB0aGUganVtcCBtZW51IGlzIHdvcnRoIG9wZW5pbmcuIENvdW50ZWQgb3ZlciB0aGUgdmlzaWJsZSBzbGlkZXMsIHRoZVxuICAgKiBvbmx5IG9uZXMgdGhlIG1lbnUgY2FuIGFjdHVhbGx5IHJlYWNoLlxuICAgKi9cbiAgZ2V0IGNhbkp1bXAoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2xpZGVzLmZpbHRlcihzID0+IHMudmlzaWJsZSAhPT0gZmFsc2UpLmxlbmd0aCA+IDE7XG4gIH1cblxuICBAT3V0cHV0KCkgcmVhZG9ubHkganVtcFRvID0gbmV3IEV2ZW50RW1pdHRlcjxBamZTbGlkZUluc3RhbmNlPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgcHJldiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG5leHQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG59XG4iLCI8ZGl2IGNsYXNzPVwiYWpmLXNsaWRlLWhlYWRlclwiPlxuICA8YnV0dG9uXG4gICAgdHlwZT1cImJ1dHRvblwiXG4gICAgY2xhc3M9XCJhamYtc2xpZGUtdGl0bGVcIlxuICAgIFtjbGFzcy5hamYtc2xpZGUtdGl0bGUtc3RhdGljXT1cIiFzbGlkZSB8fCAhY2FuSnVtcFwiXG4gICAgW2Rpc2FibGVkXT1cIiFzbGlkZSB8fCAhY2FuSnVtcFwiXG4gICAgW21hdE1lbnVUcmlnZ2VyRm9yXT1cInNsaWRlTWVudVwiXG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCInR28gdG8gc2xpZGUnIHwgdHJhbnNsb2NvXCJcbiAgPlxuICAgIDxzcGFuIGNsYXNzPVwiYWpmLXNsaWRlLW51bWJlclwiPnt7IGRpc3BsYXlOdW1iZXIgfX08L3NwYW4+XG5cbiAgICA8IS0tIEV2ZXJ5IHNsaWRlIHRpdGxlIGlzIGxhaWQgb3V0IGluIHRoZSBzYW1lIGdyaWQgY2VsbCwgc28gdGhlIHRyaWdnZXIgaXMgYXNcbiAgICAgICAgIHdpZGUgYXMgdGhlIGxvbmdlc3Qgb2YgdGhlbSBhbmQga2VlcHMgdGhhdCB3aWR0aCB3aGlsZSBwYWdpbmcuIE9ubHkgdGhlXG4gICAgICAgICBjdXJyZW50IHRpdGxlIGlzIHZpc2libGU7IHRoZSByZXN0IGp1c3QgaG9sZCB0aGUgc3BhY2Ugb3Blbi4gLS0+XG4gICAgPHNwYW4gY2xhc3M9XCJhamYtc2xpZGUtbGFiZWwtc3RhY2tcIj5cbiAgICAgIDxzcGFuXG4gICAgICAgIGNsYXNzPVwiYWpmLXNsaWRlLWxhYmVsXCJcbiAgICAgICAgKm5nRm9yPVwibGV0IHMgb2Ygc2xpZGVzXCJcbiAgICAgICAgW2NsYXNzLmFqZi1jdXJyZW50XT1cInMgPT09IHNsaWRlXCJcbiAgICAgICAgW2lubmVySFRNTF09XCJzLm5vZGUubGFiZWwgfCB0cmFuc2xvY29cIlxuICAgICAgPjwvc3Bhbj5cbiAgICA8L3NwYW4+XG4gICAgPG1hdC1pY29uIGNsYXNzPVwiYWpmLXNsaWRlLWNhcmV0XCIgKm5nSWY9XCJzbGlkZSAmJiBjYW5KdW1wXCI+YXJyb3dfZHJvcF9kb3duPC9tYXQtaWNvbj5cbiAgPC9idXR0b24+XG5cbiAgPG1hdC1tZW51ICNzbGlkZU1lbnU9XCJtYXRNZW51XCI+XG4gICAgPGJ1dHRvblxuICAgICAgbWF0LW1lbnUtaXRlbVxuICAgICAgKm5nRm9yPVwibGV0IHMgb2Ygc2xpZGVzXCJcbiAgICAgIFtkaXNhYmxlZF09XCJzLnZpc2libGUgPT09IGZhbHNlXCJcbiAgICAgIChjbGljayk9XCJqdW1wVG8uZW1pdChzKVwiXG4gICAgPlxuICAgICAgPG1hdC1pY29uIFtjbGFzcy5hamYtaW52YWxpZF09XCIhcy52YWxpZFwiPnt7IHMudmFsaWQgPyAnY2hlY2snIDogJ3dhcm5pbmcnIH19PC9tYXQtaWNvbj5cbiAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwicy5ub2RlLmxhYmVsIHwgdHJhbnNsb2NvXCI+PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICA8L21hdC1tZW51PlxuXG4gIDwhLS0gTm90aGluZyB0byBwYWdlIHRocm91Z2ggaW4gYSBzaW5nbGUgcGFnZSBmb3JtLiAtLT5cbiAgPGRpdiBjbGFzcz1cImFqZi1zbGlkZS1uYXZcIiAqbmdJZj1cImNhbk5hdmlnYXRlXCI+XG4gICAgPGJ1dHRvblxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICBjbGFzcz1cImFqZi1idG5cIlxuICAgICAgKGNsaWNrKT1cInByZXYuZW1pdCgpXCJcbiAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiJ0JhY2snIHwgdHJhbnNsb2NvXCJcbiAgICA+XG4gICAgICA8bWF0LWljb24+Y2hldnJvbl9sZWZ0PC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cbiAgICA8YnV0dG9uXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgIGNsYXNzPVwiYWpmLWJ0blwiXG4gICAgICAoY2xpY2spPVwibmV4dC5lbWl0KClcIlxuICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCInRm9yd2FyZCcgfCB0cmFuc2xvY29cIlxuICAgID5cbiAgICAgIDxtYXQtaWNvbj5jaGV2cm9uX3JpZ2h0PC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG5cbiAgPHNwYW4gY2xhc3M9XCJhamYtc2xpZGUtaGVhZGVyLXNwYWNlclwiPjwvc3Bhbj5cblxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5cbiJdfQ==