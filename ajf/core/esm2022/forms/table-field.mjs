/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
import { Directive, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { AjfBaseFieldComponent } from './base-field';
import { AJF_WARNING_ALERT_SERVICE } from './warning-alert-service';
import * as i0 from "@angular/core";
import * as i1 from "./form-renderer";
/**
 * This component manages the table field data.
 * It exposes methods for managing the display of controllers.
 *
 *
 * @export
 * @abstract
 * @class AjfTableFieldComponent
 */
export class AjfTableFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
        this._instanceChangeSub = Subscription.EMPTY;
    }
    /**
     *  set the current cell show to false and set the next cell show to true.
     *
     * @param ev
     * @param row
     * @param column
     * @return {*}
     */
    goToNextCell(ev, row, column) {
        if (this.instance == null ||
            this.instance.controls.length < row ||
            (this.instance.controls.length >= row && this.instance.controls[row].length < 1) ||
            this.instance.controls[row][1].length < column) {
            return;
        }
        const rowLength = this.instance.controls[row][1].length;
        const currentCell = this.instance.controls[row][1][column];
        if (column + 1 >= rowLength) {
            column = 0;
            if (row + 1 >= this.instance.controls.length) {
                row = 1;
            }
            else {
                row += 1;
            }
        }
        else {
            column += 1;
        }
        if (typeof currentCell !== 'string') {
            currentCell.show = false;
        }
        this._showCell(row, column);
        ev.preventDefault();
        ev.stopPropagation();
    }
    /**
     * It resets all control.show to false and sets the control.show
     * (identified by row and column) to true.
     *
     * @param row
     * @param column
     */
    goToCell(row, column) {
        this._resetControls();
        this._showCell(row, column);
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this._instanceChangeSub.unsubscribe();
    }
    _onInstanceChange() {
        this._instanceChangeSub.unsubscribe();
        if (this.instance == null) {
            this._instanceChangeSub = Subscription.EMPTY;
            return;
        }
        let sub;
        this.instance.controls.forEach(ctrlss => {
            if (typeof ctrlss === 'string') {
                return;
            }
            if (Array.isArray(ctrlss)) {
                ctrlss.forEach(ctrls => {
                    if (typeof ctrls === 'string') {
                        return;
                    }
                    if (Array.isArray(ctrls)) {
                        ctrls.forEach(ctrl => {
                            if (typeof ctrl === 'string') {
                                return;
                            }
                            const curSub = ctrl.control.valueChanges.subscribe(() => this._changeDetectorRef.markForCheck());
                            if (typeof sub === 'undefined') {
                                sub = curSub;
                            }
                            else {
                                sub.add(curSub);
                            }
                        });
                    }
                });
            }
        });
    }
    /**
     * it sets all controls show to false.
     *
     * @private
     */
    _resetControls() {
        if (this.instance == null) {
            return;
        }
        this.instance.controls.forEach(row => row[1].forEach(cell => {
            if (typeof cell !== 'string') {
                cell.show = false;
            }
        }));
    }
    /**
     * It sets the control.show (identified by row and column) to true.
     *
     * @private
     * @param row
     * @param column
     * @return {*}
     */
    _showCell(row, column) {
        if (this.instance == null ||
            row >= this.instance.controls.length ||
            column >= this.instance.controls[row][1].length) {
            return;
        }
        const nextCell = this.instance.controls[row][1][column];
        if (typeof nextCell !== 'string') {
            nextCell.show = true;
        }
    }
    static { this.ɵfac = function AjfTableFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfTableFieldComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE)); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AjfTableFieldComponent, features: [i0.ɵɵInheritDefinitionFeature] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfTableFieldComponent, [{
        type: Directive
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: undefined, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }], null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2Zvcm1zL3NyYy90YWJsZS1maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQW9CLFNBQVMsRUFBRSxNQUFNLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDOUUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVsQyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFHbkQsT0FBTyxFQUFDLHlCQUF5QixFQUF5QixNQUFNLHlCQUF5QixDQUFDOzs7QUFFMUY7Ozs7Ozs7O0dBUUc7QUFFSCxNQUFNLE9BQWdCLHNCQUNwQixTQUFRLHFCQUE0QztJQUtwRCxZQUNFLEdBQXNCLEVBQ3RCLE9BQStCLEVBQ0ksR0FBMkI7UUFFOUQsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFQbkIsdUJBQWtCLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztJQVFoRCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILFlBQVksQ0FBQyxFQUFTLEVBQUUsR0FBVyxFQUFFLE1BQWM7UUFDakQsSUFDRSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUk7WUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEdBQUc7WUFDbkMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDaEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFD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QTlJbUIsc0JBQXNCLG9IQVNoQyx5QkFBeUI7b0VBVGYsc0JBQXNCOztpRkFBdEIsc0JBQXNCO2NBRDNDLFNBQVM7O3NCQVVMLE1BQU07dUJBQUMseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIEluamVjdCwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZCYXNlRmllbGRDb21wb25lbnR9IGZyb20gJy4vYmFzZS1maWVsZCc7XG5pbXBvcnQge0FqZkZvcm1SZW5kZXJlclNlcnZpY2V9IGZyb20gJy4vZm9ybS1yZW5kZXJlcic7XG5pbXBvcnQge0FqZlRhYmxlRmllbGRJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy90YWJsZS1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge0FKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UsIEFqZldhcm5pbmdBbGVydFNlcnZpY2V9IGZyb20gJy4vd2FybmluZy1hbGVydC1zZXJ2aWNlJztcblxuLyoqXG4gKiBUaGlzIGNvbXBvbmVudCBtYW5hZ2VzIHRoZSB0YWJsZSBmaWVsZCBkYXRhLlxuICogSXQgZXhwb3NlcyBtZXRob2RzIGZvciBtYW5hZ2luZyB0aGUgZGlzcGxheSBvZiBjb250cm9sbGVycy5cbiAqXG4gKlxuICogQGV4cG9ydFxuICogQGFic3RyYWN0XG4gKiBAY2xhc3MgQWpmVGFibGVGaWVsZENvbXBvbmVudFxuICovXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZUYWJsZUZpZWxkQ29tcG9uZW50XG4gIGV4dGVuZHMgQWpmQmFzZUZpZWxkQ29tcG9uZW50PEFqZlRhYmxlRmllbGRJbnN0YW5jZT5cbiAgaW1wbGVtZW50cyBPbkRlc3Ryb3lcbntcbiAgcHJpdmF0ZSBfaW5zdGFuY2VDaGFuZ2VTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBzZXJ2aWNlOiBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICAgIEBJbmplY3QoQUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSkgd2FzOiBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlLFxuICApIHtcbiAgICBzdXBlcihjZHIsIHNlcnZpY2UsIHdhcyk7XG4gIH1cblxuICAvKipcbiAgICogIHNldCB0aGUgY3VycmVudCBjZWxsIHNob3cgdG8gZmFsc2UgYW5kIHNldCB0aGUgbmV4dCBjZWxsIHNob3cgdG8gdHJ1ZS5cbiAgICpcbiAgICogQHBhcmFtIGV2XG4gICAqIEBwYXJhbSByb3dcbiAgICogQHBhcmFtIGNvbHVtblxuICAgKiBAcmV0dXJuIHsqfVxuICAgKi9cbiAgZ29Ub05leHRDZWxsKGV2OiBFdmVudCwgcm93OiBudW1iZXIsIGNvbHVtbjogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5pbnN0YW5jZSA9PSBudWxsIHx8XG4gICAgICB0aGlzLmluc3RhbmNlLmNvbnRyb2xzLmxlbmd0aCA8IHJvdyB8fFxuICAgICAgKHRoaXMuaW5zdGFuY2UuY29udHJvbHMubGVuZ3RoID49IHJvdyAmJiB0aGlzLmluc3RhbmNlLmNvbnRyb2xzW3Jvd10ubGVuZ3RoIDwgMSkgfHxcbiAgICAgIHRoaXMuaW5zdGFuY2UuY29udHJvbHNbcm93XVsxXS5sZW5ndGggPCBjb2x1bW5cbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgcm93TGVuZ3RoID0gdGhpcy5pbnN0YW5jZS5jb250cm9sc1tyb3ddWzFdLmxlbmd0aDtcbiAgICBjb25zdCBjdXJyZW50Q2VsbCA9IHRoaXMuaW5zdGFuY2UuY29udHJvbHNbcm93XVsxXVtjb2x1bW5dO1xuICAgIGlmIChjb2x1bW4gKyAxID49IHJvd0xlbmd0aCkge1xuICAgICAgY29sdW1uID0gMDtcbiAgICAgIGlmIChyb3cgKyAxID49IHRoaXMuaW5zdGFuY2UuY29udHJvbHMubGVuZ3RoKSB7XG4gICAgICAgIHJvdyA9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb3cgKz0gMTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29sdW1uICs9IDE7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgY3VycmVudENlbGwgIT09ICdzdHJpbmcnKSB7XG4gICAgICBjdXJyZW50Q2VsbC5zaG93ID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuX3Nob3dDZWxsKHJvdywgY29sdW1uKTtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0IHJlc2V0cyBhbGwgY29udHJvbC5zaG93IHRvIGZhbHNlIGFuZCBzZXRzIHRoZSBjb250cm9sLnNob3dcbiAgICogKGlkZW50aWZpZWQgYnkgcm93IGFuZCBjb2x1bW4pIHRvIHRydWUuXG4gICAqXG4gICAqIEBwYXJhbSByb3dcbiAgICogQHBhcmFtIGNvbHVtblxuICAgKi9cbiAgZ29Ub0NlbGwocm93OiBudW1iZXIsIGNvbHVtbjogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fcmVzZXRDb250cm9scygpO1xuICAgIHRoaXMuX3Nob3dDZWxsKHJvdywgY29sdW1uKTtcbiAgfVxuXG4gIG92ZXJyaWRlIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgdGhpcy5faW5zdGFuY2VDaGFuZ2VTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSBfb25JbnN0YW5jZUNoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9pbnN0YW5jZUNoYW5nZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLmluc3RhbmNlID09IG51bGwpIHtcbiAgICAgIHRoaXMuX2luc3RhbmNlQ2hhbmdlU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgc3ViOiBTdWJzY3JpcHRpb247XG4gICAgdGhpcy5pbnN0YW5jZS5jb250cm9scy5mb3JFYWNoKGN0cmxzcyA9PiB7XG4gICAgICBpZiAodHlwZW9mIGN0cmxzcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY3RybHNzKSkge1xuICAgICAgICBjdHJsc3MuZm9yRWFjaChjdHJscyA9PiB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBjdHJscyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY3RybHMpKSB7XG4gICAgICAgICAgICBjdHJscy5mb3JFYWNoKGN0cmwgPT4ge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIGN0cmwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IGN1clN1YiA9IGN0cmwuY29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCgpID0+XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCksXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2Ygc3ViID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHN1YiA9IGN1clN1YjtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdWIuYWRkKGN1clN1Yik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogaXQgc2V0cyBhbGwgY29udHJvbHMgc2hvdyB0byBmYWxzZS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX3Jlc2V0Q29udHJvbHMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaW5zdGFuY2UgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmluc3RhbmNlLmNvbnRyb2xzLmZvckVhY2gocm93ID0+XG4gICAgICByb3dbMV0uZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjZWxsICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNlbGwuc2hvdyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0IHNldHMgdGhlIGNvbnRyb2wuc2hvdyAoaWRlbnRpZmllZCBieSByb3cgYW5kIGNvbHVtbikgdG8gdHJ1ZS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHJvd1xuICAgKiBAcGFyYW0gY29sdW1uXG4gICAqIEByZXR1cm4geyp9XG4gICAqL1xuICBwcml2YXRlIF9zaG93Q2VsbChyb3c6IG51bWJlciwgY29sdW1uOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmluc3RhbmNlID09IG51bGwgfHxcbiAgICAgIHJvdyA+PSB0aGlzLmluc3RhbmNlLmNvbnRyb2xzLmxlbmd0aCB8fFxuICAgICAgY29sdW1uID49IHRoaXMuaW5zdGFuY2UuY29udHJvbHNbcm93XVsxXS5sZW5ndGhcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbmV4dENlbGwgPSB0aGlzLmluc3RhbmNlLmNvbnRyb2xzW3Jvd11bMV1bY29sdW1uXTtcbiAgICBpZiAodHlwZW9mIG5leHRDZWxsICE9PSAnc3RyaW5nJykge1xuICAgICAgbmV4dENlbGwuc2hvdyA9IHRydWU7XG4gICAgfVxuICB9XG59XG4iXX0=