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
import { TranslocoService } from '@ajf/core/transloco';
import { ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as i0 from "@angular/core";
/**
 * this component manages the report text
 *
 * @export
 */
export declare class AjfTextComponent {
    private _cdr;
    private _domSanitizer;
    private _ts;
    /**
     * @memberOf TextComponent
     */
    private _htmlText;
    set htmlText(htmlText: string);
    get innerHTML(): SafeHtml | undefined;
    constructor(_cdr: ChangeDetectorRef, _domSanitizer: DomSanitizer, _ts: TranslocoService);
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfTextComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfTextComponent, "ajf-text", never, { "htmlText": { "alias": "htmlText"; "required": false; }; }, {}, never, never, false, never>;
}
//# sourceMappingURL=text.d.ts.map