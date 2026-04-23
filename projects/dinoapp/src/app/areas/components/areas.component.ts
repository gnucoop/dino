import {ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {Area, AreaManager} from '@dino/core/areas';
import {ActionType, ListAction, ListHeader} from '@dino/core/list';
import {MetricSection} from '@dino/material/metric-section';

import * as conf from '../conf';

@Component({
  selector: 'dinoapp-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AreasComponent {
  @ViewChild(MetricSection) section: MetricSection|undefined;
  readonly manager: AreaManager;
  readonly headers: ListHeader<Area>[] = conf.headers;
  readonly onClickRowActions: ActionType[] = conf.onClickRowActions;
  readonly listRowActions: ListAction[] = [
    {
      actionType: 'edit',
      matIcon: 'create',
      customAction: (row) => this.section?.openDialog(row, 'Edit'),
    },
    {
      actionType: 'delete',
      matIcon: 'delete',
      customAction: row => this.section?.openDeleteDialog(row)
    },
    {
      actionType: 'view',
      matIcon: 'visibility',
      customAction: (row) => this.section?.openDialog(row, 'View'),
    },
  ];

  constructor(
      private _areaManager: AreaManager,
  ) {
    this.manager = this._areaManager;
  }
}
