import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
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
    /**
     * A repetition count driven by a formula is not the reader's to change:
     * `AjfFormRendererService.addGroup` and `removeGroup` both refuse the call
     * outright, so without this the buttons would sit enabled and do nothing.
     */
    get manualReps() {
        return this.slide.formulaReps == null;
    }
    get canAdd() {
        return this.manualReps && !!this.slide.canAdd;
    }
    get canRemove() {
        return this.manualReps && !!this.slide.canRemove;
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
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfRepStrip, { className: "AjfRepStrip", filePath: "rep-strip.ts", lineNumber: 41 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwLXN0cmlwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvZm9ybXMvc3JjL3JlcC1zdHJpcC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm1zL3NyYy9yZXAtc3RyaXAuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF1QkEsT0FBTyxFQUFlLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7SUNUcEYsaUNBTUM7SUFEQyxnTUFBUyx3QkFBYyxLQUFDO0lBRXhCLFlBQ0Y7SUFBQSxpQkFBUzs7OztJQUpQLHlEQUFzQztJQUd0QyxjQUNGO0lBREUsMkNBQ0Y7Ozs7SUFXQSw2QkFBZ0M7SUFDOUIsaUNBTUM7O0lBRkMsaUxBQVMsaUJBQVUsS0FBQztJQUdwQixnQ0FBVTtJQUFBLG1CQUFHO0lBQ2YsQUFEZSxpQkFBVyxFQUNqQjtJQUNULGlDQU1DOztJQUZDLGlMQUFTLG9CQUFhLEtBQUM7SUFHdkIsZ0NBQVU7SUFBQSxzQkFBTTtJQUNsQixBQURrQixpQkFBVyxFQUNwQjs7OztJQWRQLGNBQW9CO0lBQXBCLHlDQUFvQjs7SUFTcEIsZUFBdUI7SUFBdkIsNENBQXVCOzs7QURyQi9COzs7O0dBSUc7QUFVSCxNQUFNLE9BQU8sV0FBVztJQVR4QjtRQVlFLHNEQUFzRDtRQUM3QyxZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBU2IsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVQLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQ2xDLFFBQUcsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQy9CLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0tBb0J0RDtJQS9CQyxJQUNJLFFBQVEsQ0FBQyxRQUFpQjtRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFDRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQU9EOzs7O09BSUc7SUFDSCxJQUFZLFVBQVU7UUFDcEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUM7SUFDeEMsQ0FBQztJQUVELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDaEQsQ0FBQztJQUVELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7SUFDbkQsQ0FBQzs0R0FsQ1UsV0FBVztvRUFBWCxXQUFXO1lDdkN0QixBQURGLDhCQUEyQixjQUV0QjtZQUFBLFlBQWdFOzs7WUFBQSxpQkFDbEU7WUFHQyxBQURGLDhCQUEyQixnQkFPeEI7O1lBRkMsd0ZBQVMsNEJBQW9CLENBQUMsQ0FBQyxJQUFDO1lBR2hDLGdDQUFVO1lBQUEsNEJBQVk7WUFDeEIsQUFEd0IsaUJBQVcsRUFDMUI7WUFDVCxvRUFNQzs7WUFHRCxrQ0FNQzs7WUFGQyx5RkFBUyw0QkFBb0IsQ0FBQyxDQUFDLElBQUM7WUFHaEMsaUNBQVU7WUFBQSw4QkFBYTtZQUN6QixBQUR5QixpQkFBVyxFQUMzQjtZQUVULGdGQUFnQztZQW9CbEMsaUJBQU07WUFFTixnQ0FBb0M7WUFDbEMsMkJBQXdEOztZQUN4RCxhQUNGOztZQUNGLEFBREUsaUJBQU8sRUFDSDs7WUExREQsZUFBZ0U7WUFBaEUsbUhBQWdFO1lBTy9ELGVBQTBCO1lBQTFCLDRDQUEwQjs7WUFTVixlQUE0QjtZQUE1QixnRUFBNEI7WUFTNUMsZUFBc0M7WUFBdEMsNERBQXNDOztZQU96QixlQUFlO1lBQWYsb0NBQWU7WUF1QnhCLGVBQTBDO1lBQTFDLDJGQUEwQztZQUNoRCxlQUNGO1lBREUsd0dBQ0Y7OztpRkRuQlcsV0FBVztjQVR2QixTQUFTOzJCQUNFLGVBQWUsaUJBR1YsaUJBQWlCLENBQUMsSUFBSTtnQkFNNUIsS0FBSztrQkFBYixLQUFLO1lBR0csT0FBTztrQkFBZixLQUFLO1lBR0YsUUFBUTtrQkFEWCxLQUFLO1lBU2EsSUFBSTtrQkFBdEIsTUFBTTtZQUNZLEdBQUc7a0JBQXJCLE1BQU07WUFDWSxNQUFNO2tCQUF4QixNQUFNOztrRkFqQkksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlfSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBUaGUgcGFnZXIgZm9yIGEgcmVwZWF0aW5nIHNsaWRlOiBvbmUgYnV0dG9uIHBlciByZXBldGl0aW9uIHBsdXMgYWRkIGFuZCByZW1vdmVcbiAqIGFjdGlvbnMuIFRoZSByZW5kZXJlciBrZWVwcyBvbmUgcGFnZSBwZXIgcmVwZXRpdGlvbiwgc28gcGlja2luZyBhIG51bWJlciBoZXJlXG4gKiBpcyBhIHBhZ2UgY2hhbmdlLCB3aGljaCB0aGUgcmVuZGVyZXIgcGVyZm9ybXMuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1yZXAtc3RyaXAnLFxuICB0ZW1wbGF0ZVVybDogJ3JlcC1zdHJpcC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3JlcC1zdHJpcC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIC8vIERlbGliZXJhdGVseSBub3QgT25QdXNoOiBgcmVwc2AsIGBjYW5BZGRgIGFuZCBgY2FuUmVtb3ZlYCBhcmUgbXV0YXRlZCBpblxuICAvLyBwbGFjZSBvbiB0aGUgc2xpZGUgaW5zdGFuY2UsIHNvIHRoZSBndWFyZHMgYmVsb3cgd291bGQgZ28gc3RhbGUgdW5kZXIgYVxuICAvLyBzdHJhdGVneSB0aGF0IG9ubHkgcmUtY2hlY2tzIHdoZW4gYW4gaW5wdXQgaWRlbnRpdHkgY2hhbmdlcy5cbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVwU3RyaXAge1xuICBASW5wdXQoKSBzbGlkZSE6IEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2U7XG5cbiAgLyoqIFRoZSByZXBldGl0aW9uIGN1cnJlbnRseSBvbiBzY3JlZW4sIHplcm8gYmFzZWQuICovXG4gIEBJbnB1dCgpIGN1cnJlbnQgPSAwO1xuXG4gIEBJbnB1dCgpXG4gIHNldCByZWFkb25seShyZWFkb25seTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlYWRvbmx5ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHJlYWRvbmx5KTtcbiAgfVxuICBnZXQgcmVhZG9ubHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlYWRvbmx5O1xuICB9XG4gIHByaXZhdGUgX3JlYWRvbmx5ID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGdvVG8gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGFkZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IHJlbW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKipcbiAgICogQSByZXBldGl0aW9uIGNvdW50IGRyaXZlbiBieSBhIGZvcm11bGEgaXMgbm90IHRoZSByZWFkZXIncyB0byBjaGFuZ2U6XG4gICAqIGBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLmFkZEdyb3VwYCBhbmQgYHJlbW92ZUdyb3VwYCBib3RoIHJlZnVzZSB0aGUgY2FsbFxuICAgKiBvdXRyaWdodCwgc28gd2l0aG91dCB0aGlzIHRoZSBidXR0b25zIHdvdWxkIHNpdCBlbmFibGVkIGFuZCBkbyBub3RoaW5nLlxuICAgKi9cbiAgcHJpdmF0ZSBnZXQgbWFudWFsUmVwcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zbGlkZS5mb3JtdWxhUmVwcyA9PSBudWxsO1xuICB9XG5cbiAgZ2V0IGNhbkFkZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tYW51YWxSZXBzICYmICEhdGhpcy5zbGlkZS5jYW5BZGQ7XG4gIH1cblxuICBnZXQgY2FuUmVtb3ZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm1hbnVhbFJlcHMgJiYgISF0aGlzLnNsaWRlLmNhblJlbW92ZTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yZWFkb25seTogQm9vbGVhbklucHV0O1xufVxuIiwiPGRpdiBjbGFzcz1cImFqZi1yZXAtc3RyaXBcIj5cbiAgPHNwYW4gY2xhc3M9XCJhamYtbWljcm8tbGFiZWwgYWpmLXJlcC1zdHJpcC1sYWJlbFwiXG4gICAgPnt7ICdOdW1iZXIgb2YnIHwgdHJhbnNsb2NvIH19IHt7IHNsaWRlLm5vZGUubGFiZWwgfCB0cmFuc2xvY28gfX08L3NwYW5cbiAgPlxuXG4gIDxkaXYgY2xhc3M9XCJhamYtcmVwLXBhZ2VyXCI+XG4gICAgPGJ1dHRvblxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICBjbGFzcz1cImFqZi1idG5cIlxuICAgICAgW2Rpc2FibGVkXT1cImN1cnJlbnQgPT09IDBcIlxuICAgICAgKGNsaWNrKT1cImdvVG8uZW1pdChjdXJyZW50IC0gMSlcIlxuICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCInQmFjaycgfCB0cmFuc2xvY29cIlxuICAgID5cbiAgICAgIDxtYXQtaWNvbj5jaGV2cm9uX2xlZnQ8L21hdC1pY29uPlxuICAgIDwvYnV0dG9uPlxuICAgIDxidXR0b25cbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgY2xhc3M9XCJhamYtYnRuIGFqZi1yZXAtcGFnZVwiXG4gICAgICAqbmdGb3I9XCJsZXQgcmVwIG9mIChzbGlkZS5yZXBzIHwgYWpmUmFuZ2UpOyBsZXQgaWR4ID0gaW5kZXhcIlxuICAgICAgW2NsYXNzLmFqZi1zZWxlY3RlZF09XCJpZHggPT09IGN1cnJlbnRcIlxuICAgICAgKGNsaWNrKT1cImdvVG8uZW1pdChpZHgpXCJcbiAgICA+XG4gICAgICB7eyBpZHggKyAxIH19XG4gICAgPC9idXR0b24+XG4gICAgPGJ1dHRvblxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICBjbGFzcz1cImFqZi1idG5cIlxuICAgICAgW2Rpc2FibGVkXT1cImN1cnJlbnQgPj0gc2xpZGUucmVwcyAtIDFcIlxuICAgICAgKGNsaWNrKT1cImdvVG8uZW1pdChjdXJyZW50ICsgMSlcIlxuICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCInRm9yd2FyZCcgfCB0cmFuc2xvY29cIlxuICAgID5cbiAgICAgIDxtYXQtaWNvbj5jaGV2cm9uX3JpZ2h0PC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cblxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhcmVhZG9ubHlcIj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGNsYXNzPVwiYWpmLWJ0blwiXG4gICAgICAgIFtkaXNhYmxlZF09XCIhY2FuQWRkXCJcbiAgICAgICAgKGNsaWNrKT1cImFkZC5lbWl0KClcIlxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIidBZGQnIHwgdHJhbnNsb2NvXCJcbiAgICAgID5cbiAgICAgICAgPG1hdC1pY29uPmFkZDwvbWF0LWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGNsYXNzPVwiYWpmLWJ0blwiXG4gICAgICAgIFtkaXNhYmxlZF09XCIhY2FuUmVtb3ZlXCJcbiAgICAgICAgKGNsaWNrKT1cInJlbW92ZS5lbWl0KClcIlxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIidSZW1vdmUnIHwgdHJhbnNsb2NvXCJcbiAgICAgID5cbiAgICAgICAgPG1hdC1pY29uPnJlbW92ZTwvbWF0LWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9kaXY+XG5cbiAgPHNwYW4gY2xhc3M9XCJhamYtcmVwLXN0cmlwLWNvbnRleHRcIj5cbiAgICA8c3BhbiBbaW5uZXJIVE1MXT1cInNsaWRlLm5vZGUubGFiZWwgfCB0cmFuc2xvY29cIj48L3NwYW4+XG4gICAge3sgY3VycmVudCArIDEgfX0ge3sgJ29mJyB8IHRyYW5zbG9jbyB9fSB7eyBzbGlkZS5yZXBzIH19XG4gIDwvc3Bhbj5cbjwvZGl2PlxuIl19