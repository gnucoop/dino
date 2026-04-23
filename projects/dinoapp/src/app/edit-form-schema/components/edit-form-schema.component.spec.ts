import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditFormSchemaComponent} from './edit-form-schema.component';

describe('EditComponent', () => {
  let component: EditFormSchemaComponent;
  let fixture: ComponentFixture<EditFormSchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({declarations: [EditFormSchemaComponent]})
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
