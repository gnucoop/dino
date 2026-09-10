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
import { AjfCheckboxGroupItem as CoreCheckboxGroupItem, } from '@ajf/core/checkbox-group';
import { ChangeDetectionStrategy, Component, Optional, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/core/checkbox-group";
import * as i2 from "@angular/material/button";
import * as i3 from "@angular/material/icon";
import * as i4 from "@angular/common";
const _c0 = ["*"];
export class CheckboxGroupItem extends CoreCheckboxGroupItem {
    constructor(
    // `AjfCheckboxGroupItem` is commonly used in combination with a `AjfCheckboxGroup`.
    // tslint:disable-next-line: lightweight-tokens
    checkboxGroup) {
        super(checkboxGroup);
        this.checkedIcon = 'check_box';
        this.notCheckedIcon = 'check_box_outline_blank';
    }
    static { this.ɵfac = function CheckboxGroupItem_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CheckboxGroupItem)(i0.ɵɵdirectiveInject(i1.AjfCheckboxGroup, 8)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CheckboxGroupItem, selectors: [["ajf-checkbox-group-item"]], hostVars: 5, hostBindings: function CheckboxGroupItem_HostBindings(rf, ctx) { if (rf & 2) {
            i0.ɵɵattribute("id", ctx.id);
            i0.ɵɵclassProp("ajf-checkbox-group-checked", ctx.checked)("ajf-checkbox-group-disable", ctx.disabled);
        } }, features: [i0.ɵɵInheritDefinitionFeature], ngContentSelectors: _c0, decls: 10, vars: 16, consts: [["mat-button", "", "type", "button", 3, "click", "id"], [1, "ajf-checkbox-group-content"]], template: function CheckboxGroupItem_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef();
            i0.ɵɵelementStart(0, "button", 0);
            i0.ɵɵpipe(1, "async");
            i0.ɵɵpipe(2, "async");
            i0.ɵɵpipe(3, "async");
            i0.ɵɵpipe(4, "async");
            i0.ɵɵlistener("click", function CheckboxGroupItem_Template_button_click_0_listener($event) { return ctx.onInputChange($event); });
            i0.ɵɵelementStart(5, "mat-icon");
            i0.ɵɵtext(6);
            i0.ɵɵpipe(7, "async");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "span", 1);
            i0.ɵɵprojection(9);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵclassProp("ajf-checked", i0.ɵɵpipeBind1(1, 6, ctx.checkedState));
            i0.ɵɵproperty("id", i0.ɵɵpipeBind1(2, 8, ctx.checkboxId));
            i0.ɵɵattribute("aria-checked", i0.ɵɵpipeBind1(3, 10, ctx.checkedState))("aria-disabled", i0.ɵɵpipeBind1(4, 12, ctx.disabledState));
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 14, ctx.icon));
        } }, dependencies: [i2.MatButton, i3.MatIcon, i4.AsyncPipe], styles: ["ajf-checkbox-group-item{display:inline-flex}ajf-checkbox-group-item .mat-mdc-button{display:inline-flex;align-items:center;justify-content:flex-start;gap:8px;box-sizing:border-box;min-width:0;min-height:var(--ajf-control-h, 44px);padding:0 14px;border:1px solid var(--ajf-border-strong, #d5cfc6);border-radius:var(--ajf-radius, 4px);background:var(--ajf-surface, #fff);color:var(--ajf-text, #1c1a17);font-size:14px;letter-spacing:normal}ajf-checkbox-group-item .mat-mdc-button:hover{border-color:var(--ajf-accent, #0f4c5c)}ajf-checkbox-group-item .mat-mdc-button .mat-icon{width:18px;height:18px;margin:0;color:var(--ajf-text-faint, #a49c92);font-size:18px}ajf-checkbox-group-item .mat-mdc-button.ajf-checked{border-color:var(--ajf-accent, #0f4c5c);background:var(--ajf-accent-soft, #e8f1f5);color:var(--ajf-accent, #0f4c5c)}ajf-checkbox-group-item .mat-mdc-button.ajf-checked .mat-icon{color:var(--ajf-accent, #0f4c5c)}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CheckboxGroupItem, [{
        type: Component,
        args: [{ selector: 'ajf-checkbox-group-item', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                    '[attr.id]': 'id',
                    '[class.ajf-checkbox-group-checked]': 'checked',
                    '[class.ajf-checkbox-group-disable]': 'disabled',
                }, template: "<button\n  mat-button\n  (click)=\"onInputChange($event)\"\n  type=\"button\"\n  [id]=\"checkboxId | async\"\n  [class.ajf-checked]=\"checkedState | async\"\n  [attr.aria-checked]=\"checkedState | async\"\n  [attr.aria-disabled]=\"disabledState | async\"\n>\n  <mat-icon>{{ icon | async }}</mat-icon>\n  <span class=\"ajf-checkbox-group-content\">\n    <ng-content></ng-content>\n  </span>\n</button>\n", styles: ["ajf-checkbox-group-item{display:inline-flex}ajf-checkbox-group-item .mat-mdc-button{display:inline-flex;align-items:center;justify-content:flex-start;gap:8px;box-sizing:border-box;min-width:0;min-height:var(--ajf-control-h, 44px);padding:0 14px;border:1px solid var(--ajf-border-strong, #d5cfc6);border-radius:var(--ajf-radius, 4px);background:var(--ajf-surface, #fff);color:var(--ajf-text, #1c1a17);font-size:14px;letter-spacing:normal}ajf-checkbox-group-item .mat-mdc-button:hover{border-color:var(--ajf-accent, #0f4c5c)}ajf-checkbox-group-item .mat-mdc-button .mat-icon{width:18px;height:18px;margin:0;color:var(--ajf-text-faint, #a49c92);font-size:18px}ajf-checkbox-group-item .mat-mdc-button.ajf-checked{border-color:var(--ajf-accent, #0f4c5c);background:var(--ajf-accent-soft, #e8f1f5);color:var(--ajf-accent, #0f4c5c)}ajf-checkbox-group-item .mat-mdc-button.ajf-checked .mat-icon{color:var(--ajf-accent, #0f4c5c)}\n"] }]
    }], () => [{ type: i1.AjfCheckboxGroup, decorators: [{
                type: Optional
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CheckboxGroupItem, { className: "CheckboxGroupItem", filePath: "checkbox-group-item.ts", lineNumber: 41 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtZ3JvdXAtaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2NoZWNrYm94LWdyb3VwL3NyYy9jaGVja2JveC1ncm91cC1pdGVtLnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvY2hlY2tib3gtZ3JvdXAvc3JjL2NoZWNrYm94LWdyb3VwLWl0ZW0uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBRUwsb0JBQW9CLElBQUkscUJBQXFCLEdBQzlDLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7QUFjOUYsTUFBTSxPQUFPLGlCQUFxQixTQUFRLHFCQUF3QjtJQUNoRTtJQUNFLG9GQUFvRjtJQUNwRiwrQ0FBK0M7SUFDbkMsYUFBa0M7UUFFOUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcseUJBQXlCLENBQUM7SUFDbEQsQ0FBQztrSEFUVSxpQkFBaUI7b0VBQWpCLGlCQUFpQjs7WUFBakIseURBQWlCLDRDQUFBOzs7WUN4QzlCLGlDQVFDOzs7OztZQU5DLG9HQUFTLHlCQUFxQixJQUFDO1lBTy9CLGdDQUFVO1lBQUEsWUFBa0I7O1lBQUEsaUJBQVc7WUFDdkMsK0JBQXlDO1lBQ3ZDLGtCQUF5QjtZQUU3QixBQURFLGlCQUFPLEVBQ0E7O1lBUlAscUVBQTBDO1lBRDFDLHlEQUF5Qjs7WUFLZixlQUFrQjtZQUFsQixxREFBa0I7OztpRkQrQmpCLGlCQUFpQjtjQVo3QixTQUFTOzJCQUNFLHlCQUF5QixtQkFHbEIsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSSxRQUMvQjtvQkFDSixXQUFXLEVBQUUsSUFBSTtvQkFDakIsb0NBQW9DLEVBQUUsU0FBUztvQkFDL0Msb0NBQW9DLEVBQUUsVUFBVTtpQkFDakQ7O3NCQU1FLFFBQVE7O2tGQUpBLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmQ2hlY2tib3hHcm91cCxcbiAgQWpmQ2hlY2tib3hHcm91cEl0ZW0gYXMgQ29yZUNoZWNrYm94R3JvdXBJdGVtLFxufSBmcm9tICdAYWpmL2NvcmUvY2hlY2tib3gtZ3JvdXAnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBPcHRpb25hbCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtY2hlY2tib3gtZ3JvdXAtaXRlbScsXG4gIHRlbXBsYXRlVXJsOiAnY2hlY2tib3gtZ3JvdXAtaXRlbS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2NoZWNrYm94LWdyb3VwLWl0ZW0uc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaG9zdDoge1xuICAgICdbYXR0ci5pZF0nOiAnaWQnLFxuICAgICdbY2xhc3MuYWpmLWNoZWNrYm94LWdyb3VwLWNoZWNrZWRdJzogJ2NoZWNrZWQnLFxuICAgICdbY2xhc3MuYWpmLWNoZWNrYm94LWdyb3VwLWRpc2FibGVdJzogJ2Rpc2FibGVkJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tib3hHcm91cEl0ZW08VD4gZXh0ZW5kcyBDb3JlQ2hlY2tib3hHcm91cEl0ZW08VD4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICAvLyBgQWpmQ2hlY2tib3hHcm91cEl0ZW1gIGlzIGNvbW1vbmx5IHVzZWQgaW4gY29tYmluYXRpb24gd2l0aCBhIGBBamZDaGVja2JveEdyb3VwYC5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGxpZ2h0d2VpZ2h0LXRva2Vuc1xuICAgIEBPcHRpb25hbCgpIGNoZWNrYm94R3JvdXA6IEFqZkNoZWNrYm94R3JvdXA8VD4sXG4gICkge1xuICAgIHN1cGVyKGNoZWNrYm94R3JvdXApO1xuICAgIHRoaXMuY2hlY2tlZEljb24gPSAnY2hlY2tfYm94JztcbiAgICB0aGlzLm5vdENoZWNrZWRJY29uID0gJ2NoZWNrX2JveF9vdXRsaW5lX2JsYW5rJztcbiAgfVxufVxuIiwiPGJ1dHRvblxuICBtYXQtYnV0dG9uXG4gIChjbGljayk9XCJvbklucHV0Q2hhbmdlKCRldmVudClcIlxuICB0eXBlPVwiYnV0dG9uXCJcbiAgW2lkXT1cImNoZWNrYm94SWQgfCBhc3luY1wiXG4gIFtjbGFzcy5hamYtY2hlY2tlZF09XCJjaGVja2VkU3RhdGUgfCBhc3luY1wiXG4gIFthdHRyLmFyaWEtY2hlY2tlZF09XCJjaGVja2VkU3RhdGUgfCBhc3luY1wiXG4gIFthdHRyLmFyaWEtZGlzYWJsZWRdPVwiZGlzYWJsZWRTdGF0ZSB8IGFzeW5jXCJcbj5cbiAgPG1hdC1pY29uPnt7IGljb24gfCBhc3luYyB9fTwvbWF0LWljb24+XG4gIDxzcGFuIGNsYXNzPVwiYWpmLWNoZWNrYm94LWdyb3VwLWNvbnRlbnRcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDwvc3Bhbj5cbjwvYnV0dG9uPlxuIl19