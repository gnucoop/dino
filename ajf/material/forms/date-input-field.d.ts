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
import { AjfBaseFieldComponent, AjfDateFieldInstance, AjfFormRendererService } from '@ajf/core/forms';
import { ChangeDetectorRef } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { UntypedFormControl } from '@angular/forms';
import { AjfWarningAlertService } from './warning-alert-service';
import * as i0 from "@angular/core";
export declare class AjfDateInputFieldComponent extends AjfBaseFieldComponent<AjfDateFieldInstance> {
    input: MatInput;
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    clear(ctrl: UntypedFormControl): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfDateInputFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfDateInputFieldComponent, "ng-component", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=date-input-field.d.ts.map