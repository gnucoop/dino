import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TextDialogComponent} from './text-dialog.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

describe('TextDialogComponent', () => {
  let component: TextDialogComponent;
  let fixture: ComponentFixture<TextDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextDialogComponent],
      providers: [{provide: MAT_DIALOG_DATA, useValue: {}}],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
