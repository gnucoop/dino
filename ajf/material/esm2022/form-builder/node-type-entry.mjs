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
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/material/node-icon";
import * as i2 from "@angular/common";
function AjfFbNodeTypeEntry_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "ajf-node-icon", 1);
    i0.ɵɵelementStart(2, "span", 2);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("node", ctx_r0.node);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.nodeType.label);
} }
export class AjfFbNodeTypeEntry {
    get nodeType() {
        return this._nodeType;
    }
    set nodeType(nodeType) {
        this._nodeType = nodeType;
        this._cdr.markForCheck();
    }
    get node() {
        return { nodeType: this.nodeType?.nodeType.node, fieldType: this.nodeType?.nodeType.field };
    }
    constructor(_cdr) {
        this._cdr = _cdr;
    }
    static { this.ɵfac = function AjfFbNodeTypeEntry_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFbNodeTypeEntry)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFbNodeTypeEntry, selectors: [["ajf-fb-node-type-entry"]], inputs: { nodeType: "nodeType" }, decls: 1, vars: 1, consts: [[4, "ngIf"], [3, "node"], [1, "ajf-node-type-label"]], template: function AjfFbNodeTypeEntry_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfFbNodeTypeEntry_ng_container_0_Template, 4, 2, "ng-container", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.nodeType);
        } }, dependencies: [i1.AjfNodeIcon, i2.NgIf], styles: ["ajf-fb-node-type-entry{display:flex;align-items:center;gap:11px;padding:7px 8px;margin-bottom:2px;border-radius:8px;font-size:13.5px;cursor:pointer}ajf-fb-node-type-entry ajf-node-icon{display:inline-flex;align-items:center;justify-content:center;flex:none;width:30px;height:30px;border-radius:7px;background:color-mix(in srgb,currentColor 12%,transparent)}ajf-fb-node-type-entry .ajf-node-type-label{min-width:0;line-height:1.25}ajf-fb-node-type-entry mat-icon{vertical-align:middle;font-size:18px;width:18px;height:18px}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFbNodeTypeEntry, [{
        type: Component,
        args: [{ selector: 'ajf-fb-node-type-entry', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"nodeType\">\n  <ajf-node-icon [node]=\"node\"></ajf-node-icon><span class=\"ajf-node-type-label\">{{nodeType.label}}</span>\n</ng-container>\n", styles: ["ajf-fb-node-type-entry{display:flex;align-items:center;gap:11px;padding:7px 8px;margin-bottom:2px;border-radius:8px;font-size:13.5px;cursor:pointer}ajf-fb-node-type-entry ajf-node-icon{display:inline-flex;align-items:center;justify-content:center;flex:none;width:30px;height:30px;border-radius:7px;background:color-mix(in srgb,currentColor 12%,transparent)}ajf-fb-node-type-entry .ajf-node-type-label{min-width:0;line-height:1.25}ajf-fb-node-type-entry mat-icon{vertical-align:middle;font-size:18px;width:18px;height:18px}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }], { nodeType: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFbNodeTypeEntry, { className: "AjfFbNodeTypeEntry", filePath: "node-type-entry.ts", lineNumber: 40 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS10eXBlLWVudHJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL3NyYy9ub2RlLXR5cGUtZW50cnkudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvc3JjL25vZGUtdHlwZS1lbnRyeS5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULEtBQUssRUFDTCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7Ozs7O0lDNUJ2Qiw2QkFBK0I7SUFDN0IsbUNBQTZDO0lBQUEsK0JBQWtDO0lBQUEsWUFBa0I7SUFBQSxpQkFBTzs7OztJQUF6RixjQUFhO0lBQWIsa0NBQWE7SUFBbUQsZUFBa0I7SUFBbEIsMkNBQWtCOztBRHNDbkcsTUFBTSxPQUFPLGtCQUFrQjtJQUU3QixJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQ0ksUUFBUSxDQUFDLFFBQWlEO1FBQzVELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUNELElBQUksSUFBSTtRQUNOLE9BQU8sRUFBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUMsQ0FBQztJQUM1RixDQUFDO0lBRUQsWUFBb0IsSUFBdUI7UUFBdkIsU0FBSSxHQUFKLElBQUksQ0FBbUI7SUFBRyxDQUFDO21IQWRwQyxrQkFBa0I7b0VBQWxCLGtCQUFrQjtZQ3ZDL0IscUZBQStCOztZQUFoQixtQ0FBYzs7O2lGRHVDaEIsa0JBQWtCO2NBUDlCLFNBQVM7MkJBQ0Usd0JBQXdCLGlCQUduQixpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNO2tEQVEzQyxRQUFRO2tCQURYLEtBQUs7O2tGQUxLLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5fSBmcm9tICcuL2Zvcm0tYnVpbGRlci1zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWZiLW5vZGUtdHlwZS1lbnRyeScsXG4gIHRlbXBsYXRlVXJsOiAnbm9kZS10eXBlLWVudHJ5Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbm9kZS10eXBlLWVudHJ5LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZiTm9kZVR5cGVFbnRyeSB7XG4gIHByaXZhdGUgX25vZGVUeXBlOiBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnkgfCB1bmRlZmluZWQ7XG4gIGdldCBub2RlVHlwZSgpOiBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnkgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9ub2RlVHlwZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgbm9kZVR5cGUobm9kZVR5cGU6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeSB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuX25vZGVUeXBlID0gbm9kZVR5cGU7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG4gIGdldCBub2RlKCk6IGFueSB7XG4gICAgcmV0dXJuIHtub2RlVHlwZTogdGhpcy5ub2RlVHlwZT8ubm9kZVR5cGUubm9kZSwgZmllbGRUeXBlOiB0aGlzLm5vZGVUeXBlPy5ub2RlVHlwZS5maWVsZH07XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmKSB7fVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cIm5vZGVUeXBlXCI+XG4gIDxhamYtbm9kZS1pY29uIFtub2RlXT1cIm5vZGVcIj48L2FqZi1ub2RlLWljb24+PHNwYW4gY2xhc3M9XCJhamYtbm9kZS10eXBlLWxhYmVsXCI+e3tub2RlVHlwZS5sYWJlbH19PC9zcGFuPlxuPC9uZy1jb250YWluZXI+XG4iXX0=