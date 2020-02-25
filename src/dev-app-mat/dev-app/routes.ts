/**
 * @license
 * Copyright (C) 2020 Gnucoop soc. coop.
 *
 * This file is part of the Dewco (dewco).
 *
 * Dewco (dewco) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dewco (dewco) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dewco (dewco).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {Routes} from '@angular/router';
import {DevApp404} from './dev-app-404';
import {DevAppHome} from './dev-app-home';

export const DEV_APP_ROUTES: Routes = [
  {path: '', component: DevAppHome},
  {
    path: 'location-input',
    loadChildren: 'location-input/location-input-demo-module#LocationInputDemoModule'
  },
  {
    path: 'location-selector',
    loadChildren: 'location-selector/location-selector-demo-module#LocationSelectorDemoModule'
  },
  {
    path: 'time-selector',
    loadChildren: 'time-selector/time-selector-demo-module#TimeSelectorDemoModule'
  },
  {
    path: 'dashboard',
    loadChildren: 'dashboard/dashboard-demo-module#DashboardDemoModule'
  },
  {path: 'examples', loadChildren: 'examples-page/examples-page-module#ExamplesPageModule'},
  {path: '**', component: DevApp404},
];
