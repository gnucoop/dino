import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {FormsModule as DinoFormsModule} from '@dino/core/forms';
import {ListModule as DinoListModule} from '@dino/material/list';
import {MixedEditorModule as DinoMixedEditorModule} from '@dino/material/mixed-editor';
import {SearchFiltersBarModule as DinoFiltersBarModule} from '@dino/material/search-filters-bar';
import {TranslocoModule} from '@ngneat/transloco';

import {GroupsEditor} from './components/groups-editor.component';
import {GroupsList} from './components/groups-list.component';
import {GroupsListRoutingModule} from './groups-list-routing.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [GroupsEditor, GroupsList],
  imports: [
    CommonModule,
    DinoBreadcrumbsModule,
    DinoFiltersBarModule,
    DinoFormsModule,
    DinoListModule,
    DinoMixedEditorModule,
    MatButtonModule,
    MatTooltipModule,
    GroupsListRoutingModule,
    TranslocoModule,
  ],
  providers: [],
})
export class GroupsListModule {}
