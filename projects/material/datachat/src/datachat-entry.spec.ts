import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {provideRouter} from '@angular/router';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TableGenerator} from '@dino/material/table-generator';
import {DataChatEntry} from './datachat-entry';
import {DataChatModule} from './datachat.module';
import {DataChatQA} from './datachat.interfaces';

describe('Data Chat Entry', () => {
  let fixture: ComponentFixture<DataChatEntry>;
  let entry: DataChatEntry;

  const truncatedTable: DataChatQA = {
    componentData: {
      component: TableGenerator,
      inputs: {setJsonData: [{txt: 'ottimo servizio', sentiment: 'positive'}]},
    },
    noPrompt: true,
    truncated: true,
    totalRows: 530,
    totalColumns: 14,
    previewRows: 20,
    previewColumns: 2,
    downloadUrl: '/datachat/export/b3e2ed0fd6c44683858ef641542b108b',
    downloadFilename: 'sentiment_txt.csv',
    note: '12 rows could not be analyzed: their sentiment is empty, not neutral.',
  };

  const completeTable: DataChatQA = {
    componentData: {component: TableGenerator, inputs: {setJsonData: [{city: 'Roma', n: 1}]}},
    noPrompt: true,
    truncated: false,
    totalRows: 2,
    totalColumns: 2,
    previewRows: 2,
    previewColumns: 2,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, DataChatModule],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DataChatEntry);
    entry = fixture.componentInstance;
  });

  it('should show the preview banner before the table', async () => {
    entry.qa = truncatedTable;
    await fixture.whenStable();
    fixture.detectChanges();

    const banner = fixture.nativeElement.querySelector('.dino-datachat-entry-preview');
    const table = fixture.nativeElement.querySelector('.dino-datachat-entry-component-response');

    expect(banner).toBeTruthy();
    expect(table).toBeTruthy();
    /* Node.DOCUMENT_POSITION_FOLLOWING: the table comes after the banner */
    expect(banner.compareDocumentPosition(table) & 4).toBeTruthy();
  });

  it('should show no banner and no download button for a complete result', async () => {
    entry.qa = completeTable;
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.dino-datachat-entry-preview')).toBeNull();
    expect(fixture.nativeElement.querySelector('.dino-datachat-entry-download')).toBeNull();
    expect(fixture.nativeElement.querySelector('.dino-datachat-entry-note')).toBeNull();
  });

  it('should render the note verbatim, even on a complete result', async () => {
    const note = 'First line of the caveat.\nSecond line, <b>not</b> markup.';
    entry.qa = {...completeTable, note};
    await fixture.whenStable();
    fixture.detectChanges();

    const noteEl = fixture.nativeElement.querySelector('.dino-datachat-entry-note span:last-child');

    expect(noteEl.textContent).toEqual(note);
    expect(noteEl.querySelector('b')).toBeNull();
  });

  it('should label the download button with the file name', async () => {
    entry.qa = truncatedTable;
    await fixture.whenStable();
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.dino-datachat-entry-download button');

    expect(button.textContent).toContain('sentiment_txt.csv');
  });

  it('should emit the download url and file name on click', async () => {
    entry.qa = truncatedTable;
    await fixture.whenStable();
    fixture.detectChanges();
    let emitted: {url: string; filename: string} | null = null;
    entry.downloadClick.subscribe(evt => (emitted = evt));

    fixture.nativeElement.querySelector('.dino-datachat-entry-download button').click();

    expect(emitted).not.toBeNull();
    expect(emitted!.url).toEqual(truncatedTable.downloadUrl!);
    expect(emitted!.filename).toEqual('sentiment_txt.csv');
  });

  it('should render one chart component per chart of the answer', async () => {
    const chart = {type: 'bar', labels: ['1'], datasets: [{label: 'Risposte', data: [20]}]};
    entry.qa = {...completeTable, charts: [chart, {...chart, title: 'second'}]};
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('dino-datachat-chart').length).toEqual(2);
  });

  it('should render charts of a text answer that never mentions them', async () => {
    const chart = {type: 'bar', labels: ['1'], datasets: [{label: 'Risposte', data: [20]}]};
    entry.qa = {
      response: 'Questo dataset contiene 804 risposte.',
      noPrompt: true,
      charts: [chart],
    };
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('dino-datachat-chart').length).toEqual(1);
  });

  it('should render charts of an answer with no prose at all', async () => {
    const chart = {type: 'bar', labels: ['1'], datasets: [{label: 'Risposte', data: [20]}]};
    entry.qa = {noPrompt: true, charts: [chart]};
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('dino-datachat-chart').length).toEqual(1);
  });

  it('should render no chart component when the answer has no charts', async () => {
    entry.qa = completeTable;
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('dino-datachat-chart').length).toEqual(0);
  });

  it('should detect dropped columns only when some are missing', () => {
    expect(entry.hasDroppedColumns(truncatedTable)).toBeTrue();
    expect(entry.hasDroppedColumns(completeTable)).toBeFalse();
    expect(entry.hasDroppedColumns({truncated: true})).toBeFalse();
  });
});
