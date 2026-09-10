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
import { AjfCommonModule } from '@ajf/core/common';
import { AjfFileInputModule } from '@ajf/core/file-input';
import { AjfTranslocoModule } from '@ajf/core/transloco';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AjfAsFieldInstancePipe } from './as-field-instance';
import { AjfAsRepeatingSlideInstancePipe } from './as-repeating-slide-instance';
import { AjfBoolToIntPipe } from './bool-to-int';
import { AjfDateValuePipe } from './date-value';
import { AjfDateValueStringPipe } from './date-value-string';
import { AjfExpandFieldWithChoicesPipe } from './expand-input-with-choices';
import { AjfFieldHost } from './field-host';
import { AjfFieldIconPipe } from './field-icon';
import { AjfFieldIsValidPipe } from './field-is-valid';
import { AjfFieldTypeLabelPipe } from './field-type-label';
import { AjfFileFieldComponent } from './file-field';
import { AjfFormRendererService } from './form-renderer';
import { AjfFormStringIdentifierPipe } from './form-string-identifier';
import { AjfGetTableCellControlPipe } from './get-table-cell-control';
import { AjfImageFieldComponent } from './image-field';
import { AjfIncrementPipe } from './increment';
import { AjfIsCellEditablePipe } from './is-cell-editable';
import { AjfIsReadonlyInputFieldPipe } from './is-readonly-input-field';
import { AjfIsRepeatingSlideInstancePipe } from './is-repeating-slide';
import { AjfNodeCompleteNamePipe } from './node-complete-name';
import { AjfRangePipe } from './range';
import { AjfReadOnlyFieldComponent } from './read-only-field';
import { AjfReadOnlyDateFieldComponent } from './read-only-date-field';
import { AjfReadOnlyFileFieldComponent } from './read-only-file-field';
import { AjfReadOnlyGeolocationFieldComponent } from './read-only-geolocation-field';
import { AjfReadOnlyImageFieldComponent } from './read-only-image-field';
import { AjfReadOnlySelectFieldComponent } from './read-only-select-field';
import { AjfReadOnlyTableFieldComponent } from './read-only-table-field';
import { AjfReadOnlyVideoUrlFieldComponent } from './read-only-video-url-field';
import { AjfTableRowClass } from './table-row-class';
import { AjfTableVisibleColumnsPipe } from './table-visible-columns';
import { AjfValidSlidePipe } from './valid-slide';
import { AjfValidationService } from './validation-service';
import { AjfAsFieldInstanceErrorsPipe } from './as-validation-errors-string';
import * as i0 from "@angular/core";
export class AjfFormsModule {
    static { this.ɵfac = function AjfFormsModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFormsModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfFormsModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
            AjfDateValueStringPipe,
            AjfFormRendererService,
            AjfValidationService,
            provideHttpClient(withInterceptorsFromDi()),
        ], imports: [AjfCommonModule,
            AjfFileInputModule,
            CommonModule,
            ReactiveFormsModule,
            AjfTranslocoModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFormsModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    AjfAsFieldInstancePipe,
                    AjfAsFieldInstanceErrorsPipe,
                    AjfAsRepeatingSlideInstancePipe,
                    AjfBoolToIntPipe,
                    AjfDateValuePipe,
                    AjfDateValueStringPipe,
                    AjfExpandFieldWithChoicesPipe,
                    AjfFieldHost,
                    AjfFieldIconPipe,
                    AjfFieldIsValidPipe,
                    AjfFieldTypeLabelPipe,
                    AjfFileFieldComponent,
                    AjfFormStringIdentifierPipe,
                    AjfGetTableCellControlPipe,
                    AjfImageFieldComponent,
                    AjfIncrementPipe,
                    AjfIsCellEditablePipe,
                    AjfIsReadonlyInputFieldPipe,
                    AjfIsRepeatingSlideInstancePipe,
                    AjfNodeCompleteNamePipe,
                    AjfRangePipe,
                    AjfReadOnlyFieldComponent,
                    AjfReadOnlyDateFieldComponent,
                    AjfReadOnlyFileFieldComponent,
                    AjfReadOnlyGeolocationFieldComponent,
                    AjfReadOnlyImageFieldComponent,
                    AjfReadOnlySelectFieldComponent,
                    AjfReadOnlyTableFieldComponent,
                    AjfReadOnlyVideoUrlFieldComponent,
                    AjfTableRowClass,
                    AjfTableVisibleColumnsPipe,
                    AjfValidSlidePipe,
                ],
                exports: [
                    AjfAsFieldInstancePipe,
                    AjfAsFieldInstanceErrorsPipe,
                    AjfAsRepeatingSlideInstancePipe,
                    AjfBoolToIntPipe,
                    AjfDateValuePipe,
                    AjfDateValueStringPipe,
                    AjfExpandFieldWithChoicesPipe,
                    AjfFieldHost,
                    AjfFieldIconPipe,
                    AjfFieldIsValidPipe,
                    AjfFieldTypeLabelPipe,
                    AjfFileFieldComponent,
                    AjfFormStringIdentifierPipe,
                    AjfGetTableCellControlPipe,
                    AjfImageFieldComponent,
                    AjfIncrementPipe,
                    AjfIsCellEditablePipe,
                    AjfIsReadonlyInputFieldPipe,
                    AjfIsRepeatingSlideInstancePipe,
                    AjfNodeCompleteNamePipe,
                    AjfRangePipe,
                    AjfReadOnlyFieldComponent,
                    AjfReadOnlyDateFieldComponent,
                    AjfReadOnlyFileFieldComponent,
                    AjfReadOnlyGeolocationFieldComponent,
                    AjfReadOnlyImageFieldComponent,
                    AjfReadOnlySelectFieldComponent,
                    AjfReadOnlyTableFieldComponent,
                    AjfReadOnlyVideoUrlFieldComponent,
                    AjfTableRowClass,
                    AjfTableVisibleColumnsPipe,
                    AjfValidSlidePipe,
                ],
                imports: [
                    AjfCommonModule,
                    AjfFileInputModule,
                    CommonModule,
                    ReactiveFormsModule,
                    AjfTranslocoModule,
                ],
                providers: [
                    AjfDateValueStringPipe,
                    AjfFormRendererService,
                    AjfValidationService,
                    provideHttpClient(withInterceptorsFromDi()),
                ],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AjfFormsModule, { declarations: [AjfAsFieldInstancePipe,
        AjfAsFieldInstanceErrorsPipe,
        AjfAsRepeatingSlideInstancePipe,
        AjfBoolToIntPipe,
        AjfDateValuePipe,
        AjfDateValueStringPipe,
        AjfExpandFieldWithChoicesPipe,
        AjfFieldHost,
        AjfFieldIconPipe,
        AjfFieldIsValidPipe,
        AjfFieldTypeLabelPipe,
        AjfFileFieldComponent,
        AjfFormStringIdentifierPipe,
        AjfGetTableCellControlPipe,
        AjfImageFieldComponent,
        AjfIncrementPipe,
        AjfIsCellEditablePipe,
        AjfIsReadonlyInputFieldPipe,
        AjfIsRepeatingSlideInstancePipe,
        AjfNodeCompleteNamePipe,
        AjfRangePipe,
        AjfReadOnlyFieldComponent,
        AjfReadOnlyDateFieldComponent,
        AjfReadOnlyFileFieldComponent,
        AjfReadOnlyGeolocationFieldComponent,
        AjfReadOnlyImageFieldComponent,
        AjfReadOnlySelectFieldComponent,
        AjfReadOnlyTableFieldComponent,
        AjfReadOnlyVideoUrlFieldComponent,
        AjfTableRowClass,
        AjfTableVisibleColumnsPipe,
        AjfValidSlidePipe], imports: [AjfCommonModule,
        AjfFileInputModule,
        CommonModule,
        ReactiveFormsModule,
        AjfTranslocoModule], exports: [AjfAsFieldInstancePipe,
        AjfAsFieldInstanceErrorsPipe,
        AjfAsRepeatingSlideInstancePipe,
        AjfBoolToIntPipe,
        AjfDateValuePipe,
        AjfDateValueStringPipe,
        AjfExpandFieldWithChoicesPipe,
        AjfFieldHost,
        AjfFieldIconPipe,
        AjfFieldIsValidPipe,
        AjfFieldTypeLabelPipe,
        AjfFileFieldComponent,
        AjfFormStringIdentifierPipe,
        AjfGetTableCellControlPipe,
        AjfImageFieldComponent,
        AjfIncrementPipe,
        AjfIsCellEditablePipe,
        AjfIsReadonlyInputFieldPipe,
        AjfIsRepeatingSlideInstancePipe,
        AjfNodeCompleteNamePipe,
        AjfRangePipe,
        AjfReadOnlyFieldComponent,
        AjfReadOnlyDateFieldComponent,
        AjfReadOnlyFileFieldComponent,
        AjfReadOnlyGeolocationFieldComponent,
        AjfReadOnlyImageFieldComponent,
        AjfReadOnlySelectFieldComponent,
        AjfReadOnlyTableFieldComponent,
        AjfReadOnlyVideoUrlFieldComponent,
        AjfTableRowClass,
        AjfTableVisibleColumnsPipe,
        AjfValidSlidePipe] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMtbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvZm9ybXMtbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGlCQUFpQixFQUFFLHNCQUFzQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDL0UsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuRCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsK0JBQStCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzlDLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzNELE9BQU8sRUFBQyw2QkFBNkIsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzFFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDMUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzlDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ3JELE9BQU8sRUFB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QkFBdUI7UUFDdkIsWUFBWTtRQUNaLHlCQUF5QjtRQUN6Qiw2QkFBNkI7UUFDN0IsNkJBQTZCO1FBQzdCLG9DQUFvQztRQUNwQyw4QkFBOEI7UUFDOUIsK0JBQStCO1FBQy9CLDhCQUE4QjtRQUM5QixpQ0FBaUM7UUFDakMsZ0JBQWdCO1FBQ2hCLDBCQUEwQjtRQUMxQixpQkFBaUIsYUFxQ2pCLGVBQWU7UUFDZixrQkFBa0I7UUFDbEIsWUFBWTtRQUNaLG1CQUFtQjtRQUNuQixrQkFBa0IsYUF0Q2xCLHNCQUFzQjtRQUN0Qiw0QkFBNEI7UUFDNUIsK0JBQStCO1FBQy9CLGdCQUFnQjtRQUNoQixnQkFBZ0I7UUFDaEIsc0JBQXNCO1FBQ3RCLDZCQUE2QjtRQUM3QixZQUFZO1FBQ1osZ0JBQWdCO1FBQ2hCLG1CQUFtQjtRQUNuQixxQkFBcUI7UUFDckIscUJBQXFCO1FBQ3JCLDJCQUEyQjtRQUMzQiwwQkFBMEI7UUFDMUIsc0JBQXNCO1FBQ3RCLGdCQUFnQjtRQUNoQixxQkFBcUI7UUFDckIsMkJBQTJCO1FBQzNCLCtCQUErQjtRQUMvQix1QkFBdUI7UUFDdkIsWUFBWTtRQUNaLHlCQUF5QjtRQUN6Qiw2QkFBNkI7UUFDN0IsNkJBQTZCO1FBQzdCLG9DQUFvQztRQUNwQyw4QkFBOEI7UUFDOUIsK0JBQStCO1FBQy9CLDhCQUE4QjtRQUM5QixpQ0FBaUM7UUFDakMsZ0JBQWdCO1FBQ2hCLDBCQUEwQjtRQUMxQixpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29tbW9uTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvY29tbW9uJztcbmltcG9ydCB7QWpmRmlsZUlucHV0TW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvZmlsZS1pbnB1dCc7XG5pbXBvcnQge0FqZlRyYW5zbG9jb01vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL3RyYW5zbG9jbyc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7cHJvdmlkZUh0dHBDbGllbnQsIHdpdGhJbnRlcmNlcHRvcnNGcm9tRGl9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7QWpmQXNGaWVsZEluc3RhbmNlUGlwZX0gZnJvbSAnLi9hcy1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkFzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZVBpcGV9IGZyb20gJy4vYXMtcmVwZWF0aW5nLXNsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmQm9vbFRvSW50UGlwZX0gZnJvbSAnLi9ib29sLXRvLWludCc7XG5pbXBvcnQge0FqZkRhdGVWYWx1ZVBpcGV9IGZyb20gJy4vZGF0ZS12YWx1ZSc7XG5pbXBvcnQge0FqZkRhdGVWYWx1ZVN0cmluZ1BpcGV9IGZyb20gJy4vZGF0ZS12YWx1ZS1zdHJpbmcnO1xuaW1wb3J0IHtBamZFeHBhbmRGaWVsZFdpdGhDaG9pY2VzUGlwZX0gZnJvbSAnLi9leHBhbmQtaW5wdXQtd2l0aC1jaG9pY2VzJztcbmltcG9ydCB7QWpmRmllbGRIb3N0fSBmcm9tICcuL2ZpZWxkLWhvc3QnO1xuaW1wb3J0IHtBamZGaWVsZEljb25QaXBlfSBmcm9tICcuL2ZpZWxkLWljb24nO1xuaW1wb3J0IHtBamZGaWVsZElzVmFsaWRQaXBlfSBmcm9tICcuL2ZpZWxkLWlzLXZhbGlkJztcbmltcG9ydCB7QWpmRmllbGRUeXBlTGFiZWxQaXBlfSBmcm9tICcuL2ZpZWxkLXR5cGUtbGFiZWwnO1xuaW1wb3J0IHtBamZGaWxlRmllbGRDb21wb25lbnR9IGZyb20gJy4vZmlsZS1maWVsZCc7XG5pbXBvcnQge0FqZkZvcm1SZW5kZXJlclNlcnZpY2V9IGZyb20gJy4vZm9ybS1yZW5kZXJlcic7XG5pbXBvcnQge0FqZkZvcm1TdHJpbmdJZGVudGlmaWVyUGlwZX0gZnJvbSAnLi9mb3JtLXN0cmluZy1pZGVudGlmaWVyJztcbmltcG9ydCB7QWpmR2V0VGFibGVDZWxsQ29udHJvbFBpcGV9IGZyb20gJy4vZ2V0LXRhYmxlLWNlbGwtY29udHJvbCc7XG5pbXBvcnQge0FqZkltYWdlRmllbGRDb21wb25lbnR9IGZyb20gJy4vaW1hZ2UtZmllbGQnO1xuaW1wb3J0IHtBamZJbmNyZW1lbnRQaXBlfSBmcm9tICcuL2luY3JlbWVudCc7XG5pbXBvcnQge0FqZklzQ2VsbEVkaXRhYmxlUGlwZX0gZnJvbSAnLi9pcy1jZWxsLWVkaXRhYmxlJztcbmltcG9ydCB7QWpmSXNSZWFkb25seUlucHV0RmllbGRQaXBlfSBmcm9tICcuL2lzLXJlYWRvbmx5LWlucHV0LWZpZWxkJztcbmltcG9ydCB7QWpmSXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlUGlwZX0gZnJvbSAnLi9pcy1yZXBlYXRpbmctc2xpZGUnO1xuaW1wb3J0IHtBamZOb2RlQ29tcGxldGVOYW1lUGlwZX0gZnJvbSAnLi9ub2RlLWNvbXBsZXRlLW5hbWUnO1xuaW1wb3J0IHtBamZSYW5nZVBpcGV9IGZyb20gJy4vcmFuZ2UnO1xuaW1wb3J0IHtBamZSZWFkT25seUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3JlYWQtb25seS1maWVsZCc7XG5pbXBvcnQge0FqZlJlYWRPbmx5RGF0ZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3JlYWQtb25seS1kYXRlLWZpZWxkJztcbmltcG9ydCB7QWpmUmVhZE9ubHlGaWxlRmllbGRDb21wb25lbnR9IGZyb20gJy4vcmVhZC1vbmx5LWZpbGUtZmllbGQnO1xuaW1wb3J0IHtBamZSZWFkT25seUdlb2xvY2F0aW9uRmllbGRDb21wb25lbnR9IGZyb20gJy4vcmVhZC1vbmx5LWdlb2xvY2F0aW9uLWZpZWxkJztcbmltcG9ydCB7QWpmUmVhZE9ubHlJbWFnZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3JlYWQtb25seS1pbWFnZS1maWVsZCc7XG5pbXBvcnQge0FqZlJlYWRPbmx5U2VsZWN0RmllbGRDb21wb25lbnR9IGZyb20gJy4vcmVhZC1vbmx5LXNlbGVjdC1maWVsZCc7XG5pbXBvcnQge0FqZlJlYWRPbmx5VGFibGVGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9yZWFkLW9ubHktdGFibGUtZmllbGQnO1xuaW1wb3J0IHtBamZSZWFkT25seVZpZGVvVXJsRmllbGRDb21wb25lbnR9IGZyb20gJy4vcmVhZC1vbmx5LXZpZGVvLXVybC1maWVsZCc7XG5pbXBvcnQge0FqZlRhYmxlUm93Q2xhc3N9IGZyb20gJy4vdGFibGUtcm93LWNsYXNzJztcbmltcG9ydCB7QWpmVGFibGVWaXNpYmxlQ29sdW1uc1BpcGV9IGZyb20gJy4vdGFibGUtdmlzaWJsZS1jb2x1bW5zJztcbmltcG9ydCB7QWpmVmFsaWRTbGlkZVBpcGV9IGZyb20gJy4vdmFsaWQtc2xpZGUnO1xuaW1wb3J0IHtBamZWYWxpZGF0aW9uU2VydmljZX0gZnJvbSAnLi92YWxpZGF0aW9uLXNlcnZpY2UnO1xuaW1wb3J0IHtBamZBc0ZpZWxkSW5zdGFuY2VFcnJvcnNQaXBlfSBmcm9tICcuL2FzLXZhbGlkYXRpb24tZXJyb3JzLXN0cmluZyc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFqZkFzRmllbGRJbnN0YW5jZVBpcGUsXG4gICAgQWpmQXNGaWVsZEluc3RhbmNlRXJyb3JzUGlwZSxcbiAgICBBamZBc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2VQaXBlLFxuICAgIEFqZkJvb2xUb0ludFBpcGUsXG4gICAgQWpmRGF0ZVZhbHVlUGlwZSxcbiAgICBBamZEYXRlVmFsdWVTdHJpbmdQaXBlLFxuICAgIEFqZkV4cGFuZEZpZWxkV2l0aENob2ljZXNQaXBlLFxuICAgIEFqZkZpZWxkSG9zdCxcbiAgICBBamZGaWVsZEljb25QaXBlLFxuICAgIEFqZkZpZWxkSXNWYWxpZFBpcGUsXG4gICAgQWpmRmllbGRUeXBlTGFiZWxQaXBlLFxuICAgIEFqZkZpbGVGaWVsZENvbXBvbmVudCxcbiAgICBBamZGb3JtU3RyaW5nSWRlbnRpZmllclBpcGUsXG4gICAgQWpmR2V0VGFibGVDZWxsQ29udHJvbFBpcGUsXG4gICAgQWpmSW1hZ2VGaWVsZENvbXBvbmVudCxcbiAgICBBamZJbmNyZW1lbnRQaXBlLFxuICAgIEFqZklzQ2VsbEVkaXRhYmxlUGlwZSxcbiAgICBBamZJc1JlYWRvbmx5SW5wdXRGaWVsZFBpcGUsXG4gICAgQWpmSXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlUGlwZSxcbiAgICBBamZOb2RlQ29tcGxldGVOYW1lUGlwZSxcbiAgICBBamZSYW5nZVBpcGUsXG4gICAgQWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seURhdGVGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seUZpbGVGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seUdlb2xvY2F0aW9uRmllbGRDb21wb25lbnQsXG4gICAgQWpmUmVhZE9ubHlJbWFnZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlJlYWRPbmx5U2VsZWN0RmllbGRDb21wb25lbnQsXG4gICAgQWpmUmVhZE9ubHlUYWJsZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlJlYWRPbmx5VmlkZW9VcmxGaWVsZENvbXBvbmVudCxcbiAgICBBamZUYWJsZVJvd0NsYXNzLFxuICAgIEFqZlRhYmxlVmlzaWJsZUNvbHVtbnNQaXBlLFxuICAgIEFqZlZhbGlkU2xpZGVQaXBlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQWpmQXNGaWVsZEluc3RhbmNlUGlwZSxcbiAgICBBamZBc0ZpZWxkSW5zdGFuY2VFcnJvcnNQaXBlLFxuICAgIEFqZkFzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZVBpcGUsXG4gICAgQWpmQm9vbFRvSW50UGlwZSxcbiAgICBBamZEYXRlVmFsdWVQaXBlLFxuICAgIEFqZkRhdGVWYWx1ZVN0cmluZ1BpcGUsXG4gICAgQWpmRXhwYW5kRmllbGRXaXRoQ2hvaWNlc1BpcGUsXG4gICAgQWpmRmllbGRIb3N0LFxuICAgIEFqZkZpZWxkSWNvblBpcGUsXG4gICAgQWpmRmllbGRJc1ZhbGlkUGlwZSxcbiAgICBBamZGaWVsZFR5cGVMYWJlbFBpcGUsXG4gICAgQWpmRmlsZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyUGlwZSxcbiAgICBBamZHZXRUYWJsZUNlbGxDb250cm9sUGlwZSxcbiAgICBBamZJbWFnZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZkluY3JlbWVudFBpcGUsXG4gICAgQWpmSXNDZWxsRWRpdGFibGVQaXBlLFxuICAgIEFqZklzUmVhZG9ubHlJbnB1dEZpZWxkUGlwZSxcbiAgICBBamZJc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2VQaXBlLFxuICAgIEFqZk5vZGVDb21wbGV0ZU5hbWVQaXBlLFxuICAgIEFqZlJhbmdlUGlwZSxcbiAgICBBamZSZWFkT25seUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlJlYWRPbmx5RGF0ZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlJlYWRPbmx5RmlsZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlJlYWRPbmx5R2VvbG9jYXRpb25GaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seUltYWdlRmllbGRDb21wb25lbnQsXG4gICAgQWpmUmVhZE9ubHlTZWxlY3RGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seVRhYmxlRmllbGRDb21wb25lbnQsXG4gICAgQWpmUmVhZE9ubHlWaWRlb1VybEZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlRhYmxlUm93Q2xhc3MsXG4gICAgQWpmVGFibGVWaXNpYmxlQ29sdW1uc1BpcGUsXG4gICAgQWpmVmFsaWRTbGlkZVBpcGUsXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBBamZDb21tb25Nb2R1bGUsXG4gICAgQWpmRmlsZUlucHV0TW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIEFqZlRyYW5zbG9jb01vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQWpmRGF0ZVZhbHVlU3RyaW5nUGlwZSxcbiAgICBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICAgIEFqZlZhbGlkYXRpb25TZXJ2aWNlLFxuICAgIHByb3ZpZGVIdHRwQ2xpZW50KHdpdGhJbnRlcmNlcHRvcnNGcm9tRGkoKSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZvcm1zTW9kdWxlIHt9XG4iXX0=