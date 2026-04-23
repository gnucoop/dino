import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReportsCollectComponent} from './reports-collect.component';

describe('ReportsCollectComponent', () => {
  let component: ReportsCollectComponent;
  let fixture: ComponentFixture<ReportsCollectComponent>;

  beforeEach(async () => {
    await TestBed
        .configureTestingModule({declarations: [ReportsCollectComponent]})
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsCollectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
