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
import { NgModule } from '@angular/core';
import { AjfCalendarEntryLabelPipe } from './calendar-entry-label';
import { AjfCalendarService } from './calendar-service';
import * as i0 from "@angular/core";
export class AjfCalendarModule {
    static { this.ɵfac = function AjfCalendarModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfCalendarModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfCalendarModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({}); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfCalendarModule, [{
        type: NgModule,
        args: [{
                declarations: [AjfCalendarEntryLabelPipe],
                exports: [AjfCalendarEntryLabelPipe],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AjfCalendarModule, { declarations: [AjfCalendarEntryLabelPipe], exports: [AjfCalendarEntryLabelPipe] }); })();
export class AjfGregorianCalendarModule {
    static { this.ɵfac = function AjfGregorianCalendarModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfGregorianCalendarModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfGregorianCalendarModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [AjfCalendarService] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfGregorianCalendarModule, [{
        type: NgModule,
        args: [{
                providers: [AjfCalendarService],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9jYWxlbmRhci9zcmMvY2FsZW5kYXItbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFdkMsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDakUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7O0FBTXRELE1BQU0sT0FBTyxpQkFBaUI7a0hBQWpCLGlCQUFpQjttRUFBakIsaUJBQWlCOzs7aUZBQWpCLGlCQUFpQjtjQUo3QixRQUFRO2VBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMseUJBQXlCLENBQUM7Z0JBQ3pDLE9BQU8sRUFBRSxDQUFDLHlCQUF5QixDQUFDO2FBQ3JDOzt3RkFDWSxpQkFBaUIsbUJBSGIseUJBQXlCLGFBQzlCLHlCQUF5QjtBQU9yQyxNQUFNLE9BQU8sMEJBQTBCOzJIQUExQiwwQkFBMEI7bUVBQTFCLDBCQUEwQjt3RUFGMUIsQ0FBQyxrQkFBa0IsQ0FBQzs7aUZBRXBCLDBCQUEwQjtjQUh0QyxRQUFRO2VBQUM7Z0JBQ1IsU0FBUyxFQUFFLENBQUMsa0JBQWtCLENBQUM7YUFDaEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZkNhbGVuZGFyRW50cnlMYWJlbFBpcGV9IGZyb20gJy4vY2FsZW5kYXItZW50cnktbGFiZWwnO1xuaW1wb3J0IHtBamZDYWxlbmRhclNlcnZpY2V9IGZyb20gJy4vY2FsZW5kYXItc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0FqZkNhbGVuZGFyRW50cnlMYWJlbFBpcGVdLFxuICBleHBvcnRzOiBbQWpmQ2FsZW5kYXJFbnRyeUxhYmVsUGlwZV0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZkNhbGVuZGFyTW9kdWxlIHt9XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW0FqZkNhbGVuZGFyU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZkdyZWdvcmlhbkNhbGVuZGFyTW9kdWxlIHt9XG4iXX0=