import * as i1 from '@ajf/core/checkbox-group';
import { AjfCheckboxGroupItem, AjfCheckboxGroupModule as AjfCheckboxGroupModule$1 } from '@ajf/core/checkbox-group';
import * as i0 from '@angular/core';
import { ViewEncapsulation, ChangeDetectionStrategy, Component, Optional, NgModule } from '@angular/core';
import * as i2 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i3 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';

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
const _c0 = ["*"];
class CheckboxGroupItem extends AjfCheckboxGroupItem {
    constructor(
    // `AjfCheckboxGroupItem` is commonly used in combination with a `AjfCheckboxGroup`.
    // tslint:disable-next-line: lightweight-tokens
    checkboxGroup) {
        super(checkboxGroup);
        this.checkedIcon = 'check_box';
        this.notCheckedIcon = 'check_box_outline_blank';
    }
    static { this.ɵfac = function CheckboxGroupItem_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CheckboxGroupItem)(i0.ɵɵdirectiveInject(i1.AjfCheckboxGroup, 8)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CheckboxGroupItem, selectors: [["ajf-checkbox-group-item"]], hostVars: 5, hostBindings: function CheckboxGroupItem_HostBindings(rf, ctx) { if (rf & 2) {
            i0.ɵɵattribute("id", ctx.id);
            i0.ɵɵclassProp("ajf-checkbox-group-checked", ctx.checked)("ajf-checkbox-group-disable", ctx.disabled);
        } }, features: [i0.ɵɵInheritDefinitionFeature], ngContentSelectors: _c0, decls: 10, vars: 16, consts: [["mat-button", "", "type", "button", 3, "click", "id"], [1, "ajf-checkbox-group-content"]], template: function CheckboxGroupItem_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef();
            i0.ɵɵelementStart(0, "button", 0);
            i0.ɵɵpipe(1, "async");
            i0.ɵɵpipe(2, "async");
            i0.ɵɵpipe(3, "async");
            i0.ɵɵpipe(4, "async");
            i0.ɵɵlistener("click", function CheckboxGroupItem_Template_button_click_0_listener($event) { return ctx.onInputChange($event); });
            i0.ɵɵelementStart(5, "mat-icon");
            i0.ɵɵtext(6);
            i0.ɵɵpipe(7, "async");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "span", 1);
            i0.ɵɵprojection(9);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵclassProp("ajf-checked", i0.ɵɵpipeBind1(1, 6, ctx.checkedState));
            i0.ɵɵproperty("id", i0.ɵɵpipeBind1(2, 8, ctx.checkboxId));
            i0.ɵɵattribute("aria-checked", i0.ɵɵpipeBind1(3, 10, ctx.checkedState))("aria-disabled", i0.ɵɵpipeBind1(4, 12, ctx.disabledState));
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 14, ctx.icon));
        } }, dependencies: [i2.MatButton, i3.MatIcon, i4.AsyncPipe], styles: ["ajf-checkbox-group-item{display:inline-flex}ajf-checkbox-group-item .mat-mdc-button{display:inline-flex;align-items:center;justify-content:flex-start;gap:8px;box-sizing:border-box;min-width:0;min-height:var(--ajf-control-h, 44px);padding:0 14px;border:1px solid var(--ajf-border-strong, #d5cfc6);border-radius:var(--ajf-radius, 4px);background:var(--ajf-surface, #fff);color:var(--ajf-text, #1c1a17);font-size:14px;letter-spacing:normal}ajf-checkbox-group-item .mat-mdc-button:hover{border-color:var(--ajf-accent, #0f4c5c)}ajf-checkbox-group-item .mat-mdc-button .mat-icon{width:18px;height:18px;margin:0;color:var(--ajf-text-faint, #a49c92);font-size:18px}ajf-checkbox-group-item .mat-mdc-button.ajf-checked{border-color:var(--ajf-accent, #0f4c5c);background:var(--ajf-accent-soft, #e8f1f5);color:var(--ajf-accent, #0f4c5c)}ajf-checkbox-group-item .mat-mdc-button.ajf-checked .mat-icon{color:var(--ajf-accent, #0f4c5c)}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CheckboxGroupItem, [{
        type: Component,
        args: [{ selector: 'ajf-checkbox-group-item', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                    '[attr.id]': 'id',
                    '[class.ajf-checkbox-group-checked]': 'checked',
                    '[class.ajf-checkbox-group-disable]': 'disabled',
                }, template: "<button\n  mat-button\n  (click)=\"onInputChange($event)\"\n  type=\"button\"\n  [id]=\"checkboxId | async\"\n  [class.ajf-checked]=\"checkedState | async\"\n  [attr.aria-checked]=\"checkedState | async\"\n  [attr.aria-disabled]=\"disabledState | async\"\n>\n  <mat-icon>{{ icon | async }}</mat-icon>\n  <span class=\"ajf-checkbox-group-content\">\n    <ng-content></ng-content>\n  </span>\n</button>\n", styles: ["ajf-checkbox-group-item{display:inline-flex}ajf-checkbox-group-item .mat-mdc-button{display:inline-flex;align-items:center;justify-content:flex-start;gap:8px;box-sizing:border-box;min-width:0;min-height:var(--ajf-control-h, 44px);padding:0 14px;border:1px solid var(--ajf-border-strong, #d5cfc6);border-radius:var(--ajf-radius, 4px);background:var(--ajf-surface, #fff);color:var(--ajf-text, #1c1a17);font-size:14px;letter-spacing:normal}ajf-checkbox-group-item .mat-mdc-button:hover{border-color:var(--ajf-accent, #0f4c5c)}ajf-checkbox-group-item .mat-mdc-button .mat-icon{width:18px;height:18px;margin:0;color:var(--ajf-text-faint, #a49c92);font-size:18px}ajf-checkbox-group-item .mat-mdc-button.ajf-checked{border-color:var(--ajf-accent, #0f4c5c);background:var(--ajf-accent-soft, #e8f1f5);color:var(--ajf-accent, #0f4c5c)}ajf-checkbox-group-item .mat-mdc-button.ajf-checked .mat-icon{color:var(--ajf-accent, #0f4c5c)}\n"] }]
    }], () => [{ type: i1.AjfCheckboxGroup, decorators: [{
                type: Optional
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CheckboxGroupItem, { className: "CheckboxGroupItem", filePath: "checkbox-group-item.ts", lineNumber: 41 }); })();

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
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule, AjfCheckboxGroupModule$1, MatButtonModule, MatIconModule, AjfCheckboxGroupModule$1] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfCheckboxGroupModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, AjfCheckboxGroupModule$1, MatButtonModule, MatIconModule],
                declarations: [CheckboxGroupItem],
                exports: [CheckboxGroupItem, AjfCheckboxGroupModule$1],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AjfCheckboxGroupModule, { declarations: [CheckboxGroupItem], imports: [CommonModule, AjfCheckboxGroupModule$1, MatButtonModule, MatIconModule], exports: [CheckboxGroupItem, AjfCheckboxGroupModule$1] }); })();

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

export { AjfCheckboxGroupModule, CheckboxGroupItem };
//# sourceMappingURL=ajf-material-checkbox-group.mjs.map
