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

import {Inject, Injectable, isDevMode} from '@angular/core';
import {IStepOption, TourService} from 'ngx-ui-tour-md-menu';
import {UI_TOUR_SERVICE_CONFIG, UITourConfig} from './ui-tour-config';
import {BehaviorSubject, Subscription} from 'rxjs';

/**
 * Service that provides a list of all available Material Icons code identifiers
 */
@Injectable({providedIn: 'root'})
export class UITourService {
  /**
   * The Tour steps
   */
  private _tourSteps: IStepOption[];
  /**
   * The Default Tour step options
   */
  private _defaultTourStepOptions?: IStepOption;
  /**
   * True if the UI Tour is currently ongoing
   */
  readonly isTourOngoing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Subscribes to all UI Tour events
   */
  private _tourEventsSubscription: Subscription = Subscription.EMPTY;

  constructor(
    @Inject(UI_TOUR_SERVICE_CONFIG) private _uiTourConfig: UITourConfig,
    private _tourService: TourService,
  ) {
    this._tourSteps = this._uiTourConfig.tourSteps;
    this._defaultTourStepOptions = this._uiTourConfig.defaultStepOptions;
    if (this._uiTourConfig.tourActive && !this._skipTour()) {
      this._initialize();
    }
  }

  /**
   * Initializes the UI Tour
   */
  private _initialize() {
    this._tourEventsSubscription = this._tourService.events$.subscribe(event => {
      if (!event) return;
      if (isDevMode()) {
        console.log('UI-TOUR', event);
      }
      switch (event.name) {
        case 'start':
          this.isTourOngoing.next(true);
          break;
        case 'end':
          this.isTourOngoing.next(false);
          this._setTourDoneToken();
          this._tourEventsSubscription.unsubscribe();
          break;
        default:
          break;
      }
    });
    const tourStepOptions: IStepOption = {
      enableBackdrop: true,
      ...this._defaultTourStepOptions,
    };
    this._tourService.initialize(this._tourSteps, tourStepOptions);
  }

  /**
   * Starts the tour
   * @param force If true, the tour is started regardless of the tour done token's presence
   */
  start(force: boolean = false) {
    if ((this._skipTour() && !force) || !this._uiTourConfig.tourActive) return;
    if (force) {
      this._initialize();
    }
    this._tourService.start();
  }

  /**
   * Adds a "tourDone" token to the local storage.
   * This will prevent the starting of the UI Tour on the next app load.
   */
  private _setTourDoneToken(): void {
    localStorage.setItem('dino_UI_tour_done', 'true');
  }

  /**
   * Checks if "tourDone" token is found in the local storage.
   * If it is, returns true (the UI tour is skipped)
   */
  private _skipTour(): boolean {
    const token = localStorage.getItem('dino_UI_tour_done');
    return token != null;
  }
}
