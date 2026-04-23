import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'dinoapp-edit-form-schema',
  templateUrl: './edit-form-schema.component.html',
  styleUrls: ['./edit-form-schema.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EditFormSchemaComponent {
  readonly formConvUrl = environment.dataConfig.formconv_post_url;

  constructor() {}
}
