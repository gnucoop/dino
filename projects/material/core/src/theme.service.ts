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
import {BehaviorSubject} from 'rxjs';
import {DinoTheme} from './theme-interface';

@Injectable({providedIn: 'root'})
export class ThemeService {
  readonly darkModeChange = new EventEmitter<boolean>();
  readonly primaryColorChange = new EventEmitter<string>();
  readonly accentColorChange = new EventEmitter<string>();
  readonly warnColorChange = new EventEmitter<string>();
  readonly currentTheme: BehaviorSubject<DinoTheme | null> = new BehaviorSubject<DinoTheme | null>(
    null,
  );
  get currentThemeVal(): DinoTheme | null {
    return this.currentTheme.getValue();
  }

  constructor(private _service: MaterialCssVarsService) {
    this.setDarkMode(false);
    this.loadDinoTheme();
    this.setDefaultTheme();
  }

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

  /**
   * Set all colors of a theme
   * @param theme The theme to be set
   */
  setTheme(theme: DinoTheme): void {
    if (theme == null) {
      return;
    }
    this.setPrimaryColor(theme.primary);
    this.setAccentColor(theme.accent);
    this.setWarnColor(theme.warning);
  }

  /**
   * Sets the default (current) theme
   */
  setDefaultTheme(): void {
    const currentTheme: DinoTheme = {
      primary: this._service.primary,
      accent: this._service.accent,
      warning: this._service.warn,
      presetName: 'Default Theme',
    };
    if (currentTheme.primary && currentTheme.accent && currentTheme.warning) {
      localStorage.setItem('dino_theme_default', btoa(JSON.stringify(currentTheme)));
      this.currentTheme.next(currentTheme);
    }
  }

  /**
   * Loads a Dino Theme preset from the localStorage. If no preset name is specified,
   * the default theme (the last saved) will be loaded.
   * @param themeName The name of the theme preset
   * @returns The theme preset or null if the loading failed
   */
  loadDinoTheme(themeName?: string): DinoTheme | null {
    const themePresetString: string | null = localStorage.getItem(
      `dino_theme_${themeName ?? 'default'}`,
    );
    if (themePresetString) {
      const themePreset: DinoTheme = JSON.parse(atob(themePresetString));
      this.setTheme(themePreset);
      this.setDefaultTheme();
      return themePreset;
    }
    return null;
  }

  /**
   * Saves a Dino Theme preset in the localStorage.
   * @param themeName The name of the theme preset
   * @param theme The dino theme object
   */
  saveDinoTheme(theme: DinoTheme) {
    if (theme == null) {
      return;
    }
    const themePresetName = `dino_theme_${theme.presetName}`;
    localStorage.setItem(themePresetName, btoa(JSON.stringify(theme)));
    this.setDefaultTheme();
  }
}
