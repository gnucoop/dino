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
import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
/** Which slide the page slider is currently showing, and where it sits. */
export interface AjfCurrentSlide {
    /** Null while a start or end message page is on screen. */
    slide: AjfSlideInstance | null;
    /** The repetition on screen, zero based; 0 for a non-repeating slide. */
    repIndex: number;
    /** How many repetitions the slide has; 0 when it does not repeat. */
    reps: number;
    /** The slide's ordinal among the visible ones, for the header badge. */
    displayNumber: number;
    /** How many visible slides the form has. */
    total: number;
    /**
     * How many pages the slider holds: one per visible slide, one per repetition
     * of a repeating slide, plus the start and end message pages. Nothing to
     * navigate to when this is 1.
     */
    pages: number;
}
/**
 * Resolve the page slider's current page into a slide.
 *
 * The renderer lays out one page per slide, and one page per repetition of a
 * repeating slide, optionally preceded by a start message page -- the same
 * arithmetic the error navigation in `AjfFormRenderer` performs.
 *
 * Impure, because slide visibility and repetition counts are mutated in place.
 * The result is memoized so that the pipe keeps handing back the same object
 * while nothing has moved: returning a fresh one on every check would trip
 * Angular's "expression has changed after it was checked" guard.
 */
export declare class AjfCurrentSlidePipe implements PipeTransform {
    private _last;
    transform(slides: AjfSlideInstance[] | null, currentPage: number, hasStartMessage: boolean, hasEndMessage?: boolean): AjfCurrentSlide;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfCurrentSlidePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<AjfCurrentSlidePipe, "ajfCurrentSlide", false>;
}
//# sourceMappingURL=current-slide.d.ts.map