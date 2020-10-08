import {AjfFieldType, AjfValidationGroup} from '@ajf/core/forms';
import {fakeAsync, flush, TestBed} from '@angular/core/testing';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {
  FilterItem,
  FiltersService,
} from '@dewco/core/list';
import {RxJsonSchema} from 'rxdb';
import {of as obsOf} from 'rxjs';

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

const dummyFormSchema = {
  'nodes': [
    {
      'id': 1,
      'name': 'test',
      'label': 'TestLabel',
      'nodes': [{
        'id': 101,
        'name': 'test_filter',
        'size': 'normal',
        'label': 'Name',
        'parent': 1,
        'editable': true,
        'nodeType': 0,
        'fieldType': 0,
        'hasChoices': true,
        'parentNode': 0,
      }],
    },
  ],
};

const createCollectionParams = {
  collection: {
    name: 'dummymodel',
    schema: dummySchema,
  }
};

const fakeFilters: FilterItem[] = [
  {name: 'filter_a', value: 'test'},
  {name: 'filter_b', value: 15},
  {name: 'filter_c', value: false},
];
const fakeFilters_b: FilterItem[] = [
  {name: 'filter_a', value: 'new test'},
  {name: 'filter_b', value: 70},
  {name: 'filter_c', value: true},
];
const fakeFormGroup = new FormGroup({
  filter_a: new FormControl(),
});
const fakeFiltersPreset = btoa(encodeURI(JSON.stringify(fakeFilters)));
const fakeFiltersPreset_b = btoa(encodeURI(JSON.stringify(fakeFilters_b)));
const fakeActivatedRoute = {
  queryParams: obsOf({'filters': fakeFiltersPreset})
} as unknown as ActivatedRoute;

describe('FiltersService', () => {
  let fts: FiltersService;
  let route: ActivatedRoute;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {provide: FiltersService, useValue: fts},
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
      ],
    });
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    fts = new FiltersService(route, router);
  });

  it('should initialize the basic filters formGroup, triggering the preset loading',
     fakeAsync(() => {
       const spyLoadPreset = spyOn(fts, 'loadPreset').and.callThrough();
       const spyLoadPresetEvent = spyOn(fts.loadPresetEvent, 'emit').and.callThrough();

       fts.initializeFilters([fakeFormGroup]);
       flush();

       expect(spyLoadPresetEvent).toHaveBeenCalledWith(true);
       expect(spyLoadPreset).toHaveBeenCalledWith(fakeFiltersPreset);
     }));

  it('should add a filterItem to the selected list', () => {
    const item: FilterItem = {name: 'test_filter', fieldType: AjfFieldType.String};

    fts.addFilter(item, 'basic');

    expect(fts.basicFilters.value).toEqual([item]);
  });

  it('should remove a filterItem from the selected list', () => {
    const items: FilterItem[] = [
      {name: 'test_filter', fieldType: AjfFieldType.String, value: 'test'},
      {name: 'test_filter_2', fieldType: AjfFieldType.Number, value: 5},
    ];
    items.forEach(item => {
      fts.addFilter(item, 'advanced');
    });
    fts.removeFilter({name: 'test_filter'}, 'advanced');

    expect(fts.advancedFilters.value).toEqual([
      {name: 'test_filter', fieldType: AjfFieldType.String, value: null},
      {name: 'test_filter_2', fieldType: AjfFieldType.Number, value: 5},
    ]);
  });

  it('should find and return a filter by its name from the selected list', async () => {
    const item: FilterItem = {name: 'test_filter', fieldType: AjfFieldType.String};

    fts.addFilter(item, 'temporary');
    const filterFound = fts.findFilterByName('test_filter', 'temporary').toPromise();

    expect(await filterFound).not.toBeUndefined();
    expect(await filterFound).toEqual({name: 'test_filter', fieldType: AjfFieldType.String});
  });

  it('should check the ajfValidation of a FilterItem and return true if valid', () => {
    const spyCheckCondition = spyOn(fts, 'checkCondition').and.callThrough();
    const validation = {
      'maxValue': 6,
      'notEmpty': true,
      'conditions': [{
        'condition': 'test_filter >= 0',
        'errorMessage': 'Cannot be negative',
        'clientValidation': true
      }]
    } as unknown as AjfValidationGroup;
    const item_1: FilterItem = {name: 'test_filter', value: 3};
    const item_2: FilterItem = {name: 'test_filter', value: 7};
    const item_3: FilterItem = {name: 'test_filter', value: -2};
    const item_4: FilterItem = {name: 'test_filter', value: ''};

    const valid_1 = fts.checkValidation(item_1, validation);
    const valid_2 = fts.checkValidation(item_2, validation);
    const valid_3 = fts.checkValidation(item_3, validation);
    const valid_4 = fts.checkValidation(item_4, validation);

    expect(valid_1).toBe(true);
    expect(valid_2).toBe(false);
    expect(valid_3).toBe(false);
    expect(valid_4).toBe(false);
    expect(spyCheckCondition).toHaveBeenCalledTimes(2);
  });

  it('should check a single ajfCondition of a FilterItem and return true if met', () => {
    const condition_a = {'condition': 'filter_a < 0'};
    const condition_b = {'condition': 'filter_a == true'};
    const condition_c = {'condition': 'filter_a == 20'};
    const item_a: FilterItem = {name: 'filter_a', value: true};

    fts.addFilter(item_a, 'temporary');
    const met_a = fts.checkCondition(condition_a, item_a);
    const met_b = fts.checkCondition(condition_b);
    const met_c = fts.checkCondition(condition_c);

    expect(met_a).toBeFalse();
    expect(met_b).toBeTrue();
    expect(met_c).toBeFalse();
  });

  it('should evaluate a string expression and return the correct comparison result', () => {
    const val_a = '5', val_b = '3', val_c = 'test';

    const met_a = fts.checkValues(val_a, val_b, '>=');
    const met_b = fts.checkValues(val_a, val_b, '<');
    const met_c = fts.checkValues(val_a, val_c, '==');
    const met_d = fts.checkValues(val_c, val_b, '>');

    expect(met_a).toBeTrue();
    expect(met_b).toBeFalse();
    expect(met_c).toBeFalse();
    expect(met_d).toBeFalse();
  });

  it('should update the AdvancedFilters by merging in the temporaryFilters', () => {
    const item_a: FilterItem = {name: 'test_filter', value: 'test'};
    const item_b: FilterItem = {name: 'test_filter_2', value: 5};

    fts.addFilter(item_a, 'advanced');
    fts.addFilter(item_b, 'temporary');
    fts.updateAdvancedFilters();

    expect(fts.advancedFilters.value).toEqual([item_a, item_b]);
    expect(fts.advancedFilters.value).not.toEqual([item_a]);
  });

  it('should reset the temporaryFilters to the current AdvancedFilters value', () => {
    const item_a: FilterItem = {name: 'test_filter', value: 'test'};
    const item_b: FilterItem = {name: 'test_filter_2', value: 5};

    fts.addFilter(item_a, 'advanced');
    fts.addFilter(item_b, 'temporary');
    fts.resetTemporaryFilters();

    expect(fts.temporaryFilters.value).toEqual(fts.advancedFilters.value);
    expect(fts.advancedFilters.value).not.toEqual([item_b]);
  });

  it('should load a filters preset and update the filters lists', () => {
    const spyBasicNext = spyOn(fts.basicFilters, 'next').and.callThrough();
    const spyAdvancedNext = spyOn(fts.advancedFilters, 'next').and.callThrough();
    const spyResetTemporary = spyOn(fts, 'resetTemporaryFilters').and.callThrough();

    fts.initializeFilters([fakeFormGroup]);
    fts.loadPreset(fakeFiltersPreset_b);

    expect(spyBasicNext).toHaveBeenCalledTimes(1);
    expect(spyAdvancedNext).toHaveBeenCalledTimes(1);
    expect(spyResetTemporary).toHaveBeenCalledTimes(1);
    expect(fts.basicFilters.value).toEqual([fakeFilters_b[0]]);
    expect(fts.advancedFilters.value).toEqual([fakeFilters_b[1], fakeFilters_b[2]]);
    expect(fts.temporaryFilters.value).toEqual(fts.advancedFilters.value);
  });

  it('should create a list of filterGroups from a RxJsonSchema of a model and/or an ajfFormSchema',
     () => {
       const spyPropToFilterItem = spyOn<any>(fts, '_propToFilterItem').and.callThrough();

       fts.generateFilters(dummySchema, dummyFormSchema);

       expect(spyPropToFilterItem).toHaveBeenCalledTimes(1);
       expect(fts.modelFilters.value).toEqual([
         {
           filterGroupName: 'dummymodel',
           filterGroupAdvancedFilters: [
             {
               name: 'name',
               fieldType: AjfFieldType.String,
             },
           ],
         },
         {
           filterGroupName: 'TestLabel',
           filterGroupAdvancedFilters: [
             {
               id: 101,
               name: 'test_filter',
               size: 'normal',
               label: 'Name',
               parent: 1,
               editable: true,
               nodeType: 0,
               fieldType: 0,
               hasChoices: true,
               parentNode: 0,
               choices: undefined,
               isFormData: true,
             },
           ],
         }
       ]);
     });
});
