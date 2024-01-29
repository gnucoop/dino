import {Component, ViewChild} from '@angular/core';
import {ActionType, ListAction, ListHeader} from '@dino/core/list';
import {Project, ProjectManager} from '@dino/core/projects';
import {MetricSection} from '@dino/material/metric-section';

@Component({
  selector: 'app-projects',
  templateUrl: './projects-e2e.component.html',
})
export class MatProjectsE2E {
  @ViewChild(MetricSection) section!: MetricSection;
  readonly manager: ProjectManager;
  readonly headers: ListHeader<Project>[] = [
    {column: 'id', label: 'ID', displayed: false},
    {column: 'name', label: 'Project Name', displayed: true, sortable: true},
    {column: 'parent_name', label: 'Parent Project', displayed: true},
    {column: 'code', label: 'Code', displayed: true},
    {column: 'code_auto', label: 'Auto Code', displayed: true},
    {column: 'sectors_of_intervention', label: 'Sectors of Intervention', displayed: true},
    {column: 'donors', label: 'Donors', displayed: true},
    {column: 'start_date', label: 'Start Date', displayed: true},
    {column: 'end_date', label: 'End Date', displayed: true},
    {column: 'created_at', label: 'Creation Date', sortable: true, displayed: false},
    {column: 'metric_data', label: 'Additional Attributes', displayed: false},
  ];
  readonly readOnlyFields: string[] = ['code_auto'];
  readonly onClickRowActions: ActionType[] = ['select', 'expand'];
  readonly listRowActions: ListAction[] = [
    {
      actionType: 'view',
      matIcon: 'visibility',
      customAction: row => this.section.openDialog(row, 'View'),
    },
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
  ];

  constructor(private _projectManager: ProjectManager) {
    this.manager = this._projectManager;
  }
}
