import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {BreakpointObserverModule} from '@dino/material/breakpoint-observer';
import {CollectModule as DinoCollectModule} from '@dino/material/collect';

import {MatDashboardE2E} from './dashboard-e2e.component';

@NgModule({
  declarations: [MatDashboardE2E],
  imports: [BreakpointObserverModule, CommonModule, DinoBreadcrumbsModule, DinoCollectModule],
})
export class MaterialDashboardE2eModule {}
