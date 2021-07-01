import {
  Component,
} from '@angular/core';
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
    this._router.navigate(['mat-list']);
  }
}
