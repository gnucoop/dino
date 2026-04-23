import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DinoComponent } from './dino.component';

describe('DinoComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        DinoComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(DinoComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'dinoapp'`, () => {
    const fixture = TestBed.createComponent(DinoComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('dinoapp');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(DinoComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('dinoapp app is running!');
  });
});
