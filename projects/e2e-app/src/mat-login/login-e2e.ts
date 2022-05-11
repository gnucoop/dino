import {AfterViewInit, Component, OnInit, Optional, ViewChild} from '@angular/core';
import {MatSelect} from '@angular/material/select';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {ConfigResponse, ConfigService, ConfigSet} from '@dino/core/config';
import {Observable, of as obsOf} from 'rxjs';
import {map} from 'rxjs/operators';

import {additionalConfig} from '../mockconfig';

@Component({
  selector: 'app-login-e2e',
  templateUrl: 'login-e2e.html',
})
export class MatLoginE2E implements OnInit, AfterViewInit {
  dynamicConfig: boolean = additionalConfig.dynamicConfiguration;
  configurationSets: Observable<ConfigSet[] | null> = obsOf(null);
  @ViewChild('platformselect') platformSelect: MatSelect | undefined;

  constructor(private _router: Router, @Optional() private _configService: ConfigService | null) {}

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
      const instanceName = instance['name'].toLowerCase().replace(' ', '_');
      const confSet: ConfigSet = {
        name: instance['name'],
        authConfig: {
          host: instance['host_url'],
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
            name: `dino_${instanceName}_db`,
            adapter: 'idb',
            ignoreDuplicate: true,
          },
          syncOptions: {
            url: `${instance['api_url']}hasura/v1/graphql`,
            wsUrl: `${instance['api_url'].replace('https', 'wss')}hasura/v1/graphql`,
            authErrorMessage: 'Could not verify JWT: JWTExpired',
          },
        },
        additionalConfig: {
          fillform_url: `${instance['fillform_url']}`,
          powerbi_url: `${instance['powerbi_url']}`,
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

  changeTheme(changeEvt: MatSlideToggleChange) {
    const themeAsset: HTMLLinkElement = document.getElementById('themeAsset') as HTMLLinkElement;

    if (themeAsset != null) {
      themeAsset.href = changeEvt.checked ? `e2e_alt_theme.css` : `e2e_main_theme.css`;
    }
  }
}
