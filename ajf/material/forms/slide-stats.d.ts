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
import { AjfBaseSlideInstance, AjfSlideInstance } from '@ajf/core/forms';
import { PipeTransform } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
/** The filled/total counter shown as a chip in the slide header. */
export interface AjfSlideCompletion {
    done: number;
    total: number;
}
/**
 * How many of a slide's fields carry a value, out of how many are on it. Notes
 * (`AjfFieldType.Empty`) hold no value and are left out of both numbers.
 *
 * Impure because it reads mutable instance state, in the same way as
 * `ajfValidSlide` and `ajfAsFieldInstanceErrors`. Returns a memoized object; see
 * the note inside.
 */
export declare class AjfSlideCompletionPipe implements PipeTransform {
    private _last;
    transform(slide: AjfBaseSlideInstance, idx?: number, formGroup?: UntypedFormGroup | null): AjfSlideCompletion;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfSlideCompletionPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<AjfSlideCompletionPipe, "ajfSlideCompletion", false>;
}
/**
 * How many of a slide's visible fields are failing validation.
 */
export declare class AjfSlideIssuesPipe implements PipeTransform {
    transform(slide: AjfBaseSlideInstance, idx?: number): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfSlideIssuesPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<AjfSlideIssuesPipe, "ajfSlideIssues", false>;
}
/** What is left to fix in the whole form, for the header and footer alerts. */
export interface AjfFormIssues {
    /** Visible fields failing validation, across every slide and repetition. */
    fields: number;
    /** How many slides hold at least one of them. */
    slides: number;
}
/**
 * The form's outstanding work in one place. A per-slide count only tells the
 * reader about the slide they are already looking at, which is the one place
 * they can see the failing fields for themselves.
 *
 * Counted here rather than taken from `AjfFormRendererService.errors`, which
 * counts invalid slide pages and says nothing about how many fields are behind
 * them.
 *
 * Impure and memoized, like its neighbours above.
 */
export declare class AjfFormIssuesPipe implements PipeTransform {
    private _last;
    transform(slides: AjfSlideInstance[] | null): AjfFormIssues;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFormIssuesPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<AjfFormIssuesPipe, "ajfFormIssues", false>;
}
//# sourceMappingURL=slide-stats.d.ts.map