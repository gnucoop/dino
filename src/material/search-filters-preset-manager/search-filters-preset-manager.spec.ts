import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {FilterItem, FiltersService} from '@dewco/core/list';
import {
  SearchFiltersPresetManager,
  SearchFiltersPresetManagerModule,
} from '@dewco/material/search-filters-preset-manager';
import {of as obsOf} from 'rxjs';

const fakeFilters: FilterItem[] = [
  {name: 'filter_a', value: 'test'},
  {name: 'filter_b', value: 15},
  {name: 'filter_c', value: false},
];

const fakeFiltersPreset = btoa(encodeURI(JSON.stringify(fakeFilters)));

const fakeActivatedRoute = {
  queryParams: obsOf({'filters': fakeFiltersPreset})
} as unknown as ActivatedRoute;

describe('Search filters Bar', () => {
  let fts: FiltersService;
  let fixturePresetManager: ComponentFixture<SearchFiltersPresetManager>;
  let presetManager: SearchFiltersPresetManager;

  beforeEach(() => {
    TestBed
        .configureTestingModule({
          imports: [
            RouterTestingModule,
            SearchFiltersPresetManagerModule,
          ],
          providers: [
            {provide: ActivatedRoute, useValue: fakeActivatedRoute},
          ],
        })
        .compileComponents();

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

    const presetData = await presetManager.presetData.toPromise();
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
