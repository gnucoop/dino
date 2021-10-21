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
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {BehaviorSubject, fromEvent} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {MixedEditorItem} from './mixed-editor-item';

/**
 * Dino Mixed Items editor component.
 * Can Create or Edit a List that is comprised of Items of different types,
 * and save the resulting object with the provided custom save method.
 */
@Component({
  selector: 'dino-mixed-editor',
  templateUrl: 'mixed-editor.html',
  styleUrls: ['mixed-editor.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MixedEditor implements AfterViewInit {
  /**
   * The list to be saved.
   */
  saveList: MixedEditorItem[] = [];

  /**
   * The list of all items available to the editor.
   */
  @Input() sourceList: BehaviorSubject<MixedEditorItem[]>;

  /**
   * The list saving method.
   */
  @Input() saveListMethod: (list: MixedEditorItem[], listName: string) => void;

  /**
   * The optional list validation method.
   */
  @Input() validateListMethod?: (list: MixedEditorItem[]) => boolean;

  /**
   * The optional close method.
   */
  @Input() closeMethod?: () => void;

  /**
   * If true, the editor is opened in view mode (no editing and saving).
   */
  @Input() viewOnly?: boolean;

  /**
   * The text input filtering the source list.
   */
  @ViewChild('search', {static: true}) search: ElementRef<HTMLInputElement>;

  /**
   * The text input for assigning a name to the saved list.
   */
  @ViewChild('saveListName', {static: true}) saveListName: ElementRef<HTMLInputElement>;

  constructor(private _cdr: ChangeDetectorRef) {}

  /**
   * Moves an item from the source list to the target list.
   * @param item  A list item
   */
  addItem(item: MixedEditorItem | undefined): void {
    if (item == null) {
      return;
    }
    const itemAlreadyExists = this.saveList.find(itm => itm.itemId === item.itemId);
    const typeAlreadyExists =
      item.uniqueItem && this.saveList.find(itm => itm.itemType === item.itemType);

    if (!itemAlreadyExists && !typeAlreadyExists) {
      const idx = this.sourceList.value.findIndex(doc => doc.itemId === item.itemId);
      this.sourceList.value.splice(idx, 1);
      this.saveList.push(item);

      if (item.uniqueItem) {
        this._toggleSameTypeItems(item, true);
      }
      this._toggleChildrenItems(item, 'add');

      this.sourceList.value.sort((a, b) => this._sortAlphabetically(a, b));
      this.saveList.sort((a, b) => this._sortAlphabetically(a, b));
    }

    this._cdr.detectChanges();
  }

  /**
   * Removes an item from the target list, returning it to the source list.
   * @param item  A list item
   */
  removeItem(item: MixedEditorItem | undefined): void {
    if (item == null) {
      return;
    }
    const itemAlreadyExists = this.sourceList.value.find(itm => itm.itemId === item.itemId);

    if (!itemAlreadyExists) {
      const idx = this.saveList.findIndex(doc => doc.itemId === item.itemId);
      this.saveList.splice(idx, 1);
      this.sourceList.value.unshift(item);

      if (item.uniqueItem) {
        this._toggleSameTypeItems(item, false);
      }
      this._toggleChildrenItems(item, 'remove');

      this.sourceList.value.sort((a, b) => this._sortAlphabetically(a, b));
      this.saveList.sort((a, b) => this._sortAlphabetically(a, b));
    }

    this._cdr.detectChanges();
  }

  /**
   * Finds an Item by id in the desired mixed list.
   * @param itemId The id of the searched item
   * @param list The list string identifier. Defaults to the source list.
   * @returns The found Item, or undefined
   */
  findItem(itemId: string, list: 'source' | 'save' = 'source'): MixedEditorItem | undefined {
    const searchInList = list == 'source' ? this.sourceList.value : this.saveList;
    return searchInList.find(itm => itm.itemId === itemId);
  }

  /**
   * If a custom Save method is provided, the target list is saved by calling it.
   */
  saveMixedList(): void {
    const saveName = this.saveListName.nativeElement.value;
    if (this.saveListMethod == null || saveName == null || saveName === '') {
      return;
    }
    this.saveListMethod(this.saveList, this.saveListName.nativeElement.value);
  }

  /**
   * If a custom Close method is provided, it is called when the Close button is clicked.
   */
  onClose(): void {
    if (this.closeMethod == null) {
      return;
    }
    this.closeMethod();
  }

  /**
   * Validates the target list before saving it, checking the Listname and the optionally
   * provided validate method.
   */
  validateSaveList(): boolean {
    const saveName = this.saveListName.nativeElement.value;
    if (saveName == null || saveName === '') {
      return false;
    }
    if (this.validateListMethod == null) {
      return true;
    }
    return this.validateListMethod(this.saveList);
  }

  /**
   * Updates the filtered source list.
   * @param evt The input event of the "Search" input
   */
  updateFilter(evt: any) {
    this.sourceList.next(
      this.sourceList.value.map(item => {
        if (evt.target == null) {
          return item;
        }
        return item.itemName
          .toLocaleLowerCase()
          .trim()
          .match(evt.target.value.toLocaleLowerCase().trim())
          ? {...item, displayed: true}
          : {...item, displayed: false};
      }),
    );

    this.sourceList.value.sort((a, b) => this._sortAlphabetically(a, b));
    this._cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    fromEvent(this.search.nativeElement, 'keydown')
      .pipe(debounceTime(300))
      .subscribe(event => {
        this.updateFilter(event as any);
      });
  }

  /**
   * Sorts list items alphabetically by their itemName property.
   * @param a Prev item
   * @param b Next Item
   * @returns Sort order
   */
  private _sortAlphabetically(a: MixedEditorItem, b: MixedEditorItem): number {
    let textA = a.itemName.toUpperCase();
    let textB = b.itemName.toUpperCase();
    const less = textA < textB;
    const more = textA > textB;
    if (less) {
      return -1;
    } else if (more) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * Toggles the disabled state of all Items with the same type as the moved Item type.
   * @param item The moved list item
   * @param disable The disabled state of the toggled items
   */
  private _toggleSameTypeItems(item: MixedEditorItem, disable: boolean): void {
    this.sourceList.next(
      this.sourceList.value.map(itm => {
        if (itm.itemType === item.itemType) {
          return {...itm, disabled: disable};
        }
        return itm;
      }),
    );
  }

  /**
   * Toggles the disabled state of all Items whose common ancestor is the moved Item.
   * @param item The moved list item
   * @param operation The action performed on the moved Item
   */
  private _toggleChildrenItems(item: MixedEditorItem, operation: 'add' | 'remove'): void {
    const childrenItems = this._findDescendantItems(item);

    this.sourceList.value.map(itm => {
      if (childrenItems.find(childItem => childItem.itemId === itm.itemId)) {
        return {
          ...itm,
          disabled: operation === 'add' ? true : false,
        };
      }
      return itm;
    });
  }

  /**
   * Finds all the list items that have the passed Item as an ancestor.
   * @param item The ancestor Item
   * @returns All the descendant items
   */
  private _findDescendantItems(item: MixedEditorItem): MixedEditorItem[] {
    let items: MixedEditorItem[] = [];
    this.sourceList.value.map(itm => {
      if (itm.itemParentId === item.itemId) {
        items.push(itm);
        items.push(...this._findDescendantItems(itm));
      }
    });
    return items;
  }
}
