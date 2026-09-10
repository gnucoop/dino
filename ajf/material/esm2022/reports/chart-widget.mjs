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
import * as i1 from "@ajf/core/chart";
import * as i2 from "@angular/common";
import * as i3 from "@ajf/core/reports";
function AjfChartWidgetComponent_ajf_widget_export_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ajf-widget-export", 1);
    i0.ɵɵelement(1, "ajf-chart", 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("widgetType", ctx_r0.instance.widgetType)("data", ctx_r0.instance.data)("enable", ctx_r0.instance.exportable);
    i0.ɵɵadvance();
    i0.ɵɵproperty("chartType", ctx_r0.instance.chartType)("options", ctx_r0.instance.widget.options)("data", ctx_r0.instance.data)("mainDataNumberThreshold", ctx_r0.instance.mainDataNumberThreshold)("removeZeroValues", ctx_r0.instance.removeZeroValues)("instance", ctx_r0.instance);
} }
export class AjfChartWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
    }
    static { this.ɵfac = function AjfChartWidgetComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfChartWidgetComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.ElementRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfChartWidgetComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [[3, "widgetType", "data", "enable", 4, "ngIf"], [3, "widgetType", "data", "enable"], [3, "chartType", "options", "data", "mainDataNumberThreshold", "removeZeroValues", "instance"]], template: function AjfChartWidgetComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfChartWidgetComponent_ajf_widget_export_0_Template, 2, 9, "ajf-widget-export", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.instance);
        } }, dependencies: [i1.AjfChartComponent, i2.NgIf, i3.AjfWidgetExport], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfChartWidgetComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-widget-export *ngIf=\"instance\"\n    [widgetType]=\"instance.widgetType\"\n    [data]=\"instance.data\"\n    [enable]=\"instance.exportable\">\n  <ajf-chart\n      [chartType]=\"instance.chartType\"\n      [options]=\"instance.widget.options\"\n      [data]=\"instance.data\"\n      [mainDataNumberThreshold]=\"instance.mainDataNumberThreshold\"\n      [removeZeroValues]=\"instance.removeZeroValues\"\n      [instance]=\"instance\">\n  </ajf-chart>\n</ajf-widget-export>\n" }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfChartWidgetComponent, { className: "AjfChartWidgetComponent", filePath: "chart-widget.ts", lineNumber: 38 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQtd2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvcmVwb3J0cy9zcmMvY2hhcnQtd2lkZ2V0LnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvcmVwb3J0cy9zcmMvY2hhcnQtd2lkZ2V0Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLHNCQUFzQixFQUF5QixNQUFNLG1CQUFtQixDQUFDO0FBQ2pGLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUVULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQzs7Ozs7O0lDN0J2Qiw0Q0FHbUM7SUFDakMsK0JBT1k7SUFDZCxpQkFBb0I7OztJQVRoQixBQURBLEFBREEsdURBQWtDLDhCQUNaLHNDQUNRO0lBRTVCLGNBQWdDO0lBS2hDLEFBREEsQUFEQSxBQURBLEFBREEsQUFEQSxxREFBZ0MsMkNBQ0csOEJBQ2Isb0VBQ3NDLHNEQUNkLDZCQUN6Qjs7QUQyQjNCLE1BQU0sT0FBTyx1QkFBd0IsU0FBUSxzQkFBOEM7SUFDekYsWUFBWSxHQUFzQixFQUFFLEVBQWM7UUFDaEQsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNqQixDQUFDO3dIQUhVLHVCQUF1QjtvRUFBdkIsdUJBQXVCO1lDckNwQyxvR0FHbUM7O1lBSGYsbUNBQWM7OztpRkRxQ3JCLHVCQUF1QjtjQU5uQyxTQUFTO2tDQUdTLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUk7O2tGQUUxQix1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQmFzZVdpZGdldENvbXBvbmVudCwgQWpmQ2hhcnRXaWRnZXRJbnN0YW5jZX0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlVXJsOiAnY2hhcnQtd2lkZ2V0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY2hhcnQtd2lkZ2V0LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkNoYXJ0V2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWpmQmFzZVdpZGdldENvbXBvbmVudDxBamZDaGFydFdpZGdldEluc3RhbmNlPiB7XG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGVsOiBFbGVtZW50UmVmKSB7XG4gICAgc3VwZXIoY2RyLCBlbCk7XG4gIH1cbn1cbiIsIjxhamYtd2lkZ2V0LWV4cG9ydCAqbmdJZj1cImluc3RhbmNlXCJcbiAgICBbd2lkZ2V0VHlwZV09XCJpbnN0YW5jZS53aWRnZXRUeXBlXCJcbiAgICBbZGF0YV09XCJpbnN0YW5jZS5kYXRhXCJcbiAgICBbZW5hYmxlXT1cImluc3RhbmNlLmV4cG9ydGFibGVcIj5cbiAgPGFqZi1jaGFydFxuICAgICAgW2NoYXJ0VHlwZV09XCJpbnN0YW5jZS5jaGFydFR5cGVcIlxuICAgICAgW29wdGlvbnNdPVwiaW5zdGFuY2Uud2lkZ2V0Lm9wdGlvbnNcIlxuICAgICAgW2RhdGFdPVwiaW5zdGFuY2UuZGF0YVwiXG4gICAgICBbbWFpbkRhdGFOdW1iZXJUaHJlc2hvbGRdPVwiaW5zdGFuY2UubWFpbkRhdGFOdW1iZXJUaHJlc2hvbGRcIlxuICAgICAgW3JlbW92ZVplcm9WYWx1ZXNdPVwiaW5zdGFuY2UucmVtb3ZlWmVyb1ZhbHVlc1wiXG4gICAgICBbaW5zdGFuY2VdPVwiaW5zdGFuY2VcIj5cbiAgPC9hamYtY2hhcnQ+XG48L2FqZi13aWRnZXQtZXhwb3J0PlxuIl19