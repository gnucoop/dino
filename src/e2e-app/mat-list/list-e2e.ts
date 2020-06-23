import {Component} from '@angular/core';
import {ListHeader} from '@dewco/core/list';

import {ELEMENT_DATA, ElementManager} from './element-manager';

@Component({
  selector: 'mat-list-e2e',
  templateUrl: 'list-e2e.html',
})
export class MatListE2E {
  constructor(readonly service: ElementManager) {}
  readonly data = ELEMENT_DATA;
  readonly title: string = 'Example Material List';
  readonly baseEditUrl: string = 'edit/';
  readonly displayedColumns = ['id', 'name', 'weight', 'symbol'];
  readonly headers: ListHeader[] = [
    {column: 'id', label: 'ID', sortable: false},
    {column: 'name', label: 'Name', sortable: true},
    {column: 'weight', label: 'Weight', sortable: true},
    {column: 'symbol', label: 'Symbol', sortable: false},
  ];

  // this.service.bulkCreate(this.data)
  //     .pipe(
  //         map(docs => docs.success),
  //         )
  //     .subscribe(docs => {
  //       console.log(docs);
  //     });
}
