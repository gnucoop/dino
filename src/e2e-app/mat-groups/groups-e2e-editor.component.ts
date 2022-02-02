import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  Optional,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AreaManager, PopulatedWithArea} from '@dino/core/areas';
import {CaseManager, PopulatedWithCase} from '@dino/core/cases';
import {DataModelManager, InsertModel, Metric, MetricsService} from '@dino/core/data';
import {FormSchemaManager} from '@dino/core/forms';
import {LocationManager, PopulatedWithLocation} from '@dino/core/locations';
import {OrganizationManager, PopulatedWithOrganization} from '@dino/core/organizations';
import {PopulatedWithProject, ProjectManager} from '@dino/core/projects';
import {ReportSchemaManager} from '@dino/core/reports';
import {UserGroup, UserGroupManager, UserRoleManager} from '@dino/core/users';
import {MixedEditor, MixedEditorItem} from '@dino/material/mixed-editor';
import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {map, shareReplay, switchMap, withLatestFrom} from 'rxjs/operators';

/**
 * Represents an UserGroup populated with its metrics.
 */
export interface UserGroupWithMetrics
  extends UserGroup,
    PopulatedWithArea,
    PopulatedWithCase,
    PopulatedWithLocation,
    PopulatedWithOrganization,
    PopulatedWithProject {}

/**
 * Represents the data to be passed to a UserGroup editor dialog.
 */
export interface UserGroupDialogData {
  /**
   * The selected UserGroup item.
   */
  userGroupItem?: UserGroupWithMetrics;

  /**
   * The dialog mode.
   */
  userGroupAction?: 'view' | 'edit' | 'create';
}

@Component({
  selector: 'app-groups-editor',
  templateUrl: './groups-e2e-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MatGroupsEditorE2E implements OnDestroy, AfterViewInit {
  @ViewChild(MixedEditor) mixedEditor: MixedEditor;

  mixedEditorItems: BehaviorSubject<MixedEditorItem[]> = new BehaviorSubject<MixedEditorItem[]>([]);

  metricTypes: string[] = [];

  private _saveEvt: EventEmitter<InsertModel<UserGroup>> = new EventEmitter<
    InsertModel<UserGroup>
  >();

  private _saveSub: Subscription = Subscription.EMPTY;

  private _populateListSchedule: Observable<MixedEditorItem[]>[] = [];

  private _populatedSourceListEvt: EventEmitter<void> = new EventEmitter<void>();

  private _populationScheduleSub: Subscription = Subscription.EMPTY;

  private _populationSub: Subscription = Subscription.EMPTY;

  constructor(
    private _userGroupManager: UserGroupManager,
    private _userRoleManager: UserRoleManager,
    private _formSchemaManager: FormSchemaManager,
    private _reportSchemaManager: ReportSchemaManager,
    private _snackbar: MatSnackBar,
    private _metricService: MetricsService,
    public dialogRef: MatDialogRef<MixedEditor>,
    @Inject(MAT_DIALOG_DATA) public data: UserGroupDialogData,
    @Optional() private _areaManager: AreaManager | null,
    @Optional() private _caseManager: CaseManager | null,
    @Optional() private _projectManager: ProjectManager | null,
    @Optional() private _locationManager: LocationManager | null,
    @Optional() private _organizationManager: OrganizationManager | null,
  ) {
    this._populateListSchedule.push(
      this._populateList(this._userRoleManager, 'roleName', 'school', true),
      this._populateList(this._formSchemaManager, 'name', 'list_alt'),
      this._populateList(this._reportSchemaManager, 'name', 'stacked_bar_chart'),
    );

    if (this._areaManager != null) {
      this.metricTypes.push('area');
      this._populateListSchedule.push(
        this._populateList(this._areaManager, 'name', 'volunteer_activism'),
      );
    }
    if (this._caseManager != null) {
      this.metricTypes.push('case');
      this._populateListSchedule.push(this._populateList(this._caseManager, 'name', 'people'));
    }

    if (this._projectManager != null) {
      this.metricTypes.push('project');
      this._populateListSchedule.push(
        this._populateList(this._projectManager, 'name', 'assignment'),
      );
    }

    if (this._locationManager != null) {
      this.metricTypes.push('location');
      this._populateListSchedule.push(this._populateList(this._locationManager, 'name', 'place'));
    }

    if (this._organizationManager != null) {
      this.metricTypes.push('organization');
      this._populateListSchedule.push(
        this._populateList(this._organizationManager, 'name', 'public', true),
      );
    }

    this._populationScheduleSub = combineLatest([...this._populateListSchedule]).subscribe(
      items => {
        const allItems: MixedEditorItem[] = [];
        this.mixedEditorItems.next(
          allItems.concat(...items).sort((a, b) => {
            let textA = a.itemName.toUpperCase();
            let textB = b.itemName.toUpperCase();
            const less = textA < textB;
            const more = textA > textB;
            if (less) {
              return -1;
            } else if (more) {
              return 1;
            } else {
              return 0;
            }
          }),
        );
        this.loadGroup();
      },
    );

    this._saveSub = this._saveEvt
      .pipe(
        switchMap(item => {
          if (this.data.userGroupAction === 'edit' && this.data.userGroupItem != null) {
            const updateItem: UserGroup = {
              ...item,
              id: this.data.userGroupItem.id,
              created_at: this.data.userGroupItem.created_at,
              updated_at: '',
            };
            return this._userGroupManager.update(updateItem);
          } else {
            return this._userGroupManager.create(item);
          }
        }),
      )
      .subscribe({
        next: success => {
          this._snackbar.open(`"${success?.groupName}" saved`, 'SAVE', {duration: 5000});
          this.dialogRef.close();
        },
        error: err => {
          this._snackbar.open(
            `Oops! Something went wrong while performing the requested action.`,
            err.message.toUpperCase(),
            {
              duration: 5000,
            },
          );
          this.dialogRef.close();
        },
      });
  }

  ngAfterViewInit(): void {
    if (this.data.userGroupAction !== 'create' && this.data.userGroupItem != null) {
      const group = this.data.userGroupItem as {[key: string]: any};
      const activeMetrics = this._metricService.activeMetrics.value.map(
        metric => metric.metricName,
      );
      const groupMetrics: Observable<Metric[]>[] = activeMetrics.map(
        metricName => group[metricName] ?? null,
      );
      const metricsStream = combineLatest(groupMetrics);
      this._populationSub = this._populatedSourceListEvt
        .pipe(withLatestFrom(metricsStream))
        .subscribe(([_, metrics]) => {
          const mixedEditor = this.mixedEditor;
          if (group == null || this.mixedEditor == null) {
            return;
          }
          mixedEditor.saveListName.nativeElement.value = group.groupName;
          mixedEditor.addItem(mixedEditor.findItem(group.user_role_ref_id));
          for (let formSchemaId of group.groupFormSchemaIds) {
            mixedEditor.addItem(mixedEditor.findItem(formSchemaId));
          }
          for (let reportSchemaId of group.groupReportSchemaIds) {
            mixedEditor.addItem(mixedEditor.findItem(reportSchemaId));
          }
          for (let metric of metrics) {
            metric.forEach(mt => mixedEditor.addItem(mixedEditor.findItem(mt.id)));
          }
        });
      this.loadGroup();
    }
  }

  validateGroup(list: MixedEditorItem[]): boolean {
    return list.some(item => item.itemType === 'user_role');
  }

  loadGroup() {
    this._populatedSourceListEvt.emit();
  }

  saveGroup(): (list: MixedEditorItem[], listName: string) => void {
    return (list: MixedEditorItem[], listName: string) => {
      if (list == null || list.length < 1) {
        return;
      }
      const groupName = listName;
      const newUserGroupData: {[key: string]: any} = {};
      list.forEach(item => {
        if (newUserGroupData[item.itemType] == null) {
          newUserGroupData[item.itemType] = [];
        }
        if (Array.isArray(newUserGroupData[item.itemType])) {
          newUserGroupData[item.itemType].push(item.itemId);
        }
      });
      const user_role_ref_id = newUserGroupData['user_role'][0];

      if (user_role_ref_id) {
        const newUserGroup: InsertModel<UserGroup> = {
          groupName: groupName,
          user_role_ref_id: user_role_ref_id,
          area_ref_id: newUserGroupData['area'] ?? [],
          case_ref_id: newUserGroupData['case'] ?? [],
          location_ref_id: newUserGroupData['location'] ?? [],
          organization_ref_id: newUserGroupData['organization'] ?? [],
          project_ref_id: newUserGroupData['project'] ?? [],
          groupFormSchemaIds: newUserGroupData['form_schema'] ?? [],
          groupReportSchemaIds: newUserGroupData['report_schema'] ?? [],
        };
        this._saveEvt.emit(newUserGroup);
      }
    };
  }

  closeEditor(): () => void {
    return () => {
      this.dialogRef.close();
    };
  }

  private _populateList(
    manager: DataModelManager<any>,
    nameKey: string,
    itemIcon: string,
    uniqueItem: boolean = false,
  ): Observable<MixedEditorItem[]> {
    return manager.list().pipe(
      map(list =>
        list.map(doc => {
          const item: MixedEditorItem = {
            itemName: doc[nameKey],
            itemType: doc.collection.name,
            itemId: doc.id,
            itemIcon: itemIcon,
            displayed: true,
            uniqueItem: uniqueItem,
            itemParentId: doc.parent_id,
          };
          return item;
        }),
      ),
      shareReplay(1),
    );
  }

  ngOnDestroy(): void {
    this._saveSub.unsubscribe();
    this._populationSub.unsubscribe();
    this._populationScheduleSub.unsubscribe();

    this.mixedEditorItems.complete();
  }
}
