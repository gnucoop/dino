import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsCollectComponent} from './forms-collect.component';

describe('FormsCollectComponent', () => {
  let component: FormsCollectComponent;
  let fixture: ComponentFixture<FormsCollectComponent>;

  beforeEach(async () => {
    await TestBed
        .configureTestingModule({declarations: [FormsCollectComponent]})
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsCollectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
