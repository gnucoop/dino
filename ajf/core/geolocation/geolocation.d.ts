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
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { AjfGeolocationModel } from './geolocation-model';
import * as i0 from "@angular/core";
export declare abstract class AjfGeolocation implements ControlValueAccessor, OnDestroy {
    protected _cdr: ChangeDetectorRef;
    readonly: boolean;
    get geolocation(): AjfGeolocationModel;
    private _value;
    get value(): string;
    set value(value: string);
    get latitude(): string;
    set latitude(latitude: string);
    get longitude(): string;
    set longitude(longitude: string);
    private _onChangeCallback;
    private _onTouchedCallback;
    private _valueChangeSub;
    constructor(_cdr: ChangeDetectorRef);
    getLocation(): void;
    ngOnDestroy(): void;
    writeValue(value: string): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: any): void;
    focusHandler(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfGeolocation, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AjfGeolocation, never, never, { "readonly": { "alias": "readonly"; "required": false; }; }, {}, never, never, false, never>;
}
//# sourceMappingURL=geolocation.d.ts.map