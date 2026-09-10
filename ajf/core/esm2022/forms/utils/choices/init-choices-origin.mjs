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
import { firstValueFrom } from 'rxjs';
import { toArray } from 'rxjs/operators';
/**
 * Called by form-rederer
 * take as param an AjfChoicesOrigin&lt;any&gt; and return an Promise&lt;void&gt; for handling async
 * event
 */
export async function initChoicesOrigin(origin) {
    /** fixed don't use async evente the promise is resolved */
    if (origin.type === 'fixed') {
        return;
    }
    /** apply function and than return resolve promise */
    if (origin.type === 'function') {
        origin.choices = origin.generator();
        return;
    }
    /** modify origin.choices with result of resolved promise */
    if (origin.type === 'promise') {
        return origin.generator.then(choices => (origin.choices = choices)).then();
    }
    /** modify origin.choices with result of subscribed observable */
    if (origin.type === 'observable') {
        if (origin.generator != null) {
            origin.choices = [];
            return firstValueFrom(origin.generator.pipe(toArray()))
                .then(choices => (origin.choices = choices))
                .then();
        }
    }
    /** modify origin.choices with result of subscribed observable */
    if (origin.type === 'observableArray') {
        if (origin.generator != null) {
            origin.choices = [];
            return firstValueFrom(origin.generator)
                .then(choices => (origin.choices = choices))
                .then();
        }
    }
    return;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC1jaG9pY2VzLW9yaWdpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZm9ybXMvc3JjL3V0aWxzL2Nob2ljZXMvaW5pdC1jaG9pY2VzLW9yaWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUd2Qzs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSxpQkFBaUIsQ0FBQyxNQUE2QjtJQUNuRSwyREFBMkQ7SUFDM0QsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRSxDQUFDO1FBQzVCLE9BQU87SUFDVCxDQUFDO0lBQ0QscURBQXFEO0lBQ3JELElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUUsQ0FBQztRQUMvQixNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNwQyxPQUFPO0lBQ1QsQ0FBQztJQUNELDREQUE0RDtJQUM1RCxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFLENBQUM7UUFDOUIsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzdFLENBQUM7SUFDRCxpRUFBaUU7SUFDakUsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFlBQVksRUFBRSxDQUFDO1FBQ2pDLElBQUksTUFBTSxDQUFDLFNBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUM3QixNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNwQixPQUFPLGNBQWMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2lCQUNwRCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUM7aUJBQzNDLElBQUksRUFBRSxDQUFDO1FBQ1osQ0FBQztJQUNILENBQUM7SUFDRCxpRUFBaUU7SUFDakUsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLGlCQUFpQixFQUFFLENBQUM7UUFDdEMsSUFBSSxNQUFNLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLE9BQU8sY0FBYyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7aUJBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQztpQkFDM0MsSUFBSSxFQUFFLENBQUM7UUFDWixDQUFDO0lBQ0gsQ0FBQztJQUNELE9BQU87QUFDVCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge2ZpcnN0VmFsdWVGcm9tfSBmcm9tICdyeGpzJztcbmltcG9ydCB7dG9BcnJheX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkNob2ljZXNPcmlnaW59IGZyb20gJy4uLy4uL2ludGVyZmFjZS9jaG9pY2VzL2Nob2ljZXMtb3JpZ2luJztcbi8qKlxuICogQ2FsbGVkIGJ5IGZvcm0tcmVkZXJlclxuICogdGFrZSBhcyBwYXJhbSBhbiBBamZDaG9pY2VzT3JpZ2luJmx0O2FueSZndDsgYW5kIHJldHVybiBhbiBQcm9taXNlJmx0O3ZvaWQmZ3Q7IGZvciBoYW5kbGluZyBhc3luY1xuICogZXZlbnRcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXRDaG9pY2VzT3JpZ2luKG9yaWdpbjogQWpmQ2hvaWNlc09yaWdpbjxhbnk+KTogUHJvbWlzZTx2b2lkPiB7XG4gIC8qKiBmaXhlZCBkb24ndCB1c2UgYXN5bmMgZXZlbnRlIHRoZSBwcm9taXNlIGlzIHJlc29sdmVkICovXG4gIGlmIChvcmlnaW4udHlwZSA9PT0gJ2ZpeGVkJykge1xuICAgIHJldHVybjtcbiAgfVxuICAvKiogYXBwbHkgZnVuY3Rpb24gYW5kIHRoYW4gcmV0dXJuIHJlc29sdmUgcHJvbWlzZSAqL1xuICBpZiAob3JpZ2luLnR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBvcmlnaW4uY2hvaWNlcyA9IG9yaWdpbi5nZW5lcmF0b3IoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgLyoqIG1vZGlmeSBvcmlnaW4uY2hvaWNlcyB3aXRoIHJlc3VsdCBvZiByZXNvbHZlZCBwcm9taXNlICovXG4gIGlmIChvcmlnaW4udHlwZSA9PT0gJ3Byb21pc2UnKSB7XG4gICAgcmV0dXJuIG9yaWdpbi5nZW5lcmF0b3IudGhlbihjaG9pY2VzID0+IChvcmlnaW4uY2hvaWNlcyA9IGNob2ljZXMpKS50aGVuKCk7XG4gIH1cbiAgLyoqIG1vZGlmeSBvcmlnaW4uY2hvaWNlcyB3aXRoIHJlc3VsdCBvZiBzdWJzY3JpYmVkIG9ic2VydmFibGUgKi9cbiAgaWYgKG9yaWdpbi50eXBlID09PSAnb2JzZXJ2YWJsZScpIHtcbiAgICBpZiAob3JpZ2luLmdlbmVyYXRvciAhPSBudWxsKSB7XG4gICAgICBvcmlnaW4uY2hvaWNlcyA9IFtdO1xuICAgICAgcmV0dXJuIGZpcnN0VmFsdWVGcm9tKG9yaWdpbi5nZW5lcmF0b3IucGlwZSh0b0FycmF5KCkpKVxuICAgICAgICAudGhlbihjaG9pY2VzID0+IChvcmlnaW4uY2hvaWNlcyA9IGNob2ljZXMpKVxuICAgICAgICAudGhlbigpO1xuICAgIH1cbiAgfVxuICAvKiogbW9kaWZ5IG9yaWdpbi5jaG9pY2VzIHdpdGggcmVzdWx0IG9mIHN1YnNjcmliZWQgb2JzZXJ2YWJsZSAqL1xuICBpZiAob3JpZ2luLnR5cGUgPT09ICdvYnNlcnZhYmxlQXJyYXknKSB7XG4gICAgaWYgKG9yaWdpbi5nZW5lcmF0b3IgIT0gbnVsbCkge1xuICAgICAgb3JpZ2luLmNob2ljZXMgPSBbXTtcbiAgICAgIHJldHVybiBmaXJzdFZhbHVlRnJvbShvcmlnaW4uZ2VuZXJhdG9yKVxuICAgICAgICAudGhlbihjaG9pY2VzID0+IChvcmlnaW4uY2hvaWNlcyA9IGNob2ljZXMpKVxuICAgICAgICAudGhlbigpO1xuICAgIH1cbiAgfVxuICByZXR1cm47XG59XG4iXX0=