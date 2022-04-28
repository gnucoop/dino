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

import {BaseDataModelManager} from './base-data-model-manager';
import {PermissionContextService} from './data-context-service';
import {DataCreateCollectionRequest} from './data-create-collection-request';
import {IDataModelManager} from './data-model-manager-interface';
import {Permission} from './data-permission';
import {Model} from './model';
import {OnlineDataService} from './online-data-service';

/**
 * This class will manage the data model, providing basic and generic Crud methods
 * to all services extending it.
 * All the operations will be performed on the remote database table named as _modelName,
 * provided in the OnlineDataModelManager constructor.
 */
export abstract class OnlineDataModelManager<T extends Model = Model>
  extends BaseDataModelManager<T, T>
  implements IDataModelManager<T, T>
{
  /**
   * The data manager to get details in an expandable list
   */
  override detailsManager?: OnlineDataModelManager<any>;

  constructor(
    createParams: DataCreateCollectionRequest,
    dataService: OnlineDataService,
    contextService: PermissionContextService,
    permissions: Permission[] = [],
  ) {
    super(createParams, dataService, contextService, permissions);
  }
}
