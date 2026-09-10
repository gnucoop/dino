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
import { AfterContentInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';
import { AjfCalendarEntry, AjfCalendarPeriod, AjfCalendarPeriodType, AjfCalendarViewMode } from './calendar-interfaces';
import { AjfCalendarService } from './calendar-service';
import * as i0 from "@angular/core";
export type AjfCalendarWeekDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
export interface AjfCalendarChange {
    source: AjfCalendar;
    period: AjfCalendarPeriod | null;
}
export declare abstract class AjfCalendar implements AfterContentInit, ControlValueAccessor, OnInit {
    private _cdr;
    private _service;
    get viewDate(): Date;
    set viewDate(viewDate: Date);
    private _disabled;
    get disabled(): boolean;
    set disabled(disabled: boolean);
    private _dateOnlyForDay;
    get dateOnlyForDay(): boolean;
    set dateOnlyForDay(dateOnlyForDay: boolean);
    private _viewMode;
    get viewMode(): AjfCalendarViewMode;
    set viewMode(viewMode: AjfCalendarViewMode);
    private _selectionMode;
    get selectionMode(): AjfCalendarPeriodType;
    set selectionMode(selectionMode: AjfCalendarPeriodType);
    private _startOfWeekDay;
    get startOfWeekDay(): AjfCalendarWeekDay;
    set startOfWeekDay(weekDay: AjfCalendarWeekDay);
    private _isoMode;
    get isoMode(): boolean;
    set isoMode(isoMode: boolean);
    private _minDate;
    get minDate(): Date | null;
    set minDate(minDate: Date | null);
    private _maxDate;
    get maxDate(): Date | null;
    set maxDate(maxDate: Date | null);
    private _change;
    readonly change: Observable<AjfCalendarChange>;
    private _selectedPeriod;
    set selectedPeriod(period: AjfCalendarPeriod | null);
    get value(): AjfCalendarPeriod | Date | null;
    set value(period: AjfCalendarPeriod | Date | null);
    get calendarHeaders(): string[];
    get calendarRows(): AjfCalendarEntry[][];
    get viewHeader(): string;
    private _viewDate;
    private _viewHeader;
    private _calendarRows;
    private _calendarHeaders;
    constructor(_cdr: ChangeDetectorRef, _service: AjfCalendarService);
    prevPage(): void;
    nextPage(): void;
    previousViewMode(): void;
    selectEntry(entry: AjfCalendarEntry): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: any): void;
    writeValue(value: any): void;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    private _onChangeCallback;
    private _onTouchedCallback;
    private _setViewDate;
    private _buildCalendar;
    private _refreshSelection;
    private _canSelectEntry;
    private _nextViewMode;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfCalendar, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AjfCalendar, never, never, { "viewDate": { "alias": "viewDate"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "dateOnlyForDay": { "alias": "dateOnlyForDay"; "required": false; }; "viewMode": { "alias": "viewMode"; "required": false; }; "selectionMode": { "alias": "selectionMode"; "required": false; }; "startOfWeekDay": { "alias": "startOfWeekDay"; "required": false; }; "isoMode": { "alias": "isoMode"; "required": false; }; "minDate": { "alias": "minDate"; "required": false; }; "maxDate": { "alias": "maxDate"; "required": false; }; "selectedPeriod": { "alias": "selectedPeriod"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, { "change": "change"; }, never, never, false, never>;
}
//# sourceMappingURL=calendar.d.ts.map