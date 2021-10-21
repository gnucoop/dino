import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreakpointObserverModule} from '@dino/material/breakpoint-observer';
import {CollectModule as DinoCollectModule} from '@dino/material/collect';

import {MatDashboardE2E} from './dashboard-e2e.component';

@NgModule({
  declarations: [MatDashboardE2E],
  imports: [BreakpointObserverModule, CommonModule, DinoCollectModule],
})
export class MaterialDashboardE2eModule {}
