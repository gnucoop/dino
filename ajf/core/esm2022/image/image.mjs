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
import { Directive, Input, RendererStyleFlags2, } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AjfImageType } from './image-type';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
export class AjfImage {
    /**
     * if 0 take image by url
     * if 1 take image by icon
     * if 2 take image by class
     *
     */
    set type(type) {
        this._imageType.next(type);
    }
    set imageUrl(imageUrl) {
        imageUrl = typeof imageUrl === 'string' ? imageUrl : '';
        this._url.next(imageUrl.startsWith('data:image/svg+xml;base64,')
            ? this._domSanitizer.bypassSecurityTrustResourceUrl(imageUrl)
            : imageUrl);
    }
    set icon(icon) {
        this._iconObj.next(icon);
    }
    set flag(flag) {
        this._flagName.next(flag);
    }
    constructor(_el, _renderer, _domSanitizer) {
        this._el = _el;
        this._renderer = _renderer;
        this._domSanitizer = _domSanitizer;
        this.imageTypes = AjfImageType;
        this._imageType = new BehaviorSubject(null);
        this.imageType = this
            ._imageType;
        this._url = new BehaviorSubject(null);
        this.url = this._url;
        this._iconObj = new BehaviorSubject(null);
        this.iconObj = this
            ._iconObj;
        this._flagName = new BehaviorSubject(null);
        this.flagName = this._flagName;
        this._iconSub = Subscription.EMPTY;
        this._iconSub = this.iconObj.subscribe(() => this._updateIconSize());
    }
    ngOnDestroy() {
        if (this._iconSub && !this._iconSub.closed) {
            this._iconSub.unsubscribe();
        }
    }
    ngOnInit() {
        this._updateIconSize();
    }
    _updateIconSize() {
        const icon = this._iconObj.getValue();
        if (icon == null) {
            return;
        }
        const styles = this._el.nativeElement.style;
        if (this.iconComponent == null || styles == null || styles.fontSize == null) {
            return;
        }
        const fontSize = styles.fontSize;
        if (fontSize.match(/^[0-9]+px$/) != null) {
            const el = this.iconComponent.nativeElement;
            this._renderer.setStyle(el, 'width', fontSize, RendererStyleFlags2.Important);
            this._renderer.setStyle(el, 'height', fontSize, RendererStyleFlags2.Important);
        }
    }
    static { this.ɵfac = function AjfImage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfImage)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i1.DomSanitizer)); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AjfImage, inputs: { type: "type", imageUrl: "imageUrl", icon: "icon", flag: "flag" } }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfImage, [{
        type: Directive
    }], () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.DomSanitizer }], { type: [{
            type: Input
        }], imageUrl: [{
            type: Input
        }], icon: [{
            type: Input
        }], flag: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2ltYWdlL3NyYy9pbWFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssRUFJTCxtQkFBbUIsR0FDcEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLGVBQWUsRUFBYyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFHL0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGNBQWMsQ0FBQzs7O0FBRzFDLE1BQU0sT0FBZ0IsUUFBUTtJQUc1Qjs7Ozs7T0FLRztJQUNILElBQ0ksSUFBSSxDQUFDLElBQXlCO1FBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUNJLFFBQVEsQ0FBQyxRQUF1QjtRQUNsQyxRQUFRLEdBQUcsT0FBTyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUN4RCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDWixRQUFRLENBQUMsVUFBVSxDQUFDLDRCQUE0QixDQUFDO1lBQy9DLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLDhCQUE4QixDQUFDLFFBQVEsQ0FBQztZQUM3RCxDQUFDLENBQUMsUUFBUSxDQUNiLENBQUM7SUFDSixDQUFDO0lBRUQsSUFDSSxJQUFJLENBQUMsSUFBeUI7UUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQ0ksSUFBSSxDQUFDLElBQW1CO1FBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFzQkQsWUFDVSxHQUFlLEVBQ2YsU0FBb0IsRUFDcEIsYUFBMkI7UUFGM0IsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUNmLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsa0JBQWEsR0FBYixhQUFhLENBQWM7UUF2QjVCLGVBQVUsR0FBRyxZQUFZLENBQUM7UUFFM0IsZUFBVSxHQUFHLElBQUksZUFBZSxDQUFzQixJQUFJLENBQUMsQ0FBQztRQUMzRCxjQUFTLEdBQW9DLElBQUk7YUFDdkQsVUFBNkMsQ0FBQztRQUV6QyxTQUFJLEdBQUcsSUFBSSxlQUFlLENBQWtDLElBQUksQ0FBQyxDQUFDO1FBQ2pFLFFBQUcsR0FBZ0QsSUFBSSxDQUFDLElBRWhFLENBQUM7UUFFTSxhQUFRLEdBQUcsSUFBSSxlQUFlLENBQXNCLElBQUksQ0FBQyxDQUFDO1FBQ3pELFlBQU8sR0FBb0MsSUFBSTthQUNyRCxRQUEyQyxDQUFDO1FBRXZDLGNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBZ0IsSUFBSSxDQUFDLENBQUM7UUFDcEQsYUFBUSxHQUE4QixJQUFJLENBQUMsU0FBc0MsQ0FBQztRQUVuRixhQUFRLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQU9wQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlCLENBQUM7SUFDSCxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRU8sZUFBZTtRQUNyQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3RDLElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ2pCLE9BQU87UUFDVCxDQUFDO1FBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO1FBQzVDLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLElBQUksTUFBTSxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQzVFLE9BQU87UUFDVCxDQUFDO1FBQ0QsTUFBTSxRQUFRLEdBQVcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUN6QyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7WUFDekMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7WUFDNUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDOUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakYsQ0FBQztJQUNILENBQUM7eUdBdkZtQixRQUFRO29FQUFSLFFBQVE7O2lGQUFSLFFBQVE7Y0FEN0IsU0FBUzs4RkFXSixJQUFJO2tCQURQLEtBQUs7WUFNRixRQUFRO2tCQURYLEtBQUs7WUFXRixJQUFJO2tCQURQLEtBQUs7WUFNRixJQUFJO2tCQURQLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG4gIFJlbmRlcmVyU3R5bGVGbGFnczIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZJbWFnZUljb259IGZyb20gJy4vaW1hZ2UtaWNvbic7XG5pbXBvcnQge0FqZkltYWdlVHlwZX0gZnJvbSAnLi9pbWFnZS10eXBlJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmSW1hZ2UgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIGljb25Db21wb25lbnQ6IEVsZW1lbnRSZWYgfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIGlmIDAgdGFrZSBpbWFnZSBieSB1cmxcbiAgICogaWYgMSB0YWtlIGltYWdlIGJ5IGljb25cbiAgICogaWYgMiB0YWtlIGltYWdlIGJ5IGNsYXNzXG4gICAqXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgdHlwZSh0eXBlOiBBamZJbWFnZVR5cGUgfCBudWxsKSB7XG4gICAgdGhpcy5faW1hZ2VUeXBlLm5leHQodHlwZSk7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgaW1hZ2VVcmwoaW1hZ2VVcmw6IHN0cmluZyB8IG51bGwpIHtcbiAgICBpbWFnZVVybCA9IHR5cGVvZiBpbWFnZVVybCA9PT0gJ3N0cmluZycgPyBpbWFnZVVybCA6ICcnO1xuICAgIHRoaXMuX3VybC5uZXh0KFxuICAgICAgaW1hZ2VVcmwuc3RhcnRzV2l0aCgnZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCwnKVxuICAgICAgICA/IHRoaXMuX2RvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoaW1hZ2VVcmwpXG4gICAgICAgIDogaW1hZ2VVcmwsXG4gICAgKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBpY29uKGljb246IEFqZkltYWdlSWNvbiB8IG51bGwpIHtcbiAgICB0aGlzLl9pY29uT2JqLm5leHQoaWNvbik7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgZmxhZyhmbGFnOiBzdHJpbmcgfCBudWxsKSB7XG4gICAgdGhpcy5fZmxhZ05hbWUubmV4dChmbGFnKTtcbiAgfVxuXG4gIHJlYWRvbmx5IGltYWdlVHlwZXMgPSBBamZJbWFnZVR5cGU7XG5cbiAgcHJpdmF0ZSBfaW1hZ2VUeXBlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxBamZJbWFnZVR5cGUgfCBudWxsPihudWxsKTtcbiAgcmVhZG9ubHkgaW1hZ2VUeXBlOiBPYnNlcnZhYmxlPEFqZkltYWdlVHlwZSB8IG51bGw+ID0gdGhpc1xuICAgIC5faW1hZ2VUeXBlIGFzIE9ic2VydmFibGU8QWpmSW1hZ2VUeXBlIHwgbnVsbD47XG5cbiAgcHJpdmF0ZSBfdXJsID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmcgfCBTYWZlUmVzb3VyY2VVcmwgfCBudWxsPihudWxsKTtcbiAgcmVhZG9ubHkgdXJsOiBPYnNlcnZhYmxlPHN0cmluZyB8IFNhZmVSZXNvdXJjZVVybCB8IG51bGw+ID0gdGhpcy5fdXJsIGFzIE9ic2VydmFibGU8XG4gICAgc3RyaW5nIHwgU2FmZVJlc291cmNlVXJsIHwgbnVsbFxuICA+O1xuXG4gIHByaXZhdGUgX2ljb25PYmogPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkltYWdlSWNvbiB8IG51bGw+KG51bGwpO1xuICByZWFkb25seSBpY29uT2JqOiBPYnNlcnZhYmxlPEFqZkltYWdlSWNvbiB8IG51bGw+ID0gdGhpc1xuICAgIC5faWNvbk9iaiBhcyBPYnNlcnZhYmxlPEFqZkltYWdlSWNvbiB8IG51bGw+O1xuXG4gIHByaXZhdGUgX2ZsYWdOYW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgcmVhZG9ubHkgZmxhZ05hbWU6IE9ic2VydmFibGU8c3RyaW5nIHwgbnVsbD4gPSB0aGlzLl9mbGFnTmFtZSBhcyBPYnNlcnZhYmxlPHN0cmluZyB8IG51bGw+O1xuXG4gIHByaXZhdGUgX2ljb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIF9kb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgKSB7XG4gICAgdGhpcy5faWNvblN1YiA9IHRoaXMuaWNvbk9iai5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fdXBkYXRlSWNvblNpemUoKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faWNvblN1YiAmJiAhdGhpcy5faWNvblN1Yi5jbG9zZWQpIHtcbiAgICAgIHRoaXMuX2ljb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGVJY29uU2l6ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlSWNvblNpemUoKTogdm9pZCB7XG4gICAgY29uc3QgaWNvbiA9IHRoaXMuX2ljb25PYmouZ2V0VmFsdWUoKTtcbiAgICBpZiAoaWNvbiA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHN0eWxlcyA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuc3R5bGU7XG4gICAgaWYgKHRoaXMuaWNvbkNvbXBvbmVudCA9PSBudWxsIHx8IHN0eWxlcyA9PSBudWxsIHx8IHN0eWxlcy5mb250U2l6ZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGZvbnRTaXplOiBzdHJpbmcgPSBzdHlsZXMuZm9udFNpemU7XG4gICAgaWYgKGZvbnRTaXplLm1hdGNoKC9eWzAtOV0rcHgkLykgIT0gbnVsbCkge1xuICAgICAgY29uc3QgZWwgPSB0aGlzLmljb25Db21wb25lbnQubmF0aXZlRWxlbWVudDtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGVsLCAnd2lkdGgnLCBmb250U2l6ZSwgUmVuZGVyZXJTdHlsZUZsYWdzMi5JbXBvcnRhbnQpO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoZWwsICdoZWlnaHQnLCBmb250U2l6ZSwgUmVuZGVyZXJTdHlsZUZsYWdzMi5JbXBvcnRhbnQpO1xuICAgIH1cbiAgfVxufVxuIl19