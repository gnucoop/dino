import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDialogModule} from '@angular/material/dialog';
import {FilterGroup, FiltersService, SearchFiltersComponent} from '@dewco/core/list';
import {Observable, of as obsOf} from 'rxjs';
import {SelectionList} from './list';
import {ListDataSource} from './list-datasource';
import {ListModule} from './list.module';
import {AdminUserInteractionsService} from './user-interactions.service';

class AUIServiceStub {
  askConfirm(): Observable<boolean> {
    return obsOf(true);
  }
}

class FiltersServiceStub {
  availableBasicFilterLabels: string[] = ['testFilter', 'otherFilter'];

  set setCustomFilters(fg: FilterGroup[]) {}
  loadPreset() {}
  addBasicFilter(): void {}
}

class SearchFiltersComponentStub {}

describe('List', () => {
  let fixtureList: ComponentFixture<SelectionList>;
  let ftComponent: SearchFiltersComponentStub;
  let list: SelectionList;
  let filterService: FiltersService;
  beforeEach(() => {
    TestBed
        .configureTestingModule({
          imports: [
            ListModule,
            MatDialogModule,
          ],
          providers: [
            {provide: AdminUserInteractionsService, useClass: AUIServiceStub},
            {provide: FiltersService, useClass: FiltersServiceStub},
          ],
        })
        .compileComponents();
    filterService = TestBed.inject(FiltersService);
    ftComponent = new SearchFiltersComponentStub();
    fixtureList = TestBed.createComponent<SelectionList>(SelectionList);
    list = fixtureList.componentInstance;
  });

  it('should create a List component and load a default empty filter preset', async () => {
    const spyLoadPreset = spyOn(filterService, 'loadPreset').and.callThrough();
    const spyFillDataSource = spyOn<any>(list, '_fillDataSource').and.callThrough();

    await fixtureList.whenStable();
    list.dataSource = [] as unknown as ListDataSource;
    list.dataSource.disconnect = () => {};
    fixtureList.detectChanges();

    expect(list).toBeDefined();
    expect(spyLoadPreset).toHaveBeenCalledTimes(1);
    expect(spyFillDataSource).toHaveBeenCalledTimes(1);
  });

  it('should assign a SearchFiltersComponent and correctly initalize the list', async () => {
    const spyInitList = spyOn<any>(list, '_initList').and.callThrough();

    await fixtureList.whenStable();
    list.dataSource = [] as unknown as ListDataSource;
    list.filtersComponent = ftComponent as unknown as SearchFiltersComponent;
    list.dataSource.disconnect = () => {};
    fixtureList.detectChanges();

    expect(spyInitList).toHaveBeenCalledTimes(1);
  });

  it('should add a basic filter to the FiltersService basic filters list', async () => {
    const spyAddBasic = spyOn(filterService, 'addBasicFilter').and.callThrough();

    await fixtureList.whenStable();
    list.dataSource = [] as unknown as ListDataSource;
    list.dataSource.disconnect = () => {};
    fixtureList.detectChanges();

    list.additionalBasicFilters = ['testFilter', 'otherFilter', 'nopeFilter'];

    expect(spyAddBasic).toHaveBeenCalledTimes(2);
  });
});
