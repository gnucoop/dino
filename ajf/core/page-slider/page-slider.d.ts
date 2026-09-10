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
import { AnimationBuilder } from '@angular/animations';
import { AfterContentInit, ChangeDetectorRef, ElementRef, OnDestroy, QueryList, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { AjfPageSliderItem } from './page-slider-item';
import { AjfPageSliderSlideOptions } from './page-slider-slide-options';
import * as i0 from "@angular/core";
export type AjfPageSliderOrientation = 'horizontal' | 'vertical';
export declare class AjfPageSlider implements AfterContentInit, OnDestroy {
    private _animationBuilder;
    private _cdr;
    private _renderer;
    body: ElementRef;
    pages: QueryList<AjfPageSliderItem>;
    private _pageScrollFinish;
    readonly pageScrollFinish: Observable<void>;
    private _orientationChange;
    readonly orientationChange: Observable<AjfPageSliderOrientation>;
    duration: number;
    private _orientation;
    get orientation(): AjfPageSliderOrientation;
    set orientation(orientation: AjfPageSliderOrientation);
    private _fixedOrientation;
    get fixedOrientation(): boolean;
    set fixedOrientation(_: boolean);
    private _currentPage;
    get currentPage(): number;
    set currentPage(currentPage: number);
    private _hideNavigationButtons;
    get hideNavigationButtons(): boolean;
    set hideNavigationButtons(hnb: boolean);
    /**
     * If true, disable scroll movement calculation in the form.
     * If false, when touching the form fields, scroll to the next field.
     */
    private _disableTouchMovement;
    private _animating;
    private _pagesSub;
    private _currentOrigin;
    private _mouseWheelEvt;
    private _mouseWheelSub;
    constructor(_animationBuilder: AnimationBuilder, _cdr: ChangeDetectorRef, _renderer: Renderer2);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    switchOrientation(): void;
    slide(opts: AjfPageSliderSlideOptions): void;
    onMouseWheel(event: Event): void;
    onTouchStart(evt: TouchEvent): void;
    onTouchMove(evt: TouchEvent): void;
    onTouchEnd(): void;
    isCurrentPageLong(): boolean;
    private _resetCurrentOrigin;
    private _getCurrentPage;
    private _calculateMovement;
    private _slideBack;
    private _slideForward;
    private _slideTo;
    private _doSlide;
    private _getCurrentTranslation;
    private _getProps;
    private _onSlidesChange;
    private _updateSize;
    private _restoreCurrentPage;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfPageSlider, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AjfPageSlider, never, never, { "duration": { "alias": "duration"; "required": false; }; "orientation": { "alias": "orientation"; "required": false; }; "fixedOrientation": { "alias": "fixedOrientation"; "required": false; }; "currentPage": { "alias": "currentPage"; "required": false; }; "hideNavigationButtons": { "alias": "hideNavigationButtons"; "required": false; }; }, { "pageScrollFinish": "pageScrollFinish"; "orientationChange": "orientationChange"; }, ["pages"], never, false, never>;
}
//# sourceMappingURL=page-slider.d.ts.map