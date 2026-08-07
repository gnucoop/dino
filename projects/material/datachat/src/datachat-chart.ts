/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dino (dino).
 *
 * Dino (dino) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dino (dino) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dino (dino).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  isDevMode,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {Chart, ChartOptions, ChartType} from 'chart.js';
import {
  DataChatChartDataset,
  DataChatChartSpec,
  DataChatChartStatus,
} from './datachat.interfaces';

/**
 * The class applied to the body when the dark theme is active.
 * Reading it is how a canvas, which cannot resolve the theme css variables, knows
 * which palette to paint with. It is the darkThemeClass of angular-material-css-vars.
 */
const DARK_THEME_CLASS = 'isDarkTheme';

/**
 * The chart types drawn as they are received.
 */
const NATIVE_CHART_TYPES = ['bar', 'horizontalBar', 'line', 'pie', 'doughnut', 'scatter'];

/**
 * The chart types of the API that are drawn as another type.
 * The API documents its charts both as its own plot kinds and as chart types, so
 * both are accepted.
 */
const CHART_TYPE_ALIASES: {[kind: string]: ChartType} = {
  'hist': 'bar',
  'histogram': 'bar',
  'kde': 'line',
  'density': 'line',
  'area': 'line',
};

/**
 * The maximum number of slices of a pie chart. Above it, the same data is drawn as a
 * bar chart: a slice color would have to be reused, and two slices sharing a color
 * cannot be told apart.
 */
const MAX_PIE_SLICES = 8;

/**
 * The maximum length of a category label on an axis. The whole label is always
 * available in the tooltip.
 */
const MAX_TICK_LENGTH = 24;

/**
 * The categorical palette, in fixed order, one color per series. The dark steps are
 * the same hues, stepped for a dark surface.
 * Both sets are verified for color vision deficiency separation and for contrast
 * against their own surface.
 */
const CHART_PALETTE: {light: string[]; dark: string[]} = {
  light: [
    '#2a78d6',
    '#eb6834',
    '#1baf7a',
    '#eda100',
    '#e87ba4',
    '#008300',
    '#4a3aa7',
    '#e34948',
  ],
  dark: ['#3987e5', '#d95926', '#199e70', '#c98500', '#d55181', '#008300', '#9085e9', '#e66767'],
};

/**
 * The color of the labels, ticks and grid lines, per theme
 */
const CHART_INK: {light: string; dark: string} = {light: '#52514e', dark: '#c3c2b7'};

/**
 * The DataChatChart component.
 * Draws a chart specification received from the DataChat API. The API sends the data
 * and some semantic hints, never colors nor styling: palette, legend and theming
 * belong to the client.
 */
@Component({
  selector: 'dino-datachat-chart',
  styleUrls: ['datachat-chart.scss'],
  templateUrl: 'datachat-chart.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DataChatChart implements AfterViewInit, OnChanges, OnDestroy {
  /**
   * The chart specification to draw
   */
  @Input() spec?: DataChatChartSpec;

  /**
   * The canvas the chart is drawn on
   */
  @ViewChild('chartCanvas') chartCanvas?: ElementRef<HTMLCanvasElement>;

  /**
   * Whether the specification can be drawn. When it cannot, the title and the reason
   * are displayed in place of the chart.
   */
  status: DataChatChartStatus = 'ok';

  /**
   * The chart type the specification is drawn as, undefined when it cannot be drawn
   */
  get chartType(): ChartType | undefined {
    return this._chartType;
  }
  private _chartType?: ChartType;

  private _chart: Chart | null = null;
  /**
   * Watches the body classes, to repaint the chart when the theme is switched
   */
  private _themeObserver: MutationObserver | null = null;
  /**
   * True once the canvas exists and a chart can be drawn on it
   */
  private _viewInitialized = false;

  constructor(private _cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this._viewInitialized = true;
    this._drawChart();
    this._observeTheme();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this._viewInitialized && 'spec' in changes) {
      this._drawChart();
    }
  }

  /**
   * Repaints the chart whenever the theme changes
   */
  private _observeTheme(): void {
    if (typeof MutationObserver === 'undefined') return;
    let isDark = this._isDark();
    this._themeObserver = new MutationObserver(() => {
      if (this._isDark() === isDark) return;
      isDark = !isDark;
      this._drawChart();
    });
    this._themeObserver.observe(document.body, {attributeFilter: ['class']});
  }

  /**
   * Whether the dark theme is currently active
   */
  private _isDark(): boolean {
    return document.body.classList.contains(DARK_THEME_CLASS);
  }

  /**
   * The title of the chart, displayed as html so that a question long title wraps
   */
  get title(): string | null {
    return this.spec?.title ?? null;
  }

  /**
   * Destroys the current chart and draws the specification again
   */
  private _drawChart(): void {
    if (this._chart) {
      this._chart.destroy();
      this._chart = null;
    }
    this.status = this._resolveStatus();
    this._cdr.detectChanges();

    if (this.status !== 'ok' || !this.spec || !this._chartType) return;
    const canvas = this.chartCanvas?.nativeElement;
    const context = canvas?.getContext('2d');
    if (!context) return;

    try {
      this._chart = new Chart(context, {
        type: this._chartType,
        data: {
          labels: this._chartType === 'scatter' ? undefined : this.spec.labels ?? [],
          datasets: this._buildDatasets(this.spec),
        },
        options: this._buildOptions(this.spec),
      });
    } catch (err) {
      /* A specification can always turn out to be undrawable: say so, never throw. */
      if (isDevMode()) console.log(err);
      this.status = 'invalid';
      this._cdr.detectChanges();
    }
  }

  /**
   * Validates the specification and resolves the chart type it is drawn as.
   * @returns Whether the specification can be drawn
   */
  private _resolveStatus(): DataChatChartStatus {
    this._chartType = undefined;
    const spec = this.spec;
    if (!spec || !Array.isArray(spec.datasets)) return 'invalid';

    const datasets = spec.datasets;
    if (!datasets.length) return 'empty';
    /* A malformed series is never dropped: a chart missing a series looks complete. */
    if (datasets.some(dataset => dataset == null || !Array.isArray(dataset.data))) return 'invalid';
    if (datasets.every(dataset => dataset.data.every(value => value == null))) return 'empty';

    const type = this._resolveChartType(spec);
    if (!type) return 'invalid';

    if (type === 'scatter') {
      const points = datasets.every(dataset =>
        dataset.data.every(
          point =>
            point != null &&
            typeof point === 'object' &&
            typeof (point as any).x === 'number' &&
            typeof (point as any).y === 'number',
        ),
      );
      if (!points) return 'invalid';
    } else {
      /* Every other type draws values parallel to the labels. */
      const labels = spec.labels ?? [];
      if (datasets.some(dataset => dataset.data.length !== labels.length)) return 'invalid';
    }

    this._chartType = type;
    return 'ok';
  }

  /**
   * Resolves the chart type of a specification.
   * @param spec The chart specification
   * @returns The chart type to draw, undefined if it is unknown
   */
  private _resolveChartType(spec: DataChatChartSpec): ChartType | undefined {
    const kind = (spec.type ?? '').toString().trim();
    const type = NATIVE_CHART_TYPES.includes(kind)
      ? (kind as ChartType)
      : CHART_TYPE_ALIASES[kind.toLowerCase()];
    if (!type) return undefined;
    /* A pie needs one color per slice, and there are only so many distinguishable ones. */
    if ((type === 'pie' || type === 'doughnut') && (spec.labels ?? []).length > MAX_PIE_SLICES) {
      return 'bar';
    }
    /* Chart.js 2 has no indexAxis: a bar running left to right is its own chart type.
     * The categories keep the order they arrive in, so the largest bar, which the API
     * sends first, is drawn at the top. */
    if (type === 'bar' && spec.horizontal === true) return 'horizontalBar';
    return type;
  }

  /**
   * Builds the chart datasets, assigning a palette color to each of them.
   * @param spec The chart specification
   * @returns The Chart.js datasets
   */
  private _buildDatasets(spec: DataChatChartSpec): object[] {
    const palette = this._palette();
    const perSlice = this._chartType === 'pie' || this._chartType === 'doughnut';
    return spec.datasets.map((dataset: DataChatChartDataset, index: number) => {
      const color = palette[index % palette.length];
      const sliceColors = (dataset.data as unknown[]).map(
        (_, slice) => palette[slice % palette.length],
      );
      return {
        ...dataset,
        label: dataset.label ?? '',
        backgroundColor: perSlice ? sliceColors : color,
        borderColor: perSlice ? sliceColors : color,
        borderWidth: this._chartType === 'line' ? 2 : 1,
        pointBackgroundColor: color,
        /* Chart.js fills a line by default: only an area chart is filled. */
        fill: dataset.fill === true,
      };
    });
  }

  /**
   * Builds the chart options. Chart.js 2 nests its scales in xAxes/yAxes arrays.
   * @param spec The chart specification
   * @returns The Chart.js options
   */
  private _buildOptions(spec: DataChatChartSpec): ChartOptions {
    const isDark = this._isDark();
    const ink = isDark ? CHART_INK.dark : CHART_INK.light;
    const gridColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)';
    const stacked = spec.stacked === true;
    const circular = this._chartType === 'pie' || this._chartType === 'doughnut';

    const options: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      /* The title is displayed as html, so that a question long one wraps. */
      title: {display: false},
      legend: {
        display: spec.datasets.length > 1 || circular,
        position: 'bottom',
        labels: {fontColor: ink, boxWidth: 12},
      },
      tooltips: {enabled: true},
    };

    if (!circular) {
      const grid = {color: gridColor, zeroLineColor: gridColor};
      /* The categories are the labelled axis: x normally, y when the bars are
       * horizontal. x_label names them and y_label names the measure, whatever the
       * orientation, so the two follow their own axis. */
      const categoryAxis = {
        stacked,
        gridLines: grid,
        ticks: {fontColor: ink, callback: (value: string | number) => this._truncateTick(value)},
        ...(spec.x_label
          ? {scaleLabel: {display: true, labelString: spec.x_label, fontColor: ink}}
          : {}),
      };
      const valueAxis = {
        stacked,
        gridLines: grid,
        ticks: {fontColor: ink},
        ...(spec.y_label
          ? {scaleLabel: {display: true, labelString: spec.y_label, fontColor: ink}}
          : {}),
      };
      const horizontal = this._chartType === 'horizontalBar';
      options.scales = {
        xAxes: [horizontal ? valueAxis : categoryAxis],
        yAxes: [horizontal ? categoryAxis : valueAxis],
      };
    }
    return options;
  }

  /**
   * Shortens an axis label. Category labels are column names, and in a survey export
   * a column name is a whole question.
   * @param value The axis label
   * @returns The displayed axis label
   */
  private _truncateTick(value: string | number): string {
    const label = `${value}`;
    if (label.length <= MAX_TICK_LENGTH) return label;
    return `${label.slice(0, MAX_TICK_LENGTH)}…`;
  }

  /**
   * The palette of the current theme
   */
  private _palette(): string[] {
    return this._isDark() ? CHART_PALETTE.dark : CHART_PALETTE.light;
  }

  ngOnDestroy(): void {
    if (this._themeObserver) {
      this._themeObserver.disconnect();
      this._themeObserver = null;
    }
    if (this._chart) {
      this._chart.destroy();
      this._chart = null;
    }
  }
}
