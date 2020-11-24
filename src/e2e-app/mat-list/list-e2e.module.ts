import {NgModule} from '@angular/core';
import {LocationModule} from '@dewco/core/locations';
import {ProjectModule} from '@dewco/core/projects';
import {ListModule} from '@dewco/material/list';
import {SearchFiltersBarModule} from '@dewco/material/search-filters-bar';

import {MatListE2E} from './list-e2e';

@NgModule({
  declarations: [
    MatListE2E,
  ],
  imports: [
    ListModule,
    LocationModule,
    ProjectModule,
    SearchFiltersBarModule,
  ],
})
export class MaterialListE2eModule {
}
