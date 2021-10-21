import {Component, ViewChild} from '@angular/core';
import {ActionType, ListAction, ListHeader} from '@dino/core/list';
import {Location, LocationManager} from '@dino/core/locations';
import {MetricSection} from '@dino/material/metric-section';

@Component({
  selector: 'app-locations',
  templateUrl: './locations-e2e.component.html',
})
export class MatLocationsE2E {
  @ViewChild(MetricSection) section: MetricSection;
  readonly manager: LocationManager;
  readonly headers: ListHeader<Location>[] = [
    {column: 'id', label: 'ID', sortable: true, displayed: false},
    {column: 'name', label: 'Name', sortable: true},
    {column: 'parent_name', label: 'Parent Location', sortable: true},
    {column: 'coordinates', label: 'Coordinates', sortable: true},
    {column: 'created_at', label: 'Creation Date', sortable: true, displayed: false},
  ];
  readonly onClickRowActions: ActionType[] = ['select', 'expand'];
  readonly listRowActions: ListAction[] = [
    {
      actionType: 'view',
      matIcon: 'visibility',
      customAction: row => this.section.openDialog(row, 'view'),
    },
    {
      actionType: 'edit',
      matIcon: 'create',
      customAction: row => this.section.openDialog(row, 'edit'),
    },
    {
      actionType: 'delete',
      matIcon: 'delete',
      askConfirm: true,
    },
  ];

  constructor(private _locationManager: LocationManager) {
    this.manager = this._locationManager;
  }
}
