import {Component, ViewChild} from '@angular/core';
import {ActionType, ListAction, ListHeader} from '@dino/core/list';
import {Organization, OrganizationManager} from '@dino/core/organizations';
import {MetricSection} from '@dino/material/metric-section';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations-e2e.component.html',
})
export class MatOrganizationsE2E {
  @ViewChild(MetricSection) section!: MetricSection;
  readonly manager: OrganizationManager;
  readonly headers: ListHeader<Organization>[] = [
    {column: 'id', label: 'ID', displayed: false},
    {column: 'name', label: 'Name', displayed: true, sortable: true},
    {column: 'parent_name', label: 'Parent Organization', displayed: true},
    {column: 'logo_path', label: 'Logo Path', displayed: true},
    {column: 'website_url', label: 'Website Url', displayed: true},
    {column: 'created_at', label: 'Creation Date', sortable: true, displayed: false},
    {column: 'metric_data', label: 'Additional Attributes', displayed: false},
  ];
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

  constructor(private _organizationManager: OrganizationManager) {
    this.manager = this._organizationManager;
  }
}
