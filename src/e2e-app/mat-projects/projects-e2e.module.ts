import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MetricSectionModule} from '@dino/material/metric-section';

import {MatProjectsE2E} from './projects-e2e.component';

@NgModule({
  declarations: [MatProjectsE2E],
  imports: [CommonModule, MetricSectionModule],
})
export class MaterialProjectsE2eModule {}
