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
import {Router} from '@angular/router';
import {FormSchema, FormSchemaManager} from '@dino/core/forms';
import {ReportSchema, ReportSchemaManager} from '@dino/core/reports';
import {BreakpointObserverService} from '@dino/material/breakpoint-observer';
import {BehaviorSubject, combineLatest, from, Observable, of as obsOf} from 'rxjs';
import {map, shareReplay, switchMap} from 'rxjs/operators';

import {CollectItem} from './collect-item-interface';

/**
 * Type representing the available Collect component types.
 */
export type CollectType = 'report' | 'form' | 'custom';

/**
 * Dino collect home component.
 * Gateway to the individual list views.
 */
@Component({
  selector: 'dino-collect',
  templateUrl: 'collect.html',
  styleUrls: ['collect.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Collect {
  /**
   * An array of items to be displayed in the grid.
   * They can represent Forms or any generic Item (eg. a Section of the app)
   */
  readonly items: Observable<CollectItem[]>;

  private _menuItems = new BehaviorSubject<CollectItem[]>([]);

  /**
   * An array of items to be displayed in the Dashboard menu grid.
   * They represent generic Items (eg. a Section of the app)
   */
  @Input()
  set menuItems(menuItems: CollectItem[]) {
    if (menuItems == null || menuItems.length <= 0) {
      return;
    }
    this._menuItems.next(menuItems);
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
   * Specifies the type of the collect component instance.
   * It can automatically gather a list of formschemas, report schemas, or can be
   * provided a custom list of generic menu items.
   */
  private _collectType: BehaviorSubject<CollectType> = new BehaviorSubject<CollectType>('custom');
  @Input()
  set collectType(res: CollectType) {
    this._collectType.next(res);
  }
  get getCollectType(): CollectType {
    return this._collectType.value;
  }

  constructor(
    readonly breakpointObserver: BreakpointObserverService,
    private _fs: FormSchemaManager,
    private _rs: ReportSchemaManager,
    private _router: Router,
  ) {
    this.items = combineLatest([this._collectType, this._menuItems]).pipe(
      switchMap(([isCollect, menuItems]) => {
        if (isCollect !== 'custom') {
          let result: Observable<(FormSchema | ReportSchema)[]>;
          if (isCollect === 'report') {
            result = this._rs.list().pipe(switchMap(rxdbQuery => from(rxdbQuery.exec())));
          } else {
            result = this._fs.list().pipe(switchMap(rxdbQuery => from(rxdbQuery.exec())));
          }
          return result.pipe(
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
        return obsOf(menuItems);
      }),
      shareReplay(1),
    );
  }

  /**
   * Redirects to the Edit Form Schema component
   * @param schemaId The clicked item schema id
   */
  editFormSchema(schemaId: string | undefined): void {
    if (schemaId != null) {
      this._router.navigate(['edit-form-schema', schemaId]);
    }
  }

  /**
   * Redirects to the Edit Form Schema component, in create mode.
   */
  addFormSchema(): void {
    this._router.navigate(['add-form-schema']);
  }
}
