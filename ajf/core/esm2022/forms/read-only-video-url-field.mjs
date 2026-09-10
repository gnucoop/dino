import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation, } from '@angular/core';
import { AjfVideoUrlFieldComponent } from './video-url-field';
import { AJF_WARNING_ALERT_SERVICE } from './warning-alert-service';
import * as i0 from "@angular/core";
import * as i1 from "./form-renderer";
import * as i2 from "@angular/platform-browser";
import * as i3 from "@angular/common/http";
import * as i4 from "@angular/common";
function AjfReadOnlyVideoUrlFieldComponent_div_0_ng_container_1_img_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 5);
} if (rf & 2) {
    const thumb_r1 = ctx.ngIf;
    i0.ɵɵproperty("src", thumb_r1, i0.ɵɵsanitizeUrl);
} }
function AjfReadOnlyVideoUrlFieldComponent_div_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "a", 3);
    i0.ɵɵtemplate(2, AjfReadOnlyVideoUrlFieldComponent_div_0_ng_container_1_img_2_Template, 1, 1, "img", 4);
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
function AjfReadOnlyVideoUrlFieldComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtemplate(1, AjfReadOnlyVideoUrlFieldComponent_div_0_ng_container_1_Template, 4, 4, "ng-container", 2);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(2, 1, ctx_r2.validUrl));
} }
/**
 * This component allows you to show the video related to url contained in the control of
 * the form inherited from AjfBaseFieldComponent.
 *
 * @export
 * @class AjfReadOnlyVideoUrlFieldComponent
 */
export class AjfReadOnlyVideoUrlFieldComponent extends AjfVideoUrlFieldComponent {
    constructor(cdr, service, was, domSanitizer, httpClient) {
        super(cdr, service, was, domSanitizer, httpClient);
    }
    static { this.ɵfac = function AjfReadOnlyVideoUrlFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfReadOnlyVideoUrlFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE), i0.ɵɵdirectiveInject(i2.DomSanitizer), i0.ɵɵdirectiveInject(i3.HttpClient)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfReadOnlyVideoUrlFieldComponent, selectors: [["ajf-read-only-video-url-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 2, vars: 3, consts: [["class", "ajf-video-thumbnail", 4, "ngIf"], [1, "ajf-video-thumbnail"], [4, "ngIf"], ["target", "_blank", 3, "href"], ["class", "", "alt", "", 3, "src", 4, "ngIf"], ["alt", "", 1, "", 3, "src"]], template: function AjfReadOnlyVideoUrlFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfReadOnlyVideoUrlFieldComponent_div_0_Template, 3, 3, "div", 0);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.control));
        } }, dependencies: [i4.NgIf, i4.AsyncPipe], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfReadOnlyVideoUrlFieldComponent, [{
        type: Component,
        args: [{ selector: 'ajf-read-only-video-url-field', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div *ngIf=\"control|async as ctrl\" class=\"ajf-video-thumbnail\">\n  <ng-container *ngIf=\"validUrl|async\">\n    <a target=\"_blank\" [href]=\"ctrl.value\">\n      <img *ngIf=\"videoThumbnail|async as thumb\" [src]=\"thumb\" class=\"\" alt=\"\">\n    </a>\n  </ng-container>\n</div>\n" }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: undefined, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }, { type: i2.DomSanitizer }, { type: i3.HttpClient }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfReadOnlyVideoUrlFieldComponent, { className: "AjfReadOnlyVideoUrlFieldComponent", filePath: "read-only-video-url-field.ts", lineNumber: 51 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1vbmx5LXZpZGVvLXVybC1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZm9ybXMvc3JjL3JlYWQtb25seS12aWRlby11cmwtZmllbGQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2Zvcm1zL3NyYy9yZWFkLW9ubHktdmlkZW8tdXJsLWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUJBLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULE1BQU0sRUFDTixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFJdkIsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDNUQsT0FBTyxFQUFDLHlCQUF5QixFQUF5QixNQUFNLHlCQUF5QixDQUFDOzs7Ozs7O0lDL0JwRix5QkFBeUU7OztJQUE5QixnREFBYTs7O0lBRjVELDZCQUFxQztJQUNuQyw0QkFBdUM7SUFDckMsdUdBQXlFOztJQUMzRSxpQkFBSTs7Ozs7SUFGZSxjQUFtQjtJQUFuQixzREFBbUI7SUFDOUIsY0FBMkI7SUFBM0Isa0VBQTJCOzs7SUFIdkMsOEJBQStEO0lBQzdELDBHQUFxQzs7SUFLdkMsaUJBQU07OztJQUxXLGNBQW9CO0lBQXBCLDREQUFvQjs7QURtQ3JDOzs7Ozs7R0FNRztBQVFILE1BQU0sT0FBTyxpQ0FBa0MsU0FBUSx5QkFBeUI7SUFDOUUsWUFDRSxHQUFzQixFQUN0QixPQUErQixFQUNJLEdBQTJCLEVBQzlELFlBQTBCLEVBQzFCLFVBQXNCO1FBRXRCLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDckQsQ0FBQztrSUFUVSxpQ0FBaUMsb0hBSWxDLHlCQUF5QjtvRUFKeEIsaUNBQWlDO1lDbEQ5QyxrRkFBK0Q7OztZQUF6RCx3REFBb0I7OztpRkRrRGIsaUNBQWlDO2NBUDdDLFNBQVM7MkJBQ0UsK0JBQStCLG1CQUd4Qix1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJOztzQkFNbEMsTUFBTTt1QkFBQyx5QkFBeUI7O2tGQUp4QixpQ0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEluamVjdCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXJ9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQge0FqZkZvcm1SZW5kZXJlclNlcnZpY2V9IGZyb20gJy4vZm9ybS1yZW5kZXJlcic7XG5pbXBvcnQge0FqZlZpZGVvVXJsRmllbGRDb21wb25lbnR9IGZyb20gJy4vdmlkZW8tdXJsLWZpZWxkJztcbmltcG9ydCB7QUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSwgQWpmV2FybmluZ0FsZXJ0U2VydmljZX0gZnJvbSAnLi93YXJuaW5nLWFsZXJ0LXNlcnZpY2UnO1xuXG4vKipcbiAqIFRoaXMgY29tcG9uZW50IGFsbG93cyB5b3UgdG8gc2hvdyB0aGUgdmlkZW8gcmVsYXRlZCB0byB1cmwgY29udGFpbmVkIGluIHRoZSBjb250cm9sIG9mXG4gKiB0aGUgZm9ybSBpbmhlcml0ZWQgZnJvbSBBamZCYXNlRmllbGRDb21wb25lbnQuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIEFqZlJlYWRPbmx5VmlkZW9VcmxGaWVsZENvbXBvbmVudFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcmVhZC1vbmx5LXZpZGVvLXVybC1maWVsZCcsXG4gIHRlbXBsYXRlVXJsOiAncmVhZC1vbmx5LXZpZGVvLXVybC1maWVsZC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3JlYWQtb25seS12aWRlby11cmwtZmllbGQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVhZE9ubHlWaWRlb1VybEZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWpmVmlkZW9VcmxGaWVsZENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgc2VydmljZTogQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbiAgICBASW5qZWN0KEFKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UpIHdhczogQWpmV2FybmluZ0FsZXJ0U2VydmljZSxcbiAgICBkb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgICBodHRwQ2xpZW50OiBIdHRwQ2xpZW50LFxuICApIHtcbiAgICBzdXBlcihjZHIsIHNlcnZpY2UsIHdhcywgZG9tU2FuaXRpemVyLCBodHRwQ2xpZW50KTtcbiAgfVxufVxuIiwiPGRpdiAqbmdJZj1cImNvbnRyb2x8YXN5bmMgYXMgY3RybFwiIGNsYXNzPVwiYWpmLXZpZGVvLXRodW1ibmFpbFwiPlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwidmFsaWRVcmx8YXN5bmNcIj5cbiAgICA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBbaHJlZl09XCJjdHJsLnZhbHVlXCI+XG4gICAgICA8aW1nICpuZ0lmPVwidmlkZW9UaHVtYm5haWx8YXN5bmMgYXMgdGh1bWJcIiBbc3JjXT1cInRodW1iXCIgY2xhc3M9XCJcIiBhbHQ9XCJcIj5cbiAgICA8L2E+XG4gIDwvbmctY29udGFpbmVyPlxuPC9kaXY+XG4iXX0=