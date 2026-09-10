import * as i0 from '@angular/core';
import { InjectionToken, EventEmitter, Directive, Inject, Output, Input, NgModule } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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
const AJF_ECHARTS_PROVIDER = new InjectionToken('AJF_ECHARTS_PROVIDER');

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
/// <reference types="resize-observer-browser" />
class AjfEchartsDirective {
    set theme(theme) {
        this._theme = theme;
    }
    set renderer(renderer) {
        this._renderer = renderer;
    }
    set options(options) {
        this._options = options;
    }
    constructor(_echartsProvider, el, _ngZone) {
        this._echartsProvider = _echartsProvider;
        this._ngZone = _ngZone;
        this._renderer = 'canvas';
        this.chartInit = new EventEmitter();
        this._resizeEvent = new EventEmitter();
        this._resizeSub = Subscription.EMPTY;
        this._container = el.nativeElement;
        if (typeof ResizeObserver !== 'undefined') {
            this._resizeObserver = new ResizeObserver(() => this._onResize());
        }
    }
    ngOnChanges(changes) {
        if (changes['theme'] != null || changes['renderer'] != null) {
            this._destroyChart();
            this._initChart();
        }
        else if (changes['options'] != null) {
            if (this._options) {
                if (this._chart != null) {
                    this._chart.setOption(this._options);
                }
                else {
                    this._initChart();
                }
            }
            else {
                this._destroyChart();
            }
        }
    }
    ngOnDestroy() {
        if (this._resizeObserver != null) {
            this._resizeObserver.unobserve(this._container);
            this._resizeObserver.disconnect();
        }
        this._resizeEvent.complete();
        this._resizeSub.unsubscribe();
        this._destroyChart();
    }
    ngOnInit() {
        if (this._resizeObserver != null) {
            this._resizeObserver.observe(this._container);
            this._resizeSub = this._resizeEvent
                .pipe(debounceTime(200))
                .subscribe(() => this._resizeChart());
        }
        this._ngZone.runOutsideAngular(() => {
            this._echartsProvider().then(echarts => {
                this._echarts = echarts;
                this._initChart();
            });
        });
    }
    _destroyChart() {
        if (this._chart != null && !this._chart.isDisposed()) {
            this._chart.dispose();
            this._chart = undefined;
        }
    }
    _initChart() {
        if (this._echarts == null) {
            return;
        }
        this._chart = this._echarts.init(this._container, this._theme, { renderer: this._renderer });
        if (this._chart == null) {
            return;
        }
        if (this._options) {
            this._chart.setOption(this._options);
        }
        this.chartInit.emit({ echarts: this._echarts, chart: this._chart });
    }
    _onResize() {
        this._resizeEvent.emit();
    }
    _resizeChart() {
        if (this._chart != null) {
            this._chart.resize();
        }
    }
    static { this.ɵfac = function AjfEchartsDirective_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfEchartsDirective)(i0.ɵɵdirectiveInject(AJF_ECHARTS_PROVIDER), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.NgZone)); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AjfEchartsDirective, selectors: [["", "ajfEcharts", ""]], inputs: { theme: "theme", renderer: "renderer", options: "options" }, outputs: { chartInit: "chartInit" }, exportAs: ["ajfEcharts"], features: [i0.ɵɵNgOnChangesFeature] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfEchartsDirective, [{
        type: Directive,
        args: [{ selector: '[ajfEcharts]', exportAs: 'ajfEcharts' }]
    }], () => [{ type: undefined, decorators: [{
                type: Inject,
                args: [AJF_ECHARTS_PROVIDER]
            }] }, { type: i0.ElementRef }, { type: i0.NgZone }], { theme: [{
            type: Input
        }], renderer: [{
            type: Input
        }], options: [{
            type: Input
        }], chartInit: [{
            type: Output
        }] }); })();

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
class AjfEchartsModule {
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

export { AJF_ECHARTS_PROVIDER, AjfEchartsDirective, AjfEchartsModule };
//# sourceMappingURL=ajf-core-echarts.mjs.map
