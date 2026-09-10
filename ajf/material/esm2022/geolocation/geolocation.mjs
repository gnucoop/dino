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
import { AjfGeolocation } from '@ajf/core/geolocation';
import { ChangeDetectionStrategy, Component, forwardRef, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/material/icon";
import * as i3 from "@ngneat/transloco";
export const GEOLOCATION_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AjfGeolocationComponent),
    multi: true,
};
/**
 * Ajf geolocation component.
 */
export class AjfGeolocationComponent extends AjfGeolocation {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9nZW9sb2NhdGlvbi9zcmMvZ2VvbG9jYXRpb24udHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9nZW9sb2NhdGlvbi9zcmMvZ2VvbG9jYXRpb24uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDckQsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsVUFBVSxFQUVWLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFFakQsTUFBTSxDQUFDLE1BQU0sa0NBQWtDLEdBQVE7SUFDckQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHVCQUF1QixDQUFDO0lBQ3RELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQUVGOztHQUVHO0FBU0gsTUFBTSxPQUFPLHVCQUF3QixTQUFRLGNBQWM7SUFDekQsWUFBWSxHQUFzQjtRQUNoQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDYixDQUFDO3dIQUhVLHVCQUF1QjtvRUFBdkIsdUJBQXVCLHFFQUZ2QixDQUFDLGtDQUFrQyxDQUFDO1lDOUM3QyxBQURGLEFBREYsOEJBQXFCLGNBQ1MsZUFDUztZQUFBLFlBQXVCOztZQUFBLGlCQUFRO1lBQ2xFLGdDQUlFOztZQUhBLGlOQUFzQjtZQUN0QixtR0FBUyxrQkFBYyxJQUFDO1lBRzVCLEFBTEUsaUJBSUUsRUFDRztZQUVMLEFBREYsK0JBQTRCLGVBQ1M7WUFBQSxZQUF1Qjs7WUFBQSxpQkFBUTtZQUNsRSxpQ0FJRTs7WUFIQSxvTkFBdUI7WUFDdkIsb0dBQVMsa0JBQWMsSUFBQztZQUc1QixBQUxFLGlCQUlFLEVBQ0c7WUFDUCxrQ0FBcUU7WUFBeEIscUdBQVMsaUJBQWEsSUFBQztZQUNsRSxpQ0FBVTtZQUFBLDRCQUFXO1lBQUEsaUJBQVc7WUFDaEMsNkJBQU07WUFBQSxhQUEwQjs7WUFFcEMsQUFERSxBQURrQyxpQkFBTyxFQUNoQyxFQUNMOztZQW5CaUMsZUFBdUI7WUFBdkIsaURBQXVCO1lBRXhELGVBQXNCO1lBQXRCLDRDQUFzQjs7WUFNVyxlQUF1QjtZQUF2QixtREFBdUI7WUFFeEQsZUFBdUI7WUFBdkIsNkNBQXVCOztZQU9uQixlQUEwQjtZQUExQixzREFBMEI7OztpRkQrQnZCLHVCQUF1QjtjQVJuQyxTQUFTOzJCQUNFLGlCQUFpQixpQkFHWixpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNLGFBQ3BDLENBQUMsa0NBQWtDLENBQUM7O2tGQUVwQyx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmR2VvbG9jYXRpb259IGZyb20gJ0BhamYvY29yZS9nZW9sb2NhdGlvbic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgZm9yd2FyZFJlZixcbiAgT25EZXN0cm95LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBjb25zdCBHRU9MT0NBVElPTl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBamZHZW9sb2NhdGlvbkNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuLyoqXG4gKiBBamYgZ2VvbG9jYXRpb24gY29tcG9uZW50LlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtZ2VvbG9jYXRpb24nLFxuICB0ZW1wbGF0ZVVybDogJ2dlb2xvY2F0aW9uLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnZ2VvbG9jYXRpb24uc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbR0VPTE9DQVRJT05fQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZkdlb2xvY2F0aW9uQ29tcG9uZW50IGV4dGVuZHMgQWpmR2VvbG9jYXRpb24gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgc3VwZXIoY2RyKTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImFqZi1nZW9cIj5cbiAgPHNwYW4gY2xhc3M9XCJhamYtZ2VvLWNvb3JkXCI+XG4gICAgPGxhYmVsIGNsYXNzPVwiYWpmLWdlby1jb29yZC1sYWJlbFwiPnt7ICdMYXQnIHwgdHJhbnNsb2NvIH19PC9sYWJlbD5cbiAgICA8aW5wdXRcbiAgICAgIFsobmdNb2RlbCldPVwibGF0aXR1ZGVcIlxuICAgICAgKGZvY3VzKT1cImZvY3VzSGFuZGxlcigpXCJcbiAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiJ0xhdGl0dWRlJyB8IHRyYW5zbG9jb1wiXG4gICAgLz5cbiAgPC9zcGFuPlxuICA8c3BhbiBjbGFzcz1cImFqZi1nZW8tY29vcmRcIj5cbiAgICA8bGFiZWwgY2xhc3M9XCJhamYtZ2VvLWNvb3JkLWxhYmVsXCI+e3sgJ0xuZycgfCB0cmFuc2xvY28gfX08L2xhYmVsPlxuICAgIDxpbnB1dFxuICAgICAgWyhuZ01vZGVsKV09XCJsb25naXR1ZGVcIlxuICAgICAgKGZvY3VzKT1cImZvY3VzSGFuZGxlcigpXCJcbiAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiJ0xvbmdpdHVkZScgfCB0cmFuc2xvY29cIlxuICAgIC8+XG4gIDwvc3Bhbj5cbiAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJhamYtZ2VvLWxvY2F0ZVwiIChjbGljayk9XCJnZXRMb2NhdGlvbigpXCI+XG4gICAgPG1hdC1pY29uPm15X2xvY2F0aW9uPC9tYXQtaWNvbj5cbiAgICA8c3Bhbj57eyAnTG9jYXRlJyB8IHRyYW5zbG9jbyB9fTwvc3Bhbj5cbiAgPC9idXR0b24+XG48L2Rpdj5cbiJdfQ==