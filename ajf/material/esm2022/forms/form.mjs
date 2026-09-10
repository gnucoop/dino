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
import { AjfFieldType, AjfFormRenderer as CoreFormRenderer, isRepeatingSlideInstance, } from '@ajf/core/forms';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, } from '@angular/core';
import { EMPTY, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/core/forms";
import * as i2 from "@ajf/core/page-slider";
import * as i3 from "@ajf/material/page-slider";
import * as i4 from "@angular/common";
import * as i5 from "@angular/material/icon";
import * as i6 from "@angular/forms";
import * as i7 from "./field-row";
import * as i8 from "./rep-strip";
import * as i9 from "./slide-header";
import * as i10 from "@ngneat/transloco";
import * as i11 from "./current-slide";
import * as i12 from "./slide-stats";
const _c0 = [[["", "ajfFormTopToolbarButtons", ""]], [["", "ajfFormSaveButton", ""]], [["", "ajfFormStartMessageTitle", ""]], [["", "ajfFormStartMessage", ""]], [["", "ajfFormEndMessageTitle", ""]], [["", "ajfFormEndMessage", ""]]];
const _c1 = ["[ajfFormTopToolbarButtons]", "[ajfFormSaveButton]", "[ajfFormStartMessageTitle]", "[ajfFormStartMessage]", "[ajfFormEndMessageTitle]", "[ajfFormEndMessage]"];
const _c2 = (a0, a1) => ({ fields: a0, slides: a1 });
function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_span_4_button_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "Save"), " ");
} }
function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_span_4_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 14);
    i0.ɵɵlistener("click", function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_span_4_Template_span_click_0_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r2.onSave($event)); });
    i0.ɵɵelementStart(1, "span", null, 1);
    i0.ɵɵprojection(3, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_span_4_button_4_Template, 3, 3, "button", 15);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const saveButton_r5 = i0.ɵɵreference(2);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", saveButton_r5 && saveButton_r5.childNodes && saveButton_r5.childNodes.length === 0);
} }
function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_ajf_rep_strip_5_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ajf-rep-strip", 17);
    i0.ɵɵpipe(1, "ajfAsRepeatingSlideInstance");
    i0.ɵɵlistener("goTo", function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_ajf_rep_strip_5_Template_ajf_rep_strip_goTo_0_listener($event) { i0.ɵɵrestoreView(_r6); const cur_r7 = i0.ɵɵnextContext(2).ngIf; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.goToRep(cur_r7.slide, $event)); })("add", function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_ajf_rep_strip_5_Template_ajf_rep_strip_add_0_listener() { i0.ɵɵrestoreView(_r6); const cur_r7 = i0.ɵɵnextContext(2).ngIf; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.addGroup(cur_r7.slide)); })("remove", function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_ajf_rep_strip_5_Template_ajf_rep_strip_remove_0_listener() { i0.ɵɵrestoreView(_r6); const cur_r7 = i0.ɵɵnextContext(2).ngIf; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.removeGroup(cur_r7.slide, cur_r7.repIndex)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cur_r7 = i0.ɵɵnextContext(2).ngIf;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("slide", i0.ɵɵpipeBind1(1, 3, cur_r7.slide))("current", cur_r7.repIndex)("readonly", ctx_r2.readonly);
} }
function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 10)(1, "ajf-slide-header", 11);
    i0.ɵɵpipe(2, "ajfFormIssues");
    i0.ɵɵlistener("jumpTo", function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_Template_ajf_slide_header_jumpTo_1_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.goToSlide($event)); })("prev", function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_Template_ajf_slide_header_prev_1_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.goToPrevSlide()); })("next", function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_Template_ajf_slide_header_next_1_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.goToNextSlide()); })("gotoIssue", function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_Template_ajf_slide_header_gotoIssue_1_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.goToNextError()); });
    i0.ɵɵprojection(3);
    i0.ɵɵtemplate(4, AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_span_4_Template, 5, 1, "span", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_ajf_rep_strip_5_Template, 2, 5, "ajf-rep-strip", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cur_r7 = i0.ɵɵnextContext().ngIf;
    const curSlides_r8 = i0.ɵɵnextContext().ngIf;
    const fg_r9 = i0.ɵɵnextContext().ngIf;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("slide", cur_r7.slide)("slides", curSlides_r8)("displayNumber", cur_r7.displayNumber)("repIndex", cur_r7.repIndex)("reps", cur_r7.reps)("total", cur_r7.total)("pages", cur_r7.pages)("group", fg_r9)("issues", i0.ɵɵpipeBind1(2, 11, curSlides_r8));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !ctx_r2.saveDisabled);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", cur_r7.slide && cur_r7.reps > 0);
} }
function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_Template, 6, 13, "div", 9);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.hideTopToolbar);
} }
function AjfFormRenderer_ng_container_0_ng_container_3_ajf_page_slider_item_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ajf-page-slider-item")(1, "div", 18)(2, "h2", 19);
    i0.ɵɵprojection(3, 2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 20);
    i0.ɵɵprojection(5, 3);
    i0.ɵɵelementEnd()()();
} }
function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_7_ng_container_1_ng_container_1_ajf_field_row_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-field-row", 23);
    i0.ɵɵpipe(1, "ajfAsFieldInstance");
} if (rf & 2) {
    const fieldInstance_r10 = ctx.$implicit;
    const slideInstance_r11 = i0.ɵɵnextContext(3).$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("instance", i0.ɵɵpipeBind1(1, 2, fieldInstance_r10))("readonly", ctx_r2.readonly || !slideInstance_r11.editable);
} }
function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_7_ng_container_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "ajf-page-slider-item")(2, "div", 21);
    i0.ɵɵtemplate(3, AjfFormRenderer_ng_container_0_ng_container_3_ng_container_7_ng_container_1_ng_container_1_ajf_field_row_3_Template, 2, 4, "ajf-field-row", 22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const slideInstance_r11 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", "ajf-max-columns-" + ctx_r2.maxColumns);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", slideInstance_r11.flatNodes)("ngForTrackBy", ctx_r2.trackNodeById);
} }
function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_7_ng_container_1_ng_container_3_ajf_page_slider_item_1_ajf_field_row_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-field-row", 23);
    i0.ɵɵpipe(1, "ajfAsFieldInstance");
} if (rf & 2) {
    const fieldInstance_r12 = ctx.$implicit;
    const slideInstance_r11 = i0.ɵɵnextContext(4).$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("instance", i0.ɵɵpipeBind1(1, 2, fieldInstance_r12))("readonly", ctx_r2.readonly || !slideInstance_r11.editable);
} }
function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_7_ng_container_1_ng_container_3_ajf_page_slider_item_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ajf-page-slider-item", 25)(1, "div", 21);
    i0.ɵɵtemplate(2, AjfFormRenderer_ng_container_0_ng_container_3_ng_container_7_ng_container_1_ng_container_3_ajf_page_slider_item_1_ajf_field_row_2_Template, 2, 4, "ajf-field-row", 22);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const idx_r13 = ctx.index;
    const lastSlide_r14 = ctx.last;
    const slideInstance_r11 = i0.ɵɵnextContext(3).$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("isRepeating", true)("isRepeatingLast", lastSlide_r14);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", "ajf-max-columns-" + ctx_r2.maxColumns);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", slideInstance_r11.slideNodes[idx_r13])("ngForTrackBy", ctx_r2.trackNodeById);
} }
function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_7_ng_container_1_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFormRenderer_ng_container_0_ng_container_3_ng_container_7_ng_container_1_ng_container_3_ajf_page_slider_item_1_Template, 3, 5, "ajf-page-slider-item", 24);
    i0.ɵɵpipe(2, "ajfAsRepeatingSlideInstance");
    i0.ɵɵpipe(3, "ajfRange");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const slideInstance_r11 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(3, 3, i0.ɵɵpipeBind1(2, 1, slideInstance_r11).reps));
} }
function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_7_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFormRenderer_ng_container_0_ng_container_3_ng_container_7_ng_container_1_ng_container_1_Template, 4, 3, "ng-container", 2);
    i0.ɵɵpipe(2, "ajfIsRepeatingSlideInstance");
    i0.ɵɵtemplate(3, AjfFormRenderer_ng_container_0_ng_container_3_ng_container_7_ng_container_1_ng_container_3_Template, 4, 5, "ng-container", 2);
    i0.ɵɵpipe(4, "ajfIsRepeatingSlideInstance");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const slideInstance_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !i0.ɵɵpipeBind1(2, 2, slideInstance_r11));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(4, 4, slideInstance_r11));
} }
function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFormRenderer_ng_container_0_ng_container_3_ng_container_7_ng_container_1_Template, 5, 6, "ng-container", 2);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const slideInstance_r11 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", slideInstance_r11.visible);
} }
function AjfFormRenderer_ng_container_0_ng_container_3_ajf_page_slider_item_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ajf-page-slider-item")(1, "div", 18)(2, "h2", 19);
    i0.ɵɵprojection(3, 4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 20);
    i0.ɵɵprojection(5, 5);
    i0.ɵɵelementEnd()()();
} }
function AjfFormRenderer_ng_container_0_ng_container_3_div_9_ng_container_1_span_1_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 28)(1, "mat-icon");
    i0.ɵɵtext(2, "error");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "transloco");
    i0.ɵɵelementStart(5, "button", 29);
    i0.ɵɵlistener("click", function AjfFormRenderer_ng_container_0_ng_container_3_div_9_ng_container_1_span_1_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r2.goToPrevError()); });
    i0.ɵɵelementStart(6, "mat-icon");
    i0.ɵɵtext(7, "arrow_upward");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 29);
    i0.ɵɵlistener("click", function AjfFormRenderer_ng_container_0_ng_container_3_div_9_ng_container_1_span_1_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r2.goToNextError()); });
    i0.ɵɵelementStart(9, "mat-icon");
    i0.ɵɵtext(10, "arrow_downward");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const issues_r16 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(4, 1, "{{fields}} fields in {{slides}} slides need attention", i0.ɵɵpureFunction2(4, _c2, issues_r16.fields, issues_r16.slides)), " ");
} }
function AjfFormRenderer_ng_container_0_ng_container_3_div_9_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFormRenderer_ng_container_0_ng_container_3_div_9_ng_container_1_span_1_Template, 11, 7, "span", 27);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const issues_r16 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", issues_r16.fields > 0);
} }
function AjfFormRenderer_ng_container_0_ng_container_3_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵtemplate(1, AjfFormRenderer_ng_container_0_ng_container_3_div_9_ng_container_1_Template, 2, 1, "ng-container", 2);
    i0.ɵɵpipe(2, "ajfFormIssues");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const curSlides_r8 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(2, 1, curSlides_r8));
} }
function AjfFormRenderer_ng_container_0_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_Template, 2, 1, "ng-container", 2);
    i0.ɵɵpipe(2, "ajfCurrentSlide");
    i0.ɵɵelementStart(3, "div", 5)(4, "ajf-page-slider", 6, 0);
    i0.ɵɵlistener("orientationChange", function AjfFormRenderer_ng_container_0_ng_container_3_Template_ajf_page_slider_orientationChange_4_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.orientationChangeHandler($event)); });
    i0.ɵɵtemplate(6, AjfFormRenderer_ng_container_0_ng_container_3_ajf_page_slider_item_6_Template, 6, 0, "ajf-page-slider-item", 2)(7, AjfFormRenderer_ng_container_0_ng_container_3_ng_container_7_Template, 2, 1, "ng-container", 7)(8, AjfFormRenderer_ng_container_0_ng_container_3_ajf_page_slider_item_8_Template, 6, 0, "ajf-page-slider-item", 2)(9, AjfFormRenderer_ng_container_0_ng_container_3_div_9_Template, 3, 3, "div", 8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const curSlides_r8 = ctx.ngIf;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind4(2, 9, curSlides_r8, ctx_r2.currentPage, ctx_r2.hasStartMessage, ctx_r2.hasEndMessage));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("fixedOrientation", ctx_r2.fixedOrientation)("hideNavigationButtons", ctx_r2.hideNavigationButtons)("orientation", ctx_r2.orientation);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", curSlides_r8.length > 0 && ctx_r2.hasStartMessage);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", curSlides_r8)("ngForTrackBy", ctx_r2.trackNodeById);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", curSlides_r8 && curSlides_r8.length > 0 && ctx_r2.hasEndMessage);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.hideBottomToolbar);
} }
function AjfFormRenderer_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "form", 3)(2, "div", 4);
    i0.ɵɵtemplate(3, AjfFormRenderer_ng_container_0_ng_container_3_Template, 10, 14, "ng-container", 2);
    i0.ɵɵpipe(4, "async");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const fg_r9 = ctx.ngIf;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵclassProp("ajf-form-readonly", ctx_r2.readonly);
    i0.ɵɵproperty("formGroup", fg_r9);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(4, 4, ctx_r2.slides));
} }
export class AjfFormRenderer extends CoreFormRenderer {
    constructor(rendererService, changeDetectorRef) {
        super(rendererService, changeDetectorRef);
        /**
         * @deprecated The slide strip has been replaced by the jump menu in the slide
         * header, which is always available. Kept so that existing templates still
         * compile.
         */
        this.topBar = false;
        /**
         * @deprecated Field rows align their labels and controls on a shared grid, so
         * there is nothing left to centre.
         */
        this.centeredFieldsContent = false;
        /** How many field rows sit side by side. */
        this.maxColumns = 1;
        /**
         * The page the slider is showing. The slide header is rendered once, above the
         * slider, so it needs to know which slide is on screen; the page slider only
         * reports that imperatively, hence the mirrored property.
         */
        this.currentPage = 0;
        this._slideList = [];
        this._validitySubscription = Subscription.EMPTY;
        this._slidesSubscription = Subscription.EMPTY;
        this._valueSubscription = Subscription.EMPTY;
        this._pageSubscription = Subscription.EMPTY;
        this._pageInit = false;
        this._slidesSubscription = this.slides.subscribe(slides => {
            this._slideList = slides || [];
        });
        // This component is OnPush, and children are only visited when it is
        // checked. The slide header reports live state -- how many fields are
        // filled, how many are failing -- so a value change anywhere in the form has
        // to bring the renderer back into the check.
        this._valueSubscription = this.formGroup
            .pipe(switchMap(fg => (fg ? fg.valueChanges : EMPTY)))
            .subscribe(() => this._changeDetectorRef.markForCheck());
        // Validity moves without a value moving with it -- a visibility change or a
        // recalculated formula is enough -- and the issue counts are read through
        // impure pipes, so this brings the renderer back into the check too.
        this._validitySubscription = this.errors.subscribe(() => this._changeDetectorRef.markForCheck());
    }
    ngAfterViewChecked() {
        super.ngAfterViewChecked();
        if (!this._pageInit && this.formSlider != null) {
            this._pageInit = true;
            this.currentPage = this.formSlider.currentPage;
            this._pageSubscription = this.formSlider.pageScrollFinish.subscribe(() => {
                this.currentPage = this.formSlider.currentPage;
                this._changeDetectorRef.markForCheck();
            });
        }
    }
    ngOnDestroy() {
        this._slidesSubscription.unsubscribe();
        this._valueSubscription.unsubscribe();
        this._validitySubscription.unsubscribe();
        this._pageSubscription.unsubscribe();
        super.ngOnDestroy();
    }
    fieldStyle(field) {
        if (field.node.fieldType === AjfFieldType.Formula && field.node.label === '') {
            return { display: 'none' };
        }
        return {};
    }
    /** Page to the first page of a slide, from the header's jump menu. */
    goToSlide(slide) {
        this._slideTo(this._pageOf(slide));
    }
    /** Page to one repetition of the repeating slide currently on screen. */
    goToRep(slide, repIndex) {
        this._slideTo(this._pageOf(slide) + repIndex);
    }
    goToPrevSlide() {
        this.formSlider?.slide({ dir: 'up' });
    }
    goToNextSlide() {
        this.formSlider?.slide({ dir: 'down' });
    }
    /**
     * The slider page a slide starts on. `AjfSlideInstance.position` cannot be
     * used directly here: it does not account for a start message page, and this
     * has to agree with the page arithmetic used by `ajfCurrentSlide`.
     */
    _pageOf(slide) {
        let page = this.hasStartMessage ? 1 : 0;
        for (const cur of this._slideList) {
            if (cur.visible === false) {
                continue;
            }
            if (cur === slide) {
                break;
            }
            page += isRepeatingSlideInstance(cur)
                ? Math.max(1, cur.reps)
                : 1;
        }
        return page;
    }
    _slideTo(page) {
        if (this.formSlider != null) {
            this.formSlider.slide({ to: page });
        }
    }
    static { this.ɵfac = function AjfFormRenderer_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFormRenderer)(i0.ɵɵdirectiveInject(i1.AjfFormRendererService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFormRenderer, selectors: [["ajf-form"]], inputs: { topBar: "topBar", centeredFieldsContent: "centeredFieldsContent", maxColumns: "maxColumns" }, features: [i0.ɵɵInheritDefinitionFeature], ngContentSelectors: _c1, decls: 2, vars: 3, consts: [["formSlider", ""], ["saveButton", ""], [4, "ngIf"], ["novalidate", "", 3, "formGroup"], [1, "ajf-form-container"], [1, "ajf-slider-container"], [3, "orientationChange", "fixedOrientation", "hideNavigationButtons", "orientation"], [4, "ngFor", "ngForOf", "ngForTrackBy"], ["ajfPageSliderBar", "", "class", "ajf-form-footer", 4, "ngIf"], ["class", "ajf-form-bar", 4, "ngIf"], [1, "ajf-form-bar"], [3, "jumpTo", "prev", "next", "gotoIssue", "slide", "slides", "displayNumber", "repIndex", "reps", "total", "pages", "group", "issues"], ["class", "ajf-form-save", 3, "click", 4, "ngIf"], [3, "slide", "current", "readonly", "goTo", "add", "remove", 4, "ngIf"], [1, "ajf-form-save", 3, "click"], ["type", "button", "class", "ajf-btn--primary", 4, "ngIf"], ["type", "button", 1, "ajf-btn--primary"], [3, "goTo", "add", "remove", "slide", "current", "readonly"], [1, "ajf-form-page", "ajf-form-message"], [1, "ajf-message-title"], [1, "ajf-message-body"], [1, "ajf-form-page", 3, "ngClass"], [3, "instance", "readonly", 4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "instance", "readonly"], [3, "isRepeating", "isRepeatingLast", 4, "ngFor", "ngForOf"], [3, "isRepeating", "isRepeatingLast"], ["ajfPageSliderBar", "", 1, "ajf-form-footer"], ["class", "ajf-form-footer-status", 4, "ngIf"], [1, "ajf-form-footer-status"], ["type", "button", 1, "ajf-btn--ghost", 3, "click"]], template: function AjfFormRenderer_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef(_c0);
            i0.ɵɵtemplate(0, AjfFormRenderer_ng_container_0_Template, 5, 6, "ng-container", 2);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.formGroup));
        } }, dependencies: [i2.AjfPageSliderItem, i3.AjfPageSlider, i4.NgClass, i4.NgForOf, i4.NgIf, i5.MatIcon, i6.ɵNgNoValidate, i6.NgControlStatusGroup, i6.FormGroupDirective, i7.AjfFieldRow, i8.AjfRepStrip, i9.AjfSlideHeader, i10.TranslocoPipe, i4.AsyncPipe, i1.AjfAsFieldInstancePipe, i1.AjfAsRepeatingSlideInstancePipe, i1.AjfIsRepeatingSlideInstancePipe, i1.AjfRangePipe, i11.AjfCurrentSlidePipe, i12.AjfFormIssuesPipe], styles: ["ajf-form{display:block;height:100%}ajf-form .ajf-form-container{display:flex;flex-direction:column;box-sizing:border-box;height:100%;background:var(--ajf-bg);color:var(--ajf-text);font-family:var(--ajf-font-sans)}ajf-form .ajf-form-bar{flex:0 0 auto;border-bottom:1px solid var(--ajf-border);background:var(--ajf-surface)}ajf-form .ajf-form-save{display:inline-flex;align-items:center;gap:8px}ajf-form>form{height:100%}ajf-form .ajf-slider-container{position:relative;flex:1 1 auto;min-height:var(--ajf-slider-min-h)}ajf-form .ajf-slider-container>ajf-page-slider{position:absolute;inset:0}ajf-form .ajf-form-page{display:flex;flex-direction:column;align-self:stretch;box-sizing:border-box;width:100%;background:var(--ajf-surface)}ajf-form .ajf-form-page.ajf-max-columns-2,ajf-form .ajf-form-page.ajf-max-columns-3{display:grid;align-content:start}ajf-form .ajf-form-page.ajf-max-columns-2{grid-template-columns:repeat(2,minmax(0,1fr))}ajf-form .ajf-form-page.ajf-max-columns-3{grid-template-columns:repeat(3,minmax(0,1fr))}@media (width <= 900px){ajf-form .ajf-form-page.ajf-max-columns-2,ajf-form .ajf-form-page.ajf-max-columns-3{grid-template-columns:minmax(0,1fr)}}ajf-form .ajf-form-message{gap:12px;padding:24px 20px}ajf-form .ajf-form-message .ajf-message-title{margin:0;font-size:20px;font-weight:600}ajf-form .ajf-form-message .ajf-message-body{color:var(--ajf-text-muted)}ajf-form ajf-page-slider>mat-toolbar.ajf-toolbar{min-height:48px;padding:0 12px;border-top:1px solid var(--ajf-border);background:var(--ajf-band);color:var(--ajf-text-muted);font-family:var(--ajf-font-sans);font-size:13px}ajf-form ajf-page-slider>mat-toolbar.ajf-toolbar .mat-mdc-button{color:var(--ajf-text-muted)}ajf-form .ajf-form-footer-status{display:inline-flex;align-items:center;gap:6px;color:var(--ajf-danger)}ajf-form .ajf-form-footer-status .mat-icon{width:16px;height:16px;font-size:16px}ajf-form .ajf-form-readonly .ajf-field-label label{font-weight:600}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFormRenderer, [{
        type: Component,
        args: [{ selector: 'ajf-form', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"formGroup | async as fg\">\n  <form [class.ajf-form-readonly]=\"readonly\" novalidate [formGroup]=\"fg!\">\n    <div class=\"ajf-form-container\">\n      <ng-container *ngIf=\"slides | async as curSlides\">\n        <ng-container *ngIf=\"curSlides | ajfCurrentSlide : currentPage : hasStartMessage : hasEndMessage as cur\">\n          <div class=\"ajf-form-bar\" *ngIf=\"!hideTopToolbar\">\n            <ajf-slide-header\n              [slide]=\"cur.slide\"\n              [slides]=\"curSlides\"\n              [displayNumber]=\"cur.displayNumber\"\n              [repIndex]=\"cur.repIndex\"\n              [reps]=\"cur.reps\"\n              [total]=\"cur.total\"\n              [pages]=\"cur.pages\"\n              [group]=\"fg\"\n              [issues]=\"curSlides | ajfFormIssues\"\n              (jumpTo)=\"goToSlide($event)\"\n              (prev)=\"goToPrevSlide()\"\n              (next)=\"goToNextSlide()\"\n              (gotoIssue)=\"goToNextError()\"\n            >\n              <!-- this content projection allows to add buttons on the slide header -->\n              <ng-content select=\"[ajfFormTopToolbarButtons]\"></ng-content>\n              <!-- apply a default save button only when ajfFormSaveButton is empty -->\n              <span class=\"ajf-form-save\" *ngIf=\"!saveDisabled\" (click)=\"onSave($event)\">\n                <span #saveButton><ng-content select=\"[ajfFormSaveButton]\"></ng-content></span>\n                <button\n                  *ngIf=\"saveButton && saveButton.childNodes && saveButton.childNodes.length === 0\"\n                  type=\"button\"\n                  class=\"ajf-btn--primary\"\n                >\n                  {{ 'Save' | transloco }}\n                </button>\n              </span>\n            </ajf-slide-header>\n\n            <ajf-rep-strip\n              *ngIf=\"cur.slide && cur.reps > 0\"\n              [slide]=\"cur.slide! | ajfAsRepeatingSlideInstance\"\n              [current]=\"cur.repIndex\"\n              [readonly]=\"readonly\"\n              (goTo)=\"goToRep(cur.slide!, $event)\"\n              (add)=\"addGroup(cur.slide!)\"\n              (remove)=\"removeGroup(cur.slide!, cur.repIndex)\"\n            ></ajf-rep-strip>\n          </div>\n        </ng-container>\n\n        <div class=\"ajf-slider-container\">\n          <ajf-page-slider\n            (orientationChange)=\"orientationChangeHandler($event)\"\n            [fixedOrientation]=\"fixedOrientation\"\n            [hideNavigationButtons]=\"hideNavigationButtons\"\n            [orientation]=\"orientation\"\n            #formSlider\n          >\n            <ajf-page-slider-item *ngIf=\"curSlides!.length > 0 && hasStartMessage\">\n              <div class=\"ajf-form-page ajf-form-message\">\n                <h2 class=\"ajf-message-title\">\n                  <ng-content select=\"[ajfFormStartMessageTitle]\"></ng-content>\n                </h2>\n                <div class=\"ajf-message-body\">\n                  <ng-content select=\"[ajfFormStartMessage]\"></ng-content>\n                </div>\n              </div>\n            </ajf-page-slider-item>\n\n            <ng-container *ngFor=\"let slideInstance of curSlides; trackBy: trackNodeById\">\n              <ng-container *ngIf=\"slideInstance.visible\">\n                <!-- non repeating slides -->\n                <ng-container *ngIf=\"!(slideInstance | ajfIsRepeatingSlideInstance)\">\n                  <ajf-page-slider-item>\n                    <div class=\"ajf-form-page\" [ngClass]=\"'ajf-max-columns-' + maxColumns\">\n                      <ajf-field-row\n                        *ngFor=\"let fieldInstance of slideInstance.flatNodes; trackBy: trackNodeById\"\n                        [instance]=\"fieldInstance | ajfAsFieldInstance\"\n                        [readonly]=\"readonly || !slideInstance.editable\"\n                      ></ajf-field-row>\n                    </div>\n                  </ajf-page-slider-item>\n                </ng-container>\n\n                <!-- repeating slides: one page per repetition -->\n                <ng-container *ngIf=\"slideInstance | ajfIsRepeatingSlideInstance\">\n                  <ajf-page-slider-item\n                    *ngFor=\"\n                      let curRep of (slideInstance | ajfAsRepeatingSlideInstance).reps | ajfRange;\n                      let idx = index;\n                      let lastSlide = last\n                    \"\n                    [isRepeating]=\"true\"\n                    [isRepeatingLast]=\"lastSlide\"\n                  >\n                    <div class=\"ajf-form-page\" [ngClass]=\"'ajf-max-columns-' + maxColumns\">\n                      <ajf-field-row\n                        *ngFor=\"\n                          let fieldInstance of slideInstance.slideNodes[idx];\n                          trackBy: trackNodeById\n                        \"\n                        [instance]=\"fieldInstance | ajfAsFieldInstance\"\n                        [readonly]=\"readonly || !slideInstance.editable\"\n                      ></ajf-field-row>\n                    </div>\n                  </ajf-page-slider-item>\n                </ng-container>\n              </ng-container>\n            </ng-container>\n\n            <ajf-page-slider-item *ngIf=\"curSlides && curSlides!.length > 0 && hasEndMessage\">\n              <div class=\"ajf-form-page ajf-form-message\">\n                <h2 class=\"ajf-message-title\">\n                  <ng-content select=\"[ajfFormEndMessageTitle]\"></ng-content>\n                </h2>\n                <div class=\"ajf-message-body\">\n                  <ng-content select=\"[ajfFormEndMessage]\"></ng-content>\n                </div>\n              </div>\n            </ajf-page-slider-item>\n\n            <div ajfPageSliderBar *ngIf=\"!hideBottomToolbar\" class=\"ajf-form-footer\">\n              <ng-container *ngIf=\"curSlides | ajfFormIssues as issues\">\n                <span class=\"ajf-form-footer-status\" *ngIf=\"issues.fields > 0\">\n                  <mat-icon>error</mat-icon>\n                  {{\n                    '{{fields}} fields in {{slides}} slides need attention'\n                      | transloco : {fields: issues.fields, slides: issues.slides}\n                  }}\n                  <button type=\"button\" class=\"ajf-btn--ghost\" (click)=\"goToPrevError()\">\n                    <mat-icon>arrow_upward</mat-icon>\n                  </button>\n                  <button type=\"button\" class=\"ajf-btn--ghost\" (click)=\"goToNextError()\">\n                    <mat-icon>arrow_downward</mat-icon>\n                  </button>\n                </span>\n              </ng-container>\n            </div>\n          </ajf-page-slider>\n        </div>\n\n      </ng-container>\n    </div>\n  </form>\n</ng-container>\n", styles: ["ajf-form{display:block;height:100%}ajf-form .ajf-form-container{display:flex;flex-direction:column;box-sizing:border-box;height:100%;background:var(--ajf-bg);color:var(--ajf-text);font-family:var(--ajf-font-sans)}ajf-form .ajf-form-bar{flex:0 0 auto;border-bottom:1px solid var(--ajf-border);background:var(--ajf-surface)}ajf-form .ajf-form-save{display:inline-flex;align-items:center;gap:8px}ajf-form>form{height:100%}ajf-form .ajf-slider-container{position:relative;flex:1 1 auto;min-height:var(--ajf-slider-min-h)}ajf-form .ajf-slider-container>ajf-page-slider{position:absolute;inset:0}ajf-form .ajf-form-page{display:flex;flex-direction:column;align-self:stretch;box-sizing:border-box;width:100%;background:var(--ajf-surface)}ajf-form .ajf-form-page.ajf-max-columns-2,ajf-form .ajf-form-page.ajf-max-columns-3{display:grid;align-content:start}ajf-form .ajf-form-page.ajf-max-columns-2{grid-template-columns:repeat(2,minmax(0,1fr))}ajf-form .ajf-form-page.ajf-max-columns-3{grid-template-columns:repeat(3,minmax(0,1fr))}@media (width <= 900px){ajf-form .ajf-form-page.ajf-max-columns-2,ajf-form .ajf-form-page.ajf-max-columns-3{grid-template-columns:minmax(0,1fr)}}ajf-form .ajf-form-message{gap:12px;padding:24px 20px}ajf-form .ajf-form-message .ajf-message-title{margin:0;font-size:20px;font-weight:600}ajf-form .ajf-form-message .ajf-message-body{color:var(--ajf-text-muted)}ajf-form ajf-page-slider>mat-toolbar.ajf-toolbar{min-height:48px;padding:0 12px;border-top:1px solid var(--ajf-border);background:var(--ajf-band);color:var(--ajf-text-muted);font-family:var(--ajf-font-sans);font-size:13px}ajf-form ajf-page-slider>mat-toolbar.ajf-toolbar .mat-mdc-button{color:var(--ajf-text-muted)}ajf-form .ajf-form-footer-status{display:inline-flex;align-items:center;gap:6px;color:var(--ajf-danger)}ajf-form .ajf-form-footer-status .mat-icon{width:16px;height:16px;font-size:16px}ajf-form .ajf-form-readonly .ajf-field-label label{font-weight:600}\n"] }]
    }], () => [{ type: i1.AjfFormRendererService }, { type: i0.ChangeDetectorRef }], { topBar: [{
            type: Input
        }], centeredFieldsContent: [{
            type: Input
        }], maxColumns: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFormRenderer, { className: "AjfFormRenderer", filePath: "form.ts", lineNumber: 52 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm1zL3NyYy9mb3JtLnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvZm9ybXMvc3JjL2Zvcm0uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBRUwsWUFBWSxFQUNaLGVBQWUsSUFBSSxnQkFBZ0IsRUFJbkMsd0JBQXdCLEdBQ3pCLE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUVMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsS0FBSyxFQUVMLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsS0FBSyxFQUFFLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUN6QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ2hCekIsa0NBSUM7SUFDQyxZQUNGOztJQUFBLGlCQUFTOztJQURQLGNBQ0Y7SUFERSw2REFDRjs7OztJQVJGLGdDQUEyRTtJQUF6QixvT0FBUyxxQkFBYyxLQUFDO0lBQ3hFLHFDQUFrQjtJQUFBLHFCQUFzRDtJQUFBLGlCQUFPO0lBQy9FLGlJQUlDO0lBR0gsaUJBQU87OztJQU5GLGVBQStFO0lBQS9FLHlHQUErRTs7OztJQVN0Rix5Q0FRQzs7SUFEQyxBQURBLEFBREEsNlJBQVEsb0NBQTJCLEtBQUMsd1FBQzdCLDZCQUFvQixLQUFDLDhRQUNsQixpREFBcUMsS0FBQztJQUNqRCxpQkFBZ0I7Ozs7SUFKZixBQURBLEFBREEsMERBQWtELDRCQUMxQiw2QkFDSDs7OztJQWxDdkIsQUFERiwrQkFBa0QsMkJBZS9DOztJQURDLEFBREEsQUFEQSxBQURBLDJPQUFVLHdCQUFpQixLQUFDLG9OQUNwQixzQkFBZSxLQUFDLG9OQUNoQixzQkFBZSxLQUFD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LEVBQUUsQ0FBQztZQUNsQyxJQUFJLEdBQUcsQ0FBQyxPQUFPLEtBQUssS0FBSyxFQUFFLENBQUM7Z0JBQzFCLFNBQVM7WUFDWCxDQUFDO1lBQ0QsSUFBSSxHQUFHLEtBQUssS0FBSyxFQUFFLENBQUM7Z0JBQ2xCLE1BQU07WUFDUixDQUFDO1lBQ0QsSUFBSSxJQUFJLHdCQUF3QixDQUFDLEdBQUcsQ0FBQztnQkFDbkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFHLEdBQWlDLENBQUMsSUFBSSxDQUFDO2dCQUN0RCxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVPLFFBQVEsQ0FBQyxJQUFZO1FBQzNCLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7SUFDSCxDQUFDO2dIQTVIVSxlQUFlO29FQUFmLGVBQWU7O1lDbkQ1QixrRkFBOEM7OztZQUEvQiwwREFBd0I7OztpRkRtRDFCLGVBQWU7Y0FQM0IsU0FBUzsyQkFDRSxVQUFVLGlCQUdMLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU07dUZBV3RDLE1BQU07a0JBQWQsS0FBSztZQU1HLHFCQUFxQjtrQkFBN0IsS0FBSztZQUdHLFVBQVU7a0JBQWxCLEtBQUs7O2tGQWxCSyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBamZGaWVsZEluc3RhbmNlLFxuICBBamZGaWVsZFR5cGUsXG4gIEFqZkZvcm1SZW5kZXJlciBhcyBDb3JlRm9ybVJlbmRlcmVyLFxuICBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlLFxuICBBamZTbGlkZUluc3RhbmNlLFxuICBpc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2UsXG59IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0Jvb2xlYW5JbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0NoZWNrZWQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0VNUFRZLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtzd2l0Y2hNYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWZvcm0nLFxuICB0ZW1wbGF0ZVVybDogJ2Zvcm0uaHRtbCcsXG4gIHN0eWxlVXJsczogWydmb3JtLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZvcm1SZW5kZXJlclxuICBleHRlbmRzIENvcmVGb3JtUmVuZGVyZXJcbiAgaW1wbGVtZW50cyBBZnRlclZpZXdDaGVja2VkLCBPbkRlc3Ryb3lcbntcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFRoZSBzbGlkZSBzdHJpcCBoYXMgYmVlbiByZXBsYWNlZCBieSB0aGUganVtcCBtZW51IGluIHRoZSBzbGlkZVxuICAgKiBoZWFkZXIsIHdoaWNoIGlzIGFsd2F5cyBhdmFpbGFibGUuIEtlcHQgc28gdGhhdCBleGlzdGluZyB0ZW1wbGF0ZXMgc3RpbGxcbiAgICogY29tcGlsZS5cbiAgICovXG4gIEBJbnB1dCgpIHRvcEJhcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBGaWVsZCByb3dzIGFsaWduIHRoZWlyIGxhYmVscyBhbmQgY29udHJvbHMgb24gYSBzaGFyZWQgZ3JpZCwgc29cbiAgICogdGhlcmUgaXMgbm90aGluZyBsZWZ0IHRvIGNlbnRyZS5cbiAgICovXG4gIEBJbnB1dCgpIGNlbnRlcmVkRmllbGRzQ29udGVudDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBIb3cgbWFueSBmaWVsZCByb3dzIHNpdCBzaWRlIGJ5IHNpZGUuICovXG4gIEBJbnB1dCgpIG1heENvbHVtbnM6IDEgfCAyIHwgMyA9IDE7XG5cbiAgLyoqXG4gICAqIFRoZSBwYWdlIHRoZSBzbGlkZXIgaXMgc2hvd2luZy4gVGhlIHNsaWRlIGhlYWRlciBpcyByZW5kZXJlZCBvbmNlLCBhYm92ZSB0aGVcbiAgICogc2xpZGVyLCBzbyBpdCBuZWVkcyB0byBrbm93IHdoaWNoIHNsaWRlIGlzIG9uIHNjcmVlbjsgdGhlIHBhZ2Ugc2xpZGVyIG9ubHlcbiAgICogcmVwb3J0cyB0aGF0IGltcGVyYXRpdmVseSwgaGVuY2UgdGhlIG1pcnJvcmVkIHByb3BlcnR5LlxuICAgKi9cbiAgY3VycmVudFBhZ2UgPSAwO1xuXG4gIHByaXZhdGUgX3NsaWRlTGlzdDogQWpmU2xpZGVJbnN0YW5jZVtdID0gW107XG4gIHByaXZhdGUgX3ZhbGlkaXR5U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3NsaWRlc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF92YWx1ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9wYWdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3BhZ2VJbml0ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocmVuZGVyZXJTZXJ2aWNlOiBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLCBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBzdXBlcihyZW5kZXJlclNlcnZpY2UsIGNoYW5nZURldGVjdG9yUmVmKTtcbiAgICB0aGlzLl9zbGlkZXNTdWJzY3JpcHRpb24gPSB0aGlzLnNsaWRlcy5zdWJzY3JpYmUoc2xpZGVzID0+IHtcbiAgICAgIHRoaXMuX3NsaWRlTGlzdCA9IHNsaWRlcyB8fCBbXTtcbiAgICB9KTtcbiAgICAvLyBUaGlzIGNvbXBvbmVudCBpcyBPblB1c2gsIGFuZCBjaGlsZHJlbiBhcmUgb25seSB2aXNpdGVkIHdoZW4gaXQgaXNcbiAgICAvLyBjaGVja2VkLiBUaGUgc2xpZGUgaGVhZGVyIHJlcG9ydHMgbGl2ZSBzdGF0ZSAtLSBob3cgbWFueSBmaWVsZHMgYXJlXG4gICAgLy8gZmlsbGVkLCBob3cgbWFueSBhcmUgZmFpbGluZyAtLSBzbyBhIHZhbHVlIGNoYW5nZSBhbnl3aGVyZSBpbiB0aGUgZm9ybSBoYXNcbiAgICAvLyB0byBicmluZyB0aGUgcmVuZGVyZXIgYmFjayBpbnRvIHRoZSBjaGVjay5cbiAgICB0aGlzLl92YWx1ZVN1YnNjcmlwdGlvbiA9IHRoaXMuZm9ybUdyb3VwXG4gICAgICAucGlwZShzd2l0Y2hNYXAoZmcgPT4gKGZnID8gZmcudmFsdWVDaGFuZ2VzIDogRU1QVFkpKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCkpO1xuICAgIC8vIFZhbGlkaXR5IG1vdmVzIHdpdGhvdXQgYSB2YWx1ZSBtb3Zpbmcgd2l0aCBpdCAtLSBhIHZpc2liaWxpdHkgY2hhbmdlIG9yIGFcbiAgICAvLyByZWNhbGN1bGF0ZWQgZm9ybXVsYSBpcyBlbm91Z2ggLS0gYW5kIHRoZSBpc3N1ZSBjb3VudHMgYXJlIHJlYWQgdGhyb3VnaFxuICAgIC8vIGltcHVyZSBwaXBlcywgc28gdGhpcyBicmluZ3MgdGhlIHJlbmRlcmVyIGJhY2sgaW50byB0aGUgY2hlY2sgdG9vLlxuICAgIHRoaXMuX3ZhbGlkaXR5U3Vic2NyaXB0aW9uID0gdGhpcy5lcnJvcnMuc3Vic2NyaWJlKCgpID0+XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKSxcbiAgICApO1xuICB9XG5cbiAgb3ZlcnJpZGUgbmdBZnRlclZpZXdDaGVja2VkKCk6IHZvaWQge1xuICAgIHN1cGVyLm5nQWZ0ZXJWaWV3Q2hlY2tlZCgpO1xuICAgIGlmICghdGhpcy5fcGFnZUluaXQgJiYgdGhpcy5mb3JtU2xpZGVyICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3BhZ2VJbml0ID0gdHJ1ZTtcbiAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSB0aGlzLmZvcm1TbGlkZXIuY3VycmVudFBhZ2U7XG4gICAgICB0aGlzLl9wYWdlU3Vic2NyaXB0aW9uID0gdGhpcy5mb3JtU2xpZGVyLnBhZ2VTY3JvbGxGaW5pc2guc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMuZm9ybVNsaWRlci5jdXJyZW50UGFnZTtcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvdmVycmlkZSBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zbGlkZXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl92YWx1ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3ZhbGlkaXR5U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fcGFnZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gIH1cblxuICBmaWVsZFN0eWxlKGZpZWxkOiBBamZGaWVsZEluc3RhbmNlKTogYW55IHtcbiAgICBpZiAoZmllbGQubm9kZS5maWVsZFR5cGUgPT09IEFqZkZpZWxkVHlwZS5Gb3JtdWxhICYmIGZpZWxkLm5vZGUubGFiZWwgPT09ICcnKSB7XG4gICAgICByZXR1cm4ge2Rpc3BsYXk6ICdub25lJ307XG4gICAgfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBQYWdlIHRvIHRoZSBmaXJzdCBwYWdlIG9mIGEgc2xpZGUsIGZyb20gdGhlIGhlYWRlcidzIGp1bXAgbWVudS4gKi9cbiAgZ29Ub1NsaWRlKHNsaWRlOiBBamZTbGlkZUluc3RhbmNlKTogdm9pZCB7XG4gICAgdGhpcy5fc2xpZGVUbyh0aGlzLl9wYWdlT2Yoc2xpZGUpKTtcbiAgfVxuXG4gIC8qKiBQYWdlIHRvIG9uZSByZXBldGl0aW9uIG9mIHRoZSByZXBlYXRpbmcgc2xpZGUgY3VycmVudGx5IG9uIHNjcmVlbi4gKi9cbiAgZ29Ub1JlcChzbGlkZTogQWpmU2xpZGVJbnN0YW5jZSwgcmVwSW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX3NsaWRlVG8odGhpcy5fcGFnZU9mKHNsaWRlKSArIHJlcEluZGV4KTtcbiAgfVxuXG4gIGdvVG9QcmV2U2xpZGUoKTogdm9pZCB7XG4gICAgdGhpcy5mb3JtU2xpZGVyPy5zbGlkZSh7ZGlyOiAndXAnfSk7XG4gIH1cblxuICBnb1RvTmV4dFNsaWRlKCk6IHZvaWQge1xuICAgIHRoaXMuZm9ybVNsaWRlcj8uc2xpZGUoe2RpcjogJ2Rvd24nfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHNsaWRlciBwYWdlIGEgc2xpZGUgc3RhcnRzIG9uLiBgQWpmU2xpZGVJbnN0YW5jZS5wb3NpdGlvbmAgY2Fubm90IGJlXG4gICAqIHVzZWQgZGlyZWN0bHkgaGVyZTogaXQgZG9lcyBub3QgYWNjb3VudCBmb3IgYSBzdGFydCBtZXNzYWdlIHBhZ2UsIGFuZCB0aGlzXG4gICAqIGhhcyB0byBhZ3JlZSB3aXRoIHRoZSBwYWdlIGFyaXRobWV0aWMgdXNlZCBieSBgYWpmQ3VycmVudFNsaWRlYC5cbiAgICovXG4gIHByaXZhdGUgX3BhZ2VPZihzbGlkZTogQWpmU2xpZGVJbnN0YW5jZSk6IG51bWJlciB7XG4gICAgbGV0IHBhZ2UgPSB0aGlzLmhhc1N0YXJ0TWVzc2FnZSA/IDEgOiAwO1xuICAgIGZvciAoY29uc3QgY3VyIG9mIHRoaXMuX3NsaWRlTGlzdCkge1xuICAgICAgaWYgKGN1ci52aXNpYmxlID09PSBmYWxzZSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXIgPT09IHNsaWRlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgcGFnZSArPSBpc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2UoY3VyKVxuICAgICAgICA/IE1hdGgubWF4KDEsIChjdXIgYXMgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSkucmVwcylcbiAgICAgICAgOiAxO1xuICAgIH1cbiAgICByZXR1cm4gcGFnZTtcbiAgfVxuXG4gIHByaXZhdGUgX3NsaWRlVG8ocGFnZTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZm9ybVNsaWRlciAhPSBudWxsKSB7XG4gICAgICB0aGlzLmZvcm1TbGlkZXIuc2xpZGUoe3RvOiBwYWdlfSk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2ZpeGVkT3JpZW50YXRpb246IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2hhc0VuZE1lc3NhZ2U6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2hhc1N0YXJ0TWVzc2FnZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfaGlkZUJvdHRvbVRvb2xiYXI6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2hpZGVOYXZpZ2F0aW9uQnV0dG9uczogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfaGlkZVRvcFRvb2xiYXI6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3JlYWRvbmx5OiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zYXZlRGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJmb3JtR3JvdXAgfCBhc3luYyBhcyBmZ1wiPlxuICA8Zm9ybSBbY2xhc3MuYWpmLWZvcm0tcmVhZG9ubHldPVwicmVhZG9ubHlcIiBub3ZhbGlkYXRlIFtmb3JtR3JvdXBdPVwiZmchXCI+XG4gICAgPGRpdiBjbGFzcz1cImFqZi1mb3JtLWNvbnRhaW5lclwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNsaWRlcyB8IGFzeW5jIGFzIGN1clNsaWRlc1wiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY3VyU2xpZGVzIHwgYWpmQ3VycmVudFNsaWRlIDogY3VycmVudFBhZ2UgOiBoYXNTdGFydE1lc3NhZ2UgOiBoYXNFbmRNZXNzYWdlIGFzIGN1clwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhamYtZm9ybS1iYXJcIiAqbmdJZj1cIiFoaWRlVG9wVG9vbGJhclwiPlxuICAgICAgICAgICAgPGFqZi1zbGlkZS1oZWFkZXJcbiAgICAgICAgICAgICAgW3NsaWRlXT1cImN1ci5zbGlkZVwiXG4gICAgICAgICAgICAgIFtzbGlkZXNdPVwiY3VyU2xpZGVzXCJcbiAgICAgICAgICAgICAgW2Rpc3BsYXlOdW1iZXJdPVwiY3VyLmRpc3BsYXlOdW1iZXJcIlxuICAgICAgICAgICAgICBbcmVwSW5kZXhdPVwiY3VyLnJlcEluZGV4XCJcbiAgICAgICAgICAgICAgW3JlcHNdPVwiY3VyLnJlcHNcIlxuICAgICAgICAgICAgICBbdG90YWxdPVwiY3VyLnRvdGFsXCJcbiAgICAgICAgICAgICAgW3BhZ2VzXT1cImN1ci5wYWdlc1wiXG4gICAgICAgICAgICAgIFtncm91cF09XCJmZ1wiXG4gICAgICAgICAgICAgIFtpc3N1ZXNdPVwiY3VyU2xpZGVzIHwgYWpmRm9ybUlzc3Vlc1wiXG4gICAgICAgICAgICAgIChqdW1wVG8pPVwiZ29Ub1NsaWRlKCRldmVudClcIlxuICAgICAgICAgICAgICAocHJldik9XCJnb1RvUHJldlNsaWRlKClcIlxuICAgICAgICAgICAgICAobmV4dCk9XCJnb1RvTmV4dFNsaWRlKClcIlxuICAgICAgICAgICAgICAoZ290b0lzc3VlKT1cImdvVG9OZXh0RXJyb3IoKVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDwhLS0gdGhpcyBjb250ZW50IHByb2plY3Rpb24gYWxsb3dzIHRvIGFkZCBidXR0b25zIG9uIHRoZSBzbGlkZSBoZWFkZXIgLS0+XG4gICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlthamZGb3JtVG9wVG9vbGJhckJ1dHRvbnNdXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICA8IS0tIGFwcGx5IGEgZGVmYXVsdCBzYXZlIGJ1dHRvbiBvbmx5IHdoZW4gYWpmRm9ybVNhdmVCdXR0b24gaXMgZW1wdHkgLS0+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYWpmLWZvcm0tc2F2ZVwiICpuZ0lmPVwiIXNhdmVEaXNhYmxlZFwiIChjbGljayk9XCJvblNhdmUoJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuICNzYXZlQnV0dG9uPjxuZy1jb250ZW50IHNlbGVjdD1cIlthamZGb3JtU2F2ZUJ1dHRvbl1cIj48L25nLWNvbnRlbnQ+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICpuZ0lmPVwic2F2ZUJ1dHRvbiAmJiBzYXZlQnV0dG9uLmNoaWxkTm9kZXMgJiYgc2F2ZUJ1dHRvbi5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMFwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYWpmLWJ0bi0tcHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge3sgJ1NhdmUnIHwgdHJhbnNsb2NvIH19XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvYWpmLXNsaWRlLWhlYWRlcj5cblxuICAgICAgICAgICAgPGFqZi1yZXAtc3RyaXBcbiAgICAgICAgICAgICAgKm5nSWY9XCJjdXIuc2xpZGUgJiYgY3VyLnJlcHMgPiAwXCJcbiAgICAgICAgICAgICAgW3NsaWRlXT1cImN1ci5zbGlkZSEgfCBhamZBc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2VcIlxuICAgICAgICAgICAgICBbY3VycmVudF09XCJjdXIucmVwSW5kZXhcIlxuICAgICAgICAgICAgICBbcmVhZG9ubHldPVwicmVhZG9ubHlcIlxuICAgICAgICAgICAgICAoZ29Ubyk9XCJnb1RvUmVwKGN1ci5zbGlkZSEsICRldmVudClcIlxuICAgICAgICAgICAgICAoYWRkKT1cImFkZEdyb3VwKGN1ci5zbGlkZSEpXCJcbiAgICAgICAgICAgICAgKHJlbW92ZSk9XCJyZW1vdmVHcm91cChjdXIuc2xpZGUhLCBjdXIucmVwSW5kZXgpXCJcbiAgICAgICAgICAgID48L2FqZi1yZXAtc3RyaXA+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhamYtc2xpZGVyLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxhamYtcGFnZS1zbGlkZXJcbiAgICAgICAgICAgIChvcmllbnRhdGlvbkNoYW5nZSk9XCJvcmllbnRhdGlvbkNoYW5nZUhhbmRsZXIoJGV2ZW50KVwiXG4gICAgICAgICAgICBbZml4ZWRPcmllbnRhdGlvbl09XCJmaXhlZE9yaWVudGF0aW9uXCJcbiAgICAgICAgICAgIFtoaWRlTmF2aWdhdGlvbkJ1dHRvbnNdPVwiaGlkZU5hdmlnYXRpb25CdXR0b25zXCJcbiAgICAgICAgICAgIFtvcmllbnRhdGlvbl09XCJvcmllbnRhdGlvblwiXG4gICAgICAgICAgICAjZm9ybVNsaWRlclxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxhamYtcGFnZS1zbGlkZXItaXRlbSAqbmdJZj1cImN1clNsaWRlcyEubGVuZ3RoID4gMCAmJiBoYXNTdGFydE1lc3NhZ2VcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1mb3JtLXBhZ2UgYWpmLWZvcm0tbWVzc2FnZVwiPlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cImFqZi1tZXNzYWdlLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbYWpmRm9ybVN0YXJ0TWVzc2FnZVRpdGxlXVwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhamYtbWVzc2FnZS1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbYWpmRm9ybVN0YXJ0TWVzc2FnZV1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9hamYtcGFnZS1zbGlkZXItaXRlbT5cblxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgc2xpZGVJbnN0YW5jZSBvZiBjdXJTbGlkZXM7IHRyYWNrQnk6IHRyYWNrTm9kZUJ5SWRcIj5cbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNsaWRlSW5zdGFuY2UudmlzaWJsZVwiPlxuICAgICAgICAgICAgICAgIDwhLS0gbm9uIHJlcGVhdGluZyBzbGlkZXMgLS0+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiEoc2xpZGVJbnN0YW5jZSB8IGFqZklzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSlcIj5cbiAgICAgICAgICAgICAgICAgIDxhamYtcGFnZS1zbGlkZXItaXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1mb3JtLXBhZ2VcIiBbbmdDbGFzc109XCInYWpmLW1heC1jb2x1bW5zLScgKyBtYXhDb2x1bW5zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGFqZi1maWVsZC1yb3dcbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBmaWVsZEluc3RhbmNlIG9mIHNsaWRlSW5zdGFuY2UuZmxhdE5vZGVzOyB0cmFja0J5OiB0cmFja05vZGVCeUlkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtpbnN0YW5jZV09XCJmaWVsZEluc3RhbmNlIHwgYWpmQXNGaWVsZEluc3RhbmNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtyZWFkb25seV09XCJyZWFkb25seSB8fCAhc2xpZGVJbnN0YW5jZS5lZGl0YWJsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgPjwvYWpmLWZpZWxkLXJvdz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2FqZi1wYWdlLXNsaWRlci1pdGVtPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgICAgICAgICAgPCEtLSByZXBlYXRpbmcgc2xpZGVzOiBvbmUgcGFnZSBwZXIgcmVwZXRpdGlvbiAtLT5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic2xpZGVJbnN0YW5jZSB8IGFqZklzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZVwiPlxuICAgICAgICAgICAgICAgICAgPGFqZi1wYWdlLXNsaWRlci1pdGVtXG4gICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cIlxuICAgICAgICAgICAgICAgICAgICAgIGxldCBjdXJSZXAgb2YgKHNsaWRlSW5zdGFuY2UgfCBhamZBc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2UpLnJlcHMgfCBhamZSYW5nZTtcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgaWR4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgbGV0IGxhc3RTbGlkZSA9IGxhc3RcbiAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgW2lzUmVwZWF0aW5nXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICBbaXNSZXBlYXRpbmdMYXN0XT1cImxhc3RTbGlkZVwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhamYtZm9ybS1wYWdlXCIgW25nQ2xhc3NdPVwiJ2FqZi1tYXgtY29sdW1ucy0nICsgbWF4Q29sdW1uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxhamYtZmllbGQtcm93XG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkSW5zdGFuY2Ugb2Ygc2xpZGVJbnN0YW5jZS5zbGlkZU5vZGVzW2lkeF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNrQnk6IHRyYWNrTm9kZUJ5SWRcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbaW5zdGFuY2VdPVwiZmllbGRJbnN0YW5jZSB8IGFqZkFzRmllbGRJbnN0YW5jZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbcmVhZG9ubHldPVwicmVhZG9ubHkgfHwgIXNsaWRlSW5zdGFuY2UuZWRpdGFibGVcIlxuICAgICAgICAgICAgICAgICAgICAgID48L2FqZi1maWVsZC1yb3c+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9hamYtcGFnZS1zbGlkZXItaXRlbT5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgICAgPGFqZi1wYWdlLXNsaWRlci1pdGVtICpuZ0lmPVwiY3VyU2xpZGVzICYmIGN1clNsaWRlcyEubGVuZ3RoID4gMCAmJiBoYXNFbmRNZXNzYWdlXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhamYtZm9ybS1wYWdlIGFqZi1mb3JtLW1lc3NhZ2VcIj5cbiAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJhamYtbWVzc2FnZS10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW2FqZkZvcm1FbmRNZXNzYWdlVGl0bGVdXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1tZXNzYWdlLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlthamZGb3JtRW5kTWVzc2FnZV1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9hamYtcGFnZS1zbGlkZXItaXRlbT5cblxuICAgICAgICAgICAgPGRpdiBhamZQYWdlU2xpZGVyQmFyICpuZ0lmPVwiIWhpZGVCb3R0b21Ub29sYmFyXCIgY2xhc3M9XCJhamYtZm9ybS1mb290ZXJcIj5cbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImN1clNsaWRlcyB8IGFqZkZvcm1Jc3N1ZXMgYXMgaXNzdWVzXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhamYtZm9ybS1mb290ZXItc3RhdHVzXCIgKm5nSWY9XCJpc3N1ZXMuZmllbGRzID4gMFwiPlxuICAgICAgICAgICAgICAgICAgPG1hdC1pY29uPmVycm9yPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgIHt7XG4gICAgICAgICAgICAgICAgICAgICd7e2ZpZWxkc319IGZpZWxkcyBpbiB7e3NsaWRlc319IHNsaWRlcyBuZWVkIGF0dGVudGlvbidcbiAgICAgICAgICAgICAgICAgICAgICB8IHRyYW5zbG9jbyA6IHtmaWVsZHM6IGlzc3Vlcy5maWVsZHMsIHNsaWRlczogaXNzdWVzLnNsaWRlc31cbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImFqZi1idG4tLWdob3N0XCIgKGNsaWNrKT1cImdvVG9QcmV2RXJyb3IoKVwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24+YXJyb3dfdXB3YXJkPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJhamYtYnRuLS1naG9zdFwiIChjbGljayk9XCJnb1RvTmV4dEVycm9yKClcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uPmFycm93X2Rvd253YXJkPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2FqZi1wYWdlLXNsaWRlcj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuICA8L2Zvcm0+XG48L25nLWNvbnRhaW5lcj5cbiJdfQ==