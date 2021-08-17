import {Component, ViewChild} from '@angular/core';
import {ListAction, ListHeader} from '@dewco/core/list';
import {Organization, OrganizationManager} from '@dewco/core/organizations';
import {MetricSection} from '@dewco/material/metric-section';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations-e2e.component.html',
})
export class MatOrganizationsE2E {
  @ViewChild(MetricSection) section: MetricSection;
  readonly manager: OrganizationManager;
  readonly headers: ListHeader<Organization>[] = [
    {column: 'id', label: 'ID', sortable: true, displayed: false},
    {column: 'name', label: 'Name', sortable: true},
    {column: 'parent_name', label: 'Parent Organization', sortable: true},
    {column: 'logo_path', label: 'Logo Path', sortable: true},
    {column: 'website_url', label: 'Website Url', sortable: true},
    {column: 'created_at', label: 'Creation Date', sortable: true, displayed: false},
  ];
  readonly listRowActions: ListAction[] = [
    {
      actionType: 'view',
      matIcon: 'visibility',
      customAction: (row) => this.section.openDialog(row, 'view'),
    },
    {
      actionType: 'edit',
      matIcon: 'create',
      customAction: (row) => this.section.openDialog(row, 'edit'),
    },
    {
      actionType: 'delete',
      matIcon: 'delete',
      askConfirm: true,
    },
  ];

  constructor(
      private _organizationManager: OrganizationManager,
  ) {
    this.manager = this._organizationManager;
  }
}
