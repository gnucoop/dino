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
import { AjfChoicesOrigin } from '@ajf/core/forms';
import { ChoicesOriginChoiceEntry, ChoicesOriginDataSource } from './choices-origin-data-source';
import * as i0 from "@angular/core";
export declare class AjfFbChoicesOriginEditor {
    private _displayedColumns;
    get displayedColumns(): string[];
    private _choicesOrigin;
    get choicesOrigin(): AjfChoicesOrigin<any> | undefined;
    set choicesOrigin(choicesOrigin: AjfChoicesOrigin<any> | undefined);
    nameDuplicate: boolean;
    editing: {
        [key: string]: boolean;
    };
    name: string;
    label: string;
    canEditChoices: boolean;
    private _choices;
    get choices(): ChoicesOriginDataSource;
    private _choicesArr;
    get choicesArr(): ChoicesOriginChoiceEntry[];
    get hasInvalidChoices(): boolean;
    isChoiceValueInvalid(value: string, rowIdx: number): boolean;
    updateValue(evt: any, cell: string, _value: any, rowIdx: number): void;
    deleteRow(rowIdx: number): void;
    addRow(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFbChoicesOriginEditor, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfFbChoicesOriginEditor, "ajf-fb-choices-origin-editor", never, { "choicesOrigin": { "alias": "choicesOrigin"; "required": false; }; "nameDuplicate": { "alias": "nameDuplicate"; "required": false; }; }, {}, never, never, false, never>;
}
//# sourceMappingURL=choices-origin-editor.d.ts.map