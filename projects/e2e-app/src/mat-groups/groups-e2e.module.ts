import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {FloatingButtonModule as DinoFloatingButtonModule} from '@dino/material/floating-button';
import {ListModule as DinoListModule} from '@dino/material/list';
import {MixedEditorModule as DinoMixedEditorModule} from '@dino/material/mixed-editor';
import {SearchFiltersBarModule as DinoSearchFiltersBarModule} from '@dino/material/search-filters-bar';
import {TranslocoModule} from '@ngneat/transloco';

import {MatGroupsEditorE2E} from './groups-e2e-editor.component';
import {MatGroupsListE2E} from './groups-e2e-list.component';

@NgModule({
  declarations: [MatGroupsListE2E, MatGroupsEditorE2E],
  imports: [
    CommonModule,
    DinoBreadcrumbsModule,
    DinoFloatingButtonModule,
    DinoListModule,
    DinoMixedEditorModule,
    DinoSearchFiltersBarModule,
    TranslocoModule,
  ],
})
export class MaterialGroupsE2eModule {}
