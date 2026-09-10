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
import { OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AjfFormBuilderService } from './form-builder-service';
import * as i0 from "@angular/core";
export declare class AjfFbStringIdentifierDialogComponent implements OnDestroy {
    private _service;
    readonly fields$: Observable<AjfField[]>;
    readonly filteredFields$: Observable<AjfField[]>;
    readonly searchFilterCtrl: FormControl<string>;
    selectedFieldNames: string[];
    private _fields;
    private _fieldsSub;
    private _stringIdentifierSub;
    constructor(_service: AjfFormBuilderService);
    ngOnDestroy(): void;
    saveStringIdentifier(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFbStringIdentifierDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfFbStringIdentifierDialogComponent, "ajf-fb-string-identifier-dialog", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=string-identifier-dialog.d.ts.map