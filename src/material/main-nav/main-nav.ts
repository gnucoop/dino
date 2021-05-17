/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
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

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AuthService} from '@dewco/core/auth';
import {BreakpointObserverService} from '@dewco/material/breakpoint-observer';
import {BehaviorSubject, Subscription} from 'rxjs';
import {tap, withLatestFrom} from 'rxjs/operators';

import {Section} from './section-interface';

/**
 * Dino Main component, containing the toolbar and the sidebar navigation.
 */
@Component({
  selector: 'dewco-main-nav',
  templateUrl: 'main-nav.html',
  styleUrls: ['main-nav.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MainNav implements AfterViewInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;

  /**
   * Sets the loading state, and shows the Loading animation.
   * Gets triggered by the output 'isLoading' event of the component rendered in the
   * router outlet.
   * @param elementRef A reference to the rendered component
   */
  onRouterOutletLoading(elementRef: any) {
    if (elementRef.isLoading) {
      elementRef.isLoading.subscribe({next: (res: boolean) => this.isLoading.next(res)});
    }
  }

  /**
   * The loading state of the component rendered in the router outlet
   */
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Determines the extended state of the sidenav on large screens
   */
  extendedSidenav: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Event emitted when the sidenav menu is toggled
   */
  private _menuToggleEvt: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Event emitted when a sidenav menu section is clicked
   */
  private _menuClickEvt: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Subscribes to the the menu toggle event and performs the appropriate
   * action on the sidenav.
   */
  private _menuToggleSub: Subscription = Subscription.EMPTY;

  /**
   * Subscribes to the the menu click event and performs the appropriate
   * action on the sidenav.
   */
  private _menuClickSub: Subscription = Subscription.EMPTY;

  /**
   * A list of all sections in the Dino app.
   */
  private _sections: Section[];
  get sections(): Section[] {
    return this._sections;
  }
  @Input()
  set sections(sec: Section[]) {
    if (sec == null) {
      return;
    }
    this._sections = sec;
  }

  /**
   * A flag to show or hide section labels in the sidenav.
   */
  private _showNavLabels: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get showNavLabels(): BehaviorSubject<boolean> {
    return this._showNavLabels;
  }
  @Input()
  set setShowNavLabels(opened: boolean) {
    this._showNavLabels.next(opened);
  }

  /**
   * The Toolbar logo image path/url.
   */
  private _logoImagePath: string;
  get logoImagePath(): string {
    return this._logoImagePath;
  }
  @Input()
  set logoImagePath(url: string) {
    this._logoImagePath = url;
  }

  constructor(
      readonly breakpointObserver: BreakpointObserverService,
      readonly authService: AuthService,
      readonly snackbar: MatSnackBar,
      private _router: Router,
  ) {}

  ngAfterViewInit() {
    this._menuToggleSub = this._menuToggleEvt
                              .pipe(
                                  withLatestFrom(this.breakpointObserver.large),
                                  tap(([_, res]) => {
                                    if (res) {
                                      const currentState = this.extendedSidenav.getValue();
                                      this.extendedSidenav.next(!currentState);
                                    } else {
                                      this.sidenav.toggle();
                                    }
                                  }),
                                  )
                              .subscribe();

    this._menuClickSub = this._menuClickEvt
                             .pipe(
                                 withLatestFrom(this.breakpointObserver.large),
                                 tap(([_, res]) => {
                                   if (!res) {
                                     this._menuToggleEvt.emit();
                                   }
                                 }),
                                 )
                             .subscribe();
  }

  menuToggle(): void {
    this._menuToggleEvt.emit();
  }

  menuClick(): void {
    this._menuClickEvt.emit();
  }

  /**
   * User logout method.
   */
  logout(): void {
    const sub = this.authService.logout().subscribe(res => {
      if (res) {
        if (sub) {
          sub.unsubscribe();
        }
        this.snackbar.open('Successfully logged out', 'LOGOUT', {duration: 5000});
        this._router.navigate(['']);
      }
    });
  }

  ngOnDestroy() {
    this._menuClickSub.unsubscribe();
    this._menuToggleSub.unsubscribe();
  }
}
