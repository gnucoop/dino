import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@dewco/core/forms';
import {BreakpointObserverService} from '@dewco/material/breakpoint-observer';
import {ListModule} from '@dewco/material/list';
import {SearchFiltersBarModule} from '@dewco/material/search-filters-bar';
import {MockBreakpointObserver} from '../mocks';

import {MatListE2E} from './list-e2e';

@NgModule({
  declarations: [
    MatListE2E,
  ],
  imports: [
    CommonModule,
    ListModule,
    FormsModule,
    SearchFiltersBarModule,
  ],
  providers: [
    {provide: BreakpointObserverService, useClass: MockBreakpointObserver},
  ],
})
export class MaterialListE2eModule {
}
