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
import { AjfCalendar } from '@ajf/core/calendar';
import { ChangeDetectionStrategy, Component, forwardRef, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/core/calendar";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/button";
import * as i4 from "@ngneat/transloco";
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
export const CALENDAR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AjfCalendarComponent),
    multi: true,
};
/**
 * Ajf calendar component.
 */
export class AjfCalendarComponent extends AjfCalendar {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9jYWxlbmRhci9zcmMvY2FsZW5kYXIudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9jYWxlbmRhci9zcmMvY2FsZW5kYXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsV0FBVyxFQUFxQixNQUFNLG9CQUFvQixDQUFDO0FBQ25FLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFVBQVUsRUFDVixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7SUN0Qi9DLDJCQUFvRDtJQUNsRCxZQUNGOztJQUFBLGlCQUFNOzs7SUFESixjQUNGO0lBREUsd0VBQ0Y7OztJQUhGLDhCQUFpRTtJQUMvRCwyRUFBb0Q7SUFHdEQsaUJBQU07OztJQUg0QixjQUFrQjtJQUFsQixnREFBa0I7Ozs7SUFLbEQsaUNBT0M7SUFERyxxTkFBUyw0QkFBa0IsS0FBQztJQUMvQixZQUFpQzs7SUFBQSxpQkFBUzs7OztJQUp2QyxpRkFBcUU7SUFFckUsQUFEQSwwRUFBa0QsNERBQ007SUFFM0QsY0FBaUM7SUFBakMsb0RBQWlDOzs7SUFScEMsOEJBQStEO0lBQzdELGlGQU9DO0lBQ0gsaUJBQU07OztJQVBrQixjQUFNO0lBQU4sZ0NBQU07O0FEa0I5QixNQUFNLENBQUMsTUFBTSwrQkFBK0IsR0FBUTtJQUNsRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUM7SUFDbkQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBRUY7O0dBRUc7QUFTSCxNQUFNLE9BQU8sb0JBQXFCLFNBQVEsV0FBVztJQUNuRCxZQUFZLEdBQXNCLEVBQUUsT0FBMkI7UUFDN0QsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN0QixDQUFDO3FIQUhVLG9CQUFvQjtvRUFBcEIsb0JBQW9CLGtFQUZwQixDQUFDLCtCQUErQixDQUFDO1lDOUM1QyxBQURGLDhCQUFpQyxnQkFDVztZQUFsQyxpR0FBUyxjQUFVLElBQUM7WUFBYyxzQkFBTztZQUFBLGlCQUFTO1lBQzFELGlDQUFrRjtZQUExRSxpR0FBUyxzQkFBa0IsSUFBQztZQUNsQyxZQUNGOztZQUFBLGlCQUFTO1lBQ1QsaUNBQTBDO1lBQWxDLGlHQUFTLGNBQVUsSUFBQztZQUFjLHNCQUFPO1lBQ25ELEFBRG1ELGlCQUFTLEVBQ3REO1lBTU4sQUFMQSxxRUFBaUUsd0RBS0Y7O1lBVDNELGVBQ0Y7WUFERSxxRUFDRjtZQUc2QixlQUFnQztZQUFoQyxxREFBZ0M7WUFLakIsY0FBZTtZQUFmLDBDQUFlOzs7aUZEcUNoRCxvQkFBb0I7Y0FSaEMsU0FBUzsyQkFDRSxjQUFjLGlCQUdULGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU0sYUFDcEMsQ0FBQywrQkFBK0IsQ0FBQzs7a0ZBRWpDLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDYWxlbmRhciwgQWpmQ2FsZW5kYXJTZXJ2aWNlfSBmcm9tICdAYWpmL2NvcmUvY2FsZW5kYXInO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIGZvcndhcmRSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGNvbnN0IENBTEVOREFSX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEFqZkNhbGVuZGFyQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG4vKipcbiAqIEFqZiBjYWxlbmRhciBjb21wb25lbnQuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1jYWxlbmRhcicsXG4gIHRlbXBsYXRlVXJsOiAnY2FsZW5kYXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjYWxlbmRhci5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtDQUxFTkRBUl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmQ2FsZW5kYXJDb21wb25lbnQgZXh0ZW5kcyBBamZDYWxlbmRhciB7XG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHNlcnZpY2U6IEFqZkNhbGVuZGFyU2VydmljZSkge1xuICAgIHN1cGVyKGNkciwgc2VydmljZSk7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJhamYtY2FsZW5kYXItaGVhZGVyXCI+XG4gIDxidXR0b24gKGNsaWNrKT1cInByZXZQYWdlKClcIiBtYXQtbWluaS1mYWI+JiM4NTkyOzwvYnV0dG9uPlxuICA8YnV0dG9uIChjbGljayk9XCJwcmV2aW91c1ZpZXdNb2RlKClcIiBtYXQtYnV0dG9uIGNsYXNzPVwiYWpmLWNhbGVuZGFyLWhlYWRlci10aXRsZVwiPlxuICAgIHt7IHZpZXdIZWFkZXIgfCB0cmFuc2xvY28gfX1cbiAgPC9idXR0b24+XG4gIDxidXR0b24gKGNsaWNrKT1cIm5leHRQYWdlKClcIiBtYXQtbWluaS1mYWI+JiM4NTk0OzwvYnV0dG9uPlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwiYWpmLWNhbGVuZGFyLXJvd1wiICpuZ0lmPVwiY2FsZW5kYXJIZWFkZXJzLmxlbmd0aCA+IDBcIj5cbiAgPGRpdiAqbmdGb3I9XCJsZXQgY2FsZW5kYXJIZWFkZXIgb2YgY2FsZW5kYXJIZWFkZXJzXCI+XG4gICAge3sgY2FsZW5kYXJIZWFkZXIgfCB0cmFuc2xvY28gfX1cbiAgPC9kaXY+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJhamYtY2FsZW5kYXItcm93XCIgKm5nRm9yPVwibGV0IHJvdyBvZiBjYWxlbmRhclJvd3NcIj5cbiAgPGJ1dHRvblxuICAgICAgKm5nRm9yPVwibGV0IGVudHJ5IG9mIHJvd1wiXG4gICAgICBtYXQtcmFpc2VkLWJ1dHRvblxuICAgICAgW2NsYXNzLmFqZi1jYWxlbmRhci1wYXJ0aWFsLXNlbGVjdGlvbl09XCJlbnRyeS5zZWxlY3RlZCA9PT0gJ3BhcnRpYWwnXCJcbiAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZCB8fCAoZW50cnkuZGlzYWJsZWQgfHwgZmFsc2UpXCJcbiAgICAgIFtjb2xvcl09XCJlbnRyeS5zZWxlY3RlZCAhPT0gJ25vbmUnID8gJ3dhcm4nIDogdW5kZWZpbmVkXCJcbiAgICAgIChjbGljayk9XCJzZWxlY3RFbnRyeShlbnRyeSlcIlxuICA+e3sgZW50cnl8YWpmQ2FsZW5kYXJFbnRyeUxhYmVsIH19PC9idXR0b24+XG48L2Rpdj5cbiJdfQ==