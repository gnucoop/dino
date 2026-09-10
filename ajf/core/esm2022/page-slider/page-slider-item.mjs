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
        } }, styles: ["ajf-page-slider-item{display:block;position:relative;overflow:auto;-ms-overflow-style:none;scrollbar-width:none}ajf-page-slider-item::-webkit-scrollbar{display:none}ajf-page-slider-item .ajf-page-slider-item-content{position:absolute;top:0;right:0;left:0;padding:0;margin:0;display:flex;align-items:flex-start;justify-content:flex-start;overflow:hidden;box-sizing:border-box}ajf-page-slider-item .ajf-page-slider-item-content .ajf-page-slider-item-content-wrapper{flex:1 1 auto;display:flex;align-items:center;justify-content:center;min-width:100%;min-height:100%}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfPageSliderItem, [{
        type: Component,
        args: [{ selector: 'ajf-page-slider-item', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div #content class=\"ajf-page-slider-item-content\">\n  <div #wrapper class=\"ajf-page-slider-item-content-wrapper\">\n    <ng-content></ng-content>\n  </div>\n</div>\n", styles: ["ajf-page-slider-item{display:block;position:relative;overflow:auto;-ms-overflow-style:none;scrollbar-width:none}ajf-page-slider-item::-webkit-scrollbar{display:none}ajf-page-slider-item .ajf-page-slider-item-content{position:absolute;top:0;right:0;left:0;padding:0;margin:0;display:flex;align-items:flex-start;justify-content:flex-start;overflow:hidden;box-sizing:border-box}ajf-page-slider-item .ajf-page-slider-item-content .ajf-page-slider-item-content-wrapper{flex:1 1 auto;display:flex;align-items:center;justify-content:center;min-width:100%;min-height:100%}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zbGlkZXItaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvcGFnZS1zbGlkZXIvc3JjL3BhZ2Utc2xpZGVyLWl0ZW0udHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3BhZ2Utc2xpZGVyL3NyYy9wYWdlLXNsaWRlci1pdGVtLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsaURBQWlEO0FBRWpELE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUVOLFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFhLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBVzVDLE1BQU0sT0FBTyxpQkFBaUI7SUFlNUIsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFDRCxJQUNJLFdBQVcsQ0FBQyxHQUFZO1FBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO0lBQzFCLENBQUM7SUFNRCxJQUFJLGVBQWU7UUFDakIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDL0IsQ0FBQztJQUNELElBQ0ksZUFBZSxDQUFDLEdBQVk7UUFDOUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEdBQUcsQ0FBQztJQUM5QixDQUFDO0lBUUQsWUFBb0IsR0FBZSxFQUFVLFNBQW9CO1FBQTdDLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBckN6RCxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQTBCLENBQUM7UUFFdkQsV0FBTSxHQUF1QyxJQUFJLENBQUMsVUFHekQsQ0FBQztR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QUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBQyxDQUFDLENBQUM7UUFDN0QsQ0FBQztJQUNILENBQUM7a0hBNUlVLGlCQUFpQjtvRUFBakIsaUJBQWlCOzs7Ozs7Ozs7WUMvQzVCLEFBREYsaUNBQW1ELGdCQUNVO1lBQ3pELGtCQUF5QjtZQUU3QixBQURFLGlCQUFNLEVBQ0Y7OztpRkQ0Q08saUJBQWlCO2NBUDdCLFNBQVM7MkJBQ0Usc0JBQXNCLG1CQUdmLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUk7bUVBR0MsT0FBTztrQkFBNUMsU0FBUzttQkFBQyxTQUFTLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDO1lBQ0UsT0FBTztrQkFBNUMsU0FBUzttQkFBQyxTQUFTLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDO1lBSTNCLE1BQU07a0JBRGQsTUFBTTtZQWNILFdBQVc7a0JBRGQsS0FBSztZQWFGLGVBQWU7a0JBRGxCLEtBQUs7O2tGQTlCSyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwicmVzaXplLW9ic2VydmVyLWJyb3dzZXJcIiAvPlxuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGVib3VuY2VUaW1lfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmUGFnZVNsaWRlckl0ZW1TY3JvbGxEaXJlY3Rpb259IGZyb20gJy4vcGFnZS1zbGlkZXItaXRlbS1zY3JvbGwtZGlyZWN0aW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXBhZ2Utc2xpZGVyLWl0ZW0nLFxuICB0ZW1wbGF0ZVVybDogJ3BhZ2Utc2xpZGVyLWl0ZW0uaHRtbCcsXG4gIHN0eWxlVXJsczogWydwYWdlLXNsaWRlci1pdGVtLnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZlBhZ2VTbGlkZXJJdGVtIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZCgnd3JhcHBlcicsIHtzdGF0aWM6IHRydWV9KSB3cmFwcGVyITogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnY29udGVudCcsIHtzdGF0aWM6IHRydWV9KSBjb250ZW50ITogRWxlbWVudFJlZjtcblxuICBwcml2YXRlIF9zY3JvbGxFdnQgPSBuZXcgRXZlbnRFbWl0dGVyPHt4OiBudW1iZXI7IHk6IG51bWJlcn0+KCk7XG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBzY3JvbGw6IE9ic2VydmFibGU8e3g6IG51bWJlcjsgeTogbnVtYmVyfT4gPSB0aGlzLl9zY3JvbGxFdnQgYXMgT2JzZXJ2YWJsZTx7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbiAgfT47XG5cbiAgLyoqXG4gICAqIFRydWUgaWYgdGhlIFNsaWRlciBJdGVtIGJlbG9uZ3MgdG8gYSByZXBldGluZyBzbGlkZS5cbiAgICovXG4gIHByaXZhdGUgX2lzUmVwZWF0aW5nOiBib29sZWFuID0gZmFsc2U7XG4gIGdldCBpc1JlcGVhdGluZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNSZXBlYXRpbmc7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGlzUmVwZWF0aW5nKHJlcDogYm9vbGVhbikge1xuICAgIHRoaXMuX2lzUmVwZWF0aW5nID0gcmVwO1xuICB9XG5cbiAgLyoqXG4gICAqIFRydWUgaWYgdGhlIFNsaWRlciBJdGVtIGlzIHRoZSBsYXN0IGl0ZW0gb2YgYSByZXBlYXRpbmcgc2xpZGUuXG4gICAqL1xuICBwcml2YXRlIF9pc1JlcGVhdGluZ0xhc3Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZ2V0IGlzUmVwZWF0aW5nTGFzdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNSZXBlYXRpbmdMYXN0O1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBpc1JlcGVhdGluZ0xhc3QocmVwOiBib29sZWFuKSB7XG4gICAgdGhpcy5faXNSZXBlYXRpbmdMYXN0ID0gcmVwO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2Nyb2xsWCA9IDA7XG4gIHByaXZhdGUgX3Njcm9sbFkgPSAwO1xuICBwcml2YXRlIF9yZXNpemVPYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXIgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfcmVzaXplRXZlbnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfcmVzaXplU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICBpZiAodHlwZW9mIFJlc2l6ZU9ic2VydmVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5fcmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gdGhpcy5fb25SZXNpemUoKSk7XG4gICAgICB0aGlzLl9yZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIHRoaXMuX3Jlc2l6ZVN1YiA9IHRoaXMuX3Jlc2l6ZUV2ZW50XG4gICAgICAucGlwZShkZWJvdW5jZVRpbWUoMzAwKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fZml4U2Nyb2xsT25SZXNpemUoKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMuX3Jlc2l6ZU9ic2VydmVyLnVub2JzZXJ2ZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gICAgdGhpcy5fcmVzaXplRXZlbnQuY29tcGxldGUoKTtcbiAgICB0aGlzLl9yZXNpemVTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHNldFNjcm9sbChkaXI6IEFqZlBhZ2VTbGlkZXJJdGVtU2Nyb2xsRGlyZWN0aW9uLCBhbW91bnQ6IG51bWJlciwgX2R1cmF0aW9uOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5fZWwgPT0gbnVsbCB8fCB0aGlzLndyYXBwZXIgPT0gbnVsbCB8fCBhbW91bnQgPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgZWwgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IHdyYXBwZXIgPSB0aGlzLndyYXBwZXIubmF0aXZlRWxlbWVudDtcbiAgICBsZXQgY29udGFpbmVyU2l6ZSwgd3JhcHBlclNpemUsIGN1cnJlbnRTY3JvbGw7XG4gICAgaWYgKGRpciA9PT0gJ3gnKSB7XG4gICAgICBjb250YWluZXJTaXplID0gZWwuY2xpZW50V2lkdGg7XG4gICAgICB3cmFwcGVyU2l6ZSA9IHdyYXBwZXIuY2xpZW50V2lkdGg7XG4gICAgICBjdXJyZW50U2Nyb2xsID0gdGhpcy5fc2Nyb2xsWDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29udGFpbmVyU2l6ZSA9IGVsLmNsaWVudEhlaWdodDtcbiAgICAgIHdyYXBwZXJTaXplID0gd3JhcHBlci5jbGllbnRIZWlnaHQ7XG4gICAgICBjdXJyZW50U2Nyb2xsID0gdGhpcy5fc2Nyb2xsWTtcbiAgICB9XG4gICAgY29uc3QgbWF4U2Nyb2xsID0gY29udGFpbmVyU2l6ZSAtIHdyYXBwZXJTaXplO1xuICAgIGlmIChcbiAgICAgIHdyYXBwZXJTaXplIDw9IGNvbnRhaW5lclNpemUgfHxcbiAgICAgIChjdXJyZW50U2Nyb2xsID09PSBtYXhTY3JvbGwgJiYgYW1vdW50IDwgMCkgfHxcbiAgICAgIChjdXJyZW50U2Nyb2xsID09PSAwICYmIGFtb3VudCA+IDApXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChhbW91bnQgPCAwKSB7XG4gICAgICBpZiAoZGlyID09PSAneCcpIHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsWCA9IE1hdGgubWF4KG1heFNjcm9sbCwgdGhpcy5fc2Nyb2xsWCArIGFtb3VudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zY3JvbGxZID0gTWF0aC5tYXgobWF4U2Nyb2xsLCB0aGlzLl9zY3JvbGxZICsgYW1vdW50KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGRpciA9PT0gJ3gnKSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbFggPSBNYXRoLm1pbigwLCB0aGlzLl9zY3JvbGxYICsgYW1vdW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbFkgPSBNYXRoLm1pbigwLCB0aGlzLl9zY3JvbGxZICsgYW1vdW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICB3cmFwcGVyLFxuICAgICAgJ3RyYW5zZm9ybScsXG4gICAgICBgdHJhbnNsYXRlKCR7dGhpcy5fc2Nyb2xsWH1weCwgJHt0aGlzLl9zY3JvbGxZfXB4KWAsXG4gICAgKTtcbiAgICB0aGlzLl9zY3JvbGxFdnQuZW1pdCh7eDogdGhpcy5fc2Nyb2xsWCwgeTogdGhpcy5fc2Nyb2xsWX0pO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfb25SZXNpemUoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVzaXplRXZlbnQuZW1pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZml4U2Nyb2xsT25SZXNpemUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29udGVudCA9PSBudWxsIHx8IHRoaXMud3JhcHBlciA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmNvbnRlbnQubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCB3cmFwcGVyID0gdGhpcy53cmFwcGVyLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgbWF4U2Nyb2xsWCA9IE1hdGgubWluKDAsIGNvbnRlbnQuY2xpZW50V2lkdGggLSB3cmFwcGVyLmNsaWVudFdpZHRoKTtcbiAgICBjb25zdCBtYXhTY3JvbGxZID0gTWF0aC5taW4oMCwgY29udGVudC5jbGllbnRIZWlnaHQgLSB3cmFwcGVyLmNsaWVudEhlaWdodCk7XG4gICAgaWYgKFxuICAgICAgbWF4U2Nyb2xsWCAhPT0gMCB8fFxuICAgICAgbWF4U2Nyb2xsWSAhPT0gMCB8fFxuICAgICAgKG1heFNjcm9sbFggPT09IDAgJiYgdGhpcy5fc2Nyb2xsWCAhPT0gMCkgfHxcbiAgICAgIChtYXhTY3JvbGxZID09PSAwICYmIHRoaXMuX3Njcm9sbFkgIT09IDApXG4gICAgKSB7XG4gICAgICB0aGlzLl9zY3JvbGxYID0gTWF0aC5tYXgoXG4gICAgICAgIG1heFNjcm9sbFgsXG4gICAgICAgIHRoaXMuX3Njcm9sbFggLSAoY29udGVudC5zY3JvbGxMZWZ0ICE9IG51bGwgPyBjb250ZW50LnNjcm9sbExlZnQgOiAwKSxcbiAgICAgICk7XG4gICAgICB0aGlzLl9zY3JvbGxZID0gTWF0aC5tYXgoXG4gICAgICAgIG1heFNjcm9sbFksXG4gICAgICAgIHRoaXMuX3Njcm9sbFkgLSAoY29udGVudC5zY3JvbGxUb3AgIT0gbnVsbCA/IGNvbnRlbnQuc2Nyb2xsVG9wIDogMCksXG4gICAgICApO1xuICAgICAgY29udGVudC5zY3JvbGxUb3AgPSBjb250ZW50LnNjcm9sbExlZnQgPSAwO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgIHdyYXBwZXIsXG4gICAgICAgICd0cmFuc2Zvcm0nLFxuICAgICAgICBgdHJhbnNsYXRlKCR7dGhpcy5fc2Nyb2xsWH1weCwgJHt0aGlzLl9zY3JvbGxZfXB4KWAsXG4gICAgICApO1xuICAgICAgdGhpcy5fc2Nyb2xsRXZ0LmVtaXQoe3g6IHRoaXMuX3Njcm9sbFgsIHk6IHRoaXMuX3Njcm9sbFl9KTtcbiAgICB9XG4gIH1cbn1cbiIsIjxkaXYgI2NvbnRlbnQgY2xhc3M9XCJhamYtcGFnZS1zbGlkZXItaXRlbS1jb250ZW50XCI+XG4gIDxkaXYgI3dyYXBwZXIgY2xhc3M9XCJhamYtcGFnZS1zbGlkZXItaXRlbS1jb250ZW50LXdyYXBwZXJcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=