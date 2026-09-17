import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslocoModule} from '@ngneat/transloco';

import {applyMappings, ColumnMapping, ImportField, warningGroup} from './import-model';
import {ImportWizard} from './import-wizard';
import {ImportWizardModule} from './import-wizard.module';

const csv = [
  '"district","sub_county","notes"',
  '"lamwo","padibe","first"',
  '"arua","vurra","second"',
].join('\n');

const fields: ImportField[] = [
  {name: 'district', label: 'District of residence', essential: true},
  {name: 'sub_county', essential: true},
  {name: 'created_at'},
  {name: 'children', repeatable: true},
];

describe('Import Wizard', () => {
  let fixture: ComponentFixture<ImportWizard>;
  let wizard: ImportWizard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, ImportWizardModule, TranslocoModule],
    }).compileComponents();
    fixture = TestBed.createComponent(ImportWizard);
    wizard = fixture.componentInstance;
    wizard.fields = fields;
  });

  it('should read the file and build one mapping per column', done => {
    fixture.detectChanges();
    wizard.onExcelfileSelected({target: {files: [new Blob([csv], {type: 'text/csv'})]}});
    // The FileReader is asynchronous: wait for the mappings instead of a fixed delay
    const check = (tries: number): void => {
      if (!wizard.columnMappings.length && tries > 0) {
        setTimeout(() => check(tries - 1), 10);
        return;
      }
      expect(wizard.columnMappings.map(m => m.column)).toEqual(['district', 'sub_county', 'notes']);
      // A column named like a field is prefilled, the others are left to the user
      expect(wizard.columnMappings.map(m => m.field)).toEqual(['district', 'sub_county', null]);
      expect(wizard.step).toBe(2);
      done();
    };
    check(100);
  });

  it('should prefill a column whose name matches a field', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const mapping = (wizard as any)._buildColumnMapping('district');
    expect(mapping.field).toBe('district');
    // A repeatable field also matches the `name__<index>` form
    const repeated = (wizard as any)._buildColumnMapping('children__2');
    expect(repeated.field).toBe('children');
    expect(repeated.repetition).toBe(2);
    // Anything else is left to the user
    expect((wizard as any)._buildColumnMapping('unknown').field).toBeNull();
  });

  it('should not allow the import when a field is mapped by more than one column', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const applySpy = jasmine.createSpy('apply');
    wizard.apply.subscribe(applySpy);
    (wizard as any)._file = new Blob([csv], {type: 'text/csv'});
    wizard.columnMappings = [
      {column: 'district', field: 'district'},
      {column: 'sub_county', field: 'district'},
    ];
    wizard.onMappingChange(wizard.columnMappings[1], 'district');

    expect(wizard.duplicateFields).toEqual(['district']);
    expect(wizard.canApply).toBe(false);
    wizard.applyImport();
    expect(applySpy).not.toHaveBeenCalled();
  });

  it('should require at least one essential field to be mapped', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    (wizard as any)._file = new Blob([csv], {type: 'text/csv'});
    // created_at is not essential: on its own it is not enough
    wizard.columnMappings = [{column: 'created_at', field: 'created_at'}];
    expect(wizard.canApply).toBe(false);
    expect(wizard.applyHint).toContain('Map at least one field');
    wizard.columnMappings = [{column: 'district', field: 'district'}];
    expect(wizard.canApply).toBe(true);
    expect(wizard.applyHint).toBe('');
  });

  it('should show the field name and keep the label for the tooltip', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    expect(wizard.fieldName('district')).toBe('district');
    expect(wizard.fieldLabel('district')).toBe('District of residence');
    // A field with no label falls back to its name on both
    expect(wizard.fieldName('created_at')).toBe('created_at');
    expect(wizard.fieldLabel('created_at')).toBe('created_at');
    // The search runs on the name, the value shown in the option
    wizard.fieldFilterCtrl.setValue('distr');
    expect(wizard.isFieldVisible('district')).toBe(true);
    expect(wizard.isFieldVisible('created_at')).toBe(false);
    wizard.fieldFilterCtrl.setValue('residence');
    expect(wizard.isFieldVisible('district')).toBe(false);
  });

  it('should show the result step as soon as the host sets an outcome', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const closedSpy = jasmine.createSpy('closed');
    wizard.closed.subscribe(closedSpy);
    wizard.outcome = {
      status: 'success',
      message: 'done',
      counts: [{label: 'Rows imported', value: 2, tone: 'ok'}],
      warnings: [],
    };
    expect(wizard.step).toBe(3);
    // The wizard is left by hand, so that the result can be read
    expect(closedSpy).not.toHaveBeenCalled();
    wizard.closeOutcome();
    expect(closedSpy).toHaveBeenCalledTimes(1);
  });

  it('should cap a group and report how many entries are hidden', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const items = Array.from({length: 14}, (_, i) => ({text: `id-${i}`}));
    const group = warningGroup('Invalid ids', items, 'values');
    expect(group.count).toBe(14);
    expect(group.items.length).toBe(10);
    expect(wizard.hiddenItems(group)).toBe(4);
  });

  describe('applyMappings', () => {
    it('should rename the keys and drop the unmapped columns', () => {
      const mappings: ColumnMapping[] = [
        {column: 'District', field: 'district'},
        {column: 'notes', field: null},
      ];
      expect(applyMappings([{District: 'lamwo', notes: 'to be ignored'}], mappings)).toEqual([
        {district: 'lamwo'},
      ]);
    });

    it('should leave the skipped mappings to the caller', () => {
      const mappings: ColumnMapping[] = [
        {column: 'a', field: 'children'},
        {column: 'b', field: 'district'},
      ];
      const rows = applyMappings([{a: '1', b: 'lamwo'}], mappings, m => m.field === 'children');
      expect(rows).toEqual([{district: 'lamwo'}]);
    });
  });
});
