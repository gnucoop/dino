import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {BreakpointObserverModule} from '@dino/material/breakpoint-observer';
import {EditReportModule as DinoEditReportModule} from '@dino/material/edit-report';
import {CollectModule as DinoCollectModule} from '@dino/material/collect';
import {DashboardMenuComponent} from './components/dashboard/dashboard-menu.component';
import {DashboardReportComponent} from './components/dashboard/dashboard-report.component';
import {MatIconModule} from '@angular/material/icon';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {TranslocoModule} from '@ngneat/transloco';
import {TourMatMenuModule} from 'ngx-ui-tour-md-menu';
import {environment} from 'src/environments/environment';

@NgModule({
  declarations: [DashboardMenuComponent, DashboardReportComponent],
  imports: [
    BreakpointObserverModule,
    CommonModule,
    DashboardRoutingModule,
    DinoBreadcrumbsModule,
    DinoCollectModule,
    DinoEditReportModule,
    MatIconModule,
    TranslocoModule,
    environment.layoutConfig.uiTourConfig ? TourMatMenuModule : [],
  ],
})
export class DashboardModule {}
