import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {FormsModule as DinoFormsModule} from '@dino/core/forms';
import {FloatingButtonModule} from '@dino/material/floating-button';
import {ListModule as DinoListModule} from '@dino/material/list';
import {SearchFiltersBarModule as DinoFiltersBarModule} from '@dino/material/search-filters-bar';
import {TranslocoModule} from '@ngneat/transloco';

import {GroupEditorPage} from './components/group-editor-page.component';
import {GroupsList} from './components/groups-list.component';
import {GroupsListRoutingModule} from './groups-list-routing.module';

@NgModule({
  declarations: [GroupEditorPage, GroupsList],
  imports: [
    CommonModule,
    FormsModule,
    ScrollingModule,
    MatButtonModule,
    MatIconModule,
    DinoBreadcrumbsModule,
    DinoFiltersBarModule,
    DinoFormsModule,
    DinoListModule,
    FloatingButtonModule,
    GroupsListRoutingModule,
    TranslocoModule,
  ],
  providers: [],
})
export class GroupsListModule {}
