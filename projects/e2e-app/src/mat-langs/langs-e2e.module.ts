import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule} from '@dino/material/breadcrumbs';
import {LangsModule} from '@dino/material/langs';
import {LangsRoutingModule} from './langs-e2e-routing.module';

import {MatLangsE2e} from './langs-e2e.component';

@NgModule({
  declarations: [MatLangsE2e],
  imports: [BreadcrumbsModule, CommonModule, LangsModule, LangsRoutingModule],
})
export class MaterialLangsE2eModule {}
