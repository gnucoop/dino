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
import { AjfTime as Base } from '@ajf/core/time';
import { OnDestroy } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export declare const AJF_TIME_CONTROL_VALUE_ACCESSOR: any;
export declare class AjfTime extends Base implements ControlValueAccessor, OnDestroy {
    hoursList: number[];
    minutesList: number[];
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfTime, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfTime, "ajf-time", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=time.d.ts.map