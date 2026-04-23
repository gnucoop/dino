import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {CollectModule as DinoCollectModule} from '@dino/material/collect';
import {ReportsModule as DinoReportsModule} from '@dino/core/reports';
import {UsersModule as DinoUsersModule} from '@dino/core/users';

import {ReportsCollectComponent} from './components/reports-collect.component';
import {ReportsCollectRoutingModule} from './reports-collect-routing.module';

@NgModule({
  declarations: [ReportsCollectComponent],
  imports: [
    CommonModule,
    ReportsCollectRoutingModule,
    DinoBreadcrumbsModule,
    DinoCollectModule,
    DinoReportsModule,
    DinoUsersModule,
  ],
})
export class ReportsCollectModule {}
