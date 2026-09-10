import * as i0 from '@angular/core';
import { EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, Component, Input, Output, ViewChild, Directive, ContentChildren, NgModule } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime, map, filter, scan, throttleTime } from 'rxjs/operators';
import * as i1 from '@angular/animations';
import { animate, style } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

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
const _c0$1 = ["wrapper"];
const _c1 = ["content"];
const _c2 = ["*"];
class AjfPageSliderItem {
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
            i0.ɵɵviewQuery(_c0$1, 7);
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
const _c0 = ["body"];
class AjfPageSlider {
    get orientation() {
        return this._orientation;
    }
    set orientation(orientation) {
        if (this._orientation !== orientation) {
            this._orientation = orientation;
            this._cdr.markForCheck();
            this._updateSize();
            this._restoreCurrentPage();
            this._orientationChange.emit(this._orientation);
        }
    }
    get fixedOrientation() {
        return this._fixedOrientation;
    }
    set fixedOrientation(_) {
        // Keep true to disable the change orientation button
        // this._fixedOrientation = coerceBooleanProperty(fixedOrientation);
        // this._cdr.markForCheck();
    }
    get currentPage() {
        return this._currentPage;
    }
    set currentPage(currentPage) {
        if (this.pages == null || currentPage < 0 || currentPage >= this.pages.length) {
            return;
        }
        this._currentPage = currentPage;
        this._doSlide();
    }
    get hideNavigationButtons() {
        return this._hideNavigationButtons;
    }
    set hideNavigationButtons(hnb) {
        this._hideNavigationButtons = coerceBooleanProperty(hnb);
        this._cdr.markForCheck();
    }
    constructor(_animationBuilder, _cdr, _renderer) {
        this._animationBuilder = _animationBuilder;
        this._cdr = _cdr;
        this._renderer = _renderer;
        this._pageScrollFinish = new EventEmitter();
        this.pageScrollFinish = this._pageScrollFinish;
        this._orientationChange = new EventEmitter();
        this.orientationChange = this
            ._orientationChange;
        this.duration = 300;
        this._orientation = 'horizontal';
        this._fixedOrientation = true;
        this._currentPage = -1;
        this._hideNavigationButtons = false;
        /**
         * If true, disable scroll movement calculation in the form.
         * If false, when touching the form fields, scroll to the next field.
         */
        this._disableTouchMovement = true;
        this._animating = false;
        this._pagesSub = Subscription.EMPTY;
        this._currentOrigin = null;
        this._mouseWheelEvt = new EventEmitter();
        this._mouseWheelSub = Subscription.EMPTY;
        this._mouseWheelSub = this._mouseWheelEvt
            .pipe(map(evt => {
            const page = this._getCurrentPage();
            if (page == null) {
                return null;
            }
            return { evt, res: page.setScroll(evt.dir, evt.amount, 0) };
        }), filter(r => r != null &&
            r.res === false &&
            ((r.evt.dir === 'x' && this.orientation === 'horizontal') ||
                (r.evt.dir === 'y' && this.orientation === 'vertical'))), map(r => r.evt.amount), scan((acc, val) => {
            if (acc === 0) {
                return val;
            }
            if (acc / Math.abs(acc) !== val / Math.abs(val)) {
                return 0;
            }
            return acc + val;
        }, 0), filter(val => !this._animating && Math.abs(val) > 150), throttleTime(1500))
            .subscribe(val => {
            this._mouseWheelEvt.emit({ dir: 'x', amount: val > 0 ? -1 : +1 });
            this.slide({ dir: val > 0 ? 'back' : 'forward' });
        });
    }
    ngAfterContentInit() {
        // Size the body for the pages that are already there. Relying on
        // `pages.changes` alone only worked while the pages appeared in a later
        // change detection pass than the slider itself; when a caller creates both
        // together the event never fires, and every page would end up sharing one
        // page's worth of space.
        this._onSlidesChange();
        this._pagesSub = this.pages.changes.subscribe(() => {
            this._onSlidesChange();
            this._cdr.detectChanges();
        });
    }
    ngOnDestroy() {
        this._pagesSub.unsubscribe();
        this._mouseWheelEvt.complete();
        this._mouseWheelSub.unsubscribe();
        this._orientationChange.complete();
    }
    switchOrientation() {
        if (this._orientation === 'horizontal') {
            this.orientation = 'vertical';
        }
        else {
            this.orientation = 'horizontal';
        }
    }
    slide(opts) {
        if (this.pages == null) {
            return;
        }
        if (opts.dir) {
            if (opts.dir === 'back' || opts.dir === 'up' || opts.dir === 'left') {
                this._slideBack();
            }
            else if (opts.dir === 'forward' || opts.dir === 'down' || opts.dir === 'right') {
                this._slideForward();
            }
        }
        else if (opts.to != null) {
            this._slideTo(opts.to);
        }
    }
    onMouseWheel(event) {
        const evt = event;
        if (evt.deltaX == null || evt.deltaY == null || this._disableTouchMovement) {
            return;
        }
        const absDeltaX = Math.abs(evt.deltaX);
        const absDeltaY = Math.abs(evt.deltaY);
        if (absDeltaX === 0 && absDeltaY === 0) {
            return;
        }
        if (absDeltaX > absDeltaY) {
            this._mouseWheelEvt.emit({ dir: 'x', amount: -evt.deltaX });
        }
        else {
            this._mouseWheelEvt.emit({ dir: 'y', amount: -evt.deltaY });
        }
    }
    onTouchStart(evt) {
        if (evt.touches == null ||
            evt.touches.length === 0 ||
            this._animating ||
            this._disableTouchMovement) {
            return;
        }
        this._currentOrigin = {
            x: evt.touches[0].clientX,
            y: evt.touches[0].clientY,
            time: +new Date(),
        };
    }
    onTouchMove(evt) {
        if (evt.touches == null ||
            evt.touches.length === 0 ||
            this._currentOrigin == null ||
            this._animating ||
            this._disableTouchMovement) {
            return;
        }
        const point = {
            x: evt.touches[0].clientX,
            y: evt.touches[0].clientY,
            time: +new Date(),
        };
        const movement = this._calculateMovement(point);
        this._currentOrigin = point;
        if (movement.velocityX === 0 && movement.velocityY === 0) {
            return;
        }
        const absVelocityX = Math.abs(movement.velocityX);
        const absVelocityY = Math.abs(movement.velocityY);
        if (absVelocityX > absVelocityY) {
            if (this.orientation === 'horizontal' &&
                absVelocityX > 1.5 &&
                Math.abs(movement.deltaX) > 50) {
                this._resetCurrentOrigin();
                this.slide({ dir: movement.velocityX < 0 ? 'forward' : 'back' });
            }
            else {
                const page = this._getCurrentPage();
                if (page != null) {
                    page.setScroll('x', movement.deltaX, movement.deltaTime);
                }
            }
        }
        else {
            if (this.orientation === 'vertical' && absVelocityY > 1.5 && Math.abs(movement.deltaY) > 50) {
                this._resetCurrentOrigin();
                this.slide({ dir: movement.velocityY < 0 ? 'forward' : 'back' });
            }
            else {
                const page = this._getCurrentPage();
                if (page != null) {
                    page.setScroll('y', movement.deltaY, movement.deltaTime);
                }
            }
        }
    }
    onTouchEnd() {
        if (this._disableTouchMovement) {
            return;
        }
        this._resetCurrentOrigin();
    }
    isCurrentPageLong() {
        const curPage = this._getCurrentPage();
        if (curPage == null) {
            return false;
        }
        return curPage.wrapper.nativeElement.clientHeight > curPage.content.nativeElement.clientHeight;
    }
    _resetCurrentOrigin() {
        this._currentOrigin = null;
    }
    _getCurrentPage() {
        if (this.pages == null || this.currentPage < 0 || this.currentPage >= this.pages.length) {
            return null;
        }
        return this.pages.toArray()[this.currentPage];
    }
    _calculateMovement(point) {
        const deltaX = point.x - this._currentOrigin.x;
        const deltaY = point.y - this._currentOrigin.y;
        const deltaTime = point.time - this._currentOrigin.time;
        return {
            velocityX: deltaX / deltaTime,
            deltaX,
            velocityY: deltaY / deltaTime,
            deltaY,
            deltaTime,
        };
    }
    _slideBack() {
        if (this._currentPage <= 0) {
            return;
        }
        this.currentPage = this._currentPage - 1;
    }
    _slideForward() {
        if (this._currentPage >= this.pages.length) {
            return;
        }
        this.currentPage = this._currentPage + 1;
    }
    _slideTo(page) {
        if (page >= 0 && page < this.pages.length) {
            this.currentPage = page;
        }
    }
    _doSlide(immediate = false) {
        if (this.body == null || this.pages == null || this._animating) {
            return;
        }
        this._animating = true;
        const animation = this._animationBuilder.build(animate(immediate ? 0 : this.duration, style({ transform: this._getCurrentTranslation() })));
        const player = animation.create(this.body.nativeElement);
        player.onDone(() => {
            this._animating = false;
            this._pageScrollFinish.emit();
        });
        player.play();
    }
    _getCurrentTranslation() {
        const slideSize = 100 / this.pages.length;
        const position = this._currentPage === -1 ? 0 : this._currentPage * slideSize;
        const translation = this._orientation === 'vertical' ? 'Y' : 'X';
        return `translate${translation}(-${position}%)`;
    }
    _getProps() {
        if (this._orientation === 'vertical') {
            return { prop: 'height', removeProp: 'width' };
        }
        return { prop: 'width', removeProp: 'height' };
    }
    _onSlidesChange() {
        this._updateSize();
    }
    _updateSize() {
        if (this.body == null || this.pages == null) {
            return;
        }
        const { prop, removeProp } = this._getProps();
        this._renderer.setStyle(this.body.nativeElement, prop, `${this.pages.length * 100}%`);
        this._renderer.setStyle(this.body.nativeElement, removeProp, null);
        let curPage = this._currentPage;
        if (this.pages.length === 0) {
            curPage = -1;
        }
        else if (this._currentPage === -1) {
            if (this.pages.first.isRepeating) {
                for (let idx = 0; idx < this.pages.length; idx++) {
                    if (this.pages.get(idx)?.isRepeatingLast) {
                        curPage = idx;
                        break;
                    }
                }
            }
            else {
                curPage = 0;
            }
        }
        else if (this._currentPage >= this.pages.length) {
            curPage = this.pages.length - 1;
        }
        else {
            curPage = this._currentPage;
        }
        this._currentPage = curPage;
        this._restoreCurrentPage();
    }
    _restoreCurrentPage() {
        this._doSlide(true);
    }
    static { this.ɵfac = function AjfPageSlider_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfPageSlider)(i0.ɵɵdirectiveInject(i1.AnimationBuilder), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.Renderer2)); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AjfPageSlider, contentQueries: function AjfPageSlider_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
            i0.ɵɵcontentQuery(dirIndex, AjfPageSliderItem, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.pages = _t);
        } }, viewQuery: function AjfPageSlider_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 7);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.body = _t.first);
        } }, inputs: { duration: "duration", orientation: "orientation", fixedOrientation: "fixedOrientation", currentPage: "currentPage", hideNavigationButtons: "hideNavigationButtons" }, outputs: { pageScrollFinish: "pageScrollFinish", orientationChange: "orientationChange" } }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfPageSlider, [{
        type: Directive
    }], () => [{ type: i1.AnimationBuilder }, { type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }], { body: [{
            type: ViewChild,
            args: ['body', { static: true }]
        }], pages: [{
            type: ContentChildren,
            args: [AjfPageSliderItem, { descendants: true }]
        }], pageScrollFinish: [{
            type: Output
        }], orientationChange: [{
            type: Output
        }], duration: [{
            type: Input
        }], orientation: [{
            type: Input
        }], fixedOrientation: [{
            type: Input
        }], currentPage: [{
            type: Input
        }], hideNavigationButtons: [{
            type: Input
        }] }); })();

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
class AjfPageSliderModule {
    static { this.ɵfac = function AjfPageSliderModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfPageSliderModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfPageSliderModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({}); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfPageSliderModule, [{
        type: NgModule,
        args: [{
                declarations: [AjfPageSliderItem],
                exports: [AjfPageSliderItem],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AjfPageSliderModule, { declarations: [AjfPageSliderItem], exports: [AjfPageSliderItem] }); })();

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

/**
 * Generated bundle index. Do not edit.
 */

export { AjfPageSlider, AjfPageSliderItem, AjfPageSliderModule };
//# sourceMappingURL=ajf-core-page-slider.mjs.map
