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
export declare class ApplyStylesDirective {
    private _el;
    private _renderer;
    private _cssStyles;
    set applyStyles(cssStyles: {
        [style: string]: any;
    } | null);
    constructor(_el: ElementRef, _renderer: Renderer2);
    private _updateStyles;
    static ɵfac: i0.ɵɵFactoryDeclaration<ApplyStylesDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ApplyStylesDirective, "[applyStyles]", never, { "applyStyles": { "alias": "applyStyles"; "required": false; }; }, {}, never, never, false, never>;
}
//# sourceMappingURL=apply-styles-directive.d.ts.map