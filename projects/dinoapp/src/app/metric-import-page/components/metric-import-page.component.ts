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

import {ChangeDetectionStrategy, Component, Optional, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AreaManager} from '@dino/core/areas';
import {CaseManager} from '@dino/core/cases';
import {DataModelManager} from '@dino/core/data';
import {LocationManager} from '@dino/core/locations';
import {OrganizationManager} from '@dino/core/organizations';
import {ProjectManager} from '@dino/core/projects';

/**
 * Hosts the metric import wizard, resolving the manager from the metric type
 * declared by the route.
 */
@Component({
  templateUrl: 'metric-import-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MetricImportPageComponent {
  /**
   * The metric being imported, from the route data.
   */
  readonly metricType: string;

  /**
   * The manager of that metric, null when its module is not active.
   */
  readonly metricManager: DataModelManager<any> | null;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    @Optional() area: AreaManager | null,
    @Optional() caseManager: CaseManager | null,
    @Optional() project: ProjectManager | null,
    @Optional() location: LocationManager | null,
    @Optional() organization: OrganizationManager | null,
  ) {
    this.metricType = this._route.snapshot.data['metricType'] ?? '';
    const managers: {[type: string]: DataModelManager<any> | null} = {
      area,
      case: caseManager,
      project,
      location,
      organization,
    };
    this.metricManager = managers[this.metricType] ?? null;
  }

  /**
   * Goes back to the metric list.
   */
  back(): void {
    this._router.navigate(['../'], {relativeTo: this._route});
  }
}
