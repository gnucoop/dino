import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {MetricSectionModule} from '@dino/material/metric-section';

import {OrganizationsComponent} from './components/organizations.component';
import {OrganizationsRoutingModule} from './organizations-routing.module';

@NgModule({
  declarations: [OrganizationsComponent],
  imports: [
    CommonModule,
    DinoBreadcrumbsModule,
    MetricSectionModule,
    OrganizationsRoutingModule,
  ],
})
export class OrganizationsModule {
}
