import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ParagraphDialogComponent} from './paragraph-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {of} from 'rxjs';

const mockDialogRef = {
  close: (_: any) => of(null),
  open: () => of(null),
  backdropClick: () => of(null),
};

describe('ParagraphDialogComponent', () => {
  let component: ParagraphDialogComponent;
  let fixture: ComponentFixture<ParagraphDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParagraphDialogComponent],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: mockDialogRef},
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagraphDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
