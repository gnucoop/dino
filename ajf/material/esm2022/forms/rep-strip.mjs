import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, Output, ViewEncapsulation, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/material/icon";
import * as i3 from "@ngneat/transloco";
import * as i4 from "@ajf/core/forms";
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
export class AjfRepStrip {
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
        } }, dependencies: [i1.NgForOf, i1.NgIf, i2.MatIcon, i3.TranslocoPipe, i4.AjfRangePipe], styles: ["ajf-rep-strip{display:block}ajf-rep-strip .ajf-rep-strip{display:flex;flex-wrap:wrap;align-items:center;gap:10px;padding:8px 20px;border-bottom:1px solid var(--ajf-border);background:var(--ajf-band);font-family:var(--ajf-font-sans)}ajf-rep-strip .ajf-rep-strip-label{flex:0 0 auto}ajf-rep-strip .ajf-rep-pager{display:flex;flex-wrap:wrap;gap:6px}ajf-rep-strip .ajf-rep-pager .ajf-btn{min-width:32px;min-height:32px;padding:0 6px;font-size:13px}ajf-rep-strip .ajf-rep-pager .ajf-btn .mat-icon{width:18px;height:18px;font-size:18px}ajf-rep-strip .ajf-rep-pager .ajf-rep-page.ajf-selected{border-color:var(--ajf-accent);background:var(--ajf-accent);color:var(--ajf-accent-fg)}ajf-rep-strip .ajf-rep-strip-context{margin-left:auto;color:var(--ajf-text-muted);font-size:13px}\n"], encapsulation: 2 }); }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwLXN0cmlwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvZm9ybXMvc3JjL3JlcC1zdHJpcC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm1zL3NyYy9yZXAtc3RyaXAuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF1QkEsT0FBTyxFQUFlLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7O0lDZm5CLGlDQU1DO0lBREMsZ01BQVMsd0JBQWMsS0FBQztJQUV4QixZQUNGO0lBQUEsaUJBQVM7Ozs7SUFKUCx5REFBc0M7SUFHdEMsY0FDRjtJQURFLDJDQUNGOzs7O0lBV0EsNkJBQWdDO0lBQzlCLGlDQU1DOztJQUZDLGlMQUFTLGlCQUFVLEtBQUM7SUFHcEIsZ0NBQVU7SUFBQSxtQkFBRztJQUNmLEFBRGUsaUJBQVcsRUFDakI7SUFDVCxpQ0FNQzs7SUFGQyxpTEFBUyxvQkFBYSxLQUFDO0lBR3ZCLGdDQUFVO0lBQUEsc0JBQU07SUFDbEIsQUFEa0IsaUJBQVcsRUFDcEI7Ozs7SUFkUCxjQUFvQjtJQUFwQix5Q0FBb0I7O0lBU3BCLGVBQXVCO0lBQXZCLDRDQUF1Qjs7O0FEZi9COzs7O0dBSUc7QUFVSCxNQUFNLE9BQU8sV0FBVztJQVR4QjtRQVlFLHNEQUFzRDtRQUM3QyxZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBU2IsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVQLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQ2xDLFFBQUcsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQy9CLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0tBYXREO0lBeEJDLElBQ0ksUUFBUSxDQUFDLFFBQWlCO1FBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUNELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBT0QsSUFBSSxNQUFNO1FBQ1IsT0FBTyxDQUNMLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FDOUUsQ0FBQztJQUNKLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDWCxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUNuRSxDQUFDOzRHQTNCVSxXQUFXO29FQUFYLFdBQVc7WUM3Q3RCLEFBREYsOEJBQTJCLGNBRXRCO1lBQUEsWUFBZ0U7OztZQUFBLGlCQUNsRTtZQUdDLEFBREYsOEJBQTJCLGdCQU94Qjs7WUFGQyx3RkFBUyw0QkFBb0IsQ0FBQyxDQUFDLElBQUM7WUFHaEMsZ0NBQVU7WUFBQSw0QkFBWTtZQUN4QixBQUR3QixpQkFBVyxFQUMxQjtZQUNULG9FQU1DOztZQUdELGtDQU1DOztZQUZDLHlGQUFTLDRCQUFvQixDQUFDLENBQUMsSUFBQztZQUdoQyxpQ0FBVTtZQUFBLDhCQUFhO1lBQ3pCLEFBRHlCLGlCQUFXLEVBQzNCO1lBRVQsZ0ZBQWdDO1lBb0JsQyxpQkFBTTtZQUVOLGdDQUFvQztZQUNsQywyQkFBd0Q7O1lBQ3hELGFBQ0Y7O1lBQ0YsQUFERSxpQkFBTyxFQUNIOztZQTFERCxlQUFnRTtZQUFoRSxtSEFBZ0U7WUFPL0QsZUFBMEI7WUFBMUIsNENBQTBCOztZQVNWLGVBQTRCO1lBQTVCLGdFQUE0QjtZQVM1QyxlQUFzQztZQUF0Qyw0REFBc0M7O1lBT3pCLGVBQWU7WUFBZixvQ0FBZTtZQXVCeEIsZUFBMEM7WUFBMUMsMkZBQTBDO1lBQ2hELGVBQ0Y7WUFERSx3R0FDRjs7O2lGRGJXLFdBQVc7Y0FUdkIsU0FBUzsyQkFDRSxlQUFlLGlCQUdWLGlCQUFpQixDQUFDLElBQUk7Z0JBTTVCLEtBQUs7a0JBQWIsS0FBSztZQUdHLE9BQU87a0JBQWYsS0FBSztZQUdGLFFBQVE7a0JBRFgsS0FBSztZQVNhLElBQUk7a0JBQXRCLE1BQU07WUFDWSxHQUFHO2tCQUFyQixNQUFNO1lBQ1ksTUFBTTtrQkFBeEIsTUFBTTs7a0ZBakJJLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZX0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIFRoZSBwYWdlciBmb3IgYSByZXBlYXRpbmcgc2xpZGU6IG9uZSBidXR0b24gcGVyIHJlcGV0aXRpb24gcGx1cyBhZGQgYW5kIHJlbW92ZVxuICogYWN0aW9ucy4gVGhlIHJlbmRlcmVyIGtlZXBzIG9uZSBwYWdlIHBlciByZXBldGl0aW9uLCBzbyBwaWNraW5nIGEgbnVtYmVyIGhlcmVcbiAqIGlzIGEgcGFnZSBjaGFuZ2UsIHdoaWNoIHRoZSByZW5kZXJlciBwZXJmb3Jtcy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXJlcC1zdHJpcCcsXG4gIHRlbXBsYXRlVXJsOiAncmVwLXN0cmlwLmh0bWwnLFxuICBzdHlsZVVybHM6IFsncmVwLXN0cmlwLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgLy8gRGVsaWJlcmF0ZWx5IG5vdCBPblB1c2g6IHRoZSBjb21wbGV0aW9uIGNvdW50ZXIsIHRoZSBpc3N1ZSBjb3VudCBhbmQgdGhlXG4gIC8vIGFkZC9yZW1vdmUgZ3VhcmRzIGFyZSByZWFkIG9mZiBtdXRhYmxlIGluc3RhbmNlIHN0YXRlIHRocm91Z2ggaW1wdXJlIHBpcGVzLFxuICAvLyB3aGljaCB1bmRlciBPblB1c2ggd291bGQgb25seSBiZSByZWNvbXB1dGVkIHdoZW4gYW4gaW5wdXQgaWRlbnRpdHkgY2hhbmdlZC5cbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVwU3RyaXAge1xuICBASW5wdXQoKSBzbGlkZSE6IEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2U7XG5cbiAgLyoqIFRoZSByZXBldGl0aW9uIGN1cnJlbnRseSBvbiBzY3JlZW4sIHplcm8gYmFzZWQuICovXG4gIEBJbnB1dCgpIGN1cnJlbnQgPSAwO1xuXG4gIEBJbnB1dCgpXG4gIHNldCByZWFkb25seShyZWFkb25seTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlYWRvbmx5ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHJlYWRvbmx5KTtcbiAgfVxuICBnZXQgcmVhZG9ubHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlYWRvbmx5O1xuICB9XG4gIHByaXZhdGUgX3JlYWRvbmx5ID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGdvVG8gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGFkZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IHJlbW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBnZXQgY2FuQWRkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICAhIXRoaXMuc2xpZGUuY2FuQWRkICYmICEodGhpcy5zbGlkZS5ub2RlLmRpc2FibGVSZW1vdmFsICYmICF0aGlzLnNsaWRlLnZhbGlkKVxuICAgICk7XG4gIH1cblxuICBnZXQgY2FuUmVtb3ZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuc2xpZGUuY2FuUmVtb3ZlICYmICF0aGlzLnNsaWRlLm5vZGUuZGlzYWJsZVJlbW92YWw7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfcmVhZG9ubHk6IEJvb2xlYW5JbnB1dDtcbn1cbiIsIjxkaXYgY2xhc3M9XCJhamYtcmVwLXN0cmlwXCI+XG4gIDxzcGFuIGNsYXNzPVwiYWpmLW1pY3JvLWxhYmVsIGFqZi1yZXAtc3RyaXAtbGFiZWxcIlxuICAgID57eyAnTnVtYmVyIG9mJyB8IHRyYW5zbG9jbyB9fSB7eyBzbGlkZS5ub2RlLmxhYmVsIHwgdHJhbnNsb2NvIH19PC9zcGFuXG4gID5cblxuICA8ZGl2IGNsYXNzPVwiYWpmLXJlcC1wYWdlclwiPlxuICAgIDxidXR0b25cbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgY2xhc3M9XCJhamYtYnRuXCJcbiAgICAgIFtkaXNhYmxlZF09XCJjdXJyZW50ID09PSAwXCJcbiAgICAgIChjbGljayk9XCJnb1RvLmVtaXQoY3VycmVudCAtIDEpXCJcbiAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiJ0JhY2snIHwgdHJhbnNsb2NvXCJcbiAgICA+XG4gICAgICA8bWF0LWljb24+Y2hldnJvbl9sZWZ0PC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cbiAgICA8YnV0dG9uXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgIGNsYXNzPVwiYWpmLWJ0biBhamYtcmVwLXBhZ2VcIlxuICAgICAgKm5nRm9yPVwibGV0IHJlcCBvZiAoc2xpZGUucmVwcyB8IGFqZlJhbmdlKTsgbGV0IGlkeCA9IGluZGV4XCJcbiAgICAgIFtjbGFzcy5hamYtc2VsZWN0ZWRdPVwiaWR4ID09PSBjdXJyZW50XCJcbiAgICAgIChjbGljayk9XCJnb1RvLmVtaXQoaWR4KVwiXG4gICAgPlxuICAgICAge3sgaWR4ICsgMSB9fVxuICAgIDwvYnV0dG9uPlxuICAgIDxidXR0b25cbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgY2xhc3M9XCJhamYtYnRuXCJcbiAgICAgIFtkaXNhYmxlZF09XCJjdXJyZW50ID49IHNsaWRlLnJlcHMgLSAxXCJcbiAgICAgIChjbGljayk9XCJnb1RvLmVtaXQoY3VycmVudCArIDEpXCJcbiAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiJ0ZvcndhcmQnIHwgdHJhbnNsb2NvXCJcbiAgICA+XG4gICAgICA8bWF0LWljb24+Y2hldnJvbl9yaWdodDwvbWF0LWljb24+XG4gICAgPC9idXR0b24+XG5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXJlYWRvbmx5XCI+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBjbGFzcz1cImFqZi1idG5cIlxuICAgICAgICBbZGlzYWJsZWRdPVwiIWNhbkFkZFwiXG4gICAgICAgIChjbGljayk9XCJhZGQuZW1pdCgpXCJcbiAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCInQWRkJyB8IHRyYW5zbG9jb1wiXG4gICAgICA+XG4gICAgICAgIDxtYXQtaWNvbj5hZGQ8L21hdC1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBjbGFzcz1cImFqZi1idG5cIlxuICAgICAgICBbZGlzYWJsZWRdPVwiIWNhblJlbW92ZVwiXG4gICAgICAgIChjbGljayk9XCJyZW1vdmUuZW1pdCgpXCJcbiAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCInUmVtb3ZlJyB8IHRyYW5zbG9jb1wiXG4gICAgICA+XG4gICAgICAgIDxtYXQtaWNvbj5yZW1vdmU8L21hdC1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvZGl2PlxuXG4gIDxzcGFuIGNsYXNzPVwiYWpmLXJlcC1zdHJpcC1jb250ZXh0XCI+XG4gICAgPHNwYW4gW2lubmVySFRNTF09XCJzbGlkZS5ub2RlLmxhYmVsIHwgdHJhbnNsb2NvXCI+PC9zcGFuPlxuICAgIHt7IGN1cnJlbnQgKyAxIH19IHt7ICdvZicgfCB0cmFuc2xvY28gfX0ge3sgc2xpZGUucmVwcyB9fVxuICA8L3NwYW4+XG48L2Rpdj5cbiJdfQ==