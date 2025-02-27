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

import {animate, state, style, transition, trigger} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  isDevMode,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'dino-langs-file-uploader',
  templateUrl: './langs-file-uploader.html',
  styleUrls: ['./langs-file-uploader.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({opacity: 100})),
      transition('* => void', [animate(300, style({opacity: 0}))]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LangsFileUploader {
  @Output() readonly errors: EventEmitter<string> = new EventEmitter<string>();
  @Output() readonly name: EventEmitter<string> = new EventEmitter<string>();
  @Output() readonly uploaded: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  set fileType(fileType: string) {
    this._fileType = fileType;
  }

  private _fileType: string = '';

  onChange(event: any): void {
    if (event != null && event.target != null && event.target.files != null) {
      const fileList: FileList = event.target.files;
      const file = fileList[0];
      const fileReader: FileReader = new FileReader();
      fileReader.onloadend = () => {
        if (this._fileType === 'json') {
          const res = fileReader.result as string;
          if (this._isJson(res)) {
            this.uploaded.emit(res);
            const name = file.name.split('.')[0] ? file.name.split('.')[0] : file.name;
            this.name.emit(name);
          } else {
            this.errors.emit(`file is not a json`);
          }
        }
      };
      fileReader.readAsText(file);
    }
  }

  private _isJson(str: string): boolean {
    try {
      JSON.parse(str);
    } catch (e) {
      if (isDevMode()) console.log(e);
      return false;
    }
    return true;
  }
}
