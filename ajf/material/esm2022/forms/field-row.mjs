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
import { AjfFieldType } from '@ajf/core/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation, } from '@angular/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/material/icon";
import * as i3 from "@angular/material/tooltip";
import * as i4 from "./field";
import * as i5 from "@ngneat/transloco";
import * as i6 from "@ajf/core/forms";
function AjfFieldRow_div_0_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 13);
    i0.ɵɵtext(1, "*");
    i0.ɵɵelementEnd();
} }
function AjfFieldRow_div_0_mat_icon_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 14);
    i0.ɵɵpipe(1, "transloco");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const hint_r1 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("matTooltip", i0.ɵɵpipeBind1(1, 2, hint_r1));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.instance.node.hintIcon || "help");
} }
function AjfFieldRow_div_0_ng_container_7_span_1_ng_container_3_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const type_r3 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, type_r3.detailUnit), "");
} }
function AjfFieldRow_div_0_ng_container_7_span_1_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵtemplate(2, AjfFieldRow_div_0_ng_container_7_span_1_ng_container_3_ng_container_2_Template, 3, 3, "ng-container", 7);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const type_r3 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" \u00B7 ", type_r3.detailValue, "");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", type_r3.detailUnit);
} }
function AjfFieldRow_div_0_ng_container_7_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵtemplate(3, AjfFieldRow_div_0_ng_container_7_span_1_ng_container_3_Template, 3, 2, "ng-container", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r3 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, type_r3.name));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", type_r3.detailValue);
} }
function AjfFieldRow_div_0_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFieldRow_div_0_ng_container_7_span_1_Template, 4, 4, "span", 15);
    i0.ɵɵpipe(2, "ajfFieldTypeLabel");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(2, 1, ctx_r1.instance));
} }
function AjfFieldRow_div_0_span_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 17);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "ajfAsFieldInstanceErrors");
    i0.ɵɵpipe(3, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 3, i0.ɵɵpipeBind1(2, 1, ctx_r1.instance)));
} }
function AjfFieldRow_div_0_span_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 18);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.instance.node.description));
} }
function AjfFieldRow_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "span", 3);
    i0.ɵɵelement(3, "label", 4);
    i0.ɵɵpipe(4, "transloco");
    i0.ɵɵtemplate(5, AjfFieldRow_div_0_span_5_Template, 2, 0, "span", 5)(6, AjfFieldRow_div_0_mat_icon_6_Template, 3, 4, "mat-icon", 6);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, AjfFieldRow_div_0_ng_container_7_Template, 3, 3, "ng-container", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 8);
    i0.ɵɵelement(9, "ajf-field", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 10);
    i0.ɵɵtemplate(11, AjfFieldRow_div_0_span_11_Template, 4, 5, "span", 11)(12, AjfFieldRow_div_0_span_12_Template, 3, 3, "span", 12);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("ajf-invalid", !ctx_r1.instance.valid)("ajf-readonly", ctx_r1.readonly)("ajf-note-row", ctx_r1.isNote);
    i0.ɵɵproperty("ngClass", "ajf-" + ctx_r1.instance.node.size + " ajf-field-type-" + ctx_r1.instance.node.fieldType);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(4, 17, ctx_r1.instance.node.label), i0.ɵɵsanitizeHtml);
    i0.ɵɵattribute("id", ctx_r1.instance.node.name);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.required);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.instance.node.hint);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.isNote);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("instance", ctx_r1.instance)("readonly", ctx_r1.readonly)("id", "field_entry_" + ctx_r1.instance.node.id);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r1.instance.valid);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.instance.valid && ctx_r1.instance.node.description);
} }
/**
 * One field of a slide, laid out as a row: type badge, label, control, and a
 * right-hand column carrying either the field description or its validation
 * error.
 *
 * Both the plain and the repeating slide branches of the renderer render through
 * this component, so the row layout is defined in exactly one place.
 */
export class AjfFieldRow {
    set instance(instance) {
        this._instance = instance;
        // Validity, visibility and the error list are mutated in place on the
        // instance, so the row has to be told to re-check itself the same way the
        // field components do.
        this._instanceSub.unsubscribe();
        this._instanceSub = instance
            ? instance.updatedEvt.subscribe(() => this._cdr.markForCheck())
            : Subscription.EMPTY;
    }
    get instance() {
        return this._instance;
    }
    constructor(_cdr) {
        this._cdr = _cdr;
        this._instanceSub = Subscription.EMPTY;
        this._readonly = false;
    }
    ngOnDestroy() {
        this._instanceSub.unsubscribe();
    }
    set readonly(readonly) {
        this._readonly = coerceBooleanProperty(readonly);
    }
    get readonly() {
        return this._readonly;
    }
    /**
     * Rows drop out on the host element rather than inside it, so that a hidden
     * field leaves no empty cell behind when rows are laid out in columns.
     *
     * A formula field with no label carries no information of its own -- it only
     * feeds other fields -- so it is kept out of the layout too.
     */
    get hidden() {
        const node = this.instance?.node;
        if (node == null || this.instance.visible === false) {
            return true;
        }
        return node.fieldType === AjfFieldType.Formula && node.label === '';
    }
    /** Notes render their own block and never get a control border around it. */
    get isNote() {
        return this.instance?.node.fieldType === AjfFieldType.Empty;
    }
    get required() {
        return this.instance?.node.validation?.notEmpty != null;
    }
    static { this.ɵfac = function AjfFieldRow_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFieldRow)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFieldRow, selectors: [["ajf-field-row"]], hostVars: 2, hostBindings: function AjfFieldRow_HostBindings(rf, ctx) { if (rf & 2) {
            i0.ɵɵclassProp("ajf-hidden-row", ctx.hidden);
        } }, inputs: { instance: "instance", readonly: "readonly" }, decls: 1, vars: 1, consts: [["class", "ajf-field-row", 3, "ajf-invalid", "ajf-readonly", "ajf-note-row", "ngClass", 4, "ngIf"], [1, "ajf-field-row", 3, "ngClass"], [1, "ajf-field-label"], [1, "ajf-field-label-line"], [3, "innerHTML"], ["class", "ajf-required", "aria-hidden", "true", 4, "ngIf"], ["class", "ajf-hint-icon", "matTooltipPosition", "right", 3, "matTooltip", 4, "ngIf"], [4, "ngIf"], [1, "ajf-field-control"], [3, "instance", "readonly", "id"], [1, "ajf-field-side"], ["class", "ajf-field-error-message", 4, "ngIf"], ["class", "ajf-field-hint-text", 4, "ngIf"], ["aria-hidden", "true", 1, "ajf-required"], ["matTooltipPosition", "right", 1, "ajf-hint-icon", 3, "matTooltip"], ["class", "ajf-field-type-name", 4, "ngIf"], [1, "ajf-field-type-name"], [1, "ajf-field-error-message"], [1, "ajf-field-hint-text"]], template: function AjfFieldRow_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfFieldRow_div_0_Template, 13, 19, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", !ctx.hidden);
        } }, dependencies: [i1.NgClass, i1.NgIf, i2.MatIcon, i3.MatTooltip, i4.AjfFormField, i5.TranslocoPipe, i6.AjfAsFieldInstanceErrorsPipe, i6.AjfFieldTypeLabelPipe], styles: ["ajf-field-row{display:block}ajf-field-row.ajf-hidden-row{display:none}ajf-field-row .ajf-field-row{display:flex;flex-wrap:nowrap;align-items:flex-start;gap:var(--ajf-gap);box-sizing:border-box;padding:10px 20px;border-bottom:1px solid var(--ajf-border);background:var(--ajf-surface);font-family:var(--ajf-font-sans)}ajf-field-row .ajf-field-label{display:flex;flex:0 0 var(--ajf-label-col);flex-direction:column;justify-content:center;gap:2px;min-height:var(--ajf-control-h);max-width:var(--ajf-label-col)}ajf-field-row .ajf-field-label .ajf-field-label-line{display:flex;align-items:center;gap:6px}ajf-field-row .ajf-field-label label{color:var(--ajf-text);font-size:14px;font-weight:500;line-height:1.35}ajf-field-row .ajf-field-label .ajf-field-type-name{color:var(--ajf-text-muted);font-size:12px;line-height:1.3}ajf-field-row .ajf-field-label .ajf-required{color:var(--ajf-danger);font-weight:600}ajf-field-row .ajf-field-label .ajf-hint-icon{width:16px;height:16px;border-radius:50%;background:var(--ajf-border);color:var(--ajf-text-muted);font-size:12px;line-height:16px;cursor:help}ajf-field-row .ajf-field-control{display:flex;flex:1 1 auto;flex-wrap:wrap;align-items:center;gap:8px;min-width:0}ajf-field-row .ajf-field-control>ajf-field{flex:1 1 auto;min-width:0}ajf-field-row .ajf-field-side{display:flex;flex:0 0 var(--ajf-side-col);align-items:center;min-height:var(--ajf-control-h);max-width:var(--ajf-side-col)}ajf-field-row .ajf-field-side .ajf-field-hint-text{color:var(--ajf-text-muted);font-size:13px}ajf-field-row .ajf-field-side .ajf-field-error-message{color:var(--ajf-danger);font-size:13px}ajf-field-row .ajf-normal .ajf-field-control{max-width:none}ajf-field-row .ajf-small .ajf-field-control{max-width:420px}ajf-field-row .ajf-smaller .ajf-field-control{max-width:320px}ajf-field-row .ajf-tiny .ajf-field-control{max-width:220px}ajf-field-row .ajf-mini .ajf-field-control{max-width:140px}ajf-field-row .ajf-field-row.ajf-invalid{background:color-mix(in srgb,var(--ajf-danger-bg) 45%,var(--ajf-surface))}ajf-field-row .ajf-field-row.ajf-invalid .ajf-control,ajf-field-row .ajf-field-row.ajf-invalid input.ajf-control,ajf-field-row .ajf-field-row.ajf-invalid .mat-mdc-select-trigger{border-color:var(--ajf-danger)}ajf-field-row .ajf-field-row.ajf-readonly .ajf-field-side{flex-basis:auto}ajf-field-row .ajf-note-row .ajf-field-control,ajf-field-row .ajf-field-type-1 .ajf-field-control,ajf-field-row .ajf-field-type-11 .ajf-field-control{max-width:none}@media (width <= 900px){ajf-field-row .ajf-field-row{flex-wrap:wrap;padding:12px 16px}ajf-field-row .ajf-field-label,ajf-field-row .ajf-field-side{flex-basis:100%;max-width:none;min-height:0}ajf-field-row .ajf-field-control{flex-basis:100%}}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFieldRow, [{
        type: Component,
        args: [{ selector: 'ajf-field-row', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div\n  *ngIf=\"!hidden\"\n  class=\"ajf-field-row\"\n  [class.ajf-invalid]=\"!instance.valid\"\n  [class.ajf-readonly]=\"readonly\"\n  [class.ajf-note-row]=\"isNote\"\n  [ngClass]=\"'ajf-' + instance.node.size + ' ajf-field-type-' + instance.node.fieldType\"\n>\n  <div class=\"ajf-field-label\">\n    <span class=\"ajf-field-label-line\">\n      <label [attr.id]=\"instance.node.name\" [innerHTML]=\"instance.node.label | transloco\"></label>\n      <span class=\"ajf-required\" *ngIf=\"required\" aria-hidden=\"true\">*</span>\n      <mat-icon\n        class=\"ajf-hint-icon\"\n        *ngIf=\"instance.node.hint as hint\"\n        [matTooltip]=\"hint | transloco\"\n        matTooltipPosition=\"right\"\n        >{{ instance.node.hintIcon || 'help' }}</mat-icon\n      >\n    </span>\n    <!-- A note carries prose, not a value, so naming its type says nothing. -->\n    <ng-container *ngIf=\"!isNote\">\n      <span class=\"ajf-field-type-name\" *ngIf=\"instance | ajfFieldTypeLabel as type\"\n        >{{ type.name | transloco }}<ng-container *ngIf=\"type.detailValue\"> &middot;\n          {{ type.detailValue }}<ng-container *ngIf=\"type.detailUnit\">\n            {{ type.detailUnit | transloco }}</ng-container\n          ></ng-container\n        ></span\n      >\n    </ng-container>\n  </div>\n\n  <div class=\"ajf-field-control\">\n    <ajf-field\n      [instance]=\"instance\"\n      [readonly]=\"readonly\"\n      [id]=\"'field_entry_' + instance.node.id\"\n    ></ajf-field>\n  </div>\n\n  <div class=\"ajf-field-side\">\n    <span class=\"ajf-field-error-message\" *ngIf=\"!instance.valid\">{{\n      instance | ajfAsFieldInstanceErrors | transloco\n    }}</span>\n    <span class=\"ajf-field-hint-text\" *ngIf=\"instance.valid && instance.node.description\">{{\n      instance.node.description | transloco\n    }}</span>\n  </div>\n</div>\n", styles: ["ajf-field-row{display:block}ajf-field-row.ajf-hidden-row{display:none}ajf-field-row .ajf-field-row{display:flex;flex-wrap:nowrap;align-items:flex-start;gap:var(--ajf-gap);box-sizing:border-box;padding:10px 20px;border-bottom:1px solid var(--ajf-border);background:var(--ajf-surface);font-family:var(--ajf-font-sans)}ajf-field-row .ajf-field-label{display:flex;flex:0 0 var(--ajf-label-col);flex-direction:column;justify-content:center;gap:2px;min-height:var(--ajf-control-h);max-width:var(--ajf-label-col)}ajf-field-row .ajf-field-label .ajf-field-label-line{display:flex;align-items:center;gap:6px}ajf-field-row .ajf-field-label label{color:var(--ajf-text);font-size:14px;font-weight:500;line-height:1.35}ajf-field-row .ajf-field-label .ajf-field-type-name{color:var(--ajf-text-muted);font-size:12px;line-height:1.3}ajf-field-row .ajf-field-label .ajf-required{color:var(--ajf-danger);font-weight:600}ajf-field-row .ajf-field-label .ajf-hint-icon{width:16px;height:16px;border-radius:50%;background:var(--ajf-border);color:var(--ajf-text-muted);font-size:12px;line-height:16px;cursor:help}ajf-field-row .ajf-field-control{display:flex;flex:1 1 auto;flex-wrap:wrap;align-items:center;gap:8px;min-width:0}ajf-field-row .ajf-field-control>ajf-field{flex:1 1 auto;min-width:0}ajf-field-row .ajf-field-side{display:flex;flex:0 0 var(--ajf-side-col);align-items:center;min-height:var(--ajf-control-h);max-width:var(--ajf-side-col)}ajf-field-row .ajf-field-side .ajf-field-hint-text{color:var(--ajf-text-muted);font-size:13px}ajf-field-row .ajf-field-side .ajf-field-error-message{color:var(--ajf-danger);font-size:13px}ajf-field-row .ajf-normal .ajf-field-control{max-width:none}ajf-field-row .ajf-small .ajf-field-control{max-width:420px}ajf-field-row .ajf-smaller .ajf-field-control{max-width:320px}ajf-field-row .ajf-tiny .ajf-field-control{max-width:220px}ajf-field-row .ajf-mini .ajf-field-control{max-width:140px}ajf-field-row .ajf-field-row.ajf-invalid{background:color-mix(in srgb,var(--ajf-danger-bg) 45%,var(--ajf-surface))}ajf-field-row .ajf-field-row.ajf-invalid .ajf-control,ajf-field-row .ajf-field-row.ajf-invalid input.ajf-control,ajf-field-row .ajf-field-row.ajf-invalid .mat-mdc-select-trigger{border-color:var(--ajf-danger)}ajf-field-row .ajf-field-row.ajf-readonly .ajf-field-side{flex-basis:auto}ajf-field-row .ajf-note-row .ajf-field-control,ajf-field-row .ajf-field-type-1 .ajf-field-control,ajf-field-row .ajf-field-type-11 .ajf-field-control{max-width:none}@media (width <= 900px){ajf-field-row .ajf-field-row{flex-wrap:wrap;padding:12px 16px}ajf-field-row .ajf-field-label,ajf-field-row .ajf-field-side{flex-basis:100%;max-width:none;min-height:0}ajf-field-row .ajf-field-control{flex-basis:100%}}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }], { instance: [{
            type: Input
        }], readonly: [{
            type: Input
        }], hidden: [{
            type: HostBinding,
            args: ['class.ajf-hidden-row']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFieldRow, { className: "AjfFieldRow", filePath: "field-row.ts", lineNumber: 51 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtcm93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvZm9ybXMvc3JjL2ZpZWxkLXJvdy50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm1zL3NyYy9maWVsZC1yb3cuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQW1CLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQy9ELE9BQU8sRUFBZSxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzFFLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFdBQVcsRUFDWCxLQUFLLEVBRUwsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7Ozs7Ozs7OztJQ3RCNUIsZ0NBQStEO0lBQUEsaUJBQUM7SUFBQSxpQkFBTzs7O0lBQ3ZFLG9DQUtHOztJQUFBLFlBQXNDO0lBQUEsaUJBQ3hDOzs7O0lBSEMsMERBQStCO0lBRTlCLGVBQXNDO0lBQXRDLDZEQUFzQzs7O0lBT2YsNkJBQXNDO0lBQzFELFlBQWlDOzs7OztJQUFqQyxjQUFpQztJQUFqQyx3RUFBaUM7OztJQUZULDZCQUF1QztJQUFDLFlBQzVDO0lBQUEseUhBQXNDOzs7O0lBRE0sY0FDNUM7SUFENEMsMERBQzVDO0lBQWUsY0FBcUI7SUFBckIseUNBQXFCOzs7SUFGOUQsZ0NBQ0c7SUFBQSxZQUEyQjs7SUFBQSwwR0FBdUM7SUFJbEUsaUJBQ0Y7OztJQUxFLGNBQTJCO0lBQTNCLHdEQUEyQjtJQUFlLGVBQXNCO0lBQXRCLDBDQUFzQjs7O0lBRnJFLDZCQUE4QjtJQUM1QixvRkFDRzs7Ozs7SUFEZ0MsY0FBbUM7SUFBbkMsNERBQW1DOzs7SUFtQnhFLGdDQUE4RDtJQUFBLFlBRTVEOzs7SUFBQSxp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eEIsOERBT0M7O1lBTkUsa0NBQWE7OztpRkRpREgsV0FBVztjQVB2QixTQUFTOzJCQUNFLGVBQWUsbUJBR1IsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTtrREFJakMsUUFBUTtrQkFEWCxLQUFLO1lBd0JGLFFBQVE7a0JBRFgsS0FBSztZQWlCRixNQUFNO2tCQURULFdBQVc7bUJBQUMsc0JBQXNCOztrRkF4Q3hCLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRmllbGRJbnN0YW5jZSwgQWpmRmllbGRUeXBlfSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG4vKipcbiAqIE9uZSBmaWVsZCBvZiBhIHNsaWRlLCBsYWlkIG91dCBhcyBhIHJvdzogdHlwZSBiYWRnZSwgbGFiZWwsIGNvbnRyb2wsIGFuZCBhXG4gKiByaWdodC1oYW5kIGNvbHVtbiBjYXJyeWluZyBlaXRoZXIgdGhlIGZpZWxkIGRlc2NyaXB0aW9uIG9yIGl0cyB2YWxpZGF0aW9uXG4gKiBlcnJvci5cbiAqXG4gKiBCb3RoIHRoZSBwbGFpbiBhbmQgdGhlIHJlcGVhdGluZyBzbGlkZSBicmFuY2hlcyBvZiB0aGUgcmVuZGVyZXIgcmVuZGVyIHRocm91Z2hcbiAqIHRoaXMgY29tcG9uZW50LCBzbyB0aGUgcm93IGxheW91dCBpcyBkZWZpbmVkIGluIGV4YWN0bHkgb25lIHBsYWNlLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtZmllbGQtcm93JyxcbiAgdGVtcGxhdGVVcmw6ICdmaWVsZC1yb3cuaHRtbCcsXG4gIHN0eWxlVXJsczogWydmaWVsZC1yb3cuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmRmllbGRSb3cgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBASW5wdXQoKVxuICBzZXQgaW5zdGFuY2UoaW5zdGFuY2U6IEFqZkZpZWxkSW5zdGFuY2UpIHtcbiAgICB0aGlzLl9pbnN0YW5jZSA9IGluc3RhbmNlO1xuICAgIC8vIFZhbGlkaXR5LCB2aXNpYmlsaXR5IGFuZCB0aGUgZXJyb3IgbGlzdCBhcmUgbXV0YXRlZCBpbiBwbGFjZSBvbiB0aGVcbiAgICAvLyBpbnN0YW5jZSwgc28gdGhlIHJvdyBoYXMgdG8gYmUgdG9sZCB0byByZS1jaGVjayBpdHNlbGYgdGhlIHNhbWUgd2F5IHRoZVxuICAgIC8vIGZpZWxkIGNvbXBvbmVudHMgZG8uXG4gICAgdGhpcy5faW5zdGFuY2VTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9pbnN0YW5jZVN1YiA9IGluc3RhbmNlXG4gICAgICA/IGluc3RhbmNlLnVwZGF0ZWRFdnQuc3Vic2NyaWJlKCgpID0+IHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKSlcbiAgICAgIDogU3Vic2NyaXB0aW9uLkVNUFRZO1xuICB9XG4gIGdldCBpbnN0YW5jZSgpOiBBamZGaWVsZEluc3RhbmNlIHtcbiAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XG4gIH1cbiAgcHJpdmF0ZSBfaW5zdGFuY2UhOiBBamZGaWVsZEluc3RhbmNlO1xuICBwcml2YXRlIF9pbnN0YW5jZVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5faW5zdGFuY2VTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCByZWFkb25seShyZWFkb25seTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlYWRvbmx5ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHJlYWRvbmx5KTtcbiAgfVxuICBnZXQgcmVhZG9ubHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlYWRvbmx5O1xuICB9XG4gIHByaXZhdGUgX3JlYWRvbmx5ID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFJvd3MgZHJvcCBvdXQgb24gdGhlIGhvc3QgZWxlbWVudCByYXRoZXIgdGhhbiBpbnNpZGUgaXQsIHNvIHRoYXQgYSBoaWRkZW5cbiAgICogZmllbGQgbGVhdmVzIG5vIGVtcHR5IGNlbGwgYmVoaW5kIHdoZW4gcm93cyBhcmUgbGFpZCBvdXQgaW4gY29sdW1ucy5cbiAgICpcbiAgICogQSBmb3JtdWxhIGZpZWxkIHdpdGggbm8gbGFiZWwgY2FycmllcyBubyBpbmZvcm1hdGlvbiBvZiBpdHMgb3duIC0tIGl0IG9ubHlcbiAgICogZmVlZHMgb3RoZXIgZmllbGRzIC0tIHNvIGl0IGlzIGtlcHQgb3V0IG9mIHRoZSBsYXlvdXQgdG9vLlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hamYtaGlkZGVuLXJvdycpXG4gIGdldCBoaWRkZW4oKTogYm9vbGVhbiB7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXMuaW5zdGFuY2U/Lm5vZGU7XG4gICAgaWYgKG5vZGUgPT0gbnVsbCB8fCB0aGlzLmluc3RhbmNlLnZpc2libGUgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGUuZmllbGRUeXBlID09PSBBamZGaWVsZFR5cGUuRm9ybXVsYSAmJiBub2RlLmxhYmVsID09PSAnJztcbiAgfVxuXG4gIC8qKiBOb3RlcyByZW5kZXIgdGhlaXIgb3duIGJsb2NrIGFuZCBuZXZlciBnZXQgYSBjb250cm9sIGJvcmRlciBhcm91bmQgaXQuICovXG4gIGdldCBpc05vdGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U/Lm5vZGUuZmllbGRUeXBlID09PSBBamZGaWVsZFR5cGUuRW1wdHk7XG4gIH1cblxuICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U/Lm5vZGUudmFsaWRhdGlvbj8ubm90RW1wdHkgIT0gbnVsbDtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yZWFkb25seTogQm9vbGVhbklucHV0O1xufVxuIiwiPGRpdlxuICAqbmdJZj1cIiFoaWRkZW5cIlxuICBjbGFzcz1cImFqZi1maWVsZC1yb3dcIlxuICBbY2xhc3MuYWpmLWludmFsaWRdPVwiIWluc3RhbmNlLnZhbGlkXCJcbiAgW2NsYXNzLmFqZi1yZWFkb25seV09XCJyZWFkb25seVwiXG4gIFtjbGFzcy5hamYtbm90ZS1yb3ddPVwiaXNOb3RlXCJcbiAgW25nQ2xhc3NdPVwiJ2FqZi0nICsgaW5zdGFuY2Uubm9kZS5zaXplICsgJyBhamYtZmllbGQtdHlwZS0nICsgaW5zdGFuY2Uubm9kZS5maWVsZFR5cGVcIlxuPlxuICA8ZGl2IGNsYXNzPVwiYWpmLWZpZWxkLWxhYmVsXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJhamYtZmllbGQtbGFiZWwtbGluZVwiPlxuICAgICAgPGxhYmVsIFthdHRyLmlkXT1cImluc3RhbmNlLm5vZGUubmFtZVwiIFtpbm5lckhUTUxdPVwiaW5zdGFuY2Uubm9kZS5sYWJlbCB8IHRyYW5zbG9jb1wiPjwvbGFiZWw+XG4gICAgICA8c3BhbiBjbGFzcz1cImFqZi1yZXF1aXJlZFwiICpuZ0lmPVwicmVxdWlyZWRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj4qPC9zcGFuPlxuICAgICAgPG1hdC1pY29uXG4gICAgICAgIGNsYXNzPVwiYWpmLWhpbnQtaWNvblwiXG4gICAgICAgICpuZ0lmPVwiaW5zdGFuY2Uubm9kZS5oaW50IGFzIGhpbnRcIlxuICAgICAgICBbbWF0VG9vbHRpcF09XCJoaW50IHwgdHJhbnNsb2NvXCJcbiAgICAgICAgbWF0VG9vbHRpcFBvc2l0aW9uPVwicmlnaHRcIlxuICAgICAgICA+e3sgaW5zdGFuY2Uubm9kZS5oaW50SWNvbiB8fCAnaGVscCcgfX08L21hdC1pY29uXG4gICAgICA+XG4gICAgPC9zcGFuPlxuICAgIDwhLS0gQSBub3RlIGNhcnJpZXMgcHJvc2UsIG5vdCBhIHZhbHVlLCBzbyBuYW1pbmcgaXRzIHR5cGUgc2F5cyBub3RoaW5nLiAtLT5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWlzTm90ZVwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJhamYtZmllbGQtdHlwZS1uYW1lXCIgKm5nSWY9XCJpbnN0YW5jZSB8IGFqZkZpZWxkVHlwZUxhYmVsIGFzIHR5cGVcIlxuICAgICAgICA+e3sgdHlwZS5uYW1lIHwgdHJhbnNsb2NvIH19PG5nLWNvbnRhaW5lciAqbmdJZj1cInR5cGUuZGV0YWlsVmFsdWVcIj4gJm1pZGRvdDtcbiAgICAgICAgICB7eyB0eXBlLmRldGFpbFZhbHVlIH19PG5nLWNvbnRhaW5lciAqbmdJZj1cInR5cGUuZGV0YWlsVW5pdFwiPlxuICAgICAgICAgICAge3sgdHlwZS5kZXRhaWxVbml0IHwgdHJhbnNsb2NvIH19PC9uZy1jb250YWluZXJcbiAgICAgICAgICA+PC9uZy1jb250YWluZXJcbiAgICAgICAgPjwvc3BhblxuICAgICAgPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwiYWpmLWZpZWxkLWNvbnRyb2xcIj5cbiAgICA8YWpmLWZpZWxkXG4gICAgICBbaW5zdGFuY2VdPVwiaW5zdGFuY2VcIlxuICAgICAgW3JlYWRvbmx5XT1cInJlYWRvbmx5XCJcbiAgICAgIFtpZF09XCInZmllbGRfZW50cnlfJyArIGluc3RhbmNlLm5vZGUuaWRcIlxuICAgID48L2FqZi1maWVsZD5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cImFqZi1maWVsZC1zaWRlXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJhamYtZmllbGQtZXJyb3ItbWVzc2FnZVwiICpuZ0lmPVwiIWluc3RhbmNlLnZhbGlkXCI+e3tcbiAgICAgIGluc3RhbmNlIHwgYWpmQXNGaWVsZEluc3RhbmNlRXJyb3JzIHwgdHJhbnNsb2NvXG4gICAgfX08L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJhamYtZmllbGQtaGludC10ZXh0XCIgKm5nSWY9XCJpbnN0YW5jZS52YWxpZCAmJiBpbnN0YW5jZS5ub2RlLmRlc2NyaXB0aW9uXCI+e3tcbiAgICAgIGluc3RhbmNlLm5vZGUuZGVzY3JpcHRpb24gfCB0cmFuc2xvY29cbiAgICB9fTwvc3Bhbj5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==