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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zbGlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3BhZ2Utc2xpZGVyL3NyYy9wYWdlLXNsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsT0FBTyxFQUFvQixLQUFLLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBR0wsZUFBZSxFQUNmLFNBQVMsRUFFVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFHTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFhLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0QsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7Ozs7QUF5QnJELE1BQU0sT0FBTyxhQUFhO0lBa0J4QixJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQUNELElBQ0ksV0FBVyxDQUFDLFdBQXFDO1FBQ25ELElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxXQUFXLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztZQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNsRCxDQUFDO0lBQ0gs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QjtrQkFEeEIsTUFBTTtZQU1FLGlCQUFpQjtrQkFEekIsTUFBTTtZQUlFLFFBQVE7a0JBQWhCLEtBQUs7WUFPRixXQUFXO2tCQURkLEtBQUs7WUFnQkYsZ0JBQWdCO2tCQURuQixLQUFLO1lBWUYsV0FBVztrQkFEZCxLQUFLO1lBY0YscUJBQXFCO2tCQUR4QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge2FuaW1hdGUsIEFuaW1hdGlvbkJ1aWxkZXIsIHN0eWxlfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7Y29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlciwgbWFwLCBzY2FuLCB0aHJvdHRsZVRpbWV9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZQYWdlU2xpZGVySXRlbX0gZnJvbSAnLi9wYWdlLXNsaWRlci1pdGVtJztcbmltcG9ydCB7QWpmUGFnZVNsaWRlclNsaWRlT3B0aW9uc30gZnJvbSAnLi9wYWdlLXNsaWRlci1zbGlkZS1vcHRpb25zJztcblxuZXhwb3J0IHR5cGUgQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJztcblxuaW50ZXJmYWNlIFBvaW50IHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG4gIHRpbWU6IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIE1vdmVtZW50IHtcbiAgdmVsb2NpdHlYOiBudW1iZXI7XG4gIHZlbG9jaXR5WTogbnVtYmVyO1xuICBkZWx0YVg6IG51bWJlcjtcbiAgZGVsdGFZOiBudW1iZXI7XG4gIGRlbHRhVGltZTogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgTW91c2hlV2hlZWxNb3ZlIHtcbiAgZGlyOiAneCcgfCAneSc7XG4gIGFtb3VudDogbnVtYmVyO1xufVxuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBBamZQYWdlU2xpZGVyIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZCgnYm9keScsIHtzdGF0aWM6IHRydWV9KSBib2R5ITogRWxlbWVudFJlZjtcbiAgQENvbnRlbnRDaGlsZHJlbihBamZQYWdlU2xpZGVySXRlbSwge2Rlc2NlbmRhbnRzOiB0cnVlfSlcbiAgcGFnZXMhOiBRdWVyeUxpc3Q8QWpmUGFnZVNsaWRlckl0ZW0+O1xuXG4gIHByaXZhdGUgX3BhZ2VTY3JvbGxGaW5pc2g6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IHBhZ2VTY3JvbGxGaW5pc2g6IE9ic2VydmFibGU8dm9pZD4gPSB0aGlzLl9wYWdlU2Nyb2xsRmluaXNoIGFzIE9ic2VydmFibGU8dm9pZD47XG5cbiAgcHJpdmF0ZSBfb3JpZW50YXRpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxBamZQYWdlU2xpZGVyT3JpZW50YXRpb24+ID1cbiAgICBuZXcgRXZlbnRFbWl0dGVyPEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbj4oKTtcbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IG9yaWVudGF0aW9uQ2hhbmdlOiBPYnNlcnZhYmxlPEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbj4gPSB0aGlzXG4gICAgLl9vcmllbnRhdGlvbkNoYW5nZSBhcyBPYnNlcnZhYmxlPEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbj47XG5cbiAgQElucHV0KCkgZHVyYXRpb24gPSAzMDA7XG5cbiAgcHJpdmF0ZSBfb3JpZW50YXRpb246IEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcbiAgZ2V0IG9yaWVudGF0aW9uKCk6IEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuX29yaWVudGF0aW9uO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBvcmllbnRhdGlvbihvcmllbnRhdGlvbjogQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uKSB7XG4gICAgaWYgKHRoaXMuX29yaWVudGF0aW9uICE9PSBvcmllbnRhdGlvbikge1xuICAgICAgdGhpcy5fb3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcbiAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIHRoaXMuX3VwZGF0ZVNpemUoKTtcbiAgICAgIHRoaXMuX3Jlc3RvcmVDdXJyZW50UGFnZSgpO1xuICAgICAgdGhpcy5fb3JpZW50YXRpb25DaGFuZ2UuZW1pdCh0aGlzLl9vcmllbnRhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZml4ZWRPcmllbnRhdGlvbiA9IHRydWU7XG4gIGdldCBmaXhlZE9yaWVudGF0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9maXhlZE9yaWVudGF0aW9uO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBmaXhlZE9yaWVudGF0aW9uKF86IGJvb2xlYW4pIHtcbiAgICAvLyBLZWVwIHRydWUgdG8gZGlzYWJsZSB0aGUgY2hhbmdlIG9yaWVudGF0aW9uIGJ1dHRvblxuICAgIC8vIHRoaXMuX2ZpeGVkT3JpZW50YXRpb24gPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoZml4ZWRPcmllbnRhdGlvbik7XG4gICAgLy8gdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3VycmVudFBhZ2UgPSAtMTtcbiAgZ2V0IGN1cnJlbnRQYWdlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRQYWdlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBjdXJyZW50UGFnZShjdXJyZW50UGFnZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMucGFnZXMgPT0gbnVsbCB8fCBjdXJyZW50UGFnZSA8IDAgfHwgY3VycmVudFBhZ2UgPj0gdGhpcy5wYWdlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fY3VycmVudFBhZ2UgPSBjdXJyZW50UGFnZTtcbiAgICB0aGlzLl9kb1NsaWRlKCk7XG4gIH1cblxuICBwcml2YXRlIF9oaWRlTmF2aWdhdGlvbkJ1dHRvbnM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZ2V0IGhpZGVOYXZpZ2F0aW9uQnV0dG9ucygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGlkZU5hdmlnYXRpb25CdXR0b25zO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBoaWRlTmF2aWdhdGlvbkJ1dHRvbnMoaG5iOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGlkZU5hdmlnYXRpb25CdXR0b25zID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGhuYik7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIElmIHRydWUsIGRpc2FibGUgc2Nyb2xsIG1vdmVtZW50IGNhbGN1bGF0aW9uIGluIHRoZSBmb3JtLlxuICAgKiBJZiBmYWxzZSwgd2hlbiB0b3VjaGluZyB0aGUgZm9ybSBmaWVsZHMsIHNjcm9sbCB0byB0aGUgbmV4dCBmaWVsZC5cbiAgICovXG4gIHByaXZhdGUgX2Rpc2FibGVUb3VjaE1vdmVtZW50ID0gdHJ1ZTtcblxuICBwcml2YXRlIF9hbmltYXRpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfcGFnZXNTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9jdXJyZW50T3JpZ2luOiBQb2ludCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9tb3VzZVdoZWVsRXZ0OiBFdmVudEVtaXR0ZXI8TW91c2hlV2hlZWxNb3ZlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2hlV2hlZWxNb3ZlPigpO1xuICBwcml2YXRlIF9tb3VzZVdoZWVsU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfYW5pbWF0aW9uQnVpbGRlcjogQW5pbWF0aW9uQnVpbGRlcixcbiAgICBwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICkge1xuICAgIHRoaXMuX21vdXNlV2hlZWxTdWIgPSB0aGlzLl9tb3VzZVdoZWVsRXZ0XG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKGV2dCA9PiB7XG4gICAgICAgICAgY29uc3QgcGFnZSA9IHRoaXMuX2dldEN1cnJlbnRQYWdlKCk7XG4gICAgICAgICAgaWYgKHBhZ2UgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB7ZXZ0LCByZXM6IHBhZ2Uuc2V0U2Nyb2xsKGV2dC5kaXIsIGV2dC5hbW91bnQsIDApfTtcbiAgICAgICAgfSksXG4gICAgICAgIGZpbHRlcihcbiAgICAgICAgICByID0+XG4gICAgICAgICAgICByICE9IG51bGwgJiZcbiAgICAgICAgICAgIHIucmVzID09PSBmYWxzZSAmJlxuICAgICAgICAgICAgKChyLmV2dC5kaXIgPT09ICd4JyAmJiB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHx8XG4gICAgICAgICAgICAgIChyLmV2dC5kaXIgPT09ICd5JyAmJiB0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSksXG4gICAgICAgICksXG4gICAgICAgIG1hcChyID0+IHIhLmV2dC5hbW91bnQpLFxuICAgICAgICBzY2FuKChhY2MsIHZhbCkgPT4ge1xuICAgICAgICAgIGlmIChhY2MgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhY2MgLyBNYXRoLmFicyhhY2MpICE9PSB2YWwgLyBNYXRoLmFicyh2YWwpKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGFjYyArIHZhbDtcbiAgICAgICAgfSwgMCksXG4gICAgICAgIGZpbHRlcih2YWwgPT4gIXRoaXMuX2FuaW1hdGluZyAmJiBNYXRoLmFicyh2YWwpID4gMTUwKSxcbiAgICAgICAgdGhyb3R0bGVUaW1lKDE1MDApLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSh2YWwgPT4ge1xuICAgICAgICB0aGlzLl9tb3VzZVdoZWVsRXZ0LmVtaXQoe2RpcjogJ3gnLCBhbW91bnQ6IHZhbCA+IDAgPyAtMSA6ICsxfSk7XG4gICAgICAgIHRoaXMuc2xpZGUoe2RpcjogdmFsID4gMCA/ICdiYWNrJyA6ICdmb3J3YXJkJ30pO1xuICAgICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgLy8gU2l6ZSB0aGUgYm9keSBmb3IgdGhlIHBhZ2VzIHRoYXQgYXJlIGFscmVhZHkgdGhlcmUuIFJlbHlpbmcgb25cbiAgICAvLyBgcGFnZXMuY2hhbmdlc2AgYWxvbmUgb25seSB3b3JrZWQgd2hpbGUgdGhlIHBhZ2VzIGFwcGVhcmVkIGluIGEgbGF0ZXJcbiAgICAvLyBjaGFuZ2UgZGV0ZWN0aW9uIHBhc3MgdGhhbiB0aGUgc2xpZGVyIGl0c2VsZjsgd2hlbiBhIGNhbGxlciBjcmVhdGVzIGJvdGhcbiAgICAvLyB0b2dldGhlciB0aGUgZXZlbnQgbmV2ZXIgZmlyZXMsIGFuZCBldmVyeSBwYWdlIHdvdWxkIGVuZCB1cCBzaGFyaW5nIG9uZVxuICAgIC8vIHBhZ2UncyB3b3J0aCBvZiBzcGFjZS5cbiAgICB0aGlzLl9vblNsaWRlc0NoYW5nZSgpO1xuICAgIHRoaXMuX3BhZ2VzU3ViID0gdGhpcy5wYWdlcy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLl9vblNsaWRlc0NoYW5nZSgpO1xuICAgICAgdGhpcy5fY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3BhZ2VzU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fbW91c2VXaGVlbEV2dC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX21vdXNlV2hlZWxTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9vcmllbnRhdGlvbkNoYW5nZS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgc3dpdGNoT3JpZW50YXRpb24oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX29yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIHRoaXMub3JpZW50YXRpb24gPSAndmVydGljYWwnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnO1xuICAgIH1cbiAgfVxuXG4gIHNsaWRlKG9wdHM6IEFqZlBhZ2VTbGlkZXJTbGlkZU9wdGlvbnMpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wYWdlcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChvcHRzLmRpcikge1xuICAgICAgaWYgKG9wdHMuZGlyID09PSAnYmFjaycgfHwgb3B0cy5kaXIgPT09ICd1cCcgfHwgb3B0cy5kaXIgPT09ICdsZWZ0Jykge1xuICAgICAgICB0aGlzLl9zbGlkZUJhY2soKTtcbiAgICAgIH0gZWxzZSBpZiAob3B0cy5kaXIgPT09ICdmb3J3YXJkJyB8fCBvcHRzLmRpciA9PT0gJ2Rvd24nIHx8IG9wdHMuZGlyID09PSAncmlnaHQnKSB7XG4gICAgICAgIHRoaXMuX3NsaWRlRm9yd2FyZCgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3B0cy50byAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9zbGlkZVRvKG9wdHMudG8pO1xuICAgIH1cbiAgfVxuXG4gIG9uTW91c2VXaGVlbChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBldnQgPSBldmVudCBhcyBXaGVlbEV2ZW50O1xuICAgIGlmIChldnQuZGVsdGFYID09IG51bGwgfHwgZXZ0LmRlbHRhWSA9PSBudWxsIHx8IHRoaXMuX2Rpc2FibGVUb3VjaE1vdmVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGFic0RlbHRhWCA9IE1hdGguYWJzKGV2dC5kZWx0YVgpO1xuICAgIGNvbnN0IGFic0RlbHRhWSA9IE1hdGguYWJzKGV2dC5kZWx0YVkpO1xuICAgIGlmIChhYnNEZWx0YVggPT09IDAgJiYgYWJzRGVsdGFZID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChhYnNEZWx0YVggPiBhYnNEZWx0YVkpIHtcbiAgICAgIHRoaXMuX21vdXNlV2hlZWxFdnQuZW1pdCh7ZGlyOiAneCcsIGFtb3VudDogLWV2dC5kZWx0YVh9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbW91c2VXaGVlbEV2dC5lbWl0KHtkaXI6ICd5JywgYW1vdW50OiAtZXZ0LmRlbHRhWX0pO1xuICAgIH1cbiAgfVxuXG4gIG9uVG91Y2hTdGFydChldnQ6IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICBldnQudG91Y2hlcyA9PSBudWxsIHx8XG4gICAgICBldnQudG91Y2hlcy5sZW5ndGggPT09IDAgfHxcbiAgICAgIHRoaXMuX2FuaW1hdGluZyB8fFxuICAgICAgdGhpcy5fZGlzYWJsZVRvdWNoTW92ZW1lbnRcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fY3VycmVudE9yaWdpbiA9IHtcbiAgICAgIHg6IGV2dC50b3VjaGVzWzBdLmNsaWVudFgsXG4gICAgICB5OiBldnQudG91Y2hlc1swXS5jbGllbnRZLFxuICAgICAgdGltZTogK25ldyBEYXRlKCksXG4gICAgfTtcbiAgfVxuXG4gIG9uVG91Y2hNb3ZlKGV2dDogVG91Y2hFdmVudCk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIGV2dC50b3VjaGVzID09IG51bGwgfHxcbiAgICAgIGV2dC50b3VjaGVzLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgdGhpcy5fY3VycmVudE9yaWdpbiA9PSBudWxsIHx8XG4gICAgICB0aGlzLl9hbmltYXRpbmcgfHxcbiAgICAgIHRoaXMuX2Rpc2FibGVUb3VjaE1vdmVtZW50XG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHBvaW50OiBQb2ludCA9IHtcbiAgICAgIHg6IGV2dC50b3VjaGVzWzBdLmNsaWVudFgsXG4gICAgICB5OiBldnQudG91Y2hlc1swXS5jbGllbnRZLFxuICAgICAgdGltZTogK25ldyBEYXRlKCksXG4gICAgfTtcbiAgICBjb25zdCBtb3ZlbWVudCA9IHRoaXMuX2NhbGN1bGF0ZU1vdmVtZW50KHBvaW50KTtcbiAgICB0aGlzLl9jdXJyZW50T3JpZ2luID0gcG9pbnQ7XG5cbiAgICBpZiAobW92ZW1lbnQudmVsb2NpdHlYID09PSAwICYmIG1vdmVtZW50LnZlbG9jaXR5WSA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBhYnNWZWxvY2l0eVggPSBNYXRoLmFicyhtb3ZlbWVudC52ZWxvY2l0eVgpO1xuICAgIGNvbnN0IGFic1ZlbG9jaXR5WSA9IE1hdGguYWJzKG1vdmVtZW50LnZlbG9jaXR5WSk7XG4gICAgaWYgKGFic1ZlbG9jaXR5WCA+IGFic1ZlbG9jaXR5WSkge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcgJiZcbiAgICAgICAgYWJzVmVsb2NpdHlYID4gMS41ICYmXG4gICAgICAgIE1hdGguYWJzKG1vdmVtZW50LmRlbHRhWCkgPiA1MFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuX3Jlc2V0Q3VycmVudE9yaWdpbigpO1xuICAgICAgICB0aGlzLnNsaWRlKHtkaXI6IG1vdmVtZW50LnZlbG9jaXR5WCA8IDAgPyAnZm9yd2FyZCcgOiAnYmFjayd9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLl9nZXRDdXJyZW50UGFnZSgpO1xuICAgICAgICBpZiAocGFnZSAhPSBudWxsKSB7XG4gICAgICAgICAgcGFnZS5zZXRTY3JvbGwoJ3gnLCBtb3ZlbWVudC5kZWx0YVgsIG1vdmVtZW50LmRlbHRhVGltZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcgJiYgYWJzVmVsb2NpdHlZID4gMS41ICYmIE1hdGguYWJzKG1vdmVtZW50LmRlbHRhWSkgPiA1MCkge1xuICAgICAgICB0aGlzLl9yZXNldEN1cnJlbnRPcmlnaW4oKTtcbiAgICAgICAgdGhpcy5zbGlkZSh7ZGlyOiBtb3ZlbWVudC52ZWxvY2l0eVkgPCAwID8gJ2ZvcndhcmQnIDogJ2JhY2snfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwYWdlID0gdGhpcy5fZ2V0Q3VycmVudFBhZ2UoKTtcbiAgICAgICAgaWYgKHBhZ2UgIT0gbnVsbCkge1xuICAgICAgICAgIHBhZ2Uuc2V0U2Nyb2xsKCd5JywgbW92ZW1lbnQuZGVsdGFZLCBtb3ZlbWVudC5kZWx0YVRpbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25Ub3VjaEVuZCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZGlzYWJsZVRvdWNoTW92ZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fcmVzZXRDdXJyZW50T3JpZ2luKCk7XG4gIH1cblxuICBpc0N1cnJlbnRQYWdlTG9uZygpOiBib29sZWFuIHtcbiAgICBjb25zdCBjdXJQYWdlID0gdGhpcy5fZ2V0Q3VycmVudFBhZ2UoKTtcbiAgICBpZiAoY3VyUGFnZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBjdXJQYWdlLndyYXBwZXIubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQgPiBjdXJQYWdlLmNvbnRlbnQubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gIH1cblxuICBwcml2YXRlIF9yZXNldEN1cnJlbnRPcmlnaW4oKTogdm9pZCB7XG4gICAgdGhpcy5fY3VycmVudE9yaWdpbiA9IG51bGw7XG4gIH1cblxuICBwcml2YXRlIF9nZXRDdXJyZW50UGFnZSgpOiBBamZQYWdlU2xpZGVySXRlbSB8IG51bGwge1xuICAgIGlmICh0aGlzLnBhZ2VzID09IG51bGwgfHwgdGhpcy5jdXJyZW50UGFnZSA8IDAgfHwgdGhpcy5jdXJyZW50UGFnZSA+PSB0aGlzLnBhZ2VzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnBhZ2VzLnRvQXJyYXkoKVt0aGlzLmN1cnJlbnRQYWdlXTtcbiAgfVxuXG4gIHByaXZhdGUgX2NhbGN1bGF0ZU1vdmVtZW50KHBvaW50OiBQb2ludCk6IE1vdmVtZW50IHtcbiAgICBjb25zdCBkZWx0YVggPSBwb2ludC54IC0gdGhpcy5fY3VycmVudE9yaWdpbiEueDtcbiAgICBjb25zdCBkZWx0YVkgPSBwb2ludC55IC0gdGhpcy5fY3VycmVudE9yaWdpbiEueTtcbiAgICBjb25zdCBkZWx0YVRpbWUgPSBwb2ludC50aW1lIC0gdGhpcy5fY3VycmVudE9yaWdpbiEudGltZTtcbiAgICByZXR1cm4ge1xuICAgICAgdmVsb2NpdHlYOiBkZWx0YVggLyBkZWx0YVRpbWUsXG4gICAgICBkZWx0YVgsXG4gICAgICB2ZWxvY2l0eVk6IGRlbHRhWSAvIGRlbHRhVGltZSxcbiAgICAgIGRlbHRhWSxcbiAgICAgIGRlbHRhVGltZSxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfc2xpZGVCYWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jdXJyZW50UGFnZSA8PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY3VycmVudFBhZ2UgPSB0aGlzLl9jdXJyZW50UGFnZSAtIDE7XG4gIH1cblxuICBwcml2YXRlIF9zbGlkZUZvcndhcmQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRQYWdlID49IHRoaXMucGFnZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY3VycmVudFBhZ2UgPSB0aGlzLl9jdXJyZW50UGFnZSArIDE7XG4gIH1cblxuICBwcml2YXRlIF9zbGlkZVRvKHBhZ2U6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChwYWdlID49IDAgJiYgcGFnZSA8IHRoaXMucGFnZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmN1cnJlbnRQYWdlID0gcGFnZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9kb1NsaWRlKGltbWVkaWF0ZSA9IGZhbHNlKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYm9keSA9PSBudWxsIHx8IHRoaXMucGFnZXMgPT0gbnVsbCB8fCB0aGlzLl9hbmltYXRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICBjb25zdCBhbmltYXRpb24gPSB0aGlzLl9hbmltYXRpb25CdWlsZGVyLmJ1aWxkKFxuICAgICAgYW5pbWF0ZShpbW1lZGlhdGUgPyAwIDogdGhpcy5kdXJhdGlvbiwgc3R5bGUoe3RyYW5zZm9ybTogdGhpcy5fZ2V0Q3VycmVudFRyYW5zbGF0aW9uKCl9KSksXG4gICAgKTtcblxuICAgIGNvbnN0IHBsYXllciA9IGFuaW1hdGlvbi5jcmVhdGUodGhpcy5ib2R5Lm5hdGl2ZUVsZW1lbnQpO1xuICAgIHBsYXllci5vbkRvbmUoKCkgPT4ge1xuICAgICAgdGhpcy5fYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLl9wYWdlU2Nyb2xsRmluaXNoLmVtaXQoKTtcbiAgICB9KTtcbiAgICBwbGF5ZXIucGxheSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Q3VycmVudFRyYW5zbGF0aW9uKCk6IHN0cmluZyB7XG4gICAgY29uc3Qgc2xpZGVTaXplID0gMTAwIC8gdGhpcy5wYWdlcy5sZW5ndGg7XG4gICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLl9jdXJyZW50UGFnZSA9PT0gLTEgPyAwIDogdGhpcy5fY3VycmVudFBhZ2UgKiBzbGlkZVNpemU7XG4gICAgY29uc3QgdHJhbnNsYXRpb24gPSB0aGlzLl9vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJyA/ICdZJyA6ICdYJztcbiAgICByZXR1cm4gYHRyYW5zbGF0ZSR7dHJhbnNsYXRpb259KC0ke3Bvc2l0aW9ufSUpYDtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFByb3BzKCk6IHtwcm9wOiBzdHJpbmc7IHJlbW92ZVByb3A6IHN0cmluZ30ge1xuICAgIGlmICh0aGlzLl9vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgcmV0dXJuIHtwcm9wOiAnaGVpZ2h0JywgcmVtb3ZlUHJvcDogJ3dpZHRoJ307XG4gICAgfVxuICAgIHJldHVybiB7cHJvcDogJ3dpZHRoJywgcmVtb3ZlUHJvcDogJ2hlaWdodCd9O1xuICB9XG5cbiAgcHJpdmF0ZSBfb25TbGlkZXNDaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlU2l6ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ib2R5ID09IG51bGwgfHwgdGhpcy5wYWdlcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHtwcm9wLCByZW1vdmVQcm9wfSA9IHRoaXMuX2dldFByb3BzKCk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ib2R5Lm5hdGl2ZUVsZW1lbnQsIHByb3AsIGAke3RoaXMucGFnZXMubGVuZ3RoICogMTAwfSVgKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJvZHkubmF0aXZlRWxlbWVudCwgcmVtb3ZlUHJvcCwgbnVsbCk7XG4gICAgbGV0IGN1clBhZ2U6IG51bWJlciA9IHRoaXMuX2N1cnJlbnRQYWdlO1xuICAgIGlmICh0aGlzLnBhZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY3VyUGFnZSA9IC0xO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fY3VycmVudFBhZ2UgPT09IC0xKSB7XG4gICAgICBpZiAodGhpcy5wYWdlcy5maXJzdC5pc1JlcGVhdGluZykge1xuICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCB0aGlzLnBhZ2VzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICBpZiAodGhpcy5wYWdlcy5nZXQoaWR4KT8uaXNSZXBlYXRpbmdMYXN0KSB7XG4gICAgICAgICAgICBjdXJQYWdlID0gaWR4O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdXJQYWdlID0gMDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuX2N1cnJlbnRQYWdlID49IHRoaXMucGFnZXMubGVuZ3RoKSB7XG4gICAgICBjdXJQYWdlID0gdGhpcy5wYWdlcy5sZW5ndGggLSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJQYWdlID0gdGhpcy5fY3VycmVudFBhZ2U7XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnRQYWdlID0gY3VyUGFnZTtcbiAgICB0aGlzLl9yZXN0b3JlQ3VycmVudFBhZ2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Jlc3RvcmVDdXJyZW50UGFnZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kb1NsaWRlKHRydWUpO1xuICB9XG59XG4iXX0=