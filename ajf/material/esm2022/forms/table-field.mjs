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
import { AJF_WARNING_ALERT_SERVICE, AjfTableFieldComponent as CoreTableFieldComponent, } from '@ajf/core/forms';
import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/core/forms";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "@ajf/core/common";
import * as i5 from "./warning-alert-service";
function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "ajfTranslateIfString");
    i0.ɵɵpipe(3, "ajfFormatIfNumber");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const columns_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(3, 3, i0.ɵɵpipeBind1(2, 1, columns_r1[0]), ".0-2"), " ");
} }
function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "ajfTranslateIfString");
    i0.ɵɵpipe(3, "ajfFormatIfNumber");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const c_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(3, 3, i0.ɵɵpipeBind1(2, 1, c_r2), ".0-2"), " ");
} }
function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_ng_container_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "input", 9);
    i0.ɵɵlistener("focusout", function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_ng_container_1_ng_container_1_Template_input_focusout_1_listener() { i0.ɵɵrestoreView(_r3); const contr_r4 = i0.ɵɵnextContext(3).ngIf; return i0.ɵɵresetView(contr_r4.show = false); })("keydown.tab", function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_ng_container_1_ng_container_1_Template_input_keydown_tab_1_listener($event) { i0.ɵɵrestoreView(_r3); const column_r5 = i0.ɵɵnextContext(5).index; const row_r6 = i0.ɵɵnextContext(2).index; const ctx_r6 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r6.goToNextCell($event, row_r6, column_r5)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const contr_r4 = i0.ɵɵnextContext(3).ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("formControl", contr_r4.control);
} }
function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_ng_container_1_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 10);
    i0.ɵɵlistener("focusout", function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_ng_container_1_ng_template_2_Template_input_focusout_0_listener() { i0.ɵɵrestoreView(_r8); const contr_r4 = i0.ɵɵnextContext(3).ngIf; return i0.ɵɵresetView(contr_r4.show = false); })("keydown.tab", function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_ng_container_1_ng_template_2_Template_input_keydown_tab_0_listener($event) { i0.ɵɵrestoreView(_r8); const column_r5 = i0.ɵɵnextContext(5).index; const row_r6 = i0.ɵɵnextContext(2).index; const ctx_r6 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r6.goToNextCell($event, row_r6, column_r5)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const contr_r4 = i0.ɵɵnextContext(3).ngIf;
    i0.ɵɵproperty("type", contr_r4.type)("formControl", contr_r4.control);
} }
function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_ng_container_1_ng_container_1_Template, 2, 1, "ng-container", 8)(2, AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_ng_container_1_ng_template_2_Template, 1, 2, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const genericInput_r9 = i0.ɵɵreference(3);
    const contr_r4 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", contr_r4.type === "number")("ngIfElse", genericInput_r9);
} }
function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 11);
    i0.ɵɵlistener("click", function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_ng_template_3_Template_span_click_0_listener() { i0.ɵɵrestoreView(_r10); const column_r5 = i0.ɵɵnextContext(4).index; const row_r6 = i0.ɵɵnextContext(2).index; const ctx_r6 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r6.goToCell(row_r6, column_r5)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "ajfTranslateIfString");
    i0.ɵɵpipe(3, "ajfFormatIfNumber");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const contr_r4 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(3, 3, i0.ɵɵpipeBind1(2, 1, contr_r4.control.value), ".0-2"));
} }
function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_ng_container_1_Template, 4, 2, "ng-container", 8);
    i0.ɵɵpipe(2, "ajfIsCellEditable");
    i0.ɵɵtemplate(3, AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_ng_template_3_Template, 4, 6, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const plainTextCell_r11 = i0.ɵɵreference(4);
    const contr_r4 = i0.ɵɵnextContext().ngIf;
    const column_r5 = i0.ɵɵnextContext(2).index;
    const row_r6 = i0.ɵɵnextContext(2).index;
    const node_r12 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", contr_r4.show && i0.ɵɵpipeBind1(2, 2, node_r12.rows[row_r6 - 1][column_r5]))("ngIfElse", plainTextCell_r11);
} }
function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_Template, 5, 4, "ng-container", 5);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const contr_r4 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", contr_r4);
} }
function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_Template, 2, 1, "ng-container", 5);
    i0.ɵɵpipe(1, "ajfGetTableCellControl");
} if (rf & 2) {
    const c_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, c_r2));
} }
function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td");
    i0.ɵɵtemplate(1, AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_container_1_Template, 4, 6, "ng-container", 8)(2, AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_Template, 2, 3, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const controlCell_r13 = i0.ɵɵreference(3);
    const row_r6 = i0.ɵɵnextContext(2).index;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", row_r6 === 0)("ngIfElse", controlCell_r13);
} }
function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_Template, 4, 2, "td", 6);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const columns_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", columns_r1[1]);
} }
function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "tr", 7);
    i0.ɵɵpipe(2, "ajfTableRowClass");
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtemplate(4, AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_4_Template, 4, 6, "ng-container", 5);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_Template, 2, 1, "ng-container", 5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const columns_r1 = ctx.$implicit;
    const row_r6 = ctx.index;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", i0.ɵɵpipeBind1(2, 3, row_r6));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", columns_r1.length > 0 && columns_r1[0]);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", columns_r1.length > 1);
} }
function AjfTableFieldComponent_table_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_Template, 6, 5, "ng-container", 6);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r6.instance.controls);
} }
function AjfTableFieldComponent_table_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 4);
    i0.ɵɵtemplate(1, AjfTableFieldComponent_table_0_ng_container_1_Template, 2, 1, "ng-container", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r6.instance.node);
} }
export class AjfTableFieldComponent extends CoreTableFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
    static { this.ɵfac = function AjfTableFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfTableFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfTableFieldComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [["controlCell", ""], ["plainTextCell", ""], ["genericInput", ""], ["class", "ajf-table-field", 4, "ngIf"], [1, "ajf-table-field"], [4, "ngIf"], [4, "ngFor", "ngForOf"], [3, "ngClass"], [4, "ngIf", "ngIfElse"], ["type", "number", "autofocus", "", 3, "focusout", "keydown.tab", "formControl"], ["autofocus", "", 3, "focusout", "keydown.tab", "type", "formControl"], [3, "click"]], template: function AjfTableFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfTableFieldComponent_table_0_Template, 2, 1, "table", 3);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.instance);
        } }, dependencies: [i2.NgClass, i2.NgForOf, i2.NgIf, i3.DefaultValueAccessor, i3.NumberValueAccessor, i3.NgControlStatus, i3.FormControlDirective, i4.FormatIfNumber, i4.TranslateIfString, i1.AjfGetTableCellControlPipe, i1.AjfIsCellEditablePipe, i1.AjfTableRowClass], styles: ["table.ajf-table-field{width:100%;border:1px solid var(--ajf-border);border-collapse:collapse;border-spacing:0;table-layout:fixed;font-size:13px}table.ajf-table-field .ajf-header-row{background:var(--ajf-band)}table.ajf-table-field .ajf-header-row td,table.ajf-table-field .ajf-header-row th{color:var(--ajf-text-muted);font-family:var(--ajf-font-mono);font-size:11px;letter-spacing:.09em;text-transform:uppercase}table.ajf-table-field th,table.ajf-table-field td{position:relative;padding:9px 12px;border-right:1px solid var(--ajf-border);border-bottom:1px solid var(--ajf-border);text-align:left}table.ajf-table-field th:last-child,table.ajf-table-field td:last-child{border-right:0}table.ajf-table-field tr:last-child td{border-bottom:0}table.ajf-table-field tbody tr:hover:not(.ajf-header-row){background:var(--ajf-band)}table.ajf-table-field td span{display:block;width:100%;min-height:1.4em;box-sizing:border-box;font:inherit;cursor:text;outline:none}table.ajf-table-field td input{position:absolute;inset:0;width:100%;box-sizing:border-box;padding:9px 12px;border:1px solid var(--ajf-accent);background:var(--ajf-surface);color:var(--ajf-text);font:inherit;cursor:text;outline:none}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfTableFieldComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<table *ngIf=\"instance\" class=\"ajf-table-field\">\n  <ng-container *ngIf=\"instance.node as node\">\n    <ng-container *ngFor=\"let columns of instance.controls; let row = index\">\n      <tr [ngClass]=\"row | ajfTableRowClass\">\n        <td>\n          <ng-container *ngIf=\"columns.length > 0 && columns[0]\">\n            {{ columns[0] | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}\n          </ng-container>\n        </td>\n        <ng-container *ngIf=\"columns.length > 1\">\n          <td *ngFor=\"let c of columns[1]; let column = index\">\n            <ng-container *ngIf=\"row === 0; else controlCell\">\n              {{ c | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}\n            </ng-container>\n            <ng-template #controlCell>\n              <ng-container *ngIf=\"c|ajfGetTableCellControl as contr\">\n                <ng-container *ngIf=\"contr\">\n                  <ng-container *ngIf=\"contr!.show && (node.rows[row-1][column]|ajfIsCellEditable); else plainTextCell\">\n                    <ng-container *ngIf=\"contr.type === 'number';else genericInput\">\n                      <input (focusout)=\"contr!.show = false\" type=\"number\" [formControl]=\"contr.control\"\n                        (keydown.tab)=\"goToNextCell($event, row, column)\" autofocus />\n                    </ng-container>\n                    <ng-template #genericInput>\n                      <input (focusout)=\"contr!.show = false\" [type]=\"contr.type\" [formControl]=\"contr.control\"\n                        (keydown.tab)=\"goToNextCell($event, row, column)\" autofocus />\n                    </ng-template>\n                  </ng-container>\n\n                  <ng-template #plainTextCell>\n                    <span (click)=\"goToCell(row, column)\">{{ contr.control!.value |\n                      ajfTranslateIfString | ajfFormatIfNumber: '.0-2'\n                      }}</span>\n                  </ng-template>\n                </ng-container>\n              </ng-container>\n            </ng-template>\n          </td>\n        </ng-container>\n      </tr>\n    </ng-container>\n  </ng-container>\n</table>", styles: ["table.ajf-table-field{width:100%;border:1px solid var(--ajf-border);border-collapse:collapse;border-spacing:0;table-layout:fixed;font-size:13px}table.ajf-table-field .ajf-header-row{background:var(--ajf-band)}table.ajf-table-field .ajf-header-row td,table.ajf-table-field .ajf-header-row th{color:var(--ajf-text-muted);font-family:var(--ajf-font-mono);font-size:11px;letter-spacing:.09em;text-transform:uppercase}table.ajf-table-field th,table.ajf-table-field td{position:relative;padding:9px 12px;border-right:1px solid var(--ajf-border);border-bottom:1px solid var(--ajf-border);text-align:left}table.ajf-table-field th:last-child,table.ajf-table-field td:last-child{border-right:0}table.ajf-table-field tr:last-child td{border-bottom:0}table.ajf-table-field tbody tr:hover:not(.ajf-header-row){background:var(--ajf-band)}table.ajf-table-field td span{display:block;width:100%;min-height:1.4em;box-sizing:border-box;font:inherit;cursor:text;outline:none}table.ajf-table-field td input{position:absolute;inset:0;width:100%;box-sizing:border-box;padding:9px 12px;border:1px solid var(--ajf-accent);background:var(--ajf-surface);color:var(--ajf-text);font:inherit;cursor:text;outline:none}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: i5.AjfWarningAlertService, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfTableFieldComponent, { className: "AjfTableFieldComponent", filePath: "table-field.ts", lineNumber: 44 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9mb3Jtcy9zcmMvdGFibGUtZmllbGQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9mb3Jtcy9zcmMvdGFibGUtZmllbGQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wseUJBQXlCLEVBRXpCLHNCQUFzQixJQUFJLHVCQUF1QixHQUNsRCxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULE1BQU0sRUFDTixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7O0lDNUJiLDZCQUF1RDtJQUNyRCxZQUNGOzs7Ozs7SUFERSxjQUNGO0lBREUsa0dBQ0Y7OztJQUlFLDZCQUFrRDtJQUNoRCxZQUNGOzs7Ozs7SUFERSxjQUNGO0lBREUseUZBQ0Y7Ozs7SUFLUSw2QkFBZ0U7SUFDOUQsZ0NBQ2dFO0lBQTlELEFBREssNlVBQTBCLEtBQUssS0FBQyw0WUFDdEIsOENBQWlDLEtBQUM7SUFEbkQsaUJBQ2dFOzs7O0lBRFYsY0FBNkI7SUFBN0IsOENBQTZCOzs7O0lBSW5GLGlDQUNnRTtJQUE5RCxBQURLLDRVQUEwQixLQUFLLEtBQUMsMllBQ3RCLDhDQUFpQyxLQUFDO0lBRG5ELGlCQUNnRTs7O0lBREosQUFBcEIsb0NBQW1CLGlDQUE4Qjs7O0lBTjdGLDZCQUFzRztJQUtwRyxBQUpBLDhNQUFnRSxnT0FJckM7Ozs7O0lBSlosY0FBOEI7SUFBQSxBQUE5QixpREFBOEIsNkJBQWlCOzs7O0lBVzlELGdDQUFzQztJQUFoQyx1WEFBUyxrQ0FBcUIsS0FBQztJQUFDLFlBRWxDOzs7SUFBQSxpQkFBTzs7O0lBRjJCLGNBRWxDO0lBRmtDLGdHQUVsQzs7O0lBZlIsNkJBQTRCO0lBQzFCLCtMQUFzRzs7SUFXdEcsOE5BQTRCOzs7Ozs7OztJQVhiLGNBQW1FO0lBQUEsQUFBbkUsa0dBQW1FLCtCQUFrQjs7O0lBRnhHLDZCQUF3RDtJQUN0RCxnTEFBNEI7Ozs7SUFBYixjQUFXO0lBQVgsK0JBQVc7OztJQUQ1QixpS0FBd0Q7Ozs7SUFBekMsaURBQStCOzs7SUFMbEQsMEJBQXFEO0lBSW5ELEFBSEEsbUpBQWtELHFLQUd4QjtJQXNCNUIsaUJBQUs7Ozs7SUF6QlksY0FBaUI7SUFBQSxBQUFqQixtQ0FBaUIsNkJBQWdCOzs7SUFGcEQsNkJBQXlDO0lBQ3ZDLDBIQUFxRDs7OztJQUFuQyxjQUFlO0lBQWYsdUNBQWU7OztJQVJ2Qyw2QkFBeUU7SUFDdkUsNkJBQXVDOztJQUNyQywwQkFBSTtJQUNGLCtIQUF1RDtJQUd6RCxpQkFBSztJQUNMLCtIQUF5QztJQTZCM0MsaUJBQUs7Ozs7O0lBbkNELGNBQWtDO0lBQWxDLHNEQUFrQztJQUVuQixlQUFzQztJQUF0Qyw2REFBc0M7SUFJeEMsY0FBd0I7SUFBeEIsNENBQXdCOzs7SUFSN0MsNkJBQTRDO0lBQzFDLGdIQUF5RTs7OztJQUF2QyxjQUFzQjtJQUF0QixrREFBc0I7OztJQUY1RCxnQ0FBZ0Q7SUFDOUMsaUdBQTRDO0lBd0M5QyxpQkFBUTs7O0lBeENTLGNBQW9CO0lBQXBCLDJDQUFvQjs7QUQwQ3JDLE1BQU0sT0FBTyxzQkFBdUIsU0FBUSx1QkFBdUI7SUFDakUsWUFDRSxHQUFzQixFQUN0QixPQUErQixFQUNJLEdBQTJCO1FBRTlELEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7dUhBUFUsc0JBQXNCLG9IQUl2Qix5QkFBeUI7b0VBSnhCLHNCQUFzQjtZQzNDbkMsMkVBQWdEOztZQUF4QyxtQ0FBYzs7O2lGRDJDVCxzQkFBc0I7Y0FObEMsU0FBUztrQ0FHUyx1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJOztzQkFNbEMsTUFBTTt1QkFBQyx5QkFBeUI7O2tGQUp4QixzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UsXG4gIEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gIEFqZlRhYmxlRmllbGRDb21wb25lbnQgYXMgQ29yZVRhYmxlRmllbGRDb21wb25lbnQsXG59IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgSW5qZWN0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmV2FybmluZ0FsZXJ0U2VydmljZX0gZnJvbSAnLi93YXJuaW5nLWFsZXJ0LXNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgdGVtcGxhdGVVcmw6ICd0YWJsZS1maWVsZC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3RhYmxlLWZpZWxkLnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZlRhYmxlRmllbGRDb21wb25lbnQgZXh0ZW5kcyBDb3JlVGFibGVGaWVsZENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgc2VydmljZTogQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbiAgICBASW5qZWN0KEFKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UpIHdhczogQWpmV2FybmluZ0FsZXJ0U2VydmljZSxcbiAgKSB7XG4gICAgc3VwZXIoY2RyLCBzZXJ2aWNlLCB3YXMpO1xuICB9XG59XG4iLCI8dGFibGUgKm5nSWY9XCJpbnN0YW5jZVwiIGNsYXNzPVwiYWpmLXRhYmxlLWZpZWxkXCI+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJpbnN0YW5jZS5ub2RlIGFzIG5vZGVcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjb2x1bW5zIG9mIGluc3RhbmNlLmNvbnRyb2xzOyBsZXQgcm93ID0gaW5kZXhcIj5cbiAgICAgIDx0ciBbbmdDbGFzc109XCJyb3cgfCBhamZUYWJsZVJvd0NsYXNzXCI+XG4gICAgICAgIDx0ZD5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sdW1ucy5sZW5ndGggPiAwICYmIGNvbHVtbnNbMF1cIj5cbiAgICAgICAgICAgIHt7IGNvbHVtbnNbMF0gfCBhamZUcmFuc2xhdGVJZlN0cmluZyB8IGFqZkZvcm1hdElmTnVtYmVyOiAnLjAtMicgfX1cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC90ZD5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbHVtbnMubGVuZ3RoID4gMVwiPlxuICAgICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgYyBvZiBjb2x1bW5zWzFdOyBsZXQgY29sdW1uID0gaW5kZXhcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJyb3cgPT09IDA7IGVsc2UgY29udHJvbENlbGxcIj5cbiAgICAgICAgICAgICAge3sgYyB8IGFqZlRyYW5zbGF0ZUlmU3RyaW5nIHwgYWpmRm9ybWF0SWZOdW1iZXI6ICcuMC0yJyB9fVxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI2NvbnRyb2xDZWxsPlxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY3xhamZHZXRUYWJsZUNlbGxDb250cm9sIGFzIGNvbnRyXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbnRyXCI+XG4gICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29udHIhLnNob3cgJiYgKG5vZGUucm93c1tyb3ctMV1bY29sdW1uXXxhamZJc0NlbGxFZGl0YWJsZSk7IGVsc2UgcGxhaW5UZXh0Q2VsbFwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29udHIudHlwZSA9PT0gJ251bWJlcic7ZWxzZSBnZW5lcmljSW5wdXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgKGZvY3Vzb3V0KT1cImNvbnRyIS5zaG93ID0gZmFsc2VcIiB0eXBlPVwibnVtYmVyXCIgW2Zvcm1Db250cm9sXT1cImNvbnRyLmNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24udGFiKT1cImdvVG9OZXh0Q2VsbCgkZXZlbnQsIHJvdywgY29sdW1uKVwiIGF1dG9mb2N1cyAvPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNnZW5lcmljSW5wdXQ+XG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0IChmb2N1c291dCk9XCJjb250ciEuc2hvdyA9IGZhbHNlXCIgW3R5cGVdPVwiY29udHIudHlwZVwiIFtmb3JtQ29udHJvbF09XCJjb250ci5jb250cm9sXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duLnRhYik9XCJnb1RvTmV4dENlbGwoJGV2ZW50LCByb3csIGNvbHVtbilcIiBhdXRvZm9jdXMgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI3BsYWluVGV4dENlbGw+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIChjbGljayk9XCJnb1RvQ2VsbChyb3csIGNvbHVtbilcIj57eyBjb250ci5jb250cm9sIS52YWx1ZSB8XG4gICAgICAgICAgICAgICAgICAgICAgYWpmVHJhbnNsYXRlSWZTdHJpbmcgfCBhamZGb3JtYXRJZk51bWJlcjogJy4wLTInXG4gICAgICAgICAgICAgICAgICAgICAgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgPC90ZD5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L3RyPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L25nLWNvbnRhaW5lcj5cbjwvdGFibGU+Il19