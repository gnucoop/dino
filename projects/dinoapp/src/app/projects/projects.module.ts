import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {MetricSectionModule} from '@dino/material/metric-section';

import {ProjectsComponent} from './components/projects.component';
import {ProjectsRoutingModule} from './projects-routing.module';

@NgModule({
  declarations: [ProjectsComponent],
  imports: [
    CommonModule,
    DinoBreadcrumbsModule,
    MetricSectionModule,
    ProjectsRoutingModule,
  ],
})
export class ProjectsModule {
}
