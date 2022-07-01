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
  AjfReport,
  AjfReportInstance,
  AjfReportVariable,
  createReportInstance,
} from '@ajf/core/reports';
import {TranslocoService} from '@ajf/core/transloco';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {InsertModel} from '@dino/core/data';
import {ReportSchema, ReportSchemaManager} from '@dino/core/reports';
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

import {ImportReportSchema} from './import-report-schema';

/**
 * The Report Schema Editor component.
 * Report Schemas can be viewed or edited and saved here.
 */
@Component({
  selector: 'dino-edit-report-schema',
  styleUrls: ['edit-report-schema.scss'],
  templateUrl: 'edit-report-schema.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EditReportSchema implements OnInit, OnDestroy {
  /**
   * List of filtered Material Icons identifiers
   */
  filteredIcons: Observable<string[]> = obsOf([]);

  /**
   * The Ajf Report instance
   */
  reportInstance$: Observable<AjfReportInstance | null>;

  /**
   * Form group for editing the Report Schema attributes
   */
  readonly formGroup: Observable<FormGroup>;

  /**
   * The Report schema id
   */
  private _reportSchemaId: Observable<string | null>;

  /**
   * The Report schema object
   */
  private _reportSchema: Observable<ReportSchema | null>;

  /**
   * The Schema object imported from Xls
   */
  private _importedReportSchema: BehaviorSubject<AjfReport | null> =
    new BehaviorSubject<AjfReport | null>(null);

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
  private _dialogRef?: MatDialogRef<ImportReportSchema>;

  /**
   * Subscribes to the value returned by the MatDialog on its closing event
   */
  private _dialogSub: Subscription = Subscription.EMPTY;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _reportSchemaManager: ReportSchemaManager,
    private _snackbar: MatSnackBar,
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _iconsService: IconsService,
    private _translocoService: TranslocoService,
  ) {
    this._reportSchemaId = this._route.params.pipe(
      map(params => params['report_schema_id']),
      shareReplay(1),
    );

    this._reportSchema = this._reportSchemaId.pipe(
      map(schemaId => {
        if (schemaId == null) {
          return obsOf(null);
        }
        return this._reportSchemaManager.get(schemaId).pipe(
          map(doc => {
            if (doc == null) {
              return null;
            }
            const item = doc.toJSON();
            return item;
          }),
        );
      }),
      switchMap(schema => schema as Observable<ReportSchema>),
      shareReplay(1),
    );

    this.reportInstance$ = combineLatest([this._reportSchema, this._importedReportSchema]).pipe(
      map(([editedSchema, importedSchema]) => {
        if (editedSchema == null && importedSchema == null) {
          return null;
        }
        return createReportInstance(
          importedSchema ?? (editedSchema ? editedSchema.schema : {}),
          {},
          this._translocoService,
        );
      }),
    );

    this.formGroup = this._reportSchema.pipe(
      map(rs =>
        this._formBuilder.group({
          name: [rs ? rs.name : null, Validators.required],
          label: [rs ? rs.label : null, Validators.required],
          icon: [rs ? rs.icon : null],
        }),
      ),
      shareReplay(1),
    );

    this._saveSub = this._saveEvt
      .pipe(
        withLatestFrom(this._reportSchema, this._importedReportSchema, this.formGroup),
        switchMap(([_, reportSchema, importedReportSchema, formGroup]) => {
          if (importedReportSchema == null && reportSchema == null) {
            return obsOf(null);
          }
          const schema = importedReportSchema ?? (reportSchema ? reportSchema.schema : {});
          let form_schema_ids: string[] = [];
          if (importedReportSchema) {
            form_schema_ids = this._extractFormSchemaIds(schema);
          } else {
            form_schema_ids = reportSchema ? reportSchema.form_schema_ids : [];
          }
          const reportPatch: InsertModel<ReportSchema> = {
            schema: schema,
            form_schema_ids: form_schema_ids,
            name: formGroup.get('name')?.value,
            label: formGroup.get('label')?.value,
            icon: formGroup.get('icon')?.value,
            created_at: format(new Date(), 'yyyy-MM-dd'),
          };
          if (reportSchema == null) {
            return this._reportSchemaManager.create(reportPatch).pipe(
              catchError(() => obsOf(null)),
              take(1),
            );
          }
          return this._reportSchemaManager.patch({...reportSchema, ...reportPatch}).pipe(
            catchError(err => {
              console.log(err);
              return obsOf(null);
            }),
            take(1),
          );
        }),
      )
      .subscribe(rs => {
        if (rs != null) {
          this._snackbar.open(`"${rs.label}" saved`, 'SAVE', {duration: 5000});
          this._router.navigateByUrl('/reports');
        } else {
          this._snackbar.open('Oops! Something went wrong saving the Report', 'ERROR', {
            duration: 5000,
          });
        }
      });
  }

  /**
   * Opens the Import Xlsform dialog
   */
  openImportDialog(): void {
    this._dialogRef = this._dialog.open(ImportReportSchema);
    this._dialogSub = this._dialogRef
      .afterClosed()
      .pipe(
        switchMap(rs => rs as Observable<AjfReport | null>),
        map(rs => rs),
        catchError(err => throwError(() => new Error(err)) as Observable<null>),
        take(1),
      )
      .subscribe((reportSchema: AjfReport | null) => {
        if (reportSchema != null) {
          this._updateImportedReportSchema(reportSchema);
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
   * Finds and returns an array of form schema UUIds used
   * by the provided AjfReport as AjfReportVariables
   * @param reportSchema The AjfReport to be checked
   * @returns An array of the found UUIds
   */
  private _extractFormSchemaIds(reportSchema: AjfReport): string[] {
    const formSchemaIds: string[] = [];
    if (reportSchema == null || reportSchema.variables == null) {
      return formSchemaIds;
    }
    const variables: AjfReportVariable[] = reportSchema.variables;
    const regexForm = /(?<=forms\[\')(.*?)(?=\'\])/gi;
    for (let variable of variables) {
      const matches = variable.formula.formula.match(regexForm);
      if (matches != null) {
        formSchemaIds.push(...matches.filter(matchString => this._checkIfValidUUID(matchString)));
      }
    }
    return formSchemaIds;
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
   * Updates the current imported report schema
   * @param schema The report schema
   */
  private _updateImportedReportSchema(schema: AjfReport | null): void {
    if (schema == null) {
      return;
    }
    this._importedReportSchema.next(schema);
  }

  /**
   * Checks if a string is valid UUId
   * @param str The string to be checked
   * @returns True if the string is a vaid UUId
   */
  private _checkIfValidUUID(str: string): boolean {
    const regexExp =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    return regexExp.test(str);
  }

  /**
   * Saves the Report Schema
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
