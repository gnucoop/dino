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
import {AreaManager} from '@dino/core/areas';
import {DataModelManager, InsertModel} from '@dino/core/data';
import {FormSchemaManager} from '@dino/core/forms';
import {LocationManager} from '@dino/core/locations';
import {OrganizationManager} from '@dino/core/organizations';
import {ProjectManager} from '@dino/core/projects';
import {UserGroup, UserGroupManager, UserRoleManager} from '@dino/core/users';
import {MixedEditor, MixedEditorItem} from '@dino/material/mixed-editor';
import {BehaviorSubject, combineLatest, from, Observable, Subscription} from 'rxjs';
import {map, switchMap, take} from 'rxjs/operators';

/**
 * Represents the data to be passed to a UserGroup editor dialog.
 */
export interface UserGroupDialogData {
  /**
   * The selected UserGroup item.
   */
  userGroupItem?: UserGroup;

  /**
   * The dialog mode.
   */
  userGroupAction?: 'view' | 'edit' | 'create';
}

@Component({
  selector: 'app-users-editor',
  templateUrl: './users-editor-e2e.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MatUsersEditorE2E implements OnDestroy, AfterViewInit {
  @ViewChild(MixedEditor) mixedEditor: MixedEditor;

  mixedEditorItems: BehaviorSubject<MixedEditorItem[]> = new BehaviorSubject<MixedEditorItem[]>([]);

  metricTypes: string[] = [];

  private _saveEvt: EventEmitter<InsertModel<UserGroup>> = new EventEmitter<
    InsertModel<UserGroup>
  >();

  private _saveSub: Subscription = Subscription.EMPTY;

  private _populateListSchedule: Observable<MixedEditorItem[]>[] = [];

  private _populatedSourceListEvt: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private _userGroupManager: UserGroupManager,
    private _userRoleManager: UserRoleManager,
    private _formSchemaManager: FormSchemaManager,
    private _snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<MixedEditor>,
    @Inject(MAT_DIALOG_DATA) public data: UserGroupDialogData,
    @Optional() private _areaManager: AreaManager | null,
    @Optional() private _projectManager: ProjectManager | null,
    @Optional() private _locationManager: LocationManager | null,
    @Optional() private _organizationManager: OrganizationManager | null,
  ) {
    this._populateListSchedule.push(
      this._populateList(this._userRoleManager, 'roleName', 'school', true),
      this._populateList(this._formSchemaManager, 'name', 'view_list'),
    );

    if (this._areaManager != null) {
      this.metricTypes.push('area');
      this._populateListSchedule.push(
        this._populateList(this._areaManager, 'name', 'volunteer_activism'),
      );
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

    combineLatest([...this._populateListSchedule]).subscribe(items => {
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
      this._populatedSourceListEvt.emit();
    });

    this._saveSub = this._saveEvt
      .pipe(
        switchMap(item => {
          if (this.data.userGroupAction === 'edit' && this.data.userGroupItem != null) {
            const updateItem = {...this.data.userGroupItem, ...item};
            return this._userGroupManager.update(updateItem);
          } else {
            return this._userGroupManager.create(item);
          }
        }),
      )
      .subscribe(
        success => {
          this._snackbar.open(`"${success?.groupName}" saved`, 'SAVE', {duration: 5000});
          this.dialogRef.close();
        },
        _ =>
          this._snackbar.open('Oops! Something went wrong saving the List', 'ERROR', {
            duration: 5000,
          }),
      );
  }

  ngAfterViewInit(): void {
    if (this.data.userGroupAction !== 'create' && this.data.userGroupItem != null) {
      this.loadGroup();
    }
  }

  validateGroup(list: MixedEditorItem[]): boolean {
    return list.some(item => item.itemType === 'user_role');
  }

  loadGroup() {
    const group = this.data.userGroupItem;
    const mixedEditor = this.mixedEditor;
    if (group == null || this.mixedEditor == null) {
      return;
    }
    this._populatedSourceListEvt.pipe(take(1)).subscribe(_ => {
      mixedEditor.saveListName.nativeElement.value = group.groupName;
      mixedEditor.addItem(mixedEditor.findItem(group.userRoleId));
      for (let metric of group.groupMetrics) {
        mixedEditor.addItem(mixedEditor.findItem(metric.metricId));
      }
      for (let formSchemaId of group.groupFormSchemaIds) {
        mixedEditor.addItem(mixedEditor.findItem(formSchemaId));
      }
      for (let reportSchemaId of group.groupReportSchemaIds) {
        mixedEditor.addItem(mixedEditor.findItem(reportSchemaId));
      }
    });
  }

  saveGroup(): (list: MixedEditorItem[], listName: string) => void {
    return (list: MixedEditorItem[], listName: string) => {
      if (list == null || list.length < 1) {
        return;
      }
      const groupName = listName;
      const userRoleId = list.find(item => item.itemType === 'user_role')?.itemId;
      const groupMetrics = list
        .filter(item => this.metricTypes.indexOf(item.itemType) > -1)
        .map(itm => {
          return {
            metricType: itm.itemType,
            metricId: itm.itemId,
            metricName: itm.itemName,
          };
        });
      const groupFormSchemaIds = list
        .filter(item => item.itemType === 'form_schema')
        .map(itm => itm.itemId);
      const groupReportSchemaIds = list
        .filter(item => item.itemType === 'report_schema')
        .map(itm => itm.itemId);

      if (userRoleId) {
        const newUserGroup: InsertModel<UserGroup> = {
          groupName: groupName,
          userRoleId: userRoleId,
          groupMetrics: groupMetrics,
          groupFormSchemaIds: groupFormSchemaIds,
          groupReportSchemaIds: groupReportSchemaIds,
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
      switchMap(qry => from(qry.exec())),
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
      take(1),
    );
  }

  ngOnDestroy(): void {
    this._saveSub.unsubscribe();
  }
}
