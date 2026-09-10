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
import { CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import { AjfFormBuilderNode, AjfFormBuilderNodeEntry, AjfFormBuilderNodeTypeEntry, AjfFormBuilderService } from './form-builder-service';
/**
 * Triggers when a field or slide node is moved or inserted by drag&dropping in the formbuilder.
 * @param event The drop event.
 * @param fbService The AjfFormBuilderService.
 * @param nodeEntry The current nodeEntry, if present.
 * @param content True if the current nodeEntry contains other nodeEntries.
 */
export declare function onDropProcess(event: CdkDragDrop<AjfFormBuilderNodeEntry> | CdkDragDrop<AjfFormBuilderNodeTypeEntry>, fbService: AjfFormBuilderService, nodeEntry: AjfFormBuilderNode | null, content?: boolean): void;
/**
 * Disables the drag&drop of Slide items.
 * @param item The dragged item.
 */
export declare function disableSlideDropPredicate(item: CdkDrag<AjfFormBuilderNodeTypeEntry>): boolean;
/**
 * Disables the drag&drop of Field items.
 * @param item The dragged item.
 */
export declare function disableFieldDropPredicate(item: CdkDrag<AjfFormBuilderNodeTypeEntry>): boolean;
//# sourceMappingURL=form-builder-utils.d.ts.map