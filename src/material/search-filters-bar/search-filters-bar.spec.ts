import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {SearchFiltersBar, SearchFiltersBarModule} from '@dewco/material/search-filters-bar';

import {FilterItem, FiltersService, ListModule} from '../../core/list';

const fakeFilters: FilterItem[] = [{name: 'filter_a', value: 'test'}];

describe('Search filters Bar', () => {
  let fts: FiltersService;
  let fixtureBar: ComponentFixture<SearchFiltersBar>;
  let bar: SearchFiltersBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListModule, NoopAnimationsModule, RouterTestingModule, SearchFiltersBarModule],
    }).compileComponents();

    fts = TestBed.inject(FiltersService);
    fixtureBar = TestBed.createComponent(SearchFiltersBar);
    bar = fixtureBar.componentInstance;
  });

  it('should create the component', () => {
    fixtureBar.detectChanges();

    expect(bar).toBeTruthy();
    expect(fts).toBeTruthy();
  });

  it('should initialize the filters onInit', () => {
    const spyInitFilters = spyOn<any>(bar, '_initFilters').and.callThrough();
    const spyFtsInit = spyOn(fts, 'initializeFilters').and.callThrough();
    fixtureBar.detectChanges();

    expect(spyInitFilters).toHaveBeenCalled();
    expect(spyFtsInit).toHaveBeenCalledWith(bar.basicFilters);
  });

  it('should open a dialog and reset the temporary filters', () => {
    const spyFtsResetTemp = spyOn(fts, 'resetTemporaryFilters').and.callThrough();
    const spyOpenDialog = spyOn(bar.dialog, 'open').and.callThrough();
    fixtureBar.detectChanges();

    bar.openDialog();

    expect(spyFtsResetTemp).toHaveBeenCalled();
    expect(spyOpenDialog).toHaveBeenCalled();
  });

  it('should ask the FilterService to remove a FilterItem from a list', () => {
    fixtureBar.detectChanges();
    const spyRemoveFilter = spyOn(fts, 'removeFilter').and.callThrough();

    bar.removeFilter(fakeFilters[0], 'basic');

    expect(spyRemoveFilter).toHaveBeenCalledWith(fakeFilters[0], 'basic');
  });
});
