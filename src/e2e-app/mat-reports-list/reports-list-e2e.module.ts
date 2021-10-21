import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReportsModule} from '@dino/core/reports';
import {BreakpointObserverService} from '@dino/material/breakpoint-observer';
import {FloatingButtonModule} from '@dino/material/floating-button';
import {ListModule} from '@dino/material/list';
import {SearchFiltersBarModule} from '@dino/material/search-filters-bar';

import {MockBreakpointObserver} from '../mocks';

import {MatReportsListE2E} from './reports-list-e2e';

@NgModule({
  declarations: [MatReportsListE2E],
  imports: [CommonModule, ListModule, FloatingButtonModule, ReportsModule, SearchFiltersBarModule],
  providers: [{provide: BreakpointObserverService, useClass: MockBreakpointObserver}],
})
export class MaterialReportsListE2eModule {}
