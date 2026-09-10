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
import { createFormula } from '@ajf/core/models';
import { deepCopy } from '@ajf/core/utils';
import { forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import { backgroundColor } from '../automatic-report/styles';
import { indicatorToJs } from './hindikit-parser';
import { htmlWidget, widgetStyle } from './styles';
import { createDataset } from '../utils/dataset/create-dataset';
import { createReportContainer } from '../utils/reports/create-report-container';
import { createWidget } from '../utils/widgets/create-widget';
import { AjfWidgetType } from '../interface/widgets/widget-type';
import { AjfChartType } from '../interface/charts/chart-type';
/**
 * This function builds a report from an excel file.
 */
export function xlsReport(file, http) {
    const workbook = XLSX.read(file, { type: 'binary' });
    const report = {};
    const reportWidgets = [];
    const variables = [];
    const filters = {};
    // create filters
    workbook.SheetNames.forEach((sheetName, index) => {
        const sheet = workbook.Sheets[sheetName];
        if (sheetName.includes('filter') && index + 1 < workbook.SheetNames.length) {
            const nextSheet = sheetName.includes('global')
                ? 'global_filter'
                : workbook.SheetNames[index + 1];
            filters[nextSheet] = _buildFilter(workbook, sheet, http);
        }
    });
    const obsFilterValues = Object.values(filters).length
        ? Object.values(filters)
        : [of({})];
    const filterNames = Object.keys(filters);
    return forkJoin(obsFilterValues).pipe(map(f => {
        workbook.SheetNames.forEach(sheetName => {
            const sheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(sheet);
            if (sheetName === 'variables') {
                const jsonVars = json.map(jsonVar => jsonVar);
                jsonVars
                    .filter(e => e != null && e.name != null && e.name !== '')
                    .forEach(elem => {
                    const r = Number(elem.__rowNum__) + 1;
                    const name = String(elem.name).trim();
                    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) {
                        const msg = `Variable name "${name}" (row ${r}) is not a valid identifier`;
                        window.alert(msg);
                        throw new Error(msg);
                    }
                    let js;
                    try {
                        js = indicatorToJs(elem.value);
                    }
                    catch (err) {
                        err = new Error(`Error in variable "${name}" (row ${r}): ${err.message}`);
                        window.alert(err.message);
                        throw err;
                    }
                    variables.push({
                        name,
                        formula: { formula: js },
                        isAIPrompt: elem.isAIPrompt,
                    });
                });
            }
            else {
                const idx = filterNames.indexOf(sheetName);
                if (sheetName.includes('table')) {
                    const tableWidget = _buildTable(sheetName, json);
                    reportWidgets.push(tableWidget);
                }
                else if (sheetName.includes('chart')) {
                    const chartWidget = _buildChart(sheetName, json);
                    reportWidgets.push(chartWidget);
                }
                else if (sheetName.includes('image')) {
                    const imageWidget = _buildImage(sheetName, json);
                    reportWidgets.push(imageWidget);
                }
                else if (sheetName.includes('html')) {
                    const chartWidget = _buildHtml(json);
                    reportWidgets.push(chartWidget);
                }
                else if (sheetName.includes('graph')) {
                    const graphWidget = _buildGraph(sheetName, json);
                    reportWidgets.push(graphWidget);
                }
                else if (sheetName.includes('heatmap')) {
                    const heatmapWidget = _buildHeatmap(sheetName, json);
                    reportWidgets.push(heatmapWidget);
                }
                else if (sheetName.includes('paginatedlist')) {
                    const pagListWidget = _buildPaginatedListTable(sheetName, json);
                    reportWidgets.push(pagListWidget);
                }
                else if (sheetName.includes('paginatedDialogList')) {
                    const pagListWidget = _buildPaginatedListTableWithDialog(sheetName, json);
                    reportWidgets.push(pagListWidget);
                }
                else if (sheetName.includes('single')) {
                    const singleWidget = _buildSingleIndicator(json);
                    reportWidgets.push(...singleWidget);
                }
                if (idx >= 0) {
                    reportWidgets[reportWidgets.length - 1].filter = {
                        schema: f[idx],
                    };
                }
            }
        });
        const globalFilterIdx = filterNames.indexOf('global_filter');
        const layoutWidget = {
            widgetType: AjfWidgetType.Layout,
            content: [
                createWidget({
                    widgetType: AjfWidgetType.Column,
                    content: [...reportWidgets],
                    filter: globalFilterIdx >= 0 ? { schema: f[globalFilterIdx] } : undefined,
                }),
            ],
            columns: [1],
            visibility: {
                condition: 'true',
            },
            styles: {},
        };
        report.variables = variables;
        report.content = createReportContainer(layoutWidget);
        return report;
    }));
}
function _buildFilter(wbook, sheet, http) {
    const data = new FormData();
    const filterBook = deepCopy(wbook);
    const filterSheet = deepCopy(sheet);
    const choicesSheet = deepCopy(wbook.Sheets['choices']);
    filterBook.SheetNames = ['survey', 'choices'];
    filterBook.Sheets = { survey: filterSheet, choices: choicesSheet };
    const filterXlsx = XLSX.write(filterBook, {
        bookType: 'xlsx',
        type: 'array',
    });
    const file = new File([filterXlsx], 'filter.xlsx');
    data.append('excelFile', file);
    return http.post('https://formconv.herokuapp.com/result.json', data);
}
function alertAndThrow(err) {
    window.alert(err);
    throw new Error(err);
}
function _buildChart(name, sheet) {
    if (sheet == null || sheet.length === 0) {
        alertAndThrow('Empty sheet for chart ' + name);
    }
    const data = sheet[0];
    const optionsNames = [
        'chartType',
        'title',
        'stacked',
        'beginAtZeroX',
        'beginAtZeroY',
        'axisLabelX',
        'axisLabelY',
        'axisMinX',
        'axisMinY',
        'axisMaxX',
        'axisMaxY',
        'removeZeroValues',
        'mainDataNumberThreshold',
    ];
    const options = {};
    for (const name of optionsNames) {
        if (data[name] != null) {
            options[name] = data[name];
            delete data[name];
        }
    }
    const type = AjfChartType[options['chartType']];
    if (type == null) {
        alertAndThrow('Invalid chart type for chart ' + name);
    }
    if (type !== AjfChartType.Scatter && type !== AjfChartType.Bubble && sheet.length !== 1) {
        alertAndThrow(`Chart "${name}" must have 1 row of data`);
    }
    if (type === AjfChartType.Scatter && sheet.length !== 2) {
        alertAndThrow(`Scatter chart "${name}" must have 2 rows of data`);
    }
    if (type === AjfChartType.Bubble && sheet.length !== 3) {
        alertAndThrow(`Bubble chart "${name}" must have 3 rows of data`);
    }
    const labels = data['labels'];
    let labelsFormula = { formula: '[]' };
    if (labels != null) {
        delete data['labels'];
        let labelsJs = '';
        try {
            labelsJs = indicatorToJs(labels);
        }
        catch (err) {
            alertAndThrow(`Error in labels of chart ${name}: ${err.message}`);
        }
        labelsFormula = { formula: labelsJs };
    }
    const stacked = Boolean(options['stacked']);
    const beginAtZeroX = Boolean(options['beginAtZeroX']);
    const beginAtZeroY = Boolean(options['beginAtZeroY']);
    const axisLabelX = options['axisLabelX'];
    const axisLabelY = options['axisLabelY'];
    const axisMinX = options['axisMinX'];
    const axisMinY = options['axisMinY'];
    const axisMaxX = options['axisMaxX'];
    const axisMaxY = options['axisMaxY'];
    const removeZeroValues = Boolean(options['removeZeroValues']);
    const mainDataNumberThreshold = +options['mainDataNumberThreshold'] || +options['mainDataNumberThreshold'] === 0
        ? +options['mainDataNumberThreshold']
        : 10;
    const dataset = [];
    Object.keys(data).forEach((key, index) => {
        let xs = '';
        try {
            xs = indicatorToJs(data[key]);
        }
        catch (err) {
            alertAndThrow(`Error in X data "${key}" of chart "${name}": ${err.message}`);
        }
        let ys = '';
        if (type === AjfChartType.Scatter || type === AjfChartType.Bubble) {
            try {
                ys = indicatorToJs(sheet[1][key]);
            }
            catch (err) {
                alertAndThrow(`Error in Y data "${key}" of chart "${name}": ${err.message}`);
            }
        }
        let rs = 'undefined';
        if (type === AjfChartType.Bubble) {
            try {
                rs = indicatorToJs(sheet[2][key]);
            }
            catch (err) {
                alertAndThrow(`Error in radius data "${key}" of chart "${name}": ${err.message}`);
            }
        }
        let formula;
        if (type === AjfChartType.Scatter || type === AjfChartType.Bubble) {
            formula = [createFormula({ formula: `buildPointData(${xs}, ${ys}, ${rs})` })];
        }
        else {
            formula = [createFormula({ formula: xs })];
        }
        const multipleColors = type === AjfChartType.Pie ||
            type === AjfChartType.PolarArea ||
            type === AjfChartType.Doughnut;
        const color = multipleColors ? backgroundColor : backgroundColor[index];
        const datasetOptions = { backgroundColor: color, tension: 0 };
        if (type === AjfChartType.Line && !stacked) {
            datasetOptions.backgroundColor = 'transparent';
            datasetOptions.borderColor = color;
            datasetOptions.pointBackgroundColor = color;
        }
        dataset.push({
            ...createDataset({
                aggregation: { aggregation: 0 },
                formula,
                label: key,
            }),
            options: datasetOptions,
        });
    });
    const scales = {};
    if (stacked || beginAtZeroX || axisMinX != null || axisMaxX != null || axisLabelX) {
        const axisX = {
            stacked,
            ticks: { beginAtZero: beginAtZeroX },
        };
        if (axisMinX != null) {
            axisX.ticks.suggestedMin = Number(axisMinX);
        }
        if (axisMaxX != null) {
            axisX.ticks.suggestedMax = Number(axisMaxX);
        }
        if (axisLabelX) {
            axisX.scaleLabel = { display: true, labelString: axisLabelX };
        }
        scales.xAxes = [axisX];
    }
    if (stacked || beginAtZeroY || axisMinY != null || axisMaxY != null || axisLabelY) {
        const axisY = {
            stacked,
            ticks: { beginAtZero: stacked || beginAtZeroY },
        };
        if (axisMinY != null) {
            axisY.ticks.suggestedMin = Number(axisMinY);
        }
        if (axisMaxY != null) {
            axisY.ticks.suggestedMax = Number(axisMaxY);
        }
        if (axisLabelY) {
            axisY.scaleLabel = { display: true, labelString: axisLabelY };
        }
        scales.yAxes = [axisY];
    }
    return createWidget({
        name,
        widgetType: AjfWidgetType.Chart,
        type,
        labels: labelsFormula,
        dataset,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            legend: { display: true, position: 'bottom' },
            title: {
                display: true,
                text: options['title'] || '',
            },
            scales,
        },
        styles: {
            ...widgetStyle,
            ...{ width: '100%', maxWidth: '1000px', margin: '10px auto' },
        },
        exportable: true,
        mainDataNumberThreshold: mainDataNumberThreshold,
        removeZeroValues: removeZeroValues,
    });
}
function _buildGraph(name, json) {
    const nodes = [];
    json.forEach(row => {
        const rowKeys = Object.keys(row);
        if (rowKeys.includes('id') && row['id']) {
            const rowId = row['id'].trim().replace(/"/g, '');
            if (rowId && rowId.length) {
                let graphNodeObj = {};
                rowKeys.forEach(rowKey => {
                    let js;
                    try {
                        js = indicatorToJs(row[rowKey]);
                    }
                    catch (err) {
                        const rowNum = Number(row['__rowNum__']) + 1;
                        err = new Error(`Error in "${name}", row ${rowNum}, column "${rowKey}": ${err.message}`);
                        window.alert(err.message);
                        throw err;
                    }
                    graphNodeObj[rowKey] = js;
                });
                graphNodeObj['id'] = rowId;
                nodes.push(graphNodeObj);
            }
        }
    });
    return createWidget({
        widgetType: AjfWidgetType.Graph,
        nodes,
        styles: {},
    });
}
function _buildImage(sheetName, rows) {
    if (rows.length === 0 || !rows[0]['url']) {
        const msg = `Image "${sheetName}" has no url`;
        window.alert(msg);
        throw new Error(msg);
    }
    const row = rows[0];
    let urlFormula = String(row['url']);
    if (urlFormula.startsWith('js:')) {
        urlFormula = urlFormula.slice(3).trim();
    }
    else {
        urlFormula = `"${urlFormula}"`;
    }
    const align = (row['align'] || '').trim().toLowerCase();
    const styles = {};
    if (align === 'left' || align === 'center') {
        styles.marginRight = 'auto';
    }
    if (align === 'right' || align === 'center') {
        styles.marginLeft = 'auto';
    }
    if (row['width']) {
        styles.width = row['width'];
    }
    if (row['height']) {
        styles.height = row['height'];
    }
    return createWidget({
        widgetType: AjfWidgetType.Image,
        imageType: 0,
        url: { formula: urlFormula },
        styles,
    });
}
function _buildHtml(json) {
    const firstRow = json.length > 0 && json[0]['html'] != null ? json[0] : { html: '' };
    return createWidget({
        widgetType: AjfWidgetType.Text,
        htmlText: String(firstRow['html']),
        styles: htmlWidget,
    });
}
function getTrendWidget(value, color, condition, icon) {
    let percValue = `[[${value}]]%`;
    if (!value) {
        percValue = '';
    }
    return createWidget({
        widgetType: AjfWidgetType.Text,
        htmlText: `<i class=\"material-icons\" style=\"vertical-align: bottom; color: ${color}\">${icon}</i><span style=\"color: ${color}\">${percValue}</span>`,
        styles: {
            ...htmlWidget,
            color: color,
            fontSize: '16px',
            justifyContent: 'center',
        },
        visibility: {
            condition: condition,
        },
    });
}
function _buildSingleIndicator(json) {
    const indicatorWidgets = [];
    const firstRow = json.length > 0 && json[0]['html'] != null ? json[0] : { html: '' };
    indicatorWidgets.push(createWidget({
        widgetType: AjfWidgetType.Text,
        htmlText: String(firstRow['html']),
        styles: {
            ...htmlWidget,
            marginBottom: '0',
            justifyContent: 'center',
        },
    }));
    let showTrend = false;
    let marginBottom = '10px';
    if (firstRow['percentage_change']) {
        showTrend = true;
        marginBottom = '0';
    }
    indicatorWidgets.push(createWidget({
        widgetType: AjfWidgetType.Text,
        htmlText: '[[' + String(firstRow['current_value']) + ']]',
        styles: {
            ...htmlWidget,
            marginBottom,
            fontSize: '90px',
            fontWeight: 'bold',
            lineHeight: '1',
            justifyContent: 'center',
        },
    }));
    if (showTrend) {
        indicatorWidgets.push(getTrendWidget(String(firstRow['percentage_change']), 'red', `${String(firstRow['percentage_change'])} < 0`, 'trending_down'));
        indicatorWidgets.push(getTrendWidget(String(firstRow['percentage_change']), 'green', `${String(firstRow['percentage_change'])} > 0`, 'trending_up'));
        indicatorWidgets.push(getTrendWidget(String(firstRow['percentage_change']), 'orange', `${String(firstRow['percentage_change'])} == 0`, 'trending_flat'));
        indicatorWidgets.push(getTrendWidget(null, 'orange', `${String(firstRow['percentage_change'])} === '-'`, 'remove'));
    }
    return indicatorWidgets;
}
function headerFormula(s) {
    s = String(s);
    if (s.startsWith('js:')) {
        return { formula: s.slice(3).trim() };
    }
    // quote s
    return { formula: JSON.stringify(s) };
}
function _buildTable(sheetName, json) {
    let tableHeader = [];
    let dataRows = '[]';
    let formula = '';
    let pageSize = 10;
    let pagination = false;
    if (json.length > 1) {
        const rowspan = 1;
        const titles = Object.keys(json[0]);
        const colspanRowValues = Object.values(json[0]).map(v => (v ? v.toString() : ''));
        const colspans = colspanRowValues.map(r => +r.charAt(0));
        const textAlign = colspanRowValues.map(r => {
            switch (r.charAt(1)) {
                case 'l':
                    return 'left';
                case 'r':
                    return 'right';
                default:
                    return 'center';
            }
        });
        const sortCols = colspanRowValues.map(r => r.charAt(2) && r.charAt(2) === 's' ? true : false);
        tableHeader = titles.map((title, index) => ({
            label: '',
            formula: headerFormula(title),
            aggregation: { aggregation: 0 },
            colspan: colspans[index],
            rowspan,
            sorted: sortCols[index],
            style: {
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'white',
                backgroundColor: '#3f51b5',
                borderBottom: '2px solid #ddd',
            },
        }));
        pagination = json[1]['pagination'] ? json[1]['pagination'] : false;
        if ('dataset' in json[1]) {
            const dialogFields = json[1]['dialog_fields']
                ? json[1]['dialog_fields'].split(',').map(v => v.trim())
                : [];
            const dialogLabelFields = json[1]['dialog_fields_labels']
                ? json[1]['dialog_fields_labels'].split(',').map(v => v.trim())
                : [];
            formula = _buildFormListTable(json, colspans, textAlign, dialogFields, dialogLabelFields);
            if (dialogFields && dialogFields.length) {
                tableHeader.push({
                    label: '',
                    formula: { formula: `" "` },
                    aggregation: { aggregation: 0 },
                    colspan: 1,
                    rowspan,
                    style: {
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: 'white',
                        backgroundColor: '#3f51b5',
                        borderBottom: '2px solid #ddd',
                    },
                });
            }
        }
        else {
            delete json[0];
            dataRows = '[';
            json.forEach(row => {
                let dataRow = '[';
                titles.forEach(title => {
                    let elem = row[title] || `''`;
                    try {
                        elem = indicatorToJs(elem);
                    }
                    catch (err) {
                        const rowNum = Number(row['__rowNum__']) + 1;
                        err = new Error(`Error in "${sheetName}", row ${rowNum}, column "${title}": ${err.message}`);
                        window.alert(err.message);
                        throw err;
                    }
                    dataRow += elem + ',';
                });
                dataRow += ']';
                dataRows += dataRow + ',';
            });
            dataRows += ']';
            formula = `buildAlignedDataset(plainArray(${dataRows}),${JSON.stringify(colspans)},${JSON.stringify(textAlign)})`;
        }
    }
    if (pagination) {
        return createWidget({
            widgetType: AjfWidgetType.PaginatedTable,
            pageSize: pageSize,
            rowDefinition: {
                formula: formula,
            },
            dataset: tableHeader,
            exportable: true,
            cellStyles: {
                textAlign: 'center',
                color: 'black',
                backgroundColor: 'white',
            },
            styles: {
                borderCollapse: 'collapse',
            },
        });
    }
    else {
        return createWidget({
            widgetType: AjfWidgetType.DynamicTable,
            rowDefinition: {
                formula: formula,
            },
            dataset: tableHeader,
            exportable: true,
            cellStyles: {
                textAlign: 'center',
                color: 'black',
                backgroundColor: 'white',
            },
            styles: {
                borderCollapse: 'collapse',
            },
        });
    }
}
/**
 * Create a formula for a dynamic table widget, based on a list of Forms
 * @param json
 * @returns the formula for the DynamicTable AjfWidget, like this:
 * buildFormDataset(projectsDataset, ['id_p','donors','budget','dino_area_name','calc_progress',])"
 */
function _buildFormListTable(json, colspans, textAlign, dialogFields, dialogLabelFields) {
    let formula = '';
    if (json.length > 1) {
        let fields = '[';
        Object.keys(json[0]).forEach(fieldColName => {
            let elem = json[1][fieldColName] ? `'${json[1][fieldColName]}'` : `''`;
            fields += elem + ',';
        });
        fields += ']';
        const dataset = json[1]['dataset'];
        const linkField = json[1]['link_field'];
        const linkPos = json[1]['link_position'] ? +json[1]['link_position'] : 0;
        const rowLink = linkField && linkField.length ? `{'link': '${linkField}', 'position': ${linkPos}}` : null;
        formula = `buildAlignedFormDataset(${dataset}, ${fields}, ${JSON.stringify(colspans)}, ${JSON.stringify(textAlign)}, ${rowLink}, ${JSON.stringify(dialogFields)}, ${JSON.stringify(dialogLabelFields)})`;
    }
    return formula;
}
/**
 * Create a widget with a dynamic paginated table based on a list of Forms. Each row is an AjfTable.
 * @param sheetName
 * @param json
 * @returns a Paginated AjfWidget with a formula like this:
 * buildWidgetDataset(projectsDataset, ['id_p','donors','budget','dino_area_name','calc_progress','home_link_text',],
 *   {'link': 'home_link', 'position': 5}, {'border': 'none'},{'width': '900px'}, ['10%','30%','10%','25%','15%','10%'], \"#f0f0f0\", \"white\")"
 */
function _buildPaginatedListTable(_, json) {
    let formula = '';
    let pageSize = 10;
    let dataset = '';
    let title = '';
    if (json.length > 1) {
        const colsPercentage = Object.values(json[0])
            .map(r => `'${r}%'`)
            .join(',');
        const colsPercentageArray = `[${colsPercentage}]`;
        let fields = '[';
        Object.keys(json[0]).forEach(fieldColName => {
            let elem = json[1][fieldColName] ? `'${json[1][fieldColName]}'` : `''`;
            fields += elem + ',';
        });
        fields += ']';
        dataset = json[1]['dataset'];
        title = json[1]['title'];
        pageSize = json[1]['pageSize'] ? +json[1]['pageSize'] : 10;
        const linkField = json[1]['link_field'];
        const linkPos = json[1]['link_position'] ? +json[1]['link_position'] : 0;
        const rowLink = linkField && linkField.length ? `{'link': '${linkField}', 'position': ${linkPos}}` : null;
        const cellStyles = json[1]['cellStyles'];
        const rowStyle = json[1]['rowStyle'];
        const backgroundColorA = json[1]['backgroundColorA'];
        const backgroundColorB = json[1]['backgroundColorB'];
        formula =
            `buildWidgetDataset(${dataset}, ${fields}, ${rowLink}, ${cellStyles},` +
                `${rowStyle}, ${colsPercentageArray}, ${JSON.stringify(backgroundColorA)}, ${JSON.stringify(backgroundColorB)})`;
    }
    return createWidget({
        widgetType: AjfWidgetType.PaginatedList,
        pageSize: pageSize,
        title: title,
        contentDefinition: {
            formula: formula,
        },
        exportable: true,
        styles: {
            height: '500px',
        },
    });
}
/**
 * Create a widget with a dynamic paginated table based on a list of Forms. Each row is an AjfDialogWidget with an AjfTable
 * that open, on click, a dialog.
 * @param sheetName
 * @param json
 * @returns a Paginated AjfWidget with a formula like this:
 * buildWidgetDatasetWithDialog(projectsDataset, ['id_p','donors','province_choicesLabel','dino_area_name','calc_progress','home_link_text',],
 *  ['id_p','donors','province_choicesLabel','dino_area_name'], ['Codice progetto','Donors','Provinces','Settore di attivita'],
 *  {'border': 'none'},{'width': '900px'}, ['10%','30%','10%','25%','15%','10%'], \"#f0f0f0\", \"white\")
 */
function _buildPaginatedListTableWithDialog(_, json) {
    let formula = '';
    let pageSize = 10;
    let dataset = '';
    let title = '';
    if (json.length > 1) {
        const colsPercentage = Object.values(json[0])
            .map(r => `'${r}%'`)
            .join(',');
        const colsPercentageArray = `[${colsPercentage}]`;
        let fields = '[';
        Object.keys(json[0]).forEach(fieldColName => {
            let elem = json[1][fieldColName] ? `'${json[1][fieldColName]}'` : `''`;
            fields += elem + ',';
        });
        fields += ']';
        let dialogFields = '[';
        let dialogLabelFields = '[';
        if (json.length > 3) {
            dialogLabelFields += Object.values(json[2]).map(v => `'${v}'`).join(',');
            dialogFields += Object.values(json[3]).map(v => `'${v}'`).join(',');
        }
        dialogFields += ']';
        dialogLabelFields += ']';
        dataset = json[1]['dataset'];
        title = json[1]['title'];
        pageSize = json[1]['pageSize'] ? +json[1]['pageSize'] : 10;
        const cellStyles = json[1]['cellStyles'];
        const rowStyle = json[1]['rowStyle'];
        const backgroundColorA = json[1]['backgroundColorA'];
        const backgroundColorB = json[1]['backgroundColorB'];
        formula =
            `buildWidgetDatasetWithDialog(${dataset}, ${fields}, ${dialogFields}, ${dialogLabelFields}, ${cellStyles},` +
                `${rowStyle}, ${colsPercentageArray}, ${JSON.stringify(backgroundColorA)}, ${JSON.stringify(backgroundColorB)})`;
    }
    return createWidget({
        widgetType: AjfWidgetType.PaginatedList,
        pageSize: pageSize,
        title: title,
        contentDefinition: {
            formula: formula,
        },
        exportable: true,
        styles: {
            height: '500px',
        },
    });
}
const _buildHeatmap = (_, json) => {
    const defaultFeatures = {
        type: 'FeatureCollection',
        features: [],
    };
    const options = {
        values: '[]',
        idProp: 'id',
        features: JSON.stringify(defaultFeatures),
        startColor: '#ffeb3b',
        endColor: '#f44336',
        highlightColor: '#009688',
        showVisualMap: false,
        ...(json.length > 0 ? json[0] : {}),
    };
    return createWidget({
        widgetType: AjfWidgetType.HeatMap,
        ...options,
        values: { formula: options.values },
        styles: {
            minHeight: '200px',
        },
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxzLXJlcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvcmVwb3J0cy9zcmMveGxzLXJlcG9ydC94bHMtcmVwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBYSxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMzRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFekMsT0FBTyxFQUFDLFFBQVEsRUFBYyxFQUFFLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ25DLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBRTdCLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUUzRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxFQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDakQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQzlELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQy9FLE9BQU8sRUFBa0IsWUFBWSxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0UsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBRy9ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQVE1RDs7R0FFRztBQUNILE1BQU0sVUFBVSxTQUFTLENBQUMsSUFBWSxFQUFFLElBQWdCO0lBQ3RELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUM7SUFDbkQs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Ii8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGb3JtdWxhLCBjcmVhdGVGb3JtdWxhfSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge0h0dHBDbGllbnR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7Zm9ya0pvaW4sIE9ic2VydmFibGUsIG9mfSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgKiBhcyBYTFNYIGZyb20gJ3hsc3gnO1xuXG5pbXBvcnQge2JhY2tncm91bmRDb2xvcn0gZnJvbSAnLi4vYXV0b21hdGljLXJlcG9ydC9zdHlsZXMnO1xuXG5pbXBvcnQge2luZGljYXRvclRvSnN9IGZyb20gJy4vaGluZGlraXQtcGFyc2VyJztcbmltcG9ydCB7aHRtbFdpZGdldCwgd2lkZ2V0U3R5bGV9IGZyb20gJy4vc3R5bGVzJztcbmltcG9ydCB7Y3JlYXRlRGF0YXNldH0gZnJvbSAnLi4vdXRpbHMvZGF0YXNldC9jcmVhdGUtZGF0YXNldCc7XG5pbXBvcnQge2NyZWF0ZVJlcG9ydENvbnRhaW5lcn0gZnJvbSAnLi4vdXRpbHMvcmVwb3J0cy9jcmVhdGUtcmVwb3J0LWNvbnRhaW5lcic7XG5pbXBvcnQge0FqZldpZGdldENyZWF0ZSwgY3JlYXRlV2lkZ2V0fSBmcm9tICcuLi91dGlscy93aWRnZXRzL2NyZWF0ZS13aWRnZXQnO1xuaW1wb3J0IHtBamZXaWRnZXRUeXBlfSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQtdHlwZSc7XG5pbXBvcnQge0FqZlRhYmxlRGF0YXNldH0gZnJvbSAnLi4vaW50ZXJmYWNlL2RhdGFzZXQvdGFibGUtZGF0YXNldCc7XG5pbXBvcnQge0FqZkNoYXJ0RGF0YXNldH0gZnJvbSAnLi4vaW50ZXJmYWNlL2RhdGFzZXQvY2hhcnQtZGF0YXNldCc7XG5pbXBvcnQge0FqZkNoYXJ0VHlwZX0gZnJvbSAnLi4vaW50ZXJmYWNlL2NoYXJ0cy9jaGFydC10eXBlJztcbmltcG9ydCB7QWpmV2lkZ2V0fSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQnO1xuaW1wb3J0IHtBamZSZXBvcnR9IGZyb20gJy4uL2ludGVyZmFjZS9yZXBvcnRzL3JlcG9ydCc7XG5pbXBvcnQge0FqZlJlcG9ydFZhcmlhYmxlfSBmcm9tICcuLi9pbnRlcmZhY2UvcmVwb3J0cy9yZXBvcnQtdmFyaWFibGUnO1xuaW1wb3J0IHtBamZMYXlvdXRXaWRnZXR9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzL2xheW91dC13aWRnZXQnO1xuaW1wb3J0IHtBamZDb2x1bW5XaWRnZXR9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzL2NvbHVtbi13aWRnZXQnO1xuaW1wb3J0IHtBamZHcmFwaE5vZGVEYXRhc2V0fSBmcm9tICcuLi9pbnRlcmZhY2UvZGF0YXNldC9ncmFwaC1kYXRhc2V0JztcblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGJ1aWxkcyBhIHJlcG9ydCBmcm9tIGFuIGV4Y2VsIGZpbGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB4bHNSZXBvcnQoZmlsZTogc3RyaW5nLCBodHRwOiBIdHRwQ2xpZW50KTogT2JzZXJ2YWJsZTxBamZSZXBvcnQ+IHtcbiAgY29uc3Qgd29ya2Jvb2sgPSBYTFNYLnJlYWQoZmlsZSwge3R5cGU6ICdiaW5hcnknfSk7XG4gIGNvbnN0IHJlcG9ydDogQWpmUmVwb3J0ID0ge307XG4gIGNvbnN0IHJlcG9ydFdpZGdldHM6IEFqZldpZGdldFtdID0gW107XG5cbiAgY29uc3QgdmFyaWFibGVzOiBBamZSZXBvcnRWYXJpYWJsZVtdID0gW107XG4gIGNvbnN0IGZpbHRlcnM6IHtbc2hlZXROYW1lOiBzdHJpbmddOiBPYnNlcnZhYmxlPGFueT59ID0ge307XG4gIC8vIGNyZWF0ZSBmaWx0ZXJzXG4gIHdvcmtib29rLlNoZWV0TmFtZXMuZm9yRWFjaCgoc2hlZXROYW1lLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHNoZWV0OiBYTFNYLldvcmtTaGVldCA9IHdvcmtib29rLlNoZWV0c1tzaGVldE5hbWVdO1xuICAgIGlmIChzaGVldE5hbWUuaW5jbHVkZXMoJ2ZpbHRlcicpICYmIGluZGV4ICsgMSA8IHdvcmtib29rLlNoZWV0TmFtZXMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBuZXh0U2hlZXQgPSBzaGVldE5hbWUuaW5jbHVkZXMoJ2dsb2JhbCcpXG4gICAgICAgID8gJ2dsb2JhbF9maWx0ZXInXG4gICAgICAgIDogd29ya2Jvb2suU2hlZXROYW1lc1tpbmRleCArIDFdO1xuICAgICAgZmlsdGVyc1tuZXh0U2hlZXRdID0gX2J1aWxkRmlsdGVyKHdvcmtib29rLCBzaGVldCwgaHR0cCk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBvYnNGaWx0ZXJWYWx1ZXM6IE9ic2VydmFibGU8YW55PltdID0gT2JqZWN0LnZhbHVlcyhmaWx0ZXJzKS5sZW5ndGhcbiAgICA/IE9iamVjdC52YWx1ZXMoZmlsdGVycylcbiAgICA6IFtvZih7fSldO1xuICBjb25zdCBmaWx0ZXJOYW1lczogc3RyaW5nW10gPSBPYmplY3Qua2V5cyhmaWx0ZXJzKTtcblxuICByZXR1cm4gZm9ya0pvaW4ob2JzRmlsdGVyVmFsdWVzKS5waXBlKFxuICAgIG1hcChmID0+IHtcbiAgICAgIHdvcmtib29rLlNoZWV0TmFtZXMuZm9yRWFjaChzaGVldE5hbWUgPT4ge1xuICAgICAgICBjb25zdCBzaGVldDogWExTWC5Xb3JrU2hlZXQgPSB3b3JrYm9vay5TaGVldHNbc2hlZXROYW1lXTtcbiAgICAgICAgY29uc3QganNvbiA9IFhMU1gudXRpbHMuc2hlZXRfdG9fanNvbihzaGVldCkgYXMge1trZXk6IHN0cmluZ106IHN0cmluZ31bXTtcbiAgICAgICAgaWYgKHNoZWV0TmFtZSA9PT0gJ3ZhcmlhYmxlcycpIHtcbiAgICAgICAgICBjb25zdCBqc29uVmFycyA9IGpzb24ubWFwKFxuICAgICAgICAgICAganNvblZhciA9PlxuICAgICAgICAgICAgICBqc29uVmFyIGFzIHVua25vd24gYXMge1xuICAgICAgICAgICAgICAgIG5hbWU6IHN0cmluZztcbiAgICAgICAgICAgICAgICB2YWx1ZTogc3RyaW5nO1xuICAgICAgICAgICAgICAgIGlzQUlQcm9tcHQ/OiBib29sZWFuO1xuICAgICAgICAgICAgICAgIF9fcm93TnVtX186IHN0cmluZztcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAganNvblZhcnNcbiAgICAgICAgICAgIC5maWx0ZXIoZSA9PiBlICE9IG51bGwgJiYgZS5uYW1lICE9IG51bGwgJiYgZS5uYW1lICE9PSAnJylcbiAgICAgICAgICAgIC5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgICBjb25zdCByID0gTnVtYmVyKGVsZW0uX19yb3dOdW1fXykgKyAxO1xuICAgICAgICAgICAgICBjb25zdCBuYW1lID0gU3RyaW5nKGVsZW0ubmFtZSkudHJpbSgpO1xuICAgICAgICAgICAgICBpZiAoIS9eW0EtWmEtel9dW0EtWmEtejAtOV9dKiQvLnRlc3QobmFtZSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtc2cgPSBgVmFyaWFibGUgbmFtZSBcIiR7bmFtZX1cIiAocm93ICR7cn0pIGlzIG5vdCBhIHZhbGlkIGlkZW50aWZpZXJgO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydChtc2cpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGxldCBqczogc3RyaW5nO1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGpzID0gaW5kaWNhdG9yVG9KcyhlbGVtLnZhbHVlKTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgICAgICAgICAgICBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGluIHZhcmlhYmxlIFwiJHtuYW1lfVwiIChyb3cgJHtyfSk6ICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFyaWFibGVzLnB1c2goe1xuICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgZm9ybXVsYToge2Zvcm11bGE6IGpzfSxcbiAgICAgICAgICAgICAgICBpc0FJUHJvbXB0OiBlbGVtLmlzQUlQcm9tcHQsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgaWR4ID0gZmlsdGVyTmFtZXMuaW5kZXhPZihzaGVldE5hbWUpO1xuXG4gICAgICAgICAgaWYgKHNoZWV0TmFtZS5pbmNsdWRlcygndGFibGUnKSkge1xuICAgICAgICAgICAgY29uc3QgdGFibGVXaWRnZXQgPSBfYnVpbGRUYWJsZShzaGVldE5hbWUsIGpzb24pO1xuICAgICAgICAgICAgcmVwb3J0V2lkZ2V0cy5wdXNoKHRhYmxlV2lkZ2V0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNoZWV0TmFtZS5pbmNsdWRlcygnY2hhcnQnKSkge1xuICAgICAgICAgICAgY29uc3QgY2hhcnRXaWRnZXQgPSBfYnVpbGRDaGFydChzaGVldE5hbWUsIGpzb24pO1xuICAgICAgICAgICAgcmVwb3J0V2lkZ2V0cy5wdXNoKGNoYXJ0V2lkZ2V0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNoZWV0TmFtZS5pbmNsdWRlcygnaW1hZ2UnKSkge1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VXaWRnZXQgPSBfYnVpbGRJbWFnZShzaGVldE5hbWUsIGpzb24pO1xuICAgICAgICAgICAgcmVwb3J0V2lkZ2V0cy5wdXNoKGltYWdlV2lkZ2V0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNoZWV0TmFtZS5pbmNsdWRlcygnaHRtbCcpKSB7XG4gICAgICAgICAgICBjb25zdCBjaGFydFdpZGdldCA9IF9idWlsZEh0bWwoanNvbik7XG4gICAgICAgICAgICByZXBvcnRXaWRnZXRzLnB1c2goY2hhcnRXaWRnZXQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2hlZXROYW1lLmluY2x1ZGVzKCdncmFwaCcpKSB7XG4gICAgICAgICAgICBjb25zdCBncmFwaFdpZGdldCA9IF9idWlsZEdyYXBoKHNoZWV0TmFtZSwganNvbik7XG4gICAgICAgICAgICByZXBvcnRXaWRnZXRzLnB1c2goZ3JhcGhXaWRnZXQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2hlZXROYW1lLmluY2x1ZGVzKCdoZWF0bWFwJykpIHtcbiAgICAgICAgICAgIGNvbnN0IGhlYXRtYXBXaWRnZXQgPSBfYnVpbGRIZWF0bWFwKHNoZWV0TmFtZSwganNvbik7XG4gICAgICAgICAgICByZXBvcnRXaWRnZXRzLnB1c2goaGVhdG1hcFdpZGdldCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzaGVldE5hbWUuaW5jbHVkZXMoJ3BhZ2luYXRlZGxpc3QnKSkge1xuICAgICAgICAgICAgY29uc3QgcGFnTGlzdFdpZGdldCA9IF9idWlsZFBhZ2luYXRlZExpc3RUYWJsZShzaGVldE5hbWUsIGpzb24pO1xuICAgICAgICAgICAgcmVwb3J0V2lkZ2V0cy5wdXNoKHBhZ0xpc3RXaWRnZXQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2hlZXROYW1lLmluY2x1ZGVzKCdwYWdpbmF0ZWREaWFsb2dMaXN0JykpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhZ0xpc3RXaWRnZXQgPSBfYnVpbGRQYWdpbmF0ZWRMaXN0VGFibGVXaXRoRGlhbG9nKHNoZWV0TmFtZSwganNvbik7XG4gICAgICAgICAgICByZXBvcnRXaWRnZXRzLnB1c2gocGFnTGlzdFdpZGdldCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzaGVldE5hbWUuaW5jbHVkZXMoJ3NpbmdsZScpKSB7XG4gICAgICAgICAgICBjb25zdCBzaW5nbGVXaWRnZXQgPSBfYnVpbGRTaW5nbGVJbmRpY2F0b3IoanNvbik7XG4gICAgICAgICAgICByZXBvcnRXaWRnZXRzLnB1c2goLi4uc2luZ2xlV2lkZ2V0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgICAgICAgIHJlcG9ydFdpZGdldHNbcmVwb3J0V2lkZ2V0cy5sZW5ndGggLSAxXS5maWx0ZXIgPSB7XG4gICAgICAgICAgICAgIHNjaGVtYTogZltpZHhdIGFzIGFueSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGdsb2JhbEZpbHRlcklkeCA9IGZpbHRlck5hbWVzLmluZGV4T2YoJ2dsb2JhbF9maWx0ZXInKTtcbiAgICAgIGNvbnN0IGxheW91dFdpZGdldDogQWpmTGF5b3V0V2lkZ2V0ID0ge1xuICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkxheW91dCxcbiAgICAgICAgY29udGVudDogW1xuICAgICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNvbHVtbixcbiAgICAgICAgICAgIGNvbnRlbnQ6IFsuLi5yZXBvcnRXaWRnZXRzXSxcbiAgICAgICAgICAgIGZpbHRlcjogZ2xvYmFsRmlsdGVySWR4ID49IDAgPyB7c2NoZW1hOiBmW2dsb2JhbEZpbHRlcklkeF19IDogdW5kZWZpbmVkLFxuICAgICAgICAgIH0gYXMgQWpmQ29sdW1uV2lkZ2V0KSxcbiAgICAgICAgXSxcbiAgICAgICAgY29sdW1uczogWzFdLFxuICAgICAgICB2aXNpYmlsaXR5OiB7XG4gICAgICAgICAgY29uZGl0aW9uOiAndHJ1ZScsXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlczoge30sXG4gICAgICB9O1xuXG4gICAgICByZXBvcnQudmFyaWFibGVzID0gdmFyaWFibGVzO1xuICAgICAgcmVwb3J0LmNvbnRlbnQgPSBjcmVhdGVSZXBvcnRDb250YWluZXIobGF5b3V0V2lkZ2V0KTtcblxuICAgICAgcmV0dXJuIHJlcG9ydDtcbiAgICB9KSxcbiAgKTtcbn1cblxuZnVuY3Rpb24gX2J1aWxkRmlsdGVyKFxuICB3Ym9vazogWExTWC5Xb3JrQm9vayxcbiAgc2hlZXQ6IFhMU1guV29ya1NoZWV0LFxuICBodHRwOiBIdHRwQ2xpZW50LFxuKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgY29uc3QgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICBjb25zdCBmaWx0ZXJCb29rOiBYTFNYLldvcmtCb29rID0gZGVlcENvcHkod2Jvb2spO1xuICBjb25zdCBmaWx0ZXJTaGVldDogWExTWC5Xb3JrU2hlZXQgPSBkZWVwQ29weShzaGVldCk7XG4gIGNvbnN0IGNob2ljZXNTaGVldDogWExTWC5Xb3JrU2hlZXQgPSBkZWVwQ29weSh3Ym9vay5TaGVldHNbJ2Nob2ljZXMnXSk7XG4gIGZpbHRlckJvb2suU2hlZXROYW1lcyA9IFsnc3VydmV5JywgJ2Nob2ljZXMnXTtcbiAgZmlsdGVyQm9vay5TaGVldHMgPSB7c3VydmV5OiBmaWx0ZXJTaGVldCwgY2hvaWNlczogY2hvaWNlc1NoZWV0fTtcbiAgY29uc3QgZmlsdGVyWGxzeCA9IFhMU1gud3JpdGUoZmlsdGVyQm9vaywge1xuICAgIGJvb2tUeXBlOiAneGxzeCcsXG4gICAgdHlwZTogJ2FycmF5JyxcbiAgfSk7XG4gIGNvbnN0IGZpbGUgPSBuZXcgRmlsZShbZmlsdGVyWGxzeF0sICdmaWx0ZXIueGxzeCcpO1xuICBkYXRhLmFwcGVuZCgnZXhjZWxGaWxlJywgZmlsZSk7XG5cbiAgcmV0dXJuIGh0dHAucG9zdCgnaHR0cHM6Ly9mb3JtY29udi5oZXJva3VhcHAuY29tL3Jlc3VsdC5qc29uJywgZGF0YSk7XG59XG5cbmZ1bmN0aW9uIGFsZXJ0QW5kVGhyb3coZXJyOiBzdHJpbmcpIHtcbiAgd2luZG93LmFsZXJ0KGVycik7XG4gIHRocm93IG5ldyBFcnJvcihlcnIpO1xufVxuXG5mdW5jdGlvbiBfYnVpbGRDaGFydChuYW1lOiBzdHJpbmcsIHNoZWV0OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfVtdKTogQWpmV2lkZ2V0IHtcbiAgaWYgKHNoZWV0ID09IG51bGwgfHwgc2hlZXQubGVuZ3RoID09PSAwKSB7XG4gICAgYWxlcnRBbmRUaHJvdygnRW1wdHkgc2hlZXQgZm9yIGNoYXJ0ICcgKyBuYW1lKTtcbiAgfVxuICBjb25zdCBkYXRhID0gc2hlZXRbMF07XG4gIGNvbnN0IG9wdGlvbnNOYW1lcyA9IFtcbiAgICAnY2hhcnRUeXBlJyxcbiAgICAndGl0bGUnLFxuICAgICdzdGFja2VkJyxcbiAgICAnYmVnaW5BdFplcm9YJyxcbiAgICAnYmVnaW5BdFplcm9ZJyxcbiAgICAnYXhpc0xhYmVsWCcsXG4gICAgJ2F4aXNMYWJlbFknLFxuICAgICdheGlzTWluWCcsXG4gICAgJ2F4aXNNaW5ZJyxcbiAgICAnYXhpc01heFgnLFxuICAgICdheGlzTWF4WScsXG4gICAgJ3JlbW92ZVplcm9WYWx1ZXMnLFxuICAgICdtYWluRGF0YU51bWJlclRocmVzaG9sZCcsXG4gIF07XG4gIGNvbnN0IG9wdGlvbnM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gIGZvciAoY29uc3QgbmFtZSBvZiBvcHRpb25zTmFtZXMpIHtcbiAgICBpZiAoZGF0YVtuYW1lXSAhPSBudWxsKSB7XG4gICAgICBvcHRpb25zW25hbWVdID0gZGF0YVtuYW1lXTtcbiAgICAgIGRlbGV0ZSBkYXRhW25hbWVdO1xuICAgIH1cbiAgfVxuICBjb25zdCB0eXBlID0gQWpmQ2hhcnRUeXBlW29wdGlvbnNbJ2NoYXJ0VHlwZSddIGFzIGFueV0gYXMgdW5rbm93biBhcyBBamZDaGFydFR5cGU7XG4gIGlmICh0eXBlID09IG51bGwpIHtcbiAgICBhbGVydEFuZFRocm93KCdJbnZhbGlkIGNoYXJ0IHR5cGUgZm9yIGNoYXJ0ICcgKyBuYW1lKTtcbiAgfVxuICBpZiAodHlwZSAhPT0gQWpmQ2hhcnRUeXBlLlNjYXR0ZXIgJiYgdHlwZSAhPT0gQWpmQ2hhcnRUeXBlLkJ1YmJsZSAmJiBzaGVldC5sZW5ndGggIT09IDEpIHtcbiAgICBhbGVydEFuZFRocm93KGBDaGFydCBcIiR7bmFtZX1cIiBtdXN0IGhhdmUgMSByb3cgb2YgZGF0YWApO1xuICB9XG4gIGlmICh0eXBlID09PSBBamZDaGFydFR5cGUuU2NhdHRlciAmJiBzaGVldC5sZW5ndGggIT09IDIpIHtcbiAgICBhbGVydEFuZFRocm93KGBTY2F0dGVyIGNoYXJ0IFwiJHtuYW1lfVwiIG11c3QgaGF2ZSAyIHJvd3Mgb2YgZGF0YWApO1xuICB9XG4gIGlmICh0eXBlID09PSBBamZDaGFydFR5cGUuQnViYmxlICYmIHNoZWV0Lmxlbmd0aCAhPT0gMykge1xuICAgIGFsZXJ0QW5kVGhyb3coYEJ1YmJsZSBjaGFydCBcIiR7bmFtZX1cIiBtdXN0IGhhdmUgMyByb3dzIG9mIGRhdGFgKTtcbiAgfVxuICBjb25zdCBsYWJlbHMgPSBkYXRhWydsYWJlbHMnXTtcbiAgbGV0IGxhYmVsc0Zvcm11bGE6IEFqZkZvcm11bGEgPSB7Zm9ybXVsYTogJ1tdJ307XG4gIGlmIChsYWJlbHMgIT0gbnVsbCkge1xuICAgIGRlbGV0ZSBkYXRhWydsYWJlbHMnXTtcbiAgICBsZXQgbGFiZWxzSnMgPSAnJztcbiAgICB0cnkge1xuICAgICAgbGFiZWxzSnMgPSBpbmRpY2F0b3JUb0pzKGxhYmVscyk7XG4gICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgIGFsZXJ0QW5kVGhyb3coYEVycm9yIGluIGxhYmVscyBvZiBjaGFydCAke25hbWV9OiAke2Vyci5tZXNzYWdlfWApO1xuICAgIH1cbiAgICBsYWJlbHNGb3JtdWxhID0ge2Zvcm11bGE6IGxhYmVsc0pzfTtcbiAgfVxuXG4gIGNvbnN0IHN0YWNrZWQgPSBCb29sZWFuKG9wdGlvbnNbJ3N0YWNrZWQnXSk7XG4gIGNvbnN0IGJlZ2luQXRaZXJvWCA9IEJvb2xlYW4ob3B0aW9uc1snYmVnaW5BdFplcm9YJ10pO1xuICBjb25zdCBiZWdpbkF0WmVyb1kgPSBCb29sZWFuKG9wdGlvbnNbJ2JlZ2luQXRaZXJvWSddKTtcbiAgY29uc3QgYXhpc0xhYmVsWCA9IG9wdGlvbnNbJ2F4aXNMYWJlbFgnXTtcbiAgY29uc3QgYXhpc0xhYmVsWSA9IG9wdGlvbnNbJ2F4aXNMYWJlbFknXTtcbiAgY29uc3QgYXhpc01pblggPSBvcHRpb25zWydheGlzTWluWCddO1xuICBjb25zdCBheGlzTWluWSA9IG9wdGlvbnNbJ2F4aXNNaW5ZJ107XG4gIGNvbnN0IGF4aXNNYXhYID0gb3B0aW9uc1snYXhpc01heFgnXTtcbiAgY29uc3QgYXhpc01heFkgPSBvcHRpb25zWydheGlzTWF4WSddO1xuICBjb25zdCByZW1vdmVaZXJvVmFsdWVzID0gQm9vbGVhbihvcHRpb25zWydyZW1vdmVaZXJvVmFsdWVzJ10pO1xuICBjb25zdCBtYWluRGF0YU51bWJlclRocmVzaG9sZCA9XG4gICAgK29wdGlvbnNbJ21haW5EYXRhTnVtYmVyVGhyZXNob2xkJ10gfHwgK29wdGlvbnNbJ21haW5EYXRhTnVtYmVyVGhyZXNob2xkJ10gPT09IDBcbiAgICAgID8gK29wdGlvbnNbJ21haW5EYXRhTnVtYmVyVGhyZXNob2xkJ11cbiAgICAgIDogMTA7XG5cbiAgY29uc3QgZGF0YXNldDogQWpmQ2hhcnREYXRhc2V0W10gPSBbXTtcbiAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5LCBpbmRleCkgPT4ge1xuICAgIGxldCB4cyA9ICcnO1xuICAgIHRyeSB7XG4gICAgICB4cyA9IGluZGljYXRvclRvSnMoZGF0YVtrZXldKTtcbiAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgYWxlcnRBbmRUaHJvdyhgRXJyb3IgaW4gWCBkYXRhIFwiJHtrZXl9XCIgb2YgY2hhcnQgXCIke25hbWV9XCI6ICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgfVxuICAgIGxldCB5cyA9ICcnO1xuICAgIGlmICh0eXBlID09PSBBamZDaGFydFR5cGUuU2NhdHRlciB8fCB0eXBlID09PSBBamZDaGFydFR5cGUuQnViYmxlKSB7XG4gICAgICB0cnkge1xuICAgICAgICB5cyA9IGluZGljYXRvclRvSnMoc2hlZXRbMV1ba2V5XSk7XG4gICAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgICBhbGVydEFuZFRocm93KGBFcnJvciBpbiBZIGRhdGEgXCIke2tleX1cIiBvZiBjaGFydCBcIiR7bmFtZX1cIjogJHtlcnIubWVzc2FnZX1gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IHJzID0gJ3VuZGVmaW5lZCc7XG4gICAgaWYgKHR5cGUgPT09IEFqZkNoYXJ0VHlwZS5CdWJibGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJzID0gaW5kaWNhdG9yVG9KcyhzaGVldFsyXVtrZXldKTtcbiAgICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICAgIGFsZXJ0QW5kVGhyb3coYEVycm9yIGluIHJhZGl1cyBkYXRhIFwiJHtrZXl9XCIgb2YgY2hhcnQgXCIke25hbWV9XCI6ICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBmb3JtdWxhOiBBamZGb3JtdWxhW107XG4gICAgaWYgKHR5cGUgPT09IEFqZkNoYXJ0VHlwZS5TY2F0dGVyIHx8IHR5cGUgPT09IEFqZkNoYXJ0VHlwZS5CdWJibGUpIHtcbiAgICAgIGZvcm11bGEgPSBbY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogYGJ1aWxkUG9pbnREYXRhKCR7eHN9LCAke3lzfSwgJHtyc30pYH0pXTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9ybXVsYSA9IFtjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiB4c30pXTtcbiAgICB9XG5cbiAgICBjb25zdCBtdWx0aXBsZUNvbG9ycyA9XG4gICAgICB0eXBlID09PSBBamZDaGFydFR5cGUuUGllIHx8XG4gICAgICB0eXBlID09PSBBamZDaGFydFR5cGUuUG9sYXJBcmVhIHx8XG4gICAgICB0eXBlID09PSBBamZDaGFydFR5cGUuRG91Z2hudXQ7XG4gICAgY29uc3QgY29sb3IgPSBtdWx0aXBsZUNvbG9ycyA/IGJhY2tncm91bmRDb2xvciA6IGJhY2tncm91bmRDb2xvcltpbmRleF07XG4gICAgY29uc3QgZGF0YXNldE9wdGlvbnM6IGFueSA9IHtiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yLCB0ZW5zaW9uOiAwfTtcbiAgICBpZiAodHlwZSA9PT0gQWpmQ2hhcnRUeXBlLkxpbmUgJiYgIXN0YWNrZWQpIHtcbiAgICAgIGRhdGFzZXRPcHRpb25zLmJhY2tncm91bmRDb2xvciA9ICd0cmFuc3BhcmVudCc7XG4gICAgICBkYXRhc2V0T3B0aW9ucy5ib3JkZXJDb2xvciA9IGNvbG9yO1xuICAgICAgZGF0YXNldE9wdGlvbnMucG9pbnRCYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcjtcbiAgICB9XG4gICAgZGF0YXNldC5wdXNoKHtcbiAgICAgIC4uLmNyZWF0ZURhdGFzZXQoe1xuICAgICAgICBhZ2dyZWdhdGlvbjoge2FnZ3JlZ2F0aW9uOiAwfSxcbiAgICAgICAgZm9ybXVsYSxcbiAgICAgICAgbGFiZWw6IGtleSxcbiAgICAgIH0pLFxuICAgICAgb3B0aW9uczogZGF0YXNldE9wdGlvbnMsXG4gICAgfSBhcyBBamZDaGFydERhdGFzZXQpO1xuICB9KTtcblxuICBjb25zdCBzY2FsZXM6IENoYXJ0LkNoYXJ0U2NhbGVzID0ge307XG4gIGlmIChzdGFja2VkIHx8IGJlZ2luQXRaZXJvWCB8fCBheGlzTWluWCAhPSBudWxsIHx8IGF4aXNNYXhYICE9IG51bGwgfHwgYXhpc0xhYmVsWCkge1xuICAgIGNvbnN0IGF4aXNYOiBDaGFydC5DaGFydFhBeGUgPSB7XG4gICAgICBzdGFja2VkLFxuICAgICAgdGlja3M6IHtiZWdpbkF0WmVybzogYmVnaW5BdFplcm9YfSxcbiAgICB9O1xuICAgIGlmIChheGlzTWluWCAhPSBudWxsKSB7XG4gICAgICBheGlzWC50aWNrcyEuc3VnZ2VzdGVkTWluID0gTnVtYmVyKGF4aXNNaW5YKTtcbiAgICB9XG4gICAgaWYgKGF4aXNNYXhYICE9IG51bGwpIHtcbiAgICAgIGF4aXNYLnRpY2tzIS5zdWdnZXN0ZWRNYXggPSBOdW1iZXIoYXhpc01heFgpO1xuICAgIH1cbiAgICBpZiAoYXhpc0xhYmVsWCkge1xuICAgICAgYXhpc1guc2NhbGVMYWJlbCA9IHtkaXNwbGF5OiB0cnVlLCBsYWJlbFN0cmluZzogYXhpc0xhYmVsWH07XG4gICAgfVxuICAgIHNjYWxlcy54QXhlcyA9IFtheGlzWF07XG4gIH1cbiAgaWYgKHN0YWNrZWQgfHwgYmVnaW5BdFplcm9ZIHx8IGF4aXNNaW5ZICE9IG51bGwgfHwgYXhpc01heFkgIT0gbnVsbCB8fCBheGlzTGFiZWxZKSB7XG4gICAgY29uc3QgYXhpc1k6IENoYXJ0LkNoYXJ0WUF4ZSA9IHtcbiAgICAgIHN0YWNrZWQsXG4gICAgICB0aWNrczoge2JlZ2luQXRaZXJvOiBzdGFja2VkIHx8IGJlZ2luQXRaZXJvWX0sXG4gICAgfTtcbiAgICBpZiAoYXhpc01pblkgIT0gbnVsbCkge1xuICAgICAgYXhpc1kudGlja3MhLnN1Z2dlc3RlZE1pbiA9IE51bWJlcihheGlzTWluWSk7XG4gICAgfVxuICAgIGlmIChheGlzTWF4WSAhPSBudWxsKSB7XG4gICAgICBheGlzWS50aWNrcyEuc3VnZ2VzdGVkTWF4ID0gTnVtYmVyKGF4aXNNYXhZKTtcbiAgICB9XG4gICAgaWYgKGF4aXNMYWJlbFkpIHtcbiAgICAgIGF4aXNZLnNjYWxlTGFiZWwgPSB7ZGlzcGxheTogdHJ1ZSwgbGFiZWxTdHJpbmc6IGF4aXNMYWJlbFl9O1xuICAgIH1cbiAgICBzY2FsZXMueUF4ZXMgPSBbYXhpc1ldO1xuICB9XG4gIHJldHVybiBjcmVhdGVXaWRnZXQoe1xuICAgIG5hbWUsXG4gICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5DaGFydCxcbiAgICB0eXBlLFxuICAgIGxhYmVsczogbGFiZWxzRm9ybXVsYSxcbiAgICBkYXRhc2V0LFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICBtYWludGFpbkFzcGVjdFJhdGlvOiB0cnVlLFxuICAgICAgbGVnZW5kOiB7ZGlzcGxheTogdHJ1ZSwgcG9zaXRpb246ICdib3R0b20nfSxcbiAgICAgIHRpdGxlOiB7XG4gICAgICAgIGRpc3BsYXk6IHRydWUsXG4gICAgICAgIHRleHQ6IG9wdGlvbnNbJ3RpdGxlJ10gfHwgJycsXG4gICAgICB9LFxuICAgICAgc2NhbGVzLFxuICAgIH0sXG4gICAgc3R5bGVzOiB7XG4gICAgICAuLi53aWRnZXRTdHlsZSxcbiAgICAgIC4uLnt3aWR0aDogJzEwMCUnLCBtYXhXaWR0aDogJzEwMDBweCcsIG1hcmdpbjogJzEwcHggYXV0byd9LFxuICAgIH0sXG4gICAgZXhwb3J0YWJsZTogdHJ1ZSxcbiAgICBtYWluRGF0YU51bWJlclRocmVzaG9sZDogbWFpbkRhdGFOdW1iZXJUaHJlc2hvbGQsXG4gICAgcmVtb3ZlWmVyb1ZhbHVlczogcmVtb3ZlWmVyb1ZhbHVlcyxcbiAgfSBhcyBBamZXaWRnZXRDcmVhdGUpO1xufVxuXG5mdW5jdGlvbiBfYnVpbGRHcmFwaChuYW1lOiBzdHJpbmcsIGpzb246IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9W10pOiBBamZXaWRnZXQge1xuICBjb25zdCBub2RlczogQWpmR3JhcGhOb2RlRGF0YXNldFtdID0gW107XG5cbiAganNvbi5mb3JFYWNoKHJvdyA9PiB7XG4gICAgY29uc3Qgcm93S2V5cyA9IE9iamVjdC5rZXlzKHJvdyk7XG4gICAgaWYgKHJvd0tleXMuaW5jbHVkZXMoJ2lkJykgJiYgcm93WydpZCddKSB7XG4gICAgICBjb25zdCByb3dJZCA9IHJvd1snaWQnXS50cmltKCkucmVwbGFjZSgvXCIvZywgJycpO1xuICAgICAgaWYgKHJvd0lkICYmIHJvd0lkLmxlbmd0aCkge1xuICAgICAgICBsZXQgZ3JhcGhOb2RlT2JqOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9O1xuICAgICAgICByb3dLZXlzLmZvckVhY2gocm93S2V5ID0+IHtcbiAgICAgICAgICBsZXQganM6IHN0cmluZztcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAganMgPSBpbmRpY2F0b3JUb0pzKHJvd1tyb3dLZXldKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgICAgICAgY29uc3Qgcm93TnVtID0gTnVtYmVyKHJvd1snX19yb3dOdW1fXyddKSArIDE7XG4gICAgICAgICAgICBlcnIgPSBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgIGBFcnJvciBpbiBcIiR7bmFtZX1cIiwgcm93ICR7cm93TnVtfSwgY29sdW1uIFwiJHtyb3dLZXl9XCI6ICR7ZXJyLm1lc3NhZ2V9YCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB3aW5kb3cuYWxlcnQoZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBncmFwaE5vZGVPYmpbcm93S2V5XSA9IGpzO1xuICAgICAgICB9KTtcbiAgICAgICAgZ3JhcGhOb2RlT2JqWydpZCddID0gcm93SWQ7XG4gICAgICAgIG5vZGVzLnB1c2goZ3JhcGhOb2RlT2JqIGFzIEFqZkdyYXBoTm9kZURhdGFzZXQpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGNyZWF0ZVdpZGdldCh7XG4gICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5HcmFwaCxcbiAgICBub2RlcyxcbiAgICBzdHlsZXM6IHt9LFxuICB9IGFzIEFqZldpZGdldENyZWF0ZSk7XG59XG5cbmZ1bmN0aW9uIF9idWlsZEltYWdlKHNoZWV0TmFtZTogc3RyaW5nLCByb3dzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfVtdKTogQWpmV2lkZ2V0IHtcbiAgaWYgKHJvd3MubGVuZ3RoID09PSAwIHx8ICFyb3dzWzBdWyd1cmwnXSkge1xuICAgIGNvbnN0IG1zZyA9IGBJbWFnZSBcIiR7c2hlZXROYW1lfVwiIGhhcyBubyB1cmxgO1xuICAgIHdpbmRvdy5hbGVydChtc2cpO1xuICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICB9XG4gIGNvbnN0IHJvdyA9IHJvd3NbMF07XG4gIGxldCB1cmxGb3JtdWxhID0gU3RyaW5nKHJvd1sndXJsJ10pO1xuICBpZiAodXJsRm9ybXVsYS5zdGFydHNXaXRoKCdqczonKSkge1xuICAgIHVybEZvcm11bGEgPSB1cmxGb3JtdWxhLnNsaWNlKDMpLnRyaW0oKTtcbiAgfSBlbHNlIHtcbiAgICB1cmxGb3JtdWxhID0gYFwiJHt1cmxGb3JtdWxhfVwiYDtcbiAgfVxuICBjb25zdCBhbGlnbiA9IChyb3dbJ2FsaWduJ10gfHwgJycpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBzdHlsZXM6IGFueSA9IHt9O1xuICBpZiAoYWxpZ24gPT09ICdsZWZ0JyB8fCBhbGlnbiA9PT0gJ2NlbnRlcicpIHtcbiAgICBzdHlsZXMubWFyZ2luUmlnaHQgPSAnYXV0byc7XG4gIH1cbiAgaWYgKGFsaWduID09PSAncmlnaHQnIHx8IGFsaWduID09PSAnY2VudGVyJykge1xuICAgIHN0eWxlcy5tYXJnaW5MZWZ0ID0gJ2F1dG8nO1xuICB9XG4gIGlmIChyb3dbJ3dpZHRoJ10pIHtcbiAgICBzdHlsZXMud2lkdGggPSByb3dbJ3dpZHRoJ107XG4gIH1cbiAgaWYgKHJvd1snaGVpZ2h0J10pIHtcbiAgICBzdHlsZXMuaGVpZ2h0ID0gcm93WydoZWlnaHQnXTtcbiAgfVxuICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkltYWdlLFxuICAgIGltYWdlVHlwZTogMCxcbiAgICB1cmw6IHtmb3JtdWxhOiB1cmxGb3JtdWxhfSxcbiAgICBzdHlsZXMsXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfYnVpbGRIdG1sKGpzb246IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9W10pOiBBamZXaWRnZXQge1xuICBjb25zdCBmaXJzdFJvdyA9IGpzb24ubGVuZ3RoID4gMCAmJiBqc29uWzBdWydodG1sJ10gIT0gbnVsbCA/IGpzb25bMF0gOiB7aHRtbDogJyd9O1xuXG4gIHJldHVybiBjcmVhdGVXaWRnZXQoe1xuICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICBodG1sVGV4dDogU3RyaW5nKGZpcnN0Um93WydodG1sJ10pLFxuICAgIHN0eWxlczogaHRtbFdpZGdldCxcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldFRyZW5kV2lkZ2V0KFxuICB2YWx1ZTogc3RyaW5nIHwgbnVsbCxcbiAgY29sb3I6IHN0cmluZyxcbiAgY29uZGl0aW9uOiBzdHJpbmcsXG4gIGljb246IHN0cmluZyxcbik6IEFqZldpZGdldCB7XG4gIGxldCBwZXJjVmFsdWUgPSBgW1ske3ZhbHVlfV1dJWA7XG4gIGlmICghdmFsdWUpIHtcbiAgICBwZXJjVmFsdWUgPSAnJztcbiAgfVxuICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgaHRtbFRleHQ6IGA8aSBjbGFzcz1cXFwibWF0ZXJpYWwtaWNvbnNcXFwiIHN0eWxlPVxcXCJ2ZXJ0aWNhbC1hbGlnbjogYm90dG9tOyBjb2xvcjogJHtjb2xvcn1cXFwiPiR7aWNvbn08L2k+PHNwYW4gc3R5bGU9XFxcImNvbG9yOiAke2NvbG9yfVxcXCI+JHtwZXJjVmFsdWV9PC9zcGFuPmAsXG4gICAgc3R5bGVzOiB7XG4gICAgICAuLi5odG1sV2lkZ2V0LFxuICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgZm9udFNpemU6ICcxNnB4JyxcbiAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICB9LFxuICAgIHZpc2liaWxpdHk6IHtcbiAgICAgIGNvbmRpdGlvbjogY29uZGl0aW9uLFxuICAgIH0sXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfYnVpbGRTaW5nbGVJbmRpY2F0b3IoanNvbjoge1trZXk6IHN0cmluZ106IHN0cmluZ31bXSk6IEFqZldpZGdldFtdIHtcbiAgY29uc3QgaW5kaWNhdG9yV2lkZ2V0czogQWpmV2lkZ2V0W10gPSBbXTtcbiAgY29uc3QgZmlyc3RSb3cgPSBqc29uLmxlbmd0aCA+IDAgJiYganNvblswXVsnaHRtbCddICE9IG51bGwgPyBqc29uWzBdIDoge2h0bWw6ICcnfTtcblxuICBpbmRpY2F0b3JXaWRnZXRzLnB1c2goXG4gICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgIGh0bWxUZXh0OiBTdHJpbmcoZmlyc3RSb3dbJ2h0bWwnXSksXG4gICAgICBzdHlsZXM6IHtcbiAgICAgICAgLi4uaHRtbFdpZGdldCxcbiAgICAgICAgbWFyZ2luQm90dG9tOiAnMCcsXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgIH0sXG4gICAgfSksXG4gICk7XG5cbiAgbGV0IHNob3dUcmVuZCA9IGZhbHNlO1xuICBsZXQgbWFyZ2luQm90dG9tID0gJzEwcHgnO1xuICBpZiAoZmlyc3RSb3dbJ3BlcmNlbnRhZ2VfY2hhbmdlJ10pIHtcbiAgICBzaG93VHJlbmQgPSB0cnVlO1xuICAgIG1hcmdpbkJvdHRvbSA9ICcwJztcbiAgfVxuICBpbmRpY2F0b3JXaWRnZXRzLnB1c2goXG4gICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgIGh0bWxUZXh0OiAnW1snICsgU3RyaW5nKGZpcnN0Um93WydjdXJyZW50X3ZhbHVlJ10pICsgJ11dJyxcbiAgICAgIHN0eWxlczoge1xuICAgICAgICAuLi5odG1sV2lkZ2V0LFxuICAgICAgICBtYXJnaW5Cb3R0b20sXG4gICAgICAgIGZvbnRTaXplOiAnOTBweCcsXG4gICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgbGluZUhlaWdodDogJzEnLFxuICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICB9LFxuICAgIH0pLFxuICApO1xuXG4gIGlmIChzaG93VHJlbmQpIHtcbiAgICBpbmRpY2F0b3JXaWRnZXRzLnB1c2goXG4gICAgICBnZXRUcmVuZFdpZGdldChcbiAgICAgICAgU3RyaW5nKGZpcnN0Um93WydwZXJjZW50YWdlX2NoYW5nZSddKSxcbiAgICAgICAgJ3JlZCcsXG4gICAgICAgIGAke1N0cmluZyhmaXJzdFJvd1sncGVyY2VudGFnZV9jaGFuZ2UnXSl9IDwgMGAsXG4gICAgICAgICd0cmVuZGluZ19kb3duJyxcbiAgICAgICksXG4gICAgKTtcblxuICAgIGluZGljYXRvcldpZGdldHMucHVzaChcbiAgICAgIGdldFRyZW5kV2lkZ2V0KFxuICAgICAgICBTdHJpbmcoZmlyc3RSb3dbJ3BlcmNlbnRhZ2VfY2hhbmdlJ10pLFxuICAgICAgICAnZ3JlZW4nLFxuICAgICAgICBgJHtTdHJpbmcoZmlyc3RSb3dbJ3BlcmNlbnRhZ2VfY2hhbmdlJ10pfSA+IDBgLFxuICAgICAgICAndHJlbmRpbmdfdXAnLFxuICAgICAgKSxcbiAgICApO1xuXG4gICAgaW5kaWNhdG9yV2lkZ2V0cy5wdXNoKFxuICAgICAgZ2V0VHJlbmRXaWRnZXQoXG4gICAgICAgIFN0cmluZyhmaXJzdFJvd1sncGVyY2VudGFnZV9jaGFuZ2UnXSksXG4gICAgICAgICdvcmFuZ2UnLFxuICAgICAgICBgJHtTdHJpbmcoZmlyc3RSb3dbJ3BlcmNlbnRhZ2VfY2hhbmdlJ10pfSA9PSAwYCxcbiAgICAgICAgJ3RyZW5kaW5nX2ZsYXQnLFxuICAgICAgKSxcbiAgICApO1xuXG4gICAgaW5kaWNhdG9yV2lkZ2V0cy5wdXNoKFxuICAgICAgZ2V0VHJlbmRXaWRnZXQobnVsbCwgJ29yYW5nZScsIGAke1N0cmluZyhmaXJzdFJvd1sncGVyY2VudGFnZV9jaGFuZ2UnXSl9ID09PSAnLSdgLCAncmVtb3ZlJyksXG4gICAgKTtcbiAgfVxuICByZXR1cm4gaW5kaWNhdG9yV2lkZ2V0cztcbn1cblxuZnVuY3Rpb24gaGVhZGVyRm9ybXVsYShzOiBzdHJpbmcpOiBBamZGb3JtdWxhIHtcbiAgcyA9IFN0cmluZyhzKTtcbiAgaWYgKHMuc3RhcnRzV2l0aCgnanM6JykpIHtcbiAgICByZXR1cm4ge2Zvcm11bGE6IHMuc2xpY2UoMykudHJpbSgpfTtcbiAgfVxuICAvLyBxdW90ZSBzXG4gIHJldHVybiB7Zm9ybXVsYTogSlNPTi5zdHJpbmdpZnkocyl9O1xufVxuXG5mdW5jdGlvbiBfYnVpbGRUYWJsZShcbiAgc2hlZXROYW1lOiBzdHJpbmcsXG4gIGpzb246IHtba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFufVtdLFxuKTogQWpmV2lkZ2V0IHtcbiAgbGV0IHRhYmxlSGVhZGVyOiBBamZUYWJsZURhdGFzZXRbXSA9IFtdO1xuICBsZXQgZGF0YVJvd3MgPSAnW10nO1xuICBsZXQgZm9ybXVsYSA9ICcnO1xuICBsZXQgcGFnZVNpemUgPSAxMDtcbiAgbGV0IHBhZ2luYXRpb24gPSBmYWxzZTtcbiAgaWYgKGpzb24ubGVuZ3RoID4gMSkge1xuICAgIGNvbnN0IHJvd3NwYW4gPSAxO1xuICAgIGNvbnN0IHRpdGxlcyA9IE9iamVjdC5rZXlzKGpzb25bMF0pO1xuICAgIGNvbnN0IGNvbHNwYW5Sb3dWYWx1ZXMgPSBPYmplY3QudmFsdWVzKGpzb25bMF0pLm1hcCh2ID0+ICh2ID8gdi50b1N0cmluZygpIDogJycpKTtcbiAgICBjb25zdCBjb2xzcGFuczogbnVtYmVyW10gPSBjb2xzcGFuUm93VmFsdWVzLm1hcChyID0+ICtyLmNoYXJBdCgwKSk7XG4gICAgY29uc3QgdGV4dEFsaWduOiBzdHJpbmdbXSA9IGNvbHNwYW5Sb3dWYWx1ZXMubWFwKHIgPT4ge1xuICAgICAgc3dpdGNoIChyLmNoYXJBdCgxKSkge1xuICAgICAgICBjYXNlICdsJzpcbiAgICAgICAgICByZXR1cm4gJ2xlZnQnO1xuICAgICAgICBjYXNlICdyJzpcbiAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gJ2NlbnRlcic7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3Qgc29ydENvbHM6IGJvb2xlYW5bXSA9IGNvbHNwYW5Sb3dWYWx1ZXMubWFwKHIgPT5cbiAgICAgIHIuY2hhckF0KDIpICYmIHIuY2hhckF0KDIpID09PSAncycgPyB0cnVlIDogZmFsc2UsXG4gICAgKTtcbiAgICB0YWJsZUhlYWRlciA9IHRpdGxlcy5tYXAoKHRpdGxlLCBpbmRleCkgPT4gKHtcbiAgICAgIGxhYmVsOiAnJyxcbiAgICAgIGZvcm11bGE6IGhlYWRlckZvcm11bGEodGl0bGUpLFxuICAgICAgYWdncmVnYXRpb246IHthZ2dyZWdhdGlvbjogMH0sXG4gICAgICBjb2xzcGFuOiBjb2xzcGFuc1tpbmRleF0sXG4gICAgICByb3dzcGFuLFxuICAgICAgc29ydGVkOiBzb3J0Q29sc1tpbmRleF0sXG4gICAgICBzdHlsZToge1xuICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjM2Y1MWI1JyxcbiAgICAgICAgYm9yZGVyQm90dG9tOiAnMnB4IHNvbGlkICNkZGQnLFxuICAgICAgfSxcbiAgICB9KSk7XG4gICAgcGFnaW5hdGlvbiA9IGpzb25bMV1bJ3BhZ2luYXRpb24nXSA/IChqc29uWzFdWydwYWdpbmF0aW9uJ10gYXMgYm9vbGVhbikgOiBmYWxzZTtcblxuICAgIGlmICgnZGF0YXNldCcgaW4ganNvblsxXSkge1xuICAgICAgY29uc3QgZGlhbG9nRmllbGRzID0ganNvblsxXVsnZGlhbG9nX2ZpZWxkcyddXG4gICAgICAgID8gKGpzb25bMV1bJ2RpYWxvZ19maWVsZHMnXSBhcyBzdHJpbmcpLnNwbGl0KCcsJykubWFwKHYgPT4gdi50cmltKCkpXG4gICAgICAgIDogW107XG4gICAgICBjb25zdCBkaWFsb2dMYWJlbEZpZWxkcyA9IGpzb25bMV1bJ2RpYWxvZ19maWVsZHNfbGFiZWxzJ11cbiAgICAgICAgPyAoanNvblsxXVsnZGlhbG9nX2ZpZWxkc19sYWJlbHMnXSBhcyBzdHJpbmcpLnNwbGl0KCcsJykubWFwKHYgPT4gdi50cmltKCkpXG4gICAgICAgIDogW107XG4gICAgICBmb3JtdWxhID0gX2J1aWxkRm9ybUxpc3RUYWJsZShqc29uLCBjb2xzcGFucywgdGV4dEFsaWduLCBkaWFsb2dGaWVsZHMsIGRpYWxvZ0xhYmVsRmllbGRzKTtcbiAgICAgIGlmIChkaWFsb2dGaWVsZHMgJiYgZGlhbG9nRmllbGRzLmxlbmd0aCkge1xuICAgICAgICB0YWJsZUhlYWRlci5wdXNoKHtcbiAgICAgICAgICBsYWJlbDogJycsXG4gICAgICAgICAgZm9ybXVsYToge2Zvcm11bGE6IGBcIiBcImB9LFxuICAgICAgICAgIGFnZ3JlZ2F0aW9uOiB7YWdncmVnYXRpb246IDB9LFxuICAgICAgICAgIGNvbHNwYW46IDEsXG4gICAgICAgICAgcm93c3BhbixcbiAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzNmNTFiNScsXG4gICAgICAgICAgICBib3JkZXJCb3R0b206ICcycHggc29saWQgI2RkZCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSBqc29uWzBdO1xuICAgICAgZGF0YVJvd3MgPSAnWyc7XG4gICAgICBqc29uLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgbGV0IGRhdGFSb3cgPSAnWyc7XG4gICAgICAgIHRpdGxlcy5mb3JFYWNoKHRpdGxlID0+IHtcbiAgICAgICAgICBsZXQgZWxlbSA9IHJvd1t0aXRsZV0gfHwgYCcnYDtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZWxlbSA9IGluZGljYXRvclRvSnMoZWxlbSBhcyBzdHJpbmcpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICAgICAgICBjb25zdCByb3dOdW0gPSBOdW1iZXIocm93WydfX3Jvd051bV9fJ10pICsgMTtcbiAgICAgICAgICAgIGVyciA9IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgYEVycm9yIGluIFwiJHtzaGVldE5hbWV9XCIsIHJvdyAke3Jvd051bX0sIGNvbHVtbiBcIiR7dGl0bGV9XCI6ICR7ZXJyLm1lc3NhZ2V9YCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB3aW5kb3cuYWxlcnQoZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhUm93ICs9IGVsZW0gKyAnLCc7XG4gICAgICAgIH0pO1xuICAgICAgICBkYXRhUm93ICs9ICddJztcbiAgICAgICAgZGF0YVJvd3MgKz0gZGF0YVJvdyArICcsJztcbiAgICAgIH0pO1xuICAgICAgZGF0YVJvd3MgKz0gJ10nO1xuICAgICAgZm9ybXVsYSA9IGBidWlsZEFsaWduZWREYXRhc2V0KHBsYWluQXJyYXkoJHtkYXRhUm93c30pLCR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgIGNvbHNwYW5zLFxuICAgICAgKX0sJHtKU09OLnN0cmluZ2lmeSh0ZXh0QWxpZ24pfSlgO1xuICAgIH1cbiAgfVxuXG4gIGlmIChwYWdpbmF0aW9uKSB7XG4gICAgcmV0dXJuIGNyZWF0ZVdpZGdldCh7XG4gICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlBhZ2luYXRlZFRhYmxlLFxuICAgICAgcGFnZVNpemU6IHBhZ2VTaXplLFxuICAgICAgcm93RGVmaW5pdGlvbjoge1xuICAgICAgICBmb3JtdWxhOiBmb3JtdWxhLFxuICAgICAgfSxcbiAgICAgIGRhdGFzZXQ6IHRhYmxlSGVhZGVyLFxuICAgICAgZXhwb3J0YWJsZTogdHJ1ZSxcbiAgICAgIGNlbGxTdHlsZXM6IHtcbiAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3doaXRlJyxcbiAgICAgIH0sXG4gICAgICBzdHlsZXM6IHtcbiAgICAgICAgYm9yZGVyQ29sbGFwc2U6ICdjb2xsYXBzZScsXG4gICAgICB9LFxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjcmVhdGVXaWRnZXQoe1xuICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5EeW5hbWljVGFibGUsXG4gICAgICByb3dEZWZpbml0aW9uOiB7XG4gICAgICAgIGZvcm11bGE6IGZvcm11bGEsXG4gICAgICB9LFxuICAgICAgZGF0YXNldDogdGFibGVIZWFkZXIsXG4gICAgICBleHBvcnRhYmxlOiB0cnVlLFxuICAgICAgY2VsbFN0eWxlczoge1xuICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnd2hpdGUnLFxuICAgICAgfSxcbiAgICAgIHN0eWxlczoge1xuICAgICAgICBib3JkZXJDb2xsYXBzZTogJ2NvbGxhcHNlJyxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBmb3JtdWxhIGZvciBhIGR5bmFtaWMgdGFibGUgd2lkZ2V0LCBiYXNlZCBvbiBhIGxpc3Qgb2YgRm9ybXNcbiAqIEBwYXJhbSBqc29uXG4gKiBAcmV0dXJucyB0aGUgZm9ybXVsYSBmb3IgdGhlIER5bmFtaWNUYWJsZSBBamZXaWRnZXQsIGxpa2UgdGhpczpcbiAqIGJ1aWxkRm9ybURhdGFzZXQocHJvamVjdHNEYXRhc2V0LCBbJ2lkX3AnLCdkb25vcnMnLCdidWRnZXQnLCdkaW5vX2FyZWFfbmFtZScsJ2NhbGNfcHJvZ3Jlc3MnLF0pXCJcbiAqL1xuZnVuY3Rpb24gX2J1aWxkRm9ybUxpc3RUYWJsZShcbiAganNvbjoge1trZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW59W10sXG4gIGNvbHNwYW5zOiBudW1iZXJbXSxcbiAgdGV4dEFsaWduOiBzdHJpbmdbXSxcbiAgZGlhbG9nRmllbGRzOiBzdHJpbmdbXSxcbiAgZGlhbG9nTGFiZWxGaWVsZHM6IHN0cmluZ1tdLFxuKTogc3RyaW5nIHtcbiAgbGV0IGZvcm11bGEgPSAnJztcbiAgaWYgKGpzb24ubGVuZ3RoID4gMSkge1xuICAgIGxldCBmaWVsZHMgPSAnWyc7XG4gICAgT2JqZWN0LmtleXMoanNvblswXSkuZm9yRWFjaChmaWVsZENvbE5hbWUgPT4ge1xuICAgICAgbGV0IGVsZW0gPSBqc29uWzFdW2ZpZWxkQ29sTmFtZV0gPyBgJyR7anNvblsxXVtmaWVsZENvbE5hbWVdfSdgIDogYCcnYDtcbiAgICAgIGZpZWxkcyArPSBlbGVtICsgJywnO1xuICAgIH0pO1xuICAgIGZpZWxkcyArPSAnXSc7XG4gICAgY29uc3QgZGF0YXNldCA9IGpzb25bMV1bJ2RhdGFzZXQnXSBhcyBzdHJpbmc7XG4gICAgY29uc3QgbGlua0ZpZWxkID0ganNvblsxXVsnbGlua19maWVsZCddIGFzIHN0cmluZztcbiAgICBjb25zdCBsaW5rUG9zID0ganNvblsxXVsnbGlua19wb3NpdGlvbiddID8gK2pzb25bMV1bJ2xpbmtfcG9zaXRpb24nXSA6IDA7XG4gICAgY29uc3Qgcm93TGluayA9XG4gICAgICBsaW5rRmllbGQgJiYgbGlua0ZpZWxkLmxlbmd0aCA/IGB7J2xpbmsnOiAnJHtsaW5rRmllbGR9JywgJ3Bvc2l0aW9uJzogJHtsaW5rUG9zfX1gIDogbnVsbDtcblxuICAgIGZvcm11bGEgPSBgYnVpbGRBbGlnbmVkRm9ybURhdGFzZXQoJHtkYXRhc2V0fSwgJHtmaWVsZHN9LCAke0pTT04uc3RyaW5naWZ5KFxuICAgICAgY29sc3BhbnMsXG4gICAgKX0sICR7SlNPTi5zdHJpbmdpZnkodGV4dEFsaWduKX0sICR7cm93TGlua30sICR7SlNPTi5zdHJpbmdpZnkoZGlhbG9nRmllbGRzKX0sICR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICBkaWFsb2dMYWJlbEZpZWxkcyxcbiAgICApfSlgO1xuICB9XG4gIHJldHVybiBmb3JtdWxhO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIHdpZGdldCB3aXRoIGEgZHluYW1pYyBwYWdpbmF0ZWQgdGFibGUgYmFzZWQgb24gYSBsaXN0IG9mIEZvcm1zLiBFYWNoIHJvdyBpcyBhbiBBamZUYWJsZS5cbiAqIEBwYXJhbSBzaGVldE5hbWVcbiAqIEBwYXJhbSBqc29uXG4gKiBAcmV0dXJucyBhIFBhZ2luYXRlZCBBamZXaWRnZXQgd2l0aCBhIGZvcm11bGEgbGlrZSB0aGlzOlxuICogYnVpbGRXaWRnZXREYXRhc2V0KHByb2plY3RzRGF0YXNldCwgWydpZF9wJywnZG9ub3JzJywnYnVkZ2V0JywnZGlub19hcmVhX25hbWUnLCdjYWxjX3Byb2dyZXNzJywnaG9tZV9saW5rX3RleHQnLF0sXG4gKiAgIHsnbGluayc6ICdob21lX2xpbmsnLCAncG9zaXRpb24nOiA1fSwgeydib3JkZXInOiAnbm9uZSd9LHsnd2lkdGgnOiAnOTAwcHgnfSwgWycxMCUnLCczMCUnLCcxMCUnLCcyNSUnLCcxNSUnLCcxMCUnXSwgXFxcIiNmMGYwZjBcXFwiLCBcXFwid2hpdGVcXFwiKVwiXG4gKi9cbmZ1bmN0aW9uIF9idWlsZFBhZ2luYXRlZExpc3RUYWJsZShfOiBzdHJpbmcsIGpzb246IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9W10pOiBBamZXaWRnZXQge1xuICBsZXQgZm9ybXVsYSA9ICcnO1xuICBsZXQgcGFnZVNpemUgPSAxMDtcbiAgbGV0IGRhdGFzZXQ6IHN0cmluZyA9ICcnO1xuICBsZXQgdGl0bGUgPSAnJztcbiAgaWYgKGpzb24ubGVuZ3RoID4gMSkge1xuICAgIGNvbnN0IGNvbHNQZXJjZW50YWdlOiBzdHJpbmcgPSAoT2JqZWN0LnZhbHVlcyhqc29uWzBdKSBhcyBzdHJpbmdbXSlcbiAgICAgIC5tYXAociA9PiBgJyR7cn0lJ2ApXG4gICAgICAuam9pbignLCcpO1xuICAgIGNvbnN0IGNvbHNQZXJjZW50YWdlQXJyYXkgPSBgWyR7Y29sc1BlcmNlbnRhZ2V9XWA7XG5cbiAgICBsZXQgZmllbGRzID0gJ1snO1xuICAgIE9iamVjdC5rZXlzKGpzb25bMF0pLmZvckVhY2goZmllbGRDb2xOYW1lID0+IHtcbiAgICAgIGxldCBlbGVtID0ganNvblsxXVtmaWVsZENvbE5hbWVdID8gYCcke2pzb25bMV1bZmllbGRDb2xOYW1lXX0nYCA6IGAnJ2A7XG4gICAgICBmaWVsZHMgKz0gZWxlbSArICcsJztcbiAgICB9KTtcbiAgICBmaWVsZHMgKz0gJ10nO1xuXG4gICAgZGF0YXNldCA9IGpzb25bMV1bJ2RhdGFzZXQnXSBhcyBzdHJpbmc7XG4gICAgdGl0bGUgPSBqc29uWzFdWyd0aXRsZSddIGFzIHN0cmluZztcbiAgICBwYWdlU2l6ZSA9IGpzb25bMV1bJ3BhZ2VTaXplJ10gPyAranNvblsxXVsncGFnZVNpemUnXSA6IDEwO1xuICAgIGNvbnN0IGxpbmtGaWVsZCA9IGpzb25bMV1bJ2xpbmtfZmllbGQnXSBhcyBzdHJpbmc7XG4gICAgY29uc3QgbGlua1BvcyA9IGpzb25bMV1bJ2xpbmtfcG9zaXRpb24nXSA/ICtqc29uWzFdWydsaW5rX3Bvc2l0aW9uJ10gOiAwO1xuICAgIGNvbnN0IHJvd0xpbmsgPVxuICAgICAgbGlua0ZpZWxkICYmIGxpbmtGaWVsZC5sZW5ndGggPyBgeydsaW5rJzogJyR7bGlua0ZpZWxkfScsICdwb3NpdGlvbic6ICR7bGlua1Bvc319YCA6IG51bGw7XG4gICAgY29uc3QgY2VsbFN0eWxlcyA9IGpzb25bMV1bJ2NlbGxTdHlsZXMnXTtcbiAgICBjb25zdCByb3dTdHlsZSA9IGpzb25bMV1bJ3Jvd1N0eWxlJ107XG4gICAgY29uc3QgYmFja2dyb3VuZENvbG9yQSA9IGpzb25bMV1bJ2JhY2tncm91bmRDb2xvckEnXSBhcyBzdHJpbmc7XG4gICAgY29uc3QgYmFja2dyb3VuZENvbG9yQiA9IGpzb25bMV1bJ2JhY2tncm91bmRDb2xvckInXSBhcyBzdHJpbmc7XG5cbiAgICBmb3JtdWxhID1cbiAgICAgIGBidWlsZFdpZGdldERhdGFzZXQoJHtkYXRhc2V0fSwgJHtmaWVsZHN9LCAke3Jvd0xpbmt9LCAke2NlbGxTdHlsZXN9LGAgK1xuICAgICAgYCR7cm93U3R5bGV9LCAke2NvbHNQZXJjZW50YWdlQXJyYXl9LCAke0pTT04uc3RyaW5naWZ5KGJhY2tncm91bmRDb2xvckEpfSwgJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgYmFja2dyb3VuZENvbG9yQixcbiAgICAgICl9KWA7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZVdpZGdldCh7XG4gICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5QYWdpbmF0ZWRMaXN0LFxuICAgIHBhZ2VTaXplOiBwYWdlU2l6ZSxcbiAgICB0aXRsZTogdGl0bGUsXG4gICAgY29udGVudERlZmluaXRpb246IHtcbiAgICAgIGZvcm11bGE6IGZvcm11bGEsXG4gICAgfSxcbiAgICBleHBvcnRhYmxlOiB0cnVlLFxuICAgIHN0eWxlczoge1xuICAgICAgaGVpZ2h0OiAnNTAwcHgnLFxuICAgIH0sXG4gIH0pO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIHdpZGdldCB3aXRoIGEgZHluYW1pYyBwYWdpbmF0ZWQgdGFibGUgYmFzZWQgb24gYSBsaXN0IG9mIEZvcm1zLiBFYWNoIHJvdyBpcyBhbiBBamZEaWFsb2dXaWRnZXQgd2l0aCBhbiBBamZUYWJsZVxuICogdGhhdCBvcGVuLCBvbiBjbGljaywgYSBkaWFsb2cuXG4gKiBAcGFyYW0gc2hlZXROYW1lXG4gKiBAcGFyYW0ganNvblxuICogQHJldHVybnMgYSBQYWdpbmF0ZWQgQWpmV2lkZ2V0IHdpdGggYSBmb3JtdWxhIGxpa2UgdGhpczpcbiAqIGJ1aWxkV2lkZ2V0RGF0YXNldFdpdGhEaWFsb2cocHJvamVjdHNEYXRhc2V0LCBbJ2lkX3AnLCdkb25vcnMnLCdwcm92aW5jZV9jaG9pY2VzTGFiZWwnLCdkaW5vX2FyZWFfbmFtZScsJ2NhbGNfcHJvZ3Jlc3MnLCdob21lX2xpbmtfdGV4dCcsXSxcbiAqICBbJ2lkX3AnLCdkb25vcnMnLCdwcm92aW5jZV9jaG9pY2VzTGFiZWwnLCdkaW5vX2FyZWFfbmFtZSddLCBbJ0NvZGljZSBwcm9nZXR0bycsJ0Rvbm9ycycsJ1Byb3ZpbmNlcycsJ1NldHRvcmUgZGkgYXR0aXZpdGEnXSxcbiAqICB7J2JvcmRlcic6ICdub25lJ30seyd3aWR0aCc6ICc5MDBweCd9LCBbJzEwJScsJzMwJScsJzEwJScsJzI1JScsJzE1JScsJzEwJSddLCBcXFwiI2YwZjBmMFxcXCIsIFxcXCJ3aGl0ZVxcXCIpXG4gKi9cbmZ1bmN0aW9uIF9idWlsZFBhZ2luYXRlZExpc3RUYWJsZVdpdGhEaWFsb2coXzogc3RyaW5nLCBqc29uOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfVtdKTogQWpmV2lkZ2V0IHtcbiAgbGV0IGZvcm11bGEgPSAnJztcbiAgbGV0IHBhZ2VTaXplID0gMTA7XG4gIGxldCBkYXRhc2V0OiBzdHJpbmcgPSAnJztcbiAgbGV0IHRpdGxlID0gJyc7XG4gIGlmIChqc29uLmxlbmd0aCA+IDEpIHtcbiAgICBjb25zdCBjb2xzUGVyY2VudGFnZTogc3RyaW5nID0gKE9iamVjdC52YWx1ZXMoanNvblswXSkgYXMgc3RyaW5nW10pXG4gICAgICAubWFwKHIgPT4gYCcke3J9JSdgKVxuICAgICAgLmpvaW4oJywnKTtcbiAgICBjb25zdCBjb2xzUGVyY2VudGFnZUFycmF5ID0gYFske2NvbHNQZXJjZW50YWdlfV1gO1xuXG4gICAgbGV0IGZpZWxkcyA9ICdbJztcbiAgICBPYmplY3Qua2V5cyhqc29uWzBdKS5mb3JFYWNoKGZpZWxkQ29sTmFtZSA9PiB7XG4gICAgICBsZXQgZWxlbSA9IGpzb25bMV1bZmllbGRDb2xOYW1lXSA/IGAnJHtqc29uWzFdW2ZpZWxkQ29sTmFtZV19J2AgOiBgJydgO1xuICAgICAgZmllbGRzICs9IGVsZW0gKyAnLCc7XG4gICAgfSk7XG4gICAgZmllbGRzICs9ICddJztcblxuICAgIGxldCBkaWFsb2dGaWVsZHMgPSAnWyc7XG4gICAgbGV0IGRpYWxvZ0xhYmVsRmllbGRzID0gJ1snO1xuICAgIGlmIChqc29uLmxlbmd0aCA+IDMpIHtcbiAgICAgIGRpYWxvZ0xhYmVsRmllbGRzICs9IChPYmplY3QudmFsdWVzKGpzb25bMl0pIGFzIHN0cmluZ1tdKS5tYXAodiA9PiBgJyR7dn0nYCkuam9pbignLCcpO1xuICAgICAgZGlhbG9nRmllbGRzICs9IChPYmplY3QudmFsdWVzKGpzb25bM10pIGFzIHN0cmluZ1tdKS5tYXAodiA9PiBgJyR7dn0nYCkuam9pbignLCcpO1xuICAgIH1cbiAgICBkaWFsb2dGaWVsZHMgKz0gJ10nO1xuICAgIGRpYWxvZ0xhYmVsRmllbGRzICs9ICddJztcblxuICAgIGRhdGFzZXQgPSBqc29uWzFdWydkYXRhc2V0J10gYXMgc3RyaW5nO1xuICAgIHRpdGxlID0ganNvblsxXVsndGl0bGUnXSBhcyBzdHJpbmc7XG4gICAgcGFnZVNpemUgPSBqc29uWzFdWydwYWdlU2l6ZSddID8gK2pzb25bMV1bJ3BhZ2VTaXplJ10gOiAxMDtcbiAgICBjb25zdCBjZWxsU3R5bGVzID0ganNvblsxXVsnY2VsbFN0eWxlcyddO1xuICAgIGNvbnN0IHJvd1N0eWxlID0ganNvblsxXVsncm93U3R5bGUnXTtcbiAgICBjb25zdCBiYWNrZ3JvdW5kQ29sb3JBID0ganNvblsxXVsnYmFja2dyb3VuZENvbG9yQSddIGFzIHN0cmluZztcbiAgICBjb25zdCBiYWNrZ3JvdW5kQ29sb3JCID0ganNvblsxXVsnYmFja2dyb3VuZENvbG9yQiddIGFzIHN0cmluZztcblxuICAgIGZvcm11bGEgPVxuICAgICAgYGJ1aWxkV2lkZ2V0RGF0YXNldFdpdGhEaWFsb2coJHtkYXRhc2V0fSwgJHtmaWVsZHN9LCAke2RpYWxvZ0ZpZWxkc30sICR7ZGlhbG9nTGFiZWxGaWVsZHN9LCAke2NlbGxTdHlsZXN9LGAgK1xuICAgICAgYCR7cm93U3R5bGV9LCAke2NvbHNQZXJjZW50YWdlQXJyYXl9LCAke0pTT04uc3RyaW5naWZ5KGJhY2tncm91bmRDb2xvckEpfSwgJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgYmFja2dyb3VuZENvbG9yQixcbiAgICAgICl9KWA7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZVdpZGdldCh7XG4gICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5QYWdpbmF0ZWRMaXN0LFxuICAgIHBhZ2VTaXplOiBwYWdlU2l6ZSxcbiAgICB0aXRsZTogdGl0bGUsXG4gICAgY29udGVudERlZmluaXRpb246IHtcbiAgICAgIGZvcm11bGE6IGZvcm11bGEsXG4gICAgfSxcbiAgICBleHBvcnRhYmxlOiB0cnVlLFxuICAgIHN0eWxlczoge1xuICAgICAgaGVpZ2h0OiAnNTAwcHgnLFxuICAgIH0sXG4gIH0pO1xufVxuXG5jb25zdCBfYnVpbGRIZWF0bWFwID0gKF86IHN0cmluZywganNvbjoge1trZXk6IHN0cmluZ106IHN0cmluZ31bXSk6IEFqZldpZGdldCA9PiB7XG4gIGNvbnN0IGRlZmF1bHRGZWF0dXJlcyA9IHtcbiAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgIGZlYXR1cmVzOiBbXSxcbiAgfTtcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB2YWx1ZXM6ICdbXScsXG4gICAgaWRQcm9wOiAnaWQnLFxuICAgIGZlYXR1cmVzOiBKU09OLnN0cmluZ2lmeShkZWZhdWx0RmVhdHVyZXMpLFxuICAgIHN0YXJ0Q29sb3I6ICcjZmZlYjNiJyxcbiAgICBlbmRDb2xvcjogJyNmNDQzMzYnLFxuICAgIGhpZ2hsaWdodENvbG9yOiAnIzAwOTY4OCcsXG4gICAgc2hvd1Zpc3VhbE1hcDogZmFsc2UsXG4gICAgLi4uKGpzb24ubGVuZ3RoID4gMCA/IGpzb25bMF0gOiB7fSksXG4gIH07XG4gIHJldHVybiBjcmVhdGVXaWRnZXQoe1xuICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuSGVhdE1hcCxcbiAgICAuLi5vcHRpb25zLFxuICAgIHZhbHVlczoge2Zvcm11bGE6IG9wdGlvbnMudmFsdWVzfSxcbiAgICBzdHlsZXM6IHtcbiAgICAgIG1pbkhlaWdodDogJzIwMHB4JyxcbiAgICB9LFxuICB9KTtcbn07XG4iXX0=