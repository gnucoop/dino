import {Component, ViewChild} from '@angular/core';
import {ActionType, ListAction, ListHeader} from '@dino/core/list';
import {Organization, OrganizationManager} from '@dino/core/organizations';
import {MetricSection} from '@dino/material/metric-section';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations-e2e.component.html',
})
export class MatOrganizationsE2E {
  @ViewChild(MetricSection) section: MetricSection;
  readonly manager: OrganizationManager;
  readonly headers: ListHeader<Organization>[] = [
    {column: 'id', label: 'ID', displayed: false},
    {column: 'name', label: 'Name'},
    {column: 'parent_name', label: 'Parent Organization'},
    {column: 'logo_path', label: 'Logo Path'},
    {column: 'website_url', label: 'Website Url'},
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

  constructor(private _organizationManager: OrganizationManager) {
    this.manager = this._organizationManager;
  }
}
