import {AjfFieldType} from '@ajf/core/forms';
import {Component} from '@angular/core';
import {DataModelManager} from '@dewco/core/data';
import {FilterGroup, FiltersService, ListHeader} from '@dewco/core/list';
import {ListDataSource} from '@dewco/material/list-datasource';

import {displayedHeaders, ELEMENT_DATA, ElementManager, PeriodicElement} from './element-manager';
import {testAjfSchema} from './test-ajf-formschema';

@Component({
  selector: 'mat-list-e2e',
  templateUrl: 'list-e2e.html',
})
export class MatListE2E {
  readonly filters: FilterGroup[] = [
    {
      filterGroupName: 'Stats',
      filterGroupAdvancedFilters:
          [
            {
              name: 'Name',
              fieldType: AjfFieldType.String,
            },
            {
              name: 'Weight',
              fieldType: AjfFieldType.Number,
            },
          ],
      filterGroupBasicFilters: [{
        name: 'Location',
        fieldType: AjfFieldType.MultipleChoice,
        choicesOrigin: {
          name: 'location',
          type: 'fixed',
          label: 'Location',
          choices:
              [
                {label: 'Location A', value: 'A'},
                {label: 'Location B', value: 'B'},
                {label: 'Location C', value: 'C'},
              ],
        }
      }]
    },
    {
      filterGroupName: 'Charts',
      filterGroupAdvancedFilters:
          [
            {
              name: 'Symbol',
              fieldType: AjfFieldType.MultipleChoice,
              choicesOrigin: {
                name: 'symbol',
                type: 'fixed',
                label: 'Symbol',
                choices:
                    [
                      {label: 'Ne', value: 'Ne'},
                      {label: 'Li', value: 'Li'},
                      {label: 'B', value: 'B'},
                    ],
              }
            },
          ],
    },
  ];
  readonly data = ELEMENT_DATA;
  readonly title: string = 'Example List';
  readonly baseEditUrl: string = 'edit/';
  readonly headers: ListHeader<PeriodicElement>[] = displayedHeaders;
  readonly dataSource: ListDataSource<PeriodicElement>;

  constructor(
      readonly filtersService: FiltersService,
  ) {
    const dataService = new ElementManager() as unknown as DataModelManager<PeriodicElement>;
    this.dataSource = new ListDataSource(
        dataService,
        this.filtersService,
        testAjfSchema,
    );
  }
}
