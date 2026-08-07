import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule as DinoFormsModule} from '@dino/core/forms';
import {ListModule as DinoListModule} from '@dino/material/list';
import {SearchFiltersBarModule as DinoFiltersBarModule} from '@dino/material/search-filters-bar';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {AggregationListComponent} from './components/aggregation-list.component';
import {AggregationListRoutingModule} from './aggregation-list-routing.module';
import {TranslocoModule} from '@ngneat/transloco';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [AggregationListComponent],
  imports: [
    CommonModule,
    DinoBreadcrumbsModule,
    DinoFiltersBarModule,
    DinoFormsModule,
    DinoListModule,
    MatButtonModule,
    MatDialogModule,
    TranslocoModule,
    AggregationListRoutingModule,
  ],
  providers: [],
})
export class AggregationListModule {}
