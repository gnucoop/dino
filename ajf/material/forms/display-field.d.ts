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
import { AjfFormRendererService, AjfInputFieldComponent, AjfWarningAlertService } from '@ajf/core/forms';
import * as i0 from "@angular/core";
/**
 * this component show the control value inherited from AjfBaseFieldComponent.
 *
 * @export
 * @class AjfDisplayFieldComponent
 */
export declare class AjfDisplayFieldComponent extends AjfInputFieldComponent {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfDisplayFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfDisplayFieldComponent, "ajf-display-field", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=display-field.d.ts.map