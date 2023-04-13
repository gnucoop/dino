import {AjfFormRenderer, AjfSlideInstance} from '@ajf/core/forms';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {MatStepper} from '@angular/material/stepper';
import {FormStatus} from '@dino/core/forms';
import {BehaviorSubject, combineLatest, Observable, of as obsOf, Subscription} from 'rxjs';
import {
  delay,
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  skipWhile,
  switchMap,
  take,
  withLatestFrom,
} from 'rxjs/operators';
import {PipelineStep} from './pipeline-stepper-step-interface';
/**
 * @title Stepper overview
 */
@Component({
  selector: 'dino-pipeline-stepper',
  templateUrl: 'pipeline-stepper.html',
  styleUrls: ['pipeline-stepper.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class StepperComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
  @Output() position: EventEmitter<number> = new EventEmitter<number>();
  /**
   * If true, the initial position of the stepper has been emitted
   */
  private _startingPositionEmitted: boolean = false;
  @ViewChild(MatStepper) stepper: MatStepper | undefined;

  /**
   * Subscribes to the stepper selection changes, to emit its current position
   */
  private _stepperSelectionSub: Subscription = Subscription.EMPTY;
  /**
   * The stepper Pipeline steps
   */
  private _steps: Observable<PipelineStep[]> = obsOf([]);
  /**
   * The Pipeline current form status
   */
  private _currentFormStatus: BehaviorSubject<FormStatus | null> =
    new BehaviorSubject<FormStatus | null>(null);

  /**
   * True if the stepper follows a pipeline structure and is linked to the form slides
   */
  private _isPipeline: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * The Ajf Form Renderer of the form linked to this stepper
   */
  private _ajfFormRenderer: Observable<AjfFormRenderer | null> = obsOf(null);

  /**
   * The Ajf Form Renderer slide instances
   */
  private _slides: BehaviorSubject<AjfSlideInstance[] | null> = new BehaviorSubject<
    AjfSlideInstance[] | null
  >(null);

  /**
   * The slide index passed by edit form component
   */
  private _ajfFormSliderPageChange: Observable<number | null> = obsOf(null);

  /**
   * The index of the selected Step at initialization
   */
  private _selectedIndex: Observable<number> = obsOf(0);
  get selectedIndex(): Observable<number> {
    return this._selectedIndex;
  }

  constructor() {}

  get steps(): Observable<PipelineStep[]> {
    return this._steps;
  }

  /**
   * If true, the Stepper follows a pipeline structure.
   * The indexes of the steps correspond to the ones of the form slides.
   * Slides can be navigated by clicking on the steps.
   */
  @Input()
  set setIsPipeline(pipe: boolean | null) {
    if (pipe == null) {
      return;
    }
    this._isPipeline.next(pipe);
  }
  get isPipeline(): Observable<boolean> {
    return this._isPipeline;
  }

  @Input()
  set slides(slides: AjfSlideInstance[] | null) {
    if (slides == null) {
      return;
    }
    this._slides.next(slides);
  }

  @Input()
  set ajfFormRenderer(renderer: Observable<AjfFormRenderer | null>) {
    this._ajfFormRenderer = renderer;
    this._ajfFormSliderPageChange = this._slides.pipe(
      skipWhile(slides => slides == null),
      withLatestFrom(this._ajfFormRenderer),
      switchMap(
        ([slides, fr]) =>
          fr?.formSlider.pageScrollFinish.pipe(
            map(() => {
              if (slides == null) {
                return fr.formSlider.currentPage;
              }
              const visibleSlides = slides?.filter(slide => slide.visible);
              const currentSliderSlide = visibleSlides[fr.formSlider.currentPage];
              const currentStepIdx = slides.indexOf(currentSliderSlide);
              return currentStepIdx;
            }),
          ) ?? obsOf(null),
      ),
    );
  }
  get ajfFormRenderer(): Observable<AjfFormRenderer | null> {
    return this._ajfFormRenderer;
  }

  @Input()
  set setCurrentFormStatus(formStatus: FormStatus | null) {
    this._currentFormStatus.next(formStatus);
    if (formStatus == null || formStatus.status_level == null) {
      return;
    }
  }
  get currentFormStatus(): Observable<FormStatus | null> {
    return this._currentFormStatus.asObservable().pipe(shareReplay(1));
  }

  @Input()
  set setStatuses(statuses: FormStatus[] | null) {
    if (statuses == null) {
      return;
    }
    this._steps = this.getStepsFromFormStatuses(statuses);
  }

  /**
   * Generates all the Pipeline Steps based on a form data possible statuses
   *
   * @param statuses All the possible statuses of a form data
   * @returns The generated steps
   */
  getStepsFromFormStatuses(statuses: FormStatus[]): Observable<PipelineStep[]> {
    if (statuses == null || !statuses.length) {
      return obsOf([]);
    }
    return combineLatest([this._currentFormStatus, this._isPipeline]).pipe(
      map(([current, isPipe]) => {
        const steps: PipelineStep[] = [];
        statuses.forEach(status => {
          const sameLevelStep = steps.find(step => step.level === status.status_level);
          if (sameLevelStep == undefined || isPipe) {
            const step: PipelineStep = {
              editable: true,
              label: status.label,
              level: status.status_level,
            };
            steps.push(step);
          } else {
            sameLevelStep.label += ` / ${status.label}`;
            if (current && sameLevelStep.label.includes(current.label)) {
              sameLevelStep.label = current.label;
            }
          }
        });
        return steps;
      }),
    );
  }

  /**
   * Gets the state of the of a single step
   * @param step The pipeline step
   * @returns The step state string
   */
  getStepState(step: PipelineStep): Observable<string> {
    let stepStateLabel = 'locked';
    if (!step) {
      return obsOf(stepStateLabel);
    }
    return this._currentFormStatus.pipe(
      withLatestFrom(this._slides),
      map(([current, slides]) => {
        if (current == null) {
          if (step.level === 0) {
            stepStateLabel = 'edit-writable';
          }
          return stepStateLabel;
        }
        const writableStep = slides == null ? true : slides[step.level]?.visible;
        if (step.level <= current.status_level && writableStep) {
          stepStateLabel = 'done';
        } else if (step.level > current.status_level && writableStep) {
          stepStateLabel = 'edit-writable';
        }

        return stepStateLabel;
      }),
      shareReplay(1),
    );
  }

  ngAfterViewInit() {
    if (this.stepper) {
      this._stepperSelectionSub = this._slides
        .pipe(
          withLatestFrom(this._isPipeline),
          switchMap(([slides, isPipe]) => {
            if (!isPipe) {
              return obsOf(null);
            }
            return (
              this.stepper?.selectionChange.pipe(
                map(evt => {
                  if (slides == null) {
                    return null;
                  }
                  const visibleSlides = slides.filter(slide => slide.visible);
                  const stepperIdx = evt.selectedIndex;
                  return visibleSlides.indexOf(slides[stepperIdx]);
                }),
              ) ?? obsOf(null)
            );
          }),
        )
        .subscribe((idx: number | null) => {
          if (!this._startingPositionEmitted) {
            this._startingPositionEmitted = true;
          }
          if (idx == null) {
            return;
          }
          this.position.emit(idx);
        });
    }

    this._selectedIndex = this._isPipeline.pipe(
      switchMap(isPipe => {
        if (isPipe) {
          return combineLatest([
            this.currentFormStatus.pipe(filter(st => st != null)),
            this._ajfFormSliderPageChange.pipe(distinctUntilChanged()),
          ]).pipe(
            delay(100),
            map(([currentStatus, ajfSlideIndex]) => {
              if (ajfSlideIndex != null) {
                return ajfSlideIndex;
              } else if (currentStatus != null) {
                return currentStatus.status_level;
              }
              return 0;
            }),
          );
        }
        return this.currentFormStatus.pipe(
          filter(st => st != null),
          map(cst => cst?.status_level ?? 0),
        );
      }),
    );

    this.stepper?._animationDone.pipe(take(1)).subscribe(() => {
      this._scrollOnTheRight();
    });
  }

  ngAfterViewChecked(): void {
    this._emitStartingPosition();
  }

  /**
   * Emits the starting position (based on the current Status) of the pipeline
   */
  private _emitStartingPosition(): void {
    combineLatest([this._isPipeline, this._slides])
      .pipe(take(1))
      .subscribe(([isPipeline, slides]) => {
        if (this._startingPositionEmitted || isPipeline != true || slides == null) {
          return;
        }
        const visibleSlides = slides.filter(slide => slide.visible);

        this.position.emit(visibleSlides.length - 1 >= 0 ? visibleSlides.length - 1 : 0);
      });
  }

  /**
   * Scrolls the pipeline stepper to the selected Step position,
   * so that it becomes the first visible step (when needed).
   */
  private _scrollOnTheRight(): void {
    const stepper = document.getElementsByClassName('dino-pipeline-stepper');
    const selectedStep = document.querySelector(
      '.dino-pipeline-stepper .mat-step-header .mat-step-icon-selected',
    );
    if (stepper && stepper.length && selectedStep) {
      const posStepper = stepper[0].getBoundingClientRect();
      const posStep = selectedStep.getBoundingClientRect();
      stepper[0].scrollLeft = posStep.x - posStepper.x - 10;
    }
  }

  ngOnDestroy() {
    this._stepperSelectionSub.unsubscribe();
  }
}
