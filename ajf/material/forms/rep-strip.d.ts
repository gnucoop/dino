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
import { AjfRepeatingSlideInstance } from '@ajf/core/forms';
import { BooleanInput } from '@angular/cdk/coercion';
import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * The pager for a repeating slide: one button per repetition plus add and remove
 * actions. The renderer keeps one page per repetition, so picking a number here
 * is a page change, which the renderer performs.
 */
export declare class AjfRepStrip {
    slide: AjfRepeatingSlideInstance;
    /** The repetition currently on screen, zero based. */
    current: number;
    set readonly(readonly: boolean);
    get readonly(): boolean;
    private _readonly;
    readonly goTo: EventEmitter<number>;
    readonly add: EventEmitter<void>;
    readonly remove: EventEmitter<void>;
    get canAdd(): boolean;
    get canRemove(): boolean;
    static ngAcceptInputType_readonly: BooleanInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfRepStrip, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfRepStrip, "ajf-rep-strip", never, { "slide": { "alias": "slide"; "required": false; }; "current": { "alias": "current"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; }, { "goTo": "goTo"; "add": "add"; "remove": "remove"; }, never, never, false, never>;
}
//# sourceMappingURL=rep-strip.d.ts.map