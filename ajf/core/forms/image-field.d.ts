import { ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AjfBaseFieldComponent } from './base-field';
import { AjfFormRendererService } from './form-renderer';
import { AjfWarningAlertService } from './warning-alert-service';
import * as i0 from "@angular/core";
/**
 * It allows the loading of image url inside an AjfForm.
 *
 * @export
 * @class AjfImageFieldComponent
 */
export declare class AjfImageFieldComponent extends AjfBaseFieldComponent {
    readonly imageUrl: Observable<SafeResourceUrl | null>;
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService, domSanitizer: DomSanitizer);
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfImageFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfImageFieldComponent, "ajf-image-field", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=image-field.d.ts.map