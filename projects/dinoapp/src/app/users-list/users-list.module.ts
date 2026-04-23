import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {FormsModule as DinoFormsModule} from '@dino/core/forms';
import {FloatingButtonModule} from '@dino/material/floating-button';
import {ListModule as DinoListModule} from '@dino/material/list';
import {SearchFiltersBarModule as DinoFiltersBarModule} from '@dino/material/search-filters-bar';
import {UserEditorModule as DinoUserEditorModule} from '@dino/material/user-editor';
import {TranslocoModule} from '@ngneat/transloco';

import {UsersEditor} from './components/users-editor.component';
import {UsersList} from './components/users-list.component';
import {UsersListRoutingModule} from './users-list-routing.module';

@NgModule({
  declarations: [UsersEditor, UsersList],
  imports: [
    CommonModule,
    DinoBreadcrumbsModule,
    DinoFiltersBarModule,
    DinoFormsModule,
    DinoListModule,
    DinoUserEditorModule,
    FloatingButtonModule,
    UsersListRoutingModule,
    TranslocoModule,
  ],
  providers: [],
})
export class UsersListModule {}
