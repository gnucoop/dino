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
import {ConfigResponse, ConfigService, ConfigSet} from '@dino/core/config';
import {ThemeService} from '@dino/material/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import * as conf from '../../conf';
import {environment} from 'src/environments/environment';
import {ActionTrigger} from '@dino/core/data';
import {ActionsService} from 'src/app/actions.service';

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

  constructor(
    private _router: Router,
    private _actionService: ActionsService,
    @Optional() private _configService: ConfigService | null,
    readonly ts: ThemeService,
  ) {
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

  setDarkTheme(evt: boolean) {
    this.ts.setDarkMode(evt);
  }

  processActionTrigger<T>(trigger: ActionTrigger<T>) {
    this._actionService.processTrigger(trigger);
  }
}
