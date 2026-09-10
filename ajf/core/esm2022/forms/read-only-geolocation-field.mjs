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
import { filter, map } from 'rxjs/operators';
import { AjfBaseFieldComponent } from './base-field';
import { AJF_WARNING_ALERT_SERVICE } from './warning-alert-service';
import * as i0 from "@angular/core";
import * as i1 from "./form-renderer";
import * as i2 from "@angular/common";
import * as i3 from "@ngneat/transloco";
function AjfReadOnlyGeolocationFieldComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 1)(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "transloco");
    i0.ɵɵpipe(5, "async");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "transloco");
    i0.ɵɵpipe(9, "async");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(4, 4, "Latitude"), ": ", i0.ɵɵpipeBind1(5, 6, ctx_r0.latitude), "");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(8, 8, "Longitude"), ": ", i0.ɵɵpipeBind1(9, 10, ctx_r0.longitude), "");
} }
/**
 * This component allows you to show the geolocation info: latitude and longitude
 * the form inherited from AjfBaseFieldComponent.
 *
 * @export
 * @class AjfReadOnlyGeolocationFieldComponent
 */
export class AjfReadOnlyGeolocationFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
        const coordinates = this.control.pipe(filter(control => control != null), map(ctrl => {
            let coords = [];
            if (ctrl) {
                const values = ctrl.value;
                if (values && values.length) {
                    coords = values.split(',');
                }
            }
            return coords;
        }));
        this.latitude = coordinates.pipe(map(coords => (coords && coords.length > 0 ? coords[0] : '')));
        this.longitude = coordinates.pipe(map(coords => (coords && coords.length > 1 ? coords[1] : '')));
    }
    static { this.ɵfac = function AjfReadOnlyGeolocationFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfReadOnlyGeolocationFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfReadOnlyGeolocationFieldComponent, selectors: [["ajf-read-only-geolocation-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 2, vars: 3, consts: [[4, "ngIf"], [1, "ajf-geo-readout"]], template: function AjfReadOnlyGeolocationFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfReadOnlyGeolocationFieldComponent_ng_container_0_Template, 10, 12, "ng-container", 0);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.control));
        } }, dependencies: [i2.NgIf, i2.AsyncPipe, i3.TranslocoPipe], styles: ["ajf-read-only-geolocation-field{display:block}ajf-read-only-geolocation-field .ajf-geo-readout{display:flex;flex-wrap:wrap;gap:16px;color:var(--ajf-text, #1c1a17);font-family:var(--ajf-font-mono, monospace);font-size:13px}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfReadOnlyGeolocationFieldComponent, [{
        type: Component,
        args: [{ selector: 'ajf-read-only-geolocation-field', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container *ngIf=\"control|async as ctrl\">\n  <div class=\"ajf-geo-readout\">\n    <span>{{'Latitude'|transloco}}: {{latitude|async}}</span>\n    <span>{{'Longitude'|transloco}}: {{longitude|async}}</span>\n  </div>\n</ng-container>\n", styles: ["ajf-read-only-geolocation-field{display:block}ajf-read-only-geolocation-field .ajf-geo-readout{display:flex;flex-wrap:wrap;gap:16px;color:var(--ajf-text, #1c1a17);font-family:var(--ajf-font-mono, monospace);font-size:13px}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: undefined, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfReadOnlyGeolocationFieldComponent, { className: "AjfReadOnlyGeolocationFieldComponent", filePath: "read-only-geolocation-field.ts", lineNumber: 51 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1vbmx5LWdlb2xvY2F0aW9uLWZpZWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvcmVhZC1vbmx5LWdlb2xvY2F0aW9uLWZpZWxkLnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvcmVhZC1vbmx5LWdlb2xvY2F0aW9uLWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsTUFBTSxFQUNOLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUVuRCxPQUFPLEVBQUMseUJBQXlCLEVBQXlCLE1BQU0seUJBQXlCLENBQUM7Ozs7OztJQ2xDMUYsNkJBQTRDO0lBRXhDLEFBREYsOEJBQTZCLFdBQ3JCO0lBQUEsWUFBNEM7OztJQUFBLGlCQUFPO0lBQ3pELDRCQUFNO0lBQUEsWUFBOEM7OztJQUN0RCxBQURzRCxpQkFBTyxFQUN2RDs7OztJQUZFLGVBQTRDO0lBQTVDLDRHQUE0QztJQUM1QyxlQUE4QztJQUE5QywrR0FBOEM7O0FEaUN4RDs7Ozs7O0dBTUc7QUFRSCxNQUFNLE9BQU8sb0NBQXFDLFNBQVEscUJBQXFCO0lBSTdFLFlBQ0UsR0FBc0IsRUFDdEIsT0FBK0IsRUFDSSxHQUEyQjtRQUU5RCxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUV6QixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDbkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxFQUNsQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDVCxJQUFJLE1BQU0sR0FBYSxFQUFFLENBQUM7WUFDMUIsSUFBSSxJQUFJLEVBQUUsQ0FBQztnQkFDVCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBZSxDQUFDO2dCQUNwQyxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQzVCLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM3QixDQUFDO1lBQ0gsQ0FBQztZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUNILENBQUM7UUFFRixJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWhHLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FDL0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FDOUQsQ0FBQztJQUNKLENBQUM7cUlBOUJVLG9DQUFvQyxvSEFPckMseUJBQXlCO29FQVB4QixvQ0FBb0M7WUNsRGpELHlHQUE0Qzs7O1lBQTdCLHdEQUFvQjs7O2lGRGtEdEIsb0NBQW9DO2NBUGhELFNBQVM7MkJBQ0UsaUNBQWlDLG1CQUcxQix1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJOztzQkFTbEMsTUFBTTt1QkFBQyx5QkFBeUI7O2tGQVB4QixvQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbmplY3QsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlciwgbWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmQmFzZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2Jhc2UtZmllbGQnO1xuaW1wb3J0IHtBamZGb3JtUmVuZGVyZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXInO1xuaW1wb3J0IHtBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFLCBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlfSBmcm9tICcuL3dhcm5pbmctYWxlcnQtc2VydmljZSc7XG5cbi8qKlxuICogVGhpcyBjb21wb25lbnQgYWxsb3dzIHlvdSB0byBzaG93IHRoZSBnZW9sb2NhdGlvbiBpbmZvOiBsYXRpdHVkZSBhbmQgbG9uZ2l0dWRlXG4gKiB0aGUgZm9ybSBpbmhlcml0ZWQgZnJvbSBBamZCYXNlRmllbGRDb21wb25lbnQuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIEFqZlJlYWRPbmx5R2VvbG9jYXRpb25GaWVsZENvbXBvbmVudFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcmVhZC1vbmx5LWdlb2xvY2F0aW9uLWZpZWxkJyxcbiAgdGVtcGxhdGVVcmw6ICdyZWFkLW9ubHktZ2VvbG9jYXRpb24tZmllbGQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydyZWFkLW9ubHktZ2VvbG9jYXRpb24tZmllbGQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVhZE9ubHlHZW9sb2NhdGlvbkZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWpmQmFzZUZpZWxkQ29tcG9uZW50IHtcbiAgcmVhZG9ubHkgbGF0aXR1ZGU6IE9ic2VydmFibGU8c3RyaW5nPjtcbiAgcmVhZG9ubHkgbG9uZ2l0dWRlOiBPYnNlcnZhYmxlPHN0cmluZz47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBzZXJ2aWNlOiBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICAgIEBJbmplY3QoQUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSkgd2FzOiBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlLFxuICApIHtcbiAgICBzdXBlcihjZHIsIHNlcnZpY2UsIHdhcyk7XG5cbiAgICBjb25zdCBjb29yZGluYXRlcyA9IHRoaXMuY29udHJvbC5waXBlKFxuICAgICAgZmlsdGVyKGNvbnRyb2wgPT4gY29udHJvbCAhPSBudWxsKSxcbiAgICAgIG1hcChjdHJsID0+IHtcbiAgICAgICAgbGV0IGNvb3Jkczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgaWYgKGN0cmwpIHtcbiAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBjdHJsLnZhbHVlIGFzIHN0cmluZztcbiAgICAgICAgICBpZiAodmFsdWVzICYmIHZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvb3JkcyA9IHZhbHVlcy5zcGxpdCgnLCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29vcmRzO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHRoaXMubGF0aXR1ZGUgPSBjb29yZGluYXRlcy5waXBlKG1hcChjb29yZHMgPT4gKGNvb3JkcyAmJiBjb29yZHMubGVuZ3RoID4gMCA/IGNvb3Jkc1swXSA6ICcnKSkpO1xuXG4gICAgdGhpcy5sb25naXR1ZGUgPSBjb29yZGluYXRlcy5waXBlKFxuICAgICAgbWFwKGNvb3JkcyA9PiAoY29vcmRzICYmIGNvb3Jkcy5sZW5ndGggPiAxID8gY29vcmRzWzFdIDogJycpKSxcbiAgICApO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiY29udHJvbHxhc3luYyBhcyBjdHJsXCI+XG4gIDxkaXYgY2xhc3M9XCJhamYtZ2VvLXJlYWRvdXRcIj5cbiAgICA8c3Bhbj57eydMYXRpdHVkZSd8dHJhbnNsb2NvfX06IHt7bGF0aXR1ZGV8YXN5bmN9fTwvc3Bhbj5cbiAgICA8c3Bhbj57eydMb25naXR1ZGUnfHRyYW5zbG9jb319OiB7e2xvbmdpdHVkZXxhc3luY319PC9zcGFuPlxuICA8L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuIl19