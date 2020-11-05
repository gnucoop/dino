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
  ContentChildren,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import {MatTab, MatTabGroup} from '@angular/material/tabs';

@Component({
  selector: 'dewco-mat-tab-group',
  styleUrls: ['dewco-mat-tab-group.css'],
  templateUrl: 'dewco-mat-tab-group.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DewcoMatTabGroup implements AfterViewInit {
  @ViewChild(MatTabGroup) matTabGroup: MatTabGroup;
  @ViewChildren(MatTab) tabs: QueryList<MatTab>;
  @ContentChildren(MatTab, {descendants: true}) tabsFromNgContent: QueryList<MatTab>;
  constructor(private _cdr: ChangeDetectorRef) {}
  ngAfterViewInit() {
    this.matTabGroup._tabs.reset([...this.tabs.toArray(), ...this.tabsFromNgContent.toArray()]);
    this.matTabGroup.animationDuration = '0';
    this._cdr.detectChanges();
    this.matTabGroup.animationDuration = '250';
  }
}
