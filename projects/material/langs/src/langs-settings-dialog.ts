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

import {ChangeDetectionStrategy, Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Dic, LangManager, LangRow, langLabel} from '@dino/core/langs';
import {TranslocoService} from '@ngneat/transloco';
import {BehaviorSubject, Observable, Subscription, combineLatest} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, startWith} from 'rxjs/operators';

/**
 * A language as listed by the sidebar, with how much of the dictionary it covers.
 */
export interface LangSummaryVm {
  name: string;
  label: string;
  filled: number;
  total: number;
  status: 'ok' | 'warn' | 'danger';
}

/**
 * A row of the dictionary preview.
 */
export interface LangEntryVm {
  position: number;
  key: string;
  value: string;
}

/**
 * The dictionary of a language uploaded from a file and not saved yet.
 */
interface UploadedFile {
  filename: string;
  schema: Dic;
}

@Component({
  selector: 'dino-langs-settings-dialog',
  templateUrl: './langs-settings-dialog.html',
  styleUrls: ['./langs-settings-dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LangsSettingsDialog implements OnDestroy {
  private readonly _rows$: Observable<LangRow[]> = this._langSvc.langRows$.pipe(
    shareReplay({bufferSize: 1, refCount: true}),
  );

  private readonly _selectedName$ = new BehaviorSubject<string | null>(null);
  private readonly _langQuery$ = new BehaviorSubject<string>('');
  private readonly _entryQuery$ = new BehaviorSubject<string>('');
  private readonly _uploaded$ = new BehaviorSubject<UploadedFile | null>(null);
  private readonly _invalidFile$ = new BehaviorSubject<boolean>(false);

  readonly uploaded$: Observable<UploadedFile | null> = this._uploaded$;
  readonly invalidFile$: Observable<boolean> = this._invalidFile$;

  readonly summaries$: Observable<LangSummaryVm[]> = combineLatest([
    this._rows$,
    this._langSvc.allLangsNames$,
  ]).pipe(
    map(([rows, names]) => names.map(name => buildSummary(name, rows))),
    shareReplay({bufferSize: 1, refCount: true}),
  );

  readonly visibleSummaries$: Observable<LangSummaryVm[]> = combineLatest([
    this.summaries$,
    this._langQuery$.pipe(
      map(query => query.trim().toLowerCase()),
      debounceTime(150),
      startWith(''),
      distinctUntilChanged(),
    ),
  ]).pipe(
    map(([summaries, query]) =>
      query === ''
        ? summaries
        : summaries.filter(
            summary =>
              summary.name.toLowerCase().includes(query) ||
              summary.label.toLowerCase().includes(query),
          ),
    ),
  );

  readonly selected$: Observable<LangSummaryVm | null> = combineLatest([
    this.summaries$,
    this._selectedName$,
  ]).pipe(
    map(([summaries, name]) => summaries.find(s => s.name === name) ?? summaries[0] ?? null),
    shareReplay({bufferSize: 1, refCount: true}),
  );

  /**
   * The whole dictionary of the selected language: every known translation key,
   * with the value of the language or an empty one when it has no translation.
   * Once a file is uploaded the values come from the file, so that the import can
   * be reviewed before saving.
   */
  readonly entries$: Observable<LangEntryVm[]> = combineLatest([
    this._rows$,
    this.selected$,
    this._uploaded$,
  ]).pipe(
    map(([rows, selected, uploaded]) =>
      selected == null
        ? []
        : rows.map((row, idx) => ({
            position: idx + 1,
            key: row.key,
            value: uploaded != null ? uploaded.schema[row.key] || '' : row[selected.name] || '',
          })),
    ),
    shareReplay({bufferSize: 1, refCount: true}),
  );

  readonly visibleEntries$: Observable<LangEntryVm[]> = combineLatest([
    this.entries$,
    this._entryQuery$.pipe(
      map(query => query.trim().toLowerCase()),
      debounceTime(150),
      startWith(''),
      distinctUntilChanged(),
    ),
  ]).pipe(
    map(([entries, query]) =>
      query === ''
        ? entries
        : entries.filter(
            entry =>
              entry.key.toLowerCase().includes(query) || entry.value.toLowerCase().includes(query),
          ),
    ),
  );

  readonly counters$: Observable<{filled: number; total: number}> = this.entries$.pipe(
    map(entries => ({
      filled: entries.filter(entry => entry.value.trim() !== '').length,
      total: entries.length,
    })),
  );

  private _infoSub: Subscription = Subscription.EMPTY;
  private _selectSub: Subscription = Subscription.EMPTY;
  private _entriesSub: Subscription = Subscription.EMPTY;
  /** The last rendered preview, downloaded by the export button. */
  private _entries: LangEntryVm[] = [];

  constructor(
    public dialogRef: MatDialogRef<LangsSettingsDialog>,
    private _langSvc: LangManager,
    private _snackBar: MatSnackBar,
    private _ts: TranslocoService,
  ) {
    // saveLang reads the language to write from the manager, so the selection has
    // to be mirrored there.
    this._selectSub = this.selected$.subscribe(selected => {
      if (selected != null) {
        this._langSvc.currentLangName = selected.name;
      }
    });

    this._entriesSub = this.entries$.subscribe(entries => (this._entries = entries));

    this._infoSub = this._langSvc.infoAfterStoredLang$.subscribe(res => {
      this._snackBar.open(res as string, this._ts.translate('Ok'), {duration: 2000});
      this.close();
    });
  }

  ngOnDestroy(): void {
    this._langSvc.newLang = null;
    this._langSvc.resetCurrentLangUpdateSchema();
    this._infoSub.unsubscribe();
    this._selectSub.unsubscribe();
    this._entriesSub.unsubscribe();
  }

  close(): void {
    this.dialogRef.close();
  }

  select(name: string): void {
    this._resetUpload();
    this._selectedName$.next(name);
  }

  setLangQuery(query: string): void {
    this._langQuery$.next(query);
  }

  setEntryQuery(query: string): void {
    this._entryQuery$.next(query);
  }

  setUploaded(uploaded: string): void {
    const schema = JSON.parse(uploaded) as Dic;
    this._invalidFile$.next(false);
    this._uploaded$.next({filename: '', schema});
    this._langSvc.currentLangUpdateSchema = schema;
  }

  /**
   * The uploader emits the name of the file right after its content.
   */
  setFilename(filename: string): void {
    const uploaded = this._uploaded$.value;
    if (uploaded != null) {
      this._uploaded$.next({...uploaded, filename: `${filename}.json`});
    }
  }

  setError(): void {
    this._resetUpload();
    this._invalidFile$.next(true);
  }

  /**
   * Merges the uploaded dictionary into the stored one: the keys missing from the
   * file keep the translation they have.
   */
  save(): void {
    if (this._uploaded$.value == null) {
      return;
    }
    this._langSvc.saveLangEvt.emit();
  }

  /**
   * Downloads the dictionary of a language, without the keys it does not translate.
   */
  download(name: string): void {
    const schema: Dic = {};
    this._entries.forEach(entry => {
      if (entry.value.trim() !== '') {
        schema[entry.key] = entry.value;
      }
    });
    const blob = new Blob([JSON.stringify(schema, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name.toLowerCase()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  trackByKey(_: number, entry: LangEntryVm): string {
    return entry.key;
  }

  trackByName(_: number, summary: LangSummaryVm): string {
    return summary.name;
  }

  private _resetUpload(): void {
    this._uploaded$.next(null);
    this._invalidFile$.next(false);
    this._langSvc.resetCurrentLangUpdateSchema();
  }
}

function buildSummary(name: string, rows: LangRow[]): LangSummaryVm {
  const total = rows.length;
  const filled = rows.filter(row => (row[name] || '').trim() !== '').length;
  const pct = total === 0 ? 0 : Math.round((filled / total) * 100);
  return {
    name,
    label: langLabel(name),
    filled,
    total,
    status: pct === 100 ? 'ok' : pct >= 40 ? 'warn' : 'danger',
  };
}
