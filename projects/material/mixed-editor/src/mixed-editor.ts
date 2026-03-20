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
import {BehaviorSubject, fromEvent, Observable, of as obsOf} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {MixedEditorItem} from './mixed-editor-item';

/**
 * Dino Mixed Items editor component.
 * Can Create or Edit a List that is comprised of Items of different types,
 * and save the resulting object with the provided custom save method.
 */
@Component({
  selector: 'dino-mixed-editor',
  templateUrl: 'mixed-editor.html',
  styleUrls: ['mixed-editor.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MixedEditor implements AfterViewInit {
  /**
   * The list to be saved.
   */
  saveList: {[key: string]: MixedEditorItem[]} = {};

  /**
   * The list of all items available to the editor, grouped by type.
   */
  @Input() sourceList = new BehaviorSubject<{[key: string]: MixedEditorItem[]}>({});

  /**
   * A list of all mixedItems types currently present in the sourceList.
   */
  mixedItemTypes: Observable<{type: string; icon: string; label: string}[]> = obsOf([]);

  // BehaviorSubject for the public filteredSourceList$ observable
  private readonly _filteredSubject = new BehaviorSubject<{[key: string]: MixedEditorItem[]}>({});

  /**
   * Filtered source list emitting only items with displayed===true per type.
   * Updated by updateFilter() (avoids *ngIf inside *ngFor in the template)
   */
  readonly filteredSourceList$: Observable<{[key: string]: MixedEditorItem[]}> =
    this._filteredSubject.asObservable();

  /**
   * Whether the current saveList passes validation (bound in template instead
   * of calling validateSaveList() on every change-detection cycle).
   */
  isSaveValid = false;

  /**
   * Pre-computed tooltip strings keyed by itemId, to avoid calling getTooltip()
   * on every change-detection cycle.
   */
  readonly tooltipCache = new Map<string, string>();

  /**
   * The list saving method.
   */
  @Input() saveListMethod: (list: {[key: string]: MixedEditorItem[]}, listName: string) => void =
    () => {};

  /**
   * The optional list validation method.
   */
  @Input() validateListMethod?: (list: {[key: string]: MixedEditorItem[]}) => boolean;

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
  @ViewChild('search', {static: true}) search!: ElementRef<HTMLInputElement>;

  /**
   * The text input for assigning a name to the saved list.
   */
  @ViewChild('saveListName', {static: true}) saveListName!: ElementRef<HTMLInputElement>;

  constructor(private _cdr: ChangeDetectorRef) {}

  /**
   * TrackBy function for item lists
   */
  trackById(_index: number, item: MixedEditorItem): string {
    return item.itemId;
  }

  /**
   * TrackBy function for type tab list.
   */
  trackByType(_index: number, t: {type: string}): string {
    return t.type;
  }

  /**
   * Moves an item from the source list to the target list.
   * @param item  A list item
   */
  addItem(item: MixedEditorItem | undefined, withChildren: boolean = false): void {
    if (item == null) {
      return;
    }
    if (!this.saveList[item.itemType]) {
      this.saveList[item.itemType] = [];
    }
    const itemAlreadyExists = this.saveList[item.itemType].find(itm => itm.itemId === item.itemId);
    const typeAlreadyExists = item.uniqueItem && this.saveList[item.itemType].length > 0;

    if (!itemAlreadyExists && !typeAlreadyExists) {
      const idx = this.sourceList.value[item.itemType].findIndex(doc => doc.itemId === item.itemId);

      // Create new array references so cdkVirtualFor detects the change
      const newSource = [...this.sourceList.value[item.itemType]];
      newSource.splice(idx, 1);
      this.sourceList.value[item.itemType] = newSource.sort((a, b) =>
        this._sortAlphabetically(a, b),
      );

      this.saveList[item.itemType] = [...this.saveList[item.itemType], item].sort((a, b) =>
        this._sortAlphabetically(a, b),
      );

      if (item.uniqueItem) {
        this._toggleSameTypeItems(item, true);
      }
      if (withChildren) {
        this._toggleChildrenItems(item, 'add');
      }

      this._refreshFilteredList();
      this._refreshSaveValid();
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
    const itemAlreadyExists = this.sourceList.value[item.itemType].find(
      itm => itm.itemId === item.itemId,
    );

    this._toggleChildrenItems(item, 'remove');

    if (!itemAlreadyExists) {
      const idx = this.saveList[item.itemType].findIndex(doc => doc.itemId === item.itemId);

      // Create new array references so cdkVirtualFor detects the change
      this.saveList[item.itemType] = this.saveList[item.itemType]
        .filter((_, i) => i !== idx)
        .sort((a, b) => this._sortAlphabetically(a, b));

      this.sourceList.value[item.itemType] = [item, ...this.sourceList.value[item.itemType]].sort(
        (a, b) => this._sortAlphabetically(a, b),
      );

      if (item.uniqueItem) {
        this._toggleSameTypeItems(item, false);
      }

      this._refreshFilteredList();
      this._refreshSaveValid();
    }

    this._cdr.detectChanges();
  }

  /**
   * Finds an item by id in the desired mixed list if the lists are initialised,
   * otherwise finds in the initial source complete list.
   * @param itemId The id of the searched item
   * @param list The list string identifier. Defaults to the source list.
   * @returns The found Item, or undefined
   */
  findItem(itemId: string, list: 'source' | 'save' = 'source'): MixedEditorItem | undefined {
    const searchInList = list == 'source' ? this.sourceList.value : this.saveList;
    let item: MixedEditorItem | undefined = undefined;
    Object.keys(searchInList).forEach(itemType => {
      if (!item) {
        item = searchInList[itemType].find(itm => itm.itemId === itemId);
      }
    });
    return item;
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
    Object.keys(this.sourceList.value).forEach(itemsType => {
      this.sourceList.value[itemsType].forEach(item => {
        if (evt.target != null) {
          if (
            item.itemName
              .toLocaleLowerCase()
              .trim()
              .match(evt.target.value.toLocaleLowerCase().trim())
          ) {
            item.displayed = true;
          } else {
            item.displayed = false;
          }
        }
      });
    });
    this._refreshFilteredList();
    this._cdr.detectChanges();
  }

  /**
   * Called when the save-name input changes to keep isSaveValid in sync.
   */
  onSaveNameInput(): void {
    this._refreshSaveValid();
    this._cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    this.mixedItemTypes = this.sourceList.pipe(
      map(mixedItemsByType => {
        const allTypes: {type: string; icon: string; label: string}[] = [];
        Object.keys(mixedItemsByType).forEach(itemsType => {
          if (mixedItemsByType[itemsType] && mixedItemsByType[itemsType].length) {
            const item = mixedItemsByType[itemsType][0];
            if (!allTypes.find(t => t.type === item.itemType)) {
              allTypes.push({
                type: item.itemType,
                icon: item.itemIcon,
                label: this._capitalize(item.itemType.replace(/_/g, ' ')),
              });
            }
          }
        });
        return allTypes;
      }),
    );

    // Build the tooltip cache once from the initial source list.
    this._rebuildTooltipCache();

    // Build the initial filtered list.
    this._refreshFilteredList();

    fromEvent(this.search.nativeElement, 'keydown')
      .pipe(debounceTime(300))
      .subscribe(event => {
        this.updateFilter(event as any);
      });
  }

  /**
   * Generates the Mixed Item tooltip label.
   * @param item MixedEditorItem
   * @returns The tooltip label
   */
  getTooltip(item: MixedEditorItem): string {
    if (item == null) {
      return '';
    }
    let tip = item.itemType.replace('_', ' ');
    tip = tip.charAt(0).toUpperCase() + tip.slice(1);
    return tip;
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
    this.sourceList.value[item.itemType].forEach(itm => {
      itm.disabled = disable;
    });
    this._cdr.detectChanges();
  }

  /**
   * Toggles the disabled state of all Items whose common ancestor is the moved Item.
   * @param item The moved list item
   * @param operation The action performed on the moved Item
   */
  private _toggleChildrenItems(item: MixedEditorItem, operation: 'add' | 'remove'): void {
    const childrenItems = this._findDescendantItems(item, operation);

    childrenItems.forEach(item =>
      operation === 'add' ? this.addItem(item) : this.removeItem(item),
    );
  }

  /**
   * Finds all the list items that have the passed Item as an ancestor.
   * @param item The ancestor Item
   * @returns All the descendant items
   */
  private _findDescendantItems(
    item: MixedEditorItem,
    operation: 'add' | 'remove',
  ): MixedEditorItem[] {
    let items: MixedEditorItem[] = [];
    const list =
      operation === 'add' ? this.sourceList.value[item.itemType] : this.saveList[item.itemType];

    list.map(itm => {
      if (itm.itemParentId === item.itemId) {
        items.push(itm);
        items.push(...this._findDescendantItems(itm, operation));
      }
    });
    return items;
  }

  /**
   * Capitalizes strings
   * @param str
   * @returns
   */
  private _capitalize(str: string) {
    return str[0].toUpperCase() + str.slice(1);
  }

  /**
   * Rebuilds the tooltip cache from all items currently in both
   * sourceList and saveList.
   */
  private _rebuildTooltipCache(): void {
    const addToCache = (item: MixedEditorItem) => {
      if (!this.tooltipCache.has(item.itemId)) {
        this.tooltipCache.set(item.itemId, this.getTooltip(item));
      }
    };
    Object.values(this.sourceList.value).forEach(list => list.forEach(addToCache));
    Object.values(this.saveList).forEach(list => list.forEach(addToCache));
  }

  /**
   * Rebuilds the filteredSourceList$ by filtering items with displayed===true.
   * Called after every filter/add/remove operation.
   */
  private _refreshFilteredList(): void {
    const filtered: {[key: string]: MixedEditorItem[]} = {};
    Object.keys(this.sourceList.value).forEach(type => {
      filtered[type] = this.sourceList.value[type].filter(item => item.displayed);
    });
    this._filteredSubject.next(filtered);
  }

  /**
   * Updates isSaveValid
   */
  private _refreshSaveValid(): void {
    this.isSaveValid = this.validateSaveList();
  }
}
