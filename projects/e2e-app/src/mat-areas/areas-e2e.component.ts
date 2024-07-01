import {Component, ViewChild} from '@angular/core';
import {Area, AreaManager} from '@dino/core/areas';
import {ActionType, ListAction, ListHeader} from '@dino/core/list';
import {MetricSection} from '@dino/material/metric-section';

@Component({
  selector: 'app-areas',
  templateUrl: './areas-e2e.component.html',
})
export class MatAreasE2E {
  @ViewChild(MetricSection) section!: MetricSection;
  readonly manager: AreaManager;
  readonly headers: ListHeader<Area>[] = [
    {column: 'id', label: 'ID', displayed: false},
    {column: 'name', label: 'Area Name', displayed: true, sortable: true},
    {column: 'parent_name', label: 'Parent Area', displayed: true},
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

  constructor(private _areaManager: AreaManager) {
    this.manager = this._areaManager;
  }
}
