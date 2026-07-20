import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {ImportFormModule as DinoImportFormModule} from '@dino/material/import-form';

import {ImportFormPageComponent} from './components/import-form-page.component';
import {ImportFormPageRoutingModule} from './import-form-page-routing.module';

@NgModule({
  declarations: [ImportFormPageComponent],
  imports: [
    CommonModule,
    DinoBreadcrumbsModule,
    DinoImportFormModule,
    ImportFormPageRoutingModule,
  ],
})
export class ImportFormPageModule {}
