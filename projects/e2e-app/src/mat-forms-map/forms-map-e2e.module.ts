import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@dino/core/forms';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {BreakpointObserverService} from '@dino/material/breakpoint-observer';
import {FloatingButtonModule} from '@dino/material/floating-button';
import {ListModule} from '@dino/material/list';
import {SearchFiltersBarModule} from '@dino/material/search-filters-bar';
import {TranslocoModule} from '@ngneat/transloco';

import {MockBreakpointObserver} from '../mocks';
import {MatFormsMapE2E} from './forms-map-e2e';
import {FormsMapRoutingModule} from './forms-map-e2e-routing.module';

@NgModule({
  declarations: [MatFormsMapE2E],
  imports: [
    CommonModule,
    DinoBreadcrumbsModule,
    ListModule,
    FloatingButtonModule,
    FormsModule,
    MatDialogModule,
    SearchFiltersBarModule,
    TranslocoModule,
    FormsMapRoutingModule,
  ],
  providers: [{provide: BreakpointObserverService, useClass: MockBreakpointObserver}],
})
export class MaterialFormsMapE2eModule {}
