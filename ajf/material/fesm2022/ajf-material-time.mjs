import * as i0 from '@angular/core';
import { forwardRef, ChangeDetectionStrategy, ViewEncapsulation, Component, NgModule } from '@angular/core';
import * as i2 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as i3 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AjfTime as AjfTime$1 } from '@ajf/core/time';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i4 from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import * as i5 from '@angular/material/core';

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
function AjfTime_mat_option_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 6);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "number");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const h_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", h_r1);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(2, 2, h_r1, "2.0"), " ");
} }
function AjfTime_mat_option_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 6);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "number");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const m_r2 = ctx.$implicit;
    i0.ɵɵproperty("value", m_r2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(2, 2, m_r2, "2.0"), " ");
} }
const AJF_TIME_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AjfTime),
    multi: true,
};
class AjfTime extends AjfTime$1 {
    constructor() {
        super();
        this.hoursList = Array.from({ length: 24 }, (_, i) => i);
        this.minutesList = Array.from({ length: 60 }, (_, i) => i);
    }
    static { this.ɵfac = function AjfTime_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfTime)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfTime, selectors: [["ajf-time"]], features: [i0.ɵɵProvidersFeature([AJF_TIME_CONTROL_VALUE_ACCESSOR]), i0.ɵɵInheritDefinitionFeature], decls: 9, vars: 4, consts: [[1, "ajf-time"], ["placeholder", "HH", 1, "ajf-time-select", 3, "ngModelChange", "opened", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], [1, "ajf-time-sep"], ["placeholder", "MM", 1, "ajf-time-select", 3, "ngModelChange", "opened", "ngModel"], [1, "ajf-time-icon"], [3, "value"]], template: function AjfTime_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "mat-select", 1);
            i0.ɵɵtwoWayListener("ngModelChange", function AjfTime_Template_mat_select_ngModelChange_1_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.hours, $event) || (ctx.hours = $event); return $event; });
            i0.ɵɵlistener("opened", function AjfTime_Template_mat_select_opened_1_listener() { return ctx.focusHandler(); });
            i0.ɵɵtemplate(2, AjfTime_mat_option_2_Template, 3, 5, "mat-option", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "span", 3);
            i0.ɵɵtext(4, ":");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "mat-select", 4);
            i0.ɵɵtwoWayListener("ngModelChange", function AjfTime_Template_mat_select_ngModelChange_5_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.minutes, $event) || (ctx.minutes = $event); return $event; });
            i0.ɵɵlistener("opened", function AjfTime_Template_mat_select_opened_5_listener() { return ctx.focusHandler(); });
            i0.ɵɵtemplate(6, AjfTime_mat_option_6_Template, 3, 5, "mat-option", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "mat-icon", 5);
            i0.ɵɵtext(8, "schedule");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵtwoWayProperty("ngModel", ctx.hours);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.hoursList);
            i0.ɵɵadvance(3);
            i0.ɵɵtwoWayProperty("ngModel", ctx.minutes);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.minutesList);
        } }, dependencies: [i1.NgForOf, i2.NgControlStatus, i2.NgModel, i3.MatIcon, i4.MatSelect, i5.MatOption, i1.DecimalPipe], styles: ["ajf-time{display:block}ajf-time .ajf-time{display:inline-flex;align-items:center;gap:2px;box-sizing:border-box;min-height:var(--ajf-control-h, 44px);padding:0 10px;border:1px solid var(--ajf-border-strong, #d5cfc6);border-radius:var(--ajf-radius, 4px);background:var(--ajf-surface, #fff)}ajf-time .ajf-time:focus-within{border-color:var(--ajf-accent, #0f4c5c)}ajf-time .ajf-time-sep{color:var(--ajf-text, #1c1a17);font-family:var(--ajf-font-mono, monospace)}ajf-time .ajf-time-icon{width:18px;height:18px;margin-left:6px;color:var(--ajf-text-muted, #7a736a);font-size:18px}ajf-time .mat-mdc-select.ajf-time-select{width:2.6em;min-width:0;padding:0;border:0;background:none;box-shadow:none;font-family:var(--ajf-font-mono, monospace)}ajf-time .mat-mdc-select.ajf-time-select .mat-mdc-select-arrow-wrapper{display:none}ajf-time .mat-mdc-select.ajf-time-select .mat-mdc-select-value{font-family:var(--ajf-font-mono, monospace);text-align:center}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfTime, [{
        type: Component,
        args: [{ selector: 'ajf-time', providers: [AJF_TIME_CONTROL_VALUE_ACCESSOR], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ajf-time\">\n  <mat-select\n    class=\"ajf-time-select\"\n    [(ngModel)]=\"hours\"\n    (opened)=\"focusHandler()\"\n    placeholder=\"HH\"\n  >\n    <mat-option *ngFor=\"let h of hoursList\" [value]=\"h\"> {{ h | number : '2.0' }} </mat-option>\n  </mat-select>\n  <span class=\"ajf-time-sep\">:</span>\n  <mat-select\n    class=\"ajf-time-select\"\n    [(ngModel)]=\"minutes\"\n    (opened)=\"focusHandler()\"\n    placeholder=\"MM\"\n  >\n    <mat-option *ngFor=\"let m of minutesList\" [value]=\"m\"> {{ m | number : '2.0' }} </mat-option>\n  </mat-select>\n  <mat-icon class=\"ajf-time-icon\">schedule</mat-icon>\n</div>\n", styles: ["ajf-time{display:block}ajf-time .ajf-time{display:inline-flex;align-items:center;gap:2px;box-sizing:border-box;min-height:var(--ajf-control-h, 44px);padding:0 10px;border:1px solid var(--ajf-border-strong, #d5cfc6);border-radius:var(--ajf-radius, 4px);background:var(--ajf-surface, #fff)}ajf-time .ajf-time:focus-within{border-color:var(--ajf-accent, #0f4c5c)}ajf-time .ajf-time-sep{color:var(--ajf-text, #1c1a17);font-family:var(--ajf-font-mono, monospace)}ajf-time .ajf-time-icon{width:18px;height:18px;margin-left:6px;color:var(--ajf-text-muted, #7a736a);font-size:18px}ajf-time .mat-mdc-select.ajf-time-select{width:2.6em;min-width:0;padding:0;border:0;background:none;box-shadow:none;font-family:var(--ajf-font-mono, monospace)}ajf-time .mat-mdc-select.ajf-time-select .mat-mdc-select-arrow-wrapper{display:none}ajf-time .mat-mdc-select.ajf-time-select .mat-mdc-select-value{font-family:var(--ajf-font-mono, monospace);text-align:center}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfTime, { className: "AjfTime", filePath: "time.ts", lineNumber: 47 }); })();

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
class AjfTimeModule {
    static { this.ɵfac = function AjfTimeModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfTimeModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfTimeModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule,
            FormsModule,
            MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            MatSelectModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfTimeModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    MatFormFieldModule,
                    MatIconModule,
                    MatInputModule,
                    MatSelectModule,
                ],
                declarations: [AjfTime],
                exports: [AjfTime],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AjfTimeModule, { declarations: [AjfTime], imports: [CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule], exports: [AjfTime] }); })();

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

export { AJF_TIME_CONTROL_VALUE_ACCESSOR, AjfTime, AjfTimeModule };
//# sourceMappingURL=ajf-material-time.mjs.map
