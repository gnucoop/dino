import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "@ajf/core/transloco";
import * as i3 from "@angular/common";
function AjfTextComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 1);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", ctx_r0.innerHTML, i0.ɵɵsanitizeHtml);
} }
/**
 * this component manages the report text
 *
 * @export
 */
export class AjfTextComponent {
    set htmlText(htmlText) {
        // type checking and length checking for instant method
        const htmlTextToBeTranslate = htmlText != null && typeof htmlText === 'string' && htmlText.trim().length > 0
            ? this._ts.translate(htmlText)
            : htmlText;
        this._htmlText = this._domSanitizer.bypassSecurityTrustHtml(htmlTextToBeTranslate);
        this._cdr.markForCheck();
    }
    get innerHTML() {
        return this._htmlText;
    }
    constructor(_cdr, _domSanitizer, _ts) {
        this._cdr = _cdr;
        this._domSanitizer = _domSanitizer;
        this._ts = _ts;
    }
    static { this.ɵfac = function AjfTextComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfTextComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.DomSanitizer), i0.ɵɵdirectiveInject(i2.TranslocoService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfTextComponent, selectors: [["ajf-text"]], inputs: { htmlText: "htmlText" }, decls: 1, vars: 1, consts: [["class", "ajf-text-container", 3, "innerHTML", 4, "ngIf"], [1, "ajf-text-container", 3, "innerHTML"]], template: function AjfTextComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfTextComponent_div_0_Template, 1, 1, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.innerHTML);
        } }, dependencies: [i3.NgIf], styles: ["ajf-text .ajf-text-container{width:100%}ajf-text .ajf-text-container .ajf-ql-size-small{font-size:.75em}ajf-text .ajf-text-container .ajf-ql-size-large{font-size:1.5em}ajf-text .ajf-text-container .ajf-ql-size-huge{font-size:2.5em}ajf-text .ajf-text-container .ajf-ql-size-veryhuge{font-size:3.5em}ajf-text .ajf-text-container .ajf-ql-align-right{text-align:right}ajf-text .ajf-text-container .ajf-ql-align-center{text-align:center}ajf-text .ajf-text-container .ajf-ql-align-justify{text-align:justify}ajf-text .ajf-text-container h1,ajf-text .ajf-text-container h2,ajf-text .ajf-text-container h3,ajf-text .ajf-text-container h4,ajf-text .ajf-text-container h5,ajf-text .ajf-text-container h6{margin:0}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfTextComponent, [{
        type: Component,
        args: [{ selector: 'ajf-text', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ajf-text-container\" *ngIf=\"innerHTML\" [innerHTML]=\"innerHTML\"></div>\n", styles: ["ajf-text .ajf-text-container{width:100%}ajf-text .ajf-text-container .ajf-ql-size-small{font-size:.75em}ajf-text .ajf-text-container .ajf-ql-size-large{font-size:1.5em}ajf-text .ajf-text-container .ajf-ql-size-huge{font-size:2.5em}ajf-text .ajf-text-container .ajf-ql-size-veryhuge{font-size:3.5em}ajf-text .ajf-text-container .ajf-ql-align-right{text-align:right}ajf-text .ajf-text-container .ajf-ql-align-center{text-align:center}ajf-text .ajf-text-container .ajf-ql-align-justify{text-align:justify}ajf-text .ajf-text-container h1,ajf-text .ajf-text-container h2,ajf-text .ajf-text-container h3,ajf-text .ajf-text-container h4,ajf-text .ajf-text-container h5,ajf-text .ajf-text-container h6{margin:0}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1.DomSanitizer }, { type: i2.TranslocoService }], { htmlText: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfTextComponent, { className: "AjfTextComponent", filePath: "text.ts", lineNumber: 45 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvdGV4dC9zcmMvdGV4dC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvdGV4dC9zcmMvdGV4dC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVCQSxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxLQUFLLEVBQ0wsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDOzs7Ozs7SUM3QnZCLHlCQUFnRjs7O0lBQTlCLCtEQUF1Qjs7QURnQ3pFOzs7O0dBSUc7QUFRSCxNQUFNLE9BQU8sZ0JBQWdCO0lBSzNCLElBQ0ksUUFBUSxDQUFDLFFBQWdCO1FBQzNCLHVEQUF1RDtRQUN2RCxNQUFNLHFCQUFxQixHQUN6QixRQUFRLElBQUksSUFBSSxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUM7WUFDNUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUM5QixDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDbkYsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxZQUNVLElBQXVCLEVBQ3ZCLGFBQTJCLEVBQzNCLEdBQXFCO1FBRnJCLFNBQUksR0FBSixJQUFJLENBQW1CO1FBQ3ZCLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQzNCLFFBQUcsR0FBSCxHQUFHLENBQWtCO0lBQzVCLENBQUM7aUhBeEJPLGdCQUFnQjtvRUFBaEIsZ0JBQWdCO1lDNUM3QixpRUFBMEU7O1lBQXpDLG9DQUFlOzs7aUZENENuQyxnQkFBZ0I7Y0FQNUIsU0FBUzsyQkFDRSxVQUFVLGlCQUdMLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU07NEdBUTNDLFFBQVE7a0JBRFgsS0FBSzs7a0ZBTEssZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1RyYW5zbG9jb1NlcnZpY2V9IGZyb20gJ0BhamYvY29yZS90cmFuc2xvY28nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RvbVNhbml0aXplciwgU2FmZUh0bWx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG4vKipcbiAqIHRoaXMgY29tcG9uZW50IG1hbmFnZXMgdGhlIHJlcG9ydCB0ZXh0XG4gKlxuICogQGV4cG9ydFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtdGV4dCcsXG4gIHRlbXBsYXRlVXJsOiAndGV4dC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3RleHQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQWpmVGV4dENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBAbWVtYmVyT2YgVGV4dENvbXBvbmVudFxuICAgKi9cbiAgcHJpdmF0ZSBfaHRtbFRleHQ6IFNhZmVIdG1sIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKVxuICBzZXQgaHRtbFRleHQoaHRtbFRleHQ6IHN0cmluZykge1xuICAgIC8vIHR5cGUgY2hlY2tpbmcgYW5kIGxlbmd0aCBjaGVja2luZyBmb3IgaW5zdGFudCBtZXRob2RcbiAgICBjb25zdCBodG1sVGV4dFRvQmVUcmFuc2xhdGU6IHN0cmluZyA9XG4gICAgICBodG1sVGV4dCAhPSBudWxsICYmIHR5cGVvZiBodG1sVGV4dCA9PT0gJ3N0cmluZycgJiYgaHRtbFRleHQudHJpbSgpLmxlbmd0aCA+IDBcbiAgICAgICAgPyB0aGlzLl90cy50cmFuc2xhdGUoaHRtbFRleHQpXG4gICAgICAgIDogaHRtbFRleHQ7XG4gICAgdGhpcy5faHRtbFRleHQgPSB0aGlzLl9kb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwoaHRtbFRleHRUb0JlVHJhbnNsYXRlKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgaW5uZXJIVE1MKCk6IFNhZmVIdG1sIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5faHRtbFRleHQ7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgX2RvbVNhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICAgIHByaXZhdGUgX3RzOiBUcmFuc2xvY29TZXJ2aWNlLFxuICApIHt9XG59XG4iLCI8ZGl2IGNsYXNzPVwiYWpmLXRleHQtY29udGFpbmVyXCIgKm5nSWY9XCJpbm5lckhUTUxcIiBbaW5uZXJIVE1MXT1cImlubmVySFRNTFwiPjwvZGl2PlxuIl19