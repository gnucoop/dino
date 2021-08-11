import {Component} from '@angular/core';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {Router} from '@angular/router';
import {AuthService} from '@dewco/core/auth';

@Component({
  selector: 'mat-login-e2e',
  templateUrl: 'login-e2e.html',
})
export class MatLoginE2E {
  constructor(
      private _router: Router,
      private _auth: AuthService,
  ) {
    this._auth.authenticated.next(false);
  }

  postLogin() {
    this._router.navigate(['dashboard']);
  }

  changeTheme(changeEvt: MatSlideToggleChange) {
    const themeAsset: HTMLLinkElement = document.getElementById('themeAsset') as HTMLLinkElement;

    if (themeAsset != null) {
      themeAsset.href = changeEvt.checked ? `e2e_alt_theme.css` : `e2e_main_theme.css`;
    }
  }
}
