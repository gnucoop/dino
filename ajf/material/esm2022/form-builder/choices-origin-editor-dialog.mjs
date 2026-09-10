import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { AjfFbChoicesOriginEditor } from './choices-origin-editor';
import * as i0 from "@angular/core";
import * as i1 from "./form-builder-service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/button";
import * as i4 from "@angular/material/dialog";
import * as i5 from "./choices-origin-editor";
import * as i6 from "@ngneat/transloco";
function AjfFbChoicesOriginEditorDialog_ajf_fb_choices_origin_editor_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-fb-choices-origin-editor", 5);
} if (rf & 2) {
    const co_r1 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("choicesOrigin", co_r1)("nameDuplicate", ctx_r1.isDuplicateName());
} }
export class AjfFbChoicesOriginEditorDialog {
    get choicesOrigin() {
        return this._choicesOrigin;
    }
    constructor(_service) {
        this._service = _service;
        this._allChoicesOrigins = [];
        this._editedOriginOriginalName = '';
        this._choicesOrigin = this._service.editedChoicesOrigin.pipe(filter(c => c != null), map(c => c));
        this._service.editedChoicesOrigin
            .pipe(filter(c => c != null), map(c => c))
            .subscribe(c => { this._editedOriginOriginalName = c.name; });
        this._service.choicesOrigins.subscribe(origins => {
            this._allChoicesOrigins = origins;
        });
    }
    isDuplicateName() {
        if (this.editor == null)
            return false;
        const name = (this.editor.name ?? '').trim();
        if (name === '')
            return false;
        return this._allChoicesOrigins.some(o => o.name !== this._editedOriginOriginalName && o.name === name);
    }
    disableSave() {
        if (this.editor == null)
            return true;
        const name = (this.editor.name ?? '').trim();
        if (name === '')
            return true;
        if (this.isDuplicateName())
            return true;
        if (this.editor.hasInvalidChoices)
            return true;
        return false;
    }
    saveChoicesOrigin() {
        this._service.saveChoicesOrigin({
            label: this.editor.label,
            name: this.editor.name,
            choices: this.editor.choicesArr,
        });
    }
    cancelChoicesOriginEdit() {
        this._service.cancelChoicesOriginEdit();
    }
    static { this.ɵfac = function AjfFbChoicesOriginEditorDialog_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFbChoicesOriginEditorDialog)(i0.ɵɵdirectiveInject(i1.AjfFormBuilderService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFbChoicesOriginEditorDialog, selectors: [["ajf-fb-choices-origin-editor-dialog"]], viewQuery: function AjfFbChoicesOriginEditorDialog_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(AjfFbChoicesOriginEditor, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.editor = _t.first);
        } }, decls: 13, vars: 13, consts: [["matDialogTitle", ""], [3, "choicesOrigin", "nameDuplicate", 4, "ngIf"], ["align", "center"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["mat-raised-button", "", "color", "accent", 3, "click"], [3, "choicesOrigin", "nameDuplicate"]], template: function AjfFbChoicesOriginEditorDialog_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "h3", 0);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "mat-dialog-content");
            i0.ɵɵtemplate(4, AjfFbChoicesOriginEditorDialog_ajf_fb_choices_origin_editor_4_Template, 1, 2, "ajf-fb-choices-origin-editor", 1);
            i0.ɵɵpipe(5, "async");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "mat-dialog-actions", 2)(7, "button", 3);
            i0.ɵɵlistener("click", function AjfFbChoicesOriginEditorDialog_Template_button_click_7_listener() { return ctx.saveChoicesOrigin(); });
            i0.ɵɵtext(8);
            i0.ɵɵpipe(9, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "button", 4);
            i0.ɵɵlistener("click", function AjfFbChoicesOriginEditorDialog_Template_button_click_10_listener() { return ctx.cancelChoicesOriginEdit(); });
            i0.ɵɵtext(11);
            i0.ɵɵpipe(12, "transloco");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 5, "Edit choices origin"));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(5, 7, ctx.choicesOrigin));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("disabled", ctx.disableSave());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 9, "Save"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(12, 11, "Close"), " ");
        } }, dependencies: [i2.NgIf, i3.MatButton, i4.MatDialogTitle, i4.MatDialogActions, i4.MatDialogContent, i5.AjfFbChoicesOriginEditor, i2.AsyncPipe, i6.TranslocoPipe], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFbChoicesOriginEditorDialog, [{
        type: Component,
        args: [{ selector: 'ajf-fb-choices-origin-editor-dialog', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<h3 matDialogTitle>{{'Edit choices origin'|transloco}}</h3>\n<mat-dialog-content>\n  <ajf-fb-choices-origin-editor\n    *ngIf=\"choicesOrigin|async as co\"\n    [choicesOrigin]=\"co!\"\n    [nameDuplicate]=\"isDuplicateName()\"\n  ></ajf-fb-choices-origin-editor>\n</mat-dialog-content>\n<mat-dialog-actions align=\"center\">\n  <button mat-raised-button color=\"primary\" (click)=\"saveChoicesOrigin()\" [disabled]=\"disableSave()\">{{'Save'|transloco}}</button>\n  <button mat-raised-button color=\"accent\" (click)=\"cancelChoicesOriginEdit()\">\n    {{'Close'|transloco}}\n  </button>\n</mat-dialog-actions>\n" }]
    }], () => [{ type: i1.AjfFormBuilderService }], { editor: [{
            type: ViewChild,
            args: [AjfFbChoicesOriginEditor, { static: false }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFbChoicesOriginEditorDialog, { className: "AjfFbChoicesOriginEditorDialog", filePath: "choices-origin-editor-dialog.ts", lineNumber: 38 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvaWNlcy1vcmlnaW4tZWRpdG9yLWRpYWxvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9zcmMvY2hvaWNlcy1vcmlnaW4tZWRpdG9yLWRpYWxvZy50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9zcmMvY2hvaWNlcy1vcmlnaW4tZWRpdG9yLWRpYWxvZy5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVCQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUvRixPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7Ozs7SUN6Qi9ELGtEQUlnQzs7OztJQUQ5QixBQURBLHFDQUFxQiwyQ0FDYzs7QURnQ3ZDLE1BQU0sT0FBTyw4QkFBOEI7SUFJekMsSUFBSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7SUFLRCxZQUFvQixRQUErQjtRQUEvQixhQUFRLEdBQVIsUUFBUSxDQUF1QjtRQUgzQyx1QkFBa0IsR0FBNEIsRUFBRSxDQUFDO1FBQ2pELDhCQUF5QixHQUFHLEVBQUUsQ0FBQztRQUdyQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUMxRCxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQ3RCLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQyxDQUNiLENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQjthQUM5QixJQUFJLENBQUMsTUFB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QUFFLEtBQUssRUFBQzs7a0ZBRHpDLDhCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDaG9pY2VzT3JpZ2lufSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlciwgbWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRmJDaG9pY2VzT3JpZ2luRWRpdG9yfSBmcm9tICcuL2Nob2ljZXMtb3JpZ2luLWVkaXRvcic7XG5pbXBvcnQge0FqZkZvcm1CdWlsZGVyU2VydmljZX0gZnJvbSAnLi9mb3JtLWJ1aWxkZXItc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1mYi1jaG9pY2VzLW9yaWdpbi1lZGl0b3ItZGlhbG9nJyxcbiAgdGVtcGxhdGVVcmw6ICdjaG9pY2VzLW9yaWdpbi1lZGl0b3ItZGlhbG9nLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY2hvaWNlcy1vcmlnaW4tZWRpdG9yLWRpYWxvZy5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBBamZGYkNob2ljZXNPcmlnaW5FZGl0b3JEaWFsb2cge1xuICBAVmlld0NoaWxkKEFqZkZiQ2hvaWNlc09yaWdpbkVkaXRvciwge3N0YXRpYzogZmFsc2V9KSBlZGl0b3IhOiBBamZGYkNob2ljZXNPcmlnaW5FZGl0b3I7XG5cbiAgcHJpdmF0ZSBfY2hvaWNlc09yaWdpbjogT2JzZXJ2YWJsZTxBamZDaG9pY2VzT3JpZ2luPGFueT4+O1xuICBnZXQgY2hvaWNlc09yaWdpbigpOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55Pj4ge1xuICAgIHJldHVybiB0aGlzLl9jaG9pY2VzT3JpZ2luO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWxsQ2hvaWNlc09yaWdpbnM6IEFqZkNob2ljZXNPcmlnaW48YW55PltdID0gW107XG4gIHByaXZhdGUgX2VkaXRlZE9yaWdpbk9yaWdpbmFsTmFtZSA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IEFqZkZvcm1CdWlsZGVyU2VydmljZSkge1xuICAgIHRoaXMuX2Nob2ljZXNPcmlnaW4gPSB0aGlzLl9zZXJ2aWNlLmVkaXRlZENob2ljZXNPcmlnaW4ucGlwZShcbiAgICAgIGZpbHRlcihjID0+IGMgIT0gbnVsbCksXG4gICAgICBtYXAoYyA9PiBjISksXG4gICAgKTtcbiAgICB0aGlzLl9zZXJ2aWNlLmVkaXRlZENob2ljZXNPcmlnaW5cbiAgICAgIC5waXBlKGZpbHRlcihjID0+IGMgIT0gbnVsbCksIG1hcChjID0+IGMhKSlcbiAgICAgIC5zdWJzY3JpYmUoYyA9PiB7IHRoaXMuX2VkaXRlZE9yaWdpbk9yaWdpbmFsTmFtZSA9IGMubmFtZTsgfSk7XG4gICAgdGhpcy5fc2VydmljZS5jaG9pY2VzT3JpZ2lucy5zdWJzY3JpYmUob3JpZ2lucyA9PiB7XG4gICAgICB0aGlzLl9hbGxDaG9pY2VzT3JpZ2lucyA9IG9yaWdpbnM7XG4gICAgfSk7XG4gIH1cblxuICBpc0R1cGxpY2F0ZU5hbWUoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuZWRpdG9yID09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBuYW1lID0gKHRoaXMuZWRpdG9yLm5hbWUgPz8gJycpLnRyaW0oKTtcbiAgICBpZiAobmFtZSA9PT0gJycpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdGhpcy5fYWxsQ2hvaWNlc09yaWdpbnMuc29tZShcbiAgICAgIG8gPT4gby5uYW1lICE9PSB0aGlzLl9lZGl0ZWRPcmlnaW5PcmlnaW5hbE5hbWUgJiYgby5uYW1lID09PSBuYW1lLFxuICAgICk7XG4gIH1cblxuICBkaXNhYmxlU2F2ZSgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5lZGl0b3IgPT0gbnVsbCkgcmV0dXJuIHRydWU7XG4gICAgY29uc3QgbmFtZSA9ICh0aGlzLmVkaXRvci5uYW1lID8/ICcnKS50cmltKCk7XG4gICAgaWYgKG5hbWUgPT09ICcnKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAodGhpcy5pc0R1cGxpY2F0ZU5hbWUoKSkgcmV0dXJuIHRydWU7XG4gICAgaWYgKHRoaXMuZWRpdG9yLmhhc0ludmFsaWRDaG9pY2VzKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzYXZlQ2hvaWNlc09yaWdpbigpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnNhdmVDaG9pY2VzT3JpZ2luKHtcbiAgICAgIGxhYmVsOiB0aGlzLmVkaXRvci5sYWJlbCxcbiAgICAgIG5hbWU6IHRoaXMuZWRpdG9yLm5hbWUsXG4gICAgICBjaG9pY2VzOiB0aGlzLmVkaXRvci5jaG9pY2VzQXJyLFxuICAgIH0pO1xuICB9XG5cbiAgY2FuY2VsQ2hvaWNlc09yaWdpbkVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5jYW5jZWxDaG9pY2VzT3JpZ2luRWRpdCgpO1xuICB9XG59XG4iLCI8aDMgbWF0RGlhbG9nVGl0bGU+e3snRWRpdCBjaG9pY2VzIG9yaWdpbid8dHJhbnNsb2NvfX08L2gzPlxuPG1hdC1kaWFsb2ctY29udGVudD5cbiAgPGFqZi1mYi1jaG9pY2VzLW9yaWdpbi1lZGl0b3JcbiAgICAqbmdJZj1cImNob2ljZXNPcmlnaW58YXN5bmMgYXMgY29cIlxuICAgIFtjaG9pY2VzT3JpZ2luXT1cImNvIVwiXG4gICAgW25hbWVEdXBsaWNhdGVdPVwiaXNEdXBsaWNhdGVOYW1lKClcIlxuICA+PC9hamYtZmItY2hvaWNlcy1vcmlnaW4tZWRpdG9yPlxuPC9tYXQtZGlhbG9nLWNvbnRlbnQ+XG48bWF0LWRpYWxvZy1hY3Rpb25zIGFsaWduPVwiY2VudGVyXCI+XG4gIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cInNhdmVDaG9pY2VzT3JpZ2luKClcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZVNhdmUoKVwiPnt7J1NhdmUnfHRyYW5zbG9jb319PC9idXR0b24+XG4gIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gY29sb3I9XCJhY2NlbnRcIiAoY2xpY2spPVwiY2FuY2VsQ2hvaWNlc09yaWdpbkVkaXQoKVwiPlxuICAgIHt7J0Nsb3NlJ3x0cmFuc2xvY299fVxuICA8L2J1dHRvbj5cbjwvbWF0LWRpYWxvZy1hY3Rpb25zPlxuIl19