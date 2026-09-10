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
import { AJF_WARNING_ALERT_SERVICE, AjfBaseFieldComponent, } from '@ajf/core/forms';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/core/forms";
import * as i2 from "@ajf/material/signature";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "./warning-alert-service";
function AjfSignatureFieldComponent_ajf_signature_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-signature", 1);
} if (rf & 2) {
    const ctrl_r1 = ctx.ngIf;
    i0.ɵɵproperty("formControl", ctrl_r1);
} }
/**
 * It allows the loading of a Signature canvas image inside an AjfForm.
 *
 * @export
 * @class AjfSignatureFieldComponent
 */
export class AjfSignatureFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
    static { this.ɵfac = function AjfSignatureFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfSignatureFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfSignatureFieldComponent, selectors: [["ajf-signature-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 2, vars: 3, consts: [[3, "formControl", 4, "ngIf"], [3, "formControl"]], template: function AjfSignatureFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfSignatureFieldComponent_ajf_signature_0_Template, 1, 1, "ajf-signature", 0);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.control));
        } }, dependencies: [i2.AjfSignatureComponent, i3.NgIf, i4.NgControlStatus, i4.FormControlDirective, i3.AsyncPipe], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfSignatureFieldComponent, [{
        type: Component,
        args: [{ selector: 'ajf-signature-field', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-signature *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\"></ajf-signature>\n" }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: i5.AjfWarningAlertService, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfSignatureFieldComponent, { className: "AjfSignatureFieldComponent", filePath: "signature-field.ts", lineNumber: 50 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmF0dXJlLWZpZWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvZm9ybXMvc3JjL3NpZ25hdHVyZS1maWVsZC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm1zL3NyYy9zaWduYXR1cmUtZmllbGQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxNQUFNLEVBQ04saUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCx5QkFBeUIsRUFDekIscUJBQXFCLEdBRXRCLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7O0lDakN6QixtQ0FBbUY7OztJQUF0QyxxQ0FBcUI7O0FEb0NsRTs7Ozs7R0FLRztBQVFILE1BQU0sT0FBTywwQkFBMkIsU0FBUSxxQkFBcUI7SUFDbkUsWUFDRSxHQUFzQixFQUN0QixPQUErQixFQUNJLEdBQTJCO1FBRTlELEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7MkhBUFUsMEJBQTBCLG9IQUkzQix5QkFBeUI7b0VBSnhCLDBCQUEwQjtZQ2pEdkMsK0ZBQW1FOzs7WUFBbkQsd0RBQW9COzs7aUZEaUR2QiwwQkFBMEI7Y0FQdEMsU0FBUzsyQkFDRSxxQkFBcUIsbUJBR2QsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTs7c0JBTWxDLE1BQU07dUJBQUMseUJBQXlCOztrRkFKeEIsMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgSW5qZWN0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFLFxuICBBamZCYXNlRmllbGRDb21wb25lbnQsXG4gIEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG59IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0FqZldhcm5pbmdBbGVydFNlcnZpY2V9IGZyb20gJy4vd2FybmluZy1hbGVydC1zZXJ2aWNlJztcblxuLyoqXG4gKiBJdCBhbGxvd3MgdGhlIGxvYWRpbmcgb2YgYSBTaWduYXR1cmUgY2FudmFzIGltYWdlIGluc2lkZSBhbiBBamZGb3JtLlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBBamZTaWduYXR1cmVGaWVsZENvbXBvbmVudFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtc2lnbmF0dXJlLWZpZWxkJyxcbiAgdGVtcGxhdGVVcmw6ICdzaWduYXR1cmUtZmllbGQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydzaWduYXR1cmUtZmllbGQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmU2lnbmF0dXJlRmllbGRDb21wb25lbnQgZXh0ZW5kcyBBamZCYXNlRmllbGRDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHNlcnZpY2U6IEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gICAgQEluamVjdChBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFKSB3YXM6IEFqZldhcm5pbmdBbGVydFNlcnZpY2UsXG4gICkge1xuICAgIHN1cGVyKGNkciwgc2VydmljZSwgd2FzKTtcbiAgfVxufVxuIiwiPGFqZi1zaWduYXR1cmUgKm5nSWY9XCJjb250cm9sfGFzeW5jIGFzIGN0cmxcIiBbZm9ybUNvbnRyb2xdPVwiY3RybCFcIj48L2FqZi1zaWduYXR1cmU+XG4iXX0=