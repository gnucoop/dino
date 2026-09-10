import { AfterViewInit, ElementRef, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import * as i0 from "@angular/core";
interface ChartWidgetInstance {
    canvasDataUrl?(): string;
}
export declare class AjfChartComponent implements AfterViewInit, OnChanges {
    private _el;
    private _renderer;
    data?: ChartData;
    options?: ChartOptions;
    chartType?: ChartType;
    instance?: ChartWidgetInstance;
    /**
     * When specified, this number of different single data entries will be displayed as separate
     * options/bars/slices in the chart. The rest will be displayed as an aggregate "other" option/bar/slice.
     */
    set mainDataNumberThreshold(mainDataNumberThreshold: number | undefined);
    private _mainDataNumberThreshold;
    /**
     * If true remove zero values from the chart dataset
     */
    set removeZeroValues(removeZeroValues: boolean | undefined);
    private _removeZeroValues;
    private _chart;
    private _chartCanvasElement;
    constructor(_el: ElementRef, _renderer: Renderer2);
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private _fixData;
    /**
     * Rebuilds datasets by aggregating options and omitting the unselected ones.
     * @param data The original chartData with datasets
     * @returns The chartData with rebuilt datasets
     */
    private _rebuildDatasets;
    private _updateChart;
    private _rebuildChart;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfChartComponent, "ajf-chart", never, { "data": { "alias": "data"; "required": false; }; "options": { "alias": "options"; "required": false; }; "chartType": { "alias": "chartType"; "required": false; }; "instance": { "alias": "instance"; "required": false; }; "mainDataNumberThreshold": { "alias": "mainDataNumberThreshold"; "required": false; }; "removeZeroValues": { "alias": "removeZeroValues"; "required": false; }; }, {}, never, never, false, never>;
}
export {};
//# sourceMappingURL=chart.d.ts.map