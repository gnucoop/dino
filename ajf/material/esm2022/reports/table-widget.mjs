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
import { AjfBaseWidgetComponent } from '@ajf/core/reports';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/core/table";
import * as i2 from "@angular/common";
import * as i3 from "@ajf/core/reports";
function AjfTableWidgetComponent_ajf_widget_export_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ajf-widget-export", 1);
    i0.ɵɵelement(1, "ajf-table", 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("widgetType", ctx_r0.instance.widgetType)("data", ctx_r0.instance.data)("enable", ctx_r0.instance.exportable);
    i0.ɵɵadvance();
    i0.ɵɵproperty("data", ctx_r0.instance.data);
} }
export class AjfTableWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
    }
    static { this.ɵfac = function AjfTableWidgetComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfTableWidgetComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.ElementRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfTableWidgetComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [[3, "widgetType", "data", "enable", 4, "ngIf"], [3, "widgetType", "data", "enable"], [3, "data"]], template: function AjfTableWidgetComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfTableWidgetComponent_ajf_widget_export_0_Template, 2, 4, "ajf-widget-export", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.instance);
        } }, dependencies: [i1.AjfTable, i2.NgIf, i3.AjfWidgetExport], styles: ["table{border-spacing:0}table tr th,table tr td{padding:10px}table tr td .read_more_cell{cursor:pointer;margin:0;white-space:nowrap;display:inline-block}table tr td .read_more_text{padding-right:5px;margin:0;display:inline-block;white-space:nowrap}table tr td .material-icons{vertical-align:middle;cursor:pointer}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfTableWidgetComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-widget-export\n  *ngIf=\"instance\"\n  [widgetType]=\"instance.widgetType\"\n  [data]=\"instance.data\"\n  [enable]=\"instance.exportable\"\n>\n  <ajf-table [data]=\"instance.data\"></ajf-table>\n</ajf-widget-export>\n", styles: ["table{border-spacing:0}table tr th,table tr td{padding:10px}table tr td .read_more_cell{cursor:pointer;margin:0;white-space:nowrap;display:inline-block}table tr td .read_more_text{padding-right:5px;margin:0;display:inline-block;white-space:nowrap}table tr td .material-icons{vertical-align:middle;cursor:pointer}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfTableWidgetComponent, { className: "AjfTableWidgetComponent", filePath: "table-widget.ts", lineNumber: 38 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtd2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvcmVwb3J0cy9zcmMvdGFibGUtd2lkZ2V0LnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvcmVwb3J0cy9zcmMvdGFibGUtd2lkZ2V0Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLHNCQUFzQixFQUF5QixNQUFNLG1CQUFtQixDQUFDO0FBQ2pGLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUVULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQzs7Ozs7O0lDN0J2Qiw0Q0FLQztJQUNDLCtCQUE4QztJQUNoRCxpQkFBb0I7OztJQUhsQixBQURBLEFBREEsdURBQWtDLDhCQUNaLHNDQUNRO0lBRW5CLGNBQXNCO0lBQXRCLDJDQUFzQjs7QUQrQm5DLE1BQU0sT0FBTyx1QkFBd0IsU0FBUSxzQkFBOEM7SUFDekYsWUFBWSxHQUFzQixFQUFFLEVBQWM7UUFDaEQsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNqQixDQUFDO3dIQUhVLHVCQUF1QjtvRUFBdkIsdUJBQXVCO1lDckNwQyxvR0FLQzs7WUFKRSxtQ0FBYzs7O2lGRG9DSix1QkFBdUI7Y0FObkMsU0FBUztrQ0FHUyx1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJOztrRkFFMUIsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkJhc2VXaWRnZXRDb21wb25lbnQsIEFqZlRhYmxlV2lkZ2V0SW5zdGFuY2V9IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZVVybDogJ3RhYmxlLXdpZGdldC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3RhYmxlLXdpZGdldC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZUYWJsZVdpZGdldENvbXBvbmVudCBleHRlbmRzIEFqZkJhc2VXaWRnZXRDb21wb25lbnQ8QWpmVGFibGVXaWRnZXRJbnN0YW5jZT4ge1xuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBlbDogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKGNkciwgZWwpO1xuICB9XG59XG4iLCI8YWpmLXdpZGdldC1leHBvcnRcbiAgKm5nSWY9XCJpbnN0YW5jZVwiXG4gIFt3aWRnZXRUeXBlXT1cImluc3RhbmNlLndpZGdldFR5cGVcIlxuICBbZGF0YV09XCJpbnN0YW5jZS5kYXRhXCJcbiAgW2VuYWJsZV09XCJpbnN0YW5jZS5leHBvcnRhYmxlXCJcbj5cbiAgPGFqZi10YWJsZSBbZGF0YV09XCJpbnN0YW5jZS5kYXRhXCI+PC9hamYtdGFibGU+XG48L2FqZi13aWRnZXQtZXhwb3J0PlxuIl19