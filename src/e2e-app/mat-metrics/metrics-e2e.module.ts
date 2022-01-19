import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreakpointObserverModule} from '@dino/material/breakpoint-observer';
import {CollectModule as DinoCollectModule} from '@dino/material/collect';

import {MatMetricsE2E} from './metrics-e2e.component';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';

@NgModule({
  declarations: [MatMetricsE2E],
  imports: [BreakpointObserverModule, CommonModule, DinoBreadcrumbsModule, DinoCollectModule],
})
export class MaterialMetricsE2eModule {}
