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

import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import {FormControl, UntypedFormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {
  AjfFieldInstance,
  AjfFieldType,
  AjfNodeCompleteNamePipe,
  AjfNodeType,
  AjfRepeatingSlideInstance,
  AjfSlideInstance,
} from '@ajf/core/forms';
import {AjfFormRenderer} from '@ajf/material/forms';
import {TranslocoService} from '@ngneat/transloco';
import {
  BehaviorSubject,
  combineLatest,
  merge,
  Observable,
  of as obsOf,
  Subscription,
} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  shareReplay,
  startWith,
  switchMap,
  take,
} from 'rxjs/operators';

import {FormProgress, PageRef, SectionView} from './form-data-chrome-section.interface';

/**
 * Navigation/action chrome that wraps an Ajf `<ajf-form>` renderer (projected as
 * content). It hides the Ajf built-in toolbars and drives the form entirely
 * through the renderer's public API: a section select + searchable picker,
 * a repeating-record pager, a "more below" scroll hint, prev/next section FABs
 * and Save actions.
 */
@Component({
  selector: 'dino-form-data-chrome',
  templateUrl: 'form-data-chrome.html',
  styleUrls: ['form-data-chrome.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FormDataChrome implements AfterContentInit, OnDestroy {
  /** The projected `<ajf-form>` renderer instance(s). */
  @ContentChildren(AjfFormRenderer) rendererQuery!: QueryList<AjfFormRenderer>;

  /** The section-picker overlay template. */
  @ViewChild('pickerTpl') pickerTpl!: TemplateRef<unknown>;

  /** Emitted when the user requests a full save. */
  @Output() saveForm = new EventEmitter<void>();
  /** Emitted when the user requests a draft save. */
  @Output() saveDraft = new EventEmitter<void>();

  /** When true, hides the editing affordances (save, add/remove record). */
  @Input() isReadonly: boolean | null = null;
  /** Whether the Save-draft action is available. */
  @Input() allowSaveDraft = false;
  /** Whether the Save-draft action is currently disabled. */
  @Input() saveDraftDisabled: boolean | null = null;

  /** The slide instances of the wrapped form. */
  @Input()
  set slides(slides: AjfSlideInstance[] | null) {
    this._slides$.next(slides ?? null);
  }

  /** Live scroll-hint visibility (mutated outside Angular, then markForCheck). */
  scrollHint = false;

  /** Live search query for the section picker. */
  readonly searchCtrl = new FormControl('');

  readonly sections$: Observable<SectionView[]>;
  readonly pages$: Observable<PageRef[]>;
  readonly currentPage$: Observable<number>;
  readonly currentSectionIndex$: Observable<number>;
  readonly currentSection$: Observable<SectionView | null>;
  readonly currentRep$: Observable<number>;
  readonly errorCount$: Observable<number>;
  readonly hasErrors$: Observable<boolean>;
  readonly filteredSections$: Observable<SectionView[]>;
  readonly progress$: Observable<FormProgress>;

  private readonly _slides$ = new BehaviorSubject<AjfSlideInstance[] | null>(null);
  private readonly _renderer$ = new BehaviorSubject<AjfFormRenderer | null>(null);
  /**
   * The current flattened page index. Updated deterministically on every
   * navigation and kept in sync with the page-slider via `pageScrollFinish`.
   * We do not read `formSlider.currentPage` through a stream at subscribe time
   * because `formSlider` is assigned late (in `<ajf-form>`'s ngAfterViewInit).
   */
  private readonly _currentPage$ = new BehaviorSubject<number>(0);

  private _overlayRef?: OverlayRef;
  private _sliderEl: HTMLElement | null = null;
  private _hintListeners: Array<() => void> = [];
  private _resizeObserver?: ResizeObserver;
  private _rafId = 0;
  private _rendererSub?: Subscription;
  private readonly _subs = new Subscription();
  /** Maps a field instance to its form-group control name. Stateless. */
  private readonly _completeName = new AjfNodeCompleteNamePipe();

  constructor(
    private _host: ElementRef<HTMLElement>,
    private _zone: NgZone,
    private _cdr: ChangeDetectorRef,
    private _overlay: Overlay,
    private _vcr: ViewContainerRef,
    private _snackBar: MatSnackBar,
    private _transloco: TranslocoService,
  ) {
    // Recompute the section model whenever the slide instances change, when the
    // renderer signals a validation change (slide.valid mutates in place), or
    // when a field takes a value — the fill counts below read those values, and
    // nothing in the slide identity changes when one is typed into. Value
    // changes are debounced so a burst of keystrokes costs one recount.
    const tick$ = this._renderer$.pipe(
      switchMap(fr =>
        fr
          ? merge(
              fr.errors,
              fr.formGroup.pipe(
                switchMap(group => (group ? group.valueChanges : obsOf(null))),
                debounceTime(200),
              ),
            ).pipe(startWith(0))
          : obsOf(0),
      ),
      startWith(0),
    );

    const replay = <T>() => shareReplay<T>({bufferSize: 1, refCount: true});

    // Slides come from our own captured renderer (reliable) and fall back to the
    // `[slides]` input. The parent input can stay null when its own
    // `QueryList.changes` never fires for the initial query, so we don't depend
    // on it alone.
    const rendererSlides$ = this._renderer$.pipe(
      switchMap(fr => (fr ? fr.slides : obsOf<AjfSlideInstance[] | null>(null))),
      startWith(null as AjfSlideInstance[] | null),
    );
    const slidesSource$ = combineLatest([this._slides$, rendererSlides$]).pipe(
      map(([fromInput, fromRenderer]) => fromRenderer ?? fromInput ?? null),
    );

    // The live field values live on the form group's controls, not on the field
    // instances, so the fill counts need it alongside the slides.
    const formGroup$ = this._renderer$.pipe(
      switchMap(fr => (fr ? fr.formGroup : obsOf<UntypedFormGroup | null>(null))),
      startWith(null as UntypedFormGroup | null),
    );

    this.sections$ = combineLatest([slidesSource$, formGroup$, tick$]).pipe(
      map(([slides, formGroup]) => this._buildSections(slides, formGroup)),
      replay(),
    );

    this.pages$ = this.sections$.pipe(
      map(sections => this._buildPages(sections)),
      replay(),
    );

    this.currentPage$ = this._currentPage$.pipe(distinctUntilChanged(), replay());

    this.currentSectionIndex$ = combineLatest([this.pages$, this.currentPage$]).pipe(
      map(([pages, cp]) => pages[cp]?.sectionIndex ?? 0),
      distinctUntilChanged(),
      replay(),
    );

    this.currentSection$ = combineLatest([this.sections$, this.currentSectionIndex$]).pipe(
      map(([sections, idx]) => sections[idx] ?? null),
      replay(),
    );

    this.currentRep$ = combineLatest([this.pages$, this.currentPage$]).pipe(
      map(([pages, cp]) => pages[cp]?.rep ?? 0),
      distinctUntilChanged(),
      replay(),
    );

    this.progress$ = this.sections$.pipe(
      map(sections => {
        const fieldCount = sections.reduce((total, s) => total + s.fieldCount, 0);
        const filledCount = sections.reduce((total, s) => total + s.filledCount, 0);
        return {
          fieldCount,
          filledCount,
          filledPercent: fieldCount === 0 ? 0 : Math.round((filledCount / fieldCount) * 100),
          completeCount: sections.filter(s => s.complete).length,
          sectionCount: sections.length,
        };
      }),
      replay(),
    );

    this.errorCount$ = this.sections$.pipe(
      map(sections => sections.filter(s => !s.valid).length),
      distinctUntilChanged(),
      replay(),
    );
    this.hasErrors$ = this.errorCount$.pipe(map(count => count > 0), distinctUntilChanged());

    this.filteredSections$ = combineLatest([
      this.sections$,
      this.searchCtrl.valueChanges.pipe(startWith(this.searchCtrl.value)),
    ]).pipe(
      map(([sections, query]) => {
        const q = (query ?? '').trim().toLowerCase();
        return q ? sections.filter(s => s.label.toLowerCase().includes(q)) : sections;
      }),
    );

    // Attach to the renderer once it (and its late-assigned formSlider) is ready:
    // seed/sync the current page, wire the scroll hint, and recompute the hint
    // after each slide transition.
    this._subs.add(
      this._renderer$.subscribe(fr => {
        this._rendererSub?.unsubscribe();
        this._rendererSub = undefined;
        this._teardownScrollHint();
        if (fr) {
          this._attachToRenderer(fr);
        }
      }),
    );
  }

  /**
   * Waits for the renderer's `formSlider` (assigned in `<ajf-form>`'s
   * ngAfterViewInit) to exist, then seeds `_currentPage$`, subscribes to
   * `pageScrollFinish` for page sync + scroll-hint recompute, and sets up the
   * scroll hint. Retries briefly because content-child resolution can precede
   * the child's view init.
   */
  private _attachToRenderer(fr: AjfFormRenderer, attempt = 0): void {
    if (this._renderer$.value !== fr) {
      return;
    }
    if (!fr.formSlider) {
      if (attempt < 30) {
        setTimeout(() => this._attachToRenderer(fr, attempt + 1), 50);
      }
      return;
    }
    this._currentPage$.next(fr.formSlider.currentPage ?? 0);
    const sub = fr.formSlider.pageScrollFinish.subscribe(() => {
      this._currentPage$.next(fr.formSlider.currentPage ?? 0);
      this._scheduleRecompute();
    });
    this._rendererSub = sub;
    this._subs.add(sub);
    this._setupScrollHint();
  }

  ngAfterContentInit(): void {
    this._subs.add(
      this.rendererQuery.changes.pipe(startWith(null)).subscribe(() => {
        this._renderer$.next(this.rendererQuery.first ?? null);
      }),
    );
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
    this._teardownScrollHint();
    this.closePicker();
  }

  // ---- section navigation --------------------------------------------------

  prevSection(): void {
    this._moveSection(-1);
  }

  nextSection(): void {
    this._moveSection(1);
  }

  jumpToSection(sectionIndex: number): void {
    combineLatest([this._renderer$, this.pages$])
      .pipe(take(1))
      .subscribe(([fr, pages]) => {
        if (!fr) {
          return;
        }
        this._slideTo(fr, pages.findIndex(p => p.sectionIndex === sectionIndex));
      });
    this.closePicker();
  }

  private _moveSection(delta: number): void {
    combineLatest([this._renderer$, this.sections$, this.pages$])
      .pipe(take(1))
      .subscribe(([fr, sections, pages]) => {
        if (!fr || !sections.length) {
          return;
        }
        const current = this._liveSectionIndex(fr, pages);
        const target = Math.min(sections.length - 1, Math.max(0, current + delta));
        this._slideTo(fr, pages.findIndex(p => p.sectionIndex === target));
      });
  }

  /** Navigate the page-slider to `to` and reflect it immediately in state. */
  private _slideTo(fr: AjfFormRenderer, to: number): void {
    if (to < 0 || !fr.formSlider) {
      return;
    }
    fr.formSlider.slide({to});
    this._currentPage$.next(to);
  }

  /** The section index of the page the slider is currently showing (live). */
  private _liveSectionIndex(fr: AjfFormRenderer, pages: PageRef[]): number {
    const cp = fr.formSlider?.currentPage ?? this._currentPage$.value;
    return pages[cp]?.sectionIndex ?? 0;
  }

  // ---- errors / save -------------------------------------------------------

  jumpToFirstError(): void {
    combineLatest([this._renderer$, this.sections$, this.pages$])
      .pipe(take(1))
      .subscribe(([fr, sections, pages]) => this._goToFirstInvalid(fr, sections, pages));
  }

  onSaveForm(): void {
    combineLatest([this._renderer$, this.sections$, this.pages$])
      .pipe(take(1))
      .subscribe(([fr, sections, pages]) => {
        const invalid = sections.filter(s => !s.valid);
        if (invalid.length) {
          this._goToFirstInvalid(fr, sections, pages);
          this._snackBar.open(
            this._transloco.translate('Cannot save, some sections need attention'),
            undefined,
            {duration: 3000, panelClass: 'dino-fdc-toast-error'},
          );
          return;
        }
        this.saveForm.emit();
      });
  }

  private _goToFirstInvalid(
    fr: AjfFormRenderer | null,
    sections: SectionView[],
    pages: PageRef[],
  ): void {
    if (!fr) {
      return;
    }
    // Prefer the exact first invalid field: navigate to its page and scroll it
    // into view within the (hidden-scrollbar) page item.
    const slider =
      this._sliderEl ?? (this._host.nativeElement.querySelector('ajf-page-slider') as HTMLElement | null);
    if (slider) {
      const items = Array.from(
        slider.querySelectorAll('.ajf-page-slider-body > ajf-page-slider-item'),
      ) as HTMLElement[];
      for (let i = 0; i < items.length; i++) {
        const marker = items[i].querySelector('.ajf-invalid-field');
        if (marker) {
          this._slideTo(fr, i);
          const field = (marker.closest('.ajf-field-entry') ?? marker) as HTMLElement;
          const item = items[i];
          this._zone.runOutsideAngular(() =>
            requestAnimationFrame(() =>
              requestAnimationFrame(() => {
                const delta = field.getBoundingClientRect().top - item.getBoundingClientRect().top;
                item.scrollTop = Math.max(0, item.scrollTop + delta - 20);
                this._scheduleRecompute();
              }),
            ),
          );
          return;
        }
      }
    }
    // Fallback: first invalid section (no per-field marker found in the DOM).
    const firstInvalid = sections.find(s => !s.valid);
    if (firstInvalid) {
      this._slideTo(fr, pages.findIndex(p => p.sectionIndex === firstInvalid.index));
    }
  }

  // ---- section picker overlay ---------------------------------------------

  openPicker(): void {
    if (this._overlayRef) {
      return;
    }
    const overlayRef = this._overlay.create({
      hasBackdrop: true,
      backdropClass: 'dino-fdc-picker-backdrop',
      panelClass: 'dino-fdc-picker-pane',
      scrollStrategy: this._overlay.scrollStrategies.block(),
      positionStrategy: this._overlay.position().global().centerHorizontally().top('8vh'),
    });
    this._overlayRef = overlayRef;
    this.searchCtrl.setValue('');
    overlayRef.attach(new TemplatePortal(this.pickerTpl, this._vcr));
    overlayRef.backdropClick().subscribe(() => this.closePicker());
    overlayRef.keydownEvents().subscribe(e => {
      if (e.key === 'Escape') {
        this.closePicker();
      }
    });
  }

  closePicker(): void {
    this._overlayRef?.dispose();
    this._overlayRef = undefined;
  }

  // ---- repeating-record pager ---------------------------------------------

  repeatPrev(): void {
    this._moveRep(-1);
  }

  repeatNext(): void {
    this._moveRep(1);
  }

  jumpToRep(repIndex: number): void {
    combineLatest([this._renderer$, this.sections$, this.pages$])
      .pipe(take(1))
      .subscribe(([fr, sections, pages]) => {
        if (!fr) {
          return;
        }
        const section = this._liveSection(fr, sections, pages);
        if (!section) {
          return;
        }
        const first = pages.findIndex(p => p.sectionIndex === section.index);
        if (first >= 0) {
          this._slideTo(fr, first + repIndex);
        }
      });
  }

  repeatAdd(): void {
    combineLatest([this._renderer$, this.sections$, this.pages$])
      .pipe(take(1))
      .subscribe(([fr, sections, pages]) => {
        if (!fr) {
          return;
        }
        const section = this._liveSection(fr, sections, pages);
        if (!section || !section.isRepeating || !section.canAdd) {
          return;
        }
        // Ajf's renderer appends the repetition and navigates to it itself
        // (slide down), keeping the user inside the repeating section. We must
        // not add our own navigation or the two fight and jump out of section.
        fr.addGroup(section.slide);
      });
  }

  repeatRemove(): void {
    combineLatest([this._renderer$, this.sections$, this.pages$])
      .pipe(take(1))
      .subscribe(([fr, sections, pages]) => {
        if (!fr) {
          return;
        }
        const section = this._liveSection(fr, sections, pages);
        if (
          !section ||
          !section.isRepeating ||
          section.reps <= 1 ||
          section.disableRemoval ||
          !section.canRemove
        ) {
          return;
        }
        const cp = fr.formSlider?.currentPage ?? this._currentPage$.value;
        const rep = pages[cp]?.rep ?? 0;
        // Ajf's renderer removes the repetition and navigates itself (slide up).
        fr.removeGroup(section.slide, rep);
      });
  }

  private _moveRep(delta: number): void {
    combineLatest([this._renderer$, this.sections$, this.pages$])
      .pipe(take(1))
      .subscribe(([fr, sections, pages]) => {
        if (!fr) {
          return;
        }
        const section = this._liveSection(fr, sections, pages);
        if (!section) {
          return;
        }
        const first = pages.findIndex(p => p.sectionIndex === section.index);
        const cp = fr.formSlider?.currentPage ?? this._currentPage$.value;
        const curRep = pages[cp]?.rep ?? 0;
        const targetRep = Math.max(0, Math.min(section.reps - 1, curRep + delta));
        if (first >= 0) {
          this._slideTo(fr, first + targetRep);
        }
      });
  }

  /** The SectionView the slider is currently showing (live current page). */
  private _liveSection(
    fr: AjfFormRenderer,
    sections: SectionView[],
    pages: PageRef[],
  ): SectionView | null {
    return sections[this._liveSectionIndex(fr, pages)] ?? null;
  }

  // ---- scroll hint ---------------------------------------------------------
  // Ajf scrolls a long slide by translating the content wrapper (CSS transform),
  // not native overflow, so we detect "more below" by comparing the on-screen
  // position of the current page's content vs the clipping viewport with
  // getBoundingClientRect — which reflects transform AND native scroll.

  nudgeScroll(): void {
    const item = this._sliderEl ? this._currentItem(this._sliderEl) : null;
    if (item) {
      item.scrollBy({top: item.clientHeight * 0.8, behavior: 'smooth'});
    }
  }

  private _setupScrollHint(): void {
    this._teardownScrollHint();
    const slider = this._host.nativeElement.querySelector('ajf-page-slider') as HTMLElement | null;
    this._sliderEl = slider;
    if (!slider) {
      return;
    }
    this._zone.runOutsideAngular(() => {
      const onEvt = () => this._scheduleRecompute();
      const opts: AddEventListenerOptions = {passive: true, capture: true};
      (['scroll', 'wheel', 'touchmove'] as const).forEach(type => {
        slider.addEventListener(type, onEvt, opts);
        this._hintListeners.push(() => slider.removeEventListener(type, onEvt, opts));
      });
      this._resizeObserver = new ResizeObserver(() => this._scheduleRecompute());
      this._resizeObserver.observe(slider);
      const viewport = slider.querySelector('.ajf-page-slider-content');
      if (viewport) {
        this._resizeObserver.observe(viewport);
      }
      const body = slider.querySelector('.ajf-page-slider-body');
      if (body) {
        this._resizeObserver.observe(body);
      }
    });
    this._scheduleRecompute();
  }

  /**
   * The current page's `ajf-page-slider-item` — the native scroll container
   * (Ajf sets `overflow:auto` on it, with the scrollbar hidden). Its
   * `scrollTop`/`scrollHeight`/`clientHeight` are the real scroll metrics.
   */
  private _currentItem(slider: HTMLElement): HTMLElement | null {
    const items = Array.from(
      slider.querySelectorAll('.ajf-page-slider-body > ajf-page-slider-item'),
    ) as HTMLElement[];
    if (!items.length) {
      return null;
    }
    const idx = Math.max(0, Math.min(items.length - 1, this._currentPage$.value));
    const byIndex = items[idx];
    if (byIndex && this._mostlyInView(byIndex, slider.getBoundingClientRect())) {
      return byIndex;
    }
    // Fallback: the item horizontally centred in the slider viewport.
    const sRect = slider.getBoundingClientRect();
    return items.find(it => this._mostlyInView(it, sRect)) ?? byIndex ?? null;
  }

  private _mostlyInView(el: HTMLElement, rect: DOMRect): boolean {
    const r = el.getBoundingClientRect();
    const overlapX = Math.min(r.right, rect.right) - Math.max(r.left, rect.left);
    return overlapX > rect.width * 0.5;
  }

  private _scheduleRecompute(): void {
    if (this._rafId) {
      return;
    }
    this._rafId = requestAnimationFrame(() => {
      this._rafId = 0;
      this._recompute();
    });
  }

  private _recompute(): void {
    const slider = this._sliderEl;
    let show = false;
    if (slider) {
      const item = this._currentItem(slider);
      if (item) {
        const canScroll = item.scrollHeight - item.clientHeight > 8;
        const atBottom = item.scrollTop + item.clientHeight >= item.scrollHeight - 16;
        show = canScroll && !atBottom;
      }
    }
    if (show !== this.scrollHint) {
      this._zone.run(() => {
        this.scrollHint = show;
        this._cdr.markForCheck();
      });
    }
  }

  private _teardownScrollHint(): void {
    this._hintListeners.forEach(off => off());
    this._hintListeners = [];
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = 0;
    }
    this._sliderEl = null;
  }

  // ---- helpers -------------------------------------------------------------

  range(n: number): number[] {
    const len = Math.max(0, n || 0);
    return Array.from({length: len}, (_, i) => i);
  }

  trackByIndex(index: number): number {
    return index;
  }

  trackBySection(_index: number, section: SectionView): number {
    return section.slide.node.id;
  }

  private _buildSections(
    slides: AjfSlideInstance[] | null,
    formGroup: UntypedFormGroup | null,
  ): SectionView[] {
    const visible = (slides ?? []).filter(s => s.visible);
    return visible.map((slide, i) => {
      const repeating = (slide.node.nodeType as AjfNodeType) === AjfNodeType.AjfRepeatingSlide;
      const rep = repeating ? (slide as unknown as AjfRepeatingSlideInstance) : null;
      const {fieldCount, filledCount} = this._countFields(slide, formGroup);
      return {
        slide,
        index: i,
        label: slide.node.label ?? '',
        number: i + 1,
        valid: slide.valid,
        isRepeating: repeating,
        reps: rep ? Math.max(1, rep.reps ?? 1) : 1,
        canAdd: rep ? rep.canAdd !== false : false,
        canRemove: rep ? rep.canRemove !== false : false,
        disableRemoval: rep ? rep.disableRemoval === true : false,
        fieldCount,
        filledCount,
        complete: fieldCount > 0 && filledCount === fieldCount && slide.valid,
      };
    });
  }

  /**
   * Counts the fields of a slide that the user is expected to fill, and how
   * many of them hold a value.
   *
   * Reads `flatNodes`, which Ajf rebuilds for every slide and which already
   * holds just the field instances, groups recursed into. `slideNodes` looks
   * like the natural source but only repeating slides ever get it assigned, so
   * an ordinary slide reports an empty one.
   *
   * A repeating slide keeps every repetition in `nodes`, so its `flatNodes`
   * spans them all and a section is counted once per repetition.
   *
   * Values are read off the form group: Ajf assigns `instance.value` when the
   * instance is created and leaves it there, so it reports what the form was
   * loaded with rather than what the user has since typed.
   */
  private _countFields(
    slide: AjfSlideInstance,
    formGroup: UntypedFormGroup | null,
  ): {fieldCount: number; filledCount: number} {
    let fieldCount = 0;
    let filledCount = 0;
    (slide.flatNodes ?? []).forEach(node => {
      const field = node as AjfFieldInstance;
      const fieldType = field.node?.fieldType;
      // Non-field nodes have no fieldType. Formatted text holds nothing and
      // formulas fill themselves, so neither is the user's to complete.
      if (
        fieldType == null ||
        !field.visible ||
        fieldType === AjfFieldType.Empty ||
        fieldType === AjfFieldType.Formula
      ) {
        return;
      }
      fieldCount++;
      const name = this._completeName.transform(field);
      const value =
        formGroup != null && formGroup.contains(name)
          ? formGroup.controls[name].value
          : field.value;
      if (this._hasValue(value)) {
        filledCount++;
      }
    });
    return {fieldCount, filledCount};
  }

  /** Whether a field value counts as filled in. `false` and `0` do. */
  private _hasValue(value: unknown): boolean {
    if (value == null || value === '') {
      return false;
    }
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return true;
  }

  private _buildPages(sections: SectionView[]): PageRef[] {
    const pages: PageRef[] = [];
    sections.forEach(section => {
      const count = section.isRepeating ? Math.max(1, section.reps) : 1;
      for (let rep = 0; rep < count; rep++) {
        pages.push({sectionIndex: section.index, rep, reps: count});
      }
    });
    return pages;
  }
}
