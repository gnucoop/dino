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
import { AjfFieldInstance, AjfFormRenderer as CoreFormRenderer, AjfFormRendererService, AjfSlideInstance } from '@ajf/core/forms';
import { BooleanInput } from '@angular/cdk/coercion';
import { AfterViewChecked, ChangeDetectorRef, OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
export declare class AjfFormRenderer extends CoreFormRenderer implements AfterViewChecked, OnDestroy {
    /**
     * @deprecated The slide strip has been replaced by the jump menu in the slide
     * header, which is always available. Kept so that existing templates still
     * compile.
     */
    topBar: boolean;
    /**
     * @deprecated Field rows align their labels and controls on a shared grid, so
     * there is nothing left to centre.
     */
    centeredFieldsContent: boolean;
    /** How many field rows sit side by side. */
    maxColumns: 1 | 2 | 3;
    /**
     * The page the slider is showing. The slide header is rendered once, above the
     * slider, so it needs to know which slide is on screen; the page slider only
     * reports that imperatively, hence the mirrored property.
     */
    currentPage: number;
    private _slideList;
    private _validitySubscription;
    private _slidesSubscription;
    private _valueSubscription;
    private _pageSubscription;
    private _pageInit;
    constructor(rendererService: AjfFormRendererService, changeDetectorRef: ChangeDetectorRef);
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    fieldStyle(field: AjfFieldInstance): any;
    /** Page to the first page of a slide, from the header's jump menu. */
    goToSlide(slide: AjfSlideInstance): void;
    /** Page to one repetition of the repeating slide currently on screen. */
    goToRep(slide: AjfSlideInstance, repIndex: number): void;
    goToPrevSlide(): void;
    goToNextSlide(): void;
    /**
     * The slider page a slide starts on. `AjfSlideInstance.position` cannot be
     * used directly here: it does not account for a start message page, and this
     * has to agree with the page arithmetic used by `ajfCurrentSlide`.
     */
    private _pageOf;
    private _slideTo;
    static ngAcceptInputType_fixedOrientation: BooleanInput;
    static ngAcceptInputType_hasEndMessage: BooleanInput;
    static ngAcceptInputType_hasStartMessage: BooleanInput;
    static ngAcceptInputType_hideBottomToolbar: BooleanInput;
    static ngAcceptInputType_hideNavigationButtons: BooleanInput;
    static ngAcceptInputType_hideTopToolbar: BooleanInput;
    static ngAcceptInputType_readonly: BooleanInput;
    static ngAcceptInputType_saveDisabled: BooleanInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFormRenderer, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfFormRenderer, "ajf-form", never, { "topBar": { "alias": "topBar"; "required": false; }; "centeredFieldsContent": { "alias": "centeredFieldsContent"; "required": false; }; "maxColumns": { "alias": "maxColumns"; "required": false; }; }, {}, never, ["[ajfFormTopToolbarButtons]", "[ajfFormSaveButton]", "[ajfFormStartMessageTitle]", "[ajfFormStartMessage]", "[ajfFormEndMessageTitle]", "[ajfFormEndMessage]"], false, never>;
}
//# sourceMappingURL=form.d.ts.map