import {
  Component,
} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'mat-login-e2e',
  templateUrl: 'login-e2e.html',
})
export class MatLoginE2E {
  constructor(
      private _router: Router,
  ) {}

  postLogin() {
    this._router.navigate(['mat-list']);
  }
}
