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
import { AjfImage as CoreImage } from '@ajf/core/image';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/icon";
function AjfImage_ng_template_2_img_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 4);
} if (rf & 2) {
    const iu_r1 = ctx.ngIf;
    i0.ɵɵproperty("src", iu_r1, i0.ɵɵsanitizeUrl);
} }
function AjfImage_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfImage_ng_template_2_img_0_Template, 1, 1, "img", 3);
    i0.ɵɵpipe(1, "async");
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx_r1.url));
} }
function AjfImage_ng_template_3_mat_icon_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-icon", 6);
} if (rf & 2) {
    const io_r3 = ctx.ngIf;
    i0.ɵɵproperty("fontSet", io_r3.fontSet)("fontIcon", io_r3.fontIcon);
} }
function AjfImage_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfImage_ng_template_3_mat_icon_0_Template, 1, 2, "mat-icon", 5);
    i0.ɵɵpipe(1, "async");
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx_r1.iconObj));
} }
function AjfImage_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span");
    i0.ɵɵpipe(1, "async");
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassMap(i0.ɵɵpipeBind1(1, 2, ctx_r1.flagName));
} }
export class AjfImage extends CoreImage {
    constructor(el, renderer, ds) {
        super(el, renderer, ds);
    }
    static { this.ɵfac = function AjfImage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfImage)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i1.DomSanitizer)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfImage, selectors: [["ajf-image"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 5, vars: 6, consts: [[3, "ngSwitch"], [3, "ngSwitchCase"], [3, "class", 4, "ngSwitchCase"], ["alt", "", 3, "src", 4, "ngIf"], ["alt", "", 3, "src"], [3, "fontSet", "fontIcon", 4, "ngIf"], [3, "fontSet", "fontIcon"]], template: function AjfImage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementContainerStart(0, 0);
            i0.ɵɵpipe(1, "async");
            i0.ɵɵtemplate(2, AjfImage_ng_template_2_Template, 2, 3, "ng-template", 1)(3, AjfImage_ng_template_3_Template, 2, 3, "ng-template", 1)(4, AjfImage_span_4_Template, 2, 4, "span", 2);
            i0.ɵɵelementContainerEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("ngSwitch", i0.ɵɵpipeBind1(1, 4, ctx.imageType));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngSwitchCase", ctx.imageTypes.Image);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", ctx.imageTypes.Icon);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", ctx.imageTypes.Flag);
        } }, dependencies: [i2.NgIf, i2.NgSwitch, i2.NgSwitchCase, i3.MatIcon, i2.AsyncPipe], styles: ["ajf-image{display:flex;box-sizing:border-box;align-items:center;position:relative;font-size:inherit;width:inherit;height:inherit}ajf-image img{vertical-align:middle;position:relative;max-height:100%;max-width:100%;height:auto;width:auto}ajf-image span{height:inherit;width:inherit}ajf-image .mat-icon{font-size:inherit}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfImage, [{
        type: Component,
        args: [{ selector: 'ajf-image', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container [ngSwitch]=\"imageType|async\">\n  <ng-template [ngSwitchCase]=\"imageTypes.Image\">\n    <img *ngIf=\"url|async as iu\" [src]=\"iu\" alt=\"\">\n  </ng-template>\n  <ng-template [ngSwitchCase]=\"imageTypes.Icon\">\n    <mat-icon *ngIf=\"iconObj|async as io\"\n        [fontSet]=\"io!.fontSet\"\n        [fontIcon]=\"io!.fontIcon\">\n    </mat-icon>\n  </ng-template>\n  <span *ngSwitchCase=\"imageTypes.Flag\" [class]=\"flagName|async\"></span>\n</ng-container>\n", styles: ["ajf-image{display:flex;box-sizing:border-box;align-items:center;position:relative;font-size:inherit;width:inherit;height:inherit}ajf-image img{vertical-align:middle;position:relative;max-height:100%;max-width:100%;height:auto;width:auto}ajf-image span{height:inherit;width:inherit}ajf-image .mat-icon{font-size:inherit}\n"] }]
    }], () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.DomSanitizer }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfImage, { className: "AjfImage", filePath: "image.ts", lineNumber: 40 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9pbWFnZS9zcmMvaW1hZ2UudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9pbWFnZS9zcmMvaW1hZ2UuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsUUFBUSxJQUFJLFNBQVMsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3RELE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUdULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQzs7Ozs7O0lDM0JuQix5QkFBK0M7OztJQUFsQiw2Q0FBVTs7O0lBQXZDLHVFQUErQzs7OztJQUF6Qyx1REFBZ0I7OztJQUd0Qiw4QkFHVzs7O0lBRFAsQUFEQSx1Q0FBdUIsNEJBQ0U7OztJQUY3QixpRkFFOEI7Ozs7SUFGbkIsMkRBQW9COzs7SUFLakMsdUJBQXNFOzs7O0lBQWhDLG9EQUF3Qjs7QUQ2QmhFLE1BQU0sT0FBTyxRQUFTLFNBQVEsU0FBUztJQUNyQyxZQUFZLEVBQWMsRUFBRSxRQUFtQixFQUFFLEVBQWdCO1FBQy9ELEtBQUssQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzFCLENBQUM7eUdBSFUsUUFBUTtvRUFBUixRQUFRO1lDdkNyQixnQ0FBMkM7O1lBVXpDLEFBTkEsQUFIQSx5RUFBK0MsNERBR0QsOENBTWlCOzs7WUFWbkQsOERBQTRCO1lBQzNCLGVBQWlDO1lBQWpDLG1EQUFpQztZQUdqQyxjQUFnQztZQUFoQyxrREFBZ0M7WUFNdEMsY0FBNkI7WUFBN0Isa0RBQTZCOzs7aUZENkJ6QixRQUFRO2NBUHBCLFNBQVM7MkJBQ0UsV0FBVyxtQkFHSix1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJOztrRkFFMUIsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZJbWFnZSBhcyBDb3JlSW1hZ2V9IGZyb20gJ0BhamYvY29yZS9pbWFnZSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBSZW5kZXJlcjIsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RG9tU2FuaXRpemVyfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWltYWdlJyxcbiAgdGVtcGxhdGVVcmw6ICdpbWFnZS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2ltYWdlLnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkltYWdlIGV4dGVuZHMgQ29yZUltYWdlIHtcbiAgY29uc3RydWN0b3IoZWw6IEVsZW1lbnRSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIsIGRzOiBEb21TYW5pdGl6ZXIpIHtcbiAgICBzdXBlcihlbCwgcmVuZGVyZXIsIGRzKTtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiaW1hZ2VUeXBlfGFzeW5jXCI+XG4gIDxuZy10ZW1wbGF0ZSBbbmdTd2l0Y2hDYXNlXT1cImltYWdlVHlwZXMuSW1hZ2VcIj5cbiAgICA8aW1nICpuZ0lmPVwidXJsfGFzeW5jIGFzIGl1XCIgW3NyY109XCJpdVwiIGFsdD1cIlwiPlxuICA8L25nLXRlbXBsYXRlPlxuICA8bmctdGVtcGxhdGUgW25nU3dpdGNoQ2FzZV09XCJpbWFnZVR5cGVzLkljb25cIj5cbiAgICA8bWF0LWljb24gKm5nSWY9XCJpY29uT2JqfGFzeW5jIGFzIGlvXCJcbiAgICAgICAgW2ZvbnRTZXRdPVwiaW8hLmZvbnRTZXRcIlxuICAgICAgICBbZm9udEljb25dPVwiaW8hLmZvbnRJY29uXCI+XG4gICAgPC9tYXQtaWNvbj5cbiAgPC9uZy10ZW1wbGF0ZT5cbiAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cImltYWdlVHlwZXMuRmxhZ1wiIFtjbGFzc109XCJmbGFnTmFtZXxhc3luY1wiPjwvc3Bhbj5cbjwvbmctY29udGFpbmVyPlxuIl19