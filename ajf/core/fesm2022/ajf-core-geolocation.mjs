import * as i0 from '@angular/core';
import { EventEmitter, isDevMode, Directive, Input } from '@angular/core';
import { Subscription } from 'rxjs';

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
class AjfGeolocationModel {
    constructor() {
        this._changed = new EventEmitter();
        this.changed = this._changed;
        this._latitude = '';
        this._longitude = '';
    }
    get longitude() {
        return this._longitude;
    }
    set longitude(value) {
        if (value) {
            this._longitude = value.toString().replace(',', '.');
            this._changed.emit(this.toString());
        }
    }
    get latitude() {
        return this._latitude;
    }
    set latitude(value) {
        if (value) {
            this._latitude = value.toString().replace(',', '.');
            this._changed.emit(this.toString());
        }
    }
    toString() {
        return `${this.latitude},${this.longitude}`;
    }
    fromString(value) {
        try {
            let splitted = value.toString().split(',');
            if (splitted.length == 2) {
                this.latitude = splitted[0];
                this.longitude = splitted[1];
            }
        }
        catch (e) {
            if (isDevMode()) {
                console.log(e);
            }
        }
    }
}

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
class AjfGeolocation {
    get geolocation() {
        return this._value;
    }
    get value() {
        return this._value.toString();
    }
    set value(value) {
        if (value !== this._value.toString()) {
            this._value.fromString(value);
            this._onChangeCallback(value);
        }
    }
    get latitude() {
        return this._value.latitude;
    }
    set latitude(latitude) {
        this._value.latitude = latitude;
        this._cdr.detectChanges();
        this._onChangeCallback(this._value.toString());
    }
    get longitude() {
        return this._value.longitude;
    }
    set longitude(longitude) {
        this._value.longitude = longitude;
        this._cdr.detectChanges();
        this._onChangeCallback(this._value.toString());
    }
    constructor(_cdr) {
        this._cdr = _cdr;
        this.readonly = false;
        this._value = new AjfGeolocationModel();
        this._onChangeCallback = (_) => { };
        this._onTouchedCallback = () => { };
        this._valueChangeSub = Subscription.EMPTY;
        this._valueChangeSub = this._value.changed.subscribe((x) => {
            this._onChangeCallback(x);
        });
    }
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                if (position) {
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                }
            }, error => console.log(error));
        }
        else {
            console.log('Geolocation is not supported by this device or browser.');
        }
    }
    ngOnDestroy() {
        this._valueChangeSub.unsubscribe();
    }
    writeValue(value) {
        this._value.fromString(value);
    }
    registerOnChange(fn) {
        this._onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this._onTouchedCallback = fn;
    }
    focusHandler() {
        this._onTouchedCallback();
    }
    static { this.ɵfac = function AjfGeolocation_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfGeolocation)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AjfGeolocation, inputs: { readonly: "readonly" } }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfGeolocation, [{
        type: Directive
    }], () => [{ type: i0.ChangeDetectorRef }], { readonly: [{
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

export { AjfGeolocation };
//# sourceMappingURL=ajf-core-geolocation.mjs.map
