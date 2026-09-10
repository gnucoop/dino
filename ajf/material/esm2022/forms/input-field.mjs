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
import { AJF_WARNING_ALERT_SERVICE, AjfInputFieldComponent as CoreComponent, } from '@ajf/core/forms';
import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/core/forms";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "./warning-alert-service";
function AjfInputFieldComponent_ng_container_0_input_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 3);
    i0.ɵɵpipe(1, "ajfIsReadonlyInputField");
} if (rf & 2) {
    const ctrl_r1 = i0.ɵɵnextContext().ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("ajf-control--formula", ctx_r1.instance.node.fieldType === 6)("ajf-control--mono", ctx_r1.instance.node.fieldType === 6);
    i0.ɵɵproperty("formControl", ctrl_r1)("readonly", i0.ɵɵpipeBind1(1, 7, ctx_r1.instance));
    i0.ɵɵattribute("aria-labelledby", ctx_r1.instance.node.name);
} }
function AjfInputFieldComponent_ng_container_0_input_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 4);
    i0.ɵɵpipe(1, "ajfIsReadonlyInputField");
} if (rf & 2) {
    const ctrl_r1 = i0.ɵɵnextContext().ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formControl", ctrl_r1)("readonly", i0.ɵɵpipeBind1(1, 3, ctx_r1.instance));
    i0.ɵɵattribute("aria-labelledby", ctx_r1.instance.node.name);
} }
function AjfInputFieldComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfInputFieldComponent_ng_container_0_input_1_Template, 2, 9, "input", 1)(2, AjfInputFieldComponent_ng_container_0_input_2_Template, 2, 5, "input", 2);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.type === "text");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.type === "number");
} }
export class AjfInputFieldComponent extends CoreComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
    static { this.ɵfac = function AjfInputFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfInputFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfInputFieldComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 2, vars: 3, consts: [[4, "ngIf"], ["class", "ajf-control", "type", "text", 3, "ajf-control--formula", "ajf-control--mono", "formControl", "readonly", 4, "ngIf"], ["class", "ajf-control ajf-control--mono ajf-control--narrow", "type", "number", 3, "formControl", "readonly", 4, "ngIf"], ["type", "text", 1, "ajf-control", 3, "formControl", "readonly"], ["type", "number", 1, "ajf-control", "ajf-control--mono", "ajf-control--narrow", 3, "formControl", "readonly"]], template: function AjfInputFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfInputFieldComponent_ng_container_0_Template, 3, 2, "ng-container", 0);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.control));
        } }, dependencies: [i2.NgIf, i3.DefaultValueAccessor, i3.NumberValueAccessor, i3.NgControlStatus, i3.FormControlDirective, i2.AsyncPipe, i1.AjfIsReadonlyInputFieldPipe], styles: ["ajf-field .ajf-control--formula{width:auto;min-width:72px;max-width:240px;border-color:transparent;background:var(--ajf-band);color:var(--ajf-text);text-align:center}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfInputFieldComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container *ngIf=\"control | async as ctrl\">\n  <input\n    *ngIf=\"type === 'text'\"\n    class=\"ajf-control\"\n    [class.ajf-control--formula]=\"instance!.node.fieldType === 6\"\n    [class.ajf-control--mono]=\"instance!.node.fieldType === 6\"\n    type=\"text\"\n    [formControl]=\"ctrl!\"\n    [readonly]=\"instance! | ajfIsReadonlyInputField\"\n    [attr.aria-labelledby]=\"instance!.node.name\"\n  />\n  <input\n    *ngIf=\"type === 'number'\"\n    class=\"ajf-control ajf-control--mono ajf-control--narrow\"\n    type=\"number\"\n    [formControl]=\"ctrl!\"\n    [readonly]=\"instance! | ajfIsReadonlyInputField\"\n    [attr.aria-labelledby]=\"instance!.node.name\"\n  />\n</ng-container>\n", styles: ["ajf-field .ajf-control--formula{width:auto;min-width:72px;max-width:240px;border-color:transparent;background:var(--ajf-band);color:var(--ajf-text);text-align:center}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: i4.AjfWarningAlertService, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfInputFieldComponent, { className: "AjfInputFieldComponent", filePath: "input-field.ts", lineNumber: 44 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9mb3Jtcy9zcmMvaW5wdXQtZmllbGQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9mb3Jtcy9zcmMvaW5wdXQtZmllbGQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wseUJBQXlCLEVBRXpCLHNCQUFzQixJQUFJLGFBQWEsR0FDeEMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxNQUFNLEVBQ04saUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDOzs7Ozs7O0lDaENyQiwyQkFTRTs7Ozs7SUFMQSxBQURBLDRFQUE2RCwyREFDSDtJQUcxRCxBQURBLHFDQUFxQixtREFDMkI7Ozs7SUFHbEQsMkJBT0U7Ozs7O0lBRkEsQUFEQSxxQ0FBcUIsbURBQzJCOzs7O0lBaEJwRCw2QkFBOEM7SUFXNUMsQUFWQSwwRkFTRSw2RUFRQTs7OztJQWhCQyxjQUFxQjtJQUFyQiw2Q0FBcUI7SUFVckIsY0FBdUI7SUFBdkIsK0NBQXVCOztBRCtCNUIsTUFBTSxPQUFPLHNCQUF1QixTQUFRLGFBQWE7SUFDdkQsWUFDRSxHQUFzQixFQUN0QixPQUErQixFQUNJLEdBQTJCO1FBRTlELEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7dUhBUFUsc0JBQXNCLG9IQUl2Qix5QkFBeUI7b0VBSnhCLHNCQUFzQjtZQzNDbkMseUZBQThDOzs7WUFBL0Isd0RBQXNCOzs7aUZEMkN4QixzQkFBc0I7Y0FObEMsU0FBUztrQ0FHUyx1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJOztzQkFNbEMsTUFBTTt1QkFBQyx5QkFBeUI7O2tGQUp4QixzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UsXG4gIEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gIEFqZklucHV0RmllbGRDb21wb25lbnQgYXMgQ29yZUNvbXBvbmVudCxcbn0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbmplY3QsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBamZXYXJuaW5nQWxlcnRTZXJ2aWNlfSBmcm9tICcuL3dhcm5pbmctYWxlcnQtc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZVVybDogJ2lucHV0LWZpZWxkLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnaW5wdXQtZmllbGQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmSW5wdXRGaWVsZENvbXBvbmVudCBleHRlbmRzIENvcmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHNlcnZpY2U6IEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gICAgQEluamVjdChBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFKSB3YXM6IEFqZldhcm5pbmdBbGVydFNlcnZpY2UsXG4gICkge1xuICAgIHN1cGVyKGNkciwgc2VydmljZSwgd2FzKTtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbnRyb2wgfCBhc3luYyBhcyBjdHJsXCI+XG4gIDxpbnB1dFxuICAgICpuZ0lmPVwidHlwZSA9PT0gJ3RleHQnXCJcbiAgICBjbGFzcz1cImFqZi1jb250cm9sXCJcbiAgICBbY2xhc3MuYWpmLWNvbnRyb2wtLWZvcm11bGFdPVwiaW5zdGFuY2UhLm5vZGUuZmllbGRUeXBlID09PSA2XCJcbiAgICBbY2xhc3MuYWpmLWNvbnRyb2wtLW1vbm9dPVwiaW5zdGFuY2UhLm5vZGUuZmllbGRUeXBlID09PSA2XCJcbiAgICB0eXBlPVwidGV4dFwiXG4gICAgW2Zvcm1Db250cm9sXT1cImN0cmwhXCJcbiAgICBbcmVhZG9ubHldPVwiaW5zdGFuY2UhIHwgYWpmSXNSZWFkb25seUlucHV0RmllbGRcIlxuICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJpbnN0YW5jZSEubm9kZS5uYW1lXCJcbiAgLz5cbiAgPGlucHV0XG4gICAgKm5nSWY9XCJ0eXBlID09PSAnbnVtYmVyJ1wiXG4gICAgY2xhc3M9XCJhamYtY29udHJvbCBhamYtY29udHJvbC0tbW9ubyBhamYtY29udHJvbC0tbmFycm93XCJcbiAgICB0eXBlPVwibnVtYmVyXCJcbiAgICBbZm9ybUNvbnRyb2xdPVwiY3RybCFcIlxuICAgIFtyZWFkb25seV09XCJpbnN0YW5jZSEgfCBhamZJc1JlYWRvbmx5SW5wdXRGaWVsZFwiXG4gICAgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImluc3RhbmNlIS5ub2RlLm5hbWVcIlxuICAvPlxuPC9uZy1jb250YWluZXI+XG4iXX0=