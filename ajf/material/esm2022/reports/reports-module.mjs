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
import { AjfChartModule } from '@ajf/core/chart';
import { AjfCommonModule } from '@ajf/core/common';
import { AjfGraphModule } from '@ajf/core/graph';
import { AjfHeatMapModule } from '@ajf/core/heat-map';
import { AjfMapModule } from '@ajf/core/map';
import { AjfPageBreakModule } from '@ajf/core/page-break';
import { AjfReportsModule as CoreModule } from '@ajf/core/reports';
import { AjfTableModule } from '@ajf/core/table';
import { AjfTextModule } from '@ajf/core/text';
import { AjfTranslocoModule } from '@ajf/core/transloco';
import { AjfFormsModule } from '@ajf/material/forms';
import { AjfImageModule } from '@ajf/material/image';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { AjfChartWidgetComponent } from './chart-widget';
import { AjfFilterWidgetComponent } from './filter-widget';
import { AjfFormulaWidgetComponent } from './formula-widget';
import { AjfHeatMapWidgetComponent } from './heat-map-widget';
import { AjfImageContainerWidgetComponent } from './image-container-widget';
import { AjfImageWidgetComponent } from './image-widget';
import { AjfMapWidgetComponent } from './map-widget';
import { AjfPageBreakWidgetComponent } from './page-break-widget';
import { AjfReportRenderer } from './report';
import { AjfTableWidgetComponent } from './table-widget';
import { AjfTextWidgetComponent } from './text-widget';
import { AjfColumnWidgetComponent, AjfDialogWidgetComponent, AjfLayoutWidgetComponent, AjfPaginatedListWidgetComponent, AjfPaginatedTableWidgetComponent, AjfReportWidget, } from './widget';
import { AjfGraphWidgetComponent } from './graph-widget';
import * as i0 from "@angular/core";
export class AjfReportsModule {
    static { this.ɵfac = function AjfReportsModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfReportsModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfReportsModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [AjfChartModule,
            AjfCommonModule,
            AjfImageModule,
            AjfFormsModule,
            AjfGraphModule,
            AjfHeatMapModule,
            AjfMapModule,
            AjfPageBreakModule,
            AjfTableModule,
            AjfTextModule,
            AjfTranslocoModule,
            CommonModule,
            CoreModule,
            MatDialogModule,
            MatSelectModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfReportsModule, [{
        type: NgModule,
        args: [{
                imports: [
                    AjfChartModule,
                    AjfCommonModule,
                    AjfImageModule,
                    AjfFormsModule,
                    AjfGraphModule,
                    AjfHeatMapModule,
                    AjfMapModule,
                    AjfPageBreakModule,
                    AjfTableModule,
                    AjfTextModule,
                    AjfTranslocoModule,
                    CommonModule,
                    CoreModule,
                    MatDialogModule,
                    MatSelectModule,
                ],
                declarations: [
                    AjfChartWidgetComponent,
                    AjfColumnWidgetComponent,
                    AjfDialogWidgetComponent,
                    AjfFilterWidgetComponent,
                    AjfFormulaWidgetComponent,
                    AjfHeatMapWidgetComponent,
                    AjfImageContainerWidgetComponent,
                    AjfImageWidgetComponent,
                    AjfGraphWidgetComponent,
                    AjfLayoutWidgetComponent,
                    AjfMapWidgetComponent,
                    AjfPageBreakWidgetComponent,
                    AjfPaginatedListWidgetComponent,
                    AjfPaginatedTableWidgetComponent,
                    AjfReportRenderer,
                    AjfReportWidget,
                    AjfTableWidgetComponent,
                    AjfTextWidgetComponent,
                ],
                exports: [AjfReportRenderer, AjfReportWidget],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AjfReportsModule, { declarations: [AjfChartWidgetComponent,
        AjfColumnWidgetComponent,
        AjfDialogWidgetComponent,
        AjfFilterWidgetComponent,
        AjfFormulaWidgetComponent,
        AjfHeatMapWidgetComponent,
        AjfImageContainerWidgetComponent,
        AjfImageWidgetComponent,
        AjfGraphWidgetComponent,
        AjfLayoutWidgetComponent,
        AjfMapWidgetComponent,
        AjfPageBreakWidgetComponent,
        AjfPaginatedListWidgetComponent,
        AjfPaginatedTableWidgetComponent,
        AjfReportRenderer,
        AjfReportWidget,
        AjfTableWidgetComponent,
        AjfTextWidgetComponent], imports: [AjfChartModule,
        AjfCommonModule,
        AjfImageModule,
        AjfFormsModule,
        AjfGraphModule,
        AjfHeatMapModule,
        AjfMapModule,
        AjfPageBreakModule,
        AjfTableModule,
        AjfTextModule,
        AjfTranslocoModule,
        CommonModule,
        CoreModule,
        MatDialogModule,
        MatSelectModule], exports: [AjfReportRenderer, AjfReportWidget] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0cy1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9yZXBvcnRzL3NyYy9yZXBvcnRzLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxnQkFBZ0IsSUFBSSxVQUFVLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUV6RCxPQUFPLEVBQUMs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QlAsaUJBQWlCLEVBQUUsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDaGFydE1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL2NoYXJ0JztcbmltcG9ydCB7QWpmQ29tbW9uTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvY29tbW9uJztcbmltcG9ydCB7QWpmR3JhcGhNb2R1bGV9IGZyb20gJ0BhamYvY29yZS9ncmFwaCc7XG5pbXBvcnQge0FqZkhlYXRNYXBNb2R1bGV9IGZyb20gJ0BhamYvY29yZS9oZWF0LW1hcCc7XG5pbXBvcnQge0FqZk1hcE1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL21hcCc7XG5pbXBvcnQge0FqZlBhZ2VCcmVha01vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL3BhZ2UtYnJlYWsnO1xuaW1wb3J0IHtBamZSZXBvcnRzTW9kdWxlIGFzIENvcmVNb2R1bGV9IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcbmltcG9ydCB7QWpmVGFibGVNb2R1bGV9IGZyb20gJ0BhamYvY29yZS90YWJsZSc7XG5pbXBvcnQge0FqZlRleHRNb2R1bGV9IGZyb20gJ0BhamYvY29yZS90ZXh0JztcbmltcG9ydCB7QWpmVHJhbnNsb2NvTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvdHJhbnNsb2NvJztcbmltcG9ydCB7QWpmRm9ybXNNb2R1bGV9IGZyb20gJ0BhamYvbWF0ZXJpYWwvZm9ybXMnO1xuaW1wb3J0IHtBamZJbWFnZU1vZHVsZX0gZnJvbSAnQGFqZi9tYXRlcmlhbC9pbWFnZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXREaWFsb2dNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQge01hdFNlbGVjdE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcblxuaW1wb3J0IHtBamZDaGFydFdpZGdldENvbXBvbmVudH0gZnJvbSAnLi9jaGFydC13aWRnZXQnO1xuaW1wb3J0IHtBamZGaWx0ZXJXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vZmlsdGVyLXdpZGdldCc7XG5pbXBvcnQge0FqZkZvcm11bGFXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vZm9ybXVsYS13aWRnZXQnO1xuaW1wb3J0IHtBamZIZWF0TWFwV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL2hlYXQtbWFwLXdpZGdldCc7XG5pbXBvcnQge0FqZkltYWdlQ29udGFpbmVyV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL2ltYWdlLWNvbnRhaW5lci13aWRnZXQnO1xuaW1wb3J0IHtBamZJbWFnZVdpZGdldENvbXBvbmVudH0gZnJvbSAnLi9pbWFnZS13aWRnZXQnO1xuaW1wb3J0IHtBamZNYXBXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vbWFwLXdpZGdldCc7XG5pbXBvcnQge0FqZlBhZ2VCcmVha1dpZGdldENvbXBvbmVudH0gZnJvbSAnLi9wYWdlLWJyZWFrLXdpZGdldCc7XG5pbXBvcnQge0FqZlJlcG9ydFJlbmRlcmVyfSBmcm9tICcuL3JlcG9ydCc7XG5pbXBvcnQge0FqZlRhYmxlV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL3RhYmxlLXdpZGdldCc7XG5pbXBvcnQge0FqZlRleHRXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vdGV4dC13aWRnZXQnO1xuaW1wb3J0IHtcbiAgQWpmQ29sdW1uV2lkZ2V0Q29tcG9uZW50LFxuICBBamZEaWFsb2dXaWRnZXRDb21wb25lbnQsXG4gIEFqZkxheW91dFdpZGdldENvbXBvbmVudCxcbiAgQWpmUGFnaW5hdGVkTGlzdFdpZGdldENvbXBvbmVudCxcbiAgQWpmUGFnaW5hdGVkVGFibGVXaWRnZXRDb21wb25lbnQsXG4gIEFqZlJlcG9ydFdpZGdldCxcbn0gZnJvbSAnLi93aWRnZXQnO1xuaW1wb3J0IHtBamZHcmFwaFdpZGdldENvbXBvbmVudH0gZnJvbSAnLi9ncmFwaC13aWRnZXQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQWpmQ2hhcnRNb2R1bGUsXG4gICAgQWpmQ29tbW9uTW9kdWxlLFxuICAgIEFqZkltYWdlTW9kdWxlLFxuICAgIEFqZkZvcm1zTW9kdWxlLFxuICAgIEFqZkdyYXBoTW9kdWxlLFxuICAgIEFqZkhlYXRNYXBNb2R1bGUsXG4gICAgQWpmTWFwTW9kdWxlLFxuICAgIEFqZlBhZ2VCcmVha01vZHVsZSxcbiAgICBBamZUYWJsZU1vZHVsZSxcbiAgICBBamZUZXh0TW9kdWxlLFxuICAgIEFqZlRyYW5zbG9jb01vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQ29yZU1vZHVsZSxcbiAgICBNYXREaWFsb2dNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBamZDaGFydFdpZGdldENvbXBvbmVudCxcbiAgICBBamZDb2x1bW5XaWRnZXRDb21wb25lbnQsXG4gICAgQWpmRGlhbG9nV2lkZ2V0Q29tcG9uZW50LFxuICAgIEFqZkZpbHRlcldpZGdldENvbXBvbmVudCxcbiAgICBBamZGb3JtdWxhV2lkZ2V0Q29tcG9uZW50LFxuICAgIEFqZkhlYXRNYXBXaWRnZXRDb21wb25lbnQsXG4gICAgQWpmSW1hZ2VDb250YWluZXJXaWRnZXRDb21wb25lbnQsXG4gICAgQWpmSW1hZ2VXaWRnZXRDb21wb25lbnQsXG4gICAgQWpmR3JhcGhXaWRnZXRDb21wb25lbnQsXG4gICAgQWpmTGF5b3V0V2lkZ2V0Q29tcG9uZW50LFxuICAgIEFqZk1hcFdpZGdldENvbXBvbmVudCxcbiAgICBBamZQYWdlQnJlYWtXaWRnZXRDb21wb25lbnQsXG4gICAgQWpmUGFnaW5hdGVkTGlzdFdpZGdldENvbXBvbmVudCxcbiAgICBBamZQYWdpbmF0ZWRUYWJsZVdpZGdldENvbXBvbmVudCxcbiAgICBBamZSZXBvcnRSZW5kZXJlcixcbiAgICBBamZSZXBvcnRXaWRnZXQsXG4gICAgQWpmVGFibGVXaWRnZXRDb21wb25lbnQsXG4gICAgQWpmVGV4dFdpZGdldENvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW0FqZlJlcG9ydFJlbmRlcmVyLCBBamZSZXBvcnRXaWRnZXRdLFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRzTW9kdWxlIHt9XG4iXX0=