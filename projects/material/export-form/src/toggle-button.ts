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
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

/** Change event object emitted by ToggleButtonComponent. */
export interface ExportSelectAllChange {
  /** The source ToggleButtonComponent of the event. */
  source: ToggleButtonComponent;
  /** The new `checked` value of the checkbox. */
  checked: boolean;
}

@Component({
  selector: 'dino-toggle-button',
  templateUrl: 'toggle-button.html',
  styleUrls: ['toggle-button.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ToggleButtonComponent {
  checked: boolean = false;

  private _groupName: string | null = null;
  get group(): string | null {
    return this._groupName;
  }
  @Input()
  set group(name: string | null) {
    this._groupName = name;
  }

  @Output()
  readonly change: EventEmitter<ExportSelectAllChange> = new EventEmitter<ExportSelectAllChange>();
  constructor(private _cdr: ChangeDetectorRef) {}

  toggle(): void {
    this.checked = !this.checked;
    const event: ExportSelectAllChange = {
      source: this,
      checked: this.checked,
    };
    this.change.emit(event);
  }

  setChecked(val: boolean): void {
    this.checked = val;
    this._cdr.detectChanges();
  }
}
