import { AjfNodeType, AjfFieldType } from '@ajf/core/forms';
import * as i0 from '@angular/core';
import { Directive, Input } from '@angular/core';

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
class AjfNodeIcon {
    constructor() {
        this._fontSet = '';
        this._fontIcon = '';
    }
    get fontSet() {
        return this._fontSet;
    }
    get fontIcon() {
        return this._fontIcon;
    }
    get node() {
        return this._node;
    }
    set node(node) {
        this._node = node;
        this._fontSet = 'ajf-icon';
        this._fontIcon = this._getFontIcon(node);
    }
    _getFontIcon(node) {
        if (node == null) {
            return '';
        }
        switch (node.nodeType) {
            case AjfNodeType.AjfField:
                const fieldType = AjfFieldType[node.fieldType];
                return fieldType != null ? `field-${fieldType.toLowerCase()}` : '';
            default:
                const nodeType = AjfNodeType[node.nodeType];
                return nodeType != null ? `node-${nodeType.toLowerCase().replace('ajf', '')}` : '';
        }
    }
    static { this.ɵfac = function AjfNodeIcon_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfNodeIcon)(); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AjfNodeIcon, inputs: { node: "node" } }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfNodeIcon, [{
        type: Directive
    }], null, { node: [{
            type: Input
        }] }); })();

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

/**
 * Generated bundle index. Do not edit.
 */

export { AjfNodeIcon };
//# sourceMappingURL=ajf-core-node-icon.mjs.map
