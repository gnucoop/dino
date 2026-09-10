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
import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation, } from '@angular/core';
import { AjfBaseFieldComponent } from './base-field';
import { AJF_WARNING_ALERT_SERVICE } from './warning-alert-service';
import * as i0 from "@angular/core";
import * as i1 from "./form-renderer";
import * as i2 from "@angular/common";
import * as i3 from "@ajf/core/common";
import * as i4 from "./get-table-cell-control";
import * as i5 from "./table-row-class";
function AjfReadOnlyTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_4_Template(rf, ctx) { if (rf & 1) {
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
function AjfReadOnlyTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
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
function AjfReadOnlyTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "ajfTranslateIfString");
    i0.ɵɵpipe(4, "ajfFormatIfNumber");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const contr_r3 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(4, 3, i0.ɵɵpipeBind1(3, 1, contr_r3.control.value), ".0-2"));
} }
function AjfReadOnlyTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfReadOnlyTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_Template, 5, 6, "ng-container", 3);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const contr_r3 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", contr_r3);
} }
function AjfReadOnlyTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfReadOnlyTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_Template, 2, 1, "ng-container", 3);
    i0.ɵɵpipe(1, "ajfGetTableCellControl");
} if (rf & 2) {
    const c_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, c_r2));
} }
function AjfReadOnlyTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td");
    i0.ɵɵtemplate(1, AjfReadOnlyTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_container_1_Template, 4, 6, "ng-container", 6)(2, AjfReadOnlyTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_Template, 2, 3, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const controlCell_r4 = i0.ɵɵreference(3);
    const row_r5 = i0.ɵɵnextContext(2).index;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", row_r5 === 0)("ngIfElse", controlCell_r4);
} }
function AjfReadOnlyTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfReadOnlyTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_Template, 4, 2, "td", 4);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const columns_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", columns_r1[1]);
} }
function AjfReadOnlyTableFieldComponent_table_0_ng_container_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "tr", 5);
    i0.ɵɵpipe(2, "ajfTableRowClass");
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtemplate(4, AjfReadOnlyTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_4_Template, 4, 6, "ng-container", 3);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, AjfReadOnlyTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_Template, 2, 1, "ng-container", 3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const columns_r1 = ctx.$implicit;
    const row_r5 = ctx.index;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", i0.ɵɵpipeBind1(2, 3, row_r5));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", columns_r1 && columns_r1.length > 0 && columns_r1[0]);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", columns_r1 && columns_r1.length > 1 && columns_r1[1]);
} }
function AjfReadOnlyTableFieldComponent_table_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfReadOnlyTableFieldComponent_table_0_ng_container_1_ng_container_1_Template, 6, 5, "ng-container", 4);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r5.instance.controls);
} }
function AjfReadOnlyTableFieldComponent_table_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 2);
    i0.ɵɵtemplate(1, AjfReadOnlyTableFieldComponent_table_0_ng_container_1_Template, 2, 1, "ng-container", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r5.instance.node);
} }
/**
 * This component allows you to shows the values contained in the controls of
 * the form inherited from AjfBaseFieldComponent with AjfTableFieldInstance.
 *
 * @export
 * @class AjfReadOnlyTableFieldComponent
 */
export class AjfReadOnlyTableFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
    static { this.ɵfac = function AjfReadOnlyTableFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfReadOnlyTableFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfReadOnlyTableFieldComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [["controlCell", ""], ["class", "ajf-table-field", 4, "ngIf"], [1, "ajf-table-field"], [4, "ngIf"], [4, "ngFor", "ngForOf"], [3, "ngClass"], [4, "ngIf", "ngIfElse"]], template: function AjfReadOnlyTableFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfReadOnlyTableFieldComponent_table_0_Template, 2, 1, "table", 1);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.instance);
        } }, dependencies: [i2.NgClass, i2.NgForOf, i2.NgIf, i3.FormatIfNumber, i3.TranslateIfString, i4.AjfGetTableCellControlPipe, i5.AjfTableRowClass], styles: ["table.ajf-table-field{width:100%;border:1px solid var(--ajf-border, #e6e2dc);border-collapse:collapse;table-layout:fixed;font-size:13px}table.ajf-table-field .ajf-header-row{background:var(--ajf-band, #faf8f5)}table.ajf-table-field .ajf-header-row td,table.ajf-table-field .ajf-header-row th{color:var(--ajf-text-muted, #7a736a);font-family:var(--ajf-font-mono, monospace);font-size:11px;letter-spacing:.09em;text-transform:uppercase}table.ajf-table-field th,table.ajf-table-field td{padding:9px 12px;border-right:1px solid var(--ajf-border, #e6e2dc);border-bottom:1px solid var(--ajf-border, #e6e2dc);text-align:left}table.ajf-table-field th:last-child,table.ajf-table-field td:last-child{border-right:0}table.ajf-table-field th span,table.ajf-table-field td span{display:block;width:100%;min-height:1.4em;box-sizing:border-box;font:inherit;word-wrap:break-word}table.ajf-table-field tr:last-child td{border-bottom:0}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfReadOnlyTableFieldComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<table *ngIf=\"instance\" class=\"ajf-table-field\">\n  <ng-container *ngIf=\"instance.node as node\">\n    <ng-container *ngFor=\"let columns of instance.controls; let row = index\">\n      <tr [ngClass]=\"row | ajfTableRowClass\">\n        <td>\n          <ng-container *ngIf=\"columns && columns.length > 0 && columns[0]\">\n            {{ columns[0] | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}\n          </ng-container>\n        </td>\n        <ng-container *ngIf=\"columns && columns.length > 1 && columns[1]\">\n          <td *ngFor=\"let c of columns[1]; let column = index\">\n            <ng-container *ngIf=\"row === 0; else controlCell\">\n              {{ c | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}\n            </ng-container>\n            <ng-template #controlCell>\n              <ng-container *ngIf=\"c|ajfGetTableCellControl as contr\">\n                <ng-container *ngIf=\"contr\">\n                  <span>{{ contr.control!.value | ajfTranslateIfString | ajfFormatIfNumber:\n                    '.0-2'\n                    }}</span>\n                </ng-container>\n              </ng-container>\n            </ng-template>\n          </td>\n        </ng-container>\n      </tr>\n    </ng-container>\n  </ng-container>\n</table>", styles: ["table.ajf-table-field{width:100%;border:1px solid var(--ajf-border, #e6e2dc);border-collapse:collapse;table-layout:fixed;font-size:13px}table.ajf-table-field .ajf-header-row{background:var(--ajf-band, #faf8f5)}table.ajf-table-field .ajf-header-row td,table.ajf-table-field .ajf-header-row th{color:var(--ajf-text-muted, #7a736a);font-family:var(--ajf-font-mono, monospace);font-size:11px;letter-spacing:.09em;text-transform:uppercase}table.ajf-table-field th,table.ajf-table-field td{padding:9px 12px;border-right:1px solid var(--ajf-border, #e6e2dc);border-bottom:1px solid var(--ajf-border, #e6e2dc);text-align:left}table.ajf-table-field th:last-child,table.ajf-table-field td:last-child{border-right:0}table.ajf-table-field th span,table.ajf-table-field td span{display:block;width:100%;min-height:1.4em;box-sizing:border-box;font:inherit;word-wrap:break-word}table.ajf-table-field tr:last-child td{border-bottom:0}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: undefined, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfReadOnlyTableFieldComponent, { className: "AjfReadOnlyTableFieldComponent", filePath: "read-only-table-field.ts", lineNumber: 49 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1vbmx5LXRhYmxlLWZpZWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvcmVhZC1vbmx5LXRhYmxlLWZpZWxkLnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvcmVhZC1vbmx5LXRhYmxlLWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsTUFBTSxFQUNOLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFHbkQsT0FBTyxFQUFDLHlCQUF5QixFQUF5QixNQUFNLHlCQUF5QixDQUFDOzs7Ozs7OztJQzVCaEYsNkJBQWtFO0lBQ2hFLFlBQ0Y7Ozs7OztJQURFLGNBQ0Y7SUFERSxrR0FDRjs7O0lBSUUsNkJBQWtEO0lBQ2hELFlBQ0Y7Ozs7OztJQURFLGNBQ0Y7SUFERSx5RkFDRjs7O0lBR0ksNkJBQTRCO0lBQzFCLDRCQUFNO0lBQUEsWUFFRjs7O0lBQUEsaUJBQU87Ozs7SUFGTCxlQUVGO0lBRkUsZ0dBRUY7OztJQUpSLDZCQUF3RDtJQUN0RCx3TEFBNEI7Ozs7SUFBYixjQUFXO0lBQVgsK0JBQVc7OztJQUQ1Qix5S0FBd0Q7Ozs7SUFBekMsaURBQStCOzs7SUFMbEQsMEJBQXFEO0lBSW5ELEFBSEEsMkpBQWtELDZLQUd4QjtJQVM1QixpQkFBSzs7OztJQVpZLGNBQWlCO0lBQUEsQUFBakIsbUNBQWlCLDRCQUFnQjs7O0lBRnBELDZCQUFrRTtJQUNoRSxrSUFBcUQ7Ozs7SUFBbkMsY0FBZTtJQUFmLHVDQUFlOzs7SUFSdkMsNkJBQXlFO0lBQ3ZFLDZCQUF1Qzs7SUFDckMsMEJBQUk7SUFDRix1SUFBa0U7SUFHcEUsaUJBQUs7SUFDTCx1SUFBa0U7SUFnQnBFLGlCQUFLOzs7OztJQXRCRCxjQUFrQztJQUFsQyxzREFBa0M7SUFFbkIsZUFBaUQ7SUFBakQsMkVBQWlEO0lBSW5ELGNBQWlEO0lBQWpELDJFQUFpRDs7O0lBUnRFLDZCQUE0QztJQUMxQyx3SEFBeUU7Ozs7SUFBdkMsY0FBc0I7SUFBdEIsa0RBQXNCOzs7SUFGNUQsZ0NBQWdEO0lBQzlDLHlHQUE0QztJQTJCOUMsaUJBQVE7OztJQTNCUyxjQUFvQjtJQUFwQiwyQ0FBb0I7O0FEa0NyQzs7Ozs7O0dBTUc7QUFPSCxNQUFNLE9BQU8sOEJBQStCLFNBQVEscUJBQTRDO0lBQzlGLFlBQ0UsR0FBc0IsRUFDdEIsT0FBK0IsRUFDSSxHQUEyQjtRQUU5RCxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDOytIQVBVLDhCQUE4QixvSEFJL0IseUJBQXlCO29FQUp4Qiw4QkFBOEI7WUNoRDNDLG1GQUFnRDs7WUFBeEMsbUNBQWM7OztpRkRnRFQsOEJBQThCO2NBTjFDLFNBQVM7a0NBR1MsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTs7c0JBTWxDLE1BQU07dUJBQUMseUJBQXlCOztrRkFKeEIsOEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgSW5qZWN0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmQmFzZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2Jhc2UtZmllbGQnO1xuaW1wb3J0IHtBamZGb3JtUmVuZGVyZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXInO1xuaW1wb3J0IHtBamZUYWJsZUZpZWxkSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvdGFibGUtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFLCBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlfSBmcm9tICcuL3dhcm5pbmctYWxlcnQtc2VydmljZSc7XG5cbi8qKlxuICogVGhpcyBjb21wb25lbnQgYWxsb3dzIHlvdSB0byBzaG93cyB0aGUgdmFsdWVzIGNvbnRhaW5lZCBpbiB0aGUgY29udHJvbHMgb2ZcbiAqIHRoZSBmb3JtIGluaGVyaXRlZCBmcm9tIEFqZkJhc2VGaWVsZENvbXBvbmVudCB3aXRoIEFqZlRhYmxlRmllbGRJbnN0YW5jZS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgQWpmUmVhZE9ubHlUYWJsZUZpZWxkQ29tcG9uZW50XG4gKi9cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZVVybDogJ3JlYWQtb25seS10YWJsZS1maWVsZC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3JlYWQtb25seS10YWJsZS1maWVsZC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZWFkT25seVRhYmxlRmllbGRDb21wb25lbnQgZXh0ZW5kcyBBamZCYXNlRmllbGRDb21wb25lbnQ8QWpmVGFibGVGaWVsZEluc3RhbmNlPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgc2VydmljZTogQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbiAgICBASW5qZWN0KEFKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UpIHdhczogQWpmV2FybmluZ0FsZXJ0U2VydmljZSxcbiAgKSB7XG4gICAgc3VwZXIoY2RyLCBzZXJ2aWNlLCB3YXMpO1xuICB9XG59XG4iLCI8dGFibGUgKm5nSWY9XCJpbnN0YW5jZVwiIGNsYXNzPVwiYWpmLXRhYmxlLWZpZWxkXCI+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJpbnN0YW5jZS5ub2RlIGFzIG5vZGVcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjb2x1bW5zIG9mIGluc3RhbmNlLmNvbnRyb2xzOyBsZXQgcm93ID0gaW5kZXhcIj5cbiAgICAgIDx0ciBbbmdDbGFzc109XCJyb3cgfCBhamZUYWJsZVJvd0NsYXNzXCI+XG4gICAgICAgIDx0ZD5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sdW1ucyAmJiBjb2x1bW5zLmxlbmd0aCA+IDAgJiYgY29sdW1uc1swXVwiPlxuICAgICAgICAgICAge3sgY29sdW1uc1swXSB8IGFqZlRyYW5zbGF0ZUlmU3RyaW5nIHwgYWpmRm9ybWF0SWZOdW1iZXI6ICcuMC0yJyB9fVxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L3RkPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sdW1ucyAmJiBjb2x1bW5zLmxlbmd0aCA+IDEgJiYgY29sdW1uc1sxXVwiPlxuICAgICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgYyBvZiBjb2x1bW5zWzFdOyBsZXQgY29sdW1uID0gaW5kZXhcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJyb3cgPT09IDA7IGVsc2UgY29udHJvbENlbGxcIj5cbiAgICAgICAgICAgICAge3sgYyB8IGFqZlRyYW5zbGF0ZUlmU3RyaW5nIHwgYWpmRm9ybWF0SWZOdW1iZXI6ICcuMC0yJyB9fVxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI2NvbnRyb2xDZWxsPlxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY3xhamZHZXRUYWJsZUNlbGxDb250cm9sIGFzIGNvbnRyXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbnRyXCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57eyBjb250ci5jb250cm9sIS52YWx1ZSB8IGFqZlRyYW5zbGF0ZUlmU3RyaW5nIHwgYWpmRm9ybWF0SWZOdW1iZXI6XG4gICAgICAgICAgICAgICAgICAgICcuMC0yJ1xuICAgICAgICAgICAgICAgICAgICB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC90cj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9uZy1jb250YWluZXI+XG48L3RhYmxlPiJdfQ==