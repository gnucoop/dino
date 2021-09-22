import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDialogModule} from '@angular/material/dialog';
import {RouterTestingModule} from '@angular/router/testing';
import {BehaviorSubject, Observable, of as obsOf, of} from 'rxjs';

import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '../../core/auth';
import {FilterGroup, FiltersService, SearchFiltersComponent} from '../../core/list';

import {
  AdminUserInteractionsService,
  ListDataSource,
  ListModule,
  SelectionList,
} from './index';

const authServiceConfig: AuthServiceConfig = {
  host: 'http://test-auth-backend',
  applicationId: 'applicationId',
  apiKey: 'apiKey',
  retryRefreshTime: 5000,
  retryAttemptsMax: 1,
  failedAuthRedirect: 'login',
};

const authServiceMock = {
  authenticated: of(true),
  getUserInfo: () => {
    return {};
  },
  resetEvt: of(false),
  _authConfig: new BehaviorSubject<AuthServiceConfig>(authServiceConfig),
  authConfig: authServiceConfig,
} as unknown as AuthService;

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
  clearModelFilters() {}
  clearAdditionalBasicFilters() {}
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
            RouterTestingModule,
            MatDialogModule,
          ],
          providers: [
            {provide: AdminUserInteractionsService, useClass: AUIServiceStub},
            {provide: FiltersService, useClass: FiltersServiceStub},
            {provide: AuthService, useValue: authServiceMock},
            {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
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
