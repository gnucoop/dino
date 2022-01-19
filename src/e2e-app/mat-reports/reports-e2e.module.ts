import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreakpointObserverModule} from '@dino/material/breakpoint-observer';
import {CollectModule as DinoCollectModule} from '@dino/material/collect';
import {ReportsModule} from '@dino/core/reports';
import {MatReportsE2E} from './reports-e2e.component';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';

@NgModule({
  declarations: [MatReportsE2E],
  imports: [
    BreakpointObserverModule,
    CommonModule,
    DinoBreadcrumbsModule,
    DinoCollectModule,
    ReportsModule,
  ],
})
export class MaterialReportsE2eModule {}
