import {AjfFieldType} from '@ajf/core/forms';
import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MetricsService} from '@dino/core/data';
import {ActionType, FilterGroup, FiltersService, ListAction, ListHeader} from '@dino/core/list';
import {UserModel, UserModelManager} from '@dino/core/users';
import {ListDataSource} from '@dino/material/list';
import {UserDialogData} from '@dino/material/user-editor';
import {MatUsersEditorE2E} from './users-editor-e2e.component';

@Component({
  selector: 'app-users-list',
  templateUrl: 'users-list-e2e.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MatUsersListE2E implements OnInit {
  readonly headers: ListHeader<UserModel>[] = [
    {column: 'id', label: 'ID', sortable: true, displayed: false},
    {column: 'email', label: 'Email', sortable: true},
    {column: 'full_name', label: 'Full Name', sortable: true},
  ];

  readonly onClickRowActions: ActionType[] = ['select', 'expand'];

  readonly customFilters: FilterGroup[] = [
    {
      filterGroupName: 'User Permission Groups',
      filterGroupAdditionalFilters: [
        {
          name: 'user_group_ids',
          label: 'User Groups',
          fieldType: AjfFieldType.MultipleChoice,
        },
      ],
    },
  ];

  dataSource: ListDataSource<UserModel>;

  readonly listRowActions: ListAction[] = [
    {
      actionType: 'view',
      matIcon: 'visibility',
      customAction: row => this.openDialog(row, 'view'),
    },
    {
      actionType: 'edit',
      matIcon: 'create',
      customAction: row => this.openDialog(row, 'edit'),
    },
    {
      actionType: 'delete',
      matIcon: 'delete',
      askConfirm: true,
    },
  ];

  constructor(
    private _userModelManager: UserModelManager,
    private _filtersService: FiltersService,
    private _metricService: MetricsService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.dataSource = new ListDataSource(
      this._userModelManager,
      this._filtersService,
      this._metricService,
    );
  }

  openDialog(group?: UserModel, action?: 'view' | 'edit' | 'create'): void {
    this.dialog.open(MatUsersEditorE2E, {
      data: {
        userItem: group,
        userAction: action,
      } as UserDialogData,
    });
  }
}
