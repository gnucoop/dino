import {AjfFieldType, AjfValidationGroup} from '@ajf/core/forms';
import {fakeAsync, flush, TestBed} from '@angular/core/testing';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {AUTH_SERVICE_CONFIG, AuthServiceConfig} from '@dewco/core/auth';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from '@dewco/core/data';
import {FilterItem, FiltersService} from '@dewco/core/list';
import {RxJsonSchema} from 'rxdb';
import {of as obsOf} from 'rxjs';

let testDbIdx = 0;

function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dewco_data_test_db_${testDbIdx++}`,
      adapter: 'memory',
    },
    syncOptions: {
      url: 'http://dewcoServer/v1/graphql',
      wsUrl: 'ws://dewcoServer/v1/graphql',
      webSocketImpl: WebSocket,
    },
  };
}

const authServiceConfig: AuthServiceConfig = {
  host: 'http://test-auth-backend',
  applicationId: 'applicationId',
  apiKey: 'apiKey',
  retryRefreshTime: 5000,
  retryAttemptsMax: 1,
  failedAuthRedirect: 'login',
};

const dummySchema = {
  'type': 'object',
  'properties': {
    'id': {'type': 'string', 'description': 'UUID v4 identifier.'},
    'name': {'type': 'string', 'description': 'Element name'},
    'created_at': {'type': 'string', 'description': 'Creation timestamp.'},
    'updated_at': {'type': 'string', 'description': 'Update timestamp.'},
  },
  'additionalProperties': false,
  'title': 'dummyModel',
  'version': 0,
} as RxJsonSchema;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        FiltersService,
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
      ],
    });
    fts = TestBed.inject(FiltersService);
  });

  it('should initialize the basic filters formGroup, triggering the preset loading',
     fakeAsync(() => {
       const spyResetTempFilters = spyOn(fts, 'resetTemporaryFilters').and.callThrough();
       const spyLoadPresetEvent = spyOn<any>(fts.loadPresetEvent, 'emit').and.callThrough();

       fts.initializeFilters([fakeFormGroup]);
       flush();

       expect(spyLoadPresetEvent).toHaveBeenCalledWith(true);
       expect(spyResetTempFilters).toHaveBeenCalled();
     }));

  it('should add a filterItem to the selected list', () => {
    const item: FilterItem = {name: 'test_filter', fieldType: AjfFieldType.String};

    fts.addFilter(item, 'basic');
    expectAsync(fts.basicFilters.toPromise()).toBeResolvedTo([item]);
  });

  it('should remove a filterItem from the selected list', () => {
    const items: FilterItem[] = [
      {name: 'test_filter', fieldType: AjfFieldType.String, value: 'test'},
      {name: 'test_filter_2', fieldType: AjfFieldType.Number, value: 5},
    ];
    items.forEach(item => {
      fts.addFilter(item, 'additional');
    });
    fts.removeFilter({name: 'test_filter'}, 'additional');

    expect(fts.additionalFilters.value).toEqual([
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

  it('should update the additionalFilters by merging in the temporaryFilters', () => {
    const item_a: FilterItem = {name: 'test_filter', value: 'test'};
    const item_b: FilterItem = {name: 'test_filter_2', value: 5};

    fts.addFilter(item_a, 'additional');
    fts.addFilter(item_b, 'temporary');
    fts.updateAdditionalFilters();

    expect(fts.additionalFilters.value).toEqual([item_a, item_b]);
    expect(fts.additionalFilters.value).not.toEqual([item_a]);
  });

  it('should reset the temporaryFilters to the current additionalFilters value', () => {
    const item_a: FilterItem = {name: 'test_filter', value: 'test'};
    const item_b: FilterItem = {name: 'test_filter_2', value: 5};

    fts.addFilter(item_a, 'additional');
    fts.addFilter(item_b, 'temporary');
    fts.resetTemporaryFilters();

    expect(fts.temporaryFilters.value).toEqual(fts.additionalFilters.value);
    expect(fts.additionalFilters.value).not.toEqual([item_b]);
  });

  it('should load a filters preset and update the filters lists', () => {
    const spyBasicNext = spyOn(fts.basicFilters, 'next').and.callThrough();
    const spyadditionalNext = spyOn(fts.additionalFilters, 'next').and.callThrough();
    const spyResetTemporary = spyOn(fts, 'resetTemporaryFilters').and.callThrough();

    fts.initializeFilters([fakeFormGroup]);
    fts.loadPreset(fakeFiltersPreset_b);

    expect(spyBasicNext).toHaveBeenCalled();
    expect(spyadditionalNext).toHaveBeenCalled();
    expect(spyResetTemporary).toHaveBeenCalled();
    expectAsync(fts.basicFilters.toPromise()).toBeResolvedTo([fakeFilters_b[0]]);
    expect(fts.additionalFilters.value).toEqual([fakeFilters_b[1], fakeFilters_b[2]]);
    expect(fts.temporaryFilters.value).toEqual(fts.additionalFilters.value);
  });

  it('should create a list of filterGroups from a RxJsonSchema of a model', () => {
    const spyPropToFilterItem = spyOn<any>(fts, '_propToFilterItem').and.callThrough();

    fts.generateModelFilters(dummySchema);

    fts.generatedModelFilters.subscribe(gmf => {
      expect(gmf).toEqual([{
        filterGroupName: 'DummyModel',
        filterGroupAdditionalFilters: [
          {
            name: 'name',
            fieldType: 0,
          },
        ],
      }]);
    });

    expect(spyPropToFilterItem).toHaveBeenCalledTimes(1);
  });
});
