import { AfterViewInit, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { AjfFieldHost } from './field-host';
import { AjfFieldInstance } from './interface/fields-instances/field-instance';
import { AjfFieldComponentsMap } from './interface/fields/field-components-map';
import * as i0 from "@angular/core";
/**
 * It is a base wrapper of every ajfField.
 * It manages what type of component to load(editable component or readonly component)
 * by input instance.
 *
 * @export
 * @abstract
 * @class AjfFormField
 */
export declare abstract class AjfFormField implements AfterViewInit, OnDestroy, OnInit {
    private _cdr;
    fieldHost: AjfFieldHost;
    private _instance;
    get instance(): AjfFieldInstance | undefined;
    set instance(instance: AjfFieldInstance | undefined);
    /**
     * if true mean that component need to be a readonly component
     *
     * @private
     */
    private _readonly;
    get readonly(): boolean;
    set readonly(readonly: boolean);
    private _componentInstance;
    private _init;
    protected abstract componentsMap: AjfFieldComponentsMap;
    private _updatedSub;
    constructor(_cdr: ChangeDetectorRef);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnInit(): void;
    /**
     * It builds a new AjfField component by fieldType and binds it to the fieldHost.
     *
     * @private
     * @return {*}
     */
    private _loadComponent;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFormField, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AjfFormField, never, never, { "instance": { "alias": "instance"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; }, {}, never, never, false, never>;
}
//# sourceMappingURL=field.d.ts.map