/**
 * @license
 * Copyright (C) 2020 Gnucoop soc. coop.
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

import {Component, ElementRef, Injector, Input, OnInit} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {EXAMPLE_COMPONENTS} from '@dewco/material-examples';

/** Loads an example component from `@angular/material-examples` */
@Component({
  selector: 'example-viewer',
  template: `
    <div *ngIf="!id">
      Could not find example {{id}}
    </div>
  `,
})
export class ExampleViewer implements OnInit {
  /** ID of the material example to display. */
  @Input() id: string;

  constructor(private _elementRef: ElementRef<HTMLElement>, private _injector: Injector) {}

  ngOnInit() {
    let exampleElementCtor = customElements.get(this.id);

    if (!exampleElementCtor) {
      exampleElementCtor =
          createCustomElement(EXAMPLE_COMPONENTS[this.id].component, {injector: this._injector});

      customElements.define(this.id, exampleElementCtor);
    }

    this._elementRef.nativeElement.appendChild(new exampleElementCtor(this._injector));
  }
}
