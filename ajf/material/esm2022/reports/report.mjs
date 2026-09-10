import { AjfReportRenderer as CoreReportRenderer, } from '@ajf/core/reports';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/core/common";
import * as i2 from "@angular/common";
import * as i3 from "@ajf/core/reports";
import * as i4 from "./widget";
function AjfReportRenderer_ng_template_0_div_0_ng_template_1_ajf_widget_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-widget", 7);
} if (rf & 2) {
    const instance_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("instance", instance_r1);
} }
function AjfReportRenderer_ng_template_0_div_0_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfReportRenderer_ng_template_0_div_0_ng_template_1_ajf_widget_0_Template, 1, 1, "ajf-widget", 6);
} if (rf & 2) {
    const instance_r1 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", instance_r1.visible);
} }
function AjfReportRenderer_ng_template_0_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵtemplate(1, AjfReportRenderer_ng_template_0_div_0_ng_template_1_Template, 1, 1, "ng-template", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("@.disabled", undefined)("applyStyles", ctx_r1.instance.header.styles);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.instance.header.content);
} }
function AjfReportRenderer_ng_template_0_div_1_ajf_widget_export_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-widget-export", 10);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("overlay", false)("widgets", ctx_r1.instance.content.content)("enable", true);
} }
function AjfReportRenderer_ng_template_0_div_1_ng_template_2_ajf_widget_0_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ajf-widget", 12);
    i0.ɵɵlistener("filterWidgetChange", function AjfReportRenderer_ng_template_0_div_1_ng_template_2_ajf_widget_0_Template_ajf_widget_filterWidgetChange_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.filterWidgetChanged($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const instance_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("instance", instance_r4);
} }
function AjfReportRenderer_ng_template_0_div_1_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfReportRenderer_ng_template_0_div_1_ng_template_2_ajf_widget_0_Template, 1, 1, "ajf-widget", 11);
} if (rf & 2) {
    const instance_r4 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", instance_r4.visible);
} }
function AjfReportRenderer_ng_template_0_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵtemplate(1, AjfReportRenderer_ng_template_0_div_1_ajf_widget_export_1_Template, 1, 3, "ajf-widget-export", 9)(2, AjfReportRenderer_ng_template_0_div_1_ng_template_2_Template, 1, 1, "ng-template", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("@.disabled", undefined)("applyStyles", ctx_r1.instance.content.styles);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.enableExportAll);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.instance.content.content);
} }
function AjfReportRenderer_ng_template_0_div_2_ng_template_1_ajf_widget_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-widget", 7);
} if (rf & 2) {
    const instance_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("instance", instance_r5);
} }
function AjfReportRenderer_ng_template_0_div_2_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfReportRenderer_ng_template_0_div_2_ng_template_1_ajf_widget_0_Template, 1, 1, "ajf-widget", 6);
} if (rf & 2) {
    const instance_r5 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", instance_r5.visible);
} }
function AjfReportRenderer_ng_template_0_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵtemplate(1, AjfReportRenderer_ng_template_0_div_2_ng_template_1_Template, 1, 1, "ng-template", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("@.disabled", undefined)("applyStyles", ctx_r1.instance.footer.styles);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.instance.footer.content);
} }
function AjfReportRenderer_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfReportRenderer_ng_template_0_div_0_Template, 2, 3, "div", 1)(1, AjfReportRenderer_ng_template_0_div_1_Template, 3, 4, "div", 2)(2, AjfReportRenderer_ng_template_0_div_2_Template, 2, 3, "div", 3);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngIf", ctx_r1.instance.header);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.instance.content);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.instance.footer);
} }
export class AjfReportRenderer extends CoreReportRenderer {
    constructor(cdr) {
        super(cdr);
        this.filterWidgetChange = new EventEmitter();
    }
    filterWidgetChanged(changes) {
        const report = this.instance;
        if (report.content.content.length === 1) {
            // Report likely has 1 global layout widget with a filter,
            // create a copy of the report with the updated layout widget
            const layout = changes.widget;
            const contentContent = [layout];
            const content = { ...report.content, content: contentContent };
            const newReport = { ...report, content };
            this.filterWidgetChange.emit({ context: changes.context, report: newReport });
        }
        else {
            this.filterWidgetChange.emit({ context: changes.context });
        }
    }
    static { this.ɵfac = function AjfReportRenderer_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfReportRenderer)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfReportRenderer, selectors: [["ajf-report"]], outputs: { filterWidgetChange: "filterWidgetChange" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [[3, "ngIf"], ["class", "ajf-report-header", 3, "applyStyles", 4, "ngIf"], ["class", "ajf-report-content", 3, "applyStyles", 4, "ngIf"], ["class", "ajf-report-footer", 3, "applyStyles", 4, "ngIf"], [1, "ajf-report-header", 3, "applyStyles"], ["ngFor", "", 3, "ngForOf"], [3, "instance", 4, "ngIf"], [3, "instance"], [1, "ajf-report-content", 3, "applyStyles"], [3, "overlay", "widgets", "enable", 4, "ngIf"], [3, "overlay", "widgets", "enable"], [3, "instance", "filterWidgetChange", 4, "ngIf"], [3, "filterWidgetChange", "instance"], [1, "ajf-report-footer", 3, "applyStyles"]], template: function AjfReportRenderer_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfReportRenderer_ng_template_0_Template, 3, 3, "ng-template", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.instance);
        } }, dependencies: [i1.ApplyStylesDirective, i2.NgForOf, i2.NgIf, i3.AjfWidgetExport, i4.AjfReportWidget], styles: ["ajf-report{display:flex;flex-direction:column;align-items:stretch;box-sizing:border-box;position:relative;width:100%}ajf-report h1,ajf-report h2,ajf-report h3,ajf-report h4,ajf-report h5,ajf-report h6,ajf-report p{padding:0;margin:0}ajf-report .ajf-loading{position:absolute;inset:0;min-height:300px;padding:100px;text-align:center;background-color:#f0f0f066;display:flex;justify-content:center}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfReportRenderer, [{
        type: Component,
        args: [{ selector: 'ajf-report', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template [ngIf]=\"instance\">\n  <div *ngIf=\"instance.header\" @.disabled [applyStyles]=\"instance.header.styles\" class=\"ajf-report-header\">\n    <ng-template ngFor let-instance [ngForOf]=\"instance.header.content\">\n      <ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget>\n    </ng-template>\n  </div>\n  <div *ngIf=\"instance.content\" @.disabled [applyStyles]=\"instance.content.styles\" class=\"ajf-report-content\">\n    <ajf-widget-export *ngIf=\"enableExportAll\"\n      [overlay]=\"false\"\n      [widgets]=\"instance.content.content\"\n      [enable]=\"true\"></ajf-widget-export>\n    <ng-template ngFor let-instance [ngForOf]=\"instance.content.content\">\n      <ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"\n        (filterWidgetChange)=\"filterWidgetChanged($event)\">\n      </ajf-widget>\n    </ng-template>\n  </div>\n  <div *ngIf=\"instance.footer\" @.disabled [applyStyles]=\"instance.footer.styles\" class=\"ajf-report-footer\">\n    <ng-template ngFor let-instance [ngForOf]=\"instance.footer.content\">\n      <ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget>\n    </ng-template>\n  </div>\n</ng-template>\n", styles: ["ajf-report{display:flex;flex-direction:column;align-items:stretch;box-sizing:border-box;position:relative;width:100%}ajf-report h1,ajf-report h2,ajf-report h3,ajf-report h4,ajf-report h5,ajf-report h6,ajf-report p{padding:0;margin:0}ajf-report .ajf-loading{position:absolute;inset:0;min-height:300px;padding:100px;text-align:center;background-color:#f0f0f066;display:flex;justify-content:center}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }], { filterWidgetChange: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfReportRenderer, { className: "AjfReportRenderer", filePath: "report.ts", lineNumber: 45 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvcmVwb3J0cy9zcmMvcmVwb3J0LnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvcmVwb3J0cy9zcmMvcmVwb3J0Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUJBLE9BQU8sRUFFTCxpQkFBaUIsSUFBSSxrQkFBa0IsR0FFeEMsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQzs7Ozs7OztJQ2hDakIsZ0NBQXdFOzs7SUFBbkMsc0NBQXFCOzs7SUFBMUQsa0hBQTJEOzs7SUFBOUMsMENBQXNCOzs7SUFGdkMsOEJBQXlHO0lBQ3ZHLHNHQUFvRTtJQUd0RSxpQkFBTTs7O0lBSmtDLEFBQVgsc0NBQVUsOENBQXVDO0lBQzVDLGNBQW1DO0lBQW5DLHdEQUFtQzs7O0lBS25FLHdDQUdzQzs7O0lBQXBDLEFBREEsQUFEQSwrQkFBaUIsNENBQ21CLGdCQUNyQjs7OztJQUVmLHNDQUNxRDtJQUFuRCwyUEFBc0Isa0NBQTJCLEtBQUM7SUFDcEQsaUJBQWE7OztJQUZ3QixzQ0FBcUI7OztJQUExRCxtSEFDcUQ7OztJQUR4QywwQ0FBc0I7OztJQU52Qyw4QkFBNEc7SUFLMUcsQUFKQSxrSEFHa0IseUZBQ21EO0lBS3ZFLGlCQUFNOzs7SUFWbUMsQUFBWCxzQ0FBVSwrQ0FBd0M7SUFDMUQsY0FBcUI7SUFBckIsNkNBQXFCO0lBSVQsY0FBb0M7SUFBcEMseURBQW9DOzs7SUFRbEUsZ0NBQXdFOzs7SUFBbkMsc0NBQXFCOzs7SUFBMUQsa0hBQTJEOzs7SUFBOUMsMENBQXNCOzs7SUFGdkMsK0JBQXlHO0lBQ3ZHLHNHQUFvRTtJQUd0RSxpQkFBTTs7O0lBSmtDLEFBQVgsc0NBQVUsOENBQXVDO0lBQzVDLGNBQW1DO0lBQW5DLHdEQUFtQzs7O0lBRHJFLEFBWEEsQUFMQSxnRkFBeUcsbUVBS0csbUVBV0g7OztJQWhCbkcsNkNBQXFCO0lBS3JCLGNBQXNCO0lBQXRCLDhDQUFzQjtJQVd0QixjQUFxQjtJQUFyQiw2Q0FBcUI7O0FEMkI3QixNQUFNLE9BQU8saUJBQWtCLFNBQVEsa0JBQWtCO0lBR3ZELFlBQVksR0FBc0I7UUFDaEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBSEgsdUJBQWtCLEdBQUcsSUFBSSxZQUFZLEVBQXFELENBQUM7SUFJckcsQ0FBQztJQUVELG1CQUFtQixDQUFDLE9BQXlEO1FBQzNFLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFTLENBQUM7UUFDOUIsSUFBSSxNQUFNLENBQUMsT0FBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDekMsMERBQTBEO1lBQzFELDZEQUE2RDtZQUM3RCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQzlCLE1BQU0sY0FBYyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEMsTUFBTSxPQUFPLEdBQUcsRUFBQyxHQUFHLE1BQU0sQ0FBQyxPQUFRLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBQyxDQUFDO1lBQzlELE1BQU0sU0FBUyxHQUFHLEVBQUMsR0FBRyxNQUFNLEVBQUUsT0FBTyxFQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDO1FBQzlFLENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQztRQUMzRCxDQUFDO0lBQ0gsQ0FBQztrSEFwQlUsaUJBQWlCO29FQUFqQixpQkFBaUI7WUM1QzlCLGtGQUErQjs7WUFBbEIsbUNBQWlCOzs7aUZENENqQixpQkFBaUI7Y0FQN0IsU0FBUzsyQkFDRSxZQUFZLGlCQUdQLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU07a0RBR3JDLGtCQUFrQjtrQkFBM0IsTUFBTTs7a0ZBREksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHR9IGZyb20gJ0BhamYvY29yZS9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWpmUmVwb3J0SW5zdGFuY2UsXG4gIEFqZlJlcG9ydFJlbmRlcmVyIGFzIENvcmVSZXBvcnRSZW5kZXJlcixcbiAgQWpmV2lkZ2V0SW5zdGFuY2UsXG59IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIE91dHB1dCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcmVwb3J0JyxcbiAgdGVtcGxhdGVVcmw6ICdyZXBvcnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydyZXBvcnQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0UmVuZGVyZXIgZXh0ZW5kcyBDb3JlUmVwb3J0UmVuZGVyZXIge1xuICBAT3V0cHV0KCkgZmlsdGVyV2lkZ2V0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7Y29udGV4dDogQWpmQ29udGV4dCwgcmVwb3J0PzogQWpmUmVwb3J0SW5zdGFuY2V9PigpO1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBzdXBlcihjZHIpO1xuICB9XG5cbiAgZmlsdGVyV2lkZ2V0Q2hhbmdlZChjaGFuZ2VzOiB7Y29udGV4dDogQWpmQ29udGV4dCwgd2lkZ2V0OiBBamZXaWRnZXRJbnN0YW5jZX0pIHtcbiAgICBjb25zdCByZXBvcnQgPSB0aGlzLmluc3RhbmNlITtcbiAgICBpZiAocmVwb3J0LmNvbnRlbnQhLmNvbnRlbnQubGVuZ3RoID09PSAxKSB7XG4gICAgICAvLyBSZXBvcnQgbGlrZWx5IGhhcyAxIGdsb2JhbCBsYXlvdXQgd2lkZ2V0IHdpdGggYSBmaWx0ZXIsXG4gICAgICAvLyBjcmVhdGUgYSBjb3B5IG9mIHRoZSByZXBvcnQgd2l0aCB0aGUgdXBkYXRlZCBsYXlvdXQgd2lkZ2V0XG4gICAgICBjb25zdCBsYXlvdXQgPSBjaGFuZ2VzLndpZGdldDtcbiAgICAgIGNvbnN0IGNvbnRlbnRDb250ZW50ID0gW2xheW91dF07XG4gICAgICBjb25zdCBjb250ZW50ID0gey4uLnJlcG9ydC5jb250ZW50ISwgY29udGVudDogY29udGVudENvbnRlbnR9O1xuICAgICAgY29uc3QgbmV3UmVwb3J0ID0gey4uLnJlcG9ydCwgY29udGVudH07XG4gICAgICB0aGlzLmZpbHRlcldpZGdldENoYW5nZS5lbWl0KHtjb250ZXh0OiBjaGFuZ2VzLmNvbnRleHQsIHJlcG9ydDogbmV3UmVwb3J0fSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmlsdGVyV2lkZ2V0Q2hhbmdlLmVtaXQoe2NvbnRleHQ6IGNoYW5nZXMuY29udGV4dH0pO1xuICAgIH1cbiAgfVxufVxuIiwiPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImluc3RhbmNlXCI+XG4gIDxkaXYgKm5nSWY9XCJpbnN0YW5jZS5oZWFkZXJcIiBALmRpc2FibGVkIFthcHBseVN0eWxlc109XCJpbnN0YW5jZS5oZWFkZXIuc3R5bGVzXCIgY2xhc3M9XCJhamYtcmVwb3J0LWhlYWRlclwiPlxuICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtaW5zdGFuY2UgW25nRm9yT2ZdPVwiaW5zdGFuY2UuaGVhZGVyLmNvbnRlbnRcIj5cbiAgICAgIDxhamYtd2lkZ2V0ICpuZ0lmPVwiaW5zdGFuY2UudmlzaWJsZVwiIFtpbnN0YW5jZV09XCJpbnN0YW5jZVwiPjwvYWpmLXdpZGdldD5cbiAgICA8L25nLXRlbXBsYXRlPlxuICA8L2Rpdj5cbiAgPGRpdiAqbmdJZj1cImluc3RhbmNlLmNvbnRlbnRcIiBALmRpc2FibGVkIFthcHBseVN0eWxlc109XCJpbnN0YW5jZS5jb250ZW50LnN0eWxlc1wiIGNsYXNzPVwiYWpmLXJlcG9ydC1jb250ZW50XCI+XG4gICAgPGFqZi13aWRnZXQtZXhwb3J0ICpuZ0lmPVwiZW5hYmxlRXhwb3J0QWxsXCJcbiAgICAgIFtvdmVybGF5XT1cImZhbHNlXCJcbiAgICAgIFt3aWRnZXRzXT1cImluc3RhbmNlLmNvbnRlbnQuY29udGVudFwiXG4gICAgICBbZW5hYmxlXT1cInRydWVcIj48L2FqZi13aWRnZXQtZXhwb3J0PlxuICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtaW5zdGFuY2UgW25nRm9yT2ZdPVwiaW5zdGFuY2UuY29udGVudC5jb250ZW50XCI+XG4gICAgICA8YWpmLXdpZGdldCAqbmdJZj1cImluc3RhbmNlLnZpc2libGVcIiBbaW5zdGFuY2VdPVwiaW5zdGFuY2VcIlxuICAgICAgICAoZmlsdGVyV2lkZ2V0Q2hhbmdlKT1cImZpbHRlcldpZGdldENoYW5nZWQoJGV2ZW50KVwiPlxuICAgICAgPC9hamYtd2lkZ2V0PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIDwvZGl2PlxuICA8ZGl2ICpuZ0lmPVwiaW5zdGFuY2UuZm9vdGVyXCIgQC5kaXNhYmxlZCBbYXBwbHlTdHlsZXNdPVwiaW5zdGFuY2UuZm9vdGVyLnN0eWxlc1wiIGNsYXNzPVwiYWpmLXJlcG9ydC1mb290ZXJcIj5cbiAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWluc3RhbmNlIFtuZ0Zvck9mXT1cImluc3RhbmNlLmZvb3Rlci5jb250ZW50XCI+XG4gICAgICA8YWpmLXdpZGdldCAqbmdJZj1cImluc3RhbmNlLnZpc2libGVcIiBbaW5zdGFuY2VdPVwiaW5zdGFuY2VcIj48L2FqZi13aWRnZXQ+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgPC9kaXY+XG48L25nLXRlbXBsYXRlPlxuIl19