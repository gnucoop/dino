import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActionType, FiltersService, ListAction, ListHeader} from '@dino/core/list';
import {UserGroup, UserGroupManager} from '@dino/core/users';
import {ListDataSource} from '@dino/material/list';
import {MatGroupsEditorE2E} from './groups-e2e-editor.component';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-e2e-list.component.html',
})
export class MatGroupsListE2E implements OnInit {
  readonly headers: ListHeader<UserGroup>[] = [
    {column: 'id', label: 'ID', displayed: false},
    {column: 'groupName', label: 'Name', displayed: true},
    {column: 'created_at', label: 'Creation Date', sortable: true, displayed: false},
  ];

  dataSource: ListDataSource<UserGroup>;

  readonly onClickRowActions: ActionType[] = ['select', 'expand'];

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
    private _userGroupManager: UserGroupManager,
    private _filtersService: FiltersService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.dataSource = new ListDataSource(this._userGroupManager, this._filtersService);
  }

  openDialog(group?: UserGroup, action?: 'view' | 'edit' | 'create'): void {
    this.dialog.open(MatGroupsEditorE2E, {
      data: {
        userGroupItem: group,
        userGroupAction: action,
      },
    });
  }
}
