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
import { fileIcon } from '@ajf/core/file-input';
import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation, } from '@angular/core';
import { filter, map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { AjfBaseFieldComponent } from './base-field';
import { AJF_WARNING_ALERT_SERVICE } from './warning-alert-service';
import * as i0 from "@angular/core";
import * as i1 from "./form-renderer";
import * as i2 from "@angular/platform-browser";
import * as i3 from "@angular/common";
function AjfReadOnlyFileFieldComponent_a_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 2);
    i0.ɵɵpipe(1, "async");
    i0.ɵɵelement(2, "img", 3);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const fu_r1 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("href", fu_r1, i0.ɵɵsanitizeUrl)("download", i0.ɵɵpipeBind1(1, 4, ctx_r1.fileName));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", ctx_r1.fileIcon, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(4, 6, ctx_r1.fileName), "\n");
} }
function AjfReadOnlyFileFieldComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 4);
} }
/**
 * This component allows you to download the file contained in the control of
 * the form inherited from AjfBaseFieldComponent.
 *
 * @export
 * @class AjfReadOnlyFileFieldComponent
 */
export class AjfReadOnlyFileFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was, domSanitizer) {
        super(cdr, service, was);
        this.fileIcon = domSanitizer.bypassSecurityTrustResourceUrl(fileIcon);
        const fileStream = this.control.pipe(filter(control => control != null), switchMap(control => {
            control = control;
            return control.valueChanges.pipe(startWith(control.value));
        }), filter(value => value != null), shareReplay(1));
        this.fileUrl = fileStream.pipe(map(file => {
            if (file.content && file.content.length) {
                return domSanitizer.bypassSecurityTrustResourceUrl(file.content);
            }
            else if (file.url && file.url.length && !file.deleteUrl) {
                return domSanitizer.bypassSecurityTrustResourceUrl(file.url);
            }
            return null;
        }));
        this.fileName = fileStream.pipe(map(file => file.name));
    }
    static { this.ɵfac = function AjfReadOnlyFileFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfReadOnlyFileFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE), i0.ɵɵdirectiveInject(i2.DomSanitizer)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfReadOnlyFileFieldComponent, selectors: [["ajf-read-only-file-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 4, vars: 4, consts: [["noFile", ""], ["target", "_blank", 3, "href", "download", 4, "ngIf", "ngIfElse"], ["target", "_blank", 3, "href", "download"], [3, "src"], [1, "ajf-no-file-placeholder"]], template: function AjfReadOnlyFileFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfReadOnlyFileFieldComponent_a_0_Template, 5, 8, "a", 1);
            i0.ɵɵpipe(1, "async");
            i0.ɵɵtemplate(2, AjfReadOnlyFileFieldComponent_ng_template_2_Template, 1, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            const noFile_r3 = i0.ɵɵreference(3);
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 2, ctx.fileUrl))("ngIfElse", noFile_r3);
        } }, dependencies: [i3.NgIf, i3.AsyncPipe], styles: ["ajf-read-only-file-field{display:block}ajf-read-only-file-field a{display:inline-flex;align-items:center;gap:8px;color:var(--ajf-accent-ink, #2d6b7f);font-family:var(--ajf-font-mono, monospace);font-size:13px;text-decoration:none}ajf-read-only-file-field a:hover{text-decoration:underline}ajf-read-only-file-field img{width:20px;height:20px}ajf-read-only-file-field .ajf-no-file-placeholder{width:120px;height:24px;border-radius:var(--ajf-radius, 4px);background-color:var(--ajf-band, #faf8f5);background-image:repeating-linear-gradient(45deg,var(--ajf-border, #e6e2dc) 0,var(--ajf-border, #e6e2dc) 1px,transparent 1px,transparent 7px)}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfReadOnlyFileFieldComponent, [{
        type: Component,
        args: [{ selector: 'ajf-read-only-file-field', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<a *ngIf=\"fileUrl|async as fu ; else noFile\" [href]=\"fu\" [download]=\"fileName|async\" target=\"_blank\">\n  <img [src]=\"fileIcon\"> {{ fileName|async }}\n</a>\n<ng-template #noFile>\n  <div class=\"ajf-no-file-placeholder\"></div>\n</ng-template>\n", styles: ["ajf-read-only-file-field{display:block}ajf-read-only-file-field a{display:inline-flex;align-items:center;gap:8px;color:var(--ajf-accent-ink, #2d6b7f);font-family:var(--ajf-font-mono, monospace);font-size:13px;text-decoration:none}ajf-read-only-file-field a:hover{text-decoration:underline}ajf-read-only-file-field img{width:20px;height:20px}ajf-read-only-file-field .ajf-no-file-placeholder{width:120px;height:24px;border-radius:var(--ajf-radius, 4px);background-color:var(--ajf-band, #faf8f5);background-image:repeating-linear-gradient(45deg,var(--ajf-border, #e6e2dc) 0,var(--ajf-border, #e6e2dc) 1px,transparent 1px,transparent 7px)}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: undefined, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }, { type: i2.DomSanitizer }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfReadOnlyFileFieldComponent, { className: "AjfReadOnlyFileFieldComponent", filePath: "read-only-file-field.ts", lineNumber: 54 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1vbmx5LWZpbGUtZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2Zvcm1zL3NyYy9yZWFkLW9ubHktZmlsZS1maWVsZC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZm9ybXMvc3JjL3JlYWQtb25seS1maWxlLWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFVLFFBQVEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULE1BQU0sRUFDTixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFJdkIsT0FBTyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5RSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFbkQsT0FBTyxFQUFDLHlCQUF5QixFQUF5QixNQUFNLHlCQUF5QixDQUFDOzs7Ozs7SUNyQzFGLDRCQUFxRzs7SUFDbkcseUJBQXNCO0lBQUMsWUFDekI7O0lBQUEsaUJBQUk7Ozs7SUFGcUQsQUFBWiw4Q0FBVyxtREFBNEI7SUFDN0UsZUFBZ0I7SUFBaEIsdURBQWdCO0lBQUUsY0FDekI7SUFEeUIsdUVBQ3pCOzs7SUFFRSx5QkFBMkM7O0FEbUM3Qzs7Ozs7O0dBTUc7QUFRSCxNQUFNLE9BQU8sNkJBQThCLFNBQVEscUJBQXFCO0lBS3RFLFlBQ0UsR0FBc0IsRUFDdEIsT0FBK0IsRUFDSSxHQUEyQixFQUM5RCxZQUEwQjtRQUUxQixLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQyw4QkFBOEIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0RSxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDbEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxFQUNsQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDbEIsT0FBTyxHQUFHLE9BQTZCLENBQUM7WUFDeEMsT0FBTyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUF3QixDQUFDO1FBQ3BGLENBQUMsQ0FBQyxFQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsRUFDOUIsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUNmLENBQUM7UUFDRixJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQzVCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNULElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUN4QyxPQUFPLFlBQVksQ0FBQyw4QkFBOEIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkUsQ0FBQztpQkFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQzFELE9BQU8sWUFBWSxDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMvRCxDQUFDO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBQ0YsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7OEhBakNVLDZCQUE2QixvSEFROUIseUJBQXlCO29FQVJ4Qiw2QkFBNkI7WUNyRDFDLDBFQUFxRzs7WUFHckcsK0hBQXFCOzs7WUFIVyxBQUE1Qix3REFBb0IsdUJBQW1COzs7aUZEcUQ5Qiw2QkFBNkI7Y0FQekMsU0FBUzsyQkFDRSwwQkFBMEIsbUJBR25CLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUk7O3NCQVVsQyxNQUFNO3VCQUFDLHlCQUF5Qjs7a0ZBUnhCLDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGaWxlLCBmaWxlSWNvbn0gZnJvbSAnQGFqZi9jb3JlL2ZpbGUtaW5wdXQnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEluamVjdCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtVbnR5cGVkRm9ybUNvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7RG9tU2FuaXRpemVyLCBTYWZlUmVzb3VyY2VVcmx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyLCBtYXAsIHNoYXJlUmVwbGF5LCBzdGFydFdpdGgsIHN3aXRjaE1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkJhc2VGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9iYXNlLWZpZWxkJztcbmltcG9ydCB7QWpmRm9ybVJlbmRlcmVyU2VydmljZX0gZnJvbSAnLi9mb3JtLXJlbmRlcmVyJztcbmltcG9ydCB7QUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSwgQWpmV2FybmluZ0FsZXJ0U2VydmljZX0gZnJvbSAnLi93YXJuaW5nLWFsZXJ0LXNlcnZpY2UnO1xuXG4vKipcbiAqIFRoaXMgY29tcG9uZW50IGFsbG93cyB5b3UgdG8gZG93bmxvYWQgdGhlIGZpbGUgY29udGFpbmVkIGluIHRoZSBjb250cm9sIG9mXG4gKiB0aGUgZm9ybSBpbmhlcml0ZWQgZnJvbSBBamZCYXNlRmllbGRDb21wb25lbnQuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIEFqZlJlYWRPbmx5RmlsZUZpZWxkQ29tcG9uZW50XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1yZWFkLW9ubHktZmlsZS1maWVsZCcsXG4gIHRlbXBsYXRlVXJsOiAncmVhZC1vbmx5LWZpbGUtZmllbGQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydyZWFkLW9ubHktZmlsZS1maWVsZC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZWFkT25seUZpbGVGaWVsZENvbXBvbmVudCBleHRlbmRzIEFqZkJhc2VGaWVsZENvbXBvbmVudCB7XG4gIHJlYWRvbmx5IGZpbGVJY29uOiBTYWZlUmVzb3VyY2VVcmw7XG4gIHJlYWRvbmx5IGZpbGVVcmw6IE9ic2VydmFibGU8U2FmZVJlc291cmNlVXJsIHwgbnVsbD47XG4gIHJlYWRvbmx5IGZpbGVOYW1lOiBPYnNlcnZhYmxlPHN0cmluZz47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBzZXJ2aWNlOiBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICAgIEBJbmplY3QoQUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSkgd2FzOiBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlLFxuICAgIGRvbVNhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICApIHtcbiAgICBzdXBlcihjZHIsIHNlcnZpY2UsIHdhcyk7XG4gICAgdGhpcy5maWxlSWNvbiA9IGRvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoZmlsZUljb24pO1xuICAgIGNvbnN0IGZpbGVTdHJlYW0gPSB0aGlzLmNvbnRyb2wucGlwZShcbiAgICAgIGZpbHRlcihjb250cm9sID0+IGNvbnRyb2wgIT0gbnVsbCksXG4gICAgICBzd2l0Y2hNYXAoY29udHJvbCA9PiB7XG4gICAgICAgIGNvbnRyb2wgPSBjb250cm9sIGFzIFVudHlwZWRGb3JtQ29udHJvbDtcbiAgICAgICAgcmV0dXJuIGNvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGUoc3RhcnRXaXRoKGNvbnRyb2wudmFsdWUpKSBhcyBPYnNlcnZhYmxlPEFqZkZpbGU+O1xuICAgICAgfSksXG4gICAgICBmaWx0ZXIodmFsdWUgPT4gdmFsdWUgIT0gbnVsbCksXG4gICAgICBzaGFyZVJlcGxheSgxKSxcbiAgICApO1xuICAgIHRoaXMuZmlsZVVybCA9IGZpbGVTdHJlYW0ucGlwZShcbiAgICAgIG1hcChmaWxlID0+IHtcbiAgICAgICAgaWYgKGZpbGUuY29udGVudCAmJiBmaWxlLmNvbnRlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIGRvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoZmlsZS5jb250ZW50KTtcbiAgICAgICAgfSBlbHNlIGlmIChmaWxlLnVybCAmJiBmaWxlLnVybC5sZW5ndGggJiYgIWZpbGUuZGVsZXRlVXJsKSB7XG4gICAgICAgICAgcmV0dXJuIGRvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoZmlsZS51cmwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSksXG4gICAgKTtcbiAgICB0aGlzLmZpbGVOYW1lID0gZmlsZVN0cmVhbS5waXBlKG1hcChmaWxlID0+IGZpbGUubmFtZSkpO1xuICB9XG59XG4iLCI8YSAqbmdJZj1cImZpbGVVcmx8YXN5bmMgYXMgZnUgOyBlbHNlIG5vRmlsZVwiIFtocmVmXT1cImZ1XCIgW2Rvd25sb2FkXT1cImZpbGVOYW1lfGFzeW5jXCIgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gIDxpbWcgW3NyY109XCJmaWxlSWNvblwiPiB7eyBmaWxlTmFtZXxhc3luYyB9fVxuPC9hPlxuPG5nLXRlbXBsYXRlICNub0ZpbGU+XG4gIDxkaXYgY2xhc3M9XCJhamYtbm8tZmlsZS1wbGFjZWhvbGRlclwiPjwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==