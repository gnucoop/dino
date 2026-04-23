import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {LangsModule as DinoLangsModule} from '@dino/material/langs';

import {LangsComponent} from './components/langs.component';
import {LangsRoutingModule} from './langs-routing.module';

@NgModule({
  declarations: [LangsComponent],
  imports: [CommonModule, DinoBreadcrumbsModule, DinoLangsModule, LangsRoutingModule],
})
export class LangsModule {}
