import * as i0 from '@angular/core';
import { Injectable, Pipe, NgModule, EventEmitter, Directive, Input, Output } from '@angular/core';
import { isAfter, isSameDay, isBefore, format, endOfMonth, startOfMonth, getISODay, endOfISOWeek, startOfISOWeek, addWeeks, subWeeks, endOfYear, startOfYear, startOfDay, endOfDay, addMonths, addYears, subMonths, subYears, setISODay, startOfWeek, addDays, endOfWeek, parseISO } from 'date-fns';

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
function isBetween(date, rangeLeft, rangeRight) {
    return ((isAfter(date, rangeLeft) || isSameDay(date, rangeLeft)) &&
        (isBefore(date, rangeRight) || isSameDay(date, rangeRight)));
}
function periodOrder(entryType) {
    return ['day', 'week', 'month', 'year'].indexOf(entryType);
}
class AjfCalendarService {
    buildView(params) {
        const { viewMode, viewDate } = params;
        switch (viewMode) {
            case 'decade':
                let curYear = viewDate.getFullYear();
                let firstYear = curYear - (curYear % 10) + 1;
                let lastYear = firstYear + 11;
                return {
                    header: `${firstYear} - ${lastYear}`,
                    headerRow: [],
                    rows: this._decadeCalendarRows(params),
                };
            case 'year':
                return {
                    header: `${viewDate.getFullYear()}`,
                    headerRow: [],
                    rows: this._yearCalendarRows(params),
                };
            case 'month':
                return {
                    header: format(viewDate, 'MMM yyyy'),
                    headerRow: this._monthHeaderRow(params),
                    rows: this._monthCalendarRows(params),
                };
        }
        return {
            header: '',
            headerRow: [],
            rows: [],
        };
    }
    monthBounds(date, isoMode) {
        if (!isoMode) {
            return {
                start: startOfMonth(date),
                end: endOfMonth(date),
            };
        }
        const isoDay = getISODay(date);
        date = isoDay < 4 ? endOfISOWeek(date) : startOfISOWeek(date);
        let startDate = startOfMonth(date);
        let endDate = endOfMonth(startDate);
        const startWeekDay = startDate.getDay();
        const endWeekDay = endDate.getDay();
        if (startWeekDay == 0 || startWeekDay > 4) {
            startDate = addWeeks(startDate, 1);
        }
        if (endWeekDay > 0 && endWeekDay < 4) {
            endDate = subWeeks(endDate, 1);
        }
        startDate = startOfISOWeek(startDate);
        endDate = endOfISOWeek(endDate);
        return { start: startDate, end: endDate };
    }
    getEntryRange(entry) {
        if (entry.type === 'day') {
            return { start: new Date(entry.date), end: new Date(entry.date) };
        }
        else {
            let curDate = new Date(entry.date);
            return {
                start: entry.type === 'month' ? startOfMonth(curDate) : startOfYear(curDate),
                end: entry.type === 'month' ? endOfMonth(curDate) : endOfYear(curDate),
            };
        }
    }
    isEntrySelected(entry, selection) {
        if (selection != null && selection.startDate != null && selection.endDate != null) {
            let selectionStart = startOfDay(selection.startDate);
            let selectionEnd = endOfDay(selection.endDate);
            let selectionPeriodOrder = periodOrder(selection.type);
            let entryPeriodOrder = periodOrder(entry.type);
            let entryRange = this.getEntryRange(entry);
            if (entryPeriodOrder <= selectionPeriodOrder &&
                isBetween(entryRange.start, selectionStart, selectionEnd) &&
                isBetween(entryRange.end, selectionStart, selectionEnd)) {
                return 'full';
            }
            else if (entryPeriodOrder > selectionPeriodOrder &&
                isBetween(selectionStart, entryRange.start, entryRange.end) &&
                isBetween(selectionEnd, entryRange.start, entryRange.end)) {
                return 'partial';
            }
        }
        return 'none';
    }
    entryLabel(entry) {
        if (entry.type === 'day') {
            return `${entry.date.getDate()}`;
        }
        if (entry.type === 'month') {
            return format(entry.date, 'MMM');
        }
        return `${entry.date.getFullYear()}`;
    }
    nextView(viewDate, viewMode) {
        if (viewMode == 'month') {
            return addMonths(viewDate, 1);
        }
        else if (viewMode == 'year') {
            return addYears(viewDate, 1);
        }
        else if (viewMode == 'decade') {
            return addYears(viewDate, 10);
        }
        return viewDate;
    }
    previousView(viewDate, viewMode) {
        if (viewMode == 'month') {
            return subMonths(viewDate, 1);
        }
        else if (viewMode == 'year') {
            return subYears(viewDate, 1);
        }
        else if (viewMode == 'decade') {
            return subYears(viewDate, 10);
        }
        return viewDate;
    }
    _monthHeaderRow(params) {
        const { isoMode, viewDate } = params;
        let curDate;
        if (isoMode) {
            curDate = setISODay(startOfWeek(viewDate), 1);
        }
        else {
            curDate = startOfWeek(viewDate);
        }
        let weekDayNames = [];
        for (let i = 0; i < 7; i++) {
            weekDayNames.push(format(curDate, 'EEE'));
            curDate = addDays(curDate, 1);
        }
        return weekDayNames;
    }
    _decadeCalendarRows(params) {
        const { viewDate, selection } = params;
        let curYear = viewDate.getFullYear();
        let firstYear = curYear - (curYear % 10) + 1;
        let curDate = startOfYear(viewDate);
        curDate.setFullYear(firstYear);
        let rows = [];
        for (let i = 0; i < 4; i++) {
            let row = [];
            for (let j = 0; j < 3; j++) {
                let date = new Date(curDate);
                let newEntry = { type: 'year', date: date, selected: 'none' };
                newEntry.selected = this.isEntrySelected(newEntry, selection);
                row.push(newEntry);
                curDate = addYears(curDate, 1);
            }
            rows.push(row);
        }
        return rows;
    }
    _yearCalendarRows(params) {
        const { viewDate, selection } = params;
        let curDate = startOfYear(viewDate);
        let rows = [];
        for (let i = 0; i < 4; i++) {
            let row = [];
            for (let j = 0; j < 3; j++) {
                let date = new Date(curDate);
                let newEntry = { type: 'month', date: date, selected: 'none' };
                newEntry.selected = this.isEntrySelected(newEntry, selection);
                row.push(newEntry);
                curDate = addMonths(curDate, 1);
            }
            rows.push(row);
        }
        return rows;
    }
    _monthCalendarRows(params) {
        const { viewDate, selection, isoMode, minDate, maxDate } = params;
        const monthBounds = this.monthBounds(viewDate, isoMode);
        let viewStartDate = new Date(monthBounds.start);
        let viewEndDate = new Date(monthBounds.end);
        if (!isoMode) {
            viewStartDate = startOfWeek(viewStartDate);
            viewEndDate = endOfWeek(viewEndDate);
        }
        let rows = [];
        let todayDate = new Date();
        let curDate = new Date(viewStartDate);
        while (curDate < viewEndDate) {
            let row = [];
            for (let i = 0; i < 7; i++) {
                let disabled = (minDate != null && isBefore(curDate, minDate)) ||
                    (maxDate != null && isAfter(curDate, maxDate));
                let date = new Date(curDate);
                let newEntry = {
                    type: 'day',
                    date: date,
                    selected: 'none',
                    highlight: format(todayDate, 'yyyy-MM-dd') === format(curDate, 'yyyy-MM-dd'),
                    disabled: disabled,
                };
                newEntry.selected = this.isEntrySelected(newEntry, selection);
                row.push(newEntry);
                curDate = addDays(curDate, 1);
            }
            rows.push(row);
        }
        return rows;
    }
    static { this.ɵfac = function AjfCalendarService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfCalendarService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AjfCalendarService, factory: AjfCalendarService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfCalendarService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();

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
class AjfCalendarEntryLabelPipe {
    constructor(_service) {
        this._service = _service;
    }
    transform(entry) {
        return this._service.entryLabel(entry);
    }
    static { this.ɵfac = function AjfCalendarEntryLabelPipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfCalendarEntryLabelPipe)(i0.ɵɵdirectiveInject(AjfCalendarService, 16)); }; }
    static { this.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ajfCalendarEntryLabel", type: AjfCalendarEntryLabelPipe, pure: true }); }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AjfCalendarEntryLabelPipe, factory: AjfCalendarEntryLabelPipe.ɵfac }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfCalendarEntryLabelPipe, [{
        type: Injectable
    }, {
        type: Pipe,
        args: [{ name: 'ajfCalendarEntryLabel' }]
    }], () => [{ type: AjfCalendarService }], null); })();

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
class AjfCalendarModule {
    static { this.ɵfac = function AjfCalendarModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfCalendarModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfCalendarModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({}); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfCalendarModule, [{
        type: NgModule,
        args: [{
                declarations: [AjfCalendarEntryLabelPipe],
                exports: [AjfCalendarEntryLabelPipe],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AjfCalendarModule, { declarations: [AjfCalendarEntryLabelPipe], exports: [AjfCalendarEntryLabelPipe] }); })();
class AjfGregorianCalendarModule {
    static { this.ɵfac = function AjfGregorianCalendarModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfGregorianCalendarModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfGregorianCalendarModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [AjfCalendarService] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfGregorianCalendarModule, [{
        type: NgModule,
        args: [{
                providers: [AjfCalendarService],
            }]
    }], null, null); })();

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
const weekDays = [
    '',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
];
class AjfCalendar {
    get viewDate() {
        return this._viewDate;
    }
    set viewDate(viewDate) {
        this._setViewDate(viewDate);
        this._cdr.markForCheck();
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(disabled) {
        const newDisabled = disabled != null && `${disabled}` !== 'false';
        if (newDisabled !== this._disabled) {
            this._disabled = newDisabled;
            this._cdr.markForCheck();
        }
    }
    get dateOnlyForDay() {
        return this._disabled;
    }
    set dateOnlyForDay(dateOnlyForDay) {
        this._dateOnlyForDay = dateOnlyForDay != null && `${dateOnlyForDay}` !== 'false';
        this._cdr.markForCheck();
    }
    get viewMode() {
        return this._viewMode;
    }
    set viewMode(viewMode) {
        this._viewMode = viewMode;
        this._buildCalendar();
        this._cdr.markForCheck();
    }
    get selectionMode() {
        return this._selectionMode;
    }
    set selectionMode(selectionMode) {
        this._selectionMode = selectionMode;
        this._cdr.markForCheck();
    }
    get startOfWeekDay() {
        return weekDays[this._startOfWeekDay];
    }
    set startOfWeekDay(weekDay) {
        this._startOfWeekDay = weekDays.indexOf(weekDay);
        if (this._viewMode === 'month') {
            this._buildCalendar();
        }
        this._cdr.markForCheck();
    }
    get isoMode() {
        return this._isoMode;
    }
    set isoMode(isoMode) {
        this._isoMode = isoMode;
        this._buildCalendar();
    }
    get minDate() {
        return this._minDate;
    }
    set minDate(minDate) {
        this._minDate = minDate != null ? new Date(minDate.valueOf()) : null;
        this._cdr.markForCheck();
    }
    get maxDate() {
        return this._maxDate;
    }
    set maxDate(maxDate) {
        this._maxDate = maxDate != null ? new Date(maxDate.valueOf()) : null;
        this._cdr.markForCheck();
    }
    set selectedPeriod(period) {
        this._selectedPeriod = period;
        this._change.emit({ source: this, period: period });
        this._refreshSelection();
        this._cdr.markForCheck();
    }
    get value() {
        if (this._dateOnlyForDay && this.selectionMode === 'day') {
            return this._selectedPeriod != null ? this._selectedPeriod.startDate : null;
        }
        return this._selectedPeriod;
    }
    set value(period) {
        if (this._dateOnlyForDay &&
            this.selectionMode === 'day' &&
            period instanceof Date &&
            (this._selectedPeriod == null || period !== this._selectedPeriod.startDate)) {
            this.selectedPeriod = { type: 'day', startDate: period, endDate: period };
        }
        else if (period instanceof Object && period !== this._selectedPeriod) {
            this.selectedPeriod = period;
            this._onChangeCallback(period);
        }
        this._cdr.markForCheck();
    }
    get calendarHeaders() {
        return this._calendarHeaders;
    }
    get calendarRows() {
        return this._calendarRows;
    }
    get viewHeader() {
        return this._viewHeader;
    }
    constructor(_cdr, _service) {
        this._cdr = _cdr;
        this._service = _service;
        this._disabled = false;
        this._dateOnlyForDay = false;
        this._viewMode = 'month';
        this._selectionMode = 'day';
        this._startOfWeekDay = 1;
        this._isoMode = false;
        this._minDate = null;
        this._maxDate = null;
        this._change = new EventEmitter();
        this.change = this._change;
        this._selectedPeriod = null;
        this._viewDate = new Date();
        this._viewHeader = '';
        this._calendarRows = [];
        this._calendarHeaders = [];
        this._onChangeCallback = (_) => { };
        this._onTouchedCallback = () => { };
    }
    prevPage() {
        this.viewDate = this._service.previousView(this._viewDate, this._viewMode);
        this._buildCalendar();
    }
    nextPage() {
        this.viewDate = this._service.nextView(this._viewDate, this._viewMode);
        this._buildCalendar();
    }
    previousViewMode() {
        if (this._viewMode == 'decade') {
            return;
        }
        else if (this._viewMode == 'year') {
            this._viewMode = 'decade';
        }
        else if (this._viewMode == 'month') {
            this._viewMode = 'year';
        }
        this._buildCalendar();
    }
    selectEntry(entry) {
        if (!this._canSelectEntry(entry)) {
            return this._nextViewMode(entry);
        }
        let newPeriod = null;
        if (this._service.isEntrySelected(entry, this._selectedPeriod) == 'full') {
            newPeriod = null;
        }
        else if (this._selectionMode == 'day') {
            newPeriod = { type: 'day', startDate: entry.date, endDate: entry.date };
        }
        else if (this._selectionMode == 'week') {
            newPeriod = {
                type: 'week',
                startDate: this._isoMode
                    ? startOfISOWeek(entry.date)
                    : startOfWeek(entry.date, {
                        weekStartsOn: this._startOfWeekDay,
                    }),
                endDate: this._isoMode
                    ? endOfISOWeek(entry.date)
                    : endOfWeek(entry.date, {
                        weekStartsOn: this._startOfWeekDay,
                    }),
            };
        }
        else if (this._selectionMode == 'month') {
            const monthBounds = this._service.monthBounds(entry.date, this._isoMode);
            newPeriod = {
                type: 'month',
                startDate: new Date(monthBounds.start),
                endDate: new Date(monthBounds.end),
            };
        }
        else if (this._selectionMode == 'year') {
            newPeriod = {
                type: 'year',
                startDate: startOfYear(entry.date),
                endDate: endOfYear(entry.date),
            };
        }
        this.value = newPeriod;
        this._onTouchedCallback();
        this._cdr.markForCheck();
    }
    registerOnChange(fn) {
        this._onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this._onTouchedCallback = fn;
    }
    writeValue(value) {
        if (typeof value === 'string') {
            value = parseISO(value);
        }
        this.value = value;
    }
    ngOnInit() {
        this._buildCalendar();
    }
    ngAfterContentInit() {
        this._refreshSelection();
    }
    _setViewDate(date) {
        this._viewDate = date;
    }
    _buildCalendar() {
        const calendarView = this._service.buildView({
            viewMode: this._viewMode,
            viewDate: this._viewDate,
            selection: this._selectedPeriod,
            isoMode: this._isoMode,
            minDate: this._minDate == null ? null : new Date(this._minDate),
            maxDate: this._maxDate == null ? null : new Date(this._maxDate),
        });
        this._viewHeader = calendarView.header;
        this._calendarHeaders = calendarView.headerRow;
        this._calendarRows = calendarView.rows;
        this._cdr.markForCheck();
    }
    _refreshSelection() {
        for (let row of this._calendarRows) {
            for (let entry of row) {
                entry.selected = this._service.isEntrySelected(entry, this._selectedPeriod);
            }
        }
    }
    _canSelectEntry(entry) {
        if (['day', 'week'].indexOf(this._selectionMode) >= 0 && entry.type != 'day') {
            return false;
        }
        if (this._selectionMode == 'month' && entry.type == 'year') {
            return false;
        }
        return true;
    }
    _nextViewMode(entry) {
        if (this._viewMode == 'decade') {
            this._viewMode = 'year';
        }
        else if (this._viewMode == 'year') {
            this._viewMode = 'month';
        }
        else if (this._viewMode == 'month') {
            return;
        }
        this._viewDate = entry.date;
        this._buildCalendar();
    }
    static { this.ɵfac = function AjfCalendar_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfCalendar)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(AjfCalendarService)); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AjfCalendar, inputs: { viewDate: "viewDate", disabled: "disabled", dateOnlyForDay: "dateOnlyForDay", viewMode: "viewMode", selectionMode: "selectionMode", startOfWeekDay: "startOfWeekDay", isoMode: "isoMode", minDate: "minDate", maxDate: "maxDate", selectedPeriod: "selectedPeriod", value: "value" }, outputs: { change: "change" } }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfCalendar, [{
        type: Directive
    }], () => [{ type: i0.ChangeDetectorRef }, { type: AjfCalendarService }], { viewDate: [{
            type: Input
        }], disabled: [{
            type: Input
        }], dateOnlyForDay: [{
            type: Input
        }], viewMode: [{
            type: Input
        }], selectionMode: [{
            type: Input
        }], startOfWeekDay: [{
            type: Input
        }], isoMode: [{
            type: Input
        }], minDate: [{
            type: Input
        }], maxDate: [{
            type: Input
        }], change: [{
            type: Output
        }], selectedPeriod: [{
            type: Input
        }], value: [{
            type: Input
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

/**
 * Generated bundle index. Do not edit.
 */

export { AjfCalendar, AjfCalendarEntryLabelPipe, AjfCalendarModule, AjfCalendarService, AjfGregorianCalendarModule };
//# sourceMappingURL=ajf-core-calendar.mjs.map
