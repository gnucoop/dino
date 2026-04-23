import {ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActionType, ListAction, ListHeader} from '@dino/core/list';
import {Location, LocationManager} from '@dino/core/locations';
import {MetricSection} from '@dino/material/metric-section';

import * as conf from '../conf';

@Component({
  selector: 'dinoapp-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LocationsComponent {
  @ViewChild(MetricSection) section: MetricSection | undefined;
  readonly manager: LocationManager;
  readonly headers: ListHeader<Location>[] = conf.headers;
  readonly onClickRowActions: ActionType[] = conf.onClickRowActions;
  readonly listRowActions: ListAction[] = [
    {
      actionType: 'edit',
      matIcon: 'create',
      customAction: row => this.section?.openDialog(row, 'Edit'),
    },
    {
      actionType: 'delete',
      matIcon: 'delete',
      customAction: row => this.section?.openDeleteDialog(row),
    },
    {
      actionType: 'view',
      matIcon: 'visibility',
      customAction: row => this.section?.openDialog(row, 'View'),
    },
  ];

  constructor(private _locationManager: LocationManager) {
    this.manager = this._locationManager;
  }
}
