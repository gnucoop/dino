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
import {BreakpointObserver} from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {PermissionContextService} from '@dino/core/data';
import {FormSchema, FormSchemaManager} from '@dino/core/forms';
import {ReportSchema, ReportSchemaManager} from '@dino/core/reports';
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
  distinctUntilChanged,
  map,
  shareReplay,
  startWith,
  switchMap,
  take,
} from 'rxjs/operators';
import {CollectItem} from './collect-item-interface';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {DeleteSchema} from '@dino/material/delete-schema';
import {CollectAction, CollectActionsSheet} from './collect-actions-sheet';
import {
  buildChips,
  buildGroups,
  buildSections,
  CollectChip,
  CollectGroup,
  filterByGroups,
  tagsOf,
} from './collect-groups';
import {CollectShareDialog, CollectShareDialogData} from './collect-share-dialog';
import {UI_TOUR_SERVICE_CONFIG, UITourConfig} from '@dino/material/ui-tour-service';

/**
 * Type representing the available Collect component types.
 */
export type CollectType = 'reports' | 'forms' | 'custom';

/**
 * How the items are laid out: cards in a grid, or rows in a list.
 */
export type CollectView = 'grid' | 'list';

/**
 * An item as rendered, with its tags resolved against the groups.
 */
export interface CollectEntry {
  item: CollectItem;
  tags: CollectGroup[];
}

/**
 * A section of the rendered items. The group is null for the single, headless section of a
 * collect with no groups.
 */
export interface CollectViewSection {
  group: CollectGroup | null;
  entries: CollectEntry[];
}

/**
 * Everything the template renders, computed at once.
 */
export interface CollectViewModel {
  /**
   * The number of items, before any filter.
   */
  total: number;
  /**
   * The number of items left by the search and the group filter.
   */
  shown: number;
  /**
   * True if the items are split in group sections, with a tag bar to filter them.
   */
  grouped: boolean;
  chips: CollectChip[];
  sections: CollectViewSection[];
  selected: string[];
  hasFilter: boolean;
  view: CollectView;
  narrow: boolean;
}

/**
 * The value of the "All" chip of the tag bar, which clears the group selection.
 */
export const ALL_GROUPS_CHIP = '__all';

/**
 * Under this width the list is the default view and the rows move their actions into a
 * bottom sheet.
 */
const NARROW_QUERY = '(max-width: 759.98px)';

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
   * What the template renders: the tag bar, the sections and the view.
   */
  readonly vm: Observable<CollectViewModel>;

  /**
   * The ids of the groups selected in the tag bar. Items in any of them are shown.
   */
  readonly selectedGroups = new BehaviorSubject<string[]>([]);

  /**
   * The view chosen by the user, or null to follow the screen width.
   */
  private _viewChoice = new BehaviorSubject<CollectView | null>(null);

  readonly allGroupsChip = ALL_GROUPS_CHIP;

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
   * True if the Form can have one or more null Metrics: the public link dialog then lets
   * each metric be left empty. Defaults to false.
   */
  @Input() hasOptionalMetrics = false;

  /**
   * Secondary metric field to display in the metric selector of the public link dialog
   */
  @Input() secondaryMetricFieldsDisplayed: {[metricName: string]: string | string[]} | null =
    null;

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
   * Specifies the type of the collect component instance.
   * It can automatically gather a list of formschemas, report schemas, or can be
   * provided a custom list of generic menu items.
   */
  private _collectType: BehaviorSubject<CollectType> = new BehaviorSubject<CollectType>('custom');
  @Input()
  set collectType(res: CollectType) {
    this._collectType.next(res);
    this._viewChoice.next(this._readViewChoice(res));
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
    @Inject(UI_TOUR_SERVICE_CONFIG) readonly uiServiceConfig: UITourConfig,
    breakpointObserver: BreakpointObserver,
    private _fs: FormSchemaManager,
    private _rs: ReportSchemaManager,
    private _pcs: PermissionContextService,
    private _router: Router,
    private _cdr: ChangeDetectorRef,
    private _dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
  ) {
    const res = combineLatest([
      this._collectType,
      this._menuItems,
      this._pcs.permissionContext,
    ]).pipe(
      switchMap(([isCollect, menuItems, permissionContext]) => {
        if (isCollect !== 'custom') {
          let result: Observable<(RxDocument<FormSchema> | RxDocument<ReportSchema>)[]>;
          // `'all'` is passed as the document id on purpose. Creating a schema is not a
          // right of the role alone: the backend grants the insert only to a user whose
          // group holds the `'all'` wildcard on that kind of schema, because a schema
          // that does not exist yet cannot be listed in anyone's group. Asking for the
          // actions on `'all'` is what makes `getAllowedActions` look at the group's list
          // instead of skipping it, as it does when no document is named. Without this the
          // button showed up for anyone whose role could create, and the document was
          // written locally only to have every push refused by the server.
          if (isCollect === 'reports') {
            result = this._rs.list();
            this.displayAddButton = this._createAllowed('report_schema');
          } else {
            result = this._fs.list();
            this.displayAddButton = this._createAllowed('form_schema');
          }
          return result.pipe(
            map(docs => {
              let collectItems: CollectItem[] = [];
              for (let document of docs.filter(dcm => dcm != null)) {
                const isPublic = 'visibility' in document && document.visibility === 1;
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
                    isPublic &&
                    this._pcs.checkPermission(
                      document.id,
                      'form_schema',
                      'create',
                      permissionContext,
                      true,
                    ),
                  isPublic,
                  groups:
                    'form_schema_groups' in document
                      ? (document as RxDocument<FormSchema>).form_schema_groups ?? undefined
                      : undefined,
                  updatedAt: document.updated_at,
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
          // Items are only sorted by their scalar fields.
          const v1 = a[sortBy] as boolean | string | undefined;
          const v2 = b[sortBy] as boolean | string | undefined;
          const bToI = (v: boolean | string | undefined) => ((v as boolean) || false ? 1 : 1);
          if (typeof v1 === 'boolean' || typeof v2 === 'boolean') {
            return bToI(v1) - bToI(v2);
          }
          return ((v1 as string) || '').localeCompare((v2 as string) || '');
        });
      }),
      shareReplay(1),
    );

    const narrow$ = breakpointObserver.observe(NARROW_QUERY).pipe(
      map(state => state.matches),
      distinctUntilChanged(),
    );

    this.vm = combineLatest([
      res,
      this.items,
      this._collectType,
      this.selectedGroups,
      filter$,
      this._viewChoice,
      narrow$,
    ]).pipe(
      map(([all, searched, type, selected, query, viewChoice, narrow]) => {
        const grouped = type === 'forms';
        // A selection can outlive its group, when the last form of the group leaves it.
        const groups = grouped ? buildGroups(all) : [];
        selected = selected.filter(id => groups.some(group => group.id === id));
        const visible = grouped ? filterByGroups(searched, selected) : searched;
        const entry = (item: CollectItem): CollectEntry => ({item, tags: tagsOf(item, groups)});
        const sections: CollectViewSection[] = grouped
          ? buildSections(groups, visible, selected).map(section => ({
              group: section.group,
              entries: section.items.map(entry),
            }))
          : visible.length > 0
            ? [{group: null, entries: visible.map(entry)}]
            : [];
        // Menus have no toggle, so they keep their cards whatever the width.
        const view: CollectView = !this._filterBar
          ? 'grid'
          : (viewChoice ?? (narrow ? 'list' : 'grid'));
        return {
          total: all.length,
          shown: visible.length,
          grouped,
          chips: grouped ? buildChips(all) : [],
          sections,
          selected,
          hasFilter: selected.length > 0 || query.trim().length > 0,
          view,
          narrow,
        };
      }),
      shareReplay(1),
    );
  }

  /**
   * Applies the selection of the tag bar. Picking the "All" chip clears the selection, and
   * picking a group while "All" was on replaces it.
   * @param values The values of the selected chips.
   */
  selectGroups(values: string[]): void {
    const previous = this.selectedGroups.value;
    if (values.includes(ALL_GROUPS_CHIP) && previous.length > 0) {
      this.selectedGroups.next([]);
      return;
    }
    this.selectedGroups.next(values.filter(value => value !== ALL_GROUPS_CHIP));
  }

  /**
   * Sets the view chosen by the user, and remembers it for this kind of collect.
   */
  setView(view: CollectView): void {
    this._viewChoice.next(view);
    try {
      localStorage.setItem(this._viewStorageKey(this._collectType.value), view);
    } catch (_) {
      // Storage can be unavailable (private windows, blocked site data): the choice then
      // lasts for the page only.
    }
  }

  /**
   * Opens the actions of an item in a bottom sheet, for narrow screens.
   */
  openActions(item: CollectItem): void {
    this._bottomSheet
      .open<CollectActionsSheet, CollectItem, CollectAction>(CollectActionsSheet, {
        data: item,
        panelClass: 'dino-collect-sheet-panel',
      })
      .afterDismissed()
      .pipe(take(1))
      .subscribe(action => {
        if (action === 'share') {
          this.openShareUrlDialog(item);
        } else if (action === 'edit') {
          this.editSchema(item.schemaId);
        } else if (action === 'delete') {
          this.openDeleteSchemaDialog(item.schemaId);
        }
      });
  }

  private _viewStorageKey(type: CollectType): string {
    return `dino_collect_view_${type}`;
  }

  private _readViewChoice(type: CollectType): CollectView | null {
    try {
      const view = localStorage.getItem(this._viewStorageKey(type));
      return view === 'grid' || view === 'list' ? view : null;
    } catch (_) {
      return null;
    }
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
   * Opens the dialog showing the public link of a form.
   * @param item The public form to share.
   */
  openShareUrlDialog(item: CollectItem): void {
    if (!item.schemaId) {
      return;
    }
    const dialogConfig = new MatDialogConfig<CollectShareDialogData>();
    dialogConfig.data = {
      schemaId: item.schemaId,
      label: item.label ?? item.name,
      hasOptionalMetrics: this.hasOptionalMetrics,
      secondaryMetricFieldsDisplayed: this.secondaryMetricFieldsDisplayed,
    };
    dialogConfig.panelClass = 'dino-collect-share-panel';
    // Wide enough for the metric selector, which lays each metric on one row.
    dialogConfig.width = 'min(680px, calc(100vw - 32px))';
    dialogConfig.maxWidth = 'calc(100vw - 32px)';
    this._dialog.open(CollectShareDialog, dialogConfig);
  }

  /**
   * Redirects to the Edit Form/Report Schema component, in create mode.
   */
  addSchema(): void {
    this._router.navigate([this._collectType.getValue(), 'schema', 'create']);
  }

  static ngAcceptInputType_filterBar: BooleanInput;

  /**
   * True if the active user can create a schema of the given kind. A permission check that
   * fails - the permissions never arrived, and `getAllowedActions` gave up waiting - denies
   * instead of erroring: the error would reach the template through the async pipe and
   * abort its rendering, taking the grid and the empty-list message down with it.
   */
  private _createAllowed(collectionName: 'form_schema' | 'report_schema'): Observable<boolean> {
    return this._pcs.getAllowedActions(collectionName, 'all').pipe(
      map(actions => actions.some(act => act === 'create')),
      catchError(() => obsOf(false)),
    );
  }

  ngOnDestroy(): void {
    this._deleteSchemaDialogSub.unsubscribe();
  }
}
