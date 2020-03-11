/**
 * @license
 * Copyright (C) 2020 Gnucoop soc. coop.
 *
 * This file is part of the Dewco (dewco).
 *
 * Dewco (dewco) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dewco (dewco) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dewco (dewco).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {Component} from '@angular/core';
import {DataService} from '@dewco/core/data';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'data-demo.html',
  templateUrl: 'data-demo.html',
  styleUrls: ['data-demo.css'],
})
export class DataDemo {
  constructor(dataService: DataService) {
    dataService
        .createCollection({
          name: 'dummy',
          schema: {
            title: 'dummy schema',
            version: 0,
            description: 'describe a dummy model',
            type: 'object',
            properties: {id: {type: 'string', primary: true}, name: {type: 'string'}}
          }
        })
        .pipe(
            switchMap(() => dataService.get<any>('dummy', 'xxx')),
            )
        .subscribe(console.log, console.log, console.log);
  }
}
