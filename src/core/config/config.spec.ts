import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {take} from 'rxjs/operators';

import {CONFIG_SERVICE_CONFIG, ConfigResponse, ConfigSet} from '.';
import {ConfigService} from './config.service';
import {ConfigServiceConfig} from './config.token';

const configServiceConfig: ConfigServiceConfig = {
  apiUrl: 'https://test-config-url',
};

const instances = {
  'instances': [
    {
      'name': 'First Instance',
      'label': 'FI',
      'host_url': 'https://fi.org',
      'api_url': 'https://fi-api.org/',
      'additional_stuff': 'fi additional',
    },
    {
      'name': 'Second Instance',
      'label': 'SI',
      'host_url': 'https://si.org',
      'api_url': 'https://si-api.org/',
      'additional_stuff': 'si additional',
    }
  ]
};

const setupFn = (apiConfig: {instances: [{[key: string]: any}]}): ConfigResponse => {
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
          name: `dino_${instanceName}_db`,
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
        additional_stuff: `${instance.additional_stuff}`,
      },
    };
    confSets.push(confSet);
  }
  const confResp: ConfigResponse = {
    configSets: confSets,
  };
  return confResp;
};


describe('Config service', () => {
  let configService: ConfigService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ConfigService,
        {provide: CONFIG_SERVICE_CONFIG, useValue: configServiceConfig},
      ],
    });
    configService = TestBed.inject(ConfigService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should not have any configuration set', async () => {
    const confSet = configService.configurationSet.pipe(take(1)).toPromise();
    await expectAsync(confSet).toBeResolvedTo(null);
  });

  it('should make an http call to the url provided in he configservice config', async () => {
    const getConfigs = configService.getConfigs().toPromise();
    const req = httpMock.expectOne(configServiceConfig.apiUrl);
    req.flush(null);
    await expectAsync(getConfigs).toBeResolvedTo(null);
  });

  it('should call the setup function to transform the instances data', async () => {
    const getConfigs = configService.getConfigs(setupFn).toPromise();
    const req = httpMock.expectOne(configServiceConfig.apiUrl);
    req.flush(instances);
    await expectAsync(getConfigs).not.toBeResolvedTo(null);

    const returnedConfigs = await getConfigs;

    expect(returnedConfigs?.configSets).not.toBeNull();
    expect(returnedConfigs?.configSets.length).toEqual(2);
    expect(returnedConfigs?.configSets[0].authConfig.authTokenLocalStorageKey)
        .toEqual('first_instance_auth_token');
    expect(returnedConfigs?.configSets[1].dataConfig.databaseCreateOptions.name)
        .toEqual('dino_second_instance_db');
  });
});
