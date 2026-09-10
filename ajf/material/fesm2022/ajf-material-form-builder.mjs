import { AjfTranslocoModule } from '@ajf/core/transloco';
import * as i2$1 from '@ajf/material/node-icon';
import { AjfNodeIconModule } from '@ajf/material/node-icon';
import * as i4$1 from '@angular/cdk/drag-drop';
import { moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { ChangeDetectionStrategy, ViewEncapsulation, Component, Input, EventEmitter, Injectable, ViewChild, ElementRef, forwardRef, ViewChildren, Pipe, Output, NgModule } from '@angular/core';
import * as i3$1 from '@angular/forms';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import * as i5 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i6$2 from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import * as i8$3 from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import * as i2 from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import * as i8$2 from '@angular/material/expansion';
import { MatExpansionModule } from '@angular/material/expansion';
import * as i7 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as i5$1 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i6 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i7$2 from '@angular/material/list';
import { MatListModule } from '@angular/material/list';
import * as i10 from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';
import * as i8$1 from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import * as i11 from '@angular/material/sidenav';
import { MatSidenavModule } from '@angular/material/sidenav';
import * as i14 from '@angular/material/slide-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import * as i13 from '@angular/material/slider';
import { MatSliderModule } from '@angular/material/slider';
import * as i7$1 from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import * as i12 from '@angular/material/toolbar';
import { MatToolbarModule } from '@angular/material/toolbar';
import * as i8 from '@angular/material/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as i9 from 'ngx-mat-select-search';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import * as i1 from '@ajf/core/forms';
import { isChoicesFixedOrigin, isContainerNode, AjfFieldType, AjfNodeType, createField, createContainerNode, createForm, createChoicesFixedOrigin, isSlidesNode, isFieldWithChoices, isRepeatingContainerNode, isField, createValidationGroup, notEmptyValidation, minValidation, maxValidation, minDigitsValidation, maxDigitsValidation, createValidation, createWarningGroup, notEmptyWarning, createWarning, isRangeField, isEmptyField, isTableField, isNumberField } from '@ajf/core/forms';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, of, Subject, Subscription, combineLatest, firstValueFrom } from 'rxjs';
import * as i6$1 from '@ngneat/transloco';
import { take, filter, map, scan, shareReplay, withLatestFrom, debounceTime, distinctUntilChanged, startWith, finalize, switchMap, pairwise, sample } from 'rxjs/operators';
import { createFormula, createCondition, alwaysCondition, neverCondition } from '@ajf/core/models';
import { deepCopy } from '@ajf/core/utils';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i4 from '@angular/material/core';

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
class AjfFbBranchLine {
    set offset(offset) {
        this._offset = offset;
        this._updateOffset();
    }
    set color(color) {
        this._color = color;
        this._updateColor();
    }
    set height(height) {
        this._height = height;
        this._updateHeight();
    }
    constructor(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this._offset = 0;
        this._color = '';
        this._height = 0;
    }
    _updateHeight() {
        const height = `${Math.max(0, this._height - 25)}px`;
        this._renderer.setStyle(this._el.nativeElement, 'height', height);
    }
    _updateOffset() {
        const margin = `${this._offset * 4}px`;
        this._renderer.setStyle(this._el.nativeElement, 'margin-top', margin);
        this._renderer.setStyle(this._el.nativeElement, 'margin-left', margin);
    }
    _updateColor() {
        this._renderer.setStyle(this._el.nativeElement, 'border-color', this._color);
    }
    static { this.ɵfac = function AjfFbBranchLine_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFbBranchLine)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFbBranchLine, selectors: [["ajf-fb-branch-line"]], inputs: { offset: "offset", color: "color", height: "height" }, decls: 0, vars: 0, template: function AjfFbBranchLine_Template(rf, ctx) { }, styles: ["ajf-fb-branch-line{display:block;position:absolute;top:25px;left:25px;width:25px;border-top:2px solid;border-left:2px solid;border-top-left-radius:6px;transition:height .5s ease-in-out}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFbBranchLine, [{
        type: Component,
        args: [{ selector: 'ajf-fb-branch-line', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "", styles: ["ajf-fb-branch-line{display:block;position:absolute;top:25px;left:25px;width:25px;border-top:2px solid;border-left:2px solid;border-top-left-radius:6px;transition:height .5s ease-in-out}\n"] }]
    }], () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], { offset: [{
            type: Input
        }], color: [{
            type: Input
        }], height: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFbBranchLine, { className: "AjfFbBranchLine", filePath: "branch-line.ts", lineNumber: 39 }); })();

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
class ChoicesOriginDataSource extends DataSource {
    constructor() {
        super();
        this._choices = new BehaviorSubject([]);
        this._choicesObs = this._choices;
    }
    connect() {
        return this._choicesObs;
    }
    disconnect() { }
    updateChoices(choices) {
        this._choices.next(choices);
    }
}

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
function AjfFbChoicesOriginEditor_mat_error_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-error");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "Name is required"), " ");
} }
function AjfFbChoicesOriginEditor_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 6);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "Name already exists"), " ");
} }
function AjfFbChoicesOriginEditor_ng_template_10_mat_header_cell_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-header-cell");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "Name"));
} }
function AjfFbChoicesOriginEditor_ng_template_10_mat_cell_9_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-cell")(1, "input", 16);
    i0.ɵɵtwoWayListener("ngModelChange", function AjfFbChoicesOriginEditor_ng_template_10_mat_cell_9_Template_input_ngModelChange_1_listener($event) { const row_r5 = i0.ɵɵrestoreView(_r4).$implicit; i0.ɵɵtwoWayBindingSet(row_r5.value, $event) || (row_r5.value = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r5 = ctx.$implicit;
    const idx_r6 = ctx.index;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("ajf-fb-choice-invalid", ctx_r2.isChoiceValueInvalid(row_r5.value, idx_r6));
    i0.ɵɵtwoWayProperty("ngModel", row_r5.value);
} }
function AjfFbChoicesOriginEditor_ng_template_10_mat_header_cell_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-header-cell");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "Label"));
} }
function AjfFbChoicesOriginEditor_ng_template_10_mat_cell_12_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-cell")(1, "input", 16);
    i0.ɵɵtwoWayListener("ngModelChange", function AjfFbChoicesOriginEditor_ng_template_10_mat_cell_12_Template_input_ngModelChange_1_listener($event) { const row_r8 = i0.ɵɵrestoreView(_r7).$implicit; i0.ɵɵtwoWayBindingSet(row_r8.label, $event) || (row_r8.label = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r8 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtwoWayProperty("ngModel", row_r8.label);
} }
function AjfFbChoicesOriginEditor_ng_template_10_mat_header_cell_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-header-cell");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "Delete"));
} }
function AjfFbChoicesOriginEditor_ng_template_10_mat_cell_15_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-cell")(1, "mat-icon", 17);
    i0.ɵɵlistener("click", function AjfFbChoicesOriginEditor_ng_template_10_mat_cell_15_Template_mat_icon_click_1_listener() { const idx_r10 = i0.ɵɵrestoreView(_r9).index; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.deleteRow(idx_r10)); });
    i0.ɵɵtext(2, "delete");
    i0.ɵɵelementEnd()();
} }
function AjfFbChoicesOriginEditor_ng_template_10_mat_header_row_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-header-row");
} }
function AjfFbChoicesOriginEditor_ng_template_10_mat_row_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-row");
} }
function AjfFbChoicesOriginEditor_ng_template_10_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 7);
    i0.ɵɵlistener("click", function AjfFbChoicesOriginEditor_ng_template_10_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.addRow()); });
    i0.ɵɵelementStart(1, "mat-icon");
    i0.ɵɵtext(2, "add");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "transloco");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "mat-table", 8);
    i0.ɵɵelementContainerStart(7, 9);
    i0.ɵɵtemplate(8, AjfFbChoicesOriginEditor_ng_template_10_mat_header_cell_8_Template, 3, 3, "mat-header-cell", 10)(9, AjfFbChoicesOriginEditor_ng_template_10_mat_cell_9_Template, 2, 3, "mat-cell", 11);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵelementContainerStart(10, 12);
    i0.ɵɵtemplate(11, AjfFbChoicesOriginEditor_ng_template_10_mat_header_cell_11_Template, 3, 3, "mat-header-cell", 10)(12, AjfFbChoicesOriginEditor_ng_template_10_mat_cell_12_Template, 2, 1, "mat-cell", 11);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵelementContainerStart(13, 13);
    i0.ɵɵtemplate(14, AjfFbChoicesOriginEditor_ng_template_10_mat_header_cell_14_Template, 3, 3, "mat-header-cell", 10)(15, AjfFbChoicesOriginEditor_ng_template_10_mat_cell_15_Template, 3, 0, "mat-cell", 11);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵtemplate(16, AjfFbChoicesOriginEditor_ng_template_10_mat_header_row_16_Template, 1, 0, "mat-header-row", 14)(17, AjfFbChoicesOriginEditor_ng_template_10_mat_row_17_Template, 1, 0, "mat-row", 15);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 4, "Add value"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("dataSource", ctx_r2.choices);
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("matHeaderRowDef", ctx_r2.displayedColumns);
    i0.ɵɵadvance();
    i0.ɵɵproperty("matRowDefColumns", ctx_r2.displayedColumns);
} }
class AjfFbChoicesOriginEditor {
    constructor() {
        this._displayedColumns = ['value', 'label', 'delete'];
        this.nameDuplicate = false;
        this.editing = {};
        this.name = '';
        this.label = '';
        this.canEditChoices = false;
        this._choices = new ChoicesOriginDataSource();
        this._choicesArr = [];
    }
    get displayedColumns() {
        return this._displayedColumns;
    }
    get choicesOrigin() {
        return this._choicesOrigin;
    }
    set choicesOrigin(choicesOrigin) {
        this._choicesOrigin = choicesOrigin;
        if (choicesOrigin != null) {
            this.name = choicesOrigin.name;
            this.label = choicesOrigin.label;
            this.canEditChoices = isChoicesFixedOrigin(choicesOrigin);
            this._choicesArr = choicesOrigin.choices;
        }
        else {
            this.name = '';
            this.label = '';
            this.canEditChoices = false;
            this._choicesArr = [];
        }
        this._choices.updateChoices(this._choicesArr);
    }
    get choices() {
        return this._choices;
    }
    get choicesArr() {
        return this._choicesArr;
    }
    get hasInvalidChoices() {
        const values = this._choicesArr.map(c => (c.value ?? '').trim());
        return values.some(v => v === '') || new Set(values).size !== values.length;
    }
    isChoiceValueInvalid(value, rowIdx) {
        const trimmed = (value ?? '').trim();
        if (trimmed === '')
            return true;
        return this._choicesArr.some((c, i) => i !== rowIdx && (c.value ?? '').trim() === trimmed);
    }
    updateValue(evt, cell, _value, rowIdx) {
        this.editing[rowIdx + '-' + cell] = false;
        this._choicesArr[rowIdx][cell] = evt.target.value;
        this._choices.updateChoices(this._choicesArr);
    }
    deleteRow(rowIdx) {
        this._choicesArr.splice(rowIdx, 1);
        this._choices.updateChoices(this._choicesArr);
    }
    addRow() {
        this._choicesArr.push({ label: '', value: '' });
        this._choices.updateChoices(this._choicesArr);
    }
    static { this.ɵfac = function AjfFbChoicesOriginEditor_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFbChoicesOriginEditor)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFbChoicesOriginEditor, selectors: [["ajf-fb-choices-origin-editor"]], inputs: { choicesOrigin: "choicesOrigin", nameDuplicate: "nameDuplicate" }, decls: 11, vars: 11, consts: [["nameInput", "ngModel"], ["matInput", "", "required", "", 3, "ngModelChange", "ngModel", "placeholder"], [4, "ngIf"], ["class", "ajf-fb-field-error", 4, "ngIf"], ["matInput", "", 3, "ngModelChange", "ngModel", "placeholder"], [3, "ngIf"], [1, "ajf-fb-field-error"], ["mat-button", "", 3, "click"], [3, "dataSource"], ["matColumnDef", "value"], [4, "matHeaderCellDef"], [4, "matCellDef"], ["matColumnDef", "label"], ["matColumnDef", "delete"], [4, "matHeaderRowDef"], [4, "matRowDef", "matRowDefColumns"], ["matInput", "", "type", "text", 3, "ngModelChange", "ngModel"], [3, "click"]], template: function AjfFbChoicesOriginEditor_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div")(1, "mat-form-field")(2, "input", 1, 0);
            i0.ɵɵpipe(4, "transloco");
            i0.ɵɵtwoWayListener("ngModelChange", function AjfFbChoicesOriginEditor_Template_input_ngModelChange_2_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.name, $event) || (ctx.name = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(5, AjfFbChoicesOriginEditor_mat_error_5_Template, 3, 3, "mat-error", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(6, AjfFbChoicesOriginEditor_span_6_Template, 3, 3, "span", 3);
            i0.ɵɵelementStart(7, "mat-form-field")(8, "input", 4);
            i0.ɵɵpipe(9, "transloco");
            i0.ɵɵtwoWayListener("ngModelChange", function AjfFbChoicesOriginEditor_Template_input_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.label, $event) || (ctx.label = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(10, AjfFbChoicesOriginEditor_ng_template_10_Template, 18, 6, "ng-template", 5);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            const nameInput_r11 = i0.ɵɵreference(3);
            i0.ɵɵadvance(2);
            i0.ɵɵtwoWayProperty("ngModel", ctx.name);
            i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(4, 7, "Name"));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", nameInput_r11.invalid && nameInput_r11.touched);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.nameDuplicate && ctx.name.trim());
            i0.ɵɵadvance(2);
            i0.ɵɵtwoWayProperty("ngModel", ctx.label);
            i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(9, 9, "Label"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.canEditChoices);
        } }, dependencies: [i3.NgIf, i3$1.DefaultValueAccessor, i3$1.NgControlStatus, i3$1.RequiredValidator, i3$1.NgModel, i5.MatButton, i7.MatFormField, i7.MatError, i5$1.MatIcon, i6.MatInput, i7$1.MatTable, i7$1.MatHeaderCellDef, i7$1.MatHeaderRowDef, i7$1.MatColumnDef, i7$1.MatCellDef, i7$1.MatRowDef, i7$1.MatHeaderCell, i7$1.MatCell, i7$1.MatHeaderRow, i7$1.MatRow, i6$1.TranslocoPipe], styles: ["ajf-fb-choices-origin-editor mat-form-field+mat-form-field{margin-left:1em}ajf-fb-choices-origin-editor .mat-mdc-table{max-height:300px}ajf-fb-choices-origin-editor .mat-mdc-table mat-icon{cursor:pointer}ajf-fb-choices-origin-editor .mat-mdc-input-element{max-width:100%}ajf-fb-choices-origin-editor .ajf-fb-field-error{color:var(--mdc-theme-error, #f44336);font-size:12px;margin-left:1em;vertical-align:middle}ajf-fb-choices-origin-editor .ajf-fb-choice-invalid{border-bottom-color:var(--mdc-theme-error, #f44336)!important;caret-color:var(--mdc-theme-error, #f44336)}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFbChoicesOriginEditor, [{
        type: Component,
        args: [{ selector: 'ajf-fb-choices-origin-editor', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div>\n  <mat-form-field>\n    <input matInput [(ngModel)]=\"name\" [placeholder]=\"'Name' | transloco\" required #nameInput=\"ngModel\" />\n    <mat-error *ngIf=\"nameInput.invalid && nameInput.touched\">\n      {{'Name is required' | transloco}}\n    </mat-error>\n  </mat-form-field>\n  <span class=\"ajf-fb-field-error\" *ngIf=\"nameDuplicate && name.trim()\">\n    {{'Name already exists' | transloco}}\n  </span>\n  <mat-form-field>\n    <input matInput [(ngModel)]=\"label\" [placeholder]=\"'Label' | transloco\" />\n  </mat-form-field>\n  <ng-template [ngIf]=\"canEditChoices\">\n    <button (click)=\"addRow()\" mat-button>\n      <mat-icon>add</mat-icon>\n      <span>{{'Add value'|transloco}}</span>\n    </button>\n    <mat-table [dataSource]=\"choices\">\n      <ng-container matColumnDef=\"value\">\n        <mat-header-cell *matHeaderCellDef\n          >{{'Name'|transloco}}</mat-header-cell\n        >\n        <mat-cell *matCellDef=\"let row; let idx = index\">\n          <input matInput [(ngModel)]=\"row.value\" type=\"text\"\n            [class.ajf-fb-choice-invalid]=\"isChoiceValueInvalid(row.value, idx)\"/>\n        </mat-cell>\n      </ng-container>\n      <ng-container matColumnDef=\"label\">\n        <mat-header-cell *matHeaderCellDef\n          >{{'Label'|transloco}}</mat-header-cell\n        >\n        <mat-cell *matCellDef=\"let row; let idx = index\">\n          <input matInput [(ngModel)]=\"row.label\" type=\"text\" />\n        </mat-cell>\n      </ng-container>\n      <ng-container matColumnDef=\"delete\">\n        <mat-header-cell *matHeaderCellDef\n          >{{'Delete'|transloco}}</mat-header-cell\n        >\n        <mat-cell *matCellDef=\"let row; let idx = index\">\n          <mat-icon (click)=\"deleteRow(idx)\">delete</mat-icon>\n        </mat-cell>\n      </ng-container>\n\n      <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n      <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n    </mat-table>\n  </ng-template>\n</div>\n", styles: ["ajf-fb-choices-origin-editor mat-form-field+mat-form-field{margin-left:1em}ajf-fb-choices-origin-editor .mat-mdc-table{max-height:300px}ajf-fb-choices-origin-editor .mat-mdc-table mat-icon{cursor:pointer}ajf-fb-choices-origin-editor .mat-mdc-input-element{max-width:100%}ajf-fb-choices-origin-editor .ajf-fb-field-error{color:var(--mdc-theme-error, #f44336);font-size:12px;margin-left:1em;vertical-align:middle}ajf-fb-choices-origin-editor .ajf-fb-choice-invalid{border-bottom-color:var(--mdc-theme-error, #f44336)!important;caret-color:var(--mdc-theme-error, #f44336)}\n"] }]
    }], null, { choicesOrigin: [{
            type: Input
        }], nameDuplicate: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFbChoicesOriginEditor, { className: "AjfFbChoicesOriginEditor", filePath: "choices-origin-editor.ts", lineNumber: 35 }); })();

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
 * The categories the entries of the form builder field types palette are
 * grouped into, in display order. The values are translation keys, rendered as
 * the header of each group.
 */
const AjfFormBuilderNodeTypeCategories = {
    structure: 'Structure',
    text: 'Text',
    numeric: 'Numeric',
    // Deliberately not 'Choices', which is already used by the choices origins
    // menu of the toolbar and has a different meaning.
    choices: 'Choice fields',
    dateTime: 'Date & time',
    advanced: 'Advanced',
};
function getNodeContainer(c, node) {
    if (c.nodes.indexOf(node) > -1 || c.nodes.map(n => n.id).indexOf(node?.id) > -1) {
        return c;
    }
    const cns = c.nodes.filter(n => isContainerNode(n));
    const len = cns.length;
    for (let i = 0; i < len; i++) {
        const cn = getNodeContainer(cns[i], node);
        if (cn != null) {
            return cn;
        }
    }
    return null;
}
function toArray(input) {
    if (!input)
        return [];
    input = input.replace(/\[|\]/g, '').trim();
    return input
        .split(',')
        .map(s => s.trim())
        .map(s => s.replace(/^['"]|['"]$/g, ''))
        .filter(s => s);
}
/**
 * Take the defaultValue from the properties box and return the new value to save in the ajf form defaultValue field properties
 * @param value
 * @param node
 * @returns
 * {"formula": "'colazione note'"}
 * {"formula": "'[\"colazione\", \"docce\"]'"}
 * {"formula": "3"}
 * {"formula": "(1 === 1)"}
 */
function getDefaultValue(value, node) {
    let defaultValue = value && value.trim() != '' ? value : null;
    if (defaultValue) {
        switch (node.fieldType) {
            case AjfFieldType.Boolean:
                if (defaultValue === 'true' || defaultValue === '1') {
                    return true;
                }
                if (defaultValue === 'false' || defaultValue === '0') {
                    return false;
                }
                return createFormula({ formula: defaultValue });
            case AjfFieldType.MultipleChoice:
                // return a string[]
                return toArray(defaultValue);
        }
        return createFormula({ formula: defaultValue });
    }
    return defaultValue;
}
/**
 * Take the defaultValue from the ajf form defaultValue prop (non formula)
 * and return the value to be shown in the properties box
 * @param value
 * @param node
 * @returns
 */
function cleanDefaultValue(value, node) {
    if (!value || String(value).trim() === '') {
        return null;
    }
    switch (node.fieldType) {
        case AjfFieldType.String:
        case AjfFieldType.Text:
        case AjfFieldType.SingleChoice:
            if (/^"[^"]*"$/.test(String(value)) || /^'[^']*'$/.test(String(value))) {
                return String(value);
            }
            return `'${String(value)}'`;
        case AjfFieldType.MultipleChoice:
            return JSON.stringify(value);
    }
    return String(value);
}
function buildFormBuilderNodesSubtree(nodes, parent, ignoreConditionalBranches = false) {
    const entries = nodes
        .filter(n => n.parent === parent.id)
        .sort((n1, n2) => n1.parentNode - n2.parentNode)
        .map(n => {
        const children = buildFormBuilderNodesSubtree(nodes, n);
        if (children.length === 0) {
            children.push({ parent: n, parentNode: 0 });
        }
        return {
            node: n,
            children,
            content: buildFormBuilderNodesContent(nodes, n),
        };
    });
    if (!ignoreConditionalBranches) {
        const entriesNum = entries.length;
        const cbs = parent.conditionalBranches.length;
        for (let i = entriesNum; i < cbs; i++) {
            entries.push({ parent: parent, parentNode: i });
        }
    }
    return entries;
}
function buildFormBuilderNodesContent(_nodes, node) {
    if (isContainerNode(node)) {
        return buildFormBuilderNodesSubtree(node.nodes, node, true);
    }
    return [];
}
function flattenNodes(nodes) {
    let flatNodes = [];
    nodes.forEach((node) => {
        if (isContainerNode(node)) {
            flatNodes = flatNodes.concat(flattenNodes(node.nodes));
        }
        flatNodes.push(node);
    });
    return flatNodes;
}
function getDescendants(flatNodes, parentNode, branch = null) {
    return branch != null
        ? flatNodes.filter(n => n.parent === parentNode.id && n.parentNode === branch)
        : flatNodes.filter(n => n.parent === parentNode.id);
}
function removeNodes(nodes, ids) {
    const len = nodes.length;
    for (let i = 0; i < len; i++) {
        const node = nodes[i];
        if (isContainerNode(node)) {
            const container = node;
            container.nodes = removeNodes(container.nodes, ids);
        }
    }
    return nodes.filter(n => ids.indexOf(n.id) === -1);
}
function deleteNodeSubtree(nodes, parentNode, branch = null) {
    const flatNodes = flattenNodes(nodes);
    let delNodes = [];
    let descendants = getDescendants(flatNodes, parentNode, branch);
    const len = descendants.length;
    for (let i = 0; i < len; i++) {
        delNodes = delNodes.concat(getDescendants(flatNodes, descendants[i]));
    }
    delNodes = delNodes.concat(descendants);
    return removeNodes(nodes, delNodes.map(n => n.id));
}
let nodeUniqueId = 0;
class AjfFormBuilderService {
    /**
     * Available node types
     *
     * @readonly
     * @memberOf AjfFormBuilderService
     */
    get availableNodeTypes() {
        return this._availableNodeTypes;
    }
    /**
     * Current edited form stream
     *
     * @readonly
     * @memberOf AjfFormBuilderService
     */
    get form() {
        return this._formObs;
    }
    get attachmentsOrigins() {
        return this._attachmentsOrigins;
    }
    get choicesOrigins() {
        return this._choicesOrigins;
    }
    get stringIdentifier() {
        return this._stringIdentifier;
    }
    get nodes() {
        return this._nodes;
    }
    get flatNodes() {
        return this._flatNodes;
    }
    get flatFields() {
        return this._flatFields;
    }
    get nodeEntriesTree() {
        return this._nodeEntriesTree;
    }
    get connectedDropLists() {
        return this._connectedDropLists;
    }
    get nodeEntriesTreeExpandedStatus() {
        return this._nodeEntriesTreeExpandedStatus;
    }
    get editedNodeEntry() {
        return this._editedNodeEntryObs;
    }
    get editedCondition() {
        return this._editedConditionObs;
    }
    get editedChoicesOrigin() {
        return this._editedChoicesOriginObs;
    }
    get editedNodesValidation() {
        return this._editedNodesValidationObs;
    }
    get beforeNodesUpdate() {
        return this._beforeNodesUpdateObs;
    }
    get afterNodeUpdate() {
        return this._afterNodeUpdateObs;
    }
    constructor() {
        /**
         * The node types available in the palette, listed by category in display
         * order. Entries of the same category are rendered under a common header, see
         * {@link AjfFormBuilderNodeTypeCategories}.
         */
        this._availableNodeTypes = [
            {
                label: 'Slide',
                nodeType: { node: AjfNodeType.AjfSlide },
                isSlide: true,
                category: AjfFormBuilderNodeTypeCategories.structure,
            },
            {
                label: 'Repeating slide',
                nodeType: { node: AjfNodeType.AjfRepeatingSlide },
                isSlide: true,
                category: AjfFormBuilderNodeTypeCategories.structure,
            },
            {
                label: 'String',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.String },
                category: AjfFormBuilderNodeTypeCategories.text,
            },
            {
                label: 'Text',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Text },
                category: AjfFormBuilderNodeTypeCategories.text,
            },
            {
                label: 'Note',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Empty },
                category: AjfFormBuilderNodeTypeCategories.text,
            },
            {
                label: 'Number',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Number },
                category: AjfFormBuilderNodeTypeCategories.numeric,
            },
            {
                label: 'Boolean',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Boolean },
                category: AjfFormBuilderNodeTypeCategories.choices,
            },
            {
                label: 'Single choice',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.SingleChoice },
                category: AjfFormBuilderNodeTypeCategories.choices,
            },
            {
                label: 'Multiple choice',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.MultipleChoice },
                category: AjfFormBuilderNodeTypeCategories.choices,
            },
            {
                label: 'Range',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Range },
                category: AjfFormBuilderNodeTypeCategories.choices,
            },
            {
                label: 'Date range',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.DateRange },
                category: AjfFormBuilderNodeTypeCategories.dateTime,
            },
            {
                label: 'Date input',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.DateInput },
                category: AjfFormBuilderNodeTypeCategories.dateTime,
            },
            {
                label: 'Time',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Time },
                category: AjfFormBuilderNodeTypeCategories.dateTime,
            },
            {
                label: 'Geolocation',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Geolocation },
                category: AjfFormBuilderNodeTypeCategories.advanced,
            },
            {
                label: 'Image',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Image },
                category: AjfFormBuilderNodeTypeCategories.advanced,
            },
            {
                label: 'Barcode',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Barcode },
                category: AjfFormBuilderNodeTypeCategories.advanced,
            },
            {
                label: 'Formula',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Formula },
                category: AjfFormBuilderNodeTypeCategories.advanced,
            },
            {
                label: 'Table',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Table },
                category: AjfFormBuilderNodeTypeCategories.advanced,
            },
            {
                label: 'File',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.File },
                category: AjfFormBuilderNodeTypeCategories.advanced,
            },
            {
                label: 'Signature',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Signature },
                category: AjfFormBuilderNodeTypeCategories.advanced,
            },
            {
                label: 'Audio',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Audio },
                category: AjfFormBuilderNodeTypeCategories.advanced,
            },
        ];
        this._form = new BehaviorSubject(null);
        this._formObs = this._form;
        this._attachmentsOrigins = of([]);
        this._choicesOrigins = of([]);
        this._stringIdentifier = of([]);
        this._nodesWithoutChoiceOrigins = of([]);
        this._nodes = of([]);
        this._flatFields = of([]);
        this._nodeEntriesTree = of([]);
        /**
         * A list of the ids of the dropLists connected to the source list.
         */
        this._connectedDropLists = new BehaviorSubject([]);
        /**
         * A dictionary of the 'expanded' status of all nodeEntries in the tree {node.name: boolean}
         */
        this._nodeEntriesTreeExpandedStatus = new BehaviorSubject({});
        /**
         * Determines the default expanded state of nodeEntries when the FormBuilder loads
         */
        this._defaultExpanded = false;
        this._editedNodeEntry = new BehaviorSubject(null);
        this._editedNodeEntryObs = this
            ._editedNodeEntry;
        /**
         * New field or node just added in tree
         */
        this._newNodeEntry = new BehaviorSubject(null);
        this._editedCondition = new BehaviorSubject(null);
        this._editedConditionObs = this
            ._editedCondition;
        this._editedChoicesOrigin = new BehaviorSubject(null);
        this._editedChoicesOriginObs = this
            ._editedChoicesOrigin;
        this._editedNodesValidation = new BehaviorSubject(null);
        this._editedNodesValidationObs = this
            ._editedNodesValidation;
        this._beforeNodesUpdate = new EventEmitter();
        this._beforeNodesUpdateObs = this._beforeNodesUpdate;
        this._afterNodeUpdate = new EventEmitter();
        this._afterNodeUpdateObs = this._afterNodeUpdate;
        this._nodesUpdates = new Subject();
        this._attachmentsOriginsUpdates = new Subject();
        this._choicesOriginsUpdates = new Subject();
        this._stringIdentifierUpdates = new Subject();
        this._saveNodeEntryEvent = new EventEmitter();
        this._deleteNodeEntryEvent = new EventEmitter();
        /**
         * Event fired when the position of a node in a tree changes.
         */
        this._moveNodeEntryEvent = new EventEmitter();
        /**
         * Subscribes to the moveNodeEntryEvent event emitter;
         */
        this._moveNodeSub = Subscription.EMPTY;
        /**
         * Counters for default name assigned to inserted fields/slides
         */
        this._emptyFieldCounter = 1;
        this._emptySlideCounter = 1;
        this._initChoicesOriginsStreams();
        this._initAttachmentsOriginsStreams();
        this._initStringIdentifierStreams();
        this._initNodesStreams();
        this._initFormStreams();
        this._initSaveNode();
        this._initMoveNode();
        this._initDeleteNode();
    }
    /**
     * Sets the current edited form
     *
     * @param form
     *
     * @memberOf AjfFormBuilderService
     */
    setForm(form) {
        if (form !== this._form.getValue()) {
            this._form.next(form);
        }
    }
    editNodeEntry(nodeEntry) {
        this._editedNodeEntry.next(nodeEntry);
    }
    /**
     * Add a node validation entry
     * @param fbNodeValidation
     */
    editNodeValidation(fbNodeValidation) {
        this._editedNodesValidation.next({
            ...this._editedNodesValidation.value,
            ...fbNodeValidation,
        });
    }
    /**
     * Return if a node is valid
     * @param nodeName
     */
    isNodeValid(nodeName) {
        const allNodeValidations = this._editedNodesValidation.value;
        if (!allNodeValidations || allNodeValidations[nodeName] == null) {
            return true;
        }
        return allNodeValidations[nodeName].isValid;
    }
    /**
     * Clean node validation entries when a node is deleted
     * @param fbNodeValidation the deleted node
     */
    cleanNodeValidation(fbNodeName) {
        if (fbNodeName) {
            // set validation true for old unused name
            const fbNodeValidation = {};
            fbNodeValidation[fbNodeName] = { isValid: true, errors: null };
            this.editNodeValidation(fbNodeValidation);
        }
        // Clean all not existing invalid nodes
        const allNodeValidations = this._editedNodesValidation.value;
        if (allNodeValidations && this._flatNodes) {
            const invalidNodes = [];
            Object.keys(allNodeValidations).forEach(key => {
                if (allNodeValidations[key]?.isValid === false) {
                    invalidNodes.push(key);
                }
            });
            if (invalidNodes.length) {
                this._flatNodes.pipe(take(1)).subscribe(nodes => {
                    const existingNodeNames = new Set(nodes.map(n => n.name));
                    invalidNodes.forEach(invalidNode => {
                        if (!existingNodeNames.has(invalidNode)) {
                            delete allNodeValidations[invalidNode];
                        }
                    });
                    this._editedNodesValidation.next(allNodeValidations);
                });
            }
        }
    }
    editCondition(condition) {
        this._editedCondition.next(condition);
    }
    saveCurrentCondition(condition) {
        let c = this._editedCondition.getValue();
        if (c == null) {
            return;
        }
        c.condition = condition;
        this._editedCondition.next(null);
    }
    cancelConditionEdit() {
        this._editedChoicesOrigin.next(null);
    }
    assignListId(node, empty = false) {
        if (node.nodeType === AjfNodeType.AjfSlide || node.nodeType === AjfNodeType.AjfRepeatingSlide) {
            const listId = empty ? `empty_fields_list_${node.id}` : `fields_list_${node.id}`;
            if (this._connectedDropLists.value.indexOf(listId) == -1) {
                this._connectDropList(listId);
            }
            return listId;
        }
        return '';
    }
    insertNode(nodeType, parent, parentNode, inContent = false, insertInIndex = 0) {
        let node;
        const id = ++nodeUniqueId;
        const isFieldNode = nodeType.nodeType?.field != null;
        if (isFieldNode) {
            node = createField({
                id,
                nodeType: AjfNodeType.AjfField,
                fieldType: nodeType.nodeType.field,
                parent: parent.id,
                parentNode,
                name: `new_field_${this._emptyFieldCounter}`,
                label: `New ${AjfFieldType[nodeType.nodeType.field]} field ${this._emptyFieldCounter}`,
            });
            this._emptyFieldCounter++;
        }
        else {
            node = createContainerNode({
                id,
                nodeType: nodeType.nodeType.node,
                parent: 0,
                parentNode,
                name: `new_slide_${this._emptySlideCounter}`,
                label: `New Slide ${this._emptySlideCounter}`,
                nodes: [],
            });
            this._emptySlideCounter++;
        }
        this.cancelNodeEntryEdit();
        this._newNodeEntry.next(node);
        this._beforeNodesUpdate.emit();
        this._nodesUpdates.next((nodes) => {
            const cn = isContainerNode(parent) && inContent
                ? parent
                : getNodeContainer({ nodes }, parent);
            if (!isFieldNode) {
                let newNodes = nodes.slice(0);
                newNodes.splice(insertInIndex, 0, node);
                newNodes = this._updateNodesList(0, newNodes);
                return newNodes;
            }
            else {
                let newNodes = cn.nodes.slice(0);
                newNodes.splice(insertInIndex, 0, node);
                newNodes = this._updateNodesList(cn.id, newNodes);
                cn.nodes = newNodes;
            }
            return nodes;
        });
    }
    saveNodeEntry(properties) {
        this._saveNodeEntryEvent.emit(properties);
    }
    cancelNodeEntryEdit() {
        this._editedNodeEntry.next(null);
    }
    deleteNodeEntry(nodeEntry) {
        this._deleteNodeEntryEvent.next(nodeEntry);
        this.cleanNodeValidation(nodeEntry.node.name);
    }
    /**
     * Triggers the moveNode event when a node is moved in the formbuilder.
     * @param nodeEntry The node to be moved.
     */
    moveNodeEntry(nodeEntry, from, to) {
        const moveEvent = { nodeEntry: nodeEntry, fromIndex: from, toIndex: to };
        this._moveNodeEntryEvent.next(moveEvent);
        this.cancelNodeEntryEdit();
    }
    getCurrentForm() {
        return combineLatest([
            this.form,
            this._nodesWithoutChoiceOrigins,
            this.attachmentsOrigins,
            this.choicesOrigins,
            this.stringIdentifier,
        ]).pipe(filter(([form]) => form != null), map(([form, nodes, attachmentsOrigins, choicesOrigins, stringIdentifier]) => {
            const supplementaryInformations = (form || {}).supplementaryInformations;
            return createForm({
                choicesOrigins: [...choicesOrigins],
                attachmentsOrigins: [...attachmentsOrigins],
                stringIdentifier: [...(stringIdentifier || [])],
                nodes: [...nodes],
                supplementaryInformations,
            });
        }));
    }
    editChoicesOrigin(choicesOrigin) {
        this._editedChoicesOrigin.next(choicesOrigin);
    }
    createChoicesOrigin() {
        this._editedChoicesOrigin.next(createChoicesFixedOrigin({ name: '' }));
    }
    cancelChoicesOriginEdit() {
        this._editedChoicesOrigin.next(null);
    }
    saveChoicesOrigin(params) {
        const choicesOrigin = this._editedChoicesOrigin.getValue();
        const choicesOriginPreviousName = choicesOrigin?.name;
        if (choicesOrigin != null) {
            choicesOrigin.label = params.label;
            choicesOrigin.name = params.name;
            if (isChoicesFixedOrigin(choicesOrigin)) {
                choicesOrigin.choices = params.choices;
            }
            this._updateChoicesOriginRefInNodes(choicesOriginPreviousName, params.name);
            this._choicesOriginsUpdates.next(choicesOrigins => {
                const idx = choicesOrigins.indexOf(choicesOrigin);
                if (idx > -1) {
                    choicesOrigins = [
                        ...choicesOrigins.slice(0, idx),
                        choicesOrigin,
                        ...choicesOrigins.slice(idx + 1),
                    ];
                }
                else {
                    choicesOrigins = [...choicesOrigins, choicesOrigin];
                }
                return choicesOrigins;
            });
        }
        this._editedChoicesOrigin.next(null);
    }
    saveStringIdentifier(identifier) {
        this._stringIdentifierUpdates.next(() => [...identifier]);
    }
    /**
     * Resets the nodeEntriesTreeExpandedStatus dictionary to an empty object.
     */
    resetNodeEntriesTreeExpandedStatus() {
        this._nodeEntriesTreeExpandedStatus.next({});
    }
    /**
     * Gets the expanded status of an entry in the nodeEntriesTreeExpandedStatus dictionary
     * @param nodeName The unique name of the nodeEntry
     */
    getExpandedStatus(nodeName) {
        return this._nodeEntriesTreeExpandedStatus.pipe(map(tree => {
            if (nodeName in tree) {
                return tree[nodeName];
            }
            return this._defaultExpanded;
        }));
    }
    /**
     * Upserts an entry in the nodeEntriesTreeExpandedStatus dictionary
     * @param nodeName The unique name of the nodeEntry
     * @param expanded True if the nodeEntry is expanded
     */
    updateExpandedStatus(nodeName, expanded) {
        if (!nodeName)
            return;
        const dictValue = this._nodeEntriesTreeExpandedStatus.value;
        this._nodeEntriesTreeExpandedStatus.next({ ...dictValue, [nodeName]: expanded });
    }
    /**
     * Removes an entry from the nodeEntriesTreeExpandedStatus dictionary
     * @param nodeName The unique name of the nodeEntry
     */
    removeExpandedStatus(nodeName) {
        const dictValue = this._nodeEntriesTreeExpandedStatus.value;
        delete dictValue[nodeName];
        this._nodeEntriesTreeExpandedStatus.next(dictValue);
    }
    /**
     * Sets expanded to true for each entry in the nodeEntriesTreeExpandedStatus dictionary
     */
    expandAll() {
        const dictValue = this._nodeEntriesTreeExpandedStatus.value;
        for (let nodeName in dictValue) {
            dictValue[nodeName] = true;
        }
        this._defaultExpanded = true;
        this._nodeEntriesTreeExpandedStatus.next(dictValue);
    }
    /**
     * Sets expanded to false for each entry in the nodeEntriesTreeExpandedStatus dictionary
     */
    collapseAll() {
        const dictValue = this._nodeEntriesTreeExpandedStatus.value;
        for (let nodeName in dictValue) {
            dictValue[nodeName] = false;
        }
        this._defaultExpanded = false;
        this._nodeEntriesTreeExpandedStatus.next(dictValue);
    }
    /**
     * Resets the empty fields/slides counters
     */
    resetEmptyCounters() {
        this._emptyFieldCounter = 1;
        this._emptySlideCounter = 1;
    }
    /**
     * Searches the form nodes for field nodes with choicesOriginRef corresponding
     * to an edited choicesOrigin and updates it with the new name.
     * @param previous_name The choicesOrigin previous name
     * @param new_name The choicesOrigin new name
     */
    _updateChoicesOriginRefInNodes(previous_name, new_name) {
        if (!previous_name || !new_name)
            return;
        const currentForm = this._form.value;
        if (!currentForm)
            return;
        const updatedNodes = [];
        const currentSlides = currentForm.nodes;
        for (let slide of currentSlides) {
            if (!slide.nodes || !slide.nodes.length)
                continue;
            for (let node of slide.nodes) {
                const nodeObj = node;
                if (nodeObj['choicesOriginRef'] && nodeObj['choicesOriginRef'] === previous_name) {
                    nodeObj['choicesOriginRef'] = new_name;
                    updatedNodes.push(nodeObj);
                }
            }
        }
        this._nodesUpdates.next((_nodes) => {
            return currentForm.nodes.slice(0);
        });
    }
    _buildFormBuilderNodesTree(nodes) {
        this._updateNodesList(0, nodes);
        const rootNodes = nodes.filter(n => n.nodeType == AjfNodeType.AjfSlide || n.nodeType == AjfNodeType.AjfRepeatingSlide);
        if (rootNodes.length === 0) {
            return [null];
        }
        const rootNode = rootNodes[0];
        if (isSlidesNode(rootNode)) {
            const tree = [];
            tree.push({
                node: rootNode,
                container: null,
                children: buildFormBuilderNodesSubtree(nodes, rootNode),
                content: buildFormBuilderNodesContent(nodes, rootNode),
            });
            const lastAddedAjfNode = this._newNodeEntry.value;
            if (lastAddedAjfNode) {
                const lastAddedFbNode = this._findNodeInTree(tree, lastAddedAjfNode);
                if (lastAddedFbNode) {
                    this.editNodeEntry(lastAddedFbNode);
                }
                this._newNodeEntry.next(null);
            }
            return tree;
        }
        throw new Error('Invalid form definition');
    }
    /**
     * Find an ajfNode in AjfFormBuilderNodeEntry tree, by node name
     * @param tree
     * @param node
     * @returns the AjfFormBuilderNodeEntry node
     */
    _findNodeInTree(tree, node) {
        for (const fbn of tree) {
            const fbe = fbn;
            if (fbe.node?.name === node.name) {
                return fbe;
            }
            if (fbe.content && fbe.content.length) {
                const foundInContent = this._findNodeInTree(fbe.content, node);
                if (foundInContent) {
                    return foundInContent;
                }
            }
            if (fbe.children && fbe.children.length) {
                const foundInChildren = this._findNodeInTree(fbe.children, node);
                if (foundInChildren) {
                    return foundInChildren;
                }
            }
        }
        return null;
    }
    /**
     * Adds the id of a dropList to be connected with the FormBuilder source list.
     * @param listId The id of the list to connect.
     */
    _connectDropList(listId) {
        let connectedLists = this._connectedDropLists.value.slice(0);
        this._connectedDropLists.next([...connectedLists, listId]);
    }
    _findMaxNodeId(nodes, _curMaxId = 0) {
        let maxId = 0;
        let maxNewFieldCounter = 0;
        let maxNewSlideCounter = 0;
        nodes.forEach(n => {
            maxId = Math.max(maxId, n.id);
            if (isContainerNode(n)) {
                maxId = Math.max(maxId, this._findMaxNodeId(n.nodes));
            }
            if (n.name.startsWith('new_field_')) {
                const newFieldNumber = this._extractNumberFromName(n.name, 'new_field_');
                if (newFieldNumber !== null) {
                    maxNewFieldCounter = Math.max(maxNewFieldCounter, newFieldNumber);
                }
            }
            else if (n.name.startsWith('new_slide_')) {
                const newSlideNumber = this._extractNumberFromName(n.name, 'new_slide_');
                if (newSlideNumber !== null) {
                    maxNewSlideCounter = Math.max(maxNewSlideCounter, newSlideNumber);
                }
            }
        });
        this._emptyFieldCounter = Math.max(this._emptyFieldCounter, maxNewFieldCounter + 1);
        this._emptySlideCounter = Math.max(this._emptySlideCounter, maxNewSlideCounter + 1);
        return maxId;
    }
    _extractNumberFromName(str, prefix) {
        const regex = new RegExp(`^${prefix}(\\d+)$`);
        const match = regex.exec(str);
        return match ? Number(match[1]) : null;
    }
    _initFormStreams() {
        this._form.subscribe((form) => {
            nodeUniqueId = 0;
            if (form != null && form.nodes != null && form.nodes.length > 0) {
                nodeUniqueId = this._findMaxNodeId(form.nodes);
            }
            this._nodesUpdates.next((_nodes) => {
                return form != null && form.nodes != null ? form.nodes.slice(0) : [];
            });
            this._attachmentsOriginsUpdates.next((_attachmentsOrigins) => {
                return form != null && form.attachmentsOrigins != null
                    ? form.attachmentsOrigins.slice(0)
                    : [];
            });
            this._choicesOriginsUpdates.next((_choicesOrigins) => {
                return form != null && form.choicesOrigins != null ? form.choicesOrigins.slice(0) : [];
            });
            this._stringIdentifierUpdates.next((_) => {
                return form != null && form.stringIdentifier != null
                    ? form.stringIdentifier.slice(0)
                    : [];
            });
        });
    }
    _initChoicesOriginsStreams() {
        this._choicesOrigins = (this._choicesOriginsUpdates).pipe(scan((choicesOrigins, op) => {
            return op(choicesOrigins);
        }, []), shareReplay(1));
    }
    _initAttachmentsOriginsStreams() {
        this._attachmentsOrigins = this._attachmentsOriginsUpdates.pipe(scan((attachmentsOrigins, op) => {
            return op(attachmentsOrigins);
        }, []), shareReplay(1));
    }
    _initStringIdentifierStreams() {
        this._stringIdentifier = this._stringIdentifierUpdates.pipe(scan((stringIdentifier, op) => {
            return op(stringIdentifier);
        }, []), shareReplay(1));
    }
    _initNodesStreams() {
        this._nodes = this._nodesUpdates.pipe(scan((nodes, op) => {
            return op(nodes);
        }, []), shareReplay(1));
        this._nodesWithoutChoiceOrigins = this._nodes.pipe(map(slides => slides.map(slide => {
            slide.nodes = slide.nodes.map((node) => {
                if (isFieldWithChoices(node)) {
                    const { choices, choicesOrigin, ...fwc } = deepCopy(node);
                    return fwc;
                }
                return node;
            });
            return slide;
        })));
        this._flatNodes = this._nodes.pipe(map((nodes) => flattenNodes(nodes)), shareReplay(1));
        this._flatFields = this._flatNodes.pipe(map((nodes) => nodes.filter(n => !isContainerNode(n))), shareReplay(1));
        this._nodeEntriesTree = this._nodes.pipe(map(nodes => this._buildFormBuilderNodesTree(nodes)), shareReplay(1));
    }
    _initSaveNode() {
        this._saveNodeEntryEvent
            .pipe(withLatestFrom(this.editedNodeEntry, this.choicesOrigins, this.attachmentsOrigins), filter(([_, nodeEntry]) => nodeEntry != null), map(([properties, ne]) => {
            this._beforeNodesUpdate.emit();
            const nodeEntry = ne;
            const origNode = nodeEntry.node;
            const node = deepCopy(origNode);
            node.id = nodeEntry.node.id;
            node.name = properties.name;
            node.label = properties.label;
            node.visibility =
                properties.visibility != null
                    ? createCondition({ condition: properties.visibility })
                    : undefined;
            const oldConditionalBranches = node.conditionalBranches.length;
            node.conditionalBranches =
                properties.conditionalBranches != null
                    ? properties.conditionalBranches.map((condition) => createCondition({ condition }))
                    : [alwaysCondition()];
            const newConditionalBranches = node.conditionalBranches.length;
            if (isRepeatingContainerNode(node)) {
                node.formulaReps =
                    properties.formulaReps != null
                        ? createFormula({ formula: properties.formulaReps })
                        : undefined;
                node.minReps = properties.minReps;
                node.maxReps = properties.maxReps;
            }
            if (isField(node)) {
                node.hint = properties.hint;
                node.editable = !properties.readonlyField;
                node.description = properties.description;
                node.defaultValue = getDefaultValue(properties.defaultValue, node);
                node.formula =
                    properties.formula != null ? createFormula({ formula: properties.formula }) : undefined;
                const forceValue = properties.value;
                const notEmpty = properties.notEmpty;
                const validationConditions = properties.validationConditions;
                let minValue = parseInt(properties.minValue, 10);
                let maxValue = parseInt(properties.maxValue, 10);
                let minDigits = parseInt(properties.minDigits, 10);
                let maxDigits = parseInt(properties.maxDigits, 10);
                if (isNaN(minValue)) {
                    minValue = null;
                }
                if (isNaN(maxValue)) {
                    maxValue = null;
                }
                if (isNaN(minDigits)) {
                    minDigits = null;
                }
                if (isNaN(maxDigits)) {
                    maxDigits = null;
                }
                if (forceValue != null ||
                    notEmpty != null ||
                    (validationConditions != null && validationConditions.length > 0) ||
                    minValue != null ||
                    maxValue != null ||
                    minDigits != null ||
                    maxDigits != null) {
                    const validation = node.validation || createValidationGroup({});
                    validation.forceValue = forceValue;
                    validation.notEmpty = notEmpty ? notEmptyValidation() : undefined;
                    validation.minValue = minValue != null ? minValidation(minValue) : undefined;
                    validation.maxValue = maxValue != null ? maxValidation(maxValue) : undefined;
                    validation.minDigits = minDigits != null ? minDigitsValidation(minDigits) : undefined;
                    validation.maxDigits = maxDigits != null ? maxDigitsValidation(maxDigits) : undefined;
                    validation.conditions = (validationConditions || []).map((c) => createValidation({
                        condition: c.condition,
                        errorMessage: c.errorMessage,
                    }));
                    node.validation = validation;
                }
                else {
                    node.validation = undefined;
                }
                const notEmptyWarn = properties.notEmptyWarning;
                const warningConditions = properties.warningConditions;
                if (notEmptyWarn != null ||
                    (warningConditions != null && warningConditions.length > 0)) {
                    const warning = node.warning || createWarningGroup({});
                    warning.notEmpty = notEmptyWarn ? notEmptyWarning() : undefined;
                    warning.conditions = (warningConditions || []).map((w) => createWarning({
                        condition: w.condition,
                        warningMessage: w.warningMessage,
                    }));
                    node.warning = warning;
                }
                else {
                    node.warning = undefined;
                }
                node.nextSlideCondition =
                    properties.nextSlideCondition != null
                        ? createCondition({ condition: properties.nextSlideCondition })
                        : undefined;
                node.size = properties.size;
                if (isFieldWithChoices(node)) {
                    node.choicesOriginRef = properties.choicesOriginRef;
                    node.forceExpanded = properties.forceExpanded;
                    node.forceNarrow = properties.forceNarrow;
                    node.triggerConditions = (properties.triggerConditions || []).map((t) => createCondition({ condition: t }));
                }
                if (isRangeField(node)) {
                    node.start = properties.start;
                    node.end = properties.end;
                    node.step = properties.step;
                    node.appearance = properties.appearance ?? undefined;
                }
                if (isEmptyField(node)) {
                    node.HTML = properties.HTML;
                }
                if (isTableField(node)) {
                    let { columnTypes, rows, columnLabels, rowLabels } = JSON.parse(properties.tableDef);
                    node.columnTypes = columnTypes || [];
                    node.rows = rows || [];
                    node.columnLabels = columnLabels || [];
                    node.rowLabels = rowLabels || [];
                    node.hideEmptyRows = properties.hideEmptyRows;
                }
            }
            this._editedNodeEntry.next(null);
            return (nodes) => {
                let cn = getNodeContainer({ nodes }, origNode);
                if (cn != null) {
                    // TODO: @trik check this, was always true?
                    // if (cn instanceof AjfNode) {
                    const replaceNodes = cn.nodes === nodes;
                    const idx = cn.nodes.map(n => n.id).indexOf(origNode.id);
                    let newNodes = cn.nodes.slice(0, idx);
                    newNodes.push(node);
                    newNodes = newNodes.concat(cn.nodes.slice(idx + 1));
                    cn.nodes = newNodes;
                    if (replaceNodes) {
                        nodes = newNodes;
                    }
                    else {
                        nodes = nodes.slice(0);
                    }
                    // } else {
                    //   const idx = nodes.indexOf(origNode);
                    //   nodes = nodes.slice(0, idx).concat([node]).concat(nodes.slice(idx + 1));
                    // }
                    if (newConditionalBranches < oldConditionalBranches) {
                        for (let i = newConditionalBranches; i < oldConditionalBranches; i++) {
                            nodes = deleteNodeSubtree(nodes, node, i);
                        }
                    }
                }
                return nodes;
            };
        }))
            .subscribe(this._nodesUpdates);
    }
    _initDeleteNode() {
        this._deleteNodeEntryEvent
            .pipe(map((nodeEntry) => {
            this._beforeNodesUpdate.emit();
            this.removeExpandedStatus(nodeEntry.node.name);
            return (nodes) => {
                const node = nodeEntry.node;
                let cn = getNodeContainer({ nodes }, node);
                if (cn != null) {
                    const replaceNodes = cn.nodes === nodes;
                    const idx = cn.nodes.map(n => n.id).indexOf(node.id);
                    let newNodes = cn.nodes.slice(0, idx);
                    newNodes = newNodes.concat(cn.nodes.slice(idx + 1));
                    cn.nodes = newNodes;
                    if (replaceNodes) {
                        nodes = newNodes;
                    }
                    else {
                        nodes = nodes.slice(0);
                    }
                }
                return nodes;
            };
        }))
            .subscribe(this._nodesUpdates);
    }
    /**
     * Initializes the subscription to the moveNodeEntryEvent.
     */
    _initMoveNode() {
        this._moveNodeSub.unsubscribe();
        this._moveNodeSub = this._moveNodeEntryEvent
            .pipe(map((moveEvent) => {
            this._beforeNodesUpdate.emit();
            return (nodes) => {
                const nodeEntry = moveEvent.nodeEntry;
                const node = nodeEntry.node;
                let cn = getNodeContainer({ nodes }, node);
                let newNodes = nodes;
                if (cn != null) {
                    const replaceNodes = cn.nodes === nodes;
                    newNodes = cn.nodes;
                    moveItemInArray(newNodes, moveEvent.fromIndex, moveEvent.toIndex);
                    newNodes = this._updateNodesList(cn.id, newNodes);
                    cn.nodes = newNodes;
                    if (replaceNodes) {
                        nodes = newNodes;
                    }
                    else {
                        nodes = nodes.slice(0);
                    }
                }
                return nodes;
            };
        }))
            .subscribe(this._nodesUpdates);
    }
    /**
     * Updates the "id" and "parent" fields of a modified or rearranged list of nodes.
     * @param containerId The id of the parent container of the list.
     * @param nodesList The list of nodes to be updated.
     */
    _updateNodesList(containerId, nodesList) {
        if (!nodesList.length) {
            return [];
        }
        const contId = containerId != undefined ? containerId : 0;
        for (let idx = 0; idx < nodesList.length; idx++) {
            let currentNode = nodesList[idx];
            currentNode.id = contId * 1000 + idx + 1;
            currentNode.parent = idx == 0 ? contId : contId * 1000 + idx;
            if (isSlidesNode(currentNode)) {
                this._updateNodesList(currentNode.id, currentNode.nodes);
            }
        }
        return nodesList;
    }
    static { this.ɵfac = function AjfFormBuilderService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFormBuilderService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AjfFormBuilderService, factory: AjfFormBuilderService.ɵfac }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFormBuilderService, [{
        type: Injectable
    }], () => [], null); })();

function AjfFbChoicesOriginEditorDialog_ajf_fb_choices_origin_editor_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-fb-choices-origin-editor", 5);
} if (rf & 2) {
    const co_r1 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("choicesOrigin", co_r1)("nameDuplicate", ctx_r1.isDuplicateName());
} }
class AjfFbChoicesOriginEditorDialog {
    get choicesOrigin() {
        return this._choicesOrigin;
    }
    constructor(_service) {
        this._service = _service;
        this._allChoicesOrigins = [];
        this._editedOriginOriginalName = '';
        this._choicesOrigin = this._service.editedChoicesOrigin.pipe(filter(c => c != null), map(c => c));
        this._service.editedChoicesOrigin
            .pipe(filter(c => c != null), map(c => c))
            .subscribe(c => { this._editedOriginOriginalName = c.name; });
        this._service.choicesOrigins.subscribe(origins => {
            this._allChoicesOrigins = origins;
        });
    }
    isDuplicateName() {
        if (this.editor == null)
            return false;
        const name = (this.editor.name ?? '').trim();
        if (name === '')
            return false;
        return this._allChoicesOrigins.some(o => o.name !== this._editedOriginOriginalName && o.name === name);
    }
    disableSave() {
        if (this.editor == null)
            return true;
        const name = (this.editor.name ?? '').trim();
        if (name === '')
            return true;
        if (this.isDuplicateName())
            return true;
        if (this.editor.hasInvalidChoices)
            return true;
        return false;
    }
    saveChoicesOrigin() {
        this._service.saveChoicesOrigin({
            label: this.editor.label,
            name: this.editor.name,
            choices: this.editor.choicesArr,
        });
    }
    cancelChoicesOriginEdit() {
        this._service.cancelChoicesOriginEdit();
    }
    static { this.ɵfac = function AjfFbChoicesOriginEditorDialog_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFbChoicesOriginEditorDialog)(i0.ɵɵdirectiveInject(AjfFormBuilderService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFbChoicesOriginEditorDialog, selectors: [["ajf-fb-choices-origin-editor-dialog"]], viewQuery: function AjfFbChoicesOriginEditorDialog_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(AjfFbChoicesOriginEditor, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.editor = _t.first);
        } }, decls: 13, vars: 13, consts: [["matDialogTitle", ""], [3, "choicesOrigin", "nameDuplicate", 4, "ngIf"], ["align", "center"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["mat-raised-button", "", "color", "accent", 3, "click"], [3, "choicesOrigin", "nameDuplicate"]], template: function AjfFbChoicesOriginEditorDialog_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "h3", 0);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "mat-dialog-content");
            i0.ɵɵtemplate(4, AjfFbChoicesOriginEditorDialog_ajf_fb_choices_origin_editor_4_Template, 1, 2, "ajf-fb-choices-origin-editor", 1);
            i0.ɵɵpipe(5, "async");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "mat-dialog-actions", 2)(7, "button", 3);
            i0.ɵɵlistener("click", function AjfFbChoicesOriginEditorDialog_Template_button_click_7_listener() { return ctx.saveChoicesOrigin(); });
            i0.ɵɵtext(8);
            i0.ɵɵpipe(9, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "button", 4);
            i0.ɵɵlistener("click", function AjfFbChoicesOriginEditorDialog_Template_button_click_10_listener() { return ctx.cancelChoicesOriginEdit(); });
            i0.ɵɵtext(11);
            i0.ɵɵpipe(12, "transloco");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 5, "Edit choices origin"));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(5, 7, ctx.choicesOrigin));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("disabled", ctx.disableSave());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 9, "Save"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(12, 11, "Close"), " ");
        } }, dependencies: [i3.NgIf, i5.MatButton, i2.MatDialogTitle, i2.MatDialogActions, i2.MatDialogContent, AjfFbChoicesOriginEditor, i3.AsyncPipe, i6$1.TranslocoPipe], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFbChoicesOriginEditorDialog, [{
        type: Component,
        args: [{ selector: 'ajf-fb-choices-origin-editor-dialog', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<h3 matDialogTitle>{{'Edit choices origin'|transloco}}</h3>\n<mat-dialog-content>\n  <ajf-fb-choices-origin-editor\n    *ngIf=\"choicesOrigin|async as co\"\n    [choicesOrigin]=\"co!\"\n    [nameDuplicate]=\"isDuplicateName()\"\n  ></ajf-fb-choices-origin-editor>\n</mat-dialog-content>\n<mat-dialog-actions align=\"center\">\n  <button mat-raised-button color=\"primary\" (click)=\"saveChoicesOrigin()\" [disabled]=\"disableSave()\">{{'Save'|transloco}}</button>\n  <button mat-raised-button color=\"accent\" (click)=\"cancelChoicesOriginEdit()\">\n    {{'Close'|transloco}}\n  </button>\n</mat-dialog-actions>\n" }]
    }], () => [{ type: AjfFormBuilderService }], { editor: [{
            type: ViewChild,
            args: [AjfFbChoicesOriginEditor, { static: false }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFbChoicesOriginEditorDialog, { className: "AjfFbChoicesOriginEditorDialog", filePath: "choices-origin-editor-dialog.ts", lineNumber: 38 }); })();

function AjfFbConditionEditor_ng_container_5_mat_nav_list_1_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 8);
    i0.ɵɵlistener("click", function AjfFbConditionEditor_ng_container_5_mat_nav_list_1_a_1_Template_a_click_0_listener() { const field_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.insertVariable(field_r2.name)); });
    i0.ɵɵelement(1, "ajf-node-icon", 9);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const field_r2 = ctx.$implicit;
    i0.ɵɵproperty("matTooltip", field_r2.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("node", field_r2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", field_r2.name, " ");
} }
function AjfFbConditionEditor_ng_container_5_mat_nav_list_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-nav-list", 6);
    i0.ɵɵtemplate(1, AjfFbConditionEditor_ng_container_5_mat_nav_list_1_a_1_Template, 3, 3, "a", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const curFields_r4 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", curFields_r4);
} }
function AjfFbConditionEditor_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFbConditionEditor_ng_container_5_mat_nav_list_1_Template, 2, 1, "mat-nav-list", 5);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const curFields_r4 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", curFields_r4.length > 0);
} }
class AjfFbConditionEditor {
    get fields() {
        return this._fields;
    }
    set fields(fields) {
        this._fields = fields;
    }
    constructor(_) {
        this._fields = [];
        this.condition = '';
        this.formulaEditorControl = new FormControl(this.condition);
    }
    ngAfterViewInit() {
        this.formulaEditorControl.setValue(this.condition);
    }
    insertVariable(variable) {
        const currValue = this.formulaEditorControl.value != null ? this.formulaEditorControl.value : '';
        const newValue = currValue + variable;
        this.formulaEditorControl.setValue(newValue);
    }
    static { this.ɵfac = function AjfFbConditionEditor_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFbConditionEditor)(i0.ɵɵdirectiveInject(i1.AjfValidationService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFbConditionEditor, selectors: [["ajf-condition-editor"]], inputs: { fields: "fields", condition: "condition" }, decls: 6, vars: 2, consts: [[1, "ajf-editor"], [1, "ajf-formula-editor"], ["matInput", "", "type", "text", 3, "formControl"], [1, "ajf-editor-panel"], [4, "ngIf"], ["dense", "", 4, "ngIf"], ["dense", ""], ["mat-list-item", "", 3, "matTooltip", "click", 4, "ngFor", "ngForOf"], ["mat-list-item", "", 3, "click", "matTooltip"], [3, "node"]], template: function AjfFbConditionEditor_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "mat-form-field", 1)(2, "code");
            i0.ɵɵelement(3, "input", 2);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(4, "div", 3);
            i0.ɵɵtemplate(5, AjfFbConditionEditor_ng_container_5_Template, 2, 1, "ng-container", 4);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("formControl", ctx.formulaEditorControl);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.fields);
        } }, dependencies: [i2$1.AjfNodeIcon, i3.NgForOf, i3.NgIf, i3$1.DefaultValueAccessor, i3$1.NgControlStatus, i7.MatFormField, i6.MatInput, i7$2.MatNavList, i7$2.MatListItem, i8.MatTooltip, i3$1.FormControlDirective], styles: ["ajf-condition-editor{display:flex;flex-direction:row;align-items:stretch;max-height:512px}ajf-condition-editor .ajf-editor{flex:.75 0 auto;display:flex;flex-direction:row;align-items:stretch}ajf-condition-editor .ajf-editor-panel{flex:.25 0 auto;overflow-y:auto}ajf-condition-editor .ajf-editor-panel .mat-mdc-nav-list{max-height:30vh;overflow-y:auto}ajf-condition-editor .ajf-formula-editor{min-width:40vw}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFbConditionEditor, [{
        type: Component,
        args: [{ selector: 'ajf-condition-editor', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"ajf-editor\">\n  <mat-form-field class=\"ajf-formula-editor\">\n    <code><input matInput type=\"text\" [formControl]=\"formulaEditorControl\" /></code>\n  </mat-form-field>\n</div>\n<div class=\"ajf-editor-panel\">\n  <ng-container *ngIf=\"fields as curFields\">\n    <mat-nav-list dense *ngIf=\"curFields!.length > 0\">\n      <a\n        mat-list-item\n        (click)=\"insertVariable(field.name)\"\n        [matTooltip]=\"field.label\"\n        *ngFor=\"let field of curFields!\"\n      >\n        <ajf-node-icon [node]=\"field\"></ajf-node-icon>\n        {{ field.name }}\n      </a>\n    </mat-nav-list>\n  </ng-container>\n</div>\n", styles: ["ajf-condition-editor{display:flex;flex-direction:row;align-items:stretch;max-height:512px}ajf-condition-editor .ajf-editor{flex:.75 0 auto;display:flex;flex-direction:row;align-items:stretch}ajf-condition-editor .ajf-editor-panel{flex:.25 0 auto;overflow-y:auto}ajf-condition-editor .ajf-editor-panel .mat-mdc-nav-list{max-height:30vh;overflow-y:auto}ajf-condition-editor .ajf-formula-editor{min-width:40vw}\n"] }]
    }], () => [{ type: i1.AjfValidationService }], { fields: [{
            type: Input
        }], condition: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFbConditionEditor, { className: "AjfFbConditionEditor", filePath: "condition-editor.ts", lineNumber: 40 }); })();

function AjfFbConditionEditorDialog_ajf_condition_editor_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-condition-editor", 3);
} if (rf & 2) {
    const curFields_r1 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("fields", curFields_r1)("condition", ctx_r1.condition);
} }
class AjfFbConditionEditorDialog {
    get fields() {
        return this._fields;
    }
    constructor(service, dialogRef) {
        this.dialogRef = dialogRef;
        this.condition = '';
        this._fields = service.flatFields.pipe(map((fields) => fields.sort((f1, f2) => f1.name.localeCompare(f2.name))));
    }
    saveCondition() {
        if (this.editor == null) {
            return;
        }
        const newValue = this.editor.formulaEditorControl.value;
        this.dialogRef.close(newValue);
    }
    closeDialog() {
        this.dialogRef.close(this.editor.formulaEditorControl.value);
    }
    static { this.ɵfac = function AjfFbConditionEditorDialog_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFbConditionEditorDialog)(i0.ɵɵdirectiveInject(AjfFormBuilderService), i0.ɵɵdirectiveInject(i2.MatDialogRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFbConditionEditorDialog, selectors: [["ajf-condition-editor-dialog"]], viewQuery: function AjfFbConditionEditorDialog_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(AjfFbConditionEditor, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.editor = _t.first);
        } }, decls: 13, vars: 12, consts: [["matDialogTitle", ""], [3, "fields", "condition", 4, "ngIf"], ["mat-button", "", 3, "click"], [3, "fields", "condition"]], template: function AjfFbConditionEditorDialog_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "h3", 0);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "mat-dialog-content");
            i0.ɵɵtemplate(4, AjfFbConditionEditorDialog_ajf_condition_editor_4_Template, 1, 2, "ajf-condition-editor", 1);
            i0.ɵɵpipe(5, "async");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "mat-dialog-actions")(7, "button", 2);
            i0.ɵɵlistener("click", function AjfFbConditionEditorDialog_Template_button_click_7_listener() { return ctx.saveCondition(); });
            i0.ɵɵtext(8);
            i0.ɵɵpipe(9, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "button", 2);
            i0.ɵɵlistener("click", function AjfFbConditionEditorDialog_Template_button_click_10_listener() { return ctx.closeDialog(); });
            i0.ɵɵtext(11);
            i0.ɵɵpipe(12, "transloco");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 4, "Edit condition"));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(5, 6, ctx.fields));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 8, "Save"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 10, "Close"));
        } }, dependencies: [i3.NgIf, i5.MatButton, i2.MatDialogTitle, i2.MatDialogActions, i2.MatDialogContent, AjfFbConditionEditor, i3.AsyncPipe, i6$1.TranslocoPipe], styles: ["ajf-condition-editor-dialog .mat-mdc-dialog-content{overflow:visible}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFbConditionEditorDialog, [{
        type: Component,
        args: [{ selector: 'ajf-condition-editor-dialog', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<h3 matDialogTitle>{{'Edit condition'|transloco}}</h3>\n<mat-dialog-content>\n  <ajf-condition-editor\n    *ngIf=\"fields|async as curFields\"\n    [fields]=\"curFields!\"\n    [condition]=\"condition\"\n  ></ajf-condition-editor>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button (click)=\"saveCondition()\">{{'Save'|transloco}}</button>\n  <button mat-button (click)=\"closeDialog()\">{{'Close'|transloco}}</button>\n</mat-dialog-actions>\n", styles: ["ajf-condition-editor-dialog .mat-mdc-dialog-content{overflow:visible}\n"] }]
    }], () => [{ type: AjfFormBuilderService }, { type: i2.MatDialogRef }], { editor: [{
            type: ViewChild,
            args: [AjfFbConditionEditor, { static: false }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFbConditionEditorDialog, { className: "AjfFbConditionEditorDialog", filePath: "condition-editor-dialog.ts", lineNumber: 39 }); })();

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
 * Triggers when a field or slide node is moved or inserted by drag&dropping in the formbuilder.
 * @param event The drop event.
 * @param fbService The AjfFormBuilderService.
 * @param nodeEntry The current nodeEntry, if present.
 * @param content True if the current nodeEntry contains other nodeEntries.
 */
function onDropProcess(event, fbService, nodeEntry, content = false) {
    const itemData = event.item.data;
    const containerId = event.container.id;
    if (!itemData.node) {
        if (nodeEntry == null && containerId === 'slides-list') {
            fbService.insertNode(itemData, null, 0, content, event.currentIndex);
            return;
        }
        const emptySlot = content
            ? { parent: nodeEntry.node, parentNode: 0 }
            : nodeEntry;
        fbService.insertNode(itemData, emptySlot.parent, emptySlot.parentNode, content, event.currentIndex);
        return;
    }
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;
    fbService.moveNodeEntry(event.item.data, previousIndex, currentIndex);
}
/**
 * Disables the drag&drop of Slide items.
 * @param item The dragged item.
 */
function disableSlideDropPredicate(item) {
    return !item.data.isSlide;
}
/**
 * Disables the drag&drop of Field items.
 * @param item The dragged item.
 */
function disableFieldDropPredicate(item) {
    if (!item.data.isSlide) {
        return false;
    }
    return true;
}

function AjfFbStringIdentifierDialogComponent_mat_option_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const field_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", field_r1.name);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", field_r1.label || field_r1.name, " ");
} }
class AjfFbStringIdentifierDialogComponent {
    constructor(_service) {
        this._service = _service;
        this.searchFilterCtrl = new FormControl('', { nonNullable: true });
        this.selectedFieldNames = [];
        this._fields = [];
        this._fieldsSub = Subscription.EMPTY;
        this._stringIdentifierSub = Subscription.EMPTY;
        this.fields$ = _service.flatFields.pipe(map(fields => fields
            .filter(f => f.name.length > 0)
            .sort((f1, f2) => (f1.label || f1.name).localeCompare(f2.label || f2.name))), shareReplay(1));
        this._fieldsSub = this.fields$.subscribe(fields => {
            this._fields = fields;
        });
        this._stringIdentifierSub = _service.stringIdentifier.subscribe(identifier => {
            this.selectedFieldNames = identifier
                .map(entry => entry.value[0])
                .filter((name) => name != null);
        });
        this.filteredFields$ = this.searchFilterCtrl.valueChanges.pipe(debounceTime(150), distinctUntilChanged(), startWith(''), map(search => {
            const fields = this._fields;
            if (!search) {
                return fields;
            }
            const lowerSearch = search.toLowerCase();
            return fields.filter(f => (f.label || f.name).toLowerCase().includes(lowerSearch));
        }));
    }
    ngOnDestroy() {
        this._fieldsSub.unsubscribe();
        this._stringIdentifierSub.unsubscribe();
    }
    saveStringIdentifier() {
        const identifier = this.selectedFieldNames
            .map(name => this._fields.find(f => f.name === name))
            .filter((f) => f != null)
            .map(f => ({ label: f.label || f.name, value: [f.name] }));
        this._service.saveStringIdentifier(identifier);
    }
    static { this.ɵfac = function AjfFbStringIdentifierDialogComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFbStringIdentifierDialogComponent)(i0.ɵɵdirectiveInject(AjfFormBuilderService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFbStringIdentifierDialogComponent, selectors: [["ajf-fb-string-identifier-dialog"]], decls: 22, vars: 24, consts: [["matDialogTitle", ""], [1, "ajf-string-identifier-select"], ["multiple", "", 3, "ngModelChange", "ngModel"], [3, "formControl", "placeholderLabel", "noEntriesFoundLabel", "enableClearOnEscapePressed"], [3, "value", 4, "ngFor", "ngForOf"], ["mat-raised-button", "", "color", "warn", "matDialogClose", ""], ["mat-raised-button", "", "color", "primary", "matDialogClose", "", 3, "click"], [3, "value"]], template: function AjfFbStringIdentifierDialogComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "h3", 0);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "mat-dialog-content")(4, "p");
            i0.ɵɵtext(5);
            i0.ɵɵpipe(6, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "mat-form-field", 1)(8, "mat-select", 2);
            i0.ɵɵtwoWayListener("ngModelChange", function AjfFbStringIdentifierDialogComponent_Template_mat_select_ngModelChange_8_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.selectedFieldNames, $event) || (ctx.selectedFieldNames = $event); return $event; });
            i0.ɵɵelementStart(9, "mat-option");
            i0.ɵɵelement(10, "ngx-mat-select-search", 3);
            i0.ɵɵpipe(11, "transloco");
            i0.ɵɵpipe(12, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(13, AjfFbStringIdentifierDialogComponent_mat_option_13_Template, 2, 2, "mat-option", 4);
            i0.ɵɵpipe(14, "async");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(15, "mat-dialog-actions")(16, "button", 5);
            i0.ɵɵtext(17);
            i0.ɵɵpipe(18, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "button", 6);
            i0.ɵɵlistener("click", function AjfFbStringIdentifierDialogComponent_Template_button_click_19_listener() { return ctx.saveStringIdentifier(); });
            i0.ɵɵtext(20);
            i0.ɵɵpipe(21, "transloco");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 10, "Default columns"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 12, "Select the fields that will be shown as columns in the form list page"));
            i0.ɵɵadvance(3);
            i0.ɵɵtwoWayProperty("ngModel", ctx.selectedFieldNames);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formControl", ctx.searchFilterCtrl)("placeholderLabel", i0.ɵɵpipeBind1(11, 14, "Search"))("noEntriesFoundLabel", i0.ɵɵpipeBind1(12, 16, "Nothing found"))("enableClearOnEscapePressed", true);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(14, 18, ctx.filteredFields$));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(18, 20, "Close"), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(21, 22, "Save"), " ");
        } }, dependencies: [i3.NgForOf, i3$1.NgControlStatus, i3$1.NgModel, i4.MatOption, i5.MatButton, i2.MatDialogClose, i2.MatDialogTitle, i2.MatDialogActions, i2.MatDialogContent, i7.MatFormField, i8$1.MatSelect, i9.MatSelectSearchComponent, i3$1.FormControlDirective, i3.AsyncPipe, i6$1.TranslocoPipe], styles: ["ajf-fb-string-identifier-dialog h3,ajf-fb-string-identifier-dialog p{text-align:center}ajf-fb-string-identifier-dialog .ajf-string-identifier-select{display:block;min-width:200px;width:70%;margin:20px auto}ajf-fb-string-identifier-dialog mat-dialog-actions.mat-mdc-dialog-actions{display:flex;justify-content:space-evenly;align-items:center}ajf-fb-string-identifier-dialog mat-dialog-actions.mat-mdc-dialog-actions .mat-mdc-button-base{min-width:100px}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFbStringIdentifierDialogComponent, [{
        type: Component,
        args: [{ selector: 'ajf-fb-string-identifier-dialog', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<h3 matDialogTitle>{{'Default columns'|transloco}}</h3>\n<mat-dialog-content>\n  <p>{{'Select the fields that will be shown as columns in the form list page'|transloco}}</p>\n  <mat-form-field class=\"ajf-string-identifier-select\">\n    <mat-select multiple [(ngModel)]=\"selectedFieldNames\">\n      <mat-option>\n        <ngx-mat-select-search\n          [formControl]=\"searchFilterCtrl\"\n          [placeholderLabel]=\"'Search'|transloco\"\n          [noEntriesFoundLabel]=\"'Nothing found'|transloco\"\n          [enableClearOnEscapePressed]=\"true\">\n        </ngx-mat-select-search>\n      </mat-option>\n      <mat-option *ngFor=\"let field of filteredFields$ | async\" [value]=\"field.name\">\n        {{field.label || field.name}}\n      </mat-option>\n    </mat-select>\n  </mat-form-field>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-raised-button color=\"warn\" matDialogClose>\n    {{'Close'|transloco}}\n  </button>\n  <button mat-raised-button color=\"primary\" matDialogClose (click)=\"saveStringIdentifier()\">\n    {{'Save'|transloco}}\n  </button>\n</mat-dialog-actions>\n", styles: ["ajf-fb-string-identifier-dialog h3,ajf-fb-string-identifier-dialog p{text-align:center}ajf-fb-string-identifier-dialog .ajf-string-identifier-select{display:block;min-width:200px;width:70%;margin:20px auto}ajf-fb-string-identifier-dialog mat-dialog-actions.mat-mdc-dialog-actions{display:flex;justify-content:space-evenly;align-items:center}ajf-fb-string-identifier-dialog mat-dialog-actions.mat-mdc-dialog-actions .mat-mdc-button-base{min-width:100px}\n"] }]
    }], () => [{ type: AjfFormBuilderService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFbStringIdentifierDialogComponent, { className: "AjfFbStringIdentifierDialogComponent", filePath: "string-identifier-dialog.ts", lineNumber: 38 }); })();

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
const _c0$1 = a0 => ({ "ajf-title-row-error": a0 });
function AjfFbNodeEntry_ng_container_0_ng_template_1_ajf_fb_branch_line_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-fb-branch-line", 11);
} if (rf & 2) {
    const idx_r1 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("offset", idx_r1)("color", ctx_r1.branchColors[idx_r1]);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfFbNodeEntry_ng_container_0_ng_template_1_ajf_fb_branch_line_0_Template, 1, 2, "ajf-fb-branch-line", 10);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.realNodeEntry.children);
} }
function AjfFbNodeEntry_ng_container_0_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 12);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleProp("margin-left", ctx_r1.originLeftMargin)("border-color", ctx_r1.firstBranchColor);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_container_0_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_container_0_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "mat-card", 13);
    i0.ɵɵtemplate(2, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_container_0_ng_container_2_Template, 1, 0, "ng-container", 14)(3, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_container_0_ng_container_3_Template, 1, 0, "ng-container", 14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const cardTitle_r3 = i0.ɵɵreference(8);
    const cardContent_r4 = i0.ɵɵreference(10);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngTemplateOutlet", cardTitle_r3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngTemplateOutlet", cardContent_r4);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_1_ng_container_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_1_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 14);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    i0.ɵɵnextContext(2);
    const slidePanel_r5 = i0.ɵɵreference(4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngTemplateOutlet", slidePanel_r5);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-card", 15);
    i0.ɵɵtemplate(1, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_1_ng_container_1_Template, 2, 1, "ng-container", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const fieldPanel_r6 = i0.ɵɵreference(6);
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("cdkDragData", ctx_r1.realNodeEntry);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isSlide(ctx_r1.realNodeEntry.node))("ngIfElse", fieldPanel_r6);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_3_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_3_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-expansion-panel", 16);
    i0.ɵɵpipe(1, "async");
    i0.ɵɵlistener("opened", function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_3_Template_mat_expansion_panel_opened_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.updateExpandedStatus(true)); })("closed", function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_3_Template_mat_expansion_panel_closed_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.updateExpandedStatus(false)); });
    i0.ɵɵelementStart(2, "mat-expansion-panel-header");
    i0.ɵɵtemplate(3, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_3_ng_container_3_Template, 1, 0, "ng-container", 14);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_3_ng_container_4_Template, 1, 0, "ng-container", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const cardTitle_r3 = i0.ɵɵreference(8);
    const cardContent_r4 = i0.ɵɵreference(10);
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("expanded", i0.ɵɵpipeBind1(1, 3, ctx_r1.isExpanded()));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngTemplateOutlet", cardTitle_r3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngTemplateOutlet", cardContent_r4);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_5_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_5_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_5_ng_container_0_Template, 1, 0, "ng-container", 14)(1, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_5_ng_container_1_Template, 1, 0, "ng-container", 14);
} if (rf & 2) {
    i0.ɵɵnextContext();
    const cardTitle_r3 = i0.ɵɵreference(8);
    const cardContent_r4 = i0.ɵɵreference(10);
    i0.ɵɵproperty("ngTemplateOutlet", cardTitle_r3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngTemplateOutlet", cardContent_r4);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_7_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 24);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("innerHTML", "Condition: (" + ctx_r1.realNodeEntry.node.visibility.condition + ")", i0.ɵɵsanitizeHtml);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 17);
    i0.ɵɵelement(1, "ajf-node-icon", 18);
    i0.ɵɵtext(2, " \u00A0 ");
    i0.ɵɵelement(3, "span", 19);
    i0.ɵɵpipe(4, "transloco");
    i0.ɵɵtemplate(5, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_7_span_5_Template, 1, 1, "span", 20);
    i0.ɵɵelementStart(6, "span", 21)(7, "button", 22);
    i0.ɵɵpipe(8, "async");
    i0.ɵɵlistener("click", function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_7_Template_button_click_7_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.edit($event)); });
    i0.ɵɵelementStart(9, "mat-icon");
    i0.ɵɵtext(10, "edit");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "button", 23);
    i0.ɵɵlistener("click", function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_7_Template_button_click_11_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.delete($event)); });
    i0.ɵɵelementStart(12, "mat-icon");
    i0.ɵɵtext(13, "delete");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(9, _c0$1, ctx_r1.isInvalid(ctx_r1.realNodeEntry.node)));
    i0.ɵɵadvance();
    i0.ɵɵproperty("node", ctx_r1.realNodeEntry.node);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(4, 5, ctx_r1.realNodeEntry.node.label || ctx_r1.realNodeEntry.node.name), i0.ɵɵsanitizeHtml);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.realNodeEntry.node.visibility && (ctx_r1.realNodeEntry.node.visibility == null ? null : ctx_r1.realNodeEntry.node.visibility.condition) !== "true");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", i0.ɵɵpipeBind1(8, 7, ctx_r1.currentEditedNode) === ctx_r1.nodeEntry);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_9_div_0_ajf_fb_node_entry_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ajf-fb-node-entry", 28);
    i0.ɵɵlistener("cdkDropListDropped", function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_9_div_0_ajf_fb_node_entry_1_Template_ajf_fb_node_entry_cdkDropListDropped_0_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r1.onDrop($event, true)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const contentEntry_r10 = ctx.$implicit;
    const isFirstChild_r11 = ctx.first;
    const idx_r12 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext(5);
    i0.ɵɵproperty("id", ctx_r1.assignId())("level", ctx_r1.level + 1)("isFirst", isFirstChild_r11)("firstBranchColor", ctx_r1.branchColors[idx_r12])("nodeEntry", contentEntry_r10)("cdkDropListEnterPredicate", ctx_r1.disableSlideDrop);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_9_div_0_mat_card_2_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-card", 29);
    i0.ɵɵlistener("cdkDropListDropped", function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_9_div_0_mat_card_2_Template_mat_card_cdkDropListDropped_0_listener($event) { i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r1.onDrop($event, true)); });
    i0.ɵɵelementStart(1, "mat-card-title");
    i0.ɵɵtext(2, "Drop your fields here");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(5);
    i0.ɵɵproperty("id", ctx_r1.assignId(true))("cdkDropListEnterPredicate", ctx_r1.disableSlideDrop);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_9_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_9_div_0_ajf_fb_node_entry_1_Template, 1, 6, "ajf-fb-node-entry", 26)(2, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_9_div_0_mat_card_2_Template, 3, 2, "mat-card", 27);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.realNodeEntry.content);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.realNodeEntry.content.length === 0);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_9_div_0_Template, 3, 2, "div", 25);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngIf", ctx_r1.hasContent);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_container_0_Template, 4, 2, "ng-container", 6)(1, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_1_Template, 2, 3, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor)(3, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_3_Template, 5, 5, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor)(5, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_5_Template, 2, 2, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor)(7, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_7_Template, 14, 11, "ng-template", null, 4, i0.ɵɵtemplateRefExtractor)(9, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_9_Template, 1, 1, "ng-template", null, 5, i0.ɵɵtemplateRefExtractor);
} if (rf & 2) {
    const draggable_r14 = i0.ɵɵreference(2);
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngIf", !ctx_r1.isDraggable)("ngIfElse", draggable_r14);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_6_ng_container_0_ajf_fb_node_entry_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-fb-node-entry", 32);
} if (rf & 2) {
    const ctx_r14 = i0.ɵɵnextContext();
    const childNodeEntry_r16 = ctx_r14.$implicit;
    const idx_r17 = ctx_r14.index;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("level", ctx_r1.level)("originOffset", idx_r17)("firstBranchColor", ctx_r1.branchColors[idx_r17])("nodeEntry", childNodeEntry_r16);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_6_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFbNodeEntry_ng_container_0_ng_template_6_ng_container_0_ajf_fb_node_entry_1_Template, 1, 4, "ajf-fb-node-entry", 31);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.isLastNode());
} }
function AjfFbNodeEntry_ng_container_0_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfFbNodeEntry_ng_container_0_ng_template_6_ng_container_0_Template, 2, 1, "ng-container", 30);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.realNodeEntry.children);
} }
function AjfFbNodeEntry_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFbNodeEntry_ng_container_0_ng_template_1_Template, 1, 1, "ng-template", 7);
    i0.ɵɵelementStart(2, "div", 8);
    i0.ɵɵpipe(3, "async");
    i0.ɵɵtemplate(4, AjfFbNodeEntry_ng_container_0_div_4_Template, 1, 4, "div", 9)(5, AjfFbNodeEntry_ng_container_0_ng_template_5_Template, 11, 2, "ng-template", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, AjfFbNodeEntry_ng_container_0_ng_template_6_Template, 1, 1, "ng-template", 7);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isNodeEntry && !ctx_r1.isLastNode());
    i0.ɵɵadvance();
    i0.ɵɵclassProp("ajf-highlighted-formbuilder-node", i0.ɵɵpipeBind1(3, 6, ctx_r1.currentEditedNode) === ctx_r1.nodeEntry);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r1.isFirst);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isNodeEntry);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isNodeEntry);
} }
function AjfFbNodeEntry_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8)(1, "mat-card", 33);
    i0.ɵɵlistener("cdkDropListDropped", function AjfFbNodeEntry_ng_template_1_Template_mat_card_cdkDropListDropped_1_listener($event) { i0.ɵɵrestoreView(_r18); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onDrop($event)); });
    i0.ɵɵelementStart(2, "mat-card-title");
    i0.ɵɵtext(3, "Drop your slides here");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("cdkDropListEnterPredicate", ctx_r1.emptyAreaDropPredicate());
} }
const branchColors = [
    '#C62828', // RED
    '#4CAF50', // GREEN
    '#3F51B5', // INDIGO
    '#FFC107', // AMBER
    '#795548', // BROWN
];
class AjfFbNodeEntry {
    get hasContent() {
        return this._hasContent;
    }
    get isFirst() {
        return this._isFirst;
    }
    set isFirst(isFirst) {
        this._isFirst = isFirst;
    }
    get isNodeEntry() {
        return this._isNodeEntry;
    }
    get nodeEntry() {
        return this._nodeEntry;
    }
    set nodeEntry(nodeEntry) {
        this._nodeEntry = nodeEntry;
        if (nodeEntry != null && nodeEntry.node !== void 0) {
            const ne = nodeEntry;
            this._isNodeEntry = true;
            const node = ne.node;
            this._hasContent = node != null && isContainerNode(node);
        }
        else {
            this._isNodeEntry = false;
            this._hasContent = false;
        }
    }
    get level() {
        return this._level;
    }
    set level(value) {
        this._level = value;
    }
    get isDraggable() {
        return this._isDraggable;
    }
    set isDraggable(draggable) {
        this._isDraggable = draggable;
    }
    get realNodeEntry() {
        return this._nodeEntry;
    }
    get branchColors() {
        return this._branchColors;
    }
    get dropZones() {
        return this._dropZones;
    }
    get slideDropZones() {
        return this._slideDropZones;
    }
    get originOffset() {
        return this._originOffset;
    }
    set originOffset(originOffset) {
        this._originOffset = originOffset;
        this._originLeftMargin = `${this._originOffset * 4}px`;
    }
    get originLeftMargin() {
        return this._originLeftMargin;
    }
    get firstBranchColor() {
        return this._firstBranchColor;
    }
    set firstBranchColor(firstBranchColor) {
        const idx = branchColors.indexOf(firstBranchColor);
        if (idx > 0) {
            this._firstBranchColor = firstBranchColor;
            this._branchColors = branchColors.slice(idx).concat(branchColors.slice(0, idx));
        }
        else {
            this._firstBranchColor = branchColors[0];
            this._branchColors = branchColors.slice(0);
        }
    }
    get currentEditedNode() {
        return this._currentEditedNode;
    }
    constructor(_service) {
        this._service = _service;
        this._hasContent = false;
        this._isFirst = false;
        this._isNodeEntry = false;
        this._level = 0;
        this._isDraggable = true;
        this._branchColors = branchColors.slice(0);
        this._dropZones = ['fbdz-node'];
        this._slideDropZones = ['fbdz-slide'];
        this._originOffset = 0;
        this._originLeftMargin = '0';
        this._firstBranchColor = branchColors[0];
        this._branchLinesSubscription = Subscription.EMPTY;
        this._childEntriesSubscription = Subscription.EMPTY;
        this._currentEditedNode = this._service.editedNodeEntry;
    }
    onResize() { }
    edit(evt) {
        evt.stopPropagation();
        if (this.nodeEntry == null || !this.isNodeEntry) {
            return;
        }
        this._service.editNodeEntry(this.nodeEntry);
    }
    delete(evt) {
        evt.stopPropagation();
        if (this.nodeEntry == null || !this.isNodeEntry) {
            return;
        }
        this._service.cancelNodeEntryEdit();
        this._service.deleteNodeEntry(this.nodeEntry);
    }
    isInvalid(node) {
        return !this._service.isNodeValid(node.name);
    }
    isLastNode() {
        if (!this.realNodeEntry || !this.realNodeEntry.children) {
            return false;
        }
        return !this.realNodeEntry.children[0].children;
    }
    isSlide(node) {
        return isSlidesNode(node);
    }
    isExpanded() {
        if (this._nodeEntry && 'node' in this._nodeEntry) {
            return this._service.getExpandedStatus(this._nodeEntry.node.name);
        }
        return of(false);
    }
    ngAfterViewInit() {
        this.updateBranchHeights();
        this._childEntriesSubscription = this.childEntries.changes.subscribe(() => {
            this.updateBranchHeights();
        });
    }
    ngOnDestroy() {
        this._branchLinesSubscription.unsubscribe();
        this._childEntriesSubscription.unsubscribe();
    }
    /**
     * Triggers when a field or slide node is moved or inserted by drag&dropping in the formbuilder.
     * @param event The drop event.
     * @param content True if the current nodeEntry contains other nodeEntries.
     */
    onDrop(event, content = false) {
        if (this._nodeEntry == null) {
            return;
        }
        onDropProcess(event, this._service, this._nodeEntry, content);
    }
    /**
     * Assigns a progressive id to the dropList, to connect it to the FormBuilder source list.
     * @param empty True if the list is marked as empty.
     */
    assignId(empty = false) {
        return this._service.assignListId(this.realNodeEntry.node, empty);
    }
    disableSlideDrop(item) {
        return disableSlideDropPredicate(item);
    }
    disableFieldDrop(item) {
        return disableFieldDropPredicate(item);
    }
    emptyAreaDropPredicate() {
        return (item, _drop) => {
            if (this._level > 0) {
                return !item.data.isSlide;
            }
            return item.data.isSlide || false;
        };
    }
    updateBranchHeights(delay = 0) {
        setTimeout(() => {
            if (this.nodeEntry == null ||
                !this.isNodeEntry ||
                this.branchLines == null ||
                this.childEntries == null) {
                return;
            }
            const nodeEntry = this.nodeEntry;
            const branchLines = this.branchLines.toArray();
            const sliceIdx = nodeEntry.content != null ? nodeEntry.content.length : 0;
            const childEntries = this.childEntries.toArray().slice(sliceIdx);
            if (branchLines.length != childEntries.length) {
                return;
            }
            branchLines.forEach((bl, idx) => {
                const ce = childEntries[idx];
                bl.height = ce.nativeElement.offsetTop;
            });
        }, delay);
    }
    updateExpandedStatus(expanded) {
        if (this._nodeEntry && 'node' in this._nodeEntry) {
            this._service.updateExpandedStatus(this._nodeEntry.node.name, expanded);
            this.updateBranchHeights(400);
        }
    }
    static { this.ɵfac = function AjfFbNodeEntry_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFbNodeEntry)(i0.ɵɵdirectiveInject(AjfFormBuilderService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFbNodeEntry, selectors: [["ajf-fb-node-entry"]], viewQuery: function AjfFbNodeEntry_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(AjfFbBranchLine, 5);
            i0.ɵɵviewQuery(AjfFbNodeEntry, 5, ElementRef);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.branchLines = _t);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.childEntries = _t);
        } }, hostBindings: function AjfFbNodeEntry_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("window.resize", function AjfFbNodeEntry_window_resize_HostBindingHandler() { return ctx.onResize(); });
        } }, inputs: { isFirst: "isFirst", nodeEntry: "nodeEntry", level: "level", isDraggable: "isDraggable", originOffset: "originOffset", firstBranchColor: "firstBranchColor" }, decls: 3, vars: 2, consts: [["rootEmpty", ""], ["draggable", ""], ["slidePanel", ""], ["fieldPanel", ""], ["cardTitle", ""], ["cardContent", ""], [4, "ngIf", "ngIfElse"], [3, "ngIf"], [1, "mat-card-container"], ["class", "ajf-origin-line", 3, "margin-left", "border-color", 4, "ngIf"], [3, "offset", "color", 4, "ngFor", "ngForOf"], [3, "offset", "color"], [1, "ajf-origin-line"], ["appearance", "outlined"], [4, "ngTemplateOutlet"], ["appearance", "outlined", "cdkDrag", "", 1, "ajf-draggable-box", 3, "cdkDragData"], [1, "mat-elevation-z", 3, "opened", "closed", "expanded"], [1, "ajf-title-row", 3, "ngClass"], [3, "node"], [1, "ajf-title", 3, "innerHTML"], ["class", "ajf-visibility-condition", 3, "innerHTML", 4, "ngIf"], [1, "ajf-actions"], ["mat-icon-button", "", 3, "click", "disabled"], ["mat-icon-button", "", 3, "click"], [1, "ajf-visibility-condition", 3, "innerHTML"], [4, "ngIf"], ["cdkDropList", "", "class", "ajf-fields-list", 3, "id", "level", "isFirst", "firstBranchColor", "nodeEntry", "cdkDropListEnterPredicate", "cdkDropListDropped", 4, "ngFor", "ngForOf"], ["appearance", "outlined", "class", "ajf-empty", "cdkDropList", "", 3, "id", "cdkDropListEnterPredicate", "cdkDropListDropped", 4, "ngIf"], ["cdkDropList", "", 1, "ajf-fields-list", 3, "cdkDropListDropped", "id", "level", "isFirst", "firstBranchColor", "nodeEntry", "cdkDropListEnterPredicate"], ["appearance", "outlined", "cdkDropList", "", 1, "ajf-empty", 3, "cdkDropListDropped", "id", "cdkDropListEnterPredicate"], [4, "ngFor", "ngForOf"], [3, "level", "originOffset", "firstBranchColor", "nodeEntry", 4, "ngIf"], [3, "level", "originOffset", "firstBranchColor", "nodeEntry"], ["appearance", "outlined", "cdkDropList", "", 1, "ajf-empty", 3, "cdkDropListDropped", "cdkDropListEnterPredicate"]], template: function AjfFbNodeEntry_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfFbNodeEntry_ng_container_0_Template, 7, 8, "ng-container", 6)(1, AjfFbNodeEntry_ng_template_1_Template, 4, 1, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            const rootEmpty_r19 = i0.ɵɵreference(2);
            i0.ɵɵproperty("ngIf", ctx.nodeEntry)("ngIfElse", rootEmpty_r19);
        } }, dependencies: [i2$1.AjfNodeIcon, i3.NgClass, i3.NgForOf, i3.NgIf, i3.NgTemplateOutlet, i4$1.CdkDropList, i4$1.CdkDrag, i5.MatIconButton, i6$2.MatCard, i6$2.MatCardTitle, i5$1.MatIcon, i8$2.MatExpansionPanel, i8$2.MatExpansionPanelHeader, AjfFbBranchLine, AjfFbNodeEntry, i3.AsyncPipe, i6$1.TranslocoPipe], styles: ["ajf-fb-node-entry{display:block;position:relative}ajf-fb-node-entry .mat-card-container{position:relative}ajf-fb-node-entry .mat-card-container .ajf-origin-line{position:absolute;top:0;left:25px;width:25px;height:25px;border-bottom:2px solid;border-left:2px solid;border-bottom-left-radius:.5em}ajf-fb-node-entry .mat-card-container .mat-mdc-card{margin-left:50px;padding:.5em 1em}ajf-fb-node-entry .mat-card-container .mat-mdc-card .ajf-title-row{display:flex;flex:1 1 auto;flex-direction:row wrap;align-items:center}ajf-fb-node-entry .mat-card-container .mat-mdc-card .ajf-title-row>.ajf-title{flex:1 1 auto;max-width:25vw;margin-right:10px}ajf-fb-node-entry .mat-card-container .mat-mdc-card .ajf-title-row>.ajf-visibility-condition{flex:1 1 auto;font-size:10px;color:color-mix(in srgb,currentColor 60%,transparent);max-height:100px;max-width:25vw;overflow:hidden;text-overflow:ellipsis}ajf-fb-node-entry .mat-card-container .mat-mdc-card .ajf-title-row>.ajf-actions{flex:1 1 auto;display:flex;justify-content:flex-end;white-space:nowrap;justify-self:flex-end}ajf-fb-node-entry .mat-card-container .mat-mdc-card .ajf-title-row-error{color:rgb(var(--palette-warn-500, 198 40 40))}ajf-fb-node-entry .mat-card-container .mat-mdc-card.ajf-empty{line-height:36px;border:2px dashed;box-shadow:none;box-sizing:border-box;text-align:center;color:color-mix(in srgb,currentColor 40%,transparent)}ajf-fb-node-entry .mat-card-container .mat-mdc-card.ajf-draggable-box{padding:5px;border-bottom:solid 1px color-mix(in srgb,currentColor 12%,transparent);border-right:solid 1px color-mix(in srgb,currentColor 12%,transparent);box-sizing:border-box;cursor:move;font-size:14px}ajf-fb-node-entry .mat-card-container.ajf-highlighted-formbuilder-node>.mat-mdc-card{outline:2px solid currentColor;outline-offset:-1px}ajf-fb-node-entry.ajf-fields-list{max-width:80%;min-height:60px;display:block;background:color-mix(in srgb,currentColor 4%,transparent);border-radius:4px;overflow:hidden}ajf-fb-node-entry .cdk-drag-placeholder{opacity:.4;min-height:60px;margin-left:50px;border:1px solid color-mix(in srgb,currentColor 12%,transparent);border-radius:4px;background-color:color-mix(in srgb,currentColor 12%,transparent)}ajf-fb-node-entry .ajf-fields-list.cdk-drop-list-dragging .ajf-draggable-box:not(.cdk-drag-placeholder),ajf-fb-node-entry .cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFbNodeEntry, [{
        type: Component,
        args: [{ selector: 'ajf-fb-node-entry', host: { '(window.resize)': 'onResize()' }, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"nodeEntry; else rootEmpty\">\n  <ng-template [ngIf]=\"isNodeEntry && !isLastNode()\">\n    <ajf-fb-branch-line\n      *ngFor=\"let childNodeEntry of realNodeEntry.children; let idx = index\"\n      [offset]=\"idx\"\n      [color]=\"branchColors[idx]\"\n    ></ajf-fb-branch-line>\n  </ng-template>\n\n  <div\n    class=\"mat-card-container\"\n    [class.ajf-highlighted-formbuilder-node]=\"(currentEditedNode|async) === nodeEntry\"\n  >\n    <div\n      *ngIf=\"!isFirst\"\n      class=\"ajf-origin-line\"\n      [style.margin-left]=\"originLeftMargin\"\n      [style.border-color]=\"firstBranchColor\"\n    ></div>\n    <ng-template [ngIf]=\"isNodeEntry\">\n      <ng-container *ngIf=\"!isDraggable; else draggable\">\n        <mat-card appearance=\"outlined\">\n          <ng-container *ngTemplateOutlet=\"cardTitle\"></ng-container>\n          <ng-container *ngTemplateOutlet=\"cardContent\"></ng-container>\n        </mat-card>\n      </ng-container>\n\n      <ng-template #draggable>\n        <mat-card\n          appearance=\"outlined\"\n          cdkDrag\n          [cdkDragData]=\"realNodeEntry\"\n          class=\"ajf-draggable-box\"\n        >\n          <ng-container *ngIf=\"isSlide(realNodeEntry.node); else fieldPanel\">\n            <ng-container *ngTemplateOutlet=\"slidePanel\"></ng-container>\n          </ng-container>\n        </mat-card>\n      </ng-template>\n\n      <ng-template #slidePanel>\n        <mat-expansion-panel\n          [expanded]=\"isExpanded()|async\"\n          (opened)=\"updateExpandedStatus(true)\"\n          (closed)=\"updateExpandedStatus(false)\"\n          class=\"mat-elevation-z\"\n        >\n          <mat-expansion-panel-header>\n            <ng-container *ngTemplateOutlet=\"cardTitle\"></ng-container>\n          </mat-expansion-panel-header>\n          <ng-container *ngTemplateOutlet=\"cardContent\"></ng-container>\n        </mat-expansion-panel>\n      </ng-template>\n\n      <ng-template #fieldPanel>\n        <ng-container *ngTemplateOutlet=\"cardTitle\"></ng-container>\n        <ng-container *ngTemplateOutlet=\"cardContent\"></ng-container>\n      </ng-template>\n\n      <ng-template #cardTitle>\n        <div class=\"ajf-title-row\" [ngClass]=\"{ 'ajf-title-row-error': isInvalid(realNodeEntry.node) }\">\n          <ajf-node-icon [node]=\"realNodeEntry.node\"></ajf-node-icon>\n          &nbsp;\n          <span\n            class=\"ajf-title\"\n            [innerHTML]=\"(realNodeEntry.node.label || realNodeEntry.node.name)  | transloco\"\n          ></span>\n          <span\n            *ngIf=\"realNodeEntry.node.visibility && realNodeEntry.node.visibility?.condition !== 'true'\"\n            class=\"ajf-visibility-condition\"\n            [innerHTML]=\"'Condition: (' + realNodeEntry.node.visibility.condition + ')'\"\n          >\n          </span>\n          <span class=\"ajf-actions\">\n            <button\n              [disabled]=\"(currentEditedNode|async) === nodeEntry\"\n              (click)=\"edit($event)\"\n              mat-icon-button\n            >\n              <mat-icon>edit</mat-icon>\n            </button>\n            <button (click)=\"delete($event)\" mat-icon-button>\n              <mat-icon>delete</mat-icon>\n            </button>\n          </span>\n        </div>\n      </ng-template>\n\n      <ng-template #cardContent>\n        <div *ngIf=\"hasContent\">\n          <ajf-fb-node-entry\n            cdkDropList\n            class=\"ajf-fields-list\"\n            *ngFor=\"let contentEntry of realNodeEntry.content; let isFirstChild = first; let idx = index\"\n            [id]=\"assignId()\"\n            [level]=\"level + 1\"\n            [isFirst]=\"isFirstChild\"\n            [firstBranchColor]=\"branchColors[idx]\"\n            [nodeEntry]=\"contentEntry\"\n            [cdkDropListEnterPredicate]=\"disableSlideDrop\"\n            (cdkDropListDropped)=\"onDrop($event, true)\"\n          ></ajf-fb-node-entry>\n          <mat-card\n            appearance=\"outlined\"\n            class=\"ajf-empty\"\n            *ngIf=\"realNodeEntry.content.length === 0\"\n            cdkDropList\n            [id]=\"assignId(true)\"\n            [cdkDropListEnterPredicate]=\"disableSlideDrop\"\n            (cdkDropListDropped)=\"onDrop($event, true)\"\n            ><mat-card-title>Drop your fields here</mat-card-title></mat-card\n          >\n        </div>\n      </ng-template>\n    </ng-template>\n  </div>\n\n  <ng-template [ngIf]=\"isNodeEntry\">\n    <ng-container *ngFor=\"let childNodeEntry of realNodeEntry.children; let idx = index\">\n      <ajf-fb-node-entry\n        *ngIf=\"!isLastNode()\"\n        [level]=\"level\"\n        [originOffset]=\"idx\"\n        [firstBranchColor]=\"branchColors[idx]\"\n        [nodeEntry]=\"childNodeEntry\"\n      ></ajf-fb-node-entry>\n    </ng-container>\n  </ng-template>\n</ng-container>\n\n<ng-template #rootEmpty>\n  <div class=\"mat-card-container\">\n    <mat-card\n      appearance=\"outlined\"\n      class=\"ajf-empty\"\n      cdkDropList\n      [cdkDropListEnterPredicate]=\"emptyAreaDropPredicate()\"\n      (cdkDropListDropped)=\"onDrop($event)\"\n      ><mat-card-title>Drop your slides here</mat-card-title>\n    </mat-card>\n  </div>\n</ng-template>\n", styles: ["ajf-fb-node-entry{display:block;position:relative}ajf-fb-node-entry .mat-card-container{position:relative}ajf-fb-node-entry .mat-card-container .ajf-origin-line{position:absolute;top:0;left:25px;width:25px;height:25px;border-bottom:2px solid;border-left:2px solid;border-bottom-left-radius:.5em}ajf-fb-node-entry .mat-card-container .mat-mdc-card{margin-left:50px;padding:.5em 1em}ajf-fb-node-entry .mat-card-container .mat-mdc-card .ajf-title-row{display:flex;flex:1 1 auto;flex-direction:row wrap;align-items:center}ajf-fb-node-entry .mat-card-container .mat-mdc-card .ajf-title-row>.ajf-title{flex:1 1 auto;max-width:25vw;margin-right:10px}ajf-fb-node-entry .mat-card-container .mat-mdc-card .ajf-title-row>.ajf-visibility-condition{flex:1 1 auto;font-size:10px;color:color-mix(in srgb,currentColor 60%,transparent);max-height:100px;max-width:25vw;overflow:hidden;text-overflow:ellipsis}ajf-fb-node-entry .mat-card-container .mat-mdc-card .ajf-title-row>.ajf-actions{flex:1 1 auto;display:flex;justify-content:flex-end;white-space:nowrap;justify-self:flex-end}ajf-fb-node-entry .mat-card-container .mat-mdc-card .ajf-title-row-error{color:rgb(var(--palette-warn-500, 198 40 40))}ajf-fb-node-entry .mat-card-container .mat-mdc-card.ajf-empty{line-height:36px;border:2px dashed;box-shadow:none;box-sizing:border-box;text-align:center;color:color-mix(in srgb,currentColor 40%,transparent)}ajf-fb-node-entry .mat-card-container .mat-mdc-card.ajf-draggable-box{padding:5px;border-bottom:solid 1px color-mix(in srgb,currentColor 12%,transparent);border-right:solid 1px color-mix(in srgb,currentColor 12%,transparent);box-sizing:border-box;cursor:move;font-size:14px}ajf-fb-node-entry .mat-card-container.ajf-highlighted-formbuilder-node>.mat-mdc-card{outline:2px solid currentColor;outline-offset:-1px}ajf-fb-node-entry.ajf-fields-list{max-width:80%;min-height:60px;display:block;background:color-mix(in srgb,currentColor 4%,transparent);border-radius:4px;overflow:hidden}ajf-fb-node-entry .cdk-drag-placeholder{opacity:.4;min-height:60px;margin-left:50px;border:1px solid color-mix(in srgb,currentColor 12%,transparent);border-radius:4px;background-color:color-mix(in srgb,currentColor 12%,transparent)}ajf-fb-node-entry .ajf-fields-list.cdk-drop-list-dragging .ajf-draggable-box:not(.cdk-drag-placeholder),ajf-fb-node-entry .cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}\n"] }]
    }], () => [{ type: AjfFormBuilderService }], { branchLines: [{
            type: ViewChildren,
            args: [AjfFbBranchLine]
        }], childEntries: [{
            type: ViewChildren,
            args: [forwardRef(() => AjfFbNodeEntry), { read: ElementRef }]
        }], isFirst: [{
            type: Input
        }], nodeEntry: [{
            type: Input
        }], level: [{
            type: Input
        }], isDraggable: [{
            type: Input
        }], originOffset: [{
            type: Input
        }], firstBranchColor: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFbNodeEntry, { className: "AjfFbNodeEntry", filePath: "node-entry.ts", lineNumber: 68 }); })();

function AjfFbValidationConditionEditorDialog_ajf_condition_editor_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-condition-editor", 4);
} if (rf & 2) {
    const curFields_r1 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("fields", curFields_r1)("condition", ctx_r1.condition);
} }
class AjfFbValidationConditionEditorDialog {
    get fields() {
        return this._fields;
    }
    constructor(service, dialogRef) {
        this.dialogRef = dialogRef;
        this.condition = '';
        this.errorMessage = '';
        this._fields = service.flatFields.pipe(map((fields) => fields.sort((f1, f2) => f1.name.localeCompare(f2.name))));
    }
    saveCondition() {
        if (this.editor == null) {
            return;
        }
        const newValue = this.editor.formulaEditorControl.value;
        this.dialogRef.close({ condition: newValue, errorMessage: this.errorMessage });
    }
    closeDialog() {
        this.dialogRef.close(this.editor.formulaEditorControl.value);
    }
    static { this.ɵfac = function AjfFbValidationConditionEditorDialog_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFbValidationConditionEditorDialog)(i0.ɵɵdirectiveInject(AjfFormBuilderService), i0.ɵɵdirectiveInject(i2.MatDialogRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFbValidationConditionEditorDialog, selectors: [["ajf-fb-validation-condition-editor-dialog"]], viewQuery: function AjfFbValidationConditionEditorDialog_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(AjfFbConditionEditor, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.editor = _t.first);
        } }, decls: 16, vars: 16, consts: [["matDialogTitle", ""], ["matInput", "", 3, "ngModelChange", "ngModel", "placeholder"], [3, "fields", "condition", 4, "ngIf"], ["mat-button", "", 3, "click"], [3, "fields", "condition"]], template: function AjfFbValidationConditionEditorDialog_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "h3", 0);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "mat-dialog-content")(4, "mat-form-field")(5, "input", 1);
            i0.ɵɵpipe(6, "transloco");
            i0.ɵɵtwoWayListener("ngModelChange", function AjfFbValidationConditionEditorDialog_Template_input_ngModelChange_5_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.errorMessage, $event) || (ctx.errorMessage = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(7, AjfFbValidationConditionEditorDialog_ajf_condition_editor_7_Template, 1, 2, "ajf-condition-editor", 2);
            i0.ɵɵpipe(8, "async");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "mat-dialog-actions")(10, "button", 3);
            i0.ɵɵlistener("click", function AjfFbValidationConditionEditorDialog_Template_button_click_10_listener() { return ctx.saveCondition(); });
            i0.ɵɵtext(11);
            i0.ɵɵpipe(12, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "button", 3);
            i0.ɵɵlistener("click", function AjfFbValidationConditionEditorDialog_Template_button_click_13_listener() { return ctx.closeDialog(); });
            i0.ɵɵtext(14);
            i0.ɵɵpipe(15, "transloco");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 6, "Edit condition"));
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.errorMessage);
            i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(6, 8, "Error message"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(8, 10, ctx.fields));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 12, "Save"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 14, "Close"));
        } }, dependencies: [i3.NgIf, i3$1.DefaultValueAccessor, i3$1.NgControlStatus, i3$1.NgModel, i5.MatButton, i2.MatDialogTitle, i2.MatDialogActions, i2.MatDialogContent, i7.MatFormField, i6.MatInput, AjfFbConditionEditor, i3.AsyncPipe, i6$1.TranslocoPipe], styles: ["ajf-fb-validation-condition-editor-dialog .mat-mdc-dialog-content{overflow:visible}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFbValidationConditionEditorDialog, [{
        type: Component,
        args: [{ selector: 'ajf-fb-validation-condition-editor-dialog', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<h3 matDialogTitle>{{'Edit condition'|transloco}}</h3>\n<mat-dialog-content>\n  <mat-form-field>\n    <input\n      matInput\n      [(ngModel)]=\"errorMessage\"\n      [placeholder]=\"'Error message'|transloco\"\n    />\n  </mat-form-field>\n  <ajf-condition-editor\n    *ngIf=\"fields|async as curFields\"\n    [fields]=\"curFields!\"\n    [condition]=\"condition\"\n  ></ajf-condition-editor>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button (click)=\"saveCondition()\">{{'Save'|transloco}}</button>\n  <button mat-button (click)=\"closeDialog()\">{{'Close'|transloco}}</button>\n</mat-dialog-actions>\n", styles: ["ajf-fb-validation-condition-editor-dialog .mat-mdc-dialog-content{overflow:visible}\n"] }]
    }], () => [{ type: AjfFormBuilderService }, { type: i2.MatDialogRef }], { editor: [{
            type: ViewChild,
            args: [AjfFbConditionEditor, { static: false }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFbValidationConditionEditorDialog, { className: "AjfFbValidationConditionEditorDialog", filePath: "validation-condition-editor-dialog.ts", lineNumber: 39 }); })();

function AjfFbWarningConditionEditorDialog_ajf_condition_editor_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-condition-editor", 4);
} if (rf & 2) {
    const curFields_r1 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("fields", curFields_r1)("condition", ctx_r1.condition);
} }
class AjfFbWarningConditionEditorDialog {
    get fields() {
        return this._fields;
    }
    constructor(service, dialogRef) {
        this.dialogRef = dialogRef;
        this.condition = '';
        this.warningMessage = '';
        this._fields = service.flatFields.pipe(map((fields) => fields.sort((f1, f2) => f1.name.localeCompare(f2.name))));
    }
    saveCondition() {
        if (this.editor == null) {
            return;
        }
        const newValue = this.editor.formulaEditorControl.value;
        this.dialogRef.close({ condition: newValue, warningMessage: this.warningMessage });
    }
    closeDialog() {
        this.dialogRef.close(this.editor.formulaEditorControl.value);
    }
    static { this.ɵfac = function AjfFbWarningConditionEditorDialog_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFbWarningConditionEditorDialog)(i0.ɵɵdirectiveInject(AjfFormBuilderService), i0.ɵɵdirectiveInject(i2.MatDialogRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFbWarningConditionEditorDialog, selectors: [["ajf-fb-warning-condition-editor-dialog"]], viewQuery: function AjfFbWarningConditionEditorDialog_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(AjfFbConditionEditor, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.editor = _t.first);
        } }, decls: 16, vars: 16, consts: [["matDialogTitle", ""], ["matInput", "", 3, "ngModelChange", "ngModel", "placeholder"], [3, "fields", "condition", 4, "ngIf"], ["mat-button", "", 3, "click"], [3, "fields", "condition"]], template: function AjfFbWarningConditionEditorDialog_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "h3", 0);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "mat-dialog-content")(4, "mat-form-field")(5, "input", 1);
            i0.ɵɵpipe(6, "transloco");
            i0.ɵɵtwoWayListener("ngModelChange", function AjfFbWarningConditionEditorDialog_Template_input_ngModelChange_5_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.warningMessage, $event) || (ctx.warningMessage = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(7, AjfFbWarningConditionEditorDialog_ajf_condition_editor_7_Template, 1, 2, "ajf-condition-editor", 2);
            i0.ɵɵpipe(8, "async");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "mat-dialog-actions")(10, "button", 3);
            i0.ɵɵlistener("click", function AjfFbWarningConditionEditorDialog_Template_button_click_10_listener() { return ctx.saveCondition(); });
            i0.ɵɵtext(11);
            i0.ɵɵpipe(12, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "button", 3);
            i0.ɵɵlistener("click", function AjfFbWarningConditionEditorDialog_Template_button_click_13_listener() { return ctx.closeDialog(); });
            i0.ɵɵtext(14);
            i0.ɵɵpipe(15, "transloco");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 6, "Edit condition"));
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.warningMessage);
            i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(6, 8, "Warning message"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(8, 10, ctx.fields));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 12, "Save"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 14, "Close"));
        } }, dependencies: [i3.NgIf, i3$1.DefaultValueAccessor, i3$1.NgControlStatus, i3$1.NgModel, i5.MatButton, i2.MatDialogTitle, i2.MatDialogActions, i2.MatDialogContent, i7.MatFormField, i6.MatInput, AjfFbConditionEditor, i3.AsyncPipe, i6$1.TranslocoPipe], styles: ["ajf-fb-warning-condition-editor-dialog .mat-mdc-dialog-content{overflow:visible}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFbWarningConditionEditorDialog, [{
        type: Component,
        args: [{ selector: 'ajf-fb-warning-condition-editor-dialog', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<h3 matDialogTitle>{{'Edit condition'|transloco}}</h3>\n<mat-dialog-content>\n  <mat-form-field>\n    <input\n      matInput\n      [(ngModel)]=\"warningMessage\"\n      [placeholder]=\"'Warning message' | transloco\"\n    />\n  </mat-form-field>\n  <ajf-condition-editor\n    *ngIf=\"fields|async as curFields\"\n    [fields]=\"curFields!\"\n    [condition]=\"condition\"\n  ></ajf-condition-editor>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button (click)=\"saveCondition()\">{{'Save'|transloco}}</button>\n  <button mat-button (click)=\"closeDialog()\">{{'Close'|transloco}}</button>\n</mat-dialog-actions>\n", styles: ["ajf-fb-warning-condition-editor-dialog .mat-mdc-dialog-content{overflow:visible}\n"] }]
    }], () => [{ type: AjfFormBuilderService }, { type: i2.MatDialogRef }], { editor: [{
            type: ViewChild,
            args: [AjfFbConditionEditor, { static: false }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFbWarningConditionEditorDialog, { className: "AjfFbWarningConditionEditorDialog", filePath: "warning-condition-editor-dialog.ts", lineNumber: 39 }); })();

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
 * Custom validator service that checks for an already existing
 * Node with the given name.
 */
class AjfNodePropertiesNameMatchValidator {
    constructor(_fbs) {
        this._fbs = _fbs;
    }
    /**
     * Custom async validator method.
     * Checks if a Node with the same Name exists, in order to
     * validate the Node Entry properties form.
     * @param cdr The editor changeDetectionRef
     * @param currentId The current node entry id
     */
    sameValueCheck(cdr, currentId) {
        return (control) => {
            const flatNodes$ = this._fbs.flatNodes ?? of([]);
            return flatNodes$.pipe(map(nodes => {
                const sameNameNode = nodes.find(n => n.name.toLowerCase() === control.value.toLowerCase() && n.id !== currentId);
                return sameNameNode ? { name_exists: true } : null;
            }), take(1), finalize(() => {
                control.markAsTouched();
                cdr.detectChanges();
            }));
        };
    }
    static { this.ɵfac = function AjfNodePropertiesNameMatchValidator_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfNodePropertiesNameMatchValidator)(i0.ɵɵinject(AjfFormBuilderService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AjfNodePropertiesNameMatchValidator, factory: AjfNodePropertiesNameMatchValidator.ɵfac }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfNodePropertiesNameMatchValidator, [{
        type: Injectable
    }], () => [{ type: AjfFormBuilderService }], null); })();

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
class AjfFbNodeProperties {
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
    static { this.ɵfac = function AjfFbNodeProperties_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFbNodeProperties)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(AjfFormBuilderService), i0.ɵɵdirectiveInject(i2.MatDialog), i0.ɵɵdirectiveInject(i3$1.UntypedFormBuilder), i0.ɵɵdirectiveInject(AjfNodePropertiesNameMatchValidator)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFbNodeProperties, selectors: [["ajf-fb-node-properties"]], decls: 4, vars: 7, consts: [["forceExpanded", ""], ["forceNarrow", ""], [1, "ajf-disabled-overlay"], [4, "ngIf"], [1, "ajf-header"], ["mat-icon-button", "", 3, "click", "disabled"], ["mat-icon-button", "", 3, "click"], ["novalidate", "", 3, "formGroup"], [1, "ajf-prop"], ["matInput", "", "formControlName", "name", 3, "placeholder"], ["matInput", "", "formControlName", "label", 3, "placeholder"], [3, "ngIf"], ["formControlName", "visibilityOpt", 3, "placeholder"], ["value", "always"], ["value", "never"], ["value", "condition"], ["mat-raised-button", "", 3, "click", "disabled", "matTooltip"], [1, "ajf-icon-cont"], ["discrete", "", "min", "1", "max", "5", "step", "1"], ["matSliderThumb", "", "formControlName", "conditionalBranchesNum"], [4, "ngFor", "ngForOf"], ["matInput", "", "formControlName", "HTML", 3, "placeholder"], ["mat-raised-button", "", 3, "click", "matTooltip"], ["formControlName", "minReps", "matSliderThumb", ""], ["formControlName", "maxReps", "matSliderThumb", ""], ["formControlName", "readonlyField"], ["formControlName", "size", 3, "placeholder"], [3, "value", 4, "ngFor", "ngForOf"], ["matInput", "", "formControlName", "hint", 3, "placeholder"], ["matInput", "", "formControlName", "description", 3, "placeholder"], ["matInput", "", "formControlName", "defaultValue", 3, "placeholder"], ["formControlName", "notEmpty"], [1, "ajf-pointer", 3, "click"], ["class", "ajf-validation-row ajf-emph", 4, "ngIf"], ["class", "ajf-validation-row", 4, "ngFor", "ngForOf"], ["formControlName", "notEmptyWarning"], [3, "value"], ["matInput", "", "formControlName", "minValue", 3, "placeholder"], ["matInput", "", "formControlName", "maxValue", 3, "placeholder"], ["matInput", "", "formControlName", "minDigits", 3, "placeholder"], ["matInput", "", "formControlName", "maxDigits", 3, "placeholder"], ["matInput", "", "type", "number", "formControlName", "start", 3, "placeholder"], ["matInput", "", "type", "number", "formControlName", "end", 3, "placeholder"], ["matInput", "", "type", "number", "formControlName", "step", 3, "placeholder"], ["formControlName", "appearance", 3, "placeholder"], ["value", "rating"], [1, "ajf-validation-row", "ajf-emph"], [1, "ajf-validation-row"], ["formControlName", "choicesOriginRef", 3, "placeholder"], ["formControlName", "forceExpanded", 3, "change"], ["formControlName", "forceNarrow", 3, "change"], [1, "pointer", 3, "click"], ["formControlName", "hideEmptyRows"], ["matInput", "", "formControlName", "tableDef", 3, "placeholder"]], template: function AjfFbNodeProperties_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "div", 2);
            i0.ɵɵpipe(1, "async");
            i0.ɵɵtemplate(2, AjfFbNodeProperties_ng_container_2_Template, 3, 3, "ng-container", 3);
            i0.ɵɵpipe(3, "async");
        } if (rf & 2) {
            i0.ɵɵstyleProp("display", i0.ɵɵpipeBind1(1, 3, ctx.enabled) ? "none" : "block");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(3, 5, ctx.nodeEntry));
        } }, dependencies: [i3.NgForOf, i3.NgIf, i3$1.ɵNgNoValidate, i3$1.DefaultValueAccessor, i3$1.NumberValueAccessor, i3$1.NgControlStatus, i3$1.NgControlStatusGroup, i4.MatOption, i5.MatButton, i5.MatIconButton, i8$3.MatCheckbox, i7.MatFormField, i7.MatLabel, i7.MatError, i5$1.MatIcon, i6.MatInput, i8$1.MatSelect, i13.MatSlider, i13.MatSliderThumb, i8.MatTooltip, i3$1.FormGroupDirective, i3$1.FormControlName, i3.AsyncPipe, i6$1.TranslocoPipe], styles: ["ajf-fb-node-properties{display:block;padding:2px 2px 2px 5px;position:relative}ajf-fb-node-properties mat-icon{cursor:pointer}ajf-fb-node-properties .ajf-header{display:flex;flex-direction:row;align-items:center;flex-wrap:nowrap}ajf-fb-node-properties .ajf-header>h3,ajf-fb-node-properties .ajf-header>label{flex:1 0 auto;margin-right:.5em}ajf-fb-node-properties .ajf-header>mat-icon{flex:0 0 auto;margin-left:.5em}ajf-fb-node-properties .ajf-disabled-overlay{position:absolute;inset:0;opacity:.4;background-color:currentColor}ajf-fb-node-properties .ajf-emph{font-style:italic}ajf-fb-node-properties [mat-raised-button]{margin:.5em 0}ajf-fb-node-properties [mat-raised-button].ajf-pointer{cursor:pointer}ajf-fb-node-properties [mat-raised-button] .ajf-icon-cont{display:flex;flex-direction:row;align-items:center;position:relative}ajf-fb-node-properties [mat-raised-button] .ajf-icon-cont span{flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;display:block;margin:auto;position:relative;max-height:30px;max-width:100%}ajf-fb-node-properties .ajf-validation-row{margin:.5em 0;display:flex;flex-direction:row;align-items:center}ajf-fb-node-properties .ajf-validation-row button{flex:1 1 auto}ajf-fb-node-properties .ajf-validation-row mat-icon{flex:0 0 auto}ajf-fb-node-properties .ajf-prop{margin:.5em 0}ajf-fb-node-properties .ajf-prop .mdc-button__label{max-width:100%}ajf-fb-node-properties mat-form-field,ajf-fb-node-properties mat-slider,ajf-fb-node-properties [mat-raised-button]{width:100%}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFbNodeProperties, [{
        type: Component,
        args: [{ selector: 'ajf-fb-node-properties', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [style.display]=\"(enabled|async) ? 'none' : 'block'\" class=\"ajf-disabled-overlay\"></div>\n<ng-container *ngIf=\"nodeEntry|async as ne\">\n  <ng-container *ngIf=\"propertiesForm|async as pf\">\n    <div class=\"ajf-header\">\n      <h3>{{'Properties'|transloco}}</h3>\n      <button\n        mat-icon-button\n        [disabled]=\"pf.status !== 'VALID'\"\n        (click)=\"save()\"\n      >\n        <mat-icon>save</mat-icon>\n      </button>\n      <button mat-icon-button (click)=\"cancel()\">\n        <mat-icon>cancel</mat-icon>\n      </button>  \n    </div>\n    <mat-error *ngIf=\"pf?.invalid\">\n      {{allErrorMessages(pf)}}\n    </mat-error>\n    <form [formGroup]=\"pf!\" novalidate>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <input matInput formControlName=\"name\" [placeholder]=\"'Name' | transloco\" />\n          <mat-error *ngIf=\"pf.get('name')?.invalid\">\n            {{fieldErrorMessage(pf.get('name'), 'Name')}}\n          </mat-error>\n        </mat-form-field>\n      </div>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <input matInput formControlName=\"label\" [placeholder]=\"'Label' | transloco\" />\n          <mat-error *ngIf=\"pf.get('label')?.invalid\">\n            {{fieldErrorMessage(pf.get('label'), 'Label')}}\n          </mat-error>\n        </mat-form-field>\n      </div>\n      <ng-template [ngIf]=\"isEmptyField(ne!.node)\">\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <input matInput formControlName=\"HTML\" [placeholder]=\"'HTML' | transloco\" />\n          </mat-form-field>\n        </div>\n      </ng-template>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <mat-label>{{'Visibility'|transloco}}</mat-label>\n          <mat-select formControlName=\"visibilityOpt\" [placeholder]=\"'Visible' | transloco\">\n            <mat-option value=\"always\">{{'Always'|transloco}}</mat-option>\n            <mat-option value=\"never\">{{'Never'|transloco}}</mat-option>\n            <mat-option value=\"condition\">{{'Condition...'|transloco}}</mat-option>\n          </mat-select>\n        </mat-form-field>\n        <button\n          (click)=\"editVisibility()\"\n          [disabled]=\"pf!.value.visibilityOpt !== 'condition'\"\n          mat-raised-button\n          [matTooltip]=\"curVisibility || ''\"\n        >\n          <div class=\"ajf-icon-cont\">\n            <mat-icon>edit</mat-icon>\n            <span><code>{{ curVisibility }}</code></span>\n          </div>\n        </button>\n      </div>\n      <div class=\"ajf-prop\">\n        <div><label>{{'Branches'|transloco}}</label></div>\n        <div>\n          <mat-slider discrete min=\"1\" max=\"5\" step=\"1\"\n            ><input matSliderThumb formControlName=\"conditionalBranchesNum\"\n          /></mat-slider>\n        </div>\n        <div *ngFor=\"let branch of conditionalBranches; let idx = index\">\n          <button (click)=\"editConditionalBranch(idx)\" mat-raised-button [matTooltip]=\"branch\">\n            <div class=\"ajf-icon-cont\">\n              <mat-icon>edit</mat-icon>\n              <span><code>{{ branch }}</code></span>\n            </div>\n          </button>\n        </div>\n      </div>\n      <ng-template [ngIf]=\"isRepeatingContainerNode(ne)\">\n        <div class=\"ajf-prop\">\n          <div><label>{{'Min repetitions'|transloco}}</label></div>\n          <div>\n            <mat-slider discrete min=\"1\" max=\"5\" step=\"1\"\n              ><input  formControlName=\"minReps\" matSliderThumb\n            /></mat-slider>\n          </div>\n          <div><label>{{'Max repetitions'|transloco}}</label></div>\n          <div>\n            <mat-slider discrete min=\"1\" max=\"5\" step=\"1\"\n              ><input formControlName=\"maxReps\" matSliderThumb\n            /></mat-slider>\n          </div>\n        </div>\n      </ng-template>\n      <ng-template [ngIf]=\"isField(ne)\">\n        <div class=\"ajf-prop\">\n          <mat-checkbox formControlName=\"readonlyField\">{{'Readonly'|transloco}}</mat-checkbox>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <mat-label>{{'Field size'|transloco}}</mat-label>\n            <mat-select formControlName=\"size\" [placeholder]=\"'Size' | transloco\">\n              <mat-option *ngFor=\"let fieldSize of fieldSizes\" [value]=\"fieldSize.value\">\n                {{ fieldSize.label|transloco }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <input matInput formControlName=\"hint\" [placeholder]=\"'Hint' | transloco\" />\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <textarea\n              matInput\n              formControlName=\"description\"\n              [placeholder]=\"'Description' | transloco\"\n            ></textarea>\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <input\n              matInput\n              formControlName=\"defaultValue\"\n              [placeholder]=\"'Default value' | transloco\"\n            />\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <div><label>{{'Formula'|transloco}}</label></div>\n          <div>\n            <button (click)=\"editFormula()\" mat-raised-button [matTooltip]=\"curFormula || ''\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span><code>{{ curFormula }}</code></span>\n              </div>\n            </button>\n          </div>\n        </div>\n        <!-- <div class=\"ajf-prop\">\n          <div><label>{{'Force value'|translco}}</label></div>\n          <div>\n            <button (click)=\"editForceValue()\" mat-raised-button [matTooltip]=\"curForceValue\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ curForceValue }}</span>\n              </div>\n            </button>\n          </div>\n        </div> -->\n        <div class=\"ajf-prop\">\n          <mat-checkbox formControlName=\"notEmpty\">{{'Not empty'|transloco}}</mat-checkbox>\n        </div>\n        <ng-template [ngIf]=\"isNumericField(ne!.node)\">\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input matInput formControlName=\"minValue\" [placeholder]=\"'Min value' | transloco\" />\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input matInput formControlName=\"maxValue\" [placeholder]=\"'Max value' | transloco\" />\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input\n                matInput\n                formControlName=\"minDigits\"\n                [placeholder]=\"'Min digits' | transloco\"\n              />\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input\n                matInput\n                formControlName=\"maxDigits\"\n                [placeholder]=\"'Max digits' | transloco\"\n              />\n            </mat-form-field>\n          </div>\n        </ng-template>\n        <ng-template [ngIf]=\"isRangeField(ne!.node)\">\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input\n                matInput\n                type=\"number\"\n                formControlName=\"start\"\n                [placeholder]=\"'Start' | transloco\"\n              />\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input\n                matInput\n                type=\"number\"\n                formControlName=\"end\"\n                [placeholder]=\"'End' | transloco\"\n              />\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input\n                matInput\n                type=\"number\"\n                formControlName=\"step\"\n                [placeholder]=\"'Step' | transloco\"\n              />\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <mat-select formControlName=\"appearance\" [placeholder]=\"'Appearance' | transloco\">\n                <mat-option [value]=\"null\">{{'Default'|transloco}}</mat-option>\n                <mat-option value=\"rating\">{{'Rating'|transloco}}</mat-option>\n              </mat-select>\n            </mat-form-field>\n          </div>\n        </ng-template>\n        <div class=\"ajf-prop\">\n          <div class=\"ajf-header\">\n            <label>{{ 'Validation' | transloco }}</label>\n            <mat-icon class=\"ajf-pointer\" (click)=\"addValidationCondition()\"\n              >add_circle_outline</mat-icon\n            >\n          </div>\n          <div *ngIf=\"validationConditions.length === 0\" class=\"ajf-validation-row ajf-emph\">\n            {{'No conditions'|transloco}}\n          </div>\n          <div\n            class=\"ajf-validation-row\"\n            *ngFor=\"let validationCondition of validationConditions; let idx = index\"\n          >\n            <button\n              (click)=\"editValidationCondition(idx)\"\n              mat-raised-button\n              [matTooltip]=\"validationCondition.condition\"\n            >\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span><code>{{ validationCondition.condition }}</code></span>\n              </div>\n            </button>\n            <mat-icon class=\"ajf-pointer\" (click)=\"removeValidationCondition(idx)\"\n              >remove_circle_outline</mat-icon\n            >\n          </div>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-checkbox formControlName=\"notEmptyWarning\"\n            >{{'Not empty warning'|transloco}}</mat-checkbox\n          >\n        </div>\n        <div class=\"ajf-prop\">\n          <div class=\"ajf-header\">\n            <label>{{'Warnings'|transloco}}</label>\n            <mat-icon class=\"ajf-pointer\" (click)=\"addWarningCondition()\"\n              >add_circle_outline</mat-icon\n            >\n          </div>\n          <div *ngIf=\"warningConditions.length === 0\" class=\"ajf-validation-row ajf-emph\">\n            {{'No warnings'|transloco}}\n          </div>\n          <div\n            class=\"ajf-validation-row\"\n            *ngFor=\"let warningCondition of warningConditions; let idx = index\"\n          >\n            <button\n              (click)=\"editWarningCondition(idx)\"\n              mat-raised-button\n              [matTooltip]=\"warningCondition.condition\"\n            >\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span><code>{{ warningCondition.condition }}</code></span>\n              </div>\n            </button>\n            <mat-icon class=\"ajf-pointer\" (click)=\"removeWarningCondition(idx)\"\n              >remove_circle_outline</mat-icon\n            >\n          </div>\n        </div>\n        <div class=\"ajf-prop\">\n          <div><label>{{'Go to next slide condition'|transloco}}</label></div>\n          <div>\n            <button\n              (click)=\"editNextSlideCondition()\"\n              mat-raised-button\n              [matTooltip]=\"nextSlideCondition || ''\"\n            >\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span><code>{{ nextSlideCondition }}</code></span>\n              </div>\n            </button>\n          </div>\n        </div>\n        <ng-template [ngIf]=\"isFieldWithChoices(ne!.node)\">\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <mat-label>{{'Choices origins'|transloco}}</mat-label>\n              <mat-select formControlName=\"choicesOriginRef\" [placeholder]=\"'Choices' | transloco\">\n                <mat-option\n                  *ngFor=\"let choicesOrigin of choicesOrigins\"\n                  [value]=\"choicesOrigin.name\"\n                >\n                  {{ (choicesOrigin.label || choicesOrigin.name)|transloco }}\n                </mat-option>\n              </mat-select>\n              <mat-error *ngIf=\"pf.get('choicesOriginRef')?.invalid\">\n                {{fieldErrorMessage(pf.get('choicesOriginRef'), 'choicesOriginRef')}}\n              </mat-error>\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <div><label>{{'Choices filter'|transloco}}</label></div>\n            <div>\n              <button\n                (click)=\"editChoicesFilter()\"\n                mat-raised-button\n                [matTooltip]=\"curChoicesFilter || ''\"\n              >\n                <div class=\"ajf-icon-cont\">\n                  <mat-icon>edit</mat-icon>\n                  <span><code>{{ curChoicesFilter }}</code></span>\n                </div>\n              </button>\n            </div>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-checkbox\n              formControlName=\"forceExpanded\"\n              #forceExpanded\n              (change)=\"forceCheckbox($event.checked, forceNarrow)\"\n              >{{'Force expanded selection'|transloco}}</mat-checkbox\n            >\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-checkbox\n              formControlName=\"forceNarrow\"\n              #forceNarrow\n              (change)=\"forceCheckbox($event.checked, forceExpanded)\"\n              >{{'Force narrow selection'|transloco}}</mat-checkbox\n            >\n          </div>\n          <div class=\"ajf-prop\">\n            <div class=\"ajf-header\">\n              <label>{{'Trigger selection'|transloco}}</label>\n              <mat-icon class=\"ajf-pointer\" (click)=\"addTriggerCondition()\"\n                >add_circle_outline</mat-icon\n              >\n            </div>\n            <div\n              *ngIf=\"!triggerConditions || triggerConditions.length === 0\"\n              class=\"ajf-validation-row ajf-emph\"\n            >\n              {{'No trigger condition'|transloco}}\n            </div>\n            <div\n              class=\"ajf-validation-row\"\n              *ngFor=\"let triggerCondition of triggerConditions; let idx = index\"\n            >\n              <button\n                (click)=\"editTriggerCondition(idx)\"\n                mat-raised-button\n                [matTooltip]=\"triggerCondition\"\n              >\n                <div class=\"ajf-icon-cont\">\n                  <mat-icon>edit</mat-icon>\n                  <span><code>{{ triggerCondition }}</code></span>\n                </div>\n              </button>\n              <mat-icon class=\"pointer\" (click)=\"removeTriggerCondition(idx)\"\n                >remove_circle_outline</mat-icon\n              >\n            </div>\n          </div>\n        </ng-template>\n        <ng-container *ngIf=\"isTableField(ne!.node)\">\n          <div class=\"ajf-prop\">\n            <mat-checkbox formControlName=\"hideEmptyRows\"\n              >{{'Hide empty rows'|transloco}}</mat-checkbox\n            >\n            <mat-form-field>\n              <textarea\n                matInput\n                formControlName=\"tableDef\"\n                [placeholder]=\"'Table definition' | transloco\"\n              ></textarea>\n              <mat-error *ngIf=\"pf.get('tableDef')?.invalid\">\n                {{fieldErrorMessage(pf.get('tableDef'), 'tableDef')}}\n              </mat-error>\n            </mat-form-field>\n          </div>\n        </ng-container>\n      </ng-template>\n    </form>\n  </ng-container>\n</ng-container>\n", styles: ["ajf-fb-node-properties{display:block;padding:2px 2px 2px 5px;position:relative}ajf-fb-node-properties mat-icon{cursor:pointer}ajf-fb-node-properties .ajf-header{display:flex;flex-direction:row;align-items:center;flex-wrap:nowrap}ajf-fb-node-properties .ajf-header>h3,ajf-fb-node-properties .ajf-header>label{flex:1 0 auto;margin-right:.5em}ajf-fb-node-properties .ajf-header>mat-icon{flex:0 0 auto;margin-left:.5em}ajf-fb-node-properties .ajf-disabled-overlay{position:absolute;inset:0;opacity:.4;background-color:currentColor}ajf-fb-node-properties .ajf-emph{font-style:italic}ajf-fb-node-properties [mat-raised-button]{margin:.5em 0}ajf-fb-node-properties [mat-raised-button].ajf-pointer{cursor:pointer}ajf-fb-node-properties [mat-raised-button] .ajf-icon-cont{display:flex;flex-direction:row;align-items:center;position:relative}ajf-fb-node-properties [mat-raised-button] .ajf-icon-cont span{flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;display:block;margin:auto;position:relative;max-height:30px;max-width:100%}ajf-fb-node-properties .ajf-validation-row{margin:.5em 0;display:flex;flex-direction:row;align-items:center}ajf-fb-node-properties .ajf-validation-row button{flex:1 1 auto}ajf-fb-node-properties .ajf-validation-row mat-icon{flex:0 0 auto}ajf-fb-node-properties .ajf-prop{margin:.5em 0}ajf-fb-node-properties .ajf-prop .mdc-button__label{max-width:100%}ajf-fb-node-properties mat-form-field,ajf-fb-node-properties mat-slider,ajf-fb-node-properties [mat-raised-button]{width:100%}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: AjfFormBuilderService }, { type: i2.MatDialog }, { type: i3$1.UntypedFormBuilder }, { type: AjfNodePropertiesNameMatchValidator }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFbNodeProperties, { className: "AjfFbNodeProperties", filePath: "node-properties.ts", lineNumber: 147 }); })();

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
function AjfFbNodeTypeEntry_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "ajf-node-icon", 1);
    i0.ɵɵelementStart(2, "span", 2);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("node", ctx_r0.node);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.nodeType.label);
} }
class AjfFbNodeTypeEntry {
    get nodeType() {
        return this._nodeType;
    }
    set nodeType(nodeType) {
        this._nodeType = nodeType;
        this._cdr.markForCheck();
    }
    get node() {
        return { nodeType: this.nodeType?.nodeType.node, fieldType: this.nodeType?.nodeType.field };
    }
    constructor(_cdr) {
        this._cdr = _cdr;
    }
    static { this.ɵfac = function AjfFbNodeTypeEntry_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFbNodeTypeEntry)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFbNodeTypeEntry, selectors: [["ajf-fb-node-type-entry"]], inputs: { nodeType: "nodeType" }, decls: 1, vars: 1, consts: [[4, "ngIf"], [3, "node"], [1, "ajf-node-type-label"]], template: function AjfFbNodeTypeEntry_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfFbNodeTypeEntry_ng_container_0_Template, 4, 2, "ng-container", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.nodeType);
        } }, dependencies: [i2$1.AjfNodeIcon, i3.NgIf], styles: ["ajf-fb-node-type-entry{display:flex;align-items:center;gap:11px;padding:7px 8px;margin-bottom:2px;border-radius:8px;font-size:13.5px;cursor:pointer}ajf-fb-node-type-entry ajf-node-icon{display:inline-flex;align-items:center;justify-content:center;flex:none;width:30px;height:30px;border-radius:7px;background:color-mix(in srgb,currentColor 12%,transparent)}ajf-fb-node-type-entry .ajf-node-type-label{min-width:0;line-height:1.25}ajf-fb-node-type-entry mat-icon{vertical-align:middle;font-size:18px;width:18px;height:18px}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFbNodeTypeEntry, [{
        type: Component,
        args: [{ selector: 'ajf-fb-node-type-entry', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"nodeType\">\n  <ajf-node-icon [node]=\"node\"></ajf-node-icon><span class=\"ajf-node-type-label\">{{nodeType.label}}</span>\n</ng-container>\n", styles: ["ajf-fb-node-type-entry{display:flex;align-items:center;gap:11px;padding:7px 8px;margin-bottom:2px;border-radius:8px;font-size:13.5px;cursor:pointer}ajf-fb-node-type-entry ajf-node-icon{display:inline-flex;align-items:center;justify-content:center;flex:none;width:30px;height:30px;border-radius:7px;background:color-mix(in srgb,currentColor 12%,transparent)}ajf-fb-node-type-entry .ajf-node-type-label{min-width:0;line-height:1.25}ajf-fb-node-type-entry mat-icon{vertical-align:middle;font-size:18px;width:18px;height:18px}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }], { nodeType: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFbNodeTypeEntry, { className: "AjfFbNodeTypeEntry", filePath: "node-type-entry.ts", lineNumber: 40 }); })();

class NodeTypeFilterPipe {
    transform(nodeTypes, searchTerm) {
        if (!nodeTypes)
            return [];
        if (!searchTerm)
            return nodeTypes;
        const term = searchTerm.toLowerCase();
        return nodeTypes.filter(nt => nt.label.toLowerCase().includes(term));
    }
    static { this.ɵfac = function NodeTypeFilterPipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NodeTypeFilterPipe)(); }; }
    static { this.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "nodeTypeFilter", type: NodeTypeFilterPipe, pure: false }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NodeTypeFilterPipe, [{
        type: Pipe,
        args: [{
                name: 'nodeTypeFilter',
                pure: false,
            }]
    }], null, null); })();

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
 * Groups the node types of the palette by category, keeping the categories in
 * the order of their first entry. Applied after the search filter, so that the
 * categories left without entries produce no header.
 */
class NodeTypeGroupsPipe {
    transform(nodeTypes) {
        if (!nodeTypes) {
            return [];
        }
        const groups = [];
        const groupsByCategory = new Map();
        // Entries with no category are collected in a trailing group with no
        // header, so that the node types added by the host app are never hidden.
        const uncategorized = [];
        nodeTypes.forEach(nodeType => {
            const category = nodeType.category;
            if (!category) {
                uncategorized.push(nodeType);
                return;
            }
            let group = groupsByCategory.get(category);
            if (group == null) {
                group = { category, nodeTypes: [] };
                groupsByCategory.set(category, group);
                groups.push(group);
            }
            group.nodeTypes.push(nodeType);
        });
        if (uncategorized.length > 0) {
            groups.push({ category: '', nodeTypes: uncategorized });
        }
        return groups;
    }
    static { this.ɵfac = function NodeTypeGroupsPipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NodeTypeGroupsPipe)(); }; }
    static { this.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "nodeTypeGroups", type: NodeTypeGroupsPipe, pure: true }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NodeTypeGroupsPipe, [{
        type: Pipe,
        args: [{ name: 'nodeTypeGroups' }]
    }], null, null); })();

const _c0 = ["designer"];
function AjfFormBuilder_ng_container_27_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 15);
    i0.ɵɵlistener("click", function AjfFormBuilder_ng_container_27_button_1_Template_button_click_0_listener() { const choicesOrigin_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r4 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r4.editChoicesOrigin(choicesOrigin_r4)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const choicesOrigin_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, choicesOrigin_r4.label || choicesOrigin_r4.name), " ");
} }
function AjfFormBuilder_ng_container_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFormBuilder_ng_container_27_button_1_Template, 3, 3, "button", 30);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const cos_r6 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", cos_r6);
} }
function AjfFormBuilder_button_39_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 31);
    i0.ɵɵlistener("click", function AjfFormBuilder_button_39_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.searchTerm = ""); });
    i0.ɵɵelementStart(1, "mat-icon");
    i0.ɵɵtext(2, "close");
    i0.ɵɵelementEnd()();
} }
function AjfFormBuilder_ng_container_43_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const group_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, group_r8.category), " ");
} }
function AjfFormBuilder_ng_container_43_ajf_fb_node_type_entry_2_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ajf-fb-node-type-entry", 35);
    i0.ɵɵlistener("cdkDragStarted", function AjfFormBuilder_ng_container_43_ajf_fb_node_type_entry_2_Template_ajf_fb_node_type_entry_cdkDragStarted_0_listener() { i0.ɵɵrestoreView(_r9); i0.ɵɵnextContext(2); const leftSidenav_r2 = i0.ɵɵreference(32); return i0.ɵɵresetView(leftSidenav_r2.close()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const nodeType_r10 = ctx.$implicit;
    i0.ɵɵproperty("cdkDragData", nodeType_r10)("nodeType", nodeType_r10);
} }
function AjfFormBuilder_ng_container_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFormBuilder_ng_container_43_div_1_Template, 3, 3, "div", 32)(2, AjfFormBuilder_ng_container_43_ajf_fb_node_type_entry_2_Template, 1, 2, "ajf-fb-node-type-entry", 33);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const group_r8 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", group_r8.category);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", group_r8.nodeTypes);
} }
function AjfFormBuilder_ajf_fb_node_entry_48_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ajf-fb-node-entry", 36);
    i0.ɵɵlistener("cdkDropListDropped", function AjfFormBuilder_ajf_fb_node_entry_48_Template_ajf_fb_node_entry_cdkDropListDropped_0_listener($event) { i0.ɵɵrestoreView(_r11); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.onDrop($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const nodeEntry_r12 = ctx.$implicit;
    const isFirst_r13 = ctx.first;
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("cdkDropListEnterPredicate", ctx_r4.disableFieldDrop)("isFirst", isFirst_r13)("nodeEntry", nodeEntry_r12);
} }
class AjfFormBuilder {
    get form() {
        return this._form;
    }
    set form(form) {
        if (this._form !== form) {
            this._form = form;
            if (this._init) {
                this._setCurrentForm();
            }
        }
    }
    get expandSlides() {
        return this._expandSlides;
    }
    set expandSlides(expandSlides) {
        this._setSlidesExpanded(coerceBooleanProperty(expandSlides));
    }
    get fillHeight() {
        return this._fillHeight;
    }
    set fillHeight(fillHeight) {
        this._fillHeight = coerceBooleanProperty(fillHeight);
        this._cdr.markForCheck();
    }
    get nodeTypes() {
        return this._nodeTypes;
    }
    get nodeEntriesTree() {
        return this._nodeEntriesTree;
    }
    get choicesOrigins() {
        return this._choicesOrigins;
    }
    get connectedDropLists() {
        return this._connectedDropLists;
    }
    constructor(_service, _dialog, _cdr) {
        this._service = _service;
        this._dialog = _dialog;
        this._cdr = _cdr;
        /**
         * True when the slides of the designer are kept expanded. Slides added later
         * follow this state as well.
         * It drives the "expand slides" toggle of the toolbar and can be set by the
         * host, both one-way (`[expandSlides]="true"`) and two-way
         * (`[(expandSlides)]="expanded"`).
         */
        this._expandSlides = false;
        /**
         * Emits whenever the slides expansion state is changed from inside the form
         * builder, i.e. by the toolbar controls.
         */
        this.expandSlidesChange = new EventEmitter();
        /**
         * When true the form builder fills the whole height of its container: the
         * field types palette, the designer and the properties panel stretch to the
         * available height and scroll internally, instead of growing with their
         * content. Requires the container to have a definite height.
         */
        this._fillHeight = false;
        /**
         * Called to set form builder validation errors
         */
        this._formBuilderValidation = new EventEmitter();
        this.formBuilderValidation = this
            ._formBuilderValidation;
        /**
         * The list of the ids of all the dropLists connected to the formbuilder source list.
         */
        this._connectedDropLists = this._service.connectedDropLists;
        this.searchTerm = '';
        this._vc = new EventEmitter();
        this._init = false;
        this._editConditionSub = Subscription.EMPTY;
        this._editConditionDialog = null;
        this._beforeNodesUpdateSub = Subscription.EMPTY;
        this._editChoicesOriginSub = Subscription.EMPTY;
        this._editNodesValidationSub = Subscription.EMPTY;
        this._editChoicesOriginDialog = null;
        this._stringIdentifierDialog = null;
        this._stringIdentifierSub = Subscription.EMPTY;
        this._lastScrollTop = 0;
        this.xlsformDownloading = false;
        this._nodeTypes = _service.availableNodeTypes;
        this._nodeEntriesTree = _service.nodeEntriesTree;
        this._choicesOrigins = _service.choicesOrigins;
        this._editConditionSub = this._service.editedCondition.subscribe((condition) => {
            if (this._editConditionDialog != null) {
                this._editConditionDialog.close();
                this._editConditionDialog = null;
            }
            if (condition != null) {
                this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog, {
                    disableClose: true,
                });
            }
        });
        this._editChoicesOriginSub = this._service.editedChoicesOrigin.subscribe((choicesOrigin) => {
            if (this._editChoicesOriginDialog != null) {
                this._editChoicesOriginDialog.close();
                this._editChoicesOriginDialog = null;
            }
            if (choicesOrigin != null) {
                this._editChoicesOriginDialog = this._dialog.open(AjfFbChoicesOriginEditorDialog, {
                    disableClose: true,
                });
            }
        });
        this._editNodesValidationSub = this._service.editedNodesValidation.subscribe((nodeValidation) => {
            if (nodeValidation != null) {
                this._formBuilderValidation.next(nodeValidation);
            }
        });
        this._beforeNodesUpdateSub = this._service.beforeNodesUpdate.subscribe(() => {
            if (this.designerCont == null) {
                return;
            }
            this._lastScrollTop = this.designerCont.nativeElement.scrollTop;
        });
        this.nodeEntriesTree.pipe(sample(this._vc)).subscribe(() => {
            if (this.designerCont == null) {
                return;
            }
            this.designerCont.nativeElement.scrollTop = this._lastScrollTop;
        });
        this._stringIdentifierSub = this._service.stringIdentifier.subscribe(() => { });
    }
    ngAfterViewChecked() {
        this._vc.emit();
    }
    ngAfterContentInit() {
        // The expanded status of the slides lives in the service, which outlives a
        // single form builder instance: re-apply the current state, so that a newly
        // created form builder always matches its own expandSlides value.
        this._setSlidesExpanded(this._expandSlides);
        this._setCurrentForm();
        this._init = true;
    }
    ngOnDestroy() {
        this._editConditionSub.unsubscribe();
        this._beforeNodesUpdateSub.unsubscribe();
        this._editChoicesOriginSub.unsubscribe();
        this._editNodesValidationSub.unsubscribe();
        this._stringIdentifierSub.unsubscribe();
        this._service.setForm(null);
        this._service.resetNodeEntriesTreeExpandedStatus();
        this._service.resetEmptyCounters();
    }
    createChoicesOrigin() {
        this._service.createChoicesOrigin();
    }
    disableDrop() {
        return false;
    }
    disableFieldDrop(item) {
        return disableFieldDropPredicate(item);
    }
    /**
     * Triggers when a field or slide node is moved or inserted by drag&dropping in the formbuilder.
     * @param event The drop event.
     * @param content True if the current nodeEntry contains other nodeEntries.
     */
    onDrop(event, content = false) {
        onDropProcess(event, this._service, null, content);
    }
    editChoicesOrigin(choicesOrigin) {
        this._service.editChoicesOrigin(choicesOrigin);
    }
    editStringIdentifier() {
        if (this._stringIdentifierDialog != null) {
            this._stringIdentifierDialog.close();
            this._stringIdentifierDialog = null;
        }
        this._stringIdentifierDialog = this._dialog.open(AjfFbStringIdentifierDialogComponent, {
            width: '60%',
            height: '60%',
        });
    }
    /**
     * Expands all the slides of the designer and keeps the slides added later expanded.
     */
    expandAll() {
        this._setSlidesExpanded(true, true);
    }
    /**
     * Collapses all the slides of the designer and keeps the slides added later collapsed.
     */
    collapseAll() {
        this._setSlidesExpanded(false, true);
    }
    expandToggle(evt) {
        this._setSlidesExpanded(evt.checked, true);
    }
    /**
     * Applies the slides expansion state to the service.
     * @param expanded True to keep the slides expanded
     * @param notify True to emit expandSlidesChange when the state changes
     */
    _setSlidesExpanded(expanded, notify = false) {
        const changed = this._expandSlides !== expanded;
        this._expandSlides = expanded;
        if (expanded) {
            this._service.expandAll();
        }
        else {
            this._service.collapseAll();
        }
        if (notify && changed) {
            this.expandSlidesChange.emit(expanded);
        }
        this._cdr.markForCheck();
    }
    async downloadAsXlsform() {
        this.xlsformDownloading = true;
        this._cdr.markForCheck();
        try {
            const form = await firstValueFrom(this._service.getCurrentForm());
            const json = JSON.stringify(form);
            const fileBlob = new Blob([json], { type: 'application/json' });
            const formData = new FormData();
            formData.append('jsonFile', fileBlob, 'form.json');
            const response = await fetch('https://formconv.herokuapp.com/result.xlsx', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                const errorText = await response.text();
                window.alert(errorText);
                return;
            }
            const resultBlob = await response.blob();
            const url = URL.createObjectURL(resultBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'result.xlsx';
            a.click();
            URL.revokeObjectURL(url);
        }
        finally {
            this.xlsformDownloading = false;
            this._cdr.markForCheck();
        }
    }
    _setCurrentForm() {
        if (this._form == null) {
            return;
        }
        this._service.setForm(this._form);
    }
    static { this.ɵfac = function AjfFormBuilder_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFormBuilder)(i0.ɵɵdirectiveInject(AjfFormBuilderService), i0.ɵɵdirectiveInject(i2.MatDialog), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFormBuilder, selectors: [["ajf-form-builder"]], viewQuery: function AjfFormBuilder_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 7);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.designerCont = _t.first);
        } }, hostVars: 2, hostBindings: function AjfFormBuilder_HostBindings(rf, ctx) { if (rf & 2) {
            i0.ɵɵclassProp("ajf-form-builder-fill-height", ctx.fillHeight);
        } }, inputs: { form: "form", expandSlides: "expandSlides", fillHeight: "fillHeight" }, outputs: { expandSlidesChange: "expandSlidesChange", formBuilderValidation: "formBuilderValidation" }, decls: 53, vars: 37, consts: [["choicesMenu", "matMenu"], ["leftSidenav", ""], ["sourceDropList", ""], ["designer", ""], ["rightSidenav", ""], [1, "ajf-formbuilder-toolbar"], ["mat-icon-button", "", "aria-label", "Toggle side navigation", 3, "click"], ["mat-button", "", 3, "matMenuTriggerFor"], ["mat-button", "", 3, "click"], [1, "ajf-toolbar-group"], ["mat-icon-button", "", "aria-label", "Collapse all slides", "matTooltip", "Keep slides collapsed", 3, "click"], ["color", "primary", "aria-label", "Toggle slide expansion", 3, "change", "checked"], ["mat-icon-button", "", "aria-label", "Expand all slides", "matTooltip", "Keep slides expanded", 3, "click"], [1, "ajf-spacer"], ["mat-button", "", 3, "click", "disabled"], ["mat-menu-item", "", 3, "click"], [4, "ngIf"], [1, "ajf-formtree-container"], ["cdkDropListGroup", "", 1, "ajf-formtree-drawer-container"], ["position", "start", "mode", "over", 1, "ajf-sidenav-modern"], [1, "ajf-drawer-header"], ["floatLabel", "auto", 1, "ajf-search-field"], ["matPrefix", ""], ["matInput", "", "type", "text", 3, "ngModelChange", "ngModel", "placeholder"], ["matSuffix", "", "mat-icon-button", "", "aria-label", "Clear", 3, "click", 4, "ngIf"], ["cdkDropList", "", 1, "ajf-drawer-content", 3, "cdkDropListConnectedTo", "cdkDropListEnterPredicate", "cdkDropListData"], [4, "ngFor", "ngForOf"], [1, "ajf-designer"], ["id", "slides-list", "cdkDropList", "", 3, "cdkDropListEnterPredicate", "isFirst", "nodeEntry", "cdkDropListDropped", 4, "ngFor", "ngForOf"], ["position", "end", "mode", "side", 1, "ajf-formtree-properties"], ["mat-menu-item", "", 3, "click", 4, "ngFor", "ngForOf"], ["matSuffix", "", "mat-icon-button", "", "aria-label", "Clear", 3, "click"], ["class", "ajf-fb-category-header", 4, "ngIf"], ["cdkDrag", "", 3, "cdkDragData", "nodeType", "cdkDragStarted", 4, "ngFor", "ngForOf"], [1, "ajf-fb-category-header"], ["cdkDrag", "", 3, "cdkDragStarted", "cdkDragData", "nodeType"], ["id", "slides-list", "cdkDropList", "", 3, "cdkDropListDropped", "cdkDropListEnterPredicate", "isFirst", "nodeEntry"]], template: function AjfFormBuilder_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "mat-toolbar", 5)(1, "button", 6);
            i0.ɵɵlistener("click", function AjfFormBuilder_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r1); const leftSidenav_r2 = i0.ɵɵreference(32); return i0.ɵɵresetView(leftSidenav_r2.toggle()); });
            i0.ɵɵelementStart(2, "mat-icon");
            i0.ɵɵtext(3, "add_box");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(4, "button", 7);
            i0.ɵɵtext(5);
            i0.ɵɵpipe(6, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "button", 8);
            i0.ɵɵlistener("click", function AjfFormBuilder_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.editStringIdentifier()); });
            i0.ɵɵtext(8);
            i0.ɵɵpipe(9, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "div", 9)(11, "button", 10);
            i0.ɵɵlistener("click", function AjfFormBuilder_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.collapseAll()); });
            i0.ɵɵelementStart(12, "mat-icon");
            i0.ɵɵtext(13, "unfold_less");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "mat-slide-toggle", 11);
            i0.ɵɵlistener("change", function AjfFormBuilder_Template_mat_slide_toggle_change_14_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.expandToggle($event)); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "button", 12);
            i0.ɵɵlistener("click", function AjfFormBuilder_Template_button_click_15_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.expandAll()); });
            i0.ɵɵelementStart(16, "mat-icon");
            i0.ɵɵtext(17, "unfold_more");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelement(18, "span", 13);
            i0.ɵɵelementStart(19, "button", 14);
            i0.ɵɵlistener("click", function AjfFormBuilder_Template_button_click_19_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.downloadAsXlsform()); });
            i0.ɵɵtext(20);
            i0.ɵɵpipe(21, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "mat-menu", null, 0)(24, "button", 15);
            i0.ɵɵlistener("click", function AjfFormBuilder_Template_button_click_24_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.createChoicesOrigin()); });
            i0.ɵɵtext(25);
            i0.ɵɵpipe(26, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(27, AjfFormBuilder_ng_container_27_Template, 2, 1, "ng-container", 16);
            i0.ɵɵpipe(28, "async");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(29, "div", 17)(30, "mat-drawer-container", 18)(31, "mat-drawer", 19, 1)(33, "div", 20)(34, "mat-form-field", 21)(35, "mat-icon", 22);
            i0.ɵɵtext(36, "search");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "input", 23);
            i0.ɵɵpipe(38, "transloco");
            i0.ɵɵtwoWayListener("ngModelChange", function AjfFormBuilder_Template_input_ngModelChange_37_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(39, AjfFormBuilder_button_39_Template, 3, 0, "button", 24);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(40, "div", 25, 2);
            i0.ɵɵpipe(42, "async");
            i0.ɵɵtemplate(43, AjfFormBuilder_ng_container_43_Template, 3, 2, "ng-container", 26);
            i0.ɵɵpipe(44, "nodeTypeFilter");
            i0.ɵɵpipe(45, "nodeTypeGroups");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(46, "div", 27, 3);
            i0.ɵɵtemplate(48, AjfFormBuilder_ajf_fb_node_entry_48_Template, 1, 3, "ajf-fb-node-entry", 28);
            i0.ɵɵpipe(49, "async");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(50, "div", 29, 4);
            i0.ɵɵelement(52, "ajf-fb-node-properties");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            const choicesMenu_r14 = i0.ɵɵreference(23);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("matMenuTriggerFor", choicesMenu_r14);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(6, 16, "Choices"), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(9, 18, "Default columns"), " ");
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("checked", ctx.expandSlides);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("disabled", ctx.xlsformDownloading);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(21, 20, "Download as XLSForm"), " ");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(26, 22, "New.."), " ");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(28, 24, ctx.choicesOrigins));
            i0.ɵɵadvance(10);
            i0.ɵɵpropertyInterpolate("placeholder", i0.ɵɵpipeBind1(38, 26, "Search elements..."));
            i0.ɵɵtwoWayProperty("ngModel", ctx.searchTerm);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.searchTerm);
            i0.ɵɵadvance();
            i0.ɵɵproperty("cdkDropListConnectedTo", i0.ɵɵpipeBind1(42, 28, ctx.connectedDropLists))("cdkDropListEnterPredicate", ctx.disableDrop)("cdkDropListData", ctx.nodeTypes);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(45, 33, i0.ɵɵpipeBind2(44, 30, ctx.nodeTypes, ctx.searchTerm)));
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(49, 35, ctx.nodeEntriesTree));
        } }, dependencies: [i3.NgForOf, i3.NgIf, i4$1.CdkDropList, i4$1.CdkDropListGroup, i4$1.CdkDrag, i3$1.DefaultValueAccessor, i3$1.NgControlStatus, i3$1.NgModel, i5.MatButton, i5.MatIconButton, i7.MatFormField, i7.MatPrefix, i7.MatSuffix, i5$1.MatIcon, i6.MatInput, i10.MatMenu, i10.MatMenuItem, i10.MatMenuTrigger, i11.MatDrawer, i11.MatDrawerContainer, i12.MatToolbar, i8.MatTooltip, i14.MatSlideToggle, AjfFbNodeEntry, AjfFbNodeProperties, AjfFbNodeTypeEntry, i3.AsyncPipe, i6$1.TranslocoPipe, NodeTypeFilterPipe, NodeTypeGroupsPipe], styles: ["ajf-form-builder{display:flex;flex-direction:column;align-items:stretch;position:relative;min-height:300px}ajf-form-builder mat-toolbar.ajf-formbuilder-toolbar{position:sticky;top:0;z-index:3;display:flex;align-items:center;height:48px;min-height:48px;padding:0 1rem;box-shadow:none;border-bottom:1px solid color-mix(in srgb,currentColor 12%,transparent);gap:.75rem}ajf-form-builder mat-toolbar.ajf-formbuilder-toolbar button[mat-icon-button] mat-icon{transition:transform .2s ease,color .2s ease}ajf-form-builder mat-toolbar.ajf-formbuilder-toolbar button[mat-icon-button]:hover mat-icon{transform:scale(1.1)}ajf-form-builder mat-toolbar.ajf-formbuilder-toolbar .ajf-toolbar-group{display:flex;align-items:center;gap:.5rem;border-radius:100vmax;padding:.25rem .5rem;background-color:color-mix(in srgb,currentColor 4%,transparent)}ajf-form-builder mat-toolbar.ajf-formbuilder-toolbar .ajf-spacer{flex:1 1 auto}ajf-form-builder .ajf-formtree-container{display:flex;flex-flow:row;align-items:flex-start;justify-content:space-between;gap:18px;padding:18px 22px;box-sizing:border-box}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container{flex:1 1 auto;min-height:47vh;border:none;border-radius:0;background:transparent;overflow:hidden;transition:box-shadow .25s ease-in-out}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container .ajf-designer{flex:1;padding:4px 2px;overflow-y:auto}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container .ajf-designer .mat-card-container .mat-mdc-card{border:1px solid color-mix(in srgb,currentColor 12%,transparent);border-radius:10px;box-shadow:0 1px 2px #0000000d}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container .ajf-designer .mat-expansion-panel-header{background:color-mix(in srgb,currentColor 4%,transparent)}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container .ajf-designer .mat-expansion-panel-header:hover{background:color-mix(in srgb,currentColor 6%,transparent)}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container .ajf-designer .mat-expansion-panel-header-title{font-size:14.5px;font-weight:600}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container .mat-expansion-panel-body{padding:12px}ajf-form-builder .ajf-formtree-container .ajf-formtree-properties{flex:0 1 auto;min-width:312px;max-width:312px;max-height:70vh;overflow-y:auto;position:sticky;top:64px;border-radius:10px;border:1px solid color-mix(in srgb,currentColor 12%,transparent);padding:1rem;transition:box-shadow .3s ease,transform .3s ease}ajf-form-builder .ajf-formtree-container .ajf-formtree-properties:hover{box-shadow:0 0 14px #0000001a}ajf-form-builder .ajf-sidenav-modern{display:flex;flex-direction:column;min-width:250px;max-width:250px;border-right:1px solid color-mix(in srgb,currentColor 12%,transparent);border-radius:10px 0 0 10px}ajf-form-builder .ajf-sidenav-modern .ajf-drawer-header{position:sticky;top:0;z-index:2;padding:.5rem;border-bottom:1px solid color-mix(in srgb,currentColor 8%,transparent)}ajf-form-builder .ajf-sidenav-modern .ajf-search-field{width:100%;margin:0}ajf-form-builder .ajf-sidenav-modern .ajf-search-field input{font-size:.9rem}ajf-form-builder .ajf-sidenav-modern .ajf-search-field mat-icon{color:color-mix(in srgb,currentColor 60%,transparent)}ajf-form-builder .ajf-sidenav-modern .ajf-drawer-content{flex:1 1 auto;overflow-y:auto;padding:.5rem;display:flex;flex-direction:column;gap:.25rem;scrollbar-width:thin;scrollbar-color:color-mix(in srgb,currentColor 25%,transparent) transparent}ajf-form-builder .ajf-sidenav-modern .ajf-drawer-content::-webkit-scrollbar{width:6px}ajf-form-builder .ajf-sidenav-modern .ajf-drawer-content::-webkit-scrollbar-thumb{background:color-mix(in srgb,currentColor 25%,transparent);border-radius:4px}ajf-form-builder .ajf-sidenav-modern .ajf-drawer-content::-webkit-scrollbar-thumb:hover{background:color-mix(in srgb,currentColor 40%,transparent)}ajf-form-builder .ajf-sidenav-modern .ajf-fb-category-header{padding:14px 8px 4px;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:color-mix(in srgb,currentColor 60%,transparent);-webkit-user-select:none;user-select:none;pointer-events:none}ajf-form-builder .ajf-sidenav-modern .ajf-fb-category-header:first-child{padding-top:4px}ajf-form-builder .ajf-sidenav-modern ajf-fb-node-type-entry{transition:background-color .15s ease,transform .15s ease}ajf-form-builder .ajf-sidenav-modern ajf-fb-node-type-entry:hover{background-color:color-mix(in srgb,currentColor 6%,transparent);transform:scale(1.02)}@media (max-height: 700px){ajf-form-builder .ajf-sidenav-modern .ajf-drawer-content{padding:.25rem}}@media (max-width: 900px){ajf-form-builder .ajf-sidenav-modern{max-width:240px;min-width:180px}ajf-form-builder .ajf-sidenav-modern .ajf-search-field input{font-size:.8rem}}@media (max-width: 1024px){ajf-form-builder .ajf-formtree-container{flex-direction:column;gap:1rem}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container{min-height:40vh}ajf-form-builder .ajf-formtree-container .ajf-formtree-properties{min-width:0;max-width:100%;position:relative;top:0}ajf-form-builder mat-toolbar.ajf-formbuilder-toolbar{flex-wrap:wrap;justify-content:center}}ajf-form-builder.ajf-form-builder-fill-height{flex:1 1 auto;height:100%;min-height:0}ajf-form-builder.ajf-form-builder-fill-height .ajf-formtree-container{flex:1 1 auto;min-height:0;align-items:stretch}ajf-form-builder.ajf-form-builder-fill-height mat-drawer-container.ajf-formtree-drawer-container{min-height:0;height:100%}ajf-form-builder.ajf-form-builder-fill-height mat-drawer-container.ajf-formtree-drawer-container .ajf-designer{height:100%;box-sizing:border-box}ajf-form-builder.ajf-form-builder-fill-height .ajf-formtree-properties{position:static;top:auto;max-height:none}ajf-form-builder *{scroll-behavior:smooth}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFormBuilder, [{
        type: Component,
        args: [{ selector: 'ajf-form-builder', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: { '[class.ajf-form-builder-fill-height]': 'fillHeight' }, template: "<mat-toolbar class=\"ajf-formbuilder-toolbar\">\n  <button mat-icon-button (click)=\"leftSidenav.toggle()\" aria-label=\"Toggle side navigation\">\n    <mat-icon>add_box</mat-icon>\n  </button>\n  <button mat-button [matMenuTriggerFor]=\"choicesMenu\">\n    {{ 'Choices' | transloco }}\n  </button>\n  <button mat-button (click)=\"editStringIdentifier()\">\n    {{ 'Default columns' | transloco }}\n  </button>\n\n  <div class=\"ajf-toolbar-group\">\n    <button\n      mat-icon-button\n      aria-label=\"Collapse all slides\"\n      matTooltip=\"Keep slides collapsed\"\n      (click)=\"collapseAll()\"\n    >\n      <mat-icon>unfold_less</mat-icon>\n    </button>\n\n    <mat-slide-toggle\n      color=\"primary\"\n      [checked]=\"expandSlides\"\n      (change)=\"expandToggle($event)\"\n      aria-label=\"Toggle slide expansion\"\n    ></mat-slide-toggle>\n\n    <button\n      mat-icon-button\n      aria-label=\"Expand all slides\"\n      matTooltip=\"Keep slides expanded\"\n      (click)=\"expandAll()\"\n    >\n      <mat-icon>unfold_more</mat-icon>\n    </button>\n  </div>\n\n  <span class=\"ajf-spacer\"></span>\n\n  <button mat-button (click)=\"downloadAsXlsform()\" [disabled]=\"xlsformDownloading\">\n    {{ 'Download as XLSForm' | transloco }}\n  </button>\n\n  <mat-menu #choicesMenu=\"matMenu\">\n    <button mat-menu-item (click)=\"createChoicesOrigin()\">\n      {{ 'New..' | transloco }}\n    </button>\n    <ng-container *ngIf=\"choicesOrigins | async as cos\">\n      <button\n        mat-menu-item\n        *ngFor=\"let choicesOrigin of cos\"\n        (click)=\"editChoicesOrigin(choicesOrigin)\"\n      >\n        {{ (choicesOrigin.label || choicesOrigin.name) | transloco }}\n      </button>\n    </ng-container>\n  </mat-menu>\n</mat-toolbar>\n\n<div class=\"ajf-formtree-container\">\n  <mat-drawer-container\n    cdkDropListGroup\n    class=\"ajf-formtree-drawer-container\"\n  >\n    <mat-drawer #leftSidenav position=\"start\" mode=\"over\" class=\"ajf-sidenav-modern\">\n      <div class=\"ajf-drawer-header\">\n        <mat-form-field class=\"ajf-search-field\" floatLabel=\"auto\">\n          <mat-icon matPrefix>search</mat-icon>\n          <input\n            matInput\n            type=\"text\"\n            [(ngModel)]=\"searchTerm\"\n            placeholder=\"{{ 'Search elements...' | transloco }}\"\n          />\n          <button\n            *ngIf=\"searchTerm\"\n            matSuffix\n            mat-icon-button\n            aria-label=\"Clear\"\n            (click)=\"searchTerm=''\"\n          >\n            <mat-icon>close</mat-icon>\n          </button>\n        </mat-form-field>\n      </div>\n    \n      <div\n        #sourceDropList\n        class=\"ajf-drawer-content\"\n        cdkDropList\n        [cdkDropListConnectedTo]=\"(connectedDropLists | async)!\"\n        [cdkDropListEnterPredicate]=\"disableDrop\"\n        [cdkDropListData]=\"nodeTypes\"\n      >\n        <ng-container *ngFor=\"let group of nodeTypes | nodeTypeFilter: searchTerm | nodeTypeGroups\">\n          <div class=\"ajf-fb-category-header\" *ngIf=\"group.category\">\n            {{ group.category | transloco }}\n          </div>\n          <ajf-fb-node-type-entry\n            *ngFor=\"let nodeType of group.nodeTypes\"\n            cdkDrag\n            [cdkDragData]=\"nodeType\"\n            (cdkDragStarted)=\"leftSidenav.close()\"\n            [nodeType]=\"nodeType\"\n          ></ajf-fb-node-type-entry>\n        </ng-container>\n      </div>\n    </mat-drawer>\n    \n    <div #designer class=\"ajf-designer\">\n      <ajf-fb-node-entry\n        id=\"slides-list\"\n        cdkDropList\n        (cdkDropListDropped)=\"onDrop($event)\"\n        [cdkDropListEnterPredicate]=\"disableFieldDrop\"\n        *ngFor=\"let nodeEntry of (nodeEntriesTree | async); let isFirst = first\"\n        [isFirst]=\"isFirst\"\n        [nodeEntry]=\"nodeEntry\"\n      ></ajf-fb-node-entry>\n    </div>\n  </mat-drawer-container>\n\n  <div class=\"ajf-formtree-properties\" #rightSidenav position=\"end\" mode=\"side\">\n    <ajf-fb-node-properties></ajf-fb-node-properties>\n  </div>\n</div>\n", styles: ["ajf-form-builder{display:flex;flex-direction:column;align-items:stretch;position:relative;min-height:300px}ajf-form-builder mat-toolbar.ajf-formbuilder-toolbar{position:sticky;top:0;z-index:3;display:flex;align-items:center;height:48px;min-height:48px;padding:0 1rem;box-shadow:none;border-bottom:1px solid color-mix(in srgb,currentColor 12%,transparent);gap:.75rem}ajf-form-builder mat-toolbar.ajf-formbuilder-toolbar button[mat-icon-button] mat-icon{transition:transform .2s ease,color .2s ease}ajf-form-builder mat-toolbar.ajf-formbuilder-toolbar button[mat-icon-button]:hover mat-icon{transform:scale(1.1)}ajf-form-builder mat-toolbar.ajf-formbuilder-toolbar .ajf-toolbar-group{display:flex;align-items:center;gap:.5rem;border-radius:100vmax;padding:.25rem .5rem;background-color:color-mix(in srgb,currentColor 4%,transparent)}ajf-form-builder mat-toolbar.ajf-formbuilder-toolbar .ajf-spacer{flex:1 1 auto}ajf-form-builder .ajf-formtree-container{display:flex;flex-flow:row;align-items:flex-start;justify-content:space-between;gap:18px;padding:18px 22px;box-sizing:border-box}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container{flex:1 1 auto;min-height:47vh;border:none;border-radius:0;background:transparent;overflow:hidden;transition:box-shadow .25s ease-in-out}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container .ajf-designer{flex:1;padding:4px 2px;overflow-y:auto}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container .ajf-designer .mat-card-container .mat-mdc-card{border:1px solid color-mix(in srgb,currentColor 12%,transparent);border-radius:10px;box-shadow:0 1px 2px #0000000d}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container .ajf-designer .mat-expansion-panel-header{background:color-mix(in srgb,currentColor 4%,transparent)}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container .ajf-designer .mat-expansion-panel-header:hover{background:color-mix(in srgb,currentColor 6%,transparent)}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container .ajf-designer .mat-expansion-panel-header-title{font-size:14.5px;font-weight:600}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container .mat-expansion-panel-body{padding:12px}ajf-form-builder .ajf-formtree-container .ajf-formtree-properties{flex:0 1 auto;min-width:312px;max-width:312px;max-height:70vh;overflow-y:auto;position:sticky;top:64px;border-radius:10px;border:1px solid color-mix(in srgb,currentColor 12%,transparent);padding:1rem;transition:box-shadow .3s ease,transform .3s ease}ajf-form-builder .ajf-formtree-container .ajf-formtree-properties:hover{box-shadow:0 0 14px #0000001a}ajf-form-builder .ajf-sidenav-modern{display:flex;flex-direction:column;min-width:250px;max-width:250px;border-right:1px solid color-mix(in srgb,currentColor 12%,transparent);border-radius:10px 0 0 10px}ajf-form-builder .ajf-sidenav-modern .ajf-drawer-header{position:sticky;top:0;z-index:2;padding:.5rem;border-bottom:1px solid color-mix(in srgb,currentColor 8%,transparent)}ajf-form-builder .ajf-sidenav-modern .ajf-search-field{width:100%;margin:0}ajf-form-builder .ajf-sidenav-modern .ajf-search-field input{font-size:.9rem}ajf-form-builder .ajf-sidenav-modern .ajf-search-field mat-icon{color:color-mix(in srgb,currentColor 60%,transparent)}ajf-form-builder .ajf-sidenav-modern .ajf-drawer-content{flex:1 1 auto;overflow-y:auto;padding:.5rem;display:flex;flex-direction:column;gap:.25rem;scrollbar-width:thin;scrollbar-color:color-mix(in srgb,currentColor 25%,transparent) transparent}ajf-form-builder .ajf-sidenav-modern .ajf-drawer-content::-webkit-scrollbar{width:6px}ajf-form-builder .ajf-sidenav-modern .ajf-drawer-content::-webkit-scrollbar-thumb{background:color-mix(in srgb,currentColor 25%,transparent);border-radius:4px}ajf-form-builder .ajf-sidenav-modern .ajf-drawer-content::-webkit-scrollbar-thumb:hover{background:color-mix(in srgb,currentColor 40%,transparent)}ajf-form-builder .ajf-sidenav-modern .ajf-fb-category-header{padding:14px 8px 4px;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:color-mix(in srgb,currentColor 60%,transparent);-webkit-user-select:none;user-select:none;pointer-events:none}ajf-form-builder .ajf-sidenav-modern .ajf-fb-category-header:first-child{padding-top:4px}ajf-form-builder .ajf-sidenav-modern ajf-fb-node-type-entry{transition:background-color .15s ease,transform .15s ease}ajf-form-builder .ajf-sidenav-modern ajf-fb-node-type-entry:hover{background-color:color-mix(in srgb,currentColor 6%,transparent);transform:scale(1.02)}@media (max-height: 700px){ajf-form-builder .ajf-sidenav-modern .ajf-drawer-content{padding:.25rem}}@media (max-width: 900px){ajf-form-builder .ajf-sidenav-modern{max-width:240px;min-width:180px}ajf-form-builder .ajf-sidenav-modern .ajf-search-field input{font-size:.8rem}}@media (max-width: 1024px){ajf-form-builder .ajf-formtree-container{flex-direction:column;gap:1rem}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container{min-height:40vh}ajf-form-builder .ajf-formtree-container .ajf-formtree-properties{min-width:0;max-width:100%;position:relative;top:0}ajf-form-builder mat-toolbar.ajf-formbuilder-toolbar{flex-wrap:wrap;justify-content:center}}ajf-form-builder.ajf-form-builder-fill-height{flex:1 1 auto;height:100%;min-height:0}ajf-form-builder.ajf-form-builder-fill-height .ajf-formtree-container{flex:1 1 auto;min-height:0;align-items:stretch}ajf-form-builder.ajf-form-builder-fill-height mat-drawer-container.ajf-formtree-drawer-container{min-height:0;height:100%}ajf-form-builder.ajf-form-builder-fill-height mat-drawer-container.ajf-formtree-drawer-container .ajf-designer{height:100%;box-sizing:border-box}ajf-form-builder.ajf-form-builder-fill-height .ajf-formtree-properties{position:static;top:auto;max-height:none}ajf-form-builder *{scroll-behavior:smooth}\n"] }]
    }], () => [{ type: AjfFormBuilderService }, { type: i2.MatDialog }, { type: i0.ChangeDetectorRef }], { designerCont: [{
            type: ViewChild,
            args: ['designer', { static: true }]
        }], form: [{
            type: Input
        }], expandSlides: [{
            type: Input
        }], expandSlidesChange: [{
            type: Output
        }], fillHeight: [{
            type: Input
        }], formBuilderValidation: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFormBuilder, { className: "AjfFormBuilder", filePath: "form-builder.ts", lineNumber: 65 }); })();

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
class AjfFormBuilderModule {
    static { this.ɵfac = function AjfFormBuilderModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFormBuilderModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfFormBuilderModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [AjfFormBuilderService, AjfNodePropertiesNameMatchValidator], imports: [AjfNodeIconModule,
            CommonModule,
            DragDropModule,
            FormsModule,
            MatAutocompleteModule,
            MatButtonModule,
            MatCardModule,
            MatCheckboxModule,
            MatChipsModule,
            MatDialogModule,
            MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            MatListModule,
            MatMenuModule,
            MatSelectModule,
            NgxMatSelectSearchModule,
            MatSidenavModule,
            MatSliderModule,
            MatTableModule,
            MatToolbarModule,
            MatTooltipModule,
            ReactiveFormsModule,
            AjfTranslocoModule,
            MatExpansionModule,
            MatSlideToggleModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFormBuilderModule, [{
        type: NgModule,
        args: [{
                imports: [
                    AjfNodeIconModule,
                    CommonModule,
                    DragDropModule,
                    FormsModule,
                    MatAutocompleteModule,
                    MatButtonModule,
                    MatCardModule,
                    MatCheckboxModule,
                    MatChipsModule,
                    MatDialogModule,
                    MatFormFieldModule,
                    MatIconModule,
                    MatInputModule,
                    MatListModule,
                    MatMenuModule,
                    MatSelectModule,
                    NgxMatSelectSearchModule,
                    MatSidenavModule,
                    MatSliderModule,
                    MatTableModule,
                    MatToolbarModule,
                    MatTooltipModule,
                    ReactiveFormsModule,
                    AjfTranslocoModule,
                    MatExpansionModule,
                    MatSlideToggleModule,
                ],
                declarations: [
                    AjfFbBranchLine,
                    AjfFbChoicesOriginEditor,
                    AjfFbChoicesOriginEditorDialog,
                    AjfFbConditionEditor,
                    AjfFbConditionEditorDialog,
                    AjfFbNodeEntry,
                    AjfFbNodeProperties,
                    AjfFbNodeTypeEntry,
                    AjfFbStringIdentifierDialogComponent,
                    AjfFbValidationConditionEditorDialog,
                    AjfFbWarningConditionEditorDialog,
                    AjfFormBuilder,
                    NodeTypeFilterPipe,
                    NodeTypeGroupsPipe,
                ],
                exports: [AjfFormBuilder],
                providers: [AjfFormBuilderService, AjfNodePropertiesNameMatchValidator],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AjfFormBuilderModule, { declarations: [AjfFbBranchLine,
        AjfFbChoicesOriginEditor,
        AjfFbChoicesOriginEditorDialog,
        AjfFbConditionEditor,
        AjfFbConditionEditorDialog,
        AjfFbNodeEntry,
        AjfFbNodeProperties,
        AjfFbNodeTypeEntry,
        AjfFbStringIdentifierDialogComponent,
        AjfFbValidationConditionEditorDialog,
        AjfFbWarningConditionEditorDialog,
        AjfFormBuilder,
        NodeTypeFilterPipe,
        NodeTypeGroupsPipe], imports: [AjfNodeIconModule,
        CommonModule,
        DragDropModule,
        FormsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatSelectModule,
        NgxMatSelectSearchModule,
        MatSidenavModule,
        MatSliderModule,
        MatTableModule,
        MatToolbarModule,
        MatTooltipModule,
        ReactiveFormsModule,
        AjfTranslocoModule,
        MatExpansionModule,
        MatSlideToggleModule], exports: [AjfFormBuilder] }); })();

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

export { AjfFormBuilder, AjfFormBuilderModule, AjfFormBuilderNodeTypeCategories, AjfFormBuilderService, NodeTypeGroupsPipe, cleanDefaultValue, disableFieldDropPredicate, disableSlideDropPredicate, flattenNodes, onDropProcess };
//# sourceMappingURL=ajf-material-form-builder.mjs.map
