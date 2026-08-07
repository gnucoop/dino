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
import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';

/**
 * The narrowest a column can be dragged to, in pixels.
 */
const MIN_COLUMN_WIDTH = 80;

/**
 * The class of the element dragged to resize a column.
 */
const GRIP_CLASS = 'dino-column-resize-grip';

/**
 * The class set on the body while a column is being resized.
 */
const RESIZING_CLASS = 'dino-column-resizing';

/**
 * The size of a column, as the User drags its grip.
 */
export interface ColumnResizeEvent {
  /**
   * The name of the resized column
   */
  column: string;
  /**
   * The width of the column, in pixels
   */
  width: number;
}

/**
 * Adds to a list header cell a grip that resizes its column.
 *
 * The grip swallows its own pointer events: the same header cell is a drag
 * source, which reorders the columns, and may be a sort button.
 * The directive does not size anything itself, it only tells how wide the
 * column should be: the list binds the width of every cell of the column, so
 * that a single writer decides it.
 */
@Directive({selector: '[dinoColumnResize]'})
export class ColumnResize implements OnInit, OnDestroy {
  /**
   * The name of the column the header cell belongs to
   */
  @Input('dinoColumnResize') column = '';

  /**
   * Emitted, at most once per frame, while the grip is dragged
   */
  @Output() readonly columnResize: EventEmitter<ColumnResizeEvent> =
    new EventEmitter<ColumnResizeEvent>();

  /**
   * Emitted with the final width, when the grip is released
   */
  @Output() readonly columnResizeEnd: EventEmitter<ColumnResizeEvent> =
    new EventEmitter<ColumnResizeEvent>();

  /**
   * The grip element added to the header cell
   */
  private _grip: HTMLElement | null = null;

  /**
   * Removes the listeners of the grip
   */
  private _teardown: (() => void)[] = [];

  /**
   * The pointer position and the column width when the drag started
   */
  private _start: {x: number; width: number} | null = null;

  /**
   * The width emitted on the next frame, and the frame waiting for it
   */
  private _pendingWidth = 0;
  private _pendingFrame: number | null = null;

  constructor(
    private _el: ElementRef<HTMLElement>,
    private _renderer: Renderer2,
    private _zone: NgZone,
  ) {}

  ngOnInit(): void {
    const grip = this._renderer.createElement('span') as HTMLElement;
    this._renderer.addClass(grip, GRIP_CLASS);
    this._renderer.appendChild(this._el.nativeElement, grip);
    this._grip = grip;

    // Dragging a grip fires an event per pointer move: it must not run a change
    // detection of its own, the emissions are throttled to one per frame.
    this._zone.runOutsideAngular(() => {
      this._teardown.push(
        this._renderer.listen(grip, 'pointerdown', (evt: PointerEvent) => this._onDown(evt)),
        this._renderer.listen(grip, 'pointermove', (evt: PointerEvent) => this._onMove(evt)),
        this._renderer.listen(grip, 'pointerup', (evt: PointerEvent) => this._onUp(evt)),
        this._renderer.listen(grip, 'pointercancel', (evt: PointerEvent) => this._onUp(evt)),
        // The header cell is a drag source and a sort button: a click on the
        // grip is never one of the two.
        this._renderer.listen(grip, 'click', (evt: MouseEvent) => evt.stopPropagation()),
        this._renderer.listen(grip, 'mousedown', (evt: MouseEvent) => evt.stopPropagation()),
      );
    });
  }

  ngOnDestroy(): void {
    this._cancelPendingFrame();
    this._teardown.forEach(teardown => teardown());
    this._teardown = [];
    if (this._grip) {
      this._renderer.removeChild(this._el.nativeElement, this._grip);
      this._grip = null;
    }
    this._renderer.removeClass(document.body, RESIZING_CLASS);
  }

  /**
   * Starts the resize, keeping the event away from the drag source and from
   * the sort button of the header cell.
   */
  private _onDown(evt: PointerEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this._start = {x: evt.clientX, width: this._el.nativeElement.offsetWidth};
    this._grip?.setPointerCapture(evt.pointerId);
    this._renderer.addClass(document.body, RESIZING_CLASS);
  }

  /**
   * Follows the pointer, emitting the width of the column once per frame.
   */
  private _onMove(evt: PointerEvent): void {
    if (this._start == null) {
      return;
    }
    evt.preventDefault();
    this._pendingWidth = Math.max(MIN_COLUMN_WIDTH, this._start.width + evt.clientX - this._start.x);
    if (this._pendingFrame != null) {
      return;
    }
    this._pendingFrame = requestAnimationFrame(() => {
      this._pendingFrame = null;
      this._zone.run(() => this.columnResize.emit({column: this.column, width: this._pendingWidth}));
    });
  }

  /**
   * Ends the resize with the width the column keeps.
   */
  private _onUp(evt: PointerEvent): void {
    if (this._start == null) {
      return;
    }
    this._cancelPendingFrame();
    const width = Math.max(MIN_COLUMN_WIDTH, this._start.width + evt.clientX - this._start.x);
    this._start = null;
    this._grip?.releasePointerCapture(evt.pointerId);
    this._renderer.removeClass(document.body, RESIZING_CLASS);
    this._zone.run(() => this.columnResizeEnd.emit({column: this.column, width}));
  }

  private _cancelPendingFrame(): void {
    if (this._pendingFrame != null) {
      cancelAnimationFrame(this._pendingFrame);
      this._pendingFrame = null;
    }
  }
}
