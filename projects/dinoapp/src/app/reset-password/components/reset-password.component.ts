import {Component} from '@angular/core';
import * as conf from '../conf';

@Component({
  selector: 'dinoapp-reset-password',
  templateUrl: 'reset-password.component.html',
})
export class ResetPasswordComponent {
  readonly logoImagePath = conf.logoImagePath;
  constructor() {}
}
