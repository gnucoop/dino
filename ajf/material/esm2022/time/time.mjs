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
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfTime, selectors: [["ajf-time"]], features: [i0.ɵɵProvidersFeature([AJF_TIME_CONTROL_VALUE_ACCESSOR]), i0.ɵɵInheritDefinitionFeature], decls: 9, vars: 4, consts: [[1, "ajf-time"], ["placeholder", "HH", 1, "ajf-time-select", 3, "ngModelChange", "opened", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], [1, "ajf-time-sep"], ["placeholder", "MM", 1, "ajf-time-select", 3, "ngModelChange", "opened", "ngModel"], [1, "ajf-time-icon"], [3, "value"]], template: function AjfTime_Template(rf, ctx) { if (rf & 1) {
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
        } }, dependencies: [i1.NgForOf, i2.NgControlStatus, i2.NgModel, i3.MatIcon, i4.MatSelect, i5.MatOption, i1.DecimalPipe], styles: ["ajf-time{display:block}ajf-time .ajf-time{display:inline-flex;align-items:center;gap:2px;box-sizing:border-box;min-height:var(--ajf-control-h, 44px);padding:0 10px;border:1px solid var(--ajf-border-strong, #d5cfc6);border-radius:var(--ajf-radius, 4px);background:var(--ajf-surface, #fff)}ajf-time .ajf-time:focus-within{border-color:var(--ajf-accent, #0f4c5c)}ajf-time .ajf-time-sep{color:var(--ajf-text, #1c1a17);font-family:var(--ajf-font-mono, monospace)}ajf-time .ajf-time-icon{width:18px;height:18px;margin-left:6px;color:var(--ajf-text-muted, #7a736a);font-size:18px}ajf-time .mat-mdc-select.ajf-time-select{width:2.6em;min-width:0;padding:0;border:0;background:none;box-shadow:none;font-family:var(--ajf-font-mono, monospace)}ajf-time .mat-mdc-select.ajf-time-select .mat-mdc-select-arrow-wrapper{display:none}ajf-time .mat-mdc-select.ajf-time-select .mat-mdc-select-value{font-family:var(--ajf-font-mono, monospace);text-align:center}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfTime, [{
        type: Component,
        args: [{ selector: 'ajf-time', providers: [AJF_TIME_CONTROL_VALUE_ACCESSOR], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ajf-time\">\n  <mat-select\n    class=\"ajf-time-select\"\n    [(ngModel)]=\"hours\"\n    (opened)=\"focusHandler()\"\n    placeholder=\"HH\"\n  >\n    <mat-option *ngFor=\"let h of hoursList\" [value]=\"h\"> {{ h | number : '2.0' }} </mat-option>\n  </mat-select>\n  <span class=\"ajf-time-sep\">:</span>\n  <mat-select\n    class=\"ajf-time-select\"\n    [(ngModel)]=\"minutes\"\n    (opened)=\"focusHandler()\"\n    placeholder=\"MM\"\n  >\n    <mat-option *ngFor=\"let m of minutesList\" [value]=\"m\"> {{ m | number : '2.0' }} </mat-option>\n  </mat-select>\n  <mat-icon class=\"ajf-time-icon\">schedule</mat-icon>\n</div>\n", styles: ["ajf-time{display:block}ajf-time .ajf-time{display:inline-flex;align-items:center;gap:2px;box-sizing:border-box;min-height:var(--ajf-control-h, 44px);padding:0 10px;border:1px solid var(--ajf-border-strong, #d5cfc6);border-radius:var(--ajf-radius, 4px);background:var(--ajf-surface, #fff)}ajf-time .ajf-time:focus-within{border-color:var(--ajf-accent, #0f4c5c)}ajf-time .ajf-time-sep{color:var(--ajf-text, #1c1a17);font-family:var(--ajf-font-mono, monospace)}ajf-time .ajf-time-icon{width:18px;height:18px;margin-left:6px;color:var(--ajf-text-muted, #7a736a);font-size:18px}ajf-time .mat-mdc-select.ajf-time-select{width:2.6em;min-width:0;padding:0;border:0;background:none;box-shadow:none;font-family:var(--ajf-font-mono, monospace)}ajf-time .mat-mdc-select.ajf-time-select .mat-mdc-select-arrow-wrapper{display:none}ajf-time .mat-mdc-select.ajf-time-select .mat-mdc-select-value{font-family:var(--ajf-font-mono, monospace);text-align:center}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfTime, { className: "AjfTime", filePath: "time.ts", lineNumber: 47 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL3RpbWUvc3JjL3RpbWUudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC90aW1lL3NyYy90aW1lLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvQyxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBRVYsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7SUN2Qm5FLHFDQUFvRDtJQUFDLFlBQXlCOztJQUFBLGlCQUFhOzs7SUFBbkQsNEJBQVc7SUFBRSxjQUF5QjtJQUF6QixrRUFBeUI7OztJQVM5RSxxQ0FBc0Q7SUFBQyxZQUF5Qjs7SUFBQSxpQkFBYTs7O0lBQW5ELDRCQUFXO0lBQUUsY0FBeUI7SUFBekIsa0VBQXlCOztBRGdCcEYsTUFBTSxDQUFDLE1BQU0sK0JBQStCLEdBQVE7SUFDbEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQztJQUN0QyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFVRixNQUFNLE9BQU8sT0FBUSxTQUFRLElBQUk7SUFJL0I7UUFDRSxLQUFLLEVBQUUsQ0FBQztRQUpWLGNBQVMsR0FBYSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFFLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUQsZ0JBQVcsR0FBYSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFFLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFJOUQsQ0FBQzt3R0FOVSxPQUFPO29FQUFQLE9BQU8sOERBSlAsQ0FBQywrQkFBK0IsQ0FBQztZQ3pDNUMsQUFERiw4QkFBc0Isb0JBTW5CO1lBSEMsZ01BQW1CO1lBQ25CLDBGQUFVLGtCQUFjLElBQUM7WUFHekIsc0VBQW9EO1lBQ3RELGlCQUFhO1lBQ2IsK0JBQTJCO1lBQUEsaUJBQUM7WUFBQSxpQkFBTztZQUNuQyxxQ0FLQztZQUhDLG9NQUFxQjtZQUNyQiwwRkFBVSxrQkFBYyxJQUFDO1lBR3pCLHNFQUFzRDtZQUN4RCxpQkFBYTtZQUNiLG1DQUFnQztZQUFBLHdCQUFRO1lBQzFDLEFBRDBDLGlCQUFXLEVBQy9DOztZQWhCRixjQUFtQjtZQUFuQix5Q0FBbUI7WUFJTyxjQUFZO1lBQVosdUNBQVk7WUFLdEMsZUFBcUI7WUFBckIsMkNBQXFCO1lBSUssY0FBYztZQUFkLHlDQUFjOzs7aUZEOEIvQixPQUFPO2NBUm5CLFNBQVM7MkJBQ0UsVUFBVSxhQUdULENBQUMsK0JBQStCLENBQUMsaUJBQzdCLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU07O2tGQUVwQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZlRpbWUgYXMgQmFzZX0gZnJvbSAnQGFqZi9jb3JlL3RpbWUnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgZm9yd2FyZFJlZixcbiAgT25EZXN0cm95LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY29uc3QgQUpGX1RJTUVfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQWpmVGltZSksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXRpbWUnLFxuICB0ZW1wbGF0ZVVybDogJ3RpbWUuaHRtbCcsXG4gIHN0eWxlVXJsczogWyd0aW1lLnNjc3MnXSxcbiAgcHJvdmlkZXJzOiBbQUpGX1RJTUVfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBBamZUaW1lIGV4dGVuZHMgQmFzZSBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkRlc3Ryb3kge1xuICBob3Vyc0xpc3Q6IG51bWJlcltdID0gQXJyYXkuZnJvbSh7bGVuZ3RoOiAyNH0sIChfLCBpKSA9PiBpKTtcbiAgbWludXRlc0xpc3Q6IG51bWJlcltdID0gQXJyYXkuZnJvbSh7bGVuZ3RoOiA2MH0sIChfLCBpKSA9PiBpKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiYWpmLXRpbWVcIj5cbiAgPG1hdC1zZWxlY3RcbiAgICBjbGFzcz1cImFqZi10aW1lLXNlbGVjdFwiXG4gICAgWyhuZ01vZGVsKV09XCJob3Vyc1wiXG4gICAgKG9wZW5lZCk9XCJmb2N1c0hhbmRsZXIoKVwiXG4gICAgcGxhY2Vob2xkZXI9XCJISFwiXG4gID5cbiAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgaCBvZiBob3Vyc0xpc3RcIiBbdmFsdWVdPVwiaFwiPiB7eyBoIHwgbnVtYmVyIDogJzIuMCcgfX0gPC9tYXQtb3B0aW9uPlxuICA8L21hdC1zZWxlY3Q+XG4gIDxzcGFuIGNsYXNzPVwiYWpmLXRpbWUtc2VwXCI+Ojwvc3Bhbj5cbiAgPG1hdC1zZWxlY3RcbiAgICBjbGFzcz1cImFqZi10aW1lLXNlbGVjdFwiXG4gICAgWyhuZ01vZGVsKV09XCJtaW51dGVzXCJcbiAgICAob3BlbmVkKT1cImZvY3VzSGFuZGxlcigpXCJcbiAgICBwbGFjZWhvbGRlcj1cIk1NXCJcbiAgPlxuICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBtIG9mIG1pbnV0ZXNMaXN0XCIgW3ZhbHVlXT1cIm1cIj4ge3sgbSB8IG51bWJlciA6ICcyLjAnIH19IDwvbWF0LW9wdGlvbj5cbiAgPC9tYXQtc2VsZWN0PlxuICA8bWF0LWljb24gY2xhc3M9XCJhamYtdGltZS1pY29uXCI+c2NoZWR1bGU8L21hdC1pY29uPlxuPC9kaXY+XG4iXX0=