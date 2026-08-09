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
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {Dic, SOURCE_LANG, isRtlLang, langLabel} from '@dino/core/langs';
import {Observable} from 'rxjs';
import {map, shareReplay, startWith} from 'rxjs/operators';

/**
 * A language field of the new key.
 */
export interface LangsAddRowVm {
  lang: string;
  label: string;
  source: boolean;
  rtl: boolean;
}

@Component({
  selector: 'dino-langs-add-dialog',
  templateUrl: './langs-add-dialog.html',
  styleUrls: ['./langs-add-dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LangsAddDialog {
  readonly form: UntypedFormGroup;
  readonly langs: LangsAddRowVm[];
  /** Rendered as is: it cannot be written inline because of the interpolation. */
  readonly placeholderToken = '{{ }}';
  readonly state$: Observable<{filled: number; total: number; canSave: boolean}>;

  constructor(
    public dialogRef: MatDialogRef<LangsAddDialog>,
    translateSvc: TranslocoService,
    fb: UntypedFormBuilder,
  ) {
    const available = (translateSvc.getAvailableLangs() as (string | {id: string})[]).map(lang =>
      typeof lang === 'string' ? lang : lang.id,
    );
    // The source language leads, the others keep the configured order.
    const langNames = [
      ...available.filter(lang => lang === SOURCE_LANG),
      ...available.filter(lang => lang !== SOURCE_LANG),
    ];
    this.langs = langNames.map(lang => ({
      lang,
      label: langLabel(lang),
      source: lang === SOURCE_LANG,
      rtl: isRtlLang(lang),
    }));

    const initForm: {[key: string]: unknown[]} = {key: ['', Validators.required]};
    langNames.forEach(lang => (initForm[lang] = ['']));
    this.form = fb.group(initForm);

    this.state$ = this.form.valueChanges.pipe(
      startWith(null),
      map(() => {
        const value = this.form.value as Dic;
        return {
          filled: langNames.filter(lang => (value[lang] || '').trim() !== '').length,
          total: langNames.length,
          canSave: (value['key'] || '').trim() !== '',
        };
      }),
      shareReplay({bufferSize: 1, refCount: true}),
    );
  }

  close(): void {
    this.dialogRef.close();
  }

  /**
   * Closes with the key and only the languages that have been translated: an empty
   * value would be read as a request to delete the translation.
   */
  save(): void {
    const value = this.form.value as Dic;
    const key = (value['key'] || '').trim();
    if (key === '') {
      return;
    }
    const res: Dic = {key};
    this.langs.forEach(({lang}) => {
      const translation = (value[lang] || '').trim();
      if (translation !== '') {
        res[lang] = translation;
      }
    });
    this.dialogRef.close(res);
  }
}
