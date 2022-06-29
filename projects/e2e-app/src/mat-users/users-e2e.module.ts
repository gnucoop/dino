import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {BreakpointObserverModule} from '@dino/material/breakpoint-observer';
import {CollectModule as DinoCollectModule} from '@dino/material/collect';
import {UsersRoutingModule} from './users-e2e-routing.module';

import {MatUsersE2E} from './users-e2e.component';

@NgModule({
  declarations: [MatUsersE2E],
  imports: [
    BreakpointObserverModule,
    CommonModule,
    DinoBreadcrumbsModule,
    DinoCollectModule,
    UsersRoutingModule,
  ],
})
export class MaterialUsersE2eModule {}
