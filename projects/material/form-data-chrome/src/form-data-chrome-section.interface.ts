/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dino (dino).
 *
 * Dino (dino) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dino (dino) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dino (dino).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {AjfSlideInstance} from '@ajf/core/forms';

/**
 * A view-model describing a single navigable section (a visible Ajf slide),
 * derived from the form renderer's slide instances.
 */
export interface SectionView {
  /** The underlying Ajf slide instance. */
  slide: AjfSlideInstance;
  /** The section index within the visible-sections array. */
  index: number;
  /** The section label (slide node label). */
  label: string;
  /** The 1-based display number. */
  number: number;
  /** False when at least one field in the section is invalid. */
  valid: boolean;
  /** True when the underlying slide is a repeating slide. */
  isRepeating: boolean;
  /** The number of repetitions (1 for non-repeating slides). */
  reps: number;
  /** True when a repetition can be added. */
  canAdd: boolean;
  /** True when the current repetition can be removed. */
  canRemove: boolean;
  /** True when removal of repetitions is disabled. */
  disableRemoval: boolean;
  /**
   * The number of fields the user is expected to fill in the section, counted
   * across every repetition. Formatted-text and formula fields are excluded:
   * nobody fills those in.
   */
  fieldCount: number;
  /** How many of those fields currently hold a value. */
  filledCount: number;
  /** True when every field holds a value and the section has no errors. */
  complete: boolean;
}

/**
 * How far along the whole form is, aggregated over the visible sections.
 */
export interface FormProgress {
  /** Fields the user is expected to fill, across the form. */
  fieldCount: number;
  /** How many of them hold a value. */
  filledCount: number;
  /** `filledCount` as a whole percentage of `fieldCount`. */
  filledPercent: number;
  /** Sections that are complete. */
  completeCount: number;
  /** Visible sections. */
  sectionCount: number;
}

/**
 * A flattened reference to a single page of the form slider.
 * A non-repeating section contributes one page; a repeating section
 * contributes one page per repetition. Page indexes align 1:1 with
 * `AjfPageSlider.currentPage`.
 */
export interface PageRef {
  /** Index of the owning section within the visible-sections array. */
  sectionIndex: number;
  /** The repetition index within the owning section (0 for non-repeating). */
  rep: number;
  /** Total repetitions of the owning section. */
  reps: number;
}
