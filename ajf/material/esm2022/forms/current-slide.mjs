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
import { isRepeatingSlideInstance, } from '@ajf/core/forms';
import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
const pageCount = (slide) => isRepeatingSlideInstance(slide) ? Math.max(1, slide.reps) : 1;
/**
 * Resolve the page slider's current page into a slide.
 *
 * The renderer lays out one page per slide, and one page per repetition of a
 * repeating slide, optionally preceded by a start message page -- the same
 * arithmetic the error navigation in `AjfFormRenderer` performs.
 *
 * Impure, because slide visibility and repetition counts are mutated in place.
 * The result is memoized so that the pipe keeps handing back the same object
 * while nothing has moved: returning a fresh one on every check would trip
 * Angular's "expression has changed after it was checked" guard.
 */
export class AjfCurrentSlidePipe {
    constructor() {
        this._last = null;
    }
    transform(slides, currentPage, hasStartMessage, hasEndMessage = false) {
        const visible = (slides || []).filter(s => s.visible !== false);
        const offset = hasStartMessage ? 1 : 0;
        const next = {
            slide: null,
            repIndex: 0,
            reps: 0,
            displayNumber: Math.max(1, (currentPage || 0) + 1),
            total: visible.length,
            pages: offset +
                (hasEndMessage ? 1 : 0) +
                visible.reduce((count, slide) => count + pageCount(slide), 0),
        };
        let page = (currentPage || 0) - offset;
        if (page >= 0) {
            for (let i = 0; i < visible.length; i++) {
                const slide = visible[i];
                const pages = pageCount(slide);
                if (page < pages) {
                    next.slide = slide;
                    next.repIndex = page;
                    next.reps = isRepeatingSlideInstance(slide)
                        ? slide.reps
                        : 0;
                    next.displayNumber = i + 1 + offset;
                    break;
                }
                page -= pages;
            }
        }
        const last = this._last;
        if (last != null &&
            last.slide === next.slide &&
            last.repIndex === next.repIndex &&
            last.reps === next.reps &&
            last.displayNumber === next.displayNumber &&
            last.total === next.total &&
            last.pages === next.pages) {
            return last;
        }
        this._last = next;
        return next;
    }
    static { this.ɵfac = function AjfCurrentSlidePipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfCurrentSlidePipe)(); }; }
    static { this.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ajfCurrentSlide", type: AjfCurrentSlidePipe, pure: false }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfCurrentSlidePipe, [{
        type: Pipe,
        args: [{ name: 'ajfCurrentSlide', pure: false }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVudC1zbGlkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm1zL3NyYy9jdXJyZW50LXNsaWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFHTCx3QkFBd0IsR0FDekIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUMsSUFBSSxFQUFnQixNQUFNLGVBQWUsQ0FBQzs7QUFzQmxELE1BQU0sU0FBUyxHQUFHLENBQUMsS0FBdUIsRUFBVSxFQUFFLENBQ3BELHdCQUF3QixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRyxLQUFtQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFL0Y7Ozs7Ozs7Ozs7O0dBV0c7QUFFSCxNQUFNLE9BQU8sbUJBQW1CO0lBRGhDO1FBRVUsVUFBSyxHQUEyQixJQUFJLENBQUM7S0F1RDlDO0lBckRDLFNBQVMsQ0FDUCxNQUFpQyxFQUNqQyxXQUFtQixFQUNuQixlQUF3QixFQUN4QixnQkFBeUIsS0FBSztRQUU5QixNQUFNLE9BQU8sR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxLQUFLLEtBQUssQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sTUFBTSxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsTUFBTSxJQUFJLEdBQW9CO1lBQzVCLEtBQUssRUFBRSxJQUFJO1lBQ1gsUUFBUSxFQUFFLENBQUM7WUFDWCxJQUFJLEVBQUUsQ0FBQztZQUNQLGFBQWEsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEQsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNO1lBQ3JCLEtBQUssRUFDSCxNQUFNO2dCQUNOLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2hFLENBQUM7UUFFRixJQUFJLElBQUksR0FBRyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDdkMsSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDZCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUN4QyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxJQUFJLEdBQUcsS0FBSyxFQUFFLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztvQkFDckIsSUFBSSxDQUFDLElBQUksR0FBRyx3QkFBd0IsQ0FBQyxLQUFLLENBQUM7d0JBQ3pDLENBQUMsQ0FBRSxLQUFtQyxDQUFDLElBQUk7d0JBQzNDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ04sSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQztvQkFDcEMsTUFBTTtnQkFDUixDQUFDO2dCQUNELElBQUksSUFBSSxLQUFLLENBQUM7WUFDaEIsQ0FBQztRQUNILENBQUM7UUFFRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3hCLElBQ0UsSUFBSSxJQUFJLElBQUk7WUFDWixJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLO1lBQ3pCLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLFFBQVE7WUFDL0IsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSTtZQUN2QixJQUFJLENBQUMsYUFBYSxLQUFLLElBQUksQ0FBQyxhQUFhO1lBQ3pDLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUs7WUFDekIsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxFQUN6QixDQUFDO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO29IQXZEVSxtQkFBbUI7eUZBQW5CLG1CQUFtQjs7aUZBQW5CLG1CQUFtQjtjQUQvQixJQUFJO2VBQUMsRUFBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSxcbiAgQWpmU2xpZGVJbnN0YW5jZSxcbiAgaXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlLFxufSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqIFdoaWNoIHNsaWRlIHRoZSBwYWdlIHNsaWRlciBpcyBjdXJyZW50bHkgc2hvd2luZywgYW5kIHdoZXJlIGl0IHNpdHMuICovXG5leHBvcnQgaW50ZXJmYWNlIEFqZkN1cnJlbnRTbGlkZSB7XG4gIC8qKiBOdWxsIHdoaWxlIGEgc3RhcnQgb3IgZW5kIG1lc3NhZ2UgcGFnZSBpcyBvbiBzY3JlZW4uICovXG4gIHNsaWRlOiBBamZTbGlkZUluc3RhbmNlIHwgbnVsbDtcbiAgLyoqIFRoZSByZXBldGl0aW9uIG9uIHNjcmVlbiwgemVybyBiYXNlZDsgMCBmb3IgYSBub24tcmVwZWF0aW5nIHNsaWRlLiAqL1xuICByZXBJbmRleDogbnVtYmVyO1xuICAvKiogSG93IG1hbnkgcmVwZXRpdGlvbnMgdGhlIHNsaWRlIGhhczsgMCB3aGVuIGl0IGRvZXMgbm90IHJlcGVhdC4gKi9cbiAgcmVwczogbnVtYmVyO1xuICAvKiogVGhlIHNsaWRlJ3Mgb3JkaW5hbCBhbW9uZyB0aGUgdmlzaWJsZSBvbmVzLCBmb3IgdGhlIGhlYWRlciBiYWRnZS4gKi9cbiAgZGlzcGxheU51bWJlcjogbnVtYmVyO1xuICAvKiogSG93IG1hbnkgdmlzaWJsZSBzbGlkZXMgdGhlIGZvcm0gaGFzLiAqL1xuICB0b3RhbDogbnVtYmVyO1xuICAvKipcbiAgICogSG93IG1hbnkgcGFnZXMgdGhlIHNsaWRlciBob2xkczogb25lIHBlciB2aXNpYmxlIHNsaWRlLCBvbmUgcGVyIHJlcGV0aXRpb25cbiAgICogb2YgYSByZXBlYXRpbmcgc2xpZGUsIHBsdXMgdGhlIHN0YXJ0IGFuZCBlbmQgbWVzc2FnZSBwYWdlcy4gTm90aGluZyB0b1xuICAgKiBuYXZpZ2F0ZSB0byB3aGVuIHRoaXMgaXMgMS5cbiAgICovXG4gIHBhZ2VzOiBudW1iZXI7XG59XG5cbmNvbnN0IHBhZ2VDb3VudCA9IChzbGlkZTogQWpmU2xpZGVJbnN0YW5jZSk6IG51bWJlciA9PlxuICBpc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2Uoc2xpZGUpID8gTWF0aC5tYXgoMSwgKHNsaWRlIGFzIEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2UpLnJlcHMpIDogMTtcblxuLyoqXG4gKiBSZXNvbHZlIHRoZSBwYWdlIHNsaWRlcidzIGN1cnJlbnQgcGFnZSBpbnRvIGEgc2xpZGUuXG4gKlxuICogVGhlIHJlbmRlcmVyIGxheXMgb3V0IG9uZSBwYWdlIHBlciBzbGlkZSwgYW5kIG9uZSBwYWdlIHBlciByZXBldGl0aW9uIG9mIGFcbiAqIHJlcGVhdGluZyBzbGlkZSwgb3B0aW9uYWxseSBwcmVjZWRlZCBieSBhIHN0YXJ0IG1lc3NhZ2UgcGFnZSAtLSB0aGUgc2FtZVxuICogYXJpdGhtZXRpYyB0aGUgZXJyb3IgbmF2aWdhdGlvbiBpbiBgQWpmRm9ybVJlbmRlcmVyYCBwZXJmb3Jtcy5cbiAqXG4gKiBJbXB1cmUsIGJlY2F1c2Ugc2xpZGUgdmlzaWJpbGl0eSBhbmQgcmVwZXRpdGlvbiBjb3VudHMgYXJlIG11dGF0ZWQgaW4gcGxhY2UuXG4gKiBUaGUgcmVzdWx0IGlzIG1lbW9pemVkIHNvIHRoYXQgdGhlIHBpcGUga2VlcHMgaGFuZGluZyBiYWNrIHRoZSBzYW1lIG9iamVjdFxuICogd2hpbGUgbm90aGluZyBoYXMgbW92ZWQ6IHJldHVybmluZyBhIGZyZXNoIG9uZSBvbiBldmVyeSBjaGVjayB3b3VsZCB0cmlwXG4gKiBBbmd1bGFyJ3MgXCJleHByZXNzaW9uIGhhcyBjaGFuZ2VkIGFmdGVyIGl0IHdhcyBjaGVja2VkXCIgZ3VhcmQuXG4gKi9cbkBQaXBlKHtuYW1lOiAnYWpmQ3VycmVudFNsaWRlJywgcHVyZTogZmFsc2V9KVxuZXhwb3J0IGNsYXNzIEFqZkN1cnJlbnRTbGlkZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgcHJpdmF0ZSBfbGFzdDogQWpmQ3VycmVudFNsaWRlIHwgbnVsbCA9IG51bGw7XG5cbiAgdHJhbnNmb3JtKFxuICAgIHNsaWRlczogQWpmU2xpZGVJbnN0YW5jZVtdIHwgbnVsbCxcbiAgICBjdXJyZW50UGFnZTogbnVtYmVyLFxuICAgIGhhc1N0YXJ0TWVzc2FnZTogYm9vbGVhbixcbiAgICBoYXNFbmRNZXNzYWdlOiBib29sZWFuID0gZmFsc2UsXG4gICk6IEFqZkN1cnJlbnRTbGlkZSB7XG4gICAgY29uc3QgdmlzaWJsZSA9IChzbGlkZXMgfHwgW10pLmZpbHRlcihzID0+IHMudmlzaWJsZSAhPT0gZmFsc2UpO1xuICAgIGNvbnN0IG9mZnNldCA9IGhhc1N0YXJ0TWVzc2FnZSA/IDEgOiAwO1xuICAgIGNvbnN0IG5leHQ6IEFqZkN1cnJlbnRTbGlkZSA9IHtcbiAgICAgIHNsaWRlOiBudWxsLFxuICAgICAgcmVwSW5kZXg6IDAsXG4gICAgICByZXBzOiAwLFxuICAgICAgZGlzcGxheU51bWJlcjogTWF0aC5tYXgoMSwgKGN1cnJlbnRQYWdlIHx8IDApICsgMSksXG4gICAgICB0b3RhbDogdmlzaWJsZS5sZW5ndGgsXG4gICAgICBwYWdlczpcbiAgICAgICAgb2Zmc2V0ICtcbiAgICAgICAgKGhhc0VuZE1lc3NhZ2UgPyAxIDogMCkgK1xuICAgICAgICB2aXNpYmxlLnJlZHVjZSgoY291bnQsIHNsaWRlKSA9PiBjb3VudCArIHBhZ2VDb3VudChzbGlkZSksIDApLFxuICAgIH07XG5cbiAgICBsZXQgcGFnZSA9IChjdXJyZW50UGFnZSB8fCAwKSAtIG9mZnNldDtcbiAgICBpZiAocGFnZSA+PSAwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZpc2libGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc2xpZGUgPSB2aXNpYmxlW2ldO1xuICAgICAgICBjb25zdCBwYWdlcyA9IHBhZ2VDb3VudChzbGlkZSk7XG4gICAgICAgIGlmIChwYWdlIDwgcGFnZXMpIHtcbiAgICAgICAgICBuZXh0LnNsaWRlID0gc2xpZGU7XG4gICAgICAgICAgbmV4dC5yZXBJbmRleCA9IHBhZ2U7XG4gICAgICAgICAgbmV4dC5yZXBzID0gaXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlKHNsaWRlKVxuICAgICAgICAgICAgPyAoc2xpZGUgYXMgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSkucmVwc1xuICAgICAgICAgICAgOiAwO1xuICAgICAgICAgIG5leHQuZGlzcGxheU51bWJlciA9IGkgKyAxICsgb2Zmc2V0O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHBhZ2UgLT0gcGFnZXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgbGFzdCA9IHRoaXMuX2xhc3Q7XG4gICAgaWYgKFxuICAgICAgbGFzdCAhPSBudWxsICYmXG4gICAgICBsYXN0LnNsaWRlID09PSBuZXh0LnNsaWRlICYmXG4gICAgICBsYXN0LnJlcEluZGV4ID09PSBuZXh0LnJlcEluZGV4ICYmXG4gICAgICBsYXN0LnJlcHMgPT09IG5leHQucmVwcyAmJlxuICAgICAgbGFzdC5kaXNwbGF5TnVtYmVyID09PSBuZXh0LmRpc3BsYXlOdW1iZXIgJiZcbiAgICAgIGxhc3QudG90YWwgPT09IG5leHQudG90YWwgJiZcbiAgICAgIGxhc3QucGFnZXMgPT09IG5leHQucGFnZXNcbiAgICApIHtcbiAgICAgIHJldHVybiBsYXN0O1xuICAgIH1cbiAgICB0aGlzLl9sYXN0ID0gbmV4dDtcbiAgICByZXR1cm4gbmV4dDtcbiAgfVxufVxuIl19