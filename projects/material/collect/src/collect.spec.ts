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
import {BehaviorSubject, of} from 'rxjs';
import {map} from 'rxjs/operators';

import {ALL_GROUPS_CHIP, Collect, CollectModule} from './public_api';
import {UI_TOUR_SERVICE_CONFIG} from '@dino/material/ui-tour-service';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideRouter} from '@angular/router';
import {BreakpointObserver} from '@angular/cdk/layout';
import {provideNoopAnimations} from '@angular/platform-browser/animations';
import {MatDialog} from '@angular/material/dialog';
import {DeleteSchema} from '@dino/material/delete-schema';

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

describe('Collect with groups', () => {
  const narrow = new BehaviorSubject<boolean>(false);
  const groupedFormsMock = {
    list: () =>
      of([
        {
          id: 'fs1',
          name: 'assessment',
          label: 'Assessment',
          icon: 'star',
          visibility: 1,
          form_schema_groups: [{name: 'Health', color: '#4fd1d9'}],
          schema: {},
          collection: {name: 'form_schema'},
          created_at: '',
          updated_at: '',
        },
        {
          id: 'fs2',
          name: 'baseline',
          label: 'Baseline',
          icon: 'star',
          visibility: 0,
          form_schema_groups: [{name: 'M&E', color: '#f2b84b'}],
          schema: {},
          collection: {name: 'form_schema'},
          created_at: '',
          updated_at: '',
        },
        {
          id: 'fs3',
          name: 'needs',
          label: 'Needs',
          icon: 'star',
          visibility: 0,
          schema: {},
          collection: {name: 'form_schema'},
          created_at: '',
          updated_at: '',
        },
      ]),
    delete: (_id: string) => of(null),
  };
  let fixture: ComponentFixture<Collect>;
  let collect: Collect;

  beforeEach(() => {
    localStorage.removeItem('dino_collect_view_forms');
    narrow.next(false);
    TestBed.configureTestingModule({
      imports: [CollectModule, DinoTranslationsModule, ReportsModule, FormsModule, UsersModule],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
        {provide: FormSchemaManager, useValue: groupedFormsMock},
        {provide: PermissionContextService, useValue: pcsMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {provide: UI_TOUR_SERVICE_CONFIG, useValue: undefined},
        {
          provide: BreakpointObserver,
          useValue: {observe: () => narrow.pipe(map(matches => ({matches, breakpoints: {}})))},
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([]),
        provideNoopAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Collect);
    collect = fixture.componentInstance;
    collect.filterBar = true;
    collect.collectType = 'forms';
  });

  afterEach(() => localStorage.removeItem('dino_collect_view_forms'));

  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  };
  // The test translations render a missing key as `en.<key>`.
  const texts = (el: HTMLElement, selector: string) =>
    Array.from(el.querySelectorAll(selector)).map(node =>
      node.textContent!.trim().replace(/^en\./, ''),
    );

  it('should render a section per group, and only the selected ones', async () => {
    let el = await render();
    expect(texts(el, '.dino-collect-section-head h2')).toEqual([
      'Health',
      'M&E',
      'Public forms',
      'Ungrouped',
    ]);

    collect.selectGroups(['health']);
    el = await render();
    expect(texts(el, '.dino-collect-section-head h2')).toEqual(['Health']);
    expect(texts(el, '.dino-grid-label')).toEqual(['Assessment']);

    collect.selectGroups([]);
    el = await render();
    expect(el.querySelectorAll('.dino-collect-section').length).toBe(4);
  });

  it('should clear the selection when the All chip is picked', () => {
    collect.selectGroups(['health']);
    collect.selectGroups(['health', ALL_GROUPS_CHIP]);
    expect(collect.selectedGroups.value).toEqual([]);
  });

  it('should offer the public link only on public forms', async () => {
    const el = await render();
    const cardsWithLink = Array.from(el.querySelectorAll('.dino-collect-card'))
      .filter(card =>
        texts(card as HTMLElement, '.dino-collect-card-bar button').some(t => t.endsWith('Link')),
      )
      .map(card => texts(card as HTMLElement, '.dino-grid-label')[0]);
    // A public form appears twice: in its own group and in the public forms.
    expect(cardsWithLink).toEqual(['Assessment', 'Assessment']);
  });

  it('should default to the list on narrow screens and remember the chosen view', async () => {
    narrow.next(true);
    let el = await render();
    expect(el.querySelectorAll('.dino-collect-row').length).toBeGreaterThan(0);
    expect(el.querySelectorAll('.dino-collect-card').length).toBe(0);

    collect.setView('grid');
    el = await render();
    expect(el.querySelectorAll('.dino-collect-card').length).toBeGreaterThan(0);
    expect(localStorage.getItem('dino_collect_view_forms')).toBe('grid');
  });

  it('should still delete through the DeleteSchema dialog', () => {
    const dialog = TestBed.inject(MatDialog);
    const open = spyOn(dialog, 'open').and.returnValue({afterClosed: () => of('fs2')} as any);
    const del = spyOn(groupedFormsMock, 'delete').and.callThrough();

    collect.openDeleteSchemaDialog('fs2');

    expect(open.calls.mostRecent().args[0]).toBe(DeleteSchema);
    expect(del).toHaveBeenCalledWith('fs2');
  });
});
