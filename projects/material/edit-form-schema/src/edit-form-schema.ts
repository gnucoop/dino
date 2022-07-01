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
import {AjfForm, AjfFormSerializer} from '@ajf/core/forms';
import {AjfFormBuilderService} from '@ajf/material/form-builder';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {InsertModel} from '@dino/core/data';
import {
  FormSchema,
  FormSchemaManager,
  FormSchemaVisibility,
  FormStatus,
  FormStatusManager,
} from '@dino/core/forms';
import {FormDepsEditor} from '@dino/material/form-deps-editor';
import {IconsService} from '@dino/material/icons-service';
import {format} from 'date-fns';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of as obsOf,
  Subscription,
  throwError,
} from 'rxjs';
import {catchError, map, shareReplay, switchMap, take, withLatestFrom} from 'rxjs/operators';

import {ImportFormSchema} from './import-form-schema';

/**
 * The Form Schema Editor component.
 * Form Schemas can be viewed or edited and saved here.
 * The form is rendered by the Ajf Form Builder
 */
@Component({
  selector: 'dino-edit-form-schema',
  styleUrls: ['edit-form-schema.scss'],
  templateUrl: 'edit-form-schema.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EditFormSchema implements OnInit, OnDestroy {
  /**
   * The Form Conv endpoint url
   */
  @Input() formConvUrl: string = '';

  /**
   * All the available Form Status objects.
   */
  availableFormStatuses: Observable<FormStatus[]>;

  /**
   * List of filtered Material Icons identifiers
   */
  filteredIcons: Observable<string[]> = obsOf([]);

  /**
   * Form group for editing the Form Schema attributes
   */
  readonly formGroup: Observable<FormGroup>;

  /**
   * The Ajf Form built from the Form Schema
   */
  readonly form: Observable<AjfForm | null>;

  /**
   * The Form schema id
   */
  private _formSchemaId: Observable<string | null>;

  /**
   * The Form schema object
   */
  private _formSchema: Observable<FormSchema | null>;

  /**
   * The Schema object imported from Form Conv
   */
  private _importedFormSchema: BehaviorSubject<{[key: string]: any} | null> = new BehaviorSubject<{
    [key: string]: any;
  } | null>(null);

  /**
   * Emitted when the Form Schema is saved
   */
  private _saveEvt: EventEmitter<void> = new EventEmitter<void>();

  /**
   * The Save subscription
   */
  private _saveSub: Subscription = Subscription.EMPTY;

  /**
   * A reference to the MatDialog that contains the Xlsform Import component
   */
  private _dialogRef?: MatDialogRef<ImportFormSchema>;

  /**
   * Subscribes to the value returned by the MatDialog on its closing event
   */
  private _dialogSub: Subscription = Subscription.EMPTY;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _fs: FormSchemaManager,
    private _formBuilderService: AjfFormBuilderService,
    private _formStatusManager: FormStatusManager,
    private _formSchemaManager: FormSchemaManager,
    private _snackbar: MatSnackBar,
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _iconsService: IconsService,
  ) {
    this._formSchemaId = this._route.params.pipe(
      map(params => params['form_schema_id']),
      shareReplay(1),
    );

    this._formSchema = this._formSchemaId.pipe(
      map(schemaId => {
        if (schemaId == null) {
          return obsOf(null);
        }
        return this._fs.get(schemaId).pipe(
          map(doc => {
            if (doc == null) {
              return null;
            }
            const item = doc.toJSON();
            return item;
          }),
        );
      }),
      switchMap(schema => schema as Observable<FormSchema>),
      shareReplay(1),
    );

    this.availableFormStatuses = this._formStatusManager.list();

    this.formGroup = this._formSchema.pipe(
      map(fs =>
        this._formBuilder.group({
          name: [fs ? fs.name : null, Validators.required],
          label: [fs ? fs.label : null, Validators.required],
          icon: [fs ? fs.icon : null],
          status: [fs ? fs.form_status_ref_id : null],
          visibility: [fs ? fs.visibility : FormSchemaVisibility.Private, Validators.required],
        }),
      ),
      shareReplay(1),
    );

    this.form = combineLatest([this._formSchema, this._importedFormSchema]).pipe(
      map(([fs, ifs]) => {
        let schema = {} as any;
        if (ifs != null) {
          schema = ifs;
        } else if (fs != null) {
          schema = fs.schema;
        }
        return AjfFormSerializer.fromJson(JSON.parse(JSON.stringify(schema)));
      }),
      shareReplay(1),
    );

    this._saveSub = this._saveEvt
      .pipe(
        withLatestFrom(this._formSchema, this._formBuilderService.getCurrentForm(), this.formGroup),
        switchMap(([_, fs, schema, formGroup]) => {
          if (schema == null) {
            return obsOf(null);
          }
          const formPatch: InsertModel<FormSchema> = {
            schema: schema,
            name: formGroup.get('name')?.value,
            label: formGroup.get('label')?.value,
            icon: formGroup.get('icon')?.value,
            visibility: formGroup.get('visibility')?.value,
            form_status_ref_id: formGroup.get('status')?.value ?? undefined,
            created_at: format(new Date(), 'yyyy-MM-dd'),
          };
          if (fs == null) {
            return this._formSchemaManager.create(formPatch).pipe(
              catchError(() => obsOf(null)),
              take(1),
            );
          }
          return this._formSchemaManager.patch({...fs, ...formPatch}).pipe(
            catchError(() => obsOf(null)),
            take(1),
          );
        }),
      )
      .subscribe(fs => {
        if (fs != null) {
          this._snackbar.open(`"${fs.label}" saved`, 'SAVE', {duration: 5000});
          this._router.navigateByUrl('/forms');
        } else {
          this._snackbar.open('Oops! Something went wrong saving the Form', 'ERROR', {
            duration: 5000,
          });
        }
      });
  }

  ngOnInit() {
    const iconValueChanges = this.formGroup.pipe(switchMap(fg => fg.get('icon')!.valueChanges));
    this.filteredIcons = iconValueChanges.pipe(
      withLatestFrom(this._iconsService.getIcons()),
      map(([iconValue, availableIcons]) => {
        if (iconValue == null) {
          return [];
        }
        return this._filterIcons(availableIcons, iconValue);
      }),
    );
  }

  /**
   * Filters the list of Material Icons
   * @param code The icon code identifier
   * @returns The list of filtered icons
   */
  private _filterIcons(icons: string[], code: string): string[] {
    const filterValue = code.toLowerCase();
    return icons.filter(icon =>
      icon.toLowerCase().replace('_', ' ').includes(filterValue),
    ) as string[];
  }
  /**
   * Opens the Import Xlsform dialog
   */
  openImportDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      formSchema: this._formSchema,
      formConvUrl: this.formConvUrl,
    };
    this._dialogRef = this._dialog.open(ImportFormSchema, dialogConfig);
    this._dialogSub = this._dialogRef
      .afterClosed()
      .pipe(
        catchError(err => throwError(() => err) as Observable<boolean>),
        take(1),
      )
      .subscribe((formSchema: {[key: string]: any}) => {
        if (formSchema != null) {
          this._updateImportedFormSchema(formSchema);
        }
      });
  }

  /**
   * Opens the Form Relationships dialog
   */
  openRelationshipsDialog(): void {
    const dialogConfig = {
      disableClose: true,
      width: '60%',
      height: '80%',
      data: {
        formSchemaId: this._formSchemaId,
        formSchema: this._formSchema,
      },
    } as MatDialogConfig;

    this._dialog.open(FormDepsEditor, dialogConfig);
  }

  /**
   * Updates the current imported form schema
   * @param schema The form schema
   */
  private _updateImportedFormSchema(schema: {[key: string]: any}): void {
    if (schema == null) {
      return;
    }
    this._importedFormSchema.next(schema);
  }

  /**
   * Saves the Form Schema
   */
  save(): void {
    this._saveEvt.emit();
  }

  ngOnDestroy() {
    this._saveEvt.complete();
    this._saveSub.unsubscribe();
    this._dialogSub.unsubscribe();
  }
}
