import * as i1$1 from '@ajf/core/forms';
import { AjfBaseFieldComponent, AJF_WARNING_ALERT_SERVICE, isRepeatingSlideInstance, AjfAudioFieldComponent as AjfAudioFieldComponent$1, AjfInputFieldComponent as AjfInputFieldComponent$1, AjfFieldWithChoicesComponent, AJF_SEARCH_ALERT_THRESHOLD, AjfTableFieldComponent as AjfTableFieldComponent$1, AjfVideoUrlFieldComponent as AjfVideoUrlFieldComponent$1, AjfFieldService as AjfFieldService$1, AjfReadOnlyFieldComponent, AjfFieldType, AjfReadOnlyDateFieldComponent, AjfReadOnlyTableFieldComponent, AjfReadOnlySelectFieldComponent, AjfReadOnlyImageFieldComponent, AjfReadOnlyGeolocationFieldComponent, AjfReadOnlyFileFieldComponent, AjfFileFieldComponent, AjfImageFieldComponent, AjfReadOnlyVideoUrlFieldComponent, AjfFormField as AjfFormField$1, isFieldInstance, nodeInstanceCompleteName, AjfFormRenderer as AjfFormRenderer$1, AjfFormsModule as AjfFormsModule$1 } from '@ajf/core/forms';
import * as i0 from '@angular/core';
import { ViewEncapsulation, ChangeDetectionStrategy, Component, Injectable, Inject, Pipe, ViewChild, Optional, HostBinding, Input, EventEmitter, Output, NgModule } from '@angular/core';
import * as i2$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from '@angular/material/slide-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import * as i4 from '@angular/forms';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import * as i5 from '@ngneat/transloco';
import { map, switchMap, startWith, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import * as i1 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i2 from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import * as i2$2 from '@ajf/material/calendar';
import { AjfCalendarModule } from '@ajf/material/calendar';
import { MatInput, MatInputModule } from '@angular/material/input';
import * as i4$1 from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import * as i2$3 from '@ajf/material/audio';
import { AjfAudioModule } from '@ajf/material/audio';
import * as i2$4 from '@ajf/material/barcode';
import { AjfBarcodeModule } from '@ajf/material/barcode';
import * as i4$2 from '@ajf/core/common';
import { AjfCommonModule } from '@ajf/core/common';
import * as i2$5 from '@ajf/material/geolocation';
import { AjfGeolocationModule } from '@ajf/material/geolocation';
import { Subject, Subscription, of, combineLatest, merge, EMPTY } from 'rxjs';
import * as i2$6 from '@ajf/material/checkbox-group';
import { AjfCheckboxGroupModule } from '@ajf/material/checkbox-group';
import * as i3$1 from '@ajf/core/checkbox-group';
import * as i2$7 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i6 from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import * as i7 from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import * as i9 from 'ngx-mat-select-search';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AjfRange } from '@ajf/core/range';
import * as i5$1 from '@angular/material/slider';
import { MatSliderModule } from '@angular/material/slider';
import * as i4$3 from 'ngx-quill';
import { QuillModule } from 'ngx-quill';
import * as i2$8 from '@ajf/material/time';
import { AjfTimeModule } from '@ajf/material/time';
import * as i2$9 from '@angular/platform-browser';
import * as i3$2 from '@angular/common/http';
import * as i2$a from '@ajf/material/signature';
import { AjfSignatureModule } from '@ajf/material/signature';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i3$3 from '@angular/material/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as i2$b from '@ajf/core/page-slider';
import * as i3$5 from '@ajf/material/page-slider';
import { AjfPageSliderModule } from '@ajf/material/page-slider';
import * as i3$4 from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';
import { AjfTranslocoModule } from '@ajf/core/transloco';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';

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
class AjfFieldWarningDialog {
    constructor() {
        this.message = '';
    }
    static { this.ɵfac = function AjfFieldWarningDialog_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFieldWarningDialog)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFieldWarningDialog, selectors: [["ng-component"]], decls: 7, vars: 3, consts: [[3, "innerHTML"], ["mat-button", "", 3, "mat-dialog-close"]], template: function AjfFieldWarningDialog_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "mat-dialog-content");
            i0.ɵɵelement(1, "div", 0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(2, "mat-dialog-actions")(3, "button", 1);
            i0.ɵɵtext(4, "Ok");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "button", 1);
            i0.ɵɵtext(6, "Cancel");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("innerHTML", ctx.message, i0.ɵɵsanitizeHtml);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("mat-dialog-close", true);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("mat-dialog-close", false);
        } }, dependencies: [i1.MatButton, i2.MatDialogClose, i2.MatDialogActions, i2.MatDialogContent], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFieldWarningDialog, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<mat-dialog-content><div [innerHTML]=\"message\"></div></mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button [mat-dialog-close]=\"true\">Ok</button>\n  <button mat-button [mat-dialog-close]=\"false\">Cancel</button>\n</mat-dialog-actions>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFieldWarningDialog, { className: "AjfFieldWarningDialog", filePath: "field-warning-dialog.ts", lineNumber: 30 }); })();

class AjfWarningAlertService {
    constructor(_dialog) {
        this._dialog = _dialog;
    }
    showWarningAlertPrompt(warnings) {
        const dialog = this._dialog.open(AjfFieldWarningDialog);
        dialog.componentInstance.message = warnings.join('<br>');
        return dialog.afterClosed().pipe(map((result) => ({ result })));
    }
    static { this.ɵfac = function AjfWarningAlertService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfWarningAlertService)(i0.ɵɵinject(i2.MatDialog)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AjfWarningAlertService, factory: AjfWarningAlertService.ɵfac }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfWarningAlertService, [{
        type: Injectable
    }], () => [{ type: i2.MatDialog }], null); })();

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
function AjfBooleanFieldComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "mat-slide-toggle", 1);
    i0.ɵɵelementStart(2, "span", 2);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "transloco");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctrl_r1 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("formControl", ctrl_r1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 2, ctrl_r1.value ? "Yes" : "No"));
} }
class AjfBooleanFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
    static { this.ɵfac = function AjfBooleanFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfBooleanFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1$1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfBooleanFieldComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 2, vars: 3, consts: [[4, "ngIf"], [3, "formControl"], [1, "ajf-bool-label"]], template: function AjfBooleanFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfBooleanFieldComponent_ng_container_0_Template, 5, 4, "ng-container", 0);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.control));
        } }, dependencies: [i2$1.NgIf, i3.MatSlideToggle, i4.NgControlStatus, i4.FormControlDirective, i5.TranslocoPipe, i2$1.AsyncPipe], styles: ["ajf-field .ajf-bool-label{color:var(--ajf-text);font-size:14px}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfBooleanFieldComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container *ngIf=\"control | async as ctrl\">\n  <mat-slide-toggle [formControl]=\"ctrl!\"></mat-slide-toggle>\n  <span class=\"ajf-bool-label\">{{ (ctrl.value ? 'Yes' : 'No') | transloco }}</span>\n</ng-container>\n", styles: ["ajf-field .ajf-bool-label{color:var(--ajf-text);font-size:14px}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1$1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfBooleanFieldComponent, { className: "AjfBooleanFieldComponent", filePath: "boolean-field.ts", lineNumber: 43 }); })();

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
const pageCount = (slide) => isRepeatingSlideInstance(slide) ? Math.max(1, slide.reps) : 1;
/**
 * Resolve the page slider's current page into a slide.
 *
 * The renderer lays out one page per slide, and one page per repetition of a
 * repeating slide, optionally preceded by a start message page -- the same
 * arithmetic the error navigation in `AjfFormRenderer` performs.
 *
 * Impure, because slide visibility and repetition counts are mutated in place.
 * The result is memoized so that the pipe keeps handing back the same object
 * while nothing has moved: returning a fresh one on every check would trip
 * Angular's "expression has changed after it was checked" guard.
 */
class AjfCurrentSlidePipe {
    constructor() {
        this._last = null;
    }
    transform(slides, currentPage, hasStartMessage, hasEndMessage = false) {
        const visible = (slides || []).filter(s => s.visible !== false);
        const offset = hasStartMessage ? 1 : 0;
        const next = {
            slide: null,
            repIndex: 0,
            reps: 0,
            displayNumber: Math.max(1, (currentPage || 0) + 1),
            total: visible.length,
            pages: offset +
                (hasEndMessage ? 1 : 0) +
                visible.reduce((count, slide) => count + pageCount(slide), 0),
        };
        let page = (currentPage || 0) - offset;
        if (page >= 0) {
            for (let i = 0; i < visible.length; i++) {
                const slide = visible[i];
                const pages = pageCount(slide);
                if (page < pages) {
                    next.slide = slide;
                    next.repIndex = page;
                    next.reps = isRepeatingSlideInstance(slide)
                        ? slide.reps
                        : 0;
                    next.displayNumber = i + 1 + offset;
                    break;
                }
                page -= pages;
            }
        }
        const last = this._last;
        if (last != null &&
            last.slide === next.slide &&
            last.repIndex === next.repIndex &&
            last.reps === next.reps &&
            last.displayNumber === next.displayNumber &&
            last.total === next.total &&
            last.pages === next.pages) {
            return last;
        }
        this._last = next;
        return next;
    }
    static { this.ɵfac = function AjfCurrentSlidePipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfCurrentSlidePipe)(); }; }
    static { this.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ajfCurrentSlide", type: AjfCurrentSlidePipe, pure: false }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfCurrentSlidePipe, [{
        type: Pipe,
        args: [{ name: 'ajfCurrentSlide', pure: false }]
    }], null, null); })();

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
function AjfDateFieldComponent_ajf_calendar_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-calendar", 1);
    i0.ɵɵpipe(1, "ajfDateValue");
    i0.ɵɵpipe(2, "ajfDateValue");
} if (rf & 2) {
    const ctrl_r1 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("dateOnlyForDay", true)("minDate", i0.ɵɵpipeBind1(1, 4, ctx_r1.instance.node.minDate))("maxDate", i0.ɵɵpipeBind1(2, 6, ctx_r1.instance.node.maxDate))("formControl", ctrl_r1);
} }
class AjfDateFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
    static { this.ɵfac = function AjfDateFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfDateFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1$1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfDateFieldComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 2, vars: 3, consts: [["selectionMode", "day", 3, "dateOnlyForDay", "minDate", "maxDate", "formControl", 4, "ngIf"], ["selectionMode", "day", 3, "dateOnlyForDay", "minDate", "maxDate", "formControl"]], template: function AjfDateFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfDateFieldComponent_ajf_calendar_0_Template, 3, 8, "ajf-calendar", 0);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.control));
        } }, dependencies: [i2$2.AjfCalendarComponent, i2$1.NgIf, i4.NgControlStatus, i4.FormControlDirective, i2$1.AsyncPipe, i1$1.AjfDateValuePipe], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfDateFieldComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-calendar\n  *ngIf=\"control|async as ctrl\"\n  selectionMode=\"day\"\n  [dateOnlyForDay]=\"true\"\n  [minDate]=\"instance!.node.minDate|ajfDateValue\"\n  [maxDate]=\"instance!.node.maxDate|ajfDateValue\"\n  [formControl]=\"ctrl!\"\n></ajf-calendar>\n" }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1$1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfDateFieldComponent, { className: "AjfDateFieldComponent", filePath: "date-field.ts", lineNumber: 45 }); })();

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
function AjfDateInputFieldComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "span", 2);
    i0.ɵɵelement(2, "input", 3);
    i0.ɵɵpipe(3, "ajfDateValueString");
    i0.ɵɵpipe(4, "ajfDateValueString");
    i0.ɵɵpipe(5, "ajfNodeCompleteName");
    i0.ɵɵelement(6, "mat-datepicker-toggle", 4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "mat-datepicker", null, 0)(9, "mat-datepicker-actions")(10, "button", 5);
    i0.ɵɵlistener("click", function AjfDateInputFieldComponent_ng_container_0_Template_button_click_10_listener() { const ctrl_r2 = i0.ɵɵrestoreView(_r1).ngIf; const picker_r3 = i0.ɵɵreference(8); const ctx_r3 = i0.ɵɵnextContext(); ctx_r3.clear(ctrl_r2); return i0.ɵɵresetView(picker_r3.close()); });
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "transloco");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "button", 6);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "transloco");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctrl_r2 = ctx.ngIf;
    const picker_r3 = i0.ɵɵreference(8);
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("matDatepicker", picker_r3)("min", i0.ɵɵpipeBind1(3, 8, ctx_r3.instance.node.minDate))("max", i0.ɵɵpipeBind1(4, 10, ctx_r3.instance.node.maxDate))("formControl", ctrl_r2);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(5, 12, ctx_r3.instance));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("for", picker_r3);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(12, 14, "Clear"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 16, "OK"));
} }
class AjfDateInputFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
    clear(ctrl) {
        ctrl.setValue(null);
    }
    static { this.ɵfac = function AjfDateInputFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfDateInputFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1$1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfDateInputFieldComponent, selectors: [["ng-component"]], viewQuery: function AjfDateInputFieldComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(MatInput, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.input = _t.first);
        } }, features: [i0.ɵɵInheritDefinitionFeature], decls: 2, vars: 3, consts: [["picker", ""], [4, "ngIf"], [1, "ajf-input-group", "ajf-control--mono"], ["readonly", "", 3, "matDatepicker", "min", "max", "formControl"], [1, "ajf-input-group-action", 3, "for"], ["mat-button", "", "type", "button", 3, "click"], ["mat-raised-button", "", "color", "primary", "matDatepickerApply", ""]], template: function AjfDateInputFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfDateInputFieldComponent_ng_container_0_Template, 16, 18, "ng-container", 1);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.control));
        } }, dependencies: [i2$1.NgIf, i1.MatButton, i4$1.MatDatepicker, i4$1.MatDatepickerInput, i4$1.MatDatepickerToggle, i4$1.MatDatepickerActions, i4$1.MatDatepickerApply, i4.DefaultValueAccessor, i4.NgControlStatus, i4.FormControlDirective, i5.TranslocoPipe, i2$1.AsyncPipe, i1$1.AjfDateValueStringPipe, i1$1.AjfNodeCompleteNamePipe], styles: ["ajf-field .ajf-input-group{width:200px}ajf-field .ajf-input-group .mat-datepicker-toggle{display:inline-flex}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfDateInputFieldComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container *ngIf=\"control | async as ctrl\">\n  <span class=\"ajf-input-group ajf-control--mono\">\n    <input\n      [matDatepicker]=\"picker\"\n      [attr.aria-label]=\"instance! | ajfNodeCompleteName\"\n      [min]=\"instance!.node.minDate | ajfDateValueString\"\n      [max]=\"instance!.node.maxDate | ajfDateValueString\"\n      [formControl]=\"ctrl!\"\n      readonly\n    />\n    <mat-datepicker-toggle class=\"ajf-input-group-action\" [for]=\"picker\"></mat-datepicker-toggle>\n  </span>\n  <mat-datepicker #picker>\n    <mat-datepicker-actions>\n      <button mat-button type=\"button\" (click)=\"clear(ctrl); picker.close()\">\n        {{ 'Clear' | transloco }}\n      </button>\n      <button mat-raised-button color=\"primary\" matDatepickerApply>{{ 'OK' | transloco }}</button>\n    </mat-datepicker-actions>\n  </mat-datepicker>\n</ng-container>\n", styles: ["ajf-field .ajf-input-group{width:200px}ajf-field .ajf-input-group .mat-datepicker-toggle{display:inline-flex}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1$1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }], { input: [{
            type: ViewChild,
            args: [MatInput, { static: false }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfDateInputFieldComponent, { className: "AjfDateInputFieldComponent", filePath: "date-input-field.ts", lineNumber: 47 }); })();

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
function AjfEmptyFieldComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 1);
    i0.ɵɵpipe(1, "transloco");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 1, ctx_r0.instance.node.HTML), i0.ɵɵsanitizeHtml);
} }
class AjfEmptyFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
    static { this.ɵfac = function AjfEmptyFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfEmptyFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1$1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfEmptyFieldComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [["class", "ajf-note", 3, "innerHTML", 4, "ngIf"], [1, "ajf-note", 3, "innerHTML"]], template: function AjfEmptyFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfEmptyFieldComponent_div_0_Template, 2, 3, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.instance);
        } }, dependencies: [i2$1.NgIf, i5.TranslocoPipe], styles: ["ajf-field .ajf-note{box-sizing:border-box;width:100%;padding:12px 16px;border-left:3px solid var(--ajf-accent);background:var(--ajf-band);color:var(--ajf-text);font-size:14px;line-height:1.5}ajf-field .ajf-note>:first-child{margin-top:0}ajf-field .ajf-note>:last-child{margin-bottom:0}ajf-field .ajf-note strong,ajf-field .ajf-note b{font-weight:600}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfEmptyFieldComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<!-- The field row renders the label; this block carries only the note body. -->\n<div class=\"ajf-note\" *ngIf=\"instance\" [innerHTML]=\"instance.node.HTML | transloco\"></div>\n", styles: ["ajf-field .ajf-note{box-sizing:border-box;width:100%;padding:12px 16px;border-left:3px solid var(--ajf-accent);background:var(--ajf-band);color:var(--ajf-text);font-size:14px;line-height:1.5}ajf-field .ajf-note>:first-child{margin-top:0}ajf-field .ajf-note>:last-child{margin-bottom:0}ajf-field .ajf-note strong,ajf-field .ajf-note b{font-weight:600}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1$1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfEmptyFieldComponent, { className: "AjfEmptyFieldComponent", filePath: "empty-field.ts", lineNumber: 45 }); })();

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
function AjfAudioFieldComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵelement(1, "ajf-audio", 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctrl_r1 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("readonly", !(ctx_r1.instance == null ? null : ctx_r1.instance.editable))("formControl", ctrl_r1);
} }
class AjfAudioFieldComponent extends AjfAudioFieldComponent$1 {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
    static { this.ɵfac = function AjfAudioFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfAudioFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1$1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfAudioFieldComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 2, vars: 3, consts: [["class", "ajf-field-wrapper", 4, "ngIf"], [1, "ajf-field-wrapper"], [3, "readonly", "formControl"]], template: function AjfAudioFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfAudioFieldComponent_div_0_Template, 2, 2, "div", 0);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.control));
        } }, dependencies: [i2$3.AjfAudioComponent, i2$1.NgIf, i4.NgControlStatus, i4.FormControlDirective, i2$1.AsyncPipe], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfAudioFieldComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"ajf-field-wrapper\" *ngIf=\"control | async as ctrl\">\n  <ajf-audio\n    [readonly]=\"!instance?.editable\"\n    [formControl]=\"ctrl\"\n  ></ajf-audio>\n</div>\n" }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1$1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfAudioFieldComponent, { className: "AjfAudioFieldComponent", filePath: "audio-field.ts", lineNumber: 44 }); })();

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
function AjfBarcodeFieldComponent_ajf_barcode_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-barcode", 1);
} if (rf & 2) {
    const ctrl_r1 = ctx.ngIf;
    i0.ɵɵproperty("formControl", ctrl_r1);
} }
class AjfBarcodeFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
    static { this.ɵfac = function AjfBarcodeFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfBarcodeFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1$1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfBarcodeFieldComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 2, vars: 3, consts: [[3, "formControl", 4, "ngIf"], [3, "formControl"]], template: function AjfBarcodeFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfBarcodeFieldComponent_ajf_barcode_0_Template, 1, 1, "ajf-barcode", 0);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.control));
        } }, dependencies: [i2$4.AjfBarcodeComponent, i2$1.NgIf, i4.NgControlStatus, i4.FormControlDirective, i2$1.AsyncPipe], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfBarcodeFieldComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-barcode *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\"></ajf-barcode>\n" }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1$1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfBarcodeFieldComponent, { className: "AjfBarcodeFieldComponent", filePath: "barcode-field.ts", lineNumber: 44 }); })();

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
function AjfDisplayFieldComponent_ng_container_0_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctrl_r1 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctrl_r1.value);
} }
function AjfDisplayFieldComponent_ng_container_0_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 6);
    i0.ɵɵpipe(1, "safeHtml");
} if (rf & 2) {
    const ctrl_r1 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 1, ctrl_r1.value), i0.ɵɵsanitizeHtml);
} }
function AjfDisplayFieldComponent_ng_container_0_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "number");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctrl_r1 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctrl_r1.value));
} }
function AjfDisplayFieldComponent_ng_container_0_mat_slide_toggle_5_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-slide-toggle", 7);
    i0.ɵɵlistener("click", function AjfDisplayFieldComponent_ng_container_0_mat_slide_toggle_5_Template_mat_slide_toggle_click_0_listener($event) { i0.ɵɵrestoreView(_r2); return i0.ɵɵresetView($event.preventDefault()); })("change", function AjfDisplayFieldComponent_ng_container_0_mat_slide_toggle_5_Template_mat_slide_toggle_change_0_listener($event) { i0.ɵɵrestoreView(_r2); const ctrl_r1 = i0.ɵɵnextContext().ngIf; return i0.ɵɵresetView($event.source.checked = ctrl_r1.value); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctrl_r1 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵproperty("checked", ctrl_r1.value)("disableRipple", true);
} }
function AjfDisplayFieldComponent_ng_container_0_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctrl_r1 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctrl_r1.value);
} }
function AjfDisplayFieldComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0)(1, 1);
    i0.ɵɵtemplate(2, AjfDisplayFieldComponent_ng_container_0_span_2_Template, 2, 1, "span", 2)(3, AjfDisplayFieldComponent_ng_container_0_div_3_Template, 2, 3, "div", 3)(4, AjfDisplayFieldComponent_ng_container_0_span_4_Template, 3, 3, "span", 2)(5, AjfDisplayFieldComponent_ng_container_0_mat_slide_toggle_5_Template, 1, 2, "mat-slide-toggle", 4)(6, AjfDisplayFieldComponent_ng_container_0_span_6_Template, 2, 1, "span", 5);
    i0.ɵɵelementContainerEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitch", ctx_r2.instance == null ? null : ctx_r2.instance.node == null ? null : ctx_r2.instance.node.fieldType);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", 1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", 2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", 3);
} }
/**
 * this component show the control value inherited from AjfBaseFieldComponent.
 *
 * @export
 * @class AjfDisplayFieldComponent
 */
class AjfDisplayFieldComponent extends AjfInputFieldComponent$1 {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
    static { this.ɵfac = function AjfDisplayFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfDisplayFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1$1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfDisplayFieldComponent, selectors: [["ajf-display-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 2, vars: 3, consts: [[4, "ngIf"], [3, "ngSwitch"], [4, "ngSwitchCase"], [3, "innerHTML", 4, "ngSwitchCase"], [3, "checked", "disableRipple", "click", "change", 4, "ngSwitchCase"], [4, "ngSwitchDefault"], [3, "innerHTML"], [3, "click", "change", "checked", "disableRipple"]], template: function AjfDisplayFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfDisplayFieldComponent_ng_container_0_Template, 7, 5, "ng-container", 0);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.control));
        } }, dependencies: [i2$1.NgIf, i2$1.NgSwitch, i2$1.NgSwitchCase, i2$1.NgSwitchDefault, i3.MatSlideToggle, i4$2.SafeHtmlPipe, i2$1.AsyncPipe, i2$1.DecimalPipe], styles: ["ajf-display-field{display:block;color:var(--ajf-text);font-size:14px;line-height:1.5}ajf-display-field>div>:first-child{margin-top:0}ajf-display-field>div>:last-child{margin-bottom:0}ajf-display-field .mat-mdc-slide-toggle{pointer-events:none}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfDisplayFieldComponent, [{
        type: Component,
        args: [{ selector: 'ajf-display-field', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container *ngIf=\"control | async as ctrl\">\n    <ng-container [ngSwitch]=\"instance?.node?.fieldType\">\n\n        <!-- String  -->\n        <span *ngSwitchCase=\"0\">{{ ctrl.value }}</span>\n\n        <!-- Textarea with HTML  -->\n        <div *ngSwitchCase=\"1\" [innerHTML]=\"ctrl.value | safeHtml\"></div>\n\n        <!-- Number  -->\n        <span *ngSwitchCase=\"2\">{{ ctrl.value | number }}</span>\n\n        <!-- Boolean  -->\n        <mat-slide-toggle *ngSwitchCase=\"3\" [checked]=\"ctrl.value\" (click)=\"$event.preventDefault()\"\n            (change)=\"$event.source.checked = ctrl.value\" [disableRipple]=\"true\">\n        </mat-slide-toggle>\n\n        <!-- Default -->\n        <span *ngSwitchDefault>{{ ctrl.value }}</span>\n\n    </ng-container>\n</ng-container>", styles: ["ajf-display-field{display:block;color:var(--ajf-text);font-size:14px;line-height:1.5}ajf-display-field>div>:first-child{margin-top:0}ajf-display-field>div>:last-child{margin-bottom:0}ajf-display-field .mat-mdc-slide-toggle{pointer-events:none}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1$1.AjfFormRendererService }, { type: undefined, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfDisplayFieldComponent, { className: "AjfDisplayFieldComponent", filePath: "display-field.ts", lineNumber: 51 }); })();

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
function AjfInputFieldComponent_ng_container_0_input_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 3);
    i0.ɵɵpipe(1, "ajfIsReadonlyInputField");
} if (rf & 2) {
    const ctrl_r1 = i0.ɵɵnextContext().ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("ajf-control--formula", ctx_r1.instance.node.fieldType === 6)("ajf-control--mono", ctx_r1.instance.node.fieldType === 6);
    i0.ɵɵproperty("formControl", ctrl_r1)("readonly", i0.ɵɵpipeBind1(1, 7, ctx_r1.instance));
    i0.ɵɵattribute("aria-labelledby", ctx_r1.instance.node.name);
} }
function AjfInputFieldComponent_ng_container_0_input_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 4);
    i0.ɵɵpipe(1, "ajfIsReadonlyInputField");
} if (rf & 2) {
    const ctrl_r1 = i0.ɵɵnextContext().ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formControl", ctrl_r1)("readonly", i0.ɵɵpipeBind1(1, 3, ctx_r1.instance));
    i0.ɵɵattribute("aria-labelledby", ctx_r1.instance.node.name);
} }
function AjfInputFieldComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfInputFieldComponent_ng_container_0_input_1_Template, 2, 9, "input", 1)(2, AjfInputFieldComponent_ng_container_0_input_2_Template, 2, 5, "input", 2);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.type === "text");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.type === "number");
} }
class AjfInputFieldComponent extends AjfInputFieldComponent$1 {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
    static { this.ɵfac = function AjfInputFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfInputFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1$1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfInputFieldComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 2, vars: 3, consts: [[4, "ngIf"], ["class", "ajf-control", "type", "text", 3, "ajf-control--formula", "ajf-control--mono", "formControl", "readonly", 4, "ngIf"], ["class", "ajf-control ajf-control--mono ajf-control--narrow", "type", "number", 3, "formControl", "readonly", 4, "ngIf"], ["type", "text", 1, "ajf-control", 3, "formControl", "readonly"], ["type", "number", 1, "ajf-control", "ajf-control--mono", "ajf-control--narrow", 3, "formControl", "readonly"]], template: function AjfInputFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfInputFieldComponent_ng_container_0_Template, 3, 2, "ng-container", 0);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.control));
        } }, dependencies: [i2$1.NgIf, i4.DefaultValueAccessor, i4.NumberValueAccessor, i4.NgControlStatus, i4.FormControlDirective, i2$1.AsyncPipe, i1$1.AjfIsReadonlyInputFieldPipe], styles: ["ajf-field .ajf-control--formula{width:auto;min-width:72px;max-width:240px;border-color:transparent;background:var(--ajf-band);color:var(--ajf-text);text-align:center}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfInputFieldComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container *ngIf=\"control | async as ctrl\">\n  <input\n    *ngIf=\"type === 'text'\"\n    class=\"ajf-control\"\n    [class.ajf-control--formula]=\"instance!.node.fieldType === 6\"\n    [class.ajf-control--mono]=\"instance!.node.fieldType === 6\"\n    type=\"text\"\n    [formControl]=\"ctrl!\"\n    [readonly]=\"instance! | ajfIsReadonlyInputField\"\n    [attr.aria-labelledby]=\"instance!.node.name\"\n  />\n  <input\n    *ngIf=\"type === 'number'\"\n    class=\"ajf-control ajf-control--mono ajf-control--narrow\"\n    type=\"number\"\n    [formControl]=\"ctrl!\"\n    [readonly]=\"instance! | ajfIsReadonlyInputField\"\n    [attr.aria-labelledby]=\"instance!.node.name\"\n  />\n</ng-container>\n", styles: ["ajf-field .ajf-control--formula{width:auto;min-width:72px;max-width:240px;border-color:transparent;background:var(--ajf-band);color:var(--ajf-text);text-align:center}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1$1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfInputFieldComponent, { className: "AjfInputFieldComponent", filePath: "input-field.ts", lineNumber: 44 }); })();

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
function AjfGeolocationFieldComponent_ajf_geolocation_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-geolocation", 1);
} if (rf & 2) {
    const ctrl_r1 = ctx.ngIf;
    i0.ɵɵproperty("formControl", ctrl_r1);
} }
class AjfGeolocationFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
    static { this.ɵfac = function AjfGeolocationFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfGeolocationFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1$1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfGeolocationFieldComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 2, vars: 3, consts: [[3, "formControl", 4, "ngIf"], [3, "formControl"]], template: function AjfGeolocationFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfGeolocationFieldComponent_ajf_geolocation_0_Template, 1, 1, "ajf-geolocation", 0);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.control));
        } }, dependencies: [i2$5.AjfGeolocationComponent, i2$1.NgIf, i4.NgControlStatus, i4.FormControlDirective, i2$1.AsyncPipe], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfGeolocationFieldComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-geolocation *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\"></ajf-geolocation>" }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1$1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfGeolocationFieldComponent, { className: "AjfGeolocationFieldComponent", filePath: "geolocation-field.ts", lineNumber: 44 }); })();

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
function AjfMultipleChoiceFieldComponent_Conditional_0_ng_container_0_Conditional_2_span_2_button_3_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 11);
    i0.ɵɵpipe(1, "transloco");
    i0.ɵɵlistener("click", function AjfMultipleChoiceFieldComponent_Conditional_0_ng_container_0_Conditional_2_span_2_button_3_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r1); const value_r2 = i0.ɵɵnextContext().$implicit; const ctrl_r3 = i0.ɵɵnextContext(2).ngIf; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.removeValue(ctrl_r3, value_r2, $event)); });
    i0.ɵɵelementStart(2, "mat-icon");
    i0.ɵɵtext(3, "close");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(1, 1, "Remove"));
} }
function AjfMultipleChoiceFieldComponent_Conditional_0_ng_container_0_Conditional_2_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 9);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵtemplate(3, AjfMultipleChoiceFieldComponent_Conditional_0_ng_container_0_Conditional_2_span_2_button_3_Template, 4, 3, "button", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const value_r2 = ctx.$implicit;
    const ctrl_r3 = i0.ɵɵnextContext(2).ngIf;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 2, ctx_r3.labelFor(value_r2)), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctrl_r3.disabled);
} }
function AjfMultipleChoiceFieldComponent_Conditional_0_ng_container_0_Conditional_2_mat_option_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 12);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_7_0;
    const choice_r5 = ctx.$implicit;
    i0.ɵɵproperty("value", choice_r5.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", (tmp_7_0 = choice_r5.translatedLabel) !== null && tmp_7_0 !== undefined ? tmp_7_0 : i0.ɵɵpipeBind1(2, 2, choice_r5.label), " ");
} }
function AjfMultipleChoiceFieldComponent_Conditional_0_ng_container_0_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-select", 2)(1, "mat-select-trigger");
    i0.ɵɵtemplate(2, AjfMultipleChoiceFieldComponent_Conditional_0_ng_container_0_Conditional_2_span_2_Template, 4, 4, "span", 5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "mat-option", 6);
    i0.ɵɵelement(4, "ngx-mat-select-search", 7);
    i0.ɵɵpipe(5, "transloco");
    i0.ɵɵpipe(6, "transloco");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, AjfMultipleChoiceFieldComponent_Conditional_0_ng_container_0_Conditional_2_mat_option_7_Template, 3, 4, "mat-option", 8);
    i0.ɵɵpipe(8, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctrl_r3 = i0.ɵɵnextContext().ngIf;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("formControl", ctrl_r3)("multiple", true);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctrl_r3.value);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("formControl", ctx_r3.searchFilterCtrl)("placeholderLabel", i0.ɵɵpipeBind1(5, 8, "Search"))("noEntriesFoundLabel", i0.ɵɵpipeBind1(6, 10, "Nothing found"))("enableClearOnEscapePressed", true);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(8, 12, ctx_r3.filteredChoices$));
} }
function AjfMultipleChoiceFieldComponent_Conditional_0_ng_container_0_Conditional_3_ajf_checkbox_group_item_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ajf-checkbox-group-item", 12);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_7_0;
    const choice_r6 = ctx.$implicit;
    i0.ɵɵproperty("value", choice_r6.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", (tmp_7_0 = choice_r6.translatedLabel) !== null && tmp_7_0 !== undefined ? tmp_7_0 : i0.ɵɵpipeBind1(2, 2, choice_r6.label), " ");
} }
function AjfMultipleChoiceFieldComponent_Conditional_0_ng_container_0_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ajf-checkbox-group", 3);
    i0.ɵɵtemplate(1, AjfMultipleChoiceFieldComponent_Conditional_0_ng_container_0_Conditional_3_ajf_checkbox_group_item_1_Template, 3, 4, "ajf-checkbox-group-item", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctrl_r3 = i0.ɵɵnextContext().ngIf;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("formControl", ctrl_r3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.instance.filteredChoices);
} }
function AjfMultipleChoiceFieldComponent_Conditional_0_ng_container_0_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 13);
    i0.ɵɵlistener("click", function AjfMultipleChoiceFieldComponent_Conditional_0_ng_container_0_button_4_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r7); const ctrl_r3 = i0.ɵɵnextContext().ngIf; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.clearValue(ctrl_r3, $event)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "Clear"), " ");
} }
function AjfMultipleChoiceFieldComponent_Conditional_0_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 1);
    i0.ɵɵtemplate(2, AjfMultipleChoiceFieldComponent_Conditional_0_ng_container_0_Conditional_2_Template, 9, 14, "mat-select", 2)(3, AjfMultipleChoiceFieldComponent_Conditional_0_ng_container_0_Conditional_3_Template, 2, 2, "ajf-checkbox-group", 3)(4, AjfMultipleChoiceFieldComponent_Conditional_0_ng_container_0_button_4_Template, 3, 3, "button", 4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctrl_r3 = ctx.ngIf;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r3.isNarrow ? 2 : 3);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r3.hasValue(ctrl_r3) && !ctrl_r3.disabled);
} }
function AjfMultipleChoiceFieldComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfMultipleChoiceFieldComponent_Conditional_0_ng_container_0_Template, 5, 2, "ng-container", 0);
    i0.ɵɵpipe(1, "async");
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx_r3.control));
} }
const maxChoicesInDom$1 = 40;
class AjfMultipleChoiceFieldComponent extends AjfFieldWithChoicesComponent {
    /**
     * Whether the choices collapse into a searchable dropdown. Below the search
     * threshold they are laid out as buttons instead, which reads faster for a
     * short list. `forceExpanded` wins over `forceNarrow`, so a schema can pin
     * either presentation regardless of how many choices there are.
     */
    get isNarrow() {
        const instance = this.instance;
        if (instance == null) {
            return false;
        }
        if (instance.node.forceExpanded) {
            return false;
        }
        return instance.node.forceNarrow || instance.filteredChoices.length > this.expandThreshold;
    }
    constructor(cdr, service, was, searchThreshold) {
        super(cdr, service, was, searchThreshold);
        this.expandThreshold = super.searchThreshold;
        this.searchFilterCtrl = new FormControl('', { nonNullable: true });
        this._choicesUpdate$ = new Subject();
        this._instanceUpdateForChoicesSub = Subscription.EMPTY;
        const controlValue$ = this.control.pipe(switchMap(ctrl => (ctrl ? ctrl.valueChanges.pipe(startWith(ctrl.value)) : of(null))), startWith(null), distinctUntilChanged());
        this.filteredChoices$ = combineLatest([
            merge(this.searchFilterCtrl.valueChanges.pipe(debounceTime(150), distinctUntilChanged()), this._choicesUpdate$).pipe(startWith(null)),
            controlValue$,
        ]).pipe(map(([_, selectedValues]) => {
            const search = this.searchFilterCtrl.value;
            const choices = this.instance?.filteredChoices || [];
            if (search) {
                const lowerSearch = search.toLowerCase();
                return choices.filter(c => (c.translatedLabel ?? c.label).toLowerCase().includes(lowerSearch));
            }
            if (choices.length <= maxChoicesInDom$1) {
                return choices;
            }
            let truncated = choices.slice(0, maxChoicesInDom$1);
            // make sure selected choices are included in truncated
            for (const val of selectedValues ?? []) {
                if (!truncated.some(c => c.value === val)) {
                    const selected = choices.find(c => c.value === val);
                    if (selected) {
                        truncated = [selected, ...truncated];
                    }
                }
            }
            return truncated;
        }));
    }
    /** The label shown on a selection chip. */
    labelFor(value) {
        const choice = (this.instance?.filteredChoices || []).find(c => c.value === value);
        if (choice == null) {
            return `${value}`;
        }
        return choice.translatedLabel ?? choice.label;
    }
    /**
     * Drop one value from the selection, from the chip's own button. The click has
     * to be stopped from reaching the trigger, which would reopen the panel.
     */
    removeValue(ctrl, value, event) {
        event.stopPropagation();
        event.preventDefault();
        const current = Array.isArray(ctrl.value) ? ctrl.value : [];
        ctrl.setValue(current.filter(v => v !== value));
    }
    _onInstanceChange() {
        this._instanceUpdateForChoicesSub.unsubscribe();
        this._choicesUpdate$.next();
        if (this.instance) {
            this._instanceUpdateForChoicesSub = this.instance.updatedEvt.subscribe(() => {
                this._choicesUpdate$.next();
            });
        }
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this._instanceUpdateForChoicesSub.unsubscribe();
        this._choicesUpdate$.complete();
    }
    static { this.ɵfac = function AjfMultipleChoiceFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfMultipleChoiceFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1$1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE), i0.ɵɵdirectiveInject(AJF_SEARCH_ALERT_THRESHOLD, 8)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfMultipleChoiceFieldComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [[4, "ngIf"], [1, "ajf-choice-control"], ["panelClass", "ajf-select-panel", 3, "formControl", "multiple"], [1, "ajf-choices-container", 3, "formControl"], ["type", "button", "class", "ajf-btn--ghost ajf-clear-value", 3, "click", 4, "ngIf"], ["class", "ajf-chip ajf-chip--removable", 4, "ngFor", "ngForOf"], [1, "ajf-select-search-option"], [3, "formControl", "placeholderLabel", "noEntriesFoundLabel", "enableClearOnEscapePressed"], [3, "value", 4, "ngFor", "ngForOf"], [1, "ajf-chip", "ajf-chip--removable"], ["type", "button", 3, "click", 4, "ngIf"], ["type", "button", 3, "click"], [3, "value"], ["type", "button", 1, "ajf-btn--ghost", "ajf-clear-value", 3, "click"]], template: function AjfMultipleChoiceFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfMultipleChoiceFieldComponent_Conditional_0_Template, 2, 3, "ng-container");
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.instance ? 0 : -1);
        } }, dependencies: [i2$6.CheckboxGroupItem, i3$1.AjfCheckboxGroup, i2$1.NgForOf, i2$1.NgIf, i2$7.MatIcon, i6.MatSelect, i6.MatSelectTrigger, i7.MatOption, i4.NgControlStatus, i4.FormControlDirective, i9.MatSelectSearchComponent, i5.TranslocoPipe, i2$1.AsyncPipe], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfMultipleChoiceFieldComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "@if (instance) {\n<ng-container *ngIf=\"control | async as ctrl\">\n  <div class=\"ajf-choice-control\">\n    @if (isNarrow) {\n    <mat-select [formControl]=\"ctrl!\" panelClass=\"ajf-select-panel\" [multiple]=\"true\">\n      <mat-select-trigger>\n        <span class=\"ajf-chip ajf-chip--removable\" *ngFor=\"let value of ctrl.value\">\n          {{ labelFor(value) | transloco }}\n          <button\n            type=\"button\"\n            *ngIf=\"!ctrl.disabled\"\n            [attr.aria-label]=\"'Remove' | transloco\"\n            (click)=\"removeValue(ctrl!, value, $event)\"\n          >\n            <mat-icon>close</mat-icon>\n          </button>\n        </span>\n      </mat-select-trigger>\n      <mat-option class=\"ajf-select-search-option\">\n        <ngx-mat-select-search\n          [formControl]=\"searchFilterCtrl\"\n          [placeholderLabel]=\"'Search' | transloco\"\n          [noEntriesFoundLabel]=\"'Nothing found' | transloco\"\n          [enableClearOnEscapePressed]=\"true\"\n        >\n        </ngx-mat-select-search>\n      </mat-option>\n      <mat-option [value]=\"choice.value\" *ngFor=\"let choice of filteredChoices$ | async\">\n        {{ choice.translatedLabel ?? (choice.label | transloco) }}\n      </mat-option>\n    </mat-select>\n    } @else {\n    <ajf-checkbox-group class=\"ajf-choices-container\" [formControl]=\"ctrl!\">\n      <ajf-checkbox-group-item [value]=\"choice.value\" *ngFor=\"let choice of instance.filteredChoices\">\n        {{ choice.translatedLabel ?? (choice.label | transloco) }}\n      </ajf-checkbox-group-item>\n    </ajf-checkbox-group>\n    }\n\n    <!-- Dropping the whole selection, next to the per-chip buttons that drop one. -->\n    <button\n      type=\"button\"\n      class=\"ajf-btn--ghost ajf-clear-value\"\n      *ngIf=\"hasValue(ctrl) && !ctrl.disabled\"\n      (click)=\"clearValue(ctrl, $event)\"\n    >\n      {{ 'Clear' | transloco }}\n    </button>\n  </div>\n</ng-container>\n}\n" }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1$1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [AJF_SEARCH_ALERT_THRESHOLD]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfMultipleChoiceFieldComponent, { className: "AjfMultipleChoiceFieldComponent", filePath: "multiple-choice-field.ts", lineNumber: 53 }); })();

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
function AjfRangeFieldComponent_ng_container_0_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3)(1, "div", 4)(2, "mat-slider", 5);
    i0.ɵɵelement(3, "input", 6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 7)(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "span", 8);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctrl_r1 = i0.ɵɵnextContext().ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("ajf-range-no-value", ctx_r1.isEmpty(ctrl_r1.value));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("step", ctx_r1.step)("min", ctx_r1.start)("max", ctx_r1.end);
    i0.ɵɵattribute("aria-label", ctx_r1.name)("name", ctx_r1.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r1.value)("formControl", ctrl_r1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.start);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.end);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.isEmpty(ctrl_r1.value) ? "\u2014" : ctrl_r1.value);
} }
function AjfRangeFieldComponent_ng_container_0_ng_template_2_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 12);
    i0.ɵɵlistener("click", function AjfRangeFieldComponent_ng_container_0_ng_template_2_button_1_Template_button_click_0_listener() { const i_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctrl_r1 = i0.ɵɵnextContext(2).ngIf; return i0.ɵɵresetView(ctrl_r1.setValue(i_r4)); });
    i0.ɵɵelementStart(1, "mat-icon");
    i0.ɵɵtext(2, "star");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const i_r4 = ctx.$implicit;
    const ctrl_r1 = i0.ɵɵnextContext(2).ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("ajf-selected", i_r4 <= ctrl_r1.value);
    i0.ɵɵattribute("aria-label", "Rate " + i_r4 + " out of " + ctx_r1.end)("name", ctx_r1.name);
} }
function AjfRangeFieldComponent_ng_container_0_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵtemplate(1, AjfRangeFieldComponent_ng_container_0_ng_template_2_button_1_Template, 3, 4, "button", 10);
    i0.ɵɵelementStart(2, "span", 11);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctrl_r1 = i0.ɵɵnextContext().ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.enumerateStars());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctrl_r1.value || 0, " / ", ctx_r1.end, "");
} }
function AjfRangeFieldComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfRangeFieldComponent_ng_container_0_div_1_Template, 11, 12, "div", 2)(2, AjfRangeFieldComponent_ng_container_0_ng_template_2_Template, 4, 3, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ratingTemplate_r5 = i0.ɵɵreference(3);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.appearance !== "rating")("ngIfElse", ratingTemplate_r5);
} }
class AjfRangeFieldComponent extends AjfRange {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
    /**
     * True when no value has been selected yet, so that the slider is not
     * rendered as if the minimum value had been picked.
     */
    isEmpty(value) {
        return value === null || value === undefined;
    }
    enumerateStars() {
        const nums = [];
        for (let i = 1; i <= (this.end || 5); i++) {
            nums.push(i);
        }
        return nums;
    }
    static { this.ɵfac = function AjfRangeFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfRangeFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1$1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfRangeFieldComponent, selectors: [["ajf-range"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 2, vars: 3, consts: [["ratingTemplate", ""], [4, "ngIf"], ["class", "ajf-range", 3, "ajf-range-no-value", 4, "ngIf", "ngIfElse"], [1, "ajf-range"], [1, "ajf-range-track"], ["discrete", "", "showTickMarks", "", 3, "step", "min", "max"], ["matSliderThumb", "", 3, "value", "formControl"], [1, "ajf-range-bounds"], [1, "ajf-range-value"], [1, "ajf-rating-container"], ["type", "button", "class", "ajf-rating-star", 3, "ajf-selected", "click", 4, "ngFor", "ngForOf"], [1, "ajf-rating-readout"], ["type", "button", 1, "ajf-rating-star", 3, "click"]], template: function AjfRangeFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfRangeFieldComponent_ng_container_0_Template, 4, 2, "ng-container", 1);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.control));
        } }, dependencies: [i2$1.NgForOf, i2$1.NgIf, i2$7.MatIcon, i4.DefaultValueAccessor, i4.NgControlStatus, i4.FormControlDirective, i5$1.MatSlider, i5$1.MatSliderThumb, i2$1.AsyncPipe], styles: ["ajf-range{display:block;width:100%}ajf-range .ajf-range{display:flex;align-items:center;gap:12px}ajf-range .ajf-range-track{flex:1 1 auto;min-width:180px;max-width:360px}ajf-range .ajf-range-track .mat-mdc-slider{width:100%;margin:0}ajf-range .ajf-range-bounds{display:flex;justify-content:space-between;margin-top:-6px;padding:0 8px;color:var(--ajf-text-muted);font-family:var(--ajf-font-mono);font-size:11px}ajf-range .ajf-range-value{box-sizing:border-box;min-height:var(--ajf-control-h);border:1px solid var(--ajf-border-strong);border-radius:var(--ajf-radius);background:var(--ajf-surface);color:var(--ajf-text);font-family:var(--ajf-font-sans);font-size:14px;line-height:calc(var(--ajf-control-h) - 2px);outline:none;min-width:44px;padding:0 8px;background:var(--ajf-band);font-family:var(--ajf-font-mono);text-align:center}ajf-range .ajf-range-value:focus,ajf-range .ajf-range-value:focus-within{border-color:var(--ajf-accent);box-shadow:0 0 0 2px var(--ajf-accent-soft)}ajf-range .ajf-range-value:disabled,ajf-range .ajf-range-value[readonly]{color:var(--ajf-text-muted);background:var(--ajf-band)}ajf-range .ajf-range-no-value .mat-mdc-slider{--mdc-slider-active-track-color: var(--ajf-border-strong);--mdc-slider-handle-color: var(--ajf-band)}ajf-range .ajf-range-no-value .ajf-range-value{color:var(--ajf-text-faint)}ajf-range .ajf-rating-container{display:flex;align-items:center;gap:4px}ajf-range .ajf-rating-star{padding:0;border:0;background:none;color:var(--ajf-border-strong);cursor:pointer}ajf-range .ajf-rating-star.ajf-selected{color:var(--ajf-accent)}ajf-range .ajf-rating-star .mat-icon{width:26px;height:26px;font-size:26px}ajf-range .ajf-rating-readout{margin-left:8px;color:var(--ajf-text-muted);font-family:var(--ajf-font-mono);font-size:13px}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfRangeFieldComponent, [{
        type: Component,
        args: [{ selector: 'ajf-range', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container *ngIf=\"control | async as ctrl\">\n  <div\n    *ngIf=\"appearance !== 'rating'; else ratingTemplate\"\n    class=\"ajf-range\"\n    [class.ajf-range-no-value]=\"isEmpty(ctrl.value)\"\n  >\n    <div class=\"ajf-range-track\">\n      <mat-slider\n        discrete\n        showTickMarks\n        [step]=\"step\"\n        [min]=\"start\"\n        [max]=\"end\"\n        [attr.aria-label]=\"name\"\n        [attr.name]=\"name\"\n      >\n        <input matSliderThumb [value]=\"value\" [formControl]=\"ctrl\" />\n      </mat-slider>\n      <div class=\"ajf-range-bounds\">\n        <span>{{ start }}</span>\n        <span>{{ end }}</span>\n      </div>\n    </div>\n    <span class=\"ajf-range-value\">{{ isEmpty(ctrl.value) ? '&mdash;' : ctrl.value }}</span>\n  </div>\n\n  <ng-template #ratingTemplate>\n    <div class=\"ajf-rating-container\">\n      <button\n        type=\"button\"\n        *ngFor=\"let i of enumerateStars()\"\n        class=\"ajf-rating-star\"\n        [class.ajf-selected]=\"i <= ctrl.value\"\n        (click)=\"ctrl.setValue(i)\"\n        [attr.aria-label]=\"'Rate ' + i + ' out of ' + end\"\n        [attr.name]=\"name\"\n      >\n        <mat-icon>star</mat-icon>\n      </button>\n      <span class=\"ajf-rating-readout\">{{ ctrl.value || 0 }} / {{ end }}</span>\n    </div>\n  </ng-template>\n</ng-container>\n", styles: ["ajf-range{display:block;width:100%}ajf-range .ajf-range{display:flex;align-items:center;gap:12px}ajf-range .ajf-range-track{flex:1 1 auto;min-width:180px;max-width:360px}ajf-range .ajf-range-track .mat-mdc-slider{width:100%;margin:0}ajf-range .ajf-range-bounds{display:flex;justify-content:space-between;margin-top:-6px;padding:0 8px;color:var(--ajf-text-muted);font-family:var(--ajf-font-mono);font-size:11px}ajf-range .ajf-range-value{box-sizing:border-box;min-height:var(--ajf-control-h);border:1px solid var(--ajf-border-strong);border-radius:var(--ajf-radius);background:var(--ajf-surface);color:var(--ajf-text);font-family:var(--ajf-font-sans);font-size:14px;line-height:calc(var(--ajf-control-h) - 2px);outline:none;min-width:44px;padding:0 8px;background:var(--ajf-band);font-family:var(--ajf-font-mono);text-align:center}ajf-range .ajf-range-value:focus,ajf-range .ajf-range-value:focus-within{border-color:var(--ajf-accent);box-shadow:0 0 0 2px var(--ajf-accent-soft)}ajf-range .ajf-range-value:disabled,ajf-range .ajf-range-value[readonly]{color:var(--ajf-text-muted);background:var(--ajf-band)}ajf-range .ajf-range-no-value .mat-mdc-slider{--mdc-slider-active-track-color: var(--ajf-border-strong);--mdc-slider-handle-color: var(--ajf-band)}ajf-range .ajf-range-no-value .ajf-range-value{color:var(--ajf-text-faint)}ajf-range .ajf-rating-container{display:flex;align-items:center;gap:4px}ajf-range .ajf-rating-star{padding:0;border:0;background:none;color:var(--ajf-border-strong);cursor:pointer}ajf-range .ajf-rating-star.ajf-selected{color:var(--ajf-accent)}ajf-range .ajf-rating-star .mat-icon{width:26px;height:26px;font-size:26px}ajf-range .ajf-rating-readout{margin-left:8px;color:var(--ajf-text-muted);font-family:var(--ajf-font-mono);font-size:13px}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1$1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfRangeFieldComponent, { className: "AjfRangeFieldComponent", filePath: "range-field.ts", lineNumber: 42 }); })();

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
function AjfSingleChoiceFieldComponent_Conditional_0_ng_container_0_Conditional_2_mat_option_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_7_0;
    const choice_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", choice_r1.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", (tmp_7_0 = choice_r1.translatedLabel) !== null && tmp_7_0 !== undefined ? tmp_7_0 : i0.ɵɵpipeBind1(2, 2, choice_r1.label), " ");
} }
function AjfSingleChoiceFieldComponent_Conditional_0_ng_container_0_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-select", 2)(1, "mat-option", 5);
    i0.ɵɵelement(2, "ngx-mat-select-search", 6);
    i0.ɵɵpipe(3, "transloco");
    i0.ɵɵpipe(4, "transloco");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, AjfSingleChoiceFieldComponent_Conditional_0_ng_container_0_Conditional_2_mat_option_5_Template, 3, 4, "mat-option", 7);
    i0.ɵɵpipe(6, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctrl_r2 = i0.ɵɵnextContext().ngIf;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("formControl", ctrl_r2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("formControl", ctx_r2.searchFilterCtrl)("placeholderLabel", i0.ɵɵpipeBind1(3, 6, "Search"))("noEntriesFoundLabel", i0.ɵɵpipeBind1(4, 8, "Nothing found"))("enableClearOnEscapePressed", true);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(6, 10, ctx_r2.filteredChoices$));
} }
function AjfSingleChoiceFieldComponent_Conditional_0_ng_container_0_Conditional_3_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 10);
    i0.ɵɵlistener("click", function AjfSingleChoiceFieldComponent_Conditional_0_ng_container_0_Conditional_3_button_1_Template_button_click_0_listener() { const choice_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctrl_r2 = i0.ɵɵnextContext(2).ngIf; return i0.ɵɵresetView(ctrl_r2.setValue(choice_r5.value)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_9_0;
    const choice_r5 = ctx.$implicit;
    const ctrl_r2 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵclassProp("ajf-selected", ctrl_r2.value === choice_r5.value);
    i0.ɵɵproperty("disabled", ctrl_r2.disabled);
    i0.ɵɵattribute("aria-checked", ctrl_r2.value === choice_r5.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", (tmp_9_0 = choice_r5.translatedLabel) !== null && tmp_9_0 !== undefined ? tmp_9_0 : i0.ɵɵpipeBind1(2, 5, choice_r5.label), " ");
} }
function AjfSingleChoiceFieldComponent_Conditional_0_ng_container_0_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵtemplate(1, AjfSingleChoiceFieldComponent_Conditional_0_ng_container_0_Conditional_3_button_1_Template, 3, 7, "button", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵattribute("aria-labelledby", ctx_r2.instance.node.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.instance.filteredChoices);
} }
function AjfSingleChoiceFieldComponent_Conditional_0_ng_container_0_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 11);
    i0.ɵɵlistener("click", function AjfSingleChoiceFieldComponent_Conditional_0_ng_container_0_button_4_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r6); const ctrl_r2 = i0.ɵɵnextContext().ngIf; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.clearValue(ctrl_r2, $event)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "Clear"), " ");
} }
function AjfSingleChoiceFieldComponent_Conditional_0_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 1);
    i0.ɵɵtemplate(2, AjfSingleChoiceFieldComponent_Conditional_0_ng_container_0_Conditional_2_Template, 7, 12, "mat-select", 2)(3, AjfSingleChoiceFieldComponent_Conditional_0_ng_container_0_Conditional_3_Template, 2, 2, "div", 3)(4, AjfSingleChoiceFieldComponent_Conditional_0_ng_container_0_button_4_Template, 3, 3, "button", 4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctrl_r2 = ctx.ngIf;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r2.isNarrow ? 2 : 3);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r2.hasValue(ctrl_r2) && !ctrl_r2.disabled);
} }
function AjfSingleChoiceFieldComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfSingleChoiceFieldComponent_Conditional_0_ng_container_0_Template, 5, 2, "ng-container", 0);
    i0.ɵɵpipe(1, "async");
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx_r2.control));
} }
const maxChoicesInDom = 40;
class AjfSingleChoiceFieldComponent extends AjfFieldWithChoicesComponent {
    /**
     * Whether the choices collapse into a searchable dropdown. Below the search
     * threshold they are laid out as buttons instead, which reads faster for a
     * short list. `forceExpanded` wins over `forceNarrow`, so a schema can pin
     * either presentation regardless of how many choices there are.
     */
    get isNarrow() {
        const instance = this.instance;
        if (instance == null) {
            return false;
        }
        if (instance.node.forceExpanded) {
            return false;
        }
        return instance.node.forceNarrow || instance.filteredChoices.length > this.expandThreshold;
    }
    constructor(cdr, service, was, searchThreshold) {
        super(cdr, service, was, searchThreshold);
        this.expandThreshold = super.searchThreshold;
        this.searchFilterCtrl = new FormControl('', { nonNullable: true });
        this._choicesUpdate$ = new Subject();
        this._instanceUpdateForChoicesSub = Subscription.EMPTY;
        const controlValue$ = this.control.pipe(switchMap(ctrl => (ctrl ? ctrl.valueChanges.pipe(startWith(ctrl.value)) : of(null))), startWith(null), distinctUntilChanged());
        this.filteredChoices$ = combineLatest([
            merge(this.searchFilterCtrl.valueChanges.pipe(debounceTime(150), distinctUntilChanged()), this._choicesUpdate$).pipe(startWith(null)),
            controlValue$,
        ]).pipe(map(([_, selectedValue]) => {
            const search = this.searchFilterCtrl.value;
            const choices = this.instance?.filteredChoices || [];
            if (search) {
                const lowerSearch = search.toLowerCase();
                return choices.filter(c => (c.translatedLabel ?? c.label).toLowerCase().includes(lowerSearch));
            }
            if (choices.length <= maxChoicesInDom) {
                return choices;
            }
            const truncated = choices.slice(0, maxChoicesInDom);
            // make sure the selected choice is included in truncated
            if (selectedValue != null && !truncated.some(c => c.value === selectedValue)) {
                const selected = choices.find(c => c.value === selectedValue);
                if (selected) {
                    return [selected, ...truncated];
                }
            }
            return truncated;
        }));
    }
    _onInstanceChange() {
        this._instanceUpdateForChoicesSub.unsubscribe();
        this._choicesUpdate$.next();
        if (this.instance) {
            this._instanceUpdateForChoicesSub = this.instance.updatedEvt.subscribe(() => {
                this._choicesUpdate$.next();
            });
        }
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this._instanceUpdateForChoicesSub.unsubscribe();
        this._choicesUpdate$.complete();
    }
    static { this.ɵfac = function AjfSingleChoiceFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfSingleChoiceFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1$1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE), i0.ɵɵdirectiveInject(AJF_SEARCH_ALERT_THRESHOLD, 8)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfSingleChoiceFieldComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [[4, "ngIf"], [1, "ajf-choice-control"], ["panelClass", "ajf-select-panel", 3, "formControl"], ["role", "radiogroup", 1, "ajf-segmented", "ajf-choices-container"], ["type", "button", "class", "ajf-btn--ghost ajf-clear-value", 3, "click", 4, "ngIf"], [1, "ajf-select-search-option"], [3, "formControl", "placeholderLabel", "noEntriesFoundLabel", "enableClearOnEscapePressed"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], ["type", "button", "class", "ajf-segment", "role", "radio", 3, "ajf-selected", "disabled", "click", 4, "ngFor", "ngForOf"], ["type", "button", "role", "radio", 1, "ajf-segment", 3, "click", "disabled"], ["type", "button", 1, "ajf-btn--ghost", "ajf-clear-value", 3, "click"]], template: function AjfSingleChoiceFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfSingleChoiceFieldComponent_Conditional_0_Template, 2, 3, "ng-container");
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.instance ? 0 : -1);
        } }, dependencies: [i2$1.NgForOf, i2$1.NgIf, i6.MatSelect, i7.MatOption, i4.NgControlStatus, i4.FormControlDirective, i9.MatSelectSearchComponent, i5.TranslocoPipe, i2$1.AsyncPipe], styles: [".ajf-choice-control{display:flex;flex-wrap:wrap;align-items:center;gap:8px;min-width:0}.mat-mdc-select-panel.ajf-select-panel{border:1px solid var(--ajf-border, #e6e2dc);background:var(--ajf-surface, #ffffff)}.mat-mdc-select-panel.ajf-select-panel .mat-mdc-option{font-family:var(--ajf-font-sans, sans-serif)}.mat-mdc-select-panel.ajf-select-panel .mat-mdc-option .mdc-list-item__primary-text{color:var(--ajf-text, #1c1a17);font-size:14px}.mat-mdc-select-panel.ajf-select-panel .mat-mdc-option.ajf-select-search-option{min-height:0;padding:0;border-bottom:1px solid var(--ajf-border, #e6e2dc);background:var(--ajf-surface, #ffffff);pointer-events:auto}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfSingleChoiceFieldComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "@if (instance) {\n<ng-container *ngIf=\"control | async as ctrl\">\n  <div class=\"ajf-choice-control\">\n    @if (isNarrow) {\n    <mat-select [formControl]=\"ctrl!\" panelClass=\"ajf-select-panel\">\n      <mat-option class=\"ajf-select-search-option\">\n        <ngx-mat-select-search\n          [formControl]=\"searchFilterCtrl\"\n          [placeholderLabel]=\"'Search' | transloco\"\n          [noEntriesFoundLabel]=\"'Nothing found' | transloco\"\n          [enableClearOnEscapePressed]=\"true\"\n        >\n        </ngx-mat-select-search>\n      </mat-option>\n      <mat-option [value]=\"choice.value\" *ngFor=\"let choice of filteredChoices$ | async\">\n        {{ choice.translatedLabel ?? (choice.label | transloco) }}\n      </mat-option>\n    </mat-select>\n    } @else {\n    <div\n      class=\"ajf-segmented ajf-choices-container\"\n      role=\"radiogroup\"\n      [attr.aria-labelledby]=\"instance.node.name\"\n    >\n      <button\n        type=\"button\"\n        class=\"ajf-segment\"\n        role=\"radio\"\n        *ngFor=\"let choice of instance.filteredChoices\"\n        [attr.aria-checked]=\"ctrl.value === choice.value\"\n        [class.ajf-selected]=\"ctrl.value === choice.value\"\n        [disabled]=\"ctrl.disabled\"\n        (click)=\"ctrl.setValue(choice.value)\"\n      >\n        {{ choice.translatedLabel ?? (choice.label | transloco) }}\n      </button>\n    </div>\n    }\n\n    <!-- A picked radio cannot be unpicked, so emptying the field needs its own\n         action. -->\n    <button\n      type=\"button\"\n      class=\"ajf-btn--ghost ajf-clear-value\"\n      *ngIf=\"hasValue(ctrl) && !ctrl.disabled\"\n      (click)=\"clearValue(ctrl, $event)\"\n    >\n      {{ 'Clear' | transloco }}\n    </button>\n  </div>\n</ng-container>\n}\n", styles: [".ajf-choice-control{display:flex;flex-wrap:wrap;align-items:center;gap:8px;min-width:0}.mat-mdc-select-panel.ajf-select-panel{border:1px solid var(--ajf-border, #e6e2dc);background:var(--ajf-surface, #ffffff)}.mat-mdc-select-panel.ajf-select-panel .mat-mdc-option{font-family:var(--ajf-font-sans, sans-serif)}.mat-mdc-select-panel.ajf-select-panel .mat-mdc-option .mdc-list-item__primary-text{color:var(--ajf-text, #1c1a17);font-size:14px}.mat-mdc-select-panel.ajf-select-panel .mat-mdc-option.ajf-select-search-option{min-height:0;padding:0;border-bottom:1px solid var(--ajf-border, #e6e2dc);background:var(--ajf-surface, #ffffff);pointer-events:auto}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1$1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [AJF_SEARCH_ALERT_THRESHOLD]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfSingleChoiceFieldComponent, { className: "AjfSingleChoiceFieldComponent", filePath: "single-choice-field.ts", lineNumber: 53 }); })();

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
function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "ajfTranslateIfString");
    i0.ɵɵpipe(3, "ajfFormatIfNumber");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const columns_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(3, 3, i0.ɵɵpipeBind1(2, 1, columns_r1[0]), ".0-2"), " ");
} }
function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "ajfTranslateIfString");
    i0.ɵɵpipe(3, "ajfFormatIfNumber");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const c_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(3, 3, i0.ɵɵpipeBind1(2, 1, c_r2), ".0-2"), " ");
} }
function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_ng_container_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "input", 9);
    i0.ɵɵlistener("focusout", function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_ng_container_1_ng_container_1_Template_input_focusout_1_listener() { i0.ɵɵrestoreView(_r3); const contr_r4 = i0.ɵɵnextContext(3).ngIf; return i0.ɵɵresetView(contr_r4.show = false); })("keydown.tab", function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_ng_container_1_ng_container_1_Template_input_keydown_tab_1_listener($event) { i0.ɵɵrestoreView(_r3); const column_r5 = i0.ɵɵnextContext(5).index; const row_r6 = i0.ɵɵnextContext(2).index; const ctx_r6 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r6.goToNextCell($event, row_r6, column_r5)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const contr_r4 = i0.ɵɵnextContext(3).ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("formControl", contr_r4.control);
} }
function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_ng_container_1_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 10);
    i0.ɵɵlistener("focusout", function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_ng_container_1_ng_template_2_Template_input_focusout_0_listener() { i0.ɵɵrestoreView(_r8); const contr_r4 = i0.ɵɵnextContext(3).ngIf; return i0.ɵɵresetView(contr_r4.show = false); })("keydown.tab", function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_ng_container_1_ng_template_2_Template_input_keydown_tab_0_listener($event) { i0.ɵɵrestoreView(_r8); const column_r5 = i0.ɵɵnextContext(5).index; const row_r6 = i0.ɵɵnextContext(2).index; const ctx_r6 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r6.goToNextCell($event, row_r6, column_r5)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const contr_r4 = i0.ɵɵnextContext(3).ngIf;
    i0.ɵɵproperty("type", contr_r4.type)("formControl", contr_r4.control);
} }
function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_ng_container_1_ng_container_1_Template, 2, 1, "ng-container", 8)(2, AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_ng_container_1_ng_template_2_Template, 1, 2, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const genericInput_r9 = i0.ɵɵreference(3);
    const contr_r4 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", contr_r4.type === "number")("ngIfElse", genericInput_r9);
} }
function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 11);
    i0.ɵɵlistener("click", function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_ng_template_3_Template_span_click_0_listener() { i0.ɵɵrestoreView(_r10); const column_r5 = i0.ɵɵnextContext(4).index; const row_r6 = i0.ɵɵnextContext(2).index; const ctx_r6 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r6.goToCell(row_r6, column_r5)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "ajfTranslateIfString");
    i0.ɵɵpipe(3, "ajfFormatIfNumber");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const contr_r4 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(3, 3, i0.ɵɵpipeBind1(2, 1, contr_r4.control.value), ".0-2"));
} }
function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_ng_container_1_Template, 4, 2, "ng-container", 8);
    i0.ɵɵpipe(2, "ajfIsCellEditable");
    i0.ɵɵtemplate(3, AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_ng_template_3_Template, 4, 6, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const plainTextCell_r11 = i0.ɵɵreference(4);
    const contr_r4 = i0.ɵɵnextContext().ngIf;
    const column_r5 = i0.ɵɵnextContext(2).index;
    const row_r6 = i0.ɵɵnextContext(2).index;
    const node_r12 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", contr_r4.show && i0.ɵɵpipeBind1(2, 2, node_r12.rows[row_r6 - 1][column_r5]))("ngIfElse", plainTextCell_r11);
} }
function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_ng_container_1_Template, 5, 4, "ng-container", 5);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const contr_r4 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", contr_r4);
} }
function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_ng_container_0_Template, 2, 1, "ng-container", 5);
    i0.ɵɵpipe(1, "ajfGetTableCellControl");
} if (rf & 2) {
    const c_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, c_r2));
} }
function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td");
    i0.ɵɵtemplate(1, AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_container_1_Template, 4, 6, "ng-container", 8)(2, AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_ng_template_2_Template, 2, 3, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const controlCell_r13 = i0.ɵɵreference(3);
    const row_r6 = i0.ɵɵnextContext(2).index;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", row_r6 === 0)("ngIfElse", controlCell_r13);
} }
function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_td_1_Template, 4, 2, "td", 6);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const columns_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", columns_r1[1]);
} }
function AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "tr", 7);
    i0.ɵɵpipe(2, "ajfTableRowClass");
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtemplate(4, AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_4_Template, 4, 6, "ng-container", 5);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_ng_container_5_Template, 2, 1, "ng-container", 5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const columns_r1 = ctx.$implicit;
    const row_r6 = ctx.index;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", i0.ɵɵpipeBind1(2, 3, row_r6));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", columns_r1.length > 0 && columns_r1[0]);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", columns_r1.length > 1);
} }
function AjfTableFieldComponent_table_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfTableFieldComponent_table_0_ng_container_1_ng_container_1_Template, 6, 5, "ng-container", 6);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r6.instance.controls);
} }
function AjfTableFieldComponent_table_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 4);
    i0.ɵɵtemplate(1, AjfTableFieldComponent_table_0_ng_container_1_Template, 2, 1, "ng-container", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r6.instance.node);
} }
class AjfTableFieldComponent extends AjfTableFieldComponent$1 {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
    static { this.ɵfac = function AjfTableFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfTableFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1$1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfTableFieldComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [["controlCell", ""], ["plainTextCell", ""], ["genericInput", ""], ["class", "ajf-table-field", 4, "ngIf"], [1, "ajf-table-field"], [4, "ngIf"], [4, "ngFor", "ngForOf"], [3, "ngClass"], [4, "ngIf", "ngIfElse"], ["type", "number", "autofocus", "", 3, "focusout", "keydown.tab", "formControl"], ["autofocus", "", 3, "focusout", "keydown.tab", "type", "formControl"], [3, "click"]], template: function AjfTableFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfTableFieldComponent_table_0_Template, 2, 1, "table", 3);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.instance);
        } }, dependencies: [i2$1.NgClass, i2$1.NgForOf, i2$1.NgIf, i4.DefaultValueAccessor, i4.NumberValueAccessor, i4.NgControlStatus, i4.FormControlDirective, i4$2.FormatIfNumber, i4$2.TranslateIfString, i1$1.AjfGetTableCellControlPipe, i1$1.AjfIsCellEditablePipe, i1$1.AjfTableRowClass], styles: ["table.ajf-table-field{width:100%;border:1px solid var(--ajf-border);border-collapse:collapse;border-spacing:0;table-layout:fixed;font-size:13px}table.ajf-table-field .ajf-header-row{background:var(--ajf-band)}table.ajf-table-field .ajf-header-row td,table.ajf-table-field .ajf-header-row th{color:var(--ajf-text-muted);font-family:var(--ajf-font-mono);font-size:11px;letter-spacing:.09em;text-transform:uppercase}table.ajf-table-field th,table.ajf-table-field td{position:relative;padding:9px 12px;border-right:1px solid var(--ajf-border);border-bottom:1px solid var(--ajf-border);text-align:left}table.ajf-table-field th:last-child,table.ajf-table-field td:last-child{border-right:0}table.ajf-table-field tr:last-child td{border-bottom:0}table.ajf-table-field tbody tr:hover:not(.ajf-header-row){background:var(--ajf-band)}table.ajf-table-field td span{display:block;width:100%;min-height:1.4em;box-sizing:border-box;font:inherit;cursor:text;outline:none}table.ajf-table-field td input{position:absolute;inset:0;width:100%;box-sizing:border-box;padding:9px 12px;border:1px solid var(--ajf-accent);background:var(--ajf-surface);color:var(--ajf-text);font:inherit;cursor:text;outline:none}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfTableFieldComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<table *ngIf=\"instance\" class=\"ajf-table-field\">\n  <ng-container *ngIf=\"instance.node as node\">\n    <ng-container *ngFor=\"let columns of instance.controls; let row = index\">\n      <tr [ngClass]=\"row | ajfTableRowClass\">\n        <td>\n          <ng-container *ngIf=\"columns.length > 0 && columns[0]\">\n            {{ columns[0] | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}\n          </ng-container>\n        </td>\n        <ng-container *ngIf=\"columns.length > 1\">\n          <td *ngFor=\"let c of columns[1]; let column = index\">\n            <ng-container *ngIf=\"row === 0; else controlCell\">\n              {{ c | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}\n            </ng-container>\n            <ng-template #controlCell>\n              <ng-container *ngIf=\"c|ajfGetTableCellControl as contr\">\n                <ng-container *ngIf=\"contr\">\n                  <ng-container *ngIf=\"contr!.show && (node.rows[row-1][column]|ajfIsCellEditable); else plainTextCell\">\n                    <ng-container *ngIf=\"contr.type === 'number';else genericInput\">\n                      <input (focusout)=\"contr!.show = false\" type=\"number\" [formControl]=\"contr.control\"\n                        (keydown.tab)=\"goToNextCell($event, row, column)\" autofocus />\n                    </ng-container>\n                    <ng-template #genericInput>\n                      <input (focusout)=\"contr!.show = false\" [type]=\"contr.type\" [formControl]=\"contr.control\"\n                        (keydown.tab)=\"goToNextCell($event, row, column)\" autofocus />\n                    </ng-template>\n                  </ng-container>\n\n                  <ng-template #plainTextCell>\n                    <span (click)=\"goToCell(row, column)\">{{ contr.control!.value |\n                      ajfTranslateIfString | ajfFormatIfNumber: '.0-2'\n                      }}</span>\n                  </ng-template>\n                </ng-container>\n              </ng-container>\n            </ng-template>\n          </td>\n        </ng-container>\n      </tr>\n    </ng-container>\n  </ng-container>\n</table>", styles: ["table.ajf-table-field{width:100%;border:1px solid var(--ajf-border);border-collapse:collapse;border-spacing:0;table-layout:fixed;font-size:13px}table.ajf-table-field .ajf-header-row{background:var(--ajf-band)}table.ajf-table-field .ajf-header-row td,table.ajf-table-field .ajf-header-row th{color:var(--ajf-text-muted);font-family:var(--ajf-font-mono);font-size:11px;letter-spacing:.09em;text-transform:uppercase}table.ajf-table-field th,table.ajf-table-field td{position:relative;padding:9px 12px;border-right:1px solid var(--ajf-border);border-bottom:1px solid var(--ajf-border);text-align:left}table.ajf-table-field th:last-child,table.ajf-table-field td:last-child{border-right:0}table.ajf-table-field tr:last-child td{border-bottom:0}table.ajf-table-field tbody tr:hover:not(.ajf-header-row){background:var(--ajf-band)}table.ajf-table-field td span{display:block;width:100%;min-height:1.4em;box-sizing:border-box;font:inherit;cursor:text;outline:none}table.ajf-table-field td input{position:absolute;inset:0;width:100%;box-sizing:border-box;padding:9px 12px;border:1px solid var(--ajf-accent);background:var(--ajf-surface);color:var(--ajf-text);font:inherit;cursor:text;outline:none}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1$1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfTableFieldComponent, { className: "AjfTableFieldComponent", filePath: "table-field.ts", lineNumber: 44 }); })();

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
function AjfTextFieldComponent_quill_editor_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "quill-editor", 1);
} if (rf & 2) {
    const ctrl_r1 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formControl", ctrl_r1)("modules", ctx_r1.quillModules);
} }
class AjfTextFieldComponent extends AjfInputFieldComponent$1 {
    constructor(cdr, service, was) {
        super(cdr, service, was);
        this.quillModules = {
            toolbar: [
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['clean'],
            ],
        };
    }
    ngOnInit() {
        super.ngOnInit();
        if (this.control) {
            this.control.subscribe(ctrl => {
                if (ctrl && typeof ctrl.value === 'string') {
                    const converted = ctrl.value.replace(/\r\n|\r|\n/g, '<br>');
                    if (converted !== ctrl.value) {
                        ctrl.setValue(converted, { emitEvent: false });
                    }
                }
            });
        }
    }
    static { this.ɵfac = function AjfTextFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfTextFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1$1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfTextFieldComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 2, vars: 3, consts: [["class", "resizable-quill", "placeholder", "", 3, "formControl", "modules", 4, "ngIf"], ["placeholder", "", 1, "resizable-quill", 3, "formControl", "modules"]], template: function AjfTextFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfTextFieldComponent_quill_editor_0_Template, 1, 2, "quill-editor", 0);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.control));
        } }, dependencies: [i2$1.NgIf, i4.NgControlStatus, i4.FormControlDirective, i4$3.QuillEditorComponent, i2$1.AsyncPipe], styles: ["ajf-field .resizable-quill{display:block;width:100%;max-width:720px}ajf-field .resizable-quill .ql-toolbar.ql-snow,ajf-field .resizable-quill .ql-container.ql-snow{border-color:var(--ajf-border-strong)}ajf-field .resizable-quill .ql-toolbar.ql-snow{border-radius:var(--ajf-radius) var(--ajf-radius) 0 0;background:var(--ajf-band)}ajf-field .resizable-quill .ql-toolbar.ql-snow .ql-stroke{stroke:var(--ajf-text-muted)}ajf-field .resizable-quill .ql-toolbar.ql-snow .ql-fill{fill:var(--ajf-text-muted)}ajf-field .resizable-quill .ql-toolbar.ql-snow .ql-active .ql-stroke{stroke:var(--ajf-accent)}ajf-field .resizable-quill .ql-toolbar.ql-snow .ql-active .ql-fill{fill:var(--ajf-accent)}ajf-field .resizable-quill .ql-container.ql-snow{border-radius:0 0 var(--ajf-radius) var(--ajf-radius);background:var(--ajf-surface);font-family:var(--ajf-font-sans);font-size:14px}ajf-field .resizable-quill .ql-editor{min-height:7.5em;max-height:30em;resize:vertical}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfTextFieldComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<quill-editor *ngIf=\"control | async as ctrl\" [formControl]=\"ctrl!\" [modules]=\"quillModules\" class=\"resizable-quill\"\n    placeholder=\"\">\n</quill-editor>", styles: ["ajf-field .resizable-quill{display:block;width:100%;max-width:720px}ajf-field .resizable-quill .ql-toolbar.ql-snow,ajf-field .resizable-quill .ql-container.ql-snow{border-color:var(--ajf-border-strong)}ajf-field .resizable-quill .ql-toolbar.ql-snow{border-radius:var(--ajf-radius) var(--ajf-radius) 0 0;background:var(--ajf-band)}ajf-field .resizable-quill .ql-toolbar.ql-snow .ql-stroke{stroke:var(--ajf-text-muted)}ajf-field .resizable-quill .ql-toolbar.ql-snow .ql-fill{fill:var(--ajf-text-muted)}ajf-field .resizable-quill .ql-toolbar.ql-snow .ql-active .ql-stroke{stroke:var(--ajf-accent)}ajf-field .resizable-quill .ql-toolbar.ql-snow .ql-active .ql-fill{fill:var(--ajf-accent)}ajf-field .resizable-quill .ql-container.ql-snow{border-radius:0 0 var(--ajf-radius) var(--ajf-radius);background:var(--ajf-surface);font-family:var(--ajf-font-sans);font-size:14px}ajf-field .resizable-quill .ql-editor{min-height:7.5em;max-height:30em;resize:vertical}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1$1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfTextFieldComponent, { className: "AjfTextFieldComponent", filePath: "text-field.ts", lineNumber: 45 }); })();

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
function AjfTimeFieldComponent_ajf_time_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-time", 1);
} if (rf & 2) {
    const ctrl_r1 = ctx.ngIf;
    i0.ɵɵproperty("formControl", ctrl_r1);
} }
class AjfTimeFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
    static { this.ɵfac = function AjfTimeFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfTimeFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1$1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfTimeFieldComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 2, vars: 3, consts: [[3, "formControl", 4, "ngIf"], [3, "formControl"]], template: function AjfTimeFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfTimeFieldComponent_ajf_time_0_Template, 1, 1, "ajf-time", 0);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.control));
        } }, dependencies: [i2$8.AjfTime, i2$1.NgIf, i4.NgControlStatus, i4.FormControlDirective, i2$1.AsyncPipe], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfTimeFieldComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-time *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\"></ajf-time>\n" }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1$1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfTimeFieldComponent, { className: "AjfTimeFieldComponent", filePath: "time-field.ts", lineNumber: 44 }); })();

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
function AjfVideoUrlFieldComponent_ng_container_0_ng_container_3_img_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 5);
} if (rf & 2) {
    const thumb_r1 = ctx.ngIf;
    i0.ɵɵproperty("src", thumb_r1, i0.ɵɵsanitizeUrl);
} }
function AjfVideoUrlFieldComponent_ng_container_0_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "a", 3);
    i0.ɵɵtemplate(2, AjfVideoUrlFieldComponent_ng_container_0_ng_container_3_img_2_Template, 1, 1, "img", 4);
    i0.ɵɵpipe(3, "async");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctrl_r2 = i0.ɵɵnextContext().ngIf;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("href", ctrl_r2.value, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(3, 2, ctx_r2.videoThumbnail));
} }
function AjfVideoUrlFieldComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "input", 1);
    i0.ɵɵelementStart(2, "div", 2);
    i0.ɵɵtemplate(3, AjfVideoUrlFieldComponent_ng_container_0_ng_container_3_Template, 4, 4, "ng-container", 0);
    i0.ɵɵpipe(4, "async");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctrl_r2 = ctx.ngIf;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("formControl", ctrl_r2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(4, 2, ctx_r2.validUrl));
} }
class AjfVideoUrlFieldComponent extends AjfVideoUrlFieldComponent$1 {
    constructor(cdr, service, was, domSanitizer, httpClient) {
        super(cdr, service, was, domSanitizer, httpClient);
    }
    static { this.ɵfac = function AjfVideoUrlFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfVideoUrlFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1$1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE), i0.ɵɵdirectiveInject(i2$9.DomSanitizer), i0.ɵɵdirectiveInject(i3$2.HttpClient)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfVideoUrlFieldComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 2, vars: 3, consts: [[4, "ngIf"], ["type", "url", 1, "ajf-control", "ajf-video-input", 3, "formControl"], [1, "ajf-video-thumbnail"], ["target", "_blank", 3, "href"], ["alt", "", 3, "src", 4, "ngIf"], ["alt", "", 3, "src"]], template: function AjfVideoUrlFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfVideoUrlFieldComponent_ng_container_0_Template, 5, 4, "ng-container", 0);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.control));
        } }, dependencies: [i2$1.NgIf, i4.DefaultValueAccessor, i4.NgControlStatus, i4.FormControlDirective, i2$1.AsyncPipe], styles: ["ajf-field .ajf-video-thumbnail img{max-width:160px;max-height:90px;border:1px solid var(--ajf-border);border-radius:var(--ajf-radius)}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfVideoUrlFieldComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container *ngIf=\"control | async as ctrl\">\n  <input class=\"ajf-control ajf-video-input\" type=\"url\" [formControl]=\"ctrl!\" />\n  <div class=\"ajf-video-thumbnail\">\n    <ng-container *ngIf=\"validUrl | async\">\n      <a target=\"_blank\" [href]=\"ctrl.value\">\n        <img *ngIf=\"videoThumbnail | async as thumb\" [src]=\"thumb\" alt=\"\" />\n      </a>\n    </ng-container>\n  </div>\n</ng-container>\n", styles: ["ajf-field .ajf-video-thumbnail img{max-width:160px;max-height:90px;border:1px solid var(--ajf-border);border-radius:var(--ajf-radius)}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1$1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }, { type: i2$9.DomSanitizer }, { type: i3$2.HttpClient }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfVideoUrlFieldComponent, { className: "AjfVideoUrlFieldComponent", filePath: "video-url-field.ts", lineNumber: 46 }); })();

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
function AjfSignatureFieldComponent_ajf_signature_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-signature", 1);
} if (rf & 2) {
    const ctrl_r1 = ctx.ngIf;
    i0.ɵɵproperty("formControl", ctrl_r1);
} }
/**
 * It allows the loading of a Signature canvas image inside an AjfForm.
 *
 * @export
 * @class AjfSignatureFieldComponent
 */
class AjfSignatureFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
    static { this.ɵfac = function AjfSignatureFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfSignatureFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1$1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfSignatureFieldComponent, selectors: [["ajf-signature-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 2, vars: 3, consts: [[3, "formControl", 4, "ngIf"], [3, "formControl"]], template: function AjfSignatureFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfSignatureFieldComponent_ajf_signature_0_Template, 1, 1, "ajf-signature", 0);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.control));
        } }, dependencies: [i2$a.AjfSignatureComponent, i2$1.NgIf, i4.NgControlStatus, i4.FormControlDirective, i2$1.AsyncPipe], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfSignatureFieldComponent, [{
        type: Component,
        args: [{ selector: 'ajf-signature-field', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-signature *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\"></ajf-signature>\n" }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1$1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfSignatureFieldComponent, { className: "AjfSignatureFieldComponent", filePath: "signature-field.ts", lineNumber: 50 }); })();

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
class AjfFieldService extends AjfFieldService$1 {
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
function AjfFormField_div_0_ng_template_3_Template(rf, ctx) { }
function AjfFormField_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵpipe(1, "ajfFieldIsValid");
    i0.ɵɵpipe(2, "ajfNodeCompleteName");
    i0.ɵɵlistener("keydown", function AjfFormField_div_0_Template_div_keydown_0_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.tabEvent($event, ctx_r1.instance)); });
    i0.ɵɵtemplate(3, AjfFormField_div_0_ng_template_3_Template, 0, 0, "ng-template", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("ajf-validated", i0.ɵɵpipeBind1(1, 3, ctx_r1.instance.validationResults));
    i0.ɵɵproperty("ngClass", "ajf-field-" + i0.ɵɵpipeBind1(2, 5, ctx_r1.instance));
} }
function AjfFormField_ng_container_1_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 6);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const attachment_r3 = ctx.$implicit;
    i0.ɵɵproperty("href", attachment_r3.value, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, attachment_r3.label));
} }
function AjfFormField_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFormField_ng_container_1_a_1_Template, 3, 4, "a", 5);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.instance.node.attachments);
} }
function AjfFormField_div_2_ng_container_1_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const res_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, res_r4.error), " ");
} }
function AjfFormField_div_2_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFormField_div_2_ng_container_1_div_1_Template, 3, 3, "div", 9);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const res_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !res_r4.result);
} }
function AjfFormField_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵtemplate(1, AjfFormField_div_2_ng_container_1_Template, 2, 1, "ng-container", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.instance.validationResults);
} }
class AjfFormField extends AjfFormField$1 {
    constructor(cdr, fieldService) {
        super(cdr);
        this.componentsMap = fieldService.componentsMap;
    }
    tabEvent(evt, instance) {
        if (evt.code != 'Tab')
            return;
        const isShiftKey = evt.shiftKey;
        const cardIdNext = 'field_entry_' + (isShiftKey ? instance.node.id - 1 : instance.node.id + 1);
        const targetElement = document.querySelector(`#${cardIdNext}`);
        if (targetElement == null || instance == null) {
            evt.preventDefault();
            evt.stopPropagation();
        }
    }
    static { this.ɵfac = function AjfFormField_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFormField)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(AjfFieldService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFormField, selectors: [["ajf-field"], ["ajf-form-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 3, vars: 3, consts: [[3, "ngClass", "ajf-validated", "keydown", 4, "ngIf"], [4, "ngIf"], ["class", "ajf-errors", 4, "ngIf"], [3, "keydown", "ngClass"], ["ajf-field-host", ""], ["target", "_blank", 3, "href", 4, "ngFor", "ngForOf"], ["target", "_blank", 3, "href"], [1, "ajf-errors"], [4, "ngFor", "ngForOf"], ["class", "error", 4, "ngIf"], [1, "error"]], template: function AjfFormField_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfFormField_div_0_Template, 4, 7, "div", 0)(1, AjfFormField_ng_container_1_Template, 2, 1, "ng-container", 1)(2, AjfFormField_div_2_Template, 2, 1, "div", 2);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.instance);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.instance && ctx.instance.node && ctx.instance.node.attachments);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.readonly && ctx.instance && ctx.instance.validationResults);
        } }, dependencies: [i2$1.NgClass, i2$1.NgForOf, i2$1.NgIf, i1$1.AjfFieldHost, i5.TranslocoPipe, i1$1.AjfFieldIsValidPipe, i1$1.AjfNodeCompleteNamePipe], styles: [":root{--ajf-control-h: 44px;--ajf-slider-min-h: 420px;--ajf-label-col: 280px;--ajf-side-col: 260px;--ajf-gap: 12px;--ajf-radius: 4px;--ajf-font-sans: system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", sans-serif;--ajf-font-mono: ui-monospace, SFMono-Regular, \"SF Mono\", Menlo, Consolas, monospace;--ajf-bg: var( --mat-sys-surface-container-low, var(--sys-surface-container-low, #f7f5f2) );--ajf-surface: var( --mat-sys-surface, var(--sys-surface, #ffffff) );--ajf-band: var( --mat-sys-surface-container, var(--sys-surface-container, #faf8f5) );--ajf-border: var( --mat-sys-outline-variant, var(--sys-outline-variant, #e6e2dc) );--ajf-border-strong: var( --mat-sys-outline, var(--sys-outline, #d5cfc6) );--ajf-accent: var( --mat-sys-primary, var(--sys-primary, #0f4c5c) );--ajf-accent-fg: var( --mat-sys-on-primary, var(--sys-on-primary, #ffffff) );--ajf-accent-soft: var( --mat-sys-primary-container, var(--sys-primary-container, #e8f1f5) );--ajf-accent-ink: var( --mat-sys-on-primary-container, var(--sys-on-primary-container, #2d6b7f) );--ajf-text: var( --mat-sys-on-surface, var(--sys-on-surface, #1c1a17) );--ajf-text-muted: var( --mat-sys-on-surface-variant, var(--sys-on-surface-variant, #7a736a) );--ajf-danger: var( --mat-sys-error, var(--sys-error, #b8362b) );--ajf-danger-bg: var( --mat-sys-error-container, var(--sys-error-container, #fdf1ef) );--ajf-text-faint: #a49c92;--ajf-accent-hover: #0c3d4a;--ajf-kbd-bg: rgba(255, 255, 255, .22)}@media (prefers-color-scheme: dark){:root:not(.ajf-light){--ajf-bg: var( --mat-sys-surface-container-low, var(--sys-surface-container-low, #16150f) );--ajf-surface: var( --mat-sys-surface, var(--sys-surface, #1e1c17) );--ajf-band: var( --mat-sys-surface-container, var(--sys-surface-container, #262319) );--ajf-border: var( --mat-sys-outline-variant, var(--sys-outline-variant, #35322a) );--ajf-border-strong: var( --mat-sys-outline, var(--sys-outline, #4a463c) );--ajf-accent: var( --mat-sys-primary, var(--sys-primary, #6fbcd0) );--ajf-accent-fg: var( --mat-sys-on-primary, var(--sys-on-primary, #06232b) );--ajf-accent-soft: var( --mat-sys-primary-container, var(--sys-primary-container, #123641) );--ajf-accent-ink: var( --mat-sys-on-primary-container, var(--sys-on-primary-container, #9ad4e4) );--ajf-text: var( --mat-sys-on-surface, var(--sys-on-surface, #f2efe9) );--ajf-text-muted: var( --mat-sys-on-surface-variant, var(--sys-on-surface-variant, #a9a29a) );--ajf-danger: var( --mat-sys-error, var(--sys-error, #ff9b8f) );--ajf-danger-bg: var( --mat-sys-error-container, var(--sys-error-container, #3a201c) );--ajf-text-faint: #7a736a;--ajf-accent-hover: #8fcedf;--ajf-kbd-bg: rgba(0, 0, 0, .22)}}.ajf-dark{--ajf-bg: var( --mat-sys-surface-container-low, var(--sys-surface-container-low, #16150f) );--ajf-surface: var( --mat-sys-surface, var(--sys-surface, #1e1c17) );--ajf-band: var( --mat-sys-surface-container, var(--sys-surface-container, #262319) );--ajf-border: var( --mat-sys-outline-variant, var(--sys-outline-variant, #35322a) );--ajf-border-strong: var( --mat-sys-outline, var(--sys-outline, #4a463c) );--ajf-accent: var( --mat-sys-primary, var(--sys-primary, #6fbcd0) );--ajf-accent-fg: var( --mat-sys-on-primary, var(--sys-on-primary, #06232b) );--ajf-accent-soft: var( --mat-sys-primary-container, var(--sys-primary-container, #123641) );--ajf-accent-ink: var( --mat-sys-on-primary-container, var(--sys-on-primary-container, #9ad4e4) );--ajf-text: var( --mat-sys-on-surface, var(--sys-on-surface, #f2efe9) );--ajf-text-muted: var( --mat-sys-on-surface-variant, var(--sys-on-surface-variant, #a9a29a) );--ajf-danger: var( --mat-sys-error, var(--sys-error, #ff9b8f) );--ajf-danger-bg: var( --mat-sys-error-container, var(--sys-error-container, #3a201c) );--ajf-text-faint: #7a736a;--ajf-accent-hover: #8fcedf;--ajf-kbd-bg: rgba(0, 0, 0, .22)}.ajf-light{--ajf-bg: var( --mat-sys-surface-container-low, var(--sys-surface-container-low, #f7f5f2) );--ajf-surface: var( --mat-sys-surface, var(--sys-surface, #ffffff) );--ajf-band: var( --mat-sys-surface-container, var(--sys-surface-container, #faf8f5) );--ajf-border: var( --mat-sys-outline-variant, var(--sys-outline-variant, #e6e2dc) );--ajf-border-strong: var( --mat-sys-outline, var(--sys-outline, #d5cfc6) );--ajf-accent: var( --mat-sys-primary, var(--sys-primary, #0f4c5c) );--ajf-accent-fg: var( --mat-sys-on-primary, var(--sys-on-primary, #ffffff) );--ajf-accent-soft: var( --mat-sys-primary-container, var(--sys-primary-container, #e8f1f5) );--ajf-accent-ink: var( --mat-sys-on-primary-container, var(--sys-on-primary-container, #2d6b7f) );--ajf-text: var( --mat-sys-on-surface, var(--sys-on-surface, #1c1a17) );--ajf-text-muted: var( --mat-sys-on-surface-variant, var(--sys-on-surface-variant, #7a736a) );--ajf-danger: var( --mat-sys-error, var(--sys-error, #b8362b) );--ajf-danger-bg: var( --mat-sys-error-container, var(--sys-error-container, #fdf1ef) );--ajf-text-faint: #a49c92;--ajf-accent-hover: #0c3d4a;--ajf-kbd-bg: rgba(255, 255, 255, .22)}.ajf-form-container,ajf-field{color-scheme:light dark}.ajf-dark .ajf-form-container,.ajf-dark ajf-field{color-scheme:dark}.ajf-light .ajf-form-container,.ajf-light ajf-field{color-scheme:light}.ajf-control{box-sizing:border-box;min-height:var(--ajf-control-h);padding:0 12px;border:1px solid var(--ajf-border-strong);border-radius:var(--ajf-radius);background:var(--ajf-surface);color:var(--ajf-text);font-family:var(--ajf-font-sans);font-size:14px;line-height:calc(var(--ajf-control-h) - 2px);outline:none;width:100%;max-width:360px}.ajf-control:focus,.ajf-control:focus-within{border-color:var(--ajf-accent);box-shadow:0 0 0 2px var(--ajf-accent-soft)}.ajf-control:disabled,.ajf-control[readonly]{color:var(--ajf-text-muted);background:var(--ajf-band)}.ajf-control--mono{font-family:var(--ajf-font-mono);font-size:13px;letter-spacing:.01em}.ajf-control--narrow{max-width:160px}.ajf-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;box-sizing:border-box;min-height:var(--ajf-control-h);padding:0 16px;border:1px solid var(--ajf-border-strong);border-radius:var(--ajf-radius);background:var(--ajf-surface);color:var(--ajf-text);font-family:var(--ajf-font-sans);font-size:14px;cursor:pointer}.ajf-btn:hover:not(:disabled){border-color:var(--ajf-accent)}.ajf-btn:disabled{color:var(--ajf-text-faint);cursor:default}.ajf-btn--primary{display:inline-flex;align-items:center;justify-content:center;gap:8px;box-sizing:border-box;min-height:var(--ajf-control-h);padding:0 16px;border:1px solid var(--ajf-border-strong);border-radius:var(--ajf-radius);background:var(--ajf-surface);color:var(--ajf-text);font-family:var(--ajf-font-sans);font-size:14px;cursor:pointer;border-color:var(--ajf-accent);background:var(--ajf-accent);color:var(--ajf-accent-fg)}.ajf-btn--primary:hover:not(:disabled){border-color:var(--ajf-accent)}.ajf-btn--primary:disabled{color:var(--ajf-text-faint);cursor:default}.ajf-btn--primary:hover:not(:disabled){border-color:var(--ajf-accent-hover);background:var(--ajf-accent-hover)}.ajf-btn--ghost{display:inline-flex;align-items:center;justify-content:center;gap:8px;box-sizing:border-box;min-height:var(--ajf-control-h);border:1px solid var(--ajf-border-strong);border-radius:var(--ajf-radius);background:var(--ajf-surface);color:var(--ajf-text);font-family:var(--ajf-font-sans);font-size:14px;cursor:pointer;min-height:auto;padding:0 4px;border-color:transparent;background:none;color:var(--ajf-accent-ink);text-decoration:none}.ajf-btn--ghost:hover:not(:disabled){border-color:var(--ajf-accent)}.ajf-btn--ghost:disabled{color:var(--ajf-text-faint);cursor:default}.ajf-btn--ghost:hover:not(:disabled){border-color:transparent;text-decoration:underline}.ajf-btn--ghost.ajf-danger{color:var(--ajf-danger)}.ajf-segmented{display:inline-flex;flex-wrap:wrap;gap:8px}.ajf-segmented .ajf-segment{display:inline-flex;align-items:center;justify-content:center;gap:8px;box-sizing:border-box;min-height:var(--ajf-control-h);padding:0 16px;border:1px solid var(--ajf-border-strong);border-radius:var(--ajf-radius);background:var(--ajf-surface);color:var(--ajf-text);font-family:var(--ajf-font-sans);font-size:14px;cursor:pointer}.ajf-segmented .ajf-segment:hover:not(:disabled){border-color:var(--ajf-accent)}.ajf-segmented .ajf-segment:disabled{color:var(--ajf-text-faint);cursor:default}.ajf-segmented .ajf-segment.ajf-selected{border-color:var(--ajf-accent);background:var(--ajf-accent);color:var(--ajf-accent-fg)}.ajf-chip{display:inline-flex;align-items:center;gap:6px;padding:3px 8px;border-radius:var(--ajf-radius);background:var(--ajf-accent-soft);color:var(--ajf-accent-ink);font-size:13px;white-space:nowrap}.ajf-chip--removable button{display:inline-flex;align-items:center;padding:0;border:0;background:none;color:inherit;cursor:pointer;opacity:.7}.ajf-chip--removable button:hover{opacity:1}.ajf-chip--removable button .mat-icon{width:14px;height:14px;font-size:14px}.ajf-pill{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;background:var(--ajf-band);color:var(--ajf-text-muted);font-size:12px;white-space:nowrap}.ajf-pill--danger{background:var(--ajf-danger-bg);color:var(--ajf-danger);font-weight:500}.ajf-kbd{padding:1px 5px;border-radius:3px;background:var(--ajf-kbd-bg);font-family:var(--ajf-font-mono);font-size:10px}.ajf-input-group{display:inline-flex;align-items:center;overflow:hidden;box-sizing:border-box;min-height:var(--ajf-control-h);border:1px solid var(--ajf-border-strong);border-radius:var(--ajf-radius);background:var(--ajf-surface);color:var(--ajf-text);font-family:var(--ajf-font-sans);font-size:14px;line-height:calc(var(--ajf-control-h) - 2px);outline:none;padding:0}.ajf-input-group:focus,.ajf-input-group:focus-within{border-color:var(--ajf-accent);box-shadow:0 0 0 2px var(--ajf-accent-soft)}.ajf-input-group:disabled,.ajf-input-group[readonly]{color:var(--ajf-text-muted);background:var(--ajf-band)}.ajf-input-group>input{flex:1 1 auto;min-width:0;height:calc(var(--ajf-control-h) - 2px);padding:0 12px;border:0;background:none;color:inherit;font:inherit;outline:none}.ajf-input-group>.ajf-input-group-action{display:inline-flex;align-items:center;justify-content:center;align-self:stretch;padding:0 8px;border:0;border-left:1px solid var(--ajf-border);background:var(--ajf-band);color:var(--ajf-text-muted);cursor:pointer}.ajf-hatch{background-color:var(--ajf-band);background-image:repeating-linear-gradient(45deg,var(--ajf-border) 0,var(--ajf-border) 1px,transparent 1px,transparent 7px)}.ajf-micro-label{font-family:var(--ajf-font-mono);font-size:11px;letter-spacing:.09em;text-transform:uppercase;color:var(--ajf-text-muted)}ajf-field .mat-mdc-select{box-sizing:border-box;min-height:var(--ajf-control-h);padding:0 12px;border:1px solid var(--ajf-border-strong);border-radius:var(--ajf-radius);background:var(--ajf-surface);color:var(--ajf-text);font-family:var(--ajf-font-sans);font-size:14px;line-height:calc(var(--ajf-control-h) - 2px);outline:none;display:inline-flex;align-items:center;width:auto;min-width:240px;max-width:100%}ajf-field .mat-mdc-select:focus,ajf-field .mat-mdc-select:focus-within{border-color:var(--ajf-accent);box-shadow:0 0 0 2px var(--ajf-accent-soft)}ajf-field .mat-mdc-select:disabled,ajf-field .mat-mdc-select[readonly]{color:var(--ajf-text-muted);background:var(--ajf-band)}ajf-field .mat-mdc-select .mat-mdc-select-trigger{height:auto}ajf-field .mat-mdc-select .mat-mdc-select-value{color:var(--ajf-text);font-size:14px}ajf-field .mat-mdc-select .mat-mdc-select-arrow-wrapper{color:var(--ajf-text-muted)}ajf-field .mat-mdc-select-multiple{min-height:var(--ajf-control-h)}ajf-field .mat-mdc-select-multiple .mat-mdc-select-value{display:flex;flex-wrap:wrap;padding:5px 0}ajf-field .mat-mdc-select-multiple mat-select-trigger{display:flex;flex-wrap:wrap;align-items:center;gap:6px;min-width:0}ajf-field .mat-mdc-slide-toggle{--mdc-switch-selected-track-color: var(--ajf-accent);--mdc-switch-selected-handle-color: var(--ajf-surface);--mdc-switch-selected-hover-track-color: var(--ajf-accent);--mdc-switch-selected-focus-track-color: var(--ajf-accent);--mdc-switch-selected-pressed-track-color: var(--ajf-accent);--mdc-switch-selected-hover-handle-color: var(--ajf-surface);--mdc-switch-selected-focus-handle-color: var(--ajf-surface);--mdc-switch-selected-pressed-handle-color: var(--ajf-surface)}ajf-field .mat-mdc-slider{--mdc-slider-handle-color: var(--ajf-surface);--mdc-slider-focus-handle-color: var(--ajf-surface);--mdc-slider-hover-handle-color: var(--ajf-surface);--mdc-slider-active-track-color: var(--ajf-accent);--mdc-slider-inactive-track-color: var(--ajf-border);--mdc-slider-with-tick-marks-active-container-color: var(--ajf-accent-fg);--mdc-slider-with-tick-marks-inactive-container-color: var(--ajf-border-strong);--mdc-slider-handle-elevation: none;--mat-slider-ripple-color: var(--ajf-accent)}ajf-field .mat-datepicker-toggle .mat-mdc-icon-button{width:34px;height:34px;padding:5px;color:var(--ajf-text-muted)}ajf-field{display:block;min-width:0;font-family:var(--ajf-font-sans)}ajf-field .ajf-choices-container{display:flex;flex-direction:row;flex-wrap:wrap;align-items:stretch;gap:8px}ajf-field .ajf-item-container{position:relative}ajf-field .ajf-errors{color:var(--ajf-danger);font-size:13px}ajf-field>a{color:var(--ajf-accent-ink);font-size:13px}ajf-field-row ajf-field .ajf-errors{display:none}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{appearance:none;margin:0}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFormField, [{
        type: Component,
        args: [{ selector: 'ajf-field,ajf-form-field', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div\n    *ngIf=\"instance\"\n    [ngClass]=\"'ajf-field-' + (instance|ajfNodeCompleteName)\"\n    [class.ajf-validated]=\"instance.validationResults|ajfFieldIsValid\"\n    (keydown)=\"tabEvent($event, instance)\"\n>\n  <ng-template ajf-field-host></ng-template>\n</div>\n<ng-container *ngIf=\"instance && instance.node && instance.node.attachments\">\n  <a *ngFor=\"let attachment of instance.node.attachments\"\n    [href]=\"attachment.value\" target=\"_blank\">{{attachment.label | transloco}}</a>\n</ng-container>\n<div *ngIf=\"!readonly && instance && instance.validationResults\" class=\"ajf-errors\">\n  <ng-container *ngFor=\"let res of instance.validationResults\">\n    <div class=\"error\" *ngIf=\"!res.result\">\n      {{ res.error|transloco }}\n    </div>\n  </ng-container>\n</div>\n", styles: [":root{--ajf-control-h: 44px;--ajf-slider-min-h: 420px;--ajf-label-col: 280px;--ajf-side-col: 260px;--ajf-gap: 12px;--ajf-radius: 4px;--ajf-font-sans: system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", sans-serif;--ajf-font-mono: ui-monospace, SFMono-Regular, \"SF Mono\", Menlo, Consolas, monospace;--ajf-bg: var( --mat-sys-surface-container-low, var(--sys-surface-container-low, #f7f5f2) );--ajf-surface: var( --mat-sys-surface, var(--sys-surface, #ffffff) );--ajf-band: var( --mat-sys-surface-container, var(--sys-surface-container, #faf8f5) );--ajf-border: var( --mat-sys-outline-variant, var(--sys-outline-variant, #e6e2dc) );--ajf-border-strong: var( --mat-sys-outline, var(--sys-outline, #d5cfc6) );--ajf-accent: var( --mat-sys-primary, var(--sys-primary, #0f4c5c) );--ajf-accent-fg: var( --mat-sys-on-primary, var(--sys-on-primary, #ffffff) );--ajf-accent-soft: var( --mat-sys-primary-container, var(--sys-primary-container, #e8f1f5) );--ajf-accent-ink: var( --mat-sys-on-primary-container, var(--sys-on-primary-container, #2d6b7f) );--ajf-text: var( --mat-sys-on-surface, var(--sys-on-surface, #1c1a17) );--ajf-text-muted: var( --mat-sys-on-surface-variant, var(--sys-on-surface-variant, #7a736a) );--ajf-danger: var( --mat-sys-error, var(--sys-error, #b8362b) );--ajf-danger-bg: var( --mat-sys-error-container, var(--sys-error-container, #fdf1ef) );--ajf-text-faint: #a49c92;--ajf-accent-hover: #0c3d4a;--ajf-kbd-bg: rgba(255, 255, 255, .22)}@media (prefers-color-scheme: dark){:root:not(.ajf-light){--ajf-bg: var( --mat-sys-surface-container-low, var(--sys-surface-container-low, #16150f) );--ajf-surface: var( --mat-sys-surface, var(--sys-surface, #1e1c17) );--ajf-band: var( --mat-sys-surface-container, var(--sys-surface-container, #262319) );--ajf-border: var( --mat-sys-outline-variant, var(--sys-outline-variant, #35322a) );--ajf-border-strong: var( --mat-sys-outline, var(--sys-outline, #4a463c) );--ajf-accent: var( --mat-sys-primary, var(--sys-primary, #6fbcd0) );--ajf-accent-fg: var( --mat-sys-on-primary, var(--sys-on-primary, #06232b) );--ajf-accent-soft: var( --mat-sys-primary-container, var(--sys-primary-container, #123641) );--ajf-accent-ink: var( --mat-sys-on-primary-container, var(--sys-on-primary-container, #9ad4e4) );--ajf-text: var( --mat-sys-on-surface, var(--sys-on-surface, #f2efe9) );--ajf-text-muted: var( --mat-sys-on-surface-variant, var(--sys-on-surface-variant, #a9a29a) );--ajf-danger: var( --mat-sys-error, var(--sys-error, #ff9b8f) );--ajf-danger-bg: var( --mat-sys-error-container, var(--sys-error-container, #3a201c) );--ajf-text-faint: #7a736a;--ajf-accent-hover: #8fcedf;--ajf-kbd-bg: rgba(0, 0, 0, .22)}}.ajf-dark{--ajf-bg: var( --mat-sys-surface-container-low, var(--sys-surface-container-low, #16150f) );--ajf-surface: var( --mat-sys-surface, var(--sys-surface, #1e1c17) );--ajf-band: var( --mat-sys-surface-container, var(--sys-surface-container, #262319) );--ajf-border: var( --mat-sys-outline-variant, var(--sys-outline-variant, #35322a) );--ajf-border-strong: var( --mat-sys-outline, var(--sys-outline, #4a463c) );--ajf-accent: var( --mat-sys-primary, var(--sys-primary, #6fbcd0) );--ajf-accent-fg: var( --mat-sys-on-primary, var(--sys-on-primary, #06232b) );--ajf-accent-soft: var( --mat-sys-primary-container, var(--sys-primary-container, #123641) );--ajf-accent-ink: var( --mat-sys-on-primary-container, var(--sys-on-primary-container, #9ad4e4) );--ajf-text: var( --mat-sys-on-surface, var(--sys-on-surface, #f2efe9) );--ajf-text-muted: var( --mat-sys-on-surface-variant, var(--sys-on-surface-variant, #a9a29a) );--ajf-danger: var( --mat-sys-error, var(--sys-error, #ff9b8f) );--ajf-danger-bg: var( --mat-sys-error-container, var(--sys-error-container, #3a201c) );--ajf-text-faint: #7a736a;--ajf-accent-hover: #8fcedf;--ajf-kbd-bg: rgba(0, 0, 0, .22)}.ajf-light{--ajf-bg: var( --mat-sys-surface-container-low, var(--sys-surface-container-low, #f7f5f2) );--ajf-surface: var( --mat-sys-surface, var(--sys-surface, #ffffff) );--ajf-band: var( --mat-sys-surface-container, var(--sys-surface-container, #faf8f5) );--ajf-border: var( --mat-sys-outline-variant, var(--sys-outline-variant, #e6e2dc) );--ajf-border-strong: var( --mat-sys-outline, var(--sys-outline, #d5cfc6) );--ajf-accent: var( --mat-sys-primary, var(--sys-primary, #0f4c5c) );--ajf-accent-fg: var( --mat-sys-on-primary, var(--sys-on-primary, #ffffff) );--ajf-accent-soft: var( --mat-sys-primary-container, var(--sys-primary-container, #e8f1f5) );--ajf-accent-ink: var( --mat-sys-on-primary-container, var(--sys-on-primary-container, #2d6b7f) );--ajf-text: var( --mat-sys-on-surface, var(--sys-on-surface, #1c1a17) );--ajf-text-muted: var( --mat-sys-on-surface-variant, var(--sys-on-surface-variant, #7a736a) );--ajf-danger: var( --mat-sys-error, var(--sys-error, #b8362b) );--ajf-danger-bg: var( --mat-sys-error-container, var(--sys-error-container, #fdf1ef) );--ajf-text-faint: #a49c92;--ajf-accent-hover: #0c3d4a;--ajf-kbd-bg: rgba(255, 255, 255, .22)}.ajf-form-container,ajf-field{color-scheme:light dark}.ajf-dark .ajf-form-container,.ajf-dark ajf-field{color-scheme:dark}.ajf-light .ajf-form-container,.ajf-light ajf-field{color-scheme:light}.ajf-control{box-sizing:border-box;min-height:var(--ajf-control-h);padding:0 12px;border:1px solid var(--ajf-border-strong);border-radius:var(--ajf-radius);background:var(--ajf-surface);color:var(--ajf-text);font-family:var(--ajf-font-sans);font-size:14px;line-height:calc(var(--ajf-control-h) - 2px);outline:none;width:100%;max-width:360px}.ajf-control:focus,.ajf-control:focus-within{border-color:var(--ajf-accent);box-shadow:0 0 0 2px var(--ajf-accent-soft)}.ajf-control:disabled,.ajf-control[readonly]{color:var(--ajf-text-muted);background:var(--ajf-band)}.ajf-control--mono{font-family:var(--ajf-font-mono);font-size:13px;letter-spacing:.01em}.ajf-control--narrow{max-width:160px}.ajf-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;box-sizing:border-box;min-height:var(--ajf-control-h);padding:0 16px;border:1px solid var(--ajf-border-strong);border-radius:var(--ajf-radius);background:var(--ajf-surface);color:var(--ajf-text);font-family:var(--ajf-font-sans);font-size:14px;cursor:pointer}.ajf-btn:hover:not(:disabled){border-color:var(--ajf-accent)}.ajf-btn:disabled{color:var(--ajf-text-faint);cursor:default}.ajf-btn--primary{display:inline-flex;align-items:center;justify-content:center;gap:8px;box-sizing:border-box;min-height:var(--ajf-control-h);padding:0 16px;border:1px solid var(--ajf-border-strong);border-radius:var(--ajf-radius);background:var(--ajf-surface);color:var(--ajf-text);font-family:var(--ajf-font-sans);font-size:14px;cursor:pointer;border-color:var(--ajf-accent);background:var(--ajf-accent);color:var(--ajf-accent-fg)}.ajf-btn--primary:hover:not(:disabled){border-color:var(--ajf-accent)}.ajf-btn--primary:disabled{color:var(--ajf-text-faint);cursor:default}.ajf-btn--primary:hover:not(:disabled){border-color:var(--ajf-accent-hover);background:var(--ajf-accent-hover)}.ajf-btn--ghost{display:inline-flex;align-items:center;justify-content:center;gap:8px;box-sizing:border-box;min-height:var(--ajf-control-h);border:1px solid var(--ajf-border-strong);border-radius:var(--ajf-radius);background:var(--ajf-surface);color:var(--ajf-text);font-family:var(--ajf-font-sans);font-size:14px;cursor:pointer;min-height:auto;padding:0 4px;border-color:transparent;background:none;color:var(--ajf-accent-ink);text-decoration:none}.ajf-btn--ghost:hover:not(:disabled){border-color:var(--ajf-accent)}.ajf-btn--ghost:disabled{color:var(--ajf-text-faint);cursor:default}.ajf-btn--ghost:hover:not(:disabled){border-color:transparent;text-decoration:underline}.ajf-btn--ghost.ajf-danger{color:var(--ajf-danger)}.ajf-segmented{display:inline-flex;flex-wrap:wrap;gap:8px}.ajf-segmented .ajf-segment{display:inline-flex;align-items:center;justify-content:center;gap:8px;box-sizing:border-box;min-height:var(--ajf-control-h);padding:0 16px;border:1px solid var(--ajf-border-strong);border-radius:var(--ajf-radius);background:var(--ajf-surface);color:var(--ajf-text);font-family:var(--ajf-font-sans);font-size:14px;cursor:pointer}.ajf-segmented .ajf-segment:hover:not(:disabled){border-color:var(--ajf-accent)}.ajf-segmented .ajf-segment:disabled{color:var(--ajf-text-faint);cursor:default}.ajf-segmented .ajf-segment.ajf-selected{border-color:var(--ajf-accent);background:var(--ajf-accent);color:var(--ajf-accent-fg)}.ajf-chip{display:inline-flex;align-items:center;gap:6px;padding:3px 8px;border-radius:var(--ajf-radius);background:var(--ajf-accent-soft);color:var(--ajf-accent-ink);font-size:13px;white-space:nowrap}.ajf-chip--removable button{display:inline-flex;align-items:center;padding:0;border:0;background:none;color:inherit;cursor:pointer;opacity:.7}.ajf-chip--removable button:hover{opacity:1}.ajf-chip--removable button .mat-icon{width:14px;height:14px;font-size:14px}.ajf-pill{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;background:var(--ajf-band);color:var(--ajf-text-muted);font-size:12px;white-space:nowrap}.ajf-pill--danger{background:var(--ajf-danger-bg);color:var(--ajf-danger);font-weight:500}.ajf-kbd{padding:1px 5px;border-radius:3px;background:var(--ajf-kbd-bg);font-family:var(--ajf-font-mono);font-size:10px}.ajf-input-group{display:inline-flex;align-items:center;overflow:hidden;box-sizing:border-box;min-height:var(--ajf-control-h);border:1px solid var(--ajf-border-strong);border-radius:var(--ajf-radius);background:var(--ajf-surface);color:var(--ajf-text);font-family:var(--ajf-font-sans);font-size:14px;line-height:calc(var(--ajf-control-h) - 2px);outline:none;padding:0}.ajf-input-group:focus,.ajf-input-group:focus-within{border-color:var(--ajf-accent);box-shadow:0 0 0 2px var(--ajf-accent-soft)}.ajf-input-group:disabled,.ajf-input-group[readonly]{color:var(--ajf-text-muted);background:var(--ajf-band)}.ajf-input-group>input{flex:1 1 auto;min-width:0;height:calc(var(--ajf-control-h) - 2px);padding:0 12px;border:0;background:none;color:inherit;font:inherit;outline:none}.ajf-input-group>.ajf-input-group-action{display:inline-flex;align-items:center;justify-content:center;align-self:stretch;padding:0 8px;border:0;border-left:1px solid var(--ajf-border);background:var(--ajf-band);color:var(--ajf-text-muted);cursor:pointer}.ajf-hatch{background-color:var(--ajf-band);background-image:repeating-linear-gradient(45deg,var(--ajf-border) 0,var(--ajf-border) 1px,transparent 1px,transparent 7px)}.ajf-micro-label{font-family:var(--ajf-font-mono);font-size:11px;letter-spacing:.09em;text-transform:uppercase;color:var(--ajf-text-muted)}ajf-field .mat-mdc-select{box-sizing:border-box;min-height:var(--ajf-control-h);padding:0 12px;border:1px solid var(--ajf-border-strong);border-radius:var(--ajf-radius);background:var(--ajf-surface);color:var(--ajf-text);font-family:var(--ajf-font-sans);font-size:14px;line-height:calc(var(--ajf-control-h) - 2px);outline:none;display:inline-flex;align-items:center;width:auto;min-width:240px;max-width:100%}ajf-field .mat-mdc-select:focus,ajf-field .mat-mdc-select:focus-within{border-color:var(--ajf-accent);box-shadow:0 0 0 2px var(--ajf-accent-soft)}ajf-field .mat-mdc-select:disabled,ajf-field .mat-mdc-select[readonly]{color:var(--ajf-text-muted);background:var(--ajf-band)}ajf-field .mat-mdc-select .mat-mdc-select-trigger{height:auto}ajf-field .mat-mdc-select .mat-mdc-select-value{color:var(--ajf-text);font-size:14px}ajf-field .mat-mdc-select .mat-mdc-select-arrow-wrapper{color:var(--ajf-text-muted)}ajf-field .mat-mdc-select-multiple{min-height:var(--ajf-control-h)}ajf-field .mat-mdc-select-multiple .mat-mdc-select-value{display:flex;flex-wrap:wrap;padding:5px 0}ajf-field .mat-mdc-select-multiple mat-select-trigger{display:flex;flex-wrap:wrap;align-items:center;gap:6px;min-width:0}ajf-field .mat-mdc-slide-toggle{--mdc-switch-selected-track-color: var(--ajf-accent);--mdc-switch-selected-handle-color: var(--ajf-surface);--mdc-switch-selected-hover-track-color: var(--ajf-accent);--mdc-switch-selected-focus-track-color: var(--ajf-accent);--mdc-switch-selected-pressed-track-color: var(--ajf-accent);--mdc-switch-selected-hover-handle-color: var(--ajf-surface);--mdc-switch-selected-focus-handle-color: var(--ajf-surface);--mdc-switch-selected-pressed-handle-color: var(--ajf-surface)}ajf-field .mat-mdc-slider{--mdc-slider-handle-color: var(--ajf-surface);--mdc-slider-focus-handle-color: var(--ajf-surface);--mdc-slider-hover-handle-color: var(--ajf-surface);--mdc-slider-active-track-color: var(--ajf-accent);--mdc-slider-inactive-track-color: var(--ajf-border);--mdc-slider-with-tick-marks-active-container-color: var(--ajf-accent-fg);--mdc-slider-with-tick-marks-inactive-container-color: var(--ajf-border-strong);--mdc-slider-handle-elevation: none;--mat-slider-ripple-color: var(--ajf-accent)}ajf-field .mat-datepicker-toggle .mat-mdc-icon-button{width:34px;height:34px;padding:5px;color:var(--ajf-text-muted)}ajf-field{display:block;min-width:0;font-family:var(--ajf-font-sans)}ajf-field .ajf-choices-container{display:flex;flex-direction:row;flex-wrap:wrap;align-items:stretch;gap:8px}ajf-field .ajf-item-container{position:relative}ajf-field .ajf-errors{color:var(--ajf-danger);font-size:13px}ajf-field>a{color:var(--ajf-accent-ink);font-size:13px}ajf-field-row ajf-field .ajf-errors{display:none}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{appearance:none;margin:0}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: AjfFieldService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFormField, { className: "AjfFormField", filePath: "field.ts", lineNumber: 45 }); })();

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
function AjfFieldRow_div_0_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 13);
    i0.ɵɵtext(1, "*");
    i0.ɵɵelementEnd();
} }
function AjfFieldRow_div_0_mat_icon_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 14);
    i0.ɵɵpipe(1, "transloco");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const hint_r1 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("matTooltip", i0.ɵɵpipeBind1(1, 2, hint_r1));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.instance.node.hintIcon || "help");
} }
function AjfFieldRow_div_0_ng_container_7_span_1_ng_container_3_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const type_r3 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, type_r3.detailUnit), "");
} }
function AjfFieldRow_div_0_ng_container_7_span_1_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵtemplate(2, AjfFieldRow_div_0_ng_container_7_span_1_ng_container_3_ng_container_2_Template, 3, 3, "ng-container", 7);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const type_r3 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" \u00B7 ", type_r3.detailValue, "");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", type_r3.detailUnit);
} }
function AjfFieldRow_div_0_ng_container_7_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵtemplate(3, AjfFieldRow_div_0_ng_container_7_span_1_ng_container_3_Template, 3, 2, "ng-container", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r3 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, type_r3.name));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", type_r3.detailValue);
} }
function AjfFieldRow_div_0_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFieldRow_div_0_ng_container_7_span_1_Template, 4, 4, "span", 15);
    i0.ɵɵpipe(2, "ajfFieldTypeLabel");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(2, 1, ctx_r1.instance));
} }
function AjfFieldRow_div_0_span_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 17);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "ajfAsFieldInstanceErrors");
    i0.ɵɵpipe(3, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 3, i0.ɵɵpipeBind1(2, 1, ctx_r1.instance)));
} }
function AjfFieldRow_div_0_span_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 18);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.instance.node.description));
} }
function AjfFieldRow_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "span", 3);
    i0.ɵɵelement(3, "label", 4);
    i0.ɵɵpipe(4, "transloco");
    i0.ɵɵtemplate(5, AjfFieldRow_div_0_span_5_Template, 2, 0, "span", 5)(6, AjfFieldRow_div_0_mat_icon_6_Template, 3, 4, "mat-icon", 6);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, AjfFieldRow_div_0_ng_container_7_Template, 3, 3, "ng-container", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 8);
    i0.ɵɵelement(9, "ajf-field", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 10);
    i0.ɵɵtemplate(11, AjfFieldRow_div_0_span_11_Template, 4, 5, "span", 11)(12, AjfFieldRow_div_0_span_12_Template, 3, 3, "span", 12);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("ajf-invalid", !ctx_r1.instance.valid)("ajf-readonly", ctx_r1.readonly)("ajf-note-row", ctx_r1.isNote);
    i0.ɵɵproperty("ngClass", "ajf-" + ctx_r1.instance.node.size + " ajf-field-type-" + ctx_r1.instance.node.fieldType);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(4, 17, ctx_r1.instance.node.label), i0.ɵɵsanitizeHtml);
    i0.ɵɵattribute("id", ctx_r1.instance.node.name);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.required);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.instance.node.hint);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.isNote);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("instance", ctx_r1.instance)("readonly", ctx_r1.readonly)("id", "field_entry_" + ctx_r1.instance.node.id);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r1.instance.valid);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.instance.valid && ctx_r1.instance.node.description);
} }
/**
 * One field of a slide, laid out as a row: type badge, label, control, and a
 * right-hand column carrying either the field description or its validation
 * error.
 *
 * Both the plain and the repeating slide branches of the renderer render through
 * this component, so the row layout is defined in exactly one place.
 */
class AjfFieldRow {
    set instance(instance) {
        this._instance = instance;
        // Validity, visibility and the error list are mutated in place on the
        // instance, so the row has to be told to re-check itself the same way the
        // field components do.
        this._instanceSub.unsubscribe();
        this._instanceSub = instance
            ? instance.updatedEvt.subscribe(() => this._cdr.markForCheck())
            : Subscription.EMPTY;
    }
    get instance() {
        return this._instance;
    }
    constructor(_cdr) {
        this._cdr = _cdr;
        this._instanceSub = Subscription.EMPTY;
        this._readonly = false;
    }
    ngOnDestroy() {
        this._instanceSub.unsubscribe();
    }
    set readonly(readonly) {
        this._readonly = coerceBooleanProperty(readonly);
    }
    get readonly() {
        return this._readonly;
    }
    /**
     * Rows drop out on the host element rather than inside it, so that a hidden
     * field leaves no empty cell behind when rows are laid out in columns.
     *
     * A formula field with no label carries no information of its own -- it only
     * feeds other fields -- so it is kept out of the layout too.
     */
    get hidden() {
        const node = this.instance?.node;
        if (node == null || this.instance.visible === false) {
            return true;
        }
        return node.fieldType === AjfFieldType.Formula && node.label === '';
    }
    /** Notes render their own block and never get a control border around it. */
    get isNote() {
        return this.instance?.node.fieldType === AjfFieldType.Empty;
    }
    get required() {
        return this.instance?.node.validation?.notEmpty != null;
    }
    static { this.ɵfac = function AjfFieldRow_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFieldRow)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFieldRow, selectors: [["ajf-field-row"]], hostVars: 2, hostBindings: function AjfFieldRow_HostBindings(rf, ctx) { if (rf & 2) {
            i0.ɵɵclassProp("ajf-hidden-row", ctx.hidden);
        } }, inputs: { instance: "instance", readonly: "readonly" }, decls: 1, vars: 1, consts: [["class", "ajf-field-row", 3, "ajf-invalid", "ajf-readonly", "ajf-note-row", "ngClass", 4, "ngIf"], [1, "ajf-field-row", 3, "ngClass"], [1, "ajf-field-label"], [1, "ajf-field-label-line"], [3, "innerHTML"], ["class", "ajf-required", "aria-hidden", "true", 4, "ngIf"], ["class", "ajf-hint-icon", "matTooltipPosition", "right", 3, "matTooltip", 4, "ngIf"], [4, "ngIf"], [1, "ajf-field-control"], [3, "instance", "readonly", "id"], [1, "ajf-field-side"], ["class", "ajf-field-error-message", 4, "ngIf"], ["class", "ajf-field-hint-text", 4, "ngIf"], ["aria-hidden", "true", 1, "ajf-required"], ["matTooltipPosition", "right", 1, "ajf-hint-icon", 3, "matTooltip"], ["class", "ajf-field-type-name", 4, "ngIf"], [1, "ajf-field-type-name"], [1, "ajf-field-error-message"], [1, "ajf-field-hint-text"]], template: function AjfFieldRow_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfFieldRow_div_0_Template, 13, 19, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", !ctx.hidden);
        } }, dependencies: [i2$1.NgClass, i2$1.NgIf, i2$7.MatIcon, i3$3.MatTooltip, AjfFormField, i5.TranslocoPipe, i1$1.AjfAsFieldInstanceErrorsPipe, i1$1.AjfFieldTypeLabelPipe], styles: ["ajf-field-row{display:block}ajf-field-row.ajf-hidden-row{display:none}ajf-field-row .ajf-field-row{display:flex;flex-wrap:nowrap;align-items:flex-start;gap:var(--ajf-gap);box-sizing:border-box;padding:10px 20px;border-bottom:1px solid var(--ajf-border);background:var(--ajf-surface);font-family:var(--ajf-font-sans)}ajf-field-row .ajf-field-label{display:flex;flex:0 0 var(--ajf-label-col);flex-direction:column;justify-content:center;gap:2px;min-height:var(--ajf-control-h);max-width:var(--ajf-label-col)}ajf-field-row .ajf-field-label .ajf-field-label-line{display:flex;align-items:center;gap:6px}ajf-field-row .ajf-field-label label{color:var(--ajf-text);font-size:14px;font-weight:500;line-height:1.35}ajf-field-row .ajf-field-label .ajf-field-type-name{color:var(--ajf-text-muted);font-size:12px;line-height:1.3}ajf-field-row .ajf-field-label .ajf-required{color:var(--ajf-danger);font-weight:600}ajf-field-row .ajf-field-label .ajf-hint-icon{width:16px;height:16px;border-radius:50%;background:var(--ajf-border);color:var(--ajf-text-muted);font-size:12px;line-height:16px;cursor:help}ajf-field-row .ajf-field-control{display:flex;flex:1 1 auto;flex-wrap:wrap;align-items:center;gap:8px;min-width:0}ajf-field-row .ajf-field-control>ajf-field{flex:1 1 auto;min-width:0}ajf-field-row .ajf-field-side{display:flex;flex:0 0 var(--ajf-side-col);align-items:center;min-height:var(--ajf-control-h);max-width:var(--ajf-side-col)}ajf-field-row .ajf-field-side .ajf-field-hint-text{color:var(--ajf-text-muted);font-size:13px}ajf-field-row .ajf-field-side .ajf-field-error-message{color:var(--ajf-danger);font-size:13px}ajf-field-row .ajf-normal .ajf-field-control{max-width:none}ajf-field-row .ajf-small .ajf-field-control{max-width:420px}ajf-field-row .ajf-smaller .ajf-field-control{max-width:320px}ajf-field-row .ajf-tiny .ajf-field-control{max-width:220px}ajf-field-row .ajf-mini .ajf-field-control{max-width:140px}ajf-field-row .ajf-field-row.ajf-invalid{background:color-mix(in srgb,var(--ajf-danger-bg) 45%,var(--ajf-surface))}ajf-field-row .ajf-field-row.ajf-invalid .ajf-control,ajf-field-row .ajf-field-row.ajf-invalid input.ajf-control,ajf-field-row .ajf-field-row.ajf-invalid .mat-mdc-select-trigger{border-color:var(--ajf-danger)}ajf-field-row .ajf-field-row.ajf-readonly .ajf-field-side{flex-basis:auto}ajf-field-row .ajf-note-row .ajf-field-control,ajf-field-row .ajf-field-type-1 .ajf-field-control,ajf-field-row .ajf-field-type-11 .ajf-field-control{max-width:none}@media (width <= 900px){ajf-field-row .ajf-field-row{flex-wrap:wrap;padding:12px 16px}ajf-field-row .ajf-field-label,ajf-field-row .ajf-field-side{flex-basis:100%;max-width:none;min-height:0}ajf-field-row .ajf-field-control{flex-basis:100%}}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFieldRow, [{
        type: Component,
        args: [{ selector: 'ajf-field-row', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div\n  *ngIf=\"!hidden\"\n  class=\"ajf-field-row\"\n  [class.ajf-invalid]=\"!instance.valid\"\n  [class.ajf-readonly]=\"readonly\"\n  [class.ajf-note-row]=\"isNote\"\n  [ngClass]=\"'ajf-' + instance.node.size + ' ajf-field-type-' + instance.node.fieldType\"\n>\n  <div class=\"ajf-field-label\">\n    <span class=\"ajf-field-label-line\">\n      <label [attr.id]=\"instance.node.name\" [innerHTML]=\"instance.node.label | transloco\"></label>\n      <span class=\"ajf-required\" *ngIf=\"required\" aria-hidden=\"true\">*</span>\n      <mat-icon\n        class=\"ajf-hint-icon\"\n        *ngIf=\"instance.node.hint as hint\"\n        [matTooltip]=\"hint | transloco\"\n        matTooltipPosition=\"right\"\n        >{{ instance.node.hintIcon || 'help' }}</mat-icon\n      >\n    </span>\n    <!-- A note carries prose, not a value, so naming its type says nothing. -->\n    <ng-container *ngIf=\"!isNote\">\n      <span class=\"ajf-field-type-name\" *ngIf=\"instance | ajfFieldTypeLabel as type\"\n        >{{ type.name | transloco }}<ng-container *ngIf=\"type.detailValue\"> &middot;\n          {{ type.detailValue }}<ng-container *ngIf=\"type.detailUnit\">\n            {{ type.detailUnit | transloco }}</ng-container\n          ></ng-container\n        ></span\n      >\n    </ng-container>\n  </div>\n\n  <div class=\"ajf-field-control\">\n    <ajf-field\n      [instance]=\"instance\"\n      [readonly]=\"readonly\"\n      [id]=\"'field_entry_' + instance.node.id\"\n    ></ajf-field>\n  </div>\n\n  <div class=\"ajf-field-side\">\n    <span class=\"ajf-field-error-message\" *ngIf=\"!instance.valid\">{{\n      instance | ajfAsFieldInstanceErrors | transloco\n    }}</span>\n    <span class=\"ajf-field-hint-text\" *ngIf=\"instance.valid && instance.node.description\">{{\n      instance.node.description | transloco\n    }}</span>\n  </div>\n</div>\n", styles: ["ajf-field-row{display:block}ajf-field-row.ajf-hidden-row{display:none}ajf-field-row .ajf-field-row{display:flex;flex-wrap:nowrap;align-items:flex-start;gap:var(--ajf-gap);box-sizing:border-box;padding:10px 20px;border-bottom:1px solid var(--ajf-border);background:var(--ajf-surface);font-family:var(--ajf-font-sans)}ajf-field-row .ajf-field-label{display:flex;flex:0 0 var(--ajf-label-col);flex-direction:column;justify-content:center;gap:2px;min-height:var(--ajf-control-h);max-width:var(--ajf-label-col)}ajf-field-row .ajf-field-label .ajf-field-label-line{display:flex;align-items:center;gap:6px}ajf-field-row .ajf-field-label label{color:var(--ajf-text);font-size:14px;font-weight:500;line-height:1.35}ajf-field-row .ajf-field-label .ajf-field-type-name{color:var(--ajf-text-muted);font-size:12px;line-height:1.3}ajf-field-row .ajf-field-label .ajf-required{color:var(--ajf-danger);font-weight:600}ajf-field-row .ajf-field-label .ajf-hint-icon{width:16px;height:16px;border-radius:50%;background:var(--ajf-border);color:var(--ajf-text-muted);font-size:12px;line-height:16px;cursor:help}ajf-field-row .ajf-field-control{display:flex;flex:1 1 auto;flex-wrap:wrap;align-items:center;gap:8px;min-width:0}ajf-field-row .ajf-field-control>ajf-field{flex:1 1 auto;min-width:0}ajf-field-row .ajf-field-side{display:flex;flex:0 0 var(--ajf-side-col);align-items:center;min-height:var(--ajf-control-h);max-width:var(--ajf-side-col)}ajf-field-row .ajf-field-side .ajf-field-hint-text{color:var(--ajf-text-muted);font-size:13px}ajf-field-row .ajf-field-side .ajf-field-error-message{color:var(--ajf-danger);font-size:13px}ajf-field-row .ajf-normal .ajf-field-control{max-width:none}ajf-field-row .ajf-small .ajf-field-control{max-width:420px}ajf-field-row .ajf-smaller .ajf-field-control{max-width:320px}ajf-field-row .ajf-tiny .ajf-field-control{max-width:220px}ajf-field-row .ajf-mini .ajf-field-control{max-width:140px}ajf-field-row .ajf-field-row.ajf-invalid{background:color-mix(in srgb,var(--ajf-danger-bg) 45%,var(--ajf-surface))}ajf-field-row .ajf-field-row.ajf-invalid .ajf-control,ajf-field-row .ajf-field-row.ajf-invalid input.ajf-control,ajf-field-row .ajf-field-row.ajf-invalid .mat-mdc-select-trigger{border-color:var(--ajf-danger)}ajf-field-row .ajf-field-row.ajf-readonly .ajf-field-side{flex-basis:auto}ajf-field-row .ajf-note-row .ajf-field-control,ajf-field-row .ajf-field-type-1 .ajf-field-control,ajf-field-row .ajf-field-type-11 .ajf-field-control{max-width:none}@media (width <= 900px){ajf-field-row .ajf-field-row{flex-wrap:wrap;padding:12px 16px}ajf-field-row .ajf-field-label,ajf-field-row .ajf-field-side{flex-basis:100%;max-width:none;min-height:0}ajf-field-row .ajf-field-control{flex-basis:100%}}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }], { instance: [{
            type: Input
        }], readonly: [{
            type: Input
        }], hidden: [{
            type: HostBinding,
            args: ['class.ajf-hidden-row']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFieldRow, { className: "AjfFieldRow", filePath: "field-row.ts", lineNumber: 51 }); })();

function AjfRepStrip_button_10_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 8);
    i0.ɵɵlistener("click", function AjfRepStrip_button_10_Template_button_click_0_listener() { const idx_r2 = i0.ɵɵrestoreView(_r1).index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goTo.emit(idx_r2)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const idx_r2 = ctx.index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("ajf-selected", idx_r2 === ctx_r2.current);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", idx_r2 + 1, " ");
} }
function AjfRepStrip_ng_container_16_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "button", 3);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵlistener("click", function AjfRepStrip_ng_container_16_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.add.emit()); });
    i0.ɵɵelementStart(3, "mat-icon");
    i0.ɵɵtext(4, "add");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "button", 3);
    i0.ɵɵpipe(6, "transloco");
    i0.ɵɵlistener("click", function AjfRepStrip_ng_container_16_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.remove.emit()); });
    i0.ɵɵelementStart(7, "mat-icon");
    i0.ɵɵtext(8, "remove");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r2.canAdd);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(2, 4, "Add"));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r2.canRemove);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(6, 6, "Remove"));
} }
/**
 * The pager for a repeating slide: one button per repetition plus add and remove
 * actions. The renderer keeps one page per repetition, so picking a number here
 * is a page change, which the renderer performs.
 */
class AjfRepStrip {
    constructor() {
        /** The repetition currently on screen, zero based. */
        this.current = 0;
        this._readonly = false;
        this.goTo = new EventEmitter();
        this.add = new EventEmitter();
        this.remove = new EventEmitter();
    }
    set readonly(readonly) {
        this._readonly = coerceBooleanProperty(readonly);
    }
    get readonly() {
        return this._readonly;
    }
    get canAdd() {
        return (!!this.slide.canAdd && !(this.slide.node.disableRemoval && !this.slide.valid));
    }
    get canRemove() {
        return !!this.slide.canRemove && !this.slide.node.disableRemoval;
    }
    static { this.ɵfac = function AjfRepStrip_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfRepStrip)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfRepStrip, selectors: [["ajf-rep-strip"]], inputs: { slide: "slide", current: "current", readonly: "readonly" }, outputs: { goTo: "goTo", add: "add", remove: "remove" }, decls: 22, vars: 26, consts: [[1, "ajf-rep-strip"], [1, "ajf-micro-label", "ajf-rep-strip-label"], [1, "ajf-rep-pager"], ["type", "button", 1, "ajf-btn", 3, "click", "disabled"], ["type", "button", "class", "ajf-btn ajf-rep-page", 3, "ajf-selected", "click", 4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "ajf-rep-strip-context"], [3, "innerHTML"], ["type", "button", 1, "ajf-btn", "ajf-rep-page", 3, "click"]], template: function AjfRepStrip_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "span", 1);
            i0.ɵɵtext(2);
            i0.ɵɵpipe(3, "transloco");
            i0.ɵɵpipe(4, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 2)(6, "button", 3);
            i0.ɵɵpipe(7, "transloco");
            i0.ɵɵlistener("click", function AjfRepStrip_Template_button_click_6_listener() { return ctx.goTo.emit(ctx.current - 1); });
            i0.ɵɵelementStart(8, "mat-icon");
            i0.ɵɵtext(9, "chevron_left");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(10, AjfRepStrip_button_10_Template, 2, 3, "button", 4);
            i0.ɵɵpipe(11, "ajfRange");
            i0.ɵɵelementStart(12, "button", 3);
            i0.ɵɵpipe(13, "transloco");
            i0.ɵɵlistener("click", function AjfRepStrip_Template_button_click_12_listener() { return ctx.goTo.emit(ctx.current + 1); });
            i0.ɵɵelementStart(14, "mat-icon");
            i0.ɵɵtext(15, "chevron_right");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(16, AjfRepStrip_ng_container_16_Template, 9, 8, "ng-container", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "span", 6);
            i0.ɵɵelement(18, "span", 7);
            i0.ɵɵpipe(19, "transloco");
            i0.ɵɵtext(20);
            i0.ɵɵpipe(21, "transloco");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(3, 12, "Number of"), " ", i0.ɵɵpipeBind1(4, 14, ctx.slide.node.label), "");
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", ctx.current === 0);
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(7, 16, "Back"));
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(11, 18, ctx.slide.reps));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.current >= ctx.slide.reps - 1);
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(13, 20, "Forward"));
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", !ctx.readonly);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(19, 22, ctx.slide.node.label), i0.ɵɵsanitizeHtml);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate3(" ", ctx.current + 1, " ", i0.ɵɵpipeBind1(21, 24, "of"), " ", ctx.slide.reps, " ");
        } }, dependencies: [i2$1.NgForOf, i2$1.NgIf, i2$7.MatIcon, i5.TranslocoPipe, i1$1.AjfRangePipe], styles: ["ajf-rep-strip{display:block}ajf-rep-strip .ajf-rep-strip{display:flex;flex-wrap:wrap;align-items:center;gap:10px;padding:8px 20px;border-bottom:1px solid var(--ajf-border);background:var(--ajf-band);font-family:var(--ajf-font-sans)}ajf-rep-strip .ajf-rep-strip-label{flex:0 0 auto}ajf-rep-strip .ajf-rep-pager{display:flex;flex-wrap:wrap;gap:6px}ajf-rep-strip .ajf-rep-pager .ajf-btn{min-width:32px;min-height:32px;padding:0 6px;font-size:13px}ajf-rep-strip .ajf-rep-pager .ajf-btn .mat-icon{width:18px;height:18px;font-size:18px}ajf-rep-strip .ajf-rep-pager .ajf-rep-page.ajf-selected{border-color:var(--ajf-accent);background:var(--ajf-accent);color:var(--ajf-accent-fg)}ajf-rep-strip .ajf-rep-strip-context{margin-left:auto;color:var(--ajf-text-muted);font-size:13px}\n"], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfRepStrip, [{
        type: Component,
        args: [{ selector: 'ajf-rep-strip', encapsulation: ViewEncapsulation.None, template: "<div class=\"ajf-rep-strip\">\n  <span class=\"ajf-micro-label ajf-rep-strip-label\"\n    >{{ 'Number of' | transloco }} {{ slide.node.label | transloco }}</span\n  >\n\n  <div class=\"ajf-rep-pager\">\n    <button\n      type=\"button\"\n      class=\"ajf-btn\"\n      [disabled]=\"current === 0\"\n      (click)=\"goTo.emit(current - 1)\"\n      [attr.aria-label]=\"'Back' | transloco\"\n    >\n      <mat-icon>chevron_left</mat-icon>\n    </button>\n    <button\n      type=\"button\"\n      class=\"ajf-btn ajf-rep-page\"\n      *ngFor=\"let rep of (slide.reps | ajfRange); let idx = index\"\n      [class.ajf-selected]=\"idx === current\"\n      (click)=\"goTo.emit(idx)\"\n    >\n      {{ idx + 1 }}\n    </button>\n    <button\n      type=\"button\"\n      class=\"ajf-btn\"\n      [disabled]=\"current >= slide.reps - 1\"\n      (click)=\"goTo.emit(current + 1)\"\n      [attr.aria-label]=\"'Forward' | transloco\"\n    >\n      <mat-icon>chevron_right</mat-icon>\n    </button>\n\n    <ng-container *ngIf=\"!readonly\">\n      <button\n        type=\"button\"\n        class=\"ajf-btn\"\n        [disabled]=\"!canAdd\"\n        (click)=\"add.emit()\"\n        [attr.aria-label]=\"'Add' | transloco\"\n      >\n        <mat-icon>add</mat-icon>\n      </button>\n      <button\n        type=\"button\"\n        class=\"ajf-btn\"\n        [disabled]=\"!canRemove\"\n        (click)=\"remove.emit()\"\n        [attr.aria-label]=\"'Remove' | transloco\"\n      >\n        <mat-icon>remove</mat-icon>\n      </button>\n    </ng-container>\n  </div>\n\n  <span class=\"ajf-rep-strip-context\">\n    <span [innerHTML]=\"slide.node.label | transloco\"></span>\n    {{ current + 1 }} {{ 'of' | transloco }} {{ slide.reps }}\n  </span>\n</div>\n", styles: ["ajf-rep-strip{display:block}ajf-rep-strip .ajf-rep-strip{display:flex;flex-wrap:wrap;align-items:center;gap:10px;padding:8px 20px;border-bottom:1px solid var(--ajf-border);background:var(--ajf-band);font-family:var(--ajf-font-sans)}ajf-rep-strip .ajf-rep-strip-label{flex:0 0 auto}ajf-rep-strip .ajf-rep-pager{display:flex;flex-wrap:wrap;gap:6px}ajf-rep-strip .ajf-rep-pager .ajf-btn{min-width:32px;min-height:32px;padding:0 6px;font-size:13px}ajf-rep-strip .ajf-rep-pager .ajf-btn .mat-icon{width:18px;height:18px;font-size:18px}ajf-rep-strip .ajf-rep-pager .ajf-rep-page.ajf-selected{border-color:var(--ajf-accent);background:var(--ajf-accent);color:var(--ajf-accent-fg)}ajf-rep-strip .ajf-rep-strip-context{margin-left:auto;color:var(--ajf-text-muted);font-size:13px}\n"] }]
    }], null, { slide: [{
            type: Input
        }], current: [{
            type: Input
        }], readonly: [{
            type: Input
        }], goTo: [{
            type: Output
        }], add: [{
            type: Output
        }], remove: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfRepStrip, { className: "AjfRepStrip", filePath: "rep-strip.ts", lineNumber: 47 }); })();

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
 * The fields a slide header counts. `slideNodes` is indexed per repetition, and
 * a non-repeating slide keeps its only set of nodes at index 0, so both kinds of
 * slide are read the same way.
 */
const countableFields = (slide, idx) => {
    const nodes = (slide.slideNodes && slide.slideNodes[idx]) || slide.flatNodes || [];
    return nodes.filter(n => n.visible && isFieldInstance(n) && n.node.fieldType !== AjfFieldType.Empty);
};
/**
 * Whether a field holds anything.
 *
 * The value is read off the form group, not off `AjfFieldInstance.value`: the
 * instance's own `value` is only written at initialisation and by formulas, so it
 * does not follow what the user types. The group is flat and keyed by each
 * instance's complete name, which is how `AjfFormRendererService.getControl`
 * resolves a control too.
 */
const isFilled = (field, formGroup) => {
    const name = nodeInstanceCompleteName(field);
    const control = formGroup != null && formGroup.contains(name) ? formGroup.controls[name] : null;
    const value = control != null ? control.value : field.value;
    if (value == null || value === '') {
        return false;
    }
    if (Array.isArray(value)) {
        return value.length > 0;
    }
    return true;
};
/**
 * How many of a slide's fields carry a value, out of how many are on it. Notes
 * (`AjfFieldType.Empty`) hold no value and are left out of both numbers.
 *
 * Impure because it reads mutable instance state, in the same way as
 * `ajfValidSlide` and `ajfAsFieldInstanceErrors`. Returns a memoized object; see
 * the note inside.
 */
class AjfSlideCompletionPipe {
    constructor() {
        this._last = null;
    }
    transform(slide, idx = 0, formGroup = null) {
        const fields = countableFields(slide, idx);
        const done = fields.filter(f => isFilled(f, formGroup)).length;
        const total = fields.length;
        // Hand back the same object while the counts hold, or the fresh identity on
        // every check would trip Angular's "expression has changed" guard.
        if (this._last != null && this._last.done === done && this._last.total === total) {
            return this._last;
        }
        this._last = { done, total };
        return this._last;
    }
    static { this.ɵfac = function AjfSlideCompletionPipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfSlideCompletionPipe)(); }; }
    static { this.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ajfSlideCompletion", type: AjfSlideCompletionPipe, pure: false }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfSlideCompletionPipe, [{
        type: Pipe,
        args: [{ name: 'ajfSlideCompletion', pure: false }]
    }], null, null); })();
/**
 * How many of a slide's visible fields are failing validation.
 */
class AjfSlideIssuesPipe {
    transform(slide, idx = 0) {
        return countableFields(slide, idx).filter(f => !f.valid).length;
    }
    static { this.ɵfac = function AjfSlideIssuesPipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfSlideIssuesPipe)(); }; }
    static { this.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ajfSlideIssues", type: AjfSlideIssuesPipe, pure: false }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfSlideIssuesPipe, [{
        type: Pipe,
        args: [{ name: 'ajfSlideIssues', pure: false }]
    }], null, null); })();
/**
 * The form's outstanding work in one place. A per-slide count only tells the
 * reader about the slide they are already looking at, which is the one place
 * they can see the failing fields for themselves.
 *
 * Counted here rather than taken from `AjfFormRendererService.errors`, which
 * counts invalid slide pages and says nothing about how many fields are behind
 * them.
 *
 * Impure and memoized, like its neighbours above.
 */
class AjfFormIssuesPipe {
    constructor() {
        this._last = { fields: 0, slides: 0 };
    }
    transform(slides) {
        let fields = 0;
        let slideCount = 0;
        (slides || [])
            .filter(slide => slide.visible !== false)
            .forEach(slide => {
            // Every repetition of a repeating slide carries its own set of fields,
            // and any of them can be the one failing.
            const reps = isRepeatingSlideInstance(slide)
                ? Math.max(1, slide.reps)
                : 1;
            let slideFields = 0;
            for (let idx = 0; idx < reps; idx++) {
                slideFields += countableFields(slide, idx).filter(f => !f.valid).length;
            }
            if (slideFields > 0) {
                fields += slideFields;
                slideCount++;
            }
        });
        if (this._last.fields === fields && this._last.slides === slideCount) {
            return this._last;
        }
        this._last = { fields, slides: slideCount };
        return this._last;
    }
    static { this.ɵfac = function AjfFormIssuesPipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFormIssuesPipe)(); }; }
    static { this.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ajfFormIssues", type: AjfFormIssuesPipe, pure: false }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFormIssuesPipe, [{
        type: Pipe,
        args: [{ name: 'ajfFormIssues', pure: false }]
    }], null, null); })();

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
const _c0$1 = ["*"];
const _c1$1 = (a0, a1) => ({ fields: a0, slides: a1 });
function AjfSlideHeader_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 14);
    i0.ɵɵpipe(1, "transloco");
} if (rf & 2) {
    const s_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("ajf-current", s_r1 === ctx_r1.slide);
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 3, s_r1.node.label), i0.ɵɵsanitizeHtml);
} }
function AjfSlideHeader_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 15);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("ajf-pill-placeholder", ctx_r1.reps < 1);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", ctx_r1.reps, " ", i0.ɵɵpipeBind1(2, 4, "repetitions"), "");
} }
function AjfSlideHeader_span_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "ajfSlideCompletion");
    i0.ɵɵpipe(3, "ajfSlideCompletion");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r3 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind3(2, 2, s_r3, ctx_r1.repIndex, ctx_r1.group).done, "/", i0.ɵɵpipeBind3(3, 6, s_r3, ctx_r1.repIndex, ctx_r1.group).total, "");
} }
function AjfSlideHeader_mat_icon_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 17);
    i0.ɵɵtext(1, "arrow_drop_down");
    i0.ɵɵelementEnd();
} }
function AjfSlideHeader_button_12_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 18);
    i0.ɵɵlistener("click", function AjfSlideHeader_button_12_Template_button_click_0_listener() { const s_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.jumpTo.emit(s_r5)); });
    i0.ɵɵelementStart(1, "mat-icon");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "span", 19);
    i0.ɵɵpipe(4, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r5 = ctx.$implicit;
    i0.ɵɵproperty("disabled", s_r5.visible === false);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("ajf-invalid", !s_r5.valid);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(s_r5.valid ? "check" : "warning");
    i0.ɵɵadvance();
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(4, 5, s_r5.node.label), i0.ɵɵsanitizeHtml);
} }
function AjfSlideHeader_div_13_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 20)(1, "button", 21);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵlistener("click", function AjfSlideHeader_div_13_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.prev.emit()); });
    i0.ɵɵelementStart(3, "mat-icon");
    i0.ɵɵtext(4, "chevron_left");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "button", 21);
    i0.ɵɵpipe(6, "transloco");
    i0.ɵɵlistener("click", function AjfSlideHeader_div_13_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.next.emit()); });
    i0.ɵɵelementStart(7, "mat-icon");
    i0.ɵɵtext(8, "chevron_right");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(2, 2, "Back"));
    i0.ɵɵadvance(4);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(6, 4, "Forward"));
} }
function AjfSlideHeader_button_14_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 22);
    i0.ɵɵlistener("click", function AjfSlideHeader_button_14_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.gotoIssue.emit()); });
    i0.ɵɵelementStart(1, "mat-icon");
    i0.ɵɵtext(2, "error");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(4, 1, "{{fields}} fields in {{slides}} slides need attention", i0.ɵɵpureFunction2(4, _c1$1, ctx_r1.issues.fields, ctx_r1.issues.slides)), " ");
} }
function AjfSlideHeader_span_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 23);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵpipe(3, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate4("", i0.ɵɵpipeBind1(2, 4, "slide"), " ", ctx_r1.displayNumber, " ", i0.ɵɵpipeBind1(3, 6, "of"), " ", ctx_r1.total, "");
} }
/**
 * The bar at the top of every slide: its number and title, a completion
 * counter, a menu to jump to any other slide, previous/next paging, an alert
 * when the slide has failing fields, and a slot for the form's own action
 * buttons.
 *
 * Paging and error navigation belong to the renderer, which owns the page
 * slider, so they are raised as events rather than handled here.
 */
class AjfSlideHeader {
    constructor() {
        /** Absent while a start or end message page is on screen. */
        this.slide = null;
        /** The number shown in the badge, already offset by any start message. */
        this.displayNumber = 1;
        /** Which repetition of a repeating slide this header belongs to. */
        this.repIndex = 0;
        /** Every slide of the form, for the jump menu. */
        this.slides = [];
        /** How many repetitions a repeating slide currently has; 0 when not repeating. */
        this.reps = 0;
        /** How many visible slides the form has, for the "slide N of M" readout. */
        this.total = 0;
        /** How many pages the slider holds, repetitions and message pages included. */
        this.pages = 0;
        /**
         * The form's control group, which the completion counter reads values from.
         * Not named `formGroup`: that is ReactiveFormsModule's own selector, and would
         * bind FormGroupDirective to this element too.
         */
        this.group = null;
        /** What the whole form still has failing, computed by the renderer. */
        this.issues = null;
        this.jumpTo = new EventEmitter();
        this.prev = new EventEmitter();
        this.next = new EventEmitter();
        this.gotoIssue = new EventEmitter();
    }
    /**
     * Whether any slide of the form repeats. The repetition count sits inside the
     * jump trigger, so its slot is held open on every slide of such a form -- one
     * width for the whole form beats a trigger that jumps by the width of a pill
     * whenever a repeating slide comes up. Forms with no repeating slide never
     * reserve the space.
     */
    get hasRepeatingSlides() {
        return this.slides.some(s => isRepeatingSlideInstance(s));
    }
    /**
     * Whether the form has anywhere to page to. A single page form gets no arrows
     * and no "slide 1 of 1": both are controls that cannot do anything.
     */
    get canNavigate() {
        return this.pages > 1;
    }
    /**
     * Whether the jump menu is worth opening. Counted over the visible slides, the
     * only ones the menu can actually reach.
     */
    get canJump() {
        return this.slides.filter(s => s.visible !== false).length > 1;
    }
    static { this.ɵfac = function AjfSlideHeader_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfSlideHeader)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfSlideHeader, selectors: [["ajf-slide-header"]], inputs: { slide: "slide", displayNumber: "displayNumber", repIndex: "repIndex", slides: "slides", reps: "reps", total: "total", pages: "pages", group: "group", issues: "issues" }, outputs: { jumpTo: "jumpTo", prev: "prev", next: "next", gotoIssue: "gotoIssue" }, ngContentSelectors: _c0$1, decls: 18, vars: 16, consts: [["slideMenu", "matMenu"], [1, "ajf-slide-header"], ["type", "button", 1, "ajf-slide-title", 3, "disabled", "matMenuTriggerFor"], [1, "ajf-slide-number"], [1, "ajf-slide-label-stack"], ["class", "ajf-slide-label", 3, "ajf-current", "innerHTML", 4, "ngFor", "ngForOf"], ["class", "ajf-pill ajf-reps-pill", 3, "ajf-pill-placeholder", 4, "ngIf"], ["class", "ajf-pill", 4, "ngIf"], ["class", "ajf-slide-caret", 4, "ngIf"], ["mat-menu-item", "", 3, "disabled", "click", 4, "ngFor", "ngForOf"], ["class", "ajf-slide-nav", 4, "ngIf"], ["type", "button", "class", "ajf-pill ajf-pill--danger ajf-issue-pill", 3, "click", 4, "ngIf"], [1, "ajf-slide-header-spacer"], ["class", "ajf-slide-count", 4, "ngIf"], [1, "ajf-slide-label", 3, "innerHTML"], [1, "ajf-pill", "ajf-reps-pill"], [1, "ajf-pill"], [1, "ajf-slide-caret"], ["mat-menu-item", "", 3, "click", "disabled"], [3, "innerHTML"], [1, "ajf-slide-nav"], ["type", "button", 1, "ajf-btn", 3, "click"], ["type", "button", 1, "ajf-pill", "ajf-pill--danger", "ajf-issue-pill", 3, "click"], [1, "ajf-slide-count"]], template: function AjfSlideHeader_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef();
            i0.ɵɵelementStart(0, "div", 1)(1, "button", 2);
            i0.ɵɵpipe(2, "transloco");
            i0.ɵɵelementStart(3, "span", 3);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "span", 4);
            i0.ɵɵtemplate(6, AjfSlideHeader_span_6_Template, 2, 5, "span", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(7, AjfSlideHeader_span_7_Template, 3, 6, "span", 6)(8, AjfSlideHeader_span_8_Template, 4, 10, "span", 7)(9, AjfSlideHeader_mat_icon_9_Template, 2, 0, "mat-icon", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "mat-menu", null, 0);
            i0.ɵɵtemplate(12, AjfSlideHeader_button_12_Template, 5, 7, "button", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(13, AjfSlideHeader_div_13_Template, 9, 6, "div", 10)(14, AjfSlideHeader_button_14_Template, 5, 7, "button", 11);
            i0.ɵɵelement(15, "span", 12);
            i0.ɵɵtemplate(16, AjfSlideHeader_span_16_Template, 4, 8, "span", 13);
            i0.ɵɵprojection(17);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            const slideMenu_r8 = i0.ɵɵreference(11);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("ajf-slide-title-static", !ctx.slide || !ctx.canJump);
            i0.ɵɵproperty("disabled", !ctx.slide || !ctx.canJump)("matMenuTriggerFor", slideMenu_r8);
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(2, 14, "Go to slide"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.displayNumber);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.slides);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasRepeatingSlides);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.slide);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.slide && ctx.canJump);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", ctx.slides);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.canNavigate);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.issues && ctx.issues.fields > 0);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.canNavigate && ctx.total > 0);
        } }, dependencies: [i2$1.NgForOf, i2$1.NgIf, i2$7.MatIcon, i3$4.MatMenu, i3$4.MatMenuItem, i3$4.MatMenuTrigger, i5.TranslocoPipe, AjfSlideCompletionPipe], styles: ["ajf-slide-header{display:block}ajf-slide-header .ajf-slide-header{display:flex;flex-wrap:wrap;align-items:center;gap:10px;padding:12px 20px;background:var(--ajf-surface);font-family:var(--ajf-font-sans)}ajf-slide-header .ajf-slide-header-spacer{flex:1 1 auto}ajf-slide-header .ajf-slide-title{display:inline-flex;align-items:center;justify-content:center;gap:8px;box-sizing:border-box;min-height:var(--ajf-control-h);border:1px solid var(--ajf-border-strong);border-radius:var(--ajf-radius);background:var(--ajf-surface);color:var(--ajf-text);font-family:var(--ajf-font-sans);font-size:14px;cursor:pointer;flex:0 1 auto;justify-content:flex-start;gap:10px;max-width:100%;padding:0 12px}ajf-slide-header .ajf-slide-title:hover:not(:disabled){border-color:var(--ajf-accent)}ajf-slide-header .ajf-slide-title:disabled{color:var(--ajf-text-faint);cursor:default}ajf-slide-header .ajf-slide-title .ajf-slide-number{display:inline-flex;flex:0 0 auto;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:var(--ajf-accent);color:var(--ajf-accent-fg);font-size:12px;font-weight:600}ajf-slide-header .ajf-slide-title .ajf-slide-label-stack{display:grid;min-width:0;max-width:340px;text-align:left}ajf-slide-header .ajf-slide-title .ajf-slide-label{grid-area:1/1;overflow:hidden;visibility:hidden;font-size:16px;font-weight:600;text-overflow:ellipsis;white-space:nowrap}ajf-slide-header .ajf-slide-title .ajf-slide-label.ajf-current{visibility:visible}ajf-slide-header .ajf-slide-title .ajf-slide-caret{width:20px;height:20px;margin-left:auto;color:var(--ajf-text-muted);font-size:20px}ajf-slide-header .ajf-slide-title-static{cursor:default}ajf-slide-header .ajf-slide-title-static:hover{border-color:var(--ajf-border-strong)}ajf-slide-header .ajf-slide-title .ajf-pill{justify-content:center;min-width:3.4em}ajf-slide-header .ajf-slide-title .ajf-reps-pill{min-width:8em}ajf-slide-header .ajf-pill-placeholder{visibility:hidden}ajf-slide-header .ajf-slide-count{font-family:var(--ajf-font-mono);font-size:13px;letter-spacing:.01em;color:var(--ajf-text-faint)}ajf-slide-header .ajf-slide-nav{display:flex;gap:8px}ajf-slide-header .ajf-slide-nav .ajf-btn{width:var(--ajf-control-h);padding:0}ajf-slide-header .ajf-issue-pill{border:0;cursor:pointer}ajf-slide-header .ajf-issue-pill .mat-icon{width:16px;height:16px;font-size:16px}.mat-mdc-menu-panel .mat-mdc-menu-item .mat-icon.ajf-invalid{color:var(--ajf-danger)}\n"], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfSlideHeader, [{
        type: Component,
        args: [{ selector: 'ajf-slide-header', encapsulation: ViewEncapsulation.None, template: "<div class=\"ajf-slide-header\">\n  <button\n    type=\"button\"\n    class=\"ajf-slide-title\"\n    [class.ajf-slide-title-static]=\"!slide || !canJump\"\n    [disabled]=\"!slide || !canJump\"\n    [matMenuTriggerFor]=\"slideMenu\"\n    [attr.aria-label]=\"'Go to slide' | transloco\"\n  >\n    <span class=\"ajf-slide-number\">{{ displayNumber }}</span>\n\n    <!-- Every slide title is laid out in the same grid cell, so the trigger is as\n         wide as the longest of them and keeps that width while paging. Only the\n         current title is visible; the rest just hold the space open. -->\n    <span class=\"ajf-slide-label-stack\">\n      <span\n        class=\"ajf-slide-label\"\n        *ngFor=\"let s of slides\"\n        [class.ajf-current]=\"s === slide\"\n        [innerHTML]=\"s.node.label | transloco\"\n      ></span>\n    </span>\n\n    <span\n      class=\"ajf-pill ajf-reps-pill\"\n      *ngIf=\"hasRepeatingSlides\"\n      [class.ajf-pill-placeholder]=\"reps < 1\"\n      >{{ reps }} {{ 'repetitions' | transloco }}</span\n    >\n    <span class=\"ajf-pill\" *ngIf=\"slide as s\"\n      >{{ (s | ajfSlideCompletion : repIndex : group).done }}/{{\n        (s | ajfSlideCompletion : repIndex : group).total\n      }}</span\n    >\n    <mat-icon class=\"ajf-slide-caret\" *ngIf=\"slide && canJump\">arrow_drop_down</mat-icon>\n  </button>\n\n  <mat-menu #slideMenu=\"matMenu\">\n    <button\n      mat-menu-item\n      *ngFor=\"let s of slides\"\n      [disabled]=\"s.visible === false\"\n      (click)=\"jumpTo.emit(s)\"\n    >\n      <mat-icon [class.ajf-invalid]=\"!s.valid\">{{ s.valid ? 'check' : 'warning' }}</mat-icon>\n      <span [innerHTML]=\"s.node.label | transloco\"></span>\n    </button>\n  </mat-menu>\n\n  <!-- Nothing to page through in a single page form. -->\n  <div class=\"ajf-slide-nav\" *ngIf=\"canNavigate\">\n    <button\n      type=\"button\"\n      class=\"ajf-btn\"\n      (click)=\"prev.emit()\"\n      [attr.aria-label]=\"'Back' | transloco\"\n    >\n      <mat-icon>chevron_left</mat-icon>\n    </button>\n    <button\n      type=\"button\"\n      class=\"ajf-btn\"\n      (click)=\"next.emit()\"\n      [attr.aria-label]=\"'Forward' | transloco\"\n    >\n      <mat-icon>chevron_right</mat-icon>\n    </button>\n  </div>\n\n  <!-- Form-wide, not per-slide: the slide on screen is the one place the reader\n       can already see what is wrong. -->\n  <button\n    type=\"button\"\n    class=\"ajf-pill ajf-pill--danger ajf-issue-pill\"\n    *ngIf=\"issues && issues.fields > 0\"\n    (click)=\"gotoIssue.emit()\"\n  >\n    <mat-icon>error</mat-icon>\n    {{\n      '{{fields}} fields in {{slides}} slides need attention'\n        | transloco : {fields: issues.fields, slides: issues.slides}\n    }}\n  </button>\n\n  <span class=\"ajf-slide-header-spacer\"></span>\n\n  <span class=\"ajf-slide-count\" *ngIf=\"canNavigate && total > 0\"\n    >{{ 'slide' | transloco }} {{ displayNumber }} {{ 'of' | transloco }} {{ total }}</span\n  >\n\n  <ng-content></ng-content>\n</div>\n", styles: ["ajf-slide-header{display:block}ajf-slide-header .ajf-slide-header{display:flex;flex-wrap:wrap;align-items:center;gap:10px;padding:12px 20px;background:var(--ajf-surface);font-family:var(--ajf-font-sans)}ajf-slide-header .ajf-slide-header-spacer{flex:1 1 auto}ajf-slide-header .ajf-slide-title{display:inline-flex;align-items:center;justify-content:center;gap:8px;box-sizing:border-box;min-height:var(--ajf-control-h);border:1px solid var(--ajf-border-strong);border-radius:var(--ajf-radius);background:var(--ajf-surface);color:var(--ajf-text);font-family:var(--ajf-font-sans);font-size:14px;cursor:pointer;flex:0 1 auto;justify-content:flex-start;gap:10px;max-width:100%;padding:0 12px}ajf-slide-header .ajf-slide-title:hover:not(:disabled){border-color:var(--ajf-accent)}ajf-slide-header .ajf-slide-title:disabled{color:var(--ajf-text-faint);cursor:default}ajf-slide-header .ajf-slide-title .ajf-slide-number{display:inline-flex;flex:0 0 auto;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:var(--ajf-accent);color:var(--ajf-accent-fg);font-size:12px;font-weight:600}ajf-slide-header .ajf-slide-title .ajf-slide-label-stack{display:grid;min-width:0;max-width:340px;text-align:left}ajf-slide-header .ajf-slide-title .ajf-slide-label{grid-area:1/1;overflow:hidden;visibility:hidden;font-size:16px;font-weight:600;text-overflow:ellipsis;white-space:nowrap}ajf-slide-header .ajf-slide-title .ajf-slide-label.ajf-current{visibility:visible}ajf-slide-header .ajf-slide-title .ajf-slide-caret{width:20px;height:20px;margin-left:auto;color:var(--ajf-text-muted);font-size:20px}ajf-slide-header .ajf-slide-title-static{cursor:default}ajf-slide-header .ajf-slide-title-static:hover{border-color:var(--ajf-border-strong)}ajf-slide-header .ajf-slide-title .ajf-pill{justify-content:center;min-width:3.4em}ajf-slide-header .ajf-slide-title .ajf-reps-pill{min-width:8em}ajf-slide-header .ajf-pill-placeholder{visibility:hidden}ajf-slide-header .ajf-slide-count{font-family:var(--ajf-font-mono);font-size:13px;letter-spacing:.01em;color:var(--ajf-text-faint)}ajf-slide-header .ajf-slide-nav{display:flex;gap:8px}ajf-slide-header .ajf-slide-nav .ajf-btn{width:var(--ajf-control-h);padding:0}ajf-slide-header .ajf-issue-pill{border:0;cursor:pointer}ajf-slide-header .ajf-issue-pill .mat-icon{width:16px;height:16px;font-size:16px}.mat-mdc-menu-panel .mat-mdc-menu-item .mat-icon.ajf-invalid{color:var(--ajf-danger)}\n"] }]
    }], null, { slide: [{
            type: Input
        }], displayNumber: [{
            type: Input
        }], repIndex: [{
            type: Input
        }], slides: [{
            type: Input
        }], reps: [{
            type: Input
        }], total: [{
            type: Input
        }], pages: [{
            type: Input
        }], group: [{
            type: Input
        }], issues: [{
            type: Input
        }], jumpTo: [{
            type: Output
        }], prev: [{
            type: Output
        }], next: [{
            type: Output
        }], gotoIssue: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfSlideHeader, { className: "AjfSlideHeader", filePath: "slide-header.ts", lineNumber: 53 }); })();

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
const _c0 = [[["", "ajfFormTopToolbarButtons", ""]], [["", "ajfFormSaveButton", ""]], [["", "ajfFormStartMessageTitle", ""]], [["", "ajfFormStartMessage", ""]], [["", "ajfFormEndMessageTitle", ""]], [["", "ajfFormEndMessage", ""]]];
const _c1 = ["[ajfFormTopToolbarButtons]", "[ajfFormSaveButton]", "[ajfFormStartMessageTitle]", "[ajfFormStartMessage]", "[ajfFormEndMessageTitle]", "[ajfFormEndMessage]"];
const _c2 = (a0, a1) => ({ fields: a0, slides: a1 });
function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_span_4_button_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "Save"), " ");
} }
function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_span_4_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 14);
    i0.ɵɵlistener("click", function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_span_4_Template_span_click_0_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r2.onSave($event)); });
    i0.ɵɵelementStart(1, "span", null, 1);
    i0.ɵɵprojection(3, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_span_4_button_4_Template, 3, 3, "button", 15);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const saveButton_r5 = i0.ɵɵreference(2);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", saveButton_r5 && saveButton_r5.childNodes && saveButton_r5.childNodes.length === 0);
} }
function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_ajf_rep_strip_5_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ajf-rep-strip", 17);
    i0.ɵɵpipe(1, "ajfAsRepeatingSlideInstance");
    i0.ɵɵlistener("goTo", function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_ajf_rep_strip_5_Template_ajf_rep_strip_goTo_0_listener($event) { i0.ɵɵrestoreView(_r6); const cur_r7 = i0.ɵɵnextContext(2).ngIf; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.goToRep(cur_r7.slide, $event)); })("add", function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_ajf_rep_strip_5_Template_ajf_rep_strip_add_0_listener() { i0.ɵɵrestoreView(_r6); const cur_r7 = i0.ɵɵnextContext(2).ngIf; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.addGroup(cur_r7.slide)); })("remove", function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_ajf_rep_strip_5_Template_ajf_rep_strip_remove_0_listener() { i0.ɵɵrestoreView(_r6); const cur_r7 = i0.ɵɵnextContext(2).ngIf; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.removeGroup(cur_r7.slide, cur_r7.repIndex)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cur_r7 = i0.ɵɵnextContext(2).ngIf;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("slide", i0.ɵɵpipeBind1(1, 3, cur_r7.slide))("current", cur_r7.repIndex)("readonly", ctx_r2.readonly);
} }
function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 10)(1, "ajf-slide-header", 11);
    i0.ɵɵpipe(2, "ajfFormIssues");
    i0.ɵɵlistener("jumpTo", function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_Template_ajf_slide_header_jumpTo_1_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.goToSlide($event)); })("prev", function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_Template_ajf_slide_header_prev_1_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.goToPrevSlide()); })("next", function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_Template_ajf_slide_header_next_1_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.goToNextSlide()); })("gotoIssue", function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_Template_ajf_slide_header_gotoIssue_1_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.goToNextError()); });
    i0.ɵɵprojection(3);
    i0.ɵɵtemplate(4, AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_span_4_Template, 5, 1, "span", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_ajf_rep_strip_5_Template, 2, 5, "ajf-rep-strip", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cur_r7 = i0.ɵɵnextContext().ngIf;
    const curSlides_r8 = i0.ɵɵnextContext().ngIf;
    const fg_r9 = i0.ɵɵnextContext().ngIf;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("slide", cur_r7.slide)("slides", curSlides_r8)("displayNumber", cur_r7.displayNumber)("repIndex", cur_r7.repIndex)("reps", cur_r7.reps)("total", cur_r7.total)("pages", cur_r7.pages)("group", fg_r9)("issues", i0.ɵɵpipeBind1(2, 11, curSlides_r8));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !ctx_r2.saveDisabled);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", cur_r7.slide && cur_r7.reps > 0);
} }
function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_div_1_Template, 6, 13, "div", 9);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.hideTopToolbar);
} }
function AjfFormRenderer_ng_container_0_ng_container_3_ajf_page_slider_item_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ajf-page-slider-item")(1, "div", 18)(2, "h2", 19);
    i0.ɵɵprojection(3, 2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 20);
    i0.ɵɵprojection(5, 3);
    i0.ɵɵelementEnd()()();
} }
function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_7_ng_container_1_ng_container_1_ajf_field_row_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-field-row", 23);
    i0.ɵɵpipe(1, "ajfAsFieldInstance");
} if (rf & 2) {
    const fieldInstance_r10 = ctx.$implicit;
    const slideInstance_r11 = i0.ɵɵnextContext(3).$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("instance", i0.ɵɵpipeBind1(1, 2, fieldInstance_r10))("readonly", ctx_r2.readonly || !slideInstance_r11.editable);
} }
function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_7_ng_container_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "ajf-page-slider-item")(2, "div", 21);
    i0.ɵɵtemplate(3, AjfFormRenderer_ng_container_0_ng_container_3_ng_container_7_ng_container_1_ng_container_1_ajf_field_row_3_Template, 2, 4, "ajf-field-row", 22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const slideInstance_r11 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", "ajf-max-columns-" + ctx_r2.maxColumns);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", slideInstance_r11.flatNodes)("ngForTrackBy", ctx_r2.trackNodeById);
} }
function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_7_ng_container_1_ng_container_3_ajf_page_slider_item_1_ajf_field_row_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-field-row", 23);
    i0.ɵɵpipe(1, "ajfAsFieldInstance");
} if (rf & 2) {
    const fieldInstance_r12 = ctx.$implicit;
    const slideInstance_r11 = i0.ɵɵnextContext(4).$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("instance", i0.ɵɵpipeBind1(1, 2, fieldInstance_r12))("readonly", ctx_r2.readonly || !slideInstance_r11.editable);
} }
function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_7_ng_container_1_ng_container_3_ajf_page_slider_item_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ajf-page-slider-item", 25)(1, "div", 21);
    i0.ɵɵtemplate(2, AjfFormRenderer_ng_container_0_ng_container_3_ng_container_7_ng_container_1_ng_container_3_ajf_page_slider_item_1_ajf_field_row_2_Template, 2, 4, "ajf-field-row", 22);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const idx_r13 = ctx.index;
    const lastSlide_r14 = ctx.last;
    const slideInstance_r11 = i0.ɵɵnextContext(3).$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("isRepeating", true)("isRepeatingLast", lastSlide_r14);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", "ajf-max-columns-" + ctx_r2.maxColumns);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", slideInstance_r11.slideNodes[idx_r13])("ngForTrackBy", ctx_r2.trackNodeById);
} }
function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_7_ng_container_1_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFormRenderer_ng_container_0_ng_container_3_ng_container_7_ng_container_1_ng_container_3_ajf_page_slider_item_1_Template, 3, 5, "ajf-page-slider-item", 24);
    i0.ɵɵpipe(2, "ajfAsRepeatingSlideInstance");
    i0.ɵɵpipe(3, "ajfRange");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const slideInstance_r11 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(3, 3, i0.ɵɵpipeBind1(2, 1, slideInstance_r11).reps));
} }
function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_7_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFormRenderer_ng_container_0_ng_container_3_ng_container_7_ng_container_1_ng_container_1_Template, 4, 3, "ng-container", 2);
    i0.ɵɵpipe(2, "ajfIsRepeatingSlideInstance");
    i0.ɵɵtemplate(3, AjfFormRenderer_ng_container_0_ng_container_3_ng_container_7_ng_container_1_ng_container_3_Template, 4, 5, "ng-container", 2);
    i0.ɵɵpipe(4, "ajfIsRepeatingSlideInstance");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const slideInstance_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !i0.ɵɵpipeBind1(2, 2, slideInstance_r11));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(4, 4, slideInstance_r11));
} }
function AjfFormRenderer_ng_container_0_ng_container_3_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFormRenderer_ng_container_0_ng_container_3_ng_container_7_ng_container_1_Template, 5, 6, "ng-container", 2);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const slideInstance_r11 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", slideInstance_r11.visible);
} }
function AjfFormRenderer_ng_container_0_ng_container_3_ajf_page_slider_item_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ajf-page-slider-item")(1, "div", 18)(2, "h2", 19);
    i0.ɵɵprojection(3, 4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 20);
    i0.ɵɵprojection(5, 5);
    i0.ɵɵelementEnd()()();
} }
function AjfFormRenderer_ng_container_0_ng_container_3_div_9_ng_container_1_span_1_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 28)(1, "mat-icon");
    i0.ɵɵtext(2, "error");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "transloco");
    i0.ɵɵelementStart(5, "button", 29);
    i0.ɵɵlistener("click", function AjfFormRenderer_ng_container_0_ng_container_3_div_9_ng_container_1_span_1_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r2.goToPrevError()); });
    i0.ɵɵelementStart(6, "mat-icon");
    i0.ɵɵtext(7, "arrow_upward");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 29);
    i0.ɵɵlistener("click", function AjfFormRenderer_ng_container_0_ng_container_3_div_9_ng_container_1_span_1_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r2.goToNextError()); });
    i0.ɵɵelementStart(9, "mat-icon");
    i0.ɵɵtext(10, "arrow_downward");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const issues_r16 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(4, 1, "{{fields}} fields in {{slides}} slides need attention", i0.ɵɵpureFunction2(4, _c2, issues_r16.fields, issues_r16.slides)), " ");
} }
function AjfFormRenderer_ng_container_0_ng_container_3_div_9_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFormRenderer_ng_container_0_ng_container_3_div_9_ng_container_1_span_1_Template, 11, 7, "span", 27);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const issues_r16 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", issues_r16.fields > 0);
} }
function AjfFormRenderer_ng_container_0_ng_container_3_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵtemplate(1, AjfFormRenderer_ng_container_0_ng_container_3_div_9_ng_container_1_Template, 2, 1, "ng-container", 2);
    i0.ɵɵpipe(2, "ajfFormIssues");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const curSlides_r8 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(2, 1, curSlides_r8));
} }
function AjfFormRenderer_ng_container_0_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFormRenderer_ng_container_0_ng_container_3_ng_container_1_Template, 2, 1, "ng-container", 2);
    i0.ɵɵpipe(2, "ajfCurrentSlide");
    i0.ɵɵelementStart(3, "div", 5)(4, "ajf-page-slider", 6, 0);
    i0.ɵɵlistener("orientationChange", function AjfFormRenderer_ng_container_0_ng_container_3_Template_ajf_page_slider_orientationChange_4_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.orientationChangeHandler($event)); });
    i0.ɵɵtemplate(6, AjfFormRenderer_ng_container_0_ng_container_3_ajf_page_slider_item_6_Template, 6, 0, "ajf-page-slider-item", 2)(7, AjfFormRenderer_ng_container_0_ng_container_3_ng_container_7_Template, 2, 1, "ng-container", 7)(8, AjfFormRenderer_ng_container_0_ng_container_3_ajf_page_slider_item_8_Template, 6, 0, "ajf-page-slider-item", 2)(9, AjfFormRenderer_ng_container_0_ng_container_3_div_9_Template, 3, 3, "div", 8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const curSlides_r8 = ctx.ngIf;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind4(2, 9, curSlides_r8, ctx_r2.currentPage, ctx_r2.hasStartMessage, ctx_r2.hasEndMessage));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("fixedOrientation", ctx_r2.fixedOrientation)("hideNavigationButtons", ctx_r2.hideNavigationButtons)("orientation", ctx_r2.orientation);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", curSlides_r8.length > 0 && ctx_r2.hasStartMessage);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", curSlides_r8)("ngForTrackBy", ctx_r2.trackNodeById);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", curSlides_r8 && curSlides_r8.length > 0 && ctx_r2.hasEndMessage);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.hideBottomToolbar);
} }
function AjfFormRenderer_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "form", 3)(2, "div", 4);
    i0.ɵɵtemplate(3, AjfFormRenderer_ng_container_0_ng_container_3_Template, 10, 14, "ng-container", 2);
    i0.ɵɵpipe(4, "async");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const fg_r9 = ctx.ngIf;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵclassProp("ajf-form-readonly", ctx_r2.readonly);
    i0.ɵɵproperty("formGroup", fg_r9);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(4, 4, ctx_r2.slides));
} }
class AjfFormRenderer extends AjfFormRenderer$1 {
    constructor(rendererService, changeDetectorRef) {
        super(rendererService, changeDetectorRef);
        /**
         * @deprecated The slide strip has been replaced by the jump menu in the slide
         * header, which is always available. Kept so that existing templates still
         * compile.
         */
        this.topBar = false;
        /**
         * @deprecated Field rows align their labels and controls on a shared grid, so
         * there is nothing left to centre.
         */
        this.centeredFieldsContent = false;
        /** How many field rows sit side by side. */
        this.maxColumns = 1;
        /**
         * The page the slider is showing. The slide header is rendered once, above the
         * slider, so it needs to know which slide is on screen; the page slider only
         * reports that imperatively, hence the mirrored property.
         */
        this.currentPage = 0;
        this._slideList = [];
        this._validitySubscription = Subscription.EMPTY;
        this._slidesSubscription = Subscription.EMPTY;
        this._valueSubscription = Subscription.EMPTY;
        this._pageSubscription = Subscription.EMPTY;
        this._pageInit = false;
        this._slidesSubscription = this.slides.subscribe(slides => {
            this._slideList = slides || [];
        });
        // This component is OnPush, and children are only visited when it is
        // checked. The slide header reports live state -- how many fields are
        // filled, how many are failing -- so a value change anywhere in the form has
        // to bring the renderer back into the check.
        this._valueSubscription = this.formGroup
            .pipe(switchMap(fg => (fg ? fg.valueChanges : EMPTY)))
            .subscribe(() => this._changeDetectorRef.markForCheck());
        // Validity moves without a value moving with it -- a visibility change or a
        // recalculated formula is enough -- and the issue counts are read through
        // impure pipes, so this brings the renderer back into the check too.
        this._validitySubscription = this.errors.subscribe(() => this._changeDetectorRef.markForCheck());
    }
    ngAfterViewChecked() {
        super.ngAfterViewChecked();
        if (!this._pageInit && this.formSlider != null) {
            this._pageInit = true;
            this.currentPage = this.formSlider.currentPage;
            this._pageSubscription = this.formSlider.pageScrollFinish.subscribe(() => {
                this.currentPage = this.formSlider.currentPage;
                this._changeDetectorRef.markForCheck();
            });
        }
    }
    ngOnDestroy() {
        this._slidesSubscription.unsubscribe();
        this._valueSubscription.unsubscribe();
        this._validitySubscription.unsubscribe();
        this._pageSubscription.unsubscribe();
        super.ngOnDestroy();
    }
    fieldStyle(field) {
        if (field.node.fieldType === AjfFieldType.Formula && field.node.label === '') {
            return { display: 'none' };
        }
        return {};
    }
    /** Page to the first page of a slide, from the header's jump menu. */
    goToSlide(slide) {
        this._slideTo(this._pageOf(slide));
    }
    /** Page to one repetition of the repeating slide currently on screen. */
    goToRep(slide, repIndex) {
        this._slideTo(this._pageOf(slide) + repIndex);
    }
    goToPrevSlide() {
        this.formSlider?.slide({ dir: 'up' });
    }
    goToNextSlide() {
        this.formSlider?.slide({ dir: 'down' });
    }
    /**
     * The slider page a slide starts on. `AjfSlideInstance.position` cannot be
     * used directly here: it does not account for a start message page, and this
     * has to agree with the page arithmetic used by `ajfCurrentSlide`.
     */
    _pageOf(slide) {
        let page = this.hasStartMessage ? 1 : 0;
        for (const cur of this._slideList) {
            if (cur.visible === false) {
                continue;
            }
            if (cur === slide) {
                break;
            }
            page += isRepeatingSlideInstance(cur)
                ? Math.max(1, cur.reps)
                : 1;
        }
        return page;
    }
    _slideTo(page) {
        if (this.formSlider != null) {
            this.formSlider.slide({ to: page });
        }
    }
    static { this.ɵfac = function AjfFormRenderer_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFormRenderer)(i0.ɵɵdirectiveInject(i1$1.AjfFormRendererService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFormRenderer, selectors: [["ajf-form"]], inputs: { topBar: "topBar", centeredFieldsContent: "centeredFieldsContent", maxColumns: "maxColumns" }, features: [i0.ɵɵInheritDefinitionFeature], ngContentSelectors: _c1, decls: 2, vars: 3, consts: [["formSlider", ""], ["saveButton", ""], [4, "ngIf"], ["novalidate", "", 3, "formGroup"], [1, "ajf-form-container"], [1, "ajf-slider-container"], [3, "orientationChange", "fixedOrientation", "hideNavigationButtons", "orientation"], [4, "ngFor", "ngForOf", "ngForTrackBy"], ["ajfPageSliderBar", "", "class", "ajf-form-footer", 4, "ngIf"], ["class", "ajf-form-bar", 4, "ngIf"], [1, "ajf-form-bar"], [3, "jumpTo", "prev", "next", "gotoIssue", "slide", "slides", "displayNumber", "repIndex", "reps", "total", "pages", "group", "issues"], ["class", "ajf-form-save", 3, "click", 4, "ngIf"], [3, "slide", "current", "readonly", "goTo", "add", "remove", 4, "ngIf"], [1, "ajf-form-save", 3, "click"], ["type", "button", "class", "ajf-btn--primary", 4, "ngIf"], ["type", "button", 1, "ajf-btn--primary"], [3, "goTo", "add", "remove", "slide", "current", "readonly"], [1, "ajf-form-page", "ajf-form-message"], [1, "ajf-message-title"], [1, "ajf-message-body"], [1, "ajf-form-page", 3, "ngClass"], [3, "instance", "readonly", 4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "instance", "readonly"], [3, "isRepeating", "isRepeatingLast", 4, "ngFor", "ngForOf"], [3, "isRepeating", "isRepeatingLast"], ["ajfPageSliderBar", "", 1, "ajf-form-footer"], ["class", "ajf-form-footer-status", 4, "ngIf"], [1, "ajf-form-footer-status"], ["type", "button", 1, "ajf-btn--ghost", 3, "click"]], template: function AjfFormRenderer_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef(_c0);
            i0.ɵɵtemplate(0, AjfFormRenderer_ng_container_0_Template, 5, 6, "ng-container", 2);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.formGroup));
        } }, dependencies: [i2$b.AjfPageSliderItem, i3$5.AjfPageSlider, i2$1.NgClass, i2$1.NgForOf, i2$1.NgIf, i2$7.MatIcon, i4.ɵNgNoValidate, i4.NgControlStatusGroup, i4.FormGroupDirective, AjfFieldRow, AjfRepStrip, AjfSlideHeader, i5.TranslocoPipe, i2$1.AsyncPipe, i1$1.AjfAsFieldInstancePipe, i1$1.AjfAsRepeatingSlideInstancePipe, i1$1.AjfIsRepeatingSlideInstancePipe, i1$1.AjfRangePipe, AjfCurrentSlidePipe, AjfFormIssuesPipe], styles: ["ajf-form{display:block;height:100%}ajf-form .ajf-form-container{display:flex;flex-direction:column;box-sizing:border-box;height:100%;background:var(--ajf-bg);color:var(--ajf-text);font-family:var(--ajf-font-sans)}ajf-form .ajf-form-bar{flex:0 0 auto;border-bottom:1px solid var(--ajf-border);background:var(--ajf-surface)}ajf-form .ajf-form-save{display:inline-flex;align-items:center;gap:8px}ajf-form>form{height:100%}ajf-form .ajf-slider-container{position:relative;flex:1 1 auto;min-height:var(--ajf-slider-min-h)}ajf-form .ajf-slider-container>ajf-page-slider{position:absolute;inset:0}ajf-form .ajf-form-page{display:flex;flex-direction:column;align-self:stretch;box-sizing:border-box;width:100%;background:var(--ajf-surface)}ajf-form .ajf-form-page.ajf-max-columns-2,ajf-form .ajf-form-page.ajf-max-columns-3{display:grid;align-content:start}ajf-form .ajf-form-page.ajf-max-columns-2{grid-template-columns:repeat(2,minmax(0,1fr))}ajf-form .ajf-form-page.ajf-max-columns-3{grid-template-columns:repeat(3,minmax(0,1fr))}@media (width <= 900px){ajf-form .ajf-form-page.ajf-max-columns-2,ajf-form .ajf-form-page.ajf-max-columns-3{grid-template-columns:minmax(0,1fr)}}ajf-form .ajf-form-message{gap:12px;padding:24px 20px}ajf-form .ajf-form-message .ajf-message-title{margin:0;font-size:20px;font-weight:600}ajf-form .ajf-form-message .ajf-message-body{color:var(--ajf-text-muted)}ajf-form ajf-page-slider>mat-toolbar.ajf-toolbar{min-height:48px;padding:0 12px;border-top:1px solid var(--ajf-border);background:var(--ajf-band);color:var(--ajf-text-muted);font-family:var(--ajf-font-sans);font-size:13px}ajf-form ajf-page-slider>mat-toolbar.ajf-toolbar .mat-mdc-button{color:var(--ajf-text-muted)}ajf-form .ajf-form-footer-status{display:inline-flex;align-items:center;gap:6px;color:var(--ajf-danger)}ajf-form .ajf-form-footer-status .mat-icon{width:16px;height:16px;font-size:16px}ajf-form .ajf-form-readonly .ajf-field-label label{font-weight:600}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFormRenderer, [{
        type: Component,
        args: [{ selector: 'ajf-form', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"formGroup | async as fg\">\n  <form [class.ajf-form-readonly]=\"readonly\" novalidate [formGroup]=\"fg!\">\n    <div class=\"ajf-form-container\">\n      <ng-container *ngIf=\"slides | async as curSlides\">\n        <ng-container *ngIf=\"curSlides | ajfCurrentSlide : currentPage : hasStartMessage : hasEndMessage as cur\">\n          <div class=\"ajf-form-bar\" *ngIf=\"!hideTopToolbar\">\n            <ajf-slide-header\n              [slide]=\"cur.slide\"\n              [slides]=\"curSlides\"\n              [displayNumber]=\"cur.displayNumber\"\n              [repIndex]=\"cur.repIndex\"\n              [reps]=\"cur.reps\"\n              [total]=\"cur.total\"\n              [pages]=\"cur.pages\"\n              [group]=\"fg\"\n              [issues]=\"curSlides | ajfFormIssues\"\n              (jumpTo)=\"goToSlide($event)\"\n              (prev)=\"goToPrevSlide()\"\n              (next)=\"goToNextSlide()\"\n              (gotoIssue)=\"goToNextError()\"\n            >\n              <!-- this content projection allows to add buttons on the slide header -->\n              <ng-content select=\"[ajfFormTopToolbarButtons]\"></ng-content>\n              <!-- apply a default save button only when ajfFormSaveButton is empty -->\n              <span class=\"ajf-form-save\" *ngIf=\"!saveDisabled\" (click)=\"onSave($event)\">\n                <span #saveButton><ng-content select=\"[ajfFormSaveButton]\"></ng-content></span>\n                <button\n                  *ngIf=\"saveButton && saveButton.childNodes && saveButton.childNodes.length === 0\"\n                  type=\"button\"\n                  class=\"ajf-btn--primary\"\n                >\n                  {{ 'Save' | transloco }}\n                </button>\n              </span>\n            </ajf-slide-header>\n\n            <ajf-rep-strip\n              *ngIf=\"cur.slide && cur.reps > 0\"\n              [slide]=\"cur.slide! | ajfAsRepeatingSlideInstance\"\n              [current]=\"cur.repIndex\"\n              [readonly]=\"readonly\"\n              (goTo)=\"goToRep(cur.slide!, $event)\"\n              (add)=\"addGroup(cur.slide!)\"\n              (remove)=\"removeGroup(cur.slide!, cur.repIndex)\"\n            ></ajf-rep-strip>\n          </div>\n        </ng-container>\n\n        <div class=\"ajf-slider-container\">\n          <ajf-page-slider\n            (orientationChange)=\"orientationChangeHandler($event)\"\n            [fixedOrientation]=\"fixedOrientation\"\n            [hideNavigationButtons]=\"hideNavigationButtons\"\n            [orientation]=\"orientation\"\n            #formSlider\n          >\n            <ajf-page-slider-item *ngIf=\"curSlides!.length > 0 && hasStartMessage\">\n              <div class=\"ajf-form-page ajf-form-message\">\n                <h2 class=\"ajf-message-title\">\n                  <ng-content select=\"[ajfFormStartMessageTitle]\"></ng-content>\n                </h2>\n                <div class=\"ajf-message-body\">\n                  <ng-content select=\"[ajfFormStartMessage]\"></ng-content>\n                </div>\n              </div>\n            </ajf-page-slider-item>\n\n            <ng-container *ngFor=\"let slideInstance of curSlides; trackBy: trackNodeById\">\n              <ng-container *ngIf=\"slideInstance.visible\">\n                <!-- non repeating slides -->\n                <ng-container *ngIf=\"!(slideInstance | ajfIsRepeatingSlideInstance)\">\n                  <ajf-page-slider-item>\n                    <div class=\"ajf-form-page\" [ngClass]=\"'ajf-max-columns-' + maxColumns\">\n                      <ajf-field-row\n                        *ngFor=\"let fieldInstance of slideInstance.flatNodes; trackBy: trackNodeById\"\n                        [instance]=\"fieldInstance | ajfAsFieldInstance\"\n                        [readonly]=\"readonly || !slideInstance.editable\"\n                      ></ajf-field-row>\n                    </div>\n                  </ajf-page-slider-item>\n                </ng-container>\n\n                <!-- repeating slides: one page per repetition -->\n                <ng-container *ngIf=\"slideInstance | ajfIsRepeatingSlideInstance\">\n                  <ajf-page-slider-item\n                    *ngFor=\"\n                      let curRep of (slideInstance | ajfAsRepeatingSlideInstance).reps | ajfRange;\n                      let idx = index;\n                      let lastSlide = last\n                    \"\n                    [isRepeating]=\"true\"\n                    [isRepeatingLast]=\"lastSlide\"\n                  >\n                    <div class=\"ajf-form-page\" [ngClass]=\"'ajf-max-columns-' + maxColumns\">\n                      <ajf-field-row\n                        *ngFor=\"\n                          let fieldInstance of slideInstance.slideNodes[idx];\n                          trackBy: trackNodeById\n                        \"\n                        [instance]=\"fieldInstance | ajfAsFieldInstance\"\n                        [readonly]=\"readonly || !slideInstance.editable\"\n                      ></ajf-field-row>\n                    </div>\n                  </ajf-page-slider-item>\n                </ng-container>\n              </ng-container>\n            </ng-container>\n\n            <ajf-page-slider-item *ngIf=\"curSlides && curSlides!.length > 0 && hasEndMessage\">\n              <div class=\"ajf-form-page ajf-form-message\">\n                <h2 class=\"ajf-message-title\">\n                  <ng-content select=\"[ajfFormEndMessageTitle]\"></ng-content>\n                </h2>\n                <div class=\"ajf-message-body\">\n                  <ng-content select=\"[ajfFormEndMessage]\"></ng-content>\n                </div>\n              </div>\n            </ajf-page-slider-item>\n\n            <div ajfPageSliderBar *ngIf=\"!hideBottomToolbar\" class=\"ajf-form-footer\">\n              <ng-container *ngIf=\"curSlides | ajfFormIssues as issues\">\n                <span class=\"ajf-form-footer-status\" *ngIf=\"issues.fields > 0\">\n                  <mat-icon>error</mat-icon>\n                  {{\n                    '{{fields}} fields in {{slides}} slides need attention'\n                      | transloco : {fields: issues.fields, slides: issues.slides}\n                  }}\n                  <button type=\"button\" class=\"ajf-btn--ghost\" (click)=\"goToPrevError()\">\n                    <mat-icon>arrow_upward</mat-icon>\n                  </button>\n                  <button type=\"button\" class=\"ajf-btn--ghost\" (click)=\"goToNextError()\">\n                    <mat-icon>arrow_downward</mat-icon>\n                  </button>\n                </span>\n              </ng-container>\n            </div>\n          </ajf-page-slider>\n        </div>\n\n      </ng-container>\n    </div>\n  </form>\n</ng-container>\n", styles: ["ajf-form{display:block;height:100%}ajf-form .ajf-form-container{display:flex;flex-direction:column;box-sizing:border-box;height:100%;background:var(--ajf-bg);color:var(--ajf-text);font-family:var(--ajf-font-sans)}ajf-form .ajf-form-bar{flex:0 0 auto;border-bottom:1px solid var(--ajf-border);background:var(--ajf-surface)}ajf-form .ajf-form-save{display:inline-flex;align-items:center;gap:8px}ajf-form>form{height:100%}ajf-form .ajf-slider-container{position:relative;flex:1 1 auto;min-height:var(--ajf-slider-min-h)}ajf-form .ajf-slider-container>ajf-page-slider{position:absolute;inset:0}ajf-form .ajf-form-page{display:flex;flex-direction:column;align-self:stretch;box-sizing:border-box;width:100%;background:var(--ajf-surface)}ajf-form .ajf-form-page.ajf-max-columns-2,ajf-form .ajf-form-page.ajf-max-columns-3{display:grid;align-content:start}ajf-form .ajf-form-page.ajf-max-columns-2{grid-template-columns:repeat(2,minmax(0,1fr))}ajf-form .ajf-form-page.ajf-max-columns-3{grid-template-columns:repeat(3,minmax(0,1fr))}@media (width <= 900px){ajf-form .ajf-form-page.ajf-max-columns-2,ajf-form .ajf-form-page.ajf-max-columns-3{grid-template-columns:minmax(0,1fr)}}ajf-form .ajf-form-message{gap:12px;padding:24px 20px}ajf-form .ajf-form-message .ajf-message-title{margin:0;font-size:20px;font-weight:600}ajf-form .ajf-form-message .ajf-message-body{color:var(--ajf-text-muted)}ajf-form ajf-page-slider>mat-toolbar.ajf-toolbar{min-height:48px;padding:0 12px;border-top:1px solid var(--ajf-border);background:var(--ajf-band);color:var(--ajf-text-muted);font-family:var(--ajf-font-sans);font-size:13px}ajf-form ajf-page-slider>mat-toolbar.ajf-toolbar .mat-mdc-button{color:var(--ajf-text-muted)}ajf-form .ajf-form-footer-status{display:inline-flex;align-items:center;gap:6px;color:var(--ajf-danger)}ajf-form .ajf-form-footer-status .mat-icon{width:16px;height:16px;font-size:16px}ajf-form .ajf-form-readonly .ajf-field-label label{font-weight:600}\n"] }]
    }], () => [{ type: i1$1.AjfFormRendererService }, { type: i0.ChangeDetectorRef }], { topBar: [{
            type: Input
        }], centeredFieldsContent: [{
            type: Input
        }], maxColumns: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFormRenderer, { className: "AjfFormRenderer", filePath: "form.ts", lineNumber: 52 }); })();

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
class AjfFormsModule {
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
            AjfFormsModule$1,
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
                    AjfFormsModule$1,
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
        AjfFormsModule$1,
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
        NgxMatSelectSearchModule, i4$3.QuillModule], exports: [AjfFieldRow, AjfFormField, AjfFormRenderer, AjfRepStrip, AjfSlideHeader] }); })();

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

export { AjfBooleanFieldComponent, AjfCurrentSlidePipe, AjfDateFieldComponent, AjfDateInputFieldComponent, AjfEmptyFieldComponent, AjfFieldRow, AjfFieldService, AjfFieldWarningDialog, AjfFormField, AjfFormIssuesPipe, AjfFormRenderer, AjfFormsModule, AjfInputFieldComponent, AjfMultipleChoiceFieldComponent, AjfRepStrip, AjfSingleChoiceFieldComponent, AjfSlideCompletionPipe, AjfSlideHeader, AjfSlideIssuesPipe, AjfTableFieldComponent, AjfTimeFieldComponent, AjfWarningAlertService };
//# sourceMappingURL=ajf-material-forms.mjs.map
