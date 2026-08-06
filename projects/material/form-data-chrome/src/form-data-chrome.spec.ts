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

import {AjfFieldType, AjfNodeType, AjfSlideInstance} from '@ajf/core/forms';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslocoModule} from '@ngneat/transloco';
import {take} from 'rxjs/operators';

import {FormDataChrome, FormDataChromeModule} from './public_api';
import {FormProgress} from './form-data-chrome-section.interface';

/**
 * A field instance, reduced to what the chrome reads off it.
 */
function field(name: string, value: unknown, fieldType = AjfFieldType.String, visible = true): any {
  return {
    node: {name, nodeType: AjfNodeType.AjfField, fieldType, label: name},
    prefix: [],
    visible,
    valid: true,
    value,
  };
}

/**
 * A slide instance. `flatNodes` is what Ajf populates for every slide, and what
 * the chrome counts — `slideNodes` is deliberately left empty here because Ajf
 * only ever assigns it on repeating slides.
 */
function slide(label: string, fields: any[], valid = true, visible = true): AjfSlideInstance {
  return {
    node: {id: label, name: label, label, nodeType: AjfNodeType.AjfSlide},
    prefix: [],
    visible,
    valid,
    nodes: fields,
    flatNodes: fields,
    slideNodes: [],
  } as unknown as AjfSlideInstance;
}

describe('FormDataChrome progress', () => {
  let fixture: ComponentFixture<FormDataChrome>;
  let chrome: FormDataChrome;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, TranslocoModule, FormDataChromeModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FormDataChrome);
    chrome = fixture.componentInstance;
  });

  function progressFor(slides: AjfSlideInstance[]): Promise<FormProgress> {
    chrome.slides = slides;
    return new Promise<FormProgress>(resolve =>
      chrome.progress$.pipe(take(1)).subscribe(p => resolve(p)),
    );
  }

  it('counts every field, not only the mandatory ones', async () => {
    const progress = await progressFor([
      slide('one', [field('a', 'filled'), field('b', null), field('c', null), field('d', null)]),
    ]);

    expect(progress.fieldCount).toBe(4);
    expect(progress.filledCount).toBe(1);
    expect(progress.filledPercent).toBe(25);
  });

  it('reads fields of an ordinary slide, which Ajf exposes on flatNodes only', async () => {
    // Guards the bug this replaced: reading `slideNodes` reported 0 fields for
    // every non-repeating slide, so the bar sat at 0% however much was typed.
    const ordinary = slide('one', [field('a', 'x'), field('b', 'y')]);
    expect((ordinary as any).slideNodes.length).toBe(0);

    const progress = await progressFor([ordinary]);

    expect(progress.fieldCount).toBe(2);
    expect(progress.filledPercent).toBe(100);
  });

  it('ignores formatted-text and formula fields', async () => {
    const progress = await progressFor([
      slide('one', [
        field('a', 'filled'),
        field('note', null, AjfFieldType.Empty),
        field('computed', 42, AjfFieldType.Formula),
      ]),
    ]);

    expect(progress.fieldCount).toBe(1);
    expect(progress.filledCount).toBe(1);
  });

  it('ignores fields hidden by a visibility condition', async () => {
    const progress = await progressFor([
      slide('one', [field('a', 'filled'), field('hidden', null, AjfFieldType.String, false)]),
    ]);

    expect(progress.fieldCount).toBe(1);
    expect(progress.filledPercent).toBe(100);
  });

  it('treats false and 0 as filled, and empty string and empty array as not', async () => {
    const progress = await progressFor([
      slide('one', [
        field('bool', false, AjfFieldType.Boolean),
        field('num', 0, AjfFieldType.Number),
        field('str', ''),
        field('multi', [], AjfFieldType.MultipleChoice),
      ]),
    ]);

    expect(progress.fieldCount).toBe(4);
    expect(progress.filledCount).toBe(2);
  });

  it('counts a section complete only when it is full and valid', async () => {
    const progress = await progressFor([
      slide('full-and-valid', [field('a', 'x')]),
      slide('full-but-invalid', [field('b', 'x')], false),
      slide('valid-but-partial', [field('c', 'x'), field('d', null)]),
    ]);

    expect(progress.sectionCount).toBe(3);
    expect(progress.completeCount).toBe(1);
  });

  it('skips slides hidden by a visibility condition', async () => {
    const progress = await progressFor([
      slide('shown', [field('a', 'x')]),
      slide('hidden', [field('b', null)], true, false),
    ]);

    expect(progress.sectionCount).toBe(1);
    expect(progress.fieldCount).toBe(1);
  });

  it('reports 0% rather than NaN for a form with nothing to fill', async () => {
    const progress = await progressFor([slide('empty', [])]);

    expect(progress.fieldCount).toBe(0);
    expect(progress.filledPercent).toBe(0);
    expect(progress.completeCount).toBe(0);
  });
});
