import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FormsModule as DinoFormsModule} from '@dino/core/forms';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {BreakpointObserverModule} from '@dino/material/breakpoint-observer';
import {CollectModule as DinoCollectModule} from '@dino/material/collect';
import {FloatingButtonModule as DinoFloatingButtonModule} from '@dino/material/floating-button';
import {ListModule as DinoListModule} from '@dino/material/list';
import {SearchFiltersBarModule as DinoSearchFiltersBarModule} from '@dino/material/search-filters-bar';
import {UserEditorModule as DinoUserEditorModule} from '@dino/material/user-editor';
import {TranslocoModule} from '@ngneat/transloco';

import {NotificationsListComponent} from './components/notifications-list.component';
import {NotificationsListRoutingModule} from './notifications-list-routing.module';
@NgModule({
  declarations: [NotificationsListComponent],
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
    NotificationsListRoutingModule,
  ],
})
export class NotificationsListModule {}
