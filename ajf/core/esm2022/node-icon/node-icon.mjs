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
import { AjfFieldType, AjfNodeType } from '@ajf/core/forms';
import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class AjfNodeIcon {
    constructor() {
        this._fontSet = '';
        this._fontIcon = '';
    }
    get fontSet() {
        return this._fontSet;
    }
    get fontIcon() {
        return this._fontIcon;
    }
    get node() {
        return this._node;
    }
    set node(node) {
        this._node = node;
        this._fontSet = 'ajf-icon';
        this._fontIcon = this._getFontIcon(node);
    }
    _getFontIcon(node) {
        if (node == null) {
            return '';
        }
        switch (node.nodeType) {
            case AjfNodeType.AjfField:
                const fieldType = AjfFieldType[node.fieldType];
                return fieldType != null ? `field-${fieldType.toLowerCase()}` : '';
            default:
                const nodeType = AjfNodeType[node.nodeType];
                return nodeType != null ? `node-${nodeType.toLowerCase().replace('ajf', '')}` : '';
        }
    }
    static { this.ɵfac = function AjfNodeIcon_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfNodeIcon)(); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AjfNodeIcon, inputs: { node: "node" } }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfNodeIcon, [{
        type: Directive
    }], null, { node: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1pY29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9ub2RlLWljb24vc3JjL25vZGUtaWNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQVcsWUFBWSxFQUFXLFdBQVcsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdFLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUcvQyxNQUFNLE9BQWdCLFdBQVc7SUFEakM7UUFFVSxhQUFRLEdBQVcsRUFBRSxDQUFDO1FBS3RCLGNBQVMsR0FBVyxFQUFFLENBQUM7S0E2QmhDO0lBakNDLElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBR0QsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFHRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUNELElBQ0ksSUFBSSxDQUFDLElBQXlCO1FBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRU8sWUFBWSxDQUFDLElBQXlCO1FBQzVDLElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ2pCLE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQztRQUNELFFBQVEsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLEtBQUssV0FBVyxDQUFDLFFBQVE7Z0JBQ3ZCLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBWSxJQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzNELE9BQU8sU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3JFO2dCQUNFLE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzVDLE9BQU8sUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDdkYsQ0FBQztJQUNILENBQUM7NEdBbENtQixXQUFXO29FQUFYLFdBQVc7O2lGQUFYLFdBQVc7Y0FEaEMsU0FBUztnQkFpQkosSUFBSTtrQkFEUCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZpZWxkLCBBamZGaWVsZFR5cGUsIEFqZk5vZGUsIEFqZk5vZGVUeXBlfSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtEaXJlY3RpdmUsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmTm9kZUljb24ge1xuICBwcml2YXRlIF9mb250U2V0OiBzdHJpbmcgPSAnJztcbiAgZ2V0IGZvbnRTZXQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZm9udFNldDtcbiAgfVxuXG4gIHByaXZhdGUgX2ZvbnRJY29uOiBzdHJpbmcgPSAnJztcbiAgZ2V0IGZvbnRJY29uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2ZvbnRJY29uO1xuICB9XG5cbiAgcHJpdmF0ZSBfbm9kZTogQWpmTm9kZSB8IHVuZGVmaW5lZDtcbiAgZ2V0IG5vZGUoKTogQWpmTm9kZSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IG5vZGUobm9kZTogQWpmTm9kZSB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuX25vZGUgPSBub2RlO1xuICAgIHRoaXMuX2ZvbnRTZXQgPSAnYWpmLWljb24nO1xuICAgIHRoaXMuX2ZvbnRJY29uID0gdGhpcy5fZ2V0Rm9udEljb24obm9kZSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRGb250SWNvbihub2RlOiBBamZOb2RlIHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcbiAgICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHN3aXRjaCAobm9kZS5ub2RlVHlwZSkge1xuICAgICAgY2FzZSBBamZOb2RlVHlwZS5BamZGaWVsZDpcbiAgICAgICAgY29uc3QgZmllbGRUeXBlID0gQWpmRmllbGRUeXBlWyg8QWpmRmllbGQ+bm9kZSkuZmllbGRUeXBlXTtcbiAgICAgICAgcmV0dXJuIGZpZWxkVHlwZSAhPSBudWxsID8gYGZpZWxkLSR7ZmllbGRUeXBlLnRvTG93ZXJDYXNlKCl9YCA6ICcnO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc3Qgbm9kZVR5cGUgPSBBamZOb2RlVHlwZVtub2RlLm5vZGVUeXBlXTtcbiAgICAgICAgcmV0dXJuIG5vZGVUeXBlICE9IG51bGwgPyBgbm9kZS0ke25vZGVUeXBlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnYWpmJywgJycpfWAgOiAnJztcbiAgICB9XG4gIH1cbn1cbiJdfQ==