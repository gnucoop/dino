import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FloatingButtonModule as DinoFloatingButtonModule} from '@dino/material/floating-button';
import {ListModule as DinoListModule} from '@dino/material/list';
import {MixedEditorModule as DinoMixedEditorModule} from '@dino/material/mixed-editor';
import {SearchFiltersBarModule as DinoSearchFiltersBarModule} from '@dino/material/search-filters-bar';
import {MatGroupsEditorE2E} from './groups-e2e-editor.component';

import {MatGroupsListE2E} from './groups-e2e-list.component';

@NgModule({
  declarations: [MatGroupsListE2E, MatGroupsEditorE2E],
  imports: [
    CommonModule,
    DinoFloatingButtonModule,
    DinoListModule,
    DinoMixedEditorModule,
    DinoSearchFiltersBarModule,
  ],
})
export class MaterialGroupsE2eModule {}
