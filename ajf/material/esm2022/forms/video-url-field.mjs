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
import { AJF_WARNING_ALERT_SERVICE, AjfVideoUrlFieldComponent as CoreComponent, } from '@ajf/core/forms';
import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/core/forms";
import * as i2 from "@angular/platform-browser";
import * as i3 from "@angular/common/http";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "./warning-alert-service";
function AjfVideoUrlFieldComponent_ng_container_0_ng_container_3_img_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 5);
} if (rf & 2) {
    const thumb_r1 = ctx.ngIf;
    i0.ɵɵproperty("src", thumb_r1, i0.ɵɵsanitizeUrl);
} }
function AjfVideoUrlFieldComponent_ng_container_0_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "a", 3);
    i0.ɵɵtemplate(2, AjfVideoUrlFieldComponent_ng_container_0_ng_container_3_img_2_Template, 1, 1, "img", 4);
    i0.ɵɵpipe(3, "async");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctrl_r2 = i0.ɵɵnextContext().ngIf;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("href", ctrl_r2.value, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(3, 2, ctx_r2.videoThumbnail));
} }
function AjfVideoUrlFieldComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 1);
    i0.ɵɵelementStart(2, "div", 2);
    i0.ɵɵtemplate(3, AjfVideoUrlFieldComponent_ng_container_0_ng_container_3_Template, 4, 4, "ng-container", 0);
    i0.ɵɵpipe(4, "async");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctrl_r2 = ctx.ngIf;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("formControl", ctrl_r2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(4, 2, ctx_r2.validUrl));
} }
export class AjfVideoUrlFieldComponent extends CoreComponent {
    constructor(cdr, service, was, domSanitizer, httpClient) {
        super(cdr, service, was, domSanitizer, httpClient);
    }
    static { this.ɵfac = function AjfVideoUrlFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfVideoUrlFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE), i0.ɵɵdirectiveInject(i2.DomSanitizer), i0.ɵɵdirectiveInject(i3.HttpClient)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfVideoUrlFieldComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 2, vars: 3, consts: [[4, "ngIf"], ["type", "url", 1, "ajf-control", "ajf-video-input", 3, "formControl"], [1, "ajf-video-thumbnail"], ["target", "_blank", 3, "href"], ["alt", "", 3, "src", 4, "ngIf"], ["alt", "", 3, "src"]], template: function AjfVideoUrlFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfVideoUrlFieldComponent_ng_container_0_Template, 5, 4, "ng-container", 0);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.control));
        } }, dependencies: [i4.NgIf, i5.DefaultValueAccessor, i5.NgControlStatus, i5.FormControlDirective, i4.AsyncPipe], styles: ["ajf-field .ajf-video-thumbnail img{max-width:160px;max-height:90px;border:1px solid var(--ajf-border);border-radius:var(--ajf-radius)}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfVideoUrlFieldComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container *ngIf=\"control | async as ctrl\">\n  <input class=\"ajf-control ajf-video-input\" type=\"url\" [formControl]=\"ctrl!\" />\n  <div class=\"ajf-video-thumbnail\">\n    <ng-container *ngIf=\"validUrl | async\">\n      <a target=\"_blank\" [href]=\"ctrl.value\">\n        <img *ngIf=\"videoThumbnail | async as thumb\" [src]=\"thumb\" alt=\"\" />\n      </a>\n    </ng-container>\n  </div>\n</ng-container>\n", styles: ["ajf-field .ajf-video-thumbnail img{max-width:160px;max-height:90px;border:1px solid var(--ajf-border);border-radius:var(--ajf-radius)}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: i6.AjfWarningAlertService, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }, { type: i2.DomSanitizer }, { type: i3.HttpClient }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfVideoUrlFieldComponent, { className: "AjfVideoUrlFieldComponent", filePath: "video-url-field.ts", lineNumber: 46 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8tdXJsLWZpZWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvZm9ybXMvc3JjL3ZpZGVvLXVybC1maWVsZC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm1zL3NyYy92aWRlby11cmwtZmllbGQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wseUJBQXlCLEVBRXpCLHlCQUF5QixJQUFJLGFBQWEsR0FDM0MsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QixPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxNQUFNLEVBQ04saUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7SUM3QmYseUJBQW9FOzs7SUFBdkIsZ0RBQWE7OztJQUY5RCw2QkFBdUM7SUFDckMsNEJBQXVDO0lBQ3JDLHdHQUFvRTs7SUFDdEUsaUJBQUk7Ozs7O0lBRmUsY0FBbUI7SUFBbkIsc0RBQW1CO0lBQzlCLGNBQTZCO0lBQTdCLGtFQUE2Qjs7O0lBTDNDLDZCQUE4QztJQUM1QywyQkFBOEU7SUFDOUUsOEJBQWlDO0lBQy9CLDJHQUF1Qzs7SUFLekMsaUJBQU07Ozs7O0lBUGdELGNBQXFCO0lBQXJCLHFDQUFxQjtJQUUxRCxlQUFzQjtJQUF0Qiw0REFBc0I7O0FEMEN6QyxNQUFNLE9BQU8seUJBQTBCLFNBQVEsYUFBYTtJQUMxRCxZQUNFLEdBQXNCLEVBQ3RCLE9BQStCLEVBQ0ksR0FBMkIsRUFDOUQsWUFBMEIsRUFDMUIsVUFBc0I7UUFFdEIsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNyRCxDQUFDOzBIQVRVLHlCQUF5QixvSEFJMUIseUJBQXlCO29FQUp4Qix5QkFBeUI7WUM3Q3RDLDRGQUE4Qzs7O1lBQS9CLHdEQUFzQjs7O2lGRDZDeEIseUJBQXlCO2NBTnJDLFNBQVM7a0NBR1MsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTs7c0JBTWxDLE1BQU07dUJBQUMseUJBQXlCOztrRkFKeEIseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFLFxuICBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICBBamZWaWRlb1VybEZpZWxkQ29tcG9uZW50IGFzIENvcmVDb21wb25lbnQsXG59IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0h0dHBDbGllbnR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbmplY3QsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RG9tU2FuaXRpemVyfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHtBamZXYXJuaW5nQWxlcnRTZXJ2aWNlfSBmcm9tICcuL3dhcm5pbmctYWxlcnQtc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZVVybDogJ3ZpZGVvLXVybC1maWVsZC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3ZpZGVvLXVybC1maWVsZC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZWaWRlb1VybEZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQ29yZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgc2VydmljZTogQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbiAgICBASW5qZWN0KEFKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UpIHdhczogQWpmV2FybmluZ0FsZXJ0U2VydmljZSxcbiAgICBkb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgICBodHRwQ2xpZW50OiBIdHRwQ2xpZW50LFxuICApIHtcbiAgICBzdXBlcihjZHIsIHNlcnZpY2UsIHdhcywgZG9tU2FuaXRpemVyLCBodHRwQ2xpZW50KTtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbnRyb2wgfCBhc3luYyBhcyBjdHJsXCI+XG4gIDxpbnB1dCBjbGFzcz1cImFqZi1jb250cm9sIGFqZi12aWRlby1pbnB1dFwiIHR5cGU9XCJ1cmxcIiBbZm9ybUNvbnRyb2xdPVwiY3RybCFcIiAvPlxuICA8ZGl2IGNsYXNzPVwiYWpmLXZpZGVvLXRodW1ibmFpbFwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ2YWxpZFVybCB8IGFzeW5jXCI+XG4gICAgICA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBbaHJlZl09XCJjdHJsLnZhbHVlXCI+XG4gICAgICAgIDxpbWcgKm5nSWY9XCJ2aWRlb1RodW1ibmFpbCB8IGFzeW5jIGFzIHRodW1iXCIgW3NyY109XCJ0aHVtYlwiIGFsdD1cIlwiIC8+XG4gICAgICA8L2E+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvZGl2PlxuPC9uZy1jb250YWluZXI+XG4iXX0=