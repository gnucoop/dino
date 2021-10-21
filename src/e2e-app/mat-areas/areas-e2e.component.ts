import {Component, ViewChild} from '@angular/core';
import {Area, AreaManager} from '@dewco/core/areas';
import {ActionType, ListAction, ListHeader} from '@dewco/core/list';
import {MetricSection} from '@dewco/material/metric-section';

@Component({
  selector: 'app-areas',
  templateUrl: './areas-e2e.component.html',
})
export class MatAreasE2E {
  @ViewChild(MetricSection) section: MetricSection;
  readonly manager: AreaManager;
  readonly headers: ListHeader<Area>[] = [
    {column: 'id', label: 'ID', sortable: true, displayed: false},
    {column: 'name', label: 'Name', sortable: true},
    {column: 'parent_name', label: 'Parent Area', sortable: true},
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

  constructor(private _areaManager: AreaManager) {
    this.manager = this._areaManager;
  }
}
