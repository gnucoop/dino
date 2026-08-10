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
import {ThemeService} from '@dino/material/core';
import {Observable} from 'rxjs';
import {shareReplay, startWith} from 'rxjs/operators';

/**
 * A segmented light/dark theme control: two adjacent buttons, the active one highlighted.
 *
 * Replaces the slide toggle that used to live in the top toolbar, and is shared with the
 * login page so the two stay in sync.
 */
@Component({
  selector: 'dino-theme-switch',
  templateUrl: 'theme-switch.html',
  styleUrls: ['theme-switch.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ThemeSwitch {
  /**
   * True while the dark theme is active. Tracks changes made anywhere in the app
   * (the User Area dialog also toggles the theme).
   */
  readonly isDark: Observable<boolean>;

  constructor(readonly ts: ThemeService) {
    this.isDark = this.ts.darkModeChange.pipe(startWith(this.ts.isDark()), shareReplay(1));
  }

  /**
   * Applies the light or dark theme.
   * @param dark True to switch to the dark theme
   */
  setDarkMode(dark: boolean): void {
    if (this.ts.isDark() === dark) {
      return;
    }
    this.ts.setDarkMode(dark);
  }
}
