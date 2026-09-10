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
import { filter, map } from 'rxjs/operators';
import { AjfBaseFieldComponent } from './base-field';
import { AjfFieldType } from './interface/fields/field-type';
import { AJF_WARNING_ALERT_SERVICE } from './warning-alert-service';
import * as i0 from "@angular/core";
import * as i1 from "./form-renderer";
import * as i2 from "@angular/common";
import * as i3 from "@ngneat/transloco";
function AjfReadOnlySelectFieldComponent_ng_container_0_ng_container_1_ng_container_1_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const choice_r1 = i0.ɵɵnextContext(2).$implicit;
    const ctrl_r2 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", i0.ɵɵpipeBind1(2, 2, choice_r1.label), "", ctrl_r2.value[ctrl_r2.value.length - 1] !== choice_r1.value ? ", " : "", " ");
} }
function AjfReadOnlySelectFieldComponent_ng_container_0_ng_container_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfReadOnlySelectFieldComponent_ng_container_0_ng_container_1_ng_container_1_span_1_Template, 3, 4, "span", 1);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const choice_r1 = i0.ɵɵnextContext().$implicit;
    const ctrl_r2 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctrl_r2.value && (ctrl_r2.value == null ? null : ctrl_r2.value.indexOf(choice_r1.value)) > -1);
} }
function AjfReadOnlySelectFieldComponent_ng_container_0_ng_container_1_ng_template_3_span_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const choice_r1 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, choice_r1.label));
} }
function AjfReadOnlySelectFieldComponent_ng_container_0_ng_container_1_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfReadOnlySelectFieldComponent_ng_container_0_ng_container_1_ng_template_3_span_0_Template, 3, 3, "span", 1);
} if (rf & 2) {
    const choice_r1 = i0.ɵɵnextContext().$implicit;
    const ctrl_r2 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵproperty("ngIf", ctrl_r2.value === choice_r1.value);
} }
function AjfReadOnlySelectFieldComponent_ng_container_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfReadOnlySelectFieldComponent_ng_container_0_ng_container_1_ng_container_1_Template, 2, 1, "ng-container", 3);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵtemplate(3, AjfReadOnlySelectFieldComponent_ng_container_0_ng_container_1_ng_template_3_Template, 1, 1, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const singleChoice_r3 = i0.ɵɵreference(4);
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(2, 2, ctx_r3.multiple))("ngIfElse", singleChoice_r3);
} }
function AjfReadOnlySelectFieldComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfReadOnlySelectFieldComponent_ng_container_0_ng_container_1_Template, 5, 4, "ng-container", 2);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.instance.filteredChoices);
} }
/**
 * This component allows you to show the values of AjfFieldWithChoicesInstance
 * contained in the control of the form inherited from AjfBaseFieldComponent.
 *
 * @export
 * @class AjfReadOnlySelectFieldComponent
 */
export class AjfReadOnlySelectFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
        this.multiple = this.control.pipe(filter(control => control != null), map(() => this.instance != null && this.instance.node.fieldType === AjfFieldType.MultipleChoice));
    }
    static { this.ɵfac = function AjfReadOnlySelectFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfReadOnlySelectFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfReadOnlySelectFieldComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 2, vars: 3, consts: [["singleChoice", ""], [4, "ngIf"], [4, "ngFor", "ngForOf"], [4, "ngIf", "ngIfElse"]], template: function AjfReadOnlySelectFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfReadOnlySelectFieldComponent_ng_container_0_Template, 2, 1, "ng-container", 1);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.control));
        } }, dependencies: [i2.NgForOf, i2.NgIf, i2.AsyncPipe, i3.TranslocoPipe], styles: ["ajf-read-only-select-field{display:block;color:var(--ajf-text, #1c1a17);font-size:14px;line-height:1.5}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfReadOnlySelectFieldComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container *ngIf=\"control|async as ctrl\">\n    <ng-container *ngFor=\"let choice of instance!.filteredChoices; let idx = index\">\n        <ng-container *ngIf=\"multiple|async; else singleChoice\">\n            <span *ngIf=\"ctrl.value && ctrl.value?.indexOf(choice.value) > -1\">\n                {{choice.label|transloco}}{{ctrl.value[ctrl.value.length - 1] !== choice.value ? ', ': ''}}\n            </span>\n        </ng-container>\n        <ng-template #singleChoice>\n            <span *ngIf=\"ctrl.value === choice.value\">{{choice.label|transloco}}</span>\n        </ng-template>\n    </ng-container>\n</ng-container>\n", styles: ["ajf-read-only-select-field{display:block;color:var(--ajf-text, #1c1a17);font-size:14px;line-height:1.5}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: undefined, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfReadOnlySelectFieldComponent, { className: "AjfReadOnlySelectFieldComponent", filePath: "read-only-select-field.ts", lineNumber: 51 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1vbmx5LXNlbGVjdC1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZm9ybXMvc3JjL3JlYWQtb25seS1zZWxlY3QtZmllbGQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2Zvcm1zL3NyYy9yZWFkLW9ubHktc2VsZWN0LWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsTUFBTSxFQUNOLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUduRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyxFQUFDLHlCQUF5QixFQUF5QixNQUFNLHlCQUF5QixDQUFDOzs7Ozs7SUNoQzlFLDRCQUFtRTtJQUMvRCxZQUNKOztJQUFBLGlCQUFPOzs7O0lBREgsY0FDSjtJQURJLG1KQUNKOzs7SUFISiw2QkFBd0Q7SUFDcEQsK0hBQW1FOzs7OztJQUE1RCxjQUEwRDtJQUExRCxvSEFBMEQ7OztJQUtqRSw0QkFBMEM7SUFBQSxZQUEwQjs7SUFBQSxpQkFBTzs7O0lBQWpDLGNBQTBCO0lBQTFCLDJEQUEwQjs7O0lBQXBFLDhIQUEwQzs7OztJQUFuQyx3REFBaUM7OztJQVBoRCw2QkFBZ0Y7SUFDNUUsZ0lBQXdEOztJQUt4RCwrSkFBMkI7Ozs7O0lBTFosY0FBc0I7SUFBQSxBQUF0Qiw0REFBc0IsNkJBQWlCOzs7SUFGOUQsNkJBQTRDO0lBQ3hDLGlIQUFnRjs7OztJQUEvQyxjQUE4QjtJQUE5Qix5REFBOEI7O0FEb0NuRTs7Ozs7O0dBTUc7QUFPSCxNQUFNLE9BQU8sK0JBQWdDLFNBQVEscUJBRXBEO0lBR0MsWUFDRSxHQUFzQixFQUN0QixPQUErQixFQUNJLEdBQTJCO1FBRTlELEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXpCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQy9CLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsRUFDbEMsR0FBRyxDQUNELEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxZQUFZLENBQUMsY0FBYyxDQUM1RixDQUNGLENBQUM7SUFDSixDQUFDO2dJQWxCVSwrQkFBK0Isb0hBUWhDLHlCQUF5QjtvRUFSeEIsK0JBQStCO1lDbEQ1QyxrR0FBNEM7OztZQUE3Qix3REFBb0I7OztpRkRrRHRCLCtCQUErQjtjQU4zQyxTQUFTO2tDQUdTLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUk7O3NCQVVsQyxNQUFNO3VCQUFDLHlCQUF5Qjs7a0ZBUnhCLCtCQUErQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbmplY3QsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlciwgbWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmQmFzZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2Jhc2UtZmllbGQnO1xuaW1wb3J0IHtBamZGb3JtUmVuZGVyZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXInO1xuaW1wb3J0IHtBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtd2l0aC1jaG9pY2VzLWluc3RhbmNlJztcbmltcG9ydCB7QWpmRmllbGRUeXBlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMvZmllbGQtdHlwZSc7XG5pbXBvcnQge0FKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UsIEFqZldhcm5pbmdBbGVydFNlcnZpY2V9IGZyb20gJy4vd2FybmluZy1hbGVydC1zZXJ2aWNlJztcblxuLyoqXG4gKiBUaGlzIGNvbXBvbmVudCBhbGxvd3MgeW91IHRvIHNob3cgdGhlIHZhbHVlcyBvZiBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2VcbiAqIGNvbnRhaW5lZCBpbiB0aGUgY29udHJvbCBvZiB0aGUgZm9ybSBpbmhlcml0ZWQgZnJvbSBBamZCYXNlRmllbGRDb21wb25lbnQuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIEFqZlJlYWRPbmx5U2VsZWN0RmllbGRDb21wb25lbnRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlVXJsOiAncmVhZC1vbmx5LXNlbGVjdC1maWVsZC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3JlYWQtb25seS1zZWxlY3QtZmllbGQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVhZE9ubHlTZWxlY3RGaWVsZENvbXBvbmVudCBleHRlbmRzIEFqZkJhc2VGaWVsZENvbXBvbmVudDxcbiAgQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlPFN0cmluZyB8IG51bWJlcj5cbj4ge1xuICByZWFkb25seSBtdWx0aXBsZTogT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHNlcnZpY2U6IEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gICAgQEluamVjdChBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFKSB3YXM6IEFqZldhcm5pbmdBbGVydFNlcnZpY2UsXG4gICkge1xuICAgIHN1cGVyKGNkciwgc2VydmljZSwgd2FzKTtcblxuICAgIHRoaXMubXVsdGlwbGUgPSB0aGlzLmNvbnRyb2wucGlwZShcbiAgICAgIGZpbHRlcihjb250cm9sID0+IGNvbnRyb2wgIT0gbnVsbCksXG4gICAgICBtYXAoXG4gICAgICAgICgpID0+IHRoaXMuaW5zdGFuY2UgIT0gbnVsbCAmJiB0aGlzLmluc3RhbmNlLm5vZGUuZmllbGRUeXBlID09PSBBamZGaWVsZFR5cGUuTXVsdGlwbGVDaG9pY2UsXG4gICAgICApLFxuICAgICk7XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJjb250cm9sfGFzeW5jIGFzIGN0cmxcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjaG9pY2Ugb2YgaW5zdGFuY2UhLmZpbHRlcmVkQ2hvaWNlczsgbGV0IGlkeCA9IGluZGV4XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtdWx0aXBsZXxhc3luYzsgZWxzZSBzaW5nbGVDaG9pY2VcIj5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiY3RybC52YWx1ZSAmJiBjdHJsLnZhbHVlPy5pbmRleE9mKGNob2ljZS52YWx1ZSkgPiAtMVwiPlxuICAgICAgICAgICAgICAgIHt7Y2hvaWNlLmxhYmVsfHRyYW5zbG9jb319e3tjdHJsLnZhbHVlW2N0cmwudmFsdWUubGVuZ3RoIC0gMV0gIT09IGNob2ljZS52YWx1ZSA/ICcsICc6ICcnfX1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjc2luZ2xlQ2hvaWNlPlxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJjdHJsLnZhbHVlID09PSBjaG9pY2UudmFsdWVcIj57e2Nob2ljZS5sYWJlbHx0cmFuc2xvY299fTwvc3Bhbj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L25nLWNvbnRhaW5lcj5cbjwvbmctY29udGFpbmVyPlxuIl19