/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dewco (dewco).
 *
 * Dewco (dewco) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dewco (dewco) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dewco (dewco).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  MatSlideToggle,
  MatSlideToggleChange,
} from '@angular/material/slide-toggle';
import {Subscription} from 'rxjs';

@Component({
  selector: 'dewco-mat-slide-toggle',
  styleUrls: ['dewco-mat-slide-toggle.css'],
  templateUrl: 'dewco-mat-slide-toggle.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DewcoMatSlideToggle implements AfterViewInit, OnDestroy {
  @ViewChild(MatSlideToggle) matSlideToggle: MatSlideToggle;
  @Input() labelOff: string|null;
  @Input() labelOn: string|null;
  @Input() disabled: boolean = false;
  @Input() name: string|null;
  @Input() required: boolean;
  @Input() checked: boolean;
  @Output() change: EventEmitter<MatSlideToggleChange>;
  private _changeSub: Subscription = Subscription.EMPTY;
  constructor(private _cdr: ChangeDetectorRef) {
    this.change = new EventEmitter<MatSlideToggleChange>();
  }
  ngAfterViewInit() {
    this.matSlideToggle.disabled = this.disabled;
    this.matSlideToggle.name = this.name;
    this.matSlideToggle.required = this.required;
    this.matSlideToggle.checked = this.checked;
    this._changeSub =
        this.matSlideToggle.change.subscribe((ev: MatSlideToggleChange) => this.change.emit(ev));

    this._cdr.detectChanges();
  }

  toggle(): void {
    this.matSlideToggle.toggle();
  }

  ngOnDestroy() {
    this._changeSub.unsubscribe();
  }
}
