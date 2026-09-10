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
import { AjfFormBuilderNodeTypeEntry } from './form-builder-service';
import * as i0 from "@angular/core";
export declare class AjfFbNodeTypeEntry {
    private _cdr;
    private _nodeType;
    get nodeType(): AjfFormBuilderNodeTypeEntry | undefined;
    set nodeType(nodeType: AjfFormBuilderNodeTypeEntry | undefined);
    get node(): any;
    constructor(_cdr: ChangeDetectorRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFbNodeTypeEntry, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfFbNodeTypeEntry, "ajf-fb-node-type-entry", never, { "nodeType": { "alias": "nodeType"; "required": false; }; }, {}, never, never, false, never>;
}
//# sourceMappingURL=node-type-entry.d.ts.map