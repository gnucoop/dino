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
import { ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AjfEchartsProvider } from './echarts-config';
import * as i0 from "@angular/core";
export type EChartsRenderer = 'canvas' | 'svg';
export interface AjfEchartsInitEvent {
    echarts: any;
    chart: echarts.ECharts;
}
export declare class AjfEchartsDirective implements OnChanges, OnDestroy, OnInit {
    private _echartsProvider;
    private _ngZone;
    set theme(theme: string | object | undefined);
    private _theme?;
    set renderer(renderer: EChartsRenderer);
    private _renderer;
    set options(options: echarts.EChartsOption | undefined);
    private _options?;
    readonly chartInit: EventEmitter<AjfEchartsInitEvent>;
    private _echarts?;
    private _container;
    private _chart?;
    private _resizeObserver?;
    private _resizeEvent;
    private _resizeSub;
    constructor(_echartsProvider: AjfEchartsProvider, el: ElementRef<HTMLElement>, _ngZone: NgZone);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngOnInit(): void;
    private _destroyChart;
    private _initChart;
    private _onResize;
    private _resizeChart;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfEchartsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AjfEchartsDirective, "[ajfEcharts]", ["ajfEcharts"], { "theme": { "alias": "theme"; "required": false; }; "renderer": { "alias": "renderer"; "required": false; }; "options": { "alias": "options"; "required": false; }; }, { "chartInit": "chartInit"; }, never, never, false, never>;
}
//# sourceMappingURL=echarts-directive.d.ts.map