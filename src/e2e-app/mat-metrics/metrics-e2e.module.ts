import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreakpointObserverModule} from '@dino/material/breakpoint-observer';
import {CollectModule as DinoCollectModule} from '@dino/material/collect';

import {MatMetricsE2E} from './metrics-e2e.component';

@NgModule({
  declarations: [MatMetricsE2E],
  imports: [BreakpointObserverModule, CommonModule, DinoCollectModule],
})
export class MaterialMetricsE2eModule {}
