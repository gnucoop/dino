import {Component} from '@angular/core';

import {additionalConfig} from '../mockconfig';

@Component({
  selector: 'app-edit-form-schema',
  templateUrl: './edit-form-schema-e2e.component.html',
})
export class MatEditFormSchemaE2E {
  readonly formConvUrl = additionalConfig.formconv_post_url;
}
