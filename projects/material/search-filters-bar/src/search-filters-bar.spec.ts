import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {AUTH_SERVICE_CONFIG, AuthServiceConfig} from '@dino/core/auth';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from '@dino/core/data';
import {FilterItem, FiltersService, ListModule} from '@dino/core/list';
import {SearchFiltersBar, SearchFiltersBarModule} from '@dino/material/search-filters-bar';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';

const fakeFilters: FilterItem[] = [{name: 'filter_a', value: 'test'}];
let testDbIdx = 0;

const authServiceConfig: AuthServiceConfig = {
  host: 'http://test-auth-backend',
  applicationId: 'applicationId',
  apiKey: 'apiKey',
  retryRefreshTime: 5000,
  retryAttemptsMax: 1,
  failedAuthRedirect: 'login',
};
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
describe('Search filters Bar', () => {
  let fts: FiltersService;
  let fixtureBar: ComponentFixture<SearchFiltersBar>;
  let bar: SearchFiltersBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListModule, NoopAnimationsModule, RouterTestingModule, SearchFiltersBarModule],
      providers: [
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
      ],
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
    const spyInitFilters = spyOn(bar, 'initFilters').and.callThrough();
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
