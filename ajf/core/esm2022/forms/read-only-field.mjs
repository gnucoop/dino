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
import { AjfInputFieldComponent as CoreComponent } from './input-field';
import { AJF_WARNING_ALERT_SERVICE } from './warning-alert-service';
import * as i0 from "@angular/core";
import * as i1 from "./form-renderer";
import * as i2 from "@angular/common";
function AjfReadOnlyFieldComponent_span_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctrl_r1 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctrl_r1.value);
} }
/**
 * this component show the control value inherited from AjfBaseFieldComponent.
 *
 * @export
 * @class AjfReadOnlyFieldComponent
 */
export class AjfReadOnlyFieldComponent extends CoreComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
    static { this.ɵfac = function AjfReadOnlyFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfReadOnlyFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfReadOnlyFieldComponent, selectors: [["ajf-read-only-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 2, vars: 3, consts: [[4, "ngIf"]], template: function AjfReadOnlyFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfReadOnlyFieldComponent_span_0_Template, 2, 1, "span", 0);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.control));
        } }, dependencies: [i2.NgIf, i2.AsyncPipe], styles: ["ajf-read-only-field{display:block}ajf-read-only-field span{display:block;min-height:1em;color:var(--ajf-text, #1c1a17);font-size:14px;line-height:1.5}.ajf-field-type-2 ajf-read-only-field span,.ajf-field-type-6 ajf-read-only-field span,.ajf-field-type-8 ajf-read-only-field span,.ajf-field-type-10 ajf-read-only-field span,.ajf-field-type-13 ajf-read-only-field span,.ajf-field-type-17 ajf-read-only-field span{font-family:var(--ajf-font-mono, monospace);font-size:13px}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfReadOnlyFieldComponent, [{
        type: Component,
        args: [{ selector: 'ajf-read-only-field', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<span *ngIf=\"control|async as ctrl\">{{ctrl.value}}</span>\n", styles: ["ajf-read-only-field{display:block}ajf-read-only-field span{display:block;min-height:1em;color:var(--ajf-text, #1c1a17);font-size:14px;line-height:1.5}.ajf-field-type-2 ajf-read-only-field span,.ajf-field-type-6 ajf-read-only-field span,.ajf-field-type-8 ajf-read-only-field span,.ajf-field-type-10 ajf-read-only-field span,.ajf-field-type-13 ajf-read-only-field span,.ajf-field-type-17 ajf-read-only-field span{font-family:var(--ajf-font-mono, monospace);font-size:13px}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: undefined, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfReadOnlyFieldComponent, { className: "AjfReadOnlyFieldComponent", filePath: "read-only-field.ts", lineNumber: 48 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1vbmx5LWZpZWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvcmVhZC1vbmx5LWZpZWxkLnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvcmVhZC1vbmx5LWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsTUFBTSxFQUNOLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUMsc0JBQXNCLElBQUksYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RFLE9BQU8sRUFBQyx5QkFBeUIsRUFBeUIsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7SUNoQzFGLDRCQUFvQztJQUFBLFlBQWM7SUFBQSxpQkFBTzs7O0lBQXJCLGNBQWM7SUFBZCxtQ0FBYzs7QURrQ2xEOzs7OztHQUtHO0FBUUgsTUFBTSxPQUFPLHlCQUEwQixTQUFRLGFBQWE7SUFDMUQsWUFDRSxHQUFzQixFQUN0QixPQUErQixFQUNJLEdBQTJCO1FBRTlELEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7MEhBUFUseUJBQXlCLG9IQUkxQix5QkFBeUI7b0VBSnhCLHlCQUF5QjtZQy9DdEMsNEVBQW9DOzs7WUFBN0Isd0RBQW9COzs7aUZEK0NkLHlCQUF5QjtjQVByQyxTQUFTOzJCQUNFLHFCQUFxQixtQkFHZCx1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJOztzQkFNbEMsTUFBTTt1QkFBQyx5QkFBeUI7O2tGQUp4Qix5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbmplY3QsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBamZGb3JtUmVuZGVyZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXInO1xuaW1wb3J0IHtBamZJbnB1dEZpZWxkQ29tcG9uZW50IGFzIENvcmVDb21wb25lbnR9IGZyb20gJy4vaW5wdXQtZmllbGQnO1xuaW1wb3J0IHtBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFLCBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlfSBmcm9tICcuL3dhcm5pbmctYWxlcnQtc2VydmljZSc7XG5cbi8qKlxuICogdGhpcyBjb21wb25lbnQgc2hvdyB0aGUgY29udHJvbCB2YWx1ZSBpbmhlcml0ZWQgZnJvbSBBamZCYXNlRmllbGRDb21wb25lbnQuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXJlYWQtb25seS1maWVsZCcsXG4gIHRlbXBsYXRlVXJsOiAncmVhZC1vbmx5LWZpZWxkLmh0bWwnLFxuICBzdHlsZVVybHM6IFsncmVhZC1vbmx5LWZpZWxkLnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnQgZXh0ZW5kcyBDb3JlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoXG4gICAgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBzZXJ2aWNlOiBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICAgIEBJbmplY3QoQUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSkgd2FzOiBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlLFxuICApIHtcbiAgICBzdXBlcihjZHIsIHNlcnZpY2UsIHdhcyk7XG4gIH1cbn1cbiIsIjxzcGFuICpuZ0lmPVwiY29udHJvbHxhc3luYyBhcyBjdHJsXCI+e3tjdHJsLnZhbHVlfX08L3NwYW4+XG4iXX0=