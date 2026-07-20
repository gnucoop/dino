import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from 'src/environments/environment';

/**
 * Full-page host for the Form Data import wizard.
 * Reads the target form schema id from the route and delegates the wizard UI
 * and logic to the shared `dino-import-form` component, projecting the app
 * breadcrumbs into it. On completion/cancel it returns to the form-data list.
 */
@Component({
  selector: 'dinoapp-import-form-page',
  templateUrl: './import-form-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ImportFormPageComponent {
  readonly formSchemaId: string | null =
    this._route.snapshot.paramMap.get('form_schema_id');

  readonly hasOptionalMetrics: boolean = environment.metricsConfig.optionalFormMetrics;

  constructor(private _route: ActivatedRoute, private _router: Router) {}

  /**
   * Returns to the form-data list of the current form schema.
   */
  back(): void {
    if (this.formSchemaId != null) {
      this._router.navigate(['forms', this.formSchemaId]);
    } else {
      this._router.navigate(['forms']);
    }
  }
}
