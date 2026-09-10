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
import { UntypedFormGroup } from '@angular/forms';
import { AjfFormIssues } from './slide-stats';
import * as i0 from "@angular/core";
/**
 * The bar at the top of every slide: its number and title, a completion
 * counter, a menu to jump to any other slide, previous/next paging, an alert
 * when the slide has failing fields, and a slot for the form's own action
 * buttons.
 *
 * Paging and error navigation belong to the renderer, which owns the page
 * slider, so they are raised as events rather than handled here.
 */
export declare class AjfSlideHeader {
    /** Absent while a start or end message page is on screen. */
    slide: AjfSlideInstance | null;
    /** The number shown in the badge, already offset by any start message. */
    displayNumber: number;
    /** Which repetition of a repeating slide this header belongs to. */
    repIndex: number;
    /** Every slide of the form, for the jump menu. */
    slides: AjfSlideInstance[];
    /** How many repetitions a repeating slide currently has; 0 when not repeating. */
    reps: number;
    /** How many visible slides the form has, for the "slide N of M" readout. */
    total: number;
    /** How many pages the slider holds, repetitions and message pages included. */
    pages: number;
    /**
     * The form's control group, which the completion counter reads values from.
     * Not named `formGroup`: that is ReactiveFormsModule's own selector, and would
     * bind FormGroupDirective to this element too.
     */
    group: UntypedFormGroup | null;
    /** What the whole form still has failing, computed by the renderer. */
    issues: AjfFormIssues | null;
    /**
     * Whether any slide of the form repeats. The repetition count sits inside the
     * jump trigger, so its slot is held open on every slide of such a form -- one
     * width for the whole form beats a trigger that jumps by the width of a pill
     * whenever a repeating slide comes up. Forms with no repeating slide never
     * reserve the space.
     */
    get hasRepeatingSlides(): boolean;
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
    readonly gotoIssue: EventEmitter<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfSlideHeader, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfSlideHeader, "ajf-slide-header", never, { "slide": { "alias": "slide"; "required": false; }; "displayNumber": { "alias": "displayNumber"; "required": false; }; "repIndex": { "alias": "repIndex"; "required": false; }; "slides": { "alias": "slides"; "required": false; }; "reps": { "alias": "reps"; "required": false; }; "total": { "alias": "total"; "required": false; }; "pages": { "alias": "pages"; "required": false; }; "group": { "alias": "group"; "required": false; }; "issues": { "alias": "issues"; "required": false; }; }, { "jumpTo": "jumpTo"; "prev": "prev"; "next": "next"; "gotoIssue": "gotoIssue"; }, never, ["*"], false, never>;
}
//# sourceMappingURL=slide-header.d.ts.map