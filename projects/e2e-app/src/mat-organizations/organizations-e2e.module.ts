import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {MetricSectionModule} from '@dino/material/metric-section';
import {OrganizationsRoutingModule} from './organizations-e2e-routing.module';

import {MatOrganizationsE2E} from './organizations-e2e.component';

@NgModule({
  declarations: [MatOrganizationsE2E],
  imports: [CommonModule, DinoBreadcrumbsModule, MetricSectionModule, OrganizationsRoutingModule],
})
export class MaterialOrganizationsE2eModule {}
