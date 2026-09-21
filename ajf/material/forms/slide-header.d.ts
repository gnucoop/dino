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
import { AjfSlideInstance } from '@ajf/core/forms';
import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * The bar at the top of every slide: its number and title, a menu to jump to any
 * other slide, previous/next paging, and a slot for the form's own action
 * buttons.
 *
 * What the form still has failing is reported by the footer alone. Naming it
 * here too cost a phone's whole header width to repeat something already on
 * screen.
 *
 * Paging belongs to the renderer, which owns the page slider, so it is raised
 * as an event rather than handled here.
 */
export declare class AjfSlideHeader {
    /** Absent while a start or end message page is on screen. */
    slide: AjfSlideInstance | null;
    /** The number shown in the badge, already offset by any start message. */
    displayNumber: number;
    /** Every slide of the form, for the jump menu. */
    slides: AjfSlideInstance[];
    /** How many pages the slider holds, repetitions and message pages included. */
    pages: number;
    /**
     * Whether the form has anywhere to page to. A single page form gets no arrows
     * and no "slide 1 of 1": both are controls that cannot do anything.
     */
    get canNavigate(): boolean;
    /**
     * Whether the jump menu is worth opening. Counted over the visible slides, the
     * only ones the menu can actually reach.
     */
    get canJump(): boolean;
    readonly jumpTo: EventEmitter<AjfSlideInstance>;
    readonly prev: EventEmitter<void>;
    readonly next: EventEmitter<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfSlideHeader, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfSlideHeader, "ajf-slide-header", never, { "slide": { "alias": "slide"; "required": false; }; "displayNumber": { "alias": "displayNumber"; "required": false; }; "slides": { "alias": "slides"; "required": false; }; "pages": { "alias": "pages"; "required": false; }; }, { "jumpTo": "jumpTo"; "prev": "prev"; "next": "next"; }, never, ["*"], false, never>;
}
//# sourceMappingURL=slide-header.d.ts.map