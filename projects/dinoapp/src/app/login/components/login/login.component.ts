import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
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
import {Observable, of as obsOf} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import * as conf from '../../conf';
import {environment} from 'src/environments/environment';
import {ActionTrigger} from '@dino/core/data';
import {LocalizedText} from 'src/environments/environment-interface';
import {ActionsService} from 'src/app/actions.service';
import {appVersion, availableLangs} from 'src/app/main-nav/conf';

@Component({
  selector: 'dinoapp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, AfterViewInit {
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
   * The built-in Dino modules introduced next to the sign-in card, as translation keys.
   */
  readonly modules: {title: string; body: string}[] = [
    {title: 'Forms', body: 'Design questionnaires and collect responses.'},
    {title: 'Reports', body: 'Present results as tables and charts.'},
    {title: 'Aggregation', body: 'Combine and query data across forms.'},
    {title: 'Metrics', body: 'Define indicators and track them over time.'},
  ];

  /**
   * The introduction texts set in the environment, in the active language; null where
   * none is set, and the template falls back to the built-in translated text.
   */
  readonly kicker: Observable<string | null>;
  readonly title: Observable<string | null>;
  readonly description: Observable<string | null>;
  /**
   * The module list set in the environment, or null to show the built-in one.
   */
  readonly customModules: Observable<{title: string; body: string}[]> | null;

  constructor(
    private _router: Router,
    private _actionService: ActionsService,
    @Optional() private _configService: ConfigService | null,
    readonly ts: ThemeService,
    private _transloco: TranslocoService,
  ) {
    const page = conf.loginPage;
    this.kicker = this._localized(page.kicker);
    this.title = this._localized(page.title);
    this.description = this._localized(page.description);
    const modules = page.modules;
    this.customModules =
      modules != null && modules.length > 0
        ? this._transloco.langChanges$.pipe(
            map(lang =>
              modules.map(module => ({
                title: this._pick(module.title, lang) ?? '',
                body: this._pick(module.body, lang) ?? '',
              })),
            ),
          )
        : null;
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

  /**
   * A configured text in the active language, following each language change.
   * @param text The text per language, or undefined when the environment sets none
   */
  private _localized(text: LocalizedText | undefined): Observable<string | null> {
    if (text == null) {
      return obsOf(null);
    }
    return this._transloco.langChanges$.pipe(map(lang => this._pick(text, lang)));
  }

  /**
   * The text for a language: that language's, else the default language's, else the first given.
   * @param text The text per language
   * @param lang The Dino language code, eg. 'ITA'
   */
  private _pick(text: LocalizedText, lang: string): string | null {
    return text[lang] ?? text[conf.defaultLanguage] ?? Object.values(text)[0] ?? null;
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
