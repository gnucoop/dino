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

import {EventEmitter, Injectable} from '@angular/core';
import {MaterialCssVarsService} from 'angular-material-css-vars';

@Injectable({providedIn: 'root'})
export class ThemeService {
  readonly darkModeChange = new EventEmitter<boolean>();
  readonly primaryColorChange = new EventEmitter<string>();
  readonly accentColorChange = new EventEmitter<string>();
  readonly warnColorChange = new EventEmitter<string>();

  constructor(private _service: MaterialCssVarsService) {}

  isDark(): boolean {
    return this._service.isDarkTheme === true;
  }

  setDarkMode(isDark: boolean): void {
    this._service.setDarkTheme(isDark);
    this.darkModeChange.emit(isDark);
  }

  setPrimaryColor(color: string): void {
    this._service.setPrimaryColor(color);
    this.primaryColorChange.emit(color);
  }

  setAccentColor(color: string): void {
    this._service.setAccentColor(color);
    this.accentColorChange.emit(color);
  }

  setWarnColor(color: string): void {
    this._service.setWarnColor(color);
    this.warnColorChange.emit(color);
  }
}
