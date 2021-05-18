import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '@dewco/core/auth';
import {of} from 'rxjs';

import {MainNav} from './main-nav';
import {MainModule} from './main-nav.module';

const authServiceMock = {
  authenticated: of(true),
  getUserInfo: () => {
    return {};
  },
  logout: () => {
    return of(true);
  }
} as unknown as AuthService;


describe('Main', () => {
  let fixtureMain: ComponentFixture<MainNav>;
  let main: MainNav;
  let authService: AuthService;

  beforeEach(() => {
    TestBed
        .configureTestingModule({
          imports: [
            BrowserAnimationsModule,
            MainModule,
            HttpClientTestingModule,
            RouterTestingModule,
          ],
          providers: [
            {provide: AuthService, useValue: authServiceMock},
          ],
        })
        .compileComponents();
    authService = TestBed.inject(AuthService);
    fixtureMain = TestBed.createComponent(MainNav);
    main = fixtureMain.componentInstance;
  });

  it('should create the component', async () => {
    await fixtureMain.whenStable();
    fixtureMain.detectChanges();

    expect(main).toBeTruthy();
  });

  it('should ask the authservice to log the user out, then open a snackbar message', async () => {
    let logoutSpy = spyOn(authService, 'logout').and.callThrough();
    let snackbarSpy = spyOn(main.snackbar, 'open').and.callThrough();

    await fixtureMain.whenStable();
    fixtureMain.detectChanges();

    main.logout();

    expect(logoutSpy).toHaveBeenCalled();
    expect(snackbarSpy).toHaveBeenCalled();
  });
});
