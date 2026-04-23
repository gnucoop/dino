import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditPublicFormComponent} from './edit-public-form.component';

describe('EditPublicFormComponent', () => {
  let component: EditPublicFormComponent;
  let fixture: ComponentFixture<EditPublicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPublicFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPublicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
