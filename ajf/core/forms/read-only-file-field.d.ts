import { ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AjfBaseFieldComponent } from './base-field';
import { AjfFormRendererService } from './form-renderer';
import { AjfWarningAlertService } from './warning-alert-service';
import * as i0 from "@angular/core";
/**
 * This component allows you to download the file contained in the control of
 * the form inherited from AjfBaseFieldComponent.
 *
 * @export
 * @class AjfReadOnlyFileFieldComponent
 */
export declare class AjfReadOnlyFileFieldComponent extends AjfBaseFieldComponent {
    readonly fileIcon: SafeResourceUrl;
    readonly fileUrl: Observable<SafeResourceUrl | null>;
    readonly fileName: Observable<string>;
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService, domSanitizer: DomSanitizer);
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfReadOnlyFileFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfReadOnlyFileFieldComponent, "ajf-read-only-file-field", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=read-only-file-field.d.ts.map