import {AjfForm} from '@ajf/core/forms';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {FilterItem, FiltersService, WidgetData} from '@dewco/core/list';
import {SearchFiltersDialog} from '@dewco/material/searchfilters-dialog';
import {RxJsonSchema} from 'rxdb';
import {of} from 'rxjs';

const dummySchema = {
  'type': 'object',
  'properties': {
    'id': {'type': 'string', 'description': 'UUID v4 identifier.'},
    'name': {'type': 'string', 'description': 'Element name'},
    'created_at': {'type': 'string', 'description': 'Creation timestamp.'},
    'updated_at': {'type': 'string', 'description': 'Update timestamp.'},
  },
  'additionalProperties': false,
  'title': 'dummymodel',
  'version': 0,
} as RxJsonSchema;

const expectedField = {
  id: 11,
  parent: 1,
  parentNode: 1,
  choicesOrigin: undefined,
  choicesOriginRef: undefined,
  name: 'name',
  label: 'Name',
  nodeType: 0,
  fieldType: 0,
  isFormData: undefined,
  editable: true,
  defaultValue: null,
  size: 'normal',
  validation: undefined,
  visibility: {condition: 'true'},
  value: null,
  operator: {label: 'Like', value: '$regex'},
  conditionalBranches: []
};

const expectedAjfForm: AjfForm = {
  attachmentsOrigins: [],
  choicesOrigins: [],
  stringIdentifier: [],
  initContext: {'name': null},
  nodes: [
    {
      id: 1,
      parent: 0,
      parentNode: 0,
      label: 'Name',
      name: 'name',
      nodeType: 3,
      conditionalBranches: [
        {condition: 'true'},
      ],
      nodes: [expectedField],
      visibility: {condition: 'true'},
    },
  ],
};

const expectedWidgetData: WidgetData[] = [{
  form: expectedAjfForm,
  operator: {label: 'Like', value: '$regex'},
  active: false,
  validation: undefined,
  isFormData: false,
}];

const fakeFilters: FilterItem[] = [
  {name: 'filter_a', value: 'test'},
  {name: 'filter_b', value: ''},
];

const fakeFiltersPreset = btoa(encodeURI(JSON.stringify(fakeFilters)));

const fakeActivatedRoute = {
  queryParams: of({'filters': fakeFiltersPreset})
} as unknown as ActivatedRoute;

const mockDialogRef = {
  close: (res: boolean) => of(null),
  open: () => of(null),
  backdropClick: () => of(null),
};

describe('Search filters dialog', () => {
  let fts: FiltersService;

  let fixtureDialog: ComponentFixture<SearchFiltersDialog>;
  let dialog: SearchFiltersDialog;

  beforeEach(() => {
    TestBed
        .configureTestingModule({
          declarations: [
            SearchFiltersDialog,
          ],
          imports: [
            MatDialogModule,
            RouterTestingModule,
          ],
          providers: [
            {provide: MatDialogRef, useValue: mockDialogRef},
            {provide: ActivatedRoute, useValue: fakeActivatedRoute},
            {provide: MAT_DIALOG_DATA, useValue: {}},
          ],
        })
        .compileComponents();
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

    await fixtureDialog.whenStable().then(_ => {
      const spyRefClose = spyOn(dialog.dialogRef, 'close').and.callThrough();

      dialog.closeDialog();
      expect(spyRefClose).toHaveBeenCalledWith(false);
      expect(spyRefClose).not.toHaveBeenCalledWith(true);
      dialog.search();
      expect(spyRefClose).toHaveBeenCalledWith(true);
    });
  });

  it('should initialize widgetData correctly', async () => {
    fixtureDialog.detectChanges();
    const spySetupWidget = spyOn<any>(dialog, '_setupWidget').and.callThrough();
    const spySetupFilterItem = spyOn<any>(dialog, '_setupFilterItem').and.callThrough();

    fts.generateFilters(dummySchema);

    const wiData = await dialog.widgetData.toPromise();

    expect(wiData).not.toBeNull();
    expect(wiData).toEqual(expectedWidgetData);
    expect(spySetupFilterItem).toHaveBeenCalled();
    expect(spySetupWidget).toHaveBeenCalled();
  });

  it('should ask the FilterService to add a FilterItem to the list of the chosen FilterListType',
     () => {
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
