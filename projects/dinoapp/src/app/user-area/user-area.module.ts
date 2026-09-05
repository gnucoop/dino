import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {UserAreaModule as DinoUserAreaModule} from '@dino/material/user-area';

import {UserAreaComponent} from './components/user-area.component';
import {UserAreaRoutingModule} from './user-area-routing.module';

@NgModule({
  declarations: [UserAreaComponent],
  imports: [CommonModule, DinoBreadcrumbsModule, DinoUserAreaModule, UserAreaRoutingModule],
})
export class UserAreaModule {}
