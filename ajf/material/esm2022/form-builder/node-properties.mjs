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
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div")(9, "label");
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div")(13, "mat-slider", 18);
    i0.ɵɵelement(14, "input", 24);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 2, "Min repetitions"));
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 4, "Max repetitions"));
} }
function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_mat_option_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 36);
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
    i0.ɵɵelement(2, "input", 37);
    i0.ɵɵpipe(3, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 8)(5, "mat-form-field");
    i0.ɵɵelement(6, "input", 38);
    i0.ɵɵpipe(7, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 8)(9, "mat-form-field");
    i0.ɵɵelement(10, "input", 39);
    i0.ɵɵpipe(11, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 8)(13, "mat-form-field");
    i0.ɵɵelement(14, "input", 40);
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
    i0.ɵɵelement(2, "input", 41);
    i0.ɵɵpipe(3, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 8)(5, "mat-form-field");
    i0.ɵɵelement(6, "input", 42);
    i0.ɵɵpipe(7, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 8)(9, "mat-form-field");
    i0.ɵɵelement(10, "input", 43);
    i0.ɵɵpipe(11, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 8)(13, "mat-form-field")(14, "mat-select", 44);
    i0.ɵɵpipe(15, "transloco");
    i0.ɵɵelementStart(16, "mat-option", 36);
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "transloco");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "mat-option", 45);
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
    i0.ɵɵelementStart(0, "div", 46);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "No conditions"), " ");
} }
function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_div_51_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 47)(1, "button", 22);
    i0.ɵɵlistener("click", function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_div_51_Template_button_click_1_listener() { const idx_r10 = i0.ɵɵrestoreView(_r9).index; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.editValidationCondition(idx_r10)); });
    i0.ɵɵelementStart(2, "div", 17)(3, "mat-icon");
    i0.ɵɵtext(4, "edit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span")(6, "code");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(8, "mat-icon", 32);
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
function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_div_63_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 46);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "No warnings"), " ");
} }
function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_div_64_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 47)(1, "button", 22);
    i0.ɵɵlistener("click", function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_div_64_Template_button_click_1_listener() { const idx_r13 = i0.ɵɵrestoreView(_r12).index; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.editWarningCondition(idx_r13)); });
    i0.ɵɵelementStart(2, "div", 17)(3, "mat-icon");
    i0.ɵɵtext(4, "edit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span")(6, "code");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(8, "mat-icon", 32);
    i0.ɵɵlistener("click", function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_div_64_Template_mat_icon_click_8_listener() { const idx_r13 = i0.ɵɵrestoreView(_r12).index; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.removeWarningCondition(idx_r13)); });
    i0.ɵɵtext(9, "remove_circle_outline");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const warningCondition_r14 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("matTooltip", warningCondition_r14.condition);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(warningCondition_r14.condition);
} }
function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_78_mat_option_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 36);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const choicesOrigin_r16 = ctx.$implicit;
    i0.ɵɵproperty("value", choicesOrigin_r16.name);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 2, choicesOrigin_r16.label || choicesOrigin_r16.name), " ");
} }
function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_78_mat_error_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-error");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const pf_r3 = i0.ɵɵnextContext(3).ngIf;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.fieldErrorMessage(pf_r3.get("choicesOriginRef"), "choicesOriginRef"), " ");
} }
function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_78_div_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 46);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "No trigger condition"), " ");
} }
function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_78_div_40_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 47)(1, "button", 22);
    i0.ɵɵlistener("click", function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_78_div_40_Template_button_click_1_listener() { const idx_r20 = i0.ɵɵrestoreView(_r19).index; const ctx_r1 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r1.editTriggerCondition(idx_r20)); });
    i0.ɵɵelementStart(2, "div", 17)(3, "mat-icon");
    i0.ɵɵtext(4, "edit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span")(6, "code");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(8, "mat-icon", 51);
    i0.ɵɵlistener("click", function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_78_div_40_Template_mat_icon_click_8_listener() { const idx_r20 = i0.ɵɵrestoreView(_r19).index; const ctx_r1 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r1.removeTriggerCondition(idx_r20)); });
    i0.ɵɵtext(9, "remove_circle_outline");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const triggerCondition_r21 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("matTooltip", triggerCondition_r21);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(triggerCondition_r21);
} }
function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_78_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8)(1, "mat-form-field")(2, "mat-label");
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "transloco");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "mat-select", 48);
    i0.ɵɵpipe(6, "transloco");
    i0.ɵɵtemplate(7, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_78_mat_option_7_Template, 3, 4, "mat-option", 27);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_78_mat_error_8_Template, 2, 1, "mat-error", 3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 8)(10, "div")(11, "label");
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div")(15, "button", 22);
    i0.ɵɵlistener("click", function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_78_Template_button_click_15_listener() { i0.ɵɵrestoreView(_r15); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.editChoicesFilter()); });
    i0.ɵɵelementStart(16, "div", 17)(17, "mat-icon");
    i0.ɵɵtext(18, "edit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span")(20, "code");
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵelementStart(22, "div", 8)(23, "mat-checkbox", 49, 0);
    i0.ɵɵlistener("change", function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_78_Template_mat_checkbox_change_23_listener($event) { i0.ɵɵrestoreView(_r15); const forceNarrow_r17 = i0.ɵɵreference(29); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.forceCheckbox($event.checked, forceNarrow_r17)); });
    i0.ɵɵtext(25);
    i0.ɵɵpipe(26, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "div", 8)(28, "mat-checkbox", 50, 1);
    i0.ɵɵlistener("change", function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_78_Template_mat_checkbox_change_28_listener($event) { i0.ɵɵrestoreView(_r15); const forceExpanded_r18 = i0.ɵɵreference(24); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.forceCheckbox($event.checked, forceExpanded_r18)); });
    i0.ɵɵtext(30);
    i0.ɵɵpipe(31, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "div", 8)(33, "div", 4)(34, "label");
    i0.ɵɵtext(35);
    i0.ɵɵpipe(36, "transloco");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "mat-icon", 32);
    i0.ɵɵlistener("click", function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_78_Template_mat_icon_click_37_listener() { i0.ɵɵrestoreView(_r15); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.addTriggerCondition()); });
    i0.ɵɵtext(38, "add_circle_outline");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(39, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_78_div_39_Template, 3, 3, "div", 33)(40, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_78_div_40_Template, 10, 2, "div", 34);
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
function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_container_79_mat_error_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-error");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const pf_r3 = i0.ɵɵnextContext(3).ngIf;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.fieldErrorMessage(pf_r3.get("tableDef"), "tableDef"), " ");
} }
function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_container_79_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 8)(2, "mat-checkbox", 52);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "transloco");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "mat-form-field");
    i0.ɵɵelement(6, "textarea", 53);
    i0.ɵɵpipe(7, "transloco");
    i0.ɵɵtemplate(8, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_container_79_mat_error_8_Template, 2, 1, "mat-error", 3);
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
    i0.ɵɵelementStart(0, "div", 8)(1, "mat-checkbox", 25);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 8)(5, "mat-form-field")(6, "mat-label");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "transloco");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "mat-select", 26);
    i0.ɵɵpipe(10, "transloco");
    i0.ɵɵtemplate(11, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_mat_option_11_Template, 3, 4, "mat-option", 27);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "div", 8)(13, "mat-form-field");
    i0.ɵɵelement(14, "input", 28);
    i0.ɵɵpipe(15, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 8)(17, "mat-form-field");
    i0.ɵɵelement(18, "textarea", 29);
    i0.ɵɵpipe(19, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 8)(21, "mat-form-field");
    i0.ɵɵelement(22, "input", 30);
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
    i0.ɵɵelementStart(37, "div", 8)(38, "mat-checkbox", 31);
    i0.ɵɵtext(39);
    i0.ɵɵpipe(40, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(41, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_41_Template, 16, 12, "ng-template", 11)(42, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_42_Template, 22, 19, "ng-template", 11);
    i0.ɵɵelementStart(43, "div", 8)(44, "div", 4)(45, "label");
    i0.ɵɵtext(46);
    i0.ɵɵpipe(47, "transloco");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "mat-icon", 32);
    i0.ɵɵlistener("click", function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_Template_mat_icon_click_48_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.addValidationCondition()); });
    i0.ɵɵtext(49, "add_circle_outline");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(50, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_div_50_Template, 3, 3, "div", 33)(51, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_div_51_Template, 10, 2, "div", 34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(52, "div", 8)(53, "mat-checkbox", 35);
    i0.ɵɵtext(54);
    i0.ɵɵpipe(55, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(56, "div", 8)(57, "div", 4)(58, "label");
    i0.ɵɵtext(59);
    i0.ɵɵpipe(60, "transloco");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(61, "mat-icon", 32);
    i0.ɵɵlistener("click", function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_Template_mat_icon_click_61_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.addWarningCondition()); });
    i0.ɵɵtext(62, "add_circle_outline");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(63, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_div_63_Template, 3, 3, "div", 33)(64, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_div_64_Template, 10, 2, "div", 34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(65, "div", 8)(66, "div")(67, "label");
    i0.ɵɵtext(68);
    i0.ɵɵpipe(69, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(70, "div")(71, "button", 22);
    i0.ɵɵlistener("click", function AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_Template_button_click_71_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.editNextSlideCondition()); });
    i0.ɵɵelementStart(72, "div", 17)(73, "mat-icon");
    i0.ɵɵtext(74, "edit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(75, "span")(76, "code");
    i0.ɵɵtext(77);
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵtemplate(78, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_template_78_Template, 41, 24, "ng-template", 11)(79, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_ng_container_79_Template, 9, 7, "ng-container", 3);
} if (rf & 2) {
    const ne_r22 = i0.ɵɵnextContext(2).ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 25, "Readonly"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 27, "Field size"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(10, 29, "Size"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.fieldSizes);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(15, 31, "Hint"));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(19, 33, "Description"));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(23, 35, "Default value"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(28, 37, "Formula"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("matTooltip", ctx_r1.curFormula || "");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r1.curFormula);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(40, 39, "Not empty"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.isNumericField(ne_r22.node));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isRangeField(ne_r22.node));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(47, 41, "Validation"));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r1.validationConditions.length === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.validationConditions);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(55, 43, "Not empty warning"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(60, 45, "Warnings"));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r1.warningConditions.length === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.warningConditions);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(69, 47, "Go to next slide condition"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("matTooltip", ctx_r1.nextSlideCondition || "");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r1.nextSlideCondition);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isFieldWithChoices(ne_r22.node));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isTableField(ne_r22.node));
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
    i0.ɵɵtemplate(56, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_56_Template, 15, 6, "ng-template", 11)(57, AjfFbNodeProperties_ng_container_2_ng_container_1_ng_template_57_Template, 80, 49, "ng-template", 11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    let tmp_9_0;
    let tmp_11_0;
    const pf_r3 = ctx.ngIf;
    const ne_r22 = i0.ɵɵnextContext().ngIf;
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
    i0.ɵɵproperty("ngIf", ctx_r1.isEmptyField(ne_r22.node));
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
    i0.ɵɵproperty("ngIf", ctx_r1.isRepeatingContainerNode(ne_r22));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isField(ne_r22));
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
function checkRepsValidity(c) {
    const minReps = c.value.minReps;
    const maxReps = c.value.maxReps;
    if (minReps && maxReps && minReps > maxReps) {
        return { reps: 'Min repetions cannot be greater than max repetitions' };
    }
    return null;
}
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
                controls.minReps = rn.minReps;
                controls.maxReps = rn.maxReps;
                this._curFormulaReps = formulaReps;
                validators.push(checkRepsValidity);
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
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFbNodeProperties, selectors: [["ajf-fb-node-properties"]], decls: 4, vars: 7, consts: [["forceExpanded", ""], ["forceNarrow", ""], [1, "ajf-disabled-overlay"], [4, "ngIf"], [1, "ajf-header"], ["mat-icon-button", "", 3, "click", "disabled"], ["mat-icon-button", "", 3, "click"], ["novalidate", "", 3, "formGroup"], [1, "ajf-prop"], ["matInput", "", "formControlName", "name", 3, "placeholder"], ["matInput", "", "formControlName", "label", 3, "placeholder"], [3, "ngIf"], ["formControlName", "visibilityOpt", 3, "placeholder"], ["value", "always"], ["value", "never"], ["value", "condition"], ["mat-raised-button", "", 3, "click", "disabled", "matTooltip"], [1, "ajf-icon-cont"], ["discrete", "", "min", "1", "max", "5", "step", "1"], ["matSliderThumb", "", "formControlName", "conditionalBranchesNum"], [4, "ngFor", "ngForOf"], ["matInput", "", "formControlName", "HTML", 3, "placeholder"], ["mat-raised-button", "", 3, "click", "matTooltip"], ["formControlName", "minReps", "matSliderThumb", ""], ["formControlName", "maxReps", "matSliderThumb", ""], ["formControlName", "readonlyField"], ["formControlName", "size", 3, "placeholder"], [3, "value", 4, "ngFor", "ngForOf"], ["matInput", "", "formControlName", "hint", 3, "placeholder"], ["matInput", "", "formControlName", "description", 3, "placeholder"], ["matInput", "", "formControlName", "defaultValue", 3, "placeholder"], ["formControlName", "notEmpty"], [1, "ajf-pointer", 3, "click"], ["class", "ajf-validation-row ajf-emph", 4, "ngIf"], ["class", "ajf-validation-row", 4, "ngFor", "ngForOf"], ["formControlName", "notEmptyWarning"], [3, "value"], ["matInput", "", "formControlName", "minValue", 3, "placeholder"], ["matInput", "", "formControlName", "maxValue", 3, "placeholder"], ["matInput", "", "formControlName", "minDigits", 3, "placeholder"], ["matInput", "", "formControlName", "maxDigits", 3, "placeholder"], ["matInput", "", "type", "number", "formControlName", "start", 3, "placeholder"], ["matInput", "", "type", "number", "formControlName", "end", 3, "placeholder"], ["matInput", "", "type", "number", "formControlName", "step", 3, "placeholder"], ["formControlName", "appearance", 3, "placeholder"], ["value", "rating"], [1, "ajf-validation-row", "ajf-emph"], [1, "ajf-validation-row"], ["formControlName", "choicesOriginRef", 3, "placeholder"], ["formControlName", "forceExpanded", 3, "change"], ["formControlName", "forceNarrow", 3, "change"], [1, "pointer", 3, "click"], ["formControlName", "hideEmptyRows"], ["matInput", "", "formControlName", "tableDef", 3, "placeholder"]], template: function AjfFbNodeProperties_Template(rf, ctx) { if (rf & 1) {
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
        args: [{ selector: 'ajf-fb-node-properties', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [style.display]=\"(enabled|async) ? 'none' : 'block'\" class=\"ajf-disabled-overlay\"></div>\n<ng-container *ngIf=\"nodeEntry|async as ne\">\n  <ng-container *ngIf=\"propertiesForm|async as pf\">\n    <div class=\"ajf-header\">\n      <h3>{{'Properties'|transloco}}</h3>\n      <button\n        mat-icon-button\n        [disabled]=\"pf.status !== 'VALID'\"\n        (click)=\"save()\"\n      >\n        <mat-icon>save</mat-icon>\n      </button>\n      <button mat-icon-button (click)=\"cancel()\">\n        <mat-icon>cancel</mat-icon>\n      </button>  \n    </div>\n    <mat-error *ngIf=\"pf?.invalid\">\n      {{allErrorMessages(pf)}}\n    </mat-error>\n    <form [formGroup]=\"pf!\" novalidate>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <input matInput formControlName=\"name\" [placeholder]=\"'Name' | transloco\" />\n          <mat-error *ngIf=\"pf.get('name')?.invalid\">\n            {{fieldErrorMessage(pf.get('name'), 'Name')}}\n          </mat-error>\n        </mat-form-field>\n      </div>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <input matInput formControlName=\"label\" [placeholder]=\"'Label' | transloco\" />\n          <mat-error *ngIf=\"pf.get('label')?.invalid\">\n            {{fieldErrorMessage(pf.get('label'), 'Label')}}\n          </mat-error>\n        </mat-form-field>\n      </div>\n      <ng-template [ngIf]=\"isEmptyField(ne!.node)\">\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <input matInput formControlName=\"HTML\" [placeholder]=\"'HTML' | transloco\" />\n          </mat-form-field>\n        </div>\n      </ng-template>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <mat-label>{{'Visibility'|transloco}}</mat-label>\n          <mat-select formControlName=\"visibilityOpt\" [placeholder]=\"'Visible' | transloco\">\n            <mat-option value=\"always\">{{'Always'|transloco}}</mat-option>\n            <mat-option value=\"never\">{{'Never'|transloco}}</mat-option>\n            <mat-option value=\"condition\">{{'Condition...'|transloco}}</mat-option>\n          </mat-select>\n        </mat-form-field>\n        <button\n          (click)=\"editVisibility()\"\n          [disabled]=\"pf!.value.visibilityOpt !== 'condition'\"\n          mat-raised-button\n          [matTooltip]=\"curVisibility || ''\"\n        >\n          <div class=\"ajf-icon-cont\">\n            <mat-icon>edit</mat-icon>\n            <span><code>{{ curVisibility }}</code></span>\n          </div>\n        </button>\n      </div>\n      <div class=\"ajf-prop\">\n        <div><label>{{'Branches'|transloco}}</label></div>\n        <div>\n          <mat-slider discrete min=\"1\" max=\"5\" step=\"1\"\n            ><input matSliderThumb formControlName=\"conditionalBranchesNum\"\n          /></mat-slider>\n        </div>\n        <div *ngFor=\"let branch of conditionalBranches; let idx = index\">\n          <button (click)=\"editConditionalBranch(idx)\" mat-raised-button [matTooltip]=\"branch\">\n            <div class=\"ajf-icon-cont\">\n              <mat-icon>edit</mat-icon>\n              <span><code>{{ branch }}</code></span>\n            </div>\n          </button>\n        </div>\n      </div>\n      <ng-template [ngIf]=\"isRepeatingContainerNode(ne)\">\n        <div class=\"ajf-prop\">\n          <div><label>{{'Min repetitions'|transloco}}</label></div>\n          <div>\n            <mat-slider discrete min=\"1\" max=\"5\" step=\"1\"\n              ><input  formControlName=\"minReps\" matSliderThumb\n            /></mat-slider>\n          </div>\n          <div><label>{{'Max repetitions'|transloco}}</label></div>\n          <div>\n            <mat-slider discrete min=\"1\" max=\"5\" step=\"1\"\n              ><input formControlName=\"maxReps\" matSliderThumb\n            /></mat-slider>\n          </div>\n        </div>\n      </ng-template>\n      <ng-template [ngIf]=\"isField(ne)\">\n        <div class=\"ajf-prop\">\n          <mat-checkbox formControlName=\"readonlyField\">{{'Readonly'|transloco}}</mat-checkbox>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <mat-label>{{'Field size'|transloco}}</mat-label>\n            <mat-select formControlName=\"size\" [placeholder]=\"'Size' | transloco\">\n              <mat-option *ngFor=\"let fieldSize of fieldSizes\" [value]=\"fieldSize.value\">\n                {{ fieldSize.label|transloco }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <input matInput formControlName=\"hint\" [placeholder]=\"'Hint' | transloco\" />\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <textarea\n              matInput\n              formControlName=\"description\"\n              [placeholder]=\"'Description' | transloco\"\n            ></textarea>\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <input\n              matInput\n              formControlName=\"defaultValue\"\n              [placeholder]=\"'Default value' | transloco\"\n            />\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <div><label>{{'Formula'|transloco}}</label></div>\n          <div>\n            <button (click)=\"editFormula()\" mat-raised-button [matTooltip]=\"curFormula || ''\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span><code>{{ curFormula }}</code></span>\n              </div>\n            </button>\n          </div>\n        </div>\n        <!-- <div class=\"ajf-prop\">\n          <div><label>{{'Force value'|translco}}</label></div>\n          <div>\n            <button (click)=\"editForceValue()\" mat-raised-button [matTooltip]=\"curForceValue\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ curForceValue }}</span>\n              </div>\n            </button>\n          </div>\n        </div> -->\n        <div class=\"ajf-prop\">\n          <mat-checkbox formControlName=\"notEmpty\">{{'Not empty'|transloco}}</mat-checkbox>\n        </div>\n        <ng-template [ngIf]=\"isNumericField(ne!.node)\">\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input matInput formControlName=\"minValue\" [placeholder]=\"'Min value' | transloco\" />\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input matInput formControlName=\"maxValue\" [placeholder]=\"'Max value' | transloco\" />\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input\n                matInput\n                formControlName=\"minDigits\"\n                [placeholder]=\"'Min digits' | transloco\"\n              />\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input\n                matInput\n                formControlName=\"maxDigits\"\n                [placeholder]=\"'Max digits' | transloco\"\n              />\n            </mat-form-field>\n          </div>\n        </ng-template>\n        <ng-template [ngIf]=\"isRangeField(ne!.node)\">\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input\n                matInput\n                type=\"number\"\n                formControlName=\"start\"\n                [placeholder]=\"'Start' | transloco\"\n              />\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input\n                matInput\n                type=\"number\"\n                formControlName=\"end\"\n                [placeholder]=\"'End' | transloco\"\n              />\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input\n                matInput\n                type=\"number\"\n                formControlName=\"step\"\n                [placeholder]=\"'Step' | transloco\"\n              />\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <mat-select formControlName=\"appearance\" [placeholder]=\"'Appearance' | transloco\">\n                <mat-option [value]=\"null\">{{'Default'|transloco}}</mat-option>\n                <mat-option value=\"rating\">{{'Rating'|transloco}}</mat-option>\n              </mat-select>\n            </mat-form-field>\n          </div>\n        </ng-template>\n        <div class=\"ajf-prop\">\n          <div class=\"ajf-header\">\n            <label>{{ 'Validation' | transloco }}</label>\n            <mat-icon class=\"ajf-pointer\" (click)=\"addValidationCondition()\"\n              >add_circle_outline</mat-icon\n            >\n          </div>\n          <div *ngIf=\"validationConditions.length === 0\" class=\"ajf-validation-row ajf-emph\">\n            {{'No conditions'|transloco}}\n          </div>\n          <div\n            class=\"ajf-validation-row\"\n            *ngFor=\"let validationCondition of validationConditions; let idx = index\"\n          >\n            <button\n              (click)=\"editValidationCondition(idx)\"\n              mat-raised-button\n              [matTooltip]=\"validationCondition.condition\"\n            >\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span><code>{{ validationCondition.condition }}</code></span>\n              </div>\n            </button>\n            <mat-icon class=\"ajf-pointer\" (click)=\"removeValidationCondition(idx)\"\n              >remove_circle_outline</mat-icon\n            >\n          </div>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-checkbox formControlName=\"notEmptyWarning\"\n            >{{'Not empty warning'|transloco}}</mat-checkbox\n          >\n        </div>\n        <div class=\"ajf-prop\">\n          <div class=\"ajf-header\">\n            <label>{{'Warnings'|transloco}}</label>\n            <mat-icon class=\"ajf-pointer\" (click)=\"addWarningCondition()\"\n              >add_circle_outline</mat-icon\n            >\n          </div>\n          <div *ngIf=\"warningConditions.length === 0\" class=\"ajf-validation-row ajf-emph\">\n            {{'No warnings'|transloco}}\n          </div>\n          <div\n            class=\"ajf-validation-row\"\n            *ngFor=\"let warningCondition of warningConditions; let idx = index\"\n          >\n            <button\n              (click)=\"editWarningCondition(idx)\"\n              mat-raised-button\n              [matTooltip]=\"warningCondition.condition\"\n            >\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span><code>{{ warningCondition.condition }}</code></span>\n              </div>\n            </button>\n            <mat-icon class=\"ajf-pointer\" (click)=\"removeWarningCondition(idx)\"\n              >remove_circle_outline</mat-icon\n            >\n          </div>\n        </div>\n        <div class=\"ajf-prop\">\n          <div><label>{{'Go to next slide condition'|transloco}}</label></div>\n          <div>\n            <button\n              (click)=\"editNextSlideCondition()\"\n              mat-raised-button\n              [matTooltip]=\"nextSlideCondition || ''\"\n            >\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span><code>{{ nextSlideCondition }}</code></span>\n              </div>\n            </button>\n          </div>\n        </div>\n        <ng-template [ngIf]=\"isFieldWithChoices(ne!.node)\">\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <mat-label>{{'Choices origins'|transloco}}</mat-label>\n              <mat-select formControlName=\"choicesOriginRef\" [placeholder]=\"'Choices' | transloco\">\n                <mat-option\n                  *ngFor=\"let choicesOrigin of choicesOrigins\"\n                  [value]=\"choicesOrigin.name\"\n                >\n                  {{ (choicesOrigin.label || choicesOrigin.name)|transloco }}\n                </mat-option>\n              </mat-select>\n              <mat-error *ngIf=\"pf.get('choicesOriginRef')?.invalid\">\n                {{fieldErrorMessage(pf.get('choicesOriginRef'), 'choicesOriginRef')}}\n              </mat-error>\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <div><label>{{'Choices filter'|transloco}}</label></div>\n            <div>\n              <button\n                (click)=\"editChoicesFilter()\"\n                mat-raised-button\n                [matTooltip]=\"curChoicesFilter || ''\"\n              >\n                <div class=\"ajf-icon-cont\">\n                  <mat-icon>edit</mat-icon>\n                  <span><code>{{ curChoicesFilter }}</code></span>\n                </div>\n              </button>\n            </div>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-checkbox\n              formControlName=\"forceExpanded\"\n              #forceExpanded\n              (change)=\"forceCheckbox($event.checked, forceNarrow)\"\n              >{{'Force expanded selection'|transloco}}</mat-checkbox\n            >\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-checkbox\n              formControlName=\"forceNarrow\"\n              #forceNarrow\n              (change)=\"forceCheckbox($event.checked, forceExpanded)\"\n              >{{'Force narrow selection'|transloco}}</mat-checkbox\n            >\n          </div>\n          <div class=\"ajf-prop\">\n            <div class=\"ajf-header\">\n              <label>{{'Trigger selection'|transloco}}</label>\n              <mat-icon class=\"ajf-pointer\" (click)=\"addTriggerCondition()\"\n                >add_circle_outline</mat-icon\n              >\n            </div>\n            <div\n              *ngIf=\"!triggerConditions || triggerConditions.length === 0\"\n              class=\"ajf-validation-row ajf-emph\"\n            >\n              {{'No trigger condition'|transloco}}\n            </div>\n            <div\n              class=\"ajf-validation-row\"\n              *ngFor=\"let triggerCondition of triggerConditions; let idx = index\"\n            >\n              <button\n                (click)=\"editTriggerCondition(idx)\"\n                mat-raised-button\n                [matTooltip]=\"triggerCondition\"\n              >\n                <div class=\"ajf-icon-cont\">\n                  <mat-icon>edit</mat-icon>\n                  <span><code>{{ triggerCondition }}</code></span>\n                </div>\n              </button>\n              <mat-icon class=\"pointer\" (click)=\"removeTriggerCondition(idx)\"\n                >remove_circle_outline</mat-icon\n              >\n            </div>\n          </div>\n        </ng-template>\n        <ng-container *ngIf=\"isTableField(ne!.node)\">\n          <div class=\"ajf-prop\">\n            <mat-checkbox formControlName=\"hideEmptyRows\"\n              >{{'Hide empty rows'|transloco}}</mat-checkbox\n            >\n            <mat-form-field>\n              <textarea\n                matInput\n                formControlName=\"tableDef\"\n                [placeholder]=\"'Table definition' | transloco\"\n              ></textarea>\n              <mat-error *ngIf=\"pf.get('tableDef')?.invalid\">\n                {{fieldErrorMessage(pf.get('tableDef'), 'tableDef')}}\n              </mat-error>\n            </mat-form-field>\n          </div>\n        </ng-container>\n      </ng-template>\n    </form>\n  </ng-container>\n</ng-container>\n", styles: ["ajf-fb-node-properties{display:block;padding:2px 2px 2px 5px;position:relative}ajf-fb-node-properties mat-icon{cursor:pointer}ajf-fb-node-properties .ajf-header{display:flex;flex-direction:row;align-items:center;flex-wrap:nowrap}ajf-fb-node-properties .ajf-header>h3,ajf-fb-node-properties .ajf-header>label{flex:1 0 auto;margin-right:.5em}ajf-fb-node-properties .ajf-header>mat-icon{flex:0 0 auto;margin-left:.5em}ajf-fb-node-properties .ajf-disabled-overlay{position:absolute;inset:0;opacity:.4;background-color:currentColor}ajf-fb-node-properties .ajf-emph{font-style:italic}ajf-fb-node-properties [mat-raised-button]{margin:.5em 0}ajf-fb-node-properties [mat-raised-button].ajf-pointer{cursor:pointer}ajf-fb-node-properties [mat-raised-button] .ajf-icon-cont{display:flex;flex-direction:row;align-items:center;position:relative}ajf-fb-node-properties [mat-raised-button] .ajf-icon-cont span{flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;display:block;margin:auto;position:relative;max-height:30px;max-width:100%}ajf-fb-node-properties .ajf-validation-row{margin:.5em 0;display:flex;flex-direction:row;align-items:center}ajf-fb-node-properties .ajf-validation-row button{flex:1 1 auto}ajf-fb-node-properties .ajf-validation-row mat-icon{flex:0 0 auto}ajf-fb-node-properties .ajf-prop{margin:.5em 0}ajf-fb-node-properties .ajf-prop .mdc-button__label{max-width:100%}ajf-fb-node-properties mat-form-field,ajf-fb-node-properties mat-slider,ajf-fb-node-properties [mat-raised-button]{width:100%}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormBuilderService }, { type: i2.MatDialog }, { type: i3.UntypedFormBuilder }, { type: i4.AjfNodePropertiesNameMatchValidator }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFbNodeProperties, { className: "AjfFbNodeProperties", filePath: "node-properties.ts", lineNumber: 147 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1wcm9wZXJ0aWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL3NyYy9ub2RlLXByb3BlcnRpZXMudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvc3JjL25vZGUtcHJvcGVydGllcy5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFTTCxPQUFPLEVBQ1Asa0JBQWtCLEVBQ2xCLGFBQWEsRUFDYixZQUFZLEVBQ1osWUFBWSxFQUNaLHdCQUF3QixFQUN4QixZQUFZLEdBQ2IsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQWUsZUFBZSxFQUFFLGNBQWMsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9FLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFlBQVksRUFHWixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUtMLFVBQVUsR0FDWCxNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sRUFBYSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixNQUFNLEVBQ04sR0FBRyxFQUNILFFBQVEsRUFDUixXQUFXLEVBQ1gsU0FBUyxFQUNULFNBQVMsRUFDVCxJQUFJLEVBQ0osY0FBYyxHQUNmLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDckUsT0FBTyxFQUlMLGlCQUFpQixHQUVsQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBQyxvQ0FBb0MsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzFGLE9BQU8sRUFBQyxpQ0FBaUMsRUFBQyxNQUFNLG1DQUFtQyxDQUFDOzs7Ozs7Ozs7Ozs7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QUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUN6RSxPQUFPLFFBQVEsQ0FBQztRQUNsQixDQUFDO1FBQ0QsSUFBSSxTQUFTLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUN4RSxPQUFPLE9BQU8sQ0FBQztRQUNqQixDQUFDO1FBQ0QsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztvSEF2c0NVLG1CQUFtQjtvRUFBbkIsbUJBQW1CO1lDbEpoQyx5QkFBNkY7O1lBQzdGLHNGQUE0Qzs7O1lBRHZDLCtFQUFvRDtZQUMxQyxlQUFzQjtZQUF0QiwwREFBc0I7OztpRkRpSnhCLG1CQUFtQjtjQVAvQixTQUFTOzJCQUNFLHdCQUF3QixpQkFHbkIsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTTs7a0ZBRXBDLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmQ2hvaWNlc09yaWdpbixcbiAgQWpmRW1wdHlGaWVsZCxcbiAgQWpmRmllbGRXaXRoQ2hvaWNlcyxcbiAgQWpmTm9kZSxcbiAgQWpmTnVtYmVyRmllbGQsXG4gIEFqZlJhbmdlRmllbGQsXG4gIEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGUsXG4gIEFqZlRhYmxlRmllbGQsXG4gIGlzRmllbGQsXG4gIGlzRmllbGRXaXRoQ2hvaWNlcyxcbiAgaXNOdW1iZXJGaWVsZCxcbiAgaXNFbXB0eUZpZWxkLFxuICBpc1JhbmdlRmllbGQsXG4gIGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZSxcbiAgaXNUYWJsZUZpZWxkLFxufSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtBamZDb25kaXRpb24sIGFsd2F5c0NvbmRpdGlvbiwgbmV2ZXJDb25kaXRpb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEFic3RyYWN0Q29udHJvbCxcbiAgVW50eXBlZEZvcm1CdWlsZGVyLFxuICBVbnR5cGVkRm9ybUdyb3VwLFxuICBWYWxpZGF0b3JGbixcbiAgVmFsaWRhdG9ycyxcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtNYXREaWFsb2csIE1hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGRpc3RpbmN0VW50aWxDaGFuZ2VkLFxuICBmaWx0ZXIsXG4gIG1hcCxcbiAgcGFpcndpc2UsXG4gIHNoYXJlUmVwbGF5LFxuICBzdGFydFdpdGgsXG4gIHN3aXRjaE1hcCxcbiAgdGFrZSxcbiAgd2l0aExhdGVzdEZyb20sXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZ30gZnJvbSAnLi9jb25kaXRpb24tZWRpdG9yLWRpYWxvZyc7XG5pbXBvcnQge1xuICBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSxcbiAgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlLFxuICBBamZGb3JtQnVpbGRlclZhbGlkYXRpb24sXG4gIGNsZWFuRGVmYXVsdFZhbHVlLFxuICBGb3JtQnVpbGRlckZpZWxkVmFsaWRhdGlvbixcbn0gZnJvbSAnLi9mb3JtLWJ1aWxkZXItc2VydmljZSc7XG5pbXBvcnQge0FqZkZiVmFsaWRhdGlvbkNvbmRpdGlvbkVkaXRvckRpYWxvZ30gZnJvbSAnLi92YWxpZGF0aW9uLWNvbmRpdGlvbi1lZGl0b3ItZGlhbG9nJztcbmltcG9ydCB7QWpmRmJXYXJuaW5nQ29uZGl0aW9uRWRpdG9yRGlhbG9nfSBmcm9tICcuL3dhcm5pbmctY29uZGl0aW9uLWVkaXRvci1kaWFsb2cnO1xuaW1wb3J0IHtNYXRDaGVja2JveH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hlY2tib3gnO1xuaW1wb3J0IHtBamZOb2RlUHJvcGVydGllc05hbWVNYXRjaFZhbGlkYXRvcn0gZnJvbSAnLi9ub2RlLXByb3BlcnRpZXMtbmFtZS12YWxpZGF0b3InO1xuXG5mdW5jdGlvbiBjaGVja1JlcHNWYWxpZGl0eShjOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwge1xuICBjb25zdCBtaW5SZXBzID0gYy52YWx1ZS5taW5SZXBzO1xuICBjb25zdCBtYXhSZXBzID0gYy52YWx1ZS5tYXhSZXBzO1xuICBpZiAobWluUmVwcyAmJiBtYXhSZXBzICYmIG1pblJlcHMgPiBtYXhSZXBzKSB7XG4gICAgcmV0dXJuIHtyZXBzOiAnTWluIHJlcGV0aW9ucyBjYW5ub3QgYmUgZ3JlYXRlciB0aGFuIG1heCByZXBldGl0aW9ucyd9O1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBjaGVja1ZhbHVlTGltaXRzVmFsaWRpdHkoYzogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0gfCBudWxsIHtcbiAgY29uc3QgbWluVmFsdWUgPSBjLnZhbHVlLm1pblZhbHVlO1xuICBjb25zdCBtYXhWYWx1ZSA9IGMudmFsdWUubWF4VmFsdWU7XG4gIGlmIChtaW5WYWx1ZSAhPSBudWxsICYmIG1heFZhbHVlICE9IG51bGwgJiYgbWluVmFsdWUgPiBtYXhWYWx1ZSkge1xuICAgIHJldHVybiB7dmFsdWVMaW1pdDogJ01pbiB2YWx1ZSBjYW5ub3QgYmUgZ3JlYXRlciB0aGFuIG1heCB2YWx1ZSd9O1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBjaGVja0RpZ2l0c1ZhbGlkaXR5KGM6IEFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHwgbnVsbCB7XG4gIGNvbnN0IG1pbkRpZ2l0cyA9IGMudmFsdWUubWluRGlnaXRzO1xuICBjb25zdCBtYXhEaWdpdHMgPSBjLnZhbHVlLm1heERpZ2l0cztcbiAgaWYgKG1pbkRpZ2l0cyAhPSBudWxsICYmIG1heERpZ2l0cyAhPSBudWxsICYmIG1pbkRpZ2l0cyA+IG1heERpZ2l0cykge1xuICAgIHJldHVybiB7ZGlnaXRzOiAnTWluIGRpZ2l0cyBjYW5ub3QgYmUgZ3JlYXRlciB0aGFuIG1heCBkaWdpdHMnfTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gY2hlY2tSYW5nZVZhbGlkaXR5KGM6IEFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHwgbnVsbCB7XG4gIGNvbnN0IHtzdGFydCwgZW5kfSA9IGMudmFsdWU7XG4gIGlmIChzdGFydCAhPSBudWxsICYmIGVuZCAhPSBudWxsICYmIHN0YXJ0ID4gZW5kKSB7XG4gICAgcmV0dXJuIHtyYW5nZTogJ0VuZCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBzdGFydCd9O1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBjaGVja1RhYmxlVmFsaWRpdHkoYzogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0gfCBudWxsIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBqc29uVmFsdWUgPSBKU09OLnBhcnNlKGMudmFsdWUpO1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhqc29uVmFsdWUpLmxlbmd0aFxuICAgICAgPyBudWxsXG4gICAgICA6IHt0YWJsZURlZjogJ1lvdSBtdXN0IGVudGVyIGEgdmFsaWQgSlNPTiBmb3IgVGFibGUgZGVmaW5pdGlvbid9O1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4ge3RhYmxlRGVmOiAnSW52YWxpZCBKU09OIGZvciBUYWJsZSBkZWZpbml0aW9uJ307XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBWYWxpZGF0aW9uQ29uZGl0aW9uIHtcbiAgY29uZGl0aW9uOiBzdHJpbmc7XG4gIGVycm9yTWVzc2FnZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFdhcm5pbmdDb25kaXRpb24ge1xuICBjb25kaXRpb246IHN0cmluZztcbiAgd2FybmluZ01lc3NhZ2U6IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWZiLW5vZGUtcHJvcGVydGllcycsXG4gIHRlbXBsYXRlVXJsOiAnbm9kZS1wcm9wZXJ0aWVzLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbm9kZS1wcm9wZXJ0aWVzLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZiTm9kZVByb3BlcnRpZXMgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIHByaXZhdGUgX2ZpZWxkU2l6ZXM6IHtsYWJlbDogc3RyaW5nOyB2YWx1ZTogc3RyaW5nfVtdID0gW1xuICAgIHtsYWJlbDogJ05vcm1hbCcsIHZhbHVlOiAnbm9ybWFsJ30sXG4gICAge2xhYmVsOiAnU21hbGwnLCB2YWx1ZTogJ3NtYWxsJ30sXG4gICAge2xhYmVsOiAnU21hbGxlcicsIHZhbHVlOiAnc21hbGxlcid9LFxuICAgIHtsYWJlbDogJ1RpbnknLCB2YWx1ZTogJ3RpbnknfSxcbiAgICB7bGFiZWw6ICdNaW5pJywgdmFsdWU6ICdtaW5pJ30sXG4gIF07XG4gIGdldCBmaWVsZFNpemVzKCk6IHtsYWJlbDogc3RyaW5nOyB2YWx1ZTogc3RyaW5nfVtdIHtcbiAgICByZXR1cm4gdGhpcy5fZmllbGRTaXplcztcbiAgfVxuXG4gIHByaXZhdGUgX25vZGVFbnRyeTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IG51bGw+O1xuICBnZXQgbm9kZUVudHJ5KCk6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkgfCBudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGVFbnRyeTtcbiAgfVxuXG4gIHByaXZhdGUgX2Nob2ljZXNPcmlnaW5zOiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSA9IFtdO1xuICBnZXQgY2hvaWNlc09yaWdpbnMoKTogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10ge1xuICAgIHJldHVybiB0aGlzLl9jaG9pY2VzT3JpZ2lucztcbiAgfVxuXG4gIHByaXZhdGUgX2VuYWJsZWQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIGdldCBlbmFibGVkKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9lbmFibGVkO1xuICB9XG5cbiAgcHJpdmF0ZSBfcHJvcGVydGllc0Zvcm0hOiBPYnNlcnZhYmxlPFVudHlwZWRGb3JtR3JvdXA+O1xuICBnZXQgcHJvcGVydGllc0Zvcm0oKTogT2JzZXJ2YWJsZTxVbnR5cGVkRm9ybUdyb3VwPiB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXNGb3JtO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFzQ2hvaWNlczogT2JzZXJ2YWJsZTxib29sZWFuPiB8IHVuZGVmaW5lZDtcbiAgZ2V0IGhhc0Nob2ljZXMoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc0Nob2ljZXM7XG4gIH1cblxuICBwcml2YXRlIF9jdXJWaXNpYmlsaXR5OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgZ2V0IGN1clZpc2liaWxpdHkoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2N1clZpc2liaWxpdHk7XG4gIH1cblxuICBwcml2YXRlIF9jdXJGb3JtdWxhUmVwczogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIGdldCBjdXJGb3JtdWxhUmVwcygpOiBzdHJpbmcgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fY3VyRm9ybXVsYVJlcHM7XG4gIH1cblxuICBwcml2YXRlIF9jdXJDaG9pY2VzRmlsdGVyOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgZ2V0IGN1ckNob2ljZXNGaWx0ZXIoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2N1ckNob2ljZXNGaWx0ZXI7XG4gIH1cblxuICBwcml2YXRlIF9jdXJGb3JjZVZhbHVlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgZ2V0IGN1ckZvcmNlVmFsdWUoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2N1ckZvcmNlVmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF9jdXJGb3JtdWxhOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgZ2V0IGN1ckZvcm11bGEoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2N1ckZvcm11bGE7XG4gIH1cblxuICBwcml2YXRlIF9jb25kaXRpb25hbEJyYW5jaGVzOiBzdHJpbmdbXSA9IFtdO1xuICBnZXQgY29uZGl0aW9uYWxCcmFuY2hlcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXM7XG4gIH1cblxuICBwcml2YXRlIF92YWxpZGF0aW9uQ29uZGl0aW9uczogVmFsaWRhdGlvbkNvbmRpdGlvbltdID0gW107XG4gIGdldCB2YWxpZGF0aW9uQ29uZGl0aW9ucygpOiBWYWxpZGF0aW9uQ29uZGl0aW9uW10ge1xuICAgIHJldHVybiB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9ucztcbiAgfVxuXG4gIHByaXZhdGUgX3dhcm5pbmdDb25kaXRpb25zOiBXYXJuaW5nQ29uZGl0aW9uW10gPSBbXTtcbiAgZ2V0IHdhcm5pbmdDb25kaXRpb25zKCk6IFdhcm5pbmdDb25kaXRpb25bXSB7XG4gICAgcmV0dXJuIHRoaXMuX3dhcm5pbmdDb25kaXRpb25zO1xuICB9XG5cbiAgcHJpdmF0ZSBfbmV4dFNsaWRlQ29uZGl0aW9uOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIGdldCBuZXh0U2xpZGVDb25kaXRpb24oKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uO1xuICB9XG5cbiAgcHJpdmF0ZSBfdHJpZ2dlckNvbmRpdGlvbnM6IHN0cmluZ1tdID0gW107XG4gIGdldCB0cmlnZ2VyQ29uZGl0aW9ucygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zO1xuICB9XG5cbiAgaXNSZXBlYXRpbmdDb250YWluZXJOb2RlOiAobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IG51bGwpID0+IGJvb2xlYW4gPSBub2RlRW50cnkgPT4ge1xuICAgIHJldHVybiBub2RlRW50cnkgIT0gbnVsbCAmJiBpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGUobm9kZUVudHJ5Lm5vZGUpO1xuICB9O1xuXG4gIHByaXZhdGUgX3Zpc2liaWxpdHlPcHRTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfdmlzaWJpbGl0eVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9jb25kaXRpb25hbEJyYW5jaGVzU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9mb3JtdWxhUmVwc1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfY2hvaWNlc0ZpbHRlclN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZm9ybXVsYVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZm9yY2VWYWx1ZVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfdmFsaWRhdGlvbkNvbmRpdGlvbnNTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3dhcm5pbmdDb25kaXRpb25zU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9uZXh0U2xpZGVDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2Nob2ljZXNPcmlnaW5zU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF90cmlnZ2VyQ29uZGl0aW9uc1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0Q29uZGl0aW9uRGlhbG9nOiBNYXREaWFsb2dSZWY8QWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2c+IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX2VkaXRDb25kaXRpb25EaWFsb2dTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2c6IE1hdERpYWxvZ1JlZjxBamZGYlZhbGlkYXRpb25Db25kaXRpb25FZGl0b3JEaWFsb2c+IHwgbnVsbCA9XG4gICAgbnVsbDtcbiAgcHJpdmF0ZSBfZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2c6IE1hdERpYWxvZ1JlZjxBamZGYldhcm5pbmdDb25kaXRpb25FZGl0b3JEaWFsb2c+IHwgbnVsbCA9XG4gICAgbnVsbDtcbiAgcHJpdmF0ZSBfZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2dTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0VmlzaWJpbGl0eUV2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9lZGl0VmlzaWJpbGl0eVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0Q29uZGl0aW9uYWxCcmFuY2hFdnQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHByaXZhdGUgX2VkaXRDb25kaXRpb25hbEJyYW5jaFN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0Rm9ybXVsYVJlcHNFdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfZWRpdEZvcm11bGFSZXBzU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRDaG9pY2VzRmlsdGVyRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2VkaXRDaG9pY2VzRmlsdGVyU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRGb3JtdWxhRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2VkaXRGb3JtdWxhU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRGb3JjZVZhbHVlRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2VkaXRGb3JjZVZhbHVlU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBwcml2YXRlIF9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9hZGRWYWxpZGF0aW9uQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2FkZFZhbGlkYXRpb25Db25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfcmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0V2FybmluZ0NvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfZWRpdFdhcm5pbmdDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfYWRkV2FybmluZ0NvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9hZGRXYXJuaW5nQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX3JlbW92ZVdhcm5pbmdDb25kaXRpb25FdnQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHByaXZhdGUgX3JlbW92ZVdhcm5pbmdDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdE5leHRTbGlkZUNvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9lZGl0TmV4dFNsaWRlQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRUcmlnZ2VyQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBwcml2YXRlIF9lZGl0VHJpZ2dlckNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9hZGRUcmlnZ2VyQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2FkZFRyaWdnZXJDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlVHJpZ2dlckNvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfcmVtb3ZlVHJpZ2dlckNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9zYXZlRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX3NhdmVTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfaXNOb2RlVmFsaWRTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX25vZGVOYW1lQ2hhbmdlZFN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgX3NlcnZpY2U6IEFqZkZvcm1CdWlsZGVyU2VydmljZSxcbiAgICBwcml2YXRlIF9kaWFsb2c6IE1hdERpYWxvZyxcbiAgICBwcml2YXRlIF9mYjogVW50eXBlZEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgX25vZGVOYW1lVmFsaWRhdG9yOiBBamZOb2RlUHJvcGVydGllc05hbWVNYXRjaFZhbGlkYXRvcixcbiAgKSB7XG4gICAgdGhpcy5fbm9kZUVudHJ5ID0gX3NlcnZpY2UuZWRpdGVkTm9kZUVudHJ5O1xuICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zU3ViID0gX3NlcnZpY2UuY2hvaWNlc09yaWdpbnMuc3Vic2NyaWJlKFxuICAgICAgYyA9PiAodGhpcy5fY2hvaWNlc09yaWdpbnMgPSBjIHx8IFtdKSxcbiAgICApO1xuXG4gICAgdGhpcy5fZW5hYmxlZCA9IHRoaXMuX25vZGVFbnRyeS5waXBlKG1hcChuID0+IG4gIT0gbnVsbCkpO1xuXG4gICAgdGhpcy5faW5pdEZvcm0oKTtcbiAgICB0aGlzLl9pbml0VmlzaWJpbGl0eUVkaXQoKTtcbiAgICB0aGlzLl9pbml0Q29uZGl0aW9uYWxCcmFuY2hFZGl0KCk7XG4gICAgdGhpcy5faW5pdEZvcm11bGFSZXBzRWRpdCgpO1xuICAgIHRoaXMuX2luaXRDaG9pY2VzRmlsdGVyRWRpdCgpO1xuICAgIHRoaXMuX2luaXRGb3JtdWxhRWRpdCgpO1xuICAgIHRoaXMuX2luaXRGb3JjZVZhbHVlRWRpdCgpO1xuICAgIHRoaXMuX2luaXRWYWxpZGF0aW9uQ29uZGl0aW9uRWRpdCgpO1xuICAgIHRoaXMuX2luaXRBZGRWYWxpZGF0aW9uQ29uZGl0aW9uKCk7XG4gICAgdGhpcy5faW5pdFJlbW92ZVZhbGlkYXRpb25Db25kaXRpb24oKTtcbiAgICB0aGlzLl9pbml0V2FybmluZ0NvbmRpdGlvbkVkaXQoKTtcbiAgICB0aGlzLl9pbml0QWRkV2FybmluZ0NvbmRpdGlvbigpO1xuICAgIHRoaXMuX2luaXRSZW1vdmVXYXJuaW5nQ29uZGl0aW9uKCk7XG4gICAgdGhpcy5faW5pdE5leHRTbGlkZUNvbmRpdGlvbkVkaXQoKTtcbiAgICB0aGlzLl9pbml0VHJpZ2dlckNvbmRpdGlvbkVkaXQoKTtcbiAgICB0aGlzLl9pbml0QWRkVHJpZ2dlckNvbmRpdGlvbigpO1xuICAgIHRoaXMuX2luaXRSZW1vdmVUcmlnZ2VyQ29uZGl0aW9uKCk7XG4gICAgdGhpcy5faW5pdFNhdmUoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX2lzTm9kZVZhbGlkU3ViID0gdGhpcy5fcHJvcGVydGllc0Zvcm1cbiAgICAgIC5waXBlKFxuICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLl9zZXJ2aWNlLmVkaXRlZE5vZGVFbnRyeSksXG4gICAgICAgIHN3aXRjaE1hcCgoW2Zvcm1Hcm91cCwgX2ZiTm9kZV0pID0+IHtcbiAgICAgICAgICBmb3JtR3JvdXAubWFya0FsbEFzVG91Y2hlZCgpO1xuICAgICAgICAgIGZvcm1Hcm91cC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG5cbiAgICAgICAgICBjb25zdCBuYW1lQ29udHJvbCA9IGZvcm1Hcm91cC5nZXQoJ25hbWUnKTtcblxuICAgICAgICAgIGNvbnN0IG5vZGVWYWxpZGF0aW9uOiBGb3JtQnVpbGRlckZpZWxkVmFsaWRhdGlvbiA9IHtcbiAgICAgICAgICAgIGlzVmFsaWQ6IGZvcm1Hcm91cC52YWxpZCxcbiAgICAgICAgICAgIGVycm9yczogZm9ybUdyb3VwLmVycm9ycyxcbiAgICAgICAgICB9O1xuICAgICAgICAgIGNvbnN0IGZiTm9kZVZhbGlkYXRpb246IEFqZkZvcm1CdWlsZGVyVmFsaWRhdGlvbiA9IHt9O1xuICAgICAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IG5hbWVDb250cm9sPy52YWx1ZSB8fCAnZXJyb3InO1xuICAgICAgICAgIGZiTm9kZVZhbGlkYXRpb25bZmllbGROYW1lXSA9IG5vZGVWYWxpZGF0aW9uO1xuICAgICAgICAgIHRoaXMuX3NlcnZpY2UuZWRpdE5vZGVWYWxpZGF0aW9uKGZiTm9kZVZhbGlkYXRpb24pO1xuXG4gICAgICAgICAgaWYgKG5hbWVDb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLl9ub2RlTmFtZUNoYW5nZWRTdWIgPSBuYW1lQ29udHJvbC52YWx1ZUNoYW5nZXNcbiAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc3RhcnRXaXRoKG5hbWVDb250cm9sLnZhbHVlKSxcbiAgICAgICAgICAgICAgICBwYWlyd2lzZSgpLFxuICAgICAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKChhLCBiKSA9PiBhWzFdID09PSBiWzFdKSxcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuc3Vic2NyaWJlKChbb2xkVmFsdWUsIF9uZXdWYWx1ZV0pID0+IHtcbiAgICAgICAgICAgICAgICAvLyBzZXQgdmFsaWRhdGlvbiB0cnVlIGZvciBvbGQgdW51c2VkIG5hbWVcbiAgICAgICAgICAgICAgICBmYk5vZGVWYWxpZGF0aW9uW29sZFZhbHVlXSA9IHtpc1ZhbGlkOiB0cnVlLCBlcnJvcnM6IG51bGx9O1xuICAgICAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UuZWRpdE5vZGVWYWxpZGF0aW9uKGZiTm9kZVZhbGlkYXRpb24pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gZm9ybUdyb3VwLnN0YXR1c0NoYW5nZXMucGlwZShcbiAgICAgICAgICAgIGZpbHRlcihzdGF0dXMgPT4gc3RhdHVzICE9PSAnVkFMSUQnKSxcbiAgICAgICAgICAgIG1hcCgoKSA9PiB7XG4gICAgICAgICAgICAgIG5vZGVWYWxpZGF0aW9uLmVycm9ycyA9IGZvcm1Hcm91cC5lcnJvcnM7XG4gICAgICAgICAgICAgIG5vZGVWYWxpZGF0aW9uLmlzVmFsaWQgPSBmb3JtR3JvdXAudmFsaWQ7XG4gICAgICAgICAgICAgIGNvbnN0IGN1cnJGaWVsZE5hbWUgPSBmb3JtR3JvdXAuZ2V0KCduYW1lJyk/LnZhbHVlIHx8ICdlcnJvcic7XG4gICAgICAgICAgICAgIGZiTm9kZVZhbGlkYXRpb25bY3VyckZpZWxkTmFtZV0gPSBub2RlVmFsaWRhdGlvbjtcbiAgICAgICAgICAgICAgcmV0dXJuIGZiTm9kZVZhbGlkYXRpb247XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgICAgKTtcbiAgICAgICAgfSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKGZiTm9kZVZhbGlkYXRpb24gPT4ge1xuICAgICAgICB0aGlzLl9zZXJ2aWNlLmVkaXROb2RlVmFsaWRhdGlvbihmYk5vZGVWYWxpZGF0aW9uKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZWRpdFZpc2liaWxpdHkoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdFZpc2liaWxpdHlFdnQuZW1pdCgpO1xuICB9XG5cbiAgZWRpdENvbmRpdGlvbmFsQnJhbmNoKGlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlkeCA8IDAgfHwgaWR4ID49IHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2VkaXRDb25kaXRpb25hbEJyYW5jaEV2dC5lbWl0KGlkeCk7XG4gIH1cblxuICBlZGl0Rm9ybXVsYVJlcHMoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdEZvcm11bGFSZXBzRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIGVkaXRDaG9pY2VzRmlsdGVyKCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRDaG9pY2VzRmlsdGVyRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIGVkaXRGb3JtdWxhKCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRGb3JtdWxhRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIGVkaXRGb3JjZVZhbHVlKCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRGb3JjZVZhbHVlRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIGVkaXRWYWxpZGF0aW9uQ29uZGl0aW9uKGlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlkeCA8IDAgfHwgaWR4ID49IHRoaXMuX3ZhbGlkYXRpb25Db25kaXRpb25zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkV2dC5lbWl0KGlkeCk7XG4gIH1cblxuICBhZGRWYWxpZGF0aW9uQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFZhbGlkYXRpb25Db25kaXRpb25FdnQuZW1pdCgpO1xuICB9XG5cbiAgcmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvbihpZHg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fcmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvbkV2dC5lbWl0KGlkeCk7XG4gIH1cblxuICBlZGl0V2FybmluZ0NvbmRpdGlvbihpZHg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl93YXJuaW5nQ29uZGl0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25FdnQuZW1pdChpZHgpO1xuICB9XG5cbiAgYWRkV2FybmluZ0NvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRXYXJuaW5nQ29uZGl0aW9uRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIHJlbW92ZVdhcm5pbmdDb25kaXRpb24oaWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5fd2FybmluZ0NvbmRpdGlvbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3JlbW92ZVdhcm5pbmdDb25kaXRpb25FdnQuZW1pdChpZHgpO1xuICB9XG5cbiAgZWRpdE5leHRTbGlkZUNvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0TmV4dFNsaWRlQ29uZGl0aW9uRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIGVkaXRUcmlnZ2VyQ29uZGl0aW9uKGlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlkeCA8IDAgfHwgaWR4ID49IHRoaXMuX3RyaWdnZXJDb25kaXRpb25zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9lZGl0VHJpZ2dlckNvbmRpdGlvbkV2dC5lbWl0KGlkeCk7XG4gIH1cblxuICBhZGRUcmlnZ2VyQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRyaWdnZXJDb25kaXRpb25FdnQuZW1pdCgpO1xuICB9XG5cbiAgcmVtb3ZlVHJpZ2dlckNvbmRpdGlvbihpZHg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl90cmlnZ2VyQ29uZGl0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fcmVtb3ZlVHJpZ2dlckNvbmRpdGlvbkV2dC5lbWl0KGlkeCk7XG4gIH1cblxuICBpc0ZpZWxkKG5vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkgfCBudWxsKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG5vZGVFbnRyeSAhPSBudWxsICYmIGlzRmllbGQobm9kZUVudHJ5Lm5vZGUpO1xuICB9XG5cbiAgaXNOdW1lcmljRmllbGQobm9kZTogQWpmTm9kZSk6IG5vZGUgaXMgQWpmTnVtYmVyRmllbGQge1xuICAgIHJldHVybiBpc0ZpZWxkKG5vZGUpICYmIGlzTnVtYmVyRmllbGQobm9kZSk7XG4gIH1cblxuICBpc0VtcHR5RmllbGQobm9kZTogQWpmTm9kZSk6IG5vZGUgaXMgQWpmRW1wdHlGaWVsZCB7XG4gICAgcmV0dXJuIGlzRmllbGQobm9kZSkgJiYgaXNFbXB0eUZpZWxkKG5vZGUpO1xuICB9XG5cbiAgaXNGaWVsZFdpdGhDaG9pY2VzKG5vZGU6IEFqZk5vZGUpOiBub2RlIGlzIEFqZkZpZWxkV2l0aENob2ljZXM8YW55PiB7XG4gICAgcmV0dXJuIGlzRmllbGQobm9kZSkgJiYgaXNGaWVsZFdpdGhDaG9pY2VzKG5vZGUpO1xuICB9XG5cbiAgaGFzQ2hvaWNlc09yaWdpblJlZigpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fcHJvcGVydGllc0Zvcm0ucGlwZShcbiAgICAgIG1hcChmZyA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZmcuZ2V0KCdjaG9pY2VzT3JpZ2luUmVmJyk/LnZhbHVlICE9IG51bGw7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0pLFxuICAgICAgdGFrZSgxKSxcbiAgICApO1xuICB9XG5cbiAgaXNSYW5nZUZpZWxkKG5vZGU6IEFqZk5vZGUpOiBub2RlIGlzIEFqZlJhbmdlRmllbGQge1xuICAgIHJldHVybiBpc0ZpZWxkKG5vZGUpICYmIGlzUmFuZ2VGaWVsZChub2RlKTtcbiAgfVxuXG4gIGlzVGFibGVGaWVsZChub2RlOiBBamZOb2RlKTogbm9kZSBpcyBBamZUYWJsZUZpZWxkIHtcbiAgICByZXR1cm4gaXNGaWVsZChub2RlKSAmJiBpc1RhYmxlRmllbGQobm9kZSk7XG4gIH1cblxuICBmb3JjZUNoZWNrYm94KGNoZWNrZWQ6IGJvb2xlYW4sIGNoZWNrYm94OiBNYXRDaGVja2JveCk6IHZvaWQge1xuICAgIGlmICghY2hlY2tlZCB8fCAhY2hlY2tib3gpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNoZWNrYm94LmNoZWNrZWQpIHtcbiAgICAgIGNoZWNrYm94LnRvZ2dsZSgpO1xuICAgIH1cbiAgfVxuXG4gIHNhdmUoKTogdm9pZCB7XG4gICAgdGhpcy5fc2F2ZUV2dC5lbWl0KCk7XG4gIH1cblxuICBjYW5jZWwoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5jYW5jZWxOb2RlRW50cnlFZGl0KCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGVycm9yIG1lc3NhZ2UgZm9yIHRoZSBmb3JtIGNvbnRyb2xcbiAgICogQHBhcmFtIGZvcm1Db250cm9sXG4gICAqIEBwYXJhbSBmaWVsZE5hbWVcbiAgICogQHJldHVybnNcbiAgICovXG4gIGZpZWxkRXJyb3JNZXNzYWdlKGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2wgfCBudWxsLCBmaWVsZE5hbWU6IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICAgIGlmICghZm9ybUNvbnRyb2wgfHwgIWZpZWxkTmFtZSkgcmV0dXJuIG51bGw7XG4gICAgaWYgKGZvcm1Db250cm9sLmhhc0Vycm9yKCdyZXF1aXJlZCcpKSB7XG4gICAgICByZXR1cm4gYFlvdSBtdXN0IGVudGVyIGEgdmFsdWUgZm9yICR7ZmllbGROYW1lfWA7XG4gICAgfVxuICAgIGlmIChmb3JtQ29udHJvbC5oYXNFcnJvcignbmFtZV9leGlzdHMnKSkge1xuICAgICAgcmV0dXJuIGBUaGlzICR7ZmllbGROYW1lfSBoYXMgYWxyZWFkeSBiZWVuIHVzZWRgO1xuICAgIH1cbiAgICBpZiAoZm9ybUNvbnRyb2wuaGFzRXJyb3IoZmllbGROYW1lKSkge1xuICAgICAgcmV0dXJuIGZvcm1Db250cm9sLmdldEVycm9yKGZpZWxkTmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhbGwgZm9ybSBlcnJvciBtZXNzYWdlc1xuICAgKiBAcGFyYW0gZm9ybUdyb3VwXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBhbGxFcnJvck1lc3NhZ2VzKGZvcm1Hcm91cDogVW50eXBlZEZvcm1Hcm91cCB8IG51bGwpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBpZiAoIWZvcm1Hcm91cCkgcmV0dXJuIG51bGw7XG4gICAgbGV0IGZvcm1FcnJvcnM6IHN0cmluZ1tdID0gW107XG4gICAgaWYgKGZvcm1Hcm91cC5lcnJvcnMgJiYgT2JqZWN0LmtleXMoZm9ybUdyb3VwLmVycm9ycykubGVuZ3RoKSB7XG4gICAgICBmb3JtRXJyb3JzID0gT2JqZWN0LmtleXMoZm9ybUdyb3VwLmVycm9ycykubWFwKGtleSA9PiBgJHtrZXl9OiAke2Zvcm1Hcm91cC5lcnJvcnM/LltrZXldfWApO1xuICAgIH1cblxuICAgIGlmICghZm9ybUVycm9ycy5sZW5ndGggJiYgZm9ybUdyb3VwLmNvbnRyb2xzKSB7XG4gICAgICBmb3JtRXJyb3JzID0gT2JqZWN0LmtleXMoZm9ybUdyb3VwLmNvbnRyb2xzKVxuICAgICAgICAuZmlsdGVyKGtleSA9PiBmb3JtR3JvdXAuY29udHJvbHNba2V5XS5lcnJvcnMpXG4gICAgICAgIC5tYXAoa2V5ID0+IGAke2tleX06ICR7SlNPTi5zdHJpbmdpZnkoZm9ybUdyb3VwLmNvbnRyb2xzW2tleV0uZXJyb3JzKX1gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZm9ybUVycm9ycy5qb2luKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmNhbmNlbCgpO1xuICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zU3ViLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB0aGlzLl92aXNpYmlsaXR5T3B0U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fdmlzaWJpbGl0eVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2Zvcm11bGFSZXBzU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fY2hvaWNlc0ZpbHRlclN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2Zvcm11bGFTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9mb3JjZVZhbHVlU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl93YXJuaW5nQ29uZGl0aW9uc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zU3ViLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuXG4gICAgdGhpcy5fZWRpdENob2ljZXNGaWx0ZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0Q29uZGl0aW9uYWxCcmFuY2hTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0VmlzaWJpbGl0eVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRGb3JtdWxhUmVwc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRGb3JtdWxhU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdEZvcmNlVmFsdWVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB0aGlzLl9hZGRUcmlnZ2VyQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fYWRkVmFsaWRhdGlvbkNvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2FkZFdhcm5pbmdDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0TmV4dFNsaWRlQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdFRyaWdnZXJDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9yZW1vdmVUcmlnZ2VyQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fcmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3JlbW92ZVdhcm5pbmdDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcblxuICAgIHRoaXMuX3NhdmVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9pc05vZGVWYWxpZFN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX25vZGVOYW1lQ2hhbmdlZFN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFNhdmUoKTogdm9pZCB7XG4gICAgdGhpcy5fc2F2ZVN1YiA9IHRoaXMuX3NhdmVFdnRcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMucHJvcGVydGllc0Zvcm0pKVxuICAgICAgLnN1YnNjcmliZSgoW18sIGZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgY29uc3QgZmcgPSBmb3JtR3JvdXAgYXMgVW50eXBlZEZvcm1Hcm91cDtcbiAgICAgICAgY29uc3QgdmFsID0gey4uLmZnLnZhbHVlLCBjb25kaXRpb25hbEJyYW5jaGVzOiB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzfTtcbiAgICAgICAgdGhpcy5fc2VydmljZS5zYXZlTm9kZUVudHJ5KHZhbCk7XG4gICAgICAgIGNvbnN0IGZiTm9kZVZhbGlkYXRpb246IEFqZkZvcm1CdWlsZGVyVmFsaWRhdGlvbiA9IHt9O1xuICAgICAgICBmYk5vZGVWYWxpZGF0aW9uW3ZhbC5uYW1lXSA9IHtpc1ZhbGlkOiB0cnVlLCBlcnJvcnM6IG51bGx9O1xuICAgICAgICBmYk5vZGVWYWxpZGF0aW9uWydlcnJvciddID0ge2lzVmFsaWQ6IHRydWUsIGVycm9yczogbnVsbH07XG4gICAgICAgIHRoaXMuX3NlcnZpY2UuZWRpdE5vZGVWYWxpZGF0aW9uKDxBamZGb3JtQnVpbGRlclZhbGlkYXRpb24+ZmJOb2RlVmFsaWRhdGlvbik7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGb3JtKCk6IHZvaWQge1xuICAgIHRoaXMuX3Byb3BlcnRpZXNGb3JtID0gdGhpcy5fbm9kZUVudHJ5LnBpcGUoXG4gICAgICBmaWx0ZXIobiA9PiBuICE9IG51bGwpLFxuICAgICAgbWFwKG4gPT4ge1xuICAgICAgICBpZiAodGhpcy5fdmlzaWJpbGl0eU9wdFN1YiAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5fdmlzaWJpbGl0eU9wdFN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl92aXNpYmlsaXR5U3ViICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLl92aXNpYmlsaXR5U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXNTdWIgIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobiA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2ZiLmdyb3VwKHt9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZpc2liaWxpdHkgPSBuLm5vZGUudmlzaWJpbGl0eSAhPSBudWxsID8gbi5ub2RlLnZpc2liaWxpdHkuY29uZGl0aW9uIDogbnVsbDtcbiAgICAgICAgY29uc3QgdmlzaWJpbGl0eU9wdCA9XG4gICAgICAgICAgbi5ub2RlLnZpc2liaWxpdHkgIT0gbnVsbCA/IHRoaXMuX2d1ZXNzVmlzaWJpbGl0eU9wdChuLm5vZGUudmlzaWJpbGl0eSkgOiBudWxsO1xuICAgICAgICBsZXQgY29udHJvbHM6IGFueSA9IHtcbiAgICAgICAgICBuYW1lOiBbXG4gICAgICAgICAgICBuLm5vZGUubmFtZSxcbiAgICAgICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXG4gICAgICAgICAgICB0aGlzLl9ub2RlTmFtZVZhbGlkYXRvci5zYW1lVmFsdWVDaGVjayh0aGlzLl9jZHIsIG4ubm9kZS5pZCksXG4gICAgICAgICAgXSxcbiAgICAgICAgICBsYWJlbDogW24ubm9kZS5sYWJlbF0sXG4gICAgICAgICAgdmlzaWJpbGl0eU9wdDogW3Zpc2liaWxpdHlPcHQsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgIHZpc2liaWxpdHk6IFt2aXNpYmlsaXR5LCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICBjb25kaXRpb25hbEJyYW5jaGVzTnVtOiBuLm5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGgsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHZhbGlkYXRvcnM6IFZhbGlkYXRvckZuW10gPSBbXTtcblxuICAgICAgICBpZiAoaXNSZXBlYXRpbmdDb250YWluZXJOb2RlKG4ubm9kZSkpIHtcbiAgICAgICAgICBjb25zdCBybiA9IDxBamZSZXBlYXRpbmdDb250YWluZXJOb2RlPm4ubm9kZTtcblxuICAgICAgICAgIGNvbnN0IGZvcm11bGFSZXBzID0gcm4uZm9ybXVsYVJlcHMgIT0gbnVsbCA/IHJuLmZvcm11bGFSZXBzLmZvcm11bGEgOiBudWxsO1xuXG4gICAgICAgICAgY29udHJvbHMuZm9ybXVsYVJlcHMgPSBbZm9ybXVsYVJlcHNdO1xuICAgICAgICAgIGNvbnRyb2xzLm1pblJlcHMgPSBybi5taW5SZXBzO1xuICAgICAgICAgIGNvbnRyb2xzLm1heFJlcHMgPSBybi5tYXhSZXBzO1xuXG4gICAgICAgICAgdGhpcy5fY3VyRm9ybXVsYVJlcHMgPSBmb3JtdWxhUmVwcztcblxuICAgICAgICAgIHZhbGlkYXRvcnMucHVzaChjaGVja1JlcHNWYWxpZGl0eSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7bm9kZX0gPSBuO1xuXG4gICAgICAgIGlmIChpc0ZpZWxkKG5vZGUpKSB7XG4gICAgICAgICAgbGV0IGZvcmNlVmFsdWU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgICAgICAgIGxldCBub3RFbXB0eTogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgIGxldCB2YWxpZGF0aW9uQ29uZGl0aW9uczogVmFsaWRhdGlvbkNvbmRpdGlvbltdID0gW107XG4gICAgICAgICAgaWYgKG5vZGUudmFsaWRhdGlvbiAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAobm9kZS52YWxpZGF0aW9uLmZvcmNlVmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBmb3JjZVZhbHVlID0gbm9kZS52YWxpZGF0aW9uLmZvcmNlVmFsdWUuY29uZGl0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm90RW1wdHkgPSBub2RlLnZhbGlkYXRpb24ubm90RW1wdHkgIT0gbnVsbDtcbiAgICAgICAgICAgIHZhbGlkYXRpb25Db25kaXRpb25zID0gKG5vZGUudmFsaWRhdGlvbi5jb25kaXRpb25zIHx8IFtdKS5tYXAoYyA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB7Y29uZGl0aW9uOiBjLmNvbmRpdGlvbiwgZXJyb3JNZXNzYWdlOiBjLmVycm9yTWVzc2FnZX07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgbm90RW1wdHlXOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgICAgbGV0IHdhcm5pbmdDb25kaXRpb25zOiBXYXJuaW5nQ29uZGl0aW9uW10gPSBbXTtcbiAgICAgICAgICBpZiAobm9kZS53YXJuaW5nICE9IG51bGwpIHtcbiAgICAgICAgICAgIG5vdEVtcHR5VyA9IG5vZGUud2FybmluZy5ub3RFbXB0eSAhPSBudWxsO1xuICAgICAgICAgICAgd2FybmluZ0NvbmRpdGlvbnMgPSAobm9kZS53YXJuaW5nLmNvbmRpdGlvbnMgfHwgW10pLm1hcCh3ID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtjb25kaXRpb246IHcuY29uZGl0aW9uLCB3YXJuaW5nTWVzc2FnZTogdy53YXJuaW5nTWVzc2FnZX07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgZm9ybXVsYSA9IG5vZGUuZm9ybXVsYSAhPSBudWxsID8gbm9kZS5mb3JtdWxhLmZvcm11bGEgOiBudWxsO1xuICAgICAgICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9XG4gICAgICAgICAgICBub2RlLmRlZmF1bHRWYWx1ZSAmJiBub2RlLmRlZmF1bHRWYWx1ZS5mb3JtdWxhICE9IG51bGxcbiAgICAgICAgICAgICAgPyBub2RlLmRlZmF1bHRWYWx1ZS5mb3JtdWxhXG4gICAgICAgICAgICAgIDogY2xlYW5EZWZhdWx0VmFsdWUobm9kZS5kZWZhdWx0VmFsdWUsIG5vZGUpO1xuXG4gICAgICAgICAgY29udHJvbHMuZGVzY3JpcHRpb24gPSBub2RlLmRlc2NyaXB0aW9uO1xuICAgICAgICAgIGNvbnRyb2xzLmRlZmF1bHRWYWx1ZSA9IGRlZmF1bHRWYWx1ZTtcbiAgICAgICAgICBjb250cm9scy5oaW50ID0gbm9kZS5oaW50O1xuICAgICAgICAgIGNvbnRyb2xzLnNpemUgPSBub2RlLnNpemU7XG4gICAgICAgICAgY29udHJvbHMuZm9ybXVsYSA9IGZvcm11bGE7XG4gICAgICAgICAgY29udHJvbHMuZm9yY2VWYWx1ZSA9IGZvcmNlVmFsdWU7XG4gICAgICAgICAgY29udHJvbHMubm90RW1wdHkgPSBub3RFbXB0eTtcbiAgICAgICAgICBjb250cm9scy52YWxpZGF0aW9uQ29uZGl0aW9ucyA9IFt2YWxpZGF0aW9uQ29uZGl0aW9ucywgW11dO1xuICAgICAgICAgIGNvbnRyb2xzLm5vdEVtcHR5V2FybmluZyA9IG5vdEVtcHR5VztcbiAgICAgICAgICBjb250cm9scy5yZWFkb25seUZpZWxkID0gbm9kZS5lZGl0YWJsZSAhPSBudWxsID8gIW5vZGUuZWRpdGFibGUgOiBmYWxzZTtcbiAgICAgICAgICBjb250cm9scy53YXJuaW5nQ29uZGl0aW9ucyA9IFt3YXJuaW5nQ29uZGl0aW9ucywgW11dO1xuICAgICAgICAgIGNvbnRyb2xzLm5leHRTbGlkZUNvbmRpdGlvbiA9IFtub2RlLm5leHRTbGlkZUNvbmRpdGlvbl07XG5cbiAgICAgICAgICB0aGlzLl9jdXJGb3JjZVZhbHVlID0gZm9yY2VWYWx1ZTtcbiAgICAgICAgICB0aGlzLl9jdXJGb3JtdWxhID0gZm9ybXVsYTtcbiAgICAgICAgICB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9ucyA9IHZhbGlkYXRpb25Db25kaXRpb25zO1xuICAgICAgICAgIHRoaXMuX3dhcm5pbmdDb25kaXRpb25zID0gd2FybmluZ0NvbmRpdGlvbnM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc051bWVyaWNGaWVsZChub2RlKSkge1xuICAgICAgICAgIGxldCBtaW5WYWx1ZTogYW55O1xuICAgICAgICAgIGxldCBtYXhWYWx1ZTogYW55O1xuICAgICAgICAgIGxldCBtaW5EaWdpdHM6IGFueTtcbiAgICAgICAgICBsZXQgbWF4RGlnaXRzOiBhbnk7XG4gICAgICAgICAgaWYgKG5vZGUudmFsaWRhdGlvbiAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAobm9kZS52YWxpZGF0aW9uLm1pblZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgbWluVmFsdWUgPSAobm9kZS52YWxpZGF0aW9uLm1pblZhbHVlLmNvbmRpdGlvbiB8fCAnJykucmVwbGFjZSgnJHZhbHVlID49ICcsICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub2RlLnZhbGlkYXRpb24ubWF4VmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBtYXhWYWx1ZSA9IChub2RlLnZhbGlkYXRpb24ubWF4VmFsdWUuY29uZGl0aW9uIHx8ICcnKS5yZXBsYWNlKCckdmFsdWUgPD0gJywgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vZGUudmFsaWRhdGlvbi5taW5EaWdpdHMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBtaW5EaWdpdHMgPSAobm9kZS52YWxpZGF0aW9uLm1pbkRpZ2l0cy5jb25kaXRpb24gfHwgJycpLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgJyR2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA+PSAnLFxuICAgICAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vZGUudmFsaWRhdGlvbi5tYXhEaWdpdHMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBtYXhEaWdpdHMgPSAobm9kZS52YWxpZGF0aW9uLm1heERpZ2l0cy5jb25kaXRpb24gfHwgJycpLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgJyR2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA8PSAnLFxuICAgICAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRyb2xzLm1pblZhbHVlID0gbWluVmFsdWU7XG4gICAgICAgICAgY29udHJvbHMubWF4VmFsdWUgPSBtYXhWYWx1ZTtcbiAgICAgICAgICBjb250cm9scy5taW5EaWdpdHMgPSBtaW5EaWdpdHM7XG4gICAgICAgICAgY29udHJvbHMubWF4RGlnaXRzID0gbWF4RGlnaXRzO1xuXG4gICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKGNoZWNrVmFsdWVMaW1pdHNWYWxpZGl0eSk7XG4gICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKGNoZWNrRGlnaXRzVmFsaWRpdHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNFbXB0eUZpZWxkKG5vZGUpKSB7XG4gICAgICAgICAgY29uc3Qge0hUTUx9ID0gbm9kZTtcbiAgICAgICAgICBjb250cm9scy5IVE1MID0gSFRNTDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzUmFuZ2VGaWVsZChub2RlKSkge1xuICAgICAgICAgIGNvbnN0IHtzdGFydCwgZW5kLCBzdGVwLCBhcHBlYXJhbmNlfSA9IG5vZGU7XG5cbiAgICAgICAgICBjb250cm9scy5zdGFydCA9IHN0YXJ0O1xuICAgICAgICAgIGNvbnRyb2xzLmVuZCA9IGVuZDtcbiAgICAgICAgICBjb250cm9scy5zdGVwID0gc3RlcDtcbiAgICAgICAgICBjb250cm9scy5hcHBlYXJhbmNlID0gYXBwZWFyYW5jZSA/PyBudWxsO1xuXG4gICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKGNoZWNrUmFuZ2VWYWxpZGl0eSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc0ZpZWxkV2l0aENob2ljZXMobm9kZSkpIHtcbiAgICAgICAgICBsZXQgdHJpZ2dlckNvbmRpdGlvbnM6IHN0cmluZ1tdID0gKG5vZGUudHJpZ2dlckNvbmRpdGlvbnMgfHwgW10pLm1hcChjID0+IGMuY29uZGl0aW9uKTtcblxuICAgICAgICAgIGNvbnRyb2xzLmNob2ljZXNPcmlnaW5SZWYgPSBbKG5vZGUgYXMgYW55KS5jaG9pY2VzT3JpZ2luUmVmLCBWYWxpZGF0b3JzLnJlcXVpcmVkXTtcbiAgICAgICAgICBjb250cm9scy5jaG9pY2VzRmlsdGVyID0gbm9kZS5jaG9pY2VzRmlsdGVyICE9IG51bGwgPyBub2RlLmNob2ljZXNGaWx0ZXIuZm9ybXVsYSA6IG51bGw7XG4gICAgICAgICAgY29udHJvbHMuZm9yY2VFeHBhbmRlZCA9IG5vZGUuZm9yY2VFeHBhbmRlZDtcbiAgICAgICAgICBjb250cm9scy5mb3JjZU5hcnJvdyA9IG5vZGUuZm9yY2VOYXJyb3c7XG4gICAgICAgICAgY29udHJvbHMudHJpZ2dlckNvbmRpdGlvbnMgPSB0cmlnZ2VyQ29uZGl0aW9ucztcblxuICAgICAgICAgIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zID0gdHJpZ2dlckNvbmRpdGlvbnM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc1RhYmxlRmllbGQobm9kZSkpIHtcbiAgICAgICAgICBjb25zdCB7Y29sdW1uVHlwZXMsIHJvd3MsIGNvbHVtbkxhYmVscywgcm93TGFiZWxzfSA9IG5vZGU7XG4gICAgICAgICAgY29uc3QgdGFibGVEZWYgPSB7Y29sdW1uVHlwZXMsIHJvd3MsIGNvbHVtbkxhYmVscywgcm93TGFiZWxzfTtcbiAgICAgICAgICBjb250cm9scy50YWJsZURlZiA9IFtcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHRhYmxlRGVmLCB1bmRlZmluZWQsIDIpLFxuICAgICAgICAgICAgW1ZhbGlkYXRvcnMucmVxdWlyZWQsIGNoZWNrVGFibGVWYWxpZGl0eV0sXG4gICAgICAgICAgXTtcbiAgICAgICAgICBjb250cm9scy5oaWRlRW1wdHlSb3dzID0gbm9kZS5oaWRlRW1wdHlSb3dzO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZmcgPSB0aGlzLl9mYi5ncm91cChjb250cm9scyk7XG4gICAgICAgIGZnLnNldFZhbGlkYXRvcnModmFsaWRhdG9ycyk7XG5cbiAgICAgICAgZmcubWFya0FsbEFzVG91Y2hlZCgpO1xuICAgICAgICBmZy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHtvbmx5U2VsZjogZmFsc2UsIGVtaXRFdmVudDogdHJ1ZX0pO1xuXG4gICAgICAgIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXMgPSBuLm5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcy5tYXAoYyA9PiBjLmNvbmRpdGlvbik7XG4gICAgICAgIHRoaXMuX2N1clZpc2liaWxpdHkgPSBuLm5vZGUudmlzaWJpbGl0eSAhPSBudWxsID8gbi5ub2RlLnZpc2liaWxpdHkuY29uZGl0aW9uIDogbnVsbDtcblxuICAgICAgICB0aGlzLl9oYW5kbGVDb25kaXRpb25hbEJyYW5jaGVzQ2hhbmdlKGZnKTtcbiAgICAgICAgdGhpcy5faGFuZGxlVmlzaWJpbGl0eUNoYW5nZShmZyk7XG4gICAgICAgIHRoaXMuX2hhbmRsZUZvcm11bGFSZXBzQ2hhbmdlKGZnKTtcbiAgICAgICAgdGhpcy5faGFuZGxlQ2hvaWNlc0ZpbHRlckNoYW5nZShmZyk7XG4gICAgICAgIHRoaXMuX2hhbmRsZUZvcm11bGFDaGFuZ2UoZmcpO1xuICAgICAgICB0aGlzLl9oYW5kbGVGb3JjZVZhbHVlQ2hhbmdlKGZnKTtcbiAgICAgICAgdGhpcy5faGFuZGxlVmFsaWRhdGlvbkNvbmR0aW9uc0NoYW5nZShmZyk7XG4gICAgICAgIHRoaXMuX2hhbmRsZVdhcm5pbmdDb25kdGlvbnNDaGFuZ2UoZmcpO1xuICAgICAgICB0aGlzLl9oYW5kbGVOZXh0U2xpZGVDb25kaXRpb25DaGFuZ2UoZmcpO1xuICAgICAgICB0aGlzLl9oYW5kbGVUcmlnZ2VyQ29uZHRpb25zQ2hhbmdlKGZnKTtcblxuICAgICAgICByZXR1cm4gZmc7XG4gICAgICB9KSxcbiAgICAgIHNoYXJlUmVwbGF5KDEpLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9kZXN0cm95Q29uZGl0aW9uRGlhbG9nKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY2xvc2UoKTtcbiAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2Rlc3Ryb3lWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZ1N1YiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZyAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZy5jbG9zZSgpO1xuICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2cgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2Rlc3Ryb3lXYXJuaW5nQ29uZGl0aW9uRGlhbG9nKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZ1N1YiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZyAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZy5jbG9zZSgpO1xuICAgICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2cgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2luaXRSZW1vdmVUcmlnZ2VyQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZVRyaWdnZXJDb25kaXRpb25TdWIgPSB0aGlzLl9yZW1vdmVUcmlnZ2VyQ29uZGl0aW9uRXZ0XG4gICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAuc3Vic2NyaWJlKChbdmNJZHgsIGZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgaWYgKGZvcm1Hcm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZnID0gZm9ybUdyb3VwIGFzIFVudHlwZWRGb3JtR3JvdXA7XG4gICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1sndHJpZ2dlckNvbmRpdGlvbnMnXTtcbiAgICAgICAgbGV0IHZjcyA9IChjdHJsLnZhbHVlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgaWYgKHZjSWR4IDwgMCB8fCB2Y0lkeCA+PSB2Y3MubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZjcy5zcGxpY2UodmNJZHgsIDEpO1xuICAgICAgICBjdHJsLnNldFZhbHVlKHZjcyk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRBZGRUcmlnZ2VyQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRyaWdnZXJDb25kaXRpb25TdWIgPSB0aGlzLl9hZGRUcmlnZ2VyQ29uZGl0aW9uRXZ0XG4gICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAuc3Vic2NyaWJlKChbXywgZm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICBpZiAoZm9ybUdyb3VwID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmcgPSBmb3JtR3JvdXAgYXMgVW50eXBlZEZvcm1Hcm91cDtcbiAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWyd0cmlnZ2VyQ29uZGl0aW9ucyddO1xuICAgICAgICBsZXQgdmNzID0gKGN0cmwudmFsdWUgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICB2Y3MucHVzaCgnJyk7XG4gICAgICAgIGN0cmwuc2V0VmFsdWUodmNzKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFRyaWdnZXJDb25kaXRpb25FZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIHRoaXMuX2VkaXRUcmlnZ2VyQ29uZGl0aW9uU3ViID0gdGhpcy5fZWRpdFRyaWdnZXJDb25kaXRpb25FdnRcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgIC5zdWJzY3JpYmUoKFt2Y0lkeCwgZmddKSA9PiB7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgaWYgKHZjSWR4IDwgMCB8fCB2Y0lkeCA+PSB0aGlzLl90cmlnZ2VyQ29uZGl0aW9ucy5sZW5ndGggfHwgZmcgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2cpO1xuICAgICAgICBjb25zdCBjbXAgPSB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlO1xuICAgICAgICBjbXAuY29uZGl0aW9uID0gdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNbdmNJZHhdO1xuICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1xuICAgICAgICAgIC5hZnRlckNsb3NlZCgpXG4gICAgICAgICAgLnN1YnNjcmliZSgoY29uZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zW3ZjSWR4XSA9IGNvbmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0UmVtb3ZlV2FybmluZ0NvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVXYXJuaW5nQ29uZGl0aW9uU3ViID0gdGhpcy5fcmVtb3ZlV2FybmluZ0NvbmRpdGlvbkV2dFxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgLnN1YnNjcmliZSgoW3ZjSWR4LCBmb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgIGlmIChmb3JtR3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmZyA9IGZvcm1Hcm91cCBhcyBVbnR5cGVkRm9ybUdyb3VwO1xuICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ3dhcm5pbmdDb25kaXRpb25zJ107XG4gICAgICAgIGxldCB2Y3MgPSAoY3RybC52YWx1ZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgIGlmICh2Y0lkeCA8IDAgfHwgdmNJZHggPj0gdmNzLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2Y3Muc3BsaWNlKHZjSWR4LCAxKTtcbiAgICAgICAgY3RybC5zZXRWYWx1ZSh2Y3MpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0QWRkV2FybmluZ0NvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRXYXJuaW5nQ29uZGl0aW9uU3ViID0gdGhpcy5fYWRkV2FybmluZ0NvbmRpdGlvbkV2dFxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgLnN1YnNjcmliZSgoW18sIGZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgaWYgKGZvcm1Hcm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZnID0gZm9ybUdyb3VwIGFzIFVudHlwZWRGb3JtR3JvdXA7XG4gICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1snd2FybmluZ0NvbmRpdGlvbnMnXTtcbiAgICAgICAgbGV0IHZjcyA9IChjdHJsLnZhbHVlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgdmNzLnB1c2goe2NvbmRpdGlvbjogJycsIGVycm9yTWVzc2FnZTogJyd9KTtcbiAgICAgICAgY3RybC5zZXRWYWx1ZSh2Y3MpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0V2FybmluZ0NvbmRpdGlvbkVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25TdWIgPSB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkV2dFxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgLnN1YnNjcmliZSgoW3ZjSWR4LCBmZ10pID0+IHtcbiAgICAgICAgdGhpcy5fZGVzdHJveVdhcm5pbmdDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgaWYgKHZjSWR4IDwgMCB8fCB2Y0lkeCA+PSB0aGlzLl93YXJuaW5nQ29uZGl0aW9ucy5sZW5ndGggfHwgZmcgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZyA9IHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiV2FybmluZ0NvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgIGNvbnN0IGNtcCA9IHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlO1xuICAgICAgICBjb25zdCB3ID0gdGhpcy5fd2FybmluZ0NvbmRpdGlvbnNbdmNJZHhdO1xuICAgICAgICBjbXAuY29uZGl0aW9uID0gdy5jb25kaXRpb247XG4gICAgICAgIGNtcC53YXJuaW5nTWVzc2FnZSA9IHcud2FybmluZ01lc3NhZ2U7XG4gICAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nU3ViID0gdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2dcbiAgICAgICAgICAuYWZ0ZXJDbG9zZWQoKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGNvbmQ6IFdhcm5pbmdDb25kaXRpb24pID0+IHtcbiAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgdGhpcy5fd2FybmluZ0NvbmRpdGlvbnNbdmNJZHhdID0gY29uZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFJlbW92ZVZhbGlkYXRpb25Db25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvblN1YiA9IHRoaXMuX3JlbW92ZVZhbGlkYXRpb25Db25kaXRpb25FdnRcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgIC5zdWJzY3JpYmUoKFt2Y0lkeCwgZm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICBpZiAoZm9ybUdyb3VwID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmcgPSBmb3JtR3JvdXAgYXMgVW50eXBlZEZvcm1Hcm91cDtcbiAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWyd2YWxpZGF0aW9uQ29uZGl0aW9ucyddO1xuICAgICAgICBsZXQgdmNzID0gKGN0cmwudmFsdWUgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICBpZiAodmNJZHggPCAwIHx8IHZjSWR4ID49IHZjcy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmNzLnNwbGljZSh2Y0lkeCwgMSk7XG4gICAgICAgIGN0cmwuc2V0VmFsdWUodmNzKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEFkZFZhbGlkYXRpb25Db25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVmFsaWRhdGlvbkNvbmRpdGlvblN1YiA9IHRoaXMuX2FkZFZhbGlkYXRpb25Db25kaXRpb25FdnRcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgIC5zdWJzY3JpYmUoKFtfLCBmb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgIGlmIChmb3JtR3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmZyA9IGZvcm1Hcm91cCBhcyBVbnR5cGVkRm9ybUdyb3VwO1xuICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ3ZhbGlkYXRpb25Db25kaXRpb25zJ107XG4gICAgICAgIGxldCB2Y3MgPSAoY3RybC52YWx1ZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgIHZjcy5wdXNoKHtjb25kaXRpb246ICcnLCBlcnJvck1lc3NhZ2U6ICcnfSk7XG4gICAgICAgIGN0cmwuc2V0VmFsdWUodmNzKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFZhbGlkYXRpb25Db25kaXRpb25FZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uU3ViID0gdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25FdnRcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgIC5zdWJzY3JpYmUoKFt2Y0lkeCwgZmddKSA9PiB7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nKCk7XG4gICAgICAgIGlmICh2Y0lkeCA8IDAgfHwgdmNJZHggPj0gdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnMubGVuZ3RoIHx8IGZnID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihcbiAgICAgICAgICBBamZGYlZhbGlkYXRpb25Db25kaXRpb25FZGl0b3JEaWFsb2csXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGNtcCA9IHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlO1xuICAgICAgICBjb25zdCB2ID0gdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnNbdmNJZHhdO1xuICAgICAgICBjbXAuY29uZGl0aW9uID0gdi5jb25kaXRpb247XG4gICAgICAgIGNtcC5lcnJvck1lc3NhZ2UgPSB2LmVycm9yTWVzc2FnZTtcbiAgICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWIgPSB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZ1xuICAgICAgICAgIC5hZnRlckNsb3NlZCgpXG4gICAgICAgICAgLnN1YnNjcmliZSgoY29uZDogVmFsaWRhdGlvbkNvbmRpdGlvbikgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9uc1t2Y0lkeF0gPSBjb25kO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Rm9yY2VWYWx1ZUVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdEZvcmNlVmFsdWVTdWIgPSB0aGlzLl9lZGl0Rm9yY2VWYWx1ZUV2dFxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgLnN1YnNjcmliZSgoW18sIGZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgdGhpcy5fZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpO1xuICAgICAgICBpZiAoZm9ybUdyb3VwID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmcgPSBmb3JtR3JvdXAgYXMgVW50eXBlZEZvcm1Hcm91cDtcbiAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWydmb3JjZVZhbHVlJ107XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29uZGl0aW9uID0gY3RybC52YWx1ZTtcbiAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dcbiAgICAgICAgICAuYWZ0ZXJDbG9zZWQoKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGNvbmQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKGNvbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdE5leHRTbGlkZUNvbmRpdGlvbkVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdE5leHRTbGlkZUNvbmRpdGlvblN1YiA9IHRoaXMuX2VkaXROZXh0U2xpZGVDb25kaXRpb25FdnRcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgIC5zdWJzY3JpYmUoKFtfLCBmb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgaWYgKGZvcm1Hcm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZnID0gZm9ybUdyb3VwIGFzIFVudHlwZWRGb3JtR3JvdXA7XG4gICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1snbmV4dFNsaWRlQ29uZGl0aW9uJ107XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29uZGl0aW9uID0gY3RybC52YWx1ZTtcbiAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dcbiAgICAgICAgICAuYWZ0ZXJDbG9zZWQoKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGNvbmQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKGNvbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEZvcm11bGFFZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIHRoaXMuX2VkaXRGb3JtdWxhU3ViID0gdGhpcy5fZWRpdEZvcm11bGFFdnRcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgIC5zdWJzY3JpYmUoKFtfLCBmb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgaWYgKGZvcm1Hcm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZnID0gZm9ybUdyb3VwIGFzIFVudHlwZWRGb3JtR3JvdXA7XG4gICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1snZm9ybXVsYSddO1xuICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2cpO1xuICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNvbmRpdGlvbiA9IGN0cmwudmFsdWU7XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nXG4gICAgICAgICAgLmFmdGVyQ2xvc2VkKClcbiAgICAgICAgICAuc3Vic2NyaWJlKChjb25kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgY3RybC5zZXRWYWx1ZShjb25kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGb3JtdWxhUmVwc0VkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdEZvcm11bGFSZXBzU3ViID0gdGhpcy5fZWRpdEZvcm11bGFSZXBzRXZ0XG4gICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAuc3Vic2NyaWJlKChbXywgZm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICB0aGlzLl9kZXN0cm95Q29uZGl0aW9uRGlhbG9nKCk7XG4gICAgICAgIGlmIChmb3JtR3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmZyA9IGZvcm1Hcm91cCBhcyBVbnR5cGVkRm9ybUdyb3VwO1xuICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ2Zvcm11bGFSZXBzJ107XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29uZGl0aW9uID0gY3RybC52YWx1ZTtcbiAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dcbiAgICAgICAgICAuYWZ0ZXJDbG9zZWQoKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGNvbmQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKGNvbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdENob2ljZXNGaWx0ZXJFZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRDaG9pY2VzRmlsdGVyU3ViID0gdGhpcy5fZWRpdENob2ljZXNGaWx0ZXJFdnRcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgIC5zdWJzY3JpYmUoKFtfLCBmb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgaWYgKGZvcm1Hcm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZnID0gZm9ybUdyb3VwIGFzIFVudHlwZWRGb3JtR3JvdXA7XG4gICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1snY2hvaWNlc0ZpbHRlciddO1xuICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2cpO1xuICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNvbmRpdGlvbiA9IGN0cmwudmFsdWU7XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nXG4gICAgICAgICAgLmFmdGVyQ2xvc2VkKClcbiAgICAgICAgICAuc3Vic2NyaWJlKChjb25kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgY3RybC5zZXRWYWx1ZShjb25kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRDb25kaXRpb25hbEJyYW5jaEVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdENvbmRpdGlvbmFsQnJhbmNoU3ViID0gdGhpcy5fZWRpdENvbmRpdGlvbmFsQnJhbmNoRXZ0XG4gICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAuc3Vic2NyaWJlKChbY2JJZHgsIGZnXSkgPT4ge1xuICAgICAgICB0aGlzLl9kZXN0cm95Q29uZGl0aW9uRGlhbG9nKCk7XG4gICAgICAgIGlmIChjYklkeCA8IDAgfHwgY2JJZHggPj0gdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGggfHwgZmcgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2cpO1xuICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNvbmRpdGlvbiA9IHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXNbY2JJZHhdO1xuICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1xuICAgICAgICAgIC5hZnRlckNsb3NlZCgpXG4gICAgICAgICAgLnN1YnNjcmliZSgoY29uZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXNbY2JJZHhdID0gY29uZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRWaXNpYmlsaXR5RWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0VmlzaWJpbGl0eVN1YiA9IHRoaXMuX2VkaXRWaXNpYmlsaXR5RXZ0XG4gICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAuc3Vic2NyaWJlKChbXywgZm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICB0aGlzLl9kZXN0cm95Q29uZGl0aW9uRGlhbG9nKCk7XG4gICAgICAgIGlmIChmb3JtR3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmZyA9IGZvcm1Hcm91cCBhcyBVbnR5cGVkRm9ybUdyb3VwO1xuICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ3Zpc2liaWxpdHknXTtcbiAgICAgICAgY29uc3QgY29uZGl0aW9uID0gY3RybC52YWx1ZTtcbiAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyA9IHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nKTtcbiAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5jb25kaXRpb24gPSBjb25kaXRpb247XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nXG4gICAgICAgICAgLmFmdGVyQ2xvc2VkKClcbiAgICAgICAgICAuc3Vic2NyaWJlKChjb25kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgY3RybC5zZXRWYWx1ZShjb25kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZVRyaWdnZXJDb25kdGlvbnNDaGFuZ2UoZmc6IFVudHlwZWRGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl90cmlnZ2VyQ29uZGl0aW9uc1N1YiA9IGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKFxuICAgICAgICAgICh2MSwgdjIpID0+IEpTT04uc3RyaW5naWZ5KHYxLnRyaWdnZXJDb25kaXRpb25zKSA9PT0gSlNPTi5zdHJpbmdpZnkodjIudHJpZ2dlckNvbmRpdGlvbnMpLFxuICAgICAgICApLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgodjogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zID0gdi50cmlnZ2VyQ29uZGl0aW9ucztcbiAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVXYXJuaW5nQ29uZHRpb25zQ2hhbmdlKGZnOiBVbnR5cGVkRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fd2FybmluZ0NvbmRpdGlvbnNTdWIgPSBmZy52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZChcbiAgICAgICAgICAodjEsIHYyKSA9PiBKU09OLnN0cmluZ2lmeSh2MS53YXJuaW5nQ29uZGl0aW9ucykgPT09IEpTT04uc3RyaW5naWZ5KHYyLndhcm5pbmdDb25kaXRpb25zKSxcbiAgICAgICAgKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLl93YXJuaW5nQ29uZGl0aW9ucyA9IHYud2FybmluZ0NvbmRpdGlvbnM7XG4gICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlVmFsaWRhdGlvbkNvbmR0aW9uc0NoYW5nZShmZzogVW50eXBlZEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuX3ZhbGlkYXRpb25Db25kaXRpb25zU3ViID0gZmcudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoXG4gICAgICAgICAgKHYxLCB2MikgPT5cbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHYxLnZhbGlkYXRpb25Db25kaXRpb25zKSA9PT0gSlNPTi5zdHJpbmdpZnkodjIudmFsaWRhdGlvbkNvbmRpdGlvbnMpLFxuICAgICAgICApLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgodjogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuX3ZhbGlkYXRpb25Db25kaXRpb25zID0gdi52YWxpZGF0aW9uQ29uZGl0aW9ucztcbiAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVGb3JjZVZhbHVlQ2hhbmdlKGZnOiBVbnR5cGVkRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fZm9yY2VWYWx1ZVN1YiA9IGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKHYxLCB2MikgPT4gdjEuZm9yY2VWYWx1ZSA9PT0gdjIuZm9yY2VWYWx1ZSkpXG4gICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5fY3VyRm9yY2VWYWx1ZSA9IHYuZm9yY2VWYWx1ZTtcbiAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVOZXh0U2xpZGVDb25kaXRpb25DaGFuZ2UoZmc6IFVudHlwZWRGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl9mb3JtdWxhU3ViID0gZmcudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PiB2MS5uZXh0U2xpZGVDb25kaXRpb24gPT09IHYyLm5leHRTbGlkZUNvbmRpdGlvbikpXG4gICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uID0gdi5uZXh0U2xpZGVDb25kaXRpb247XG4gICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICAgIHRoaXMuX2Zvcm11bGFTdWIgPSBmZy52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh2MSwgdjIpID0+IHYxLm5leHRTbGlkZUNvbmRpdGlvbiA9PT0gdjIubmV4dFNsaWRlQ29uZGl0aW9uKSlcbiAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLl9uZXh0U2xpZGVDb25kaXRpb24gPSB2Lm5leHRTbGlkZUNvbmRpdGlvbjtcbiAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVGb3JtdWxhQ2hhbmdlKGZnOiBVbnR5cGVkRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fZm9ybXVsYVN1YiA9IGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKHYxLCB2MikgPT4gdjEuZm9ybXVsYSA9PT0gdjIuZm9ybXVsYSkpXG4gICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5fY3VyRm9ybXVsYSA9IHYuZm9ybXVsYTtcbiAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVGb3JtdWxhUmVwc0NoYW5nZShmZzogVW50eXBlZEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuX2Zvcm11bGFSZXBzU3ViID0gZmcudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PiB2MS5mb3JtdWxhUmVwcyA9PT0gdjIuZm9ybXVsYVJlcHMpKVxuICAgICAgLnN1YnNjcmliZSgodjogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuX2N1ckZvcm11bGFSZXBzID0gdi5mb3JtdWxhUmVwcztcbiAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVDaG9pY2VzRmlsdGVyQ2hhbmdlKGZnOiBVbnR5cGVkRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fY2hvaWNlc0ZpbHRlclN1YiA9IGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKHYxLCB2MikgPT4gdjEuY2hvaWNlc0ZpbHRlciA9PT0gdjIuY2hvaWNlc0ZpbHRlcikpXG4gICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5fY3VyQ2hvaWNlc0ZpbHRlciA9IHYuY2hvaWNlc0ZpbHRlcjtcbiAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVDb25kaXRpb25hbEJyYW5jaGVzQ2hhbmdlKGZnOiBVbnR5cGVkRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlc1N1YiA9IGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh2MSwgdjIpID0+IHYxLmNvbmRpdGlvbmFsQnJhbmNoZXNOdW0gPT09IHYyLmNvbmRpdGlvbmFsQnJhbmNoZXNOdW0pLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgodjogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IGNiTnVtOiBudW1iZXIgPSB2LmNvbmRpdGlvbmFsQnJhbmNoZXNOdW07XG4gICAgICAgIGNvbnN0IGN1ckNiTnVtID0gdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGg7XG4gICAgICAgIGlmIChjdXJDYk51bSA8IGNiTnVtKSB7XG4gICAgICAgICAgbGV0IG5ld0Niczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gY3VyQ2JOdW07IGkgPCBjYk51bTsgaSsrKSB7XG4gICAgICAgICAgICBuZXdDYnMucHVzaChhbHdheXNDb25kaXRpb24oKS5jb25kaXRpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzID0gdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlcy5jb25jYXQobmV3Q2JzKTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJDYk51bSA+IGNiTnVtKSB7XG4gICAgICAgICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlcy5zcGxpY2UoMCwgY3VyQ2JOdW0gLSBjYk51bSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlKGZnOiBVbnR5cGVkRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fdmlzaWJpbGl0eVN1YiA9IGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKHYxLCB2MikgPT4gdjEudmlzaWJpbGl0eU9wdCA9PT0gdjIudmlzaWJpbGl0eU9wdCkpXG4gICAgICAuc3Vic2NyaWJlKHYgPT4ge1xuICAgICAgICBjb25zdCB2aXNpYmlsaXR5T3B0ID0gdi52aXNpYmlsaXR5T3B0O1xuICAgICAgICBjb25zdCB2aXNpYmlsaXR5OiBzdHJpbmcgPSB2LnZpc2liaWxpdHk7XG4gICAgICAgIGxldCBuZXdDb25kaXRpb246IHN0cmluZyB8IG51bGw7XG4gICAgICAgIHN3aXRjaCAodmlzaWJpbGl0eU9wdCkge1xuICAgICAgICAgIGNhc2UgJ2Fsd2F5cyc6XG4gICAgICAgICAgICBuZXdDb25kaXRpb24gPSBhbHdheXNDb25kaXRpb24oKS5jb25kaXRpb247XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICduZXZlcic6XG4gICAgICAgICAgICBuZXdDb25kaXRpb24gPSBuZXZlckNvbmRpdGlvbigpLmNvbmRpdGlvbjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2NvbmRpdGlvbic6XG4gICAgICAgICAgICBuZXdDb25kaXRpb24gPSB2aXNpYmlsaXR5ICYmIHZpc2liaWxpdHkubGVuZ3RoID8gdmlzaWJpbGl0eSA6IG51bGw7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgbmV3Q29uZGl0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jdXJWaXNpYmlsaXR5ID0gbmV3Q29uZGl0aW9uO1xuICAgICAgICBmZy5jb250cm9sc1sndmlzaWJpbGl0eSddLnNldFZhbHVlKG5ld0NvbmRpdGlvbik7XG4gICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICAgIHRoaXMuX3Zpc2liaWxpdHlTdWIgPSBmZy52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIodiA9PiB2LnZpc2liaWxpdHlPcHQgPT09ICdjb25kaXRpb24nKSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKHYxLCB2MikgPT4gdjEudmlzaWJpbGl0eSA9PT0gdjIudmlzaWJpbGl0eSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHYgPT4ge1xuICAgICAgICB0aGlzLl9jdXJWaXNpYmlsaXR5ID0gdi52aXNpYmlsaXR5O1xuICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2d1ZXNzVmlzaWJpbGl0eU9wdChjb25kaXRpb246IEFqZkNvbmRpdGlvbik6IHN0cmluZyB7XG4gICAgaWYgKGNvbmRpdGlvbi5jb25kaXRpb24ubG9jYWxlQ29tcGFyZShhbHdheXNDb25kaXRpb24oKS5jb25kaXRpb24pID09PSAwKSB7XG4gICAgICByZXR1cm4gJ2Fsd2F5cyc7XG4gICAgfVxuICAgIGlmIChjb25kaXRpb24uY29uZGl0aW9uLmxvY2FsZUNvbXBhcmUobmV2ZXJDb25kaXRpb24oKS5jb25kaXRpb24pID09PSAwKSB7XG4gICAgICByZXR1cm4gJ25ldmVyJztcbiAgICB9XG4gICAgcmV0dXJuICdjb25kaXRpb24nO1xuICB9XG59XG4iLCI8ZGl2IFtzdHlsZS5kaXNwbGF5XT1cIihlbmFibGVkfGFzeW5jKSA/ICdub25lJyA6ICdibG9jaydcIiBjbGFzcz1cImFqZi1kaXNhYmxlZC1vdmVybGF5XCI+PC9kaXY+XG48bmctY29udGFpbmVyICpuZ0lmPVwibm9kZUVudHJ5fGFzeW5jIGFzIG5lXCI+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJwcm9wZXJ0aWVzRm9ybXxhc3luYyBhcyBwZlwiPlxuICAgIDxkaXYgY2xhc3M9XCJhamYtaGVhZGVyXCI+XG4gICAgICA8aDM+e3snUHJvcGVydGllcyd8dHJhbnNsb2NvfX08L2gzPlxuICAgICAgPGJ1dHRvblxuICAgICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgW2Rpc2FibGVkXT1cInBmLnN0YXR1cyAhPT0gJ1ZBTElEJ1wiXG4gICAgICAgIChjbGljayk9XCJzYXZlKClcIlxuICAgICAgPlxuICAgICAgICA8bWF0LWljb24+c2F2ZTwvbWF0LWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIChjbGljayk9XCJjYW5jZWwoKVwiPlxuICAgICAgICA8bWF0LWljb24+Y2FuY2VsPC9tYXQtaWNvbj5cbiAgICAgIDwvYnV0dG9uPiAgXG4gICAgPC9kaXY+XG4gICAgPG1hdC1lcnJvciAqbmdJZj1cInBmPy5pbnZhbGlkXCI+XG4gICAgICB7e2FsbEVycm9yTWVzc2FnZXMocGYpfX1cbiAgICA8L21hdC1lcnJvcj5cbiAgICA8Zm9ybSBbZm9ybUdyb3VwXT1cInBmIVwiIG5vdmFsaWRhdGU+XG4gICAgICA8ZGl2IGNsYXNzPVwiYWpmLXByb3BcIj5cbiAgICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJuYW1lXCIgW3BsYWNlaG9sZGVyXT1cIidOYW1lJyB8IHRyYW5zbG9jb1wiIC8+XG4gICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cInBmLmdldCgnbmFtZScpPy5pbnZhbGlkXCI+XG4gICAgICAgICAgICB7e2ZpZWxkRXJyb3JNZXNzYWdlKHBmLmdldCgnbmFtZScpLCAnTmFtZScpfX1cbiAgICAgICAgICA8L21hdC1lcnJvcj5cbiAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImFqZi1wcm9wXCI+XG4gICAgICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgZm9ybUNvbnRyb2xOYW1lPVwibGFiZWxcIiBbcGxhY2Vob2xkZXJdPVwiJ0xhYmVsJyB8IHRyYW5zbG9jb1wiIC8+XG4gICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cInBmLmdldCgnbGFiZWwnKT8uaW52YWxpZFwiPlxuICAgICAgICAgICAge3tmaWVsZEVycm9yTWVzc2FnZShwZi5nZXQoJ2xhYmVsJyksICdMYWJlbCcpfX1cbiAgICAgICAgICA8L21hdC1lcnJvcj5cbiAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgIDwvZGl2PlxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImlzRW1wdHlGaWVsZChuZSEubm9kZSlcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1wcm9wXCI+XG4gICAgICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IGZvcm1Db250cm9sTmFtZT1cIkhUTUxcIiBbcGxhY2Vob2xkZXJdPVwiJ0hUTUwnIHwgdHJhbnNsb2NvXCIgLz5cbiAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8ZGl2IGNsYXNzPVwiYWpmLXByb3BcIj5cbiAgICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgIDxtYXQtbGFiZWw+e3snVmlzaWJpbGl0eSd8dHJhbnNsb2NvfX08L21hdC1sYWJlbD5cbiAgICAgICAgICA8bWF0LXNlbGVjdCBmb3JtQ29udHJvbE5hbWU9XCJ2aXNpYmlsaXR5T3B0XCIgW3BsYWNlaG9sZGVyXT1cIidWaXNpYmxlJyB8IHRyYW5zbG9jb1wiPlxuICAgICAgICAgICAgPG1hdC1vcHRpb24gdmFsdWU9XCJhbHdheXNcIj57eydBbHdheXMnfHRyYW5zbG9jb319PC9tYXQtb3B0aW9uPlxuICAgICAgICAgICAgPG1hdC1vcHRpb24gdmFsdWU9XCJuZXZlclwiPnt7J05ldmVyJ3x0cmFuc2xvY299fTwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgIDxtYXQtb3B0aW9uIHZhbHVlPVwiY29uZGl0aW9uXCI+e3snQ29uZGl0aW9uLi4uJ3x0cmFuc2xvY299fTwvbWF0LW9wdGlvbj5cbiAgICAgICAgICA8L21hdC1zZWxlY3Q+XG4gICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICAoY2xpY2spPVwiZWRpdFZpc2liaWxpdHkoKVwiXG4gICAgICAgICAgW2Rpc2FibGVkXT1cInBmIS52YWx1ZS52aXNpYmlsaXR5T3B0ICE9PSAnY29uZGl0aW9uJ1wiXG4gICAgICAgICAgbWF0LXJhaXNlZC1idXR0b25cbiAgICAgICAgICBbbWF0VG9vbHRpcF09XCJjdXJWaXNpYmlsaXR5IHx8ICcnXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhamYtaWNvbi1jb250XCI+XG4gICAgICAgICAgICA8bWF0LWljb24+ZWRpdDwvbWF0LWljb24+XG4gICAgICAgICAgICA8c3Bhbj48Y29kZT57eyBjdXJWaXNpYmlsaXR5IH19PC9jb2RlPjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhamYtcHJvcFwiPlxuICAgICAgICA8ZGl2PjxsYWJlbD57eydCcmFuY2hlcyd8dHJhbnNsb2NvfX08L2xhYmVsPjwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxtYXQtc2xpZGVyIGRpc2NyZXRlIG1pbj1cIjFcIiBtYXg9XCI1XCIgc3RlcD1cIjFcIlxuICAgICAgICAgICAgPjxpbnB1dCBtYXRTbGlkZXJUaHVtYiBmb3JtQ29udHJvbE5hbWU9XCJjb25kaXRpb25hbEJyYW5jaGVzTnVtXCJcbiAgICAgICAgICAvPjwvbWF0LXNsaWRlcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGJyYW5jaCBvZiBjb25kaXRpb25hbEJyYW5jaGVzOyBsZXQgaWR4ID0gaW5kZXhcIj5cbiAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJlZGl0Q29uZGl0aW9uYWxCcmFuY2goaWR4KVwiIG1hdC1yYWlzZWQtYnV0dG9uIFttYXRUb29sdGlwXT1cImJyYW5jaFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1pY29uLWNvbnRcIj5cbiAgICAgICAgICAgICAgPG1hdC1pY29uPmVkaXQ8L21hdC1pY29uPlxuICAgICAgICAgICAgICA8c3Bhbj48Y29kZT57eyBicmFuY2ggfX08L2NvZGU+PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiaXNSZXBlYXRpbmdDb250YWluZXJOb2RlKG5lKVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLXByb3BcIj5cbiAgICAgICAgICA8ZGl2PjxsYWJlbD57eydNaW4gcmVwZXRpdGlvbnMnfHRyYW5zbG9jb319PC9sYWJlbD48L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPG1hdC1zbGlkZXIgZGlzY3JldGUgbWluPVwiMVwiIG1heD1cIjVcIiBzdGVwPVwiMVwiXG4gICAgICAgICAgICAgID48aW5wdXQgIGZvcm1Db250cm9sTmFtZT1cIm1pblJlcHNcIiBtYXRTbGlkZXJUaHVtYlxuICAgICAgICAgICAgLz48L21hdC1zbGlkZXI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj48bGFiZWw+e3snTWF4IHJlcGV0aXRpb25zJ3x0cmFuc2xvY299fTwvbGFiZWw+PC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxtYXQtc2xpZGVyIGRpc2NyZXRlIG1pbj1cIjFcIiBtYXg9XCI1XCIgc3RlcD1cIjFcIlxuICAgICAgICAgICAgICA+PGlucHV0IGZvcm1Db250cm9sTmFtZT1cIm1heFJlcHNcIiBtYXRTbGlkZXJUaHVtYlxuICAgICAgICAgICAgLz48L21hdC1zbGlkZXI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJpc0ZpZWxkKG5lKVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLXByb3BcIj5cbiAgICAgICAgICA8bWF0LWNoZWNrYm94IGZvcm1Db250cm9sTmFtZT1cInJlYWRvbmx5RmllbGRcIj57eydSZWFkb25seSd8dHJhbnNsb2NvfX08L21hdC1jaGVja2JveD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhamYtcHJvcFwiPlxuICAgICAgICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDxtYXQtbGFiZWw+e3snRmllbGQgc2l6ZSd8dHJhbnNsb2NvfX08L21hdC1sYWJlbD5cbiAgICAgICAgICAgIDxtYXQtc2VsZWN0IGZvcm1Db250cm9sTmFtZT1cInNpemVcIiBbcGxhY2Vob2xkZXJdPVwiJ1NpemUnIHwgdHJhbnNsb2NvXCI+XG4gICAgICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBmaWVsZFNpemUgb2YgZmllbGRTaXplc1wiIFt2YWx1ZV09XCJmaWVsZFNpemUudmFsdWVcIj5cbiAgICAgICAgICAgICAgICB7eyBmaWVsZFNpemUubGFiZWx8dHJhbnNsb2NvIH19XG4gICAgICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1wcm9wXCI+XG4gICAgICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IGZvcm1Db250cm9sTmFtZT1cImhpbnRcIiBbcGxhY2Vob2xkZXJdPVwiJ0hpbnQnIHwgdHJhbnNsb2NvXCIgLz5cbiAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1wcm9wXCI+XG4gICAgICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgIG1hdElucHV0XG4gICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cImRlc2NyaXB0aW9uXCJcbiAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cIidEZXNjcmlwdGlvbicgfCB0cmFuc2xvY29cIlxuICAgICAgICAgICAgPjwvdGV4dGFyZWE+XG4gICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhamYtcHJvcFwiPlxuICAgICAgICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICBtYXRJbnB1dFxuICAgICAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJkZWZhdWx0VmFsdWVcIlxuICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiJ0RlZmF1bHQgdmFsdWUnIHwgdHJhbnNsb2NvXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhamYtcHJvcFwiPlxuICAgICAgICAgIDxkaXY+PGxhYmVsPnt7J0Zvcm11bGEnfHRyYW5zbG9jb319PC9sYWJlbD48L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiZWRpdEZvcm11bGEoKVwiIG1hdC1yYWlzZWQtYnV0dG9uIFttYXRUb29sdGlwXT1cImN1ckZvcm11bGEgfHwgJydcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1pY29uLWNvbnRcIj5cbiAgICAgICAgICAgICAgICA8bWF0LWljb24+ZWRpdDwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPHNwYW4+PGNvZGU+e3sgY3VyRm9ybXVsYSB9fTwvY29kZT48L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8IS0tIDxkaXYgY2xhc3M9XCJhamYtcHJvcFwiPlxuICAgICAgICAgIDxkaXY+PGxhYmVsPnt7J0ZvcmNlIHZhbHVlJ3x0cmFuc2xjb319PC9sYWJlbD48L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiZWRpdEZvcmNlVmFsdWUoKVwiIG1hdC1yYWlzZWQtYnV0dG9uIFttYXRUb29sdGlwXT1cImN1ckZvcmNlVmFsdWVcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1pY29uLWNvbnRcIj5cbiAgICAgICAgICAgICAgICA8bWF0LWljb24+ZWRpdDwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPHNwYW4+e3sgY3VyRm9yY2VWYWx1ZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+IC0tPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLXByb3BcIj5cbiAgICAgICAgICA8bWF0LWNoZWNrYm94IGZvcm1Db250cm9sTmFtZT1cIm5vdEVtcHR5XCI+e3snTm90IGVtcHR5J3x0cmFuc2xvY299fTwvbWF0LWNoZWNrYm94PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImlzTnVtZXJpY0ZpZWxkKG5lIS5ub2RlKVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhamYtcHJvcFwiPlxuICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgZm9ybUNvbnRyb2xOYW1lPVwibWluVmFsdWVcIiBbcGxhY2Vob2xkZXJdPVwiJ01pbiB2YWx1ZScgfCB0cmFuc2xvY29cIiAvPlxuICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLXByb3BcIj5cbiAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IGZvcm1Db250cm9sTmFtZT1cIm1heFZhbHVlXCIgW3BsYWNlaG9sZGVyXT1cIidNYXggdmFsdWUnIHwgdHJhbnNsb2NvXCIgLz5cbiAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1wcm9wXCI+XG4gICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIG1hdElucHV0XG4gICAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwibWluRGlnaXRzXCJcbiAgICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiJ01pbiBkaWdpdHMnIHwgdHJhbnNsb2NvXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1wcm9wXCI+XG4gICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIG1hdElucHV0XG4gICAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwibWF4RGlnaXRzXCJcbiAgICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiJ01heCBkaWdpdHMnIHwgdHJhbnNsb2NvXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJpc1JhbmdlRmllbGQobmUhLm5vZGUpXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1wcm9wXCI+XG4gICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIG1hdElucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwic3RhcnRcIlxuICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCInU3RhcnQnIHwgdHJhbnNsb2NvXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1wcm9wXCI+XG4gICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIG1hdElucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwiZW5kXCJcbiAgICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiJ0VuZCcgfCB0cmFuc2xvY29cIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLXByb3BcIj5cbiAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgbWF0SW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJzdGVwXCJcbiAgICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiJ1N0ZXAnIHwgdHJhbnNsb2NvXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1wcm9wXCI+XG4gICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgIDxtYXQtc2VsZWN0IGZvcm1Db250cm9sTmFtZT1cImFwcGVhcmFuY2VcIiBbcGxhY2Vob2xkZXJdPVwiJ0FwcGVhcmFuY2UnIHwgdHJhbnNsb2NvXCI+XG4gICAgICAgICAgICAgICAgPG1hdC1vcHRpb24gW3ZhbHVlXT1cIm51bGxcIj57eydEZWZhdWx0J3x0cmFuc2xvY299fTwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgICAgICA8bWF0LW9wdGlvbiB2YWx1ZT1cInJhdGluZ1wiPnt7J1JhdGluZyd8dHJhbnNsb2NvfX08L21hdC1vcHRpb24+XG4gICAgICAgICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhamYtcHJvcFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhamYtaGVhZGVyXCI+XG4gICAgICAgICAgICA8bGFiZWw+e3sgJ1ZhbGlkYXRpb24nIHwgdHJhbnNsb2NvIH19PC9sYWJlbD5cbiAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImFqZi1wb2ludGVyXCIgKGNsaWNrKT1cImFkZFZhbGlkYXRpb25Db25kaXRpb24oKVwiXG4gICAgICAgICAgICAgID5hZGRfY2lyY2xlX291dGxpbmU8L21hdC1pY29uXG4gICAgICAgICAgICA+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cInZhbGlkYXRpb25Db25kaXRpb25zLmxlbmd0aCA9PT0gMFwiIGNsYXNzPVwiYWpmLXZhbGlkYXRpb24tcm93IGFqZi1lbXBoXCI+XG4gICAgICAgICAgICB7eydObyBjb25kaXRpb25zJ3x0cmFuc2xvY299fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwiYWpmLXZhbGlkYXRpb24tcm93XCJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCB2YWxpZGF0aW9uQ29uZGl0aW9uIG9mIHZhbGlkYXRpb25Db25kaXRpb25zOyBsZXQgaWR4ID0gaW5kZXhcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgKGNsaWNrKT1cImVkaXRWYWxpZGF0aW9uQ29uZGl0aW9uKGlkeClcIlxuICAgICAgICAgICAgICBtYXQtcmFpc2VkLWJ1dHRvblxuICAgICAgICAgICAgICBbbWF0VG9vbHRpcF09XCJ2YWxpZGF0aW9uQ29uZGl0aW9uLmNvbmRpdGlvblwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhamYtaWNvbi1jb250XCI+XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uPmVkaXQ8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgIDxzcGFuPjxjb2RlPnt7IHZhbGlkYXRpb25Db25kaXRpb24uY29uZGl0aW9uIH19PC9jb2RlPjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImFqZi1wb2ludGVyXCIgKGNsaWNrKT1cInJlbW92ZVZhbGlkYXRpb25Db25kaXRpb24oaWR4KVwiXG4gICAgICAgICAgICAgID5yZW1vdmVfY2lyY2xlX291dGxpbmU8L21hdC1pY29uXG4gICAgICAgICAgICA+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLXByb3BcIj5cbiAgICAgICAgICA8bWF0LWNoZWNrYm94IGZvcm1Db250cm9sTmFtZT1cIm5vdEVtcHR5V2FybmluZ1wiXG4gICAgICAgICAgICA+e3snTm90IGVtcHR5IHdhcm5pbmcnfHRyYW5zbG9jb319PC9tYXQtY2hlY2tib3hcbiAgICAgICAgICA+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLXByb3BcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLWhlYWRlclwiPlxuICAgICAgICAgICAgPGxhYmVsPnt7J1dhcm5pbmdzJ3x0cmFuc2xvY299fTwvbGFiZWw+XG4gICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJhamYtcG9pbnRlclwiIChjbGljayk9XCJhZGRXYXJuaW5nQ29uZGl0aW9uKClcIlxuICAgICAgICAgICAgICA+YWRkX2NpcmNsZV9vdXRsaW5lPC9tYXQtaWNvblxuICAgICAgICAgICAgPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJ3YXJuaW5nQ29uZGl0aW9ucy5sZW5ndGggPT09IDBcIiBjbGFzcz1cImFqZi12YWxpZGF0aW9uLXJvdyBhamYtZW1waFwiPlxuICAgICAgICAgICAge3snTm8gd2FybmluZ3MnfHRyYW5zbG9jb319XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJhamYtdmFsaWRhdGlvbi1yb3dcIlxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IHdhcm5pbmdDb25kaXRpb24gb2Ygd2FybmluZ0NvbmRpdGlvbnM7IGxldCBpZHggPSBpbmRleFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAoY2xpY2spPVwiZWRpdFdhcm5pbmdDb25kaXRpb24oaWR4KVwiXG4gICAgICAgICAgICAgIG1hdC1yYWlzZWQtYnV0dG9uXG4gICAgICAgICAgICAgIFttYXRUb29sdGlwXT1cIndhcm5pbmdDb25kaXRpb24uY29uZGl0aW9uXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1pY29uLWNvbnRcIj5cbiAgICAgICAgICAgICAgICA8bWF0LWljb24+ZWRpdDwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPHNwYW4+PGNvZGU+e3sgd2FybmluZ0NvbmRpdGlvbi5jb25kaXRpb24gfX08L2NvZGU+PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwiYWpmLXBvaW50ZXJcIiAoY2xpY2spPVwicmVtb3ZlV2FybmluZ0NvbmRpdGlvbihpZHgpXCJcbiAgICAgICAgICAgICAgPnJlbW92ZV9jaXJjbGVfb3V0bGluZTwvbWF0LWljb25cbiAgICAgICAgICAgID5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhamYtcHJvcFwiPlxuICAgICAgICAgIDxkaXY+PGxhYmVsPnt7J0dvIHRvIG5leHQgc2xpZGUgY29uZGl0aW9uJ3x0cmFuc2xvY299fTwvbGFiZWw+PC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgKGNsaWNrKT1cImVkaXROZXh0U2xpZGVDb25kaXRpb24oKVwiXG4gICAgICAgICAgICAgIG1hdC1yYWlzZWQtYnV0dG9uXG4gICAgICAgICAgICAgIFttYXRUb29sdGlwXT1cIm5leHRTbGlkZUNvbmRpdGlvbiB8fCAnJ1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhamYtaWNvbi1jb250XCI+XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uPmVkaXQ8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgIDxzcGFuPjxjb2RlPnt7IG5leHRTbGlkZUNvbmRpdGlvbiB9fTwvY29kZT48L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiaXNGaWVsZFdpdGhDaG9pY2VzKG5lIS5ub2RlKVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhamYtcHJvcFwiPlxuICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICA8bWF0LWxhYmVsPnt7J0Nob2ljZXMgb3JpZ2lucyd8dHJhbnNsb2NvfX08L21hdC1sYWJlbD5cbiAgICAgICAgICAgICAgPG1hdC1zZWxlY3QgZm9ybUNvbnRyb2xOYW1lPVwiY2hvaWNlc09yaWdpblJlZlwiIFtwbGFjZWhvbGRlcl09XCInQ2hvaWNlcycgfCB0cmFuc2xvY29cIj5cbiAgICAgICAgICAgICAgICA8bWF0LW9wdGlvblxuICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGNob2ljZXNPcmlnaW4gb2YgY2hvaWNlc09yaWdpbnNcIlxuICAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cImNob2ljZXNPcmlnaW4ubmFtZVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge3sgKGNob2ljZXNPcmlnaW4ubGFiZWwgfHwgY2hvaWNlc09yaWdpbi5uYW1lKXx0cmFuc2xvY28gfX1cbiAgICAgICAgICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICAgICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cInBmLmdldCgnY2hvaWNlc09yaWdpblJlZicpPy5pbnZhbGlkXCI+XG4gICAgICAgICAgICAgICAge3tmaWVsZEVycm9yTWVzc2FnZShwZi5nZXQoJ2Nob2ljZXNPcmlnaW5SZWYnKSwgJ2Nob2ljZXNPcmlnaW5SZWYnKX19XG4gICAgICAgICAgICAgIDwvbWF0LWVycm9yPlxuICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLXByb3BcIj5cbiAgICAgICAgICAgIDxkaXY+PGxhYmVsPnt7J0Nob2ljZXMgZmlsdGVyJ3x0cmFuc2xvY299fTwvbGFiZWw+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImVkaXRDaG9pY2VzRmlsdGVyKClcIlxuICAgICAgICAgICAgICAgIG1hdC1yYWlzZWQtYnV0dG9uXG4gICAgICAgICAgICAgICAgW21hdFRvb2x0aXBdPVwiY3VyQ2hvaWNlc0ZpbHRlciB8fCAnJ1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLWljb24tY29udFwiPlxuICAgICAgICAgICAgICAgICAgPG1hdC1pY29uPmVkaXQ8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+PGNvZGU+e3sgY3VyQ2hvaWNlc0ZpbHRlciB9fTwvY29kZT48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1wcm9wXCI+XG4gICAgICAgICAgICA8bWF0LWNoZWNrYm94XG4gICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cImZvcmNlRXhwYW5kZWRcIlxuICAgICAgICAgICAgICAjZm9yY2VFeHBhbmRlZFxuICAgICAgICAgICAgICAoY2hhbmdlKT1cImZvcmNlQ2hlY2tib3goJGV2ZW50LmNoZWNrZWQsIGZvcmNlTmFycm93KVwiXG4gICAgICAgICAgICAgID57eydGb3JjZSBleHBhbmRlZCBzZWxlY3Rpb24nfHRyYW5zbG9jb319PC9tYXQtY2hlY2tib3hcbiAgICAgICAgICAgID5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLXByb3BcIj5cbiAgICAgICAgICAgIDxtYXQtY2hlY2tib3hcbiAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwiZm9yY2VOYXJyb3dcIlxuICAgICAgICAgICAgICAjZm9yY2VOYXJyb3dcbiAgICAgICAgICAgICAgKGNoYW5nZSk9XCJmb3JjZUNoZWNrYm94KCRldmVudC5jaGVja2VkLCBmb3JjZUV4cGFuZGVkKVwiXG4gICAgICAgICAgICAgID57eydGb3JjZSBuYXJyb3cgc2VsZWN0aW9uJ3x0cmFuc2xvY299fTwvbWF0LWNoZWNrYm94XG4gICAgICAgICAgICA+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1wcm9wXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLWhlYWRlclwiPlxuICAgICAgICAgICAgICA8bGFiZWw+e3snVHJpZ2dlciBzZWxlY3Rpb24nfHRyYW5zbG9jb319PC9sYWJlbD5cbiAgICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwiYWpmLXBvaW50ZXJcIiAoY2xpY2spPVwiYWRkVHJpZ2dlckNvbmRpdGlvbigpXCJcbiAgICAgICAgICAgICAgICA+YWRkX2NpcmNsZV9vdXRsaW5lPC9tYXQtaWNvblxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgKm5nSWY9XCIhdHJpZ2dlckNvbmRpdGlvbnMgfHwgdHJpZ2dlckNvbmRpdGlvbnMubGVuZ3RoID09PSAwXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJhamYtdmFsaWRhdGlvbi1yb3cgYWpmLWVtcGhcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7eydObyB0cmlnZ2VyIGNvbmRpdGlvbid8dHJhbnNsb2NvfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzcz1cImFqZi12YWxpZGF0aW9uLXJvd1wiXG4gICAgICAgICAgICAgICpuZ0Zvcj1cImxldCB0cmlnZ2VyQ29uZGl0aW9uIG9mIHRyaWdnZXJDb25kaXRpb25zOyBsZXQgaWR4ID0gaW5kZXhcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImVkaXRUcmlnZ2VyQ29uZGl0aW9uKGlkeClcIlxuICAgICAgICAgICAgICAgIG1hdC1yYWlzZWQtYnV0dG9uXG4gICAgICAgICAgICAgICAgW21hdFRvb2x0aXBdPVwidHJpZ2dlckNvbmRpdGlvblwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLWljb24tY29udFwiPlxuICAgICAgICAgICAgICAgICAgPG1hdC1pY29uPmVkaXQ8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+PGNvZGU+e3sgdHJpZ2dlckNvbmRpdGlvbiB9fTwvY29kZT48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJwb2ludGVyXCIgKGNsaWNrKT1cInJlbW92ZVRyaWdnZXJDb25kaXRpb24oaWR4KVwiXG4gICAgICAgICAgICAgICAgPnJlbW92ZV9jaXJjbGVfb3V0bGluZTwvbWF0LWljb25cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc1RhYmxlRmllbGQobmUhLm5vZGUpXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1wcm9wXCI+XG4gICAgICAgICAgICA8bWF0LWNoZWNrYm94IGZvcm1Db250cm9sTmFtZT1cImhpZGVFbXB0eVJvd3NcIlxuICAgICAgICAgICAgICA+e3snSGlkZSBlbXB0eSByb3dzJ3x0cmFuc2xvY299fTwvbWF0LWNoZWNrYm94XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgIG1hdElucHV0XG4gICAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwidGFibGVEZWZcIlxuICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCInVGFibGUgZGVmaW5pdGlvbicgfCB0cmFuc2xvY29cIlxuICAgICAgICAgICAgICA+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cInBmLmdldCgndGFibGVEZWYnKT8uaW52YWxpZFwiPlxuICAgICAgICAgICAgICAgIHt7ZmllbGRFcnJvck1lc3NhZ2UocGYuZ2V0KCd0YWJsZURlZicpLCAndGFibGVEZWYnKX19XG4gICAgICAgICAgICAgIDwvbWF0LWVycm9yPlxuICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvZm9ybT5cbiAgPC9uZy1jb250YWluZXI+XG48L25nLWNvbnRhaW5lcj5cbiJdfQ==