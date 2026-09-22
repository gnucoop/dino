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
import { animate, style } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ContentChildren, Directive, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter, map, scan, throttleTime } from 'rxjs/operators';
import { AjfPageSliderItem } from './page-slider-item';
import * as i0 from "@angular/core";
import * as i1 from "@angular/animations";
const _c0 = ["body"];
export class AjfPageSlider {
    /**
     * How much has to be left below the fold before the hint is worth showing --
     * a couple of lines, rather than the last pixel of a rounding error.
     */
    static { this._scrollHintThreshold = 24; }
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
        /**
         * True while the page on screen has more below the fold. The slider hides its
         * scrollbars behind a thin, quiet one, and a page that starts with a screenful
         * of content gives the reader no reason to suspect there is more of it: this
         * drives the hint that says so.
         */
        this.showScrollHint = false;
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
        this._scrollHintTeardown = () => { };
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
            this._updateScrollHint();
        });
        this._watchScrollHint();
    }
    ngOnDestroy() {
        this._pagesSub.unsubscribe();
        this._mouseWheelEvt.complete();
        this._mouseWheelSub.unsubscribe();
        this._orientationChange.complete();
        this._scrollHintTeardown();
    }
    /**
     * Pages down by most of a screenful, from the hint. Most, not all: an overlap
     * keeps the reader's place.
     */
    scrollHintDown() {
        const el = this._scroller();
        if (el != null) {
            el.scrollBy({ top: Math.round(el.clientHeight * 0.8), behavior: 'smooth' });
        }
    }
    /**
     * The element the page on screen scrolls with, or null when it does not
     * scroll at all.
     */
    _scroller() {
        const page = this._getCurrentPage();
        return page != null ? page.scroller : null;
    }
    /**
     * Listens for everything that can change how much is left below the fold: the
     * page being scrolled -- in the capture phase, since the event does not bubble
     * -- and the slider being resized, which covers the content growing as a form
     * is filled in.
     */
    _watchScrollHint() {
        const body = this.body != null ? this.body.nativeElement : null;
        if (body == null) {
            return;
        }
        const onScroll = () => this._updateScrollHint();
        body.addEventListener('scroll', onScroll, true);
        let ro;
        if (typeof ResizeObserver !== 'undefined') {
            ro = new ResizeObserver(() => this._updateScrollHint());
            ro.observe(body);
        }
        this._scrollHintTeardown = () => {
            body.removeEventListener('scroll', onScroll, true);
            ro?.disconnect();
            this._scrollHintTeardown = () => { };
        };
        // The pages have not been laid out yet on the check that gets us here.
        setTimeout(() => this._updateScrollHint());
    }
    _updateScrollHint() {
        const el = this._scroller();
        const more = el != null &&
            el.scrollHeight - el.scrollTop - el.clientHeight > AjfPageSlider._scrollHintThreshold;
        if (more !== this.showScrollHint) {
            this.showScrollHint = more;
            this._cdr.markForCheck();
        }
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
            // A different page, with its own content and its own scroll extent.
            this._updateScrollHint();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zbGlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3BhZ2Utc2xpZGVyL3NyYy9wYWdlLXNsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsT0FBTyxFQUFvQixLQUFLLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBR0wsZUFBZSxFQUNmLFNBQVMsRUFFVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFHTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFhLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0QsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7Ozs7QUF5QnJELE1BQU0sT0FBTyxhQUFhO0lBeUJ4Qjs7O09BR0c7YUFDcUIseUJBQW9CLEdBQUcsRUFBRSxBQUFMLENBQU07SUFHbEQsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFDRCxJQUNJLFdBQVcsQ0FBQyxXQUFxQztRQUNuRCxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssV0FBVyxFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7WUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUks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QyxnQkFBZ0I7a0JBRHhCLE1BQU07WUFNRSxpQkFBaUI7a0JBRHpCLE1BQU07WUFJRSxRQUFRO2tCQUFoQixLQUFLO1lBcUJGLFdBQVc7a0JBRGQsS0FBSztZQWdCRixnQkFBZ0I7a0JBRG5CLEtBQUs7WUFZRixXQUFXO2tCQURkLEtBQUs7WUFjRixxQkFBcUI7a0JBRHhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7YW5pbWF0ZSwgQW5pbWF0aW9uQnVpbGRlciwgc3R5bGV9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFJlbmRlcmVyMixcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyLCBtYXAsIHNjYW4sIHRocm90dGxlVGltZX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZlBhZ2VTbGlkZXJJdGVtfSBmcm9tICcuL3BhZ2Utc2xpZGVyLWl0ZW0nO1xuaW1wb3J0IHtBamZQYWdlU2xpZGVyU2xpZGVPcHRpb25zfSBmcm9tICcuL3BhZ2Utc2xpZGVyLXNsaWRlLW9wdGlvbnMnO1xuXG5leHBvcnQgdHlwZSBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnO1xuXG5pbnRlcmZhY2UgUG9pbnQge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbiAgdGltZTogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgTW92ZW1lbnQge1xuICB2ZWxvY2l0eVg6IG51bWJlcjtcbiAgdmVsb2NpdHlZOiBudW1iZXI7XG4gIGRlbHRhWDogbnVtYmVyO1xuICBkZWx0YVk6IG51bWJlcjtcbiAgZGVsdGFUaW1lOiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBNb3VzaGVXaGVlbE1vdmUge1xuICBkaXI6ICd4JyB8ICd5JztcbiAgYW1vdW50OiBudW1iZXI7XG59XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIEFqZlBhZ2VTbGlkZXIgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKCdib2R5Jywge3N0YXRpYzogdHJ1ZX0pIGJvZHkhOiBFbGVtZW50UmVmO1xuICBAQ29udGVudENoaWxkcmVuKEFqZlBhZ2VTbGlkZXJJdGVtLCB7ZGVzY2VuZGFudHM6IHRydWV9KVxuICBwYWdlcyE6IFF1ZXJ5TGlzdDxBamZQYWdlU2xpZGVySXRlbT47XG5cbiAgcHJpdmF0ZSBfcGFnZVNjcm9sbEZpbmlzaDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KClcbiAgcmVhZG9ubHkgcGFnZVNjcm9sbEZpbmlzaDogT2JzZXJ2YWJsZTx2b2lkPiA9IHRoaXMuX3BhZ2VTY3JvbGxGaW5pc2ggYXMgT2JzZXJ2YWJsZTx2b2lkPjtcblxuICBwcml2YXRlIF9vcmllbnRhdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbj4gPVxuICAgIG5ldyBFdmVudEVtaXR0ZXI8QWpmUGFnZVNsaWRlck9yaWVudGF0aW9uPigpO1xuICBAT3V0cHV0KClcbiAgcmVhZG9ubHkgb3JpZW50YXRpb25DaGFuZ2U6IE9ic2VydmFibGU8QWpmUGFnZVNsaWRlck9yaWVudGF0aW9uPiA9IHRoaXNcbiAgICAuX29yaWVudGF0aW9uQ2hhbmdlIGFzIE9ic2VydmFibGU8QWpmUGFnZVNsaWRlck9yaWVudGF0aW9uPjtcblxuICBASW5wdXQoKSBkdXJhdGlvbiA9IDMwMDtcblxuICAvKipcbiAgICogVHJ1ZSB3aGlsZSB0aGUgcGFnZSBvbiBzY3JlZW4gaGFzIG1vcmUgYmVsb3cgdGhlIGZvbGQuIFRoZSBzbGlkZXIgaGlkZXMgaXRzXG4gICAqIHNjcm9sbGJhcnMgYmVoaW5kIGEgdGhpbiwgcXVpZXQgb25lLCBhbmQgYSBwYWdlIHRoYXQgc3RhcnRzIHdpdGggYSBzY3JlZW5mdWxcbiAgICogb2YgY29udGVudCBnaXZlcyB0aGUgcmVhZGVyIG5vIHJlYXNvbiB0byBzdXNwZWN0IHRoZXJlIGlzIG1vcmUgb2YgaXQ6IHRoaXNcbiAgICogZHJpdmVzIHRoZSBoaW50IHRoYXQgc2F5cyBzby5cbiAgICovXG4gIHNob3dTY3JvbGxIaW50ID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEhvdyBtdWNoIGhhcyB0byBiZSBsZWZ0IGJlbG93IHRoZSBmb2xkIGJlZm9yZSB0aGUgaGludCBpcyB3b3J0aCBzaG93aW5nIC0tXG4gICAqIGEgY291cGxlIG9mIGxpbmVzLCByYXRoZXIgdGhhbiB0aGUgbGFzdCBwaXhlbCBvZiBhIHJvdW5kaW5nIGVycm9yLlxuICAgKi9cbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX3Njcm9sbEhpbnRUaHJlc2hvbGQgPSAyNDtcblxuICBwcml2YXRlIF9vcmllbnRhdGlvbjogQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnO1xuICBnZXQgb3JpZW50YXRpb24oKTogQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5fb3JpZW50YXRpb247XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IG9yaWVudGF0aW9uKG9yaWVudGF0aW9uOiBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24pIHtcbiAgICBpZiAodGhpcy5fb3JpZW50YXRpb24gIT09IG9yaWVudGF0aW9uKSB7XG4gICAgICB0aGlzLl9vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuICAgICAgdGhpcy5fcmVzdG9yZUN1cnJlbnRQYWdlKCk7XG4gICAgICB0aGlzLl9vcmllbnRhdGlvbkNoYW5nZS5lbWl0KHRoaXMuX29yaWVudGF0aW9uKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9maXhlZE9yaWVudGF0aW9uID0gdHJ1ZTtcbiAgZ2V0IGZpeGVkT3JpZW50YXRpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpeGVkT3JpZW50YXRpb247XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGZpeGVkT3JpZW50YXRpb24oXzogYm9vbGVhbikge1xuICAgIC8vIEtlZXAgdHJ1ZSB0byBkaXNhYmxlIHRoZSBjaGFuZ2Ugb3JpZW50YXRpb24gYnV0dG9uXG4gICAgLy8gdGhpcy5fZml4ZWRPcmllbnRhdGlvbiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShmaXhlZE9yaWVudGF0aW9uKTtcbiAgICAvLyB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9jdXJyZW50UGFnZSA9IC0xO1xuICBnZXQgY3VycmVudFBhZ2UoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFBhZ2U7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGN1cnJlbnRQYWdlKGN1cnJlbnRQYWdlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5wYWdlcyA9PSBudWxsIHx8IGN1cnJlbnRQYWdlIDwgMCB8fCBjdXJyZW50UGFnZSA+PSB0aGlzLnBhZ2VzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9jdXJyZW50UGFnZSA9IGN1cnJlbnRQYWdlO1xuICAgIHRoaXMuX2RvU2xpZGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hpZGVOYXZpZ2F0aW9uQnV0dG9uczogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXQgaGlkZU5hdmlnYXRpb25CdXR0b25zKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oaWRlTmF2aWdhdGlvbkJ1dHRvbnM7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGhpZGVOYXZpZ2F0aW9uQnV0dG9ucyhobmI6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlTmF2aWdhdGlvbkJ1dHRvbnMgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoaG5iKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogSWYgdHJ1ZSwgZGlzYWJsZSBzY3JvbGwgbW92ZW1lbnQgY2FsY3VsYXRpb24gaW4gdGhlIGZvcm0uXG4gICAqIElmIGZhbHNlLCB3aGVuIHRvdWNoaW5nIHRoZSBmb3JtIGZpZWxkcywgc2Nyb2xsIHRvIHRoZSBuZXh0IGZpZWxkLlxuICAgKi9cbiAgcHJpdmF0ZSBfZGlzYWJsZVRvdWNoTW92ZW1lbnQgPSB0cnVlO1xuXG4gIHByaXZhdGUgX2FuaW1hdGluZyA9IGZhbHNlO1xuICBwcml2YXRlIF9wYWdlc1N1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9zY3JvbGxIaW50VGVhcmRvd246ICgpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICBwcml2YXRlIF9jdXJyZW50T3JpZ2luOiBQb2ludCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9tb3VzZVdoZWVsRXZ0OiBFdmVudEVtaXR0ZXI8TW91c2hlV2hlZWxNb3ZlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2hlV2hlZWxNb3ZlPigpO1xuICBwcml2YXRlIF9tb3VzZVdoZWVsU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfYW5pbWF0aW9uQnVpbGRlcjogQW5pbWF0aW9uQnVpbGRlcixcbiAgICBwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICkge1xuICAgIHRoaXMuX21vdXNlV2hlZWxTdWIgPSB0aGlzLl9tb3VzZVdoZWVsRXZ0XG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKGV2dCA9PiB7XG4gICAgICAgICAgY29uc3QgcGFnZSA9IHRoaXMuX2dldEN1cnJlbnRQYWdlKCk7XG4gICAgICAgICAgaWYgKHBhZ2UgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB7ZXZ0LCByZXM6IHBhZ2Uuc2V0U2Nyb2xsKGV2dC5kaXIsIGV2dC5hbW91bnQsIDApfTtcbiAgICAgICAgfSksXG4gICAgICAgIGZpbHRlcihcbiAgICAgICAgICByID0+XG4gICAgICAgICAgICByICE9IG51bGwgJiZcbiAgICAgICAgICAgIHIucmVzID09PSBmYWxzZSAmJlxuICAgICAgICAgICAgKChyLmV2dC5kaXIgPT09ICd4JyAmJiB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHx8XG4gICAgICAgICAgICAgIChyLmV2dC5kaXIgPT09ICd5JyAmJiB0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSksXG4gICAgICAgICksXG4gICAgICAgIG1hcChyID0+IHIhLmV2dC5hbW91bnQpLFxuICAgICAgICBzY2FuKChhY2MsIHZhbCkgPT4ge1xuICAgICAgICAgIGlmIChhY2MgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhY2MgLyBNYXRoLmFicyhhY2MpICE9PSB2YWwgLyBNYXRoLmFicyh2YWwpKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGFjYyArIHZhbDtcbiAgICAgICAgfSwgMCksXG4gICAgICAgIGZpbHRlcih2YWwgPT4gIXRoaXMuX2FuaW1hdGluZyAmJiBNYXRoLmFicyh2YWwpID4gMTUwKSxcbiAgICAgICAgdGhyb3R0bGVUaW1lKDE1MDApLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSh2YWwgPT4ge1xuICAgICAgICB0aGlzLl9tb3VzZVdoZWVsRXZ0LmVtaXQoe2RpcjogJ3gnLCBhbW91bnQ6IHZhbCA+IDAgPyAtMSA6ICsxfSk7XG4gICAgICAgIHRoaXMuc2xpZGUoe2RpcjogdmFsID4gMCA/ICdiYWNrJyA6ICdmb3J3YXJkJ30pO1xuICAgICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgLy8gU2l6ZSB0aGUgYm9keSBmb3IgdGhlIHBhZ2VzIHRoYXQgYXJlIGFscmVhZHkgdGhlcmUuIFJlbHlpbmcgb25cbiAgICAvLyBgcGFnZXMuY2hhbmdlc2AgYWxvbmUgb25seSB3b3JrZWQgd2hpbGUgdGhlIHBhZ2VzIGFwcGVhcmVkIGluIGEgbGF0ZXJcbiAgICAvLyBjaGFuZ2UgZGV0ZWN0aW9uIHBhc3MgdGhhbiB0aGUgc2xpZGVyIGl0c2VsZjsgd2hlbiBhIGNhbGxlciBjcmVhdGVzIGJvdGhcbiAgICAvLyB0b2dldGhlciB0aGUgZXZlbnQgbmV2ZXIgZmlyZXMsIGFuZCBldmVyeSBwYWdlIHdvdWxkIGVuZCB1cCBzaGFyaW5nIG9uZVxuICAgIC8vIHBhZ2UncyB3b3J0aCBvZiBzcGFjZS5cbiAgICB0aGlzLl9vblNsaWRlc0NoYW5nZSgpO1xuICAgIHRoaXMuX3BhZ2VzU3ViID0gdGhpcy5wYWdlcy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLl9vblNsaWRlc0NoYW5nZSgpO1xuICAgICAgdGhpcy5fY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIHRoaXMuX3VwZGF0ZVNjcm9sbEhpbnQoKTtcbiAgICB9KTtcbiAgICB0aGlzLl93YXRjaFNjcm9sbEhpbnQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3BhZ2VzU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fbW91c2VXaGVlbEV2dC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX21vdXNlV2hlZWxTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9vcmllbnRhdGlvbkNoYW5nZS5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX3Njcm9sbEhpbnRUZWFyZG93bigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhZ2VzIGRvd24gYnkgbW9zdCBvZiBhIHNjcmVlbmZ1bCwgZnJvbSB0aGUgaGludC4gTW9zdCwgbm90IGFsbDogYW4gb3ZlcmxhcFxuICAgKiBrZWVwcyB0aGUgcmVhZGVyJ3MgcGxhY2UuXG4gICAqL1xuICBzY3JvbGxIaW50RG93bigpOiB2b2lkIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuX3Njcm9sbGVyKCk7XG4gICAgaWYgKGVsICE9IG51bGwpIHtcbiAgICAgIGVsLnNjcm9sbEJ5KHt0b3A6IE1hdGgucm91bmQoZWwuY2xpZW50SGVpZ2h0ICogMC44KSwgYmVoYXZpb3I6ICdzbW9vdGgnfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBlbGVtZW50IHRoZSBwYWdlIG9uIHNjcmVlbiBzY3JvbGxzIHdpdGgsIG9yIG51bGwgd2hlbiBpdCBkb2VzIG5vdFxuICAgKiBzY3JvbGwgYXQgYWxsLlxuICAgKi9cbiAgcHJpdmF0ZSBfc2Nyb2xsZXIoKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcbiAgICBjb25zdCBwYWdlID0gdGhpcy5fZ2V0Q3VycmVudFBhZ2UoKTtcbiAgICByZXR1cm4gcGFnZSAhPSBudWxsID8gcGFnZS5zY3JvbGxlciA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVucyBmb3IgZXZlcnl0aGluZyB0aGF0IGNhbiBjaGFuZ2UgaG93IG11Y2ggaXMgbGVmdCBiZWxvdyB0aGUgZm9sZDogdGhlXG4gICAqIHBhZ2UgYmVpbmcgc2Nyb2xsZWQgLS0gaW4gdGhlIGNhcHR1cmUgcGhhc2UsIHNpbmNlIHRoZSBldmVudCBkb2VzIG5vdCBidWJibGVcbiAgICogLS0gYW5kIHRoZSBzbGlkZXIgYmVpbmcgcmVzaXplZCwgd2hpY2ggY292ZXJzIHRoZSBjb250ZW50IGdyb3dpbmcgYXMgYSBmb3JtXG4gICAqIGlzIGZpbGxlZCBpbi5cbiAgICovXG4gIHByaXZhdGUgX3dhdGNoU2Nyb2xsSGludCgpOiB2b2lkIHtcbiAgICBjb25zdCBib2R5ID0gdGhpcy5ib2R5ICE9IG51bGwgPyAodGhpcy5ib2R5Lm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpIDogbnVsbDtcbiAgICBpZiAoYm9keSA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG9uU2Nyb2xsID0gKCkgPT4gdGhpcy5fdXBkYXRlU2Nyb2xsSGludCgpO1xuICAgIGJvZHkuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGwsIHRydWUpO1xuXG4gICAgbGV0IHJvOiBSZXNpemVPYnNlcnZlciB8IHVuZGVmaW5lZDtcbiAgICBpZiAodHlwZW9mIFJlc2l6ZU9ic2VydmVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcm8gPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gdGhpcy5fdXBkYXRlU2Nyb2xsSGludCgpKTtcbiAgICAgIHJvLm9ic2VydmUoYm9keSk7XG4gICAgfVxuXG4gICAgdGhpcy5fc2Nyb2xsSGludFRlYXJkb3duID0gKCkgPT4ge1xuICAgICAgYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvblNjcm9sbCwgdHJ1ZSk7XG4gICAgICBybz8uZGlzY29ubmVjdCgpO1xuICAgICAgdGhpcy5fc2Nyb2xsSGludFRlYXJkb3duID0gKCkgPT4ge307XG4gICAgfTtcblxuICAgIC8vIFRoZSBwYWdlcyBoYXZlIG5vdCBiZWVuIGxhaWQgb3V0IHlldCBvbiB0aGUgY2hlY2sgdGhhdCBnZXRzIHVzIGhlcmUuXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLl91cGRhdGVTY3JvbGxIaW50KCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlU2Nyb2xsSGludCgpOiB2b2lkIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuX3Njcm9sbGVyKCk7XG4gICAgY29uc3QgbW9yZSA9XG4gICAgICBlbCAhPSBudWxsICYmXG4gICAgICBlbC5zY3JvbGxIZWlnaHQgLSBlbC5zY3JvbGxUb3AgLSBlbC5jbGllbnRIZWlnaHQgPiBBamZQYWdlU2xpZGVyLl9zY3JvbGxIaW50VGhyZXNob2xkO1xuICAgIGlmIChtb3JlICE9PSB0aGlzLnNob3dTY3JvbGxIaW50KSB7XG4gICAgICB0aGlzLnNob3dTY3JvbGxIaW50ID0gbW9yZTtcbiAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBzd2l0Y2hPcmllbnRhdGlvbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fb3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgdGhpcy5vcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG4gICAgfVxuICB9XG5cbiAgc2xpZGUob3B0czogQWpmUGFnZVNsaWRlclNsaWRlT3B0aW9ucyk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBhZ2VzID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG9wdHMuZGlyKSB7XG4gICAgICBpZiAob3B0cy5kaXIgPT09ICdiYWNrJyB8fCBvcHRzLmRpciA9PT0gJ3VwJyB8fCBvcHRzLmRpciA9PT0gJ2xlZnQnKSB7XG4gICAgICAgIHRoaXMuX3NsaWRlQmFjaygpO1xuICAgICAgfSBlbHNlIGlmIChvcHRzLmRpciA9PT0gJ2ZvcndhcmQnIHx8IG9wdHMuZGlyID09PSAnZG93bicgfHwgb3B0cy5kaXIgPT09ICdyaWdodCcpIHtcbiAgICAgICAgdGhpcy5fc2xpZGVGb3J3YXJkKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcHRzLnRvICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3NsaWRlVG8ob3B0cy50byk7XG4gICAgfVxuICB9XG5cbiAgb25Nb3VzZVdoZWVsKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGV2dCA9IGV2ZW50IGFzIFdoZWVsRXZlbnQ7XG4gICAgaWYgKGV2dC5kZWx0YVggPT0gbnVsbCB8fCBldnQuZGVsdGFZID09IG51bGwgfHwgdGhpcy5fZGlzYWJsZVRvdWNoTW92ZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgYWJzRGVsdGFYID0gTWF0aC5hYnMoZXZ0LmRlbHRhWCk7XG4gICAgY29uc3QgYWJzRGVsdGFZID0gTWF0aC5hYnMoZXZ0LmRlbHRhWSk7XG4gICAgaWYgKGFic0RlbHRhWCA9PT0gMCAmJiBhYnNEZWx0YVkgPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGFic0RlbHRhWCA+IGFic0RlbHRhWSkge1xuICAgICAgdGhpcy5fbW91c2VXaGVlbEV2dC5lbWl0KHtkaXI6ICd4JywgYW1vdW50OiAtZXZ0LmRlbHRhWH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9tb3VzZVdoZWVsRXZ0LmVtaXQoe2RpcjogJ3knLCBhbW91bnQ6IC1ldnQuZGVsdGFZfSk7XG4gICAgfVxuICB9XG5cbiAgb25Ub3VjaFN0YXJ0KGV2dDogVG91Y2hFdmVudCk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIGV2dC50b3VjaGVzID09IG51bGwgfHxcbiAgICAgIGV2dC50b3VjaGVzLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgdGhpcy5fYW5pbWF0aW5nIHx8XG4gICAgICB0aGlzLl9kaXNhYmxlVG91Y2hNb3ZlbWVudFxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9jdXJyZW50T3JpZ2luID0ge1xuICAgICAgeDogZXZ0LnRvdWNoZXNbMF0uY2xpZW50WCxcbiAgICAgIHk6IGV2dC50b3VjaGVzWzBdLmNsaWVudFksXG4gICAgICB0aW1lOiArbmV3IERhdGUoKSxcbiAgICB9O1xuICB9XG5cbiAgb25Ub3VjaE1vdmUoZXZ0OiBUb3VjaEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgZXZ0LnRvdWNoZXMgPT0gbnVsbCB8fFxuICAgICAgZXZ0LnRvdWNoZXMubGVuZ3RoID09PSAwIHx8XG4gICAgICB0aGlzLl9jdXJyZW50T3JpZ2luID09IG51bGwgfHxcbiAgICAgIHRoaXMuX2FuaW1hdGluZyB8fFxuICAgICAgdGhpcy5fZGlzYWJsZVRvdWNoTW92ZW1lbnRcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcG9pbnQ6IFBvaW50ID0ge1xuICAgICAgeDogZXZ0LnRvdWNoZXNbMF0uY2xpZW50WCxcbiAgICAgIHk6IGV2dC50b3VjaGVzWzBdLmNsaWVudFksXG4gICAgICB0aW1lOiArbmV3IERhdGUoKSxcbiAgICB9O1xuICAgIGNvbnN0IG1vdmVtZW50ID0gdGhpcy5fY2FsY3VsYXRlTW92ZW1lbnQocG9pbnQpO1xuICAgIHRoaXMuX2N1cnJlbnRPcmlnaW4gPSBwb2ludDtcblxuICAgIGlmIChtb3ZlbWVudC52ZWxvY2l0eVggPT09IDAgJiYgbW92ZW1lbnQudmVsb2NpdHlZID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGFic1ZlbG9jaXR5WCA9IE1hdGguYWJzKG1vdmVtZW50LnZlbG9jaXR5WCk7XG4gICAgY29uc3QgYWJzVmVsb2NpdHlZID0gTWF0aC5hYnMobW92ZW1lbnQudmVsb2NpdHlZKTtcbiAgICBpZiAoYWJzVmVsb2NpdHlYID4gYWJzVmVsb2NpdHlZKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJyAmJlxuICAgICAgICBhYnNWZWxvY2l0eVggPiAxLjUgJiZcbiAgICAgICAgTWF0aC5hYnMobW92ZW1lbnQuZGVsdGFYKSA+IDUwXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5fcmVzZXRDdXJyZW50T3JpZ2luKCk7XG4gICAgICAgIHRoaXMuc2xpZGUoe2RpcjogbW92ZW1lbnQudmVsb2NpdHlYIDwgMCA/ICdmb3J3YXJkJyA6ICdiYWNrJ30pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcGFnZSA9IHRoaXMuX2dldEN1cnJlbnRQYWdlKCk7XG4gICAgICAgIGlmIChwYWdlICE9IG51bGwpIHtcbiAgICAgICAgICBwYWdlLnNldFNjcm9sbCgneCcsIG1vdmVtZW50LmRlbHRhWCwgbW92ZW1lbnQuZGVsdGFUaW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJyAmJiBhYnNWZWxvY2l0eVkgPiAxLjUgJiYgTWF0aC5hYnMobW92ZW1lbnQuZGVsdGFZKSA+IDUwKSB7XG4gICAgICAgIHRoaXMuX3Jlc2V0Q3VycmVudE9yaWdpbigpO1xuICAgICAgICB0aGlzLnNsaWRlKHtkaXI6IG1vdmVtZW50LnZlbG9jaXR5WSA8IDAgPyAnZm9yd2FyZCcgOiAnYmFjayd9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLl9nZXRDdXJyZW50UGFnZSgpO1xuICAgICAgICBpZiAocGFnZSAhPSBudWxsKSB7XG4gICAgICAgICAgcGFnZS5zZXRTY3JvbGwoJ3knLCBtb3ZlbWVudC5kZWx0YVksIG1vdmVtZW50LmRlbHRhVGltZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblRvdWNoRW5kKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9kaXNhYmxlVG91Y2hNb3ZlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9yZXNldEN1cnJlbnRPcmlnaW4oKTtcbiAgfVxuXG4gIGlzQ3VycmVudFBhZ2VMb25nKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGN1clBhZ2UgPSB0aGlzLl9nZXRDdXJyZW50UGFnZSgpO1xuICAgIGlmIChjdXJQYWdlID09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGN1clBhZ2Uud3JhcHBlci5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodCA+IGN1clBhZ2UuY29udGVudC5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgfVxuXG4gIHByaXZhdGUgX3Jlc2V0Q3VycmVudE9yaWdpbigpOiB2b2lkIHtcbiAgICB0aGlzLl9jdXJyZW50T3JpZ2luID0gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEN1cnJlbnRQYWdlKCk6IEFqZlBhZ2VTbGlkZXJJdGVtIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMucGFnZXMgPT0gbnVsbCB8fCB0aGlzLmN1cnJlbnRQYWdlIDwgMCB8fCB0aGlzLmN1cnJlbnRQYWdlID49IHRoaXMucGFnZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucGFnZXMudG9BcnJheSgpW3RoaXMuY3VycmVudFBhZ2VdO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2FsY3VsYXRlTW92ZW1lbnQocG9pbnQ6IFBvaW50KTogTW92ZW1lbnQge1xuICAgIGNvbnN0IGRlbHRhWCA9IHBvaW50LnggLSB0aGlzLl9jdXJyZW50T3JpZ2luIS54O1xuICAgIGNvbnN0IGRlbHRhWSA9IHBvaW50LnkgLSB0aGlzLl9jdXJyZW50T3JpZ2luIS55O1xuICAgIGNvbnN0IGRlbHRhVGltZSA9IHBvaW50LnRpbWUgLSB0aGlzLl9jdXJyZW50T3JpZ2luIS50aW1lO1xuICAgIHJldHVybiB7XG4gICAgICB2ZWxvY2l0eVg6IGRlbHRhWCAvIGRlbHRhVGltZSxcbiAgICAgIGRlbHRhWCxcbiAgICAgIHZlbG9jaXR5WTogZGVsdGFZIC8gZGVsdGFUaW1lLFxuICAgICAgZGVsdGFZLFxuICAgICAgZGVsdGFUaW1lLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9zbGlkZUJhY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRQYWdlIDw9IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMuX2N1cnJlbnRQYWdlIC0gMTtcbiAgfVxuXG4gIHByaXZhdGUgX3NsaWRlRm9yd2FyZCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY3VycmVudFBhZ2UgPj0gdGhpcy5wYWdlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMuX2N1cnJlbnRQYWdlICsgMTtcbiAgfVxuXG4gIHByaXZhdGUgX3NsaWRlVG8ocGFnZTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHBhZ2UgPj0gMCAmJiBwYWdlIDwgdGhpcy5wYWdlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBwYWdlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2RvU2xpZGUoaW1tZWRpYXRlID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ib2R5ID09IG51bGwgfHwgdGhpcy5wYWdlcyA9PSBudWxsIHx8IHRoaXMuX2FuaW1hdGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9hbmltYXRpbmcgPSB0cnVlO1xuICAgIGNvbnN0IGFuaW1hdGlvbiA9IHRoaXMuX2FuaW1hdGlvbkJ1aWxkZXIuYnVpbGQoXG4gICAgICBhbmltYXRlKGltbWVkaWF0ZSA/IDAgOiB0aGlzLmR1cmF0aW9uLCBzdHlsZSh7dHJhbnNmb3JtOiB0aGlzLl9nZXRDdXJyZW50VHJhbnNsYXRpb24oKX0pKSxcbiAgICApO1xuXG4gICAgY29uc3QgcGxheWVyID0gYW5pbWF0aW9uLmNyZWF0ZSh0aGlzLmJvZHkubmF0aXZlRWxlbWVudCk7XG4gICAgcGxheWVyLm9uRG9uZSgoKSA9PiB7XG4gICAgICB0aGlzLl9hbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuX3BhZ2VTY3JvbGxGaW5pc2guZW1pdCgpO1xuICAgICAgLy8gQSBkaWZmZXJlbnQgcGFnZSwgd2l0aCBpdHMgb3duIGNvbnRlbnQgYW5kIGl0cyBvd24gc2Nyb2xsIGV4dGVudC5cbiAgICAgIHRoaXMuX3VwZGF0ZVNjcm9sbEhpbnQoKTtcbiAgICB9KTtcbiAgICBwbGF5ZXIucGxheSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Q3VycmVudFRyYW5zbGF0aW9uKCk6IHN0cmluZyB7XG4gICAgY29uc3Qgc2xpZGVTaXplID0gMTAwIC8gdGhpcy5wYWdlcy5sZW5ndGg7XG4gICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLl9jdXJyZW50UGFnZSA9PT0gLTEgPyAwIDogdGhpcy5fY3VycmVudFBhZ2UgKiBzbGlkZVNpemU7XG4gICAgY29uc3QgdHJhbnNsYXRpb24gPSB0aGlzLl9vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJyA/ICdZJyA6ICdYJztcbiAgICByZXR1cm4gYHRyYW5zbGF0ZSR7dHJhbnNsYXRpb259KC0ke3Bvc2l0aW9ufSUpYDtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFByb3BzKCk6IHtwcm9wOiBzdHJpbmc7IHJlbW92ZVByb3A6IHN0cmluZ30ge1xuICAgIGlmICh0aGlzLl9vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgcmV0dXJuIHtwcm9wOiAnaGVpZ2h0JywgcmVtb3ZlUHJvcDogJ3dpZHRoJ307XG4gICAgfVxuICAgIHJldHVybiB7cHJvcDogJ3dpZHRoJywgcmVtb3ZlUHJvcDogJ2hlaWdodCd9O1xuICB9XG5cbiAgcHJpdmF0ZSBfb25TbGlkZXNDaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlU2l6ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ib2R5ID09IG51bGwgfHwgdGhpcy5wYWdlcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHtwcm9wLCByZW1vdmVQcm9wfSA9IHRoaXMuX2dldFByb3BzKCk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ib2R5Lm5hdGl2ZUVsZW1lbnQsIHByb3AsIGAke3RoaXMucGFnZXMubGVuZ3RoICogMTAwfSVgKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJvZHkubmF0aXZlRWxlbWVudCwgcmVtb3ZlUHJvcCwgbnVsbCk7XG4gICAgbGV0IGN1clBhZ2U6IG51bWJlciA9IHRoaXMuX2N1cnJlbnRQYWdlO1xuICAgIGlmICh0aGlzLnBhZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY3VyUGFnZSA9IC0xO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fY3VycmVudFBhZ2UgPT09IC0xKSB7XG4gICAgICBpZiAodGhpcy5wYWdlcy5maXJzdC5pc1JlcGVhdGluZykge1xuICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCB0aGlzLnBhZ2VzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICBpZiAodGhpcy5wYWdlcy5nZXQoaWR4KT8uaXNSZXBlYXRpbmdMYXN0KSB7XG4gICAgICAgICAgICBjdXJQYWdlID0gaWR4O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdXJQYWdlID0gMDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuX2N1cnJlbnRQYWdlID49IHRoaXMucGFnZXMubGVuZ3RoKSB7XG4gICAgICBjdXJQYWdlID0gdGhpcy5wYWdlcy5sZW5ndGggLSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJQYWdlID0gdGhpcy5fY3VycmVudFBhZ2U7XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnRQYWdlID0gY3VyUGFnZTtcbiAgICB0aGlzLl9yZXN0b3JlQ3VycmVudFBhZ2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Jlc3RvcmVDdXJyZW50UGFnZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kb1NsaWRlKHRydWUpO1xuICB9XG59XG4iXX0=