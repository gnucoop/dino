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
import { evaluateExpression } from '@ajf/core/models';
import { deepCopy } from '@ajf/core/utils';
import { chartToChartJsType } from '../../chart-utils';
import { evaluateAggregation } from '../aggregation/evaluate-aggregation';
import { isChartWidget } from '../widgets/is-chart-widget';
import { isDialogWidget } from '../widgets/is-dialog-widget';
import { isDynamicTableWidget } from '../widgets/is-dynamic-table-widget';
import { isFormulaWidget } from '../widgets/is-formula-widget';
import { isGraphWidget } from '../widgets/is-graph-widget';
import { isHeatMapWidget } from '../widgets/is-heat-map-widget';
import { isImageContainerWidget } from '../widgets/is-image-container-widget';
import { isImageWidget } from '../widgets/is-image-widget';
import { isMapWidget } from '../widgets/is-map-widget';
import { isPaginatedListWidget } from '../widgets/is-paginated-list-widget';
import { isPaginatedTableWidget } from '../widgets/is-paginated-table-widget';
import { isWidgetWithContent } from '../widgets/is-widget-with-content';
import { isTableWidget } from '../widgets/is-table-widget';
import { isTextWidget } from '../widgets/is-text-widget';
import { componentsMap } from '../widgets/widgets-map';
import { isChartWidgetInstance } from '../widgets-instances/is-chart-widget-instance';
import { isDialogWidgetInstance } from '../widgets-instances/is-dialog-widget-instance';
import { isDynamicTableWidgetInstance } from '../widgets-instances/is-dynamic-table-widget-instance';
import { isFormulaWidgetInstance } from '../widgets-instances/is-formula-widget-instance';
import { isGraphWidgetInstance } from '../widgets-instances/is-graph-widget-instance';
import { isHeatMapWidgetInstance } from '../widgets-instances/is-heat-map-widget-instance';
import { isImageContainerWidgetInstance } from '../widgets-instances/is-image-container-widget-instance';
import { isImageWidgetInstance } from '../widgets-instances/is-image-widget-instance';
import { isMapWidgetInstance } from '../widgets-instances/is-map-widget-instance';
import { isPaginatedListWidgetInstance } from '../widgets-instances/is-paginated-list-widget-instance';
import { isPaginatedTableWidgetInstance } from './is-paginated-table-widget-instance';
import { isTableWidgetInstance } from '../widgets-instances/is-table-widget-instance';
import { isTextWidgetInstance } from '../widgets-instances/is-text-widget-instance';
import { isWidgetWithContentInstance } from '../widgets-instances/is-widget-with-content-instance';
import { createWidgetInstance } from './create-widget-instance';
import { evalAndTranslate, evaluateHtmlText } from './widget-instance-utils';
import { isDevMode } from '@angular/core';
export function widgetToWidgetInstance(widget, context, ts, variables = []) {
    const wi = createWidgetInstance(widget, context, ts, variables);
    if (isWidgetWithContent(widget) && isWidgetWithContentInstance(wi)) {
        let content = [];
        widget.content.forEach(c => {
            if (widget.repetitions != null) {
                wi.repetitions = evaluateExpression(widget.repetitions.formula, context);
                if (typeof wi.repetitions === 'number' && wi.repetitions > 0) {
                    for (let i = 0; i < wi.repetitions; i++) {
                        content.push(widgetToWidgetInstance(c, { ...context, '$repetition': i }, ts, variables));
                    }
                }
            }
            else {
                content.push(widgetToWidgetInstance(c, context, ts, variables));
            }
            wi.content = content;
        });
        if (isDialogWidget(widget) && isDialogWidgetInstance(wi)) {
            wi.toggle = widgetToWidgetInstance(widget.toggle, context, ts, variables);
        }
    }
    else if (isChartWidget(widget) && isChartWidgetInstance(wi)) {
        if (widget.options == null) {
            widget.options = {};
        }
        const labels = widget.labels instanceof Array ? widget.labels : [widget.labels];
        const evLabels = labels.map(l => {
            let evf = evaluateExpression(l.formula, context);
            try {
                if (evf instanceof Array) {
                    evf = evf.map(v => v != null && typeof v === 'string' && v.trim().length > 0 ? ts.translate(v) : v);
                }
                else {
                    evf =
                        evf != null && typeof evf === 'string' && evf.trim().length > 0
                            ? ts.translate(evf)
                            : evf;
                }
            }
            catch (e) {
                if (isDevMode()) {
                    console.log(e);
                }
            }
            return evf;
        });
        wi.labels = widget.labels instanceof Array ? evLabels : evLabels[0];
        wi.datasets = widget.dataset.map(d => {
            let ds = {
                ...(d.options || {}),
                data: evaluateAggregation(d.aggregation, d.formula, context),
            };
            if (d.chartType != null) {
                const ct = chartToChartJsType(d.chartType);
                ds = { ...ds, chartType: ct, type: ct };
            }
            if (d.options != null) {
                ds = { ...ds, options: d.options };
            }
            if (d.label != null) {
                ds = { ...ds, label: d.label.trim().length > 0 ? ts.translate(d.label) : d.label };
            }
            if (d.datalabels != null) {
                ds.datalabels = deepCopy(d.datalabels);
            }
            return ds;
        });
        wi.data = { labels: wi.labels, datasets: wi.datasets };
        wi.chartType = chartToChartJsType(widget.type || widget.chartType);
        wi.exportable =
            widget.exportable && (widget.exportable === true || widget.exportable === 'true')
                ? true
                : false;
        wi.mainDataNumberThreshold = widget.mainDataNumberThreshold;
        wi.removeZeroValues = widget.removeZeroValues;
        if (widget.options != null && widget.options.plugins != null) {
            const plugins = widget.options.plugins;
            const pluginNames = Object.keys(plugins);
            pluginNames.forEach(pluginName => {
                const plugin = plugins[pluginName];
                const pluginOptions = Object.keys(plugin);
                pluginOptions.forEach((pluginOptionName) => {
                    const pluginOption = plugin[pluginOptionName];
                    if (typeof pluginOption !== 'string' &&
                        pluginOption != null &&
                        pluginOption.formula != null) {
                        plugin[pluginOptionName] = evaluateExpression(pluginOption.formula, context);
                    }
                });
            });
        }
    }
    else if (isTableWidget(widget) && isTableWidgetInstance(wi)) {
        wi.dataset = widget.dataset.map(row => row.map(cell => {
            return cell.formula instanceof Array
                ? cell.formula.map(f => evalAndTranslate(f, context, ts))
                : evalAndTranslate(cell.formula, context, ts);
        }));
        wi.exportable =
            widget.exportable && (widget.exportable === true || widget.exportable === 'true')
                ? true
                : false;
        wi.data = (widget.dataset || []).map(row => row.map(cell => {
            const val = cell.formula instanceof Array
                ? cell.formula.map(f => evalAndTranslate(f, context, ts))
                : evalAndTranslate(cell.formula, context, ts);
            return {
                value: val,
                style: { ...widget.cellStyles, ...cell.style },
                rowspan: cell.rowspan,
                colspan: cell.colspan,
                sorted: cell.sorted ?? false,
            };
        }));
    }
    else if ((isDynamicTableWidget(widget) && isDynamicTableWidgetInstance(wi)) ||
        (isPaginatedTableWidget(widget) && isPaginatedTableWidgetInstance(wi))) {
        wi.dataset = widget.dataset.map((cell) => {
            return cell.formula instanceof Array
                ? cell.formula.map(f => evalAndTranslate(f, context, ts))
                : evalAndTranslate(cell.formula, context, ts);
        });
        wi.exportable =
            widget.exportable && (widget.exportable === true || widget.exportable === 'true')
                ? true
                : false;
        let dataset = evaluateExpression(widget.rowDefinition.formula, context) || [];
        dataset = (dataset || []).map((row) => row.map(cell => {
            let trf = cell.value;
            try {
                if (trf instanceof Array) {
                    trf = trf.map(v => v != null && typeof v === 'string' && v.trim().length > 0 ? ts.translate(v) : v);
                }
                else {
                    trf =
                        trf != null && typeof trf === 'string' && trf.trim().length > 0
                            ? ts.translate(trf)
                            : trf;
                }
            }
            catch (e) {
                if (isDevMode()) {
                    console.log(e);
                }
            }
            return { ...cell, value: trf };
        }));
        const header = (widget.dataset || []).map(cell => {
            const val = cell.formula instanceof Array
                ? cell.formula.map(f => evalAndTranslate(f, context, ts))
                : evalAndTranslate(cell.formula, context, ts);
            return {
                value: val,
                style: { ...widget.cellStyles, ...cell.style },
                rowspan: cell.rowspan,
                colspan: cell.colspan,
                sorted: cell.sorted ?? false,
            };
        });
        wi.data = header.length === 0 ? [...dataset] : [[...header], ...dataset];
        wi.styles = { ...wi.styles, alignItems: 'flex-start' };
    }
    else if (isPaginatedListWidget(widget) && isPaginatedListWidgetInstance(wi)) {
        let content = [];
        if (widget.contentDefinition) {
            let contentDefinition = evaluateExpression(widget.contentDefinition.formula, context) || [];
            contentDefinition.forEach(c => {
                content.push(widgetToWidgetInstance(c, context, ts, variables));
            });
        }
        else if (widget.content) {
            widget.content.forEach(c => {
                content.push(widgetToWidgetInstance(c, context, ts, variables));
            });
        }
        wi.content = content;
    }
    else if (isImageWidget(widget) && isImageWidgetInstance(wi)) {
        if (widget.flag) {
            wi.flag = evaluateExpression(widget.flag.formula, context);
        }
        if (widget.icon) {
            wi.icon = evaluateExpression(widget.icon.formula, context);
        }
        if (widget.url) {
            wi.url = evaluateExpression(widget.url.formula, context);
        }
    }
    else if (isImageContainerWidget(widget) && isImageContainerWidgetInstance(wi)) {
        if (widget.flags) {
            wi.flags =
                widget.flags instanceof Array
                    ? widget.flags.map(f => evaluateExpression(f.formula, context))
                    : evaluateExpression(widget.flags.formula, context);
        }
        if (widget.icons) {
            wi.icons =
                widget.icons instanceof Array
                    ? widget.icons.map(f => evaluateExpression(f.formula, context))
                    : evaluateExpression(widget.icons.formula, context);
        }
        if (widget.urls) {
            wi.urls =
                widget.urls instanceof Array
                    ? widget.urls.map(f => evaluateExpression(f.formula, context))
                    : evaluateExpression(widget.urls.formula, context);
        }
    }
    else if (isTextWidget(widget) && isTextWidgetInstance(wi)) {
        wi.htmlText = ts.translate(evaluateHtmlText(widget.htmlText, context));
    }
    else if (isFormulaWidget(widget) && isFormulaWidgetInstance(wi)) {
        wi.formula = evaluateExpression(widget.formula.formula, context);
    }
    else if (isMapWidget(widget) && isMapWidgetInstance(wi)) {
        wi.coordinate = evaluateExpression(widget.coordinate.formula, context);
    }
    else if (isGraphWidget(widget) && isGraphWidgetInstance(wi)) {
        if (widget.nodes != null) {
            wi.nodes = widget.nodes.map(ds => ({
                id: ds.id,
                label: ds.label,
                parentId: ds.parentId,
                green: ds.green === 'true',
                red: ds.red === 'true',
                yellow: ds.yellow === 'true',
                color: ds.color,
            }));
        }
    }
    else if (isHeatMapWidget(widget) && isHeatMapWidgetInstance(wi)) {
        wi.idProp = widget.idProp || 'id';
        wi.features = (typeof widget.features === 'string'
            ? JSON.parse(widget.features)
            : widget.features) || { type: 'FeatureCollection', features: [] };
        wi.values = evaluateExpression(widget.values.formula, context);
        wi.startColor = widget.startColor || '#ffeb3b';
        wi.endColor = widget.endColor || '#f44336';
        wi.highlightColor = widget.highlightColor || '#009688';
        wi.showVisualMap = widget.showVisualMap === true;
        if (widget.action) {
            wi.action = widget.action;
        }
    }
    else if (widget.widgetType > 100) {
        const iiFn = componentsMap[widget.widgetType] != null
            ? componentsMap[widget.widgetType].initInstance
            : null;
        if (iiFn != null) {
            return iiFn(wi, context, ts);
        }
    }
    return wi;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LXRvLXdpZGdldC1pbnN0YW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvcmVwb3J0cy9zcmMvdXRpbHMvd2lkZ2V0cy1pbnN0YW5jZXMvd2lkZ2V0LXRvLXdpZGdldC1pbnN0YW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQWEsa0JBQWtCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUdoRSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFekMsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFLckQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDeEUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUN4RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDN0QsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUM1RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzVFLE9BQU8s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QUFDLE1BQU0sQ0FBQztRQUM1QixDQUFDO0lBQ0gsQ0FBQztTQUFNLElBQUksTUFBTSxDQUFDLFVBQVUsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNuQyxNQUFNLElBQUksR0FDUixhQUFhLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUk7WUFDdEMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsWUFBWTtZQUMvQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ1gsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7WUFDakIsT0FBTyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixDQUFDO0lBQ0gsQ0FBQztJQUNELE9BQU8sRUFBRSxDQUFDO0FBQ1osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb250ZXh0LCBldmFsdWF0ZUV4cHJlc3Npb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtBamZUYWJsZUNlbGx9IGZyb20gJ0BhamYvY29yZS90YWJsZSc7XG5pbXBvcnQge1RyYW5zbG9jb1NlcnZpY2V9IGZyb20gJ0BhamYvY29yZS90cmFuc2xvY28nO1xuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcblxuaW1wb3J0IHtjaGFydFRvQ2hhcnRKc1R5cGV9IGZyb20gJy4uLy4uL2NoYXJ0LXV0aWxzJztcbmltcG9ydCB7QWpmVGFibGVEYXRhc2V0fSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvZGF0YXNldC90YWJsZS1kYXRhc2V0JztcbmltcG9ydCB7QWpmUmVwb3J0VmFyaWFibGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9yZXBvcnRzL3JlcG9ydC12YXJpYWJsZSc7XG5pbXBvcnQge0FqZldpZGdldEluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7QWpmV2lkZ2V0fSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQnO1xuaW1wb3J0IHtldmFsdWF0ZUFnZ3JlZ2F0aW9ufSBmcm9tICcuLi9hZ2dyZWdhdGlvbi9ldmFsdWF0ZS1hZ2dyZWdhdGlvbic7XG5pbXBvcnQge2lzQ2hhcnRXaWRnZXR9IGZyb20gJy4uL3dpZGdldHMvaXMtY2hhcnQtd2lkZ2V0JztcbmltcG9ydCB7aXNEaWFsb2dXaWRnZXR9IGZyb20gJy4uL3dpZGdldHMvaXMtZGlhbG9nLXdpZGdldCc7XG5pbXBvcnQge2lzRHluYW1pY1RhYmxlV2lkZ2V0fSBmcm9tICcuLi93aWRnZXRzL2lzLWR5bmFtaWMtdGFibGUtd2lkZ2V0JztcbmltcG9ydCB7aXNGb3JtdWxhV2lkZ2V0fSBmcm9tICcuLi93aWRnZXRzL2lzLWZvcm11bGEtd2lkZ2V0JztcbmltcG9ydCB7aXNHcmFwaFdpZGdldH0gZnJvbSAnLi4vd2lkZ2V0cy9pcy1ncmFwaC13aWRnZXQnO1xuaW1wb3J0IHtpc0hlYXRNYXBXaWRnZXR9IGZyb20gJy4uL3dpZGdldHMvaXMtaGVhdC1tYXAtd2lkZ2V0JztcbmltcG9ydCB7aXNJbWFnZUNvbnRhaW5lcldpZGdldH0gZnJvbSAnLi4vd2lkZ2V0cy9pcy1pbWFnZS1jb250YWluZXItd2lkZ2V0JztcbmltcG9ydCB7aXNJbWFnZVdpZGdldH0gZnJvbSAnLi4vd2lkZ2V0cy9pcy1pbWFnZS13aWRnZXQnO1xuaW1wb3J0IHtpc01hcFdpZGdldH0gZnJvbSAnLi4vd2lkZ2V0cy9pcy1tYXAtd2lkZ2V0JztcbmltcG9ydCB7aXNQYWdpbmF0ZWRMaXN0V2lkZ2V0fSBmcm9tICcuLi93aWRnZXRzL2lzLXBhZ2luYXRlZC1saXN0LXdpZGdldCc7XG5pbXBvcnQge2lzUGFnaW5hdGVkVGFibGVXaWRnZXR9IGZyb20gJy4uL3dpZGdldHMvaXMtcGFnaW5hdGVkLXRhYmxlLXdpZGdldCc7XG5pbXBvcnQge2lzV2lkZ2V0V2l0aENvbnRlbnR9IGZyb20gJy4uL3dpZGdldHMvaXMtd2lkZ2V0LXdpdGgtY29udGVudCc7XG5pbXBvcnQge2lzVGFibGVXaWRnZXR9IGZyb20gJy4uL3dpZGdldHMvaXMtdGFibGUtd2lkZ2V0JztcbmltcG9ydCB7aXNUZXh0V2lkZ2V0fSBmcm9tICcuLi93aWRnZXRzL2lzLXRleHQtd2lkZ2V0JztcbmltcG9ydCB7Y29tcG9uZW50c01hcH0gZnJvbSAnLi4vd2lkZ2V0cy93aWRnZXRzLW1hcCc7XG5pbXBvcnQge2lzQ2hhcnRXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vd2lkZ2V0cy1pbnN0YW5jZXMvaXMtY2hhcnQtd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7aXNEaWFsb2dXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vd2lkZ2V0cy1pbnN0YW5jZXMvaXMtZGlhbG9nLXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzRHluYW1pY1RhYmxlV2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uL3dpZGdldHMtaW5zdGFuY2VzL2lzLWR5bmFtaWMtdGFibGUtd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7aXNGb3JtdWxhV2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uL3dpZGdldHMtaW5zdGFuY2VzL2lzLWZvcm11bGEtd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7aXNHcmFwaFdpZGdldEluc3RhbmNlfSBmcm9tICcuLi93aWRnZXRzLWluc3RhbmNlcy9pcy1ncmFwaC13aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc0hlYXRNYXBXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vd2lkZ2V0cy1pbnN0YW5jZXMvaXMtaGVhdC1tYXAtd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7aXNJbWFnZUNvbnRhaW5lcldpZGdldEluc3RhbmNlfSBmcm9tICcuLi93aWRnZXRzLWluc3RhbmNlcy9pcy1pbWFnZS1jb250YWluZXItd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7aXNJbWFnZVdpZGdldEluc3RhbmNlfSBmcm9tICcuLi93aWRnZXRzLWluc3RhbmNlcy9pcy1pbWFnZS13aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc01hcFdpZGdldEluc3RhbmNlfSBmcm9tICcuLi93aWRnZXRzLWluc3RhbmNlcy9pcy1tYXAtd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7aXNQYWdpbmF0ZWRMaXN0V2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uL3dpZGdldHMtaW5zdGFuY2VzL2lzLXBhZ2luYXRlZC1saXN0LXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzUGFnaW5hdGVkVGFibGVXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi9pcy1wYWdpbmF0ZWQtdGFibGUtd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7aXNUYWJsZVdpZGdldEluc3RhbmNlfSBmcm9tICcuLi93aWRnZXRzLWluc3RhbmNlcy9pcy10YWJsZS13aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc1RleHRXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vd2lkZ2V0cy1pbnN0YW5jZXMvaXMtdGV4dC13aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc1dpZGdldFdpdGhDb250ZW50SW5zdGFuY2V9IGZyb20gJy4uL3dpZGdldHMtaW5zdGFuY2VzL2lzLXdpZGdldC13aXRoLWNvbnRlbnQtaW5zdGFuY2UnO1xuXG5pbXBvcnQge2NyZWF0ZVdpZGdldEluc3RhbmNlfSBmcm9tICcuL2NyZWF0ZS13aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtldmFsQW5kVHJhbnNsYXRlLCBldmFsdWF0ZUh0bWxUZXh0fSBmcm9tICcuL3dpZGdldC1pbnN0YW5jZS11dGlscyc7XG5pbXBvcnQge2lzRGV2TW9kZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiB3aWRnZXRUb1dpZGdldEluc3RhbmNlKFxuICB3aWRnZXQ6IEFqZldpZGdldCxcbiAgY29udGV4dDogQWpmQ29udGV4dCxcbiAgdHM6IFRyYW5zbG9jb1NlcnZpY2UsXG4gIHZhcmlhYmxlczogQWpmUmVwb3J0VmFyaWFibGVbXSA9IFtdLFxuKTogQWpmV2lkZ2V0SW5zdGFuY2Uge1xuICBjb25zdCB3aSA9IGNyZWF0ZVdpZGdldEluc3RhbmNlKHdpZGdldCwgY29udGV4dCwgdHMsIHZhcmlhYmxlcyk7XG5cbiAgaWYgKGlzV2lkZ2V0V2l0aENvbnRlbnQod2lkZ2V0KSAmJiBpc1dpZGdldFdpdGhDb250ZW50SW5zdGFuY2Uod2kpKSB7XG4gICAgbGV0IGNvbnRlbnQ6IEFqZldpZGdldEluc3RhbmNlW10gPSBbXTtcbiAgICB3aWRnZXQuY29udGVudC5mb3JFYWNoKGMgPT4ge1xuICAgICAgaWYgKHdpZGdldC5yZXBldGl0aW9ucyAhPSBudWxsKSB7XG4gICAgICAgIHdpLnJlcGV0aXRpb25zID0gZXZhbHVhdGVFeHByZXNzaW9uKHdpZGdldC5yZXBldGl0aW9ucy5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHR5cGVvZiB3aS5yZXBldGl0aW9ucyA9PT0gJ251bWJlcicgJiYgd2kucmVwZXRpdGlvbnMgPiAwKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aS5yZXBldGl0aW9uczsgaSsrKSB7XG4gICAgICAgICAgICBjb250ZW50LnB1c2god2lkZ2V0VG9XaWRnZXRJbnN0YW5jZShjLCB7Li4uY29udGV4dCwgJyRyZXBldGl0aW9uJzogaX0sIHRzLCB2YXJpYWJsZXMpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRlbnQucHVzaCh3aWRnZXRUb1dpZGdldEluc3RhbmNlKGMsIGNvbnRleHQsIHRzLCB2YXJpYWJsZXMpKTtcbiAgICAgIH1cbiAgICAgIHdpLmNvbnRlbnQgPSBjb250ZW50O1xuICAgIH0pO1xuICAgIGlmIChpc0RpYWxvZ1dpZGdldCh3aWRnZXQpICYmIGlzRGlhbG9nV2lkZ2V0SW5zdGFuY2Uod2kpKSB7XG4gICAgICB3aS50b2dnbGUgPSB3aWRnZXRUb1dpZGdldEluc3RhbmNlKHdpZGdldC50b2dnbGUsIGNvbnRleHQsIHRzLCB2YXJpYWJsZXMpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc0NoYXJ0V2lkZ2V0KHdpZGdldCkgJiYgaXNDaGFydFdpZGdldEluc3RhbmNlKHdpKSkge1xuICAgIGlmICh3aWRnZXQub3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICB3aWRnZXQub3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBjb25zdCBsYWJlbHMgPSB3aWRnZXQubGFiZWxzIGluc3RhbmNlb2YgQXJyYXkgPyB3aWRnZXQubGFiZWxzIDogW3dpZGdldC5sYWJlbHNdO1xuICAgIGNvbnN0IGV2TGFiZWxzID0gbGFiZWxzLm1hcChsID0+IHtcbiAgICAgIGxldCBldmYgPSBldmFsdWF0ZUV4cHJlc3Npb24obC5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChldmYgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgIGV2ZiA9IGV2Zi5tYXAodiA9PlxuICAgICAgICAgICAgdiAhPSBudWxsICYmIHR5cGVvZiB2ID09PSAnc3RyaW5nJyAmJiB2LnRyaW0oKS5sZW5ndGggPiAwID8gdHMudHJhbnNsYXRlKHYpIDogdixcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV2ZiA9XG4gICAgICAgICAgICBldmYgIT0gbnVsbCAmJiB0eXBlb2YgZXZmID09PSAnc3RyaW5nJyAmJiBldmYudHJpbSgpLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgPyB0cy50cmFuc2xhdGUoZXZmKVxuICAgICAgICAgICAgICA6IGV2ZjtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGV2ZjtcbiAgICB9KTtcbiAgICB3aS5sYWJlbHMgPSB3aWRnZXQubGFiZWxzIGluc3RhbmNlb2YgQXJyYXkgPyBldkxhYmVscyA6IGV2TGFiZWxzWzBdO1xuICAgIHdpLmRhdGFzZXRzID0gd2lkZ2V0LmRhdGFzZXQubWFwKGQgPT4ge1xuICAgICAgbGV0IGRzOiBhbnkgPSB7XG4gICAgICAgIC4uLihkLm9wdGlvbnMgfHwge30pLFxuICAgICAgICBkYXRhOiBldmFsdWF0ZUFnZ3JlZ2F0aW9uKGQuYWdncmVnYXRpb24sIGQuZm9ybXVsYSwgY29udGV4dCksXG4gICAgICB9O1xuICAgICAgaWYgKGQuY2hhcnRUeXBlICE9IG51bGwpIHtcbiAgICAgICAgY29uc3QgY3QgPSBjaGFydFRvQ2hhcnRKc1R5cGUoZC5jaGFydFR5cGUpO1xuICAgICAgICBkcyA9IHsuLi5kcywgY2hhcnRUeXBlOiBjdCwgdHlwZTogY3R9O1xuICAgICAgfVxuICAgICAgaWYgKGQub3B0aW9ucyAhPSBudWxsKSB7XG4gICAgICAgIGRzID0gey4uLmRzLCBvcHRpb25zOiBkLm9wdGlvbnN9O1xuICAgICAgfVxuICAgICAgaWYgKGQubGFiZWwgIT0gbnVsbCkge1xuICAgICAgICBkcyA9IHsuLi5kcywgbGFiZWw6IGQubGFiZWwudHJpbSgpLmxlbmd0aCA+IDAgPyB0cy50cmFuc2xhdGUoZC5sYWJlbCkgOiBkLmxhYmVsfTtcbiAgICAgIH1cbiAgICAgIGlmIChkLmRhdGFsYWJlbHMgIT0gbnVsbCkge1xuICAgICAgICBkcy5kYXRhbGFiZWxzID0gZGVlcENvcHkoZC5kYXRhbGFiZWxzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkcztcbiAgICB9KTtcbiAgICB3aS5kYXRhID0ge2xhYmVsczogd2kubGFiZWxzLCBkYXRhc2V0czogd2kuZGF0YXNldHN9O1xuICAgIHdpLmNoYXJ0VHlwZSA9IGNoYXJ0VG9DaGFydEpzVHlwZSh3aWRnZXQudHlwZSB8fCB3aWRnZXQuY2hhcnRUeXBlKTtcbiAgICB3aS5leHBvcnRhYmxlID1cbiAgICAgIHdpZGdldC5leHBvcnRhYmxlICYmICh3aWRnZXQuZXhwb3J0YWJsZSA9PT0gdHJ1ZSB8fCB3aWRnZXQuZXhwb3J0YWJsZSA9PT0gJ3RydWUnKVxuICAgICAgICA/IHRydWVcbiAgICAgICAgOiBmYWxzZTtcbiAgICB3aS5tYWluRGF0YU51bWJlclRocmVzaG9sZCA9IHdpZGdldC5tYWluRGF0YU51bWJlclRocmVzaG9sZDtcbiAgICB3aS5yZW1vdmVaZXJvVmFsdWVzID0gd2lkZ2V0LnJlbW92ZVplcm9WYWx1ZXM7XG5cbiAgICBpZiAod2lkZ2V0Lm9wdGlvbnMgIT0gbnVsbCAmJiB3aWRnZXQub3B0aW9ucy5wbHVnaW5zICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHBsdWdpbnMgPSB3aWRnZXQub3B0aW9ucy5wbHVnaW5zO1xuICAgICAgY29uc3QgcGx1Z2luTmFtZXMgPSBPYmplY3Qua2V5cyhwbHVnaW5zKTtcbiAgICAgIHBsdWdpbk5hbWVzLmZvckVhY2gocGx1Z2luTmFtZSA9PiB7XG4gICAgICAgIGNvbnN0IHBsdWdpbiA9IHBsdWdpbnNbcGx1Z2luTmFtZV07XG4gICAgICAgIGNvbnN0IHBsdWdpbk9wdGlvbnMgPSBPYmplY3Qua2V5cyhwbHVnaW4pO1xuICAgICAgICBwbHVnaW5PcHRpb25zLmZvckVhY2goKHBsdWdpbk9wdGlvbk5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGNvbnN0IHBsdWdpbk9wdGlvbiA9IHBsdWdpbltwbHVnaW5PcHRpb25OYW1lXTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0eXBlb2YgcGx1Z2luT3B0aW9uICE9PSAnc3RyaW5nJyAmJlxuICAgICAgICAgICAgcGx1Z2luT3B0aW9uICE9IG51bGwgJiZcbiAgICAgICAgICAgIHBsdWdpbk9wdGlvbi5mb3JtdWxhICE9IG51bGxcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHBsdWdpbltwbHVnaW5PcHRpb25OYW1lXSA9IGV2YWx1YXRlRXhwcmVzc2lvbihwbHVnaW5PcHRpb24uZm9ybXVsYSwgY29udGV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc1RhYmxlV2lkZ2V0KHdpZGdldCkgJiYgaXNUYWJsZVdpZGdldEluc3RhbmNlKHdpKSkge1xuICAgIHdpLmRhdGFzZXQgPSB3aWRnZXQuZGF0YXNldC5tYXAocm93ID0+XG4gICAgICByb3cubWFwKGNlbGwgPT4ge1xuICAgICAgICByZXR1cm4gY2VsbC5mb3JtdWxhIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgICA/IGNlbGwuZm9ybXVsYS5tYXAoZiA9PiBldmFsQW5kVHJhbnNsYXRlKGYsIGNvbnRleHQsIHRzKSlcbiAgICAgICAgICA6IGV2YWxBbmRUcmFuc2xhdGUoY2VsbC5mb3JtdWxhISwgY29udGV4dCwgdHMpO1xuICAgICAgfSksXG4gICAgKTtcbiAgICB3aS5leHBvcnRhYmxlID1cbiAgICAgIHdpZGdldC5leHBvcnRhYmxlICYmICh3aWRnZXQuZXhwb3J0YWJsZSA9PT0gdHJ1ZSB8fCB3aWRnZXQuZXhwb3J0YWJsZSA9PT0gJ3RydWUnKVxuICAgICAgICA/IHRydWVcbiAgICAgICAgOiBmYWxzZTtcbiAgICB3aS5kYXRhID0gKHdpZGdldC5kYXRhc2V0IHx8IFtdKS5tYXAocm93ID0+XG4gICAgICByb3cubWFwKGNlbGwgPT4ge1xuICAgICAgICBjb25zdCB2YWwgPSBjZWxsLmZvcm11bGEgaW5zdGFuY2VvZiBBcnJheVxuICAgICAgICAgID8gY2VsbC5mb3JtdWxhLm1hcChmID0+IGV2YWxBbmRUcmFuc2xhdGUoZiwgY29udGV4dCwgdHMpKVxuICAgICAgICAgIDogZXZhbEFuZFRyYW5zbGF0ZShjZWxsLmZvcm11bGEhLCBjb250ZXh0LCB0cyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdmFsdWU6IHZhbCxcbiAgICAgICAgICBzdHlsZTogey4uLndpZGdldC5jZWxsU3R5bGVzLCAuLi5jZWxsLnN0eWxlfSxcbiAgICAgICAgICByb3dzcGFuOiBjZWxsLnJvd3NwYW4sXG4gICAgICAgICAgY29sc3BhbjogY2VsbC5jb2xzcGFuLFxuICAgICAgICAgIHNvcnRlZDogY2VsbC5zb3J0ZWQgPz8gZmFsc2UsXG4gICAgICAgIH07XG4gICAgICB9KSxcbiAgICApO1xuICB9IGVsc2UgaWYgKFxuICAgIChpc0R5bmFtaWNUYWJsZVdpZGdldCh3aWRnZXQpICYmIGlzRHluYW1pY1RhYmxlV2lkZ2V0SW5zdGFuY2Uod2kpKSB8fFxuICAgIChpc1BhZ2luYXRlZFRhYmxlV2lkZ2V0KHdpZGdldCkgJiYgaXNQYWdpbmF0ZWRUYWJsZVdpZGdldEluc3RhbmNlKHdpKSlcbiAgKSB7XG4gICAgd2kuZGF0YXNldCA9IHdpZGdldC5kYXRhc2V0Lm1hcCgoY2VsbDogQWpmVGFibGVEYXRhc2V0KSA9PiB7XG4gICAgICByZXR1cm4gY2VsbC5mb3JtdWxhIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgPyBjZWxsLmZvcm11bGEubWFwKGYgPT4gZXZhbEFuZFRyYW5zbGF0ZShmLCBjb250ZXh0LCB0cykpXG4gICAgICAgIDogZXZhbEFuZFRyYW5zbGF0ZShjZWxsLmZvcm11bGEhLCBjb250ZXh0LCB0cyk7XG4gICAgfSk7XG4gICAgd2kuZXhwb3J0YWJsZSA9XG4gICAgICB3aWRnZXQuZXhwb3J0YWJsZSAmJiAod2lkZ2V0LmV4cG9ydGFibGUgPT09IHRydWUgfHwgd2lkZ2V0LmV4cG9ydGFibGUgPT09ICd0cnVlJylcbiAgICAgICAgPyB0cnVlXG4gICAgICAgIDogZmFsc2U7XG5cbiAgICBsZXQgZGF0YXNldDogQWpmVGFibGVDZWxsW11bXSA9IGV2YWx1YXRlRXhwcmVzc2lvbih3aWRnZXQucm93RGVmaW5pdGlvbi5mb3JtdWxhLCBjb250ZXh0KSB8fCBbXTtcbiAgICBkYXRhc2V0ID0gKGRhdGFzZXQgfHwgW10pLm1hcCgocm93OiBBamZUYWJsZUNlbGxbXSkgPT5cbiAgICAgIHJvdy5tYXAoY2VsbCA9PiB7XG4gICAgICAgIGxldCB0cmYgPSBjZWxsLnZhbHVlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICh0cmYgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgdHJmID0gdHJmLm1hcCh2ID0+XG4gICAgICAgICAgICAgIHYgIT0gbnVsbCAmJiB0eXBlb2YgdiA9PT0gJ3N0cmluZycgJiYgdi50cmltKCkubGVuZ3RoID4gMCA/IHRzLnRyYW5zbGF0ZSh2KSA6IHYsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cmYgPVxuICAgICAgICAgICAgICB0cmYgIT0gbnVsbCAmJiB0eXBlb2YgdHJmID09PSAnc3RyaW5nJyAmJiB0cmYudHJpbSgpLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICA/IHRzLnRyYW5zbGF0ZSh0cmYpXG4gICAgICAgICAgICAgICAgOiB0cmY7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsuLi5jZWxsLCB2YWx1ZTogdHJmfTtcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICBjb25zdCBoZWFkZXIgPSAod2lkZ2V0LmRhdGFzZXQgfHwgW10pLm1hcChjZWxsID0+IHtcbiAgICAgIGNvbnN0IHZhbCA9IGNlbGwuZm9ybXVsYSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgID8gY2VsbC5mb3JtdWxhLm1hcChmID0+IGV2YWxBbmRUcmFuc2xhdGUoZiwgY29udGV4dCwgdHMpKVxuICAgICAgICA6IGV2YWxBbmRUcmFuc2xhdGUoY2VsbC5mb3JtdWxhLCBjb250ZXh0LCB0cyk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogdmFsLFxuICAgICAgICBzdHlsZTogey4uLndpZGdldC5jZWxsU3R5bGVzLCAuLi5jZWxsLnN0eWxlfSxcbiAgICAgICAgcm93c3BhbjogY2VsbC5yb3dzcGFuLFxuICAgICAgICBjb2xzcGFuOiBjZWxsLmNvbHNwYW4sXG4gICAgICAgIHNvcnRlZDogY2VsbC5zb3J0ZWQgPz8gZmFsc2UsXG4gICAgICB9O1xuICAgIH0pO1xuICAgIHdpLmRhdGEgPSBoZWFkZXIubGVuZ3RoID09PSAwID8gWy4uLmRhdGFzZXRdIDogW1suLi5oZWFkZXJdLCAuLi5kYXRhc2V0XTtcbiAgICB3aS5zdHlsZXMgPSB7Li4ud2kuc3R5bGVzLCBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCd9O1xuICB9IGVsc2UgaWYgKGlzUGFnaW5hdGVkTGlzdFdpZGdldCh3aWRnZXQpICYmIGlzUGFnaW5hdGVkTGlzdFdpZGdldEluc3RhbmNlKHdpKSkge1xuICAgIGxldCBjb250ZW50OiBBamZXaWRnZXRJbnN0YW5jZVtdID0gW107XG4gICAgaWYgKHdpZGdldC5jb250ZW50RGVmaW5pdGlvbikge1xuICAgICAgbGV0IGNvbnRlbnREZWZpbml0aW9uOiBBamZXaWRnZXRbXSA9XG4gICAgICAgIGV2YWx1YXRlRXhwcmVzc2lvbih3aWRnZXQuY29udGVudERlZmluaXRpb24uZm9ybXVsYSwgY29udGV4dCkgfHwgW107XG4gICAgICBjb250ZW50RGVmaW5pdGlvbi5mb3JFYWNoKGMgPT4ge1xuICAgICAgICBjb250ZW50LnB1c2god2lkZ2V0VG9XaWRnZXRJbnN0YW5jZShjLCBjb250ZXh0LCB0cywgdmFyaWFibGVzKSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHdpZGdldC5jb250ZW50KSB7XG4gICAgICB3aWRnZXQuY29udGVudC5mb3JFYWNoKGMgPT4ge1xuICAgICAgICBjb250ZW50LnB1c2god2lkZ2V0VG9XaWRnZXRJbnN0YW5jZShjLCBjb250ZXh0LCB0cywgdmFyaWFibGVzKSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgd2kuY29udGVudCA9IGNvbnRlbnQ7XG4gIH0gZWxzZSBpZiAoaXNJbWFnZVdpZGdldCh3aWRnZXQpICYmIGlzSW1hZ2VXaWRnZXRJbnN0YW5jZSh3aSkpIHtcbiAgICBpZiAod2lkZ2V0LmZsYWcpIHtcbiAgICAgIHdpLmZsYWcgPSBldmFsdWF0ZUV4cHJlc3Npb24od2lkZ2V0LmZsYWcuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgfVxuICAgIGlmICh3aWRnZXQuaWNvbikge1xuICAgICAgd2kuaWNvbiA9IGV2YWx1YXRlRXhwcmVzc2lvbih3aWRnZXQuaWNvbi5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICB9XG4gICAgaWYgKHdpZGdldC51cmwpIHtcbiAgICAgIHdpLnVybCA9IGV2YWx1YXRlRXhwcmVzc2lvbih3aWRnZXQudXJsLmZvcm11bGEsIGNvbnRleHQpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc0ltYWdlQ29udGFpbmVyV2lkZ2V0KHdpZGdldCkgJiYgaXNJbWFnZUNvbnRhaW5lcldpZGdldEluc3RhbmNlKHdpKSkge1xuICAgIGlmICh3aWRnZXQuZmxhZ3MpIHtcbiAgICAgIHdpLmZsYWdzID1cbiAgICAgICAgd2lkZ2V0LmZsYWdzIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgICA/IHdpZGdldC5mbGFncy5tYXAoZiA9PiBldmFsdWF0ZUV4cHJlc3Npb24oZi5mb3JtdWxhLCBjb250ZXh0KSlcbiAgICAgICAgICA6IGV2YWx1YXRlRXhwcmVzc2lvbih3aWRnZXQuZmxhZ3MuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgfVxuICAgIGlmICh3aWRnZXQuaWNvbnMpIHtcbiAgICAgIHdpLmljb25zID1cbiAgICAgICAgd2lkZ2V0Lmljb25zIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgICA/IHdpZGdldC5pY29ucy5tYXAoZiA9PiBldmFsdWF0ZUV4cHJlc3Npb24oZi5mb3JtdWxhLCBjb250ZXh0KSlcbiAgICAgICAgICA6IGV2YWx1YXRlRXhwcmVzc2lvbih3aWRnZXQuaWNvbnMuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgfVxuICAgIGlmICh3aWRnZXQudXJscykge1xuICAgICAgd2kudXJscyA9XG4gICAgICAgIHdpZGdldC51cmxzIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgICA/IHdpZGdldC51cmxzLm1hcChmID0+IGV2YWx1YXRlRXhwcmVzc2lvbihmLmZvcm11bGEsIGNvbnRleHQpKVxuICAgICAgICAgIDogZXZhbHVhdGVFeHByZXNzaW9uKHdpZGdldC51cmxzLmZvcm11bGEsIGNvbnRleHQpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc1RleHRXaWRnZXQod2lkZ2V0KSAmJiBpc1RleHRXaWRnZXRJbnN0YW5jZSh3aSkpIHtcbiAgICB3aS5odG1sVGV4dCA9IHRzLnRyYW5zbGF0ZShldmFsdWF0ZUh0bWxUZXh0KHdpZGdldC5odG1sVGV4dCwgY29udGV4dCkpO1xuICB9IGVsc2UgaWYgKGlzRm9ybXVsYVdpZGdldCh3aWRnZXQpICYmIGlzRm9ybXVsYVdpZGdldEluc3RhbmNlKHdpKSkge1xuICAgIHdpLmZvcm11bGEgPSBldmFsdWF0ZUV4cHJlc3Npb24od2lkZ2V0LmZvcm11bGEuZm9ybXVsYSwgY29udGV4dCk7XG4gIH0gZWxzZSBpZiAoaXNNYXBXaWRnZXQod2lkZ2V0KSAmJiBpc01hcFdpZGdldEluc3RhbmNlKHdpKSkge1xuICAgIHdpLmNvb3JkaW5hdGUgPSBldmFsdWF0ZUV4cHJlc3Npb24od2lkZ2V0LmNvb3JkaW5hdGUuZm9ybXVsYSwgY29udGV4dCk7XG4gIH0gZWxzZSBpZiAoaXNHcmFwaFdpZGdldCh3aWRnZXQpICYmIGlzR3JhcGhXaWRnZXRJbnN0YW5jZSh3aSkpIHtcbiAgICBpZiAod2lkZ2V0Lm5vZGVzICE9IG51bGwpIHtcbiAgICAgIHdpLm5vZGVzID0gd2lkZ2V0Lm5vZGVzLm1hcChkcyA9PiAoe1xuICAgICAgICBpZDogZHMuaWQsXG4gICAgICAgIGxhYmVsOiBkcy5sYWJlbCxcbiAgICAgICAgcGFyZW50SWQ6IGRzLnBhcmVudElkLFxuICAgICAgICBncmVlbjogZHMuZ3JlZW4gPT09ICd0cnVlJyxcbiAgICAgICAgcmVkOiBkcy5yZWQgPT09ICd0cnVlJyxcbiAgICAgICAgeWVsbG93OiBkcy55ZWxsb3cgPT09ICd0cnVlJyxcbiAgICAgICAgY29sb3I6IGRzLmNvbG9yLFxuICAgICAgfSkpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc0hlYXRNYXBXaWRnZXQod2lkZ2V0KSAmJiBpc0hlYXRNYXBXaWRnZXRJbnN0YW5jZSh3aSkpIHtcbiAgICB3aS5pZFByb3AgPSB3aWRnZXQuaWRQcm9wIHx8ICdpZCc7XG4gICAgd2kuZmVhdHVyZXMgPSAodHlwZW9mIHdpZGdldC5mZWF0dXJlcyA9PT0gJ3N0cmluZydcbiAgICAgID8gSlNPTi5wYXJzZSh3aWRnZXQuZmVhdHVyZXMpXG4gICAgICA6IHdpZGdldC5mZWF0dXJlcykgfHwge3R5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsIGZlYXR1cmVzOiBbXX07XG4gICAgd2kudmFsdWVzID0gZXZhbHVhdGVFeHByZXNzaW9uKHdpZGdldC52YWx1ZXMuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgd2kuc3RhcnRDb2xvciA9IHdpZGdldC5zdGFydENvbG9yIHx8ICcjZmZlYjNiJztcbiAgICB3aS5lbmRDb2xvciA9IHdpZGdldC5lbmRDb2xvciB8fCAnI2Y0NDMzNic7XG4gICAgd2kuaGlnaGxpZ2h0Q29sb3IgPSB3aWRnZXQuaGlnaGxpZ2h0Q29sb3IgfHwgJyMwMDk2ODgnO1xuICAgIHdpLnNob3dWaXN1YWxNYXAgPSB3aWRnZXQuc2hvd1Zpc3VhbE1hcCA9PT0gdHJ1ZTtcbiAgICBpZiAod2lkZ2V0LmFjdGlvbikge1xuICAgICAgd2kuYWN0aW9uID0gd2lkZ2V0LmFjdGlvbjtcbiAgICB9XG4gIH0gZWxzZSBpZiAod2lkZ2V0LndpZGdldFR5cGUgPiAxMDApIHtcbiAgICBjb25zdCBpaUZuID1cbiAgICAgIGNvbXBvbmVudHNNYXBbd2lkZ2V0LndpZGdldFR5cGVdICE9IG51bGxcbiAgICAgICAgPyBjb21wb25lbnRzTWFwW3dpZGdldC53aWRnZXRUeXBlXS5pbml0SW5zdGFuY2VcbiAgICAgICAgOiBudWxsO1xuICAgIGlmIChpaUZuICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBpaUZuKHdpLCBjb250ZXh0LCB0cyk7XG4gICAgfVxuICB9XG4gIHJldHVybiB3aTtcbn1cbiJdfQ==