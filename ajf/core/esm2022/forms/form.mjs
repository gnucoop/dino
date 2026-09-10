import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, EventEmitter, Input, Output, ViewChild, ViewChildren, } from '@angular/core';
import { Subscription } from 'rxjs';
import { delayWhen, map, startWith, withLatestFrom } from 'rxjs/operators';
import { AjfFormField } from './field';
import { AjfFieldType } from './interface/fields/field-type';
import { isRepeatingSlideInstance } from './utils/nodes-instances/is-repeating-slide-instance';
import { nodeInstanceCompleteName } from './utils/nodes-instances/node-instance-complete-name';
import * as i0 from "@angular/core";
import * as i1 from "./form-renderer";
const _c0 = ["formSlider"];
export class AjfFormRenderer {
    get saveDisabled() {
        return this._saveDisabled;
    }
    set saveDisabled(saveDisabled) {
        this._saveDisabled = coerceBooleanProperty(saveDisabled);
        this._changeDetectorRef.markForCheck();
    }
    get hasStartMessage() {
        return this._hasStartMessage;
    }
    set hasStartMessage(hasStartMessage) {
        this._hasStartMessage = coerceBooleanProperty(hasStartMessage);
        this._changeDetectorRef.markForCheck();
    }
    get hasEndMessage() {
        return this._hasEndMessage;
    }
    set hasEndMessage(hasEndMessage) {
        this._hasEndMessage = coerceBooleanProperty(hasEndMessage);
        this._changeDetectorRef.markForCheck();
    }
    get hideTopToolbar() {
        return this._hideTopToolbar;
    }
    set hideTopToolbar(hideTopToolbar) {
        this._hideTopToolbar = coerceBooleanProperty(hideTopToolbar);
        this._changeDetectorRef.markForCheck();
    }
    get hideBottompToolbar() {
        return this._hideBottomToolbar;
    }
    set hideBottomToolbar(hideBottomToolbar) {
        this._hideBottomToolbar = coerceBooleanProperty(hideBottomToolbar);
        this._changeDetectorRef.markForCheck();
    }
    get hideNavigationButtons() {
        return this._hideNavigationButtons;
    }
    set hideNavigationButtons(hideNavigationButtons) {
        this._hideNavigationButtons = coerceBooleanProperty(hideNavigationButtons);
        this._changeDetectorRef.markForCheck();
    }
    get fixedOrientation() {
        return this._fixedOrientation;
    }
    set fixedOrientation(fixedOrientation) {
        this._fixedOrientation = coerceBooleanProperty(fixedOrientation);
        this._changeDetectorRef.markForCheck();
    }
    get readonly() {
        return this._readonly;
    }
    set readonly(readonly) {
        this._readonly = coerceBooleanProperty(readonly);
        this._changeDetectorRef.markForCheck();
    }
    get orientation() {
        return this._orientation;
    }
    set orientation(orientation) {
        if (orientation !== 'horizontal' && orientation !== 'vertical') {
            return;
        }
        if (orientation !== this._orientation) {
            this._orientation = orientation;
            this._changeDetectorRef.markForCheck();
            this._orientationChange.emit(this._orientation);
        }
    }
    set form(form) {
        this._form = form;
        if (this._init) {
            this._rendererService.setForm(this._form);
        }
    }
    /**
     * this constructor will init current formula by ajfBuilderService
     */
    constructor(_rendererService, _changeDetectorRef) {
        this._rendererService = _rendererService;
        this._changeDetectorRef = _changeDetectorRef;
        /**
         * The available ajf field types.
         */
        this.ajfFieldTypes = AjfFieldType;
        this.title = '';
        this._orientationChange = new EventEmitter();
        this.orientationChange = this
            ._orientationChange;
        this._saveDisabled = false;
        this._hasStartMessage = false;
        this._hasEndMessage = false;
        this._hideTopToolbar = false;
        this._hideBottomToolbar = false;
        this._hideNavigationButtons = false;
        this._fixedOrientation = false;
        this._readonly = false;
        this._orientation = 'horizontal';
        this._errorMoveEvent = new EventEmitter();
        this._init = false;
        this._nextSlideSubscription = Subscription.EMPTY;
        this._errorMoveSubscription = Subscription.EMPTY;
        this._formAction = new EventEmitter();
        this.formAction = this
            ._formAction;
        this.formGroup = _rendererService.formGroup;
        this.slides = _rendererService.nodesTree;
        this._errorPositions = _rendererService.errorPositions;
        this.errors = _rendererService.errors;
        this.slidesNum = _rendererService.slidesNum;
        this.formIsInit = _rendererService.formInitEvent.pipe(map(e => e === 1 /* AjfFormInitStatus.Complete */));
    }
    /**
     * this method will scroll to next error received by subscribe
     */
    goToNextError() {
        this._errorMoveEvent.emit(true);
    }
    /**
     * this method will scroll to prev error received by subscribe
     */
    goToPrevError() {
        this._errorMoveEvent.emit(false);
    }
    /**
     * this method will add group
     */
    addGroup(nodeGroup) {
        let s = this._rendererService
            .addGroup(nodeGroup)
            .pipe(delayWhen(() => this.formSlider.pageScrollFinish))
            .subscribe({
            next: r => {
                if (r && this.formSlider != null) {
                    this.formSlider.slide({ dir: 'down' });
                }
            },
            error: _e => {
                if (s) {
                    s.unsubscribe();
                }
            },
            complete: () => {
                if (s) {
                    s.unsubscribe();
                }
            },
        });
    }
    /**
     * this method will remove group
     */
    removeGroup(nodeGroup, idx) {
        let s = this._rendererService
            .removeGroup(nodeGroup, idx)
            .pipe(delayWhen(() => this.formSlider.pageScrollFinish))
            .subscribe({
            next: r => {
                if (r && this.formSlider != null) {
                    this.formSlider.slide({ dir: 'up' });
                }
            },
            error: _e => {
                if (s) {
                    s.unsubscribe();
                }
            },
            complete: () => {
                if (s) {
                    s.unsubscribe();
                }
            },
        });
    }
    onSave(_evt) {
        this._formAction.emit({
            source: this,
            action: 'save',
            value: this._rendererService.getFormValue(),
        });
    }
    onFormAction(_evt, action) {
        this._formAction.emit({
            source: this,
            value: this._rendererService.getFormValue(),
            action: action,
        });
    }
    /**
     * this method will set current form in rederer service when init form
     */
    ngAfterViewInit() {
        if (this._form != null) {
            this._rendererService.setForm(this._form);
            this._changeDetectorRef.detectChanges();
        }
    }
    ngAfterViewChecked() {
        if (!this._init && this.formSlider != null) {
            this._init = true;
            this._errorMoveSubscription = this._errorMoveEvent
                .pipe(withLatestFrom(this._errorPositions))
                .subscribe(([move, errs]) => {
                const currentPosition = this.formSlider.currentPage - +this.hasStartMessage + 1;
                if (errs == null) {
                    return;
                }
                const errors = errs;
                let found = false;
                let prevIdx = -1;
                let nextIdx = -1;
                let idx = 0;
                let errorsLen = errors.length;
                while (!found && idx < errorsLen) {
                    if (errors[idx] == currentPosition) {
                        found = true;
                        prevIdx = idx > 0 ? idx - 1 : errorsLen - 1;
                        nextIdx = idx < errorsLen - 1 ? idx + 1 : 0;
                    }
                    else if (errors[idx] > currentPosition) {
                        found = true;
                        prevIdx = idx > 0 ? idx - 1 : errorsLen - 1;
                        nextIdx = idx;
                    }
                    idx++;
                }
                if (!found) {
                    prevIdx = errorsLen - 1;
                    nextIdx = 0;
                }
                this.formSlider.slide({
                    to: move ? errors[nextIdx] - 1 : errors[prevIdx] - 1,
                });
                this._changeDetectorRef.detectChanges();
            });
        }
    }
    ngOnDestroy() {
        this._nextSlideSubscription.unsubscribe();
        this._errorMoveSubscription.unsubscribe();
        this._orientationChange.complete();
        this._errorMoveEvent.complete();
        this._formAction.complete();
    }
    scrollToSlide(slide) {
        let scrollToPos = slide.position - 1;
        if (isRepeatingSlideInstance(slide)) {
            scrollToPos = scrollToPos - 1 + slide.reps;
        }
        this.formSlider.slide({ to: scrollToPos });
    }
    /**
     * Return a repeating slide repetition index (eg. 2/5)
     * @param slide The repeating slide
     * @param currentPage The formslider current page number
     * @returns The rep slide index string
     */
    getRepeatingSlideRepIndex(slide, currentPage) {
        return this.formSlider.pageScrollFinish.pipe(startWith(null), map(() => {
            if (isRepeatingSlideInstance(slide)) {
                const repSlide = slide;
                const repsTotal = repSlide.reps;
                let currentRep = repsTotal;
                if (currentPage + 1 >= slide.position && currentPage + 1 < slide.position + repsTotal) {
                    currentRep = currentPage + 2 - slide.position;
                }
                return `(${currentRep}/${repsTotal})`;
            }
            return null;
        }));
    }
    /**
     * True if the slide toggle should be checked
     * @param slide The repeating slide
     * @param currentPage The formslider current page number
     * @returns The checked state
     */
    isSlideToggleChecked(slide, currentPage) {
        let isChecked = slide.position === currentPage + 1;
        if (isRepeatingSlideInstance(slide)) {
            const repSlide = slide;
            isChecked =
                currentPage + 1 >= repSlide.position && repSlide.position + repSlide.reps > currentPage + 1;
        }
        return isChecked;
    }
    orientationChangeHandler(orientation) {
        this.orientation = orientation;
    }
    trackNodeById(_, node) {
        return nodeInstanceCompleteName(node);
    }
    static { this.ɵfac = function AjfFormRenderer_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFormRenderer)(i0.ɵɵdirectiveInject(i1.AjfFormRendererService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AjfFormRenderer, viewQuery: function AjfFormRenderer_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
            i0.ɵɵviewQuery(AjfFormField, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.formSlider = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.fields = _t);
        } }, inputs: { title: "title", saveDisabled: "saveDisabled", hasStartMessage: "hasStartMessage", hasEndMessage: "hasEndMessage", hideTopToolbar: "hideTopToolbar", hideBottomToolbar: "hideBottomToolbar", hideNavigationButtons: "hideNavigationButtons", fixedOrientation: "fixedOrientation", readonly: "readonly", orientation: "orientation", form: "form" }, outputs: { orientationChange: "orientationChange", formAction: "formAction" } }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFormRenderer, [{
        type: Directive
    }], () => [{ type: i1.AjfFormRendererService }, { type: i0.ChangeDetectorRef }], { title: [{
            type: Input
        }], orientationChange: [{
            type: Output
        }], saveDisabled: [{
            type: Input
        }], hasStartMessage: [{
            type: Input
        }], hasEndMessage: [{
            type: Input
        }], hideTopToolbar: [{
            type: Input
        }], hideBottomToolbar: [{
            type: Input
        }], hideNavigationButtons: [{
            type: Input
        }], fixedOrientation: [{
            type: Input
        }], readonly: [{
            type: Input
        }], orientation: [{
            type: Input
        }], formSlider: [{
            type: ViewChild,
            args: ['formSlider', { static: false }]
        }], fields: [{
            type: ViewChildren,
            args: [AjfFormField]
        }], formAction: [{
            type: Output
        }], form: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZm9ybXMvc3JjL2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUJBLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFJTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBRU4sU0FBUyxFQUNULFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQWEsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBR3JDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQU0zRCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxxREFBcUQsQ0FBQztBQUM3RixPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxxREFBcUQsQ0FBQzs7OztBQVM3RixNQUFNLE9BQWdCLGVBQWU7SUE2Qm5DLElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM1QixDQUFDO0lBQ0QsSUFDSSxZQUFZLENBQUMsWUFBcUI7UUFDcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUdELElBQUksZUFBZTtRQUNqQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUMvQixDQUFDO0lBQ0QsSUFDSSxlQUFlLENBQUMsZUFBd0I7UUFDMUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLHFCQUFxQixDQUFDLGVBQWUsQ0FB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QUs7WUFXRixhQUFhO2tCQURoQixLQUFLO1lBV0YsY0FBYztrQkFEakIsS0FBSztZQVdGLGlCQUFpQjtrQkFEcEIsS0FBSztZQVdGLHFCQUFxQjtrQkFEeEIsS0FBSztZQVdGLGdCQUFnQjtrQkFEbkIsS0FBSztZQVdGLFFBQVE7a0JBRFgsS0FBSztZQVdGLFdBQVc7a0JBRGQsS0FBSztZQVlvQyxVQUFVO2tCQUFuRCxTQUFTO21CQUFDLFlBQVksRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7WUFDWixNQUFNO2tCQUFqQyxZQUFZO21CQUFDLFlBQVk7WUFxQmpCLFVBQVU7a0JBRGxCLE1BQU07WUFLSCxJQUFJO2tCQURQLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmUGFnZVNsaWRlciwgQWpmUGFnZVNsaWRlck9yaWVudGF0aW9ufSBmcm9tICdAYWpmL2NvcmUvcGFnZS1zbGlkZXInO1xuaW1wb3J0IHtjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdDaGVja2VkLFxuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDaGlsZHJlbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1VudHlwZWRGb3JtR3JvdXB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGVsYXlXaGVuLCBtYXAsIHN0YXJ0V2l0aCwgd2l0aExhdGVzdEZyb219IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGb3JtRmllbGR9IGZyb20gJy4vZmllbGQnO1xuaW1wb3J0IHtBamZGb3JtSW5pdFN0YXR1cywgQWpmRm9ybVJlbmRlcmVyU2VydmljZX0gZnJvbSAnLi9mb3JtLXJlbmRlcmVyJztcblxuaW1wb3J0IHtBamZGaWVsZFR5cGV9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZC10eXBlJztcbmltcG9ydCB7QWpmRm9ybX0gZnJvbSAnLi9pbnRlcmZhY2UvZm9ybXMvZm9ybSc7XG5pbXBvcnQge0FqZk5vZGVHcm91cEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1ncm91cC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZk5vZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9zbGlkZXMtaW5zdGFuY2VzL3JlcGVhdGluZy1zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlNsaWRlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL3NsaWRlcy1pbnN0YW5jZXMvc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2lzLXJlcGVhdGluZy1zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge25vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZS1jb21wbGV0ZS1uYW1lJztcblxuZXhwb3J0IGludGVyZmFjZSBBamZGb3JtQWN0aW9uRXZlbnQge1xuICBzb3VyY2U6IEFqZkZvcm1SZW5kZXJlcjtcbiAgdmFsdWU6IE9iamVjdDtcbiAgYWN0aW9uOiBzdHJpbmc7XG59XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFqZkZvcm1SZW5kZXJlciBpbXBsZW1lbnRzIEFmdGVyVmlld0NoZWNrZWQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBmb3JtR3JvdXAgaXMgYW4gT2JzZXJ2YWJsZSBGb3JtR3JvdXAgdHlwZVxuICAgKi9cbiAgcmVhZG9ubHkgZm9ybUdyb3VwOiBPYnNlcnZhYmxlPFVudHlwZWRGb3JtR3JvdXAgfCBudWxsPjtcblxuICAvKipcbiAgICogc2xpZGVzIGlzIGFuIG9ic2VydmFibGUgQWpmU2xpZGUgYXJyYXkgdHlwZVxuICAgKi9cbiAgcmVhZG9ubHkgc2xpZGVzOiBPYnNlcnZhYmxlPEFqZlNsaWRlSW5zdGFuY2VbXT47XG5cbiAgcmVhZG9ubHkgc2xpZGVzTnVtOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIHJlYWRvbmx5IGVycm9yczogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICByZWFkb25seSBmb3JtSXNJbml0OiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuXG4gIC8qKlxuICAgKiBUaGUgYXZhaWxhYmxlIGFqZiBmaWVsZCB0eXBlcy5cbiAgICovXG4gIHJlYWRvbmx5IGFqZkZpZWxkVHlwZXMgPSBBamZGaWVsZFR5cGU7XG5cbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZyA9ICcnO1xuXG4gIHByaXZhdGUgX29yaWVudGF0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8QWpmUGFnZVNsaWRlck9yaWVudGF0aW9uPiA9XG4gICAgbmV3IEV2ZW50RW1pdHRlcjxBamZQYWdlU2xpZGVyT3JpZW50YXRpb24+KCk7XG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBvcmllbnRhdGlvbkNoYW5nZTogT2JzZXJ2YWJsZTxBamZQYWdlU2xpZGVyT3JpZW50YXRpb24+ID0gdGhpc1xuICAgIC5fb3JpZW50YXRpb25DaGFuZ2UgYXMgT2JzZXJ2YWJsZTxBamZQYWdlU2xpZGVyT3JpZW50YXRpb24+O1xuXG4gIHByaXZhdGUgX3NhdmVEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXQgc2F2ZURpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zYXZlRGlzYWJsZWQ7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHNhdmVEaXNhYmxlZChzYXZlRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zYXZlRGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoc2F2ZURpc2FibGVkKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhc1N0YXJ0TWVzc2FnZSA9IGZhbHNlO1xuICBnZXQgaGFzU3RhcnRNZXNzYWdlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oYXNTdGFydE1lc3NhZ2U7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGhhc1N0YXJ0TWVzc2FnZShoYXNTdGFydE1lc3NhZ2U6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oYXNTdGFydE1lc3NhZ2UgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoaGFzU3RhcnRNZXNzYWdlKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhc0VuZE1lc3NhZ2UgPSBmYWxzZTtcbiAgZ2V0IGhhc0VuZE1lc3NhZ2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc0VuZE1lc3NhZ2U7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGhhc0VuZE1lc3NhZ2UoaGFzRW5kTWVzc2FnZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2hhc0VuZE1lc3NhZ2UgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoaGFzRW5kTWVzc2FnZSk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9oaWRlVG9wVG9vbGJhciA9IGZhbHNlO1xuICBnZXQgaGlkZVRvcFRvb2xiYXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2hpZGVUb3BUb29sYmFyO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBoaWRlVG9wVG9vbGJhcihoaWRlVG9wVG9vbGJhcjogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZGVUb3BUb29sYmFyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGhpZGVUb3BUb29sYmFyKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hpZGVCb3R0b21Ub29sYmFyID0gZmFsc2U7XG4gIGdldCBoaWRlQm90dG9tcFRvb2xiYXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2hpZGVCb3R0b21Ub29sYmFyO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBoaWRlQm90dG9tVG9vbGJhcihoaWRlQm90dG9tVG9vbGJhcjogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZGVCb3R0b21Ub29sYmFyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGhpZGVCb3R0b21Ub29sYmFyKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hpZGVOYXZpZ2F0aW9uQnV0dG9ucyA9IGZhbHNlO1xuICBnZXQgaGlkZU5hdmlnYXRpb25CdXR0b25zKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oaWRlTmF2aWdhdGlvbkJ1dHRvbnM7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGhpZGVOYXZpZ2F0aW9uQnV0dG9ucyhoaWRlTmF2aWdhdGlvbkJ1dHRvbnM6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlTmF2aWdhdGlvbkJ1dHRvbnMgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoaGlkZU5hdmlnYXRpb25CdXR0b25zKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpeGVkT3JpZW50YXRpb24gPSBmYWxzZTtcbiAgZ2V0IGZpeGVkT3JpZW50YXRpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpeGVkT3JpZW50YXRpb247XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGZpeGVkT3JpZW50YXRpb24oZml4ZWRPcmllbnRhdGlvbjogYm9vbGVhbikge1xuICAgIHRoaXMuX2ZpeGVkT3JpZW50YXRpb24gPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoZml4ZWRPcmllbnRhdGlvbik7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9yZWFkb25seSA9IGZhbHNlO1xuICBnZXQgcmVhZG9ubHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlYWRvbmx5O1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCByZWFkb25seShyZWFkb25seTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlYWRvbmx5ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHJlYWRvbmx5KTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX29yaWVudGF0aW9uOiBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG4gIGdldCBvcmllbnRhdGlvbigpOiBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24ge1xuICAgIHJldHVybiB0aGlzLl9vcmllbnRhdGlvbjtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgb3JpZW50YXRpb24ob3JpZW50YXRpb246IEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbikge1xuICAgIGlmIChvcmllbnRhdGlvbiAhPT0gJ2hvcml6b250YWwnICYmIG9yaWVudGF0aW9uICE9PSAndmVydGljYWwnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChvcmllbnRhdGlvbiAhPT0gdGhpcy5fb3JpZW50YXRpb24pIHtcbiAgICAgIHRoaXMuX29yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIHRoaXMuX29yaWVudGF0aW9uQ2hhbmdlLmVtaXQodGhpcy5fb3JpZW50YXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIEBWaWV3Q2hpbGQoJ2Zvcm1TbGlkZXInLCB7c3RhdGljOiBmYWxzZX0pIGZvcm1TbGlkZXIhOiBBamZQYWdlU2xpZGVyO1xuICBAVmlld0NoaWxkcmVuKEFqZkZvcm1GaWVsZCkgZmllbGRzITogUXVlcnlMaXN0PEFqZkZvcm1GaWVsZD47XG5cbiAgcHJpdmF0ZSBfZXJyb3JNb3ZlRXZlbnQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAvKipcbiAgICogSXMgYSBwcml2YXRlIHN1YmplY3Qgc3RydWN0dXJlIHRoYXQgY29udGFpbnMgbmV4dCBhbmQgcHJldlxuICAgKi9cbiAgcHJpdmF0ZSBfZXJyb3JQb3NpdGlvbnM6IE9ic2VydmFibGU8bnVtYmVyW10+O1xuXG4gIC8qKlxuICAgKiBpcyBhIHByaXZhdGUgQWpmRm9ybVxuICAgKi9cbiAgcHJpdmF0ZSBfZm9ybTogQWpmRm9ybSB8IHVuZGVmaW5lZDtcblxuICBwcml2YXRlIF9pbml0ID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfbmV4dFNsaWRlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2Vycm9yTW92ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2Zvcm1BY3Rpb246IEV2ZW50RW1pdHRlcjxBamZGb3JtQWN0aW9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxBamZGb3JtQWN0aW9uRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBmb3JtQWN0aW9uOiBPYnNlcnZhYmxlPEFqZkZvcm1BY3Rpb25FdmVudD4gPSB0aGlzXG4gICAgLl9mb3JtQWN0aW9uIGFzIE9ic2VydmFibGU8QWpmRm9ybUFjdGlvbkV2ZW50PjtcblxuICBASW5wdXQoKVxuICBzZXQgZm9ybShmb3JtOiBBamZGb3JtKSB7XG4gICAgdGhpcy5fZm9ybSA9IGZvcm07XG5cbiAgICBpZiAodGhpcy5faW5pdCkge1xuICAgICAgdGhpcy5fcmVuZGVyZXJTZXJ2aWNlLnNldEZvcm0odGhpcy5fZm9ybSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgY29uc3RydWN0b3Igd2lsbCBpbml0IGN1cnJlbnQgZm9ybXVsYSBieSBhamZCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXJTZXJ2aWNlOiBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICApIHtcbiAgICB0aGlzLmZvcm1Hcm91cCA9IF9yZW5kZXJlclNlcnZpY2UuZm9ybUdyb3VwO1xuICAgIHRoaXMuc2xpZGVzID0gX3JlbmRlcmVyU2VydmljZS5ub2Rlc1RyZWU7XG4gICAgdGhpcy5fZXJyb3JQb3NpdGlvbnMgPSBfcmVuZGVyZXJTZXJ2aWNlLmVycm9yUG9zaXRpb25zO1xuICAgIHRoaXMuZXJyb3JzID0gX3JlbmRlcmVyU2VydmljZS5lcnJvcnM7XG4gICAgdGhpcy5zbGlkZXNOdW0gPSBfcmVuZGVyZXJTZXJ2aWNlLnNsaWRlc051bTtcbiAgICB0aGlzLmZvcm1Jc0luaXQgPSBfcmVuZGVyZXJTZXJ2aWNlLmZvcm1Jbml0RXZlbnQucGlwZShcbiAgICAgIG1hcChlID0+IGUgPT09IEFqZkZvcm1Jbml0U3RhdHVzLkNvbXBsZXRlKSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgc2Nyb2xsIHRvIG5leHQgZXJyb3IgcmVjZWl2ZWQgYnkgc3Vic2NyaWJlXG4gICAqL1xuICBnb1RvTmV4dEVycm9yKCk6IHZvaWQge1xuICAgIHRoaXMuX2Vycm9yTW92ZUV2ZW50LmVtaXQodHJ1ZSk7XG4gIH1cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgc2Nyb2xsIHRvIHByZXYgZXJyb3IgcmVjZWl2ZWQgYnkgc3Vic2NyaWJlXG4gICAqL1xuICBnb1RvUHJldkVycm9yKCk6IHZvaWQge1xuICAgIHRoaXMuX2Vycm9yTW92ZUV2ZW50LmVtaXQoZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgYWRkIGdyb3VwXG4gICAqL1xuICBhZGRHcm91cChub2RlR3JvdXA6IEFqZk5vZGVHcm91cEluc3RhbmNlIHwgQWpmU2xpZGVJbnN0YW5jZSB8IEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2UpOiB2b2lkIHtcbiAgICBsZXQgcyA9IHRoaXMuX3JlbmRlcmVyU2VydmljZVxuICAgICAgLmFkZEdyb3VwKG5vZGVHcm91cCBhcyBBamZOb2RlR3JvdXBJbnN0YW5jZSlcbiAgICAgIC5waXBlKGRlbGF5V2hlbigoKSA9PiB0aGlzLmZvcm1TbGlkZXIucGFnZVNjcm9sbEZpbmlzaCkpXG4gICAgICAuc3Vic2NyaWJlKHtcbiAgICAgICAgbmV4dDogciA9PiB7XG4gICAgICAgICAgaWYgKHIgJiYgdGhpcy5mb3JtU2xpZGVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybVNsaWRlci5zbGlkZSh7ZGlyOiAnZG93bid9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBfZSA9PiB7XG4gICAgICAgICAgaWYgKHMpIHtcbiAgICAgICAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgaWYgKHMpIHtcbiAgICAgICAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIHJlbW92ZSBncm91cFxuICAgKi9cbiAgcmVtb3ZlR3JvdXAoXG4gICAgbm9kZUdyb3VwOiBBamZOb2RlR3JvdXBJbnN0YW5jZSB8IEFqZlNsaWRlSW5zdGFuY2UgfCBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlLFxuICAgIGlkeD86IG51bWJlclxuICApOiB2b2lkIHtcbiAgICBsZXQgcyA9IHRoaXMuX3JlbmRlcmVyU2VydmljZVxuICAgICAgLnJlbW92ZUdyb3VwKG5vZGVHcm91cCBhcyBBamZOb2RlR3JvdXBJbnN0YW5jZSwgaWR4KVxuICAgICAgLnBpcGUoZGVsYXlXaGVuKCgpID0+IHRoaXMuZm9ybVNsaWRlci5wYWdlU2Nyb2xsRmluaXNoKSlcbiAgICAgIC5zdWJzY3JpYmUoe1xuICAgICAgICBuZXh0OiByID0+IHtcbiAgICAgICAgICBpZiAociAmJiB0aGlzLmZvcm1TbGlkZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5mb3JtU2xpZGVyLnNsaWRlKHtkaXI6ICd1cCd9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBfZSA9PiB7XG4gICAgICAgICAgaWYgKHMpIHtcbiAgICAgICAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgaWYgKHMpIHtcbiAgICAgICAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgfVxuXG4gIG9uU2F2ZShfZXZ0OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9mb3JtQWN0aW9uLmVtaXQoe1xuICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgYWN0aW9uOiAnc2F2ZScsXG4gICAgICB2YWx1ZTogdGhpcy5fcmVuZGVyZXJTZXJ2aWNlLmdldEZvcm1WYWx1ZSgpLFxuICAgIH0pO1xuICB9XG5cbiAgb25Gb3JtQWN0aW9uKF9ldnQ6IGFueSwgYWN0aW9uOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9mb3JtQWN0aW9uLmVtaXQoe1xuICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgdmFsdWU6IHRoaXMuX3JlbmRlcmVyU2VydmljZS5nZXRGb3JtVmFsdWUoKSxcbiAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgc2V0IGN1cnJlbnQgZm9ybSBpbiByZWRlcmVyIHNlcnZpY2Ugd2hlbiBpbml0IGZvcm1cbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZm9ybSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlclNlcnZpY2Uuc2V0Rm9ybSh0aGlzLl9mb3JtKTtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9pbml0ICYmIHRoaXMuZm9ybVNsaWRlciAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9pbml0ID0gdHJ1ZTtcblxuICAgICAgdGhpcy5fZXJyb3JNb3ZlU3Vic2NyaXB0aW9uID0gKDxPYnNlcnZhYmxlPGJvb2xlYW4+PnRoaXMuX2Vycm9yTW92ZUV2ZW50KVxuICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9lcnJvclBvc2l0aW9ucykpXG4gICAgICAgIC5zdWJzY3JpYmUoKFttb3ZlLCBlcnJzXSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnRQb3NpdGlvbiA9IHRoaXMuZm9ybVNsaWRlci5jdXJyZW50UGFnZSAtICt0aGlzLmhhc1N0YXJ0TWVzc2FnZSArIDE7XG4gICAgICAgICAgaWYgKGVycnMgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBlcnJvcnMgPSBlcnJzIGFzIG51bWJlcltdO1xuXG4gICAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgbGV0IHByZXZJZHggPSAtMTtcbiAgICAgICAgICBsZXQgbmV4dElkeCA9IC0xO1xuICAgICAgICAgIGxldCBpZHggPSAwO1xuICAgICAgICAgIGxldCBlcnJvcnNMZW4gPSBlcnJvcnMubGVuZ3RoO1xuICAgICAgICAgIHdoaWxlICghZm91bmQgJiYgaWR4IDwgZXJyb3JzTGVuKSB7XG4gICAgICAgICAgICBpZiAoZXJyb3JzW2lkeF0gPT0gY3VycmVudFBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcHJldklkeCA9IGlkeCA+IDAgPyBpZHggLSAxIDogZXJyb3JzTGVuIC0gMTtcbiAgICAgICAgICAgICAgbmV4dElkeCA9IGlkeCA8IGVycm9yc0xlbiAtIDEgPyBpZHggKyAxIDogMDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXJyb3JzW2lkeF0gPiBjdXJyZW50UG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICBwcmV2SWR4ID0gaWR4ID4gMCA/IGlkeCAtIDEgOiBlcnJvcnNMZW4gLSAxO1xuICAgICAgICAgICAgICBuZXh0SWR4ID0gaWR4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWR4Kys7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgIHByZXZJZHggPSBlcnJvcnNMZW4gLSAxO1xuICAgICAgICAgICAgbmV4dElkeCA9IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5mb3JtU2xpZGVyLnNsaWRlKHtcbiAgICAgICAgICAgIHRvOiBtb3ZlID8gZXJyb3JzW25leHRJZHhdIC0gMSA6IGVycm9yc1twcmV2SWR4XSAtIDEsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9uZXh0U2xpZGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lcnJvck1vdmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9vcmllbnRhdGlvbkNoYW5nZS5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX2Vycm9yTW92ZUV2ZW50LmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fZm9ybUFjdGlvbi5jb21wbGV0ZSgpO1xuICB9XG5cbiAgc2Nyb2xsVG9TbGlkZShzbGlkZTogQWpmU2xpZGVJbnN0YW5jZSk6IHZvaWQge1xuICAgIGxldCBzY3JvbGxUb1BvcyA9IHNsaWRlLnBvc2l0aW9uIC0gMTtcbiAgICBpZiAoaXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlKHNsaWRlKSkge1xuICAgICAgc2Nyb2xsVG9Qb3MgPSBzY3JvbGxUb1BvcyAtIDEgKyAoc2xpZGUgYXMgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSkucmVwcztcbiAgICB9XG4gICAgdGhpcy5mb3JtU2xpZGVyLnNsaWRlKHt0bzogc2Nyb2xsVG9Qb3N9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSByZXBlYXRpbmcgc2xpZGUgcmVwZXRpdGlvbiBpbmRleCAoZWcuIDIvNSlcbiAgICogQHBhcmFtIHNsaWRlIFRoZSByZXBlYXRpbmcgc2xpZGVcbiAgICogQHBhcmFtIGN1cnJlbnRQYWdlIFRoZSBmb3Jtc2xpZGVyIGN1cnJlbnQgcGFnZSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIHJlcCBzbGlkZSBpbmRleCBzdHJpbmdcbiAgICovXG4gIGdldFJlcGVhdGluZ1NsaWRlUmVwSW5kZXgoXG4gICAgc2xpZGU6IEFqZlNsaWRlSW5zdGFuY2UsXG4gICAgY3VycmVudFBhZ2U6IG51bWJlcixcbiAgKTogT2JzZXJ2YWJsZTxzdHJpbmcgfCBudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybVNsaWRlci5wYWdlU2Nyb2xsRmluaXNoLnBpcGUoXG4gICAgICBzdGFydFdpdGgobnVsbCksXG4gICAgICBtYXAoKCkgPT4ge1xuICAgICAgICBpZiAoaXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlKHNsaWRlKSkge1xuICAgICAgICAgIGNvbnN0IHJlcFNsaWRlID0gc2xpZGUgYXMgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZTtcbiAgICAgICAgICBjb25zdCByZXBzVG90YWwgPSByZXBTbGlkZS5yZXBzO1xuICAgICAgICAgIGxldCBjdXJyZW50UmVwID0gcmVwc1RvdGFsO1xuICAgICAgICAgIGlmIChjdXJyZW50UGFnZSArIDEgPj0gc2xpZGUucG9zaXRpb24gJiYgY3VycmVudFBhZ2UgKyAxIDwgc2xpZGUucG9zaXRpb24gKyByZXBzVG90YWwpIHtcbiAgICAgICAgICAgIGN1cnJlbnRSZXAgPSBjdXJyZW50UGFnZSArIDIgLSBzbGlkZS5wb3NpdGlvbjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGAoJHtjdXJyZW50UmVwfS8ke3JlcHNUb3RhbH0pYDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVHJ1ZSBpZiB0aGUgc2xpZGUgdG9nZ2xlIHNob3VsZCBiZSBjaGVja2VkXG4gICAqIEBwYXJhbSBzbGlkZSBUaGUgcmVwZWF0aW5nIHNsaWRlXG4gICAqIEBwYXJhbSBjdXJyZW50UGFnZSBUaGUgZm9ybXNsaWRlciBjdXJyZW50IHBhZ2UgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSBjaGVja2VkIHN0YXRlXG4gICAqL1xuICBpc1NsaWRlVG9nZ2xlQ2hlY2tlZChzbGlkZTogQWpmU2xpZGVJbnN0YW5jZSwgY3VycmVudFBhZ2U6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGxldCBpc0NoZWNrZWQgPSBzbGlkZS5wb3NpdGlvbiA9PT0gY3VycmVudFBhZ2UgKyAxO1xuICAgIGlmIChpc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2Uoc2xpZGUpKSB7XG4gICAgICBjb25zdCByZXBTbGlkZSA9IHNsaWRlIGFzIEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2U7XG4gICAgICBpc0NoZWNrZWQgPVxuICAgICAgICBjdXJyZW50UGFnZSArIDEgPj0gcmVwU2xpZGUucG9zaXRpb24gJiYgcmVwU2xpZGUucG9zaXRpb24gKyByZXBTbGlkZS5yZXBzID4gY3VycmVudFBhZ2UgKyAxO1xuICAgIH1cblxuICAgIHJldHVybiBpc0NoZWNrZWQ7XG4gIH1cblxuICBvcmllbnRhdGlvbkNoYW5nZUhhbmRsZXIob3JpZW50YXRpb246IEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbik6IHZvaWQge1xuICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcbiAgfVxuXG4gIHRyYWNrTm9kZUJ5SWQoXzogbnVtYmVyLCBub2RlOiBBamZOb2RlSW5zdGFuY2UpOiBzdHJpbmcge1xuICAgIHJldHVybiBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobm9kZSk7XG4gIH1cbn1cbiJdfQ==