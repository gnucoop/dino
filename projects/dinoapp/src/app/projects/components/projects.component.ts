import {ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActionType, ListAction, ListHeader} from '@dino/core/list';
import {Project, ProjectManager} from '@dino/core/projects';
import {MetricSection} from '@dino/material/metric-section';

import * as conf from '../conf';

@Component({
  selector: 'dinoapp-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ProjectsComponent {
  @ViewChild(MetricSection) section: MetricSection | undefined;
  readonly manager: ProjectManager;
  readonly headers: ListHeader<Project>[] = conf.headers;
  readonly readOnlyFields: string[] = conf.readOnlyFields;
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

  constructor(private _projectManager: ProjectManager) {
    this.manager = this._projectManager;
  }
}
