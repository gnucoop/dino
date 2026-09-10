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
import { ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { AjfPageSliderItemScrollDirection } from './page-slider-item-scroll-direction';
import * as i0 from "@angular/core";
export declare class AjfPageSliderItem implements OnDestroy {
    private _el;
    private _renderer;
    wrapper: ElementRef;
    content: ElementRef;
    private _scrollEvt;
    readonly scroll: Observable<{
        x: number;
        y: number;
    }>;
    /**
     * True if the Slider Item belongs to a repeting slide.
     */
    private _isRepeating;
    get isRepeating(): boolean;
    set isRepeating(rep: boolean);
    /**
     * True if the Slider Item is the last item of a repeating slide.
     */
    private _isRepeatingLast;
    get isRepeatingLast(): boolean;
    set isRepeatingLast(rep: boolean);
    private _scrollX;
    private _scrollY;
    private _resizeObserver;
    private _resizeEvent;
    private _resizeSub;
    constructor(_el: ElementRef, _renderer: Renderer2);
    ngOnDestroy(): void;
    setScroll(dir: AjfPageSliderItemScrollDirection, amount: number, _duration: number): boolean;
    private _onResize;
    private _fixScrollOnResize;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfPageSliderItem, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfPageSliderItem, "ajf-page-slider-item", never, { "isRepeating": { "alias": "isRepeating"; "required": false; }; "isRepeatingLast": { "alias": "isRepeatingLast"; "required": false; }; }, { "scroll": "scroll"; }, never, ["*"], false, never>;
}
//# sourceMappingURL=page-slider-item.d.ts.map