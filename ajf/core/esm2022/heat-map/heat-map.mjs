import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, isDevMode, Output, ViewEncapsulation, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/core/echarts";
let heatMapIdx = 0;
export class AjfHeatMap {
    set features(features) {
        this._features = features;
    }
    set startColor(startColor) {
        this._startColor = startColor;
    }
    set endColor(endColor) {
        this._endColor = endColor;
    }
    set highlightColor(highlightColor) {
        this._highlightColor = highlightColor;
    }
    set values(values) {
        this._values = values;
    }
    /**
     * The codo to execute when an element is selected on heatmap.
     * It is inserted into a function, which receives the selected object as input
     */
    set action(action) {
        this._action = action;
    }
    set idProp(idProp) {
        this._idProp = idProp;
    }
    set showVisualMap(showVisualMap) {
        this._showVisualMap = coerceBooleanProperty(showVisualMap);
    }
    get chartOptions() {
        return this._chartOptions;
    }
    constructor(_cdr) {
        this._cdr = _cdr;
        this._startColor = '#ffeb3b';
        this._endColor = '#f44336';
        this._highlightColor = '#009688';
        this._values = 'properties.value';
        this._action = '';
        this._idProp = 'id';
        this._showVisualMap = false;
        this.featureSelected = new EventEmitter();
        this._name = `ajf_heatmap_${heatMapIdx++}`;
    }
    ngOnChanges(_) {
        this._updateChartOptions();
    }
    ngOnDestroy() {
        this.featureSelected.complete();
    }
    onChartInit(event) {
        const { echarts, chart } = event;
        this._echarts = echarts;
        chart.on('selectchanged', params => {
            if (this._features == null) {
                return;
            }
            const { selected } = params;
            if (selected == null || selected.length !== 1) {
                return;
            }
            const { dataIndex, seriesIndex } = selected[0];
            if (seriesIndex !== 0 || dataIndex.length !== 1) {
                return;
            }
            const idx = dataIndex[0];
            if (idx < 0 || idx >= this._features.features.length) {
                return;
            }
            const feature = this._features.features[idx];
            this.featureSelected.emit({ feature });
            if (this._action && this._action.length) {
                try {
                    const actionFunction = new Function('v', this._action);
                    actionFunction({ feature });
                }
                catch (e) {
                    if (isDevMode()) {
                        console.log(e);
                    }
                }
            }
        });
        this._updateChartOptions();
    }
    _updateChartOptions() {
        if (this._echarts == null) {
            return;
        }
        if (this._features == null) {
            this._chartOptions = undefined;
        }
        else {
            this._echarts.registerMap(this._name, this._features);
            this._chartOptions = {
                geo: {
                    map: this._name,
                    itemStyle: {
                        opacity: 0,
                    },
                    nameProperty: this._idProp,
                },
                visualMap: {
                    calculable: false,
                    realtime: false,
                    inRange: {
                        color: [this._startColor, this._endColor],
                    },
                    showLabel: false,
                    show: this._showVisualMap,
                },
                series: this._getChartSeries(),
            };
        }
        this._cdr.detectChanges();
    }
    _getChartSeries() {
        const data = this._getFeaturesData();
        if (data.length === 0) {
            return [];
        }
        return [
            {
                type: 'map',
                map: this._name,
                nameProperty: this._idProp,
                emphasis: {
                    itemStyle: {
                        areaColor: this._highlightColor,
                    },
                    label: {
                        show: false,
                    },
                },
                select: {
                    itemStyle: {
                        color: this._highlightColor,
                    },
                    label: {
                        show: false,
                    },
                },
                selectedMode: 'single',
                data,
            },
        ];
    }
    _getFeaturesData() {
        if (this._features == null) {
            return [];
        }
        const { features } = this._features;
        const values = this._values;
        if (typeof values === 'string') {
        }
        else if (values.length === features.length) {
            return features.map((feature, idx) => {
                const idProp = feature.properties[this._idProp];
                return {
                    name: idProp,
                    value: values[idx],
                };
            });
        }
        return [];
    }
    static { this.ɵfac = function AjfHeatMap_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfHeatMap)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfHeatMap, selectors: [["ajf-heat-map"]], inputs: { features: "features", startColor: "startColor", endColor: "endColor", highlightColor: "highlightColor", values: "values", action: "action", idProp: "idProp", showVisualMap: "showVisualMap" }, outputs: { featureSelected: "featureSelected" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["ajfEcharts", "", 3, "chartInit", "options"]], template: function AjfHeatMap_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵlistener("chartInit", function AjfHeatMap_Template_div_chartInit_0_listener($event) { return ctx.onChartInit($event); });
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("options", ctx.chartOptions);
        } }, dependencies: [i1.AjfEchartsDirective], styles: ["ajf-heat-map{display:block;position:relative}ajf-heat-map [ajfEcharts]{width:100%;height:100%}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfHeatMap, [{
        type: Component,
        args: [{ selector: 'ajf-heat-map', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div ajfEcharts (chartInit)=\"onChartInit($event)\" [options]=\"chartOptions\"></div>\n", styles: ["ajf-heat-map{display:block;position:relative}ajf-heat-map [ajfEcharts]{width:100%;height:100%}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }], { features: [{
            type: Input
        }], startColor: [{
            type: Input
        }], endColor: [{
            type: Input
        }], highlightColor: [{
            type: Input
        }], values: [{
            type: Input
        }], action: [{
            type: Input
        }], idProp: [{
            type: Input
        }], showVisualMap: [{
            type: Input
        }], featureSelected: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfHeatMap, { className: "AjfHeatMap", filePath: "heat-map.ts", lineNumber: 63 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhdC1tYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2hlYXQtbWFwL3NyYy9oZWF0LW1hcC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvaGVhdC1tYXAvc3JjL2hlYXQtbWFwLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUJBLE9BQU8sRUFBZSxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzFFLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsU0FBUyxFQUdULE1BQU0sRUFFTixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7OztBQUd2QixJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7QUF1Qm5CLE1BQU0sT0FBTyxVQUFVO0lBQ3JCLElBQ0ksUUFBUSxDQUFDLFFBQWlEO1FBQzVELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0lBQzVCLENBQUM7SUFHRCxJQUNJLFVBQVUsQ0FBQyxVQUFrQjtRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztJQUNoQyxDQUFDO0lBR0QsSUFDSSxRQUFRLENBQUMsUUFBZ0I7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDNUIsQ0FBQztJQUdELElBQ0ksY0FBYyxDQUFDLGNBQXNCO1FBQ3ZDLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDO0lBQ3hDLENBQUM7SUFHRCxJQUNJLE1BQU0sQ0FBQyxNQUF5QjtRQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUN4QixDQUFDO0lBR0Q7OztPQUdHO0lBQ0gsSUFDSSxNQUFNLENBQUMsTUFBYztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUN4QixDQUFDO0lBR0QsSUFDSSxNQUFNLENBQUMsTUFBYztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFH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RUFBRSxDQUFDO0lBQ1osQ0FBQzsyR0E1TFUsVUFBVTtvRUFBVixVQUFVO1lDOUR2Qiw4QkFBMkU7WUFBM0Qsa0dBQWEsdUJBQW1CLElBQUM7WUFBMEIsaUJBQU07O1lBQS9CLDBDQUF3Qjs7O2lGRDhEN0QsVUFBVTtjQVB0QixTQUFTOzJCQUNFLGNBQWMsbUJBR1AsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTtrREFJakMsUUFBUTtrQkFEWCxLQUFLO1lBT0YsVUFBVTtrQkFEYixLQUFLO1lBT0YsUUFBUTtrQkFEWCxLQUFLO1lBT0YsY0FBYztrQkFEakIsS0FBSztZQU9GLE1BQU07a0JBRFQsS0FBSztZQVdGLE1BQU07a0JBRFQsS0FBSztZQU9GLE1BQU07a0JBRFQsS0FBSztZQU9GLGFBQWE7a0JBRGhCLEtBQUs7WUFPRyxlQUFlO2tCQUR2QixNQUFNOztrRkFyREksVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZFY2hhcnRzSW5pdEV2ZW50LCBFY2hhcnRzTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvZWNoYXJ0cyc7XG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIGlzRGV2TW9kZSxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGZWF0dXJlLCBGZWF0dXJlQ29sbGVjdGlvbiwgR2VvbWV0cnl9IGZyb20gJ2dlb2pzb24nO1xuXG5sZXQgaGVhdE1hcElkeCA9IDA7XG5cbmV4cG9ydCB0eXBlIEFqZkhlYXRNYXBGZWF0dXJlID0gRmVhdHVyZTxHZW9tZXRyeSwge1tuYW1lOiBzdHJpbmddOiBhbnl9PjtcbmV4cG9ydCB0eXBlIEFqZkhlYXRNYXBGZWF0dXJlQ29sbGVjdGlvbiA9IEZlYXR1cmVDb2xsZWN0aW9uPEdlb21ldHJ5LCB7W25hbWU6IHN0cmluZ106IGFueX0+O1xuXG5leHBvcnQgaW50ZXJmYWNlIEFqZkhlYXRNYXBGZWF0dXJlU2VsZWN0ZWQge1xuICBmZWF0dXJlOiBBamZIZWF0TWFwRmVhdHVyZTtcbn1cblxuaW50ZXJmYWNlIFNlbGVjdENoYW5nZWQge1xuICBzZWxlY3RlZDoge1xuICAgIGRhdGFJbmRleDogbnVtYmVyW107XG4gICAgc2VyaWVzSW5kZXg6IG51bWJlcjtcbiAgfVtdO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtaGVhdC1tYXAnLFxuICB0ZW1wbGF0ZVVybDogJ2hlYXQtbWFwLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnaGVhdC1tYXAuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmSGVhdE1hcCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQElucHV0KClcbiAgc2V0IGZlYXR1cmVzKGZlYXR1cmVzOiBBamZIZWF0TWFwRmVhdHVyZUNvbGxlY3Rpb24gfCB1bmRlZmluZWQpIHtcbiAgICB0aGlzLl9mZWF0dXJlcyA9IGZlYXR1cmVzO1xuICB9XG4gIHByaXZhdGUgX2ZlYXR1cmVzPzogQWpmSGVhdE1hcEZlYXR1cmVDb2xsZWN0aW9uO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBzdGFydENvbG9yKHN0YXJ0Q29sb3I6IHN0cmluZykge1xuICAgIHRoaXMuX3N0YXJ0Q29sb3IgPSBzdGFydENvbG9yO1xuICB9XG4gIHByaXZhdGUgX3N0YXJ0Q29sb3IgPSAnI2ZmZWIzYic7XG5cbiAgQElucHV0KClcbiAgc2V0IGVuZENvbG9yKGVuZENvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9lbmRDb2xvciA9IGVuZENvbG9yO1xuICB9XG4gIHByaXZhdGUgX2VuZENvbG9yID0gJyNmNDQzMzYnO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBoaWdobGlnaHRDb2xvcihoaWdobGlnaHRDb2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5faGlnaGxpZ2h0Q29sb3IgPSBoaWdobGlnaHRDb2xvcjtcbiAgfVxuICBwcml2YXRlIF9oaWdobGlnaHRDb2xvciA9ICcjMDA5Njg4JztcblxuICBASW5wdXQoKVxuICBzZXQgdmFsdWVzKHZhbHVlczogc3RyaW5nIHwgbnVtYmVyW10pIHtcbiAgICB0aGlzLl92YWx1ZXMgPSB2YWx1ZXM7XG4gIH1cbiAgcHJpdmF0ZSBfdmFsdWVzOiBzdHJpbmcgfCBudW1iZXJbXSA9ICdwcm9wZXJ0aWVzLnZhbHVlJztcblxuICAvKipcbiAgICogVGhlIGNvZG8gdG8gZXhlY3V0ZSB3aGVuIGFuIGVsZW1lbnQgaXMgc2VsZWN0ZWQgb24gaGVhdG1hcC5cbiAgICogSXQgaXMgaW5zZXJ0ZWQgaW50byBhIGZ1bmN0aW9uLCB3aGljaCByZWNlaXZlcyB0aGUgc2VsZWN0ZWQgb2JqZWN0IGFzIGlucHV0XG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgYWN0aW9uKGFjdGlvbjogc3RyaW5nKSB7XG4gICAgdGhpcy5fYWN0aW9uID0gYWN0aW9uO1xuICB9XG4gIHByaXZhdGUgX2FjdGlvbjogc3RyaW5nID0gJyc7XG5cbiAgQElucHV0KClcbiAgc2V0IGlkUHJvcChpZFByb3A6IHN0cmluZykge1xuICAgIHRoaXMuX2lkUHJvcCA9IGlkUHJvcDtcbiAgfVxuICBwcml2YXRlIF9pZFByb3AgPSAnaWQnO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBzaG93VmlzdWFsTWFwKHNob3dWaXN1YWxNYXA6IEJvb2xlYW5JbnB1dCkge1xuICAgIHRoaXMuX3Nob3dWaXN1YWxNYXAgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoc2hvd1Zpc3VhbE1hcCk7XG4gIH1cbiAgcHJpdmF0ZSBfc2hvd1Zpc3VhbE1hcCA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBmZWF0dXJlU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEFqZkhlYXRNYXBGZWF0dXJlU2VsZWN0ZWQ+KCk7XG5cbiAgZ2V0IGNoYXJ0T3B0aW9ucygpOiBlY2hhcnRzLkVDaGFydHNPcHRpb24gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9jaGFydE9wdGlvbnM7XG4gIH1cbiAgcHJpdmF0ZSBfY2hhcnRPcHRpb25zPzogZWNoYXJ0cy5FQ2hhcnRzT3B0aW9uO1xuICBwcml2YXRlIF9uYW1lID0gYGFqZl9oZWF0bWFwXyR7aGVhdE1hcElkeCsrfWA7XG4gIHByaXZhdGUgX2VjaGFydHM/OiBFY2hhcnRzTW9kdWxlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgbmdPbkNoYW5nZXMoXzogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMuX3VwZGF0ZUNoYXJ0T3B0aW9ucygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5mZWF0dXJlU2VsZWN0ZWQuY29tcGxldGUoKTtcbiAgfVxuXG4gIG9uQ2hhcnRJbml0KGV2ZW50OiBBamZFY2hhcnRzSW5pdEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3Qge2VjaGFydHMsIGNoYXJ0fSA9IGV2ZW50O1xuICAgIHRoaXMuX2VjaGFydHMgPSBlY2hhcnRzO1xuICAgIGNoYXJ0Lm9uKCdzZWxlY3RjaGFuZ2VkJywgcGFyYW1zID0+IHtcbiAgICAgIGlmICh0aGlzLl9mZWF0dXJlcyA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHtzZWxlY3RlZH0gPSBwYXJhbXMgYXMgU2VsZWN0Q2hhbmdlZDtcbiAgICAgIGlmIChzZWxlY3RlZCA9PSBudWxsIHx8IHNlbGVjdGVkLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCB7ZGF0YUluZGV4LCBzZXJpZXNJbmRleH0gPSBzZWxlY3RlZFswXTtcbiAgICAgIGlmIChzZXJpZXNJbmRleCAhPT0gMCB8fCBkYXRhSW5kZXgubGVuZ3RoICE9PSAxKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGlkeCA9IGRhdGFJbmRleFswXTtcbiAgICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl9mZWF0dXJlcy5mZWF0dXJlcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgZmVhdHVyZSA9IHRoaXMuX2ZlYXR1cmVzLmZlYXR1cmVzW2lkeF07XG4gICAgICB0aGlzLmZlYXR1cmVTZWxlY3RlZC5lbWl0KHtmZWF0dXJlfSk7XG4gICAgICBpZiAodGhpcy5fYWN0aW9uICYmIHRoaXMuX2FjdGlvbi5sZW5ndGgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBhY3Rpb25GdW5jdGlvbiA9IG5ldyBGdW5jdGlvbigndicsIHRoaXMuX2FjdGlvbik7XG4gICAgICAgICAgYWN0aW9uRnVuY3Rpb24oe2ZlYXR1cmV9KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fdXBkYXRlQ2hhcnRPcHRpb25zKCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVDaGFydE9wdGlvbnMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2VjaGFydHMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZmVhdHVyZXMgPT0gbnVsbCkge1xuICAgICAgdGhpcy5fY2hhcnRPcHRpb25zID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9lY2hhcnRzLnJlZ2lzdGVyTWFwKHRoaXMuX25hbWUsIHRoaXMuX2ZlYXR1cmVzIGFzIGFueSk7XG4gICAgICB0aGlzLl9jaGFydE9wdGlvbnMgPSB7XG4gICAgICAgIGdlbzoge1xuICAgICAgICAgIG1hcDogdGhpcy5fbmFtZSxcbiAgICAgICAgICBpdGVtU3R5bGU6IHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBuYW1lUHJvcGVydHk6IHRoaXMuX2lkUHJvcCxcbiAgICAgICAgfSxcbiAgICAgICAgdmlzdWFsTWFwOiB7XG4gICAgICAgICAgY2FsY3VsYWJsZTogZmFsc2UsXG4gICAgICAgICAgcmVhbHRpbWU6IGZhbHNlLFxuICAgICAgICAgIGluUmFuZ2U6IHtcbiAgICAgICAgICAgIGNvbG9yOiBbdGhpcy5fc3RhcnRDb2xvciwgdGhpcy5fZW5kQ29sb3JdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc2hvd0xhYmVsOiBmYWxzZSxcbiAgICAgICAgICBzaG93OiB0aGlzLl9zaG93VmlzdWFsTWFwLFxuICAgICAgICB9LFxuICAgICAgICBzZXJpZXM6IHRoaXMuX2dldENoYXJ0U2VyaWVzKCksXG4gICAgICB9O1xuICAgIH1cbiAgICB0aGlzLl9jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Q2hhcnRTZXJpZXMoKTogZWNoYXJ0cy5NYXBTZXJpZXNPcHRpb25bXSB7XG4gICAgY29uc3QgZGF0YSA9IHRoaXMuX2dldEZlYXR1cmVzRGF0YSgpO1xuICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICByZXR1cm4gW1xuICAgICAge1xuICAgICAgICB0eXBlOiAnbWFwJyxcbiAgICAgICAgbWFwOiB0aGlzLl9uYW1lLFxuICAgICAgICBuYW1lUHJvcGVydHk6IHRoaXMuX2lkUHJvcCxcbiAgICAgICAgZW1waGFzaXM6IHtcbiAgICAgICAgICBpdGVtU3R5bGU6IHtcbiAgICAgICAgICAgIGFyZWFDb2xvcjogdGhpcy5faGlnaGxpZ2h0Q29sb3IsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgc2hvdzogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgaXRlbVN0eWxlOiB7XG4gICAgICAgICAgICBjb2xvcjogdGhpcy5faGlnaGxpZ2h0Q29sb3IsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgc2hvdzogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0ZWRNb2RlOiAnc2luZ2xlJyxcbiAgICAgICAgZGF0YSxcbiAgICAgIH0sXG4gICAgXTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEZlYXR1cmVzRGF0YSgpOiB7bmFtZTogc3RyaW5nOyB2YWx1ZTogbnVtYmVyfVtdIHtcbiAgICBpZiAodGhpcy5fZmVhdHVyZXMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBjb25zdCB7ZmVhdHVyZXN9ID0gdGhpcy5fZmVhdHVyZXM7XG4gICAgY29uc3QgdmFsdWVzID0gdGhpcy5fdmFsdWVzO1xuICAgIGlmICh0eXBlb2YgdmFsdWVzID09PSAnc3RyaW5nJykge1xuICAgIH0gZWxzZSBpZiAodmFsdWVzLmxlbmd0aCA9PT0gZmVhdHVyZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmVhdHVyZXMubWFwKChmZWF0dXJlLCBpZHgpID0+IHtcbiAgICAgICAgY29uc3QgaWRQcm9wID0gZmVhdHVyZS5wcm9wZXJ0aWVzW3RoaXMuX2lkUHJvcF0gYXMgc3RyaW5nO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5hbWU6IGlkUHJvcCxcbiAgICAgICAgICB2YWx1ZTogdmFsdWVzW2lkeF0sXG4gICAgICAgIH0gYXMgYW55O1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxufVxuIiwiPGRpdiBhamZFY2hhcnRzIChjaGFydEluaXQpPVwib25DaGFydEluaXQoJGV2ZW50KVwiIFtvcHRpb25zXT1cImNoYXJ0T3B0aW9uc1wiPjwvZGl2PlxuIl19