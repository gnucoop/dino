/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dino (dino).
 *
 * Dino (dino) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dino (dino) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dino (dino).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {Component, EventEmitter} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {clone, DataService, Model} from '@dino/core/data';
import {Observable} from 'rxjs';
import {map, shareReplay, startWith, switchMap} from 'rxjs/operators';

interface Todo extends Model {
  message: string;
}

@Component({
  selector: 'data-demo.html',
  templateUrl: 'data-demo.html',
  styleUrls: ['data-demo.scss'],
})
export class DataDemo {
  todos: Observable<Todo[]>;
  todoForm: UntypedFormGroup = new UntypedFormGroup({
    message: new UntypedFormControl(null, [Validators.required]),
  });

  private _refreshEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private _dataService: DataService) {
    const req = {
      name: 'todo',
      collection: {
        schema: {
          title: 'Todo',
          version: 0,
          description: 'Todo',
          type: 'object',
          primaryKey: 'id',
          properties: {
            id: {type: 'string'},
            message: {type: 'string'},
            created_at: {type: 'string'},
            updated_at: {type: ['string', 'null']},
          },
        },
      },
    };

    const collection = _dataService.createCollection(req).pipe(shareReplay(1));

    this.todos = collection.pipe(
      switchMap(() => this._refreshEvent.pipe(startWith(null))),
      switchMap(() => _dataService.find<Todo>({collectionName: 'todo'})),
      map(result => result.map(doc => clone(doc.toJSON()))),
    );
  }

  insertTodo(): void {
    this._dataService
      .insert({collectionName: 'todo', object: this.todoForm.value})
      .subscribe(() => this._refreshEvent.emit());
  }
}
