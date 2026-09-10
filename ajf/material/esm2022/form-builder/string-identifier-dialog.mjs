import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, shareReplay, startWith } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./form-builder-service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "@angular/material/core";
import * as i5 from "@angular/material/button";
import * as i6 from "@angular/material/dialog";
import * as i7 from "@angular/material/form-field";
import * as i8 from "@angular/material/select";
import * as i9 from "ngx-mat-select-search";
import * as i10 from "@ngneat/transloco";
function AjfFbStringIdentifierDialogComponent_mat_option_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const field_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", field_r1.name);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", field_r1.label || field_r1.name, " ");
} }
export class AjfFbStringIdentifierDialogComponent {
    constructor(_service) {
        this._service = _service;
        this.searchFilterCtrl = new FormControl('', { nonNullable: true });
        this.selectedFieldNames = [];
        this._fields = [];
        this._fieldsSub = Subscription.EMPTY;
        this._stringIdentifierSub = Subscription.EMPTY;
        this.fields$ = _service.flatFields.pipe(map(fields => fields
            .filter(f => f.name.length > 0)
            .sort((f1, f2) => (f1.label || f1.name).localeCompare(f2.label || f2.name))), shareReplay(1));
        this._fieldsSub = this.fields$.subscribe(fields => {
            this._fields = fields;
        });
        this._stringIdentifierSub = _service.stringIdentifier.subscribe(identifier => {
            this.selectedFieldNames = identifier
                .map(entry => entry.value[0])
                .filter((name) => name != null);
        });
        this.filteredFields$ = this.searchFilterCtrl.valueChanges.pipe(debounceTime(150), distinctUntilChanged(), startWith(''), map(search => {
            const fields = this._fields;
            if (!search) {
                return fields;
            }
            const lowerSearch = search.toLowerCase();
            return fields.filter(f => (f.label || f.name).toLowerCase().includes(lowerSearch));
        }));
    }
    ngOnDestroy() {
        this._fieldsSub.unsubscribe();
        this._stringIdentifierSub.unsubscribe();
    }
    saveStringIdentifier() {
        const identifier = this.selectedFieldNames
            .map(name => this._fields.find(f => f.name === name))
            .filter((f) => f != null)
            .map(f => ({ label: f.label || f.name, value: [f.name] }));
        this._service.saveStringIdentifier(identifier);
    }
    static { this.ɵfac = function AjfFbStringIdentifierDialogComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFbStringIdentifierDialogComponent)(i0.ɵɵdirectiveInject(i1.AjfFormBuilderService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFbStringIdentifierDialogComponent, selectors: [["ajf-fb-string-identifier-dialog"]], decls: 22, vars: 24, consts: [["matDialogTitle", ""], [1, "ajf-string-identifier-select"], ["multiple", "", 3, "ngModelChange", "ngModel"], [3, "formControl", "placeholderLabel", "noEntriesFoundLabel", "enableClearOnEscapePressed"], [3, "value", 4, "ngFor", "ngForOf"], ["mat-raised-button", "", "color", "warn", "matDialogClose", ""], ["mat-raised-button", "", "color", "primary", "matDialogClose", "", 3, "click"], [3, "value"]], template: function AjfFbStringIdentifierDialogComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "h3", 0);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "mat-dialog-content")(4, "p");
            i0.ɵɵtext(5);
            i0.ɵɵpipe(6, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "mat-form-field", 1)(8, "mat-select", 2);
            i0.ɵɵtwoWayListener("ngModelChange", function AjfFbStringIdentifierDialogComponent_Template_mat_select_ngModelChange_8_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.selectedFieldNames, $event) || (ctx.selectedFieldNames = $event); return $event; });
            i0.ɵɵelementStart(9, "mat-option");
            i0.ɵɵelement(10, "ngx-mat-select-search", 3);
            i0.ɵɵpipe(11, "transloco");
            i0.ɵɵpipe(12, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(13, AjfFbStringIdentifierDialogComponent_mat_option_13_Template, 2, 2, "mat-option", 4);
            i0.ɵɵpipe(14, "async");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(15, "mat-dialog-actions")(16, "button", 5);
            i0.ɵɵtext(17);
            i0.ɵɵpipe(18, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "button", 6);
            i0.ɵɵlistener("click", function AjfFbStringIdentifierDialogComponent_Template_button_click_19_listener() { return ctx.saveStringIdentifier(); });
            i0.ɵɵtext(20);
            i0.ɵɵpipe(21, "transloco");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 10, "Default columns"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 12, "Select the fields that will be shown as columns in the form list page"));
            i0.ɵɵadvance(3);
            i0.ɵɵtwoWayProperty("ngModel", ctx.selectedFieldNames);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formControl", ctx.searchFilterCtrl)("placeholderLabel", i0.ɵɵpipeBind1(11, 14, "Search"))("noEntriesFoundLabel", i0.ɵɵpipeBind1(12, 16, "Nothing found"))("enableClearOnEscapePressed", true);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(14, 18, ctx.filteredFields$));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(18, 20, "Close"), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(21, 22, "Save"), " ");
        } }, dependencies: [i2.NgForOf, i3.NgControlStatus, i3.NgModel, i4.MatOption, i5.MatButton, i6.MatDialogClose, i6.MatDialogTitle, i6.MatDialogActions, i6.MatDialogContent, i7.MatFormField, i8.MatSelect, i9.MatSelectSearchComponent, i3.FormControlDirective, i2.AsyncPipe, i10.TranslocoPipe], styles: ["ajf-fb-string-identifier-dialog h3,ajf-fb-string-identifier-dialog p{text-align:center}ajf-fb-string-identifier-dialog .ajf-string-identifier-select{display:block;min-width:200px;width:70%;margin:20px auto}ajf-fb-string-identifier-dialog mat-dialog-actions.mat-mdc-dialog-actions{display:flex;justify-content:space-evenly;align-items:center}ajf-fb-string-identifier-dialog mat-dialog-actions.mat-mdc-dialog-actions .mat-mdc-button-base{min-width:100px}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFbStringIdentifierDialogComponent, [{
        type: Component,
        args: [{ selector: 'ajf-fb-string-identifier-dialog', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<h3 matDialogTitle>{{'Default columns'|transloco}}</h3>\n<mat-dialog-content>\n  <p>{{'Select the fields that will be shown as columns in the form list page'|transloco}}</p>\n  <mat-form-field class=\"ajf-string-identifier-select\">\n    <mat-select multiple [(ngModel)]=\"selectedFieldNames\">\n      <mat-option>\n        <ngx-mat-select-search\n          [formControl]=\"searchFilterCtrl\"\n          [placeholderLabel]=\"'Search'|transloco\"\n          [noEntriesFoundLabel]=\"'Nothing found'|transloco\"\n          [enableClearOnEscapePressed]=\"true\">\n        </ngx-mat-select-search>\n      </mat-option>\n      <mat-option *ngFor=\"let field of filteredFields$ | async\" [value]=\"field.name\">\n        {{field.label || field.name}}\n      </mat-option>\n    </mat-select>\n  </mat-form-field>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-raised-button color=\"warn\" matDialogClose>\n    {{'Close'|transloco}}\n  </button>\n  <button mat-raised-button color=\"primary\" matDialogClose (click)=\"saveStringIdentifier()\">\n    {{'Save'|transloco}}\n  </button>\n</mat-dialog-actions>\n", styles: ["ajf-fb-string-identifier-dialog h3,ajf-fb-string-identifier-dialog p{text-align:center}ajf-fb-string-identifier-dialog .ajf-string-identifier-select{display:block;min-width:200px;width:70%;margin:20px auto}ajf-fb-string-identifier-dialog mat-dialog-actions.mat-mdc-dialog-actions{display:flex;justify-content:space-evenly;align-items:center}ajf-fb-string-identifier-dialog mat-dialog-actions.mat-mdc-dialog-actions .mat-mdc-button-base{min-width:100px}\n"] }]
    }], () => [{ type: i1.AjfFormBuilderService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFbStringIdentifierDialogComponent, { className: "AjfFbStringIdentifierDialogComponent", filePath: "string-identifier-dialog.ts", lineNumber: 38 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLWlkZW50aWZpZXItZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL3NyYy9zdHJpbmctaWRlbnRpZmllci1kaWFsb2cudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvc3JjL3N0cmluZy1pZGVudGlmaWVyLWRpYWxvZy5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVCQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFhLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9GLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQWEsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7Ozs7OztJQ2J6RixxQ0FBK0U7SUFDN0UsWUFDRjtJQUFBLGlCQUFhOzs7SUFGNkMscUNBQW9CO0lBQzVFLGNBQ0Y7SUFERSxnRUFDRjs7QURzQk4sTUFBTSxPQUFPLG9DQUFvQztJQVUvQyxZQUFvQixRQUErQjtRQUEvQixhQUFRLEdBQVIsUUFBUSxDQUF1QjtRQVAxQyxxQkFBZ0IsR0FBRyxJQUFJLFdBQVcsQ0FBUyxFQUFFLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUM3RSx1QkFBa0IsR0FBYSxFQUFFLENBQUM7UUFFMUIsWUFBTyxHQUFlLEVBQUUsQ0FBQztRQUN6QixlQUFVLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDOUMseUJBQW9CLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFHOUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLElB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QUEsWUFBK0I7O1lBQUEsaUJBQUs7WUFFckQsQUFERiwwQ0FBb0IsUUFDZjtZQUFBLFlBQXFGOztZQUFBLGlCQUFJO1lBRTFGLEFBREYseUNBQXFELG9CQUNHO1lBQWpDLHVQQUFnQztZQUNuRCxrQ0FBWTtZQUNWLDRDQUt3Qjs7O1lBQzFCLGlCQUFhO1lBQ2IscUdBQStFOztZQUtyRixBQURFLEFBREUsaUJBQWEsRUFDRSxFQUNFO1lBRW5CLEFBREYsMkNBQW9CLGlCQUNvQztZQUNwRCxhQUNGOztZQUFBLGlCQUFTO1lBQ1Qsa0NBQTBGO1lBQWpDLGtIQUFTLDBCQUFzQixJQUFDO1lBQ3ZGLGFBQ0Y7O1lBQ0YsQUFERSxpQkFBUyxFQUNVOztZQTFCRixjQUErQjtZQUEvQiw4REFBK0I7WUFFN0MsZUFBcUY7WUFBckYsb0hBQXFGO1lBRWpFLGVBQWdDO1lBQWhDLHNEQUFnQztZQUcvQyxlQUFnQztZQUdoQyxBQURBLEFBREEsQUFEQSxrREFBZ0Msc0RBQ08sZ0VBQ1Usb0NBQ2Q7WUFHVCxlQUEwQjtZQUExQixxRUFBMEI7WUFRMUQsZUFDRjtZQURFLGdFQUNGO1lBRUUsZUFDRjtZQURFLCtEQUNGOzs7aUZEWVcsb0NBQW9DO2NBUGhELFNBQVM7MkJBQ0UsaUNBQWlDLG1CQUcxQix1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJOztrRkFFMUIsb0NBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZpZWxkLCBBamZGb3JtU3RyaW5nSWRlbnRpZmllcn0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgT25EZXN0cm95LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1Db250cm9sfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2RlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCwgc2hhcmVSZXBsYXksIHN0YXJ0V2l0aH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkZvcm1CdWlsZGVyU2VydmljZX0gZnJvbSAnLi9mb3JtLWJ1aWxkZXItc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1mYi1zdHJpbmctaWRlbnRpZmllci1kaWFsb2cnLFxuICB0ZW1wbGF0ZVVybDogJ3N0cmluZy1pZGVudGlmaWVyLWRpYWxvZy5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc3RyaW5nLWlkZW50aWZpZXItZGlhbG9nLnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZiU3RyaW5nSWRlbnRpZmllckRpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHJlYWRvbmx5IGZpZWxkcyQ6IE9ic2VydmFibGU8QWpmRmllbGRbXT47XG4gIHJlYWRvbmx5IGZpbHRlcmVkRmllbGRzJDogT2JzZXJ2YWJsZTxBamZGaWVsZFtdPjtcbiAgcmVhZG9ubHkgc2VhcmNoRmlsdGVyQ3RybCA9IG5ldyBGb3JtQ29udHJvbDxzdHJpbmc+KCcnLCB7bm9uTnVsbGFibGU6IHRydWV9KTtcbiAgc2VsZWN0ZWRGaWVsZE5hbWVzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIHByaXZhdGUgX2ZpZWxkczogQWpmRmllbGRbXSA9IFtdO1xuICBwcml2YXRlIF9maWVsZHNTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfc3RyaW5nSWRlbnRpZmllclN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IEFqZkZvcm1CdWlsZGVyU2VydmljZSkge1xuICAgIHRoaXMuZmllbGRzJCA9IF9zZXJ2aWNlLmZsYXRGaWVsZHMucGlwZShcbiAgICAgIG1hcChmaWVsZHMgPT5cbiAgICAgICAgZmllbGRzXG4gICAgICAgICAgLmZpbHRlcihmID0+IGYubmFtZS5sZW5ndGggPiAwKVxuICAgICAgICAgIC5zb3J0KChmMSwgZjIpID0+IChmMS5sYWJlbCB8fCBmMS5uYW1lKS5sb2NhbGVDb21wYXJlKGYyLmxhYmVsIHx8IGYyLm5hbWUpKSxcbiAgICAgICksXG4gICAgICBzaGFyZVJlcGxheSgxKSxcbiAgICApO1xuICAgIHRoaXMuX2ZpZWxkc1N1YiA9IHRoaXMuZmllbGRzJC5zdWJzY3JpYmUoZmllbGRzID0+IHtcbiAgICAgIHRoaXMuX2ZpZWxkcyA9IGZpZWxkcztcbiAgICB9KTtcbiAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyU3ViID0gX3NlcnZpY2Uuc3RyaW5nSWRlbnRpZmllci5zdWJzY3JpYmUoaWRlbnRpZmllciA9PiB7XG4gICAgICB0aGlzLnNlbGVjdGVkRmllbGROYW1lcyA9IGlkZW50aWZpZXJcbiAgICAgICAgLm1hcChlbnRyeSA9PiBlbnRyeS52YWx1ZVswXSlcbiAgICAgICAgLmZpbHRlcigobmFtZSk6IG5hbWUgaXMgc3RyaW5nID0+IG5hbWUgIT0gbnVsbCk7XG4gICAgfSk7XG4gICAgdGhpcy5maWx0ZXJlZEZpZWxkcyQgPSB0aGlzLnNlYXJjaEZpbHRlckN0cmwudmFsdWVDaGFuZ2VzLnBpcGUoXG4gICAgICBkZWJvdW5jZVRpbWUoMTUwKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICBzdGFydFdpdGgoJycpLFxuICAgICAgbWFwKHNlYXJjaCA9PiB7XG4gICAgICAgIGNvbnN0IGZpZWxkcyA9IHRoaXMuX2ZpZWxkcztcbiAgICAgICAgaWYgKCFzZWFyY2gpIHtcbiAgICAgICAgICByZXR1cm4gZmllbGRzO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxvd2VyU2VhcmNoID0gc2VhcmNoLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiBmaWVsZHMuZmlsdGVyKGYgPT4gKGYubGFiZWwgfHwgZi5uYW1lKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGxvd2VyU2VhcmNoKSk7XG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fZmllbGRzU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fc3RyaW5nSWRlbnRpZmllclN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgc2F2ZVN0cmluZ0lkZW50aWZpZXIoKTogdm9pZCB7XG4gICAgY29uc3QgaWRlbnRpZmllcjogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJbXSA9IHRoaXMuc2VsZWN0ZWRGaWVsZE5hbWVzXG4gICAgICAubWFwKG5hbWUgPT4gdGhpcy5fZmllbGRzLmZpbmQoZiA9PiBmLm5hbWUgPT09IG5hbWUpKVxuICAgICAgLmZpbHRlcigoZik6IGYgaXMgQWpmRmllbGQgPT4gZiAhPSBudWxsKVxuICAgICAgLm1hcChmID0+ICh7bGFiZWw6IGYubGFiZWwgfHwgZi5uYW1lLCB2YWx1ZTogW2YubmFtZV19KSk7XG4gICAgdGhpcy5fc2VydmljZS5zYXZlU3RyaW5nSWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgfVxufVxuIiwiPGgzIG1hdERpYWxvZ1RpdGxlPnt7J0RlZmF1bHQgY29sdW1ucyd8dHJhbnNsb2NvfX08L2gzPlxuPG1hdC1kaWFsb2ctY29udGVudD5cbiAgPHA+e3snU2VsZWN0IHRoZSBmaWVsZHMgdGhhdCB3aWxsIGJlIHNob3duIGFzIGNvbHVtbnMgaW4gdGhlIGZvcm0gbGlzdCBwYWdlJ3x0cmFuc2xvY299fTwvcD5cbiAgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiYWpmLXN0cmluZy1pZGVudGlmaWVyLXNlbGVjdFwiPlxuICAgIDxtYXQtc2VsZWN0IG11bHRpcGxlIFsobmdNb2RlbCldPVwic2VsZWN0ZWRGaWVsZE5hbWVzXCI+XG4gICAgICA8bWF0LW9wdGlvbj5cbiAgICAgICAgPG5neC1tYXQtc2VsZWN0LXNlYXJjaFxuICAgICAgICAgIFtmb3JtQ29udHJvbF09XCJzZWFyY2hGaWx0ZXJDdHJsXCJcbiAgICAgICAgICBbcGxhY2Vob2xkZXJMYWJlbF09XCInU2VhcmNoJ3x0cmFuc2xvY29cIlxuICAgICAgICAgIFtub0VudHJpZXNGb3VuZExhYmVsXT1cIidOb3RoaW5nIGZvdW5kJ3x0cmFuc2xvY29cIlxuICAgICAgICAgIFtlbmFibGVDbGVhck9uRXNjYXBlUHJlc3NlZF09XCJ0cnVlXCI+XG4gICAgICAgIDwvbmd4LW1hdC1zZWxlY3Qtc2VhcmNoPlxuICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IGZpZWxkIG9mIGZpbHRlcmVkRmllbGRzJCB8IGFzeW5jXCIgW3ZhbHVlXT1cImZpZWxkLm5hbWVcIj5cbiAgICAgICAge3tmaWVsZC5sYWJlbCB8fCBmaWVsZC5uYW1lfX1cbiAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICA8L21hdC1zZWxlY3Q+XG4gIDwvbWF0LWZvcm0tZmllbGQ+XG48L21hdC1kaWFsb2ctY29udGVudD5cbjxtYXQtZGlhbG9nLWFjdGlvbnM+XG4gIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gY29sb3I9XCJ3YXJuXCIgbWF0RGlhbG9nQ2xvc2U+XG4gICAge3snQ2xvc2UnfHRyYW5zbG9jb319XG4gIDwvYnV0dG9uPlxuICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uIGNvbG9yPVwicHJpbWFyeVwiIG1hdERpYWxvZ0Nsb3NlIChjbGljayk9XCJzYXZlU3RyaW5nSWRlbnRpZmllcigpXCI+XG4gICAge3snU2F2ZSd8dHJhbnNsb2NvfX1cbiAgPC9idXR0b24+XG48L21hdC1kaWFsb2ctYWN0aW9ucz5cbiJdfQ==