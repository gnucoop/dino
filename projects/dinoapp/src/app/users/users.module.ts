import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {CollectModule as DinoCollectModule} from '@dino/material/collect';

import {UsersComponent} from './components/users.component';
import {UsersRoutingModule} from './users-routing.module';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, DinoBreadcrumbsModule, DinoCollectModule, UsersRoutingModule],
})
export class UsersModule {}
