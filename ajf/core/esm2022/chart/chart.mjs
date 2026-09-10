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
import { deepCopy } from '@ajf/core/utils';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, } from '@angular/core';
import { Chart } from 'chart.js';
import * as i0 from "@angular/core";
export class AjfChartComponent {
    /**
     * When specified, this number of different single data entries will be displayed as separate
     * options/bars/slices in the chart. The rest will be displayed as an aggregate "other" option/bar/slice.
     */
    set mainDataNumberThreshold(mainDataNumberThreshold) {
        this._mainDataNumberThreshold =
            mainDataNumberThreshold || mainDataNumberThreshold === 0 ? mainDataNumberThreshold : 10;
    }
    /**
     * If true remove zero values from the chart dataset
     */
    set removeZeroValues(removeZeroValues) {
        this._removeZeroValues = Boolean(removeZeroValues);
    }
    constructor(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this._mainDataNumberThreshold = 10;
        this._removeZeroValues = false;
        this._chart = null;
        this._chartCanvasElement = null;
    }
    ngAfterViewInit() {
        this._rebuildChart();
    }
    ngOnChanges(changes) {
        if ('chartType' in changes) {
            this._rebuildChart();
        }
        else if ('options' in changes || 'data' in changes) {
            this._updateChart();
        }
        if ('instance' in changes && this.instance != null) {
            this.instance.canvasDataUrl = () => {
                if (this._chartCanvasElement == null) {
                    return '';
                }
                return this._chartCanvasElement.toDataURL();
            };
        }
    }
    _fixData(data) {
        const newData = deepCopy(data);
        let maxPointsNum = 0;
        (newData.datasets || []).forEach(dataset => {
            if (dataset.label == null) {
                dataset.label = '';
            }
            maxPointsNum = Math.max(maxPointsNum, (dataset.data || []).length);
        });
        const labels = newData.labels || [];
        if (maxPointsNum > 0 && labels.length < maxPointsNum) {
            for (let i = labels.length; i < maxPointsNum; i++) {
                labels.push('');
            }
            newData.labels = labels;
        }
        if (newData.datasets &&
            this.chartType &&
            ['bar', 'horizontalBar', 'doughnut', 'pie'].includes(this.chartType)) {
            return this._rebuildDatasets(newData);
        }
        return newData;
    }
    /**
     * Rebuilds datasets by aggregating options and omitting the unselected ones.
     * @param data The original chartData with datasets
     * @returns The chartData with rebuilt datasets
     */
    _rebuildDatasets(data) {
        const datasets = data.datasets;
        if (!datasets || !datasets.length)
            return data;
        if (datasets.length === 1 && datasets[0].data && datasets[0].data.length > 1) {
            // pie, doughnut
            let rebuiltDatasets = datasets[0].data.map((value, idx) => {
                const label = data.labels && data.labels[idx] ? data.labels[idx] : '';
                return { value: value, label };
            });
            if (this._mainDataNumberThreshold && this._mainDataNumberThreshold > 0) {
                const sortedDatasets = [...rebuiltDatasets].sort((a, b) => {
                    if (a.value != null && b.value != null) {
                        return +b.value - +a.value;
                    }
                    return 0;
                });
                const datasetsOverThreshold = sortedDatasets.splice(0, this._mainDataNumberThreshold);
                const otherDataset = { ...sortedDatasets[0] };
                if (sortedDatasets.length && otherDataset.value) {
                    const otherDatasetsTotal = sortedDatasets
                        .map(sd => sd.value)
                        .reduce((total, num) => {
                        if (total != null && num != null) {
                            return +total + +num;
                        }
                        return 0;
                    });
                    otherDataset.value = otherDatasetsTotal;
                    otherDataset.label = 'Other';
                    rebuiltDatasets = [...datasetsOverThreshold, otherDataset];
                }
                else {
                    rebuiltDatasets = [...datasetsOverThreshold];
                }
            }
            if (this._removeZeroValues) {
                rebuiltDatasets = rebuiltDatasets.filter(ds => ds.value);
            }
            const newDataset = [{ ...datasets[0], data: rebuiltDatasets.map(d => d.value) }];
            return { ...data, labels: rebuiltDatasets.map(d => d.label), datasets: newDataset };
        }
        else {
            // bar, horizontalBar
            let rebuiltDatasets = [...datasets];
            if (this._mainDataNumberThreshold && this._mainDataNumberThreshold > 0) {
                const sortedDatasets = [...rebuiltDatasets].sort((a, b) => {
                    if (a.data && b.data && a.data[0] != null && b.data[0] != null) {
                        return +b.data[0] - +a.data[0];
                    }
                    return 0;
                });
                const datasetsOverThreshold = sortedDatasets.splice(0, this._mainDataNumberThreshold);
                const otherDataset = { ...sortedDatasets[0] };
                if (sortedDatasets.length && otherDataset.data) {
                    const otherDatasetsTotal = sortedDatasets
                        .map(sd => sd.data && sd.data[0])
                        .reduce((total, num) => {
                        if (total != null && num != null) {
                            return +total + +num;
                        }
                        return 0;
                    });
                    otherDataset.data[0] = otherDatasetsTotal;
                    otherDataset.label = 'Other';
                    rebuiltDatasets = [...datasetsOverThreshold, otherDataset];
                }
                else {
                    rebuiltDatasets = [...datasetsOverThreshold];
                }
            }
            if (this._removeZeroValues) {
                rebuiltDatasets = rebuiltDatasets.filter(ds => ds.data);
            }
            return { ...data, datasets: rebuiltDatasets };
        }
    }
    _updateChart() {
        if (this._chart == null) {
            this._rebuildChart();
        }
        else {
            this._chart.options = {
                ...deepCopy(this._chart.options),
                ...deepCopy(this.options || {}),
            };
            this._chart.data = {
                ...deepCopy(this._chart.data),
                ...deepCopy(this.data),
            };
            this._chart.update();
        }
    }
    _rebuildChart() {
        if (this._chart != null) {
            this._chart.destroy();
            this._chart = null;
        }
        if (this._chartCanvasElement != null) {
            this._chartCanvasElement.remove();
            this._chartCanvasElement = null;
        }
        if (this.data != null) {
            this._chartCanvasElement = this._renderer.createElement('canvas');
            const widgetExportElement = this._el.nativeElement.parentElement.parentElement;
            const height = widgetExportElement.clientHeight;
            const width = widgetExportElement.clientWidth;
            if (widgetExportElement != null) {
                if (height > 0) {
                    this._renderer.setStyle(this._el.nativeElement, 'height', `${height}px`);
                    this._renderer.setStyle(this._chartCanvasElement, 'height', `${height}px`);
                }
                if (width > 0) {
                    this._renderer.setStyle(this._chartCanvasElement, 'width', width);
                }
            }
            else {
                this._renderer.setStyle(this._chartCanvasElement, 'width', 'inherit');
                this._renderer.setStyle(this._chartCanvasElement, 'height', 'inherit');
            }
            this._renderer.appendChild(this._el.nativeElement, this._chartCanvasElement);
            if (this.chartType != null) {
                const ctx = this._chartCanvasElement.getContext('2d');
                this._chart = new Chart(ctx, {
                    type: this.chartType,
                    data: this._fixData(this.data),
                    options: this.options,
                });
            }
        }
    }
    static { this.ɵfac = function AjfChartComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfChartComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfChartComponent, selectors: [["ajf-chart"]], inputs: { data: "data", options: "options", chartType: "chartType", instance: "instance", mainDataNumberThreshold: "mainDataNumberThreshold", removeZeroValues: "removeZeroValues" }, features: [i0.ɵɵNgOnChangesFeature], decls: 0, vars: 0, template: function AjfChartComponent_Template(rf, ctx) { }, styles: ["ajf-chart{display:block;width:inherit;height:inherit;position:relative}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfChartComponent, [{
        type: Component,
        args: [{ selector: 'ajf-chart', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "", styles: ["ajf-chart{display:block;width:inherit;height:inherit;position:relative}\n"] }]
    }], () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], { data: [{
            type: Input
        }], options: [{
            type: Input
        }], chartType: [{
            type: Input
        }], instance: [{
            type: Input
        }], mainDataNumberThreshold: [{
            type: Input
        }], removeZeroValues: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfChartComponent, { className: "AjfChartComponent", filePath: "chart.ts", lineNumber: 51 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2NoYXJ0L3NyYy9jaGFydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBRVQsS0FBSyxFQUlMLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsS0FBSyxFQUFxQyxNQUFNLFVBQVUsQ0FBQzs7QUFlbkUsTUFBTSxPQUFPLGlCQUFpQjtJQU01Qjs7O09BR0c7SUFDSCxJQUNJLHVCQUF1QixDQUFDLHVCQUEyQztRQUNyRSxJQUFJLENBQUMsd0JBQXdCO1lBQzNCLHVCQUF1QixJQUFJLHVCQUF1QixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUM1RixDQUFDO0lBR0Q7O09BRUc7SUFDSCxJQUNJLGdCQUFnQixDQUFDLGdCQUFxQztRQUN4RCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDckQsQ0FBQztJQU1ELFlBQW9CLEdBQWUsRUFBVSxTQUFvQjtRQUE3QyxRQUFHLEdBQUgsR0FBRyxDQUFZO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztRQWR6RCw2QkFBd0IsR0FBVyxFQUFFLENBQUM7UUFTdEMsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBRW5DLFdBQU0sR0FBaUIsSUFBSSxDQUFDO1FBQzVCLHdCQUFtQixHQUE2QixJQUFJLENBQUM7SUFFTyxDQUFDO0lBRXJFLGVBQWU7UUFDYixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLFdBQVcsSUFB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Szs7a0ZBcEJLLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIFJlbmRlcmVyMixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0NoYXJ0LCBDaGFydERhdGEsIENoYXJ0T3B0aW9ucywgQ2hhcnRUeXBlfSBmcm9tICdjaGFydC5qcyc7XG5cbi8vIFdlIG9ubHkgbmVlZCB0byBzZXQgY2FudmFzRGF0YVVybCBvZiB0aGUgQWpmQ2hhcnRXaWRnZXRJbnN0YW5jZSBoZXJlLFxuLy8gYXZvaWQgaW1wb3J0aW5nIHRoZSBhY3R1YWwgaW50ZXJmYWNlIGJlY2F1c2Ugb2YgdGhlIGNpcmN1bGFyIGRlcGVuZGVuY3k6XG5pbnRlcmZhY2UgQ2hhcnRXaWRnZXRJbnN0YW5jZSB7XG4gIGNhbnZhc0RhdGFVcmw/KCk6IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWNoYXJ0JyxcbiAgdGVtcGxhdGVVcmw6ICdjaGFydC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2NoYXJ0LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkNoYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgZGF0YT86IENoYXJ0RGF0YTtcbiAgQElucHV0KCkgb3B0aW9ucz86IENoYXJ0T3B0aW9ucztcbiAgQElucHV0KCkgY2hhcnRUeXBlPzogQ2hhcnRUeXBlO1xuICBASW5wdXQoKSBpbnN0YW5jZT86IENoYXJ0V2lkZ2V0SW5zdGFuY2U7XG5cbiAgLyoqXG4gICAqIFdoZW4gc3BlY2lmaWVkLCB0aGlzIG51bWJlciBvZiBkaWZmZXJlbnQgc2luZ2xlIGRhdGEgZW50cmllcyB3aWxsIGJlIGRpc3BsYXllZCBhcyBzZXBhcmF0ZVxuICAgKiBvcHRpb25zL2JhcnMvc2xpY2VzIGluIHRoZSBjaGFydC4gVGhlIHJlc3Qgd2lsbCBiZSBkaXNwbGF5ZWQgYXMgYW4gYWdncmVnYXRlIFwib3RoZXJcIiBvcHRpb24vYmFyL3NsaWNlLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IG1haW5EYXRhTnVtYmVyVGhyZXNob2xkKG1haW5EYXRhTnVtYmVyVGhyZXNob2xkOiBudW1iZXIgfCB1bmRlZmluZWQpIHtcbiAgICB0aGlzLl9tYWluRGF0YU51bWJlclRocmVzaG9sZCA9XG4gICAgICBtYWluRGF0YU51bWJlclRocmVzaG9sZCB8fCBtYWluRGF0YU51bWJlclRocmVzaG9sZCA9PT0gMCA/IG1haW5EYXRhTnVtYmVyVGhyZXNob2xkIDogMTA7XG4gIH1cbiAgcHJpdmF0ZSBfbWFpbkRhdGFOdW1iZXJUaHJlc2hvbGQ6IG51bWJlciA9IDEwO1xuXG4gIC8qKlxuICAgKiBJZiB0cnVlIHJlbW92ZSB6ZXJvIHZhbHVlcyBmcm9tIHRoZSBjaGFydCBkYXRhc2V0XG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgcmVtb3ZlWmVyb1ZhbHVlcyhyZW1vdmVaZXJvVmFsdWVzOiBib29sZWFuIHwgdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5fcmVtb3ZlWmVyb1ZhbHVlcyA9IEJvb2xlYW4ocmVtb3ZlWmVyb1ZhbHVlcyk7XG4gIH1cbiAgcHJpdmF0ZSBfcmVtb3ZlWmVyb1ZhbHVlczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX2NoYXJ0OiBDaGFydCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9jaGFydENhbnZhc0VsZW1lbnQ6IEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3JlYnVpbGRDaGFydCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmICgnY2hhcnRUeXBlJyBpbiBjaGFuZ2VzKSB7XG4gICAgICB0aGlzLl9yZWJ1aWxkQ2hhcnQoKTtcbiAgICB9IGVsc2UgaWYgKCdvcHRpb25zJyBpbiBjaGFuZ2VzIHx8ICdkYXRhJyBpbiBjaGFuZ2VzKSB7XG4gICAgICB0aGlzLl91cGRhdGVDaGFydCgpO1xuICAgIH1cbiAgICBpZiAoJ2luc3RhbmNlJyBpbiBjaGFuZ2VzICYmIHRoaXMuaW5zdGFuY2UgIT0gbnVsbCkge1xuICAgICAgdGhpcy5pbnN0YW5jZS5jYW52YXNEYXRhVXJsID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fY2hhcnRDYW52YXNFbGVtZW50ID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudC50b0RhdGFVUkwoKTtcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZml4RGF0YShkYXRhOiBDaGFydERhdGEpOiBDaGFydERhdGEge1xuICAgIGNvbnN0IG5ld0RhdGE6IENoYXJ0RGF0YSA9IGRlZXBDb3B5KGRhdGEpO1xuICAgIGxldCBtYXhQb2ludHNOdW0gPSAwO1xuICAgIChuZXdEYXRhLmRhdGFzZXRzIHx8IFtdKS5mb3JFYWNoKGRhdGFzZXQgPT4ge1xuICAgICAgaWYgKGRhdGFzZXQubGFiZWwgPT0gbnVsbCkge1xuICAgICAgICBkYXRhc2V0LmxhYmVsID0gJyc7XG4gICAgICB9XG4gICAgICBtYXhQb2ludHNOdW0gPSBNYXRoLm1heChtYXhQb2ludHNOdW0sIChkYXRhc2V0LmRhdGEgfHwgW10pLmxlbmd0aCk7XG4gICAgfSk7XG4gICAgY29uc3QgbGFiZWxzID0gbmV3RGF0YS5sYWJlbHMgfHwgW107XG4gICAgaWYgKG1heFBvaW50c051bSA+IDAgJiYgbGFiZWxzLmxlbmd0aCA8IG1heFBvaW50c051bSkge1xuICAgICAgZm9yIChsZXQgaSA9IGxhYmVscy5sZW5ndGg7IGkgPCBtYXhQb2ludHNOdW07IGkrKykge1xuICAgICAgICBsYWJlbHMucHVzaCgnJyk7XG4gICAgICB9XG4gICAgICBuZXdEYXRhLmxhYmVscyA9IGxhYmVscztcbiAgICB9XG4gICAgaWYgKFxuICAgICAgbmV3RGF0YS5kYXRhc2V0cyAmJlxuICAgICAgdGhpcy5jaGFydFR5cGUgJiZcbiAgICAgIFsnYmFyJywgJ2hvcml6b250YWxCYXInLCAnZG91Z2hudXQnLCAncGllJ10uaW5jbHVkZXModGhpcy5jaGFydFR5cGUpXG4gICAgKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVidWlsZERhdGFzZXRzKG5ld0RhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3RGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWJ1aWxkcyBkYXRhc2V0cyBieSBhZ2dyZWdhdGluZyBvcHRpb25zIGFuZCBvbWl0dGluZyB0aGUgdW5zZWxlY3RlZCBvbmVzLlxuICAgKiBAcGFyYW0gZGF0YSBUaGUgb3JpZ2luYWwgY2hhcnREYXRhIHdpdGggZGF0YXNldHNcbiAgICogQHJldHVybnMgVGhlIGNoYXJ0RGF0YSB3aXRoIHJlYnVpbHQgZGF0YXNldHNcbiAgICovXG4gIHByaXZhdGUgX3JlYnVpbGREYXRhc2V0cyhkYXRhOiBDaGFydERhdGEpOiBDaGFydERhdGEge1xuICAgIGNvbnN0IGRhdGFzZXRzID0gZGF0YS5kYXRhc2V0cztcbiAgICBpZiAoIWRhdGFzZXRzIHx8ICFkYXRhc2V0cy5sZW5ndGgpIHJldHVybiBkYXRhO1xuICAgIGlmIChkYXRhc2V0cy5sZW5ndGggPT09IDEgJiYgZGF0YXNldHNbMF0uZGF0YSAmJiBkYXRhc2V0c1swXS5kYXRhLmxlbmd0aCA+IDEpIHtcbiAgICAgIC8vIHBpZSwgZG91Z2hudXRcbiAgICAgIGxldCByZWJ1aWx0RGF0YXNldHMgPSBkYXRhc2V0c1swXS5kYXRhLm1hcCgodmFsdWUsIGlkeCkgPT4ge1xuICAgICAgICBjb25zdCBsYWJlbCA9IGRhdGEubGFiZWxzICYmIGRhdGEubGFiZWxzW2lkeF0gPyAoZGF0YS5sYWJlbHNbaWR4XSBhcyBzdHJpbmcpIDogJyc7XG4gICAgICAgIHJldHVybiB7dmFsdWU6IHZhbHVlIGFzIG51bWJlciwgbGFiZWx9O1xuICAgICAgfSk7XG5cbiAgICAgIGlmICh0aGlzLl9tYWluRGF0YU51bWJlclRocmVzaG9sZCAmJiB0aGlzLl9tYWluRGF0YU51bWJlclRocmVzaG9sZCA+IDApIHtcbiAgICAgICAgY29uc3Qgc29ydGVkRGF0YXNldHMgPSBbLi4ucmVidWlsdERhdGFzZXRzXS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgaWYgKGEudmFsdWUgIT0gbnVsbCAmJiBiLnZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiArYi52YWx1ZSAtICthLnZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGRhdGFzZXRzT3ZlclRocmVzaG9sZCA9IHNvcnRlZERhdGFzZXRzLnNwbGljZSgwLCB0aGlzLl9tYWluRGF0YU51bWJlclRocmVzaG9sZCk7XG4gICAgICAgIGNvbnN0IG90aGVyRGF0YXNldCA9IHsuLi5zb3J0ZWREYXRhc2V0c1swXX07XG4gICAgICAgIGlmIChzb3J0ZWREYXRhc2V0cy5sZW5ndGggJiYgb3RoZXJEYXRhc2V0LnZhbHVlKSB7XG4gICAgICAgICAgY29uc3Qgb3RoZXJEYXRhc2V0c1RvdGFsID0gc29ydGVkRGF0YXNldHNcbiAgICAgICAgICAgIC5tYXAoc2QgPT4gc2QudmFsdWUpXG4gICAgICAgICAgICAucmVkdWNlKCh0b3RhbCwgbnVtKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0b3RhbCAhPSBudWxsICYmIG51bSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICt0b3RhbCArICtudW07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICBvdGhlckRhdGFzZXQudmFsdWUgPSBvdGhlckRhdGFzZXRzVG90YWw7XG4gICAgICAgICAgb3RoZXJEYXRhc2V0LmxhYmVsID0gJ090aGVyJztcbiAgICAgICAgICByZWJ1aWx0RGF0YXNldHMgPSBbLi4uZGF0YXNldHNPdmVyVGhyZXNob2xkLCBvdGhlckRhdGFzZXRdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlYnVpbHREYXRhc2V0cyA9IFsuLi5kYXRhc2V0c092ZXJUaHJlc2hvbGRdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fcmVtb3ZlWmVyb1ZhbHVlcykge1xuICAgICAgICByZWJ1aWx0RGF0YXNldHMgPSByZWJ1aWx0RGF0YXNldHMuZmlsdGVyKGRzID0+IGRzLnZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5ld0RhdGFzZXQgPSBbey4uLmRhdGFzZXRzWzBdLCBkYXRhOiByZWJ1aWx0RGF0YXNldHMubWFwKGQgPT4gZC52YWx1ZSl9XTtcbiAgICAgIHJldHVybiB7Li4uZGF0YSwgbGFiZWxzOiByZWJ1aWx0RGF0YXNldHMubWFwKGQgPT4gZC5sYWJlbCksIGRhdGFzZXRzOiBuZXdEYXRhc2V0fTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYmFyLCBob3Jpem9udGFsQmFyXG4gICAgICBsZXQgcmVidWlsdERhdGFzZXRzID0gWy4uLmRhdGFzZXRzXTtcbiAgICAgIGlmICh0aGlzLl9tYWluRGF0YU51bWJlclRocmVzaG9sZCAmJiB0aGlzLl9tYWluRGF0YU51bWJlclRocmVzaG9sZCA+IDApIHtcbiAgICAgICAgY29uc3Qgc29ydGVkRGF0YXNldHMgPSBbLi4ucmVidWlsdERhdGFzZXRzXS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgaWYgKGEuZGF0YSAmJiBiLmRhdGEgJiYgYS5kYXRhWzBdICE9IG51bGwgJiYgYi5kYXRhWzBdICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiArYi5kYXRhWzBdIC0gK2EuZGF0YVswXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBkYXRhc2V0c092ZXJUaHJlc2hvbGQgPSBzb3J0ZWREYXRhc2V0cy5zcGxpY2UoMCwgdGhpcy5fbWFpbkRhdGFOdW1iZXJUaHJlc2hvbGQpO1xuICAgICAgICBjb25zdCBvdGhlckRhdGFzZXQgPSB7Li4uc29ydGVkRGF0YXNldHNbMF19O1xuICAgICAgICBpZiAoc29ydGVkRGF0YXNldHMubGVuZ3RoICYmIG90aGVyRGF0YXNldC5kYXRhKSB7XG4gICAgICAgICAgY29uc3Qgb3RoZXJEYXRhc2V0c1RvdGFsID0gc29ydGVkRGF0YXNldHNcbiAgICAgICAgICAgIC5tYXAoc2QgPT4gc2QuZGF0YSAmJiBzZC5kYXRhWzBdKVxuICAgICAgICAgICAgLnJlZHVjZSgodG90YWwsIG51bSkgPT4ge1xuICAgICAgICAgICAgICBpZiAodG90YWwgIT0gbnVsbCAmJiBudW0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiArdG90YWwgKyArbnVtO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgb3RoZXJEYXRhc2V0LmRhdGFbMF0gPSBvdGhlckRhdGFzZXRzVG90YWw7XG4gICAgICAgICAgb3RoZXJEYXRhc2V0LmxhYmVsID0gJ090aGVyJztcbiAgICAgICAgICByZWJ1aWx0RGF0YXNldHMgPSBbLi4uZGF0YXNldHNPdmVyVGhyZXNob2xkLCBvdGhlckRhdGFzZXRdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlYnVpbHREYXRhc2V0cyA9IFsuLi5kYXRhc2V0c092ZXJUaHJlc2hvbGRdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fcmVtb3ZlWmVyb1ZhbHVlcykge1xuICAgICAgICByZWJ1aWx0RGF0YXNldHMgPSByZWJ1aWx0RGF0YXNldHMuZmlsdGVyKGRzID0+IGRzLmRhdGEpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsuLi5kYXRhLCBkYXRhc2V0czogcmVidWlsdERhdGFzZXRzfTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVDaGFydCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY2hhcnQgPT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVidWlsZENoYXJ0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICg8YW55PnRoaXMuX2NoYXJ0KS5vcHRpb25zID0ge1xuICAgICAgICAuLi5kZWVwQ29weSgoPGFueT50aGlzLl9jaGFydCkub3B0aW9ucyksXG4gICAgICAgIC4uLmRlZXBDb3B5KHRoaXMub3B0aW9ucyB8fCB7fSksXG4gICAgICB9O1xuICAgICAgdGhpcy5fY2hhcnQuZGF0YSA9IHtcbiAgICAgICAgLi4uZGVlcENvcHkodGhpcy5fY2hhcnQuZGF0YSksXG4gICAgICAgIC4uLmRlZXBDb3B5KHRoaXMuZGF0YSksXG4gICAgICB9O1xuICAgICAgdGhpcy5fY2hhcnQudXBkYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmVidWlsZENoYXJ0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jaGFydCAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9jaGFydC5kZXN0cm95KCk7XG4gICAgICB0aGlzLl9jaGFydCA9IG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fY2hhcnRDYW52YXNFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgdGhpcy5fY2hhcnRDYW52YXNFbGVtZW50ID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0YSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgIGNvbnN0IHdpZGdldEV4cG9ydEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICBjb25zdCBoZWlnaHQgPSB3aWRnZXRFeHBvcnRFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICAgIGNvbnN0IHdpZHRoID0gd2lkZ2V0RXhwb3J0RWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICAgIGlmICh3aWRnZXRFeHBvcnRFbGVtZW50ICE9IG51bGwpIHtcbiAgICAgICAgaWYgKGhlaWdodCA+IDApIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgYCR7aGVpZ2h0fXB4YCk7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fY2hhcnRDYW52YXNFbGVtZW50LCAnaGVpZ2h0JywgYCR7aGVpZ2h0fXB4YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpZHRoID4gMCkge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCwgJ3dpZHRoJywgd2lkdGgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQsICd3aWR0aCcsICdpbmhlcml0Jyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCwgJ2hlaWdodCcsICdpbmhlcml0Jyk7XG4gICAgICB9XG4gICAgICB0aGlzLl9yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCB0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQpO1xuICAgICAgaWYgKHRoaXMuY2hhcnRUeXBlICE9IG51bGwpIHtcbiAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5fY2hhcnRDYW52YXNFbGVtZW50IS5nZXRDb250ZXh0KCcyZCcpIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgICAgICAgdGhpcy5fY2hhcnQgPSBuZXcgQ2hhcnQoY3R4LCB7XG4gICAgICAgICAgdHlwZTogdGhpcy5jaGFydFR5cGUsXG4gICAgICAgICAgZGF0YTogdGhpcy5fZml4RGF0YSh0aGlzLmRhdGEpLFxuICAgICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=