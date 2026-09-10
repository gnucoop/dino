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
import * as i0 from "@angular/core";
/**
 * It formats Date with 'yyyy-MM-dd'
 * @param date the date to format
 * @return the format date
 */
export declare class AjfDateValueStringPipe implements PipeTransform {
    transform(date: Date | 'today' | undefined): string | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfDateValueStringPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<AjfDateValueStringPipe, "ajfDateValueString", false>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AjfDateValueStringPipe>;
}
//# sourceMappingURL=date-value-string.d.ts.map