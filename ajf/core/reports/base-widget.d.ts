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
import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { AjfWidgetInstance } from './interface/widgets-instances/widget-instance';
import * as i0 from "@angular/core";
export declare class AjfBaseWidgetComponent<T extends AjfWidgetInstance = AjfWidgetInstance> {
    protected _cdr: ChangeDetectorRef;
    readonly el: ElementRef;
    private _instance;
    get instance(): T | undefined;
    set instance(instance: T | undefined);
    constructor(_cdr: ChangeDetectorRef, el: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfBaseWidgetComponent<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AjfBaseWidgetComponent<any>, never, never, { "instance": { "alias": "instance"; "required": false; }; }, {}, never, never, false, never>;
}
//# sourceMappingURL=base-widget.d.ts.map