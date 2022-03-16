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

import {Component, ViewEncapsulation} from '@angular/core';
import {SyncManager} from '@dino/core/sync';

/** Root component for the e2e-app demos. */
@Component({
  selector: 'e2e-app',
  template: '<app-main><router-outlet></router-outlet></app-main>',
  styles: ['body, html { height: 100%; width: 100%; } e2e-app { display: block; height: 100%; }'],
  encapsulation: ViewEncapsulation.None,
})
export class E2eApp {
  constructor(private _sync: SyncManager) {
    this._sync.initializeCollections().subscribe();
  }
}
