import {Component} from '@angular/core';
import {DataModelManager} from '@dewco/core/data';
import {FormSchema, FormSchemaManager} from '@dewco/core/forms';
import {
  FiltersService,
  ListHeader,
} from '@dewco/core/list';
import {ListDataSource} from '@dewco/material/list';

import {
  displayedHeaders,
  ElementManager,
  filters,
  PeriodicElement,
} from './element-manager';
import {testAjfSchema} from './test-ajf-formschema';

@Component({
  selector: 'mat-list-e2e',
  templateUrl: 'list-e2e.html',
})
export class MatListE2E {
  readonly customFilters = filters;
  readonly additionalBasicFilters = ['project', 'location', 'unavailableFilter'];
  readonly additionalDataSchema = testAjfSchema;
  readonly title = 'Example List';
  readonly baseEditUrl = 'edit/';
  readonly headers: ListHeader<PeriodicElement>[] = displayedHeaders;
  readonly dataSource: ListDataSource<PeriodicElement, FormSchema>;

  constructor(
      readonly filtersService: FiltersService,
      readonly formSchemaManager: FormSchemaManager,
  ) {
    const dataService = new ElementManager() as unknown as DataModelManager<PeriodicElement>;
    this.dataSource = new ListDataSource(
        dataService,
        this.filtersService,
        this.formSchemaManager,
    );
  }
}
