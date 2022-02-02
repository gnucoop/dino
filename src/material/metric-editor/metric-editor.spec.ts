import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';

import {AreaManager} from '../../core/areas';
import {CaseManager} from '../../core/cases';
import {DataService, Metric, PermissionContextService} from '../../core/data';

import {MetricEditor, MetricEditorModule} from './index';

const dataServiceMock = {
  createCollection: () => of(true),
  find: () => of({exec: () => Promise.resolve({})}),
} as unknown as DataService;

const permissionContextServiceMock = {} as PermissionContextService;

const mockDialogRef = {
  close: () => of(null),
  open: () => of(null),
  backdropClick: () => of(null),
};

const mockMetric: Metric = {
  name: 'mockMetric',
  id: '',
  created_at: '',
  updated_at: '',
  parent_id: null,
  parent_name: null,
};

describe('Metric Editor', () => {
  let fixtureEditor: ComponentFixture<MetricEditor>;
  let editor: MetricEditor;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MetricEditorModule, RouterTestingModule, MatDialogModule, BrowserAnimationsModule],
      providers: [
        {provide: MatDialogRef, useValue: mockDialogRef},
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            metricManager: new AreaManager(dataServiceMock, permissionContextServiceMock),
            metricItem: mockMetric,
            metricAction: 'edit',
          },
        },
      ],
    }).compileComponents();
    fixtureEditor = TestBed.createComponent<MetricEditor>(MetricEditor);
    editor = fixtureEditor.componentInstance;
  });

  it('should create the component', async () => {
    await fixtureEditor.whenStable();
    fixtureEditor.detectChanges();

    expect(editor).toBeTruthy();
  });
});
