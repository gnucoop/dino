import { deepCopy } from '@ajf/core/utils';
import * as i0 from '@angular/core';
import { ViewEncapsulation, ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { Chart } from 'chart.js';

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
class AjfChartComponent {
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
class AjfChartModule {
    static { this.ɵfac = function AjfChartModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfChartModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfChartModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({}); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfChartModule, [{
        type: NgModule,
        args: [{
                declarations: [AjfChartComponent],
                exports: [AjfChartComponent],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AjfChartModule, { declarations: [AjfChartComponent], exports: [AjfChartComponent] }); })();

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

/**
 * Generated bundle index. Do not edit.
 */

export { AjfChartComponent, AjfChartModule };
//# sourceMappingURL=ajf-core-chart.mjs.map
