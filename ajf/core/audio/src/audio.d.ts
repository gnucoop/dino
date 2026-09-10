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
import { AjfFile } from '@ajf/core/file-input';
import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export declare abstract class AjfAudio implements ControlValueAccessor {
    protected _cdr: ChangeDetectorRef;
    valueChange: EventEmitter<AjfFile | null>;
    private _value;
    get value(): AjfFile | null;
    set value(val: AjfFile | null);
    private _onChangeCallback;
    private _onTouchedCallback;
    constructor(_cdr: ChangeDetectorRef);
    writeValue(value: AjfFile | null): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfAudio, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AjfAudio, never, never, {}, { "valueChange": "valueChange"; }, never, never, false, never>;
}
//# sourceMappingURL=audio.d.ts.map