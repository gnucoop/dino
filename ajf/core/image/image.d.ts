/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
import { ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AjfImageIcon } from './image-icon';
import { AjfImageType } from './image-type';
import * as i0 from "@angular/core";
export declare abstract class AjfImage implements OnDestroy, OnInit {
    private _el;
    private _renderer;
    private _domSanitizer;
    iconComponent: ElementRef | undefined;
    /**
     * if 0 take image by url
     * if 1 take image by icon
     * if 2 take image by class
     *
     */
    set type(type: AjfImageType | null);
    set imageUrl(imageUrl: string | null);
    set icon(icon: AjfImageIcon | null);
    set flag(flag: string | null);
    readonly imageTypes: typeof AjfImageType;
    private _imageType;
    readonly imageType: Observable<AjfImageType | null>;
    private _url;
    readonly url: Observable<string | SafeResourceUrl | null>;
    private _iconObj;
    readonly iconObj: Observable<AjfImageIcon | null>;
    private _flagName;
    readonly flagName: Observable<string | null>;
    private _iconSub;
    constructor(_el: ElementRef, _renderer: Renderer2, _domSanitizer: DomSanitizer);
    ngOnDestroy(): void;
    ngOnInit(): void;
    private _updateIconSize;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfImage, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AjfImage, never, never, { "type": { "alias": "type"; "required": false; }; "imageUrl": { "alias": "imageUrl"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "flag": { "alias": "flag"; "required": false; }; }, {}, never, never, false, never>;
}
//# sourceMappingURL=image.d.ts.map