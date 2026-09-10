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
import { AjfFieldService as CoreService, AjfFieldType, AjfFileFieldComponent, AjfImageFieldComponent, AjfReadOnlyDateFieldComponent, AjfReadOnlyFieldComponent, AjfReadOnlyFileFieldComponent, AjfReadOnlyGeolocationFieldComponent, AjfReadOnlyImageFieldComponent, AjfReadOnlySelectFieldComponent, AjfReadOnlyTableFieldComponent, AjfReadOnlyVideoUrlFieldComponent, } from '@ajf/core/forms';
import { Injectable } from '@angular/core';
import { AjfAudioFieldComponent } from './audio-field';
import { AjfBarcodeFieldComponent } from './barcode-field';
import { AjfBooleanFieldComponent } from './boolean-field';
import { AjfDateFieldComponent } from './date-field';
import { AjfDateInputFieldComponent } from './date-input-field';
import { AjfDisplayFieldComponent } from './display-field';
import { AjfEmptyFieldComponent } from './empty-field';
import { AjfInputFieldComponent } from './input-field';
import { AjfGeolocationFieldComponent } from './geolocation-field';
import { AjfMultipleChoiceFieldComponent } from './multiple-choice-field';
import { AjfRangeFieldComponent } from './range-field';
import { AjfSingleChoiceFieldComponent } from './single-choice-field';
import { AjfTableFieldComponent } from './table-field';
import { AjfTextFieldComponent } from './text-field';
import { AjfTimeFieldComponent } from './time-field';
import { AjfVideoUrlFieldComponent } from './video-url-field';
import { AjfSignatureFieldComponent } from './signature-field';
import * as i0 from "@angular/core";
export class AjfFieldService extends CoreService {
    constructor() {
        super();
        (this.componentsMap[AjfFieldType.String] = {
            component: AjfInputFieldComponent,
            readOnlyComponent: AjfReadOnlyFieldComponent,
        }),
            (this.componentsMap[AjfFieldType.Text] = {
                component: AjfTextFieldComponent,
                readOnlyComponent: AjfDisplayFieldComponent,
            }),
            (this.componentsMap[AjfFieldType.Number] = {
                component: AjfInputFieldComponent,
                readOnlyComponent: AjfReadOnlyFieldComponent,
                inputs: { type: 'number' },
            }),
            (this.componentsMap[AjfFieldType.Boolean] = {
                component: AjfBooleanFieldComponent,
                readOnlyComponent: AjfDisplayFieldComponent,
            }),
            (this.componentsMap[AjfFieldType.Formula] = {
                component: AjfInputFieldComponent,
                readOnlyComponent: AjfReadOnlyFieldComponent,
                inputs: { readonly: true },
            }),
            (this.componentsMap[AjfFieldType.DateRange] = {
                component: AjfDateFieldComponent,
                readOnlyComponent: AjfReadOnlyFieldComponent,
            }),
            (this.componentsMap[AjfFieldType.DateInput] = {
                component: AjfDateInputFieldComponent,
                readOnlyComponent: AjfReadOnlyDateFieldComponent,
            }),
            (this.componentsMap[AjfFieldType.Table] = {
                component: AjfTableFieldComponent,
                readOnlyComponent: AjfReadOnlyTableFieldComponent,
            }),
            (this.componentsMap[AjfFieldType.Empty] = { component: AjfEmptyFieldComponent }),
            (this.componentsMap[AjfFieldType.SingleChoice] = {
                component: AjfSingleChoiceFieldComponent,
                readOnlyComponent: AjfReadOnlySelectFieldComponent,
            }),
            (this.componentsMap[AjfFieldType.MultipleChoice] = {
                component: AjfMultipleChoiceFieldComponent,
                readOnlyComponent: AjfReadOnlySelectFieldComponent,
            }),
            (this.componentsMap[AjfFieldType.Time] = {
                component: AjfTimeFieldComponent,
                readOnlyComponent: AjfReadOnlyFieldComponent,
            }),
            (this.componentsMap[AjfFieldType.Barcode] = {
                component: AjfBarcodeFieldComponent,
                readOnlyComponent: AjfReadOnlyFieldComponent,
            });
        this.componentsMap[AjfFieldType.Signature] = {
            component: AjfSignatureFieldComponent,
            readOnlyComponent: AjfReadOnlyImageFieldComponent,
        };
        this.componentsMap[AjfFieldType.Geolocation] = {
            component: AjfGeolocationFieldComponent,
            readOnlyComponent: AjfReadOnlyGeolocationFieldComponent,
        };
        this.componentsMap[AjfFieldType.File] = {
            component: AjfFileFieldComponent,
            readOnlyComponent: AjfReadOnlyFileFieldComponent,
        };
        this.componentsMap[AjfFieldType.Image] = {
            component: AjfImageFieldComponent,
            readOnlyComponent: AjfReadOnlyImageFieldComponent,
        };
        this.componentsMap[AjfFieldType.VideoUrl] = {
            component: AjfVideoUrlFieldComponent,
            readOnlyComponent: AjfReadOnlyVideoUrlFieldComponent,
        };
        this.componentsMap[AjfFieldType.Range] = {
            component: AjfRangeFieldComponent,
            readOnlyComponent: AjfReadOnlyFieldComponent,
        };
        this.componentsMap[AjfFieldType.Audio] = {
            component: AjfAudioFieldComponent,
            readOnlyComponent: AjfReadOnlyFileFieldComponent,
        };
    }
    static { this.ɵfac = function AjfFieldService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFieldService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AjfFieldService, factory: AjfFieldService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFieldService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [], null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm1zL3NyYy9maWVsZC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFDTCxlQUFlLElBQUksV0FBVyxFQUM5QixZQUFZLEVBQ1oscUJBQXFCLEVBQ3JCLHNCQUFzQixFQUN0Qiw2QkFBNkIsRUFDN0IseUJBQXlCLEVBQ3pCLDZCQUE2QixFQUM3QixvQ0FBb0MsRUFDcEMsOEJBQThCLEVBQzlCLCtCQUErQixFQUMvQiw4QkFBOEIsRUFDOUIsaUNBQWlDLEdBQ2xDLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ25ELE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzlELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFDLDRCQUE0QixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDakUsT0FBTyxFQUFDLCtCQUErQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDeEUsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FB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TUFBTTs7aUZBQ2xCLGVBQWU7Y0FEM0IsVUFBVTtlQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmRmllbGRTZXJ2aWNlIGFzIENvcmVTZXJ2aWNlLFxuICBBamZGaWVsZFR5cGUsXG4gIEFqZkZpbGVGaWVsZENvbXBvbmVudCxcbiAgQWpmSW1hZ2VGaWVsZENvbXBvbmVudCxcbiAgQWpmUmVhZE9ubHlEYXRlRmllbGRDb21wb25lbnQsXG4gIEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnQsXG4gIEFqZlJlYWRPbmx5RmlsZUZpZWxkQ29tcG9uZW50LFxuICBBamZSZWFkT25seUdlb2xvY2F0aW9uRmllbGRDb21wb25lbnQsXG4gIEFqZlJlYWRPbmx5SW1hZ2VGaWVsZENvbXBvbmVudCxcbiAgQWpmUmVhZE9ubHlTZWxlY3RGaWVsZENvbXBvbmVudCxcbiAgQWpmUmVhZE9ubHlUYWJsZUZpZWxkQ29tcG9uZW50LFxuICBBamZSZWFkT25seVZpZGVvVXJsRmllbGRDb21wb25lbnQsXG59IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZkF1ZGlvRmllbGRDb21wb25lbnR9IGZyb20gJy4vYXVkaW8tZmllbGQnO1xuaW1wb3J0IHtBamZCYXJjb2RlRmllbGRDb21wb25lbnR9IGZyb20gJy4vYmFyY29kZS1maWVsZCc7XG5pbXBvcnQge0FqZkJvb2xlYW5GaWVsZENvbXBvbmVudH0gZnJvbSAnLi9ib29sZWFuLWZpZWxkJztcbmltcG9ydCB7QWpmRGF0ZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2RhdGUtZmllbGQnO1xuaW1wb3J0IHtBamZEYXRlSW5wdXRGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9kYXRlLWlucHV0LWZpZWxkJztcbmltcG9ydCB7QWpmRGlzcGxheUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2Rpc3BsYXktZmllbGQnO1xuaW1wb3J0IHtBamZFbXB0eUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2VtcHR5LWZpZWxkJztcbmltcG9ydCB7QWpmSW5wdXRGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9pbnB1dC1maWVsZCc7XG5pbXBvcnQge0FqZkdlb2xvY2F0aW9uRmllbGRDb21wb25lbnR9IGZyb20gJy4vZ2VvbG9jYXRpb24tZmllbGQnO1xuaW1wb3J0IHtBamZNdWx0aXBsZUNob2ljZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL211bHRpcGxlLWNob2ljZS1maWVsZCc7XG5pbXBvcnQge0FqZlJhbmdlRmllbGRDb21wb25lbnR9IGZyb20gJy4vcmFuZ2UtZmllbGQnO1xuaW1wb3J0IHtBamZTaW5nbGVDaG9pY2VGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9zaW5nbGUtY2hvaWNlLWZpZWxkJztcbmltcG9ydCB7QWpmVGFibGVGaWVsZENvbXBvbmVudH0gZnJvbSAnLi90YWJsZS1maWVsZCc7XG5pbXBvcnQge0FqZlRleHRGaWVsZENvbXBvbmVudH0gZnJvbSAnLi90ZXh0LWZpZWxkJztcbmltcG9ydCB7QWpmVGltZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3RpbWUtZmllbGQnO1xuaW1wb3J0IHtBamZWaWRlb1VybEZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3ZpZGVvLXVybC1maWVsZCc7XG5pbXBvcnQge0FqZlNpZ25hdHVyZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3NpZ25hdHVyZS1maWVsZCc7XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIEFqZkZpZWxkU2VydmljZSBleHRlbmRzIENvcmVTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICAodGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5TdHJpbmddID0ge1xuICAgICAgY29tcG9uZW50OiBBamZJbnB1dEZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnQsXG4gICAgfSksXG4gICAgICAodGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5UZXh0XSA9IHtcbiAgICAgICAgY29tcG9uZW50OiBBamZUZXh0RmllbGRDb21wb25lbnQsXG4gICAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZEaXNwbGF5RmllbGRDb21wb25lbnQsXG4gICAgICB9KSxcbiAgICAgICh0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLk51bWJlcl0gPSB7XG4gICAgICAgIGNvbXBvbmVudDogQWpmSW5wdXRGaWVsZENvbXBvbmVudCxcbiAgICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnQsXG4gICAgICAgIGlucHV0czoge3R5cGU6ICdudW1iZXInfSxcbiAgICAgIH0pLFxuICAgICAgKHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuQm9vbGVhbl0gPSB7XG4gICAgICAgIGNvbXBvbmVudDogQWpmQm9vbGVhbkZpZWxkQ29tcG9uZW50LFxuICAgICAgICByZWFkT25seUNvbXBvbmVudDogQWpmRGlzcGxheUZpZWxkQ29tcG9uZW50LFxuICAgICAgfSksXG4gICAgICAodGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5Gb3JtdWxhXSA9IHtcbiAgICAgICAgY29tcG9uZW50OiBBamZJbnB1dEZpZWxkQ29tcG9uZW50LFxuICAgICAgICByZWFkT25seUNvbXBvbmVudDogQWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudCxcbiAgICAgICAgaW5wdXRzOiB7cmVhZG9ubHk6IHRydWV9LFxuICAgICAgfSksXG4gICAgICAodGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5EYXRlUmFuZ2VdID0ge1xuICAgICAgICBjb21wb25lbnQ6IEFqZkRhdGVGaWVsZENvbXBvbmVudCxcbiAgICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnQsXG4gICAgICB9KSxcbiAgICAgICh0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLkRhdGVJbnB1dF0gPSB7XG4gICAgICAgIGNvbXBvbmVudDogQWpmRGF0ZUlucHV0RmllbGRDb21wb25lbnQsXG4gICAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seURhdGVGaWVsZENvbXBvbmVudCxcbiAgICAgIH0pLFxuICAgICAgKHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuVGFibGVdID0ge1xuICAgICAgICBjb21wb25lbnQ6IEFqZlRhYmxlRmllbGRDb21wb25lbnQsXG4gICAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seVRhYmxlRmllbGRDb21wb25lbnQsXG4gICAgICB9KSxcbiAgICAgICh0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLkVtcHR5XSA9IHtjb21wb25lbnQ6IEFqZkVtcHR5RmllbGRDb21wb25lbnR9KSxcbiAgICAgICh0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLlNpbmdsZUNob2ljZV0gPSB7XG4gICAgICAgIGNvbXBvbmVudDogQWpmU2luZ2xlQ2hvaWNlRmllbGRDb21wb25lbnQsXG4gICAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seVNlbGVjdEZpZWxkQ29tcG9uZW50LFxuICAgICAgfSksXG4gICAgICAodGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5NdWx0aXBsZUNob2ljZV0gPSB7XG4gICAgICAgIGNvbXBvbmVudDogQWpmTXVsdGlwbGVDaG9pY2VGaWVsZENvbXBvbmVudCxcbiAgICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5U2VsZWN0RmllbGRDb21wb25lbnQsXG4gICAgICB9KSxcbiAgICAgICh0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLlRpbWVdID0ge1xuICAgICAgICBjb21wb25lbnQ6IEFqZlRpbWVGaWVsZENvbXBvbmVudCxcbiAgICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnQsXG4gICAgICB9KSxcbiAgICAgICh0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLkJhcmNvZGVdID0ge1xuICAgICAgICBjb21wb25lbnQ6IEFqZkJhcmNvZGVGaWVsZENvbXBvbmVudCxcbiAgICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnQsXG4gICAgICB9KTtcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLlNpZ25hdHVyZV0gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZlNpZ25hdHVyZUZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5SW1hZ2VGaWVsZENvbXBvbmVudCxcbiAgICB9O1xuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuR2VvbG9jYXRpb25dID0ge1xuICAgICAgY29tcG9uZW50OiBBamZHZW9sb2NhdGlvbkZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5R2VvbG9jYXRpb25GaWVsZENvbXBvbmVudCxcbiAgICB9O1xuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuRmlsZV0gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZkZpbGVGaWVsZENvbXBvbmVudCxcbiAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seUZpbGVGaWVsZENvbXBvbmVudCxcbiAgICB9O1xuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuSW1hZ2VdID0ge1xuICAgICAgY29tcG9uZW50OiBBamZJbWFnZUZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5SW1hZ2VGaWVsZENvbXBvbmVudCxcbiAgICB9O1xuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuVmlkZW9VcmxdID0ge1xuICAgICAgY29tcG9uZW50OiBBamZWaWRlb1VybEZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5VmlkZW9VcmxGaWVsZENvbXBvbmVudCxcbiAgICB9O1xuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuUmFuZ2VdID0ge1xuICAgICAgY29tcG9uZW50OiBBamZSYW5nZUZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnQsXG4gICAgfTtcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLkF1ZGlvXSA9IHtcbiAgICAgIGNvbXBvbmVudDogQWpmQXVkaW9GaWVsZENvbXBvbmVudCxcbiAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seUZpbGVGaWVsZENvbXBvbmVudCxcbiAgICB9O1xuICB9XG59XG4iXX0=