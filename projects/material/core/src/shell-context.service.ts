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

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

/**
 * The navigation context of the currently displayed route.
 */
export interface ShellContext {
  /**
   * The label of the navigation group the current section belongs to
   * ('User' or 'Administration' by default).
   */
  groupLabel: string;

  /**
   * True when the current section is an Admin only section.
   */
  isAdminSection: boolean;
}

/**
 * Shares the current navigation context between the app shell (which knows which
 * sidenav section is active) and the page header (which renders the section group
 * as the page overline).
 *
 * The two live in separate component trees: the shell owns the section arrays, while
 * the page header resolves its crumbs from `ActivatedRoute.pathFromRoot`. Pages whose
 * route has a single breadcrumb have no parent crumb to show as an overline, so they
 * fall back to the group label published here.
 */
@Injectable({providedIn: 'root'})
export class ShellContextService {
  readonly context: BehaviorSubject<ShellContext | null> =
    new BehaviorSubject<ShellContext | null>(null);

  /**
   * Publishes the navigation context of the current route.
   * @param context The context, or null when no known section is active
   */
  setContext(context: ShellContext | null): void {
    this.context.next(context);
  }
}
