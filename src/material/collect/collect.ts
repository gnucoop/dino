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
import {PermissionContextService} from '@dino/core/data';
import {FormSchema, FormSchemaManager} from '@dino/core/forms';
import {ReportSchema, ReportSchemaManager} from '@dino/core/reports';
import {BreakpointObserverService} from '@dino/material/breakpoint-observer';
import {RxDocument} from 'rxdb';
import {BehaviorSubject, combineLatest, Observable, of as obsOf} from 'rxjs';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {CollectItem} from './collect-item-interface';

/**
 * Type representing the available Collect component types.
 */
export type CollectType = 'reports' | 'forms' | 'custom';

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

  /**
   * True if the Add button must be displayed
   */
  displayAddButton: Observable<boolean>;

  private _menuItems = new BehaviorSubject<CollectItem[]>([]);

  /**
   * Displayed when no items are available
   */
  readonly noItemsMessage = new BehaviorSubject<string>('');
  @Input()
  set setNoItemsMessage(message: string) {
    if (message == null) {
      return;
    }
    this.noItemsMessage.next(message);
  }

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

  /**
   * Items sorting key
   */
  private _sortBy = new BehaviorSubject<keyof CollectItem>('name');
  get sortBy(): keyof CollectItem {
    return this._sortBy.value;
  }
  @Input()
  set sortBy(value: keyof CollectItem) {
    this._sortBy.next(value);
  }

  constructor(
    readonly breakpointObserver: BreakpointObserverService,
    private _fs: FormSchemaManager,
    private _rs: ReportSchemaManager,
    private _pcs: PermissionContextService,
    private _router: Router,
  ) {
    const res = combineLatest([
      this._collectType,
      this._menuItems,
      this._pcs.permissionContext,
    ]).pipe(
      switchMap(([isCollect, menuItems, permissionContext]) => {
        if (isCollect !== 'custom') {
          let result: Observable<(RxDocument<FormSchema> | RxDocument<ReportSchema>)[]>;
          if (isCollect === 'reports') {
            result = this._rs.list();
            this.displayAddButton = this._pcs
              .getAllowedActions('report_schema')
              .pipe(map(actions => actions.some(act => act === 'create')));
          } else {
            result = this._fs.list();
            this.displayAddButton = this._pcs
              .getAllowedActions('form_schema')
              .pipe(map(actions => actions.some(act => act === 'create')));
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
                  editable: this._pcs.checkPermission(
                    document.id,
                    document.collection.name,
                    'edit',
                    permissionContext,
                  ),
                };
                collectItems.push(collectItem);
              }
              return collectItems;
            }),
          );
        }
        return obsOf(menuItems);
      }),
      shareReplay(1),
    );

    this.items = res.pipe(
      switchMap(items => combineLatest([this._sortBy]).pipe(map(([sortBy]) => ({items, sortBy})))),
      map(({items, sortBy}) => {
        return items.sort((a, b) => {
          const v1 = a[sortBy];
          const v2 = b[sortBy];
          const bToI = (v: boolean | string | undefined) => ((v as boolean) || false ? 1 : 1);
          if (typeof v1 === 'boolean' || typeof v2 === 'boolean') {
            return bToI(v1) - bToI(v2);
          }
          return ((v1 as string) || '').localeCompare((v2 as string) || '');
        });
      }),
      shareReplay(1),
    );
  }

  /**
   * Redirects to the Edit Form/Report Schema component
   * @param schemaId The clicked item schema id
   */
  editSchema(schemaId: string | undefined): void {
    if (schemaId != null) {
      this._router.navigate([this._collectType.getValue(), 'schema', schemaId, 'edit']);
    }
  }

  /**
   * Redirects to the Edit Form/Report Schema component, in create mode.
   */
  addSchema(): void {
    this._router.navigate([this._collectType.getValue(), 'schema', 'create']);
  }
}
