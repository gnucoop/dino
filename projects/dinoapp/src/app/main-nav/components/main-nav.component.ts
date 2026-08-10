import {ChangeDetectionStrategy} from '@angular/core';
import {Component, ViewEncapsulation} from '@angular/core';
import {PermissionContextService} from '@dino/core/data';
import {AuthService} from '@dino/core/auth';
import {Section} from '@dino/material/main-nav';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import * as conf from '../conf';
import {ThemeService} from '@dino/material/core';

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
  backupRestore: boolean = environment.dataConfig.backupRestore ?? false;
  linkIcons = conf.linkIcons;
  sections: Observable<Section[]>;
  adminSections: Section[];
  adminRoles: string[] = environment.usersConfig.adminRoles ?? ['admin'];
  initializationScreenMaxDuration: number | undefined =
    environment.dataConfig.initializationScreenMaxDuration;
  barButtonsDisabled: Observable<boolean> = this._authService.authenticated.pipe(
    map(evt => !evt.auth),
  );
  readonly lightLogoPath: string =
    environment.customImagesConfig?.logoLight ?? 'assets/icons/logos/dino-bar-logo-light.svg';
  readonly darkLogoPath: string =
    environment.customImagesConfig?.logoDark ??
    environment.customImagesConfig?.logoLight ??
    'assets/icons/logos/dino-bar-logo-light.svg';
  readonly lightSpinnerPath: string =
    environment.customImagesConfig?.spinnerLight ?? 'assets/icons/logos/dino-spinner-light.svg';
  readonly darkSpinnerPath: string =
    environment.customImagesConfig?.spinnerDark ??
    environment.customImagesConfig?.spinnerLight ??
    'assets/icons/logos/dino-spinner-dark.svg';

  readonly customSvgIcons = conf.customSvgIcons;
  readonly initialExtendedSidenav: boolean = conf.initialExtendedSidenav;
  readonly appVersion: string = conf.appVersion;
  readonly userSectionsLabel: string = conf.userSectionsLabel;
  readonly adminSectionsLabel: string = conf.adminSectionsLabel;
  readonly logoImagePath: Observable<string>;
  readonly spinnerImagePath: Observable<string>;

  constructor(
    pcs: PermissionContextService,
    private _authService: AuthService,
    private _ts: ThemeService,
  ) {
    this.sections = conf.getSections(pcs);
    this.adminSections = conf.adminSections;
    this.logoImagePath = this._ts.darkModeChange.pipe(
      map(isdark => {
        if (isdark) {
          return this.darkLogoPath;
        } else {
          return this.lightLogoPath;
        }
      }),
      startWith(this._ts.isDark() ? this.darkLogoPath : this.lightLogoPath),
    );
    this.spinnerImagePath = this._ts.darkModeChange.pipe(
      map(isdark => {
        if (isdark) {
          return this.darkSpinnerPath;
        } else {
          return this.lightSpinnerPath;
        }
      }),
      startWith(this._ts.isDark() ? this.darkSpinnerPath : this.lightSpinnerPath),
    );
  }
}
