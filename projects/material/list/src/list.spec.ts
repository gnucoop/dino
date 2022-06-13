import {EventEmitter} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {RouterTestingModule} from '@angular/router/testing';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {FilterGroup, FiltersService, SearchFiltersComponent} from '@dino/core/list';
import {AdminUserInteractionsService} from '@dino/material/user-interactions';
import {BehaviorSubject, Observable, of as obsOf, of} from 'rxjs';

import {ListDataSource, ListModule, SelectionList} from './public_api';

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
    TestBed.configureTestingModule({
      imports: [ListModule, RouterTestingModule, MatDialogModule],
      providers: [
        {provide: AdminUserInteractionsService, useClass: AUIServiceStub},
        {provide: FiltersService, useClass: FiltersServiceStub},
        {provide: AuthService, useValue: authServiceMock},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
      ],
    }).compileComponents();
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
    list.dataSource.customSort = new BehaviorSubject<MatSort | null>(null);
    list.dataSource.customPaginator = new BehaviorSubject<MatPaginator | null>(null);
    list.dataSource.actionErrorEvt = new EventEmitter<Error>();
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
    list.dataSource.customSort = new BehaviorSubject<MatSort | null>(null);
    list.dataSource.customPaginator = new BehaviorSubject<MatPaginator | null>(null);
    list.dataSource.actionErrorEvt = new EventEmitter<Error>();
    list.filtersComponent = ftComponent as unknown as SearchFiltersComponent;
    list.dataSource.disconnect = () => {};
    fixtureList.detectChanges();

    expect(spyInitList).toHaveBeenCalledTimes(1);
  });

  it('should add a basic filter to the FiltersService basic filters list', async () => {
    const spyAddBasic = spyOn(filterService, 'addBasicFilter').and.callThrough();

    await fixtureList.whenStable();
    list.dataSource = [] as unknown as ListDataSource;
    list.dataSource.customSort = new BehaviorSubject<MatSort | null>(null);
    list.dataSource.customPaginator = new BehaviorSubject<MatPaginator | null>(null);
    list.dataSource.actionErrorEvt = new EventEmitter<Error>();
    list.dataSource.disconnect = () => {};
    fixtureList.detectChanges();

    list.additionalBasicFilters = ['testFilter', 'otherFilter', 'nopeFilter'];

    expect(spyAddBasic).toHaveBeenCalledTimes(2);
  });
});
