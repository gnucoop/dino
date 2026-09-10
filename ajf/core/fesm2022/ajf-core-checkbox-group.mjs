import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { forwardRef, EventEmitter, Directive, Output, Input, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

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
const AJF_CHECKBOX_GROUP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AjfCheckboxGroup),
    multi: true,
};
let _uniqueIdCounter = 0;
class AjfCheckboxGroup {
    constructor() {
        this.checkboxes = [];
        /** The value for the button toggle group. Should match currently selected button toggle. */
        this._value = [];
        /** The HTML name attribute applied to toggles in this group. */
        this._name = '';
        /** Disables all toggles in the group. */
        this._disabled = false;
        /** The currently selected button toggle, should match the value. */
        this._selected = [];
        /** Event emitted when the group's value changes. */
        this._change = new EventEmitter();
        this.change = this._change;
        /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
        this.onTouched = () => { };
        /** The method to be called in order to update ngModel. */
        this._controlValueAccessorChangeFn = _ => { };
    }
    get value() {
        return this._value;
    }
    set value(newValue) {
        if (this._value !== newValue) {
            this._value = newValue;
            this._updateSelectedCheckboxesFromValue();
            this._emitChangeEvent();
        }
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
        this._updateCheckboxesNames();
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    get selected() {
        return this._selected;
    }
    set selected(selected) {
        this._selected = selected;
        let values = [];
        if (selected) {
            selected.forEach(c => {
                if (c.value) {
                    values.push(c.value);
                    if (!c.checked) {
                        c.checked = true;
                    }
                }
            });
        }
        this._value = values;
    }
    /**
     * Implemented as part of ControlValueAccessor.
     */
    writeValue(value) {
        this.value = value;
    }
    /**
     * Implemented as part of ControlValueAccessor.
     */
    registerOnChange(fn) {
        this._controlValueAccessorChangeFn = fn;
    }
    /**
     * Implemented as part of ControlValueAccessor.
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    addValue(value) {
        let curValue = (this._value || []).slice(0);
        if (curValue.indexOf(value) === -1) {
            curValue.push(value);
            this.value = curValue;
        }
    }
    removeValue(value) {
        let curValue = (this._value || []).slice(0);
        let idx = curValue.indexOf(value);
        if (idx > -1) {
            curValue.splice(idx, 1);
            this.value = curValue;
        }
    }
    ngAfterContentInit() {
        this._updateCheckboxesNames();
        this._updateSelectedCheckboxesFromValue();
    }
    registerItem(item) {
        this.checkboxes.push(item);
    }
    _updateCheckboxesNames() {
        if (this.checkboxes == null) {
            return;
        }
        this.checkboxes.forEach(checkbox => {
            if (checkbox == null) {
                return;
            }
            checkbox.name = this._name;
        });
    }
    _updateSelectedCheckboxesFromValue() {
        if (this.checkboxes == null) {
            return;
        }
        this.checkboxes.forEach(checkbox => {
            if (checkbox == null) {
                return;
            }
            if (checkbox.value && (this._value || []).indexOf(checkbox.value) > -1) {
                checkbox.checked = true;
            }
            else {
                checkbox.checked = false;
            }
        });
    }
    /** Dispatch change event with current selection and group value. */
    _emitChangeEvent() {
        const event = {
            source: this,
            value: this._value,
        };
        this._controlValueAccessorChangeFn(event.value);
        this._change.emit(event);
    }
    static { this.ɵfac = function AjfCheckboxGroup_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfCheckboxGroup)(); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AjfCheckboxGroup, selectors: [["ajf-checkbox-group"], ["", "ajf-checkbox-group", ""]], inputs: { value: "value", name: "name", disabled: "disabled" }, outputs: { change: "change" }, features: [i0.ɵɵProvidersFeature([AJF_CHECKBOX_GROUP_VALUE_ACCESSOR])] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfCheckboxGroup, [{
        type: Directive,
        args: [{
                // eslint-disable-next-line
                selector: 'ajf-checkbox-group,[ajf-checkbox-group]',
                providers: [AJF_CHECKBOX_GROUP_VALUE_ACCESSOR],
            }]
    }], null, { value: [{
            type: Input
        }], name: [{
            type: Input
        }], disabled: [{
            type: Input
        }], change: [{
            type: Output
        }] }); })();
class AjfCheckboxGroupItem {
    set id(id) {
        this._checkboxId.next(id);
    }
    get checked() {
        return this._checkedState.getValue();
    }
    set checked(checked) {
        this._checkedState.next(checked);
    }
    get disabled() {
        const disabled = this._disabledState.getValue();
        return disabled || (this.checkboxGroup != null && this.checkboxGroup.disabled);
    }
    set disabled(disabled) {
        this._disabledState.next(disabled != null && disabled !== false);
    }
    get value() {
        return this._value;
    }
    set value(value) {
        if (this._value !== value) {
            this._value = value;
        }
    }
    get checkedIcon() {
        return this._checkedIconVal.getValue();
    }
    set checkedIcon(icon) {
        this._checkedIconVal.next(icon);
    }
    get notCheckedIcon() {
        return this._notCheckedIconVal.getValue();
    }
    set notCheckedIcon(icon) {
        this._notCheckedIconVal.next(icon);
    }
    constructor(checkboxGroup) {
        /** The unique ID for this button toggle. */
        this._checkboxId = new BehaviorSubject('');
        this.checkboxId = this._checkboxId;
        this.name = '';
        /** Whether or not this button toggle is checked. */
        this._checkedState = new BehaviorSubject(false);
        this.checkedState = this._checkedState;
        /** Whether or not this button toggle is disabled. */
        this._disabledState = new BehaviorSubject(false);
        this.disabledState = this._disabledState;
        this._checkedIconVal = new BehaviorSubject('');
        this._notCheckedIconVal = new BehaviorSubject('');
        /** Event emitted when the group value changes. */
        this._change = new EventEmitter();
        this.change = this._change;
        this.icon = combineLatest([
            this._checkedState,
            this._checkedIconVal,
            this._notCheckedIconVal,
        ]).pipe(map(([checked, checkedIcon, notCheckedIcon]) => (checked ? checkedIcon : notCheckedIcon)));
        if (checkboxGroup) {
            this.checkboxGroup = checkboxGroup;
            this.checkboxGroup.registerItem(this);
        }
    }
    ngOnInit() {
        if (this.id == null) {
            this.id = `ajf-checkbox-group-item-${_uniqueIdCounter++}`;
        }
        if (this.checkboxGroup &&
            this.checkboxGroup.value &&
            this._value &&
            this.checkboxGroup.value.indexOf(this._value) > -1) {
            this.checked = true;
        }
    }
    /** Checks the button toggle due to an interaction with the underlying native input. */
    onInputChange(event) {
        event.stopPropagation();
        this._toggle();
    }
    /** Toggle the state of the current button toggle. */
    _toggle() {
        this.checked = !this.checked;
        if (this.checkboxGroup != null && this._value) {
            if (this.checked) {
                this.checkboxGroup.addValue(this._value);
            }
            else {
                this.checkboxGroup.removeValue(this._value);
            }
        }
    }
    static { this.ɵfac = function AjfCheckboxGroupItem_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfCheckboxGroupItem)(i0.ɵɵdirectiveInject(AjfCheckboxGroup)); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AjfCheckboxGroupItem, inputs: { id: "id", name: "name", checked: "checked", disabled: "disabled", value: "value", checkedIcon: "checkedIcon", notCheckedIcon: "notCheckedIcon" }, outputs: { change: "change" } }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfCheckboxGroupItem, [{
        type: Directive
    }], () => [{ type: AjfCheckboxGroup }], { id: [{
            type: Input
        }], name: [{
            type: Input
        }], checked: [{
            type: Input
        }], disabled: [{
            type: Input
        }], value: [{
            type: Input
        }], checkedIcon: [{
            type: Input
        }], notCheckedIcon: [{
            type: Input
        }], change: [{
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
class AjfCheckboxGroupModule {
    static { this.ɵfac = function AjfCheckboxGroupModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfCheckboxGroupModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfCheckboxGroupModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [FormsModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfCheckboxGroupModule, [{
        type: NgModule,
        args: [{
                imports: [FormsModule],
                declarations: [AjfCheckboxGroup],
                exports: [AjfCheckboxGroup],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AjfCheckboxGroupModule, { declarations: [AjfCheckboxGroup], imports: [FormsModule], exports: [AjfCheckboxGroup] }); })();

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

export { AJF_CHECKBOX_GROUP_VALUE_ACCESSOR, AjfCheckboxGroup, AjfCheckboxGroupItem, AjfCheckboxGroupModule };
//# sourceMappingURL=ajf-core-checkbox-group.mjs.map
