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

import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';

/**
 * Dino Metric Editor component.
 * Allows the Admin to add and edit entries for any optional metric.
 * The generic type refers to the model of the Metric to be edited.
 */
@Component({
  selector: 'dino-floating-button',
  templateUrl: 'floating-button.html',
  styleUrls: ['floating-button.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FloatingButton {
  /**
   * The message displayed by the button tooltip.
   */
  @Input() tooltipMessage?: string;

  /**
   * The url to which the button points.
   * If no url is specified, no redirection happens.
   */
  @Input() buttonUrl?: string;

  /**
   * The button icon codename.
   */
  @Input() buttonIcon?: string;

  /**
   * The button disable condition observable.
   */
  @Input() buttonDisabled?: boolean;

  /**
   * If true, the button is draggable with a handle.
   * Defaults to false.
   */
  @Input() draggable?: boolean;

  /**
   * If specified, the button is extendend and displays the operation cost
   */
  @Input() cost?: number | null;

  /**
   * The optional UI Tour tourAnchor
   */
  @Input() tourAnchor?: string;

  /**
   * If true, the button is interactive during the UI Tour
   */
  @Input() tourInteractive?: boolean;
}
