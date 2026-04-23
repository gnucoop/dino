import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'dinoapp-langs',
  templateUrl: './langs.component.html',
  styleUrls: ['./langs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LangsComponent {
 
}
