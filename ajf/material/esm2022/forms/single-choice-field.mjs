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
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/select";
import * as i4 from "@angular/material/core";
import * as i5 from "@angular/forms";
import * as i6 from "ngx-mat-select-search";
import * as i7 from "@ngneat/transloco";
import * as i8 from "./warning-alert-service";
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
export class AjfSingleChoiceFieldComponent extends AjfFieldWithChoicesComponent {
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
    static { this.ɵfac = function AjfSingleChoiceFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfSingleChoiceFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE), i0.ɵɵdirectiveInject(AJF_SEARCH_ALERT_THRESHOLD, 8)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfSingleChoiceFieldComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [[4, "ngIf"], [1, "ajf-choice-control"], ["panelClass", "ajf-select-panel", 3, "formControl"], ["role", "radiogroup", 1, "ajf-segmented", "ajf-choices-container"], ["type", "button", "class", "ajf-btn--ghost ajf-clear-value", 3, "click", 4, "ngIf"], [1, "ajf-select-search-option"], [3, "formControl", "placeholderLabel", "noEntriesFoundLabel", "enableClearOnEscapePressed"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], ["type", "button", "class", "ajf-segment", "role", "radio", 3, "ajf-selected", "disabled", "click", 4, "ngFor", "ngForOf"], ["type", "button", "role", "radio", 1, "ajf-segment", 3, "click", "disabled"], ["type", "button", 1, "ajf-btn--ghost", "ajf-clear-value", 3, "click"]], template: function AjfSingleChoiceFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfSingleChoiceFieldComponent_Conditional_0_Template, 2, 3, "ng-container");
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.instance ? 0 : -1);
        } }, dependencies: [i2.NgForOf, i2.NgIf, i3.MatSelect, i4.MatOption, i5.NgControlStatus, i5.FormControlDirective, i6.MatSelectSearchComponent, i7.TranslocoPipe, i2.AsyncPipe], styles: [".ajf-choice-control{display:flex;flex-wrap:wrap;align-items:center;gap:8px;min-width:0}.mat-mdc-select-panel.ajf-select-panel{border:1px solid var(--ajf-border, #e6e2dc);background:var(--ajf-surface, #ffffff)}.mat-mdc-select-panel.ajf-select-panel .mat-mdc-option{font-family:var(--ajf-font-sans, sans-serif)}.mat-mdc-select-panel.ajf-select-panel .mat-mdc-option .mdc-list-item__primary-text{color:var(--ajf-text, #1c1a17);font-size:14px}.mat-mdc-select-panel.ajf-select-panel .mat-mdc-option.ajf-select-search-option{min-height:0;padding:0;border-bottom:1px solid var(--ajf-border, #e6e2dc);background:var(--ajf-surface, #ffffff);pointer-events:auto}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfSingleChoiceFieldComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "@if (instance) {\n<ng-container *ngIf=\"control | async as ctrl\">\n  <div class=\"ajf-choice-control\">\n    @if (isNarrow) {\n    <mat-select [formControl]=\"ctrl!\" panelClass=\"ajf-select-panel\">\n      <mat-option class=\"ajf-select-search-option\">\n        <ngx-mat-select-search\n          [formControl]=\"searchFilterCtrl\"\n          [placeholderLabel]=\"'Search' | transloco\"\n          [noEntriesFoundLabel]=\"'Nothing found' | transloco\"\n          [enableClearOnEscapePressed]=\"true\"\n        >\n        </ngx-mat-select-search>\n      </mat-option>\n      <mat-option [value]=\"choice.value\" *ngFor=\"let choice of filteredChoices$ | async\">\n        {{ choice.translatedLabel ?? (choice.label | transloco) }}\n      </mat-option>\n    </mat-select>\n    } @else {\n    <div\n      class=\"ajf-segmented ajf-choices-container\"\n      role=\"radiogroup\"\n      [attr.aria-labelledby]=\"instance.node.name\"\n    >\n      <button\n        type=\"button\"\n        class=\"ajf-segment\"\n        role=\"radio\"\n        *ngFor=\"let choice of instance.filteredChoices\"\n        [attr.aria-checked]=\"ctrl.value === choice.value\"\n        [class.ajf-selected]=\"ctrl.value === choice.value\"\n        [disabled]=\"ctrl.disabled\"\n        (click)=\"ctrl.setValue(choice.value)\"\n      >\n        {{ choice.translatedLabel ?? (choice.label | transloco) }}\n      </button>\n    </div>\n    }\n\n    <!-- A picked radio cannot be unpicked, so emptying the field needs its own\n         action. -->\n    <button\n      type=\"button\"\n      class=\"ajf-btn--ghost ajf-clear-value\"\n      *ngIf=\"hasValue(ctrl) && !ctrl.disabled\"\n      (click)=\"clearValue(ctrl, $event)\"\n    >\n      {{ 'Clear' | transloco }}\n    </button>\n  </div>\n</ng-container>\n}\n", styles: [".ajf-choice-control{display:flex;flex-wrap:wrap;align-items:center;gap:8px;min-width:0}.mat-mdc-select-panel.ajf-select-panel{border:1px solid var(--ajf-border, #e6e2dc);background:var(--ajf-surface, #ffffff)}.mat-mdc-select-panel.ajf-select-panel .mat-mdc-option{font-family:var(--ajf-font-sans, sans-serif)}.mat-mdc-select-panel.ajf-select-panel .mat-mdc-option .mdc-list-item__primary-text{color:var(--ajf-text, #1c1a17);font-size:14px}.mat-mdc-select-panel.ajf-select-panel .mat-mdc-option.ajf-select-search-option{min-height:0;padding:0;border-bottom:1px solid var(--ajf-border, #e6e2dc);background:var(--ajf-surface, #ffffff);pointer-events:auto}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: i8.AjfWarningAlertService, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [AJF_SEARCH_ALERT_THRESHOLD]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfSingleChoiceFieldComponent, { className: "AjfSingleChoiceFieldComponent", filePath: "single-choice-field.ts", lineNumber: 53 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlLWNob2ljZS1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm1zL3NyYy9zaW5nbGUtY2hvaWNlLWZpZWxkLnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvZm9ybXMvc3JjL3NpbmdsZS1jaG9pY2UtZmllbGQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wsMEJBQTBCLEVBQzFCLHlCQUF5QixFQUV6Qiw0QkFBNEIsR0FFN0IsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxNQUFNLEVBRU4sUUFBUSxFQUNSLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLGFBQWEsRUFBRSxLQUFLLEVBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDakYsT0FBTyxFQUFDLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7OztJQzFCdkYscUNBQW1GO0lBQ2pGLFlBQ0Y7O0lBQUEsaUJBQWE7Ozs7SUFGRCx1Q0FBc0I7SUFDaEMsY0FDRjtJQURFLDBKQUNGOzs7SUFYQSxBQURGLHFDQUFnRSxvQkFDakI7SUFDM0MsMkNBTXdCOzs7SUFDMUIsaUJBQWE7SUFDYix1SUFBbUY7O0lBR3JGLGlCQUFhOzs7O0lBYkQscUNBQXFCO0lBRzNCLGVBQWdDO0lBR2hDLEFBREEsQUFEQSxBQURBLHFEQUFnQyxvREFDUyw4REFDVSxvQ0FDaEI7SUFJZSxlQUEyQjtJQUEzQix3RUFBMkI7Ozs7SUFVakYsa0NBU0M7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QVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUMxRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztJQUNILENBQUM7SUFFUSxXQUFXO1FBQ2xCLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsNEJBQTRCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDaEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzhIQXpGVSw2QkFBNkIsb0hBZ0M5Qix5QkFBeUIsd0JBQ2IsMEJBQTBCO29FQWpDckMsNkJBQTZCO1lDcEQxQyw0RkFBZ0I7O1lBQWhCLHVDQW1EQzs7O2lGRENZLDZCQUE2QjtjQU56QyxTQUFTO2tDQUdTLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUk7O3NCQWtDbEMsTUFBTTt1QkFBQyx5QkFBeUI7O3NCQUNoQyxRQUFROztzQkFBSSxNQUFNO3VCQUFDLDBCQUEwQjs7a0ZBakNyQyw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFKRl9TRUFSQ0hfQUxFUlRfVEhSRVNIT0xELFxuICBBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFLFxuICBBamZDaG9pY2UsXG4gIEFqZkZpZWxkV2l0aENob2ljZXNDb21wb25lbnQsXG4gIEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG59IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgSW5qZWN0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1Db250cm9sfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge2NvbWJpbmVMYXRlc3QsIG1lcmdlLCBPYnNlcnZhYmxlLCBvZiwgU3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwLCBzdGFydFdpdGgsIHN3aXRjaE1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZldhcm5pbmdBbGVydFNlcnZpY2V9IGZyb20gJy4vd2FybmluZy1hbGVydC1zZXJ2aWNlJztcblxuY29uc3QgbWF4Q2hvaWNlc0luRG9tID0gNDA7XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZVVybDogJ3NpbmdsZS1jaG9pY2UtZmllbGQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydzaW5nbGUtY2hvaWNlLWZpZWxkLnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZlNpbmdsZUNob2ljZUZpZWxkQ29tcG9uZW50PFQ+XG4gIGV4dGVuZHMgQWpmRmllbGRXaXRoQ2hvaWNlc0NvbXBvbmVudDxUPlxuICBpbXBsZW1lbnRzIE9uRGVzdHJveVxue1xuICByZWFkb25seSBleHBhbmRUaHJlc2hvbGQgPSBzdXBlci5zZWFyY2hUaHJlc2hvbGQ7XG4gIHJlYWRvbmx5IHNlYXJjaEZpbHRlckN0cmwgPSBuZXcgRm9ybUNvbnRyb2w8c3RyaW5nPignJywge25vbk51bGxhYmxlOiB0cnVlfSk7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGNob2ljZXMgY29sbGFwc2UgaW50byBhIHNlYXJjaGFibGUgZHJvcGRvd24uIEJlbG93IHRoZSBzZWFyY2hcbiAgICogdGhyZXNob2xkIHRoZXkgYXJlIGxhaWQgb3V0IGFzIGJ1dHRvbnMgaW5zdGVhZCwgd2hpY2ggcmVhZHMgZmFzdGVyIGZvciBhXG4gICAqIHNob3J0IGxpc3QuIGBmb3JjZUV4cGFuZGVkYCB3aW5zIG92ZXIgYGZvcmNlTmFycm93YCwgc28gYSBzY2hlbWEgY2FuIHBpblxuICAgKiBlaXRoZXIgcHJlc2VudGF0aW9uIHJlZ2FyZGxlc3Mgb2YgaG93IG1hbnkgY2hvaWNlcyB0aGVyZSBhcmUuXG4gICAqL1xuICBnZXQgaXNOYXJyb3coKTogYm9vbGVhbiB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmluc3RhbmNlO1xuICAgIGlmIChpbnN0YW5jZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChpbnN0YW5jZS5ub2RlLmZvcmNlRXhwYW5kZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGluc3RhbmNlLm5vZGUuZm9yY2VOYXJyb3cgfHwgaW5zdGFuY2UuZmlsdGVyZWRDaG9pY2VzLmxlbmd0aCA+IHRoaXMuZXhwYW5kVGhyZXNob2xkO1xuICB9XG5cbiAgZmlsdGVyZWRDaG9pY2VzJDogT2JzZXJ2YWJsZTxBamZDaG9pY2U8YW55PltdPjtcblxuICBwcml2YXRlIHJlYWRvbmx5IF9jaG9pY2VzVXBkYXRlJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgX2luc3RhbmNlVXBkYXRlRm9yQ2hvaWNlc1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHNlcnZpY2U6IEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gICAgQEluamVjdChBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFKSB3YXM6IEFqZldhcm5pbmdBbGVydFNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChBSkZfU0VBUkNIX0FMRVJUX1RIUkVTSE9MRCkgc2VhcmNoVGhyZXNob2xkOiBudW1iZXIsXG4gICkge1xuICAgIHN1cGVyKGNkciwgc2VydmljZSwgd2FzLCBzZWFyY2hUaHJlc2hvbGQpO1xuXG4gICAgY29uc3QgY29udHJvbFZhbHVlJCA9IHRoaXMuY29udHJvbC5waXBlKFxuICAgICAgc3dpdGNoTWFwKGN0cmwgPT4gKGN0cmwgPyBjdHJsLnZhbHVlQ2hhbmdlcy5waXBlKHN0YXJ0V2l0aChjdHJsLnZhbHVlKSkgOiBvZihudWxsKSkpLFxuICAgICAgc3RhcnRXaXRoKG51bGwpLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICApO1xuXG4gICAgdGhpcy5maWx0ZXJlZENob2ljZXMkID0gY29tYmluZUxhdGVzdChbXG4gICAgICBtZXJnZShcbiAgICAgICAgdGhpcy5zZWFyY2hGaWx0ZXJDdHJsLnZhbHVlQ2hhbmdlcy5waXBlKGRlYm91bmNlVGltZSgxNTApLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKSxcbiAgICAgICAgdGhpcy5fY2hvaWNlc1VwZGF0ZSQsXG4gICAgICApLnBpcGUoc3RhcnRXaXRoKG51bGwpKSxcbiAgICAgIGNvbnRyb2xWYWx1ZSQsXG4gICAgXSkucGlwZShcbiAgICAgIG1hcCgoW18sIHNlbGVjdGVkVmFsdWVdKSA9PiB7XG4gICAgICAgIGNvbnN0IHNlYXJjaCA9IHRoaXMuc2VhcmNoRmlsdGVyQ3RybC52YWx1ZTtcbiAgICAgICAgY29uc3QgY2hvaWNlcyA9IHRoaXMuaW5zdGFuY2U/LmZpbHRlcmVkQ2hvaWNlcyB8fCBbXTtcbiAgICAgICAgaWYgKHNlYXJjaCkge1xuICAgICAgICAgIGNvbnN0IGxvd2VyU2VhcmNoID0gc2VhcmNoLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgcmV0dXJuIGNob2ljZXMuZmlsdGVyKGMgPT5cbiAgICAgICAgICAgIChjLnRyYW5zbGF0ZWRMYWJlbCA/PyBjLmxhYmVsKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGxvd2VyU2VhcmNoKSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaG9pY2VzLmxlbmd0aCA8PSBtYXhDaG9pY2VzSW5Eb20pIHtcbiAgICAgICAgICByZXR1cm4gY2hvaWNlcztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0cnVuY2F0ZWQgPSBjaG9pY2VzLnNsaWNlKDAsIG1heENob2ljZXNJbkRvbSk7XG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgc2VsZWN0ZWQgY2hvaWNlIGlzIGluY2x1ZGVkIGluIHRydW5jYXRlZFxuICAgICAgICBpZiAoc2VsZWN0ZWRWYWx1ZSAhPSBudWxsICYmICF0cnVuY2F0ZWQuc29tZShjID0+IGMudmFsdWUgPT09IHNlbGVjdGVkVmFsdWUpKSB7XG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBjaG9pY2VzLmZpbmQoYyA9PiBjLnZhbHVlID09PSBzZWxlY3RlZFZhbHVlKTtcbiAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBbc2VsZWN0ZWQsIC4uLnRydW5jYXRlZF07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVuY2F0ZWQ7XG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIF9vbkluc3RhbmNlQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuX2luc3RhbmNlVXBkYXRlRm9yQ2hvaWNlc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2Nob2ljZXNVcGRhdGUkLm5leHQoKTtcbiAgICBpZiAodGhpcy5pbnN0YW5jZSkge1xuICAgICAgdGhpcy5faW5zdGFuY2VVcGRhdGVGb3JDaG9pY2VzU3ViID0gdGhpcy5pbnN0YW5jZS51cGRhdGVkRXZ0LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuX2Nob2ljZXNVcGRhdGUkLm5leHQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG92ZXJyaWRlIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgdGhpcy5faW5zdGFuY2VVcGRhdGVGb3JDaG9pY2VzU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fY2hvaWNlc1VwZGF0ZSQuY29tcGxldGUoKTtcbiAgfVxufVxuIiwiQGlmIChpbnN0YW5jZSkge1xuPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbnRyb2wgfCBhc3luYyBhcyBjdHJsXCI+XG4gIDxkaXYgY2xhc3M9XCJhamYtY2hvaWNlLWNvbnRyb2xcIj5cbiAgICBAaWYgKGlzTmFycm93KSB7XG4gICAgPG1hdC1zZWxlY3QgW2Zvcm1Db250cm9sXT1cImN0cmwhXCIgcGFuZWxDbGFzcz1cImFqZi1zZWxlY3QtcGFuZWxcIj5cbiAgICAgIDxtYXQtb3B0aW9uIGNsYXNzPVwiYWpmLXNlbGVjdC1zZWFyY2gtb3B0aW9uXCI+XG4gICAgICAgIDxuZ3gtbWF0LXNlbGVjdC1zZWFyY2hcbiAgICAgICAgICBbZm9ybUNvbnRyb2xdPVwic2VhcmNoRmlsdGVyQ3RybFwiXG4gICAgICAgICAgW3BsYWNlaG9sZGVyTGFiZWxdPVwiJ1NlYXJjaCcgfCB0cmFuc2xvY29cIlxuICAgICAgICAgIFtub0VudHJpZXNGb3VuZExhYmVsXT1cIidOb3RoaW5nIGZvdW5kJyB8IHRyYW5zbG9jb1wiXG4gICAgICAgICAgW2VuYWJsZUNsZWFyT25Fc2NhcGVQcmVzc2VkXT1cInRydWVcIlxuICAgICAgICA+XG4gICAgICAgIDwvbmd4LW1hdC1zZWxlY3Qtc2VhcmNoPlxuICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgPG1hdC1vcHRpb24gW3ZhbHVlXT1cImNob2ljZS52YWx1ZVwiICpuZ0Zvcj1cImxldCBjaG9pY2Ugb2YgZmlsdGVyZWRDaG9pY2VzJCB8IGFzeW5jXCI+XG4gICAgICAgIHt7IGNob2ljZS50cmFuc2xhdGVkTGFiZWwgPz8gKGNob2ljZS5sYWJlbCB8IHRyYW5zbG9jbykgfX1cbiAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICA8L21hdC1zZWxlY3Q+XG4gICAgfSBAZWxzZSB7XG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJhamYtc2VnbWVudGVkIGFqZi1jaG9pY2VzLWNvbnRhaW5lclwiXG4gICAgICByb2xlPVwicmFkaW9ncm91cFwiXG4gICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiaW5zdGFuY2Uubm9kZS5uYW1lXCJcbiAgICA+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBjbGFzcz1cImFqZi1zZWdtZW50XCJcbiAgICAgICAgcm9sZT1cInJhZGlvXCJcbiAgICAgICAgKm5nRm9yPVwibGV0IGNob2ljZSBvZiBpbnN0YW5jZS5maWx0ZXJlZENob2ljZXNcIlxuICAgICAgICBbYXR0ci5hcmlhLWNoZWNrZWRdPVwiY3RybC52YWx1ZSA9PT0gY2hvaWNlLnZhbHVlXCJcbiAgICAgICAgW2NsYXNzLmFqZi1zZWxlY3RlZF09XCJjdHJsLnZhbHVlID09PSBjaG9pY2UudmFsdWVcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiY3RybC5kaXNhYmxlZFwiXG4gICAgICAgIChjbGljayk9XCJjdHJsLnNldFZhbHVlKGNob2ljZS52YWx1ZSlcIlxuICAgICAgPlxuICAgICAgICB7eyBjaG9pY2UudHJhbnNsYXRlZExhYmVsID8/IChjaG9pY2UubGFiZWwgfCB0cmFuc2xvY28pIH19XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICB9XG5cbiAgICA8IS0tIEEgcGlja2VkIHJhZGlvIGNhbm5vdCBiZSB1bnBpY2tlZCwgc28gZW1wdHlpbmcgdGhlIGZpZWxkIG5lZWRzIGl0cyBvd25cbiAgICAgICAgIGFjdGlvbi4gLS0+XG4gICAgPGJ1dHRvblxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICBjbGFzcz1cImFqZi1idG4tLWdob3N0IGFqZi1jbGVhci12YWx1ZVwiXG4gICAgICAqbmdJZj1cImhhc1ZhbHVlKGN0cmwpICYmICFjdHJsLmRpc2FibGVkXCJcbiAgICAgIChjbGljayk9XCJjbGVhclZhbHVlKGN0cmwsICRldmVudClcIlxuICAgID5cbiAgICAgIHt7ICdDbGVhcicgfCB0cmFuc2xvY28gfX1cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj5cbn1cbiJdfQ==