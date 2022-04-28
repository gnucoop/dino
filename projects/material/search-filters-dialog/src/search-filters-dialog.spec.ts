import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {FilterItem, FiltersService, ListModule} from '@dino/core/list';
import {SearchFiltersDialog, SearchFiltersDialogModule} from '@dino/material/search-filters-dialog';
import {BehaviorSubject, of} from 'rxjs';

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
  authToken: of('test_auth_token'),
  getUserInfo: () => {
    return {};
  },
  _authConfig: new BehaviorSubject<AuthServiceConfig>(authServiceConfig),
  authConfig: authServiceConfig,
} as unknown as AuthService;

const fakeFilters: FilterItem[] = [
  {name: 'filter_a', value: 'test'},
  {name: 'filter_b', value: ''},
];

const fakeFiltersPreset = btoa(encodeURI(JSON.stringify(fakeFilters)));

const fakeActivatedRoute = {
  queryParams: of({'filters': fakeFiltersPreset}),
} as unknown as ActivatedRoute;

const mockDialogRef = {
  close: () => of(null),
  open: () => of(null),
  backdropClick: () => of(null),
};

describe('Search filters dialog', () => {
  let fts: FiltersService;

  let fixtureDialog: ComponentFixture<SearchFiltersDialog>;
  let dialog: SearchFiltersDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListModule, RouterTestingModule, SearchFiltersDialogModule],
      providers: [
        {provide: MatDialogRef, useValue: mockDialogRef},
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        {provide: AuthService, useValue: authServiceMock},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {provide: MAT_DIALOG_DATA, useValue: {}},
      ],
    }).compileComponents();
    fts = TestBed.inject(FiltersService);
    fixtureDialog = TestBed.createComponent(SearchFiltersDialog);
    dialog = fixtureDialog.componentInstance;
  });

  it('should create the component', () => {
    fixtureDialog.detectChanges();

    expect(dialog).toBeTruthy();
  });

  it('should close the dialog', async () => {
    fixtureDialog.detectChanges();

    await fixtureDialog.whenStable();
    const spyRefClose = spyOn(dialog.dialogRef, 'close').and.callThrough();

    dialog.closeDialog();
    expect(spyRefClose).toHaveBeenCalledWith(false);
    expect(spyRefClose).not.toHaveBeenCalledWith(true);
    dialog.search();
    expect(spyRefClose).toHaveBeenCalledWith(true);
  });

  it('should ask the FilterService to add a FilterItem to the list of the chosen FilterListType', () => {
    fixtureDialog.detectChanges();
    const spyAddFilter = spyOn(fts, 'addFilter').and.callThrough();

    dialog.addFilter(fakeFilters[0], 'temporary');

    expect(spyAddFilter).toHaveBeenCalledWith(fakeFilters[0], 'temporary');
  });

  it('should not ask the FilterService to add a FilterItem with empty or null value ', () => {
    fixtureDialog.detectChanges();
    const spyAddFilter = spyOn(fts, 'addFilter').and.callThrough();

    dialog.addFilter(fakeFilters[1], 'temporary');

    expect(spyAddFilter).not.toHaveBeenCalled();
  });

  it('should ask the FilterService to remove a FilterItem from a list', () => {
    fixtureDialog.detectChanges();
    const spyRemoveFilter = spyOn(fts, 'removeFilter').and.callThrough();

    dialog.removeFilter(fakeFilters[0], 'temporary');

    expect(spyRemoveFilter).toHaveBeenCalledWith(fakeFilters[0], 'temporary');
  });
});
