/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dino (dino).
 *
 * Dino (dino) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dino (dino) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dino (dino).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {RxDocumentData} from 'rxdb';
import {RxGraphQLReplicationState} from 'rxdb/plugins/replication-graphql';
import {Observable} from 'rxjs';
import {Model} from './model';

/**
 * A collection synchronization state object
 */
export interface ActiveSync<T extends Model = Model> {
  /**
   * The synchronization state
   */
  state: RxGraphQLReplicationState<any, RxDocumentData<T>>;

  /**
   * The synchronized collection name
   */
  collectionName: string;

  /**
   * The state graphql client subscription
   */
  clientRequestSub: {unsubscribe: () => void};

  /**
   * The state received graphql subscription
   */
  stateReceivedSub: {unsubscribe: () => void};

  /**
   * Observable of the activity state.
   * If true, the sync is currenctly active.
   */
  stateActivity: Observable<boolean>;

  /**
   * Whether this replication has sent any document to the backend since it was
   * created.
   *
   * Read to decide whether a non-live cycle needs the second pass that brings
   * pushed documents back as the backend resolved them: a cycle that pushed
   * nothing has nothing to pull back. Measured to be false for every collection
   * on a login, and true only for the one the user actually changed.
   */
  pushedInCycle: boolean;

  /**
   * The subscription recording the pushes in {@link pushedInCycle}.
   */
  sentSub: {unsubscribe: () => void};

  /**
   * Number of resync attempts after a sync failure.
   */
  retrySyncAttempts?: number;
}
