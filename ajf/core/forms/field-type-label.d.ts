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
import { PipeTransform } from '@angular/core';
import { AjfFieldInstance } from './interface/fields-instances/field-instance';
import * as i0 from "@angular/core";
/**
 * What a field row prints under its label: the kind of field it is, in words,
 * plus the constraint the schema puts on it.
 *
 * `name` and `detailUnit` are translation keys, while `detailValue` carries the
 * numbers, which read the same in every language.
 */
export interface AjfFieldTypeLabel {
    /** Translation key for the type name, e.g. `text`, `single choice`. */
    name: string;
    /** The constraint's numbers, e.g. `16` or `0–100`. */
    detailValue?: string;
    /** Translation key for the constraint's unit, e.g. `characters`. */
    detailUnit?: string;
}
/**
 * Resolve the type line of a field row.
 *
 * Takes the instance rather than the node because two of the names depend on how
 * the field actually ends up rendering: a choice field reads as `choice with
 * search` once its choices outgrow the search threshold, and a range field with
 * the `rating` appearance is a different thing from a slider.
 */
export declare class AjfFieldTypeLabelPipe implements PipeTransform {
    private readonly _searchThreshold;
    constructor(searchThreshold: number);
    transform(instance: AjfFieldInstance): AjfFieldTypeLabel;
    private _name;
    /**
     * Whether the choices collapse into a searchable dropdown. Kept in step with
     * the `isNarrow` getter of the choice field components, `forceExpanded`
     * included, so the label never contradicts the control below it.
     */
    private _isNarrow;
    private _detail;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFieldTypeLabelPipe, [{ optional: true; }]>;
    static ɵpipe: i0.ɵɵPipeDeclaration<AjfFieldTypeLabelPipe, "ajfFieldTypeLabel", false>;
}
//# sourceMappingURL=field-type-label.d.ts.map