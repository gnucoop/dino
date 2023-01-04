import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatLegacySnackBarModule as MatSnackBarModule} from '@angular/material/legacy-snack-bar';
import {FormsModule as DinoFormsModule} from '@dino/core/forms';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {BreakpointObserverModule} from '@dino/material/breakpoint-observer';
import {CollectModule as DinoCollectModule} from '@dino/material/collect';
import {FloatingButtonModule as DinoFloatingButtonModule} from '@dino/material/floating-button';
import {ListModule as DinoListModule} from '@dino/material/list';
import {SearchFiltersBarModule as DinoSearchFiltersBarModule} from '@dino/material/search-filters-bar';
import {UserEditorModule as DinoUserEditorModule} from '@dino/material/user-editor';
import {TranslocoModule} from '@ngneat/transloco';

import {MatUsersEditorE2E} from './users-editor-e2e.component';
import {MatUsersListE2E} from './users-list-e2e.component';
import {UsersManageRoutingModule} from './users-manage-e2e-routing.module';

@NgModule({
  declarations: [MatUsersEditorE2E, MatUsersListE2E],
  imports: [
    BreakpointObserverModule,
    CommonModule,
    DinoBreadcrumbsModule,
    DinoCollectModule,
    DinoFloatingButtonModule,
    DinoFormsModule,
    DinoListModule,
    DinoSearchFiltersBarModule,
    DinoUserEditorModule,
    MatSnackBarModule,
    TranslocoModule,
    UsersManageRoutingModule,
  ],
})
export class MaterialUsersManageE2eModule {}
