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
});
