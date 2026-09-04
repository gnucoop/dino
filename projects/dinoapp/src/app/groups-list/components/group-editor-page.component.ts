import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AreaManager} from '@dino/core/areas';
import {CaseManager} from '@dino/core/cases';
import {DataModelManager, InsertModel} from '@dino/core/data';
import {FormSchemaManager, FormStatusManager} from '@dino/core/forms';
import {LocationManager} from '@dino/core/locations';
import {OrganizationManager} from '@dino/core/organizations';
import {ProjectManager} from '@dino/core/projects';
import {ReportSchemaManager} from '@dino/core/reports';
import {UserGroup, UserGroupManager, UserRoleManager} from '@dino/core/users';
import {MixedEditorItem} from '@dino/material/mixed-editor';
import {TranslocoService} from '@ngneat/transloco';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {map, shareReplay, take} from 'rxjs/operators';

/**
 * Static metadata (label + icon + display order) for every category the
 * Group editor can manage. The `type` values match the collection names
 * emitted by each manager (and consumed by the save payload mapping below).
 */
interface CategoryMeta {
  type: string;
  label: string;
  icon: string;
}

interface CategoryTab extends CategoryMeta {
  count: number;
  active: boolean;
}

/**
 * Full-page Group editor.
 *
 * Recreates the search-first design of the handoff while reusing the data
 * plumbing of the former `GroupsEditor` dialog: it loads every category pool
 * through the domain managers, seeds the assignments of an existing group and
 * persists the result via {@link UserGroupManager}. The `MixedEditorItem`
 * shape is reused as the per-category view model.
 */
@Component({
  selector: 'dinoapp-group-editor-page',
  templateUrl: './group-editor-page.component.html',
  styleUrls: ['./group-editor-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GroupEditorPage implements OnDestroy {
  /** Ordered category definitions; only those with a populated pool get a tab. */
  private readonly _catMeta: CategoryMeta[] = [
    {type: 'user_role', label: 'User role', icon: 'school'},
    {type: 'form_schema', label: 'Form schema', icon: 'list_alt'},
    {type: 'form_status', label: 'Form status', icon: 'account_tree'},
    {type: 'report_schema', label: 'Report schema', icon: 'stacked_bar_chart'},
    {type: 'area', label: 'Area', icon: 'volunteer_activism'},
    {type: 'case', label: 'Case', icon: 'people'},
    {type: 'project', label: 'Project', icon: 'assignment'},
    {type: 'location', label: 'Location', icon: 'place'},
    {type: 'organization', label: 'Organization', icon: 'public'},
  ];

  /** The full item pool per category type. */
  private _pools: {[type: string]: MixedEditorItem[]} = {};

  /** The currently assigned items per category type (the save payload source). */
  private _assigned: {[type: string]: MixedEditorItem[]} = {};

  /** The id of the edited group, or null when creating. */
  private _groupId: string | null = null;

  /** The stored `created_at` of the edited group, preserved on update. */
  private _createdAt: string | null = null;

  // ---- View state -----------------------------------------------------------
  name = '';
  activeCat = '';
  qAvail = '';
  qAssigned = '';
  viewOnly = false;
  loading = true;

  // ---- Derived view data (recomputed on every state change) -----------------
  tabs: CategoryTab[] = [];
  visibleAvailable: MixedEditorItem[] = [];
  visibleAssigned: MixedEditorItem[] = [];
  availTotal = 0;
  assignedCount = 0;
  activeLabel = '';
  /** Set of item ids assigned in the active category (fast row lookup). */
  private _assignedIds = new Set<string>();
  /** True when the active category has the "all" option assigned. */
  allSelected = false;
  /**
   * True when the active category holds a single item (user role).
   */
  uniqueCat = false;

  private _subs = new Subscription();

  constructor(
    private _userGroupManager: UserGroupManager,
    private _userRoleManager: UserRoleManager,
    private _formSchemaManager: FormSchemaManager,
    private _formStatusManager: FormStatusManager,
    private _reportSchemaManager: ReportSchemaManager,
    private _snackbar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute,
    private _ts: TranslocoService,
    private _cdr: ChangeDetectorRef,
    @Optional() private _areaManager: AreaManager | null,
    @Optional() private _caseManager: CaseManager | null,
    @Optional() private _projectManager: ProjectManager | null,
    @Optional() private _locationManager: LocationManager | null,
    @Optional() private _organizationManager: OrganizationManager | null,
  ) {
    this.viewOnly = this._route.snapshot.data['isView'] === true;
    this._groupId = this._route.snapshot.paramMap.get('id');

    const schedule: Observable<MixedEditorItem[]>[] = [
      this._populateList(this._userRoleManager, 'roleName', 'school', false, true),
      this._populateList(this._formSchemaManager, 'label', 'list_alt', true),
      this._populateList(this._formStatusManager, 'label', 'account_tree', true),
      this._populateList(this._reportSchemaManager, 'label', 'stacked_bar_chart', true),
    ];
    if (this._areaManager != null) {
      schedule.push(this._populateList(this._areaManager, 'name', 'volunteer_activism', true));
    }
    if (this._caseManager != null) {
      schedule.push(this._populateList(this._caseManager, 'name', 'people', true));
    }
    if (this._projectManager != null) {
      schedule.push(this._populateList(this._projectManager, 'name', 'assignment', true));
    }
    if (this._locationManager != null) {
      schedule.push(this._populateList(this._locationManager, 'name', 'place', true));
    }
    if (this._organizationManager != null) {
      schedule.push(this._populateList(this._organizationManager, 'name', 'public', true));
    }

    this._subs.add(
      combineLatest(schedule)
        .pipe(take(1))
        .subscribe(lists => {
          const pools: {[type: string]: MixedEditorItem[]} = {};
          lists.forEach(items => {
            items.forEach(item => {
              (pools[item.itemType] ??= []).push(item);
            });
          });
          Object.keys(pools).forEach(type =>
            pools[type].sort((a, b) => this._sortAlphabetically(a, b)),
          );
          this._pools = pools;
          this.activeCat = this._catMeta.find(c => pools[c.type]?.length)?.type ?? '';
          this._catMeta.forEach(c => (this._assigned[c.type] = []));
          this._loadGroup();
        }),
    );
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  // ---- Tab handling ---------------------------------------------------------
  selectTab(type: string): void {
    if (type === this.activeCat) {
      return;
    }
    this.activeCat = type;
    this.qAvail = '';
    this.qAssigned = '';
    this._recompute();
  }

  // ---- Search ---------------------------------------------------------------
  onQAvail(value: string): void {
    this.qAvail = value;
    this._recomputeAvailable();
    this._cdr.markForCheck();
  }

  onQAssigned(value: string): void {
    this.qAssigned = value;
    this._recomputeAssigned();
    this._cdr.markForCheck();
  }

  onName(value: string): void {
    this.name = value;
  }

  // ---- Assignment mutations -------------------------------------------------
  add(item: MixedEditorItem): void {
    if (this.viewOnly) {
      return;
    }
    const type = item.itemType;
    let arr = [...(this._assigned[type] ?? [])];
    if (item.allOptionItem || item.uniqueItem) {
      // The "all" sentinel and unique categories (user role) hold a single item.
      arr = [item];
    } else {
      // Adding a concrete item supersedes a previously selected "all".
      arr = arr.filter(x => !x.allOptionItem);
      if (!arr.some(x => x.itemId === item.itemId)) {
        arr.push(item);
      }
      // Cascade: pull in the descendants of a hierarchical metric.
      this._descendants(item, this._pools[type] ?? []).forEach(child => {
        if (!arr.some(x => x.itemId === child.itemId)) {
          arr.push(child);
        }
      });
    }
    this._assigned[type] = arr.sort((a, b) => this._sortAlphabetically(a, b));
    this._recompute();
  }

  /**
   * Adds every item currently shown by the results list.
   */
  addAllShown(): void {
    if (this.viewOnly || this.uniqueCat) {
      return;
    }
    this.visibleAvailable
      .filter(item => !item.allOptionItem && !this._assignedIds.has(item.itemId))
      .forEach(item => this.add(item));
  }

  remove(item: MixedEditorItem): void {
    if (this.viewOnly) {
      return;
    }
    const type = item.itemType;
    const toRemove = new Set<string>([item.itemId]);
    this._descendants(item, this._assigned[type] ?? []).forEach(c => toRemove.add(c.itemId));
    this._assigned[type] = (this._assigned[type] ?? []).filter(x => !toRemove.has(x.itemId));
    this._recompute();
  }

  clear(): void {
    if (this.viewOnly) {
      return;
    }
    this._assigned[this.activeCat] = [];
    this._recompute();
  }

  isAdded(item: MixedEditorItem): boolean {
    return this.allSelected || this._assignedIds.has(item.itemId);
  }

  trackById(_index: number, item: MixedEditorItem): string {
    return item.itemId;
  }

  trackByTab(_index: number, tab: CategoryTab): string {
    return tab.type;
  }

  // ---- Navigation -----------------------------------------------------------
  canSave(): boolean {
    return (
      !this.viewOnly &&
      this.name.trim().length > 0 &&
      (this._assigned['user_role']?.length ?? 0) > 0
    );
  }

  save(): void {
    if (!this.canSave()) {
      return;
    }
    const data: {[type: string]: string[]} = {};
    Object.keys(this._assigned).forEach(type => {
      (this._assigned[type] ?? []).forEach(item => {
        (data[type] ??= []).push(item.allOptionItem ? 'all' : item.itemId);
      });
    });

    const payload: InsertModel<UserGroup> = {
      groupName: this.name.trim(),
      user_role_ref_id: data['user_role'][0],
      area_ref_id: data['area'] ?? [],
      case_ref_id: data['case'] ?? [],
      location_ref_id: data['location'] ?? [],
      organization_ref_id: data['organization'] ?? [],
      project_ref_id: data['project'] ?? [],
      form_status_ref_id: data['form_status'] ?? [],
      groupFormSchemaIds: data['form_schema'] ?? [],
      groupReportSchemaIds: data['report_schema'] ?? [],
      created_at: this._createdAt ?? new Date().toISOString(),
    };

    const persist$ =
      this._groupId != null && this._createdAt != null
        ? this._userGroupManager.update({
            ...payload,
            id: this._groupId,
            created_at: this._createdAt,
            updated_at: '',
          } as UserGroup)
        : this._userGroupManager.create(payload);

    this._subs.add(
      persist$.pipe(take(1)).subscribe({
        next: success =>
          this._snackbar.open(
            `"${success?.groupName}" ${this._ts.translate('saved')}`,
            this._ts.translate('Save'),
            {duration: 5000},
          ),
        error: err =>
          this._snackbar.open(
            this._ts.translate('Oops! Something went wrong while performing the requested action.'),
            (err?.message ?? '').toUpperCase(),
            {duration: 5000},
          ),
        complete: () => this._router.navigate(['users/groups']),
      }),
    );
  }

  // ---- Internal -------------------------------------------------------------

  /** Seeds `_assigned` from the persisted group (edit/view modes). */
  private _loadGroup(): void {
    if (this._groupId == null) {
      this.loading = false;
      this._recompute();
      this._cdr.markForCheck();
      return;
    }
    this._subs.add(
      this._userGroupManager
        .get(this._groupId)
        .pipe(take(1))
        .subscribe(group => {
          if (group == null) {
            this.loading = false;
            this._recompute();
            this._cdr.markForCheck();
            return;
          }
          this.name = group.groupName;
          this._createdAt = group.created_at;

          this._seed('user_role', [group.user_role_ref_id]);
          this._seed('form_schema', group.groupFormSchemaIds);
          this._seed('report_schema', group.groupReportSchemaIds);
          this._seed('form_status', group.form_status_ref_id);
          this._seed('area', group.area_ref_id);
          this._seed('case', group.case_ref_id);
          this._seed('project', group.project_ref_id);
          this._seed('location', group.location_ref_id);
          this._seed('organization', group.organization_ref_id);

          this.loading = false;
          this._recompute();
          this._cdr.markForCheck();
        }),
    );
  }

  /** Resolves the persisted ref ids of a category into pool items. */
  private _seed(type: string, refIds: string[] | undefined): void {
    if (!refIds || this._pools[type] == null) {
      return;
    }
    const found: MixedEditorItem[] = [];
    refIds.forEach(refId => {
      const id = refId === 'all' ? `all_${type}` : refId;
      const item = this._pools[type].find(p => p.itemId === id);
      if (item && !found.some(f => f.itemId === item.itemId)) {
        found.push(item);
      }
    });
    this._assigned[type] = found.sort((a, b) => this._sortAlphabetically(a, b));
  }

  /** Recomputes every derived view field. */
  private _recompute(): void {
    const assigned = this._assigned[this.activeCat] ?? [];
    this.allSelected = assigned.some(x => x.allOptionItem);
    this.uniqueCat = (this._pools[this.activeCat] ?? []).some(
      x => x.uniqueItem && !x.allOptionItem,
    );
    this._assignedIds = new Set(assigned.map(x => x.itemId));
    this.assignedCount = assigned.length;
    this.activeLabel = this._ts.translate(
      this._catMeta.find(c => c.type === this.activeCat)?.label ?? '',
    );
    this.tabs = this._catMeta
      .filter(c => this._pools[c.type]?.length)
      .map(c => ({
        ...c,
        count: (this._assigned[c.type] ?? []).length,
        active: c.type === this.activeCat,
      }));
    this._recomputeAvailable();
    this._recomputeAssigned();
    this._cdr.markForCheck();
  }

  private _recomputeAvailable(): void {
    const pool = this._pools[this.activeCat] ?? [];
    const q = this.qAvail.trim().toLowerCase();
    // The synthetic "All …" option is always pinned to the top of the list,
    // kept apart from (and unaffected by the search over) the concrete items.
    const allOptions = pool.filter(i => i.allOptionItem);
    const concrete = pool.filter(i => !i.allOptionItem);
    const matched = q ? concrete.filter(i => i.itemName.toLowerCase().includes(q)) : concrete;
    this.availTotal = matched.length;
    this.visibleAvailable = [...allOptions, ...matched];
  }

  private _recomputeAssigned(): void {
    const assigned = this._assigned[this.activeCat] ?? [];
    const q = this.qAssigned.trim().toLowerCase();
    this.visibleAssigned = q
      ? assigned.filter(i => i.itemName.toLowerCase().includes(q))
      : assigned;
  }

  /** Finds all items in `list` whose ancestor chain contains `item`. */
  private _descendants(item: MixedEditorItem, list: MixedEditorItem[]): MixedEditorItem[] {
    const res: MixedEditorItem[] = [];
    list.forEach(candidate => {
      if (candidate.itemParentId === item.itemId) {
        res.push(candidate);
        res.push(...this._descendants(candidate, list));
      }
    });
    return res;
  }

  private _sortAlphabetically(a: MixedEditorItem, b: MixedEditorItem): number {
    return a.itemName.toUpperCase().localeCompare(b.itemName.toUpperCase());
  }

  /**
   * Loads a category pool from its manager, mapping every document to a
   * {@link MixedEditorItem} and, when `allOption` is set, appending the
   * synthetic "All …" sentinel used by the save payload (`itemId = all_<type>`).
   */
  private _populateList(
    manager: DataModelManager<any>,
    nameKey: string,
    itemIcon: string,
    allOption = false,
    uniqueItem = false,
  ): Observable<MixedEditorItem[]> {
    return manager.query({selector: {is_deleted: {$ne: true}}}).pipe(
      map(list => {
        const res: MixedEditorItem[] = list.map(doc => ({
          itemName: doc[nameKey],
          itemType: doc.collection.name,
          itemId: doc.id,
          itemIcon,
          displayed: true,
          uniqueItem,
          allOptionItem: false,
          itemParentId: doc.parent_id,
        }));
        if (allOption) {
          let label = manager.collectionName.replace('_', ' ');
          label += label.charAt(label.length - 1) === 's' ? 'es' : 's';
          res.push({
            itemName: `All ${label}`,
            itemType: manager.collectionName,
            itemId: `all_${manager.collectionName}`,
            itemIcon,
            displayed: true,
            uniqueItem: true,
            allOptionItem: true,
            itemParentId: null,
          });
        }
        return res;
      }),
      shareReplay(1),
    );
  }

  /** First letter of a label, used for the avatar tile. */
  initial(item: MixedEditorItem): string {
    return (item.itemName?.[0] ?? '?').toUpperCase();
  }
}
