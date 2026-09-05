import {ChangeDetectionStrategy} from '@angular/core';
import {Component, ViewEncapsulation} from '@angular/core';
import {PermissionContextService} from '@dino/core/data';
import {AuthService} from '@dino/core/auth';
import {Section} from '@dino/material/main-nav';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import * as conf from '../conf';
import {ThemeService} from '@dino/material/core';
import {headerLogo, loadingSpinner, logoMark, themedImagePath} from '../../themed-images';

@Component({
  selector: 'dinoapp-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MainNavComponent {
  customLanguages = conf.availableLangs;
  logoutDisabled: boolean = environment.dataConfig.backendless ?? false;
  linkIcons = conf.linkIcons;
  sections: Observable<Section[]>;
  adminSections: Section[];
  adminRoles: string[] = environment.usersConfig.adminRoles ?? ['admin'];
  initializationScreenMaxDuration: number | undefined =
    environment.dataConfig.initializationScreenMaxDuration;
  barButtonsDisabled: Observable<boolean> = this._authService.authenticated.pipe(
    map(evt => !evt.auth),
  );
  // The lockup for the brand row, the bare mark for the collapsed rail that cannot fit it.
  readonly lightLogoPath: string = headerLogo.light;
  readonly lightMarkPath: string = logoMark.light;
  readonly lightSpinnerPath: string = loadingSpinner.light;

  readonly customSvgIcons = conf.customSvgIcons;
  readonly initialExtendedSidenav: boolean = conf.initialExtendedSidenav;
  readonly appVersion: string = conf.appVersion;
  readonly userSectionsLabel: string = conf.userSectionsLabel;
  readonly adminSectionsLabel: string = conf.adminSectionsLabel;
  readonly logoImagePath: Observable<string>;
  readonly logoMarkPath: Observable<string>;
  readonly spinnerImagePath: Observable<string>;

  constructor(
    pcs: PermissionContextService,
    private _authService: AuthService,
    private _ts: ThemeService,
  ) {
    this.sections = conf.getSections(pcs);
    this.adminSections = conf.adminSections;
    this.logoImagePath = themedImagePath(this._ts, headerLogo);
    this.logoMarkPath = themedImagePath(this._ts, logoMark);
    this.spinnerImagePath = themedImagePath(this._ts, loadingSpinner);
  }
}
