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
import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * It returns all visible columns of form table.
 *
 * @export
 * @class AjfTableVisibleColumnsPipe
 */
// TODO helpful? currently not used
export class AjfTableVisibleColumnsPipe {
    transform(instance) {
        if (!instance.node.editable) {
            const val = instance.value || [];
            return instance.hideEmptyRows
                ? val
                    .filter(col => col[1].reduce((prev, cur) => {
                    return prev || (cur != null && cur !== '' && cur !== 0 && cur !== '0');
                }, false))
                    .map(v => [v[0], ...v[1]])
                : val.map(v => [v[0], ...v[1]]);
        }
        return (instance.controls || []).map(v => [
            v[0],
            ...v[1],
        ]);
    }
    static { this.ɵfac = function AjfTableVisibleColumnsPipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfTableVisibleColumnsPipe)(); }; }
    static { this.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ajfTableVisibleColumns", type: AjfTableVisibleColumnsPipe, pure: true }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfTableVisibleColumnsPipe, [{
        type: Pipe,
        args: [{ name: 'ajfTableVisibleColumns' }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtdmlzaWJsZS1jb2x1bW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvdGFibGUtdmlzaWJsZS1jb2x1bW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDOztBQUlsRDs7Ozs7R0FLRztBQUNILG1DQUFtQztBQUVuQyxNQUFNLE9BQU8sMEJBQTBCO0lBQ3JDLFNBQVMsQ0FBQyxRQUErQjtRQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUM1QixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUNqQyxPQUFPLFFBQVEsQ0FBQyxhQUFhO2dCQUMzQixDQUFDLENBQUMsR0FBRztxQkFDQSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FDWixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBYSxFQUFFLEdBQUcsRUFBRSxFQUFFO29CQUNuQyxPQUFPLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRyxLQUFLLEVBQUUsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDekUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUNWO3FCQUNBLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFDRCxPQUFPLENBQUUsUUFBUSxDQUFDLFFBQXlELElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDMUYsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNKLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNSLENBQUMsQ0FBQztJQUNMLENBQUM7MkhBbEJVLDBCQUEwQjtnR0FBMUIsMEJBQTBCOztpRkFBMUIsMEJBQTBCO2NBRHRDLElBQUk7ZUFBQyxFQUFDLElBQUksRUFBRSx3QkFBd0IsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QWpmVGFibGVGaWVsZEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL3RhYmxlLWZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7QWpmVGFibGVGb3JtQ29udHJvbH0gZnJvbSAnLi9pbnRlcmZhY2UvZm9ybXMvdGFibGUtZm9ybS1jb250cm9sJztcblxuLyoqXG4gKiBJdCByZXR1cm5zIGFsbCB2aXNpYmxlIGNvbHVtbnMgb2YgZm9ybSB0YWJsZS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgQWpmVGFibGVWaXNpYmxlQ29sdW1uc1BpcGVcbiAqL1xuLy8gVE9ETyBoZWxwZnVsPyBjdXJyZW50bHkgbm90IHVzZWRcbkBQaXBlKHtuYW1lOiAnYWpmVGFibGVWaXNpYmxlQ29sdW1ucyd9KVxuZXhwb3J0IGNsYXNzIEFqZlRhYmxlVmlzaWJsZUNvbHVtbnNQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShpbnN0YW5jZTogQWpmVGFibGVGaWVsZEluc3RhbmNlKTogKHN0cmluZyB8IG51bWJlciB8IEFqZlRhYmxlRm9ybUNvbnRyb2wpW11bXSB7XG4gICAgaWYgKCFpbnN0YW5jZS5ub2RlLmVkaXRhYmxlKSB7XG4gICAgICBjb25zdCB2YWwgPSBpbnN0YW5jZS52YWx1ZSB8fCBbXTtcbiAgICAgIHJldHVybiBpbnN0YW5jZS5oaWRlRW1wdHlSb3dzXG4gICAgICAgID8gdmFsXG4gICAgICAgICAgICAuZmlsdGVyKGNvbCA9PlxuICAgICAgICAgICAgICBjb2xbMV0ucmVkdWNlKChwcmV2OiBib29sZWFuLCBjdXIpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJldiB8fCAoY3VyICE9IG51bGwgJiYgY3VyICE9PSAnJyAmJiBjdXIgIT09IDAgJiYgY3VyICE9PSAnMCcpO1xuICAgICAgICAgICAgICB9LCBmYWxzZSksXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAubWFwKHYgPT4gW3ZbMF0sIC4uLnZbMV1dKVxuICAgICAgICA6IHZhbC5tYXAodiA9PiBbdlswXSwgLi4udlsxXV0pO1xuICAgIH1cbiAgICByZXR1cm4gKChpbnN0YW5jZS5jb250cm9scyBhcyBbc3RyaW5nLCAoc3RyaW5nIHwgQWpmVGFibGVGb3JtQ29udHJvbClbXV1bXSkgfHwgW10pLm1hcCh2ID0+IFtcbiAgICAgIHZbMF0sXG4gICAgICAuLi52WzFdLFxuICAgIF0pO1xuICB9XG59XG4iXX0=