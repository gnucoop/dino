import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {DataChatModule as DinoDataChatModule} from '@dino/material/datachat';
import {DataChatRoutingModule} from './datachat-e2e-routing.module';

import {DataChatE2E} from './datachat-e2e.component';

@NgModule({
  declarations: [DataChatE2E],
  imports: [CommonModule, DinoBreadcrumbsModule, DinoDataChatModule, DataChatRoutingModule],
})
export class MaterialDataChatE2eModule {}
