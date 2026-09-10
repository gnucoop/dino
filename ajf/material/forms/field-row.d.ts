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
import { AjfFieldInstance } from '@ajf/core/forms';
import { BooleanInput } from '@angular/cdk/coercion';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * One field of a slide, laid out as a row: type badge, label, control, and a
 * right-hand column carrying either the field description or its validation
 * error.
 *
 * Both the plain and the repeating slide branches of the renderer render through
 * this component, so the row layout is defined in exactly one place.
 */
export declare class AjfFieldRow implements OnDestroy {
    private _cdr;
    set instance(instance: AjfFieldInstance);
    get instance(): AjfFieldInstance;
    private _instance;
    private _instanceSub;
    constructor(_cdr: ChangeDetectorRef);
    ngOnDestroy(): void;
    set readonly(readonly: boolean);
    get readonly(): boolean;
    private _readonly;
    /**
     * Rows drop out on the host element rather than inside it, so that a hidden
     * field leaves no empty cell behind when rows are laid out in columns.
     *
     * A formula field with no label carries no information of its own -- it only
     * feeds other fields -- so it is kept out of the layout too.
     */
    get hidden(): boolean;
    /** Notes render their own block and never get a control border around it. */
    get isNote(): boolean;
    get required(): boolean;
    static ngAcceptInputType_readonly: BooleanInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFieldRow, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfFieldRow, "ajf-field-row", never, { "instance": { "alias": "instance"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; }, {}, never, never, false, never>;
}
//# sourceMappingURL=field-row.d.ts.map