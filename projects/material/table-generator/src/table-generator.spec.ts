import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TableGeneratorModule} from './table-generator.module';
import {TableGenerator} from './table-generator';

describe('Table Generator', () => {
  let fixtureTableGenerator: ComponentFixture<TableGenerator>;
  let tableGenerator: TableGenerator;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, TableGeneratorModule],
      providers: [],
    }).compileComponents();

    fixtureTableGenerator = TestBed.createComponent(TableGenerator);
    tableGenerator = fixtureTableGenerator.componentInstance;
  });

  it('should create the component', async () => {
    await fixtureTableGenerator.whenStable();
    fixtureTableGenerator.detectChanges();

    expect(tableGenerator).toBeTruthy();
  });

  it('should call the handleData method when the csvFile is set', async () => {
    await fixtureTableGenerator.whenStable();
    fixtureTableGenerator.detectChanges();

    let handleDataSpy = spyOn<any>(tableGenerator, '_handleData').and.callThrough();

    let csv = [
      '"1","val1","val2","val3","val4"',
      '"2","val1","val2","val3","val4"',
      '"3","val1","val2","val3","val4"',
    ].join('\n');
    let csvBlob = new Blob([csv], {type: 'text/csv;charset=utf-8'});
    let csvFile = new File([csvBlob], 'csvfile.csv');
    tableGenerator.setCsvFile = csvFile;

    await fixtureTableGenerator.whenStable();
    fixtureTableGenerator.detectChanges();

    expect(handleDataSpy).toHaveBeenCalled();
  });

  it('should render null cells with the placeholder, without touching real values', async () => {
    tableGenerator.emptyCellPlaceholder = '—';
    tableGenerator.setJsonData = [
      {sentiment: null, score: 0, flagged: false, txt: 'ottimo servizio', empty: ''},
    ] as any;

    await fixtureTableGenerator.whenStable();
    fixtureTableGenerator.detectChanges();

    const cells = fixtureTableGenerator.nativeElement.querySelectorAll('mat-cell');
    const texts = Array.from(cells).map((cell: any) => cell.textContent.trim());

    expect(texts).toEqual(['—', '0', 'false', 'ottimo servizio', '']);
    expect(fixtureTableGenerator.nativeElement.textContent).not.toContain('null');
  });

  it('should leave null cells blank when no placeholder is set', async () => {
    tableGenerator.setJsonData = [{sentiment: null}] as any;

    await fixtureTableGenerator.whenStable();
    fixtureTableGenerator.detectChanges();

    const cell = fixtureTableGenerator.nativeElement.querySelector('mat-cell');

    expect(cell.textContent.trim()).toEqual('');
  });
});
