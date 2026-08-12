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
import {FormDepsEditor, RelationshipsWrite} from '@dino/material/form-deps-editor';
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
 * Editor tab positions, in display order.
 * Keep in sync with the <mat-tab> order in edit-form-schema.html.
 */
enum EditorTab {
  Settings = 0,
  Metrics = 1,
  Status = 2,
  Build = 3,
  Relationships = 4,
}

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
   * The currently selected editor tab (see EditorTab for the positions).
   * Set on init: Settings when creating a new Form Schema, Build when editing.
   */
  selectedTabIndex: number = EditorTab.Build;

  /**
   * True while creating a brand new Form Schema (create route, no id).
   * Bound to the form builder [expandSlides] input: a new schema starts with
   * its slides expanded, editing keeps them collapsed.
   */
  private _creating: boolean = false;
  get creating(): boolean {
    return this._creating;
  }

  /**
   * The builder instance the Import button has already been relocated into.
   * Tracked per-instance so the button is re-inserted when the Build tab body
   * is destroyed and rebuilt.
   */
  private _importRelocatedFor: AjfFormBuilder | null = null;

  /**
   * The embedded metrics/relationships editor. It is hosted headlessly next to the
   * tab group and its sections are projected into the Metrics and Relationships
   * tabs, so it is instantiated with the rest of the template — available from the
   * first render, regardless of which tab the user opens. The top Save uses it to
   * persist relationships as part of the form save.
   */
  @ViewChild(FormDepsEditor)
  depsEditor?: FormDepsEditor;

  /**
   * Reference to the embedded Ajf form builder: relocates the "Import" button
   * into the toolbar, before "Download".
   */
  @ViewChild(AjfFormBuilder)
  set formBuilderCmp(cmp: AjfFormBuilder | undefined) {
    if (cmp == null) {
      this._importRelocatedFor = null;
      return;
    }
    // NOTE: this setter runs as soon as the component renders, which is well
    // before the Build tab's DOM exists: <mat-tab> content is instantiated
    // eagerly, but MatTabBody only inserts it into the page when that tab is
    // first activated. When creating a Form Schema the initial tab is Settings,
    // so the builder's markup can stay detached for as long as the user spends
    // filling in the other tabs. Everything below therefore waits for the
    // element it needs via _whenPresent() instead of polling to a deadline.
    if (this._importRelocatedFor !== cmp) {
      // Latched up-front so a second setter call cannot start a duplicate wait;
      // cleared again by _relocateImportButton() if it could not finish.
      this._importRelocatedFor = cmp;
      void this._relocateImportButton(cmp);
    }
  }

  /**
   * Resolves with the first element matching `selector` inside this component, as
   * soon as it exists — immediately when it already does, otherwise once it is
   * inserted. Resolves with `null` only if the component is destroyed first.
   *
   * Deliberately has no attempt/time limit. The elements this is used for belong
   * to the Build tab, whose DOM is attached only when that tab is first opened —
   * arbitrarily long after the builder component itself was created. A bounded
   * retry loop expires in the meantime and then never runs again, which is what
   * used to leave the Import button parked in its hidden span when creating a
   * new Form Schema.
   */
  private _whenPresent(selector: string): Promise<HTMLElement | null> {
    const root = this._el.nativeElement;
    const existing = root.querySelector(selector) as HTMLElement | null;
    if (existing != null) {
      return Promise.resolve(existing);
    }
    if (this._destroyed) {
      return Promise.resolve(null);
    }
    return new Promise<HTMLElement | null>(resolve => {
      let entry: {cancel: () => void};
      const observer = new MutationObserver(() => {
        const found = root.querySelector(selector) as HTMLElement | null;
        if (found != null) {
          finish(found);
        }
      });
      const finish = (el: HTMLElement | null) => {
        observer.disconnect();
        this._pendingWaits.delete(entry);
        resolve(el);
      };
      entry = {cancel: () => finish(null)};
      this._pendingWaits.add(entry);
      observer.observe(root, {childList: true, subtree: true});
    });
  }

  /**
   * Moves the parked "Import" button into the Ajf toolbar, just before the
   * "Download as XLSForm" button (the element right after the toolbar spacer).
   * The Ajf toolbar has no projection slot, so we relocate our own real Angular
   * button (its click binding is preserved by the move). Retries until the
   * async-rendered toolbar and the button are both available.
   */
  private async _relocateImportButton(cmp: AjfFormBuilder): Promise<void> {
    const toolbar = await this._whenPresent('ajf-form-builder .ajf-formbuilder-toolbar');
    // Query the parked button straight from the DOM (not via @ViewChild) so this
    // does not depend on query-resolution timing when the Build tab mounts lazily
    // (e.g. when creating a new schema, where Build is not the initial tab).
    const importEl = toolbar == null ? null : await this._whenPresent('.dino-efs-import-btn');

    if (toolbar == null || importEl == null) {
      // Only reachable when the component was destroyed while waiting. Release the
      // latch so a later builder instance is still handled.
      if (this._importRelocatedFor === cmp) {
        this._importRelocatedFor = null;
      }
      return;
    }

    const downloadBtn = toolbar.querySelector(
      ':scope > .ajf-spacer + button',
    ) as HTMLElement | null;
    if (downloadBtn != null) {
      // Tag the Download button so it can be restyled with a border to match
      // Import (adjacency-based selectors break once Import is inserted here).
      this._renderer.addClass(downloadBtn, 'dino-efs-download-btn');
      this._renderer.insertBefore(toolbar, importEl, downloadBtn);
      return;
    }
    // Toolbar is up but has no Download button to anchor to: at least show Import.
    this._renderer.appendChild(toolbar, importEl);
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

  /**
   * Keeps the "Generate Report" control in sync with whether an automatic report
   * already exists (see the lock set up in the constructor).
   */
  private _autoReportLockSub: Subscription = Subscription.EMPTY;

  private _langs: Lang[] | null = null; // as listed by LangManager at construction time
  private _newLangs: Partial<Lang>[] = []; // to be created when saving the form
  private _patchLangs: Partial<Lang>[] = []; // to be patched when saving the form

  /** Outstanding {@link _whenPresent} waits, cancelled on destroy. */
  private readonly _pendingWaits = new Set<{cancel: () => void}>();

  /** True once destroyed, so {@link _whenPresent} stops waiting for the DOM. */
  private _destroyed = false;

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
      this.selectedTabIndex = this._creating ? EditorTab.Settings : EditorTab.Build;
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

    // "Generate Report" lock. The field stays visible once a report exists (so the
    // state is not silently hidden), but it is pinned to Yes and disabled: nothing
    // here can withdraw an existing automatic report — the user has to delete that
    // report's schema and data, which the field's hint explains.
    //
    // Pinning the value to true does not alter the save path: the auto-report branch
    // at the end of the save subscription already runs whenever `autoReport != null`,
    // irrespective of this control. Disabling is also safe for `fgroup.valid` (which
    // gates Save) because Angular excludes disabled controls from validation, and
    // save() reads the value with formGroup.get(...)?.value, which still returns it.
    this._autoReportLockSub = combineLatest([this.formGroup, this.autoReport]).subscribe(
      ([fg, autoReport]) => {
        const ctrl = fg.get('generateAutoReport');
        if (ctrl == null) {
          return;
        }
        if (autoReport != null) {
          ctrl.setValue(true, {emitEvent: false});
          ctrl.disable({emitEvent: false});
        } else if (ctrl.disabled) {
          // The report was deleted elsewhere: hand the choice back to the user.
          ctrl.enable({emitEvent: false});
        }
        this._cdr.markForCheck();
      },
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
            return obsOf({fs: null, autoReportConfirmation: false, autoReport, depsFailed: false});
          }
          this.isSaving = true;
          const autoReportConfirmation: boolean = formGroup.get('generateAutoReport')?.value;
          const deps = this.depsEditor;
          // The relationships and the schema live in two collections, so there is no
          // transaction to put them in: the order is what decides how bad a partial
          // failure is. Ask first what the relationships actually need.
          const plan$: Observable<RelationshipsWrite> = deps ? deps.pendingWrite() : obsOf('none');

          return plan$.pipe(
            switchMap(plan => {
              // Creating the relationships document is the one case the schema write
              // depends on — it needs the new ref id — so it has to go first. If the
              // schema write then fails, the document is discarded: leaving it would
              // park an unreferenced document on the db, and every retry would add
              // another one, since the schema still has no ref id to load it from.
              if (plan === 'create') {
                return deps!.persistRelationships().pipe(
                  switchMap(depsRefId => {
                    if (depsRefId === null) {
                      // The document was not created, so there is no id to point the
                      // schema at: saving it now would only half-apply what the user
                      // asked for.
                      return obsOf({
                        fs: null,
                        autoReportConfirmation: false,
                        autoReport,
                        depsFailed: true,
                      });
                    }
                    // `undefined` means it turned out there was nothing to write after
                    // all: no id to fold in, and nothing to undo either.
                    return this._writeFormSchema(fs, schema, formGroup, depsRefId).pipe(
                      switchMap(written =>
                        written == null && depsRefId != null
                          ? deps!
                              .discardCreated(depsRefId)
                              .pipe(map(() => null as FormSchema | null))
                          : obsOf(written),
                      ),
                      map(written => ({
                        fs: written,
                        autoReportConfirmation,
                        autoReport,
                        depsFailed: false,
                      })),
                    );
                  }),
                );
              }

              // Nothing to persist, or an existing document to update: either way the
              // schema write needs nothing from it, so the schema goes first. A
              // relationships failure afterwards leaves the schema coherent and the
              // rows still in the tables, so the user can save them again.
              return this._writeFormSchema(fs, schema, formGroup).pipe(
                switchMap(written => {
                  if (written == null || plan === 'none') {
                    return obsOf({
                      fs: written,
                      autoReportConfirmation,
                      autoReport,
                      depsFailed: false,
                    });
                  }
                  return deps!.persistRelationships().pipe(
                    map(depsRefId => ({
                      fs: written,
                      autoReportConfirmation,
                      autoReport,
                      depsFailed: depsRefId === null,
                    })),
                  );
                }),
              );
            }),
          );
        }),
      )
      .subscribe(({fs, autoReportConfirmation, autoReport, depsFailed}) => {
        if (fs == null) {
          // Nothing was saved. Naming the relationships when they are the cause
          // keeps the message from blaming the wrong thing.
          this._snackbar.open(
            depsFailed
              ? 'Oops! The relationships could not be saved, so the Form was not saved either'
              : 'Oops! Something went wrong saving the Form',
            'ERROR',
            {duration: 5000},
          );
          this.isSaving = false;
          return;
        }
        if (depsFailed) {
          // The Form is saved and the relationships are not, so say exactly that and
          // stay on the page: the rows are still in the Relationships tab, and
          // leaving would be the only way to actually lose them.
          this._snackbar.open(
            `"${fs.label}" was saved, but its relationships were not. Open the Relationships tab and save again.`,
            'ERROR',
            {duration: 10000},
          );
          this.isSaving = false;
          return;
        }
        this._snackbar.open(`"${fs.label}" saved`, 'SAVE', {duration: 5000});

        if ((autoReportConfirmation && autoReport == null) || autoReport != null) {
          this._autoReportSchemaGenerationEvt.emit({fs, autoReport});
        } else {
          this._router.navigateByUrl('/forms');
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
    this.selectedTabIndex = EditorTab.Build;
  }

  /**
   * Writes the Form Schema — creating it when there is none yet, patching it
   * otherwise — and reports `null` when the write failed.
   *
   * `depsRefId` is passed only when a relationships document has just been
   * created, so the schema can start pointing at it. An existing document needs
   * nothing: the schema already holds its id.
   *
   * @param fs The stored Form Schema, or null when creating one
   * @param schema The Ajf schema currently held by the builder
   * @param formGroup The editor's form group, holding the schema's attributes
   * @param depsRefId The id of a just-created relationships document
   */
  private _writeFormSchema(
    fs: FormSchema | null,
    schema: {[key: string]: any},
    formGroup: UntypedFormGroup,
    depsRefId?: string,
  ): Observable<FormSchema | null> {
    const unique: boolean | undefined = formGroup.get('uniqueMetricsSet')?.value;
    const formPatch: Partial<InsertModel<FormSchema>> = {
      schema: {...schema, ...(unique ? {uniqueMetricsSet: unique} : undefined)},
      name: formGroup.get('name')?.value,
      label: formGroup.get('label')?.value,
      icon: formGroup.get('icon')?.value,
      form_schema_metrics: formGroup.get('form_schema_metrics')?.value,
      visibility: formGroup.get('visibility')?.value,
      form_status_ref_id: formGroup.get('status')?.value ?? undefined,
    };
    if (depsRefId != null) {
      formPatch.form_schema_deps_ref_id = depsRefId;
    }
    const creating = fs == null;
    const write$ = creating
      ? this._formSchemaManager.create(formPatch as InsertModel<FormSchema>)
      : this._formSchemaManager.patch({...fs, ...formPatch});
    return write$.pipe(
      take(1),
      catchError(err => {
        this._ehms.captureErrorMessage(
          `Could not ${creating ? 'create' : 'patch'} form schema: ${JSON.stringify(err)}`,
          'error',
        );
        return obsOf(null);
      }),
    );
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
    this._autoReportLockSub.unsubscribe();
    this._destroyed = true;
    // _whenPresent() waits have no deadline, so they must be released here.
    this._pendingWaits.forEach(wait => wait.cancel());
    this._pendingWaits.clear();
    this.isSaving = false;
  }
}
