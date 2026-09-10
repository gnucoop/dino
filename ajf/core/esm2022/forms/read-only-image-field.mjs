import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation, } from '@angular/core';
import { filter, map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { AjfBaseFieldComponent } from './base-field';
import { AJF_WARNING_ALERT_SERVICE } from './warning-alert-service';
import * as i0 from "@angular/core";
import * as i1 from "./form-renderer";
import * as i2 from "@angular/platform-browser";
import * as i3 from "@angular/common";
function AjfReadOnlyImageFieldComponent_img_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 2);
    i0.ɵɵpipe(1, "async");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("src", i0.ɵɵpipeBind1(1, 1, ctx_r0.imageUrl), i0.ɵɵsanitizeUrl);
} }
function AjfReadOnlyImageFieldComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 3);
} }
/**
 * This component allows you to show the image related to url contained in the control of
 * the form inherited from AjfBaseFieldComponent.
 *
 * @export
 * @class AjfReadOnlyImageFieldComponent
 */
export class AjfReadOnlyImageFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was, domSanitizer) {
        super(cdr, service, was);
        const fileStream = this.control.pipe(filter(control => control != null), switchMap(control => {
            control = control;
            return control.valueChanges.pipe(startWith(control.value));
        }), filter(value => value != null), shareReplay(1));
        this.imageUrl = fileStream.pipe(map(file => {
            if (file.content && file.content.length) {
                return domSanitizer.bypassSecurityTrustResourceUrl(file.content);
            }
            else if (file.url && file.url.length) {
                return domSanitizer.bypassSecurityTrustResourceUrl(file.url);
            }
            return null;
        }));
    }
    static { this.ɵfac = function AjfReadOnlyImageFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfReadOnlyImageFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE), i0.ɵɵdirectiveInject(i2.DomSanitizer)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfReadOnlyImageFieldComponent, selectors: [["ajf-read-only-image-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 4, vars: 4, consts: [["noImage", ""], [3, "src", 4, "ngIf", "ngIfElse"], [3, "src"], [1, "ajf-no-image-placeholder"]], template: function AjfReadOnlyImageFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfReadOnlyImageFieldComponent_img_0_Template, 2, 3, "img", 1);
            i0.ɵɵpipe(1, "async");
            i0.ɵɵtemplate(2, AjfReadOnlyImageFieldComponent_ng_template_2_Template, 1, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            const noImage_r2 = i0.ɵɵreference(3);
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 2, ctx.imageUrl))("ngIfElse", noImage_r2);
        } }, dependencies: [i3.NgIf, i3.AsyncPipe], styles: ["ajf-read-only-image-field{display:block}ajf-read-only-image-field img{max-width:200px;max-height:120px;border:1px solid var(--ajf-border, #e6e2dc);border-radius:var(--ajf-radius, 4px)}ajf-read-only-image-field .ajf-no-image-placeholder{width:120px;height:60px;border-radius:var(--ajf-radius, 4px);background-color:var(--ajf-band, #faf8f5);background-image:repeating-linear-gradient(45deg,var(--ajf-border, #e6e2dc) 0,var(--ajf-border, #e6e2dc) 1px,transparent 1px,transparent 7px)}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfReadOnlyImageFieldComponent, [{
        type: Component,
        args: [{ selector: 'ajf-read-only-image-field', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<img *ngIf=\"imageUrl|async as iu ; else noImage\" [src]=\"imageUrl|async\">\n<ng-template #noImage>\n  <div class=\"ajf-no-image-placeholder\"></div>\n</ng-template>\n", styles: ["ajf-read-only-image-field{display:block}ajf-read-only-image-field img{max-width:200px;max-height:120px;border:1px solid var(--ajf-border, #e6e2dc);border-radius:var(--ajf-radius, 4px)}ajf-read-only-image-field .ajf-no-image-placeholder{width:120px;height:60px;border-radius:var(--ajf-radius, 4px);background-color:var(--ajf-band, #faf8f5);background-image:repeating-linear-gradient(45deg,var(--ajf-border, #e6e2dc) 0,var(--ajf-border, #e6e2dc) 1px,transparent 1px,transparent 7px)}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: undefined, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }, { type: i2.DomSanitizer }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfReadOnlyImageFieldComponent, { className: "AjfReadOnlyImageFieldComponent", filePath: "read-only-image-field.ts", lineNumber: 54 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1vbmx5LWltYWdlLWZpZWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvcmVhZC1vbmx5LWltYWdlLWZpZWxkLnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvcmVhZC1vbmx5LWltYWdlLWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUJBLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULE1BQU0sRUFDTixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFJdkIsT0FBTyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5RSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFbkQsT0FBTyxFQUFDLHlCQUF5QixFQUF5QixNQUFNLHlCQUF5QixDQUFDOzs7Ozs7SUNyQzFGLHlCQUF3RTs7OztJQUF2Qiw2RUFBc0I7OztJQUVyRSx5QkFBNEM7O0FEcUM5Qzs7Ozs7O0dBTUc7QUFRSCxNQUFNLE9BQU8sOEJBQStCLFNBQVEscUJBQXFCO0lBR3ZFLFlBQ0UsR0FBc0IsRUFDdEIsT0FBK0IsRUFDSSxHQUEyQixFQUM5RCxZQUEwQjtRQUUxQixLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN6QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDbEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxFQUNsQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDbEIsT0FBTyxHQUFHLE9BQTZCLENBQUM7WUFDeEMsT0FBTyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUF3QixDQUFDO1FBQ3BGLENBQUMsQ0FBQyxFQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsRUFDOUIsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUNmLENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQzdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNULElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUN4QyxPQUFPLFlBQVksQ0FBQyw4QkFBOEIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkUsQ0FBQztpQkFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDdkMsT0FBTyxZQUFZLENBQUMsOEJBQThCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQy9ELENBQUM7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDOytIQTdCVSw4QkFBOEIsb0hBTS9CLHlCQUF5QjtvRUFOeEIsOEJBQThCO1lDckQzQywrRUFBd0U7O1lBQ3hFLGdJQUFzQjs7O1lBRGEsQUFBN0IseURBQXFCLHdCQUFvQjs7O2lGRHFEbEMsOEJBQThCO2NBUDFDLFNBQVM7MkJBQ0UsMkJBQTJCLG1CQUdwQix1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJOztzQkFRbEMsTUFBTTt1QkFBQyx5QkFBeUI7O2tGQU54Qiw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRmlsZX0gZnJvbSAnQGFqZi9jb3JlL2ZpbGUtaW5wdXQnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEluamVjdCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtVbnR5cGVkRm9ybUNvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7RG9tU2FuaXRpemVyLCBTYWZlUmVzb3VyY2VVcmx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyLCBtYXAsIHNoYXJlUmVwbGF5LCBzdGFydFdpdGgsIHN3aXRjaE1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkJhc2VGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9iYXNlLWZpZWxkJztcbmltcG9ydCB7QWpmRm9ybVJlbmRlcmVyU2VydmljZX0gZnJvbSAnLi9mb3JtLXJlbmRlcmVyJztcbmltcG9ydCB7QUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSwgQWpmV2FybmluZ0FsZXJ0U2VydmljZX0gZnJvbSAnLi93YXJuaW5nLWFsZXJ0LXNlcnZpY2UnO1xuXG4vKipcbiAqIFRoaXMgY29tcG9uZW50IGFsbG93cyB5b3UgdG8gc2hvdyB0aGUgaW1hZ2UgcmVsYXRlZCB0byB1cmwgY29udGFpbmVkIGluIHRoZSBjb250cm9sIG9mXG4gKiB0aGUgZm9ybSBpbmhlcml0ZWQgZnJvbSBBamZCYXNlRmllbGRDb21wb25lbnQuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIEFqZlJlYWRPbmx5SW1hZ2VGaWVsZENvbXBvbmVudFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcmVhZC1vbmx5LWltYWdlLWZpZWxkJyxcbiAgdGVtcGxhdGVVcmw6ICdyZWFkLW9ubHktaW1hZ2UtZmllbGQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydyZWFkLW9ubHktaW1hZ2UtZmllbGQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVhZE9ubHlJbWFnZUZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWpmQmFzZUZpZWxkQ29tcG9uZW50IHtcbiAgcmVhZG9ubHkgaW1hZ2VVcmw6IE9ic2VydmFibGU8U2FmZVJlc291cmNlVXJsIHwgbnVsbD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBzZXJ2aWNlOiBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICAgIEBJbmplY3QoQUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSkgd2FzOiBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlLFxuICAgIGRvbVNhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICApIHtcbiAgICBzdXBlcihjZHIsIHNlcnZpY2UsIHdhcyk7XG4gICAgY29uc3QgZmlsZVN0cmVhbSA9IHRoaXMuY29udHJvbC5waXBlKFxuICAgICAgZmlsdGVyKGNvbnRyb2wgPT4gY29udHJvbCAhPSBudWxsKSxcbiAgICAgIHN3aXRjaE1hcChjb250cm9sID0+IHtcbiAgICAgICAgY29udHJvbCA9IGNvbnRyb2wgYXMgVW50eXBlZEZvcm1Db250cm9sO1xuICAgICAgICByZXR1cm4gY29udHJvbC52YWx1ZUNoYW5nZXMucGlwZShzdGFydFdpdGgoY29udHJvbC52YWx1ZSkpIGFzIE9ic2VydmFibGU8QWpmRmlsZT47XG4gICAgICB9KSxcbiAgICAgIGZpbHRlcih2YWx1ZSA9PiB2YWx1ZSAhPSBudWxsKSxcbiAgICAgIHNoYXJlUmVwbGF5KDEpLFxuICAgICk7XG4gICAgdGhpcy5pbWFnZVVybCA9IGZpbGVTdHJlYW0ucGlwZShcbiAgICAgIG1hcChmaWxlID0+IHtcbiAgICAgICAgaWYgKGZpbGUuY29udGVudCAmJiBmaWxlLmNvbnRlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIGRvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoZmlsZS5jb250ZW50KTtcbiAgICAgICAgfSBlbHNlIGlmIChmaWxlLnVybCAmJiBmaWxlLnVybC5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybChmaWxlLnVybCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9KSxcbiAgICApO1xuICB9XG59XG4iLCI8aW1nICpuZ0lmPVwiaW1hZ2VVcmx8YXN5bmMgYXMgaXUgOyBlbHNlIG5vSW1hZ2VcIiBbc3JjXT1cImltYWdlVXJsfGFzeW5jXCI+XG48bmctdGVtcGxhdGUgI25vSW1hZ2U+XG4gIDxkaXYgY2xhc3M9XCJhamYtbm8taW1hZ2UtcGxhY2Vob2xkZXJcIj48L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG4iXX0=