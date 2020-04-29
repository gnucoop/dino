/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
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

import {Component, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService, Model} from '@dewco/core/data';
import {from, Observable} from 'rxjs';
import {map, shareReplay, startWith, switchMap} from 'rxjs/operators';

interface Todo extends Model {
  message: string;
}

@Component({
  selector: 'data-demo.html',
  templateUrl: 'data-demo.html',
  styleUrls: ['data-demo.css'],
})
export class DataDemo {
  todos: Observable<Todo[]>;
  todoForm: FormGroup = new FormGroup({
    message: new FormControl(null, [Validators.required]),
  });

  private _refreshEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private _dataService: DataService) {
    const req = {
      collection: {
        name: 'todo',
        schema: {
          title: 'Todo',
          version: 0,
          description: 'Todo',
          type: 'object',
          properties: {
            id: {type: 'string', primary: true},
            message: {type: 'string'},
            created_at: {type: 'string'},
            updated_at: {type: ['string', 'null']},
          },
        },
      },
    };

    const collection = _dataService.createCollection(req).pipe(
        shareReplay(1),
    );

    this.todos = collection.pipe(
        switchMap(() => this._refreshEvent.pipe(startWith(null))),
        switchMap(() => _dataService.find({collectionName: 'todo'})),
        switchMap(query => from(query.exec())),
        map(result => result.map(doc => doc._data)),
    );
  }

  insertTodo(): void {
    this._dataService.insert({collectionName: 'todo', object: this.todoForm.value})
        .subscribe(() => this._refreshEvent.emit());
  }
}
