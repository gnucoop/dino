import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {TranslocoModule} from '@ngneat/transloco';
import {FormStatusEditor} from './form-status-editor';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {UserInteractionsModule} from '@dino/material/user-interactions';
import {ColorPickerModule} from 'ngx-color-picker';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [FormStatusEditor],
  exports: [FormStatusEditor],
  imports: [
    ColorPickerModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    TranslocoModule,
    UserInteractionsModule,
  ],
})
export class FormStatusEditorModule {}
