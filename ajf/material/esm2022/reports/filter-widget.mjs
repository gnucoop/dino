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
import { AjfFormRendererService } from '@ajf/core/forms';
import { evaluateExpression } from '@ajf/core/models';
import { AjfBaseWidgetComponent, widgetToWidgetInstance, } from '@ajf/core/reports';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation, } from '@angular/core';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/core/transloco";
import * as i2 from "@ajf/core/forms";
import * as i3 from "@ajf/material/forms";
import * as i4 from "@angular/common";
function AjfFilterWidgetComponent_ng_container_0_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelement(1, "ajf-form", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const filter_r1 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("form", filter_r1.form)("hasStartMessage", false)("hasEndMessage", false)("hideTopToolbar", true)("hideBottomToolbar", true)("hideNavigationButtons", true);
} }
function AjfFilterWidgetComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFilterWidgetComponent_ng_container_0_div_1_Template, 2, 6, "div", 1);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.instance.filter);
} }
export class AjfFilterWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el, _ts, _formRenderer) {
        super(cdr, el);
        this._ts = _ts;
        this._formRenderer = _formRenderer;
        this.filterWidgetChange = new EventEmitter();
        this.filteredInstance = this._formRenderer.formGroup.pipe(filter(fg => this.instance != null && this.instance.filter != null && fg != null), switchMap(formGroup => formGroup.valueChanges), distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)), map(filterContext => {
            const instance = this.instance;
            const filter = instance.filter;
            const newContext = { ...(filter.context || {}), ...filterContext };
            for (const variable of filter.variables || []) {
                newContext[variable.name] = evaluateExpression(variable.formula.formula, newContext);
            }
            this.instance = widgetToWidgetInstance(instance.widget, newContext, this._ts, filter.variables);
            this.filterWidgetChange.emit({ context: filterContext, widget: this.instance });
            return this.instance;
        }));
    }
    static { this.ɵfac = function AjfFilterWidgetComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFilterWidgetComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.TranslocoService), i0.ɵɵdirectiveInject(i2.AjfFormRendererService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFilterWidgetComponent, selectors: [["ajf-filter-widget"]], outputs: { filteredInstance: "filteredInstance", filterWidgetChange: "filterWidgetChange" }, features: [i0.ɵɵProvidersFeature([AjfFormRendererService]), i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [[4, "ngIf"], ["class", "ajf-filter-container", 4, "ngIf"], [1, "ajf-filter-container"], [3, "form", "hasStartMessage", "hasEndMessage", "hideTopToolbar", "hideBottomToolbar", "hideNavigationButtons"]], template: function AjfFilterWidgetComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfFilterWidgetComponent_ng_container_0_Template, 2, 1, "ng-container", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.instance);
        } }, dependencies: [i3.AjfFormRenderer, i4.NgIf], styles: ["ajf-filter-widget .ajf-filter-container ajf-page-slider-item{flex:auto!important}ajf-filter-widget .ajf-filter-container ajf-page-slider-item .ajf-page-slider-item-content{position:relative}ajf-filter-widget .ajf-filter-container .ajf-form-container{position:relative}ajf-filter-widget .ajf-filter-container .ajf-form-container .mat-mdc-card-header{display:none}ajf-filter-widget .ajf-field-entry{width:unset!important;min-width:200px}ajf-filter-widget mat-card{min-height:50px!important}ajf-filter-widget mat-card-content{padding:15px 15px 0!important}ajf-filter-widget mat-card-actions{display:none!important}ajf-filter-widget .mat-mdc-select-value{box-shadow:0 5px 5px -5px #0003}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFilterWidgetComponent, [{
        type: Component,
        args: [{ selector: 'ajf-filter-widget', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, providers: [AjfFormRendererService], template: "<ng-container *ngIf=\"instance\">\n  <div *ngIf=\"instance.filter as filter\" class=\"ajf-filter-container\">\n    <ajf-form\n      [form]=\"filter.form\"\n      [hasStartMessage]=\"false\"\n      [hasEndMessage]=\"false\"\n      [hideTopToolbar]=\"true\"\n      [hideBottomToolbar]=\"true\"\n      [hideNavigationButtons]=\"true\"\n    ></ajf-form>\n  </div>\n</ng-container>\n", styles: ["ajf-filter-widget .ajf-filter-container ajf-page-slider-item{flex:auto!important}ajf-filter-widget .ajf-filter-container ajf-page-slider-item .ajf-page-slider-item-content{position:relative}ajf-filter-widget .ajf-filter-container .ajf-form-container{position:relative}ajf-filter-widget .ajf-filter-container .ajf-form-container .mat-mdc-card-header{display:none}ajf-filter-widget .ajf-field-entry{width:unset!important;min-width:200px}ajf-filter-widget mat-card{min-height:50px!important}ajf-filter-widget mat-card-content{padding:15px 15px 0!important}ajf-filter-widget mat-card-actions{display:none!important}ajf-filter-widget .mat-mdc-select-value{box-shadow:0 5px 5px -5px #0003}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i1.TranslocoService }, { type: i2.AjfFormRendererService }], { filteredInstance: [{
            type: Output
        }], filterWidgetChange: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFilterWidgetComponent, { className: "AjfFilterWidgetComponent", filePath: "filter-widget.ts", lineNumber: 54 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLXdpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL3JlcG9ydHMvc3JjL2ZpbHRlci13aWRnZXQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9yZXBvcnRzL3NyYy9maWx0ZXItd2lkZ2V0Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFdkQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUNMLHNCQUFzQixFQUd0QixzQkFBc0IsR0FDdkIsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFFVCxZQUFZLEVBQ1osTUFBTSxFQUNOLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7OztJQ3pDMUUsOEJBQW9FO0lBQ2xFLDhCQU9ZO0lBQ2QsaUJBQU07OztJQVBGLGNBQW9CO0lBS3BCLEFBREEsQUFEQSxBQURBLEFBREEsQUFEQSxxQ0FBb0IsMEJBQ0ssd0JBQ0Ysd0JBQ0EsMkJBQ0csK0JBQ0k7OztJQVJwQyw2QkFBK0I7SUFDN0Isd0ZBQW9FOzs7O0lBQTlELGNBQXNCO0lBQXRCLDZDQUFzQjs7QURvRDlCLE1BQU0sT0FBTyx3QkFBeUIsU0FBUSxzQkFBeUM7SUFJckYsWUFDRSxHQUFzQixFQUN0QixFQUFjLEVBQ04sR0FBcUIsRUFDckIsYUFBcUM7UUFFN0MsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUhQLFFBQUcsR0FBSCxHQUFHLENBQWtCO1FBQ3JCLGtCQUFhLEdBQWIsYUFBYSxDQUF3QjtRQU5yQyx1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBb0QsQ0FBQztRQVVsRyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUN2RCxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxJQUFJLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxFQUNqRixTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBRSxTQUE4QixDQUFDLFlBQVksQ0FBQyxFQUNwRSxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUN2RSxHQUFHLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDbEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQTZCLENBQUM7WUFDcEQsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQTJCLENBQUM7WUFDcEQsTUFBTSxVQUFVLEdBQVEsRUFBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLGFBQWEsRUFBQyxDQUFDO1lBQ3RFLEtBQUssTUFBTSxRQUFRLElBQUksTUFBTSxDQUFDLFNBQVMsSUFBSSxFQUFFLEVBQUUsQ0FBQztnQkFDOUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztZQUN2RixDQUFDO1lBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxzQkFBc0IsQ0FDcEMsUUFBUSxDQUFDLE1BQU0sRUFDZixVQUFVLEVBQ1YsSUFBSSxDQUFDLEdBQUcsRUFDUixNQUFNLENBQUMsU0FBUyxDQUNqQixDQUFDO1lBQ0YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDO1lBQzlFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzt5SEFqQ1Usd0JBQXdCO29FQUF4Qix3QkFBd0Isb0tBRnhCLENBQUMsc0JBQXNCLENBQUM7WUNuRHJDLDJGQUErQjs7WUFBaEIsbUNBQWM7OztpRkRxRGhCLHdCQUF3QjtjQVJwQyxTQUFTOzJCQUNFLG1CQUFtQixtQkFHWix1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJLGFBQzFCLENBQUMsc0JBQXNCLENBQUM7K0lBR2hCLGdCQUFnQjtrQkFBbEMsTUFBTTtZQUNHLGtCQUFrQjtrQkFBM0IsTUFBTTs7a0ZBRkksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZvcm1SZW5kZXJlclNlcnZpY2V9IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0FqZkNvbnRleHR9IGZyb20gJ0BhamYvY29yZS9jb21tb24nO1xuaW1wb3J0IHtldmFsdWF0ZUV4cHJlc3Npb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgQWpmQmFzZVdpZGdldENvbXBvbmVudCxcbiAgQWpmRmlsdGVySW5zdGFuY2UsXG4gIEFqZldpZGdldEluc3RhbmNlLFxuICB3aWRnZXRUb1dpZGdldEluc3RhbmNlLFxufSBmcm9tICdAYWpmL2NvcmUvcmVwb3J0cyc7XG5pbXBvcnQge1RyYW5zbG9jb1NlcnZpY2V9IGZyb20gJ0BhamYvY29yZS90cmFuc2xvY28nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgT3V0cHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1VudHlwZWRGb3JtR3JvdXB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7ZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgbWFwLCBzd2l0Y2hNYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1maWx0ZXItd2lkZ2V0JyxcbiAgdGVtcGxhdGVVcmw6ICdmaWx0ZXItd2lkZ2V0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnZmlsdGVyLXdpZGdldC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBwcm92aWRlcnM6IFtBamZGb3JtUmVuZGVyZXJTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmRmlsdGVyV2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWpmQmFzZVdpZGdldENvbXBvbmVudDxBamZXaWRnZXRJbnN0YW5jZT4ge1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgZmlsdGVyZWRJbnN0YW5jZTogT2JzZXJ2YWJsZTxBamZXaWRnZXRJbnN0YW5jZT47XG4gIEBPdXRwdXQoKSBmaWx0ZXJXaWRnZXRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHtjb250ZXh0OiBBamZDb250ZXh0LCB3aWRnZXQ6IEFqZldpZGdldEluc3RhbmNlfT4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX3RzOiBUcmFuc2xvY29TZXJ2aWNlLFxuICAgIHByaXZhdGUgX2Zvcm1SZW5kZXJlcjogQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbiAgKSB7XG4gICAgc3VwZXIoY2RyLCBlbCk7XG5cbiAgICB0aGlzLmZpbHRlcmVkSW5zdGFuY2UgPSB0aGlzLl9mb3JtUmVuZGVyZXIuZm9ybUdyb3VwLnBpcGUoXG4gICAgICBmaWx0ZXIoZmcgPT4gdGhpcy5pbnN0YW5jZSAhPSBudWxsICYmIHRoaXMuaW5zdGFuY2UuZmlsdGVyICE9IG51bGwgJiYgZmcgIT0gbnVsbCksXG4gICAgICBzd2l0Y2hNYXAoZm9ybUdyb3VwID0+IChmb3JtR3JvdXAgYXMgVW50eXBlZEZvcm1Hcm91cCkudmFsdWVDaGFuZ2VzKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKChhLCBiKSA9PiBKU09OLnN0cmluZ2lmeShhKSA9PT0gSlNPTi5zdHJpbmdpZnkoYikpLFxuICAgICAgbWFwKGZpbHRlckNvbnRleHQgPT4ge1xuICAgICAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuaW5zdGFuY2UgYXMgQWpmV2lkZ2V0SW5zdGFuY2U7XG4gICAgICAgIGNvbnN0IGZpbHRlciA9IGluc3RhbmNlLmZpbHRlciBhcyBBamZGaWx0ZXJJbnN0YW5jZTtcbiAgICAgICAgY29uc3QgbmV3Q29udGV4dDogYW55ID0gey4uLihmaWx0ZXIuY29udGV4dCB8fCB7fSksIC4uLmZpbHRlckNvbnRleHR9O1xuICAgICAgICBmb3IgKGNvbnN0IHZhcmlhYmxlIG9mIGZpbHRlci52YXJpYWJsZXMgfHwgW10pIHtcbiAgICAgICAgICBuZXdDb250ZXh0W3ZhcmlhYmxlLm5hbWVdID0gZXZhbHVhdGVFeHByZXNzaW9uKHZhcmlhYmxlLmZvcm11bGEuZm9ybXVsYSwgbmV3Q29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IHdpZGdldFRvV2lkZ2V0SW5zdGFuY2UoXG4gICAgICAgICAgaW5zdGFuY2Uud2lkZ2V0LFxuICAgICAgICAgIG5ld0NvbnRleHQsXG4gICAgICAgICAgdGhpcy5fdHMsXG4gICAgICAgICAgZmlsdGVyLnZhcmlhYmxlcyxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5maWx0ZXJXaWRnZXRDaGFuZ2UuZW1pdCh7Y29udGV4dDogZmlsdGVyQ29udGV4dCwgd2lkZ2V0OiB0aGlzLmluc3RhbmNlfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgICAgfSksXG4gICAgKTtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cImluc3RhbmNlXCI+XG4gIDxkaXYgKm5nSWY9XCJpbnN0YW5jZS5maWx0ZXIgYXMgZmlsdGVyXCIgY2xhc3M9XCJhamYtZmlsdGVyLWNvbnRhaW5lclwiPlxuICAgIDxhamYtZm9ybVxuICAgICAgW2Zvcm1dPVwiZmlsdGVyLmZvcm1cIlxuICAgICAgW2hhc1N0YXJ0TWVzc2FnZV09XCJmYWxzZVwiXG4gICAgICBbaGFzRW5kTWVzc2FnZV09XCJmYWxzZVwiXG4gICAgICBbaGlkZVRvcFRvb2xiYXJdPVwidHJ1ZVwiXG4gICAgICBbaGlkZUJvdHRvbVRvb2xiYXJdPVwidHJ1ZVwiXG4gICAgICBbaGlkZU5hdmlnYXRpb25CdXR0b25zXT1cInRydWVcIlxuICAgID48L2FqZi1mb3JtPlxuICA8L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuIl19