import {EventEmitter} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {FilterItem, FiltersService, ListModule} from '@dino/core/list';
import {
  SearchFiltersPresetManager,
  SearchFiltersPresetManagerModule,
} from '@dino/material/search-filters-preset-manager';
import {BehaviorSubject, firstValueFrom, of as obsOf, of} from 'rxjs';

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
  logoutEvt: new EventEmitter<void>(),
  _authConfig: new BehaviorSubject<AuthServiceConfig>(authServiceConfig),
  authConfig: authServiceConfig,
} as unknown as AuthService;

const fakeFilters: FilterItem[] = [
  {name: 'filter_a', value: 'test'},
  {name: 'filter_b', value: 15},
  {name: 'filter_c', value: false},
];

const fakeFiltersPreset = btoa(encodeURI(JSON.stringify(fakeFilters)));

const fakeActivatedRoute = {
  queryParams: obsOf({'filters': fakeFiltersPreset}),
} as unknown as ActivatedRoute;

describe('Search filters Bar', () => {
  let fts: FiltersService;
  let fixturePresetManager: ComponentFixture<SearchFiltersPresetManager>;
  let presetManager: SearchFiltersPresetManager;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ListModule,
        NoopAnimationsModule,
        RouterTestingModule,
        SearchFiltersPresetManagerModule,
      ],
      providers: [
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        {provide: AuthService, useValue: authServiceMock},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
      ],
    }).compileComponents();

    fts = TestBed.inject(FiltersService);
    fixturePresetManager = TestBed.createComponent(SearchFiltersPresetManager);
    presetManager = fixturePresetManager.componentInstance;
  });

  it('should create the component', () => {
    fixturePresetManager.detectChanges();

    expect(presetManager).toBeTruthy();
    expect(fts).toBeTruthy();
  });

  it('should load the preset data on init', async () => {
    fixturePresetManager.detectChanges();

    const presetData = await firstValueFrom(presetManager.presetData);
    expect(presetData).not.toBeNull();
    expect(presetData).toEqual(fakeFiltersPreset);
  });

  it('should save a preset in the localStorage', () => {
    fixturePresetManager.detectChanges();
    const spySetItem = spyOn(Storage.prototype, 'setItem').and.callThrough();

    presetManager.presetControl.setValue('test_preset');
    presetManager.savePreset();
    const item = localStorage.getItem('filters_preset_test_preset');

    expect(spySetItem).toHaveBeenCalled();
    expect(item).toEqual(fakeFiltersPreset);
  });

  it('should NOT save a nameless preset in the localStorage', () => {
    fixturePresetManager.detectChanges();
    const spySetItem = spyOn(Storage.prototype, 'setItem').and.callThrough();

    presetManager.presetControl.setValue('');
    presetManager.savePreset();

    expect(spySetItem).not.toHaveBeenCalled();
  });

  it('should retrieve a preset from the localStorage and ask the FilterService to load it', () => {
    fixturePresetManager.detectChanges();
    const spyGetItem = spyOn(Storage.prototype, 'getItem').and.callThrough();
    const spyFtsLoad = spyOn(fts, 'loadPreset').and.callThrough();

    presetManager.presetControl.setValue('test_preset');
    presetManager.savePreset();

    presetManager.loadPreset();

    expect(spyGetItem).toHaveBeenCalled();
    expect(spyGetItem).toHaveBeenCalledWith('filters_preset_test_preset');
    expect(spyFtsLoad).toHaveBeenCalled();
    expect(spyFtsLoad).toHaveBeenCalledWith(fakeFiltersPreset);
  });

  it('should NOT try to retrieve a non existing preset', () => {
    fixturePresetManager.detectChanges();
    const spyGetItem = spyOn(Storage.prototype, 'getItem').and.callThrough();
    const spyFtsLoad = spyOn(fts, 'loadPreset').and.callThrough();

    presetManager.presetControl.setValue('test_preset');
    presetManager.savePreset();
    presetManager.presetControl.setValue('test_wrong_preset');
    presetManager.loadPreset();

    expect(spyGetItem).not.toHaveBeenCalled();
    expect(spyFtsLoad).not.toHaveBeenCalled();
  });
});
