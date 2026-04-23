import {ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {Case, CaseManager} from '@dino/core/cases';
import {ActionType, ListAction, ListHeader} from '@dino/core/list';
import {MetricSection} from '@dino/material/metric-section';

import {environment} from 'src/environments/environment';
import * as conf from '../conf';

@Component({
  selector: 'dinoapp-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CasesComponent {
  @ViewChild(MetricSection) section: MetricSection | undefined;
  readonly manager: CaseManager;
  readonly headers: ListHeader<Case>[] = conf.headers;
  readonly readOnlyFields: string[] = conf.readOnlyFields;
  readonly onClickRowActions: ActionType[] = conf.onClickRowActions;
  readonly logoImagePath: string | null = environment.customImagesConfig?.logoLight || null;
  readonly listRowActions: ListAction[] = [
    {
      actionType: 'edit',
      matIcon: 'create',
      customAction: row => this.section?.openDialog(row, 'Edit'),
    },
    {
      actionType: 'print',
      matIcon: 'printer',
      customAction: row => this.section?.printCaseCardPdf(row),
    },
    {
      actionType: 'view',
      matIcon: 'visibility',
      customAction: row => this.section?.openDialog(row, 'View'),
    },
    {
      actionType: 'delete',
      matIcon: 'delete',
      customAction: row => this.section?.openDeleteDialog(row),
    },
  ];

  constructor(private _caseManager: CaseManager) {
    this.manager = this._caseManager;
  }
}
