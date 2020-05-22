import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';

import {Login} from './login';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: Login}]),
  ],
  declarations: [
    Login,
  ],
  exports: [
    Login,
  ],
})
export class LoginModule {
}
