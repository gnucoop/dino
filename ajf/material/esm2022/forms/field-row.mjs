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
import { AjfFieldType, AjfNodeType } from '@ajf/core/forms';
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
     * Three kinds of node carry no information of their own and are kept out of
     * the layout: a container node, which is only a bracket around the fields it
     * holds and has no fieldType to render; a formula field with no label, which
     * only feeds other fields; and a note with no body -- the renderer synthesises
     * one of those to carry a node group's label, and a group is meant to show
     * nothing of itself.
     */
    get hidden() {
        const node = this.instance?.node;
        // Truthy, not `=== false`: a visibility condition is an arbitrary expression
        // and the renderer stores whatever it returns, so an unanswered field can
        // leave `visible` at null rather than at false.
        if (node == null || !this.instance.visible) {
            return true;
        }
        if (node.nodeType !== AjfNodeType.AjfField) {
            return true;
        }
        if (node.fieldType === AjfFieldType.Empty) {
            return !node.HTML;
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
        } }, dependencies: [i1.NgClass, i1.NgIf, i2.MatIcon, i3.MatTooltip, i4.AjfFormField, i5.TranslocoPipe, i6.AjfAsFieldInstanceErrorsPipe, i6.AjfFieldTypeLabelPipe], styles: ["ajf-field-row{display:block}ajf-field-row.ajf-hidden-row{display:none}ajf-field-row .ajf-field-row{display:flex;flex-wrap:nowrap;align-items:flex-start;gap:var(--ajf-gap);box-sizing:border-box;padding:10px 20px;border-bottom:1px solid var(--ajf-border);background:var(--ajf-surface);font-family:var(--ajf-font-sans)}ajf-field-row .ajf-field-label{display:flex;flex:0 0 var(--ajf-label-col);flex-direction:column;justify-content:center;gap:2px;min-height:var(--ajf-control-h);max-width:var(--ajf-label-col)}ajf-field-row .ajf-field-label .ajf-field-label-line{display:flex;align-items:center;gap:6px}ajf-field-row .ajf-field-label label{color:var(--ajf-text);font-size:14px;font-weight:500;line-height:1.35}ajf-field-row .ajf-field-label .ajf-field-type-name{color:var(--ajf-text-muted);font-size:12px;line-height:1.3}ajf-field-row .ajf-field-label .ajf-required{color:var(--ajf-danger);font-weight:600}ajf-field-row .ajf-field-label .ajf-hint-icon{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;color:var(--ajf-text-muted);font-size:16px;line-height:1;cursor:help}ajf-field-row .ajf-field-control{display:flex;flex:1 1 auto;flex-wrap:wrap;align-items:center;gap:8px;min-width:0}ajf-field-row .ajf-field-control>ajf-field{flex:1 1 auto;min-width:0}ajf-field-row .ajf-field-side{display:flex;flex:0 0 var(--ajf-side-col);align-items:center;min-height:var(--ajf-control-h);max-width:var(--ajf-side-col)}ajf-field-row .ajf-field-side .ajf-field-hint-text{color:var(--ajf-text-muted);font-size:13px}ajf-field-row .ajf-field-side .ajf-field-error-message{color:var(--ajf-danger);font-size:13px}ajf-field-row .ajf-normal .ajf-field-control{max-width:none}ajf-field-row .ajf-small .ajf-field-control{max-width:420px}ajf-field-row .ajf-smaller .ajf-field-control{max-width:320px}ajf-field-row .ajf-tiny .ajf-field-control{max-width:220px}ajf-field-row .ajf-mini .ajf-field-control{max-width:140px}ajf-field-row .ajf-field-row.ajf-invalid{background:color-mix(in srgb,var(--ajf-danger-bg) 45%,var(--ajf-surface))}ajf-field-row .ajf-field-row.ajf-invalid .ajf-control,ajf-field-row .ajf-field-row.ajf-invalid input.ajf-control,ajf-field-row .ajf-field-row.ajf-invalid .mat-mdc-select-trigger{border-color:var(--ajf-danger)}ajf-field-row .ajf-field-row.ajf-readonly .ajf-field-side{flex-basis:auto}ajf-field-row .ajf-note-row .ajf-field-control,ajf-field-row .ajf-field-type-1 .ajf-field-control,ajf-field-row .ajf-field-type-11 .ajf-field-control{max-width:none}@media (width <= 900px){ajf-field-row .ajf-field-row{flex-wrap:wrap;padding:12px 16px}ajf-field-row .ajf-field-label,ajf-field-row .ajf-field-side{flex-basis:100%;max-width:none;min-height:0}ajf-field-row .ajf-field-control{flex-basis:100%}}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFieldRow, [{
        type: Component,
        args: [{ selector: 'ajf-field-row', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div\n  *ngIf=\"!hidden\"\n  class=\"ajf-field-row\"\n  [class.ajf-invalid]=\"!instance.valid\"\n  [class.ajf-readonly]=\"readonly\"\n  [class.ajf-note-row]=\"isNote\"\n  [ngClass]=\"'ajf-' + instance.node.size + ' ajf-field-type-' + instance.node.fieldType\"\n>\n  <div class=\"ajf-field-label\">\n    <span class=\"ajf-field-label-line\">\n      <label [attr.id]=\"instance.node.name\" [innerHTML]=\"instance.node.label | transloco\"></label>\n      <span class=\"ajf-required\" *ngIf=\"required\" aria-hidden=\"true\">*</span>\n      <mat-icon\n        class=\"ajf-hint-icon\"\n        *ngIf=\"instance.node.hint as hint\"\n        [matTooltip]=\"hint | transloco\"\n        matTooltipPosition=\"right\"\n        >{{ instance.node.hintIcon || 'help' }}</mat-icon\n      >\n    </span>\n    <!-- A note carries prose, not a value, so naming its type says nothing. -->\n    <ng-container *ngIf=\"!isNote\">\n      <span class=\"ajf-field-type-name\" *ngIf=\"instance | ajfFieldTypeLabel as type\"\n        >{{ type.name | transloco }}<ng-container *ngIf=\"type.detailValue\"> &middot;\n          {{ type.detailValue }}<ng-container *ngIf=\"type.detailUnit\">\n            {{ type.detailUnit | transloco }}</ng-container\n          ></ng-container\n        ></span\n      >\n    </ng-container>\n  </div>\n\n  <div class=\"ajf-field-control\">\n    <ajf-field\n      [instance]=\"instance\"\n      [readonly]=\"readonly\"\n      [id]=\"'field_entry_' + instance.node.id\"\n    ></ajf-field>\n  </div>\n\n  <div class=\"ajf-field-side\">\n    <span class=\"ajf-field-error-message\" *ngIf=\"!instance.valid\">{{\n      instance | ajfAsFieldInstanceErrors | transloco\n    }}</span>\n    <span class=\"ajf-field-hint-text\" *ngIf=\"instance.valid && instance.node.description\">{{\n      instance.node.description | transloco\n    }}</span>\n  </div>\n</div>\n", styles: ["ajf-field-row{display:block}ajf-field-row.ajf-hidden-row{display:none}ajf-field-row .ajf-field-row{display:flex;flex-wrap:nowrap;align-items:flex-start;gap:var(--ajf-gap);box-sizing:border-box;padding:10px 20px;border-bottom:1px solid var(--ajf-border);background:var(--ajf-surface);font-family:var(--ajf-font-sans)}ajf-field-row .ajf-field-label{display:flex;flex:0 0 var(--ajf-label-col);flex-direction:column;justify-content:center;gap:2px;min-height:var(--ajf-control-h);max-width:var(--ajf-label-col)}ajf-field-row .ajf-field-label .ajf-field-label-line{display:flex;align-items:center;gap:6px}ajf-field-row .ajf-field-label label{color:var(--ajf-text);font-size:14px;font-weight:500;line-height:1.35}ajf-field-row .ajf-field-label .ajf-field-type-name{color:var(--ajf-text-muted);font-size:12px;line-height:1.3}ajf-field-row .ajf-field-label .ajf-required{color:var(--ajf-danger);font-weight:600}ajf-field-row .ajf-field-label .ajf-hint-icon{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;color:var(--ajf-text-muted);font-size:16px;line-height:1;cursor:help}ajf-field-row .ajf-field-control{display:flex;flex:1 1 auto;flex-wrap:wrap;align-items:center;gap:8px;min-width:0}ajf-field-row .ajf-field-control>ajf-field{flex:1 1 auto;min-width:0}ajf-field-row .ajf-field-side{display:flex;flex:0 0 var(--ajf-side-col);align-items:center;min-height:var(--ajf-control-h);max-width:var(--ajf-side-col)}ajf-field-row .ajf-field-side .ajf-field-hint-text{color:var(--ajf-text-muted);font-size:13px}ajf-field-row .ajf-field-side .ajf-field-error-message{color:var(--ajf-danger);font-size:13px}ajf-field-row .ajf-normal .ajf-field-control{max-width:none}ajf-field-row .ajf-small .ajf-field-control{max-width:420px}ajf-field-row .ajf-smaller .ajf-field-control{max-width:320px}ajf-field-row .ajf-tiny .ajf-field-control{max-width:220px}ajf-field-row .ajf-mini .ajf-field-control{max-width:140px}ajf-field-row .ajf-field-row.ajf-invalid{background:color-mix(in srgb,var(--ajf-danger-bg) 45%,var(--ajf-surface))}ajf-field-row .ajf-field-row.ajf-invalid .ajf-control,ajf-field-row .ajf-field-row.ajf-invalid input.ajf-control,ajf-field-row .ajf-field-row.ajf-invalid .mat-mdc-select-trigger{border-color:var(--ajf-danger)}ajf-field-row .ajf-field-row.ajf-readonly .ajf-field-side{flex-basis:auto}ajf-field-row .ajf-note-row .ajf-field-control,ajf-field-row .ajf-field-type-1 .ajf-field-control,ajf-field-row .ajf-field-type-11 .ajf-field-control{max-width:none}@media (width <= 900px){ajf-field-row .ajf-field-row{flex-wrap:wrap;padding:12px 16px}ajf-field-row .ajf-field-label,ajf-field-row .ajf-field-side{flex-basis:100%;max-width:none;min-height:0}ajf-field-row .ajf-field-control{flex-basis:100%}}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }], { instance: [{
            type: Input
        }], readonly: [{
            type: Input
        }], hidden: [{
            type: HostBinding,
            args: ['class.ajf-hidden-row']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFieldRow, { className: "AjfFieldRow", filePath: "field-row.ts", lineNumber: 51 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtcm93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvZm9ybXMvc3JjL2ZpZWxkLXJvdy50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm1zL3NyYy9maWVsZC1yb3cuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQWtDLFlBQVksRUFBRSxXQUFXLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMzRixPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxXQUFXLEVBQ1gsS0FBSyxFQUVMLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDOzs7Ozs7Ozs7SUN0QjVCLGdDQUErRDtJQUFBLGlCQUFDO0lBQUEsaUJBQU87OztJQUN2RSxvQ0FLRzs7SUFBQSxZQUFzQztJQUFBLGlCQUN4Qzs7OztJQUhDLDBEQUErQjtJQUU5QixlQUFzQztJQUF0Qyw2REFBc0M7OztJQU9mLDZCQUFzQztJQUMxRCxZQUFpQzs7Ozs7SUFBakMsY0FBaUM7SUFBakMsd0VBQWlDOzs7SUFGVCw2QkFBdUM7SUFBQyxZQUM1QztJQUFBLHlIQUFzQzs7OztJQURNLGNBQzVDO0lBRDRDLDBEQUM1QztJQUFlLGNBQXFCO0lBQXJCLHlDQUFxQjs7O0lBRjlELGdDQUNHO0lBQUEsWUFBMkI7O0lBQUEsMEdBQXVDO0lBSWxFLGlCQUNGOzs7SUFMRSxjQUEyQjtJQUEzQix3REFBMkI7SUFBZSxlQUFzQjtJQUF0QiwwQ0FBc0I7OztJQUZyRSw2QkFBOEI7SUFDNUIsb0ZBQ0c7Ozs7O0lBRGdDLGNBQW1DO0lBQW5DLDREQUFtQzs7O0lBbUJ4RSxnQ0FBOEQ7SUFBQSxZQUU1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QUE2RTtJQUM3RSxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsS0FBSyxZQUFZLENBQUMsS0FBSyxDQUFDO0lBQzlELENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLElBQUksSUFBSSxDQUFDO0lBQzFELENBQUM7NEdBckVVLFdBQVc7b0VBQVgsV0FBVztZQUFYLDRDQUFXOztZQ2xEeEIsOERBT0M7O1lBTkUsa0NBQWE7OztpRkRpREgsV0FBVztjQVB2QixTQUFTOzJCQUNFLGVBQWUsbUJBR1IsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTtrREFJakMsUUFBUTtrQkFEWCxLQUFLO1lBd0JGLFFBQVE7a0JBRFgsS0FBSztZQXFCRixNQUFNO2tCQURULFdBQVc7bUJBQUMsc0JBQXNCOztrRkE1Q3hCLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRW1wdHlGaWVsZCwgQWpmRmllbGRJbnN0YW5jZSwgQWpmRmllbGRUeXBlLCBBamZOb2RlVHlwZX0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBPbmUgZmllbGQgb2YgYSBzbGlkZSwgbGFpZCBvdXQgYXMgYSByb3c6IHR5cGUgYmFkZ2UsIGxhYmVsLCBjb250cm9sLCBhbmQgYVxuICogcmlnaHQtaGFuZCBjb2x1bW4gY2FycnlpbmcgZWl0aGVyIHRoZSBmaWVsZCBkZXNjcmlwdGlvbiBvciBpdHMgdmFsaWRhdGlvblxuICogZXJyb3IuXG4gKlxuICogQm90aCB0aGUgcGxhaW4gYW5kIHRoZSByZXBlYXRpbmcgc2xpZGUgYnJhbmNoZXMgb2YgdGhlIHJlbmRlcmVyIHJlbmRlciB0aHJvdWdoXG4gKiB0aGlzIGNvbXBvbmVudCwgc28gdGhlIHJvdyBsYXlvdXQgaXMgZGVmaW5lZCBpbiBleGFjdGx5IG9uZSBwbGFjZS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWZpZWxkLXJvdycsXG4gIHRlbXBsYXRlVXJsOiAnZmllbGQtcm93Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnZmllbGQtcm93LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZpZWxkUm93IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQElucHV0KClcbiAgc2V0IGluc3RhbmNlKGluc3RhbmNlOiBBamZGaWVsZEluc3RhbmNlKSB7XG4gICAgdGhpcy5faW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICAvLyBWYWxpZGl0eSwgdmlzaWJpbGl0eSBhbmQgdGhlIGVycm9yIGxpc3QgYXJlIG11dGF0ZWQgaW4gcGxhY2Ugb24gdGhlXG4gICAgLy8gaW5zdGFuY2UsIHNvIHRoZSByb3cgaGFzIHRvIGJlIHRvbGQgdG8gcmUtY2hlY2sgaXRzZWxmIHRoZSBzYW1lIHdheSB0aGVcbiAgICAvLyBmaWVsZCBjb21wb25lbnRzIGRvLlxuICAgIHRoaXMuX2luc3RhbmNlU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5faW5zdGFuY2VTdWIgPSBpbnN0YW5jZVxuICAgICAgPyBpbnN0YW5jZS51cGRhdGVkRXZ0LnN1YnNjcmliZSgoKSA9PiB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCkpXG4gICAgICA6IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgfVxuICBnZXQgaW5zdGFuY2UoKTogQWpmRmllbGRJbnN0YW5jZSB7XG4gICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xuICB9XG4gIHByaXZhdGUgX2luc3RhbmNlITogQWpmRmllbGRJbnN0YW5jZTtcbiAgcHJpdmF0ZSBfaW5zdGFuY2VTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2luc3RhbmNlU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgcmVhZG9ubHkocmVhZG9ubHk6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZWFkb25seSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShyZWFkb25seSk7XG4gIH1cbiAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZWFkb25seTtcbiAgfVxuICBwcml2YXRlIF9yZWFkb25seSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBSb3dzIGRyb3Agb3V0IG9uIHRoZSBob3N0IGVsZW1lbnQgcmF0aGVyIHRoYW4gaW5zaWRlIGl0LCBzbyB0aGF0IGEgaGlkZGVuXG4gICAqIGZpZWxkIGxlYXZlcyBubyBlbXB0eSBjZWxsIGJlaGluZCB3aGVuIHJvd3MgYXJlIGxhaWQgb3V0IGluIGNvbHVtbnMuXG4gICAqXG4gICAqIFRocmVlIGtpbmRzIG9mIG5vZGUgY2Fycnkgbm8gaW5mb3JtYXRpb24gb2YgdGhlaXIgb3duIGFuZCBhcmUga2VwdCBvdXQgb2ZcbiAgICogdGhlIGxheW91dDogYSBjb250YWluZXIgbm9kZSwgd2hpY2ggaXMgb25seSBhIGJyYWNrZXQgYXJvdW5kIHRoZSBmaWVsZHMgaXRcbiAgICogaG9sZHMgYW5kIGhhcyBubyBmaWVsZFR5cGUgdG8gcmVuZGVyOyBhIGZvcm11bGEgZmllbGQgd2l0aCBubyBsYWJlbCwgd2hpY2hcbiAgICogb25seSBmZWVkcyBvdGhlciBmaWVsZHM7IGFuZCBhIG5vdGUgd2l0aCBubyBib2R5IC0tIHRoZSByZW5kZXJlciBzeW50aGVzaXNlc1xuICAgKiBvbmUgb2YgdGhvc2UgdG8gY2FycnkgYSBub2RlIGdyb3VwJ3MgbGFiZWwsIGFuZCBhIGdyb3VwIGlzIG1lYW50IHRvIHNob3dcbiAgICogbm90aGluZyBvZiBpdHNlbGYuXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFqZi1oaWRkZW4tcm93JylcbiAgZ2V0IGhpZGRlbigpOiBib29sZWFuIHtcbiAgICBjb25zdCBub2RlID0gdGhpcy5pbnN0YW5jZT8ubm9kZTtcbiAgICAvLyBUcnV0aHksIG5vdCBgPT09IGZhbHNlYDogYSB2aXNpYmlsaXR5IGNvbmRpdGlvbiBpcyBhbiBhcmJpdHJhcnkgZXhwcmVzc2lvblxuICAgIC8vIGFuZCB0aGUgcmVuZGVyZXIgc3RvcmVzIHdoYXRldmVyIGl0IHJldHVybnMsIHNvIGFuIHVuYW5zd2VyZWQgZmllbGQgY2FuXG4gICAgLy8gbGVhdmUgYHZpc2libGVgIGF0IG51bGwgcmF0aGVyIHRoYW4gYXQgZmFsc2UuXG4gICAgaWYgKG5vZGUgPT0gbnVsbCB8fCAhdGhpcy5pbnN0YW5jZS52aXNpYmxlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG5vZGUubm9kZVR5cGUgIT09IEFqZk5vZGVUeXBlLkFqZkZpZWxkKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG5vZGUuZmllbGRUeXBlID09PSBBamZGaWVsZFR5cGUuRW1wdHkpIHtcbiAgICAgIHJldHVybiAhKG5vZGUgYXMgQWpmRW1wdHlGaWVsZCkuSFRNTDtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGUuZmllbGRUeXBlID09PSBBamZGaWVsZFR5cGUuRm9ybXVsYSAmJiBub2RlLmxhYmVsID09PSAnJztcbiAgfVxuXG4gIC8qKiBOb3RlcyByZW5kZXIgdGhlaXIgb3duIGJsb2NrIGFuZCBuZXZlciBnZXQgYSBjb250cm9sIGJvcmRlciBhcm91bmQgaXQuICovXG4gIGdldCBpc05vdGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U/Lm5vZGUuZmllbGRUeXBlID09PSBBamZGaWVsZFR5cGUuRW1wdHk7XG4gIH1cblxuICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U/Lm5vZGUudmFsaWRhdGlvbj8ubm90RW1wdHkgIT0gbnVsbDtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yZWFkb25seTogQm9vbGVhbklucHV0O1xufVxuIiwiPGRpdlxuICAqbmdJZj1cIiFoaWRkZW5cIlxuICBjbGFzcz1cImFqZi1maWVsZC1yb3dcIlxuICBbY2xhc3MuYWpmLWludmFsaWRdPVwiIWluc3RhbmNlLnZhbGlkXCJcbiAgW2NsYXNzLmFqZi1yZWFkb25seV09XCJyZWFkb25seVwiXG4gIFtjbGFzcy5hamYtbm90ZS1yb3ddPVwiaXNOb3RlXCJcbiAgW25nQ2xhc3NdPVwiJ2FqZi0nICsgaW5zdGFuY2Uubm9kZS5zaXplICsgJyBhamYtZmllbGQtdHlwZS0nICsgaW5zdGFuY2Uubm9kZS5maWVsZFR5cGVcIlxuPlxuICA8ZGl2IGNsYXNzPVwiYWpmLWZpZWxkLWxhYmVsXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJhamYtZmllbGQtbGFiZWwtbGluZVwiPlxuICAgICAgPGxhYmVsIFthdHRyLmlkXT1cImluc3RhbmNlLm5vZGUubmFtZVwiIFtpbm5lckhUTUxdPVwiaW5zdGFuY2Uubm9kZS5sYWJlbCB8IHRyYW5zbG9jb1wiPjwvbGFiZWw+XG4gICAgICA8c3BhbiBjbGFzcz1cImFqZi1yZXF1aXJlZFwiICpuZ0lmPVwicmVxdWlyZWRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj4qPC9zcGFuPlxuICAgICAgPG1hdC1pY29uXG4gICAgICAgIGNsYXNzPVwiYWpmLWhpbnQtaWNvblwiXG4gICAgICAgICpuZ0lmPVwiaW5zdGFuY2Uubm9kZS5oaW50IGFzIGhpbnRcIlxuICAgICAgICBbbWF0VG9vbHRpcF09XCJoaW50IHwgdHJhbnNsb2NvXCJcbiAgICAgICAgbWF0VG9vbHRpcFBvc2l0aW9uPVwicmlnaHRcIlxuICAgICAgICA+e3sgaW5zdGFuY2Uubm9kZS5oaW50SWNvbiB8fCAnaGVscCcgfX08L21hdC1pY29uXG4gICAgICA+XG4gICAgPC9zcGFuPlxuICAgIDwhLS0gQSBub3RlIGNhcnJpZXMgcHJvc2UsIG5vdCBhIHZhbHVlLCBzbyBuYW1pbmcgaXRzIHR5cGUgc2F5cyBub3RoaW5nLiAtLT5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWlzTm90ZVwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJhamYtZmllbGQtdHlwZS1uYW1lXCIgKm5nSWY9XCJpbnN0YW5jZSB8IGFqZkZpZWxkVHlwZUxhYmVsIGFzIHR5cGVcIlxuICAgICAgICA+e3sgdHlwZS5uYW1lIHwgdHJhbnNsb2NvIH19PG5nLWNvbnRhaW5lciAqbmdJZj1cInR5cGUuZGV0YWlsVmFsdWVcIj4gJm1pZGRvdDtcbiAgICAgICAgICB7eyB0eXBlLmRldGFpbFZhbHVlIH19PG5nLWNvbnRhaW5lciAqbmdJZj1cInR5cGUuZGV0YWlsVW5pdFwiPlxuICAgICAgICAgICAge3sgdHlwZS5kZXRhaWxVbml0IHwgdHJhbnNsb2NvIH19PC9uZy1jb250YWluZXJcbiAgICAgICAgICA+PC9uZy1jb250YWluZXJcbiAgICAgICAgPjwvc3BhblxuICAgICAgPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwiYWpmLWZpZWxkLWNvbnRyb2xcIj5cbiAgICA8YWpmLWZpZWxkXG4gICAgICBbaW5zdGFuY2VdPVwiaW5zdGFuY2VcIlxuICAgICAgW3JlYWRvbmx5XT1cInJlYWRvbmx5XCJcbiAgICAgIFtpZF09XCInZmllbGRfZW50cnlfJyArIGluc3RhbmNlLm5vZGUuaWRcIlxuICAgID48L2FqZi1maWVsZD5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cImFqZi1maWVsZC1zaWRlXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJhamYtZmllbGQtZXJyb3ItbWVzc2FnZVwiICpuZ0lmPVwiIWluc3RhbmNlLnZhbGlkXCI+e3tcbiAgICAgIGluc3RhbmNlIHwgYWpmQXNGaWVsZEluc3RhbmNlRXJyb3JzIHwgdHJhbnNsb2NvXG4gICAgfX08L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJhamYtZmllbGQtaGludC10ZXh0XCIgKm5nSWY9XCJpbnN0YW5jZS52YWxpZCAmJiBpbnN0YW5jZS5ub2RlLmRlc2NyaXB0aW9uXCI+e3tcbiAgICAgIGluc3RhbmNlLm5vZGUuZGVzY3JpcHRpb24gfCB0cmFuc2xvY29cbiAgICB9fTwvc3Bhbj5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==