import * as i1 from '@ajf/core/calendar';
import { AjfCalendar, AjfCalendarModule as AjfCalendarModule$1 } from '@ajf/core/calendar';
import * as i0 from '@angular/core';
import { forwardRef, ChangeDetectionStrategy, ViewEncapsulation, Component, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i4 from '@ngneat/transloco';
import { AjfTranslocoModule } from '@ajf/core/transloco';

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
function AjfCalendarComponent_div_8_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const calendarHeader_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, calendarHeader_r1), " ");
} }
function AjfCalendarComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵtemplate(1, AjfCalendarComponent_div_8_div_1_Template, 3, 3, "div", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.calendarHeaders);
} }
function AjfCalendarComponent_div_9_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 8);
    i0.ɵɵlistener("click", function AjfCalendarComponent_div_9_button_1_Template_button_click_0_listener() { const entry_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.selectEntry(entry_r4)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "ajfCalendarEntryLabel");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entry_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("ajf-calendar-partial-selection", entry_r4.selected === "partial");
    i0.ɵɵproperty("disabled", ctx_r1.disabled || (entry_r4.disabled || false))("color", entry_r4.selected !== "none" ? "warn" : undefined);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 5, entry_r4));
} }
function AjfCalendarComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵtemplate(1, AjfCalendarComponent_div_9_button_1_Template, 3, 7, "button", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r5 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", row_r5);
} }
const CALENDAR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AjfCalendarComponent),
    multi: true,
};
/**
 * Ajf calendar component.
 */
class AjfCalendarComponent extends AjfCalendar {
    constructor(cdr, service) {
        super(cdr, service);
    }
    static { this.ɵfac = function AjfCalendarComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfCalendarComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.AjfCalendarService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfCalendarComponent, selectors: [["ajf-calendar"]], features: [i0.ɵɵProvidersFeature([CALENDAR_CONTROL_VALUE_ACCESSOR]), i0.ɵɵInheritDefinitionFeature], decls: 10, vars: 5, consts: [[1, "ajf-calendar-header"], ["mat-mini-fab", "", 3, "click"], ["mat-button", "", 1, "ajf-calendar-header-title", 3, "click"], ["class", "ajf-calendar-row", 4, "ngIf"], ["class", "ajf-calendar-row", 4, "ngFor", "ngForOf"], [1, "ajf-calendar-row"], [4, "ngFor", "ngForOf"], ["mat-raised-button", "", 3, "ajf-calendar-partial-selection", "disabled", "color", "click", 4, "ngFor", "ngForOf"], ["mat-raised-button", "", 3, "click", "disabled", "color"]], template: function AjfCalendarComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "button", 1);
            i0.ɵɵlistener("click", function AjfCalendarComponent_Template_button_click_1_listener() { return ctx.prevPage(); });
            i0.ɵɵtext(2, "\u2190");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "button", 2);
            i0.ɵɵlistener("click", function AjfCalendarComponent_Template_button_click_3_listener() { return ctx.previousViewMode(); });
            i0.ɵɵtext(4);
            i0.ɵɵpipe(5, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "button", 1);
            i0.ɵɵlistener("click", function AjfCalendarComponent_Template_button_click_6_listener() { return ctx.nextPage(); });
            i0.ɵɵtext(7, "\u2192");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(8, AjfCalendarComponent_div_8_Template, 2, 1, "div", 3)(9, AjfCalendarComponent_div_9_Template, 2, 1, "div", 4);
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(5, 3, ctx.viewHeader), " ");
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", ctx.calendarHeaders.length > 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.calendarRows);
        } }, dependencies: [i2.NgForOf, i2.NgIf, i3.MatButton, i3.MatMiniFabButton, i1.AjfCalendarEntryLabelPipe, i4.TranslocoPipe], styles: ["ajf-calendar{display:flex;box-sizing:border-box;width:100%;max-width:420px;height:320px;flex-direction:column;padding:8px;border:1px solid var(--ajf-border-strong, #d5cfc6);border-radius:var(--ajf-radius, 4px);background:var(--ajf-surface, #fff);font-family:var(--ajf-font-sans, sans-serif)}ajf-calendar .ajf-calendar-header,ajf-calendar .ajf-calendar-row{display:flex;box-sizing:border-box;width:100%;flex-direction:row}ajf-calendar .ajf-calendar-header{height:40px;align-items:center}ajf-calendar .ajf-calendar-header .ajf-calendar-header-title{flex:1;margin:0 10px;color:var(--ajf-text, #1c1a17);font-weight:600}ajf-calendar .ajf-calendar-header .mat-mdc-mini-fab{width:32px;height:32px;box-shadow:none;background:var(--ajf-band, #faf8f5);color:var(--ajf-text-muted, #7a736a)}ajf-calendar .ajf-calendar-row{flex:1}ajf-calendar .ajf-calendar-row button,ajf-calendar .ajf-calendar-row div{flex:1;margin:3px}ajf-calendar .ajf-calendar-row div{line-height:40px;text-align:center}ajf-calendar .ajf-calendar-row:first-of-type div{color:var(--ajf-text-muted, #7a736a);font-family:var(--ajf-font-mono, monospace);font-size:11px;letter-spacing:.06em;text-transform:uppercase}ajf-calendar .ajf-calendar-row .mat-mdc-raised-button{min-width:0;padding:0;border:1px solid transparent;border-radius:var(--ajf-radius, 4px);box-shadow:none;background:var(--ajf-surface, #fff);color:var(--ajf-text, #1c1a17);font-family:var(--ajf-font-mono, monospace);font-size:13px}ajf-calendar .ajf-calendar-row .mat-mdc-raised-button:hover:not([disabled]){background:var(--ajf-band, #faf8f5)}ajf-calendar .ajf-calendar-row .mat-mdc-raised-button[disabled]{color:var(--ajf-text-faint, #a49c92)}ajf-calendar .ajf-calendar-row .mat-mdc-raised-button.mat-warn{background:var(--ajf-accent, #0f4c5c);color:var(--ajf-accent-fg, #fff)}ajf-calendar .ajf-calendar-row .ajf-calendar-partial-selection :before{content:\"\";position:absolute;inset:0;background-color:color-mix(in srgb,var(--ajf-surface, #fff) 50%,transparent)}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfCalendarComponent, [{
        type: Component,
        args: [{ selector: 'ajf-calendar', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, providers: [CALENDAR_CONTROL_VALUE_ACCESSOR], template: "<div class=\"ajf-calendar-header\">\n  <button (click)=\"prevPage()\" mat-mini-fab>&#8592;</button>\n  <button (click)=\"previousViewMode()\" mat-button class=\"ajf-calendar-header-title\">\n    {{ viewHeader | transloco }}\n  </button>\n  <button (click)=\"nextPage()\" mat-mini-fab>&#8594;</button>\n</div>\n<div class=\"ajf-calendar-row\" *ngIf=\"calendarHeaders.length > 0\">\n  <div *ngFor=\"let calendarHeader of calendarHeaders\">\n    {{ calendarHeader | transloco }}\n  </div>\n</div>\n<div class=\"ajf-calendar-row\" *ngFor=\"let row of calendarRows\">\n  <button\n      *ngFor=\"let entry of row\"\n      mat-raised-button\n      [class.ajf-calendar-partial-selection]=\"entry.selected === 'partial'\"\n      [disabled]=\"disabled || (entry.disabled || false)\"\n      [color]=\"entry.selected !== 'none' ? 'warn' : undefined\"\n      (click)=\"selectEntry(entry)\"\n  >{{ entry|ajfCalendarEntryLabel }}</button>\n</div>\n", styles: ["ajf-calendar{display:flex;box-sizing:border-box;width:100%;max-width:420px;height:320px;flex-direction:column;padding:8px;border:1px solid var(--ajf-border-strong, #d5cfc6);border-radius:var(--ajf-radius, 4px);background:var(--ajf-surface, #fff);font-family:var(--ajf-font-sans, sans-serif)}ajf-calendar .ajf-calendar-header,ajf-calendar .ajf-calendar-row{display:flex;box-sizing:border-box;width:100%;flex-direction:row}ajf-calendar .ajf-calendar-header{height:40px;align-items:center}ajf-calendar .ajf-calendar-header .ajf-calendar-header-title{flex:1;margin:0 10px;color:var(--ajf-text, #1c1a17);font-weight:600}ajf-calendar .ajf-calendar-header .mat-mdc-mini-fab{width:32px;height:32px;box-shadow:none;background:var(--ajf-band, #faf8f5);color:var(--ajf-text-muted, #7a736a)}ajf-calendar .ajf-calendar-row{flex:1}ajf-calendar .ajf-calendar-row button,ajf-calendar .ajf-calendar-row div{flex:1;margin:3px}ajf-calendar .ajf-calendar-row div{line-height:40px;text-align:center}ajf-calendar .ajf-calendar-row:first-of-type div{color:var(--ajf-text-muted, #7a736a);font-family:var(--ajf-font-mono, monospace);font-size:11px;letter-spacing:.06em;text-transform:uppercase}ajf-calendar .ajf-calendar-row .mat-mdc-raised-button{min-width:0;padding:0;border:1px solid transparent;border-radius:var(--ajf-radius, 4px);box-shadow:none;background:var(--ajf-surface, #fff);color:var(--ajf-text, #1c1a17);font-family:var(--ajf-font-mono, monospace);font-size:13px}ajf-calendar .ajf-calendar-row .mat-mdc-raised-button:hover:not([disabled]){background:var(--ajf-band, #faf8f5)}ajf-calendar .ajf-calendar-row .mat-mdc-raised-button[disabled]{color:var(--ajf-text-faint, #a49c92)}ajf-calendar .ajf-calendar-row .mat-mdc-raised-button.mat-warn{background:var(--ajf-accent, #0f4c5c);color:var(--ajf-accent-fg, #fff)}ajf-calendar .ajf-calendar-row .ajf-calendar-partial-selection :before{content:\"\";position:absolute;inset:0;background-color:color-mix(in srgb,var(--ajf-surface, #fff) 50%,transparent)}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1.AjfCalendarService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfCalendarComponent, { className: "AjfCalendarComponent", filePath: "calendar.ts", lineNumber: 50 }); })();

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
class AjfCalendarModule {
    static { this.ɵfac = function AjfCalendarModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfCalendarModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfCalendarModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule, AjfCalendarModule$1, FormsModule, MatButtonModule, AjfTranslocoModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfCalendarModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, AjfCalendarModule$1, FormsModule, MatButtonModule, AjfTranslocoModule],
                declarations: [AjfCalendarComponent],
                exports: [AjfCalendarComponent],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AjfCalendarModule, { declarations: [AjfCalendarComponent], imports: [CommonModule, AjfCalendarModule$1, FormsModule, MatButtonModule, AjfTranslocoModule], exports: [AjfCalendarComponent] }); })();

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

export { AjfCalendarComponent, AjfCalendarModule, CALENDAR_CONTROL_VALUE_ACCESSOR };
//# sourceMappingURL=ajf-material-calendar.mjs.map
