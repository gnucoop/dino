import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditReportSchemaComponent} from './edit-report-schema.component';

describe('EditComponent', () => {
  let component: EditReportSchemaComponent;
  let fixture: ComponentFixture<EditReportSchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({declarations: [EditReportSchemaComponent]})
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReportSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
