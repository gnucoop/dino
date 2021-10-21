import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@dewco/core/forms';
import {BreakpointObserverService} from '@dewco/material/breakpoint-observer';
import {FloatingButtonModule} from '@dewco/material/floating-button';
import {ListModule} from '@dewco/material/list';
import {SearchFiltersBarModule} from '@dewco/material/search-filters-bar';

import {MockBreakpointObserver} from '../mocks';

import {MatFormsListE2E} from './forms-list-e2e';

@NgModule({
  declarations: [MatFormsListE2E],
  imports: [CommonModule, ListModule, FloatingButtonModule, FormsModule, SearchFiltersBarModule],
  providers: [{provide: BreakpointObserverService, useClass: MockBreakpointObserver}],
})
export class MaterialFormsListE2eModule {}
