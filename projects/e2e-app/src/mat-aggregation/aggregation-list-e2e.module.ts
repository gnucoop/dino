import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@dino/core/forms';
import {BreadcrumbsModule} from '@dino/material/breadcrumbs';
import {BreakpointObserverService} from '@dino/material/breakpoint-observer';
import {FloatingButtonModule} from '@dino/material/floating-button';
import {ListModule} from '@dino/material/list';
import {SearchFiltersBarModule} from '@dino/material/search-filters-bar';
import {TranslocoModule} from '@ngneat/transloco';

import {MockBreakpointObserver} from '../mocks';
import {MatAggregationListE2E} from './aggregation-list-e2e';
import {AggregationListRoutingModule} from './aggregation-list-e2e-routing.module';

@NgModule({
  declarations: [MatAggregationListE2E],
  imports: [
    AggregationListRoutingModule,
    CommonModule,
    BreadcrumbsModule,
    ListModule,
    FloatingButtonModule,
    FormsModule,
    MatDialogModule,
    SearchFiltersBarModule,
    TranslocoModule,
  ],
  providers: [{provide: BreakpointObserverService, useClass: MockBreakpointObserver}],
})
export class MaterialAggregationListE2eModule {}
