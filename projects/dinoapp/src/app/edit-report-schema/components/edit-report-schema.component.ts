import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'dinoapp-edit-report-schema',
  templateUrl: './edit-report-schema.component.html',
  styleUrls: ['./edit-report-schema.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EditReportSchemaComponent {
  constructor() {}
}
