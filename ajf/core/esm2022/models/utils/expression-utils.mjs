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
import { tokTypes, tokenizer } from 'acorn';
let execContext = {};
/**
 * Return all repeating slides in a form
 * @param form
 * @returns
 */
function allReps(form) {
    if (form.reps == null) {
        return [];
    }
    const reps = [];
    for (const key in form.reps) {
        const r = form.reps[key];
        reps.push(...r);
    }
    return reps;
}
const MAX_REPS = 30;
const globals = [
    'undefined',
    'Infinity',
    'NaN',
    'isNaN',
    'isFinite',
    'Error',
    'Object',
    'String',
    'Array',
    'Set',
    'Map',
    'RegExp',
    'Number',
    'Date',
    'Math',
    'JSON',
    'parseInt',
    'parseFloat',
];
export function getArgumentNames(source) {
    const identifiers = new Set();
    try {
        const tokens = tokenizer(source, { ecmaVersion: 2022 });
        let prevTokenType = null;
        for (const token of tokens) {
            if (token.type === tokTypes.name && prevTokenType !== tokTypes.dot) {
                identifiers.add(token.value);
            }
            prevTokenType = token.type;
        }
    }
    catch (e) {
        console.error(e, '- getting argument names for:', source);
    }
    for (const ide of globals) {
        identifiers.delete(ide);
    }
    return identifiers;
}
export class AjfExpressionUtils {
    /**
     * It is a key-value dictionary, that mapping all Ajf validation functions.
     */
    static { this.utils = {
        buildAlignedDataset: { fn: buildAlignedDataset },
        buildAlignedFormDataset: { fn: buildAlignedFormDataset },
        buildDataset: { fn: buildDataset },
        buildFormDataset: { fn: buildFormDataset },
        buildWidgetDataset: { fn: buildWidgetDataset },
        buildWidgetDatasetWithDialog: { fn: buildWidgetDatasetWithDialog },
        decimalCount: { fn: decimalCount },
        digitCount: { fn: digitCount },
        isInt: { fn: isInt },
        notEmpty: { fn: notEmpty },
        plainArray: { fn: plainArray },
        buildPointData: { fn: buildPointData },
        round: { fn: round },
        valueInChoice: { fn: valueInChoice },
        ADD_DAYS: { fn: ADD_DAYS },
        ALL_VALUES_OF: { fn: ALL_VALUES_OF },
        APPLY_LABELS: { fn: APPLY_LABELS },
        APPLY: { fn: APPLY },
        BUILD_DATASET: { fn: BUILD_DATASET },
        COMPARE_DATE: { fn: COMPARE_DATE },
        CONCAT: { fn: CONCAT },
        CONSOLE_LOG: { fn: CONSOLE_LOG },
        COUNT_FORMS_UNIQUE: { fn: COUNT_FORMS_UNIQUE },
        COUNT_FORMS: { fn: COUNT_FORMS },
        COUNT_REPS: { fn: COUNT_REPS },
        DAYS_DIFF: { fn: DAYS_DIFF },
        EVALUATE: { fn: EVALUATE },
        FILTER_BY_VARS: { fn: FILTER_BY_VARS },
        FILTER_BY: { fn: FILTER_BY },
        FLATTEN_REPS: { fn: FLATTEN_REPS },
        FIRST: { fn: FIRST },
        FROM_REPS: { fn: FROM_REPS },
        GET_AGE: { fn: GET_AGE },
        GET_LABELS: { fn: GET_LABELS },
        PROMPT_RESULT: { fn: PROMPT_RESULT },
        INCLUDES: { fn: INCLUDES },
        IS_AFTER: { fn: IS_AFTER },
        IS_BEFORE: { fn: IS_BEFORE },
        IS_WITHIN_INTERVAL: { fn: IS_WITHIN_INTERVAL },
        ISIN: { fn: ISIN },
        JOIN_FORMS: { fn: JOIN_FORMS },
        JOIN_REPEATING_SLIDES: { fn: JOIN_REPEATING_SLIDES },
        LAST: { fn: LAST },
        LEN: { fn: LEN },
        MAP: { fn: MAP },
        MIN: { fn: MIN },
        MAX: { fn: MAX },
        MEAN: { fn: MEAN },
        MEDIAN: { fn: MEDIAN },
        MODE: { fn: MODE },
        OP: { fn: OP },
        PERCENT: { fn: PERCENT },
        PERCENTAGE_CHANGE: { fn: PERCENTAGE_CHANGE },
        REMOVE_DUPLICATES: { fn: REMOVE_DUPLICATES },
        REPEAT: { fn: REPEAT },
        ROUND: { fn: ROUND },
        STD: { fn: STD },
        SUM: { fn: SUM },
        TODAY: { fn: TODAY },
        CHART_TO_DATA: { fn: CHART_TO_DATA },
        FORMAT_TABLE_ROWS: { fn: FORMAT_TABLE_ROWS },
        FORMAT_TABLE_COLS: { fn: FORMAT_TABLE_COLS },
        FORMAT_TABLE_FIELDS: { fn: FORMAT_TABLE_FIELDS },
    }; }
}
/**
 * Returns a copy of an array of forms.
 * The forms and their repeating slides are copied with spread,
 * with only one level of depth.
 */
function cloneMainForms(forms) {
    let res = [];
    for (const form of forms) {
        if (form == null) {
            res.push(form);
            continue;
        }
        let reps = {};
        if (form.reps != null) {
            for (const key in form.reps) {
                reps[key] = form.reps[key].map(rep => ({ ...rep }));
            }
        }
        res.push({ ...form, reps });
    }
    return res;
}
export function evaluateExpression(expression, context) {
    return createFunction(expression)(context);
}
const falseFunc = _ => false;
const cache = new Map();
for (const str of ['', 'undefined', 'false', '[object Object]']) {
    cache.set(str, falseFunc);
}
cache.set('null', _ => null);
cache.set('true', _ => true);
export function createFunction(expression) {
    expression = String(expression).trim();
    const hit = cache.get(expression);
    if (hit) {
        return hit;
    }
    const func = createNewFunction(expression);
    cache.set(expression, func);
    return func;
}
function createNewFunction(expression) {
    // Fast path for singly-quoted strings
    if (expression.startsWith("'") && /^'[^']*'$/.test(expression)) {
        const val = expression.slice(1, -1);
        return _ => val;
    }
    // Fast path for expressions that consist of a single identifier
    if (/^[a-zA-Z_$][\w$]*$/.test(expression)) {
        return c => (c == null || c[expression] === undefined ? null : c[expression]);
    }
    // Fast path for expressions that are pure json.
    // Also works for numbers, "strings" and arrays
    try {
        const val = JSON.parse(expression);
        return _ => val;
    }
    catch { }
    expression = '(' + expression + ')';
    const argNames = [...getArgumentNames(expression).add('execContext')];
    let func;
    try {
        func = new Function(...argNames, 'return ' + expression);
    }
    catch {
        return falseFunc;
    }
    return context => {
        const argValues = argNames.map(name => {
            if (context != null && context[name] !== undefined) {
                return context[name];
            }
            if (AjfExpressionUtils.utils[name] !== undefined) {
                return AjfExpressionUtils.utils[name].fn;
            }
            if (name === 'execContext') {
                return execContext;
            }
            return null;
        });
        try {
            return func(...argValues);
        }
        catch {
            return false;
        }
    };
}
/**
 * It returns the count of digit inside x.
 */
export function digitCount(x) {
    if (isNaN(x) || typeof x !== 'number') {
        return 0;
    }
    if (!isFinite(x)) {
        return Infinity;
    }
    return x.toString().replace(/[^0-9]/g, '').length;
}
/**
 * It is count the count of decimal digit inside s.
 */
export function decimalCount(x) {
    if (typeof x === 'string') {
        x = parseFloat(x);
    }
    if (typeof x !== 'number' || isNaN(x)) {
        return 0;
    }
    const parts = x.toString().split('.');
    return parts.length > 1 ? parts[1].length : 0;
}
/**
 * It is true if x is an integer.
 */
export function isInt(x) {
    if (typeof x === 'string') {
        return /^-?\d+$/.test(x);
    }
    if (typeof x === 'number') {
        return Math.round(x) === x;
    }
    return false;
}
/**
 * It is true if x is not empty.
 */
export function notEmpty(x) {
    return !(x == null || x.toString() === '');
}
/**
 * It is true if array contains x or array is equal to x.
 */
export function valueInChoice(array, x) {
    return (array || []).indexOf(x) > -1 || array === x;
}
/**
 * Fixed decimals for floating number
 * Resolve float sum problems like this: 0.1 + 0.2 = 0.30000000000000004
 * @param num
 * @returns
 */
function truncate10(num) {
    return parseFloat(num.toFixed(10));
}
/**
 * It rounds the num with the value of digits
 */
export function round(n, digits = 0) {
    const m = Math.pow(10, digits);
    return Math.round(n * m) / m;
}
/**
 * Returns an array containing all the values that the specified field takes in the forms.
 * The values are converted to strings.
 */
export function ALL_VALUES_OF(forms, field, filter = 'true') {
    forms = (forms || []).filter(f => f != null);
    if (typeof filter === 'string') {
        filter = createFunction(filter);
    }
    let values = [];
    for (const form of forms) {
        if (form[field] != null && filter(form)) {
            if (typeof form[field] === 'object' && !Array.isArray(form[field])) {
                values.push(JSON.stringify(form[field]));
            }
            else {
                values.push(String(form[field]));
            }
        }
        for (const rep of allReps(form)) {
            if (rep[field] != null && filter({ ...form, ...rep })) {
                if (typeof rep[field] === 'object' && !Array.isArray(rep[field])) {
                    values.push(JSON.stringify(rep[field]));
                }
                else {
                    values.push(String(rep[field]));
                }
            }
        }
    }
    return [...new Set(values)];
}
export function plainArray(params) {
    const res = [];
    for (const param of params) {
        if (Array.isArray(param)) {
            res.push(...param);
        }
        else {
            res.push(param);
        }
    }
    return res;
}
export function buildPointData(xs, ys, rs) {
    xs = xs || [];
    ys = ys || [];
    rs = rs || [];
    const points = [];
    for (let i = 0; i < xs.length; i++) {
        points.push({ x: xs[i], y: ys[i], r: rs[i] });
    }
    return points;
}
/**
 * Returns the number of forms for which filter evaluates to true,
 * for the form itself or for any of its repetitions.
 */
export function COUNT_FORMS(forms, filter = 'true') {
    forms = (forms || []).filter(f => f != null);
    if (filter === 'true') {
        return forms.length;
    }
    if (typeof filter === 'string') {
        filter = createFunction(filter);
    }
    let count = 0;
    for (const form of forms) {
        if (filter(form)) {
            count++;
            continue;
        }
        for (const rep of allReps(form)) {
            if (filter({ ...form, ...rep })) {
                count++;
                break;
            }
        }
    }
    return count;
}
/**
 * Counts the forms and all of their repetitions for which filter evaluates to true.
 */
export function COUNT_REPS(forms, filter = 'true') {
    forms = (forms || []).filter(f => f != null);
    if (typeof filter === 'string') {
        filter = createFunction(filter);
    }
    let count = 0;
    for (const form of forms) {
        if (filter(form)) {
            count++;
        }
        for (const rep of allReps(form)) {
            if (filter({ ...form, ...rep })) {
                count++;
            }
        }
    }
    return count;
}
/**
 * Deprecated. Use LEN(ALL_VALUES_OF)
 */
export function COUNT_FORMS_UNIQUE(forms, field, filter = 'true') {
    return ALL_VALUES_OF(forms, field, filter).length;
}
function getNumericValues(forms, field, filter = 'true') {
    forms = (forms || []).filter(f => f != null);
    if (typeof filter === 'string') {
        filter = createFunction(filter);
    }
    let values = [];
    for (const form of forms) {
        const val = form[field];
        if (val != null && !isNaN(Number(val)) && filter(form)) {
            values.push(Number(val));
        }
        for (const rep of allReps(form)) {
            const val = rep ? rep[field] : null;
            if (val != null && !isNaN(Number(val)) && filter({ ...form, ...rep })) {
                values.push(Number(val));
            }
        }
    }
    return values;
}
/**
 * Aggregates and sums the values of the specified field.
 * An optional expression can be added to filter which forms to take for the sum.
 */
export function SUM(forms, field, filter = 'true') {
    const values = getNumericValues(forms, field, filter);
    let sum = 0;
    for (const val of values) {
        sum += val;
    }
    return truncate10(sum);
}
/**
 * Computes the mean of the values of the specified field.
 * An optional expression can be added to filter which forms to take for the sum.
 */
export function MEAN(forms, field, filter = 'true') {
    const values = getNumericValues(forms, field, filter);
    let sum = 0;
    for (const val of values) {
        sum += val;
    }
    return truncate10(sum / values.length);
}
/**
 * Computes the Standard Deviation of the values of the specified field.
 * An optional expression can be added to filter which forms to take for the calculation.
 */
export function STD(forms, field, filter = 'true') {
    const mean = MEAN(forms, field, filter);
    const values = getNumericValues(forms, field, filter);
    if (values.length > 1) {
        let quadDeviationTot = 0;
        for (let val of values) {
            quadDeviationTot += Math.pow(val - mean, 2);
        }
        const std = Math.sqrt(quadDeviationTot / (values.length - 1));
        return truncate10(std);
    }
    return NaN;
}
/**
 * Returns a/b * 100 + '%'
 */
export function PERCENT(a, b) {
    return a / b * 100 + '%';
}
/**
 * Calculates the percentage change between a value and his base reference value.
 */
export function PERCENTAGE_CHANGE(value, reference_value) {
    if (typeof value === 'string' && value.endsWith('%')) {
        value = value.slice(0, -1);
    }
    if (typeof reference_value === 'string' && reference_value.endsWith('%')) {
        reference_value = reference_value.slice(0, -1);
    }
    const curr = Number(value);
    const ref = Number(reference_value);
    const res = ((curr - ref) / ref) * 100;
    return round(res, 1);
}
/**
 * Evaluates the expression in the first form by date.
 */
export function FIRST(forms, expression, date = 'dino_created_at') {
    if (typeof expression === 'string') {
        expression = createFunction(expression);
    }
    forms = (forms || []).filter(f => f != null && f[date] != null);
    if (forms.length === 0) {
        return undefined;
    }
    let form = forms[0];
    let minDate = form[date];
    for (let i = 1; i < forms.length; i++) {
        if (forms[i][date] < minDate) {
            form = forms[i];
            minDate = form[date];
        }
    }
    return expression(form);
}
/**
 * Evaluates the expression in the last form by date.
 */
export function LAST(forms, expression, date = 'dino_created_at') {
    if (typeof expression === 'string') {
        expression = createFunction(expression);
    }
    forms = (forms || []).filter(f => f != null && f[date] != null);
    if (forms.length === 0) {
        return undefined;
    }
    let form = forms[forms.length - 1];
    let maxDate = form[date];
    for (let i = forms.length - 2; i >= 0; i--) {
        if (forms[i][date] > maxDate) {
            form = forms[i];
            maxDate = form[date];
        }
    }
    return expression(form);
}
/**
 * Computes the min value of the field.
 */
export function MIN(forms, field, filter = 'true') {
    const values = getNumericValues(forms, field, filter);
    let min = +Infinity;
    for (const val of values) {
        if (val < min) {
            min = val;
        }
    }
    return min;
}
/**
 * Computes the max value of the field.
 */
export function MAX(forms, field, filter = 'true') {
    const values = getNumericValues(forms, field, filter);
    let max = -Infinity;
    for (const val of values) {
        if (val > max) {
            max = val;
        }
    }
    return max;
}
/**
 * Computes the median value of the field.
 */
export function MEDIAN(forms, field, filter = 'true') {
    const values = getNumericValues(forms, field, filter).sort((a, b) => a - b);
    if (values.length === 0) {
        return NaN;
    }
    let medianVal = NaN;
    let middleIdx = Math.floor(values.length / 2);
    if (values.length % 2) {
        medianVal = values[middleIdx];
    }
    else {
        medianVal = (values[middleIdx - 1] + values[middleIdx]) / 2;
    }
    return medianVal;
}
/**
 * Computes the mode value of the field.
 */
export function MODE(forms, field, filter = 'true') {
    const values = getNumericValues(forms, field, filter);
    const counters = {};
    for (const val of values) {
        if (counters[val] == null) {
            counters[val] = 1;
        }
        else {
            counters[val]++;
        }
    }
    let maxCount = 0;
    for (const val in counters) {
        if (counters[val] > maxCount) {
            maxCount = counters[val];
        }
    }
    for (const val in counters) {
        if (counters[val] === maxCount) {
            return Number(val);
        }
    }
    return NaN;
}
export function buildDataset(dataset, colspans) {
    return buildAlignedDataset(dataset, colspans, []);
}
/**
 * Build a dataset for ajf dynamic table
 * @param dataset the dataset for the table
 * @param colspans colspan for each value in the dataset
 * @param textAlign alignment for each value in the dataset
 * @returns An AjfTableCell list
 */
export function buildAlignedDataset(dataset, colspans, textAlign) {
    const res = [];
    const normalizeDataset = [];
    dataset.forEach((row, indexRow) => {
        row = Array.isArray(row) ? row : [row];
        normalizeDataset[indexRow % colspans.length] =
            normalizeDataset[indexRow % colspans.length] != null
                ? [...normalizeDataset[indexRow % colspans.length], ...row]
                : [...row];
    });
    const transpose = normalizeDataset[0].map((_, colIndex) => normalizeDataset.map((row) => row[colIndex]));
    transpose.forEach((data, index) => {
        const row = [];
        data.forEach((cellValue, cellIndex) => {
            row.push({
                value: cellValue,
                colspan: colspans[cellIndex],
                rowspan: 1,
                style: {
                    textAlign: textAlign[cellIndex] ? textAlign[cellIndex] : 'center',
                    color: 'black',
                    backgroundColor: index % 2 === 0 ? 'white' : '#ddd',
                },
            });
        });
        res.push(row);
    });
    return res;
}
/**
 * Build a dataset based on a list of Forms, for ajf dynamic table
 * @param dataset the dataset for the table
 * @param fields the list of fields name for each row
 * @param rowLink the http link for the row, with the form field name with the link value and the column position for the link.
 * ie: {'link': 'home_link', 'position': 0}
 * @param backgroundColorA the first backgroud color
 * @param backgroundColorB the second backgroud color
 * @returns An AjfTableCell list
 */
export function buildFormDataset(dataset, fields, rowLink, _backgroundColorA, _backgroundColorB) {
    return buildAlignedFormDataset(dataset, fields, [], [], rowLink, [], []);
}
/**
 * Build a dataset based on a list of Forms, for ajf dynamic table
 * @param dataset the dataset for the table
 * @param fields the list of fields name for each row
 * @param colspans colspan for each value in the dataset
 * @param textAlign alignment for each value in the dataset
 * @param rowLink the http link for the row, with the form field name with the link value and the column position for the link.
 * ie: {'link': 'home_link', 'position': 0}
 * @returns An AjfTableCell list
 */
export function buildAlignedFormDataset(dataset, fields, colspans, textAlign, rowLink, dialogFields, dialogLabelFields) {
    const res = [];
    const backgroundColorA = 'white';
    const backgroundColorB = '#ddd';
    if (dataset) {
        let index = 0;
        dataset.forEach((data) => {
            if (data) {
                index++;
                const row = [];
                fields.forEach((field, cellIdx) => {
                    let cellValue = data[field] || '';
                    if (rowLink != null && cellIdx === rowLink['position']) {
                        cellValue = `<a href='${data[rowLink['link']]}'> ${data[field]}</a>`;
                    }
                    row.push({
                        value: cellValue,
                        colspan: colspans[cellIdx] && colspans[cellIdx] > 0 ? colspans[cellIdx] : 1,
                        rowspan: 1,
                        style: {
                            textAlign: textAlign[cellIdx] ? textAlign[cellIdx] : 'center',
                            color: 'black',
                            backgroundColor: index % 2 === 0 ? backgroundColorA : backgroundColorB,
                        },
                    });
                });
                if (dialogFields && dialogFields.length) {
                    let dialogHtml = [];
                    dialogFields.forEach((field, cellIdx) => {
                        let fieldValue = '""';
                        if (data[field] != null) {
                            fieldValue =
                                "<p class='dialog-item'><b>" +
                                    dialogLabelFields[cellIdx].replace(/['\"]+/g, '') +
                                    '</b> <span>' +
                                    data[field] +
                                    '</span></p>';
                            dialogHtml.push(fieldValue);
                        }
                    });
                    row.push({
                        value: '<div class="read_more_cell"><p class="read_more_text">Read more</p><b class="material-icons">add_circle_outline</b></div>',
                        dialogHtml: dialogHtml.join(' '),
                        colspan: 1,
                        rowspan: 1,
                        style: {
                            textAlign: 'center',
                            color: 'black',
                            backgroundColor: index % 2 === 0 ? backgroundColorA : backgroundColorB,
                        },
                    });
                }
                res.push(row);
            }
        });
    }
    return res;
}
/**
 * create a widget dataset into a content list, based on a list of Forms, for paginated widget
 *
 * @param dataset the dataset for the widgets
 * @param fields the list of fields name for each row
 * @param rowLink the http link for the row, with the form field name with the link value and the column position for the link.
 * ie: {'link': 'home_link', 'position': 0}
 * @param cellStyles css styles for cells
 * @param rowStyle css styles for rows
 * @param percWidth an array with the same length of fields param, with the width for the columns.
 * ie: ['10%', '30%', '10%', '25%', '15%', '10%']
 * @param backgroundColorA the first backgroud color
 * @param backgroundColorB the second backgroud color
 * @returns An AjfTableWidget list
 */
export function buildWidgetDataset(dataset, fields, rowLink, cellStyles, rowStyle, percWidth, backgroundColorA, backgroundColorB) {
    const res = [];
    if (backgroundColorA == null) {
        backgroundColorA = 'white';
    }
    if (backgroundColorB == null) {
        backgroundColorB = '#ddd';
    }
    if (rowStyle == null) {
        rowStyle = {
            'text-align': 'right',
            'margin-bottom': 0,
            'border-collapse': 'collapse',
        };
    }
    if (cellStyles == null) {
        cellStyles = {
            textAlign: 'center',
            color: 'black',
        };
    }
    if (percWidth == null || percWidth.length !== fields.length) {
        const cellWidth = 100 / fields.length + '%';
        percWidth = [];
        fields.forEach(_ => percWidth.push(cellWidth));
    }
    if (dataset) {
        let index = 0;
        dataset.forEach((data) => {
            if (data) {
                index++;
                // Row is an AjfTableWidget
                const row = {
                    styles: {
                        'text-align': 'right',
                        'margin-bottom': 0,
                        'border-collapse': 'collapse',
                        ...rowStyle,
                    },
                    visibility: { condition: 'true' },
                    widgetType: 5,
                    dataset: [[]],
                    cellStyles: { 'border-top': '1px solid grey' },
                };
                fields.forEach((field, cellIdx) => {
                    let formulaCell = '""';
                    if (data[field] != null) {
                        formulaCell = '"' + data[field] + '"';
                        if (rowLink != null && cellIdx === rowLink['position']) {
                            formulaCell = `"<a href='${data[rowLink['link']]}'> ${data[field]}</a>"`;
                        }
                    }
                    row['dataset'][0].push({
                        label: '',
                        style: {
                            textAlign: 'center',
                            color: 'black',
                            backgroundColor: index % 2 === 0 ? backgroundColorA : backgroundColorB,
                            ...cellStyles,
                            width: percWidth[cellIdx],
                        },
                        formula: {
                            formula: formulaCell,
                        },
                        colspan: 1,
                        rowspan: 1,
                        aggregation: {
                            aggregation: 0,
                        },
                    });
                });
                res.push(row);
            }
        });
    }
    return res;
}
/**
 * create a widget dataset into a content list, based on a list of Forms, for paginated widget.
 * Each row is a AjfDialogWidget and, on click, open a dialog.
 *
 * @param dataset the dataset for the widgets
 * @param fields the list of fields name for each row
 * @param dialogFields the list of fields name to show in the dialog
 * @param dialogLabelFields the list of labels for each dialogFields
 * @param rowLink the http link for the row, with the form field name with the link value and the column position for the link.
 * ie: {'link': 'home_link', 'position': 0}
 * @param cellStyles css styles for cells
 * @param rowStyle css styles for rows
 * @param percWidth an array with the same length of fields param, with the width for the columns.
 * ie: ['10%', '30%', '10%', '25%', '15%', '10%']
 * @param backgroundColorA the first backgroud color
 * @param backgroundColorB the second backgroud color
 * @returns An AjfDialogWidget list
 */
export function buildWidgetDatasetWithDialog(dataset, fields, dialogFields, dialogLabelFields, cellStyles, rowStyle, percWidth, backgroundColorA, backgroundColorB) {
    const res = [];
    if (backgroundColorA == null) {
        backgroundColorA = 'white';
    }
    if (backgroundColorB == null) {
        backgroundColorB = '#ddd';
    }
    if (rowStyle == null) {
        rowStyle = {
            'text-align': 'right',
            'margin-bottom': 0,
            'border-collapse': 'collapse',
        };
    }
    if (cellStyles == null) {
        cellStyles = {
            textAlign: 'center',
            color: 'black',
        };
    }
    if (percWidth == null || percWidth.length !== fields.length) {
        const cellWidth = 100 / fields.length + '%';
        percWidth = [];
        fields.forEach(_ => percWidth.push(cellWidth));
    }
    if (dataset) {
        let index = 0;
        dataset.forEach((data) => {
            if (data) {
                index++;
                // Row is an AjfTableWidget
                const row = {
                    styles: {
                        'text-align': 'right',
                        'margin-bottom': 0,
                        'border-collapse': 'collapse',
                        ...rowStyle,
                    },
                    visibility: { condition: 'true' },
                    widgetType: 5,
                    dataset: [[]],
                    cellStyles: { 'border-top': '1px solid grey' },
                };
                fields.forEach((field, cellIdx) => {
                    let formulaCell = '""';
                    if (data[field] != null) {
                        formulaCell = '"' + data[field] + '"';
                    }
                    row['dataset'][0].push({
                        label: '',
                        style: {
                            textAlign: 'center',
                            color: 'black',
                            backgroundColor: index % 2 === 0 ? backgroundColorA : backgroundColorB,
                            ...cellStyles,
                            width: percWidth[cellIdx],
                        },
                        formula: {
                            formula: formulaCell,
                        },
                        colspan: 1,
                        rowspan: 1,
                        aggregation: {
                            aggregation: 0,
                        },
                    });
                });
                let htmlDialog = [];
                dialogFields.forEach((field, cellIdx) => {
                    let fieldValue = '""';
                    if (data[field] != null) {
                        fieldValue =
                            "<p class='dialog-item'><b>" +
                                dialogLabelFields[cellIdx] +
                                '</b> <span>' +
                                data[field] +
                                '</span></p>';
                        htmlDialog.push(fieldValue);
                    }
                });
                const dialogContent = {
                    widgetType: 3,
                    styles: {
                        'margin': '0 1em',
                        'padding': '5px 10px',
                        'max-height': '360px',
                    },
                    visibility: { condition: 'true' },
                    htmlText: htmlDialog.join(' '),
                };
                // This is a Dialog Widget, added as comtainer for each table widget
                const dialogRow = {
                    widgetType: 13,
                    styles: {
                        'margin': '0',
                    },
                    visibility: { condition: 'true' },
                    toggle: row,
                    content: [dialogContent],
                };
                res.push(dialogRow);
            }
        });
    }
    return res;
}
/**
 * Deprecated. Use MAP
 */
export function REPEAT(forms, array, fn, arg1, arg2 = 'true') {
    return array.map(v => {
        const s = JSON.stringify(v);
        const current1 = arg1.replaceAll('current', s);
        const current2 = arg2.replaceAll('current', s);
        return fn(forms, current1, current2);
    });
}
/**
 * Maps func to the elements of array.
 */
export function MAP(array, func) {
    return array.map(func);
}
/**
 * For each form in forms, the specified field is set with the value given by expression.
 * The form's fields can be used inside expression.
 */
export function APPLY(forms, field, expression) {
    forms = cloneMainForms(forms);
    if (typeof expression === 'string') {
        expression = createFunction(expression);
    }
    for (const form of forms) {
        if (form != null) {
            form[field] = expression(form);
        }
    }
    return forms;
}
/**
 * Rounds num to the specified number of digits after the point (or zero).
 */
export function ROUND(num, digits) {
    return round(Number(num), digits);
}
/**
 * Deprecated. Use IF
 */
export function EVALUATE(condition, branch1, branch2) {
    if (evaluateExpression(condition)) {
        return branch1;
    }
    else {
        return branch2;
    }
}
/**
 * Tells if arr includes elem
 */
export function INCLUDES(arr, elem) {
    if (!Array.isArray(arr) && typeof arr !== 'string') {
        return false;
    }
    return arr.includes(elem);
}
/**
 * This function builds a data structure that allows the use of the hindikit formulas
 * for every forms with repeating slides.
 * In particular, it builds a main data form with all the data relating to the slides and
 * a dictionary with the name reps thus made instance slideName forms.
 * Where a form is associated with each instance of the repeating slide.
 * example:
 * simple form:
 *  {
 *    $value: "AGO"
 *    cittadinanza__0: "AGO"
 *    codice_fiscale__0: "jdfljglòkòkò"
 *    country__0: "AGO"
 *    date_end: "2021-01-10"
 *    date_start: "2021-01-10"
 *    dob__0: "2021-03-11"
 *    first_name__0: "pippo"
 *    gender__0: "f"
 *    id_family: "3bef3a3f-d95d-4a09-8df4-e812c55c61c6"
 *    istruzione__0: null
 *    last_name__0: "pippo"
 *    permesso_soggiorno__0: "no"
 *    relazione__0: "genitore"
 *    solidando: "solidando1"
 *    stato_civile__0: null
 *  }
 * after BUILD_DATASET
 * MainForm:
 * {
 *    $value: "AGO"
 *    ajf_form_id: 0 ** added atribute that rappresent the index position insides input form list.
 *    ajf_family_component_count: 1** added atribute that rappresent the instance number of famili_component repeating slides.
 *    date_end: "2021-01-10"
 *    date_start: "2021-01-10"
 *    id_family: "3bef3a3f-d95d-4a09-8df4-e812c55c61c6"
 *    reps: {
 *      family_component: [
 *        {
 *          ajf_family_component_rep: 0 ** added atribute that rappresent the order instance of family_component repeating slide.
 *          cittadinanza: "AGO"
 *          codice_fiscale: "jdfljglòkòkò"
 *          country: "AGO"
 *          dob: "2021-03-11"
 *          first_name: "pippo"
 *          gender: "f"
 *          istruzione: null
 *          last_name: "pippo"
 *          permesso_soggiorno: "no"
 *          relazione: "genitore"
 *          stato_civile: null
 *        }
 *      ]
 *    }
 * }
 *
 * @param {Form[]} forms
 * @param {*} [schema] if schema is provided the instances inside the reps match with effective
 * slide name. Otherwise all repeating slides are associates to generic slide name "rep".
 * @return {*}  {MainForm[]}
 */
export function BUILD_DATASET(forms, schema) {
    const res = [];
    const generateMetadata = (slideName, slideInstance) => {
        const resg = {};
        resg[`ajf_${slideName}_rep`] = slideInstance;
        return resg;
    };
    forms = [...(forms || [])];
    if (schema != null) {
        const repeatingSlides = schema.nodes.filter((node) => node.nodeType === 4);
        const obj = {};
        repeatingSlides.forEach(slide => {
            let nodeFields = slide.nodes.map((n) => n.name);
            nodeFields.forEach((nodeField) => {
                obj[nodeField] = slide.name;
            });
        });
        forms.forEach((f, formIdx) => {
            const mainForm = { reps: {} };
            const fKeys = Object.keys(f);
            const instances = {};
            fKeys.forEach(fkey => {
                const splittedKey = fkey.split('__');
                const splittedLength = splittedKey.length;
                const fieldName = splittedKey[0];
                const slideInstance = splittedKey[1] != null && Number.isInteger(+splittedKey[1]) ? +splittedKey[1] : null;
                const slideName = obj[fieldName];
                if (splittedLength === 2 && slideInstance != null && slideName != null) {
                    instances[slideName] = instances[slideName] != null ? instances[slideName] : [];
                    instances[slideName][slideInstance] =
                        instances[slideName][slideInstance] != null
                            ? instances[slideName][slideInstance]
                            : generateMetadata(slideName, slideInstance);
                    instances[slideName][slideInstance][fieldName] = f[fkey];
                }
                else {
                    mainForm[fkey] = f[fkey];
                }
            });
            mainForm[`ajf_form_id`] = formIdx;
            const instanceKeys = Object.keys(instances);
            instanceKeys.forEach(instanceKey => {
                mainForm[`ajf_${instanceKey}_count`] = instances[instanceKey].length;
                for (let idxSlide = 0; idxSlide < instances[instanceKey].length; idxSlide++) {
                    if (instances[instanceKey][idxSlide] == null) {
                        instances[instanceKey][idxSlide] = generateMetadata(instanceKey, idxSlide);
                    }
                }
            });
            mainForm.reps = instances;
            res.push(mainForm);
        });
        return res;
    }
    else {
        forms.forEach(form => {
            const fKeys = Object.keys(form);
            const noRepeatingFields = fKeys.filter(fkey => {
                const splittedKey = fkey.split('__');
                if (splittedKey.length === 2) {
                    return false;
                }
                return true;
            });
            const noRepForm = {};
            noRepeatingFields.forEach(field => {
                noRepForm[field] = form[field];
            });
            const mainForm = { ...noRepForm, reps: { slide: [] } };
            for (let i = 0; i <= MAX_REPS; i++) {
                const currentSlide = {};
                const onlyCurrentInstanceKeys = fKeys.filter(fkey => {
                    const splittedKey = fkey.split('__');
                    if (splittedKey.length === 2) {
                        return fkey.indexOf(`__${i}`) > -1;
                    }
                    return false;
                });
                // se il numero di attributi coincide il form data non ha repeatingslides
                if (onlyCurrentInstanceKeys.length === 0) {
                    mainForm['ajf_rep_count'] = i;
                    break;
                }
                onlyCurrentInstanceKeys.forEach(key => {
                    const splittedKey = key.split('__');
                    const fieldName = splittedKey[0];
                    const slideInstance = splittedKey[1] != null ? +splittedKey[1] : null;
                    currentSlide[fieldName] = form[key];
                    currentSlide['ajf_rep'] = slideInstance != null ? slideInstance : currentSlide['ajf_rep'];
                });
                if (onlyCurrentInstanceKeys.length != 0) {
                    mainForm.reps['slide'].push(currentSlide);
                }
                else {
                    mainForm.reps = undefined;
                }
            }
            res.push(mainForm);
        });
        return res;
    }
}
/**
 * This function takes an ajf schema as input and extracts a
 * dict that matches each choice value (with and without choice origin name as prefix) with its label
 * @param schema the ajf schema
 * @returns A dict with:
 *  {[choiceValue: string]: [choiceLabel: string]}
 */
function extractLabelsFromChoices(schema) {
    const labels = {};
    if (schema && schema.choicesOrigins != null) {
        for (const origin of schema.choicesOrigins) {
            if (origin != null && origin.choices != null) {
                for (const c of origin.choices) {
                    labels[c.value] = c.label;
                    labels[origin.name + '_' + c.value] = c.label;
                }
            }
        }
    }
    return labels;
}
/**
 * It creates an one dimensional array of AjfNode.
 * If the node is a containerNode(has the nodes attribute)
 * recursively  concat their nodes.
 */
function flattenNodes(nodes) {
    let flatNodes = [];
    nodes.forEach(node => {
        flatNodes.push(node);
        if (node != null && (node.nodeType === 3 || node.nodeType === 4)) {
            flatNodes = flatNodes.concat(flattenNodes(node.nodes));
        }
    });
    return flatNodes;
}
/**
 * Returns a clone of forms, where the specified fields are replaced by the corresponding labels,
 * as defined by the choice origins in schema.
 *
 * @param {MainForm[]} forms
 * @param {*} schema the ajf schema
 * @param {string[]} fields
 * @return {*} {MainForm[]}
 */
export function APPLY_LABELS(forms, schema, fields) {
    forms = cloneMainForms(forms);
    const labels = extractLabelsFromChoices(schema);
    const choiceFields = flattenNodes(schema.nodes).filter((n) => n != null &&
        fields.includes(n.name) &&
        n.nodeType === 0 &&
        (n.fieldType === 4 || n.fieldType === 5));
    for (const form of forms) {
        if (form == null) {
            continue;
        }
        const reps = allReps(form);
        reps.push(form);
        for (const rep of reps) {
            for (const field of fields) {
                const val = rep[field];
                const choiceField = choiceFields.find(f => f.name === field);
                const choicePrefix = choiceField && choiceField.choicesOriginRef ? choiceField.choicesOriginRef + '_' : '';
                if (val && typeof val === 'string' && labels[choicePrefix + val] != null) {
                    // single choice
                    rep[field] = labels[choicePrefix + val];
                }
                else if (Array.isArray(val)) {
                    // multiple choice
                    rep[field] = val.map(v => labels[choicePrefix + v] != null ? labels[choicePrefix + v] : v);
                }
            }
        }
    }
    return forms;
}
/**
 * Deprecated. Use FILTER_BY
 */
export function FILTER_BY_VARS(formList, expression) {
    return FILTER_BY(formList, expression);
}
/**
 * Returns a copy of forms and its repetitions, keeping only the ones for which expression evaluates to true.
 */
export function FILTER_BY(forms, expression) {
    forms = forms || [];
    if (expression === 'true') {
        return cloneMainForms(forms);
    }
    if (typeof expression === 'string') {
        expression = createFunction(expression);
    }
    const res = [];
    for (let form of forms.filter(f => f != null)) {
        form = { ...form };
        const filteredReps = {};
        let someReps = false;
        if (form.reps != null) {
            for (const key in form.reps) {
                filteredReps[key] = form.reps[key].filter(rep => expression({ ...form, ...rep }));
                form[`ajf_${key}_count`] = filteredReps[key].length;
                someReps ||= filteredReps[key].length > 0;
            }
        }
        if (someReps || expression(form)) {
            form.reps = filteredReps;
            res.push(form);
        }
    }
    return res;
}
/**
 * Returns a copy of forms, modified as follows: if a form has n repeating slides,
 * it is duplicated as n forms, in which the fields of the repeating slides appear as regular fields.
 */
export function FLATTEN_REPS(forms, slideName) {
    const res = [];
    for (const form of forms) {
        if (form == null) {
            continue;
        }
        const reps = { ...form.reps };
        const slides = reps[slideName];
        delete reps[slideName];
        if (slides == null || slides.length === 0) {
            res.push({ ...form, reps });
            continue;
        }
        for (const slide of slides) {
            res.push({ ...form, ...slide, reps });
        }
    }
    return res;
}
/**
 * Returns today's date.
 *
 * @export
 * @return {*}  {string}
 */
export function TODAY() {
    return new Date().toJSON().slice(0, 10);
}
/**
 * Logs val to the console.
 *
 * @export
 * @param {*} val
 */
export function CONSOLE_LOG(val) {
    console.log(val);
    return val;
}
/**
 * Computes the current age in years, given the date of birth.
 *
 * @export
 * @param {(string | null)} dob
 * @param {(string | undefined)} when
 * @return {*}  {number}
 */
export function GET_AGE(dob, when) {
    if (dob == null) {
        return NaN;
    }
    if (when == null) {
        when = TODAY();
    }
    let yearsDiff = Number(when.slice(0, 4)) - Number(dob.slice(0, 4));
    if (when.slice(5) < dob.slice(5)) {
        // birthday not reached yet in current year
        yearsDiff--;
    }
    return yearsDiff;
}
/**
 * If data is a form with repetitions, returns the number of repetitions;
 * If data is an array, returns its length;
 * Otherwise returns 0.
 *
 * @export
 * @param {(MainForm | any[])} dataset
 * @return {*}  {number}
 */
export function LEN(dataset) {
    if (dataset == null) {
        return 0;
    }
    const form = dataset;
    if (form.reps != null) {
        return allReps(form).length;
    }
    return dataset.length || 0;
}
/**
 * Array concatenation.
 *
 * @export
 * @param {any[]} a
 * @param {any[]} b
 * @return {*}  {any[]}
 */
export function CONCAT(a, b) {
    return a.concat(b);
}
/**
 * Removes duplicate elements from an array.
 *
 * @export
 * @param {any[]} arr
 * @return {*}  {any[]}
 */
export function REMOVE_DUPLICATES(arr) {
    return [...new Map(arr.map(v => [JSON.stringify(v), v])).values()];
}
// Returns the date obtained by adding days to date.
export function ADD_DAYS(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d.toJSON().slice(0, 10);
}
// Returns the difference in days (a - b) between the two dates.
export function DAYS_DIFF(a, b) {
    const dateA = new Date(a);
    const dateB = new Date(b);
    // UTC avoids bugs with daylight saving time.
    const utcA = Date.UTC(dateA.getFullYear(), dateA.getMonth(), dateA.getDate());
    const utcB = Date.UTC(dateB.getFullYear(), dateB.getMonth(), dateB.getDate());
    const millisPerDay = 1000 * 60 * 60 * 24;
    return Math.floor((utcA - utcB) / millisPerDay);
}
/**
 * Returns true if date is before dateToCompare.
 *
 * @export
 * @param {string} date
 * @param {string} dateToCompare
 * @return {*}  {boolean}
 */
export function IS_BEFORE(date, dateToCompare) {
    return date < dateToCompare;
}
/**
 * Returns true if date is after dateToCompare.
 *
 * @export
 * @param {string} date
 * @param {string} dateToCompare
 * @return {*}  {boolean}
 */
export function IS_AFTER(date, dateToCompare) {
    return date > dateToCompare;
}
/**
 * Returns true if date is between dateStart and dateEnd.
 *
 * @export
 * @param {string} date
 * @param {string} dateStart
 * @param {string} dateEnd
 * @return {*}  {boolean}
 */
export function IS_WITHIN_INTERVAL(date, dateStart, dateEnd) {
    return date >= dateStart && date <= dateEnd;
}
/**
 * Compares date with an interval.
 * Returns '-1' (or the first element of labels) if date is before dateStart,
 * '0' (or the second element) if date is between dateStart and dateEnd,
 * '1' (or the third element) if date is after dateEnd.
 *
 * @export
 * @param {string} date
 * @param {string} dateStart
 * @param {string} dateEnd
 * @param {string[]} labels an optional array of string for the output values
 * @return {*}  {string}
 */
export function COMPARE_DATE(date, dateStart, dateEnd, labels) {
    if (labels == null) {
        labels = ['-1', '0', '1'];
    }
    if (IS_BEFORE(date, dateStart)) {
        return labels[0];
    }
    if (IS_WITHIN_INTERVAL(date, dateStart, dateEnd)) {
        return labels[1];
    }
    if (IS_AFTER(date, dateEnd)) {
        return labels[2];
    }
    return '';
}
/**
 * Performs a left join of formsA and formsB.
 */
export function JOIN_FORMS(formsA, formsB, keyA, keyB) {
    return JOIN_REPEATING_SLIDES(formsA, formsB, keyA, keyB, null);
}
/**
 * Performs a left join of formsA and formsB, like JOIN_FORMS.
 * In addition, for each matching pair of formA and formB, their repeating slides are also joined.
 */
export function JOIN_REPEATING_SLIDES(formsA, formsB, keyA, keyB, subkeyA, subkeyB) {
    formsA = cloneMainForms(formsA || []);
    formsB = cloneMainForms(formsB || []);
    if (keyB == null) {
        keyB = keyA;
    }
    if (subkeyB == null) {
        subkeyB = subkeyA;
    }
    const indexB = {};
    for (let i = formsB.length - 1; i >= 0; i--) {
        const val = formsB[i] && formsB[i][keyB];
        if (val != null) {
            indexB[String(val)] = formsB[i];
        }
    }
    const res = [];
    for (const formA of formsA) {
        const val = formA && formA[keyA];
        const formB = indexB[String(val)];
        if (val == null || formB == null) {
            res.push(formA);
            continue;
        }
        const repsA = formA.reps || {};
        const repsB = formB.reps || {};
        if (subkeyA != null) {
            const allRepsB = allReps(formB);
            for (const k in repsA) {
                repsA[k] = JOIN_FORMS(repsA[k], allRepsB, subkeyA, subkeyB);
                formA[`ajf_${k}_count`] = repsA[k].length;
            }
        }
        res.push({ ...formB, ...formA, reps: { ...repsB, ...repsA } });
    }
    return res;
}
/**
 * Returns the array obtained by evaluating expression for every repetition of form.
 *
 * @export
 * @param {MainForm | MainForm[]} forms
 * @param {string} expression
 * @return {*}  {any[]}
 */
export function FROM_REPS(forms, expression) {
    if (typeof expression === 'string') {
        expression = createFunction(expression);
    }
    if (forms == null) {
        forms = [];
    }
    if (!Array.isArray(forms)) {
        forms = [forms];
    }
    const func = expression;
    const res = forms.map(form => allReps(form || {}).map(rep => func({ ...form, ...rep }))).flat();
    return res.filter(val => val != null);
}
/**
 * Deprecated. Use INCLUDES
 */
export function ISIN(dataset, value) {
    if (dataset == null || value == null) {
        return false;
    }
    return dataset.indexOf(value) >= 0;
}
/**
 * Applies the operator to every pair of elements (arrayA[i], arrayB[i]),
 * returning the array of results.
 */
export function OP(arrayA, arrayB, operator) {
    if (typeof operator === 'string') {
        const func = createFunction(operator);
        operator = (elemA, elemB) => func({ elemA, elemB });
    }
    const res = [];
    for (let i = 0; i < Math.min(arrayA.length, arrayB.length); i++) {
        const val = operator(arrayA[i], arrayB[i]);
        res.push(val);
    }
    return res;
}
/**
 * Given an array of values, returns the corresponding array of labels,
 * as specified by the choices origin in schema.
 *
 * @export
 * @param {*} schema
 * @param {string[]} values
 * @return {*}  {string[]}
 */
export function GET_LABELS(schema, values, choiceOriginName) {
    const choiceLabels = extractLabelsFromChoices(schema);
    return values
        .map(val => (choiceOriginName ? choiceOriginName + '_' + val : val))
        .map(val => (choiceLabels[val] != null ? choiceLabels[val] : val));
}
/**
 * Reads from report_data the result of the AI prompt with the specified name.
 */
export function PROMPT_RESULT(report_data, promptName) {
    if (report_data.data == null) {
        return undefined;
    }
    return report_data.data[promptName];
}
/**
 * Converts pie chart arrays (labels and values) into a JSON object where each label becomes a key
 * and its corresponding value becomes the value in the object.
 * @param labels
 * @param values
 * @returns
 */
export function CHART_TO_DATA(labels, values) {
    const jsonObj = {};
    labels.forEach((lab, i) => (jsonObj[lab] = values[i]));
    return JSON.stringify(jsonObj);
}
/**
 * Formats the given table rows as an HTML table string.
 * @param rows
 * @returns
 */
export function FORMAT_TABLE_ROWS(rows) {
    let html = '\n<table>';
    for (const row of rows) {
        html += '\n  <tr>\n    ';
        for (const cell of row) {
            html += `<td>${cell}</td>`;
        }
        html += '\n  </tr>';
    }
    html += '\n</table>\n';
    return html;
}
/**
 * Formats the given table columns as an HTML table string.
 * @param columns
 * @returns
 */
export function FORMAT_TABLE_COLS(columns) {
    const numRows = columns.length && columns[0].length;
    const rows = Array(numRows)
        .fill(1)
        .map(_ => []);
    for (const col of columns) {
        for (let i = 0; i < numRows; i++) {
            rows[i].push(col[i]);
        }
    }
    return FORMAT_TABLE_ROWS(rows);
}
/**
 * Extracts the fields' data from the specified forms and formats them as an HTML table string.
 * @param forms
 * @param fields
 * @returns
 */
export function FORMAT_TABLE_FIELDS(forms, fields) {
    forms = forms.filter(f => f != null);
    const rows = [fields];
    for (const form of forms) {
        rows.push(fields.map(field => form[field]));
    }
    return FORMAT_TABLE_ROWS(rows);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbi11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvbW9kZWxzL3NyYy91dGlscy9leHByZXNzaW9uLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUdILE9BQU8sRUFBWSxRQUFRLEVBQUUsU0FBUyxFQUFDLE1BQU0sT0FBTyxDQUFDO0FBSXJELElBQUksV0FBVyxHQUFRLEVBQUUsQ0FBQztBQWExQjs7OztHQUlHO0FBQ0gsU0FBUyxPQUFPLENBQUMsSUFBYztJQUM3QixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdEIsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBQ0QsTUFBTSxJQUFJLEdBQVcsRUFBRSxDQUFDO0lBQ3hCLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRCxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFFcEIsTUFBTSxPQUFPLEdBQUc7SUFDZCxXQUFXO0lBQ1gsVUFBVTtJQUNWLEtBQUs7SUFDTCxPQUFPO0lBQ1AsVUFBVTtJQUNWLE9BQU87SUFDUCxRQUFRO0lBQ1IsUUFBUTtJQUNSLE9BQU87SUFDUCxLQUFLO0lBQ0wsS0FBSztJQUNMLFFBQVE7SUFDUixRQUFRO0lBQ1IsTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sVUFBVTtJQUNWLFlBQVk7Q0FDYixDQUFDO0FBRUYsTUFBTSxVQUFVLGdCQUFnQixDQUFDLE1BQWM7SUFDN0MsTUFBTSxXQUFX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Y2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dH0gZnJvbSAnQGFqZi9jb3JlL2NvbW1vbic7XG5pbXBvcnQge1Rva2VuVHlwZSwgdG9rVHlwZXMsIHRva2VuaXplcn0gZnJvbSAnYWNvcm4nO1xuaW1wb3J0IHtBamZUYWJsZUNlbGx9IGZyb20gJ0BhamYvY29yZS90YWJsZSc7XG5pbXBvcnQge0FqZlZhbGlkYXRpb25Gbn0gZnJvbSAnLi4vaW50ZXJmYWNlL3ZhbGlkYXRpb24tZnVuY3Rpb24nO1xuXG5sZXQgZXhlY0NvbnRleHQ6IGFueSA9IHt9O1xuXG5leHBvcnQgaW50ZXJmYWNlIEZvcm0ge1xuICBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsO1xufVxuZXhwb3J0IGludGVyZmFjZSBJbnN0YW5jZXMge1xuICBbaW5zdGFuY2U6IHN0cmluZ106IEZvcm1bXTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgTWFpbkZvcm0ge1xuICBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuIHwgbnVsbCB8IEluc3RhbmNlcyB8IHVuZGVmaW5lZCB8IG51bGw7XG4gIHJlcHM/OiBJbnN0YW5jZXM7XG59XG5cbi8qKlxuICogUmV0dXJuIGFsbCByZXBlYXRpbmcgc2xpZGVzIGluIGEgZm9ybVxuICogQHBhcmFtIGZvcm1cbiAqIEByZXR1cm5zXG4gKi9cbmZ1bmN0aW9uIGFsbFJlcHMoZm9ybTogTWFpbkZvcm0pOiBGb3JtW10ge1xuICBpZiAoZm9ybS5yZXBzID09IG51bGwpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgY29uc3QgcmVwczogRm9ybVtdID0gW107XG4gIGZvciAoY29uc3Qga2V5IGluIGZvcm0ucmVwcykge1xuICAgIGNvbnN0IHIgPSBmb3JtLnJlcHNba2V5XTtcbiAgICByZXBzLnB1c2goLi4ucik7XG4gIH1cbiAgcmV0dXJuIHJlcHM7XG59XG5cbmNvbnN0IE1BWF9SRVBTID0gMzA7XG5cbmNvbnN0IGdsb2JhbHMgPSBbXG4gICd1bmRlZmluZWQnLFxuICAnSW5maW5pdHknLFxuICAnTmFOJyxcbiAgJ2lzTmFOJyxcbiAgJ2lzRmluaXRlJyxcbiAgJ0Vycm9yJyxcbiAgJ09iamVjdCcsXG4gICdTdHJpbmcnLFxuICAnQXJyYXknLFxuICAnU2V0JyxcbiAgJ01hcCcsXG4gICdSZWdFeHAnLFxuICAnTnVtYmVyJyxcbiAgJ0RhdGUnLFxuICAnTWF0aCcsXG4gICdKU09OJyxcbiAgJ3BhcnNlSW50JyxcbiAgJ3BhcnNlRmxvYXQnLFxuXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFyZ3VtZW50TmFtZXMoc291cmNlOiBzdHJpbmcpOiBTZXQ8c3RyaW5nPiB7XG4gIGNvbnN0IGlkZW50aWZpZXJzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gIHRyeSB7XG4gICAgY29uc3QgdG9rZW5zID0gdG9rZW5pemVyKHNvdXJjZSwge2VjbWFWZXJzaW9uOiAyMDIyfSk7XG4gICAgbGV0IHByZXZUb2tlblR5cGU6IFRva2VuVHlwZSB8IG51bGwgPSBudWxsO1xuICAgIGZvciAoY29uc3QgdG9rZW4gb2YgdG9rZW5zKSB7XG4gICAgICBpZiAodG9rZW4udHlwZSA9PT0gdG9rVHlwZXMubmFtZSAmJiBwcmV2VG9rZW5UeXBlICE9PSB0b2tUeXBlcy5kb3QpIHtcbiAgICAgICAgaWRlbnRpZmllcnMuYWRkKCh0b2tlbiBhcyBhbnkpLnZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHByZXZUb2tlblR5cGUgPSB0b2tlbi50eXBlO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoZSwgJy0gZ2V0dGluZyBhcmd1bWVudCBuYW1lcyBmb3I6Jywgc291cmNlKTtcbiAgfVxuICBmb3IgKGNvbnN0IGlkZSBvZiBnbG9iYWxzKSB7XG4gICAgaWRlbnRpZmllcnMuZGVsZXRlKGlkZSk7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5leHBvcnQgY2xhc3MgQWpmRXhwcmVzc2lvblV0aWxzIHtcbiAgLyoqXG4gICAqIEl0IGlzIGEga2V5LXZhbHVlIGRpY3Rpb25hcnksIHRoYXQgbWFwcGluZyBhbGwgQWpmIHZhbGlkYXRpb24gZnVuY3Rpb25zLlxuICAgKi9cbiAgc3RhdGljIHV0aWxzOiB7W25hbWU6IHN0cmluZ106IEFqZlZhbGlkYXRpb25Gbn0gPSB7XG4gICAgYnVpbGRBbGlnbmVkRGF0YXNldDoge2ZuOiBidWlsZEFsaWduZWREYXRhc2V0fSxcbiAgICBidWlsZEFsaWduZWRGb3JtRGF0YXNldDoge2ZuOiBidWlsZEFsaWduZWRGb3JtRGF0YXNldH0sXG4gICAgYnVpbGREYXRhc2V0OiB7Zm46IGJ1aWxkRGF0YXNldH0sXG4gICAgYnVpbGRGb3JtRGF0YXNldDoge2ZuOiBidWlsZEZvcm1EYXRhc2V0fSxcbiAgICBidWlsZFdpZGdldERhdGFzZXQ6IHtmbjogYnVpbGRXaWRnZXREYXRhc2V0fSxcbiAgICBidWlsZFdpZGdldERhdGFzZXRXaXRoRGlhbG9nOiB7Zm46IGJ1aWxkV2lkZ2V0RGF0YXNldFdpdGhEaWFsb2d9LFxuICAgIGRlY2ltYWxDb3VudDoge2ZuOiBkZWNpbWFsQ291bnR9LFxuICAgIGRpZ2l0Q291bnQ6IHtmbjogZGlnaXRDb3VudH0sXG4gICAgaXNJbnQ6IHtmbjogaXNJbnR9LFxuICAgIG5vdEVtcHR5OiB7Zm46IG5vdEVtcHR5fSxcbiAgICBwbGFpbkFycmF5OiB7Zm46IHBsYWluQXJyYXl9LFxuICAgIGJ1aWxkUG9pbnREYXRhOiB7Zm46IGJ1aWxkUG9pbnREYXRhfSxcbiAgICByb3VuZDoge2ZuOiByb3VuZH0sXG4gICAgdmFsdWVJbkNob2ljZToge2ZuOiB2YWx1ZUluQ2hvaWNlfSxcbiAgICBBRERfREFZUzoge2ZuOiBBRERfREFZU30sXG4gICAgQUxMX1ZBTFVFU19PRjoge2ZuOiBBTExfVkFMVUVTX09GfSxcbiAgICBBUFBMWV9MQUJFTFM6IHtmbjogQVBQTFlfTEFCRUxTfSxcbiAgICBBUFBMWToge2ZuOiBBUFBMWX0sXG4gICAgQlVJTERfREFUQVNFVDoge2ZuOiBCVUlMRF9EQVRBU0VUfSxcbiAgICBDT01QQVJFX0RBVEU6IHtmbjogQ09NUEFSRV9EQVRFfSxcbiAgICBDT05DQVQ6IHtmbjogQ09OQ0FUfSxcbiAgICBDT05TT0xFX0xPRzoge2ZuOiBDT05TT0xFX0xPR30sXG4gICAgQ09VTlRfRk9STVNfVU5JUVVFOiB7Zm46IENPVU5UX0ZPUk1TX1VOSVFVRX0sXG4gICAgQ09VTlRfRk9STVM6IHtmbjogQ09VTlRfRk9STVN9LFxuICAgIENPVU5UX1JFUFM6IHtmbjogQ09VTlRfUkVQU30sXG4gICAgREFZU19ESUZGOiB7Zm46IERBWVNfRElGRn0sXG4gICAgRVZBTFVBVEU6IHtmbjogRVZBTFVBVEV9LFxuICAgIEZJTFRFUl9CWV9WQVJTOiB7Zm46IEZJTFRFUl9CWV9WQVJTfSxcbiAgICBGSUxURVJfQlk6IHtmbjogRklMVEVSX0JZfSxcbiAgICBGTEFUVEVOX1JFUFM6IHtmbjogRkxBVFRFTl9SRVBTfSxcbiAgICBGSVJTVDoge2ZuOiBGSVJTVH0sXG4gICAgRlJPTV9SRVBTOiB7Zm46IEZST01fUkVQU30sXG4gICAgR0VUX0FHRToge2ZuOiBHRVRfQUdFfSxcbiAgICBHRVRfTEFCRUxTOiB7Zm46IEdFVF9MQUJFTFN9LFxuICAgIFBST01QVF9SRVNVTFQ6IHtmbjogUFJPTVBUX1JFU1VMVH0sXG4gICAgSU5DTFVERVM6IHtmbjogSU5DTFVERVN9LFxuICAgIElTX0FGVEVSOiB7Zm46IElTX0FGVEVSfSxcbiAgICBJU19CRUZPUkU6IHtmbjogSVNfQkVGT1JFfSxcbiAgICBJU19XSVRISU5fSU5URVJWQUw6IHtmbjogSVNfV0lUSElOX0lOVEVSVkFMfSxcbiAgICBJU0lOOiB7Zm46IElTSU59LFxuICAgIEpPSU5fRk9STVM6IHtmbjogSk9JTl9GT1JNU30sXG4gICAgSk9JTl9SRVBFQVRJTkdfU0xJREVTOiB7Zm46IEpPSU5fUkVQRUFUSU5HX1NMSURFU30sXG4gICAgTEFTVDoge2ZuOiBMQVNUfSxcbiAgICBMRU46IHtmbjogTEVOfSxcbiAgICBNQVA6IHtmbjogTUFQfSxcbiAgICBNSU46IHtmbjogTUlOfSxcbiAgICBNQVg6IHtmbjogTUFYfSxcbiAgICBNRUFOOiB7Zm46IE1FQU59LFxuICAgIE1FRElBTjoge2ZuOiBNRURJQU59LFxuICAgIE1PREU6IHtmbjogTU9ERX0sXG4gICAgT1A6IHtmbjogT1B9LFxuICAgIFBFUkNFTlQ6IHtmbjogUEVSQ0VOVH0sXG4gICAgUEVSQ0VOVEFHRV9DSEFOR0U6IHtmbjogUEVSQ0VOVEFHRV9DSEFOR0V9LFxuICAgIFJFTU9WRV9EVVBMSUNBVEVTOiB7Zm46IFJFTU9WRV9EVVBMSUNBVEVTfSxcbiAgICBSRVBFQVQ6IHtmbjogUkVQRUFUfSxcbiAgICBST1VORDoge2ZuOiBST1VORH0sXG4gICAgU1REOiB7Zm46IFNURH0sXG4gICAgU1VNOiB7Zm46IFNVTX0sXG4gICAgVE9EQVk6IHtmbjogVE9EQVl9LFxuICAgIENIQVJUX1RPX0RBVEE6IHtmbjogQ0hBUlRfVE9fREFUQX0sXG4gICAgRk9STUFUX1RBQkxFX1JPV1M6IHtmbjogRk9STUFUX1RBQkxFX1JPV1N9LFxuICAgIEZPUk1BVF9UQUJMRV9DT0xTOiB7Zm46IEZPUk1BVF9UQUJMRV9DT0xTfSxcbiAgICBGT1JNQVRfVEFCTEVfRklFTERTOiB7Zm46IEZPUk1BVF9UQUJMRV9GSUVMRFN9LFxuICB9O1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBjb3B5IG9mIGFuIGFycmF5IG9mIGZvcm1zLlxuICogVGhlIGZvcm1zIGFuZCB0aGVpciByZXBlYXRpbmcgc2xpZGVzIGFyZSBjb3BpZWQgd2l0aCBzcHJlYWQsXG4gKiB3aXRoIG9ubHkgb25lIGxldmVsIG9mIGRlcHRoLlxuICovXG5mdW5jdGlvbiBjbG9uZU1haW5Gb3Jtcyhmb3JtczogTWFpbkZvcm1bXSk6IE1haW5Gb3JtW10ge1xuICBsZXQgcmVzOiBNYWluRm9ybVtdID0gW107XG4gIGZvciAoY29uc3QgZm9ybSBvZiBmb3Jtcykge1xuICAgIGlmIChmb3JtID09IG51bGwpIHtcbiAgICAgIHJlcy5wdXNoKGZvcm0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGxldCByZXBzOiBJbnN0YW5jZXMgPSB7fTtcbiAgICBpZiAoZm9ybS5yZXBzICE9IG51bGwpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGZvcm0ucmVwcykge1xuICAgICAgICByZXBzW2tleV0gPSBmb3JtLnJlcHNba2V5XS5tYXAocmVwID0+ICh7Li4ucmVwfSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXMucHVzaCh7Li4uZm9ybSwgcmVwc30pO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBldmFsdWF0ZUV4cHJlc3Npb24oZXhwcmVzc2lvbjogc3RyaW5nLCBjb250ZXh0PzogQWpmQ29udGV4dCk6IGFueSB7XG4gIHJldHVybiBjcmVhdGVGdW5jdGlvbihleHByZXNzaW9uKShjb250ZXh0KTtcbn1cblxudHlwZSBGdW5jID0gKGM/OiBBamZDb250ZXh0KSA9PiBhbnk7XG5cbmNvbnN0IGZhbHNlRnVuYzogRnVuYyA9IF8gPT4gZmFsc2U7XG5cbmNvbnN0IGNhY2hlID0gbmV3IE1hcDxzdHJpbmcsIEZ1bmM+KCk7XG5mb3IgKGNvbnN0IHN0ciBvZiBbJycsICd1bmRlZmluZWQnLCAnZmFsc2UnLCAnW29iamVjdCBPYmplY3RdJ10pIHtcbiAgY2FjaGUuc2V0KHN0ciwgZmFsc2VGdW5jKTtcbn1cbmNhY2hlLnNldCgnbnVsbCcsIF8gPT4gbnVsbCk7XG5jYWNoZS5zZXQoJ3RydWUnLCBfID0+IHRydWUpO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRnVuY3Rpb24oZXhwcmVzc2lvbjogc3RyaW5nKTogRnVuYyB7XG4gIGV4cHJlc3Npb24gPSBTdHJpbmcoZXhwcmVzc2lvbikudHJpbSgpO1xuICBjb25zdCBoaXQgPSBjYWNoZS5nZXQoZXhwcmVzc2lvbik7XG4gIGlmIChoaXQpIHtcbiAgICByZXR1cm4gaGl0O1xuICB9XG4gIGNvbnN0IGZ1bmMgPSBjcmVhdGVOZXdGdW5jdGlvbihleHByZXNzaW9uKTtcbiAgY2FjaGUuc2V0KGV4cHJlc3Npb24sIGZ1bmMpO1xuICByZXR1cm4gZnVuYztcbn1cblxuZnVuY3Rpb24gY3JlYXRlTmV3RnVuY3Rpb24oZXhwcmVzc2lvbjogc3RyaW5nKTogRnVuYyB7XG4gIC8vIEZhc3QgcGF0aCBmb3Igc2luZ2x5LXF1b3RlZCBzdHJpbmdzXG4gIGlmIChleHByZXNzaW9uLnN0YXJ0c1dpdGgoXCInXCIpICYmIC9eJ1teJ10qJyQvLnRlc3QoZXhwcmVzc2lvbikpIHtcbiAgICBjb25zdCB2YWwgPSBleHByZXNzaW9uLnNsaWNlKDEsIC0xKTtcbiAgICByZXR1cm4gXyA9PiB2YWw7XG4gIH1cbiAgLy8gRmFzdCBwYXRoIGZvciBleHByZXNzaW9ucyB0aGF0IGNvbnNpc3Qgb2YgYSBzaW5nbGUgaWRlbnRpZmllclxuICBpZiAoL15bYS16QS1aXyRdW1xcdyRdKiQvLnRlc3QoZXhwcmVzc2lvbikpIHtcbiAgICByZXR1cm4gYyA9PiAoYyA9PSBudWxsIHx8IGNbZXhwcmVzc2lvbl0gPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjW2V4cHJlc3Npb25dKTtcbiAgfVxuICAvLyBGYXN0IHBhdGggZm9yIGV4cHJlc3Npb25zIHRoYXQgYXJlIHB1cmUganNvbi5cbiAgLy8gQWxzbyB3b3JrcyBmb3IgbnVtYmVycywgXCJzdHJpbmdzXCIgYW5kIGFycmF5c1xuICB0cnkge1xuICAgIGNvbnN0IHZhbCA9IEpTT04ucGFyc2UoZXhwcmVzc2lvbik7XG4gICAgcmV0dXJuIF8gPT4gdmFsO1xuICB9IGNhdGNoIHt9XG5cbiAgZXhwcmVzc2lvbiA9ICcoJyArIGV4cHJlc3Npb24gKyAnKSc7XG4gIGNvbnN0IGFyZ05hbWVzID0gWy4uLmdldEFyZ3VtZW50TmFtZXMoZXhwcmVzc2lvbikuYWRkKCdleGVjQ29udGV4dCcpXTtcbiAgbGV0IGZ1bmM6IEZ1bmN0aW9uO1xuICB0cnkge1xuICAgIGZ1bmMgPSBuZXcgRnVuY3Rpb24oLi4uYXJnTmFtZXMsICdyZXR1cm4gJyArIGV4cHJlc3Npb24pO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2VGdW5jO1xuICB9XG4gIHJldHVybiBjb250ZXh0ID0+IHtcbiAgICBjb25zdCBhcmdWYWx1ZXMgPSBhcmdOYW1lcy5tYXAobmFtZSA9PiB7XG4gICAgICBpZiAoY29udGV4dCAhPSBudWxsICYmIGNvbnRleHRbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gY29udGV4dFtuYW1lXTtcbiAgICAgIH1cbiAgICAgIGlmIChBamZFeHByZXNzaW9uVXRpbHMudXRpbHNbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gQWpmRXhwcmVzc2lvblV0aWxzLnV0aWxzW25hbWVdLmZuO1xuICAgICAgfVxuICAgICAgaWYgKG5hbWUgPT09ICdleGVjQ29udGV4dCcpIHtcbiAgICAgICAgcmV0dXJuIGV4ZWNDb250ZXh0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jKC4uLmFyZ1ZhbHVlcyk7XG4gICAgfSBjYXRjaCB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIEl0IHJldHVybnMgdGhlIGNvdW50IG9mIGRpZ2l0IGluc2lkZSB4LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlnaXRDb3VudCh4OiBudW1iZXIpOiBudW1iZXIge1xuICBpZiAoaXNOYU4oeCkgfHwgdHlwZW9mIHggIT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgaWYgKCFpc0Zpbml0ZSh4KSkge1xuICAgIHJldHVybiBJbmZpbml0eTtcbiAgfVxuICByZXR1cm4geC50b1N0cmluZygpLnJlcGxhY2UoL1teMC05XS9nLCAnJykubGVuZ3RoO1xufVxuXG4vKipcbiAqIEl0IGlzIGNvdW50IHRoZSBjb3VudCBvZiBkZWNpbWFsIGRpZ2l0IGluc2lkZSBzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjaW1hbENvdW50KHg6IHN0cmluZyB8IG51bWJlcik6IG51bWJlciB7XG4gIGlmICh0eXBlb2YgeCA9PT0gJ3N0cmluZycpIHtcbiAgICB4ID0gcGFyc2VGbG9hdCh4KTtcbiAgfVxuICBpZiAodHlwZW9mIHggIT09ICdudW1iZXInIHx8IGlzTmFOKHgpKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgY29uc3QgcGFydHMgPSB4LnRvU3RyaW5nKCkuc3BsaXQoJy4nKTtcbiAgcmV0dXJuIHBhcnRzLmxlbmd0aCA+IDEgPyBwYXJ0c1sxXS5sZW5ndGggOiAwO1xufVxuXG4vKipcbiAqIEl0IGlzIHRydWUgaWYgeCBpcyBhbiBpbnRlZ2VyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJbnQoeDogc3RyaW5nIHwgbnVtYmVyKTogYm9vbGVhbiB7XG4gIGlmICh0eXBlb2YgeCA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gL14tP1xcZCskLy50ZXN0KHgpO1xuICB9XG4gIGlmICh0eXBlb2YgeCA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh4KSA9PT0geDtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogSXQgaXMgdHJ1ZSBpZiB4IGlzIG5vdCBlbXB0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vdEVtcHR5KHg6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gISh4ID09IG51bGwgfHwgeC50b1N0cmluZygpID09PSAnJyk7XG59XG5cbi8qKlxuICogSXQgaXMgdHJ1ZSBpZiBhcnJheSBjb250YWlucyB4IG9yIGFycmF5IGlzIGVxdWFsIHRvIHguXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWx1ZUluQ2hvaWNlKGFycmF5OiBhbnlbXSwgeDogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiAoYXJyYXkgfHwgW10pLmluZGV4T2YoeCkgPiAtMSB8fCBhcnJheSA9PT0geDtcbn1cblxuLyoqXG4gKiBGaXhlZCBkZWNpbWFscyBmb3IgZmxvYXRpbmcgbnVtYmVyXG4gKiBSZXNvbHZlIGZsb2F0IHN1bSBwcm9ibGVtcyBsaWtlIHRoaXM6IDAuMSArIDAuMiA9IDAuMzAwMDAwMDAwMDAwMDAwMDRcbiAqIEBwYXJhbSBudW1cbiAqIEByZXR1cm5zXG4gKi9cbmZ1bmN0aW9uIHRydW5jYXRlMTAobnVtOiBudW1iZXIpIHtcbiAgcmV0dXJuIHBhcnNlRmxvYXQobnVtLnRvRml4ZWQoMTApKTtcbn1cblxuLyoqXG4gKiBJdCByb3VuZHMgdGhlIG51bSB3aXRoIHRoZSB2YWx1ZSBvZiBkaWdpdHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJvdW5kKG46IG51bWJlciwgZGlnaXRzOiBudW1iZXIgPSAwKTogbnVtYmVyIHtcbiAgY29uc3QgbSA9IE1hdGgucG93KDEwLCBkaWdpdHMpO1xuICByZXR1cm4gTWF0aC5yb3VuZChuICogbSkgLyBtO1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgY29udGFpbmluZyBhbGwgdGhlIHZhbHVlcyB0aGF0IHRoZSBzcGVjaWZpZWQgZmllbGQgdGFrZXMgaW4gdGhlIGZvcm1zLlxuICogVGhlIHZhbHVlcyBhcmUgY29udmVydGVkIHRvIHN0cmluZ3MuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBBTExfVkFMVUVTX09GKFxuICBmb3JtczogTWFpbkZvcm1bXSxcbiAgZmllbGQ6IHN0cmluZyxcbiAgZmlsdGVyOiBGdW5jIHwgc3RyaW5nID0gJ3RydWUnLFxuKTogc3RyaW5nW10ge1xuICBmb3JtcyA9IChmb3JtcyB8fCBbXSkuZmlsdGVyKGYgPT4gZiAhPSBudWxsKTtcbiAgaWYgKHR5cGVvZiBmaWx0ZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgZmlsdGVyID0gY3JlYXRlRnVuY3Rpb24oZmlsdGVyKTtcbiAgfVxuICBsZXQgdmFsdWVzOiBzdHJpbmdbXSA9IFtdO1xuICBmb3IgKGNvbnN0IGZvcm0gb2YgZm9ybXMpIHtcbiAgICBpZiAoZm9ybVtmaWVsZF0gIT0gbnVsbCAmJiBmaWx0ZXIoZm9ybSkpIHtcbiAgICAgIGlmICh0eXBlb2YgZm9ybVtmaWVsZF0gPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KGZvcm1bZmllbGRdKSkge1xuICAgICAgICB2YWx1ZXMucHVzaChKU09OLnN0cmluZ2lmeShmb3JtW2ZpZWxkXSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWVzLnB1c2goU3RyaW5nKGZvcm1bZmllbGRdKSk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3QgcmVwIG9mIGFsbFJlcHMoZm9ybSkpIHtcbiAgICAgIGlmIChyZXBbZmllbGRdICE9IG51bGwgJiYgZmlsdGVyKHsuLi5mb3JtLCAuLi5yZXB9KSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcFtmaWVsZF0gPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHJlcFtmaWVsZF0pKSB7XG4gICAgICAgICAgdmFsdWVzLnB1c2goSlNPTi5zdHJpbmdpZnkocmVwW2ZpZWxkXSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlcy5wdXNoKFN0cmluZyhyZXBbZmllbGRdKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFsuLi5uZXcgU2V0KHZhbHVlcyldO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGxhaW5BcnJheShwYXJhbXM6IGFueVtdKTogYW55W10ge1xuICBjb25zdCByZXM6IGFueVtdID0gW107XG4gIGZvciAoY29uc3QgcGFyYW0gb2YgcGFyYW1zKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocGFyYW0pKSB7XG4gICAgICByZXMucHVzaCguLi5wYXJhbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcy5wdXNoKHBhcmFtKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuaW50ZXJmYWNlIFBvaW50IHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG4gIHI/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFBvaW50RGF0YSh4czogbnVtYmVyW10sIHlzOiBudW1iZXJbXSwgcnM/OiBudW1iZXJbXSk6IFBvaW50W10ge1xuICB4cyA9IHhzIHx8IFtdO1xuICB5cyA9IHlzIHx8IFtdO1xuICBycyA9IHJzIHx8IFtdO1xuICBjb25zdCBwb2ludHM6IFBvaW50W10gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgIHBvaW50cy5wdXNoKHt4OiB4c1tpXSwgeTogeXNbaV0sIHI6IHJzW2ldfSk7XG4gIH1cbiAgcmV0dXJuIHBvaW50cztcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZm9ybXMgZm9yIHdoaWNoIGZpbHRlciBldmFsdWF0ZXMgdG8gdHJ1ZSxcbiAqIGZvciB0aGUgZm9ybSBpdHNlbGYgb3IgZm9yIGFueSBvZiBpdHMgcmVwZXRpdGlvbnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT1VOVF9GT1JNUyhmb3JtczogTWFpbkZvcm1bXSwgZmlsdGVyOiBGdW5jIHwgc3RyaW5nID0gJ3RydWUnKTogbnVtYmVyIHtcbiAgZm9ybXMgPSAoZm9ybXMgfHwgW10pLmZpbHRlcihmID0+IGYgIT0gbnVsbCk7XG4gIGlmIChmaWx0ZXIgPT09ICd0cnVlJykge1xuICAgIHJldHVybiBmb3Jtcy5sZW5ndGg7XG4gIH1cbiAgaWYgKHR5cGVvZiBmaWx0ZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgZmlsdGVyID0gY3JlYXRlRnVuY3Rpb24oZmlsdGVyKTtcbiAgfVxuICBsZXQgY291bnQgPSAwO1xuICBmb3IgKGNvbnN0IGZvcm0gb2YgZm9ybXMpIHtcbiAgICBpZiAoZmlsdGVyKGZvcm0pKSB7XG4gICAgICBjb3VudCsrO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGZvciAoY29uc3QgcmVwIG9mIGFsbFJlcHMoZm9ybSkpIHtcbiAgICAgIGlmIChmaWx0ZXIoey4uLmZvcm0sIC4uLnJlcH0pKSB7XG4gICAgICAgIGNvdW50Kys7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY291bnQ7XG59XG5cbi8qKlxuICogQ291bnRzIHRoZSBmb3JtcyBhbmQgYWxsIG9mIHRoZWlyIHJlcGV0aXRpb25zIGZvciB3aGljaCBmaWx0ZXIgZXZhbHVhdGVzIHRvIHRydWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT1VOVF9SRVBTKGZvcm1zOiBNYWluRm9ybVtdLCBmaWx0ZXI6IEZ1bmMgfCBzdHJpbmcgPSAndHJ1ZScpOiBudW1iZXIge1xuICBmb3JtcyA9IChmb3JtcyB8fCBbXSkuZmlsdGVyKGYgPT4gZiAhPSBudWxsKTtcbiAgaWYgKHR5cGVvZiBmaWx0ZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgZmlsdGVyID0gY3JlYXRlRnVuY3Rpb24oZmlsdGVyKTtcbiAgfVxuICBsZXQgY291bnQgPSAwO1xuICBmb3IgKGNvbnN0IGZvcm0gb2YgZm9ybXMpIHtcbiAgICBpZiAoZmlsdGVyKGZvcm0pKSB7XG4gICAgICBjb3VudCsrO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHJlcCBvZiBhbGxSZXBzKGZvcm0pKSB7XG4gICAgICBpZiAoZmlsdGVyKHsuLi5mb3JtLCAuLi5yZXB9KSkge1xuICAgICAgICBjb3VudCsrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY291bnQ7XG59XG5cbi8qKlxuICogRGVwcmVjYXRlZC4gVXNlIExFTihBTExfVkFMVUVTX09GKVxuICovXG5leHBvcnQgZnVuY3Rpb24gQ09VTlRfRk9STVNfVU5JUVVFKFxuICBmb3JtczogTWFpbkZvcm1bXSxcbiAgZmllbGQ6IHN0cmluZyxcbiAgZmlsdGVyOiBGdW5jIHwgc3RyaW5nID0gJ3RydWUnLFxuKTogbnVtYmVyIHtcbiAgcmV0dXJuIEFMTF9WQUxVRVNfT0YoZm9ybXMsIGZpZWxkLCBmaWx0ZXIpLmxlbmd0aDtcbn1cblxuZnVuY3Rpb24gZ2V0TnVtZXJpY1ZhbHVlcyhcbiAgZm9ybXM6IChNYWluRm9ybSB8IEZvcm0pW10sXG4gIGZpZWxkOiBzdHJpbmcsXG4gIGZpbHRlcjogRnVuYyB8IHN0cmluZyA9ICd0cnVlJyxcbik6IG51bWJlcltdIHtcbiAgZm9ybXMgPSAoZm9ybXMgfHwgW10pLmZpbHRlcihmID0+IGYgIT0gbnVsbCk7XG4gIGlmICh0eXBlb2YgZmlsdGVyID09PSAnc3RyaW5nJykge1xuICAgIGZpbHRlciA9IGNyZWF0ZUZ1bmN0aW9uKGZpbHRlcik7XG4gIH1cbiAgbGV0IHZhbHVlczogbnVtYmVyW10gPSBbXTtcbiAgZm9yIChjb25zdCBmb3JtIG9mIGZvcm1zKSB7XG4gICAgY29uc3QgdmFsID0gZm9ybVtmaWVsZF07XG4gICAgaWYgKHZhbCAhPSBudWxsICYmICFpc05hTihOdW1iZXIodmFsKSkgJiYgZmlsdGVyKGZvcm0pKSB7XG4gICAgICB2YWx1ZXMucHVzaChOdW1iZXIodmFsKSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgcmVwIG9mIGFsbFJlcHMoZm9ybSkpIHtcbiAgICAgIGNvbnN0IHZhbCA9IHJlcCA/IHJlcFtmaWVsZF0gOiBudWxsO1xuICAgICAgaWYgKHZhbCAhPSBudWxsICYmICFpc05hTihOdW1iZXIodmFsKSkgJiYgZmlsdGVyKHsuLi5mb3JtLCAuLi5yZXB9KSkge1xuICAgICAgICB2YWx1ZXMucHVzaChOdW1iZXIodmFsKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB2YWx1ZXM7XG59XG5cbi8qKlxuICogQWdncmVnYXRlcyBhbmQgc3VtcyB0aGUgdmFsdWVzIG9mIHRoZSBzcGVjaWZpZWQgZmllbGQuXG4gKiBBbiBvcHRpb25hbCBleHByZXNzaW9uIGNhbiBiZSBhZGRlZCB0byBmaWx0ZXIgd2hpY2ggZm9ybXMgdG8gdGFrZSBmb3IgdGhlIHN1bS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFNVTShcbiAgZm9ybXM6IChNYWluRm9ybSB8IEZvcm0pW10sXG4gIGZpZWxkOiBzdHJpbmcsXG4gIGZpbHRlcjogRnVuYyB8IHN0cmluZyA9ICd0cnVlJyxcbik6IG51bWJlciB7XG4gIGNvbnN0IHZhbHVlcyA9IGdldE51bWVyaWNWYWx1ZXMoZm9ybXMsIGZpZWxkLCBmaWx0ZXIpO1xuICBsZXQgc3VtID0gMDtcbiAgZm9yIChjb25zdCB2YWwgb2YgdmFsdWVzKSB7XG4gICAgc3VtICs9IHZhbDtcbiAgfVxuICByZXR1cm4gdHJ1bmNhdGUxMChzdW0pO1xufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBtZWFuIG9mIHRoZSB2YWx1ZXMgb2YgdGhlIHNwZWNpZmllZCBmaWVsZC5cbiAqIEFuIG9wdGlvbmFsIGV4cHJlc3Npb24gY2FuIGJlIGFkZGVkIHRvIGZpbHRlciB3aGljaCBmb3JtcyB0byB0YWtlIGZvciB0aGUgc3VtLlxuICovXG5leHBvcnQgZnVuY3Rpb24gTUVBTihcbiAgZm9ybXM6IChGb3JtIHwgTWFpbkZvcm0pW10sXG4gIGZpZWxkOiBzdHJpbmcsXG4gIGZpbHRlcjogRnVuYyB8IHN0cmluZyA9ICd0cnVlJyxcbik6IG51bWJlciB7XG4gIGNvbnN0IHZhbHVlcyA9IGdldE51bWVyaWNWYWx1ZXMoZm9ybXMsIGZpZWxkLCBmaWx0ZXIpO1xuICBsZXQgc3VtID0gMDtcbiAgZm9yIChjb25zdCB2YWwgb2YgdmFsdWVzKSB7XG4gICAgc3VtICs9IHZhbDtcbiAgfVxuICByZXR1cm4gdHJ1bmNhdGUxMChzdW0gLyB2YWx1ZXMubGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgU3RhbmRhcmQgRGV2aWF0aW9uIG9mIHRoZSB2YWx1ZXMgb2YgdGhlIHNwZWNpZmllZCBmaWVsZC5cbiAqIEFuIG9wdGlvbmFsIGV4cHJlc3Npb24gY2FuIGJlIGFkZGVkIHRvIGZpbHRlciB3aGljaCBmb3JtcyB0byB0YWtlIGZvciB0aGUgY2FsY3VsYXRpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBTVEQoXG4gIGZvcm1zOiAoRm9ybSB8IE1haW5Gb3JtKVtdLFxuICBmaWVsZDogc3RyaW5nLFxuICBmaWx0ZXI6IEZ1bmMgfCBzdHJpbmcgPSAndHJ1ZScsXG4pOiBudW1iZXIge1xuICBjb25zdCBtZWFuID0gTUVBTihmb3JtcywgZmllbGQsIGZpbHRlcik7XG4gIGNvbnN0IHZhbHVlcyA9IGdldE51bWVyaWNWYWx1ZXMoZm9ybXMsIGZpZWxkLCBmaWx0ZXIpO1xuICBpZiAodmFsdWVzLmxlbmd0aCA+IDEpIHtcbiAgICBsZXQgcXVhZERldmlhdGlvblRvdCA9IDA7XG4gICAgZm9yIChsZXQgdmFsIG9mIHZhbHVlcykge1xuICAgICAgcXVhZERldmlhdGlvblRvdCArPSBNYXRoLnBvdyh2YWwgLSBtZWFuLCAyKTtcbiAgICB9XG4gICAgY29uc3Qgc3RkID0gTWF0aC5zcXJ0KHF1YWREZXZpYXRpb25Ub3QgLyAodmFsdWVzLmxlbmd0aCAtIDEpKTtcbiAgICByZXR1cm4gdHJ1bmNhdGUxMChzdGQpO1xuICB9XG4gIHJldHVybiBOYU47XG59XG5cbi8qKlxuICogUmV0dXJucyBhL2IgKiAxMDAgKyAnJSdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFBFUkNFTlQoYTogbnVtYmVyLCBiOiBudW1iZXIpOiBzdHJpbmcge1xuICByZXR1cm4gYS9iICogMTAwICsgJyUnO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHBlcmNlbnRhZ2UgY2hhbmdlIGJldHdlZW4gYSB2YWx1ZSBhbmQgaGlzIGJhc2UgcmVmZXJlbmNlIHZhbHVlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gUEVSQ0VOVEFHRV9DSEFOR0UoXG4gIHZhbHVlOiBudW1iZXIgfCBzdHJpbmcsXG4gIHJlZmVyZW5jZV92YWx1ZTogbnVtYmVyIHwgc3RyaW5nLFxuKTogbnVtYmVyIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUuZW5kc1dpdGgoJyUnKSkge1xuICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMCwgLTEpO1xuICB9XG4gIGlmICh0eXBlb2YgcmVmZXJlbmNlX3ZhbHVlID09PSAnc3RyaW5nJyAmJiByZWZlcmVuY2VfdmFsdWUuZW5kc1dpdGgoJyUnKSkge1xuICAgIHJlZmVyZW5jZV92YWx1ZSA9IHJlZmVyZW5jZV92YWx1ZS5zbGljZSgwLCAtMSk7XG4gIH1cbiAgY29uc3QgY3VyciA9IE51bWJlcih2YWx1ZSk7XG4gIGNvbnN0IHJlZiA9IE51bWJlcihyZWZlcmVuY2VfdmFsdWUpO1xuICBjb25zdCByZXMgPSAoKGN1cnIgLSByZWYpIC8gcmVmKSAqIDEwMDtcbiAgcmV0dXJuIHJvdW5kKHJlcywgMSk7XG59XG5cbi8qKlxuICogRXZhbHVhdGVzIHRoZSBleHByZXNzaW9uIGluIHRoZSBmaXJzdCBmb3JtIGJ5IGRhdGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBGSVJTVChcbiAgZm9ybXM6IChGb3JtIHwgTWFpbkZvcm0pW10sXG4gIGV4cHJlc3Npb246IEZ1bmMgfCBzdHJpbmcsXG4gIGRhdGUgPSAnZGlub19jcmVhdGVkX2F0Jyxcbik6IGFueSB7XG4gIGlmICh0eXBlb2YgZXhwcmVzc2lvbiA9PT0gJ3N0cmluZycpIHtcbiAgICBleHByZXNzaW9uID0gY3JlYXRlRnVuY3Rpb24oZXhwcmVzc2lvbik7XG4gIH1cbiAgZm9ybXMgPSAoZm9ybXMgfHwgW10pLmZpbHRlcihmID0+IGYgIT0gbnVsbCAmJiBmW2RhdGVdICE9IG51bGwpO1xuICBpZiAoZm9ybXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBsZXQgZm9ybSA9IGZvcm1zWzBdO1xuICBsZXQgbWluRGF0ZSA9IGZvcm1bZGF0ZV0gYXMgc3RyaW5nO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IGZvcm1zLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKChmb3Jtc1tpXVtkYXRlXSBhcyBzdHJpbmcpIDwgbWluRGF0ZSkge1xuICAgICAgZm9ybSA9IGZvcm1zW2ldO1xuICAgICAgbWluRGF0ZSA9IGZvcm1bZGF0ZV0gYXMgc3RyaW5nO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZXhwcmVzc2lvbihmb3JtKTtcbn1cblxuLyoqXG4gKiBFdmFsdWF0ZXMgdGhlIGV4cHJlc3Npb24gaW4gdGhlIGxhc3QgZm9ybSBieSBkYXRlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gTEFTVChcbiAgZm9ybXM6IChGb3JtIHwgTWFpbkZvcm0pW10sXG4gIGV4cHJlc3Npb246IEZ1bmMgfCBzdHJpbmcsXG4gIGRhdGUgPSAnZGlub19jcmVhdGVkX2F0Jyxcbik6IGFueSB7XG4gIGlmICh0eXBlb2YgZXhwcmVzc2lvbiA9PT0gJ3N0cmluZycpIHtcbiAgICBleHByZXNzaW9uID0gY3JlYXRlRnVuY3Rpb24oZXhwcmVzc2lvbik7XG4gIH1cbiAgZm9ybXMgPSAoZm9ybXMgfHwgW10pLmZpbHRlcihmID0+IGYgIT0gbnVsbCAmJiBmW2RhdGVdICE9IG51bGwpO1xuICBpZiAoZm9ybXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBsZXQgZm9ybSA9IGZvcm1zW2Zvcm1zLmxlbmd0aCAtIDFdO1xuICBsZXQgbWF4RGF0ZSA9IGZvcm1bZGF0ZV0gYXMgc3RyaW5nO1xuICBmb3IgKGxldCBpID0gZm9ybXMubGVuZ3RoIC0gMjsgaSA+PSAwOyBpLS0pIHtcbiAgICBpZiAoKGZvcm1zW2ldW2RhdGVdIGFzIHN0cmluZykgPiBtYXhEYXRlKSB7XG4gICAgICBmb3JtID0gZm9ybXNbaV07XG4gICAgICBtYXhEYXRlID0gZm9ybVtkYXRlXSBhcyBzdHJpbmc7XG4gICAgfVxuICB9XG4gIHJldHVybiBleHByZXNzaW9uKGZvcm0pO1xufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBtaW4gdmFsdWUgb2YgdGhlIGZpZWxkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gTUlOKFxuICBmb3JtczogKEZvcm0gfCBNYWluRm9ybSlbXSxcbiAgZmllbGQ6IHN0cmluZyxcbiAgZmlsdGVyOiBGdW5jIHwgc3RyaW5nID0gJ3RydWUnLFxuKTogbnVtYmVyIHtcbiAgY29uc3QgdmFsdWVzID0gZ2V0TnVtZXJpY1ZhbHVlcyhmb3JtcywgZmllbGQsIGZpbHRlcik7XG4gIGxldCBtaW4gPSArSW5maW5pdHk7XG4gIGZvciAoY29uc3QgdmFsIG9mIHZhbHVlcykge1xuICAgIGlmICh2YWwgPCBtaW4pIHtcbiAgICAgIG1pbiA9IHZhbDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1pbjtcbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgbWF4IHZhbHVlIG9mIHRoZSBmaWVsZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1BWChcbiAgZm9ybXM6IChGb3JtIHwgTWFpbkZvcm0pW10sXG4gIGZpZWxkOiBzdHJpbmcsXG4gIGZpbHRlcjogRnVuYyB8IHN0cmluZyA9ICd0cnVlJyxcbik6IG51bWJlciB7XG4gIGNvbnN0IHZhbHVlcyA9IGdldE51bWVyaWNWYWx1ZXMoZm9ybXMsIGZpZWxkLCBmaWx0ZXIpO1xuICBsZXQgbWF4ID0gLUluZmluaXR5O1xuICBmb3IgKGNvbnN0IHZhbCBvZiB2YWx1ZXMpIHtcbiAgICBpZiAodmFsID4gbWF4KSB7XG4gICAgICBtYXggPSB2YWw7XG4gICAgfVxuICB9XG4gIHJldHVybiBtYXg7XG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIG1lZGlhbiB2YWx1ZSBvZiB0aGUgZmllbGQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBNRURJQU4oXG4gIGZvcm1zOiAoRm9ybSB8IE1haW5Gb3JtKVtdLFxuICBmaWVsZDogc3RyaW5nLFxuICBmaWx0ZXI6IEZ1bmMgfCBzdHJpbmcgPSAndHJ1ZScsXG4pOiBudW1iZXIge1xuICBjb25zdCB2YWx1ZXMgPSBnZXROdW1lcmljVmFsdWVzKGZvcm1zLCBmaWVsZCwgZmlsdGVyKS5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG4gIGlmICh2YWx1ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIE5hTjtcbiAgfVxuICBsZXQgbWVkaWFuVmFsID0gTmFOO1xuICBsZXQgbWlkZGxlSWR4ID0gTWF0aC5mbG9vcih2YWx1ZXMubGVuZ3RoIC8gMik7XG4gIGlmICh2YWx1ZXMubGVuZ3RoICUgMikge1xuICAgIG1lZGlhblZhbCA9IHZhbHVlc1ttaWRkbGVJZHhdO1xuICB9IGVsc2Uge1xuICAgIG1lZGlhblZhbCA9ICh2YWx1ZXNbbWlkZGxlSWR4IC0gMV0gKyB2YWx1ZXNbbWlkZGxlSWR4XSkgLyAyO1xuICB9XG4gIHJldHVybiBtZWRpYW5WYWw7XG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIG1vZGUgdmFsdWUgb2YgdGhlIGZpZWxkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gTU9ERShcbiAgZm9ybXM6IChGb3JtIHwgTWFpbkZvcm0pW10sXG4gIGZpZWxkOiBzdHJpbmcsXG4gIGZpbHRlcjogRnVuYyB8IHN0cmluZyA9ICd0cnVlJyxcbik6IG51bWJlciB7XG4gIGNvbnN0IHZhbHVlcyA9IGdldE51bWVyaWNWYWx1ZXMoZm9ybXMsIGZpZWxkLCBmaWx0ZXIpO1xuICBjb25zdCBjb3VudGVyczoge1t2YWw6IG51bWJlcl06IG51bWJlcn0gPSB7fTtcbiAgZm9yIChjb25zdCB2YWwgb2YgdmFsdWVzKSB7XG4gICAgaWYgKGNvdW50ZXJzW3ZhbF0gPT0gbnVsbCkge1xuICAgICAgY291bnRlcnNbdmFsXSA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvdW50ZXJzW3ZhbF0rKztcbiAgICB9XG4gIH1cbiAgbGV0IG1heENvdW50ID0gMDtcbiAgZm9yIChjb25zdCB2YWwgaW4gY291bnRlcnMpIHtcbiAgICBpZiAoY291bnRlcnNbdmFsXSA+IG1heENvdW50KSB7XG4gICAgICBtYXhDb3VudCA9IGNvdW50ZXJzW3ZhbF07XG4gICAgfVxuICB9XG4gIGZvciAoY29uc3QgdmFsIGluIGNvdW50ZXJzKSB7XG4gICAgaWYgKGNvdW50ZXJzW3ZhbF0gPT09IG1heENvdW50KSB7XG4gICAgICByZXR1cm4gTnVtYmVyKHZhbCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBOYU47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZERhdGFzZXQoXG4gIGRhdGFzZXQ6IChzdHJpbmcgfCBudW1iZXIgfCBzdHJpbmdbXSB8IG51bWJlcltdKVtdLFxuICBjb2xzcGFuczogbnVtYmVyW10sXG4pOiBBamZUYWJsZUNlbGxbXVtdIHtcbiAgcmV0dXJuIGJ1aWxkQWxpZ25lZERhdGFzZXQoZGF0YXNldCwgY29sc3BhbnMsIFtdKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIGRhdGFzZXQgZm9yIGFqZiBkeW5hbWljIHRhYmxlXG4gKiBAcGFyYW0gZGF0YXNldCB0aGUgZGF0YXNldCBmb3IgdGhlIHRhYmxlXG4gKiBAcGFyYW0gY29sc3BhbnMgY29sc3BhbiBmb3IgZWFjaCB2YWx1ZSBpbiB0aGUgZGF0YXNldFxuICogQHBhcmFtIHRleHRBbGlnbiBhbGlnbm1lbnQgZm9yIGVhY2ggdmFsdWUgaW4gdGhlIGRhdGFzZXRcbiAqIEByZXR1cm5zIEFuIEFqZlRhYmxlQ2VsbCBsaXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZEFsaWduZWREYXRhc2V0KFxuICBkYXRhc2V0OiAoc3RyaW5nIHwgbnVtYmVyIHwgc3RyaW5nW10gfCBudW1iZXJbXSlbXSxcbiAgY29sc3BhbnM6IG51bWJlcltdLFxuICB0ZXh0QWxpZ246IHN0cmluZ1tdLFxuKTogQWpmVGFibGVDZWxsW11bXSB7XG4gIGNvbnN0IHJlczogQWpmVGFibGVDZWxsW11bXSA9IFtdO1xuICBjb25zdCBub3JtYWxpemVEYXRhc2V0OiBhbnlbXVtdID0gW107XG4gIGRhdGFzZXQuZm9yRWFjaCgocm93OiBhbnksIGluZGV4Um93OiBudW1iZXIpID0+IHtcbiAgICByb3cgPSBBcnJheS5pc0FycmF5KHJvdykgPyByb3cgOiBbcm93XTtcbiAgICBub3JtYWxpemVEYXRhc2V0W2luZGV4Um93ICUgY29sc3BhbnMubGVuZ3RoXSA9XG4gICAgICBub3JtYWxpemVEYXRhc2V0W2luZGV4Um93ICUgY29sc3BhbnMubGVuZ3RoXSAhPSBudWxsXG4gICAgICAgID8gWy4uLm5vcm1hbGl6ZURhdGFzZXRbaW5kZXhSb3cgJSBjb2xzcGFucy5sZW5ndGhdLCAuLi5yb3ddXG4gICAgICAgIDogWy4uLnJvd107XG4gIH0pO1xuICBjb25zdCB0cmFuc3Bvc2UgPSBub3JtYWxpemVEYXRhc2V0WzBdLm1hcCgoXzogYW55LCBjb2xJbmRleDogbnVtYmVyKSA9PlxuICAgIG5vcm1hbGl6ZURhdGFzZXQubWFwKChyb3c6IGFueSkgPT4gcm93W2NvbEluZGV4XSksXG4gICk7XG4gIHRyYW5zcG9zZS5mb3JFYWNoKChkYXRhOiBhbnlbXSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IHJvdzogQWpmVGFibGVDZWxsW10gPSBbXTtcbiAgICBkYXRhLmZvckVhY2goKGNlbGxWYWx1ZTogc3RyaW5nIHwgbnVtYmVyLCBjZWxsSW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgcm93LnB1c2goe1xuICAgICAgICB2YWx1ZTogY2VsbFZhbHVlLFxuICAgICAgICBjb2xzcGFuOiBjb2xzcGFuc1tjZWxsSW5kZXhdLFxuICAgICAgICByb3dzcGFuOiAxLFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIHRleHRBbGlnbjogdGV4dEFsaWduW2NlbGxJbmRleF0gPyB0ZXh0QWxpZ25bY2VsbEluZGV4XSA6ICdjZW50ZXInLFxuICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogaW5kZXggJSAyID09PSAwID8gJ3doaXRlJyA6ICcjZGRkJyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJlcy5wdXNoKHJvdyk7XG4gIH0pO1xuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgZGF0YXNldCBiYXNlZCBvbiBhIGxpc3Qgb2YgRm9ybXMsIGZvciBhamYgZHluYW1pYyB0YWJsZVxuICogQHBhcmFtIGRhdGFzZXQgdGhlIGRhdGFzZXQgZm9yIHRoZSB0YWJsZVxuICogQHBhcmFtIGZpZWxkcyB0aGUgbGlzdCBvZiBmaWVsZHMgbmFtZSBmb3IgZWFjaCByb3dcbiAqIEBwYXJhbSByb3dMaW5rIHRoZSBodHRwIGxpbmsgZm9yIHRoZSByb3csIHdpdGggdGhlIGZvcm0gZmllbGQgbmFtZSB3aXRoIHRoZSBsaW5rIHZhbHVlIGFuZCB0aGUgY29sdW1uIHBvc2l0aW9uIGZvciB0aGUgbGluay5cbiAqIGllOiB7J2xpbmsnOiAnaG9tZV9saW5rJywgJ3Bvc2l0aW9uJzogMH1cbiAqIEBwYXJhbSBiYWNrZ3JvdW5kQ29sb3JBIHRoZSBmaXJzdCBiYWNrZ3JvdWQgY29sb3JcbiAqIEBwYXJhbSBiYWNrZ3JvdW5kQ29sb3JCIHRoZSBzZWNvbmQgYmFja2dyb3VkIGNvbG9yXG4gKiBAcmV0dXJucyBBbiBBamZUYWJsZUNlbGwgbGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRGb3JtRGF0YXNldChcbiAgZGF0YXNldDogTWFpbkZvcm1bXSxcbiAgZmllbGRzOiBzdHJpbmdbXSxcbiAgcm93TGluazoge2xpbms6IHN0cmluZzsgcG9zaXRpb246IG51bWJlcn0gfCBudWxsLFxuICBfYmFja2dyb3VuZENvbG9yQT86IHN0cmluZyxcbiAgX2JhY2tncm91bmRDb2xvckI/OiBzdHJpbmcsXG4pOiBBamZUYWJsZUNlbGxbXVtdIHtcbiAgcmV0dXJuIGJ1aWxkQWxpZ25lZEZvcm1EYXRhc2V0KGRhdGFzZXQsIGZpZWxkcywgW10sIFtdLCByb3dMaW5rLCBbXSwgW10pO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgZGF0YXNldCBiYXNlZCBvbiBhIGxpc3Qgb2YgRm9ybXMsIGZvciBhamYgZHluYW1pYyB0YWJsZVxuICogQHBhcmFtIGRhdGFzZXQgdGhlIGRhdGFzZXQgZm9yIHRoZSB0YWJsZVxuICogQHBhcmFtIGZpZWxkcyB0aGUgbGlzdCBvZiBmaWVsZHMgbmFtZSBmb3IgZWFjaCByb3dcbiAqIEBwYXJhbSBjb2xzcGFucyBjb2xzcGFuIGZvciBlYWNoIHZhbHVlIGluIHRoZSBkYXRhc2V0XG4gKiBAcGFyYW0gdGV4dEFsaWduIGFsaWdubWVudCBmb3IgZWFjaCB2YWx1ZSBpbiB0aGUgZGF0YXNldFxuICogQHBhcmFtIHJvd0xpbmsgdGhlIGh0dHAgbGluayBmb3IgdGhlIHJvdywgd2l0aCB0aGUgZm9ybSBmaWVsZCBuYW1lIHdpdGggdGhlIGxpbmsgdmFsdWUgYW5kIHRoZSBjb2x1bW4gcG9zaXRpb24gZm9yIHRoZSBsaW5rLlxuICogaWU6IHsnbGluayc6ICdob21lX2xpbmsnLCAncG9zaXRpb24nOiAwfVxuICogQHJldHVybnMgQW4gQWpmVGFibGVDZWxsIGxpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkQWxpZ25lZEZvcm1EYXRhc2V0KFxuICBkYXRhc2V0OiBNYWluRm9ybVtdLFxuICBmaWVsZHM6IHN0cmluZ1tdLFxuICBjb2xzcGFuczogbnVtYmVyW10sXG4gIHRleHRBbGlnbjogc3RyaW5nW10sXG4gIHJvd0xpbms6IHtsaW5rOiBzdHJpbmc7IHBvc2l0aW9uOiBudW1iZXJ9IHwgbnVsbCxcbiAgZGlhbG9nRmllbGRzOiBzdHJpbmdbXSxcbiAgZGlhbG9nTGFiZWxGaWVsZHM6IHN0cmluZ1tdLFxuKTogQWpmVGFibGVDZWxsW11bXSB7XG4gIGNvbnN0IHJlczogQWpmVGFibGVDZWxsW11bXSA9IFtdO1xuXG4gIGNvbnN0IGJhY2tncm91bmRDb2xvckEgPSAnd2hpdGUnO1xuICBjb25zdCBiYWNrZ3JvdW5kQ29sb3JCID0gJyNkZGQnO1xuICBpZiAoZGF0YXNldCkge1xuICAgIGxldCBpbmRleDogbnVtYmVyID0gMDtcbiAgICBkYXRhc2V0LmZvckVhY2goKGRhdGE6IE1haW5Gb3JtKSA9PiB7XG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICBpbmRleCsrO1xuICAgICAgICBjb25zdCByb3c6IEFqZlRhYmxlQ2VsbFtdID0gW107XG4gICAgICAgIGZpZWxkcy5mb3JFYWNoKChmaWVsZDogc3RyaW5nLCBjZWxsSWR4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICBsZXQgY2VsbFZhbHVlID0gZGF0YVtmaWVsZF0gfHwgJyc7XG4gICAgICAgICAgaWYgKHJvd0xpbmsgIT0gbnVsbCAmJiBjZWxsSWR4ID09PSByb3dMaW5rWydwb3NpdGlvbiddKSB7XG4gICAgICAgICAgICBjZWxsVmFsdWUgPSBgPGEgaHJlZj0nJHtkYXRhW3Jvd0xpbmtbJ2xpbmsnXV19Jz4gJHtkYXRhW2ZpZWxkXX08L2E+YDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcm93LnB1c2goe1xuICAgICAgICAgICAgdmFsdWU6IGNlbGxWYWx1ZSxcbiAgICAgICAgICAgIGNvbHNwYW46IGNvbHNwYW5zW2NlbGxJZHhdICYmIGNvbHNwYW5zW2NlbGxJZHhdID4gMCA/IGNvbHNwYW5zW2NlbGxJZHhdIDogMSxcbiAgICAgICAgICAgIHJvd3NwYW46IDEsXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICB0ZXh0QWxpZ246IHRleHRBbGlnbltjZWxsSWR4XSA/IHRleHRBbGlnbltjZWxsSWR4XSA6ICdjZW50ZXInLFxuICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpbmRleCAlIDIgPT09IDAgPyBiYWNrZ3JvdW5kQ29sb3JBIDogYmFja2dyb3VuZENvbG9yQixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChkaWFsb2dGaWVsZHMgJiYgZGlhbG9nRmllbGRzLmxlbmd0aCkge1xuICAgICAgICAgIGxldCBkaWFsb2dIdG1sOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgIGRpYWxvZ0ZpZWxkcy5mb3JFYWNoKChmaWVsZDogc3RyaW5nLCBjZWxsSWR4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGxldCBmaWVsZFZhbHVlID0gJ1wiXCInO1xuICAgICAgICAgICAgaWYgKGRhdGFbZmllbGRdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgZmllbGRWYWx1ZSA9XG4gICAgICAgICAgICAgICAgXCI8cCBjbGFzcz0nZGlhbG9nLWl0ZW0nPjxiPlwiICtcbiAgICAgICAgICAgICAgICBkaWFsb2dMYWJlbEZpZWxkc1tjZWxsSWR4XS5yZXBsYWNlKC9bJ1xcXCJdKy9nLCAnJykgK1xuICAgICAgICAgICAgICAgICc8L2I+IDxzcGFuPicgK1xuICAgICAgICAgICAgICAgIGRhdGFbZmllbGRdICtcbiAgICAgICAgICAgICAgICAnPC9zcGFuPjwvcD4nO1xuICAgICAgICAgICAgICBkaWFsb2dIdG1sLnB1c2goZmllbGRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByb3cucHVzaCh7XG4gICAgICAgICAgICB2YWx1ZTpcbiAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJyZWFkX21vcmVfY2VsbFwiPjxwIGNsYXNzPVwicmVhZF9tb3JlX3RleHRcIj5SZWFkIG1vcmU8L3A+PGIgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmFkZF9jaXJjbGVfb3V0bGluZTwvYj48L2Rpdj4nLFxuICAgICAgICAgICAgZGlhbG9nSHRtbDogZGlhbG9nSHRtbC5qb2luKCcgJyksXG4gICAgICAgICAgICBjb2xzcGFuOiAxLFxuICAgICAgICAgICAgcm93c3BhbjogMSxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGluZGV4ICUgMiA9PT0gMCA/IGJhY2tncm91bmRDb2xvckEgOiBiYWNrZ3JvdW5kQ29sb3JCLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXMucHVzaChyb3cpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogY3JlYXRlIGEgd2lkZ2V0IGRhdGFzZXQgaW50byBhIGNvbnRlbnQgbGlzdCwgYmFzZWQgb24gYSBsaXN0IG9mIEZvcm1zLCBmb3IgcGFnaW5hdGVkIHdpZGdldFxuICpcbiAqIEBwYXJhbSBkYXRhc2V0IHRoZSBkYXRhc2V0IGZvciB0aGUgd2lkZ2V0c1xuICogQHBhcmFtIGZpZWxkcyB0aGUgbGlzdCBvZiBmaWVsZHMgbmFtZSBmb3IgZWFjaCByb3dcbiAqIEBwYXJhbSByb3dMaW5rIHRoZSBodHRwIGxpbmsgZm9yIHRoZSByb3csIHdpdGggdGhlIGZvcm0gZmllbGQgbmFtZSB3aXRoIHRoZSBsaW5rIHZhbHVlIGFuZCB0aGUgY29sdW1uIHBvc2l0aW9uIGZvciB0aGUgbGluay5cbiAqIGllOiB7J2xpbmsnOiAnaG9tZV9saW5rJywgJ3Bvc2l0aW9uJzogMH1cbiAqIEBwYXJhbSBjZWxsU3R5bGVzIGNzcyBzdHlsZXMgZm9yIGNlbGxzXG4gKiBAcGFyYW0gcm93U3R5bGUgY3NzIHN0eWxlcyBmb3Igcm93c1xuICogQHBhcmFtIHBlcmNXaWR0aCBhbiBhcnJheSB3aXRoIHRoZSBzYW1lIGxlbmd0aCBvZiBmaWVsZHMgcGFyYW0sIHdpdGggdGhlIHdpZHRoIGZvciB0aGUgY29sdW1ucy5cbiAqIGllOiBbJzEwJScsICczMCUnLCAnMTAlJywgJzI1JScsICcxNSUnLCAnMTAlJ11cbiAqIEBwYXJhbSBiYWNrZ3JvdW5kQ29sb3JBIHRoZSBmaXJzdCBiYWNrZ3JvdWQgY29sb3JcbiAqIEBwYXJhbSBiYWNrZ3JvdW5kQ29sb3JCIHRoZSBzZWNvbmQgYmFja2dyb3VkIGNvbG9yXG4gKiBAcmV0dXJucyBBbiBBamZUYWJsZVdpZGdldCBsaXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFdpZGdldERhdGFzZXQoXG4gIGRhdGFzZXQ6IE1haW5Gb3JtW10sXG4gIGZpZWxkczogc3RyaW5nW10sXG4gIHJvd0xpbms6IHtsaW5rOiBzdHJpbmc7IHBvc2l0aW9uOiBudW1iZXJ9IHwgbnVsbCxcbiAgY2VsbFN0eWxlczoge1trZXk6IHN0cmluZ106IGFueX0gfCBudWxsLFxuICByb3dTdHlsZToge1trZXk6IHN0cmluZ106IGFueX0gfCBudWxsLFxuICBwZXJjV2lkdGg6IHN0cmluZ1tdLFxuICBiYWNrZ3JvdW5kQ29sb3JBPzogc3RyaW5nLFxuICBiYWNrZ3JvdW5kQ29sb3JCPzogc3RyaW5nLFxuKTogYW55W10ge1xuICBjb25zdCByZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9W10gPSBbXTtcbiAgaWYgKGJhY2tncm91bmRDb2xvckEgPT0gbnVsbCkge1xuICAgIGJhY2tncm91bmRDb2xvckEgPSAnd2hpdGUnO1xuICB9XG4gIGlmIChiYWNrZ3JvdW5kQ29sb3JCID09IG51bGwpIHtcbiAgICBiYWNrZ3JvdW5kQ29sb3JCID0gJyNkZGQnO1xuICB9XG4gIGlmIChyb3dTdHlsZSA9PSBudWxsKSB7XG4gICAgcm93U3R5bGUgPSB7XG4gICAgICAndGV4dC1hbGlnbic6ICdyaWdodCcsXG4gICAgICAnbWFyZ2luLWJvdHRvbSc6IDAsXG4gICAgICAnYm9yZGVyLWNvbGxhcHNlJzogJ2NvbGxhcHNlJyxcbiAgICB9O1xuICB9XG4gIGlmIChjZWxsU3R5bGVzID09IG51bGwpIHtcbiAgICBjZWxsU3R5bGVzID0ge1xuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgIH07XG4gIH1cbiAgaWYgKHBlcmNXaWR0aCA9PSBudWxsIHx8IHBlcmNXaWR0aC5sZW5ndGggIT09IGZpZWxkcy5sZW5ndGgpIHtcbiAgICBjb25zdCBjZWxsV2lkdGggPSAxMDAgLyBmaWVsZHMubGVuZ3RoICsgJyUnO1xuICAgIHBlcmNXaWR0aCA9IFtdO1xuICAgIGZpZWxkcy5mb3JFYWNoKF8gPT4gcGVyY1dpZHRoLnB1c2goY2VsbFdpZHRoKSk7XG4gIH1cblxuICBpZiAoZGF0YXNldCkge1xuICAgIGxldCBpbmRleDogbnVtYmVyID0gMDtcbiAgICBkYXRhc2V0LmZvckVhY2goKGRhdGE6IE1haW5Gb3JtKSA9PiB7XG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICBpbmRleCsrO1xuICAgICAgICAvLyBSb3cgaXMgYW4gQWpmVGFibGVXaWRnZXRcbiAgICAgICAgY29uc3Qgcm93OiB7W2tleTogc3RyaW5nXTogYW55fSA9IHtcbiAgICAgICAgICBzdHlsZXM6IHtcbiAgICAgICAgICAgICd0ZXh0LWFsaWduJzogJ3JpZ2h0JyxcbiAgICAgICAgICAgICdtYXJnaW4tYm90dG9tJzogMCxcbiAgICAgICAgICAgICdib3JkZXItY29sbGFwc2UnOiAnY29sbGFwc2UnLFxuICAgICAgICAgICAgLi4ucm93U3R5bGUsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB2aXNpYmlsaXR5OiB7Y29uZGl0aW9uOiAndHJ1ZSd9LFxuICAgICAgICAgIHdpZGdldFR5cGU6IDUsXG4gICAgICAgICAgZGF0YXNldDogW1tdXSBhcyBhbnlbXVtdLFxuICAgICAgICAgIGNlbGxTdHlsZXM6IHsnYm9yZGVyLXRvcCc6ICcxcHggc29saWQgZ3JleSd9LFxuICAgICAgICB9O1xuXG4gICAgICAgIGZpZWxkcy5mb3JFYWNoKChmaWVsZDogc3RyaW5nLCBjZWxsSWR4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICBsZXQgZm9ybXVsYUNlbGwgPSAnXCJcIic7XG4gICAgICAgICAgaWYgKGRhdGFbZmllbGRdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZvcm11bGFDZWxsID0gJ1wiJyArIGRhdGFbZmllbGRdICsgJ1wiJztcbiAgICAgICAgICAgIGlmIChyb3dMaW5rICE9IG51bGwgJiYgY2VsbElkeCA9PT0gcm93TGlua1sncG9zaXRpb24nXSkge1xuICAgICAgICAgICAgICBmb3JtdWxhQ2VsbCA9IGBcIjxhIGhyZWY9JyR7ZGF0YVtyb3dMaW5rWydsaW5rJ11dfSc+ICR7ZGF0YVtmaWVsZF19PC9hPlwiYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByb3dbJ2RhdGFzZXQnXVswXS5wdXNoKHtcbiAgICAgICAgICAgIGxhYmVsOiAnJyxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGluZGV4ICUgMiA9PT0gMCA/IGJhY2tncm91bmRDb2xvckEgOiBiYWNrZ3JvdW5kQ29sb3JCLFxuICAgICAgICAgICAgICAuLi5jZWxsU3R5bGVzLFxuICAgICAgICAgICAgICB3aWR0aDogcGVyY1dpZHRoW2NlbGxJZHhdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZvcm11bGE6IHtcbiAgICAgICAgICAgICAgZm9ybXVsYTogZm9ybXVsYUNlbGwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29sc3BhbjogMSxcbiAgICAgICAgICAgIHJvd3NwYW46IDEsXG4gICAgICAgICAgICBhZ2dyZWdhdGlvbjoge1xuICAgICAgICAgICAgICBhZ2dyZWdhdGlvbjogMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXMucHVzaChyb3cpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogY3JlYXRlIGEgd2lkZ2V0IGRhdGFzZXQgaW50byBhIGNvbnRlbnQgbGlzdCwgYmFzZWQgb24gYSBsaXN0IG9mIEZvcm1zLCBmb3IgcGFnaW5hdGVkIHdpZGdldC5cbiAqIEVhY2ggcm93IGlzIGEgQWpmRGlhbG9nV2lkZ2V0IGFuZCwgb24gY2xpY2ssIG9wZW4gYSBkaWFsb2cuXG4gKlxuICogQHBhcmFtIGRhdGFzZXQgdGhlIGRhdGFzZXQgZm9yIHRoZSB3aWRnZXRzXG4gKiBAcGFyYW0gZmllbGRzIHRoZSBsaXN0IG9mIGZpZWxkcyBuYW1lIGZvciBlYWNoIHJvd1xuICogQHBhcmFtIGRpYWxvZ0ZpZWxkcyB0aGUgbGlzdCBvZiBmaWVsZHMgbmFtZSB0byBzaG93IGluIHRoZSBkaWFsb2dcbiAqIEBwYXJhbSBkaWFsb2dMYWJlbEZpZWxkcyB0aGUgbGlzdCBvZiBsYWJlbHMgZm9yIGVhY2ggZGlhbG9nRmllbGRzXG4gKiBAcGFyYW0gcm93TGluayB0aGUgaHR0cCBsaW5rIGZvciB0aGUgcm93LCB3aXRoIHRoZSBmb3JtIGZpZWxkIG5hbWUgd2l0aCB0aGUgbGluayB2YWx1ZSBhbmQgdGhlIGNvbHVtbiBwb3NpdGlvbiBmb3IgdGhlIGxpbmsuXG4gKiBpZTogeydsaW5rJzogJ2hvbWVfbGluaycsICdwb3NpdGlvbic6IDB9XG4gKiBAcGFyYW0gY2VsbFN0eWxlcyBjc3Mgc3R5bGVzIGZvciBjZWxsc1xuICogQHBhcmFtIHJvd1N0eWxlIGNzcyBzdHlsZXMgZm9yIHJvd3NcbiAqIEBwYXJhbSBwZXJjV2lkdGggYW4gYXJyYXkgd2l0aCB0aGUgc2FtZSBsZW5ndGggb2YgZmllbGRzIHBhcmFtLCB3aXRoIHRoZSB3aWR0aCBmb3IgdGhlIGNvbHVtbnMuXG4gKiBpZTogWycxMCUnLCAnMzAlJywgJzEwJScsICcyNSUnLCAnMTUlJywgJzEwJSddXG4gKiBAcGFyYW0gYmFja2dyb3VuZENvbG9yQSB0aGUgZmlyc3QgYmFja2dyb3VkIGNvbG9yXG4gKiBAcGFyYW0gYmFja2dyb3VuZENvbG9yQiB0aGUgc2Vjb25kIGJhY2tncm91ZCBjb2xvclxuICogQHJldHVybnMgQW4gQWpmRGlhbG9nV2lkZ2V0IGxpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkV2lkZ2V0RGF0YXNldFdpdGhEaWFsb2coXG4gIGRhdGFzZXQ6IE1haW5Gb3JtW10sXG4gIGZpZWxkczogc3RyaW5nW10sXG4gIGRpYWxvZ0ZpZWxkczogc3RyaW5nW10sXG4gIGRpYWxvZ0xhYmVsRmllbGRzOiBzdHJpbmdbXSxcbiAgY2VsbFN0eWxlczoge1trZXk6IHN0cmluZ106IGFueX0gfCBudWxsLFxuICByb3dTdHlsZToge1trZXk6IHN0cmluZ106IGFueX0gfCBudWxsLFxuICBwZXJjV2lkdGg6IHN0cmluZ1tdLFxuICBiYWNrZ3JvdW5kQ29sb3JBPzogc3RyaW5nLFxuICBiYWNrZ3JvdW5kQ29sb3JCPzogc3RyaW5nLFxuKTogYW55W10ge1xuICBjb25zdCByZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9W10gPSBbXTtcbiAgaWYgKGJhY2tncm91bmRDb2xvckEgPT0gbnVsbCkge1xuICAgIGJhY2tncm91bmRDb2xvckEgPSAnd2hpdGUnO1xuICB9XG4gIGlmIChiYWNrZ3JvdW5kQ29sb3JCID09IG51bGwpIHtcbiAgICBiYWNrZ3JvdW5kQ29sb3JCID0gJyNkZGQnO1xuICB9XG4gIGlmIChyb3dTdHlsZSA9PSBudWxsKSB7XG4gICAgcm93U3R5bGUgPSB7XG4gICAgICAndGV4dC1hbGlnbic6ICdyaWdodCcsXG4gICAgICAnbWFyZ2luLWJvdHRvbSc6IDAsXG4gICAgICAnYm9yZGVyLWNvbGxhcHNlJzogJ2NvbGxhcHNlJyxcbiAgICB9O1xuICB9XG4gIGlmIChjZWxsU3R5bGVzID09IG51bGwpIHtcbiAgICBjZWxsU3R5bGVzID0ge1xuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgIH07XG4gIH1cbiAgaWYgKHBlcmNXaWR0aCA9PSBudWxsIHx8IHBlcmNXaWR0aC5sZW5ndGggIT09IGZpZWxkcy5sZW5ndGgpIHtcbiAgICBjb25zdCBjZWxsV2lkdGggPSAxMDAgLyBmaWVsZHMubGVuZ3RoICsgJyUnO1xuICAgIHBlcmNXaWR0aCA9IFtdO1xuICAgIGZpZWxkcy5mb3JFYWNoKF8gPT4gcGVyY1dpZHRoLnB1c2goY2VsbFdpZHRoKSk7XG4gIH1cblxuICBpZiAoZGF0YXNldCkge1xuICAgIGxldCBpbmRleDogbnVtYmVyID0gMDtcbiAgICBkYXRhc2V0LmZvckVhY2goKGRhdGE6IE1haW5Gb3JtKSA9PiB7XG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICBpbmRleCsrO1xuICAgICAgICAvLyBSb3cgaXMgYW4gQWpmVGFibGVXaWRnZXRcbiAgICAgICAgY29uc3Qgcm93OiB7W2tleTogc3RyaW5nXTogYW55fSA9IHtcbiAgICAgICAgICBzdHlsZXM6IHtcbiAgICAgICAgICAgICd0ZXh0LWFsaWduJzogJ3JpZ2h0JyxcbiAgICAgICAgICAgICdtYXJnaW4tYm90dG9tJzogMCxcbiAgICAgICAgICAgICdib3JkZXItY29sbGFwc2UnOiAnY29sbGFwc2UnLFxuICAgICAgICAgICAgLi4ucm93U3R5bGUsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB2aXNpYmlsaXR5OiB7Y29uZGl0aW9uOiAndHJ1ZSd9LFxuICAgICAgICAgIHdpZGdldFR5cGU6IDUsXG4gICAgICAgICAgZGF0YXNldDogW1tdXSBhcyBhbnlbXVtdLFxuICAgICAgICAgIGNlbGxTdHlsZXM6IHsnYm9yZGVyLXRvcCc6ICcxcHggc29saWQgZ3JleSd9LFxuICAgICAgICB9O1xuXG4gICAgICAgIGZpZWxkcy5mb3JFYWNoKChmaWVsZDogc3RyaW5nLCBjZWxsSWR4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICBsZXQgZm9ybXVsYUNlbGwgPSAnXCJcIic7XG4gICAgICAgICAgaWYgKGRhdGFbZmllbGRdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZvcm11bGFDZWxsID0gJ1wiJyArIGRhdGFbZmllbGRdICsgJ1wiJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByb3dbJ2RhdGFzZXQnXVswXS5wdXNoKHtcbiAgICAgICAgICAgIGxhYmVsOiAnJyxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGluZGV4ICUgMiA9PT0gMCA/IGJhY2tncm91bmRDb2xvckEgOiBiYWNrZ3JvdW5kQ29sb3JCLFxuICAgICAgICAgICAgICAuLi5jZWxsU3R5bGVzLFxuICAgICAgICAgICAgICB3aWR0aDogcGVyY1dpZHRoW2NlbGxJZHhdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZvcm11bGE6IHtcbiAgICAgICAgICAgICAgZm9ybXVsYTogZm9ybXVsYUNlbGwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29sc3BhbjogMSxcbiAgICAgICAgICAgIHJvd3NwYW46IDEsXG4gICAgICAgICAgICBhZ2dyZWdhdGlvbjoge1xuICAgICAgICAgICAgICBhZ2dyZWdhdGlvbjogMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBodG1sRGlhbG9nOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBkaWFsb2dGaWVsZHMuZm9yRWFjaCgoZmllbGQ6IHN0cmluZywgY2VsbElkeDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgbGV0IGZpZWxkVmFsdWUgPSAnXCJcIic7XG4gICAgICAgICAgaWYgKGRhdGFbZmllbGRdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZpZWxkVmFsdWUgPVxuICAgICAgICAgICAgICBcIjxwIGNsYXNzPSdkaWFsb2ctaXRlbSc+PGI+XCIgK1xuICAgICAgICAgICAgICBkaWFsb2dMYWJlbEZpZWxkc1tjZWxsSWR4XSArXG4gICAgICAgICAgICAgICc8L2I+IDxzcGFuPicgK1xuICAgICAgICAgICAgICBkYXRhW2ZpZWxkXSArXG4gICAgICAgICAgICAgICc8L3NwYW4+PC9wPic7XG4gICAgICAgICAgICBodG1sRGlhbG9nLnB1c2goZmllbGRWYWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBkaWFsb2dDb250ZW50OiB7W2tleTogc3RyaW5nXTogYW55fSA9IHtcbiAgICAgICAgICB3aWRnZXRUeXBlOiAzLFxuICAgICAgICAgIHN0eWxlczoge1xuICAgICAgICAgICAgJ21hcmdpbic6ICcwIDFlbScsXG4gICAgICAgICAgICAncGFkZGluZyc6ICc1cHggMTBweCcsXG4gICAgICAgICAgICAnbWF4LWhlaWdodCc6ICczNjBweCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB2aXNpYmlsaXR5OiB7Y29uZGl0aW9uOiAndHJ1ZSd9LFxuICAgICAgICAgIGh0bWxUZXh0OiBodG1sRGlhbG9nLmpvaW4oJyAnKSxcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBUaGlzIGlzIGEgRGlhbG9nIFdpZGdldCwgYWRkZWQgYXMgY29tdGFpbmVyIGZvciBlYWNoIHRhYmxlIHdpZGdldFxuICAgICAgICBjb25zdCBkaWFsb2dSb3c6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge1xuICAgICAgICAgIHdpZGdldFR5cGU6IDEzLFxuICAgICAgICAgIHN0eWxlczoge1xuICAgICAgICAgICAgJ21hcmdpbic6ICcwJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZpc2liaWxpdHk6IHtjb25kaXRpb246ICd0cnVlJ30sXG4gICAgICAgICAgdG9nZ2xlOiByb3csXG4gICAgICAgICAgY29udGVudDogW2RpYWxvZ0NvbnRlbnRdLFxuICAgICAgICB9O1xuICAgICAgICByZXMucHVzaChkaWFsb2dSb3cpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogRGVwcmVjYXRlZC4gVXNlIE1BUFxuICovXG5leHBvcnQgZnVuY3Rpb24gUkVQRUFUKFxuICBmb3JtczogTWFpbkZvcm1bXSxcbiAgYXJyYXk6IHN0cmluZ1tdLFxuICBmbjogYW55LFxuICBhcmcxOiBzdHJpbmcsXG4gIGFyZzI6IHN0cmluZyA9ICd0cnVlJyxcbik6IGFueVtdIHtcbiAgcmV0dXJuIGFycmF5Lm1hcCh2ID0+IHtcbiAgICBjb25zdCBzID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgY29uc3QgY3VycmVudDEgPSAoYXJnMSBhcyBhbnkpLnJlcGxhY2VBbGwoJ2N1cnJlbnQnLCBzKTtcbiAgICBjb25zdCBjdXJyZW50MiA9IChhcmcyIGFzIGFueSkucmVwbGFjZUFsbCgnY3VycmVudCcsIHMpO1xuICAgIHJldHVybiBmbihmb3JtcywgY3VycmVudDEsIGN1cnJlbnQyKTtcbiAgfSk7XG59XG5cbi8qKlxuICogTWFwcyBmdW5jIHRvIHRoZSBlbGVtZW50cyBvZiBhcnJheS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1BUChhcnJheTogYW55W10sIGZ1bmM6IChhOiBhbnkpID0+IGFueSk6IGFueVtdIHtcbiAgcmV0dXJuIGFycmF5Lm1hcChmdW5jKTtcbn1cblxuLyoqXG4gKiBGb3IgZWFjaCBmb3JtIGluIGZvcm1zLCB0aGUgc3BlY2lmaWVkIGZpZWxkIGlzIHNldCB3aXRoIHRoZSB2YWx1ZSBnaXZlbiBieSBleHByZXNzaW9uLlxuICogVGhlIGZvcm0ncyBmaWVsZHMgY2FuIGJlIHVzZWQgaW5zaWRlIGV4cHJlc3Npb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBBUFBMWShmb3JtczogTWFpbkZvcm1bXSwgZmllbGQ6IHN0cmluZywgZXhwcmVzc2lvbjogRnVuYyB8IHN0cmluZyk6IE1haW5Gb3JtW10ge1xuICBmb3JtcyA9IGNsb25lTWFpbkZvcm1zKGZvcm1zKTtcbiAgaWYgKHR5cGVvZiBleHByZXNzaW9uID09PSAnc3RyaW5nJykge1xuICAgIGV4cHJlc3Npb24gPSBjcmVhdGVGdW5jdGlvbihleHByZXNzaW9uKTtcbiAgfVxuICBmb3IgKGNvbnN0IGZvcm0gb2YgZm9ybXMpIHtcbiAgICBpZiAoZm9ybSAhPSBudWxsKSB7XG4gICAgICBmb3JtW2ZpZWxkXSA9IGV4cHJlc3Npb24oZm9ybSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBmb3Jtcztcbn1cblxuLyoqXG4gKiBSb3VuZHMgbnVtIHRvIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIGRpZ2l0cyBhZnRlciB0aGUgcG9pbnQgKG9yIHplcm8pLlxuICovXG5leHBvcnQgZnVuY3Rpb24gUk9VTkQobnVtOiBudW1iZXIgfCBzdHJpbmcsIGRpZ2l0cz86IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiByb3VuZChOdW1iZXIobnVtKSwgZGlnaXRzKTtcbn1cblxuLyoqXG4gKiBEZXByZWNhdGVkLiBVc2UgSUZcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEVWQUxVQVRFKGNvbmRpdGlvbjogc3RyaW5nLCBicmFuY2gxOiBhbnksIGJyYW5jaDI6IGFueSk6IGFueSB7XG4gIGlmIChldmFsdWF0ZUV4cHJlc3Npb24oY29uZGl0aW9uKSkge1xuICAgIHJldHVybiBicmFuY2gxO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBicmFuY2gyO1xuICB9XG59XG5cbi8qKlxuICogVGVsbHMgaWYgYXJyIGluY2x1ZGVzIGVsZW1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIElOQ0xVREVTKGFycjogYW55W10gfCBzdHJpbmcsIGVsZW06IGFueSk6IGJvb2xlYW4ge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyKSAmJiB0eXBlb2YgYXJyICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gYXJyLmluY2x1ZGVzKGVsZW0pO1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gYnVpbGRzIGEgZGF0YSBzdHJ1Y3R1cmUgdGhhdCBhbGxvd3MgdGhlIHVzZSBvZiB0aGUgaGluZGlraXQgZm9ybXVsYXNcbiAqIGZvciBldmVyeSBmb3JtcyB3aXRoIHJlcGVhdGluZyBzbGlkZXMuXG4gKiBJbiBwYXJ0aWN1bGFyLCBpdCBidWlsZHMgYSBtYWluIGRhdGEgZm9ybSB3aXRoIGFsbCB0aGUgZGF0YSByZWxhdGluZyB0byB0aGUgc2xpZGVzIGFuZFxuICogYSBkaWN0aW9uYXJ5IHdpdGggdGhlIG5hbWUgcmVwcyB0aHVzIG1hZGUgaW5zdGFuY2Ugc2xpZGVOYW1lIGZvcm1zLlxuICogV2hlcmUgYSBmb3JtIGlzIGFzc29jaWF0ZWQgd2l0aCBlYWNoIGluc3RhbmNlIG9mIHRoZSByZXBlYXRpbmcgc2xpZGUuXG4gKiBleGFtcGxlOlxuICogc2ltcGxlIGZvcm06XG4gKiAge1xuICogICAgJHZhbHVlOiBcIkFHT1wiXG4gKiAgICBjaXR0YWRpbmFuemFfXzA6IFwiQUdPXCJcbiAqICAgIGNvZGljZV9maXNjYWxlX18wOiBcImpkZmxqZ2zDsmvDsmvDslwiXG4gKiAgICBjb3VudHJ5X18wOiBcIkFHT1wiXG4gKiAgICBkYXRlX2VuZDogXCIyMDIxLTAxLTEwXCJcbiAqICAgIGRhdGVfc3RhcnQ6IFwiMjAyMS0wMS0xMFwiXG4gKiAgICBkb2JfXzA6IFwiMjAyMS0wMy0xMVwiXG4gKiAgICBmaXJzdF9uYW1lX18wOiBcInBpcHBvXCJcbiAqICAgIGdlbmRlcl9fMDogXCJmXCJcbiAqICAgIGlkX2ZhbWlseTogXCIzYmVmM2EzZi1kOTVkLTRhMDktOGRmNC1lODEyYzU1YzYxYzZcIlxuICogICAgaXN0cnV6aW9uZV9fMDogbnVsbFxuICogICAgbGFzdF9uYW1lX18wOiBcInBpcHBvXCJcbiAqICAgIHBlcm1lc3NvX3NvZ2dpb3Jub19fMDogXCJub1wiXG4gKiAgICByZWxhemlvbmVfXzA6IFwiZ2VuaXRvcmVcIlxuICogICAgc29saWRhbmRvOiBcInNvbGlkYW5kbzFcIlxuICogICAgc3RhdG9fY2l2aWxlX18wOiBudWxsXG4gKiAgfVxuICogYWZ0ZXIgQlVJTERfREFUQVNFVFxuICogTWFpbkZvcm06XG4gKiB7XG4gKiAgICAkdmFsdWU6IFwiQUdPXCJcbiAqICAgIGFqZl9mb3JtX2lkOiAwICoqIGFkZGVkIGF0cmlidXRlIHRoYXQgcmFwcHJlc2VudCB0aGUgaW5kZXggcG9zaXRpb24gaW5zaWRlcyBpbnB1dCBmb3JtIGxpc3QuXG4gKiAgICBhamZfZmFtaWx5X2NvbXBvbmVudF9jb3VudDogMSoqIGFkZGVkIGF0cmlidXRlIHRoYXQgcmFwcHJlc2VudCB0aGUgaW5zdGFuY2UgbnVtYmVyIG9mIGZhbWlsaV9jb21wb25lbnQgcmVwZWF0aW5nIHNsaWRlcy5cbiAqICAgIGRhdGVfZW5kOiBcIjIwMjEtMDEtMTBcIlxuICogICAgZGF0ZV9zdGFydDogXCIyMDIxLTAxLTEwXCJcbiAqICAgIGlkX2ZhbWlseTogXCIzYmVmM2EzZi1kOTVkLTRhMDktOGRmNC1lODEyYzU1YzYxYzZcIlxuICogICAgcmVwczoge1xuICogICAgICBmYW1pbHlfY29tcG9uZW50OiBbXG4gKiAgICAgICAge1xuICogICAgICAgICAgYWpmX2ZhbWlseV9jb21wb25lbnRfcmVwOiAwICoqIGFkZGVkIGF0cmlidXRlIHRoYXQgcmFwcHJlc2VudCB0aGUgb3JkZXIgaW5zdGFuY2Ugb2YgZmFtaWx5X2NvbXBvbmVudCByZXBlYXRpbmcgc2xpZGUuXG4gKiAgICAgICAgICBjaXR0YWRpbmFuemE6IFwiQUdPXCJcbiAqICAgICAgICAgIGNvZGljZV9maXNjYWxlOiBcImpkZmxqZ2zDsmvDsmvDslwiXG4gKiAgICAgICAgICBjb3VudHJ5OiBcIkFHT1wiXG4gKiAgICAgICAgICBkb2I6IFwiMjAyMS0wMy0xMVwiXG4gKiAgICAgICAgICBmaXJzdF9uYW1lOiBcInBpcHBvXCJcbiAqICAgICAgICAgIGdlbmRlcjogXCJmXCJcbiAqICAgICAgICAgIGlzdHJ1emlvbmU6IG51bGxcbiAqICAgICAgICAgIGxhc3RfbmFtZTogXCJwaXBwb1wiXG4gKiAgICAgICAgICBwZXJtZXNzb19zb2dnaW9ybm86IFwibm9cIlxuICogICAgICAgICAgcmVsYXppb25lOiBcImdlbml0b3JlXCJcbiAqICAgICAgICAgIHN0YXRvX2NpdmlsZTogbnVsbFxuICogICAgICAgIH1cbiAqICAgICAgXVxuICogICAgfVxuICogfVxuICpcbiAqIEBwYXJhbSB7Rm9ybVtdfSBmb3Jtc1xuICogQHBhcmFtIHsqfSBbc2NoZW1hXSBpZiBzY2hlbWEgaXMgcHJvdmlkZWQgdGhlIGluc3RhbmNlcyBpbnNpZGUgdGhlIHJlcHMgbWF0Y2ggd2l0aCBlZmZlY3RpdmVcbiAqIHNsaWRlIG5hbWUuIE90aGVyd2lzZSBhbGwgcmVwZWF0aW5nIHNsaWRlcyBhcmUgYXNzb2NpYXRlcyB0byBnZW5lcmljIHNsaWRlIG5hbWUgXCJyZXBcIi5cbiAqIEByZXR1cm4geyp9ICB7TWFpbkZvcm1bXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEJVSUxEX0RBVEFTRVQoZm9ybXM6IEZvcm1bXSwgc2NoZW1hPzogYW55KTogTWFpbkZvcm1bXSB7XG4gIGNvbnN0IHJlczogTWFpbkZvcm1bXSA9IFtdO1xuICBjb25zdCBnZW5lcmF0ZU1ldGFkYXRhID0gKHNsaWRlTmFtZTogc3RyaW5nLCBzbGlkZUluc3RhbmNlOiBudW1iZXIpID0+IHtcbiAgICBjb25zdCByZXNnOiB7W3NuYW1lOiBzdHJpbmddOiBhbnl9ID0ge307XG4gICAgcmVzZ1tgYWpmXyR7c2xpZGVOYW1lfV9yZXBgXSA9IHNsaWRlSW5zdGFuY2U7XG4gICAgcmV0dXJuIHJlc2c7XG4gIH07XG5cbiAgZm9ybXMgPSBbLi4uKGZvcm1zIHx8IFtdKV07XG5cbiAgaWYgKHNjaGVtYSAhPSBudWxsKSB7XG4gICAgY29uc3QgcmVwZWF0aW5nU2xpZGVzOiBhbnlbXSA9IHNjaGVtYS5ub2Rlcy5maWx0ZXIoKG5vZGU6IGFueSkgPT4gbm9kZS5ub2RlVHlwZSA9PT0gNCk7XG4gICAgY29uc3Qgb2JqOiB7W2ZpZWxkTmFtZTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICAgIHJlcGVhdGluZ1NsaWRlcy5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgIGxldCBub2RlRmllbGRzID0gc2xpZGUubm9kZXMubWFwKChuOiBhbnkpID0+IG4ubmFtZSk7XG4gICAgICBub2RlRmllbGRzLmZvckVhY2goKG5vZGVGaWVsZDogc3RyaW5nKSA9PiB7XG4gICAgICAgIG9ialtub2RlRmllbGRdID0gc2xpZGUubmFtZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZm9ybXMuZm9yRWFjaCgoZiwgZm9ybUlkeCkgPT4ge1xuICAgICAgY29uc3QgbWFpbkZvcm06IE1haW5Gb3JtID0ge3JlcHM6IHt9fTtcbiAgICAgIGNvbnN0IGZLZXlzOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKGYpO1xuICAgICAgY29uc3QgaW5zdGFuY2VzOiB7W3NsaWRlTmFtZTogc3RyaW5nXTogYW55fSA9IHt9O1xuXG4gICAgICBmS2V5cy5mb3JFYWNoKGZrZXkgPT4ge1xuICAgICAgICBjb25zdCBzcGxpdHRlZEtleTogc3RyaW5nW10gPSBma2V5LnNwbGl0KCdfXycpO1xuICAgICAgICBjb25zdCBzcGxpdHRlZExlbmd0aDogbnVtYmVyID0gc3BsaXR0ZWRLZXkubGVuZ3RoO1xuICAgICAgICBjb25zdCBmaWVsZE5hbWUgPSBzcGxpdHRlZEtleVswXTtcbiAgICAgICAgY29uc3Qgc2xpZGVJbnN0YW5jZSA9XG4gICAgICAgICAgc3BsaXR0ZWRLZXlbMV0gIT0gbnVsbCAmJiBOdW1iZXIuaXNJbnRlZ2VyKCtzcGxpdHRlZEtleVsxXSkgPyArc3BsaXR0ZWRLZXlbMV0gOiBudWxsO1xuICAgICAgICBjb25zdCBzbGlkZU5hbWUgPSBvYmpbZmllbGROYW1lXTtcbiAgICAgICAgaWYgKHNwbGl0dGVkTGVuZ3RoID09PSAyICYmIHNsaWRlSW5zdGFuY2UgIT0gbnVsbCAmJiBzbGlkZU5hbWUgIT0gbnVsbCkge1xuICAgICAgICAgIGluc3RhbmNlc1tzbGlkZU5hbWVdID0gaW5zdGFuY2VzW3NsaWRlTmFtZV0gIT0gbnVsbCA/IGluc3RhbmNlc1tzbGlkZU5hbWVdIDogW107XG4gICAgICAgICAgaW5zdGFuY2VzW3NsaWRlTmFtZV1bc2xpZGVJbnN0YW5jZV0gPVxuICAgICAgICAgICAgaW5zdGFuY2VzW3NsaWRlTmFtZV1bc2xpZGVJbnN0YW5jZV0gIT0gbnVsbFxuICAgICAgICAgICAgICA/IGluc3RhbmNlc1tzbGlkZU5hbWVdW3NsaWRlSW5zdGFuY2VdXG4gICAgICAgICAgICAgIDogZ2VuZXJhdGVNZXRhZGF0YShzbGlkZU5hbWUsIHNsaWRlSW5zdGFuY2UpO1xuICAgICAgICAgIGluc3RhbmNlc1tzbGlkZU5hbWVdW3NsaWRlSW5zdGFuY2VdW2ZpZWxkTmFtZV0gPSBmW2ZrZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1haW5Gb3JtW2ZrZXldID0gZltma2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBtYWluRm9ybVtgYWpmX2Zvcm1faWRgXSA9IGZvcm1JZHg7XG4gICAgICBjb25zdCBpbnN0YW5jZUtleXMgPSBPYmplY3Qua2V5cyhpbnN0YW5jZXMpO1xuICAgICAgaW5zdGFuY2VLZXlzLmZvckVhY2goaW5zdGFuY2VLZXkgPT4ge1xuICAgICAgICBtYWluRm9ybVtgYWpmXyR7aW5zdGFuY2VLZXl9X2NvdW50YF0gPSBpbnN0YW5jZXNbaW5zdGFuY2VLZXldLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaWR4U2xpZGUgPSAwOyBpZHhTbGlkZSA8IGluc3RhbmNlc1tpbnN0YW5jZUtleV0ubGVuZ3RoOyBpZHhTbGlkZSsrKSB7XG4gICAgICAgICAgaWYgKGluc3RhbmNlc1tpbnN0YW5jZUtleV1baWR4U2xpZGVdID09IG51bGwpIHtcbiAgICAgICAgICAgIGluc3RhbmNlc1tpbnN0YW5jZUtleV1baWR4U2xpZGVdID0gZ2VuZXJhdGVNZXRhZGF0YShpbnN0YW5jZUtleSwgaWR4U2xpZGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBtYWluRm9ybS5yZXBzID0gaW5zdGFuY2VzO1xuICAgICAgcmVzLnB1c2gobWFpbkZvcm0pO1xuICAgIH0pO1xuICAgIHJldHVybiByZXM7XG4gIH0gZWxzZSB7XG4gICAgZm9ybXMuZm9yRWFjaChmb3JtID0+IHtcbiAgICAgIGNvbnN0IGZLZXlzOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKGZvcm0pO1xuICAgICAgY29uc3Qgbm9SZXBlYXRpbmdGaWVsZHM6IHN0cmluZ1tdID0gZktleXMuZmlsdGVyKGZrZXkgPT4ge1xuICAgICAgICBjb25zdCBzcGxpdHRlZEtleTogc3RyaW5nW10gPSBma2V5LnNwbGl0KCdfXycpO1xuICAgICAgICBpZiAoc3BsaXR0ZWRLZXkubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBub1JlcEZvcm06IEZvcm0gPSB7fTtcblxuICAgICAgbm9SZXBlYXRpbmdGaWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICAgIG5vUmVwRm9ybVtmaWVsZF0gPSBmb3JtW2ZpZWxkXTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBtYWluRm9ybTogTWFpbkZvcm0gPSB7Li4ubm9SZXBGb3JtLCByZXBzOiB7c2xpZGU6IFtdfX07XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IE1BWF9SRVBTOyBpKyspIHtcbiAgICAgICAgY29uc3QgY3VycmVudFNsaWRlOiBGb3JtID0ge307XG4gICAgICAgIGNvbnN0IG9ubHlDdXJyZW50SW5zdGFuY2VLZXlzOiBzdHJpbmdbXSA9IGZLZXlzLmZpbHRlcihma2V5ID0+IHtcbiAgICAgICAgICBjb25zdCBzcGxpdHRlZEtleTogc3RyaW5nW10gPSBma2V5LnNwbGl0KCdfXycpO1xuICAgICAgICAgIGlmIChzcGxpdHRlZEtleS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHJldHVybiBma2V5LmluZGV4T2YoYF9fJHtpfWApID4gLTE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHNlIGlsIG51bWVybyBkaSBhdHRyaWJ1dGkgY29pbmNpZGUgaWwgZm9ybSBkYXRhIG5vbiBoYSByZXBlYXRpbmdzbGlkZXNcbiAgICAgICAgaWYgKG9ubHlDdXJyZW50SW5zdGFuY2VLZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIG1haW5Gb3JtWydhamZfcmVwX2NvdW50J10gPSBpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIG9ubHlDdXJyZW50SW5zdGFuY2VLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICBjb25zdCBzcGxpdHRlZEtleSA9IGtleS5zcGxpdCgnX18nKTtcbiAgICAgICAgICBjb25zdCBmaWVsZE5hbWUgPSBzcGxpdHRlZEtleVswXTtcbiAgICAgICAgICBjb25zdCBzbGlkZUluc3RhbmNlID0gc3BsaXR0ZWRLZXlbMV0gIT0gbnVsbCA/ICtzcGxpdHRlZEtleVsxXSA6IG51bGw7XG4gICAgICAgICAgY3VycmVudFNsaWRlW2ZpZWxkTmFtZV0gPSBmb3JtW2tleV07XG4gICAgICAgICAgY3VycmVudFNsaWRlWydhamZfcmVwJ10gPSBzbGlkZUluc3RhbmNlICE9IG51bGwgPyBzbGlkZUluc3RhbmNlIDogY3VycmVudFNsaWRlWydhamZfcmVwJ107XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAob25seUN1cnJlbnRJbnN0YW5jZUtleXMubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICBtYWluRm9ybS5yZXBzIVsnc2xpZGUnXS5wdXNoKGN1cnJlbnRTbGlkZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWFpbkZvcm0ucmVwcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVzLnB1c2gobWFpbkZvcm0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gdGFrZXMgYW4gYWpmIHNjaGVtYSBhcyBpbnB1dCBhbmQgZXh0cmFjdHMgYVxuICogZGljdCB0aGF0IG1hdGNoZXMgZWFjaCBjaG9pY2UgdmFsdWUgKHdpdGggYW5kIHdpdGhvdXQgY2hvaWNlIG9yaWdpbiBuYW1lIGFzIHByZWZpeCkgd2l0aCBpdHMgbGFiZWxcbiAqIEBwYXJhbSBzY2hlbWEgdGhlIGFqZiBzY2hlbWFcbiAqIEByZXR1cm5zIEEgZGljdCB3aXRoOlxuICogIHtbY2hvaWNlVmFsdWU6IHN0cmluZ106IFtjaG9pY2VMYWJlbDogc3RyaW5nXX1cbiAqL1xuZnVuY3Rpb24gZXh0cmFjdExhYmVsc0Zyb21DaG9pY2VzKHNjaGVtYTogYW55KToge1t2YWx1ZTogc3RyaW5nXTogc3RyaW5nfSB7XG4gIGNvbnN0IGxhYmVsczoge1t2YWx1ZTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICBpZiAoc2NoZW1hICYmIHNjaGVtYS5jaG9pY2VzT3JpZ2lucyAhPSBudWxsKSB7XG4gICAgZm9yIChjb25zdCBvcmlnaW4gb2Ygc2NoZW1hLmNob2ljZXNPcmlnaW5zKSB7XG4gICAgICBpZiAob3JpZ2luICE9IG51bGwgJiYgb3JpZ2luLmNob2ljZXMgIT0gbnVsbCkge1xuICAgICAgICBmb3IgKGNvbnN0IGMgb2Ygb3JpZ2luLmNob2ljZXMpIHtcbiAgICAgICAgICBsYWJlbHNbYy52YWx1ZV0gPSBjLmxhYmVsO1xuICAgICAgICAgIGxhYmVsc1tvcmlnaW4ubmFtZSArICdfJyArIGMudmFsdWVdID0gYy5sYWJlbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gbGFiZWxzO1xufVxuXG4vKipcbiAqIEl0IGNyZWF0ZXMgYW4gb25lIGRpbWVuc2lvbmFsIGFycmF5IG9mIEFqZk5vZGUuXG4gKiBJZiB0aGUgbm9kZSBpcyBhIGNvbnRhaW5lck5vZGUoaGFzIHRoZSBub2RlcyBhdHRyaWJ1dGUpXG4gKiByZWN1cnNpdmVseSAgY29uY2F0IHRoZWlyIG5vZGVzLlxuICovXG5mdW5jdGlvbiBmbGF0dGVuTm9kZXMobm9kZXM6IGFueVtdKTogYW55W10ge1xuICBsZXQgZmxhdE5vZGVzOiBhbnlbXSA9IFtdO1xuICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgIGZsYXROb2Rlcy5wdXNoKG5vZGUpO1xuICAgIGlmIChub2RlICE9IG51bGwgJiYgKG5vZGUubm9kZVR5cGUgPT09IDMgfHwgbm9kZS5ub2RlVHlwZSA9PT0gNCkpIHtcbiAgICAgIGZsYXROb2RlcyA9IGZsYXROb2Rlcy5jb25jYXQoZmxhdHRlbk5vZGVzKG5vZGUubm9kZXMpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZmxhdE5vZGVzO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBjbG9uZSBvZiBmb3Jtcywgd2hlcmUgdGhlIHNwZWNpZmllZCBmaWVsZHMgYXJlIHJlcGxhY2VkIGJ5IHRoZSBjb3JyZXNwb25kaW5nIGxhYmVscyxcbiAqIGFzIGRlZmluZWQgYnkgdGhlIGNob2ljZSBvcmlnaW5zIGluIHNjaGVtYS5cbiAqXG4gKiBAcGFyYW0ge01haW5Gb3JtW119IGZvcm1zXG4gKiBAcGFyYW0geyp9IHNjaGVtYSB0aGUgYWpmIHNjaGVtYVxuICogQHBhcmFtIHtzdHJpbmdbXX0gZmllbGRzXG4gKiBAcmV0dXJuIHsqfSB7TWFpbkZvcm1bXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEFQUExZX0xBQkVMUyhmb3JtczogTWFpbkZvcm1bXSwgc2NoZW1hOiBhbnksIGZpZWxkczogc3RyaW5nW10pOiBNYWluRm9ybVtdIHtcbiAgZm9ybXMgPSBjbG9uZU1haW5Gb3Jtcyhmb3Jtcyk7XG4gIGNvbnN0IGxhYmVsczoge1t2YWx1ZTogc3RyaW5nXTogc3RyaW5nfSA9IGV4dHJhY3RMYWJlbHNGcm9tQ2hvaWNlcyhzY2hlbWEpO1xuXG4gIGNvbnN0IGNob2ljZUZpZWxkcyA9IGZsYXR0ZW5Ob2RlcyhzY2hlbWEubm9kZXMpLmZpbHRlcihcbiAgICAobjogYW55KSA9PlxuICAgICAgbiAhPSBudWxsICYmXG4gICAgICBmaWVsZHMuaW5jbHVkZXMobi5uYW1lKSAmJlxuICAgICAgbi5ub2RlVHlwZSA9PT0gMCAmJlxuICAgICAgKG4uZmllbGRUeXBlID09PSA0IHx8IG4uZmllbGRUeXBlID09PSA1KSxcbiAgKSBhcyBhbnlbXTtcblxuICBmb3IgKGNvbnN0IGZvcm0gb2YgZm9ybXMpIHtcbiAgICBpZiAoZm9ybSA9PSBudWxsKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgY29uc3QgcmVwcyA9IGFsbFJlcHMoZm9ybSk7XG4gICAgcmVwcy5wdXNoKGZvcm0gYXMgRm9ybSk7XG4gICAgZm9yIChjb25zdCByZXAgb2YgcmVwcykge1xuICAgICAgZm9yIChjb25zdCBmaWVsZCBvZiBmaWVsZHMpIHtcbiAgICAgICAgY29uc3QgdmFsID0gcmVwW2ZpZWxkXTtcblxuICAgICAgICBjb25zdCBjaG9pY2VGaWVsZCA9IGNob2ljZUZpZWxkcy5maW5kKGYgPT4gZi5uYW1lID09PSBmaWVsZCk7XG4gICAgICAgIGNvbnN0IGNob2ljZVByZWZpeCA9XG4gICAgICAgICAgY2hvaWNlRmllbGQgJiYgY2hvaWNlRmllbGQuY2hvaWNlc09yaWdpblJlZiA/IGNob2ljZUZpZWxkLmNob2ljZXNPcmlnaW5SZWYgKyAnXycgOiAnJztcblxuICAgICAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnICYmIGxhYmVsc1tjaG9pY2VQcmVmaXggKyB2YWxdICE9IG51bGwpIHtcbiAgICAgICAgICAvLyBzaW5nbGUgY2hvaWNlXG4gICAgICAgICAgcmVwW2ZpZWxkXSA9IGxhYmVsc1tjaG9pY2VQcmVmaXggKyB2YWxdO1xuICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgICAgICAgIC8vIG11bHRpcGxlIGNob2ljZVxuICAgICAgICAgIHJlcFtmaWVsZF0gPSB2YWwubWFwKHYgPT5cbiAgICAgICAgICAgIGxhYmVsc1tjaG9pY2VQcmVmaXggKyB2XSAhPSBudWxsID8gbGFiZWxzW2Nob2ljZVByZWZpeCArIHZdIDogdixcbiAgICAgICAgICApIGFzIGFueTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZm9ybXM7XG59XG5cbi8qKlxuICogRGVwcmVjYXRlZC4gVXNlIEZJTFRFUl9CWVxuICovXG5leHBvcnQgZnVuY3Rpb24gRklMVEVSX0JZX1ZBUlMoZm9ybUxpc3Q6IE1haW5Gb3JtW10sIGV4cHJlc3Npb246IHN0cmluZyk6IE1haW5Gb3JtW10ge1xuICByZXR1cm4gRklMVEVSX0JZKGZvcm1MaXN0LCBleHByZXNzaW9uKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgY29weSBvZiBmb3JtcyBhbmQgaXRzIHJlcGV0aXRpb25zLCBrZWVwaW5nIG9ubHkgdGhlIG9uZXMgZm9yIHdoaWNoIGV4cHJlc3Npb24gZXZhbHVhdGVzIHRvIHRydWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBGSUxURVJfQlkoZm9ybXM6IE1haW5Gb3JtW10sIGV4cHJlc3Npb246IEZ1bmMgfCBzdHJpbmcpOiBNYWluRm9ybVtdIHtcbiAgZm9ybXMgPSBmb3JtcyB8fCBbXTtcbiAgaWYgKGV4cHJlc3Npb24gPT09ICd0cnVlJykge1xuICAgIHJldHVybiBjbG9uZU1haW5Gb3Jtcyhmb3Jtcyk7XG4gIH1cbiAgaWYgKHR5cGVvZiBleHByZXNzaW9uID09PSAnc3RyaW5nJykge1xuICAgIGV4cHJlc3Npb24gPSBjcmVhdGVGdW5jdGlvbihleHByZXNzaW9uKTtcbiAgfVxuICBjb25zdCByZXM6IE1haW5Gb3JtW10gPSBbXTtcbiAgZm9yIChsZXQgZm9ybSBvZiBmb3Jtcy5maWx0ZXIoZiA9PiBmICE9IG51bGwpKSB7XG4gICAgZm9ybSA9IHsuLi5mb3JtfTtcbiAgICBjb25zdCBmaWx0ZXJlZFJlcHM6IEluc3RhbmNlcyA9IHt9O1xuICAgIGxldCBzb21lUmVwcyA9IGZhbHNlO1xuICAgIGlmIChmb3JtLnJlcHMgIT0gbnVsbCkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gZm9ybS5yZXBzKSB7XG4gICAgICAgIGZpbHRlcmVkUmVwc1trZXldID0gZm9ybS5yZXBzW2tleV0uZmlsdGVyKHJlcCA9PiAoZXhwcmVzc2lvbiBhcyBGdW5jKSh7Li4uZm9ybSwgLi4ucmVwfSkpO1xuICAgICAgICBmb3JtW2BhamZfJHtrZXl9X2NvdW50YF0gPSBmaWx0ZXJlZFJlcHNba2V5XS5sZW5ndGg7XG4gICAgICAgIHNvbWVSZXBzIHx8PSBmaWx0ZXJlZFJlcHNba2V5XS5sZW5ndGggPiAwO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc29tZVJlcHMgfHwgZXhwcmVzc2lvbihmb3JtKSkge1xuICAgICAgZm9ybS5yZXBzID0gZmlsdGVyZWRSZXBzO1xuICAgICAgcmVzLnB1c2goZm9ybSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGNvcHkgb2YgZm9ybXMsIG1vZGlmaWVkIGFzIGZvbGxvd3M6IGlmIGEgZm9ybSBoYXMgbiByZXBlYXRpbmcgc2xpZGVzLFxuICogaXQgaXMgZHVwbGljYXRlZCBhcyBuIGZvcm1zLCBpbiB3aGljaCB0aGUgZmllbGRzIG9mIHRoZSByZXBlYXRpbmcgc2xpZGVzIGFwcGVhciBhcyByZWd1bGFyIGZpZWxkcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEZMQVRURU5fUkVQUyhmb3JtczogTWFpbkZvcm1bXSwgc2xpZGVOYW1lOiBzdHJpbmcpOiBNYWluRm9ybVtdIHtcbiAgY29uc3QgcmVzOiBNYWluRm9ybVtdID0gW107XG4gIGZvciAoY29uc3QgZm9ybSBvZiBmb3Jtcykge1xuICAgIGlmIChmb3JtID09IG51bGwpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBjb25zdCByZXBzID0gey4uLmZvcm0ucmVwc307XG4gICAgY29uc3Qgc2xpZGVzID0gcmVwc1tzbGlkZU5hbWVdO1xuICAgIGRlbGV0ZSByZXBzW3NsaWRlTmFtZV07XG4gICAgaWYgKHNsaWRlcyA9PSBudWxsIHx8IHNsaWRlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJlcy5wdXNoKHsuLi5mb3JtLCByZXBzfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBzbGlkZSBvZiBzbGlkZXMpIHtcbiAgICAgIHJlcy5wdXNoKHsuLi5mb3JtLCAuLi5zbGlkZSwgcmVwc30pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIFJldHVybnMgdG9kYXkncyBkYXRlLlxuICpcbiAqIEBleHBvcnRcbiAqIEByZXR1cm4geyp9ICB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gVE9EQVkoKTogc3RyaW5nIHtcbiAgcmV0dXJuIG5ldyBEYXRlKCkudG9KU09OKCkuc2xpY2UoMCwgMTApO1xufVxuXG4vKipcbiAqIExvZ3MgdmFsIHRvIHRoZSBjb25zb2xlLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT05TT0xFX0xPRyh2YWw6IGFueSk6IGFueSB7XG4gIGNvbnNvbGUubG9nKHZhbCk7XG4gIHJldHVybiB2YWw7XG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIGN1cnJlbnQgYWdlIGluIHllYXJzLCBnaXZlbiB0aGUgZGF0ZSBvZiBiaXJ0aC5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0geyhzdHJpbmcgfCBudWxsKX0gZG9iXG4gKiBAcGFyYW0geyhzdHJpbmcgfCB1bmRlZmluZWQpfSB3aGVuXG4gKiBAcmV0dXJuIHsqfSAge251bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEdFVF9BR0UoZG9iOiBzdHJpbmcgfCBudWxsLCB3aGVuPzogc3RyaW5nKTogbnVtYmVyIHtcbiAgaWYgKGRvYiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIE5hTjtcbiAgfVxuICBpZiAod2hlbiA9PSBudWxsKSB7XG4gICAgd2hlbiA9IFRPREFZKCk7XG4gIH1cbiAgbGV0IHllYXJzRGlmZiA9IE51bWJlcih3aGVuLnNsaWNlKDAsIDQpKSAtIE51bWJlcihkb2Iuc2xpY2UoMCwgNCkpO1xuICBpZiAod2hlbi5zbGljZSg1KSA8IGRvYi5zbGljZSg1KSkge1xuICAgIC8vIGJpcnRoZGF5IG5vdCByZWFjaGVkIHlldCBpbiBjdXJyZW50IHllYXJcbiAgICB5ZWFyc0RpZmYtLTtcbiAgfVxuICByZXR1cm4geWVhcnNEaWZmO1xufVxuXG4vKipcbiAqIElmIGRhdGEgaXMgYSBmb3JtIHdpdGggcmVwZXRpdGlvbnMsIHJldHVybnMgdGhlIG51bWJlciBvZiByZXBldGl0aW9ucztcbiAqIElmIGRhdGEgaXMgYW4gYXJyYXksIHJldHVybnMgaXRzIGxlbmd0aDtcbiAqIE90aGVyd2lzZSByZXR1cm5zIDAuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHsoTWFpbkZvcm0gfCBhbnlbXSl9IGRhdGFzZXRcbiAqIEByZXR1cm4geyp9ICB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gTEVOKGRhdGFzZXQ6IE1haW5Gb3JtIHwgYW55W10pOiBudW1iZXIge1xuICBpZiAoZGF0YXNldCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgY29uc3QgZm9ybSA9IGRhdGFzZXQgYXMgTWFpbkZvcm07XG4gIGlmIChmb3JtLnJlcHMgIT0gbnVsbCkge1xuICAgIHJldHVybiBhbGxSZXBzKGZvcm0pLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gKGRhdGFzZXQgYXMgYW55W10pLmxlbmd0aCB8fCAwO1xufVxuXG4vKipcbiAqIEFycmF5IGNvbmNhdGVuYXRpb24uXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHthbnlbXX0gYVxuICogQHBhcmFtIHthbnlbXX0gYlxuICogQHJldHVybiB7Kn0gIHthbnlbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIENPTkNBVChhOiBhbnlbXSwgYjogYW55W10pOiBhbnlbXSB7XG4gIHJldHVybiBhLmNvbmNhdChiKTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGR1cGxpY2F0ZSBlbGVtZW50cyBmcm9tIGFuIGFycmF5LlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7YW55W119IGFyclxuICogQHJldHVybiB7Kn0gIHthbnlbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFJFTU9WRV9EVVBMSUNBVEVTKGFycjogYW55W10pOiBhbnlbXSB7XG4gIHJldHVybiBbLi4ubmV3IE1hcChhcnIubWFwKHYgPT4gW0pTT04uc3RyaW5naWZ5KHYpLCB2XSkpLnZhbHVlcygpXTtcbn1cblxuLy8gUmV0dXJucyB0aGUgZGF0ZSBvYnRhaW5lZCBieSBhZGRpbmcgZGF5cyB0byBkYXRlLlxuZXhwb3J0IGZ1bmN0aW9uIEFERF9EQVlTKGRhdGU6IHN0cmluZywgZGF5czogbnVtYmVyKTogc3RyaW5nIHtcbiAgY29uc3QgZCA9IG5ldyBEYXRlKGRhdGUpO1xuICBkLnNldERhdGUoZC5nZXREYXRlKCkgKyBkYXlzKTtcbiAgcmV0dXJuIGQudG9KU09OKCkuc2xpY2UoMCwgMTApO1xufVxuXG4vLyBSZXR1cm5zIHRoZSBkaWZmZXJlbmNlIGluIGRheXMgKGEgLSBiKSBiZXR3ZWVuIHRoZSB0d28gZGF0ZXMuXG5leHBvcnQgZnVuY3Rpb24gREFZU19ESUZGKGE6IHN0cmluZywgYjogc3RyaW5nKTogbnVtYmVyIHtcbiAgY29uc3QgZGF0ZUEgPSBuZXcgRGF0ZShhKTtcbiAgY29uc3QgZGF0ZUIgPSBuZXcgRGF0ZShiKTtcbiAgLy8gVVRDIGF2b2lkcyBidWdzIHdpdGggZGF5bGlnaHQgc2F2aW5nIHRpbWUuXG4gIGNvbnN0IHV0Y0EgPSBEYXRlLlVUQyhkYXRlQS5nZXRGdWxsWWVhcigpLCBkYXRlQS5nZXRNb250aCgpLCBkYXRlQS5nZXREYXRlKCkpO1xuICBjb25zdCB1dGNCID0gRGF0ZS5VVEMoZGF0ZUIuZ2V0RnVsbFllYXIoKSwgZGF0ZUIuZ2V0TW9udGgoKSwgZGF0ZUIuZ2V0RGF0ZSgpKTtcblxuICBjb25zdCBtaWxsaXNQZXJEYXkgPSAxMDAwICogNjAgKiA2MCAqIDI0O1xuICByZXR1cm4gTWF0aC5mbG9vcigodXRjQSAtIHV0Y0IpIC8gbWlsbGlzUGVyRGF5KTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgZGF0ZSBpcyBiZWZvcmUgZGF0ZVRvQ29tcGFyZS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVUb0NvbXBhcmVcbiAqIEByZXR1cm4geyp9ICB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIElTX0JFRk9SRShkYXRlOiBzdHJpbmcsIGRhdGVUb0NvbXBhcmU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gZGF0ZSA8IGRhdGVUb0NvbXBhcmU7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGRhdGUgaXMgYWZ0ZXIgZGF0ZVRvQ29tcGFyZS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVUb0NvbXBhcmVcbiAqIEByZXR1cm4geyp9ICB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIElTX0FGVEVSKGRhdGU6IHN0cmluZywgZGF0ZVRvQ29tcGFyZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiBkYXRlID4gZGF0ZVRvQ29tcGFyZTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgZGF0ZSBpcyBiZXR3ZWVuIGRhdGVTdGFydCBhbmQgZGF0ZUVuZC5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVTdGFydFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVFbmRcbiAqIEByZXR1cm4geyp9ICB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIElTX1dJVEhJTl9JTlRFUlZBTChkYXRlOiBzdHJpbmcsIGRhdGVTdGFydDogc3RyaW5nLCBkYXRlRW5kOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIGRhdGUgPj0gZGF0ZVN0YXJ0ICYmIGRhdGUgPD0gZGF0ZUVuZDtcbn1cblxuLyoqXG4gKiBDb21wYXJlcyBkYXRlIHdpdGggYW4gaW50ZXJ2YWwuXG4gKiBSZXR1cm5zICctMScgKG9yIHRoZSBmaXJzdCBlbGVtZW50IG9mIGxhYmVscykgaWYgZGF0ZSBpcyBiZWZvcmUgZGF0ZVN0YXJ0LFxuICogJzAnIChvciB0aGUgc2Vjb25kIGVsZW1lbnQpIGlmIGRhdGUgaXMgYmV0d2VlbiBkYXRlU3RhcnQgYW5kIGRhdGVFbmQsXG4gKiAnMScgKG9yIHRoZSB0aGlyZCBlbGVtZW50KSBpZiBkYXRlIGlzIGFmdGVyIGRhdGVFbmQuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlU3RhcnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlRW5kXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBsYWJlbHMgYW4gb3B0aW9uYWwgYXJyYXkgb2Ygc3RyaW5nIGZvciB0aGUgb3V0cHV0IHZhbHVlc1xuICogQHJldHVybiB7Kn0gIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT01QQVJFX0RBVEUoXG4gIGRhdGU6IHN0cmluZyxcbiAgZGF0ZVN0YXJ0OiBzdHJpbmcsXG4gIGRhdGVFbmQ6IHN0cmluZyxcbiAgbGFiZWxzPzogc3RyaW5nW10sXG4pOiBzdHJpbmcge1xuICBpZiAobGFiZWxzID09IG51bGwpIHtcbiAgICBsYWJlbHMgPSBbJy0xJywgJzAnLCAnMSddO1xuICB9XG4gIGlmIChJU19CRUZPUkUoZGF0ZSwgZGF0ZVN0YXJ0KSkge1xuICAgIHJldHVybiBsYWJlbHNbMF07XG4gIH1cbiAgaWYgKElTX1dJVEhJTl9JTlRFUlZBTChkYXRlLCBkYXRlU3RhcnQsIGRhdGVFbmQpKSB7XG4gICAgcmV0dXJuIGxhYmVsc1sxXTtcbiAgfVxuICBpZiAoSVNfQUZURVIoZGF0ZSwgZGF0ZUVuZCkpIHtcbiAgICByZXR1cm4gbGFiZWxzWzJdO1xuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBQZXJmb3JtcyBhIGxlZnQgam9pbiBvZiBmb3Jtc0EgYW5kIGZvcm1zQi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEpPSU5fRk9STVMoXG4gIGZvcm1zQTogKE1haW5Gb3JtIHwgRm9ybSlbXSxcbiAgZm9ybXNCOiAoTWFpbkZvcm0gfCBGb3JtKVtdLFxuICBrZXlBOiBzdHJpbmcsXG4gIGtleUI/OiBzdHJpbmcsXG4pOiAoTWFpbkZvcm0gfCBGb3JtKVtdIHtcbiAgcmV0dXJuIEpPSU5fUkVQRUFUSU5HX1NMSURFUyhmb3Jtc0EsIGZvcm1zQiwga2V5QSwga2V5QiBhcyBhbnksIG51bGwgYXMgYW55KTtcbn1cblxuLyoqXG4gKiBQZXJmb3JtcyBhIGxlZnQgam9pbiBvZiBmb3Jtc0EgYW5kIGZvcm1zQiwgbGlrZSBKT0lOX0ZPUk1TLlxuICogSW4gYWRkaXRpb24sIGZvciBlYWNoIG1hdGNoaW5nIHBhaXIgb2YgZm9ybUEgYW5kIGZvcm1CLCB0aGVpciByZXBlYXRpbmcgc2xpZGVzIGFyZSBhbHNvIGpvaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEpPSU5fUkVQRUFUSU5HX1NMSURFUyhcbiAgZm9ybXNBOiBNYWluRm9ybVtdLFxuICBmb3Jtc0I6IE1haW5Gb3JtW10sXG4gIGtleUE6IHN0cmluZyxcbiAga2V5Qjogc3RyaW5nLFxuICBzdWJrZXlBOiBzdHJpbmcsXG4gIHN1YmtleUI/OiBzdHJpbmcsXG4pOiBNYWluRm9ybVtdIHtcbiAgZm9ybXNBID0gY2xvbmVNYWluRm9ybXMoZm9ybXNBIHx8IFtdKTtcbiAgZm9ybXNCID0gY2xvbmVNYWluRm9ybXMoZm9ybXNCIHx8IFtdKTtcbiAgaWYgKGtleUIgPT0gbnVsbCkge1xuICAgIGtleUIgPSBrZXlBO1xuICB9XG4gIGlmIChzdWJrZXlCID09IG51bGwpIHtcbiAgICBzdWJrZXlCID0gc3Via2V5QTtcbiAgfVxuICBjb25zdCBpbmRleEI6IHtbdmFsOiBzdHJpbmddOiBNYWluRm9ybX0gPSB7fTtcbiAgZm9yIChsZXQgaSA9IGZvcm1zQi5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGNvbnN0IHZhbCA9IGZvcm1zQltpXSAmJiBmb3Jtc0JbaV1ba2V5Ql07XG4gICAgaWYgKHZhbCAhPSBudWxsKSB7XG4gICAgICBpbmRleEJbU3RyaW5nKHZhbCldID0gZm9ybXNCW2ldO1xuICAgIH1cbiAgfVxuICBjb25zdCByZXM6IE1haW5Gb3JtW10gPSBbXTtcbiAgZm9yIChjb25zdCBmb3JtQSBvZiBmb3Jtc0EpIHtcbiAgICBjb25zdCB2YWwgPSBmb3JtQSAmJiBmb3JtQVtrZXlBXTtcbiAgICBjb25zdCBmb3JtQiA9IGluZGV4QltTdHJpbmcodmFsKV07XG4gICAgaWYgKHZhbCA9PSBudWxsIHx8IGZvcm1CID09IG51bGwpIHtcbiAgICAgIHJlcy5wdXNoKGZvcm1BKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBjb25zdCByZXBzQSA9IGZvcm1BLnJlcHMgfHwge307XG4gICAgY29uc3QgcmVwc0IgPSBmb3JtQi5yZXBzIHx8IHt9O1xuICAgIGlmIChzdWJrZXlBICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGFsbFJlcHNCID0gYWxsUmVwcyhmb3JtQik7XG4gICAgICBmb3IgKGNvbnN0IGsgaW4gcmVwc0EpIHtcbiAgICAgICAgcmVwc0Fba10gPSBKT0lOX0ZPUk1TKHJlcHNBW2tdLCBhbGxSZXBzQiwgc3Via2V5QSwgc3Via2V5QikgYXMgRm9ybVtdO1xuICAgICAgICBmb3JtQVtgYWpmXyR7a31fY291bnRgXSA9IHJlcHNBW2tdLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzLnB1c2goey4uLmZvcm1CLCAuLi5mb3JtQSwgcmVwczogey4uLnJlcHNCLCAuLi5yZXBzQX19KTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGFycmF5IG9idGFpbmVkIGJ5IGV2YWx1YXRpbmcgZXhwcmVzc2lvbiBmb3IgZXZlcnkgcmVwZXRpdGlvbiBvZiBmb3JtLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7TWFpbkZvcm0gfCBNYWluRm9ybVtdfSBmb3Jtc1xuICogQHBhcmFtIHtzdHJpbmd9IGV4cHJlc3Npb25cbiAqIEByZXR1cm4geyp9ICB7YW55W119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBGUk9NX1JFUFMoZm9ybXM6IE1haW5Gb3JtIHwgTWFpbkZvcm1bXSwgZXhwcmVzc2lvbjogRnVuYyB8IHN0cmluZyk6IGFueVtdIHtcbiAgaWYgKHR5cGVvZiBleHByZXNzaW9uID09PSAnc3RyaW5nJykge1xuICAgIGV4cHJlc3Npb24gPSBjcmVhdGVGdW5jdGlvbihleHByZXNzaW9uKTtcbiAgfVxuICBpZiAoZm9ybXMgPT0gbnVsbCkge1xuICAgIGZvcm1zID0gW107XG4gIH1cbiAgaWYgKCFBcnJheS5pc0FycmF5KGZvcm1zKSkge1xuICAgIGZvcm1zID0gW2Zvcm1zXTtcbiAgfVxuICBjb25zdCBmdW5jID0gZXhwcmVzc2lvbjtcbiAgY29uc3QgcmVzID0gZm9ybXMubWFwKGZvcm0gPT4gYWxsUmVwcyhmb3JtIHx8IHt9KS5tYXAocmVwID0+IGZ1bmMoey4uLmZvcm0sIC4uLnJlcH0pKSkuZmxhdCgpO1xuICByZXR1cm4gcmVzLmZpbHRlcih2YWwgPT4gdmFsICE9IG51bGwpO1xufVxuXG4vKipcbiAqIERlcHJlY2F0ZWQuIFVzZSBJTkNMVURFU1xuICovXG5leHBvcnQgZnVuY3Rpb24gSVNJTihkYXRhc2V0OiBhbnlbXSwgdmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICBpZiAoZGF0YXNldCA9PSBudWxsIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGRhdGFzZXQuaW5kZXhPZih2YWx1ZSkgPj0gMDtcbn1cblxuLyoqXG4gKiBBcHBsaWVzIHRoZSBvcGVyYXRvciB0byBldmVyeSBwYWlyIG9mIGVsZW1lbnRzIChhcnJheUFbaV0sIGFycmF5QltpXSksXG4gKiByZXR1cm5pbmcgdGhlIGFycmF5IG9mIHJlc3VsdHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBPUChcbiAgYXJyYXlBOiBhbnlbXSxcbiAgYXJyYXlCOiBhbnlbXSxcbiAgb3BlcmF0b3I6ICgoYTogYW55LCBiOiBhbnkpID0+IGFueSkgfCBzdHJpbmcsXG4pOiBhbnlbXSB7XG4gIGlmICh0eXBlb2Ygb3BlcmF0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uc3QgZnVuYyA9IGNyZWF0ZUZ1bmN0aW9uKG9wZXJhdG9yKTtcbiAgICBvcGVyYXRvciA9IChlbGVtQSwgZWxlbUIpID0+IGZ1bmMoe2VsZW1BLCBlbGVtQn0pO1xuICB9XG4gIGNvbnN0IHJlczogYW55W10gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBNYXRoLm1pbihhcnJheUEubGVuZ3RoLCBhcnJheUIubGVuZ3RoKTsgaSsrKSB7XG4gICAgY29uc3QgdmFsID0gb3BlcmF0b3IoYXJyYXlBW2ldLCBhcnJheUJbaV0pO1xuICAgIHJlcy5wdXNoKHZhbCk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBHaXZlbiBhbiBhcnJheSBvZiB2YWx1ZXMsIHJldHVybnMgdGhlIGNvcnJlc3BvbmRpbmcgYXJyYXkgb2YgbGFiZWxzLFxuICogYXMgc3BlY2lmaWVkIGJ5IHRoZSBjaG9pY2VzIG9yaWdpbiBpbiBzY2hlbWEuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHsqfSBzY2hlbWFcbiAqIEBwYXJhbSB7c3RyaW5nW119IHZhbHVlc1xuICogQHJldHVybiB7Kn0gIHtzdHJpbmdbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEdFVF9MQUJFTFMoc2NoZW1hOiBhbnksIHZhbHVlczogc3RyaW5nW10sIGNob2ljZU9yaWdpbk5hbWU/OiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gIGNvbnN0IGNob2ljZUxhYmVscyA9IGV4dHJhY3RMYWJlbHNGcm9tQ2hvaWNlcyhzY2hlbWEpO1xuICByZXR1cm4gdmFsdWVzXG4gICAgLm1hcCh2YWwgPT4gKGNob2ljZU9yaWdpbk5hbWUgPyBjaG9pY2VPcmlnaW5OYW1lICsgJ18nICsgdmFsIDogdmFsKSlcbiAgICAubWFwKHZhbCA9PiAoY2hvaWNlTGFiZWxzW3ZhbF0gIT0gbnVsbCA/IGNob2ljZUxhYmVsc1t2YWxdIDogdmFsKSk7XG59XG5cbi8qKlxuICogUmVhZHMgZnJvbSByZXBvcnRfZGF0YSB0aGUgcmVzdWx0IG9mIHRoZSBBSSBwcm9tcHQgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBQUk9NUFRfUkVTVUxUKHJlcG9ydF9kYXRhOiBhbnksIHByb21wdE5hbWU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gIGlmIChyZXBvcnRfZGF0YS5kYXRhID09IG51bGwpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIHJldHVybiByZXBvcnRfZGF0YS5kYXRhW3Byb21wdE5hbWVdO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIHBpZSBjaGFydCBhcnJheXMgKGxhYmVscyBhbmQgdmFsdWVzKSBpbnRvIGEgSlNPTiBvYmplY3Qgd2hlcmUgZWFjaCBsYWJlbCBiZWNvbWVzIGEga2V5XG4gKiBhbmQgaXRzIGNvcnJlc3BvbmRpbmcgdmFsdWUgYmVjb21lcyB0aGUgdmFsdWUgaW4gdGhlIG9iamVjdC5cbiAqIEBwYXJhbSBsYWJlbHNcbiAqIEBwYXJhbSB2YWx1ZXNcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDSEFSVF9UT19EQVRBKGxhYmVsczogc3RyaW5nW10sIHZhbHVlczogYW55W10pOiBzdHJpbmcge1xuICBjb25zdCBqc29uT2JqOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9O1xuICBsYWJlbHMuZm9yRWFjaCgobGFiOiBzdHJpbmcsIGk6IG51bWJlcikgPT4gKGpzb25PYmpbbGFiXSA9IHZhbHVlc1tpXSkpO1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoanNvbk9iaik7XG59XG5cbi8qKlxuICogRm9ybWF0cyB0aGUgZ2l2ZW4gdGFibGUgcm93cyBhcyBhbiBIVE1MIHRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSByb3dzXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgZnVuY3Rpb24gRk9STUFUX1RBQkxFX1JPV1Mocm93czogYW55W11bXSk6IHN0cmluZyB7XG4gIGxldCBodG1sID0gJ1xcbjx0YWJsZT4nO1xuICBmb3IgKGNvbnN0IHJvdyBvZiByb3dzKSB7XG4gICAgaHRtbCArPSAnXFxuICA8dHI+XFxuICAgICc7XG4gICAgZm9yIChjb25zdCBjZWxsIG9mIHJvdykge1xuICAgICAgaHRtbCArPSBgPHRkPiR7Y2VsbH08L3RkPmA7XG4gICAgfVxuICAgIGh0bWwgKz0gJ1xcbiAgPC90cj4nO1xuICB9XG4gIGh0bWwgKz0gJ1xcbjwvdGFibGU+XFxuJztcbiAgcmV0dXJuIGh0bWw7XG59XG5cbi8qKlxuICogRm9ybWF0cyB0aGUgZ2l2ZW4gdGFibGUgY29sdW1ucyBhcyBhbiBIVE1MIHRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBjb2x1bW5zXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgZnVuY3Rpb24gRk9STUFUX1RBQkxFX0NPTFMoY29sdW1uczogYW55W11bXSk6IHN0cmluZyB7XG4gIGNvbnN0IG51bVJvd3MgPSBjb2x1bW5zLmxlbmd0aCAmJiBjb2x1bW5zWzBdLmxlbmd0aDtcbiAgY29uc3Qgcm93cyA9IEFycmF5KG51bVJvd3MpXG4gICAgLmZpbGwoMSlcbiAgICAubWFwKF8gPT4gW10pIGFzIGFueVtdW107XG4gIGZvciAoY29uc3QgY29sIG9mIGNvbHVtbnMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVJvd3M7IGkrKykge1xuICAgICAgcm93c1tpXS5wdXNoKGNvbFtpXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBGT1JNQVRfVEFCTEVfUk9XUyhyb3dzKTtcbn1cblxuLyoqXG4gKiBFeHRyYWN0cyB0aGUgZmllbGRzJyBkYXRhIGZyb20gdGhlIHNwZWNpZmllZCBmb3JtcyBhbmQgZm9ybWF0cyB0aGVtIGFzIGFuIEhUTUwgdGFibGUgc3RyaW5nLlxuICogQHBhcmFtIGZvcm1zXG4gKiBAcGFyYW0gZmllbGRzXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgZnVuY3Rpb24gRk9STUFUX1RBQkxFX0ZJRUxEUyhmb3JtczogTWFpbkZvcm1bXSwgZmllbGRzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gIGZvcm1zID0gZm9ybXMuZmlsdGVyKGYgPT4gZiAhPSBudWxsKTtcbiAgY29uc3Qgcm93cyA9IFtmaWVsZHNdIGFzIGFueVtdW107XG4gIGZvciAoY29uc3QgZm9ybSBvZiBmb3Jtcykge1xuICAgIHJvd3MucHVzaChmaWVsZHMubWFwKGZpZWxkID0+IGZvcm1bZmllbGRdKSk7XG4gIH1cbiAgcmV0dXJuIEZPUk1BVF9UQUJMRV9ST1dTKHJvd3MpO1xufVxuIl19