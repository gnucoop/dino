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
import { AjfField, AjfValidationService } from '@ajf/core/forms';
import { AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class AjfFbConditionEditor implements AfterViewInit {
    private _fields;
    get fields(): AjfField[];
    set fields(fields: AjfField[]);
    condition: string;
    formulaEditorControl: FormControl<string | null>;
    constructor(_: AjfValidationService);
    ngAfterViewInit(): void;
    insertVariable(variable: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFbConditionEditor, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfFbConditionEditor, "ajf-condition-editor", never, { "fields": { "alias": "fields"; "required": false; }; "condition": { "alias": "condition"; "required": false; }; }, {}, never, never, false, never>;
}
//# sourceMappingURL=condition-editor.d.ts.map