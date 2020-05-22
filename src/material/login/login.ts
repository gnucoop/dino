import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation
} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService, LoginComponent} from '@dewco/core/auth';


@Component({
  selector: 'dewco-login',
  templateUrl: 'login.html',
  styleUrls: ['login.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Login extends LoginComponent {
  constructor(
      authService: AuthService,
      router: Router,
      fb: FormBuilder,
      cdr: ChangeDetectorRef,
  ) {
    super(authService, router, fb, cdr);
  }
}
