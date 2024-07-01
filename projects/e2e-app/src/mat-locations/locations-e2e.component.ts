import {Component, ViewChild} from '@angular/core';
import {ActionType, ListAction, ListHeader} from '@dino/core/list';
import {Location, LocationManager} from '@dino/core/locations';
import {MetricSection} from '@dino/material/metric-section';

@Component({
  selector: 'app-locations',
  templateUrl: './locations-e2e.component.html',
})
export class MatLocationsE2E {
  @ViewChild(MetricSection) section!: MetricSection;
  readonly manager: LocationManager;
  readonly headers: ListHeader<Location>[] = [
    {column: 'id', label: 'ID', displayed: false},
    {column: 'name', label: 'Location Name', displayed: true, sortable: true},
    {column: 'parent_name', label: 'Parent Location', displayed: true},
    {column: 'coordinates', label: 'Coordinates', displayed: true},
    {column: 'created_at', label: 'Creation Date', sortable: true, displayed: false},
    {column: 'metric_data', label: 'Additional Attributes', displayed: false},
  ];
  readonly onClickRowActions: ActionType[] = ['select', 'expand'];
  readonly listRowActions: ListAction[] = [
    {
      actionType: 'edit',
      matIcon: 'create',
      customAction: row => this.section.openDialog(row, 'Edit'),
    },
    {
      actionType: 'delete',
      matIcon: 'delete',
      customAction: row => this.section.openDeleteDialog(row),
    },
    {
      actionType: 'view',
      matIcon: 'visibility',
      customAction: row => this.section.openDialog(row, 'View'),
    },
  ];

  constructor(private _locationManager: LocationManager) {
    this.manager = this._locationManager;
  }
}
