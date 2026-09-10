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
import { AJF_SEARCH_ALERT_THRESHOLD, AJF_WARNING_ALERT_SERVICE, AjfFieldWithChoicesComponent, } from '@ajf/core/forms';
import { ChangeDetectionStrategy, Component, Inject, Optional, ViewEncapsulation, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, merge, of, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/core/forms";
import * as i2 from "@ajf/material/checkbox-group";
import * as i3 from "@ajf/core/checkbox-group";
import * as i4 from "@angular/common";
import * as i5 from "@angular/material/icon";
import * as i6 from "@angular/material/select";
import * as i7 from "@angular/material/core";
import * as i8 from "@angular/forms";
import * as i9 from "ngx-mat-select-search";
import * as i10 from "@ngneat/transloco";
import * as i11 from "./warning-alert-service";
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
const maxChoicesInDom = 40;
export class AjfMultipleChoiceFieldComponent extends AjfFieldWithChoicesComponent {
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
            if (choices.length <= maxChoicesInDom) {
                return choices;
            }
            let truncated = choices.slice(0, maxChoicesInDom);
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
    static { this.ɵfac = function AjfMultipleChoiceFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfMultipleChoiceFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE), i0.ɵɵdirectiveInject(AJF_SEARCH_ALERT_THRESHOLD, 8)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfMultipleChoiceFieldComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [[4, "ngIf"], [1, "ajf-choice-control"], ["panelClass", "ajf-select-panel", 3, "formControl", "multiple"], [1, "ajf-choices-container", 3, "formControl"], ["type", "button", "class", "ajf-btn--ghost ajf-clear-value", 3, "click", 4, "ngIf"], ["class", "ajf-chip ajf-chip--removable", 4, "ngFor", "ngForOf"], [1, "ajf-select-search-option"], [3, "formControl", "placeholderLabel", "noEntriesFoundLabel", "enableClearOnEscapePressed"], [3, "value", 4, "ngFor", "ngForOf"], [1, "ajf-chip", "ajf-chip--removable"], ["type", "button", 3, "click", 4, "ngIf"], ["type", "button", 3, "click"], [3, "value"], ["type", "button", 1, "ajf-btn--ghost", "ajf-clear-value", 3, "click"]], template: function AjfMultipleChoiceFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfMultipleChoiceFieldComponent_Conditional_0_Template, 2, 3, "ng-container");
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.instance ? 0 : -1);
        } }, dependencies: [i2.CheckboxGroupItem, i3.AjfCheckboxGroup, i4.NgForOf, i4.NgIf, i5.MatIcon, i6.MatSelect, i6.MatSelectTrigger, i7.MatOption, i8.NgControlStatus, i8.FormControlDirective, i9.MatSelectSearchComponent, i10.TranslocoPipe, i4.AsyncPipe], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfMultipleChoiceFieldComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "@if (instance) {\n<ng-container *ngIf=\"control | async as ctrl\">\n  <div class=\"ajf-choice-control\">\n    @if (isNarrow) {\n    <mat-select [formControl]=\"ctrl!\" panelClass=\"ajf-select-panel\" [multiple]=\"true\">\n      <mat-select-trigger>\n        <span class=\"ajf-chip ajf-chip--removable\" *ngFor=\"let value of ctrl.value\">\n          {{ labelFor(value) | transloco }}\n          <button\n            type=\"button\"\n            *ngIf=\"!ctrl.disabled\"\n            [attr.aria-label]=\"'Remove' | transloco\"\n            (click)=\"removeValue(ctrl!, value, $event)\"\n          >\n            <mat-icon>close</mat-icon>\n          </button>\n        </span>\n      </mat-select-trigger>\n      <mat-option class=\"ajf-select-search-option\">\n        <ngx-mat-select-search\n          [formControl]=\"searchFilterCtrl\"\n          [placeholderLabel]=\"'Search' | transloco\"\n          [noEntriesFoundLabel]=\"'Nothing found' | transloco\"\n          [enableClearOnEscapePressed]=\"true\"\n        >\n        </ngx-mat-select-search>\n      </mat-option>\n      <mat-option [value]=\"choice.value\" *ngFor=\"let choice of filteredChoices$ | async\">\n        {{ choice.translatedLabel ?? (choice.label | transloco) }}\n      </mat-option>\n    </mat-select>\n    } @else {\n    <ajf-checkbox-group class=\"ajf-choices-container\" [formControl]=\"ctrl!\">\n      <ajf-checkbox-group-item [value]=\"choice.value\" *ngFor=\"let choice of instance.filteredChoices\">\n        {{ choice.translatedLabel ?? (choice.label | transloco) }}\n      </ajf-checkbox-group-item>\n    </ajf-checkbox-group>\n    }\n\n    <!-- Dropping the whole selection, next to the per-chip buttons that drop one. -->\n    <button\n      type=\"button\"\n      class=\"ajf-btn--ghost ajf-clear-value\"\n      *ngIf=\"hasValue(ctrl) && !ctrl.disabled\"\n      (click)=\"clearValue(ctrl, $event)\"\n    >\n      {{ 'Clear' | transloco }}\n    </button>\n  </div>\n</ng-container>\n}\n" }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: i11.AjfWarningAlertService, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [AJF_SEARCH_ALERT_THRESHOLD]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfMultipleChoiceFieldComponent, { className: "AjfMultipleChoiceFieldComponent", filePath: "multiple-choice-field.ts", lineNumber: 53 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlwbGUtY2hvaWNlLWZpZWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvZm9ybXMvc3JjL211bHRpcGxlLWNob2ljZS1maWVsZC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm1zL3NyYy9tdWx0aXBsZS1jaG9pY2UtZmllbGQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wsMEJBQTBCLEVBQzFCLHlCQUF5QixFQUV6Qiw0QkFBNEIsR0FFN0IsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxNQUFNLEVBRU4sUUFBUSxFQUNSLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsV0FBVyxFQUFxQixNQUFNLGdCQUFnQixDQUFDO0FBQy9ELE9BQU8sRUFBQyxhQUFhLEVBQUUsS0FBSyxFQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0lDaENuRixrQ0FLQzs7SUFEQyxnVkFBUyw2Q0FBaUMsS0FBQztJQUUzQyxnQ0FBVTtJQUFBLHFCQUFLO0lBQ2pCLEFBRGlCLGlCQUFXLEVBQ25COzs7OztJQVRYLCtCQUE0RTtJQUMxRSxZQUNBOztJQUFBLHlJQUtDO0lBR0gsaUJBQU87Ozs7O0lBVEwsY0FDQTtJQURBLGdGQUNBO0lBRUcsZUFBb0I7SUFBcEIsd0NBQW9COzs7SUFpQjNCLHNDQUFtRjtJQUNqRixZQUNGOztJQUFBLGlCQUFhOzs7O0lBRkQsdUNBQXNCO0lBQ2hDLGNBQ0Y7SUFERSww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bEIsSUFBSSxDQUFDLDRCQUE0QixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQzFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0lBQ0gsQ0FBQztJQUVRLFdBQVc7UUFDbEIsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNoRCxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xDLENBQUM7Z0lBL0dVLCtCQUErQixvSEFnQ2hDLHlCQUF5Qix3QkFDYiwwQkFBMEI7b0VBakNyQywrQkFBK0I7WUNwRDVDLDhGQUFnQjs7WUFBaEIsdUNBa0RDOzs7aUZERVksK0JBQStCO2NBTjNDLFNBQVM7a0NBR1MsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTs7c0JBa0NsQyxNQUFNO3VCQUFDLHlCQUF5Qjs7c0JBQ2hDLFFBQVE7O3NCQUFJLE1BQU07dUJBQUMsMEJBQTBCOztrRkFqQ3JDLCtCQUErQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQUpGX1NFQVJDSF9BTEVSVF9USFJFU0hPTEQsXG4gIEFKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UsXG4gIEFqZkNob2ljZSxcbiAgQWpmRmllbGRXaXRoQ2hvaWNlc0NvbXBvbmVudCxcbiAgQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbn0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbmplY3QsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybUNvbnRyb2wsIFVudHlwZWRGb3JtQ29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtjb21iaW5lTGF0ZXN0LCBtZXJnZSwgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2RlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZXYXJuaW5nQWxlcnRTZXJ2aWNlfSBmcm9tICcuL3dhcm5pbmctYWxlcnQtc2VydmljZSc7XG5cbmNvbnN0IG1heENob2ljZXNJbkRvbSA9IDQwO1xuXG5AQ29tcG9uZW50KHtcbiAgdGVtcGxhdGVVcmw6ICdtdWx0aXBsZS1jaG9pY2UtZmllbGQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydtdWx0aXBsZS1jaG9pY2UtZmllbGQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmTXVsdGlwbGVDaG9pY2VGaWVsZENvbXBvbmVudDxUPlxuICBleHRlbmRzIEFqZkZpZWxkV2l0aENob2ljZXNDb21wb25lbnQ8VD5cbiAgaW1wbGVtZW50cyBPbkRlc3Ryb3lcbntcbiAgcmVhZG9ubHkgZXhwYW5kVGhyZXNob2xkID0gc3VwZXIuc2VhcmNoVGhyZXNob2xkO1xuICByZWFkb25seSBzZWFyY2hGaWx0ZXJDdHJsID0gbmV3IEZvcm1Db250cm9sPHN0cmluZz4oJycsIHtub25OdWxsYWJsZTogdHJ1ZX0pO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBjaG9pY2VzIGNvbGxhcHNlIGludG8gYSBzZWFyY2hhYmxlIGRyb3Bkb3duLiBCZWxvdyB0aGUgc2VhcmNoXG4gICAqIHRocmVzaG9sZCB0aGV5IGFyZSBsYWlkIG91dCBhcyBidXR0b25zIGluc3RlYWQsIHdoaWNoIHJlYWRzIGZhc3RlciBmb3IgYVxuICAgKiBzaG9ydCBsaXN0LiBgZm9yY2VFeHBhbmRlZGAgd2lucyBvdmVyIGBmb3JjZU5hcnJvd2AsIHNvIGEgc2NoZW1hIGNhbiBwaW5cbiAgICogZWl0aGVyIHByZXNlbnRhdGlvbiByZWdhcmRsZXNzIG9mIGhvdyBtYW55IGNob2ljZXMgdGhlcmUgYXJlLlxuICAgKi9cbiAgZ2V0IGlzTmFycm93KCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5pbnN0YW5jZTtcbiAgICBpZiAoaW5zdGFuY2UgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoaW5zdGFuY2Uubm9kZS5mb3JjZUV4cGFuZGVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBpbnN0YW5jZS5ub2RlLmZvcmNlTmFycm93IHx8IGluc3RhbmNlLmZpbHRlcmVkQ2hvaWNlcy5sZW5ndGggPiB0aGlzLmV4cGFuZFRocmVzaG9sZDtcbiAgfVxuXG4gIGZpbHRlcmVkQ2hvaWNlcyQ6IE9ic2VydmFibGU8QWpmQ2hvaWNlPGFueT5bXT47XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfY2hvaWNlc1VwZGF0ZSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIF9pbnN0YW5jZVVwZGF0ZUZvckNob2ljZXNTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBzZXJ2aWNlOiBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICAgIEBJbmplY3QoQUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSkgd2FzOiBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQUpGX1NFQVJDSF9BTEVSVF9USFJFU0hPTEQpIHNlYXJjaFRocmVzaG9sZDogbnVtYmVyLFxuICApIHtcbiAgICBzdXBlcihjZHIsIHNlcnZpY2UsIHdhcywgc2VhcmNoVGhyZXNob2xkKTtcblxuICAgIGNvbnN0IGNvbnRyb2xWYWx1ZSQgPSB0aGlzLmNvbnRyb2wucGlwZShcbiAgICAgIHN3aXRjaE1hcChjdHJsID0+IChjdHJsID8gY3RybC52YWx1ZUNoYW5nZXMucGlwZShzdGFydFdpdGgoY3RybC52YWx1ZSkpIDogb2YobnVsbCkpKSxcbiAgICAgIHN0YXJ0V2l0aChudWxsKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgKTtcblxuICAgIHRoaXMuZmlsdGVyZWRDaG9pY2VzJCA9IGNvbWJpbmVMYXRlc3QoW1xuICAgICAgbWVyZ2UoXG4gICAgICAgIHRoaXMuc2VhcmNoRmlsdGVyQ3RybC52YWx1ZUNoYW5nZXMucGlwZShkZWJvdW5jZVRpbWUoMTUwKSwgZGlzdGluY3RVbnRpbENoYW5nZWQoKSksXG4gICAgICAgIHRoaXMuX2Nob2ljZXNVcGRhdGUkLFxuICAgICAgKS5waXBlKHN0YXJ0V2l0aChudWxsKSksXG4gICAgICBjb250cm9sVmFsdWUkLFxuICAgIF0pLnBpcGUoXG4gICAgICBtYXAoKFtfLCBzZWxlY3RlZFZhbHVlc106IFthbnksIHN0cmluZ1tdIHwgbnVsbF0pID0+IHtcbiAgICAgICAgY29uc3Qgc2VhcmNoID0gdGhpcy5zZWFyY2hGaWx0ZXJDdHJsLnZhbHVlO1xuICAgICAgICBjb25zdCBjaG9pY2VzID0gdGhpcy5pbnN0YW5jZT8uZmlsdGVyZWRDaG9pY2VzIHx8IFtdO1xuICAgICAgICBpZiAoc2VhcmNoKSB7XG4gICAgICAgICAgY29uc3QgbG93ZXJTZWFyY2ggPSBzZWFyY2gudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICByZXR1cm4gY2hvaWNlcy5maWx0ZXIoYyA9PlxuICAgICAgICAgICAgKGMudHJhbnNsYXRlZExhYmVsID8/IGMubGFiZWwpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMobG93ZXJTZWFyY2gpLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNob2ljZXMubGVuZ3RoIDw9IG1heENob2ljZXNJbkRvbSkge1xuICAgICAgICAgIHJldHVybiBjaG9pY2VzO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0cnVuY2F0ZWQgPSBjaG9pY2VzLnNsaWNlKDAsIG1heENob2ljZXNJbkRvbSk7XG4gICAgICAgIC8vIG1ha2Ugc3VyZSBzZWxlY3RlZCBjaG9pY2VzIGFyZSBpbmNsdWRlZCBpbiB0cnVuY2F0ZWRcbiAgICAgICAgZm9yIChjb25zdCB2YWwgb2Ygc2VsZWN0ZWRWYWx1ZXMgPz8gW10pIHtcbiAgICAgICAgICBpZiAoIXRydW5jYXRlZC5zb21lKGMgPT4gYy52YWx1ZSA9PT0gdmFsKSkge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBjaG9pY2VzLmZpbmQoYyA9PiBjLnZhbHVlID09PSB2YWwpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgIHRydW5jYXRlZCA9IFtzZWxlY3RlZCwgLi4udHJ1bmNhdGVkXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydW5jYXRlZDtcbiAgICAgIH0pLFxuICAgICk7XG4gIH1cblxuICAvKiogVGhlIGxhYmVsIHNob3duIG9uIGEgc2VsZWN0aW9uIGNoaXAuICovXG4gIGxhYmVsRm9yKHZhbHVlOiBhbnkpOiBzdHJpbmcge1xuICAgIGNvbnN0IGNob2ljZSA9ICh0aGlzLmluc3RhbmNlPy5maWx0ZXJlZENob2ljZXMgfHwgW10pLmZpbmQoYyA9PiBjLnZhbHVlID09PSB2YWx1ZSk7XG4gICAgaWYgKGNob2ljZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gYCR7dmFsdWV9YDtcbiAgICB9XG4gICAgcmV0dXJuIGNob2ljZS50cmFuc2xhdGVkTGFiZWwgPz8gY2hvaWNlLmxhYmVsO1xuICB9XG5cbiAgLyoqXG4gICAqIERyb3Agb25lIHZhbHVlIGZyb20gdGhlIHNlbGVjdGlvbiwgZnJvbSB0aGUgY2hpcCdzIG93biBidXR0b24uIFRoZSBjbGljayBoYXNcbiAgICogdG8gYmUgc3RvcHBlZCBmcm9tIHJlYWNoaW5nIHRoZSB0cmlnZ2VyLCB3aGljaCB3b3VsZCByZW9wZW4gdGhlIHBhbmVsLlxuICAgKi9cbiAgcmVtb3ZlVmFsdWUoY3RybDogVW50eXBlZEZvcm1Db250cm9sLCB2YWx1ZTogYW55LCBldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGN1cnJlbnQ6IGFueVtdID0gQXJyYXkuaXNBcnJheShjdHJsLnZhbHVlKSA/IGN0cmwudmFsdWUgOiBbXTtcbiAgICBjdHJsLnNldFZhbHVlKGN1cnJlbnQuZmlsdGVyKHYgPT4gdiAhPT0gdmFsdWUpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSBfb25JbnN0YW5jZUNoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9pbnN0YW5jZVVwZGF0ZUZvckNob2ljZXNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9jaG9pY2VzVXBkYXRlJC5uZXh0KCk7XG4gICAgaWYgKHRoaXMuaW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuX2luc3RhbmNlVXBkYXRlRm9yQ2hvaWNlc1N1YiA9IHRoaXMuaW5zdGFuY2UudXBkYXRlZEV2dC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLl9jaG9pY2VzVXBkYXRlJC5uZXh0KCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvdmVycmlkZSBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgIHRoaXMuX2luc3RhbmNlVXBkYXRlRm9yQ2hvaWNlc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2Nob2ljZXNVcGRhdGUkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiIsIkBpZiAoaW5zdGFuY2UpIHtcbjxuZy1jb250YWluZXIgKm5nSWY9XCJjb250cm9sIHwgYXN5bmMgYXMgY3RybFwiPlxuICA8ZGl2IGNsYXNzPVwiYWpmLWNob2ljZS1jb250cm9sXCI+XG4gICAgQGlmIChpc05hcnJvdykge1xuICAgIDxtYXQtc2VsZWN0IFtmb3JtQ29udHJvbF09XCJjdHJsIVwiIHBhbmVsQ2xhc3M9XCJhamYtc2VsZWN0LXBhbmVsXCIgW211bHRpcGxlXT1cInRydWVcIj5cbiAgICAgIDxtYXQtc2VsZWN0LXRyaWdnZXI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYWpmLWNoaXAgYWpmLWNoaXAtLXJlbW92YWJsZVwiICpuZ0Zvcj1cImxldCB2YWx1ZSBvZiBjdHJsLnZhbHVlXCI+XG4gICAgICAgICAge3sgbGFiZWxGb3IodmFsdWUpIHwgdHJhbnNsb2NvIH19XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAqbmdJZj1cIiFjdHJsLmRpc2FibGVkXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiJ1JlbW92ZScgfCB0cmFuc2xvY29cIlxuICAgICAgICAgICAgKGNsaWNrKT1cInJlbW92ZVZhbHVlKGN0cmwhLCB2YWx1ZSwgJGV2ZW50KVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPG1hdC1pY29uPmNsb3NlPC9tYXQtaWNvbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9tYXQtc2VsZWN0LXRyaWdnZXI+XG4gICAgICA8bWF0LW9wdGlvbiBjbGFzcz1cImFqZi1zZWxlY3Qtc2VhcmNoLW9wdGlvblwiPlxuICAgICAgICA8bmd4LW1hdC1zZWxlY3Qtc2VhcmNoXG4gICAgICAgICAgW2Zvcm1Db250cm9sXT1cInNlYXJjaEZpbHRlckN0cmxcIlxuICAgICAgICAgIFtwbGFjZWhvbGRlckxhYmVsXT1cIidTZWFyY2gnIHwgdHJhbnNsb2NvXCJcbiAgICAgICAgICBbbm9FbnRyaWVzRm91bmRMYWJlbF09XCInTm90aGluZyBmb3VuZCcgfCB0cmFuc2xvY29cIlxuICAgICAgICAgIFtlbmFibGVDbGVhck9uRXNjYXBlUHJlc3NlZF09XCJ0cnVlXCJcbiAgICAgICAgPlxuICAgICAgICA8L25neC1tYXQtc2VsZWN0LXNlYXJjaD5cbiAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgIDxtYXQtb3B0aW9uIFt2YWx1ZV09XCJjaG9pY2UudmFsdWVcIiAqbmdGb3I9XCJsZXQgY2hvaWNlIG9mIGZpbHRlcmVkQ2hvaWNlcyQgfCBhc3luY1wiPlxuICAgICAgICB7eyBjaG9pY2UudHJhbnNsYXRlZExhYmVsID8/IChjaG9pY2UubGFiZWwgfCB0cmFuc2xvY28pIH19XG4gICAgICA8L21hdC1vcHRpb24+XG4gICAgPC9tYXQtc2VsZWN0PlxuICAgIH0gQGVsc2Uge1xuICAgIDxhamYtY2hlY2tib3gtZ3JvdXAgY2xhc3M9XCJhamYtY2hvaWNlcy1jb250YWluZXJcIiBbZm9ybUNvbnRyb2xdPVwiY3RybCFcIj5cbiAgICAgIDxhamYtY2hlY2tib3gtZ3JvdXAtaXRlbSBbdmFsdWVdPVwiY2hvaWNlLnZhbHVlXCIgKm5nRm9yPVwibGV0IGNob2ljZSBvZiBpbnN0YW5jZS5maWx0ZXJlZENob2ljZXNcIj5cbiAgICAgICAge3sgY2hvaWNlLnRyYW5zbGF0ZWRMYWJlbCA/PyAoY2hvaWNlLmxhYmVsIHwgdHJhbnNsb2NvKSB9fVxuICAgICAgPC9hamYtY2hlY2tib3gtZ3JvdXAtaXRlbT5cbiAgICA8L2FqZi1jaGVja2JveC1ncm91cD5cbiAgICB9XG5cbiAgICA8IS0tIERyb3BwaW5nIHRoZSB3aG9sZSBzZWxlY3Rpb24sIG5leHQgdG8gdGhlIHBlci1jaGlwIGJ1dHRvbnMgdGhhdCBkcm9wIG9uZS4gLS0+XG4gICAgPGJ1dHRvblxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICBjbGFzcz1cImFqZi1idG4tLWdob3N0IGFqZi1jbGVhci12YWx1ZVwiXG4gICAgICAqbmdJZj1cImhhc1ZhbHVlKGN0cmwpICYmICFjdHJsLmRpc2FibGVkXCJcbiAgICAgIChjbGljayk9XCJjbGVhclZhbHVlKGN0cmwsICRldmVudClcIlxuICAgID5cbiAgICAgIHt7ICdDbGVhcicgfCB0cmFuc2xvY28gfX1cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj5cbn1cbiJdfQ==