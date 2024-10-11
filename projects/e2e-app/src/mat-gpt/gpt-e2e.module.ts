import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {DataChatModule as DinoDataChatModule} from '@dino/material/datachat';
import {GptRoutingModule} from './gpt-e2e-routing.module';

import {GptE2E} from './gpt-e2e.component';

@NgModule({
  declarations: [GptE2E],
  imports: [CommonModule, DinoBreadcrumbsModule, DinoDataChatModule, GptRoutingModule],
})
export class GptE2eModule {}
