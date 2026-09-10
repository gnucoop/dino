import { AjfGeolocation } from '@ajf/core/geolocation';
import * as i0 from '@angular/core';
import { forwardRef, ChangeDetectionStrategy, ViewEncapsulation, Component, NgModule } from '@angular/core';
import * as i1 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import * as i2 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i3 from '@ngneat/transloco';
import { AjfTranslocoModule } from '@ajf/core/transloco';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
const GEOLOCATION_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AjfGeolocationComponent),
    multi: true,
};
/**
 * Ajf geolocation component.
 */
class AjfGeolocationComponent extends AjfGeolocation {
    constructor(cdr) {
        super(cdr);
    }
    static { this.ɵfac = function AjfGeolocationComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfGeolocationComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfGeolocationComponent, selectors: [["ajf-geolocation"]], features: [i0.ɵɵProvidersFeature([GEOLOCATION_CONTROL_VALUE_ACCESSOR]), i0.ɵɵInheritDefinitionFeature], decls: 19, vars: 17, consts: [[1, "ajf-geo"], [1, "ajf-geo-coord"], [1, "ajf-geo-coord-label"], [3, "ngModelChange", "focus", "ngModel"], ["type", "button", 1, "ajf-geo-locate", 3, "click"]], template: function AjfGeolocationComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "span", 1)(2, "label", 2);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "input", 3);
            i0.ɵɵpipe(6, "transloco");
            i0.ɵɵtwoWayListener("ngModelChange", function AjfGeolocationComponent_Template_input_ngModelChange_5_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.latitude, $event) || (ctx.latitude = $event); return $event; });
            i0.ɵɵlistener("focus", function AjfGeolocationComponent_Template_input_focus_5_listener() { return ctx.focusHandler(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "span", 1)(8, "label", 2);
            i0.ɵɵtext(9);
            i0.ɵɵpipe(10, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "input", 3);
            i0.ɵɵpipe(12, "transloco");
            i0.ɵɵtwoWayListener("ngModelChange", function AjfGeolocationComponent_Template_input_ngModelChange_11_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.longitude, $event) || (ctx.longitude = $event); return $event; });
            i0.ɵɵlistener("focus", function AjfGeolocationComponent_Template_input_focus_11_listener() { return ctx.focusHandler(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "button", 4);
            i0.ɵɵlistener("click", function AjfGeolocationComponent_Template_button_click_13_listener() { return ctx.getLocation(); });
            i0.ɵɵelementStart(14, "mat-icon");
            i0.ɵɵtext(15, "my_location");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "span");
            i0.ɵɵtext(17);
            i0.ɵɵpipe(18, "transloco");
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 7, "Lat"));
            i0.ɵɵadvance(2);
            i0.ɵɵtwoWayProperty("ngModel", ctx.latitude);
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(6, 9, "Latitude"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 11, "Lng"));
            i0.ɵɵadvance(2);
            i0.ɵɵtwoWayProperty("ngModel", ctx.longitude);
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(12, 13, "Longitude"));
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 15, "Locate"));
        } }, dependencies: [i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgModel, i2.MatIcon, i3.TranslocoPipe], styles: ["ajf-geolocation{display:block}ajf-geolocation .ajf-geo{display:flex;flex-wrap:wrap;align-items:center;gap:8px}ajf-geolocation .ajf-geo-coord{display:inline-flex;align-items:center;overflow:hidden;box-sizing:border-box;min-height:var(--ajf-control-h, 44px);border:1px solid var(--ajf-border-strong, #d5cfc6);border-radius:var(--ajf-radius, 4px);background:var(--ajf-surface, #fff)}ajf-geolocation .ajf-geo-coord:focus-within{border-color:var(--ajf-accent, #0f4c5c)}ajf-geolocation .ajf-geo-coord-label{align-self:stretch;padding:0 8px;border-right:1px solid var(--ajf-border, #e6e2dc);background:var(--ajf-band, #faf8f5);color:var(--ajf-text-muted, #7a736a);font-family:var(--ajf-font-mono, monospace);font-size:11px;line-height:calc(var(--ajf-control-h, 44px) - 2px);text-transform:uppercase}ajf-geolocation .ajf-geo-coord input{width:110px;height:calc(var(--ajf-control-h, 44px) - 2px);padding:0 10px;border:0;background:none;color:var(--ajf-text, #1c1a17);font-family:var(--ajf-font-mono, monospace);font-size:13px;outline:none}ajf-geolocation .ajf-geo-locate{display:inline-flex;align-items:center;gap:8px;min-height:var(--ajf-control-h, 44px);padding:0 14px;border:1px solid var(--ajf-border-strong, #d5cfc6);border-radius:var(--ajf-radius, 4px);background:var(--ajf-surface, #fff);color:var(--ajf-text, #1c1a17);font-family:inherit;font-size:14px;cursor:pointer}ajf-geolocation .ajf-geo-locate:hover{border-color:var(--ajf-accent, #0f4c5c)}ajf-geolocation .ajf-geo-locate .mat-icon{width:18px;height:18px;font-size:18px}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfGeolocationComponent, [{
        type: Component,
        args: [{ selector: 'ajf-geolocation', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, providers: [GEOLOCATION_CONTROL_VALUE_ACCESSOR], template: "<div class=\"ajf-geo\">\n  <span class=\"ajf-geo-coord\">\n    <label class=\"ajf-geo-coord-label\">{{ 'Lat' | transloco }}</label>\n    <input\n      [(ngModel)]=\"latitude\"\n      (focus)=\"focusHandler()\"\n      [attr.aria-label]=\"'Latitude' | transloco\"\n    />\n  </span>\n  <span class=\"ajf-geo-coord\">\n    <label class=\"ajf-geo-coord-label\">{{ 'Lng' | transloco }}</label>\n    <input\n      [(ngModel)]=\"longitude\"\n      (focus)=\"focusHandler()\"\n      [attr.aria-label]=\"'Longitude' | transloco\"\n    />\n  </span>\n  <button type=\"button\" class=\"ajf-geo-locate\" (click)=\"getLocation()\">\n    <mat-icon>my_location</mat-icon>\n    <span>{{ 'Locate' | transloco }}</span>\n  </button>\n</div>\n", styles: ["ajf-geolocation{display:block}ajf-geolocation .ajf-geo{display:flex;flex-wrap:wrap;align-items:center;gap:8px}ajf-geolocation .ajf-geo-coord{display:inline-flex;align-items:center;overflow:hidden;box-sizing:border-box;min-height:var(--ajf-control-h, 44px);border:1px solid var(--ajf-border-strong, #d5cfc6);border-radius:var(--ajf-radius, 4px);background:var(--ajf-surface, #fff)}ajf-geolocation .ajf-geo-coord:focus-within{border-color:var(--ajf-accent, #0f4c5c)}ajf-geolocation .ajf-geo-coord-label{align-self:stretch;padding:0 8px;border-right:1px solid var(--ajf-border, #e6e2dc);background:var(--ajf-band, #faf8f5);color:var(--ajf-text-muted, #7a736a);font-family:var(--ajf-font-mono, monospace);font-size:11px;line-height:calc(var(--ajf-control-h, 44px) - 2px);text-transform:uppercase}ajf-geolocation .ajf-geo-coord input{width:110px;height:calc(var(--ajf-control-h, 44px) - 2px);padding:0 10px;border:0;background:none;color:var(--ajf-text, #1c1a17);font-family:var(--ajf-font-mono, monospace);font-size:13px;outline:none}ajf-geolocation .ajf-geo-locate{display:inline-flex;align-items:center;gap:8px;min-height:var(--ajf-control-h, 44px);padding:0 14px;border:1px solid var(--ajf-border-strong, #d5cfc6);border-radius:var(--ajf-radius, 4px);background:var(--ajf-surface, #fff);color:var(--ajf-text, #1c1a17);font-family:inherit;font-size:14px;cursor:pointer}ajf-geolocation .ajf-geo-locate:hover{border-color:var(--ajf-accent, #0f4c5c)}ajf-geolocation .ajf-geo-locate .mat-icon{width:18px;height:18px;font-size:18px}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfGeolocationComponent, { className: "AjfGeolocationComponent", filePath: "geolocation.ts", lineNumber: 51 }); })();

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
class AjfGeolocationModule {
    static { this.ɵfac = function AjfGeolocationModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfGeolocationModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfGeolocationModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [AjfTranslocoModule,
            CommonModule,
            FormsModule,
            MatIconModule,
            MatInputModule,
            MatFormFieldModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfGeolocationModule, [{
        type: NgModule,
        args: [{
                imports: [
                    AjfTranslocoModule,
                    CommonModule,
                    FormsModule,
                    MatIconModule,
                    MatInputModule,
                    MatFormFieldModule,
                ],
                declarations: [AjfGeolocationComponent],
                exports: [AjfGeolocationComponent],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AjfGeolocationModule, { declarations: [AjfGeolocationComponent], imports: [AjfTranslocoModule,
        CommonModule,
        FormsModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule], exports: [AjfGeolocationComponent] }); })();

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

export { AjfGeolocationComponent, AjfGeolocationModule, GEOLOCATION_CONTROL_VALUE_ACCESSOR };
//# sourceMappingURL=ajf-material-geolocation.mjs.map
