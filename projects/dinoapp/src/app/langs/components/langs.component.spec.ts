import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LangsComponent} from './langs.component';

describe('LangsComponent', () => {
  let component: LangsComponent;
  let fixture: ComponentFixture<LangsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({declarations: [LangsComponent]})
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LangsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
