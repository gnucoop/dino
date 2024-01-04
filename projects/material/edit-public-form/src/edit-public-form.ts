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
  Input,
  isDevMode,
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
import {OnlineUserDataManager} from '@dino/core/users';
import {TranslocoService} from '@ngneat/transloco';
import {format} from 'date-fns';
import {BehaviorSubject, Observable, Subscription, combineLatest} from 'rxjs';
import {filter, map, shareReplay, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';

const successMsg = 'Form submitted successfully!';
const errorMsg = 'Unable to save form. Please try again later.';
const okBtn = 'OK';

@Component({
  selector: 'dino-edit-public-form',
  templateUrl: 'edit-public-form.html',
  styleUrls: ['edit-public-form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EditPublicForm implements OnDestroy {
  /**
   * If true, the content of the Ajf Form Fields is centered
   */
  @Input() centeredFieldsContent: boolean = false;

  /**
   * The max number of columns on which the Ajf Form Fields are spread
   */
  @Input() maxColumns: 1 | 2 | 3 = 1;

  /**
   * The Ajf Form object
   */
  readonly form: Observable<AjfForm>;

  /**
   * The Ajf FormSchema object
   */
  readonly formSchema: Observable<FormSchema | null>;

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

  /**
   * Subscribes to the ajf validation state to save the form
   */
  private _saveValidFormSub: Subscription = Subscription.EMPTY;

  constructor(
    route: ActivatedRoute,
    fsm: OnlineFormSchemaManager,
    fdm: OnlineFormDataManager,
    udm: OnlineUserDataManager,
    location: Location,
    snackBar: MatSnackBar,
    frs: AjfFormRendererService,
    ts: TranslocoService,
  ) {
    const formSchemaManagerInit = fsm.init();
    const formDataManagerInit = fdm.init();
    const userDataManagerInit = udm.init();

    const formSchemaId = route.params.pipe(
      map(params => params['form_schema_id'] as string),
      tap(id => {
        if (id == null) {
          location.back();
        }
      }),
      filter(id => id != null),
      shareReplay(1),
    );

    const metricParams = route.queryParams.pipe(
      map(params => {
        const ids: {[key: string]: string | null} = {};
        const metricNames = ['project', 'location', 'area', 'case', 'organization'];
        metricNames.forEach(metric => {
          ids[metric] = params[metric] ? (params[metric] as string) : null;
        });
        return ids;
      }),
    );

    this.formSchema = formSchemaId.pipe(
      switchMap(schemaId =>
        formSchemaManagerInit.pipe(
          switchMap(() =>
            fsm.get(schemaId).pipe(
              map(doc => {
                if (doc == null) {
                  return null;
                }
                return doc;
              }),
            ),
          ),
        ),
      ),
      shareReplay(1),
    );

    const anonymousUserData = userDataManagerInit.pipe(
      switchMap(() => udm.getDefaultAnonymousUser()),
    );
    
    this.form = combineLatest([
      this.formSchema,
      anonymousUserData,
    ]).pipe(
      map(([fschema, activeUser]) => {
        if (fschema == null) {
          snackBar.open('Oops! We could not find this Form Schema', 'FORM NOT FOUND', {
            duration: 5000,
          });
          return AjfFormSerializer.fromJson({});
        }
        if (fschema.schema.choicesOrigins == null) {
          fschema.schema.choicesOrigins = [];
        }
        const fdata = {dino_form_info: {activeUser, activeUserGroups: []}};
        return AjfFormSerializer.fromJson(fschema.schema, fdata);
      }),
      shareReplay(1),
    );

    this.isValid = frs.errors.pipe(
      map(errors => errors === 0),
      shareReplay(1),
    );

    this._saveFormSub = this._saveFormEvt
      .pipe(
        switchMap(() => anonymousUserData.pipe(withLatestFrom(formSchemaId, metricParams))),
        switchMap(([anonUserData, fsId, metricIds]) => {
          const data = frs.getFormValue();
          const form: InsertModel<FormData> = {
            user_data_ref_id: anonUserData?.id ?? '',
            form_schema_ref_id: fsId,
            area_ref_id: metricIds['area'] || null,
            case_ref_id: metricIds['case'] || null,
            location_ref_id: metricIds['location'] || null,
            project_ref_id: metricIds['project'] || null,
            organization_ref_id: metricIds['organization'] || null,
            form_status_ref_id: null,
            data,
            created_at: format(new Date(), 'yyyy-MM-dd'),
          };
          return formDataManagerInit.pipe(switchMap(() => fdm.create(form)));
        }),
      )
      .subscribe(res => {
        if (res != null) {
          snackBar
            .open(ts.translate(successMsg), ts.translate(okBtn), {duration: 10000})
            .afterDismissed()
            .pipe(
              tap(() => {
                this.windowReload();
              }),
              take(1),
            )
            .subscribe();
          this.submitted.next(true);
        } else {
          snackBar
            .open(ts.translate(errorMsg), ts.translate(okBtn), {duration: 10000})
            .afterDismissed()
            .pipe(
              tap(() => {
                this.windowReload();
              }),
              take(1),
            )
            .subscribe();
        }
      });
  }

  windowReload() {
    window.location.reload();
  }

  /**
   * Saves the form
   */
  saveForm() {
    this._saveValidFormSub = this.isValid
      .pipe(
        tap(valid => {
          if (valid) {
            this._saveFormEvt.emit();
          } else {
            if (isDevMode()) {
              console.log('Invalid form');
            }
          }
        }),
        take(1),
      )
      .subscribe();

    this._saveValidFormSub.unsubscribe();
  }

  ngOnDestroy(): void {
    this._saveFormSub.unsubscribe();
    this._saveValidFormSub.unsubscribe();
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
