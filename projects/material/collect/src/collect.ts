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

import {BooleanInput, coerceBooleanProperty} from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {PermissionContextService} from '@dino/core/data';
import {FormSchema, FormSchemaManager} from '@dino/core/forms';
import {LocationManager} from '@dino/core/locations';
import {ReportSchema, ReportSchemaManager} from '@dino/core/reports';
import {BreakpointObserverService} from '@dino/material/breakpoint-observer';
import {RxDocument} from 'rxdb';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of as obsOf,
  Subscription,
  throwError,
} from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  shareReplay,
  startWith,
  switchMap,
  take,
} from 'rxjs/operators';
import {CollectItem} from './collect-item-interface';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {FormMetricSelectorDialog} from '@dino/material/form-metric-selector';
import {DeleteSchema} from '@dino/material/delete-schema';

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
  styleUrls: ['collect.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Collect implements OnDestroy {
  /**
   * An array of items to be displayed in the grid.
   * They can represent Forms or any generic Item (eg. a Section of the app)
   */
  readonly items: Observable<CollectItem[]>;

  /**
   * True if the Add button must be displayed
   */
  displayAddButton: Observable<boolean> = obsOf(false);

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

  /**
   * Show items filter input
   */
  private _filterBar = false;
  get filterBar(): boolean {
    return this._filterBar;
  }
  @Input()
  set filterBar(value: BooleanInput) {
    this._filterBar = coerceBooleanProperty(value);
    this._cdr.markForCheck();
  }

  /**
   * Secondary metric field to display in the Form Metric Selector and Filters
   */
  private _secondaryMetricFieldsDisplayed: {
    [metricName: string]: string;
  } | null = null;
  get secondaryMetricFieldsDisplayed(): {
    [metricName: string]: string;
  } | null {
    return this._secondaryMetricFieldsDisplayed;
  }
  @Input()
  set secondaryMetricFieldsDisplayed(
    fields: {
      [metricName: string]: string;
    } | null,
  ) {
    this._secondaryMetricFieldsDisplayed = fields;
  }

  readonly filterCtrl = new UntypedFormControl('');

  /**
   * Subscribes to the value returned by the Delete Schema MatDialog on its closing event
   */
  private _deleteSchemaDialogSub: Subscription = Subscription.EMPTY;

  /**
   * A reference to the MatDialog that contains the DeleteSchema component
   */
  private _dialogRef?: MatDialogRef<DeleteSchema>;

  constructor(
    readonly breakpointObserver: BreakpointObserverService,
    private _fs: FormSchemaManager,
    private _rs: ReportSchemaManager,
    private _pcs: PermissionContextService,
    private _router: Router,
    private _cdr: ChangeDetectorRef,
    private _dialog: MatDialog,
    @Optional() locManager: LocationManager | null,
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
                const metrics = (document as RxDocument<FormSchema>).form_schema_metrics || [];
                const hasLocation =
                  metrics.length === 0 ? locManager != null : metrics.includes('location');
                let collectItem: CollectItem = {
                  name: document.name,
                  label: document.label ?? document.name,
                  icon: document.icon,
                  svgIcon: document.icon?.includes('icon-') ? document.icon : undefined,
                  schemaId: document.id,
                  editable: this._pcs.checkPermission(
                    document.id,
                    document.collection.name,
                    'edit',
                    permissionContext,
                  ),
                  shareUrl:
                    'visibility' in document &&
                    document.visibility === 1 &&
                    this._pcs.checkPermission(
                      document.id,
                      'form_schema',
                      'create',
                      permissionContext,
                      true,
                    ),
                  hasLocation,
                  unique:
                    'uniqueMetricsSet' in document.schema && document.schema.uniqueMetricsSet
                      ? document.schema.uniqueMetricsSet
                      : undefined,
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

    const filter$ = this.filterCtrl.valueChanges.pipe(
      debounceTime(100),
      startWith(this.filterCtrl.value as string),
    ) as Observable<string>;

    this.items = combineLatest([res, this._sortBy, filter$]).pipe(
      map(([items, sortBy, filterKey]) => {
        filterKey = filterKey.trim().toLocaleLowerCase();
        if (filterKey.length > 0) {
          items = items.filter(item => {
            const v = item.label;
            if (typeof v === 'string' && v.toLocaleLowerCase().includes(filterKey)) {
              return true;
            }
            return false;
          });
        }
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
   * Redirects to the forms' View Map component
   * @param schemaId The clicked item schema id
   */
  viewMap(schemaId: string | undefined): void {
    if (schemaId != null) {
      this._router.navigate(['forms', schemaId, 'map']);
    }
  }

  /**
   * Redirects to the forms' DataChat component
   * @param schemaId The clicked item schema id
   */
  viewDataChat(schemaId: string | undefined): void {
    if (schemaId != null) {
      this._router.navigate(['forms', schemaId, 'datachat']);
    }
  }

  /**
   * Opens the Delete Schema dialog
   * @param schemaId The clicked item schema id
   */
  openDeleteSchemaDialog(schemaId: string | undefined): void {
    if (!schemaId) {
      return;
    }
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      schemaId,
      schemaType: this._collectType.value === 'custom' ? null : this._collectType.value,
    };
    this._dialogRef = this._dialog.open(DeleteSchema, dialogConfig);
    this._deleteSchemaDialogSub = this._dialogRef
      .afterClosed()
      .pipe(
        switchMap(schemaId => {
          if (schemaId != null) {
            if (this._collectType.value === 'forms') {
              return this._fs.delete(schemaId);
            } else if (this._collectType.value === 'reports') {
              return this._rs.delete(schemaId);
            }
            return obsOf(null);
          }
          return obsOf(null);
        }),
        catchError(err => throwError(() => err) as Observable<null>),
        take(1),
      )
      .subscribe(() => {
        this._collectType.next(this._collectType.value);
        this._cdr.detectChanges();
      });
  }

  /**
   * Opens a dialog to create the Public Url to be shared.
   * @param formSchemaId? The uuid of the Public Form Schema to share.
   */
  openShareUrlDialog(formSchemaId?: string): void {
    if (!formSchemaId) {
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      routeParams: {'form_schema_id': formSchemaId},
      formSchema: obsOf(null),
      formDatas: [],
      statusEditable: false,
      secondaryMetricFieldsDisplayed: this._secondaryMetricFieldsDisplayed,
      context: 'shareUrl',
    };
    this._dialog.open(FormMetricSelectorDialog, dialogConfig);
  }

  /**
   * Redirects to the Edit Form/Report Schema component, in create mode.
   */
  addSchema(): void {
    this._router.navigate([this._collectType.getValue(), 'schema', 'create']);
  }

  static ngAcceptInputType_filterBar: BooleanInput;

  ngOnDestroy(): void {
    this._deleteSchemaDialogSub.unsubscribe();
  }
}
