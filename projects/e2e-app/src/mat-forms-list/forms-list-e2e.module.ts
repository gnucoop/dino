import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@dino/core/forms';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {BreakpointObserverService} from '@dino/material/breakpoint-observer';
import {FloatingButtonModule} from '@dino/material/floating-button';
import {ListModule} from '@dino/material/list';
import {SearchFiltersBarModule} from '@dino/material/search-filters-bar';
import {TranslocoModule} from '@ngneat/transloco';

import {MockBreakpointObserver} from '../mocks';
import {MatFormsListE2E} from './forms-list-e2e';

@NgModule({
  declarations: [MatFormsListE2E],
  imports: [
    CommonModule,
    DinoBreadcrumbsModule,
    ListModule,
    FloatingButtonModule,
    FormsModule,
    SearchFiltersBarModule,
    TranslocoModule,
  ],
  providers: [{provide: BreakpointObserverService, useClass: MockBreakpointObserver}],
})
export class MaterialFormsListE2eModule {}
