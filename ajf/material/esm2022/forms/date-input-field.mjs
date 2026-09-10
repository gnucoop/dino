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
import { AJF_WARNING_ALERT_SERVICE, AjfBaseFieldComponent, } from '@ajf/core/forms';
import { ChangeDetectionStrategy, Component, Inject, ViewChild, ViewEncapsulation, } from '@angular/core';
import { MatInput } from '@angular/material/input';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/core/forms";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/button";
import * as i4 from "@angular/material/datepicker";
import * as i5 from "@angular/forms";
import * as i6 from "@ngneat/transloco";
import * as i7 from "./warning-alert-service";
function AjfDateInputFieldComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "span", 2);
    i0.ɵɵelement(2, "input", 3);
    i0.ɵɵpipe(3, "ajfDateValueString");
    i0.ɵɵpipe(4, "ajfDateValueString");
    i0.ɵɵpipe(5, "ajfNodeCompleteName");
    i0.ɵɵelement(6, "mat-datepicker-toggle", 4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "mat-datepicker", null, 0)(9, "mat-datepicker-actions")(10, "button", 5);
    i0.ɵɵlistener("click", function AjfDateInputFieldComponent_ng_container_0_Template_button_click_10_listener() { const ctrl_r2 = i0.ɵɵrestoreView(_r1).ngIf; const picker_r3 = i0.ɵɵreference(8); const ctx_r3 = i0.ɵɵnextContext(); ctx_r3.clear(ctrl_r2); return i0.ɵɵresetView(picker_r3.close()); });
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "transloco");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "button", 6);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "transloco");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctrl_r2 = ctx.ngIf;
    const picker_r3 = i0.ɵɵreference(8);
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("matDatepicker", picker_r3)("min", i0.ɵɵpipeBind1(3, 8, ctx_r3.instance.node.minDate))("max", i0.ɵɵpipeBind1(4, 10, ctx_r3.instance.node.maxDate))("formControl", ctrl_r2);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(5, 12, ctx_r3.instance));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("for", picker_r3);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(12, 14, "Clear"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 16, "OK"));
} }
export class AjfDateInputFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
    clear(ctrl) {
        ctrl.setValue(null);
    }
    static { this.ɵfac = function AjfDateInputFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfDateInputFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfDateInputFieldComponent, selectors: [["ng-component"]], viewQuery: function AjfDateInputFieldComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(MatInput, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.input = _t.first);
        } }, features: [i0.ɵɵInheritDefinitionFeature], decls: 2, vars: 3, consts: [["picker", ""], [4, "ngIf"], [1, "ajf-input-group", "ajf-control--mono"], ["readonly", "", 3, "matDatepicker", "min", "max", "formControl"], [1, "ajf-input-group-action", 3, "for"], ["mat-button", "", "type", "button", 3, "click"], ["mat-raised-button", "", "color", "primary", "matDatepickerApply", ""]], template: function AjfDateInputFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfDateInputFieldComponent_ng_container_0_Template, 16, 18, "ng-container", 1);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.control));
        } }, dependencies: [i2.NgIf, i3.MatButton, i4.MatDatepicker, i4.MatDatepickerInput, i4.MatDatepickerToggle, i4.MatDatepickerActions, i4.MatDatepickerApply, i5.DefaultValueAccessor, i5.NgControlStatus, i5.FormControlDirective, i6.TranslocoPipe, i2.AsyncPipe, i1.AjfDateValueStringPipe, i1.AjfNodeCompleteNamePipe], styles: ["ajf-field .ajf-input-group{width:200px}ajf-field .ajf-input-group .mat-datepicker-toggle{display:inline-flex}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfDateInputFieldComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container *ngIf=\"control | async as ctrl\">\n  <span class=\"ajf-input-group ajf-control--mono\">\n    <input\n      [matDatepicker]=\"picker\"\n      [attr.aria-label]=\"instance! | ajfNodeCompleteName\"\n      [min]=\"instance!.node.minDate | ajfDateValueString\"\n      [max]=\"instance!.node.maxDate | ajfDateValueString\"\n      [formControl]=\"ctrl!\"\n      readonly\n    />\n    <mat-datepicker-toggle class=\"ajf-input-group-action\" [for]=\"picker\"></mat-datepicker-toggle>\n  </span>\n  <mat-datepicker #picker>\n    <mat-datepicker-actions>\n      <button mat-button type=\"button\" (click)=\"clear(ctrl); picker.close()\">\n        {{ 'Clear' | transloco }}\n      </button>\n      <button mat-raised-button color=\"primary\" matDatepickerApply>{{ 'OK' | transloco }}</button>\n    </mat-datepicker-actions>\n  </mat-datepicker>\n</ng-container>\n", styles: ["ajf-field .ajf-input-group{width:200px}ajf-field .ajf-input-group .mat-datepicker-toggle{display:inline-flex}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: i7.AjfWarningAlertService, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }], { input: [{
            type: ViewChild,
            args: [MatInput, { static: false }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfDateInputFieldComponent, { className: "AjfDateInputFieldComponent", filePath: "date-input-field.ts", lineNumber: 47 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1pbnB1dC1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm1zL3NyYy9kYXRlLWlucHV0LWZpZWxkLnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvZm9ybXMvc3JjL2RhdGUtaW5wdXQtZmllbGQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wseUJBQXlCLEVBQ3pCLHFCQUFxQixHQUd0QixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7Ozs7Ozs7SUNwQ2pELDZCQUE4QztJQUM1QywrQkFBZ0Q7SUFDOUMsMkJBT0U7Ozs7SUFDRiwyQ0FBNkY7SUFDL0YsaUJBQU87SUFHSCxBQURGLEFBREYsK0NBQXdCLDZCQUNFLGlCQUNpRDtJQUF0QyxvT0FBUyxxQkFBVyx3QkFBRSxpQkFBYyxLQUFDO0lBQ3BFLGFBQ0Y7O0lBQUEsaUJBQVM7SUFDVCxrQ0FBNkQ7SUFBQSxhQUFzQjs7SUFFdkYsQUFERSxBQURxRixpQkFBUyxFQUNyRSxFQUNWOzs7Ozs7SUFoQmIsZUFBd0I7SUFJeEIsQUFEQSxBQURBLEFBRkEseUNBQXdCLDJEQUUyQiw0REFDQSx3QkFDOUI7O0lBRytCLGVBQWM7SUFBZCwrQkFBYztJQUtoRSxlQUNGO0lBREUsZ0VBQ0Y7SUFDNkQsZUFBc0I7SUFBdEIsa0RBQXNCOztBRDZCekYsTUFBTSxPQUFPLDBCQUEyQixTQUFRLHFCQUEyQztJQUd6RixZQUNFLEdBQXNCLEVBQ3RCLE9BQStCLEVBQ0ksR0FBMkI7UUFFOUQsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUF3QjtRQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUM7MkhBYlUsMEJBQTBCLG9IQU0zQix5QkFBeUI7b0VBTnhCLDBCQUEwQjsyQkFDMUIsUUFBUTs7Ozs7WUMvQ3JCLCtGQUE4Qzs7O1lBQS9CLHdEQUFzQjs7O2lGRDhDeEIsMEJBQTBCO2NBTnRDLFNBQVM7a0NBR1MsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTs7c0JBUWxDLE1BQU07dUJBQUMseUJBQXlCO3FCQUxHLEtBQUs7a0JBQTFDLFNBQVM7bUJBQUMsUUFBUSxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQzs7a0ZBRHpCLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSxcbiAgQWpmQmFzZUZpZWxkQ29tcG9uZW50LFxuICBBamZEYXRlRmllbGRJbnN0YW5jZSxcbiAgQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbn0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbmplY3QsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xuaW1wb3J0IHtVbnR5cGVkRm9ybUNvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7QWpmV2FybmluZ0FsZXJ0U2VydmljZX0gZnJvbSAnLi93YXJuaW5nLWFsZXJ0LXNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgdGVtcGxhdGVVcmw6ICdkYXRlLWlucHV0LWZpZWxkLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnZGF0ZS1pbnB1dC1maWVsZC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZEYXRlSW5wdXRGaWVsZENvbXBvbmVudCBleHRlbmRzIEFqZkJhc2VGaWVsZENvbXBvbmVudDxBamZEYXRlRmllbGRJbnN0YW5jZT4ge1xuICBAVmlld0NoaWxkKE1hdElucHV0LCB7c3RhdGljOiBmYWxzZX0pIGlucHV0ITogTWF0SW5wdXQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBzZXJ2aWNlOiBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICAgIEBJbmplY3QoQUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSkgd2FzOiBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlLFxuICApIHtcbiAgICBzdXBlcihjZHIsIHNlcnZpY2UsIHdhcyk7XG4gIH1cblxuICBjbGVhcihjdHJsOiBVbnR5cGVkRm9ybUNvbnRyb2wpOiB2b2lkIHtcbiAgICBjdHJsLnNldFZhbHVlKG51bGwpO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiY29udHJvbCB8IGFzeW5jIGFzIGN0cmxcIj5cbiAgPHNwYW4gY2xhc3M9XCJhamYtaW5wdXQtZ3JvdXAgYWpmLWNvbnRyb2wtLW1vbm9cIj5cbiAgICA8aW5wdXRcbiAgICAgIFttYXREYXRlcGlja2VyXT1cInBpY2tlclwiXG4gICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImluc3RhbmNlISB8IGFqZk5vZGVDb21wbGV0ZU5hbWVcIlxuICAgICAgW21pbl09XCJpbnN0YW5jZSEubm9kZS5taW5EYXRlIHwgYWpmRGF0ZVZhbHVlU3RyaW5nXCJcbiAgICAgIFttYXhdPVwiaW5zdGFuY2UhLm5vZGUubWF4RGF0ZSB8IGFqZkRhdGVWYWx1ZVN0cmluZ1wiXG4gICAgICBbZm9ybUNvbnRyb2xdPVwiY3RybCFcIlxuICAgICAgcmVhZG9ubHlcbiAgICAvPlxuICAgIDxtYXQtZGF0ZXBpY2tlci10b2dnbGUgY2xhc3M9XCJhamYtaW5wdXQtZ3JvdXAtYWN0aW9uXCIgW2Zvcl09XCJwaWNrZXJcIj48L21hdC1kYXRlcGlja2VyLXRvZ2dsZT5cbiAgPC9zcGFuPlxuICA8bWF0LWRhdGVwaWNrZXIgI3BpY2tlcj5cbiAgICA8bWF0LWRhdGVwaWNrZXItYWN0aW9ucz5cbiAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImNsZWFyKGN0cmwpOyBwaWNrZXIuY2xvc2UoKVwiPlxuICAgICAgICB7eyAnQ2xlYXInIHwgdHJhbnNsb2NvIH19XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gY29sb3I9XCJwcmltYXJ5XCIgbWF0RGF0ZXBpY2tlckFwcGx5Pnt7ICdPSycgfCB0cmFuc2xvY28gfX08L2J1dHRvbj5cbiAgICA8L21hdC1kYXRlcGlja2VyLWFjdGlvbnM+XG4gIDwvbWF0LWRhdGVwaWNrZXI+XG48L25nLWNvbnRhaW5lcj5cbiJdfQ==