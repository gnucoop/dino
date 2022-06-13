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

import {DeepReadonlyObject, RxDocument} from 'rxdb';

import {BaseDataModelManager} from './base-data-model-manager';
import {PermissionContextService} from './data-context-service';
import {
  DataCreateCollectionRequest,
  PullQueryContextChecks,
} from './data-create-collection-request';
import {IDataModelManager} from './data-model-manager-interface';
import {Permission} from './data-permission';
import {DataService} from './data-service';
import {IDataService} from './data-service-interface';
import {Model} from './model';

/**
 * This class will manage the data model, providing basic and generic Crud methods
 * to all services extending it.
 * All the operations will be performed on the RxDb collection named as _modelName,
 * provided in the DataModelManager constructor.
 */
export abstract class DataModelManager<T extends Model = Model>
  extends BaseDataModelManager<T, RxDocument<T>>
  implements IDataModelManager<T, RxDocument<T>>
{
  /**
   * The data manager to get details in an expandable list
   */
  override detailsManager?: DataModelManager<any>;

  constructor(
    createParams: DataCreateCollectionRequest,
    dataService: DataService,
    contextService: PermissionContextService,
    permissions: Permission[] = [],
    pullQueryContextChecks?: PullQueryContextChecks,
  ) {
    super(
      createParams,
      dataService as IDataService,
      contextService,
      permissions,
      pullQueryContextChecks,
    );
  }

  protected override _objectToJSON(obj: RxDocument<T, {}>): DeepReadonlyObject<T> {
    return obj.toJSON() as DeepReadonlyObject<T>;
  }
}
