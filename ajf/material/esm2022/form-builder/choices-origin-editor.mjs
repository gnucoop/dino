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
import { isChoicesFixedOrigin } from '@ajf/core/forms';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ChoicesOriginDataSource } from './choices-origin-data-source';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/material/button";
import * as i4 from "@angular/material/form-field";
import * as i5 from "@angular/material/icon";
import * as i6 from "@angular/material/input";
import * as i7 from "@angular/material/table";
import * as i8 from "@ngneat/transloco";
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
export class AjfFbChoicesOriginEditor {
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
        } }, dependencies: [i1.NgIf, i2.DefaultValueAccessor, i2.NgControlStatus, i2.RequiredValidator, i2.NgModel, i3.MatButton, i4.MatFormField, i4.MatError, i5.MatIcon, i6.MatInput, i7.MatTable, i7.MatHeaderCellDef, i7.MatHeaderRowDef, i7.MatColumnDef, i7.MatCellDef, i7.MatRowDef, i7.MatHeaderCell, i7.MatCell, i7.MatHeaderRow, i7.MatRow, i8.TranslocoPipe], styles: ["ajf-fb-choices-origin-editor mat-form-field+mat-form-field{margin-left:1em}ajf-fb-choices-origin-editor .mat-mdc-table{max-height:300px}ajf-fb-choices-origin-editor .mat-mdc-table mat-icon{cursor:pointer}ajf-fb-choices-origin-editor .mat-mdc-input-element{max-width:100%}ajf-fb-choices-origin-editor .ajf-fb-field-error{color:var(--mdc-theme-error, #f44336);font-size:12px;margin-left:1em;vertical-align:middle}ajf-fb-choices-origin-editor .ajf-fb-choice-invalid{border-bottom-color:var(--mdc-theme-error, #f44336)!important;caret-color:var(--mdc-theme-error, #f44336)}\n"], encapsulation: 2, changeDetection: 0 }); }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvaWNlcy1vcmlnaW4tZWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL3NyYy9jaG9pY2VzLW9yaWdpbi1lZGl0b3IudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvc3JjL2Nob2ljZXMtb3JpZ2luLWVkaXRvci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBbUIsb0JBQW9CLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUzRixPQUFPLEVBQTJCLHVCQUF1QixFQUFDLE1BQU0sOEJBQThCLENBQUM7Ozs7Ozs7Ozs7O0lDdEIzRixpQ0FBMEQ7SUFDeEQsWUFDRjs7SUFBQSxpQkFBWTs7SUFEVixjQUNGO0lBREUseUVBQ0Y7OztJQUVGLCtCQUFzRTtJQUNwRSxZQUNGOztJQUFBLGlCQUFPOztJQURMLGNBQ0Y7SUFERSw0RUFDRjs7O0lBV00sdUNBQ0c7SUFBQSxZQUFvQjs7SUFBQSxpQkFDdEI7O0lBREUsY0FBb0I7SUFBcEIsa0RBQW9COzs7O0lBR3JCLEFBREYsZ0NBQWlELGdCQUV5QjtJQUR4RCw0U0FBdUI7SUFFekMsQUFGRSxpQkFDd0UsRUFDL0Q7Ozs7O0lBRFAsY0FBb0U7SUFBcEUsMEZBQW9FO0lBRHRELDRDQUF1Qjs7O0lBS3pDLHVDQUNHO0lBQUEsWUFBcUI7O0lBQUEsaUJBQ3ZCOztJQURFLGNBQXFCO0lBQXJCLG1EQUFxQjs7OztJQUd0QixBQURGLGdDQUFpRCxnQkFDTztJQUF0Qyw2U0FBdUI7SUFDekMsQUFERSxpQkFBc0QsRUFDN0M7OztJQURPLGNBQXVCO0lBQXZCLDRDQUF1Qjs7O0lBSXpD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QUksQ0FBQyxFQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBQyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2hELENBQUM7eUhBckVVLHdCQUF3QjtvRUFBeEIsd0JBQXdCOztZQ2hDakMsQUFERixBQURGLDJCQUFLLHFCQUNhLGtCQUN3Rjs7WUFBdEYsaVBBQWtCO1lBQWxDLGlCQUFzRztZQUN0RyxxRkFBMEQ7WUFHNUQsaUJBQWlCO1lBQ2pCLDJFQUFzRTtZQUlwRSxBQURGLHNDQUFnQixlQUM0RDs7WUFBMUQsbVBBQW1CO1lBQ3JDLEFBREUsaUJBQTBFLEVBQzNEO1lBQ2pCLDRGQUFxQztZQW9DdkMsaUJBQU07OztZQS9DYyxlQUFrQjtZQUFsQix3Q0FBa0I7WUFBQywwREFBa0M7WUFDekQsZUFBNEM7WUFBNUMscUVBQTRDO1lBSXhCLGNBQWtDO1lBQWxDLDJEQUFrQztZQUlsRCxlQUFtQjtZQUFuQix5Q0FBbUI7WUFBQywyREFBbUM7WUFFNUQsZUFBdUI7WUFBdkIseUNBQXVCOzs7aUZEcUJ6Qix3QkFBd0I7Y0FQcEMsU0FBUzsyQkFDRSw4QkFBOEIsaUJBR3pCLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU07Z0JBYTNDLGFBQWE7a0JBRGhCLEtBQUs7WUFpQkcsYUFBYTtrQkFBckIsS0FBSzs7a0ZBM0JLLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDaG9pY2VzT3JpZ2luLCBpc0Nob2ljZXNGaXhlZE9yaWdpbn0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtDaG9pY2VzT3JpZ2luQ2hvaWNlRW50cnksIENob2ljZXNPcmlnaW5EYXRhU291cmNlfSBmcm9tICcuL2Nob2ljZXMtb3JpZ2luLWRhdGEtc291cmNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWZiLWNob2ljZXMtb3JpZ2luLWVkaXRvcicsXG4gIHRlbXBsYXRlVXJsOiAnY2hvaWNlcy1vcmlnaW4tZWRpdG9yLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY2hvaWNlcy1vcmlnaW4tZWRpdG9yLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZiQ2hvaWNlc09yaWdpbkVkaXRvciB7XG4gIHByaXZhdGUgX2Rpc3BsYXllZENvbHVtbnM6IHN0cmluZ1tdID0gWyd2YWx1ZScsICdsYWJlbCcsICdkZWxldGUnXTtcbiAgZ2V0IGRpc3BsYXllZENvbHVtbnMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl9kaXNwbGF5ZWRDb2x1bW5zO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hvaWNlc09yaWdpbjogQWpmQ2hvaWNlc09yaWdpbjxhbnk+IHwgdW5kZWZpbmVkO1xuICBnZXQgY2hvaWNlc09yaWdpbigpOiBBamZDaG9pY2VzT3JpZ2luPGFueT4gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9jaG9pY2VzT3JpZ2luO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBjaG9pY2VzT3JpZ2luKGNob2ljZXNPcmlnaW46IEFqZkNob2ljZXNPcmlnaW48YW55PiB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuX2Nob2ljZXNPcmlnaW4gPSBjaG9pY2VzT3JpZ2luO1xuICAgIGlmIChjaG9pY2VzT3JpZ2luICE9IG51bGwpIHtcbiAgICAgIHRoaXMubmFtZSA9IGNob2ljZXNPcmlnaW4ubmFtZTtcbiAgICAgIHRoaXMubGFiZWwgPSBjaG9pY2VzT3JpZ2luLmxhYmVsO1xuICAgICAgdGhpcy5jYW5FZGl0Q2hvaWNlcyA9IGlzQ2hvaWNlc0ZpeGVkT3JpZ2luKGNob2ljZXNPcmlnaW4pO1xuICAgICAgdGhpcy5fY2hvaWNlc0FyciA9IGNob2ljZXNPcmlnaW4uY2hvaWNlcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5uYW1lID0gJyc7XG4gICAgICB0aGlzLmxhYmVsID0gJyc7XG4gICAgICB0aGlzLmNhbkVkaXRDaG9pY2VzID0gZmFsc2U7XG4gICAgICB0aGlzLl9jaG9pY2VzQXJyID0gW107XG4gICAgfVxuICAgIHRoaXMuX2Nob2ljZXMudXBkYXRlQ2hvaWNlcyh0aGlzLl9jaG9pY2VzQXJyKTtcbiAgfVxuXG4gIEBJbnB1dCgpIG5hbWVEdXBsaWNhdGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBlZGl0aW5nOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0gPSB7fTtcbiAgbmFtZTogc3RyaW5nID0gJyc7XG4gIGxhYmVsOiBzdHJpbmcgPSAnJztcbiAgY2FuRWRpdENob2ljZXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIF9jaG9pY2VzOiBDaG9pY2VzT3JpZ2luRGF0YVNvdXJjZSA9IG5ldyBDaG9pY2VzT3JpZ2luRGF0YVNvdXJjZSgpO1xuICBnZXQgY2hvaWNlcygpOiBDaG9pY2VzT3JpZ2luRGF0YVNvdXJjZSB7XG4gICAgcmV0dXJuIHRoaXMuX2Nob2ljZXM7XG4gIH1cblxuICBwcml2YXRlIF9jaG9pY2VzQXJyOiBDaG9pY2VzT3JpZ2luQ2hvaWNlRW50cnlbXSA9IFtdO1xuICBnZXQgY2hvaWNlc0FycigpOiBDaG9pY2VzT3JpZ2luQ2hvaWNlRW50cnlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2Nob2ljZXNBcnI7XG4gIH1cblxuICBnZXQgaGFzSW52YWxpZENob2ljZXMoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgdmFsdWVzID0gdGhpcy5fY2hvaWNlc0Fyci5tYXAoYyA9PiAoYy52YWx1ZSA/PyAnJykudHJpbSgpKTtcbiAgICByZXR1cm4gdmFsdWVzLnNvbWUodiA9PiB2ID09PSAnJykgfHwgbmV3IFNldCh2YWx1ZXMpLnNpemUgIT09IHZhbHVlcy5sZW5ndGg7XG4gIH1cblxuICBpc0Nob2ljZVZhbHVlSW52YWxpZCh2YWx1ZTogc3RyaW5nLCByb3dJZHg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHRyaW1tZWQgPSAodmFsdWUgPz8gJycpLnRyaW0oKTtcbiAgICBpZiAodHJpbW1lZCA9PT0gJycpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiB0aGlzLl9jaG9pY2VzQXJyLnNvbWUoKGMsIGkpID0+IGkgIT09IHJvd0lkeCAmJiAoYy52YWx1ZSA/PyAnJykudHJpbSgpID09PSB0cmltbWVkKTtcbiAgfVxuXG4gIHVwZGF0ZVZhbHVlKGV2dDogYW55LCBjZWxsOiBzdHJpbmcsIF92YWx1ZTogYW55LCByb3dJZHg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZWRpdGluZ1tyb3dJZHggKyAnLScgKyBjZWxsXSA9IGZhbHNlO1xuICAgICh0aGlzLl9jaG9pY2VzQXJyW3Jvd0lkeF0gYXMgYW55KVtjZWxsXSA9IGV2dC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5fY2hvaWNlcy51cGRhdGVDaG9pY2VzKHRoaXMuX2Nob2ljZXNBcnIpO1xuICB9XG5cbiAgZGVsZXRlUm93KHJvd0lkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fY2hvaWNlc0Fyci5zcGxpY2Uocm93SWR4LCAxKTtcbiAgICB0aGlzLl9jaG9pY2VzLnVwZGF0ZUNob2ljZXModGhpcy5fY2hvaWNlc0Fycik7XG4gIH1cblxuICBhZGRSb3coKTogdm9pZCB7XG4gICAgdGhpcy5fY2hvaWNlc0Fyci5wdXNoKHtsYWJlbDogJycsIHZhbHVlOiAnJ30pO1xuICAgIHRoaXMuX2Nob2ljZXMudXBkYXRlQ2hvaWNlcyh0aGlzLl9jaG9pY2VzQXJyKTtcbiAgfVxufVxuIiwiPGRpdj5cbiAgPG1hdC1mb3JtLWZpZWxkPlxuICAgIDxpbnB1dCBtYXRJbnB1dCBbKG5nTW9kZWwpXT1cIm5hbWVcIiBbcGxhY2Vob2xkZXJdPVwiJ05hbWUnIHwgdHJhbnNsb2NvXCIgcmVxdWlyZWQgI25hbWVJbnB1dD1cIm5nTW9kZWxcIiAvPlxuICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJuYW1lSW5wdXQuaW52YWxpZCAmJiBuYW1lSW5wdXQudG91Y2hlZFwiPlxuICAgICAge3snTmFtZSBpcyByZXF1aXJlZCcgfCB0cmFuc2xvY299fVxuICAgIDwvbWF0LWVycm9yPlxuICA8L21hdC1mb3JtLWZpZWxkPlxuICA8c3BhbiBjbGFzcz1cImFqZi1mYi1maWVsZC1lcnJvclwiICpuZ0lmPVwibmFtZUR1cGxpY2F0ZSAmJiBuYW1lLnRyaW0oKVwiPlxuICAgIHt7J05hbWUgYWxyZWFkeSBleGlzdHMnIHwgdHJhbnNsb2NvfX1cbiAgPC9zcGFuPlxuICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgPGlucHV0IG1hdElucHV0IFsobmdNb2RlbCldPVwibGFiZWxcIiBbcGxhY2Vob2xkZXJdPVwiJ0xhYmVsJyB8IHRyYW5zbG9jb1wiIC8+XG4gIDwvbWF0LWZvcm0tZmllbGQ+XG4gIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJjYW5FZGl0Q2hvaWNlc1wiPlxuICAgIDxidXR0b24gKGNsaWNrKT1cImFkZFJvdygpXCIgbWF0LWJ1dHRvbj5cbiAgICAgIDxtYXQtaWNvbj5hZGQ8L21hdC1pY29uPlxuICAgICAgPHNwYW4+e3snQWRkIHZhbHVlJ3x0cmFuc2xvY299fTwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbiAgICA8bWF0LXRhYmxlIFtkYXRhU291cmNlXT1cImNob2ljZXNcIj5cbiAgICAgIDxuZy1jb250YWluZXIgbWF0Q29sdW1uRGVmPVwidmFsdWVcIj5cbiAgICAgICAgPG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZlxuICAgICAgICAgID57eydOYW1lJ3x0cmFuc2xvY299fTwvbWF0LWhlYWRlci1jZWxsXG4gICAgICAgID5cbiAgICAgICAgPG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvdzsgbGV0IGlkeCA9IGluZGV4XCI+XG4gICAgICAgICAgPGlucHV0IG1hdElucHV0IFsobmdNb2RlbCldPVwicm93LnZhbHVlXCIgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgW2NsYXNzLmFqZi1mYi1jaG9pY2UtaW52YWxpZF09XCJpc0Nob2ljZVZhbHVlSW52YWxpZChyb3cudmFsdWUsIGlkeClcIi8+XG4gICAgICAgIDwvbWF0LWNlbGw+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy1jb250YWluZXIgbWF0Q29sdW1uRGVmPVwibGFiZWxcIj5cbiAgICAgICAgPG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZlxuICAgICAgICAgID57eydMYWJlbCd8dHJhbnNsb2NvfX08L21hdC1oZWFkZXItY2VsbFxuICAgICAgICA+XG4gICAgICAgIDxtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3c7IGxldCBpZHggPSBpbmRleFwiPlxuICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBbKG5nTW9kZWwpXT1cInJvdy5sYWJlbFwiIHR5cGU9XCJ0ZXh0XCIgLz5cbiAgICAgICAgPC9tYXQtY2VsbD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRhaW5lciBtYXRDb2x1bW5EZWY9XCJkZWxldGVcIj5cbiAgICAgICAgPG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZlxuICAgICAgICAgID57eydEZWxldGUnfHRyYW5zbG9jb319PC9tYXQtaGVhZGVyLWNlbGxcbiAgICAgICAgPlxuICAgICAgICA8bWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93OyBsZXQgaWR4ID0gaW5kZXhcIj5cbiAgICAgICAgICA8bWF0LWljb24gKGNsaWNrKT1cImRlbGV0ZVJvdyhpZHgpXCI+ZGVsZXRlPC9tYXQtaWNvbj5cbiAgICAgICAgPC9tYXQtY2VsbD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8bWF0LWhlYWRlci1yb3cgKm1hdEhlYWRlclJvd0RlZj1cImRpc3BsYXllZENvbHVtbnNcIj48L21hdC1oZWFkZXItcm93PlxuICAgICAgPG1hdC1yb3cgKm1hdFJvd0RlZj1cImxldCByb3c7IGNvbHVtbnM6IGRpc3BsYXllZENvbHVtbnM7XCI+PC9tYXQtcm93PlxuICAgIDwvbWF0LXRhYmxlPlxuICA8L25nLXRlbXBsYXRlPlxuPC9kaXY+XG4iXX0=