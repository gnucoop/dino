/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dewco (dewco).
 *
 * Dewco (dewco) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dewco (dewco) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dewco (dewco).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Renderer2,
} from '@angular/core';

@Directive({selector: '[DewcoDefaultOption]'})
export class DewcoDefaultOptionDirective implements AfterViewInit {
  constructor(
      private _elemRef: ElementRef, private _renderer: Renderer2, private _cdr: ChangeDetectorRef) {
  }
  ngAfterViewInit() {
    const element = this._elemRef.nativeElement;
    const optionText = element.querySelector('.mat-option-text');
    const html = optionText.innerHTML;
    const addedHtmlStyle = 'position: absolute; right: 0px;';
    const addedHtml =
        `<span style="${addedHtmlStyle}" class="material-icons"> arrow_drop_up </span>`;

    this._renderer.setStyle(element, 'padding-bottom', '15px');
    this._renderer.setStyle(element, 'padding-top', '15px');
    optionText.style.fontWeight = '500';
    this._renderer.setProperty(optionText, 'innerHTML', `${html} ${addedHtml}`);
    this._cdr.detectChanges();
  }
}
