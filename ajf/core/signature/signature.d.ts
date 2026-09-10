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
import { ChangeDetectorRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { AjfFile } from '@ajf/core/file-input';
import * as i0 from "@angular/core";
export declare abstract class AjfSignature implements ControlValueAccessor {
    protected _cdr: ChangeDetectorRef;
    private _renderer;
    sigPad: any;
    sigPadElement: HTMLCanvasElement | null;
    context: CanvasRenderingContext2D | null;
    isDrawing: boolean;
    isDrawn: boolean;
    /**
     * implements the control form value.
     * represents the signature value.
     *
     * @memberof AjfSignature
     */
    private _signatureValue;
    get value(): AjfFile | null;
    set value(value: AjfFile | null);
    private _onChangeCallback;
    private _onTouchedCallback;
    constructor(_cdr: ChangeDetectorRef, _renderer: Renderer2);
    onMouseUp(_e: Event): void;
    onMouseDown(e: Event): void;
    onMouseMove(e: Event): void;
    /** ControlValueAccessor implements */
    writeValue(value: AjfFile | null): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: () => void): void;
    private relativeCoords;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfSignature, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AjfSignature, never, never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=signature.d.ts.map