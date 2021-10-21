import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule as DinoFormsModule} from '@dino/core/forms';

import {BreakpointObserverModule} from '@dino/material/breakpoint-observer';
import {CollectModule as DinoCollectModule} from '@dino/material/collect';
import {FloatingButtonModule as DinoFloatingButtonModule} from '@dino/material/floating-button';
import {ListModule as DinoListModule} from '@dino/material/list';
import {SearchFiltersBarModule as DinoSearchFiltersBarModule} from '@dino/material/search-filters-bar';
import {UserEditorModule as DinoUserEditorModule} from '@dino/material/user-editor';

import {MatUsersEditorE2E} from './users-editor-e2e.component';
import {MatUsersListE2E} from './users-list-e2e.component';

@NgModule({
  declarations: [MatUsersEditorE2E, MatUsersListE2E],
  imports: [
    BreakpointObserverModule,
    CommonModule,
    DinoCollectModule,
    DinoFloatingButtonModule,
    DinoFormsModule,
    DinoListModule,
    DinoSearchFiltersBarModule,
    DinoUserEditorModule,
  ],
})
export class MaterialUsersManageE2eModule {}
