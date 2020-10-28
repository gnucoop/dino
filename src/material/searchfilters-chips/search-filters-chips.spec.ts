import {ChangeDetectorRef} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FilterItem, FiltersService} from '@dewco/core/list';
import {SearchFiltersChips} from '@dewco/material/searchfilters-chips';

const changeDetectorRefMock = {
  markForCheck() {}
};

const fakeFilter: FilterItem = {
  name: 'filter_a',
  value: 'test',
  operator: {label: 'Like', value: '$regex'}
};

describe(
    'Searchfilters Chips. Displays all active filters as MatChips, allowing their deletion', () => {
      let fts: FiltersService;
      let fixture: ComponentFixture<SearchFiltersChips>;
      let chips: SearchFiltersChips;

      beforeEach(() => {
        TestBed
            .configureTestingModule({
              declarations: [SearchFiltersChips],
              imports: [RouterTestingModule],
              providers: [
                {provide: ChangeDetectorRef, useValue: changeDetectorRefMock},
              ],
            })
            .compileComponents();
        fts = TestBed.inject(FiltersService);
        fixture = TestBed.createComponent(SearchFiltersChips);
        chips = fixture.componentInstance;
      });

      it('should emit the excludeFilter event', () => {
        const spyExcludeFilter = spyOn<any>(chips.excludeFilter, 'emit').and.callThrough();
        chips.removeFilterItem(fakeFilter);
        fixture.detectChanges();

        expect(spyExcludeFilter).toHaveBeenCalledWith(fakeFilter);
      });
    });
