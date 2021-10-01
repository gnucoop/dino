import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreakpointObserverModule} from '@dewco/material/breakpoint-observer';
import {CollectModule as DinoCollectModule} from '@dewco/material/collect';
import {ReportsModule} from '@dewco/core/reports';
import {MatReportsE2E} from './reports-e2e.component';


@NgModule({
  declarations: [MatReportsE2E],
  imports: [
    BreakpointObserverModule,
    CommonModule,
    DinoCollectModule,
    ReportsModule,
  ]
})
export class MaterialReportsE2eModule {
}
