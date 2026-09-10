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
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AjfGetColumnContentPipe } from './get-column-content';
import { AjfReportStringIdentifierPipe } from './report-string-identifier';
import { AjfWidgetExport } from './widget-export';
import { AjfWidgetHost } from './widget-host';
import * as i0 from "@angular/core";
export class AjfReportsModule {
    static { this.ɵfac = function AjfReportsModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfReportsModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfReportsModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfReportsModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    AjfGetColumnContentPipe,
                    AjfReportStringIdentifierPipe,
                    AjfWidgetHost,
                    AjfWidgetExport,
                ],
                imports: [CommonModule],
                exports: [AjfGetColumnContentPipe, AjfReportStringIdentifierPipe, AjfWidgetHost, AjfWidgetExport],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AjfReportsModule, { declarations: [AjfGetColumnContentPipe,
        AjfReportStringIdentifierPipe,
        AjfWidgetHost,
        AjfWidgetExport], imports: [CommonModule], exports: [AjfGetColumnContentPipe, AjfReportStringIdentifierPipe, AjfWidgetHost, AjfWidgetExport] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0cy1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3JlcG9ydHMvc3JjL3JlcG9ydHMtbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXZDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzdELE9BQU8sRUFBQyw2QkFBNkIsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3pFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQVk1QyxNQUFNLE9BQU8sZ0JBQWdCO2lIQUFoQixnQkFBZ0I7bUVBQWhCLGdCQUFnQjt1RUFIakIsWUFBWTs7aUZBR1gsZ0JBQWdCO2NBVjVCLFFBQVE7ZUFBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1osdUJBQXVCO29CQUN2Qiw2QkFBNkI7b0JBQzdCLGFBQWE7b0JBQ2IsZUFBZTtpQkFDaEI7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSw2QkFBNkIsRUFBRSxhQUFhLEVBQUUsZUFBZSxDQUFDO2FBQ2xHOzt3RkFDWSxnQkFBZ0IsbUJBUnpCLHVCQUF1QjtRQUN2Qiw2QkFBNkI7UUFDN0IsYUFBYTtRQUNiLGVBQWUsYUFFUCxZQUFZLGFBQ1osdUJBQXVCLEVBQUUsNkJBQTZCLEVBQUUsYUFBYSxFQUFFLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmR2V0Q29sdW1uQ29udGVudFBpcGV9IGZyb20gJy4vZ2V0LWNvbHVtbi1jb250ZW50JztcbmltcG9ydCB7QWpmUmVwb3J0U3RyaW5nSWRlbnRpZmllclBpcGV9IGZyb20gJy4vcmVwb3J0LXN0cmluZy1pZGVudGlmaWVyJztcbmltcG9ydCB7QWpmV2lkZ2V0RXhwb3J0fSBmcm9tICcuL3dpZGdldC1leHBvcnQnO1xuaW1wb3J0IHtBamZXaWRnZXRIb3N0fSBmcm9tICcuL3dpZGdldC1ob3N0JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQWpmR2V0Q29sdW1uQ29udGVudFBpcGUsXG4gICAgQWpmUmVwb3J0U3RyaW5nSWRlbnRpZmllclBpcGUsXG4gICAgQWpmV2lkZ2V0SG9zdCxcbiAgICBBamZXaWRnZXRFeHBvcnQsXG4gIF0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbQWpmR2V0Q29sdW1uQ29udGVudFBpcGUsIEFqZlJlcG9ydFN0cmluZ0lkZW50aWZpZXJQaXBlLCBBamZXaWRnZXRIb3N0LCBBamZXaWRnZXRFeHBvcnRdLFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRzTW9kdWxlIHt9XG4iXX0=