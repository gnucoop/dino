import {AjfFieldType} from '@ajf/core/forms';
import {Component} from '@angular/core';
import {FilterGroup, FiltersService, ListHeader} from '@dewco/core/list';
import {ListDataSource} from '@dewco/material/list-datasource';
import {map, switchMap} from 'rxjs/operators';

import {displayedHeaders, ELEMENT_DATA, ElementManager, PeriodicElement} from './element-manager';
import {testAjfSchema} from './test-ajf-form';


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
  readonly dataSource = new ListDataSource<PeriodicElement, ElementManager>(
      this.service, this.filtersService, testAjfSchema);

  private _setupTestDb() {
    this.service.list()
        .pipe(
            switchMap(query => query.exec()),
            )
        .subscribe(items => {
          if (!items.length) {
            this._populateTestDb();
          }
        });
  }

  private _populateTestDb() {
    this.service.bulkCreate(ELEMENT_DATA)
        .pipe(
            map(docs => docs.success),
            )
        .subscribe(_ => {
          this.filtersService.listReady = true;
        });
  }

  constructor(readonly service: ElementManager, readonly filtersService: FiltersService) {
    this._setupTestDb();
  }
}
