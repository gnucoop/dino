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
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {ActionTrigger, ActionTriggerData, InsertModel} from '@dino/core/data';
import {
  FormData,
  FormSchema,
  FormStatus,
  OnlineFormDataManager,
  OnlineFormSchemaManager,
  OnlineFormStatusManager,
} from '@dino/core/forms';
import {OnlineLangManager} from '@dino/core/langs';
import {OnlineUserDataManager} from '@dino/core/users';
import {TranslocoService} from '@ngneat/transloco';
import {format} from 'date-fns';
import {BehaviorSubject, Observable, Subscription, combineLatest, of as obsOf} from 'rxjs';
import {filter, map, shareReplay, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';

const successMsg = 'Form submitted successfully!';
const redoBtn = 'FILL OUT ANOTHER ONE';
const errorMsg = 'Unable to save form.';
const retryBtn = 'TRY AGAIN';

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
   * The Form schema Statuses for the current Form schema
   */
  readonly formSchemaStatuses: Observable<FormStatus[] | null>;

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

  private _loadLangsSub: Subscription = Subscription.EMPTY;

  /**
   * Subscribes to the ajf validation state to save the form
   */
  private _saveValidFormSub: Subscription = Subscription.EMPTY;

  /**
   * While true, the save button is disabled
   */
  isSaving: boolean = false;

  /**
   * Event emitted as an Action hook
   */
  @Output() readonly emitActionTrigger: EventEmitter<ActionTrigger<FormData>> = new EventEmitter<
    ActionTrigger<FormData>
  >();

  constructor(
    route: ActivatedRoute,
    fsm: OnlineFormSchemaManager,
    fstm: OnlineFormStatusManager,
    fdm: OnlineFormDataManager,
    udm: OnlineUserDataManager,
    lm: OnlineLangManager,
    location: Location,
    snackBar: MatSnackBar,
    frs: AjfFormRendererService,
    ts: TranslocoService,
  ) {
    this._loadLangsSub = lm.loadLangs().subscribe();

    const formSchemaManagerInit = fsm.init();
    const formDataManagerInit = fdm.init();
    const userDataManagerInit = udm.init();
    const formStatusManagerInit = fstm.init();

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

    /**
     * Ritorna l'elenco degli stati attivi per il formschema corrente
     */
    this.formSchemaStatuses = this.formSchema.pipe(
      switchMap(schema =>
        formStatusManagerInit.pipe(
          switchMap(() => {
            if (schema == null) {
              return obsOf([]);
            }
            return fstm.formStatusesOfSchema(schema);
          }),
        ),
      ),
    );

    const anonymousUserData = userDataManagerInit.pipe(
      switchMap(() => udm.getDefaultAnonymousUser()),
    );

    this.form = combineLatest([this.formSchema, anonymousUserData, metricParams, ts.langChanges$]).pipe(
      map(([fschema, activeUser, metricIds, _lang]) => {
        if (fschema == null) {
          snackBar.open('Oops! We could not find this Form Schema', 'FORM NOT FOUND', {
            duration: 5000,
          });
          return AjfFormSerializer.fromJson({});
        }
        const schema = JSON.parse(JSON.stringify(fschema.schema));
        if (schema.choicesOrigins == null) {
          schema.choicesOrigins = [];
        }
        const fdata = {dino_form_info: {activeUser, activeUserGroups: [], metrics: metricIds}};
        return AjfFormSerializer.fromJson(schema, fdata);
      }),
      shareReplay(1),
    );

    this.isValid = frs.errors.pipe(
      map(errors => errors === 0),
      shareReplay(1),
    );

    this._saveFormSub = this._saveFormEvt
      .pipe(
        withLatestFrom(anonymousUserData, this.formSchema, metricParams, this.formSchemaStatuses),
        switchMap(([_, anonUserData, fschema, metricIds, formStatuses]) => {
          this.isSaving = true;
          if (
            fschema == null ||
            (fschema &&
              fschema.form_status_ref_id &&
              fschema.form_status_ref_id.length &&
              (!formStatuses || !formStatuses.length))
          ) {
            return obsOf(null);
          }
          const data = frs.getFormValue();

          let defaultFormStatus: string | null =
            formStatuses && formStatuses.length
              ? formStatuses.reduce((prev, curr) =>
                  prev.status_level < curr.status_level ? prev : curr,
                ).id
              : null;

          const form: InsertModel<FormData> = {
            user_data_ref_id: anonUserData?.id ?? '',
            form_schema_ref_id: fschema?.id,
            area_ref_id: metricIds['area'] || null,
            case_ref_id: metricIds['case'] || null,
            location_ref_id: metricIds['location'] || null,
            project_ref_id: metricIds['project'] || null,
            organization_ref_id: metricIds['organization'] || null,
            form_status_ref_id: defaultFormStatus,
            data,
            created_at: format(new Date(), 'yyyy-MM-dd'),
          };
          return formDataManagerInit.pipe(switchMap(() => fdm.create(form)));
        }),
        withLatestFrom(anonymousUserData),
      )
      .subscribe(([res, anonUser]) => {
        if (res != null) {
          const trigData: ActionTriggerData<FormData> = {
            doc: res,
            additional_info: {
              activeUser: anonUser,
            },
          };
          const trigger: ActionTrigger<FormData> = {
            name: 'Form Data Created',
            triggerType: 'on_form_data_creation',
            triggerData: trigData,
          };
          this.emitActionTrigger.emit(trigger);
          this.submitted.next(true);

          snackBar
            .open(ts.translate(successMsg), ts.translate(redoBtn), {duration: 15000})
            .onAction()
            .pipe(
              tap(() => {
                this.windowReload();
              }),
              take(1),
            )
            .subscribe();
        } else {
          snackBar
            .open(ts.translate(errorMsg), ts.translate(retryBtn), {duration: 15000})
            .onAction()
            .pipe(
              tap(() => {
                this.windowReload();
              }),
              take(1),
            )
            .subscribe();
          this.isSaving = false;
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
    this._loadLangsSub.unsubscribe();
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
