import {Component, ViewChild} from '@angular/core';
import {Case, CaseManager} from '@dino/core/cases';
import {ActionType, ListAction, ListHeader} from '@dino/core/list';
import {MetricSection} from '@dino/material/metric-section';

@Component({
  selector: 'app-cases',
  templateUrl: './cases-e2e.component.html',
})
export class MatCasesE2E {
  @ViewChild(MetricSection) section!: MetricSection;
  readonly manager: CaseManager;
  readonly headers: ListHeader<Case>[] = [
    {column: 'id', label: 'ID', displayed: false},
    {column: 'name', label: 'Name', displayed: true, sortable: true},
    {column: 'code', label: 'Code', displayed: true},
    {column: 'parent_name', label: 'Parent Case', displayed: true},
    {column: 'created_at', label: 'Creation Date', sortable: true, displayed: false},
  ];
  readonly readOnlyFields: string[] = ['code'];
  readonly onClickRowActions: ActionType[] = ['select', 'expand'];
  readonly listRowActions: ListAction[] = [
    {
      actionType: 'view',
      matIcon: 'visibility',
      customAction: row => this.section.openDialog(row, 'View'),
    },
    {
      actionType: 'edit',
      matIcon: 'create',
      customAction: row => this.section.openDialog(row, 'Edit'),
    },
    {
      actionType: 'delete',
      matIcon: 'delete',
      askConfirm: true,
    },
  ];

  constructor(private _caseManager: CaseManager) {
    this.manager = this._caseManager;
  }
}
