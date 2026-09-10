import { tokenizer, tokTypes } from 'acorn';

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
class AjfError extends Error {
    get name() {
        return 'AjfError';
    }
    get message() {
        return this._message;
    }
    /**
     * this constructor will init the message error
     */
    constructor(message) {
        super(message);
        this.stack = '';
        // Set the prototype explicitly. Workaround needed in TS >= 2.1 when extending built-ins
        // See: https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md
        Object.setPrototypeOf(this, AjfError.prototype);
        this._message = message || '';
    }
}

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
 * It Creates an AjfCondition by conditio.
 * If condition.condition is not defined will be assigned ''.
 */
function createCondition(condition = {}) {
    return { condition: condition.condition || '' };
}

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
class AjfConditionSerializer {
    static fromJson(json) {
        return createCondition(json);
    }
}

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
 * It Creates an AjfFormula.
 * If formula.formula is not defined will be assigned ''.
 */
function createFormula(formula = {}) {
    return { formula: formula.formula || '' };
}

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
class AjfFormulaSerializer {
    static fromJson(json) {
        return createFormula(json);
    }
}

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
 * It creates a true AjfCondidion.
 */
function alwaysCondition() {
    return createCondition({ condition: 'true' });
}

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
function getArgumentNames(source) {
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
class AjfExpressionUtils {
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
function evaluateExpression(expression, context) {
    return createFunction(expression)(context);
}
const falseFunc = _ => false;
const cache = new Map();
for (const str of ['', 'undefined', 'false', '[object Object]']) {
    cache.set(str, falseFunc);
}
cache.set('null', _ => null);
cache.set('true', _ => true);
function createFunction(expression) {
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
function digitCount(x) {
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
function decimalCount(x) {
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
function isInt(x) {
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
function notEmpty(x) {
    return !(x == null || x.toString() === '');
}
/**
 * It is true if array contains x or array is equal to x.
 */
function valueInChoice(array, x) {
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
function round(n, digits = 0) {
    const m = Math.pow(10, digits);
    return Math.round(n * m) / m;
}
/**
 * Returns an array containing all the values that the specified field takes in the forms.
 * The values are converted to strings.
 */
function ALL_VALUES_OF(forms, field, filter = 'true') {
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
function plainArray(params) {
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
function buildPointData(xs, ys, rs) {
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
function COUNT_FORMS(forms, filter = 'true') {
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
function COUNT_REPS(forms, filter = 'true') {
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
function COUNT_FORMS_UNIQUE(forms, field, filter = 'true') {
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
function SUM(forms, field, filter = 'true') {
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
function MEAN(forms, field, filter = 'true') {
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
function STD(forms, field, filter = 'true') {
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
function PERCENT(a, b) {
    return a / b * 100 + '%';
}
/**
 * Calculates the percentage change between a value and his base reference value.
 */
function PERCENTAGE_CHANGE(value, reference_value) {
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
function FIRST(forms, expression, date = 'dino_created_at') {
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
function LAST(forms, expression, date = 'dino_created_at') {
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
function MIN(forms, field, filter = 'true') {
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
function MAX(forms, field, filter = 'true') {
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
function MEDIAN(forms, field, filter = 'true') {
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
function MODE(forms, field, filter = 'true') {
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
function buildDataset(dataset, colspans) {
    return buildAlignedDataset(dataset, colspans, []);
}
/**
 * Build a dataset for ajf dynamic table
 * @param dataset the dataset for the table
 * @param colspans colspan for each value in the dataset
 * @param textAlign alignment for each value in the dataset
 * @returns An AjfTableCell list
 */
function buildAlignedDataset(dataset, colspans, textAlign) {
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
function buildFormDataset(dataset, fields, rowLink, _backgroundColorA, _backgroundColorB) {
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
function buildAlignedFormDataset(dataset, fields, colspans, textAlign, rowLink, dialogFields, dialogLabelFields) {
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
function buildWidgetDataset(dataset, fields, rowLink, cellStyles, rowStyle, percWidth, backgroundColorA, backgroundColorB) {
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
function buildWidgetDatasetWithDialog(dataset, fields, dialogFields, dialogLabelFields, cellStyles, rowStyle, percWidth, backgroundColorA, backgroundColorB) {
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
function REPEAT(forms, array, fn, arg1, arg2 = 'true') {
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
function MAP(array, func) {
    return array.map(func);
}
/**
 * For each form in forms, the specified field is set with the value given by expression.
 * The form's fields can be used inside expression.
 */
function APPLY(forms, field, expression) {
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
function ROUND(num, digits) {
    return round(Number(num), digits);
}
/**
 * Deprecated. Use IF
 */
function EVALUATE(condition, branch1, branch2) {
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
function INCLUDES(arr, elem) {
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
function BUILD_DATASET(forms, schema) {
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
function APPLY_LABELS(forms, schema, fields) {
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
function FILTER_BY_VARS(formList, expression) {
    return FILTER_BY(formList, expression);
}
/**
 * Returns a copy of forms and its repetitions, keeping only the ones for which expression evaluates to true.
 */
function FILTER_BY(forms, expression) {
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
function FLATTEN_REPS(forms, slideName) {
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
function TODAY() {
    return new Date().toJSON().slice(0, 10);
}
/**
 * Logs val to the console.
 *
 * @export
 * @param {*} val
 */
function CONSOLE_LOG(val) {
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
function GET_AGE(dob, when) {
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
function LEN(dataset) {
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
function CONCAT(a, b) {
    return a.concat(b);
}
/**
 * Removes duplicate elements from an array.
 *
 * @export
 * @param {any[]} arr
 * @return {*}  {any[]}
 */
function REMOVE_DUPLICATES(arr) {
    return [...new Map(arr.map(v => [JSON.stringify(v), v])).values()];
}
// Returns the date obtained by adding days to date.
function ADD_DAYS(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d.toJSON().slice(0, 10);
}
// Returns the difference in days (a - b) between the two dates.
function DAYS_DIFF(a, b) {
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
function IS_BEFORE(date, dateToCompare) {
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
function IS_AFTER(date, dateToCompare) {
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
function IS_WITHIN_INTERVAL(date, dateStart, dateEnd) {
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
function COMPARE_DATE(date, dateStart, dateEnd, labels) {
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
function JOIN_FORMS(formsA, formsB, keyA, keyB) {
    return JOIN_REPEATING_SLIDES(formsA, formsB, keyA, keyB, null);
}
/**
 * Performs a left join of formsA and formsB, like JOIN_FORMS.
 * In addition, for each matching pair of formA and formB, their repeating slides are also joined.
 */
function JOIN_REPEATING_SLIDES(formsA, formsB, keyA, keyB, subkeyA, subkeyB) {
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
function FROM_REPS(forms, expression) {
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
function ISIN(dataset, value) {
    if (dataset == null || value == null) {
        return false;
    }
    return dataset.indexOf(value) >= 0;
}
/**
 * Applies the operator to every pair of elements (arrayA[i], arrayB[i]),
 * returning the array of results.
 */
function OP(arrayA, arrayB, operator) {
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
function GET_LABELS(schema, values, choiceOriginName) {
    const choiceLabels = extractLabelsFromChoices(schema);
    return values
        .map(val => (choiceOriginName ? choiceOriginName + '_' + val : val))
        .map(val => (choiceLabels[val] != null ? choiceLabels[val] : val));
}
/**
 * Reads from report_data the result of the AI prompt with the specified name.
 */
function PROMPT_RESULT(report_data, promptName) {
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
function CHART_TO_DATA(labels, values) {
    const jsonObj = {};
    labels.forEach((lab, i) => (jsonObj[lab] = values[i]));
    return JSON.stringify(jsonObj);
}
/**
 * Formats the given table rows as an HTML table string.
 * @param rows
 * @returns
 */
function FORMAT_TABLE_ROWS(rows) {
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
function FORMAT_TABLE_COLS(columns) {
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
function FORMAT_TABLE_FIELDS(forms, fields) {
    forms = forms.filter(f => f != null);
    const rows = [fields];
    for (const form of forms) {
        rows.push(fields.map(field => form[field]));
    }
    return FORMAT_TABLE_ROWS(rows);
}

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
 * It creates a false AjfCondidion.
 */
function neverCondition() {
    return createCondition({ condition: 'false' });
}

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
function renameArguments(formula, ancestorsNames, prefix) {
    const ancestorsNameStrings = Object.keys(ancestorsNames);
    const names = getArgumentNames(formula);
    names.delete('$value');
    for (const name of names) {
        if (ancestorsNameStrings.indexOf(name) > -1) {
            formula = formula.replace(new RegExp(String.raw `(?<!\.)\b${name}\b`, 'g'), name + '__' + prefix.slice(ancestorsNames[name]).join('__'));
        }
    }
    return formula;
}

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

export { ADD_DAYS, ALL_VALUES_OF, APPLY, APPLY_LABELS, AjfConditionSerializer, AjfError, AjfExpressionUtils, AjfFormulaSerializer, BUILD_DATASET, CHART_TO_DATA, COMPARE_DATE, CONCAT, CONSOLE_LOG, COUNT_FORMS, COUNT_FORMS_UNIQUE, COUNT_REPS, DAYS_DIFF, EVALUATE, FILTER_BY, FILTER_BY_VARS, FIRST, FLATTEN_REPS, FORMAT_TABLE_COLS, FORMAT_TABLE_FIELDS, FORMAT_TABLE_ROWS, FROM_REPS, GET_AGE, GET_LABELS, INCLUDES, ISIN, IS_AFTER, IS_BEFORE, IS_WITHIN_INTERVAL, JOIN_FORMS, JOIN_REPEATING_SLIDES, LAST, LEN, MAP, MAX, MEAN, MEDIAN, MIN, MODE, OP, PERCENT, PERCENTAGE_CHANGE, PROMPT_RESULT, REMOVE_DUPLICATES, REPEAT, ROUND, STD, SUM, TODAY, alwaysCondition, buildAlignedDataset, buildAlignedFormDataset, buildDataset, buildFormDataset, buildPointData, buildWidgetDataset, buildWidgetDatasetWithDialog, createCondition, createFormula, createFunction, decimalCount, digitCount, evaluateExpression, getArgumentNames, isInt, neverCondition, notEmpty, plainArray, renameArguments, round, valueInChoice };
//# sourceMappingURL=ajf-core-models.mjs.map
