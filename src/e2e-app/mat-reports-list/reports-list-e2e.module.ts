import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReportsModule} from '@dewco/core/reports';
import {BreakpointObserverService} from '@dewco/material/breakpoint-observer';
import {FloatingButtonModule} from '@dewco/material/floating-button';
import {ListModule} from '@dewco/material/list';
import {SearchFiltersBarModule} from '@dewco/material/search-filters-bar';

import {MockBreakpointObserver} from '../mocks';

import {MatReportsListE2E} from './reports-list-e2e';

@NgModule({
  declarations: [
    MatReportsListE2E,
  ],
  imports: [
    CommonModule,
    ListModule,
    FloatingButtonModule,
    ReportsModule,
    SearchFiltersBarModule,
  ],
  providers: [
    {provide: BreakpointObserverService, useClass: MockBreakpointObserver},
  ],
})
export class MaterialReportsListE2eModule {
}
