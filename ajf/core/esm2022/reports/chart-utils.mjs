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
import { AjfChartType } from './interface/charts/chart-type';
export function chartToChartJsType(chartType) {
    switch (chartType) {
        case AjfChartType.Line:
            return 'line';
        case AjfChartType.Bar:
            return 'bar';
        case AjfChartType.HorizontalBar:
            return 'horizontalBar';
        case AjfChartType.Radar:
            return 'radar';
        case AjfChartType.Scatter:
            return 'scatter';
        case AjfChartType.Doughnut:
            return 'doughnut';
        case AjfChartType.Pie:
            return 'pie';
        case AjfChartType.PolarArea:
            return 'polarArea';
        case AjfChartType.Bubble:
            return 'bubble';
        default:
            return 'line';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQtdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3JlcG9ydHMvc3JjL2NoYXJ0LXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUczRCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsU0FBd0I7SUFDekQsUUFBUSxTQUFTLEVBQUUsQ0FBQztRQUNsQixLQUFLLFlBQVksQ0FBQyxJQUFJO1lBQ3BCLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLEtBQUssWUFBWSxDQUFDLEdBQUc7WUFDbkIsT0FBTyxLQUFLLENBQUM7UUFDZixLQUFLLFlBQVksQ0FBQyxhQUFhO1lBQzdCLE9BQU8sZUFBZSxDQUFDO1FBQ3pCLEtBQUssWUFBWSxDQUFDLEtBQUs7WUFDckIsT0FBTyxPQUFPLENBQUM7UUFDakIsS0FBSyxZQUFZLENBQUMsT0FBTztZQUN2QixPQUFPLFNBQVMsQ0FBQztRQUNuQixLQUFLLFlBQVksQ0FBQyxRQUFRO1lBQ3hCLE9BQU8sVUFBVSxDQUFDO1FBQ3BCLEtBQUssWUFBWSxDQUFDLEdBQUc7WUFDbkIsT0FBTyxLQUFLLENBQUM7UUFDZixLQUFLLFlBQVksQ0FBQyxTQUFTO1lBQ3pCLE9BQU8sV0FBVyxDQUFDO1FBQ3JCLEtBQUssWUFBWSxDQUFDLE1BQU07WUFDdEIsT0FBTyxRQUFRLENBQUM7UUFDbEI7WUFDRSxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDaGFydFR5cGV9IGZyb20gJy4vaW50ZXJmYWNlL2NoYXJ0cy9jaGFydC10eXBlJztcbmltcG9ydCB7Q2hhcnRUeXBlfSBmcm9tICdjaGFydC5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGFydFRvQ2hhcnRKc1R5cGUoY2hhcnRUeXBlPzogQWpmQ2hhcnRUeXBlKTogQ2hhcnRUeXBlIHtcbiAgc3dpdGNoIChjaGFydFR5cGUpIHtcbiAgICBjYXNlIEFqZkNoYXJ0VHlwZS5MaW5lOlxuICAgICAgcmV0dXJuICdsaW5lJztcbiAgICBjYXNlIEFqZkNoYXJ0VHlwZS5CYXI6XG4gICAgICByZXR1cm4gJ2Jhcic7XG4gICAgY2FzZSBBamZDaGFydFR5cGUuSG9yaXpvbnRhbEJhcjpcbiAgICAgIHJldHVybiAnaG9yaXpvbnRhbEJhcic7XG4gICAgY2FzZSBBamZDaGFydFR5cGUuUmFkYXI6XG4gICAgICByZXR1cm4gJ3JhZGFyJztcbiAgICBjYXNlIEFqZkNoYXJ0VHlwZS5TY2F0dGVyOlxuICAgICAgcmV0dXJuICdzY2F0dGVyJztcbiAgICBjYXNlIEFqZkNoYXJ0VHlwZS5Eb3VnaG51dDpcbiAgICAgIHJldHVybiAnZG91Z2hudXQnO1xuICAgIGNhc2UgQWpmQ2hhcnRUeXBlLlBpZTpcbiAgICAgIHJldHVybiAncGllJztcbiAgICBjYXNlIEFqZkNoYXJ0VHlwZS5Qb2xhckFyZWE6XG4gICAgICByZXR1cm4gJ3BvbGFyQXJlYSc7XG4gICAgY2FzZSBBamZDaGFydFR5cGUuQnViYmxlOlxuICAgICAgcmV0dXJuICdidWJibGUnO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gJ2xpbmUnO1xuICB9XG59XG4iXX0=