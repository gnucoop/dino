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
import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class AjfReportRenderer {
    get instance() {
        return this._instance;
    }
    set instance(instance) {
        this._instance = instance;
        this._report = instance != null ? instance.report : null;
        this._cdr.markForCheck();
    }
    get report() {
        return this._report;
    }
    get enableExport() {
        return this._enableExport;
    }
    constructor(_cdr) {
        this._cdr = _cdr;
        this.enableExportAll = false;
        this._report = null;
        this._enableExport = true;
    }
    ngAfterViewInit() {
        this._enableExport =
            this.enableExportAll &&
                this._instance != null &&
                this._instance.content &&
                this._instance.content.content
                ? true
                : false;
        this._cdr.markForCheck();
    }
    static { this.ɵfac = function AjfReportRenderer_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfReportRenderer)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AjfReportRenderer, inputs: { instance: "instance", enableExportAll: "enableExportAll" } }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfReportRenderer, [{
        type: Directive
    }], () => [{ type: i0.ChangeDetectorRef }], { instance: [{
            type: Input
        }], enableExportAll: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9yZXBvcnRzL3NyYy9yZXBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFtQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQU1qRixNQUFNLE9BQWdCLGlCQUFpQjtJQUVyQyxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQ0ksUUFBUSxDQUFDLFFBQXVDO1FBQ2xELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3pELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUtELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBR0QsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7SUFFRCxZQUFvQixJQUF1QjtRQUF2QixTQUFJLEdBQUosSUFBSSxDQUFtQjtRQVpsQyxvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUVsQyxZQUFPLEdBQXFCLElBQUksQ0FBQztRQUtqQyxrQkFBYSxHQUFZLElBQUksQ0FBQztJQUtRLENBQUM7SUFFL0MsZUFBZTtRQUNiLElBQUksQ0FBQyxhQUFhO1lBQ2hCLElBQUksQ0FBQyxlQUFlO2dCQUNwQixJQUFJLENBQUMsU0FBUyxJQUFJLElBQUk7Z0JBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTztnQkFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTztnQkFDNUIsQ0FBQyxDQUFDLElBQUk7Z0JBQ04sQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0IsQ0FBQztrSEFuQ21CLGlCQUFpQjtvRUFBakIsaUJBQWlCOztpRkFBakIsaUJBQWlCO2NBRHRDLFNBQVM7a0RBT0osUUFBUTtrQkFEWCxLQUFLO1lBT0csZUFBZTtrQkFBdkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmUmVwb3J0SW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL3JlcG9ydHMtaW5zdGFuY2VzL3JlcG9ydC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlJlcG9ydH0gZnJvbSAnLi9pbnRlcmZhY2UvcmVwb3J0cy9yZXBvcnQnO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZSZXBvcnRSZW5kZXJlciBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBwcml2YXRlIF9pbnN0YW5jZTogQWpmUmVwb3J0SW5zdGFuY2UgfCB1bmRlZmluZWQ7XG4gIGdldCBpbnN0YW5jZSgpOiBBamZSZXBvcnRJbnN0YW5jZSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBpbnN0YW5jZShpbnN0YW5jZTogQWpmUmVwb3J0SW5zdGFuY2UgfCB1bmRlZmluZWQpIHtcbiAgICB0aGlzLl9pbnN0YW5jZSA9IGluc3RhbmNlO1xuICAgIHRoaXMuX3JlcG9ydCA9IGluc3RhbmNlICE9IG51bGwgPyBpbnN0YW5jZS5yZXBvcnQgOiBudWxsO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIEBJbnB1dCgpIGVuYWJsZUV4cG9ydEFsbDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX3JlcG9ydDogQWpmUmVwb3J0IHwgbnVsbCA9IG51bGw7XG4gIGdldCByZXBvcnQoKTogQWpmUmVwb3J0IHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcG9ydDtcbiAgfVxuXG4gIHByaXZhdGUgX2VuYWJsZUV4cG9ydDogYm9vbGVhbiA9IHRydWU7XG4gIGdldCBlbmFibGVFeHBvcnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2VuYWJsZUV4cG9ydDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VuYWJsZUV4cG9ydCA9XG4gICAgICB0aGlzLmVuYWJsZUV4cG9ydEFsbCAmJlxuICAgICAgdGhpcy5faW5zdGFuY2UgIT0gbnVsbCAmJlxuICAgICAgdGhpcy5faW5zdGFuY2UuY29udGVudCAmJlxuICAgICAgdGhpcy5faW5zdGFuY2UuY29udGVudC5jb250ZW50XG4gICAgICAgID8gdHJ1ZVxuICAgICAgICA6IGZhbHNlO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuIl19