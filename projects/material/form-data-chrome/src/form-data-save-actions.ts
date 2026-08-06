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

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

/**
 * The Save draft / Save form pair used by the form-data collection UI.
 *
 * It is shown in the same place on every step of the collection flow — the
 * control row of the Form Data step and of the Form Metrics step — so it lives
 * in one component and both hosts decide what a click means.
 */
@Component({
  selector: 'dino-form-data-save-actions',
  templateUrl: 'form-data-save-actions.html',
  styleUrls: ['form-data-save-actions.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FormDataSaveActions {
  /** When true, hides both actions. */
  @Input() isReadonly: boolean | null = null;

  /** Whether the Save-draft action is available. */
  @Input() allowSaveDraft = false;

  /** Whether the Save-draft action is currently disabled. */
  @Input() saveDraftDisabled: boolean | null = null;

  /**
   * Whether the Save-form action is currently disabled. Left null by hosts that
   * would rather accept the click and explain what is missing.
   */
  @Input() saveDisabled: boolean | null = null;

  /**
   * Tour anchor names. Empty by default: the actions appear more than once in
   * the collection flow and a tour anchor may only be registered once.
   */
  @Input() saveFormTourAnchor = '';
  @Input() saveDraftTourAnchor = '';

  /** Emitted when the user requests a full save. */
  @Output() saveForm = new EventEmitter<void>();

  /** Emitted when the user requests a draft save. */
  @Output() saveDraft = new EventEmitter<void>();
}
