import * as i0 from '@angular/core';
import { EventEmitter, Directive, Output } from '@angular/core';

class AjfAudio {
    get value() {
        return this._value;
    }
    set value(val) {
        if (this._value !== val) {
            this._value = val;
            this._cdr.markForCheck();
            this._onChangeCallback(val);
            this.valueChange.emit(val);
        }
    }
    constructor(_cdr) {
        this._cdr = _cdr;
        this.valueChange = new EventEmitter();
        this._value = null;
        this._onChangeCallback = (_) => { };
        this._onTouchedCallback = () => { };
    }
    writeValue(value) {
        this._value = value;
        this._cdr.markForCheck();
    }
    registerOnChange(fn) {
        this._onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this._onTouchedCallback = fn;
    }
    static { this.ɵfac = function AjfAudio_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfAudio)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AjfAudio, outputs: { valueChange: "valueChange" } }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfAudio, [{
        type: Directive
    }], () => [{ type: i0.ChangeDetectorRef }], { valueChange: [{
            type: Output
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

export { AjfAudio };
//# sourceMappingURL=ajf-core-audio.mjs.map
