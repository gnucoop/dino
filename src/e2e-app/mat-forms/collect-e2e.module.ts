import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreakpointObserverModule} from '@dewco/material/breakpoint-observer';
import {CollectModule as DinoCollectModule} from '@dewco/material/collect';

import {MatCollectE2E} from './collect-e2e.component';


@NgModule({
  declarations: [MatCollectE2E],
  imports: [
    BreakpointObserverModule,
    CommonModule,
    DinoCollectModule,
  ]
})
export class MaterialCollectE2eModule {
}
