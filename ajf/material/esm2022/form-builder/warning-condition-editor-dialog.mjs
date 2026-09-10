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
function AjfFbWarningConditionEditorDialog_ajf_condition_editor_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-condition-editor", 4);
} if (rf & 2) {
    const curFields_r1 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("fields", curFields_r1)("condition", ctx_r1.condition);
} }
export class AjfFbWarningConditionEditorDialog {
    get fields() {
        return this._fields;
    }
    constructor(service, dialogRef) {
        this.dialogRef = dialogRef;
        this.condition = '';
        this.warningMessage = '';
        this._fields = service.flatFields.pipe(map((fields) => fields.sort((f1, f2) => f1.name.localeCompare(f2.name))));
    }
    saveCondition() {
        if (this.editor == null) {
            return;
        }
        const newValue = this.editor.formulaEditorControl.value;
        this.dialogRef.close({ condition: newValue, warningMessage: this.warningMessage });
    }
    closeDialog() {
        this.dialogRef.close(this.editor.formulaEditorControl.value);
    }
    static { this.ɵfac = function AjfFbWarningConditionEditorDialog_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFbWarningConditionEditorDialog)(i0.ɵɵdirectiveInject(i1.AjfFormBuilderService), i0.ɵɵdirectiveInject(i2.MatDialogRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFbWarningConditionEditorDialog, selectors: [["ajf-fb-warning-condition-editor-dialog"]], viewQuery: function AjfFbWarningConditionEditorDialog_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(AjfFbConditionEditor, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.editor = _t.first);
        } }, decls: 16, vars: 16, consts: [["matDialogTitle", ""], ["matInput", "", 3, "ngModelChange", "ngModel", "placeholder"], [3, "fields", "condition", 4, "ngIf"], ["mat-button", "", 3, "click"], [3, "fields", "condition"]], template: function AjfFbWarningConditionEditorDialog_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "h3", 0);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "mat-dialog-content")(4, "mat-form-field")(5, "input", 1);
            i0.ɵɵpipe(6, "transloco");
            i0.ɵɵtwoWayListener("ngModelChange", function AjfFbWarningConditionEditorDialog_Template_input_ngModelChange_5_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.warningMessage, $event) || (ctx.warningMessage = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(7, AjfFbWarningConditionEditorDialog_ajf_condition_editor_7_Template, 1, 2, "ajf-condition-editor", 2);
            i0.ɵɵpipe(8, "async");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "mat-dialog-actions")(10, "button", 3);
            i0.ɵɵlistener("click", function AjfFbWarningConditionEditorDialog_Template_button_click_10_listener() { return ctx.saveCondition(); });
            i0.ɵɵtext(11);
            i0.ɵɵpipe(12, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "button", 3);
            i0.ɵɵlistener("click", function AjfFbWarningConditionEditorDialog_Template_button_click_13_listener() { return ctx.closeDialog(); });
            i0.ɵɵtext(14);
            i0.ɵɵpipe(15, "transloco");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 6, "Edit condition"));
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.warningMessage);
            i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(6, 8, "Warning message"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(8, 10, ctx.fields));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 12, "Save"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 14, "Close"));
        } }, dependencies: [i3.NgIf, i4.DefaultValueAccessor, i4.NgControlStatus, i4.NgModel, i5.MatButton, i2.MatDialogTitle, i2.MatDialogActions, i2.MatDialogContent, i6.MatFormField, i7.MatInput, i8.AjfFbConditionEditor, i3.AsyncPipe, i9.TranslocoPipe], styles: ["ajf-fb-warning-condition-editor-dialog .mat-mdc-dialog-content{overflow:visible}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFbWarningConditionEditorDialog, [{
        type: Component,
        args: [{ selector: 'ajf-fb-warning-condition-editor-dialog', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<h3 matDialogTitle>{{'Edit condition'|transloco}}</h3>\n<mat-dialog-content>\n  <mat-form-field>\n    <input\n      matInput\n      [(ngModel)]=\"warningMessage\"\n      [placeholder]=\"'Warning message' | transloco\"\n    />\n  </mat-form-field>\n  <ajf-condition-editor\n    *ngIf=\"fields|async as curFields\"\n    [fields]=\"curFields!\"\n    [condition]=\"condition\"\n  ></ajf-condition-editor>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button (click)=\"saveCondition()\">{{'Save'|transloco}}</button>\n  <button mat-button (click)=\"closeDialog()\">{{'Close'|transloco}}</button>\n</mat-dialog-actions>\n", styles: ["ajf-fb-warning-condition-editor-dialog .mat-mdc-dialog-content{overflow:visible}\n"] }]
    }], () => [{ type: i1.AjfFormBuilderService }, { type: i2.MatDialogRef }], { editor: [{
            type: ViewChild,
            args: [AjfFbConditionEditor, { static: false }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFbWarningConditionEditorDialog, { className: "AjfFbWarningConditionEditorDialog", filePath: "warning-condition-editor-dialog.ts", lineNumber: 39 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FybmluZy1jb25kaXRpb24tZWRpdG9yLWRpYWxvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9zcmMvd2FybmluZy1jb25kaXRpb24tZWRpdG9yLWRpYWxvZy50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9zcmMvd2FybmluZy1jb25kaXRpb24tZWRpdG9yLWRpYWxvZy5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVCQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUcvRixPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFbkMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7Ozs7Ozs7Ozs7OztJQ25CdEQsMENBSXdCOzs7O0lBRHRCLEFBREEscUNBQXFCLCtCQUNFOztBRDBCM0IsTUFBTSxPQUFPLGlDQUFpQztJQUk1QyxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUtELFlBQ0UsT0FBOEIsRUFDdkIsU0FBMEQ7UUFBMUQsY0FBUyxHQUFULFNBQVMsQ0FBaUQ7UUFMbkUsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUN2QixtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQU0xQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUNwQyxHQUFHLENBQUMsQ0FBQyxNQUFrQixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDckYsQ0FBQztJQUNKLENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3hCLE9BQU87UUFDVCxDQUFDO1FBQ0QsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUM7UUFDeEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFDLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0QsQ0FBQztrSUE5QlUsaUNBQWlDO29FQUFqQyxpQ0FBaUM7MkJBQ2pDLG9CQUFvQjs7Ozs7WUN2Q2pDLDZCQUFtQjtZQUFBLFlBQThCOztZQUFBLGlCQUFLO1lBR2xELEFBREYsQUFERiwwQ0FBb0IscUJBQ0YsZUFLWjs7WUFGQSx1T0FBNEI7WUFHaEMsQUFMRSxpQkFJRSxFQUNhO1lBQ2pCLG9IQUlDOztZQUNILGlCQUFxQjtZQUVuQixBQURGLDBDQUFvQixpQkFDMkI7WUFBMUIsK0dBQVMsbUJBQWUsSUFBQztZQUFDLGFBQW9COztZQUFBLGlCQUFTO1lBQzFFLGtDQUEyQztZQUF4QiwrR0FBUyxpQkFBYSxJQUFDO1lBQUMsYUFBcUI7O1lBQ2xFLEFBRGtFLGlCQUFTLEVBQ3REOztZQWxCRixjQUE4QjtZQUE5Qiw0REFBOEI7WUFLM0MsZUFBNEI7WUFBNUIsa0RBQTRCO1lBQzVCLHFFQUE2QztZQUk5QyxlQUFtQjtZQUFuQix3REFBbUI7WUFNdUIsZUFBb0I7WUFBcEIsb0RBQW9CO1lBQ3RCLGVBQXFCO1lBQXJCLHFEQUFxQjs7O2lGRHFCckQsaUNBQWlDO2NBUDdDLFNBQVM7MkJBQ0Usd0NBQXdDLGlCQUduQyxpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNO2lGQUdHLE1BQU07a0JBQXZELFNBQVM7bUJBQUMsb0JBQW9CLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDOztrRkFEckMsaUNBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZpZWxkfSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRmJDb25kaXRpb25FZGl0b3J9IGZyb20gJy4vY29uZGl0aW9uLWVkaXRvcic7XG5pbXBvcnQge0FqZkZvcm1CdWlsZGVyU2VydmljZX0gZnJvbSAnLi9mb3JtLWJ1aWxkZXItc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1mYi13YXJuaW5nLWNvbmRpdGlvbi1lZGl0b3ItZGlhbG9nJyxcbiAgdGVtcGxhdGVVcmw6ICd3YXJuaW5nLWNvbmRpdGlvbi1lZGl0b3ItZGlhbG9nLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnd2FybmluZy1jb25kaXRpb24tZWRpdG9yLWRpYWxvZy5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBBamZGYldhcm5pbmdDb25kaXRpb25FZGl0b3JEaWFsb2cge1xuICBAVmlld0NoaWxkKEFqZkZiQ29uZGl0aW9uRWRpdG9yLCB7c3RhdGljOiBmYWxzZX0pIGVkaXRvciE6IEFqZkZiQ29uZGl0aW9uRWRpdG9yO1xuXG4gIHByaXZhdGUgX2ZpZWxkczogT2JzZXJ2YWJsZTxBamZGaWVsZFtdPjtcbiAgZ2V0IGZpZWxkcygpOiBPYnNlcnZhYmxlPEFqZkZpZWxkW10+IHtcbiAgICByZXR1cm4gdGhpcy5fZmllbGRzO1xuICB9XG5cbiAgY29uZGl0aW9uOiBzdHJpbmcgPSAnJztcbiAgd2FybmluZ01lc3NhZ2U6IHN0cmluZyA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHNlcnZpY2U6IEFqZkZvcm1CdWlsZGVyU2VydmljZSxcbiAgICBwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8QWpmRmJXYXJuaW5nQ29uZGl0aW9uRWRpdG9yRGlhbG9nPixcbiAgKSB7XG4gICAgdGhpcy5fZmllbGRzID0gc2VydmljZS5mbGF0RmllbGRzLnBpcGUoXG4gICAgICBtYXAoKGZpZWxkczogQWpmRmllbGRbXSkgPT4gZmllbGRzLnNvcnQoKGYxLCBmMikgPT4gZjEubmFtZS5sb2NhbGVDb21wYXJlKGYyLm5hbWUpKSksXG4gICAgKTtcbiAgfVxuXG4gIHNhdmVDb25kaXRpb24oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZWRpdG9yID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLmVkaXRvci5mb3JtdWxhRWRpdG9yQ29udHJvbC52YWx1ZTtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh7Y29uZGl0aW9uOiBuZXdWYWx1ZSwgd2FybmluZ01lc3NhZ2U6IHRoaXMud2FybmluZ01lc3NhZ2V9KTtcbiAgfVxuXG4gIGNsb3NlRGlhbG9nKCk6IHZvaWQge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHRoaXMuZWRpdG9yLmZvcm11bGFFZGl0b3JDb250cm9sLnZhbHVlKTtcbiAgfVxufVxuIiwiPGgzIG1hdERpYWxvZ1RpdGxlPnt7J0VkaXQgY29uZGl0aW9uJ3x0cmFuc2xvY299fTwvaDM+XG48bWF0LWRpYWxvZy1jb250ZW50PlxuICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgPGlucHV0XG4gICAgICBtYXRJbnB1dFxuICAgICAgWyhuZ01vZGVsKV09XCJ3YXJuaW5nTWVzc2FnZVwiXG4gICAgICBbcGxhY2Vob2xkZXJdPVwiJ1dhcm5pbmcgbWVzc2FnZScgfCB0cmFuc2xvY29cIlxuICAgIC8+XG4gIDwvbWF0LWZvcm0tZmllbGQ+XG4gIDxhamYtY29uZGl0aW9uLWVkaXRvclxuICAgICpuZ0lmPVwiZmllbGRzfGFzeW5jIGFzIGN1ckZpZWxkc1wiXG4gICAgW2ZpZWxkc109XCJjdXJGaWVsZHMhXCJcbiAgICBbY29uZGl0aW9uXT1cImNvbmRpdGlvblwiXG4gID48L2FqZi1jb25kaXRpb24tZWRpdG9yPlxuPC9tYXQtZGlhbG9nLWNvbnRlbnQ+XG48bWF0LWRpYWxvZy1hY3Rpb25zPlxuICA8YnV0dG9uIG1hdC1idXR0b24gKGNsaWNrKT1cInNhdmVDb25kaXRpb24oKVwiPnt7J1NhdmUnfHRyYW5zbG9jb319PC9idXR0b24+XG4gIDxidXR0b24gbWF0LWJ1dHRvbiAoY2xpY2spPVwiY2xvc2VEaWFsb2coKVwiPnt7J0Nsb3NlJ3x0cmFuc2xvY299fTwvYnV0dG9uPlxuPC9tYXQtZGlhbG9nLWFjdGlvbnM+XG4iXX0=