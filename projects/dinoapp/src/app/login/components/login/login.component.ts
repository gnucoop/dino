import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {MatSelect} from '@angular/material/select';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {TranslocoService} from '@ajf/core/transloco';
import {ConfigResponse, ConfigService, ConfigSet} from '@dino/core/config';
import {ThemeService} from '@dino/material/core';
import {Observable, Subscription} from 'rxjs';
import {filter, map, mergeMap, startWith, switchMap, tap} from 'rxjs/operators';

import * as conf from '../../conf';
import {environment} from 'src/environments/environment';
import {AuthService} from '@dino/core/auth';
import {ActionTrigger} from '@dino/core/data';
import {OnlineLangManager} from '@dino/core/langs';
import {ActionsService} from 'src/app/actions.service';
import {appVersion, availableLangs} from 'src/app/main-nav/conf';

@Component({
  selector: 'dinoapp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  dynamicConfig: boolean = conf.dynamicConfiguration;
  configurationSets: Observable<ConfigSet[] | null> = new Observable<null>();
  @ViewChild('platformselect') platformSelect: MatSelect | undefined;
  readonly lightLogoPath: string =
    environment.customImagesConfig?.logoBigLight ?? 'assets/icons/logos/dino-login-light.svg';
  readonly darkLogoPath: string =
    environment.customImagesConfig?.logoBigDark ??
    environment.customImagesConfig?.logoBigLight ??
    'assets/icons/logos/dino-login-dark.svg';
  readonly logoImagePath: Observable<string>;
  readonly privacyPolicy: string | null = conf.privacyPolicy;
  readonly fullNameLabel: string | undefined = conf.fullNameLabel;
  readonly showModules: boolean = conf.showLoginModules;
  readonly appVersion: string = appVersion;
  readonly availableLangs: string[] = availableLangs;
  /**
   * The translation keys of the module slots in the active language. A slot whose title
   * is translated as an empty string is left out, so a deployment can present fewer than
   * four modules. The raw translation is read because the transloco pipe shows the key
   * of an empty translation.
   */
  readonly modules: Observable<{title: string; body: string}[]>;

  private _onlineLangsSub: Subscription = Subscription.EMPTY;

  constructor(
    private _router: Router,
    private _actionService: ActionsService,
    @Optional() private _configService: ConfigService | null,
    readonly ts: ThemeService,
    private _transloco: TranslocoService,
    onlineLangManager: OnlineLangManager,
    authService: AuthService,
  ) {
    const slots = [1, 2, 3, 4].map(slot => ({
      title: `login_module_${slot}_title`,
      body: `login_module_${slot}_body`,
    }));
    this.modules = this._transloco.langChanges$.pipe(
      map(lang => {
        const translation = this._transloco.getTranslation(lang) ?? {};
        return slots.filter(slot => translation[slot.title] !== '');
      }),
    );
    // The languages editor is where a deployment sets the texts of this page, and its
    // translations live in the local database, which a device that never logged in does
    // not have. They are fetched online instead, as the public forms do, and only without
    // a token: the request then runs under Hasura's anonymous role, which every deployment
    // has for the public forms, and cannot be answered with a JWT error that would start a
    // token refresh. Without that role Hasura answers `invalid-headers`, which the
    // JWTInterceptor counts as a failed refresh attempt. Offline the query fails silently
    // and the built-in texts stay.
    //
    // Only the active language is fetched, and then each one picked in the selector:
    // the whole table is a dictionary per language, over a megabyte, on the connections
    // the app is used on. A language is asked for once, which also stops the loop the
    // `setActiveLang` that `loadLangs` ends with would otherwise start.
    if (authService.getAuthToken() == null) {
      const fetched = new Set<string>();
      this._onlineLangsSub = onlineLangManager
        .init()
        .pipe(
          switchMap(() => this._transloco.langChanges$),
          filter(lang => !fetched.has(lang)),
          tap(lang => fetched.add(lang)),
          mergeMap(lang => onlineLangManager.loadLangs([lang])),
        )
        .subscribe();
    }
    this.logoImagePath = this.ts.darkModeChange.pipe(
      map(isdark => {
        if (isdark) {
          return this.darkLogoPath;
        } else {
          return this.lightLogoPath;
        }
      }),
      startWith(this.ts.isDark() ? this.darkLogoPath : this.lightLogoPath),
    );
  }

  ngOnInit(): void {
    if (this._configService != null && this.dynamicConfig) {
      this.configurationSets = this._configService.getConfigs(this.setupCpaConfig).pipe(
        map(configResp => {
          if (configResp != null) {
            return configResp.configSets;
          }
          return null;
        }),
      );
    }
  }

  ngAfterViewInit(): void {
    if (this._configService != null && this.platformSelect != undefined && this.dynamicConfig) {
      this.platformSelect.valueChange.subscribe(confSet => {
        if (this._configService != null) {
          this._configService.configurationSet.next(confSet);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this._onlineLangsSub.unsubscribe();
  }

  setupCpaConfig(apiConfig: {instances: [{[key: string]: any}]}): ConfigResponse {
    const confSets: ConfigSet[] = [];
    for (let instance of apiConfig.instances) {
      const instanceName = instance.name.toLowerCase().replace(' ', '_');
      const confSet: ConfigSet = {
        name: instance.name,
        authConfig: {
          host: instance.host_url,
          applicationId: '',
          apiKey: null,
          userCredential: 'email',
          loginEndpoint: `api/auth/login`,
          logoutEndpoint: `api/auth/logout`,
          refreshEndpoint: `api/auth/refresh`,
          retryRefreshTime: 5000,
          userAuthInfo: `user_id`,
          authTokenLocalStorageKey: `${instanceName}_auth_token`,
          refreshTokenLocalStorageKey: `${instanceName}_refresh_token`,
          userInfoLocalStorageKey: `cpa_user_id`,
          failedAuthRedirect: 'login',
          retryAttemptsMax: 1,
        },
        dataConfig: {
          databaseCreateOptions: {
            name: `dewco_${instanceName}_db`,
            adapter: 'idb',
            ignoreDuplicate: true,
          },
          syncOptions: {
            url: `${instance.api_url}hasura/v1/graphql`,
            wsUrl: `${instance.api_url.replace('https', 'wss')}hasura/v1/graphql`,
            authErrorMessage: 'Could not verify JWT: JWTExpired',
          },
        },
        additionalConfig: {
          fillform_url: `${instance.fillform_url}`,
          powerbi_url: `${instance.powerbi_url}`,
        },
      };
      confSets.push(confSet);
    }
    const confResp: ConfigResponse = {
      configSets: confSets,
    };
    return confResp;
  }

  postLogin() {
    this._router.navigate(['dashboard']);
  }

  postSignup(snackBar?: MatSnackBar, emailAddress?: string) {
    if (snackBar && emailAddress) {
      snackBar.open(
        `An Email has been sent to ${emailAddress}. Please verify your Email to access Dino`,
        'EMAIL VERIFICATION SENT',
        {
          duration: 10000,
        },
      );
    }
  }

  processActionTrigger<T>(trigger: ActionTrigger<T>) {
    this._actionService.processTrigger(trigger);
  }
}
