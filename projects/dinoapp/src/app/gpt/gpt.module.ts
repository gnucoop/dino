import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {GptComponent} from './components/gpt.component';
import {GptRoutingModule} from './gpt-routing.module';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {DataChatModule as DinoDataChatModule} from '@dino/material/datachat';

@NgModule({
  declarations: [GptComponent],
  imports: [CommonModule, DinoBreadcrumbsModule, DinoDataChatModule, GptRoutingModule],
  providers: [],
})
export class GptModule {}
