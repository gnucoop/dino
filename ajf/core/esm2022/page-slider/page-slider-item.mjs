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
/// <reference types="resize-observer-browser" />
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation, } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as i0 from "@angular/core";
const _c0 = ["wrapper"];
const _c1 = ["content"];
const _c2 = ["*"];
export class AjfPageSliderItem {
    get isRepeating() {
        return this._isRepeating;
    }
    set isRepeating(rep) {
        this._isRepeating = rep;
    }
    get isRepeatingLast() {
        return this._isRepeatingLast;
    }
    set isRepeatingLast(rep) {
        this._isRepeatingLast = rep;
    }
    /**
     * The element that scrolls when the page holds more than fits: the host
     * itself, which carries `overflow: auto`. Exposed for the slider, which
     * reports how much of it is left below the fold.
     */
    get scroller() {
        return this._el.nativeElement;
    }
    constructor(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this._scrollEvt = new EventEmitter();
        this.scroll = this._scrollEvt;
        /**
         * True if the Slider Item belongs to a repeting slide.
         */
        this._isRepeating = false;
        /**
         * True if the Slider Item is the last item of a repeating slide.
         */
        this._isRepeatingLast = false;
        this._scrollX = 0;
        this._scrollY = 0;
        this._resizeObserver = null;
        this._resizeEvent = new EventEmitter();
        this._resizeSub = Subscription.EMPTY;
        if (typeof ResizeObserver !== 'undefined') {
            this._resizeObserver = new ResizeObserver(() => this._onResize());
            this._resizeObserver.observe(this._el.nativeElement);
        }
        this._resizeSub = this._resizeEvent
            .pipe(debounceTime(300))
            .subscribe(() => this._fixScrollOnResize());
    }
    ngOnDestroy() {
        if (this._resizeObserver) {
            this._resizeObserver.unobserve(this._el.nativeElement);
        }
        this._resizeEvent.complete();
        this._resizeSub.unsubscribe();
    }
    setScroll(dir, amount, _duration) {
        if (this._el == null || this.wrapper == null || amount === 0) {
            return false;
        }
        const el = this._el.nativeElement;
        const wrapper = this.wrapper.nativeElement;
        let containerSize, wrapperSize, currentScroll;
        if (dir === 'x') {
            containerSize = el.clientWidth;
            wrapperSize = wrapper.clientWidth;
            currentScroll = this._scrollX;
        }
        else {
            containerSize = el.clientHeight;
            wrapperSize = wrapper.clientHeight;
            currentScroll = this._scrollY;
        }
        const maxScroll = containerSize - wrapperSize;
        if (wrapperSize <= containerSize ||
            (currentScroll === maxScroll && amount < 0) ||
            (currentScroll === 0 && amount > 0)) {
            return false;
        }
        if (amount < 0) {
            if (dir === 'x') {
                this._scrollX = Math.max(maxScroll, this._scrollX + amount);
            }
            else {
                this._scrollY = Math.max(maxScroll, this._scrollY + amount);
            }
        }
        else {
            if (dir === 'x') {
                this._scrollX = Math.min(0, this._scrollX + amount);
            }
            else {
                this._scrollY = Math.min(0, this._scrollY + amount);
            }
        }
        this._renderer.setStyle(wrapper, 'transform', `translate(${this._scrollX}px, ${this._scrollY}px)`);
        this._scrollEvt.emit({ x: this._scrollX, y: this._scrollY });
        return true;
    }
    _onResize() {
        this._resizeEvent.emit();
    }
    _fixScrollOnResize() {
        if (this.content == null || this.wrapper == null) {
            return;
        }
        const content = this.content.nativeElement;
        const wrapper = this.wrapper.nativeElement;
        const maxScrollX = Math.min(0, content.clientWidth - wrapper.clientWidth);
        const maxScrollY = Math.min(0, content.clientHeight - wrapper.clientHeight);
        if (maxScrollX !== 0 ||
            maxScrollY !== 0 ||
            (maxScrollX === 0 && this._scrollX !== 0) ||
            (maxScrollY === 0 && this._scrollY !== 0)) {
            this._scrollX = Math.max(maxScrollX, this._scrollX - (content.scrollLeft != null ? content.scrollLeft : 0));
            this._scrollY = Math.max(maxScrollY, this._scrollY - (content.scrollTop != null ? content.scrollTop : 0));
            content.scrollTop = content.scrollLeft = 0;
            this._renderer.setStyle(wrapper, 'transform', `translate(${this._scrollX}px, ${this._scrollY}px)`);
            this._scrollEvt.emit({ x: this._scrollX, y: this._scrollY });
        }
    }
    static { this.ɵfac = function AjfPageSliderItem_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfPageSliderItem)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfPageSliderItem, selectors: [["ajf-page-slider-item"]], viewQuery: function AjfPageSliderItem_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 7);
            i0.ɵɵviewQuery(_c1, 7);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.wrapper = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.content = _t.first);
        } }, inputs: { isRepeating: "isRepeating", isRepeatingLast: "isRepeatingLast" }, outputs: { scroll: "scroll" }, ngContentSelectors: _c2, decls: 5, vars: 0, consts: [["content", ""], ["wrapper", ""], [1, "ajf-page-slider-item-content"], [1, "ajf-page-slider-item-content-wrapper"]], template: function AjfPageSliderItem_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef();
            i0.ɵɵelementStart(0, "div", 2, 0)(2, "div", 3, 1);
            i0.ɵɵprojection(4);
            i0.ɵɵelementEnd()();
        } }, styles: ["ajf-page-slider-item{display:block;position:relative;overflow:auto}ajf-page-slider-item .ajf-page-slider-item-content{position:absolute;top:0;right:0;left:0;padding:0;margin:0;display:flex;align-items:flex-start;justify-content:flex-start;overflow:hidden;box-sizing:border-box}ajf-page-slider-item .ajf-page-slider-item-content .ajf-page-slider-item-content-wrapper{flex:1 1 auto;display:flex;align-items:center;justify-content:center;min-width:100%;min-height:100%}ajf-page-slider ajf-page-slider-item::-webkit-scrollbar{width:6px;height:6px}ajf-page-slider ajf-page-slider-item::-webkit-scrollbar-track{background:transparent}ajf-page-slider ajf-page-slider-item::-webkit-scrollbar-thumb{border-radius:6px;background:var(--ajf-scrollbar, color-mix(in srgb, currentColor 25%, transparent))}ajf-page-slider ajf-page-slider-item::-webkit-scrollbar-thumb:hover{background:var(--ajf-scrollbar-hover, var(--ajf-scrollbar, color-mix(in srgb, currentColor 40%, transparent)))}@supports not selector(::-webkit-scrollbar){ajf-page-slider ajf-page-slider-item{scrollbar-width:thin;scrollbar-color:var(--ajf-scrollbar, color-mix(in srgb, currentColor 25%, transparent)) transparent}}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfPageSliderItem, [{
        type: Component,
        args: [{ selector: 'ajf-page-slider-item', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div #content class=\"ajf-page-slider-item-content\">\n  <div #wrapper class=\"ajf-page-slider-item-content-wrapper\">\n    <ng-content></ng-content>\n  </div>\n</div>\n", styles: ["ajf-page-slider-item{display:block;position:relative;overflow:auto}ajf-page-slider-item .ajf-page-slider-item-content{position:absolute;top:0;right:0;left:0;padding:0;margin:0;display:flex;align-items:flex-start;justify-content:flex-start;overflow:hidden;box-sizing:border-box}ajf-page-slider-item .ajf-page-slider-item-content .ajf-page-slider-item-content-wrapper{flex:1 1 auto;display:flex;align-items:center;justify-content:center;min-width:100%;min-height:100%}ajf-page-slider ajf-page-slider-item::-webkit-scrollbar{width:6px;height:6px}ajf-page-slider ajf-page-slider-item::-webkit-scrollbar-track{background:transparent}ajf-page-slider ajf-page-slider-item::-webkit-scrollbar-thumb{border-radius:6px;background:var(--ajf-scrollbar, color-mix(in srgb, currentColor 25%, transparent))}ajf-page-slider ajf-page-slider-item::-webkit-scrollbar-thumb:hover{background:var(--ajf-scrollbar-hover, var(--ajf-scrollbar, color-mix(in srgb, currentColor 40%, transparent)))}@supports not selector(::-webkit-scrollbar){ajf-page-slider ajf-page-slider-item{scrollbar-width:thin;scrollbar-color:var(--ajf-scrollbar, color-mix(in srgb, currentColor 25%, transparent)) transparent}}\n"] }]
    }], () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], { wrapper: [{
            type: ViewChild,
            args: ['wrapper', { static: true }]
        }], content: [{
            type: ViewChild,
            args: ['content', { static: true }]
        }], scroll: [{
            type: Output
        }], isRepeating: [{
            type: Input
        }], isRepeatingLast: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfPageSliderItem, { className: "AjfPageSliderItem", filePath: "page-slider-item.ts", lineNumber: 49 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zbGlkZXItaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvcGFnZS1zbGlkZXIvc3JjL3BhZ2Utc2xpZGVyLWl0ZW0udHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3BhZ2Utc2xpZGVyL3NyYy9wYWdlLXNsaWRlci1pdGVtLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsaURBQWlEO0FBRWpELE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUVOLFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFhLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBVzVDLE1BQU0sT0FBTyxpQkFBaUI7SUFlNUIsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFDRCxJQUNJLFdBQVcsQ0FBQyxHQUFZO1FBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO0lBQzFCLENBQUM7SUFNRCxJQUFJLGVBQWU7UUFDakIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDL0IsQ0FBQztJQUNELElBQ0ksZUFBZSxDQUFDLEdBQVk7UUFDOUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEdBQUcsQ0FBQztJQUM5QixDQUFDO0lBUUQ7Ozs7T0FJRztJQUNILElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUE0QixDQUFDO0lBQy9DLENBQUM7SUFFRCxZQUFvQixHQUFlLEVBQVUsU0FBb0I7UUFBN0MsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENB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Q1AsV0FBVyxFQUNYLGFBQWEsSUFBSSxDQUFDLFFBQVEsT0FBTyxJQUFJLENBQUMsUUFBUSxLQUFLLENBQ3BELENBQUM7WUFDRixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztRQUM3RCxDQUFDO0lBQ0gsQ0FBQztrSEFySlUsaUJBQWlCO29FQUFqQixpQkFBaUI7Ozs7Ozs7OztZQy9DNUIsQUFERixpQ0FBbUQsZ0JBQ1U7WUFDekQsa0JBQXlCO1lBRTdCLEFBREUsaUJBQU0sRUFDRjs7O2lGRDRDTyxpQkFBaUI7Y0FQN0IsU0FBUzsyQkFDRSxzQkFBc0IsbUJBR2YsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTttRUFHQyxPQUFPO2tCQUE1QyxTQUFTO21CQUFDLFNBQVMsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7WUFDRSxPQUFPO2tCQUE1QyxTQUFTO21CQUFDLFNBQVMsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7WUFJM0IsTUFBTTtrQkFEZCxNQUFNO1lBY0gsV0FBVztrQkFEZCxLQUFLO1lBYUYsZUFBZTtrQkFEbEIsS0FBSzs7a0ZBOUJLLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJyZXNpemUtb2JzZXJ2ZXItYnJvd3NlclwiIC8+XG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtkZWJvdW5jZVRpbWV9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZQYWdlU2xpZGVySXRlbVNjcm9sbERpcmVjdGlvbn0gZnJvbSAnLi9wYWdlLXNsaWRlci1pdGVtLXNjcm9sbC1kaXJlY3Rpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcGFnZS1zbGlkZXItaXRlbScsXG4gIHRlbXBsYXRlVXJsOiAncGFnZS1zbGlkZXItaXRlbS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3BhZ2Utc2xpZGVyLWl0ZW0uc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmUGFnZVNsaWRlckl0ZW0gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKCd3cmFwcGVyJywge3N0YXRpYzogdHJ1ZX0pIHdyYXBwZXIhOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdjb250ZW50Jywge3N0YXRpYzogdHJ1ZX0pIGNvbnRlbnQhOiBFbGVtZW50UmVmO1xuXG4gIHByaXZhdGUgX3Njcm9sbEV2dCA9IG5ldyBFdmVudEVtaXR0ZXI8e3g6IG51bWJlcjsgeTogbnVtYmVyfT4oKTtcbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IHNjcm9sbDogT2JzZXJ2YWJsZTx7eDogbnVtYmVyOyB5OiBudW1iZXJ9PiA9IHRoaXMuX3Njcm9sbEV2dCBhcyBPYnNlcnZhYmxlPHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuICB9PjtcblxuICAvKipcbiAgICogVHJ1ZSBpZiB0aGUgU2xpZGVyIEl0ZW0gYmVsb25ncyB0byBhIHJlcGV0aW5nIHNsaWRlLlxuICAgKi9cbiAgcHJpdmF0ZSBfaXNSZXBlYXRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZ2V0IGlzUmVwZWF0aW5nKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc1JlcGVhdGluZztcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgaXNSZXBlYXRpbmcocmVwOiBib29sZWFuKSB7XG4gICAgdGhpcy5faXNSZXBlYXRpbmcgPSByZXA7XG4gIH1cblxuICAvKipcbiAgICogVHJ1ZSBpZiB0aGUgU2xpZGVyIEl0ZW0gaXMgdGhlIGxhc3QgaXRlbSBvZiBhIHJlcGVhdGluZyBzbGlkZS5cbiAgICovXG4gIHByaXZhdGUgX2lzUmVwZWF0aW5nTGFzdDogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXQgaXNSZXBlYXRpbmdMYXN0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc1JlcGVhdGluZ0xhc3Q7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGlzUmVwZWF0aW5nTGFzdChyZXA6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pc1JlcGVhdGluZ0xhc3QgPSByZXA7XG4gIH1cblxuICBwcml2YXRlIF9zY3JvbGxYID0gMDtcbiAgcHJpdmF0ZSBfc2Nyb2xsWSA9IDA7XG4gIHByaXZhdGUgX3Jlc2l6ZU9ic2VydmVyOiBSZXNpemVPYnNlcnZlciB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9yZXNpemVFdmVudDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9yZXNpemVTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAvKipcbiAgICogVGhlIGVsZW1lbnQgdGhhdCBzY3JvbGxzIHdoZW4gdGhlIHBhZ2UgaG9sZHMgbW9yZSB0aGFuIGZpdHM6IHRoZSBob3N0XG4gICAqIGl0c2VsZiwgd2hpY2ggY2FycmllcyBgb3ZlcmZsb3c6IGF1dG9gLiBFeHBvc2VkIGZvciB0aGUgc2xpZGVyLCB3aGljaFxuICAgKiByZXBvcnRzIGhvdyBtdWNoIG9mIGl0IGlzIGxlZnQgYmVsb3cgdGhlIGZvbGQuXG4gICAqL1xuICBnZXQgc2Nyb2xsZXIoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLl9lbC5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICBpZiAodHlwZW9mIFJlc2l6ZU9ic2VydmVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5fcmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gdGhpcy5fb25SZXNpemUoKSk7XG4gICAgICB0aGlzLl9yZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIHRoaXMuX3Jlc2l6ZVN1YiA9IHRoaXMuX3Jlc2l6ZUV2ZW50XG4gICAgICAucGlwZShkZWJvdW5jZVRpbWUoMzAwKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fZml4U2Nyb2xsT25SZXNpemUoKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMuX3Jlc2l6ZU9ic2VydmVyLnVub2JzZXJ2ZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gICAgdGhpcy5fcmVzaXplRXZlbnQuY29tcGxldGUoKTtcbiAgICB0aGlzLl9yZXNpemVTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHNldFNjcm9sbChkaXI6IEFqZlBhZ2VTbGlkZXJJdGVtU2Nyb2xsRGlyZWN0aW9uLCBhbW91bnQ6IG51bWJlciwgX2R1cmF0aW9uOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5fZWwgPT0gbnVsbCB8fCB0aGlzLndyYXBwZXIgPT0gbnVsbCB8fCBhbW91bnQgPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgZWwgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IHdyYXBwZXIgPSB0aGlzLndyYXBwZXIubmF0aXZlRWxlbWVudDtcbiAgICBsZXQgY29udGFpbmVyU2l6ZSwgd3JhcHBlclNpemUsIGN1cnJlbnRTY3JvbGw7XG4gICAgaWYgKGRpciA9PT0gJ3gnKSB7XG4gICAgICBjb250YWluZXJTaXplID0gZWwuY2xpZW50V2lkdGg7XG4gICAgICB3cmFwcGVyU2l6ZSA9IHdyYXBwZXIuY2xpZW50V2lkdGg7XG4gICAgICBjdXJyZW50U2Nyb2xsID0gdGhpcy5fc2Nyb2xsWDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29udGFpbmVyU2l6ZSA9IGVsLmNsaWVudEhlaWdodDtcbiAgICAgIHdyYXBwZXJTaXplID0gd3JhcHBlci5jbGllbnRIZWlnaHQ7XG4gICAgICBjdXJyZW50U2Nyb2xsID0gdGhpcy5fc2Nyb2xsWTtcbiAgICB9XG4gICAgY29uc3QgbWF4U2Nyb2xsID0gY29udGFpbmVyU2l6ZSAtIHdyYXBwZXJTaXplO1xuICAgIGlmIChcbiAgICAgIHdyYXBwZXJTaXplIDw9IGNvbnRhaW5lclNpemUgfHxcbiAgICAgIChjdXJyZW50U2Nyb2xsID09PSBtYXhTY3JvbGwgJiYgYW1vdW50IDwgMCkgfHxcbiAgICAgIChjdXJyZW50U2Nyb2xsID09PSAwICYmIGFtb3VudCA+IDApXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChhbW91bnQgPCAwKSB7XG4gICAgICBpZiAoZGlyID09PSAneCcpIHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsWCA9IE1hdGgubWF4KG1heFNjcm9sbCwgdGhpcy5fc2Nyb2xsWCArIGFtb3VudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zY3JvbGxZID0gTWF0aC5tYXgobWF4U2Nyb2xsLCB0aGlzLl9zY3JvbGxZICsgYW1vdW50KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGRpciA9PT0gJ3gnKSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbFggPSBNYXRoLm1pbigwLCB0aGlzLl9zY3JvbGxYICsgYW1vdW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbFkgPSBNYXRoLm1pbigwLCB0aGlzLl9zY3JvbGxZICsgYW1vdW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICB3cmFwcGVyLFxuICAgICAgJ3RyYW5zZm9ybScsXG4gICAgICBgdHJhbnNsYXRlKCR7dGhpcy5fc2Nyb2xsWH1weCwgJHt0aGlzLl9zY3JvbGxZfXB4KWAsXG4gICAgKTtcbiAgICB0aGlzLl9zY3JvbGxFdnQuZW1pdCh7eDogdGhpcy5fc2Nyb2xsWCwgeTogdGhpcy5fc2Nyb2xsWX0pO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfb25SZXNpemUoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVzaXplRXZlbnQuZW1pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZml4U2Nyb2xsT25SZXNpemUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29udGVudCA9PSBudWxsIHx8IHRoaXMud3JhcHBlciA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmNvbnRlbnQubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCB3cmFwcGVyID0gdGhpcy53cmFwcGVyLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgbWF4U2Nyb2xsWCA9IE1hdGgubWluKDAsIGNvbnRlbnQuY2xpZW50V2lkdGggLSB3cmFwcGVyLmNsaWVudFdpZHRoKTtcbiAgICBjb25zdCBtYXhTY3JvbGxZID0gTWF0aC5taW4oMCwgY29udGVudC5jbGllbnRIZWlnaHQgLSB3cmFwcGVyLmNsaWVudEhlaWdodCk7XG4gICAgaWYgKFxuICAgICAgbWF4U2Nyb2xsWCAhPT0gMCB8fFxuICAgICAgbWF4U2Nyb2xsWSAhPT0gMCB8fFxuICAgICAgKG1heFNjcm9sbFggPT09IDAgJiYgdGhpcy5fc2Nyb2xsWCAhPT0gMCkgfHxcbiAgICAgIChtYXhTY3JvbGxZID09PSAwICYmIHRoaXMuX3Njcm9sbFkgIT09IDApXG4gICAgKSB7XG4gICAgICB0aGlzLl9zY3JvbGxYID0gTWF0aC5tYXgoXG4gICAgICAgIG1heFNjcm9sbFgsXG4gICAgICAgIHRoaXMuX3Njcm9sbFggLSAoY29udGVudC5zY3JvbGxMZWZ0ICE9IG51bGwgPyBjb250ZW50LnNjcm9sbExlZnQgOiAwKSxcbiAgICAgICk7XG4gICAgICB0aGlzLl9zY3JvbGxZID0gTWF0aC5tYXgoXG4gICAgICAgIG1heFNjcm9sbFksXG4gICAgICAgIHRoaXMuX3Njcm9sbFkgLSAoY29udGVudC5zY3JvbGxUb3AgIT0gbnVsbCA/IGNvbnRlbnQuc2Nyb2xsVG9wIDogMCksXG4gICAgICApO1xuICAgICAgY29udGVudC5zY3JvbGxUb3AgPSBjb250ZW50LnNjcm9sbExlZnQgPSAwO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgIHdyYXBwZXIsXG4gICAgICAgICd0cmFuc2Zvcm0nLFxuICAgICAgICBgdHJhbnNsYXRlKCR7dGhpcy5fc2Nyb2xsWH1weCwgJHt0aGlzLl9zY3JvbGxZfXB4KWAsXG4gICAgICApO1xuICAgICAgdGhpcy5fc2Nyb2xsRXZ0LmVtaXQoe3g6IHRoaXMuX3Njcm9sbFgsIHk6IHRoaXMuX3Njcm9sbFl9KTtcbiAgICB9XG4gIH1cbn1cbiIsIjxkaXYgI2NvbnRlbnQgY2xhc3M9XCJhamYtcGFnZS1zbGlkZXItaXRlbS1jb250ZW50XCI+XG4gIDxkaXYgI3dyYXBwZXIgY2xhc3M9XCJhamYtcGFnZS1zbGlkZXItaXRlbS1jb250ZW50LXdyYXBwZXJcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=