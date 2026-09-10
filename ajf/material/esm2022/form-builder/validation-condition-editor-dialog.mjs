import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { map } from 'rxjs/operators';
import { AjfFbConditionEditor } from './condition-editor';
import * as i0 from "@angular/core";
import * as i1 from "./form-builder-service";
import * as i2 from "@angular/material/dialog";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "@angular/material/button";
import * as i6 from "@angular/material/form-field";
import * as i7 from "@angular/material/input";
import * as i8 from "./condition-editor";
import * as i9 from "@ngneat/transloco";
function AjfFbValidationConditionEditorDialog_ajf_condition_editor_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-condition-editor", 4);
} if (rf & 2) {
    const curFields_r1 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("fields", curFields_r1)("condition", ctx_r1.condition);
} }
export class AjfFbValidationConditionEditorDialog {
    get fields() {
        return this._fields;
    }
    constructor(service, dialogRef) {
        this.dialogRef = dialogRef;
        this.condition = '';
        this.errorMessage = '';
        this._fields = service.flatFields.pipe(map((fields) => fields.sort((f1, f2) => f1.name.localeCompare(f2.name))));
    }
    saveCondition() {
        if (this.editor == null) {
            return;
        }
        const newValue = this.editor.formulaEditorControl.value;
        this.dialogRef.close({ condition: newValue, errorMessage: this.errorMessage });
    }
    closeDialog() {
        this.dialogRef.close(this.editor.formulaEditorControl.value);
    }
    static { this.ɵfac = function AjfFbValidationConditionEditorDialog_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFbValidationConditionEditorDialog)(i0.ɵɵdirectiveInject(i1.AjfFormBuilderService), i0.ɵɵdirectiveInject(i2.MatDialogRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFbValidationConditionEditorDialog, selectors: [["ajf-fb-validation-condition-editor-dialog"]], viewQuery: function AjfFbValidationConditionEditorDialog_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(AjfFbConditionEditor, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.editor = _t.first);
        } }, decls: 16, vars: 16, consts: [["matDialogTitle", ""], ["matInput", "", 3, "ngModelChange", "ngModel", "placeholder"], [3, "fields", "condition", 4, "ngIf"], ["mat-button", "", 3, "click"], [3, "fields", "condition"]], template: function AjfFbValidationConditionEditorDialog_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "h3", 0);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "mat-dialog-content")(4, "mat-form-field")(5, "input", 1);
            i0.ɵɵpipe(6, "transloco");
            i0.ɵɵtwoWayListener("ngModelChange", function AjfFbValidationConditionEditorDialog_Template_input_ngModelChange_5_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.errorMessage, $event) || (ctx.errorMessage = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(7, AjfFbValidationConditionEditorDialog_ajf_condition_editor_7_Template, 1, 2, "ajf-condition-editor", 2);
            i0.ɵɵpipe(8, "async");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "mat-dialog-actions")(10, "button", 3);
            i0.ɵɵlistener("click", function AjfFbValidationConditionEditorDialog_Template_button_click_10_listener() { return ctx.saveCondition(); });
            i0.ɵɵtext(11);
            i0.ɵɵpipe(12, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "button", 3);
            i0.ɵɵlistener("click", function AjfFbValidationConditionEditorDialog_Template_button_click_13_listener() { return ctx.closeDialog(); });
            i0.ɵɵtext(14);
            i0.ɵɵpipe(15, "transloco");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 6, "Edit condition"));
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.errorMessage);
            i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(6, 8, "Error message"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(8, 10, ctx.fields));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 12, "Save"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 14, "Close"));
        } }, dependencies: [i3.NgIf, i4.DefaultValueAccessor, i4.NgControlStatus, i4.NgModel, i5.MatButton, i2.MatDialogTitle, i2.MatDialogActions, i2.MatDialogContent, i6.MatFormField, i7.MatInput, i8.AjfFbConditionEditor, i3.AsyncPipe, i9.TranslocoPipe], styles: ["ajf-fb-validation-condition-editor-dialog .mat-mdc-dialog-content{overflow:visible}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFbValidationConditionEditorDialog, [{
        type: Component,
        args: [{ selector: 'ajf-fb-validation-condition-editor-dialog', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<h3 matDialogTitle>{{'Edit condition'|transloco}}</h3>\n<mat-dialog-content>\n  <mat-form-field>\n    <input\n      matInput\n      [(ngModel)]=\"errorMessage\"\n      [placeholder]=\"'Error message'|transloco\"\n    />\n  </mat-form-field>\n  <ajf-condition-editor\n    *ngIf=\"fields|async as curFields\"\n    [fields]=\"curFields!\"\n    [condition]=\"condition\"\n  ></ajf-condition-editor>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button (click)=\"saveCondition()\">{{'Save'|transloco}}</button>\n  <button mat-button (click)=\"closeDialog()\">{{'Close'|transloco}}</button>\n</mat-dialog-actions>\n", styles: ["ajf-fb-validation-condition-editor-dialog .mat-mdc-dialog-content{overflow:visible}\n"] }]
    }], () => [{ type: i1.AjfFormBuilderService }, { type: i2.MatDialogRef }], { editor: [{
            type: ViewChild,
            args: [AjfFbConditionEditor, { static: false }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFbValidationConditionEditorDialog, { className: "AjfFbValidationConditionEditorDialog", filePath: "validation-condition-editor-dialog.ts", lineNumber: 39 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi1jb25kaXRpb24tZWRpdG9yLWRpYWxvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9zcmMvdmFsaWRhdGlvbi1jb25kaXRpb24tZWRpdG9yLWRpYWxvZy50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9zcmMvdmFsaWRhdGlvbi1jb25kaXRpb24tZWRpdG9yLWRpYWxvZy5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVCQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUcvRixPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFbkMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7Ozs7Ozs7Ozs7OztJQ25CdEQsMENBSXdCOzs7O0lBRHRCLEFBREEscUNBQXFCLCtCQUNFOztBRDBCM0IsTUFBTSxPQUFPLG9DQUFvQztJQUkvQyxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUtELFlBQ0UsT0FBOEIsRUFDdkIsU0FBNkQ7UUFBN0QsY0FBUyxHQUFULFNBQVMsQ0FBb0Q7UUFMdEUsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUN2QixpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQU14QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUNwQyxHQUFHLENBQUMsQ0FBQyxNQUFrQixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDckYsQ0FBQztJQUNKLENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3hCLE9BQU87UUFDVCxDQUFDO1FBQ0QsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUM7UUFDeEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFDLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0QsQ0FBQztxSUE5QlUsb0NBQW9DO29FQUFwQyxvQ0FBb0M7MkJBQ3BDLG9CQUFvQjs7Ozs7WUN2Q2pDLDZCQUFtQjtZQUFBLFlBQThCOztZQUFBLGlCQUFLO1lBR2xELEFBREYsQUFERiwwQ0FBb0IscUJBQ0YsZUFLWjs7WUFGQSxzT0FBMEI7WUFHOUIsQUFMRSxpQkFJRSxFQUNhO1lBQ2pCLHVIQUlDOztZQUNILGlCQUFxQjtZQUVuQixBQURGLDBDQUFvQixpQkFDMkI7WUFBMUIsa0hBQVMsbUJBQWUsSUFBQztZQUFDLGFBQW9COztZQUFBLGlCQUFTO1lBQzFFLGtDQUEyQztZQUF4QixrSEFBUyxpQkFBYSxJQUFDO1lBQUMsYUFBcUI7O1lBQ2xFLEFBRGtFLGlCQUFTLEVBQ3REOztZQWxCRixjQUE4QjtZQUE5Qiw0REFBOEI7WUFLM0MsZUFBMEI7WUFBMUIsZ0RBQTBCO1lBQzFCLG1FQUF5QztZQUkxQyxlQUFtQjtZQUFuQix3REFBbUI7WUFNdUIsZUFBb0I7WUFBcEIsb0RBQW9CO1lBQ3RCLGVBQXFCO1lBQXJCLHFEQUFxQjs7O2lGRHFCckQsb0NBQW9DO2NBUGhELFNBQVM7MkJBQ0UsMkNBQTJDLGlCQUd0QyxpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNO2lGQUdHLE1BQU07a0JBQXZELFNBQVM7bUJBQUMsb0JBQW9CLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDOztrRkFEckMsb0NBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZpZWxkfSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRmJDb25kaXRpb25FZGl0b3J9IGZyb20gJy4vY29uZGl0aW9uLWVkaXRvcic7XG5pbXBvcnQge0FqZkZvcm1CdWlsZGVyU2VydmljZX0gZnJvbSAnLi9mb3JtLWJ1aWxkZXItc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1mYi12YWxpZGF0aW9uLWNvbmRpdGlvbi1lZGl0b3ItZGlhbG9nJyxcbiAgdGVtcGxhdGVVcmw6ICd2YWxpZGF0aW9uLWNvbmRpdGlvbi1lZGl0b3ItZGlhbG9nLmh0bWwnLFxuICBzdHlsZVVybHM6IFsndmFsaWRhdGlvbi1jb25kaXRpb24tZWRpdG9yLWRpYWxvZy5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBBamZGYlZhbGlkYXRpb25Db25kaXRpb25FZGl0b3JEaWFsb2cge1xuICBAVmlld0NoaWxkKEFqZkZiQ29uZGl0aW9uRWRpdG9yLCB7c3RhdGljOiBmYWxzZX0pIGVkaXRvciE6IEFqZkZiQ29uZGl0aW9uRWRpdG9yO1xuXG4gIHByaXZhdGUgX2ZpZWxkczogT2JzZXJ2YWJsZTxBamZGaWVsZFtdPjtcbiAgZ2V0IGZpZWxkcygpOiBPYnNlcnZhYmxlPEFqZkZpZWxkW10+IHtcbiAgICByZXR1cm4gdGhpcy5fZmllbGRzO1xuICB9XG5cbiAgY29uZGl0aW9uOiBzdHJpbmcgPSAnJztcbiAgZXJyb3JNZXNzYWdlOiBzdHJpbmcgPSAnJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBzZXJ2aWNlOiBBamZGb3JtQnVpbGRlclNlcnZpY2UsXG4gICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPEFqZkZiVmFsaWRhdGlvbkNvbmRpdGlvbkVkaXRvckRpYWxvZz4sXG4gICkge1xuICAgIHRoaXMuX2ZpZWxkcyA9IHNlcnZpY2UuZmxhdEZpZWxkcy5waXBlKFxuICAgICAgbWFwKChmaWVsZHM6IEFqZkZpZWxkW10pID0+IGZpZWxkcy5zb3J0KChmMSwgZjIpID0+IGYxLm5hbWUubG9jYWxlQ29tcGFyZShmMi5uYW1lKSkpLFxuICAgICk7XG4gIH1cblxuICBzYXZlQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmVkaXRvciA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5lZGl0b3IuZm9ybXVsYUVkaXRvckNvbnRyb2wudmFsdWU7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2Uoe2NvbmRpdGlvbjogbmV3VmFsdWUsIGVycm9yTWVzc2FnZTogdGhpcy5lcnJvck1lc3NhZ2V9KTtcbiAgfVxuXG4gIGNsb3NlRGlhbG9nKCk6IHZvaWQge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHRoaXMuZWRpdG9yLmZvcm11bGFFZGl0b3JDb250cm9sLnZhbHVlKTtcbiAgfVxufVxuIiwiPGgzIG1hdERpYWxvZ1RpdGxlPnt7J0VkaXQgY29uZGl0aW9uJ3x0cmFuc2xvY299fTwvaDM+XG48bWF0LWRpYWxvZy1jb250ZW50PlxuICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgPGlucHV0XG4gICAgICBtYXRJbnB1dFxuICAgICAgWyhuZ01vZGVsKV09XCJlcnJvck1lc3NhZ2VcIlxuICAgICAgW3BsYWNlaG9sZGVyXT1cIidFcnJvciBtZXNzYWdlJ3x0cmFuc2xvY29cIlxuICAgIC8+XG4gIDwvbWF0LWZvcm0tZmllbGQ+XG4gIDxhamYtY29uZGl0aW9uLWVkaXRvclxuICAgICpuZ0lmPVwiZmllbGRzfGFzeW5jIGFzIGN1ckZpZWxkc1wiXG4gICAgW2ZpZWxkc109XCJjdXJGaWVsZHMhXCJcbiAgICBbY29uZGl0aW9uXT1cImNvbmRpdGlvblwiXG4gID48L2FqZi1jb25kaXRpb24tZWRpdG9yPlxuPC9tYXQtZGlhbG9nLWNvbnRlbnQ+XG48bWF0LWRpYWxvZy1hY3Rpb25zPlxuICA8YnV0dG9uIG1hdC1idXR0b24gKGNsaWNrKT1cInNhdmVDb25kaXRpb24oKVwiPnt7J1NhdmUnfHRyYW5zbG9jb319PC9idXR0b24+XG4gIDxidXR0b24gbWF0LWJ1dHRvbiAoY2xpY2spPVwiY2xvc2VEaWFsb2coKVwiPnt7J0Nsb3NlJ3x0cmFuc2xvY299fTwvYnV0dG9uPlxuPC9tYXQtZGlhbG9nLWFjdGlvbnM+XG4iXX0=