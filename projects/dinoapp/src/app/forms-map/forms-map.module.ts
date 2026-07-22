import {AjfTranslocoModule} from '@ajf/core/transloco';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {BreadcrumbsModule} from '@dino/material/breadcrumbs';
import {ExportListModule} from '@dino/material/export-list';
import {SearchFiltersBarModule} from '@dino/material/search-filters-bar';

import {FormsMapComponent} from './components/forms-map';
import {FormsMapRoutingModule} from './forms-map-routing.module';

@NgModule({
  declarations: [FormsMapComponent],
  imports: [
    AjfTranslocoModule,
    BreadcrumbsModule,
    CommonModule,
    ExportListModule,
    FormsMapRoutingModule,
    MatDialogModule,
    MatIconModule,
    SearchFiltersBarModule,
  ],
  providers: [],
})
export class FormsMapModule {}
