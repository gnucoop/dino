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
import { AjfFormRendererService } from '@ajf/core/forms';
import { AjfRange } from '@ajf/core/range';
import { ChangeDetectorRef } from '@angular/core';
import { AjfWarningAlertService } from './warning-alert-service';
import * as i0 from "@angular/core";
export declare class AjfRangeFieldComponent extends AjfRange {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    /**
     * True when no value has been selected yet, so that the slider is not
     * rendered as if the minimum value had been picked.
     */
    isEmpty(value: unknown): boolean;
    enumerateStars(): number[];
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfRangeFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfRangeFieldComponent, "ajf-range", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=range-field.d.ts.map