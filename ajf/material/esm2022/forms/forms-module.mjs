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
import { AJF_WARNING_ALERT_SERVICE, AjfFormsModule as CoreFormsModule } from '@ajf/core/forms';
import { AjfTranslocoModule } from '@ajf/core/transloco';
import { AjfBarcodeModule } from '@ajf/material/barcode';
import { AjfAudioModule } from '@ajf/material/audio';
import { AjfCalendarModule } from '@ajf/material/calendar';
import { AjfCheckboxGroupModule } from '@ajf/material/checkbox-group';
import { AjfGeolocationModule } from '@ajf/material/geolocation';
import { AjfPageSliderModule } from '@ajf/material/page-slider';
import { AjfTimeModule } from '@ajf/material/time';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AjfAudioFieldComponent } from './audio-field';
import { AjfBarcodeFieldComponent } from './barcode-field';
import { AjfBooleanFieldComponent } from './boolean-field';
import { AjfDateFieldComponent } from './date-field';
import { AjfDateInputFieldComponent } from './date-input-field';
import { AjfEmptyFieldComponent } from './empty-field';
import { AjfCurrentSlidePipe } from './current-slide';
import { AjfFormField } from './field';
import { AjfFieldRow } from './field-row';
import { AjfFieldService } from './field-service';
import { AjfFieldWarningDialog } from './field-warning-dialog';
import { AjfFormRenderer } from './form';
import { AjfGeolocationFieldComponent } from './geolocation-field';
import { AjfInputFieldComponent } from './input-field';
import { AjfMultipleChoiceFieldComponent } from './multiple-choice-field';
import { AjfRangeFieldComponent } from './range-field';
import { AjfRepStrip } from './rep-strip';
import { AjfSignatureFieldComponent } from './signature-field';
import { AjfSingleChoiceFieldComponent } from './single-choice-field';
import { AjfSlideHeader } from './slide-header';
import { AjfFormIssuesPipe, AjfSlideCompletionPipe, AjfSlideIssuesPipe } from './slide-stats';
import { AjfTableFieldComponent } from './table-field';
import { AjfTextFieldComponent } from './text-field';
import { AjfTimeFieldComponent } from './time-field';
import { AjfVideoUrlFieldComponent } from './video-url-field';
import { AjfWarningAlertService } from './warning-alert-service';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AjfSignatureModule } from '@ajf/material/signature';
import { QuillModule } from 'ngx-quill';
import { AjfDisplayFieldComponent } from './display-field';
import * as i0 from "@angular/core";
import * as i1 from "ngx-quill";
export class AjfFormsModule {
    static forRoot() {
        return {
            ngModule: AjfFormsModule,
            providers: [AjfFieldService],
        };
    }
    static { this.ɵfac = function AjfFormsModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFormsModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfFormsModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
            AjfFieldService,
            { provide: AJF_WARNING_ALERT_SERVICE, useClass: AjfWarningAlertService },
        ], imports: [AjfAudioModule,
            AjfBarcodeModule,
            AjfCalendarModule,
            AjfCommonModule,
            AjfCheckboxGroupModule,
            AjfGeolocationModule,
            AjfPageSliderModule,
            AjfSignatureModule,
            AjfTimeModule,
            AjfTranslocoModule,
            CommonModule,
            CoreFormsModule,
            MatButtonModule,
            MatButtonToggleModule,
            MatCardModule,
            MatDatepickerModule,
            MatDialogModule,
            MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            MatMenuModule,
            MatNativeDateModule,
            MatRadioModule,
            MatSelectModule,
            MatSlideToggleModule,
            MatToolbarModule,
            MatTooltipModule,
            ReactiveFormsModule,
            TextFieldModule,
            MatSliderModule,
            NgxMatSelectSearchModule,
            QuillModule.forRoot()] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFormsModule, [{
        type: NgModule,
        args: [{
                imports: [
                    AjfAudioModule,
                    AjfBarcodeModule,
                    AjfCalendarModule,
                    AjfCommonModule,
                    AjfCheckboxGroupModule,
                    AjfGeolocationModule,
                    AjfPageSliderModule,
                    AjfSignatureModule,
                    AjfTimeModule,
                    AjfTranslocoModule,
                    CommonModule,
                    CoreFormsModule,
                    MatButtonModule,
                    MatButtonToggleModule,
                    MatCardModule,
                    MatDatepickerModule,
                    MatDialogModule,
                    MatFormFieldModule,
                    MatIconModule,
                    MatInputModule,
                    MatMenuModule,
                    MatNativeDateModule,
                    MatRadioModule,
                    MatSelectModule,
                    MatSlideToggleModule,
                    MatToolbarModule,
                    MatTooltipModule,
                    ReactiveFormsModule,
                    TextFieldModule,
                    MatSliderModule,
                    NgxMatSelectSearchModule,
                    QuillModule.forRoot(),
                ],
                declarations: [
                    AjfAudioFieldComponent,
                    AjfCurrentSlidePipe,
                    AjfBarcodeFieldComponent,
                    AjfBooleanFieldComponent,
                    AjfDateFieldComponent,
                    AjfDateInputFieldComponent,
                    AjfEmptyFieldComponent,
                    AjfFieldRow,
                    AjfFieldWarningDialog,
                    AjfFormField,
                    AjfFormIssuesPipe,
                    AjfFormRenderer,
                    AjfGeolocationFieldComponent,
                    AjfInputFieldComponent,
                    AjfMultipleChoiceFieldComponent,
                    AjfRangeFieldComponent,
                    AjfRepStrip,
                    AjfSignatureFieldComponent,
                    AjfSingleChoiceFieldComponent,
                    AjfSlideCompletionPipe,
                    AjfSlideHeader,
                    AjfSlideIssuesPipe,
                    AjfTableFieldComponent,
                    AjfTextFieldComponent,
                    AjfTimeFieldComponent,
                    AjfVideoUrlFieldComponent,
                    AjfDisplayFieldComponent,
                ],
                exports: [AjfFieldRow, AjfFormField, AjfFormRenderer, AjfRepStrip, AjfSlideHeader],
                providers: [
                    AjfFieldService,
                    { provide: AJF_WARNING_ALERT_SERVICE, useClass: AjfWarningAlertService },
                ],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AjfFormsModule, { declarations: [AjfAudioFieldComponent,
        AjfCurrentSlidePipe,
        AjfBarcodeFieldComponent,
        AjfBooleanFieldComponent,
        AjfDateFieldComponent,
        AjfDateInputFieldComponent,
        AjfEmptyFieldComponent,
        AjfFieldRow,
        AjfFieldWarningDialog,
        AjfFormField,
        AjfFormIssuesPipe,
        AjfFormRenderer,
        AjfGeolocationFieldComponent,
        AjfInputFieldComponent,
        AjfMultipleChoiceFieldComponent,
        AjfRangeFieldComponent,
        AjfRepStrip,
        AjfSignatureFieldComponent,
        AjfSingleChoiceFieldComponent,
        AjfSlideCompletionPipe,
        AjfSlideHeader,
        AjfSlideIssuesPipe,
        AjfTableFieldComponent,
        AjfTextFieldComponent,
        AjfTimeFieldComponent,
        AjfVideoUrlFieldComponent,
        AjfDisplayFieldComponent], imports: [AjfAudioModule,
        AjfBarcodeModule,
        AjfCalendarModule,
        AjfCommonModule,
        AjfCheckboxGroupModule,
        AjfGeolocationModule,
        AjfPageSliderModule,
        AjfSignatureModule,
        AjfTimeModule,
        AjfTranslocoModule,
        CommonModule,
        CoreFormsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatDatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatNativeDateModule,
        MatRadioModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatToolbarModule,
        MatTooltipModule,
        ReactiveFormsModule,
        TextFieldModule,
        MatSliderModule,
        NgxMatSelectSearchModule, i1.QuillModule], exports: [AjfFieldRow, AjfFormField, AjfFormRenderer, AjfRepStrip, AjfSlideHeader] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMtbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvZm9ybXMvc3JjL2Zvcm1zLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFDLHlCQUF5QixFQUFFLGNBQWMsSUFBSSxlQUFlLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3RixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDcEUsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDL0QsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDOUQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFzQixRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGlDQUFpQyxDQUFD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QjtRQUN0QixtQkFBbUI7UUFDbkIsd0JBQXdCO1FBQ3hCLHdCQUF3QjtRQUN4QixxQkFBcUI7UUFDckIsMEJBQTBCO1FBQzFCLHNCQUFzQjtRQUN0QixXQUFXO1FBQ1gscUJBQXFCO1FBQ3JCLFlBQVk7UUFDWixpQkFBaUI7UUFDakIsZUFBZTtRQUNmLDRCQUE0QjtRQUM1QixzQkFBc0I7UUFDdEIsK0JBQStCO1FBQy9CLHNCQUFzQjtRQUN0QixXQUFXO1FBQ1gsMEJBQTBCO1FBQzFCLDZCQUE2QjtRQUM3QixzQkFBc0I7UUFDdEIsY0FBYztRQUNkLGtCQUFrQjtRQUNsQixzQkFBc0I7UUFDdEIscUJBQXFCO1FBQ3JCLHFCQUFxQjtRQUNyQix5QkFBeUI7UUFDekIsd0JBQXdCLGFBNUR4QixjQUFjO1FBQ2QsZ0JBQWdCO1FBQ2hCLGlCQUFpQjtRQUNqQixlQUFlO1FBQ2Ysc0JBQXNCO1FBQ3RCLG9CQUFvQjtRQUNwQixtQkFBbUI7UUFDbkIsa0JBQWtCO1FBQ2xCLGFBQWE7UUFDYixrQkFBa0I7UUFDbEIsWUFBWTtRQUNaLGVBQWU7UUFDZixlQUFlO1FBQ2YscUJBQXFCO1FBQ3JCLGFBQWE7UUFDYixtQkFBbUI7UUFDbkIsZUFBZTtRQUNmLGtCQUFrQjtRQUNsQixhQUFhO1FBQ2IsY0FBYztRQUNkLGFBQWE7UUFDYixtQkFBbUI7UUFDbkIsY0FBYztRQUNkLGVBQWU7UUFDZixvQkFBb0I7UUFDcEIsZ0JBQWdCO1FBQ2hCLGdCQUFnQjtRQUNoQixtQkFBbUI7UUFDbkIsZUFBZTtRQUNmLGVBQWU7UUFDZix3QkFBd0IsNkJBZ0NoQixXQUFXLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb21tb25Nb2R1bGV9IGZyb20gJ0BhamYvY29yZS9jb21tb24nO1xuaW1wb3J0IHtBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFLCBBamZGb3Jtc01vZHVsZSBhcyBDb3JlRm9ybXNNb2R1bGV9IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0FqZlRyYW5zbG9jb01vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL3RyYW5zbG9jbyc7XG5pbXBvcnQge0FqZkJhcmNvZGVNb2R1bGV9IGZyb20gJ0BhamYvbWF0ZXJpYWwvYmFyY29kZSc7XG5pbXBvcnQge0FqZkF1ZGlvTW9kdWxlfSBmcm9tICdAYWpmL21hdGVyaWFsL2F1ZGlvJztcbmltcG9ydCB7QWpmQ2FsZW5kYXJNb2R1bGV9IGZyb20gJ0BhamYvbWF0ZXJpYWwvY2FsZW5kYXInO1xuaW1wb3J0IHtBamZDaGVja2JveEdyb3VwTW9kdWxlfSBmcm9tICdAYWpmL21hdGVyaWFsL2NoZWNrYm94LWdyb3VwJztcbmltcG9ydCB7QWpmR2VvbG9jYXRpb25Nb2R1bGV9IGZyb20gJ0BhamYvbWF0ZXJpYWwvZ2VvbG9jYXRpb24nO1xuaW1wb3J0IHtBamZQYWdlU2xpZGVyTW9kdWxlfSBmcm9tICdAYWpmL21hdGVyaWFsL3BhZ2Utc2xpZGVyJztcbmltcG9ydCB7QWpmVGltZU1vZHVsZX0gZnJvbSAnQGFqZi9tYXRlcmlhbC90aW1lJztcbmltcG9ydCB7VGV4dEZpZWxkTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvdGV4dC1maWVsZCc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge01hdEJ1dHRvbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7TWF0QnV0dG9uVG9nZ2xlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24tdG9nZ2xlJztcbmltcG9ydCB7TWF0Q2FyZE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2FyZCc7XG5pbXBvcnQge01hdERhdGVwaWNrZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RhdGVwaWNrZXInO1xuaW1wb3J0IHtNYXROYXRpdmVEYXRlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TWF0RGlhbG9nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtNYXRGb3JtRmllbGRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHtNYXRJY29uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7TWF0TWVudU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbWVudSc7XG5pbXBvcnQge01hdElucHV0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XG5pbXBvcnQge01hdFJhZGlvTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9yYWRpbyc7XG5pbXBvcnQge01hdFNlbGVjdE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcbmltcG9ydCB7TWF0U2xpZGVUb2dnbGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NsaWRlLXRvZ2dsZSc7XG5pbXBvcnQge01hdFNsaWRlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2xpZGVyJztcbmltcG9ydCB7TWF0VG9vbGJhck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbGJhcic7XG5pbXBvcnQge01hdFRvb2x0aXBNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXAnO1xuXG5pbXBvcnQge0FqZkF1ZGlvRmllbGRDb21wb25lbnR9IGZyb20gJy4vYXVkaW8tZmllbGQnO1xuaW1wb3J0IHtBamZCYXJjb2RlRmllbGRDb21wb25lbnR9IGZyb20gJy4vYmFyY29kZS1maWVsZCc7XG5pbXBvcnQge0FqZkJvb2xlYW5GaWVsZENvbXBvbmVudH0gZnJvbSAnLi9ib29sZWFuLWZpZWxkJztcbmltcG9ydCB7QWpmRGF0ZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2RhdGUtZmllbGQnO1xuaW1wb3J0IHtBamZEYXRlSW5wdXRGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9kYXRlLWlucHV0LWZpZWxkJztcbmltcG9ydCB7QWpmRW1wdHlGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9lbXB0eS1maWVsZCc7XG5pbXBvcnQge0FqZkN1cnJlbnRTbGlkZVBpcGV9IGZyb20gJy4vY3VycmVudC1zbGlkZSc7XG5pbXBvcnQge0FqZkZvcm1GaWVsZH0gZnJvbSAnLi9maWVsZCc7XG5pbXBvcnQge0FqZkZpZWxkUm93fSBmcm9tICcuL2ZpZWxkLXJvdyc7XG5pbXBvcnQge0FqZkZpZWxkU2VydmljZX0gZnJvbSAnLi9maWVsZC1zZXJ2aWNlJztcbmltcG9ydCB7QWpmRmllbGRXYXJuaW5nRGlhbG9nfSBmcm9tICcuL2ZpZWxkLXdhcm5pbmctZGlhbG9nJztcbmltcG9ydCB7QWpmRm9ybVJlbmRlcmVyfSBmcm9tICcuL2Zvcm0nO1xuaW1wb3J0IHtBamZHZW9sb2NhdGlvbkZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2dlb2xvY2F0aW9uLWZpZWxkJztcbmltcG9ydCB7QWpmSW5wdXRGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9pbnB1dC1maWVsZCc7XG5pbXBvcnQge0FqZk11bHRpcGxlQ2hvaWNlRmllbGRDb21wb25lbnR9IGZyb20gJy4vbXVsdGlwbGUtY2hvaWNlLWZpZWxkJztcbmltcG9ydCB7QWpmUmFuZ2VGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9yYW5nZS1maWVsZCc7XG5pbXBvcnQge0FqZlJlcFN0cmlwfSBmcm9tICcuL3JlcC1zdHJpcCc7XG5pbXBvcnQge0FqZlNpZ25hdHVyZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3NpZ25hdHVyZS1maWVsZCc7XG5pbXBvcnQge0FqZlNpbmdsZUNob2ljZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3NpbmdsZS1jaG9pY2UtZmllbGQnO1xuaW1wb3J0IHtBamZTbGlkZUhlYWRlcn0gZnJvbSAnLi9zbGlkZS1oZWFkZXInO1xuaW1wb3J0IHtBamZGb3JtSXNzdWVzUGlwZSwgQWpmU2xpZGVDb21wbGV0aW9uUGlwZSwgQWpmU2xpZGVJc3N1ZXNQaXBlfSBmcm9tICcuL3NsaWRlLXN0YXRzJztcbmltcG9ydCB7QWpmVGFibGVGaWVsZENvbXBvbmVudH0gZnJvbSAnLi90YWJsZS1maWVsZCc7XG5pbXBvcnQge0FqZlRleHRGaWVsZENvbXBvbmVudH0gZnJvbSAnLi90ZXh0LWZpZWxkJztcbmltcG9ydCB7QWpmVGltZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3RpbWUtZmllbGQnO1xuaW1wb3J0IHtBamZWaWRlb1VybEZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3ZpZGVvLXVybC1maWVsZCc7XG5pbXBvcnQge0FqZldhcm5pbmdBbGVydFNlcnZpY2V9IGZyb20gJy4vd2FybmluZy1hbGVydC1zZXJ2aWNlJztcbmltcG9ydCB7Tmd4TWF0U2VsZWN0U2VhcmNoTW9kdWxlfSBmcm9tICduZ3gtbWF0LXNlbGVjdC1zZWFyY2gnO1xuaW1wb3J0IHtBamZTaWduYXR1cmVNb2R1bGV9IGZyb20gJ0BhamYvbWF0ZXJpYWwvc2lnbmF0dXJlJztcbmltcG9ydCB7UXVpbGxNb2R1bGV9IGZyb20gJ25neC1xdWlsbCc7XG5pbXBvcnQge0FqZkRpc3BsYXlGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9kaXNwbGF5LWZpZWxkJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEFqZkF1ZGlvTW9kdWxlLFxuICAgIEFqZkJhcmNvZGVNb2R1bGUsXG4gICAgQWpmQ2FsZW5kYXJNb2R1bGUsXG4gICAgQWpmQ29tbW9uTW9kdWxlLFxuICAgIEFqZkNoZWNrYm94R3JvdXBNb2R1bGUsXG4gICAgQWpmR2VvbG9jYXRpb25Nb2R1bGUsXG4gICAgQWpmUGFnZVNsaWRlck1vZHVsZSxcbiAgICBBamZTaWduYXR1cmVNb2R1bGUsXG4gICAgQWpmVGltZU1vZHVsZSxcbiAgICBBamZUcmFuc2xvY29Nb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIENvcmVGb3Jtc01vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcbiAgICBNYXREaWFsb2dNb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICAgIE1hdFJhZGlvTW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBUZXh0RmllbGRNb2R1bGUsXG4gICAgTWF0U2xpZGVyTW9kdWxlLFxuICAgIE5neE1hdFNlbGVjdFNlYXJjaE1vZHVsZSxcbiAgICBRdWlsbE1vZHVsZS5mb3JSb290KCksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFqZkF1ZGlvRmllbGRDb21wb25lbnQsXG4gICAgQWpmQ3VycmVudFNsaWRlUGlwZSxcbiAgICBBamZCYXJjb2RlRmllbGRDb21wb25lbnQsXG4gICAgQWpmQm9vbGVhbkZpZWxkQ29tcG9uZW50LFxuICAgIEFqZkRhdGVGaWVsZENvbXBvbmVudCxcbiAgICBBamZEYXRlSW5wdXRGaWVsZENvbXBvbmVudCxcbiAgICBBamZFbXB0eUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZkZpZWxkUm93LFxuICAgIEFqZkZpZWxkV2FybmluZ0RpYWxvZyxcbiAgICBBamZGb3JtRmllbGQsXG4gICAgQWpmRm9ybUlzc3Vlc1BpcGUsXG4gICAgQWpmRm9ybVJlbmRlcmVyLFxuICAgIEFqZkdlb2xvY2F0aW9uRmllbGRDb21wb25lbnQsXG4gICAgQWpmSW5wdXRGaWVsZENvbXBvbmVudCxcbiAgICBBamZNdWx0aXBsZUNob2ljZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlJhbmdlRmllbGRDb21wb25lbnQsXG4gICAgQWpmUmVwU3RyaXAsXG4gICAgQWpmU2lnbmF0dXJlRmllbGRDb21wb25lbnQsXG4gICAgQWpmU2luZ2xlQ2hvaWNlRmllbGRDb21wb25lbnQsXG4gICAgQWpmU2xpZGVDb21wbGV0aW9uUGlwZSxcbiAgICBBamZTbGlkZUhlYWRlcixcbiAgICBBamZTbGlkZUlzc3Vlc1BpcGUsXG4gICAgQWpmVGFibGVGaWVsZENvbXBvbmVudCxcbiAgICBBamZUZXh0RmllbGRDb21wb25lbnQsXG4gICAgQWpmVGltZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlZpZGVvVXJsRmllbGRDb21wb25lbnQsXG4gICAgQWpmRGlzcGxheUZpZWxkQ29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbQWpmRmllbGRSb3csIEFqZkZvcm1GaWVsZCwgQWpmRm9ybVJlbmRlcmVyLCBBamZSZXBTdHJpcCwgQWpmU2xpZGVIZWFkZXJdLFxuICBwcm92aWRlcnM6IFtcbiAgICBBamZGaWVsZFNlcnZpY2UsXG4gICAge3Byb3ZpZGU6IEFKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UsIHVzZUNsYXNzOiBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmRm9ybXNNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEFqZkZvcm1zTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBBamZGb3Jtc01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW0FqZkZpZWxkU2VydmljZV0sXG4gICAgfTtcbiAgfVxufVxuIl19