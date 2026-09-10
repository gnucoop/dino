import * as i0 from '@angular/core';
import { isDevMode, Directive, Input, EventEmitter, Output, Pipe, SecurityContext, NgModule } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { TranslocoPipe } from '@ajf/core/transloco';
import * as i1 from '@angular/platform-browser';

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
// eslint-disable-next-line
class ApplyStylesDirective {
    set applyStyles(cssStyles) {
        if (cssStyles != null && this._cssStyles !== cssStyles) {
            this._cssStyles = cssStyles;
            this._updateStyles();
        }
    }
    constructor(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this._cssStyles = {};
    }
    _updateStyles() {
        if (this._cssStyles == null) {
            return;
        }
        Object.keys(this._cssStyles).forEach((style) => {
            try {
                this._renderer.setStyle(this._el.nativeElement, style, `${this._cssStyles[style]}`);
            }
            catch (e) {
                if (isDevMode()) {
                    console.log(e);
                }
            }
        });
    }
    static { this.ɵfac = function ApplyStylesDirective_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApplyStylesDirective)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2)); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: ApplyStylesDirective, selectors: [["", "applyStyles", ""]], inputs: { applyStyles: "applyStyles" } }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApplyStylesDirective, [{
        type: Directive,
        args: [{ selector: '[applyStyles]' }]
    }], () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], { applyStyles: [{
            type: Input
        }] }); })();

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
// eslint-disable-next-line
class AutofocusDirective {
    constructor(_el) {
        this._el = _el;
        this.appAutoFocus = false;
    }
    ngAfterContentInit() {
        this._el.nativeElement.focus();
    }
    static { this.ɵfac = function AutofocusDirective_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AutofocusDirective)(i0.ɵɵdirectiveInject(i0.ElementRef)); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AutofocusDirective, selectors: [["", "autoFocus", ""]], inputs: { appAutoFocus: "appAutoFocus" } }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AutofocusDirective, [{
        type: Directive,
        args: [{ selector: '[autoFocus]' }]
    }], () => [{ type: i0.ElementRef }], { appAutoFocus: [{
            type: Input
        }] }); })();

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
const defaultOpts = {
    emptyString: 'Not specified',
    entriesDivider: ' - ',
    labelSuffix: ': ',
    valuesDivider: ', ',
};
const buildStringIdentifierOpts = (opts) => ({ ...defaultOpts, ...opts });
const buildStringIdentifier = (stringIdentifier, context, opts) => {
    const strings = { ...defaultOpts, ...opts };
    if (stringIdentifier == null) {
        return strings.emptyString;
    }
    const str = stringIdentifier.map(s => {
        const values = [];
        if (s.value != null && s.value.length > 0) {
            s.value.forEach(curValue => {
                const vp = curValue.split('.');
                let curContext = context;
                let val = null;
                vp.forEach(k => {
                    if (curContext[k] !== undefined) {
                        val = context[k];
                        curContext = context[k];
                    }
                });
                if (val != null && val instanceof Array && val.length > 0) {
                    val = val.map(v => `${v}`).join(', ');
                }
                if (val != null) {
                    values.push(`${val}`);
                }
            });
        }
        return `${s.label}: ${values.length > 0 ? values.join(', ') : strings.emptyString}`;
    });
    return str.join(' - ');
};

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
class AjfDndDirective {
    constructor() {
        this._file = new EventEmitter();
        this.file = this._file;
        this._over = false;
    }
    get over() {
        return this._over;
    }
    onDragOver(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this._over = true;
    }
    onDragLeave(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this._over = false;
    }
    onDrop(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        if (evt.dataTransfer == null || evt.dataTransfer.files.length === 0) {
            return;
        }
        let files = evt.dataTransfer.files;
        if (files.length > 0) {
            this._over = false;
            this._file.emit(files);
        }
    }
    static { this.ɵfac = function AjfDndDirective_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfDndDirective)(); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AjfDndDirective, selectors: [["", "ajfDnd", ""]], hostVars: 2, hostBindings: function AjfDndDirective_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("dragover", function AjfDndDirective_dragover_HostBindingHandler($event) { return ctx.onDragOver($event); })("dragleave", function AjfDndDirective_dragleave_HostBindingHandler($event) { return ctx.onDragLeave($event); })("drop", function AjfDndDirective_drop_HostBindingHandler($event) { return ctx.onDrop($event); });
        } if (rf & 2) {
            i0.ɵɵclassProp("ajf-dnd-over", ctx.over);
        } }, outputs: { file: "file" } }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfDndDirective, [{
        type: Directive,
        args: [{
                selector: '[ajfDnd]',
                host: {
                    '[class.ajf-dnd-over]': 'over',
                    '(dragover)': 'onDragOver($event)',
                    '(dragleave)': 'onDragLeave($event)',
                    '(drop)': 'onDrop($event)',
                },
            }]
    }], null, { file: [{
            type: Output
        }] }); })();

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
class FormatIfNumber extends DecimalPipe {
    transform(value, digitsInfo, locale) {
        if (typeof value === 'number') {
            return super.transform(value, digitsInfo, locale);
        }
        else {
            return value;
        }
    }
    static { this.ɵfac = /*@__PURE__*/ (() => { let ɵFormatIfNumber_BaseFactory; return function FormatIfNumber_Factory(__ngFactoryType__) { return (ɵFormatIfNumber_BaseFactory || (ɵFormatIfNumber_BaseFactory = i0.ɵɵgetInheritedFactory(FormatIfNumber)))(__ngFactoryType__ || FormatIfNumber); }; })(); }
    static { this.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ajfFormatIfNumber", type: FormatIfNumber, pure: true }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FormatIfNumber, [{
        type: Pipe,
        args: [{ name: 'ajfFormatIfNumber' }]
    }], null, null); })();

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
class TranslateIfString extends TranslocoPipe {
    transform(query, ...args) {
        if (typeof query === 'string') {
            return super.transform(query, ...args);
        }
        else {
            return query;
        }
    }
    static { this.ɵfac = /*@__PURE__*/ (() => { let ɵTranslateIfString_BaseFactory; return function TranslateIfString_Factory(__ngFactoryType__) { return (ɵTranslateIfString_BaseFactory || (ɵTranslateIfString_BaseFactory = i0.ɵɵgetInheritedFactory(TranslateIfString)))(__ngFactoryType__ || TranslateIfString); }; })(); }
    static { this.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ajfTranslateIfString", type: TranslateIfString, pure: true }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TranslateIfString, [{
        type: Pipe,
        args: [{ name: 'ajfTranslateIfString' }]
    }], null, null); })();

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
class SafeHtmlPipe {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(value) {
        if (!value)
            return '';
        const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
        const htmlText = stringValue.replace(/\r\n|\r|\n/g, '<br>');
        return this.sanitizer.sanitize(SecurityContext.HTML, htmlText) ?? '';
    }
    static { this.ɵfac = function SafeHtmlPipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SafeHtmlPipe)(i0.ɵɵdirectiveInject(i1.DomSanitizer, 16)); }; }
    static { this.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "safeHtml", type: SafeHtmlPipe, pure: true }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SafeHtmlPipe, [{
        type: Pipe,
        args: [{ name: 'safeHtml' }]
    }], () => [{ type: i1.DomSanitizer }], null); })();

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
class AjfCommonModule {
    static { this.ɵfac = function AjfCommonModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfCommonModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfCommonModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({}); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfCommonModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    AjfDndDirective,
                    ApplyStylesDirective,
                    AutofocusDirective,
                    FormatIfNumber,
                    SafeHtmlPipe,
                    TranslateIfString,
                ],
                exports: [
                    AjfDndDirective,
                    ApplyStylesDirective,
                    AutofocusDirective,
                    FormatIfNumber,
                    SafeHtmlPipe,
                    TranslateIfString,
                ],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AjfCommonModule, { declarations: [AjfDndDirective,
        ApplyStylesDirective,
        AutofocusDirective,
        FormatIfNumber,
        SafeHtmlPipe,
        TranslateIfString], exports: [AjfDndDirective,
        ApplyStylesDirective,
        AutofocusDirective,
        FormatIfNumber,
        SafeHtmlPipe,
        TranslateIfString] }); })();

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

/**
 * Generated bundle index. Do not edit.
 */

export { AjfCommonModule, AjfDndDirective, ApplyStylesDirective, AutofocusDirective, FormatIfNumber, SafeHtmlPipe, TranslateIfString, buildStringIdentifier, buildStringIdentifierOpts };
//# sourceMappingURL=ajf-core-common.mjs.map
