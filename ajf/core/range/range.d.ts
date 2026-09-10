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
import { AjfBaseFieldComponent, AjfFormRendererService, AjfRangeFieldInstance, AjfWarningAlertService } from '@ajf/core/forms';
import { ChangeDetectorRef, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export declare abstract class AjfRange extends AjfBaseFieldComponent<AjfRangeFieldInstance> implements ControlValueAccessor, OnInit {
    cdr: ChangeDetectorRef;
    private _appearance;
    private _end;
    private _name;
    private _onChangeCallback;
    private _onTouchedCallback;
    private _start;
    private _step;
    private _value;
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    get appearance(): string;
    set appearance(newAppearance: string);
    get end(): number | undefined;
    set end(newEnd: number | undefined);
    get name(): string | undefined;
    set name(newName: string | undefined);
    get start(): number | undefined;
    set start(newStart: number | undefined);
    get step(): number | undefined;
    set step(newStep: number | undefined);
    get value(): number;
    set value(newValue: number);
    ngOnInit(): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: () => void): void;
    reset(): void;
    writeValue(value: number): void;
    /**
     * Handles rating star clicks by updating the form control value
     * @param starValue The rating value (1-5) to set
     */
    onRatingClick(starValue: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfRange, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AjfRange, never, never, { "appearance": { "alias": "appearance"; "required": false; }; "end": { "alias": "end"; "required": false; }; "name": { "alias": "name"; "required": false; }; "start": { "alias": "start"; "required": false; }; "step": { "alias": "step"; "required": false; }; }, {}, never, never, false, never>;
}
//# sourceMappingURL=range.d.ts.map