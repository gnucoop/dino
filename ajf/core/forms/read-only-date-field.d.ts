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
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { AjfInputFieldComponent as CoreComponent } from './input-field';
import { AjfFormRendererService } from './form-renderer';
import { AjfWarningAlertService } from './warning-alert-service';
import { TranslocoService } from '@ajf/core/transloco';
import * as i0 from "@angular/core";
/**
 * this component show the control value inherited from AjfBaseFieldComponent.
 *
 * @export
 * @class AjfReadOnlyDateFieldComponent
 */
export declare class AjfReadOnlyDateFieldComponent extends CoreComponent {
    private _ts;
    readonly date: Observable<string>;
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, _ts: TranslocoService, was: AjfWarningAlertService);
    formatDateField(val: any): string;
    private _getCurrentLocale;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfReadOnlyDateFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfReadOnlyDateFieldComponent, "ajf-read-date-only-field", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=read-only-date-field.d.ts.map