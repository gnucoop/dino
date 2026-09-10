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
import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Groups the node types of the palette by category, keeping the categories in
 * the order of their first entry. Applied after the search filter, so that the
 * categories left without entries produce no header.
 */
export class NodeTypeGroupsPipe {
    transform(nodeTypes) {
        if (!nodeTypes) {
            return [];
        }
        const groups = [];
        const groupsByCategory = new Map();
        // Entries with no category are collected in a trailing group with no
        // header, so that the node types added by the host app are never hidden.
        const uncategorized = [];
        nodeTypes.forEach(nodeType => {
            const category = nodeType.category;
            if (!category) {
                uncategorized.push(nodeType);
                return;
            }
            let group = groupsByCategory.get(category);
            if (group == null) {
                group = { category, nodeTypes: [] };
                groupsByCategory.set(category, group);
                groups.push(group);
            }
            group.nodeTypes.push(nodeType);
        });
        if (uncategorized.length > 0) {
            groups.push({ category: '', nodeTypes: uncategorized });
        }
        return groups;
    }
    static { this.ɵfac = function NodeTypeGroupsPipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NodeTypeGroupsPipe)(); }; }
    static { this.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "nodeTypeGroups", type: NodeTypeGroupsPipe, pure: true }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NodeTypeGroupsPipe, [{
        type: Pipe,
        args: [{ name: 'nodeTypeGroups' }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS10eXBlLWdyb3Vwcy5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL3NyYy9ub2RlLXR5cGUtZ3JvdXBzLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLElBQUksRUFBZ0IsTUFBTSxlQUFlLENBQUM7O0FBZ0JsRDs7OztHQUlHO0FBRUgsTUFBTSxPQUFPLGtCQUFrQjtJQUM3QixTQUFTLENBQUMsU0FBd0M7UUFDaEQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2YsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDO1FBQ0QsTUFBTSxNQUFNLEdBQWtDLEVBQUUsQ0FBQztRQUNqRCxNQUFNLGdCQUFnQixHQUFHLElBQUksR0FBRyxFQUF1QyxDQUFDO1FBQ3hFLHFFQUFxRTtRQUNyRSx5RUFBeUU7UUFDekUsTUFBTSxhQUFhLEdBQWtDLEVBQUUsQ0FBQztRQUV4RCxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzNCLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFDbkMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNkLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzdCLE9BQU87WUFDVCxDQUFDO1lBQ0QsSUFBSSxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLElBQUksS0FBSyxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUNsQixLQUFLLEdBQUcsRUFBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBQyxDQUFDO2dCQUNsQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLENBQUM7WUFDRCxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFDLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzttSEE5QlUsa0JBQWtCO3dGQUFsQixrQkFBa0I7O2lGQUFsQixrQkFBa0I7Y0FEOUIsSUFBSTtlQUFDLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1BpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeX0gZnJvbSAnLi9mb3JtLWJ1aWxkZXItc2VydmljZSc7XG5cbi8qKlxuICogQSBncm91cCBvZiBub2RlIHR5cGVzIG9mIHRoZSBwYWxldHRlLCByZW5kZXJlZCB1bmRlciBhIGNvbW1vbiBoZWFkZXIuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUdyb3VwIHtcbiAgLyoqXG4gICAqIFRoZSB0cmFuc2xhdGlvbiBrZXkgb2YgdGhlIGdyb3VwIGhlYWRlci4gRW1wdHkgZm9yIHRoZSBncm91cCBvZiB0aGUgZW50cmllc1xuICAgKiB0aGF0IGhhdmUgbm8gY2F0ZWdvcnksIHdoaWNoIGlzIHJlbmRlcmVkIHdpdGhvdXQgYSBoZWFkZXIuXG4gICAqL1xuICBjYXRlZ29yeTogc3RyaW5nO1xuICBub2RlVHlwZXM6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeVtdO1xufVxuXG4vKipcbiAqIEdyb3VwcyB0aGUgbm9kZSB0eXBlcyBvZiB0aGUgcGFsZXR0ZSBieSBjYXRlZ29yeSwga2VlcGluZyB0aGUgY2F0ZWdvcmllcyBpblxuICogdGhlIG9yZGVyIG9mIHRoZWlyIGZpcnN0IGVudHJ5LiBBcHBsaWVkIGFmdGVyIHRoZSBzZWFyY2ggZmlsdGVyLCBzbyB0aGF0IHRoZVxuICogY2F0ZWdvcmllcyBsZWZ0IHdpdGhvdXQgZW50cmllcyBwcm9kdWNlIG5vIGhlYWRlci5cbiAqL1xuQFBpcGUoe25hbWU6ICdub2RlVHlwZUdyb3Vwcyd9KVxuZXhwb3J0IGNsYXNzIE5vZGVUeXBlR3JvdXBzUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0obm9kZVR5cGVzOiBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnlbXSk6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVHcm91cFtdIHtcbiAgICBpZiAoIW5vZGVUeXBlcykge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBjb25zdCBncm91cHM6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVHcm91cFtdID0gW107XG4gICAgY29uc3QgZ3JvdXBzQnlDYXRlZ29yeSA9IG5ldyBNYXA8c3RyaW5nLCBBamZGb3JtQnVpbGRlck5vZGVUeXBlR3JvdXA+KCk7XG4gICAgLy8gRW50cmllcyB3aXRoIG5vIGNhdGVnb3J5IGFyZSBjb2xsZWN0ZWQgaW4gYSB0cmFpbGluZyBncm91cCB3aXRoIG5vXG4gICAgLy8gaGVhZGVyLCBzbyB0aGF0IHRoZSBub2RlIHR5cGVzIGFkZGVkIGJ5IHRoZSBob3N0IGFwcCBhcmUgbmV2ZXIgaGlkZGVuLlxuICAgIGNvbnN0IHVuY2F0ZWdvcml6ZWQ6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeVtdID0gW107XG5cbiAgICBub2RlVHlwZXMuZm9yRWFjaChub2RlVHlwZSA9PiB7XG4gICAgICBjb25zdCBjYXRlZ29yeSA9IG5vZGVUeXBlLmNhdGVnb3J5O1xuICAgICAgaWYgKCFjYXRlZ29yeSkge1xuICAgICAgICB1bmNhdGVnb3JpemVkLnB1c2gobm9kZVR5cGUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBsZXQgZ3JvdXAgPSBncm91cHNCeUNhdGVnb3J5LmdldChjYXRlZ29yeSk7XG4gICAgICBpZiAoZ3JvdXAgPT0gbnVsbCkge1xuICAgICAgICBncm91cCA9IHtjYXRlZ29yeSwgbm9kZVR5cGVzOiBbXX07XG4gICAgICAgIGdyb3Vwc0J5Q2F0ZWdvcnkuc2V0KGNhdGVnb3J5LCBncm91cCk7XG4gICAgICAgIGdyb3Vwcy5wdXNoKGdyb3VwKTtcbiAgICAgIH1cbiAgICAgIGdyb3VwLm5vZGVUeXBlcy5wdXNoKG5vZGVUeXBlKTtcbiAgICB9KTtcblxuICAgIGlmICh1bmNhdGVnb3JpemVkLmxlbmd0aCA+IDApIHtcbiAgICAgIGdyb3Vwcy5wdXNoKHtjYXRlZ29yeTogJycsIG5vZGVUeXBlczogdW5jYXRlZ29yaXplZH0pO1xuICAgIH1cbiAgICByZXR1cm4gZ3JvdXBzO1xuICB9XG59XG4iXX0=