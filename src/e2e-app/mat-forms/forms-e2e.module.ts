import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule} from '@dino/material/breadcrumbs';
import {BreakpointObserverModule} from '@dino/material/breakpoint-observer';
import {CollectModule as DinoCollectModule} from '@dino/material/collect';

import {MatFormsE2E} from './forms-e2e.component';

@NgModule({
  declarations: [MatFormsE2E],
  imports: [BreadcrumbsModule, BreakpointObserverModule, CommonModule, DinoCollectModule],
})
export class MaterialFormsE2eModule {}
