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

/**
 * Model of a single Breadcrumb object for Breadcrumbs component
 */
export interface Breadcrumb {
  /**
   * The Breadcrumb displayed name
   */
  label: string;
  /**
   * The Breadcrumb route url
   */
  url?: string;
  /**
   * The optional Breadcrumb icon string identifier
   */
  icon?: string;
  /**
   * If true, the Breadcrumb is a parametric one and must
   * be replaced with some data provided from the component
   * the Breacrumbs is projected in.
   */
  parametrical?: boolean;
}

/**
 * A Breadcrumb passed by a component to replace
 * a parameterical route breadcrumb.
 */
export interface ParamBreadcrumb {
  /**
   * The label of the parametrical Breadcrumb to be replaced
   */
  param_label: string;
  /**
   * The new Breadcrumb
   */
  crumb: Breadcrumb;
}
