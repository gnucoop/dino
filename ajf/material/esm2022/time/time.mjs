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
import { AjfTime as Base } from '@ajf/core/time';
import { ChangeDetectionStrategy, Component, forwardRef, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/material/icon";
import * as i4 from "@angular/material/select";
import * as i5 from "@angular/material/core";
function AjfTime_mat_option_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 6);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "number");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const h_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", h_r1);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(2, 2, h_r1, "2.0"), " ");
} }
function AjfTime_mat_option_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 6);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "number");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const m_r2 = ctx.$implicit;
    i0.ɵɵproperty("value", m_r2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(2, 2, m_r2, "2.0"), " ");
} }
export const AJF_TIME_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AjfTime),
    multi: true,
};
export class AjfTime extends Base {
    constructor() {
        super();
        this.hoursList = Array.from({ length: 24 }, (_, i) => i);
        this.minutesList = Array.from({ length: 60 }, (_, i) => i);
    }
    static { this.ɵfac = function AjfTime_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfTime)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfTime, selectors: [["ajf-time"]], features: [i0.ɵɵProvidersFeature([AJF_TIME_CONTROL_VALUE_ACCESSOR]), i0.ɵɵInheritDefinitionFeature], decls: 9, vars: 4, consts: [[1, "ajf-time"], ["panelClass", "ajf-time-panel", "placeholder", "HH", 1, "ajf-time-select", 3, "ngModelChange", "opened", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], [1, "ajf-time-sep"], ["panelClass", "ajf-time-panel", "placeholder", "MM", 1, "ajf-time-select", 3, "ngModelChange", "opened", "ngModel"], [1, "ajf-time-icon"], [3, "value"]], template: function AjfTime_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "mat-select", 1);
            i0.ɵɵtwoWayListener("ngModelChange", function AjfTime_Template_mat_select_ngModelChange_1_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.hours, $event) || (ctx.hours = $event); return $event; });
            i0.ɵɵlistener("opened", function AjfTime_Template_mat_select_opened_1_listener() { return ctx.focusHandler(); });
            i0.ɵɵtemplate(2, AjfTime_mat_option_2_Template, 3, 5, "mat-option", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "span", 3);
            i0.ɵɵtext(4, ":");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "mat-select", 4);
            i0.ɵɵtwoWayListener("ngModelChange", function AjfTime_Template_mat_select_ngModelChange_5_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.minutes, $event) || (ctx.minutes = $event); return $event; });
            i0.ɵɵlistener("opened", function AjfTime_Template_mat_select_opened_5_listener() { return ctx.focusHandler(); });
            i0.ɵɵtemplate(6, AjfTime_mat_option_6_Template, 3, 5, "mat-option", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "mat-icon", 5);
            i0.ɵɵtext(8, "schedule");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵtwoWayProperty("ngModel", ctx.hours);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.hoursList);
            i0.ɵɵadvance(3);
            i0.ɵɵtwoWayProperty("ngModel", ctx.minutes);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.minutesList);
        } }, dependencies: [i1.NgForOf, i2.NgControlStatus, i2.NgModel, i3.MatIcon, i4.MatSelect, i5.MatOption, i1.DecimalPipe], styles: ["ajf-time{display:block}ajf-time .ajf-time{display:inline-flex;align-items:center;gap:2px;box-sizing:border-box;min-height:var(--ajf-control-h, 44px);padding:0 10px;border:1px solid var(--ajf-border-strong, #d5cfc6);border-radius:var(--ajf-radius, 4px);background:var(--ajf-surface, #fff)}ajf-time .ajf-time:focus-within{border-color:var(--ajf-accent, #0f4c5c)}ajf-time .ajf-time-sep{color:var(--ajf-text, #1c1a17);font-family:var(--ajf-font-mono, monospace)}ajf-time .ajf-time-icon{width:18px;height:18px;margin-left:6px;color:var(--ajf-text-muted, #7a736a);font-size:18px}ajf-time .mat-mdc-select.ajf-time-select{width:2.6em;min-width:0;padding:0;border:0;background:none;box-shadow:none;font-family:var(--ajf-font-mono, monospace)}ajf-time .mat-mdc-select.ajf-time-select .mat-mdc-select-arrow-wrapper{display:none}ajf-time .mat-mdc-select.ajf-time-select .mat-mdc-select-value{font-family:var(--ajf-font-mono, monospace);text-align:center}.mat-mdc-select-panel.ajf-time-panel{min-width:5em;border:1px solid var(--ajf-border, #e6e2dc);background:var(--ajf-surface, #ffffff)}.mat-mdc-select-panel.ajf-time-panel .mat-mdc-option{justify-content:center;min-height:36px;padding:0 12px}.mat-mdc-select-panel.ajf-time-panel .mat-mdc-option .mdc-list-item__primary-text{color:var(--ajf-text, #1c1a17);font-family:var(--ajf-font-mono, monospace);font-size:14px}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfTime, [{
        type: Component,
        args: [{ selector: 'ajf-time', providers: [AJF_TIME_CONTROL_VALUE_ACCESSOR], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ajf-time\">\n  <mat-select\n    class=\"ajf-time-select\"\n    panelClass=\"ajf-time-panel\"\n    [(ngModel)]=\"hours\"\n    (opened)=\"focusHandler()\"\n    placeholder=\"HH\"\n  >\n    <mat-option *ngFor=\"let h of hoursList\" [value]=\"h\"> {{ h | number : '2.0' }} </mat-option>\n  </mat-select>\n  <span class=\"ajf-time-sep\">:</span>\n  <mat-select\n    class=\"ajf-time-select\"\n    panelClass=\"ajf-time-panel\"\n    [(ngModel)]=\"minutes\"\n    (opened)=\"focusHandler()\"\n    placeholder=\"MM\"\n  >\n    <mat-option *ngFor=\"let m of minutesList\" [value]=\"m\"> {{ m | number : '2.0' }} </mat-option>\n  </mat-select>\n  <mat-icon class=\"ajf-time-icon\">schedule</mat-icon>\n</div>\n", styles: ["ajf-time{display:block}ajf-time .ajf-time{display:inline-flex;align-items:center;gap:2px;box-sizing:border-box;min-height:var(--ajf-control-h, 44px);padding:0 10px;border:1px solid var(--ajf-border-strong, #d5cfc6);border-radius:var(--ajf-radius, 4px);background:var(--ajf-surface, #fff)}ajf-time .ajf-time:focus-within{border-color:var(--ajf-accent, #0f4c5c)}ajf-time .ajf-time-sep{color:var(--ajf-text, #1c1a17);font-family:var(--ajf-font-mono, monospace)}ajf-time .ajf-time-icon{width:18px;height:18px;margin-left:6px;color:var(--ajf-text-muted, #7a736a);font-size:18px}ajf-time .mat-mdc-select.ajf-time-select{width:2.6em;min-width:0;padding:0;border:0;background:none;box-shadow:none;font-family:var(--ajf-font-mono, monospace)}ajf-time .mat-mdc-select.ajf-time-select .mat-mdc-select-arrow-wrapper{display:none}ajf-time .mat-mdc-select.ajf-time-select .mat-mdc-select-value{font-family:var(--ajf-font-mono, monospace);text-align:center}.mat-mdc-select-panel.ajf-time-panel{min-width:5em;border:1px solid var(--ajf-border, #e6e2dc);background:var(--ajf-surface, #ffffff)}.mat-mdc-select-panel.ajf-time-panel .mat-mdc-option{justify-content:center;min-height:36px;padding:0 12px}.mat-mdc-select-panel.ajf-time-panel .mat-mdc-option .mdc-list-item__primary-text{color:var(--ajf-text, #1c1a17);font-family:var(--ajf-font-mono, monospace);font-size:14px}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfTime, { className: "AjfTime", filePath: "time.ts", lineNumber: 47 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL3RpbWUvc3JjL3RpbWUudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC90aW1lL3NyYy90aW1lLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvQyxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBRVYsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7SUN0Qm5FLHFDQUFvRDtJQUFDLFlBQXlCOztJQUFBLGlCQUFhOzs7SUFBbkQsNEJBQVc7SUFBRSxjQUF5QjtJQUF6QixrRUFBeUI7OztJQVU5RSxxQ0FBc0Q7SUFBQyxZQUF5Qjs7SUFBQSxpQkFBYTs7O0lBQW5ELDRCQUFXO0lBQUUsY0FBeUI7SUFBekIsa0VBQXlCOztBRGNwRixNQUFNLENBQUMsTUFBTSwrQkFBK0IsR0FBUTtJQUNsRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO0lBQ3RDLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQVVGLE1BQU0sT0FBTyxPQUFRLFNBQVEsSUFBSTtJQUkvQjtRQUNFLEtBQUssRUFBRSxDQUFDO1FBSlYsY0FBUyxHQUFhLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBQyxNQUFNLEVBQUUsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1RCxnQkFBVyxHQUFhLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBQyxNQUFNLEVBQUUsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUk5RCxDQUFDO3dHQU5VLE9BQU87b0VBQVAsT0FBTyw4REFKUCxDQUFDLCtCQUErQixDQUFDO1lDekM1QyxBQURGLDhCQUFzQixvQkFPbkI7WUFIQyxnTUFBbUI7WUFDbkIsMEZBQVUsa0JBQWMsSUFBQztZQUd6QixzRUFBb0Q7WUFDdEQsaUJBQWE7WUFDYiwrQkFBMkI7WUFBQSxpQkFBQztZQUFBLGlCQUFPO1lBQ25DLHFDQU1DO1lBSEMsb01BQXFCO1lBQ3JCLDBGQUFVLGtCQUFjLElBQUM7WUFHekIsc0VBQXNEO1lBQ3hELGlCQUFhO1lBQ2IsbUNBQWdDO1lBQUEsd0JBQVE7WUFDMUMsQUFEMEMsaUJBQVcsRUFDL0M7O1lBakJGLGNBQW1CO1lBQW5CLHlDQUFtQjtZQUlPLGNBQVk7WUFBWix1Q0FBWTtZQU10QyxlQUFxQjtZQUFyQiwyQ0FBcUI7WUFJSyxjQUFjO1lBQWQseUNBQWM7OztpRkQ0Qi9CLE9BQU87Y0FSbkIsU0FBUzsyQkFDRSxVQUFVLGFBR1QsQ0FBQywrQkFBK0IsQ0FBQyxpQkFDN0IsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTTs7a0ZBRXBDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmVGltZSBhcyBCYXNlfSBmcm9tICdAYWpmL2NvcmUvdGltZSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBmb3J3YXJkUmVmLFxuICBPbkRlc3Ryb3ksXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBjb25zdCBBSkZfVElNRV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBamZUaW1lKSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtdGltZScsXG4gIHRlbXBsYXRlVXJsOiAndGltZS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3RpbWUuc2NzcyddLFxuICBwcm92aWRlcnM6IFtBSkZfVElNRV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFqZlRpbWUgZXh0ZW5kcyBCYXNlIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uRGVzdHJveSB7XG4gIGhvdXJzTGlzdDogbnVtYmVyW10gPSBBcnJheS5mcm9tKHtsZW5ndGg6IDI0fSwgKF8sIGkpID0+IGkpO1xuICBtaW51dGVzTGlzdDogbnVtYmVyW10gPSBBcnJheS5mcm9tKHtsZW5ndGg6IDYwfSwgKF8sIGkpID0+IGkpO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJhamYtdGltZVwiPlxuICA8bWF0LXNlbGVjdFxuICAgIGNsYXNzPVwiYWpmLXRpbWUtc2VsZWN0XCJcbiAgICBwYW5lbENsYXNzPVwiYWpmLXRpbWUtcGFuZWxcIlxuICAgIFsobmdNb2RlbCldPVwiaG91cnNcIlxuICAgIChvcGVuZWQpPVwiZm9jdXNIYW5kbGVyKClcIlxuICAgIHBsYWNlaG9sZGVyPVwiSEhcIlxuICA+XG4gICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IGggb2YgaG91cnNMaXN0XCIgW3ZhbHVlXT1cImhcIj4ge3sgaCB8IG51bWJlciA6ICcyLjAnIH19IDwvbWF0LW9wdGlvbj5cbiAgPC9tYXQtc2VsZWN0PlxuICA8c3BhbiBjbGFzcz1cImFqZi10aW1lLXNlcFwiPjo8L3NwYW4+XG4gIDxtYXQtc2VsZWN0XG4gICAgY2xhc3M9XCJhamYtdGltZS1zZWxlY3RcIlxuICAgIHBhbmVsQ2xhc3M9XCJhamYtdGltZS1wYW5lbFwiXG4gICAgWyhuZ01vZGVsKV09XCJtaW51dGVzXCJcbiAgICAob3BlbmVkKT1cImZvY3VzSGFuZGxlcigpXCJcbiAgICBwbGFjZWhvbGRlcj1cIk1NXCJcbiAgPlxuICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBtIG9mIG1pbnV0ZXNMaXN0XCIgW3ZhbHVlXT1cIm1cIj4ge3sgbSB8IG51bWJlciA6ICcyLjAnIH19IDwvbWF0LW9wdGlvbj5cbiAgPC9tYXQtc2VsZWN0PlxuICA8bWF0LWljb24gY2xhc3M9XCJhamYtdGltZS1pY29uXCI+c2NoZWR1bGU8L21hdC1pY29uPlxuPC9kaXY+XG4iXX0=