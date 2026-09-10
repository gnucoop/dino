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
import { AjfEchartsInitEvent } from '@ajf/core/echarts';
import { BooleanInput } from '@angular/cdk/coercion';
import { ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Feature, FeatureCollection, Geometry } from 'geojson';
import * as i0 from "@angular/core";
export type AjfHeatMapFeature = Feature<Geometry, {
    [name: string]: any;
}>;
export type AjfHeatMapFeatureCollection = FeatureCollection<Geometry, {
    [name: string]: any;
}>;
export interface AjfHeatMapFeatureSelected {
    feature: AjfHeatMapFeature;
}
export declare class AjfHeatMap implements OnChanges, OnDestroy {
    private _cdr;
    set features(features: AjfHeatMapFeatureCollection | undefined);
    private _features?;
    set startColor(startColor: string);
    private _startColor;
    set endColor(endColor: string);
    private _endColor;
    set highlightColor(highlightColor: string);
    private _highlightColor;
    set values(values: string | number[]);
    private _values;
    /**
     * The codo to execute when an element is selected on heatmap.
     * It is inserted into a function, which receives the selected object as input
     */
    set action(action: string);
    private _action;
    set idProp(idProp: string);
    private _idProp;
    set showVisualMap(showVisualMap: BooleanInput);
    private _showVisualMap;
    readonly featureSelected: EventEmitter<AjfHeatMapFeatureSelected>;
    get chartOptions(): echarts.EChartsOption | undefined;
    private _chartOptions?;
    private _name;
    private _echarts?;
    constructor(_cdr: ChangeDetectorRef);
    ngOnChanges(_: SimpleChanges): void;
    ngOnDestroy(): void;
    onChartInit(event: AjfEchartsInitEvent): void;
    private _updateChartOptions;
    private _getChartSeries;
    private _getFeaturesData;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfHeatMap, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfHeatMap, "ajf-heat-map", never, { "features": { "alias": "features"; "required": false; }; "startColor": { "alias": "startColor"; "required": false; }; "endColor": { "alias": "endColor"; "required": false; }; "highlightColor": { "alias": "highlightColor"; "required": false; }; "values": { "alias": "values"; "required": false; }; "action": { "alias": "action"; "required": false; }; "idProp": { "alias": "idProp"; "required": false; }; "showVisualMap": { "alias": "showVisualMap"; "required": false; }; }, { "featureSelected": "featureSelected"; }, never, never, false, never>;
}
//# sourceMappingURL=heat-map.d.ts.map