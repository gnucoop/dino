import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'dinoapp-reports-collect',
  templateUrl: './reports-collect.component.html',
  styleUrls: ['./reports-collect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class ReportsCollectComponent {
  readonly noReportsMessage =
    'There are not any Reports currently available. Please add a Report to start reviewing data.';
  constructor() {}
}
