import {provideHttpClientTesting} from '@angular/common/http/testing';
import {EventEmitter} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {DATA_SERVICE_CONFIG, DataServiceConfig, PermissionContextService} from '@dino/core/data';
import {FormSchemaManager, FormsModule} from '@dino/core/forms';
import {ReportsModule} from '@dino/core/reports';
import {DinoTranslationsModule} from '@dino/core/translations';
import {UsersModule} from '@dino/core/users';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';
import {NEVER, BehaviorSubject, of} from 'rxjs';

import {Collect, CollectModule} from './public_api';
import {UI_TOUR_SERVICE_CONFIG} from '@dino/material/ui-tour-service';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideRouter} from '@angular/router';

let testDbIdx = 0;

function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dino_datamanager_test_db_${testDbIdx++}`,
      storage: getRxStorageMemory(),
    },
    syncOptions: {
      collection: null,
      replicationIdentifier: 'test-replication',
      url: {http: 'host'},
    },
  };
}

const authServiceConfig: AuthServiceConfig = {
  host: 'http://test-auth-backend',
  applicationId: 'applicationId',
  apiKey: 'apiKey',
  retryRefreshTime: 5000,
  retryAttemptsMax: 1,
  failedAuthRedirect: 'login',
};

const authServiceMock = {
  authenticated: of({auth: true, evt: 'init'}),
  authToken: of('test_auth_token'),
  // Never resumes in tests: this is not a foregrounded browser tab.
  appResumed: NEVER,
  getUserInfo: () => {
    return {};
  },
  resetEvt: of(false),
  logout: () => of(false),
  logoutEvt: new EventEmitter<void>(),
  _authConfig: new BehaviorSubject<AuthServiceConfig>(authServiceConfig),
  authConfig: authServiceConfig,
} as unknown as AuthService;

const formSchemaManagerMock = {
  list: () => {
    return of([
      {
        id: '',
        name: 'form1',
        label: '2. First form',
        icon: 'star',
        schema: {},
        collection: {name: ''},
        created_at: '',
        updated_at: '',
      },
      {
        id: '',
        name: 'form2',
        label: '1. Second form',
        icon: 'star',
        schema: {},
        collection: {name: ''},
        created_at: '',
        updated_at: '',
      },
    ]);
  },
};

const pcsMock = {
  permissionContext: of({}),
  fullContext: of({}),
  checkPermission: () => true,
  getAllowedActions: () => of([]),
};

describe('Collect', () => {
  let fsm: FormSchemaManager;
  let fixtureCollect: ComponentFixture<Collect>;
  let collect: Collect;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CollectModule, DinoTranslationsModule, ReportsModule, FormsModule, UsersModule],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
        {provide: FormSchemaManager, useValue: formSchemaManagerMock},
        {provide: PermissionContextService, useValue: pcsMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {provide: UI_TOUR_SERVICE_CONFIG, useValue: undefined},
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    fsm = TestBed.inject(FormSchemaManager);
    fixtureCollect = TestBed.createComponent(Collect);
    collect = fixtureCollect.componentInstance;
  });

  it('should create the component', async () => {
    await fixtureCollect.whenStable();
    fixtureCollect.detectChanges();

    expect(collect).toBeTruthy();
    expect(fsm).toBeTruthy();
  });

  it('should search for all Form Schemas', async () => {
    let collectTypeSpy = spyOn(fsm, 'list').and.callThrough();

    await fixtureCollect.whenStable();
    fixtureCollect.detectChanges();
    collect.collectType = 'forms';

    await fixtureCollect.whenStable();
    fixtureCollect.detectChanges();

    expect(collectTypeSpy).toHaveBeenCalled();
  });

  it('should sort items', async () => {
    collect.collectType = 'forms';

    fixtureCollect.detectChanges();
    await fixtureCollect.whenStable();

    const el = fixtureCollect.nativeElement as HTMLElement;
    let tiles = el.getElementsByClassName('dino-grid-label');
    expect(tiles.length).toBe(2);
    expect(tiles[0].innerHTML).toContain('2.');
    expect(tiles[1].innerHTML).toContain('1.');

    collect.sortBy = 'label';

    fixtureCollect.detectChanges();
    await fixtureCollect.whenStable();
    tiles = el.getElementsByClassName('dino-grid-label');
    expect(tiles[0].innerHTML).toContain('1.');
    expect(tiles[1].innerHTML).toContain('2.');
  });

  it('should filter items based on keyword', async () => {
    collect.collectType = 'forms';

    fixtureCollect.detectChanges();
    await fixtureCollect.whenStable();

    const el = fixtureCollect.nativeElement as HTMLElement;
    let tiles = el.getElementsByClassName('dino-grid-label');
    expect(tiles.length).toBe(2);

    collect.filterCtrl.setValue('RST');
    await new Promise<void>(resolve => {
      setTimeout(() => resolve(), 200);
    });

    fixtureCollect.detectChanges();
    await fixtureCollect.whenStable();

    tiles = el.getElementsByClassName('dino-grid-label');
    expect(tiles.length).toBe(1);
    expect(tiles[0].innerHTML).toContain('First');

    collect.filterCtrl.setValue('oNd');
    await new Promise<void>(resolve => {
      setTimeout(() => resolve(), 200);
    });

    fixtureCollect.detectChanges();
    await fixtureCollect.whenStable();

    tiles = el.getElementsByClassName('dino-grid-label');
    expect(tiles.length).toBe(1);
    expect(tiles[0].innerHTML).toContain('Second');
  });
});
