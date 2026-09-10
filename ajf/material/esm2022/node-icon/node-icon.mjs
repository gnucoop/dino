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
import { AjfFieldType, AjfNodeType } from '@ajf/core/forms';
import { AjfNodeIcon as CoreNodeIcon } from '@ajf/core/node-icon';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/material/icon";
function AjfNodeIcon_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.matIcon(ctx_r0.node));
} }
export class AjfNodeIcon extends CoreNodeIcon {
    matIcon(node) {
        if (node.nodeType === AjfNodeType.AjfSlide) {
            return 'folder';
        }
        if (node.nodeType === AjfNodeType.AjfRepeatingSlide) {
            return 'create_new_folder';
        }
        if (node.nodeType !== AjfNodeType.AjfField) {
            return 'broken_image';
        }
        switch (node.fieldType) {
            case AjfFieldType.String:
            case AjfFieldType.Text:
                return 'abc';
            case AjfFieldType.Number:
            case AjfFieldType.Range:
                return 'pin';
            case AjfFieldType.Boolean:
                return 'toggle_off';
            case AjfFieldType.SingleChoice:
                return 'format_list_bulleted';
            case AjfFieldType.MultipleChoice:
                return 'format_list_numbered';
            case AjfFieldType.Formula:
                return 'code';
            case AjfFieldType.Empty:
                return 'html';
            case AjfFieldType.DateRange:
            case AjfFieldType.DateInput:
                return 'calendar_month';
            case AjfFieldType.Time:
                return 'access_time';
            case AjfFieldType.Table:
                return 'grid_on';
            case AjfFieldType.Geolocation:
                return 'location_on';
            case AjfFieldType.Barcode:
                return 'qr_code_2';
            case AjfFieldType.File:
                return 'attach_file';
            case AjfFieldType.Image:
                return 'image';
            case AjfFieldType.VideoUrl:
                return 'videocam';
            case AjfFieldType.Signature:
                return 'draw';
            default:
                return 'broken_image';
        }
    }
    static { this.ɵfac = /*@__PURE__*/ (() => { let ɵAjfNodeIcon_BaseFactory; return function AjfNodeIcon_Factory(__ngFactoryType__) { return (ɵAjfNodeIcon_BaseFactory || (ɵAjfNodeIcon_BaseFactory = i0.ɵɵgetInheritedFactory(AjfNodeIcon)))(__ngFactoryType__ || AjfNodeIcon); }; })(); }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfNodeIcon, selectors: [["ajf-node-icon"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [[3, "ngIf"]], template: function AjfNodeIcon_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfNodeIcon_ng_template_0_Template, 2, 1, "ng-template", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.node);
        } }, dependencies: [i1.NgIf, i2.MatIcon], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfNodeIcon, [{
        type: Component,
        args: [{ selector: 'ajf-node-icon', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template [ngIf]=\"node\">\n  <mat-icon>{{matIcon(node)}}</mat-icon>\n</ng-template>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfNodeIcon, { className: "AjfNodeIcon", filePath: "node-icon.ts", lineNumber: 34 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1pY29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvbm9kZS1pY29uL3NyYy9ub2RlLWljb24udHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9ub2RlLWljb24vc3JjL25vZGUtaWNvbi5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBVyxZQUFZLEVBQVcsV0FBVyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0UsT0FBTyxFQUFDLFdBQVcsSUFBSSxZQUFZLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDOzs7OztJQ3ZCbEYsZ0NBQVU7SUFBQSxZQUFpQjtJQUFBLGlCQUFXOzs7SUFBNUIsY0FBaUI7SUFBakIsaURBQWlCOztBRGdDN0IsTUFBTSxPQUFPLFdBQVksU0FBUSxZQUFZO0lBQzNDLE9BQU8sQ0FBQyxJQUFhO1FBQ25CLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDM0MsT0FBTyxRQUFRLENBQUM7UUFDbEIsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUNwRCxPQUFPLG1CQUFtQixDQUFDO1FBQzdCLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzNDLE9BQU8sY0FBYyxDQUFDO1FBQ3hCLENBQUM7UUFDRCxRQUFTLElBQWlCLENBQUMsU0FBeUIsRUFBRSxDQUFDO1lBQ3JELEtBQUssWUFBWSxDQUFDLE1BQU0sQ0FBQztZQUN6QixLQUFLLFlBQVksQ0FBQyxJQUFJO2dCQUNwQixPQUFPLEtBQUssQ0FBQztZQUNmLEtBQUssWUFBWSxDQUFDLE1BQU0sQ0FBQztZQUN6QixLQUFLLFlBQVksQ0FBQyxLQUFLO2dCQUNyQixPQUFPLEtBQUssQ0FBQztZQUNmLEtBQUssWUFBWSxDQUFDLE9BQU87Z0JBQ3ZCLE9BQU8sWUFBWSxDQUFDO1lBQ3RCLEtBQUssWUFBWSxDQUFDLFlBQVk7Z0JBQzVCLE9BQU8sc0JBQXNCLENBQUM7WUFDaEMsS0FBSyxZQUFZLENBQUMsY0FBYztnQkFDOUIsT0FBTyxzQkFBc0IsQ0FBQztZQUNoQyxLQUFLLFlBQVksQ0FBQyxPQUFPO2dCQUN2QixPQUFPLE1BQU0sQ0FBQztZQUNoQixLQUFLLFlBQVksQ0FBQyxLQUFLO2dCQUNyQixPQUFPLE1BQU0sQ0FBQztZQUNoQixLQUFLLFlBQVksQ0FBQyxTQUFTLENBQUM7WUFDNUIsS0FBSyxZQUFZLENBQUMsU0FBUztnQkFDekIsT0FBTyxnQkFBZ0IsQ0FBQztZQUMxQixLQUFLLFlBQVksQ0FBQyxJQUFJO2dCQUNwQixPQUFPLGFBQWEsQ0FBQztZQUN2QixLQUFLLFlBQVksQ0FBQyxLQUFLO2dCQUNyQixPQUFPLFNBQVMsQ0FBQztZQUNuQixLQUFLLFlBQVksQ0FBQyxXQUFXO2dCQUMzQixPQUFPLGFBQWEsQ0FBQztZQUN2QixLQUFLLFlBQVksQ0FBQyxPQUFPO2dCQUN2QixPQUFPLFdBQVcsQ0FBQztZQUNyQixLQUFLLFlBQVksQ0FBQyxJQUFJO2dCQUNwQixPQUFPLGFBQWEsQ0FBQztZQUN2QixLQUFLLFlBQVksQ0FBQyxLQUFLO2dCQUNyQixPQUFPLE9BQU8sQ0FBQztZQUNqQixLQUFLLFlBQVksQ0FBQyxRQUFRO2dCQUN4QixPQUFPLFVBQVUsQ0FBQztZQUNwQixLQUFLLFlBQVksQ0FBQyxTQUFTO2dCQUN6QixPQUFPLE1BQU0sQ0FBQztZQUNoQjtnQkFDRSxPQUFPLGNBQWMsQ0FBQztRQUMxQixDQUFDO0lBQ0gsQ0FBQztnT0FsRFUsV0FBVyx5QkFBWCxXQUFXO29FQUFYLFdBQVc7WUNqQ3hCLDRFQUEyQjs7WUFBZCwrQkFBYTs7O2lGRGlDYixXQUFXO2NBUHZCLFNBQVM7MkJBQ0UsZUFBZSxpQkFHVixpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNOztrRkFFcEMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGaWVsZCwgQWpmRmllbGRUeXBlLCBBamZOb2RlLCBBamZOb2RlVHlwZX0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7QWpmTm9kZUljb24gYXMgQ29yZU5vZGVJY29ufSBmcm9tICdAYWpmL2NvcmUvbm9kZS1pY29uJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtbm9kZS1pY29uJyxcbiAgdGVtcGxhdGVVcmw6ICdub2RlLWljb24uaHRtbCcsXG4gIHN0eWxlVXJsczogWydub2RlLWljb24uc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQWpmTm9kZUljb24gZXh0ZW5kcyBDb3JlTm9kZUljb24ge1xuICBtYXRJY29uKG5vZGU6IEFqZk5vZGUpOiBzdHJpbmcge1xuICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZTbGlkZSkge1xuICAgICAgcmV0dXJuICdmb2xkZXInO1xuICAgIH1cbiAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGUpIHtcbiAgICAgIHJldHVybiAnY3JlYXRlX25ld19mb2xkZXInO1xuICAgIH1cbiAgICBpZiAobm9kZS5ub2RlVHlwZSAhPT0gQWpmTm9kZVR5cGUuQWpmRmllbGQpIHtcbiAgICAgIHJldHVybiAnYnJva2VuX2ltYWdlJztcbiAgICB9XG4gICAgc3dpdGNoICgobm9kZSBhcyBBamZGaWVsZCkuZmllbGRUeXBlIGFzIEFqZkZpZWxkVHlwZSkge1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuU3RyaW5nOlxuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuVGV4dDpcbiAgICAgICAgcmV0dXJuICdhYmMnO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuTnVtYmVyOlxuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuUmFuZ2U6XG4gICAgICAgIHJldHVybiAncGluJztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLkJvb2xlYW46XG4gICAgICAgIHJldHVybiAndG9nZ2xlX29mZic7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5TaW5nbGVDaG9pY2U6XG4gICAgICAgIHJldHVybiAnZm9ybWF0X2xpc3RfYnVsbGV0ZWQnO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuTXVsdGlwbGVDaG9pY2U6XG4gICAgICAgIHJldHVybiAnZm9ybWF0X2xpc3RfbnVtYmVyZWQnO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuRm9ybXVsYTpcbiAgICAgICAgcmV0dXJuICdjb2RlJztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLkVtcHR5OlxuICAgICAgICByZXR1cm4gJ2h0bWwnO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuRGF0ZVJhbmdlOlxuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuRGF0ZUlucHV0OlxuICAgICAgICByZXR1cm4gJ2NhbGVuZGFyX21vbnRoJztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlRpbWU6XG4gICAgICAgIHJldHVybiAnYWNjZXNzX3RpbWUnO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuVGFibGU6XG4gICAgICAgIHJldHVybiAnZ3JpZF9vbic7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5HZW9sb2NhdGlvbjpcbiAgICAgICAgcmV0dXJuICdsb2NhdGlvbl9vbic7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5CYXJjb2RlOlxuICAgICAgICByZXR1cm4gJ3FyX2NvZGVfMic7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5GaWxlOlxuICAgICAgICByZXR1cm4gJ2F0dGFjaF9maWxlJztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLkltYWdlOlxuICAgICAgICByZXR1cm4gJ2ltYWdlJztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlZpZGVvVXJsOlxuICAgICAgICByZXR1cm4gJ3ZpZGVvY2FtJztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlNpZ25hdHVyZTpcbiAgICAgICAgcmV0dXJuICdkcmF3JztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnYnJva2VuX2ltYWdlJztcbiAgICB9XG4gIH1cbn1cbiIsIjxuZy10ZW1wbGF0ZSBbbmdJZl09XCJub2RlXCI+XG4gIDxtYXQtaWNvbj57e21hdEljb24obm9kZSl9fTwvbWF0LWljb24+XG48L25nLXRlbXBsYXRlPlxuIl19