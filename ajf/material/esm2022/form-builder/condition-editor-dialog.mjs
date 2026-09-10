import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { map } from 'rxjs/operators';
import { AjfFbConditionEditor } from './condition-editor';
import * as i0 from "@angular/core";
import * as i1 from "./form-builder-service";
import * as i2 from "@angular/material/dialog";
import * as i3 from "@angular/common";
import * as i4 from "@angular/material/button";
import * as i5 from "./condition-editor";
import * as i6 from "@ngneat/transloco";
function AjfFbConditionEditorDialog_ajf_condition_editor_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-condition-editor", 3);
} if (rf & 2) {
    const curFields_r1 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("fields", curFields_r1)("condition", ctx_r1.condition);
} }
export class AjfFbConditionEditorDialog {
    get fields() {
        return this._fields;
    }
    constructor(service, dialogRef) {
        this.dialogRef = dialogRef;
        this.condition = '';
        this._fields = service.flatFields.pipe(map((fields) => fields.sort((f1, f2) => f1.name.localeCompare(f2.name))));
    }
    saveCondition() {
        if (this.editor == null) {
            return;
        }
        const newValue = this.editor.formulaEditorControl.value;
        this.dialogRef.close(newValue);
    }
    closeDialog() {
        this.dialogRef.close(this.editor.formulaEditorControl.value);
    }
    static { this.ɵfac = function AjfFbConditionEditorDialog_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFbConditionEditorDialog)(i0.ɵɵdirectiveInject(i1.AjfFormBuilderService), i0.ɵɵdirectiveInject(i2.MatDialogRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFbConditionEditorDialog, selectors: [["ajf-condition-editor-dialog"]], viewQuery: function AjfFbConditionEditorDialog_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(AjfFbConditionEditor, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.editor = _t.first);
        } }, decls: 13, vars: 12, consts: [["matDialogTitle", ""], [3, "fields", "condition", 4, "ngIf"], ["mat-button", "", 3, "click"], [3, "fields", "condition"]], template: function AjfFbConditionEditorDialog_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "h3", 0);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "mat-dialog-content");
            i0.ɵɵtemplate(4, AjfFbConditionEditorDialog_ajf_condition_editor_4_Template, 1, 2, "ajf-condition-editor", 1);
            i0.ɵɵpipe(5, "async");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "mat-dialog-actions")(7, "button", 2);
            i0.ɵɵlistener("click", function AjfFbConditionEditorDialog_Template_button_click_7_listener() { return ctx.saveCondition(); });
            i0.ɵɵtext(8);
            i0.ɵɵpipe(9, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "button", 2);
            i0.ɵɵlistener("click", function AjfFbConditionEditorDialog_Template_button_click_10_listener() { return ctx.closeDialog(); });
            i0.ɵɵtext(11);
            i0.ɵɵpipe(12, "transloco");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 4, "Edit condition"));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(5, 6, ctx.fields));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 8, "Save"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 10, "Close"));
        } }, dependencies: [i3.NgIf, i4.MatButton, i2.MatDialogTitle, i2.MatDialogActions, i2.MatDialogContent, i5.AjfFbConditionEditor, i3.AsyncPipe, i6.TranslocoPipe], styles: ["ajf-condition-editor-dialog .mat-mdc-dialog-content{overflow:visible}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFbConditionEditorDialog, [{
        type: Component,
        args: [{ selector: 'ajf-condition-editor-dialog', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<h3 matDialogTitle>{{'Edit condition'|transloco}}</h3>\n<mat-dialog-content>\n  <ajf-condition-editor\n    *ngIf=\"fields|async as curFields\"\n    [fields]=\"curFields!\"\n    [condition]=\"condition\"\n  ></ajf-condition-editor>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button (click)=\"saveCondition()\">{{'Save'|transloco}}</button>\n  <button mat-button (click)=\"closeDialog()\">{{'Close'|transloco}}</button>\n</mat-dialog-actions>\n", styles: ["ajf-condition-editor-dialog .mat-mdc-dialog-content{overflow:visible}\n"] }]
    }], () => [{ type: i1.AjfFormBuilderService }, { type: i2.MatDialogRef }], { editor: [{
            type: ViewChild,
            args: [AjfFbConditionEditor, { static: false }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFbConditionEditorDialog, { className: "AjfFbConditionEditorDialog", filePath: "condition-editor-dialog.ts", lineNumber: 39 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uLWVkaXRvci1kaWFsb2cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvc3JjL2NvbmRpdGlvbi1lZGl0b3ItZGlhbG9nLnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL3NyYy9jb25kaXRpb24tZWRpdG9yLWRpYWxvZy5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVCQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUcvRixPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFbkMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7Ozs7Ozs7OztJQzFCdEQsMENBSXdCOzs7O0lBRHRCLEFBREEscUNBQXFCLCtCQUNFOztBRGlDM0IsTUFBTSxPQUFPLDBCQUEwQjtJQUlyQyxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUlELFlBQ0UsT0FBOEIsRUFDdkIsU0FBbUQ7UUFBbkQsY0FBUyxHQUFULFNBQVMsQ0FBMEM7UUFKNUQsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQU1yQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUNwQyxHQUFHLENBQUMsQ0FBQyxNQUFrQixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDckYsQ0FBQztJQUNKLENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3hCLE9BQU87UUFDVCxDQUFDO1FBQ0QsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUM7UUFDeEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9ELENBQUM7MkhBN0JVLDBCQUEwQjtvRUFBMUIsMEJBQTBCOzJCQUMxQixvQkFBb0I7Ozs7O1lDdkNqQyw2QkFBbUI7WUFBQSxZQUE4Qjs7WUFBQSxpQkFBSztZQUN0RCwwQ0FBb0I7WUFDbEIsNkdBSUM7O1lBQ0gsaUJBQXFCO1lBRW5CLEFBREYsMENBQW9CLGdCQUMyQjtZQUExQix1R0FBUyxtQkFBZSxJQUFDO1lBQUMsWUFBb0I7O1lBQUEsaUJBQVM7WUFDMUUsa0NBQTJDO1lBQXhCLHdHQUFTLGlCQUFhLElBQUM7WUFBQyxhQUFxQjs7WUFDbEUsQUFEa0UsaUJBQVMsRUFDdEQ7O1lBWEYsY0FBOEI7WUFBOUIsNERBQThCO1lBRzVDLGVBQW1CO1lBQW5CLHVEQUFtQjtZQU11QixlQUFvQjtZQUFwQixrREFBb0I7WUFDdEIsZUFBcUI7WUFBckIscURBQXFCOzs7aUZENEJyRCwwQkFBMEI7Y0FQdEMsU0FBUzsyQkFDRSw2QkFBNkIsaUJBR3hCLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU07aUZBR0csTUFBTTtrQkFBdkQsU0FBUzttQkFBQyxvQkFBb0IsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7O2tGQURyQywwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRmllbGR9IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXREaWFsb2dSZWZ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGYkNvbmRpdGlvbkVkaXRvcn0gZnJvbSAnLi9jb25kaXRpb24tZWRpdG9yJztcbmltcG9ydCB7QWpmRm9ybUJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tYnVpbGRlci1zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWNvbmRpdGlvbi1lZGl0b3ItZGlhbG9nJyxcbiAgdGVtcGxhdGVVcmw6ICdjb25kaXRpb24tZWRpdG9yLWRpYWxvZy5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2NvbmRpdGlvbi1lZGl0b3ItZGlhbG9nLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nIHtcbiAgQFZpZXdDaGlsZChBamZGYkNvbmRpdGlvbkVkaXRvciwge3N0YXRpYzogZmFsc2V9KSBlZGl0b3IhOiBBamZGYkNvbmRpdGlvbkVkaXRvcjtcblxuICBwcml2YXRlIF9maWVsZHM6IE9ic2VydmFibGU8QWpmRmllbGRbXT47XG4gIGdldCBmaWVsZHMoKTogT2JzZXJ2YWJsZTxBamZGaWVsZFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpZWxkcztcbiAgfVxuXG4gIGNvbmRpdGlvbjogc3RyaW5nID0gJyc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgc2VydmljZTogQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlLFxuICAgIHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZz4sXG4gICkge1xuICAgIHRoaXMuX2ZpZWxkcyA9IHNlcnZpY2UuZmxhdEZpZWxkcy5waXBlKFxuICAgICAgbWFwKChmaWVsZHM6IEFqZkZpZWxkW10pID0+IGZpZWxkcy5zb3J0KChmMSwgZjIpID0+IGYxLm5hbWUubG9jYWxlQ29tcGFyZShmMi5uYW1lKSkpLFxuICAgICk7XG4gIH1cblxuICBzYXZlQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmVkaXRvciA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5lZGl0b3IuZm9ybXVsYUVkaXRvckNvbnRyb2wudmFsdWU7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UobmV3VmFsdWUpO1xuICB9XG5cbiAgY2xvc2VEaWFsb2coKTogdm9pZCB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodGhpcy5lZGl0b3IuZm9ybXVsYUVkaXRvckNvbnRyb2wudmFsdWUpO1xuICB9XG59XG4iLCI8aDMgbWF0RGlhbG9nVGl0bGU+e3snRWRpdCBjb25kaXRpb24nfHRyYW5zbG9jb319PC9oMz5cbjxtYXQtZGlhbG9nLWNvbnRlbnQ+XG4gIDxhamYtY29uZGl0aW9uLWVkaXRvclxuICAgICpuZ0lmPVwiZmllbGRzfGFzeW5jIGFzIGN1ckZpZWxkc1wiXG4gICAgW2ZpZWxkc109XCJjdXJGaWVsZHMhXCJcbiAgICBbY29uZGl0aW9uXT1cImNvbmRpdGlvblwiXG4gID48L2FqZi1jb25kaXRpb24tZWRpdG9yPlxuPC9tYXQtZGlhbG9nLWNvbnRlbnQ+XG48bWF0LWRpYWxvZy1hY3Rpb25zPlxuICA8YnV0dG9uIG1hdC1idXR0b24gKGNsaWNrKT1cInNhdmVDb25kaXRpb24oKVwiPnt7J1NhdmUnfHRyYW5zbG9jb319PC9idXR0b24+XG4gIDxidXR0b24gbWF0LWJ1dHRvbiAoY2xpY2spPVwiY2xvc2VEaWFsb2coKVwiPnt7J0Nsb3NlJ3x0cmFuc2xvY299fTwvYnV0dG9uPlxuPC9tYXQtZGlhbG9nLWFjdGlvbnM+XG4iXX0=