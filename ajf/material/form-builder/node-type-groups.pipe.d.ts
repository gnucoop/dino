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
import { PipeTransform } from '@angular/core';
import { AjfFormBuilderNodeTypeEntry } from './form-builder-service';
import * as i0 from "@angular/core";
/**
 * A group of node types of the palette, rendered under a common header.
 */
export interface AjfFormBuilderNodeTypeGroup {
    /**
     * The translation key of the group header. Empty for the group of the entries
     * that have no category, which is rendered without a header.
     */
    category: string;
    nodeTypes: AjfFormBuilderNodeTypeEntry[];
}
/**
 * Groups the node types of the palette by category, keeping the categories in
 * the order of their first entry. Applied after the search filter, so that the
 * categories left without entries produce no header.
 */
export declare class NodeTypeGroupsPipe implements PipeTransform {
    transform(nodeTypes: AjfFormBuilderNodeTypeEntry[]): AjfFormBuilderNodeTypeGroup[];
    static ɵfac: i0.ɵɵFactoryDeclaration<NodeTypeGroupsPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<NodeTypeGroupsPipe, "nodeTypeGroups", false>;
}
//# sourceMappingURL=node-type-groups.pipe.d.ts.map