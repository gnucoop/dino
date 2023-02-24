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

import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {MatButtonToggleChange} from '@angular/material/button-toggle';
import {MatDialogRef} from '@angular/material/dialog';
import {PermissionContextService} from '@dino/core/data';
import {FormSchema, FormSchemaManager} from '@dino/core/forms';
import {Observable, of as obsOf} from 'rxjs';
import {map, switchMap, take} from 'rxjs/operators';

/**
 * The Form Data creator hub component.
 * Provides a unified UI for the creation of data related to
 * any Form Schema allowed by the active user permissions.
 */
@Component({
  selector: 'dino-form-creator-hub',
  styleUrls: ['form-creator-hub.scss'],
  templateUrl: 'form-creator-hub.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FormCreatorHub {
  /**
   * The available Form Schemas
   */
  schemas: Observable<FormSchema[]> = obsOf([]);
  /**
   * Id of the selected Form Schema
   */
  private _selectedSchemaId: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<FormCreatorHub>,
    private _pcs: PermissionContextService,
    private _fsm: FormSchemaManager,
  ) {
    this.schemas = this._pcs.getWhichFormCanBeCreated().pipe(
      switchMap(schemaIds => {
        if (!schemaIds.length) {
          return obsOf([]);
        }
        if (schemaIds.includes('all')) {
          return this._fsm.list();
        }
        const selector = {id: {$in: schemaIds}};
        return this._fsm.query({selector});
      }),
      map(res => res.sort((a, b) => (a.label! > b.label! ? 1 : -1))),
      take(1),
    );
  }

  /**
   * Selects the schema id of the form data to be created
   */
  selectSchema(event: MatButtonToggleChange) {
    this._selectedSchemaId = event.value;
  }

  /**
   * Closes the dialog and returns the selected schema id.
   */
  createForm() {
    this.dialogRef.close(this._selectedSchemaId);
  }
}
