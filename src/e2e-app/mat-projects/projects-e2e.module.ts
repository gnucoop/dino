import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MetricSectionModule} from '@dino/material/metric-section';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';

import {MatProjectsE2E} from './projects-e2e.component';

@NgModule({
  declarations: [MatProjectsE2E],
  imports: [CommonModule, DinoBreadcrumbsModule, MetricSectionModule],
})
export class MaterialProjectsE2eModule {}
