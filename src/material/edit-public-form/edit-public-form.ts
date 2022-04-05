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

import {
  AjfForm,
  AjfFormActionEvent,
  AjfFormSerializer,
  AjfFormRendererService,
} from '@ajf/core/forms';
import {Location} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {InsertModel} from '@dino/core/data';
import {
  FormData,
  FormSchema,
  OnlineFormDataManager,
  OnlineFormSchemaManager,
} from '@dino/core/forms';
import {TranslocoService} from '@ngneat/transloco';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {filter, map, shareReplay, switchMap, tap, withLatestFrom} from 'rxjs/operators';

const errorMsg = 'Unable to save form. Please try again later.';
const okBtn = 'Ok';

@Component({
  selector: 'dino-edit-public-form',
  templateUrl: 'edit-public-form.html',
  styleUrls: ['edit-public-form.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EditPublicForm implements OnDestroy {
  /**
   * The Form schema object
   */
  readonly formSchema: Observable<FormSchema>;

  /**
   * The Ajf Form object
   */
  readonly form: Observable<AjfForm>;

  /**
   * True if no validation errors are encountered in the AjfForm
   */
  readonly isValid: Observable<boolean>;

  /**
   * True if the form has been submitted.
   */
  readonly submitted = new BehaviorSubject<boolean>(false);

  /**
   * Emitted when a user tries to save a form
   */
  private _saveFormEvt: EventEmitter<AjfFormActionEvent> = new EventEmitter<AjfFormActionEvent>();

  /**
   * Save form event subscription
   */
  private _saveFormSub: Subscription;

  constructor(
    route: ActivatedRoute,
    fsm: OnlineFormSchemaManager,
    fdm: OnlineFormDataManager,
    location: Location,
    snackBar: MatSnackBar,
    frs: AjfFormRendererService,
    ts: TranslocoService,
  ) {
    const formSchemaId = route.params.pipe(
      map(params => params.form_schema_id as string),
      tap(id => {
        if (id == null) {
          location.back();
        }
      }),
      filter(id => id != null),
      shareReplay(1),
    );

    const formSchema = formSchemaId.pipe(
      switchMap(schemaId =>
        fsm.get(schemaId).pipe(
          map(doc => {
            if (doc == null) {
              return null;
            }
            return doc;
          }),
        ),
      ),
      shareReplay(1),
    );

    this.form = formSchema.pipe(
      map(fschema => {
        if (fschema == null) {
          location.back();
          snackBar.open('Oops! We could not find this Form Schema', 'FORM NOT FOUND', {
            duration: 5000,
          });
          return AjfFormSerializer.fromJson({});
        }
        if (fschema.schema.choicesOrigins == null) {
          fschema.schema.choicesOrigins = [];
        }
        return AjfFormSerializer.fromJson(fschema.schema, {});
      }),
      shareReplay(1),
    );

    this.isValid = frs.errors.pipe(
      map(errors => errors === 0),
      shareReplay(1),
    );

    this._saveFormSub = this._saveFormEvt
      .pipe(
        withLatestFrom(formSchemaId),
        switchMap(([_, fsId]) => {
          const data = frs.getFormValue();
          const form: InsertModel<FormData> = {
            user_data_ref_id: '',
            form_schema_ref_id: fsId,
            area_ref_id: null,
            case_ref_id: null,
            location_ref_id: null,
            project_ref_id: null,
            organization_ref_id: null,
            data,
            created_at: new Date().toISOString(),
          };
          return fdm.create(form);
        }),
      )
      .subscribe(res => {
        if (res != null) {
          this.submitted.next(true);
        } else {
          snackBar.open(ts.translate(errorMsg), ts.translate(okBtn), {duration: 5000});
        }
      });
  }

  ngOnDestroy(): void {
    this._saveFormSub.unsubscribe();
  }

  /**
   * Called whenever the user invokes an action on a row item.
   * @param evt The user action event
   */
  onFormAction(evt: AjfFormActionEvent): void {
    if (evt.action === 'save') {
      this._saveFormEvt.emit(evt);
    }
  }
}
