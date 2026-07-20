import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {ActionType, FiltersService, ListAction, ListHeader} from '@dino/core/list';
import {UserGroup, UserGroupManager} from '@dino/core/users';
import {ListDataSource} from '@dino/material/list';

import * as conf from '../conf';

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
      customAction: row => this.openEditor(row, 'edit'),
    },
    {
      actionType: 'delete',
      matIcon: 'delete',
      askConfirm: true,
    },
    {
      actionType: 'view',
      matIcon: 'visibility',
      customAction: row => this.openEditor(row, 'view'),
    },
  ];

  readonly additionalBasicFilters = conf.additionalBasicFilters;

  constructor(
    private _userGroupManager: UserGroupManager,
    private _filtersService: FiltersService,
    private _router: Router,
  ) {
    this.dataSource = new ListDataSource(this._userGroupManager, this._filtersService);
  }

  /**
   * Navigates to the full-page group editor.
   * @param group The group to edit/view, or undefined to create a new one.
   * @param action The editor mode.
   */
  openEditor(group?: UserGroup, action: 'view' | 'edit' | 'create' = 'create'): void {
    if (action === 'create' || group == null) {
      this._router.navigate(['users/groups/create']);
      return;
    }
    this._router.navigate(['users/groups', group.id, action]);
  }
}
