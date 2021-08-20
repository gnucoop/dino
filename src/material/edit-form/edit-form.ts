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
import {
  AjfForm,
  AjfFormActionEvent,
  AjfFormRenderer,
  AjfFormRendererService,
  AjfFormSerializer,
} from '@ajf/core/forms';
import {Location} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {DataModelManager, Model} from '@dewco/core/data';
import {FormData, FormSchema, FormSchemaManager} from '@dewco/core/forms';
import {combineLatest, from, Observable, of as obsOf, Subject, Subscription} from 'rxjs';
import {catchError, filter, map, shareReplay, switchMap, tap, withLatestFrom} from 'rxjs/operators';

/**
 * The Form Edit component.
 * Forms' data can be viewed or edited and saved here.
 * The form is rendered by the Ajf AjfFormRenderer
 */
@Component({
  selector: 'dewco-edit-form',
  styleUrls: ['edit-form.css'],
  templateUrl: 'edit-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EditForm<T extends Model = Model> implements OnInit, OnDestroy {
  /**
   * The Form data id
   */
  readonly formId: Observable<string>;

  /**
   * True if the form is in readonly mode
   */
  readonly isView: Observable<boolean>;

  /**
   * True if the form has a parent (is in a nested details list row)
   */
  readonly isDetails: Observable<boolean>;

  /**
   * True if no validation errors are encountered
   */
  readonly isValid: Observable<boolean>;

  /**
   * The current document object
   */
  private _currentDoc: Subject<T> = new Subject<T>();

  /**
   * The Form schema id
   */
  private _formSchemaId: Observable<string>;

  /**
   * The Form schema object
   */
  private _formSchema: Observable<FormSchema>;
  get formSchema(): Observable<FormSchema> {
    return this._formSchema;
  }

  /**
   * The Form data object
   */
  private _formData: Observable<{data: FormData, schemaId: string}>;
  get formData(): Observable<{data: FormData, schemaId: string}> {
    return this._formData;
  }

  /**
   * The Ajf Form object
   */
  private _form: Observable<AjfForm> = new Observable<AjfForm>();
  get form(): Observable<AjfForm> {
    return this._form;
  }

  /**
   * Emitted when a user tries to save a form
   */
  private _saveFormEvt: EventEmitter<AjfFormActionEvent> = new EventEmitter<AjfFormActionEvent>();

  /**
   * Subscribes to the save form event
   */
  private _saveFormSub: Subscription = Subscription.EMPTY;

  /**
   * The data model manager used to retrieve the data to be edited
   */
  private _dataModelManager: DataModelManager<T>;
  @Input()
  set dataModelManager(dmm: DataModelManager<T>) {
    if (dmm == null) {
      return;
    }
    this._dataModelManager = dmm;
  }

  /**
   * The Ajf Form Renderer
   */
  @ViewChild(AjfFormRenderer, {static: true}) formCmp: AjfFormRenderer;

  constructor(
      private _router: Router,
      private _route: ActivatedRoute,
      private _fs: FormSchemaManager,
      private _rendererService: AjfFormRendererService,
      readonly snackbar: MatSnackBar,
      private _location: Location,
  ) {
    this.formId = this._route.params.pipe(
        map(params => params.form_id),
        tap(id => {
          if (id == null) {
            this._router.navigateByUrl('/');
          }
        }),
        filter(id => id != null),
        shareReplay(1),
    );

    this.isView = this._route.data.pipe(map(data => {
      if (data != null && data.isView != null) {
        return data.isView;
      }
      return false;
    }));

    this.isDetails = this._route.data.pipe(map(data => {
      if (data != null && data.isDetails != null) {
        return data.isDetails;
      }
      return false;
    }));

    this.isValid =
        this._rendererService.errors.pipe(map((errors: number) => errors === 0), shareReplay(1));
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

  ngOnInit() {
    if (this._dataModelManager == null) {
      this._router.navigateByUrl('');
      this.snackbar.open('Oops! Something went wrong opening the form', 'ERROR', {duration: 5000});
      throw new Error('No Data manager was provided');
    }

    this._formData = this.formId.pipe(
        withLatestFrom(this.isDetails),
        map(([id, isDetails]) => {
          const dm: DataModelManager<T> =
              isDetails && this._dataModelManager.detailsManager != null ?
              this._dataModelManager.detailsManager :
              this._dataModelManager;

          return dm.query({selector: {id: id}})
              .pipe(
                  switchMap((rxdbQuery) => {
                    const res = from(rxdbQuery.exec());
                    return res;
                  }),
                  map((docs) => {
                    if (!docs.length) {
                      this._router.navigateByUrl('');
                      return null;
                    }
                    const rxDoc = docs[0];
                    const item: {[key: string]: any} = rxDoc.toJSON();
                    this._currentDoc.next(item as T);
                    if ('data' in item && item['data'] != null) {
                      const formDataObj = {
                        data: item['data']['data'] ?? item['data'] ?? null,
                        schemaId: item['data']['schema_id'] ?? item['schema_id'] ?? null,
                      };
                      return formDataObj;
                    }
                    return null;
                  }),
              );
        }),
        switchMap(data => data as Observable<{data: FormData, schemaId: string}>),
        shareReplay(1),
    );

    this._formSchemaId = this._formData.pipe(
        map(formDataObj => formDataObj.schemaId),
        filter(id => id != null),
        shareReplay(1),
    );

    this._formSchema = this._formSchemaId.pipe(
        map(
            schemaId => this._fs.get(schemaId).pipe(
                map(doc => {
                  if (doc == null) {
                    return null;
                  }
                  const item = doc.toJSON();
                  return item;
                }),
                ),
            ),
        switchMap(schema => schema as Observable<FormSchema>),
        shareReplay(1),
    );

    this._form = this._formSchema.pipe(
        withLatestFrom(this._formData),
        map(([fschema, fdata]) => {
          if (fschema == null) {
            this._location.back();
            this.snackbar.open(
                'Oops! We could not find this Form Schema', 'FORM NOT FOUND', {duration: 5000});
            return AjfFormSerializer.fromJson({});
          }
          if (fschema.schema.choicesOrigins == null) {
            fschema.schema.choicesOrigins = [];
          }
          return AjfFormSerializer.fromJson(fschema.schema, fdata.data);
        }),
        shareReplay(1),
    );

    this._saveFormSub =
        combineLatest([this._saveFormEvt as Observable<AjfFormActionEvent>, this._currentDoc])
            .pipe(
                map(([_, item]) => {
                  return {doc: item, formValue: this._rendererService.getFormValue()};
                }),
                withLatestFrom(this.isDetails),
                switchMap(([formObj, isDetails]) => {
                  let newItem = formObj.doc as {[key: string]: any};
                  newItem.data.data != null ? newItem.data.data = formObj.formValue :
                                              newItem.data = formObj.formValue;
                  const dm: DataModelManager<T> =
                      isDetails && this._dataModelManager.detailsManager != null ?
                      this._dataModelManager.detailsManager :
                      this._dataModelManager;
                  return dm.update(newItem as T);
                }),
                catchError(err => {
                  this.snackbar.open(err, 'ERROR', {duration: 5000});
                  return obsOf(err);
                }),
                )
            .subscribe(_ => this.snackbar.open('Document saved', 'SAVE', {duration: 5000}));
  }

  ngOnDestroy() {
    this._saveFormSub.unsubscribe();
    this._saveFormEvt.complete();
    this._currentDoc.complete();
  }
}
