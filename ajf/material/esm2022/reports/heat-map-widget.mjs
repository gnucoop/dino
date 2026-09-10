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
import * as i1 from "@ajf/core/heat-map";
import * as i2 from "@angular/common";
function AjfHeatMapWidgetComponent_ajf_heat_map_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-heat-map", 1);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("idProp", ctx_r0.instance.idProp)("features", ctx_r0.instance.features)("values", ctx_r0.instance.values)("startColor", ctx_r0.instance.startColor)("endColor", ctx_r0.instance.endColor)("highlightColor", ctx_r0.instance.highlightColor)("showVisualMap", ctx_r0.instance.showVisualMap)("action", ctx_r0.instance.action);
} }
export class AjfHeatMapWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
    }
    static { this.ɵfac = function AjfHeatMapWidgetComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfHeatMapWidgetComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.ElementRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfHeatMapWidgetComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [[3, "idProp", "features", "values", "startColor", "endColor", "highlightColor", "showVisualMap", "action", 4, "ngIf"], [3, "idProp", "features", "values", "startColor", "endColor", "highlightColor", "showVisualMap", "action"]], template: function AjfHeatMapWidgetComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfHeatMapWidgetComponent_ajf_heat_map_0_Template, 1, 8, "ajf-heat-map", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.instance);
        } }, dependencies: [i1.AjfHeatMap, i2.NgIf], styles: ["ajf-widget ajf-heat-map{flex:1;height:100%}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfHeatMapWidgetComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-heat-map\n  *ngIf=\"instance\"\n  [idProp]=\"instance.idProp\"\n  [features]=\"instance.features\"\n  [values]=\"instance.values\"\n  [startColor]=\"instance.startColor\"\n  [endColor]=\"instance.endColor\"\n  [highlightColor]=\"instance.highlightColor\"\n  [showVisualMap]=\"instance.showVisualMap\"\n  [action]=\"instance.action\"\n></ajf-heat-map>\n", styles: ["ajf-widget ajf-heat-map{flex:1;height:100%}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfHeatMapWidgetComponent, { className: "AjfHeatMapWidgetComponent", filePath: "heat-map-widget.ts", lineNumber: 38 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhdC1tYXAtd2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvcmVwb3J0cy9zcmMvaGVhdC1tYXAtd2lkZ2V0LnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvcmVwb3J0cy9zcmMvaGVhdC1tYXAtd2lkZ2V0Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLHNCQUFzQixFQUEyQixNQUFNLG1CQUFtQixDQUFDO0FBQ25GLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUVULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQzs7Ozs7SUM3QnZCLGtDQVVnQjs7O0lBRGQsQUFEQSxBQURBLEFBREEsQUFEQSxBQURBLEFBREEsQUFEQSwrQ0FBMEIsc0NBQ0ksa0NBQ0osMENBQ1Esc0NBQ0osa0RBQ1ksZ0RBQ0Ysa0NBQ2Q7O0FENEI1QixNQUFNLE9BQU8seUJBQTBCLFNBQVEsc0JBQWdEO0lBQzdGLFlBQVksR0FBc0IsRUFBRSxFQUFjO1FBQ2hELEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDakIsQ0FBQzswSEFIVSx5QkFBeUI7b0VBQXpCLHlCQUF5QjtZQ3JDdEMsNEZBVUM7O1lBVEUsbUNBQWM7OztpRkRvQ0oseUJBQXlCO2NBTnJDLFNBQVM7a0NBR1MsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTs7a0ZBRTFCLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZCYXNlV2lkZ2V0Q29tcG9uZW50LCBBamZIZWF0TWFwV2lkZ2V0SW5zdGFuY2V9IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZVVybDogJ2hlYXQtbWFwLXdpZGdldC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2hlYXQtbWFwLXdpZGdldC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZIZWF0TWFwV2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWpmQmFzZVdpZGdldENvbXBvbmVudDxBamZIZWF0TWFwV2lkZ2V0SW5zdGFuY2U+IHtcbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZWw6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcihjZHIsIGVsKTtcbiAgfVxufVxuIiwiPGFqZi1oZWF0LW1hcFxuICAqbmdJZj1cImluc3RhbmNlXCJcbiAgW2lkUHJvcF09XCJpbnN0YW5jZS5pZFByb3BcIlxuICBbZmVhdHVyZXNdPVwiaW5zdGFuY2UuZmVhdHVyZXNcIlxuICBbdmFsdWVzXT1cImluc3RhbmNlLnZhbHVlc1wiXG4gIFtzdGFydENvbG9yXT1cImluc3RhbmNlLnN0YXJ0Q29sb3JcIlxuICBbZW5kQ29sb3JdPVwiaW5zdGFuY2UuZW5kQ29sb3JcIlxuICBbaGlnaGxpZ2h0Q29sb3JdPVwiaW5zdGFuY2UuaGlnaGxpZ2h0Q29sb3JcIlxuICBbc2hvd1Zpc3VhbE1hcF09XCJpbnN0YW5jZS5zaG93VmlzdWFsTWFwXCJcbiAgW2FjdGlvbl09XCJpbnN0YW5jZS5hY3Rpb25cIlxuPjwvYWpmLWhlYXQtbWFwPlxuIl19