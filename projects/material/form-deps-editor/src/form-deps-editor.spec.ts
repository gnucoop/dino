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

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  FormSchema,
  FormSchemaDeps,
  FormSchemaDepsManager,
  FormSchemaManager,
} from '@dino/core/forms';
import {TRANSLATIONS_CONFIG} from '@dino/core/translations';
import {Observable, of} from 'rxjs';

import {FormDepsEditor, FormDepsEditorModule} from './public_api';

const DEPS_ID = 'deps-1';

/** A saved schema that already points at a FormSchemaDeps document. */
const formSchema = {
  id: 'schema-1',
  name: 'schema_one',
  label: 'Schema one',
  form_schema_deps_ref_id: DEPS_ID,
} as unknown as FormSchema;

/**
 * A stored deps document holding one usable relationship row and one metric row.
 * `choices_origin` is left out of the relationship row on purpose: the editor
 * normalises it on load, which is exactly the kind of difference the dirty check
 * must not mistake for a user edit.
 */
function storedDeps(): FormSchemaDeps {
  return {
    id: DEPS_ID,
    created_at: '2026-01-01',
    updated_at: '2026-01-01',
    deps_origin: [
      {form_schema_ref_id: 'schema-2', fields_to_update: ['field_a'], filter_by_metric: ['area']},
      {metric_name: 'area', choices_origin: {value_key: 'name'}},
    ],
    metric_data_to_show: ['area'],
  } as unknown as FormSchemaDeps;
}

/** A deps document still using the deprecated metrics_choices_origin field. */
function legacyDeps(): FormSchemaDeps {
  return {
    id: DEPS_ID,
    created_at: '2026-01-01',
    updated_at: '2026-01-01',
    deps_origin: [{form_schema_ref_id: 'schema-2', metrics_choices_origin: ['area']}],
    metric_data_to_show: [],
  } as unknown as FormSchemaDeps;
}

class FormSchemaDepsManagerMock {
  doc: FormSchemaDeps | null = null;

  get(_id: string): Observable<{toJSON: () => FormSchemaDeps} | null> {
    return of(this.doc == null ? null : {toJSON: () => this.doc as FormSchemaDeps});
  }

  update(_deps: FormSchemaDeps): Observable<unknown> {
    return of({});
  }

  create(_deps: FormSchemaDeps): Observable<{toJSON: () => {id: string}}> {
    return of({toJSON: () => ({id: 'deps-new'})});
  }
}

describe('FormDepsEditor relationships persistence', () => {
  let fixture: ComponentFixture<FormDepsEditor>;
  let editor: FormDepsEditor;
  let fsd: FormSchemaDepsManagerMock;

  function setUp(deps: FormSchemaDeps | null, schema: FormSchema | null = formSchema): void {
    fsd.doc = deps;
    editor.formSchema = of(schema);
    fixture.detectChanges();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, FormDepsEditorModule],
      providers: [
        {provide: FormSchemaManager, useValue: {list: () => of([])}},
        {provide: FormSchemaDepsManager, useClass: FormSchemaDepsManagerMock},
        {provide: TRANSLATIONS_CONFIG, useValue: {defaultLanguage: 'eng'}},
      ],
    }).compileComponents();

    fsd = TestBed.inject(FormSchemaDepsManager) as unknown as FormSchemaDepsManagerMock;
    fixture = TestBed.createComponent(FormDepsEditor);
    editor = fixture.componentInstance;
  });

  // The editor is instantiated with the rest of the form editor's template, so a
  // save goes through it even when the user never opens the Metrics or
  // Relationships tab. Writing anyway would bump updated_at and push a revision
  // that stores identical content.
  it('skips the write when the relationships are untouched since loading', async () => {
    setUp(storedDeps());
    const updateSpy = spyOn(fsd, 'update').and.callThrough();

    const result = await new Promise(resolve => editor.persistRelationships().subscribe(resolve));

    expect(updateSpy).not.toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it('writes and returns the existing id once a relationship row changes', async () => {
    setUp(storedDeps());
    const updateSpy = spyOn(fsd, 'update').and.callThrough();

    editor.dataSource.data[0].fields_to_update = ['field_a', 'field_b'];

    const result = await new Promise(resolve => editor.persistRelationships().subscribe(resolve));

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(result).toBe(DEPS_ID);
  });

  it('writes when a metric row changes', async () => {
    setUp(storedDeps());
    const updateSpy = spyOn(fsd, 'update').and.callThrough();

    editor.addMetricRow();
    editor.metricDataSource.data[editor.metricDataSource.data.length - 1].metric_name = 'project';

    const result = await new Promise(resolve => editor.persistRelationships().subscribe(resolve));

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(result).toBe(DEPS_ID);
  });

  it('skips a second write right after a successful one', async () => {
    setUp(storedDeps());
    editor.dataSource.data[0].fields_to_update = ['field_a', 'field_b'];
    await new Promise(resolve => editor.persistRelationships().subscribe(resolve));

    const updateSpy = spyOn(fsd, 'update').and.callThrough();
    const result = await new Promise(resolve => editor.persistRelationships().subscribe(resolve));

    expect(updateSpy).not.toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  // The converted rows only exist in memory: the document still stores the
  // deprecated field, so the migration has to be written even though the tables
  // match what was loaded.
  it('writes an in-memory legacy conversion even when nothing else changed', async () => {
    setUp(legacyDeps());
    const updateSpy = spyOn(fsd, 'update').and.callThrough();

    const result = await new Promise(resolve => editor.persistRelationships().subscribe(resolve));

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(result).toBe(DEPS_ID);
  });

  it('creates nothing when there is no document and nothing to persist', async () => {
    setUp(null, {...formSchema, form_schema_deps_ref_id: null} as unknown as FormSchema);
    const createSpy = spyOn(fsd, 'create').and.callThrough();

    const result = await new Promise(resolve => editor.persistRelationships().subscribe(resolve));

    expect(createSpy).not.toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it('creates a document and returns its id for the first relationships', async () => {
    setUp(null, {...formSchema, form_schema_deps_ref_id: null} as unknown as FormSchema);
    const createSpy = spyOn(fsd, 'create').and.callThrough();

    editor.addRow();
    editor.dataSource.data[0].form_schema_ref_id = 'schema-2';
    editor.dataSource.data[0].fields_to_update = ['field_a'];

    const result = await new Promise(resolve => editor.persistRelationships().subscribe(resolve));

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(result).toBe('deps-new');
  });

  it('reports a failed write as null', async () => {
    setUp(storedDeps());
    spyOn(fsd, 'update').and.returnValue(of(null));

    editor.dataSource.data[0].fields_to_update = ['field_a', 'field_b'];

    const result = await new Promise(resolve => editor.persistRelationships().subscribe(resolve));

    expect(result).toBeNull();
  });
});
