import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MetricsService} from '@dino/core/data';
import {ActionType, FiltersService, ListAction, ListHeader} from '@dino/core/list';
import {UserData, UserDataManager} from '@dino/core/users';
import {ListDataSource} from '@dino/material/list';
import {UserDialogData} from '@dino/material/user-editor';

import * as conf from '../conf';

import {UsersEditor} from './users-editor.component';

@Component({
  selector: 'dinoapp-users-list',
  templateUrl: 'users-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UsersList {
  readonly headers: ListHeader<UserData>[] = conf.headers;

  readonly onClickRowActions: ActionType[] = conf.onClickRowActions;

  dataSource: ListDataSource<UserData> = new ListDataSource(
    this._UserDataManager,
    this._filtersService,
  );

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
    private _UserDataManager: UserDataManager,
    private _filtersService: FiltersService,
    private _metricService: MetricsService,
    public dialog: MatDialog,
  ) {}

  openDialog(group?: UserData, action?: 'view' | 'edit' | 'create'): void {
    this.dialog.open(UsersEditor, {
      data: {
        userItem: group,
        userAction: action,
      } as UserDialogData,
    });
  }
}
