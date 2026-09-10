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
import { ElementRef, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare class AjfFbBranchLine {
    private _el;
    private _renderer;
    private _offset;
    set offset(offset: number);
    private _color;
    set color(color: string);
    private _height;
    set height(height: number);
    constructor(_el: ElementRef, _renderer: Renderer2);
    private _updateHeight;
    private _updateOffset;
    private _updateColor;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFbBranchLine, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfFbBranchLine, "ajf-fb-branch-line", never, { "offset": { "alias": "offset"; "required": false; }; "color": { "alias": "color"; "required": false; }; "height": { "alias": "height"; "required": false; }; }, {}, never, never, false, never>;
}
//# sourceMappingURL=branch-line.d.ts.map