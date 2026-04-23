import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RagComponent} from './components/rag.component';
import {RagRoutingModule} from './rag-routing.module';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {DataChatModule as DinoDataChatModule} from '@dino/material/datachat';

@NgModule({
  declarations: [RagComponent],
  imports: [CommonModule, DinoBreadcrumbsModule, DinoDataChatModule, RagRoutingModule],
  providers: [],
})
export class RagModule {}
