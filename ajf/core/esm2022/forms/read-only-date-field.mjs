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
import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation, } from '@angular/core';
import { parse, toDate } from 'date-fns';
import { filter, map } from 'rxjs/operators';
import { AjfInputFieldComponent as CoreComponent } from './input-field';
import { AJF_WARNING_ALERT_SERVICE } from './warning-alert-service';
import { DatePipe } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "./form-renderer";
import * as i2 from "@ajf/core/transloco";
import * as i3 from "@angular/common";
function AjfReadOnlyDateFieldComponent_ng_container_0_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const dateVal_r1 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(dateVal_r1);
} }
function AjfReadOnlyDateFieldComponent_ng_container_0_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const ctrl_r2 = i0.ɵɵnextContext().ngIf;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.formatDateField(ctrl_r2.value), " ");
} }
function AjfReadOnlyDateFieldComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfReadOnlyDateFieldComponent_ng_container_0_span_1_Template, 2, 1, "span", 2);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵtemplate(3, AjfReadOnlyDateFieldComponent_ng_container_0_ng_template_3_Template, 1, 1, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const dateCtrl_r4 = i0.ɵɵreference(4);
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(2, 2, ctx_r2.date))("ngIfElse", dateCtrl_r4);
} }
/**
 * this component show the control value inherited from AjfBaseFieldComponent.
 *
 * @export
 * @class AjfReadOnlyDateFieldComponent
 */
export class AjfReadOnlyDateFieldComponent extends CoreComponent {
    constructor(cdr, service, _ts, was) {
        super(cdr, service, was);
        this._ts = _ts;
        this.date = this.control.pipe(filter(control => control != null), map(ctrl => {
            if (ctrl) {
                this.formatDateField(ctrl.value);
            }
            return '';
        }));
    }
    formatDateField(val) {
        if (val == null) {
            return '';
        }
        let dt = null;
        if (typeof val === 'string') {
            dt = parse(val, 'yyyy-MM-dd', new Date());
        }
        else {
            dt = toDate(val);
        }
        if (!isNaN(dt.valueOf())) {
            const datePipe = new DatePipe(this._getCurrentLocale());
            return datePipe.transform(dt, 'shortDate');
        }
        return '';
    }
    _getCurrentLocale() {
        const lang = this._ts.getActiveLang();
        switch (lang) {
            case 'ESP':
                return 'es';
            case 'FRA':
                return 'fr';
            case 'ITA':
                return 'it';
            case 'PRT':
                return 'pt';
            default:
                return 'en';
        }
    }
    static { this.ɵfac = function AjfReadOnlyDateFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfReadOnlyDateFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.AjfFormRendererService), i0.ɵɵdirectiveInject(i2.TranslocoService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfReadOnlyDateFieldComponent, selectors: [["ajf-read-date-only-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 2, vars: 3, consts: [["dateCtrl", ""], [4, "ngIf"], [4, "ngIf", "ngIfElse"]], template: function AjfReadOnlyDateFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfReadOnlyDateFieldComponent_ng_container_0_Template, 5, 4, "ng-container", 1);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.control));
        } }, dependencies: [i3.NgIf, i3.AsyncPipe], styles: ["ajf-read-only-date-field{display:block}ajf-read-only-date-field span{display:block;min-height:1em;color:var(--ajf-text, #1c1a17);font-family:var(--ajf-font-mono, monospace);font-size:13px;line-height:1.5}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfReadOnlyDateFieldComponent, [{
        type: Component,
        args: [{ selector: 'ajf-read-date-only-field', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container *ngIf=\"control|async as ctrl\">\n\n  <span *ngIf=\"date|async as dateVal; else dateCtrl\">{{dateVal}}</span>\n  <ng-template #dateCtrl>\n    {{formatDateField(ctrl.value)}}\n  </ng-template>\n</ng-container>", styles: ["ajf-read-only-date-field{display:block}ajf-read-only-date-field span{display:block;min-height:1em;color:var(--ajf-text, #1c1a17);font-family:var(--ajf-font-mono, monospace);font-size:13px;line-height:1.5}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: i2.TranslocoService }, { type: undefined, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfReadOnlyDateFieldComponent, { className: "AjfReadOnlyDateFieldComponent", filePath: "read-only-date-field.ts", lineNumber: 53 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1vbmx5LWRhdGUtZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2Zvcm1zL3NyYy9yZWFkLW9ubHktZGF0ZS1maWVsZC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZm9ybXMvc3JjL3JlYWQtb25seS1kYXRlLWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsTUFBTSxFQUNOLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUV2QyxPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxzQkFBc0IsSUFBSSxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFHdEUsT0FBTyxFQUFDLHlCQUF5QixFQUF5QixNQUFNLHlCQUF5QixDQUFDO0FBRTFGLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7O0lDbkN2Qyw0QkFBbUQ7SUFBQSxZQUFXO0lBQUEsaUJBQU87OztJQUFsQixjQUFXO0lBQVgsZ0NBQVc7OztJQUU1RCxZQUNGOzs7O0lBREUsc0VBQ0Y7OztJQUxGLDZCQUE0QztJQUUxQywrRkFBbUQ7O0lBQ25ELDhJQUF1Qjs7Ozs7SUFEaEIsY0FBaUI7SUFBWSxBQUE3Qix3REFBaUIseUJBQXlCOztBRHFDbkQ7Ozs7O0dBS0c7QUFRSCxNQUFNLE9BQU8sNkJBQThCLFNBQVEsYUFBYTtJQUc5RCxZQUNFLEdBQXNCLEVBQ3RCLE9BQStCLEVBQ3ZCLEdBQXFCLEVBQ00sR0FBMkI7UUFFOUQsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFIakIsUUFBRyxHQUFILEdBQUcsQ0FBa0I7UUFLN0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDM0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxFQUNsQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDVCxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUNULElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25DLENBQUM7WUFDRCxPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsZUFBZSxDQUFDLEdBQVE7UUFDdEIsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDaEIsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDO1FBQ0QsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ2QsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUM1QixFQUFFLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxZQUFZLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLENBQUM7YUFBTSxDQUFDO1lBQ04sRUFBRSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ3pCLE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7WUFDeEQsT0FBTyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxXQUFXLENBQVcsQ0FBQztRQUN2RCxDQUFDO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRU8saUJBQWlCO1FBQ3ZCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdEMsUUFBUSxJQUFJLEVBQUUsQ0FBQztZQUNiLEtBQUssS0FBSztnQkFDUixPQUFPLElBQUksQ0FBQztZQUNkLEtBQUssS0FBSztnQkFDUixPQUFPLElBQUksQ0FBQztZQUNkLEtBQUssS0FBSztnQkFDUixPQUFPLElBQUksQ0FBQztZQUNkLEtBQUssS0FBSztnQkFDUixPQUFPLElBQUksQ0FBQztZQUNkO2dCQUNFLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7SUFDSCxDQUFDOzhIQXJEVSw2QkFBNkIsK0pBTzlCLHlCQUF5QjtvRUFQeEIsNkJBQTZCO1lDcEQxQyxnR0FBNEM7OztZQUE3Qix3REFBb0I7OztpRkRvRHRCLDZCQUE2QjtjQVB6QyxTQUFTOzJCQUNFLDBCQUEwQixtQkFHbkIsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTs7c0JBU2xDLE1BQU07dUJBQUMseUJBQXlCOztrRkFQeEIsNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgSW5qZWN0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge3BhcnNlLCB0b0RhdGV9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlciwgbWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge0FqZklucHV0RmllbGRDb21wb25lbnQgYXMgQ29yZUNvbXBvbmVudH0gZnJvbSAnLi9pbnB1dC1maWVsZCc7XG5cbmltcG9ydCB7QWpmRm9ybVJlbmRlcmVyU2VydmljZX0gZnJvbSAnLi9mb3JtLXJlbmRlcmVyJztcbmltcG9ydCB7QUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSwgQWpmV2FybmluZ0FsZXJ0U2VydmljZX0gZnJvbSAnLi93YXJuaW5nLWFsZXJ0LXNlcnZpY2UnO1xuaW1wb3J0IHtUcmFuc2xvY29TZXJ2aWNlfSBmcm9tICdAYWpmL2NvcmUvdHJhbnNsb2NvJztcbmltcG9ydCB7RGF0ZVBpcGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbi8qKlxuICogdGhpcyBjb21wb25lbnQgc2hvdyB0aGUgY29udHJvbCB2YWx1ZSBpbmhlcml0ZWQgZnJvbSBBamZCYXNlRmllbGRDb21wb25lbnQuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIEFqZlJlYWRPbmx5RGF0ZUZpZWxkQ29tcG9uZW50XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1yZWFkLWRhdGUtb25seS1maWVsZCcsXG4gIHRlbXBsYXRlVXJsOiAncmVhZC1vbmx5LWRhdGUtZmllbGQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydyZWFkLW9ubHktZGF0ZS1maWVsZC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZWFkT25seURhdGVGaWVsZENvbXBvbmVudCBleHRlbmRzIENvcmVDb21wb25lbnQge1xuICByZWFkb25seSBkYXRlOiBPYnNlcnZhYmxlPHN0cmluZz47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBzZXJ2aWNlOiBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgX3RzOiBUcmFuc2xvY29TZXJ2aWNlLFxuICAgIEBJbmplY3QoQUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSkgd2FzOiBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlLFxuICApIHtcbiAgICBzdXBlcihjZHIsIHNlcnZpY2UsIHdhcyk7XG5cbiAgICB0aGlzLmRhdGUgPSB0aGlzLmNvbnRyb2wucGlwZShcbiAgICAgIGZpbHRlcihjb250cm9sID0+IGNvbnRyb2wgIT0gbnVsbCksXG4gICAgICBtYXAoY3RybCA9PiB7XG4gICAgICAgIGlmIChjdHJsKSB7XG4gICAgICAgICAgdGhpcy5mb3JtYXREYXRlRmllbGQoY3RybC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIGZvcm1hdERhdGVGaWVsZCh2YWw6IGFueSk6IHN0cmluZyB7XG4gICAgaWYgKHZhbCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGxldCBkdCA9IG51bGw7XG4gICAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICBkdCA9IHBhcnNlKHZhbCwgJ3l5eXktTU0tZGQnLCBuZXcgRGF0ZSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZHQgPSB0b0RhdGUodmFsKTtcbiAgICB9XG4gICAgaWYgKCFpc05hTihkdC52YWx1ZU9mKCkpKSB7XG4gICAgICBjb25zdCBkYXRlUGlwZSA9IG5ldyBEYXRlUGlwZSh0aGlzLl9nZXRDdXJyZW50TG9jYWxlKCkpO1xuICAgICAgcmV0dXJuIGRhdGVQaXBlLnRyYW5zZm9ybShkdCwgJ3Nob3J0RGF0ZScpIGFzIHN0cmluZztcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Q3VycmVudExvY2FsZSgpOiBzdHJpbmcge1xuICAgIGNvbnN0IGxhbmcgPSB0aGlzLl90cy5nZXRBY3RpdmVMYW5nKCk7XG4gICAgc3dpdGNoIChsYW5nKSB7XG4gICAgICBjYXNlICdFU1AnOlxuICAgICAgICByZXR1cm4gJ2VzJztcbiAgICAgIGNhc2UgJ0ZSQSc6XG4gICAgICAgIHJldHVybiAnZnInO1xuICAgICAgY2FzZSAnSVRBJzpcbiAgICAgICAgcmV0dXJuICdpdCc7XG4gICAgICBjYXNlICdQUlQnOlxuICAgICAgICByZXR1cm4gJ3B0JztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnZW4nO1xuICAgIH1cbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbnRyb2x8YXN5bmMgYXMgY3RybFwiPlxuXG4gIDxzcGFuICpuZ0lmPVwiZGF0ZXxhc3luYyBhcyBkYXRlVmFsOyBlbHNlIGRhdGVDdHJsXCI+e3tkYXRlVmFsfX08L3NwYW4+XG4gIDxuZy10ZW1wbGF0ZSAjZGF0ZUN0cmw+XG4gICAge3tmb3JtYXREYXRlRmllbGQoY3RybC52YWx1ZSl9fVxuICA8L25nLXRlbXBsYXRlPlxuPC9uZy1jb250YWluZXI+Il19