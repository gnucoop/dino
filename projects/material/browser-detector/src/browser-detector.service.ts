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
import {DeviceDetectorService, DeviceInfo} from 'ngx-device-detector';

/**
 * Service that checks the Browser and Device
 */
@Injectable({providedIn: 'root'})
export class BrowserDetectorService {
  constructor(private _deviceService: DeviceDetectorService) {}
  getBrowserName(): string {
    return this._deviceService.browser;
  }
  getDeviceInfo(): DeviceInfo {
    return this._deviceService.getDeviceInfo();
  }
  getDevice(): string {
    return this._deviceService.device;
  }
  getDeviceScreenType(): {desktop: boolean; mobile: boolean; tablet: boolean} {
    return {desktop: this.isDesktop(), mobile: this.isMobile(), tablet: this.isTablet()};
  }
  isMobile(): boolean {
    return this._deviceService.isMobile();
  }
  isDesktop(): boolean {
    return this._deviceService.isDesktop();
  }
  isTouch(): boolean {
    return this.isMobile() || this.isTablet() || this.isTouchPointer();
  }
  isTablet(): boolean {
    return this._deviceService.isTablet();
  }
  getUserAgent(): string {
    return this._deviceService.userAgent;
  }
  getOS(): string {
    return this._deviceService.os;
  }
  isTouchPointer() {
    return matchMedia('(pointer: coarse)').matches;
  }
}
