import {ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActionType, ListAction, ListHeader} from '@dino/core/list';
import {Organization, OrganizationManager} from '@dino/core/organizations';
import {MetricSection} from '@dino/material/metric-section';

import * as conf from '../conf';

@Component({
  selector: 'dinoapp-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class OrganizationsComponent {
  @ViewChild(MetricSection) section: MetricSection | undefined;
  readonly manager: OrganizationManager;
  readonly headers: ListHeader<Organization>[] = conf.headers;
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

  constructor(private _organizationManager: OrganizationManager) {
    this.manager = this._organizationManager;
  }
}
