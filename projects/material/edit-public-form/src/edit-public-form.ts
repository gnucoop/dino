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
import {AjfFormRenderer} from '@ajf/material/forms';
import {Location} from '@angular/common';
import {UntypedFormGroup} from '@angular/forms';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  isDevMode,
  OnDestroy,
  Output,
  ViewChild,
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
import {filter, map, shareReplay, startWith, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';

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
   * Custom languages to be shown in the survey Language Selector.
   * When undefined, the selector falls back to the Transloco configured languages.
   */
  @Input() customLanguages: string[] | undefined;

  /**
   * Platform logo shown in the "Powered by" footer branding. When unset, the
   * branding line is hidden. Provided by the host app (from environment config).
   */
  @Input() logoUrl?: string;

  /**
   * Platform/product name shown next to the logo ("Powered by <name>").
   */
  @Input() poweredByName = 'Dino';

  /**
   * True if the Form can have one or more null Metrics. When false, every Metric
   * type associated with the Form Schema must be provided in the public Url query
   * params, otherwise the form is not opened. Defaults to false.
   */
  @Input() hasOptionalMetrics: boolean = false;

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
   * True when a required Metric of the Form Schema is missing from the public
   * Url query params. When true the form is not rendered and an error is shown.
   */
  readonly requiredMetricsMissing$: Observable<boolean>;

  /**
   * True if the form has been submitted.
   */
  readonly submitted = new BehaviorSubject<boolean>(false);

  /**
   * The index of the slide (section) currently shown by the Ajf page slider.
   */
  readonly currentSlide$ = new BehaviorSubject<number>(0);

  /**
   * The total number of slides (sections) in the current form.
   */
  readonly slidesNum$: Observable<number>;

  /**
   * True when the currently shown slide has no validation errors (all its
   * mandatory questions are filled). Used to gate the "Avanti" button.
   */
  readonly currentSlideValid$: Observable<boolean>;

  /**
   * Fill percentage (0–100) of the section progress bar: on section n of N the
   * bar fills to n/N, so the first section shows a partial fill and the last
   * section reads 100%.
   */
  readonly progress$: Observable<number>;

  /**
   * True when the current section can still be scrolled down (there is more
   * content below the fold). Drives the "scroll for more" hint.
   */
  readonly showScrollHint$ = new BehaviorSubject<boolean>(false);

  /**
   * The Ajf form renderer instance, used to drive the custom prev/next footer.
   */
  private _formRenderer?: AjfFormRenderer;

  /**
   * The host element of the <ajf-form>, used to observe intra-slide scrolling.
   */
  private _formHost?: HTMLElement;

  /**
   * Subscription to the page slider scroll events.
   */
  private _sliderSub: Subscription = Subscription.EMPTY;

  /**
   * Teardown for the scroll-hint listeners (scroll + resize observers).
   */
  private _scrollHintTeardown: () => void = () => {};

  @ViewChild('formContainer') set formRenderer(fr: AjfFormRenderer | undefined) {
    this._formRenderer = fr;
    this._sliderSub.unsubscribe();
    if (fr && fr.formSlider) {
      this.currentSlide$.next(fr.formSlider.currentPage ?? 0);
      this._sliderSub = fr.formSlider.pageScrollFinish.subscribe(() => {
        this.currentSlide$.next(fr.formSlider.currentPage ?? 0);
        this._cdr.markForCheck();
        // Content and scroll extent change when the section changes.
        this._recomputeScrollHint();
      });
      this._triggerInitialValidation();
    }
  }

  @ViewChild('formContainer', {read: ElementRef}) set formContainerEl(
    ref: ElementRef<HTMLElement> | undefined,
  ) {
    // Re-created whenever the form rebuilds (e.g. language change): tear down
    // the previous listeners and wire up the new DOM.
    this._scrollHintTeardown();
    this._scrollHintTeardown = () => {};
    this._formHost = ref?.nativeElement;
    if (this._formHost) {
      this._setupScrollHint(this._formHost);
    } else {
      this.showScrollHint$.next(false);
    }
  }

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
    private frs: AjfFormRendererService,
    ts: TranslocoService,
    private _cdr: ChangeDetectorRef,
  ) {
    this._loadLangsSub = lm.loadLangs().subscribe();
    this.slidesNum$ = frs.slidesNum;

    // The current slide is invalid when its 1-based position is in the list of
    // slide positions with errors (AjfFormRendererService.errorPositions).
    // `currentSlide$` is the 0-based page index, hence the +1.
    this.currentSlideValid$ = combineLatest([
      this.currentSlide$,
      frs.errorPositions.pipe(startWith([] as number[])),
    ]).pipe(
      map(([current, positions]) => !(positions || []).includes(current + 1)),
      shareReplay(1),
    );

    this.progress$ = combineLatest([this.currentSlide$, this.slidesNum$]).pipe(
      map(([current, total]) =>
        total > 0 ? Math.min(100, Math.round(((current + 1) / total) * 100)) : 0,
      ),
      shareReplay(1),
    );

    // Populate the survey language selector with the app's configured languages.
    // Without this the selector falls back to a single default language and the
    // user cannot switch back once they change it.
    if (this.customLanguages == null) {
      this.customLanguages = (ts.getAvailableLangs() as (string | {id: string})[]).map(lang =>
        typeof lang === 'string' ? lang : lang.id,
      );
    }

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

    this.form = combineLatest([
      this.formSchema,
      anonymousUserData,
      metricParams,
      ts.langChanges$,
    ]).pipe(
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

    // The public form must open only if every required Metric is present in the
    // Url. When Metrics are optional (hasOptionalMetrics) none are required.
    this.requiredMetricsMissing$ = combineLatest([this.formSchema, metricParams]).pipe(
      map(([fschema, metricIds]) => {
        if (fschema == null || this.hasOptionalMetrics) {
          return false;
        }
        const requiredMetrics = fschema.form_schema_metrics ?? [];
        return requiredMetrics.some(metric => metricIds[metric] == null);
      }),
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
          // Anonymous/public users can insert form_data but only have `select` permission on `id`.
          return formDataManagerInit.pipe(
            switchMap(() =>
              fdm
                .create(form, ['id'])
                .pipe(map(res => (res != null ? ({...form, ...res} as FormData) : null))),
            ),
          );
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

  /**
   * Forces one validation pass on the form as soon as it is rendered.
   *
   * AjfFormRendererService only emits validation state (`errors` /
   * `errorPositions`) after the first form value change, so on a fresh load the
   * "Forward"/"Send" buttons would stay enabled even with empty mandatory fields
   * — the gating would only start working after the user edits a field. Once the
   * form view exists we re-run the form group's validity (deferred so our async
   * pipes are already subscribed and don't miss the emission), which makes empty
   * mandatory fields disable the buttons from the very start.
   */
  private _triggerInitialValidation(): void {
    setTimeout(() => {
      this.frs.formGroup
        .pipe(
          filter((fg): fg is UntypedFormGroup => fg != null),
          take(1),
        )
        .subscribe(fg => fg.updateValueAndValidity());
    });
  }

  /**
   * Navigates to the next slide (section) of the form.
   */
  nextSlide(): void {
    this._formRenderer?.formSlider.slide({dir: 'forward'});
  }

  /**
   * Navigates to the previous slide (section) of the form.
   */
  prevSlide(): void {
    this._formRenderer?.formSlider.slide({dir: 'back'});
  }

  /**
   * Scrolls the current section down by roughly one viewport when the user
   * clicks the "scroll for more" hint.
   */
  scrollDown(): void {
    const el = this._activeScroller();
    if (el) {
      el.scrollBy({top: Math.round(el.clientHeight * 0.8), behavior: 'smooth'});
    }
  }

  /**
   * Wires up the scroll-hint detection on the given <ajf-form> host element:
   * a capture-phase scroll listener (catches whichever descendant scrolls) and
   * a ResizeObserver (content height changes as the form is filled).
   */
  private _setupScrollHint(host: HTMLElement): void {
    const onScroll = () => this._recomputeScrollHint();
    host.addEventListener('scroll', onScroll, true);

    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => this._recomputeScrollHint());
      ro.observe(host);
    }

    this._scrollHintTeardown = () => {
      host.removeEventListener('scroll', onScroll, true);
      ro?.disconnect();
    };

    // Initial evaluation once the slide content has laid out.
    setTimeout(() => this._recomputeScrollHint(), 0);
  }

  /**
   * Returns the DOM element that natively scrolls the current section, or null.
   * Prefers the visible page-slider-item; falls back to the descendant with the
   * largest vertical overflow.
   */
  private _activeScroller(): HTMLElement | null {
    const host = this._formHost;
    if (!host) {
      return null;
    }
    const items = Array.from(
      host.querySelectorAll<HTMLElement>('ajf-page-slider-item'),
    );
    const current = this._formRenderer?.formSlider?.currentPage ?? 0;
    const candidate = items[current];
    if (candidate && candidate.scrollHeight - candidate.clientHeight > 4) {
      return candidate;
    }
    // Fallback: pick the visible element with the largest scroll overflow.
    let best: HTMLElement | null = null;
    let bestOverflow = 4;
    items.forEach(el => {
      const overflow = el.scrollHeight - el.clientHeight;
      if (overflow > bestOverflow && el.offsetParent !== null) {
        bestOverflow = overflow;
        best = el;
      }
    });
    return best;
  }

  /**
   * Shows the hint when the active section can still be scrolled down.
   */
  private _recomputeScrollHint(): void {
    const el = this._activeScroller();
    const more =
      el != null && el.scrollHeight - el.scrollTop - el.clientHeight > 24;
    if (more !== this.showScrollHint$.value) {
      this.showScrollHint$.next(more);
    }
  }

  ngOnDestroy(): void {
    this._saveFormSub.unsubscribe();
    this._saveValidFormSub.unsubscribe();
    this._loadLangsSub.unsubscribe();
    this._sliderSub.unsubscribe();
    this._scrollHintTeardown();
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
