import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActionType, FiltersService, ListAction, ListHeader} from '@dino/core/list';
import {UserGroup, UserGroupManager} from '@dino/core/users';
import {ListDataSource} from '@dino/material/list';

import * as conf from '../conf';

import {GroupsEditor} from './groups-editor.component';

@Component({
  selector: 'dinoapp-groups-list',
  templateUrl: './groups-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GroupsList {
  readonly headers: ListHeader<UserGroup>[] = conf.headers;
  dataSource: ListDataSource<UserGroup>;

  readonly onClickRowActions: ActionType[] = conf.onClickRowActions;

  readonly listRowActions: ListAction[] = [
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
    {
      actionType: 'view',
      matIcon: 'visibility',
      customAction: row => this.openDialog(row, 'view'),
    },
  ];

  readonly additionalBasicFilters = conf.additionalBasicFilters;

  constructor(
    private _userGroupManager: UserGroupManager,
    private _filtersService: FiltersService,
    public dialog: MatDialog,
  ) {
    this.dataSource = new ListDataSource(this._userGroupManager, this._filtersService);
  }

  openDialog(group?: UserGroup, action?: 'view' | 'edit' | 'create'): void {
    this.dialog.open(GroupsEditor, {
      data: {
        userGroupItem: group,
        userGroupAction: action,
      },
    });
  }
}
