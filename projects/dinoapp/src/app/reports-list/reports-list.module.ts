import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {ReportsModule as DinoReportsModule} from '@dino/core/reports';
import {FloatingButtonModule} from '@dino/material/floating-button';
import {ListModule as DinoListModule} from '@dino/material/list';
import {SearchFiltersBarModule as DinoFiltersBarModule} from '@dino/material/search-filters-bar';
import {TranslocoModule} from '@ngneat/transloco';

import {ReportsListComponent} from './components/reports-list.component';
import {ReportsListRoutingModule} from './reports-list-routing.module';
import {TourMatMenuModule} from 'ngx-ui-tour-md-menu';
import {environment} from 'src/environments/environment';

@NgModule({
  declarations: [ReportsListComponent],
  imports: [
    CommonModule,
    DinoBreadcrumbsModule,
    DinoFiltersBarModule,
    DinoReportsModule,
    DinoListModule,
    FloatingButtonModule,
    ReportsListRoutingModule,
    TranslocoModule,
    environment.layoutConfig.uiTourConfig ? TourMatMenuModule : [],
  ],
  providers: [],
})
export class ReportsListModule {}
