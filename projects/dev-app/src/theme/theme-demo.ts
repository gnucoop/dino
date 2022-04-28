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

import {Component, OnDestroy, OnInit} from '@angular/core';
import {ThemeService} from '@dino/material/core';
import {MaterialCssVariablesConfig} from 'angular-material-css-vars';
import {Subscription} from 'rxjs';

@Component({
  selector: 'theme-demo.html',
  templateUrl: 'theme-demo.html',
  styleUrls: ['theme-demo.scss'],
})
export class ThemeDemo implements OnDestroy, OnInit {
  primaryColor = '';
  accentColor = '';
  warnColor = '';
  darkMode: boolean;
  themeConfig = '';

  private _sub = Subscription.EMPTY;

  constructor(private _themeService: ThemeService) {
    this.darkMode = this._themeService.isDark();
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  ngOnInit(): void {
    this._sub = this._themeService.darkModeChange.subscribe(darkMode => {
      this.darkMode = darkMode;
      this._updateThemeConfig();
    });
  }

  setDarkMode(isDark: boolean): void {
    if (this.darkMode === isDark) {
      return;
    }
    this._themeService.setDarkMode(isDark);
    this._updateThemeConfig();
  }

  setPrimaryColor(color: string) {
    this.primaryColor = color;
    this._themeService.setPrimaryColor(color);
    this._updateThemeConfig();
  }

  setAccentColor(color: string) {
    this.accentColor = color;
    this._themeService.setAccentColor(color);
    this._updateThemeConfig();
  }

  setWarnColor(color: string) {
    this.warnColor = color;
    this._themeService.setWarnColor(color);
    this._updateThemeConfig();
  }

  private _updateThemeConfig(): void {
    const theme = {} as MaterialCssVariablesConfig;
    if (this.primaryColor.length > 0) {
      theme.primary = this.primaryColor;
    }
    if (this.accentColor.length > 0) {
      theme.accent = this.accentColor;
    }
    if (this.warnColor.length > 0) {
      theme.warn = this.warnColor;
    }
    theme.isDarkTheme = this.darkMode;
    this.themeConfig = JSON.stringify(theme, null, 2);
  }
}
