import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UsersList} from './users-list.component';

describe('UsersList', () => {
  let component: UsersList;
  let fixture: ComponentFixture<UsersList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({declarations: [UsersList]})
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
