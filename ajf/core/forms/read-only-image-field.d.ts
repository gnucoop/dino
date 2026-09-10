import { ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AjfBaseFieldComponent } from './base-field';
import { AjfFormRendererService } from './form-renderer';
import { AjfWarningAlertService } from './warning-alert-service';
import * as i0 from "@angular/core";
/**
 * This component allows you to show the image related to url contained in the control of
 * the form inherited from AjfBaseFieldComponent.
 *
 * @export
 * @class AjfReadOnlyImageFieldComponent
 */
export declare class AjfReadOnlyImageFieldComponent extends AjfBaseFieldComponent {
    readonly imageUrl: Observable<SafeResourceUrl | null>;
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService, domSanitizer: DomSanitizer);
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfReadOnlyImageFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfReadOnlyImageFieldComponent, "ajf-read-only-image-field", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=read-only-image-field.d.ts.map