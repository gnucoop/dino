import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UsersEditor} from './users-editor.component';

describe('UsersEditor', () => {
  let component: UsersEditor;
  let fixture: ComponentFixture<UsersEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({declarations: [UsersEditor]})
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
