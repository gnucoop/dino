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
import { AJF_ECHARTS_PROVIDER } from './echarts-config';
import { AjfEchartsDirective } from './echarts-directive';
import * as i0 from "@angular/core";
export class AjfEchartsModule {
    static forRoot(config) {
        let echarts = config.echarts;
        if (typeof echarts !== 'function') {
            echarts = (async () => echarts);
        }
        return {
            ngModule: AjfEchartsModule,
            providers: [{ provide: AJF_ECHARTS_PROVIDER, useValue: echarts }],
        };
    }
    static { this.ɵfac = function AjfEchartsModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfEchartsModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfEchartsModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({}); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfEchartsModule, [{
        type: NgModule,
        args: [{
                declarations: [AjfEchartsDirective],
                exports: [AjfEchartsDirective],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AjfEchartsModule, { declarations: [AjfEchartsDirective], exports: [AjfEchartsDirective] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNoYXJ0cy1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2VjaGFydHMvc3JjL2VjaGFydHMtbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTVELE9BQU8sRUFBdUMsb0JBQW9CLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUM1RixPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQzs7QUFNeEQsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQXdCO1FBQ3JDLElBQUksT0FBTyxHQUE2QixNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ3ZELElBQUksT0FBTyxPQUFPLEtBQUssVUFBVSxFQUFFLENBQUM7WUFDbEMsT0FBTyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQXVCLENBQUM7UUFDeEQsQ0FBQztRQUNELE9BQU87WUFDTCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUMsQ0FBQztTQUNoRSxDQUFDO0lBQ0osQ0FBQztpSEFWVSxnQkFBZ0I7bUVBQWhCLGdCQUFnQjs7O2lGQUFoQixnQkFBZ0I7Y0FKNUIsUUFBUTtlQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLG1CQUFtQixDQUFDO2dCQUNuQyxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQzthQUMvQjs7d0ZBQ1ksZ0JBQWdCLG1CQUhaLG1CQUFtQixhQUN4QixtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZkVjaGFydHNDb25maWcsIEFqZkVjaGFydHNQcm92aWRlciwgQUpGX0VDSEFSVFNfUFJPVklERVJ9IGZyb20gJy4vZWNoYXJ0cy1jb25maWcnO1xuaW1wb3J0IHtBamZFY2hhcnRzRGlyZWN0aXZlfSBmcm9tICcuL2VjaGFydHMtZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbQWpmRWNoYXJ0c0RpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtBamZFY2hhcnRzRGlyZWN0aXZlXSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmRWNoYXJ0c01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogQWpmRWNoYXJ0c0NvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8QWpmRWNoYXJ0c01vZHVsZT4ge1xuICAgIGxldCBlY2hhcnRzOiBhbnkgfCBBamZFY2hhcnRzUHJvdmlkZXIgPSBjb25maWcuZWNoYXJ0cztcbiAgICBpZiAodHlwZW9mIGVjaGFydHMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGVjaGFydHMgPSAoYXN5bmMgKCkgPT4gZWNoYXJ0cykgYXMgQWpmRWNoYXJ0c1Byb3ZpZGVyO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEFqZkVjaGFydHNNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFt7cHJvdmlkZTogQUpGX0VDSEFSVFNfUFJPVklERVIsIHVzZVZhbHVlOiBlY2hhcnRzfV0sXG4gICAgfTtcbiAgfVxufVxuIl19