import {AjfFieldType, AjfNodeType, AjfValidationService} from '@ajf/core/forms';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {
  CHOICES_CONDITION_OPERATORS,
  FilterItem,
  ListModule,
  NUMBER_CONDITION_OPERATORS,
  TEXT_CONDITION_OPERATORS,
} from '@dino/core/list';

import {SearchFiltersWidget, SearchFiltersWidgetModule} from './public_api';

class MockValidationService {}

const fakeFilterItem: FilterItem = {
  id: 10,
  parent: 1,
  parentNode: 1,
  choicesOrigin: undefined,
  choicesOriginRef: undefined,
  name: 'filter_a',
  label: 'Filter A',
  value: 'value',
  nodeType: AjfNodeType.AjfField,
  fieldType: AjfFieldType.String,
  isAdditionalFilter: true,
  editable: true,
  defaultValue: null,
  size: 'normal',
  visibility: {condition: 'true'},
};

describe('Search filters widget', () => {
  let fixtureWidget: ComponentFixture<SearchFiltersWidget>;
  let widgetComponent: SearchFiltersWidget;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListModule, NoopAnimationsModule, RouterTestingModule, SearchFiltersWidgetModule],
      providers: [{provide: AjfValidationService, useClass: MockValidationService}],
    }).compileComponents();
    fixtureWidget = TestBed.createComponent<SearchFiltersWidget>(SearchFiltersWidget);
    widgetComponent = fixtureWidget.componentInstance;
  });

  it('should correctly create and setup a Widget component', async () => {
    const spySetup = spyOn<any>(widgetComponent, '_setupWidget').and.callThrough();

    await fixtureWidget.whenStable();
    widgetComponent.filterItemData = fakeFilterItem;
    fixtureWidget.detectChanges();

    expect(widgetComponent).toBeDefined();
    expect(spySetup).toHaveBeenCalledWith(fakeFilterItem);
    expect(widgetComponent.widgetData!.validationConditions).toEqual(fakeFilterItem.validation);
    expect(widgetComponent.widgetData!.form.nodes).toBeDefined();
  });

  it('should return the appropriate operators relative to the ajfFieldType', () => {
    const opNumber = widgetComponent.conditionOperatorByFieldType(AjfFieldType.Number);
    const opString = widgetComponent.conditionOperatorByFieldType(AjfFieldType.String);
    const opMultiChoice = widgetComponent.conditionOperatorByFieldType(AjfFieldType.MultipleChoice);

    expect(opNumber).toEqual(NUMBER_CONDITION_OPERATORS);
    expect(opString).toEqual(TEXT_CONDITION_OPERATORS);
    expect(opMultiChoice).toEqual(CHOICES_CONDITION_OPERATORS);
  });
});
