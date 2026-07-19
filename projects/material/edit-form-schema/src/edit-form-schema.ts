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
import {
  AjfFormBuilder,
  AjfFormBuilderService,
  AjfFormBuilderValidation,
} from '@ajf/material/form-builder';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
  isDevMode,
} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {ActiveMetric, InsertModel, MetricsService} from '@dino/core/data';
import {
  FormSchema,
  FormSchemaManager,
  FormSchemaVisibility,
  FormStatus,
  FormStatusManager,
} from '@dino/core/forms';
import {Lang, LangManager} from '@dino/core/langs';
import {FormDepsEditor} from '@dino/material/form-deps-editor';
import {IconsService} from '@dino/material/icons-service';
import {format} from 'date-fns';
import {FormStatusEditor} from '@dino/material/form-status-editor';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of as obsOf,
  Subscription,
  throwError,
  timer,
} from 'rxjs';
import {
  catchError,
  map,
  shareReplay,
  startWith,
  switchMap,
  take,
  withLatestFrom,
} from 'rxjs/operators';

import {ImportFormSchema} from './import-form-schema';
import {TranslocoService} from '@ngneat/transloco';
import {Translations} from './form-schema-translation-interface';
import {ErrorHandlerMessageService} from '@dino/core/error-handler';
import {ReportData, ReportDataManager, ReportSchema, ReportSchemaManager} from '@dino/core/reports';
import {automaticReport} from '@ajf/core/reports';
import {UserDataManager} from '@dino/core/users';
import {RxDocument} from 'rxdb';
import {FormSchemaNameMatchValidator} from './form-schema-name-validator';

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
   * All the available active metrics.
   */
  availableMetrics: BehaviorSubject<ActiveMetric[]>;

  /**
   * List of filtered Material Icons identifiers
   */
  filteredIcons: Observable<string[]> = obsOf([]);

  /**
   * The Auto Report associated with the Form Schema (if it exists)
   */
  autoReport: Observable<RxDocument<ReportSchema> | null>;

  /**
   * Form group for editing the Form Schema attributes
   */
  readonly formGroup: Observable<UntypedFormGroup>;

  /**
   * The Ajf Form built from the Form Schema
   */
  readonly form: Observable<AjfForm | null>;

  /**
   * True if you are creating a new form
   */
  readonly isCreation: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  /**
   * The currently selected editor tab.
   * 0 = Settings (form metadata), 1 = Build (the Ajf form builder canvas).
   * Set on init: Settings when creating a new Form Schema, Build when editing.
   */
  selectedTabIndex: number = 1;

  /**
   * True while creating a brand new Form Schema (create route, no id).
   */
  private _creating: boolean = false;

  /**
   * The builder instance the default expansion has already been applied to.
   * Tracked per-instance (not a one-time boolean) so the default is re-applied
   * whenever the builder is re-created, e.g. when the Build tab body is
   * destroyed and rebuilt on tab switch.
   */
  private _expandAppliedFor: AjfFormBuilder | null = null;

  /**
   * The builder instance the Import button has already been relocated into.
   * Tracked per-instance so the button is re-inserted when the Build tab body
   * is destroyed and rebuilt.
   */
  private _importRelocatedFor: AjfFormBuilder | null = null;

  /**
   * The "Import" button, rendered parked (hidden) in the template and moved into
   * the Ajf toolbar (before "Download as XLSForm") once the builder mounts.
   */
  @ViewChild('importBtn', {read: ElementRef})
  importBtn?: ElementRef<HTMLElement>;

  /**
   * The embedded relationships editor (Relationships tab). Present only once that
   * tab has been opened (kept alive via the tab group's preserveContent). The top
   * Save uses it to persist relationships as part of the form save.
   */
  @ViewChild(FormDepsEditor)
  depsEditor?: FormDepsEditor;

  /**
   * Reference to the embedded Ajf form builder.
   * - Always: relocate the "Import" button into the toolbar before "Download".
   * - For a NEW schema only: expand the slides by default and turn the toolbar
   *   "expand slides" toggle ON so it matches. `expandAll()` also sets the
   *   builder's default expanded state, so slides added later stay expanded.
   *   Editing keeps the default (collapsed, toggle off).
   */
  @ViewChild(AjfFormBuilder)
  set formBuilderCmp(cmp: AjfFormBuilder | undefined) {
    if (cmp == null) {
      this._expandAppliedFor = null;
      this._importRelocatedFor = null;
      return;
    }
    if (this._importRelocatedFor !== cmp) {
      this._importRelocatedFor = cmp;
      this._relocateImportButton();
    }
    if (this._creating && this._expandAppliedFor !== cmp) {
      this._expandAppliedFor = cmp;
      // Expand slides by default (and for slides added later). This is the source
      // of truth and does not depend on the DOM being rendered yet.
      cmp.expandAll();
      // Reflect the expanded state on the toolbar toggle, which is uncontrolled
      // (the Ajf builder exposes no "checked" input for it). The toolbar renders a
      // tick after the builder mounts, so retry until the toggle button exists.
      this._syncExpandToggle();
    }
  }

  /**
   * Turns the Ajf builder toolbar "expand slides" toggle ON to match the
   * default-expanded state, retrying until the (async-rendered) toggle exists.
   */
  private _syncExpandToggle(attempt: number = 0): void {
    const toggle = this._el.nativeElement.querySelector(
      'ajf-form-builder mat-slide-toggle button',
    ) as HTMLElement | null;
    if (toggle != null) {
      if (toggle.getAttribute('aria-checked') !== 'true') {
        toggle.click();
      }
      return;
    }
    if (attempt < 20) {
      setTimeout(() => this._syncExpandToggle(attempt + 1), 50);
    }
  }

  /**
   * Moves the parked "Import" button into the Ajf toolbar, just before the
   * "Download as XLSForm" button (the element right after the toolbar spacer).
   * The Ajf toolbar has no projection slot, so we relocate our own real Angular
   * button (its click binding is preserved by the move). Retries until the
   * async-rendered toolbar and the button are both available.
   */
  private _relocateImportButton(attempt: number = 0): void {
    const toolbar = this._el.nativeElement.querySelector(
      'ajf-form-builder .ajf-formbuilder-toolbar',
    ) as HTMLElement | null;
    const importEl = this.importBtn?.nativeElement;
    if (toolbar != null && importEl != null) {
      const downloadBtn = toolbar.querySelector(
        ':scope > .ajf-spacer + button',
      ) as HTMLElement | null;
      if (downloadBtn != null) {
        // Tag the Download button so it can be restyled with a border to match
        // Import (adjacency-based selectors break once Import is inserted here).
        this._renderer.addClass(downloadBtn, 'dino-efs-download-btn');
        this._renderer.insertBefore(toolbar, importEl, downloadBtn);
      } else {
        this._renderer.appendChild(toolbar, importEl);
      }
      return;
    }
    if (attempt < 20) {
      setTimeout(() => this._relocateImportButton(attempt + 1), 50);
    }
  }

  /**
   * The Form schema id
   */
  private _formSchemaId: Observable<string | null>;

  /**
   * The Form schema object.
   * `protected` so the template can bind it to the embedded relationships editor.
   */
  protected _formSchema: Observable<FormSchema | null>;

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
   * While true, the Form Schema save button is disabled
   */
  isSaving: boolean = false;

  /**
   * True if no validation errors are encountered in the AjfFormBuilder
   */
  isAjfFormSchemaValid: boolean = true;

  /**
   * Emits when an Auto Report Schema should be generated
   */
  private _autoReportSchemaGenerationEvt: EventEmitter<{
    fs: FormSchema;
    autoReport: ReportSchema | null;
  }> = new EventEmitter<{fs: FormSchema; autoReport: ReportSchema | null}>();

  /**
   * Emits when an Auto Report Data should be generated
   */
  private _autoReportDataGenerationEvt: EventEmitter<ReportSchema> =
    new EventEmitter<ReportSchema>();

  /**
   * Auto Report Schema generation subscription
   */
  private _autoReportSchemaSub: Subscription = Subscription.EMPTY;

  /**
   * Auto Report Data generation subscription
   */
  private _autoReportDataSub: Subscription = Subscription.EMPTY;

  /**
   * Emitted when the Form Status list has been updated
   */
  private _updateStatusListEvt: EventEmitter<void> = new EventEmitter<void>();

  /**
   * The Save subscription
   */
  private _saveSub: Subscription = Subscription.EMPTY;

  /**
   * A reference to the MatDialog that contains the Xlsform Import, Form Status Editor or AutoReport Dialog component
   */
  private _dialogRef?: MatDialogRef<ImportFormSchema | FormStatusEditor>;

  /**
   * Subscribes to the value returned by the Import MatDialog on its closing event
   */
  private _dialogSub: Subscription = Subscription.EMPTY;

  private _langs: Lang[] | null = null; // as listed by LangManager at construction time
  private _newLangs: Partial<Lang>[] = []; // to be created when saving the form
  private _patchLangs: Partial<Lang>[] = []; // to be patched when saving the form

  constructor(
    protected _cdr: ChangeDetectorRef,
    private _el: ElementRef<HTMLElement>,
    private _renderer: Renderer2,
    private _router: Router,
    private _route: ActivatedRoute,
    private _fs: FormSchemaManager,
    private _formBuilderService: AjfFormBuilderService,
    private _formStatusManager: FormStatusManager,
    private _formSchemaManager: FormSchemaManager,
    private _reportSchemaManager: ReportSchemaManager,
    private _reportDataManager: ReportDataManager,
    private _udm: UserDataManager,
    private _snackbar: MatSnackBar,
    private _dialog: MatDialog,
    private _formBuilder: UntypedFormBuilder,
    private _schemaNameValidator: FormSchemaNameMatchValidator,
    private _iconsService: IconsService,
    private _metricService: MetricsService,
    private _ehms: ErrorHandlerMessageService,
    private _ts: TranslocoService,
    private _lm: LangManager,
  ) {
    this._formSchemaId = this._route.params.pipe(
      map(params => params['form_schema_id']),
      shareReplay(1),
    );

    // Default tab: Settings when creating a new Form Schema, Build when editing.
    this._formSchemaId.pipe(take(1)).subscribe(id => {
      this._creating = id == null;
      this.selectedTabIndex = this._creating ? 0 : 1;
      this._cdr.markForCheck();
    });

    this._formSchema = this._formSchemaId.pipe(
      map(schemaId => {
        if (schemaId == null) {
          this.isCreation.next(true);
          return obsOf(null);
        }
        return this._fs.get(schemaId).pipe(
          map(doc => {
            if (doc == null) {
              return null;
            }
            const item = doc.toJSON();
            this.isCreation.next(false);
            return item;
          }),
        );
      }),
      switchMap(schema => schema as Observable<FormSchema>),
      shareReplay(1),
    );

    this.autoReport = this._formSchema.pipe(
      switchMap(fs => {
        if (fs == null) {
          return obsOf(null);
        }
        return this._reportSchemaManager.checkAutoReportExists(fs.name, fs.id);
      }),
      shareReplay(1),
    );

    this.availableFormStatuses = this._updateStatusListEvt.pipe(
      startWith([]),
      switchMap(() =>
        this._formStatusManager
          .list()
          .pipe(map(sts => sts.sort((a, b) => (a.status_level > b.status_level ? 1 : -1)))),
      ),
    );

    this.availableMetrics = this._metricService.activeMetrics;

    this.formGroup = this._formSchema.pipe(
      map(fs => {
        const fg = this._formBuilder.group({
          name: [
            fs ? fs.name : null,
            Validators.required,
            this._schemaNameValidator.nameCheck(this._fs, this._cdr, fs?.name),
          ],
          label: [fs ? fs.label : null, Validators.required],
          icon_set: [
            fs && fs.icon && fs.icon.includes('icon-') ? 'humanitarian' : 'default',
            Validators.required,
          ],
          icon: [fs ? fs.icon : null],
          status: [fs ? fs.form_status_ref_id : null],
          form_schema_metrics: [
            fs && fs.form_schema_metrics && fs.form_schema_metrics.length
              ? fs.form_schema_metrics
              : this._metricService.activeMetrics.value.map(m => m.metricName),
          ],
          visibility: [fs ? fs.visibility : FormSchemaVisibility.Private, Validators.required],
          uniqueMetricsSet: [
            fs && fs.schema.uniqueMetricsSet ? fs.schema.uniqueMetricsSet : false,
            Validators.required,
          ],
          generateAutoReport: [false, Validators.required],
        });
        fg.updateValueAndValidity({onlySelf: false, emitEvent: true});
        return fg;
      }),
      shareReplay(1),
    );

    this.form = combineLatest([
      this._formSchema,
      this._importedFormSchema,
      this._formSchemaId,
    ]).pipe(
      map(([fs, ifs, id]) => {
        let schema = {} as any;
        if (ifs != null) {
          schema = ifs;
        } else if (fs != null) {
          schema = fs.schema;
        } else if (id == null) {
          // Creating a new Form Schema: start with a first slide already present.
          schema = this._defaultCreationSchema();
        }
        return AjfFormSerializer.fromJson(JSON.parse(JSON.stringify(schema)));
      }),
      shareReplay(1),
    );

    this._saveSub = this._saveEvt
      .pipe(
        withLatestFrom(
          this._formSchema,
          this._formBuilderService.getCurrentForm(),
          this.formGroup,
          this.autoReport,
        ),
        switchMap(([_evt, fs, schema, formGroup, autoReport]) => {
          if (schema == null) {
            return obsOf({fs: null, autoReportConfirmation: false, autoReport});
          }
          this.isSaving = true;
          // Persist relationships first (only if the Relationships tab was opened).
          // Returns the deps ref id (string), undefined (nothing to persist) or
          // null (failure).
          const depsRefId$: Observable<string | null | undefined> = this.depsEditor
            ? this.depsEditor.persistRelationships()
            : obsOf(undefined);
          return depsRefId$.pipe(
            switchMap(depsRefId => {
              if (depsRefId === null) {
                // Relationship persistence failed: abort the whole save.
                return obsOf({fs: null, autoReportConfirmation: false, autoReport});
              }
              const autoReportConfirmation: boolean = formGroup.get('generateAutoReport')?.value;
              const unique: boolean | undefined = formGroup.get('uniqueMetricsSet')?.value;
              const patchSchema = {
                ...schema,
                ...(unique ? {uniqueMetricsSet: unique} : undefined),
              };
              const formPatch: Partial<InsertModel<FormSchema>> = {
                schema: patchSchema,
                name: formGroup.get('name')?.value,
                label: formGroup.get('label')?.value,
                icon: formGroup.get('icon')?.value,
                form_schema_metrics: formGroup.get('form_schema_metrics')?.value,
                visibility: formGroup.get('visibility')?.value,
                form_status_ref_id: formGroup.get('status')?.value ?? undefined,
              };
              // Fold in the relationships ref id when it was (re)created; when
              // undefined, leave the schema's existing value untouched.
              if (depsRefId != null) {
                formPatch.form_schema_deps_ref_id = depsRefId;
              }

              if (fs == null) {
                return this._formSchemaManager.create(formPatch as InsertModel<FormSchema>).pipe(
                  map(fs => ({fs, autoReportConfirmation, autoReport})),
                  catchError(err => {
                    this._ehms.captureErrorMessage(
                      `Could not create form schema: ${JSON.stringify(err)}`,
                      'error',
                    );
                    return obsOf({fs: null, autoReportConfirmation: false, autoReport});
                  }),
                  take(1),
                );
              }
              return this._formSchemaManager.patch({...fs, ...formPatch}).pipe(
                map(fs => ({fs, autoReportConfirmation, autoReport})),
                catchError(err => {
                  this._ehms.captureErrorMessage(
                    `Could not patch form schema: ${JSON.stringify(err)}`,
                    'error',
                  );
                  return obsOf({fs: null, autoReportConfirmation: false, autoReport});
                }),
                take(1),
              );
            }),
          );
        }),
      )
      .subscribe(({fs, autoReportConfirmation, autoReport}) => {
        if (fs != null) {
          this._snackbar.open(`"${fs.label}" saved`, 'SAVE', {duration: 5000});

          if ((autoReportConfirmation && autoReport == null) || autoReport != null) {
            this._autoReportSchemaGenerationEvt.emit({fs, autoReport});
          } else {
            this._router.navigateByUrl('/forms');
          }
        } else {
          this._snackbar.open('Oops! Something went wrong saving the Form', 'ERROR', {
            duration: 5000,
          });
          this.isSaving = false;
        }
      });

    this._autoReportSchemaSub = this._autoReportSchemaGenerationEvt
      .pipe(
        switchMap(autoReportObj => {
          const autoReportGen = this._generateAutoReportSchema(autoReportObj.fs);
          const autoReport = autoReportObj.autoReport;
          const reportSchemaObs =
            autoReport != null
              ? this._reportSchemaManager.patch({...autoReportGen, id: autoReport.id})
              : this._reportSchemaManager.create(autoReportGen);

          return reportSchemaObs.pipe(
            catchError(err => {
              this._ehms.captureErrorMessage(
                `Could not create report schema: ${JSON.stringify(err)}`,
                'error',
              );
              this.isSaving = false;
              return obsOf(null);
            }),
          );
        }),
      )
      .subscribe(reportSchema => {
        if (reportSchema != null) {
          this._autoReportDataGenerationEvt.emit(reportSchema);
        } else {
          this.isSaving = false;
          this._router.navigateByUrl('/forms');
        }
      });

    this._autoReportDataSub = this._autoReportDataGenerationEvt
      .pipe(
        // delay(3000),
        switchMap(rs => {
          if (rs == null) {
            return obsOf(null);
          }
          return combineLatest([
            this._udm.getActiveUserData(),
            this._reportDataManager.checkOneReportDataExists(rs.id),
          ]).pipe(
            switchMap(([userData, reportDataExists]) => {
              if (reportDataExists) {
                return obsOf(null);
              }
              let newItem: {[key: string]: any} = {
                report_schema_ref_id: rs.id,
                user_data_ref_id: userData?.id,
                area_ref_id: null,
                case_ref_id: null,
                location_ref_id: null,
                organization_ref_id: null,
                project_ref_id: null,
                metadata: {},
                date_start: null,
                date_end: null,
                created_at: format(new Date(), 'yyyy-MM-dd'),
              };
              return timer(3000).pipe(
                switchMap(() => this._reportDataManager.create(newItem as ReportData)),
              );
            }),
          );
        }),
      )
      .subscribe(() => {
        this.isSaving = false;
        this._router.navigateByUrl('/forms');
      });

    this._lm
      .list()
      .pipe(take(1))
      .subscribe(langs => {
        this._langs = langs.map(l => l.toJSON());
      });
  }

  ngOnInit() {
    const iconSetValueChanges = this.formGroup.pipe(
      switchMap(fg => fg.get('icon_set')!.valueChanges.pipe(startWith(fg.get('icon_set')?.value))),
    );
    const iconValueChanges = this.formGroup.pipe(switchMap(fg => fg.get('icon')!.valueChanges));
    this.filteredIcons = combineLatest([iconSetValueChanges, iconValueChanges]).pipe(
      withLatestFrom(this._iconsService.getIcons(), this._iconsService.getHumanitarianIcons()),
      map(([[iconSetValue, iconValue], availableIcons, availableHumanitarianIcons]) => {
        if (iconValue == null || iconSetValue == null) {
          return [];
        }
        return this._filterIcons(
          iconSetValue === 'default' ? availableIcons : availableHumanitarianIcons,
          iconValue,
        );
      }),
    );
  }

  private _generateAutoReportSchema(fs: FormSchema): InsertModel<ReportSchema> {
    return {
      schema: automaticReport(fs),
      form_schema_ids: [fs.id],
      name: `${fs.name}_auto_report`,
      label: `${fs.label} Auto Report`,
      icon: fs.icon,
      created_at: format(new Date(), 'yyyy-MM-dd'),
    };
  }

  /**
   * Filters the list of Material Icons
   * @param code The icon code identifier
   * @returns The list of filtered icons
   */
  private _filterIcons(icons: string[], code: string): string[] {
    const filterValue = code.toLowerCase();
    return icons.filter(icon =>
      icon
        .toLowerCase()
        .replace('_', ' ')
        .replace('icon-', '')
        .replace('-', ' ')
        .includes(filterValue),
    ) as string[];
  }

  /**
   * Switches the editor to the Build tab.
   */
  goToBuild(): void {
    this.selectedTabIndex = 1;
  }

  /**
   * The schema used when creating a brand new Form Schema:
   * an empty form that already contains a first slide, ready to be filled.
   */
  private _defaultCreationSchema(): {[key: string]: any} {
    return {
      nodes: [
        {
          id: 1,
          name: 'slide_1',
          label: 'Slide 1',
          nodes: [],
          parent: 0,
          nodeType: 3, // AjfNodeType.AjfSlide
          parentNode: 0,
          visibility: {condition: 'true'},
          conditionalBranches: [{condition: 'true'}],
        },
      ],
    };
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

  openStatusEditor(action: 'Edit' | 'Create', status?: FormStatus): void {
    this._dialogRef = this._dialog.open(FormStatusEditor, {
      data: {
        statusItem: status,
        statusAction: action,
      },
    });
    this._dialogSub = this._dialogRef
      .afterClosed()
      .pipe(
        catchError(err => throwError(() => err) as Observable<boolean>),
        take(1),
      )
      .subscribe(res => {
        if (res === undefined) {
          return;
        }
        if (res == null) {
          this._snackbar.open(
            `Oops! Something went wrong while saving the Form Status.`,
            'SAVE ERROR',
            {
              duration: 10000,
            },
          );
        } else {
          this._snackbar.open(
            this._ts.translate(`Form Status "{{status}}" saved`, {status: res.label}),
            this._ts.translate('FORM STATUS SAVED'),
            {
              duration: 10000,
            },
          );
        }
        this._updateStatusListEvt.emit();
        this._cdr.detectChanges();
      });
  }

  /**
   * Updates the current imported form schema and extracts its translations
   * @param schema The form schema
   */
  private _updateImportedFormSchema(schema: {[key: string]: any}): void {
    if (schema == null) {
      return;
    }
    this._importedFormSchema.next(schema);

    this._newLangs = [];
    this._patchLangs = [];
    const translations: Translations = schema['translations'];
    if (this._langs == null || translations == null) {
      return;
    }
    for (const langName in translations) {
      const lang = this._langs.find(l => l.name === langName);
      if (lang == null) {
        this._newLangs.push({
          name: langName,
          schema: translations[langName],
        });
      } else {
        this._patchLangs.push({
          id: lang.id,
          schema: {...lang.schema, ...translations[langName]},
        });
      }
    }
  }

  /**
   * Saves the Form Schema and its translations
   */
  save(): void {
    this._saveEvt.emit();

    for (const lang of this._newLangs) {
      this._lm
        .create(lang as Lang)
        .pipe(take(1))
        .subscribe(lang => {
          if (lang) {
            this._ts.setTranslation(lang.schema, lang.name);
            if (isDevMode()) {
              console.log(lang!.name + ' translation created successfully');
            }
          }
        });
    }
    for (const lang of this._patchLangs) {
      this._lm
        .patch(lang as Lang)
        .pipe(take(1))
        .subscribe(lang => {
          if (lang) {
            this._ts.setTranslation(lang.schema, lang.name);
            if (isDevMode()) {
              console.log(lang!.name + ' translation updated successfully');
            }
          }
        });
    }
  }

  /**
   * Called whenever there is an error in form builder
   * @param evt The AjfFormBuilderValidation event
   */
  onFormBuilderValidation(evt: AjfFormBuilderValidation): void {
    let errors: string[] = [];
    let isValid = true;
    if (!evt) {
      this.isAjfFormSchemaValid = true;
    } else {
      Object.keys(evt).forEach(fbEntry => {
        if (evt && evt[fbEntry]) {
          if (evt[fbEntry].errors) {
            errors.push(JSON.stringify(evt[fbEntry].errors));
          }
          isValid = isValid && evt[fbEntry].isValid;
        }
      });

      this.isAjfFormSchemaValid = isValid;
    }
  }

  ngOnDestroy() {
    this._saveEvt.complete();
    this._autoReportSchemaGenerationEvt.complete();
    this._saveSub.unsubscribe();
    this._autoReportSchemaSub.unsubscribe();
    this._autoReportDataSub.unsubscribe();
    this._dialogSub.unsubscribe();
    this.isSaving = false;
  }
}
