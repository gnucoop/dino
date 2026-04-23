import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {DataChatModule as DinoDataChatModule} from '@dino/material/datachat';
import {DataChatRoutingModule} from './datachat-routing.module';

import {DataChatComponent} from './components/datachat.component';

@NgModule({
  declarations: [DataChatComponent],
  imports: [CommonModule, DinoBreadcrumbsModule, DinoDataChatModule, DataChatRoutingModule],
})
export class DataChatModule {}
