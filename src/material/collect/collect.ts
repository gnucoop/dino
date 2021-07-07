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
  Component,
  Input,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import {FormSchemaManager} from '@dewco/core/forms';
import {BreakpointObserverService} from '@dewco/material/breakpoint-observer';
import {BehaviorSubject, from, of as obsOf, Subscription} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {CollectItem} from './collect-item-interface';

/**
 * Dino collect home component.
 * Gateway to the individual list views.
 */
@Component({
  selector: 'dewco-collect',
  templateUrl: 'collect.html',
  styleUrls: ['collect.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Collect implements AfterViewInit, OnDestroy {
  /**
   * An array of items to be displayed in the grid.
   * They can represent Forms or any generic Item (eg. a Section of the app)
   */
  private _items: BehaviorSubject<CollectItem[]> = new BehaviorSubject<CollectItem[]>([]);
  get items(): BehaviorSubject<CollectItem[]> {
    return this._items;
  }

  /**
   * Subscribes to the collect isFormsCollect flag and to the custom
   * list of menu items passed in input.
   */
  private _itemsSub: Subscription = Subscription.EMPTY;

  /**
   * An array of items to be displayed in the Dashboard menu grid.
   * They represent generic Items (eg. a Section of the app)
   */
  @Input()
  set menuItems(menuItems: CollectItem[]) {
    if (menuItems == null || menuItems.length <= 0) {
      return;
    }
    this._items.next(menuItems);
  }

  /**
   * The number of grid columns for small screens/devices.
   * Defaults to 2.
   */
  private _columnsSmall = 2;
  get columnsSmall(): number {
    return this._columnsSmall;
  }
  @Input()
  set columnsSmall(num: number) {
    if (num <= 0) {
      return;
    }
    this._columnsSmall = num;
  }

  /**
   * The number of grid columns for medium to large screens/devices.
   * Defaults to 4.
   */
  private _columnsLarge = 4;
  get columnsLarge(): number {
    return this._columnsLarge;
  }
  @Input()
  set columnsLarge(num: number) {
    if (num <= 0) {
      return;
    }
    this._columnsLarge = num;
  }

  /**
   * When true, the collect shows the list of available form schemas, gathered by
   * the Form Schema manager.
   * When false, a custom list of items must be provided. This way, this Collect component
   * can be used as a simple menu.
   * Defaults to true.
   */
  private _isFormsCollect: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  @Input()
  set isFormsCollect(res: boolean) {
    this._isFormsCollect.next(res);
  }

  constructor(
      readonly breakpointObserver: BreakpointObserverService,
      private _fs: FormSchemaManager,
  ) {}

  ngAfterViewInit() {
    this._itemsSub = this._isFormsCollect
                         .pipe(
                             switchMap(isCollect => {
                               if (isCollect) {
                                 const res = this._fs.list().pipe(
                                     switchMap(rxdbQuery => from(rxdbQuery.exec())));
                                 return res.pipe(
                                     map(docs => {
                                       let collectItems: CollectItem[] = [];
                                       for (let document of docs.filter(dcm => dcm != null)) {
                                         let collectItem: CollectItem = {
                                           name: document.name,
                                           label: document.label ?? document.name,
                                           icon: document.icon,
                                           schemaId: document.id,
                                         };
                                         collectItems.push(collectItem);
                                       }
                                       return collectItems.sort((a, b) => {
                                         if (a.name < b.name) {
                                           return -1;
                                         } else {
                                           if (a.name > b.name) {
                                             return 1;
                                           } else {
                                             return 0;
                                           }
                                         }
                                       });
                                     }),
                                 );
                               }
                               return obsOf(null);
                             }),
                             )
                         .subscribe({
                           next: items => {
                             if (items != null) {
                               this._items.next(items);
                             }
                           }
                         });
  }

  ngOnDestroy() {
    this._itemsSub.unsubscribe();
  }
}
