import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule as DinoFormsModule} from '@dino/core/forms';
import {FloatingButtonModule} from '@dino/material/floating-button';
import {ListModule as DinoListModule} from '@dino/material/list';
import {SearchFiltersBarModule as DinoFiltersBarModule} from '@dino/material/search-filters-bar';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {TranslocoModule} from '@ngneat/transloco';

import {FormsListComponent} from './components/forms-list.component';
import {FormsListRoutingModule} from './forms-list-routing.module';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [FormsListComponent],
  imports: [
    CommonModule,
    DinoBreadcrumbsModule,
    DinoFiltersBarModule,
    DinoFormsModule,
    DinoListModule,
    FloatingButtonModule,
    FormsListRoutingModule,
    MatDialogModule,
    TranslocoModule,
  ],
  providers: [],
})
export class FormsListModule {}
