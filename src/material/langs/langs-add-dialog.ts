/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dino (dino).
 *
 * Dino (dino) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dino (dino) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dino (dino).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {TranslocoService} from '@ajf/core/transloco';
import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'dino-langs-add-dialog',
  templateUrl: './langs-add-dialog.html',
  styleUrls: ['./langs-add-dialog.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LangsAddDialog {
  readonly data: string[] = [];
  readonly form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LangsAddDialog>,
    translateSvc: TranslocoService,
    fb: FormBuilder,
  ) {
    const initForm: {[key: string]: any[]} = {};
    const langs: string[] = translateSvc.getAvailableLangs() as string[];

    initForm.key = ['', Validators.required];

    this.data = ['key', ...langs];
    langs.forEach(lang => (initForm[lang] = ['']));
    this.form = fb.group(initForm);
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    const res = this.form.value;

    Object.keys(this.form.controls).forEach((key: string) => {
      const currentControl: AbstractControl = this.form.controls[key];
      if (!currentControl.dirty) {
        delete res[key];
      }
    });
    this.dialogRef.close(res);
  }
}
