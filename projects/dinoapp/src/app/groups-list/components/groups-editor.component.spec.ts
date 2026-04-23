import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupsEditor} from './groups-editor.component';

describe('GroupsEditor', () => {
  let component: GroupsEditor;
  let fixture: ComponentFixture<GroupsEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({declarations: [GroupsEditor]})
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
