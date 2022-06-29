import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {MetricSectionModule} from '@dino/material/metric-section';
import {ProjectsRoutingModule} from './projects-e2e-routing.module';

import {MatProjectsE2E} from './projects-e2e.component';

@NgModule({
  declarations: [MatProjectsE2E],
  imports: [CommonModule, DinoBreadcrumbsModule, MetricSectionModule, ProjectsRoutingModule],
})
export class MaterialProjectsE2eModule {}
