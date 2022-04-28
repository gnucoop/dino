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

import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormSchemaManager} from '@dino/core/forms';
import {ReportSchemaManager} from '@dino/core/reports';
import {combineLatest, Observable, of as obsOf, zip} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {Breadcrumb, ParamBreadcrumb} from './breadcrumb';

/**
 * Dino Breadcrumbs component.
 * Handles and updates the displayed breadcrumbs to navigate the app.
 */
@Component({
  selector: 'dino-breadcrumbs',
  templateUrl: 'breadcrumbs.html',
  styleUrls: ['breadcrumbs.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BreadCrumbs {
  /**
   * The current Breadcrumbs objects.
   * The breadcrumbs array is populated by checking the route
   * pathFromRoot for breadcrumbs in the routes data, and possibly replacing
   * the parametrical crumbs with actual ones (eg. form schema or report schema)
   */
  breadcrumbs: Observable<Breadcrumb[]>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _fsm: FormSchemaManager,
    private _rsm: ReportSchemaManager,
  ) {
    this.breadcrumbs = combineLatest([
      zip(
        this._route.pathFromRoot.map(actRoute =>
          actRoute.data.pipe(map(data => data['breadcrumbs'] as Breadcrumb[])),
        ),
      ),
      this._route.params,
    ]).pipe(
      switchMap(([routeCrumbs, routeParams]) => {
        const filteredRouteCrumbs = routeCrumbs.filter(rc => rc != null);
        const flatRouteCrumbs = filteredRouteCrumbs.flat(1);
        let paramCrumb: Observable<ParamBreadcrumb | null> = obsOf(null);
        if (routeParams['form_schema_id'] != null) {
          paramCrumb = this._fsm.get(routeParams['form_schema_id']).pipe(
            map(schema =>
              schema && schema.label
                ? {
                    param_label: ':form_schema_id',
                    crumb: {
                      label: schema.label,
                      url: `forms/${routeParams['form_schema_id']}`,
                      icon: schema.icon,
                    },
                  }
                : null,
            ),
          );
        } else if (routeParams['report_schema_id'] != null) {
          paramCrumb = this._rsm.get(routeParams['report_schema_id']).pipe(
            map(schema =>
              schema && schema.label
                ? {
                    param_label: ':report_schema_id',
                    crumb: {
                      label: schema.label,
                      url: `reports/${routeParams['report_schema_id']}`,
                      icon: schema.icon,
                    },
                  }
                : null,
            ),
          );
        }
        return combineLatest([obsOf(flatRouteCrumbs), paramCrumb]);
      }),
      map(([routeCrumbs, paramCrumb]) => {
        if (routeCrumbs == null) {
          return [];
        }
        const populatedCrumbs = routeCrumbs.map(crumb => {
          if (crumb.parametrical) {
            if (paramCrumb && crumb.label === paramCrumb.param_label) {
              return paramCrumb.crumb;
            }
            return null;
          }
          return crumb;
        });
        const finalCrumbs: Breadcrumb[] = populatedCrumbs.filter(cr => cr != null) as Breadcrumb[];
        return finalCrumbs;
      }),
    );
  }

  /**
   * Navigates to the breadcrumb url
   * @param url
   */
  crumbNavigate(url: string | undefined): void {
    if (url == null) {
      return;
    }
    this._router.navigateByUrl(url);
  }
}
