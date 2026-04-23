import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {CollectModule as DinoCollectModule} from '@dino/material/collect';
import {ReportsModule as DinoReportsModule} from '@dino/core/reports';
import {UsersModule as DinoUsersModule} from '@dino/core/users';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';

import {FormsCollectComponent} from './components/home/forms-collect.component';
import {FormsCollectRoutingModule} from './forms-collect-routing.module';

@NgModule({
  declarations: [FormsCollectComponent],
  imports: [
    CommonModule,
    FormsCollectRoutingModule,
    DinoBreadcrumbsModule,
    DinoCollectModule,
    DinoReportsModule,
    DinoUsersModule,
  ],
})
export class FormsCollectModule {}
