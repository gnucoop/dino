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
import { isContainerNode } from '../nodes/is-container-node';
/**
 * It returns the container node of the node.
 */
export function getContainerNode(allNodes, node) {
    let parentNode = null;
    let curParent = node.parent;
    while (curParent != null && parentNode == null) {
        const curNode = allNodes
            .map((n) => n.node || n)
            .find(n => n.id == curParent);
        if (curNode) {
            if (isContainerNode(curNode)) {
                parentNode = curNode;
            }
        }
        curParent = curNode != null ? curNode.parent : null;
    }
    return parentNode;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWNvbnRhaW5lci1ub2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2dldC1jb250YWluZXItbm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFJSCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFFM0Q7O0dBRUc7QUFDSCxNQUFNLFVBQVUsZ0JBQWdCLENBQzlCLFFBQXVDLEVBQ3ZDLElBQWE7SUFFYixJQUFJLFVBQVUsR0FBbUIsSUFBSSxDQUFDO0lBQ3RDLElBQUksU0FBUyxHQUFrQixJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzNDLE9BQU8sU0FBUyxJQUFJLElBQUksSUFBSSxVQUFVLElBQUksSUFBSSxFQUFFLENBQUM7UUFDL0MsTUFBTSxPQUFPLEdBQUcsUUFBUTthQUNyQixHQUFHLENBQUMsQ0FBQyxDQUE0QixFQUFFLEVBQUUsQ0FBRSxDQUFxQixDQUFDLElBQUksSUFBSyxDQUFhLENBQUM7YUFDcEYsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxTQUFTLENBQUMsQ0FBQztRQUNoQyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQ1osSUFBSSxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztnQkFDN0IsVUFBVSxHQUFHLE9BQU8sQ0FBQztZQUN2QixDQUFDO1FBQ0gsQ0FBQztRQUNELFNBQVMsR0FBRyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDdEQsQ0FBQztJQUNELE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmTm9kZUluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZOb2RlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZSc7XG5pbXBvcnQge2lzQ29udGFpbmVyTm9kZX0gZnJvbSAnLi4vbm9kZXMvaXMtY29udGFpbmVyLW5vZGUnO1xuXG4vKipcbiAqIEl0IHJldHVybnMgdGhlIGNvbnRhaW5lciBub2RlIG9mIHRoZSBub2RlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29udGFpbmVyTm9kZShcbiAgYWxsTm9kZXM6IChBamZOb2RlIHwgQWpmTm9kZUluc3RhbmNlKVtdLFxuICBub2RlOiBBamZOb2RlLFxuKTogQWpmTm9kZSB8IG51bGwge1xuICBsZXQgcGFyZW50Tm9kZTogQWpmTm9kZSB8IG51bGwgPSBudWxsO1xuICBsZXQgY3VyUGFyZW50OiBudW1iZXIgfCBudWxsID0gbm9kZS5wYXJlbnQ7XG4gIHdoaWxlIChjdXJQYXJlbnQgIT0gbnVsbCAmJiBwYXJlbnROb2RlID09IG51bGwpIHtcbiAgICBjb25zdCBjdXJOb2RlID0gYWxsTm9kZXNcbiAgICAgIC5tYXAoKG46IEFqZk5vZGUgfCBBamZOb2RlSW5zdGFuY2UpID0+IChuIGFzIEFqZk5vZGVJbnN0YW5jZSkubm9kZSB8fCAobiBhcyBBamZOb2RlKSlcbiAgICAgIC5maW5kKG4gPT4gbi5pZCA9PSBjdXJQYXJlbnQpO1xuICAgIGlmIChjdXJOb2RlKSB7XG4gICAgICBpZiAoaXNDb250YWluZXJOb2RlKGN1ck5vZGUpKSB7XG4gICAgICAgIHBhcmVudE5vZGUgPSBjdXJOb2RlO1xuICAgICAgfVxuICAgIH1cbiAgICBjdXJQYXJlbnQgPSBjdXJOb2RlICE9IG51bGwgPyBjdXJOb2RlLnBhcmVudCA6IG51bGw7XG4gIH1cbiAgcmV0dXJuIHBhcmVudE5vZGU7XG59XG4iXX0=