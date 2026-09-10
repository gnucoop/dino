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
import { AjfAttachmentsOrigin } from '../interface/attachments/attachments-origin';
import { AjfChoicesOrigin } from '../interface/choices/choices-origin';
import { AjfNode } from '../interface/nodes/node';
/**
 * Create an AjfNode by json schema,
 * apply a default value for name
 * throw new error if id,parent or nodeType attribute missed
 */
export declare class AjfNodeSerializer {
    static fromJson(json: Partial<AjfNode>, choicesOrigins?: AjfChoicesOrigin<any>[], attachmentsOrigins?: AjfAttachmentsOrigin<any>[]): AjfNode;
    private static _containerNodeFromJson;
    private static _fieldFromJson;
    private static _fieldNodeLinkFromJson;
    private static _fieldWithChoicesFromJson;
    private static _formulaFieldFromJson;
    private static _nodeGroupFromJson;
    private static _repeatingNodeFromJson;
    private static _repeatingSlideFromJson;
    private static _slideFromJson;
}
//# sourceMappingURL=node-serializer.d.ts.map