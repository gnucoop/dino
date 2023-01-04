import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import {TranslocoModule} from '@ngneat/transloco';
import {FormStatusEditor} from './form-status-editor';
import {MatLegacySnackBarModule as MatSnackBarModule} from '@angular/material/legacy-snack-bar';
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
