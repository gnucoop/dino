import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/core/forms";
import * as i2 from "@ajf/material/node-icon";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "@angular/material/form-field";
import * as i6 from "@angular/material/input";
import * as i7 from "@angular/material/list";
import * as i8 from "@angular/material/tooltip";
function AjfFbConditionEditor_ng_container_5_mat_nav_list_1_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 8);
    i0.ɵɵlistener("click", function AjfFbConditionEditor_ng_container_5_mat_nav_list_1_a_1_Template_a_click_0_listener() { const field_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.insertVariable(field_r2.name)); });
    i0.ɵɵelement(1, "ajf-node-icon", 9);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const field_r2 = ctx.$implicit;
    i0.ɵɵproperty("matTooltip", field_r2.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("node", field_r2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", field_r2.name, " ");
} }
function AjfFbConditionEditor_ng_container_5_mat_nav_list_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-nav-list", 6);
    i0.ɵɵtemplate(1, AjfFbConditionEditor_ng_container_5_mat_nav_list_1_a_1_Template, 3, 3, "a", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const curFields_r4 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", curFields_r4);
} }
function AjfFbConditionEditor_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFbConditionEditor_ng_container_5_mat_nav_list_1_Template, 2, 1, "mat-nav-list", 5);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const curFields_r4 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", curFields_r4.length > 0);
} }
export class AjfFbConditionEditor {
    get fields() {
        return this._fields;
    }
    set fields(fields) {
        this._fields = fields;
    }
    constructor(_) {
        this._fields = [];
        this.condition = '';
        this.formulaEditorControl = new FormControl(this.condition);
    }
    ngAfterViewInit() {
        this.formulaEditorControl.setValue(this.condition);
    }
    insertVariable(variable) {
        const currValue = this.formulaEditorControl.value != null ? this.formulaEditorControl.value : '';
        const newValue = currValue + variable;
        this.formulaEditorControl.setValue(newValue);
    }
    static { this.ɵfac = function AjfFbConditionEditor_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFbConditionEditor)(i0.ɵɵdirectiveInject(i1.AjfValidationService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFbConditionEditor, selectors: [["ajf-condition-editor"]], inputs: { fields: "fields", condition: "condition" }, decls: 6, vars: 2, consts: [[1, "ajf-editor"], [1, "ajf-formula-editor"], ["matInput", "", "type", "text", 3, "formControl"], [1, "ajf-editor-panel"], [4, "ngIf"], ["dense", "", 4, "ngIf"], ["dense", ""], ["mat-list-item", "", 3, "matTooltip", "click", 4, "ngFor", "ngForOf"], ["mat-list-item", "", 3, "click", "matTooltip"], [3, "node"]], template: function AjfFbConditionEditor_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "mat-form-field", 1)(2, "code");
            i0.ɵɵelement(3, "input", 2);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(4, "div", 3);
            i0.ɵɵtemplate(5, AjfFbConditionEditor_ng_container_5_Template, 2, 1, "ng-container", 4);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("formControl", ctx.formulaEditorControl);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.fields);
        } }, dependencies: [i2.AjfNodeIcon, i3.NgForOf, i3.NgIf, i4.DefaultValueAccessor, i4.NgControlStatus, i5.MatFormField, i6.MatInput, i7.MatNavList, i7.MatListItem, i8.MatTooltip, i4.FormControlDirective], styles: ["ajf-condition-editor{display:flex;flex-direction:row;align-items:stretch;max-height:512px}ajf-condition-editor .ajf-editor{flex:.75 0 auto;display:flex;flex-direction:row;align-items:stretch}ajf-condition-editor .ajf-editor-panel{flex:.25 0 auto;overflow-y:auto}ajf-condition-editor .ajf-editor-panel .mat-mdc-nav-list{max-height:30vh;overflow-y:auto}ajf-condition-editor .ajf-formula-editor{min-width:40vw}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFbConditionEditor, [{
        type: Component,
        args: [{ selector: 'ajf-condition-editor', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"ajf-editor\">\n  <mat-form-field class=\"ajf-formula-editor\">\n    <code><input matInput type=\"text\" [formControl]=\"formulaEditorControl\" /></code>\n  </mat-form-field>\n</div>\n<div class=\"ajf-editor-panel\">\n  <ng-container *ngIf=\"fields as curFields\">\n    <mat-nav-list dense *ngIf=\"curFields!.length > 0\">\n      <a\n        mat-list-item\n        (click)=\"insertVariable(field.name)\"\n        [matTooltip]=\"field.label\"\n        *ngFor=\"let field of curFields!\"\n      >\n        <ajf-node-icon [node]=\"field\"></ajf-node-icon>\n        {{ field.name }}\n      </a>\n    </mat-nav-list>\n  </ng-container>\n</div>\n", styles: ["ajf-condition-editor{display:flex;flex-direction:row;align-items:stretch;max-height:512px}ajf-condition-editor .ajf-editor{flex:.75 0 auto;display:flex;flex-direction:row;align-items:stretch}ajf-condition-editor .ajf-editor-panel{flex:.25 0 auto;overflow-y:auto}ajf-condition-editor .ajf-editor-panel .mat-mdc-nav-list{max-height:30vh;overflow-y:auto}ajf-condition-editor .ajf-formula-editor{min-width:40vw}\n"] }]
    }], () => [{ type: i1.AjfValidationService }], { fields: [{
            type: Input
        }], condition: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFbConditionEditor, { className: "AjfFbConditionEditor", filePath: "condition-editor.ts", lineNumber: 40 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uLWVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9zcmMvY29uZGl0aW9uLWVkaXRvci50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9zcmMvZmItY29uZGl0aW9uLWVkaXRvci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVCQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxLQUFLLEVBQ0wsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7Ozs7O0lDdEJyQyw0QkFLQztJQUhDLG1PQUFTLG9DQUEwQixLQUFDO0lBSXBDLG1DQUE4QztJQUM5QyxZQUNGO0lBQUEsaUJBQUk7OztJQUxGLDJDQUEwQjtJQUdYLGNBQWM7SUFBZCwrQkFBYztJQUM3QixjQUNGO0lBREUsOENBQ0Y7OztJQVRGLHVDQUFrRDtJQUNoRCwrRkFLQztJQUlILGlCQUFlOzs7SUFMTyxjQUFhO0lBQWIsc0NBQWE7OztJQU5yQyw2QkFBMEM7SUFDeEMsc0dBQWtEOzs7O0lBQTdCLGNBQTJCO0lBQTNCLDhDQUEyQjs7QURnQ3BELE1BQU0sT0FBTyxvQkFBb0I7SUFFL0IsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUNJLE1BQU0sQ0FBQyxNQUFrQjtRQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUN4QixDQUFDO0lBTUQsWUFBWSxDQUF1QjtRQWQzQixZQUFPLEdBQWUsRUFBRSxDQUFDO1FBVXhCLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFFaEMseUJBQW9CLEdBQUcsSUFBSSxXQUFXLENBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRXpCLENBQUM7SUFFdkMsZUFBZTtRQUNiLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxjQUFjLENBQUMsUUFBZ0I7UUFDN0IsTUFBTSxTQUFTLEdBQ2IsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNqRixNQUFNLFFBQVEsR0FBVyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzlDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0MsQ0FBQztxSEExQlUsb0JBQW9CO29FQUFwQixvQkFBb0I7WUNyQzdCLEFBREYsQUFERiw4QkFBd0Isd0JBQ3FCLFdBQ25DO1lBQUEsMkJBQW1FO1lBRTdFLEFBREUsQUFEMkUsaUJBQU8sRUFDakUsRUFDYjtZQUNOLDhCQUE4QjtZQUM1Qix1RkFBMEM7WUFhNUMsaUJBQU07O1lBakJnQyxlQUFvQztZQUFwQyxzREFBb0M7WUFJekQsZUFBYTtZQUFiLGlDQUFhOzs7aUZEaUNqQixvQkFBb0I7Y0FQaEMsU0FBUzsyQkFDRSxzQkFBc0IsbUJBR2YsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTtxREFTakMsTUFBTTtrQkFEVCxLQUFLO1lBS0csU0FBUztrQkFBakIsS0FBSzs7a0ZBWEssb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZpZWxkLCBBamZWYWxpZGF0aW9uU2VydmljZX0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1Db250cm9sfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1jb25kaXRpb24tZWRpdG9yJyxcbiAgdGVtcGxhdGVVcmw6ICdmYi1jb25kaXRpb24tZWRpdG9yLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnZmItY29uZGl0aW9uLWVkaXRvci5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZGYkNvbmRpdGlvbkVkaXRvciBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBwcml2YXRlIF9maWVsZHM6IEFqZkZpZWxkW10gPSBbXTtcbiAgZ2V0IGZpZWxkcygpOiBBamZGaWVsZFtdIHtcbiAgICByZXR1cm4gdGhpcy5fZmllbGRzO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGZpZWxkcyhmaWVsZHM6IEFqZkZpZWxkW10pIHtcbiAgICB0aGlzLl9maWVsZHMgPSBmaWVsZHM7XG4gIH1cblxuICBASW5wdXQoKSBjb25kaXRpb246IHN0cmluZyA9ICcnO1xuXG4gIGZvcm11bGFFZGl0b3JDb250cm9sID0gbmV3IEZvcm1Db250cm9sPHN0cmluZz4odGhpcy5jb25kaXRpb24pO1xuXG4gIGNvbnN0cnVjdG9yKF86IEFqZlZhbGlkYXRpb25TZXJ2aWNlKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmZvcm11bGFFZGl0b3JDb250cm9sLnNldFZhbHVlKHRoaXMuY29uZGl0aW9uKTtcbiAgfVxuXG4gIGluc2VydFZhcmlhYmxlKHZhcmlhYmxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyVmFsdWUgPVxuICAgICAgdGhpcy5mb3JtdWxhRWRpdG9yQ29udHJvbC52YWx1ZSAhPSBudWxsID8gdGhpcy5mb3JtdWxhRWRpdG9yQ29udHJvbC52YWx1ZSA6ICcnO1xuICAgIGNvbnN0IG5ld1ZhbHVlOiBzdHJpbmcgPSBjdXJyVmFsdWUgKyB2YXJpYWJsZTtcbiAgICB0aGlzLmZvcm11bGFFZGl0b3JDb250cm9sLnNldFZhbHVlKG5ld1ZhbHVlKTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImFqZi1lZGl0b3JcIj5cbiAgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiYWpmLWZvcm11bGEtZWRpdG9yXCI+XG4gICAgPGNvZGU+PGlucHV0IG1hdElucHV0IHR5cGU9XCJ0ZXh0XCIgW2Zvcm1Db250cm9sXT1cImZvcm11bGFFZGl0b3JDb250cm9sXCIgLz48L2NvZGU+XG4gIDwvbWF0LWZvcm0tZmllbGQ+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJhamYtZWRpdG9yLXBhbmVsXCI+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJmaWVsZHMgYXMgY3VyRmllbGRzXCI+XG4gICAgPG1hdC1uYXYtbGlzdCBkZW5zZSAqbmdJZj1cImN1ckZpZWxkcyEubGVuZ3RoID4gMFwiPlxuICAgICAgPGFcbiAgICAgICAgbWF0LWxpc3QtaXRlbVxuICAgICAgICAoY2xpY2spPVwiaW5zZXJ0VmFyaWFibGUoZmllbGQubmFtZSlcIlxuICAgICAgICBbbWF0VG9vbHRpcF09XCJmaWVsZC5sYWJlbFwiXG4gICAgICAgICpuZ0Zvcj1cImxldCBmaWVsZCBvZiBjdXJGaWVsZHMhXCJcbiAgICAgID5cbiAgICAgICAgPGFqZi1ub2RlLWljb24gW25vZGVdPVwiZmllbGRcIj48L2FqZi1ub2RlLWljb24+XG4gICAgICAgIHt7IGZpZWxkLm5hbWUgfX1cbiAgICAgIDwvYT5cbiAgICA8L21hdC1uYXYtbGlzdD5cbiAgPC9uZy1jb250YWluZXI+XG48L2Rpdj5cbiJdfQ==