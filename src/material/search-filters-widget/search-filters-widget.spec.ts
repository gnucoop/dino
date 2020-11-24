import {
  AjfField,
  AjfFieldType,
  AjfForm,
  AjfNodeType,
  AjfSlide,
} from '@ajf/core/forms';
import {
  Component,
} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatButtonToggle, MatButtonToggleChange} from '@angular/material/button-toggle';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {RouterTestingModule} from '@angular/router/testing';
import {
  CHOICES_CONDITION_OPERATORS,
  ListModule,
  NUMBER_CONDITION_OPERATORS,
  WidgetData,
} from '@dewco/core/list';
import {
  SearchFiltersWidget,
  SearchFiltersWidgetModule,
} from '@dewco/material/search-filters-widget';

@Component({
  selector: 'mat-slide-toggle',
  template: '',
})
class MatSlideToggleStub {
  toggle() {}
  checked: boolean = false;
}

const fakeAjfField: AjfField = {
  nodeType: AjfNodeType.AjfField,
  id: 101,
  parent: 0,
  parentNode: 0,
  conditionalBranches: [],
  name: 'test_number_field',
  label: 'test_number_field',
  fieldType: AjfFieldType.Number,
  editable: true,
  size: 'normal',
  defaultValue: 3,
};

const fakeAjfSlide: AjfSlide = {
  conditionalBranches: [],
  id: 1,
  label: 'test_number_field',
  nodes: [fakeAjfField],
  name: 'test_number_field',
  nodeType: 0,
  parent: 0,
  parentNode: 0,
  visibility: {condition: 'true'},
};

const fakeAjfForm: AjfForm = {
  nodes: [fakeAjfSlide],
  choicesOrigins: [],
  attachmentsOrigins: [],
  stringIdentifier: [],
  initContext: {
    'test_number_field': 5,
  },
};

const fakeWidgetData: WidgetData = {
  form: fakeAjfForm,
  operator: {label: '==', value: '$eq'},
  active: true,
  validation: undefined,
};

describe('Search filters widget', () => {
  let fixtureMatSlideToggleStub: ComponentFixture<MatSlideToggleStub>;
  let matSlideToggleStub: MatSlideToggleStub;
  let fixtureMatButtonToggle: ComponentFixture<MatButtonToggle>;
  let matButtonToggle: MatButtonToggle;
  let matButtonToggleChange: MatButtonToggleChange;
  let fixtureWidget: ComponentFixture<SearchFiltersWidget>;
  let widget: SearchFiltersWidget;

  beforeEach(() => {
    TestBed
        .configureTestingModule({
          declarations: [
            MatSlideToggleStub,
          ],
          imports: [
            ListModule,
            RouterTestingModule,
            SearchFiltersWidgetModule,
          ],
        })
        .compileComponents();
    fixtureMatSlideToggleStub = TestBed.createComponent(MatSlideToggleStub);
    matSlideToggleStub = fixtureMatSlideToggleStub.componentInstance;

    fixtureMatButtonToggle = TestBed.createComponent(MatButtonToggle);
    matButtonToggle = fixtureMatButtonToggle.componentInstance;
    matButtonToggleChange = new MatButtonToggleChange(matButtonToggle, true);

    fixtureWidget = TestBed.createComponent(SearchFiltersWidget);
    widget = fixtureWidget.componentInstance;
    widget.widgetData = fakeWidgetData;
    fixtureWidget.detectChanges();
  });

  it('should create components and assign data to the widget and toggle the slideToggleButton',
     async () => {
       fixtureWidget.whenStable();
       widget.toggleButton = matSlideToggleStub as MatSlideToggle;
       const spyToggle = spyOn(widget.toggleButton, 'toggle').and.callThrough();
       expect(spyToggle).not.toHaveBeenCalled();

       widget.formGroup.subscribe(fg => {
         fg?.setValue({
           'test_number_field': 7,
         });
       });

       expect(widget).toBeTruthy();
       expect(widget.widgetData).not.toBeNull();
       expect(widget.widgetData.form).toEqual(fakeAjfForm);
       expect(widget.toggleButton).not.toBeUndefined();
       expect(spyToggle).toHaveBeenCalled();
     });

  it('should change the value of the operator', () => {
    const spyOperatorChange = spyOn(widget.operatorValue, 'next').and.callThrough();
    widget.changeOperator(matButtonToggleChange);

    expect(spyOperatorChange).toHaveBeenCalledWith(matButtonToggleChange.value);
  });

  it('should return the appropriate operators relative to the ajfFieldType', () => {
    const opNumber = widget.conditionOperatorByFieldType(AjfFieldType.Number);
    const opString = widget.conditionOperatorByFieldType(AjfFieldType.String);
    const opMultiChoice = widget.conditionOperatorByFieldType(AjfFieldType.MultipleChoice);

    expect(opNumber).toEqual(NUMBER_CONDITION_OPERATORS);
    expect(opString).toEqual([]);
    expect(opMultiChoice).toEqual(CHOICES_CONDITION_OPERATORS);
  });

  it('should check and return the widget slide toggle button disabled state', async () => {
    fixtureWidget.whenStable();
    const testObj = {'test_field': ''};
    const testObjB = {'test_field': 'value'};
    const testResult = widget.checkToggleDisabled(testObj, matSlideToggleStub as MatSlideToggle);
    const testResultB = widget.checkToggleDisabled(testObjB, matSlideToggleStub as MatSlideToggle);

    expect(testResult).toBeTrue();
    expect(testResultB).toBeFalse();
  });
});
