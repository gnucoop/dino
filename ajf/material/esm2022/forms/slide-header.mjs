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
import { isRepeatingSlideInstance } from '@ajf/core/forms';
import { Component, EventEmitter, Input, Output, ViewEncapsulation, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/material/icon";
import * as i3 from "@angular/material/menu";
import * as i4 from "@ngneat/transloco";
import * as i5 from "./slide-stats";
const _c0 = ["*"];
const _c1 = (a0, a1) => ({ fields: a0, slides: a1 });
function AjfSlideHeader_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 14);
    i0.ɵɵpipe(1, "transloco");
} if (rf & 2) {
    const s_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("ajf-current", s_r1 === ctx_r1.slide);
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 3, s_r1.node.label), i0.ɵɵsanitizeHtml);
} }
function AjfSlideHeader_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 15);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("ajf-pill-placeholder", ctx_r1.reps < 1);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", ctx_r1.reps, " ", i0.ɵɵpipeBind1(2, 4, "repetitions"), "");
} }
function AjfSlideHeader_span_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "ajfSlideCompletion");
    i0.ɵɵpipe(3, "ajfSlideCompletion");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r3 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind3(2, 2, s_r3, ctx_r1.repIndex, ctx_r1.group).done, "/", i0.ɵɵpipeBind3(3, 6, s_r3, ctx_r1.repIndex, ctx_r1.group).total, "");
} }
function AjfSlideHeader_mat_icon_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 17);
    i0.ɵɵtext(1, "arrow_drop_down");
    i0.ɵɵelementEnd();
} }
function AjfSlideHeader_button_12_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 18);
    i0.ɵɵlistener("click", function AjfSlideHeader_button_12_Template_button_click_0_listener() { const s_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.jumpTo.emit(s_r5)); });
    i0.ɵɵelementStart(1, "mat-icon");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "span", 19);
    i0.ɵɵpipe(4, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r5 = ctx.$implicit;
    i0.ɵɵproperty("disabled", s_r5.visible === false);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("ajf-invalid", !s_r5.valid);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(s_r5.valid ? "check" : "warning");
    i0.ɵɵadvance();
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(4, 5, s_r5.node.label), i0.ɵɵsanitizeHtml);
} }
function AjfSlideHeader_div_13_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 20)(1, "button", 21);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵlistener("click", function AjfSlideHeader_div_13_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.prev.emit()); });
    i0.ɵɵelementStart(3, "mat-icon");
    i0.ɵɵtext(4, "chevron_left");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "button", 21);
    i0.ɵɵpipe(6, "transloco");
    i0.ɵɵlistener("click", function AjfSlideHeader_div_13_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.next.emit()); });
    i0.ɵɵelementStart(7, "mat-icon");
    i0.ɵɵtext(8, "chevron_right");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(2, 2, "Back"));
    i0.ɵɵadvance(4);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(6, 4, "Forward"));
} }
function AjfSlideHeader_button_14_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 22);
    i0.ɵɵlistener("click", function AjfSlideHeader_button_14_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.gotoIssue.emit()); });
    i0.ɵɵelementStart(1, "mat-icon");
    i0.ɵɵtext(2, "error");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(4, 1, "{{fields}} fields in {{slides}} slides need attention", i0.ɵɵpureFunction2(4, _c1, ctx_r1.issues.fields, ctx_r1.issues.slides)), " ");
} }
function AjfSlideHeader_span_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 23);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵpipe(3, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate4("", i0.ɵɵpipeBind1(2, 4, "slide"), " ", ctx_r1.displayNumber, " ", i0.ɵɵpipeBind1(3, 6, "of"), " ", ctx_r1.total, "");
} }
/**
 * The bar at the top of every slide: its number and title, a completion
 * counter, a menu to jump to any other slide, previous/next paging, an alert
 * when the slide has failing fields, and a slot for the form's own action
 * buttons.
 *
 * Paging and error navigation belong to the renderer, which owns the page
 * slider, so they are raised as events rather than handled here.
 */
export class AjfSlideHeader {
    constructor() {
        /** Absent while a start or end message page is on screen. */
        this.slide = null;
        /** The number shown in the badge, already offset by any start message. */
        this.displayNumber = 1;
        /** Which repetition of a repeating slide this header belongs to. */
        this.repIndex = 0;
        /** Every slide of the form, for the jump menu. */
        this.slides = [];
        /** How many repetitions a repeating slide currently has; 0 when not repeating. */
        this.reps = 0;
        /** How many visible slides the form has, for the "slide N of M" readout. */
        this.total = 0;
        /** How many pages the slider holds, repetitions and message pages included. */
        this.pages = 0;
        /**
         * The form's control group, which the completion counter reads values from.
         * Not named `formGroup`: that is ReactiveFormsModule's own selector, and would
         * bind FormGroupDirective to this element too.
         */
        this.group = null;
        /** What the whole form still has failing, computed by the renderer. */
        this.issues = null;
        this.jumpTo = new EventEmitter();
        this.prev = new EventEmitter();
        this.next = new EventEmitter();
        this.gotoIssue = new EventEmitter();
    }
    /**
     * Whether any slide of the form repeats. The repetition count sits inside the
     * jump trigger, so its slot is held open on every slide of such a form -- one
     * width for the whole form beats a trigger that jumps by the width of a pill
     * whenever a repeating slide comes up. Forms with no repeating slide never
     * reserve the space.
     */
    get hasRepeatingSlides() {
        return this.slides.some(s => isRepeatingSlideInstance(s));
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
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfSlideHeader, selectors: [["ajf-slide-header"]], inputs: { slide: "slide", displayNumber: "displayNumber", repIndex: "repIndex", slides: "slides", reps: "reps", total: "total", pages: "pages", group: "group", issues: "issues" }, outputs: { jumpTo: "jumpTo", prev: "prev", next: "next", gotoIssue: "gotoIssue" }, ngContentSelectors: _c0, decls: 18, vars: 16, consts: [["slideMenu", "matMenu"], [1, "ajf-slide-header"], ["type", "button", 1, "ajf-slide-title", 3, "disabled", "matMenuTriggerFor"], [1, "ajf-slide-number"], [1, "ajf-slide-label-stack"], ["class", "ajf-slide-label", 3, "ajf-current", "innerHTML", 4, "ngFor", "ngForOf"], ["class", "ajf-pill ajf-reps-pill", 3, "ajf-pill-placeholder", 4, "ngIf"], ["class", "ajf-pill", 4, "ngIf"], ["class", "ajf-slide-caret", 4, "ngIf"], ["mat-menu-item", "", 3, "disabled", "click", 4, "ngFor", "ngForOf"], ["class", "ajf-slide-nav", 4, "ngIf"], ["type", "button", "class", "ajf-pill ajf-pill--danger ajf-issue-pill", 3, "click", 4, "ngIf"], [1, "ajf-slide-header-spacer"], ["class", "ajf-slide-count", 4, "ngIf"], [1, "ajf-slide-label", 3, "innerHTML"], [1, "ajf-pill", "ajf-reps-pill"], [1, "ajf-pill"], [1, "ajf-slide-caret"], ["mat-menu-item", "", 3, "click", "disabled"], [3, "innerHTML"], [1, "ajf-slide-nav"], ["type", "button", 1, "ajf-btn", 3, "click"], ["type", "button", 1, "ajf-pill", "ajf-pill--danger", "ajf-issue-pill", 3, "click"], [1, "ajf-slide-count"]], template: function AjfSlideHeader_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef();
            i0.ɵɵelementStart(0, "div", 1)(1, "button", 2);
            i0.ɵɵpipe(2, "transloco");
            i0.ɵɵelementStart(3, "span", 3);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "span", 4);
            i0.ɵɵtemplate(6, AjfSlideHeader_span_6_Template, 2, 5, "span", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(7, AjfSlideHeader_span_7_Template, 3, 6, "span", 6)(8, AjfSlideHeader_span_8_Template, 4, 10, "span", 7)(9, AjfSlideHeader_mat_icon_9_Template, 2, 0, "mat-icon", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "mat-menu", null, 0);
            i0.ɵɵtemplate(12, AjfSlideHeader_button_12_Template, 5, 7, "button", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(13, AjfSlideHeader_div_13_Template, 9, 6, "div", 10)(14, AjfSlideHeader_button_14_Template, 5, 7, "button", 11);
            i0.ɵɵelement(15, "span", 12);
            i0.ɵɵtemplate(16, AjfSlideHeader_span_16_Template, 4, 8, "span", 13);
            i0.ɵɵprojection(17);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            const slideMenu_r8 = i0.ɵɵreference(11);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("ajf-slide-title-static", !ctx.slide || !ctx.canJump);
            i0.ɵɵproperty("disabled", !ctx.slide || !ctx.canJump)("matMenuTriggerFor", slideMenu_r8);
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(2, 14, "Go to slide"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.displayNumber);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.slides);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasRepeatingSlides);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.slide);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.slide && ctx.canJump);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", ctx.slides);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.canNavigate);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.issues && ctx.issues.fields > 0);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.canNavigate && ctx.total > 0);
        } }, dependencies: [i1.NgForOf, i1.NgIf, i2.MatIcon, i3.MatMenu, i3.MatMenuItem, i3.MatMenuTrigger, i4.TranslocoPipe, i5.AjfSlideCompletionPipe], styles: ["ajf-slide-header{display:block}ajf-slide-header .ajf-slide-header{display:flex;flex-wrap:wrap;align-items:center;gap:10px;padding:12px 20px;background:var(--ajf-surface);font-family:var(--ajf-font-sans)}ajf-slide-header .ajf-slide-header-spacer{flex:1 1 auto}ajf-slide-header .ajf-slide-title{display:inline-flex;align-items:center;justify-content:center;gap:8px;box-sizing:border-box;min-height:var(--ajf-control-h);border:1px solid var(--ajf-border-strong);border-radius:var(--ajf-radius);background:var(--ajf-surface);color:var(--ajf-text);font-family:var(--ajf-font-sans);font-size:14px;cursor:pointer;flex:0 1 auto;justify-content:flex-start;gap:10px;max-width:100%;padding:0 12px}ajf-slide-header .ajf-slide-title:hover:not(:disabled){border-color:var(--ajf-accent)}ajf-slide-header .ajf-slide-title:disabled{color:var(--ajf-text-faint);cursor:default}ajf-slide-header .ajf-slide-title .ajf-slide-number{display:inline-flex;flex:0 0 auto;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:var(--ajf-accent);color:var(--ajf-accent-fg);font-size:12px;font-weight:600}ajf-slide-header .ajf-slide-title .ajf-slide-label-stack{display:grid;min-width:0;max-width:340px;text-align:left}ajf-slide-header .ajf-slide-title .ajf-slide-label{grid-area:1/1;overflow:hidden;visibility:hidden;font-size:16px;font-weight:600;text-overflow:ellipsis;white-space:nowrap}ajf-slide-header .ajf-slide-title .ajf-slide-label.ajf-current{visibility:visible}ajf-slide-header .ajf-slide-title .ajf-slide-caret{width:20px;height:20px;margin-left:auto;color:var(--ajf-text-muted);font-size:20px}ajf-slide-header .ajf-slide-title-static{cursor:default}ajf-slide-header .ajf-slide-title-static:hover{border-color:var(--ajf-border-strong)}ajf-slide-header .ajf-slide-title .ajf-pill{justify-content:center;min-width:3.4em}ajf-slide-header .ajf-slide-title .ajf-reps-pill{min-width:8em}ajf-slide-header .ajf-pill-placeholder{visibility:hidden}ajf-slide-header .ajf-slide-count{font-family:var(--ajf-font-mono);font-size:13px;letter-spacing:.01em;color:var(--ajf-text-faint)}ajf-slide-header .ajf-slide-nav{display:flex;gap:8px}ajf-slide-header .ajf-slide-nav .ajf-btn{width:var(--ajf-control-h);padding:0}ajf-slide-header .ajf-issue-pill{border:0;cursor:pointer}ajf-slide-header .ajf-issue-pill .mat-icon{width:16px;height:16px;font-size:16px}.mat-mdc-menu-panel .mat-mdc-menu-item .mat-icon.ajf-invalid{color:var(--ajf-danger)}\n"], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfSlideHeader, [{
        type: Component,
        args: [{ selector: 'ajf-slide-header', encapsulation: ViewEncapsulation.None, template: "<div class=\"ajf-slide-header\">\n  <button\n    type=\"button\"\n    class=\"ajf-slide-title\"\n    [class.ajf-slide-title-static]=\"!slide || !canJump\"\n    [disabled]=\"!slide || !canJump\"\n    [matMenuTriggerFor]=\"slideMenu\"\n    [attr.aria-label]=\"'Go to slide' | transloco\"\n  >\n    <span class=\"ajf-slide-number\">{{ displayNumber }}</span>\n\n    <!-- Every slide title is laid out in the same grid cell, so the trigger is as\n         wide as the longest of them and keeps that width while paging. Only the\n         current title is visible; the rest just hold the space open. -->\n    <span class=\"ajf-slide-label-stack\">\n      <span\n        class=\"ajf-slide-label\"\n        *ngFor=\"let s of slides\"\n        [class.ajf-current]=\"s === slide\"\n        [innerHTML]=\"s.node.label | transloco\"\n      ></span>\n    </span>\n\n    <span\n      class=\"ajf-pill ajf-reps-pill\"\n      *ngIf=\"hasRepeatingSlides\"\n      [class.ajf-pill-placeholder]=\"reps < 1\"\n      >{{ reps }} {{ 'repetitions' | transloco }}</span\n    >\n    <span class=\"ajf-pill\" *ngIf=\"slide as s\"\n      >{{ (s | ajfSlideCompletion : repIndex : group).done }}/{{\n        (s | ajfSlideCompletion : repIndex : group).total\n      }}</span\n    >\n    <mat-icon class=\"ajf-slide-caret\" *ngIf=\"slide && canJump\">arrow_drop_down</mat-icon>\n  </button>\n\n  <mat-menu #slideMenu=\"matMenu\">\n    <button\n      mat-menu-item\n      *ngFor=\"let s of slides\"\n      [disabled]=\"s.visible === false\"\n      (click)=\"jumpTo.emit(s)\"\n    >\n      <mat-icon [class.ajf-invalid]=\"!s.valid\">{{ s.valid ? 'check' : 'warning' }}</mat-icon>\n      <span [innerHTML]=\"s.node.label | transloco\"></span>\n    </button>\n  </mat-menu>\n\n  <!-- Nothing to page through in a single page form. -->\n  <div class=\"ajf-slide-nav\" *ngIf=\"canNavigate\">\n    <button\n      type=\"button\"\n      class=\"ajf-btn\"\n      (click)=\"prev.emit()\"\n      [attr.aria-label]=\"'Back' | transloco\"\n    >\n      <mat-icon>chevron_left</mat-icon>\n    </button>\n    <button\n      type=\"button\"\n      class=\"ajf-btn\"\n      (click)=\"next.emit()\"\n      [attr.aria-label]=\"'Forward' | transloco\"\n    >\n      <mat-icon>chevron_right</mat-icon>\n    </button>\n  </div>\n\n  <!-- Form-wide, not per-slide: the slide on screen is the one place the reader\n       can already see what is wrong. -->\n  <button\n    type=\"button\"\n    class=\"ajf-pill ajf-pill--danger ajf-issue-pill\"\n    *ngIf=\"issues && issues.fields > 0\"\n    (click)=\"gotoIssue.emit()\"\n  >\n    <mat-icon>error</mat-icon>\n    {{\n      '{{fields}} fields in {{slides}} slides need attention'\n        | transloco : {fields: issues.fields, slides: issues.slides}\n    }}\n  </button>\n\n  <span class=\"ajf-slide-header-spacer\"></span>\n\n  <span class=\"ajf-slide-count\" *ngIf=\"canNavigate && total > 0\"\n    >{{ 'slide' | transloco }} {{ displayNumber }} {{ 'of' | transloco }} {{ total }}</span\n  >\n\n  <ng-content></ng-content>\n</div>\n", styles: ["ajf-slide-header{display:block}ajf-slide-header .ajf-slide-header{display:flex;flex-wrap:wrap;align-items:center;gap:10px;padding:12px 20px;background:var(--ajf-surface);font-family:var(--ajf-font-sans)}ajf-slide-header .ajf-slide-header-spacer{flex:1 1 auto}ajf-slide-header .ajf-slide-title{display:inline-flex;align-items:center;justify-content:center;gap:8px;box-sizing:border-box;min-height:var(--ajf-control-h);border:1px solid var(--ajf-border-strong);border-radius:var(--ajf-radius);background:var(--ajf-surface);color:var(--ajf-text);font-family:var(--ajf-font-sans);font-size:14px;cursor:pointer;flex:0 1 auto;justify-content:flex-start;gap:10px;max-width:100%;padding:0 12px}ajf-slide-header .ajf-slide-title:hover:not(:disabled){border-color:var(--ajf-accent)}ajf-slide-header .ajf-slide-title:disabled{color:var(--ajf-text-faint);cursor:default}ajf-slide-header .ajf-slide-title .ajf-slide-number{display:inline-flex;flex:0 0 auto;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:var(--ajf-accent);color:var(--ajf-accent-fg);font-size:12px;font-weight:600}ajf-slide-header .ajf-slide-title .ajf-slide-label-stack{display:grid;min-width:0;max-width:340px;text-align:left}ajf-slide-header .ajf-slide-title .ajf-slide-label{grid-area:1/1;overflow:hidden;visibility:hidden;font-size:16px;font-weight:600;text-overflow:ellipsis;white-space:nowrap}ajf-slide-header .ajf-slide-title .ajf-slide-label.ajf-current{visibility:visible}ajf-slide-header .ajf-slide-title .ajf-slide-caret{width:20px;height:20px;margin-left:auto;color:var(--ajf-text-muted);font-size:20px}ajf-slide-header .ajf-slide-title-static{cursor:default}ajf-slide-header .ajf-slide-title-static:hover{border-color:var(--ajf-border-strong)}ajf-slide-header .ajf-slide-title .ajf-pill{justify-content:center;min-width:3.4em}ajf-slide-header .ajf-slide-title .ajf-reps-pill{min-width:8em}ajf-slide-header .ajf-pill-placeholder{visibility:hidden}ajf-slide-header .ajf-slide-count{font-family:var(--ajf-font-mono);font-size:13px;letter-spacing:.01em;color:var(--ajf-text-faint)}ajf-slide-header .ajf-slide-nav{display:flex;gap:8px}ajf-slide-header .ajf-slide-nav .ajf-btn{width:var(--ajf-control-h);padding:0}ajf-slide-header .ajf-issue-pill{border:0;cursor:pointer}ajf-slide-header .ajf-issue-pill .mat-icon{width:16px;height:16px;font-size:16px}.mat-mdc-menu-panel .mat-mdc-menu-item .mat-icon.ajf-invalid{color:var(--ajf-danger)}\n"] }]
    }], null, { slide: [{
            type: Input
        }], displayNumber: [{
            type: Input
        }], repIndex: [{
            type: Input
        }], slides: [{
            type: Input
        }], reps: [{
            type: Input
        }], total: [{
            type: Input
        }], pages: [{
            type: Input
        }], group: [{
            type: Input
        }], issues: [{
            type: Input
        }], jumpTo: [{
            type: Output
        }], prev: [{
            type: Output
        }], next: [{
            type: Output
        }], gotoIssue: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfSlideHeader, { className: "AjfSlideHeader", filePath: "slide-header.ts", lineNumber: 53 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUtaGVhZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvZm9ybXMvc3JjL3NsaWRlLWhlYWRlci50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm1zL3NyYy9zbGlkZS1oZWFkZXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQW1CLHdCQUF3QixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDM0UsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7SUNkakIsMkJBS1E7Ozs7O0lBRk4sb0RBQWlDO0lBQ2pDLG9GQUFzQzs7O0lBSTFDLGdDQUlHO0lBQUEsWUFBMEM7O0lBQUEsaUJBQzVDOzs7SUFGQyx1REFBdUM7SUFDdEMsY0FBMEM7SUFBMUMsb0ZBQTBDOzs7SUFFN0MsZ0NBQ0c7SUFBQSxZQUVDOzs7SUFBQSxpQkFDSDs7OztJQUhFLGNBRUM7SUFGRCxtS0FFQzs7O0lBRUosb0NBQTJEO0lBQUEsK0JBQWU7SUFBQSxpQkFBVzs7OztJQUlyRixrQ0FLQztJQURDLHFNQUFTLHdCQUFjLEtBQUM7SUFFeEIsZ0NBQXlDO0lBQUEsWUFBbUM7SUFBQSxpQkFBVztJQUN2RiwyQkFBb0Q7O0lBQ3RELGlCQUFTOzs7SUFMUCxpREFBZ0M7SUFHdEIsY0FBOEI7SUFBOUIsMENBQThCO0lBQUMsY0FBbUM7SUFBbkMsc0RBQW1DO0lBQ3RFLGNBQXNDO0lBQXRDLG9GQUFzQzs7OztJQU05QyxBQURGLCtCQUErQyxpQkFNNUM7O0lBRkMsMktBQVMsa0JBQVcsS0FBQztJQUdyQixnQ0FBVTtJQUFBLDRCQUFZO0lBQ3hCLEFBRHdCLGlCQUFXLEVBQzFCO0lBQ1Qsa0NBS0M7O0lBRkMsMktBQVMsa0JB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TzVCLEtBQUs7a0JBQWIsS0FBSztZQUdHLGFBQWE7a0JBQXJCLEtBQUs7WUFHRyxRQUFRO2tCQUFoQixLQUFLO1lBR0csTUFBTTtrQkFBZCxLQUFLO1lBR0csSUFBSTtrQkFBWixLQUFLO1lBR0csS0FBSztrQkFBYixLQUFLO1lBR0csS0FBSztrQkFBYixLQUFLO1lBT0csS0FBSztrQkFBYixLQUFLO1lBR0csTUFBTTtrQkFBZCxLQUFLO1lBNkJhLE1BQU07a0JBQXhCLE1BQU07WUFDWSxJQUFJO2tCQUF0QixNQUFNO1lBQ1ksSUFBSTtrQkFBdEIsTUFBTTtZQUNZLFNBQVM7a0JBQTNCLE1BQU07O2tGQTlESSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZlNsaWRlSW5zdGFuY2UsIGlzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZX0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1VudHlwZWRGb3JtR3JvdXB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHtBamZGb3JtSXNzdWVzfSBmcm9tICcuL3NsaWRlLXN0YXRzJztcblxuLyoqXG4gKiBUaGUgYmFyIGF0IHRoZSB0b3Agb2YgZXZlcnkgc2xpZGU6IGl0cyBudW1iZXIgYW5kIHRpdGxlLCBhIGNvbXBsZXRpb25cbiAqIGNvdW50ZXIsIGEgbWVudSB0byBqdW1wIHRvIGFueSBvdGhlciBzbGlkZSwgcHJldmlvdXMvbmV4dCBwYWdpbmcsIGFuIGFsZXJ0XG4gKiB3aGVuIHRoZSBzbGlkZSBoYXMgZmFpbGluZyBmaWVsZHMsIGFuZCBhIHNsb3QgZm9yIHRoZSBmb3JtJ3Mgb3duIGFjdGlvblxuICogYnV0dG9ucy5cbiAqXG4gKiBQYWdpbmcgYW5kIGVycm9yIG5hdmlnYXRpb24gYmVsb25nIHRvIHRoZSByZW5kZXJlciwgd2hpY2ggb3ducyB0aGUgcGFnZVxuICogc2xpZGVyLCBzbyB0aGV5IGFyZSByYWlzZWQgYXMgZXZlbnRzIHJhdGhlciB0aGFuIGhhbmRsZWQgaGVyZS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXNsaWRlLWhlYWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnc2xpZGUtaGVhZGVyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnc2xpZGUtaGVhZGVyLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgLy8gRGVsaWJlcmF0ZWx5IG5vdCBPblB1c2g6IHRoZSBjb21wbGV0aW9uIGNvdW50ZXIsIHRoZSBpc3N1ZSBjb3VudCBhbmQgdGhlXG4gIC8vIGFkZC9yZW1vdmUgZ3VhcmRzIGFyZSByZWFkIG9mZiBtdXRhYmxlIGluc3RhbmNlIHN0YXRlIHRocm91Z2ggaW1wdXJlIHBpcGVzLFxuICAvLyB3aGljaCB1bmRlciBPblB1c2ggd291bGQgb25seSBiZSByZWNvbXB1dGVkIHdoZW4gYW4gaW5wdXQgaWRlbnRpdHkgY2hhbmdlZC5cbn0pXG5leHBvcnQgY2xhc3MgQWpmU2xpZGVIZWFkZXIge1xuICAvKiogQWJzZW50IHdoaWxlIGEgc3RhcnQgb3IgZW5kIG1lc3NhZ2UgcGFnZSBpcyBvbiBzY3JlZW4uICovXG4gIEBJbnB1dCgpIHNsaWRlOiBBamZTbGlkZUluc3RhbmNlIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqIFRoZSBudW1iZXIgc2hvd24gaW4gdGhlIGJhZGdlLCBhbHJlYWR5IG9mZnNldCBieSBhbnkgc3RhcnQgbWVzc2FnZS4gKi9cbiAgQElucHV0KCkgZGlzcGxheU51bWJlciA9IDE7XG5cbiAgLyoqIFdoaWNoIHJlcGV0aXRpb24gb2YgYSByZXBlYXRpbmcgc2xpZGUgdGhpcyBoZWFkZXIgYmVsb25ncyB0by4gKi9cbiAgQElucHV0KCkgcmVwSW5kZXggPSAwO1xuXG4gIC8qKiBFdmVyeSBzbGlkZSBvZiB0aGUgZm9ybSwgZm9yIHRoZSBqdW1wIG1lbnUuICovXG4gIEBJbnB1dCgpIHNsaWRlczogQWpmU2xpZGVJbnN0YW5jZVtdID0gW107XG5cbiAgLyoqIEhvdyBtYW55IHJlcGV0aXRpb25zIGEgcmVwZWF0aW5nIHNsaWRlIGN1cnJlbnRseSBoYXM7IDAgd2hlbiBub3QgcmVwZWF0aW5nLiAqL1xuICBASW5wdXQoKSByZXBzID0gMDtcblxuICAvKiogSG93IG1hbnkgdmlzaWJsZSBzbGlkZXMgdGhlIGZvcm0gaGFzLCBmb3IgdGhlIFwic2xpZGUgTiBvZiBNXCIgcmVhZG91dC4gKi9cbiAgQElucHV0KCkgdG90YWwgPSAwO1xuXG4gIC8qKiBIb3cgbWFueSBwYWdlcyB0aGUgc2xpZGVyIGhvbGRzLCByZXBldGl0aW9ucyBhbmQgbWVzc2FnZSBwYWdlcyBpbmNsdWRlZC4gKi9cbiAgQElucHV0KCkgcGFnZXMgPSAwO1xuXG4gIC8qKlxuICAgKiBUaGUgZm9ybSdzIGNvbnRyb2wgZ3JvdXAsIHdoaWNoIHRoZSBjb21wbGV0aW9uIGNvdW50ZXIgcmVhZHMgdmFsdWVzIGZyb20uXG4gICAqIE5vdCBuYW1lZCBgZm9ybUdyb3VwYDogdGhhdCBpcyBSZWFjdGl2ZUZvcm1zTW9kdWxlJ3Mgb3duIHNlbGVjdG9yLCBhbmQgd291bGRcbiAgICogYmluZCBGb3JtR3JvdXBEaXJlY3RpdmUgdG8gdGhpcyBlbGVtZW50IHRvby5cbiAgICovXG4gIEBJbnB1dCgpIGdyb3VwOiBVbnR5cGVkRm9ybUdyb3VwIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqIFdoYXQgdGhlIHdob2xlIGZvcm0gc3RpbGwgaGFzIGZhaWxpbmcsIGNvbXB1dGVkIGJ5IHRoZSByZW5kZXJlci4gKi9cbiAgQElucHV0KCkgaXNzdWVzOiBBamZGb3JtSXNzdWVzIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgYW55IHNsaWRlIG9mIHRoZSBmb3JtIHJlcGVhdHMuIFRoZSByZXBldGl0aW9uIGNvdW50IHNpdHMgaW5zaWRlIHRoZVxuICAgKiBqdW1wIHRyaWdnZXIsIHNvIGl0cyBzbG90IGlzIGhlbGQgb3BlbiBvbiBldmVyeSBzbGlkZSBvZiBzdWNoIGEgZm9ybSAtLSBvbmVcbiAgICogd2lkdGggZm9yIHRoZSB3aG9sZSBmb3JtIGJlYXRzIGEgdHJpZ2dlciB0aGF0IGp1bXBzIGJ5IHRoZSB3aWR0aCBvZiBhIHBpbGxcbiAgICogd2hlbmV2ZXIgYSByZXBlYXRpbmcgc2xpZGUgY29tZXMgdXAuIEZvcm1zIHdpdGggbm8gcmVwZWF0aW5nIHNsaWRlIG5ldmVyXG4gICAqIHJlc2VydmUgdGhlIHNwYWNlLlxuICAgKi9cbiAgZ2V0IGhhc1JlcGVhdGluZ1NsaWRlcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zbGlkZXMuc29tZShzID0+IGlzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZShzKSk7XG4gIH1cblxuICAvKipcbiAgICogV2hldGhlciB0aGUgZm9ybSBoYXMgYW55d2hlcmUgdG8gcGFnZSB0by4gQSBzaW5nbGUgcGFnZSBmb3JtIGdldHMgbm8gYXJyb3dzXG4gICAqIGFuZCBubyBcInNsaWRlIDEgb2YgMVwiOiBib3RoIGFyZSBjb250cm9scyB0aGF0IGNhbm5vdCBkbyBhbnl0aGluZy5cbiAgICovXG4gIGdldCBjYW5OYXZpZ2F0ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlcyA+IDE7XG4gIH1cblxuICAvKipcbiAgICogV2hldGhlciB0aGUganVtcCBtZW51IGlzIHdvcnRoIG9wZW5pbmcuIENvdW50ZWQgb3ZlciB0aGUgdmlzaWJsZSBzbGlkZXMsIHRoZVxuICAgKiBvbmx5IG9uZXMgdGhlIG1lbnUgY2FuIGFjdHVhbGx5IHJlYWNoLlxuICAgKi9cbiAgZ2V0IGNhbkp1bXAoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2xpZGVzLmZpbHRlcihzID0+IHMudmlzaWJsZSAhPT0gZmFsc2UpLmxlbmd0aCA+IDE7XG4gIH1cblxuICBAT3V0cHV0KCkgcmVhZG9ubHkganVtcFRvID0gbmV3IEV2ZW50RW1pdHRlcjxBamZTbGlkZUluc3RhbmNlPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgcHJldiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG5leHQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBnb3RvSXNzdWUgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG59XG4iLCI8ZGl2IGNsYXNzPVwiYWpmLXNsaWRlLWhlYWRlclwiPlxuICA8YnV0dG9uXG4gICAgdHlwZT1cImJ1dHRvblwiXG4gICAgY2xhc3M9XCJhamYtc2xpZGUtdGl0bGVcIlxuICAgIFtjbGFzcy5hamYtc2xpZGUtdGl0bGUtc3RhdGljXT1cIiFzbGlkZSB8fCAhY2FuSnVtcFwiXG4gICAgW2Rpc2FibGVkXT1cIiFzbGlkZSB8fCAhY2FuSnVtcFwiXG4gICAgW21hdE1lbnVUcmlnZ2VyRm9yXT1cInNsaWRlTWVudVwiXG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCInR28gdG8gc2xpZGUnIHwgdHJhbnNsb2NvXCJcbiAgPlxuICAgIDxzcGFuIGNsYXNzPVwiYWpmLXNsaWRlLW51bWJlclwiPnt7IGRpc3BsYXlOdW1iZXIgfX08L3NwYW4+XG5cbiAgICA8IS0tIEV2ZXJ5IHNsaWRlIHRpdGxlIGlzIGxhaWQgb3V0IGluIHRoZSBzYW1lIGdyaWQgY2VsbCwgc28gdGhlIHRyaWdnZXIgaXMgYXNcbiAgICAgICAgIHdpZGUgYXMgdGhlIGxvbmdlc3Qgb2YgdGhlbSBhbmQga2VlcHMgdGhhdCB3aWR0aCB3aGlsZSBwYWdpbmcuIE9ubHkgdGhlXG4gICAgICAgICBjdXJyZW50IHRpdGxlIGlzIHZpc2libGU7IHRoZSByZXN0IGp1c3QgaG9sZCB0aGUgc3BhY2Ugb3Blbi4gLS0+XG4gICAgPHNwYW4gY2xhc3M9XCJhamYtc2xpZGUtbGFiZWwtc3RhY2tcIj5cbiAgICAgIDxzcGFuXG4gICAgICAgIGNsYXNzPVwiYWpmLXNsaWRlLWxhYmVsXCJcbiAgICAgICAgKm5nRm9yPVwibGV0IHMgb2Ygc2xpZGVzXCJcbiAgICAgICAgW2NsYXNzLmFqZi1jdXJyZW50XT1cInMgPT09IHNsaWRlXCJcbiAgICAgICAgW2lubmVySFRNTF09XCJzLm5vZGUubGFiZWwgfCB0cmFuc2xvY29cIlxuICAgICAgPjwvc3Bhbj5cbiAgICA8L3NwYW4+XG5cbiAgICA8c3BhblxuICAgICAgY2xhc3M9XCJhamYtcGlsbCBhamYtcmVwcy1waWxsXCJcbiAgICAgICpuZ0lmPVwiaGFzUmVwZWF0aW5nU2xpZGVzXCJcbiAgICAgIFtjbGFzcy5hamYtcGlsbC1wbGFjZWhvbGRlcl09XCJyZXBzIDwgMVwiXG4gICAgICA+e3sgcmVwcyB9fSB7eyAncmVwZXRpdGlvbnMnIHwgdHJhbnNsb2NvIH19PC9zcGFuXG4gICAgPlxuICAgIDxzcGFuIGNsYXNzPVwiYWpmLXBpbGxcIiAqbmdJZj1cInNsaWRlIGFzIHNcIlxuICAgICAgPnt7IChzIHwgYWpmU2xpZGVDb21wbGV0aW9uIDogcmVwSW5kZXggOiBncm91cCkuZG9uZSB9fS97e1xuICAgICAgICAocyB8IGFqZlNsaWRlQ29tcGxldGlvbiA6IHJlcEluZGV4IDogZ3JvdXApLnRvdGFsXG4gICAgICB9fTwvc3BhblxuICAgID5cbiAgICA8bWF0LWljb24gY2xhc3M9XCJhamYtc2xpZGUtY2FyZXRcIiAqbmdJZj1cInNsaWRlICYmIGNhbkp1bXBcIj5hcnJvd19kcm9wX2Rvd248L21hdC1pY29uPlxuICA8L2J1dHRvbj5cblxuICA8bWF0LW1lbnUgI3NsaWRlTWVudT1cIm1hdE1lbnVcIj5cbiAgICA8YnV0dG9uXG4gICAgICBtYXQtbWVudS1pdGVtXG4gICAgICAqbmdGb3I9XCJsZXQgcyBvZiBzbGlkZXNcIlxuICAgICAgW2Rpc2FibGVkXT1cInMudmlzaWJsZSA9PT0gZmFsc2VcIlxuICAgICAgKGNsaWNrKT1cImp1bXBUby5lbWl0KHMpXCJcbiAgICA+XG4gICAgICA8bWF0LWljb24gW2NsYXNzLmFqZi1pbnZhbGlkXT1cIiFzLnZhbGlkXCI+e3sgcy52YWxpZCA/ICdjaGVjaycgOiAnd2FybmluZycgfX08L21hdC1pY29uPlxuICAgICAgPHNwYW4gW2lubmVySFRNTF09XCJzLm5vZGUubGFiZWwgfCB0cmFuc2xvY29cIj48L3NwYW4+XG4gICAgPC9idXR0b24+XG4gIDwvbWF0LW1lbnU+XG5cbiAgPCEtLSBOb3RoaW5nIHRvIHBhZ2UgdGhyb3VnaCBpbiBhIHNpbmdsZSBwYWdlIGZvcm0uIC0tPlxuICA8ZGl2IGNsYXNzPVwiYWpmLXNsaWRlLW5hdlwiICpuZ0lmPVwiY2FuTmF2aWdhdGVcIj5cbiAgICA8YnV0dG9uXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgIGNsYXNzPVwiYWpmLWJ0blwiXG4gICAgICAoY2xpY2spPVwicHJldi5lbWl0KClcIlxuICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCInQmFjaycgfCB0cmFuc2xvY29cIlxuICAgID5cbiAgICAgIDxtYXQtaWNvbj5jaGV2cm9uX2xlZnQ8L21hdC1pY29uPlxuICAgIDwvYnV0dG9uPlxuICAgIDxidXR0b25cbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgY2xhc3M9XCJhamYtYnRuXCJcbiAgICAgIChjbGljayk9XCJuZXh0LmVtaXQoKVwiXG4gICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIidGb3J3YXJkJyB8IHRyYW5zbG9jb1wiXG4gICAgPlxuICAgICAgPG1hdC1pY29uPmNoZXZyb25fcmlnaHQ8L21hdC1pY29uPlxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cblxuICA8IS0tIEZvcm0td2lkZSwgbm90IHBlci1zbGlkZTogdGhlIHNsaWRlIG9uIHNjcmVlbiBpcyB0aGUgb25lIHBsYWNlIHRoZSByZWFkZXJcbiAgICAgICBjYW4gYWxyZWFkeSBzZWUgd2hhdCBpcyB3cm9uZy4gLS0+XG4gIDxidXR0b25cbiAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICBjbGFzcz1cImFqZi1waWxsIGFqZi1waWxsLS1kYW5nZXIgYWpmLWlzc3VlLXBpbGxcIlxuICAgICpuZ0lmPVwiaXNzdWVzICYmIGlzc3Vlcy5maWVsZHMgPiAwXCJcbiAgICAoY2xpY2spPVwiZ290b0lzc3VlLmVtaXQoKVwiXG4gID5cbiAgICA8bWF0LWljb24+ZXJyb3I8L21hdC1pY29uPlxuICAgIHt7XG4gICAgICAne3tmaWVsZHN9fSBmaWVsZHMgaW4ge3tzbGlkZXN9fSBzbGlkZXMgbmVlZCBhdHRlbnRpb24nXG4gICAgICAgIHwgdHJhbnNsb2NvIDoge2ZpZWxkczogaXNzdWVzLmZpZWxkcywgc2xpZGVzOiBpc3N1ZXMuc2xpZGVzfVxuICAgIH19XG4gIDwvYnV0dG9uPlxuXG4gIDxzcGFuIGNsYXNzPVwiYWpmLXNsaWRlLWhlYWRlci1zcGFjZXJcIj48L3NwYW4+XG5cbiAgPHNwYW4gY2xhc3M9XCJhamYtc2xpZGUtY291bnRcIiAqbmdJZj1cImNhbk5hdmlnYXRlICYmIHRvdGFsID4gMFwiXG4gICAgPnt7ICdzbGlkZScgfCB0cmFuc2xvY28gfX0ge3sgZGlzcGxheU51bWJlciB9fSB7eyAnb2YnIHwgdHJhbnNsb2NvIH19IHt7IHRvdGFsIH19PC9zcGFuXG4gID5cblxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5cbiJdfQ==