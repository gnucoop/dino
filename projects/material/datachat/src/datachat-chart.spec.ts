import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {provideRouter} from '@angular/router';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {DataChatChart} from './datachat-chart';
import {DataChatModule} from './datachat.module';
import {DataChatChartSpec} from './datachat.interfaces';

describe('Data Chat Chart', () => {
  let fixture: ComponentFixture<DataChatChart>;
  let chart: DataChatChart;

  const barSpec: DataChatChartSpec = {
    type: 'bar',
    labels: ['1', '2', '3', '4'],
    datasets: [{label: 'Risposte', data: [20, 71, 273, 440]}],
    title: 'Distribuzione della soddisfazione complessiva',
    x_label: 'Nel complesso quanto sei soddisfatto/a della formazione?',
    y_label: 'numero di risposte',
    stacked: false,
  };

  /* setInput goes through the same path as a template binding, so ngOnChanges fires */
  const draw = async (spec: DataChatChartSpec) => {
    fixture.componentRef.setInput('spec', spec);
    await fixture.whenStable();
    fixture.detectChanges();
  };

  const canvas = () => fixture.nativeElement.querySelector('canvas');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, DataChatModule],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DataChatChart);
    chart = fixture.componentInstance;
  });

  it('should draw a valid bar chart', async () => {
    await draw(barSpec);

    expect(chart.status).toEqual('ok');
    expect(chart.chartType).toEqual('bar');
    expect(canvas()).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Distribuzione della soddisfazione');
  });

  it('should not draw a chart whose data does not match its labels', async () => {
    await draw({...barSpec, datasets: [{label: 'Risposte', data: [20, 71]}]});

    expect(chart.status).toEqual('invalid');
    expect(canvas()).toBeNull();
    /* The title is still shown, so the user knows which chart is missing */
    expect(fixture.nativeElement.textContent).toContain('Distribuzione della soddisfazione');
  });

  it('should report no data for empty or all null datasets', async () => {
    await draw({...barSpec, datasets: []});
    expect(chart.status).toEqual('empty');

    await draw({...barSpec, datasets: [{label: 'Risposte', data: [null, null, null, null]}]});
    expect(chart.status).toEqual('empty');
    expect(canvas()).toBeNull();
  });

  it('should not draw an unknown chart type', async () => {
    await draw({...barSpec, type: 'sunburst'});

    expect(chart.status).toEqual('invalid');
    expect(chart.chartType).toBeUndefined();
  });

  it('should draw the api plot kinds as their chart type', async () => {
    await draw({...barSpec, type: 'hist'});
    expect(chart.chartType).toEqual('bar');

    await draw({...barSpec, type: 'kde'});
    expect(chart.chartType).toEqual('line');

    await draw({...barSpec, type: 'area'});
    expect(chart.chartType).toEqual('line');
  });

  it('should draw a horizontal bar chart, keeping the order it receives', async () => {
    const labels = ['INTELLIGENZA ARTIFICIALE - Edizione Special', 'DIGITAL FUNDRAISING', 'EXCEL'];
    await draw({
      ...barSpec,
      labels,
      datasets: [{label: 'media', data: [3.573, 3.552, 3.539]}],
      horizontal: true,
    });

    expect(chart.chartType).toEqual('horizontalBar');
    expect(chart.status).toEqual('ok');
    /* Datasets arrive sorted largest first and the first entry is drawn at the top:
     * neither the categories nor the axis may be re-ordered. */
    expect((chart as any)._chart.data.labels).toEqual(labels);
    expect((chart as any)._chart.data.datasets[0].data).toEqual([3.573, 3.552, 3.539]);
  });

  it('should label and truncate the category axis of a horizontal bar chart', async () => {
    /* Read the options as built: Chart.js merges a default tick callback of its own
     * into every axis, which would hide where the truncation was actually put. */
    const builtScales = async (spec: DataChatChartSpec) => {
      await draw(spec);
      return ((chart as any)._buildOptions(spec) as any).scales;
    };

    const horizontal = await builtScales({...barSpec, horizontal: true});

    /* The categories move to the y axis, and x_label names them wherever they are */
    expect(horizontal.yAxes[0].scaleLabel.labelString).toEqual(barSpec.x_label);
    expect(horizontal.xAxes[0].scaleLabel.labelString).toEqual(barSpec.y_label);
    expect(horizontal.yAxes[0].ticks.callback).toBeDefined();
    expect(horizontal.xAxes[0].ticks.callback).toBeUndefined();

    const vertical = await builtScales(barSpec);

    expect(vertical.xAxes[0].scaleLabel.labelString).toEqual(barSpec.x_label);
    expect(vertical.yAxes[0].scaleLabel.labelString).toEqual(barSpec.y_label);
    expect(vertical.xAxes[0].ticks.callback).toBeDefined();
    expect(vertical.yAxes[0].ticks.callback).toBeUndefined();
  });

  it('should keep a chart vertical unless it is a bar chart asking for it', async () => {
    await draw({...barSpec, type: 'hist'});
    expect(chart.chartType).toEqual('bar');

    await draw({...barSpec, type: 'line', horizontal: true});
    expect(chart.chartType).toEqual('line');
  });

  it('should draw a pie with too many slices as a bar chart', async () => {
    const labels = Array.from({length: 9}, (_, idx) => `slice ${idx}`);
    await draw({
      type: 'pie',
      labels,
      datasets: [{label: 'Raccomandazione', data: labels.map((_, idx) => idx + 1)}],
      title: 'Molte fette',
    });

    expect(chart.chartType).toEqual('bar');
    expect(chart.status).toEqual('ok');
  });

  it('should keep a pie with few slices a pie', async () => {
    await draw({
      type: 'pie',
      labels: ['probabile', 'molto_probabile', 'poco_probabile', 'improbabile'],
      datasets: [{label: 'Raccomandazione', data: [409, 309, 64, 22]}],
      title: 'Probabilità di raccomandare la formazione',
    });

    expect(chart.chartType).toEqual('pie');
    expect(canvas()).toBeTruthy();
  });

  it('should draw a scatter chart of x/y points without labels', async () => {
    await draw({
      type: 'scatter',
      labels: null,
      datasets: [
        {
          label: 'chiarezza vs soddisfazione',
          data: [
            {x: 3, y: 4},
            {x: 2, y: 2},
          ],
        },
      ],
      x_label: 'Chiarezza',
      y_label: 'Soddisfazione',
    });

    expect(chart.status).toEqual('ok');
    expect(chart.chartType).toEqual('scatter');
    expect(canvas()).toBeTruthy();
  });

  it('should not draw a chart with a malformed series', async () => {
    await draw({
      ...barSpec,
      datasets: [{label: 'Risposte', data: [20, 71, 273, 440]}, {label: 'broken'} as any],
    });

    /* Dropping the broken series would leave a chart that looks complete */
    expect(chart.status).toEqual('invalid');
  });

  it('should not draw a scatter chart of flat values', async () => {
    await draw({type: 'scatter', labels: null, datasets: [{label: 'x', data: [1, 2, 3]}]});

    expect(chart.status).toEqual('invalid');
  });

  it('should destroy the chart when the component is destroyed', async () => {
    await draw(barSpec);
    const destroySpy = spyOn((chart as any)._chart, 'destroy').and.callThrough();

    fixture.destroy();

    expect(destroySpy).toHaveBeenCalled();
  });
});
