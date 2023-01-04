import {AfterViewInit, Component, OnInit, Optional, ViewChild} from '@angular/core';
import {MatLegacySelect as MatSelect} from '@angular/material/legacy-select';
import {Router} from '@angular/router';
import {ConfigResponse, ConfigService, ConfigSet} from '@dino/core/config';
import {UserData, UserDataManager} from '@dino/core/users';
import {ThemeService} from '@dino/material/core';
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
  readonly policy = `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.`;

  constructor(
    private _router: Router,
    private _userDataManager: UserDataManager,
    readonly ts: ThemeService,
    @Optional() private _configService: ConfigService | null,
  ) {
    this._userDataManager.emitActionTrigger.subscribe(trigger => {
      if (trigger.triggerData && trigger.triggerData.doc) {
        this.postSignup(trigger.triggerData.doc);
      }
    });
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

  postSignup(userData: UserData | null) {
    console.log(userData);
  }

  setDarkTheme(evt: boolean) {
    this.ts.setDarkMode(evt);
  }
}
