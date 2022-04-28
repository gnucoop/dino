import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {MetricSectionModule} from '@dino/material/metric-section';

import {MatOrganizationsE2E} from './organizations-e2e.component';

@NgModule({
  declarations: [MatOrganizationsE2E],
  imports: [CommonModule, DinoBreadcrumbsModule, MetricSectionModule],
})
export class MaterialOrganizationsE2eModule {}
