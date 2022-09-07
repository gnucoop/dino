import {AjfTranslocoModule} from '@ajf/core/transloco';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {BreakpointObserverModule} from '@dino/material/breakpoint-observer';
import {CollectModule as DinoCollectModule} from '@dino/material/collect';
import {DashboardRoutingModule} from './dashboard-e2e-routing.module';
import {EditReportModule as DinoEditReportModule} from '@dino/material/edit-report';

import {MatDashboardMenuE2E} from './dashboard-menu-e2e.component';
import {MatDashboardReportE2E} from './dashboard-report-e2e.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [MatDashboardMenuE2E, MatDashboardReportE2E],
  imports: [
    AjfTranslocoModule,
    BreakpointObserverModule,
    CommonModule,
    DashboardRoutingModule,
    DinoBreadcrumbsModule,
    DinoCollectModule,
    DinoEditReportModule,
    MatIconModule,
  ],
})
export class MaterialDashboardE2eModule {}
