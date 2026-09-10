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
import { AJF_WARNING_ALERT_SERVICE, AjfInputFieldComponent as CoreComponent, } from '@ajf/core/forms';
import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/core/forms";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "ngx-quill";
import * as i5 from "./warning-alert-service";
function AjfTextFieldComponent_quill_editor_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "quill-editor", 1);
} if (rf & 2) {
    const ctrl_r1 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formControl", ctrl_r1)("modules", ctx_r1.quillModules);
} }
export class AjfTextFieldComponent extends CoreComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
        this.quillModules = {
            toolbar: [
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['clean'],
            ],
        };
    }
    ngOnInit() {
        super.ngOnInit();
        if (this.control) {
            this.control.subscribe(ctrl => {
                if (ctrl && typeof ctrl.value === 'string') {
                    const converted = ctrl.value.replace(/\r\n|\r|\n/g, '<br>');
                    if (converted !== ctrl.value) {
                        ctrl.setValue(converted, { emitEvent: false });
                    }
                }
            });
        }
    }
    static { this.ɵfac = function AjfTextFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfTextFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfTextFieldComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 2, vars: 3, consts: [["class", "resizable-quill", "placeholder", "", 3, "formControl", "modules", 4, "ngIf"], ["placeholder", "", 1, "resizable-quill", 3, "formControl", "modules"]], template: function AjfTextFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfTextFieldComponent_quill_editor_0_Template, 1, 2, "quill-editor", 0);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.control));
        } }, dependencies: [i2.NgIf, i3.NgControlStatus, i3.FormControlDirective, i4.QuillEditorComponent, i2.AsyncPipe], styles: ["ajf-field .resizable-quill{display:block;width:100%;max-width:720px}ajf-field .resizable-quill .ql-toolbar.ql-snow,ajf-field .resizable-quill .ql-container.ql-snow{border-color:var(--ajf-border-strong)}ajf-field .resizable-quill .ql-toolbar.ql-snow{border-radius:var(--ajf-radius) var(--ajf-radius) 0 0;background:var(--ajf-band)}ajf-field .resizable-quill .ql-toolbar.ql-snow .ql-stroke{stroke:var(--ajf-text-muted)}ajf-field .resizable-quill .ql-toolbar.ql-snow .ql-fill{fill:var(--ajf-text-muted)}ajf-field .resizable-quill .ql-toolbar.ql-snow .ql-active .ql-stroke{stroke:var(--ajf-accent)}ajf-field .resizable-quill .ql-toolbar.ql-snow .ql-active .ql-fill{fill:var(--ajf-accent)}ajf-field .resizable-quill .ql-container.ql-snow{border-radius:0 0 var(--ajf-radius) var(--ajf-radius);background:var(--ajf-surface);font-family:var(--ajf-font-sans);font-size:14px}ajf-field .resizable-quill .ql-editor{min-height:7.5em;max-height:30em;resize:vertical}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfTextFieldComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<quill-editor *ngIf=\"control | async as ctrl\" [formControl]=\"ctrl!\" [modules]=\"quillModules\" class=\"resizable-quill\"\n    placeholder=\"\">\n</quill-editor>", styles: ["ajf-field .resizable-quill{display:block;width:100%;max-width:720px}ajf-field .resizable-quill .ql-toolbar.ql-snow,ajf-field .resizable-quill .ql-container.ql-snow{border-color:var(--ajf-border-strong)}ajf-field .resizable-quill .ql-toolbar.ql-snow{border-radius:var(--ajf-radius) var(--ajf-radius) 0 0;background:var(--ajf-band)}ajf-field .resizable-quill .ql-toolbar.ql-snow .ql-stroke{stroke:var(--ajf-text-muted)}ajf-field .resizable-quill .ql-toolbar.ql-snow .ql-fill{fill:var(--ajf-text-muted)}ajf-field .resizable-quill .ql-toolbar.ql-snow .ql-active .ql-stroke{stroke:var(--ajf-accent)}ajf-field .resizable-quill .ql-toolbar.ql-snow .ql-active .ql-fill{fill:var(--ajf-accent)}ajf-field .resizable-quill .ql-container.ql-snow{border-radius:0 0 var(--ajf-radius) var(--ajf-radius);background:var(--ajf-surface);font-family:var(--ajf-font-sans);font-size:14px}ajf-field .resizable-quill .ql-editor{min-height:7.5em;max-height:30em;resize:vertical}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: i5.AjfWarningAlertService, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfTextFieldComponent, { className: "AjfTextFieldComponent", filePath: "text-field.ts", lineNumber: 45 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm1zL3NyYy90ZXh0LWZpZWxkLnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvZm9ybXMvc3JjL3RleHQtZmllbGQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wseUJBQXlCLEVBRXpCLHNCQUFzQixJQUFJLGFBQWEsR0FDeEMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxNQUFNLEVBRU4saUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDOzs7Ozs7OztJQ2xDdkIsa0NBRWU7Ozs7SUFGcUQsQUFBdEIscUNBQXFCLGdDQUF5Qjs7QUQ0QzVGLE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxhQUFhO0lBU3RELFlBQ0UsR0FBc0IsRUFDdEIsT0FBK0IsRUFDSSxHQUEyQjtRQUU5RCxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQWIzQixpQkFBWSxHQUFHO1lBQ2IsT0FBTyxFQUFFO2dCQUNQLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLENBQUM7Z0JBQy9CLENBQUMsRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFDLENBQUM7Z0JBQ3pDLENBQUMsT0FBTyxDQUFDO2FBQ1Y7U0FDRixDQUFDO0lBUUYsQ0FBQztJQUVRLFFBQVE7UUFDZixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDakIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzVCLElBQUksSUFBSSxJQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUUsQ0FBQztvQkFDM0MsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUM1RCxJQUFJLFNBQVMsS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7b0JBQy9DLENBQUM7Z0JBQ0gsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztJQUNILENBQUM7c0hBN0JVLHFCQUFxQixvSEFZdEIseUJBQXlCO29FQVp4QixxQkFBcUI7WUM1Q2xDLHdGQUNtQjs7O1lBREosd0RBQXNCOzs7aUZENEN4QixxQkFBcUI7Y0FOakMsU0FBUztrQ0FHUyx1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJOztzQkFjbEMsTUFBTTt1QkFBQyx5QkFBeUI7O2tGQVp4QixxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UsXG4gIEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gIEFqZklucHV0RmllbGRDb21wb25lbnQgYXMgQ29yZUNvbXBvbmVudCxcbn0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbmplY3QsXG4gIE9uSW5pdCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZldhcm5pbmdBbGVydFNlcnZpY2V9IGZyb20gJy4vd2FybmluZy1hbGVydC1zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlVXJsOiAndGV4dC1maWVsZC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3RleHQtZmllbGQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmVGV4dEZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQ29yZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHF1aWxsTW9kdWxlcyA9IHtcbiAgICB0b29sYmFyOiBbXG4gICAgICBbJ2JvbGQnLCAnaXRhbGljJywgJ3VuZGVybGluZSddLFxuICAgICAgW3snbGlzdCc6ICdvcmRlcmVkJ30sIHsnbGlzdCc6ICdidWxsZXQnfV0sXG4gICAgICBbJ2NsZWFuJ10sXG4gICAgXSxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHNlcnZpY2U6IEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gICAgQEluamVjdChBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFKSB3YXM6IEFqZldhcm5pbmdBbGVydFNlcnZpY2UsXG4gICkge1xuICAgIHN1cGVyKGNkciwgc2VydmljZSwgd2FzKTtcbiAgfVxuXG4gIG92ZXJyaWRlIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgaWYgKHRoaXMuY29udHJvbCkge1xuICAgICAgdGhpcy5jb250cm9sLnN1YnNjcmliZShjdHJsID0+IHtcbiAgICAgICAgaWYgKGN0cmwgJiYgdHlwZW9mIGN0cmwudmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29uc3QgY29udmVydGVkID0gY3RybC52YWx1ZS5yZXBsYWNlKC9cXHJcXG58XFxyfFxcbi9nLCAnPGJyPicpO1xuICAgICAgICAgIGlmIChjb252ZXJ0ZWQgIT09IGN0cmwudmFsdWUpIHtcbiAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUoY29udmVydGVkLCB7ZW1pdEV2ZW50OiBmYWxzZX0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCI8cXVpbGwtZWRpdG9yICpuZ0lmPVwiY29udHJvbCB8IGFzeW5jIGFzIGN0cmxcIiBbZm9ybUNvbnRyb2xdPVwiY3RybCFcIiBbbW9kdWxlc109XCJxdWlsbE1vZHVsZXNcIiBjbGFzcz1cInJlc2l6YWJsZS1xdWlsbFwiXG4gICAgcGxhY2Vob2xkZXI9XCJcIj5cbjwvcXVpbGwtZWRpdG9yPiJdfQ==