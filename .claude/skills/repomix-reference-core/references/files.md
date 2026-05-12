# Files

## File: areas/src/area-json.ts
```typescript
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
⋮----
import {RxJsonSchema} from 'rxdb';
⋮----
import {Area} from './area';
⋮----
// tslint:disable
```

## File: areas/src/area-manager.ts
```typescript
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
⋮----
import {Injectable} from '@angular/core';
import {
  CheckMetricPermission,
  DataModelManager,
  DataService,
  PermissionContextService,
} from '@dino/core/data';
⋮----
import {Area, migrationStrategies} from './area';
import {schema} from './area-json';
import {AreasModule} from './areas.module';
⋮----
/**
 * Service that manages FormData Locations
 */
⋮----
export class AreaManager extends DataModelManager<Area>
⋮----
constructor(dataService: DataService, permissionContextService: PermissionContextService)
```

## File: areas/src/area.ts
```typescript
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
import {Metric} from '@dino/core/data';
import {MigrationStrategies, RxDocument} from 'rxdb';
⋮----
/**
 * This model is used to store Areas.
 * @title Area
 */
export interface Area extends Metric {}
```

## File: areas/src/areas.module.ts
```typescript
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
⋮----
import {NgModule} from '@angular/core';
import {ActiveMetric, MetricsService} from '@dino/core/data';
import {FiltersService, ListModule} from '@dino/core/list';
import {schema} from './area-json';
⋮----
/**
 * Optional module augmenting Forms that provides the AreasManager service
 */
⋮----
export class AreasModule
⋮----
constructor(private _filtersService: FiltersService, private _metricsService: MetricsService)
```

## File: areas/src/form-data.ts
```typescript
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
⋮----
import {FormData as BaseFormData} from '@dino/core/forms';
⋮----
/**
 * Augments Form Data with the id of its thematic area
 */
⋮----
interface FormData extends BaseFormData {
    /**
     * The Form Data area id.
     */
    area_ref_id: string | null;
  }
⋮----
/**
     * The Form Data area id.
     */
```

## File: areas/src/populated-with-area.ts
```typescript
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
⋮----
import {Observable} from 'rxjs';
import {Area} from './area';
⋮----
/**
 * Interface that represents the populated Area refs.
 */
export interface PopulatedWithArea {
  /**
   * The populated Areas observable.
   */
  area: Observable<Area[]>;
}
⋮----
/**
   * The populated Areas observable.
   */
```

## File: areas/src/public_api.ts
```typescript
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
```

## File: areas/src/report-data.ts
```typescript
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
⋮----
import {ReportData as BaseReportData} from '@dino/core/reports';
⋮----
/**
 * Augments Report Data with the id of its thematic area
 */
⋮----
interface ReportData extends BaseReportData {
    /**
     * The Report Data area id.
     */
    area_ref_id: string | null;
  }
⋮----
/**
     * The Report Data area id.
     */
```

## File: areas/areas.md
```markdown
The `@dino/core/areas` module provides the interface for the Areas model, and a Data Manager for areas.
It augments the `@dino/core/forms` module by adding an "area" property to the Form Data.
When imported, it makes the "area" basic filter available.
```

## File: areas/index.ts
```typescript
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
```

## File: areas/ng-package.json
```json
{}
```

## File: auth/src/auth-event.ts
```typescript
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
⋮----
/**
 * Event info associated with Authentication Events
 */
export type AuthEvt =
  | 'expired'
  | 'init'
  | 'init refresh'
  | 'login'
  | 'logout'
  | 'no auth token'
  | 'offline'
  | 'gone offline'
  | 'back online'
  | 'refresh successful'
  | 'refresh failed'
  | 'reset password'
  | null;
⋮----
/**
 * Represents an Authentication state change event
 */
export interface AuthenticationEvent {
  /**
   * If true, the user is authenticated
   */
  auth: boolean;

  /**
   * Type of auth event
   */
  evt: AuthEvt;
}
⋮----
/**
   * If true, the user is authenticated
   */
⋮----
/**
   * Type of auth event
   */
```

## File: auth/src/auth-module.ts
```typescript
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
⋮----
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ModuleWithProviders, NgModule} from '@angular/core';
⋮----
import {AUTH_SERVICE_CONFIG, AuthServiceConfig} from './auth-service-config';
import {JWTInterceptor} from './jwt-interceptor';
⋮----
export class AuthModule
⋮----
static forRoot(config: AuthServiceConfig): ModuleWithProviders<AuthModule>
```

## File: auth/src/auth-response.ts
```typescript
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
⋮----
/**
 * FusionAuth api response
 */
export interface AuthResponse {
  /**
   * The access token, this string is an encoded JSON Web Token (JWT).
   */
  token: string;

  /**
   * The refresh token that can be used to obtain a new access token once the provide
   * one has expired.
   */
  refreshToken: string;
}
⋮----
/**
   * The access token, this string is an encoded JSON Web Token (JWT).
   */
⋮----
/**
   * The refresh token that can be used to obtain a new access token once the provide
   * one has expired.
   */
⋮----
/**
 * Nhost Refresh api response
 */
export interface NHostRefreshResponse {
  /**
   * The access token, this string is an encoded JSON Web Token (JWT).
   */
  accessToken: string;

  /**
   * The access token expiry time
   */
  accessTokenExpiresIn: number;

  /**
   * The refresh token that can be used to obtain a new access token once the provide
   * one has expired.
   */
  refreshToken: string;

  /**
   * The NHost user info object
   */
  user: {[key: string]: any};
}
⋮----
/**
   * The access token, this string is an encoded JSON Web Token (JWT).
   */
⋮----
/**
   * The access token expiry time
   */
⋮----
/**
   * The refresh token that can be used to obtain a new access token once the provide
   * one has expired.
   */
⋮----
/**
   * The NHost user info object
   */
⋮----
/**
 * Request to the nHost signup api.
 */
export type NHostSignupRequest = {
  /**
   * User email
   */
  email: string;
  /**
   * User password
   */
  password: string;
  /**
   * User displayed name options
   */
  options: {displayName: string};
};
⋮----
/**
   * User email
   */
⋮----
/**
   * User password
   */
⋮----
/**
   * User displayed name options
   */
⋮----
/**
 * Newly signed up user basic attributes
 */
export type BasicUserInfo = {
  id: string;
  displayName: string;
  email: string;
};
⋮----
/**
 * Response of the nHost signup api.
 */
export type NHostSignupResponse = {
  /**
   * The NHost session, including the created user info.
   */
  session: {user: BasicUserInfo};
  /**
   * NHost response error label
   */
  error?: string;
  /**
   * NHost response error message
   */
  message?: string;
  /**
   * NHost response error status
   */
  status?: number;
};
⋮----
/**
   * The NHost session, including the created user info.
   */
⋮----
/**
   * NHost response error label
   */
⋮----
/**
   * NHost response error message
   */
⋮----
/**
   * NHost response error status
   */
```

## File: auth/src/auth-service-config.ts
```typescript
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
⋮----
import {InjectionToken} from '@angular/core';
⋮----
import {DinoUserInfo, User} from './user';
⋮----
import {ExternalAuthProvider} from './external-auth-type';
⋮----
/**
 * Auth service configuration
 */
export interface AuthServiceConfig<T = DinoUserInfo> {
  /**
   * Authorization service host (needs leading protocol).
   * eg. http://localhost:9011
   */
  host: string;

  /**
   * Authorization external service application id.
   */
  applicationId: string | null;

  /**
   * API key used to call the external authorization service login endpoint.
   */
  apiKey?: string;

  /**
   * If true, the Authentication process is performed against a nHost backend.
   */
  nHostAuth?: boolean;

  /**
   * If true, users can create their own account from the sign-up form in the
   * login view
   */
  signUp?: boolean;

  /**
   * If true, users can signin with external authentication (Azure/Google) in the
   * login view
   */
  externalAuthAvailable?: ExternalAuthProvider[];

  /**
   * If true, users can reset their password from the change-password form in the login view.
   */
  resetPassword?: boolean;

  /**
   * Optional custom User Password reset endpoint
   */
  resetPasswordEndpoint?: string;

  /**
   * Custom login credential key to be sent in the login request to the api.
   */
  userCredential?: string;

  /**
   * Custom password credential key to be sent in the login request to the api.
   */
  passwordCredential?: string;

  /**
   * User info key returned by the auth endpoint
   */
  userAuthInfo?: string;

  /**
   * Optional custom login endpoint url. Defaults to 'api/login',
   */
  loginEndpoint?: string;

  /**
   * Optional custom logout endpoint url. Defaults to 'api/logout',
   */
  logoutEndpoint?: string;

  /**
   * Optional custom jwt token refresh endpoint url. Defaults to 'api/jwt/refresh',
   */
  refreshEndpoint?: string;

  /**
   * Optional custom User signup endpoint
   */
  signupEndpoint?: string;

  /**
   * Optional custom User Password change endpoint
   */
  changePasswordEndpoint?: string;

  /**
   * Time interval to retry refresh token calls in milliseconds.
   */
  retryRefreshTime: number;

  /**
   * Path to be redirected to in case of failed Authentication Check, Refresh Attempt
   * or successful Logout.
   */
  failedAuthRedirect: string;

  /**
   * The maximum number of the JWT interceptor attempts to refresh the jwt token, before
   * logging the user out.
   */
  retryAttemptsMax: number;

  /**
   * Function used to store the current JWT token.
   * The token will be stored in local storage if not specified.
   */
  storeAuthToken?: (token: string | null) => void;

  /**
   * Function used to retrieve the current JWT token.
   * The token will be retrieved from the local storage if not specified.
   */
  retrieveAuthToken?: () => string | null;

  /**
   * Name of the locale storage entry where the JWT token will be stored.
   * Defaults to dino_auth_token
   */
  authTokenLocalStorageKey?: string;

  /**
   * Function used to store the current JWT refresh token.
   * The token will be stored in local storage if not specified.
   */
  storeRefreshToken?: (token: string | null) => void;

  /**
   * Function used to retrieve the current JWT refresh token.
   * The token will be retrieved from the local storage if not specified.
   */
  retrieveRefreshToken?: () => string | null;

  /**
   * Name of the locale storage entry where the JWT refresh token will be stored.
   * Defaults to dino_auth_refresh_token
   */
  refreshTokenLocalStorageKey?: string;

  /**
   * Function used to store the logged in user info.
   * The token will be stored in local storage if not specified.
   */
  storeUserInfo?: (userInfo: User<T> | null) => void;

  /**
   * Function used to retrieve the logged in user info.
   * The token will be retrieved from the local storage if not specified.
   */
  retrieveUserInfo?: () => User<T> | null;

  /**
   * Name of the locale storage entry where the logged in user info will be stored.
   * Defaults to dino_auth_user_info
   */
  userInfoLocalStorageKey?: string;
}
⋮----
/**
   * Authorization service host (needs leading protocol).
   * eg. http://localhost:9011
   */
⋮----
/**
   * Authorization external service application id.
   */
⋮----
/**
   * API key used to call the external authorization service login endpoint.
   */
⋮----
/**
   * If true, the Authentication process is performed against a nHost backend.
   */
⋮----
/**
   * If true, users can create their own account from the sign-up form in the
   * login view
   */
⋮----
/**
   * If true, users can signin with external authentication (Azure/Google) in the
   * login view
   */
⋮----
/**
   * If true, users can reset their password from the change-password form in the login view.
   */
⋮----
/**
   * Optional custom User Password reset endpoint
   */
⋮----
/**
   * Custom login credential key to be sent in the login request to the api.
   */
⋮----
/**
   * Custom password credential key to be sent in the login request to the api.
   */
⋮----
/**
   * User info key returned by the auth endpoint
   */
⋮----
/**
   * Optional custom login endpoint url. Defaults to 'api/login',
   */
⋮----
/**
   * Optional custom logout endpoint url. Defaults to 'api/logout',
   */
⋮----
/**
   * Optional custom jwt token refresh endpoint url. Defaults to 'api/jwt/refresh',
   */
⋮----
/**
   * Optional custom User signup endpoint
   */
⋮----
/**
   * Optional custom User Password change endpoint
   */
⋮----
/**
   * Time interval to retry refresh token calls in milliseconds.
   */
⋮----
/**
   * Path to be redirected to in case of failed Authentication Check, Refresh Attempt
   * or successful Logout.
   */
⋮----
/**
   * The maximum number of the JWT interceptor attempts to refresh the jwt token, before
   * logging the user out.
   */
⋮----
/**
   * Function used to store the current JWT token.
   * The token will be stored in local storage if not specified.
   */
⋮----
/**
   * Function used to retrieve the current JWT token.
   * The token will be retrieved from the local storage if not specified.
   */
⋮----
/**
   * Name of the locale storage entry where the JWT token will be stored.
   * Defaults to dino_auth_token
   */
⋮----
/**
   * Function used to store the current JWT refresh token.
   * The token will be stored in local storage if not specified.
   */
⋮----
/**
   * Function used to retrieve the current JWT refresh token.
   * The token will be retrieved from the local storage if not specified.
   */
⋮----
/**
   * Name of the locale storage entry where the JWT refresh token will be stored.
   * Defaults to dino_auth_refresh_token
   */
⋮----
/**
   * Function used to store the logged in user info.
   * The token will be stored in local storage if not specified.
   */
⋮----
/**
   * Function used to retrieve the logged in user info.
   * The token will be retrieved from the local storage if not specified.
   */
⋮----
/**
   * Name of the locale storage entry where the logged in user info will be stored.
   * Defaults to dino_auth_user_info
   */
```

## File: auth/src/auth-service.spec.ts
```typescript
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {firstValueFrom} from 'rxjs';
import {take} from 'rxjs/operators';
⋮----
import {
  AUTH_SERVICE_CONFIG,
  AuthService,
  AuthServiceConfig,
  LoginResponse,
  User,
} from './public_api';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
⋮----
const authStatus = ()
```

## File: auth/src/auth-service.ts
```typescript
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
⋮----
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {EventEmitter, Inject, Injectable, isDevMode, Optional} from '@angular/core';
import {ConfigService} from '@dino/core/config';
import {BehaviorSubject, Observable, of as obsOf} from 'rxjs';
import {catchError, map, mapTo, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {AuthenticationEvent, AuthEvt} from './auth-event';
⋮----
import {
  AuthResponse,
  BasicUserInfo,
  NHostRefreshResponse,
  NHostSignupRequest,
  NHostSignupResponse,
} from './auth-response';
import {AUTH_SERVICE_CONFIG, AuthServiceConfig} from './auth-service-config';
import {buildAuthorizationHeader} from './auth-utils';
import {Credentials} from './credentials';
import {JwtToken} from './jwt-token';
import {LoginResponse} from './login-response';
import {NetworkStatusService} from './network-status.service';
import {User} from './user';
import {ErrorHandlerMessageService} from '@dino/core/error-handler';
⋮----
function removeSlashes(uri: string): string
⋮----
/**
 * Default Credentials and Token keys
 */
⋮----
/**
 * Injectable service used to authenticate against an external authentication backend.
 * Stores the authentication token and the logged in user info.
 */
⋮----
export class AuthService
⋮----
/**
   * True if a valid JWT access token is available.
   */
⋮----
/**
   * The current JWT auth token
   */
⋮----
/**
   * Emits when reset auth is called, indicating the removal of all
   * stored token and config data.
   */
⋮----
/**
   * Emits when the current User actively logs out
   */
⋮----
/**
   * Emits when a User logs in
   */
⋮----
/**
   * When not null it holds the newly signed up User basic info.
   * The User Data Manager should create a new User Data based
   * on this, then set this to null.
   */
⋮----
setNewUser(newUser: BasicUserInfo): void
getNewUser(): BasicUserInfo | null
resetNewUser(): void
⋮----
/**
   * The Auth service configuration settings stream.
   */
⋮----
get authConfig(): AuthServiceConfig
⋮----
/**
   * The auth config currently stored in the local storage, if present.
   */
⋮----
constructor(
    private _nss: NetworkStatusService,
    private _httpClient: HttpClient,
    private _ehms: ErrorHandlerMessageService,
    @Inject(AUTH_SERVICE_CONFIG) readonly config: AuthServiceConfig,
    @Optional() private _configService: ConfigService | null,
)
⋮----
/**
   * Resets the auth state, removing tokens and config from local storage.
   */
resetAuth(): void
⋮----
/**
   * Make a login request to the authentication server and stores the
   * authentication token and the logged in user info.
   * @returns True if the user has been authenticated otherwise false
   */
login(credentials: Credentials): Observable<boolean | HttpErrorResponse>
⋮----
/**
   * Store all authentication info: the authentication token and the logged in user info.
   * @param session
   * @param token
   * @param refreshToken
   * @param userInfo
   * @param clearNhostTokens If true, all nhost tokens and tokens info are removed from localstorage.
   */
storeAllAuthenticationInfo(
    session: any,
    token: string | undefined,
    refreshToken: string | undefined,
    userInfo: any | null,
    clearNhostTokens?: boolean,
): void
⋮----
/**
   * Removes all nhost tokens from localstorage.
   */
clearNhostTokens()
⋮----
/**
   * Make a logout request to the authentication server and removes the
   * authentication token and the logged in user info stored.
   * @param allDevices Whether to invalidate all the refresh token issued for this user.
   * @returns True if the user has been logged out otherwise false
   */
logout(allDevices = false): Observable<boolean>
⋮----
/**
   * Make a signup request to the nHost authentication api to create a new user.
   * @param requestData The Nhost request params
   * @returns the NHost signup Api response
   */
signupNHost(requestData: NHostSignupRequest): Observable<NHostSignupResponse | null>
⋮----
/**
   * Checks if the user currently has a Jwt auth token
   * @returns True if there is a JWT Auth token stored locally
   */
hasAuthToken(): boolean
⋮----
/**
   * @returns The last stored JWT auth token.
   */
getAuthToken(): string | null
⋮----
/**
   * @returns The last stored JWT refresh token.
   */
getRefreshToken(): string | null
⋮----
/**
   * @returns The last stored logged in user info.
   */
getUserInfo(): User | null
⋮----
/**
   * Refreshes the JWT token by providing a refresh token to FusioAuth refresh api.
   * Stores the new authToken, if issued.
   * @param authEvt The authentication event string identifier
   * @param refreshToken? An optional refresh token provided
   * @returns True if the token was successfully refreshed.
   */
refreshToken(
    authEvt: AuthEvt = 'refresh successful',
    refreshToken?: string,
): Observable<boolean>
⋮----
/**
   * Checks the validity of the JWT auth token.
   * @returns True if the token is valid.
   */
checkToken(): Observable<
⋮----
/**
   * User Change Password method.
   * @param credentials User Credentials
   * @param newPass The new Password
   */
changePassword(
    credentials: Credentials,
    newPass: string,
): Observable<boolean | HttpErrorResponse>
⋮----
/**
   * User Change Password method using a reset token
   * @param token The Reset password token
   * @param newPass The new Password
   */
changePasswordWithResetTicket(
    token: string,
    newPass: string,
): Observable<boolean | HttpErrorResponse>
⋮----
/**
   * User Reset Password method.
   * @param email The email address of the user that wishes to reset his/her password
   */
resetPassword(
    email: string,
    options?: {redirectTo: string},
): Observable<boolean | HttpErrorResponse>
⋮----
/**
   * Subscribes to the Config Service and listens for changes
   * in the Auth configuration.
   */
private _setDynamicConfigSub(): void
⋮----
/**
   * Dynamically sets the configuration params for the Auth Service.
   * @param config The configuration data
   */
private _setAuthConfig(config: AuthServiceConfig): void
⋮----
/**
   * Stores an Auth service configuration object into the
   * local storage.
   * @param config The configuration data
   */
private _storeAuthConfig(config: AuthServiceConfig): void
⋮----
/**
   * Retrieves the Auth service configuration currently stored in the
   * local storage.
   */
private _getAuthConfig(): AuthServiceConfig | null
⋮----
/**
   * Removes the Auth service configuration currently stored in the
   * local storage.
   */
private _removeAuthConfig(): void
⋮----
/**
   * @returns The local storage key used to store the JWT token
   */
private _getAuthTokenLocaleStorageKey(): string
⋮----
/**
   * @returns The local storage key used to store the JWT refresh token
   */
private _getRefreshTokenLocaleStorageKey(): string
⋮----
/**
   * @returns The local storage key used to store the logged in user info
   */
private _getUserInfoLocaleStorageKey(): string
⋮----
/**
   * Store the JWT auth token.
   * If a custom function is not provided, the JWT auth token will be stored in the local storage.
   * @param token The JWT auth token
   */
private _storeAuthToken(token: string | null): void
⋮----
/**
   * Removes all locally stored Dino Api Keys
   */
private _clearApiKeys(): void
⋮----
/**
   * Store the JWT refresh token.
   * If a custom function is not provided, the JWT refresh token will be stored in the
   * local storage.
   * @param token The JWT refresh token
   */
private _storeRefreshToken(token: string | null): void
⋮----
/**
   * Store the logged in user info.
   * If a custom function is not provided, the user info will be stored in the local storage.
   * @param user The logged in user info.
   */
private _storeUserInfo(user: User | null): void
⋮----
/**
   * Generate a full URL given an authentication endpoint.
   * @param endpoint The authentication endpoint.
   * @returns The full URL
   */
private _generateUrl(endpoint: string, baseUrl?: string): string
⋮----
/**
   * @returns A string representing the boolean value following FusionAuth spec
   */
private _stringifyBooleanParam(bool: boolean): string
⋮----
/**
   * Check if a valid JWT token is stored and set the authentication status.
   */
private _initAuthentication(): void
⋮----
/**
   * Decodes and parses a Jwt token
   * @param token The token to be decoded.
   * @returns The decoded token.
   */
private _decodeJwt(token: string): JwtToken
```

## File: auth/src/auth-utils.ts
```typescript
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
⋮----
export const buildAuthorizationHeader = (token: string | null): string => `Bearer $
```

## File: auth/src/auth.guard.ts
```typescript
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
⋮----
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {debounceTime, map, take, withLatestFrom} from 'rxjs/operators';
import {AuthService} from './auth-service';
⋮----
/**
 * A route guard that grants authorized access to a route,
 * checking if the user has a valid auth and/or refresh JWT token.
 * If the user does not, it redirects to the login component.
 */
⋮----
export class AuthGuard
⋮----
constructor(private _router: Router, private _authService: AuthService)
⋮----
canActivate(
    _next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
```

## File: auth/src/b64-conversion-functions.ts
```typescript
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
⋮----
/**
 * Conversion methods string <-> base64
 */
export function utf8_to_b64(str: string)
⋮----
export function b64_to_utf8(str: string)
```

## File: auth/src/credentials.ts
```typescript
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
⋮----
export interface Credentials {
  email: string;
  password: string;
}
```

## File: auth/src/external-auth-type.ts
```typescript
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
⋮----
export type ExternalAuthProvider = 'google' | 'azuread';
```

## File: auth/src/jwt-interceptor.spec.ts
```typescript
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpInterceptor,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';
⋮----
import {AUTH_SERVICE_CONFIG, AuthServiceConfig, JWTInterceptor} from './public_api';
```

## File: auth/src/jwt-interceptor.ts
```typescript
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
⋮----
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of as obsOf, throwError} from 'rxjs';
import {catchError, debounceTime, filter, skip, switchMap, withLatestFrom} from 'rxjs/operators';
⋮----
import {AuthService} from './auth-service';
import {NetworkStatusService} from './network-status.service';
⋮----
export class JWTInterceptor implements HttpInterceptor
⋮----
/**
   * Emits when a http request returns a 401 error response after
   * a refresh token attempt.
   */
⋮----
/**
   * Emits when the counter reaches the retry attempts max
   * and asks user to log in again
   */
⋮----
/**
   * Counter of the retry attemps for refreshing the token.
   * If the counter reaches the retry attempts max, the user is
   * redirected to the login page, and asked to log in again.
   */
⋮----
constructor(
    private _router: Router,
    private _authService: AuthService,
    private _nss: NetworkStatusService,
)
⋮----
/**
   * Intercepts http requests from angular http client.
   * If the response is a status 401 'Unauthorized', and is not a Login or Signup request,
   * it handles it by emitting a refreshEvent.
   * @param request the Http request.
   * @param next the request handler.
   */
intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
⋮----
/**
   * Checks wether a http request should trigger the Refresh handling.
   * @param request the Http request.
   * @returns true if it's an allowed request.
   */
private _isAllowedRequest(request: HttpRequest<any>): boolean
⋮----
// Signup error, like:
// {"status": 400, "message": "\"email\" must be a valid email", "error": "invalid-request"}
```

## File: auth/src/jwt-token.ts
```typescript
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
⋮----
/**
 * Represents a JwtToken
 */
export interface JwtToken {
  applicationId: string;
  aud: string;
  authenticationType: string;
  email: string;
  email_verified: boolean;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  preferred_username: string;
  roles: string[];
  sub: string;
}
```

## File: auth/src/login-response.ts
```typescript
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
⋮----
import {User} from './user';
⋮----
/**
 * Response of the login api.
 */
export type LoginResponse<
  T extends {[key: string]: any} = {
    [key: string]: any;
  },
> = {
  /**
   * The logged in user info.
   */
  user: User;

  /**
   * The access token, this string is an encoded JSON Web Token (JWT).
   */
  token: string;

  /**
   * The refresh token that can be used to obtain a new access token once the provide
   * one has expired.
   */
  refreshToken: string;
} & T;
⋮----
/**
   * The logged in user info.
   */
⋮----
/**
   * The access token, this string is an encoded JSON Web Token (JWT).
   */
⋮----
/**
   * The refresh token that can be used to obtain a new access token once the provide
   * one has expired.
   */
```

## File: auth/src/login.spec.ts
```typescript
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {ChangeDetectorRef, EventEmitter} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {UntypedFormBuilder} from '@angular/forms';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {Observable, of as obsOf} from 'rxjs';
import {TranslocoService} from '@ngneat/transloco';
import {AjfTranslocoModule} from '@ajf/core/transloco';
⋮----
import {AuthService, Credentials, LoginComponent, NHostSignupRequest} from './public_api';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
⋮----
login(_: Credentials): Observable<boolean>
⋮----
markForCheck()
⋮----
class LoginFeatComp extends LoginComponent
⋮----
constructor(
    authService: AuthService,
    router: Router,
    fb: UntypedFormBuilder,
    cdr: ChangeDetectorRef,
    snackBar: MatSnackBar,
    ts: TranslocoService,
)
```

## File: auth/src/login.ts
```typescript
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
⋮----
import {ChangeDetectorRef, Directive, Input} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, of as obsOf} from 'rxjs';
import {map, startWith, switchMap, take} from 'rxjs/operators';
import {NHostSignupRequest} from './auth-response';
import {AuthService} from './auth-service';
import {PasswordMatch} from './user-password-validator';
import {showValidationErrors} from './validation-errors';
import {TranslocoService} from '@ngneat/transloco';
⋮----
/**
 * Represents an Authentication Error
 */
export interface AuthError {
  error: boolean;
  message: string | null;
}
⋮----
/**
 * The base Login Component extended by Material Login Components
 */
⋮----
export abstract class LoginComponent
⋮----
/**
   * True if the user is authenticated and logged in.
   */
⋮----
/**
   * The signup FormGroup.
   */
⋮----
/**
   * The reset Password FormGroup.
   */
⋮----
/**
   * If true, the signup form is displayed in place of the login form
   */
⋮----
/**
   * If true, the resetPassword form is displayed in place of the login form
   */
⋮----
/**
   * The login FormGroup.
   */
⋮----
/**
   * Displays the login/signup validation errors
   */
⋮----
/**
   * True if the submit button is disabled.
   */
⋮----
/**
   * True if the Login or Signup forms are currently processing a Login/Signup request.
   */
⋮----
/**
   * Error is True if login was not successful.
   */
⋮----
get loginError(): AuthError
⋮----
/**
   * Error is True if signup was not successful.
   */
⋮----
get signupError(): AuthError
⋮----
/**
   * Error is True if reset was not successful.
   */
⋮----
get resetPassError(): AuthError
⋮----
/**
   * An optional method to be executed after a successful login
   */
⋮----
set postLogin(fn: Function)
⋮----
/**
   * Optional privacy policy text, to be added to the SignUp form
   */
⋮----
get privacyPolicy(): string | null
⋮----
set privacyPolicy(pp: string | null)
⋮----
constructor(
    private _authService: AuthService,
    private _router: Router,
    fb: UntypedFormBuilder,
    private _cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private _ts: TranslocoService,
)
⋮----
/**
   * User login method. Executes an optional method or redirects to home after login is successful.
   */
login(): void
⋮----
/**
   * User signup method. Executes an optional method or redirects to home after signup/login is successful.
   */
signup(): void
⋮----
/**
   * User logout method.
   */
logout(): void
⋮----
/**
   * User Reset Password method.
   */
resetPassword(): void
/**
   * Signals the successful Password reset and closes the User Area dialog
   */
passwordReset(email?: string): void
⋮----
/**
   * Toggles the signup form
   * @param toggle If true, the signup form is displayed if available
   */
toggleSignupForm(toggle: boolean): void
⋮----
/**
   * Toggles the reset password form
   * @param toggle If true, the signup form is displayed if available
   */
toggleResetPassForm(toggle: boolean): void
⋮----
private _setResetPassError(resetPassErr: AuthError): void
⋮----
private _setLoginError(loginError: AuthError): void
⋮----
private _setSignupError(signupError: AuthError): void
```

## File: auth/src/network-status.service.ts
```typescript
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
⋮----
import {Injectable} from '@angular/core';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {distinctUntilChanged, mapTo, startWith, tap} from 'rxjs/operators';
⋮----
/**
 * Service that detects the current Network connection status.
 */
⋮----
export class NetworkStatusService
⋮----
/**
   * The Online status history subject
   */
⋮----
get statusHistory$(): BehaviorSubject<boolean[]>
⋮----
/**
   * The current Network connection status stream.
   */
⋮----
get isOnline$(): Observable<boolean>
constructor()
⋮----
/**
   * Adds a network status to the status history
   * @param isOnline The status
   * @param len The length of the History
   */
protected updateStatusHistory(isOnline: boolean, len: number)
```

## File: auth/src/public_api.ts
```typescript
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
```

## File: auth/src/registration.ts
```typescript
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
⋮----
import {UsernameStatus} from './username-status';
⋮----
export interface Registration {
  /**
   * The Id of this registration.
   */
  id: string;

  /**
   * The Id of the Application that this registration is for.
   */
  applicationId: string;

  /**
   * The instant that the membership was created.
   */
  insertInstant: number;

  /**
   * The instant that the User last logged into the Application for this registration.
   */
  lastLoginInstant: number;

  /**
   * The username of the User for this registration only.
   */
  username: string;

  /**
   * The current status of the username. The possible values are:
   * ACTIVE - the username is active
   * PENDING - the username is pending approval/moderation
   * REJECTED - the username was rejected during moderation
   */
  usernameStatus: UsernameStatus;

  /**
   * The User’s preferred timezone for this registration.
   * The string will be in an IANA time zone format.
   */
  timezone: string;

  /**
   * The list of roles that the User has for this registration.
   */
  roles: string[];

  /**
   * An array of locale strings that give, in order, the User’s preferred languages
   * for this registration. These are important for email templates and other localizable text.
   */
  preferredLanguages: string[];
}
⋮----
/**
   * The Id of this registration.
   */
⋮----
/**
   * The Id of the Application that this registration is for.
   */
⋮----
/**
   * The instant that the membership was created.
   */
⋮----
/**
   * The instant that the User last logged into the Application for this registration.
   */
⋮----
/**
   * The username of the User for this registration only.
   */
⋮----
/**
   * The current status of the username. The possible values are:
   * ACTIVE - the username is active
   * PENDING - the username is pending approval/moderation
   * REJECTED - the username was rejected during moderation
   */
⋮----
/**
   * The User’s preferred timezone for this registration.
   * The string will be in an IANA time zone format.
   */
⋮----
/**
   * The list of roles that the User has for this registration.
   */
⋮----
/**
   * An array of locale strings that give, in order, the User’s preferred languages
   * for this registration. These are important for email templates and other localizable text.
   */
```

## File: auth/src/two-factor-delivery.ts
```typescript
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
⋮----
/**
 * The User’s preferred delivery for verification codes during a two factor login request.
 * The possible values are:
 * - None
 * - TextMessage
 */
export type TwoFactorDelivery = 'None' | 'TextMessage';
```

## File: auth/src/user-password-validator.ts
```typescript
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
⋮----
import {AbstractControl, ValidationErrors} from '@angular/forms';
⋮----
/**
 * Custom validator method for the User Password,
 * to check password matching.
 * @param control The form control.
 */
export function PasswordMatch(control: AbstractControl): ValidationErrors | null
```

## File: auth/src/user.ts
```typescript
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
⋮----
import {Registration} from './registration';
import {TwoFactorDelivery} from './two-factor-delivery';
import {UsernameStatus} from './username-status';
⋮----
/**
 * The basic User model.
 */
export type User<T = DinoUserInfo> = {
  /**
   * The User’s unique Id.
   */
  id: string;
  /**
   * The User’s email address.
   */
  email: string;
} & T;
⋮----
/**
   * The User’s unique Id.
   */
⋮----
/**
   * The User’s email address.
   */
⋮----
/**
 * The Dino user info
 */
export interface DinoUserInfo {
  /**
   * The User’s first name.
   */
  firstName: string;

  /**
   * The User’s last name.
   */
  lastName: string;

  /**
   * True if the User is active. False if the User has been deactivated. Deactivated Users will
   * not be able to login.
   */
  active: boolean;

  /**
   * Whether or not the User’s email has been verified.
   */
  verified: boolean;

  /**
   * The Id of the Tenant that this User belongs to.
   */
  tenantId: string;

  /**
   * The instant when user was created.
   */
  insertInstant: number;

  /**
   * The instant when the User logged in last.
   */
  lastLoginInstant: number;

  /**
   * ndicates that the User’s password needs to be changed during their next login attempt.
   */
  passwordChangeRequired: boolean;

  /**
   * The instant that the User last changed their password.
   */
  passwordLastUpdateInstant: number;

  /**
   * Determines if the User has two factor authentication enabled for their account or not.
   */
  twoFactorEnabled: boolean;

  /**
   * The User’s preferred delivery for verification codes during a two factor login request.
   * The possible values are:
   * - None
   * - TextMessage
   */
  twoFactorDelivery: TwoFactorDelivery;

  /**
   * The current status of the username. The possible values are:
   * ACTIVE - the username is active
   * PENDING - the username is pending approval/moderation
   * REJECTED - the username was rejected during moderation
   */
  usernameStatus: UsernameStatus;

  /**
   * The list of registrations for the User.
   */
  registrations: Registration[];
}
⋮----
/**
   * The User’s first name.
   */
⋮----
/**
   * The User’s last name.
   */
⋮----
/**
   * True if the User is active. False if the User has been deactivated. Deactivated Users will
   * not be able to login.
   */
⋮----
/**
   * Whether or not the User’s email has been verified.
   */
⋮----
/**
   * The Id of the Tenant that this User belongs to.
   */
⋮----
/**
   * The instant when user was created.
   */
⋮----
/**
   * The instant when the User logged in last.
   */
⋮----
/**
   * ndicates that the User’s password needs to be changed during their next login attempt.
   */
⋮----
/**
   * The instant that the User last changed their password.
   */
⋮----
/**
   * Determines if the User has two factor authentication enabled for their account or not.
   */
⋮----
/**
   * The User’s preferred delivery for verification codes during a two factor login request.
   * The possible values are:
   * - None
   * - TextMessage
   */
⋮----
/**
   * The current status of the username. The possible values are:
   * ACTIVE - the username is active
   * PENDING - the username is pending approval/moderation
   * REJECTED - the username was rejected during moderation
   */
⋮----
/**
   * The list of registrations for the User.
   */
```

## File: auth/src/username-status.ts
```typescript
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
⋮----
/**
 * The current status of the username. The possible values are:
 * ACTIVE - the username is active
 * PENDING - the username is pending approval/moderation
 * REJECTED - the username was rejected during moderation
 */
export type UsernameStatus = 'ACTIVE' | 'PENDING' | 'REJECTED';
```

## File: auth/src/validation-errors.ts
```typescript
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
⋮----
import {AbstractControl} from '@angular/forms';
⋮----
/**
 * Display the User Editor form validation errors
 * @param formControl The formgroup control to be checked
 * @param placeholder The field placeholder
 * @returns The error message to be displayed
 */
export function showValidationErrors(
  formControl: AbstractControl | null,
  placeholder: string | null,
): string
```

## File: auth/auth.md
```markdown
The `@dino/core/auth` module provides utilities for authentication against a [FusionAuth](https://fusionauth.io/) backend and to make authenticated requests to the [Hasura](https://hasura.io) backend.

Refresh tokens must be enabled in the FusionAuth application. Please refer to the [FusionAuth documentation](https://fusionauth.io/docs/v1/tech/tutorials/json-web-tokens).
```

## File: auth/index.ts
```typescript
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
```

## File: auth/ng-package.json
```json
{}
```

## File: cases/src/case-json.ts
```typescript
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
⋮----
import {RxJsonSchema} from 'rxdb';
⋮----
import {Case} from './case';
⋮----
// tslint:disable
```

## File: cases/src/case-manager.ts
```typescript
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
⋮----
import {Injectable} from '@angular/core';
import {
  CheckMetricPermission,
  DataModelManager,
  DataService,
  PermissionContextService,
} from '@dino/core/data';
⋮----
import {Case, migrationStrategies} from './case';
import {schema} from './case-json';
import {CasesModule} from './cases.module';
import {
  Content,
  createPdf,
  PageOrientation,
  TableCell,
  TCreatedPdf,
  TDocumentDefinitions,
} from '@ajf/core/pdfmake';
import JsBarcode from 'jsbarcode';
import {HttpClient} from '@angular/common/http';
import {TranslocoService} from '@ajf/core/transloco';
import {addMonths} from 'date-fns';
import {transformDateByLocale} from '@dino/core/langs';
⋮----
/**
 * Service that manages FormData Locations
 */
⋮----
export class CaseManager extends DataModelManager<Case>
⋮----
constructor(
    dataService: DataService,
    permissionContextService: PermissionContextService,
    private _httpClient: HttpClient,
    private _ts: TranslocoService,
)
⋮----
/**
   * Retrieves all elements to print the case card pdf
   * @param metric the case metric to print
   */
printCaseCardPdf(metric: Case | null, logoImage: string | null): void
⋮----
/**
   * Get an image in base64
   * @param url image url
   * @param callback callback function
   */
private toDataURL(url: string, callback: any)
⋮----
private textToBase64Barcode(text: string)
⋮----
/**
   * Get the case image in base64 format
   * @param metric the case metric to print
   * @param logo the logo in base64 format
   * @returns
   */
private getCaseImage(metric: Case | null, logo: string): void
⋮----
/**
   * Create the case card pdf
   * @param metric the case metric to print
   * @param logo the logo in base64 format
   * @param caseImage the case image in base64 format
   */
createCardPdf(metric: Case, logo: string, caseImage: string | null): void
⋮----
let translate: (s: string)
⋮----
translate = s => {
if (s == null || s.trim() === '')
⋮----
// Card code
⋮----
// Expire date
⋮----
/**
   * Retrieves the 'expire_in_months' value from the metric_data attributes.
   * If it exists and is a valid number,
   * returns a formatted "expires on" date calculated as today + <expire_in_months> months.
   *
   * @param metric - The metric object containing metric_data.
   * @returns A formatted expiration date string or null.
   */
private _getExpiresOnDate(metric: Case): string | null
⋮----
/**
   * Create and open the pdf card.
   * Credit card size: 3,375*2.125 inches (in pdf: points = inches * 72)
   * @param content the odf content
   * @param orientation
   */
private createMetricPdf(content: Content[], orientation?: PageOrientation): TCreatedPdf
```

## File: cases/src/case.ts
```typescript
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
import {Metric} from '@dino/core/data';
import {MigrationStrategies, RxDocument} from 'rxdb';
⋮----
/**
 * This model is used to store Cases.
 * @title Case
 */
export interface Case extends Metric {
  /**
   * The Case Code identifier
   */
  code?: number;

  /**
   * The case notes
   */
  notes?: string | null;

  /**
   * The case image url
   */
  image_file?: string | null;
}
⋮----
/**
   * The Case Code identifier
   */
⋮----
/**
   * The case notes
   */
⋮----
/**
   * The case image url
   */
```

## File: cases/src/cases.module.ts
```typescript
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
⋮----
import {NgModule} from '@angular/core';
import {ActiveMetric, MetricsService} from '@dino/core/data';
import {FiltersService} from '@dino/core/list';
import {schema} from './case-json';
⋮----
/**
 * Optional module augmenting Forms that provides the CasesManager service
 */
⋮----
export class CasesModule
⋮----
constructor(private _filtersService: FiltersService, private _metricsService: MetricsService)
```

## File: cases/src/form-data.ts
```typescript
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
⋮----
import {FormData as BaseFormData} from '@dino/core/forms';
⋮----
/**
 * Augments Form Data with the id of its case management
 */
⋮----
interface FormData extends BaseFormData {
    /**
     * The Form Data case id.
     */
    case_ref_id: string | null;
  }
⋮----
/**
     * The Form Data case id.
     */
```

## File: cases/src/populated-with-case.ts
```typescript
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
⋮----
import {Observable} from 'rxjs';
import {Case} from './case';
⋮----
/**
 * Interface that represents the populated Area refs.
 */
export interface PopulatedWithCase {
  /**
   * The populated Cases observable.
   */
  case: Observable<Case[]>;
}
⋮----
/**
   * The populated Cases observable.
   */
```

## File: cases/src/public_api.ts
```typescript
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
```

## File: cases/src/report-data.ts
```typescript
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
⋮----
import {ReportData as BaseReportData} from '@dino/core/reports';
⋮----
/**
 * Augments Report Data with the id of its case
 */
⋮----
interface ReportData extends BaseReportData {
    /**
     * The Report Data case id.
     */
    case_ref_id: string | null;
  }
⋮----
/**
     * The Report Data case id.
     */
```

## File: cases/cases.md
```markdown
The `@dino/core/cases` module provides the interface for the Cases model, and a Data Manager for cases.
It augments the `@dino/core/forms` module by adding a "case" property to the Form Data.
When imported, it makes the "case" basic filter available.
```

## File: cases/index.ts
```typescript
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
```

## File: cases/ng-package.json
```json
{}
```

## File: config/src/config.module.ts
```typescript
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
⋮----
import {ModuleWithProviders, NgModule} from '@angular/core';
⋮----
import {CONFIG_SERVICE_CONFIG, ConfigServiceConfig} from './config.token';
⋮----
export class ConfigModule
⋮----
static forRoot(config: ConfigServiceConfig): ModuleWithProviders<ConfigModule>
```

## File: config/src/config.response.ts
```typescript
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
⋮----
/**
 * Type of the Function that parses and transforms the data received from
 * the config API into a config response.
 */
export type ConfigTransformFunction = (configs: any) => ConfigResponse;
⋮----
/**
 * Response of the login api.
 */
export type ConfigSet = {
  /**
   * The configuration set name identifier
   */
  name: string;
  authConfig: {[key: string]: any};
  dataConfig: {[key: string]: any};
  additionalConfig?: {[key: string]: any};
};
⋮----
/**
   * The configuration set name identifier
   */
⋮----
/**
 * The type of the config API response.
 */
export type ConfigResponse = {
  configSets: ConfigSet[];
};
```

## File: config/src/config.service.ts
```typescript
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
⋮----
import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of as obsOf} from 'rxjs';
import {map} from 'rxjs/operators';
⋮----
import {ConfigModule} from './config.module';
import {ConfigResponse, ConfigSet, ConfigTransformFunction} from './config.response';
import {CONFIG_SERVICE_CONFIG, ConfigServiceConfig} from './config.token';
⋮----
/**
 * Service that can dynamically set Dino configuration parameters for
 * Auth and Data.
 */
⋮----
export class ConfigService
⋮----
/**
   * The url of the api from where to retrieve the config
   */
⋮----
/**
   * The currently selected configuration set.
   */
⋮----
constructor(
    private _httpClient: HttpClient,
    @Inject(CONFIG_SERVICE_CONFIG) readonly config: ConfigServiceConfig,
)
⋮----
/**
   * Gets the configurations from the API
   * @param setupFn? Optional transform function
   * @returns The configs from the config API, if present
   */
getConfigs(setupFn?: ConfigTransformFunction): Observable<ConfigResponse | null>
⋮----
/**
   * Resets the Configuration set.
   */
resetConfigurationset(): void
```

## File: config/src/config.spec.ts
```typescript
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {take} from 'rxjs/operators';
⋮----
import {ConfigServiceConfig} from './config.token';
import {CONFIG_SERVICE_CONFIG, ConfigResponse, ConfigSet, ConfigService} from './public_api';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
⋮----
const setupFn = (apiConfig:
```

## File: config/src/config.token.ts
```typescript
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
⋮----
import {InjectionToken} from '@angular/core';
⋮----
/**
 * Config service parameters
 */
export interface ConfigServiceConfig {
  /**
   * The url of the api from where to retrieve the config
   */
  apiUrl: string;
  /**
   * The optional config set name to match the correspondent
   * config set in the api response
   */
  configName?: string;
}
⋮----
/**
   * The url of the api from where to retrieve the config
   */
⋮----
/**
   * The optional config set name to match the correspondent
   * config set in the api response
   */
```

## File: config/src/public_api.ts
```typescript
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
```

## File: config/config.md
```markdown
The `@dino/core/config` module provides the core Config module for allowing dynamic configuration and setting of Auth and Data modules.
```

## File: config/index.ts
```typescript
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
```

## File: config/ng-package.json
```json
{}
```

## File: cypress/e2e/test.cy.ts
```typescript

```

## File: cypress/plugins/index.ts
```typescript
// Plugins enable you to tap into, modify, or extend the internal behavior of Cypress
// For more info, visit https://on.cypress.io/plugins-api
```

## File: cypress/support/commands.ts
```typescript
// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
```

## File: cypress/support/index.ts
```typescript
// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
⋮----
// When a command from ./commands is ready to use, import with `import './commands'` syntax
// import './commands';
```

## File: data/src/action-trigger.ts
```typescript
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
⋮----
import {RxDocument} from 'rxdb';
import {DataModelManager} from './data-model-manager';
⋮----
/**
 * The type of the Trigger event
 */
export type TriggerType =
  | 'on_status_change'
  | 'on_signup'
  | 'on_signin'
  | 'on_form_data_creation'
  | 'on_form_data_change'
  | 'on_form_data_save_draft'
  | 'on_form_data_export'
  | 'on_list_item_selection'
  | 'on_user_data_creation'
  | 'on_user_data_change'
  | 'on_custom_trigger';
⋮----
/**
 * Represents optional info relative to an ActionTrigger
 */
export interface ActionTriggerData<T = {}> {
  /**
   * Previous value, specified in case of 'change' triggers
   */
  previousValue?: any;

  /**
   * New value, specified in case of 'change' triggers
   */
  newValue?: any;

  /**
   * The Edited or Created RxDocument.
   */
  doc?: RxDocument<T> | T;

  /**
   * Any additional info provided
   */
  additional_info?: {[key: string]: any};
}
⋮----
/**
   * Previous value, specified in case of 'change' triggers
   */
⋮----
/**
   * New value, specified in case of 'change' triggers
   */
⋮----
/**
   * The Edited or Created RxDocument.
   */
⋮----
/**
   * Any additional info provided
   */
⋮----
/**
 * Represent a trigger output event that is emitted as an Action hook
 */
export interface ActionTrigger<T = {}> {
  /**
   * The name identifier of the trigger
   */
  name: string;

  /**
   * The type of the trigger
   */
  triggerType: TriggerType;

  /**
   * The trigger optional data info
   */
  triggerData: ActionTriggerData<T> | null;
}
⋮----
/**
   * The name identifier of the trigger
   */
⋮----
/**
   * The type of the trigger
   */
⋮----
/**
   * The trigger optional data info
   */
⋮----
/**
 * Represents the automatic actions performed by the app
 * when triggering conditions are met
 */
export type Actions = {
  [trigger in TriggerType]?: {
    <T = {}>(
      trigger: ActionTrigger<T>,
      managers: {[key: string]: DataModelManager<any> | null},
      ...args: any[]
    ): any;
  } | null;
};
```

## File: data/src/active-sync-interface.ts
```typescript
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
⋮----
import {RxDocumentData} from 'rxdb';
import {RxGraphQLReplicationState} from 'rxdb/plugins/replication-graphql';
import {Observable} from 'rxjs';
import {Model} from './model';
⋮----
/**
 * A collection synchronization state object
 */
export interface ActiveSync<T extends Model = Model> {
  /**
   * The synchronization state
   */
  state: RxGraphQLReplicationState<any, RxDocumentData<T>>;

  /**
   * The synchronized collection name
   */
  collectionName: string;

  /**
   * The state graphql client subscription
   */
  clientRequestSub: {unsubscribe: () => void};

  /**
   * The state received graphql subscription
   */
  stateReceivedSub: {unsubscribe: () => void};

  /**
   * Observable of the activity state.
   * If true, the sync is currenctly active.
   */
  stateActivity: Observable<boolean>;

  /**
   * Number of resync attempts after a sync failure.
   */
  retrySyncAttempts?: number;
}
⋮----
/**
   * The synchronization state
   */
⋮----
/**
   * The synchronized collection name
   */
⋮----
/**
   * The state graphql client subscription
   */
⋮----
/**
   * The state received graphql subscription
   */
⋮----
/**
   * Observable of the activity state.
   * If true, the sync is currenctly active.
   */
⋮----
/**
   * Number of resync attempts after a sync failure.
   */
```

## File: data/src/ajf-custom-functions.ts
```typescript
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
⋮----
/**
 * Represents the ajf custom function used by the app
 * in ajf form and report
 */
export type AjfCustomFunctions = {
  [key: string]: {(...args: any[]): any} | null;
};
```

## File: data/src/base-data-model-manager.ts
```typescript
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
⋮----
import {deepCopy} from '@ajf/core/utils';
import {DeepReadonlyObject, MangoQuery, MangoQuerySelector, RxJsonSchema} from 'rxdb';
import {BehaviorSubject, Observable, of as obsOf, throwError, zip} from 'rxjs';
import {catchError, filter, map, switchMap, take, tap} from 'rxjs/operators';
⋮----
import {PermissionContextService} from './data-context-service';
import {
  DataCreateCollectionRequest,
  PullQueryContextChecks,
} from './data-create-collection-request';
import {IDataModelManager} from './data-model-manager-interface';
import {DataListOptions, DataQueryOptions, DataQuerySort} from './data-options-interface';
import {Permission} from './data-permission';
import {PermissionContext, PermissionContextDataUpdate} from './data-permission-interface';
import {CollectionChangedEvent, IDataService} from './data-service-interface';
import {InsertModel} from './insert-model';
import {Model} from './model';
⋮----
/**
 * This class will manage the data model, providing basic and generic Crud methods
 * to all services extending it.
 * All the operations will be performed on the database model named as _modelName,
 * provided in the IDataModelManager constructor.
 */
export abstract class BaseDataModelManager<T extends Model = Model, R extends T = T>
implements IDataModelManager<T, R>
⋮----
/**
   * A foreign key to retrieve child docs (details) in an
   * expandable list
   */
⋮----
/**
   * The data manager to get details in an expandable list
   */
⋮----
/**
   * Gets the child docs of a parent doc, in expandable lists.
   * @param doc The parent doc
   * @param querySelector? Additional query params
   */
⋮----
get permissions(): Permission[]
⋮----
constructor(
    createParams: DataCreateCollectionRequest,
    private _dataService: IDataService,
    private _contextService: PermissionContextService,
    private _permissions: Permission[] = [],
    private _pullQueryContextChecks?: PullQueryContextChecks,
)
⋮----
/**
   * Retrieves the collection name
   * @returns The name of the model/collection
   */
get collectionName(): string
⋮----
/**
   * Retrieves the collection schema
   * @returns RxJsonSchema
   */
get collectionSchema(): RxJsonSchema<T>
⋮----
/**
   * Exposes the data service collectionChanged event.
   * Emits only when the change event is related to the
   * data model manager own collection.
   */
get collectionChanged(): Observable<CollectionChangedEvent>
⋮----
/**
   * Initializes and creates the collection.
   */
init(): Observable<boolean>
⋮----
/**
   * Updates the Context by adding new data
   */
addToContext(data: PermissionContextDataUpdate): void
⋮----
/**
   * Creates an object with a unique uuidv4 Id in the model collection
   * @param obj
   * @returns an observable of the created object
   */
create(obj: InsertModel<T>): Observable<R | null>
⋮----
/**
   * Creates multiple objects with a unique uuidv4 Id in the model collection
   * @param data
   * @returns an observable of the array of the created objects
   */
bulkCreate(data: InsertModel<T>[]): Observable<
⋮----
/**
   * Updates multiple objects with a unique uuidv4 Id in the model collection
   * @param data The form datas that need to be updated
   * @param update The update to be applied to all provided form datas
   * @returns an observable of the array of the created objects
   */
bulkUpdate(data: T[], update: Partial<T>): Observable<(R | null)[]>
⋮----
/**
   * Retrieves a single object by id from the model collection
   * @param id
   * @returns an observable of the retrieved object
   */
get(id: string): Observable<R | null>
⋮----
/**
   * Retrieves a list of objects from the model collections.
   * Optional parameters can be passed to modify the returned list.
   * @param options? a list of DataListOptions options.
   * @returns The documents selected.
   */
list(options?: DataListOptions): Observable<R[]>
⋮----
/**
   * Performs a query on the model collection, given a list of options
   * (a mango query selector is a required option).
   * Optional parameters can be passed to modify the returned list.
   * @param options a list of DataQueryOptions parameters.
   * @returns The multiple documents selected.
   */
query(options: DataQueryOptions): Observable<R[]>
⋮----
/**
   * Removes a single object by id from the model collection
   * @param data
   * @returns an observable of the deleted object
   */
delete(data: string | T): Observable<R | null>
⋮----
/**
   * Deletes multiple objects in the model collection
   * @param data
   * @returns an observable of the array of the deleted objects
   */
bulkDelete(data: T[]): Observable<R[] | null>
⋮----
/**
   * Updates a single object in the model collection,
   * replacing all field values with the passed object properties values.
   * @param obj
   * @returns an observable of the updated object
   */
update(obj: T): Observable<R | null>
⋮----
/**
   * Patches a single object in the model collection,
   * replacing the values of the fields corresponding to the passed object properties.
   * @param data
   * @returns an observable of the patched object
   */
patch(data: Partial<T> &
⋮----
/**
   * Generates additional filters based of the model of the "data" property of
   * the main model. This is overridden by methods which are specific for
   * each concrete DataModelManager.
   * An optional schema for the filters generation can be provided.
   * @param _dataSchema The schema of the "additionalData" model
   */
generateAdditionalFilters(_dataSchema?: any, _nodesVisibility?: any): any[]
⋮----
/**
   * Transforms an object into a list of Mango update operations
   * @param data
   * @returns a Mango update operation
   */
private _prepareUpdateQuery(data: Partial<T>): any
⋮----
/**
   * Checks all Permissions for viewing an object in a given Context
   * @param object The doc to be viewed
   * @param context? The permission context data
   * @returns True if the permission is granted
   */
canView(object: R, context?: PermissionContext): boolean
⋮----
/**
   * Checks all Permissions for creating an object in a given Context
   * @param object The object to be created
   * @param context The permissions context
   * @returns True if the object can be created
   */
canCreate(object: InsertModel<T>, context?: PermissionContext): boolean
⋮----
/**
   * Checks all Permissions for modifying an object in a given Context
   * @param data The partial updates to be performed
   * @param object The object to be modified
   * @param context The permissions context
   * @returns True if the object can be modified
   */
canModify(data: Partial<T> &
⋮----
/**
   * Checks all Permissions for deleting an object in a given Context
   * @param object The object to be deleted
   * @param context The permissions context
   * @returns True if the object can be deleted
   */
canDelete(object: T, context?: PermissionContext): boolean
⋮----
/**
   * Queries all the descendants of the document, based on its "parent_id" attribute.
   * @param ids The IDs of the documents to be checked.
   * @param limit The optional query limit.
   * @returns All of its descendants
   */
findDescendants(ids: string[], limit?: number): Observable<R[]>
⋮----
/**
   * Finds all ancestors of matching documents by their "parent_id" attribute
   * @param allDocs The list of all documents
   * @param selectedDocsParentIDs The parent_ids of all documents whose ancestors must be found
   * @returns All the ancestors of the selected documents
   */
findMatchingAncestors(
    allDocs: (R & {parent_id: string | null})[],
    selectedDocsParentIDs: (string | null)[],
): (R &
⋮----
/**
   * Organizes documents hyerarchically (parent->children)
   * @param allDocs All the unorganized documents
   * @param allParentIDs An array of all the ids of documents that have children
   * @param parent An object defining the parent id and the current level in the nested list
   * @param topCall True if it's the first call for of the method
   * @returns The organized documents with their new level attribute
   */
organizeDocsHierarchy(
    allDocs: (R & {parent_id: string | null})[],
    allParentIDs: (string | null)[],
    parent: {id: string | null; level: number | null} = {id: null, level: null},
    firstCall: boolean = true,
): (R &
⋮----
// Get every element whose parent_id attribute matches the parent's id.
⋮----
// If all the docs have a parent but the ancestor is not in the hierarchy, a new ancestor is determined
// by finding the doc whose parent_id is the id of the missing ancestor.
⋮----
// Set the level based on the parent level for each element identified,
// add them to the result array, then recursively sort the children.
⋮----
// If the full cycle is completed, and some docs are left out of the hierarchy (orphans)
// they are now brought up to "level 0" and introduced in the hierarchy.
⋮----
/**
   * Transforms a resulting object to a deep readonly version of the base object
   */
protected _objectToJSON(obj: R): DeepReadonlyObject<T>
⋮----
/**
   * Returns permission context after collection initialization.
   */
private _getPermissionContext(): Observable<PermissionContext>
⋮----
get permissionContext(): Observable<PermissionContext>
⋮----
/**
   * Creates a Mango query from a list or query options
   * @param options The list or query options
   * @returns a Mango query
   */
private _optionsToMangoQuery(options?: DataListOptions | DataQueryOptions): MangoQuery<T>
```

## File: data/src/check-metric-permission.ts
```typescript
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
⋮----
import {Metric} from './metric';
import {Permission} from './data-permission';
import {CanViewData} from './data-permission-interface';
import {RxDocument} from 'rxdb';
⋮----
/**
 * Permission that checks if the Active User can see or perform operation on a Metric on their metric list.
 */
export class CheckMetricPermission<T extends Metric = Metric> implements Permission<T>
⋮----
constructor()
canView(data: CanViewData<T>): boolean
⋮----
/**
   * Verifies a metric presence in the Active User permission context.
   * @param data The Metric and context to be checked
   * @returns True if the Metric can be viewed
   */
private _canViewMetric(data: CanViewData<T>): boolean
```

## File: data/src/clone.ts
```typescript
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
⋮----
import {DeepReadonlyObject} from 'rxdb';
⋮----
import {Model} from './model';
⋮----
export const clone = <T extends Model>(obj: DeepReadonlyObject<T>)
```

## File: data/src/data-bulk-insert-request.ts
```typescript
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
⋮----
import {DataRequest} from './data-request';
import {InsertModel} from './insert-model';
import {Model} from './model';
⋮----
/**
 * Data insert item request parameters.
 */
export interface DataBulkInsertRequest<T extends Model> extends DataRequest {
  /**
   * The objects to insert.
   */
  objects: InsertModel<T>[];
}
⋮----
/**
   * The objects to insert.
   */
```

## File: data/src/data-context-service.ts
```typescript
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
⋮----
import {Injectable, isDevMode} from '@angular/core';
import {AuthService, DinoUserInfo, User} from '@dino/core/auth';
import {BehaviorSubject, combineLatest, Observable, of as obsOf} from 'rxjs';
import {delay, distinctUntilKeyChanged, filter, map, retryWhen} from 'rxjs/operators';
import {PermissionContext, PermissionContextDataUpdate} from './data-permission-interface';
import {MetricsService} from './metrics.service';
⋮----
/**
 * Service that provides a Context for the DataModelManager and is augmented by the
 * concrete Managers inheriting from DataModelManager
 */
⋮----
export class PermissionContextService
⋮----
constructor(private _authService: AuthService, private _ms: MetricsService)
⋮----
/**
   * Adds additional data to the Context, which will be globally available
   */
addToContext(param: PermissionContextDataUpdate): void
⋮----
/**
   * Resets the current Context to its inital state
   */
resetContext(): void
⋮----
/**
   * Checks the User permissions for a specific action on a specific element
   *
   * @param docId The id of the Document to be checked
   * @param collectionName The name of the Collection to be checked
   * @param action The action the user wishes to perform
   * @param context? The permissions context
   * @param isData? True if the actions refer to list data
   * @returns True if the permission is granted
   */
checkPermission(
    docId: string,
    collectionName: string,
    action: string,
    context?: PermissionContext,
    isData?: boolean,
): boolean
⋮----
/**
   * Retrieves the actions allowed to the Active User for the specified document/model.
   *
   * @param collectionName The name of the Collection to be checked
   * @param docId? The id of the Document to be checked
   * @param isData? True if the actions refer to list data
   * @param instanceName? The name identifier of the Dino instance
   * @param rowId? The id of the item displayed in the currently highlighted row
   * @param favorites? If true, "favorites" actions are added
   * @returns The actions allowed to the user
   */
getAllowedActions(
    collectionName: string,
    docId?: string,
    isData?: boolean,
    instanceName?: string,
    rowId?: string | null,
    favorites?: boolean,
): Observable<string[]>
⋮----
/**
   * If true, the metric passed as an argument matches with one in the current
   * permission context
   * @param doc The metric to check
   * @param context The current permission context
   * @returns True if it matches
   */
getMatchingMetric<T>(doc: T, context?: PermissionContext): boolean
⋮----
/**
   * Returns the Form Schema ids on which the active user has
   * creation permissions.
   * @returns The ids of the Form Schemas on which the user has creation permission
   */
getWhichFormCanBeCreated(): Observable<string[]>
⋮----
/**
   * Checks if the active user is a Guest Only user
   * @param permissions The current user permissions
   * @returns True if the user is Guest only
   */
isActiveUserGuestOnly(permissions:
```

## File: data/src/data-create-collection-request.ts
```typescript
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
⋮----
import {RxCollectionCreator} from 'rxdb';
import {PermissionContext} from './data-permission-interface';
⋮----
import {PullQueryExtraParams} from './pull-query-extra-params';
import {PushQueryExtraParams} from './push-query-extra-params';
⋮----
/**
 * Data create collection request parameters.
 */
export interface DataCreateCollectionRequest {
  /**
   * The collection name
   */
  name: string;

  /**
   * The collection to create.
   */
  collection: RxCollectionCreator;

  /**
   * Extra parameters to add to the sync pull query.
   */
  pullQueryExtraParams?: PullQueryExtraParams;

  /**
   * Extra parameters to add to the sync push query.
   */
  pushQueryExtraParams?: PushQueryExtraParams;
}
⋮----
/**
   * The collection name
   */
⋮----
/**
   * The collection to create.
   */
⋮----
/**
   * Extra parameters to add to the sync pull query.
   */
⋮----
/**
   * Extra parameters to add to the sync push query.
   */
⋮----
/**
 * Represents data that need to be matched against the
 * active user permission context to filter the synced data.
 */
export type PullQueryContextChecks = {checkName: keyof PermissionContext; checkKey?: string}[];
```

## File: data/src/data-find-request.ts
```typescript
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
⋮----
import {MangoQuery} from 'rxdb';
⋮----
import {DataRequest} from './data-request';
import {Model} from './model';
⋮----
/**
 * Data query request parameters.
 */
export interface DataFindRequest<T extends Model = Model> extends DataRequest {
  /**
   * Mango query
   */
  query?: MangoQuery<T>;
}
⋮----
/**
   * Mango query
   */
```

## File: data/src/data-get-request.ts
```typescript
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
⋮----
import {DataRequest} from './data-request';
⋮----
/**
 * Data get item request parameters.
 */
export interface DataGetRequest extends DataRequest {
  /**
   * UUID v4 identifier
   */
  id: string;
}
⋮----
/**
   * UUID v4 identifier
   */
```

## File: data/src/data-insert-request.ts
```typescript
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
⋮----
import {DataRequest} from './data-request';
import {InsertModel} from './insert-model';
import {Model} from './model';
⋮----
/**
 * Data insert item request parameters.
 */
export interface DataInsertRequest<T extends Model> extends DataRequest {
  /**
   * The object to insert.
   */
  object: InsertModel<T>;
}
⋮----
/**
   * The object to insert.
   */
```

## File: data/src/data-model-manager-interface.ts
```typescript
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
⋮----
import {Observable} from 'rxjs';
⋮----
import {DataListOptions, DataQueryOptions} from './data-options-interface';
import {Permission} from './data-permission';
import {PermissionContext, PermissionContextDataUpdate} from './data-permission-interface';
import {CollectionChangedEvent} from './data-service-interface';
import {InsertModel} from './insert-model';
import {Model} from './model';
⋮----
/**
 * This class will manage the data model, providing basic and generic Crud methods
 * to all services extending it.
 * All the operations will be performed on the model named as _modelName,
 * provided in the DataModelManager constructor.
 */
export interface IDataModelManager<T extends Model = Model, R extends T = T> {
  /**
   * A foreign key to retrieve child docs (details) in an
   * expandable list
   */
  detailsKey?: keyof T;

  /**
   * The data manager to get details in an expandable list
   */
  detailsManager?: IDataModelManager<any>;

  readonly permissions: Permission[];

  /**
   * The collection name
   */
  readonly collectionName: string;

  /**
   * Exposes the data service collectionChanged event.
   * Emits only when the change event is related to the
   * data model manager own collection.
   */
  readonly collectionChanged: Observable<CollectionChangedEvent>;

  readonly permissionContext: Observable<PermissionContext>;

  /**
   * Gets the child docs of a parent doc, in expandable lists.
   * @param doc The parent doc
   * @param querySelector? Additional query params
   */
  getSubData?: (doc: T, querySelector?: any) => Observable<T[]>;

  /**
   * Initializes and creates the collection.
   */
  init(): Observable<boolean>;

  /**
   * Updates the Context by adding new data
   */
  addToContext(data: PermissionContextDataUpdate): void;

  /**
   * Creates an object with a unique uuidv4 Id in the model collection
   * @param obj
   * @returns an observable of the created object
   */
  create(obj: InsertModel<T>): Observable<R | null>;

  /**
   * Creates multiple objects with a unique uuidv4 Id in the model collection
   * @param data
   * @returns an observable of the array of the created objects
   */
  bulkCreate(data: InsertModel<T>[]): Observable<{success: R[]; error: any[]}>;

  /**
   * Retrieves a single object by id from the model collection
   * @param id
   * @returns an observable of the retrieved object
   */
  get(id: string): Observable<R | null>;

  /**
   * Retrieves a list of objects from the model collections.
   * Optional parameters can be passed to modify the returned list.
   * @param options? a list of DataListOptions options.
   * @returns The multiple documents selected.
   */
  list(options?: DataListOptions): Observable<R[]>;

  /**
   * Performs a query on the model collection, given a list of options
   * (a mango query selector is a required option).
   * Optional parameters can be passed to modify the returned list.
   * @param options a list of DataQueryOptions parameters.
   * @returns The multiple documents selected.
   */
  query(options: DataQueryOptions): Observable<T[]>;

  /**
   * Removes a single object by id from the model collection
   * @param data
   * @returns an observable of the deleted object
   */
  delete(data: string | T): Observable<T | null>;

  /**
   * Deletes multiple objects in the model collection
   * @param data
   * @returns an observable of the array of the deleted objects
   */
  bulkDelete(data: T[]): Observable<R[] | null>;

  /**
   * Updates a single object in the model collection,
   * replacing all field values with the passed object properties values.
   * @param obj
   * @returns an observable of the updated object
   */
  update(obj: T): Observable<R | null>;

  /**
   * Patches a single object in the model collection,
   * replacing the values of the fields corresponding to the passed object properties.
   * @param data
   * @returns an observable of the patched object
   */
  patch(data: Partial<T> & {id: string}): Observable<R | null>;

  /**
   * Generates additional filters based of the model of the "data" property of
   * the main model. This is overridden by methods which are specific for
   * each concrete DataModelManager.
   * An optional schema for the filters generation can be provided.
   * @param dataSchema The schema of the "additionalData" model
   */
  generateAdditionalFilters(dataSchema?: any): any[];

  /**
   * Checks all Permissions for viewing an object in a given Context
   * @param object The doc to be viewed
   * @param context The permission context data
   * @returns True if the permission is granted
   */
  canView(object: R, context?: PermissionContext): boolean;

  /**
   * Checks all Permissions for creating an objectin a given Context
   * @param object The object to be created
   * @param context The permissions context
   * @returns True if the object can be created
   */
  canCreate(object: InsertModel<T>, context?: PermissionContext): boolean;

  /**
   * Checks all Permissions for modifying an object in a given Context
   * @param data The updates to be performed
   * @param object The object to be modified
   * @param context The permissions context
   * @returns True if the object can be modified
   */
  canModify(data: Partial<T> & {id: string}, object: R, context?: PermissionContext): boolean;

  /**
   * Checks all Permissions for deleting an object in a given Context
   * @param object The object to be deleted
   * @param context The permissions context
   * @returns True if the object can be deleted
   */
  canDelete(object: R, context?: PermissionContext): boolean;
}
⋮----
/**
   * A foreign key to retrieve child docs (details) in an
   * expandable list
   */
⋮----
/**
   * The data manager to get details in an expandable list
   */
⋮----
/**
   * The collection name
   */
⋮----
/**
   * Exposes the data service collectionChanged event.
   * Emits only when the change event is related to the
   * data model manager own collection.
   */
⋮----
/**
   * Gets the child docs of a parent doc, in expandable lists.
   * @param doc The parent doc
   * @param querySelector? Additional query params
   */
⋮----
/**
   * Initializes and creates the collection.
   */
init(): Observable<boolean>;
⋮----
/**
   * Updates the Context by adding new data
   */
addToContext(data: PermissionContextDataUpdate): void;
⋮----
/**
   * Creates an object with a unique uuidv4 Id in the model collection
   * @param obj
   * @returns an observable of the created object
   */
create(obj: InsertModel<T>): Observable<R | null>;
⋮----
/**
   * Creates multiple objects with a unique uuidv4 Id in the model collection
   * @param data
   * @returns an observable of the array of the created objects
   */
bulkCreate(data: InsertModel<T>[]): Observable<
⋮----
/**
   * Retrieves a single object by id from the model collection
   * @param id
   * @returns an observable of the retrieved object
   */
get(id: string): Observable<R | null>;
⋮----
/**
   * Retrieves a list of objects from the model collections.
   * Optional parameters can be passed to modify the returned list.
   * @param options? a list of DataListOptions options.
   * @returns The multiple documents selected.
   */
list(options?: DataListOptions): Observable<R[]>;
⋮----
/**
   * Performs a query on the model collection, given a list of options
   * (a mango query selector is a required option).
   * Optional parameters can be passed to modify the returned list.
   * @param options a list of DataQueryOptions parameters.
   * @returns The multiple documents selected.
   */
query(options: DataQueryOptions): Observable<T[]>;
⋮----
/**
   * Removes a single object by id from the model collection
   * @param data
   * @returns an observable of the deleted object
   */
delete(data: string | T): Observable<T | null>;
⋮----
/**
   * Deletes multiple objects in the model collection
   * @param data
   * @returns an observable of the array of the deleted objects
   */
bulkDelete(data: T[]): Observable<R[] | null>;
⋮----
/**
   * Updates a single object in the model collection,
   * replacing all field values with the passed object properties values.
   * @param obj
   * @returns an observable of the updated object
   */
update(obj: T): Observable<R | null>;
⋮----
/**
   * Patches a single object in the model collection,
   * replacing the values of the fields corresponding to the passed object properties.
   * @param data
   * @returns an observable of the patched object
   */
patch(data: Partial<T> &
⋮----
/**
   * Generates additional filters based of the model of the "data" property of
   * the main model. This is overridden by methods which are specific for
   * each concrete DataModelManager.
   * An optional schema for the filters generation can be provided.
   * @param dataSchema The schema of the "additionalData" model
   */
generateAdditionalFilters(dataSchema?: any): any[];
⋮----
/**
   * Checks all Permissions for viewing an object in a given Context
   * @param object The doc to be viewed
   * @param context The permission context data
   * @returns True if the permission is granted
   */
canView(object: R, context?: PermissionContext): boolean;
⋮----
/**
   * Checks all Permissions for creating an objectin a given Context
   * @param object The object to be created
   * @param context The permissions context
   * @returns True if the object can be created
   */
canCreate(object: InsertModel<T>, context?: PermissionContext): boolean;
⋮----
/**
   * Checks all Permissions for modifying an object in a given Context
   * @param data The updates to be performed
   * @param object The object to be modified
   * @param context The permissions context
   * @returns True if the object can be modified
   */
canModify(data: Partial<T> &
⋮----
/**
   * Checks all Permissions for deleting an object in a given Context
   * @param object The object to be deleted
   * @param context The permissions context
   * @returns True if the object can be deleted
   */
canDelete(object: R, context?: PermissionContext): boolean;
```

## File: data/src/data-model-manager.spec.ts
```typescript
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {EventEmitter, Injectable} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig, User} from '@dino/core/auth';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';
import {RxJsonSchema} from 'rxdb';
import {firstValueFrom, Observable, of as obsOf} from 'rxjs';
import {take} from 'rxjs/operators';
⋮----
import {PermissionContext} from './data-permission-interface';
⋮----
import {
  CanCreateData,
  CanDeleteData,
  CanModifyData,
  DATA_SERVICE_CONFIG,
  DataCreateCollectionRequest,
  DataListOptions,
  DataModelManager,
  DataQueryOptions,
  DataService,
  DataServiceConfig,
  Model,
  Permission,
  PermissionContextService,
} from './public_api';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
⋮----
interface DummyModel extends Model {
  name: string;
  age?: number;
  author?: string;
}
⋮----
@Injectable()
class ContextServiceMock extends PermissionContextService
⋮----
class ContextServiceMock extends PermissionContextService
override checkPermission()
override getMatchingMetric()
⋮----
class DummyManager extends DataModelManager<DummyModel>
⋮----
constructor(
    createParams: DataCreateCollectionRequest,
    dataService: DataService,
    contextService: ContextServiceMock,
    permissions: Permission[],
)
⋮----
class AgeAuthPermission implements Permission<DummyModel>
⋮----
canCreate(data: CanCreateData<DummyModel>): boolean
⋮----
canDelete(data: CanDeleteData<DummyModel>): boolean
⋮----
canModify(data: CanModifyData<DummyModel>): boolean
⋮----
function dataServiceConfig(): DataServiceConfig
```

## File: data/src/data-model-manager.ts
```typescript
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
⋮----
import {DeepReadonlyObject, RxDocument} from 'rxdb';
⋮----
import {BaseDataModelManager} from './base-data-model-manager';
import {PermissionContextService} from './data-context-service';
import {
  DataCreateCollectionRequest,
  PullQueryContextChecks,
} from './data-create-collection-request';
import {IDataModelManager} from './data-model-manager-interface';
import {Permission} from './data-permission';
import {DataService} from './data-service';
import {IDataService} from './data-service-interface';
import {Model} from './model';
⋮----
/**
 * This class will manage the data model, providing basic and generic Crud methods
 * to all services extending it.
 * All the operations will be performed on the RxDb collection named as _modelName,
 * provided in the DataModelManager constructor.
 */
export abstract class DataModelManager<T extends Model = Model>
extends BaseDataModelManager<T, RxDocument<T>>
⋮----
/**
   * The data manager to get details in an expandable list
   */
⋮----
constructor(
    createParams: DataCreateCollectionRequest,
    dataService: DataService,
    contextService: PermissionContextService,
    permissions: Permission[] = [],
    pullQueryContextChecks?: PullQueryContextChecks,
)
⋮----
protected override _objectToJSON(obj: RxDocument<T,
```

## File: data/src/data-module.ts
```typescript
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
⋮----
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from './data-service-config';
⋮----
export class DataModule
⋮----
static forRoot(config: DataServiceConfig): ModuleWithProviders<DataModule>
```

## File: data/src/data-options-interface.ts
```typescript
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
⋮----
export type DataQuerySortDir = 'asc' | 'desc';
⋮----
export type DataQuerySort = string | {[propName: string]: DataQuerySortDir};
⋮----
export interface DataListOptions {
  limit?: number;
  skip?: number;
  sort?: DataQuerySort[];
  index?: DataIndex; // @Todo
  search?: string; // @Todo
  fields?: string[]; // @Todo
}
⋮----
index?: DataIndex; // @Todo
search?: string; // @Todo
fields?: string[]; // @Todo
⋮----
export interface DataQueryOptions {
  selector: DataQuerySelector;
  fields?: string[]; // @Todo
  sort?: DataQuerySort[];
  limit?: number;
  skip?: number;
  joins?: DataJoinOptions[]; // @Todo
  index?: DataIndex; // @Todo
  attributes?: {
    [attributeName: string]: any;
  }; // @Todo
  group_by?: string[]; // @Todo
  distinct?: string[]; // @Todo
}
⋮----
fields?: string[]; // @Todo
⋮----
joins?: DataJoinOptions[]; // @Todo
index?: DataIndex; // @Todo
⋮----
}; // @Todo
group_by?: string[]; // @Todo
distinct?: string[]; // @Todo
⋮----
export type DataIndex = string | string[] | undefined;
⋮----
export interface DataIndexField {
  [prop: string]: 'asc' | 'desc';
}
⋮----
export type DataQuerySelector = {
  [propName: string]:
    | any
    | {
        $lt?: any;
        $gt?: any;
        $lte?: any;
        $gte?: any;
        $eq?: any;
        $elemMatch?: any;
        $ne?: any;
        $exists?: any;
        $in?: any;
        $nin?: any;
        $or?: any;
        $nor?: any;
        $not?: any;
        $regex?: any;
      };
};
⋮----
export interface DataJoinOptions {
  model: string;
  property: string;
  fields?: string[];
}
```

## File: data/src/data-pandino-config.ts
```typescript
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
⋮----
import {InjectionToken} from '@angular/core';
⋮----
/**
 * Pandino configuration.
 */
export interface PandinoConfig {
  /**
   * The Pandino API url
   */
  pandinoUrl?: string;
  /**
   * List of available namespaces for GPT data
   */
  pandinoGptNamespaces?: string[];
}
⋮----
/**
   * The Pandino API url
   */
⋮----
/**
   * List of available namespaces for GPT data
   */
⋮----
/**
 * export interface PandinoConfig injection token
 */
```

## File: data/src/data-permission-interface.ts
```typescript
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
⋮----
import {User} from '@dino/core/auth';
import {RxDocument} from 'rxdb';
⋮----
import {InsertModel} from './insert-model';
import {Model} from './model';
⋮----
/**
 * The Context of the Permission
 */
export interface PermissionContext {
  /**
   * The User performing the operation
   */
  user: User | null;

  /**
   * The User Data
   */
  user_data: RxDocument<any> | null;

  /**
   * Form Schemas associated with the user
   */
  user_form_schemas: Set<string> | null;

  /**
   * Report Schemas associated with the user
   */
  user_report_schemas: Set<string> | null;

  /**
   * Form Statuses associated with the user
   */
  user_form_statuses: Set<string> | null;

  /**
   * Metrics associated with the user
   */
  user_metrics: {[key: string]: string[]} | null;

  /**
   * Summary of the actions that can be performed by the user
   */
  user_permissions: {[key: string]: PermissionGroup} | null;
}
⋮----
/**
   * The User performing the operation
   */
⋮----
/**
   * The User Data
   */
⋮----
/**
   * Form Schemas associated with the user
   */
⋮----
/**
   * Report Schemas associated with the user
   */
⋮----
/**
   * Form Statuses associated with the user
   */
⋮----
/**
   * Metrics associated with the user
   */
⋮----
/**
   * Summary of the actions that can be performed by the user
   */
⋮----
/**
 * Represents a single Permission Group in PermissionContext 'user_permissions'
 */
export interface PermissionGroup {
  actions: {
    [key: string]: any;
  };
  form_schema: string[];
  form_status: string[];
  report_schema: string[];
  [permissionKey: string]: any;
}
⋮----
/**
 * The data used to update the Context
 */
export interface PermissionContextDataUpdate {
  [prop: string]: any;
}
⋮----
/**
 * The data used to evaluate Visualization permissions
 */
export interface CanViewData<M extends Model = Model> {
  /**
   * The document to be viewed
   */
  object: M;

  /**
   * The Context of the operation
   */
  context?: PermissionContext;
}
⋮----
/**
   * The document to be viewed
   */
⋮----
/**
   * The Context of the operation
   */
⋮----
/**
 * The data used to evaluate Creation permissions
 */
export interface CanCreateData<M extends Model = Model> {
  /**
   * The document to be created
   */
  object: InsertModel<M>;

  /**
   * The Context of the operation
   */
  context?: PermissionContext;
}
⋮----
/**
   * The document to be created
   */
⋮----
/**
   * The Context of the operation
   */
⋮----
/**
 * The data used to evaluate Modification permissions
 */
export interface CanModifyData<M extends Model = Model> {
  /**
   * The data used to modify the document
   */
  data: Partial<M> & {id: string};

  /**
   * The document to be modified
   */
  object: M;

  /**
   * The Context of the operation
   */
  context?: PermissionContext;
}
⋮----
/**
   * The data used to modify the document
   */
⋮----
/**
   * The document to be modified
   */
⋮----
/**
   * The Context of the operation
   */
⋮----
/**
 * The data used to evaluate Deletion permissions
 */
export interface CanDeleteData<M extends Model = Model> {
  /**
   * The document to be deleted
   */
  object: M;

  /**
   * The Context of the operation
   */
  context?: PermissionContext;
}
⋮----
/**
   * The document to be deleted
   */
⋮----
/**
   * The Context of the operation
   */
```

## File: data/src/data-permission.ts
```typescript
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
⋮----
import {
  CanCreateData,
  CanDeleteData,
  CanModifyData,
  CanViewData,
} from './data-permission-interface';
import {Model} from './model';
⋮----
/**
 * Interface to check and manage User permissions.
 * Exposes methods for checking User permissions to create, delete, or modify a document
 * in a given Context.
 */
export interface Permission<T extends Model = Model> {
  canView?(data: CanViewData<T>): boolean;
  canCreate?(data: CanCreateData<T>): boolean;
  canModify?(data: CanModifyData<T>): boolean;
  canDelete?(data: CanDeleteData<T>): boolean;
}
⋮----
canView?(data: CanViewData<T>): boolean;
canCreate?(data: CanCreateData<T>): boolean;
canModify?(data: CanModifyData<T>): boolean;
canDelete?(data: CanDeleteData<T>): boolean;
```

## File: data/src/data-request.ts
```typescript
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
⋮----
/**
 * Base data request
 */
export interface DataRequest {
  /**
   * Name of the item collection.
   */
  collectionName: string;
}
⋮----
/**
   * Name of the item collection.
   */
```

## File: data/src/data-service-config.ts
```typescript
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
⋮----
import {InjectionToken} from '@angular/core';
import {RxDatabaseCreator, SyncOptionsGraphQL} from 'rxdb';
⋮----
import {Model} from './model';
⋮----
/**
 * Data service GraphQL sync options.
 */
export interface DataServiceSyncOptions<T extends Model = Model>
  extends Omit<SyncOptionsGraphQL<T, Partial<T>>, 'headers' | 'pull' | 'push'> {
  /**
   * The number of documents synced in each pull request.
   */
  batchSizePull?: number;

  /**
   * The number of documents synced in each push request.
   */
  batchSizePush?: number;

  /**
   * Http and WebSocket endpoints (ws used for live sync).
   */
  url: {http: string; ws?: string};

  /**
   * WebSocket implementation class. Used mainly for testing.
   */
  webSocketImpl?: any;

  /**
   * Error message returned by the webSocket endpoint for signaling
   * the JWT token expiration
   */
  authErrorMessage?: string;

  /**
   * The error code number the websocket server returns when the Jwt token expires
   */
  socketJwtExpiredCode?: number;

  /**
   * If true, the App will run locally, detached from its backend.
   * No auth is required in this mode.
   */
  backendless?: boolean;

  /**
   * Maximum number of resync retry attempts after a sync error
   */
  retrySyncMaxAttempts?: number;
}
⋮----
/**
   * The number of documents synced in each pull request.
   */
⋮----
/**
   * The number of documents synced in each push request.
   */
⋮----
/**
   * Http and WebSocket endpoints (ws used for live sync).
   */
⋮----
/**
   * WebSocket implementation class. Used mainly for testing.
   */
⋮----
/**
   * Error message returned by the webSocket endpoint for signaling
   * the JWT token expiration
   */
⋮----
/**
   * The error code number the websocket server returns when the Jwt token expires
   */
⋮----
/**
   * If true, the App will run locally, detached from its backend.
   * No auth is required in this mode.
   */
⋮----
/**
   * Maximum number of resync retry attempts after a sync error
   */
⋮----
/**
 * Data service configuration.
 */
export interface DataServiceConfig<T extends Model = Model> {
  /**
   * Options used to create the RxDB database.
   */
  databaseCreateOptions: RxDatabaseCreator;

  /**
   * Options used to set up the GraphQL sync.
   */
  syncOptions: DataServiceSyncOptions<T>;
}
⋮----
/**
   * Options used to create the RxDB database.
   */
⋮----
/**
   * Options used to set up the GraphQL sync.
   */
⋮----
/**
 * DataServiceConfig injection token
 */
```

## File: data/src/data-service-interface.ts
```typescript
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
⋮----
import {Observable} from 'rxjs';
import {
  DataCreateCollectionRequest,
  PullQueryContextChecks,
} from './data-create-collection-request';
import {DataBulkInsertRequest} from './data-bulk-insert-request';
import {DataFindRequest} from './data-find-request';
import {DataGetRequest} from './data-get-request';
import {DataInsertRequest} from './data-insert-request';
import {DataServiceConfig} from './data-service-config';
import {DataUpsertRequest} from './data-upsert-request';
import {Model} from './model';
import {RxError, RxTypeError} from 'rxdb';
⋮----
/**
 * Event fired when collection data changes.
 */
export interface CollectionChangedEvent {
  /**
   * Change event time.
   */
  timestamp: number;

  /**
   * Collection name.
   */
  collection: string;

  /**
   * The Action triggering the event.
   */
  action?: string;

  /**
   * The total docs of the changed collection
   */
  count?: number;
}
⋮----
/**
   * Change event time.
   */
⋮----
/**
   * Collection name.
   */
⋮----
/**
   * The Action triggering the event.
   */
⋮----
/**
   * The total docs of the changed collection
   */
⋮----
/**
 * Event fired when a replication state throws an error.
 */
export interface SyncErrorEvent {
  /**
   * Collection name.
   */
  collection: string;

  /**
   * Number of attempts to resync the collection.
   * It's set to 0 when the collection is synced successfully.
   * It's set to -1 when the collection keeps raising exceptions after the max number of sync retries.
   */
  retrySyncAttempts: number;

  /**
   * The replication state error message
   */
  error?: RxError | RxTypeError;
}
⋮----
/**
   * Collection name.
   */
⋮----
/**
   * Number of attempts to resync the collection.
   * It's set to 0 when the collection is synced successfully.
   * It's set to -1 when the collection keeps raising exceptions after the max number of sync retries.
   */
⋮----
/**
   * The replication state error message
   */
⋮----
/**
 * The result of a bulk insert operation.
 */
export interface BulkInsertResult<T extends Model = Model> {
  /**
   * List of successfully inserted documents
   */
  success: T[];
  /**
   * List of errors
   */
  error: any[];
}
⋮----
/**
   * List of successfully inserted documents
   */
⋮----
/**
   * List of errors
   */
⋮----
/**
 * Service that allows to interact with the database.
 */
export interface IDataService {
  /**
   * True when the Syncing process is currently operating
   * (A replication cycle is undergoing)
   */
  readonly isSyncing: Observable<boolean>;

  readonly config: DataServiceConfig;

  readonly collectionChanged: Observable<CollectionChangedEvent>;

  /**
   * Get an object from the database.
   * Throws and error if the collection does not exist.
   * @param params The get request parameters.
   */
  get<T extends Model, R extends T>(params: DataGetRequest): Observable<R | null>;

  /**
   * Insert a new object into the database.
   * Throws and error if the collection does not exist.
   * @param params The insert request parameters.
   */
  insert<T extends Model, R extends T>(params: DataInsertRequest<T>): Observable<R | null>;

  /**
   * Insert multiple objects into the database.
   * Throws and error if the collection does not exist.
   * @param params The bulk insert request parameters.
   */
  bulkInsert<T extends Model = Model, R extends T = T>(
    params: DataBulkInsertRequest<T>,
  ): Observable<BulkInsertResult<R>>;

  /**
   * Update multiple objects in the database.
   * Throws and error if the collection does not exist.
   * @param params The bulk update request parameters.
   * @param update The updated fields set.
   */
  bulkUpdate<T extends Model = Model, R extends T = T>(
    params: DataFindRequest<T>,
    update: Partial<T>,
  ): Observable<R[]>;

  update<T extends Model = Model, R extends T = T>(
    collectionName: string,
    doc: R,
    updateData: Partial<R>,
  ): Observable<R | null>;

  /**
   * Insert a new object if it does not exist within the collection, otherwise it will overwrite it.
   * Throws and error if the collection does not exist.
   * @param params The upinsert request parameters.
   */
  upsert<T extends Model = Model, R extends T = T>(
    params: DataUpsertRequest<T>,
  ): Observable<R | null>;

  /**
   * Get multiple documents selected by a mango-style query.
   * Throws and error if the collection does not exist.
   * @param params The find request parameters.
   */
  find<T extends Model = Model, R extends T = T>(params: DataFindRequest<T>): Observable<R[]>;

  /**
   * Create a collection in the local database from a JSON schema
   * and sets up the GraphQL sync.
   * @param params The create collection request parameters.
   */
  createCollection(
    params: DataCreateCollectionRequest,
    pullQueryContextChecks?: PullQueryContextChecks,
  ): Observable<boolean>;

  /**
   * Destroy an existing collection in the local database.
   * Throws and error if the collection does not exist.
   * @param collectionName The name of the collection to destroy.
   */
  destroyCollection(collectionName: string): Observable<boolean>;
}
⋮----
/**
   * True when the Syncing process is currently operating
   * (A replication cycle is undergoing)
   */
⋮----
/**
   * Get an object from the database.
   * Throws and error if the collection does not exist.
   * @param params The get request parameters.
   */
get<T extends Model, R extends T>(params: DataGetRequest): Observable<R | null>;
⋮----
/**
   * Insert a new object into the database.
   * Throws and error if the collection does not exist.
   * @param params The insert request parameters.
   */
insert<T extends Model, R extends T>(params: DataInsertRequest<T>): Observable<R | null>;
⋮----
/**
   * Insert multiple objects into the database.
   * Throws and error if the collection does not exist.
   * @param params The bulk insert request parameters.
   */
bulkInsert<T extends Model = Model, R extends T = T>(
    params: DataBulkInsertRequest<T>,
  ): Observable<BulkInsertResult<R>>;
⋮----
/**
   * Update multiple objects in the database.
   * Throws and error if the collection does not exist.
   * @param params The bulk update request parameters.
   * @param update The updated fields set.
   */
bulkUpdate<T extends Model = Model, R extends T = T>(
    params: DataFindRequest<T>,
    update: Partial<T>,
  ): Observable<R[]>;
⋮----
update<T extends Model = Model, R extends T = T>(
    collectionName: string,
    doc: R,
    updateData: Partial<R>,
  ): Observable<R | null>;
⋮----
/**
   * Insert a new object if it does not exist within the collection, otherwise it will overwrite it.
   * Throws and error if the collection does not exist.
   * @param params The upinsert request parameters.
   */
upsert<T extends Model = Model, R extends T = T>(
    params: DataUpsertRequest<T>,
  ): Observable<R | null>;
⋮----
/**
   * Get multiple documents selected by a mango-style query.
   * Throws and error if the collection does not exist.
   * @param params The find request parameters.
   */
find<T extends Model = Model, R extends T = T>(params: DataFindRequest<T>): Observable<R[]>;
⋮----
/**
   * Create a collection in the local database from a JSON schema
   * and sets up the GraphQL sync.
   * @param params The create collection request parameters.
   */
createCollection(
    params: DataCreateCollectionRequest,
    pullQueryContextChecks?: PullQueryContextChecks,
  ): Observable<boolean>;
⋮----
/**
   * Destroy an existing collection in the local database.
   * Throws and error if the collection does not exist.
   * @param collectionName The name of the collection to destroy.
   */
destroyCollection(collectionName: string): Observable<boolean>;
```

## File: data/src/data-service-utils.ts
```typescript
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
⋮----
import {DataServiceConfig} from './data-service-config';
⋮----
/**
 * Default data service sync options.
 */
⋮----
/**
 * Fills the data service configuration with default values if missing.
 * @param config Data service configuration.
 */
export function fillConfigDefaultValues(config: DataServiceConfig): DataServiceConfig
```

## File: data/src/data-service.spec.ts
```typescript
import {EventEmitter} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {Server, WebSocket} from 'mock-socket';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';
import {RxJsonSchema} from 'rxdb';
import {firstValueFrom, of as obsOf} from 'rxjs';
import {take} from 'rxjs/operators';
⋮----
import {DATA_SERVICE_CONFIG, DataService, DataServiceConfig, Model} from './public_api';
⋮----
interface DummyModel extends Model {
  name: string;
}
```

## File: data/src/data-service.ts
```typescript
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
⋮----
import {EventEmitter, Inject, Injectable, isDevMode, Optional} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService, NetworkStatusService} from '@dino/core/auth';
import {ConfigService} from '@dino/core/config';
import {
  addRxPlugin,
  createRxDatabase,
  RxCollection,
  RxDatabase,
  RxDocument,
  RxDocumentData,
  RxError,
  RxGraphQLPullResponseModifier,
  RxTypeError,
} from 'rxdb';
import {RxDBMigrationSchemaPlugin} from 'rxdb/plugins/migration-schema';
import {replicateGraphQL} from 'rxdb/plugins/replication-graphql';
⋮----
import {RxDBQueryBuilderPlugin} from 'rxdb/plugins/query-builder';
import {RxDBUpdatePlugin} from 'rxdb/plugins/update';
import {RxDBJsonDumpPlugin} from 'rxdb/plugins/json-dump';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  from,
  interval,
  Observable,
  of as obsOf,
  Subscription,
  throwError,
} from 'rxjs';
import {
  catchError,
  debounce,
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  map,
  mapTo,
  retryWhen,
  shareReplay,
  skipWhile,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
  throttleTime,
  withLatestFrom,
} from 'rxjs/operators';
import {v4 as uuidv4} from 'uuid';
⋮----
import {ActiveSync} from './active-sync-interface';
import {DataBulkInsertRequest} from './data-bulk-insert-request';
import {PermissionContextService} from './data-context-service';
import {
  DataCreateCollectionRequest,
  PullQueryContextChecks,
} from './data-create-collection-request';
import {DataFindRequest} from './data-find-request';
import {DataGetRequest} from './data-get-request';
import {DataInsertRequest} from './data-insert-request';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from './data-service-config';
import {
  BulkInsertResult,
  CollectionChangedEvent,
  IDataService,
  SyncErrorEvent,
} from './data-service-interface';
import {DEFAULT_SYNC_OPTIONS, fillConfigDefaultValues} from './data-service-utils';
import {DataUpsertRequest} from './data-upsert-request';
import {InsertModel} from './insert-model';
import {Model} from './model';
import {PullQueryExtraParams} from './pull-query-extra-params';
import {PushQueryExtraParams} from './push-query-extra-params';
import {
  generateSyncPullChecks,
  pullQueryBuilder,
  pullResponseModifier,
  pushResponseModifier,
  pushQueryBuilder,
  subscriptionQueryBuilder,
} from './sync-utils';
import {Client} from 'graphql-ws';
import {newClient, newClientSubscription} from './graphql-ws-client';
⋮----
/**
 * Parameters needed to set up the collection sync.
 */
export interface CollectionSyncParams {
  /**
   * The collection's pull query extra parameters.
   */
  pullQueryExtraParams?: PullQueryExtraParams;

  /**
   * The collection's push query extra parameters.
   */
  pushQueryExtraParams?: PushQueryExtraParams;
}
⋮----
/**
   * The collection's pull query extra parameters.
   */
⋮----
/**
   * The collection's push query extra parameters.
   */
⋮----
/**
 * A collection registered in the data service.
 */
interface RegisteredCollection extends CollectionSyncParams {
  /**
   * The registered collection.
   */
  collection: RxCollection;

  /**
   * When true, the first replication cycle for the collection is complete.
   * Should be initialized as false.
   */
  firstSyncCompleted: BehaviorSubject<boolean>;
}
⋮----
/**
   * The registered collection.
   */
⋮----
/**
   * When true, the first replication cycle for the collection is complete.
   * Should be initialized as false.
   */
⋮----
/**
 * Service that allows to interact with the local database.
 */
⋮----
export class DataService implements IDataService
⋮----
/**
   * True when the Syncing process is currently operating
   * (A replication cycle is undergoing)
   */
⋮----
/**
   * When the Syncing process encounteres a problem even after
   * all the resyncAttempts, the name of the collection causing the sync error
   * is added here.
   */
⋮----
/**
   * When true, the first replication cycle for all collections is complete.
   * Resets to false on logout.
   */
⋮----
/**
   * When emitted as 'started', collection initialization has started and is undergoing.
   * When emitted as 'completed', all collections have been initialized by the Sync manager.
   */
⋮----
/**
   * Emits when a single replication cycle has been completed
   */
⋮----
/**
   * Emitted on a succesful or failed Db Import
   */
⋮----
/**
   * Emitted on a succesful or failed Db Export
   */
⋮----
/**
   * Emits when a replication state raises an exception, usually because of
   * a constraint violation or a inconsistent db state.
   * The event triggers a resync attempt for the collection.
   */
⋮----
/**
   * Emits when a collection could not be synced even after the retry attemps.
   */
⋮----
/**
   * The current Websocket client
   */
⋮----
/**
   * The auth token currently stored, added to the request headers.
   */
⋮----
/**
   * The currently synchronized Collections
   */
⋮----
/**
   * The Data service configuration settings stream.
   */
⋮----
/**
   * The Data config currently stored in the local storage, if present.
   */
⋮----
/**
   * Emits when a websocket throws an error in its connection callback,
   * stating that the JWT token is expired, and asks the authService for its
   * refreshing.
   */
⋮----
/**
   * Emits when a websocket throws an error in its connection callback
   * or when there is an arror during syncing data
   * and asks the authService to log out.
   */
⋮----
constructor(
    private _authService: AuthService,
    private _contextService: PermissionContextService,
    private _nss: NetworkStatusService,
    private _router: Router,
    @Inject(DATA_SERVICE_CONFIG) config: DataServiceConfig,
    @Optional() private _configService: ConfigService | null,
)
⋮----
/**
   * Add an RxDb plugin
   * @param plugin The plugin to add
   */
plugin(plugin: any): void
⋮----
/**
   * Get an object from the database.
   * Throws and error if the collection does not exist.
   * @param params The get request parameters.
   */
get<T extends Model = Model, R extends T = RxDocument<T>>(
    params: DataGetRequest,
): Observable<R | null>
⋮----
/**
   * Insert a new object into the database.
   * Throws and error if the collection does not exist.
   * @param params The insert request parameters.
   */
insert<T extends Model = Model, R extends T = RxDocument<T>>(
    params: DataInsertRequest<T>,
): Observable<R | null>
⋮----
/**
   * Insert multiple objects into the database.
   * Throws and error if the collection does not exist.
   * @param params The bulk insert request parameters.
   */
bulkInsert<T extends Model, R extends T = RxDocument<T>>(
    params: DataBulkInsertRequest<T>,
): Observable<BulkInsertResult<R>>
⋮----
/**
   * Update multiple objects in the database.
   * Throws and error if the collection does not exist.
   * @param params The bulk update request parameters.
   * @param update The updated fields set.
   */
bulkUpdate<T extends Model = Model, R extends T = RxDocument<T>>(
    params: DataFindRequest<T>,
    update: Partial<T>,
): Observable<R[]>
⋮----
update<T extends Model = Model, R extends T = RxDocument<T>>(
    collectionName: string,
    doc: R,
    updateData: Partial<R>,
): Observable<R | null>
⋮----
/**
   * Insert a new object if it does not exist within the collection, otherwise it will overwrite it.
   * Throws and error if the collection does not exist.
   * @param params The upinsert request parameters.
   */
upsert<T extends Model = Model, R extends T = RxDocument<T>>(
    params: DataUpsertRequest<T>,
): Observable<R | null>
⋮----
/**
   * Get multiple documents selected by a mango-style query.
   * Throws and error if the collection does not exist.
   * @param params The find request parameters.
   */
find<T extends Model = Model, R extends T = RxDocument<T>>(
    params: DataFindRequest<T>,
): Observable<R[]>
⋮----
/**
   * Create a collection in the local database from a JSON schema
   * and sets up the GraphQL sync.
   * @param params The create collection request parameters.
   */
createCollection(
    params: DataCreateCollectionRequest,
    pullQueryContextChecks?: PullQueryContextChecks,
): Observable<boolean>
⋮----
/**
   * Destroy an existing collection in the local database.
   * Throws and error if the collection does not exist.
   * @param collectionName The name of the collection to destroy.
   */
destroyCollection(collectionName: string): Observable<boolean>
⋮----
/**
   * Destroys all collections in the current local db.
   */
destroyAllCollections(): Observable<string[]>
⋮----
/**
   * Exports the Db instance content to a json file
   */
exportDatabase(): Observable<Blob>
⋮----
/**
   * Imports a DB dump to the local indexed db
   * @param dumpfile The blob of the db dump file to import
   */
importDatabase(dumpfile: Blob): void
⋮----
/**
   * Forces the start of a graphql replication run cycle for each state of
   * each active sync.
   * If a collection name is provided, the replication cycle runs for
   * that collection only.
   * When the Sync runs for all collections, the auth token gets refreshed before the replication cycle.
   * @param collectionName? The name of the collection to be synced
   * @param retrySyncAttempt? Number of the retry attempt, if the previos sync failed
   */
runSync(collectionName?: string, retrySyncAttempt?: number)
⋮----
/**
   * Adds or removes a collection from the problemSyncing collections list.
   * @param collection The collection name to be added or removed
   * @param operation Add or remove
   */
private _toggleActiveSyncProblem(collection: string, operation: 'add' | 'remove'): void
⋮----
/**
   * Prepare an object to be inserted into the database from a partial object.
   * @param object The partial object.
   */
private _prepareInsertObject<T extends Model>(object: InsertModel<T>): T
⋮----
/**
   * Push a collection to the registered colletions stream.
   */
private _addRegisteredCollection(
    collection: RxCollection,
    params: DataCreateCollectionRequest,
): void
⋮----
// TODO(trik): Consider throwing an exception when trying to register a collection twice.
⋮----
/**
   * Remove a collection from the registered collections stream.
   */
private _removeRegisteredCollection(collection: RxCollection): void
⋮----
// TODO(trik): Consider throwing an exception when trying to remove an unregistered
// collection.
⋮----
/**
   * Initialize the GraphQL sync for all the registered collections.
   * As soon as the user logs in, the sync will start.
   * If a log out event occurs, all the active syncs will be stopped.
   * When a new collection is registered, the sync will automatically start depending on the
   * current authentication status.
   */
protected _initSync(): void
⋮----
// If the user is authenticated with a new token, a webSocket client is opened.
// All collections graphql subscriptions will be sent through this client.
⋮----
/**
   * Set up a collection sync.
   * @param collection The collection to sync.
   * @param parent The sync parameters.
   * @param token The current JWT authorization token.
   */
protected _setupCollectionSync(
    collection: RxCollection,
    params: CollectionSyncParams,
    token: string,
): void
⋮----
/*
    ERROR_MESSAGES GraphQL replication
    https://github.com/pubkey/rxdb/blob/master/src/plugins/dev-mode/error-messages.ts
    */
⋮----
/**
   * Stop an active collection sync.
   * @param collection The collection for which the sync must be stopped.
   */
private _stopCollectionSync(collectionName: string): void
⋮----
/**
   * Emits the Collection Changed event, triggering the refresh of the
   * data.
   * @param msg The event message
   * @param collection The changed RxCollection
   * @param count? The changed RxCollection docs count
   */
private _collectionChangedEmit(msg: string, collection: RxCollection, count?: number): void
⋮----
/**
   * Subscribes to the Config Service and listens for changes
   * in the Data configuration.
   */
private _setDynamicConfigSub(): void
⋮----
/**
   * Dynamically sets the configuration params for the Data Service.
   * @param config The configuration data
   */
private _setDataConfig(config: DataServiceConfig): void
⋮----
/**
   * Resets the Data config, removing config from local storage.
   */
private _resetDataConfig(): void
⋮----
/**
   * Stores an Data service configuration object into the
   * local storage.
   * @param config The configuration data
   */
private _storeDataConfig(config: DataServiceConfig): void
⋮----
/**
   * Retrieves the Data service configuration currently stored in the
   * local storage.
   */
private _getDataConfig(): DataServiceConfig | null
⋮----
/**
   * Removes the Data service configuration currently stored in the
   * local storage.
   */
private _removeDataConfig(): void
⋮----
const isRxDocument = <T extends Model>(doc: T): doc is RxDocument<T> =>
```

## File: data/src/data-upsert-request.ts
```typescript
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
⋮----
import {DataRequest} from './data-request';
⋮----
import {Model} from './model';
import {UpsertModel} from './upsert-model';
⋮----
/**
 * Data upsert item request parameters.
 */
export interface DataUpsertRequest<T extends Model> extends DataRequest {
  /**
   * The object to upsert.
   */
  object: UpsertModel<T>;
}
⋮----
/**
   * The object to upsert.
   */
```

## File: data/src/data-utility-functions.ts
```typescript
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
⋮----
import {RxDocument} from 'rxdb';
import {clone} from './clone';
import {Model} from './model';
import {from, of as obsOf} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {deepCopy} from '@ajf/core/utils';
⋮----
/**
 * Populates all references to external collections in RxDocuments
 * @param docs RxDocument or RxDocument array
 * @returns The document or documents with populated refs
 */
export function populateDocRefs<T extends Model = Model>(docs: RxDocument<T>[]): RxDocument<T>[];
export function populateDocRefs<T extends Model = Model>(docs: RxDocument<T>): RxDocument<T>;
export function populateDocRefs<T extends Model = Model>(
  docs: RxDocument<T>[] | RxDocument<T>,
): RxDocument<T>[] | RxDocument<T>
⋮----
/**
 * Converts an array of RxDocuments into an array of T objects
 * @param docs RxDocument[]
 * @returns The converted objects
 */
export function rxDocsToJson<T extends Model = Model>(docs: RxDocument<T>[]): T[]
⋮----
/**
 * Adds a nested object property and an optional value to an object
 * @param baseObj The object to modify
 * @param props The property names tree. The last one is the name of nested property to be added
 * @param value? The optional value to set for the added property.
 * @param options? The optional regex flags.
 * @returns The modified object
 */
export function addNestedProps(
  baseObj: {[key: string]: any},
  props: string[],
  value?: any,
  options?: any,
):
```

## File: data/src/gql.spec.ts
```typescript
import {TypedDocumentNode} from 'apollo-angular';
⋮----
import {DataFindRequest} from './data-find-request';
import {Model} from './model';
import {findQueryGql, getQueryGql, insertQueryGql, updateQueryGql} from './gql';
⋮----
const getGqlString = (query: TypedDocumentNode<any, any>): string =>
⋮----
interface Foo extends Model {
  bar: string;
  baz: string;
}
```

## File: data/src/gql.ts
```typescript
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
⋮----
import {TypedDocumentNode} from '@apollo/client/core';
import {gql} from 'apollo-angular';
⋮----
import {DataFindRequest} from './data-find-request';
import {InsertModel} from './insert-model';
import {Model} from './model';
import {MangoQuerySelector} from 'rxdb';
⋮----
interface GqlQueryGen {
  queryName: string;
  query: string;
}
⋮----
interface GqlMutationGen {
  mutationName: string;
  mutation: string;
}
⋮----
export interface GqlQuery<T, V = {}> {
  query: TypedDocumentNode<T, V>;
  queryName: string;
}
⋮----
export interface GqlMutation<T, V = {}> {
  mutation: TypedDocumentNode<T, V>;
  mutationName: string;
}
⋮----
export interface OnlineUpdateResult<T extends Model = Model> {
  [prop: string]: {affected_rows: number; returning: T[]};
}
⋮----
export interface OnlineGetResult<T extends Model = Model> {
  [prop: string]: T[];
}
⋮----
const pascalCase = (str: string): string
⋮----
const getQuery = <R extends Model = Model>(
  name: string,
  fields: string[],
  id: R['id'],
): GqlQueryGen =>
⋮----
const dataFindRequestToFnParams = <T extends Model = Model>(
  request: DataFindRequest<T>,
  other: string[] = [],
): string =>
⋮----
const findQuery = <T extends Model = Model>(
  name: string,
  fields: string[],
  request: DataFindRequest<T>,
): GqlQueryGen =>
⋮----
const mutationReturn = (fields: string[]): string
⋮----
const insertQuery = (name: string, fields: string[]): GqlMutationGen =>
⋮----
const updateQuery = <T extends Model = Model>(
  name: string,
  fields: string[],
  request: DataFindRequest<T>,
): GqlMutationGen =>
⋮----
export const getQueryGql = <T extends Model = Model, V = {}>(
  name: string,
  fields: string[],
  id: T['id'],
): GqlQuery<OnlineGetResult<T>, V> =>
⋮----
export const findQueryGql = <T extends Model = Model, V = {}>(
  name: string,
  fields: string[],
  request: DataFindRequest<T>,
): GqlQuery<OnlineGetResult<T>, V> =>
⋮----
export const insertQueryGql = <T extends Model = Model, V = {}>(
  name: string,
  fields: string[],
): GqlMutation<OnlineUpdateResult<T>, V &
⋮----
export const updateQueryGql = <T extends Model = Model, V = {}>(
  name: string,
  fields: string[],
  request: DataFindRequest<T>,
): GqlMutation<OnlineUpdateResult<T>, V &
```

## File: data/src/graphql-ws-client.ts
```typescript
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
⋮----
import {Client, createClient, SubscribePayload} from 'graphql-ws';
import {Observable, of as obsOf} from 'rxjs';
import {EventEmitter, isDevMode} from '@angular/core';
⋮----
/**
 * Creates a new Graphql-ws client
 * @param wsUrl The websocket url
 * @param authToken The current authentication jwt token
 * @param refreshEvt The event to be emitted when a token refresh is needed
 * @param socketJwtExpiredCode The error code the websocket server returns when the Jwt token expires
 * @returns The Grapqhl-ws client
 */
export function newClient(
  wsUrl: string | null,
  authToken: string | null,
  refreshEvt: EventEmitter<void>,
  socketJwtExpiredCode?: number,
): Client | null
⋮----
shouldRetry(errOrCloseEvent)
⋮----
/**
 * Adds a new graphql subscription to be sent to the backend
 * @param client The graphql-ws client
 * @param operation The query/subscription to be sent
 * @returns An observable of the subscription
 */
export function newClientSubscription(
  client: Client | null,
  operation: SubscribePayload,
): Observable<any>
```

## File: data/src/import-utils.ts
```typescript
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
⋮----
import {format} from 'date-fns';
import {JsonSchemaTypes} from 'rxdb';
⋮----
/**
 * Return the input value casted to the correct type (string, list, boolean or Date)
 * @param rowValue the initial value found in xls/csv file
 * @param rowColumn the xls/csv column name
 * @param type required type/types for this value
 * @returns
 */
export function getValueFromRow(
  rowValue: any,
  rowColumn: string,
  requiredType?: JsonSchemaTypes | JsonSchemaTypes[] | readonly JsonSchemaTypes[] | undefined,
): any
⋮----
// Try if the object is a date
⋮----
// Try if the number is a valid date
⋮----
/**
 * Convert and Format date as 'YYYY-MM-DD'
 * @param serial
 * @returns
 */
export function excelDateToJSDate(serial: number): string | number
⋮----
// Convert to milliseconds
⋮----
// Format as 'YYYY-MM-DD'
```

## File: data/src/insert-model.ts
```typescript
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
⋮----
import {Model} from './model';
⋮----
/**
 * The base model interface for item creation.
 */
export type InsertModel<T extends Model> = Omit<T, 'id' | 'updated_at' | '_deleted'>;
```

## File: data/src/metric.ts
```typescript
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
⋮----
import {Model} from './model';
⋮----
/**
 * The base Metric interface, extended by all other
 * optional metrics (Locations, Projects etc.)
 */
export interface Metric extends Model {
  /**
   * The metric name.
   */
  name: string;

  /**
   * The optional ID and Name of this metric Parent.
   * (ex. Africa - Tanzania, Project - Sub-project etc.)
   */
  parent_id: string | null;
  parent_name: string | null;

  /**
   * Generic info json field
   */
  metric_data?: {[key: string]: any} | null;
}
⋮----
/**
   * The metric name.
   */
⋮----
/**
   * The optional ID and Name of this metric Parent.
   * (ex. Africa - Tanzania, Project - Sub-project etc.)
   */
⋮----
/**
   * Generic info json field
   */
```

## File: data/src/metrics.service.ts
```typescript
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
⋮----
import {Injectable} from '@angular/core';
import {RxJsonSchema} from 'rxdb';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
⋮----
/**
 * Represents an Active optional metric.
 */
export interface ActiveMetric {
  /**
   * The metric label.
   */
  label: string;

  /**
   * The metric icon identifier.
   */
  icon: string;

  /**
   * The metric name identifier
   */
  metricName: string;

  /**
   * The metric json schema
   */
  metricSchema?: RxJsonSchema<any>;
}
⋮----
/**
   * The metric label.
   */
⋮----
/**
   * The metric icon identifier.
   */
⋮----
/**
   * The metric name identifier
   */
⋮----
/**
   * The metric json schema
   */
⋮----
/**
 * Metrick keys common to all metrics that should not be used to
 * automatically generate headers in forms and reports lists.
 */
⋮----
/**
 * Service that keeps track of the active optional Metrics.
 */
⋮----
export class MetricsService
⋮----
/**
   * The list of the currently active optional Metrics.
   */
⋮----
/**
   * True if one or more optional metrics are activated.
   */
⋮----
/**
   * Adds an optional Metric to the list when it's activated.
   */
activateMetric(metric: ActiveMetric): void
⋮----
/**
   * Checks if a Metric module is Active
   * @param metricType  The Metric type
   * @returns True if the Metric module is active
   */
isActiveMetric(metricType: string): boolean
```

## File: data/src/model.ts
```typescript
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
⋮----
/**
 * The base model interface.
 */
export interface Model {
  /**
   * UUID v4 identifier.
   */
  id: string;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * Update timestamp.
   */
  updated_at: string;

  /**
   * Soft delete flag
   */
  is_deleted?: boolean;

  /**
   * Pouchdb delete flag
   */
  _deleted?: boolean;
}
⋮----
/**
   * UUID v4 identifier.
   */
⋮----
/**
   * Creation timestamp.
   */
⋮----
/**
   * Update timestamp.
   */
⋮----
/**
   * Soft delete flag
   */
⋮----
/**
   * Pouchdb delete flag
   */
```

## File: data/src/online-data-model-manager.ts
```typescript
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
⋮----
import {BaseDataModelManager} from './base-data-model-manager';
import {PermissionContextService} from './data-context-service';
import {DataCreateCollectionRequest} from './data-create-collection-request';
import {IDataModelManager} from './data-model-manager-interface';
import {Permission} from './data-permission';
import {Model} from './model';
import {OnlineDataService} from './online-data-service';
⋮----
/**
 * This class will manage the data model, providing basic and generic Crud methods
 * to all services extending it.
 * All the operations will be performed on the remote database table named as _modelName,
 * provided in the OnlineDataModelManager constructor.
 */
export abstract class OnlineDataModelManager<T extends Model = Model>
extends BaseDataModelManager<T, T>
⋮----
/**
   * The data manager to get details in an expandable list
   */
⋮----
constructor(
    createParams: DataCreateCollectionRequest,
    dataService: OnlineDataService,
    contextService: PermissionContextService,
    permissions: Permission[] = [],
)
```

## File: data/src/online-data-service.ts
```typescript
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
⋮----
import {HttpHeaders} from '@angular/common/http';
import {Inject, Injectable, isDevMode} from '@angular/core';
import {AuthService, buildAuthorizationHeader} from '@dino/core/auth';
import {Apollo} from 'apollo-angular';
import {Observable, ObservableInput, of as obsOf, throwError} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
⋮----
import {DataCreateCollectionRequest} from './data-create-collection-request';
import {DataBulkInsertRequest} from './data-bulk-insert-request';
import {DataFindRequest} from './data-find-request';
import {DataGetRequest} from './data-get-request';
import {DataInsertRequest} from './data-insert-request';
import {DataRequest} from './data-request';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from './data-service-config';
import {BulkInsertResult, CollectionChangedEvent, IDataService} from './data-service-interface';
import {fillConfigDefaultValues} from './data-service-utils';
import {DataUpsertRequest} from './data-upsert-request';
import {findQueryGql, getQueryGql, insertQueryGql, updateQueryGql} from './gql';
import {Model} from './model';
⋮----
/**
 * Service that allows to interact with the remote database.
 */
⋮----
export class OnlineDataService implements IDataService
⋮----
/**
   * True when the Syncing process is currently operating
   * (A replication cycle is undergoing)
   */
⋮----
constructor(
    @Inject(DATA_SERVICE_CONFIG) config: DataServiceConfig,
    private _apollo: Apollo,
    private _authService: AuthService,
)
⋮----
/**
   * Get an object from the database.
   * Throws and error if the collection does not exist.
   * @param params The get request parameters.
   */
get<T extends Model = Model>(params: DataGetRequest): Observable<T | null>
⋮----
/**
   * Insert a new object into the database.
   * Throws and error if the collection does not exist.
   * @param params The insert request parameters.
   */
insert<T extends Model = Model, R extends T = T>(
    params: DataInsertRequest<T>,
): Observable<R | null>
⋮----
/**
   * Insert multiple objects into the database.
   * Throws and error if the collection does not exist.
   * @param params The bulk insert request parameters.
   */
bulkInsert<T extends Model = Model, R extends T = T>(
    params: DataBulkInsertRequest<T>,
): Observable<BulkInsertResult<R>>
⋮----
/**
   * Update multiple objects in the database.
   * Throws and error if the collection does not exist.
   * @param params The bulk update request parameters.
   * @param update The updated fields set.
   */
bulkUpdate<T extends Model = Model, R extends T = T>(
    params: DataFindRequest<T>,
    update: Partial<T>,
): Observable<R[]>
⋮----
update<T extends Model = Model, R extends T = T>(
    collectionName: string,
    doc: T,
    updateData: Partial<T>,
): Observable<R | null>
⋮----
/**
   * Insert a new object if it does not exist within the collection, otherwise it will overwrite it.
   * Throws and error if the collection does not exist.
   * @param params The upinsert request parameters.
   */
upsert<T extends Model = Model, R extends T = T>(
    params: DataUpsertRequest<T>,
): Observable<R | null>
⋮----
/**
   * Create a RxQuery query object for multiple documents selection.
   * Throws and error if the collection does not exist.
   * @param params The find request parameters.
   */
find<T extends Model = Model, R extends T = T>(params: DataFindRequest<T>): Observable<R[]>
⋮----
/**
   * Create a collection in the local database from a JSON schema
   * and sets up the GraphQL sync.
   * @param params The create collection request parameters.
   */
createCollection(params: DataCreateCollectionRequest): Observable<boolean>
⋮----
/**
   * Destroy an existing collection in the local database.
   * Throws and error if the collection does not exist.
   * @param _collectionName The name of the collection to destroy.
   */
destroyCollection(_collectionName: string): Observable<boolean>
⋮----
private _getCollection(params: DataRequest): Observable<
⋮----
private _getQueryContext():
⋮----
private _queryErrorHandler<E, R>(
    errValue: R,
): (err: any, caught: Observable<E>) => ObservableInput<R>
```

## File: data/src/public_api.ts
```typescript
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
```

## File: data/src/pull-query-extra-params.ts
```typescript
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
⋮----
/**
 * Extra parameters used to build the GraphQL pull sync query.
 */
export interface PullQueryExtraParams {
  /**
   * Where condition to be added to the pull query.
   */
  where?: any;

  /**
   * Array of collection fields to be retrieved by the pull query.
   */
  fields?: string[];
}
⋮----
/**
   * Where condition to be added to the pull query.
   */
⋮----
/**
   * Array of collection fields to be retrieved by the pull query.
   */
```

## File: data/src/push-query-extra-params.ts
```typescript
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
⋮----
import {RxDocumentData, RxReplicationWriteToMasterRow} from 'rxdb';
import {Model} from './model';
⋮----
/**
 * Extra parameters used to build the GraphQL push sync query.
 */
export interface PushQueryExtraParams {
  /**
   * Where condition to be added to the push query.
   */
  where?: any;

  /**
   * Function used to modify the object before pushing it to the remote database.
   */
  docModifier?: <T extends Model = Model>(
    doc: T,
  ) => RxReplicationWriteToMasterRow<RxDocumentData<T>>;
}
⋮----
/**
   * Where condition to be added to the push query.
   */
⋮----
/**
   * Function used to modify the object before pushing it to the remote database.
   */
```

## File: data/src/sync-utils.spec.ts
```typescript
import {RxCollection, RxDocumentData, RxJsonSchema, RxReplicationWriteToMasterRow} from 'rxdb';
⋮----
import {DataServiceSyncOptions, Model} from './public_api';
import {
  pullQueryBuilder,
  pushQueryBuilder,
  subscriptionQueryBuilder,
  syncOrderedCollections,
} from './sync-utils';
⋮----
type pullQueryMock = (doc: RxDocumentData<any> | null) => {query: string; variables: any};
type pushQueryMock = (docs: RxReplicationWriteToMasterRow<RxDocumentData<any>>[]) => {
  query: string;
  variables: any;
};
⋮----
async function getQueryString(query:
```

## File: data/src/sync-utils.ts
```typescript
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
⋮----
import {isDevMode} from '@angular/core';
import {
  lastOfArray,
  RxCollection,
  RxDocumentData,
  RxGraphQLReplicationPullQueryBuilder,
  RxGraphQLReplicationPushQueryBuilder,
  RxReplicationWriteToMasterRow,
} from 'rxdb';
import {PullQueryContextChecks} from './data-create-collection-request';
import {PermissionContext} from './data-permission-interface';
⋮----
import {DataServiceSyncOptions} from './data-service-config';
import {Model} from './model';
import {PullQueryExtraParams} from './pull-query-extra-params';
import {PushQueryExtraParams} from './push-query-extra-params';
⋮----
/**
 * Builds a GraphQL query used to pull documents belonging to a given collection in pull sync.
 * @param collection The collection to be synced.
 * @param options The data service sync options.
 * @param params Option extra parameters to be included in the query.
 */
export function pullQueryBuilder<T extends Model = Model>(
  collection: RxCollection,
  options: DataServiceSyncOptions,
  extraParams?: PullQueryExtraParams,
): RxGraphQLReplicationPullQueryBuilder<RxDocumentData<T>>
⋮----
/**
     * If there's no checkpoint document pulled, we start from the beginning.
     * Otherwise, pull happens for all docs updated during the month before the checkpoint.
     */
⋮----
/**
 * Modifies the GraphQl server response before it's processed by rxDb and synced into the client,
 * by adding a checkpoint from the last updated pulled document.
 * @param plainResponse The graphql server response
 * @returns An object with all documents and a checkpoint
 */
export function pullResponseModifier<T extends Model = Model>(
  plainResponse: RxDocumentData<T>[],
):
⋮----
/**
 * Builds a GraphQL query used to push documents belonging to a given collection in pull sync.
 * @param collection The collection to be synced.
 * @param extraParams Option extra parameters to be included in the query.
 */
export function pushQueryBuilder<T extends Model = Model>(
  collection: RxCollection,
  extraParams?: PushQueryExtraParams,
): RxGraphQLReplicationPushQueryBuilder
⋮----
// let documents: RxReplicationWriteToMasterRow<T>[] = docs;
// documents.forEach(dc => delete dc['_meta']);
⋮----
/**
 * Modifies the GraphQl server response after push sync has sent data.
 * @param plainResponse The graphql server response
 * @returns An array with the IDs of all pushed documents
 */
export function pushResponseModifier<T extends Model = Model>(plainResponse: RxDocumentData<T>[])
⋮----
/**
 * Builds a change subscription query for a given collection.
 * @param collection The collection.
 */
export function subscriptionQueryBuilder(collection: RxCollection): string
⋮----
/**
 * Returns the collections list ordered for sync purposes. First you will find collections with no
 * external references, then all others collections with external references already present in the
 * sorted list.
 * @param collections The list of collections to sort.
 */
export function syncOrderedCollections(collections: RxCollection[]): RxCollection[]
⋮----
/**
 * Generates the 'where' attribute object of a PullQueryExtraParams object
 * @param context The current permission context
 * @param checks The attributes of the context on which to perform the checks
 */
export function generateSyncPullChecks(
  context: PermissionContext,
  checks: PullQueryContextChecks,
):
⋮----
/**
 * Generates 'and' conditions for notifications checks
 * @param userSchemas The context user schemas
 * @returns The conditions
 */
function generateSyncPullNotificationsChecks(userDataId: string | null):
⋮----
/**
 * Generates 'and' conditions for schemas checks
 * @param userSchemas The context user schemas
 * @returns The conditions
 */
function generateSyncPullSchemaChecks(
  userSchemas: Set<string> | null,
  checkKey?: string,
):
⋮----
/**
 * Generates 'and' conditions for metric checks
 * @param userMetrics The context user metrics
 * @returns The conditions
 */
function generateSyncPullMetricChecks(
  userMetrics: {[key: string]: string[]} | null,
  checkKey?: string,
):
⋮----
/**
 * Returns true if the all the collection depencencies newDeps are already satisfied.
 * @param newDeps Collection dependencies to be checked.
 * @param deps Current satisfied dependencies.
 */
function depsAreSatisfied(newDeps: string[], deps: string[]): boolean
⋮----
/**
 * Returns an array of collection names referenced by the given properties object.
 * @param properties
 */
function findDeps(properties:
⋮----
/**
 * Given an array of collections and an array of satisfied depencies returns an object containing
 * the input collections split in two arrays, one containing all the collections whose dependencies
 * are already satisfied, and the other containing all the collections that have unmet dependencies.
 * @param collections The input array of collections.
 * @param deps The dependencies already satisfied.
 */
function findSatisfiedDeps(
  collections: RxCollection[],
  deps: string[],
):
⋮----
/**
 * Returns an array containing the input collection field names.
 * @param collection The input collection.
 */
function getCollectionFields(collection: RxCollection): string[]
⋮----
/**
 * Returns an array containing the collection fields to be updated.
 * @param collection The input collection.
 */
function getCollectionUpdateFields(collection: RxCollection): string[]
⋮----
/**
 * Returns true if the parameter is a plain object.
 * @param variable The parameter to test.
 */
function isObject(variable: any): boolean
⋮----
/**
 * Returns a string with the first character of str capitalized, if that character is alphabetic.
 * @param str The input string.
 */
function ucfirst(str: string): string
```

## File: data/src/upsert-model.ts
```typescript
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
⋮----
import {InsertModel} from './insert-model';
import {Model} from './model';
⋮----
/**
 * The base model interface for item upsert.
 */
export type UpsertModel<T extends Model> = InsertModel<T> &
  Partial<Pick<T, 'id' | 'created_at' | 'updated_at' | '_deleted'>>;
```

## File: data/data.md
```markdown
The `@dino/core/data` module provides a generic service to perform CRUD operations and interact with [RxDb](https://rxdb.info) Collections and Documents.
The Data model manager represents the core class for all the Model Managers, and provides crud functionalities for the specific Model, within its collection.

The data service also takes care of the synchronization of the local RxDb collections to the remote database, via the [Hasura](https://hasura.io) backend.
```

## File: data/index.ts
```typescript
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
```

## File: data/ng-package.json
```json
{}
```

## File: error-handler/src/error-handler-message.service.ts
```typescript
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
⋮----
import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ErrorSeverityLevel} from './error-severity-level';
import {ErrorCapturedMessage} from './error-message';
⋮----
/**
 * Service that manages errors, providing custom methods to log and handle them
 * depending on the error type.
 */
⋮----
export class ErrorHandlerMessageService
⋮----
constructor()
⋮----
/**
   * Emits the event to send a message to the remote Error service
   * @param message The message to be sent
   * @param level? The optional severity level of the message (eg. fatal, error, warning etc.)
   */
captureErrorMessage(message: string, level?: ErrorSeverityLevel)
```

## File: error-handler/src/error-message.ts
```typescript
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
⋮----
import {ErrorSeverityLevel} from './error-severity-level';
⋮----
/**
 * Represents an error message to be sent to the remote error tracking service.
 */
export interface ErrorCapturedMessage {
  /**
   * The error message
   */
  message: string;
  /**
   * The optional severity level of the error
   */
  level?: ErrorSeverityLevel;
}
⋮----
/**
   * The error message
   */
⋮----
/**
   * The optional severity level of the error
   */
```

## File: error-handler/src/error-severity-level.ts
```typescript
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
⋮----
/**
 * Represents the arbitrary severity level of an error message to be sent to the remote error tracking service.
 * Matches the Sentry severity levels.
 */
export type ErrorSeverityLevel = 'error' | 'debug' | 'fatal' | 'warning' | 'log' | 'info';
```

## File: error-handler/src/public_api.ts
```typescript
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
```

## File: error-handler/error-handler.md
```markdown
The `@dino/core/error-handler` provides a custom Error Handler Message service, that can be used to send custom notifications to a remote error tracking service and can be injected in any angular Error Handler implementation to gather info.
```

## File: error-handler/index.ts
```typescript
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
```

## File: error-handler/ng-package.json
```json
{}
```

## File: exporter/src/export-interface.ts
```typescript
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
⋮----
import {AjfBaseField as AjfFieldCore, AjfNodeType} from '@ajf/core/forms';
import {FormSchema} from '@dino/core/forms';
import {NodeVisibility} from '@dino/core/list';
import {Observable} from 'rxjs';
⋮----
export interface AjfField extends AjfFieldCore {
  slideIndex?: number;
  slideName?: string;
  slideNodeType?: AjfNodeType;
}
⋮----
export interface SelOption {
  value: string;
  label: string;
}
⋮----
export interface Context {
  [name: string]: any;
}
⋮----
export interface Data extends Context {
  data: Context;
}
⋮----
export interface ExportData extends Context {
  dino: Context;
  externalRefs: Context;
}
⋮----
/**
 * Represents the Types of list objects
 */
export type ExportListType = 'forms' | 'reports' | 'metrics' | 'users' | 'groups';
⋮----
/**
 * The export options interface
 */
export interface ExportOptions {
  /**
   * The desired export format
   */
  exportFormat?: 'xlsx' | 'csv';
  /**
   * If true, all fields are automatically selected when the
   * dialog is opened.
   */
  selectAll?: boolean;
  /**
   * The type of the list that is being exported
   */
  listType?: ExportListType;
  /**
   * If true, the file download window/prompt appears
   */
  downloadFile?: boolean;
  /**
   * If true, the file will be exported with a single header
   */
  singleHeader?: boolean;
  /**
   * If true, commas (csv delimiter) will be stripped from field labels
   * before converting and exporting the file
   */
  removeCommas?: boolean;
}
⋮----
/**
   * The desired export format
   */
⋮----
/**
   * If true, all fields are automatically selected when the
   * dialog is opened.
   */
⋮----
/**
   * The type of the list that is being exported
   */
⋮----
/**
   * If true, the file download window/prompt appears
   */
⋮----
/**
   * If true, the file will be exported with a single header
   */
⋮----
/**
   * If true, commas (csv delimiter) will be stripped from field labels
   * before converting and exporting the file
   */
⋮----
/**
 * The export list data interface
 */
export interface ExportListData extends ExportOptions {
  /**
   * The Ajf Form Nodes Visibility observable.
   */
  nodesVisibility: Observable<NodeVisibility[]>;

  /**
   * The Form Schema
   */
  formSchema: FormSchema;
}
⋮----
/**
   * The Ajf Form Nodes Visibility observable.
   */
⋮----
/**
   * The Form Schema
   */
⋮----
export type ExportFormat = 'csv' | 'xlsx' | 'splitted-xlsx';
export type ExportFilters = 'filtered' | 'not-filtered' | 'displayed' | 'add-filters';
```

## File: exporter/src/export-model.interface.ts
```typescript
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
⋮----
import {AjfNode} from '@ajf/core/forms';
⋮----
/**
 * The Export Model interface
 */
export interface ExportModel {
  /**
   * Name of the schema
   */
  schemaName: string;
  /**
   * Labels of all slides
   */
  slideLabels: string[];
  /**
   * The slides matrix
   */
  slides: AjfNode[][];
}
⋮----
/**
   * Name of the schema
   */
⋮----
/**
   * Labels of all slides
   */
⋮----
/**
   * The slides matrix
   */
```

## File: exporter/src/exporter.spec.ts
```typescript

```

## File: exporter/src/exporter.ts
```typescript
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
⋮----
import {
  AjfChoicesOrigin,
  AjfContainerNode,
  AjfFieldType,
  AjfFormCreate,
  AjfNode,
  AjfNodeType,
  AjfSlide,
  AjfTableField,
  isContainerNode,
} from '@ajf/core/forms';
import {TranslocoService} from '@ajf/core/transloco';
import {deepCopy} from '@ajf/core/utils';
import {Directive, EventEmitter, OnDestroy, Optional, Output} from '@angular/core';
import {BehaviorSubject, forkJoin, isObservable, Observable, of as obsOf, Subscription} from 'rxjs';
import {
  delay,
  filter,
  map,
  shareReplay,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
⋮----
import {FormData, FormSchema} from '@dino/core/forms';
⋮----
import {AreaManager} from '@dino/core/areas';
import {CaseManager} from '@dino/core/cases';
import {LocationManager} from '@dino/core/locations';
import {OrganizationManager} from '@dino/core/organizations';
import {ProjectManager} from '@dino/core/projects';
import {ActionTrigger, DataModelManager} from '@dino/core/data';
import {
  AjfField,
  Context,
  Data,
  ExportData,
  ExportFormat,
  MAX_SHEETNAME_LENGTH,
  ExportListData,
} from './export-interface';
import {ExportModel} from './export-model.interface';
import {isRxDocument, RxDocument} from 'rxdb';
⋮----
/**
 * Exporter Class that can be instantiated to export documents
 */
⋮----
export class Exporter implements OnDestroy
⋮----
/**
   * Event emitted as an Action hook
   */
⋮----
/** The export data model of the schema */
⋮----
/**
   * The file created by the exporter
   */
⋮----
get exportedFile(): Observable<File | null>
/**
   * The Export Format
   */
⋮----
/**
   * The placeholder for the ',' in multiple choises translated values
   */
⋮----
/**
   * Additional properties to be added to the export, external to the form schema
   * fields or, for form metrics, external to the metrics properties.
   * These properties are exported with this name, without any prefix.
   */
⋮----
/**
   * The properties of the Dino base model to be excluded from export
   */
⋮----
/**
   * Metric managers
   */
⋮----
/** A dictionary with the name of the slide and the list of selected field name as value */
⋮----
/** If true, export use translated labels instead values */
⋮----
/** If true, export use data analysis format */
⋮----
/** A dictionary with all context values:
   * {field name: field value}
   * {choiceOriginName_choiceOriginValue: choiceLabel} */
⋮----
/**
   * The Exporting state of the export
   */
⋮----
get isExporting(): Observable<boolean>
⋮----
/**
   * Sets up all the Exporter parameters
   * @param setupData SetupData parameters (Schema, Nodesvisibility etc.)
   * @param fields The Fields/Columns that will be exported
   * @param docs The documents that will be exported (forms, metrics etc.)
   * @param format The export format (csv, xlsx, splitted-xlsx)
   * @param analysis If true, data-analysis format will be used
   * @param translation Set if export context real values or their translations/labels
   */
setup(
    setupData: ExportListData | null,
    fields: AjfField[] | 'all',
    docs: Data[] | RxDocument<FormData>[] | null,
    format: ExportFormat,
    analysis: boolean,
    translation: boolean,
): void
⋮----
setSetupData(eld: ExportListData | null)
⋮----
setFields(flds: AjfField[] | 'all')
⋮----
setExportFormat(format: ExportFormat)
⋮----
setDocsToExport(data: Data[] | null)
⋮----
constructor(
    private _ts: TranslocoService,
    @Optional() private _ar: AreaManager | null,
    @Optional() private _cs: CaseManager | null,
    @Optional() private _pj: ProjectManager | null,
    @Optional() private _lc: LocationManager | null,
    @Optional() private _og: OrganizationManager | null,
)
⋮----
/*if (populatedData.length) {
              this._buildFileEvt.emit();
            }*/
⋮----
// remove empty or malformed slides.
⋮----
slide.id = index; // prevent no sequencial id
⋮----
// remove unexportable ajf fields.
⋮----
// Expand rows for data analysis format
⋮----
.filter(f => f.slideName !== f.name) // remove slide fields
⋮----
/**
   * Starts the Export process
   */
export(): void
⋮----
ngOnDestroy(): void
⋮----
/**
   * Set if export context real values or their translations/labels
   * @param checked
   */
setTranslation(checked: boolean): void
⋮----
/**
   * Set if download data in data analysis format
   * @param checked
   */
setDataAnalysisFormat(checked: boolean): void
⋮----
/**
   * Return a row for each value of the multiple choice field
   * @param baseExportCtx the base export context object
   * @param fieldName the field name for the multiple choice field
   * @returns an array of Context with only one multiple choice value
   * [{attivita: 'PM'}, {attivita: 'Meeting'}, ...]
   */
private _expandMultipleChoiceRow(baseExportCtx: Context, fieldName: string): Context[]
⋮----
// Multiple choice: add a row for each value
⋮----
/**
   * Push into export list the formdata expanded in multiple rows, one for
   * each repeating slide or multiple values
   * @param slideNodesWithAllRepeatingInstance
   * @param ctx
   * @returns
   */
private _expandRowCtxForDataAnalysis(
    slideNodesWithAllRepeatingInstance: AjfField[],
    ctx: ExportData,
): Context[]
⋮----
.filter(f => f.slideName !== f.name) // remove slide fields
⋮----
// Multiple choice: add a row for each value
⋮----
// Repeating slide: add a row for each instance of the slide
⋮----
// Add the row for the slide instance
⋮----
private _buildExportModel(exportSchema: FormSchema): void
⋮----
// remove unexportable ajf fields.
⋮----
private _buildLabelsRow(names: string[]):
⋮----
/**
   * Removes commas from all Labels
   * @param labels The labels
   * @returns
   */
private _removeCommasFromlabels(labels:
⋮----
/**
   * xlsx needs a formatted label with fixed max length and no special characters
   * inside.
   * @param label
   * @returns a sheet name.
   */
private _buildSheetName(label: string): string
⋮----
/**
   * Return the XLSX.WorkSheet with label row and all data to be exported
   * @param ctxList the list of data to be exported
   * @param slideFieldNames
   * @returns an XLSX.WorkSheet
   */
private _buildWorksheet(ctxList: Context[], slideFieldNames: string[]): XLSX.WorkSheet
⋮----
/**
   * It builds a xlxs file and download it from browser.
   * It creates a xlxs workbook that contains a sheet with all the selected fields
   * and, if splitted is true, a sheet for each slide of the form.
   * The schema name is used as file name.
   *
   * @param ctxList is the list of ajf contexts.
   * @param splitted if true creates a sheet for each slide of the form
   */
private _buildXlsx(ctxList: Context[], splitted = false): void
⋮----
// remove empty sheets.
⋮----
// create the main sheet
⋮----
/**
   * It builds a csv file and download it from browser.
   * the csv contains all the selected fields.
   * The file name follows the following metric
   * `${schema_name}__${time_level}__${start_period}__${end_period}`
   *
   * @param ctxList is the list of ajf contexts.
   * @param exportModel is the ExportModel of current form schema.
   */
private _buildCsv(ctxList: Context[], all = false): void
⋮----
/**
   * Converts an XLSX Workbook to a File
   * @param wb The workbook
   * @param exportFormt The File format (csv or xlsx)
   * @param exportModel The exporter Export Model
   * @returns A file
   */
private _workbookToFile(
    wb: XLSX.WorkBook,
    exportFormat: ExportFormat,
    exportModel: ExportModel,
): File
⋮----
/* write workbook to Uint8Array */
⋮----
/* create array of parts */
const parts = [u8]; // `File` constructor expects this
/* create File */
⋮----
/**
   * Creates an AjfField array from Form Schema nodes
   * @param nodes The schema nodes
   * @returns
   */
private _flattenNodes(nodes: AjfNode[]): AjfNode[]
⋮----
/**
   * Count the max number of instances in the current context for all the repeating slides
   * @param fields ajfFields list for the repeating slide
   * @param ctx context for the form
   * @returns the max number of instances for all the  repeating slides
   */
private _countNumberOfInstanceInContext(fields: AjfField[], ctx: Context): number
⋮----
/**
   * It returns tha max count of the field instances for a specific repeating slide relative
   * to all the form data context list.
   * @param fields
   * @param ctxList
   * @param slideName
   * @returns
   */
private _countNumberOfRepeatingSlidesInstance(
    fields: AjfField[],
    ctxList: Context[],
    slideName: string,
): number
⋮----
/**
   * Evaluate the form context with its translations and put the result in exportCtx
   * @param field AjfField to be evaluate
   * @param exportCtx the output evaluated context
   * @param ctx the input Ajf Form Data context
   */
private _evaluateContext(field: AjfField, exportCtx: Context, ctx: Context): void
⋮----
private _getFieldName(name: string): string
⋮----
/**
   * @param ctxList is the list of ajf contexts.
   * @param names is the list of field names.
   * @return the ctxList filtered by names
   */
private _getSlideContex(ctxList: Context[], names: string[]): Context[]
⋮----
private _isObject(val: any): boolean
⋮----
/**
   * prevent instant error.
   * Do null checks and convert val to string or string array before instant calling.
   *
   * @private
   * @param val
   * @return {*}
   */
private _translate(val: any): string | string[]
⋮----
/**
   * Evaluate a form value with its translation or with its label
   * for choices, if required
   * @param value
   * @param prefix the prefix to add to the value to access to the translations dict
   * @returns the evaluated value
   */
private _translateCtxValue(
    value: string | number | string[] | number[],
    prefix?: string | null,
): string | string[]
⋮----
private _updateExportNamesBySlides(slideIndex: number, fieldName: string): void
```

## File: exporter/src/public_api.ts
```typescript
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
```

## File: exporter/exporter.md
```markdown
The `@dino/core/exporter` module provides a Class for exporting Lists of documents
```

## File: exporter/index.ts
```typescript
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
```

## File: exporter/ng-package.json
```json
{}
```

## File: file-upload/src/file-upload-module.ts
```typescript
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
⋮----
import {NgModule} from '@angular/core';
⋮----
export class FileUploadModule
```

## File: file-upload/src/file-upload-response.ts
```typescript
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
⋮----
/**
 * Nhost Storage Upload api response
 */
export interface StorageUploadResponse {
  /**
   * UUID v4 identifier for the file.
   */
  id: string;

  /**
   * upload response
   */
  isUploaded: boolean;

  /**
   * Mimetype of the file
   */
  mimeType: string;

  /**
   * The name of the file
   */
  name: string;

  /**
   * The size of the file
   */
  size: number;

  /**
   * The public url for the file in the storage
   */
  filePublicUrl?: string;

  /**
   * The nhost bucket id
   */
  bucketId?: string;

  /**
   * Creation timestamp.
   */
  createdAt: string;

  /**
   * Creation timestamp.
   */
  updatedAt: string;

  /**
   * UUID v4 identifier for the user.
   */
  uploadedByUserId?: string;

  /**
   * The etag
   */
  etag?: string;

  /**
   * Error message
   */
  error?: any;
}
⋮----
/**
   * UUID v4 identifier for the file.
   */
⋮----
/**
   * upload response
   */
⋮----
/**
   * Mimetype of the file
   */
⋮----
/**
   * The name of the file
   */
⋮----
/**
   * The size of the file
   */
⋮----
/**
   * The public url for the file in the storage
   */
⋮----
/**
   * The nhost bucket id
   */
⋮----
/**
   * Creation timestamp.
   */
⋮----
/**
   * Creation timestamp.
   */
⋮----
/**
   * UUID v4 identifier for the user.
   */
⋮----
/**
   * The etag
   */
⋮----
/**
   * Error message
   */
```

## File: file-upload/src/file-upload.spec.ts
```typescript
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {map, take} from 'rxjs/operators';
⋮----
import {
  AUTH_SERVICE_CONFIG,
  AuthService,
  AuthServiceConfig,
  LoginResponse,
  User,
} from '@dino/core/auth';
import {firstValueFrom} from 'rxjs';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
⋮----
const authStatus = ()
```

## File: file-upload/src/file-upload.ts
```typescript
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
⋮----
import {AjfFile} from '@ajf/core/file-input';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Inject, Injectable, isDevMode} from '@angular/core';
import {AuthService, AuthServiceConfig, AUTH_SERVICE_CONFIG} from '@dino/core/auth';
import {BehaviorSubject, Observable, of as obsOf, timer} from 'rxjs';
import {catchError, map, retry, switchMap} from 'rxjs/operators';
import {StorageUploadResponse} from './file-upload-response';
import {ErrorHandlerMessageService} from '@dino/core/error-handler';
⋮----
/**
 * Service that can upload files on cloud
 */
⋮----
export class FileUploadService
⋮----
/**
   * The Auth service configuration settings stream.
   */
⋮----
get authConfig(): AuthServiceConfig
⋮----
constructor(
    private _httpClient: HttpClient,
    private _authService: AuthService,
    private _ehms: ErrorHandlerMessageService,
    @Inject(AUTH_SERVICE_CONFIG) readonly config: AuthServiceConfig,
)
⋮----
/**
   * Upload a file into the nhost storage
   * @param fileToUpload the File to be uploaded in nhost storage
   * @returns An observable with the response of the upload
   */
uploadFileInStorage(file: File): Observable<StorageUploadResponse | null>
⋮----
/**
   * Upload a file into the nhost storage
   * @param fileToUpload the AjfFile to be uploaded in nhost storage
   * @returns An observable with the response of the upload
   */
uploadFile(fileToUpload: AjfFile): Observable<StorageUploadResponse | null>
⋮----
/**
   * Upload a list of files into the nhost storage
   * @param filesToUpload the AjfFile list to be uploaded in nhost storage
   * @returns A list observable with the response of the uploads
   */
uploadFiles(files: AjfFile[]): Observable<StorageUploadResponse | null>[]
⋮----
/**
   * Delete a file from the nhost storage
   * @param url the url to be deleted in nhost storage
   * @returns An observable with the response of the delete
   */
deleteFile(url: string): Observable<any>
⋮----
/**
   * Delete a list of files from the nhost storage
   * @param files the list of AjfFile to be deleted in nhost storage
   * @returns A list observable with the response of the delete
   */
deleteFiles(files: AjfFile[]): Observable<any>[]
⋮----
/**
   * Return the files in form, to be uploaded or deleted
   * @param formValue All the form value fields
   * @returns two lists of AjfFile: one to be uploaded on strorage, one to be deleted from storage
   * and a list of field name of files to be removed from context
   */
getFilesInForm(formValue:
⋮----
/**
   * Remove in the form values all the selected file
   * @param formValue All the form value fields
   * @returns The form value without all the file
   */
removeAllFiles(formValue:
⋮----
/**
   * Return the public url in the storage
   * @param storageResponse The storage service response for a file upload request
   * @returns The public url
   */
getUploadedFileUrl(storageResponse: StorageUploadResponse): string | null
⋮----
/**
   * Replace in the form values the file with the public url in the storage
   * @param formValue All the form value fields
   * @param storageResponse The storage service response for a file upload request
   * @returns The form value with the public url instead of the base64 content file
   */
replaceUploadedFile(
    formValue: {[key: string]: any},
    storageResponse: StorageUploadResponse,
):
⋮----
// Upload failed: clear stale URL from fields still holding base64 content.
⋮----
/**
   * Check if a value is an AjfFile field with a valid base64 content
   * @param value the value to be checked
   * @param uploadSignature if true, signature pngs are uploaded to the storage. Defaults to false.
   * @returns true if the input value is an AjfFile field
   */
isAjfBase64FileField(value: any, uploadSignature: boolean = true): boolean
⋮----
/**
   * Check if a value is an AjfFile field with url or a valid base64 content
   * @param value the value to be checked
   * @returns true if the input value is an AjfFile field
   */
isAnyAjfFileField(value: any): boolean
⋮----
/**
   * Check if a value is an AjfFile field but with an invalid content.
   * @param value the value to be checked
   * @returns true if the input value is an invalid AjfFile field to remove from context
   */
isAjfInvalidFileField(value: any): boolean
⋮----
/**
   * Check if a value is an AjfFile field with a valid url
   * @param value the value to be checked
   * @returns true if the input value is an AjfFile field
   */
isAjfFileFieldToDelete(value: any): boolean
⋮----
// Returns true for transient network/server errors that are worth retrying.
private _isRetryableUploadError(err: any): boolean
⋮----
/**
   * Convert a base64 into a Blob
   * @param base64File The base64 file to convert
   * @returns A Blob after base64 conversion
   */
private _convertBase64ToBlob(base64File: string): Blob
⋮----
private _removeSlashes(uri: string): string
⋮----
/**
   * Generate a full URL given an authentication endpoint.
   * @param endpoint The authentication endpoint.
   * @returns The full URL
   */
private _generateUrl(endpoint: string, baseUrl?: string): string
⋮----
/**
   * Check if a value is a base64-encoded audio string (e.g. data:audio/ogg;base64,...)
   * @param val the value to be checked
   * @returns true if the input value is a base64 audio string
   */
isBase64Audio(val: any): boolean
```

## File: file-upload/src/public_api.ts
```typescript
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
```

## File: file-upload/file-upload.md
```markdown
The `@dino/core/file-upload` module provides utilities for upload to cloud the files selected in a form.
```

## File: file-upload/index.ts
```typescript
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
```

## File: file-upload/ng-package.json
```json
{}
```

## File: forms/src/base-form-schema-manager.ts
```typescript
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
⋮----
import {AjfStringIdentifier} from '@ajf/core/common';
import {AjfChoicesOrigin, AjfField, AjfNodeType} from '@ajf/core/forms';
import {DEFAULT_EXCLUDED_METRIC_KEYS, MetricsService} from '@dino/core/data';
import {FilterGroup, FilterItem, ListHeader, NodeVisibility} from '@dino/core/list';
⋮----
import {FormSchema, migrationStrategies} from './form-schema';
import {schema} from './form-schema-json';
⋮----
const getChoiceOriginFromRef = (
  choicesOrigins: AjfChoicesOrigin<any>[],
  choicesOriginRef: string,
): AjfChoicesOrigin<any> =>
⋮----
/**
 * Generates a group of filters from an AjfFormSchema
 * @param formSchema The form schema definition
 * @returns The generated FilterGroup
 */
export const generateAdditionalFilters = (
  formSchema?: FormSchema,
  nodesVisibility?: NodeVisibility[],
): FilterGroup[] =>
⋮----
/**
 * Generates List Headers for the active Metrics
 * @returns The generated Metrics List Headers
 */
export const generateMetricsHeaders = (
  metricService: MetricsService,
  formSchema?: FormSchema,
): ListHeader<any>[] =>
⋮----
/**
 * Generates List Headers based on an AjfFormSchema
 * @param formSchema The form schema definition
 * @returns The generated Schema List Headers
 */
export const generateSchemaListHeaders = (
  metricService: MetricsService,
  formSchema?: FormSchema,
  sortAlphabetically?: boolean,
): ListHeader<any>[] =>
```

## File: forms/src/form-data-json.ts
```typescript
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
⋮----
import {RxJsonSchema} from 'rxdb';
⋮----
import {FormData} from './form-data';
⋮----
// tslint:disable
```

## File: forms/src/form-data-manager.ts
```typescript
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
⋮----
import {deepCopy} from '@ajf/core/utils';
import {Injectable} from '@angular/core';
import {
  DataModelManager,
  DataService,
  PermissionContextService,
  PullQueryContextChecks,
} from '@dino/core/data';
import {delay, forkJoin, from, isObservable, map, Observable, of as obsOf, retryWhen} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {RxDocument} from 'rxdb';
⋮----
import {FormData, indexes, migrationStrategies} from './form-data';
import {schema} from './form-data-json';
⋮----
export class FormDataManager extends DataModelManager<FormData>
⋮----
constructor(dataService: DataService, permissionContextService: PermissionContextService)
⋮----
/**
   * Populates all references to external collections in a FormData
   * @param doc The unpopulated RxDoc FormData
   * @returns The populated FormData
   */
populateFormData(doc: RxDocument<FormData>): RxDocument<
    FormData & {
      [key: string]: any;
    }
  > {
    let refProps = {};
for (let prop in doc)
⋮----
/**
   * Removes all population objects from a populated FormData
   * @param formData The Form Data to be depopulated
   * @returns The depopulated form data
   */
depopulateFormData(formData: FormData): FormData
⋮----
/**
   * Compares two FormDatas of the same Form Schema and returns the changed attributes keys
   * @param formData_1 The first formData
   * @param formData_2 The second formData
   * @param exceptions? The field that should be excluded from the comparation
   * @returns The diff attributes keys
   */
compareFormDatas(
    formData_1: FormData,
    formData_2: FormData,
    excludedFields?: string[],
):
⋮----
/**
   * Compares the Data attribute of two FormDatas of the same Form Schema and returns the changed data attributes keys
   * @param data_1 The Data of the first form
   * @param data_2 The Data of the second form
   * @returns The diff attributes keys
   */
compareFormDatasData(data_1:
⋮----
/**
   * Compares two objects for deep equality
   * @param obj1
   * @param obj2
   * @returns True if the objects are equal
   */
areObjectsEqual(obj1: any, obj2: any): boolean
⋮----
if (!this.areObjectsEqual(obj1[i], obj2[i])) return false; // Recursive call
⋮----
/**
   * Generates an observable of the populated Form Data.
   * @param formData A populated form data
   * @returns An observable with all the attributes of the populated Form Data
   */
generatePopulatedFormObservable(
    formData: FormData & {[key: string]: any},
): Observable<FormData &
⋮----
/**
   * Returns true if the FormData passed does not have a form status or if
   * it has one matching with a form status in the active user permissions.
   * @param formData  The Form Data to be checked
   * @returns True if there is a match
   */
hasAllowedFormStatus(formData: FormData | null): Observable<boolean>
⋮----
/**
   * Compares two arrays of primitive values and returns true if they have the same element values.
   * @param arr_1
   * @param arr_2
   * @returns True if the arrays have the same elements
   */
private _areArraysEquivalent(arr_1: any[] | null, arr_2: any[] | null): boolean
```

## File: forms/src/form-data.ts
```typescript
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
⋮----
import {Model} from '@dino/core/data';
import {MigrationStrategies, RxDocument} from 'rxdb';
⋮----
/**
 * This model is used to store the data collected through an Ajf form.
 * @title FormData
 */
export interface FormData extends Model {
  /**
   * The collector user identifier.
   */
  user_data_ref_id: string;

  /**
   * The schema identifier
   */
  form_schema_ref_id: string;

  /**
   * A plain object containing the data collected.
   */
  data: {dinoinvalid?: boolean; dino_filestoupload?: boolean; [key: string]: any};

  /**
   * The Form Data area id.
   */
  area_ref_id: string | null;

  /**
   * The Form Data case id.
   */
  case_ref_id: string | null;

  /**
   * The Form Data project id.
   */
  project_ref_id: string | null;

  /**
   * The Form Data location id.
   */
  location_ref_id: string | null;

  /**
   * The Form Data organization id.
   */
  organization_ref_id: string | null;

  /**
   * The UUID of the optional associated Form Status.
   */
  form_status_ref_id: string | null;
}
⋮----
/**
   * The collector user identifier.
   */
⋮----
/**
   * The schema identifier
   */
⋮----
/**
   * A plain object containing the data collected.
   */
⋮----
/**
   * The Form Data area id.
   */
⋮----
/**
   * The Form Data case id.
   */
⋮----
/**
   * The Form Data project id.
   */
⋮----
/**
   * The Form Data location id.
   */
⋮----
/**
   * The Form Data organization id.
   */
⋮----
/**
   * The UUID of the optional associated Form Status.
   */
```

## File: forms/src/form-info.ts
```typescript
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
⋮----
import {FormStatus} from './form-status';
import {UserData, UserGroup} from '@dino/core/users';
⋮----
/**
 * Represents all the info related to a Form Data that can be used in an AjfForm context
 */
export type FormInfo = {
  /**
   * The form data status
   */
  status: FormStatus | null;
  /**
   * All possible statuses
   */
  allStatuses: FormStatus[];
  /**
   * The creator of the form
   */
  user: UserData | null;
  /**
   * The creator permission groups
   */
  userGroups: UserGroup[] | null;
  /**
   * The currently active user
   */
  activeUser: UserData | null;
  /**
   * The active user permission groups
   */
  activeUserGroups: UserGroup[] | null;

  /**
   * The selected created_at form date
   */
  createdAt: Date | null;
};
⋮----
/**
   * The form data status
   */
⋮----
/**
   * All possible statuses
   */
⋮----
/**
   * The creator of the form
   */
⋮----
/**
   * The creator permission groups
   */
⋮----
/**
   * The currently active user
   */
⋮----
/**
   * The active user permission groups
   */
⋮----
/**
   * The selected created_at form date
   */
```

## File: forms/src/form-schema-additional-properties.ts
```typescript
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
⋮----
/**
 * Interface that represents the Ajf Form Schema additional properties.
 */
export interface AjfFormSchemaAdditionalProperties {
  /**
   * If true, only one Form Data with a given unique set of Metrics values can exist.
   */
  uniqueMetricsSet?: boolean;
}
⋮----
/**
   * If true, only one Form Data with a given unique set of Metrics values can exist.
   */
```

## File: forms/src/form-schema-deps-json.ts
```typescript
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
⋮----
import {RxJsonSchema} from 'rxdb';
⋮----
import {FormSchemaDeps} from './form-schema-deps';
⋮----
// tslint:disable
```

## File: forms/src/form-schema-deps-manager.ts
```typescript
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
⋮----
import {Injectable} from '@angular/core';
import {DataModelManager, DataService, PermissionContextService} from '@dino/core/data';
⋮----
import {schema} from './form-schema-deps-json';
import {FormSchemaDeps, migrationStrategies} from './form-schema-deps';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
⋮----
export class FormSchemaDepsManager extends DataModelManager<FormSchemaDeps>
⋮----
constructor(dataService: DataService, permissionContextService: PermissionContextService)
⋮----
/**
   * Returns true if the Form Schema id is used by any Form Schema Deps (Relationships to other Form Schemas)
   * @param formSchemaId The id of the Form Schema
   */
isUsedByAnyFormSchemaDeps(formSchemaId: string): Observable<boolean>
```

## File: forms/src/form-schema-deps.ts
```typescript
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
⋮----
import {AjfFormula} from '@ajf/core/models';
import {Model} from '@dino/core/data';
import {MigrationStrategies, RxDocument} from 'rxdb';
⋮----
/**
 * This model is used to store the Ajf form schema dependencies info.
 * @title FormSchemaDeps
 */
export interface FormSchemaDeps extends Model {
  /**
   * A list with external form or metrics relationships info
   */
  deps_origin?: Origin[];

  /**
   * The metrics that have data to show in the schema
   */
  metric_data_to_show?: string[];
}
⋮----
/**
   * A list with external form or metrics relationships info
   */
⋮----
/**
   * The metrics that have data to show in the schema
   */
⋮----
/**
 * This model is used to store the external form relationship info
 * @title DepsOrigin
 */
export interface DepsOrigin {
  /**
   * The form schema that have fields that this schema needs to show
   */
  form_schema_ref_id: string;

  /**
   * All the fields to be added or updated in the context form
   */
  fields_to_update?: string[];

  /**
   * The metrics to use to filter the form data
   */
  filter_by_metric?: string[];

  /**
   * True if this relationship should create a choices origin
   */
  is_choice?: boolean;

  /**
   * The details of the choicesOrigins to be added or replaced in the form schema
   */
  choices_origin?: FormSchemaChoiceOrigin | null;

  /**
   * @deprecated The field should not be used
   * The metrics to be included in the form schema as choice origin
   */
  metrics_choices_origin?: string[] | null;

  /**
   * Order by field for the query
   */
  order_by?: string;
}
⋮----
/**
   * The form schema that have fields that this schema needs to show
   */
⋮----
/**
   * All the fields to be added or updated in the context form
   */
⋮----
/**
   * The metrics to use to filter the form data
   */
⋮----
/**
   * True if this relationship should create a choices origin
   */
⋮----
/**
   * The details of the choicesOrigins to be added or replaced in the form schema
   */
⋮----
/**
   * @deprecated The field should not be used
   * The metrics to be included in the form schema as choice origin
   */
⋮----
/**
   * Order by field for the query
   */
⋮----
/**
 * This model is used to store metrics relationships info
 * @title MetricOrigin
 */
export interface MetricOrigin {
  /**
   * The metric name related to this new choice origin
   */
  metric_name: string;

  /**
   * The details of the choicesOrigins to be added or replaced in the form schema, based on metric info
   */
  choices_origin: FormSchemaChoiceOrigin;

  /**
   * Filter by condition usign all metric fields and attributes, javascript format
   */
  filter_by?: string;

  /**
   * Filter by condition transformed into query selector
   */
  query_selector?: {
    [key: string]: any;
  };
}
⋮----
/**
   * The metric name related to this new choice origin
   */
⋮----
/**
   * The details of the choicesOrigins to be added or replaced in the form schema, based on metric info
   */
⋮----
/**
   * Filter by condition usign all metric fields and attributes, javascript format
   */
⋮----
/**
   * Filter by condition transformed into query selector
   */
⋮----
export type Origin = DepsOrigin | MetricOrigin;
⋮----
/**
 * This model is used to store the info for the choicesOrigins
 * to be added or replaced in the form schema
 * Es.
 *   labelKey: {formula: '[[last_name]] [[first_name]]'},
 *   valueKey: 'id_family',
 * @title FormSchemaChoiceOrigin
 */
export interface FormSchemaChoiceOrigin {
  /**
   * Fields to be used for the label in the select options
   */
  label_fields?: string[];

  /**
   * The value to used in the select options
   */
  value_key?: string;

  /**
   * The name of the choicesOrigins to be added or replaced in the form schema
   * By default is equal to fieldname + '_choice' or metricName + '_metric_choice'
   */
  choices_origin_name?: string;

  /**
   * The formula for the labels in the select options
   */
  label_key?: AjfFormula;

  /**
   * An optional extra value to be added in the Choice object.
   * Eg. "country":
   * "choices": [
   *  {
   *   "label": "Partner 1",
   *   "value": "partner1",
   *   "country": "ITA"
   *  }
   * ],
   */
  extra_value_key?: string | null;
}
⋮----
/**
   * Fields to be used for the label in the select options
   */
⋮----
/**
   * The value to used in the select options
   */
⋮----
/**
   * The name of the choicesOrigins to be added or replaced in the form schema
   * By default is equal to fieldname + '_choice' or metricName + '_metric_choice'
   */
⋮----
/**
   * The formula for the labels in the select options
   */
⋮----
/**
   * An optional extra value to be added in the Choice object.
   * Eg. "country":
   * "choices": [
   *  {
   *   "label": "Partner 1",
   *   "value": "partner1",
   *   "country": "ITA"
   *  }
   * ],
   */
```

## File: forms/src/form-schema-example-data.ts
```typescript
/**
 * Represents the type of the data generated by method 'generateEmptyExampleData'
 * in FormSchemaManager
 */
export type FormSchemaExampleData = {
  /**
   * The example data output, with field name and field type
   */
  fieldTypes: {[key: string]: string};
  /**
   * The fields Labels
   */
  fieldLabels: {[key: string]: string};
  /**
   * The field description, with field name and field description
   */
  fieldDescriptions: {[key: string]: string | null | undefined};
};
⋮----
/**
   * The example data output, with field name and field type
   */
⋮----
/**
   * The fields Labels
   */
⋮----
/**
   * The field description, with field name and field description
   */
```

## File: forms/src/form-schema-json.ts
```typescript
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
⋮----
import {RxJsonSchema} from 'rxdb';
⋮----
import {FormSchema} from './form-schema';
⋮----
// tslint:disable
```

## File: forms/src/form-schema-manager.spec.ts
```typescript
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {EventEmitter} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from '@dino/core/data';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';
import {BehaviorSubject, of as obsOf} from 'rxjs';
⋮----
import {FormSchema, FormSchemaManager, FormSchemaVisibility} from './public_api';
import {UserData, UserGroup} from '@dino/core/users';
import {FormInfo} from './form-info';
import {ajfCustomFunctions} from '../../../e2e-app/src/ajf-custom-functions';
import {NodeVisibility} from '@dino/core/list';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
⋮----
function dataServiceConfig(): DataServiceConfig
```

## File: forms/src/form-schema-manager.ts
```typescript
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
⋮----
import {Injectable, Optional} from '@angular/core';
import {
  AjfCustomFunctions,
  DataModelManager,
  DataQueryOptions,
  DataQuerySelector,
  DataService,
  Metric,
  MetricsService,
  PermissionContextService,
  populateDocRefs,
} from '@dino/core/data';
import {
  FilterGroup,
  ListHeader,
  NodeVisibility,
  NodeWithVisibilityCondition,
} from '@dino/core/list';
⋮----
import {DepsOrigin, FormSchemaDeps, MetricOrigin} from './form-schema-deps';
import {FormData} from './form-data';
import {FormDataManager} from './form-data-manager';
import {FormSchema} from './form-schema';
import {
  AjfChoice,
  AjfChoicesOrigin,
  AjfField,
  AjfFieldType,
  AjfNode,
  isContainerNode,
  isField,
  isFieldWithChoices,
} from '@ajf/core/forms';
import {RxDocument} from 'rxdb';
import {Project, ProjectManager} from '@dino/core/projects';
import {deepCopy} from '@ajf/core/utils';
import {
  Observable,
  catchError,
  forkJoin,
  map,
  of as obsOf,
  switchMap,
  take,
  throwError,
  zip,
} from 'rxjs';
import {AreaManager} from '@dino/core/areas';
import {CaseManager} from '@dino/core/cases';
import {LocationManager} from '@dino/core/locations';
import {OrganizationManager} from '@dino/core/organizations';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {FormInfo} from './form-info';
import {FormSchemaExampleData} from './form-schema-example-data';
⋮----
export class FormSchemaManager extends DataModelManager<FormSchema>
⋮----
/**
   * A Dictionary of all the optional Metrics managers
   */
⋮----
constructor(
    dataService: DataService,
    permissionContextService: PermissionContextService,
    private _metricService: MetricsService,
    private _fdm: FormDataManager,
    @Optional() private _areaManager: AreaManager | null,
    @Optional() private _caseManager: CaseManager | null,
    @Optional() private _projectManager: ProjectManager | null,
    @Optional() private _locationManager: LocationManager | null,
    @Optional() private _organizationManager: OrganizationManager | null,
)
⋮----
override generateAdditionalFilters(
    formSchema?: FormSchema,
    nodesVisibility?: NodeVisibility[],
): FilterGroup[]
⋮----
generateMetricsHeaders(): ListHeader<any>[]
⋮----
generateSchemaListHeaders(
    formSchema?: FormSchema,
    sortAlphabetically?: boolean,
): ListHeader<any>[]
⋮----
/**
   * Retrieves the Label of a field in the schema by its name
   * @param fieldName The field name
   * @param schema The Form Schema
   * @returns The field label
   */
getLabelFromFieldName(fieldName: string, schema: FormSchema): string | null
⋮----
/**
   * Return observable for external form data and metric data
   * @param fschemadeps
   * @param isList
   * @param metricSel
   * @returns
   */
getExternalData(
    fschemadeps: FormSchemaDeps,
    isList: boolean,
    metricSel: {
      [key: string]: Metric;
    } | null,
):
⋮----
// TODO metrics_choices_origin will no longer be used.
// For now, we will handle it for compatibility with previously created relationships.
⋮----
/**
   * Populate the choice origins in the FormSchema
   * adding the external values taken via the relationships
   * @param formSchema
   * @returns the populated form schema
   */
getSchemaWithRelationships(
    formSchema: RxDocument<FormSchema> | null,
    isList: boolean,
    metricSel: {
      [key: string]: Metric;
    } | null,
): Observable<FormSchema | null>
⋮----
// Replace the field type for all fields that have a
// choice origin based on a One-to-One Relationship
⋮----
/**
   * Return the queries for the external datas for relationships
   * @param fschemadeps The form schema dependencies info
   * @param isList true if is a list datasource, false if is a create/edit single form
   * @param metricSel The selected metrics for the edited formdata if isList false
   * @returns A forkJoin for all the queries for the relationships data
   */
getExternalFormData(
    fschemadeps: FormSchemaDeps,
    isList: boolean,
    metricSel: {
      [key: string]: Metric;
    } | null,
): Observable<RxDocument<FormData>[][] | null>
⋮----
// For relationships in list datasource, add only choices relationships
⋮----
/**
   * Retrieves all values for the requested metrics
   * @param metricsNames The Metric names
   * @param metricsChoicesOriginDeps the metrics deps filters
   * @returns A forkJoin for all the queries for all metrics grouped by metric name
   */
getAllFormMetrics(
    metricsNames: string[] | null | undefined,
    metricsChoicesOriginDeps: MetricOrigin[],
): Observable<RxDocument<Metric>[][] | null>
⋮----
// Apply filter on metric query
⋮----
/**
   * If a choices origin with the input name exists in the schema, with a size of 0 or 1 element, this is a relationship choices orign.
   * In that case, find and return all form schema fields than using this input choice origin name.
   * @param formSchema the form schema
   * @param choicesOriginName the choices origin name to be found
   * @param replaceFieldType if true replaces the type with type String, for the field found.
   * This is used by the advanced search for relationships repeating slide fields.
   * @returns true if the choicesOriginName is used by some fields
   */
findFieldsWithChoicesByChoicesName(
    formSchema: FormSchema,
    choicesOriginName: string,
    replaceFieldType: boolean,
): boolean
⋮----
/**
   * Add new dynamic choices origins to form schema
   * @param formSchema the form schema to update
   * @param newChoicesOrigins
   * @returns The Form Schema with updated Choices Origins
   */
addChoiceOriginToFormSchema(
    formSchema: FormSchema,
    newChoicesOrigins: AjfChoicesOrigin<string>[],
): FormSchema | null
⋮----
/**
   * Return a list of Choice Origin options with values taken from a repeating slide field
   * @param fieldName
   * @param ctx
   * @returns new Choice Origins to add into a Form Schema
   */
getChoicesFromFieldReps(
    fieldName: string,
    ctx: {[key: string]: any} | null,
): AjfChoice<string>[]
⋮----
/**
   * Return a list of Choice Origin options with values taken from a list of Form Data documents
   * to be added into choicesOrigins in the formschema
   * @param depsOrigin containing info for labels and values to be used in the choice options
   * @param docs the list of Form Data to be used for the choices
   * @returns new Choice Origins to add into a Form Schema
   */
getChoicesFromDocs(
    depsOrigin: DepsOrigin,
    docs: RxDocument<FormData>[] | null,
): AjfChoice<string>[]
⋮----
/**
   * Return a list of Choice Origin options with values taken from a list of Metrics
   * @param docs the list of Metrics to be used for the choices
   * @param metricType metric type (project, case, organization...)
   * @returns new Choice Origins to add into a Form Schema
   */
getChoicesFromMetrics(
    docs: RxDocument<Metric>[],
    metricType: string,
    fschemadeps: FormSchemaDeps,
): AjfChoice<string>[]
⋮----
/**
   * Extract the label to be used in the new Choice Origin option
   * @param depsOrigin contains relationships information for the labels to be used in the selection options
   * @param extDataCtx the doc containing the values to be used to construct the label
   * @returns the label for the new Choice Option
   */
getLabelForChoice(depsOrigin: DepsOrigin | MetricOrigin, extDataCtx: any): string | null
⋮----
/**
   * Set new additional Controls in Form Group or update value if control exist
   * @param formGroup
   * @param additionalFormControls form controls to be set into form
   */
setNewControlsInForm(
    formGroup: UntypedFormGroup | null,
    additionalFormControls: {[key: string]: {[key: string]: any}},
): void
⋮----
// Update value in formgroup
⋮----
// Add control in formgroup
⋮----
/**
   * Returns true if any Form Data with this Form Schema ID exists
   */
hasAnyData(formSchemaId: string): Observable<boolean>
⋮----
/**
   * Generates a JSON object of an empty formdata "data" using all the Form Schema fields.
   * Keys are fields' names, values are fields' types converted to string.
   * Does NOT take slides into account.
   * @param schema the Form Schema
   * @returns the example data
   */
generateEmptyExampleData(schema: FormSchema): FormSchemaExampleData | null
⋮----
/**
   * Removes a single Form Schema by id. Updates its name with the current timestamp
   * before deleting it.
   * @param schemaId
   * @returns an observable of the deleted object
   */
override delete(schemaId: string): Observable<RxDocument<FormSchema> | null>
⋮----
/**
   * Evaluates Relevant Permissions and returns a NodeVisibility array
   * @param nodes The Form Schema nodes
   * @param formInfo? The Dino Form Info object
   * @param customFunctions? The Ajf Custom functions object
   * @returns A NodeVisibility array
   */
getPermissionsRelevant(
    nodes: AjfNode[] | undefined,
    formInfo?: FormInfo,
    customFunctions?: AjfCustomFunctions,
): NodeVisibility[]
⋮----
/**
   * Recursively extrapolates Node visibility and returns an array
   * @param nodeVisibilityConditions The nodes with their string visibilty condition
   * @param formInfo? The Dino Form Info object
   * @param customFunctions? The Ajf Custom functions object
   * @param parentVisible If false, children nodes will also be not visible
   * @returns An array with all nodes evaluated visibility
   */
private _generatePermissionsRelevant(
    nodeVisibilityConditions: NodeWithVisibilityCondition[],
    formInfo?: FormInfo,
    customFunctions?: AjfCustomFunctions,
    parentVisible: boolean = true,
): NodeVisibility[]
⋮----
/**
   * Returns a NodeWithVisibilityCondition array from a FormSchema
   * @param nodes? the source Form Schema nodes
   * @returns a NodeWithVisibilityCondition array of the schema flattened nodes
   */
private _generateNodesVisibilityConditions(
    nodes: AjfNode[] | undefined,
): NodeWithVisibilityCondition[]
⋮----
/**
   * Evaluates the Relevant Permissions of a single node.
   * Returns true if the node should be visible for the active user.
   * @param node The Form Schema node
   * @param formInfo? The Dino Form Info object
   * @param customFunctions? The Ajf Custom functions object
   * @returns
   */
private _evaluateRelevantNodeVisibility(
    node: NodeWithVisibilityCondition,
    formInfo?: FormInfo,
    customFunctions?: AjfCustomFunctions,
): boolean
⋮----
/**
   * Converts the AjfFieldType of a field node to string
   * @param type the AjfFieldType of the field
   * @returns the string value of the field type
   */
private _fieldTypeToString(type: AjfFieldType)
⋮----
/**
   * Escapes special characters in regular expressions
   * @param text the Regexp text
   * @returns the escaped regexp text
   */
private _escapeRegExp(text: string)
```

## File: forms/src/form-schema-visibility.ts
```typescript
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
⋮----
export const enum FormSchemaVisibility {
  Private = 0,
  Public = 1,
}
```

## File: forms/src/form-schema.ts
```typescript
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
⋮----
import {AjfFormCreate} from '@ajf/core/forms';
import {Model} from '@dino/core/data';
import {MigrationStrategies, RxDocument} from 'rxdb';
⋮----
import {FormSchemaVisibility} from './form-schema-visibility';
import {AjfFormSchemaAdditionalProperties} from './form-schema-additional-properties';
⋮----
/**
 * This model is used to store the Ajf form schemas.
 * @title FormSchema
 */
export interface FormSchema extends Model {
  /**
   * The form schema name.
   */
  name: string;

  /**
   * The form schema displayed label.
   */
  label?: string;

  /**
   * The form schema icon identifier.
   */
  icon?: string;

  /**
   * The UUIDs of the optional associated Form Statuses.
   */
  form_status_ref_id?: string[];

  /**
   * The names of the Metric types available for this schema.
   */
  form_schema_metrics?: string[];

  /**
   * The form schema visibility
   * @asType number
   */
  visibility: FormSchemaVisibility;

  /**
   * JSON definition of the Ajf form schema.
   * It must be valid against the [non-scrict
   * version](https://ajf.rocks/schemas/ajf-form-schema.json).
   * @asType object
   */
  schema: AjfFormCreate & AjfFormSchemaAdditionalProperties;

  /**
   * The related form schema deps id.
   */
  form_schema_deps_ref_id?: string | null;
}
⋮----
/**
   * The form schema name.
   */
⋮----
/**
   * The form schema displayed label.
   */
⋮----
/**
   * The form schema icon identifier.
   */
⋮----
/**
   * The UUIDs of the optional associated Form Statuses.
   */
⋮----
/**
   * The names of the Metric types available for this schema.
   */
⋮----
/**
   * The form schema visibility
   * @asType number
   */
⋮----
/**
   * JSON definition of the Ajf form schema.
   * It must be valid against the [non-scrict
   * version](https://ajf.rocks/schemas/ajf-form-schema.json).
   * @asType object
   */
⋮----
/**
   * The related form schema deps id.
   */
```

## File: forms/src/form-status-json.ts
```typescript
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
⋮----
import {RxJsonSchema} from 'rxdb';
⋮----
import {FormStatus} from './form-status';
⋮----
// tslint:disable
```

## File: forms/src/form-status-manager.ts
```typescript
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
⋮----
import {Injectable} from '@angular/core';
import {DataModelManager, DataService, PermissionContextService} from '@dino/core/data';
import {Observable, of as obsOf} from 'rxjs';
import {map} from 'rxjs/operators';
import {FormSchema} from './form-schema';
⋮----
import {FormStatus, indexes, migrationStrategies} from './form-status';
import {schema} from './form-status-json';
⋮----
export class FormStatusManager extends DataModelManager<FormStatus>
⋮----
constructor(dataService: DataService, permissionContextService: PermissionContextService)
⋮----
/**
   * Finds all available Form Statuses associated with a Form Schema, ordered by status level.
   * The default status is the first.
   * @param schema The Form Schema object
   * @returns The associated Form Statuses or null if no status is associated
   */
formStatusesOfSchema(schema: FormSchema): Observable<FormStatus[] | null>
```

## File: forms/src/form-status.ts
```typescript
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
⋮----
import {Model} from '@dino/core/data';
import {MigrationStrategies} from 'rxdb';
⋮----
/**
 * This model is used to store Form Statuses, associated with Form Schemas and Datas.
 * @title FormStatus
 */
export interface FormStatus extends Model {
  /**
   * The logical name of the Status
   */
  name: string;
  /**
   * The displayed label of the Status
   */
  label: string;
  /**
   * An arbitrary number identifying the Priority level or
   * the position of the status in a sequential pipeline.
   * The default status of a form is the one with the lowest
   * status level among the available statuses.
   */
  status_level: number;
  /**
   * The optional color associated with the Status label
   */
  color?: string;
}
⋮----
/**
   * The logical name of the Status
   */
⋮----
/**
   * The displayed label of the Status
   */
⋮----
/**
   * An arbitrary number identifying the Priority level or
   * the position of the status in a sequential pipeline.
   * The default status of a form is the one with the lowest
   * status level among the available statuses.
   */
⋮----
/**
   * The optional color associated with the Status label
   */
```

## File: forms/src/forms.module.ts
```typescript
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
⋮----
import {NgModule} from '@angular/core';
⋮----
export class FormsModule
```

## File: forms/src/online-form-data-manager.ts
```typescript
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
⋮----
import {Injectable} from '@angular/core';
import {OnlineDataModelManager, OnlineDataService, PermissionContextService} from '@dino/core/data';
⋮----
import {FormData, indexes, migrationStrategies} from './form-data';
import {schema} from './form-data-json';
import {FormsModule} from './forms.module';
⋮----
export class OnlineFormDataManager extends OnlineDataModelManager<FormData>
⋮----
constructor(dataService: OnlineDataService, permissionContextService: PermissionContextService)
```

## File: forms/src/online-form-schema-manager.ts
```typescript
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
⋮----
import {Injectable} from '@angular/core';
import {
  MetricsService,
  OnlineDataService,
  OnlineDataModelManager,
  PermissionContextService,
} from '@dino/core/data';
import {FilterGroup, ListHeader} from '@dino/core/list';
⋮----
import {FormSchema} from './form-schema';
import {FormsModule} from './forms.module';
⋮----
export class OnlineFormSchemaManager extends OnlineDataModelManager<FormSchema>
⋮----
constructor(
    dataService: OnlineDataService,
    permissionContextService: PermissionContextService,
    private _metricService: MetricsService,
)
⋮----
override generateAdditionalFilters(formSchema?: FormSchema): FilterGroup[]
⋮----
generateMetricsHeaders(): ListHeader<any>[]
⋮----
generateSchemaListHeaders(formSchema?: FormSchema): ListHeader<any>[]
```

## File: forms/src/online-form-status-manager.ts
```typescript
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
⋮----
import {Injectable} from '@angular/core';
import {OnlineDataService, OnlineDataModelManager, PermissionContextService} from '@dino/core/data';
⋮----
import {FormStatus, indexes, migrationStrategies} from './form-status';
import {schema} from './form-status-json';
import {FormsModule} from './forms.module';
import {FormSchema} from './form-schema';
import {Observable, of as obsOf} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
⋮----
export class OnlineFormStatusManager extends OnlineDataModelManager<FormStatus>
⋮----
constructor(dataService: OnlineDataService, permissionContextService: PermissionContextService)
⋮----
/**
   * Finds all available Form Statuses associated with a Form Schema
   * @param schema The Form Schema object
   * @returns The associated Form Statuses or null if no status is associated
   */
formStatusesOfSchema(schema: FormSchema): Observable<FormStatus[] | null>
```

## File: forms/src/populated-with-status.ts
```typescript
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
⋮----
import {Observable} from 'rxjs';
import {FormStatus} from './form-status';
⋮----
/**
 * Interface that represents the populated Form Status refs.
 */
export interface PopulatedWithStatus {
  /**
   * The populated Project observable.
   */
  form_status: Observable<FormStatus>;
}
⋮----
/**
   * The populated Project observable.
   */
```

## File: forms/src/public_api.ts
```typescript
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
```

## File: forms/forms.md
```markdown
The `@dino/core/forms` module provides the interfaces for Form Schema and Form Data of [Ajf forms](https://rxdb.info), as well as
data managers for both.

The Form Schema Manager exposes a method for generating filters from a Form Schema.
```

## File: forms/index.ts
```typescript
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
```

## File: forms/ng-package.json
```json
{}
```

## File: langs/src/lang-json.ts
```typescript
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
⋮----
import {RxJsonSchema} from 'rxdb';
⋮----
import {Lang} from './lang';
⋮----
// tslint:disable
```

## File: langs/src/lang-manager.ts
```typescript
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
⋮----
import {EventEmitter, Inject, Injectable, isDevMode} from '@angular/core';
import {DataModelManager, DataService, PermissionContextService} from '@dino/core/data';
import {dinoTranslations, TranslationsConfig, TRANSLATIONS_CONFIG} from '@dino/core/translations';
import {TranslocoService} from '@ngneat/transloco';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  iif,
  merge,
  Observable,
  of as obsOf,
  zip,
} from 'rxjs';
import {
  catchError,
  debounceTime,
  filter,
  map,
  startWith,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
⋮----
import {Lang, migrationStrategies} from './lang';
import {schema} from './lang-json';
import {defaultLangs, Dic, LangCreate, LangRow} from './utils';
import {ErrorHandlerMessageService} from '@dino/core/error-handler';
⋮----
export class LangManager extends DataModelManager<Lang>
⋮----
set currentLangName(langName: string)
⋮----
set newLang(lang: LangCreate | null)
⋮----
/**
   * Le langs storate sul db dino
   */
⋮----
/**
   * Osservabile che torna il json visualizzato frutto della composizione
   * del default + jsonScaricato + modifiche ancora non salvate
   */
⋮----
/**
   * Lo schema caricato nella sezione update json per aggiornare una lang tramite file json
   */
⋮----
set currentLangUpdateSchema(updateSchema: Dic)
⋮----
/**
   * Lo schema salvato sul db di dino della lang corrente
   */
⋮----
/**
   * Lo schema di default della lang corrente nel json della app
   */
⋮----
/**
   * Tutti gli attributi presenti nel json di aggiornamento ma non presenti
   * sullo schema salvato su dino
   */
⋮----
/**
   * Tutti gli attributi presenti nel json di aggiornamento che modificano attributi
   * dello schema salvato su dino
   */
⋮----
constructor(
    dataService: DataService,
    permissionContextService: PermissionContextService,
    private _ts: TranslocoService,
    private _ehms: ErrorHandlerMessageService,
    @Inject(TRANSLATIONS_CONFIG) private _config: TranslationsConfig,
)
⋮----
// creo due rami pipe se newLang è valorizzato ritorno newLang altrimenti
// seguo il ramo savePipe
⋮----
deleteLang(lang: Lang): Observable<Lang>
⋮----
removeKey(key: string): Observable<string>
⋮----
// If the key exists in this language doc, remove it
⋮----
// No custom translations found for this key, but it might be in defaults.
// We can't delete from defaults, so we warn the user.
⋮----
// rimuovi la key dalla cache locale prima di riscrivere
⋮----
removeLang(lang: Lang): Observable<string>
⋮----
saveLang(lang: LangCreate): Observable<Lang | null>
⋮----
updateLang(updates:
⋮----
// Handle key renaming
⋮----
// If it was only in defaults, and no new value provided, copy to newKey in DB
⋮----
// Handle value update/addition/deletion
⋮----
loadDinoLangs()
⋮----
private _modified(current: Dic, update: Dic | null): Dic
⋮----
private _diff(current: Dic, update: Dic | null): Dic
⋮----
private _reloadList(): void
```

## File: langs/src/lang.ts
```typescript
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
⋮----
import {Translation} from '@ajf/core/transloco';
import {Model} from '@dino/core/data';
import {MigrationStrategies} from 'rxdb';
⋮----
/**
 * This model is used to store the app translations.
 * @title Lang
 */
export interface Lang extends Model {
  /**
   * The language code
   */
  name: string;

  /**
   * A dictionary with the strings to be translated as keys and the
   * translations as values.
   * @asType object
   */
  schema: Translation;
}
⋮----
/**
   * The language code
   */
⋮----
/**
   * A dictionary with the strings to be translated as keys and the
   * translations as values.
   * @asType object
   */
```

## File: langs/src/public_api.ts
```typescript
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
```

## File: langs/src/utils.ts
```typescript
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
⋮----
import {InsertModel} from '@dino/core/data';
import {Lang} from './lang';
import {DatePipe} from '@angular/common';
⋮----
/**
 * key is the string used by translator.
 * The other attributes of langrow are the language/translation associations.
 *
 * example:
 * {key: 'name', ENG: 'name', SPA: 'NOMBRE'}
 *
 */
export interface LangRow {
  key: string;
  [lang: string]: string;
}
/**
 * It represents the interface of a dictionary
 */
export interface Dic {
  [key: string]: string;
}
⋮----
export type LangCreate = InsertModel<Lang>;
⋮----
export function getCurrentLocale(lang: string): string
⋮----
export function transformDateByLocale(dt: Date, lang: string, format: string): string
```

## File: langs/index.ts
```typescript
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
```

## File: langs/langs.md
```markdown

```

## File: langs/ng-package.json
```json
{}
```

## File: list/src/filters-service.spec.ts
```typescript
import {AjfFieldType, AjfValidationGroup} from '@ajf/core/forms';
import {fakeAsync, flush, TestBed} from '@angular/core/testing';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {AUTH_SERVICE_CONFIG, AuthServiceConfig} from '@dino/core/auth';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from '@dino/core/data';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';
import {RxJsonSchema} from 'rxdb';
import {of as obsOf} from 'rxjs';
import {AjfTranslocoModule} from '@ajf/core/transloco';
⋮----
import {FilterItem, FiltersService} from './public_api';
⋮----
function dataServiceConfig(): DataServiceConfig
```

## File: list/src/filters.service.ts
```typescript
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
⋮----
import {AjfFieldType, AjfValidationGroup} from '@ajf/core/forms';
import {AjfCondition, evaluateExpression} from '@ajf/core/models';
import {EventEmitter, Injectable} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MetricsService, Model} from '@dino/core/data';
import {TranslocoService} from '@ngneat/transloco';
import {RxJsonSchema, isRxDocument} from 'rxdb';
import {TopLevelProperty} from 'rxdb/dist/types/types/rx-schema';
import {
  BehaviorSubject,
  combineLatest,
  merge,
  Observable,
  of as obsOf,
  Subscription,
  throwError,
} from 'rxjs';
import {catchError, debounceTime, map, skip, take, withLatestFrom} from 'rxjs/operators';
⋮----
import {
  DEFAULT_MODEL_KEYS,
  FIELD_TYPES,
  FilterGroup,
  FilterItem,
  FilterListType,
  NOT_TRUE_CONDITION_OPERATOR,
  NULL_OPERATORS,
} from './list-filters-interfaces';
import {deepCopy} from '@ajf/core/utils';
⋮----
/**
 * Service that handles all operations related to list Filters.
 * It maintains the state of all FilterItems, including the value and operator of the active ones.
 * It takes care of communication between all Search Filters Components and the ListDataSource,
 * by generating a querystring from all active filters, which is then sent to the ListDataSource to
 * retrieve and display the filtered data in the List.
 * It generates FilterItems from the model RxJsonSchema provided by the ListDataSource.
 * It can load filters presets from the Preset Manager, and initialize filters accordingly.
 */
⋮----
export class FiltersService<T extends Model = Model>
⋮----
/**
   * Event emitted whenever a filter cannot be added or the and/or logic cannot be switched.
   * Should trigger a snackbar in a Material component.
   */
⋮----
/**
   * The labels of all available additional basic filters.
   * Available filters are added by importing the relative modules.
   * Used to check if a filter can be added and displayed in the
   * main filters component (eg. SearchFiltersBar)-
   */
⋮----
get availableBasicFilterLabels(): string[]
⋮----
/**
   * The labels of all the currently created additional basic filters.
   */
⋮----
get currentBasicFilterLabels(): string[]
/**
   * Filters generated from a Model Schema
   */
⋮----
get generatedModelFilters(): BehaviorSubject<FilterGroup[]>
⋮----
/**
   * Filters generated from the 'data' property of the model
   */
⋮----
get generatedAdditionalFilters(): Observable<FilterGroup[]>
⋮----
/**
   * List of all generated or custom filters
   */
⋮----
get generatedFilters(): Observable<FilterGroup[]>
⋮----
/**
   * List of custom filters. Overwrites the generated filters with a set of custom filters.
   */
⋮----
set setCustomFilters(filterGroups: FilterGroup[])
⋮----
/**
   * The FormGroups of the basic filters (Date and Keyword fields)
   */
⋮----
/**
   * The FormGroups of the Additional filters to be displayed in the main filter component
   * (eg. Location, Project etc.)
   */
⋮----
/**
   * An array of the valueChanges observables of all the basicFormGroups
   */
⋮----
/**
   * Basic filters such as text keyword search, from/to date search, usually displayed in the main
   * filter component
   */
⋮----
get basicFilters(): BehaviorSubject<FilterItem[]>
⋮----
/**
   * Additional filters, related to the "data" property of the model, usually displayed in
   * a secondary filter component (eg. a Dialog)
   */
⋮----
get additionalFilters(): BehaviorSubject<FilterItem[]>
⋮----
/**
   * Logic operator to be used when concatenating additional filters in the dataSource query.
   * Defaults to 'and'.
   */
⋮----
get additionalFiltersLogic(): BehaviorSubject<'and' | 'or'>
⋮----
/**
   * Logic operator dialog "toggle" value in the Advanced Filters dialog.
   * Defaults to 'and'.
   */
⋮----
/**
   * List of temporary filters that are not immediately applied and need an action to be included
   * in the activeFilters. (Eg. filters in a Dialog when the "search" button is clicked)
   */
⋮----
get temporaryFilters(): BehaviorSubject<FilterItem[]>
⋮----
/**
   * Encoded string of query parameters, generated from the all filters.
   * ListDataSource subscribes to this onbservable to generate queries to the db and
   * retrieve data.
   */
⋮----
get queryString(): Observable<string>
⋮----
/**
   * Subscribes to the value changes of all the basic filters
   * (displayed in the main filter component)
   */
⋮----
/**
   * Encoded string of a filters preset currently being loaded
   */
⋮----
/**
   * Subscribes to the load preset event, loading the filters preset and
   * updating the filters list accordingly
   */
⋮----
/**
   * Event that triggers the loading of a filters preset.
   */
⋮----
get loadPresetEvent(): EventEmitter<boolean>
⋮----
constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _ts: TranslocoService,
    private _metricsService: MetricsService,
)
⋮----
/**
   * Generates default filters from the RxJsonSchema of a model
   * @param modelSchema The model RxJsonSchema schema
   */
generateModelFilters(modelSchema: RxJsonSchema<T>): void
⋮----
/**
   * Clears all generated model filters
   */
clearModelFilters(): void
⋮----
/**
   * Clears all custom filters
   */
clearCustomFilters(): void
⋮----
/**
   * Sets the additional filters list
   * @param filters The generated filters. Defaults to an empty array
   */
setAdditionalFilters(filters: FilterGroup[] = []): void
⋮----
/**
   * Loads a filters preset from an encoded string, and initializes filters accordingly.
   * If no encoded string is passed to the method, it just initializes
   * the filters lists as empty.
   * @param encodedString? The optional encoded string
   */
loadPreset(encodedString?: string): void
⋮----
/**
   * Adds a FilterItem to the list of the chosen type.
   * @param filterItem The filter item to add
   * @param filterList The filter list where it will be added
   */
addFilter(filterItem: FilterItem, filterList: FilterListType): void
⋮----
/**
   * Returns a new FilterItem with the operator value and value updated for null operators.
   * Return $ne=true for boolean fields if value is false (also null values are treated as false).
   * Return same FilterItem if no changes are needed.
   * @param filterItem The filter item
   * @returns The new filter item
   */
private _getFilterItem(filterItem: FilterItem): FilterItem
⋮----
/**
   * Removes a FilterItem from the list/lists of the chosen type.
   * @param filterItem The filter item to remove
   * @param filterList The filter list or lists where it will be removed from
   * @returns a confirmation of the filter removal
   */
removeFilter(
    filterItem: FilterItem,
    filterList: FilterListType[] | FilterListType,
): Observable<boolean>
⋮----
/**
   * Searches for a FilterItem by name in a list of the chosen type.
   * If no type is specified, it searches in the TemporaryFiltersList
   * @param filterName The name of the filter to search for
   * @param filterList? Optional list of filters to search in
   * @returns The found FilterItem, or undefined if nothing is found
   */
findFilterByName(
    filterName: string,
    filterList?: FilterListType,
): Observable<FilterItem | undefined>
⋮----
/**
   * Evaluates a Filter's validation conditions
   * @param filterItem The FilterItem to check
   * @param ajfValidation The filter validation conditions to evaluate
   * @returns True if all the conditions are valid
   */
checkValidation(filterItem: FilterItem, ajfValidation?: AjfValidationGroup): boolean
⋮----
/**
   * Evaluates if a Filter validation/visibility single condition is met
   * @param condition The validation/visibility condition to evaluate
   * @param filterItem Optional filterItem to check
   * @returns True if the condition is met
   */
checkCondition(ajfCondition: AjfCondition, filterItem?: FilterItem): boolean
⋮----
/**
   * Overwrites the additional filters with the temporaryFilters.
   * @param logic The logic operator to use when creating the query in the dataSource.
   */
updateAdditionalFilters(logic?: 'and' | 'or'): void
⋮----
/**
   * Resets the temporaryFilters to the current additionalFilters value
   */
resetTemporaryFilters(): void
⋮----
/**
   * Sets and initializes the basic filters (dateStart, dateEnd and keyword and all other
   * additional basic filters) and loads the filter preset from the queryParams.
   * Returns an observable of all the additional basic filters initalized.
   * @param formGroups The basic filter form groups
   * @returns All the optional basic filters initalized
   */
initializeFilters(basicFormGroups: UntypedFormGroup[]): Observable<UntypedFormGroup[]>
⋮----
/**
   * Triggers the _loadPresetEvent
   */
loadPresetTrigger(): void
⋮----
/**
   * Adds a label to the list of available basic filters labels.
   * A label is added when the module of the relative filter (eg. Projects, Locations etc.)
   * is imported.
   * @param label The label of the filter to be displayed.
   */
addAvailableFilterLabel(label: string): void
⋮----
/**
   * Checks for additional basic filters, related to opt-in modules
   * (eg. Project, Location, Forms etc.).
   * @param basicFilter the basic filter to be added
   */
addBasicFilter(ftName: string): void
⋮----
// TODO multiple
⋮----
/**
   * Clears the additional basic filters arrays.
   */
clearAdditionalBasicFilters(): void
⋮----
/**
   * Checks if the "and/or" logic can be switched based on the filters currently present
   * in the temporary filters list.
   * @returns True if the logic can be switched
   */
canSwitchLogic(): Observable<boolean>
⋮----
/**
   * Checks if a filter can be added to a filter list.
   * @param filterItem The filter to be added
   * @param listType The list of filters
   * @returns True if the filter can be added to the specified list
   */
private _canAddFilter(filterItem: FilterItem, listType: FilterListType): boolean
⋮----
const isEmptyValue = (val: any)
⋮----
/**
   * Merges two arrays of FilterItems while overwriting old Filter values with new ones
   * @param oldFilters The old filters array
   * @param newFilters The new filters array
   * @returns The merged filters
   */
private _mergeFilterItems(oldFilters: FilterItem[], newFilters: FilterItem[])
⋮----
/**
   * If the field value in the form changes is a string instead of an object, it return,
   * if exists an '<fname>_multiple' field, the new value for the filter with all the selected ids.
   * @param changes form value changes
   * @param fName form field name
   * @returns the new value for the form field or null
   */
private _getIdsFromMultipleMetricSelection(changes: any, fName: string): any
⋮----
/**
   * Updates the queryString encoding a FilterItems array, and adds the queryParams to the url
   * @param filterItems The FilterItems array to be encoded
   * @returns The encoded query string
   */
private _updateQueryString(filterItems: FilterItem[]): string
⋮----
/**
   * Updates the basic filters form values
   * @param filterItems The FilterItems used to update the form values
   */
private _updateBasicFormValues(filterItems: FilterItem[]): void
⋮----
/**
   * Generates a FilterItem from a Model Property
   * @param propName The property name
   * @param prop The property
   * @returns The generated FilterItem
   */
private _propToFilterItem(propName: string, prop: TopLevelProperty): FilterItem
⋮----
/**
   * Returns an observable of all the filters in the list of the chosen type.
   * basic: filters displayed in the main component.
   * additional: filters displayed in a secondary component, usually related to model's "data".
   * temporary: filters temporarily stored, that need an action to be merged in the active filters.
   * @param type The filter list type
   * @returns The filter items in the chosen list
   */
private _selectFilterListType(type: FilterListType): BehaviorSubject<FilterItem[]>
⋮----
/**
   * Transforms the names of the Filter Items that are related to a metric RxDocument sub-filter
   * into their main Metric Name
   * (eg. case_code with RxDocument as value -> case (eg. filter by case code in aggregation section)
   *      case_name with string as value -> case_name (eg. for relationship metrics fields)
   * @param allFilters
   * @returns
   */
private _transformMetricSubFilters(allFilters: FilterItem[]): FilterItem[]
```

## File: list/src/list-actions-interface.ts
```typescript
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
⋮----
/**
 * Type that identifies an action performed by the User
 */
export type ActionType =
  | 'delete'
  | 'print'
  | 'docx'
  | 'download'
  | 'duplicate'
  | 'bulkFormEdit'
  | 'edit'
  | 'view'
  | 'viewlog'
  | 'select'
  | 'expand'
  | 'status edit'
  | 'addFavorite'
  | 'removeFavorite'
  | 'backup'
  | 'restore'
  | 'print badge';
⋮----
/**
 * The actions that are supposed to always be visible, when available.
 */
⋮----
/**
 * Action performed on a List item
 */
export interface ListAction {
  /**
   * The type of the action
   */
  actionType: ActionType;

  /**
   * The Material Icon for the action
   */
  matIcon?: string;

  /**
   * A custom action to be performed
   */
  customAction?: (row: any) => void;

  /**
   * User confirmation is needed if set to true
   */
  askConfirm?: boolean;
}
⋮----
/**
   * The type of the action
   */
⋮----
/**
   * The Material Icon for the action
   */
⋮----
/**
   * A custom action to be performed
   */
⋮----
/**
   * User confirmation is needed if set to true
   */
```

## File: list/src/list-filters-interfaces.ts
```typescript
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
⋮----
import {
  AjfBaseField,
  AjfChoice,
  AjfChoicesOrigin,
  AjfFieldType,
  AjfForm,
  AjfValidationGroup,
} from '@ajf/core/forms';
⋮----
/**
 * Group of Filters (equivalent to a Slide in a Dialog)
 */
export interface FilterGroup {
  /**
   * Name of the Group.
   */
  filterGroupName: string;
  /**
   * Basic Filters contained in the Group, displayed in the main filter component
   */
  filterGroupBasicFilters?: FilterItem[];
  /**
   * Additional Filters contained in the Group, displayed in a secondary filter component
   */
  filterGroupAdditionalFilters?: FilterItem[];
  /**
   * Indicates if the FilterGroup refers to a details list (in exandable tables)
   */
  isFilterGroupDetails?: boolean;
}
⋮----
/**
   * Name of the Group.
   */
⋮----
/**
   * Basic Filters contained in the Group, displayed in the main filter component
   */
⋮----
/**
   * Additional Filters contained in the Group, displayed in a secondary filter component
   */
⋮----
/**
   * Indicates if the FilterGroup refers to a details list (in exandable tables)
   */
⋮----
/**
 * Filter with value
 */
export interface FilterItem extends Partial<AjfBaseField> {
  /**
   * Name of the filter.
   */
  name: string;
  /**
   * Filter operator
   */
  operator?: Operator;
  /**
   * Filter value
   */
  value?: any;
  /**
   * Name of the FormControl object
   */
  formControlName?: string;
  /**
   * Choices origin for single/multiple choice filters
   */
  choicesOrigin?: AjfChoicesOrigin<any>;
  /**
   * Reference to the ChoicesOrigin
   */
  choicesOriginRef?: string;
  /**
   * Actual options for single/multiple choice filters
   */
  choices?: AjfChoice<any>[];
  /**
   * Specifies if this is an additional filter relative to the content of the model 'data' property
   */
  isAdditionalFilter?: boolean;
  /**
   * Specifies if this filter refers to a field belonging to a Repeating Slide
   */
  isRepeatingSlideFilter?: boolean;
  /**
   * States the validation state of the filter
   */
  isValid?: boolean;
  /**
   * Indicates if the FilterItem refers to a details list (in exandable tables)
   */
  isFilterItemDetails?: boolean;
}
⋮----
/**
   * Name of the filter.
   */
⋮----
/**
   * Filter operator
   */
⋮----
/**
   * Filter value
   */
⋮----
/**
   * Name of the FormControl object
   */
⋮----
/**
   * Choices origin for single/multiple choice filters
   */
⋮----
/**
   * Reference to the ChoicesOrigin
   */
⋮----
/**
   * Actual options for single/multiple choice filters
   */
⋮----
/**
   * Specifies if this is an additional filter relative to the content of the model 'data' property
   */
⋮----
/**
   * Specifies if this filter refers to a field belonging to a Repeating Slide
   */
⋮----
/**
   * States the validation state of the filter
   */
⋮----
/**
   * Indicates if the FilterItem refers to a details list (in exandable tables)
   */
⋮----
/**
 * Data necessary to generate a WidgetFilter
 */
export interface WidgetData {
  /**
   * The widgetFilter AjfForm
   */
  form: AjfForm;
  /**
   * Query comparison operator
   */
  operator: Operator;
  /**
   * If true, the WidgetFilter is active and is actually contributing to the ListDataSource query
   */
  active: boolean;
  /**
   * WidgetFilter validation conditions
   */
  validationConditions?: AjfValidationGroup;
  /**
   * If true the ajf field is of type Formula
   */
  isFormula: boolean;
}
⋮----
/**
   * The widgetFilter AjfForm
   */
⋮----
/**
   * Query comparison operator
   */
⋮----
/**
   * If true, the WidgetFilter is active and is actually contributing to the ListDataSource query
   */
⋮----
/**
   * WidgetFilter validation conditions
   */
⋮----
/**
   * If true the ajf field is of type Formula
   */
⋮----
/**
 * Conversion object from string to AjfFieldType
 */
⋮----
/**
 * Mongodb operators
 */
export interface Operator {
  /**
   * Operator label
   */
  label:
    | '<'
    | '>'
    | '<='
    | '>='
    | '=='
    | '!='
    | 'Exists'
    | 'Includes'
    | 'Not includes'
    | 'Is'
    | 'Not'
    | 'Like'
    | 'Not like'
    | 'Not empty'
    | 'Empty';
  /**
   * Operator value
   */
  value:
    | '$lt'
    | '$gt'
    | '$lte'
    | '$gte'
    | '$eq'
    | '$ne'
    | '$exist'
    | '$in'
    | '$nin'
    | '$in'
    | '$regex'
    | '$ne_null'
    | '$eq_null';
  /**
   * Operator options
   */
  options?: string;
}
⋮----
/**
   * Operator label
   */
⋮----
/**
   * Operator value
   */
⋮----
/**
   * Operator options
   */
⋮----
/**
 * Mongodb operators for numerical conditions
 */
⋮----
/**
 * Mongodb operators for single/multiple choice conditions
 */
⋮----
/**
 * Mongodb operators for string/text conditions
 */
⋮----
/**
 * Operator for boolean fields that are not true (false or null)
 */
⋮----
/**
 * All operators for conditions
 */
⋮----
/**
 * Mongodb default operators for different field types
 */
⋮----
/**
 * Keys of all models base properties.
 */
⋮----
/**
 * Type of a list of filterItems.
 * (Basic: displayed in the main filter component)
 * (Additional: displayed in a secondary filter component)
 * (Dialog: displayed in a dialog)
 * (All: a list of basic and additional filterItems)
 */
export type FilterListType = 'basic' | 'additional' | 'temporary' | 'all';
```

## File: list/src/list-header.ts
```typescript
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
⋮----
import {AjfFieldType} from '@ajf/core/forms';
⋮----
export interface ListHeader<T> {
  /**
   * The object key corresponding to the header.
   */
  column: keyof T;
  /**
   * The header label.
   */
  label: string;
  /**
   * If true, the column is sortable.
   */
  sortable?: boolean;
  /**
   * If true, the column can't be displayed.
   */
  hidden?: boolean;
  /**
   * Determines if the column is displayed.
   */
  displayed?: boolean;
  /**
   * The external object reference key (eg. area_ref_id)
   */
  external_ref?: string;
  /**
   * Specifies if the column must be populated by referring to
   * an external collection's property.
   * The reference string will be equal to the "column" property.
   */
  populateWith?: string;
  /**
   * If true, the content displayed in the list cell will be retrieved
   * from the Data attribute of the document. (eg. FormData.data)
   */
  dataColumn?: boolean;
  /**
   * If header of an Ajf Field column, this matches the Ajf Field Type of the corresponding field
   */
  fieldType?: AjfFieldType;
  /**
   * If true, the content of the list cell is retrieved from fields inside
   * a repeating slide.
   */
  repeatingSlideColumn?: boolean;
  /**
   * The name identifier of the repeating slide the header belongs to
   */
  repeatingSlideName?: string;
  /**
   * Optional header icon identifier
   */
  icon?: string;
  /**
   * Method needed to evaluate the editability of a cell.
   * If true and if the active user has the proper permissions,
   * the column cells can be edited directly from the list view.
   * A custom editor must be provided.
   */
  isEditable?: (rowData: {[key: string]: any}) => boolean;
  /**
   * The edit method provided for editable cells
   */
  editMethod?: (rowData: {[key: string]: any}) => void;
}
⋮----
/**
   * The object key corresponding to the header.
   */
⋮----
/**
   * The header label.
   */
⋮----
/**
   * If true, the column is sortable.
   */
⋮----
/**
   * If true, the column can't be displayed.
   */
⋮----
/**
   * Determines if the column is displayed.
   */
⋮----
/**
   * The external object reference key (eg. area_ref_id)
   */
⋮----
/**
   * Specifies if the column must be populated by referring to
   * an external collection's property.
   * The reference string will be equal to the "column" property.
   */
⋮----
/**
   * If true, the content displayed in the list cell will be retrieved
   * from the Data attribute of the document. (eg. FormData.data)
   */
⋮----
/**
   * If header of an Ajf Field column, this matches the Ajf Field Type of the corresponding field
   */
⋮----
/**
   * If true, the content of the list cell is retrieved from fields inside
   * a repeating slide.
   */
⋮----
/**
   * The name identifier of the repeating slide the header belongs to
   */
⋮----
/**
   * Optional header icon identifier
   */
⋮----
/**
   * Method needed to evaluate the editability of a cell.
   * If true and if the active user has the proper permissions,
   * the column cells can be edited directly from the list view.
   * A custom editor must be provided.
   */
⋮----
/**
   * The edit method provided for editable cells
   */
```

## File: list/src/list.module.ts
```typescript
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
⋮----
import {NgModule} from '@angular/core';
⋮----
export class ListModule
```

## File: list/src/list.spec.ts
```typescript
import {ChangeDetectorRef, EventEmitter} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {Model} from '@dino/core/data';
import {BehaviorSubject, Observable, of as obsOf, of} from 'rxjs';
⋮----
import {AdminUserInteractionsService, List, ListAction} from './public_api';
⋮----
markForCheck()
⋮----
class AdminUIService extends AdminUserInteractionsService
⋮----
askConfirm(_action: ListAction): Observable<boolean>
⋮----
interface DummyModel extends Model {
  name: string;
}
⋮----
class ListFeatComp extends List<DummyModel>
⋮----
constructor(cdr: ChangeDetectorRef, aui: AdminUIService, actroute: ActivatedRoute)
⋮----
createAction(_schemaId: string, _baseUrl: string)
duplicateAction(_item: DummyModel)
viewAction(_item: DummyModel, _isDetails: boolean): void
getSelection()
getItems()
clearSelection()
selectAll()
refreshList()
deleteAction(items: DummyModel[])
bulkFormEditAction(items: DummyModel[])
editAction(_item: DummyModel, _isDetails: boolean = false)
```

## File: list/src/list.ts
```typescript
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
⋮----
import {ChangeDetectorRef, Directive, EventEmitter, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Model} from '@dino/core/data';
import {BehaviorSubject, Subject, Subscription} from 'rxjs';
⋮----
import {ListAction} from './list-actions-interface';
import {ListHeader} from './list-header';
import {AdminUserInteractionsService} from './user-interactions';
import {b64_to_utf8, utf8_to_b64} from '@dino/core/auth';
import {NodeVisibility} from './node-visibility';
import {deepCopy} from '@ajf/core/utils';
⋮----
/**
 * The base List extended by SelectionList component.
 * Provides the core for a list with selection and bulk/individual actions capabilities.
 */
⋮----
export abstract class List<T extends Model = Model, AD extends Model = Model>
⋮----
/**
   * An event emitted when an action on a list item is performed.
   * Contains info about the action name and the list item/items involved.
   */
⋮----
/**
   * The model of the "data" property associated with the main model.
   */
⋮----
set additionalDataSchema(ds: AD | null)
⋮----
/**
   * The Ajf Form Nodes Visibility observable.
   * Only passed as an input for Form List.
   */
⋮----
set nodesVisibility(nv: NodeVisibility[] | null)
⋮----
/**
   * The list title
   */
⋮----
get title(): string
⋮----
set title(title: string)
⋮----
/**
   * The columns to be displayed
   */
⋮----
get displayedColumns(): string[]
⋮----
setDisplayedColumns(headers: ListHeader<T>[])
⋮----
/**
   * The list column headers
   */
⋮----
get headers(): ListHeader<T>[]
⋮----
/**
   * If true, selection checkboxes are shown.
   * Defaults to true.
   */
⋮----
get showCheckBox(): boolean
⋮----
set showCheckBox(show: boolean)
⋮----
/**
   * Sets the column headers and adds a 'Select' and 'Actions' headers.
   * Headers with 'displayed' set to false, will not be displayed, but will be
   * available for selection in the Column Selector.
   */
⋮----
set headers(headers: ListHeader<T>[])
⋮----
/**
   * The base url identifying the list Docs type
   */
⋮----
get baseUrl(): string
⋮----
set baseUrl(baseUrl: string)
⋮----
/**
   * The base url to be used for the Edit action on a list item
   */
⋮----
get baseEditUrl(): string
⋮----
set baseEditUrl(baseEditUrl: string)
⋮----
/**
   * The base url to be used for the Create action on a list item
   */
⋮----
get baseCreateUrl(): string
⋮----
set baseCreateUrl(baseCreateUrl: string)
⋮----
/**
   * The base url to be used for the View action on a list item
   */
⋮----
get baseViewUrl(): string
⋮----
set baseViewUrl(baseViewUrl: string)
⋮----
/**
   * The base instance name
   */
⋮----
get instanceName(): string | null
⋮----
set instanceName(instName: string | null)
⋮----
/**
   * Subscribes to the values of AdditionalDataSchema and NodesVisibility
   */
⋮----
constructor(
⋮----
abstract getSelection(): T[];
abstract getItems(): T[];
abstract clearSelection(): void;
abstract selectAll(): void;
abstract deleteAction(items: T[], isDetails: boolean): T[];
abstract bulkFormEditAction(items: T[]): void;
abstract editAction(item: T, isDetails: boolean): void;
abstract viewAction(item: T, isDetails: boolean): void;
abstract createAction(schemaId: string, baseUrl: string): void;
abstract duplicateAction(item: T): void;
⋮----
/**
   * Calls a handler function on the current selection based on the action name
   * @param action The name of the action to be performed
   */
processAction(action: ListAction, items: T | T[], isDetails: boolean = false): void
⋮----
/**
   * Saves a columns preset into the localstorage
   * @param columns The columns selection to be stored in the preset
   */
protected _saveColumnsSelectionPreset(
    preset: {columns: ListHeader<T>[]; displayedColumns: string[]} | null,
): void
⋮----
/**
   * Loads a columns preset from the localstorage
   */
protected _loadColumnsSelectionPreset():
⋮----
/**
   * Retrieves the list columns selection key in the localstorage
   * @returns The key, if present.
   */
protected _getColumnsSelectionPresetKey(): string | null
⋮----
/**
   * Retrieves the name of the handler functions based on the action name
   * @param action The name of the action
   * @returns The handler function name
   */
private _getActionHandler(action: string): string
```

## File: list/src/node-visibility.ts
```typescript
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
⋮----
/**
 * Represents Visibility property of an Ajf Node in a NodeTree
 */
export type NodeVisibility = {name: string; type: 'slide' | 'field'; visible: boolean};
⋮----
/**
 * An object with Name, type and visibility string condition of an Ajf Node in a NodeTree
 */
export type NodeWithVisibilityCondition = {
  name: string;
  type: 'slide' | 'field';
  visibilityCondition?: string;
  nodes?: NodeWithVisibilityCondition[];
};
```

## File: list/src/public_api.ts
```typescript
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
```

## File: list/src/search-filters.ts
```typescript
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
⋮----
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
⋮----
/**
 * Abstract base component inherited by any FiltersComponent.
 * Provides the default basic filters: dateStart, dateEnd and keyword search.
 */
export abstract class SearchFiltersComponent
⋮----
/**
   * Keyword search filters.
   */
⋮----
/**
   * "from Date" and "to Date" search filters.
   */
⋮----
/**
   * All the default basic filters.
   */
⋮----
/**
   * All the additional and optional basic filter (eg. Project, Location etc.)
   */
⋮----
/**
   * All the available additional basic filters labels.
   */
⋮----
/**
   * Initializes all available filters.
   */
abstract initFilters(): void;
⋮----
constructor()
```

## File: list/src/user-interactions.ts
```typescript
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
⋮----
import {Observable} from 'rxjs';
import {ListAction} from './list-actions-interface';
⋮----
/**
 * The base AdminUserInteractionsService extended by Material services.
 * Provides the core for a dialog/confirmation popup for confirming actions on list items
 * @param action The list action requiring confirmation
 * @param customContent The dialog custom text
 */
export abstract class AdminUserInteractionsService
⋮----
abstract askConfirm(action: ListAction, customContent?: string): Observable<boolean>;
```

## File: list/index.ts
```typescript
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
```

## File: list/list.md
```markdown
The `@dino/core/list` module provides the core List class for the creation of lists and tables with row/element selection and filtering capabilities.

The List class also handles and calls the appropriate method for any action to be performed on a single element or a selection of elements in the list
(Eg. Delete, Edit, View etc.).

The SearchFiltersComponent class represents the core class of all the basic filtering components that can be associated with the list or table.
It provides the default filters Keywords and Date of creation From/To.

The FiltersService handles all the filtering perfomed on the list or table data.
It maintains the state of all Filters and is responsible for their updating and the communication between the list or table, all of its associated
Filters Components and the List Data Source.

The FiltersService generates all the basic filters from the properties of the Model Schema provided by the List Data Source.
It also takes care of updating all the filters when loading a Filters Preset, and builds a string of query parameters from the filters values, that
is sent to the List Data Source.
```

## File: list/ng-package.json
```json
{}
```

## File: locations/src/form-data.ts
```typescript
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
⋮----
import {FormData as BaseFormData} from '@dino/core/forms';
⋮----
/**
 * Augments Form Data with the id of its location
 */
⋮----
interface FormData extends BaseFormData {
    /**
     * The Form Data location id.
     */
    location_ref_id: string | null;
  }
⋮----
/**
     * The Form Data location id.
     */
```

## File: locations/src/location-json.ts
```typescript
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
⋮----
import {RxJsonSchema} from 'rxdb';
⋮----
import {Location} from './location';
⋮----
// tslint:disable
```

## File: locations/src/location-manager.ts
```typescript
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
⋮----
import {Injectable} from '@angular/core';
import {
  CheckMetricPermission,
  DataModelManager,
  DataService,
  PermissionContextService,
} from '@dino/core/data';
⋮----
import {Location, migrationStrategies} from './location';
import {schema} from './location-json';
import {LocationModule} from './locations.module';
⋮----
/**
 * Service that manages FormData Locations
 */
⋮----
export class LocationManager extends DataModelManager<Location>
⋮----
constructor(dataService: DataService, permissionContextService: PermissionContextService)
```

## File: locations/src/location.ts
```typescript
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
import {Metric} from '@dino/core/data';
import {MigrationStrategies, RxDocument} from 'rxdb';
⋮----
/**
 * This model is used to store Locations.
 * @title Location
 */
export interface Location extends Metric {
  /**
   * The optional location map coordinates
   */
  coordinates?: string;
}
⋮----
/**
   * The optional location map coordinates
   */
```

## File: locations/src/locations.module.ts
```typescript
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
⋮----
import {NgModule} from '@angular/core';
import {ActiveMetric, MetricsService} from '@dino/core/data';
import {FiltersService} from '@dino/core/list';
import {schema} from './location-json';
⋮----
/**
 * Optional module augmenting Forms that provides the LocationManager service
 */
⋮----
export class LocationModule
⋮----
constructor(private _filtersService: FiltersService, private _metricsService: MetricsService)
```

## File: locations/src/populated-with-location.ts
```typescript
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
⋮----
import {Observable} from 'rxjs';
import {Location} from './location';
⋮----
/**
 * Interface that represents the populated Location refs.
 */
export interface PopulatedWithLocation {
  /**
   * The populated Location observable.
   */
  location: Observable<Location[]>;
}
⋮----
/**
   * The populated Location observable.
   */
```

## File: locations/src/public_api.ts
```typescript
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
```

## File: locations/src/report-data.ts
```typescript
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
⋮----
import {ReportData as BaseReportData} from '@dino/core/reports';
⋮----
/**
 * Augments Report Data with the id of its location
 */
⋮----
interface ReportData extends BaseReportData {
    /**
     * The Report Data location id.
     */
    location_ref_id: string | null;
  }
⋮----
/**
     * The Report Data location id.
     */
```

## File: locations/index.ts
```typescript
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
```

## File: locations/locations.md
```markdown
The `@dino/core/locations` module provides the interface for the Location model, and a Data Manager for locations.
It augments the `@dino/core/forms` module by adding a "location" property to the Form Data.
When imported, it makes the "location" basic filter available.
```

## File: locations/ng-package.json
```json
{}
```

## File: notifications/src/notification-json.ts
```typescript
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
⋮----
import {RxJsonSchema} from 'rxdb';
⋮----
import {Notification} from './notification';
⋮----
// tslint:disable
```

## File: notifications/src/notification-manager.ts
```typescript
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
⋮----
import {deepCopy} from '@ajf/core/utils';
import {Injectable} from '@angular/core';
import {
  DataListOptions,
  DataModelManager,
  DataQueryOptions,
  DataService,
  PermissionContextService,
} from '@dino/core/data';
import {RxDocument} from 'rxdb';
import {Observable, of as obsOf} from 'rxjs';
import {delay, map, switchMap, withLatestFrom} from 'rxjs/operators';
⋮----
import {Notification} from './notification';
import {schema} from './notification-json';
import {NotificationModule} from './notification.module';
⋮----
/**
 * Service that manages Notifications
 */
⋮----
export class NotificationManager extends DataModelManager<Notification>
⋮----
constructor(dataService: DataService, permissionContextService: PermissionContextService)
⋮----
/**
   * Overrides the base List method by adding recipients filtering
   * @param options? a list of DataListOptions options.
   * @returns The documents selected.
   */
override list(options?: DataListOptions): Observable<RxDocument<Notification,
⋮----
/**
   * Overrides the base Query method by adding recipients filtering
   * @param options? a list of DataQueryOptions options.
   * @returns The documents selected.
   */
override query(options: DataQueryOptions): Observable<RxDocument<Notification,
⋮----
/**
   * Returns the notifications currently unread by the user
   * @param userDataId The active user data id
   * @returns The amount of unread Notifications
   */
getUnreadNotificationsNumber(userDataId: string | null): Observable<number>
⋮----
/**
   * Returns the last N notifications received by the active user
   * @param userDataId The active user data id
   * @param num The amount of notfications to fetch. Defaults to 20.
   * @returns The requested amount of notifications
   */
getLastNotifications(
    userDataId: string | null,
    num: number = 20,
): Observable<(Notification &
⋮----
/**
   * Marks a notification as 'read' by the user and updates the notification readers attribute
   * @param notification The notification to update
   */
markNotificationAsRead(
    notification: Notification,
    userDataId: string | null,
): Observable<RxDocument<Notification,
```

## File: notifications/src/notification.module.ts
```typescript
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
⋮----
import {NgModule} from '@angular/core';
⋮----
/**
 * The Notifications module
 */
⋮----
export class NotificationModule
⋮----
constructor()
```

## File: notifications/src/notification.ts
```typescript
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
import {Model} from '@dino/core/data';
import {MigrationStrategies} from 'rxdb';
⋮----
/**
 * Represents types of notification messages
 */
export type NotificationType = 'info' | 'warning' | 'alert';
⋮----
/**
 * The icon string identifiers for each notification type
 */
⋮----
/**
 * This model is used to store Notifications.
 * @title Notification
 */
export interface Notification extends Model {
  /**
   * Specifies the Dino User IDS able to see and read this notification
   */
  recipients: string[];

  /**
   * Specifies the Dino User IDS of users that have read this notification
   */
  readers: string[];

  /**
   * The notification's text message
   */
  text: string | null;

  /**
   * Specifies the Type of the notification message
   */
  type: NotificationType | null;

  /**
   * The notification optional icon identifier
   */
  icon?: string;

  /**
   * The optional URL where the user is redirected upon clicking
   */
  redirect_url?: string;
}
⋮----
/**
   * Specifies the Dino User IDS able to see and read this notification
   */
⋮----
/**
   * Specifies the Dino User IDS of users that have read this notification
   */
⋮----
/**
   * The notification's text message
   */
⋮----
/**
   * Specifies the Type of the notification message
   */
⋮----
/**
   * The notification optional icon identifier
   */
⋮----
/**
   * The optional URL where the user is redirected upon clicking
   */
```

## File: notifications/src/public_api.ts
```typescript
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
```

## File: notifications/index.ts
```typescript
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
```

## File: notifications/ng-package.json
```json
{}
```

## File: notifications/notifications.md
```markdown
The `@dino/core/notifications` module provides the interface for the Notification model, and a Data Manager for notifications.
```

## File: organizations/src/form-data.ts
```typescript
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
⋮----
import {FormData as BaseFormData} from '@dino/core/forms';
⋮----
/**
 * Augments Form Data with the id of its organization
 */
⋮----
interface FormData extends BaseFormData {
    /**
     * The Form Data organization id.
     */
    organization_ref_id: string | null;
  }
⋮----
/**
     * The Form Data organization id.
     */
```

## File: organizations/src/organization-json.ts
```typescript
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
⋮----
import {RxJsonSchema} from 'rxdb';
⋮----
import {Organization} from './organization';
⋮----
// tslint:disable
```

## File: organizations/src/organization-manager.ts
```typescript
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
⋮----
import {Injectable} from '@angular/core';
import {
  CheckMetricPermission,
  DataModelManager,
  DataService,
  PermissionContextService,
} from '@dino/core/data';
⋮----
import {Organization, migrationStrategies} from './organization';
import {schema} from './organization-json';
import {OrganizationsModule} from './organizations.module';
⋮----
/**
 * Service that manages FormData Organizations
 */
⋮----
export class OrganizationManager extends DataModelManager<Organization>
⋮----
constructor(dataService: DataService, permissionContextService: PermissionContextService)
```

## File: organizations/src/organization.ts
```typescript
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
import {Metric} from '@dino/core/data';
import {MigrationStrategies, RxDocument} from 'rxdb';
⋮----
/**
 * This model is used to store Organizations.
 * @title Organization
 */
export interface Organization extends Metric {
  /**
   * The Organization logo path
   */
  logo_path: string | null;

  /**
   * The Organization website url
   */
  website_url: string | null;
}
⋮----
/**
   * The Organization logo path
   */
⋮----
/**
   * The Organization website url
   */
```

## File: organizations/src/organizations.module.ts
```typescript
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
⋮----
import {NgModule} from '@angular/core';
import {ActiveMetric, MetricsService} from '@dino/core/data';
import {FiltersService} from '@dino/core/list';
import {schema} from './organization-json';
⋮----
/**
 * Optional module augmenting Forms that provides the OrganizationManager service
 */
⋮----
export class OrganizationsModule
⋮----
constructor(private _filtersService: FiltersService, private _metricsService: MetricsService)
```

## File: organizations/src/populated-with-organization.ts
```typescript
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
⋮----
import {Observable} from 'rxjs';
import {Organization} from './organization';
⋮----
/**
 * Interface that represents the populated Organization refs.
 */
export interface PopulatedWithOrganization {
  /**
   * The populated Organization observable.
   */
  organization: Observable<Organization[]>;
}
⋮----
/**
   * The populated Organization observable.
   */
```

## File: organizations/src/public_api.ts
```typescript
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
```

## File: organizations/src/report-data.ts
```typescript
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
⋮----
import {ReportData as BaseReportData} from '@dino/core/reports';
⋮----
/**
 * Augments Report Data with the id of its organization
 */
⋮----
interface ReportData extends BaseReportData {
    /**
     * The Report Data organization id.
     */
    organization_ref_id: string | null;
  }
⋮----
/**
     * The Report Data organization id.
     */
```

## File: organizations/index.ts
```typescript
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
```

## File: organizations/ng-package.json
```json
{}
```

## File: organizations/organizations.md
```markdown
The `@dino/core/organizations` module provides the interface for the Organizations model, and a Data Manager for organizations.
It augments the `@dino/core/forms` module by adding an "organization" property to the Form Data.
When imported, it makes the "organization" basic filter available.
```

## File: projects/src/form-data.ts
```typescript
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
⋮----
import {FormData as BaseFormData} from '@dino/core/forms';
⋮----
/**
 * Augments Form Data with the id of its Project
 */
⋮----
interface FormData extends BaseFormData {
    /**
     * The Form Data project id.
     */
    project_ref_id: string | null;
  }
⋮----
/**
     * The Form Data project id.
     */
```

## File: projects/src/populated-with-project.ts
```typescript
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
⋮----
import {Observable} from 'rxjs';
import {Project} from './project';
⋮----
/**
 * Interface that represents the populated Project refs.
 */
export interface PopulatedWithProject {
  /**
   * The populated Project observable.
   */
  project: Observable<Project[]>;
}
⋮----
/**
   * The populated Project observable.
   */
```

## File: projects/src/project-json.ts
```typescript
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
⋮----
import {RxJsonSchema} from 'rxdb';
⋮----
import {Project} from './project';
⋮----
// tslint:disable
```

## File: projects/src/project-manager.ts
```typescript
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
⋮----
import {Injectable} from '@angular/core';
import {
  CheckMetricPermission,
  DataModelManager,
  DataService,
  PermissionContextService,
} from '@dino/core/data';
⋮----
import {migrationStrategies, Project} from './project';
import {schema} from './project-json';
import {ProjectModule} from './projects.module';
⋮----
/**
 * Service that manages FormData Projects
 */
⋮----
export class ProjectManager extends DataModelManager<Project>
⋮----
constructor(dataService: DataService, permissionContextService: PermissionContextService)
```

## File: projects/src/project.ts
```typescript
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
import {Metric} from '@dino/core/data';
import {MigrationStrategies, RxDocument} from 'rxdb';
⋮----
/**
 * This model is used to store Projects.
 * @title Project
 */
export interface Project extends Metric {
  /**
   * The project Code identifier
   */
  code: string;

  /**
   * The project sectors of intervention
   */
  sectors_of_intervention: string | null;

  /**
   * The project Donors
   */
  donors: string | null;

  /**
   * Project start date timestamp.
   */
  start_date: string | null;

  /**
   * Project end date timestamp.
   */
  end_date: string | null;

  /**
   * The Project auto-generated incremental Code identifier
   */
  code_auto?: number;
}
⋮----
/**
   * The project Code identifier
   */
⋮----
/**
   * The project sectors of intervention
   */
⋮----
/**
   * The project Donors
   */
⋮----
/**
   * Project start date timestamp.
   */
⋮----
/**
   * Project end date timestamp.
   */
⋮----
/**
   * The Project auto-generated incremental Code identifier
   */
```

## File: projects/src/projects.module.ts
```typescript
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
⋮----
import {NgModule} from '@angular/core';
import {FiltersService} from '@dino/core/list';
import {ActiveMetric, MetricsService} from '@dino/core/data';
import {schema} from './project-json';
⋮----
/**
 * Optional module augmenting Forms that provides the ProjectManager service
 */
⋮----
export class ProjectModule
⋮----
constructor(private _filtersService: FiltersService, private _metricsService: MetricsService)
```

## File: projects/src/public_api.ts
```typescript
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
```

## File: projects/src/report-data.ts
```typescript
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
⋮----
import {ReportData as BaseReportData} from '@dino/core/reports';
⋮----
/**
 * Augments Report Data with the id of its Project
 */
⋮----
interface ReportData extends BaseReportData {
    /**
     * The Report Data project id.
     */
    project_ref_id: string | null;
  }
⋮----
/**
     * The Report Data project id.
     */
```

## File: projects/index.ts
```typescript
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
```

## File: projects/ng-package.json
```json
{}
```

## File: projects/projects.md
```markdown
The `@dino/core/projects` module provides the interface for the Project model, and a Data Manager for projects.
It augments the `@dino/core/forms` module by adding a "project" property to the Form Data.
When imported, it makes the "project" basic filter available.
```

## File: reports/src/public_api.ts
```typescript
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
```

## File: reports/src/report-data-json.ts
```typescript
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
⋮----
import {RxJsonSchema} from 'rxdb';
⋮----
import {ReportData} from './report-data';
⋮----
// tslint:disable
```

## File: reports/src/report-data-manager.ts
```typescript
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
⋮----
import {Injectable} from '@angular/core';
import {
  DataModelManager,
  DataQueryOptions,
  DataService,
  PermissionContextService,
  PullQueryContextChecks,
} from '@dino/core/data';
⋮----
import {indexes, migrationStrategies, ReportData} from './report-data';
import {schema} from './report-data-json';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
⋮----
export class ReportDataManager extends DataModelManager<ReportData>
⋮----
constructor(dataService: DataService, permissionContextService: PermissionContextService)
⋮----
/**
   * Checks if one Report Data associated to a given Report Schema already exists
   * @param rsId The id of the report schema
   * @returns True if at least one document is found
   */
checkOneReportDataExists(rsId: string): Observable<boolean>
```

## File: reports/src/report-data.ts
```typescript
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
⋮----
import {Model} from '@dino/core/data';
import {MigrationStrategies, RxDocument} from 'rxdb';
⋮----
/**
 * This model is used to store the data collected through an Ajf report.
 * @title ReportData
 */
export interface ReportData extends Model {
  /**
   * The collector user identifier.
   */
  user_data_ref_id: string;

  /**
   * The report data name.
   */
  name: string | null;

  /**
   * The schema identifier.
   */
  report_schema_ref_id: string;

  /**
   * Additional metadata json that can be provided to build the
   * report based on the desired conditions.
   */
  metadata: {[key: string]: any};

  /**
   * The starting date of the collected form data used by
   * the Report.
   */
  date_start: string | null;

  /**
   * The ending date of the collected form data used by
   * the Report.
   */
  date_end: string | null;

  /**
   * The Report Data area id.
   */
  area_ref_id: string | null;

  /**
   * The Report Data case id.
   */
  case_ref_id: string | null;

  /**
   * The Report Data project id.
   */
  project_ref_id: string | null;

  /**
   * The Report Data location id.
   */
  location_ref_id: string | null;

  /**
   * The Report Data organization id.
   */
  organization_ref_id: string | null;

  /**
   * The Form Status of the collected form data used by
   * the Report.
   */
  form_status_ref_id: string | null;

  /**
   * A plain object containing additional data for the report.
   * Text generated with AI is stored here.
   */
  data: {[key: string]: any};
}
⋮----
/**
   * The collector user identifier.
   */
⋮----
/**
   * The report data name.
   */
⋮----
/**
   * The schema identifier.
   */
⋮----
/**
   * Additional metadata json that can be provided to build the
   * report based on the desired conditions.
   */
⋮----
/**
   * The starting date of the collected form data used by
   * the Report.
   */
⋮----
/**
   * The ending date of the collected form data used by
   * the Report.
   */
⋮----
/**
   * The Report Data area id.
   */
⋮----
/**
   * The Report Data case id.
   */
⋮----
/**
   * The Report Data project id.
   */
⋮----
/**
   * The Report Data location id.
   */
⋮----
/**
   * The Report Data organization id.
   */
⋮----
/**
   * The Form Status of the collected form data used by
   * the Report.
   */
⋮----
/**
   * A plain object containing additional data for the report.
   * Text generated with AI is stored here.
   */
```

## File: reports/src/report-schema-json.ts
```typescript
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
⋮----
import {RxJsonSchema} from 'rxdb';
⋮----
import {ReportSchema} from './report-schema';
⋮----
// tslint:disable
```

## File: reports/src/report-schema-manager.ts
```typescript
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
⋮----
import {Injectable} from '@angular/core';
import {
  DataModelManager,
  DataQueryOptions,
  DataService,
  PermissionContextService,
} from '@dino/core/data';
⋮----
import {migrationStrategies, ReportSchema} from './report-schema';
import {schema} from './report-schema-json';
import {Observable, of as obsOf} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {RxDocument} from 'rxdb';
import {ReportDataManager} from './report-data-manager';
import {AjfReportVariable} from '@ajf/core/reports';
⋮----
export class ReportSchemaManager extends DataModelManager<ReportSchema>
⋮----
constructor(
    dataService: DataService,
    permissionContextService: PermissionContextService,
    private _rdm: ReportDataManager,
)
⋮----
/**
   * Checks if an Automatic Report associated to a given Form Schema already exists
   * @param fsName The form schema name
   * @param fsId The id of the form schema
   */
checkAutoReportExists(fsName: string, fsId: string): Observable<RxDocument<ReportSchema> | null>
⋮----
/**
   * Returns true if any Report Data with this Report Schema ID exists
   * @param reportSchemaId The id of the Report Schema
   */
hasAnyData(reportSchemaId: string): Observable<boolean>
⋮----
/**
   * Returns true if the Form Schema id is used by any Report Schema
   * @param formSchemaId The id of the Form Schema
   */
isUsedByAnyReports(formSchemaId: string): Observable<boolean>
⋮----
/**
   * Indicates if the Report Schema has any AIPrompt Variables and returns them.
   * @param schemaId the Report Schema uuid
   * @returns an observable of the AI Prompt Variables or of an empty array
   */
getAIPromptVariablesFromSchemaID(schemaId: string): Observable<AjfReportVariable[]>
⋮----
/**
   * Retrieves all Report Schema AIPrompt variables.
   * @param schema the Report Schema
   * @returns AI Prompt Variables array
   */
getAIPromptVariablesFromSchema(schema: ReportSchema): AjfReportVariable[]
⋮----
/**
   * Removes a single Report Schema by id. Updates its name with the current timestamp
   * before deleting it.
   * @param schemaId
   * @returns an observable of the deleted object
   */
override delete(schemaId: string): Observable<RxDocument<ReportSchema> | null>
```

## File: reports/src/report-schema.ts
```typescript
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
⋮----
import {AjfReport} from '@ajf/core/reports';
import {Model} from '@dino/core/data';
import {MigrationStrategies, RxDocument} from 'rxdb';
⋮----
/**
 * This model is used to store the Ajf report schemas.
 * @title ReportSchema
 */
export interface ReportSchema extends Model {
  /**
   * The report schema name.
   */
  name: string;

  /**
   * List of Form Schemas (by id) from where to fetch the necessary
   * data to build and display the report.
   */
  form_schema_ids: string[];

  /**
   * The names of the Metric types required for this schema.
   */
  required_metrics?: string[];

  /**
   * The report schema displayed label.
   */
  label?: string;

  /**
   * The report schema icon identifier.
   */
  icon?: string;

  /**
   * JSON definition of the Ajf report schema.
   * It must be valid against the [non-scrict
   * version](https://ajf.rocks/schemas/ajf-report-schema.json).
   * @asType object
   */
  schema: Partial<AjfReport>;
}
⋮----
/**
   * The report schema name.
   */
⋮----
/**
   * List of Form Schemas (by id) from where to fetch the necessary
   * data to build and display the report.
   */
⋮----
/**
   * The names of the Metric types required for this schema.
   */
⋮----
/**
   * The report schema displayed label.
   */
⋮----
/**
   * The report schema icon identifier.
   */
⋮----
/**
   * JSON definition of the Ajf report schema.
   * It must be valid against the [non-scrict
   * version](https://ajf.rocks/schemas/ajf-report-schema.json).
   * @asType object
   */
```

## File: reports/src/reports.module.ts
```typescript
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
⋮----
import {NgModule} from '@angular/core';
⋮----
export class ReportsModule
```

## File: reports/index.ts
```typescript
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
```

## File: reports/ng-package.json
```json
{}
```

## File: reports/reports.md
```markdown
The `@dino/core/reports` module provides the interfaces for Report Schema and Report Data of [Ajf reports](https://rxdb.info), as well as
data managers for both.

The Report Schema Manager exposes a method for generating filters from a Report Schema.
```

## File: src/public-api.ts
```typescript
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
```

## File: src/test.ts
```typescript
// This file is required by karma.conf.js and loads recursively all the .spec and framework files
⋮----
import {getTestBed} from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
⋮----
// First, initialize the Angular testing environment.
```

## File: src/version.ts
```typescript
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
⋮----
import {Version} from '@angular/core';
⋮----
/** Current version of Dino. */
```

## File: sync/src/public_api.ts
```typescript
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
```

## File: sync/src/sync-manager.ts
```typescript
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
⋮----
import {Injectable, isDevMode, Optional} from '@angular/core';
import {
  FormDataManager,
  FormSchemaDepsManager,
  FormSchemaManager,
  FormStatusManager,
} from '@dino/core/forms';
import {ReportDataManager, ReportSchemaManager} from '@dino/core/reports';
import {UserDataManager, UserGroupManager, UserRoleManager} from '@dino/core/users';
import {AreaManager} from '@dino/core/areas';
import {CaseManager} from '@dino/core/cases';
import {LocationManager} from '@dino/core/locations';
import {OrganizationManager} from '@dino/core/organizations';
import {ProjectManager} from '@dino/core/projects';
import {SyncModule} from './sync.module';
import {combineLatest, Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {LangManager} from '@dino/core/langs';
import {DataModelManager} from '@dino/core/data';
import {NotificationManager} from '@dino/core/notifications';
import {LogManager} from '@dino/core/logs';
⋮----
/**
 * Service that manages the Initialization of rxCollections
 */
⋮----
export class SyncManager
⋮----
/**
   * All the data managers
   */
⋮----
/**
   * Array of manager initalizations
   */
⋮----
/**
   * Array of contextual managers initalizations
   */
⋮----
constructor(
    private _fst: FormStatusManager,
    private _fd: FormDataManager,
    private _fs: FormSchemaManager,
    private _fsdeps: FormSchemaDepsManager,
    private _rs: ReportSchemaManager,
    private _um: UserDataManager,
    private _ur: UserRoleManager,
    private _ug: UserGroupManager,
    private _lm: LangManager,
    private _ntm: NotificationManager,
    private _rd: ReportDataManager,
    @Optional() private _ar: AreaManager | null,
    @Optional() private _cs: CaseManager | null,
    @Optional() private _pj: ProjectManager | null,
    @Optional() private _lc: LocationManager | null,
    @Optional() private _og: OrganizationManager | null,
    @Optional() private _logm: LogManager | null,
)
⋮----
/**
   * Initializes all collections without a context
   *
   * @returns An observable of all managers initializations
   */
initializeMainCollections(): Observable<boolean[]>
⋮----
/**
   * Initializes all collections that need a full context
   *
   * @returns An observable of all managers initializations
   */
initializeContextualCollections(): Observable<boolean[]>
```

## File: sync/src/sync.module.ts
```typescript
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
⋮----
import {NgModule} from '@angular/core';
⋮----
/**
 * Module that provides a Sync Service
 */
⋮----
export class SyncModule
```

## File: sync/index.ts
```typescript
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
```

## File: sync/ng-package.json
```json
{}
```

## File: sync/sync.md
```markdown
The `@dino/core/sync` module provides a SyncManager, assigned with the task of creating and syncing rxCollections
```

## File: translations/src/ar.ts
```typescript
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
import {Translation} from '@ajf/core/transloco';
// tslint:disable:max-line-length
```

## File: translations/src/eng.ts
```typescript
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
import {Translation} from '@ajf/core/transloco';
// tslint:disable:max-line-length
```

## File: translations/src/esp.ts
```typescript
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
import {Translation} from '@ajf/core/transloco';
// tslint:disable:max-line-length
```

## File: translations/src/fra.ts
```typescript
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
import {Translation} from '@ajf/core/transloco';
// tslint:disable:max-line-length
```

## File: translations/src/ita.ts
```typescript
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
import {Translation} from '@ajf/core/transloco';
// tslint:disable:max-line-length
```

## File: translations/src/prt.ts
```typescript
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
import {Translation} from '@ajf/core/transloco';
// tslint:disable:max-line-length
```

## File: translations/src/public_api.ts
```typescript
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
```

## File: translations/src/translations-config.ts
```typescript
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
⋮----
import {InjectionToken} from '@angular/core';
⋮----
/**
 * Translations configuration
 */
export interface TranslationsConfig {
  /**
   * The default language
   */
  defaultLanguage: string;
}
⋮----
/**
   * The default language
   */
```

## File: translations/src/translations-module.ts
```typescript
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
import {TranslocoService} from '@ajf/core/transloco';
import {registerLocaleData} from '@angular/common';
import enLocale from '@angular/common/locales/en';
import esLocale from '@angular/common/locales/es';
import frLocale from '@angular/common/locales/fr';
import itLocale from '@angular/common/locales/it';
import prLocale from '@angular/common/locales/pt';
import arLocale from '@angular/common/locales/ar';
import ukLocale from '@angular/common/locales/uk';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {dinoTranslations} from './translations';
import {TranslationsConfig, TRANSLATIONS_CONFIG} from './translations-config';
⋮----
export class DinoTranslationsModule
⋮----
constructor(ts: TranslocoService)
static forRoot(config?: TranslationsConfig): ModuleWithProviders<DinoTranslationsModule>
```

## File: translations/src/translations.ts
```typescript
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
⋮----
import {Translation} from '@ajf/core/transloco';
import {ENG} from './eng';
import {ESP} from './esp';
import {FRA} from './fra';
import {ITA} from './ita';
import {PRT} from './prt';
import {UGA} from './uga';
import {AR} from './ar';
import {UKR} from './ukr';
```

## File: translations/src/uga.ts
```typescript
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
import {Translation} from '@ajf/core/transloco';
// tslint:disable:max-line-length
```

## File: translations/src/ukr.ts
```typescript
/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
⋮----
import {Translation} from '@ngneat/transloco';
```

## File: translations/index.ts
```typescript
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
```

## File: translations/ng-package.json
```json
{}
```

## File: translations/translations.md
```markdown
The `@dino/core/translations` module provides the user interface translations for [ENG],[ESP],[ITA],[FRA],[PRT].

Just import [DinoTranslationsModule.forRoot()] in the app module dino's translations will be added to ajf's.
```

## File: users/src/admin.guard.ts
```typescript
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
⋮----
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {UserGroupManager} from './user-group-manager';
⋮----
/**
 * A route guard that grants authorized access to a route,
 * checking if the user has a valid auth and/or refresh JWT token.
 * If the user does not, it redirects to the login component.
 */
⋮----
export class AdminGuard
⋮----
constructor(private _router: Router, private _userGroupManager: UserGroupManager)
⋮----
canActivate(
    next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
```

## File: users/src/online-user-data-manager.ts
```typescript
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
⋮----
import {Injectable, EventEmitter} from '@angular/core';
import {
  ActionTrigger,
  OnlineDataModelManager,
  OnlineDataService,
  PermissionContextService,
} from '@dino/core/data';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
⋮----
import {migrationStrategies, UserData} from './user-data';
import {schema} from './user-data-json';
⋮----
/**
 * Service that manages User Data
 */
⋮----
export class OnlineUserDataManager extends OnlineDataModelManager<UserData>
⋮----
/**
   * Event emitted as an Action hook
   */
⋮----
constructor(dataService: OnlineDataService, permissionContextService: PermissionContextService)
⋮----
/**
   * Gets the default Dino Anonymous User userData.
   * @returns The anonymous user userData
   */
getDefaultAnonymousUser(): Observable<UserData | null>
```

## File: users/src/public_api.ts
```typescript
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
```

## File: users/src/user-admin-check-permissions.ts
```typescript
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
⋮----
import {Permission, CanViewData, CanDeleteData, CanModifyData} from '@dino/core/data';
import {AuthService} from '@dino/core/auth';
import {UserData} from './user-data';
import {UserGroup} from './user-group';
⋮----
/**
 * Permission that forbids the Active user account to perform operations on itself.
 * (Usually the Admin, which is the only one having access to the Users section).
 */
export class UserSelfExclude implements Permission<UserData>
⋮----
constructor(private _authService: AuthService)
⋮----
canDelete(data: CanDeleteData<UserData>): boolean
/**
   * Makes sure the UserData does not correspond to the Active user data.
   * @param data The UserData to be checked
   * @returns True if the data does NOT correspond.
   */
private _checkSelf(
    data: CanViewData<UserData> | CanModifyData<UserData> | CanDeleteData<UserData>,
): boolean
⋮----
/**
 * Permission that forbids the modification of the default Admin user group.
 */
export class AdminGroupExclude implements Permission<UserGroup>
⋮----
canModify(data: CanModifyData<UserGroup>): boolean
canDelete(data: CanDeleteData<UserGroup>): boolean
```

## File: users/src/user-data-json.ts
```typescript
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
⋮----
import {RxJsonSchema} from 'rxdb';
⋮----
import {UserData} from './user-data';
⋮----
// tslint:disable
```

## File: users/src/user-data-manager.ts
```typescript
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
⋮----
import {Injectable, EventEmitter} from '@angular/core';
import {AuthService} from '@dino/core/auth';
import {
  ActionTrigger,
  ActionTriggerData,
  DataModelManager,
  DataService,
  PermissionContextService,
} from '@dino/core/data';
import {Observable, of as obsOf} from 'rxjs';
import {delay, map, retryWhen, shareReplay, skipWhile, switchMap, take, tap} from 'rxjs/operators';
⋮----
import {migrationStrategies, UserData} from './user-data';
import {schema} from './user-data-json';
import {UserSelfExclude} from './user-admin-check-permissions';
⋮----
/**
 * Service that manages User Data
 */
⋮----
export class UserDataManager extends DataModelManager<UserData>
⋮----
/**
   * Event emitted as an Action hook
   */
⋮----
constructor(
    private _authService: AuthService,
    dataService: DataService,
    permissionContextService: PermissionContextService,
)
⋮----
/**
   * Gets the UserData of the active user.
   * @returns The user data
   */
getActiveUserData(): Observable<UserData | null>
```

## File: users/src/user-data.ts
```typescript
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
import {User} from '@dino/core/auth';
import {Model} from '@dino/core/data';
import {MigrationStrategies, RxDocument} from 'rxdb';
⋮----
/**
 * This model is used to store Users.
 * @title UserData
 */
export interface UserData extends Omit<User<{}>, 'id'>, Model {
  /**
   * The User fullname.
   */
  full_name: string;

  /**
   * The Permission Groups (by ID) associated with the User.
   */
  user_group_ids: string[];

  /**
   * The UUID of the authenticated user on the authentication server.
   */
  user_auth_ref_id: string | null;

  /**
   * If true, the user authentication is temporarily Disabled
   */
  disabled?: boolean;
}
⋮----
/**
   * The User fullname.
   */
⋮----
/**
   * The Permission Groups (by ID) associated with the User.
   */
⋮----
/**
   * The UUID of the authenticated user on the authentication server.
   */
⋮----
/**
   * If true, the user authentication is temporarily Disabled
   */
```

## File: users/src/user-group-json.ts
```typescript
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
⋮----
import {RxJsonSchema} from 'rxdb';
⋮----
import {UserGroup} from './user-group';
⋮----
// tslint:disable
```

## File: users/src/user-group-manager.ts
```typescript
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
⋮----
import {Injectable, isDevMode} from '@angular/core';
import {
  DataModelManager,
  DataQueryOptions,
  DataService,
  MetricsService,
  PermissionContextService,
} from '@dino/core/data';
import {RxDocument} from 'rxdb';
import {forkJoin, from, Observable, of as obsOf} from 'rxjs';
import {delay, filter, map, retryWhen, shareReplay, switchMap, take, tap} from 'rxjs/operators';
⋮----
import {migrationStrategies, UserGroup} from './user-group';
import {schema} from './user-group-json';
import {UserData} from './user-data';
import {UserDataManager} from './user-data-manager';
import {UserRole} from './user-role';
import {AdminGroupExclude} from './user-admin-check-permissions';
⋮----
/**
 * Service that manages User Groups
 */
⋮----
export class UserGroupManager extends DataModelManager<UserGroup>
⋮----
constructor(
    private _userModelManager: UserDataManager,
    private _metricService: MetricsService,
    dataService: DataService,
    permissionContextService: PermissionContextService,
)
⋮----
/**
   * Gets the Permission Groups associated with the active user.
   * @returns The associated Groups
   */
getActiveUserGroups(): Observable<RxDocument<UserGroup>[]>
⋮----
/**
   * Gets the Users belonging to a list of groups
   * @param userGroupsIds
   * @returns The users
   */
getUsersByGroups(userGroupsIds: string[]): Observable<RxDocument<UserData>[]>
⋮----
/**
   * Return a list of groups with the specified metric or 'all' value
   * @param metricType the required metric type (i.e. location)
   * @param metricId the required metric id
   * @returns The list of groups with the specified metric
   */
getGroupsByMetric(metricType: string, metricId: string): Observable<RxDocument<UserGroup>[]>
⋮----
/**
   * Gets the Users belonging to a list of groups, using group names
   * @param userGroupNames the list of group names to which the user must belong
   * @returns the list of users
   */
getUsersByGroupNames(userGroupNames: string[]): Observable<RxDocument<UserData,
⋮----
/**
   * Gets the users belonging to a list of groups, using group names.
   * Each group must include the specified metric
   * @param userGroupNames the list of group names to which the user must belong
   * @param metricType the required metric type (i.e. location)
   * @param metricId the required metric id
   * @returns the list of users
   */
getUsersByGroupNamesAndMetric(
    userGroupNames: string[],
    metricType: string,
    metricId: string,
): Observable<RxDocument<UserData,
⋮----
/**
   * Gets the User Groups details
   * @param userDatas the users list
   * @returns A list of tuple with the user and his groups
   */
getUserGroups(
    userDatas: RxDocument<UserData, {}>[],
): Observable<[RxDocument<UserGroup,
⋮----
/**
   * Gets the Permissions associated with the active user.
   * @returns The permissions of the active user
   */
getActiveUserPermissions(): Observable<
⋮----
/**
   * Checks if the active user is an Admin
   * @param roles The roles granting admin permissions
   * @returns true if the active user is an Admin
   */
isActiveUserAdmin(roles: string[] = ['admin']): Observable<boolean>
⋮----
/**
   * Gets the available metrics of the specified type from the Permission Groups associated
   * with the active user
   * @param metricType The string type of the Metric (eg. 'area', 'organization'...)
   * @returns The available Metrics of the Groups.
   */
getGroupsMetricsByType(metricType: string): Observable<string[]>
⋮----
/**
   * Gets the available metrics from the Permission Groups associated
   * with the active user.
   * @returns The available Metrics of the Groups.
   */
getGroupsAllMetrics(): Observable<
⋮----
/**
   * Returns true if the Form/Report Schema id is used by any User Group
   * @param schemaId The id of the Form/Report Schema
   */
isUsedByAnyGroup(schemaId: string): Observable<boolean>
```

## File: users/src/user-group.ts
```typescript
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
⋮----
import {Model} from '@dino/core/data';
import {MigrationStrategies, RxDocument} from 'rxdb';
⋮----
/**
 * This model is used to store UserGroups.
 * @title UserGroup
 */
export interface UserGroup extends Model {
  /**
   * The Name identifier for the User Group
   */
  groupName: string;

  /**
   * The Role (by ID) granted by the User Group
   */
  user_role_ref_id: string;

  /**
   * The Areas to which the User Group Role permissions apply
   */
  area_ref_id: string[];

  /**
   * The Cases to which the User Group Role permissions apply
   */
  case_ref_id: string[];

  /**
   * The Locations to which the User Group Role permissions apply
   */
  location_ref_id: string[];

  /**
   * The Organizations to which the User Group Role permissions apply
   */
  organization_ref_id: string[];

  /**
   * The Projects to which the User Group Role permissions apply
   */
  project_ref_id: string[];

  /**
   * The Statuses to which the User Group Role permissions apply associated with the Form
   */
  form_status_ref_id: string[];

  /**
   * The specific Form Schemas (by ID) to which the User Group Role permissions apply.
   */
  groupFormSchemaIds: string[];

  /**
   * The specific Report Schemas (by ID) to which the User Group Role permissions apply.
   */
  groupReportSchemaIds: string[];
}
⋮----
/**
   * The Name identifier for the User Group
   */
⋮----
/**
   * The Role (by ID) granted by the User Group
   */
⋮----
/**
   * The Areas to which the User Group Role permissions apply
   */
⋮----
/**
   * The Cases to which the User Group Role permissions apply
   */
⋮----
/**
   * The Locations to which the User Group Role permissions apply
   */
⋮----
/**
   * The Organizations to which the User Group Role permissions apply
   */
⋮----
/**
   * The Projects to which the User Group Role permissions apply
   */
⋮----
/**
   * The Statuses to which the User Group Role permissions apply associated with the Form
   */
⋮----
/**
   * The specific Form Schemas (by ID) to which the User Group Role permissions apply.
   */
⋮----
/**
   * The specific Report Schemas (by ID) to which the User Group Role permissions apply.
   */
```

## File: users/src/user-role-json.ts
```typescript
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
⋮----
import {RxJsonSchema} from 'rxdb';
⋮----
import {UserRole} from './user-role';
⋮----
// tslint:disable
```

## File: users/src/user-role-manager.ts
```typescript
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
⋮----
import {Injectable} from '@angular/core';
import {DataModelManager, DataService, PermissionContextService} from '@dino/core/data';
⋮----
import {migrationStrategies, UserRole} from './user-role';
import {schema} from './user-role-json';
⋮----
/**
 * Service that manages User Roles
 */
⋮----
export class UserRoleManager extends DataModelManager<UserRole>
⋮----
constructor(dataService: DataService, permissionContextService: PermissionContextService)
```

## File: users/src/user-role.ts
```typescript
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
⋮----
import {Model} from '@dino/core/data';
import {MigrationStrategies} from 'rxdb';
⋮----
/**
 * Represents an action to be performed on a model Doc.
 */
export type ModelAction = 'create' | 'edit' | 'delete' | 'view' | 'export';
⋮----
/**
 * Represents the available Model Actions for a given Model.
 */
export type ModelPermissions = {
  [modelName: string]: ModelAction[];
};
⋮----
/**
 * This model is used to store UserRoles.
 * @title UserRole
 */
export interface UserRole extends Model {
  /**
   * The Name identifier for the User Role
   */
  roleName: string;

  /**
   * The actions allowed for the User Role
   */
  rolePermissions: ModelPermissions;
}
⋮----
/**
   * The Name identifier for the User Role
   */
⋮----
/**
   * The actions allowed for the User Role
   */
```

## File: users/src/users.module.ts
```typescript
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
⋮----
import {NgModule} from '@angular/core';
⋮----
/**
 * Module that provides tools for creating and managing Users, UserGroups and UserRoles
 */
⋮----
export class UsersModule
⋮----
constructor()
```

## File: users/src/users.spec.ts
```typescript
import {EventEmitter} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig, User} from '@dino/core/auth';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from '@dino/core/data';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';
import {RxDocument} from 'rxdb';
import {firstValueFrom, of as obsOf} from 'rxjs';
import {take} from 'rxjs/operators';
⋮----
import {UserGroupManager, UserDataManager, UsersModule} from './public_api';
import {UserData} from './user-data';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
⋮----
function dataServiceConfig(): DataServiceConfig
```

## File: users/index.ts
```typescript
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
```

## File: users/ng-package.json
```json
{}
```

## File: users/users.md
```markdown
The `@dino/core/users` module provides the interface for the User Group model, and a Data Manager for User Groups.
Allows the creation, editing and management of User Groups, entities that define which objects an associated User 
can create, modify, view and delete.
```

## File: index.ts
```typescript
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
```

## File: karma.conf.js
```javascript
// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
⋮----
// you can add configuration options for Jasmine here
// the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
// for example, you can disable the random execution with `random: false`
// or set a specific seed with `seed: 4321`
⋮----
clearContext: false, // leave Jasmine Spec Runner output visible in browser
⋮----
suppressAll: true, // removes the duplicated traces
```

## File: ng-package.json
```json
{
  "$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
  "dest": "../../dist/core",
  "lib": {
    "entryFile": "src/public-api.ts"
  }
}
```

## File: README.md
```markdown

```

## File: tsconfig.lib.json
```json
/* To learn more about this file see: https://angular.io/config/tsconfig. */
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "../../out-tsc/core",
    "declaration": true,
    "declarationMap": true,
    "inlineSources": true,
    "types": ["echarts"],
    "paths": {
      "@dino/core": ["../../dist/core"],
      "@dino/core/*": ["../../dist/core/*"],
      "assert": ["../../node_modules/assert"],
      "stream": ["../../node_modules/stream-browserify"]
    }
  },
  "exclude": [
    "src/test.ts",
    "**/*.spec.ts"
  ]
}
```

## File: tsconfig.lib.prod.json
```json
/* To learn more about this file see: https://angular.io/config/tsconfig. */
{
  "extends": "./tsconfig.lib.json",
  "compilerOptions": {
    "declarationMap": false
  },
  "angularCompilerOptions": {
    "compilationMode": "partial"
  }
}
```

## File: tsconfig.spec.json
```json
/* To learn more about this file see: https://angular.io/config/tsconfig. */
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "../../out-tsc/core-spec",
    "types": [
      "echarts",
      "jasmine"
    ],
    "paths": {
      "@dino/core": ["."],
      "@dino/core/*": ["./*"],
      "assert": ["../../node_modules/assert"],
      "stream": ["../../node_modules/stream-browserify"]
    }
  },
  "files": [
    "src/test.ts"
  ],
  "include": [
    "**/*.spec.ts",
    "**/*.d.ts"
  ],
  "exclude": [
    "cypress/**/*.ts"
  ]
}
```

## File: eslint.config.js
```javascript
// @ts-check
⋮----
// Allows us to use the typed utility for our config
⋮----
// Require our workspace root level config and extend from it
⋮----
// Apply the root config first
⋮----
// Any project level overrides or additional rules for TypeScript files can go here
// (we don't need to extend from any typescript-eslint or angular-eslint configs because
// we already applied the rootConfig above which has them)
⋮----
// Any project level overrides or additional rules for HTML files can go here
// (we don't need to extend from any angular-eslint configs because
// we already applied the rootConfig above which has them)
```

## File: cypress/tsconfig.json
```json
{
  "extends": "../../../tsconfig.json",
  "include": ["**/*.ts"],
  "compilerOptions": {
    "sourceMap": false,
    "types": ["cypress"]
  }
}
```

## File: cypress.config.ts
```typescript
import {defineConfig} from 'cypress';
⋮----
setupNodeEvents(on, config)
```

## File: package.json
```json
{
  "name": "@dino/core",
  "version": "0.0.0-PLACEHOLDER",
  "description": "",
  "repository": {
    "type": "git",
    "url": "https://bitbucket.org/gnucoop/dino.git"
  },
  "keywords": [],
  "license": "AGPL-3.0-or-later",
  "homepage": "https://bitbucket.org/gnucoop/dino#readme",
  "peerDependencies": {
    "@ajf/core": "0.0.0-AJF",
    "@angular/common": "0.0.0-NGF",
    "@angular/core": "0.0.0-NGF",
    "@angular/forms": "0.0.0-NGF",
    "@angular/router": "0.0.0-NGF",
    "@apollo/client": "0.0.0-APOLLOCLIENT",
    "apollo-angular": "0.0.0-APOLLONG",
    "assert": "0.0.0-ASSERT",
    "process": "0.0.0-PROCESS",
    "rxdb": "0.0.0-RXDB",
    "rxjs": "0.0.0-RXJS",
    "stream-browserify": "0.0.0-STREAM",
    "graphql-ws": "0.0.0-GWS",
    "uuid": "0.0.0-UUID"
  },
  "dependencies": {
    "tslib": "^2.3.0"
  }
}
```