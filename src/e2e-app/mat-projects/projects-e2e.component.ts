import {Component, ViewChild} from '@angular/core';
import {ActionType, ListAction, ListHeader} from '@dewco/core/list';
import {Project, ProjectManager} from '@dewco/core/projects';
import {MetricSection} from '@dewco/material/metric-section';

@Component({
  selector: 'app-projects',
  templateUrl: './projects-e2e.component.html',
})
export class MatProjectsE2E {
  @ViewChild(MetricSection) section: MetricSection;
  readonly manager: ProjectManager;
  readonly headers: ListHeader<Project>[] = [
    {column: 'id', label: 'ID', sortable: true, displayed: false},
    {column: 'name', label: 'Name', sortable: true},
    {column: 'parent_name', label: 'Parent Project', sortable: true},
    {column: 'code', label: 'Code', sortable: true},
    {column: 'sectors_of_intervention', label: 'Sectors of Intervention', sortable: true},
    {column: 'donors', label: 'Donors', sortable: true},
    {column: 'start_date', label: 'Start Date', sortable: true},
    {column: 'end_date', label: 'End Date', sortable: true},
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

  constructor(private _projectManager: ProjectManager) {
    this.manager = this._projectManager;
  }
}
