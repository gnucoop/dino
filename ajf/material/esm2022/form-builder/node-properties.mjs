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
import { isField, isFieldWithChoices, isNumberField, isEmptyField, isRangeField, isRepeatingContainerNode, isTableField, } from '@ajf/core/forms';
import { alwaysCondition, neverCondition } from '@ajf/core/models';
import { ChangeDetectionStrategy, Component, EventEmitter, ViewEncapsulation, } from '@angular/core';
import { Validators, } from '@angular/forms';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, pairwise, shareReplay, startWith, switchMap, take, withLatestFrom, } from 'rxjs/operators';
import { AjfFbConditionEditorDialog } from './condition-editor-dialog';
import { cleanDefaultValue, } from './form-builder-service';
import { AjfFbValidationConditionEditorDialog } from './validation-condition-editor-dialog';
import { AjfFbWarningConditionEditorDialog } from './warning-condition-editor-dialog';
import * as i0 from "@angular/core";
import * as i1 from "./form-builder-service";
import * as i2 from "@angular/material/dialog";
import * as i3 from "@angular/forms";
import * as i4 from "./node-properties-name-validator";
import * as i5 from "@angular/common";
import * as i6 from "@angular/material/core";
import * as i7 from "@angular/material/button";
import * as i8 from "@angular/material/checkbox";
import * as i9 from "@angular/material/form-field";
import * as i10 from "@angular/material/icon";
import * as i11 from "@angular/material/input";
import * as i12 from "@angular/material/select";
import * as i13 from "@angular/material/slider";
import * as i14 from "@angular/material/tooltip";
import * as i15 from "@ngneat/transloco";
function AjfFbNodeProperties_ng_container_2_ng_container_1_mat_error_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-error");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const pf_r3 = i0.ɵɵnextContext().ngIf;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.allErrorMessages(pf_r3), " ");
} }
function AjfFbNodeProperties_ng_container_2_ng_container_1_mat_error_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-error");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const pf_r3 = i0.ɵɵnextContext().ngIf;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.fieldErrorMessage(pf_r3.get("name"), "Name"), " ");
} }
function AjfFbNodeProperties_ng_container_2_ng_container_1_mat_error_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-error");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const pf_r3 = i0.ɵɵnextContext().ngIf;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.fieldErrorMessage(pf_r3.get("label"), "Label"), " ");
} }
function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8)(1, "mat-form-field");
    i0.ɵɵelement(2, "input", 21);
    i0.ɵɵpipe(3, "transloco");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(3, 1, "HTML"));
} }
function AjfFbNodeProperties_ng_container_2_ng_container_1_div_55_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "button", 22);
    i0.ɵɵlistener("click", function AjfFbNodeProperties_ng_container_2_ng_container_1_div_55_Template_button_click_1_listener() { const idx_r5 = i0.ɵɵrestoreView(_r4).index; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.editConditionalBranch(idx_r5)); });
    i0.ɵɵelementStart(2, "div", 17)(3, "mat-icon");
    i0.ɵɵtext(4, "edit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span")(6, "code");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const branch_r6 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("matTooltip", branch_r6);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(branch_r6);
} }
function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_56_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8)(1, "div")(2, "label");
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div")(6, "mat-slider", 18);
    i0.ɵɵelement(7, "input", 23);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 1, "Max repetitions"));
} }
function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_mat_option_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 34);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const fieldSize_r8 = ctx.$implicit;
    i0.ɵɵproperty("value", fieldSize_r8.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 2, fieldSize_r8.label), " ");
} }
function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8)(1, "mat-form-field");
    i0.ɵɵelement(2, "input", 35);
    i0.ɵɵpipe(3, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 8)(5, "mat-form-field");
    i0.ɵɵelement(6, "input", 36);
    i0.ɵɵpipe(7, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 8)(9, "mat-form-field");
    i0.ɵɵelement(10, "input", 37);
    i0.ɵɵpipe(11, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 8)(13, "mat-form-field");
    i0.ɵɵelement(14, "input", 38);
    i0.ɵɵpipe(15, "transloco");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(3, 4, "Min value"));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(7, 6, "Max value"));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(11, 8, "Min digits"));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(15, 10, "Max digits"));
} }
function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8)(1, "mat-form-field");
    i0.ɵɵelement(2, "input", 39);
    i0.ɵɵpipe(3, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 8)(5, "mat-form-field");
    i0.ɵɵelement(6, "input", 40);
    i0.ɵɵpipe(7, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 8)(9, "mat-form-field");
    i0.ɵɵelement(10, "input", 41);
    i0.ɵɵpipe(11, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 8)(13, "mat-form-field")(14, "mat-select", 42);
    i0.ɵɵpipe(15, "transloco");
    i0.ɵɵelementStart(16, "mat-option", 34);
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "transloco");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "mat-option", 43);
    i0.ɵɵtext(20);
    i0.ɵɵpipe(21, "transloco");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(3, 7, "Start"));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(7, 9, "End"));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(11, 11, "Step"));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(15, 13, "Appearance"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 15, "Default"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(21, 17, "Rating"));
} }
function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_div_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "No conditions"), " ");
} }
function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_div_51_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 45)(1, "button", 22);
    i0.ɵɵlistener("click", function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_div_51_Template_button_click_1_listener() { const idx_r10 = i0.ɵɵrestoreView(_r9).index; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.editValidationCondition(idx_r10)); });
    i0.ɵɵelementStart(2, "div", 17)(3, "mat-icon");
    i0.ɵɵtext(4, "edit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span")(6, "code");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(8, "mat-icon", 31);
    i0.ɵɵlistener("click", function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_div_51_Template_mat_icon_click_8_listener() { const idx_r10 = i0.ɵɵrestoreView(_r9).index; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.removeValidationCondition(idx_r10)); });
    i0.ɵɵtext(9, "remove_circle_outline");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const validationCondition_r11 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("matTooltip", validationCondition_r11.condition);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(validationCondition_r11.condition);
} }
function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_65_mat_option_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 34);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const choicesOrigin_r13 = ctx.$implicit;
    i0.ɵɵproperty("value", choicesOrigin_r13.name);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 2, choicesOrigin_r13.label || choicesOrigin_r13.name), " ");
} }
function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_65_mat_error_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-error");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const pf_r3 = i0.ɵɵnextContext(3).ngIf;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.fieldErrorMessage(pf_r3.get("choicesOriginRef"), "choicesOriginRef"), " ");
} }
function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_65_div_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "No trigger condition"), " ");
} }
function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_65_div_40_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 45)(1, "button", 22);
    i0.ɵɵlistener("click", function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_65_div_40_Template_button_click_1_listener() { const idx_r17 = i0.ɵɵrestoreView(_r16).index; const ctx_r1 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r1.editTriggerCondition(idx_r17)); });
    i0.ɵɵelementStart(2, "div", 17)(3, "mat-icon");
    i0.ɵɵtext(4, "edit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span")(6, "code");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(8, "mat-icon", 49);
    i0.ɵɵlistener("click", function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_65_div_40_Template_mat_icon_click_8_listener() { const idx_r17 = i0.ɵɵrestoreView(_r16).index; const ctx_r1 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r1.removeTriggerCondition(idx_r17)); });
    i0.ɵɵtext(9, "remove_circle_outline");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const triggerCondition_r18 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("matTooltip", triggerCondition_r18);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(triggerCondition_r18);
} }
function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_65_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8)(1, "mat-form-field")(2, "mat-label");
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "transloco");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "mat-select", 46);
    i0.ɵɵpipe(6, "transloco");
    i0.ɵɵtemplate(7, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_65_mat_option_7_Template, 3, 4, "mat-option", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_65_mat_error_8_Template, 2, 1, "mat-error", 3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 8)(10, "div")(11, "label");
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div")(15, "button", 22);
    i0.ɵɵlistener("click", function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_65_Template_button_click_15_listener() { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.editChoicesFilter()); });
    i0.ɵɵelementStart(16, "div", 17)(17, "mat-icon");
    i0.ɵɵtext(18, "edit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span")(20, "code");
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵelementStart(22, "div", 8)(23, "mat-checkbox", 47, 0);
    i0.ɵɵlistener("change", function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_65_Template_mat_checkbox_change_23_listener($event) { i0.ɵɵrestoreView(_r12); const forceNarrow_r14 = i0.ɵɵreference(29); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.forceCheckbox($event.checked, forceNarrow_r14)); });
    i0.ɵɵtext(25);
    i0.ɵɵpipe(26, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "div", 8)(28, "mat-checkbox", 48, 1);
    i0.ɵɵlistener("change", function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_65_Template_mat_checkbox_change_28_listener($event) { i0.ɵɵrestoreView(_r12); const forceExpanded_r15 = i0.ɵɵreference(24); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.forceCheckbox($event.checked, forceExpanded_r15)); });
    i0.ɵɵtext(30);
    i0.ɵɵpipe(31, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "div", 8)(33, "div", 4)(34, "label");
    i0.ɵɵtext(35);
    i0.ɵɵpipe(36, "transloco");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "mat-icon", 31);
    i0.ɵɵlistener("click", function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_65_Template_mat_icon_click_37_listener() { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.addTriggerCondition()); });
    i0.ɵɵtext(38, "add_circle_outline");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(39, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_65_div_39_Template, 3, 3, "div", 32)(40, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_65_div_40_Template, 10, 2, "div", 33);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_11_0;
    const pf_r3 = i0.ɵɵnextContext(2).ngIf;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 12, "Choices origins"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(6, 14, "Choices"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.choicesOrigins);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", (tmp_11_0 = pf_r3.get("choicesOriginRef")) == null ? null : tmp_11_0.invalid);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(13, 16, "Choices filter"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("matTooltip", ctx_r1.curChoicesFilter || "");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r1.curChoicesFilter);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(26, 18, "Force expanded selection"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(31, 20, "Force narrow selection"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(36, 22, "Trigger selection"));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", !ctx_r1.triggerConditions || ctx_r1.triggerConditions.length === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.triggerConditions);
} }
function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_container_66_mat_error_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-error");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const pf_r3 = i0.ɵɵnextContext(3).ngIf;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.fieldErrorMessage(pf_r3.get("tableDef"), "tableDef"), " ");
} }
function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_container_66_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 8)(2, "mat-checkbox", 50);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "transloco");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "mat-form-field");
    i0.ɵɵelement(6, "textarea", 51);
    i0.ɵɵpipe(7, "transloco");
    i0.ɵɵtemplate(8, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_container_66_mat_error_8_Template, 2, 1, "mat-error", 3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    let tmp_8_0;
    const pf_r3 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 3, "Hide empty rows"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(7, 5, "Table definition"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", (tmp_8_0 = pf_r3.get("tableDef")) == null ? null : tmp_8_0.invalid);
} }
function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8)(1, "mat-checkbox", 24);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 8)(5, "mat-form-field")(6, "mat-label");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "transloco");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "mat-select", 25);
    i0.ɵɵpipe(10, "transloco");
    i0.ɵɵtemplate(11, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_mat_option_11_Template, 3, 4, "mat-option", 26);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "div", 8)(13, "mat-form-field");
    i0.ɵɵelement(14, "input", 27);
    i0.ɵɵpipe(15, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 8)(17, "mat-form-field");
    i0.ɵɵelement(18, "textarea", 28);
    i0.ɵɵpipe(19, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 8)(21, "mat-form-field");
    i0.ɵɵelement(22, "input", 29);
    i0.ɵɵpipe(23, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "div", 8)(25, "div")(26, "label");
    i0.ɵɵtext(27);
    i0.ɵɵpipe(28, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "div")(30, "button", 22);
    i0.ɵɵlistener("click", function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_Template_button_click_30_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.editFormula()); });
    i0.ɵɵelementStart(31, "div", 17)(32, "mat-icon");
    i0.ɵɵtext(33, "edit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "span")(35, "code");
    i0.ɵɵtext(36);
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵelementStart(37, "div", 8)(38, "mat-checkbox", 30);
    i0.ɵɵtext(39);
    i0.ɵɵpipe(40, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(41, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_41_Template, 16, 12, "ng-template", 11)(42, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_42_Template, 22, 19, "ng-template", 11);
    i0.ɵɵelementStart(43, "div", 8)(44, "div", 4)(45, "label");
    i0.ɵɵtext(46);
    i0.ɵɵpipe(47, "transloco");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "mat-icon", 31);
    i0.ɵɵlistener("click", function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_Template_mat_icon_click_48_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.addValidationCondition()); });
    i0.ɵɵtext(49, "add_circle_outline");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(50, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_div_50_Template, 3, 3, "div", 32)(51, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_div_51_Template, 10, 2, "div", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(52, "div", 8)(53, "div")(54, "label");
    i0.ɵɵtext(55);
    i0.ɵɵpipe(56, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(57, "div")(58, "button", 22);
    i0.ɵɵlistener("click", function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_Template_button_click_58_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.editNextSlideCondition()); });
    i0.ɵɵelementStart(59, "div", 17)(60, "mat-icon");
    i0.ɵɵtext(61, "edit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(62, "span")(63, "code");
    i0.ɵɵtext(64);
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵtemplate(65, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_65_Template, 41, 24, "ng-template", 11)(66, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_container_66_Template, 9, 7, "ng-container", 3);
} if (rf & 2) {
    const ne_r19 = i0.ɵɵnextContext(2).ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 21, "Readonly"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 23, "Field size"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(10, 25, "Size"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.fieldSizes);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(15, 27, "Hint"));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(19, 29, "Description"));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(23, 31, "Default value"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(28, 33, "Formula"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("matTooltip", ctx_r1.curFormula || "");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r1.curFormula);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(40, 35, "Not empty"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.isNumericField(ne_r19.node));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isRangeField(ne_r19.node));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(47, 37, "Validation"));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r1.validationConditions.length === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.validationConditions);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(56, 39, "Go to next slide condition"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("matTooltip", ctx_r1.nextSlideCondition || "");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r1.nextSlideCondition);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isFieldWithChoices(ne_r19.node));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isTableField(ne_r19.node));
} }
function AjfFbNodeProperties_ng_container_2_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 4)(2, "h3");
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "transloco");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 5);
    i0.ɵɵlistener("click", function AjfFbNodeProperties_ng_container_2_ng_container_1_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.save()); });
    i0.ɵɵelementStart(6, "mat-icon");
    i0.ɵɵtext(7, "save");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 6);
    i0.ɵɵlistener("click", function AjfFbNodeProperties_ng_container_2_ng_container_1_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.cancel()); });
    i0.ɵɵelementStart(9, "mat-icon");
    i0.ɵɵtext(10, "cancel");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(11, AjfFbNodeProperties_ng_container_2_ng_container_1_mat_error_11_Template, 2, 1, "mat-error", 3);
    i0.ɵɵelementStart(12, "form", 7)(13, "div", 8)(14, "mat-form-field");
    i0.ɵɵelement(15, "input", 9);
    i0.ɵɵpipe(16, "transloco");
    i0.ɵɵtemplate(17, AjfFbNodeProperties_ng_container_2_ng_container_1_mat_error_17_Template, 2, 1, "mat-error", 3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 8)(19, "mat-form-field");
    i0.ɵɵelement(20, "input", 10);
    i0.ɵɵpipe(21, "transloco");
    i0.ɵɵtemplate(22, AjfFbNodeProperties_ng_container_2_ng_container_1_mat_error_22_Template, 2, 1, "mat-error", 3);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(23, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_23_Template, 4, 3, "ng-template", 11);
    i0.ɵɵelementStart(24, "div", 8)(25, "mat-form-field")(26, "mat-label");
    i0.ɵɵtext(27);
    i0.ɵɵpipe(28, "transloco");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "mat-select", 12);
    i0.ɵɵpipe(30, "transloco");
    i0.ɵɵelementStart(31, "mat-option", 13);
    i0.ɵɵtext(32);
    i0.ɵɵpipe(33, "transloco");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "mat-option", 14);
    i0.ɵɵtext(35);
    i0.ɵɵpipe(36, "transloco");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "mat-option", 15);
    i0.ɵɵtext(38);
    i0.ɵɵpipe(39, "transloco");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(40, "button", 16);
    i0.ɵɵlistener("click", function AjfFbNodeProperties_ng_container_2_ng_container_1_Template_button_click_40_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.editVisibility()); });
    i0.ɵɵelementStart(41, "div", 17)(42, "mat-icon");
    i0.ɵɵtext(43, "edit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "span")(45, "code");
    i0.ɵɵtext(46);
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(47, "div", 8)(48, "div")(49, "label");
    i0.ɵɵtext(50);
    i0.ɵɵpipe(51, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(52, "div")(53, "mat-slider", 18);
    i0.ɵɵelement(54, "input", 19);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(55, AjfFbNodeProperties_ng_container_2_ng_container_1_div_55_Template, 8, 2, "div", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(56, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_56_Template, 8, 3, "ng-template", 11)(57, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_Template, 67, 41, "ng-template", 11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    let tmp_9_0;
    let tmp_11_0;
    const pf_r3 = ctx.ngIf;
    const ne_r19 = i0.ɵɵnextContext().ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 21, "Properties"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", pf_r3.status !== "VALID");
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", pf_r3 == null ? null : pf_r3.invalid);
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", pf_r3);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(16, 23, "Name"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", (tmp_9_0 = pf_r3.get("name")) == null ? null : tmp_9_0.invalid);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(21, 25, "Label"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", (tmp_11_0 = pf_r3.get("label")) == null ? null : tmp_11_0.invalid);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isEmptyField(ne_r19.node));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(28, 27, "Visibility"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(30, 29, "Visible"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(33, 31, "Always"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(36, 33, "Never"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(39, 35, "Condition..."));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", pf_r3.value.visibilityOpt !== "condition")("matTooltip", ctx_r1.curVisibility || "");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r1.curVisibility);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(51, 37, "Branches"));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", ctx_r1.conditionalBranches);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isRepeatingContainerNode(ne_r19));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isField(ne_r19));
} }
function AjfFbNodeProperties_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFbNodeProperties_ng_container_2_ng_container_1_Template, 58, 39, "ng-container", 3);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(2, 1, ctx_r1.propertiesForm));
} }
function checkValueLimitsValidity(c) {
    const minValue = c.value.minValue;
    const maxValue = c.value.maxValue;
    if (minValue != null && maxValue != null && minValue > maxValue) {
        return { valueLimit: 'Min value cannot be greater than max value' };
    }
    return null;
}
function checkDigitsValidity(c) {
    const minDigits = c.value.minDigits;
    const maxDigits = c.value.maxDigits;
    if (minDigits != null && maxDigits != null && minDigits > maxDigits) {
        return { digits: 'Min digits cannot be greater than max digits' };
    }
    return null;
}
function checkRangeValidity(c) {
    const { start, end } = c.value;
    if (start != null && end != null && start > end) {
        return { range: 'End must be greater than start' };
    }
    return null;
}
function checkTableValidity(c) {
    try {
        const jsonValue = JSON.parse(c.value);
        return Object.keys(jsonValue).length
            ? null
            : { tableDef: 'You must enter a valid JSON for Table definition' };
    }
    catch {
        return { tableDef: 'Invalid JSON for Table definition' };
    }
}
export class AjfFbNodeProperties {
    get fieldSizes() {
        return this._fieldSizes;
    }
    get nodeEntry() {
        return this._nodeEntry;
    }
    get choicesOrigins() {
        return this._choicesOrigins;
    }
    get enabled() {
        return this._enabled;
    }
    get propertiesForm() {
        return this._propertiesForm;
    }
    get hasChoices() {
        return this._hasChoices;
    }
    get curVisibility() {
        return this._curVisibility;
    }
    get curFormulaReps() {
        return this._curFormulaReps;
    }
    get curChoicesFilter() {
        return this._curChoicesFilter;
    }
    get curForceValue() {
        return this._curForceValue;
    }
    get curFormula() {
        return this._curFormula;
    }
    get conditionalBranches() {
        return this._conditionalBranches;
    }
    get validationConditions() {
        return this._validationConditions;
    }
    get warningConditions() {
        return this._warningConditions;
    }
    get nextSlideCondition() {
        return this._nextSlideCondition;
    }
    get triggerConditions() {
        return this._triggerConditions;
    }
    constructor(_cdr, _service, _dialog, _fb, _nodeNameValidator) {
        this._cdr = _cdr;
        this._service = _service;
        this._dialog = _dialog;
        this._fb = _fb;
        this._nodeNameValidator = _nodeNameValidator;
        this._fieldSizes = [
            { label: 'Normal', value: 'normal' },
            { label: 'Small', value: 'small' },
            { label: 'Smaller', value: 'smaller' },
            { label: 'Tiny', value: 'tiny' },
            { label: 'Mini', value: 'mini' },
        ];
        this._choicesOrigins = [];
        this._curVisibility = null;
        this._curFormulaReps = null;
        this._curChoicesFilter = null;
        this._curForceValue = null;
        this._curFormula = null;
        this._conditionalBranches = [];
        this._validationConditions = [];
        this._warningConditions = [];
        this._triggerConditions = [];
        this.isRepeatingContainerNode = nodeEntry => {
            return nodeEntry != null && isRepeatingContainerNode(nodeEntry.node);
        };
        this._visibilityOptSub = Subscription.EMPTY;
        this._visibilitySub = Subscription.EMPTY;
        this._conditionalBranchesSub = Subscription.EMPTY;
        this._formulaRepsSub = Subscription.EMPTY;
        this._choicesFilterSub = Subscription.EMPTY;
        this._formulaSub = Subscription.EMPTY;
        this._forceValueSub = Subscription.EMPTY;
        this._validationConditionsSub = Subscription.EMPTY;
        this._warningConditionsSub = Subscription.EMPTY;
        this._nextSlideConditionSub = Subscription.EMPTY;
        this._choicesOriginsSub = Subscription.EMPTY;
        this._triggerConditionsSub = Subscription.EMPTY;
        this._editConditionDialog = null;
        this._editConditionDialogSub = Subscription.EMPTY;
        this._editValidationConditionDialog = null;
        this._editValidationConditionDialogSub = Subscription.EMPTY;
        this._editWarningConditionDialog = null;
        this._editWarningConditionDialogSub = Subscription.EMPTY;
        this._editVisibilityEvt = new EventEmitter();
        this._editVisibilitySub = Subscription.EMPTY;
        this._editConditionalBranchEvt = new EventEmitter();
        this._editConditionalBranchSub = Subscription.EMPTY;
        this._editFormulaRepsEvt = new EventEmitter();
        this._editFormulaRepsSub = Subscription.EMPTY;
        this._editChoicesFilterEvt = new EventEmitter();
        this._editChoicesFilterSub = Subscription.EMPTY;
        this._editFormulaEvt = new EventEmitter();
        this._editFormulaSub = Subscription.EMPTY;
        this._editForceValueEvt = new EventEmitter();
        this._editForceValueSub = Subscription.EMPTY;
        this._editValidationConditionEvt = new EventEmitter();
        this._editValidationConditionSub = Subscription.EMPTY;
        this._addValidationConditionEvt = new EventEmitter();
        this._addValidationConditionSub = Subscription.EMPTY;
        this._removeValidationConditionEvt = new EventEmitter();
        this._removeValidationConditionSub = Subscription.EMPTY;
        this._editWarningConditionEvt = new EventEmitter();
        this._editWarningConditionSub = Subscription.EMPTY;
        this._addWarningConditionEvt = new EventEmitter();
        this._addWarningConditionSub = Subscription.EMPTY;
        this._removeWarningConditionEvt = new EventEmitter();
        this._removeWarningConditionSub = Subscription.EMPTY;
        this._editNextSlideConditionEvt = new EventEmitter();
        this._editNextSlideConditionSub = Subscription.EMPTY;
        this._editTriggerConditionEvt = new EventEmitter();
        this._editTriggerConditionSub = Subscription.EMPTY;
        this._addTriggerConditionEvt = new EventEmitter();
        this._addTriggerConditionSub = Subscription.EMPTY;
        this._removeTriggerConditionEvt = new EventEmitter();
        this._removeTriggerConditionSub = Subscription.EMPTY;
        this._saveEvt = new EventEmitter();
        this._saveSub = Subscription.EMPTY;
        this._isNodeValidSub = Subscription.EMPTY;
        this._nodeNameChangedSub = Subscription.EMPTY;
        this._nodeEntry = _service.editedNodeEntry;
        this._choicesOriginsSub = _service.choicesOrigins.subscribe(c => (this._choicesOrigins = c || []));
        this._enabled = this._nodeEntry.pipe(map(n => n != null));
        this._initForm();
        this._initVisibilityEdit();
        this._initConditionalBranchEdit();
        this._initFormulaRepsEdit();
        this._initChoicesFilterEdit();
        this._initFormulaEdit();
        this._initForceValueEdit();
        this._initValidationConditionEdit();
        this._initAddValidationCondition();
        this._initRemoveValidationCondition();
        this._initWarningConditionEdit();
        this._initAddWarningCondition();
        this._initRemoveWarningCondition();
        this._initNextSlideConditionEdit();
        this._initTriggerConditionEdit();
        this._initAddTriggerCondition();
        this._initRemoveTriggerCondition();
        this._initSave();
    }
    ngOnInit() {
        this._isNodeValidSub = this._propertiesForm
            .pipe(withLatestFrom(this._service.editedNodeEntry), switchMap(([formGroup, _fbNode]) => {
            formGroup.markAllAsTouched();
            formGroup.updateValueAndValidity();
            const nameControl = formGroup.get('name');
            const nodeValidation = {
                isValid: formGroup.valid,
                errors: formGroup.errors,
            };
            const fbNodeValidation = {};
            const fieldName = nameControl?.value || 'error';
            fbNodeValidation[fieldName] = nodeValidation;
            this._service.editNodeValidation(fbNodeValidation);
            if (nameControl) {
                this._nodeNameChangedSub = nameControl.valueChanges
                    .pipe(startWith(nameControl.value), pairwise(), distinctUntilChanged((a, b) => a[1] === b[1]))
                    .subscribe(([oldValue, _newValue]) => {
                    // set validation true for old unused name
                    fbNodeValidation[oldValue] = { isValid: true, errors: null };
                    this._service.editNodeValidation(fbNodeValidation);
                });
            }
            return formGroup.statusChanges.pipe(filter(status => status !== 'VALID'), map(() => {
                nodeValidation.errors = formGroup.errors;
                nodeValidation.isValid = formGroup.valid;
                const currFieldName = formGroup.get('name')?.value || 'error';
                fbNodeValidation[currFieldName] = nodeValidation;
                return fbNodeValidation;
            }), distinctUntilChanged());
        }))
            .subscribe(fbNodeValidation => {
            this._service.editNodeValidation(fbNodeValidation);
        });
    }
    editVisibility() {
        this._editVisibilityEvt.emit();
    }
    editConditionalBranch(idx) {
        if (idx < 0 || idx >= this._conditionalBranches.length) {
            return;
        }
        this._editConditionalBranchEvt.emit(idx);
    }
    editFormulaReps() {
        this._editFormulaRepsEvt.emit();
    }
    editChoicesFilter() {
        this._editChoicesFilterEvt.emit();
    }
    editFormula() {
        this._editFormulaEvt.emit();
    }
    editForceValue() {
        this._editForceValueEvt.emit();
    }
    editValidationCondition(idx) {
        if (idx < 0 || idx >= this._validationConditions.length) {
            return;
        }
        this._editValidationConditionEvt.emit(idx);
    }
    addValidationCondition() {
        this._addValidationConditionEvt.emit();
    }
    removeValidationCondition(idx) {
        if (idx < 0 || idx >= this._validationConditions.length) {
            return;
        }
        this._removeValidationConditionEvt.emit(idx);
    }
    editWarningCondition(idx) {
        if (idx < 0 || idx >= this._warningConditions.length) {
            return;
        }
        this._editWarningConditionEvt.emit(idx);
    }
    addWarningCondition() {
        this._addWarningConditionEvt.emit();
    }
    removeWarningCondition(idx) {
        if (idx < 0 || idx >= this._warningConditions.length) {
            return;
        }
        this._removeWarningConditionEvt.emit(idx);
    }
    editNextSlideCondition() {
        this._editNextSlideConditionEvt.emit();
    }
    editTriggerCondition(idx) {
        if (idx < 0 || idx >= this._triggerConditions.length) {
            return;
        }
        this._editTriggerConditionEvt.emit(idx);
    }
    addTriggerCondition() {
        this._addTriggerConditionEvt.emit();
    }
    removeTriggerCondition(idx) {
        if (idx < 0 || idx >= this._triggerConditions.length) {
            return;
        }
        this._removeTriggerConditionEvt.emit(idx);
    }
    isField(nodeEntry) {
        return nodeEntry != null && isField(nodeEntry.node);
    }
    isNumericField(node) {
        return isField(node) && isNumberField(node);
    }
    isEmptyField(node) {
        return isField(node) && isEmptyField(node);
    }
    isFieldWithChoices(node) {
        return isField(node) && isFieldWithChoices(node);
    }
    hasChoicesOriginRef() {
        return this._propertiesForm.pipe(map(fg => {
            const value = fg.get('choicesOriginRef')?.value != null;
            return value;
        }), take(1));
    }
    isRangeField(node) {
        return isField(node) && isRangeField(node);
    }
    isTableField(node) {
        return isField(node) && isTableField(node);
    }
    forceCheckbox(checked, checkbox) {
        if (!checked || !checkbox) {
            return;
        }
        if (checkbox.checked) {
            checkbox.toggle();
        }
    }
    save() {
        this._saveEvt.emit();
    }
    cancel() {
        this._service.cancelNodeEntryEdit();
    }
    /**
     * Return error message for the form control
     * @param formControl
     * @param fieldName
     * @returns
     */
    fieldErrorMessage(formControl, fieldName) {
        if (!formControl || !fieldName)
            return null;
        if (formControl.hasError('required')) {
            return `You must enter a value for ${fieldName}`;
        }
        if (formControl.hasError('name_exists')) {
            return `This ${fieldName} has already been used`;
        }
        if (formControl.hasError(fieldName)) {
            return formControl.getError(fieldName);
        }
        return null;
    }
    /**
     * Return all form error messages
     * @param formGroup
     * @returns
     */
    allErrorMessages(formGroup) {
        if (!formGroup)
            return null;
        let formErrors = [];
        if (formGroup.errors && Object.keys(formGroup.errors).length) {
            formErrors = Object.keys(formGroup.errors).map(key => `${key}: ${formGroup.errors?.[key]}`);
        }
        if (!formErrors.length && formGroup.controls) {
            formErrors = Object.keys(formGroup.controls)
                .filter(key => formGroup.controls[key].errors)
                .map(key => `${key}: ${JSON.stringify(formGroup.controls[key].errors)}`);
        }
        return formErrors.join();
    }
    ngOnDestroy() {
        this.cancel();
        this._choicesOriginsSub.unsubscribe();
        this._visibilityOptSub.unsubscribe();
        this._visibilitySub.unsubscribe();
        this._formulaRepsSub.unsubscribe();
        this._choicesFilterSub.unsubscribe();
        this._formulaSub.unsubscribe();
        this._forceValueSub.unsubscribe();
        this._validationConditionsSub.unsubscribe();
        this._warningConditionsSub.unsubscribe();
        this._triggerConditionsSub.unsubscribe();
        this._editConditionDialogSub.unsubscribe();
        this._editValidationConditionDialogSub.unsubscribe();
        this._editWarningConditionDialogSub.unsubscribe();
        this._editChoicesFilterSub.unsubscribe();
        this._editConditionalBranchSub.unsubscribe();
        this._editVisibilitySub.unsubscribe();
        this._editFormulaRepsSub.unsubscribe();
        this._editFormulaSub.unsubscribe();
        this._editForceValueSub.unsubscribe();
        this._editValidationConditionSub.unsubscribe();
        this._editWarningConditionSub.unsubscribe();
        this._nextSlideConditionSub.unsubscribe();
        this._addTriggerConditionSub.unsubscribe();
        this._addValidationConditionSub.unsubscribe();
        this._addWarningConditionSub.unsubscribe();
        this._editNextSlideConditionSub.unsubscribe();
        this._editTriggerConditionSub.unsubscribe();
        this._removeTriggerConditionSub.unsubscribe();
        this._removeValidationConditionSub.unsubscribe();
        this._removeWarningConditionSub.unsubscribe();
        this._saveSub.unsubscribe();
        this._isNodeValidSub.unsubscribe();
        this._nodeNameChangedSub.unsubscribe();
    }
    _initSave() {
        this._saveSub = this._saveEvt
            .pipe(withLatestFrom(this.propertiesForm))
            .subscribe(([_, formGroup]) => {
            const fg = formGroup;
            const val = { ...fg.value, conditionalBranches: this._conditionalBranches };
            this._service.saveNodeEntry(val);
            const fbNodeValidation = {};
            fbNodeValidation[val.name] = { isValid: true, errors: null };
            fbNodeValidation['error'] = { isValid: true, errors: null };
            this._service.editNodeValidation(fbNodeValidation);
        });
    }
    _initForm() {
        this._propertiesForm = this._nodeEntry.pipe(filter(n => n != null), map(n => {
            if (this._visibilityOptSub != null) {
                this._visibilityOptSub.unsubscribe();
            }
            if (this._visibilitySub != null) {
                this._visibilitySub.unsubscribe();
            }
            if (this._conditionalBranchesSub != null) {
                this._conditionalBranchesSub.unsubscribe();
            }
            if (n == null) {
                return this._fb.group({});
            }
            const visibility = n.node.visibility != null ? n.node.visibility.condition : null;
            const visibilityOpt = n.node.visibility != null ? this._guessVisibilityOpt(n.node.visibility) : null;
            let controls = {
                name: [
                    n.node.name,
                    Validators.required,
                    this._nodeNameValidator.sameValueCheck(this._cdr, n.node.id),
                ],
                label: [n.node.label],
                visibilityOpt: [visibilityOpt, Validators.required],
                visibility: [visibility, Validators.required],
                conditionalBranchesNum: n.node.conditionalBranches.length,
            };
            const validators = [];
            if (isRepeatingContainerNode(n.node)) {
                const rn = n.node;
                const formulaReps = rn.formulaReps != null ? rn.formulaReps.formula : null;
                controls.formulaReps = [formulaReps];
                controls.maxReps = rn.maxReps;
                this._curFormulaReps = formulaReps;
            }
            const { node } = n;
            if (isField(node)) {
                let forceValue = null;
                let notEmpty = false;
                let validationConditions = [];
                if (node.validation != null) {
                    if (node.validation.forceValue != null) {
                        forceValue = node.validation.forceValue.condition;
                    }
                    notEmpty = node.validation.notEmpty != null;
                    validationConditions = (node.validation.conditions || []).map(c => {
                        return { condition: c.condition, errorMessage: c.errorMessage };
                    });
                }
                let notEmptyW = false;
                let warningConditions = [];
                if (node.warning != null) {
                    notEmptyW = node.warning.notEmpty != null;
                    warningConditions = (node.warning.conditions || []).map(w => {
                        return { condition: w.condition, warningMessage: w.warningMessage };
                    });
                }
                const formula = node.formula != null ? node.formula.formula : null;
                const defaultValue = node.defaultValue && node.defaultValue.formula != null
                    ? node.defaultValue.formula
                    : cleanDefaultValue(node.defaultValue, node);
                controls.description = node.description;
                controls.defaultValue = defaultValue;
                controls.hint = node.hint;
                controls.size = node.size;
                controls.formula = formula;
                controls.forceValue = forceValue;
                controls.notEmpty = notEmpty;
                controls.validationConditions = [validationConditions, []];
                controls.notEmptyWarning = notEmptyW;
                controls.readonlyField = node.editable != null ? !node.editable : false;
                controls.warningConditions = [warningConditions, []];
                controls.nextSlideCondition = [node.nextSlideCondition];
                this._curForceValue = forceValue;
                this._curFormula = formula;
                this._validationConditions = validationConditions;
                this._warningConditions = warningConditions;
            }
            if (this.isNumericField(node)) {
                let minValue;
                let maxValue;
                let minDigits;
                let maxDigits;
                if (node.validation != null) {
                    if (node.validation.minValue != null) {
                        minValue = (node.validation.minValue.condition || '').replace('$value >= ', '');
                    }
                    if (node.validation.maxValue != null) {
                        maxValue = (node.validation.maxValue.condition || '').replace('$value <= ', '');
                    }
                    if (node.validation.minDigits != null) {
                        minDigits = (node.validation.minDigits.condition || '').replace('$value.toString().length >= ', '');
                    }
                    if (node.validation.maxDigits != null) {
                        maxDigits = (node.validation.maxDigits.condition || '').replace('$value.toString().length <= ', '');
                    }
                }
                controls.minValue = minValue;
                controls.maxValue = maxValue;
                controls.minDigits = minDigits;
                controls.maxDigits = maxDigits;
                validators.push(checkValueLimitsValidity);
                validators.push(checkDigitsValidity);
            }
            if (this.isEmptyField(node)) {
                const { HTML } = node;
                controls.HTML = HTML;
            }
            if (this.isRangeField(node)) {
                const { start, end, step, appearance } = node;
                controls.start = start;
                controls.end = end;
                controls.step = step;
                controls.appearance = appearance ?? null;
                validators.push(checkRangeValidity);
            }
            if (this.isFieldWithChoices(node)) {
                let triggerConditions = (node.triggerConditions || []).map(c => c.condition);
                controls.choicesOriginRef = [node.choicesOriginRef, Validators.required];
                controls.choicesFilter = node.choicesFilter != null ? node.choicesFilter.formula : null;
                controls.forceExpanded = node.forceExpanded;
                controls.forceNarrow = node.forceNarrow;
                controls.triggerConditions = triggerConditions;
                this._triggerConditions = triggerConditions;
            }
            if (this.isTableField(node)) {
                const { columnTypes, rows, columnLabels, rowLabels } = node;
                const tableDef = { columnTypes, rows, columnLabels, rowLabels };
                controls.tableDef = [
                    JSON.stringify(tableDef, undefined, 2),
                    [Validators.required, checkTableValidity],
                ];
                controls.hideEmptyRows = node.hideEmptyRows;
            }
            const fg = this._fb.group(controls);
            fg.setValidators(validators);
            fg.markAllAsTouched();
            fg.updateValueAndValidity({ onlySelf: false, emitEvent: true });
            this._conditionalBranches = n.node.conditionalBranches.map(c => c.condition);
            this._curVisibility = n.node.visibility != null ? n.node.visibility.condition : null;
            this._handleConditionalBranchesChange(fg);
            this._handleVisibilityChange(fg);
            this._handleFormulaRepsChange(fg);
            this._handleChoicesFilterChange(fg);
            this._handleFormulaChange(fg);
            this._handleForceValueChange(fg);
            this._handleValidationCondtionsChange(fg);
            this._handleWarningCondtionsChange(fg);
            this._handleNextSlideConditionChange(fg);
            this._handleTriggerCondtionsChange(fg);
            return fg;
        }), shareReplay(1));
    }
    _destroyConditionDialog() {
        if (this._editConditionDialogSub != null) {
            this._editConditionDialogSub.unsubscribe();
            this._editConditionDialogSub = Subscription.EMPTY;
        }
        if (this._editConditionDialog != null) {
            this._editConditionDialog.close();
            this._editConditionDialog = null;
        }
    }
    _destroyValidationConditionDialog() {
        if (this._editValidationConditionDialogSub != null) {
            this._editValidationConditionDialogSub.unsubscribe();
            this._editValidationConditionDialogSub = Subscription.EMPTY;
        }
        if (this._editValidationConditionDialog != null) {
            this._editValidationConditionDialog.close();
            this._editValidationConditionDialog = null;
        }
    }
    _destroyWarningConditionDialog() {
        if (this._editWarningConditionDialogSub != null) {
            this._editWarningConditionDialogSub.unsubscribe();
            this._editWarningConditionDialogSub = Subscription.EMPTY;
        }
        if (this._editWarningConditionDialog != null) {
            this._editWarningConditionDialog.close();
            this._editWarningConditionDialog = null;
        }
    }
    _initRemoveTriggerCondition() {
        this._removeTriggerConditionSub = this._removeTriggerConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(([vcIdx, formGroup]) => {
            if (formGroup == null) {
                return;
            }
            const fg = formGroup;
            const ctrl = fg.controls['triggerConditions'];
            let vcs = (ctrl.value || []).slice(0);
            if (vcIdx < 0 || vcIdx >= vcs.length) {
                return;
            }
            vcs.splice(vcIdx, 1);
            ctrl.setValue(vcs);
        });
    }
    _initAddTriggerCondition() {
        this._addTriggerConditionSub = this._addTriggerConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(([_, formGroup]) => {
            if (formGroup == null) {
                return;
            }
            const fg = formGroup;
            const ctrl = fg.controls['triggerConditions'];
            let vcs = (ctrl.value || []).slice(0);
            vcs.push('');
            ctrl.setValue(vcs);
        });
    }
    _initTriggerConditionEdit() {
        this._editConditionDialogSub = Subscription.EMPTY;
        this._cdr.markForCheck();
        this._editTriggerConditionSub = this._editTriggerConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(([vcIdx, fg]) => {
            this._destroyConditionDialog();
            if (vcIdx < 0 || vcIdx >= this._triggerConditions.length || fg == null) {
                return;
            }
            this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
            const cmp = this._editConditionDialog.componentInstance;
            cmp.condition = this._triggerConditions[vcIdx];
            this._editConditionDialogSub = this._editConditionDialog
                .afterClosed()
                .subscribe((cond) => {
                if (cond !== void 0) {
                    this._triggerConditions[vcIdx] = cond;
                }
                this._editConditionDialogSub.unsubscribe();
                this._editConditionDialogSub = Subscription.EMPTY;
                this._cdr.markForCheck();
            });
        });
    }
    _initRemoveWarningCondition() {
        this._removeWarningConditionSub = this._removeWarningConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(([vcIdx, formGroup]) => {
            if (formGroup == null) {
                return;
            }
            const fg = formGroup;
            const ctrl = fg.controls['warningConditions'];
            let vcs = (ctrl.value || []).slice(0);
            if (vcIdx < 0 || vcIdx >= vcs.length) {
                return;
            }
            vcs.splice(vcIdx, 1);
            ctrl.setValue(vcs);
        });
    }
    _initAddWarningCondition() {
        this._addWarningConditionSub = this._addWarningConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(([_, formGroup]) => {
            if (formGroup == null) {
                return;
            }
            const fg = formGroup;
            const ctrl = fg.controls['warningConditions'];
            let vcs = (ctrl.value || []).slice(0);
            vcs.push({ condition: '', errorMessage: '' });
            ctrl.setValue(vcs);
        });
    }
    _initWarningConditionEdit() {
        this._editWarningConditionSub = this._editWarningConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(([vcIdx, fg]) => {
            this._destroyWarningConditionDialog();
            if (vcIdx < 0 || vcIdx >= this._warningConditions.length || fg == null) {
                return;
            }
            this._editWarningConditionDialog = this._dialog.open(AjfFbWarningConditionEditorDialog);
            const cmp = this._editWarningConditionDialog.componentInstance;
            const w = this._warningConditions[vcIdx];
            cmp.condition = w.condition;
            cmp.warningMessage = w.warningMessage;
            this._editWarningConditionDialogSub = this._editWarningConditionDialog
                .afterClosed()
                .subscribe((cond) => {
                if (cond !== void 0) {
                    this._warningConditions[vcIdx] = cond;
                }
                this._editWarningConditionDialogSub.unsubscribe();
                this._editWarningConditionDialogSub = Subscription.EMPTY;
                this._cdr.markForCheck();
            });
        });
    }
    _initRemoveValidationCondition() {
        this._removeValidationConditionSub = this._removeValidationConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(([vcIdx, formGroup]) => {
            if (formGroup == null) {
                return;
            }
            const fg = formGroup;
            const ctrl = fg.controls['validationConditions'];
            let vcs = (ctrl.value || []).slice(0);
            if (vcIdx < 0 || vcIdx >= vcs.length) {
                return;
            }
            vcs.splice(vcIdx, 1);
            ctrl.setValue(vcs);
        });
    }
    _initAddValidationCondition() {
        this._addValidationConditionSub = this._addValidationConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(([_, formGroup]) => {
            if (formGroup == null) {
                return;
            }
            const fg = formGroup;
            const ctrl = fg.controls['validationConditions'];
            let vcs = (ctrl.value || []).slice(0);
            vcs.push({ condition: '', errorMessage: '' });
            ctrl.setValue(vcs);
        });
    }
    _initValidationConditionEdit() {
        this._editValidationConditionSub = this._editValidationConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(([vcIdx, fg]) => {
            this._destroyValidationConditionDialog();
            if (vcIdx < 0 || vcIdx >= this._validationConditions.length || fg == null) {
                return;
            }
            this._editValidationConditionDialog = this._dialog.open(AjfFbValidationConditionEditorDialog);
            const cmp = this._editValidationConditionDialog.componentInstance;
            const v = this._validationConditions[vcIdx];
            cmp.condition = v.condition;
            cmp.errorMessage = v.errorMessage;
            this._editValidationConditionDialogSub = this._editValidationConditionDialog
                .afterClosed()
                .subscribe((cond) => {
                if (cond !== void 0) {
                    this._validationConditions[vcIdx] = cond;
                }
                this._editValidationConditionDialogSub.unsubscribe();
                this._editValidationConditionDialogSub = Subscription.EMPTY;
                this._cdr.markForCheck();
            });
        });
    }
    _initForceValueEdit() {
        this._editForceValueSub = this._editForceValueEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(([_, formGroup]) => {
            this._destroyConditionDialog();
            if (formGroup == null) {
                return;
            }
            const fg = formGroup;
            const ctrl = fg.controls['forceValue'];
            this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
            this._editConditionDialog.componentInstance.condition = ctrl.value;
            this._editConditionDialogSub = this._editConditionDialog
                .afterClosed()
                .subscribe((cond) => {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                this._editConditionDialogSub.unsubscribe();
                this._editConditionDialogSub = Subscription.EMPTY;
                this._cdr.markForCheck();
            });
        });
    }
    _initNextSlideConditionEdit() {
        this._editNextSlideConditionSub = this._editNextSlideConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(([_, formGroup]) => {
            this._destroyConditionDialog();
            if (formGroup == null) {
                return;
            }
            const fg = formGroup;
            const ctrl = fg.controls['nextSlideCondition'];
            this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
            this._editConditionDialog.componentInstance.condition = ctrl.value;
            this._editConditionDialogSub = this._editConditionDialog
                .afterClosed()
                .subscribe((cond) => {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                this._editConditionDialogSub.unsubscribe();
                this._editConditionDialogSub = Subscription.EMPTY;
                this._cdr.markForCheck();
            });
        });
    }
    _initFormulaEdit() {
        this._editConditionDialogSub = Subscription.EMPTY;
        this._cdr.markForCheck();
        this._editFormulaSub = this._editFormulaEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(([_, formGroup]) => {
            this._destroyConditionDialog();
            if (formGroup == null) {
                return;
            }
            const fg = formGroup;
            const ctrl = fg.controls['formula'];
            this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
            this._editConditionDialog.componentInstance.condition = ctrl.value;
            this._editConditionDialogSub = this._editConditionDialog
                .afterClosed()
                .subscribe((cond) => {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                this._editConditionDialogSub.unsubscribe();
                this._editConditionDialogSub = Subscription.EMPTY;
                this._cdr.markForCheck();
            });
        });
    }
    _initFormulaRepsEdit() {
        this._editFormulaRepsSub = this._editFormulaRepsEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(([_, formGroup]) => {
            this._destroyConditionDialog();
            if (formGroup == null) {
                return;
            }
            const fg = formGroup;
            const ctrl = fg.controls['formulaReps'];
            this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
            this._editConditionDialog.componentInstance.condition = ctrl.value;
            this._editConditionDialogSub = this._editConditionDialog
                .afterClosed()
                .subscribe((cond) => {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                this._editConditionDialogSub.unsubscribe();
                this._editConditionDialogSub = Subscription.EMPTY;
                this._cdr.markForCheck();
            });
        });
    }
    _initChoicesFilterEdit() {
        this._editChoicesFilterSub = this._editChoicesFilterEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(([_, formGroup]) => {
            this._destroyConditionDialog();
            if (formGroup == null) {
                return;
            }
            const fg = formGroup;
            const ctrl = fg.controls['choicesFilter'];
            this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
            this._editConditionDialog.componentInstance.condition = ctrl.value;
            this._editConditionDialogSub = this._editConditionDialog
                .afterClosed()
                .subscribe((cond) => {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                this._editConditionDialogSub.unsubscribe();
                this._editConditionDialogSub = Subscription.EMPTY;
                this._cdr.markForCheck();
            });
        });
    }
    _initConditionalBranchEdit() {
        this._editConditionalBranchSub = this._editConditionalBranchEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(([cbIdx, fg]) => {
            this._destroyConditionDialog();
            if (cbIdx < 0 || cbIdx >= this._conditionalBranches.length || fg == null) {
                return;
            }
            this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
            this._editConditionDialog.componentInstance.condition = this._conditionalBranches[cbIdx];
            this._editConditionDialogSub = this._editConditionDialog
                .afterClosed()
                .subscribe((cond) => {
                if (cond !== void 0) {
                    this._conditionalBranches[cbIdx] = cond;
                }
                this._editConditionDialogSub.unsubscribe();
                this._editConditionDialogSub = Subscription.EMPTY;
                this._cdr.markForCheck();
            });
        });
    }
    _initVisibilityEdit() {
        this._editVisibilitySub = this._editVisibilityEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(([_, formGroup]) => {
            this._destroyConditionDialog();
            if (formGroup == null) {
                return;
            }
            const fg = formGroup;
            const ctrl = fg.controls['visibility'];
            const condition = ctrl.value;
            this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
            this._editConditionDialog.componentInstance.condition = condition;
            this._editConditionDialogSub = this._editConditionDialog
                .afterClosed()
                .subscribe((cond) => {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                this._editConditionDialogSub.unsubscribe();
                this._editConditionDialogSub = Subscription.EMPTY;
                this._cdr.markForCheck();
            });
        });
    }
    _handleTriggerCondtionsChange(fg) {
        this._triggerConditionsSub = fg.valueChanges
            .pipe(distinctUntilChanged((v1, v2) => JSON.stringify(v1.triggerConditions) === JSON.stringify(v2.triggerConditions)))
            .subscribe((v) => {
            this._triggerConditions = v.triggerConditions;
            this._cdr.markForCheck();
        });
    }
    _handleWarningCondtionsChange(fg) {
        this._warningConditionsSub = fg.valueChanges
            .pipe(distinctUntilChanged((v1, v2) => JSON.stringify(v1.warningConditions) === JSON.stringify(v2.warningConditions)))
            .subscribe((v) => {
            this._warningConditions = v.warningConditions;
            this._cdr.markForCheck();
        });
    }
    _handleValidationCondtionsChange(fg) {
        this._validationConditionsSub = fg.valueChanges
            .pipe(distinctUntilChanged((v1, v2) => JSON.stringify(v1.validationConditions) === JSON.stringify(v2.validationConditions)))
            .subscribe((v) => {
            this._validationConditions = v.validationConditions;
            this._cdr.markForCheck();
        });
    }
    _handleForceValueChange(fg) {
        this._forceValueSub = fg.valueChanges
            .pipe(distinctUntilChanged((v1, v2) => v1.forceValue === v2.forceValue))
            .subscribe((v) => {
            this._curForceValue = v.forceValue;
            this._cdr.markForCheck();
        });
    }
    _handleNextSlideConditionChange(fg) {
        this._formulaSub = fg.valueChanges
            .pipe(distinctUntilChanged((v1, v2) => v1.nextSlideCondition === v2.nextSlideCondition))
            .subscribe((v) => {
            this._nextSlideCondition = v.nextSlideCondition;
            this._cdr.markForCheck();
        });
        this._formulaSub = fg.valueChanges
            .pipe(distinctUntilChanged((v1, v2) => v1.nextSlideCondition === v2.nextSlideCondition))
            .subscribe((v) => {
            this._nextSlideCondition = v.nextSlideCondition;
            this._cdr.markForCheck();
        });
    }
    _handleFormulaChange(fg) {
        this._formulaSub = fg.valueChanges
            .pipe(distinctUntilChanged((v1, v2) => v1.formula === v2.formula))
            .subscribe((v) => {
            this._curFormula = v.formula;
            this._cdr.markForCheck();
        });
    }
    _handleFormulaRepsChange(fg) {
        this._formulaRepsSub = fg.valueChanges
            .pipe(distinctUntilChanged((v1, v2) => v1.formulaReps === v2.formulaReps))
            .subscribe((v) => {
            this._curFormulaReps = v.formulaReps;
            this._cdr.markForCheck();
        });
    }
    _handleChoicesFilterChange(fg) {
        this._choicesFilterSub = fg.valueChanges
            .pipe(distinctUntilChanged((v1, v2) => v1.choicesFilter === v2.choicesFilter))
            .subscribe((v) => {
            this._curChoicesFilter = v.choicesFilter;
            this._cdr.markForCheck();
        });
    }
    _handleConditionalBranchesChange(fg) {
        this._conditionalBranchesSub = fg.valueChanges
            .pipe(distinctUntilChanged((v1, v2) => v1.conditionalBranchesNum === v2.conditionalBranchesNum))
            .subscribe((v) => {
            const cbNum = v.conditionalBranchesNum;
            const curCbNum = this._conditionalBranches.length;
            if (curCbNum < cbNum) {
                let newCbs = [];
                for (let i = curCbNum; i < cbNum; i++) {
                    newCbs.push(alwaysCondition().condition);
                }
                this._conditionalBranches = this._conditionalBranches.concat(newCbs);
            }
            else if (curCbNum > cbNum) {
                this._conditionalBranches.splice(0, curCbNum - cbNum);
            }
            this._cdr.markForCheck();
        });
    }
    _handleVisibilityChange(fg) {
        this._visibilitySub = fg.valueChanges
            .pipe(distinctUntilChanged((v1, v2) => v1.visibilityOpt === v2.visibilityOpt))
            .subscribe(v => {
            const visibilityOpt = v.visibilityOpt;
            const visibility = v.visibility;
            let newCondition;
            switch (visibilityOpt) {
                case 'always':
                    newCondition = alwaysCondition().condition;
                    break;
                case 'never':
                    newCondition = neverCondition().condition;
                    break;
                case 'condition':
                    newCondition = visibility && visibility.length ? visibility : null;
                    break;
                default:
                    newCondition = null;
            }
            this._curVisibility = newCondition;
            fg.controls['visibility'].setValue(newCondition);
            this._cdr.markForCheck();
        });
        this._visibilitySub = fg.valueChanges
            .pipe(filter(v => v.visibilityOpt === 'condition'), distinctUntilChanged((v1, v2) => v1.visibility === v2.visibility))
            .subscribe(v => {
            this._curVisibility = v.visibility;
            this._cdr.markForCheck();
        });
    }
    _guessVisibilityOpt(condition) {
        if (condition.condition.localeCompare(alwaysCondition().condition) === 0) {
            return 'always';
        }
        if (condition.condition.localeCompare(neverCondition().condition) === 0) {
            return 'never';
        }
        return 'condition';
    }
    static { this.ɵfac = function AjfFbNodeProperties_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFbNodeProperties)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.AjfFormBuilderService), i0.ɵɵdirectiveInject(i2.MatDialog), i0.ɵɵdirectiveInject(i3.UntypedFormBuilder), i0.ɵɵdirectiveInject(i4.AjfNodePropertiesNameMatchValidator)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFbNodeProperties, selectors: [["ajf-fb-node-properties"]], decls: 4, vars: 7, consts: [["forceExpanded", ""], ["forceNarrow", ""], [1, "ajf-disabled-overlay"], [4, "ngIf"], [1, "ajf-header"], ["mat-icon-button", "", 3, "click", "disabled"], ["mat-icon-button", "", 3, "click"], ["novalidate", "", 3, "formGroup"], [1, "ajf-prop"], ["matInput", "", "formControlName", "name", 3, "placeholder"], ["matInput", "", "formControlName", "label", 3, "placeholder"], [3, "ngIf"], ["formControlName", "visibilityOpt", 3, "placeholder"], ["value", "always"], ["value", "never"], ["value", "condition"], ["mat-raised-button", "", 3, "click", "disabled", "matTooltip"], [1, "ajf-icon-cont"], ["discrete", "", "min", "1", "max", "5", "step", "1"], ["matSliderThumb", "", "formControlName", "conditionalBranchesNum"], [4, "ngFor", "ngForOf"], ["matInput", "", "formControlName", "HTML", 3, "placeholder"], ["mat-raised-button", "", 3, "click", "matTooltip"], ["formControlName", "maxReps", "matSliderThumb", ""], ["formControlName", "readonlyField"], ["formControlName", "size", 3, "placeholder"], [3, "value", 4, "ngFor", "ngForOf"], ["matInput", "", "formControlName", "hint", 3, "placeholder"], ["matInput", "", "formControlName", "description", 3, "placeholder"], ["matInput", "", "formControlName", "defaultValue", 3, "placeholder"], ["formControlName", "notEmpty"], [1, "ajf-pointer", 3, "click"], ["class", "ajf-validation-row ajf-emph", 4, "ngIf"], ["class", "ajf-validation-row", 4, "ngFor", "ngForOf"], [3, "value"], ["matInput", "", "formControlName", "minValue", 3, "placeholder"], ["matInput", "", "formControlName", "maxValue", 3, "placeholder"], ["matInput", "", "formControlName", "minDigits", 3, "placeholder"], ["matInput", "", "formControlName", "maxDigits", 3, "placeholder"], ["matInput", "", "type", "number", "formControlName", "start", 3, "placeholder"], ["matInput", "", "type", "number", "formControlName", "end", 3, "placeholder"], ["matInput", "", "type", "number", "formControlName", "step", 3, "placeholder"], ["formControlName", "appearance", 3, "placeholder"], ["value", "rating"], [1, "ajf-validation-row", "ajf-emph"], [1, "ajf-validation-row"], ["formControlName", "choicesOriginRef", 3, "placeholder"], ["formControlName", "forceExpanded", 3, "change"], ["formControlName", "forceNarrow", 3, "change"], [1, "pointer", 3, "click"], ["formControlName", "hideEmptyRows"], ["matInput", "", "formControlName", "tableDef", 3, "placeholder"]], template: function AjfFbNodeProperties_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "div", 2);
            i0.ɵɵpipe(1, "async");
            i0.ɵɵtemplate(2, AjfFbNodeProperties_ng_container_2_Template, 3, 3, "ng-container", 3);
            i0.ɵɵpipe(3, "async");
        } if (rf & 2) {
            i0.ɵɵstyleProp("display", i0.ɵɵpipeBind1(1, 3, ctx.enabled) ? "none" : "block");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(3, 5, ctx.nodeEntry));
        } }, dependencies: [i5.NgForOf, i5.NgIf, i3.ɵNgNoValidate, i3.DefaultValueAccessor, i3.NumberValueAccessor, i3.NgControlStatus, i3.NgControlStatusGroup, i6.MatOption, i7.MatButton, i7.MatIconButton, i8.MatCheckbox, i9.MatFormField, i9.MatLabel, i9.MatError, i10.MatIcon, i11.MatInput, i12.MatSelect, i13.MatSlider, i13.MatSliderThumb, i14.MatTooltip, i3.FormGroupDirective, i3.FormControlName, i5.AsyncPipe, i15.TranslocoPipe], styles: ["ajf-fb-node-properties{display:block;padding:2px 2px 2px 5px;position:relative}ajf-fb-node-properties mat-icon{cursor:pointer}ajf-fb-node-properties .ajf-header{display:flex;flex-direction:row;align-items:center;flex-wrap:nowrap}ajf-fb-node-properties .ajf-header>h3,ajf-fb-node-properties .ajf-header>label{flex:1 0 auto;margin-right:.5em}ajf-fb-node-properties .ajf-header>mat-icon{flex:0 0 auto;margin-left:.5em}ajf-fb-node-properties .ajf-disabled-overlay{position:absolute;inset:0;opacity:.4;background-color:currentColor}ajf-fb-node-properties .ajf-emph{font-style:italic}ajf-fb-node-properties [mat-raised-button]{margin:.5em 0}ajf-fb-node-properties [mat-raised-button].ajf-pointer{cursor:pointer}ajf-fb-node-properties [mat-raised-button] .ajf-icon-cont{display:flex;flex-direction:row;align-items:center;position:relative}ajf-fb-node-properties [mat-raised-button] .ajf-icon-cont span{flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;display:block;margin:auto;position:relative;max-height:30px;max-width:100%}ajf-fb-node-properties .ajf-validation-row{margin:.5em 0;display:flex;flex-direction:row;align-items:center}ajf-fb-node-properties .ajf-validation-row button{flex:1 1 auto}ajf-fb-node-properties .ajf-validation-row mat-icon{flex:0 0 auto}ajf-fb-node-properties .ajf-prop{margin:.5em 0}ajf-fb-node-properties .ajf-prop .mdc-button__label{max-width:100%}ajf-fb-node-properties mat-form-field,ajf-fb-node-properties mat-slider,ajf-fb-node-properties [mat-raised-button]{width:100%}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFbNodeProperties, [{
        type: Component,
        args: [{ selector: 'ajf-fb-node-properties', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [style.display]=\"(enabled|async) ? 'none' : 'block'\" class=\"ajf-disabled-overlay\"></div>\n<ng-container *ngIf=\"nodeEntry|async as ne\">\n  <ng-container *ngIf=\"propertiesForm|async as pf\">\n    <div class=\"ajf-header\">\n      <h3>{{'Properties'|transloco}}</h3>\n      <button\n        mat-icon-button\n        [disabled]=\"pf.status !== 'VALID'\"\n        (click)=\"save()\"\n      >\n        <mat-icon>save</mat-icon>\n      </button>\n      <button mat-icon-button (click)=\"cancel()\">\n        <mat-icon>cancel</mat-icon>\n      </button>  \n    </div>\n    <mat-error *ngIf=\"pf?.invalid\">\n      {{allErrorMessages(pf)}}\n    </mat-error>\n    <form [formGroup]=\"pf!\" novalidate>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <input matInput formControlName=\"name\" [placeholder]=\"'Name' | transloco\" />\n          <mat-error *ngIf=\"pf.get('name')?.invalid\">\n            {{fieldErrorMessage(pf.get('name'), 'Name')}}\n          </mat-error>\n        </mat-form-field>\n      </div>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <input matInput formControlName=\"label\" [placeholder]=\"'Label' | transloco\" />\n          <mat-error *ngIf=\"pf.get('label')?.invalid\">\n            {{fieldErrorMessage(pf.get('label'), 'Label')}}\n          </mat-error>\n        </mat-form-field>\n      </div>\n      <ng-template [ngIf]=\"isEmptyField(ne!.node)\">\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <input matInput formControlName=\"HTML\" [placeholder]=\"'HTML' | transloco\" />\n          </mat-form-field>\n        </div>\n      </ng-template>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <mat-label>{{'Visibility'|transloco}}</mat-label>\n          <mat-select formControlName=\"visibilityOpt\" [placeholder]=\"'Visible' | transloco\">\n            <mat-option value=\"always\">{{'Always'|transloco}}</mat-option>\n            <mat-option value=\"never\">{{'Never'|transloco}}</mat-option>\n            <mat-option value=\"condition\">{{'Condition...'|transloco}}</mat-option>\n          </mat-select>\n        </mat-form-field>\n        <button\n          (click)=\"editVisibility()\"\n          [disabled]=\"pf!.value.visibilityOpt !== 'condition'\"\n          mat-raised-button\n          [matTooltip]=\"curVisibility || ''\"\n        >\n          <div class=\"ajf-icon-cont\">\n            <mat-icon>edit</mat-icon>\n            <span><code>{{ curVisibility }}</code></span>\n          </div>\n        </button>\n      </div>\n      <div class=\"ajf-prop\">\n        <div><label>{{'Branches'|transloco}}</label></div>\n        <div>\n          <mat-slider discrete min=\"1\" max=\"5\" step=\"1\"\n            ><input matSliderThumb formControlName=\"conditionalBranchesNum\"\n          /></mat-slider>\n        </div>\n        <div *ngFor=\"let branch of conditionalBranches; let idx = index\">\n          <button (click)=\"editConditionalBranch(idx)\" mat-raised-button [matTooltip]=\"branch\">\n            <div class=\"ajf-icon-cont\">\n              <mat-icon>edit</mat-icon>\n              <span><code>{{ branch }}</code></span>\n            </div>\n          </button>\n        </div>\n      </div>\n      <ng-template [ngIf]=\"isRepeatingContainerNode(ne)\">\n        <div class=\"ajf-prop\">\n          <div><label>{{'Max repetitions'|transloco}}</label></div>\n          <div>\n            <mat-slider discrete min=\"1\" max=\"5\" step=\"1\"\n              ><input formControlName=\"maxReps\" matSliderThumb\n            /></mat-slider>\n          </div>\n        </div>\n      </ng-template>\n      <ng-template [ngIf]=\"isField(ne)\">\n        <div class=\"ajf-prop\">\n          <mat-checkbox formControlName=\"readonlyField\">{{'Readonly'|transloco}}</mat-checkbox>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <mat-label>{{'Field size'|transloco}}</mat-label>\n            <mat-select formControlName=\"size\" [placeholder]=\"'Size' | transloco\">\n              <mat-option *ngFor=\"let fieldSize of fieldSizes\" [value]=\"fieldSize.value\">\n                {{ fieldSize.label|transloco }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <input matInput formControlName=\"hint\" [placeholder]=\"'Hint' | transloco\" />\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <textarea\n              matInput\n              formControlName=\"description\"\n              [placeholder]=\"'Description' | transloco\"\n            ></textarea>\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <input\n              matInput\n              formControlName=\"defaultValue\"\n              [placeholder]=\"'Default value' | transloco\"\n            />\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <div><label>{{'Formula'|transloco}}</label></div>\n          <div>\n            <button (click)=\"editFormula()\" mat-raised-button [matTooltip]=\"curFormula || ''\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span><code>{{ curFormula }}</code></span>\n              </div>\n            </button>\n          </div>\n        </div>\n        <!-- <div class=\"ajf-prop\">\n          <div><label>{{'Force value'|translco}}</label></div>\n          <div>\n            <button (click)=\"editForceValue()\" mat-raised-button [matTooltip]=\"curForceValue\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ curForceValue }}</span>\n              </div>\n            </button>\n          </div>\n        </div> -->\n        <div class=\"ajf-prop\">\n          <mat-checkbox formControlName=\"notEmpty\">{{'Not empty'|transloco}}</mat-checkbox>\n        </div>\n        <ng-template [ngIf]=\"isNumericField(ne!.node)\">\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input matInput formControlName=\"minValue\" [placeholder]=\"'Min value' | transloco\" />\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input matInput formControlName=\"maxValue\" [placeholder]=\"'Max value' | transloco\" />\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input\n                matInput\n                formControlName=\"minDigits\"\n                [placeholder]=\"'Min digits' | transloco\"\n              />\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input\n                matInput\n                formControlName=\"maxDigits\"\n                [placeholder]=\"'Max digits' | transloco\"\n              />\n            </mat-form-field>\n          </div>\n        </ng-template>\n        <ng-template [ngIf]=\"isRangeField(ne!.node)\">\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input\n                matInput\n                type=\"number\"\n                formControlName=\"start\"\n                [placeholder]=\"'Start' | transloco\"\n              />\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input\n                matInput\n                type=\"number\"\n                formControlName=\"end\"\n                [placeholder]=\"'End' | transloco\"\n              />\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input\n                matInput\n                type=\"number\"\n                formControlName=\"step\"\n                [placeholder]=\"'Step' | transloco\"\n              />\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <mat-select formControlName=\"appearance\" [placeholder]=\"'Appearance' | transloco\">\n                <mat-option [value]=\"null\">{{'Default'|transloco}}</mat-option>\n                <mat-option value=\"rating\">{{'Rating'|transloco}}</mat-option>\n              </mat-select>\n            </mat-form-field>\n          </div>\n        </ng-template>\n        <div class=\"ajf-prop\">\n          <div class=\"ajf-header\">\n            <label>{{ 'Validation' | transloco }}</label>\n            <mat-icon class=\"ajf-pointer\" (click)=\"addValidationCondition()\"\n              >add_circle_outline</mat-icon\n            >\n          </div>\n          <div *ngIf=\"validationConditions.length === 0\" class=\"ajf-validation-row ajf-emph\">\n            {{'No conditions'|transloco}}\n          </div>\n          <div\n            class=\"ajf-validation-row\"\n            *ngFor=\"let validationCondition of validationConditions; let idx = index\"\n          >\n            <button\n              (click)=\"editValidationCondition(idx)\"\n              mat-raised-button\n              [matTooltip]=\"validationCondition.condition\"\n            >\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span><code>{{ validationCondition.condition }}</code></span>\n              </div>\n            </button>\n            <mat-icon class=\"ajf-pointer\" (click)=\"removeValidationCondition(idx)\"\n              >remove_circle_outline</mat-icon\n            >\n          </div>\n        </div>\n        <!-- The warning editor used to sit here: a `notEmptyWarning` checkbox and\n             the list of warning conditions. Both are gone from the UI, while the\n             component keeps the properties, the form controls and the dialog that\n             drove them, so putting the block back is a template-only change. -->\n        <div class=\"ajf-prop\">\n          <div><label>{{'Go to next slide condition'|transloco}}</label></div>\n          <div>\n            <button\n              (click)=\"editNextSlideCondition()\"\n              mat-raised-button\n              [matTooltip]=\"nextSlideCondition || ''\"\n            >\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span><code>{{ nextSlideCondition }}</code></span>\n              </div>\n            </button>\n          </div>\n        </div>\n        <ng-template [ngIf]=\"isFieldWithChoices(ne!.node)\">\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <mat-label>{{'Choices origins'|transloco}}</mat-label>\n              <mat-select formControlName=\"choicesOriginRef\" [placeholder]=\"'Choices' | transloco\">\n                <mat-option\n                  *ngFor=\"let choicesOrigin of choicesOrigins\"\n                  [value]=\"choicesOrigin.name\"\n                >\n                  {{ (choicesOrigin.label || choicesOrigin.name)|transloco }}\n                </mat-option>\n              </mat-select>\n              <mat-error *ngIf=\"pf.get('choicesOriginRef')?.invalid\">\n                {{fieldErrorMessage(pf.get('choicesOriginRef'), 'choicesOriginRef')}}\n              </mat-error>\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <div><label>{{'Choices filter'|transloco}}</label></div>\n            <div>\n              <button\n                (click)=\"editChoicesFilter()\"\n                mat-raised-button\n                [matTooltip]=\"curChoicesFilter || ''\"\n              >\n                <div class=\"ajf-icon-cont\">\n                  <mat-icon>edit</mat-icon>\n                  <span><code>{{ curChoicesFilter }}</code></span>\n                </div>\n              </button>\n            </div>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-checkbox\n              formControlName=\"forceExpanded\"\n              #forceExpanded\n              (change)=\"forceCheckbox($event.checked, forceNarrow)\"\n              >{{'Force expanded selection'|transloco}}</mat-checkbox\n            >\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-checkbox\n              formControlName=\"forceNarrow\"\n              #forceNarrow\n              (change)=\"forceCheckbox($event.checked, forceExpanded)\"\n              >{{'Force narrow selection'|transloco}}</mat-checkbox\n            >\n          </div>\n          <div class=\"ajf-prop\">\n            <div class=\"ajf-header\">\n              <label>{{'Trigger selection'|transloco}}</label>\n              <mat-icon class=\"ajf-pointer\" (click)=\"addTriggerCondition()\"\n                >add_circle_outline</mat-icon\n              >\n            </div>\n            <div\n              *ngIf=\"!triggerConditions || triggerConditions.length === 0\"\n              class=\"ajf-validation-row ajf-emph\"\n            >\n              {{'No trigger condition'|transloco}}\n            </div>\n            <div\n              class=\"ajf-validation-row\"\n              *ngFor=\"let triggerCondition of triggerConditions; let idx = index\"\n            >\n              <button\n                (click)=\"editTriggerCondition(idx)\"\n                mat-raised-button\n                [matTooltip]=\"triggerCondition\"\n              >\n                <div class=\"ajf-icon-cont\">\n                  <mat-icon>edit</mat-icon>\n                  <span><code>{{ triggerCondition }}</code></span>\n                </div>\n              </button>\n              <mat-icon class=\"pointer\" (click)=\"removeTriggerCondition(idx)\"\n                >remove_circle_outline</mat-icon\n              >\n            </div>\n          </div>\n        </ng-template>\n        <ng-container *ngIf=\"isTableField(ne!.node)\">\n          <div class=\"ajf-prop\">\n            <mat-checkbox formControlName=\"hideEmptyRows\"\n              >{{'Hide empty rows'|transloco}}</mat-checkbox\n            >\n            <mat-form-field>\n              <textarea\n                matInput\n                formControlName=\"tableDef\"\n                [placeholder]=\"'Table definition' | transloco\"\n              ></textarea>\n              <mat-error *ngIf=\"pf.get('tableDef')?.invalid\">\n                {{fieldErrorMessage(pf.get('tableDef'), 'tableDef')}}\n              </mat-error>\n            </mat-form-field>\n          </div>\n        </ng-container>\n      </ng-template>\n    </form>\n  </ng-container>\n</ng-container>\n", styles: ["ajf-fb-node-properties{display:block;padding:2px 2px 2px 5px;position:relative}ajf-fb-node-properties mat-icon{cursor:pointer}ajf-fb-node-properties .ajf-header{display:flex;flex-direction:row;align-items:center;flex-wrap:nowrap}ajf-fb-node-properties .ajf-header>h3,ajf-fb-node-properties .ajf-header>label{flex:1 0 auto;margin-right:.5em}ajf-fb-node-properties .ajf-header>mat-icon{flex:0 0 auto;margin-left:.5em}ajf-fb-node-properties .ajf-disabled-overlay{position:absolute;inset:0;opacity:.4;background-color:currentColor}ajf-fb-node-properties .ajf-emph{font-style:italic}ajf-fb-node-properties [mat-raised-button]{margin:.5em 0}ajf-fb-node-properties [mat-raised-button].ajf-pointer{cursor:pointer}ajf-fb-node-properties [mat-raised-button] .ajf-icon-cont{display:flex;flex-direction:row;align-items:center;position:relative}ajf-fb-node-properties [mat-raised-button] .ajf-icon-cont span{flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;display:block;margin:auto;position:relative;max-height:30px;max-width:100%}ajf-fb-node-properties .ajf-validation-row{margin:.5em 0;display:flex;flex-direction:row;align-items:center}ajf-fb-node-properties .ajf-validation-row button{flex:1 1 auto}ajf-fb-node-properties .ajf-validation-row mat-icon{flex:0 0 auto}ajf-fb-node-properties .ajf-prop{margin:.5em 0}ajf-fb-node-properties .ajf-prop .mdc-button__label{max-width:100%}ajf-fb-node-properties mat-form-field,ajf-fb-node-properties mat-slider,ajf-fb-node-properties [mat-raised-button]{width:100%}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormBuilderService }, { type: i2.MatDialog }, { type: i3.UntypedFormBuilder }, { type: i4.AjfNodePropertiesNameMatchValidator }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFbNodeProperties, { className: "AjfFbNodeProperties", filePath: "node-properties.ts", lineNumber: 138 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1wcm9wZXJ0aWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL3NyYy9ub2RlLXByb3BlcnRpZXMudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvc3JjL25vZGUtcHJvcGVydGllcy5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFTTCxPQUFPLEVBQ1Asa0JBQWtCLEVBQ2xCLGFBQWEsRUFDYixZQUFZLEVBQ1osWUFBWSxFQUNaLHdCQUF3QixFQUN4QixZQUFZLEdBQ2IsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQWUsZUFBZSxFQUFFLGNBQWMsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9FLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFlBQVksRUFHWixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUtMLFVBQVUsR0FDWCxNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sRUFBYSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixNQUFNLEVBQ04sR0FBRyxFQUNILFFBQVEsRUFDUixXQUFXLEVBQ1gsU0FBUyxFQUNULFNBQVMsRUFDVCxJQUFJLEVBQ0osY0FBYyxHQUNmLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDckUsT0FBTyxFQUlMLGlCQUFpQixHQUVsQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBQyxvQ0FBb0MsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzFGLE9BQU8sRUFBQyxpQ0FBaUMsRUFBQyxNQUFNLG1DQUFtQyxDQUFDOzs7Ozs7Ozs7Ozs7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O1lDekloQyx5QkFBNkY7O1lBQzdGLHNGQUE0Qzs7O1lBRHZDLCtFQUFvRDtZQUMxQyxlQUFzQjtZQUF0QiwwREFBc0I7OztpRkR3SXhCLG1CQUFtQjtjQVAvQixTQUFTOzJCQUNFLHdCQUF3QixpQkFHbkIsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTTs7a0ZBRXBDLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmQ2hvaWNlc09yaWdpbixcbiAgQWpmRW1wdHlGaWVsZCxcbiAgQWpmRmllbGRXaXRoQ2hvaWNlcyxcbiAgQWpmTm9kZSxcbiAgQWpmTnVtYmVyRmllbGQsXG4gIEFqZlJhbmdlRmllbGQsXG4gIEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGUsXG4gIEFqZlRhYmxlRmllbGQsXG4gIGlzRmllbGQsXG4gIGlzRmllbGRXaXRoQ2hvaWNlcyxcbiAgaXNOdW1iZXJGaWVsZCxcbiAgaXNFbXB0eUZpZWxkLFxuICBpc1JhbmdlRmllbGQsXG4gIGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZSxcbiAgaXNUYWJsZUZpZWxkLFxufSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtBamZDb25kaXRpb24sIGFsd2F5c0NvbmRpdGlvbiwgbmV2ZXJDb25kaXRpb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEFic3RyYWN0Q29udHJvbCxcbiAgVW50eXBlZEZvcm1CdWlsZGVyLFxuICBVbnR5cGVkRm9ybUdyb3VwLFxuICBWYWxpZGF0b3JGbixcbiAgVmFsaWRhdG9ycyxcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtNYXREaWFsb2csIE1hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGRpc3RpbmN0VW50aWxDaGFuZ2VkLFxuICBmaWx0ZXIsXG4gIG1hcCxcbiAgcGFpcndpc2UsXG4gIHNoYXJlUmVwbGF5LFxuICBzdGFydFdpdGgsXG4gIHN3aXRjaE1hcCxcbiAgdGFrZSxcbiAgd2l0aExhdGVzdEZyb20sXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZ30gZnJvbSAnLi9jb25kaXRpb24tZWRpdG9yLWRpYWxvZyc7XG5pbXBvcnQge1xuICBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSxcbiAgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlLFxuICBBamZGb3JtQnVpbGRlclZhbGlkYXRpb24sXG4gIGNsZWFuRGVmYXVsdFZhbHVlLFxuICBGb3JtQnVpbGRlckZpZWxkVmFsaWRhdGlvbixcbn0gZnJvbSAnLi9mb3JtLWJ1aWxkZXItc2VydmljZSc7XG5pbXBvcnQge0FqZkZiVmFsaWRhdGlvbkNvbmRpdGlvbkVkaXRvckRpYWxvZ30gZnJvbSAnLi92YWxpZGF0aW9uLWNvbmRpdGlvbi1lZGl0b3ItZGlhbG9nJztcbmltcG9ydCB7QWpmRmJXYXJuaW5nQ29uZGl0aW9uRWRpdG9yRGlhbG9nfSBmcm9tICcuL3dhcm5pbmctY29uZGl0aW9uLWVkaXRvci1kaWFsb2cnO1xuaW1wb3J0IHtNYXRDaGVja2JveH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hlY2tib3gnO1xuaW1wb3J0IHtBamZOb2RlUHJvcGVydGllc05hbWVNYXRjaFZhbGlkYXRvcn0gZnJvbSAnLi9ub2RlLXByb3BlcnRpZXMtbmFtZS12YWxpZGF0b3InO1xuXG5mdW5jdGlvbiBjaGVja1ZhbHVlTGltaXRzVmFsaWRpdHkoYzogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0gfCBudWxsIHtcbiAgY29uc3QgbWluVmFsdWUgPSBjLnZhbHVlLm1pblZhbHVlO1xuICBjb25zdCBtYXhWYWx1ZSA9IGMudmFsdWUubWF4VmFsdWU7XG4gIGlmIChtaW5WYWx1ZSAhPSBudWxsICYmIG1heFZhbHVlICE9IG51bGwgJiYgbWluVmFsdWUgPiBtYXhWYWx1ZSkge1xuICAgIHJldHVybiB7dmFsdWVMaW1pdDogJ01pbiB2YWx1ZSBjYW5ub3QgYmUgZ3JlYXRlciB0aGFuIG1heCB2YWx1ZSd9O1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBjaGVja0RpZ2l0c1ZhbGlkaXR5KGM6IEFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHwgbnVsbCB7XG4gIGNvbnN0IG1pbkRpZ2l0cyA9IGMudmFsdWUubWluRGlnaXRzO1xuICBjb25zdCBtYXhEaWdpdHMgPSBjLnZhbHVlLm1heERpZ2l0cztcbiAgaWYgKG1pbkRpZ2l0cyAhPSBudWxsICYmIG1heERpZ2l0cyAhPSBudWxsICYmIG1pbkRpZ2l0cyA+IG1heERpZ2l0cykge1xuICAgIHJldHVybiB7ZGlnaXRzOiAnTWluIGRpZ2l0cyBjYW5ub3QgYmUgZ3JlYXRlciB0aGFuIG1heCBkaWdpdHMnfTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gY2hlY2tSYW5nZVZhbGlkaXR5KGM6IEFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHwgbnVsbCB7XG4gIGNvbnN0IHtzdGFydCwgZW5kfSA9IGMudmFsdWU7XG4gIGlmIChzdGFydCAhPSBudWxsICYmIGVuZCAhPSBudWxsICYmIHN0YXJ0ID4gZW5kKSB7XG4gICAgcmV0dXJuIHtyYW5nZTogJ0VuZCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBzdGFydCd9O1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBjaGVja1RhYmxlVmFsaWRpdHkoYzogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0gfCBudWxsIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBqc29uVmFsdWUgPSBKU09OLnBhcnNlKGMudmFsdWUpO1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhqc29uVmFsdWUpLmxlbmd0aFxuICAgICAgPyBudWxsXG4gICAgICA6IHt0YWJsZURlZjogJ1lvdSBtdXN0IGVudGVyIGEgdmFsaWQgSlNPTiBmb3IgVGFibGUgZGVmaW5pdGlvbid9O1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4ge3RhYmxlRGVmOiAnSW52YWxpZCBKU09OIGZvciBUYWJsZSBkZWZpbml0aW9uJ307XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBWYWxpZGF0aW9uQ29uZGl0aW9uIHtcbiAgY29uZGl0aW9uOiBzdHJpbmc7XG4gIGVycm9yTWVzc2FnZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFdhcm5pbmdDb25kaXRpb24ge1xuICBjb25kaXRpb246IHN0cmluZztcbiAgd2FybmluZ01lc3NhZ2U6IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWZiLW5vZGUtcHJvcGVydGllcycsXG4gIHRlbXBsYXRlVXJsOiAnbm9kZS1wcm9wZXJ0aWVzLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbm9kZS1wcm9wZXJ0aWVzLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZiTm9kZVByb3BlcnRpZXMgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIHByaXZhdGUgX2ZpZWxkU2l6ZXM6IHtsYWJlbDogc3RyaW5nOyB2YWx1ZTogc3RyaW5nfVtdID0gW1xuICAgIHtsYWJlbDogJ05vcm1hbCcsIHZhbHVlOiAnbm9ybWFsJ30sXG4gICAge2xhYmVsOiAnU21hbGwnLCB2YWx1ZTogJ3NtYWxsJ30sXG4gICAge2xhYmVsOiAnU21hbGxlcicsIHZhbHVlOiAnc21hbGxlcid9LFxuICAgIHtsYWJlbDogJ1RpbnknLCB2YWx1ZTogJ3RpbnknfSxcbiAgICB7bGFiZWw6ICdNaW5pJywgdmFsdWU6ICdtaW5pJ30sXG4gIF07XG4gIGdldCBmaWVsZFNpemVzKCk6IHtsYWJlbDogc3RyaW5nOyB2YWx1ZTogc3RyaW5nfVtdIHtcbiAgICByZXR1cm4gdGhpcy5fZmllbGRTaXplcztcbiAgfVxuXG4gIHByaXZhdGUgX25vZGVFbnRyeTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IG51bGw+O1xuICBnZXQgbm9kZUVudHJ5KCk6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkgfCBudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGVFbnRyeTtcbiAgfVxuXG4gIHByaXZhdGUgX2Nob2ljZXNPcmlnaW5zOiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSA9IFtdO1xuICBnZXQgY2hvaWNlc09yaWdpbnMoKTogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10ge1xuICAgIHJldHVybiB0aGlzLl9jaG9pY2VzT3JpZ2lucztcbiAgfVxuXG4gIHByaXZhdGUgX2VuYWJsZWQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIGdldCBlbmFibGVkKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9lbmFibGVkO1xuICB9XG5cbiAgcHJpdmF0ZSBfcHJvcGVydGllc0Zvcm0hOiBPYnNlcnZhYmxlPFVudHlwZWRGb3JtR3JvdXA+O1xuICBnZXQgcHJvcGVydGllc0Zvcm0oKTogT2JzZXJ2YWJsZTxVbnR5cGVkRm9ybUdyb3VwPiB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXNGb3JtO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFzQ2hvaWNlczogT2JzZXJ2YWJsZTxib29sZWFuPiB8IHVuZGVmaW5lZDtcbiAgZ2V0IGhhc0Nob2ljZXMoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc0Nob2ljZXM7XG4gIH1cblxuICBwcml2YXRlIF9jdXJWaXNpYmlsaXR5OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgZ2V0IGN1clZpc2liaWxpdHkoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2N1clZpc2liaWxpdHk7XG4gIH1cblxuICBwcml2YXRlIF9jdXJGb3JtdWxhUmVwczogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIGdldCBjdXJGb3JtdWxhUmVwcygpOiBzdHJpbmcgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fY3VyRm9ybXVsYVJlcHM7XG4gIH1cblxuICBwcml2YXRlIF9jdXJDaG9pY2VzRmlsdGVyOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgZ2V0IGN1ckNob2ljZXNGaWx0ZXIoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2N1ckNob2ljZXNGaWx0ZXI7XG4gIH1cblxuICBwcml2YXRlIF9jdXJGb3JjZVZhbHVlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgZ2V0IGN1ckZvcmNlVmFsdWUoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2N1ckZvcmNlVmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF9jdXJGb3JtdWxhOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgZ2V0IGN1ckZvcm11bGEoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2N1ckZvcm11bGE7XG4gIH1cblxuICBwcml2YXRlIF9jb25kaXRpb25hbEJyYW5jaGVzOiBzdHJpbmdbXSA9IFtdO1xuICBnZXQgY29uZGl0aW9uYWxCcmFuY2hlcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXM7XG4gIH1cblxuICBwcml2YXRlIF92YWxpZGF0aW9uQ29uZGl0aW9uczogVmFsaWRhdGlvbkNvbmRpdGlvbltdID0gW107XG4gIGdldCB2YWxpZGF0aW9uQ29uZGl0aW9ucygpOiBWYWxpZGF0aW9uQ29uZGl0aW9uW10ge1xuICAgIHJldHVybiB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9ucztcbiAgfVxuXG4gIHByaXZhdGUgX3dhcm5pbmdDb25kaXRpb25zOiBXYXJuaW5nQ29uZGl0aW9uW10gPSBbXTtcbiAgZ2V0IHdhcm5pbmdDb25kaXRpb25zKCk6IFdhcm5pbmdDb25kaXRpb25bXSB7XG4gICAgcmV0dXJuIHRoaXMuX3dhcm5pbmdDb25kaXRpb25zO1xuICB9XG5cbiAgcHJpdmF0ZSBfbmV4dFNsaWRlQ29uZGl0aW9uOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIGdldCBuZXh0U2xpZGVDb25kaXRpb24oKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uO1xuICB9XG5cbiAgcHJpdmF0ZSBfdHJpZ2dlckNvbmRpdGlvbnM6IHN0cmluZ1tdID0gW107XG4gIGdldCB0cmlnZ2VyQ29uZGl0aW9ucygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zO1xuICB9XG5cbiAgaXNSZXBlYXRpbmdDb250YWluZXJOb2RlOiAobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IG51bGwpID0+IGJvb2xlYW4gPSBub2RlRW50cnkgPT4ge1xuICAgIHJldHVybiBub2RlRW50cnkgIT0gbnVsbCAmJiBpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGUobm9kZUVudHJ5Lm5vZGUpO1xuICB9O1xuXG4gIHByaXZhdGUgX3Zpc2liaWxpdHlPcHRTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfdmlzaWJpbGl0eVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9jb25kaXRpb25hbEJyYW5jaGVzU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9mb3JtdWxhUmVwc1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfY2hvaWNlc0ZpbHRlclN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZm9ybXVsYVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZm9yY2VWYWx1ZVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfdmFsaWRhdGlvbkNvbmRpdGlvbnNTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3dhcm5pbmdDb25kaXRpb25zU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9uZXh0U2xpZGVDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2Nob2ljZXNPcmlnaW5zU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF90cmlnZ2VyQ29uZGl0aW9uc1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0Q29uZGl0aW9uRGlhbG9nOiBNYXREaWFsb2dSZWY8QWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2c+IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX2VkaXRDb25kaXRpb25EaWFsb2dTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2c6IE1hdERpYWxvZ1JlZjxBamZGYlZhbGlkYXRpb25Db25kaXRpb25FZGl0b3JEaWFsb2c+IHwgbnVsbCA9XG4gICAgbnVsbDtcbiAgcHJpdmF0ZSBfZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2c6IE1hdERpYWxvZ1JlZjxBamZGYldhcm5pbmdDb25kaXRpb25FZGl0b3JEaWFsb2c+IHwgbnVsbCA9XG4gICAgbnVsbDtcbiAgcHJpdmF0ZSBfZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2dTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0VmlzaWJpbGl0eUV2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9lZGl0VmlzaWJpbGl0eVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0Q29uZGl0aW9uYWxCcmFuY2hFdnQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHByaXZhdGUgX2VkaXRDb25kaXRpb25hbEJyYW5jaFN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0Rm9ybXVsYVJlcHNFdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfZWRpdEZvcm11bGFSZXBzU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRDaG9pY2VzRmlsdGVyRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2VkaXRDaG9pY2VzRmlsdGVyU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRGb3JtdWxhRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2VkaXRGb3JtdWxhU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRGb3JjZVZhbHVlRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2VkaXRGb3JjZVZhbHVlU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBwcml2YXRlIF9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9hZGRWYWxpZGF0aW9uQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2FkZFZhbGlkYXRpb25Db25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfcmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0V2FybmluZ0NvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfZWRpdFdhcm5pbmdDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfYWRkV2FybmluZ0NvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9hZGRXYXJuaW5nQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX3JlbW92ZVdhcm5pbmdDb25kaXRpb25FdnQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHByaXZhdGUgX3JlbW92ZVdhcm5pbmdDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdE5leHRTbGlkZUNvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9lZGl0TmV4dFNsaWRlQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRUcmlnZ2VyQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBwcml2YXRlIF9lZGl0VHJpZ2dlckNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9hZGRUcmlnZ2VyQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2FkZFRyaWdnZXJDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlVHJpZ2dlckNvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfcmVtb3ZlVHJpZ2dlckNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9zYXZlRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX3NhdmVTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfaXNOb2RlVmFsaWRTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX25vZGVOYW1lQ2hhbmdlZFN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgX3NlcnZpY2U6IEFqZkZvcm1CdWlsZGVyU2VydmljZSxcbiAgICBwcml2YXRlIF9kaWFsb2c6IE1hdERpYWxvZyxcbiAgICBwcml2YXRlIF9mYjogVW50eXBlZEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgX25vZGVOYW1lVmFsaWRhdG9yOiBBamZOb2RlUHJvcGVydGllc05hbWVNYXRjaFZhbGlkYXRvcixcbiAgKSB7XG4gICAgdGhpcy5fbm9kZUVudHJ5ID0gX3NlcnZpY2UuZWRpdGVkTm9kZUVudHJ5O1xuICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zU3ViID0gX3NlcnZpY2UuY2hvaWNlc09yaWdpbnMuc3Vic2NyaWJlKFxuICAgICAgYyA9PiAodGhpcy5fY2hvaWNlc09yaWdpbnMgPSBjIHx8IFtdKSxcbiAgICApO1xuXG4gICAgdGhpcy5fZW5hYmxlZCA9IHRoaXMuX25vZGVFbnRyeS5waXBlKG1hcChuID0+IG4gIT0gbnVsbCkpO1xuXG4gICAgdGhpcy5faW5pdEZvcm0oKTtcbiAgICB0aGlzLl9pbml0VmlzaWJpbGl0eUVkaXQoKTtcbiAgICB0aGlzLl9pbml0Q29uZGl0aW9uYWxCcmFuY2hFZGl0KCk7XG4gICAgdGhpcy5faW5pdEZvcm11bGFSZXBzRWRpdCgpO1xuICAgIHRoaXMuX2luaXRDaG9pY2VzRmlsdGVyRWRpdCgpO1xuICAgIHRoaXMuX2luaXRGb3JtdWxhRWRpdCgpO1xuICAgIHRoaXMuX2luaXRGb3JjZVZhbHVlRWRpdCgpO1xuICAgIHRoaXMuX2luaXRWYWxpZGF0aW9uQ29uZGl0aW9uRWRpdCgpO1xuICAgIHRoaXMuX2luaXRBZGRWYWxpZGF0aW9uQ29uZGl0aW9uKCk7XG4gICAgdGhpcy5faW5pdFJlbW92ZVZhbGlkYXRpb25Db25kaXRpb24oKTtcbiAgICB0aGlzLl9pbml0V2FybmluZ0NvbmRpdGlvbkVkaXQoKTtcbiAgICB0aGlzLl9pbml0QWRkV2FybmluZ0NvbmRpdGlvbigpO1xuICAgIHRoaXMuX2luaXRSZW1vdmVXYXJuaW5nQ29uZGl0aW9uKCk7XG4gICAgdGhpcy5faW5pdE5leHRTbGlkZUNvbmRpdGlvbkVkaXQoKTtcbiAgICB0aGlzLl9pbml0VHJpZ2dlckNvbmRpdGlvbkVkaXQoKTtcbiAgICB0aGlzLl9pbml0QWRkVHJpZ2dlckNvbmRpdGlvbigpO1xuICAgIHRoaXMuX2luaXRSZW1vdmVUcmlnZ2VyQ29uZGl0aW9uKCk7XG4gICAgdGhpcy5faW5pdFNhdmUoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX2lzTm9kZVZhbGlkU3ViID0gdGhpcy5fcHJvcGVydGllc0Zvcm1cbiAgICAgIC5waXBlKFxuICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLl9zZXJ2aWNlLmVkaXRlZE5vZGVFbnRyeSksXG4gICAgICAgIHN3aXRjaE1hcCgoW2Zvcm1Hcm91cCwgX2ZiTm9kZV0pID0+IHtcbiAgICAgICAgICBmb3JtR3JvdXAubWFya0FsbEFzVG91Y2hlZCgpO1xuICAgICAgICAgIGZvcm1Hcm91cC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG5cbiAgICAgICAgICBjb25zdCBuYW1lQ29udHJvbCA9IGZvcm1Hcm91cC5nZXQoJ25hbWUnKTtcblxuICAgICAgICAgIGNvbnN0IG5vZGVWYWxpZGF0aW9uOiBGb3JtQnVpbGRlckZpZWxkVmFsaWRhdGlvbiA9IHtcbiAgICAgICAgICAgIGlzVmFsaWQ6IGZvcm1Hcm91cC52YWxpZCxcbiAgICAgICAgICAgIGVycm9yczogZm9ybUdyb3VwLmVycm9ycyxcbiAgICAgICAgICB9O1xuICAgICAgICAgIGNvbnN0IGZiTm9kZVZhbGlkYXRpb246IEFqZkZvcm1CdWlsZGVyVmFsaWRhdGlvbiA9IHt9O1xuICAgICAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IG5hbWVDb250cm9sPy52YWx1ZSB8fCAnZXJyb3InO1xuICAgICAgICAgIGZiTm9kZVZhbGlkYXRpb25bZmllbGROYW1lXSA9IG5vZGVWYWxpZGF0aW9uO1xuICAgICAgICAgIHRoaXMuX3NlcnZpY2UuZWRpdE5vZGVWYWxpZGF0aW9uKGZiTm9kZVZhbGlkYXRpb24pO1xuXG4gICAgICAgICAgaWYgKG5hbWVDb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLl9ub2RlTmFtZUNoYW5nZWRTdWIgPSBuYW1lQ29udHJvbC52YWx1ZUNoYW5nZXNcbiAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc3RhcnRXaXRoKG5hbWVDb250cm9sLnZhbHVlKSxcbiAgICAgICAgICAgICAgICBwYWlyd2lzZSgpLFxuICAgICAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKChhLCBiKSA9PiBhWzFdID09PSBiWzFdKSxcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuc3Vic2NyaWJlKChbb2xkVmFsdWUsIF9uZXdWYWx1ZV0pID0+IHtcbiAgICAgICAgICAgICAgICAvLyBzZXQgdmFsaWRhdGlvbiB0cnVlIGZvciBvbGQgdW51c2VkIG5hbWVcbiAgICAgICAgICAgICAgICBmYk5vZGVWYWxpZGF0aW9uW29sZFZhbHVlXSA9IHtpc1ZhbGlkOiB0cnVlLCBlcnJvcnM6IG51bGx9O1xuICAgICAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UuZWRpdE5vZGVWYWxpZGF0aW9uKGZiTm9kZVZhbGlkYXRpb24pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gZm9ybUdyb3VwLnN0YXR1c0NoYW5nZXMucGlwZShcbiAgICAgICAgICAgIGZpbHRlcihzdGF0dXMgPT4gc3RhdHVzICE9PSAnVkFMSUQnKSxcbiAgICAgICAgICAgIG1hcCgoKSA9PiB7XG4gICAgICAgICAgICAgIG5vZGVWYWxpZGF0aW9uLmVycm9ycyA9IGZvcm1Hcm91cC5lcnJvcnM7XG4gICAgICAgICAgICAgIG5vZGVWYWxpZGF0aW9uLmlzVmFsaWQgPSBmb3JtR3JvdXAudmFsaWQ7XG4gICAgICAgICAgICAgIGNvbnN0IGN1cnJGaWVsZE5hbWUgPSBmb3JtR3JvdXAuZ2V0KCduYW1lJyk/LnZhbHVlIHx8ICdlcnJvcic7XG4gICAgICAgICAgICAgIGZiTm9kZVZhbGlkYXRpb25bY3VyckZpZWxkTmFtZV0gPSBub2RlVmFsaWRhdGlvbjtcbiAgICAgICAgICAgICAgcmV0dXJuIGZiTm9kZVZhbGlkYXRpb247XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgICAgKTtcbiAgICAgICAgfSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKGZiTm9kZVZhbGlkYXRpb24gPT4ge1xuICAgICAgICB0aGlzLl9zZXJ2aWNlLmVkaXROb2RlVmFsaWRhdGlvbihmYk5vZGVWYWxpZGF0aW9uKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZWRpdFZpc2liaWxpdHkoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdFZpc2liaWxpdHlFdnQuZW1pdCgpO1xuICB9XG5cbiAgZWRpdENvbmRpdGlvbmFsQnJhbmNoKGlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlkeCA8IDAgfHwgaWR4ID49IHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2VkaXRDb25kaXRpb25hbEJyYW5jaEV2dC5lbWl0KGlkeCk7XG4gIH1cblxuICBlZGl0Rm9ybXVsYVJlcHMoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdEZvcm11bGFSZXBzRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIGVkaXRDaG9pY2VzRmlsdGVyKCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRDaG9pY2VzRmlsdGVyRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIGVkaXRGb3JtdWxhKCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRGb3JtdWxhRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIGVkaXRGb3JjZVZhbHVlKCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRGb3JjZVZhbHVlRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIGVkaXRWYWxpZGF0aW9uQ29uZGl0aW9uKGlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlkeCA8IDAgfHwgaWR4ID49IHRoaXMuX3ZhbGlkYXRpb25Db25kaXRpb25zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkV2dC5lbWl0KGlkeCk7XG4gIH1cblxuICBhZGRWYWxpZGF0aW9uQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFZhbGlkYXRpb25Db25kaXRpb25FdnQuZW1pdCgpO1xuICB9XG5cbiAgcmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvbihpZHg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fcmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvbkV2dC5lbWl0KGlkeCk7XG4gIH1cblxuICBlZGl0V2FybmluZ0NvbmRpdGlvbihpZHg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl93YXJuaW5nQ29uZGl0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25FdnQuZW1pdChpZHgpO1xuICB9XG5cbiAgYWRkV2FybmluZ0NvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRXYXJuaW5nQ29uZGl0aW9uRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIHJlbW92ZVdhcm5pbmdDb25kaXRpb24oaWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5fd2FybmluZ0NvbmRpdGlvbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3JlbW92ZVdhcm5pbmdDb25kaXRpb25FdnQuZW1pdChpZHgpO1xuICB9XG5cbiAgZWRpdE5leHRTbGlkZUNvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0TmV4dFNsaWRlQ29uZGl0aW9uRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIGVkaXRUcmlnZ2VyQ29uZGl0aW9uKGlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlkeCA8IDAgfHwgaWR4ID49IHRoaXMuX3RyaWdnZXJDb25kaXRpb25zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9lZGl0VHJpZ2dlckNvbmRpdGlvbkV2dC5lbWl0KGlkeCk7XG4gIH1cblxuICBhZGRUcmlnZ2VyQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRyaWdnZXJDb25kaXRpb25FdnQuZW1pdCgpO1xuICB9XG5cbiAgcmVtb3ZlVHJpZ2dlckNvbmRpdGlvbihpZHg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl90cmlnZ2VyQ29uZGl0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fcmVtb3ZlVHJpZ2dlckNvbmRpdGlvbkV2dC5lbWl0KGlkeCk7XG4gIH1cblxuICBpc0ZpZWxkKG5vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkgfCBudWxsKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG5vZGVFbnRyeSAhPSBudWxsICYmIGlzRmllbGQobm9kZUVudHJ5Lm5vZGUpO1xuICB9XG5cbiAgaXNOdW1lcmljRmllbGQobm9kZTogQWpmTm9kZSk6IG5vZGUgaXMgQWpmTnVtYmVyRmllbGQge1xuICAgIHJldHVybiBpc0ZpZWxkKG5vZGUpICYmIGlzTnVtYmVyRmllbGQobm9kZSk7XG4gIH1cblxuICBpc0VtcHR5RmllbGQobm9kZTogQWpmTm9kZSk6IG5vZGUgaXMgQWpmRW1wdHlGaWVsZCB7XG4gICAgcmV0dXJuIGlzRmllbGQobm9kZSkgJiYgaXNFbXB0eUZpZWxkKG5vZGUpO1xuICB9XG5cbiAgaXNGaWVsZFdpdGhDaG9pY2VzKG5vZGU6IEFqZk5vZGUpOiBub2RlIGlzIEFqZkZpZWxkV2l0aENob2ljZXM8YW55PiB7XG4gICAgcmV0dXJuIGlzRmllbGQobm9kZSkgJiYgaXNGaWVsZFdpdGhDaG9pY2VzKG5vZGUpO1xuICB9XG5cbiAgaGFzQ2hvaWNlc09yaWdpblJlZigpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fcHJvcGVydGllc0Zvcm0ucGlwZShcbiAgICAgIG1hcChmZyA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZmcuZ2V0KCdjaG9pY2VzT3JpZ2luUmVmJyk/LnZhbHVlICE9IG51bGw7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0pLFxuICAgICAgdGFrZSgxKSxcbiAgICApO1xuICB9XG5cbiAgaXNSYW5nZUZpZWxkKG5vZGU6IEFqZk5vZGUpOiBub2RlIGlzIEFqZlJhbmdlRmllbGQge1xuICAgIHJldHVybiBpc0ZpZWxkKG5vZGUpICYmIGlzUmFuZ2VGaWVsZChub2RlKTtcbiAgfVxuXG4gIGlzVGFibGVGaWVsZChub2RlOiBBamZOb2RlKTogbm9kZSBpcyBBamZUYWJsZUZpZWxkIHtcbiAgICByZXR1cm4gaXNGaWVsZChub2RlKSAmJiBpc1RhYmxlRmllbGQobm9kZSk7XG4gIH1cblxuICBmb3JjZUNoZWNrYm94KGNoZWNrZWQ6IGJvb2xlYW4sIGNoZWNrYm94OiBNYXRDaGVja2JveCk6IHZvaWQge1xuICAgIGlmICghY2hlY2tlZCB8fCAhY2hlY2tib3gpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNoZWNrYm94LmNoZWNrZWQpIHtcbiAgICAgIGNoZWNrYm94LnRvZ2dsZSgpO1xuICAgIH1cbiAgfVxuXG4gIHNhdmUoKTogdm9pZCB7XG4gICAgdGhpcy5fc2F2ZUV2dC5lbWl0KCk7XG4gIH1cblxuICBjYW5jZWwoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5jYW5jZWxOb2RlRW50cnlFZGl0KCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGVycm9yIG1lc3NhZ2UgZm9yIHRoZSBmb3JtIGNvbnRyb2xcbiAgICogQHBhcmFtIGZvcm1Db250cm9sXG4gICAqIEBwYXJhbSBmaWVsZE5hbWVcbiAgICogQHJldHVybnNcbiAgICovXG4gIGZpZWxkRXJyb3JNZXNzYWdlKGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2wgfCBudWxsLCBmaWVsZE5hbWU6IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICAgIGlmICghZm9ybUNvbnRyb2wgfHwgIWZpZWxkTmFtZSkgcmV0dXJuIG51bGw7XG4gICAgaWYgKGZvcm1Db250cm9sLmhhc0Vycm9yKCdyZXF1aXJlZCcpKSB7XG4gICAgICByZXR1cm4gYFlvdSBtdXN0IGVudGVyIGEgdmFsdWUgZm9yICR7ZmllbGROYW1lfWA7XG4gICAgfVxuICAgIGlmIChmb3JtQ29udHJvbC5oYXNFcnJvcignbmFtZV9leGlzdHMnKSkge1xuICAgICAgcmV0dXJuIGBUaGlzICR7ZmllbGROYW1lfSBoYXMgYWxyZWFkeSBiZWVuIHVzZWRgO1xuICAgIH1cbiAgICBpZiAoZm9ybUNvbnRyb2wuaGFzRXJyb3IoZmllbGROYW1lKSkge1xuICAgICAgcmV0dXJuIGZvcm1Db250cm9sLmdldEVycm9yKGZpZWxkTmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhbGwgZm9ybSBlcnJvciBtZXNzYWdlc1xuICAgKiBAcGFyYW0gZm9ybUdyb3VwXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBhbGxFcnJvck1lc3NhZ2VzKGZvcm1Hcm91cDogVW50eXBlZEZvcm1Hcm91cCB8IG51bGwpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBpZiAoIWZvcm1Hcm91cCkgcmV0dXJuIG51bGw7XG4gICAgbGV0IGZvcm1FcnJvcnM6IHN0cmluZ1tdID0gW107XG4gICAgaWYgKGZvcm1Hcm91cC5lcnJvcnMgJiYgT2JqZWN0LmtleXMoZm9ybUdyb3VwLmVycm9ycykubGVuZ3RoKSB7XG4gICAgICBmb3JtRXJyb3JzID0gT2JqZWN0LmtleXMoZm9ybUdyb3VwLmVycm9ycykubWFwKGtleSA9PiBgJHtrZXl9OiAke2Zvcm1Hcm91cC5lcnJvcnM/LltrZXldfWApO1xuICAgIH1cblxuICAgIGlmICghZm9ybUVycm9ycy5sZW5ndGggJiYgZm9ybUdyb3VwLmNvbnRyb2xzKSB7XG4gICAgICBmb3JtRXJyb3JzID0gT2JqZWN0LmtleXMoZm9ybUdyb3VwLmNvbnRyb2xzKVxuICAgICAgICAuZmlsdGVyKGtleSA9PiBmb3JtR3JvdXAuY29udHJvbHNba2V5XS5lcnJvcnMpXG4gICAgICAgIC5tYXAoa2V5ID0+IGAke2tleX06ICR7SlNPTi5zdHJpbmdpZnkoZm9ybUdyb3VwLmNvbnRyb2xzW2tleV0uZXJyb3JzKX1gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZm9ybUVycm9ycy5qb2luKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmNhbmNlbCgpO1xuICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zU3ViLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB0aGlzLl92aXNpYmlsaXR5T3B0U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fdmlzaWJpbGl0eVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2Zvcm11bGFSZXBzU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fY2hvaWNlc0ZpbHRlclN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2Zvcm11bGFTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9mb3JjZVZhbHVlU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl93YXJuaW5nQ29uZGl0aW9uc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zU3ViLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuXG4gICAgdGhpcy5fZWRpdENob2ljZXNGaWx0ZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0Q29uZGl0aW9uYWxCcmFuY2hTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0VmlzaWJpbGl0eVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRGb3JtdWxhUmVwc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRGb3JtdWxhU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdEZvcmNlVmFsdWVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB0aGlzLl9hZGRUcmlnZ2VyQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fYWRkVmFsaWRhdGlvbkNvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2FkZFdhcm5pbmdDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0TmV4dFNsaWRlQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdFRyaWdnZXJDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9yZW1vdmVUcmlnZ2VyQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fcmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3JlbW92ZVdhcm5pbmdDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcblxuICAgIHRoaXMuX3NhdmVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9pc05vZGVWYWxpZFN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX25vZGVOYW1lQ2hhbmdlZFN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFNhdmUoKTogdm9pZCB7XG4gICAgdGhpcy5fc2F2ZVN1YiA9IHRoaXMuX3NhdmVFdnRcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMucHJvcGVydGllc0Zvcm0pKVxuICAgICAgLnN1YnNjcmliZSgoW18sIGZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgY29uc3QgZmcgPSBmb3JtR3JvdXAgYXMgVW50eXBlZEZvcm1Hcm91cDtcbiAgICAgICAgY29uc3QgdmFsID0gey4uLmZnLnZhbHVlLCBjb25kaXRpb25hbEJyYW5jaGVzOiB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzfTtcbiAgICAgICAgdGhpcy5fc2VydmljZS5zYXZlTm9kZUVudHJ5KHZhbCk7XG4gICAgICAgIGNvbnN0IGZiTm9kZVZhbGlkYXRpb246IEFqZkZvcm1CdWlsZGVyVmFsaWRhdGlvbiA9IHt9O1xuICAgICAgICBmYk5vZGVWYWxpZGF0aW9uW3ZhbC5uYW1lXSA9IHtpc1ZhbGlkOiB0cnVlLCBlcnJvcnM6IG51bGx9O1xuICAgICAgICBmYk5vZGVWYWxpZGF0aW9uWydlcnJvciddID0ge2lzVmFsaWQ6IHRydWUsIGVycm9yczogbnVsbH07XG4gICAgICAgIHRoaXMuX3NlcnZpY2UuZWRpdE5vZGVWYWxpZGF0aW9uKDxBamZGb3JtQnVpbGRlclZhbGlkYXRpb24+ZmJOb2RlVmFsaWRhdGlvbik7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGb3JtKCk6IHZvaWQge1xuICAgIHRoaXMuX3Byb3BlcnRpZXNGb3JtID0gdGhpcy5fbm9kZUVudHJ5LnBpcGUoXG4gICAgICBmaWx0ZXIobiA9PiBuICE9IG51bGwpLFxuICAgICAgbWFwKG4gPT4ge1xuICAgICAgICBpZiAodGhpcy5fdmlzaWJpbGl0eU9wdFN1YiAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5fdmlzaWJpbGl0eU9wdFN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl92aXNpYmlsaXR5U3ViICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLl92aXNpYmlsaXR5U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXNTdWIgIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobiA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2ZiLmdyb3VwKHt9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZpc2liaWxpdHkgPSBuLm5vZGUudmlzaWJpbGl0eSAhPSBudWxsID8gbi5ub2RlLnZpc2liaWxpdHkuY29uZGl0aW9uIDogbnVsbDtcbiAgICAgICAgY29uc3QgdmlzaWJpbGl0eU9wdCA9XG4gICAgICAgICAgbi5ub2RlLnZpc2liaWxpdHkgIT0gbnVsbCA/IHRoaXMuX2d1ZXNzVmlzaWJpbGl0eU9wdChuLm5vZGUudmlzaWJpbGl0eSkgOiBudWxsO1xuICAgICAgICBsZXQgY29udHJvbHM6IGFueSA9IHtcbiAgICAgICAgICBuYW1lOiBbXG4gICAgICAgICAgICBuLm5vZGUubmFtZSxcbiAgICAgICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXG4gICAgICAgICAgICB0aGlzLl9ub2RlTmFtZVZhbGlkYXRvci5zYW1lVmFsdWVDaGVjayh0aGlzLl9jZHIsIG4ubm9kZS5pZCksXG4gICAgICAgICAgXSxcbiAgICAgICAgICBsYWJlbDogW24ubm9kZS5sYWJlbF0sXG4gICAgICAgICAgdmlzaWJpbGl0eU9wdDogW3Zpc2liaWxpdHlPcHQsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgIHZpc2liaWxpdHk6IFt2aXNpYmlsaXR5LCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICBjb25kaXRpb25hbEJyYW5jaGVzTnVtOiBuLm5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGgsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHZhbGlkYXRvcnM6IFZhbGlkYXRvckZuW10gPSBbXTtcblxuICAgICAgICBpZiAoaXNSZXBlYXRpbmdDb250YWluZXJOb2RlKG4ubm9kZSkpIHtcbiAgICAgICAgICBjb25zdCBybiA9IDxBamZSZXBlYXRpbmdDb250YWluZXJOb2RlPm4ubm9kZTtcblxuICAgICAgICAgIGNvbnN0IGZvcm11bGFSZXBzID0gcm4uZm9ybXVsYVJlcHMgIT0gbnVsbCA/IHJuLmZvcm11bGFSZXBzLmZvcm11bGEgOiBudWxsO1xuXG4gICAgICAgICAgY29udHJvbHMuZm9ybXVsYVJlcHMgPSBbZm9ybXVsYVJlcHNdO1xuICAgICAgICAgIGNvbnRyb2xzLm1heFJlcHMgPSBybi5tYXhSZXBzO1xuXG4gICAgICAgICAgdGhpcy5fY3VyRm9ybXVsYVJlcHMgPSBmb3JtdWxhUmVwcztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHtub2RlfSA9IG47XG5cbiAgICAgICAgaWYgKGlzRmllbGQobm9kZSkpIHtcbiAgICAgICAgICBsZXQgZm9yY2VWYWx1ZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gICAgICAgICAgbGV0IG5vdEVtcHR5OiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgICAgbGV0IHZhbGlkYXRpb25Db25kaXRpb25zOiBWYWxpZGF0aW9uQ29uZGl0aW9uW10gPSBbXTtcbiAgICAgICAgICBpZiAobm9kZS52YWxpZGF0aW9uICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChub2RlLnZhbGlkYXRpb24uZm9yY2VWYWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIGZvcmNlVmFsdWUgPSBub2RlLnZhbGlkYXRpb24uZm9yY2VWYWx1ZS5jb25kaXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub3RFbXB0eSA9IG5vZGUudmFsaWRhdGlvbi5ub3RFbXB0eSAhPSBudWxsO1xuICAgICAgICAgICAgdmFsaWRhdGlvbkNvbmRpdGlvbnMgPSAobm9kZS52YWxpZGF0aW9uLmNvbmRpdGlvbnMgfHwgW10pLm1hcChjID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtjb25kaXRpb246IGMuY29uZGl0aW9uLCBlcnJvck1lc3NhZ2U6IGMuZXJyb3JNZXNzYWdlfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxldCBub3RFbXB0eVc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICBsZXQgd2FybmluZ0NvbmRpdGlvbnM6IFdhcm5pbmdDb25kaXRpb25bXSA9IFtdO1xuICAgICAgICAgIGlmIChub2RlLndhcm5pbmcgIT0gbnVsbCkge1xuICAgICAgICAgICAgbm90RW1wdHlXID0gbm9kZS53YXJuaW5nLm5vdEVtcHR5ICE9IG51bGw7XG4gICAgICAgICAgICB3YXJuaW5nQ29uZGl0aW9ucyA9IChub2RlLndhcm5pbmcuY29uZGl0aW9ucyB8fCBbXSkubWFwKHcgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4ge2NvbmRpdGlvbjogdy5jb25kaXRpb24sIHdhcm5pbmdNZXNzYWdlOiB3Lndhcm5pbmdNZXNzYWdlfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBmb3JtdWxhID0gbm9kZS5mb3JtdWxhICE9IG51bGwgPyBub2RlLmZvcm11bGEuZm9ybXVsYSA6IG51bGw7XG4gICAgICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID1cbiAgICAgICAgICAgIG5vZGUuZGVmYXVsdFZhbHVlICYmIG5vZGUuZGVmYXVsdFZhbHVlLmZvcm11bGEgIT0gbnVsbFxuICAgICAgICAgICAgICA/IG5vZGUuZGVmYXVsdFZhbHVlLmZvcm11bGFcbiAgICAgICAgICAgICAgOiBjbGVhbkRlZmF1bHRWYWx1ZShub2RlLmRlZmF1bHRWYWx1ZSwgbm9kZSk7XG5cbiAgICAgICAgICBjb250cm9scy5kZXNjcmlwdGlvbiA9IG5vZGUuZGVzY3JpcHRpb247XG4gICAgICAgICAgY29udHJvbHMuZGVmYXVsdFZhbHVlID0gZGVmYXVsdFZhbHVlO1xuICAgICAgICAgIGNvbnRyb2xzLmhpbnQgPSBub2RlLmhpbnQ7XG4gICAgICAgICAgY29udHJvbHMuc2l6ZSA9IG5vZGUuc2l6ZTtcbiAgICAgICAgICBjb250cm9scy5mb3JtdWxhID0gZm9ybXVsYTtcbiAgICAgICAgICBjb250cm9scy5mb3JjZVZhbHVlID0gZm9yY2VWYWx1ZTtcbiAgICAgICAgICBjb250cm9scy5ub3RFbXB0eSA9IG5vdEVtcHR5O1xuICAgICAgICAgIGNvbnRyb2xzLnZhbGlkYXRpb25Db25kaXRpb25zID0gW3ZhbGlkYXRpb25Db25kaXRpb25zLCBbXV07XG4gICAgICAgICAgY29udHJvbHMubm90RW1wdHlXYXJuaW5nID0gbm90RW1wdHlXO1xuICAgICAgICAgIGNvbnRyb2xzLnJlYWRvbmx5RmllbGQgPSBub2RlLmVkaXRhYmxlICE9IG51bGwgPyAhbm9kZS5lZGl0YWJsZSA6IGZhbHNlO1xuICAgICAgICAgIGNvbnRyb2xzLndhcm5pbmdDb25kaXRpb25zID0gW3dhcm5pbmdDb25kaXRpb25zLCBbXV07XG4gICAgICAgICAgY29udHJvbHMubmV4dFNsaWRlQ29uZGl0aW9uID0gW25vZGUubmV4dFNsaWRlQ29uZGl0aW9uXTtcblxuICAgICAgICAgIHRoaXMuX2N1ckZvcmNlVmFsdWUgPSBmb3JjZVZhbHVlO1xuICAgICAgICAgIHRoaXMuX2N1ckZvcm11bGEgPSBmb3JtdWxhO1xuICAgICAgICAgIHRoaXMuX3ZhbGlkYXRpb25Db25kaXRpb25zID0gdmFsaWRhdGlvbkNvbmRpdGlvbnM7XG4gICAgICAgICAgdGhpcy5fd2FybmluZ0NvbmRpdGlvbnMgPSB3YXJuaW5nQ29uZGl0aW9ucztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzTnVtZXJpY0ZpZWxkKG5vZGUpKSB7XG4gICAgICAgICAgbGV0IG1pblZhbHVlOiBhbnk7XG4gICAgICAgICAgbGV0IG1heFZhbHVlOiBhbnk7XG4gICAgICAgICAgbGV0IG1pbkRpZ2l0czogYW55O1xuICAgICAgICAgIGxldCBtYXhEaWdpdHM6IGFueTtcbiAgICAgICAgICBpZiAobm9kZS52YWxpZGF0aW9uICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChub2RlLnZhbGlkYXRpb24ubWluVmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBtaW5WYWx1ZSA9IChub2RlLnZhbGlkYXRpb24ubWluVmFsdWUuY29uZGl0aW9uIHx8ICcnKS5yZXBsYWNlKCckdmFsdWUgPj0gJywgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vZGUudmFsaWRhdGlvbi5tYXhWYWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIG1heFZhbHVlID0gKG5vZGUudmFsaWRhdGlvbi5tYXhWYWx1ZS5jb25kaXRpb24gfHwgJycpLnJlcGxhY2UoJyR2YWx1ZSA8PSAnLCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm9kZS52YWxpZGF0aW9uLm1pbkRpZ2l0cyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIG1pbkRpZ2l0cyA9IChub2RlLnZhbGlkYXRpb24ubWluRGlnaXRzLmNvbmRpdGlvbiB8fCAnJykucmVwbGFjZShcbiAgICAgICAgICAgICAgICAnJHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoID49ICcsXG4gICAgICAgICAgICAgICAgJycsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm9kZS52YWxpZGF0aW9uLm1heERpZ2l0cyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIG1heERpZ2l0cyA9IChub2RlLnZhbGlkYXRpb24ubWF4RGlnaXRzLmNvbmRpdGlvbiB8fCAnJykucmVwbGFjZShcbiAgICAgICAgICAgICAgICAnJHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoIDw9ICcsXG4gICAgICAgICAgICAgICAgJycsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udHJvbHMubWluVmFsdWUgPSBtaW5WYWx1ZTtcbiAgICAgICAgICBjb250cm9scy5tYXhWYWx1ZSA9IG1heFZhbHVlO1xuICAgICAgICAgIGNvbnRyb2xzLm1pbkRpZ2l0cyA9IG1pbkRpZ2l0cztcbiAgICAgICAgICBjb250cm9scy5tYXhEaWdpdHMgPSBtYXhEaWdpdHM7XG5cbiAgICAgICAgICB2YWxpZGF0b3JzLnB1c2goY2hlY2tWYWx1ZUxpbWl0c1ZhbGlkaXR5KTtcbiAgICAgICAgICB2YWxpZGF0b3JzLnB1c2goY2hlY2tEaWdpdHNWYWxpZGl0eSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc0VtcHR5RmllbGQobm9kZSkpIHtcbiAgICAgICAgICBjb25zdCB7SFRNTH0gPSBub2RlO1xuICAgICAgICAgIGNvbnRyb2xzLkhUTUwgPSBIVE1MO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNSYW5nZUZpZWxkKG5vZGUpKSB7XG4gICAgICAgICAgY29uc3Qge3N0YXJ0LCBlbmQsIHN0ZXAsIGFwcGVhcmFuY2V9ID0gbm9kZTtcblxuICAgICAgICAgIGNvbnRyb2xzLnN0YXJ0ID0gc3RhcnQ7XG4gICAgICAgICAgY29udHJvbHMuZW5kID0gZW5kO1xuICAgICAgICAgIGNvbnRyb2xzLnN0ZXAgPSBzdGVwO1xuICAgICAgICAgIGNvbnRyb2xzLmFwcGVhcmFuY2UgPSBhcHBlYXJhbmNlID8/IG51bGw7XG5cbiAgICAgICAgICB2YWxpZGF0b3JzLnB1c2goY2hlY2tSYW5nZVZhbGlkaXR5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzRmllbGRXaXRoQ2hvaWNlcyhub2RlKSkge1xuICAgICAgICAgIGxldCB0cmlnZ2VyQ29uZGl0aW9uczogc3RyaW5nW10gPSAobm9kZS50cmlnZ2VyQ29uZGl0aW9ucyB8fCBbXSkubWFwKGMgPT4gYy5jb25kaXRpb24pO1xuXG4gICAgICAgICAgY29udHJvbHMuY2hvaWNlc09yaWdpblJlZiA9IFsobm9kZSBhcyBhbnkpLmNob2ljZXNPcmlnaW5SZWYsIFZhbGlkYXRvcnMucmVxdWlyZWRdO1xuICAgICAgICAgIGNvbnRyb2xzLmNob2ljZXNGaWx0ZXIgPSBub2RlLmNob2ljZXNGaWx0ZXIgIT0gbnVsbCA/IG5vZGUuY2hvaWNlc0ZpbHRlci5mb3JtdWxhIDogbnVsbDtcbiAgICAgICAgICBjb250cm9scy5mb3JjZUV4cGFuZGVkID0gbm9kZS5mb3JjZUV4cGFuZGVkO1xuICAgICAgICAgIGNvbnRyb2xzLmZvcmNlTmFycm93ID0gbm9kZS5mb3JjZU5hcnJvdztcbiAgICAgICAgICBjb250cm9scy50cmlnZ2VyQ29uZGl0aW9ucyA9IHRyaWdnZXJDb25kaXRpb25zO1xuXG4gICAgICAgICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnMgPSB0cmlnZ2VyQ29uZGl0aW9ucztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzVGFibGVGaWVsZChub2RlKSkge1xuICAgICAgICAgIGNvbnN0IHtjb2x1bW5UeXBlcywgcm93cywgY29sdW1uTGFiZWxzLCByb3dMYWJlbHN9ID0gbm9kZTtcbiAgICAgICAgICBjb25zdCB0YWJsZURlZiA9IHtjb2x1bW5UeXBlcywgcm93cywgY29sdW1uTGFiZWxzLCByb3dMYWJlbHN9O1xuICAgICAgICAgIGNvbnRyb2xzLnRhYmxlRGVmID0gW1xuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkodGFibGVEZWYsIHVuZGVmaW5lZCwgMiksXG4gICAgICAgICAgICBbVmFsaWRhdG9ycy5yZXF1aXJlZCwgY2hlY2tUYWJsZVZhbGlkaXR5XSxcbiAgICAgICAgICBdO1xuICAgICAgICAgIGNvbnRyb2xzLmhpZGVFbXB0eVJvd3MgPSBub2RlLmhpZGVFbXB0eVJvd3M7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmZyA9IHRoaXMuX2ZiLmdyb3VwKGNvbnRyb2xzKTtcbiAgICAgICAgZmcuc2V0VmFsaWRhdG9ycyh2YWxpZGF0b3JzKTtcblxuICAgICAgICBmZy5tYXJrQWxsQXNUb3VjaGVkKCk7XG4gICAgICAgIGZnLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoe29ubHlTZWxmOiBmYWxzZSwgZW1pdEV2ZW50OiB0cnVlfSk7XG5cbiAgICAgICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlcyA9IG4ubm9kZS5jb25kaXRpb25hbEJyYW5jaGVzLm1hcChjID0+IGMuY29uZGl0aW9uKTtcbiAgICAgICAgdGhpcy5fY3VyVmlzaWJpbGl0eSA9IG4ubm9kZS52aXNpYmlsaXR5ICE9IG51bGwgPyBuLm5vZGUudmlzaWJpbGl0eS5jb25kaXRpb24gOiBudWxsO1xuXG4gICAgICAgIHRoaXMuX2hhbmRsZUNvbmRpdGlvbmFsQnJhbmNoZXNDaGFuZ2UoZmcpO1xuICAgICAgICB0aGlzLl9oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlKGZnKTtcbiAgICAgICAgdGhpcy5faGFuZGxlRm9ybXVsYVJlcHNDaGFuZ2UoZmcpO1xuICAgICAgICB0aGlzLl9oYW5kbGVDaG9pY2VzRmlsdGVyQ2hhbmdlKGZnKTtcbiAgICAgICAgdGhpcy5faGFuZGxlRm9ybXVsYUNoYW5nZShmZyk7XG4gICAgICAgIHRoaXMuX2hhbmRsZUZvcmNlVmFsdWVDaGFuZ2UoZmcpO1xuICAgICAgICB0aGlzLl9oYW5kbGVWYWxpZGF0aW9uQ29uZHRpb25zQ2hhbmdlKGZnKTtcbiAgICAgICAgdGhpcy5faGFuZGxlV2FybmluZ0NvbmR0aW9uc0NoYW5nZShmZyk7XG4gICAgICAgIHRoaXMuX2hhbmRsZU5leHRTbGlkZUNvbmRpdGlvbkNoYW5nZShmZyk7XG4gICAgICAgIHRoaXMuX2hhbmRsZVRyaWdnZXJDb25kdGlvbnNDaGFuZ2UoZmcpO1xuXG4gICAgICAgIHJldHVybiBmZztcbiAgICAgIH0pLFxuICAgICAgc2hhcmVSZXBsYXkoMSksXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5jbG9zZSgpO1xuICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZGVzdHJveVZhbGlkYXRpb25Db25kaXRpb25EaWFsb2coKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nU3ViICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nLmNsb3NlKCk7XG4gICAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZyA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZGVzdHJveVdhcm5pbmdDb25kaXRpb25EaWFsb2coKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nU3ViICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nLmNsb3NlKCk7XG4gICAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZyA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFJlbW92ZVRyaWdnZXJDb25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlVHJpZ2dlckNvbmRpdGlvblN1YiA9IHRoaXMuX3JlbW92ZVRyaWdnZXJDb25kaXRpb25FdnRcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgIC5zdWJzY3JpYmUoKFt2Y0lkeCwgZm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICBpZiAoZm9ybUdyb3VwID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmcgPSBmb3JtR3JvdXAgYXMgVW50eXBlZEZvcm1Hcm91cDtcbiAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWyd0cmlnZ2VyQ29uZGl0aW9ucyddO1xuICAgICAgICBsZXQgdmNzID0gKGN0cmwudmFsdWUgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICBpZiAodmNJZHggPCAwIHx8IHZjSWR4ID49IHZjcy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmNzLnNwbGljZSh2Y0lkeCwgMSk7XG4gICAgICAgIGN0cmwuc2V0VmFsdWUodmNzKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEFkZFRyaWdnZXJDb25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVHJpZ2dlckNvbmRpdGlvblN1YiA9IHRoaXMuX2FkZFRyaWdnZXJDb25kaXRpb25FdnRcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgIC5zdWJzY3JpYmUoKFtfLCBmb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgIGlmIChmb3JtR3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmZyA9IGZvcm1Hcm91cCBhcyBVbnR5cGVkRm9ybUdyb3VwO1xuICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ3RyaWdnZXJDb25kaXRpb25zJ107XG4gICAgICAgIGxldCB2Y3MgPSAoY3RybC52YWx1ZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgIHZjcy5wdXNoKCcnKTtcbiAgICAgICAgY3RybC5zZXRWYWx1ZSh2Y3MpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0VHJpZ2dlckNvbmRpdGlvbkVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgdGhpcy5fZWRpdFRyaWdnZXJDb25kaXRpb25TdWIgPSB0aGlzLl9lZGl0VHJpZ2dlckNvbmRpdGlvbkV2dFxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgLnN1YnNjcmliZSgoW3ZjSWR4LCBmZ10pID0+IHtcbiAgICAgICAgdGhpcy5fZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpO1xuICAgICAgICBpZiAodmNJZHggPCAwIHx8IHZjSWR4ID49IHRoaXMuX3RyaWdnZXJDb25kaXRpb25zLmxlbmd0aCB8fCBmZyA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgIGNvbnN0IGNtcCA9IHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2U7XG4gICAgICAgIGNtcC5jb25kaXRpb24gPSB0aGlzLl90cmlnZ2VyQ29uZGl0aW9uc1t2Y0lkeF07XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nXG4gICAgICAgICAgLmFmdGVyQ2xvc2VkKClcbiAgICAgICAgICAuc3Vic2NyaWJlKChjb25kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNbdmNJZHhdID0gY29uZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRSZW1vdmVXYXJuaW5nQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZVdhcm5pbmdDb25kaXRpb25TdWIgPSB0aGlzLl9yZW1vdmVXYXJuaW5nQ29uZGl0aW9uRXZ0XG4gICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAuc3Vic2NyaWJlKChbdmNJZHgsIGZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgaWYgKGZvcm1Hcm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZnID0gZm9ybUdyb3VwIGFzIFVudHlwZWRGb3JtR3JvdXA7XG4gICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1snd2FybmluZ0NvbmRpdGlvbnMnXTtcbiAgICAgICAgbGV0IHZjcyA9IChjdHJsLnZhbHVlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgaWYgKHZjSWR4IDwgMCB8fCB2Y0lkeCA+PSB2Y3MubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZjcy5zcGxpY2UodmNJZHgsIDEpO1xuICAgICAgICBjdHJsLnNldFZhbHVlKHZjcyk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRBZGRXYXJuaW5nQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFdhcm5pbmdDb25kaXRpb25TdWIgPSB0aGlzLl9hZGRXYXJuaW5nQ29uZGl0aW9uRXZ0XG4gICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAuc3Vic2NyaWJlKChbXywgZm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICBpZiAoZm9ybUdyb3VwID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmcgPSBmb3JtR3JvdXAgYXMgVW50eXBlZEZvcm1Hcm91cDtcbiAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWyd3YXJuaW5nQ29uZGl0aW9ucyddO1xuICAgICAgICBsZXQgdmNzID0gKGN0cmwudmFsdWUgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICB2Y3MucHVzaCh7Y29uZGl0aW9uOiAnJywgZXJyb3JNZXNzYWdlOiAnJ30pO1xuICAgICAgICBjdHJsLnNldFZhbHVlKHZjcyk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRXYXJuaW5nQ29uZGl0aW9uRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvblN1YiA9IHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRXZ0XG4gICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAuc3Vic2NyaWJlKChbdmNJZHgsIGZnXSkgPT4ge1xuICAgICAgICB0aGlzLl9kZXN0cm95V2FybmluZ0NvbmRpdGlvbkRpYWxvZygpO1xuICAgICAgICBpZiAodmNJZHggPCAwIHx8IHZjSWR4ID49IHRoaXMuX3dhcm5pbmdDb25kaXRpb25zLmxlbmd0aCB8fCBmZyA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJXYXJuaW5nQ29uZGl0aW9uRWRpdG9yRGlhbG9nKTtcbiAgICAgICAgY29uc3QgY21wID0gdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2U7XG4gICAgICAgIGNvbnN0IHcgPSB0aGlzLl93YXJuaW5nQ29uZGl0aW9uc1t2Y0lkeF07XG4gICAgICAgIGNtcC5jb25kaXRpb24gPSB3LmNvbmRpdGlvbjtcbiAgICAgICAgY21wLndhcm5pbmdNZXNzYWdlID0gdy53YXJuaW5nTWVzc2FnZTtcbiAgICAgICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2dTdWIgPSB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZ1xuICAgICAgICAgIC5hZnRlckNsb3NlZCgpXG4gICAgICAgICAgLnN1YnNjcmliZSgoY29uZDogV2FybmluZ0NvbmRpdGlvbikgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICB0aGlzLl93YXJuaW5nQ29uZGl0aW9uc1t2Y0lkeF0gPSBjb25kO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0UmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVWYWxpZGF0aW9uQ29uZGl0aW9uU3ViID0gdGhpcy5fcmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvbkV2dFxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgLnN1YnNjcmliZSgoW3ZjSWR4LCBmb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgIGlmIChmb3JtR3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmZyA9IGZvcm1Hcm91cCBhcyBVbnR5cGVkRm9ybUdyb3VwO1xuICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ3ZhbGlkYXRpb25Db25kaXRpb25zJ107XG4gICAgICAgIGxldCB2Y3MgPSAoY3RybC52YWx1ZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgIGlmICh2Y0lkeCA8IDAgfHwgdmNJZHggPj0gdmNzLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2Y3Muc3BsaWNlKHZjSWR4LCAxKTtcbiAgICAgICAgY3RybC5zZXRWYWx1ZSh2Y3MpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0QWRkVmFsaWRhdGlvbkNvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRWYWxpZGF0aW9uQ29uZGl0aW9uU3ViID0gdGhpcy5fYWRkVmFsaWRhdGlvbkNvbmRpdGlvbkV2dFxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgLnN1YnNjcmliZSgoW18sIGZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgaWYgKGZvcm1Hcm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZnID0gZm9ybUdyb3VwIGFzIFVudHlwZWRGb3JtR3JvdXA7XG4gICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1sndmFsaWRhdGlvbkNvbmRpdGlvbnMnXTtcbiAgICAgICAgbGV0IHZjcyA9IChjdHJsLnZhbHVlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgdmNzLnB1c2goe2NvbmRpdGlvbjogJycsIGVycm9yTWVzc2FnZTogJyd9KTtcbiAgICAgICAgY3RybC5zZXRWYWx1ZSh2Y3MpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0VmFsaWRhdGlvbkNvbmRpdGlvbkVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25TdWIgPSB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkV2dFxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgLnN1YnNjcmliZSgoW3ZjSWR4LCBmZ10pID0+IHtcbiAgICAgICAgdGhpcy5fZGVzdHJveVZhbGlkYXRpb25Db25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgaWYgKHZjSWR4IDwgMCB8fCB2Y0lkeCA+PSB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9ucy5sZW5ndGggfHwgZmcgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZyA9IHRoaXMuX2RpYWxvZy5vcGVuKFxuICAgICAgICAgIEFqZkZiVmFsaWRhdGlvbkNvbmRpdGlvbkVkaXRvckRpYWxvZyxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgY21wID0gdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2U7XG4gICAgICAgIGNvbnN0IHYgPSB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9uc1t2Y0lkeF07XG4gICAgICAgIGNtcC5jb25kaXRpb24gPSB2LmNvbmRpdGlvbjtcbiAgICAgICAgY21wLmVycm9yTWVzc2FnZSA9IHYuZXJyb3JNZXNzYWdlO1xuICAgICAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZ1N1YiA9IHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nXG4gICAgICAgICAgLmFmdGVyQ2xvc2VkKClcbiAgICAgICAgICAuc3Vic2NyaWJlKChjb25kOiBWYWxpZGF0aW9uQ29uZGl0aW9uKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIHRoaXMuX3ZhbGlkYXRpb25Db25kaXRpb25zW3ZjSWR4XSA9IGNvbmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGb3JjZVZhbHVlRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Rm9yY2VWYWx1ZVN1YiA9IHRoaXMuX2VkaXRGb3JjZVZhbHVlRXZ0XG4gICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAuc3Vic2NyaWJlKChbXywgZm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICB0aGlzLl9kZXN0cm95Q29uZGl0aW9uRGlhbG9nKCk7XG4gICAgICAgIGlmIChmb3JtR3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmZyA9IGZvcm1Hcm91cCBhcyBVbnR5cGVkRm9ybUdyb3VwO1xuICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ2ZvcmNlVmFsdWUnXTtcbiAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyA9IHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nKTtcbiAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5jb25kaXRpb24gPSBjdHJsLnZhbHVlO1xuICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1xuICAgICAgICAgIC5hZnRlckNsb3NlZCgpXG4gICAgICAgICAgLnN1YnNjcmliZSgoY29uZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUoY29uZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0TmV4dFNsaWRlQ29uZGl0aW9uRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0TmV4dFNsaWRlQ29uZGl0aW9uU3ViID0gdGhpcy5fZWRpdE5leHRTbGlkZUNvbmRpdGlvbkV2dFxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgLnN1YnNjcmliZSgoW18sIGZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgdGhpcy5fZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpO1xuICAgICAgICBpZiAoZm9ybUdyb3VwID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmcgPSBmb3JtR3JvdXAgYXMgVW50eXBlZEZvcm1Hcm91cDtcbiAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWyduZXh0U2xpZGVDb25kaXRpb24nXTtcbiAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyA9IHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nKTtcbiAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5jb25kaXRpb24gPSBjdHJsLnZhbHVlO1xuICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1xuICAgICAgICAgIC5hZnRlckNsb3NlZCgpXG4gICAgICAgICAgLnN1YnNjcmliZSgoY29uZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUoY29uZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Rm9ybXVsYUVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgdGhpcy5fZWRpdEZvcm11bGFTdWIgPSB0aGlzLl9lZGl0Rm9ybXVsYUV2dFxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgLnN1YnNjcmliZSgoW18sIGZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgdGhpcy5fZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpO1xuICAgICAgICBpZiAoZm9ybUdyb3VwID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmcgPSBmb3JtR3JvdXAgYXMgVW50eXBlZEZvcm1Hcm91cDtcbiAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWydmb3JtdWxhJ107XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29uZGl0aW9uID0gY3RybC52YWx1ZTtcbiAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dcbiAgICAgICAgICAuYWZ0ZXJDbG9zZWQoKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGNvbmQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKGNvbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEZvcm11bGFSZXBzRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Rm9ybXVsYVJlcHNTdWIgPSB0aGlzLl9lZGl0Rm9ybXVsYVJlcHNFdnRcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgIC5zdWJzY3JpYmUoKFtfLCBmb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgaWYgKGZvcm1Hcm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZnID0gZm9ybUdyb3VwIGFzIFVudHlwZWRGb3JtR3JvdXA7XG4gICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1snZm9ybXVsYVJlcHMnXTtcbiAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyA9IHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nKTtcbiAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5jb25kaXRpb24gPSBjdHJsLnZhbHVlO1xuICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1xuICAgICAgICAgIC5hZnRlckNsb3NlZCgpXG4gICAgICAgICAgLnN1YnNjcmliZSgoY29uZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUoY29uZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Q2hvaWNlc0ZpbHRlckVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdENob2ljZXNGaWx0ZXJTdWIgPSB0aGlzLl9lZGl0Q2hvaWNlc0ZpbHRlckV2dFxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgLnN1YnNjcmliZSgoW18sIGZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgdGhpcy5fZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpO1xuICAgICAgICBpZiAoZm9ybUdyb3VwID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmcgPSBmb3JtR3JvdXAgYXMgVW50eXBlZEZvcm1Hcm91cDtcbiAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWydjaG9pY2VzRmlsdGVyJ107XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29uZGl0aW9uID0gY3RybC52YWx1ZTtcbiAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dcbiAgICAgICAgICAuYWZ0ZXJDbG9zZWQoKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGNvbmQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKGNvbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdENvbmRpdGlvbmFsQnJhbmNoRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Q29uZGl0aW9uYWxCcmFuY2hTdWIgPSB0aGlzLl9lZGl0Q29uZGl0aW9uYWxCcmFuY2hFdnRcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgIC5zdWJzY3JpYmUoKFtjYklkeCwgZmddKSA9PiB7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgaWYgKGNiSWR4IDwgMCB8fCBjYklkeCA+PSB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aCB8fCBmZyA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29uZGl0aW9uID0gdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlc1tjYklkeF07XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nXG4gICAgICAgICAgLmFmdGVyQ2xvc2VkKClcbiAgICAgICAgICAuc3Vic2NyaWJlKChjb25kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlc1tjYklkeF0gPSBjb25kO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFZpc2liaWxpdHlFZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRWaXNpYmlsaXR5U3ViID0gdGhpcy5fZWRpdFZpc2liaWxpdHlFdnRcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgIC5zdWJzY3JpYmUoKFtfLCBmb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgaWYgKGZvcm1Hcm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZnID0gZm9ybUdyb3VwIGFzIFVudHlwZWRGb3JtR3JvdXA7XG4gICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1sndmlzaWJpbGl0eSddO1xuICAgICAgICBjb25zdCBjb25kaXRpb24gPSBjdHJsLnZhbHVlO1xuICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2cpO1xuICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNvbmRpdGlvbiA9IGNvbmRpdGlvbjtcbiAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dcbiAgICAgICAgICAuYWZ0ZXJDbG9zZWQoKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGNvbmQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKGNvbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlVHJpZ2dlckNvbmR0aW9uc0NoYW5nZShmZzogVW50eXBlZEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zU3ViID0gZmcudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoXG4gICAgICAgICAgKHYxLCB2MikgPT4gSlNPTi5zdHJpbmdpZnkodjEudHJpZ2dlckNvbmRpdGlvbnMpID09PSBKU09OLnN0cmluZ2lmeSh2Mi50cmlnZ2VyQ29uZGl0aW9ucyksXG4gICAgICAgICksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnMgPSB2LnRyaWdnZXJDb25kaXRpb25zO1xuICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZVdhcm5pbmdDb25kdGlvbnNDaGFuZ2UoZmc6IFVudHlwZWRGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl93YXJuaW5nQ29uZGl0aW9uc1N1YiA9IGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKFxuICAgICAgICAgICh2MSwgdjIpID0+IEpTT04uc3RyaW5naWZ5KHYxLndhcm5pbmdDb25kaXRpb25zKSA9PT0gSlNPTi5zdHJpbmdpZnkodjIud2FybmluZ0NvbmRpdGlvbnMpLFxuICAgICAgICApLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgodjogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuX3dhcm5pbmdDb25kaXRpb25zID0gdi53YXJuaW5nQ29uZGl0aW9ucztcbiAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVWYWxpZGF0aW9uQ29uZHRpb25zQ2hhbmdlKGZnOiBVbnR5cGVkRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnNTdWIgPSBmZy52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZChcbiAgICAgICAgICAodjEsIHYyKSA9PlxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkodjEudmFsaWRhdGlvbkNvbmRpdGlvbnMpID09PSBKU09OLnN0cmluZ2lmeSh2Mi52YWxpZGF0aW9uQ29uZGl0aW9ucyksXG4gICAgICAgICksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnMgPSB2LnZhbGlkYXRpb25Db25kaXRpb25zO1xuICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZUZvcmNlVmFsdWVDaGFuZ2UoZmc6IFVudHlwZWRGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl9mb3JjZVZhbHVlU3ViID0gZmcudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PiB2MS5mb3JjZVZhbHVlID09PSB2Mi5mb3JjZVZhbHVlKSlcbiAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLl9jdXJGb3JjZVZhbHVlID0gdi5mb3JjZVZhbHVlO1xuICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZU5leHRTbGlkZUNvbmRpdGlvbkNoYW5nZShmZzogVW50eXBlZEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuX2Zvcm11bGFTdWIgPSBmZy52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh2MSwgdjIpID0+IHYxLm5leHRTbGlkZUNvbmRpdGlvbiA9PT0gdjIubmV4dFNsaWRlQ29uZGl0aW9uKSlcbiAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLl9uZXh0U2xpZGVDb25kaXRpb24gPSB2Lm5leHRTbGlkZUNvbmRpdGlvbjtcbiAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgdGhpcy5fZm9ybXVsYVN1YiA9IGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKHYxLCB2MikgPT4gdjEubmV4dFNsaWRlQ29uZGl0aW9uID09PSB2Mi5uZXh0U2xpZGVDb25kaXRpb24pKVxuICAgICAgLnN1YnNjcmliZSgodjogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuX25leHRTbGlkZUNvbmRpdGlvbiA9IHYubmV4dFNsaWRlQ29uZGl0aW9uO1xuICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZUZvcm11bGFDaGFuZ2UoZmc6IFVudHlwZWRGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl9mb3JtdWxhU3ViID0gZmcudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PiB2MS5mb3JtdWxhID09PSB2Mi5mb3JtdWxhKSlcbiAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLl9jdXJGb3JtdWxhID0gdi5mb3JtdWxhO1xuICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZUZvcm11bGFSZXBzQ2hhbmdlKGZnOiBVbnR5cGVkRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fZm9ybXVsYVJlcHNTdWIgPSBmZy52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh2MSwgdjIpID0+IHYxLmZvcm11bGFSZXBzID09PSB2Mi5mb3JtdWxhUmVwcykpXG4gICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5fY3VyRm9ybXVsYVJlcHMgPSB2LmZvcm11bGFSZXBzO1xuICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZUNob2ljZXNGaWx0ZXJDaGFuZ2UoZmc6IFVudHlwZWRGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl9jaG9pY2VzRmlsdGVyU3ViID0gZmcudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PiB2MS5jaG9pY2VzRmlsdGVyID09PSB2Mi5jaG9pY2VzRmlsdGVyKSlcbiAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLl9jdXJDaG9pY2VzRmlsdGVyID0gdi5jaG9pY2VzRmlsdGVyO1xuICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZUNvbmRpdGlvbmFsQnJhbmNoZXNDaGFuZ2UoZmc6IFVudHlwZWRGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzU3ViID0gZmcudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKHYxLCB2MikgPT4gdjEuY29uZGl0aW9uYWxCcmFuY2hlc051bSA9PT0gdjIuY29uZGl0aW9uYWxCcmFuY2hlc051bSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgY29uc3QgY2JOdW06IG51bWJlciA9IHYuY29uZGl0aW9uYWxCcmFuY2hlc051bTtcbiAgICAgICAgY29uc3QgY3VyQ2JOdW0gPSB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aDtcbiAgICAgICAgaWYgKGN1ckNiTnVtIDwgY2JOdW0pIHtcbiAgICAgICAgICBsZXQgbmV3Q2JzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgIGZvciAobGV0IGkgPSBjdXJDYk51bTsgaSA8IGNiTnVtOyBpKyspIHtcbiAgICAgICAgICAgIG5ld0Nicy5wdXNoKGFsd2F5c0NvbmRpdGlvbigpLmNvbmRpdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXMgPSB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzLmNvbmNhdChuZXdDYnMpO1xuICAgICAgICB9IGVsc2UgaWYgKGN1ckNiTnVtID4gY2JOdW0pIHtcbiAgICAgICAgICB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzLnNwbGljZSgwLCBjdXJDYk51bSAtIGNiTnVtKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZVZpc2liaWxpdHlDaGFuZ2UoZmc6IFVudHlwZWRGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl92aXNpYmlsaXR5U3ViID0gZmcudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PiB2MS52aXNpYmlsaXR5T3B0ID09PSB2Mi52aXNpYmlsaXR5T3B0KSlcbiAgICAgIC5zdWJzY3JpYmUodiA9PiB7XG4gICAgICAgIGNvbnN0IHZpc2liaWxpdHlPcHQgPSB2LnZpc2liaWxpdHlPcHQ7XG4gICAgICAgIGNvbnN0IHZpc2liaWxpdHk6IHN0cmluZyA9IHYudmlzaWJpbGl0eTtcbiAgICAgICAgbGV0IG5ld0NvbmRpdGlvbjogc3RyaW5nIHwgbnVsbDtcbiAgICAgICAgc3dpdGNoICh2aXNpYmlsaXR5T3B0KSB7XG4gICAgICAgICAgY2FzZSAnYWx3YXlzJzpcbiAgICAgICAgICAgIG5ld0NvbmRpdGlvbiA9IGFsd2F5c0NvbmRpdGlvbigpLmNvbmRpdGlvbjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ25ldmVyJzpcbiAgICAgICAgICAgIG5ld0NvbmRpdGlvbiA9IG5ldmVyQ29uZGl0aW9uKCkuY29uZGl0aW9uO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnY29uZGl0aW9uJzpcbiAgICAgICAgICAgIG5ld0NvbmRpdGlvbiA9IHZpc2liaWxpdHkgJiYgdmlzaWJpbGl0eS5sZW5ndGggPyB2aXNpYmlsaXR5IDogbnVsbDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBuZXdDb25kaXRpb24gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2N1clZpc2liaWxpdHkgPSBuZXdDb25kaXRpb247XG4gICAgICAgIGZnLmNvbnRyb2xzWyd2aXNpYmlsaXR5J10uc2V0VmFsdWUobmV3Q29uZGl0aW9uKTtcbiAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgdGhpcy5fdmlzaWJpbGl0eVN1YiA9IGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcih2ID0+IHYudmlzaWJpbGl0eU9wdCA9PT0gJ2NvbmRpdGlvbicpLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PiB2MS52aXNpYmlsaXR5ID09PSB2Mi52aXNpYmlsaXR5KSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUodiA9PiB7XG4gICAgICAgIHRoaXMuX2N1clZpc2liaWxpdHkgPSB2LnZpc2liaWxpdHk7XG4gICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ3Vlc3NWaXNpYmlsaXR5T3B0KGNvbmRpdGlvbjogQWpmQ29uZGl0aW9uKTogc3RyaW5nIHtcbiAgICBpZiAoY29uZGl0aW9uLmNvbmRpdGlvbi5sb2NhbGVDb21wYXJlKGFsd2F5c0NvbmRpdGlvbigpLmNvbmRpdGlvbikgPT09IDApIHtcbiAgICAgIHJldHVybiAnYWx3YXlzJztcbiAgICB9XG4gICAgaWYgKGNvbmRpdGlvbi5jb25kaXRpb24ubG9jYWxlQ29tcGFyZShuZXZlckNvbmRpdGlvbigpLmNvbmRpdGlvbikgPT09IDApIHtcbiAgICAgIHJldHVybiAnbmV2ZXInO1xuICAgIH1cbiAgICByZXR1cm4gJ2NvbmRpdGlvbic7XG4gIH1cbn1cbiIsIjxkaXYgW3N0eWxlLmRpc3BsYXldPVwiKGVuYWJsZWR8YXN5bmMpID8gJ25vbmUnIDogJ2Jsb2NrJ1wiIGNsYXNzPVwiYWpmLWRpc2FibGVkLW92ZXJsYXlcIj48L2Rpdj5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJub2RlRW50cnl8YXN5bmMgYXMgbmVcIj5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInByb3BlcnRpZXNGb3JtfGFzeW5jIGFzIHBmXCI+XG4gICAgPGRpdiBjbGFzcz1cImFqZi1oZWFkZXJcIj5cbiAgICAgIDxoMz57eydQcm9wZXJ0aWVzJ3x0cmFuc2xvY299fTwvaDM+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICBbZGlzYWJsZWRdPVwicGYuc3RhdHVzICE9PSAnVkFMSUQnXCJcbiAgICAgICAgKGNsaWNrKT1cInNhdmUoKVwiXG4gICAgICA+XG4gICAgICAgIDxtYXQtaWNvbj5zYXZlPC9tYXQtaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gKGNsaWNrKT1cImNhbmNlbCgpXCI+XG4gICAgICAgIDxtYXQtaWNvbj5jYW5jZWw8L21hdC1pY29uPlxuICAgICAgPC9idXR0b24+ICBcbiAgICA8L2Rpdj5cbiAgICA8bWF0LWVycm9yICpuZ0lmPVwicGY/LmludmFsaWRcIj5cbiAgICAgIHt7YWxsRXJyb3JNZXNzYWdlcyhwZil9fVxuICAgIDwvbWF0LWVycm9yPlxuICAgIDxmb3JtIFtmb3JtR3JvdXBdPVwicGYhXCIgbm92YWxpZGF0ZT5cbiAgICAgIDxkaXYgY2xhc3M9XCJhamYtcHJvcFwiPlxuICAgICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgPGlucHV0IG1hdElucHV0IGZvcm1Db250cm9sTmFtZT1cIm5hbWVcIiBbcGxhY2Vob2xkZXJdPVwiJ05hbWUnIHwgdHJhbnNsb2NvXCIgLz5cbiAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwicGYuZ2V0KCduYW1lJyk/LmludmFsaWRcIj5cbiAgICAgICAgICAgIHt7ZmllbGRFcnJvck1lc3NhZ2UocGYuZ2V0KCduYW1lJyksICdOYW1lJyl9fVxuICAgICAgICAgIDwvbWF0LWVycm9yPlxuICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYWpmLXByb3BcIj5cbiAgICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJsYWJlbFwiIFtwbGFjZWhvbGRlcl09XCInTGFiZWwnIHwgdHJhbnNsb2NvXCIgLz5cbiAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwicGYuZ2V0KCdsYWJlbCcpPy5pbnZhbGlkXCI+XG4gICAgICAgICAgICB7e2ZpZWxkRXJyb3JNZXNzYWdlKHBmLmdldCgnbGFiZWwnKSwgJ0xhYmVsJyl9fVxuICAgICAgICAgIDwvbWF0LWVycm9yPlxuICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgPC9kaXY+XG4gICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiaXNFbXB0eUZpZWxkKG5lIS5ub2RlKVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLXByb3BcIj5cbiAgICAgICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgZm9ybUNvbnRyb2xOYW1lPVwiSFRNTFwiIFtwbGFjZWhvbGRlcl09XCInSFRNTCcgfCB0cmFuc2xvY29cIiAvPlxuICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDxkaXYgY2xhc3M9XCJhamYtcHJvcFwiPlxuICAgICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgPG1hdC1sYWJlbD57eydWaXNpYmlsaXR5J3x0cmFuc2xvY299fTwvbWF0LWxhYmVsPlxuICAgICAgICAgIDxtYXQtc2VsZWN0IGZvcm1Db250cm9sTmFtZT1cInZpc2liaWxpdHlPcHRcIiBbcGxhY2Vob2xkZXJdPVwiJ1Zpc2libGUnIHwgdHJhbnNsb2NvXCI+XG4gICAgICAgICAgICA8bWF0LW9wdGlvbiB2YWx1ZT1cImFsd2F5c1wiPnt7J0Fsd2F5cyd8dHJhbnNsb2NvfX08L21hdC1vcHRpb24+XG4gICAgICAgICAgICA8bWF0LW9wdGlvbiB2YWx1ZT1cIm5ldmVyXCI+e3snTmV2ZXInfHRyYW5zbG9jb319PC9tYXQtb3B0aW9uPlxuICAgICAgICAgICAgPG1hdC1vcHRpb24gdmFsdWU9XCJjb25kaXRpb25cIj57eydDb25kaXRpb24uLi4nfHRyYW5zbG9jb319PC9tYXQtb3B0aW9uPlxuICAgICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIChjbGljayk9XCJlZGl0VmlzaWJpbGl0eSgpXCJcbiAgICAgICAgICBbZGlzYWJsZWRdPVwicGYhLnZhbHVlLnZpc2liaWxpdHlPcHQgIT09ICdjb25kaXRpb24nXCJcbiAgICAgICAgICBtYXQtcmFpc2VkLWJ1dHRvblxuICAgICAgICAgIFttYXRUb29sdGlwXT1cImN1clZpc2liaWxpdHkgfHwgJydcIlxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1pY29uLWNvbnRcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5lZGl0PC9tYXQtaWNvbj5cbiAgICAgICAgICAgIDxzcGFuPjxjb2RlPnt7IGN1clZpc2liaWxpdHkgfX08L2NvZGU+PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImFqZi1wcm9wXCI+XG4gICAgICAgIDxkaXY+PGxhYmVsPnt7J0JyYW5jaGVzJ3x0cmFuc2xvY299fTwvbGFiZWw+PC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPG1hdC1zbGlkZXIgZGlzY3JldGUgbWluPVwiMVwiIG1heD1cIjVcIiBzdGVwPVwiMVwiXG4gICAgICAgICAgICA+PGlucHV0IG1hdFNsaWRlclRodW1iIGZvcm1Db250cm9sTmFtZT1cImNvbmRpdGlvbmFsQnJhbmNoZXNOdW1cIlxuICAgICAgICAgIC8+PC9tYXQtc2xpZGVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgYnJhbmNoIG9mIGNvbmRpdGlvbmFsQnJhbmNoZXM7IGxldCBpZHggPSBpbmRleFwiPlxuICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cImVkaXRDb25kaXRpb25hbEJyYW5jaChpZHgpXCIgbWF0LXJhaXNlZC1idXR0b24gW21hdFRvb2x0aXBdPVwiYnJhbmNoXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLWljb24tY29udFwiPlxuICAgICAgICAgICAgICA8bWF0LWljb24+ZWRpdDwvbWF0LWljb24+XG4gICAgICAgICAgICAgIDxzcGFuPjxjb2RlPnt7IGJyYW5jaCB9fTwvY29kZT48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGUobmUpXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhamYtcHJvcFwiPlxuICAgICAgICAgIDxkaXY+PGxhYmVsPnt7J01heCByZXBldGl0aW9ucyd8dHJhbnNsb2NvfX08L2xhYmVsPjwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bWF0LXNsaWRlciBkaXNjcmV0ZSBtaW49XCIxXCIgbWF4PVwiNVwiIHN0ZXA9XCIxXCJcbiAgICAgICAgICAgICAgPjxpbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJtYXhSZXBzXCIgbWF0U2xpZGVyVGh1bWJcbiAgICAgICAgICAgIC8+PC9tYXQtc2xpZGVyPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiaXNGaWVsZChuZSlcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1wcm9wXCI+XG4gICAgICAgICAgPG1hdC1jaGVja2JveCBmb3JtQ29udHJvbE5hbWU9XCJyZWFkb25seUZpZWxkXCI+e3snUmVhZG9ubHknfHRyYW5zbG9jb319PC9tYXQtY2hlY2tib3g+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLXByb3BcIj5cbiAgICAgICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICA8bWF0LWxhYmVsPnt7J0ZpZWxkIHNpemUnfHRyYW5zbG9jb319PC9tYXQtbGFiZWw+XG4gICAgICAgICAgICA8bWF0LXNlbGVjdCBmb3JtQ29udHJvbE5hbWU9XCJzaXplXCIgW3BsYWNlaG9sZGVyXT1cIidTaXplJyB8IHRyYW5zbG9jb1wiPlxuICAgICAgICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgZmllbGRTaXplIG9mIGZpZWxkU2l6ZXNcIiBbdmFsdWVdPVwiZmllbGRTaXplLnZhbHVlXCI+XG4gICAgICAgICAgICAgICAge3sgZmllbGRTaXplLmxhYmVsfHRyYW5zbG9jbyB9fVxuICAgICAgICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICAgICAgICA8L21hdC1zZWxlY3Q+XG4gICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhamYtcHJvcFwiPlxuICAgICAgICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJoaW50XCIgW3BsYWNlaG9sZGVyXT1cIidIaW50JyB8IHRyYW5zbG9jb1wiIC8+XG4gICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhamYtcHJvcFwiPlxuICAgICAgICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICBtYXRJbnB1dFxuICAgICAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJkZXNjcmlwdGlvblwiXG4gICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCInRGVzY3JpcHRpb24nIHwgdHJhbnNsb2NvXCJcbiAgICAgICAgICAgID48L3RleHRhcmVhPlxuICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLXByb3BcIj5cbiAgICAgICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgbWF0SW5wdXRcbiAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwiZGVmYXVsdFZhbHVlXCJcbiAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cIidEZWZhdWx0IHZhbHVlJyB8IHRyYW5zbG9jb1wiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLXByb3BcIj5cbiAgICAgICAgICA8ZGl2PjxsYWJlbD57eydGb3JtdWxhJ3x0cmFuc2xvY299fTwvbGFiZWw+PC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cImVkaXRGb3JtdWxhKClcIiBtYXQtcmFpc2VkLWJ1dHRvbiBbbWF0VG9vbHRpcF09XCJjdXJGb3JtdWxhIHx8ICcnXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhamYtaWNvbi1jb250XCI+XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uPmVkaXQ8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgIDxzcGFuPjxjb2RlPnt7IGN1ckZvcm11bGEgfX08L2NvZGU+PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwiYWpmLXByb3BcIj5cbiAgICAgICAgICA8ZGl2PjxsYWJlbD57eydGb3JjZSB2YWx1ZSd8dHJhbnNsY299fTwvbGFiZWw+PC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cImVkaXRGb3JjZVZhbHVlKClcIiBtYXQtcmFpc2VkLWJ1dHRvbiBbbWF0VG9vbHRpcF09XCJjdXJGb3JjZVZhbHVlXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhamYtaWNvbi1jb250XCI+XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uPmVkaXQ8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgIDxzcGFuPnt7IGN1ckZvcmNlVmFsdWUgfX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PiAtLT5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1wcm9wXCI+XG4gICAgICAgICAgPG1hdC1jaGVja2JveCBmb3JtQ29udHJvbE5hbWU9XCJub3RFbXB0eVwiPnt7J05vdCBlbXB0eSd8dHJhbnNsb2NvfX08L21hdC1jaGVja2JveD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJpc051bWVyaWNGaWVsZChuZSEubm9kZSlcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLXByb3BcIj5cbiAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IGZvcm1Db250cm9sTmFtZT1cIm1pblZhbHVlXCIgW3BsYWNlaG9sZGVyXT1cIidNaW4gdmFsdWUnIHwgdHJhbnNsb2NvXCIgLz5cbiAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1wcm9wXCI+XG4gICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJtYXhWYWx1ZVwiIFtwbGFjZWhvbGRlcl09XCInTWF4IHZhbHVlJyB8IHRyYW5zbG9jb1wiIC8+XG4gICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhamYtcHJvcFwiPlxuICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBtYXRJbnB1dFxuICAgICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cIm1pbkRpZ2l0c1wiXG4gICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cIidNaW4gZGlnaXRzJyB8IHRyYW5zbG9jb1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhamYtcHJvcFwiPlxuICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBtYXRJbnB1dFxuICAgICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cIm1heERpZ2l0c1wiXG4gICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cIidNYXggZGlnaXRzJyB8IHRyYW5zbG9jb1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiaXNSYW5nZUZpZWxkKG5lIS5ub2RlKVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhamYtcHJvcFwiPlxuICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBtYXRJbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cInN0YXJ0XCJcbiAgICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiJ1N0YXJ0JyB8IHRyYW5zbG9jb1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhamYtcHJvcFwiPlxuICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBtYXRJbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cImVuZFwiXG4gICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cIidFbmQnIHwgdHJhbnNsb2NvXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1wcm9wXCI+XG4gICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIG1hdElucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwic3RlcFwiXG4gICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cIidTdGVwJyB8IHRyYW5zbG9jb1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhamYtcHJvcFwiPlxuICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICA8bWF0LXNlbGVjdCBmb3JtQ29udHJvbE5hbWU9XCJhcHBlYXJhbmNlXCIgW3BsYWNlaG9sZGVyXT1cIidBcHBlYXJhbmNlJyB8IHRyYW5zbG9jb1wiPlxuICAgICAgICAgICAgICAgIDxtYXQtb3B0aW9uIFt2YWx1ZV09XCJudWxsXCI+e3snRGVmYXVsdCd8dHJhbnNsb2NvfX08L21hdC1vcHRpb24+XG4gICAgICAgICAgICAgICAgPG1hdC1vcHRpb24gdmFsdWU9XCJyYXRpbmdcIj57eydSYXRpbmcnfHRyYW5zbG9jb319PC9tYXQtb3B0aW9uPlxuICAgICAgICAgICAgICA8L21hdC1zZWxlY3Q+XG4gICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLXByb3BcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLWhlYWRlclwiPlxuICAgICAgICAgICAgPGxhYmVsPnt7ICdWYWxpZGF0aW9uJyB8IHRyYW5zbG9jbyB9fTwvbGFiZWw+XG4gICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJhamYtcG9pbnRlclwiIChjbGljayk9XCJhZGRWYWxpZGF0aW9uQ29uZGl0aW9uKClcIlxuICAgICAgICAgICAgICA+YWRkX2NpcmNsZV9vdXRsaW5lPC9tYXQtaWNvblxuICAgICAgICAgICAgPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJ2YWxpZGF0aW9uQ29uZGl0aW9ucy5sZW5ndGggPT09IDBcIiBjbGFzcz1cImFqZi12YWxpZGF0aW9uLXJvdyBhamYtZW1waFwiPlxuICAgICAgICAgICAge3snTm8gY29uZGl0aW9ucyd8dHJhbnNsb2NvfX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cImFqZi12YWxpZGF0aW9uLXJvd1wiXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgdmFsaWRhdGlvbkNvbmRpdGlvbiBvZiB2YWxpZGF0aW9uQ29uZGl0aW9uczsgbGV0IGlkeCA9IGluZGV4XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIChjbGljayk9XCJlZGl0VmFsaWRhdGlvbkNvbmRpdGlvbihpZHgpXCJcbiAgICAgICAgICAgICAgbWF0LXJhaXNlZC1idXR0b25cbiAgICAgICAgICAgICAgW21hdFRvb2x0aXBdPVwidmFsaWRhdGlvbkNvbmRpdGlvbi5jb25kaXRpb25cIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLWljb24tY29udFwiPlxuICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5lZGl0PC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj48Y29kZT57eyB2YWxpZGF0aW9uQ29uZGl0aW9uLmNvbmRpdGlvbiB9fTwvY29kZT48L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJhamYtcG9pbnRlclwiIChjbGljayk9XCJyZW1vdmVWYWxpZGF0aW9uQ29uZGl0aW9uKGlkeClcIlxuICAgICAgICAgICAgICA+cmVtb3ZlX2NpcmNsZV9vdXRsaW5lPC9tYXQtaWNvblxuICAgICAgICAgICAgPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPCEtLSBUaGUgd2FybmluZyBlZGl0b3IgdXNlZCB0byBzaXQgaGVyZTogYSBgbm90RW1wdHlXYXJuaW5nYCBjaGVja2JveCBhbmRcbiAgICAgICAgICAgICB0aGUgbGlzdCBvZiB3YXJuaW5nIGNvbmRpdGlvbnMuIEJvdGggYXJlIGdvbmUgZnJvbSB0aGUgVUksIHdoaWxlIHRoZVxuICAgICAgICAgICAgIGNvbXBvbmVudCBrZWVwcyB0aGUgcHJvcGVydGllcywgdGhlIGZvcm0gY29udHJvbHMgYW5kIHRoZSBkaWFsb2cgdGhhdFxuICAgICAgICAgICAgIGRyb3ZlIHRoZW0sIHNvIHB1dHRpbmcgdGhlIGJsb2NrIGJhY2sgaXMgYSB0ZW1wbGF0ZS1vbmx5IGNoYW5nZS4gLS0+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhamYtcHJvcFwiPlxuICAgICAgICAgIDxkaXY+PGxhYmVsPnt7J0dvIHRvIG5leHQgc2xpZGUgY29uZGl0aW9uJ3x0cmFuc2xvY299fTwvbGFiZWw+PC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgKGNsaWNrKT1cImVkaXROZXh0U2xpZGVDb25kaXRpb24oKVwiXG4gICAgICAgICAgICAgIG1hdC1yYWlzZWQtYnV0dG9uXG4gICAgICAgICAgICAgIFttYXRUb29sdGlwXT1cIm5leHRTbGlkZUNvbmRpdGlvbiB8fCAnJ1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhamYtaWNvbi1jb250XCI+XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uPmVkaXQ8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgIDxzcGFuPjxjb2RlPnt7IG5leHRTbGlkZUNvbmRpdGlvbiB9fTwvY29kZT48L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiaXNGaWVsZFdpdGhDaG9pY2VzKG5lIS5ub2RlKVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhamYtcHJvcFwiPlxuICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICA8bWF0LWxhYmVsPnt7J0Nob2ljZXMgb3JpZ2lucyd8dHJhbnNsb2NvfX08L21hdC1sYWJlbD5cbiAgICAgICAgICAgICAgPG1hdC1zZWxlY3QgZm9ybUNvbnRyb2xOYW1lPVwiY2hvaWNlc09yaWdpblJlZlwiIFtwbGFjZWhvbGRlcl09XCInQ2hvaWNlcycgfCB0cmFuc2xvY29cIj5cbiAgICAgICAgICAgICAgICA8bWF0LW9wdGlvblxuICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGNob2ljZXNPcmlnaW4gb2YgY2hvaWNlc09yaWdpbnNcIlxuICAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cImNob2ljZXNPcmlnaW4ubmFtZVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge3sgKGNob2ljZXNPcmlnaW4ubGFiZWwgfHwgY2hvaWNlc09yaWdpbi5uYW1lKXx0cmFuc2xvY28gfX1cbiAgICAgICAgICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICAgICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cInBmLmdldCgnY2hvaWNlc09yaWdpblJlZicpPy5pbnZhbGlkXCI+XG4gICAgICAgICAgICAgICAge3tmaWVsZEVycm9yTWVzc2FnZShwZi5nZXQoJ2Nob2ljZXNPcmlnaW5SZWYnKSwgJ2Nob2ljZXNPcmlnaW5SZWYnKX19XG4gICAgICAgICAgICAgIDwvbWF0LWVycm9yPlxuICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLXByb3BcIj5cbiAgICAgICAgICAgIDxkaXY+PGxhYmVsPnt7J0Nob2ljZXMgZmlsdGVyJ3x0cmFuc2xvY299fTwvbGFiZWw+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImVkaXRDaG9pY2VzRmlsdGVyKClcIlxuICAgICAgICAgICAgICAgIG1hdC1yYWlzZWQtYnV0dG9uXG4gICAgICAgICAgICAgICAgW21hdFRvb2x0aXBdPVwiY3VyQ2hvaWNlc0ZpbHRlciB8fCAnJ1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLWljb24tY29udFwiPlxuICAgICAgICAgICAgICAgICAgPG1hdC1pY29uPmVkaXQ8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+PGNvZGU+e3sgY3VyQ2hvaWNlc0ZpbHRlciB9fTwvY29kZT48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1wcm9wXCI+XG4gICAgICAgICAgICA8bWF0LWNoZWNrYm94XG4gICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cImZvcmNlRXhwYW5kZWRcIlxuICAgICAgICAgICAgICAjZm9yY2VFeHBhbmRlZFxuICAgICAgICAgICAgICAoY2hhbmdlKT1cImZvcmNlQ2hlY2tib3goJGV2ZW50LmNoZWNrZWQsIGZvcmNlTmFycm93KVwiXG4gICAgICAgICAgICAgID57eydGb3JjZSBleHBhbmRlZCBzZWxlY3Rpb24nfHRyYW5zbG9jb319PC9tYXQtY2hlY2tib3hcbiAgICAgICAgICAgID5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLXByb3BcIj5cbiAgICAgICAgICAgIDxtYXQtY2hlY2tib3hcbiAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwiZm9yY2VOYXJyb3dcIlxuICAgICAgICAgICAgICAjZm9yY2VOYXJyb3dcbiAgICAgICAgICAgICAgKGNoYW5nZSk9XCJmb3JjZUNoZWNrYm94KCRldmVudC5jaGVja2VkLCBmb3JjZUV4cGFuZGVkKVwiXG4gICAgICAgICAgICAgID57eydGb3JjZSBuYXJyb3cgc2VsZWN0aW9uJ3x0cmFuc2xvY299fTwvbWF0LWNoZWNrYm94XG4gICAgICAgICAgICA+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1wcm9wXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLWhlYWRlclwiPlxuICAgICAgICAgICAgICA8bGFiZWw+e3snVHJpZ2dlciBzZWxlY3Rpb24nfHRyYW5zbG9jb319PC9sYWJlbD5cbiAgICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwiYWpmLXBvaW50ZXJcIiAoY2xpY2spPVwiYWRkVHJpZ2dlckNvbmRpdGlvbigpXCJcbiAgICAgICAgICAgICAgICA+YWRkX2NpcmNsZV9vdXRsaW5lPC9tYXQtaWNvblxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgKm5nSWY9XCIhdHJpZ2dlckNvbmRpdGlvbnMgfHwgdHJpZ2dlckNvbmRpdGlvbnMubGVuZ3RoID09PSAwXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJhamYtdmFsaWRhdGlvbi1yb3cgYWpmLWVtcGhcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7eydObyB0cmlnZ2VyIGNvbmRpdGlvbid8dHJhbnNsb2NvfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzcz1cImFqZi12YWxpZGF0aW9uLXJvd1wiXG4gICAgICAgICAgICAgICpuZ0Zvcj1cImxldCB0cmlnZ2VyQ29uZGl0aW9uIG9mIHRyaWdnZXJDb25kaXRpb25zOyBsZXQgaWR4ID0gaW5kZXhcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImVkaXRUcmlnZ2VyQ29uZGl0aW9uKGlkeClcIlxuICAgICAgICAgICAgICAgIG1hdC1yYWlzZWQtYnV0dG9uXG4gICAgICAgICAgICAgICAgW21hdFRvb2x0aXBdPVwidHJpZ2dlckNvbmRpdGlvblwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLWljb24tY29udFwiPlxuICAgICAgICAgICAgICAgICAgPG1hdC1pY29uPmVkaXQ8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+PGNvZGU+e3sgdHJpZ2dlckNvbmRpdGlvbiB9fTwvY29kZT48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJwb2ludGVyXCIgKGNsaWNrKT1cInJlbW92ZVRyaWdnZXJDb25kaXRpb24oaWR4KVwiXG4gICAgICAgICAgICAgICAgPnJlbW92ZV9jaXJjbGVfb3V0bGluZTwvbWF0LWljb25cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc1RhYmxlRmllbGQobmUhLm5vZGUpXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1wcm9wXCI+XG4gICAgICAgICAgICA8bWF0LWNoZWNrYm94IGZvcm1Db250cm9sTmFtZT1cImhpZGVFbXB0eVJvd3NcIlxuICAgICAgICAgICAgICA+e3snSGlkZSBlbXB0eSByb3dzJ3x0cmFuc2xvY299fTwvbWF0LWNoZWNrYm94XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgIG1hdElucHV0XG4gICAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwidGFibGVEZWZcIlxuICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCInVGFibGUgZGVmaW5pdGlvbicgfCB0cmFuc2xvY29cIlxuICAgICAgICAgICAgICA+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cInBmLmdldCgndGFibGVEZWYnKT8uaW52YWxpZFwiPlxuICAgICAgICAgICAgICAgIHt7ZmllbGRFcnJvck1lc3NhZ2UocGYuZ2V0KCd0YWJsZURlZicpLCAndGFibGVEZWYnKX19XG4gICAgICAgICAgICAgIDwvbWF0LWVycm9yPlxuICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvZm9ybT5cbiAgPC9uZy1jb250YWluZXI+XG48L25nLWNvbnRhaW5lcj5cbiJdfQ==