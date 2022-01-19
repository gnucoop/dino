import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreakpointObserverModule} from '@dino/material/breakpoint-observer';
import {CollectModule as DinoCollectModule} from '@dino/material/collect';

import {MatUsersE2E} from './users-e2e.component';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';

@NgModule({
  declarations: [MatUsersE2E],
  imports: [BreakpointObserverModule, CommonModule, DinoBreadcrumbsModule, DinoCollectModule],
})
export class MaterialUsersE2eModule {}
