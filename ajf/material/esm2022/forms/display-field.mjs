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
import { AJF_WARNING_ALERT_SERVICE, AjfInputFieldComponent, } from '@ajf/core/forms';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/core/forms";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/slide-toggle";
import * as i4 from "@ajf/core/common";
function AjfDisplayFieldComponent_ng_container_0_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctrl_r1 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctrl_r1.value);
} }
function AjfDisplayFieldComponent_ng_container_0_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 6);
    i0.ɵɵpipe(1, "safeHtml");
} if (rf & 2) {
    const ctrl_r1 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 1, ctrl_r1.value), i0.ɵɵsanitizeHtml);
} }
function AjfDisplayFieldComponent_ng_container_0_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "number");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctrl_r1 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctrl_r1.value));
} }
function AjfDisplayFieldComponent_ng_container_0_mat_slide_toggle_5_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-slide-toggle", 7);
    i0.ɵɵlistener("click", function AjfDisplayFieldComponent_ng_container_0_mat_slide_toggle_5_Template_mat_slide_toggle_click_0_listener($event) { i0.ɵɵrestoreView(_r2); return i0.ɵɵresetView($event.preventDefault()); })("change", function AjfDisplayFieldComponent_ng_container_0_mat_slide_toggle_5_Template_mat_slide_toggle_change_0_listener($event) { i0.ɵɵrestoreView(_r2); const ctrl_r1 = i0.ɵɵnextContext().ngIf; return i0.ɵɵresetView($event.source.checked = ctrl_r1.value); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctrl_r1 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵproperty("checked", ctrl_r1.value)("disableRipple", true);
} }
function AjfDisplayFieldComponent_ng_container_0_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctrl_r1 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctrl_r1.value);
} }
function AjfDisplayFieldComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0)(1, 1);
    i0.ɵɵtemplate(2, AjfDisplayFieldComponent_ng_container_0_span_2_Template, 2, 1, "span", 2)(3, AjfDisplayFieldComponent_ng_container_0_div_3_Template, 2, 3, "div", 3)(4, AjfDisplayFieldComponent_ng_container_0_span_4_Template, 3, 3, "span", 2)(5, AjfDisplayFieldComponent_ng_container_0_mat_slide_toggle_5_Template, 1, 2, "mat-slide-toggle", 4)(6, AjfDisplayFieldComponent_ng_container_0_span_6_Template, 2, 1, "span", 5);
    i0.ɵɵelementContainerEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitch", ctx_r2.instance == null ? null : ctx_r2.instance.node == null ? null : ctx_r2.instance.node.fieldType);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", 1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", 2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", 3);
} }
/**
 * this component show the control value inherited from AjfBaseFieldComponent.
 *
 * @export
 * @class AjfDisplayFieldComponent
 */
export class AjfDisplayFieldComponent extends AjfInputFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
    static { this.ɵfac = function AjfDisplayFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfDisplayFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfDisplayFieldComponent, selectors: [["ajf-display-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 2, vars: 3, consts: [[4, "ngIf"], [3, "ngSwitch"], [4, "ngSwitchCase"], [3, "innerHTML", 4, "ngSwitchCase"], [3, "checked", "disableRipple", "click", "change", 4, "ngSwitchCase"], [4, "ngSwitchDefault"], [3, "innerHTML"], [3, "click", "change", "checked", "disableRipple"]], template: function AjfDisplayFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfDisplayFieldComponent_ng_container_0_Template, 7, 5, "ng-container", 0);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.control));
        } }, dependencies: [i2.NgIf, i2.NgSwitch, i2.NgSwitchCase, i2.NgSwitchDefault, i3.MatSlideToggle, i4.SafeHtmlPipe, i2.AsyncPipe, i2.DecimalPipe], styles: ["ajf-display-field{display:block;color:var(--ajf-text);font-size:14px;line-height:1.5}ajf-display-field>div>:first-child{margin-top:0}ajf-display-field>div>:last-child{margin-bottom:0}ajf-display-field .mat-mdc-slide-toggle{pointer-events:none}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfDisplayFieldComponent, [{
        type: Component,
        args: [{ selector: 'ajf-display-field', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container *ngIf=\"control | async as ctrl\">\n    <ng-container [ngSwitch]=\"instance?.node?.fieldType\">\n\n        <!-- String  -->\n        <span *ngSwitchCase=\"0\">{{ ctrl.value }}</span>\n\n        <!-- Textarea with HTML  -->\n        <div *ngSwitchCase=\"1\" [innerHTML]=\"ctrl.value | safeHtml\"></div>\n\n        <!-- Number  -->\n        <span *ngSwitchCase=\"2\">{{ ctrl.value | number }}</span>\n\n        <!-- Boolean  -->\n        <mat-slide-toggle *ngSwitchCase=\"3\" [checked]=\"ctrl.value\" (click)=\"$event.preventDefault()\"\n            (change)=\"$event.source.checked = ctrl.value\" [disableRipple]=\"true\">\n        </mat-slide-toggle>\n\n        <!-- Default -->\n        <span *ngSwitchDefault>{{ ctrl.value }}</span>\n\n    </ng-container>\n</ng-container>", styles: ["ajf-display-field{display:block;color:var(--ajf-text);font-size:14px;line-height:1.5}ajf-display-field>div>:first-child{margin-top:0}ajf-display-field>div>:last-child{margin-bottom:0}ajf-display-field .mat-mdc-slide-toggle{pointer-events:none}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: undefined, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfDisplayFieldComponent, { className: "AjfDisplayFieldComponent", filePath: "display-field.ts", lineNumber: 51 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGxheS1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm1zL3NyYy9kaXNwbGF5LWZpZWxkLnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvZm9ybXMvc3JjL2Rpc3BsYXktZmllbGQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxNQUFNLEVBQ04saUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFDTCx5QkFBeUIsRUFFekIsc0JBQXNCLEdBRXZCLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7SUMvQmpCLDRCQUF3QjtJQUFBLFlBQWdCO0lBQUEsaUJBQU87OztJQUF2QixjQUFnQjtJQUFoQixtQ0FBZ0I7OztJQUd4Qyx5QkFBaUU7Ozs7SUFBMUMsa0ZBQW1DOzs7SUFHMUQsNEJBQXdCO0lBQUEsWUFBeUI7O0lBQUEsaUJBQU87OztJQUFoQyxjQUF5QjtJQUF6Qix5REFBeUI7Ozs7SUFHakQsMkNBQ3lFO0lBQXJFLEFBRHVELDZMQUFTLHVCQUF1QixLQUFDLHFRQUMzQztJQUNqRCxpQkFBbUI7OztJQUQrQixBQURkLHVDQUFzQix1QkFDYzs7O0lBSXhFLDRCQUF1QjtJQUFBLFlBQWdCO0lBQUEsaUJBQU87OztJQUF2QixjQUFnQjtJQUFoQixtQ0FBZ0I7OztJQWpCM0MsQUFESiw2QkFBOEMsTUFDVztJQWlCakQsQUFMQSxBQUhBLEFBSEEsQUFIQSwwRkFBd0IsMkVBR21DLDZFQUduQyxxR0FJaUQsNkVBSWxEOzs7O0lBakJiLGNBQXNDO0lBQXRDLGdJQUFzQztJQUd6QyxjQUFlO0lBQWYsZ0NBQWU7SUFHaEIsY0FBZTtJQUFmLGdDQUFlO0lBR2QsY0FBZTtJQUFmLGdDQUFlO0lBR0gsY0FBZTtJQUFmLGdDQUFlOztBRHdCMUM7Ozs7O0dBS0c7QUFRSCxNQUFNLE9BQU8sd0JBQXlCLFNBQVEsc0JBQXNCO0lBQ2xFLFlBQ0UsR0FBc0IsRUFDdEIsT0FBK0IsRUFDSSxHQUEyQjtRQUU5RCxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO3lIQVBVLHdCQUF3QixvSEFJekIseUJBQXlCO29FQUp4Qix3QkFBd0I7WUNsRHJDLDJGQUE4Qzs7O1lBQS9CLHdEQUFzQjs7O2lGRGtEeEIsd0JBQXdCO2NBUHBDLFNBQVM7MkJBQ0UsbUJBQW1CLG1CQUdaLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUk7O3NCQU1sQyxNQUFNO3VCQUFDLHlCQUF5Qjs7a0ZBSnhCLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEluamVjdCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFLFxuICBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICBBamZJbnB1dEZpZWxkQ29tcG9uZW50LFxuICBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlLFxufSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuXG4vKipcbiAqIHRoaXMgY29tcG9uZW50IHNob3cgdGhlIGNvbnRyb2wgdmFsdWUgaW5oZXJpdGVkIGZyb20gQWpmQmFzZUZpZWxkQ29tcG9uZW50LlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBBamZEaXNwbGF5RmllbGRDb21wb25lbnRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWRpc3BsYXktZmllbGQnLFxuICB0ZW1wbGF0ZVVybDogJ2Rpc3BsYXktZmllbGQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydkaXNwbGF5LWZpZWxkLnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkRpc3BsYXlGaWVsZENvbXBvbmVudCBleHRlbmRzIEFqZklucHV0RmllbGRDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHNlcnZpY2U6IEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gICAgQEluamVjdChBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFKSB3YXM6IEFqZldhcm5pbmdBbGVydFNlcnZpY2UsXG4gICkge1xuICAgIHN1cGVyKGNkciwgc2VydmljZSwgd2FzKTtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbnRyb2wgfCBhc3luYyBhcyBjdHJsXCI+XG4gICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiaW5zdGFuY2U/Lm5vZGU/LmZpZWxkVHlwZVwiPlxuXG4gICAgICAgIDwhLS0gU3RyaW5nICAtLT5cbiAgICAgICAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cIjBcIj57eyBjdHJsLnZhbHVlIH19PC9zcGFuPlxuXG4gICAgICAgIDwhLS0gVGV4dGFyZWEgd2l0aCBIVE1MICAtLT5cbiAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiMVwiIFtpbm5lckhUTUxdPVwiY3RybC52YWx1ZSB8IHNhZmVIdG1sXCI+PC9kaXY+XG5cbiAgICAgICAgPCEtLSBOdW1iZXIgIC0tPlxuICAgICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiMlwiPnt7IGN0cmwudmFsdWUgfCBudW1iZXIgfX08L3NwYW4+XG5cbiAgICAgICAgPCEtLSBCb29sZWFuICAtLT5cbiAgICAgICAgPG1hdC1zbGlkZS10b2dnbGUgKm5nU3dpdGNoQ2FzZT1cIjNcIiBbY2hlY2tlZF09XCJjdHJsLnZhbHVlXCIgKGNsaWNrKT1cIiRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCJcbiAgICAgICAgICAgIChjaGFuZ2UpPVwiJGV2ZW50LnNvdXJjZS5jaGVja2VkID0gY3RybC52YWx1ZVwiIFtkaXNhYmxlUmlwcGxlXT1cInRydWVcIj5cbiAgICAgICAgPC9tYXQtc2xpZGUtdG9nZ2xlPlxuXG4gICAgICAgIDwhLS0gRGVmYXVsdCAtLT5cbiAgICAgICAgPHNwYW4gKm5nU3dpdGNoRGVmYXVsdD57eyBjdHJsLnZhbHVlIH19PC9zcGFuPlxuXG4gICAgPC9uZy1jb250YWluZXI+XG48L25nLWNvbnRhaW5lcj4iXX0=