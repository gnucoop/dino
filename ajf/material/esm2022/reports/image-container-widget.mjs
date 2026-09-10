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
import { AjfImageType } from '@ajf/core/image';
import { AjfBaseWidgetComponent } from '@ajf/core/reports';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/core/common";
import * as i2 from "@ajf/material/image";
import * as i3 from "@angular/common";
function AjfImageContainerWidgetComponent_div_0_ng_template_1_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelement(1, "ajf-image", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const icw_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("type", ctx_r1.instance.widget.imageType)("imageUrl", icw_r1)("icon", null)("flag", null)("applyStyles", ctx_r1.instance.widget.styles);
} }
function AjfImageContainerWidgetComponent_div_0_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfImageContainerWidgetComponent_div_0_ng_template_1_div_0_Template, 2, 5, "div", 3);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.instance.urls);
} }
function AjfImageContainerWidgetComponent_div_0_ng_template_2_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelement(1, "ajf-image", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const icw_r3 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("type", ctx_r1.instance.widget.imageType)("imageUrl", null)("icon", null)("flag", icw_r3)("applyStyles", ctx_r1.instance.widget.styles);
} }
function AjfImageContainerWidgetComponent_div_0_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfImageContainerWidgetComponent_div_0_ng_template_2_div_0_Template, 2, 5, "div", 3);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.instance.flags);
} }
function AjfImageContainerWidgetComponent_div_0_ng_template_3_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelement(1, "ajf-image", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const icw_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("type", ctx_r1.instance.widget.imageType)("imageUrl", null)("icon", icw_r4)("flag", null)("applyStyles", ctx_r1.instance.widget.styles);
} }
function AjfImageContainerWidgetComponent_div_0_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfImageContainerWidgetComponent_div_0_ng_template_3_div_0_Template, 2, 5, "div", 3);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.instance.icons);
} }
function AjfImageContainerWidgetComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtemplate(1, AjfImageContainerWidgetComponent_div_0_ng_template_1_Template, 1, 1, "ng-template", 2)(2, AjfImageContainerWidgetComponent_div_0_ng_template_2_Template, 1, 1, "ng-template", 2)(3, AjfImageContainerWidgetComponent_div_0_ng_template_3_Template, 1, 1, "ng-template", 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngSwitch", ctx_r1.instance.widget.imageType);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", ctx_r1.imageTypes.Image);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", ctx_r1.imageTypes.Flag);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", ctx_r1.imageTypes.Icon);
} }
export class AjfImageContainerWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
        this.imageTypes = AjfImageType;
    }
    static { this.ɵfac = function AjfImageContainerWidgetComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfImageContainerWidgetComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.ElementRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfImageContainerWidgetComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [["class", "ajf-image-container ajf-columns", 3, "ngSwitch", 4, "ngIf"], [1, "ajf-image-container", "ajf-columns", 3, "ngSwitch"], [3, "ngSwitchCase"], ["class", "ajf-column", 4, "ngFor", "ngForOf"], [1, "ajf-column"], [3, "type", "imageUrl", "icon", "flag", "applyStyles"]], template: function AjfImageContainerWidgetComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfImageContainerWidgetComponent_div_0_Template, 4, 4, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.instance);
        } }, dependencies: [i1.ApplyStylesDirective, i2.AjfImage, i3.NgForOf, i3.NgIf, i3.NgSwitch, i3.NgSwitchCase], styles: [".ajf-image-container img{max-width:none;max-height:none}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfImageContainerWidgetComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div *ngIf=\"instance\" class=\"ajf-image-container ajf-columns\" [ngSwitch]=\"instance.widget.imageType\">\n  <ng-template [ngSwitchCase]=\"imageTypes.Image\">\n    <div *ngFor=\"let icw of instance.urls; let idx = index\" class=\"ajf-column\">\n      <ajf-image\n          [type]=\"instance.widget.imageType\"\n          [imageUrl]=\"icw\"\n          [icon]=\"null\"\n          [flag]=\"null\"\n          [applyStyles]=\"instance.widget!.styles\"\n      ></ajf-image>\n    </div>\n  </ng-template>\n  <ng-template [ngSwitchCase]=\"imageTypes.Flag\">\n      <div *ngFor=\"let icw of instance.flags; let idx = index\" class=\"ajf-column\">\n        <ajf-image\n            [type]=\"instance.widget.imageType\"\n            [imageUrl]=\"null\"\n            [icon]=\"null\"\n            [flag]=\"icw\"\n            [applyStyles]=\"instance.widget!.styles\"\n        ></ajf-image>\n      </div>\n  </ng-template>\n  <ng-template [ngSwitchCase]=\"imageTypes.Icon\">\n      <div *ngFor=\"let icw of instance.icons; let idx = index\" class=\"ajf-column\">\n        <ajf-image\n            [type]=\"instance.widget.imageType\"\n            [imageUrl]=\"null\"\n            [icon]=\"icw\"\n            [flag]=\"null\"\n            [applyStyles]=\"instance.widget!.styles\"\n        ></ajf-image>\n      </div>\n  </ng-template>\n</div>\n", styles: [".ajf-image-container img{max-width:none;max-height:none}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfImageContainerWidgetComponent, { className: "AjfImageContainerWidgetComponent", filePath: "image-container-widget.ts", lineNumber: 39 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtY29udGFpbmVyLXdpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL3JlcG9ydHMvc3JjL2ltYWdlLWNvbnRhaW5lci13aWRnZXQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9yZXBvcnRzL3NyYy9pbWFnZS1jb250YWluZXItd2lkZ2V0Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxzQkFBc0IsRUFBa0MsTUFBTSxtQkFBbUIsQ0FBQztBQUMxRixPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFFVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7Ozs7OztJQzVCbkIsOEJBQTJFO0lBQ3pFLCtCQU1hO0lBQ2YsaUJBQU07Ozs7SUFOQSxjQUFrQztJQUlsQyxBQURBLEFBREEsQUFEQSxBQURBLHVEQUFrQyxvQkFDbEIsY0FDSCxjQUNBLDhDQUMwQjs7O0lBTjdDLHFHQUEyRTs7O0lBQXRELDhDQUFrQjs7O0lBV3JDLDhCQUE0RTtJQUMxRSwrQkFNYTtJQUNmLGlCQUFNOzs7O0lBTkEsY0FBa0M7SUFJbEMsQUFEQSxBQURBLEFBREEsQUFEQSx1REFBa0Msa0JBQ2pCLGNBQ0osZ0JBQ0QsOENBQzJCOzs7SUFON0MscUdBQTRFOzs7SUFBdkQsK0NBQW1COzs7SUFXeEMsOEJBQTRFO0lBQzFFLCtCQU1hO0lBQ2YsaUJBQU07Ozs7SUFOQSxjQUFrQztJQUlsQyxBQURBLEFBREEsQUFEQSxBQURBLHVEQUFrQyxrQkFDakIsZ0JBQ0wsY0FDQyw4Q0FDMEI7OztJQU43QyxxR0FBNEU7OztJQUF2RCwrQ0FBbUI7OztJQXhCOUMsOEJBQXFHO0lBdUJuRyxBQVhBLEFBWEEsdUdBQStDLDBGQVdELDBGQVdBO0lBV2hELGlCQUFNOzs7SUFsQ3dELDJEQUFzQztJQUNyRixjQUFpQztJQUFqQyxzREFBaUM7SUFXakMsY0FBZ0M7SUFBaEMscURBQWdDO0lBV2hDLGNBQWdDO0lBQWhDLHFEQUFnQzs7QURlL0MsTUFBTSxPQUFPLGdDQUFpQyxTQUFRLHNCQUF1RDtJQUczRyxZQUFZLEdBQXNCLEVBQUUsRUFBYztRQUNoRCxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBSFIsZUFBVSxHQUFHLFlBQVksQ0FBQztJQUluQyxDQUFDO2lJQUxVLGdDQUFnQztvRUFBaEMsZ0NBQWdDO1lDdEM3QyxpRkFBcUc7O1lBQS9GLG1DQUFjOzs7aUZEc0NQLGdDQUFnQztjQU41QyxTQUFTO2tDQUdTLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUk7O2tGQUUxQixnQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmSW1hZ2VUeXBlfSBmcm9tICdAYWpmL2NvcmUvaW1hZ2UnO1xuaW1wb3J0IHtBamZCYXNlV2lkZ2V0Q29tcG9uZW50LCBBamZJbWFnZUNvbnRhaW5lcldpZGdldEluc3RhbmNlfSBmcm9tICdAYWpmL2NvcmUvcmVwb3J0cyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgdGVtcGxhdGVVcmw6ICdpbWFnZS1jb250YWluZXItd2lkZ2V0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnaW1hZ2UtY29udGFpbmVyLXdpZGdldC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZJbWFnZUNvbnRhaW5lcldpZGdldENvbXBvbmVudCBleHRlbmRzIEFqZkJhc2VXaWRnZXRDb21wb25lbnQ8QWpmSW1hZ2VDb250YWluZXJXaWRnZXRJbnN0YW5jZT4ge1xuICByZWFkb25seSBpbWFnZVR5cGVzID0gQWpmSW1hZ2VUeXBlO1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGVsOiBFbGVtZW50UmVmKSB7XG4gICAgc3VwZXIoY2RyLCBlbCk7XG4gIH1cbn1cbiIsIjxkaXYgKm5nSWY9XCJpbnN0YW5jZVwiIGNsYXNzPVwiYWpmLWltYWdlLWNvbnRhaW5lciBhamYtY29sdW1uc1wiIFtuZ1N3aXRjaF09XCJpbnN0YW5jZS53aWRnZXQuaW1hZ2VUeXBlXCI+XG4gIDxuZy10ZW1wbGF0ZSBbbmdTd2l0Y2hDYXNlXT1cImltYWdlVHlwZXMuSW1hZ2VcIj5cbiAgICA8ZGl2ICpuZ0Zvcj1cImxldCBpY3cgb2YgaW5zdGFuY2UudXJsczsgbGV0IGlkeCA9IGluZGV4XCIgY2xhc3M9XCJhamYtY29sdW1uXCI+XG4gICAgICA8YWpmLWltYWdlXG4gICAgICAgICAgW3R5cGVdPVwiaW5zdGFuY2Uud2lkZ2V0LmltYWdlVHlwZVwiXG4gICAgICAgICAgW2ltYWdlVXJsXT1cImljd1wiXG4gICAgICAgICAgW2ljb25dPVwibnVsbFwiXG4gICAgICAgICAgW2ZsYWddPVwibnVsbFwiXG4gICAgICAgICAgW2FwcGx5U3R5bGVzXT1cImluc3RhbmNlLndpZGdldCEuc3R5bGVzXCJcbiAgICAgID48L2FqZi1pbWFnZT5cbiAgICA8L2Rpdj5cbiAgPC9uZy10ZW1wbGF0ZT5cbiAgPG5nLXRlbXBsYXRlIFtuZ1N3aXRjaENhc2VdPVwiaW1hZ2VUeXBlcy5GbGFnXCI+XG4gICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBpY3cgb2YgaW5zdGFuY2UuZmxhZ3M7IGxldCBpZHggPSBpbmRleFwiIGNsYXNzPVwiYWpmLWNvbHVtblwiPlxuICAgICAgICA8YWpmLWltYWdlXG4gICAgICAgICAgICBbdHlwZV09XCJpbnN0YW5jZS53aWRnZXQuaW1hZ2VUeXBlXCJcbiAgICAgICAgICAgIFtpbWFnZVVybF09XCJudWxsXCJcbiAgICAgICAgICAgIFtpY29uXT1cIm51bGxcIlxuICAgICAgICAgICAgW2ZsYWddPVwiaWN3XCJcbiAgICAgICAgICAgIFthcHBseVN0eWxlc109XCJpbnN0YW5jZS53aWRnZXQhLnN0eWxlc1wiXG4gICAgICAgID48L2FqZi1pbWFnZT5cbiAgICAgIDwvZGl2PlxuICA8L25nLXRlbXBsYXRlPlxuICA8bmctdGVtcGxhdGUgW25nU3dpdGNoQ2FzZV09XCJpbWFnZVR5cGVzLkljb25cIj5cbiAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGljdyBvZiBpbnN0YW5jZS5pY29uczsgbGV0IGlkeCA9IGluZGV4XCIgY2xhc3M9XCJhamYtY29sdW1uXCI+XG4gICAgICAgIDxhamYtaW1hZ2VcbiAgICAgICAgICAgIFt0eXBlXT1cImluc3RhbmNlLndpZGdldC5pbWFnZVR5cGVcIlxuICAgICAgICAgICAgW2ltYWdlVXJsXT1cIm51bGxcIlxuICAgICAgICAgICAgW2ljb25dPVwiaWN3XCJcbiAgICAgICAgICAgIFtmbGFnXT1cIm51bGxcIlxuICAgICAgICAgICAgW2FwcGx5U3R5bGVzXT1cImluc3RhbmNlLndpZGdldCEuc3R5bGVzXCJcbiAgICAgICAgPjwvYWpmLWltYWdlPlxuICAgICAgPC9kaXY+XG4gIDwvbmctdGVtcGxhdGU+XG48L2Rpdj5cbiJdfQ==