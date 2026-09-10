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
import { AjfField } from '@ajf/core/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AjfFbConditionEditor } from './condition-editor';
import { AjfFormBuilderService } from './form-builder-service';
import * as i0 from "@angular/core";
export declare class AjfFbValidationConditionEditorDialog {
    dialogRef: MatDialogRef<AjfFbValidationConditionEditorDialog>;
    editor: AjfFbConditionEditor;
    private _fields;
    get fields(): Observable<AjfField[]>;
    condition: string;
    errorMessage: string;
    constructor(service: AjfFormBuilderService, dialogRef: MatDialogRef<AjfFbValidationConditionEditorDialog>);
    saveCondition(): void;
    closeDialog(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFbValidationConditionEditorDialog, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfFbValidationConditionEditorDialog, "ajf-fb-validation-condition-editor-dialog", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=validation-condition-editor-dialog.d.ts.map